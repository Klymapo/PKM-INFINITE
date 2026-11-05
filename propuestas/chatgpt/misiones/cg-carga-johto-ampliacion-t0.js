// Pokémon Infinite · La carga que nadie firmó · ampliación T0 (Olivo).
// Antes de acusar a alguien: rastrear un traslado físico y un traslado de papeles.
// Aditivo a la propuesta aislada: ninguna región nueva, medalla ni cambio en bloques troncales.
export default {
  npcs: {
    cg_carga_dalia_olivo: {
      name: 'Dalia', title: 'Responsable de la dársena de Olivo',
      look: { hair: 'bun', hairColor: '#45392e', eyes: '#587184',
        outfit: '#547e88', outfit2: '#e2c791', skin: 3, acc: 'bandana', mouth: 'smile', bg: '#a9c7cd' }
    }
  },
  items: {
    cg_carga_t0_croquis: {
      name: 'Croquis de la dársena', pocket: 'key',
      desc: 'Mapa de consulta que distingue el acceso de cajas de la ventanilla de papeles.',
      read: 'OLIVO — DÁRSENA DE CARGA\n\nMUELLE: el carrito llega desde la pasarela y pasa por el control físico de mercancías.\nVENTANILLA: el mensajero puede entregar solo documentación sin mover un bulto.\nSEÑALES: el timbre de revisión y el farol de relevo indican tareas de personal, no que una caja haya salido.\n\nLa huella del carrito se detiene antes de la puerta del archivo. El croquis NO demuestra a qué hora llegó el envío investigado.'
    },
    cg_carga_t0_ficha: {
      name: 'Ficha de las dos ventanillas', pocket: 'key',
      desc: 'Ejemplo sin nombres de cómo un solo envío puede tener dos acuses legítimos.',
      read: 'EJEMPLO DE SERVICIO — OLIVO\n\n1. DOCUMENTACIÓN recibida: alguien entrega una carpeta. La caja podría seguir en el patio.\n2. MERCANCÍA recibida: otra persona comprueba físicamente el bulto y lo anota aparte.\n\nUna fecha de recepción documental NO certifica la llegada de mercancía. Este formulario es solo una práctica: no confirma todavía qué ocurrió con el envío real ni la identidad del firmante.'
    }
  },
  trainers: {
    cg_carga_t0_practica_olivo: {
      name: 'Aprendiz de la dársena', cls: 'Trabajador', ai: 2, reward: 850,
      team: [
        { sp: 'noctowl', lv: 68 },
        { sp: 'lanturn', lv: 69 }
      ],
      intro: 'Un entrenamiento de señales. La regla principal es detenerse cuando alguien lo indique.',
      win: '¡Buenas señales! Ahora sí podemos hablar con calma del turno.',
      lose: 'La práctica se repite cuando quieras. La evidencia no se gana peleando.'
    }
  },
  locations: {
    cg_carga_t0_darsena: {
      name: 'Dársena de servicio de Olivo', short: 'Dársena de Olivo',
      parent: 'olivo', region: 'johto', kind: 'area',
      bg: { type: 'coast' },
      desc: 'Las tablas están húmedas por la brisa. Un carrito vacío junto al muelle deja una huella que no llega al archivo. Del otro lado hay una ventanilla para sobres y una lámpara de relevo. Dalia permite investigar el recorrido sin abrir ni mover la mercancía ajena.',
      spots: [
        { label: 'Dalia y la visita de servicio', icon: '👩‍🔧',
          sub: 'Pide permiso para examinar señales y recorrido sin tocar cajas ajenas',
          cond: 'flag.cg_carga_inicio',
          new: '!flag.cg_carga_t0_permiso', doneIf: 'flag.cg_carga_t0_permiso',
          talk: [{ script: 'cg_carga_t0_dalia' }] },
        { label: 'Ventanilla de documentación', icon: '✉️',
          sub: '¿Podría llegar un sobre sin que llegara el bulto?',
          cond: 'flag.cg_carga_t0_permiso',
          new: '!flag.cg_carga_t0_ventanilla', doneIf: 'flag.cg_carga_t0_ventanilla',
          talk: [{ script: 'cg_carga_t0_ventanilla' }] },
        { label: 'Huellas del carrito en la pasarela', icon: '🛞',
          sub: 'Comprueba hasta dónde se desplaza una caja, no dónde se escribe una hora',
          cond: 'flag.cg_carga_t0_permiso',
          new: '!flag.cg_carga_t0_huellas', doneIf: 'flag.cg_carga_t0_huellas',
          talk: [{ script: 'cg_carga_t0_huellas_escena' }] },
        { label: 'Farol y timbre del relevo', icon: '🔔',
          sub: 'Sonidos que parecen indicar entrega, pero pertenecen a otras tareas',
          cond: 'flag.cg_carga_t0_permiso',
          new: '!flag.cg_carga_t0_senales', doneIf: 'flag.cg_carga_t0_senales',
          talk: [{ script: 'cg_carga_t0_senales_escena' }] },
        { label: 'Croquis de las dos rutas', icon: '🗺️',
          sub: 'Traza acceso de cajas y acceso de sobres por separado',
          cond: 'flag.cg_carga_t0_huellas && flag.cg_carga_t0_ventanilla && flag.cg_carga_t0_senales',
          new: '!flag.cg_carga_t0_croquis_listo', doneIf: 'flag.cg_carga_t0_croquis_listo',
          talk: [{ script: 'cg_carga_t0_croquis_escena' }] },
        { label: 'Cobertizo del carrito de práctica', icon: '🛒',
          sub: 'Una maqueta segura permite comprobar qué significa mover una caja',
          cond: 'flag.cg_carga_t0_croquis_listo',
          action: { go: 'cg_carga_t0_cobertizo' } },
        { label: 'Regresar al almacén', icon: '↩️',
          sub: 'La caja original seguirá precintada en Olivo',
          action: { go: 'olivo' } }
      ]
    },
    cg_carga_t0_cobertizo: {
      name: 'Cobertizo de práctica de Olivo', short: 'Cobertizo',
      parent: 'olivo', region: 'johto', kind: 'building',
      bg: { type: 'indoor' },
      desc: 'En una tarima de ejercicios hay una sola caja de madera y un pasillo con una placa que libera la puerta del archivo de entrenamiento. El cierre no da acceso a documentos privados. Al lado queda una mesa con formularios en blanco para probar las dos formas de recepción.',
      spots: [
        { label: 'Leer el plano del carrito', icon: '🧭',
          sub: 'El modelo tiene una caja, una placa y una puerta de ejercicio',
          cond: 'flag.cg_carga_t0_croquis_listo',
          new: '!flag.cg_carga_t0_manual', doneIf: 'flag.cg_carga_t0_manual',
          talk: [{ script: 'cg_carga_t0_manual' }] },
        { label: 'Maqueta del carrito de servicio', icon: '🧩',
          sub: 'Empuja la caja a la placa o pide que Dalia haga la maniobra',
          cond: 'flag.cg_carga_t0_manual && !flag.cg_carga_t0_maqueta',
          new: 'true', talk: [{ script: 'cg_carga_t0_maqueta_escena' }] },
        { label: 'Demostración con Dalia', icon: '🤝',
          sub: 'Alternativa asistida: obtener la misma explicación sin resolver el puzle',
          cond: 'flag.cg_carga_t0_manual && !flag.cg_carga_t0_maqueta',
          new: 'true', talk: [{ script: 'cg_carga_t0_maqueta_ayuda' }] },
        { label: 'Dos ventanillas de prueba', icon: '📑',
          sub: 'Compara el movimiento físico y la entrega de una carpeta',
          cond: 'flag.cg_carga_t0_maqueta',
          new: '!flag.cg_carga_t0_formulario', doneIf: 'flag.cg_carga_t0_formulario',
          talk: [{ script: 'cg_carga_t0_formulario' }] },
        { label: 'Ensayo Pokémon de señales', icon: '⚔️',
          sub: 'Combate amistoso opcional y curación previa; no bloquea investigación',
          cond: 'flag.cg_carga_t0_maqueta && !flag.cg_carga_t0_practica_ganada',
          talk: [{ script: 'cg_carga_t0_practica' }] },
        { label: 'Primera reconstrucción con Dalia', icon: '🧠',
          sub: 'Concluye qué podrías demostrar de la caja sin buscar culpables',
          cond: 'flag.cg_carga_t0_formulario && flag.cg_carga_t0_croquis_listo',
          new: '!flag.cg_carga_t0_anexo_fin', doneIf: 'flag.cg_carga_t0_anexo_fin',
          talk: [{ script: 'cg_carga_t0_sintesis' }] },
        { label: 'Volver a la dársena', icon: '↩️',
          sub: 'Las tres pruebas originales se analizan en el almacén de Olivo',
          action: { go: 'cg_carga_t0_darsena' } },
        { label: 'Consultar la ficha de servicio', icon: '📖',
          sub: 'Un ejemplo, no el resultado del misterio',
          cond: 'flag.cg_carga_t0_formulario',
          talk: [{ script: 'cg_carga_t0_releer_ficha' }] }
      ]
    }
  },
  patches: {
    olivo: { spots: [
      { label: 'Dársena de servicio del faro', icon: '⚓',
        sub: 'Rastrea por separado los sobres, el carrito y los relevos',
        cond: 'flag.cg_carga_inicio',
        new: '!flag.cg_carga_t0_anexo_fin',
        action: { go: 'cg_carga_t0_darsena' } }
    ] }
  },
  scripts: {
    cg_carga_t0_dalia: [
      'Dalia tiene las mangas remangadas y una tiza detrás de la oreja. Una gaviota picotea la cuerda de un carrito sin carga.',
      { say: 'cg_carga_dalia_olivo', text: 'Yasmina me dijo que preguntarías por la caja. No voy a darte un nombre que no puedo probar. Sí puedo mostrarte por qué esta dársena tiene dos entradas.' },
      { choice: [
        { text: 'Pedir permiso para observar sin mover mercancía', then: [
          { set: { 'flag.cg_carga_t0_permiso': true } },
          { say: 'cg_carga_dalia_olivo', text: 'Adelante. Observa huellas, ventanilla y señales. Toma notas sobre lo que ves, no sobre quién te gustaría culpar.' }
        ] },
        { text: 'Solicitar abrir de inmediato la caja de Yasmina', then: [
          { say: 'cg_carga_dalia_olivo', text: 'La caja no es nuestra. No la abriremos sin autorización. A veces el error está en el papel que acompaña al objeto.' }
        ] },
        { text: 'Dejar la investigación para después', then: [
          'Dalia asiente. «La dársena seguirá abierta. La caja no se moverá sin un asiento de control».'
        ] }
      ] }
    ],
    cg_carga_t0_ventanilla: [
      'La ventanilla de la dársena tiene un estante para sobres y otro cerrado para muestras de mercancía. La madera junto al primer estante no tiene marcas de carro.',
      { choice: [
        { text: 'Seguir el camino de un mensajero con una carpeta', then: [
          'Un mensajero puede subir las escaleras, entregar el sobre y bajar sin cruzar el acceso del muelle. La ventanilla da un recibo documental, no uno de mercancías.',
          { set: { 'flag.cg_carga_t0_ventanilla': true } },
          'Anotas: la ruta de papeles no exige transportar una caja.'
        ] },
        { text: 'Suponer que toda firma en la ventanilla acredita el bulto', then: [
          'Los sobres caben por una ranura demasiado pequeña para la caja. Esa firma solo explica qué pasó por esta ventana.',
          { say: 'cg_carga_dalia_olivo', text: 'Las palabras RECIBIDO y ENTREGADO no dicen nada si no lees lo que las acompaña.' }
        ] },
        { text: 'Buscar un túnel oculto detrás del estante', then: [
          'Detrás está la pared del faro. Una forma de mover mercancía necesitaría una entrada, pero aquí solo cabe una mano con papeles.'
        ] }
      ] }
    ],
    cg_carga_t0_huellas_escena: [
      'Una rueda dejó un arco junto al muelle. Al lado hay una marca recta que termina antes de la oficina de documentos.',
      { choice: [
        { text: 'Comprobar el final de las huellas antes de sacar conclusiones', then: [
          'El giro termina junto al muelle, no en la puerta de archivo. El carrito pudo maniobrar sin que ningún paquete cambiara de destinatario.',
          { set: { 'flag.cg_carga_t0_huellas': true } },
          'Dibujas el trayecto sin asignarle todavía una hora.'
        ] },
        { text: 'Decir que dos marcas significan dos cajas', then: [
          'El ancho y el desgaste coinciden. Un mismo carrito deja distintas marcas al girar. Dalia señala la rueda del vehículo de práctica.'
        ] },
        { text: 'Pedir a un Pokémon que arrastre la caja para repetir la huella', then: [
          'No hace falta mover la caja verdadera. La huella de la rueda vacía se puede estudiar sin arriesgar mercancías.'
        ] }
      ] }
    ],
    cg_carga_t0_senales_escena: [
      'Un farol azul cuelga junto a un timbre pequeño. Sus tablillas dicen CAMBIO DE TURNO y REVISIÓN COMPLETA. Ninguna dice DESPACHO.',
      { choice: [
        { text: 'Distinguir la señal de relevo y la de inspección', then: [
          'La luz azul anuncia a quien termina su turno; el timbre indica que una revisión de seguridad terminó. Ninguna certifica la salida de una caja.',
          { set: { 'flag.cg_carga_t0_senales': true } },
          { say: 'rotom', text: '¡Bzzt! Dos señales verdaderas pueden hablar de cosas totalmente distintas.' }
        ] },
        { text: 'Copiar la hora del farol como hora de despacho', then: [
          'La tabla dice CAMBIO DE TURNO. Para probar un despacho haría falta un asiento de carga, no la hora en que cambiaron de vigilante.'
        ] },
        { text: 'Interpretar el timbre como alarma por robo', then: [
          'El timbre se usa todos los días para cerrar una inspección. No aparece registrada ninguna alarma por robo.'
        ] }
      ] }
    ],
    cg_carga_t0_croquis_escena: [
      'Dalia extiende un croquis en blanco. Hay dos trazos posibles: uno desde el muelle con un carrito y otro desde las escaleras hasta la ventanilla de sobres.',
      { choice: [
        { text: 'Dibujar por separado la ruta del carro y la ruta de documentos', then: [
          'El trazo azul termina en el control físico y el verde en la ventanilla de archivo. Son recorridos distintos que pueden dejar registros legítimos sobre una misma remesa.',
          { if: '!flag.cg_carga_t0_croquis_listo', then: [
            { give: 'cg_carga_t0_croquis' },
            { set: { 'flag.cg_carga_t0_croquis_listo': true } }
          ] },
          { say: 'cg_carga_dalia_olivo', text: 'Ya sabemos qué hay que comprobar. Ahora puedes probarlo con una caja que sí tenemos permiso de mover.' }
        ] },
        { text: 'Unir ambos recorridos y declarar que hubo dos entregas', then: [
          'En la ventanilla no cabe un bulto. Unir las rutas como si fueran una sola distorsiona el plano.',
          { say: 'rotom', text: '¡Bzzt! El mapa no debe contar una historia que sus caminos no permiten.' }
        ] }
      ] }
    ],
    cg_carga_t0_manual: [
      'La maqueta reproduce una puerta de práctica con una placa de peso. Una caja puede presionarla y liberar el pasillo que lleva a los formularios.',
      { choice: [
        { text: 'Leer el funcionamiento antes de mover el palé', then: [
          'La caja R debe llegar a la placa S para abrir la puerta D y alcanzar la meta G. Si no quieres jugar el rompecabezas, Dalia puede realizar la maniobra.',
          { set: { 'flag.cg_carga_t0_manual': true } },
          'Ningún objeto del almacén real se mueve durante este ejercicio.'
        ] },
        { text: 'Abrir a la fuerza la puerta de mercancías', then: [
          'La puerta corresponde solo al modelo de madera y se puede abrir con el interruptor. No hay razón para romperla.'
        ] }
      ] }
    ],
    cg_carga_t0_maqueta_escena: [
      'Una caja vacía espera sobre las baldosas de la maqueta. Las marcas indican por dónde puede pasar una persona y por dónde debe avanzar el carrito.',
      { puzzle: {
        id: 'cg_carga_t0_modelo_darsena',
        title: 'Carrito y ventanilla de Olivo',
        hint: 'Empuja R hacia S para liberar D. Después llega hasta G. Puedes salir y volver o pedirle a Dalia que lo muestre.',
        theme: 'lab',
        grid: [
          '########',
          '#P.....#',
          '#..R...#',
          '#..S...#',
          '#...####',
          '###D.G##',
          '########'
        ]
      },
      onSolve: [
        { set: { 'flag.cg_carga_t0_maqueta': true } },
        { say: 'cg_carga_dalia_olivo', text: 'Una caja, una maniobra y una puerta. El hecho de entrar a la oficina no implica que esta caja se haya registrado como recibida.' },
        'La puerta del modelo queda abierta. Al otro lado hay dos casillas para hacer una prueba documental.'
      ],
      onQuit: [
        { set: { 'flag.cg_carga_t0_maqueta_intento': true } },
        { say: 'rotom', text: '¡Bzzt! La maqueta se puede repetir o pedir ayuda. Ninguna nota se borra por dejar el ejercicio.' }
      ] }
    ],
    cg_carga_t0_maqueta_ayuda: [
      { say: 'cg_carga_dalia_olivo', text: 'Esto es una demostración de procedimiento, no una competencia. Si prefieres observar, haré el movimiento.' },
      { choice: [
        { text: 'Pedir la maniobra supervisada sin resolver el rompecabezas', then: [
          { set: { 'flag.cg_carga_t0_maqueta': true, 'flag.cg_carga_t0_maqueta_asistida': true } },
          'Dalia mueve una caja de práctica hasta la placa. La puerta del modelo se abre, sin que se registre una entrega real.',
          { say: 'cg_carga_dalia_olivo', text: 'Viste lo que ocurre. La casilla de documentos sigue sin demostrar que la caja haya llegado a otro lugar.' }
        ] },
        { text: 'Resolver la maqueta por tu cuenta', then: [
          'Dalia deja la caja en su posición inicial para que puedas probarlo cuando quieras.'
        ] }
      ] }
    ],
    cg_carga_t0_formulario: [
      'La caja de práctica está al lado de dos ventanillas. Una recibe únicamente sobres; la otra recibe bultos que una persona puede pesar.',
      { choice: [
        { text: 'Entregar primero la hoja y después registrar la caja por separado', then: [
          'La hoja obtiene un acuse documental. Luego se pesa el bulto vacío y se marca recepción física en otro campo. Un solo ensayo genera dos anotaciones correctas.',
          { if: '!flag.cg_carga_t0_formulario', then: [
            { give: 'cg_carga_t0_ficha' },
            { set: { 'flag.cg_carga_t0_formulario': true } }
          ] },
          { say: 'rotom', text: '¡Bzzt! Una firma no puede decir que llegó algo que nunca pasó por su ventanilla.' }
        ] },
        { text: 'Firmar la recepción de la caja al entregar solo el sobre', then: [
          'La ventanilla de sobres no ha visto el bulto. Una firma anticipada produciría precisamente el tipo de confusión que estamos investigando.',
          { say: 'cg_carga_dalia_olivo', text: 'No falsifiquemos la prueba. Se puede mostrar el error sin convertirlo en una recepción verdadera.' }
        ] },
        { text: 'Borrar el primer asiento cuando llegue el bulto', then: [
          'La llegada de la caja no anula que alguien recibió antes la carpeta. Los dos movimientos requieren acuses distintos.'
        ] }
      ] }
    ],
    cg_carga_t0_practica: [
      'Un aprendiz practica señales de alto y avance con dos Pokémon al lado del muelle. No hay un paquete que proteger ni una recompensa narrativa condicionada al combate.',
      { say: 'cg_carga_dalia_olivo', text: '¿Quieres practicar coordinación? No hace falta vencer para continuar la investigación.' },
      { choice: [
        { text: 'Participar en el entrenamiento amistoso (curación previa)', then: [
          { heal: true },
          { battle: 'cg_carga_t0_practica_olivo', lose: 'continue',
            onWin: [
              { set: { 'flag.cg_carga_t0_practica_ganada': true } },
              { say: 'cg_carga_dalia_olivo', text: 'Buena coordinación. El farol, el timbre y la señal de alto sirven para dar órdenes, no para cambiar un recibo.' }
            ],
            onLose: [
              { heal: true },
              { say: 'cg_carga_dalia_olivo', text: 'La práctica terminó sin consecuencias. Puedes probar otra vez, o dejarla y seguir con Yasmina.' }
            ]
          }
        ] },
        { text: 'Observar las señales sin combatir', then: [
          'El aprendiz se detiene ante el farol azul. Sus Pokémon no tocan ni el carrito ni el agua.'
        ] }
      ] }
    ],
    cg_carga_t0_sintesis: [
      'Dalia coloca frente a ti un croquis, una etiqueta de práctica y dos hojas con el mismo número de remesa.',
      { say: 'cg_carga_dalia_olivo', text: 'El ejercicio no demuestra lo que pasó ayer. Sí te muestra por qué dos casillas con una misma remesa pueden contar historias diferentes.' },
      { choice: [
        { text: 'Una firma de papeles no acredita por sí misma la llegada de la caja', then: [
          { set: { 'flag.cg_carga_t0_anexo_fin': true } },
          { diary: 'Dalia nos permitió conocer la dársena de Olivo. Seguimos dos rutas separadas, comparamos una señal de cambio de turno con una inspección e hicimos una demostración con una caja vacía. Una ventanilla puede recibir documentos sin que la mercancía haya llegado; el ensayo no resuelve el caso, pero evita acusar a alguien por la hora de un formulario.', cond: 'flag.b01_diario' },
          { say: 'cg_carga_dalia_olivo', text: 'Regresa al almacén. Ya puedes comparar estas observaciones con la etiqueta, el peso y el libro originales de Yasmina.' }
        ] },
        { text: 'La demostración identifica a la persona que falsificó la fecha', then: [
          'No hubo falsificación probada en la maqueta y los sobres no tenían nombres. El ejercicio no puede decirte quién escribió la hoja original.',
          { say: 'rotom', text: '¡Bzzt! El modelo muestra posibilidades. No trae una lista de culpables.' }
        ] },
        { text: 'Dos ventanillas significan que hubo dos envíos', then: [
          'La misma caja se usó en la práctica. Dos acuses pueden corresponder a tareas diferentes, no a dos remesas.'
        ] }
      ] }
    ],
    cg_carga_t0_releer_ficha: [
      { read: 'cg_carga_t0_ficha' },
      { say: 'cg_carga_dalia_olivo', text: 'Este ejemplo habla de cómo se hacen los registros, no del resultado del expediente. Las pruebas de la caja real siguen con Yasmina.' }
    ]
  }
};