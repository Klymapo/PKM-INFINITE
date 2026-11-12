// Generador de borradores narrativos PARA REVISION; no modifica app/ ni partidas.
// Requiere Node 20+ y, opcionalmente, Ollama local. Sin servicios de pago.
// Ejemplo: node generar-historia.mjs --idea "Un favor inesperado" --slug favor --salida /tmp/pkm-propuesta
// Modo sin IA: --desde-json ejemplo.json
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function arg(name) {
  const i = process.argv.indexOf('--' + name);
  return i < 0 ? null : process.argv[i + 1];
}
function requireText(v, label, max = 600) {
  if (typeof v !== 'string' || !v.trim() || v.length > max) throw Error('Campo inválido: ' + label);
  return v.trim();
}
function slugify(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 28);
}
const modes = new Set(['dialogo', 'exploracion', 'combate', 'descubrimiento', 'convivencia']);
export function validate(data) {
  const errors = [];
  try {
    requireText(data.title, 'title', 90);
    requireText(data.premise, 'premise', 480);
    requireText(data.npc?.name, 'npc.name', 55);
    requireText(data.npc?.personality, 'npc.personality', 200);
    if (!Array.isArray(data.scenes) || data.scenes.length < 3 || data.scenes.length > 6)
      throw Error('scenes debe contener entre 3 y 6 escenas');
    for (const [i, s] of data.scenes.entries()) {
      requireText(s.text, 'scenes[' + i + '].text', 360);
      if (!modes.has(s.mode)) throw Error('Modo desconocido en escena ' + i);
    }
    for (const id of ['decision1', 'decision2']) {
      const d = data[id];
      requireText(d?.question, id + '.question', 170);
      if (!Array.isArray(d.options) || d.options.length !== 2) throw Error(id + ': exactamente dos opciones');
      for (const o of d.options) {
        requireText(o.text, id + '.option.text', 130);
        requireText(o.response, id + '.option.response', 300);
      }
      if (d.options[0].text.trim().toLowerCase() === d.options[1].text.trim().toLowerCase())
        throw Error(id + ': opciones idénticas');
    }
    if (!Array.isArray(data.callbacks) || data.callbacks.length !== 2)
      throw Error('callbacks: un eco narrativo de cada rama de decision1');
    for (const [i, t] of data.callbacks.entries()) requireText(t, 'callbacks[' + i + ']', 300);
    requireText(data.ending, 'ending', 330);
  } catch (e) { errors.push(e.message); }
  return errors;
}
export function evaluateRhythm(data) {
  const warnings = [];
  const modesPresent = (data.scenes || []).map(s => s.mode);
  if (!modesPresent.includes('exploracion')) warnings.push('Sin exploración: podría sentirse como una novela visual.');
  if (!modesPresent.includes('combate')) warnings.push('Sin combate: revisar si sigue sintiéndose como Pokémon.');
  if (modesPresent.filter(m => m === 'dialogo').length > 2) warnings.push('Demasiadas escenas de puro diálogo.');
  if ((data.scenes || []).some(s => s.text.length > 240))
    warnings.push('Hay escenas largas para teléfono; dividirlas antes de publicar.');
  return warnings;
}
export function nativeModule(data, slug) {
  const id = 'cg_' + slug;
  const npc = id + '_npc', quest = id + '_quest', start = id + '_inicio';
  const flag = (d, i) => 'flag.' + id + '_' + d + '_' + i;
  const speak = text => ({ say: npc, text });
  const choice = (key) => ({
    prompt: data[key].question,
    choice: data[key].options.map((o, i) => ({
      text: o.text,
      then: [
        { set: { [flag(key, i)]: true } },
        speak(o.response)
      ]
    }))
  });
  const steps = [
    { quest, stage: 'inicio' },
    speak(data.scenes[0].text),
    choice('decision1'),
    { quest, stage: 'decisiones' },
    ...data.scenes.slice(1, 2).map(s => ({ text: s.text })),
    choice('decision2'),
    ...data.scenes.slice(2).map(s => ({ text: s.text })),
    { if: flag('decision1', 0), then: [speak(data.callbacks[0])] },
    { if: flag('decision1', 1), then: [speak(data.callbacks[1])] },
    speak(data.ending),
    { quest, done: true }
  ];
  return {
    npcs: {
      [npc]: {
        name: data.npc.name,
        title: data.npc.personality,
        look: { hair: 'short', hairColor: '#654f48', eyes: '#468e98',
          outfit: '#477c9b', outfit2: '#f0d9a2', skin: 2 }
      }
    },
    quests: {
      [quest]: {
        name: data.title, type: 'side', est: 35,
        stages: { inicio: data.premise, decisiones: 'Continúa con la persona que inició la historia.',
          hecha: 'La historia terminó, pero tus decisiones pueden recordarse más adelante.' }
      }
    },
    scripts: { [start]: steps }
  };
}

async function askLocalModel(idea, model) {
  const prompt = [
    'Escribe un borrador ORIGINAL de misión secundaria para un fangame de Pokémon.',
    'Nada de spoilers, personajes canon inventados, auditorías, reportes de trabajo ni interrogatorios largos.',
    'Un personaje con motivación clara y voz propia; tensión, acción, humor sutil y consecuencias visibles.',
    'Escribe en español natural de México. En el juego los nombres oficiales de Pokémon son los de España.',
    'NO inventes Pokémon, ataques, especies, objetos, niveles ni ciudades.',
    'Tres a seis escenas alternando modos: dialogo, exploracion, combate, descubrimiento, convivencia.',
    'Al menos una escena de exploracion y una de combate. Son MARCADORES narrativos: el diseñador conectará el motor real después.',
    'Dos decisiones en momentos diferentes, exactamente 2 opciones cada una; ambas deben ser razonables, no una opción obviamente mala.',
    'La primera decisión debe tener una reacción distinta mucho después (callbacks de 2 textos).',
    'Una consecuencia no debe ser solo premio/castigo; cambia una relación, la forma de resolver un conflicto o qué sabe un personaje.',
    'Formato: RESPONDE SOLO JSON con estas claves exactas:',
    JSON.stringify({
      title: 'Título breve', premise: 'Inicio de misión sin spoilers mayores',
      npc: { name: 'Nombre original', personality: 'Un rasgo concreto y contradictorio' },
      scenes: [
        { mode: 'dialogo', text: 'Presentación breve' },
        { mode: 'exploracion', text: 'Acción concreta y descubrimiento' },
        { mode: 'combate', text: 'Momento de tensión o batalla por conectar' }
      ],
      decision1: { question: 'Pregunta', options: [{ text: 'Opción A', response: 'Reacción A' }, { text: 'Opción B', response: 'Reacción B' }] },
      decision2: { question: 'Pregunta', options: [{ text: 'Opción A', response: 'Reacción A' }, { text: 'Opción B', response: 'Reacción B' }] },
      callbacks: ['Efecto posterior de elegir A en decision1', 'Efecto posterior de elegir B en decision1'],
      ending: 'Cierre breve no definitivo'
    }),
    'IDEA DEL USUARIO: ' + idea
  ].join('\n');
  const r = await fetch('http://127.0.0.1:11434/api/generate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, format: 'json', stream: false,
      options: { temperature: 0.72, num_predict: 3000 } }),
    signal: AbortSignal.timeout(120000)
  });
  if (!r.ok) throw Error('Ollama local respondió HTTP ' + r.status + '. Comprueba el modelo instalado.');
  const payload = await r.json();
  return JSON.parse(payload.response);
}

async function main() {
  const from = arg('desde-json');
  const idea = arg('idea');
  const target = arg('salida');
  if (!target || (!from && !idea)) {
    console.error('Uso: node generar-historia.mjs --idea "premisa" --slug identificador --salida CARPETA');
    console.error('O:   node generar-historia.mjs --desde-json ejemplo.json --slug identificador --salida CARPETA');
    process.exitCode = 2; return;
  }
  const id = slugify(arg('slug') || idea || 'ejemplo');
  if (!id || id.length < 3) throw Error('Usa un --slug de 3 o más caracteres alfanuméricos.');
  const data = from ? JSON.parse(await fs.readFile(from, 'utf8'))
    : await askLocalModel(requireText(idea, 'idea', 500), arg('modelo') || 'qwen3:4b-instruct');
  const errors = validate(data);
  if (errors.length) throw Error('Borrador rechazado: ' + errors.join('; '));
  const rhythm = evaluateRhythm(data);
  const destination = path.resolve(target);
  await fs.mkdir(destination, { recursive: true });
  const base = 'cg-' + id;
  const module = nativeModule(data, id);
  // Escritura exclusiva: nunca sobrescribe un archivo existente.
  const files = [
    [base + '-borrador.json', JSON.stringify({ ...data, revision: { rhythm,
      pending: ['Conectar escenas de combate/exploración al motor', 'Integrar en lugar y bloque',
        'Auditar continuidad, nombres y posibles spoilers con Elio'] } }, null, 2) + '\n'],
    [base + '.js', '// Propuesta generada automáticamente. NO PUBLICAR SIN REVISIÓN.\nexport default ' +
      JSON.stringify(module, null, 2) + ';\n']
  ];
  for (const [name] of files) {
    try { await fs.access(path.join(destination, name)); throw Error('Ya existe ' + name); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
  }
  for (const [name, body] of files) await fs.writeFile(path.join(destination, name), body, { flag: 'wx' });
  console.log('Propuesta aislada creada en ' + destination + ' (' + base + ')');
  console.log('Avisos de ritmo: ' + (rhythm.join(' | ') || 'ninguno'));
  console.log('Ningún guion se ha activado o publicado en el juego.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main().catch(e => { console.error('Error:', e.message); process.exitCode = 1; });
