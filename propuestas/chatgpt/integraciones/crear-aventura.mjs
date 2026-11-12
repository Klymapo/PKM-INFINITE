// Fábrica de historias: idea -> Ollama local (opcional) -> borrador ->
// misión comunitaria jugable y plan de ritmo. Sin editar app/ ni partidas.
// Modo offline sin modelo: --desde-json ejemplo.json.
// Modo local con Ollama encendido: --idea "..." [--modelo qwen3:4b-instruct].
// Salida predeterminada: propuestas/chatgpt/misiones/ (propuestas NO publicadas).
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const cli = (k) => { const i = process.argv.indexOf('--' + k); return i < 0 ? null : process.argv[i + 1]; };
const slugId = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 28);
function run(file, args) {
  const r = spawnSync(process.execPath, [path.join(HERE, file), ...args], {
    encoding: 'utf8', timeout: 160000,
    maxBuffer: 1024 * 1024
  });
  if (r.error) throw Error(file + ': ' + r.error.message);
  if (r.status !== 0) throw Error(file + ': ' + (r.stderr || r.stdout || 'Error desconocido').trim());
  return r;
}
async function main() {
  const input = cli('desde-json'), idea = cli('idea');
  if ((!input && !idea) || !cli('slug') || !cli('lugar') || !cli('especie') || !cli('nivel')) {
    console.error('Uso: node crear-aventura.mjs --idea "premisa" --slug identificador --lugar luminalia --especie pidgeot --nivel 50');
    console.error('O: node crear-aventura.mjs --desde-json ejemplo.json --slug identificador --lugar luminalia --especie pidgeot --nivel 50');
    process.exitCode = 2; return;
  }
  const slug = slugId(cli('slug'));
  if (!/^[a-z][a-z0-9_]{2,28}$/.test(slug)) throw Error('Slug no válido');
  const folder = path.resolve(cli('salida') || path.join(ROOT, 'propuestas/chatgpt/misiones'));
  for (const protectedPath of ['app', 'secreto', 'herramientas']) {
    const p = path.join(ROOT, protectedPath);
    if (folder === p || folder.startsWith(p + path.sep))
      throw Error('No se permite escribir en ' + protectedPath + '/');
  }
  const dests = [
    path.join(folder, 'cg-' + slug + '.js'),
    path.join(folder, 'cg-' + slug + '.plan.json'),
    path.join(folder, 'cg-' + slug + '-borrador.json')
  ];
  for (const filename of dests) {
    try { await fs.access(filename); throw Error('Ya existe: ' + filename); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
  }
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'pkm-historias-'));
  const generate = [input ? '--desde-json' : '--idea', input || idea,
    '--slug', slug, '--salida', temp];
  if (cli('modelo')) generate.push('--modelo', cli('modelo'));
  run('generar-historia.mjs', generate);
  const draft = path.join(temp, 'cg-' + slug + '-borrador.json');
  run('compilar-aventura.mjs', [
    '--desde-json', draft, '--slug', slug,
    '--lugar', cli('lugar'), '--especie', cli('especie'),
    '--nivel', cli('nivel'), '--salida', folder
  ]);
  // Guardar fuente para revisión: el compilador ya validó la historia y el mundo.
  await fs.copyFile(draft, dests[2], fs.constants.COPYFILE_EXCL);
  console.log('✅ Misión comunitaria candidata creada: ' + dests[0]);
  console.log('Borrador narrativo y plan de juego guardados en la misma carpeta.');
  console.log('No publicado. Debe revisarse e importarse expresamente en lista.js.');
}
main().catch(e => { console.error('Error:', e.message); process.exitCode = 1; });
