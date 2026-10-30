// Pruebas del Cuadrante (app/js/cartas.js): reglas, IA sin jugadas inválidas, dificultad creciente y rivales publicados.
// Uso: node herramientas/test/cartas-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G } from '../../app/js/state.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const K = await import('../../app/js/cartas.js');

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
const fresh = () => setG(newGame({ name: 'Prueba' }));

// --- Cartas ---
const pika = K.card('pikachu');
ok(pika && pika.up === 3 && pika.right === 4 && pika.down === 4 && pika.left === 7, `Pikachu: ${pika.up}/${pika.right}/${pika.down}/${pika.left} (PS, ataque, defensa, velocidad)`);
ok(['mewtwo', 'blissey', 'shuckle', 'magikarp'].every(sp => { const c = K.card(sp); return K.SIDES.every(s => c[s] >= 1 && c[s] <= 10); }), 'todos los valores entre 1 y 10');
ok(K.card('mewtwo').rank === 4 && K.card('caterpie').rank === 1, 'rangos: Mewtwo estelar, Caterpie común');
ok(K.typeBonus(K.card('squirtle'), K.card('charmander')) === 1 && K.typeBonus(K.card('charmander'), K.card('squirtle')) === 0, 'bono de tipo solo si es eficaz');
ok(K.neighbor(0, 'up') === -1 && K.neighbor(0, 'right') === 1 && K.neighbor(4, 'down') === 7 && K.neighbor(5, 'right') === -1 && K.neighbor(6, 'left') === -1, 'vecinos del tablero');

// --- Reglas de captura ---
{
	const m = K.newMatch(['magikarp', 'magikarp', 'magikarp', 'magikarp', 'magikarp'], ['mewtwo', 'magikarp', 'magikarp', 'magikarp', 'magikarp'], 'me');
	K.play(m, { h: 0, i: 4 });            // Magikarp en el centro
	const f = K.play(m, { h: 0, i: 1 });  // Mewtwo arriba del centro: su abajo (7) vs arriba de Magikarp (2) → gira
	ok(f.length === 1 && m.board[4].owner === 'foe', 'una carta gira la vecina si su lado es mayor');
	const m2 = K.newMatch(['magikarp', 'magikarp', 'magikarp', 'magikarp', 'magikarp'], ['magikarp', 'magikarp', 'magikarp', 'magikarp', 'magikarp'], 'me');
	K.play(m2, { h: 0, i: 4 }); const f2 = K.play(m2, { h: 0, i: 3 });
	ok(f2.length === 0, 'un empate de valores no gira');
	let threw = false; try { K.play(m2, { h: 1, i: 4 }); } catch (e) { threw = true; }
	ok(threw, 'no se puede jugar en una casilla ocupada');
	threw = false; try { K.play(m2, { h: 0, i: 0 }); } catch (e) { threw = true; }
	ok(threw, 'no se puede jugar una carta ya usada');
}
// --- Partida completa y marcador ---
{
	const r = K.autoMatch(['pikachu', 'eevee', 'snorlax', 'gengar', 'lucario'], ['bidoof', 'rattata', 'pidgey', 'caterpie', 'weedle'], 2, 1, 's1');
	const s = K.score(r.m);
	ok(K.isOver(r.m) && s.me + s.foe === 10, `al terminar hay 10 cartas en juego (${s.me}–${s.foe})`);
	ok(r.m.log.length === 9, 'se juegan 9 cartas');
}
// --- La IA nunca hace jugadas inválidas ---
{
	let bad = 0, n = 0;
	const pool = Object.keys((await import('../../app/js/data.js')).D.species).filter(k => !k.includes('gmax') && !k.includes('mega'));
	for (let s = 0; s < 400; s++) {
		const r = K.rng('ia' + s), pick = () => Array.from({ length: 5 }, () => pool[Math.floor(r() * pool.length)]);
		const m = K.newMatch(pick(), pick(), s % 2 ? 'me' : 'foe');
		while (!K.isOver(m)) {
			const lv = 1 + (s + m.log.length) % 4;
			const mv = K.aiMove(m, lv, r);
			const legal = K.legalMoves(m).some(x => x.h === mv?.h && x.i === mv?.i);
			if (!legal) { bad++; break; }
			K.play(m, mv); n++;
		}
	}
	ok(bad === 0, `la IA de los 4 niveles no hace jugadas inválidas (${n} jugadas en 400 partidas)`);
}
// --- Dificultad creciente: cada nivel gana más que el anterior contra el nivel 2 ---
{
	const decks = [['pikachu', 'eevee', 'snorlax', 'gengar', 'lucario'], ['ampharos', 'tyrantrum', 'garganacl', 'aerodactyl', 'aurorus'], ['delphox', 'klefki', 'mrmime', 'meowstic', 'furfrou']];
	const rate = lv => { let w = 0, t = 0; for (let s = 0; s < 300; s++) { const a = decks[s % 3], b = decks[(s + 1) % 3]; const r = K.autoMatch(b, a, 2, lv, 'd' + s); t++; if (r.res === 'lose') w++; } return w / t; };
	const r1 = rate(1), r2 = rate(2), r3 = rate(3), r4 = rate(4);
	console.log(`   victorias del rival contra un jugador de nivel 2: n1 ${Math.round(r1 * 100)} % · n2 ${Math.round(r2 * 100)} % · n3 ${Math.round(r3 * 100)} % · n4 ${Math.round(r4 * 100)} %`);
	ok(r1 < r2 && r2 < r3 && r3 <= r4, 'la IA gana más cuanto más alto es su nivel');
}
// --- Colección, mazo y premios ---
fresh();
G.party = [{ sp: 'lucario' }, { sp: 'ampharos' }, { sp: 'tyrantrum' }];
ok(!K.hasCards(), 'sin cartas al empezar');
const pack = K.giveStarter();
ok(pack.length === 8 && pack.slice(0, 3).join() === 'lucario,ampharos,tyrantrum', `sobre de inicio: tu equipo + comunes (${pack.join(', ')})`);
ok(K.giveStarter().length === 0, 'el sobre de inicio se da una sola vez');
ok(K.myDeck().length === 5, 'mazo automático de 5');
ok(!K.setDeck(['lucario', 'lucario', 'bidoof', 'pidgey', 'rattata']), 'no puedes meter dos copias de una carta que tienes una vez');
ok(K.setDeck(['bidoof', 'pidgey', 'rattata', 'caterpie', 'lucario']) && K.myDeck().join() === 'bidoof,pidgey,rattata,caterpie,lucario', 'mazo elegido');
const ids = Object.keys(C.cardPlayers);
ok(ids.length >= 5 && ids.filter(i => C.cardPlayers[i].champion).length >= 5, `${ids.length} rivales publicados, 5 campeones`);
for (const id of ids) {
	const d = C.cardPlayers[id];
	ok(d.deck.length === 5 && d.deck.every(sp => K.card(sp)), `${id}: mazo de 5 cartas válidas`);
}
const champ = ids.find(i => C.cardPlayers[i].champion);
const d = C.cardPlayers[champ];
ok(K.aiLevelFor(champ) === d.level, `${champ}: empieza en nivel ${d.level}`);
const money0 = G.player.money;
const lose = K.finishMatch(champ, 'lose');
ok(!lose.card && Object.values(G.cards.owned).reduce((a, b) => a + b, 0) === 8, 'perder no da ni quita cartas');
const w1 = K.finishMatch(champ, 'win', d.deck[2]);
ok(w1.card === d.deck[2] && G.cards.owned[d.deck[2]] >= 1 && w1.first && w1.prizes.length && G.bag[d.prize[0].id] === 1, 'ganar: eliges una carta del rival y la primera vez, su premio');
ok(G.flags['cartas_' + champ + '_ganada'], 'marca al campeón como vencido');
ok(K.aiLevelFor(champ) === Math.min(d.max, d.level + 1), 'el campeón sube de nivel tras perder contigo');
const w2 = K.finishMatch(champ, 'win', 'mewtwo');
ok(w2.card === d.deck[0] && !w2.prizes.length, 'no puedes llevarte una carta que no está en su mazo; el premio no se repite');
ok(G.player.money === money0, 'el Cuadrante no da dinero');
console.log(fails ? `\n✖ ${fails} fallos` : '\n✔ Cuadrante: todo bien');
process.exit(fails ? 1 : 0);
