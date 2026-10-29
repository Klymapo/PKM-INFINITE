// Negocio nuevo (2026-10-28, encargo de Mario): el periódico de Alexia.
//   p10_periodico   «La Gaceta Viajera», en la imprenta vieja de la calle del Reloj (Luminalia). Socia: Alexia.
//                   Aparece con `flag.p10_oferta` (escena de Alexia en Luminalia, abierta desde `flag.b04_fin`).
//                   Entrada ₽25 000 + mejoras ₽233 000. Parte 40 % (+15 con «Registrar la cabecera»).
//   Pedido de Mario: paga más cuantas más especies tengas en la Pokédex (`dex`):
//                   línea «Sección de fauna» con `dex >= 60`; mejoras con `dex >= 60/100/150/200` que la multiplican;
//                   objetos de la línea con `dex >= 100/150/200`.
//   Reportajes:     línea bloqueada que abre «Corresponsal en ruta»; da objetos de evolución difíciles y alguno raro.
//   Encargados:     Alexia · Renata (`flag.b01_renata_1`) · Matière (`flag.b01_agencia_1`).
// Sin spoilers: Alexia solo habla de lo que el jugador vio o de lo que fue público (prensa del prólogo, Crómlech
// si se publicó, la Gira). No sabe nada del Expediente que el jugador no le haya contado.

const V = 'p10_periodico';
const SOCIO = 'partner("' + V + '")';
const OFERTA = 'flag.b04_fin && !flag.p10_oferta && !' + SOCIO;
const LUC_AQUI = 'flag.b05_atico_lucien && !vars.lucien_viaje';

export default {
	// =====================================================================
	// OBJETOS (para leer)
	// =====================================================================
	items: {
		p10_acta: { name: 'Acta de la Gaceta', pocket: 'key', desc: 'Una hoja de papel de imprenta, gruesa, firmada por dos personas, una huella de Helioptile y un rayo que dibujó tu Rotom.',
			read: '**ACTA DE FUNDACIÓN**\n**LA GACETA VIAJERA**\n*La Gira, contada desde la carretera*\n\n**Sede:** la imprenta vieja de la calle del Reloj, Ciudad Luminalia. Con goteras.\n\n**Socios:** Alexia (redacción, fotografía, horas sin dormir) y {jugador} (entrada, Pokédex, horas sin dormir también).\n\n**Normas de la casa:**\n1. Lo que se publica, se comprueba.\n2. Lo que no se puede comprobar, no se publica. Aunque sea buenísimo. *Sobre todo* si es buenísimo.\n3. Los anuncios por palabras los lee todo el mundo y nadie lo admite.\n\n**Cláusula de fauna:** cada especie registrada en la Pokédex de {jugador} es una ficha. Con 60 fichas hay sección. Con 100, atlas a color. Con 150, suplemento de domingo. Con 200, edición de coleccionista.\n\n**Cláusula de la portada:** la portada no se vende. Se gana.\n\nFirmado: **Alexia** · **{jugador}**\nTestigos: *(huella pequeña y redonda)* Helioptile · *(un rayo, bastante bien dibujado)* Rotom' },
		p10_primera: { name: 'Gaceta n.º 1', pocket: 'key', desc: 'El primer número de La Gaceta Viajera, recién salido de la rotativa. Todavía mancha los dedos.',
			read: '**LA GACETA VIAJERA** · Número 1 · *Precio: lo que valga un café*\n\n**EN PORTADA: «LA GIRA, DESDE DENTRO»**\nLos novatos del Circuito Infinito llevan meses saltando de región en región. Han visto bosques, faros, torres y playas. Esta es la primera vez que lo cuenta alguien que va con ellos en el tren. *(Crónica de Alexia, pág. 2.)*\n\n**FAUNA**\nPrimera entrega de las fichas de especies, con fotos de la Pokédex de nuestr{o|a|e} soci{o|a|e}. Hoy: dónde duerme cada uno, qué come y a qué hora conviene no molestarlo.\n\n**ANUNCIOS POR PALABRAS**\n· *Se vende bicicleta. Le falta un pedal. El otro está como nuevo.*\n· *Perdido Pidove gris, responde a «Croqueta». No responde a nada más.*\n· *Clases de magia a domicilio. Resultados no garantizados. Pañuelos incluidos.*\n\n**FE DE ERRATAS**\nEste es el primer número. Todavía no nos ha dado tiempo a equivocarnos. Danos una semana.' },
	},

	// =====================================================================
	// PARCHES: la imprenta, en Luminalia
	// =====================================================================
	patches: {
		luminalia: { spots: [
			{ label: 'Alexia, en el escalón de una imprenta', sub: 'Con una llave enorme y cara de haber decidido algo', icon: '📰', cond: OFERTA, new: 'true', talk: [{ script: 'p10_propuesta' }] },
			{ label: 'La Gaceta Viajera', sub: 'La imprenta vieja de la calle del Reloj', icon: '🗞️', cond: 'flag.p10_oferta || ' + SOCIO, action: { venture: V } },
			{ label: 'Alexia, en la redacción', sub: 'Escribe con la cámara en el regazo', icon: '📸', cond: SOCIO, new: '!flag.p10_redaccion_vista', talk: [{ script: 'p10_redaccion' }] },
			{ label: 'El número de hoy', sub: 'Colgado de una pinza en el escaparate', icon: '📄', cond: SOCIO, new: '!flag.p10_numero_leido', talk: [{ script: 'p10_numero' }] },
		] },
	},

	// =====================================================================
	// NEGOCIO
	// =====================================================================
	ventures: {
		p10_periodico: {
			name: 'La Gaceta Viajera', icon: '🗞️', loc: 'luminalia', partner: 'alexia',
			cond: 'flag.p10_oferta',
			blurb: 'Un periódico pequeño en una imprenta con goteras. Cuantas más especies tengas en la Pokédex, más se vende.',
			buy: { cost: 25000, text: '«Tú pones la entrada; yo pongo el oficio. Lo que gane la Gaceta, a repartir. Y la portada no se vende: se gana.»', script: 'p10_compra' },
			share: [{ pct: 40 }],
			upkeep: 900, store: 3,
			lines: {
				cronica: { name: 'Crónica de la Gira', icon: '✍️', desc: 'Lo que pasa en la Gira, contado por quien va en ella. Alexia escribe en trenes, en barcos y en salas de espera. Se vende en los quioscos de toda Kalos.', money: 2400 },
				anuncios: { name: 'Anuncios por palabras', icon: '📌', desc: 'Bicicletas sin pedal, Pidove perdidos y clases de magia. Algunos anunciantes pagan en especie: una tienda de Balls, en Balls; la panadería de la esquina, en crêpes.', money: 1500,
					items: [{ id: 'quickball', perDay: 0.5 }, { id: 'lumiosegalette', perDay: 0.5 }] },
				fauna: { name: 'Sección de fauna', icon: '🦎', cond: 'dex >= 60', desc: 'Una ficha por especie con las fotos de tu Pokédex: dónde vive, qué come y a qué hora conviene no molestarla. Cuantas más especies registres, más fichas y más lectores. Los lectores que coleccionan las fichas mandan cosas.', money: 3500,
					items: [{ id: 'ultraball', perDay: 0.6, cond: 'dex >= 100' }, { id: 'nugget', perDay: 0.15, cond: 'dex >= 150' }, { id: 'rarecandy', perDay: 0.03, cond: 'dex >= 200' }] },
				reportajes: { name: 'Reportajes', icon: '🧳', locked: true, desc: 'Alexia viaja detrás de una historia y vuelve con la historia y con lo que la gente le da para que la cuente bien: un disco raro, una escama, un mineral que nadie sabe para qué sirve. Salen pocos y nunca dos iguales.', money: 600,
					items: [{ id: 'dubiousdisc', perDay: 0.03 }, { id: 'protector', perDay: 0.03 }, { id: 'electirizer', perDay: 0.03 }, { id: 'magmarizer', perDay: 0.03 }, { id: 'reapercloth', perDay: 0.03 }, { id: 'upgrade', perDay: 0.03 }, { id: 'prismscale', perDay: 0.03 }, { id: 'ovalstone', perDay: 0.04 }, { id: 'ppup', perDay: 0.05 }, { id: 'heartscale', perDay: 0.2 }, { id: 'rarecandy', perDay: 0.05 }] },
			},
			upgrades: [
				{ id: 'rotativa', name: 'Arreglar la rotativa', cost: 9000, mult: { all: 1.15 }, script: 'p10_up_rotativa',
					desc: 'Una máquina negra del tamaño de una camioneta, con una telaraña en cada rodillo. El último impresor de la casa sabe dónde se le pega una patada. Todo rinde más.' },
				{ id: 'quioscos', name: 'Quioscos en las plazas', cost: 14000, mult: { cronica: 1.35, anuncios: 1.2 }, store: 1,
					desc: 'Un acuerdo con los quioscos de Luminalia, Novarte y Relieve para que la Gaceta salga a la vista y no debajo de las revistas de cocina. Más ventas y un día más de almacén.' },
				{ id: 'fichero', name: 'El fichero de especies', cost: 12000, cond: 'dex >= 60', mult: { fauna: 1.3 },
					desc: 'Un mueble de cajoncitos con una ficha por especie y la foto de tu Pokédex grapada. La sección de fauna sale ordenada y la gente la colecciona. Se abre con **60 especies** registradas.' },
				{ id: 'corresponsal', name: 'Corresponsal en ruta', cost: 30000, unlock: 'reportajes', set: { 'flag.p10_corresponsal': true }, script: 'p10_up_corresponsal',
					desc: 'Una mochila, una cámara de repuesto y los billetes de las Puertas pagados. Alexia sale detrás de las historias en vez de esperar a que lleguen. Abre una línea nueva: los reportajes.' },
				{ id: 'atlas', name: 'Atlas a color', cost: 28000, cond: 'dex >= 100', mult: { fauna: 1.5 }, slots: 1, script: 'p10_up_atlas',
					desc: 'Las fichas, a color y en papel bueno, con un mapa de cada región que dice dónde sale cada especie. Mucha más fauna y sitio para un Pokémon más trabajando. Se abre con **100 especies**.' },
				{ id: 'suplemento', name: 'Suplemento de domingo', cost: 45000, cond: 'dex >= 150', mult: { fauna: 1.3, reportajes: 1.2 },
					desc: 'Un cuadernillo los domingos solo de fauna: las especies raras, las que salen de noche y las que nadie ha visto dos veces. Se abre con **150 especies**.' },
				{ id: 'coleccionista', name: 'Edición de coleccionista', cost: 60000, cond: 'dex >= 200', mult: { fauna: 1.3, all: 1.1 }, script: 'p10_up_coleccionista',
					desc: 'Todas las fichas en un tomo de tapas duras, para guardar en un cajón y enseñar a los nietos. Se abre con **200 especies**.' },
				{ id: 'cabecera', name: 'Registrar la cabecera', cost: 35000, share: 15, need: ['quioscos'],
					desc: 'El nombre «La Gaceta Viajera», registrado a nombre de los dos, con sello y todo. Alexia te apunta 15 puntos más de la caja: «Lo que es tuyo se pone por escrito».' },
			],
			synergy: [
				{ from: 'b05_atico', line: 'recuerdos', min: 10, mult: { cronica: 1.15 }, label: 'La Gaceta en el mostrador del ático',
					desc: 'Si el ático del Bulevar Norte vende recuerdos, Philippe pone un montón de Gacetas junto a la caja. Con truco: dice que el periódico «aparece» en la mano del cliente. Aparece cuando paga.' },
			],
			jobs: { slots: 2, types: ['Electric', 'Flying', 'Normal'], favs: { helioptile: 0.1, delibird: 0.1, pelipper: 0.08, pidove: 0.05, smeargle: 0.08 },
				text: 'Repartir a domicilio, darle corriente a la rotativa, posar para la sección de fauna o revelar fotos. Los voladores llegan a los quioscos antes que nadie.' },
			managers: [
				{ npc: 'alexia', desc: 'La lleva ella, entre viaje y viaje. Escribe la crónica en el tren y la manda por fax desde la primera estación que tenga uno.', mult: { cronica: 1.2, reportajes: 1.15 } },
				{ npc: 'renata', cond: 'flag.b01_renata_1', wage: 350, mult: { reportajes: 1.35, cronica: 1.1 },
					desc: 'Edita por teléfono desde donde esté, con efectos de sonido. Los reportajes salen con final en alto y la gente compra el siguiente número para saber cómo acaba.' },
				{ npc: 'matiere', cond: 'flag.b01_agencia_1', wage: 400, mult: { anuncios: 1.4 },
					desc: 'Lleva los anuncios por palabras con oficio de detective: los lee todos, por si alguno es una pista. Nunca lo es. Se venden el doble de bien.' },
			],
			eventRate: 0.7,
			events: [
				{ id: 'errata', name: 'Una errata', w: 3, npc: 'alexia',
					text: 'Tenemos un problema y es culpa mía. En la crónica de ayer, el pie de foto dice «{riolu}, el compañero fiel», y encima de la frase sale un Psyduck. Uno muy fiel, eso sí. No sé de dónde salió el Psyduck. Nadie lo sabe.',
					options: [
						{ text: '«Fe de erratas y a otra cosa.»', result: 'Alexia escribe una fe de erratas tan graciosa que la gente la recorta y la pega en el refrigerador. Hay quien compra el periódico solo por las erratas.', effect: { boost: { mult: { cronica: 1.1 }, days: 2, label: 'Erratas famosas' } } },
						{ text: 'Pagar una reimpresión', cost: 900, result: 'Mil ejemplares nuevos, con {riolu} donde tiene que estar. El Psyduck acaba en un marco, en la pared de la redacción. Alexia dice que trae suerte.', effect: { boost: { mult: { all: 1.15 }, days: 2, label: 'Reimpresión' } } },
					] },
				{ id: 'contraportada', name: 'La contraportada', w: 2, npc: 'alexia',
					text: 'Ha llamado el departamento de comunicación de Lemnis. Quieren la contraportada de todo el mes. Pagan muy bien. Solo piden una cosa: «leer la crónica antes de imprimir, por si hay errores técnicos». —Deja el teléfono—. No hay errores técnicos. Hay errores que ellos llaman técnicos.',
					options: [
						{ text: '«La portada no se vende. La contraportada tampoco.»', result: 'Alexia se lo dice así. Del otro lado hay un silencio muy largo. No hay contraportada, pero esa semana los lectores escriben para decir que la Gaceta «no se parece a las demás».', effect: { boost: { mult: { cronica: 1.25 }, days: 3, label: 'Lectores fieles' } } },
						{ text: '«Acepta el dinero. Que lean.»', result: 'Pagan por adelantado. La crónica de esa semana sale con dos frases menos y tres comas de más. Alexia no dice nada. Se nota igual.', effect: { money: 5000, boost: { mult: { cronica: 0.8 }, days: 4, label: 'Crónica revisada' } } },
					] },
				{ id: 'lector', name: 'Carta de un lector', w: 3, npc: 'alexia', cond: 'dex >= 60',
					text: 'Nos ha escrito un niño de Relieve. Dice que en la ficha del Ducklett pusimos que vive en lagos, y que el suyo vive en la bañera. Adjunta foto. El Ducklett sale en la bañera, muy digno, con un patito de goma al lado.',
					options: [
						{ text: '«Publica la carta. Con foto.»', result: 'La carta sale en la sección de fauna con el título «Hábitat: bañera». Esa semana llegan veinte cartas más, cada una con su foto. La sección no da abasto.', effect: { boost: { mult: { fauna: 1.2 }, days: 3, label: 'Cartas de lectores' } } },
						{ text: 'Mandarle un lote de Gacetas firmadas', cost: 500, result: 'El niño las reparte en su colegio. Al mes, media clase colecciona las fichas y la otra media las cambia en el recreo.', effect: { boost: { mult: { fauna: 1.35 }, days: 3, label: 'Fichas en el recreo' } } },
					] },
				{ id: 'helioptile', name: 'Helioptile y la rotativa', w: 2, npc: 'alexia',
					text: 'Helioptile ha descubierto que, si se tumba encima del motor de la rotativa, la máquina va el doble de rápido. También ha descubierto que, si se queda dormido ahí arriba, imprime la misma página cuatrocientas veces. La del horóscopo.',
					options: [
						{ text: '«Que duerma donde quiera.»', result: 'Cuatrocientos horóscopos. Alexia los reparte gratis en la Plaza. A nadie le sale lo que dice, pero todos se los llevan.', effect: { boost: { mult: { all: 0.9 }, days: 1, label: 'Horóscopos de más' } } },
						{ text: 'Comprarle una lámpara de calor', cost: 700, result: 'Helioptile duerme la siesta debajo de la lámpara y se despierta con la cresta llena de corriente. La rotativa no ha ido tan bien desde hace diez años.', effect: { boost: { mult: { all: 1.15 }, days: 3, label: 'Helioptile cargado' }, happy: 5 } },
					] },
				{ id: 'folletin', name: 'Un folletín', w: 2, npc: 'renata', cond: 'flag.b01_renata_1',
					text: '¡Testigo! Nota para el episodio: tu periódico necesita un folletín. Por entregas. Con final en alto. «El caso del macaron», parte uno de doce. Cool, cool, cool. Solo te pido una columna. Y que Alexia no me la corte. Alexia corta mucho.',
					options: [
						{ text: '«Una columna. Cortita.»', result: 'Renata manda las doce entregas en una sola noche. Alexia corta seis. Los lectores escriben pidiendo el final. Renata dice que el final «se gana».', effect: { boost: { mult: { cronica: 1.2 }, days: 3, label: 'Folletín' } } },
						{ text: 'Pagarle las llamadas de larga distancia', cost: 1000, result: 'Renata lo graba también, con efectos de sonido. El folletín sale en papel y en pódcast el mismo día. Hay quien lo lee mientras lo escucha.', effect: { boost: { mult: { cronica: 1.3, anuncios: 1.1 }, days: 3, label: 'Folletín en dos formatos' } } },
					] },
				{ id: 'clave', name: 'Un anuncio en clave', w: 2, npc: 'matiere', cond: 'flag.b01_agencia_1',
					text: 'Mira el anuncio catorce de hoy: «Caballero de bigote busca a dama de la Agencia para hablar de un asunto de macarons. Responder en esta misma sección». Handsome ha vuelto a perder el teléfono. Y en vez de comprarse otro, pone anuncios. Ya van tres esta semana. Los paga, eso sí.',
					options: [
						{ text: '«Contéstale en la sección.»', result: 'Matière contesta con otro anuncio. Handsome contesta al suyo. Media Luminalia sigue la conversación como si fuera una telenovela. Los anuncios se agotan.', effect: { boost: { mult: { anuncios: 1.3 }, days: 3, label: 'La telenovela de los anuncios' } } },
						{ text: 'Mandarle un teléfono nuevo a Handsome', cost: 1500, result: 'Le dura cuatro días. El quinto, pone un anuncio para dar las gracias. Con propina.', effect: { money: 600, boost: { mult: { anuncios: 1.1 }, days: 2, label: 'Anuncio de agradecimiento' } } },
					] },
				{ id: 'reparto', name: 'El repartidor', w: 2, npc: 'lucien', cond: LUC_AQUI,
					text: '¡Quiero ser repartidor! De periódicos. En bici. Bueno, sin bici, que no tengo. Corriendo. Me sé todas las calles de Luminalia y a qué hora baja cada portal. Mira: la señora del tercero baja a las 8:12. Siempre. ¿Me dejas? Di que sí.',
					options: [
						{ text: '«Si tu madre dice que sí.»', result: 'Su madre dice que sí, los sábados. Lucien reparte sesenta periódicos en cuarenta y siete minutos. Lo sabes porque te pasa la lista. Con horas.', effect: { boost: { mult: { cronica: 1.15 }, days: 3, label: 'Reparto a domicilio' } } },
						{ text: 'Comprarle una bici con cesta', cost: 2500, result: 'Una bici azul con cesta delante. Lucien bate su récord: sesenta periódicos en treinta y un minutos. Lo apunta, lo subraya y le pone una estrella.', effect: { boost: { mult: { all: 1.15 }, days: 4, label: 'Repartidor en bici' }, happy: 5 } },
					] },
				{ id: 'philippe', name: 'Un anuncio con truco', w: 2, npc: 'philippe', cond: 'flag.b01_philippe_1',
					text: '¡Socio de prensa! Quiero un anuncio. Pequeño. Una página. «Phil-osofía inmobiliaria: no busques casa; deja que la casa te encuentre». Con truco: si doblas la página por la mitad, sale un conejo. Lo he probado. Sale un cuadrado. Pero un cuadrado muy bonito.',
					options: [
						{ text: '«Media columna, sin truco.»', result: 'Philippe acepta con cara de artista incomprendido. El anuncio funciona: tres llamadas, una visita y un señor que pregunta por las clases de magia.', effect: { money: 800, boost: { mult: { anuncios: 1.15 }, days: 2, label: 'Anuncio de Philippe' } } },
						{ text: '«Página entera, con truco.»', cost: 600, result: 'Papel especial para doblar. Media Luminalia dobla la página. A nadie le sale un conejo, pero todo el mundo habla de la Gaceta.', effect: { boost: { mult: { anuncios: 1.35 }, days: 3, label: 'La página que se dobla' } } },
					] },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ---------- La propuesta ----------
		p10_propuesta: [
			{ text: 'En una calle estrecha detrás del Bulevar, junto a una persiana metálica medio subida, Alexia está sentada en un escalón. Tiene en la mano una llave de hierro del tamaño de una cuchara sopera. A su lado, Helioptile toma el sol encima de una pila de periódicos atados.' },
			{ say: 'alexia', text: '¡{jugador}! Justo te iba a llamar. Me he venido en la Puerta de las seis, con la cámara y sin desayunar. Siéntate. El escalón está limpio. Bueno, en el centro.' },
			{ say: 'alexia', text: 'Mariquita. Ya sé, ya sé. Te lo sigo diciendo porque me da suerte a mí.', cond: 'flag.b04_alexia_tren' },
			{ say: 'alexia', text: 'Te cuento. En el *Diario de Luminalia*, la Gira va en la página siete. Siempre. La portada es de quien paga la portada. Llevo meses mandando crónicas desde Johto y desde Kanto, y salen recortadas, entre la cartelera y el horóscopo.' },
			{ say: 'alexia', text: 'Lo de Alola ni lo han publicado. «No interesa». Cuatro islas, un volcán, cuatro guardianes y una Puerta junto al muelle. No interesa.', cond: 'visited("hauoli")' },
			{ say: 'alexia', text: 'Desde que me diste aquella declaración en la inauguración, mi editor me pide que «baje el tono». Yo bajo el tono. Lo que no bajo es lo que cuento.', cond: 'flag.b01_prensa_verdad' },
			{ say: 'alexia', text: 'Y no es por ti, ¿eh? Tu frase de la inauguración la usaron en tres anuncios. Te quedó muy bien. Pero yo quiero un periódico donde las frases no acaben en anuncios.', cond: 'flag.b01_prensa_lemnis' },
			{ say: 'alexia', text: 'Y desde lo de Crómlech, mi editor revisa mis textos con regla. Literal: con una regla de madera. Para ver si me salgo de la columna.', cond: 'flag.b01_delatar' },
			{ say: 'alexia', text: 'Así que he hecho una locura. —Levanta la llave—. La imprenta vieja de la calle del Reloj. Cerró hace diez años. Tiene una rotativa que no funciona, una redacción con goteras y un cartel de «SE TRASPASA» que ya es parte de la fachada.' },
			{ say: 'alexia', text: 'Quiero sacar mi propio periódico. **La Gaceta Viajera**: la Gira contada desde la carretera, por quien va en ella. Crónicas, anuncios por palabras… y una sección que llevo años queriendo hacer.' },
			{ choice: [
				{ text: '«¿Qué sección?»', then: [
					{ say: 'alexia', text: '**Fauna.** Una ficha por especie, con foto, dónde vive y a qué hora sale. Como tu Pokédex, pero en papel y con chistes. La gente se vuelve loca con eso. Yo la primera.' },
				] },
				{ text: '«¿Y para qué me necesitas?»', then: [
					{ say: 'alexia', text: 'Para dos cosas. Una: el dinero. No te voy a mentir, el traspaso cuesta lo que cuesta. Dos: las fotos. No conozco a nadie con más especies fotografiadas que tú. Bueno, que tu Rotom.' },
				] },
				{ text: '«¿Otra vez quieres mis fotos?»', cond: 'done.b01_s_fotos', then: [
					{ say: 'alexia', text: '¡Te acuerdas! Cinco especies desplazadas, en Novarte. Aquel artículo es lo mejor que he publicado. —Sonríe—. Esta vez te las pido todas.' },
				] },
			] },
			{ say: 'alexia', text: 'El trato es este. Tú pones la entrada y yo pongo el oficio: la redacción, la cámara y las horas sin dormir. Lo que gane la Gaceta, a repartir.' },
			{ say: 'alexia', text: 'Y la sección de fauna sale de tu Pokédex. Cada especie que registres es una ficha más. Con **60** especies hay sección. Con **100**, un atlas a color. Con **150**, suplemento de domingo. Y con **200**… con 200 hacemos una edición que la gente guarde en un cajón. Cuantas más fichas, más se vende.' },
			{ if: 'dex >= 60', then: [
				{ say: 'alexia', text: 'Y tú ya tienes de sobra para empezar. Lo he mirado. No me mires así: soy periodista.' },
			], else: [
				{ say: 'alexia', text: 'Todavía te faltan fichas para la sección, pero las crónicas se pueden empezar mañana. La fauna la abrimos en cuanto llegues a sesenta.' },
			] },
			{ say: 'rotom', text: '¡Bzzt! ¡Mis fotos en un periódico! ¿Saldré en los créditos? ¡Quiero salir en los créditos! ¡En negrita!' },
			{ say: 'alexia', text: 'En negrita y con foto y todo, Rotom. —A ti—. Piénsatelo. Yo me quedo aquí, que tengo una crónica a medias y el sol todavía le da a Helioptile.' },
			{ set: { 'flag.p10_oferta': true } },
			{ venture: V },
		],

		// ---------- Al entrar (buy.script) ----------
		p10_compra: [
			{ text: 'Alexia sube la persiana de un tirón. Dentro huele a tinta vieja, a papel húmedo y a algo que un día fue café. La rotativa es una máquina negra del tamaño de una camioneta, con una telaraña en cada rodillo.' },
			{ say: 'alexia', text: 'Bienvenid{o|a|e} a la redacción más pequeña de Kalos. Somos dos. Tres con Helioptile. Cuatro con tu Rotom, que ya está pidiendo mesa.' },
			{ say: 'alexia', text: 'Primera regla de la Gaceta: lo que se publica, se comprueba. Segunda: lo que no se puede comprobar, no se publica. Aunque sea buenísimo. Sobre todo si es buenísimo.' },
			{ say: 'alexia', text: 'Tercera regla: los anuncios por palabras los lee todo el mundo y nadie lo admite. Esa no es una regla, es estadística. Pero la pongo igual.' },
			{ give: 'p10_acta' },
			{ read: 'p10_acta' },
			{ say: 'rotom', text: '¡Bzzt! Te guardo la Gaceta en **Negocios**. ¡Ya puedo decir que trabajo en un periódico! ¡Soy reportero gráfico!' },
			{ intel: { npc: 'alexia', text: 'Fundaste con ella *La Gaceta Viajera*, en la imprenta vieja de la calle del Reloj (Luminalia). Ella escribe; tu Pokédex llena la sección de fauna.' } },
			{ diary: 'Hoy mi entrenador{|a|e} y Alexia han abierto un periódico. ¡De papel! Huele a tinta y la máquina grande hace «clonc». Alexia dice que mis fotos van en la sección de fauna. Voy a sacar a todos los Pokémon por su lado bueno. Todos tienen uno. ¡Bzzt!', cond: 'flag.b01_diario' },
		],

		// ---------- Mejoras con escena ----------
		p10_up_rotativa: [
			{ text: 'Un señor mayor con mandil de cuero entra en la imprenta como quien vuelve a casa. Fue el último impresor de la casa. No dice su nombre: dice «buenos días» a la rotativa.' },
			{ say: null, as: 'El impresor', text: 'Diez años sin tocarla. —Le pasa la mano por un rodillo—. Esta no está rota. Está ofendida. —Le da una patada seca en un costado. La máquina tose, gira y empieza a sonar como un tren.' },
			{ text: 'Helioptile se sube de un salto encima del motor y se tumba, con la cresta abierta. La rotativa va más deprisa. El impresor lo mira, lo piensa y no dice nada.' },
			{ say: 'alexia', text: 'Primer número: trescientos ejemplares. Vendidos, doscientos ochenta. Eso es una subida de diez mil millones por ciento respecto a ayer, que no existíamos. —Te da uno, todavía caliente—. El primero es tuyo. Te va a manchar los dedos.' },
			{ give: 'p10_primera' },
		],
		p10_up_corresponsal: [
			{ text: 'Alexia tiene la mochila abierta en la mesa de redacción: dos cámaras, tres libretas, un impermeable, un cargador para Helioptile que no sirve para nada porque Helioptile se carga con el sol.' },
			{ say: 'alexia', text: 'Hasta ahora escribía de lo que me encontraba por el camino. A partir de hoy, voy a buscarlo. Reportajes: un pueblo, una historia, todo lo que haga falta para contarla bien.' },
			{ say: 'alexia', text: 'Y la gente, cuando le cuentas bien su historia, te da cosas. Un pescador te da una escama. Una señora te da un disco que encontró en el desván y no sabe qué es. Yo tampoco lo sé. Lo que me den para la Gaceta, te lo guardo aquí.' },
			{ say: 'alexia', text: 'Si un día no contesto el teléfono, no te preocupes. Es que estoy en un sitio sin cobertura con una historia buenísima. Esa es la idea.' },
		],
		p10_up_atlas: [
			{ text: 'Llegan las primeras pruebas del atlas: papel grueso, colores que huelen a nuevo y un mapa de cada región con puntitos donde sale cada especie.' },
			{ say: 'alexia', text: 'Cien fichas. Cien. —Pasa las hojas despacio—. Cuando empecé en el periódico, mi hermana me dijo que el mundo era más grande de lo que cabe en una página. Le voy a mandar este. A ver qué dice ahora.' },
			{ say: 'rotom', text: '¡Bzzt! ¡En la página de los Pokémon de agua salgo reflejado en un charco! ¡Es mi mejor foto!' },
		],
		p10_up_coleccionista: [
			{ text: 'El tomo de la edición de coleccionista pesa como un ladrillo. Tapas de tela verde, letras doradas y doscientas fichas dentro, cada una con su foto, su sitio y su hora.' },
			{ say: 'alexia', text: 'Doscientas especies. ¿Te das cuenta de lo que es eso? Es medio mundo visto de cerca, por una sola persona. Bueno, por una persona y un Rotom.' },
			{ say: 'alexia', text: 'La gente no lo va a guardar en un cajón. Lo va a dejar en la mesa del comedor, abierto, para que lo vea quien entre. —Guarda el primero en su mochila—. Este es para mí. No se vende.' },
		],

		// ---------- La redacción ----------
		p10_redaccion: [
			{ if: '!flag.p10_redaccion_vista', then: [
				{ set: { 'flag.p10_redaccion_vista': true } },
				{ text: 'La redacción es una mesa larga con dos máquinas de escribir, un fax que pita cuando quiere y un corcho lleno de fotos de tu Pokédex con chinchetas de colores. En una esquina, un Psyduck enmarcado.' },
				{ say: 'alexia', text: 'Ese corcho es la sección de fauna. Cada foto es una ficha. Cuando el corcho se llena, compro otro. Ya van tres.' },
			] },
			{ if: 'dex >= 200', then: [
				{ say: 'alexia', text: 'Doscientas especies o más. Ya no sé dónde poner los corchos. He empezado a clavar fichas en el techo. Helioptile duerme debajo de las de tipo Fuego, por el calorcito.' },
			], else: [
				{ if: 'dex >= 150', then: [
					{ say: 'alexia', text: 'Ciento cincuenta fichas y subiendo. El suplemento de domingo se agota antes del lunes. Me escriben desde otras regiones para preguntar si llega allí. Les digo que la Gaceta viaja. Lo pone en el nombre.' },
				], else: [
					{ if: 'dex >= 100', then: [
						{ say: 'alexia', text: 'Más de cien fichas. Hay un señor que viene todos los martes a comprar la Gaceta solo por la fauna. Dice que la recorta y la pega en un álbum. Le he preguntado cuántas le faltan. Me ha contestado «todas las que te falten a ti».' },
					], else: [
						{ if: 'dex >= 60', then: [
							{ say: 'alexia', text: 'La sección de fauna ya sale. Con cada especie nueva que registres, una ficha más. A los cien, atlas a color. No te presiono. Bueno, un poco.' },
						], else: [
							{ say: 'alexia', text: 'Para la sección de fauna me faltan fichas. En cuanto tengas sesenta especies en la Pokédex, la abrimos. Mientras tanto, crónicas y anuncios.' },
						] },
					] },
				] },
			] },
			{ if: 'flag.b05_fin', then: [
				{ say: 'alexia', text: 'Dicen que la Gira se va a Teselia. Yo ya tengo la maleta hecha. Siempre la tengo hecha. Es más fácil deshacerla que hacerla con prisa.' },
			], else: [
				{ say: 'alexia', text: 'Alola da para tres suplementos. Uno de playas, uno de volcanes y otro solo de malasadas. Este último lo escribiría gratis.', cond: 'visited("hauoli")' },
			] },
			{ say: 'alexia', text: 'Por cierto, Renata me llama todas las noches para «sugerir titulares». Me sugiere seis. Uso uno. Ella dice que es el peor. Siempre es el que más vende.', cond: 'flag.b01_renata_1 && flag.p10_corresponsal' },
		],

		// ---------- El número de hoy ----------
		p10_numero: [
			{ set: { 'flag.p10_numero_leido': true } },
			{ text: 'El número de hoy cuelga de una pinza en el escaparate, con la portada hacia la calle. Alguien ha dibujado bigote a la foto del tiempo.' },
			{ if: 'flag.b05_fin', then: [
				{ read: { title: 'La Gaceta Viajera · número de hoy', text: '**LA GACETA VIAJERA** · *Precio: lo que valga un café*\n\n**EN PORTADA: «PRÓXIMA PARADA, TESELIA»**\nLa Gira anuncia su siguiente región. Los novatos vuelven de Alola con la piel morena, los bolsillos llenos de arena y más sellos que maletas. *(Crónica de Alexia, pág. 2.)*\n\n**FAUNA**\nEsta semana, especial de islas: las especies que solo se ven allí, y las que se ven allí distintas. Con fotos de la Pokédex de nuestr{o|a|e} soci{o|a|e}.\n\n**ANUNCIOS POR PALABRAS**\n· *Se busca bigote postizo, buen estado, perdido en una hamaca. Gratificación en macarons.*\n· *Cambio Poké Flauta por tambor. La flauta despierta a todo el edificio.*\n· *Se alquila tabla de surf. Ha visto cosas. No pregunte.*\n\n**FE DE ERRATAS**\nEn el número anterior dijimos que los Wingull de Hauoli posan para las fotos. Rectificamos: posan, y además cobran.' } },
			], else: [
				{ if: 'visited("hauoli")', then: [
					{ read: { title: 'La Gaceta Viajera · número de hoy', text: '**LA GACETA VIAJERA** · *Precio: lo que valga un café*\n\n**EN PORTADA: «LA GIRA, BAJO EL SOL»**\nLos novatos del Circuito ya pisan Alola. Pruebas en lugar de gimnasios, capitanes en lugar de líderes y una Puerta en la playa con el mar detrás. *(Crónica de Alexia, pág. 2.)*\n\n**FAUNA**\nEsta semana: Pokémon que en Alola tienen otro color, otro tipo o directamente otra cara. Con fotos de la Pokédex de nuestr{o|a|e} soci{o|a|e}.\n\n**ANUNCIOS POR PALABRAS**\n· *Se busca bigote postizo, buen estado, perdido en una hamaca. Gratificación en macarons.*\n· *Se ofrecen clases de surf con Lapras. Se recomienda saber nadar. Al Lapras le da igual.*\n· *Clases de magia a domicilio. Resultados no garantizados. Pañuelos incluidos.*\n\n**FE DE ERRATAS**\nLa malasada de la foto de la pág. 4 no era de nuestra reportera. Se la comió igual.' } },
				], else: [
					{ read: { title: 'La Gaceta Viajera · número de hoy', text: '**LA GACETA VIAJERA** · *Precio: lo que valga un café*\n\n**EN PORTADA: «LA GIRA, ENTRE DOS REGIONES»**\nLos novatos del Circuito Infinito cierran Kanto con ocho medallas y una lista de regiones que no cabe en el pasaporte. Esta semana, lo que se cuenta en los andenes. *(Crónica de Alexia, pág. 2.)*\n\n**FAUNA**\nEsta semana: especies que llegaron de lejos y se quedaron. Con fotos de la Pokédex de nuestr{o|a|e} soci{o|a|e}.\n\n**ANUNCIOS POR PALABRAS**\n· *Se vende bicicleta. Le falta un pedal. El otro está como nuevo.*\n· *Perdido Pidove gris, responde a «Croqueta». No responde a nada más.*\n· *Clases de magia a domicilio. Resultados no garantizados. Pañuelos incluidos.*\n\n**FE DE ERRATAS**\nEn el número anterior, el horóscopo de Capricornio era el de Acuario. Los de Acuario no se han quejado.' } },
				] },
			] },
			{ say: 'rotom', text: '¡Bzzt! ¡La foto de la fauna es mía! Se nota porque salgo yo un poquito en el reflejo.', cond: 'dex >= 60' },
		],
	},
};
