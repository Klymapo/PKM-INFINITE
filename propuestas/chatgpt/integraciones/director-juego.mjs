// Planificador ORIGINAL de mecánicas y ritmo para propuestas de Pokémon Infinite.
// Toma ideas de la arquitectura de juegos OSS, pero NO copia código ni recursos.
// No cambia el runtime ni inventa equipos, especies, movimientos o recompensas.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function numberSeed(v) {
  let h = 2166136261;
  for (const c of String(v)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}
function rng(seed) {
  let x = numberSeed(seed);
  return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; };
}
function pick(a, random) { return a[Math.floor(random() * a.length)]; }

export function planGameplay(seed = 'aventura') {
  const random = rng(seed);
  const conflict = pick([
    'un personaje oculta algo por una razón comprensible',
    'dos personajes tienen objetivos legítimos incompatibles',
    'una promesa antigua se pone a prueba con una decisión presente'
  ], random);
  const beats = [
    { order: 1, mode: 'convivencia', objective: 'Presentar un personaje con contradicciones y darle una acción memorable.', minutes: 5 },
    { order: 2, mode: 'exploracion', objective: 'Observar el lugar y descubrir una pista mediante interacción, no leyendo un informe.', minutes: 7 },
    { order: 3, mode: 'decision', objective: 'Elegir entre dos soluciones razonables; guardar la consecuencia en un flag nuevo.', minutes: 4 },
    { order: 4, mode: 'combate', objective: 'Combate Pokémon conectado al problema, usando los datos y reglas ya existentes.', minutes: 8 },
    { order: 5, mode: 'convivencia', objective: 'Mostrar una reacción emocional tras el combate y retomar un personaje conocido.', minutes: 5 },
    { order: 6, mode: 'exploracion', objective: 'La pista anterior cambia de significado; visita o reencuentro con propósito.', minutes: 6 },
    { order: 7, mode: 'decision', objective: 'Resolver un dilema distinto al primero; dos salidas con costos legítimos.', minutes: 5 },
    { order: 8, mode: 'consecuencia', objective: 'Mostrar inmediatamente una consecuencia y dejar un eco para otro bloque.', minutes: 4 }
  ];
  if (random() < .5) {
    beats[3].objective += ' Un rival vuelve después con una postura distinta.';
  } else {
    beats[5].objective += ' Cambiar el contexto de un objeto o espacio antes visto.';
  }
  return {
    seed: String(seed), conflict, design: 'aventura original en el motor actual',
    estimatedMinutes: beats.reduce((n, x) => n + x.minutes, 0), beats,
    hooks: {
      combate: 'Conectar mediante { battle: trainerId } creado y validado por Elio.',
      exploracion: 'Conectar con spots, tramos o puzles existentes del motor.',
      decisiones: 'Usar { choice }, { set } y callbacks con flags nuevos cg_.',
      recompensa: 'Utilizar exclusivamente objetos/especies válidos en app/data.'
    },
    safety: [
      'No ejecutar ni modificar el combate de Showdown.',
      'No cambiar capítulos existentes, flags, inventario o guardados.',
      'No usar recursos gráficos, audio o código de los repositorios de referencia.',
      'Revisar canon, ubicación, continuidad, legibilidad móvil y spoilers antes de publicar.'
    ]
  };
}

export function reviewGameplay(plan) {
  const errors = [];
  const beats = plan?.beats || [];
  if (beats.filter(x => x.mode === 'combate').length < 1) errors.push('Sin combate Pokémon.');
  if (beats.filter(x => x.mode === 'exploracion').length < 2) errors.push('Exploración insuficiente.');
  if (beats.filter(x => x.mode === 'decision').length < 2) errors.push('Decisiones insuficientes.');
  if (beats.some(x => x.minutes > 10)) errors.push('Un segmento podría sentirse demasiado largo.');
  if (beats.some(x => !x.objective)) errors.push('Hay segmentos sin función jugable.');
  return errors;
}
async function main() {
  const args = process.argv.slice(2);
  const get = k => { const i = args.indexOf('--' + k); return i < 0 ? null : args[i + 1]; };
  const target = get('salida');
  if (!target) {
    console.log('Uso: node director-juego.mjs --semilla "tema" --salida /tmp/plan-juego.json');
    process.exitCode = 2; return;
  }
  const plan = planGameplay(get('semilla') || 'aventura');
  const errors = reviewGameplay(plan);
  if (errors.length) throw Error(errors.join(' | '));
  const p = path.resolve(target);
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, JSON.stringify(plan, null, 2) + '\n', { flag: 'wx' });
  console.log('Plan mecánico aislado: ' + p + ' (' + plan.estimatedMinutes + ' minutos estimados, no medidos)');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main().catch(e => { console.error('Error:', e.message); process.exitCode = 1; });
