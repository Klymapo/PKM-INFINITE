// Encargado exclusivo (bug de Mario, 2026-10-29): un encargado lleva un solo negocio.
// Uso: node herramientas/test/encargados-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G } from '../../app/js/state.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const N = await import('../../app/js/negocios.js');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
setG(newGame({ name: 'Prueba' })); G.player.money = 1e7;
G.flags = new Proxy({}, { get: (t, k) => k in t ? t[k] : true, has: () => true });
for (const id in C.ventures) N.joinVenture(id);
// Al entrar en todos, nadie se repite
const count = () => { const c = {}; for (const id in G.neg) if (G.neg[id].manager) c[G.neg[id].manager] = (c[G.neg[id].manager] || 0) + 1; return c; };
ok(Object.values(count()).every(n => n === 1), 'al entrar en todos los negocios ningún encargado se repite');
// Todo encargado que vale para varios negocios: moverlo se lo lleva del otro
const multi = {};
for (const id in C.ventures) for (const m of N.managersOf(id)) (multi[m.id] ||= []).push(id);
let moved = 0;
for (const [mid, vs] of Object.entries(multi)) {
	if (vs.length < 2) continue;
	for (const target of vs) {
		const r = N.setManager(target, mid);
		ok(r && r.ok && G.neg[target].manager === mid, `${mid} queda al frente de ${target}`);
		ok(Object.values(count()).every(n => n === 1), `${mid} en ${target}: sigue sin repetirse nadie`);
		const at = Object.keys(G.neg).filter(v => G.neg[v].manager === mid);
		ok(at.length === 1 && at[0] === target, `${mid} solo lleva ${target}`);
		if (r.from) ok(G.neg[r.from].manager !== mid, `${r.from} vuelve con ${G.neg[r.from].manager || 'nadie'}`);
		moved++;
	}
}
ok(moved > 0, `se probaron ${moved} movimientos de encargados compartidos`);
ok(N.managerConflicts().length === 0, 'sin conflictos tras mover');
// Partida vieja con un encargado repetido: se detecta y se resuelve sin quitar nada más
const [mid, vs] = Object.entries(multi).find(([, l]) => l.length >= 2);
for (const v of vs) G.neg[v].manager = mid;
const conf = N.managerConflicts();
ok(conf.length === 1 && conf[0].mid === mid && conf[0].ventures.length === vs.length, `detecta a ${mid} repetido en ${vs.join(', ')}`);
N.resolveManagerConflict(mid, vs[1]);
ok(G.neg[vs[1]].manager === mid && vs.filter(v => v !== vs[1]).every(v => G.neg[v].manager !== mid), `se queda en ${vs[1]}; los demás vuelven a su encargado`);
ok(N.managerConflicts().length === 0 && Object.values(count()).every(n => n === 1), 'resuelto: ningún repetido');
// Recoger todo y aviso de almacén casi lleno
for (const id in G.neg) { G.neg[id].last = Date.now() - 1 * N.DAY; G.neg[id].fill = 0; }
const exp = Object.keys(G.neg).reduce((a, id) => a + N.pending(id).money, 0);
const m0 = G.player.money;
const all = N.collectAll();
ok(all.n === Object.keys(G.neg).length && G.player.money === m0 + all.money && Math.abs(all.money - exp) <= 1, `«Recoger todo» recoge los ${all.n} negocios (${all.money})`);
ok(Object.keys(G.neg).every(id => N.pending(id).money <= 1), 'todas las cajas quedan vacías (salvo lo de los últimos milisegundos)');
const id0 = Object.keys(G.neg)[0];
G.neg[id0].fill = N.storeDays(id0) - 0.25; G.neg[id0].last = Date.now();
ok(N.almostFull(id0) && Math.round(N.fullIn(id0)) === 6, `${id0}: avisa de que se llena en ~6 h`);
ok(N.venturesSummary().almost >= 1, 'el resumen de Más cuenta el almacén casi lleno');
G.neg[id0].fill = N.storeDays(id0);
ok(!N.almostFull(id0) && N.pending(id0).full, 'lleno ya no es «casi»: es lleno');
console.log(fails ? `\n${fails} fallos` : '\nTodo bien');
process.exit(fails ? 1 : 0);
