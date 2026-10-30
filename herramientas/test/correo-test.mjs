// Buzón (app/js/correo.js): llega días reales después, una cada 20 h, y nunca dos veces.
// Uso: node herramientas/test/correo-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G, evalCond } from '../../app/js/state.js';
import { D } from '../../app/js/data.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const M = await import('../../app/js/correo.js');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
const H = 3600e3;
// Piezas de prueba (no se publican)
C.mail.push(
	{ id: 't_a', kind: 'carta', cond: 'flag.t_a', days: 2, from: 'A', title: 'A', item: 'potion' },
	{ id: 't_b', kind: 'periodico', cond: 'flag.t_b', days: 1, from: 'B', title: 'B', item: 'potion' },
);
setG(newGame({ name: 'Prueba' }));
let t = Date.now();
ok(M.mailTick(t).length === 0, 'sin condiciones no llega nada');
G.flags.t_a = true; G.flags.t_b = true;
M.mailTick(t);
ok(M.mailbox().length === 0, 'al cumplirse la condición aún no llega');
t += 1.1 * M.DAY;
let got = M.mailTick(t);
ok(got.length === 1 && got[0].id === 't_b', 'a los días que toca llega la primera (la de 1 día)');
t += 1.1 * M.DAY;
got = M.mailTick(t);
ok(got.length === 1 && got[0].id === 't_a', 'la segunda llega en otra tanda');
ok(M.mailTick(t + 30 * M.DAY).filter(m => m.id.startsWith('t_')).length === 0, 'ninguna llega dos veces');
ok(M.unreadMail() >= 2, 'quedan sin abrir');
M.markRead('t_a');
ok(M.mailbox().find(m => m.id === 't_a').read, 'se marca como leída');
// Separación de 20 h
setG(newGame({ name: 'Prueba' }));
G.flags.t_a = G.flags.t_b = true;
t = Date.now(); M.mailTick(t); t += 3 * M.DAY;
const g1 = M.mailTick(t), g2 = M.mailTick(t + 2 * H), g3 = M.mailTick(t + 21 * H);
ok(g1.length === 1 && g2.length === 0 && g3.length === 1, 'como mucho una cada 20 h');
// Contenido publicado: cada pieza tiene lo que necesita
for (const m of C.mail.filter(m => !m.id.startsWith('t_'))) {
	ok((!m.item || D.items[m.item]?.read) && (!m.script || C.scripts[m.script]), `${m.id}: objeto legible / guion existente`);
}
// Una partida que ya cumple todo recibe todo con el tiempo, una cada 20 h
setG(newGame({ name: 'Prueba' }));
G.flags = new Proxy({}, { get: () => true, has: () => true });
t = Date.now(); M.mailTick(t);
let n = 0;
for (let i = 0; i < C.mail.length * 2 + 10; i++) { t += 21 * H; n += M.mailTick(t).length; }
const reach = C.mail.filter(m => { try { return evalCond(m.cond); } catch (e) { return false; } }).length;
ok(n === reach, `con todo cumplido llegan las ${reach} que se pueden cumplir a la vez (${n})`);
console.log(fails ? `\n${fails} fallos` : '\nTodo bien');
process.exit(fails ? 1 : 0);
