// La red de auxilio de Kanto · Capítulo: El índice de los ausentes (Celeste, Cabo, Lavanda, Ruta 8) · el sistema
// Idea de ChatGPT, rehecha como capítulo del arco `cg_red` (ver cg-red.js): por qué la Red dejó fuera a alguien.
// «La misión que fracasa bien»: si en la deducción te equivocas y le dices a Misty que lo mande así, el caso se
// cierra con tu informe (etapa `fallo`, flag cg_indice_fallo). No se reinicia ni se bloquea: tiene su propio
// desenlace con Fuji y Noemí, y el cierre del arco lo recuerda.
// Ids publicados intactos (misión, etapas, flags, var cg_indice_pistas, objetos, npcs, entrenador y guiones).
export default {
  npcs: {
    cg_indice_noemi: { name: 'Noemí', title: 'Archivera de la Red de Auxilio', look: { hair: 'bob', hairColor: '#202b45', eyes: '#9c783e', outfit: '#efe1c6', outfit2: '#243a5b', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses' } },
    cg_indice_damian: { name: 'Damián', title: 'Patrullero de la Red', look: { hair: 'short', hairColor: '#6c4a32', eyes: '#477080', outfit: '#365a76', outfit2: '#d3b86b', skin: 2, eyesStyle: 'normal', mouth: 'smile', acc: 'scar' } },
    cg_indice_vera: { name: 'Vera', title: 'Técnica de señales de la Red', look: { hair: 'tied', hairColor: '#38314b', eyes: '#5c8d9c', outfit: '#47627d', outfit2: '#e8d5ad', skin: 1, eyesStyle: 'sleepy', mouth: 'flat', acc: 'goggles' } },
    cg_indice_isandro: { name: 'Isandro', title: 'Vecino de Lavanda', look: { hair: 'curly', hairColor: '#858177', eyes: '#5c6b4d', outfit: '#786b58', outfit2: '#c9b36f', skin: 4, eyesStyle: 'happy', mouth: 'smile', acc: 'beard' } },
  },
  items: {
    cg_indice_hoja: { name: 'Hoja del Índice de avisos', pocket: 'key', desc: 'La hoja impresa del simulacro del Puente Pepita: trece avisos en papel, doce en el Índice.', read: 'RED DE AUXILIO · ÍNDICE DE AVISOS\nSimulacro del Puente Pepita\n\n21:14 · canal 00 · cuatro pulsos · DESCARTADO (emisor sin ficha)\n21:20 · sirena del simulacro\n21:23 · patrulla 04 · aviso confirmado\n21:26 · patrulla 01 · aviso confirmado\n21:29 · patrulla 09 · aviso confirmado\n[…]\n\nLa primera línea está tachada con regla. Debajo, impreso: «Los avisos sin ficha no se indexan».\n\nAl margen, con rotulador azul (letra de Misty): «¿Y quién avisa si no tiene ficha?».' },
    cg_indice_testimonio: { name: 'Testimonio de Damián', pocket: 'key', desc: 'La hora que el patrullero apuntó en su libreta la noche del simulacro.', read: 'Ruta 24, caseta del puente. 21:14.\n\nCuatro golpes cortos en la radio de mano y una pausa. Pensé que era un compañero. No había nadie. Vi algo pequeño con una cinta color crema junto a la barandilla, mirando al río.\n\n21:20, sirena. Llegué a las 21:23. Cuando llegué, el «herido» del simulacro ya estaba sentado, con una manta por encima.\n\nAlguien llegó antes que yo. Eso es todo lo que sé, y es lo que puse en el parte. No lo leyó nadie.' },
    cg_indice_esquema: { name: 'Esquema de la antena', pocket: 'key', desc: 'Un dibujo a lápiz de un repetidor, firmado por Bill a los once años y repasado ahora con rotulador verde.', read: 'REPETIDOR DE LA COLINA (Bill, 11 años)\n\nCanales 01 a 12: patrullas, con número.\nCanal 00: «para quien no tenga número». Abuelas, vigías, Pokémon, quien sea.\nCuatro pulsos cortos = ayuda. Uno largo = prueba.\n\nAl lado, con rotulador verde, letra de ahora:\n«El programa nuevo de la Red solo indexa los canales con ficha. El 00 lo trata como ruido. NO ES RUIDO. —B.»' },
    cg_indice_collar: { name: 'Ficha del collar 00', pocket: 'key', desc: 'La ficha de un collar de aviso de pruebas, con cinta crema.', read: 'COLLAR DE AVISO · PRUEBA · CANAL 00\nPortador: Audino de la Casa Pokémon (Lavanda). Sin ficha de patrulla.\n\nLa noche del simulacro salió antes de la sirena. Volvió con barro en las patas y la pila agotada: había mandado cuatro pulsos.\n\nNota del señor Fuji: «Lo dejé ir. Oye cosas que yo no oigo. No tiene número, tiene nombre. Se lo puse yo».' },
    cg_indice_acta: { name: 'Acta corregida de la Red', pocket: 'key', desc: 'Una hoja con el sello de la Red y una línea nueva en el reglamento.', read: 'RED DE AUXILIO DE KANTO · ACTA\n\nSe comprueba que el primer aviso del simulacro del Puente Pepita (21:14, canal 00) era válido y que el Índice lo descartó por no tener ficha de emisor.\n\nDesde hoy, el Índice registra también el canal 00. Un aviso no necesita ficha para contar.\n\nLa forma de contarlo en público se rige por lo acordado en la investigación.' },
  },
  quests: {
    cg_indice: { name: 'El índice de los ausentes', type: 'side', est: 60,
      stages: {
        inicio: 'Habla con **Misty** en el **Gimnasio de Celeste** sobre el simulacro.',
        pruebas: 'Reúne cuatro pruebas: el **Gimnasio de Celeste**, **Celeste**, la **casa de Bill** y **Lavanda**.',
        deduccion: 'Vuelve con **Misty**, en el **Gimnasio de Celeste**, y explícale qué pasó con el primer aviso.',
        verificacion: 'Busca a **Vera** en el poste de pruebas de la **Ruta 8** (tramo 3) y reproduce el aviso.',
        decision: 'Cuéntale a **Misty**, en el **Gimnasio de Celeste**, lo del poste y decide cómo se cuenta.',
        epilogo: 'Ve a ver al **señor Fuji** a **Lavanda** para cerrar la investigación.',
        fallo: 'La Red ha cerrado el caso con tu informe. Ve a ver al **señor Fuji** a **Lavanda**.',
        hecha: 'La Red ya no tira a la papelera los avisos sin ficha. O no del todo.',
      },
      parts: { title: 'Las cuatro pruebas', var: 'cg_indice_pistas', items: [
        { label: 'Hoja del Índice', where: 'gym_celeste', done: 'flag.cg_indice_hoja', hint: 'La hoja impresa está en el **Gimnasio de Celeste**, en la mesa de Misty.' },
        { label: 'Testimonio del puente', where: 'celeste', done: 'flag.cg_indice_testimonio', hint: 'Damián, el patrullero, anda por Celeste con su libreta.' },
        { label: 'Esquema de la antena', where: 'casa_bill', done: 'flag.cg_indice_esquema', hint: '**Bill** tiene algo que ver con el canal 00. Su casa está en el cabo, pasado el **Puente Pepita**.' },
        { label: 'Ficha del collar', where: 'lavanda', done: 'flag.cg_indice_collar', hint: 'El **señor Fuji**, en **Lavanda**, sabe quién llevaba la cinta crema.' },
      ] },
    },
  },
  trainers: {
    cg_indice_damian_exhibicion: { name: 'Damián', cls: 'Patrullero', npc: 'cg_indice_damian', ai: 3, reward: 900,
      team: [
        { sp: 'porygon2', lv: 54, moves: ['triattack', 'recover', 'thunderbolt', 'icebeam'] },
        { sp: 'altaria', lv: 55, moves: ['dragonpulse', 'roost', 'flamethrower', 'cottonguard'] },
      ],
      intro: 'Uno rápido, que luego tengo ronda. Sin rencor.',
      win: 'Me has leído los turnos antes que yo. Bien jugado.',
      lose: 'Ya está. Ahora ve a por lo importante, que yo no he hecho nada.',
    },
  },
  patches: {
    gym_celeste: { spots: [
      { label: 'Misty, con una hoja arrugada', sub: 'Trece líneas en papel y una tachada', icon: '📊', cond: '!done.cg_indice', new: '!flag.cg_indice_inicio || (flag.cg_indice_hoja && flag.cg_indice_testimonio && flag.cg_indice_esquema && flag.cg_indice_collar && !flag.cg_indice_deducido && !flag.cg_indice_fallo) || (flag.cg_indice_verificado && !flag.cg_indice_decision)', talk: [
        { cond: '!flag.cg_indice_inicio', script: 'cg_indice_inicio' },
        { cond: 'flag.cg_indice_verificado && !flag.cg_indice_decision', script: 'cg_indice_decision' },
        { cond: 'flag.cg_indice_hoja && flag.cg_indice_testimonio && flag.cg_indice_esquema && flag.cg_indice_collar && !flag.cg_indice_deducido && !flag.cg_indice_fallo', script: 'cg_indice_deduccion' },
        { script: 'cg_indice_estado' },
      ] },
      { label: 'Hoja del Índice', sub: 'La primera línea está tachada', icon: '📑', cond: 'flag.cg_indice_inicio && !flag.cg_indice_hoja', new: 'true', talk: [{ script: 'cg_indice_prueba_hoja' }] },
      { label: 'Acta de la Red de Auxilio', icon: '📜', cond: 'done.cg_indice', talk: [{ script: 'cg_indice_despues_azafran' }] },
    ] },
    celeste: { spots: [
      { label: 'Damián, patrullero', sub: 'Tiene una libreta con una hora rodeada', icon: '🕘', cond: 'flag.cg_indice_inicio && !flag.cg_indice_testimonio', new: 'true', talk: [{ script: 'cg_indice_prueba_damian' }] },
    ] },
    casa_bill: { spots: [
      { label: 'Bill, peleándose con una antena', sub: 'En su mesa hay un dibujo lleno de ceros', icon: '📡', cond: 'flag.cg_indice_inicio && !flag.cg_indice_esquema', new: 'true', talk: [{ script: 'cg_indice_prueba_vera' }] },
    ] },
    lavanda: { spots: [
      { label: 'El señor Fuji y un collar sin pila', sub: 'Una cinta crema cuelga del respaldo de su silla', icon: '🎗️', cond: 'flag.cg_indice_inicio && !flag.cg_indice_collar', new: 'true', talk: [{ script: 'cg_indice_prueba_isandro' }] },
      { label: 'La puerta de la Casa Pokémon', sub: 'Queda una última conversación', icon: '🌙', cond: '(flag.cg_indice_decision || flag.cg_indice_fallo) && !done.cg_indice', new: 'true', talk: [{ cond: 'flag.cg_indice_fallo', script: 'cg_indice_epilogo_fallo' }, { script: 'cg_indice_epilogo' }] },
      { label: 'Una cinta color crema', sub: 'Cuelga junto a la puerta de la Casa Pokémon', icon: '🏅', cond: 'done.cg_indice', talk: [{ script: 'cg_indice_despues_lavanda' }] },
    ] },
    k_ruta8: { route: { tramos: { 3: [
      { talk: [{ script: 'cg_indice_verificacion' }], label: 'Poste de pruebas de la Red', sub: 'Una técnica con gafas protectoras espera sentada', icon: '📶', cond: 'flag.cg_indice_deducido && !flag.cg_indice_verificado', new: 'true' },
    ] } } },
  },
  scripts: {
    cg_indice_inicio: [
      'Junto a la piscina del gimnasio, Misty tiene una hoja arrugada en una mano y un rotulador en la otra. Cuenta líneas con el rotulador. Las vuelve a contar. Resopla.',
      { say: 'misty', text: '¡Ah, eres tú! Ven, ven, que necesito otros ojos. Los míos ya ven doble. —Te pone la hoja delante—. El mes pasado hice un simulacro de rescate en el Puente Pepita con la Red de Auxilio. Los líderes lo hacemos cada año.' },
      { say: 'misty', cond: 'flag.b05_nereida_conocida', text: 'Y me entero de esto al volver de Alola, con la maleta llena de arena. Bienvenida a casa, Misty.' },
      { say: 'misty', text: 'La Red tiene un programa nuevo, el Índice, que apunta cada aviso: quién, cuándo, desde dónde. En el papel hay trece avisos. En el Índice, doce. El primero lo tiró él solito. En MI simulacro. En MI puente.' },
      { say: 'misty', text: 'No busco a quién gritarle. Bueno, un poco sí. Pero antes quiero saber quién avisó y por qué el programa decidió que no contaba.' },
      { say: 'misty', text: 'Yo no puedo dejar el gimnasio, así que te toca a ti. Damián, uno de los patrulleros, anda por Celeste con su libreta. Bill sabe algo de un canal 00, ese siempre sabe algo. Y el señor Fuji, en Lavanda, tiene que ver con un collar. En el orden que quieras.' },
      { choice: [
        { text: 'Investigar el aviso que falta', then: [
          { set: { 'flag.cg_indice_inicio': true } },
          { quest: 'cg_indice', stage: 'pruebas' },
          { say: 'misty', text: 'Y no te fíes de una lista hasta saber qué deja fuera. Eso me lo enseñó Brock. No se lo digas.' },
          { call: 'cg_red_toque' },
        ] },
        { text: 'Ahora no', then: [{ say: 'misty', text: 'Bueno, bueno. La hoja no se va a ir a ninguna parte. Yo tampoco. Por desgracia.' }] },
      ] },
    ],
    cg_indice_estado: [
      { if: '!flag.cg_indice_hoja', then: [{ say: 'misty', text: 'Empieza por la hoja impresa, la de la mesa. La primera línea está tachada, pero se lee.' }] },
      { if: 'flag.cg_indice_hoja && !(flag.cg_indice_testimonio && flag.cg_indice_esquema && flag.cg_indice_collar)', then: [
        { say: 'misty', text: 'No me des una respuesta todavía. Te falta alguien: Damián, Bill o el señor Fuji.' },
      ] },
      { if: 'flag.cg_indice_deducido && !flag.cg_indice_verificado', then: [{ say: 'misty', text: 'La teoría es buena. Pero antes de ir a la Red a armarla, pruébala. Vera te espera en el poste de pruebas de la **Ruta 8**.' }] },
      { if: 'flag.cg_indice_decision', then: [{ say: 'misty', text: 'Ve a ver al señor Fuji a Lavanda. Esto no se acaba hasta que él lo sepa.' }] },
      { if: 'flag.cg_indice_fallo', then: [{ say: 'misty', text: 'Ya está mandado. La Red dice «gracias, caso cerrado». A mí no me suena a cerrado. Pásate por Lavanda, anda.' }] },
    ],
    cg_indice_prueba_hoja: [
      'La primera línea está tachada con regla, no arrancada. Debajo se lee la tinta: 21:14, canal 00, cuatro pulsos.',
      { say: 'misty', text: 'Las nueve y catorce. Seis minutos antes de la sirena. Lo borraron del Índice, pero no del papel. El programa es tonto, pero ordenado.' },
      { give: 'cg_indice_hoja' }, { read: 'cg_indice_hoja' },
      { set: { 'flag.cg_indice_hoja': true, 'vars.cg_indice_pistas': '+1' } },
      { call: 'cg_red_toque' },
    ],
    cg_indice_prueba_damian: [
      { say: 'cg_indice_damian', text: '¿Te manda Misty? Entonces es por lo de la libreta. —La abre por una página doblada—. Aquí. Cuatro golpes en la radio a las nueve y catorce. Nadie me lo ha preguntado hasta hoy.' },
      { say: 'cg_indice_damian', text: 'Vi algo pequeño con una cinta crema junto a la barandilla. No vi a ningún dueño. Lo puse en el parte. El parte se lo comió el Índice, como todo lo que no lleva número.' },
      { give: 'cg_indice_testimonio' }, { read: 'cg_indice_testimonio' },
      { set: { 'flag.cg_indice_testimonio': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'cg_indice_damian', text: 'Oye, ¿un combate rápido? Te curo el equipo primero, que llevo de todo en la mochila. Y si dices que no, la libreta ya es tuya igual.' },
      { choice: [
        { text: 'Aceptar el combate (con curación)', then: [
          { heal: true },
          { battle: 'cg_indice_damian_exhibicion', lose: 'continue',
            onWin: [
              { set: { 'flag.cg_indice_batalla_ganada': true } },
              { say: 'cg_indice_damian', text: 'Buen combate. Te has fijado en el orden de mis turnos antes que yo. Eso es lo que nos faltó aquella noche.' },
            ],
            onLose: [
              { set: { 'flag.cg_indice_batalla_perdida': true } },
              { say: 'cg_indice_damian', text: 'Bien jugado, en serio. Y ahora a lo tuyo, que lo de la libreta importa más.' },
            ] },
        ] },
        { text: 'Seguir con la investigación', then: [{ say: 'cg_indice_damian', text: 'Me parece bien. Yo sigo con la ronda.' }] },
      ] },
      { call: 'cg_red_toque' },
    ],
    cg_indice_prueba_vera: [
      'Bill tiene media antena desmontada sobre la mesa de la cocina y la otra media en la cabeza, a modo de diadema. El Clefairy le sujeta los tornillos.',
      { say: 'bill', text: '¡Hola-hola! ¿Vienes por lo del 00? ¡Por fin alguien! Siéntate. No ahí, ahí está el soldador. Ahí. Bien.' },
      { say: 'bill', text: 'Te cuento un secreto que no es secreto: el canal 00 lo inventé yo. A los once años. Antes que el PC, antes que el teletransportador, antes de todo. —Te enseña un dibujo a lápiz, amarillento—. El repetidor de la colina, encima de Lavanda.' },
      { say: 'bill', text: 'La Red de entonces eran cuatro gatos con radios. Cada patrulla, su número. Y yo pensé: ¿y si avisa alguien que no tiene número? Una abuela desde su ventana. Un Pokémon. Pues canal 00. Para quien no tenga número.' },
      { say: 'bill', text: 'El repetidor lo desmontaron hace años. El programa nuevo, el Índice, solo indexa canales con ficha. El 00 lo trata como ruido. ¡Ruido! ¡Mi canal! Es como si el PC tirara a la papelera los Pokémon sin mote.' },
      { give: 'cg_indice_esquema' }, { read: 'cg_indice_esquema' },
      { set: { 'flag.cg_indice_esquema': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'bill', text: 'Cuatro pulsos cortos piden ayuda. Uno largo es una prueba. Eso lo sabe cualquier radio vieja de la caseta del puente. El programa nuevo no. —Se quita la antena de la cabeza—. Las máquinas no se equivocan, ¿eh? Se equivoca quien les dice qué escuchar.' },
      { say: 'cg_indice_vera', as: 'Una voz en la radio de Bill', text: 'Bill, ¿me oyes? Soy Vera. El poste de la Ruta 8 ya tiene corriente. Si alguien quiere probar el 00, yo estoy aquí toda la semana.' },
      { say: 'bill', text: '¡Vera! Técnica de señales de la Red. La única que me contesta los correos. Si Misty te manda a probar algo, ve a verla.' },
      { call: 'cg_red_toque' },
    ],
    cg_indice_prueba_isandro: [
      'En la entrada de la Casa Pokémon, el señor Fuji limpia una cinta color crema con un pañuelo. A su lado, un Audino inclina las orejas hacia la calle, aunque no se oye nada.',
      { say: 'fuji', text: 'Bienvenid{o|a|e} otra vez. —Muy bajito—. ¿Vienes por la cinta? Es suya. —Señala al Audino—. No tiene ficha de patrulla. Tiene oído.' },
      { say: 'fuji', text: 'Los de la Red le pusieron este collar para probarlo. Canal 00, me dijeron, que es el de los que no tienen número. Aquella noche se levantó antes que nadie, oyó algo en el puente y se fue. Yo lo dejé ir.' },
      { say: 'fuji', text: 'Volvió con barro hasta las orejas y la pila agotada. Nadie vino a preguntar. La pantalla decía 00, y por un cero no pregunta nadie.' },
      { give: 'cg_indice_collar' }, { read: 'cg_indice_collar' },
      { set: { 'flag.cg_indice_collar': true, 'vars.cg_indice_pistas': '+1' } },
      { say: 'fuji', text: 'Hace muchos años yo también medí a un Pokémon solo por lo que servía. —Deja el pañuelo—. No quiero una medalla para él. Quiero que la próxima vez escuchen antes de mirar si tiene número.' },
      { call: 'cg_red_toque' },
    ],
    cg_indice_deduccion: [
      { quest: 'cg_indice', stage: 'deduccion' },
      { say: 'misty', text: 'Ya lo tienes todo. —Se cruza de brazos—. A ver. Lo que nadie de la Red quiso contestar: ¿qué fue el aviso de las nueve y catorce y por qué no está en el Índice?' },
      { say: 'misty', text: 'Y te aviso: lo que me digas lo mando tal cual a la Red, que me tienen frita con el informe.' },
      { choice: [
        { text: 'Una patrulla que no estaba de servicio', then: [{ call: 'cg_indice_fallo_pregunta' }] },
        { text: 'Un error de reloj del programa', then: [{ call: 'cg_indice_fallo_pregunta' }] },
        { text: 'Un aviso de verdad, sin ficha: el Índice tira el canal 00', then: [
          { set: { 'flag.cg_indice_deducido': true } },
          { quest: 'cg_indice', stage: 'verificacion' },
          { say: 'misty', text: '¡Eso! El Audino del señor Fuji dio el aviso, por el canal de Bill, y el programa lo tiró porque no tenía número. —Se le escapa una sonrisa—. Un Pokémon ganó mi simulacro y nadie se enteró. Me encanta. Me enfada. Me encanta.' },
          { say: 'misty', text: 'Pero no voy a ir a la Red con una corazonada. Vera, la técnica, está en el poste de pruebas de la **Ruta 8**. Reproduce el aviso allí y veremos qué hace el Índice.' },
        ] },
      ] },
      { call: 'cg_red_toque' },
    ],
    cg_indice_fallo_pregunta: [
      { say: 'misty', text: '¿Seguro? Mira que Damián lo oyó con sus orejas y Bill tiene el dibujo. Yo me fío de ti, pero si me equivoco, me equivoco con tu nombre.' },
      { choice: [
        { text: 'Sí, mándalo así', then: [
          { set: { 'flag.cg_indice_fallo': true } },
          { quest: 'cg_indice', stage: 'fallo' },
          { say: 'misty', text: 'Pues mandado. —Teclea con un dedo, muy fuerte—. …Ya han contestado. «Gracias por la colaboración. Caso cerrado. Se revisarán los relojes». Qué rápido contestan cuando no hay que cambiar nada.' },
          { say: 'misty', text: 'Bueno. El señor Fuji querrá saberlo. Pásate por Lavanda.' },
        ] },
        { text: 'Espera, déjame pensarlo otra vez', then: [
          { say: 'misty', text: 'Eso. Piénsalo. Repasa lo que dice cada uno, que para eso los fuiste a ver.' },
        ] },
      ] },
    ],
    cg_indice_verificacion: [
      'Un poste de la Red cubierto de polvo, con una placa: «Pruebas de señal · canal 00». Al pie, sentada en una caja de herramientas, una mujer con gafas protectoras se toma un café de termo.',
      { say: 'cg_indice_vera', text: 'Vera. La de la radio de Bill. —No se levanta—. Misty me ha dicho que vienes a romperme el Índice. Adelante. El botón es ese.' },
      { choice: [
        { text: 'Mandar cuatro pulsos cortos', then: [
          'Pip. Pip. Pip. Pip. La pantallita del poste parpadea: «AVISO RECIBIDO · CANAL 00». Debajo, una línea más pequeña: «Índice: descartado, emisor sin ficha».',
          { say: 'cg_indice_vera', text: 'Ahí lo tienes. La radio lo oye. El programa lo tira. —Por fin se levanta—. Lo que yo decía en las reuniones. Pero a mí no me hacen caso, que voy en chándal.' },
          'De la radio del poste sale una voz que ya conoces.',
          { say: 'bill', as: 'Bill (por radio)', text: '¡Lo recibo! ¡Clic-clic! ¡Desde el cabo! El problema nunca fue la máquina, fue lo que le dijeron que tirara. ¡Te lo dije! Bueno, se lo dije a mi dibujo. Pero cuenta.' },
          { set: { 'flag.cg_indice_verificado': true } },
          { quest: 'cg_indice', stage: 'decision' },
          { say: 'cg_indice_vera', text: 'Le paso el registro a Misty. Tú cuéntale lo demás. Yo vuelvo a mi café.' },
        ] },
        { text: 'Mandar un pulso largo', then: [
          'Piiiiip. La pantallita dice: «PRUEBA · SIN ALERTA».',
          { say: 'cg_indice_vera', text: 'Eso es una prueba, no un aviso. Lo dice el dibujo de Bill, si lo llevas encima. Vuelve a intentarlo.' },
        ] },
        { text: 'Mirar el esquema primero', then: [
          { read: 'cg_indice_esquema' },
          { say: 'cg_indice_vera', text: 'Cuatro cortos. Bill lo subrayó tres veces. A los once años ya era así.' },
        ] },
      ] },
    ],
    cg_indice_decision: [
      { say: 'misty', text: '¡Funcionó! Vera ya me ha mandado el registro y la Red no ha tenido más remedio que cambiar el Índice. Ahora el 00 cuenta.' },
      { say: 'misty', text: 'Pero ahora quieren sacar al señor Fuji en el boletín. «El héroe de la Casa Pokémon». Ya tienen hasta el titular. Y él no quiere que lo miren, y el aviso fue del Audino.' },
      'En la puerta del gimnasio aparece una mujer con gafas y una carpeta bajo el brazo: Noemí, la archivera de la Red.',
      { say: 'cg_indice_noemi', text: 'Vengo a por el acta. —A ti—. Ah, usted otra vez. —A Misty—. El boletín sale el lunes. Necesito saber qué pongo, porque lo que no ponga hoy dentro de diez años no existe.' },
      { say: 'misty', text: 'Tú lo has investigado: tú decides. ¿Contamos solo el fallo del Índice, sin nombres, o le preguntamos primero al señor Fuji?' },
      { choice: [
        { text: 'Contar el fallo, sin nombres', then: [
          { set: { 'flag.cg_indice_anonimo': true, 'flag.cg_indice_decision': true } },
          { say: 'cg_indice_noemi', text: '«Un aviso válido del canal 00, sin ficha.» Corto. Archivable. Me gusta.' },
          { say: 'misty', text: 'Hecho. Sin nombres, sin cartel. El que quiera saber, que pregunte. Y que pregunte en Lavanda, que allí lo sabe todo el mundo.' },
          { call: 'cg_indice_tras_decision' },
        ] },
        { text: 'Preguntarle al señor Fuji antes', then: [
          { set: { 'flag.cg_indice_consulta': true, 'flag.cg_indice_decision': true } },
          { say: 'cg_indice_noemi', text: 'Dejo la línea en blanco hasta que él conteste. Es la primera vez que dejo una línea en blanco a propósito.' },
          { say: 'misty', text: 'Bien pensado. Que cada uno decida cómo lo cuentan.' },
          { call: 'cg_indice_tras_decision' },
        ] },
      ] },
    ],
    cg_indice_tras_decision: [
      { quest: 'cg_indice', stage: 'epilogo' },
      { give: 'cg_indice_acta' },
      { read: 'cg_indice_acta' },
      { say: 'misty', text: 'Ya he corregido mi hoja. Con rotulador, bien gordo. Ahora lo importante: ve a contárselo al señor Fuji.' },
      { call: 'cg_red_toque' },
    ],
    cg_indice_epilogo: [
      'El Audino oye tus pasos antes de que llegues y te abre la puerta de la Casa Pokémon. El señor Fuji deja la cinta crema sobre la mesa, junto a la tetera.',
      { if: 'flag.cg_indice_anonimo', then: [
        { say: 'fuji', text: 'Gracias por no convertirnos en una atracción. Ahora otros podrán avisar sin que los tiren por no tener número.' },
        'El Audino apoya una oreja en la palma del señor Fuji y vuelve a escuchar la calle.',
      ] },
      { if: 'flag.cg_indice_consulta', then: [
        { say: 'fuji', text: 'Si van a poner un nombre, que sea el suyo. Yo solo le cargaba la pila. —Casi sonríe—. Gracias por preguntar. No suelen hacerlo.' },
        'El Audino se deja poner una cinta nueva. El señor Fuji se la endereza dos veces, aunque ya estaba derecha.',
      ] },
      { if: 'flag.cg_indice_batalla_ganada', then: [
        { say: 'fuji', text: 'Damián me escribió. Dice que le ganaste y que, además, le leíste los turnos. Se le notaba contento.' },
      ] },
      { say: 'fuji', text: 'La Red ha cambiado una línea de su programa. Parece poco. A veces una línea es la diferencia entre oír y no oír.' },
      { call: 'cg_indice_regalos' },
      { diary: 'Hoy mi entrenador{|a|e} resolvió un misterio. ¡Con pruebas y todo! En una lista había trece avisos y el programa solo contaba doce. El que faltaba lo dio un Audino, por un canal que inventó Bill cuando era pequeño. El programa lo tiró porque el Audino no tenía número.\n\nYo tengo número de serie. Es larguísimo. Hoy se lo he contado a mi entrenador{|a|e} entero, por si acaso.', cond: 'flag.b01_diario' },
    ],
    cg_indice_epilogo_fallo: [
      'El Audino no te abre la puerta: está sentado en el escalón, sin collar, mirando hacia el puente que no se ve desde aquí. El señor Fuji te hace pasar.',
      { say: 'fuji', text: 'Vinieron esta mañana a por los collares de prueba. Como el caso fue «un error de reloj», ya no hacen falta. —Sirve dos tazas—. No te disculpes. Yo también me he equivocado leyendo cosas. Durante años.' },
      'Llaman a la puerta. Es Noemí, la archivera, con un libro de tapas negras bajo el brazo y cara de no haber dormido.',
      { say: 'cg_indice_noemi', text: 'El Índice no lo va a apuntar. Lo apunto yo. —Deja el libro sobre la mesa y lo abre por la primera página. Arriba, a mano: «Canal 00»—. Si vuelve a avisar, me llaman, y yo lo escribo. Con bolígrafo. El papel no tira nada.' },
      { say: 'fuji', text: 'Ella apunta. Yo le cargo la pila al collar viejo, el mío, que no es de la Red. Y él escucha. —Mira al Audino—. No es lo que queríamos. Pero es algo.' },
      { set: { 'flag.cg_indice_libro00': true } },
      { call: 'cg_indice_regalos' },
      { diary: 'Hoy mi entrenador{|a|e} se equivocó con un misterio. Le dijo a Misty que era un error de reloj y no lo era. Pasa. A mí una vez se me olvidó un Pokémon entero de la Pokédex y me lo encontré debajo de otro.\n\nAhora una señora muy seria apunta a mano lo que el programa no quiere apuntar. El libro se llama «Canal 00». Yo también lo voy a apuntar aquí, para que esté en dos sitios.', cond: 'flag.b01_diario' },
    ],
    cg_indice_regalos: [
      { say: 'fuji', text: 'Toma. —Un huevo pequeño, de cáscara moteada, envuelto en un trapo—. No es de él, no te preocupes. Es un amuleto que le dejaron en la puerta cuando lo trajeron, de crío. Dicen que trae suerte a quien aprende algo.' },
      { give: 'luckyegg', n: 1 },
      { say: 'fuji', text: 'Y esto. —Una ruedecita de baquelita, con un 00 grabado—. El dial del collar viejo, el primero que tuvo. Bill lo reconocerá: lo hizo él, de crío, para la Red de entonces.' },
      { give: 'cg_red_dial' },
      { money: 2500 },
      { give: 'maxpotion', n: 1 },
      { quest: 'cg_indice', stage: 'hecha', done: true },
      { call: 'cg_red_toque' },
    ],
    cg_indice_despues_azafran: [
      { if: 'flag.cg_indice_anonimo', then: ['Una hoja de la Red, clavada junto a la piscina: «El Índice registra el canal 00». No figura ningún nombre. Misty ha dibujado un Audino en la esquina. Le ha salido regular.'] },
      { if: 'flag.cg_indice_consulta', then: ['Una hoja de la Red, clavada junto a la piscina: «El Índice registra el canal 00». Debajo, con letra de Noemí: «Primer aviso: Audino de la Casa Pokémon, con permiso de su familia».'] },
      { if: 'flag.cg_indice_fallo', then: ['La hoja de Misty, la de las trece líneas, sigue clavada junto a la piscina. Ha rodeado la primera con rotulador rojo y ha escrito al lado: «Esto no es un reloj».'] },
    ],
    cg_indice_despues_lavanda: [
      { if: 'flag.cg_indice_fallo', then: [
        { say: 'fuji', text: 'Noemí ya lleva tres líneas en su libro negro. Dos son del Audino. La otra, de un Pidgey que se quedó enganchado en la torre. Cuentan igual.' },
      ], else: [
        { say: 'fuji', text: 'Ahora, cuando el collar suena, los demás miran hacia donde mira él. Es un comienzo.' },
      ] },
      { if: 'flag.cg_indice_anonimo', then: ['La cinta crema cuelga junto a la puerta, al lado de una placa sin nombres.'] },
      { if: 'flag.cg_indice_consulta', then: ['La cinta crema cuelga junto a la puerta, al lado de una placa con un solo nombre: el del Audino.'] },
    ],
  },
};
