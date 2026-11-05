// Pokémon Infinite · T7 ampliación: tres acuses, tres verdades y cierre verificable.
// No cambia personajes del canon, regiones, medallas ni progreso de la gira.
// El desenlace reconoce elecciones previas sin presentar una firma como acusación.
export default {
  items: {
    cg_carga_t7_libreta: {
      name: 'Libreta de los tres acuses', pocket: 'key',
      desc: 'Una libreta de consulta con la explicación que cada ciudad puede certificar.',
      read: 'LOS TRES ACUSES — JOHTO\n\nTRIGAL: preparación, movimiento de vagón y salida no son la misma operación.\nIRIS: tres observadores vieron partes distintas; una firma de archivo no prueba la llegada física de un bulto.\nCAOBA: una señal de mantenimiento del canal no es un manifiesto de mercancía.\n\nLa rectificación se sostiene por la comparación de fuentes, no por una persona a la que señalar.\n\nEl procedimiento elegido para difundir la corrección se conserva y no altera los hechos comprobados.'
    }
  },
  locations: {
    cg_carga_t7_patio_final: {
      name: 'Patio de verificación de Trigal', short: 'Patio de verificación',
      parent: 'trigal', region: 'johto', kind: 'area', bg: { type: 'ranch' },
      desc: 'El patio usa un pequeño tablero para comprobar que el nuevo formulario funciona. Mara tiene dos tarjetas de operación y un único número de remesa; nadie tendrá que rehacer la maniobra real.',
      spots: [
        { label: 'Mara y el nuevo registro', icon: '🧑‍🔧', sub: 'Escucha cómo cambió su turno sin atribuirle culpas',
          cond: 'flag.cg_carga_t6_fin', new: '!flag.cg_carga_t7_t_mara',
          doneIf: 'flag.cg_carga_t7_t_mara', talk: [{ script: 'cg_carga_t7_t_mara' }] },
        { label: 'Tablero de las tres operaciones', icon: '🚃', sub: 'Prepara, maniobra y despacha sin duplicar la remesa',
          cond: 'flag.cg_carga_t7_t_mara', new: '!flag.cg_carga_t7_t_tablero',
          doneIf: 'flag.cg_carga_t7_t_tablero', talk: [{ script: 'cg_carga_t7_t_tablero' }] },
        { label: 'Prueba de lectura del encargado', icon: '📘', sub: 'Comprueba si otra persona entiende el asiento nuevo',
          cond: 'flag.cg_carga_t7_t_tablero', new: '!flag.cg_carga_t7_t_lectura',
          doneIf: 'flag.cg_carga_t7_t_lectura', talk: [{ script: 'cg_carga_t7_t_lectura' }] },
        { label: 'Volver al patio central', icon: '↩️', sub: 'Acusa recibo en la mesa original de Trigal',
          action: { go: 'trigal' } }
      ]
    },
    cg_carga_t7_archivo_final: {
      name: 'Archivo de testimonios de Iris', short: 'Archivo de Iris',
      parent: 'iris', region: 'johto', kind: 'building', bg: { type: 'indoor' },
      desc: 'Alda conserva tres testimonios por separado, como las tres linternas de un mismo puente. El acuse debe entenderse sin convertir los recuerdos distintos en mentiras.',
      spots: [
        { label: 'Alda y las tarjetas de los guías', icon: '🗂️', sub: 'Separa observaciones y testimonios',
          cond: 'flag.cg_carga_t6_fin', new: '!flag.cg_carga_t7_i_tarjetas',
          doneIf: 'flag.cg_carga_t7_i_tarjetas', talk: [{ script: 'cg_carga_t7_i_tarjetas' }] },
        { label: 'La carta para los siguientes guías', icon: '✉️', sub: 'Escribe una indicación que puedan cumplir sin vigilar a nadie',
          cond: 'flag.cg_carga_t7_i_tarjetas', new: '!flag.cg_carga_t7_i_carta',
          doneIf: 'flag.cg_carga_t7_i_carta', talk: [{ script: 'cg_carga_t7_i_carta' }] },
        { label: 'Lectura cruzada del archivo', icon: '🔍', sub: 'Comprueba qué demuestra la firma y qué todavía no se sabe',
          cond: 'flag.cg_carga_t7_i_carta', new: '!flag.cg_carga_t7_i_lectura',
          doneIf: 'flag.cg_carga_t7_i_lectura', talk: [{ script: 'cg_carga_t7_i_lectura' }] },
        { label: 'Regresar a Iris', icon: '↩️', sub: 'El acuse final se firma en la mesa principal',
          action: { go: 'iris' } }
      ]
    },
    cg_carga_t7_orilla_final: {
      name: 'Estación de cuidado del canal', short: 'Estación de cuidado',
      parent: 'caoba', region: 'johto', kind: 'area', bg: { type: 'coast' },
      desc: 'Una marca nueva de nivel está colocada cerca del refugio de Wooper. Ina propone un protocolo sencillo que pueda repetirse después de cada lluvia sin alterar la corriente de golpe.',
      spots: [
        { label: 'Ina y la marca del nivel', icon: '📏', sub: 'Comprueba si la reparación sigue funcionando',
          cond: 'flag.cg_carga_t6_fin', new: '!flag.cg_carga_t7_c_nivel',
          doneIf: 'flag.cg_carga_t7_c_nivel', talk: [{ script: 'cg_carga_t7_c_nivel' }] },
        { label: 'Ensayo de aviso por lluvias', icon: '🌧️', sub: 'Decide qué hacer si el remanso vuelve',
          cond: 'flag.cg_carga_t7_c_nivel', new: '!flag.cg_carga_t7_c_protocolo',
          doneIf: 'flag.cg_carga_t7_c_protocolo', talk: [{ script: 'cg_carga_t7_c_protocolo' }] },
        { label: 'Visita tranquila a Wooper', icon: '💧', sub: 'Observa a distancia; no necesita pelear ni ser capturado',
          cond: 'flag.cg_carga_t7_c_protocolo', new: '!flag.cg_carga_t7_c_wooper',
          doneIf: 'flag.cg_carga_t7_c_wooper', talk: [{ script: 'cg_carga_t7_c_wooper' }] },
        { label: 'Regresar a Caoba', icon: '↩️', sub: 'El acuse del canal se firma en el registro de la ciudad',
          action: { go: 'caoba' } }
      ]
    },
    cg_carga_t7_mesa_cierre: {
      name: 'Mesa de cierre del expediente', short: 'Mesa de cierre',
      parent: 'olivo', region: 'johto', kind: 'building', bg: { type: 'indoor' },
      desc: 'Yasmina deja tres acuses en una mesa limpia. Hay un lugar para lo demostrado, otro para las dudas y un último espacio para el procedimiento de difusión elegido durante la rectificación. No hay acusado ni combate final: se trata de defender una conclusión.',
      spots: [
        { label: 'Ordenar los tres acuses', icon: '🧩', sub: 'Una última prueba de coherencia, no de memoria',
          cond: 'flag.cg_carga_t7_trigal && flag.cg_carga_t7_iris && flag.cg_carga_t7_caoba',
          new: '!flag.cg_carga_t7_ordenados', doneIf: 'flag.cg_carga_t7_ordenados',
          talk: [{ script: 'cg_carga_t7_orden_final' }] },
        { label: 'Revisar consecuencias del procedimiento', icon: '🗣️', sub: 'Tu elección pública o reservada conserva los mismos hechos',
          cond: 'flag.cg_carga_t7_ordenados', new: '!flag.cg_carga_t7_procedimiento',
          doneIf: 'flag.cg_carga_t7_procedimiento', talk: [{ script: 'cg_carga_t7_procedimiento' }] },
        { label: 'Preparar el acta de cierre', icon: '📘', sub: 'Distingue hallazgos, hipótesis y aquello que no se pudo demostrar',
          cond: 'flag.cg_carga_t7_procedimiento', new: '!flag.cg_carga_t7_cierre_listo',
          doneIf: 'flag.cg_carga_t7_cierre_listo', talk: [{ script: 'cg_carga_t7_conclusion' }] },
        { label: 'Releer la libreta del caso', icon: '📓', sub: 'No modifica pruebas ni entrega recompensas otra vez',
          cond: 'flag.cg_carga_t7_cierre_listo', talk: [{ script: 'cg_carga_t7_relectura' }] },
        { label: 'Regresar al almacén de Olivo', icon: '↩️', sub: 'El cierre definitivo y sus premios siguen en la mesa original',
          action: { go: 'olivo' } }
      ]
    }
  },
  patches: {
    trigal: { spots: [
      { label: 'Patio de verificación del nuevo registro', icon: '🚃',
        sub: 'Comprobar en práctica la rectificación de los vagones',
        cond: 'flag.cg_carga_t6_fin', new: '!flag.cg_carga_t7_t_lectura',
        action: { go: 'cg_carga_t7_patio_final' } }
    ] },
    iris: { spots: [
      { label: 'Archivo de los tres testimonios', icon: '🗂️',
        sub: 'Que la copia diga lo que cada guía pudo confirmar',
        cond: 'flag.cg_carga_t6_fin', new: '!flag.cg_carga_t7_i_lectura',
        action: { go: 'cg_carga_t7_archivo_final' } }
    ] },
    caoba: { spots: [
      { label: 'Estación de cuidado del canal', icon: '🌿',
        sub: 'Comprobar el caudal y la seguridad del refugio de Wooper',
        cond: 'flag.cg_carga_t6_fin', new: '!flag.cg_carga_t7_c_wooper',
        action: { go: 'cg_carga_t7_orilla_final' } }
    ] },
    olivo: { spots: [
      { label: 'Mesa de cierre de los tres acuses', icon: '📚',
        sub: 'Una última comprobación antes del cierre y el reconocimiento',
        cond: 'flag.cg_carga_t7_trigal && flag.cg_carga_t7_iris && flag.cg_carga_t7_caoba',
        new: '!flag.cg_carga_t7_cierre_listo',
        action: { go: 'cg_carga_t7_mesa_cierre' } }
    ] }
  },
  scripts: {
    cg_carga_t7_t_mara: [
      'Mara espera junto a los vagones de práctica, con las manos manchadas de tiza. Ha tachado una cifra en su pañuelo, pero esta vez escribió al lado el motivo.',
      { if: 'flag.cg_carga_t6_publica', then: [
        { say: 'cg_carga_mara', text: 'Ahora la regla está escrita a la vista de todos. Puedo mostrarla a quien llegue al turno siguiente sin explicar un rumor.' }
      ], else: [
        { say: 'cg_carga_mara', text: 'Primero nos explicaron el error a los que estuvimos aquí. No hubo nombres en el tablón y aun así cambió la manera de apuntar.' }
      ] },
      { choice: [
        { text: 'Preguntarle qué hace ahora con dos anotaciones', then: [
          { say: 'cg_carga_mara', text: 'Cuando cambio una caja de vagón, marco maniobra. Cuando sale del patio, marco despacho. Si alguien recibe solo el papel, no lo pongo en esa casilla.' },
          { set: { 'flag.cg_carga_t7_t_mara': true } },
          'Mara te entrega tres tarjetas sin nombre para comprobarlo.'
        ] },
        { text: 'Pedirle que firme por todas las personas del patio', then: [
          { say: 'cg_carga_mara', text: 'No. Puedo dar fe de mi maniobra, no de lo que vio otra persona desde la estación.' },
          { say: 'rotom', text: '¡Bzzt! Un acuse debe tener un alcance concreto.' }
        ] }
      ] }
    ],
    cg_carga_t7_t_tablero: [
      'Un único bulto de práctica pasa de vagón 16 a vagón 18 y luego se detiene junto a la salida. Las tres tarjetas están sobre el tablero.',
      { choice: [
        { text: 'Preparación, cambio de vagón, salida: tres hechos de una remesa', then: [
          'Colocas las tarjetas en una sola línea sin crear un segundo envío. La primera operación no garantiza la última; cada una tiene su propio registro.',
          { set: { 'flag.cg_carga_t7_t_tablero': true } },
          { say: 'cg_carga_mara', text: 'Así puedo informar qué moví yo sin parecer responsable de lo que ocurrió kilómetros después.' }
        ] },
        { text: 'Tres tarjetas significan tres envíos independientes', then: [
          'Solo hay una caja. El número de movimientos no es el número de remesas.',
          'Mara devuelve las tarjetas al centro. Puedes volver a ordenarlas.'
        ] },
        { text: 'Ignorar el cambio de vagón para que la hoja se vea simple', then: [
          'Sin ese dato, el siguiente turno no entendería por qué apareció un segundo número en la pizarra.'
        ] }
      ] }
    ],
    cg_carga_t7_t_lectura: [
      'Una persona que acaba de entrar al patio lee las tarjetas sin haber estado durante la investigación.',
      { choice: [
        { text: 'Pedirle que diga cuántas cajas y cuántas operaciones hubo', then: [
          'Responde: «Una caja, tres operaciones. El número 18 describe dónde acabó la maniobra y el despacho». No necesita saber quién inició la investigación.',
          { set: { 'flag.cg_carga_t7_t_lectura': true } },
          'El procedimiento se entiende por sí solo. El acuse de Trigal ya puede firmarse.'
        ] },
        { text: 'Pedirle que señale al responsable de todo el recorrido', then: [
          'El nuevo registro deja claro quién confirmó cada operación, pero no asigna a nadie hechos que no presenció.'
        ] }
      ] }
    ],
    cg_carga_t7_i_tarjetas: [
      'Alda ha conservado tres tarjetas con dibujos: un camino mojado, un farol de relevo y una hoja resguardada de la lluvia.',
      { say: 'cg_carga_alda_iris', text: 'Los tres guías están de acuerdo en lo que observaron, no necesariamente en los minutos. Podemos escribir eso sin obligarlos a recordar un reloj que no miraron.' },
      { choice: [
        { text: 'Mantener separados sus tres testimonios', then: [
          'Guardas los dibujos en casillas distintas. El camino, el farol y la hoja pueden haber sido observados por personas diferentes.',
          { set: { 'flag.cg_carga_t7_i_tarjetas': true } },
          'La explicación conserva la procedencia de cada detalle.'
        ] },
        { text: 'Fundir los tres relatos en una declaración atribuida a una sola persona', then: [
          'Eso pondría palabras en la boca de alguien que no estuvo en los tres lugares. Alda vuelve a separar las tarjetas.'
        ] }
      ] }
    ],
    cg_carga_t7_i_carta: [
      'El archivo necesita una nota para quien cubra la próxima ruta de los guías. La nota irá en una carpeta de servicio, no en el expediente personal de nadie.',
      { choice: [
        { text: 'Pedir que cada guía identifique qué entregó y a quién', then: [
          'La nota establece dos casillas separadas: documentos y objetos. Cada guía certificará solo la entrega que haya visto.',
          { set: { 'flag.cg_carga_t7_i_carta': true } },
          { if: 'flag.cg_carga_t6_reservada', then: [
            'Alda propone explicarla primero en una reunión breve y luego colocar el procedimiento sin nombres en el archivo.'
          ], else: [
            'Alda cuelga una copia sin nombres en la mesa para que cualquier guía pueda consultarla.'
          ] }
        ] },
        { text: 'Exigir que todos firmen la misma entrega aunque no estuvieran juntos', then: [
          'Eso repetiría el problema del recibo de Olivo: varias personas terminarían certificando un hecho que no observaron.'
        ] },
        { text: 'Suprimir las firmas por completo', then: [
          'Sin un acuse no habría forma de demostrar cuándo llegó la carpeta. Mejor conservar la operación correcta.'
        ] }
      ] }
    ],
    cg_carga_t7_i_lectura: [
      'La tercera guía relee la nueva nota. Mira la hoja y el sello, pero no pretende reconocer una caja que no vio llegar.',
      { choice: [
        { text: 'Confirmar la recepción de la hoja sin atribuir entrega física', then: [
          'La guía aprueba la casilla «Documentos recibidos» y deja que otro registro confirme el traslado material.',
          { set: { 'flag.cg_carga_t7_i_lectura': true } },
          { say: 'cg_carga_alda_iris', text: 'Ahora sí podremos mostrar una copia que no convierta tres testigos de hechos distintos en una sola firma falsa.' }
        ] },
        { text: 'Decir que la firma prueba quién movió la carga', then: [
          'La firma solo confirma que la guía entregó o recibió papeles. Esa prueba no identifica a quien movió el bulto.'
        ] }
      ] }
    ],
    cg_carga_t7_c_nivel: [
      'Ina señala dos marcas en las estacas. El agua corre por la vía principal y deja el refugio de Wooper sin el remanso de antes.',
      { if: 'flag.cg_carga_t3_cauce', then: [
        { say: 'cg_carga_ina_caoba', text: 'Tuviste cuidado al despejar desde la orilla. Eso nos dio espacio para corregir el paso del agua.' }
      ], else: [
        { say: 'cg_carga_ina_caoba', text: 'Avisaste a quienes cuidan el canal. Cuando volvimos, pudimos retirar el obstáculo sin espantar a Wooper.' }
      ] },
      { choice: [
        { text: 'Medir de nuevo los dos niveles sin mover las señales', then: [
          'La diferencia entre estacas es menor. Hay un flujo estable; no hace falta abrir otra compuerta para demostrarlo.',
          { set: { 'flag.cg_carga_t7_c_nivel': true } }
        ] },
        { text: 'Mover una señal para que las alturas coincidan', then: [
          'Eso haría que el agua pareciera segura en el papel, sin cambiar la corriente. Ina vuelve a colocar la estaca.'
        ] }
      ] }
    ],
    cg_carga_t7_c_protocolo: [
      'Ina prepara un procedimiento para las lluvias fuertes. Wooper sigue en el agua, lejos de las herramientas.',
      { choice: [
        { text: 'Revisar niveles, comprobar rejilla y actuar gradualmente desde tierra', then: [
          'La señal indica cuándo solicitar mantenimiento, cómo revisar la corriente y cuándo detenerse si hay sedimentos. No manda entrar a un Pokémon.',
          { set: { 'flag.cg_carga_t7_c_protocolo': true } },
          { say: 'cg_carga_ina_caoba', text: 'Éste es un protocolo que otra persona puede seguir sin haber estado contigo el día de la investigación.' }
        ] },
        { text: 'Abrir completamente la compuerta apenas llueva', then: [
          'Una apertura súbita puede arrastrar barro al refugio. Ina mantiene la compuerta bajo control.'
        ] },
        { text: 'Pedir a Wooper que despeje el canal cada vez', then: [
          'Wooper no es una herramienta de mantenimiento. Se protegerá su refugio mientras las personas inspeccionan la orilla.'
        ] }
      ] }
    ],
    cg_carga_t7_c_wooper: [
      'Te quedas en la pasarela sin acercarte al agua. Wooper asoma la cabeza y se queda un rato mirando cómo las hojas pasan de largo.',
      { choice: [
        { text: 'Observarlo sin intentar capturarlo ni tocar el cauce', then: [
          'Wooper vuelve bajo un junco. No hay una recompensa por interrumpir su descanso.',
          { set: { 'flag.cg_carga_t7_c_wooper': true } },
          { say: 'cg_carga_ina_caoba', text: 'Lo que necesitaba era agua segura. El acuse puede confirmar la revisión de esa señal, no la entrega de una caja.' }
        ] },
        { text: 'Agitar el agua para comprobar si sigue allí', then: [
          'Wooper desaparece entre las plantas. Ina te hace un gesto para guardar silencio y dejar que la corriente se asiente.'
        ] }
      ] }
    ],
    cg_carga_t7_orden_final: [
      'La mesa de Yasmina tiene tres sobres cerrados. En cada uno hay un acuse firmado por el responsable de su propia tarea, no por alguien que no pudo observarla.',
      { say: 'yasmina', text: 'Tenemos que explicar la historia con lo que cada lugar demuestra. Si confundimos los sobres volveremos al problema del primer día.' },
      { choice: [
        { text: 'Trigal: maniobras; Iris: documentos; Caoba: mantenimiento', then: [
          'El orden permite seguir el expediente sin convertir las horas de unos asientos en otras. Cada fuente queda bajo su título correcto.',
          { if: '!flag.cg_carga_t7_ordenados', then: [
            { set: { 'flag.cg_carga_t7_ordenados': true } },
            { give: 'cg_carga_t7_libreta' }
          ] },
          { say: 'yasmina', text: 'Exactamente. No resolvimos una paradoja cambiando el pasado, sino dejando de llamar igual a tareas distintas.' }
        ] },
        { text: 'Los tres sobres confirman que el mismo trabajador recibió la caja', then: [
          'No. Trigal registró maniobras, Iris recibió documentos y Caoba documentó una revisión del canal. Ninguno acredita esa conclusión.'
        ] },
        { text: 'Borrar los documentos que se contradigan', then: [
          'La contradicción era entre interpretaciones, no entre todos los hechos. Borrarlos impediría revisar la rectificación.'
        ] }
      ] }
    ],
    cg_carga_t7_procedimiento: [
      { if: 'flag.cg_carga_t6_publica', then: [
        'Yasmina despliega una copia del procedimiento público sin nombres. En Trigal pueden leerlo al cambiar turno, en Iris conservarlo con los testimonios y en Caoba separarlo del libro de aforo.',
        { say: 'yasmina', text: 'Elegiste que cualquiera pudiera consultar la regla. No aparecerán nombres de empleados ni datos privados; lo visible será el procedimiento.' }
      ], else: [
        'Yasmina lee el acta de la reunión reservada. El personal involucrado recibió la explicación antes de que se colocara una nota de procedimiento en las tres estaciones.',
        { say: 'yasmina', text: 'Elegiste escuchar primero a quienes estuvieron ahí. La regla se aplicará igual, pero la comunicación respetará ese orden.' }
      ] },
      { if: 'flag.cg_carga_t5_forma_dialogo', then: [
        'El testimonio del encargado aparece antes de la hoja corregida. Se conserva como testimonio, no como sustituto del registro.'
      ], else: [
        'El pliego del encargado aparece antes de su explicación. El documento y su respuesta siguen identificados por separado.'
      ] },
      { choice: [
        { text: 'Conservar la decisión y verificar que los tres sitios comprendan la regla', then: [
          { set: { 'flag.cg_carga_t7_procedimiento': true } },
          'En cada acuse aparece la operación que realmente se verificó, sin cambiar el procedimiento que elegiste en T6.',
          { say: 'yasmina', text: 'La forma de dar la noticia tuvo consecuencias para las personas. Los hechos comprobados no cambian por ello.' }
        ] },
        { text: 'Cambiar todo el relato para que parezca que nadie se equivocó', then: [
          'Eso destruiría la razón de la corrección. Se puede proteger la identidad sin ocultar que el procedimiento era confuso.'
        ] }
      ] }
    ],
    cg_carga_t7_conclusion: [
      'Yasmina prepara el cierre sobre papel nuevo. La antigua hoja queda archivada junto a la rectificación: nadie va a reescribirla a escondidas.',
      { choice: [
        { text: 'Confirmar hechos, separar hipótesis y mantener dudas sin nombres', then: [
          'Anotas que se recibieron documentos, que un bulto tuvo otra secuencia de transporte y que una casilla mezcló operaciones distintas.',
          'Se conservan como dudas la identidad no acreditada de quien firmó y los detalles que ningún testigo presenció.',
          { set: { 'flag.cg_carga_t7_cierre_listo': true } },
          { say: 'yasmina', text: 'Ahora puedes cerrar la carpeta. Ningún apellido de otro bloque ni ninguna decisión de la gira tuvo que cambiar para explicarlo.' }
        ] },
        { text: 'Afirmar que el primer firmante ocultó deliberadamente la carga', then: [
          'No existe evidencia que demuestre esa intención. Yasmina deja la acusación fuera del documento.'
        ] },
        { text: 'Declarar que no hubo ningún movimiento de mercancía', then: [
          'La mercancía sí tuvo un recorrido. Lo incorrecto fue utilizar el acuse documental como fecha de recepción física.'
        ] }
      ] }
    ],
    cg_carga_t7_relectura: [
      { read: 'cg_carga_t7_libreta' },
      'La libreta permite revisar las tres conclusiones sin repetir la investigación ni duplicar los premios.'
    ]
  }
};