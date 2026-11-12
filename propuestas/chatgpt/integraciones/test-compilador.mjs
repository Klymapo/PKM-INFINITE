// Pruebas reales del compilador: formato del motor + CLI + comprobación de catálogos.
// Son deterministas y no usan servicios externos, ni guardados, ni cuentas.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildPlayablePack } from './compilar-aventura.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const story = JSON.parse(await fs.readFile(path.join(here, 'ejemplo.json'), 'utf8'));
const opts = { slug: 'prueba_pkm', location: 'luminalia', species: 'pidgeot', level: 50 };
const { id, pack, plan, warnings } = buildPlayablePack(story, opts);
assert.equal(id, 'cg_prueba_pkm_');
assert.equal(warnings.length, 0);
assert.equal(plan.estimatedMinutes, 44);
assert.deepEqual(Object.keys(pack.quests), ['cg_prueba_pkm_quest']);
assert.deepEqual(Object.keys(pack.trainers), ['cg_prueba_pkm_trainer']);
assert.equal(pack.trainers.cg_prueba_pkm_trainer.team[0].sp, 'pidgeot');
assert.equal(pack.trainers.cg_prueba_pkm_trainer.team[0].lv, 50);
assert.equal(pack.patches.luminalia.spots.length, 5);
assert.equal(Object.keys(pack.scripts).length, 5);
assert.ok(pack.scripts.cg_prueba_pkm_intro.some(x => x.choice));
assert.ok(pack.scripts.cg_prueba_pkm_explore.some(x => x.set?.['flag.cg_prueba_pkm_explored']));
const battle = pack.scripts.cg_prueba_pkm_battle.find(x => x.battle);
assert.equal(battle.battle, 'cg_prueba_pkm_trainer');
assert.equal(battle.lose, 'continue');
assert.ok(battle.onWin.some(x => x.set?.['flag.cg_prueba_pkm_won']));
assert.ok(!battle.onLose.some(x => x.set?.['flag.cg_prueba_pkm_won']));
assert.ok(pack.scripts.cg_prueba_pkm_finish.some(x => x.set?.['flag.cg_prueba_pkm_completed']));
assert.ok(pack.scripts.cg_prueba_pkm_finish.some(x => x.quest === 'cg_prueba_pkm_quest' && x.done));
assert.ok(Object.keys(pack.scripts).every(k => k.startsWith(id)));
assert.ok(Object.keys(pack.npcs).every(k => k.startsWith(id)));
assert.ok(Object.keys(pack.trainers).every(k => k.startsWith(id)));
assert.throws(() => buildPlayablePack(story, { ...opts, level: 0 }), /Nivel/);
assert.throws(() => buildPlayablePack(story, { ...opts, location: 'dos lugares' }), /location/);
assert.throws(() => buildPlayablePack({ ...story, decision1: { question: '?', options: [] } }, opts), /inválida/);

const dest = await fs.mkdtemp(path.join(os.tmpdir(), 'pkm-compilador-'));
const script = path.join(here, 'compilar-aventura.mjs');
function run(extra = [], output = dest) {
  return spawnSync(process.execPath, [
    script, '--desde-json', path.join(here, 'ejemplo.json'),
    '--slug', 'prueba_pkm', '--lugar', 'luminalia', '--especie', 'pidgeot',
    '--nivel', '50', '--salida', output, ...extra
  ], { encoding: 'utf8', timeout: 120000 });
}
const ok = run();
assert.equal(ok.status, 0, 'CLI debe compilar con datos actuales: ' + ok.stderr);
const actualFile = path.join(dest, 'cg-prueba_pkm.js');
const exported = (await import(pathToFileURL(actualFile))).default;
assert.deepEqual(exported, pack, 'Código publicado debe equivaler al compilador puro');
assert.ok((await fs.readFile(path.join(dest,'cg-prueba_pkm.plan.json'),'utf8')).includes('revision_obligatoria'));
const duplicate = run();
assert.notEqual(duplicate.status, 0, 'No sobrescribir propuestas existentes');
const badSpeciesDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pkm-especie-'));
const badSpecies = run(['--especie', 'fakespeciemisteriosa'], badSpeciesDir);
assert.notEqual(badSpecies.status, 0, 'Rechazar Pokémon inventados');
const badLocDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pkm-lugar-'));
const badLocation = run(['--lugar', 'sitio_inexistente'], badLocDir);
assert.notEqual(badLocation.status, 0, 'Rechazar lugares inexistentes');
console.log('OK: 5 puntos jugables, combate real, decisiones, evolución por fases, CLI y catálogos validados.');
