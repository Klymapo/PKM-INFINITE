// Pruebas locales sin red, modelo IA ni cambios al runtime.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { validate, evaluateRhythm, nativeModule } from './generar-historia.mjs';
import { planGameplay, reviewGameplay } from './director-juego.mjs';

const file = new URL('./ejemplo.json', import.meta.url);
const data = JSON.parse(await fs.readFile(fileURLToPath(file), 'utf8'));
assert.deepEqual(validate(data), [], 'El ejemplo cumple el contrato de historias');
assert.deepEqual(evaluateRhythm(data), [], 'El ejemplo tiene ritmo Pokémon');
const m = nativeModule(data, 'ejemplo');
const id = 'cg_ejemplo_inicio';
assert.ok(m.scripts[id], 'Guion reconocible por el motor');
assert.ok(m.quests.cg_ejemplo_quest, 'Misión reconocible por el hub');
assert.ok(m.npcs.cg_ejemplo_npc, 'NPC con ID exclusivo');
const cmds = m.scripts[id];
assert.equal(cmds.filter(c => c.choice).length, 2, 'Dos decisiones');
assert.equal(cmds.filter(c => c.if).length, 2, 'Callbacks posteriores en ramas');
assert.ok(cmds.some(c => c.quest === 'cg_ejemplo_quest' && c.done), 'Final de misión');
assert.ok(cmds.every(c => !c.battle && !c.wild && !c.give), 'Nada de combate ni regalos inventados');
assert.equal(nativeModule(data, 'ejemplo').scripts[id].length, cmds.length, 'Salida determinista');

const p1 = planGameplay('misma-semilla');
const p2 = planGameplay('misma-semilla');
assert.deepEqual(p1, p2, 'Plan reproducible por semilla');
assert.deepEqual(reviewGameplay(p1), [], 'El plan contiene combate, exploración y elecciones');
assert.ok(p1.beats.every(b => b.minutes <= 10), 'Segmentos cortos para celular');
console.log('OK: generación nativa, flags aislados, continuidad básica y ritmo de mecánicas.');
