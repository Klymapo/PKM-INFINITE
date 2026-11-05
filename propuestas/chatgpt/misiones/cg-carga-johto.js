// Pokémon Infinite · propuesta aislada de historia paralela en Johto.
// La carga que nadie firmó. T0 (Olivo) + T1 (Trigal).
// Propuesta para Elio: NO integrar ni publicar antes de escribir T2–T7 y auditar.
// Ids nuevos: cg_carga_*. Solo parches aditivos; no afecta los flags principales.
// IMPORTANTE: revisión de duración pendiente. "est" expresa objetivo, no medición.
export default {
  items: {
    cg_carga_carpeta: {
      name: 'Carpeta de carga de Johto', pocket: 'key',
      desc: 'Copias de varias hojas logísticas cuya cronología no cuadra.',
      read: 'CARPETA DE REVISIÓN — J O H T O\n\nHoja A: la recepción de Olivo está fechada antes que la salida.\nHoja B: el precinto está intacto, pero la masa anotada difiere.\nHoja C: el registro de entrada tiene dos letras distintas.\n\nNota del margen: una hora de firma no equivale a una hora de movimiento.'
    }
  },
  quests: {
    cg_carga_johto: {
      name: 'La carga que nadie firmó',
      type: 'side', est: 450,
      parts: {
        title: 'Tres pruebas iniciales del envío',
        items: [
          { label: 'Etiqueta y horas', where: 'olivo', done: 'flag.cg_carga_t0_papel', hint: 'Revisa la etiqueta en Olivo y distingue la hora impresa de la firma.' },
          { label: 'Peso del embalaje', where: 'olivo', done: 'flag.cg_carga_t0_masa', hint: 'Revisa la báscula del almacén de Olivo.' },
          { label: 'Libro de entrada', where: 'olivo', done: 'flag.cg_carga_t0_libro', hint: 'Compara los asientos del libro en Olivo.' }
        ]
      },
      stages: {
        olivo: 'En **Olivo**, revisa tres pruebas del envío junto al almacén del faro.',
        deduccion: 'En **Olivo**, compara las tres pruebas en la mesa de revisión.',
        trigal: 'Ve al **patio de carga de Trigal**. Revisa horario, conductor y precintos.',
        orden: 'En **Trigal**, reconstruye el orden de los envíos en el tablón.',
        iris: 'En **Iris**, escucha a los tres guías y compara sus testimonios.',
        caoba: 'En **Caoba**, examina el canal y ayuda a un Wooper antes de seguir la carga.',
        prueba: 'En **Caoba**, prepara el envío de prueba y verifica peso, sello y horarios.',
        turno: 'En **Olivo**, revisa el segundo turno del almacén y escucha al encargado.',
        recibo: 'En **Olivo**, coteja las pruebas y decide cómo corregir el registro.',
        entrega: 'Obtén los acuses de **Trigal**, **Iris** y **Caoba** y cierra la carpeta en **Olivo**.',
        hecha: 'El registro quedó corregido y la entrega llegó a su destino.'
      }
    }
  },
  patches: {
    olivo: {
      spots: [
        {
          label: 'Yasmina y el registro de carga',
          sub: 'Una caja está donde nadie recuerda haberla dejado',
          icon: '📦', cond: '!flag.cg_carga_t0_fin',
          new: '!flag.cg_carga_inicio || (flag.cg_carga_t0_papel && flag.cg_carga_t0_masa && flag.cg_carga_t0_libro)',
          talk: [
            { cond: '!flag.cg_carga_inicio', script: 'cg_carga_inicio' },
            { cond: 'flag.cg_carga_t0_papel && flag.cg_carga_t0_masa && flag.cg_carga_t0_libro', script: 'cg_carga_inferencia' },
            { script: 'cg_carga_yasmina_espera' }
          ]
        },
        {
          label: 'Etiqueta de envío',
          sub: 'Un papel que no parece del mismo día',
          icon: '🏷️', cond: 'flag.cg_carga_inicio && !flag.cg_carga_t0_fin',
          new: '!flag.cg_carga_t0_papel',
          doneIf: 'flag.cg_carga_t0_papel', talk: [{ script: 'cg_carga_etiqueta' }]
        },
        {
          label: 'Báscula del almacén',
          sub: 'El peso está anotado en dos lugares distintos',
          icon: '⚖️', cond: 'flag.cg_carga_inicio && !flag.cg_carga_t0_fin',
          new: '!flag.cg_carga_t0_masa',
          doneIf: 'flag.cg_carga_t0_masa', talk: [{ script: 'cg_carga_bascula' }]
        },
        {
          label: 'Libro de entrada',
          sub: 'Páginas sujetas con una cuerda azul',
          icon: '📘', cond: 'flag.cg_carga_inicio && !flag.cg_carga_t0_fin',
          new: '!flag.cg_carga_t0_libro',
          doneIf: 'flag.cg_carga_t0_libro', talk: [{ script: 'cg_carga_libro' }]
        },
        {
          label: 'Cuaderno de seguimiento',
          sub: 'La investigación continúa, sin interferir con la gira',
          icon: '🗒️', cond: 'flag.cg_carga_t0_fin',
          talk: [{ script: 'cg_carga_recordatorio_olivo' }]
        }
      ]
    },
    trigal: {
      spots: [
        {
          label: 'Patio de mercancías',
          sub: 'Llegadas, salidas y tres anotaciones que no se ponen de acuerdo',
          icon: '🚚', cond: 'flag.cg_carga_t0_fin && !flag.cg_carga_t1_fin',
          new: '!flag.cg_carga_t1_inicio', talk: [{ script: 'cg_carga_patio' }]
        },
        {
          label: 'Pizarra de horarios',
          sub: 'Los horarios impresos y las correcciones a lápiz no coinciden',
          icon: '🕒', cond: 'flag.cg_carga_t1_inicio && !flag.cg_carga_t1_fin',
          new: '!flag.cg_carga_t1_horario', doneIf: 'flag.cg_carga_t1_horario',
          talk: [{ script: 'cg_carga_horario' }]
        },
        {
          label: 'Testimonio del conductor',
          sub: 'Un carretero asegura que él no movió el cajón',
          icon: '🛞', cond: 'flag.cg_carga_t1_inicio && !flag.cg_carga_t1_fin',
          new: '!flag.cg_carga_t1_testigo', doneIf: 'flag.cg_carga_t1_testigo',
          talk: [{ script: 'cg_carga_testigo' }]
        },
        {
          label: 'Mesa de precintos',
          sub: 'Tres sellos, tres marcas y una diferencia pequeña',
          icon: '🔎', cond: 'flag.cg_carga_t1_inicio && !flag.cg_carga_t1_fin',
          new: '!flag.cg_carga_t1_precinto', doneIf: 'flag.cg_carga_t1_precinto',
          talk: [{ script: 'cg_carga_precinto' }]
        },
        {
          label: 'Tablón de reconstrucción',
          sub: 'Ordena lo que ocurrió sin confundir carga con salida',
          icon: '📋', cond: 'flag.cg_carga_t1_horario && flag.cg_carga_t1_testigo && flag.cg_carga_t1_precinto && !flag.cg_carga_t1_fin',
          new: 'true', talk: [{ script: 'cg_carga_orden' }]
        },
        {
          label: 'Ficha de seguimiento de la carga',
          sub: 'El siguiente destino aparece marcado en la hoja',
          icon: '🗺️', cond: 'flag.cg_carga_t1_fin',
          talk: [{ script: 'cg_carga_recordatorio_trigal' }]
        }
      ]
    }
  },
  scripts: {
    cg_carga_inicio: [
      'El almacén de Olivo huele a cuerda mojada, sal y madera. A un lado de la puerta hay una caja que nadie se atreve a abrir.',
      { say: 'yasmina', text: 'Disculpa que te moleste fuera del gimnasio. Hay una cosa muy pequeña que no me deja tranquila. Y no tiene que ver con combates.' },
      { say: 'yasmina', text: 'Esta caja figura como recibida ayer por la mañana. Pero el envío salió de Trigal ayer por la tarde. Ya pregunté dos veces y las dos me enseñaron la misma hoja.' },
      { say: 'yasmina', text: 'No quiero señalar a nadie sin estar segura. Quisiera saber por dónde empezar. Si no puedes, lo entiendo.' },
      { choice: [
        { text: 'Revisar las hojas con ella', then: [
          { set: { 'flag.cg_carga_inicio': true } },
          { quest: 'cg_carga_johto', stage: 'olivo' },
          { give: 'cg_carga_carpeta' },
          { say: 'yasmina', text: 'Gracias. No abras la caja todavía. Primero mira lo que la rodea. Lo que una persona escribe también puede equivocarse.' },
          'Yasmina deja la carpeta sobre una mesa vacía. La etiqueta, la báscula y el libro de entrada están a tu alcance.'
        ] },
        { text: 'Volver otro día', then: [
          { say: 'yasmina', text: 'Claro. La guardaré aquí, seca y sin moverla. Cuando quieras mirar, seguimos.' }
        ] }
      ] }
    ],
    cg_carga_yasmina_espera: [
      { say: 'yasmina', text: 'Tenemos tres cosas separadas: la etiqueta, el peso y el libro. Si una contradice a otra, no elijas la que te guste más. Veamos por qué.' },
      { if: 'flag.cg_carga_t0_papel', then: ['La etiqueta ya tiene una nota a lápiz: «Hora de recepción no confirmada».'] },
      { if: 'flag.cg_carga_t0_masa', then: ['Junto a la báscula hay una marca: «Peso neto y bruto distintos».'] },
      { if: 'flag.cg_carga_t0_libro', then: ['En el libro has señalado una línea añadida con una segunda caligrafía.'] }
    ],
    cg_carga_etiqueta: [
      'La etiqueta es amarilla en los bordes. Tiene un número de remesa, el destino y dos casillas de hora.',
      { choice: [
        { text: 'Comparar hora impresa y firma', then: [
          'La impresión de la hora parece hecha con una matriz. La firma es tinta escrita a mano. No necesariamente se hicieron a la vez.',
          { if: '!flag.cg_carga_t0_papel', then: [
            { set: { 'flag.cg_carga_t0_papel': true } },
            'Anotas: «La etiqueta prueba que alguien la imprimió, no que alguien recibió la caja a esa hora».'
          ] }
        ] },
        { text: 'Revisar el borde del papel', then: [
          'Una esquina está doblada hacia dentro, bajo el cordel. Nadie la arrancó. El sello no tiene cortes.',
          { if: '!flag.cg_carga_t0_papel', then: [
            { set: { 'flag.cg_carga_t0_papel': true } },
            'Anotas: «El precinto pudo colocarse después de imprimir la etiqueta».'
          ] }
        ] },
        { text: 'Leer solo la fecha grande', then: [
          'La fecha grande confirma lo que dice Yasmina. Pero no te dice si fue escrita antes o después de mover la caja.',
          { say: 'rotom', text: '¡Bzzt! ¡Fecha bonita, prueba flojita! ¿Y la parte que está escrita a mano?' }
        ] }
      ] },
      { if: 'flag.cg_carga_t0_papel', then: [{ say: 'rotom', text: 'Guardado. ¡La hora impresa y la hora real no son necesariamente gemelas!' }] }
    ],
    cg_carga_bascula: [
      'Una vieja báscula tiene dos escalas y una rueda de hierro. La caja, sin abrir, está junto a ella.',
      { choice: [
        { text: 'Calibrarla con la pesa patrón', then: [
          'La aguja marca cero con la pesa patrón retirada. Con la pesa puesta, la báscula responde correctamente.',
          'Al comparar las dos cifras de la hoja adviertes que una dice PESO BRUTO y la otra PESO NETO.',
          { if: '!flag.cg_carga_t0_masa', then: [
            { set: { 'flag.cg_carga_t0_masa': true } },
            'Anotas: «La discrepancia de masa puede ser el embalaje, no la mercancía».'
          ] }
        ] },
        { text: 'Leer la cifra más alta', then: [
          'La cifra mayor incluye una unidad que no habías visto. No coincide con la unidad de la otra columna.',
          { say: 'rotom', text: '¡Bzzt! Si mezclas gramos con kilos, hasta yo peso una tonelada. ¡Calibra primero!' }
        ] },
        { text: 'Examinar las patas de la báscula', then: [
          'No está nivelada del todo: una pata descansa sobre un trozo de cartón. Es mejor comprobar su calibración antes de culpar a un empleado.'
        ] }
      ] }
    ],
    cg_carga_libro: [
      'La última página del libro está limpia salvo una línea escrita dos veces. El papel cruje al pasar la hoja.',
      { choice: [
        { text: 'Comparar los números de asiento', then: [
          'El primero pertenece a una salida; el segundo, a una entrada. Hay dos sellos distintos que comparten número de remesa.',
          { if: '!flag.cg_carga_t0_libro', then: [
            { set: { 'flag.cg_carga_t0_libro': true } },
            'Anotas: «Un identificador de remesa no equivale a un identificador de movimiento».'
          ] }
        ] },
        { text: 'Buscar raspaduras o tinta nueva', then: [
          'La letra de la última línea es más angulosa. Pero el papel no está raspado. Una segunda mano añadió datos a un registro preexistente.',
          { if: '!flag.cg_carga_t0_libro', then: [
            { set: { 'flag.cg_carga_t0_libro': true } },
            'Anotas: «Dos personas escribieron en el libro. Eso no prueba falsificación por sí solo».'
          ] }
        ] },
        { text: 'Suponer que la segunda firma es falsa', then: [
          { say: 'yasmina', text: 'No todavía. Si dos personas hacen turnos diferentes, es normal que escriban distinto. ¿Qué más podemos comparar?' }
        ] }
      ] }
    ],
    cg_carga_inferencia: [
      'Yasmina coloca las tres pruebas una al lado de otra. Ninguna contiene toda la historia.',
      { quest: 'cg_carga_johto', stage: 'deduccion' },
      { say: 'yasmina', text: 'Dime solo qué sabemos. Lo que sospechamos puede esperar.' },
      { choice: [
        { text: 'La caja tuvo que viajar hacia atrás en el tiempo', then: [
          { say: 'yasmina', text: 'Si fuera cierto, los papeles no bastarían para demostrarlo. Tendríamos que haber visto el movimiento de la caja.' },
          { say: 'rotom', text: '¡Bzzt! ¡Una hora impresa no es una máquina del tiempo! Prueba otra hipótesis.' }
        ] },
        { text: 'Alguien robó mercancía y falsificó el peso', then: [
          { say: 'yasmina', text: 'Eso no sigue de la báscula. La hoja distingue peso bruto y neto. No acusa a nadie.' },
          'El libro conserva la entrada y la salida, pero no el orden en que se escribieron.'
        ] },
        { text: 'Primero debemos separar los movimientos de las anotaciones', then: [
          { say: 'yasmina', text: 'Eso sí podemos sostenerlo. No sabemos aún quién escribió qué, pero sabemos qué no demuestra cada papel.' },
          { set: { 'flag.cg_carga_t0_deduccion': true } },
          { call: 'cg_carga_olivo_decision' }
        ] }
      ] }
    ],
    cg_carga_olivo_decision: [
      { say: 'yasmina', text: 'El patio de Trigal tiene las otras copias. Puedo pedir una revisión formal o dejarte averiguar antes qué pasó. Tú eliges.' },
      { choice: [
        { text: 'Pedir revisión formal, sin acusar a nadie', then: [
          { set: { 'flag.cg_carga_t0_formal': true, 'flag.cg_carga_t0_fin': true } },
          { quest: 'cg_carga_johto', stage: 'trigal' },
          { say: 'yasmina', text: 'Lo haré así. Un registro es una herramienta, no una condena. Pregunta por la pizarra del patio de carga.' },
          { call: 'cg_carga_cierre_olivo' }
        ] },
        { text: 'Revisar Trigal antes de presentar el informe', then: [
          { set: { 'flag.cg_carga_t0_discreta': true, 'flag.cg_carga_t0_fin': true } },
          { quest: 'cg_carga_johto', stage: 'trigal' },
          { say: 'yasmina', text: 'De acuerdo. Me quedaré con el cajón. No moveremos nada ni daremos nombres sin pruebas.' },
          { call: 'cg_carga_cierre_olivo' }
        ] }
      ] }
    ],
    cg_carga_cierre_olivo: [
      { say: 'rotom', text: '¡Tengo cuatro notas y todavía no sé qué hay dentro! ¡Eso sí que es un misterio ordenado!' },
      'La carpeta se cierra con una goma. La segunda copia está en Trigal, no en otra región.',
      { diary: 'Hoy revisamos una caja en Olivo. La fecha de una hoja decía una cosa y la báscula otra. Mi entrenador{|a|e} insistió en no acusar a nadie antes de entender la diferencia entre una caja, una etiqueta y un registro. Ahora vamos a Trigal a buscar las otras copias.', cond: 'flag.b01_diario' }
    ],
    cg_carga_recordatorio_olivo: [
      { if: '!flag.cg_carga_t1_fin', then: [{ say: 'yasmina', text: 'El patio de carga de Trigal. Mira el horario, habla con el conductor y revisa los precintos antes de sacar conclusiones.' }] },
      { if: 'flag.cg_carga_t1_fin', then: [{ say: 'yasmina', text: 'Me alegra que siguieras las pruebas, incluso cuando los papeles no se ponían de acuerdo. Mantén la carpeta a mano.' }] }
    ],
    cg_carga_patio: [
      'En el patio de Trigal, las ruedas de las carretas dejan arcos de barro sobre las piedras. Una pizarra separa salidas, llegadas y cargas pendientes.',
      { if: '!flag.b03_fin', then: [
        { say: 'kaori', text: 'Otra vez revisando cosas antes de que se te olvide comer. Qué sorpresa. —Mira la pizarra—. Si vas a resolver un enredo, al menos pregunta qué significan las columnas.' }
      ], else: [
        'Hay un mensaje breve sujeto al borde de la pizarra, firmado «K.»: «No confundas el momento de preparar algo con el momento de entregarlo».'
      ] },
      { set: { 'flag.cg_carga_t1_inicio': true } },
      { say: 'rotom', text: '¡Bzzt! ¡Pizarra, conductor y precintos! No es un gimnasio, pero aquí también ganamos por puntos.' },
      { quest: 'cg_carga_johto', stage: 'trigal' }
    ],
    cg_carga_horario: [
      'En la pizarra, un ferrocarril sale a las 17:40. El casillero del envío marca preparación a las 15:10 y despacho a las 17:25.',
      { choice: [
        { text: 'Separar preparación y despacho', then: [
          'La carga puede estar lista dos horas antes de salir. Una segunda anotación indica que el envío se selló durante el cambio de turno.',
          { if: '!flag.cg_carga_t1_horario', then: [
            { set: { 'flag.cg_carga_t1_horario': true } },
            'Anotas tres momentos: preparación, despacho y salida del tren.'
          ] }
        ] },
        { text: 'Comparar solo las horas más cercanas', then: [
          '17:25 y 17:40 son próximas. Pero 15:10 también aparece en el registro. Ignorarla dejaría una pieza sin explicar.'
        ] },
        { text: 'Pedir al encargado el horario impreso', then: [
          'La copia impresa confirma la salida del tren. Las correcciones a lápiz corresponden a la maniobra de cargar vagones, no al tren en sí.'
        ] }
      ] }
    ],
    cg_carga_testigo: [
      'Un conductor está guardando una cuerda enrollada en ocho vueltas exactas. No te pregunta tu nombre.',
      { choice: [
        { text: 'Preguntar qué transportó', then: [
          '«Dos cajas vacías de refuerzo. Las llevé hasta el muelle, pero el cajón marcado no era mío. No firmé ese número».',
          { if: '!flag.cg_carga_t1_testigo', then: [
            { set: { 'flag.cg_carga_t1_testigo': true } },
            'Anotas: el conductor distingue sus cajas del envío cuya etiqueta se investiga.'
          ] }
        ] },
        { text: 'Preguntar por la hora de llegada', then: [
          '«Llegué después de comer y antes de la salida del tren. No me pidas minutos: mi reloj estuvo parado toda la mañana».',
          { if: '!flag.cg_carga_t1_testigo', then: [
            { set: { 'flag.cg_carga_t1_testigo': true } },
            'Anotas: un testimonio puede acotar un intervalo sin fijar un minuto exacto.'
          ] }
        ] },
        { text: 'Decirle que lo van a acusar', then: [
          'El conductor deja de enrollar la cuerda. «Entonces trae la prueba. Yo no firmé una caja que no moví».',
          { say: 'rotom', text: '¡Bzzt! No tenemos esa prueba. Más vale volver a las preguntas.' }
        ] }
      ] }
    ],
    cg_carga_precinto: [
      'En una mesa hay tres sellos de cartón. Dos tienen la misma muesca, pero colores distintos. El tercero carece de fecha.',
      { choice: [
        { text: 'Emparejar número y muesca', then: [
          'Los dos sellos con muesca igual corresponden a fases diferentes de la misma remesa. Sus números de control no son iguales.',
          { if: '!flag.cg_carga_t1_precinto', then: [
            { set: { 'flag.cg_carga_t1_precinto': true } },
            'Anotas: dos sellos del mismo envío no significan dos cajas idénticas.'
          ] }
        ] },
        { text: 'Buscar una fecha en el tercer sello', then: [
          'No hay fecha visible. El sello estaba preparado para sustituir uno dañado; nadie ha escrito que se utilizara.'
        ] },
        { text: 'Elegir el color que parece más reciente', then: [
          'La tinta del sello azul se ve nueva; el papel del rojo está casi sin uso. Ninguna observación prueba el orden.',
          { say: 'rotom', text: '¡El color no es un reloj, entrenador{|a|e}!' }
        ] }
      ] }
    ],
    cg_carga_orden: [
      { quest: 'cg_carga_johto', stage: 'orden' },
      'Las tres hojas forman un triángulo: preparación, salida y recepción. Al lado hay tres pinzas para ordenarlas.',
      { say: 'rotom', text: '¡Bzzt! ¡La tarea no es adivinar quién mintió! Es colocar lo que sí sabemos en orden.' },
      { choice: [
        { text: 'Recepción → preparación → salida', then: [
          'La recepción de Olivo es la fecha que está bajo sospecha. No puede servir como punto fijo sin una prueba independiente.',
          { say: 'rotom', text: '¡La conclusión no puede ser su propia prueba! Intenta de nuevo.' }
        ] },
        { text: 'Preparación → despacho → salida; recepción todavía sin verificar', then: [
          'Las tres horas encajan en Trigal. La recepción de Olivo todavía no tiene testigo ni registro independiente.',
          { set: { 'flag.cg_carga_t1_orden': true } },
          { call: 'cg_carga_cierre_trigal' }
        ] },
        { text: 'Salida → despacho → preparación', then: [
          'La locomotora no pudo salir con el vagón antes de que el vagón quedara cargado. Una copia del horario confirma el error.'
        ] }
      ] }
    ],
    cg_carga_cierre_trigal: [
      { say: 'rotom', text: '¡Bzzt! ¡Tenemos una cronología que sí funciona! Pero aún queda el nombre en el recibo.' },
      { if: 'flag.cg_carga_t0_formal', then: [
        'El encargado coloca una copia del informe formal en un sobre sin nombres propios: solo fechas y números de remesa.'
      ], else: [
        'El encargado te deja copiar las fechas en una hoja de trabajo, sin colocar todavía ninguna acusación oficial.'
      ] },
      { set: { 'flag.cg_carga_t1_fin': true } },
      { quest: 'cg_carga_johto', stage: 'iris' },
      'La última nota del patio dice que tres guías llevaron copias de documentos por Iris, pero cada cual recuerda una parte distinta.',
      { diary: 'En el patio de Trigal aprendimos una cosa sencilla: preparar, despachar, salir y recibir son acciones diferentes. Pueden llevar horas distintas y personas distintas. Ahora seguimos las copias hacia Iris, pero todavía no sabemos quién firmó. Y está bien no saberlo todavía.', cond: 'flag.b01_diario' }
    ],
    cg_carga_recordatorio_trigal: [
      'Al lado de la pizarra hay una hoja sujeta con tres chinchetas: «Siguiente revisión: Iris. Preguntar por las tres guías».',
      { if: 'flag.cg_carga_t0_formal', then: ['Debajo figura una nota: «Revisión abierta; sin acusaciones».'] },
      { if: 'flag.cg_carga_t0_discreta', then: ['Debajo figura una nota: «Consulta documental; sin acusaciones».'] }
    ]
  }
};
