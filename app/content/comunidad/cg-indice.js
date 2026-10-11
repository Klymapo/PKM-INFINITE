// Propuesta independiente · El índice de los ausentes · misterio deductivo
// Cuatro testigos, cuatro documentos, una verificación de campo y una decisión persistente.
// Integración aditiva en zonas conocidas. No usa información de secreto/.
export default {
  npcs: {
    cg_indice_noemi: { name: 'Noemí', title: 'Archivera de la Red de Auxilio', look: { hair: 'bob', hairColor: '#202b45', eyes: '#9c783e', outfit: '#efe1c6', outfit2: '#243a5b', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses' } },
    cg_indice_damian: { name: 'Damián', title: 'Patrullero clasificado', look: { hair: 'short', hairColor: '#6c4a32', eyes: '#477080', outfit: '#365a76', outfit2: '#d3b86b', skin: 2, eyesStyle: 'normal', mouth: 'smile', acc: 'scar' } },
    // Vera e Isandro ya no salen (sus papeles los hacen Bill y el señor Fuji); se conservan por compatibilidad.
    cg_indice_vera: { name: 'Vera', title: 'Técnica de señales', look: { hair: 'tied', hairColor: '#38314b', eyes: '#5c8d9c', outfit: '#47627d', outfit2: '#e8d5ad', skin: 1, eyesStyle: 'sleepy', mouth: 'flat', acc: 'goggles' } },
    cg_indice_isandro: { name: 'Isandro', title: 'Cuidador voluntario', look: { hair: 'curly', hairColor: '#858177', eyes: '#5c6b4d', outfit: '#786b58', outfit2: '#c9b36f', skin: 4, eyesStyle: 'happy', mouth: 'smile', acc: 'beard' } },
  },
  items: {
    cg_indice_hoja: { name: 'Hoja del puesto cero', pocket: 'key', desc: 'Una clasificación con trece renglones y doce nombres.', read: 'RED DE AUXILIO — SIMULACRO DEL PUENTE\n\n21:14 — 00 — primer aviso\n21:20 — alarma pública\n21:23 — patrulla 04\n21:26 — patrulla 01\n21:29 — patrulla 09\n\nLa casilla 00 está tachada con regla. Debajo: «sin firma, no computa».\n\nAl margen alguien escribió: «¿Quién avisa si nadie firma?».', },
    cg_indice_testimonio: { name: 'Testimonio de Damián', pocket: 'key', desc: 'La hora que anotó el patrullero en su libreta.', read: 'Ruta del puente. 21:14. Cuatro golpes cortos y una pausa. Pensé que era una señal de un compañero. No había nadie. Vi algo con una cinta color crema junto a la barandilla. A las 21:20 sonó la alarma. Llegué tres minutos después.\n\nNo gané el primer puesto. No me importa. Me importa que alguien llegó antes.' },
    cg_indice_esquema: { name: 'Esquema de la antena', pocket: 'key', desc: 'Un diagrama de los avisos sin emisor registrado.', read: 'PROTOTIPO DE AVISO REMOTO\n\nUn emisor registrado transmite su número de patrulla. Un emisor sin número transmite 00. Cuatro pulsos breves activan alerta de ayuda. No identifica especie ni entrenador.\n\nLa señal 00 no es un error. Es un origen sin ficha.\n\nNota de Bill, en rotulador verde: «Si una máquina puede oírlo, ¿por qué el reglamento no?».', },
    cg_indice_collar: { name: 'Ficha de collar reparado', pocket: 'key', desc: 'Registro de un pequeño collar con cinta crema.', read: 'Collar de alerta n.º 00. Ajustado a un Audino de la Casa Pokémon del señor Fuji, que ayuda a detectar llamadas de auxilio.\n\nLa noche del simulacro, Audino salió antes de que sonara la sirena. Volvió con barro en las patas y el collar vacío de batería.\n\nFuji: «Lo dejé actuar. Escucha cosas que yo no oigo. No tiene una ficha de patrulla. Tiene un nombre».', },
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
        epilogo: 'Ve a ver al **señor Fuji** a **Lavanda** para cerrar la investigación.',
        hecha: 'La Red reconoció a su primer respondiente.',
      },
      parts: { title: 'Las cuatro pruebas', var: 'cg_indice_pistas', items: [
        { label: 'Hoja de clasificación', where: 'azafran', done: 'flag.cg_indice_hoja', hint: 'Revisa el archivador de la Red en Azafrán.' },
        { label: 'Testimonio del puente', where: 'celeste', done: 'flag.cg_indice_testimonio', hint: 'Habla con Damián junto al tablón de Celeste.' },
        { label: 'Esquema de la antena', where: 'casa_bill', done: 'flag.cg_indice_esquema', hint: '**Bill** revisó el receptor en su casa del cabo, pasado el **Puente Pepita**.' },
        { label: 'Ficha del collar', where: 'lavanda', done: 'flag.cg_indice_collar', hint: 'El **señor Fuji**, en **Lavanda**, cuida de un compañero que no figura en la lista.' },
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
      { label: 'Mesa de la Red de Auxilio', sub: 'Doce nombres y un renglón vacío', icon: '📊', cond: '!done.cg_indice', new: '!flag.cg_indice_inicio || (flag.cg_indice_hoja && flag.cg_indice_testimonio && flag.cg_indice_esquema && flag.cg_indice_collar && !flag.cg_indice_deducido) || (flag.cg_indice_verificado && !flag.cg_indice_decision)', talk: [
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
      { label: 'Bill, peleándose con una antena', sub: 'En su mesa hay un diagrama lleno de ceros', icon: '📡', cond: 'flag.cg_indice_inicio && !flag.cg_indice_esquema', new: 'true', talk: [{ script: 'cg_indice_prueba_vera' }] },
    ] },
    lavanda: { spots: [
      { label: 'El señor Fuji y un collar sin batería', sub: 'Una cinta crema cuelga del respaldo de su silla', icon: '🎗️', cond: 'flag.cg_indice_inicio && !flag.cg_indice_collar', new: 'true', talk: [{ script: 'cg_indice_prueba_isandro' }] },
      { label: 'La puerta de la Casa Pokémon', sub: 'Queda una última conversación', icon: '🌙', cond: 'flag.cg_indice_decision && !done.cg_indice', new: 'true', talk: [{ script: 'cg_indice_epilogo' }] },
      { label: 'Una cinta color crema', sub: 'Ahora cuelga junto a una placa nueva', icon: '🏅', cond: 'done.cg_indice', talk: [{ script: 'cg_indice_despues_lavanda' }] },
    ] },
    k_ruta8: { route: { tramos: { 3: [
      { talk: [{ script: 'cg_indice_verificacion' }], label: 'Poste de pruebas de la Red', sub: 'La antena tiene un botón marcado 00', icon: '📶', cond: 'flag.cg_indice_deducido && !flag.cg_indice_verificado', new: 'true' },
    ] } } },
  },
  scripts: {
    cg_indice_inicio: [
      'Un tablón exhibe doce puestos. Noemí tiene trece fichas en la mano. Las cuenta otra vez. Siguen siendo trece.',
      { say: 'cg_indice_noemi', text: 'La Red de Auxilio clasifica patrullas por rapidez y cooperación. Doce equipos, doce puestos. Pero hay un registro anterior a todos los demás, y alguien lo dejó fuera.' },
      { say: 'cg_indice_noemi', text: 'No busco a un culpable para una portada. Busco una explicación que resista cuatro preguntas: quién avisó, cuándo, cómo y por qué desapareció.' },
      { say: 'cg_indice_noemi', text: 'Te doy acceso a la hoja. Damián estuvo en Celeste; Bill, el del PC, revisó el receptor en su casa del cabo; y el señor Fuji, en Lavanda, tiene algo que ver con un collar. Habla con ellos en el orden que quieras.' },
      { choice: [
        { text: 'Investigar el puesto que falta', then: [
          { set: { 'flag.cg_indice_inicio': true } },
          { quest: 'cg_indice', stage: 'pruebas' },
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
      { if: 'flag.cg_indice_decision', then: [{ say: 'cg_indice_noemi', text: 'El señor Fuji espera en Lavanda. La investigación termina cuando él sepa qué decidimos.' }] },
    ],
    cg_indice_prueba_hoja: [
      'El renglón 00 está trazado con regla, no arrancado. Se distingue la tinta azul debajo.',
      { say: 'cg_indice_noemi', text: 'Veintiuna catorce. Seis minutos antes de la sirena. Alguien quiso borrarlo del ranking, pero no del registro.' },
      { give: 'cg_indice_hoja' }, { read: 'cg_indice_hoja' },
      { set: { 'flag.cg_indice_hoja': true, 'vars.cg_indice_pistas': '+1' } },
    ],
    cg_indice_prueba_damian: [
      { say: 'cg_indice_damian', text: 'Me colocaron cuarto. Me habría dado igual quedar último si alguien hubiera explicado esos cuatro golpes antes de la sirena.' },
      { say: 'cg_indice_damian', text: 'Vi una cinta crema junto al puente. No vi al dueño. La alarma sonó después. Eso es lo que escribí, aunque nadie me lo preguntó.' },
      { give: 'cg_indice_testimonio' }, { read: 'cg_indice_testimonio' },
      { set: { 'flag.cg_indice_testimonio': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'cg_indice_damian', text: 'Si quieres, hacemos una exhibición. Si aceptas, curo a tu equipo primero. No voy a poner una prueba documental detrás de un combate.' },
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
      'Bill tiene media antena desmontada sobre la mesa de la cocina y la otra media en la cabeza, a modo de diadema.',
      { say: 'bill', text: '¡Hola-hola! ¿Vienes por lo del 00? ¡Por fin alguien! Mira, mira: los emisores de patrulla llevan número. Los que no están registrados salen como 00. La máquina no miente. Solo le faltan palabras. Como a mí antes del café.' },
      { say: 'bill', text: 'Cuatro pulsos cortos piden ayuda. No son un nombre, ni un puesto, ni una victoria. Son una petición. Yo reparé el receptor después del simulacro, ¡pero la señal no me la inventé! Llegó. Llegó la primera. Y la lista la tiró a la papelera. Bueno, a la caja doce.' },
      { give: 'cg_indice_esquema' }, { read: 'cg_indice_esquema' },
      { set: { 'flag.cg_indice_esquema': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'bill', text: 'Cuando alguien se burle de un cero, pregúntale qué representa. A veces es una ausencia. A veces es lo primero que hubo. Eso lo dice la informática. Y mi abuela.' },
    ],
    cg_indice_prueba_isandro: [
      'En la Casa Pokémon, el señor Fuji limpia una cinta color crema con un pañuelo. A su lado, un Audino inclina las orejas hacia la calle, aunque no se oye nada.',
      { say: 'fuji', text: 'Bienvenid{o|a|e} otra vez. —Muy bajito—. No tiene carnet de patrulla. Tiene oído. Aquella noche oyó a alguien pedir ayuda en el puente antes que nadie. Le pusieron este collar los de la Red, para probarlo. Y yo lo dejé ir.' },
      { say: 'fuji', text: 'El collar mandó cuatro pulsos. Cuando volvió, la batería estaba agotada y él tenía barro hasta las orejas. Nadie preguntó quién lo llevaba. La pantalla decía 00, y un cero no se pregunta.' },
      { give: 'cg_indice_collar' }, { read: 'cg_indice_collar' },
      { set: { 'flag.cg_indice_collar': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'fuji', text: 'Hace muchos años, yo también medí a un Pokémon solo por lo que servía. —Deja el pañuelo—. No quiero una medalla para él. Quiero que la próxima vez escuchen antes de mirar si hay un nombre.' },
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
        ] },
      ] },
    ],
    cg_indice_verificacion: [
      'El poste está cubierto de polvo. Una placa indica: «Prueba de señales, canal 00». No hay nada heroico en un botón pequeño.',
      { choice: [
        { text: 'Transmitir cuatro pulsos cortos', then: [
          'Pip. Pip. Pip. La pantalla muestra «00 — AUXILIO RECIBIDO». Una luz verde confirma el registro.',
          { set: { 'flag.cg_indice_verificado': true } },
          { quest: 'cg_indice', stage: 'decision' },
          'El comunicador del poste crepita. Es Bill, desde su casa del cabo.',
          { say: 'bill', text: '¡Lo tengo! ¡Lo recibo! ¡Clic-clic! La pantalla lee el aviso perfectamente. El problema nunca estuvo en la máquina. Estuvo en la lista. Las listas son lo peor. Después de la caja doce.' },
        ] },
        { text: 'Transmitir un pulso largo', then: [
          'La pantalla muestra «PRUEBA SIN ALERTA». No hay luz verde.',
          'La ficha técnica distingue una pulsación larga de cuatro cortas. Puedes volver a intentarlo.',
        ] },
        { text: 'Revisar el esquema primero', then: [
          { read: 'cg_indice_esquema' },
          'El diagrama subraya «cuatro pulsos breves». Nada más.',
        ] },
      ] },
    ],
    cg_indice_decision: [
      { say: 'cg_indice_noemi', text: 'La prueba del poste coincide con los cuatro documentos. Tengo que corregir el ranking. Pero la Red quiere publicar el nombre del señor Fuji junto al collar. «El héroe de la Casa Pokémon». Ya tienen el titular.' },
      { say: 'cg_indice_noemi', text: 'Él no pidió eso. Es un hombre que no quiere que lo miren, y el aviso fue del Audino. Podemos publicar el expediente completo con su permiso, o el fallo del sistema sin señalar a nadie.' },
      { choice: [
        { text: 'Publicar la corrección sin datos personales', then: [
          { set: { 'flag.cg_indice_anonimo': true, 'flag.cg_indice_decision': true } },
          { say: 'cg_indice_noemi', text: 'La Red reconocerá la señal y cambiará el reglamento. Los nombres quedarán bajo custodia, no en un cartel.' },
          { call: 'cg_indice_tras_decision' },
        ] },
        { text: 'Preguntarle al señor Fuji antes de dar nombres', then: [
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
      { say: 'cg_indice_noemi', text: 'He corregido la casilla. Ahora queda la parte importante: contarle al señor Fuji lo que cambió.' },
    ],
    cg_indice_epilogo: [
      'El Audino escucha tus pasos antes de que llegues y te abre la puerta de la Casa Pokémon. El señor Fuji deja la cinta crema sobre la mesa, junto a la tetera.',
      { if: 'flag.cg_indice_anonimo', then: [
        { say: 'fuji', text: 'Gracias por no convertirnos en una atracción. Ahora otros Pokémon podrán avisar sin que los borren por no tener entrenador registrado.' },
        'El Audino apoya una oreja en la palma del señor Fuji y vuelve a escuchar la calle.',
      ] },
      { if: 'flag.cg_indice_consulta', then: [
        { say: 'fuji', text: 'Si van a poner un nombre, que sea el suyo. Yo solo le cargaba las pilas al collar. —Casi sonríe—. Gracias por preguntar. No suelen hacerlo.' },
        { say: 'fuji', text: 'Pueden contar la historia. Pero que expliquen también por qué no lo escucharon la primera vez.' },
        'El Audino se deja colocar una cinta nueva. El señor Fuji se la endereza dos veces, aunque ya estaba derecha.',
      ] },
      { if: 'flag.cg_indice_batalla_ganada', then: [
        { say: 'fuji', text: 'Damián me escribió. Dice que además de resolver el caso le enseñaste a mirar dos veces antes de atacar. Me alegro por él.' },
      ] },
      { say: 'fuji', text: 'La Red ha cambiado una línea de su reglamento. Parece poco. A veces una línea es la diferencia entre escuchar y no escuchar.' },
      { say: 'fuji', text: 'Toma. Lo llevaba el Audino cuando me lo dejaron en la puerta, de pequeño. Dicen que da suerte a quien aprende algo. Tú has aprendido a escuchar. Él ya lo sabía.' },
      { money: 2500 },
      { give: 'luckyegg', n: 1 },
      { give: 'maxpotion', n: 1 },
      { quest: 'cg_indice', stage: 'hecha', done: true },
      { diary: 'Hoy mi entrenador{|a|e} resolvió un misterio. ¡Un misterio de verdad, con pruebas y todo! Había un puesto cero en una lista y nadie sabía de quién era. Era de un Audino. Avisó el primero y no le contaron porque no tenía número. Yo tampoco tengo número. Bueno, sí tengo, pero es muy largo. Hoy le hemos devuelto el suyo.', cond: 'flag.b01_diario' },
    ],
    cg_indice_despues_azafran: [
      { if: 'flag.cg_indice_anonimo', then: ['En el tablón hay una nueva categoría: «Primer aviso confirmado». El renglón 00 ya no está tachado. No figura ningún nombre personal.'] },
      { if: 'flag.cg_indice_consulta', then: ['En el tablón hay una nueva categoría: «Primer aviso confirmado». Una nota explica que su autoría se publicará solo con consentimiento.'] },
    ],
    cg_indice_despues_lavanda: [
      { say: 'fuji', text: 'Ahora, cuando el collar suena, los demás miran hacia donde mira él. Es un comienzo.' },
      { if: 'flag.cg_indice_anonimo', then: ['La cinta crema está colgada junto a una placa sin nombres.'] },
      { if: 'flag.cg_indice_consulta', then: ['La cinta crema está colgada junto a una placa que espera una firma voluntaria.'] },
    ],
  },
};
