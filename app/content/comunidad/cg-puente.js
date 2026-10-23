// La red de auxilio de Kanto · Capítulo: El puente no puntúa (Celeste / Ruta 24) · el presente · 20–25 min
// Idea de ChatGPT, rehecha como capítulo del arco `cg_red` (ver cg-red.js). Quién cuida hoy las rutas.
// Ids publicados intactos: misión cg_puente (inicio/prueba/regreso/hecha), flags cg_puente_inicio/atento/pregunto/
// victoria/prueba/paciencia/franco/cuidado, npcs cg_puente_elia (Pilar) y cg_puente_teo (Gonzalo), entrenador
// cg_puente_teo_prueba y sus guiones.
export default {
  npcs: {
    cg_puente_elia: { name: 'Pilar', title: 'Cuarta del Puente Pepita', look: { hair: 'braids', hairColor: '#3a2a1e', outfit: '#f2c43a', outfit2: '#3b5bb5', skin: 3, eyesStyle: 'normal', mouth: 'flat' } },
    cg_puente_teo: { name: 'Gonzalo', title: 'Tercero del Puente Pepita', look: { hair: 'cap', hairColor: '#2b2b38', outfit: '#3b5bb5', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'normal', mouth: 'grin', capColor: '#c4473a' } },
  },
  quests: {
    cg_puente: { name: 'El puente no puntúa', type: 'side', est: 25,
      stages: {
        inicio: 'Habla con **Pilar**, la del Puente Pepita, en **Celeste**.',
        prueba: 'Acompaña a **Gonzalo** en su primera guardia, en el **Puente Pepita** (Ruta 24, tramo 4).',
        regreso: 'Vuelve con **Pilar** a **Celeste** y cuéntale cómo fue la guardia de Gonzalo.',
        hecha: 'La Ruta 24 tiene otro par de ojos por las noches.',
      } },
  },
  trainers: {
    cg_puente_teo_prueba: { name: 'Gonzalo', cls: 'Joven', npc: 'cg_puente_teo', ai: 3, reward: 850,
      team: [
        { sp: 'sandslash', lv: 53, moves: ['earthquake', 'slash', 'rockslide', 'poisonjab'] },
        { sp: 'raticate', lv: 54, moves: ['hyperfang', 'crunch', 'suckerpunch', 'uturn'] },
      ],
      intro: 'Bueno, bueno. Combate de práctica. Si pierdo, no pasa nada. Si pierdo, no pasa nada…',
      win: '¡Uf! Me has dejado frito. Pero no he soltado la linterna ni una vez, ¿te has fijado?',
      lose: 'He ganado y no sé ni cómo. Sigo pensando en la bolsa esa.',
    },
  },
  patches: {
    celeste: { spots: [
      { label: 'Pilar, la del Puente Pepita', sub: 'Repasa una lista de turnos con un lápiz mordido', icon: '📋', cond: '!done.cg_puente', new: '!flag.cg_puente_inicio || flag.cg_puente_prueba', talk: [
        { cond: '!flag.cg_puente_inicio', script: 'cg_puente_inicio' },
        { cond: 'flag.cg_puente_prueba', script: 'cg_puente_regreso' },
        { script: 'cg_puente_espera' },
      ] },
      { label: 'Tablón de la caseta del puente', sub: 'Turnos de guardia de la Ruta 24', icon: '📌', cond: 'done.cg_puente', talk: [{ script: 'cg_puente_despues' }] },
    ] },
    ruta24: { route: { tramos: { 4: [
      { talk: [{ script: 'cg_puente_prueba' }], label: 'Gonzalo, en la barandilla', sub: 'Repasa una libreta en voz baja', icon: '🌉', cond: 'flag.cg_puente_inicio && !flag.cg_puente_prueba', new: 'true' },
    ] } } },
  },
  scripts: {
    cg_puente_inicio: [
      { say: 'cg_puente_elia', text: '¡Eh, tú! Sí, tú. Nos ganaste a todos los del puente, uno detrás de otro, no me digas que no te acuerdas. Pilar, la cuarta. La del Pidgeot.' },
      { say: 'cg_puente_elia', text: 'Te cuento rápido, que tengo la lista a medias. La Red de Auxilio nos ha pedido a los del puente que cubramos la Ruta 24 por las noches. Desde que se fue el del maletín, la caseta del puente estaba vacía.' },
      { say: 'cg_puente_elia', text: 'Misty dijo que sí antes de preguntarnos. Típico. Pero tiene razón: esa ruta es suya. Ella aprendió a nadar debajo del puente.' },
      { say: 'cg_puente_elia', text: 'Gonzalo, el tercero, quiere hacer la primera guardia. Se ha leído el manual de la Red tres veces. Lo que no sé es si sabe mirar mientras recita. ¿Lo acompañas un rato? A ti te hace caso: le ganaste.' },
      { choice: [
        { text: 'Acompañar a Gonzalo', then: [
          { set: { 'flag.cg_puente_inicio': true } },
          { quest: 'cg_puente', stage: 'prueba' },
          { say: 'cg_puente_elia', text: 'Está en la barandilla, en el cuarto tramo. Si te suelta el artículo tres, punto dos, asiente y mira al río.' },
          { call: 'cg_red_toque' },
        ] },
        { text: 'Ahora no puedo', then: [{ say: 'cg_puente_elia', text: 'Tranqui. La ruta no se va a mover. Gonzalo tampoco, me temo.' }] },
      ] },
    ],
    cg_puente_espera: [{ say: 'cg_puente_elia', text: 'Gonzalo está en el cuarto tramo del puente. Si lo ves hablando solo, es él.' }],
    cg_puente_prueba: [
      { say: 'cg_puente_teo', text: '¡Has venido! Bueno. Bueno. Primera guardia. Artículo tres, punto dos: «El guía saluda al viajero, le indica el estado del camino y…». Espera, que me lo sé.' },
      'Un excursionista cruza con prisa. Se le cae una bolsa junto a la barandilla y sigue andando. Gonzalo tiene los ojos en la libreta.',
      { choice: [
        { text: 'Señalar la bolsa', then: [
          { set: { 'flag.cg_puente_atento': true } },
          { say: 'cg_puente_teo', text: '¿Qué? ¡Ay! ¡Oiga! ¡Señor! —Sale corriendo con la bolsa—. …Ya está. No la había visto. Estaba en el punto tres.' },
          { call: 'cg_puente_desafio' },
        ] },
        { text: 'Preguntarle qué haría si alguien se cae al río', then: [
          { set: { 'flag.cg_puente_pregunto': true } },
          { say: 'cg_puente_teo', text: 'Fácil: artículo cinco. Primero aviso, luego… —Levanta la vista para pensar y ve la bolsa en el suelo—. Anda. Eso no estaba ahí. ¿De quién es eso?' },
          { call: 'cg_puente_desafio' },
        ] },
      ] },
    ],
    cg_puente_desafio: [
      { say: 'cg_puente_teo', text: 'Me he puesto nervioso. ¿Me haces un combate de práctica? Así se me pasa. Te curo el equipo antes, que en la caseta hay de todo.' },
      { choice: [
        { text: 'Combatir (con curación previa)', then: [
          { heal: true },
          { battle: 'cg_puente_teo_prueba', lose: 'continue',
            onWin: [
              { set: { 'flag.cg_puente_victoria': true, 'flag.cg_puente_prueba': true } },
              { quest: 'cg_puente', stage: 'regreso' },
              { say: 'cg_puente_teo', text: 'Uf. Ya respiro. Dile a Pilar que lo he hecho bien. Bueno, que lo he hecho. Lo de bien que lo decida ella.' },
            ],
            onLose: [
              { set: { 'flag.cg_puente_prueba': true } },
              { quest: 'cg_puente', stage: 'regreso' },
              { say: 'cg_puente_teo', text: 'Uf. Ya respiro. Gracias. Ve a contárselo a Pilar, yo me quedo aquí hasta que pase el último.' },
            ] },
        ] },
        { text: 'Quedarse con él hasta que cruce el último viajero', then: [
          { set: { 'flag.cg_puente_paciencia': true, 'flag.cg_puente_prueba': true } },
          { quest: 'cg_puente', stage: 'regreso' },
          'Se quedan los dos apoyados en la barandilla. Pasa una pareja, un chico con un Butterfree, una señora con dos bolsas. Gonzalo saluda a cada uno sin mirar la libreta.',
          { say: 'cg_puente_teo', text: '¿Sabes qué? El artículo tres no dice nada de quedarse callado. Y funciona.' },
        ] },
      ] },
    ],
    cg_puente_regreso: [
      { say: 'cg_puente_elia', text: 'A ver. Cuéntame. Y no me digas cuántas veces recitó el manual, que ya me lo sé.' },
      { if: 'flag.cg_puente_atento', then: [{ say: 'cg_puente_elia', text: 'Lo de la bolsa ya me ha llegado. Fuiste tú quien la vio. Bueno, para eso estabas.' }] },
      { if: 'flag.cg_puente_pregunto', then: [{ say: 'cg_puente_elia', text: 'Me han dicho que le preguntaste qué haría si alguien se cae al río y que, buscando la respuesta, vio la bolsa. Qué manera más rara de enseñar. Me gusta.' }] },
      { if: 'flag.cg_puente_paciencia', then: [{ say: 'cg_puente_elia', text: 'Y que se quedaron los dos hasta que pasó el último. Eso no viene en ningún manual.' }] },
      'Por la calle llega Misty, con el pelo mojado y una toalla al cuello. Detrás, un patrullero con una libreta.',
      { say: 'misty', text: '¡Pilar! ¿Ya tenemos guardia para esta noche o me pongo yo el chaleco otra vez? —Te ve—. Ah, ¿tú también andas metid{o|a|e} en esto? Pues mejor.' },
      { say: 'cg_indice_damian', cond: 'flag.cg_indice_testimonio', text: 'Hola otra vez. Yo hice la Ruta 24 tres años, cuando la caseta tenía radio. Ahora vamos con el móvil y una linterna. Se agradece gente nueva.' },
      { say: 'cg_indice_damian', cond: '!flag.cg_indice_testimonio', text: 'Damián, patrullero de la Red. Yo hice la Ruta 24 tres años, cuando la caseta tenía radio. Ahora vamos con el móvil y una linterna. Se agradece gente nueva.' },
      { choice: [
        { text: 'Contar lo que hizo bien y lo que no', then: [
          { set: { 'flag.cg_puente_franco': true } },
          { say: 'cg_puente_elia', text: 'Bien. Lo apunto todo, lo bueno y lo de la bolsa. La próxima vez se acordará.' },
          { call: 'cg_puente_cierre' },
        ] },
        { text: 'Destacar que aprendió a levantar la vista', then: [
          { set: { 'flag.cg_puente_cuidado': true } },
          { say: 'cg_puente_elia', text: 'Me sirve. Lo de la bolsa lo apunto yo por mi cuenta, que ya sabes cómo soy.' },
          { call: 'cg_puente_cierre' },
        ] },
      ] },
    ],
    cg_puente_cierre: [
      { say: 'misty', text: 'Pues ya está: Gonzalo hace las noches de los jueves. Si se pone a recitar, que recite en voz alta, que así lo encontramos.' },
      { say: 'misty', text: 'Ese puente es mío, ¿eh? Bueno, de Celeste. Bueno, mío. Ahí abajo aprendí a nadar. Cuando era pequeña siempre había alguien en la caseta. Se notaba.' },
      { say: 'cg_puente_elia', text: 'Por cierto, toma. —Te da una bobina de cobre verdoso, envuelta en cinta aislante—. La encontramos en el cajón de la caseta, del tiempo en que tenía radio. Nadie sabe qué hacer con ella.' },
      { give: 'cg_red_bobina' },
      { say: 'cg_indice_damian', text: 'Esa radio no hablaba con nadie de Celeste. Oía un repetidor de la parte de Lavanda. Uno viejo. Ya ni existe, creo.' },
      { say: 'misty', text: 'Ese lo montó Bill, ¿no? De crío. —Se encoge de hombros—. Pregúntale. Le encanta que le pregunten cosas.' },
      { give: 'hyperpotion', n: 1 },
      { money: 600 },
      { quest: 'cg_puente', stage: 'hecha', done: true },
      { diary: 'Hoy mi entrenador{|a|e} hizo de guía con Gonzalo, el chico del Puente Pepita. Se sabe un manual entero de memoria. ¡Entero! Yo me sé la Pokédex, que es más larga, pero no se lo he dicho para no presumir.\n\nA un señor se le cayó una bolsa y Gonzalo no la vio porque iba recitando. Luego dejó de recitar y empezó a mirar. Misty dice que de pequeña siempre había alguien en la caseta del puente. Ahora otra vez.', cond: 'flag.b01_diario' },
      { call: 'cg_red_toque' },
    ],
    cg_puente_despues: [
      'Un tablón de corcho en la puerta de la caseta, con los turnos de la Ruta 24 escritos con letra de Pilar. Los jueves: «Gonzalo».',
      { if: 'flag.cg_puente_franco', then: ['Debajo, con otra letra: «Si pierdes de vista a alguien, para». Y más abajo: «Y las bolsas. —P.»'] },
      { if: 'flag.cg_puente_cuidado', then: ['Debajo, con otra letra: «Levanta la vista de la libreta». Pilar ha añadido en rojo: «Y las bolsas».'] },
      { if: 'flag.cg_red_encendido', then: ['Al lado han clavado una hoja nueva: «La caseta vuelve a tener radio. Canal de la colina. No tocar el dial. —Bill». Alguien ha dibujado un Clefairy al lado.'] },
    ],
  },
};
