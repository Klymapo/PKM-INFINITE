// Fotografía (app/js/foto.js + guiones de t11-fotos.js): cámara, momentos raros, venta y Álbum.
// Uso: node herramientas/test/foto-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G, evalCond, setExtraScope } from '../../app/js/state.js';
import { timeScope } from '../../app/js/time.js';
import { runScript, UI } from '../../app/js/guion.js';
loadDataNode();
setExtraScope(timeScope);
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const F = await import('../../app/js/foto.js');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
UI.say = async () => {}; UI.choose = async () => 0; UI.toast = () => {}; UI.refresh = () => {}; UI.read = async () => {};
setG(newGame({ name: 'Prueba' }));
const ids = Object.keys(C.photos);
ok(ids.length >= 6, `${ids.length} momentos raros publicados`);
for (const id of ids) {
	const d = C.photos[id];
	ok(C.locations[d.loc] && C.scripts['foto_' + id] && d.pay >= 500 && d.pay <= 3000, `${id}: lugar, guion y pago modesto (${d.pay})`);
	const spots = Object.values(C.locations[d.loc].route?.tramos || {}).flat().filter(s => (s.talk || []).some(t => t.script === 'foto_' + id));
	ok(spots.length === 1, `${id}: un spot en su ruta`);
}
ok(!evalCond('has("camara")'), 'sin cámara al principio');
await runScript('foto_camara');
ok(evalCond('has("camara")'), 'Alexia te da la cámara');
// Un momento: el minijuego sin interfaz cuenta como ganado con 2 estrellas
await runScript('foto_' + ids[0]);
ok(evalCond(`foto("${ids[0]}") == 2`), 'la foto se guarda con 2 estrellas');
// Mejorar la foto
UI.photo = async () => ({ ok: true, q: 3 });
await runScript('foto_' + ids[0]);
ok(F.fotos()[ids[0]].q === 3, 'repetirla con 3 estrellas la mejora');
UI.photo = async () => ({ ok: true, q: 1 });
await runScript('foto_' + ids[0]);
ok(F.fotos()[ids[0]].q === 3, 'una peor no estropea la buena');
UI.photo = async () => ({ ok: false, q: 0 });
await runScript('foto_' + ids[1]);
ok(!F.fotos()[ids[1]], 'si falla, no hay foto');
// Venta
const m0 = G.player.money, price = F.photoPrice(ids[0]);
await runScript('foto_venta');
ok(G.player.money === m0 + price && price === C.photos[ids[0]].pay, `la Gaceta paga la foto de 3 estrellas (${price})`);
ok(F.photoPrice(ids[0]) === 0 && F.unsoldPhotos().length === 0, 'no se cobra dos veces');
// Diferencia: vendida con 2, luego 3
UI.photo = async () => ({ ok: true, q: 2 });
await runScript('foto_' + ids[2]);
F.sellPhotos();
UI.photo = async () => ({ ok: true, q: 3 });
await runScript('foto_' + ids[2]);
const diff = F.photoPrice(ids[2]);
ok(diff > 0 && diff < C.photos[ids[2]].pay, `una foto mejor paga solo la diferencia (${diff})`);
ok(F.album().length === 2 && F.photoCount().total === ids.length, 'el Álbum tiene las 2 fotos hechas');
// Enfoque
const P = F.focusParams(1), P3 = F.focusParams(3);
ok(P.zone > P3.zone && P.speed < P3.speed, 'el nivel 3 es más difícil que el 1');
ok(F.focusHit(0.5, 0.5, 0.2) && !F.focusHit(0.8, 0.5, 0.2), 'acierto dentro del recuadro, fallo fuera');
console.log(fails ? `\n${fails} fallos` : '\nTodo bien');
process.exit(fails ? 1 : 0);
