// Propuesta independiente · El puente no puntúa · 20–25 min
export default {
  npcs: {
    cg_puente_elia: { name: 'Elia', title: 'Inspectora de senderos', look: { hair: 'tied', hairColor: '#5b3a29', eyes: '#5e754d', outfit: '#d9b763', outfit2: '#405c56', skin: 2, eyesStyle: 'sharp', mouth: 'flat', acc: 'bandana' } },
    cg_puente_teo: { name: 'Teo', title: 'Aspirante a guía', look: { hair: 'spiky', hairColor: '#30364d', eyes: '#718bc2', outfit: '#52759a', outfit2: '#e8d8b5', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: '' } },
  },
  quests: {
    cg_puente: { name: 'El puente no puntúa', type: 'side', est: 25,
      stages: { inicio: 'Habla con Elia en Celeste.', prueba: 'Busca a Teo en la Ruta 24.', regreso: 'Explica a Elia lo sucedido.', hecha: 'La ruta tiene un guía que sabe esperar.' } },
  },
  trainers: {
    cg_puente_teo_prueba: { name: 'Teo', cls: 'Guía', npc: 'cg_puente_teo', ai: 3, reward: 850,
      team: [
        { sp: 'noctowl', lv: 53, moves: ['airslash', 'psychic', 'hypnosis', 'roost'] },
        { sp: 'ampharos', lv: 54, moves: ['discharge', 'powergem', 'thunderwave', 'cottonguard'] },
      ],
      intro: 'No quiero ganar. Quiero saber si puedo mantener la calma.',
      win: 'Perdí, sí. Pero esta vez miré el camino, no el marcador.',
      lose: 'Ganar no me dice si vi lo importante.',
    },
  },
  patches: {
    celeste: { spots: [
      { label: 'Inspectora de senderos', sub: 'Cuenta pasos con un lápiz corto', icon: '📋', cond: '!done.cg_puente', new: '!flag.cg_puente_inicio', talk: [
        { cond: '!flag.cg_puente_inicio', script: 'cg_puente_inicio' },
        { cond: 'flag.cg_puente_prueba', script: 'cg_puente_regreso' },
        { script: 'cg_puente_espera' },
      ] },
      { label: 'Tablón de rutas seguras', icon: '📌', cond: 'done.cg_puente', talk: [{ script: 'cg_puente_despues' }] },
    ] },
    ruta24: { spots: [
      { label: 'Guía junto al puente', sub: 'Ensaya un discurso frente al agua', icon: '🌉', cond: 'flag.cg_puente_inicio && !flag.cg_puente_prueba', new: 'true', talk: [{ script: 'cg_puente_prueba' }] },
    ] },
  },
  scripts: {
    cg_puente_inicio: [
      { say: 'cg_puente_elia', text: 'Busco a alguien que guíe a los viajeros por la Ruta 24. La fuerza ayuda, pero no sustituye a prestar atención.' },
      { say: 'cg_puente_elia', text: 'Teo quiere presentarse. Solo habla de su récord de victorias. Yo necesito saber si puede cuidar a quien camina despacio.' },
      { choice: [
        { text: 'Ayudar con la prueba', then: [
          { set: { 'flag.cg_puente_inicio': true } },
          { quest: 'cg_puente', stage: 'prueba' },
          { say: 'cg_puente_elia', text: 'Está junto al puente. Pregúntale por los viajeros, no por las medallas.' },
        ] },
        { text: 'Más tarde', then: [{ say: 'cg_puente_elia', text: 'La ruta no se va a mover.' }] },
      ] },
    ],
    cg_puente_espera: [{ say: 'cg_puente_elia', text: 'Teo está en la Ruta 24. Que no olvide mirar a los lados.' }],
    cg_puente_prueba: [
      { say: 'cg_puente_teo', text: 'Tengo el discurso ensayado y el equipo listo. ¿Quieres comprobar mi nivel?' },
      'Un excursionista deja caer una bolsa al cruzar. Teo no se ha dado cuenta.',
      { choice: [
        { text: 'Señalar la bolsa', then: [
          { set: { 'flag.cg_puente_atento': true } },
          { say: 'cg_puente_teo', text: 'No la vi. Estaba pensando en mi primera frase. Vamos a devolvérsela.' },
          { call: 'cg_puente_desafio' },
        ] },
        { text: 'Preguntar qué haría ante un accidente', then: [
          { set: { 'flag.cg_puente_pregunto': true } },
          { say: 'cg_puente_teo', text: 'Avisaría a todos… Espera, alguien acaba de perder una bolsa. Ni siquiera me di cuenta.' },
          { call: 'cg_puente_desafio' },
        ] },
      ] },
    ],
    cg_puente_desafio: [
      { say: 'cg_puente_teo', text: 'Primero que termine de cruzar ese viajero. Si combatimos, curo a tu equipo antes. Un guía no se aprovecha del cansancio.' },
      { choice: [
        { text: 'Combatir (con curación previa)', then: [
          { heal: true },
          { battle: 'cg_puente_teo_prueba', lose: 'continue',
            onWin: [
              { set: { 'flag.cg_puente_victoria': true, 'flag.cg_puente_prueba': true } },
              { quest: 'cg_puente', stage: 'regreso' },
              { say: 'cg_puente_teo', text: 'Me has ganado. Esta vez no perdí de vista el puente. Eso sí es nuevo.' },
            ],
            onLose: [
              { set: { 'flag.cg_puente_prueba': true } },
              { quest: 'cg_puente', stage: 'regreso' },
              { say: 'cg_puente_teo', text: 'Gané, pero el verdadero examen era mirar a los viajeros.' },
            ] },
        ] },
        { text: 'Observar el paso sin combatir', then: [
          { set: { 'flag.cg_puente_paciencia': true, 'flag.cg_puente_prueba': true } },
          { quest: 'cg_puente', stage: 'regreso' },
          { say: 'cg_puente_teo', text: 'No tuve que ganar nada. Solo esperar al último. Curioso.' },
        ] },
      ] },
    ],
    cg_puente_regreso: [
      { say: 'cg_puente_elia', text: 'No me digas si ganó. Dime si vio a la gente.' },
      { if: 'flag.cg_puente_atento', then: [{ say: 'cg_puente_elia', text: 'Me han contado que avisaste a tiempo de la bolsa. Eso cuenta como cuidar el paso.' }] },
      { if: 'flag.cg_puente_pregunto', then: [{ say: 'cg_puente_elia', text: 'Tu pregunta le hizo revisar el puente por sí mismo. Eso es lo que esperaba de un guía.' }] },
      { choice: [
        { text: 'Contar aciertos y errores', then: [
          { set: { 'flag.cg_puente_franco': true } },
          { say: 'cg_puente_elia', text: 'Un informe que reconoce un error sirve para evitar el siguiente.' },
          { call: 'cg_puente_cierre' },
        ] },
        { text: 'Destacar que aprendió a esperar', then: [
          { set: { 'flag.cg_puente_cuidado': true } },
          { say: 'cg_puente_elia', text: 'Bien. Yo añadiré lo de la bolsa al acta, para que no se le olvide.' },
          { call: 'cg_puente_cierre' },
        ] },
      ] },
    ],
    cg_puente_cierre: [
      { say: 'cg_puente_elia', text: 'Le daré un turno de prueba. No por su fuerza, sino porque aprendió a mirar a ambos lados.' },
      { give: 'hyperpotion', n: 1 },
      { money: 600 },
      { quest: 'cg_puente', stage: 'hecha', done: true },
      { diary: 'He visto a Teo dejar pasar al último viajero. Una ruta segura no termina cuando llega el más rápido.' },
    ],
    cg_puente_despues: [
      { if: 'flag.cg_puente_franco', then: ['Teo escribió en el tablón: «Si pierdes de vista a alguien, detente». Debajo: «Sobre todo si vas ganando».'] },
      { if: 'flag.cg_puente_cuidado', then: ['Teo escribió: «El último también cuenta». Elia añadió con tinta roja: «Y las bolsas».'] },
    ],
  },
};
