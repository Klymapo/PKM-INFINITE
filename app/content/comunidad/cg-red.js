// La red de auxilio de Kanto · misión paraguas y cierre (cuarta escena) · ~20 min
// Tres capítulos en cualquier orden (cg-aviso.js, cg-puente.js, cg-indice.js); cada uno deja una pieza del receptor
// viejo de la Red. Con las tres, Bill monta el Receptor de la colina (objeto clave con pixel art) y se abre la
// Colina del Repetidor, sobre Lavanda (zona nueva del mapa de Kanto), con su cinemática al recibirlo y al usarlo.
//
// Compatibilidad: `cg_red_toque` arranca la misión paraguas si ya empezó algún capítulo y la pasa a «bill» cuando
// los tres están hechos. Se llama desde los guiones de los capítulos y, para partidas que ya iban por la mitad,
// al entrar en Azafrán, Celeste o Lavanda (onEnter sin `once`, invisible para Novedades).
const ALGUNO = '(flag.cg_aviso_inicio || flag.cg_puente_inicio || flag.cg_indice_inicio)';
const TRES = '(done.cg_aviso && done.cg_puente && done.cg_indice)';
const TOQUE_COND = `(quest.cg_red == "" && ${ALGUNO}) || (quest.cg_red == "piezas" && ${TRES})`;
const TOQUE = { script: 'cg_red_toque', once: false, cond: TOQUE_COND };
const ABIERTA = '(has("cg_red_receptor") || done.cg_red)';

export default {
  npcs: {},
  items: {
    cg_red_galena: { name: 'Galena del receptor viejo', pocket: 'key', icon: '🪨', desc: 'Un cristal gris y brillante, envuelto en un pañuelo. Era el corazón del receptor de la estación de Azafrán, el que oía el repetidor de la colina. Lo guardó Olga.' },
    cg_red_bobina: { name: 'Bobina de la caseta', pocket: 'key', icon: '🧲', desc: 'Una bobina de cobre verdoso con cinta aislante. Estaba en el cajón de la caseta del Puente Pepita, de cuando la caseta tenía radio.' },
    cg_red_dial: { name: 'Dial del 00', pocket: 'key', icon: '🎛️', desc: 'Una ruedecita de baquelita con un 00 grabado a punta de destornillador. El dial del primer collar de aviso, hecho por un crío muy listo.' },
    cg_red_receptor: { name: 'Receptor de la colina', pocket: 'key', desc: 'Una caja de madera con una bobina, un cristal y un dial que solo marca 00. Bill la montó con tres piezas que guardaban tres personas distintas. Encaja en el poste viejo de la colina, sobre Lavanda.' },
    cg_red_mt_plancha: { name: 'MT Plancha Voltaica', pocket: 'machines', tm: 'supercellslam', desc: 'Se lanza contra el objetivo cargado de electricidad. Si falla, quien lo usa se hace daño.' },
    cg_red_hoja_turnos: { name: 'Hoja de turnos del canal 00', pocket: 'key', desc: 'Una cuartilla escrita entre varios, con letras distintas, que Nico subió a la colina.', read: 'CANAL 00 · QUIÉN ESCUCHA\n\nLunes: Olga (desde el banco de Lavanda, con la radio de Isandro).\nMartes: Vera (con café).\nMiércoles: Damián, si no está de ronda. Si está de ronda, Damián igual.\nJueves: Gonzalo, en la caseta del puente. «Sin recitar.» —P.\nViernes: Pilar.\nSábado: Noemí. «Lo que se oiga, se apunta.»\nDomingo: el Audino del señor Fuji. Él no sabe que le toca, pero siempre está.\n\nAl pie, en rotulador verde: «Si alguien sin número pide ayuda, que haya alguien. Eso era todo. —B.»' },
  },
  quests: {
    cg_red: { name: 'La red de auxilio de Kanto', type: 'side', est: 20,
      stages: {
        piezas: 'Tres historias de la **Red de Auxilio**, en el orden que quieras: Olga en **Lavanda**, Pilar en **Celeste** y Misty en el **Gimnasio de Celeste**.',
        bill: 'Ya tienes las tres piezas del receptor viejo. Llévaselas a **Bill**, a su casa del cabo (pasado el **Puente Pepita**).',
        colina: 'Sube a la **Colina del Repetidor** desde **Lavanda** y conecta el receptor.',
        hecha: 'El canal 00 vuelve a tener a alguien escuchando.',
      },
      parts: { title: 'Los tres capítulos', items: [
        { label: 'El aviso que nadie oyó', where: 'lavanda', done: 'done.cg_aviso', got: 'flag.cg_aviso_inicio',
          hint: 'Una mujer con una grabadora, en **Lavanda**. Pieza: la galena del receptor viejo.',
          gotHint: 'Sigue la misión «El aviso que nadie oyó» (Olga, Lavanda / Estación de Azafrán).' },
        { label: 'El puente no puntúa', where: 'celeste', done: 'done.cg_puente', got: 'flag.cg_puente_inicio',
          hint: 'Pilar, la del Puente Pepita, en **Celeste**. Pieza: la bobina de la caseta.',
          gotHint: 'Sigue la misión «El puente no puntúa» (Pilar en Celeste / Gonzalo en la Ruta 24).' },
        { label: 'El índice de los ausentes', where: 'gym_celeste', done: 'done.cg_indice', got: 'flag.cg_indice_inicio',
          hint: 'Misty, con una hoja arrugada, en el **Gimnasio de Celeste**. Pieza: el dial del 00.',
          gotHint: 'Sigue la misión «El índice de los ausentes» (Misty, Damián, Bill, el señor Fuji).' },
      ] },
    },
  },
  gather: {
    cg_red_caja: { name: 'Caja de repuestos del repetidor', icon: '🧰', hours: 20, picks: [1, 2],
      game: { type: 'lock', level: 2, theme: 'caja', hint: 'Bill le puso un candado de runas «para que no se lo lleven los Magnemite».' },
      ask: 'Una caja metálica atornillada al poste, con un candado de runas. Dentro, Bill deja repuestos «por si acaso».',
      text: 'La caja del repetidor suelta lo suyo.',
      wait: 'La caja está vacía. Bill la rellena cuando sube, y no sube todos los días.',
      table: [
        { id: 'magnet', w: 14 },
        { id: 'cellbattery', w: 8 },
        { id: 'metalcoat', w: 6 },
        { id: 'thunderstone', w: 5 },
        { id: 'upgrade', w: 2, rare: true },
        { id: 'electirizer', w: 2, rare: true },
      ] },
  },
  locations: {
    cg_red_colina: {
      name: 'Colina del Repetidor', short: 'La Colina', parent: 'lavanda', kind: 'area',
      bg: { type: 'mountain', far: '#7a6a9a', ground: '#8a7aa8' },
      desc: 'Un sendero de lavanda pisada sube desde el pueblo hasta lo alto de una colina pelada. Arriba, un poste de hierro oxidado con una antena torcida hacia el norte, hacia el puente. Abajo, Lavanda entera, y el cementerio pequeño.\n\nEl receptor de Bill cuelga del poste, con su lucecita verde.',
      descNight: 'De noche, desde aquí arriba se ven las luces de Lavanda y, muy lejos, la línea de farolas del Puente Pepita. El receptor del poste hace un zumbido bajito. De vez en cuando, cuatro pulsos cortos, y alguien contesta.',
      enterCond: ABIERTA, blockedMsg: 'Un sendero sube a la colina, hasta un poste viejo. Allí arriba no hay nada que oír. Todavía.',
      mapNote: 'Repetidor de la Red de Auxilio · caja de repuestos',
      onEnter: [{ script: 'cg_red_colina', cond: 'quest.cg_red == "colina"', once: true }],
      rumors: [
        { text: 'Dicen en Lavanda que la colina «tenía voz» antes de que existieran los móviles. La gente mayor aún mira hacia arriba cuando oye un pitido.' },
        { cond: 'done.cg_red', text: 'Desde que hay luz en la colina, Isandro sube la radio al banco por las noches. Dice que es por el fútbol. No hay fútbol.' },
      ],
      spots: [
        { label: 'Escuchar el canal 00', sub: 'El receptor zumba en el poste', icon: '📻', cond: 'done.cg_red', talk: [{ script: 'cg_red_radio' }] },
        { label: 'Nico, con la mochila de los recados', sub: 'Se ha sentado a comerse un bocadillo', icon: '🥪', cond: 'done.cg_red', talk: [{ script: 'cg_red_nico' }] },
        { label: 'Caja de repuestos del repetidor', icon: '🧰', cond: 'done.cg_red', new: '!flag.rec_cg_red_caja', action: { gather: 'cg_red_caja' } },
      ],
    },
  },
  patches: {
    azafran: { onEnter: [TOQUE] },
    celeste: { onEnter: [TOQUE] },
    lavanda: { onEnter: [TOQUE], spots: [
      { label: 'Sendero de la Colina del Repetidor', sub: 'Sube entre la lavanda hasta un poste viejo', icon: '📡', cond: ABIERTA, new: '!visited("cg_red_colina")', action: { go: 'cg_red_colina' } },
    ] },
    casa_bill: { spots: [
      { label: 'Bill, con un hueco en la mesa', sub: 'Ha despejado la mesa de la cocina', icon: '🔧', cond: 'quest.cg_red == "bill"', new: 'true', talk: [{ script: 'cg_red_bill' }] },
    ] },
  },
  scripts: {
    // Arranca la misión paraguas y la hace avanzar cuando los tres capítulos están hechos. No dice nada si no toca.
    cg_red_toque: [
      { if: `quest.cg_red == "" && ${ALGUNO}`, then: [
        { say: 'rotom', text: '¡Bzzt! Esa Red de Auxilio sale ya en más de una conversación. Te lo apunto todo junto en una misión, que si no se me mezcla.' },
        { quest: 'cg_red', stage: 'piezas' },
      ] },
      { if: `quest.cg_red == "piezas" && ${TRES}`, then: [
        { say: 'rotom', text: '¡Bzzt! ¡Una galena, una bobina y un dial! Si los junto en mi cabeza me sale una radio. ¿Sabes quién arregla radios? Uno que vive en un cabo y tiene un Clefairy.' },
        { quest: 'cg_red', stage: 'bill' },
      ] },
    ],
    cg_red_bill: [
      'Bill ha quitado de la mesa de la cocina todo lo que había: el soldador, tres tazas, un Magnemite dormido. Solo queda un hueco cuadrado.',
      { say: 'bill', text: '¡Hola-hola! Me han llamado Olga, Pilar, Misty y el señor Fuji. En la misma mañana. Nadie me llama cuatro veces en la misma mañana. Algo traes.' },
      { say: 'bill', text: 'A ver, a ver, a ver. —Coloca las piezas en fila, muy serio—. Mi galena. Mi bobina. Mi dial. Las tres. Pensé que las habían tirado hace años.' },
      { say: 'bill', text: 'Tenía once años. Mi madre me dejaba subir a la colina de Lavanda con un bocadillo y una caja de herramientas. Monté el repetidor con piezas de una radio rota y un poste que nadie usaba.' },
      { say: 'bill', text: 'Doña Amparo me daba galletas para que le explicara cómo funcionaba. Nunca se lo expliqué bien. Ella lo usaba mejor que yo.' },
      { take: 'cg_red_galena', cond: 'has("cg_red_galena")', silent: true },
      { take: 'cg_red_bobina', cond: 'has("cg_red_bobina")', silent: true },
      { take: 'cg_red_dial', cond: 'has("cg_red_dial")', silent: true },
      { cutscene: { bg: { type: 'indoor', wall: '#e8e0cc', floor: '#9a7a5a' }, start: 'light', frames: [
        { actors: [{ id: 'bill', at: 'left', enter: 'left' }], on: '_c', cam: 'push', item: 'cg_red_galena', text: 'Bill pone la galena de Olga en el centro de la mesa, con muchísimo cuidado, como si fuera un huevo.' },
        { item: 'cg_red_bobina', on: '_c', text: 'Luego la bobina de la caseta del puente. Le quita la cinta aislante con los dientes y la enrolla alrededor del cristal.' },
        { item: 'cg_red_dial', on: '_c', fx: 'sparkle', text: 'Y el dial del collar viejo, el del 00. Lo encaja. Lo gira una vez. Clic.' },
        { item: 'cg_red_receptor', on: '_c', fx: ['flash', 'sparkle'], cam: 'pull', say: 'bill', text: '¡Ya está! El receptor de la colina. Como el de entonces, pero con mejor tornillo.' },
        { actors: [{ key: 'bill', do: 'nod', emote: 'note' }], on: '_c', fx: 'glow', text: 'La caja chisporrotea. Por un segundo, entre el ruido, se oyen cuatro pulsos cortos.' },
      ] } },
      { give: 'cg_red_receptor' },
      { say: 'bill', text: 'Llévalo tú. El poste sigue arriba, encima de Lavanda; lo han dejado ahí porque quitarlo costaba más. Conéctalo y gira el dial al 00. Yo lo oiré desde aquí.' },
      { say: 'bill', cond: 'owns("ampharos")', text: 'Y si llevas a tu Ampharos, que se acerque al poste. A los Ampharos les encantan las antenas. No sé por qué. Les encanta.' },
      { quest: 'cg_red', stage: 'colina' },
    ],
    cg_red_colina: [
      { cutscene: { bg: { type: 'mountain', far: '#5a4a7a', ground: '#6a5a8a' }, time: 'noche', start: 'dark', frames: [
        { big: true, text: 'Colina del Repetidor', sub: 'Lavanda', hold: 2400, cam: 'still' },
        { cam: 'pan-up', fx: 'light', text: 'Arriba, el poste viejo, oxidado, con la antena torcida hacia el norte. Abajo, las luces de Lavanda.' },
        { actors: [{ item: 'cg_red_receptor', key: 'rx', at: 'center' }], cam: 'push', text: 'Cuelgas el receptor del poste. Giras el dial hasta el 00.' },
        { on: 'rx', fx: ['light', 'ripple'], cam: 'still', text: 'Una lucecita verde. Y, por el altavoz, una voz que conoces: «Caseta del puente. Aquí Gonzalo. Sin novedad. Cambio».' },
        { cond: 'inParty("lucario") || inParty("riolu")', actors: [{ mon: '{riolu}', key: 'rio', at: 0.25, enter: 'left' }], on: 'rio', fx: 'glow', text: '{riolu} levanta las orejas hacia el norte. Uno detrás de otro, puntitos de luz que contestan.' },
        { cam: 'pull', fx: 'iris-out', text: 'Por primera vez en muchos años, el canal 00 tiene a alguien escuchando.' },
      ] } },
      'Alguien sube resoplando por el sendero: un chico con una mochila enorme y una gorra de la Red.',
      { say: 'cg_aviso_nico', cond: 'flag.cg_aviso_registro', text: '¡Ya está encendido! Lo he visto desde abajo. ¿Te acuerdas de mí? Nico, el de las cajas del archivo. Me manda Bill. Bueno, me manda todo el mundo, pero hoy Bill.' },
      { say: 'cg_aviso_nico', cond: '!flag.cg_aviso_registro', text: '¡Ya está encendido! Lo he visto desde abajo. Nico, recadero de la Red. Me manda Bill. Bueno, me manda todo el mundo, pero hoy Bill.' },
      { say: 'cg_puente_elia', as: 'Pilar (por radio)', text: 'Aquí Pilar, desde Celeste. ¿Se me oye? Gonzalo, deja de decir «cambio» cada dos palabras.' },
      { say: 'cg_puente_teo', as: 'Gonzalo (por radio)', text: 'Es que viene en el artículo cuatro. Cambio.' },
      { say: 'cg_indice_damian', as: 'Damián (por radio)', text: 'Ronda de la Ruta 24, aquí Damián. Los oigo como hace tres años. Mejor, incluso.' },
      { say: 'cg_indice_vera', as: 'Vera (por radio)', cond: '!flag.cg_indice_fallo', text: 'Vera, desde el poste de la Ruta 8. La señal llega limpia. He conectado el canal al Índice: ahora lo que entra por aquí, cuenta.' },
      { say: 'cg_indice_vera', as: 'Vera (por radio)', cond: 'flag.cg_indice_fallo', text: 'Vera, desde el poste de la Ruta 8. La señal llega limpia. El Índice sigue sin hacerle caso al 00, pero la radio sí. Con eso me vale, de momento.' },
      { say: 'cg_indice_noemi', as: 'Noemí (por radio)', cond: 'flag.cg_indice_fallo', text: 'Noemí. Lo que entre por el 00 lo apunto yo, en el libro negro. El Índice todavía no lo cuenta. El libro, sí.' },
      { say: 'cg_indice_noemi', as: 'Noemí (por radio)', cond: '!flag.cg_indice_fallo', text: 'Noemí. Abro folio nuevo: «Canal 00, repetidor de la colina, otra vez en servicio». Con fecha de hoy.' },
      { say: 'cg_aviso_olga', as: 'Olga (por radio)', text: 'Aquí Lavanda. —Una pausa larga—. Perdonen. Hacía mucho que no hablaba por un micrófono. Lavanda, sin novedad.' },
      { say: 'cg_indice_isandro', as: 'Isandro (por radio)', text: '¡Que soy Isandro, que estoy con Olga! Que la luz del porche de doña Amparo se ve desde aquí. Bueno, ya no hay luz. Pero se ve dónde estaba.' },
      { say: 'bill', as: 'Bill (por radio)', text: '¡Hola-hola! ¡Desde el cabo! ¡Los oigo a todos! ¡Clic-clic! —Se le oye sonarse la nariz—. Es la alergia. Al polvo. Del cabo.' },
      { say: 'cg_aviso_nico', text: 'Bill dice que esto es para ti. —Te da un disco de MT y una cuartilla doblada—. Y que no la uses con el Clefairy, que se pone nervioso.' },
      { give: 'cg_red_mt_plancha' },
      { give: 'cg_red_hoja_turnos' },
      { read: 'cg_red_hoja_turnos' },
      { give: 'elixir', n: 2 },
      { set: { 'flag.cg_red_encendido': true } },
      { quest: 'cg_red', stage: 'hecha', done: true },
      { diary: 'Hoy mi entrenador{|a|e} y yo subimos a una colina encima de Lavanda con una radio que montó Bill. ¡Con piezas de tres personas distintas! Una galena, una bobina y un dial. Yo no tengo galena. Creo. Tendré que mirarlo.\n\nEncendimos la radio y empezaron a hablar todos: Pilar, Gonzalo, la señora del archivo, la de la grabadora… Hasta Bill, que estaba resfriado. Nadie dijo nada importante. Casi todos dijeron «sin novedad». Me ha gustado mucho que no hubiera novedad.', cond: 'flag.b01_diario' },
    ],
    cg_red_radio: [
      { if: 'night', then: [
        'El receptor zumba. Cuatro pulsos cortos, muy lejos. Al momento, una voz: «Recibido. Vamos para allá». Luego, silencio.',
        { say: 'cg_puente_teo', as: 'Gonzalo (por radio)', text: 'Caseta del puente: era un excursionista con un tobillo torcido y un Psyduck. Los dos bien. El Psyduck, confundido. Cambio.' },
      ], else: [
        'El receptor zumba bajito. De día no pasa casi nada: alguien prueba el canal, alguien da los buenos días.',
        { say: 'cg_indice_vera', as: 'Vera (por radio)', text: 'Prueba de canal, Ruta 8. Un pulso largo. Que nadie se asuste.' },
      ] },
    ],
    cg_red_nico: [
      { say: 'cg_aviso_nico', text: 'Subo aquí a comer. Es el único sitio de Kanto donde nadie me da un recado. Bueno, la radio. Pero la radio no me ve.' },
      { say: 'cg_aviso_nico', cond: 'flag.cg_aviso_entrego', text: 'Le llevé a la familia de doña Amparo la cinta de Olga, por cierto. La pusieron en la cocina. Yo me fui antes de que acabara.' },
      { say: 'cg_aviso_nico', cond: 'flag.cg_aviso_hablo', text: 'Llevé a Olga en bici hasta la casa de la familia de doña Amparo, por cierto. Estuvo dentro tres horas. Salió con un táper de croquetas.' },
      { say: 'cg_aviso_nico', cond: 'flag.cg_indice_fallo', text: 'Y le subo a Noemí bolígrafos. Gasta uno por semana con su libro negro. Dice que el Índice no aprende, pero que ella sí.' },
      { say: 'cg_aviso_nico', cond: '!flag.cg_indice_fallo', text: 'Lo que más reparto ahora son collares de prueba del canal 00. Para Pokémon, para abuelas, para quien no tenga número. Vera los hace en serie.' },
    ],
  },
};
