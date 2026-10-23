// La red de auxilio de Kanto · Capítulo: El aviso que nadie oyó (Lavanda) · el origen · 20–25 min
// Idea de ChatGPT, rehecha como capítulo del arco `cg_red` (ver cg-red.js). Solo parches aditivos.
// Ids publicados intactos: misión cg_aviso (etapas inicio/cinta/regreso/hecha), flags cg_aviso_inicio/registro/final/
// entrego/hablo, objetos cg_aviso_cinta/nota, npcs cg_aviso_olga/nico y sus guiones.
export default {
  npcs: {
    cg_aviso_olga: { name: 'Olga', title: 'Locutora jubilada', look: { hair: 'bun', hairColor: '#aaa2a2', eyes: '#4b6e89', outfit: '#394a65', outfit2: '#d5b26a', skin: 2, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses' } },
    // Nico es el recadero de la Red: sale en cg-red.js.
    cg_aviso_nico: { name: 'Nico', title: 'Recadero de la Red de Auxilio', look: { hair: 'curly', hairColor: '#3c2825', eyes: '#665039', outfit: '#d9a947', outfit2: '#345678', skin: 3, eyesStyle: 'happy', mouth: 'smile', acc: '' } },
  },
  items: {
    cg_aviso_cinta: { name: 'Cinta de voz gastada', pocket: 'key', desc: 'Un aviso grabado en la estación hace años, para una sola persona. Nunca salió por los altavoces.', read: '«Aviso para la señora de la casa junto a la torre: le habla Olga, la de la estación. Su familia ha llamado otra vez preguntando por usted. Les he dicho que está bien. No sé si es verdad: veo su luz encendida hasta muy tarde. Si quiere que vengan, deje encendida la luz del porche. Nadie más sabrá lo que significa. —O.»' },
    cg_aviso_nota: { name: 'Nota de la emisora', pocket: 'key', desc: 'Un folio del libro de megafonía de la estación de Azafrán, copiado por la archivera de la Red.', read: 'LIBRO 41 · FOLIO 112\n\n22:16: grabación de Olga (aviso particular, canal 00).\n22:17: prueba de megafonía.\n22:18: tren de mercancías.\n22:19: aviso particular cancelado por fallo del altavoz.\n22:20: tren de cercanías, andén 2.\n\nAl margen, a lápiz: «No fue el altavoz. Fui yo. —O.»' },
  },
  quests: {
    cg_aviso: { name: 'El aviso que nadie oyó', type: 'side', est: 25,
      stages: {
        inicio: 'Escucha a **Olga**, la de la grabadora, en **Lavanda**.',
        cinta: 'Busca a **Noemí** en la **Estación de Azafrán**: guarda el libro de megafonía de aquella noche.',
        regreso: 'Vuelve con **Olga** a **Lavanda** y decide con ella qué hacer con el mensaje.',
        hecha: 'El mensaje llegó a su destino, de una manera u otra.',
      } },
  },
  patches: {
    lavanda: { spots: [
      { label: 'Una mujer con una grabadora', sub: 'Rebobina la misma cinta sin darle al play', icon: '📼', cond: '!done.cg_aviso', new: '!flag.cg_aviso_inicio || (flag.cg_aviso_registro && !flag.cg_aviso_final)', talk: [
        { cond: '!flag.cg_aviso_inicio', script: 'cg_aviso_inicio' },
        { cond: 'flag.cg_aviso_registro && !flag.cg_aviso_final', script: 'cg_aviso_regreso' },
        { script: 'cg_aviso_espera' },
      ] },
      { label: 'Olga e Isandro, en el banco', sub: 'La grabadora, apagada entre los dos', icon: '🌼', cond: 'done.cg_aviso', talk: [{ script: 'cg_aviso_despues' }] },
    ] },
    estacion_azafran: { spots: [
      { label: 'Archivo de megafonía', sub: 'Una mujer con gafas entre cajas de libros', icon: '🗂️', cond: 'flag.cg_aviso_inicio && !flag.cg_aviso_registro', new: 'true', talk: [{ script: 'cg_aviso_archivo' }] },
    ] },
  },
  scripts: {
    cg_aviso_inicio: [
      'Una mujer pulsa REBOBINAR por sexta vez. La cinta chirría como si protestara.',
      { say: 'cg_aviso_olga', cond: 'flag.b04_fuji_hecho', text: 'Usted es quien ayudó al señor Fuji con la Ponyta. Me lo contó él, con el té delante. Dice que usted escucha hasta el final, y eso hoy no lo hace nadie.' },
      { say: 'cg_aviso_olga', cond: '!flag.b04_fuji_hecho', text: 'Usted es de la Gira, ¿verdad? Lleva la insignia torcida, como todos. —Deja la grabadora en el regazo—. Siéntese, si no tiene prisa.' },
      { say: 'cg_aviso_olga', cond: 'flag.cg_puente_inicio || flag.cg_indice_inicio', text: 'Y anda preguntando por la Red de Auxilio. En Lavanda las noticias corren más que los trenes.' },
      { say: 'cg_aviso_olga', text: 'Me llamo Olga. Treinta años fui la voz de la megafonía de la estación de Azafrán. «Atención, viajeros, el tren con destino…». Esa era yo.' },
      { say: 'cg_aviso_olga', text: 'Antes de que la Red tuviera patrullas, números y chalecos, tenía tres cosas: un repetidor en la colina, que montó un crío muy listo; mi micrófono; y doña Amparo.' },
      { say: 'cg_aviso_olga', text: 'Doña Amparo vivía en la casa junto a la vieja torre. Desde su ventana se veía la Ruta 8 entera. Si alguien se perdía de noche, encendía la luz del porche y llamaba a la estación. Yo lo decía por los altavoces y alguien salía a buscarlo.' },
      { say: 'cg_aviso_olga', text: 'Se hizo mayor. La Red creció y dejó de necesitar su ventana. Un invierno, su familia me pidió que le mandara un aviso por megafonía. Lo grabé. Nunca salió.' },
      { say: 'cg_aviso_olga', text: 'Murió el invierno pasado, tranquila, en su cama. Y ahora sus sobrinos preguntan por qué nadie les dijo que llevaba años tan sola. Yo tengo la cinta. Lo que no tengo es la hora.' },
      { say: 'cg_aviso_olga', text: 'El libro de megafonía de aquella noche está en el archivo de la Red, en la estación. A mí ya no me dejan pasar. A usted, con esa insignia, sí.' },
      { choice: [
        { text: 'Buscar el libro', then: [
          { set: { 'flag.cg_aviso_inicio': true } },
          { quest: 'cg_aviso', stage: 'cinta' },
          { give: 'cg_aviso_cinta' },
          { read: 'cg_aviso_cinta' },
          { say: 'cg_aviso_olga', text: 'Pregunte por Noemí, la archivera. Y no me traiga consuelo. Tráigame una hora.' },
          { call: 'cg_red_toque' },
        ] },
        { text: 'Volver más tarde', then: [{ say: 'cg_aviso_olga', text: 'La cinta no se va a ninguna parte. Lleva años esperándome.' }] },
      ] },
    ],
    cg_aviso_espera: [
      { say: 'cg_aviso_olga', text: 'El archivo está en la estación de Azafrán, al fondo de la oficina de megafonía. Pregunte por Noemí. Es la única que sabe dónde está cada papel.' },
    ],
    cg_aviso_archivo: [
      'Al fondo de la oficina de megafonía, entre cajas con etiquetas escritas a máquina, una mujer con gafas levanta la vista.',
      { say: 'cg_indice_noemi', text: '¿Viene de parte de Olga? —No espera a que contestes—. Claro que viene de parte de Olga. Lleva un año sin atreverse a cruzar esa puerta.' },
      { say: 'cg_indice_noemi', cond: '!flag.cg_indice_decision', text: 'Noemí, archivera de la Red de Auxilio. Los libros de megafonía son nuestros: la Red empezó por estos altavoces. Libro cuarenta y uno, folio ciento doce. Aquí.' },
      { say: 'cg_indice_noemi', cond: 'flag.cg_indice_decision', text: 'Usted otra vez. Los libros de megafonía también son nuestros: la Red empezó por estos altavoces. Libro cuarenta y uno, folio ciento doce. Aquí.' },
      'El libro huele a papel mojado. En la página de aquella noche, un minuto está escrito dos veces.',
      { say: 'rotom', text: '¡Bzzt! ¡Déjame a mí! Leer libros de registro es casi como leer Pokémon. Tiene menos dientes.' },
      { say: 'rotom', text: '¡Mira, mira! A las 22:19, el aviso de Olga sale «cancelado por fallo del altavoz». ¡Y a las 22:20 el mismo altavoz anunció otro tren! Un altavoz no se estropea un minuto y se arregla solo al siguiente.' },
      { say: 'cg_indice_noemi', text: 'Y al margen, a lápiz. Consta, pero nadie lo ha leído nunca: los márgenes no se archivan. Le hago una copia.' },
      { give: 'cg_aviso_nota' },
      { read: 'cg_aviso_nota' },
      { set: { 'flag.cg_aviso_registro': true } },
      { quest: 'cg_aviso', stage: 'regreso' },
      { say: 'cg_indice_noemi', text: '¿Ve lo de «canal 00»? Así salía doña Amparo en los libros. No era patrullera, no tenía número. La primera vigía de la Red y tiene tres líneas en mil folios.' },
      'Un chico con una mochila enorme entra de espaldas empujando la puerta con la mochila, deja dos cajas en el suelo y se va a por más.',
      { say: 'cg_aviso_nico', text: '¡Noemí, las de Celeste! ¡Y me debes una firma! —Te ve—. Uy, perdón. Nico, recadero. Si alguna vez la Red te manda algo, lo más seguro es que lo lleve yo.' },
      { say: 'cg_indice_noemi', text: 'Dígale a Olga que la hora ya la tiene. Lo otro le toca a ella.' },
      { call: 'cg_red_toque' },
    ],
    cg_aviso_regreso: [
      { say: 'cg_aviso_olga', text: 'Cancelado. Lo sabía. —Pasa el dedo por la nota, por la línea del lápiz—. Me quedé con el dedo encima del botón.' },
      { say: 'cg_aviso_olga', text: 'Ella me había pedido que nunca dijera su nombre por los altavoces. Que lo suyo no era asunto de la estación. Y yo pensé que respetarla era callarme.' },
      { say: 'cg_aviso_olga', text: 'Su familia quiere saber qué pasó. Puedo darles la cinta, o sentarme con ellos y contárselo yo. No es exactamente la misma verdad.' },
      { choice: [
        { text: 'Darles la cinta y contarles por qué no salió', then: [
          { set: { 'flag.cg_aviso_entrego': true, 'flag.cg_aviso_final': true } },
          { say: 'cg_aviso_olga', text: 'Entonces les diré también lo que no grabé. Que tuve miedo. Sin eso sería otro aviso a medias.' },
          { call: 'cg_aviso_cierre' },
        ] },
        { text: 'Hablar primero con ellos, sin la cinta', then: [
          { set: { 'flag.cg_aviso_hablo': true, 'flag.cg_aviso_final': true } },
          { say: 'cg_aviso_olga', text: 'Sin reproducirla. Mirándolos a la cara. —Se ajusta las gafas—. Eso me da más miedo que el micrófono, fíjese.' },
          { call: 'cg_aviso_cierre' },
        ] },
      ] },
    ],
    cg_aviso_cierre: [
      'Olga apaga la grabadora. Esta vez no rebobina.',
      'Un señor mayor con una barra de pan bajo el brazo se sienta en el otro extremo del banco, como si fuera su sitio de siempre.',
      { say: 'cg_indice_isandro', text: 'Buenas. ¿Ya se lo has contado? —A Olga—. Ya era hora, mujer.' },
      { say: 'cg_aviso_olga', text: 'Isandro le subía el pan a doña Amparo todas las mañanas. Diez años.' },
      { say: 'cg_indice_isandro', text: 'Once. El último ya no me abría: me dejaba la luz del porche encendida, para decirme que seguía ahí. Yo la veía y me iba tan tranquilo. —Se rasca la barba—. Igual tenía que haber llamado a la puerta.' },
      { say: 'cg_aviso_olga', text: 'Tenga. —Saca de su bolso un cristal gris envuelto en un pañuelo—. Es la galena del receptor viejo de la estación, el que oía el repetidor de la colina. La guardé cuando lo desmontaron.' },
      { give: 'cg_red_galena' },
      { say: 'cg_aviso_olga', text: 'Si alguien vuelve a encender aquello algún día, que tenga con qué escuchar. Yo ya escuché bastante tarde.' },
      { give: 'hyperpotion', n: 2 },
      { quest: 'cg_aviso', stage: 'hecha', done: true },
      { diary: 'Hoy mi entrenador{|a|e} y yo leímos un libro viejísimo en la estación de Azafrán. Había un minuto escrito dos veces. ¡Los minutos no se escriben dos veces! Bueno, ese sí.\n\nLuego, en Lavanda, una señora dejó de rebobinar una cinta, y un señor con una barra de pan nos contó que alguien le hacía señales con la luz del porche. Yo también tengo una lucecita, la de la batería. No significa nada. Hoy me ha dado por mirarla un rato.', cond: 'flag.b01_diario' },
      { call: 'cg_red_toque' },
    ],
    cg_aviso_despues: [
      { if: 'flag.cg_aviso_entrego', then: [{ say: 'cg_aviso_olga', text: 'La escucharon conmigo, en la cocina. Cuando terminó, me preguntaron por qué callé. Esta vez contesté. Tardé un rato, pero contesté.' }] },
      { if: 'flag.cg_aviso_hablo', then: [{ say: 'cg_aviso_olga', text: 'Hablé con ellos. La cinta sigue en el cajón, intacta, por si algún día quieren oírla. Esta vez la que decide no soy yo.' }] },
      { if: 'flag.cg_red_encendido', then: [{ say: 'cg_indice_isandro', text: 'Ahora, por las noches, se oye la radio de la colina desde aquí. Olga no lo admite, pero se queda hasta que acaba el último aviso.' }],
        else: [{ say: 'cg_indice_isandro', text: 'El pan de hoy era para ella, por costumbre. Lo tiro a los Pidgey del cementerio. Ellos no se quejan.' }] },
    ],
  },
};
