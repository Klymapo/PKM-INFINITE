// Pruebas del cuarto del ático (app/js/atico.js): vitrina de medallas por región y muro de encuentros automático.
// Uso: node herramientas/test/atico-test.mjs
import fs from 'fs';
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G, migrate } from '../../app/js/state.js';
import { createPokemon, evolve } from '../../app/js/pokemon.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const A = await import('../../app/js/atico.js');

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };

// 1. Partida nueva: nada inventado
setG(newGame({ name: 'Prueba' }));
ok(A.vitrina(G).length === 0, 'partida nueva: vitrina vacía');
ok(A.muro(G).length === 0, 'partida nueva: muro vacío');
ok(/Todavía no hay fotos/.test(A.muroTexto(G)), 'partida nueva: el muro lo dice sin inventar');

// 2. Todas las medallas publicadas tienen región
for (const id in C.badges) ok(!!C.regions[C.badges[id].region], `medalla ${id} tiene región (${C.badges[id].region})`);

// 3. Registro del motor: evolución, la que no quiso y primera mecánica
const p = createPokemon('charmander', { level: 16, metAt: 'luminalia' });
G.party = [p];
evolve(p, 'charmeleon');
ok(p.flags.evo?.[0]?.from === 'charmander', 'evolve() apunta de dónde venía');
ok(A.origen(p, G) === 'charmander', 'origen() lee el registro');
A.notaPrimera(G, 'tera', p, 'luminalia');
A.notaPrimera(G, 'tera', createPokemon('pidgey', { level: 5 }), 'novarte');
ok(G.muro.tera.sp === 'charmeleon', 'notaPrimera no sobrescribe la primera vez');
ok(A.muro(G).some(c => c.id === 'tera'), 'el muro cuelga la primera Tera');
const q = createPokemon('pidgey', { level: 30 }); q.metLv = 5; G.party.push(q);
ok(A.muro(G).some(c => c.id === 'noevo_' + q.uid), 'Pidgey nv30 que llegó a nv5 cuenta como «no quiso»');
q.item = 'everstone';
ok(!A.muro(G).some(c => c.id === 'noevo_' + q.uid), 'con Piedra Eterna no cuenta como decisión suya');

// 4. La partida real de Mario: cuadros desde el primer día, todos con algo que existe
const raw = JSON.parse(fs.readFileSync(new URL('./partidas/mario-2026-10-23.json', import.meta.url), 'utf8'));
setG(migrate(raw.save));
const v = A.vitrina(G);
ok(v.map(r => r.region).join(',') === 'kalos,johto,kanto', `Mario: medallas por región (${v.map(r => r.name + ' ' + r.badges.length).join(' · ')})`);
ok(v.reduce((a, r) => a + r.badges.length, 0) === G.player.badges.length, 'Mario: están todas sus medallas y ninguna más');
const m = A.muro(G);
const ids = m.map(c => c.id);
console.log('   cuadros: ' + m.map(c => c.title).join(' | '));
ok(ids.includes('primero') && /Riolu/.test(m.find(c => c.id === 'primero').text), 'Mario: Lucario, el primero (llegó como Riolu)');
ok(ids.includes('candela'), 'Mario: Candela');
ok(ids.includes('shiny') && /Gyarados/.test(m.find(c => c.id === 'shiny').text), 'Mario: su Gyarados de otro color');
ok(ids.includes('mega'), 'Mario: la Lucarita (ya desbloqueó la Mega)');
ok(!ids.includes('tera') && !ids.includes('z') && !ids.includes('dyn'), 'Mario: ninguna mecánica que no haya usado');
ok(ids.some(i => i.startsWith('evo_')), 'Mario: evoluciones');
ok(ids.includes('leyenda_' + (G.boxes.flat().concat(G.party).find(x => x.sp === 'mewtwo')?.uid)) || !G.boxes.flat().concat(G.party).some(x => x.sp === 'mewtwo'), 'Mario: legendario solo si lo tiene');
ok(new Set(ids).size === ids.length, 'Mario: sin cuadros repetidos');
ok(m.every(c => c.text.length < 400 && !/undefined|NaN|null/.test(c.text + c.title)), 'Mario: textos limpios');
ok(/Medalla Cascada/.test(A.medallasTexto(G)), 'Mario: la vitrina nombra la octava');

console.log(fails ? `\n${fails} FALLOS` : '\nTodo bien.');
process.exit(fails ? 1 : 0);
