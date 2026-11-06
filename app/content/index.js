import b01 from './b01/index.js';
import b02 from './b02/index.js';
import b03 from './b03/index.js';
import b04 from './b04/index.js';
import b05 from './b05/index.js';
import b06 from './b06/index.js';
import b07 from './b07/index.js';
import johto from './johto/index.js';
export const CONTENT_VERSION = '2026-11-05.3';
// Johto es una secundaria independiente. B07 permanece último para conservar
// la lógica de avisos de cierre de la Gira y sus hitos principales.
export const BLOCKS = [b01, b02, b03, b04, b05, b06, johto, b07];
// Solo herramientas (Node): INFINITO_EXTRA=b05 carga bloques en obras sin publicarlos.
// En el navegador `process` no existe y esto no hace nada.
const EXTRA = (typeof process !== 'undefined' && process.env && process.env.INFINITO_EXTRA) || '';
for (const id of EXTRA.split(',').filter(Boolean)) BLOCKS.push((await import(`./${id}/index.js`)).default);
