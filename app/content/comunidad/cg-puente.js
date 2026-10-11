// Propuesta independiente · El puente no puntúa · 20–25 min
export default {
  npcs: {
    cg_puente_elia: { name: 'Pilar', title: 'Cuarta del Puente Pepita', look: { hair: 'braids', hairColor: '#3a2a1e', outfit: '#f2c43a', outfit2: '#3b5bb5', skin: 3, eyesStyle: 'normal', mouth: 'flat' } },
    cg_puente_teo: { name: 'Gonzalo', title: 'Tercero del Puente Pepita', look: { hair: 'cap', hairColor: '#2b2b38', outfit: '#3b5bb5', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'normal', mouth: 'grin', capColor: '#c4473a' } },
  },
  quests: {
    cg_puente: { name: 'El puente no puntúa', type: 'side', est: 25,
      stages: { inicio: 'Habla con **Pilar**, la del Puente Pepita, en **Celeste**.', prueba: 'Busca a **Gonzalo** en el **Puente Pepita** (Ruta 24).', regreso: 'Vuelve con **Pilar** a **Celeste** y cuéntale cómo fue.', hecha: 'La ruta tiene un guía que sabe esperar.' } },
  },
  trainers: {
    cg_puente_teo_prueba: { name: 'Gonzalo', cls: 'Joven', npc: 'cg_puente_teo', ai: 3, reward: 850,
      team: [
        { sp: 'sandslash', lv: 53, moves: ['earthquake', 'slash', 'rockslide', 'poisonjab'] },
        { sp: 'raticate', lv: 54, moves: ['hyperfang', 'crunch', 'suckerpunch', 'uturn'] },
      ],
      intro: 'No quiero ganar. Quiero saber si puedo mantener la calma.',
      win: 'Perdí, sí. Pero esta vez miré el camino, no el marcador.',
      lose: 'Ganar no me dice si vi lo importante.',
    },
  },
  patches: {
    celeste: { spots: [
      { label: 'Pilar, la del Puente Pepita', sub: 'Lee una lista de nombres con cara de preocupación', icon: '📋', cond: '!done.cg_puente', new: '!flag.cg_puente_inicio || flag.cg_puente_prueba', talk: [
        { cond: '!flag.cg_puente_inicio', script: 'cg_puente_inicio' },
        { cond: 'flag.cg_puente_prueba', script: 'cg_puente_regreso' },
        { script: 'cg_puente_espera' },
      ] },
      { label: 'Tablón de rutas seguras', icon: '📌', cond: 'done.cg_puente', talk: [{ script: 'cg_puente_despues' }] },
    ] },
    ruta24: { route: { tramos: { 4: [
      { talk: [{ script: 'cg_puente_prueba' }], label: 'Gonzalo, en la barandilla', sub: 'Ensaya un discurso frente al agua', icon: '🌉', cond: 'flag.cg_puente_inicio && !flag.cg_puente_prueba', new: 'true' },
    ] } } },
  },
  scripts: {
    cg_puente_inicio: [
      { say: 'cg_puente_elia', text: '¡Anda, tú! Te recuerdo: cruzaste los cinco combates del puente sin despeinarte. Soy Pilar, la cuarta. —Te enseña la lista—. Desde que se fue el del maletín, el puente necesita a alguien que guíe a los viajeros por la Ruta 24. No uno que gane: uno que se fije.' },
      { say: 'cg_puente_elia', text: 'Gonzalo, el tercero, quiere el puesto. Solo habla de que su Raticate está en el uno por ciento de los mejores. A ti te respeta: le ganaste. Ve a verlo y dime si sabe cuidar a quien camina despacio.' },
      { choice: [
        { text: 'Ayudar con la prueba', then: [
          { set: { 'flag.cg_puente_inicio': true } },
          { quest: 'cg_puente', stage: 'prueba' },
          { say: 'cg_puente_elia', text: 'Está en la barandilla, como siempre. Pregúntale por los viajeros, no por su Raticate.' },
        ] },
        { text: 'Más tarde', then: [{ say: 'cg_puente_elia', text: 'La ruta no se va a mover.' }] },
      ] },
    ],
    cg_puente_espera: [{ say: 'cg_puente_elia', text: 'Gonzalo está en el puente. Que no se le olvide mirar a los lados.' }],
    cg_puente_prueba: [
      { say: 'cg_puente_teo', text: '¡Tú! ¡Quien ganó los cinco! Tengo el discurso de guía ensayado y el equipo listo. Mi Raticate está en el uno por ciento, ¿eh? ¿Quieres comprobar mi nivel?' },
      'Un excursionista deja caer una bolsa al cruzar. Gonzalo no se ha dado cuenta.',
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
      { diary: 'Hoy mi entrenador{|a|e} ayudó a un chico del Puente Pepita a ser guía. Se llama Gonzalo y al principio solo hablaba de sus victorias. Luego dejó pasar al último viajero sin prisa. ¡Yo también quiero ser guía! Bueno, ya lo soy. Soy una Pokédex. Es casi lo mismo.', cond: 'flag.b01_diario' },
    ],
    cg_puente_despues: [
      { if: 'flag.cg_puente_franco', then: ['Gonzalo escribió en el tablón: «Si pierdes de vista a alguien, detente». Debajo: «Sobre todo si vas ganando».'] },
      { if: 'flag.cg_puente_cuidado', then: ['Gonzalo escribió: «El último también cuenta». Pilar añadió con tinta roja: «Y las bolsas».'] },
    ],
  },
};
