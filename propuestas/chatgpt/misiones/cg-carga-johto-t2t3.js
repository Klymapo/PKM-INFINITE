// Pokémon Infinite · propuesta de Elio/Argos · tramos T2 y T3.
// Se integra después de cg-carga-johto.js. Módulo aislado para reanudación.
// IMPORTANTE: no publicar sin completar T4–T7, revisar condiciones y auditar.
export default {
  patches: {
    iris: { spots: [
      { label: 'Tres guías y una mesa', icon: '🗂️', sub: 'Quienes conocieron el envío recuerdan cosas diferentes',
        cond: 'flag.cg_carga_t1_fin && !flag.cg_carga_t2_fin',
        new: '!flag.cg_carga_t2_inicio', talk: [{ script: 'cg_carga_iris_inicio' }] },
      { label: 'Guía del camino corto', icon: '🧭', sub: 'Recuerda las piedras, no las fechas',
        cond: 'flag.cg_carga_t2_inicio && !flag.cg_carga_t2_fin',
        new: '!flag.cg_carga_t2_guia1', doneIf: 'flag.cg_carga_t2_guia1',
        talk: [{ script: 'cg_carga_guia_camino' }] },
      { label: 'Guía de los relevos', icon: '🔦', sub: 'Recuerda quién cambió el farol',
        cond: 'flag.cg_carga_t2_inicio && !flag.cg_carga_t2_fin',
        new: '!flag.cg_carga_t2_guia2', doneIf: 'flag.cg_carga_t2_guia2',
        talk: [{ script: 'cg_carga_guia_relevo' }] },
      { label: 'Guía de los sellos', icon: '🪶', sub: 'Reconoce una marca de humedad',
        cond: 'flag.cg_carga_t2_inicio && !flag.cg_carga_t2_fin',
        new: '!flag.cg_carga_t2_guia3', doneIf: 'flag.cg_carga_t2_guia3',
        talk: [{ script: 'cg_carga_guia_sello' }] },
      { label: 'Mesa de cotejo de Iris', icon: '🧩', sub: 'Tres relatos, un registro y una pregunta precisa',
        cond: 'flag.cg_carga_t2_guia1 && flag.cg_carga_t2_guia2 && flag.cg_carga_t2_guia3 && !flag.cg_carga_t2_fin',
        new: 'true', talk: [{ script: 'cg_carga_cotejo_iris' }] },
      { label: 'La ficha del camino', icon: '🧭', sub: 'Anota el siguiente destino',
        cond: 'flag.cg_carga_t2_fin', talk: [{ script: 'cg_carga_iris_despues' }] }
    ] },
    caoba: { spots: [
      { label: 'Canal de devolución', icon: '🌊', sub: 'Un pequeño Wooper observa el agua sin meterse',
        cond: 'flag.cg_carga_t2_fin && !flag.cg_carga_t3_fin',
        new: '!flag.cg_carga_t3_inicio', talk: [{ script: 'cg_carga_caoba_inicio' }] },
      { label: 'Huellas de la orilla', icon: '🐾', sub: 'Marcas bajo una tabla humedecida',
        cond: 'flag.cg_carga_t3_inicio && !flag.cg_carga_t3_fin',
        new: '!flag.cg_carga_t3_huellas', doneIf: 'flag.cg_carga_t3_huellas',
        talk: [{ script: 'cg_carga_huellas' }] },
      { label: 'Rejilla del canal', icon: '🪵', sub: 'Lodo de dos colores',
        cond: 'flag.cg_carga_t3_inicio && !flag.cg_carga_t3_fin',
        new: '!flag.cg_carga_t3_rejilla', doneIf: 'flag.cg_carga_t3_rejilla',
        talk: [{ script: 'cg_carga_rejilla' }] },
      { label: 'Borde de la acequia', icon: '🌱', sub: 'Unas plantas están aplastadas río arriba',
        cond: 'flag.cg_carga_t3_inicio && !flag.cg_carga_t3_fin',
        new: '!flag.cg_carga_t3_plantas', doneIf: 'flag.cg_carga_t3_plantas',
        talk: [{ script: 'cg_carga_plantas' }] },
      { label: 'Refugio de Wooper', icon: '💧', sub: 'Auxiliar sin capturar ni asustar al Pokémon',
        cond: 'flag.cg_carga_t3_huellas && flag.cg_carga_t3_rejilla && flag.cg_carga_t3_plantas && !flag.cg_carga_t3_fin',
        new: 'true', talk: [{ script: 'cg_carga_wooper' }] },
      { label: 'Canal en calma', icon: '🌿', sub: 'Una nueva marca en la ribera',
        cond: 'flag.cg_carga_t3_fin', talk: [{ script: 'cg_carga_caoba_despues' }] }
    ] }
  },
  scripts: {
    cg_carga_iris_inicio: [
      'En Iris, tres guías comparten una mesa que se queda pequeña cada vez que alguno abre su carpeta.',
      'No son tres personas que discuten lo mismo. Cada una recuerda una parte diferente del camino.',
      { say: 'rotom', text: '¡Bzzt! ¡Tres testigos! Eso son tres oportunidades de confundirse o una de entender.' },
      { if: '!flag.b07_fin', then: [
        'A pocos pasos reconoces a Tobías. Está intentando hacer que un papel doblado mantenga un equilibrio imposible sobre la punta de un lápiz.',
        { say: 'tobias', text: 'Un documento parece sólido hasta que lo apoyas sobre algo que no lo sostiene. Ya me pasó con un combate que tenía planeado precioso.' },
        { say: 'tobias', text: 'Si una firma contradice un viaje, yo preguntaría si la firma certifica el viaje o solamente que alguien recibió una hoja.' }
      ], else: [
        'Hay una nota que Tobías dejó tras una visita anterior: «No confundas la hoja con el viaje. Yo cometí ese error con mis equipos».'
      ] },
      { set: { 'flag.cg_carga_t2_inicio': true } },
      { quest: 'cg_carga_johto', stage: 'iris' },
      'Los guías acceden a hablar por separado, sin que ninguno tenga que acusar al otro.'
    ],
    cg_carga_guia_camino: [
      'El primer guía tiene las botas manchadas de polvo blanco. Sobre la mesa dibuja tres curvas con un dedo.',
      '«Yo guié el camino corto. Se puede atravesar por las piedras, pero no después de llover. Ese día la mitad de las piedras estaba bajo el agua».',
      { choice: [
        { text: 'Preguntar por el estado del camino', then: [
          '«Había marcas de lluvia antigua. No llovía entonces. La humedad estaba en las piedras de abajo, no en el papel».',
          { if: '!flag.cg_carga_t2_guia1', then: [
            { set: { 'flag.cg_carga_t2_guia1': true } },
            'Anotas: «El recorrido directo tenía obstáculos; el paquete pudo cambiar de mano o ruta».'
          ] }
        ] },
        { text: 'Exigir la hora exacta', then: [
          '«No llevo reloj. Llegué antes de la campana de mediodía. Eso es todo lo que puedo jurar».',
          { say: 'rotom', text: '¡Bzzt! Nos sirve el orden de los hechos, aunque falten los minutos.' }
        ] },
        { text: 'Pedir que dibuje las curvas', then: [
          'Su dibujo deja una piedra aislada entre dos corrientes. No puede recordar la hora, pero sí la dirección del agua.',
          { if: '!flag.cg_carga_t2_guia1', then: [
            { set: { 'flag.cg_carga_t2_guia1': true } },
            'Anotas: «La ruta corta no era recta ese día».'
          ] }
        ] }
      ] }
    ],
    cg_carga_guia_relevo: [
      'La segunda guía se tapa los ojos para recordar. «Yo hice el relevo del farol. No del paquete. Se lo dije tres veces al que escribió el informe».',
      { choice: [
        { text: 'Preguntar qué entregó', then: [
          '«Un farol, encendido. Le cambié el aceite y lo dejé en un gancho. Mis manos estaban libres cuando pasó la carreta».',
          { if: '!flag.cg_carga_t2_guia2', then: [
            { set: { 'flag.cg_carga_t2_guia2': true } },
            'Anotas: «El relevo de un farol no demuestra el relevo de la mercancía».'
          ] }
        ] },
        { text: 'Preguntar quién firmó', then: [
          '«Vi a una persona sostener un lápiz, pero desde donde estaba no pude leer el nombre. No me hagas fingir que sí».',
          { if: '!flag.cg_carga_t2_guia2', then: [
            { set: { 'flag.cg_carga_t2_guia2': true } },
            'Anotas: «Testigo presencial de una firma, no de su contenido».'
          ] }
        ] },
        { text: 'Decirle que el otro guía asegura lo contrario', then: [
          '«Si se refiere a la ruta corta, que la dibuje. Yo estaba en el gancho del farol, no en el río».',
          'Dos personas pueden contar cosas diferentes sin que alguna mienta.'
        ] }
      ] }
    ],
    cg_carga_guia_sello: [
      'La tercera guía abre un cuaderno envuelto en tela. En una esquina hay una mancha que se parece al contorno de una hoja.',
      '«Ese papel se mojó por una esquina. Lo dejé secar. Me encargaron resguardarlo, no llevar la caja».',
      { choice: [
        { text: 'Comparar la mancha con el sobre de Olivo', then: [
          'El agua dejó una línea fina en el borde. En el documento de Olivo, la tinta de la fecha también está corrida, pero la firma no.',
          { if: '!flag.cg_carga_t2_guia3', then: [
            { set: { 'flag.cg_carga_t2_guia3': true } },
            'Anotas: «La fecha se escribió antes de la humedad; la firma quizá después».'
          ] }
        ] },
        { text: 'Preguntar dónde secó el papel', then: [
          '«En un lugar cubierto. Lo sujeté con piedras limpias. Al ir por él, el borde seguía un poco húmedo».',
          { if: '!flag.cg_carga_t2_guia3', then: [
            { set: { 'flag.cg_carga_t2_guia3': true } },
            'Anotas: «El papel estuvo separado del paquete parte del trayecto».'
          ] }
        ] },
        { text: 'Preguntar si vio una falsificación', then: [
          '«No. Y no voy a decir que la vi para que tu investigación termine más pronto».',
          { say: 'rotom', text: '¡Bzzt! Bien dicho. Una sospecha no vuelve a nadie testigo.' }
        ] }
      ] }
    ],
    cg_carga_cotejo_iris: [
      'Pones las tres declaraciones en el mismo borde de la mesa. El dibujo, el farol y la mancha de agua no se contradicen.',
      { say: 'rotom', text: '¡Bzzt! El reto es qué significa la firma, no a quién le pertenece. Esa pregunta todavía no tiene pruebas.' },
      { choice: [
        { text: 'Los tres guías trasladaron la caja en secreto', then: [
          'El primer guía reconoce un camino; la segunda entregó un farol; la tercera protegió un documento. Ninguno afirmó haber transportado la caja.'
        ] },
        { text: 'La firma prueba que el documento se recibió, no que la caja llegó', then: [
          'La humedad afecta la fecha y la hoja, pero no a la firma. El relevo del farol tampoco certifica la carga.',
          'Es una explicación más pequeña que una falsificación y cabe dentro de las tres declaraciones.',
          { set: { 'flag.cg_carga_t2_fin': true, 'flag.cg_carga_t2_documento': true } },
          { quest: 'cg_carga_johto', stage: 'caoba' },
          'En la parte posterior de la hoja aparece una marca de agua del canal de Caoba. Es una dirección para investigar, no una respuesta.',
          { diary: 'En Iris escuchamos tres versiones. Una persona recordaba piedras, otra un farol y otra un papel mojado. Ninguno aseguraba haber visto moverse la caja. Ahora sabemos distinguir un recibo de documentos de un recibo de mercancías. El agua nos lleva a Caoba.', cond: 'flag.b01_diario' }
        ] },
        { text: 'La diferencia de tinta demuestra que alguien mintió', then: [
          'Una tinta diferente solo demuestra un momento distinto de escritura. Todavía no hay testigo que identifique a quien firmó.',
          { say: 'rotom', text: '¡Una respuesta cómoda no siempre es una respuesta completa!' }
        ] }
      ] }
    ],
    cg_carga_iris_despues: [
      'Una tablilla en la mesa dice «TRES GUIAS — UNA SOLA REMESA». Debajo hay tres dibujos: piedras, un farol y un papel.',
      'La siguiente página de la carpeta está señalada en Caoba, junto al canal.'
    ],
    cg_carga_caoba_inicio: [
      'El canal de Caoba lleva una corriente lenta, turbia por una lluvia que terminó hace rato.',
      'A pocos pasos, un Wooper intenta meterse al agua y vuelve a retroceder. No está atrapado, pero algo lo incomoda.',
      { say: 'rotom', text: '¡Bzzt! Podríamos seguir el recibo, sí. Pero antes tenemos que saber si pasa algo malo aquí.' },
      { set: { 'flag.cg_carga_t3_inicio': true } },
      { quest: 'cg_carga_johto', stage: 'caoba' },
      'Puedes revisar huellas, rejilla y plantas en el orden que quieras. Wooper no parece dispuesto a alejarse.'
    ],
    cg_carga_huellas: [
      'La orilla conserva huellas pequeñas de Wooper. Entre ellas hay una marca lisa, demasiado recta para ser una pisada.',
      { choice: [
        { text: 'Seguir la marca sin pisar las huellas', then: [
          'La marca termina junto al canal. Una tabla estuvo apoyada contra el agua y luego fue retirada.',
          { if: '!flag.cg_carga_t3_huellas', then: [
            { set: { 'flag.cg_carga_t3_huellas': true } },
            'Anotas: «Alguien apoyó una tabla para acercar o retirar algo del canal».'
          ] }
        ] },
        { text: 'Buscar una marca de neumático', then: [
          'No hay ruedas sobre el lodo fino. El terreno habría guardado el dibujo de una carreta.',
          { if: '!flag.cg_carga_t3_huellas', then: [
            { set: { 'flag.cg_carga_t3_huellas': true } },
            'Anotas: «No hay evidencia de que una carreta entrara por esta orilla».'
          ] }
        ] },
        { text: 'Apartar el barro con el pie', then: [
          'Wooper da un saltito hacia atrás. Mejor observar la superficie sin destruirla.',
          { say: 'rotom', text: '¡Bzzt! Si borramos la pista, tendremos que inventarnos otra. Y no pienso hacerlo.' }
        ] }
      ] }
    ],
    cg_carga_rejilla: [
      'En la rejilla se juntan restos de plantas y lodo oscuro. Al levantar la vista, notas que la corriente pasa por dos canales.',
      { choice: [
        { text: 'Comparar la corriente de ambos lados', then: [
          'En un lado la corriente corre limpia; en el otro, un charco estancado acumula materia vegetal. No hay manchas de aceite.',
          { if: '!flag.cg_carga_t3_rejilla', then: [
            { set: { 'flag.cg_carga_t3_rejilla': true } },
            'Anotas: «El agua estancada puede explicar que Wooper evite ese tramo».'
          ] }
        ] },
        { text: 'Buscar restos del embalaje', then: [
          'Hay hilo de cáñamo en la rejilla. Es como el de Olivo, aunque no puedes probar que procede de la misma caja.',
          { if: '!flag.cg_carga_t3_rejilla', then: [
            { set: { 'flag.cg_carga_t3_rejilla': true } },
            'Anotas: «El embalaje pudo pasar por aquí; el hilo por sí solo no lo acredita».'
          ] }
        ] },
        { text: 'Declarar que el canal está contaminado', then: [
          'No hay base para asegurarlo. El agua puede estar turbia por lluvia, barro o falta de corriente.',
          { say: 'rotom', text: '¡Bzzt! Mejor no decirle a todo Caoba que hay contaminación sin medir nada.' }
        ] }
      ] }
    ],
    cg_carga_plantas: [
      'Las plantas cercanas están aplastadas en una franja estrecha. Las de río abajo siguen erguidas.',
      { choice: [
        { text: 'Buscar el punto donde empieza la franja', then: [
          'La franja empieza donde el canal cambia de dirección. Las plantas sujetan parte del barro, pero el agua se desvía hacia un remanso.',
          { if: '!flag.cg_carga_t3_plantas', then: [
            { set: { 'flag.cg_carga_t3_plantas': true } },
            'Anotas: «Una obstrucción parcial desvió la corriente hacia una zona de poca oxigenación».'
          ] }
        ] },
        { text: 'Revisar si alguien arrancó las raíces', then: [
          'Las raíces siguen dentro de la tierra. No hay cortes; la vegetación fue doblada por presión desde arriba.',
          { if: '!flag.cg_carga_t3_plantas', then: [
            { set: { 'flag.cg_carga_t3_plantas': true } },
            'Anotas: «La vegetación no fue cortada para pasar con una carga».'
          ] }
        ] },
        { text: 'Buscar un Pokémon escondido', then: [
          'Un Hoppip se aparta sin asustarse. Las plantas siguen dobladas: es una marca demasiado larga para una sola huella pequeña.'
        ] }
      ] }
    ],
    cg_carga_wooper: [
      'Wooper mira el agua estancada y luego la corriente clara. Lo que parecía una pista del paquete es también su sitio para vivir.',
      { say: 'rotom', text: '¡Bzzt! Podemos arreglar la orilla sin meterlo en una Poké Ball. ¿Qué prefieres?' },
      { choice: [
        { text: 'Despejar la rejilla desde tierra firme', then: [
          'Retiras ramas y hojas caídas sin pisar el lecho del canal. La corriente recupera poco a poco una vía.',
          { set: { 'flag.cg_carga_t3_cauce': true } },
          { call: 'cg_carga_wooper_cierre' }
        ] },
        { text: 'Marcar el paso y pedir revisión al encargado', then: [
          'Acordonas el borde con una cuerda disponible y dejas una nota concreta: agua estancada tras la rejilla, corriente clara a un lado.',
          { set: { 'flag.cg_carga_t3_aviso': true } },
          { call: 'cg_carga_wooper_cierre' }
        ] },
        { text: 'Intentar que Wooper nade a la fuerza', then: [
          'Wooper retrocede y te observa. No hay motivo para imponerle el agua que está evitando.',
          { say: 'rotom', text: '¡Bzzt! No hace falta obligarlo. Podemos cambiar la situación, no a Wooper.' }
        ] }
      ] }
    ],
    cg_carga_wooper_cierre: [
      { if: 'flag.cg_carga_t3_cauce', then: [
        'La corriente libera un remanso sin arrastrar lodo nuevo. Wooper mete primero una patita, luego la otra.',
        { say: 'rotom', text: '¡Bzzt! ¡Agua corriendo, Wooper contento! Bueno, todavía nos mira raro, pero eso ya es cosa suya.' }
      ], else: [
        'El encargado recibe la nota, trae una herramienta y retira el tapón vegetal sin entrar al agua. Wooper sigue el movimiento desde su orilla.',
        { say: 'rotom', text: '¡Bzzt! No movimos una sola piedra de más. A veces ayudar es saber a quién llamar.' }
      ] },
      'En la tabla húmeda que apoyaba en el canal hay un resto de etiqueta de la misma clase que viste en Olivo. Su número está incompleto.',
      'La marca no identifica a nadie. Pero da una idea: un envío de prueba puede explicar dónde falla el registro sin acusar todavía a una persona.',
      { set: { 'flag.cg_carga_t3_fin': true } },
      { quest: 'cg_carga_johto', stage: 'prueba' },
      { diary: 'En Caoba, Wooper evitaba un tramo del canal porque el agua se había estancado. Mi entrenador{|a|e} consiguió que volviera a correr sin capturarlo. Encontramos una etiqueta incompleta, pero no es una firma. La siguiente idea será probar cómo se registra una carga de verdad.', cond: 'flag.b01_diario' }
    ],
    cg_carga_caoba_despues: [
      'La corriente se divide en dos canales y vuelve a juntarse unos pasos después.',
      { if: 'flag.cg_carga_t3_cauce', then: ['Wooper cruza el remanso y se queda mirando la rejilla, como vigilando que no vuelva a atascarse.'] },
      { if: 'flag.cg_carga_t3_aviso', then: ['Una señal de madera recuerda que el canal debe revisarse tras las lluvias. Wooper se esconde a su sombra.'] },
      'Una página doblada de la carpeta indica: «Preparar un envío de prueba».'
    ]
  }
};
