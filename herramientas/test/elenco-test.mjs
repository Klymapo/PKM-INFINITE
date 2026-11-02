// Identidades compartidas: deben funcionar con ids y con los objetos sin id que ya usa la interfaz.
import assert from 'node:assert/strict';
import fs from 'node:fs';
assert.ok(fs.existsSync(new URL('../../app/js/elenco.js', import.meta.url)), 'falta el registro global de los 28 sprites');
const { CAST, characterId } = await import('../../app/js/elenco.js');
const { BLOCKS } = await import('../../app/content/index.js');
const ns = Object.assign({}, ...BLOCKS.map(b => b.npcs));
assert.equal(Object.keys(CAST).length, 28);
for (const id of Object.keys(CAST)) {
 assert.equal(characterId({ id, name: 'Nombre de escena' }), id);
 if (id !== 'jugador') assert.equal(characterId(ns[id]), id, `${id}: objeto heredado sin id`);
 const f = CAST[id].frame;
 assert.ok(f.length === 4 && f.every(Number.isInteger) && f[0] >= 0 && f[1] >= 0 && f[2] > 0 && f[3] > 0);
 assert.ok(f[0] + f[2] <= 1254 && f[1] + f[3] <= 1254);
}
assert.equal(characterId({id:'joy_johto',name:'Enfermera Joy'}),'joy');
assert.equal(characterId({name:'Renata (en directo)'}),'renata');
assert.equal(characterId({name:'Tobías'}),'tobias');
assert.equal(characterId({portrait:'jugador',name:'Otro nombre de partida'}),'jugador');
assert.equal(characterId({id:'desconocido',name:'Nuevo personaje'}),null);
assert.equal(characterId(null),null);
assert.equal(characterId({id:'constructor'}),null);
assert.equal(characterId({id:'toString'}),null);
assert.equal(characterId({id:'riolu',name:'Lucario'}),null);
// Censo de referencias: el mismo resolver cubre todos los bloques cargados, no una lista de escenas concretas.
const refs = Object.fromEntries(Object.keys(CAST).map(id => [id, 0]));
function scan(o) {
 if (!o || typeof o !== 'object') return;
 for (const [key, v] of Object.entries(o)) {
  if (typeof v === 'string' && ['say', 'npc', 'partner', 'id'].includes(key)) { const id = characterId({id:v}); if (id) refs[id]++; }
  else if (v && typeof v === 'object') scan(v);
 }
}
for (const b of BLOCKS) scan(b);
for (const [id, count] of Object.entries(refs)) assert.ok(count > 0, `${id}: comprobar sus apariciones en el contenido`);
assert.ok(!CAST.riolu && !CAST.lucario && !CAST.candela && !CAST.ampharos);
console.log('28 sprites, variantes de identidad y referencias de todos los bloques: bien');
