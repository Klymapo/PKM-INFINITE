// Pokémon Infinite · ampliación incremental T1: el anexo del patio de Trigal.
// Rama de propuesta. Todas las banderas y NPCs son nuevos (cg_carga_*).
// Objetivo: sustituir un tramo de inspecciones lineales por exploración, rejilla, entrevistas y práctica opcional.
// No altera los flags b01–b07, ni regiones, medallas, ni la trama principal.
export default {
  npcs: {
    cg_carga_mara: {
      name: 'Mara',
      title: 'Aprendiz del patio de carga',
      look: { hair: 'short', hairColor: '#382b25', eyes: '#69523a', outfit: '#9b6343',
        outfit2: '#e6c58f', skin: 2, acc: 'freckles', mouth: 'flat', bg: '#d9bc8d' }
    }
  },
  trainers: {
    cg_carga_practica_trigal: {
      name: 'Ayudante del patio', cls: 'Trabajador', ai: 2, reward: 1000,
      team: [
        { sp: 'magneton', lv: 67 },
        { sp: 'machoke', lv: 68 }
      ],
      intro: 'Una práctica breve. Si pierdes, no pasa nada. Los vagones no se van a mover.',
      win: 'Buena coordinación. En un patio de carga, todos deben saber cuándo detenerse.',
      lose: 'La seguridad no se demuestra ganando. ¿Revisamos ahora los topes del carril?'
    }
  },
  locations: {
    cg_carga_anexo_trigal: {
      name: 'Anexo del patio de Trigal', short: 'Anexo de mercancías',
      parent: 'trigal', region: 'johto', kind: 'building',
      bg: { type: 'indoor' },
      desc: 'Un almacén estrecho se esconde detrás del patio. Tiene una vía de servicio, un pupitre de aprendiz y un pequeño panel de agujas. No hay un tren nuevo: solo se conserva la maqueta que usan para explicar cómo se mueven los bultos entre dos andenes.',
      spots: [
        {
          label: 'Tablero de asignación de vagones', icon: '🚃',
          sub: 'Tres vagones, pero solamente dos movimientos firmados',
          new: '!flag.cg_carga_t1_anexo_vagones',
          doneIf: 'flag.cg_carga_t1_anexo_vagones',
          talk: [{ script: 'cg_carga_t1_anexo_vagones' }]
        },
        {
          label: 'Huellas de ruedas y marcas de tiza', icon: '🛞',
          sub: 'Una carga parece haber cambiado de carril sin haber salido de Trigal',
          new: '!flag.cg_carga_t1_anexo_ruedas',
          doneIf: 'flag.cg_carga_t1_anexo_ruedas',
          talk: [{ script: 'cg_carga_t1_anexo_ruedas' }]
        },
        {
          label: 'Mara, la aprendiz de inventarios', icon: '🧑‍🔧',
          sub: 'Tiene un pañuelo lleno de números escritos para no olvidarlos',
          new: '!flag.cg_carga_t1_anexo_testimonio',
          doneIf: 'flag.cg_carga_t1_anexo_testimonio',
          talk: [{ script: 'cg_carga_t1_anexo_mara' }]
        },
        {
          label: 'Maqueta de desvíos', icon: '🧩',
          sub: 'Mueve la pieza al sensor para abrir la puerta del archivo de servicio',
          cond: 'flag.cg_carga_t1_anexo_vagones && flag.cg_carga_t1_anexo_ruedas && !flag.cg_carga_t1_anexo_panel',
          new: 'true',
          talk: [{ script: 'cg_carga_t1_anexo_puzzle' }]
        },
        {
          label: 'Archivo del desvío', icon: '📁',
          sub: 'La puerta del archivo quedó libre tras reparar la maqueta',
          cond: 'flag.cg_carga_t1_anexo_panel',
          new: '!flag.cg_carga_t1_anexo_archivo',
          doneIf: 'flag.cg_carga_t1_anexo_archivo',
          talk: [{ script: 'cg_carga_t1_anexo_archivo' }]
        },
        {
          label: 'Ensayo de coordinación Pokémon', icon: '⚔️',
          sub: 'Combate amistoso, curación previa y salida sin consecuencias',
          cond: '!flag.cg_carga_t1_fin && !flag.cg_carga_t1_anexo_practica_ganada',
          talk: [{ script: 'cg_carga_t1_anexo_practica' }]
        },
        {
          label: 'Mesa de la ruta real', icon: '📋',
          sub: 'Reconstruye con pruebas los movimientos dentro de Trigal',
          cond: 'flag.cg_carga_t1_anexo_vagones && flag.cg_carga_t1_anexo_ruedas && flag.cg_carga_t1_anexo_testimonio && flag.cg_carga_t1_anexo_archivo && !flag.cg_carga_t1_ruta_hecha',
          new: 'true', talk: [{ script: 'cg_carga_t1_anexo_cotejo' }]
        },
        {
          label: 'Ver el esquema de la ruta', icon: '🗺️',
          sub: 'Vuelve a leer la conclusión sin repetir el trabajo',
          cond: 'flag.cg_carga_t1_ruta_hecha',
          talk: [{ script: 'cg_carga_t1_anexo_resumen' }]
        }
      ]
    }
  },
  patches: {
    trigal: {
      spots: [
        {
          label: 'Anexo del patio de carga', icon: '🏚️',
          sub: 'Investiga las vías de servicio antes de cerrar la cronología',
          cond: 'flag.cg_carga_t1_inicio',
          new: 'flag.cg_carga_t1_inicio && !flag.cg_carga_t1_ruta_hecha',
          action: { go: 'cg_carga_anexo_trigal' }
        }
      ]
    }
  },
  scripts: {
    cg_carga_t1_anexo_vagones: [
      'Una tabla de madera separa tres vagones: uno marcado 16, otro 18 y un tercero sin pintura. Un papel advierte que el número de un vagón NO es el de la remesa que lleva.',
      { say: 'cg_carga_mara', text: 'La mayoría de visitantes ve dos firmas y cree que son dos cajas. Yo me aprendí el tablero de memoria. Porque alguien tenía que hacerlo.' },
      { choice: [
        { text: 'Ordenar por número de vagón', then: [
          '16, 18 y una casilla sin número forman una serie incompleta. Pero una serie no muestra qué vagón transportó la remesa.',
          { say: 'rotom', text: '¡Bzzt! ¡Números de vagón, números de remesa y números de operación! ¡Son tres listas distintas!' }
        ] },
        { text: 'Comparar el registro de maniobras y el de salidas', then: [
          'El vagón 16 recibió el cajón durante una prueba de frenado; después lo cedió al 18, que salió con el convoy. Solo el movimiento del 18 figura como salida de Trigal.',
          'El libro de maniobras registra dos acciones dentro del patio. El de salidas, una. Ambas cifras pueden ser correctas.',
          { if: '!flag.cg_carga_t1_anexo_vagones', then: [
            { set: { 'flag.cg_carga_t1_anexo_vagones': true } },
            { say: 'cg_carga_mara', text: 'Eso. El 16 no salió. Pero lo que dejó escrito sí viajó hasta el siguiente turno.' }
          ] }
        ] },
        { text: 'Leer las tachaduras de la tercera casilla', then: [
          'El tercer vagón lleva semanas en mantenimiento y no estuvo disponible aquel día.',
          'Una mancha de tiza recuerda el número 18. Es una pista para buscar, no una prueba de que el vagón 18 haya salido dos veces.'
        ] }
      ] }
    ],
    cg_carga_t1_anexo_ruedas: [
      'Las piedras del suelo conservan dos surcos. Uno termina en el tope de una vía muerta; el otro pasa junto a la puerta lateral del almacén.',
      'Una línea de tiza azul atraviesa ambos carriles. La lluvia borró una parte, pero dejó intacta la línea bajo el techo.',
      { choice: [
        { text: 'Seguir el surco hasta el tope del carril', then: [
          'El surco acaba junto a una señal de «revisión». No lleva a la estación principal. Una carreta pudo detenerse aquí sin figurar como llegada al destino.',
          { set: { 'flag.cg_carga_t1_anexo_ruedas': true } },
          'Anotas el tope del carril y la ausencia de salida hacia la calle.'
        ] },
        { text: 'Relacionar los surcos con la marca de tiza', then: [
          'La tiza se aplicó cuando ambos carriles estaban secos. Una de las ruedas la rozó después. El cajón cambió de vía cuando la marca ya estaba hecha.',
          { set: { 'flag.cg_carga_t1_anexo_ruedas': true } },
          'Apuntas la secuencia: marca de seguridad, traslado interno, salida posterior.'
        ] },
        { text: 'Suponer que la lluvia borró la prueba del robo', then: [
          'No hay un rastro hacia el exterior. La lluvia explica una zona sin tiza, pero no permite deducir un robo.',
          { say: 'rotom', text: '¡No podemos acusar a las nubes de complicidad!' }
        ] }
      ] }
    ],
    cg_carga_t1_anexo_mara: [
      'Mara dibuja un número 18 en su pañuelo. Lo tacha, lo vuelve a escribir y lo guarda antes de que puedas mirar.',
      { say: 'cg_carga_mara', text: 'Me encargaron avisar cuando una rueda tocara el tope. Lo hice. Luego el supervisor anotó dos movimientos. Los demás creyeron que había duplicado el envío.' },
      { choice: [
        { text: 'Preguntarle qué vio, sin señalar culpables', then: [
          { say: 'cg_carga_mara', text: 'Vi una sola caja. Primero en el vagón 16, después en el 18. Yo moví el tope de la maqueta para explicar el cambio y se quedó atascado. Aún está ahí.' },
          { set: { 'flag.cg_carga_t1_anexo_testimonio': true, 'flag.cg_carga_t1_anexo_escuchada': true } },
          'Mara dibuja una flecha entre ambos vagones: es su recuerdo, separado de las notas oficiales.'
        ] },
        { text: 'Pedirle las horas sin mirar sus apuntes', then: [
          { say: 'cg_carga_mara', text: 'No las recuerdo. Tenía guantes, se me cayó el reloj y alguien me gritó que la máquina estaba frenada. Puedo decir el orden, no los minutos.' },
          'Un testimonio que reconoce sus límites suele ser más útil que uno lleno de detalles inventados.',
          { set: { 'flag.cg_carga_t1_anexo_testimonio': true } }
        ] },
        { text: 'Decirle que fue responsable de la irregularidad', then: [
          { say: 'cg_carga_mara', text: 'Entonces ya decidiste antes de preguntarme. No sé qué quieres que te diga.' },
          { say: 'rotom', text: '¡Bzzt! Hay una diferencia entre registrar un movimiento y registrar mal un movimiento. Vuelve a preguntarle qué vio.' }
        ] }
      ] }
    ],
    cg_carga_t1_anexo_puzzle: [
      'La maqueta de un ramal está detenida. Un sensor al final de una vía abre el pequeño archivo de servicio. La pieza móvil quedó atravesada antes del sensor.',
      { say: 'cg_carga_mara', text: 'Es para enseñar a cambiar cargas sin confundir un desvío interno con una salida. Si empujas la pieza hasta el sensor, la puerta se abre. Si te atoras, puedes deshacer.' },
      { puzzle: {
        id: 'cg_carga_t1_maqueta_desvio',
        title: 'El desvío de Trigal',
        hint: 'Empuja la pieza R hasta el sensor S. Luego cruza la puerta D y llega a G. Deshacer no pierde el progreso.',
        theme: 'lab',
        grid: [
          '#######',
          '#P....#',
          '#.R.S.#',
          '#.....#',
          '#...D.#',
          '#....G#',
          '#######'
        ]
      },
      onSolve: [
        { set: { 'flag.cg_carga_t1_anexo_panel': true } },
        'La pieza alcanza el sensor. Una lengüeta de metal se aparta, dejando a la vista la carpeta del archivo.',
        { say: 'cg_carga_mara', text: 'Así. ¡Y no era falta de fuerza! Había que mirar desde qué lado podía moverse la pieza sin bloquear la salida.' }
      ],
      onQuit: [
        { say: 'rotom', text: '¡Bzzt! Dejamos el mecanismo intacto. Podemos volver a probarlo sin perder ni una hoja.' }
      ] }
    ],
    cg_carga_t1_anexo_archivo: [
      'La hoja del archivo está doblada como un acordeón y lleva dos sellos de mantenimiento. No menciona un envío recibido en Olivo.',
      { choice: [
        { text: 'Cotejar el parte de maniobra con el de salida', then: [
          'En la primera columna dice «traspaso de vagón 16 a vagón 18». En la segunda, «salida del vagón 18». Dos operaciones distintas, una sola remesa.',
          { set: { 'flag.cg_carga_t1_anexo_archivo': true } },
          'Al guardar la copia de la hoja, comprendes por qué la pizarra del patio parecía tener un envío de más.'
        ] },
        { text: 'Buscar un nombre para responsabilizar a alguien', then: [
          'La casilla de responsable corresponde al mantenimiento de la vía, no a la mercancía. Usarla para acusar a alguien sería confundir otra vez dos registros.',
          'Primero habrá que comparar el parte con el libro de salidas.'
        ] }
      ] }
    ],
    cg_carga_t1_anexo_practica: [
      'Un ayudante ensaya con su equipo Pokémon cómo detener una carreta antes de la vía muerta. No ofrece mercancías ni un trofeo: solo una práctica de coordinación.',
      { choice: [
        { text: 'Hacer el combate amistoso (te curan antes)', cond: '!flag.cg_carga_t1_anexo_practica_ganada', then: [
          { heal: true },
          { battle: 'cg_carga_practica_trigal', lose: 'continue',
            onWin: [
              { set: { 'flag.cg_carga_t1_anexo_practica_ganada': true } },
              'El ayudante levanta la mano para indicar que la vía está libre.',
              { say: 'cg_carga_mara', text: 'Muy bien. Sin señales claras, hasta una victoria puede acabar en accidente. El tope no se retira hasta que todos sepan qué vagón se está moviendo.' }
            ],
            onLose: [
              'El ayudante ayuda a recomponer la formación y te entrega agua para el equipo.',
              { heal: true },
              { say: 'cg_carga_mara', text: 'Se puede ensayar otra vez. Aquí lo importante no es ganar, sino no mover el vagón equivocado.' }
            ]
          }
        ] },
        { text: 'Observar la maniobra sin combatir', then: [
          'El Magneton del ayudante mantiene una señal fija mientras Machoke asegura el carro. Ninguno lo mueve hasta recibir la segunda señal.',
          'Es un recordatorio útil: una señal de preparación no es una orden de salida.'
        ] },
        { text: 'Volver a la investigación', then: [
          'El ayudante asiente y sigue con la práctica. No hace falta ganar un combate para leer los registros.'
        ] }
      ] }
    ],
    cg_carga_t1_anexo_cotejo: [
      'Colocas sobre la mesa el tablero, el dibujo de las ruedas, la versión de Mara y el parte de servicio.',
      { say: 'rotom', text: '¡Bzzt! Tenemos cuatro piezas distintas. Una persona puede recordar mal un minuto, pero el dibujo del carril y el libro no tienen por qué mentirle juntos.' },
      { choice: [
        { text: 'Dos vagones significan dos envíos', then: [
          'El parte de servicio habla de cambiar el mismo cajón del 16 al 18. Necesitarías una segunda caja para sostener dos envíos.',
          'Mara respira hondo. No quieres convertir su silencio en una prueba.'
        ] },
        { text: 'La remesa cambió de vagón dentro del patio; solo el 18 salió', then: [
          'El libro de maniobras, las marcas en el suelo y la nota del archivo coinciden: el 16 participó en un movimiento interno, no en una salida.',
          { if: '!flag.cg_carga_t1_ruta_hecha', then: [
            { set: { 'flag.cg_carga_t1_ruta_hecha': true } },
            { diary: 'En el anexo del patio de Trigal reconstruimos un desvío que parecía otra entrega. Había dos vagones, pero no dos envíos. Mara recordó el orden y el libro de servicio permitió comprobarlo, sin confundir una sospecha con una prueba.', cond: 'flag.b01_diario' },
            { say: 'cg_carga_mara', text: 'Gracias por no decidir que yo había hecho algo antes de preguntarme. Si quieres, puedo acompañarte hasta la pizarra.' }
          ] },
          'La pizarra principal ya puede ordenar preparación, maniobra, despacho y salida.'
        ] },
        { text: 'El testimonio es suficiente para acusar al encargado', then: [
          'El testimonio explica qué vio Mara. No prueba quién cometió un error al copiar los folios de Olivo.',
          { say: 'rotom', text: '¡Una voz no es una sentencia! ¿Qué dicen los cuatro registros juntos?' }
        ] }
      ] }
    ],
    cg_carga_t1_anexo_resumen: [
      'El tablero queda con una flecha entre vagón 16 y vagón 18, y un círculo alrededor de una sola salida.',
      { if: 'flag.cg_carga_t1_anexo_escuchada', then: [
        { say: 'cg_carga_mara', text: 'Todavía recuerdo que preguntaste antes de sacar conclusiones. Gracias.' }
      ], else: [
        { say: 'cg_carga_mara', text: 'Ya no tengo que repetir los números hasta quedarme sin voz. Están escritos en el lugar correcto.' }
      ] },
      'Si la investigación continúa, el siguiente paso es el tablón de reconstrucción del patio principal.'
    ]
  }
};
