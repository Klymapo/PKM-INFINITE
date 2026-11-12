// Prueba caminos de historias Ink compiladas (.json) con inkjs, fuera del juego.
// Ejecutar npm install en esta carpeta y luego:
// node simular-ink.mjs --archivo historia-ink.json --salida /tmp/rutas-ink.json
// Esta herramienta NO interpreta guiones PKM ni modifica app/.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Story } from 'inkjs';

export function exploreInk(compiled, maxDepth = 6, maxRoutes = 60) {
  const queue = [[]], routes = [], visited = new Set();
  while (queue.length && routes.length < maxRoutes) {
    const route = queue.shift();
    const stamp = route.join(',');
    if (visited.has(stamp)) continue;
    visited.add(stamp);
    const story = new Story(compiled);
    const lines = [];
    let depth = 0, position = 0, stopped = false;
    while (depth++ < 100) {
      while (story.canContinue) {
        const output = story.Continue().trim();
        if (output) lines.push(output);
        if (lines.length > 300) { stopped = true; break; }
      }
      if (stopped || !story.currentChoices.length) break;
      const choices = story.currentChoices.map(x => x.text);
      if (position < route.length) {
        const selected = route[position++];
        if (selected < 0 || selected >= choices.length) {
          stopped = true; break;
        }
        story.ChooseChoiceIndex(selected);
      } else {
        if (route.length < maxDepth && queue.length + routes.length < maxRoutes * 6)
          for (let i = 0; i < choices.length; i++) queue.push([...route, i]);
        stopped = true;
        break;
      }
    }
    routes.push({ route, text: lines, finished: !stopped && !story.canContinue && !story.currentChoices.length });
  }
  return { routes, uniquePaths: routes.length, reachedLimit: queue.length > 0 };
}
async function main() {
  const args = process.argv.slice(2);
  const get = k => { const i = args.indexOf('--' + k); return i < 0 ? null : args[i + 1]; };
  if (!get('archivo') || !get('salida')) throw Error('Necesitas --archivo y --salida.');
  const compiled = (await fs.readFile(get('archivo'), 'utf8')).replace(/^\uFEFF/, '');
  const result = exploreInk(compiled);
  const destination = path.resolve(get('salida'));
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
  console.log('Rutas exploradas: ' + result.uniquePaths);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main().catch(e => { console.error('Error:', e.message); process.exitCode = 1; });
