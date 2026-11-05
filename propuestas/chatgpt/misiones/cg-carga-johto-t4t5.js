// Pokémon Infinite · propuesta aislada, tramos T4 y T5 de Johto.
// Revisión Elio antes de integrar. Solo adds; no flags o cambios troncales.
export default {
  trainers: {
    cg_carga_guardia_desafio: {
      name: 'Encargado de almacén', cls: 'Encargado', ai: 3, reward: 1600,
      team: [
        { sp: 'forretress', lv: 69, ability: 'sturdy', item: 'sitrusberry', moves: ['spikes', 'rapidspin', 'gyroball', 'voltswitch'] },
        { sp: 'pelipper', lv: 70, ability: 'drizzle', item: 'sitrusberry', moves: ['hurricane', 'scald', 'roost', 'uturn'] },
        { sp: 'kingler', lv: 71, ability: 'hypercutter', item: 'sitrusberry', moves: ['crabhammer', 'swordsdance', 'rockslide', 'xscissor'] }
      ],
      intro: 'Nada de gritos ni de culpas. Un combate y luego hablamos con calma.',
      win: 'Muy bien. Has leído nuestros movimientos mejor que yo los turnos del almacén.',
      lose: 'Ganar un combate no decide quién escribió una hoja. Sigamos con las pruebas.'
    }
  },
  patches: {
    caoba: { spots: [
      { label: 'Mesa de envío de prueba', icon: '🧰', sub: 'Solo embalajes vacíos; nadie transportará material riesgoso',
        cond: 'flag.cg_carga_t3_fin && !flag.cg_carga_t4_fin',
        new: '!flag.cg_carga_t4_inicio', talk: [{ script: 'cg_carga_prueba_inicio' }] },
      { label: 'Pesa patrón', icon: '⚖️', sub: 'Pesar por separado recipiente y contenido',
        cond: 'flag.cg_carga_t4_inicio && !flag.cg_carga_t4_fin',
        new: '!flag.cg_carga_t4_peso', doneIf: 'flag.cg_carga_t4_peso',
        talk: [{ script: 'cg_carga_prueba_peso' }] },
      { label: 'Cordel de dos colores', icon: '🧵', sub: 'Identificar las etapas del precinto',
        cond: 'flag.cg_carga_t4_inicio && !flag.cg_carga_t4_fin',
        new: '!flag.cg_carga_t4_sello', doneIf: 'flag.cg_carga_t4_sello',
        talk: [{ script: 'cg_carga_prueba_sello' }] },
      { label: 'Reloj de dos anotaciones', icon: '🕰️', sub: 'Registrar la hora de imprimir y la de mover la caja',
        cond: 'flag.cg_carga_t4_inicio && !flag.cg_carga_t4_fin',
        new: '!flag.cg_carga_t4_hora', doneIf: 'flag.cg_carga_t4_hora',
        talk: [{ script: 'cg_carga_prueba_hora' }] },
      { label: 'Reproducir el envío', icon: '🧩', sub: 'Compara las etapas sin abrir nuevas rutas',
        cond: 'flag.cg_carga_t4_peso && flag.cg_carga_t4_sello && flag.cg_carga_t4_hora && !flag.cg_carga_t4_fin',
        new: 'true', talk: [{ script: 'cg_carga_prueba_conclusion' }] }
    ] },
    olivo: { spots: [
      { label: 'Almacén: segundo turno', icon: '🌙', sub: 'La escena transcurre de noche aunque juegues de día',
        cond: 'flag.cg_carga_t4_fin && !flag.cg_carga_t5_fin',
        new: '!flag.cg_carga_t5_inicio', talk: [{ script: 'cg_carga_turno_inicio' }] },
      { label: 'Entreplanta del almacén', icon: '🪜', sub: 'Una fila de cajas y una escalera sin polvo',
        cond: 'flag.cg_carga_t5_inicio && !flag.cg_carga_t5_fin',
        new: '!flag.cg_carga_t5_entreplanta', doneIf: 'flag.cg_carga_t5_entreplanta',
        talk: [{ script: 'cg_carga_entreplanta' }] },
      { label: 'Libro de la guardia', icon: '📖', sub: 'El segundo turno usa otro folio',
        cond: 'flag.cg_carga_t5_inicio && !flag.cg_carga_t5_fin',
        new: '!flag.cg_carga_t5_guardia', doneIf: 'flag.cg_carga_t5_guardia',
        talk: [{ script: 'cg_carga_guardia' }] },
      { label: 'Mesa de firmas', icon: '✍️', sub: 'Hay firmas para movimientos diferentes',
        cond: 'flag.cg_carga_t5_inicio && !flag.cg_carga_t5_fin',
        new: '!flag.cg_carga_t5_firmas', doneIf: 'flag.cg_carga_t5_firmas',
        talk: [{ script: 'cg_carga_firmas' }] },
      { label: 'Encargado del segundo turno', icon: '🧑‍🏭', sub: 'El guardia está dispuesto a explicar lo que falta',
        cond: 'flag.cg_carga_t5_guardia && flag.cg_carga_t5_entreplanta && flag.cg_carga_t5_firmas && !flag.cg_carga_t5_fin',
        new: 'true', talk: [{ script: 'cg_carga_encargado' }] }
    ] }
  },
  scripts: {
    cg_carga_prueba_inicio: [
      'En el borde de Caoba, una mesa pequeña permite repetir un trámite de transporte usando solo una caja vacía.',
      { say: 'rotom', text: '¡Bzzt! ¡Pongamos a prueba nuestra propia explicación! Si no funciona con una caja de verdad, habrá que cambiarla.' },
      'La idea no es repetir el delito de nadie. Es probar qué significa cada sello y cada hora.',
      { choice: [
        { text: 'Preparar el ensayo con tres pruebas independientes', then: [
          { set: { 'flag.cg_carga_t4_inicio': true } },
          { quest: 'cg_carga_johto', stage: 'prueba' },
          'Se colocan una pesa patrón, dos cordeles y un reloj de anotaciones sobre la mesa.'
        ] },
        { text: 'Guardar la carpeta y volver después', then: [
          { say: 'rotom', text: '¡Bzzt! No perdemos el trabajo. La mesa se queda lista para cuando quieras.' }
        ] }
      ] }
    ],
    cg_carga_prueba_peso: [
      'Colocas una caja de madera sobre la pesa patrón. El recipiente tiene un peso propio antes de añadirle nada.',
      { choice: [
        { text: 'Registrar por separado peso de caja y peso del paquete', then: [
          'La diferencia se reproduce sin tocar el contenido. Conoces el peso bruto y el neto: dos números correctos para un solo objeto.',
          { if: '!flag.cg_carga_t4_peso', then: [
            { set: { 'flag.cg_carga_t4_peso': true } },
            { say: 'rotom', text: '¡Bzzt! Una diferencia no siempre es un error. Y un error no siempre es una trampa.' }
          ] }
        ] },
        { text: 'Anotar un solo peso y dar el otro por falso', then: [
          'Las dos cifras son correctas si cada una dice qué incluye. Si borras una, pierdes información.'
        ] },
        { text: 'Pesar la caja sin estabilizar la báscula', then: [
          'La aguja vibra. No sería una medida fiable.',
          { say: 'rotom', text: '¡Bzzt! Hay que dejar de mover la pesa antes de leerla.' }
        ] }
      ] }
    ],
    cg_carga_prueba_sello: [
      'Dos cuerdas de colores ayudan a distinguir un precinto de preparación y otro de entrega.',
      { choice: [
        { text: 'Atar el primer cordel al cerrar y el segundo al confirmar llegada', then: [
          'Ahora hay dos marcas en la misma remesa, sin que existan dos cajas.',
          { if: '!flag.cg_carga_t4_sello', then: [
            { set: { 'flag.cg_carga_t4_sello': true } },
            'Anotas que el cambio de precinto puede reflejar dos operaciones legítimas.'
          ] }
        ] },
        { text: 'Poner ambos cordeles antes de la salida', then: [
          'Al final, ninguno ayuda a verificar dónde ocurrió la entrega. Las dos marcas dicen lo mismo.'
        ] },
        { text: 'Usar el color para identificar al responsable', then: [
          'Los colores se eligen por tarea y no por persona. No se puede identificar a alguien solo por un cordel.'
        ] }
      ] }
    ],
    cg_carga_prueba_hora: [
      'Un reloj sirve para registrar cuándo ocurre algo. Una hoja impresa puede tener otra hora distinta.',
      { choice: [
        { text: 'Anotar preparación, salida y entrega como eventos diferentes', then: [
          'La caja simulada tiene tres anotaciones sin contradicción. La primera no garantiza la última.',
          { if: '!flag.cg_carga_t4_hora', then: [
            { set: { 'flag.cg_carga_t4_hora': true } },
            'Anotas: una firma puesta al final puede certificar recepción del documento, no del transporte.'
          ] }
        ] },
        { text: 'Copiar la hora del formulario en todas las casillas', then: [
          'Aparentemente todo cuadra. Sin embargo, al mover la caja las horas siguen iguales: el papel dejó de representar los hechos.'
        ] },
        { text: 'Dejar todas las casillas sin tiempo', then: [
          'No hay contradicción, pero tampoco se puede comprobar qué ocurrió antes. No resuelve la pregunta.'
        ] }
      ] }
    ],
    cg_carga_prueba_conclusion: [
      'La caja de prueba llega al otro extremo de la mesa. Las tres pruebas muestran dónde nace una discrepancia en un registro.',
      { choice: [
        { text: 'Una diferencia entre papeles demuestra que la caja nunca existió', then: [
          'La caja está delante de ti. El error de una hoja no invalida el movimiento real.'
        ] },
        { text: 'El formulario pudo firmarse en otro momento que el movimiento', then: [
          'El ensayo encaja con las pruebas de Olivo, Trigal e Iris sin inventar un viaje imposible.',
          { set: { 'flag.cg_carga_t4_fin': true } },
          { quest: 'cg_carga_johto', stage: 'turno' },
          { say: 'rotom', text: '¡Bzzt! ¡El fallo está en lo que los formularios dan por hecho! Ahora toca comprobar quién recibió la hoja.' },
          'La carpeta señala el almacén de Olivo durante un segundo turno. No hay que esperar a que sea de noche en el móvil: se puede entrar al turno de guardia al llegar.'
        ] },
        { text: 'Es imposible que alguien corrija un formulario', then: [
          'El formulario de prueba acabas de corregirlo tú. La pregunta es cuándo y por qué se hizo en la remesa real.'
        ] }
      ] }
    ],
    cg_carga_turno_inicio: [
      'La puerta de Olivo se abre para revisar el segundo turno. Dentro hay una lámpara de aceite y dos filas de cajas con números grandes.',
      'El reloj de la pared marca las 23:10 en la reconstrucción de esa noche. Tu partida puede seguir a cualquier hora real.',
      { say: 'yasmina', text: 'Aquí guardan las copias de los turnos. No estamos buscando culpables, solo la secuencia completa. Si alguien quiere explicar su parte, lo escucharemos.' },
      { say: 'rotom', text: '¡Bzzt! ¡Entreplanta, libro de guardia y mesa de firmas! ¡Hay trabajo hasta para un Rotom con cuatro brazos!' },
      { set: { 'flag.cg_carga_t5_inicio': true } },
      { quest: 'cg_carga_johto', stage: 'turno' }
    ],
    cg_carga_entreplanta: [
      'La escalera conduce a una fila de cajas rotuladas a mano. La tercera tiene una marca de tiza sobre el asa.',
      { choice: [
        { text: 'Comparar el polvo del asa con el de los estantes', then: [
          'El asa fue limpiada hace poco, pero el estante conserva la marca del mismo objeto. La caja pudo moverse sin salir del almacén.',
          { if: '!flag.cg_carga_t5_entreplanta', then: [
            { set: { 'flag.cg_carga_t5_entreplanta': true } },
            'Anotas: hubo un movimiento interno que no aparece como traslado de una ciudad a otra.'
          ] }
        ] },
        { text: 'Contar cuántas cajas faltan', then: [
          'El espacio vacío mide exactamente el ancho de la tercera caja. No hay un hueco con tamaño para una segunda remesa.',
          { if: '!flag.cg_carga_t5_entreplanta', then: [
            { set: { 'flag.cg_carga_t5_entreplanta': true } },
            'Anotas: el almacenamiento duplicado no implica dos entregas.'
          ] }
        ] },
        { text: 'Abrir todas las cajas', then: [
          'Yasmina te pide que no lo hagas: las cajas tienen dueños y no hay ninguna orden de abrirlas. Puedes estudiar las marcas externas.'
        ] }
      ] }
    ],
    cg_carga_guardia: [
      'El libro de guardia usa columnas diferentes: papel recibido, objeto recibido, reserva, salida.',
      { choice: [
        { text: 'Comparar columnas en vez de fechas aisladas', then: [
          'En la misma línea, la columna de papel recibido tiene una firma; la columna de objeto recibido está vacía.',
          { if: '!flag.cg_carga_t5_guardia', then: [
            { set: { 'flag.cg_carga_t5_guardia': true } },
            'Anotas la diferencia: el recibo original no se refería al bulto completo.'
          ] }
        ] },
        { text: 'Buscar dónde aparecen los cambios de turno', then: [
          'El cambio está firmado por un supervisor. Ese nombre certifica que el libro cambió de responsable, no que se entregara una caja.',
          { if: '!flag.cg_carga_t5_guardia', then: [
            { set: { 'flag.cg_carga_t5_guardia': true } },
            'Anotas: una firma de turno no es firma de transporte.'
          ] }
        ] },
        { text: 'Confiar en la columna más bonita', then: [
          'La caligrafía impecable no dice nada sobre la exactitud. Las columnas llevan encabezados distintos.'
        ] }
      ] }
    ],
    cg_carga_firmas: [
      'Sobre la mesa hay un cuaderno de muestras de tinta. Dos personas distintas han escrito «Recibido» con estilos de letra casi idénticos.',
      { choice: [
        { text: 'Comprobar dónde se usan las firmas', then: [
          'Una firma confirma el ingreso de papeles en el archivo; la otra confirma la entrada de mercancía. Se parecen porque ambos usan el mismo formulario.',
          { if: '!flag.cg_carga_t5_firmas', then: [
            { set: { 'flag.cg_carga_t5_firmas': true } },
            'Anotas: el contexto de la casilla importa tanto como el trazo.'
          ] }
        ] },
        { text: 'Seguir la tinta hacia la fecha del folio', then: [
          'La firma se añadió tras secarse una marca de agua. No puedes saber cuánto después, pero ya hay un orden material de los hechos.',
          { if: '!flag.cg_carga_t5_firmas', then: [
            { set: { 'flag.cg_carga_t5_firmas': true } },
            'Anotas: no todos los trazos se escribieron en un mismo momento.'
          ] }
        ] },
        { text: 'Decir que ambas firmas son de la misma persona', then: [
          'La semejanza no basta. Yasmina pone juntas dos muestras reales de empleados diferentes; la coincidencia es sorprendente.',
          { say: 'yasmina', text: 'Las letras pueden parecerse. Los compromisos que representan, no tanto.' }
        ] }
      ] }
    ],
    cg_carga_encargado: [
      'El encargado de almacén llega con una llave, dos recibos y una expresión de cansancio que no intenta disimular.',
      { say: 'yasmina', text: 'Estamos intentando reconstruir el turno. Podemos ir despacio. Nadie está aquí para perder un empleo por una sospecha.' },
      'El encargado examina tus tres notas antes de hablar.',
      { say: 'rotom', text: '¡Bzzt! Podemos preguntarle con calma o aceptar un desafío antes de sentarnos. Que haya combate no decide la verdad.' },
      { choice: [
        { text: 'Escuchar el relato del segundo turno', then: [
          '«A veces la carpeta viaja sola. Un guía entrega los papeles al siguiente, y la caja todavía está en el muelle. Yo recibí la carpeta, no el bulto».',
          { set: { 'flag.cg_carga_t5_escucho': true } },
          { call: 'cg_carga_turno_cierre' }
        ] },
        { text: 'Aceptar su combate de desafío (curación previa)', then: [
          { heal: true },
          { battle: 'cg_carga_guardia_desafio', lose: 'continue',
            onWin: [
              { set: { 'flag.cg_carga_t5_gano': true } },
              'El encargado guarda las Poké Balls y se sienta con la carpeta entre las manos.',
              '«Recibí el documento. La mercancía tardó. En el libro alguien juntó las dos cosas y ninguna persona revisó qué columna estaba firmando».',
              { call: 'cg_carga_turno_cierre' }
            ],
            onLose: [
              { set: { 'flag.cg_carga_t5_perdio': true } },
              'El encargado ofrece otra silla. «El combate no cambia el libro. Yo recibí la carpeta y el bulto llegó después».',
              { call: 'cg_carga_turno_cierre' }
            ] }
        ] },
        { text: 'Pedir las copias y pensarlo luego', then: [
          'El encargado deja los recibos sobre la mesa. No los esconde: puedes volver a hablar con él cuando quieras.'
        ] }
      ] }
    ],
    cg_carga_turno_cierre: [
      'La cronología se vuelve más simple: el recibo más antiguo era de documentos, no de un paquete.',
      { say: 'yasmina', text: 'Ahora sí tenemos elementos para explicar el error. Pero aún falta decidir cómo corregirlo sin cargarle a nadie una culpa que no podemos demostrar.' },
      { set: { 'flag.cg_carga_t5_fin': true } },
      { quest: 'cg_carga_johto', stage: 'recibo' },
      { diary: 'Hoy revisamos un segundo turno en el almacén de Olivo. Había una firma por recibir papeles y otra por recibir objetos. El mismo formato hizo que las horas parecieran imposibles. Nos falta decidir cómo corregir el registro sin convertir una hipótesis en una acusación.', cond: 'flag.b01_diario' }
    ]
  }
};
