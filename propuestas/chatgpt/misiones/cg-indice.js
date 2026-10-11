// Propuesta independiente · El índice de los ausentes · misterio deductivo
// Cuatro testigos, cuatro documentos, una verificación de campo y una decisión persistente.
// Integración aditiva en zonas conocidas. No usa información de secreto/.
export default {
  npcs: {
    cg_indice_noemi: { name: 'Noemí', title: 'Archivera de la Red de Auxilio', look: { hair: 'bob', hairColor: '#202b45', eyes: '#9c783e', outfit: '#efe1c6', outfit2: '#243a5b', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses' } },
    cg_indice_damian: { name: 'Damián', title: 'Patrullero clasificado', look: { hair: 'short', hairColor: '#6c4a32', eyes: '#477080', outfit: '#365a76', outfit2: '#d3b86b', skin: 2, eyesStyle: 'normal', mouth: 'smile', acc: 'scar' } },
    cg_indice_vera: { name: 'Vera', title: 'Técnica de señales', look: { hair: 'tied', hairColor: '#38314b', eyes: '#5c8d9c', outfit: '#47627d', outfit2: '#e8d5ad', skin: 1, eyesStyle: 'sleepy', mouth: 'flat', acc: 'goggles' } },
    cg_indice_isandro: { name: 'Isandro', title: 'Cuidador voluntario', look: { hair: 'curly', hairColor: '#858177', eyes: '#5c6b4d', outfit: '#786b58', outfit2: '#c9b36f', skin: 4, eyesStyle: 'happy', mouth: 'smile', acc: 'beard' } },
  },
  items: {
    cg_indice_hoja: { name: 'Hoja del puesto cero', pocket: 'key', desc: 'Una clasificación con trece renglones y doce nombres.', read: 'RED DE AUXILIO — SIMULACRO DEL PUENTE\n\n21:14 — 00 — primer aviso\n21:20 — alarma pública\n21:23 — patrulla 04\n21:26 — patrulla 01\n21:29 — patrulla 09\n\nLa casilla 00 está tachada con regla. Debajo: «sin firma, no computa».\n\nAl margen alguien escribió: «¿Quién avisa si nadie firma?».', },
    cg_indice_testimonio: { name: 'Testimonio de Damián', pocket: 'key', desc: 'La hora que anotó el patrullero en su libreta.', read: 'Ruta del puente. 21:14. Tres golpes cortos y una pausa. Pensé que era una señal de un compañero. No había nadie. Vi algo con una cinta color crema junto a la barandilla. A las 21:20 sonó la alarma. Llegué tres minutos después.\n\nNo gané el primer puesto. No me importa. Me importa que alguien llegó antes.' },
    cg_indice_esquema: { name: 'Esquema de la antena', pocket: 'key', desc: 'Un diagrama de los avisos sin emisor registrado.', read: 'PROTOTIPO DE AVISO REMOTO\n\nUn emisor registrado transmite su número de patrulla. Un emisor sin número transmite 00. Tres pulsos breves activan alerta de ayuda. No identifica especie ni entrenador.\n\nLa señal 00 no es un error. Es un origen sin ficha.\n\nNota de Vera: «Si una máquina puede oírlo, ¿por qué el reglamento no?».', },
    cg_indice_collar: { name: 'Ficha de collar reparado', pocket: 'key', desc: 'Registro de un pequeño collar con cinta crema.', read: 'Collar de alerta n.º 00. Ajustado a un Audino que ayuda a Isandro a detectar llamadas de auxilio.\n\nLa noche del simulacro, Audino salió antes de que sonara la sirena. Volvió con barro en las patas y el collar vacío de batería.\n\nIsandro: «Lo dejé actuar. Escucha cosas que yo no oigo. No tiene una ficha de patrulla. Tiene un nombre».', },
    cg_indice_acta: { name: 'Acta corregida de la Red', pocket: 'key', desc: 'El resultado de tu decisión sobre el puesto cero.', read: 'La Red de Auxilio reconoce que su clasificación omitía el primer aviso válido del simulacro. La categoría de «primer respondiente» ya no depende de que el emisor sea una persona inscrita.\n\nSe abre una revisión del sistema de puntuación. La autoría del aviso y la forma de publicarlo se rigen por el acuerdo elegido en la investigación.', },
  },
  quests: {
    cg_indice: { name: 'El índice de los ausentes', type: 'side', est: 90,
      stages: {
        inicio: 'Habla con Noemí en Azafrán sobre la clasificación incompleta.',
        pruebas: 'Reúne cuatro pruebas en Azafrán, Celeste, casa de Bill y Lavanda.',
        deduccion: 'Vuelve a Azafrán y explica quién ocupó el puesto cero.',
        verificacion: 'Comprueba en la Ruta 8 que la señal 00 no era un fallo.',
        decision: 'Entrega la conclusión a Noemí y decide cómo publicarla.',
        epilogo: 'Busca a Isandro en Lavanda para cerrar la investigación.',
        hecha: 'La Red reconoció a su primer respondiente.',
      },
      parts: { title: 'Las cuatro pruebas', var: 'cg_indice_pistas', items: [
        { label: 'Hoja de clasificación', where: 'azafran', done: 'flag.cg_indice_hoja', hint: 'Revisa el archivador de la Red en Azafrán.' },
        { label: 'Testimonio del puente', where: 'celeste', done: 'flag.cg_indice_testimonio', hint: 'Habla con Damián junto al tablón de Celeste.' },
        { label: 'Esquema de la antena', where: 'casa_bill', done: 'flag.cg_indice_esquema', hint: 'Vera guarda un esquema en la casa de Bill.' },
        { label: 'Ficha del collar', where: 'lavanda', done: 'flag.cg_indice_collar', hint: 'Isandro cuida de un compañero que no figura en la lista.' },
      ] },
    },
  },
  trainers: {
    cg_indice_damian_exhibicion: { name: 'Damián', cls: 'Patrullero', npc: 'cg_indice_damian', ai: 3, reward: 900,
      team: [
        { sp: 'porygon2', lv: 54, moves: ['triattack', 'recover', 'thunderbolt', 'icebeam'] },
        { sp: 'altaria', lv: 55, moves: ['dragonpulse', 'roost', 'flamethrower', 'cottonguard'] },
      ],
      intro: 'Sin puestos ni medallas. Solo atentos a las señales.',
      win: 'Lo has leído mejor que yo. Las señales, digo.',
      lose: 'La fuerza no prueba que mi libreta esté equivocada.',
    },
  },
  patches: {
    azafran: { spots: [
      { label: 'Mesa de la Red de Auxilio', sub: 'Doce nombres y un renglón vacío', icon: '📊', cond: '!done.cg_indice', new: '!flag.cg_indice_inicio', talk: [
        { cond: '!flag.cg_indice_inicio', script: 'cg_indice_inicio' },
        { cond: 'flag.cg_indice_verificado && !flag.cg_indice_decision', script: 'cg_indice_decision' },
        { cond: 'flag.cg_indice_hoja && flag.cg_indice_testimonio && flag.cg_indice_esquema && flag.cg_indice_collar && !flag.cg_indice_deducido', script: 'cg_indice_deduccion' },
        { script: 'cg_indice_estado' },
      ] },
      { label: 'Hoja de clasificación', sub: 'El renglón 00 está tachado', icon: '📑', cond: 'flag.cg_indice_inicio && !flag.cg_indice_hoja', new: 'true', talk: [{ script: 'cg_indice_prueba_hoja' }] },
      { label: 'Acta de la Red de Auxilio', icon: '📜', cond: 'done.cg_indice', talk: [{ script: 'cg_indice_despues_azafran' }] },
    ] },
    celeste: { spots: [
      { label: 'Damián, patrullero', sub: 'Tiene una libreta con una hora rodeada', icon: '🕘', cond: 'flag.cg_indice_inicio && !flag.cg_indice_testimonio', new: 'true', talk: [{ script: 'cg_indice_prueba_damian' }] },
    ] },
    casa_bill: { spots: [
      { label: 'Vera junto a una antena', sub: 'En su mesa hay un diagrama lleno de ceros', icon: '📡', cond: 'flag.cg_indice_inicio && !flag.cg_indice_esquema', new: 'true', talk: [{ script: 'cg_indice_prueba_vera' }] },
    ] },
    lavanda: { spots: [
      { label: 'Isandro y un collar sin batería', sub: 'Una cinta crema cuelga del respaldo', icon: '🎗️', cond: 'flag.cg_indice_inicio && !flag.cg_indice_collar', new: 'true', talk: [{ script: 'cg_indice_prueba_isandro' }] },
      { label: 'El banco de Isandro', sub: 'Queda una última conversación', icon: '🌙', cond: 'flag.cg_indice_decision && !done.cg_indice', new: 'true', talk: [{ script: 'cg_indice_epilogo' }] },
      { label: 'Una cinta color crema', sub: 'Ahora cuelga junto a una placa nueva', icon: '🏅', cond: 'done.cg_indice', talk: [{ script: 'cg_indice_despues_lavanda' }] },
    ] },
    k_ruta8: { spots: [
      { label: 'Poste de pruebas de la Red', sub: 'La antena tiene un botón marcado 00', icon: '📶', cond: 'flag.cg_indice_deducido && !flag.cg_indice_verificado', new: 'true', talk: [{ script: 'cg_indice_verificacion' }] },
    ] },
  },
  scripts: {
    cg_indice_inicio: [
      'Un tablón exhibe doce puestos. Noemí tiene trece fichas en la mano. Las cuenta otra vez. Siguen siendo trece.',
      { say: 'cg_indice_noemi', text: 'La Red de Auxilio clasifica patrullas por rapidez y cooperación. Doce equipos, doce puestos. Pero hay un registro anterior a todos los demás, y alguien lo dejó fuera.' },
      { say: 'cg_indice_noemi', text: 'No busco a un culpable para una portada. Busco una explicación que resista cuatro preguntas: quién avisó, cuándo, cómo y por qué desapareció.' },
      { say: 'cg_indice_noemi', text: 'Te doy acceso a la hoja. Damián estuvo en Celeste, Vera revisó el emisor en casa de Bill e Isandro reparó un collar en Lavanda. Habla con ellos en el orden que quieras.' },
      { choice: [
        { text: 'Investigar el puesto que falta', then: [
          { set: { 'flag.cg_indice_inicio': true } },
          { quest: 'cg_indice', stage: 'pruebas' },
          { diary: 'He contado doce nombres y trece líneas. Una cifra de más no prueba fraude. Todavía.' },
          { say: 'cg_indice_noemi', text: 'No te fíes de los números hasta saber qué cuentan.' },
        ] },
        { text: 'No aceptar todavía', then: [{ say: 'cg_indice_noemi', text: 'Las cifras no van a cambiar por esperar. Lo que significan, quizá.' }] },
      ] },
    ],
    cg_indice_estado: [
      { if: '!flag.cg_indice_hoja', then: [{ say: 'cg_indice_noemi', text: 'Empieza por la hoja del archivador. El cero está tachado, pero se lee.' }] },
      { if: 'flag.cg_indice_hoja && !(flag.cg_indice_testimonio && flag.cg_indice_esquema && flag.cg_indice_collar)', then: [
        { say: 'cg_indice_noemi', text: 'No elijas una respuesta todavía. Falta una voz del puente, una explicación de la antena o una ficha de collar.' },
      ] },
      { if: 'flag.cg_indice_deducido && !flag.cg_indice_verificado', then: [{ say: 'cg_indice_noemi', text: 'La teoría es buena. Antes de publicarla, ve al poste de la Ruta 8 de Kanto. Si no reproduce el aviso, nos equivocamos.' }] },
      { if: 'flag.cg_indice_decision', then: [{ say: 'cg_indice_noemi', text: 'Isandro espera en Lavanda. La investigación termina cuando él sepa qué decidimos.' }] },
    ],
    cg_indice_prueba_hoja: [
      'El renglón 00 está trazado con regla, no arrancado. Se distingue la tinta azul debajo.',
      { say: 'cg_indice_noemi', text: 'Veintiuna catorce. Seis minutos antes de la sirena. Alguien quiso borrarlo del ranking, pero no del registro.' },
      { give: 'cg_indice_hoja' }, { read: 'cg_indice_hoja' },
      { set: { 'flag.cg_indice_hoja': true, 'vars.cg_indice_pistas': '+1' } },
      { diary: 'Pista uno: 00 existe. No sé si es una persona, un equipo o una máquina.' },
    ],
    cg_indice_prueba_damian: [
      { say: 'cg_indice_damian', text: 'Me colocaron cuarto. Me habría dado igual quedar último si alguien hubiera explicado esos tres golpes antes de la sirena.' },
      { say: 'cg_indice_damian', text: 'Vi una cinta crema junto al puente. No vi al dueño. La alarma sonó después. Eso es lo que escribí, aunque nadie me lo preguntó.' },
      { give: 'cg_indice_testimonio' }, { read: 'cg_indice_testimonio' },
      { set: { 'flag.cg_indice_testimonio': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'cg_indice_damian', text: 'Si quieres, hacemos una exhibición. Mi equipo está al 100 %. Si quieres una exhibición, curaré el tuyo primero. No voy a poner una prueba documental detrás de un combate.' },
      { choice: [
        { text: 'Aceptar el combate amistoso (con curación)', then: [
          { heal: true },
          { battle: 'cg_indice_damian_exhibicion', lose: 'continue',
            onWin: [
              { set: { 'flag.cg_indice_batalla_ganada': true } },
              { say: 'cg_indice_damian', text: 'Buen combate. Fíjate: el primero que ataca no siempre es el que mejor entiende el turno.' },
            ],
            onLose: [
              { set: { 'flag.cg_indice_batalla_perdida': true } },
              { say: 'cg_indice_damian', text: 'Bien jugado. Y ahora, a la libreta: no hay victoria que borre una hora.' },
            ] },
        ] },
        { text: 'Seguir con las pruebas', then: [{ say: 'cg_indice_damian', text: 'Eso sí es saber priorizar. Mi libreta no se va a mover.' }] },
      ] },
    ],
    cg_indice_prueba_vera: [
      'Vera desmonta una antena con la delicadeza de quien sabe exactamente cuánto cuesta una pieza nueva.',
      { say: 'cg_indice_vera', text: 'Los emisores de patrulla llevan número. Los que no están registrados salen como 00. La máquina no miente: solo le faltan palabras.' },
      { say: 'cg_indice_vera', text: 'Tres pulsos cortos piden ayuda. No son un nombre, ni un puesto, ni una victoria. Son una petición. Yo reparé el receptor después del simulacro; no inventé la señal.' },
      { give: 'cg_indice_esquema' }, { read: 'cg_indice_esquema' },
      { set: { 'flag.cg_indice_esquema': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'cg_indice_vera', text: 'Cuando alguien se burla de un cero, pregúntale qué representa. A veces es una ausencia. A veces es lo primero.' },
    ],
    cg_indice_prueba_isandro: [
      'Isandro está limpiando una cinta color crema. A su lado, un Audino inclina las orejas hacia una calle silenciosa.',
      { say: 'cg_indice_isandro', text: 'No tiene carnet de patrulla. Tiene oído. Aquella noche escuchó una llamada de auxilio antes que cualquiera de nosotros.' },
      { say: 'cg_indice_isandro', text: 'El collar de alerta transmitió tres pulsos. Cuando volvió, la batería estaba agotada. Nadie preguntó quién lo llevaba porque la pantalla decía 00.' },
      { give: 'cg_indice_collar' }, { read: 'cg_indice_collar' },
      { set: { 'flag.cg_indice_collar': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'cg_indice_isandro', text: 'No necesito una medalla para él. Necesito que la próxima vez escuchen antes de mirar si hay un nombre.' },
      { diary: 'La ficha del collar encaja con la señal 00. Debo reunir todas las pruebas antes de formular una hipótesis.' },
    ],
    cg_indice_deduccion: [
      { quest: 'cg_indice', stage: 'deduccion' },
      { say: 'cg_indice_noemi', text: 'Tenemos las cuatro piezas. Voy a hacerte una pregunta sencilla. Es la que todos evitamos: ¿qué era el puesto 00?' },
      { choice: [
        { text: 'Una patrulla secreta de élite', then: [
          { say: 'cg_indice_noemi', text: 'Una patrulla tendría identificador y firma. El esquema dice lo contrario. Vuelve a leerlo y prueba otra vez.' },
        ] },
        { text: 'Un error de reloj', then: [
          { say: 'cg_indice_noemi', text: 'La hora coincide en el registro y en la libreta. Lo que falta no es tiempo: es una identidad.' },
        ] },
        { text: 'Un aviso válido sin entrenador inscrito', then: [
          { set: { 'flag.cg_indice_deducido': true } },
          { quest: 'cg_indice', stage: 'verificacion' },
          { say: 'cg_indice_noemi', text: 'Exacto. Un Audino dio la alarma. El sistema sabía que alguien avisó, pero el ranking solo sabía contar personas registradas.' },
          { say: 'cg_indice_noemi', text: 'No lo publiquemos por intuición. La antena de pruebas de la Ruta 8 de Kanto conserva el mismo protocolo. Reproduce la señal 00.' },
          { diary: 'Hipótesis: la clasificación excluyó un aviso real porque quien lo envió era un Pokémon sin número de patrulla.' },
        ] },
      ] },
    ],
    cg_indice_verificacion: [
      'El poste está cubierto de polvo. Una placa indica: «Prueba de señales, canal 00». No hay nada heroico en un botón pequeño.',
      { choice: [
        { text: 'Transmitir tres pulsos cortos', then: [
          'Pip. Pip. Pip. La pantalla muestra «00 — AUXILIO RECIBIDO». Una luz verde confirma el registro.',
          { set: { 'flag.cg_indice_verificado': true } },
          { quest: 'cg_indice', stage: 'decision' },
          'El comunicador del poste crepita. Vera responde desde la casa de Bill.',
          { say: 'cg_indice_vera', text: 'La pantalla puede leer el aviso. El problema nunca estuvo en la máquina. Estuvo en la lista.' },
          { diary: 'La señal 00 funciona. La conclusión ya no depende de una memoria ni de un rumor.' },
        ] },
        { text: 'Transmitir un pulso largo', then: [
          'La pantalla muestra «PRUEBA SIN ALERTA». No hay luz verde.',
          'La ficha técnica distingue una pulsación larga de tres cortas. Puedes volver a intentarlo.',
        ] },
        { text: 'Revisar el esquema primero', then: [
          { read: 'cg_indice_esquema' },
          'El diagrama subraya «tres pulsos breves». Nada más.',
        ] },
      ] },
    ],
    cg_indice_decision: [
      { say: 'cg_indice_noemi', text: 'La prueba del poste coincide con los cuatro documentos. Tengo que corregir el ranking. Pero la Red quiere publicar el nombre de Isandro junto al collar.' },
      { say: 'cg_indice_noemi', text: 'Él no pidió eso. El aviso fue del Audino. Podemos publicar todo el expediente con su consentimiento o publicar el fallo del sistema sin señalar a la familia que lo descubrió.' },
      { choice: [
        { text: 'Publicar la corrección sin datos personales', then: [
          { set: { 'flag.cg_indice_anonimo': true, 'flag.cg_indice_decision': true } },
          { say: 'cg_indice_noemi', text: 'La Red reconocerá la señal y cambiará el reglamento. Los nombres quedarán bajo custodia, no en un cartel.' },
          { call: 'cg_indice_tras_decision' },
        ] },
        { text: 'Consultar a Isandro antes de dar nombres', then: [
          { set: { 'flag.cg_indice_consulta': true, 'flag.cg_indice_decision': true } },
          { say: 'cg_indice_noemi', text: 'Correcto. Ninguna clasificación vale el derecho a decidir cómo te cuentan.' },
          { call: 'cg_indice_tras_decision' },
        ] },
      ] },
    ],
    cg_indice_tras_decision: [
      { quest: 'cg_indice', stage: 'epilogo' },
      { give: 'cg_indice_acta' },
      { read: 'cg_indice_acta' },
      { say: 'cg_indice_noemi', text: 'He corregido la casilla. Ahora queda la parte importante: contarle a Isandro lo que cambió.' },
    ],
    cg_indice_epilogo: [
      'El Audino escucha tus pasos antes de que llegues. Isandro deja la cinta crema sobre el banco.',
      { if: 'flag.cg_indice_anonimo', then: [
        { say: 'cg_indice_isandro', text: 'Gracias por no convertirlo en una atracción. Ahora otros Pokémon podrán avisar sin que los borren por no tener entrenador registrado.' },
        'El Audino apoya una oreja en la palma de Isandro y vuelve a escuchar la calle.',
      ] },
      { if: 'flag.cg_indice_consulta', then: [
        { say: 'cg_indice_isandro', text: 'Si van a poner un nombre, que sea el suyo. Yo solo cargaba las pilas del collar.' },
        { say: 'cg_indice_isandro', text: 'Pueden contar la historia. Pero que expliquen también por qué no lo escucharon la primera vez.' },
        'El Audino se deja colocar una cinta nueva. Isandro sonríe al verla derecha.',
      ] },
      { if: 'flag.cg_indice_batalla_ganada', then: [
        { say: 'cg_indice_isandro', text: 'Damián me escribió. Dice que además de resolver el caso le enseñaste a mirar dos veces antes de atacar. Me alegro por él.' },
      ] },
      { say: 'cg_indice_isandro', text: 'La Red ha cambiado una línea de su reglamento. Parece poco. A veces una línea es la diferencia entre escuchar y no escuchar.' },
      { money: 1200 },
      { give: 'maxpotion', n: 1 },
      { quest: 'cg_indice', stage: 'hecha', done: true },
      { diary: 'El puesto cero nunca estuvo vacío. Era el lugar donde el sistema había decidido no mirar.' },
    ],
    cg_indice_despues_azafran: [
      { if: 'flag.cg_indice_anonimo', then: ['En el tablón hay una nueva categoría: «Primer aviso confirmado». El renglón 00 ya no está tachado. No figura ningún nombre personal.'] },
      { if: 'flag.cg_indice_consulta', then: ['En el tablón hay una nueva categoría: «Primer aviso confirmado». Una nota explica que su autoría se publicará solo con consentimiento.'] },
    ],
    cg_indice_despues_lavanda: [
      { say: 'cg_indice_isandro', text: 'Ahora cuando el collar suena, los demás miran hacia donde mira él. Es un comienzo.' },
      { if: 'flag.cg_indice_anonimo', then: ['La cinta crema está colgada junto a una placa sin nombres.'] },
      { if: 'flag.cg_indice_consulta', then: ['La cinta crema está colgada junto a una placa que espera una firma voluntaria.'] },
    ],
  },
};
