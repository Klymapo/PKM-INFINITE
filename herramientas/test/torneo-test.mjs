// Copa Luminalia: reglas, rivales y puntos (puro).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { D } from '../../app/js/data.js';
import { eligibleTypes, checkEntry, entrant, rival, rivalPool, pointsFor, TORNEO } from '../../app/js/torneo.js';
const j = f => JSON.parse(readFileSync(new URL('../../app/data/' + f, import.meta.url)));
D.species = j('species.json'); D.types = j('types.json');
const mons = [{ uid: 1, sp: 'chandelure' }, { uid: 2, sp: 'polteageist' }, { uid: 3, sp: 'gengar' }, { uid: 4, sp: 'gyarados', item: 'leftovers', lv: 72, hp: 3 }, { uid: 5, sp: 'delphox' }];
const el = eligibleTypes(mons);
assert.ok(el.includes('Ghost') && !el.includes('Water'), el.join());
assert.equal(checkEntry('Ghost', mons.slice(0, 3)), null);
assert.match(checkEntry('Ghost', [mons[0], mons[1], mons[3]]), /no es de tipo/);
assert.match(checkEntry('Ghost', mons.slice(0, 2)), /Hacen falta/);
const e = entrant(mons[3]);
assert.equal(e.lv, 50); assert.equal(e.item, ''); assert.equal(mons[3].lv, 72); assert.equal(mons[3].item, 'leftovers');
for (let r = 0; r < TORNEO.rounds; r++) {
	assert.ok(rivalPool(TORNEO.bst[r]).length > 20, 'hay variedad en la ronda ' + r);
	const a = rival(r, 'x'), b = rival(r, 'x');
	assert.deepEqual(a.team, b.team, 'misma semilla, mismo rival');
	assert.equal(a.team.length, 3); assert.ok(a.team.every(m => m.lv === 50 && !D.species[m.sp].legend && !(D.species[m.sp].evos || []).length));
}
assert.equal(pointsFor(0), 0); assert.equal(pointsFor(2), 5); assert.equal(pointsFor(4), 20);
console.log('torneo-test OK');
