// Pokémon Infinite · Ampliación T6: el original no se borra.
// Dos salas de archivo en Olivo. El jugador reconstruye un recibo mediante
// casillas distintas, auditoría de cambios y prueba de claridad para terceros.
// No se modifica el envío principal, las identidades, las medallas ni otros bloques.
export default {
  npcs: {
    cg_carga_celia: {
      name: 'Celia', title: 'Revisora de la oficina de archivos',
      look: { hair: 'short', hairColor: '#5f433a', eyes: '#576779', outfit: '#68829a',
        outfit2: '#dfcfaa', skin: 2, acc: 'glasses', mouth: 'flat', bg: '#c5d4d5' }
    }
  },
  items: {
    cg_carga_t6_calco: {
      name: 'Calco de las dos casillas', pocket: 'key',
      desc: 'Copia anonimizada que deja ver encabezados y la secuencia de asientos del recibo.',
      read: 'OFICINA DE OLIVO — CALCO\n\nEl primer asiento dice DOCUMENTOS RECIBIDOS. El segundo, MERCANCÍA RECIBIDA.\n\nSe preservan por separado la fecha de emisión, la de recepción de la carpeta y la llegada del bulto.\n\nLa firma del primer asiento puede ser auténtica sin demostrar que el bulto estaba en ese lugar. No se deduce la identidad de un firmante a partir de la caligrafía.'
    },
    cg_carga_t6_borrador: {
      name: 'Borrador de rectificación', pocket: 'key',
      desc: 'Formulario de prueba con campos y notas de corrección, listo para cotejar con el original.',
      read: 'BORRADOR DE RECTIFICACIÓN — OLIVO\n\nLa casilla de DOCUMENTOS conserva la fecha y su firma originales. La casilla de MERCANCÍA se completa con su acuse propio, sin anticipar la llegada.\n\nLas correcciones se incorporan como anotaciones adicionales con motivo y fecha, nunca como tachaduras que oculten los asientos de origen.\n\nLos datos personales se mantienen fuera de las copias de consulta. La decisión de publicitar el procedimiento o comunicarlo en privado corresponde al cierre del caso.'
    }
  },
  locations: {
    cg_carga_t6_sala_cotejo: {
      name: 'Sala de cotejo de Olivo', short: 'Sala de cotejo',
      parent: 'olivo', region: 'johto', kind: 'building',
      bg: { type: 'indoor' },
      desc: 'Una oficina tranquila con dos mesas y un atril. La primera mesa sostiene copias de Olivo, Trigal e Iris; la segunda permite reconstruir un recibo ficticio antes de redactar una rectificación real. Nada de lo escrito en la prueba altera el libro original.',
      spots: [
        {
          label: 'Celia, revisora de archivo', icon: '🧑‍💼',
          sub: 'Explica cómo trabajar con un documento sin borrar su historia',
          cond: 'flag.cg_carga_t6_inicio',
          new: '!flag.cg_carga_t6_permiso', doneIf: 'flag.cg_carga_t6_permiso',
          talk: [{ script: 'cg_carga_t6_permiso' }]
        },
        {
          label: 'Dos casillas del recibo', icon: '📑',
          sub: 'La misma palabra «recibido» encabeza dos operaciones diferentes',
          cond: 'flag.cg_carga_t6_permiso',
          new: '!flag.cg_carga_t6_campos', doneIf: 'flag.cg_carga_t6_campos',
          talk: [{ script: 'cg_carga_t6_campos' }]
        },
        {
          label: 'Confrontar tres relojes', icon: '🕰️',
          sub: 'Decide qué hora demuestra cada fuente y qué hora aún falta',
          cond: 'flag.cg_carga_t6_permiso',
          new: '!flag.cg_carga_t6_tiempos', doneIf: 'flag.cg_carga_t6_tiempos',
          talk: [{ script: 'cg_carga_t6_tiempos' }]
        },
        {
          label: 'Firma a contraluz', icon: '🔍',
          sub: 'Comprueba qué puedes afirmar sin identificar a quien escribió',
          cond: 'flag.cg_carga_t6_permiso',
          new: '!flag.cg_carga_t6_firma', doneIf: 'flag.cg_carga_t6_firma',
          talk: [{ script: 'cg_carga_t6_firma' }]
        },
        {
          label: 'Preparar una copia de trabajo', icon: '📄',
          sub: 'El calco deja visible el significado de cada firma',
          cond: 'flag.cg_carga_t6_campos && flag.cg_carga_t6_tiempos && flag.cg_carga_t6_firma && !flag.cg_carga_t6_calco_listo',
          new: 'true', talk: [{ script: 'cg_carga_t6_calco_escena' }]
        },
        {
          label: 'Mesa para redactar la rectificación', icon: '🖋️',
          sub: 'La corrección debe conservar el asiento original',
          cond: 'flag.cg_carga_t6_calco_listo',
          new: '!flag.cg_carga_t6_borrador_listo',
          action: { go: 'cg_carga_t6_mesa_revision' }
        },
        {
          label: 'Repasar observaciones', icon: '📚',
          sub: 'Relee el calco sin crear copias nuevas',
          cond: 'flag.cg_carga_t6_calco_listo',
          talk: [{ script: 'cg_carga_t6_repaso' }]
        }
      ]
    },
    cg_carga_t6_mesa_revision: {
      name: 'Mesa de rectificación de Olivo', short: 'Mesa de rectificación',
      parent: 'olivo', region: 'johto', kind: 'building',
      bg: { type: 'indoor' },
      desc: 'Sobre la mesa hay un formulario simulado, hojas transparentes para conservar el original y un atril donde otra persona probará si entiende la corrección sin conocer el caso. El documento auténtico queda archivado.',
      spots: [
        {
          label: 'Elegir el asiento que se rectifica', icon: '🧾',
          sub: 'No se modifica un acuse auténtico de documentos',
          cond: 'flag.cg_carga_t6_calco_listo',
          new: '!flag.cg_carga_t6_asiento', doneIf: 'flag.cg_carga_t6_asiento',
          talk: [{ script: 'cg_carga_t6_asiento' }]
        },
        {
          label: 'Anotación de cambios', icon: '✍️',
          sub: 'La nueva nota no puede borrar la anotación original',
          cond: 'flag.cg_carga_t6_asiento',
          new: '!flag.cg_carga_t6_traza', doneIf: 'flag.cg_carga_t6_traza',
          talk: [{ script: 'cg_carga_t6_traza' }]
        },
        {
          label: 'Probar legibilidad con un tercero', icon: '🧠',
          sub: '¿Alguien sin el contexto entiende lo que se recibió?',
          cond: 'flag.cg_carga_t6_traza',
          new: '!flag.cg_carga_t6_lectura', doneIf: 'flag.cg_carga_t6_lectura',
          talk: [{ script: 'cg_carga_t6_lectura' }]
        },
        {
          label: 'Cerrar borrador de prueba', icon: '📘',
          sub: 'Una copia con trazabilidad y sin acusaciones personales',
          cond: 'flag.cg_carga_t6_asiento && flag.cg_carga_t6_traza && flag.cg_carga_t6_lectura',
          new: '!flag.cg_carga_t6_borrador_listo', doneIf: 'flag.cg_carga_t6_borrador_listo',
          talk: [{ script: 'cg_carga_t6_borrador_final' }]
        },
        {
          label: 'Volver al cotejo', icon: '↩️',
          sub: 'El recibo original se conserva en la sala vecina',
          action: { go: 'cg_carga_t6_sala_cotejo' }
        },
        {
          label: 'Consultar borrador final', icon: '🔖',
          sub: 'El borrador permite decidir entre rectificación pública y reservada',
          cond: 'flag.cg_carga_t6_borrador_listo',
          talk: [{ script: 'cg_carga_t6_relectura' }]
        }
      ]
    }
  },
  patches: {
    olivo: {
      spots: [
        {
          label: 'Sala de cotejo del recibo', icon: '📑',
          sub: 'Reconstruye las casillas, la hora y el origen de cada firma',
          cond: 'flag.cg_carga_t6_inicio',
          new: '!flag.cg_carga_t6_borrador_listo',
          action: { go: 'cg_carga_t6_sala_cotejo' }
        }
      ]
    }
  },
  scripts: {
    cg_carga_t6_permiso: [
      'Celia espera con una carpeta bajo el brazo. A un lado hay un formulario lleno de tachaduras y a otro una hoja con adiciones numeradas.',
      { say: 'cg_carga_celia', text: 'Te mostraré una copia de trabajo. El original no se borra y las personas no son sospechosas solo porque su firma aparezca en una hoja.' },
      { choice: [
        { text: 'Comparar las copias y conservar las anotaciones originales', then: [
          { set: { 'flag.cg_carga_t6_permiso': true } },
          { say: 'cg_carga_celia', text: 'Puedes revisar fechas, encabezados y trazos en cualquier orden. Después construiremos una corrección que otra persona pueda entender.' }
        ] },
        { text: 'Pedir borrar todos los folios contradictorios', then: [
          { say: 'cg_carga_celia', text: 'Si destruimos un asiento válido, ya no podremos explicar cuándo empezó el error. Corrigir no es ocultar.' }
        ] },
        { text: 'Regresar a la ciudad y volver después', then: [
          'La carpeta queda bajo resguardo. No hay ninguna hora límite para empezar a consultar.'
        ] }
      ] }
    ],
    cg_carga_t6_campos: [
      'El formulario trae dos casillas con la palabra RECIBIDO. Debajo aparecen títulos más pequeños: DOCUMENTACIÓN y MERCANCÍA.',
      { choice: [
        { text: 'Distinguir ambos títulos antes de leer la firma', then: [
          'La primera casilla acredita una carpeta. La segunda espera un acuse de recepción física; el propio papel de archivo no prueba que allí estuviera un paquete.',
          { set: { 'flag.cg_carga_t6_campos': true } },
          { say: 'cg_carga_celia', text: 'Ésta es la distinción que suele desaparecer cuando alguien copia solo una palabra de la columna.' }
        ] },
        { text: 'Concluir que hubo dos envíos porque hay dos casillas', then: [
          'Un formulario puede registrar varias operaciones sobre una sola remesa. La cantidad de casillas no es la de cajas.'
        ] },
        { text: 'Considerar falsa la primera firma', then: [
          'La firma puede ser auténtica para documentación. Lo equivocado sería utilizarla para demostrar una recepción diferente.'
        ] }
      ] }
    ],
    cg_carga_t6_tiempos: [
      'Tres papeles permiten seguir el orden: impresión de una hoja, recepción de la carpeta y entrega física de un bulto. No todas las horas fueron certificadas por la misma persona.',
      { choice: [
        { text: 'Separar hora de impresión, acuse documental y recepción física', then: [
          'La fecha impresa no es hora de llegada. La firma del archivo certifica que recibió las hojas; el bulto requiere su propio asiento de recepción.',
          { set: { 'flag.cg_carga_t6_tiempos': true } },
          'La supuesta llegada imposible deja de ser un hecho y se convierte en una casilla mal interpretada.'
        ] },
        { text: 'Asignar a las tres operaciones la fecha más antigua', then: [
          'Con ese cambio, el recibo afirmaría que la caja llegó antes de salir. Nada en los registros sostiene esa conclusión.'
        ] },
        { text: 'Eliminar las horas para que no haya contradicción', then: [
          'Sin fechas pierdes la posibilidad de reconstruir la secuencia y dejar constancia del error.'
        ] }
      ] }
    ],
    cg_carga_t6_firma: [
      'A contraluz, la tinta de la firma atraviesa una zona seca. Un borde de humedad se interrumpe a unos milímetros de la última letra.',
      { choice: [
        { text: 'Registrar que la firma fue posterior a la mancha, sin identificar a nadie', then: [
          'Puedes sostener un orden relativo entre tinta y humedad. No puedes señalar a una persona por la forma de una letra.',
          { set: { 'flag.cg_carga_t6_firma': true } },
          { say: 'rotom', text: '¡Bzzt! Una marca es una pista, no una identificación.' }
        ] },
        { text: 'Atribuir el documento al empleado con letra más parecida', then: [
          'En el segundo turno había dos personas cuya caligrafía coincidía parcialmente. Una semejanza no es prueba de identidad.'
        ] },
        { text: 'Decir que la humedad invalida todas las firmas', then: [
          'La humedad afectó solo una parte de la hoja. No cancela por sí sola la validez de un asiento.'
        ] }
      ] }
    ],
    cg_carga_t6_calco_escena: [
      'Celia pone una lámina transparente sobre el recibo. Con un lápiz de color marca la frontera entre las casillas, sin tocar el original.',
      { choice: [
        { text: 'Guardar un calco anónimo y conservar los títulos originales', then: [
          { if: '!flag.cg_carga_t6_calco_listo', then: [
            { give: 'cg_carga_t6_calco' },
            { set: { 'flag.cg_carga_t6_calco_listo': true } }
          ] },
          { say: 'cg_carga_celia', text: 'Ya tenemos lo observado. Ahora debemos comprobar si una corrección explica lo ocurrido sin sustituir una firma verdadera por otra inventada.' }
        ] },
        { text: 'Copiar también los nombres de los empleados ajenos al caso', then: [
          { say: 'cg_carga_celia', text: 'Es una copia para entender el procedimiento, no una lista de personas. No se necesita divulgar nombres.' }
        ] }
      ] }
    ],
    cg_carga_t6_asiento: [
      'La copia de prueba tiene dos renglones. En uno figuran los documentos recibidos; en otro, una mercancía cuya entrega no se demostró con aquella firma.',
      { choice: [
        { text: 'Aclarar solo la referencia equivocada al bulto, conservar el acuse de papeles', then: [
          { set: { 'flag.cg_carga_t6_asiento': true } },
          'Mantienes el asiento original de documentos. Una nota nueva señala que la recepción física se acreditará mediante un acuse distinto.'
        ] },
        { text: 'Sustituir el acuse documental por una entrega física', then: [
          'La carpeta llegó y fue recibida. Si borras ese hecho, creas un nuevo error en vez de reparar el anterior.'
        ] },
        { text: 'Borrar toda la página y abrir un folio nuevo', then: [
          'La hoja nueva no explicaría qué se corrigió ni permitiría verificar cómo se produjo la confusión.'
        ] }
      ] }
    ],
    cg_carga_t6_traza: [
      'El margen del documento tiene espacio para una nota de rectificación, un motivo y la fecha de la nota. No es un espacio para reescribir el pasado.',
      { choice: [
        { text: 'Agregar una nota con motivo, fecha y enlace a ambos asientos', then: [
          { set: { 'flag.cg_carga_t6_traza': true } },
          'La copia explica qué cambió, por qué y qué asiento anterior se conserva. El lector puede comprobar ambos registros.'
        ] },
        { text: 'Tachar el texto viejo hasta volverlo ilegible', then: [
          'Si cubres la información antigua ya no queda evidencia del origen del problema. Celia aparta la goma.'
        ] },
        { text: 'Poner «corregido» sin explicar la causa', then: [
          'La palabra no dice qué operación fue interpretada mal. El siguiente turno podría cometer el mismo error.'
        ] }
      ] }
    ],
    cg_carga_t6_lectura: [
      'Celia entrega el borrador a una ayudante que no escuchó la investigación. Solo tendrá los encabezados y las notas; es una prueba para saber si el formulario se entiende por sí mismo.',
      { say: 'cg_carga_celia', text: 'Imagínate que llegas aquí mañana sin conocernos. ¿Qué deberías concluir de esta copia?' },
      { choice: [
        { text: 'La carpeta se recibió primero; la caja tiene su propia recepción', then: [
          'La ayudante encuentra los títulos de las dos columnas y señala fechas diferentes. Consigue explicar la secuencia sin que nadie le cuente la historia.',
          { set: { 'flag.cg_carga_t6_lectura': true } },
          { say: 'cg_carga_celia', text: 'Esa es la prueba que necesitábamos: la corrección se entiende sin tener al autor al lado.' }
        ] },
        { text: 'El primer firmante debe ser el responsable del traslado', then: [
          'En el borrador solo consta que esa firma recibió documentos. La ayudante no puede verificar quién transportó la mercancía.'
        ] },
        { text: 'Todo sigue siendo imposible porque la primera hora es menor', then: [
          'Una hora anterior puede pertenecer a un suceso anterior. La ayudante señala la palabra DOCUMENTACIÓN y pide que vuelvas a distinguir las tareas.'
        ] }
      ] }
    ],
    cg_carga_t6_borrador_final: [
      'El formulario simulado conserva el asiento anterior y una nota nueva que aclara a qué correspondía su firma. La copia está lista para contrastarse con el libro de Olivo.',
      { choice: [
        { text: 'Archivar el borrador con trazabilidad y sin atribuir culpas', then: [
          { if: '!flag.cg_carga_t6_borrador_listo', then: [
            { give: 'cg_carga_t6_borrador' },
            { set: { 'flag.cg_carga_t6_borrador_listo': true } },
            { diary: 'En Olivo ensayamos cómo rectificar un recibo sin borrar lo que sí ocurrió. Mantuvimos el acuse auténtico de documentación, distinguimos la recepción del bulto y anotamos por qué se corrigió la referencia. Una persona ajena al caso pudo comprender la diferencia sin que le diéramos nombres ni acusaciones.', cond: 'flag.b01_diario' }
          ] },
          { say: 'cg_carga_celia', text: 'La decisión de difundir el procedimiento o tratarlo primero con los trabajadores queda para el cierre. Los hechos ya son comprobables.' }
        ] },
        { text: 'Romper el documento original para que no haya dudas', then: [
          'Celia retira el original y devuelve la copia de prueba. «No destruyas el asiento que necesitas para demostrar cómo lo corregiste».'
        ] }
      ] }
    ],
    cg_carga_t6_repaso: [
      { read: 'cg_carga_t6_calco' },
      { say: 'cg_carga_celia', text: 'No confundas escribir una nota con cambiar el pasado. La corrección explica la diferencia; no la borra.' }
    ],
    cg_carga_t6_relectura: [
      { read: 'cg_carga_t6_borrador' },
      'El borrador ya conserva qué se recibió, cuándo y cuál es el motivo de rectificación. Regresa a la mesa de pruebas completas para decidir si la corrección será pública o reservada.'
    ]
  }
};