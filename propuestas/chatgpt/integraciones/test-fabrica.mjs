// Prueba end-to-end offline de la fábrica unificada. No llama a Ollama.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'pkm-fabrica-test-'));
const args = [
  path.join(here, 'crear-aventura.mjs'),
  '--desde-json', path.join(here, 'ejemplo.json'),
  '--slug', 'prueba_fabrica', '--lugar', 'luminalia',
  '--especie', 'pidgeot', '--nivel', '50', '--salida', temp
];
const run = () => spawnSync(process.execPath, args, { encoding: 'utf8', timeout: 120000 });
const first = run();
assert.equal(first.status, 0, first.stderr + '\n' + first.stdout);
const prefix = path.join(temp, 'cg-prueba_fabrica');
const story = JSON.parse(await fs.readFile(prefix + '-borrador.json', 'utf8'));
const plan = JSON.parse(await fs.readFile(prefix + '.plan.json', 'utf8'));
const playable = (await import(pathToFileURL(prefix + '.js'))).default;
assert.ok(story.title && story.npc && story.decision1 && story.decision2);
assert.equal(plan.status, 'revision_obligatoria');
assert.equal(plan.plan.beats.length, 8);
assert.equal(playable.patches.luminalia.spots.length, 5);
assert.ok(playable.scripts.cg_prueba_fabrica_battle.some(x => x.battle));
assert.ok(playable.scripts.cg_prueba_fabrica_finish.some(x => x.choice));
const second = run();
assert.notEqual(second.status, 0, 'No debe pisar resultados previos');
console.log('OK: idea JSON -> trama + escena de exploración + combate real + decisiones + plan. Repetición rechazada.');
