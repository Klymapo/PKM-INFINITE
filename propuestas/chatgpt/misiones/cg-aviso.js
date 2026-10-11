// Propuesta independiente · El aviso que nadie oyó · 20–25 min
// Solo datos: parche aditivo. Ningún arco publicado se modifica.
export default {
  npcs: {
    cg_aviso_olga: { name: 'Olga', title: 'Locutora jubilada', look: { hair: 'bun', hairColor: '#aaa2a2', eyes: '#4b6e89', outfit: '#394a65', outfit2: '#d5b26a', skin: 2, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses' } },
    cg_aviso_nico: { name: 'Nico', title: 'Repartidor de mensajes', look: { hair: 'curly', hairColor: '#3c2825', eyes: '#665039', outfit: '#d9a947', outfit2: '#345678', skin: 3, eyesStyle: 'happy', mouth: 'smile', acc: '' } },
  },
  items: {
    cg_aviso_cinta: { name: 'Cinta de voz gastada', pocket: 'key', desc: 'Un mensaje grabado en una estación. La última palabra quedó tapada por un silbato.', read: '«Al que encuentre esta cinta: la casa no estaba vacía. Vi una luz encendida detrás de la persiana. No llamé. No sabía si tenía derecho. —O.»' },
    cg_aviso_nota: { name: 'Nota de la emisora', pocket: 'key', desc: 'El registro de una emisión que nunca salió al aire.', read: '22:16: grabación de Olga.\n22:17: prueba de megafonía.\n22:18: tren de mercancías.\n22:19: emisión cancelada por fallo del altavoz.\n\nAl margen, a lápiz: «No fue el altavoz. Fui yo. —O.»' },
  },
  quests: {
    cg_aviso: { name: 'El aviso que nadie oyó', type: 'side', est: 25,
      stages: { inicio: 'Escucha a Olga en Lavanda.', cinta: 'Consulta el registro en Azafrán.', regreso: 'Vuelve con Olga y decide qué hacer con el mensaje.', hecha: 'El mensaje llegó a su destino, de una manera u otra.' } },
  },
  patches: {
    lavanda: { spots: [
      { label: 'Una mujer con una grabadora', sub: 'Rebobina la misma cinta sin darle al play', icon: '📼', cond: '!done.cg_aviso', new: '!flag.cg_aviso_inicio', talk: [
        { cond: '!flag.cg_aviso_inicio', script: 'cg_aviso_inicio' },
        { cond: 'flag.cg_aviso_registro && !flag.cg_aviso_final', script: 'cg_aviso_regreso' },
        { script: 'cg_aviso_espera' },
      ] },
      { label: 'La grabadora apagada', sub: 'Alguien dejó una flor junto a ella', icon: '🌼', cond: 'done.cg_aviso', talk: [{ script: 'cg_aviso_despues' }] },
    ] },
    azafran: { spots: [
      { label: 'Registro de megafonía', sub: 'La tinta tiene una corrección a lápiz', icon: '🗂️', cond: 'flag.cg_aviso_inicio && !flag.cg_aviso_registro', new: 'true', talk: [{ script: 'cg_aviso_archivo' }] },
    ] },
  },
  scripts: {
    cg_aviso_inicio: [
      'Una mujer pulsa REBOBINAR por sexta vez. La cinta chirría como si protestara.',
      { say: 'cg_aviso_olga', text: 'Antes anunciaba llegadas. Era fácil: los trenes siempre llegaban a alguna parte. Las personas, no tanto.' },
      { say: 'cg_aviso_olga', text: 'Hace años grabé un aviso para alguien que vivía aquí. Nunca se emitió. Pensé que el aparato falló. Ahora creo que fui yo quien tuvo miedo.' },
      { say: 'cg_aviso_olga', text: 'El registro de la estación de Azafrán puede decirnos si la cinta llegó a salir. No necesito que me perdones. Solo que averigües qué ocurrió.' },
      { choice: [
        { text: 'Buscar el registro', then: [
          { set: { 'flag.cg_aviso_inicio': true } },
          { quest: 'cg_aviso', stage: 'cinta' },
          { give: 'cg_aviso_cinta' },
          { read: 'cg_aviso_cinta' },
          { say: 'cg_aviso_olga', text: 'No me traigas consuelo. Tráeme una fecha.' },
        ] },
        { text: 'Volver más tarde', then: [{ say: 'cg_aviso_olga', text: 'La cinta seguirá aquí. Lleva años esperándome.' }] },
      ] },
    ],
    cg_aviso_espera: [
      { say: 'cg_aviso_olga', text: 'La estación de Azafrán guarda el registro. Yo ya no me atrevo a ir.' },
    ],
    cg_aviso_archivo: [
      'El libro de incidencias huele a papel mojado. En la página de aquella noche, un minuto está escrito dos veces.',
      { say: 'cg_aviso_nico', text: 'Soy Nico, el de los recados. No trabajo aquí, pero llevo años devolviendo cartas perdidas. Y este libro tiene una mentira pequeña.' },
      { say: 'cg_aviso_nico', text: 'Mira: el tren llegó a las 22:18. El anuncio figura como cancelado a las 22:19. El silbato estropeó la grabación, pero el libro demuestra que la cinta nunca llegó a emitirse.' },
      { give: 'cg_aviso_nota' },
      { read: 'cg_aviso_nota' },
      { set: { 'flag.cg_aviso_registro': true } },
      { quest: 'cg_aviso', stage: 'regreso' },
      { say: 'cg_aviso_nico', text: 'A veces corregir una mentira no devuelve el tiempo. Pero permite dejar de repetirla.' },
    ],
    cg_aviso_regreso: [
      { say: 'cg_aviso_olga', text: 'Cancelada. Lo sabía. Me quedé con el dedo encima del botón. Aquella persona me había pedido que no volviera a hablar de la casa.' },
      { say: 'cg_aviso_olga', text: 'Ahora su familia pregunta qué pasó. Puedo darles la cinta o explicarles que fui yo quien decidió callar. No son exactamente la misma verdad.' },
      { choice: [
        { text: 'Entregar la cinta con su contexto', then: [
          { set: { 'flag.cg_aviso_entrego': true, 'flag.cg_aviso_final': true } },
          { say: 'cg_aviso_olga', text: 'Entonces les diré también lo que no grabé. Que tuve miedo. La verdad sin eso sería otro anuncio incompleto.' },
          { call: 'cg_aviso_cierre' },
        ] },
        { text: 'Hablar primero con la familia', then: [
          { set: { 'flag.cg_aviso_hablo': true, 'flag.cg_aviso_final': true } },
          { say: 'cg_aviso_olga', text: 'Sin reproducirla. Mirándoles a los ojos. Eso me da más miedo que la cinta.' },
          { call: 'cg_aviso_cierre' },
        ] },
      ] },
    ],
    cg_aviso_cierre: [
      'Olga apaga la grabadora. Por primera vez, no vuelve a rebobinar.',
      { say: 'cg_aviso_olga', text: 'No arreglaste el pasado. Hiciste algo más difícil: impedir que siguiera sonando igual.' },
      { give: 'superpotion', n: 2 },
      { quest: 'cg_aviso', stage: 'hecha', done: true },
      { diary: 'Una voz guardada durante años no era una prueba de que nadie escuchara. Era una decisión que todavía podía explicarse.' },
    ],
    cg_aviso_despues: [
      { if: 'flag.cg_aviso_entrego', then: [{ say: 'cg_aviso_nico', text: 'La familia escuchó la cinta. Olga se quedó sentada a su lado hasta que terminó. Nadie rebobinó.' }] },
      { if: 'flag.cg_aviso_hablo', then: [{ say: 'cg_aviso_nico', text: 'Olga fue a hablar. La cinta sigue intacta, por si algún día quieren oírla. Esta vez la elección es de ellos.' }] },
    ],
  },
};
