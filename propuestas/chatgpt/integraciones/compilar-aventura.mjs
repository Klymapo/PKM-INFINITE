// Compilador aditivo de historias a una misión comunitaria REAL, sin tocar el runtime.
// Genera un módulo cg-*.js con NPC, 4 puntos interactivos, combate real,
// dos decisiones persistentes y desenlace, para revisión editorial de Elio.
// Sólo lo conecta al juego quien lo importe en app/content/comunidad/lista.js.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate, evaluateRhythm } from './generar-historia.mjs';
import { planGameplay, reviewGameplay } from './director-juego.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, '../../..');
const IDENT = /^[a-z][a-z0-9_]{2,40}$/;
const slugId = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 28);

function validId(value, label) {
  if (!IDENT.test(value || '')) throw Error(label + ' inválido: ' + value);
  return value;
}
function text(s) { return String(s || '').trim(); }

// Usable, testable with no services or network. No existing missions are modified.
export function buildPlayablePack(data, opts) {
  const problems = validate(data);
  if (problems.length) throw Error('Historia inválida: ' + problems.join(' / '));
  const slug = validId(slugId(opts?.slug), 'slug');
  const location = validId(opts?.location, 'location');
  const species = validId(opts?.species, 'species');
  const level = Number(opts?.level);
  if (!Number.isInteger(level) || level < 1 || level > 100)
    throw Error('Nivel del entrenador: entero 1..100');
  const id = 'cg_' + slug + '_';
  const ids = {
    npc: id + 'npc', trainer: id + 'trainer', quest: id + 'quest',
    intro: id + 'intro', explore: id + 'explore',
    battle: id + 'battle', finish: id + 'finish', after: id + 'after',
    started: id + 'started', explored: id + 'explored', won: id + 'won',
    completed: id + 'completed', first0: id + 'decision1_0',
    first1: id + 'decision1_1', second0: id + 'decision2_0',
    second1: id + 'decision2_1'
  };
  const flag = k => 'flag.' + ids[k];
  const say = value => ({ say: ids.npc, text: text(value) });
  const flagsChoice = (name, choices) => ({
    prompt: text(choices.question),
    choice: choices.options.map((o, i) => ({
      text: text(o.text),
      then: [{ set: { [flag(name + i)]: true } }, say(o.response)]
    }))
  });
  const scenes = data.scenes || [];
  const intro = scenes[0];
  const find = mode => scenes.find(s => s.mode === mode);
  const exploration = find('exploracion') || find('descubrimiento') || scenes[1];
  const combat = find('combate');
  const closing = scenes.filter(s => s !== intro && s !== exploration && s !== combat);
  const plan = planGameplay(id);
  const pack = {
    npcs: {
      [ids.npc]: {
        name: data.npc.name, title: 'Habitante del lugar',
        look: { hair: 'short', hairColor: '#5e4b45', eyes: '#407b90',
          outfit: '#497b9b', outfit2: '#d0bd96', skin: 2 }
      }
    },
    trainers: {
      [ids.trainer]: {
        name: data.npc.name, npc: ids.npc, cls: 'Entrenadora',
        ai: 2, team: [{ sp: species, lv: level }],
        reward: 0,
        intro: 'Quiero resolver esto contigo. Un combate nos ayudará a decidir.',
        win: 'Bien jugado. Ahora tendremos que hablar.',
        lose: 'Podemos volver a intentarlo.'
      }
    },
    quests: {
      [ids.quest]: {
        name: data.title, type: 'side', est: plan.estimatedMinutes,
        stages: {
          inicio: data.premise,
          investigar: 'Investiga el entorno con el personaje que conociste.',
          reto: 'Enfréntate a su desafío Pokémon.',
          regreso: 'Habla otra vez con el personaje para cerrar la historia.',
          hecha: 'Esta aventura terminó. Sus decisiones podrán recordarse después.'
        }
      }
    },
    patches: {
      [location]: { spots: [
        { label: 'Conocer a ' + data.npc.name, icon: '💬',
          sub: 'Una nueva historia', cond: '!' + flag('started'),
          new: true, talk: [{ script: ids.intro }] },
        { label: 'Explorar con ' + data.npc.name, icon: '🔎',
          sub: 'Hay algo que descubrir', cond: flag('started') + ' && !' + flag('explored'),
          new: true, talk: [{ script: ids.explore }] },
        { label: 'Desafío de ' + data.npc.name, icon: '⚔️',
          sub: 'Combate Pokémon', cond: flag('explored') + ' && !' + flag('won'),
          talk: [{ script: ids.battle }] },
        { label: 'Volver con ' + data.npc.name, icon: '🌟',
          sub: 'Concluir la historia', cond: flag('won') + ' && !' + flag('completed'),
          new: true, talk: [{ script: ids.finish }] },
        { label: 'Saludar a ' + data.npc.name, icon: '💬',
          sub: 'Un encuentro conocido', cond: flag('completed'),
          talk: [{ script: ids.after }] }
      ] }
    },
    scripts: {
      [ids.intro]: [
        { quest: ids.quest, stage: 'inicio' },
        say(intro.text),
        flagsChoice('first', data.decision1),
        { set: { [flag('started')]: true } },
        { quest: ids.quest, stage: 'investigar' }
      ],
      [ids.explore]: [
        { text: exploration.text },
        { set: { [flag('explored')]: true } },
        { quest: ids.quest, stage: 'reto' }
      ],
      [ids.battle]: [
        { text: combat?.text || 'El desafío Pokémon comienza.' },
        { battle: ids.trainer, lose: 'continue',
          onWin: [
            { set: { [flag('won')]: true } },
            { quest: ids.quest, stage: 'regreso' },
            say('Buen combate. Me gustaría que termináramos de hablar.')
          ],
          onLose: [
            say('No pasa nada. Cuando quieras, tendremos nuestra revancha.')
          ] }
      ],
      [ids.finish]: [
        ...closing.map(s => ({ text: s.text })),
        flagsChoice('second', data.decision2),
        { if: flag('first0'), then: [say(data.callbacks[0])] },
        { if: flag('first1'), then: [say(data.callbacks[1])] },
        say(data.ending),
        { quest: ids.quest, done: true },
        { set: { [flag('completed')]: true } }
      ],
      [ids.after]: [say('Me alegra volver a verte. Todavía recuerdo aquella aventura.')]
    }
  };
  return { id, ids, pack, plan, warnings: evaluateRhythm(data).concat(reviewGameplay(plan)) };
}

async function verifyCurrentRepo(pack, location, species) {
  // Loading the registry happens only in the developer's local process;
  // no unpublished content is printed, uploaded or sent to a model.
  const speciesDb = JSON.parse(await fs.readFile(path.join(ROOT, 'app/data/species.json'), 'utf8'));
  if (!speciesDb[species] || speciesDb[species].battleOnly)
    throw Error('Especie no utilizable en app/data: ' + species);
  const { loadDataNode } = await import('../../../herramientas/test/node-env.mjs');
  loadDataNode();
  const { C, registerBlock } = await import('../../../app/js/content.js');
  const { BLOCKS } = await import('../../../app/content/index.js');
  for (const block of BLOCKS) registerBlock(block);
  if (!C.locations[location]) throw Error('Lugar inexistente en el mundo actual: ' + location);
  if (C.locations[location].route) throw Error('El lugar es una ruta: elige una ciudad/subárea con spots.');
  for (const table of ['npcs','trainers','quests','scripts']) {
    for (const id of Object.keys(pack[table] || {}))
      if (C[table]?.[id]) throw Error('Colisión de identificador publicado: ' + id);
  }
  return true;
}

async function main() {
  const argv = process.argv;
  const get = k => { const i = argv.indexOf('--' + k); return i < 0 ? null : argv[i + 1]; };
  const source = get('desde-json'), dest = get('salida');
  if (!source || !dest || !get('slug') || !get('lugar') || !get('especie') || !get('nivel')) {
    console.error('Uso: node compilar-aventura.mjs --desde-json historia.json --slug mi_historia --lugar luminalia --especie pidgeot --nivel 50 --salida /tmp/pkm-misiones');
    process.exitCode = 2; return;
  }
  const story = JSON.parse(await fs.readFile(source, 'utf8'));
  const built = buildPlayablePack(story, {
    slug: get('slug'), location: get('lugar'),
    species: get('especie'), level: get('nivel')
  });
  await verifyCurrentRepo(built.pack, get('lugar'), get('especie'));
  const outputDir = path.resolve(dest);
  for (const protectedPath of ['app', 'secreto', 'herramientas']) {
    const d = path.join(ROOT, protectedPath);
    if (outputDir === d || outputDir.startsWith(d + path.sep))
      throw Error('Ruta protegida: no se escribe bajo ' + protectedPath + '/');
  }
  await fs.mkdir(outputDir, { recursive: true });
  const basename = 'cg-' + get('slug').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const result = [
    [basename + '.js', '// MISIÓN CANDIDATA; Elio debe revisar antes de conectar a lista.js.\nexport default ' + JSON.stringify(built.pack, null, 2) + ';\n'],
    [basename + '.plan.json', JSON.stringify({ plan: built.plan, warnings: built.warnings,
      status: 'revision_obligatoria', location: get('lugar'), species: get('especie') }, null, 2) + '\n']
  ];
  // Reserve all output paths first. Never overwrite an earlier proposal.
  for (const [name] of result) {
    try { await fs.access(path.join(outputDir, name)); throw Error('Ya existe: ' + name); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
  }
  for (const [name, content] of result) await fs.writeFile(path.join(outputDir, name), content, { flag: 'wx' });
  console.log('Misión compilada y validada, aislada para revisión: ' + basename);
  console.log('Lugar y especie verificados con el repositorio. No se modificó app/ ni la partida.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main().catch(e => { console.error('Error:', e.message); process.exitCode = 1; });
