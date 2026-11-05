// Pokémon Infinite · propuesta aislada · T6 y T7 + cierre de Johto.
// Premios no repetibles; ningún cambio a la gira ni estados de personajes.
// No publicar sin auditoría extensa y pruebas de duración.
export default {
  items: {
    cg_carga_recibo: {
      name: 'Recibo corregido de Johto', pocket: 'key',
      desc: 'Una copia que separa la recepción documental de la recepción de mercancía.',
      read: 'ACTA DE RECTIFICACIÓN\n\nSe distingue ENTREGA DE DOCUMENTOS de ENTREGA FÍSICA. La hora del primer asiento no acredita que el bulto haya llegado a Olivo en ese momento.\n\nLas personas implicadas no aparecen identificadas en esta copia para evitar acusaciones que no sustentan las pruebas.'
    }
  },
  patches: {
    olivo: { spots: [
      { label: 'Mesa de pruebas completas', icon: '📑', sub: 'Seis observaciones y dos columnas diferentes',
        cond: 'flag.cg_carga_t5_fin && !flag.cg_carga_t6_fin',
        new: '!flag.cg_carga_t6_inicio', talk: [{ script: 'cg_carga_recibo_inicio' }] },
      { label: 'Cuaderno de movimientos', icon: '📘', sub: 'Qué significa cada fecha',
        cond: 'flag.cg_carga_t6_inicio && !flag.cg_carga_t6_fin',
        new: '!flag.cg_carga_t6_hojas', doneIf: 'flag.cg_carga_t6_hojas',
        talk: [{ script: 'cg_carga_recibo_hojas' }] },
      { label: 'Reverso de la copia', icon: '🪶', sub: 'La tinta seca debajo de la marca de humedad',
        cond: 'flag.cg_carga_t6_inicio && !flag.cg_carga_t6_fin',
        new: '!flag.cg_carga_t6_tinta', doneIf: 'flag.cg_carga_t6_tinta',
        talk: [{ script: 'cg_carga_recibo_tinta' }] },
      { label: 'Libro de entrega', icon: '📦', sub: 'La firma sin dueño y la casilla con destino',
        cond: 'flag.cg_carga_t6_inicio && !flag.cg_carga_t6_fin',
        new: '!flag.cg_carga_t6_casilla', doneIf: 'flag.cg_carga_t6_casilla',
        talk: [{ script: 'cg_carga_recibo_casilla' }] },
      { label: 'Decidir qué corregir', icon: '🖋️', sub: 'Separar hechos demostrados de hipótesis',
        cond: 'flag.cg_carga_t6_hojas && flag.cg_carga_t6_tinta && flag.cg_carga_t6_casilla && !flag.cg_carga_t6_fin',
        new: 'true', talk: [{ script: 'cg_carga_recibo_deduccion' }] },
      { label: 'Entregar el documento en persona', icon: '📨', sub: 'Hay tres lugares donde verificar que la corrección sirve',
        cond: 'flag.cg_carga_t6_fin && !flag.cg_carga_t7_fin',
        new: 'flag.cg_carga_t7_trigal && flag.cg_carga_t7_iris && flag.cg_carga_t7_caoba',
        talk: [{ script: 'cg_carga_entrega_inicio' }] },
      { label: 'Cerrar la carpeta del caso', icon: '📚', sub: 'Reúne los tres acuses sin adelantar la historia principal',
        cond: 'flag.cg_carga_t7_trigal && flag.cg_carga_t7_iris && flag.cg_carga_t7_caoba && !flag.cg_carga_t7_fin',
        new: 'true', talk: [{ script: 'cg_carga_entrega_final' }] },
      { label: 'Recuerdo del envío de Johto', icon: '📦', sub: 'La caja ya no tiene números contradictorios',
        cond: 'flag.cg_carga_t7_fin', talk: [{ script: 'cg_carga_epilogo' }] },
      { label: 'Reconocimiento por la investigación', icon: '⭐',
        sub: 'Disponible cuando el tope de nivel del viaje ya haya alcanzado 74',
        cond: 'done.cg_carga_johto && !flag.cg_carga_cap_recibido && vars.cap >= 74',
        new: 'true', talk: [{ script: 'cg_carga_cap_claim' }] }
    ] },
    trigal: { spots: [
      { label: 'Acuse de Trigal', icon: '📝', sub: 'El patio confirma su copia corregida',
        cond: 'flag.cg_carga_t6_fin && !flag.cg_carga_t7_trigal',
        new: 'true', talk: [{ script: 'cg_carga_entrega_trigal' }] },
      { label: 'Pizarra rectificada', icon: '🕒', sub: 'Preparación, salida y recepción ya no comparten columna',
        cond: 'flag.cg_carga_t7_fin', talk: [{ script: 'cg_carga_trigal_despues' }] }
    ] },
    iris: { spots: [
      { label: 'Acuse de Iris', icon: '🧭', sub: 'Los guías verifican el cambio de formulario',
        cond: 'flag.cg_carga_t6_fin && !flag.cg_carga_t7_iris',
        new: 'true', talk: [{ script: 'cg_carga_entrega_iris' }] },
      { label: 'Mesa de los tres guías', icon: '📜', sub: 'La firma ya tiene su contexto',
        cond: 'flag.cg_carga_t7_fin', talk: [{ script: 'cg_carga_iris_final' }] }
    ] },
    caoba: { spots: [
      { label: 'Acuse del canal de Caoba', icon: '💦', sub: 'Revisar que la ruta de agua esté protegida',
        cond: 'flag.cg_carga_t6_fin && !flag.cg_carga_t7_caoba',
        new: 'true', talk: [{ script: 'cg_carga_entrega_caoba' }] },
      { label: 'Orilla de Wooper', icon: '🌿', sub: 'La corriente sigue su curso',
        cond: 'flag.cg_carga_t7_fin', talk: [{ script: 'cg_carga_caoba_final' }] }
    ] }
  },
  scripts: {
    cg_carga_recibo_inicio: [
      'En Olivo han extendido los papeles encima de una mesa de trabajo. Nadie se ha quedado de pie en el centro: no hay juicio ni acusados.',
      { say: 'yasmina', text: 'Antes de corregir una hoja, necesito que confirmes algo: qué sabemos por observación y qué solo parece probable.' },
      'Hay tres grupos de pruebas: la secuencia de movimientos, la tinta sobre el papel y la casilla que realmente recibió la firma.',
      { set: { 'flag.cg_carga_t6_inicio': true } },
      { quest: 'cg_carga_johto', stage: 'recibo' }
    ],
    cg_carga_recibo_hojas: [
      'Juntas Olivo, Trigal e Iris en una línea de tiempo. Cada copia tiene una fecha y un propósito.',
      { choice: [
        { text: 'Separar hechos confirmados de horarios referidos', then: [
          'Confirmados: el envío fue preparado y salió; en Olivo se registró un documento. No confirmado: que esa misma hora llegara la mercancía.',
          { if: '!flag.cg_carga_t6_hojas', then: [
            { set: { 'flag.cg_carga_t6_hojas': true } },
            'Anotas: «La cronología no puede basarse en una hora que está bajo investigación».'
          ] }
        ] },
        { text: 'Tomar el horario de llegada como incuestionable', then: [
          'Esa casilla es justo la que causa la contradicción. Aceptarla sin prueba no resuelve nada.'
        ] },
        { text: 'Declarar falsos todos los horarios', then: [
          'Las horas de Trigal se verificaron con la salida del tren. Desecharlas por el error de Olivo sería perder una prueba útil.'
        ] }
      ] }
    ],
    cg_carga_recibo_tinta: [
      'Revisas de nuevo la humedad en el documento. La fecha tiene una marca de agua; la firma está escrita encima de la zona ya seca.',
      { choice: [
        { text: 'Distinguir el orden relativo de los trazos', then: [
          'Puedes afirmar que hubo dos momentos de escritura. No puedes identificar a una persona solo a partir de una mancha.',
          { if: '!flag.cg_carga_t6_tinta', then: [
            { set: { 'flag.cg_carga_t6_tinta': true } },
            'Anotas: «Firma posterior a la humedad; autor todavía no acreditado».'
          ] }
        ] },
        { text: 'Adivinar la persona por la caligrafía', then: [
          'Las muestras de dos empleados eran casi idénticas. Una coincidencia de letras no basta para acusar.'
        ] },
        { text: 'Ignorar la marca de agua', then: [
          'En ese caso queda sin explicar por qué una zona de tinta se corrió y otra no.'
        ] }
      ] }
    ],
    cg_carga_recibo_casilla: [
      'La palabra RECIBIDO aparece dos veces en el formulario. Solo uno de los campos menciona físicamente al bulto.',
      { choice: [
        { text: 'Leer el encabezado completo de cada casilla', then: [
          '«Documentos recibidos» no significa «mercancía recibida». La firma antigua está dentro de la primera columna.',
          { if: '!flag.cg_carga_t6_casilla', then: [
            { set: { 'flag.cg_carga_t6_casilla': true } },
            'Anotas: «La firma certifica papeles; la mercancía tiene otra recepción».'
          ] }
        ] },
        { text: 'Mirar solo la palabra RECIBIDO', then: [
          'Las dos casillas dicen RECIBIDO. Sin la otra mitad del título no se sabe qué recibió cada persona.'
        ] },
        { text: 'Suponer que el firmante ocultó su nombre', then: [
          'No hay una casilla de nombre borrado. El formulario nunca pidió que quedaran todos los nombres en una copia abierta al público.'
        ] }
      ] }
    ],
    cg_carga_recibo_deduccion: [
      { say: 'yasmina', text: 'Las pruebas ya están. Dame la explicación que podrías sostener delante de quienes trabajaron ese día.' },
      { choice: [
        { text: 'Un trabajador falsificó la firma para robar la carga', then: [
          'No existe prueba de robo ni de identidad del firmante. Sería una acusación sin base.',
          { say: 'yasmina', text: 'No pondremos un nombre en un documento si no tenemos algo que lo sostenga.' }
        ] },
        { text: 'La recepción del papel se confundió con la del bulto', then: [
          'La fecha del formulario pertenece a una copia que viajó por una ruta diferente. El bulto no llegó antes de salir: se confundieron dos recepciones.',
          { set: { 'flag.cg_carga_t6_deduccion': true } },
          { call: 'cg_carga_recibo_decision' }
        ] },
        { text: 'La caja viajó en dos direcciones al mismo tiempo', then: [
          'Los sellos prueban dos operaciones, no dos cajas; las huellas muestran movimientos dentro del almacén.',
          { say: 'rotom', text: '¡Bzzt! Una caja no es una paradoja por tener más de una hoja.' }
        ] }
      ] }
    ],
    cg_carga_recibo_decision: [
      { say: 'yasmina', text: 'Ahora queda una decisión que sí nos toca: cómo dejar constancia para evitar que vuelva a pasar sin exponer a quienes no hicieron nada malo.' },
      { choice: [
        { text: 'Rectificación pública sin nombres', then: [
          { set: { 'flag.cg_carga_t6_publica': true, 'flag.cg_carga_t6_fin': true } },
          { say: 'yasmina', text: 'Se publicará el procedimiento y la fecha correcta, sin un nombre al que señalar. Lo importante es que nadie repita el error.' },
          { call: 'cg_carga_recibo_cierre' }
        ] },
        { text: 'Reunión con los involucrados y constancia reservada', then: [
          { set: { 'flag.cg_carga_t6_reservada': true, 'flag.cg_carga_t6_fin': true } },
          { say: 'yasmina', text: 'Hablaremos primero con ellos. El procedimiento se corregirá igualmente. La copia que viaja no llevará datos personales.' },
          { call: 'cg_carga_recibo_cierre' }
        ] }
      ] }
    ],
    cg_carga_recibo_cierre: [
      { give: 'cg_carga_recibo' },
      { read: 'cg_carga_recibo' },
      { quest: 'cg_carga_johto', stage: 'entrega' },
      { say: 'rotom', text: '¡Bzzt! ¡Ahora toca una entrega verdadera! Si tres sitios confirman que entienden la corrección, el papel habrá servido.' },
      'Puedes visitar en cualquier orden el patio de Trigal, la mesa de los guías de Iris y el canal de Caoba. Las tres confirmaciones van a la carpeta.'
    ],
    cg_carga_entrega_inicio: [
      { if: '!flag.cg_carga_t7_trigal', then: ['Falta el acuse del patio de Trigal, donde comenzó el traslado.'] },
      { if: '!flag.cg_carga_t7_iris', then: ['Falta el acuse de los guías de Iris, que separaron el documento del viaje.'] },
      { if: '!flag.cg_carga_t7_caoba', then: ['Falta el acuse de Caoba, que conserva la referencia al canal.'] },
      { if: 'flag.cg_carga_t7_trigal && flag.cg_carga_t7_iris && flag.cg_carga_t7_caoba', then: [
        { say: 'yasmina', text: 'Ahora sí. Están los tres acuses, cada uno confirma una cosa distinta. Podemos cerrar la carpeta juntos.' }
      ] }
    ],
    cg_carga_entrega_trigal: [
      'El conductor del patio vuelve a enrollar su cuerda. Esta vez deja una vuelta sin apretar para poder añadir un nudo.',
      '«Así está mejor: yo preparé unas cajas y otro se llevó el formulario. Antes parecía que debía responder por las dos cosas».',
      { if: 'flag.cg_carga_t6_publica', then: [
        'En la pizarra hay una hoja pública con una nueva regla: «No usar firma de papeles como prueba de entrega de mercancía».'
      ], else: [
        'El encargado muestra una nota del nuevo procedimiento: «Cada turno firma lo que realmente recibe».'
      ] },
      { set: { 'flag.cg_carga_t7_trigal': true } },
      { say: 'rotom', text: '¡Bzzt! ¡Un acuse! ¡Este sí dice lo que confirma!' }
    ],
    cg_carga_entrega_iris: [
      'Los tres guías se ponen de acuerdo en algo por primera vez: ninguno había firmado por una mercancía que no vio.',
      'El primero dibuja el camino correcto; la segunda señala el farol; la tercera acomoda el papel seco dentro de una funda.',
      { if: 'flag.cg_carga_t6_publica', then: [
        '«Que lo lea cualquiera», dice el primer guía. «Así la próxima persona no pasará tres días intentando descifrarlo».'
      ], else: [
        '«Me gusta que nos hayan preguntado antes», dice la segunda guía. «Es mejor entenderlo que ver nuestro nombre en un tablón».'
      ] },
      { set: { 'flag.cg_carga_t7_iris': true } },
      'La copia que dejan para el archivo tiene tres comprobaciones y ninguna acusación.'
    ],
    cg_carga_entrega_caoba: [
      'El canal corre libre junto a las plantas. Wooper asoma la cabeza, observa la superficie y vuelve a meterse.',
      { if: 'flag.cg_carga_t3_cauce', then: [
        'El encargado ha dejado una señal donde despejaste la rejilla: «Revisar después de lluvias fuertes».'
      ], else: [
        'La cuerda que pusiste se ha convertido en una señal de madera. El encargado hizo la revisión que pidió tu nota.'
      ] },
      'Una copia del registro deja claro que la tabla del canal era material de apoyo, no una prueba de recepción del bulto.',
      { set: { 'flag.cg_carga_t7_caoba': true } },
      { say: 'rotom', text: '¡Bzzt! ¡Acuse número tres! ¡Y Wooper nos mira sin querer morder nuestros dedos! Eso cuenta como éxito.' }
    ],
    cg_carga_entrega_final: [
      'Yasmina coloca los tres acuses sobre la mesa. Los encabezados coinciden con lo que cada persona realmente hizo.',
      { say: 'yasmina', text: 'Cuando llegaste, yo pensaba que necesitaba descubrir quién había firmado algo imposible. Resultó que tenía que averiguar qué significaba esa firma.' },
      { say: 'yasmina', text: 'Gracias por no convertir una duda en una condena. No siempre sale así.' },
      { choice: [
        { text: 'Anotar también lo que no pudimos demostrar', then: [
          { set: { 'flag.cg_carga_t7_humilde': true } },
          'En el margen añades una línea: «Autor de la firma no acreditado; no se infiere responsabilidad personal».',
          { call: 'cg_carga_fin' }
        ] },
        { text: 'Dejar los hechos probados y archivar la hipótesis', then: [
          { set: { 'flag.cg_carga_t7_clara': true } },
          'Cierras la carpeta con una hoja de resumen: «Se corrigió una confusión entre recepción de documentos y mercancía».',
          { call: 'cg_carga_fin' }
        ] }
      ] }
    ],
    cg_carga_fin: [
      { money: 2400 },
      { give: 'maxpotion', n: 2 },
      { set: { 'flag.cg_carga_t7_fin': true } },
      { quest: 'cg_carga_johto', stage: 'hecha', done: true },
      { say: 'yasmina', text: 'Toma esto por tu tiempo y el cuidado con que trabajaste. Si tu viaje ya llegó al nivel de desafíos del tramo más reciente, también hay un reconocimiento especial.' },
      { if: 'vars.cap >= 74 && vars.cap < 76', then: [
        { call: 'cg_carga_cap_claim' }
      ] },
      { if: 'vars.cap < 74', then: [
        { say: 'rotom', text: '¡Bzzt! El reconocimiento de nivel se guardará en Olivo para cuando el progreso de la aventura ya admita el tope 74. No vamos a saltarnos otros bloques.' }
      ] },
      { if: 'vars.cap >= 76', then: [
        { say: 'rotom', text: '¡Bzzt! Tu límite ya es 76 o superior; no hay que bajarlo ni entregar dos veces el mismo reconocimiento.' }
      ] },
      { diary: 'Hoy cerramos la carpeta del envío de Johto. Al principio parecía que una caja había llegado antes de salir. En realidad habían mezclado la hora de recibir un documento con la hora de recibir la carga. Fuimos a Trigal, Iris y Caoba a que cada persona confirmara su parte. Lo mejor no fue encontrar a quién culpar, sino impedir que un error se convierta en culpa para alguien que no la merece.', cond: 'flag.b01_diario' }
    ],
    cg_carga_cap_claim: [
      { if: '!flag.cg_carga_cap_recibido && vars.cap >= 74 && vars.cap < 76', then: [
        { cap: 76 },
        { set: { 'flag.cg_carga_cap_recibido': true } },
        { say: 'rotom', text: '¡Bzzt! Tu nivel límite ha subido a **76**. Se ha aplicado una sola vez, como premio de la aventura paralela.' }
      ] },
      { if: '!flag.cg_carga_cap_recibido && vars.cap >= 76', then: [
        { set: { 'flag.cg_carga_cap_recibido': true } },
        { say: 'rotom', text: '¡Bzzt! Ya tienes un límite igual o mayor. Conservamos el que es más alto.' }
      ] }
    ],
    cg_carga_epilogo: [
      'La caja del almacén tiene ahora dos hojas distintas: «Papeles recibidos» y «Mercancía recibida». Las dos están fechadas.',
      { if: 'flag.cg_carga_t6_publica', then: [
        'En el tablón público, las columnas están separadas y una copia explica por qué se cambió el procedimiento.'
      ], else: [
        'Dentro, el personal ha aprendido a firmar por separado cada movimiento. Afuera no hay nombres expuestos.'
      ] },
      { say: 'yasmina', text: 'Puedo dormir mejor cuando sé que los números describen lo que hacemos. No lo arreglaste con fuerza, sino mirando bien.' }
    ],
    cg_carga_trigal_despues: [
      'La pizarra distingue una salida de vagón de un despacho de formulario. El conductor te levanta una mano mientras termina un nudo.'
    ],
    cg_carga_iris_final: [
      'Los guías siguen sin ponerse de acuerdo sobre quién llegó primero al puente, pero su copia de la entrega ya no se contradice.'
    ],
    cg_carga_caoba_final: [
      'Wooper saluda a su manera: una burbuja que sube desde el agua y estalla junto a la orilla.'
    ]
  }
};
