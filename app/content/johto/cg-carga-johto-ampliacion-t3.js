// Pokémon Infinite · ampliación incremental T3 (Caoba).
// La acequia: exploración en dos subáreas, medición del agua, pesca de recuperación,
// contraste ambiental y cuidado de Wooper, sin captura obligatoria ni nuevos lugares del mapa.
// Aditivo; NO publicar ni modificar la gira central.
export default {
  npcs: {
    cg_carga_ina_caoba: {
      name: 'Ina', title: 'Cuidadora de las acequias',
      look: { hair: 'bun', hairColor: '#463c36', eyes: '#506b52', outfit: '#56816b',
        outfit2: '#c2a378', skin: 3, acc: 'bandana', mouth: 'smile', bg: '#b5cdc5' }
    }
  },
  items: {
    cg_carga_anilla_canal: {
      name: 'Anilla de control del canal', pocket: 'key',
      desc: 'Una anilla oxidada que sujetaba la placa de aforo de la acequia. No es un precinto de mercancía.',
      read: 'ANILLA DE LA ACEQUIA\n\nInscripción: CONTROL DE CAUDAL — C. Se encontró en una zona de agua detenida, junto a una tabla suelta. No posee número de remesa y no puede identificar una caja ni a quien la movió.\n\nLa lectura del nivel se compara con la tablilla de turnos de Ina.'
    },
    cg_carga_acta_agua: {
      name: 'Hoja de aforo de Caoba', pocket: 'key',
      desc: 'Esquema con los dos cauces, la zona de remanso y las observaciones de Wooper.',
      read: 'CAOBA — HOJA DE AFORO\n\nCauce principal: circula, deja las marcas más bajas en las estacas.\nCauce lateral: parcialmente obstruido, conserva hojas y sedimento fino.\nLa anilla de control pertenece a una placa del canal, NO a la mercancía.\nEl registro de turno se refiere al mantenimiento de la acequia, NO al traslado del envío.\n\nNo hay prueba de vertido de aceite ni de un segundo paquete. Wooper evitaba el remanso. La reparación debe realizarse desde tierra firme y comprobando que el caudal no arrastre sedimentos hacia su refugio.'
    }
  },
  trainers: {
    cg_carga_guardacanal_practica: {
      name: 'Auxiliar del canal', cls: 'Cuidador', ai: 2, reward: 900,
      team: [
        { sp: 'jumpluff', lv: 68 },
        { sp: 'lanturn', lv: 69 }
      ],
      intro: 'Probemos las señales de cuidado. Ningún Pokémon debe acercarse a una compuerta sin que lo veamos.',
      win: 'Buen trabajo. El agua no escucha gritos; nosotros sí podemos escuchar las señales.',
      lose: 'El ensayo puede repetirse. Primero revisa a tu equipo y luego vuelve a intentarlo.'
    }
  },
  locations: {
    cg_carga_ribera_caoba: {
      name: 'Pasarela de las estacas', short: 'Pasarela vieja',
      parent: 'caoba', region: 'johto', kind: 'area',
      bg: { type: 'coast' },
      desc: 'Una pasarela estrecha cruza la acequia vieja. Las tablas están secas en el centro; a los lados hay juncos inclinados y marcas de distintas alturas en las estacas. Un cartel dice: NO MOVER COMPUERTAS SIN VERIFICAR EL CAUDAL. Desde aquí se alcanza el remanso sin entrar al agua.',
      spots: [
        {
          label: 'Estacas de dos niveles', icon: '📏',
          sub: 'Comparar la altura del agua al inicio y al final del remanso',
          cond: '!flag.cg_carga_t3_fin',
          new: '!flag.cg_carga_t3_flotacion', doneIf: 'flag.cg_carga_t3_flotacion',
          talk: [{ script: 'cg_carga_t3_estacas' }]
        },
        {
          label: 'Lodo de la ribera', icon: '🟤',
          sub: 'El sedimento bajo la pasarela no es igual al de la rejilla',
          cond: '!flag.cg_carga_t3_fin',
          new: '!flag.cg_carga_t3_lodo', doneIf: 'flag.cg_carga_t3_lodo',
          talk: [{ script: 'cg_carga_t3_sedimentos' }]
        },
        {
          label: 'Cordeles bajo el puente', icon: '🧵',
          sub: 'Dos cuerdas tienen funciones diferentes',
          cond: 'flag.cg_carga_t3_flotacion && flag.cg_carga_t3_lodo',
          new: '!flag.cg_carga_t3_rastro', doneIf: 'flag.cg_carga_t3_rastro',
          talk: [{ script: 'cg_carga_t3_cordeles' }]
        },
        {
          label: 'Anilla sumergida del aforo', icon: '🎣',
          sub: 'Recupera un objeto de mantenimiento con caña; puedes pedir ayuda',
          cond: 'flag.cg_carga_t3_rastro && !flag.cg_carga_t3_anilla',
          new: 'true', talk: [{ script: 'cg_carga_t3_recuperar' }]
        },
        {
          label: 'Juncal de los Pokémon dragón', icon: '🐉',
          sub: 'Buscar salvajes capturables: Goomy y Sliggoo; tras ayudar a Wooper aparece el raro Sliggoo de Hisui',
          cond: 'flag.cg_carga_t3_inicio',
          action: { explore: 'grass' }
        },
        {
          label: 'Ina: la colonia de la arcilla férrea', icon: '🐚',
          sub: 'Una pista sobre la forma de Hisui después de limpiar el cauce',
          cond: 'flag.cg_carga_t3_fin',
          talk: [{ script: 'cg_carga_t3_colonia_goomy' }]
        },
        {
          label: 'Marca de rescate', icon: '🔵',
          sub: 'Dejar constancia del hallazgo sin sacar conclusiones apresuradas',
          cond: 'flag.cg_carga_t3_anilla',
          talk: [{ script: 'cg_carga_t3_pasarela_despues' }]
        }
      ],
      encounters: {
        grass: [
          // Encuentros salvajes auténticos: captura permitida, no son equipos de entrenadores.
          // La variante de Hisui se desbloquea al reparar el remanso de Wooper.
          { sp: 'goomy', lv: [65, 69], w: 38 },
          { sp: 'sliggoo', lv: [68, 71], w: 14 },
          { sp: 'sliggoohisui', lv: [68, 71], w: 8, cond: 'flag.cg_carga_t3_fin' },
          { sp: 'poliwag', lv: [65, 68], w: 26 },
          { sp: 'barboach', lv: [66, 69], w: 14 }
        ]
      }
    },
    cg_carga_caseta_caoba: {
      name: 'Caseta de aforo de Caoba', short: 'Caseta del canal',
      parent: 'caoba', region: 'johto', kind: 'building',
      bg: { type: 'indoor' },
      desc: 'Una caseta con el techo bajo conserva una mesa de turnos, un panel de canales y dos recipientes para comprobar cuánto tarda en fluir el agua. Un esquema dibuja el cauce principal y el lateral, con flechas que no coinciden con las del registro de transportes.',
      spots: [
        {
          label: 'Ina, cuidadora de la acequia', icon: '👩‍🌾',
          sub: 'Habla con quien mantiene el canal y conoce sus señales',
          new: '!flag.cg_carga_t3_ina',
          doneIf: 'flag.cg_carga_t3_ina',
          talk: [{ script: 'cg_carga_t3_ina' }]
        },
        {
          label: 'Registro de mantenimiento', icon: '📖',
          sub: 'Una firma de mantenimiento no es un recibo de mercancía',
          cond: '!flag.cg_carga_t3_fin',
          new: '!flag.cg_carga_t3_turnos', doneIf: 'flag.cg_carga_t3_turnos',
          talk: [{ script: 'cg_carga_t3_turnos' }]
        },
        {
          label: 'Ensayo de las dos corrientes', icon: '💧',
          sub: 'Haz la prueba con agua limpia, sin tocar las compuertas reales',
          cond: 'flag.cg_carga_t3_flotacion && flag.cg_carga_t3_lodo && flag.cg_carga_t3_turnos && !flag.cg_carga_t3_flujo',
          new: 'true', talk: [{ script: 'cg_carga_t3_ensayo_caudal' }]
        },
        {
          label: 'Simulacro Pokémon de seguridad', icon: '⚔️',
          sub: 'Combate opcional con curación, sin bloquear la ayuda a Wooper',
          cond: '!flag.cg_carga_t3_fin && !flag.cg_carga_t3_simulacro_ganado',
          talk: [{ script: 'cg_carga_t3_simulacro' }]
        },
        {
          label: 'Informe y plan de auxilio', icon: '📋',
          sub: 'Verifica evidencias y deja listo el canal para ayudar a Wooper',
          cond: 'flag.cg_carga_t3_huellas && flag.cg_carga_t3_rejilla && flag.cg_carga_t3_plantas && flag.cg_carga_t3_flotacion && flag.cg_carga_t3_lodo && flag.cg_carga_t3_rastro && flag.cg_carga_t3_anilla && flag.cg_carga_t3_turnos && flag.cg_carga_t3_flujo && !flag.cg_carga_t3_trabajo_hecho',
          new: 'true', talk: [{ script: 'cg_carga_t3_informe' }]
        },
        {
          label: 'Consultar hoja de aforo', icon: '📘',
          sub: 'La versión de los hechos se puede revisar en cualquier momento',
          cond: 'flag.cg_carga_t3_trabajo_hecho',
          talk: [{ script: 'cg_carga_t3_repaso' }]
        }
      ]
    }
  },
  patches: {
    caoba: {
      spots: [
        {
          label: 'Pasarela de las estacas', icon: '🌾',
          sub: 'Sigue el remanso y los niveles de agua a pie',
          cond: 'flag.cg_carga_t3_inicio',
          new: '!flag.cg_carga_t3_anilla',
          action: { go: 'cg_carga_ribera_caoba' }
        },
        {
          label: 'Caseta de aforo', icon: '🏠',
          sub: 'Consulta los turnos y contrasta el movimiento del agua',
          cond: 'flag.cg_carga_t3_inicio',
          new: '!flag.cg_carga_t3_trabajo_hecho',
          action: { go: 'cg_carga_caseta_caoba' }
        }
      ]
    }
  },
  scripts: {
    cg_carga_t3_colonia_goomy: [
      'Tras limpiar el remanso, la arcilla del fondo vuelve a ser visible. Cerca de las estacas, algunos Pokémon pequeños dejan rastros sinuosos entre los juncos.',
      { say: 'cg_carga_ina_caoba', text: 'Los Goomy llevan tiempo en el juncal. También hay Sliggoo. Unos pocos tienen una concha pesada, como si la arcilla férrea se hubiera quedado con ellos: son la forma de Hisui.' },
      { say: 'rotom', text: '¡Bzzt! Son Pokémon salvajes, no el Wooper al que ayudamos. Puedes buscarlos entre los juncos y capturarlos normalmente. Si entrenas a los Sliggoo, cada uno conserva su propia rama evolutiva.' },
      'La búsqueda del juncal puede repetirse. Ningún Goodra es un regalo ni una recompensa obligatoria del caso.'
    ],
    cg_carga_t3_estacas: [
      'La primera estaca tiene tres rayas. La segunda, dos. El agua llega a marcas distintas, aunque entre ambas no hay un desagüe nuevo.',
      { if: '(inParty("lucario") || inParty("riolu"))', then: [
        'Tu Lucario o Riolu se queda quieto en la tabla más estable. Observa el remanso sin entrar al agua, como si esperara a que la corriente dibujara la dirección de los juncos.'
      ] },
      { choice: [
        { text: 'Medir desde las dos estacas sin moverlas', then: [
          'La altura cae junto al cauce principal, pero sube en el lateral. La corriente del canal no desapareció: se acumuló donde algo la está frenando.',
          { set: { 'flag.cg_carga_t3_flotacion': true } },
          'Anotas las alturas en una hoja de campo. No es una prueba de vertido ni de mercancías perdidas.'
        ] },
        { text: 'Usar solo la estaca más alta', then: [
          'Una marca indica cuánto subió el agua en un lugar, no si fluye de un lado al otro.',
          { say: 'rotom', text: '¡Bzzt! Dos puntos hacen una comparación. Uno solo hace una foto incompleta.' }
        ] },
        { text: 'Pedir a un Pokémon que entre a medir', then: [
          'Las tablas son suficientemente seguras para una persona. No hace falta exponer a ningún Pokémon a una corriente que aún desconocemos.'
        ] }
      ] }
    ],
    cg_carga_t3_sedimentos: [
      'Sobre la pasarela hay una bandeja limpia. Debajo, la corriente dejó barro claro junto a los juncos y barro oscuro bajo la rejilla.',
      { choice: [
        { text: 'Comparar el sedimento sin mezclar las muestras', then: [
          'El barro claro viene de la ladera. El oscuro contiene hojas retenidas en el remanso. Ninguno muestra una película de aceite sobre el agua.',
          { set: { 'flag.cg_carga_t3_lodo': true } },
          'Dos muestras explican por qué una parte parece más turbia, pero todavía no identifican un paquete.'
        ] },
        { text: 'Revolver el barro para ver qué hay debajo', then: [
          'El agua se enturbia antes de que encuentres nada. Wooper se esconde detrás de un junco.',
          { say: 'rotom', text: '¡Una muestra revuelta ya no dice de dónde vino cada cosa! Mejor comparar los bordes.' }
        ] },
        { text: 'Declarar que el barro oscuro es un químico', then: [
          'No hay olor ni película iridiscente. Ser oscuro no demuestra contaminación química.'
        ] }
      ] }
    ],
    cg_carga_t3_cordeles: [
      'Bajo el puente hay dos cuerdas: una sostiene una tablilla de nivel, la otra ata una tabla suelta. Las dos se parecen a las de Olivo, pero sus nudos son de mantenimiento.',
      { say: 'cg_carga_ina_caoba', text: 'Cada cual tiene su trabajo. Si le quitas la cuerda a una señal, alguien puede creer que el agua bajó cuando solamente cayó la tablilla.' },
      { choice: [
        { text: 'Seguir cada cuerda hasta el objeto que sujeta', then: [
          'Una cuerda vuelve a la tablilla. La otra termina en una anilla de metal que cayó al remanso. Ninguna está atada a la caja investigada.',
          { set: { 'flag.cg_carga_t3_rastro': true } },
          'El nudo y la anilla explican la huella recta de la tabla, pero no las firmas de la remesa.'
        ] },
        { text: 'Cortar ambas para recuperar la madera', then: [
          'Cortar la cuerda de nivel dejaría el cauce sin referencia. Ina te detiene antes de tocarla.',
          { say: 'cg_carga_ina_caoba', text: 'Las señales son parte del cuidado del canal. Hay que distinguirlas antes de retirarlas.' }
        ] },
        { text: 'Decir que la cuerda salió del envío de Trigal', then: [
          'El cáñamo es común. No hay una marca individual que relacione estas cuerdas con un vagón.',
          { say: 'rotom', text: '¡Bzzt! Parecido no significa idéntico. Ya aprendimos eso con los sellos.' }
        ] }
      ] }
    ],
    cg_carga_t3_recuperar: [
      'Una anilla de control brilla bajo unos centímetros de agua. La piedra que la sujetaba se soltó con la lluvia.',
      { say: 'cg_carga_ina_caoba', text: 'Tengo una caña de rescate con un gancho romo. No hacemos daño a los Pokémon ni nos metemos al canal. Puedes intentar sacarla, o puedo traer la pértiga larga del almacén.' },
      { choice: [
        { text: 'Usar la caña de rescate desde la pasarela', then: [
          { minigame: {
            type: 'fish', id: 'cg_carga_t3_anilla_rescate', title: 'Rescate de la anilla',
            hint: 'Mantén la tensión del sedal dentro de la zona segura. Lo que buscas es una anilla, no un Pokémon.',
            theme: 'rio', level: 2, wildChance: 0,
            picks: 0, guaranteed: ['cg_carga_anilla_canal'],
            consolation: false, lootTitle: 'Pieza recuperada'
          },
          onWin: [
            { set: { 'flag.cg_carga_t3_anilla': true, 'flag.cg_carga_t3_pesca': true } },
            'El gancho levanta una anilla de mantenimiento. Tiene una letra C y ninguna referencia a una remesa de transporte.',
            { say: 'cg_carga_ina_caoba', text: '¡Eso! El nivel de la acequia tenía una placa suelta. Puedes llevar una copia de la pieza para comparar la inscripción.' }
          ],
          onLose: [
            'La anilla resbala del gancho y vuelve a quedar sobre el fondo, a la vista. No se pierde nada.',
            { say: 'cg_carga_ina_caoba', text: 'Podemos intentarlo con calma o usar mi pértiga. Nadie tiene que saltar por una pieza de metal.' }
          ],
          onQuit: [
            { say: 'rotom', text: '¡Bzzt! El gancho queda sobre la pasarela. Si quieres, repetimos después.' }
          ] }
        ] },
        { text: 'Solicitar la pértiga de Ina (sin minijuego)', then: [
          { say: 'cg_carga_ina_caoba', text: 'Buena elección si no te fías del gancho. El trabajo consiste en recuperar la pieza, no en competir con el agua.' },
          { if: '!flag.cg_carga_t3_anilla', then: [
            { give: 'cg_carga_anilla_canal' },
            { set: { 'flag.cg_carga_t3_anilla': true, 'flag.cg_carga_t3_perdiga': true } }
          ] },
          'Ina rescata la anilla sin tocar el cauce y copia la inscripción. La letra C corresponde al control de la acequia, no a un nombre.'
        ] },
        { text: 'Dejar la anilla para después', then: [
          'La anilla sigue visible. Wooper se aleja de la sombra de la pasarela y vuelve a su rincón.'
        ] }
      ] }
    ],
    cg_carga_t3_pasarela_despues: [
      'La tablilla del nivel está asegurada. Ahora se distinguen la marca del canal y la de la cuerda de mantenimiento.',
      { if: 'flag.cg_carga_t3_pesca', then: [
        { say: 'cg_carga_ina_caoba', text: 'No olvido una mano firme. Gracias por sacar la anilla sin meterte al agua.' }
      ], else: [
        { say: 'cg_carga_ina_caoba', text: 'La pértiga funcionó. El canal agradece el cuidado, no el lucimiento.' }
      ] },
      'Queda cotejar estas marcas con las anotaciones de la caseta de aforo.'
    ],
    cg_carga_t3_ina: [
      'Ina se limpia las botas en un tapete de estopa y aparta un vaso de agua de un montón de papeles.',
      { say: 'cg_carga_ina_caoba', text: 'Ayer vinieron preguntando por una caja. Y por el nombre que figuraba en una hoja. Aquí no recibimos cajas: recibimos agua y órdenes de mantenimiento.' },
      { choice: [
        { text: 'Preguntar quién atiende a Wooper cuando cambia el caudal', then: [
          { say: 'cg_carga_ina_caoba', text: 'Primero se comprueba dónde queda el remanso. Luego se actúa desde la orilla, sin arrastrar barro hacia su refugio. Que el agua vuelva no significa que se pueda abrir todo de golpe.' },
          { set: { 'flag.cg_carga_t3_ina': true, 'flag.cg_carga_t3_cuidado': true } },
          'Ina coloca el plano del cauce sobre la mesa para que puedas consultarlo.'
        ] },
        { text: 'Preguntar si vio pasar la caja de Olivo', then: [
          { say: 'cg_carga_ina_caoba', text: 'No la vi. Sí vi una tabla de nivel caída y un remanso que antes no estaba. No puedo asegurar algo que ocurrió lejos de mi turno.' },
          { set: { 'flag.cg_carga_t3_ina': true } },
          'Es una respuesta menos espectacular, pero deja claro lo que se sabe de la acequia.'
        ] },
        { text: 'Pedir que abra de golpe la compuerta', then: [
          { say: 'cg_carga_ina_caoba', text: 'Con Wooper allí y el barro suelto, no. Una corriente violenta puede ser peor que un remanso lento. Primero medimos.' }
        ] }
      ] }
    ],
    cg_carga_t3_turnos: [
      'El libro se titula «Turnos de aforo». Una línea dice «revisar anilla de control C». Otra, «abrir compuerta lateral después de limpiar rejilla».',
      { choice: [
        { text: 'Comparar las tareas con sus casillas de firma', then: [
          'La firma de la primera línea confirma que alguien revisó una señal. No dice que haya recibido un bulto; la segunda instrucción sigue pendiente de inspección.',
          { set: { 'flag.cg_carga_t3_turnos': true } },
          'Registras la diferencia entre revisar una señal, limpiar la rejilla y abrir un cauce.'
        ] },
        { text: 'Dar por realizada la apertura porque el turno está firmado', then: [
          'La casilla está junto a «revisar anilla», no junto a «abrir compuerta». Son dos tareas diferentes.',
          { say: 'rotom', text: '¡Bzzt! La posición de una firma importa incluso aquí, lejos de los vagones.' }
        ] },
        { text: 'Buscar números de remesa bajo los renglones', then: [
          'Solo hay medidas de agua y turnos. El libro no contiene nombres de empresas ni números de vagón.'
        ] }
      ] }
    ],
    cg_carga_t3_ensayo_caudal: [
      'Ina prepara dos recipientes idénticos y dos canales de demostración. No conectan con la corriente real: puedes comprobar las hipótesis sin poner en riesgo a Wooper.',
      { say: 'cg_carga_ina_caoba', text: 'Una corriente muy rápida arrastra barro. Una que no se mueve deja el remanso igual. La prueba consiste en elegir qué cambio tiene sentido después de retirar las ramas.' },
      { choice: [
        { text: 'Abrir ambos canales por completo', then: [
          'Los dos recipientes reciben agua de golpe. El canal lateral arrastra sedimento que no habías previsto.',
          'Ina cierra el modelo. «Eso levantaría barro cerca del refugio. La velocidad también es una condición».'
        ] },
        { text: 'Despejar la obstrucción y comprobar la corriente de manera gradual', then: [
          'El agua pasa por la vía principal y luego por la lateral. La diferencia de nivel disminuye sin llevarse el sedimento al otro extremo.',
          { set: { 'flag.cg_carga_t3_flujo': true } },
          { say: 'cg_carga_ina_caoba', text: 'Ése es el procedimiento: medir, despejar y volver a medir. Ya podemos decidir cómo ayudar sin improvisar.' }
        ] },
        { text: 'Dejar bloqueada la vía lateral para evitar cualquier cambio', then: [
          'La diferencia de nivel persiste y el agua sigue estancada. Evitar toda acción tampoco resuelve lo que le pasa a Wooper.'
        ] }
      ] }
    ],
    cg_carga_t3_simulacro: [
      'Un auxiliar repasa con su equipo Pokémon señales de alto, avance y retirada para los trabajos junto al agua.',
      { say: 'cg_carga_ina_caoba', text: 'Puedes hacer una práctica de coordinación. No necesitas ganar para ayudar al Wooper ni para completar el informe.' },
      { choice: [
        { text: 'Aceptar la práctica Pokémon (curación previa)', then: [
          { heal: true },
          { battle: 'cg_carga_guardacanal_practica', lose: 'continue',
            onWin: [
              { set: { 'flag.cg_carga_t3_simulacro_ganado': true } },
              'El auxiliar baja la mano: fin de la maniobra, todos los Pokémon fuera del canal.',
              { say: 'cg_carga_ina_caoba', text: 'Ganaste sin olvidar la seguridad. Ahora sí podemos revisar la zona con calma.' }
            ],
            onLose: [
              'El auxiliar detiene el ensayo y te acompaña a revisar la formación.',
              { heal: true },
              { say: 'cg_carga_ina_caoba', text: 'Una derrota en un ensayo no pierde una vida ni una prueba. Si quieres, repítelo luego.' }
            ]
          }
        ] },
        { text: 'Observar las señales sin combatir', then: [
          'El Jumpluff del auxiliar flota como indicador de viento; Lanturn ilumina la orilla. Ninguno entra a una zona que todavía no fue señalizada.',
          'Aprendes que la primera señal significa preparar, no abrir la compuerta.'
        ] },
        { text: 'Regresar al registro', then: [
          'La práctica continúa sin ti. Ina vuelve a colocar el vaso lejos de los libros.'
        ] }
      ] }
    ],
    cg_carga_t3_informe: [
      'El plano de la acequia tiene dos cauces, una rejilla y el refugio de Wooper. Al lado hay las anotaciones del libro de turnos y la anilla encontrada bajo la pasarela.',
      { say: 'rotom', text: '¡Bzzt! Tenemos huellas, barro, niveles y un registro. Ahora toca distinguir lo que pertenece al canal de lo que pertenece a la carga.' },
      { choice: [
        { text: 'La anilla demuestra que la caja cayó al río', then: [
          'La anilla está rotulada como pieza de control del agua. No tiene el número de remesa y nadie la vio unida a una caja.'
        ] },
        { text: 'Hubo un remanso por obstrucción; la firma del libro era de mantenimiento', then: [
          'La marca de nivel, los sedimentos y la prueba de los dos recipientes coinciden en que la corriente lateral estaba obstruida.',
          'El libro registra una señal de mantenimiento. El hilo junto a la rejilla no identifica un envío. Ambas preguntas deben seguir separadas.',
          { if: '!flag.cg_carga_t3_trabajo_hecho', then: [
            { give: 'cg_carga_acta_agua' },
            { set: { 'flag.cg_carga_t3_trabajo_hecho': true } },
            { diary: 'En Caoba medimos las dos corrientes sin acercar a Wooper al peligro. La anilla rescatada era del canal, no del envío; la firma en el libro correspondía a la revisión de una señal. La prueba con recipientes mostró por qué debemos despejar la rejilla poco a poco. Todavía falta ayudar al Pokémon, sin convertir una sospecha en una acusación.', cond: 'flag.b01_diario' }
          ] },
          { say: 'cg_carga_ina_caoba', text: 'Tu informe no culpa a nadie. Explica un problema que sí podemos atender. Voy contigo hasta la orilla.' },
          'Vuelve al refugio de Wooper. Ya puedes despejar desde tierra firme o pedir que Ina haga el trabajo.'
        ] },
        { text: 'Las marcas del cauce son prueba de un vertido químico', then: [
          'No hay análisis químico ni película visible de aceite. Las mediciones solo respaldan una obstrucción con sedimento.',
          { say: 'cg_carga_ina_caoba', text: 'Si hay que medir otra cosa, pediremos un análisis. No lo inventaremos para cerrar una carpeta.' }
        ] }
      ] }
    ],
    cg_carga_t3_repaso: [
      'El esquema conserva cuatro marcas: caudal principal, remanso, placa C y refugio de Wooper.',
      { read: 'cg_carga_acta_agua' },
      { if: '!flag.cg_carga_t3_fin', then: [
        { say: 'cg_carga_ina_caoba', text: 'La próxima decisión es en la orilla. Wooper aún necesita que retiremos la obstrucción o pidamos ayuda.' }
      ], else: [
        { say: 'cg_carga_ina_caoba', text: 'El agua volvió sin que nadie tuviera que entrar. El informe conserva lo que observamos y lo que no pudimos comprobar.' }
      ] }
    ]
  }
};