// Pokémon Infinite · expansión T4: El correo que no viajó.
// Simulación de transporte con cuatro decisiones de logística y consecuencia por ruta.
// No modifica el inventario principal, flags centrales, medallas ni destinos del mapa.
export default {
  npcs: {
    cg_carga_nelo: {
      name: 'Nelo', title: 'Aprendiz de la estafeta de Caoba',
      look: {
        hair: 'spiky', hairColor: '#6d4f30', eyes: '#526e81', outfit: '#7190a4',
        outfit2: '#d8c699', skin: 2, acc: 'freckles', mouth: 'smile', bg: '#b9d5d6'
      }
    }
  },
  items: {
    cg_carga_t4_acta_ensayo: {
      name: 'Acta del transporte simulado', pocket: 'key',
      desc: 'Las decisiones tomadas durante el recorrido de prueba, con pruebas de qué se entregó y cuándo.',
      read: 'CAOBA — ENSAYO DE TRANSPORTE\n\nSe utilizó un bulto vacío y una copia ficticia, sin mover mercancía real ni abrir rutas.\n\n1. La ruta condiciona cómo se protege el objeto, pero no cambia su identidad.\n2. Preparar, cargar, entregar la carpeta y recibir la caja son sucesos distintos.\n3. Una firma en el relevo de papeles no prueba la llegada del objeto.\n4. El registro de incidencias permite explicar una demora sin borrar un dato verdadero.\n\nConclusión: la duplicidad aparente de asientos puede proceder de operaciones diferentes sobre una sola remesa. El ensayo por sí solo no identifica la persona que firmó el envío original.'
    }
  },
  locations: {
    cg_carga_t4_patio: {
      name: 'Patio de ensayo de Caoba', short: 'Patio de ensayo',
      parent: 'caoba', region: 'johto', kind: 'area',
      bg: { type: 'ranch' },
      desc: 'El ayuntamiento prestó dos plataformas pequeñas, una caja de madera vacía y un carrito. Un círculo de tiza delimita el ensayo. Se puede ensayar el tramo de la pasarela o dar la vuelta por el bordo, sin sacar nada de Caoba ni implicar a terceros. Un cartel recuerda: «Se evalúan procedimientos, no personas».',
      spots: [
        {
          label: 'Nelo y el mapa de dos recorridos', icon: '🗺️',
          sub: 'Escoge qué ruta de demostración se utilizará',
          cond: '!flag.cg_carga_t4_ruta',
          new: '!flag.cg_carga_t4_ruta',
          doneIf: 'flag.cg_carga_t4_ruta',
          talk: [{ script: 'cg_carga_t4_rutas' }]
        },
        {
          label: 'Taller de embalaje', icon: '📦',
          sub: 'La protección correcta depende de la ruta que elegiste',
          cond: 'flag.cg_carga_t4_ruta && !flag.cg_carga_t4_empaque',
          new: 'true', talk: [{ script: 'cg_carga_t4_empaque_escena' }]
        },
        {
          label: 'Registro de carga', icon: '📓',
          sub: 'Identifica a la persona que prepara el objeto sin convertirla en destinataria',
          cond: 'flag.cg_carga_t4_empaque && !flag.cg_carga_t4_carga',
          new: 'true', talk: [{ script: 'cg_carga_t4_registro_carga' }]
        },
        {
          label: 'Comenzar recorrido de práctica', icon: '🛒',
          sub: 'La estafeta de ensayo está a poca distancia, dentro de Caoba',
          cond: 'flag.cg_carga_t4_carga && !flag.cg_carga_t4_control',
          new: 'true', action: { go: 'cg_carga_t4_estafeta' }
        },
        {
          label: 'Bitácora de errores del ensayo', icon: '📑',
          sub: 'Consulta qué significa que se haya retrasado una operación',
          cond: 'flag.cg_carga_t4_ruta',
          talk: [{ script: 'cg_carga_t4_bitacora' }]
        },
        {
          label: 'Carpeta del ensayo terminado', icon: '📘',
          sub: 'Relee el resultado de la prueba sin repetir entregas ni premios',
          cond: 'flag.cg_carga_t4_recorrido_fin',
          talk: [{ script: 'cg_carga_t4_ensayo_despues' }]
        }
      ]
    },
    cg_carga_t4_estafeta: {
      name: 'Estafeta de ensayo', short: 'Estafeta',
      parent: 'caoba', region: 'johto', kind: 'building',
      bg: { type: 'indoor' },
      desc: 'Una caseta de madera representa el siguiente punto de una ruta real. Tiene dos ventanillas: DOCUMENTOS y MERCANCÍA. Ambas usan el mismo formulario de remesa para que sea posible reproducir el error sin confundir una entrega verdadera con una firma de papel.',
      spots: [
        {
          label: 'Revisar el tramo de acceso', icon: '🧭',
          sub: 'El camino elegido impone una maniobra específica',
          cond: 'flag.cg_carga_t4_carga && !flag.cg_carga_t4_control',
          new: 'true', talk: [{ script: 'cg_carga_t4_control_ruta' }]
        },
        {
          label: 'Ventanilla de documentos', icon: '✉️',
          sub: 'El acuse no debe decir que recibieron la caja',
          cond: 'flag.cg_carga_t4_control && !flag.cg_carga_t4_relevo',
          new: 'true', talk: [{ script: 'cg_carga_t4_documentos' }]
        },
        {
          label: 'Ventanilla de mercancía', icon: '⚖️',
          sub: 'Confirma la recepción física del único bulto de prueba',
          cond: 'flag.cg_carga_t4_relevo && !flag.cg_carga_t4_recepcion',
          new: 'true', talk: [{ script: 'cg_carga_t4_recepcion_escena' }]
        },
        {
          label: 'Comparar los dos acuses', icon: '🔎',
          sub: 'Una sola caja puede generar varias anotaciones legítimas',
          cond: 'flag.cg_carga_t4_relevo && flag.cg_carga_t4_recepcion && !flag.cg_carga_t4_recorrido_fin',
          new: 'true', talk: [{ script: 'cg_carga_t4_contraste' }]
        },
        {
          label: 'Mesa de copia final', icon: '📃',
          sub: 'Guarda la conclusión verificable del ensayo',
          cond: 'flag.cg_carga_t4_recorrido_fin',
          talk: [{ script: 'cg_carga_t4_ensayo_despues' }]
        }
      ]
    }
  },
  patches: {
    caoba: {
      spots: [
        {
          label: 'Patio del ensayo de transporte', icon: '🛒',
          sub: 'Prueba un envío realista sin sacar una remesa de Caoba',
          cond: 'flag.cg_carga_t4_inicio',
          new: '!flag.cg_carga_t4_recorrido_fin',
          action: { go: 'cg_carga_t4_patio' }
        },
        {
          label: 'Estafeta de práctica', icon: '📮',
          sub: 'Revisa las dos ventanillas sin abrir un destino nuevo',
          cond: 'flag.cg_carga_t4_carga',
          new: '!flag.cg_carga_t4_recorrido_fin',
          action: { go: 'cg_carga_t4_estafeta' }
        }
      ]
    }
  },
  scripts: {
    cg_carga_t4_rutas: [
      'El carrito tiene una sola caja de madera sin contenido. Nelo dibuja dos caminos alrededor de la misma manzana de Caoba.',
      { say: 'cg_carga_nelo', text: 'Me contrataron para ayudar con la prueba, no para inventar un trayecto entre ciudades. Si conseguimos que el papel mienta aquí, sabremos en qué operación está el error.' },
      { say: 'rotom', text: '¡Bzzt! Un camino es corto pero salpica. El otro es seco, pero vibra y tiene curvas. Ambos llegan al mismo sitio.' },
      { choice: [
        {
          text: 'Elegir la pasarela húmeda (ruta corta)',
          then: [
            { set: { 'flag.cg_carga_t4_ruta': true, 'flag.cg_carga_t4_ruta_pasarela': true } },
            'La ruta marcada en azul cruza tablas húmedas. El embalaje tendrá que impedir que la humedad alcance la etiqueta.',
            { say: 'cg_carga_nelo', text: 'Muy bien. Lo que voy a registrar será «ruta elegida», no «recibo firmado». Todavía no movimos la caja.' }
          ]
        },
        {
          text: 'Elegir el bordo de grava (ruta larga)',
          then: [
            { set: { 'flag.cg_carga_t4_ruta': true, 'flag.cg_carga_t4_ruta_bordo': true } },
            'La ruta en amarillo rodea la acequia. Es seca, pero un tramo de grava hace vibrar los cajones mal sujetos.',
            { say: 'cg_carga_nelo', text: 'Esto tendrá un efecto distinto en el embalaje. No es una respuesta incorrecta: tendremos que prepararlo de otra manera.' }
          ]
        },
        {
          text: 'Salir del plano sin elegir',
          then: [
            'Nelo guarda el gis. «Cuando quieras, seguimos. Todavía no hay carga ni hora registrada».'
          ]
        }
      ] },
      { if: 'flag.cg_carga_t4_ruta', then: [
        { say: 'rotom', text: '¡Ya quedó elegida! Comprueba cómo protegerías la caja antes de cargarla.' }
      ] }
    ],
    cg_carga_t4_empaque_escena: [
      'Hay dos kits junto al carrito: una funda impermeable transparente y correas dobles para mantener la caja sujeta sobre grava.',
      { if: 'flag.cg_carga_t4_ruta_pasarela', then: [
        'La pasarela tiene salpicaduras y goteo bajo una tabla. El riesgo no es un golpe: es que la etiqueta se moje y una hora impresa parezca distinta.'
      ], else: [
        'El bordo está seco, pero hay piedras sueltas. El peligro es que el cajón se mueva y una marca de control acabe en la cara equivocada.'
      ] },
      { choice: [
        {
          text: 'Poner la funda impermeable sin tapar el número',
          then: [
            { if: 'flag.cg_carga_t4_ruta_pasarela', then: [
              'La etiqueta permanece legible detrás del plástico. Puedes comparar su hora aun después de que el carrito cruce las tablas mojadas.',
              { set: { 'flag.cg_carga_t4_empaque': true, 'flag.cg_carga_t4_funda': true } }
            ], else: [
              'En el bordo seco, la funda protege la tinta pero no inmoviliza el cajón. Al simular una curva, la caja se desliza. Es mejor asegurarla con correas.',
              { set: { 'flag.cg_carga_t4_retraso_empaque': true } },
              { say: 'rotom', text: '¡Bzzt! No se estropeó nada. Pero si tachamos la hora anterior y fingimos que salimos a tiempo, la bitácora deja de servir.' }
            ] }
          ]
        },
        {
          text: 'Asegurar el cajón con correas cruzadas',
          then: [
            { if: 'flag.cg_carga_t4_ruta_bordo', then: [
              'Las correas pasan por las cuatro esquinas y el carrito deja de vibrar al doblar. La etiqueta queda visible y el bulto mantiene su posición.',
              { set: { 'flag.cg_carga_t4_empaque': true, 'flag.cg_carga_t4_correas': true } }
            ], else: [
              'Las correas sujetan la caja, pero no evitan que el agua alcance la etiqueta. Una salpicadura de prueba corre la tinta de una esquina.',
              { set: { 'flag.cg_carga_t4_retraso_empaque': true } },
              { say: 'cg_carga_nelo', text: 'La carga no está perdida. Repitamos con la funda antes de registrar la salida.' }
            ] }
          ]
        },
        {
          text: 'Despachar sin protección y corregir el papel después',
          then: [
            'Nelo niega con la cabeza. «El registro existe para anotar lo que ocurrió, no para esconder una decisión arriesgada».',
            'El cajón sigue inmóvil. Puedes escoger una protección adecuada sin perder el ensayo.'
          ]
        }
      ] },
      { if: 'flag.cg_carga_t4_empaque', then: [
        { say: 'cg_carga_nelo', text: 'Perfecto. Un cambio de ruta puede exigir otro embalaje, pero el número de remesa no cambia.' }
      ] }
    ],
    cg_carga_t4_registro_carga: [
      'Antes de mover el carrito, Nelo pone en la mesa dos folios: «PREPARACIÓN» y «DESPACHO». Ambos muestran la misma remesa ficticia.',
      { say: 'cg_carga_nelo', text: 'Yo preparé la caja, pero no soy el encargado de recibirla. ¿Dónde anoto mi nombre sin convertirme en el destinatario?' },
      { choice: [
        {
          text: 'Firmar preparación; dejar la recepción en blanco',
          then: [
            'El folio registra quién preparó el embalaje, con una hora propia. En la otra columna, recepción todavía vacía, el envío sigue siendo un único cajón.',
            { set: { 'flag.cg_carga_t4_carga': true } },
            { say: 'rotom', text: '¡Bzzt! Primera diferencia comprobable: preparar no significa recibir. ¡Y ahora sí podemos mover el carrito!' }
          ]
        },
        {
          text: 'Copiar la firma en preparación y recepción',
          then: [
            'Dos casillas se llenan antes de que salga el carrito. Acabas de fabricar una llegada que todavía no ocurrió.',
            { set: { 'flag.cg_carga_t4_retraso_registro': true } },
            { say: 'cg_carga_nelo', text: 'Es justo el tipo de error que buscamos. Lo tacharemos como ensayo fallido, sin borrar la versión anterior.' }
          ]
        },
        {
          text: 'No registrar ninguna hora hasta el final',
          then: [
            'El carrito podría llegar, pero después no sabrías qué parte del tiempo corresponde a preparar, cargar o entregar.',
            'Nelo te acerca la primera hoja para que registres únicamente lo que sí ocurrió.'
          ]
        }
      ] }
    ],
    cg_carga_t4_control_ruta: [
      'El carrito sale de la plataforma de prueba. No hay reloj real ni un tiempo de espera: el recorrido es una reproducción imaginada, comprobable desde ambas ventanillas.',
      { if: 'flag.cg_carga_t4_ruta_pasarela', then: [
        'Una tabla húmeda cruje bajo las ruedas. La funda impide que la etiqueta se moje, pero una raya de tiza avisa que hay que pasar despacio.'
      ], else: [
        'En el bordo, las ruedas saltan sobre grava. Las correas evitan que el cajón golpee la baranda. El cruce del terraplén tiene una señal de alto.'
      ] },
      { choice: [
        {
          text: 'Detenerse, comprobar el bulto y anotar el paso',
          then: [
            'La caja sigue siendo la misma. En el cuaderno sólo aparece un control de ruta, no una segunda remesa ni una recepción.',
            { set: { 'flag.cg_carga_t4_control': true, 'flag.cg_carga_t4_control_anotado': true } },
            { if: 'flag.cg_carga_t4_retraso_empaque', then: [
              'En la bitácora también figura el ensayo anterior de protección fallida. Se conservó como incidencia, no se sobrescribió la salida correcta.'
            ] }
          ]
        },
        {
          text: 'Anotar una entrega anticipada para ahorrar trabajo',
          then: [
            'La ventanilla está a unos metros, pero nadie recibió todavía la caja. El campo «entregado» no puede marcarse ahora.',
            { set: { 'flag.cg_carga_t4_retraso_ruta': true } },
            { say: 'rotom', text: '¡Bzzt! El control del camino no es la firma del destino. Otra oportunidad.' }
          ]
        },
        {
          text: 'Volver al patio sin avanzar el ensayo',
          then: [
            'El carrito se detiene en el círculo de tiza. Nelo señala la dirección de vuelta: el guion no te encierra en la estafeta.',
            { say: 'cg_carga_nelo', text: 'Nada se pierde. La caja no ha sido recibida por nadie; puedes continuar desde este control cuando quieras.' }
          ]
        }
      ] }
    ],
    cg_carga_t4_documentos: [
      'La ventanilla izquierda tiene un sello que dice «DOCUMENTACIÓN». Un empleado de práctica coloca la mano sobre el libro de acuses.',
      { say: 'cg_carga_nelo', text: 'Puedo entregar los papeles antes que la caja, porque el mensajero de documentos camina sin carrito. ¿Cómo firmamos eso?' },
      { choice: [
        {
          text: 'Acusar recibo de la carpeta; caja aún en tránsito',
          then: [
            'El empleado confirma la llegada de las hojas y deja sin rellenar el campo «objeto recibido». Nelo conserva el carrito con el bulto de madera.',
            { set: { 'flag.cg_carga_t4_relevo': true } },
            { say: 'rotom', text: '¡Aquí está la prueba! Papel recibido no significa caja recibida. ¡Una diferencia pequeña que cambia todo el expediente!' }
          ]
        },
        {
          text: 'Hacer constar que ambos llegaron al mismo tiempo',
          then: [
            'Las hojas están en la ventanilla, pero la caja aún no pasó por el control de mercancía. El sello común crearía una cronología falsa.',
            { set: { 'flag.cg_carga_t4_retraso_relevo': true } },
            { say: 'cg_carga_nelo', text: 'No hay problema con equivocarse durante el ensayo, siempre que la corrección quede anotada. La caja sigue conmigo.' }
          ]
        },
        {
          text: 'Negarse a entregar papeles hasta terminar el traslado',
          then: [
            'Sería una forma de evitar el error, pero impediría comprobar cómo pudo ocurrir en el caso real. Un acuse independiente resulta más útil.',
            'La ventanilla permanece abierta para cuando quieras probar el relevo de documentos.'
          ]
        }
      ] }
    ],
    cg_carga_t4_recepcion_escena: [
      'En la ventanilla derecha, la caja llega al platillo de una báscula. Nelo aparta la carpeta ya recibida, para que no parezca que hay dos bultos.',
      { choice: [
        {
          text: 'Pesar la caja y registrar recepción física separada',
          then: [
            'La báscula marca el peso bruto esperado y, al descontar la madera, el neto simulado sigue siendo cero. El registro de mercancía recibe su propia hora.',
            { set: { 'flag.cg_carga_t4_recepcion': true } },
            { if: 'flag.cg_carga_t4_ruta_pasarela', then: [
              'La funda se retira delante de Nelo. La etiqueta permanece seca y legible, igual que cuando se imprimió.'
            ], else: [
              'Las correas se desatan ante los dos testigos. La caja no se desplazó en el carrito, pese al suelo de grava.'
            ] }
          ]
        },
        {
          text: 'Usar la firma de documentos para evitar una segunda entrada',
          then: [
            'Eso dejaría sin fecha la entrega física. El expediente parecería una caja recibida antes de llegar, justo el problema del que partió la investigación.',
            { say: 'rotom', text: '¡Bzzt! No tenemos que crear el mismo error para demostrarlo. Podemos documentar cómo se crea.' }
          ]
        },
        {
          text: 'Volver al registro inicial y cambiar la hora de preparación',
          then: [
            'La hora de preparación fue auténtica. Cambiarla para que todo cuadre haría menos fiable el expediente.',
            'Lo correcto es añadir la hora de recepción y no alterar la anterior.'
          ]
        }
      ] }
    ],
    cg_carga_t4_contraste: [
      'Nelo lleva los dos acuses a una mesa. Ambos muestran la misma remesa. Uno certifica un paquete de papeles; el otro, una caja física.',
      { say: 'cg_carga_nelo', text: 'Tienes dos firmas. Y una sola caja. Si alguien copiara las dos fechas en la misma casilla del inventario, parecería que la caja viajó dos veces o que llegó antes de salir.' },
      { choice: [
        {
          text: 'Los dos acuses prueban que hubo dos envíos',
          then: [
            'Los números de remesa coinciden, y el registro de carga documentó un único cajón. El acuse documental no contiene peso ni entrega física.',
            { say: 'rotom', text: '¡Bzzt! Dos firmas no son dos cajas. Acabamos de verlo con nuestros propios ojos.' }
          ]
        },
        {
          text: 'El papel y la caja tienen recepciones distintas, aunque compartan remesa',
          then: [
            'La simulación explica por qué una casilla antigua puede coexistir con una llegada posterior sin exigir una falsificación.',
            { if: '!flag.cg_carga_t4_recorrido_fin', then: [
              { give: 'cg_carga_t4_acta_ensayo' },
              { set: { 'flag.cg_carga_t4_recorrido_fin': true } },
              { diary: 'Hoy transportamos una caja vacía por un recorrido simulado en Caoba. Elegimos cómo protegerla, documentamos la preparación, pasamos por un control y entregamos por separado los papeles y el cajón. Así obtuvimos dos firmas legítimas sin duplicar la caja. El ensayo no nos dice quién firmó en Olivo, pero sí qué pregunta habría que hacerle.', cond: 'flag.b01_diario' }
            ] },
            { if: 'flag.cg_carga_t4_ruta_pasarela', then: [
              'En la pasarela, el punto delicado fue mantener seca la etiqueta. El papel prueba una hora; la funda evitó que la humedad la confundiera.'
            ], else: [
              'En el bordo, la prueba dependía de sujetar la carga. Las correas evitaron un movimiento interno que podría haberse anotado como otra salida.'
            ] },
            { say: 'cg_carga_nelo', text: 'Ahora hay un resultado que otra persona puede repetir sin tener que creernos por simpatía. Eso vale más que una sospecha.' }
          ]
        },
        {
          text: 'Borrar uno de los acuses para que la cronología parezca sencilla',
          then: [
            'La estafeta quedaría con menos información, no con una explicación. Los registros correctos indican qué se recibió en cada ventanilla.',
            { say: 'cg_carga_nelo', text: 'Un documento que hace bonita la historia puede ser peor que una historia complicada pero verdadera.' }
          ]
        }
      ] }
    ],
    cg_carga_t4_bitacora: [
      'La bitácora distingue operaciones correctas de ensayos fallidos. Nada de lo que se ensayó con el carrito afecta a un envío verdadero.',
      { if: 'flag.cg_carga_t4_ruta_pasarela', then: [
        'Ruta seleccionada: pasarela. El informe exige funda impermeable y conservar la hora de preparación.'
      ], else: [
        'Ruta seleccionada: bordo. El informe exige sujetar el cajón antes de subir a la grava.'
      ] },
      { if: 'flag.cg_carga_t4_retraso_empaque', then: [
        'Incidencia registrada: primer embalaje insuficiente. Se conservó una nota, sin falsificar el folio.'
      ] },
      { if: 'flag.cg_carga_t4_retraso_registro', then: [
        'Incidencia registrada: intento de firmar la recepción antes de tiempo. El registro de prueba conserva la corrección.'
      ] },
      { if: 'flag.cg_carga_t4_retraso_ruta', then: [
        'Incidencia registrada: control de ruta confundido con entrega. Se corrigió antes de salir del punto de control.'
      ] },
      { if: 'flag.cg_carga_t4_retraso_relevo', then: [
        'Incidencia registrada: intento de unir la firma documental con la física. El empleado lo devolvió para corregirlo.'
      ] },
      { say: 'rotom', text: '¡Bzzt! Si un retraso queda documentado, no hay que fingir que nunca ocurrió. Una bitácora no es un examen que solo admite dieces.' }
    ],
    cg_carga_t4_ensayo_despues: [
      { read: 'cg_carga_t4_acta_ensayo' },
      { if: 'flag.cg_carga_t4_ruta_pasarela', then: [
        { say: 'cg_carga_nelo', text: 'Tu informe conserva lo que vimos en la pasarela húmeda. Otro equipo podrá repetirlo con la funda.' }
      ], else: [
        { say: 'cg_carga_nelo', text: 'Tu informe conserva la ruta por el bordo. La diferencia quedó en el embalaje, no en la identidad de la caja.' }
      ] },
      { if: 'flag.cg_carga_t4_retraso_empaque || flag.cg_carga_t4_retraso_registro || flag.cg_carga_t4_retraso_ruta || flag.cg_carga_t4_retraso_relevo', then: [
        'Las incidencias del recorrido siguen anotadas. No bloquean el caso: explican por qué el registro debe preservar las correcciones.'
      ] }
    ]
  }
};