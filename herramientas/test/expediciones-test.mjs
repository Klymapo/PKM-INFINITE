// Expediciones (app/js/expedicion.js): del PC a rutas visitadas, 3 a la vez, 4–12 h, sin dinero, nunca en dos sitios.
// Uso: node herramientas/test/expediciones-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G, evalCond } from '../../app/js/state.js';
import { createPokemon } from '../../app/js/pokemon.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const X = await import('../../app/js/expedicion.js');
const N = await import('../../app/js/negocios.js');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
const H = 3600e3;
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
setG(newGame({ name: 'Prueba' }));
G.party = [createPokemon('lucario', { level: 50 })];
G.boxes[0] = [createPokemon('mareep', { level: 20 }), createPokemon('gastly', { level: 30 }), createPokemon('zubat', { level: 25 }), createPokemon('oddish', { level: 22 })];
ok(X.destinations().length === 0, 'sin rutas visitadas no hay destinos');
for (const id of ['ruta7', 'ruta32', 'cueva_celeste', 'ruta36']) G.visited[id] = Date.now();
const dests = X.destinations();
ok(dests.length === 4 && dests.every(d => d.gathers.length), `destinos: ${dests.map(d => d.id).join(', ')}`);
ok(!X.sendExpedition(G.party[0].uid, 'ruta7', 4).ok, 'del equipo no se puede');
ok(!X.sendExpedition(G.boxes[0][0].uid, 'ruta7', 5).ok, 'duración inválida (5 h) rechazada');
ok(!X.sendExpedition(G.boxes[0][0].uid, 'ruta1', 4).ok, 'ruta no visitada rechazada');
// Trabajando en un negocio: no está en el PC
G.flags = new Proxy({}, { get: (t, k) => k in t ? t[k] : true, has: () => true });
G.player.money = 1e6; N.joinVenture('p7_rancho');
const worker = G.boxes[0][3];
N.assignWorker('p7_rancho', { where: 'box', box: 0, idx: 3 });
ok(!X.sendExpedition(worker.uid, 'ruta7', 4).ok, 'un Pokémon que trabaja en un negocio no puede ir');
G.flags = {};
const t0 = Date.now();
const [a, b, c] = G.boxes[0].slice(0, 3);
ok(X.sendExpedition(a.uid, 'ruta7', 4, t0).ok && X.sendExpedition(b.uid, 'cueva_celeste', 12, t0).ok && X.sendExpedition(c.uid, 'ruta32', 8, t0).ok, 'tres a la vez');
G.boxes[0].push(createPokemon('pidgey', { level: 10 }));
ok(!X.sendExpedition(G.boxes[0][0].uid, 'ruta36', 4, t0).ok, 'la cuarta no');
ok(!G.boxes.flat().some(p => [a, b, c].includes(p)), 'mientras están fuera no están en el PC');
ok(evalCond('owns("gastly")'), 'owns() los sigue contando');
ok(X.readyCount(t0 + 3 * H) === 0 && X.collectExpedition(0, { t: t0 + 3 * H }) === null, 'antes de tiempo no vuelven');
const money = G.player.money, h0 = a.happy || 0, lv0 = a.lv;
const r = X.collectExpedition(0, { t: t0 + 4.1 * H, rnd });
ok(r && r.mon === a && G.boxes.flat().includes(a), 'vuelve al PC al recogerla');
ok(Object.keys(r.items).length > 0 && Object.keys(r.items).every(k => G.bag[k] > 0), `trae objetos de la ruta (${Object.entries(r.items).map(([k, n]) => k + '×' + n).join(', ')})`);
const allowed = new Set(X.gathersOf('ruta7').flatMap(g => C.gather[g].table.map(e => e.id)));
ok(Object.keys(r.items).every(k => allowed.has(k)), 'solo objetos de los puntos de esa ruta');
ok(G.player.money === money, 'no da dinero');
ok((a.happy || 0) > h0 && a.lv <= lv0 + 1, `gana amistad (+${(a.happy || 0) - h0}) y como mucho un nivel (${lv0} → ${a.lv})`);
ok(r.log.length >= 2 && r.log.length <= 3, `bitácora de ${r.log.length} líneas`);
ok(X.collectExpedition(5, { t: t0 + 20 * H }) === null, 'índice inexistente no rompe');
// El resto, de golpe y 12 h dan más que 4 h de media
const all = X.collectAllExpeditions({ t: t0 + 13 * H, rnd });
ok(all.length === 2 && X.expState().active.length === 0, 'las otras dos vuelven');
let n4 = 0, n12 = 0, spec = 0;
for (let i = 0; i < 300; i++) {
	setG(newGame({ name: 'P' })); G.visited.cueva_celeste = 1; G.boxes[0] = [createPokemon('zubat', { level: 25 }), createPokemon('zubat', { level: 25 })];
	X.sendExpedition(G.boxes[0][0].uid, 'cueva_celeste', 4, t0); X.sendExpedition(G.boxes[0][0].uid, 'cueva_celeste', 12, t0);
	const [x, y] = [X.collectExpedition(0, { t: t0 + 13 * H, rnd }), X.collectExpedition(0, { t: t0 + 13 * H, rnd })];
	n4 += Object.values(x.items).reduce((s, v) => s + v, 0); n12 += Object.values(y.items).reduce((s, v) => s + v, 0); if (x.special || y.special) spec++;
}
ok(n12 > n4 * 2, `12 h traen más que 4 h (${(n12 / 300).toFixed(1)} frente a ${(n4 / 300).toFixed(1)} de media)`);
ok(spec > 0 && spec < 90, `lo especial sale rara vez (${spec} de 300 pares)`);
console.log(fails ? `\n${fails} fallos` : '\nTodo bien');
process.exit(fails ? 1 : 0);
