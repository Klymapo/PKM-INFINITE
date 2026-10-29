// Radio Lavanda: el programa del día (puro).
import assert from 'node:assert/strict';
import { programa, markHeard, radioOn, newToday, available, RADIO } from '../../app/js/radio.js';
const list = [
	{ id: 'a', kind: 'noticia', cond: 'flag.x', text: 'A' }, { id: 'b', kind: 'noticia', text: 'B' },
	{ id: 'c', kind: 'consejo', text: 'C' }, { id: 'd', kind: 'musica', text: 'D' }, { id: 'e', kind: 'clima', text: 'E' },
	{ id: 'f', kind: 'dedicatoria', cond: 'flag.y', text: 'F' }, { id: 'g', kind: 'consejo', text: 'G' },
];
const flags = { 'flag.x': true };
const cond = c => !!flags[c];
const g = { player: { name: 'Mario' }, visited: { lavanda: 1 } };
assert.ok(radioOn(g) && !radioOn({ visited: {} }));
assert.equal(available(cond, list).length, 6, 'la de flag.y no entra');
const s1 = programa(g, { day: '2026-10-28', cond, list }), s2 = programa(g, { day: '2026-10-28', cond, list });
assert.equal(s1.length, RADIO.perShow);
assert.deepEqual(s1.map(p => p.id), s2.map(p => p.id), 'mismo día, mismo programa');
assert.equal(new Set(s1.map(p => p.id)).size, s1.length, 'sin repetir');
assert.ok(!s1.some(p => p.id === 'f'));
assert.ok(newToday(g, '2026-10-28'));
markHeard(g, s1, '2026-10-28');
assert.ok(!newToday(g, '2026-10-28') && newToday(g, '2026-10-29'));
const s3 = programa(g, { day: '2026-10-29', cond, list });
const unheard = available(cond, list).filter(p => !s1.some(q => q.id === p.id)).map(p => p.id);
const fresh = s3.filter(p => unheard.includes(p.id)).length;
assert.ok(fresh >= 1, 'al día siguiente entra lo no oído');
assert.deepEqual(programa(g, { day: 'x', cond: () => false, list: [{ id: 'z', cond: 'no', text: 'Z' }] }), []);
console.log('radio-test OK');
