// Pokémon Infinite · ampliación incremental T5 (Olivo: segundo turno).
// Caso nocturno reconstruido a cualquier hora real. Dos plantas, acceso supervisado,
// un rompecabezas de palés, una falsa pista contrastable y dos vías de presentar pruebas.
// Módulo aislado: no modifica bloques publicados, medallas ni relaciones de protagonistas.
export default {
  npcs: {
    cg_carga_isela: {
      name: 'Isela', title: 'Auxiliar del turno de Olivo',
      look: { hair: 'tied', hairColor: '#503b36', eyes: '#728077', outfit: '#5e777b',
        outfit2: '#d7be84', skin: 3, acc: 'glasses', mouth: 'flat', bg: '#a9c0c5' }
    }
  },
  items: {
    cg_carga_t5_llave_copia: {
      name: 'Llave de consulta del turno', pocket: 'key',
      desc: 'Duplicado temporal autorizado por Isela. Abre el archivador de copias, no el almacén real.',
      read: 'OLIVO — LLAVE DE CONSULTA\n\nAutoriza abrir solo el archivador de copias de servicio en presencia de la auxiliar. No abre los contenedores de mercancías ni permite sacar bienes de terceros. La llave se obtuvo al resolver el modelo de palés de la entreplanta.'
    },
    cg_carga_t5_pliego: {
      name: 'Pliego del segundo turno', pocket: 'key',
      desc: 'Documento cotejado del muelle y la entreplanta. Muestra la diferencia entre un traspaso interno y una salida.',
      read: 'OLIVO — PLIEGO DE CUSTODIA\n\n22:40 — Entrada de carpeta de documentos (acuse en la casilla DOCUMENTACIÓN).\n23:10 — Carrito 18 reubicado dentro del muelle; firma del cambio de turno.\n23:30 — Inspección de bulto, aún sin salida registrada.\n\nObservación: un sello de «Reubicación» parecía una autorización de entrega al mirarlo aislado. El original registra un movimiento INTERNO y el asiento de salida sigue vacío.\n\nLa persona que firmó el control de turno no se convierte por ello en responsable del transporte.'
    }
  },
  locations: {
    cg_carga_t5_muelle: {
      name: 'Muelle del segundo turno', short: 'Muelle nocturno',
      parent: 'olivo', region: 'johto', kind: 'building',
      bg: { type: 'indoor' },
      desc: 'Una lámpara amarilla ilumina el almacén de Olivo. La escena reconstruye el segundo turno a las 23:10, independientemente de la hora del teléfono. Hay marcas de rueda, un libro de control, dos ventanillas y una escalera hacia la entreplanta. Cada registro pertenece a una operación distinta.',
      spots: [
        {
          label: 'Isela y el permiso de consulta', icon: '🧑‍💼',
          sub: 'Pide acceso al registro de turnos sin abrir mercancía privada',
          cond: 'flag.cg_carga_t5_inicio',
          new: '!flag.cg_carga_t5_permiso', doneIf: 'flag.cg_carga_t5_permiso',
          talk: [{ script: 'cg_carga_t5_permiso_escena' }]
        },
        {
          label: 'Borde del andén', icon: '🛞',
          sub: 'La misma rueda dejó huellas de frenado y de giro',
          cond: 'flag.cg_carga_t5_permiso',
          new: '!flag.cg_carga_t5_marca', doneIf: 'flag.cg_carga_t5_marca',
          talk: [{ script: 'cg_carga_t5_marca_rueda' }]
        },
        {
          label: 'Reloj y farol del relevo', icon: '🕰️',
          sub: 'Dos señales en el mismo turno, pero para tareas diferentes',
          cond: 'flag.cg_carga_t5_permiso',
          new: '!flag.cg_carga_t5_farol', doneIf: 'flag.cg_carga_t5_farol',
          talk: [{ script: 'cg_carga_t5_farol_escena' }]
        },
        {
          label: 'Pizarra de custodias', icon: '🗒️',
          sub: 'Compara a quien guardó la carpeta con quien recibió el bulto',
          cond: 'flag.cg_carga_t5_permiso',
          new: '!flag.cg_carga_t5_custodia', doneIf: 'flag.cg_carga_t5_custodia',
          talk: [{ script: 'cg_carga_t5_pizarra' }]
        },
        {
          label: 'Escalera a la entreplanta', icon: '🪜',
          sub: 'La maqueta de maniobras está arriba; no hay que esperar a la noche real',
          cond: 'flag.cg_carga_t5_permiso && flag.cg_carga_t5_marca && flag.cg_carga_t5_farol',
          action: { go: 'cg_carga_t5_entreplanta_area' }
        },
        {
          label: 'Comparar la declaración del guardia', icon: '🧭',
          sub: 'Distingue hechos, interpretaciones y una sospecha prematura',
          cond: 'flag.cg_carga_t5_marca && flag.cg_carga_t5_farol && flag.cg_carga_t5_custodia && flag.cg_carga_t5_pliego_obtenido && !flag.cg_carga_t5_reconstruccion',
          new: 'true', talk: [{ script: 'cg_carga_t5_cotejo' }]
        },
        {
          label: 'Guía para presentar la evidencia', icon: '📋',
          sub: 'Selecciona una forma de preguntar sin señalar culpables',
          cond: 'flag.cg_carga_t5_reconstruccion && !flag.cg_carga_t5_forma',
          new: 'true', talk: [{ script: 'cg_carga_t5_presentacion' }]
        },
        {
          label: 'Revisar la conclusión del segundo turno', icon: '📘',
          sub: 'Los dos asientos están preservados para futuras consultas',
          cond: 'flag.cg_carga_t5_forma',
          talk: [{ script: 'cg_carga_t5_despues' }]
        }
      ]
    },
    cg_carga_t5_entreplanta_area: {
      name: 'Entreplanta de Olivo', short: 'Entreplanta nocturna',
      parent: 'olivo', region: 'johto', kind: 'building',
      bg: { type: 'indoor' },
      desc: 'Palés apilados, pasarelas estrechas y un archivador al fondo. Un pasillo de práctica permite estudiar cómo se mueve una caja sin que salga del edificio. La caja original está precintada y no es necesario abrirla.',
      spots: [
        {
          label: 'Guion de la maniobra', icon: '📜',
          sub: 'Leer las instrucciones de la maqueta antes de mover un palé',
          cond: 'flag.cg_carga_t5_permiso',
          new: '!flag.cg_carga_t5_manual', doneIf: 'flag.cg_carga_t5_manual',
          talk: [{ script: 'cg_carga_t5_manual' }]
        },
        {
          label: 'Maqueta del corredor de palés', icon: '🧩',
          sub: 'Mueve la caja a la placa sin cerrar el pasillo de consulta',
          cond: 'flag.cg_carga_t5_manual && !flag.cg_carga_t5_pales',
          new: 'true', talk: [{ script: 'cg_carga_t5_pales_puzzle' }]
        },
        {
          label: 'Casillero de copias', icon: '🗝️',
          sub: 'Solo se abre cuando termina el ejercicio de los palés',
          cond: 'flag.cg_carga_t5_pales',
          new: '!flag.cg_carga_t5_pliego_obtenido',
          doneIf: 'flag.cg_carga_t5_pliego_obtenido',
          talk: [{ script: 'cg_carga_t5_casillero' }]
        },
        {
          label: 'Letrero de salida de emergencia', icon: '🚪',
          sub: 'El nombre que parecía una ruta de entrega era otra cosa',
          cond: 'flag.cg_carga_t5_manual',
          new: '!flag.cg_carga_t5_falsa_pista',
          doneIf: 'flag.cg_carga_t5_falsa_pista',
          talk: [{ script: 'cg_carga_t5_falso_destino' }]
        },
        {
          label: 'Regresar al muelle', icon: '⬇️',
          sub: 'La reconstrucción continúa en la planta baja',
          action: { go: 'cg_carga_t5_muelle' }
        }
      ]
    }
  },
  patches: {
    olivo: {
      spots: [
        {
          label: 'Muelle del segundo turno', icon: '🌙',
          sub: 'Investiga con permiso una reconstrucción nocturna, jugable a cualquier hora',
          cond: 'flag.cg_carga_t5_inicio',
          new: '!flag.cg_carga_t5_reconstruccion',
          action: { go: 'cg_carga_t5_muelle' }
        }
      ]
    }
  },
  scripts: {
    cg_carga_t5_permiso_escena: [
      'Isela apaga una de las lámparas. No porque quiera ocultar nada: una ráfaga de aire está llenando de humo la sala de documentos.',
      { say: 'cg_carga_isela', text: 'El segundo turno es una reconstrucción de las 23:10, no un evento del reloj del entrenador. Si vienes por las firmas, pide copias. El almacén de terceros sigue cerrado.' },
      { choice: [
        { text: 'Pedir copias y seguir las maniobras sin abrir cajas', then: [
          { set: { 'flag.cg_carga_t5_permiso': true } },
          { say: 'cg_carga_isela', text: 'Puedes mirar el andén, el reloj y la pizarra. La entreplanta usa una maqueta para no mover una caja real.' },
          'Isela registra tu visita. Anotar quién consulta un documento no significa asignarle la responsabilidad del envío.'
        ] },
        { text: 'Insistir en abrir el contenedor más antiguo', then: [
          { say: 'cg_carga_isela', text: 'No tenemos autorización ni razón para hacerlo. El precinto pertenece al dueño del bulto, no al archivo.' },
          { say: 'rotom', text: '¡Bzzt! No necesitamos romper un sello para saber qué dice otro.' }
        ] },
        { text: 'Volver cuando haya terminado el turno', then: [
          { say: 'cg_carga_isela', text: 'No hace falta esperar al reloj. Si estás cansado, puedes irte y volver desde la ciudad cuando quieras.' }
        ] }
      ] }
    ],
    cg_carga_t5_marca_rueda: [
      'En el borde del muelle, dos marcas de goma se cruzan. Una es recta; la otra hace un arco corto y regresa a la misma hilera de estantes.',
      { say: 'rotom', text: '¡Bzzt! Alguien anotó dos movimientos. ¿Hubo dos entregas o un solo carrito cambiando de sitio?' },
      { choice: [
        { text: 'Seguir las dos marcas hasta donde terminan', then: [
          'Ambas terminan dentro del almacén, junto al palé del carrito 18. Ninguna llega a la puerta exterior.',
          { set: { 'flag.cg_carga_t5_marca': true } },
          'El segundo trazo representa un giro interno, no una segunda salida.'
        ] },
        { text: 'Interpretar el arco como una vía de escape', then: [
          'El arco gira hacia el mismo estante. La puerta más cercana está al otro lado del edificio. No hay huella en el umbral.',
          { say: 'cg_carga_isela', text: 'Si alguien escapó, este rastro no lo demuestra.' }
        ] },
        { text: 'Comparar el ancho de las ruedas', then: [
          'Las marcas tienen la misma anchura y el mismo desgaste en un borde. El mismo carrito puede haber hecho dos maniobras.',
          { set: { 'flag.cg_carga_t5_marca': true } },
          'Apuntas una coincidencia física; todavía no atribuye una firma a nadie.'
        ] }
      ] }
    ],
    cg_carga_t5_farol_escena: [
      'El farol de relevo se colgó de una barra a las 23:10. Debajo hay un reloj parado y un pequeño timbre que indica el fin de una inspección.',
      { choice: [
        { text: 'Comparar la señal de cambio con la del timbre', then: [
          'Cambiar el farol autorizó al siguiente vigilante a ocupar su puesto. El timbre sonó al terminar una revisión del andén. Ninguna señal ordenó sacar mercancías.',
          { set: { 'flag.cg_carga_t5_farol': true } },
          { say: 'rotom', text: '¡Bzzt! Un cambio de guardia no es una entrega; dos sonidos tampoco son dos cajas.' }
        ] },
        { text: 'Copiar 23:10 como hora de salida de la caja', then: [
          'El reloj muestra cuándo se efectuó el relevo, no la salida. La casilla de transporte está en blanco.',
          'Isela vuelve a colgar el farol. «Las horas no tienen significado sin una operación a la que pertenezcan».'
        ] },
        { text: 'Preguntar si alguien apagó el farol a propósito', then: [
          'La llama se apagó cuando entró viento por la rendija de una puerta. El registro de seguridad ya señala la ráfaga.',
          'No hay motivo para convertir un incidente común en sabotaje.'
        ] }
      ] }
    ],
    cg_carga_t5_pizarra: [
      'La pizarra tiene casillas independientes: DOCUMENTO, REUBICACIÓN, DESPACHO y RECEPCIÓN. Dos iniciales ocupan columnas distintas.',
      { choice: [
        { text: 'Leer cada inicial junto al título de su columna', then: [
          'Una persona recibió la carpeta y otra movió un carrito dentro del edificio. Las casillas de despacho y de recepción física todavía estaban vacías en ese momento.',
          { set: { 'flag.cg_carga_t5_custodia': true } },
          'Las iniciales no son una acusación: nombran encargos concretos.'
        ] },
        { text: 'Unir las dos iniciales como si fueran una firma', then: [
          'Cada marca pertenece a una columna diferente. La pizarra no permite afirmar que la misma persona hiciera ambas tareas.'
        ] },
        { text: 'Suponer que una casilla vacía prueba un robo', then: [
          'Una casilla vacía muestra ausencia de anotación. Hace falta evidencia adicional para saber por qué no se llenó.',
          { say: 'cg_carga_isela', text: 'A veces la respuesta no es quién faltó, sino qué documento se estaba llenando.' }
        ] }
      ] }
    ],
    cg_carga_t5_manual: [
      'La maqueta tiene una placa sensible en el corredor de los palés y una puerta que conduce al archivador. Una marca de tiza recomienda despejar el paso antes de mover piezas.',
      { choice: [
        { text: 'Leer el recorrido desde el pasillo de seguridad', then: [
          'La caja de práctica debe colocarse sobre la placa S para abrir la puerta D. El archivo se alcanza después, sin tocar las cajas reales.',
          { set: { 'flag.cg_carga_t5_manual': true } },
          { say: 'cg_carga_isela', text: 'Si la pieza se atasca, deshaz un movimiento. La maqueta registra el procedimiento, no tu paciencia.' }
        ] },
        { text: 'Abrir directamente el archivador real', then: [
          'El archivador de copias tiene un pestillo distinto. La llave de consulta se obtiene en la maqueta. Las cajas privadas permanecen cerradas.'
        ] }
      ] }
    ],
    cg_carga_t5_pales_puzzle: [
      'El corredor de práctica muestra un palé móvil y una placa que libera el paso a los registros. El ejercicio está diseñado para hacerse sin arrastrar una caja del almacén.',
      { puzzle: {
        id: 'cg_carga_t5_corredor_pales',
        title: 'Corredor de palés de Olivo',
        hint: 'Empuja la caja R hacia la placa S. La puerta D se abre al pisar el interruptor con la caja; llega a G.',
        theme: 'lab',
        grid: [
          '########',
          '#P....##',
          '#.R...##',
          '#..S..##',
          '#...####',
          '###D.G##',
          '########'
        ]
      },
      onSolve: [
        { set: { 'flag.cg_carga_t5_pales': true } },
        'La placa queda presionada y se abre un compartimiento con una copia del acceso a archivos.',
        { if: '!flag.cg_carga_t5_llave', then: [
          { give: 'cg_carga_t5_llave_copia' },
          { set: { 'flag.cg_carga_t5_llave': true } },
          { say: 'cg_carga_isela', text: 'Ahora sí. La llave solo abre el casillero de registros, y yo debo estar presente.' }
        ] }
      ],
      onQuit: [
        { say: 'rotom', text: '¡Bzzt! La maqueta conserva la posición inicial. Podemos volver sin perder las notas.' }
      ] }
    ],
    cg_carga_t5_casillero: [
      'El archivador contiene el pliego del segundo turno y una hoja amarilla de mantenimiento. El sello grande podría parecer un «enviado», pero el encabezado dice «reubicado».',
      { choice: [
        { text: 'Comparar el sello con el título del asiento', then: [
          'La hoja señala que el carro 18 cambió de lugar a las 23:10. No dice que saliera de Olivo. El registro de despacho quedó sin firma.',
          { if: '!flag.cg_carga_t5_pliego_obtenido', then: [
            { give: 'cg_carga_t5_pliego' },
            { set: { 'flag.cg_carga_t5_pliego_obtenido': true } },
            { say: 'cg_carga_isela', text: 'Llévate la copia. Nadie necesita sacar la hoja original de la estantería.' }
          ] }
        ] },
        { text: 'Buscar un culpable en el sello grande', then: [
          'El sello no es una firma personal. Aparece en varios formularios de movimiento interno, incluso cuando el almacén permanece cerrado.',
          { say: 'rotom', text: '¡Bzzt! Si el título dice REUBICACIÓN, debemos empezar por ahí.' }
        ] }
      ] }
    ],
    cg_carga_t5_falso_destino: [
      'Una flecha roja apunta a «SALIDA 18». Sobre la madera hay una pequeña chapa con una mancha que casi tapa la palabra «emergencia».',
      { choice: [
        { text: 'Seguir la flecha y examinar la puerta', then: [
          'La puerta no tiene andén, solo una escalera de evacuación. «18» es el número del extintor situado a su lado, no un vagón.',
          { set: { 'flag.cg_carga_t5_falsa_pista': true } },
          'La flecha parecía un destino nuevo hasta que comprobaste su contexto.'
        ] },
        { text: 'Registrar la flecha como una salida secreta', then: [
          'Desde aquí no se puede cargar un carro y no hay marcas de rueda. Es una señal de emergencia, no una prueba de contrabando.',
          { say: 'cg_carga_isela', text: 'Nunca confundas un número junto a una puerta con el manifiesto de un vagón.' }
        ] },
        { text: 'Mirar el extintor sin seguir la flecha', then: [
          'La etiqueta del extintor también dice 18. Ya puedes descartar la hipótesis de otra salida.',
          { set: { 'flag.cg_carga_t5_falsa_pista': true } }
        ] }
      ] }
    ],
    cg_carga_t5_cotejo: [
      'En el muelle, ordenas tres hechos materiales: el giro del carrito, la hora del farol y la copia del pliego. Isela coloca también la pizarra de custodias.',
      { say: 'cg_carga_isela', text: 'La hoja deja constancia de un movimiento interno. Si alguien dice que hubo una entrega exterior, debe señalar una salida y una recepción física.' },
      { choice: [
        { text: 'La firma del relevo demuestra que el carrito salió', then: [
          'La firma está en la columna de cambio de guardia. El carrito no dejó huellas en la puerta ni tiene asiento de despacho.',
          { say: 'rotom', text: '¡Bzzt! La firma es verdadera; la conclusión sobre el viaje no lo es.' }
        ] },
        { text: 'El carrito se reubicó; los documentos sí pudieron pasar entre manos', then: [
          'El giro de la rueda y el pliego permiten separar un movimiento interno, un relevo de guardia y la recepción documental.',
          { if: '!flag.cg_carga_t5_reconstruccion', then: [
            { set: { 'flag.cg_carga_t5_reconstruccion': true } },
            { diary: 'En el segundo turno de Olivo verificamos la entrada documental, el movimiento interno de un carrito y la firma de relevo. Las tres cosas ocurrieron, pero ninguna demuestra por sí sola una entrega fuera del almacén. También descartamos la falsa salida del piso superior al examinar su señal de emergencia.', cond: 'flag.b01_diario' }
          ] },
          { say: 'cg_carga_isela', text: 'Ahora sí tenemos un relato comprobable. Falta decidir cómo preguntárselo al encargado sin suponer lo que hizo.' }
        ] },
        { text: 'La flecha roja demuestra que había una salida clandestina', then: [
          'La flecha señalaba una puerta de emergencia. La chapa del extintor 18 y la falta de marcas de carro contradicen esa explicación.',
          { if: '!flag.cg_carga_t5_falsa_pista', then: [
            'Aún puedes subir a inspeccionarla. Una hipótesis debe poder ponerse a prueba.'
          ] }
        ] }
      ] }
    ],
    cg_carga_t5_presentacion: [
      'Yasmina llega a la mesa con el expediente abierto. El encargado espera junto a la puerta; todavía no lo has interrogado sobre este turno.',
      { say: 'yasmina', text: 'Podemos mostrarle primero el pliego o pedirle que cuente su turno desde el principio. Cualquiera de las dos vías sirve si no confundimos preguntas con acusaciones.' },
      { choice: [
        { text: 'Mostrarle el pliego primero y pedirle que corrija los asientos', then: [
          { set: { 'flag.cg_carga_t5_forma': true, 'flag.cg_carga_t5_forma_documento': true } },
          'El encargado recibirá primero los documentos y después podrá explicar qué hizo durante el relevo.',
          { say: 'yasmina', text: 'Primero el registro, luego la respuesta. Así puede señalar exactamente qué casilla necesita corrección.' }
        ] },
        { text: 'Escuchar primero su versión y cotejarla después', then: [
          { set: { 'flag.cg_carga_t5_forma': true, 'flag.cg_carga_t5_forma_dialogo': true } },
          'El encargado tendrá espacio para explicar el turno antes de leer la reconstrucción.',
          { say: 'yasmina', text: 'Primero el testimonio, luego el registro. Vamos a conservar ambas fuentes por separado.' }
        ] },
        { text: 'Acusarlo antes de que vea las pruebas', then: [
          'Yasmina cierra el expediente. «No hay prueba de que él duplicara el movimiento. Si empezamos con una acusación, solo tendremos una discusión».',
          { say: 'rotom', text: '¡Bzzt! Preguntar no significa absolver ni acusar: significa verificar.' }
        ] }
      ] }
    ],
    cg_carga_t5_despues: [
      { read: 'cg_carga_t5_pliego' },
      { if: 'flag.cg_carga_t5_forma_documento', then: [
        { say: 'cg_carga_isela', text: 'Tu presentación empieza por la hoja. Deja que la persona explique lo que el documento no puede contar.' }
      ], else: [
        { say: 'cg_carga_isela', text: 'Elegiste escuchar antes de mostrar las pruebas. Conserva ambas versiones sin mezclarlas.' }
      ] },
      'La decisión no añade una medalla ni cambia la historia principal; orienta la conversación con el encargado.'
    ]
  }
};