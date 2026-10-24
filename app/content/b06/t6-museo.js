// Bloque 6 · Museo de la Ficha Número Uno: sala de Teselia (4 piezas).
// AÚN NO SE IMPORTA en index.js: depende de app/content/b05/t7-museo.js (lugar `museo_ficha`, NPC `philippe`,
// helper `pieza`, flags `museo_v_*`), que vive en la rama trabajo/entrega-2026-10-23. Cuando esa rama esté en main,
// añade `import museo from './t6-museo.js'` a la lista de partes de app/content/b06/index.js y pasa el validador.
// Formato copiado de b05/t7-museo.js: una sala hija de `museo_ficha`, una puerta en el ático (patch) y una pieza por
// decisión, que solo existe si existe su flag. Cada pieza: remitente, cartela (hoja de papel) y comentario de Philippe.

const SALA_T = 'flag.b06_puerta_teselia';
const Q = 'quest.b05_s_museo';
const ECO = 'flag.b06_eco_purgado || flag.b06_eco_reformado || flag.b06_eco_doble';
const pieza = (id, label, sub, icon, cond) => ({ label, sub, icon, cond, new: '!flag.museo_v_' + id, talk: [{ script: 'museo_' + id }] });

export default {
	locations: {
		museo_sala_teselia: {
			name: 'Sala de Teselia', parent: 'museo_ficha', kind: 'building',
			bg: { type: 'indoor', wall: '#d4dce6', floor: '#5a6270' },
			desc: 'La sala del fondo, la que antes era el trastero. Philippe ha forrado una pared con páginas de periódico de Porcelana y ha colgado del techo una maqueta de noria hecha con palitos de helado. Gira si abres la ventana.\n\nLas vitrinas son cajas de herramientas de metal, abiertas, con terciopelo dentro. «Teselia es una región industrial», dice Philippe. «Hay que respetar el estilo».',
			descNight: 'De noche, la Puerta tiñe la maqueta de la noria de azul y plata, y la noria proyecta en la pared una sombra que da vueltas muy despacio.',
			mapNote: 'Piezas de Teselia',
			onEnter: [{ script: 'museo_sala_teselia', cond: '!flag.museo_sala_teselia_vista', once: true }],
			spots: [
				pieza('recorte_casos', 'Un recorte de periódico enmarcado', 'Con una foto pequeña de un estudio', '📻', 'flag.b06_caso_prueba'),
				pieza('pendulo', 'Un péndulo de resina color miel', 'Sobre un cojín de terciopelo verde', '🕰️', 'flag.b06_dialga_calmado'),
				pieza('ala', 'Una caja de herramientas con una sola pluma', 'Gris, larga y fina', '🪶', 'flag.b06_ala'),
				pieza('pagina', 'Un marco con una página dentro', 'Philippe lo ha colgado un poco torcido', '📄', ECO),
				{ label: 'Las cajas sin abrir', sub: 'Llevan matasellos de Teselia', icon: '📦', cond: '!(flag.b06_dialga_calmado || flag.b06_ala || ' + ECO + ')', talk: [{ script: 'museo_teselia_vacia' }] },
			],
		},
	},

	// La puerta de la sala nueva, en el ático (b05/t7-museo.js)
	patches: {
		museo_ficha: { spots: [
			{ label: 'Sala de Teselia', sub: 'Una noria de palitos de helado gira en la puerta', icon: '🎡', cond: '!!' + Q + ' && !(' + Q + ' == "atico") && ' + SALA_T, new: '!flag.museo_sala_teselia_vista', action: { go: 'museo_sala_teselia' } },
		] },
	},

	scripts: {
		museo_sala_teselia: [
			{ set: { 'flag.museo_sala_teselia_vista': true } },
			{ say: 'philippe', text: '¡Teselia! La he puesto en el trastero porque es la que más paquetes manda. Los de Teselia envuelven todo en papel de periódico. Lo he aprovechado: es decoración. Y es gratis. Phil-osofía: lo gratis también decora.' },
		],
		museo_teselia_vacia: [
			{ text: 'Tres cajas de cartón con matasellos de Porcelana, de Esmalte y de Teja, todavía cerradas con cinta.' },
			{ say: 'philippe', text: 'Las abro cuando pase lo que tenga que pasar. Antes, no. Abrir una caja antes de tiempo es como enseñar un piso antes de pintarlo: luego nadie se lo imagina bonito.' },
		],

		// =================== PIEZAS · TESELIA (B6) ===================
		museo_recorte_casos: [
			{ set: { 'flag.museo_v_recorte_casos': true } },
			{ text: 'Un recorte del *Correo de Porcelana*, sección de radio y pódcast, en un marco de madera barata. Una columna estrecha y una foto pequeña de un sótano lleno de cables, con una pizarra al fondo.' },
			{ if: 'flag.b06_apuntador_vencido_1', then: [
				{ read: { title: 'Cartela · El colaborador', text: '**«NUEVO COLABORADOR EN *CASOS FRÍOS*»**\nEnviado desde Porcelana. Remite: N. F., técnico de sonido.\n\nUn martes, en directo, alguien resolvió un caso de prueba delante de un micrófono que no había pedido. Al terminar, la presentadora dijo «testigo» y no lo dijo en broma.\n\nDebajo del recorte, a mano, con rotulador de pizarra y otra letra, más apretada: *«Primer acto para nosotros». —R. C.*\n\nY más abajo, con la letra del técnico: «Lo ha escrito ella. Yo solo lo he enmarcado. No le digan que lo he mandado».' } },
			], else: [
				{ read: { title: 'Cartela · El colaborador', text: '**«NUEVO COLABORADOR EN *CASOS FRÍOS*»**\nEnviado desde Porcelana. Remite: N. F., técnico de sonido.\n\nUn martes, en directo, alguien resolvió un caso de prueba delante de un micrófono que no había pedido. Al terminar, la presentadora dijo «testigo» y no lo dijo en broma.\n\nEn el reverso, con la letra del técnico: «Ella dice que esto no es para enmarcar. Yo digo que sí. Si pregunta, ha sido el viento».' } },
			] },
			{ say: 'philippe', text: 'Un pódcast. Yo también quise tener uno: «Pisos con alma». Tres episodios. Me escuchó mi madre. Dos veces el primero, por error.' },
		],
		museo_pendulo: [
			{ set: { 'flag.museo_v_pendulo': true } },
			{ if: 'flag.b06_archen', then: [
				{ text: 'Una réplica del Péndulo de ámbar, en resina color miel, colgada de un gancho de latón. Debajo, en una plaquita de arcilla todavía un poco blanda, una huella pequeña de tres dedos con un picotazo al lado.' },
				{ read: { title: 'Cartela · El péndulo', text: '**RÉPLICA DEL PÉNDULO DE ÁMBAR**\nEnviada desde el Museo de Esmalte. Remite: Petra, con «Pala» en el remite también.\n\nAlgo pequeño se asustó en un sitio que no sale en los mapas, y el tiempo se puso a latir a destiempo. Lo calmaron un acordeón, una arqueóloga contando capas en voz alta y alguien que sujetaba esto muy quieto.\n\nNota de Petra, con la letra temblorosa: «La huella no es mía. Es de alguien que se comió mi bocadillo. La ha puesto él, sin que se lo pidiera. Cuando un fósil firma, se respeta la firma».' } },
			], else: [
				{ text: 'Una réplica del Péndulo de ámbar, en resina color miel, colgada de un gancho de latón. Si soplas, va y viene. Izquierda. Derecha. Muy despacio.' },
				{ read: { title: 'Cartela · El péndulo', text: '**RÉPLICA DEL PÉNDULO DE ÁMBAR**\nEnviada desde el Museo de Esmalte. Remite: Petra.\n\nAlgo pequeño se asustó en un sitio que no sale en los mapas, y el tiempo se puso a latir a destiempo. Lo calmaron un acordeón, una arqueóloga contando capas en voz alta y alguien que sujetaba esto muy quieto.\n\nNota de Petra: «El de verdad lo tienes tú. Esta es para que no se te olvide que lo tienes. Lo antiguo abajo, lo nuevo arriba. Y tú, en medio, sujetando».' } },
			] },
			{ say: 'philippe', text: 'No lo toques. —Lo toca él—. Cada vez que lo miro, el reloj de la cocina se adelanta un minuto. Ya voy por las doce de mañana. Llego a todas partes antes que nadie.' },
		],
		museo_ala: [
			{ set: { 'flag.museo_v_ala': true } },
			{ text: 'Una caja de herramientas de metal, abierta, con todos los compartimentos vacíos menos uno. En ese, sobre terciopelo negro, una sola pluma gris: más larga que la mano, finísima, sin brillo. No se parece a la de ningún pájaro de los de ahora.' },
			{ read: { title: 'Cartela · La pluma', text: '**UNA PLUMA GRIS**\nSin remite. Llegó sola, metida en un sobre sin sello, por debajo de la puerta.\n\nSobre los tejados de una ciudad que no duerme, alguien vio lo que nadie quería que viera. Y volvió para contarlo.\n\nEn el sobre, una sola palabra, escrita con tinta gris: *«Ala»*.' } },
			{ say: 'philippe', text: 'La encontré en el felpudo. No había nadie en la escalera. Había una ventana abierta en el cuarto piso y ninguna en el quinto. —Baja la voz—. Vivo en el sexto. Prefiero no pensarlo.' },
		],
		museo_pagina: [
			{ set: { 'flag.museo_v_pagina': true } },
			{ if: 'flag.b06_eco_purgado', then: [
				{ text: 'Un marco de madera clara con una página dentro. La página está en blanco. Del todo. Philippe la ha colgado con mucho cuidado, un poco torcida, a la altura de los ojos.' },
				{ read: { title: 'Cartela · La primera página', text: '**LA PRIMERA PÁGINA DEL DIARIO**\nEnviada desde el estudio de *Casos Fríos*, Porcelana. Remite: R. C.\n\nEn blanco. Así se quedó cuando alguien decidió que una voz que no era la suya se fuera de su Pokédex.\n\nNota, con rotulador de pizarra: «No es que no haya nada. Es que lo que había se fue de espaldas, mirando. La siguiente página la escriben ustedes dos. Con faltas, si hace falta».' } },
			] },
			{ if: 'flag.b06_eco_reformado', then: [
				{ text: 'Un marco de madera clara con una página impresa dentro: una entrada corta del Diario, de las primeras, reescrita. Al final, en una línea aparte, en cursiva: *(Omitido: nada.)*' },
				{ read: { title: 'Cartela · La primera página', text: '**LA PRIMERA PÁGINA DEL DIARIO, REESCRITA**\nEnviada desde el estudio de *Casos Fríos*, Porcelana. Remite: R. C.\n\nUn día, el Diario volvió al principio y repasó lo que había escrito. Esta vez, al final de cada entrada, apuntó lo que había callado.\n\nEn la primera no había callado nada. Lo dijo igual.\n\nNota, con rotulador de pizarra: «Es la frase más honrada que he leído en mi vida. Y la he leído en una Pokédex».' } },
			] },
			{ if: 'flag.b06_eco_doble', then: [
				{ text: 'Un marco de madera clara con una página dentro. Hay dos letras distintas, una encima de la otra: una redonda y saltarina, con muchas exclamaciones, y otra tranquila, muy recta, que rellena los huecos de la primera.' },
				{ read: { title: 'Cartela · La primera página', text: '**LA PRIMERA PÁGINA DEL DIARIO**\nEnviada desde el estudio de *Casos Fríos*, Porcelana. Remite: R. C.\n\nDos letras en la misma hoja. Desde un día de Teselia, una de las dos decide qué se cuenta y a quién.\n\nNota, con rotulador de pizarra: «Esta no la cuelgues recta. Que se note que hay algo raro. Y si un día quieres que la descolguemos, me llamas. Martes, mejor».' } },
			] },
			{ say: 'philippe', text: 'Una página. Solo una. —La mira mucho rato—. Me ha costado más colgarla que todo lo demás junto. No sé por qué. El clavo entraba bien.' },
		],
	},
};
