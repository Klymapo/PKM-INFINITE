// Pruebas del rival que aprende (app/js/rival.js) y del contador de uso en combate.
// Uso: node herramientas/test/rival-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G } from '../../app/js/state.js';
import { createPokemon, canLearn } from '../../app/js/pokemon.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const RX = await import('../../app/js/rival.js');
const { spotsOf } = await import('../../app/js/world.js');

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
const fresh = () => {
	setG(newGame({ name: 'Prueba' }));
	G.party = [createPokemon('tyrantrum', { level: 50 }), createPokemon('lucario', { level: 50 }), createPokemon('ampharos', { level: 50 }), createPokemon('gyarados', { level: 48 })];
	G.vars.cap = 56;
	delete G.vars.hitos; // sin hitos guardados cuentan las medallas
	G.player.badges = ['a', 'b'];
	G.loc = 'luminalia'; G.visited = { luminalia: 1, novarte: 1, relieve: 1, ruta4: 1 };
};

// ----- Contador de uso -----
fresh();
RX.countUse([G.party[0], G.party[2]], true);
RX.countUse([G.party[0]], false);
RX.countUse([G.party[1]], false);
ok(G.uso[G.party[0].uid].n === 3 && G.uso[G.party[2].uid].n === 2 && G.uso[G.party[1].uid].n === 1, 'el uso suma +2 contra entrenadores y +1 contra salvajes');
const top = RX.topUsed(3).map(p => p.sp);
ok(top.join() === 'tyrantrum,ampharos,lucario', `los 3 más usados en orden (${top.join(', ')})`);
G.boxes[0] = [G.party.splice(0, 1)[0]];
ok(RX.topUsed(3)[0].sp === 'tyrantrum', 'cuenta también a los que están en el PC');

// ----- Equipo con coberturas -----
fresh();
RX.countUse([G.party[0], G.party[1], G.party[2]], true);
const tops = RX.topUsed(3);
const r = RX.buildRival('s1');
ok(r.team.length === RX.teamSize(0, 2) && r.team.length >= 3, `tamaño del equipo según hitos (${r.team.length})`);
ok(r.threats.length && r.threats.every(t => tops.some(p => RX.eff(t, C && (globalThis.D || null) ? [] : []) >= 0)), 'tiene tipos de amenaza');
ok(r.threats.includes('Ground') || r.threats.includes('Fighting'), `amenazas razonables contra Tyrantrum/Lucario/Ampharos: ${r.threats.join(', ')}`);
let cover = 0;
for (const m of r.team) for (const mv of m.moves) { const D = (await import('../../app/js/data.js')).D; if (tops.some(p => RX.eff(D.moves[mv].type, D.species[p.sp].types) >= 2)) { cover++; break; } }
ok(cover >= Math.ceil(r.team.length * 0.6), `la mayoría de su equipo pega supereficaz a tus más usados (${cover}/${r.team.length})`);
ok(r.team.every(m => m.moves.length === 4 && m.moves.every(mv => canLearn(m.sp, mv))), 'todos sus movimientos son legales');
const cap = G.vars.cap;
ok(r.team.every(m => m.lv <= cap - 1 && m.lv >= cap - 5), `niveles dentro de la curva (tope ${cap}: ${r.team.map(m => m.lv).join(', ')})`);
ok(JSON.stringify(RX.buildRival('s1').team) === JSON.stringify(r.team), 'misma semilla, mismo equipo');
const { D } = await import('../../app/js/data.js');
ok(r.team.every(m => !(D.species[m.sp].tags || []).length && !(D.species[m.sp].evos || []).length), 'sin legendarios y todos evolucionados');

// ----- Cuándo y dónde -----
fresh();
G.player.badges = ['a'];
ok(!RX.due() && !Object.values(C.locations).some(l => RX.rivalSpotsAt(l.id).length), 'con 1 medalla todavía no aparece');
G.player.badges = ['a', 'b'];
const place = RX.placeNow();
ok(place && G.visited[place] && ['city', 'town'].includes(C.locations[place].kind), `aparece en una ciudad o pueblo visitado (${place})`);
ok(RX.placeNow() === place, 'no cambia de sitio entre consultas');
G.loc = place;
const sp = spotsOf(C.locations[place]).find(s => s.rival);
ok(sp && sp.talk[0].script === 'rx_primera' && C.scripts.rx_primera, 'el sitio sale en el lugar, con su guion');
ok(!G.rx, 'mirar dónde está no cambia la partida');

// ----- Revancha, avance y reto -----
const T = RX.prepare();
ok(C.trainers.rx_bruna.team === T.team, 'prepare() pone el equipo en el entrenador');
RX.record('lose');
ok(RX.due() && RX.rxState().team === T, 'si pierdes, sigue ahí con el mismo equipo para la revancha');
RX.record('win');
ok(!RX.due() && RX.rxState().next === 4, 'si ganas, vuelve 2 hitos después');
G.player.badges.push('c', 'd');
ok(RX.due(), 'con 2 medallas más vuelve');
RX.prepare(); RX.record('win');
G.player.badges.push('e', 'f'); RX.prepare(); const r3 = RX.record('win');
ok(r3.tierUp && RX.rxState().tier === 1, 'tres victorias seguidas con el mismo equipo suben el reto');
const lines = RX.greetLines();
ok(lines.some(l => /patrón/.test(l)) && lines.some(l => /número/.test(l)), 'el saludo recuerda los combates y avisa de que subió el listón');
G.party.push(createPokemon('garchomp', { level: 50 }));
G.player.badges.push('g', 'h'); RX.prepare(); RX.record('win');
ok(RX.rxState().streak === 1, 'si cambias de equipo, la racha vuelve a empezar');
const hi = RX.buildRival('t');
ok(hi.ai >= 4 && hi.team.at(-1).lv >= RX.aceLevel(0), 'con más reto, mejor IA y más nivel');
G.rx.tier = 3;
ok(RX.aceLevel(3) <= G.vars.cap + 1 && RX.teamSize(3, 8) <= 6, 'nunca pasa del tope + 1 ni de 6 Pokémon');
// el encuentro tiene curación antes del combate
const reto = JSON.stringify(C.scripts.rx_reto);
ok(reto.indexOf('"heal":true') >= 0 && reto.indexOf('"heal":true') < reto.indexOf('"battle"'), 'cura antes del combate');

console.log(fails ? `\n✖ ${fails} fallos` : '\n✔ Rival: todo bien');
process.exit(fails ? 1 : 0);
