// Prueba de punta a punta del paquete paralelo de Johto (sin publicar).
// Se ejecuta junto a las herramientas originales de Elio con INFINITO_EXTRA=qa_johto.
// Verifica avance real de los guiones de T0 a T7; el bot general no inicia misiones opcionales automáticamente.
import { strict as assert } from 'node:assert';
import { loadDataNode } from '../../herramientas/test/node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G, evalCond } from '../../app/js/state.js';
import { UI, runScript } from '../../app/js/guion.js';

loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const id = 'cg_carga_johto';
assert(C.quests[id], 'Falta misión paralela');
assert(C.scripts.cg_carga_fin, 'Falta cierre del episodio');
assert(C.locations.cg_carga_anexo_trigal, 'Falta anexo físico de Trigal');
assert(C.trainers.cg_carga_practica_trigal, 'Falta combate opcional de Trigal');
let stage = '';
let mode = 'main';
const errors = [];
UI.say = async () => {};
UI.toast = (m) => { if (String(m).startsWith('Error en guion')) errors.push(String(m)); };
UI.refresh = () => {};
UI.read = async () => {};
UI.onScript = (s) => { stage = s; };
UI.goto = async (to) => { G.loc = to; };
UI.battle = async () => ({ result: mode === 'lose' ? 'lose' : 'win' });
UI.puzzle = async () => ({ result: mode === 'quit' ? 'quit' : 'solved', moves: 16 });
const choices = {
  cg_carga_inicio: /Revisar las hojas/,
  cg_carga_etiqueta: /Comparar hora impresa/,
  cg_carga_bascula: /Calibrarla/,
  cg_carga_libro: /Comparar los números/,
  cg_carga_inferencia: /Primero debemos separar/,
  cg_carga_olivo_decision: /Pedir revisión formal/,
  cg_carga_horario: /Separar preparación/,
  cg_carga_testigo: /Preguntar qué transportó/,
  cg_carga_precinto: /Emparejar número/,
  cg_carga_orden: /Preparación.*despacho.*salida/,
  cg_carga_t1_anexo_vagones: /Comparar el registro de maniobras/,
  cg_carga_t1_anexo_ruedas: /Seguir el surco/,
  cg_carga_t1_anexo_mara: /Preguntarle qué vio/,
  cg_carga_t1_anexo_archivo: /Cotejar el parte/,
  cg_carga_t1_anexo_practica: /Hacer el combate/,
  cg_carga_t1_anexo_cotejo: /La remesa cambió de vagón/,
  cg_carga_guia_camino: /Preguntar por el estado/,
  cg_carga_guia_relevo: /Preguntar qué entregó/,
  cg_carga_guia_sello: /Comparar la mancha/,
  cg_carga_cotejo_iris: /La firma prueba/,
  cg_carga_huellas: /Seguir la marca/,
  cg_carga_rejilla: /Comparar la corriente/,
  cg_carga_plantas: /Buscar el punto/,
  cg_carga_wooper: /Despejar la rejilla/,
  cg_carga_prueba_inicio: /Preparar el ensayo/,
  cg_carga_prueba_peso: /Registrar por separado/,
  cg_carga_prueba_sello: /Atar el primer cordel/,
  cg_carga_prueba_hora: /Anotar preparación/,
  cg_carga_prueba_conclusion: /El formulario pudo firmarse/,
  cg_carga_entreplanta: /Comparar el polvo/,
  cg_carga_guardia: /Comparar columnas/,
  cg_carga_firmas: /Comprobar dónde/,
  cg_carga_encargado: /Escuchar el relato/,
  cg_carga_recibo_hojas: /Separar hechos confirmados/,
  cg_carga_recibo_tinta: /Distinguir el orden/,
  cg_carga_recibo_casilla: /Leer el encabezado/,
  cg_carga_recibo_deduccion: /La recepción del papel/,
  cg_carga_recibo_decision: /Rectificación pública/,
  cg_carga_entrega_final: /Anotar también/
};
UI.choose = async (_, options) => {
  const preference = mode === 'battle' || mode === 'lose' ? (stage === 'cg_carga_encargado' ? /Aceptar su combate/ : choices[stage]) : choices[stage];
  assert(preference, 'Falta elección de prueba para ' + stage + ' → ' + options.join(' / '));
  const idx = options.findIndex(x => preference.test(x));
  assert(idx >= 0, 'Elección no encontrada en ' + stage + ': ' + options.join(' / '));
  return idx;
};
const reset = (cap=74) => {
  setG(newGame({ name: 'Ensayo', pron: 'el' }));
  G.vars.cap = cap;
  G.vars.hitos = 15;
  G.flags.b03_fin = true;
  G.flags.b01_diario = true;
  G.loc = 'olivo';
  stage = '';
  errors.length = 0;
  mode = 'main';
};
const advance = async (name, flag, loc) => {
  if (loc) { G.loc = loc; G.visited[loc] = true; }
  await runScript(name);
  assert(!errors.length, 'Error en ' + name + ': ' + errors.join(' / '));
  if (flag) assert(G.flags[flag], 'No avanzó ' + name + ' → flag.' + flag);
};
const route = [
  ['cg_carga_inicio','cg_carga_inicio','olivo'],
  ['cg_carga_etiqueta','cg_carga_t0_papel'],
  ['cg_carga_bascula','cg_carga_t0_masa'],
  ['cg_carga_libro','cg_carga_t0_libro'],
  ['cg_carga_inferencia','cg_carga_t0_fin'],
  ['cg_carga_patio','cg_carga_t1_inicio','trigal'],
  ['cg_carga_horario','cg_carga_t1_horario'],
  ['cg_carga_testigo','cg_carga_t1_testigo'],
  ['cg_carga_precinto','cg_carga_t1_precinto'],
  ['cg_carga_t1_anexo_vagones','cg_carga_t1_anexo_vagones','cg_carga_anexo_trigal'],
  ['cg_carga_t1_anexo_ruedas','cg_carga_t1_anexo_ruedas'],
  ['cg_carga_t1_anexo_mara','cg_carga_t1_anexo_testimonio'],
  ['cg_carga_t1_anexo_puzzle','cg_carga_t1_anexo_panel'],
  ['cg_carga_t1_anexo_archivo','cg_carga_t1_anexo_archivo'],
  ['cg_carga_t1_anexo_practica','cg_carga_t1_anexo_practica_ganada'],
  ['cg_carga_t1_anexo_cotejo','cg_carga_t1_ruta_hecha'],
  ['cg_carga_orden','cg_carga_t1_fin','trigal'],
  ['cg_carga_iris_inicio','cg_carga_t2_inicio','iris'],
  ['cg_carga_guia_camino','cg_carga_t2_guia1'],
  ['cg_carga_guia_relevo','cg_carga_t2_guia2'],
  ['cg_carga_guia_sello','cg_carga_t2_guia3'],
  ['cg_carga_cotejo_iris','cg_carga_t2_fin'],
  ['cg_carga_caoba_inicio','cg_carga_t3_inicio','caoba'],
  ['cg_carga_huellas','cg_carga_t3_huellas'],
  ['cg_carga_rejilla','cg_carga_t3_rejilla'],
  ['cg_carga_plantas','cg_carga_t3_plantas'],
  ['cg_carga_wooper','cg_carga_t3_fin'],
  ['cg_carga_prueba_inicio','cg_carga_t4_inicio'],
  ['cg_carga_prueba_peso','cg_carga_t4_peso'],
  ['cg_carga_prueba_sello','cg_carga_t4_sello'],
  ['cg_carga_prueba_hora','cg_carga_t4_hora'],
  ['cg_carga_prueba_conclusion','cg_carga_t4_fin'],
  ['cg_carga_turno_inicio','cg_carga_t5_inicio','olivo'],
  ['cg_carga_entreplanta','cg_carga_t5_entreplanta'],
  ['cg_carga_guardia','cg_carga_t5_guardia'],
  ['cg_carga_firmas','cg_carga_t5_firmas'],
  ['cg_carga_encargado','cg_carga_t5_fin'],
  ['cg_carga_recibo_inicio','cg_carga_t6_inicio'],
  ['cg_carga_recibo_hojas','cg_carga_t6_hojas'],
  ['cg_carga_recibo_tinta','cg_carga_t6_tinta'],
  ['cg_carga_recibo_casilla','cg_carga_t6_casilla'],
  ['cg_carga_recibo_deduccion','cg_carga_t6_fin'],
  ['cg_carga_entrega_trigal','cg_carga_t7_trigal','trigal'],
  ['cg_carga_entrega_iris','cg_carga_t7_iris','iris'],
  ['cg_carga_entrega_caoba','cg_carga_t7_caoba','caoba'],
  ['cg_carga_entrega_final','cg_carga_t7_fin','olivo']
];
reset();
for (const [script, flag, loc] of route) await advance(script, flag, loc);
assert(G.quests[id].done, 'La misión no se marca como hecha');
assert.equal(G.vars.cap, 76, 'Tope final equivocado');
assert.equal(G.flags.cg_carga_cap_recibido, true, 'No registró el tope');
assert.equal(G.player.badges.length, 0, 'No debe dar medallas');
assert.equal(G.bag.maxpotion, 2, 'La recompensa debe darse una vez');
assert.equal(G.player.money, 5400, 'El pago debe darse una vez');
const snapshot = { money: G.player.money, cap: G.vars.cap, items: G.bag.maxpotion, hitos: G.vars.hitos };
assert(!evalCond('!flag.cg_carga_t7_fin'), 'La escena final debe desaparecer del lugar');
assert(C.locations.olivo.spots.some(s => s.label === 'Recuerdo del envío de Johto'), 'Falta epílogo accesible');
await advance('cg_carga_epilogo');
assert.deepEqual({ money: G.player.money, cap: G.vars.cap, items: G.bag.maxpotion, hitos: G.vars.hitos }, snapshot, 'El epílogo no debe pagar otra vez');
console.log('✔ T0–T7: 46 escenas/acciones comprobadas, anexo de Trigal, conclusión y guardas de premios');

// La salida de la maqueta y la derrota del entrenamiento dejan reintentar.
reset(74);
G.flags.cg_carga_t1_inicio = true;
G.flags.cg_carga_t1_anexo_vagones = true;
G.flags.cg_carga_t1_anexo_ruedas = true;
mode = 'quit';
await advance('cg_carga_t1_anexo_puzzle', null, 'cg_carga_anexo_trigal');
assert(!G.flags.cg_carga_t1_anexo_panel, 'Salir del puzle no debe abrir el archivo');
mode = 'main';
await advance('cg_carga_t1_anexo_puzzle', 'cg_carga_t1_anexo_panel');
console.log('✔ Maqueta: salir y reintentar sin perder progreso');
reset(74);
mode = 'lose';
await advance('cg_carga_t1_anexo_practica', null, 'cg_carga_anexo_trigal');
assert(!G.flags.cg_carga_t1_anexo_practica_ganada, 'La derrota no se marca como victoria');
mode = 'main';
await advance('cg_carga_t1_anexo_practica','cg_carga_t1_anexo_practica_ganada');
console.log('✔ Entrenamiento: derrota, curación y reintento');

for (const variant of ['battle','lose']) {
  reset(74);
  mode = variant;
  G.flags.cg_carga_t5_guardia = true;
  G.flags.cg_carga_t5_entreplanta = true;
  G.flags.cg_carga_t5_firmas = true;
  await advance('cg_carga_encargado','cg_carga_t5_fin','olivo');
  assert.equal(G.quests[id].stage, 'recibo', 'El combate no debe colgar la misión');
  console.log('✔ Combate opcional: ' + (variant === 'battle' ? 'victoria' : 'derrota') + ' continúa');
}
reset(62);
G.flags.cg_carga_t7_trigal = true;
G.flags.cg_carga_t7_iris = true;
G.flags.cg_carga_t7_caoba = true;
await advance('cg_carga_entrega_final','cg_carga_t7_fin','olivo');
assert.equal(G.vars.cap, 62, 'No debe regalar el tope antes de la gira');
assert(!G.flags.cg_carga_cap_recibido, 'No debe consumir reconocimiento prematuramente');
G.vars.cap = 74;
await advance('cg_carga_cap_claim','cg_carga_cap_recibido');
assert.equal(G.vars.cap, 76, 'Debe poder cobrar reconocimiento después');
console.log('✔ Tope tardío: bloqueo a nivel 62, reconocimiento 74→76');
const words = Object.values(C.scripts).filter((_,i)=>true).length;
const pkg = (await import('./misiones/cg-carga-johto-completo.js')).default;
let corpus = [];
const read = value => {
  if (!value || typeof value !== 'object') { if (typeof value === 'string') corpus.push(value); return; }
  if (Array.isArray(value)) { value.forEach(read); return; }
  for (const [k,v] of Object.entries(value)) if (['text','say','desc','read','label','sub','prompt'].includes(k) && typeof v === 'string') corpus.push(v); else if (!['name','id','cond','new','doneIf','stage','icon','type'].includes(k)) read(v);
};
read(pkg.scripts);
const totalWords=corpus.join(' ').trim().split(/\s+/u).length;
console.log('NOTA DURACIÓN: corpus de diálogos y opciones ~'+totalWords+' palabras (con ramas alternativas; NO equivale a horas reales). Meta 6–8 h no verificada.');
console.log('✔ Prueba de integración propuesta: aprobada.');
