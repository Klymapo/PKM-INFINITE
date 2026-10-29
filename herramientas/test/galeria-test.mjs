// Galería privada: la parte pura (nombres, títulos y orden).
import assert from 'node:assert/strict';
import { keyOf, describe, sortKeys, isImageName } from '../../app/js/galeria.js';
assert.equal(keyOf('Descargas/Postal-Luminalia.PNG'), 'postal-luminalia.png');
assert.equal(keyOf('momento 03 el faro.png'), 'momento-03-el-faro.png');
assert.deepEqual(describe('postal-luminalia.png'), { kind: 'postal', id: 'luminalia', title: 'Postal · luminalia' });
const m = describe('momento-12-la-torre-de-noche.jpg');
assert.equal(m.kind, 'momento'); assert.equal(m.n, '12'); assert.equal(m.title, 'La torre de noche');
assert.equal(describe('otra_cosa.webp').kind, 'otra');
assert.deepEqual(sortKeys(['zz.png', 'postal-a.png', 'momento-10-b.png', 'momento-2-a.png']), ['momento-2-a.png', 'momento-10-b.png', 'postal-a.png', 'zz.png']);
assert.ok(isImageName('a.JPEG') && !isImageName('a.txt'));
console.log('galeria-test OK');
