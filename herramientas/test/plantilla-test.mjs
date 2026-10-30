// Plantilla de trabajadores (app/js/negocios.js): mover, sugerir, guía y «Dónde rendiría».
// Uso: node herramientas/test/plantilla-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G } from '../../app/js/state.js';
import { createPokemon } from '../../app/js/pokemon.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const N = await import('../../app/js/negocios.js');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
setG(newGame({ name: 'Prueba' })); G.player.money = 1e7;
G.flags = new Proxy({}, { get: (t, k) => k in t ? t[k] : true, has: () => true });
const lead = createPokemon('lucario', { level: 60 }), riolu = createPokemon('pikachu', { level: 40 });
G.vars.riolu_uid = riolu.uid;
G.party = [lead, riolu, createPokemon('gengar', { level: 55 })];
G.boxes[0] = [createPokemon('mareep', { level: 20 }), createPokemon('gastly', { level: 40 }), createPokemon('drilbur', { level: 30 }), createPokemon('magikarp', { level: 5 })];
const ids = Object.keys(C.ventures).filter(id => N.ventureDef(id).jobs?.slots);
for (const id of ids) N.joinVenture(id);
// Guía
for (const id of ids) { const g = N.typeGuide(id); ok(g.types.length > 0 && g.lines.length > 0, `${id}: guía con tipos (${g.types.join('/')}) y qué produce`); }
ok(N.favsOf('p7_rancho').includes('mareep'), 'favoritos visibles (mareep en el rancho)');
// Dónde rendiría
const best = N.bestVenturesFor(G.boxes[0][0]);
ok(best.length === 3 && best[0].v >= best[1].v && best[1].v >= best[2].v, `«Dónde rendiría» da 3 ordenados (mejor: ${best[0].id})`);
ok(best[0].id === 'p7_rancho' && best[0].fav, 'para Mareep el mejor es el rancho, como favorito');
// Sugerir: no toca cabeza ni compañero y deja al menos uno en el equipo
const sug = N.suggestWorkers();
ok(sug.length > 0, `hay ${sug.length} sugerencias`);
ok(!sug.some(s => s.p.uid === lead.uid || s.p.uid === riolu.uid), 'nunca sugiere al de cabeza ni al compañero');
ok(new Set(sug.map(s => s.p.uid)).size === sug.length, 'nadie sugerido dos veces');
const freeBefore = Object.fromEntries(ids.map(id => [id, N.freeSlots(id)]));
ok(ids.every(id => sug.filter(s => s.id === id).length <= freeBefore[id]), 'no sugiere más que los puestos libres');
const mareepSug = sug.find(s => s.p.sp === 'mareep');
ok(mareepSug && mareepSug.id === 'p7_rancho', 'Mareep va sugerida al rancho');
for (const s of sug) ok(N.applySuggestion(s).ok, `aplica: ${s.p.sp} → ${s.id}`);
ok(G.party.length >= 1 && G.party[0] === lead && G.party.includes(riolu), 'el equipo conserva a la cabeza y al compañero');
// Equipo de uno: nunca lo deja vacío
setG(newGame({ name: 'Prueba2' })); G.player.money = 1e7;
G.flags = new Proxy({}, { get: (t, k) => k in t ? t[k] : true, has: () => true });
G.party = [createPokemon('lucario', { level: 50 }), createPokemon('mareep', { level: 50 })];
N.joinVenture('p7_rancho');
const s2 = N.suggestWorkers();
ok(s2.length === 1 && s2[0].p.sp === 'mareep' && s2[0].from === 'party', 'puede sugerir uno del equipo (no el de cabeza)');
N.applySuggestion(s2[0]);
ok(G.party.length === 1 && N.suggestWorkers().length === 0, 'con uno en el equipo ya no sugiere sacar a nadie');
// Mover entre negocios
N.joinVenture('p7_castillo');
const before = N.ventureState('p7_rancho').workers.length;
const mv = N.moveWorker('p7_rancho', 0, 'p7_castillo');
ok(mv.ok && N.ventureState('p7_rancho').workers.length === before - 1 && N.ventureState('p7_castillo').workers.some(p => p.sp === 'mareep'), 'mueve un trabajador directo de un negocio a otro');
ok(!N.moveWorker('p7_castillo', 0, 'p7_castillo').ok, 'no se mueve al mismo negocio');
const cs = N.ventureState('p7_castillo');
while (N.freeSlots('p7_castillo')) cs.workers.push(createPokemon('gastly', { level: 10 }));
N.ventureState('p7_rancho').workers.push(createPokemon('pidgey', { level: 10 }));
ok(!N.moveWorker('p7_rancho', 0, 'p7_castillo').ok, 'no mueve si no hay puesto libre');
// Un Pokémon nunca está en dos sitios
const all = N.allWorkers().map(w => w.p.uid);
ok(new Set(all).size === all.length && !G.party.some(p => all.includes(p.uid)), 'ningún Pokémon está en dos sitios');
console.log(fails ? `\n${fails} fallos` : '\nTodo bien');
process.exit(fails ? 1 : 0);
