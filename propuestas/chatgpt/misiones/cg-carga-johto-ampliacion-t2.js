// Pokémon Infinite · Ampliación incremental T2 (Iris).
// El gabinete de las copias: investigación física, minijuego de archivo y cotejo de testimonios.
// Es una propuesta aislada; no toca la gira, las relaciones ni las banderas del canon.
export default {
  npcs: {
    cg_carga_alda_iris: {
      name: 'Alda', title: 'Custodia de documentos de Iris',
      look: { hair: 'tied', hairColor: '#4b3836', eyes: '#596568',
        outfit: '#758b83', outfit2: '#e9d6b8', skin: 3, acc: 'glasses', mouth: 'flat', bg: '#d6dfd7' }
    }
  },
  items: {
    cg_carga_calco_iris: {
      name: 'Calco de Iris', pocket: 'key',
      desc: 'Una copia autorizada de la esquina húmeda del documento. Distingue el texto impreso, el sello y la firma.',
      read: 'ARCHIVO DE IRIS — CALCO DE LA HOJA\n\n1. La fecha se imprimió antes de que se mojara el borde. La tinta de la fecha se extendió con la humedad.\n2. El sello de recepción documental está completo y no registra un bulto.\n3. La firma está escrita sobre una zona que ya estaba seca.\n\nConclusión documental: el calco muestra el orden físico de tres marcas, pero no quién puso la firma ni dónde estaba la caja.'
    },
    cg_carga_acta_cotejo_iris: {
      name: 'Acta de cotejo de Iris', pocket: 'key',
      desc: 'Una hoja donde se distinguen las observaciones, los testimonios y las dudas que permanecen.',
      read: 'ACTA DE COTEJO — IRIS\n\nDATO DOCUMENTAL: el sello registra la recepción de una hoja; no afirma que se recibiera una caja.\nTESTIMONIO: el guía conoce el camino, la segunda guía entregó un farol y la tercera protegió la hoja húmeda.\nPRUEBA MATERIAL: la fecha y la firma se hicieron en momentos distintos.\n\nNO DEMOSTRADO: identidad de la persona firmante, hora exacta del traslado y responsabilidad de una persona concreta.\n\nNo se usa una ausencia de datos como prueba de culpabilidad.'
    }
  },
  locations: {
    cg_carga_gabinete_iris: {
      name: 'Gabinete de copias de Iris', short: 'Gabinete de copias',
      kind: 'building', parent: 'iris', region: 'johto',
      bg: { type: 'indoor' },
      desc: 'El gabinete está lleno de papeles que crujen al tocarse. Alda conserva documentos y copias de servicio en cajones etiquetados. Una ventana permite examinar las fibras a contraluz y un tablero separa datos de testimonios. Nadie tiene que adivinar la historia: las marcas pueden comprobarse.',
      spots: [
        { label: 'Alda y la mesa de custodia', icon: '👓',
          sub: 'Pide permiso para cotejar las copias sin alterar el original',
          new: '!flag.cg_carga_t2_gabinete_permiso',
          talk: [{ script: 'cg_carga_t2_gabinete_permiso' }] },
        { label: 'Folio junto a la ventana', icon: '🪟',
          sub: 'La luz deja ver dónde cambió la textura del papel',
          cond: 'flag.cg_carga_t2_gabinete_permiso',
          new: '!flag.cg_carga_t2_fibra',
          doneIf: 'flag.cg_carga_t2_fibra',
          talk: [{ script: 'cg_carga_t2_fibras' }] },
        { label: 'Tinta bajo la lupa', icon: '🔍',
          sub: 'Una misma hoja conserva tres marcas diferentes',
          cond: 'flag.cg_carga_t2_gabinete_permiso',
          new: '!flag.cg_carga_t2_tinta',
          doneIf: 'flag.cg_carga_t2_tinta',
          talk: [{ script: 'cg_carga_t2_tintas' }] },
        { label: 'Cajón de copias lacradas', icon: '🗄️',
          sub: 'Abre con el mecanismo de memoria o solicita a Alda una copia supervisada',
          cond: 'flag.cg_carga_t2_gabinete_permiso && !flag.cg_carga_t2_calco',
          new: 'true', talk: [{ script: 'cg_carga_t2_cajon' }] },
        { label: 'Releer el calco', icon: '📄',
          sub: 'Documento material de la investigación',
          cond: 'flag.cg_carga_t2_calco',
          talk: [{ script: 'cg_carga_t2_leer_calco' }] },
        { label: 'Ensayo de humedad con papel sin escribir', icon: '💧',
          sub: 'Prueba material, sin mojar el documento original',
          cond: 'flag.cg_carga_t2_fibra && flag.cg_carga_t2_tinta',
          new: '!flag.cg_carga_t2_ensayo',
          doneIf: 'flag.cg_carga_t2_ensayo',
          talk: [{ script: 'cg_carga_t2_humedad' }] },
        { label: 'Tablero de contradicciones', icon: '🧠',
          sub: 'Compara los testimonios con pruebas materiales verificadas',
          cond: 'flag.cg_carga_t2_guia1 && flag.cg_carga_t2_guia2 && flag.cg_carga_t2_guia3 && flag.cg_carga_t2_calco && flag.cg_carga_t2_ensayo',
          new: '!flag.cg_carga_t2_tablero',
          doneIf: 'flag.cg_carga_t2_tablero',
          talk: [{ script: 'cg_carga_t2_tablero' }] },
        { label: 'Redactar el acta de Iris', icon: '📋',
          sub: 'Redacta solo aquello que respalda cada una de las fuentes',
          cond: 'flag.cg_carga_t2_tablero',
          new: '!flag.cg_carga_t2_anexo_cotejo',
          doneIf: 'flag.cg_carga_t2_anexo_cotejo',
          talk: [{ script: 'cg_carga_t2_acta' }] },
        { label: 'Mesa de archivo terminada', icon: '📚',
          sub: 'La copia queda a disposición para revisarla después',
          cond: 'flag.cg_carga_t2_anexo_cotejo',
          talk: [{ script: 'cg_carga_t2_archivo_despues' }] }
      ]
    }
  },
  patches: {
    iris: {
      spots: [
        { label: 'Gabinete de copias de Iris', icon: '📜',
          sub: 'Luz, tinta, calcos y testimonios que se pueden cotejar',
          cond: 'flag.cg_carga_t2_inicio',
          new: '!flag.cg_carga_t2_anexo_cotejo',
          action: { go: 'cg_carga_gabinete_iris' }
        }
      ]
    }
  },
  scripts: {
    cg_carga_t2_gabinete_permiso: [
      'Alda se levanta de una mesa baja. Lleva una pluma detrás de la oreja y mira primero el sobre que traes, no tus Poké Balls.',
      { say: 'cg_carga_alda_iris', text: 'Si vienes por la hoja húmeda, debo preguntarte para qué la necesitas. No puedo permitir que alguien se lleve el original o le añada tinta.' },
      { choice: [
        { text: 'Pedir una copia y trabajar sin tocar el original', then: [
          { say: 'cg_carga_alda_iris', text: 'Eso puedo autorizarlo. La hoja original quedará bajo cristal. Los calcos se conservan en un cajón de práctica; no tienen nombres de clientes.' },
          { set: { 'flag.cg_carga_t2_gabinete_permiso': true } },
          'Alda acerca la lámpara a la ventana y coloca una lupa. «Primero observa. Después decide si hay algo que realmente puedas afirmar».'
        ] },
        { text: 'Exigir el original y la lista completa de firmantes', then: [
          { say: 'cg_carga_alda_iris', text: 'No. Querer una respuesta no autoriza revisar los nombres de todo el mundo. Puedes solicitar una copia anonimizada o dejar el asunto aquí.' },
          { say: 'rotom', text: '¡Bzzt! No necesitamos abrir un expediente de personas para estudiar cómo se hizo un sello.' }
        ] },
        { text: 'Retirarte hasta tener más información', then: [
          { say: 'cg_carga_alda_iris', text: 'La puerta seguirá abierta. El papel no se va a mover sin dejar constancia.' }
        ] }
      ] }
    ],
    cg_carga_t2_fibras: [
      'El borde del papel parece liso desde arriba, pero a contraluz se ven fibras levantadas en una franja curva.',
      'La marca de humedad no llega hasta el espacio reservado para firmar.',
      { choice: [
        { text: 'Seguir el borde entre fibras hinchadas y secas', then: [
          'La fecha impresa atraviesa la zona humedecida. La firma queda más allá del límite, sobre una parte que pudo secarse antes.',
          { if: '!flag.cg_carga_t2_fibra', then: [
            { set: { 'flag.cg_carga_t2_fibra': true } },
            { say: 'cg_carga_alda_iris', text: 'Eso es una observación. No indica todavía quién escribió sobre la parte seca.' }
          ] }
        ] },
        { text: 'Buscar una rasgadura junto a la firma', then: [
          'El papel no está rasgado. Lo que parecía una línea rota es una fibra reflejando la luz.',
          { say: 'rotom', text: '¡Bzzt! Las sombras parecen una gran conspiración si las miras de reojo.' }
        ] },
        { text: 'Concluir que alguien borró una firma', then: [
          'No hay abrasión ni tinta levantada donde iría la firma. No puedes inferir un borrado solo a partir del borde húmedo.',
          { say: 'cg_carga_alda_iris', text: 'Esa conclusión necesita otra prueba. La luz no la da.' }
        ] }
      ] }
    ],
    cg_carga_t2_tintas: [
      'Bajo la lupa, la fecha es una impresión de puntos uniformes. El sello tiene tinta más espesa y la firma trazos irregulares.',
      { choice: [
        { text: 'Separar impresión, sello y firma por método', then: [
          'La impresión es mecánica; el sello deja bordes con exceso de tinta; la firma presiona el papel y cambia de grosor.',
          { if: '!flag.cg_carga_t2_tinta', then: [
            { set: { 'flag.cg_carga_t2_tinta': true } },
            'Registras tres clases de marca, sin suponer que salieron de la misma mano.'
          ] }
        ] },
        { text: 'Ordenarlas solo por intensidad de color', then: [
          'Un sello más oscuro puede haberse puesto antes o después. La cantidad de tinta no es un reloj.',
          { say: 'rotom', text: '¡Bzzt! Si todo lo azul ocurriera al mismo tiempo, mi pantalla sería una máquina del tiempo.' }
        ] },
        { text: 'Buscar un nombre escondido bajo los puntos', then: [
          'Los puntos forman una fecha, no un nombre. Hay varios caracteres ilegibles; no sería responsable completarlos de memoria.'
        ] }
      ] }
    ],
    cg_carga_t2_cajon: [
      'Alda señala un cajón de seguridad de práctica. Tiene un cierre de cuatro luces que se encienden en secuencia.',
      { say: 'cg_carga_alda_iris', text: 'Este cajón protege copias de trabajo, no documentos reservados. Si quieres practicar la apertura, repite la secuencia de luces. Si el mecanismo falla, puedo abrirlo yo con una autorización.' },
      { choice: [
        { text: 'Reproducir la secuencia del cierre', then: [
          { minigame: {
            type: 'lock',
            id: 'cg_carga_t2_cierre_iris',
            title: 'Cajón de calcos de Iris',
            hint: 'Recuerda el orden de las luces. Puedes repetir la secuencia; los fallos no destruyen documentos.',
            theme: 'caja', level: 2,
            picks: 0, guaranteed: ['cg_carga_calco_iris'], consolation: false,
            lootTitle: 'Calco autorizado'
          },
          onWin: [
            { set: { 'flag.cg_carga_t2_calco': true, 'flag.cg_carga_t2_cajon_abierto': true } },
            'El mecanismo suelta el cajón. Dentro hay una hoja de calco que marca la esquina húmeda del documento y la posición exacta de la firma.',
            { say: 'cg_carga_alda_iris', text: 'Bien. El calco es tuyo para este cotejo. El original no salió del gabinete.' }
          ],
          onLose: [
            { set: { 'flag.cg_carga_t2_cajon_intento': true } },
            'El cierre vuelve a apagarse sin abrir. El documento no sufrió ningún daño.',
            { say: 'cg_carga_alda_iris', text: 'Puedes volver a probar, o pedirme que supervise la apertura. Lo importante es interpretar bien lo que encuentres.' }
          ],
          onQuit: [
            { say: 'rotom', text: '¡Bzzt! No hay prisa ni castigo por salir. El cajón espera al lado de la lupa.' }
          ] }
        ] },
        { text: 'Solicitar una apertura supervisada a Alda',
          cond: 'flag.cg_carga_t2_guia2 || flag.cg_carga_t2_cajon_intento',
          then: [
            { say: 'cg_carga_alda_iris', text: 'Ya comprobaste una fuente independiente o intentaste el cierre. Está bien. Firmaré la salida de la copia de trabajo.' },
            { if: '!flag.cg_carga_t2_calco', then: [
              { give: 'cg_carga_calco_iris' },
              { set: { 'flag.cg_carga_t2_calco': true, 'flag.cg_carga_t2_copia_supervisada': true } }
            ] },
            'Alda entrega un calco anonimizado. La diferencia entre sello y firma ya se puede estudiar sin tocar el original.'
          ]
        },
        { text: 'Regresar a las otras pruebas', then: [
          'Alda asiente. «El cajón seguirá aquí. Ninguna conclusión debería exigir una cerradura ganada a la primera».'
        ] }
      ] }
    ],
    cg_carga_t2_leer_calco: [
      { read: 'cg_carga_calco_iris' },
      { say: 'rotom', text: '¡Bzzt! La fecha, el sello y la firma cuentan momentos distintos. Pero el calco no tiene boca para decir quién lo hizo.' }
    ],
    cg_carga_t2_humedad: [
      { say: 'cg_carga_alda_iris', text: 'No mojaremos el documento. Usa una hoja de práctica, con una fecha impresa y una firma en un rincón seco. Verás cómo cambia el papel.' },
      { choice: [
        { text: 'Mojar solo la fecha y esperar a que se seque', then: [
          'La fecha se corre. El espacio seco conserva el trazo de la firma que haces después. La hoja de práctica reproduce un orden posible sin decir qué pasó en el envío real.',
          { if: '!flag.cg_carga_t2_ensayo', then: [
            { set: { 'flag.cg_carga_t2_ensayo': true } },
            'Anotas: «Una firma intacta y una fecha corrida pueden pertenecer a momentos diferentes de una misma hoja».'
          ] }
        ] },
        { text: 'Mojar toda la hoja y firmarla mientras está empapada', then: [
          'La firma se deshace junto con la fecha. No reproduce lo que se ve en el documento original.',
          { say: 'cg_carga_alda_iris', text: 'Acabas de refutar una hipótesis. Eso también es una observación útil. Prueba a separar los momentos.' }
        ] },
        { text: 'Aplicar tinta sobre la misma marca hasta que coincidan', then: [
          'El papel queda cubierto. Ya no podrías comprobar qué marca llegó primero.',
          { say: 'rotom', text: '¡Bzzt! Si borramos las diferencias, la prueba dejará de explicar algo.' }
        ] }
      ] }
    ],
    cg_carga_t2_tablero: [
      'Alda dibuja tres columnas. Encima escribe: «lo que vi», «lo que me contaron» y «lo que todavía no sé».',
      { say: 'cg_carga_alda_iris', text: 'Las tres personas no estaban en el mismo lugar. Eso no las vuelve mentirosas. Vamos a decidir qué contradicciones son reales y cuáles aparecen solo al mezclar trabajos distintos.' },
      { choice: [
        { text: 'Piedras húmedas y farol cambiado: alguien miente', then: [
          'El primer guía miraba el camino y la segunda guía estaba junto al gancho del farol. Podían ocurrir ambas cosas.',
          'No has encontrado una contradicción: has comparado dos observaciones de lugares distintos.'
        ] },
        { text: 'Los tres testimonios describen partes distintas; el calco comprueba otra cosa', then: [
          'El camino pudo estar húmedo, el farol cambió de manos y la hoja se protegió de la lluvia. El calco, además, registra que las marcas del documento no se hicieron todas juntas.',
          { set: { 'flag.cg_carga_t2_tablero': true } },
          { say: 'cg_carga_alda_iris', text: 'Ésa es una síntesis responsable. No reúne tres relatos para acusar a una cuarta persona ausente.' },
          'Alda coloca sobre la mesa tres tarjetas sin nombres: «observación», «testimonio», «inferencia». Ahora puedes redactar el acta.'
        ] },
        { text: 'El sello húmedo revela el nombre de quien firmó', then: [
          'La humedad permite ordenar marcas, no identificar a alguien. Ninguno de los tres guías afirmó haber leído la firma.',
          { say: 'rotom', text: '¡Bzzt! ¿Quién firmó? Sigue siendo una pregunta. ¿Qué clase de documento firmó? Eso sí podemos investigarlo.' }
        ] }
      ] }
    ],
    cg_carga_t2_acta: [
      'La mesa de Alda tiene una copia en blanco del acta. Un apartado dice «hechos», otro «testimonios» y el último «pendientes».',
      { choice: [
        { text: 'Escribir que un empleado falsificó el envío', then: [
          { say: 'cg_carga_alda_iris', text: 'Eso no lo prueban tus copias. Una corrección no puede convertirse en una acusación sin respaldo.' }
        ] },
        { text: 'Separar hechos materiales, relatos y dudas pendientes', then: [
          'Anotas el orden de las marcas, la diferencia entre farol y mercancía y las tres declaraciones. Dejas sin nombre el espacio de la persona firmante.',
          { if: '!flag.cg_carga_t2_anexo_cotejo', then: [
            { give: 'cg_carga_acta_cotejo_iris' },
            { set: { 'flag.cg_carga_t2_anexo_cotejo': true } },
            { diary: 'En el gabinete de Iris, Alda nos ayudó a separar las marcas materiales, los testimonios y lo que todavía no sabemos. Abrimos o solicitamos una copia de trabajo sin tocar el original, comprobamos la humedad con papel limpio y dejamos sin nombre las dudas. La firma no puede acusar a una persona por sí sola.', cond: 'flag.b01_diario' }
          ] },
          { say: 'cg_carga_alda_iris', text: 'Llévate esa copia. Si la mesa de los guías llega a otra conclusión, tendrás dos fuentes que cotejar.' },
          'Ya puedes volver a la mesa central de Iris para ordenar los testimonios.'
        ] },
        { text: 'Poner las tres versiones como hechos comprobados', then: [
          'Alda señala el apartado de fuentes: «Una persona puede recordar con sinceridad y equivocarse. Un testimonio debe conservar su origen».',
          'Conviene mantener separadas las palabras de los guías y las marcas que puedes verificar.'
        ] }
      ] }
    ],
    cg_carga_t2_archivo_despues: [
      'Sobre el pupitre queda una etiqueta: «Copias disponibles para cotejo; original en custodia».',
      { say: 'cg_carga_alda_iris', text: 'Tu acta no elimina los interrogantes. Sólo impide que alguien llame demostración a una sospecha. Eso ya ayuda bastante.' },
      { if: 'flag.cg_carga_t2_copia_supervisada', then: [
        'La salida del calco aparece firmada por Alda. La copia de trabajo puede consultarse sin abrir de nuevo el cajón.'
      ], else: [
        'El cierre de las luces vuelve a su posición de reposo. Ya no hace falta repetirlo: el calco está en tu mochila.'
      ] }
    ]
  }
};
