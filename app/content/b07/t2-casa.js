// Bloque 7 · T2 · «La Casa de las Siete Puertas» (Pueblo Plié, Bosque Lumirinto) · OPCIONAL (~1 h 45).
// Se abre con flag.b07_t1_hecho: carta de Quintana por el Buzón (b07_casa_carta) o, si no ha llegado, Quintana en persona
// en el andén de Plié (b07_casa_intro). Nada del camino principal lee estos flags salvo para variantes.
//
// El misterio (plan §5b): ocho entraron, el registro dice siete. La octava era Maren, nieta de Edmund Vane: entró por la
// Puerta Sexta (pestillo de fuera que conoce de niña), esperó sentada en el banco de la Sala Primera con su capa de lana
// y se levantó con el grupo; en el apagón de la Sala Sexta tomó la llave, abrió el doble fondo del sillón de la Séptima
// y se llevó el cuento que su abuelo escribió para ella. Ditto (Pip) y Zoroark (rumor) se descartan con pruebas.
//
// Flujo y etapas de b07_s_casa:
//   carta    (Buzón) → testigos (b07_casa_intro: Quintana + Ottilie, escena 1) → los siete visitantes (parts)
//   → casa   (b07_casa_visita: Ottilie abre la Casa, escena 2) → Salas Primera, Tercera y Sexta, Jardín (pestillo y
//             rastreo con {riolu}), Séptima (rejilla) y el sillón → b07_casa_dentro
//   → acusar (con b07_casa_dentro + el libro de Sally + haber visto el puesto de Maren) → { case: 'b07_casa' }
//   → hecha  (onSolve: Maren, escena 3, y la decisión: devuelve / lectura / quintana; onFail: la llave en el buzón).
// El motor de casos pone b07_casa_resuelto / b07_casa_fallido. El caso se abre solo en `acusar`, cuando ya se ha vivido
// todo en el mundo: la libreta repasa lo visto y oído (los «sitios» no llevan `cond`, salvo el pase de la rama Zorua).
// Prueba decisiva: `puesto` (pide `dedicatoria` y `botas`; `botas` sale de enseñarle `huellas` a Fen).
// Personajes: Quintana (compañero), Ottilie y Maren (3 escenas cada una + carta del Buzón), Sally (testigo; amistoso
// opcional `sally_quiz` con preguntas), Agnes (anuncia el tren). Visitantes: genéricos `casa_*` de este tramo.
// Contratos: secreto/bloques/b07-encargo.md (sección «T2» y «Contratos compartidos»).

// ---------- Condiciones reutilizadas ----------
const LUC = 'inParty("riolu") || inParty("lucario")';
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';     // Rotom de verdad: frases cortas, alguna falta, sin «¡Bzzt!»
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado'; // voz de siempre, completa, y al final: *(Omitido: nada.)*
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';          // alegre e incompleta (la lee Lemnis)
const PURGADO = 'flag.b06_eco_purgado';
const Q = 'quintana';
const CARTA = 'quest.b07_s_casa == "carta"';
const TESTIGOS = 'quest.b07_s_casa == "testigos"';
const CASA = 'quest.b07_s_casa == "casa"';
const ACUSAR = 'quest.b07_s_casa == "acusar"';
const HECHO = 'done.b07_s_casa';
const EN_CURSO = '(' + TESTIGOS + ' || ' + CASA + ' || ' + ACUSAR + ')';
const CASA_ABIERTA = '(' + CASA + ' || ' + ACUSAR + ' || ' + HECHO + ')'; // entradas del interior de la Casa
const INVESTIGANDO = '(' + CASA + ' || ' + ACUSAR + ')';
const SIETE = 'flag.b07_viajero_novia && flag.b07_viajero_novio && flag.b07_viajero_nino && flag.b07_viajero_abuela && flag.b07_viajero_excursionista && flag.b07_viajero_fotografo && flag.b07_viajero_hincha';
const SALAS = 'flag.b07_casa_sala1 && flag.b07_casa_sala3 && flag.b07_casa_sala6 && flag.b07_casa_pestillo && flag.b07_casa_huellas && flag.b07_casa_doble_fondo';
const ZORUA = 'flag.b06_zorua && (inParty("zorua") || inParty("zoroark"))';
const DEVUELVE = 'flag.b07_casa_devuelve', LECTURA = 'flag.b07_casa_lectura', QUINT = 'flag.b07_casa_quintana', FALLIDO = 'flag.b07_casa_fallido';

// Encuentros del Bosque Lumirinto y del jardín de la Casa (clave glimwood-tangle, subidos a la curva de T2: 66–68)
const BOSQUE = [
	{ sp: 'shiinotic', lv: [66, 68], w: 30 },
	{ sp: 'grimmsnarl', lv: [67, 68], w: 12, time: 'night' },
	{ sp: 'hatterene', lv: [66, 68], w: 12 },
	{ sp: 'trevenant', lv: [66, 68], w: 10, time: 'night' },
	{ sp: 'polteageist', lv: [66, 68], w: 8, time: 'night' },
	{ sp: 'passimian', lv: [66, 68], w: 10, time: 'day' },
	{ sp: 'oranguru', lv: [66, 68], w: 8, time: 'day' },
	{ sp: 'rapidashgalar', lv: [66, 68], w: 8 },
	{ sp: 'indeedee', lv: [66, 68], w: 4 },
	{ sp: 'indeedeef', lv: [66, 68], w: 4 },
	{ sp: 'slurpuff', lv: [66, 68], w: 4 },
	{ sp: 'aromatisse', lv: [66, 68], w: 4 },
	{ sp: 'gourgeist', lv: [66, 67], w: 2, displaced: true },
];

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== PUEBLO PLIÉ ===================
		plie: {
			name: 'Pueblo Plié', short: 'Plié', region: 'galar', kind: 'town', map: { x: 10, y: 50 },
			bg: { type: 'town', roofs: ['#5a3a6a', '#7a4a7a', '#3a4a5a', '#8a5a7a'], far: '#2a3a3a', ground: '#3a4a2a', fog: true },
			desc: 'Un pueblo pequeño metido dentro del bosque, como si los árboles se hubieran apartado lo justo para dejarlo crecer. Casas de madera oscura con tejados morados, farolas de hierro con forma de seta y, por todas partes, **setas que brillan**: en los alféizares, en las grietas de los escalones, en la fuente de la plaza.\n\nEn la plaza, la **posada**, un banco con vistas a la fuente, un puesto de setas y el **Estadio de Plié**, de piedra cubierta de hiedra, con un cartel en la verja: «Cerrado por la temporada». Al norte empieza el **Bosque Lumirinto**. La estación es un andén de madera con un reloj que se para cuando llueve.',
			descNight: 'De noche Plié no necesita farolas. Las setas de los tejados se encienden en azul y en rosa, despacio, una detrás de otra, y el pueblo entero parece respirar. En la posada hay luz en el comedor y en el sótano, una rojiza. Desde el bosque llega, de vez en cuando, una risa que no es de nadie.',
			descs: [
				{ cond: HECHO + ' && ' + LECTURA, text: 'Plié, con sus setas que brillan y sus tejados morados. En el tablón de la plaza hay un cartel nuevo, escrito a mano con letra grande: «La Casa de las Siete Puertas · **reabierta** · Primera noche de cada mes: **la Noche del Final**». Debajo, alguien ha dibujado una seta con el sombrero torcido.' },
				{ cond: HECHO, text: 'Plié, con sus setas que brillan y sus tejados morados. En el tablón de la plaza hay un cartel nuevo: «La Casa de las Siete Puertas · **reabierta**». El banco de la fuente vuelve a estar ocupado solo por gente que mira la fuente.' },
			],
			mapNote: 'Posada (Quintana, Ottilie) · Estadio de Plié (Sally) · puesto de setas · tren a Pistón · Bosque Lumirinto al norte',
			links: ['bosque_lumirinto'],
			onEnter: [{ script: 'b07_plie_llegada', cond: '!flag.b07_plie_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Un señor con gabardina en el andén', sub: 'Come pipas y mira el reloj parado', icon: '🕵️', cond: '!flag.b07_casa_intro', new: 'true', talk: [{ script: 'b07_casa_intro' }] },
				{ label: 'La posada', sub: 'Madera oscura, un farol en la puerta', icon: '🏚️', action: { go: 'posada_plie' } },
				{ label: 'Estadio de Plié', sub: '«Cerrado por la temporada»', icon: '🏟️', action: { go: 'estadio_plie' } },
				{ label: 'El puesto de setas', sub: 'Una chica con un gorro de lana pesa setas', icon: '🍄', new: '!flag.b07_maren_1', talk: [
					{ cond: '!flag.b07_maren_1', script: 'b07_maren_1' },
					{ cond: HECHO + ' && ' + QUINT, script: 'b07_maren_puesto_cerrado' },
					{ cond: HECHO + ' && ' + FALLIDO, script: 'b07_maren_puesto_vacio' },
					{ script: 'b07_maren_puesto' },
				] },
				// ----- Los visitantes que se quedan en la plaza -----
				{ label: 'Un chico contando farolas', sub: 'Lleva una alianza nueva y cara de no dormir', icon: '💍', cond: EN_CURSO, new: TESTIGOS + ' && !flag.b07_viajero_novio', talk: [
					{ cond: '!flag.b07_viajero_novio', script: 'b07_testigo_novio' },
					{ script: 'b07_testigo_novio_otra' },
				] },
				{ label: 'Un niño con un Ditto', sub: 'El Ditto se convierte en lo que tiene delante', icon: '🟣', cond: EN_CURSO, new: TESTIGOS + ' && !flag.b07_viajero_nino', talk: [
					{ cond: '!flag.b07_viajero_nino', script: 'b07_testigo_nino' },
					{ script: 'b07_testigo_nino_otra' },
				] },
				{ label: 'Una abuela haciendo punto', sub: 'En el banco de la fuente; no se le escapa nada', icon: '🧶', cond: EN_CURSO, new: TESTIGOS + ' && !flag.b07_viajero_abuela', talk: [
					{ cond: '!flag.b07_viajero_abuela', script: 'b07_testigo_abuela' },
					{ script: 'b07_testigo_abuela_otra' },
				] },
				{ label: 'Una chica del Team Yell', sub: 'Pintura en la cara y una bufanda enorme', icon: '📣', cond: EN_CURSO, new: TESTIGOS + ' && !flag.b07_viajero_hincha', talk: [
					{ cond: '!flag.b07_viajero_hincha', script: 'b07_testigo_hincha' },
					{ script: 'b07_testigo_hincha_otra' },
				] },
				// ----- Si llevas a tu Zorua (B6) -----
				{ label: 'Una vecina mira mal a tu Zorua', sub: 'Con los brazos cruzados', icon: '🦊', cond: ZORUA + ' && ' + EN_CURSO, new: '!flag.b07_casa_zorua', talk: [
					{ cond: '!flag.b07_casa_zorua', script: 'b07_casa_zorua' },
					{ script: 'b07_casa_zorua_otra' },
				] },
				{ label: '🚆 Tren a Pistón', sub: 'Andén de madera; el reloj va cuando no llueve', icon: '🚆', action: { go: 'estacion_piston' } },
			],
			rumors: [
				{ text: 'Las setas de Plié brillan porque se alimentan de algo que hay debajo del bosque. Los abuelos dicen que es «lo que sobra de los sueños». Los Shiinotic dicen que es suyo y no comparten.' },
				{ text: 'La **Casa de las Siete Puertas** la construyó un cuentacuentos, Edmund Vane, para que los niños del pueblo vivieran un cuento de verdad. Murió hace diez años. La casa la compró una señora de fuera y ahora cobra entrada.' },
				{ text: 'En el Bosque Lumirinto vive un Pokémon que se hace pasar por gente. O eso dicen en el bar. En el bar también dicen que el reloj del andén es el más puntual de Galar.' },
				{ text: 'Solo los recolectores de setas llevan botas con clavos: el musgo del bosque resbala como el jabón. En Plié quedan tres. Antes había veinte.', cond: 'flag.b07_casa_intro' },
				{ cond: HECHO, text: 'Medio Plié sabe ya lo que pasó con la llave de la Séptima. La otra mitad lo cuenta igual, pero mal.' },
			],
		},

		// ---------- La posada ----------
		posada_plie: {
			name: 'Posada de Plié', short: 'Posada', parent: 'plie', kind: 'building',
			bg: { type: 'indoor', wall: '#4a3a3a', floor: '#3a2a22' },
			desc: 'Un comedor bajo de techo, con vigas negras, una chimenea que tira mal y mesas de madera rayada. En la repisa, un tarro con setas que hace de lámpara. Huele a sopa y a leña húmeda.\n\nUna escalera estrecha baja al **sótano**, donde alguien ha colgado una cortina negra y una bombilla roja: el cuarto de revelado de un huésped. En la mesa del rincón, junto a la ventana, hay siempre una gabardina color arena en el respaldo de una silla.',
			descNight: 'De noche el comedor está casi vacío: la posadera seca vasos, el tarro de setas da una luz azul que no calienta y del sótano sube olor a vinagre. Alguien ha dejado una libreta abierta en la mesa del rincón, con una pipa de girasol de marcapáginas.',
			descs: [{ cond: HECHO, text: 'El comedor de la posada, con sus vigas negras y su chimenea que tira mal. La mesa del rincón ya no tiene gabardina en el respaldo. El tarro de setas sigue haciendo de lámpara. En el sótano ya no hay bombilla roja: solo una cortina negra recogida con una pinza.' }],
			mapNote: 'Quintana · Ottilie · la recién casada · el fotógrafo (sótano)',
			spots: [
				{ label: 'Quintana', sub: 'Gabardina color arena; Lupa duerme en una viga', icon: '🕵️', cond: 'flag.b07_casa_intro && !' + HECHO, talk: [
					{ cond: TESTIGOS, script: 'b07_quintana_testigos' },
					{ cond: CASA, script: 'b07_quintana_casa' },
					{ script: 'b07_quintana_charla' },
				] },
				{ label: 'Repasar el caso con Quintana', sub: 'Libreta abierta y dos tazas de té', icon: '⚖️', cond: ACUSAR, new: 'true', talk: [{ script: 'b07_casa_acusar' }] },
				{ label: 'Ottilie Brack', sub: 'Con su farolillo, en la mesa de la chimenea', icon: '🏮', cond: 'flag.b07_casa_intro && !' + HECHO, talk: [{ script: 'b07_ottilie_posada' }] },
				{ label: 'Una chica con un vestido de novia… lavado', sub: 'Desayuna sola y escribe postales', icon: '💐', cond: EN_CURSO, new: TESTIGOS + ' && !flag.b07_viajero_novia', talk: [
					{ cond: '!flag.b07_viajero_novia', script: 'b07_testigo_novia' },
					{ script: 'b07_testigo_novia_otra' },
				] },
				{ label: 'El sótano de revelado', sub: 'Cortina negra y luz roja', icon: '📷', cond: EN_CURSO, new: TESTIGOS + ' && !flag.b07_viajero_fotografo', talk: [
					{ cond: '!flag.b07_viajero_fotografo', script: 'b07_testigo_fotografo' },
					{ script: 'b07_testigo_fotografo_otra' },
				] },
				{ label: 'La posadera', sub: 'Seca vasos y sabe cosas', icon: '🍲', talk: [{ script: 'b07_posadera_plie' }] },
			],
			rumors: [
				{ text: 'La posadera de Plié dice que en treinta años ha visto de todo: gente que viene a ver las setas, gente que viene a ver la Casa y gente que viene a ver a la líder del estadio y se va sin atreverse a llamar.' },
			],
		},

		// ---------- El Estadio de Plié (cerrado por la temporada; Sally está) ----------
		estadio_plie: {
			name: 'Estadio de Plié', short: 'Estadio', parent: 'plie', kind: 'gym',
			bg: { type: 'gym', wall: '#5a3a5a', floor: '#4a5a3a' },
			desc: 'Un estadio pequeño de piedra vieja, con hiedra hasta las gradas y el césped del campo lleno de setas que brillan. Las gradas están vacías y tapadas con lonas moradas. Un cartel: «Gimnasio cerrado por la temporada. La líder, no».\n\nEn el palco, junto a una mesa de té, una señora muy mayor con un sombrero morado lee un libro con una lupa. Detrás de ella, una **estantería** enorme: libros ordenados por colores, del rosa al morado.',
			descNight: 'De noche, las setas del césped se encienden y el campo parece un cielo puesto al revés. En el palco hay una lámpara de pie encendida y una silla vacía con una manta. La estantería, a oscuras, sigue ordenada por colores. Se nota.',
			mapNote: 'Sally (líder de Plié; su gimnasio, otra temporada) · su estantería de cuentos',
			spots: [
				{ label: 'Sally', sub: 'Sombrero morado, lupa y una taza', icon: '☂️', talk: [
					{ cond: '!flag.b07_sally', script: 'b07_sally' },
					{ cond: HECHO, script: 'b07_sally_final' },
					{ script: 'b07_sally_charla' },
				] },
				{ label: 'La estantería de Sally', sub: 'Libros del rosa al morado', icon: '📚', cond: 'flag.b07_sally', new: 'flag.b07_viajero_novio && flag.b07_casa_sala3 && !flag.b07_sally_libro', talk: [
					{ cond: 'flag.b07_viajero_novio && flag.b07_casa_sala3 && !flag.b07_sally_libro', script: 'b07_sally_libro' },
					{ cond: 'flag.b07_sally_libro', script: 'b07_sally_libro_otra' },
					{ script: 'b07_sally_estanteria' },
				] },
				{ label: 'Un combate con preguntas', sub: 'Sally dice que pregunta mientras combate', icon: '❓', cond: 'flag.b07_sally && !beat("sally_quiz")', talk: [{ script: 'b07_sally_reto' }] },
			],
			rumors: [
				{ text: 'La líder de Plié busca sucesora desde hace años. Les hace preguntas a los aspirantes. Nadie sabe qué contestar. Ella tampoco, dice.' },
			],
		},

		// =================== BOSQUE LUMIRINTO ===================
		bosque_lumirinto: {
			name: 'Bosque Lumirinto', short: 'Lumirinto', region: 'galar', kind: 'forest', map: { x: 14, y: 56 },
			bg: { type: 'forest', far: '#1a2a2a', ground: '#2a3a2a', flowers: '#8ad6e0', fog: true },
			desc: 'Un bosque tan espeso que es de noche a mediodía. Los árboles tienen raíces como escaleras y las setas, del tamaño de paraguas, alumbran el camino en azul, rosa y verde. Hay un sendero de tablas de madera que se pierde y vuelve a aparecer.\n\nAl fondo, a media hora de Plié, entre helechos, una casa de madera con siete puertas de colores: la **Casa de las Siete Puertas**.',
			descNight: 'De noche, el Bosque Lumirinto es más claro que de día: todas las setas se encienden a la vez y el aire se llena de polvo que brilla, como si nevara hacia arriba. Se oyen pasitos entre los helechos. Si te paras, se paran.',
			links: ['plie', 'casa_siete'],
			mapNote: 'Bosque oscuro, setas luminosas · la excursionista acampa en el tramo 2 · la Casa de las Siete Puertas al final',
			rumors: [
				{ text: 'Las esporas de los Shiinotic brillan en la ropa durante días. En Plié se sabe quién ha ido al bosque por cómo brilla en el bar.' },
				{ text: 'En el tramo más oscuro del bosque, los recolectores dejan piedras planas para no pisar el musgo. Si ves una fila de piedras, síguela: alguien la puso para ti hace cincuenta años.' },
				{ cond: 'flag.b07_casa_intro', text: 'Dicen en Plié que un **Zoroark** del bosque se hace pasar por viajeros perdidos. Dicen también que una vez se hizo pasar por el alcalde y nadie notó la diferencia.' },
			],
			route: {
				from: 'plie', to: 'casa_siete', length: 5, terrain: 'forest', rate: 0.2,
				tramos: {
					0: [{ text: 'Las últimas casas de Plié y, de golpe, el bosque. La luz del día se queda en la linde, como si le diera vergüenza entrar. Un cartel de madera: «Casa de las Siete Puertas · media hora · no coja setas que brillen».' }],
					1: [
						{ text: 'Un claro pequeño, lleno de setas de todos los tamaños. Algunas brillan; otras, no. Las que no brillan son las que se comen. Lo pone en otro cartel, más pequeño, debajo del primero.' },
						{ spot: { action: { gather: 'b07_lumi_setas' } }, label: 'El claro de las setas', icon: '🍄', sub: 'Setas que se comen y setas que brillan' },
						{ trainer: 'lumi_bramble', optional: true, label: 'Una pintora con un caballete y la cara llena de polvo azul' },
					],
					2: [
						{ text: 'Al pie de un roble enorme, una tienda de campaña naranja cubierta de polvo que brilla. Al lado, una hoguera apagada, una mochila y unas botas de montaña recién estrenadas puestas a secar.', cond: '!' + HECHO },
						{ text: 'Al pie de un roble enorme, la marca redonda de una hoguera vieja y la hierba aplastada donde hubo una tienda de campaña. Alguien ha dejado una piedra encima de una nota: «Gracias, bosque. Perdón por los gritos».', cond: HECHO },
						{ talk: [{ cond: '!flag.b07_viajero_excursionista', script: 'b07_testigo_excursionista' }, { script: 'b07_testigo_excursionista_otra' }], label: 'La excursionista de la tienda naranja', icon: '⛺', cond: EN_CURSO, new: TESTIGOS + ' && !flag.b07_viajero_excursionista' },
						{ item: 'mistyseed', hidden: true },
					],
					3: [
						{ text: 'El tramo más oscuro. Las setas aquí son pequeñas y casi no alumbran. El sendero de tablas desaparece; en su lugar, una fila de piedras planas sobre el musgo, puestas a un paso de distancia. Alguien las puso hace mucho tiempo.' },
						{ trainer: 'lumi_ozzie', optional: true, label: 'Un aspirante del Desafío entrena a oscuras «para la líder»' },
						{ item: 'fullrestore', hidden: true },
					],
					4: [
						{ script: 'b07_maren_bosque', once: true, mark: true, cond: INVESTIGANDO + ' && !flag.b07_maren_bosque' },
						{ text: 'Los helechos se abren. Entre los troncos, a lo lejos, se ve un tejado de pizarra y siete manchas de color en una fachada de madera: siete puertas.' },
						{ item: 'bigmushroom', hidden: true },
					],
					5: [{ text: 'El sendero termina en una explanada de musgo, delante de una casa de madera oscura con siete puertas pintadas, cada una de un color. Encima de la Primera, tallado en un tablón: «AQUÍ EMPIEZA EL CUENTO».' }],
				},
				encounters: { forest: BOSQUE },
			},
		},

		// =================== LA CASA DE LAS SIETE PUERTAS ===================
		casa_siete: {
			name: 'La Casa de las Siete Puertas', short: 'La Casa', region: 'galar', kind: 'area', map: { x: 18, y: 62 },
			bg: { type: 'town', roofs: ['#3a3a4a'], far: '#1a2a2a', ground: '#2a3a2a', fog: true },
			desc: 'Una casa de madera oscura, alargada, con tejado de pizarra y **siete puertas** en la fachada, una detrás de otra, cada una de un color y con su nombre tallado encima: **Primera, de la Entrada** (roja) · Segunda, del Bosque (verde) · Tercera, de la Escalera (amarilla) · Cuarta, de las Preguntas (azul) · Quinta, del Eco (blanca) · **Sexta, del Jardín** (gris, cubierta de hiedra) · **Séptima, del Final** (negra, sin pomo).\n\nSe entra por la Primera y se sale por la Séptima. Por dentro, siete salas en fila, una prueba por sala. Detrás, un **jardín** de helechos que nadie poda.',
			descNight: 'De noche, las siete puertas se ven a la luz de las setas: la roja casi negra, la blanca casi azul. La Séptima no refleja nada. En una ventana del fondo, alguien ha dejado un farolillo apagado.',
			descs: [
				{ cond: '!' + CASA_ABIERTA, text: 'Una casa de madera oscura con **siete puertas** de colores en la fachada, cada una con su nombre tallado. En la Primera, la roja, hay un cartel clavado con una chincheta: «**CERRADO HASTA NUEVO AVISO.** Disculpen. — O. B.». La hiedra de la Sexta, la gris, se mueve con el viento. La Séptima, la negra, no tiene pomo.' },
				{ cond: HECHO + ' && ' + LECTURA, text: 'La Casa de las Siete Puertas, abierta otra vez. En la Primera, un cartel nuevo: «Abierto · Primera noche de cada mes: **la Noche del Final**». La hiedra de la Sexta ya no está arrancada a la altura de la mano: alguien la ha atado con una cinta de raso, para que no tape la puerta.' },
				{ cond: HECHO, text: 'La Casa de las Siete Puertas, abierta otra vez. En la Primera, un cartel nuevo: «Abierto · Visitas al anochecer». Siete capas grises cuelgan en el perchero de la entrada. La Séptima, la negra, ya tiene llave en su gancho.' },
			],
			mapNote: 'La Casa (Ottilie Brack) · Sala Primera, salas Segunda a Sexta, la Séptima · el jardín y la Puerta Sexta',
			links: ['bosque_lumirinto'],
			onEnter: [{ script: 'b07_casa_visita', cond: CASA + ' && !flag.b07_ottilie_casa', once: true }],
			spots: [
				{ label: 'Las siete puertas', sub: 'Siete colores, siete nombres', icon: '🚪', talk: [{ script: 'b07_casa_fachada' }] },
				{ label: 'Puerta Primera, de la Entrada', sub: 'La roja', icon: '🟥', cond: CASA_ABIERTA, action: { go: 'casa_vestibulo' } },
				{ label: 'El jardín de atrás', sub: 'Helechos, barro y la Puerta Sexta', icon: '🌿', cond: CASA_ABIERTA, new: INVESTIGANDO + ' && !(flag.b07_casa_pestillo && flag.b07_casa_huellas)', action: { go: 'casa_jardin' } },
				{ label: 'Ottilie Brack', sub: 'Con su farolillo, delante de la Primera', icon: '🏮', cond: 'flag.b07_ottilie_casa && (' + INVESTIGANDO + ' || ' + HECHO + ')', talk: [
					{ cond: HECHO, script: 'b07_ottilie_despues' },
					{ script: 'b07_ottilie_casa_charla' },
				] },
			],
			rumors: [
				{ text: 'Edmund Vane tardó once años en construir la Casa. Decía que un cuento no se escribe: se monta, tabla a tabla, y luego se le pide a alguien que lo recorra.' },
				{ text: 'La Séptima Puerta no tiene pomo. Solo se abre con su llave, que es de latón y grande como una mano. O eso dice la anfitriona. Los niños de Plié dicen que hay otra forma, «como en los cuentos».' },
			],
		},

		// ---------- Sala Primera (el vestíbulo, el banco y el registro) ----------
		casa_vestibulo: {
			name: 'Sala Primera, de la Entrada', short: 'Sala Primera', parent: 'casa_siete', kind: 'building',
			bg: { type: 'indoor', wall: '#5a2a2a', floor: '#3a2a1e' },
			desc: 'Un vestíbulo estrecho con las paredes pintadas de rojo oscuro. A la izquierda, un **perchero** de hierro con siete ganchos. A la derecha, un atril con el **libro de registro**. Al fondo, pegado a la pared, un **banco** largo de madera, y encima, tallado con letra de cuento: «Siéntate. Lo que viene, viene».\n\nUna puerta verde lleva a las demás salas.',
			descNight: 'De noche el rojo de las paredes se vuelve casi negro. El banco del fondo queda en sombra. Si te sientas en él, desde la puerta no se te ve.',
			mapNote: 'El banco · el libro de registro · el perchero de las capas',
			spots: [
				{ label: 'El banco del fondo', sub: '«Siéntate. Lo que viene, viene»', icon: '🪑', new: '!flag.b07_casa_sala1', talk: [{ script: 'b07_casa_banco' }] },
				{ label: 'El libro de registro', sub: 'En un atril, con una pluma atada', icon: '📖', talk: [{ script: 'b07_casa_registro' }] },
				{ label: 'El perchero de las capas', sub: 'Siete ganchos de hierro', icon: '🧥', talk: [{ script: 'b07_casa_perchero' }] },
				{ label: 'Puerta Segunda, del Bosque', sub: 'La verde: lleva a las demás salas', icon: '🟩', cond: CASA_ABIERTA, action: { go: 'casa_salas' } },
			],
		},

		// ---------- Salas Segunda a Sexta ----------
		casa_salas: {
			name: 'Salas Segunda a Sexta', short: 'Las salas', parent: 'casa_siete', kind: 'building',
			bg: { type: 'indoor', wall: '#2a3a3a', floor: '#2a221e' },
			desc: 'Cinco salas en fila, cada una con su puerta de color. La **Segunda**, del Bosque: paredes forradas de ramas de verdad. La **Tercera**, de la Escalera: tres escalones de madera que suben y tres que bajan. La **Cuarta**, de las Preguntas: un espejo con una adivinanza escrita encima. La **Quinta**, del Eco: un pasillo que repite lo que dices con un segundo de retraso. Y la **Sexta**, de la Oscuridad: una sala vacía, con faroles en las esquinas y una puerta gris al fondo que da al jardín.\n\nAl final, la Séptima Puerta: negra, sin pomo.',
			descNight: 'De noche las salas huelen a madera y a cera de farol. En la Quinta, el eco tarda un poco más en contestar. Como si se lo pensara.',
			mapNote: 'Tercera: el escalón que cruje · Sexta: el apagón · al fondo, la Séptima',
			spots: [
				{ label: 'Sala Segunda, del Bosque', sub: 'Paredes de ramas', icon: '🌲', talk: [{ script: 'b07_casa_sala2' }] },
				{ label: 'Sala Tercera, de la Escalera', sub: 'Tres escalones arriba, tres abajo', icon: '🪜', new: '!flag.b07_casa_sala3', talk: [{ script: 'b07_casa_sala3' }] },
				{ label: 'Sala Cuarta, de las Preguntas', sub: 'Un espejo con una adivinanza', icon: '🪞', talk: [{ script: 'b07_casa_sala4' }] },
				{ label: 'Sala Quinta, del Eco', sub: 'Un pasillo que contesta tarde', icon: '🗣️', talk: [{ script: 'b07_casa_sala5' }] },
				{ label: 'Sala Sexta, de la Oscuridad', sub: 'Faroles en las esquinas y una puerta gris', icon: '🕯️', new: '!flag.b07_casa_sala6', talk: [{ script: 'b07_casa_sala6' }] },
				{ label: 'La Séptima Puerta, del Final', sub: 'Negra, sin pomo', icon: '⬛', cond: CASA_ABIERTA, action: { go: 'casa_septima' } },
			],
		},

		// ---------- La Séptima (la puerta sin pomo y el sillón de Edmund) ----------
		casa_septima: {
			name: 'Sala Séptima, del Final', short: 'La Séptima', parent: 'casa_siete', kind: 'building',
			bg: { type: 'indoor', wall: '#1e1e26', floor: '#2a221e' },
			desc: 'Delante de la Séptima Puerta, negra y sin pomo, hay un recibidor diminuto con una lámpara de aceite. En la puerta, a la altura del pecho, una rejilla de latón con piezas que se deslizan, como un juego de niños: el mecanismo de Edmund.\n\nDetrás, la última sala: pequeña, con una ventana redonda que da al bosque, una alfombra gastada y, en el centro, el **sillón de Edmund**: orejero, de terciopelo verde, con las marcas de dos codos en los brazos.',
			descNight: 'De noche la ventana redonda de la Séptima se llena de setas que brillan. El sillón queda a contraluz, como si alguien estuviera sentado en él. No hay nadie. Lo compruebas dos veces.',
			descs: [{ cond: HECHO + ' && ' + LECTURA, text: 'La Séptima, con su ventana redonda y su alfombra gastada. El sillón de Edmund ya no está solo: al lado hay una banqueta baja, de las de leer a los niños, y en el doble fondo, cerrado, un cuaderno nuevo con hojas en blanco y una etiqueta: «Para la Noche del Final».' }],
			mapNote: 'El mecanismo de la puerta · el sillón de Edmund',
			spots: [
				{ label: 'El mecanismo de la Séptima', sub: 'Una rejilla de latón con piezas que se deslizan', icon: '🔐', cond: '!flag.b07_casa_septima_abierta', new: INVESTIGANDO, talk: [{ script: 'b07_casa_mecanismo' }] },
				{ label: 'El sillón de Edmund', sub: 'Orejero, de terciopelo verde', icon: '🛋️', cond: 'flag.b07_casa_septima_abierta', new: '!flag.b07_casa_doble_fondo', talk: [
					{ cond: '!flag.b07_casa_doble_fondo', script: 'b07_casa_sillon' },
					{ script: 'b07_casa_sillon_otra' },
				] },
			],
		},

		// ---------- El jardín y la Puerta Sexta ----------
		casa_jardin: {
			name: 'Jardín de la Casa', short: 'El jardín', parent: 'casa_siete', kind: 'area',
			bg: { type: 'forest', far: '#1a2a2a', ground: '#2a3a22', fog: true },
			desc: 'Detrás de la Casa, un jardín que hace años que nadie poda: helechos hasta la cintura, un banco de piedra hundido en el musgo y barro que no se seca nunca. En la pared de atrás, la **Puerta Sexta**, gris, cubierta de hiedra. Por fuera tiene un pestillo de hierro, de los antiguos.',
			descNight: 'De noche el jardín se llena de luz: las setas de los helechos se encienden y el barro brilla donde las esporas han caído. Cualquier pisada se ve, como escrita con tiza.',
			mapNote: 'La Puerta Sexta (pestillo) · el barro · Pokémon del bosque',
			spots: [
				{ label: 'La Puerta Sexta, del Jardín', sub: 'Gris, con hiedra y un pestillo de hierro', icon: '🔩', new: '!flag.b07_casa_pestillo', talk: [{ script: 'b07_casa_pestillo' }] },
				{ label: 'Rastrear el barro con {riolu}', sub: 'Algo ha pisado aquí y {riolu} lo nota', icon: '🐾', cond: '(' + LUC + ') && flag.b07_casa_pestillo && !flag.b07_casa_huellas', new: 'true', talk: [{ script: 'b07_casa_rastreo' }] },
				{ label: 'El barro bajo la hiedra', sub: 'Revuelto; sin {riolu} no se lee', icon: '🟫', cond: '!(' + LUC + ') && flag.b07_casa_pestillo && !flag.b07_casa_huellas', talk: [{ script: 'b07_casa_sin_aura' }] },
				{ label: 'Las huellas del barro', sub: 'Marcadas con palitos', icon: '🥾', cond: 'flag.b07_casa_huellas', talk: [{ script: 'b07_casa_huellas_otra' }] },
				{ label: 'Buscar entre los helechos', sub: 'Algo se mueve entre las hojas', icon: '🌿', action: { explore: 'forest' } },
			],
			encounters: { forest: BOSQUE },
		},
	},

	// =====================================================================
	// ENTRENADORES (Sally, opcional y amistosa; dos opcionales del bosque. Sin combates obligatorios)
	// =====================================================================
	trainers: {
		sally_quiz: { name: 'Sally', cls: 'Líder', npc: 'sally', ai: 4, iv: 27, reward: 4140, bg: 'gym',
			team: [
				{ sp: 'weezinggalar', lv: 67, moves: ['strangesteam', 'sludgebomb', 'flamethrower', 'willowisp'], ability: 'levitate', nature: 'modest' },
				{ sp: 'mawile', lv: 67, moves: ['playrough', 'ironhead', 'suckerpunch', 'swordsdance'], ability: 'intimidate', nature: 'adamant' },
				{ sp: 'rapidashgalar', lv: 68, moves: ['psychocut', 'playrough', 'highhorsepower', 'megahorn'], ability: 'pastelveil', nature: 'jolly' },
				{ sp: 'togekiss', lv: 68, moves: ['dazzlinggleam', 'airslash', 'aurasphere', 'roost'], ability: 'serenegrace', item: 'scopelens', nature: 'timid' },
				{ sp: 'alcremie', lv: 69, moves: ['dazzlinggleam', 'mysticalfire', 'calmmind', 'recover'], ability: 'aromaveil', item: 'leftovers', nature: 'calm' },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Muy bien. Mientras combatimos le haré preguntas. Usted conteste con el corazón. El corazón casi nunca acierta, pero es muy entretenido.',
			win: 'Ah. Qué rosa. No el combate: usted. Tiene usted un rosa por dentro que no se ve a primera vista. Me gusta. No se lo diga a nadie.',
			lose: 'Ha perdido usted con mucho estilo. El estilo no da medallas. Da otras cosas. Vuelva cuando quiera: el té no se enfría en esta casa. Lo caliento yo.' },
		lumi_bramble: { name: 'Bramble', cls: 'Pintora', ai: 3, reward: 2680,
			team: [
				{ sp: 'shiinotic', lv: 66, moves: ['spore', 'moonblast', 'gigadrain', 'strengthsap'], ability: 'effectspore' },
				{ sp: 'hatterene', lv: 67, moves: ['psychic', 'dazzlinggleam', 'mysticalfire', 'calmmind'], ability: 'magicbounce' },
			],
			intro: '¡No te muevas! Estás justo delante de la mejor luz del bosque. Bueno, ya que estás: un combate. Si gano, posas. Si pierdes, posas también.',
			win: 'Has ganado y no has posado. Lo respeto. Te he pintado igual, de memoria. Te he puesto más alto{|a|e}. De nada.',
			look: { hair: 'bun', hairColor: '#c4743a', outfit: '#5a6a8a', outfit2: '#8ad6e0', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'freckles' } },
		lumi_ozzie: { name: 'Ozzie', cls: 'Aspirante del Desafío', ai: 3, reward: 2720,
			team: [
				{ sp: 'grimmsnarl', lv: 67, moves: ['spiritbreak', 'falsesurrender', 'suckerpunch', 'bulkup'], ability: 'prankster' },
				{ sp: 'trevenant', lv: 66, moves: ['woodhammer', 'shadowclaw', 'hornleech', 'willowisp'], ability: 'naturalcure' },
				{ sp: 'slurpuff', lv: 67, moves: ['playrough', 'drainpunch'], ability: 'unburden' },
			],
			intro: 'Entreno a oscuras. La líder de Plié dice que el que ve en la oscuridad ve lo que importa. Yo de momento solo veo setas. Y a ti. ¡Combate!',
			win: 'Bueno. No veía nada. Ni tu ataque. Sigo entrenando. A oscuras. Con más setas.',
			look: { hair: 'spiky', hairColor: '#2a2420', outfit: '#5a3a5a', outfit2: '#f2c84a', skin: 3, eyesStyle: 'sharp', mouth: 'grin', acc: 'headband' } },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LA CARTA DE QUINTANA (Buzón) ===================
		b07_casa_carta: [
			{ if: '!flag.b07_casa_carta', then: [
				{ set: { 'flag.b07_casa_carta': true } },
				{ text: 'Con la carta viene una tarjeta de visita con una esquina doblada: «M. Quintana · Perito de siniestros». Por detrás, a boli: «Posada de Plié. Tren desde Pistón, andén 2, a y cuarenta».' },
				{ quest: 'b07_s_casa', stage: 'carta' },
				{ say: 'rotom', text: '¡Bzzt! Un caso. Con siete puertas. Y una cuenta que no sale. —Pausa—. Las cuentas que no salen me ponen nervioso. Vamos, ¿va?', cond: '!' + PURGADO },
				{ say: 'rotom', text: 'Bzzt. Un caso. Siete firmas. Ocho personas. No me sale. Vamos.', cond: PURGADO },
			], else: [
				{ text: 'La carta de Quintana. La P. D. sobre las setas está subrayada dos veces.', cond: '!flag.b07_casa_intro || ' + CARTA },
				{ text: 'La carta de Quintana, que llegó cuando ya estabas en Plié. Correos de Galar va a su ritmo. La P. D. sobre las setas está subrayada dos veces.', cond: 'flag.b07_casa_intro && !(' + CARTA + ')' },
			] },
		],

		// =================== PLIÉ: LA LLEGADA ===================
		b07_plie_llegada: [
			{ if: 'flag.b07_plie_llegada', then: [{ end: true }] },
			{ set: { 'flag.b07_plie_llegada': true } },
			{ text: 'En el andén 2 de Pistón, Agnes Tull te picó el billete sin levantar la vista del horario.' },
			{ say: 'agnes', text: 'El de las 17:40 a Plié. Llega a las 18:22. Si llega antes, el maquinista ha corrido: denúncielo. Si llega después, es que llueve en el bosque. Siempre llueve en el bosque.' },
			{ text: 'El tren llegó a las 18:22. Entre Pistón y Plié no hay más que árboles: cada vez más altos, cada vez más juntos, hasta que la luz de la ventanilla se vuelve verde y luego azul.' },
			{ text: 'Plié es un pueblo metido dentro del bosque. Tejados morados, farolas con forma de seta y setas de verdad por todas partes, encendidas como si alguien hubiera dejado las luces puestas. En el andén hay un reloj parado. Nadie lo mira.' },
			{ text: '{riolu} levanta el hocico y estornuda: el aire está lleno de un polvillo que brilla. Se mira la pata, que ahora brilla un poco, y la sacude muy ofendido.', cond: LUC },
			{ say: 'rotom', text: '¡Bzzt! ¡Las setas brillan! ¡Todas! Esto no sale en mi mapa como «pueblo»: sale como «zona húmeda con luces». Me gusta más como pueblo.', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Setas que brillan. Muchas. No se comen. Lo pone en un cartel.', cond: PURGADO },
			{ diary: 'Hoy fuimos a Plié en tren. Agnes dijo la hora. Llegó a esa hora.\n\nEl pueblo esta dentro de un bosque. Las setas brillan. {jugador} quería tocar una. No la tocó.', cond: D_PURGADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo tomamos el tren de las 17:40 en Pistón y llegamos a Pueblo Plié a las 18:22, como dijo Agnes. Plié está dentro del Bosque Lumirinto: tejados morados, farolas con forma de seta y setas de verdad que brillan por todas partes.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy fuimos a Pueblo Plié! Es un pueblo dentro de un bosque donde las setas brillan de verdad, en azul y en rosa. Parece un cuento. En el andén hay un reloj parado y a nadie le importa. ¡Qué sitio tan bonito!', cond: D_DOBLE },
		],

		// =================== QUINTANA Y OTTILIE (escena 1: el encargo) ===================
		b07_casa_intro: [
			{ if: 'flag.b07_casa_intro', then: [{ end: true }] },
			{ text: 'En el andén de Plié, debajo del reloj parado, un hombre con gabardina color arena come pipas de un cucurucho de papel. Tiene el pelo gris revuelto, gafas de pasta y una corbata mal anudada. En una viga de la marquesina, un Noctowl gira la cabeza hacia ti. Del todo.' },
			{ if: 'flag.b07_casa_carta', then: [
				{ say: Q, text: '{jugador}. Viniste. Bien. —Se sube las gafas con el nudillo—. No te levantes la manga, que te veo la pulsera de Galar. Aquí todo el mundo tiene una. Yo no. Yo tengo una libreta.' },
			], else: [
				{ say: Q, text: '¿{jugador}? Te he escrito. Correos de Galar va a su ritmo, que es el de los Wooloo. —Se sube las gafas con el nudillo—. Mauro Quintana. Perito de siniestros. Ella es Lupa. Mira lo que yo no miro.', cond: '!flag.det_c1_carta' },
				{ say: Q, text: '{jugador}. Te he escrito, pero Correos de Galar va al ritmo de los Wooloo. Da igual: ya estás aquí. Lupa te ha reconocido antes que yo. Ella siempre gana.', cond: 'flag.det_c1_carta' },
				{ set: { 'flag.b07_casa_carta': true } },
			] },
			{ say: Q, text: 'Te cuento por el camino. La posada está en la plaza. Son cien pasos. Los he contado.' },
			{ text: 'La posada de Plié: vigas negras, una chimenea que tira mal y un tarro de setas que hace de lámpara. En la mesa de la chimenea espera una mujer de unos cincuenta años, con rizos negros y canas recogidos en un pañuelo morado, una capa gris demasiado larga y un farolillo en la mano. Apagado.' },
			{ say: 'ottilie', text: '¡Ah! ¡La persona de la Gira! ¡Pase, pase, siéntese! —Se levanta tan deprisa que tira la silla—. Perdón. Ottilie Brack. La de la Casa. Bueno: la de la Casa cerrada. Que es lo mismo que no tener casa, pero con más llaves. Con una llave menos, mejor dicho.' },
			{ say: 'ottilie', text: 'Hace tres semanas, noche de niebla, siete visitantes. Bueno. Siete en el libro. Firmaron, se pusieron las capas, entramos por la Primera. Les conté el cuento sala por sala, como siempre. En la Sexta se apagan los faroles sesenta segundos. Es parte del cuento. La Oscuridad.' },
			{ say: 'ottilie', text: 'Y cuando volvió la luz, la **Llave de la Séptima** ya no estaba en mi cinturón. —Se toca la cadera, donde hay un gancho vacío—. Sin llave, la Séptima no se abre. Sin la Séptima, no hay final. Y sin final… ¿quién paga por un cuento sin final?' },
			{ say: Q, text: 'Lo raro no es la llave. Las llaves se pierden. Lo raro es que los siete, por separado, me han dicho lo mismo: «**éramos ocho**». Y el libro tiene siete firmas. Siete capas. Siete nombres.' },
			{ say: 'ottilie', text: 'Ocho, sí. Yo también lo recuerdo. Ocho capuchas. Y no sé quién era la octava. ¡En mi propia casa! —Se le quiebra la voz y lo tapa con una risa demasiado alta—. Edmund se reiría. Él decía que en los cuentos siempre sobra alguien.' },
			{ choice: [
				{ text: '«¿Quién era Edmund?»', then: [
					{ say: 'ottilie', text: 'Edmund Vane. El cuentacuentos que construyó la Casa, tabla a tabla, para los niños del pueblo. Murió hace diez años. Yo se la compré a sus herederos con todo lo que tenía. Todo. Hasta el sillón de la Séptima venía incluido. Y su olor a pipa.' },
				] },
				{ text: '«¿Dónde están ahora los siete?»', then: [
					{ say: Q, text: 'Aquí. La aseguradora les paga la posada hasta que firmen la declaración. Yo la redacto muy despacio. Es una técnica. —Saca la libreta—. Están casi todos en la plaza o en la posada. La excursionista acampa en el bosque: en el pueblo la miran mal.' },
				] },
				{ text: 'Mirar a Lupa', then: [
					{ text: 'Lupa, desde la viga, mira a Ottilie. Luego al gancho vacío de su cinturón. Luego a Quintana. Quintana asiente muy despacio, como si le hubiera dicho algo.' },
				] },
			] },
			{ say: Q, text: 'Lo que hacemos: primero, escuchar a los siete. Uno por uno. Lo que contaron y cómo lo contaron. Luego, la Casa por dentro, puerta a puerta. Y al final, con todo apuntado, decimos un nombre. No antes.' },
			{ say: Q, text: 'En el pueblo se dice que fue el **Ditto** del niño. O un **Zoroark** del bosque. Las dos cosas pueden ser. Y yo no creo nada que no deje marca. A ver, a ver.' },
			{ say: 'ottilie', text: 'Les dejo la llave de la Primera cuando quieran entrar. A la Casa, digo. A mí no me queda otra llave que dejar.' },
			{ text: 'Ottilie sale a la plaza con su farolillo apagado. Quintana espera a que se cierre la puerta, se come una pipa y baja la voz.' },
			{ say: Q, text: 'Una cosa entre tú y yo. Una dueña arruinada y una llave asegurada: es lo primero que se me ocurre. Por eso desconfío de ello. Lo apunto y sigo.' },
			{ set: { 'flag.b07_casa_intro': true } },
			{ quest: 'b07_s_casa', stage: 'testigos' },
			{ intel: { npc: 'ottilie', text: 'Ottilie Brack compró la Casa de las Siete Puertas (Plié) hace diez años con todo lo que tenía. La Llave de la Séptima desapareció de su cinturón durante el apagón de la Sala Sexta. Está arruinada desde entonces.' } },
			{ intel: { npc: 'quintana', text: 'En Plié (Galar) investiga la Llave de la Séptima: siete visitantes juran que entraron ocho; el registro dice siete. Sospecha primero de la dueña, «por eso desconfía».' } },
			{ diary: 'Hoy en Plié conocimos a Quintana. Cuenta las cosas en voz alta. Cien pasos a la posada. Los contó.\n\nUna casa con siete puertas. Una llave perdida. Siete firmas. Y todos dicen ocho.\n\nNo me sale. A él tampoco. Por eso me cae bien.', cond: D_PURGADO },
			{ diary: 'Hoy en Plié conocimos a Mauro Quintana, perito de siniestros, y a Ottilie Brack, la dueña de la Casa de las Siete Puertas. Hace tres semanas desapareció la Llave de la Séptima durante el apagón de la Sala Sexta. Los siete visitantes de esa noche dicen, cada uno por su lado, que entraron ocho. El registro tiene siete firmas.\n\nVamos a escucharlos uno por uno.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy nos han dado un caso de detectives! Una casa del bosque con siete puertas de colores y una llave que se perdió en la oscuridad. Nos ayuda un señor muy simpático con un Noctowl que gira la cabeza del todo. ¡Libreta nueva!', cond: D_DOBLE },
		],
		b07_ottilie_posada: [
			{ text: 'Ottilie está en la mesa de la chimenea con el farolillo apagado delante, como si fuera una tetera. Cuando te ve, lo enciende. Cuando te sientas, lo apaga.' },
			{ say: 'ottilie', text: '¿Ha hablado con ellos? ¿Con los siete? Son buena gente. Me escriben postales a la posada, aunque estamos en la misma posada. —Suspira—. La Casa es un cuento, ¿sabe? Y un cuento sin final es como una escalera que no llega.', cond: TESTIGOS },
			{ say: 'ottilie', text: 'Cuando quieran ver la Casa por dentro, vayan por el Bosque Lumirinto. Yo les espero delante de la Primera. Con el farolillo encendido. Esta vez sí.', cond: CASA },
			{ say: 'ottilie', text: 'Quintana dice que ya lo tiene casi. Yo no quiero saberlo. Bueno, sí. Pero no quiero que sea alguien a quien conozco. Eso no se puede pedir, ¿verdad?', cond: ACUSAR },
		],
		b07_posadera_plie: [
			{ text: 'La posadera, una mujer ancha con un delantal de flores, seca un vaso que ya está seco.' },
			{ text: '«¿Sopa? Hoy hay de setas. Mañana también. En Plié siempre hay de setas. —Baja la voz—. Desde lo de la Casa, los huéspedes no paran de contarse la misma historia unos a otros. Cada vez con un detalle nuevo. Al final van a ser nueve».', cond: EN_CURSO },
			{ text: '«¿Sopa? Hoy hay de setas. La Casa ha vuelto a abrir, ¿sabe? Se me ha vaciado la posada. Bueno. Se me ha llenado de gente que viene a verla. Es mejor».', cond: HECHO },
			{ text: '«¿Sopa? Hoy hay de setas. Si viene por la Casa, está cerrada. Si viene por la líder, está en el estadio, pero no combate. Si viene por la sopa, ha acertado».', cond: '!' + EN_CURSO + ' && !' + HECHO },
		],
		b07_quintana_testigos: [
			{ text: 'Quintana tiene la libreta abierta sobre la mesa del rincón. Ha dibujado siete casillas. Algunas tienen una cruz.' },
			{ say: Q, text: 'Siete testigos. Los recién casados, el niño y su abuela, la excursionista del bosque, el fotógrafo del sótano y la chica del Team Yell. Los Abbot no se separan nunca, salvo cuando uno sale a contar farolas.' },
			{ say: Q, text: 'Escucha cómo lo cuentan, no solo qué cuentan. Quien repite la misma frase tres veces, la ha ensayado. Quien se contradice, a lo mejor solo está nervioso. A ver, a ver.' },
		],
		b07_quintana_casa: [
			{ say: Q, text: 'Ya los hemos oído a todos. Ahora la Casa. Ottilie nos espera allí, al final del bosque. Mira cada sala como si te la fueran a contar. Y fíjate en las que no se usan.' },
			{ say: Q, text: 'La Sexta tiene una puerta al jardín, dice Ottilie. Que no se abre nunca. Las puertas que no se abren nunca son mis favoritas.', cond: '!flag.b07_casa_pestillo' },
			{ say: Q, text: 'Edmund escribía cuentos. Si alguien en este pueblo tiene sus libros, es la líder del estadio. Dicen que los ordena por colores. Me parece un sistema tan bueno como cualquiera.', cond: 'flag.b07_casa_sala3 && !flag.b07_sally_libro' },
		],
		b07_quintana_charla: [
			{ say: Q, text: 'Tómatelo con calma. Yo no tengo prisa. El culpable, sí. Y la prisa se nota.', cond: ACUSAR },
			{ say: Q, text: 'Siete firmas. Ocho personas. Lo apunto otra vez, por si cambia. No cambia.', cond: '!' + ACUSAR },
		],

		// =================== LOS SIETE VISITANTES ===================
		// Cierre común: con los siete, la Casa por dentro
		b07_casa_testigos_check: [
			{ if: SIETE + ' && ' + TESTIGOS, then: [
				{ quest: 'b07_s_casa', stage: 'casa' },
				{ say: 'rotom', text: '¡Bzzt! Ya están los siete. Siete versiones. Todas dicen ocho. Ninguna dice quién. —Pausa—. Quintana quiere ir a la Casa. Por el bosque. Yo llevo la linterna. Bueno, yo soy la linterna.', cond: '!' + PURGADO },
				{ say: 'rotom', text: 'Bzzt. Siete. Ya están. Todos dicen ocho. Ahora, la Casa. Por el bosque.', cond: PURGADO },
			] },
		],
		// ----- Lark Abbot (la recién casada) · posada -----
		b07_testigo_novia: [
			{ text: 'Una chica de veintipocos, con el pelo recogido en un moño deshecho y un vestido de novia que alguien ha lavado a mano y se ha quedado un poco corto, desayuna sola y escribe postales con una letra preciosa. En la mano, una alianza tan nueva que todavía brilla.' },
			{ say: 'casa_lark', text: '¡Ay! ¿Es usted la persona del señor Quintana? Siéntese. Lark Abbot. Bueno, Lark Abbot desde hace un mes. Antes era Lark Penhallow, que es más largo. —Se ríe—. Robin está fuera contando farolas. Lo hace cuando se pone nervioso. Desde esa noche, cuenta mucho.' },
			{ say: 'casa_lark', text: 'Vinimos de luna de miel porque a mí me encantan los cuentos. Firmamos a la vez, en la misma línea, con la misma pluma. Fue idea mía. Muy romántico. Luego nos pusimos las capas, que son grises y pican.' },
			{ say: 'casa_lark', text: 'Éramos ocho. Lo sé porque yo cuento a la gente sin querer, como Robin las farolas. Y la octava iba **al lado de la excursionista**, la de la mochila. Desde la puerta. Pegadita. Con la capucha puesta. No le vi la cara.' },
			{ choice: [
				{ text: '«¿Seguro que iba con la excursionista?»', then: [
					{ say: 'casa_lark', text: 'Segurísima. Bueno, segura. Bueno… lo he contado tantas veces que ya no sé si me acuerdo o me acuerdo de contarlo. ¿Le pasa eso a usted? A Robin sí.' },
				] },
				{ text: '«¿Y la llave?»', then: [
					{ say: 'casa_lark', text: 'Ni la vi. En la Sexta se apagó todo y yo le agarré la mano a Robin. Bueno, agarré una mano. Ojalá fuera la de Robin. —Se pone pálida—. Era la de Robin. Seguro.' },
				] },
			] },
			{ set: { 'flag.b07_viajero_novia': true } },
			{ call: 'b07_casa_testigos_check' },
		],
		b07_testigo_novia_otra: [
			{ say: 'casa_lark', text: 'He escrito ya veinte postales. A mi madre le he mandado seis. Todas dicen lo mismo: «Seguimos en Plié. Las setas brillan. Robin cuenta farolas».', cond: '!' + HECHO },
		],
		// ----- Robin Abbot (el recién casado) · plaza -----
		b07_testigo_novio: [
			{ text: 'Un chico delgado con una alianza nueva da vueltas a la plaza señalando las farolas con el dedo. Mueve los labios. Cuando llega a la última, vuelve a empezar.' },
			{ say: 'casa_robin', text: 'Veintitrés. Veintitrés farolas. Ayer eran veintitrés. —Se gira—. ¡Perdón! Robin. Abbot. Robin Abbot. Lark le habrá dicho que cuento cosas. Es verdad. Me calma. Las farolas no se mueven.' },
			{ say: 'casa_robin', text: '¿Esa noche? Yo iba mirando el suelo. Me da miedo la oscuridad, y en una casa de cuento siempre hay oscuridad. Así que no sé con quién iba nadie. Lark dice que la octava iba con la excursionista. Lark se acuerda de todo. Bueno, de todo lo que cuenta.' },
			{ say: 'casa_robin', text: 'Lo que sí sé es lo del **escalón**. En la Sala Tercera hay un escalón que cruje, y la señora Brack avisa siempre: «¡cuidado con el escalón!». Es parte del cuento. Pero esa noche, **antes** de que lo dijera ella, una voz de mujer dijo bajito: «cuidado con el escalón». Muy bajito. Como quien lo dice siempre.' },
			{ say: 'casa_robin', text: 'Me reí porque pensé que era parte del cuento. Luego la señora Brack lo dijo otra vez, con su voz de cuento, y ya no me reí. —Cuenta una farola con el dedo, sin querer—. Veinticuatro. No. Veintitrés.' },
			{ set: { 'flag.b07_viajero_novio': true } },
			{ call: 'b07_casa_testigos_check' },
		],
		b07_testigo_novio_otra: [
			{ say: 'casa_robin', text: 'Veintitrés. —Te ve—. ¿Sabe que la farola del puesto de setas es la única que no tiene seta encima? La de la chica del gorro. Le gusta su luz. Eso dice. No dice mucho más.', cond: '!' + HECHO },
		],
		// ----- Pip y su Ditto · plaza -----
		b07_testigo_nino: [
			{ text: 'Un niño de unos ocho años juega en el borde de la fuente con un **Ditto**. El Ditto se convierte en lo que tiene delante: en una seta, en una piedra, en la zapatilla del niño. Dos vecinos lo miran desde la puerta del bar y cuchichean.' },
			{ text: 'El Ditto te ve llegar con {riolu}, se estira, se encoge y se convierte en un {riolu} pequeñito con la cara de Ditto. {riolu} lo mira. Ladea la cabeza. El Ditto ladea la cabeza también.', cond: LUC },
			{ say: 'casa_pip', text: '¡Este es Gelatina! ¡Y NO FUE ÉL! —Lo abraza tan fuerte que se le escurre entre los brazos—. Todo el pueblo dice que fue Gelatina, que se convirtió en una persona y se llevó la llave. ¡Pero Gelatina no sabe ser persona! ¡Le sale la cara de Gelatina!' },
			{ say: 'casa_pip', text: 'Toda la noche fue un peluche. Un Wooloo de peluche. Se lo pedí yo, porque las capas pican y un Wooloo es blandito. La abuela lo llevaba de la pata cuando yo me cansaba. ¡Pregúntele a la abuela!' },
			{ say: 'rotom', text: '¡Bzzt! Ditto. Copia la forma de lo que ve, al detalle. Lo que no copia es la cara: le sale la suya. —Bajito—. Y no habla. Los Ditto no hablan. Ni imitan voces.', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Ditto. Copia formas. La cara, no. Y no habla.', cond: PURGADO },
			{ set: { 'flag.b07_viajero_nino': true } },
			{ call: 'b07_casa_testigos_check' },
		],
		b07_testigo_nino_otra: [
			{ text: 'Pip le enseña a Gelatina a ser una farola. Le sale una farola con cara de Ditto. Pip aplaude.', cond: '!' + HECHO },
		],
		// ----- Hester, la abuela · el banco de la fuente -----
		b07_testigo_abuela: [
			{ text: 'En el banco de la fuente, una señora mayor con un chal de cuadros y gafas de cadena hace punto sin mirar las agujas. Mira la plaza. Mira a Pip. Te mira a ti. Las agujas no paran.' },
			{ say: 'casa_hester', text: 'Hester. La abuela de Pip. Siéntese, que de pie me da tortícolis. —Las agujas, *clic, clic*—. Ya sé lo que viene a preguntar. Los siete lo contamos igual. Los siete nos equivocamos igual, también.' },
			{ say: 'casa_hester', text: 'Yo le digo lo que vi. Cuando entramos por la Primera, la octava **ya estaba sentada en el banco** del fondo. Con la capucha puesta. Quieta. Pensé que era de la casa: una actriz, de esas que contratan para los cuentos. Y cuando empezamos a andar, se levantó y vino con nosotros.' },
			{ say: 'casa_hester', text: 'Y otra cosa, que nadie me ha preguntado porque nadie pregunta a las abuelas: su capucha **era de punto**. Punto de arroz, a mano. Buena lana gris. Las de la casa son de fieltro y pican. Esa no picaba. Se le notaba.' },
			{ say: 'casa_hester', text: 'Y Gelatina iba de peluche, en brazos de Pip. Yo lo llevaba de la pata cuando el niño se cansaba. Toda la noche. El que diga otra cosa, que venga y me lo diga a mí. *Clic, clic.*' },
			{ set: { 'flag.b07_viajero_abuela': true } },
			{ call: 'b07_casa_testigos_check' },
		],
		b07_testigo_abuela_otra: [
			{ text: 'Hester sigue haciendo punto. Ha empezado una bufanda gris. «Punto de arroz», te dice sin que preguntes. «Para que no pique».', cond: '!' + HECHO },
		],
		// ----- Fen, la excursionista · bosque, tramo 2 -----
		b07_testigo_excursionista: [
			{ text: 'Una chica con el pelo corto y la chaqueta llena de polvo que brilla sale de la tienda naranja con una cazuela en la mano. Te ve. Da un paso atrás y casi se cae: lleva unas **botas de montaña nuevas**, de suela lisa, y el musgo resbala como el jabón.' },
			{ say: 'casa_fen', text: '¡Uy! Perdón. Me he caído tres veces hoy. Botas nuevas. —Se las mira con rencor—. Fen. Soy Fen. Y no, no voy a volver al pueblo, que me miran como si yo fuera el Zoroark.' },
			{ say: 'casa_fen', text: 'Es por esto. —Se sacude la chaqueta y salta polvo azul—. Esporas de Shiinotic. Acampo aquí, en el bosque, y brillo. En el pueblo dicen que la octava brillaba igual, que era «del bosque». ¡Todo lo que viene del bosque brilla! ¡Brilla hasta el cartero!' },
			{ say: 'casa_fen', text: 'Y la octava no iba conmigo. Yo voy sola. Siempre. Por eso me acuerdo: había alguien detrás de mí que no era nadie del grupo, y luego ya no. Y dicen que hay un **Zoroark** en este bosque que se hace pasar por gente. Yo duermo aquí. ¿Sabe lo que es dormir aquí pensando eso?' },
			{ choice: [
				{ text: '«Si no fuiste tú, la verdad saldrá. Quintana no acusa sin pruebas.»', then: [
					{ say: 'casa_fen', text: 'Ojalá. —Se sienta en un tronco y se le resbala el pie—. Si sale, vuelvo al pueblo y me como una sopa de setas. De las que no brillan.' },
				] },
				{ text: 'Ayudarla a montar bien la tienda', then: [
					{ text: 'Le ayudas a tensar los vientos de la tienda. Era lo que le faltaba: llevaba tres semanas durmiendo en una tienda que se le caía encima. Te da las gracias con una cazuela de algo que, por suerte, no brilla.' },
				] },
			] },
			{ set: { 'flag.b07_viajero_excursionista': true } },
			{ call: 'b07_casa_testigos_check' },
		],
		b07_testigo_excursionista_otra: [
			{ say: 'casa_fen', text: 'Me he vuelto a caer. Botas nuevas, suela lisa. En la tienda me dijeron «de montaña». No me dijeron «de musgo». —Se frota la rodilla—. Los recolectores llevan clavos. Debería haber preguntado.', cond: '!' + HECHO },
		],
		// ----- Clive, el fotógrafo · sótano de la posada -----
		b07_testigo_fotografo: [
			{ text: 'Detrás de la cortina negra, bajo una bombilla roja, un hombre de unos sesenta con un chaleco lleno de bolsillos cuelga fotos de una cuerda con pinzas de la ropa. Huele a vinagre. Sin girarse:' },
			{ say: 'casa_clive', text: 'Cierre la cortina, que se vela. —La cierras—. Clive. Fotógrafo de bodas, jubilado. Ahora hago fotos de sitios que van a cerrar. Esta casa iba a cerrar, ¿sabe? Lo noté. Las casas que van a cerrar tienen una luz.' },
			{ say: 'casa_clive', text: 'Sí, tengo la foto del grupo. En la Sala Primera, con flash, antes de empezar el cuento. Ocho capuchas. Y no, no la enseño gratis. Nada que valga algo se enseña gratis. —Se gira por fin—. Quiero una foto a cambio. De su Pokémon. El que lleva delante.' },
			{ choice: [
				{ text: 'Dejar que fotografíe a {riolu}', cond: LUC, then: [
					{ text: 'Clive coloca a {riolu} bajo la bombilla roja, le pide que mire «hacia el futuro» y dispara. {riolu} mira hacia la cortina. Clive dice que eso es el futuro. Se le escapa una sonrisa debajo del bigote.' },
				] },
				{ text: 'Dejar que fotografíe a tu Pokémon de cabeza', then: [
					{ text: 'Clive coloca a tu Pokémon bajo la bombilla roja y le pide que «piense en algo bonito». Dispara. Mira la cámara. «Ha pensado en comida», dice. «Es lo más bonito que hay».' },
				] },
			] },
			{ say: 'casa_clive', text: 'Trato hecho. Le dejo una copia. —Despinza una foto de la cuerda—. Mírela con calma. Las fotos no tienen opinión. Por eso me gustan.' },
			{ give: 'fotogrupocasa' },
			{ text: 'La foto: la Sala Primera, roja, con el flash rebotando en las paredes. **Siete capuchas grises** de frente, con caras de susto y de risa. Pip, con un **Wooloo de peluche** en brazos que tiene la cara rara. Y al fondo, **junto al banco**, una **octava capucha**, de espaldas, sola, sin nadie al lado. De lana. Gris. Un poco más oscura que las otras.' },
			{ set: { 'flag.b07_viajero_fotografo': true } },
			{ call: 'b07_casa_testigos_check' },
		],
		b07_testigo_fotografo_otra: [
			{ say: 'casa_clive', text: 'La luz de esa casa ha cambiado desde que vinieron ustedes. No sé si a mejor. Ya le diré cuando la revele.', cond: '!' + HECHO },
		],
		// ----- Dee, la hincha del Team Yell · plaza -----
		b07_testigo_hincha: [
			{ text: 'Una chica con la cara pintada de negro y rosa, una bufanda del Team Yell que le da tres vueltas al cuello y una voz que llega a la otra punta de la plaza. Sentada en el borde de la fuente, mascando chicle.' },
			{ say: 'casa_dee', text: '¡EH! ¡Tú eres {el|la|le} de la Gira! ¡YELL! —Te da un apretón de manos que duele—. Dee. Vine a Plié porque me equivoqué de tren. Iba a Crampón, a ver a Nerio. Llegué aquí. Me quedé por la Casa. Y luego, por lo otro.' },
			{ say: 'casa_dee', text: '¡La octava iba **pegada a mí**! ¡Todo el rato! Lo sé porque **me pisó** en la Sala Segunda, la de las ramas. Con una bota dura. ¡Me dolió tres días! —Se mira el pie—. Bueno. Dos.' },
			{ say: 'casa_dee', text: 'Y en la Tercera, lo del **escalón**: alguien dijo «cuidado con el escalón» antes que la jefa. Una voz de chica. Bajita. Yo tengo muy buena memoria para las voces. Y para las caras. Esa no tenía cara de turista. Tenía cara de… de aquí. De bosque.' },
			{ say: 'casa_dee', text: '¡Y todo el mundo en el bar dice que fue un **ZOROARK**! ¡Que se hacen pasar por gente! ¡Yo lo creo! ¡Bueno, lo creo cuando estoy en el bar!' },
			{ set: { 'flag.b07_viajero_hincha': true } },
			{ call: 'b07_casa_testigos_check' },
		],
		b07_testigo_hincha_otra: [
			{ say: 'casa_dee', text: '¡YELL! —Te ve y baja la voz a la mitad, que sigue siendo mucho—. ¿Ya saben quién fue? ¡Si es un Zoroark, quiero verlo! ¡Si es una persona, también! ¡Pero menos!', cond: '!' + HECHO },
		],
		// ----- Tu Zorua (si lo llevas): se descarta con fechas -----
		b07_casa_zorua: [
			{ text: 'Una vecina con un mandil y los brazos cruzados mira a tu Zorua como si le debiera dinero.' },
			{ text: '«Un Zorua. Lo que faltaba. Los Zorua se hacen pasar por gente, ¿no? Como los Zoroark. —Te señala con la barbilla—. Esa noche había una de más en la Casa. Y ahora llega usted con uno de esos. A mí no me hace falta ser perito».' },
			{ say: Q, text: 'Señora, con permiso. Los perros que muerden no ladran, y los Zorua que roban no se pasean por la plaza. {jugador}, enséñale tu pase de la Gira.', cond: 'flag.b07_casa_intro' },
			{ text: 'Sacas el pase de la Gira. Tiene el sello granate de Odile, de la recepción de Par, con la **fecha de tu llegada a Galar**: casi tres semanas después de la noche de la llave. Tu Zorua estaba entonces en otra región, contigo.' },
			{ text: 'La vecina mira el sello. Mira a tu Zorua. Tu Zorua se convierte, muy despacio, en una copia exacta de ella, con mandil y todo, y se cruza de brazos igual. La vecina se va sin decir nada. Desde la puerta del bar se oye una carcajada.' },
			{ set: { 'flag.b07_casa_zorua': true } },
		],
		b07_casa_zorua_otra: [
			{ text: 'La vecina del mandil ya no mira mal a tu Zorua. Ahora le deja un trozo de pan en el alféizar. Dice que es «por si acaso».' },
		],

		// =================== MAREN (escena 1: el puesto de setas) ===================
		b07_maren_1: [
			{ if: 'flag.b07_maren_1', then: [{ end: true }] },
			{ text: 'Un puesto pequeño junto a la única farola de la plaza que no tiene seta encima: una mesa de tablas, una balanza de platos y cestas de mimbre llenas de setas, separadas por un cartel: «SE COMEN» / «NO SE COMEN · BRILLAN».' },
			{ text: 'Detrás, una mujer de unos treinta años, con una trenza castaña, pecas y las uñas negras de tierra. Lleva un **gorro de lana** gris con setas bordadas en rojo; una de ellas tiene el sombrero **torcido**, como si se le hubiera escapado la aguja. Cuando da un paso, sus botas suenan en los adoquines: *clac*. Llevan **clavos**.' },
			{ say: 'maren', text: 'Setas. Del bosque. —Pesa un puñado sin mirarte—. Las que brillan no se comen.' },
			{ choice: [
				{ text: '«¿Cuáles me recomiendas?»', then: [
					{ say: 'maren', text: 'Las feas. —Señala una cesta de setas marrones y arrugadas—. Las bonitas son para mirar. Las feas son para la sopa.' },
				] },
				{ text: '«Bonito gorro.»', then: [
					{ say: 'maren', text: '—Se lo toca. Sin querer, toca la seta torcida—. Lo hice yo. De pequeña. Lo he ido agrandando.' },
				] },
				{ text: '«¿Llevas clavos en las botas?»', then: [
					{ say: 'maren', text: 'Para el musgo. —Mira tus zapatillas—. Con esas, en el bosque, te caes.' },
				] },
			] },
			{ text: 'Te pone en la mano una seta pequeña que brilla en azul, envuelta en una hoja.' },
			{ say: 'maren', text: 'Para el bosque. Alumbra un rato. Gratis. La primera.' },
			{ give: 'setaluminosa' },
			{ set: { 'flag.b07_maren_1': true } },
			{ intel: { npc: 'maren', text: 'Recolectora de setas de Plié. Vende en la plaza, junto a la única farola sin seta. Habla poco. Gorro de lana gris con setas bordadas (una, con el sombrero torcido) y botas con clavos «para el musgo».' } },
			{ call: 'b07_casa_check' },
		],
		b07_maren_puesto: [
			{ text: 'Maren pesa setas en su balanza de platos. Te mira, asiente una vez y sigue pesando.', cond: '!' + HECHO },
			{ say: 'maren', text: 'Dicen que vas a la Casa. —Pausa—. Que alumbre la seta.', cond: INVESTIGANDO },
			{ say: 'maren', text: 'Hoy hay de las feas. —Te guarda un puñado en una hoja sin que lo pidas—. Para la sopa.', cond: HECHO + ' && (' + DEVUELVE + ' || ' + LECTURA + ')' },
			{ shop: 'puesto_maren' },
		],
		b07_maren_puesto_cerrado: [
			{ text: 'El puesto de setas está tapado con una lona. Encima, una piedra y una nota con letra de imprenta: «Cerrado. Citación en el juzgado de Artejo. Vuelvo cuando vuelva». Junto a la farola sin seta, una cesta de setas feas, para quien las quiera. Gratis.' },
		],
		b07_maren_puesto_vacio: [
			{ text: 'El puesto de setas está vacío: ni balanza, ni cestas, ni cartel. Solo la mesa de tablas, junto a la farola sin seta. Encima, alguien ha dejado una seta pequeña de sombrero torcido. No brilla. Es de las que se comen.' },
		],

		// =================== EL BOSQUE (Maren, escena 2) ===================
		b07_maren_bosque: [
			{ if: 'flag.b07_maren_bosque', then: [{ end: true }] },
			{ set: { 'flag.b07_maren_bosque': true } },
			{ text: 'En el tramo más oscuro, la seta que te dio Maren se apaga de golpe. Te quedas a ciegas, con un pie en una piedra y el otro en el musgo, que resbala.' },
			{ text: '*Clac. Clac.* Unas botas con clavos sobre las piedras planas. Una luz de farol, pequeña, amarilla, que se acerca sin prisa entre los helechos.' },
			{ say: 'maren', text: 'Se ha apagado la seta. Pasa. Duran poco. —Levanta el farol—. Por las piedras. Una cada paso. No pises el musgo.' },
			{ text: 'Maren va delante, de piedra en piedra, sin mirar dónde pisa. Se las sabe. Tú vas detrás. {riolu} salta de piedra en piedra con mucha dignidad y no se cae ni una vez.', cond: LUC },
			{ text: 'Maren va delante, de piedra en piedra, sin mirar dónde pisa. Se las sabe. Tú vas detrás y te resbalas dos veces.', cond: '!(' + LUC + ')' },
			{ choice: [
				{ text: '«¿Quién puso estas piedras?»', then: [
					{ say: 'maren', text: 'Alguien que tenía nietos. —Salta otra—. Hace mucho.' },
				] },
				{ text: '«¿Tú has entrado alguna vez en la Casa?»', then: [
					{ say: 'maren', text: 'De niña. —Salta otra. No se gira—. Antes no se cobraba entrada.' },
				] },
				{ text: 'Seguirla en silencio', then: [
					{ text: 'Caminan un rato sin hablar. Solo se oyen las botas: *clac, clac*. Y el bosque, que siempre suena como si alguien estuviera a punto de decir algo.' },
				] },
			] },
			{ text: 'Donde los helechos se abren y se ven las siete puertas, Maren se para en seco. Como si hubiera una raya en el suelo que solo ve ella.' },
			{ say: 'maren', text: 'Hasta aquí. A la Casa no entro. —Te da el farol un momento para encender otra seta, te la pone en la mano y recupera el farol—. La Tercera tiene un escalón. —Pausa—. Eso lo dice todo el mundo.' },
			{ text: 'Se da la vuelta y se va por las piedras, sin farol, a oscuras. El *clac, clac* de sus botas tarda mucho en dejar de oírse.' },
			{ say: 'rotom', text: 'Bzzt… Se ha ido sin luz. Por las piedras. A oscuras. —Pausa—. Yo no podría. Y eso que soy una linterna.', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Se fue a oscuras. Sin mirar. Se sabe las piedras.', cond: PURGADO },
		],

		// =================== LA CASA: OTTILIE (escena 2: la Casa por dentro) ===================
		b07_casa_visita: [
			{ if: 'flag.b07_ottilie_casa', then: [{ end: true }] },
			{ set: { 'flag.b07_ottilie_casa': true } },
			{ text: 'Delante de la Puerta Primera, la roja, Ottilie los espera con el farolillo encendido. Esta vez sí. Quintana llega detrás de ti con Lupa en el hombro, sacudiéndose esporas de la gabardina.' },
			{ say: 'ottilie', text: '¡Bienvenidos a la Casa de las Siete Puertas! —Lo dice con voz de cuento, de las de antes, y luego se le va—. Perdón. La costumbre. Diez años diciéndolo cada noche.' },
			{ say: 'ottilie', text: 'Se entra por la Primera. Se firma. Se pone uno la capa. Luego la Segunda, del Bosque; la Tercera, de la Escalera; la Cuarta, de las Preguntas; la Quinta, del Eco; la Sexta, de la Oscuridad. Y al final la Séptima, del Final, donde me siento en el sillón de Edmund y leo el último trozo.' },
			{ say: Q, text: '¿Y la Sexta? Por fuera, la puerta gris. La del jardín.' },
			{ say: 'ottilie', text: '¿La Sexta del Jardín? Esa no se usa. Nunca. Desde que compré la Casa. Tiene hiedra encima y yo ni tengo llave. Edmund la hizo para que el cuento tuviera «una puerta que nadie abre». Así me lo dijeron.' },
			{ text: 'Ottilie busca algo en el bolsillo de la capa. Saca un sobre arrugado y se lo da a Quintana, que lo lee y te lo pasa.' },
			{ say: 'ottilie', text: 'Y esto, para que el señor Quintana deje de mirarme así. Sí, me lo ha notado. —Se le pone la voz pequeña—. Un señor de Artejo quería comprarme el sillón de Edmund. «Con su contenido». Trescientos mil. Este mes. Iba a venderlo para salvar la Casa. Sin la llave, la Séptima no se abre y no hay venta.' },
			{ give: 'cartacoleccionista' },
			{ read: 'cartacoleccionista' },
			{ say: Q, text: 'Trescientos mil por el sillón. Cuarenta mil por la llave, en la póliza. —Hace la cuenta con el lápiz en el aire—. Robarse a sí misma le cuesta siete veces lo que paga el seguro. A ver, a ver. Lo apunto. Y lo tacho.' },
			{ say: 'ottilie', text: '«Con su contenido». Nunca supe qué quería decir. El sillón es un sillón. Tiene un cojín y un olor a pipa. —Abre la Primera con una llave pequeña—. Pasen. Miren lo que quieran. Yo les espero aquí. Dentro ya no sé contar el cuento sin final.' },
			{ intel: { npc: 'ottilie', text: 'Iba a vender el sillón de Edmund «con su contenido» a un coleccionista de Artejo por 300 000 ₽ para salvar la Casa. Sin la llave, no hay venta. La llave está asegurada en 40 000 ₽: robarla no le sale a cuenta.' } },
		],
		b07_ottilie_casa_charla: [
			{ text: 'Ottilie espera delante de la Primera con el farolillo encendido. Se ha sentado en el escalón de la entrada, con la capa recogida en las rodillas.' },
			{ say: 'ottilie', text: 'Diez años contando el cuento y nunca me senté en este escalón. Desde aquí se ven las siete puertas a la vez. Edmund lo sabría. Él lo sabía todo de esta casa.' },
		],
		b07_casa_fachada: [
			{ text: 'Siete puertas en fila, cada una con su nombre tallado encima: **Primera, de la Entrada** (roja). **Segunda, del Bosque** (verde). **Tercera, de la Escalera** (amarilla). **Cuarta, de las Preguntas** (azul). **Quinta, del Eco** (blanca). **Sexta, del Jardín** (gris, con hiedra; esa da a la parte de atrás). **Séptima, del Final** (negra, sin pomo).' },
			{ text: 'En la Primera hay un cartel con una chincheta: «CERRADO HASTA NUEVO AVISO. Disculpen. — O. B.». Las demás puertas no tienen pomo por fuera. Solo la Primera.', cond: '!' + CASA_ABIERTA },
			{ text: 'Por fuera solo la Primera tiene pomo. Las otras se abren desde dentro, una tras otra, como las páginas de un libro. Menos la Sexta, que da al jardín.', cond: CASA_ABIERTA },
		],

		// =================== LA CASA POR DENTRO ===================
		// Cierre común: comprueba si ya está todo (b07_casa_dentro) y si se puede acusar
		b07_casa_check: [
			{ if: '!flag.b07_casa_dentro && ' + SALAS, then: [
				{ set: { 'flag.b07_casa_dentro': true } },
				{ say: Q, text: 'Ya está. La Casa entera, puerta a puerta. —Cierra la libreta con un dedo dentro—. Ahora sé cómo entró la octava, y por dónde salió. Me falta quién. Y tú lo tienes más cerca que yo.' },
			] },
			{ if: 'flag.b07_casa_dentro && !flag.b07_sally_libro && !flag.b07_casa_pista_sally', then: [
				{ set: { 'flag.b07_casa_pista_sally': true } },
				{ say: Q, text: 'Una cosa. Edmund escribía cuentos. Si alguien en este pueblo guarda sus libros, es la líder del estadio, Sally. Dicen que los ordena por colores. Pregúntale por el escalón. A ver qué dice un libro de eso.' },
			] },
			{ if: 'flag.b07_casa_dentro && flag.b07_sally_libro && flag.b07_maren_1 && ' + CASA, then: [
				{ quest: 'b07_s_casa', stage: 'acusar' },
				{ say: Q, text: 'Lo tenemos todo. Bueno: tienes todo. Yo estaré en la posada, en la mesa del rincón, con la libreta y dos tazas. Cuando lo veas claro, vienes y me dices un nombre. Y una prueba. Sin prueba, no hay nombre.' },
				{ say: 'rotom', text: '¡Bzzt! A la posada, con Quintana. Llevo toda la libreta en la memoria. Bueno, en la memoria que me queda. Que es mucha.', cond: '!' + PURGADO },
				{ say: 'rotom', text: 'Bzzt. A la posada. Quintana espera. Lo tenemos.', cond: PURGADO },
			] },
		],
		b07_casa_banco: [
			{ text: 'Un banco largo de madera, pegado a la pared del fondo, en la parte que menos alumbra el farol de la entrada. Encima, tallado: «Siéntate. Lo que viene, viene».' },
			{ text: 'Te sientas. Desde aquí, la puerta de la entrada queda en el lado bueno de la luz y tú, en el malo. Si alguien entrara ahora, te vería tarde. Y te tomaría por parte del decorado.' },
			{ text: 'En la madera del banco, en el rincón más oscuro, hay **pelusa de lana gris**, enganchada en una astilla. Y un poco de **polvo que brilla** cuando le pasas la mano por encima.' },
			{ say: Q, text: 'Lana. Las capas de la casa son de fieltro. —Lupa baja de su hombro y mira la astilla, muy de cerca—. Y brillo del bosque. Apunta las dos. Una de ellas nos va a mentir.' },
			{ text: '{riolu} huele la pelusa de lana. Se queda quieto un momento, con las orejas tiesas. Luego mira hacia la pared del fondo, como si detrás hubiera algo.', cond: LUC },
			{ set: { 'flag.b07_casa_sala1': true } },
			{ call: 'b07_casa_check' },
		],
		b07_casa_registro: [
			{ read: { title: 'Libro de registro · Casa de las Siete Puertas', text: '*(Un libro grande, de tapas de cuero, con la pluma atada al atril con un cordel. Cada noche, una página. Esta es la de la noche de la niebla.)*\n\n**Visita de noche · Grupo de las 21:00**\n\n1. Lark Abbot y Robin Abbot *(en la misma línea, con dos letras distintas y un corazón)*\n2. Pip *(con un dibujo de un Wooloo)*\n3. Hester Pennick\n4. Fen Arlow\n5. Clive Moss *(«fotógrafo», entre paréntesis)*\n6. Dee *(sin apellido; «¡YELL!» al lado)*\n\n*Anfitriona:* O. Brack\n\n*Capas entregadas:* 7.\n\n*(Debajo, a lápiz, otra letra, más reciente:)* Siete firmas. Ocho personas. — M. Q.' } },
			{ say: Q, text: 'Siete nombres en seis líneas, porque los Abbot firman juntos. Siete capas. Nadie firmó de más y nadie firmó de menos. Así que la octava no firmó. Y nadie le dio capa.' },
		],
		b07_casa_perchero: [
			{ text: 'Un perchero de hierro forjado con siete ganchos con forma de hoja. Colgadas, siete capas grises de fieltro, idénticas, con capucha. Están secas y huelen a armario.' },
			{ say: 'ottilie', as: 'Ottilie (desde la puerta)', text: '¡A la mañana siguiente estaban las siete! Colgadas, secas, como siempre. Las cuento cada noche. Siete. Ni una más. Ni una menos. Pican mucho, eso sí. Edmund las compró baratas.' },
		],
		b07_casa_sala2: [
			{ text: 'La Sala Segunda, del Bosque: paredes forradas de ramas de verdad, secas, que se te enganchan en la ropa. El pasillo es estrecho; aquí el grupo tiene que ir en fila y pegado. Si alguien pisa a alguien, es aquí.' },
			{ say: Q, text: 'Aquí la chica del Team Yell dice que la pisaron. Con una bota dura. —Mira el suelo de tablas—. Las botas duras suenan. Las ramas no dejan oír nada. Edmund sabía montar una sala.' },
		],
		b07_casa_sala3: [
			{ text: 'La Sala Tercera, de la Escalera: tres escalones de madera que suben y tres que bajan, sin motivo, como un puente sobre nada. El segundo de bajada tiene una marca de pintura amarilla gastada.' },
			{ text: 'Lo pisas. **Cruje.** Un crujido largo, de madera vieja, que suena por toda la casa.' },
			{ say: 'ottilie', as: 'Ottilie (desde la entrada, a lo lejos)', text: '¡Cuidado con el escalón! —Su voz llega amortiguada desde la Primera—. ¡Perdón! ¡La costumbre! Siempre lo digo cuando cruje. Es parte del cuento: primero cruje, luego aviso. Así se ríen.' },
			{ say: Q, text: 'Primero cruje, luego avisa. Siempre en ese orden. —Apunta—. Esa noche, alguien avisó antes de que crujiera. Alguien que sabía qué escalón era sin pisarlo.' },
			{ text: '{riolu} baja los tres escalones saltándose el segundo, sin que nadie se lo diga. Luego te mira, muy satisfecho.', cond: LUC },
			{ set: { 'flag.b07_casa_sala3': true } },
			{ call: 'b07_casa_check' },
		],
		b07_casa_sala4: [
			{ text: 'La Sala Cuarta, de las Preguntas: un espejo grande con marco dorado y, encima, una adivinanza pintada con letra de cuento:' },
			{ text: '«*Tengo siete puertas y una sola llave. Quien entra por la primera no sale por la misma. ¿Qué soy?*»' },
			{ say: Q, text: 'Un cuento. O una casa. O un caso. —Se mira en el espejo y se sube las gafas—. Las tres valen. Edmund era un tramposo con cariño.' },
		],
		b07_casa_sala5: [
			{ text: 'La Sala Quinta, del Eco: un pasillo largo, con el techo curvo, que repite lo que dices un segundo después. Dices «hola». El pasillo dice «hola», más bajito, como si no estuviera seguro.' },
			{ text: 'Rotom dice «bzzt». El pasillo dice «bzzt». Rotom se ofende. El pasillo también.', cond: '!' + PURGADO },
			{ say: Q, text: 'Aquí cualquiera puede decir cualquier cosa y parece que lo dice otro. Lo apunto como sitio donde no creer a nadie. Ni a mí.' },
		],
		b07_casa_sala6: [
			{ text: 'La Sala Sexta, de la Oscuridad: vacía, cuadrada, con un farol en cada esquina. Al fondo, una **puerta gris**, sin pomo por dentro, con un cerrojo de madera: la Sexta del Jardín, la que nadie usa.' },
			{ say: Q, text: 'Vamos a hacerlo como esa noche. Ottilie apaga los faroles sesenta segundos. Yo cuento. Tú miras. A oscuras también se mira.' },
			{ cutscene: { bg: { type: 'indoor', wall: '#2a3a3a', floor: '#2a221e' }, time: 'noche', start: 'light', cam: 'still', frames: [
				{ actors: [{ id: 'ottilie', at: 'left', enter: 'left' }, { id: Q, at: 'right', enter: 'right', dim: true }], text: 'Ottilie, en la puerta de la Sexta, levanta el farolillo. «La Oscuridad», dice, con su voz de cuento. Y sopla.' },
				{ fx: 'dark', cam: 'still', text: 'Negro. Un negro de bosque cerrado. Quintana, muy bajo: «Uno. Dos. Tres…».' },
				{ fx: 'sparkle', on: false, cam: 'push', text: 'En el suelo, una línea de puntitos azules se enciende en la oscuridad: **polvo que brilla**. Va desde el centro de la sala hasta la puerta gris del fondo. Como pasos.' },
				{ cond: LUC, mon: '{riolu}', on: '_c', fx: 'glow', text: 'El aura de {riolu} se enciende sola, tenue. {riolu} mira hacia la puerta gris. Luego hacia ti. Alguien cruzó esta sala a oscuras sin tropezar.' },
				{ fx: 'light', clear: true, cam: 'pull', text: '«…cincuenta y nueve. Sesenta». Los faroles vuelven. La línea azul se apaga a la vista, pero sigue ahí. Quintana se agacha y la toca con el dedo.' },
			] } },
			{ say: Q, text: 'Esporas de Shiinotic. Del bosque. Desde el centro hasta la puerta del jardín. —Se mira el dedo, que brilla—. Sesenta segundos dan para cruzar esta sala tres veces. Si te la sabes.' },
			{ say: 'ottilie', text: 'Pero esa puerta no se usa. Tiene hiedra por fuera. Y el cerrojo de madera solo se corre por dentro…' },
			{ say: Q, text: 'Por dentro se corre. Por fuera tendrá otra cosa. Vamos al jardín.' },
			{ set: { 'flag.b07_casa_sala6': true } },
			{ call: 'b07_casa_check' },
		],
		// ----- El jardín: la Puerta Sexta y el rastreo -----
		b07_casa_pestillo: [
			{ text: 'La Puerta Sexta, por fuera: gris, con la pintura desconchada y una cortina de hiedra encima. Pero la hiedra está **arrancada a la altura de una mano**, como si alguien hubiera metido el brazo muchas veces. Debajo, un **pestillo de hierro** de los antiguos.' },
			{ text: 'Lo mueves. Corre suave, sin un ruido. Está **recién engrasado**: te deja los dedos negros y olor a aceite de lámpara.' },
			{ say: Q, text: 'Una puerta que no se usa nunca, con el pestillo engrasado. —Lupa se posa en el marco y mira el pestillo con la cabeza del revés—. Alguien la preparó antes. Eso no es pánico, es costumbre. Y alguien sabía que el pestillo de fuera abre el cerrojo de dentro.' },
			{ text: 'Al pie de la puerta, bajo la hiedra, el barro está revuelto. Hay marcas, pero se pisan unas a otras. Así no se leen.' },
			{ set: { 'flag.b07_casa_pestillo': true } },
			{ call: 'b07_casa_check' },
		],
		b07_casa_rastreo: [
			{ if: 'flag.b07_casa_huellas', then: [{ end: true }] },
			{ text: '{riolu} se agacha junto al barro, cierra los ojos y apoya una pata en el suelo. El aura le sale de la pata como agua de un vaso. Hay algo que se le escapa: unas pisadas que van y vienen, y algo pequeño de hierro que se quedó atrás.' },
			{ minigame: { type: 'aura', id: 'b07_jardin_huellas', title: 'El barro del jardín', theme: 'campo', level: 2,
				hint: '{riolu} nota pisadas que entran y salen por la Sexta. Y algo pequeño de hierro, hundido en el barro.',
				guaranteed: ['clavobota'], loot: [{ id: 'tinymushroom', w: 6 }, { id: 'setaluminosa', w: 4 }, { id: 'bigmushroom', w: 3 }, { id: 'balmmushroom', w: 1, rare: true }], picks: 2, consolation: 'tinymushroom', lootTitle: 'Lo que había en el barro' },
				onWin: [
					{ text: 'Donde {riolu} se para, el barro guarda una fila de **huellas de bota claveteada**: puntitos de clavos alrededor de una suela de adulto, ni grande ni pequeña. Entran por la Sexta y salen por la Sexta. Pasos largos, firmes. Sin marca de bastón al lado.' },
					{ text: 'Y en la huella del tacón izquierdo, hundido, un **clavo de bota**, torcido. A ese tacón le falta uno.' },
					{ say: Q, text: 'Una ilusión no pisa barro. No engrasa pestillos. No pierde clavos. —Coloca palitos alrededor de cada huella, como si fueran a escaparse—. El Zoroark del bar, fuera. Ahora: ¿quién lleva clavos en las botas, en un pueblo donde el musgo resbala?' },
					{ set: { 'flag.b07_casa_huellas': true } },
					{ happy: { who: 'riolu', n: 5 } },
					{ call: 'b07_casa_check' },
				],
				onLose: [
					{ text: 'El barro se revuelve más de lo que estaba. {riolu} sacude la pata, frustrado. Las pisadas siguen ahí, debajo. Hay que esperar a que se asiente y volver a mirar.' },
				],
				onQuit: [{ text: 'Dejas el barro como estaba. {riolu} se queda mirándolo un rato antes de seguirte.' }] },
		],
		b07_casa_sin_aura: [
			{ text: 'El barro bajo la hiedra está revuelto: marcas que se pisan unas a otras, hojas, agua. Hay algo ahí, seguro. Pero a simple vista no se lee.' },
			{ say: Q, text: 'Yo no veo nada. Lupa tampoco, y eso es raro. —Te mira—. {riolu}, el del aura. Con {riolu}, esto se leería como un periódico. Tráelo en el equipo y volvemos.' },
		],
		b07_casa_huellas_otra: [
			{ text: 'Las huellas de bota claveteada siguen en el barro, rodeadas de los palitos de Quintana. Entran por la Sexta y salen por la Sexta. En la del tacón izquierdo, el hueco del clavo que falta.' },
		],
		// ----- La Séptima: el mecanismo y el sillón -----
		b07_casa_mecanismo: [
			{ if: 'flag.b07_casa_septima_abierta', then: [{ end: true }] },
			{ text: 'La Séptima Puerta no tiene pomo ni cerradura a la vista. A la altura del pecho, una rejilla de latón con dos pesas que se deslizan por raíles y dos huecos con forma de hoja. Abajo, grabado: «*Quien no tenga llave, que tenga paciencia*».' },
			{ say: 'ottilie', as: 'Ottilie (desde la entrada)', text: '¿El juego de la puerta? ¡Eso es de adorno! Edmund lo puso para los niños. Nunca he visto que abra nada.' },
			{ say: Q, text: 'Los adornos de un cuentacuentos nunca son adorno. Prueba.' },
			{ puzzle: { id: 'b07_septima', title: 'El mecanismo de la Séptima', hint: 'Una pesa en cada hoja corre el cerrojo. Las pesas se empujan; nunca se arrastran.', theme: 'ruina',
				grid: [
					'#######',
					'#P....#',
					'#.R.R.#',
					'#.....#',
					'#S#.#S#',
					'#..D..#',
					'###G###',
				] },
				onSolve: [
					{ text: 'La segunda pesa encaja en su hoja. Dentro de la puerta, algo de madera se desliza con un *toc* hondo, como un libro que se cierra. La Séptima se abre sola, hacia dentro, sin llave.' },
					{ say: 'ottilie', as: 'Ottilie (desde la entrada)', text: '¿Se ha abierto? ¿SIN LLAVE? ¡Diez años! ¡Diez años con la llave en el cinturón y se abría sola!' },
					{ say: Q, text: '«Quien no tenga llave, que tenga paciencia». —Se sube las gafas—. Entonces la llave no hacía falta para la puerta. Hacía falta para otra cosa.' },
					{ set: { 'flag.b07_casa_septima_abierta': true } },
				],
				onQuit: [{ text: 'Dejas las pesas donde están. La rejilla espera. Paciencia, pone.' }] },
		],
		b07_casa_sillon: [
			{ if: 'flag.b07_casa_doble_fondo', then: [{ end: true }] },
			{ text: 'La última sala: pequeña, con una ventana redonda llena de bosque, una alfombra gastada y el **sillón de Edmund**, orejero, de terciopelo verde, con la marca de dos codos en los brazos. Huele a pipa vieja. Ottilie se queda en la puerta. No entra.' },
			{ text: 'Quintana levanta el cojín. Debajo, el asiento no es de muelles: es una tapa de madera con una **cerradura pequeña de latón**. La tapa está suelta. La levantas.' },
			{ cutscene: { bg: { type: 'indoor', wall: '#1e1e26', floor: '#2a221e' }, time: 'noche', start: 'fade', cam: 'still', frames: [
				{ actors: [{ id: Q, at: 'right', enter: 'none', dim: true }], cam: 'push', text: 'Un **doble fondo**, forrado de terciopelo verde. Del tamaño justo para un cuaderno. Abierto.' },
				{ fx: 'letter', cam: 'still', text: 'Vacío. Solo una **cinta de raso** azul, de las de atar papeles, y un olor a papel viejo que se va en cuanto entra el aire.' },
				{ actors: [{ key: Q, dim: false, do: 'nod' }], say: Q, text: 'La llave de la Séptima abre esta cerradura. Es del mismo latón. —Pasa el dedo por el borde—. No se llevaron la llave para abrir la puerta. Se la llevaron para abrir el sillón.' },
				{ actors: [{ id: 'ottilie', at: 'left', enter: 'left' }], fx: 'heartbeat', text: '«Con su contenido», dice Ottilie, muy bajo, desde la puerta. «Ese señor sabía que había algo. Yo no».' },
			] } },
			{ say: Q, text: 'Alguien sabía que el sillón tenía un fondo. Que la llave lo abría. Que la Sexta se abría por fuera. Y qué escalón cruje. —Cierra la tapa con cuidado—. Esto no lo sabe un turista. Esto lo sabe alguien que creció aquí.' },
			{ set: { 'flag.b07_casa_doble_fondo': true } },
			{ diary: 'Hoy abrimos la Séptima sin llave. Tenía un truco. Era de niños.\n\nDentro había un sillón. Dentro del sillón había un sitio. Para un cuaderno. Vacio. Una cinta azul.\n\nLa llave abría dos cosas. Alguien lo sabía.', cond: D_PURGADO },
			{ diary: 'Hoy recorrimos la Casa de las Siete Puertas por dentro, con Quintana. En la Sexta, las esporas del bosque marcan el camino hasta la puerta del jardín; por fuera, su pestillo estaba recién engrasado. La Séptima se abrió sin llave, con un mecanismo de pesas de Edmund.\n\nEl sillón de Edmund tiene un doble fondo con una cerradura del mismo latón que la llave. Estaba vacío: solo quedaba una cinta de raso.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy entramos en la Casa de las Siete Puertas! Cada sala es una prueba de un cuento: un escalón que cruje, un espejo con una adivinanza, un pasillo que repite lo que dices. ¡Y abrimos la última puerta con un juego de pesas! Dentro había un sillón muy viejo que olía a pipa.', cond: D_DOBLE },
			{ call: 'b07_casa_check' },
		],
		b07_casa_sillon_otra: [
			{ text: 'El sillón de Edmund, con el cojín en su sitio. Si no supieras lo del doble fondo, no lo sabrías. Ese era el truco.', cond: '!' + HECHO },
			{ text: 'El sillón de Edmund, con una banqueta baja al lado. En el doble fondo, cerrado con su llave, hay un cuaderno nuevo con hojas en blanco: «Para la Noche del Final». Ottilie dice que el primero lo leyó Maren. El segundo, dice, lo escribirá quien se atreva.', cond: HECHO + ' && ' + LECTURA },
			{ text: 'El sillón de Edmund. El doble fondo está cerrado con su llave. Ottilie no lo abre nunca. Dice que lo que había dentro ya está donde tenía que estar.', cond: HECHO + ' && ' + DEVUELVE },
			{ text: 'El sillón de Edmund. El doble fondo está vacío y abierto, para que se vea que está vacío. Una cartela al lado: «Aquí hubo un cuento. Hoy está en el juzgado de Artejo».', cond: HECHO + ' && ' + QUINT },
			{ text: 'El sillón de Edmund. El doble fondo está vacío, con la cinta de raso azul dentro. Nadie la ha quitado.', cond: HECHO + ' && ' + FALLIDO },
		],

		// =================== SALLY ===================
		b07_sally: [
			{ if: 'flag.b07_sally', then: [{ end: true }] },
			{ set: { 'flag.b07_sally': true } },
			{ text: 'En el palco del estadio vacío, una señora muy mayor con un sombrero morado, guantes de encaje y una taza de té en la mano lee un libro con una lupa. No levanta la vista.' },
			{ say: 'sally', text: 'Usted no es de aquí. Lo sé porque ha mirado las setas del césped. Los de aquí ya no las miran. —Pasa una página—. Pregunta: ¿qué es más rosa, un Slowpoke o un atardecer?' },
			{ choice: [
				{ text: '«Un Slowpoke.»', then: [
					{ say: 'sally', text: 'Mal. Es un atardecer. Bueno, depende del Slowpoke. Bueno, en Galar no: aquí tienen la cabeza amarilla. —Por fin te mira—. Ha contestado rápido. Eso me gusta. Equivocarse rápido es un arte.' },
				] },
				{ text: '«Un atardecer.»', then: [
					{ say: 'sally', text: 'Mal. Es un Slowpoke. Un atardecer dura poco; un Slowpoke es rosa todo el día. —Por fin te mira—. Lo ha pensado. Eso me gusta menos. Pero lo respeto.' },
				] },
				{ text: '«Usted.»', then: [
					{ say: 'sally', text: '—Deja la taza—. Oh. Qué descaro tan bien vestido. Correcto. No lo era, pero ahora sí.' },
				] },
			] },
			{ say: 'sally', text: 'Sally. Líder de Plié. El gimnasio está cerrado por la temporada. La líder, no. La líder está aquí, tomando té y esperando a que alguien la entretenga.' },
			{ if: 'flag.b07_casa_intro', then: [
				{ say: 'sally', text: '¿Viene por la Casa? Claro que viene por la Casa. Todo el mundo viene por la Casa. —Suspira—. Edmund Vane era amigo mío. Me escribía los cuentos con faltas de ortografía a propósito, para que los niños las encontraran. Yo las encontraba antes que los niños. Se enfadaba.' },
				{ say: 'sally', text: 'Tengo todos sus libros. Ahí, en la estantería, entre los rosas y los morados. No se los presto a nadie que no sepa por qué los quiere. Cuando sepa qué busca, vuelva. Y tráigame una pregunta mejor que la mía.' },
			] },
			{ say: 'sally', text: 'Y si quiere combatir, combatimos. Con preguntas. Es la única forma de combatir que me sigue divirtiendo a mi edad. No me pregunte mi edad.' },
			{ intel: { npc: 'sally', text: 'Líder de Plié (Hada); su gimnasio está cerrado esta temporada. Excéntrica, de usted, pregunta cosas raras. Era amiga de Edmund Vane y guarda todos sus libros, ordenados por colores.' } },
		],
		b07_sally_charla: [
			{ text: 'Sally lee en el palco, con la lupa y la taza. Sin mirarte, levanta un dedo enguantado: espera a terminar la frase.' },
			{ say: 'sally', text: 'Pregunta: si una casa tiene siete puertas y una no se usa nunca, ¿cuántas puertas tiene? —Pasa página—. No me conteste. Era retórica. Las mejores preguntas son las que no se contestan en voz alta.', cond: INVESTIGANDO + ' || ' + TESTIGOS },
			{ say: 'sally', text: 'Pregunta: ¿por qué los Mawile sonríen con la boca de atrás? Respuesta: porque la de delante está ocupada. —Te mira por encima de la lupa—. Ese chiste tiene ochenta años. Como yo. No, como yo no.', cond: '!(' + INVESTIGANDO + ' || ' + TESTIGOS + ')' },
		],
		b07_sally_estanteria: [
			{ text: 'La estantería de Sally: libros del rosa más pálido al morado más oscuro, sin un hueco. En la balda de los malvas, una fila de lomos iguales, de tela gastada, con letras doradas: «E. VANE».' },
			{ say: 'sally', text: 'Ah, ah. Esos, no. Primero dígame qué busca. —Pausa—. No me diga «una pista». Eso lo dicen todos.' },
		],
		b07_sally_libro: [
			{ if: 'flag.b07_sally_libro', then: [{ end: true }] },
			{ text: 'Le cuentas a Sally lo del escalón: el que cruje en la Tercera, el que Ottilie avisa siempre después, y la voz de mujer que esa noche avisó antes, bajito, como quien lo dice siempre.' },
			{ say: 'sally', text: '—Deja la taza. Muy despacio—. Ah. Eso sí es una pregunta.' },
			{ text: 'Sally se levanta, apoyada en un paraguas morado, va a la estantería sin mirar y saca de los malvas un libro pequeño de tela azul gastada: «*Cuentos para salir de casa*, por E. Vane». Lo abre por la primera página y te lo pone delante.' },
			{ read: { title: 'Cuentos para salir de casa · primera página', text: '*(Papel amarillento. Letra grande y redonda, a pluma, un poco temblona en las mayúsculas.)*\n\n**Para M.,**\n**que siempre se salta el escalón que cruje.**\n\n**— E.**\n\n*(Debajo, a pluma, un dibujito pequeño: una seta con el sombrero torcido, como si se le hubiera escapado la mano. Al lado, más pequeño todavía:)* *esta es la tuya*' } },
			{ say: 'sally', text: 'Edmund solo escribía dedicatorias a una persona. Nunca me dijo a quién. Me lo dijo una vez. No me acuerdo. Las dos cosas son verdad. —Cierra el libro—. La gente que se salta un escalón sin mirar es gente que bajó esa escalera muchas veces. De pequeña. Corriendo.' },
			{ say: 'sally', text: 'Pregunta, y esta sí me la contesta usted a usted: ¿a quién le dibujaría un cuentacuentos una seta en la primera página?' },
			{ set: { 'flag.b07_sally_libro': true } },
			{ intel: { npc: 'sally', text: 'Le enseñó la dedicatoria de «Cuentos para salir de casa» de Edmund Vane: «Para M., que siempre se salta el escalón que cruje. — E.», con el dibujo de una seta de sombrero torcido.' } },
			{ call: 'b07_casa_check' },
		],
		b07_sally_libro_otra: [
			{ text: 'El libro de tela azul está fuera de su sitio, encima de la mesa de té, abierto por la primera página. La seta del sombrero torcido sigue ahí, a pluma. Sally no lo ha vuelto a guardar.', cond: '!' + HECHO },
			{ text: 'El libro de tela azul está otra vez en la balda de los malvas, en su sitio. Entre sus páginas asoma una cinta de raso azul que antes no tenía.', cond: HECHO },
		],
		b07_sally_reto: [
			{ say: 'sally', text: '¿Combatir? Con mucho gusto. Pero primero, sus Pokémon, que no se combate con Pokémon cansados. Es de mal gusto. Y yo tengo muy buen gusto.' },
			{ prompt: '¿Curar al equipo antes del combate con Sally?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'Sally le da a cada uno de tus Pokémon un terrón de azúcar de un azucarero de plata. Se recuperan del todo. Uno pide otro. No se lo da.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'sally', text: 'Como quiera. La confianza es rosa. La temeridad, morada. Ya veremos de qué color es lo suyo.' }] },
			] },
			{ set: { 'vars.b07_sally_aciertos': 0 } },
			{ say: 'sally', text: 'Tres preguntas antes de empezar. Si acierta, me pongo contenta. Si me pongo contenta, combato mejor. Es una trampa, sí. —Sonríe—. Primera: ¿cuál es mi color favorito?' },
			{ choice: [
				{ text: '«El morado.»', then: [{ set: { 'vars.b07_sally_aciertos': '+1' } }, { say: 'sally', text: 'Correcto. Es obvio. Lo obvio también hay que decirlo, si no, se ofende.' }] },
				{ text: '«El rosa.»', then: [{ say: 'sally', text: 'Casi. El rosa es mi segundo color favorito. El segundo no cuenta. Pregúnteselo a cualquier subcampeón.' }] },
				{ text: '«El de las setas de noche.»', then: [{ say: 'sally', text: 'Qué bonito. Qué mal. Es el morado.' }] },
			] },
			{ say: 'sally', text: 'Segunda: ¿cuántos años tengo?' },
			{ choice: [
				{ text: '«Dieciséis.»', then: [{ set: { 'vars.b07_sally_aciertos': '+1' } }, { say: 'sally', text: '¡Exacto! —Se le encienden los ojos—. Por fin alguien con vista.' }] },
				{ text: '«Ochenta y ocho.»', then: [{ say: 'sally', text: '… Usted ha estado mirando mi ficha. Qué feo. Muy feo. Lo apunto.' }] },
				{ text: '«No se le pregunta eso a una señora.»', then: [{ say: 'sally', text: 'Se lo he preguntado yo, querid{o|a|e}. Pero lo acepto como evasiva. Es una evasiva elegante. Medio punto. No, no hay medios puntos.' }] },
			] },
			{ say: 'sally', text: 'Tercera, y la buena: ¿qué es lo más importante de un Pokémon de tipo Hada?' },
			{ choice: [
				{ text: '«Lo que no se ve.»', then: [{ set: { 'vars.b07_sally_aciertos': '+1' } }, { say: 'sally', text: 'Mmm. Sí. Las hadas son lo que no se ve a primera vista. Como las dedicatorias. Como las segundas puertas.' }] },
				{ text: '«El color.»', then: [{ say: 'sally', text: 'El color importa. Pero no es lo más. Un Mawile es gris y es un hada. Y muerde.' }] },
				{ text: '«La fuerza.»', then: [{ say: 'sally', text: 'La fuerza es de los dragones. Y los dragones nos tienen miedo. Eso sí es fuerza. Pero no era la respuesta.' }] },
			] },
			{ battle: 'sally_quiz', lose: 'continue',
				onWin: [
					{ say: 'sally', text: 'Ha acertado usted tres. Tres de tres. Hacía años. —Te da algo envuelto en papel de seda morado—. Para usted. No es una medalla. Es mejor: es mía.', cond: 'vars.b07_sally_aciertos >= 3' },
					{ give: 'pixieplate', cond: 'vars.b07_sally_aciertos >= 3' },
					{ say: 'sally', text: 'Ha ganado sin acertarlo todo. Eso es más difícil. Tome. Para que se acuerde de las que falló.', cond: 'vars.b07_sally_aciertos < 3' },
					{ give: 'fairyfeather', cond: 'vars.b07_sally_aciertos < 3' },
					{ say: 'sally', text: 'El gimnasio, otra temporada. Pero cuando vuelva, ya sé qué preguntarle. Y usted ya sabrá contestar. Esa es la parte triste.' },
				],
				onLose: [
					{ heal: 'Sally vuelve a pasar con el azucarero de plata. Tus Pokémon se recuperan del todo.' },
					{ say: 'sally', text: 'Vuelva cuando quiera. Le haré otras preguntas. O las mismas. A mi edad, son las mismas.' },
				] },
		],
		b07_sally_final: [
			{ text: 'Sally está en el palco con el libro de tela azul en el regazo, cerrado.' },
			{ say: 'sally', text: 'Ya me han contado. En Plié todo se cuenta. —Acaricia el lomo—. Edmund escribía con faltas a propósito. Y esconder un final dentro de un sillón es la falta más bonita que cometió nunca.', cond: LECTURA + ' || ' + DEVUELVE },
			{ say: 'sally', text: 'Ya me han contado. En Plié todo se cuenta. —Acaricia el lomo—. Los cuentos acaban en los juzgados más a menudo de lo que la gente cree. Y salen de ahí más a menudo todavía. Paciencia, pondría Edmund.', cond: QUINT },
			{ say: 'sally', text: 'Ya me han contado. La llave volvió sola, como en los cuentos. Lo demás se fue en el tren. —Acaricia el lomo—. Pregunta: ¿se puede perder un final que no era tuyo? No me conteste. Esa es para mí.', cond: FALLIDO },
		],

		// =================== LA ACUSACIÓN ===================
		b07_casa_acusar: [
			{ text: 'En la mesa del rincón de la posada, Quintana tiene la libreta abierta, dos tazas de té y Lupa dormida en el respaldo de la silla. Al verte, aparta una taza hacia ti.' },
			{ say: Q, text: 'Siéntate. Lo repasamos juntos. Tú registras, preguntas y apuntas. Cuando lo tengas, me dices un nombre. Y una prueba. Si me equivoco yo, te lo digo. Si te equivocas tú, también.', cond: '!flag.b07_casa_acusar_visto' },
			{ say: Q, text: 'Sigues. Bien. No hay prisa. Bueno, alguien la tiene. Pero no somos nosotros.', cond: 'flag.b07_casa_acusar_visto' },
			{ set: { 'flag.b07_casa_acusar_visto': true } },
			{ case: 'b07_casa',
				onSolve: [{ rep: { policia: 1 } }, { call: 'b07_casa_maren_final' }],
				onFail: [{ call: 'b07_casa_escapa' }] },
		],

		// =================== SI ACIERTAS: MAREN (escena 3) Y LA DECISIÓN ===================
		b07_casa_maren_final: [
			{ text: 'Al anochecer, en la plaza. Maren recoge el puesto: tapa las cestas, desmonta la balanza, dobla el cartel de «SE COMEN». Cuando los ve llegar, a Quintana y a ti, no se sorprende. Se sienta en el borde de la mesa y se quita el gorro.' },
			{ say: 'maren', text: 'La seta torcida. —La toca—. La bordé yo. Tenía nueve años. Mi abuelo la dibujó igual en el libro para que supiera que era para mí. Yo no sabía que alguien más lo había leído.' },
			{ say: 'maren', text: 'Maren Vane. Llevo el apellido de mi madre en los papeles. En el pueblo nadie se acuerda de que tuvo una hija. Yo me acuerdo de que tuvo un padre.' },
			{ cutscene: { bg: { type: 'town', roofs: ['#5a3a6a', '#7a4a7a'], far: '#2a3a3a', ground: '#3a4a2a', fog: true }, time: 'tarde', start: 'fade', cam: 'still', frames: [
				{ actors: [{ id: 'maren', at: 'left', enter: 'none' }], cam: 'push', item: 'cuentovane', text: 'De la cesta saca un cuaderno cosido con hilo, con tapas de cartón y una cinta de raso azul. Y debajo, grande, de latón, la **Llave de la Séptima**.' },
				{ actors: [{ key: 'maren', do: 'bow' }], fx: 'letter', text: '«El final de verdad es para ti», me dijo de pequeña. «La llave abre las dos cosas». Lo escribió solo para mí. Una historia de una niña que se salta un escalón.' },
				{ fx: 'heartbeat', cam: 'still', text: '«La señora Brack iba a vender el sillón con su contenido. A una vitrina de Artejo. No pensé. Entré por la Sexta, como de niña, y me senté en el banco a esperar».' },
				{ actors: [{ key: 'maren', dim: true }], cam: 'pull', text: '«Cuando se fue la luz, tomé la llave y abrí el sillón. Y luego no supe devolverla. Tres semanas sin saber. Tres semanas dejándola sin nada. A ella y a siete personas con miedo».' },
			] } },
			{ say: 'maren', text: 'No he vendido nada. No he abierto la Séptima. Solo me he leído el cuento cada noche. —Te mira por primera vez de frente—. Eso no me quita lo que hice. Ya lo sé. No vengo a que me digan que no pasa nada. Pasa.' },
			{ text: 'Detrás de ti, el *tic* de un farolillo que se enciende. Ottilie ha bajado a la plaza con la capa puesta. Ha oído lo último.' },
			{ say: 'ottilie', text: '… ¿La nieta de Edmund? —Se queda quieta con el farolillo en alto—. Te vi una vez. En la notaría. Con un gorro. No dijiste nada. Yo pensé que me odiabas por comprarte la casa.' },
			{ say: 'maren', text: 'No te odiaba. —Pausa—. Te odié tres semanas. Ahora ya no sé.' },
			{ say: Q, text: '—Bajito, solo para ti—. Esto ya no es mío, {jugador}. La llave es de la aseguradora, el sillón es de Ottilie y el cuento es de quien lo tenga en la mano. Tú lo has encontrado. Tú decides qué le pongo en el informe.' },
			{ call: 'b07_casa_decision' },
		],
		b07_casa_decision: [
			{ prompt: 'Maren tiene la llave y el cuento. Ottilie, la Casa. Quintana, el informe. Ninguna opción es la buena.', choice: [
				{ text: '«Devuélvele la llave a Ottilie. El cuento es tuyo.»', then: [
					{ set: { 'flag.b07_casa_devuelve': true } },
					{ call: 'b07_casa_fin_devuelve' },
				] },
				{ text: '«Que la Séptima vuelva a tener final. El de verdad. Léelo tú.»', cond: 'flag.b07_sally_libro && flag.b07_casa_doble_fondo', then: [
					{ set: { 'flag.b07_casa_lectura': true } },
					{ call: 'b07_casa_fin_lectura' },
				] },
				{ text: '«Que lo decida la aseguradora. Quintana, apúntalo todo.»', then: [
					{ set: { 'flag.b07_casa_quintana': true } },
					{ call: 'b07_casa_fin_quintana' },
				] },
			] },
		],
		b07_casa_fin_devuelve: [
			{ text: 'Maren se levanta, cruza la plaza y le pone la llave a Ottilie en la mano. Sin decir nada. Ottilie la cuelga del gancho del cinturón; le tiembla tanto la mano que tarda tres intentos.' },
			{ say: 'ottilie', text: 'La Casa abre mañana. —Mira a Maren—. Y el sillón no se vende. Que se quede el señor de Artejo con sus trescientos mil. Le diré que el contenido se lo llevó quien era su dueña.' },
			{ say: 'maren', text: '—Aprieta el cuaderno contra el pecho—. Gracias. —A ti, más bajo—. Te lo dejo leer. Una vez. Es corto. Él decía que los cuentos buenos son cortos para que se pidan otra vez.' },
			{ give: 'cuentovane' },
			{ read: 'cuentovane' },
			{ say: Q, text: 'En el informe pondré: «Llave recuperada, entregada a la asegurada. Sin daños». —Cierra la libreta—. Lo demás no cabe en un informe. Lo demás lo apunto en la otra libreta. La mía.' },
			{ intel: { npc: 'maren', text: 'Maren Vane, nieta de Edmund. Tomó la llave en el apagón para sacar del sillón el cuento que su abuelo le escribió. Devolvió la llave a Ottilie y se quedó con su cuento.' } },
			{ call: 'b07_casa_cierre' },
		],
		b07_casa_fin_lectura: [
			{ text: 'Le cuentas a Ottilie lo que viste: la Séptima se abre sin llave, con paciencia; la llave abre el sillón; dentro del sillón vivía el final de verdad. Y a Maren, lo que dijo Sally: que un cuentacuentos esconde un final para que alguien lo cuente.' },
			{ say: 'ottilie', text: '—Mira a Maren mucho rato—. Diez años leyendo un final que no era el suyo. El que venía impreso en la última página. Era bonito. Pero era el de cualquiera.' },
			{ say: 'ottilie', text: 'Lee tú el de verdad. En la Séptima, en el sillón. No cada noche, que eso lo gasta. Una vez al mes. **La Noche del Final**. —Se le escapa la voz de cuento, y esta vez no se disculpa—. Ya estoy viendo el cartel.' },
			{ say: 'maren', text: '… Leo fatal en voz alta. —Pausa larga—. Él también. Por eso hacía voces.' },
			{ text: 'Maren le da la llave a Ottilie. Ottilie la cuelga del cinturón y, sin pensarlo, se la vuelve a dar: «Para la Noche del Final. El resto del mes, la tengo yo». Las dos se ríen a la vez, y luego hacen como que no.' },
			{ say: 'maren', text: 'Te lo dejo leer. Antes que a nadie. Es corto. Él decía que los cuentos buenos son cortos para que se pidan otra vez.' },
			{ give: 'cuentovane' },
			{ read: 'cuentovane' },
			{ say: Q, text: 'En el informe pondré: «Llave recuperada. La asegurada no reclama». —Se sube las gafas—. Y en mi libreta: «primera noche de cada mes». No me lo pierdo.' },
			{ intel: { npc: 'maren', text: 'Maren Vane, nieta de Edmund. Tomó la llave para sacar del sillón el cuento que su abuelo le escribió. Ahora lo lee en la Séptima una vez al mes: la Noche del Final.' } },
			{ call: 'b07_casa_cierre' },
		],
		b07_casa_fin_quintana: [
			{ say: Q, text: '—Asiente despacio—. De acuerdo. Lo apunto todo. —Abre la libreta. No escribe todavía—. Maren, te lo digo antes de escribirlo: la llave es de la aseguradora, que la pagó. Robar una pieza asegurada es una denuncia. Y un juzgado en Artejo.' },
			{ say: 'maren', text: 'Ya lo sé. —Le da la llave a Quintana, y luego el cuaderno—. El cuento también. Si va a ir a un sitio con vitrina, que vaya con un sello de verdad, no con una etiqueta de precio.' },
			{ say: 'ottilie', text: 'La aseguradora me paga la llave. La Casa abre. Sin el sillón: lo pedirá el juzgado. Y sin final de verdad. —Mira a Maren—. Lo siento. No sé si lo siento. Lo siento igual.' },
			{ text: 'Quintana copia el cuento a mano en la mesa de la posada, esa misma noche, con letra pequeña, para el expediente. A ti te da una copia, cosida con hilo.' },
			{ say: Q, text: 'El original, al expediente. La copia, para quien lo encontró. —Te la pone en la mano—. No es el informe que me gusta escribir. Pero es el que se escribe. A veces el trabajo es eso.' },
			{ give: 'cuentovane' },
			{ read: 'cuentovane' },
			{ rep: { policia: 1 } },
			{ intel: { npc: 'maren', text: 'Maren Vane, nieta de Edmund. Tomó la llave para sacar del sillón el cuento de su abuelo. Se lo entregaste todo a Quintana: la aseguradora pagó y a ella la citaron en el juzgado de Artejo.' } },
			{ call: 'b07_casa_cierre' },
		],

		// =================== SI SE ESCAPA: LA LLAVE EN EL BUZÓN ===================
		b07_casa_escapa: [
			{ set: { 'flag.b07_casa_fallido': true } }, // el motor ya lo pone; aquí, para que el validador lo vea
			{ text: 'Cuando Quintana y tú llegan a la plaza, el puesto de setas está desmontado. Ni balanza ni cestas. En la estación, el tren de las 6:40 a Pistón se está yendo. En la última ventanilla, una capucha de lana gris. No se gira. O sí, un poco.' },
			{ say: Q, text: 'Pasa. A mí se me han escapado muchos. Este va a la libreta, con fecha. —Se sube las gafas—. Lo importante es que no acusamos a quien no era. Eso es lo que no se arregla.' },
			{ text: 'A la mañana siguiente, Ottilie aparece en la posada con el farolillo encendido de día y la **Llave de la Séptima** en la mano. La encontró en su buzón, envuelta en una hoja de helecho, con una nota sin firma, en letra de imprenta:' },
			{ read: { title: 'Una nota sin firma', text: '*(Papel de envolver setas. Letra de imprenta, apretada.)*\n\nPerdón por las tres semanas.\n\nLa Sexta se abre con el pestillo de fuera. No la cierres. Es la puerta que nadie usa, pero alguien tiene que poder.' } },
			{ say: 'ottilie', text: 'La Casa abre mañana. Con su llave y su final de siempre, el de la última página. —Se queda mirando la nota—. No sé quién era. Bueno. Lo sé. Pero no lo sé, ¿me entiende? Prefiero no saberlo así.' },
			{ say: 'ottilie', text: 'Y el sillón… no lo vendo. Lo que había dentro ya no está. Que se quede ahí, con su cojín y su olor a pipa. Por si un día vuelve a por él quien sea.' },
			{ intel: { npc: 'maren', text: 'Se fue de Plié en el tren de las 6:40 antes de que pudierais hablar con ella. La llave apareció en el buzón de Ottilie con una nota sin firma: «Perdón por las tres semanas».' } },
			{ call: 'b07_casa_cierre' },
		],

		// =================== CIERRE COMÚN (Ottilie, escena 3) ===================
		b07_casa_cierre: [
			{ if: 'flag.b07_t2_hecho', then: [{ end: true }] },
			{ text: 'Esa noche, la Casa de las Siete Puertas vuelve a abrir. Ottilie se planta delante de la Primera con la capa demasiado larga y el farolillo encendido, y lo dice con su voz de cuento, la de siempre, como si fuera la primera vez.' },
			{ say: 'ottilie', text: '¡Bienvenidos a la Casa de las Siete Puertas! —Te ve entre la gente y te guiña un ojo—. Aquí empieza el cuento. Y esta vez, acaba.', cond: '!' + FALLIDO },
			{ say: 'ottilie', text: '¡Bienvenidos a la Casa de las Siete Puertas! —Te ve entre la gente. Sonríe de lado—. Aquí empieza el cuento. El final ya lo sabe usted. El de verdad, digo. Yo me quedo con el otro.', cond: FALLIDO },
			{ text: 'En el perchero de la Sala Primera cuelgan siete capas grises. Esta noche, alguien ha dejado una octava en el banco del fondo, doblada: de lana, de punto de arroz. No es de nadie. Ottilie no la quita.', cond: LECTURA + ' || ' + DEVUELVE },
			{ say: Q, text: 'Bueno. Me vuelvo a Relieve. Héctor me ha mandado catorce vídeos esta semana y en uno sale con capa. —Se pone la gabardina—. Gracias, {jugador}. Otro par de ojos. De los que no se cansan.' },
			{ say: 'rotom', text: '¡Bzzt! Caso cerrado. Siete firmas, ocho personas, una cuenta que ya sale. —Pausa—. Y una seta torcida. No sé apuntar eso como dato. Lo apunto como cosa bonita.', cond: '!' + PURGADO + ' && !' + FALLIDO },
			{ say: 'rotom', text: 'Bzzt. Se fue en el tren. La llave volvió. —Pausa—. La cuenta sale. Pero mal.', cond: '!' + PURGADO + ' && ' + FALLIDO },
			{ say: 'rotom', text: 'Bzzt. Caso cerrado. La cuenta sale. Ocho.', cond: PURGADO },
			// ----- Diario del final (rama del Eco × resuelto / se escapó) -----
			{ diary: 'Hoy cerramos el caso de la Casa. La octava era la nieta de Edmund. Se sabía el escalón. Tenía un gorro con una seta torcida.\n\nNo robó por dinero. Robó un cuento. Eso no lo arregla. Ella lo dijo.\n\nLa Casa abre otra vez. Me alegro. Creo.', cond: D_PURGADO + ' && !' + FALLIDO },
			{ diary: 'Hoy se fue en el tren. La nieta de Edmund. No llegamos.\n\nLa llave apareció en el buzón. Con una nota: perdón.\n\nQuintana dice que pasa. Lo apunto. No me gusta.', cond: D_PURGADO + ' && ' + FALLIDO },
			{ diary: 'Hoy cerramos el caso de la Casa de las Siete Puertas. La octava persona era Maren Vane, la recolectora de setas: la nieta de Edmund. Entró por la Puerta Sexta, esperó en el banco de la Sala Primera con su capa de lana y, en el apagón de la Sexta, tomó la llave para sacar del sillón el cuento que su abuelo escribió para ella. Lo probaron sus botas de clavos y la seta torcida de la dedicatoria.\n\nLo que hicimos con la llave, lo sabe ya medio Plié.\n\n*(Omitido: nada.)*', cond: D_REFORMADO + ' && !' + FALLIDO },
			{ diary: 'Hoy se cerró el caso de la Casa de las Siete Puertas, aunque no como queríamos: la octava persona se fue de Plié en el primer tren antes de que pudiéramos hablar con ella. A la mañana siguiente, la Llave de la Séptima apareció en el buzón de Ottilie con una nota sin firma: «Perdón por las tres semanas». La Casa vuelve a abrir, con su final de siempre.\n\n*(Omitido: nada.)*', cond: D_REFORMADO + ' && ' + FALLIDO },
			{ diary: '¡Hoy resolvimos el misterio de la Casa de las Siete Puertas! La llave ha vuelto, la Casa abre otra vez y Ottilie ha recuperado su voz de cuento. Quintana se vuelve a Relieve con la libreta llena. ¡Me encantan los casos con final!', cond: D_DOBLE + ' && !' + FALLIDO },
			{ diary: '¡Hoy la llave de la Casa de las Siete Puertas apareció en un buzón, como en los cuentos! La Casa vuelve a abrir. Quintana dice que «pasa». Yo creo que ha sido un final un poco raro, pero bonito.', cond: D_DOBLE + ' && ' + FALLIDO },
			{ set: { 'flag.b07_t2_hecho': true } },
			{ quest: 'b07_s_casa', stage: 'hecha' },
			{ quest: 'b07_s_casa', done: true },
		],
		b07_ottilie_despues: [
			{ text: 'Ottilie está delante de la Primera con el farolillo encendido y una cola de visitantes con capas grises. Al verte, se salta la cola y viene.' },
			{ say: 'ottilie', text: 'La primera noche de cada mes, Maren lee en la Séptima. Se le traba la lengua y hace voces. La gente llora. Yo también, pero desde la puerta, que tengo que vender entradas. —Te aprieta la mano—. Gracias. Por el final. Por los dos.', cond: LECTURA },
			{ say: 'ottilie', text: 'Maren pasa a veces por delante. No entra. Me deja setas de las feas en el escalón. Yo le dejo té en un termo. No hablamos. Es la mejor conversación que he tenido en diez años.', cond: DEVUELVE },
			{ say: 'ottilie', text: 'La aseguradora me pagó la llave. La Casa abre. El sillón se lo llevó el juzgado y en su sitio he puesto una silla de cocina. —Pausa—. A Maren la absolverán, dice Quintana. O no. Le escribo a Artejo. No me contesta. No se lo reprocho.', cond: QUINT },
			{ say: 'ottilie', text: 'La Casa abre cada noche. Con su llave y su final de siempre. —Mira la Sexta, la gris—. No he cerrado esa puerta. Lo pedía la nota. Una puerta que nadie usa, pero que alguien pueda. Algunas noches el banco del fondo amanece con pelusa de lana.', cond: FALLIDO },
		],

		// =================== EL BUZÓN: CARTA DE OTTILIE (con la rama) ===================
		b07_eco_casa: [
			{ if: '!flag.b07_eco_casa_leida', then: [
				{ set: { 'flag.b07_eco_casa_leida': true } },
				{ if: DEVUELVE, then: [{ give: 'cartacasadevuelve' }, { read: 'cartacasadevuelve' }] },
				{ if: LECTURA, then: [{ give: 'cartacasalectura' }, { read: 'cartacasalectura' }] },
				{ if: QUINT, then: [{ give: 'cartacasaquintana' }, { read: 'cartacasaquintana' }] },
				{ if: FALLIDO, then: [{ give: 'cartacasafallido' }, { read: 'cartacasafallido' }] },
			], else: [
				{ text: 'La carta de Ottilie, desde Plié. Huele un poco a cera de farol.' },
			] },
		],
	},

	// =====================================================================
	// EL CASO (motor de casos, docs/CONTENIDO.md §21)
	// El caso solo se abre en la etapa `acusar`, cuando ya se ha vivido todo en el mundo (testigos, salas, jardín,
	// estantería de Sally, puesto de Maren): por eso los «sitios» no llevan `cond`, salvo el pase (rama de Zorua, opcional).
	// Camino de la prueba: huellas (jardín, con {riolu}) → enseñárselas a Fen → botas · escalon (Robin + Sala Tercera)
	// → dedicatoria (estantería de Sally) · dedicatoria + botas → puesto (prueba).
	// =====================================================================
	cases: {
		b07_casa: { name: 'El caso de la Casa de las Siete Puertas', loc: 'plie', partner: Q, rep: 14,
			brief: 'Hace tres semanas, en la visita de noche, entraron **ocho** en la **Casa de las Siete Puertas**. El **registro** tiene siete firmas. En la **Sala Sexta**, durante el apagón de sesenta segundos, la **Llave de la Séptima** desapareció del cinturón de Ottilie. Nadie ha vuelto a ver la llave. Ni a la octava persona.',
			clues: {
				registro: { name: 'El libro de registro', icon: '📖', text: 'Siete firmas en seis líneas (los Abbot firmaron juntos): Lark, Robin, Pip, Hester, Fen, Clive y Dee. **Siete capas** entregadas. Ottilie firma como anfitriona.', partner: 'Siete firmas, ocho personas. Uno de los dos números miente, y el papel no suele. A ver, a ver.' },
				poliza: { name: 'La póliza de la llave', icon: '📑', text: 'La aseguradora de Relieve tiene la **Llave de la Séptima** asegurada como pieza histórica: **40 000 ₽**. Ottilie dio el parte a la mañana siguiente.', partner: 'Dueña arruinada, llave asegurada. Es lo primero que se me ocurrió. Por eso desconfío de ello.' },
				coleccionista: { name: 'La oferta del coleccionista', icon: '✉️', text: 'Un coleccionista de Artejo ofrecía a Ottilie **300 000 ₽** por el sillón de Edmund «**con su contenido**». Sin la llave, la Séptima no se abría y no había venta.', partner: 'Robarse la llave le cuesta a Ottilie la venta: siete veces lo que paga el seguro. Las cuentas no le salen. A ella.' },
				banco: { name: 'Lo que vio Hester', icon: '🪑', text: 'Hester: cuando el grupo entró por la Primera, la octava **ya estaba sentada en el banco** del fondo, con la capucha puesta. Se levantó cuando empezaron a andar. Su capucha era **de punto**, a mano.', partner: 'Entonces no entraron ocho. Entraron siete, y había una. Eso cambia la cuenta entera.' },
				version_lark: { name: 'La versión de Lark', icon: '💍', text: 'Lark Abbot jura que la octava iba **al lado de Fen**, la excursionista, desde la puerta.', partner: 'Lo ha contado muchas veces. Las cosas que se cuentan mucho se pulen. A veces, de más.' },
				version_dee: { name: 'La versión de Dee', icon: '📣', text: 'Dee jura que la octava iba **pegada a ella** todo el rato: «me pisó en la Segunda, con una bota dura».', partner: 'Con Fen, dice una. Conmigo, dice la otra. Las dos no pueden ser. A lo mejor no es ninguna.' },
				foto: { name: 'La foto del grupo', icon: '📷', text: 'La foto de Clive, con flash, en la Sala Primera antes de empezar: siete capuchas grises de frente; Pip con un **Wooloo de peluche** de cara rara en brazos; y la **octava**, de espaldas, sola, **junto al banco**, lejos de Fen y lejos de Dee. Su capucha es de lana, más oscura.', partner: 'La foto no tiene opinión. Por eso me fío. Ni con Fen ni con Dee: junto al banco. Sola.' },
				capas: { name: 'La octava capa', icon: '🧥', text: 'A la mañana siguiente había **siete capas** de la casa en el perchero, secas. La capucha de la octava, en la foto, no es de fieltro como las de la casa: es **de lana de punto**, tejida a mano.', partner: 'No le dieron capa. Trajo la suya. De lana, hecha en casa. La gente no se teje una capa para una visita turística.' },
				escalon: { name: 'El escalón que cruje', icon: '🪜', text: 'En la Sala Tercera, un escalón cruje y Ottilie avisa siempre **después**: es parte del cuento. Esa noche, según Robin y Dee, una voz de mujer dijo bajito «cuidado con el escalón» **antes** de que crujiera.', partner: 'Conocía la Casa. Y **habló**. Apunto las dos cosas, que las dos importan.' },
				ditto: { name: 'El Ditto de Pip', icon: '🟣', text: 'Medio Plié dice que la octava persona era **Gelatina**, el Ditto de Pip, transformado.', partner: 'Un Ditto puede ser casi cualquier cosa. Casi. A ver qué era esa noche.' },
				ditto_peluche: { name: 'Dónde estaba Gelatina', icon: '🧸', text: 'Hester y Pip: Gelatina pasó toda la visita convertido en **Wooloo de peluche**, en brazos de Pip; la abuela lo llevaba de la pata. En la foto se le ve. Y un Ditto copia formas, **no voces**.', partner: 'La octava habló en la Tercera. Un Ditto no habla. Gelatina, fuera. Pip puede dejar de llorar.' },
				zoroark: { name: 'El rumor del Zoroark', icon: '🦊', text: 'En el bar de Plié dicen que un **Zoroark** del bosque se hace pasar por gente, y que la octava era una ilusión suya.', partner: 'Las ilusiones existen. Los Zoroark también. A ver qué deja una ilusión en el suelo.' },
				campamento: { name: 'El campamento de Fen', icon: '⛺', text: 'Fen acampa en el bosque desde esa noche y está cubierta de **polvo que brilla**. En el pueblo dicen que la octava «era del bosque» y la miran mal.', partner: 'Brilla. Todo lo que pasa por ese bosque brilla. Eso no la hace culpable; la hace visible.' },
				esporas: { name: 'Polvo que brilla', icon: '✨', text: 'Esporas de **Shiinotic** en el banco de la Sala Primera y en el suelo de la Sexta: una línea desde el centro de la sala hasta la **puerta gris del jardín**. Solo crecen en el Bosque Lumirinto.', partner: 'Del bosque. Como la excursionista. Lo apunto, y apunto que lo apunto: me huele a pista que quiere que la sigan.' },
				pestillo: { name: 'El pestillo de la Sexta', icon: '🔩', text: 'La Puerta Sexta, la del jardín, no se usa nunca. Pero su **pestillo de fuera** está **recién engrasado** y la hiedra está arrancada a la altura de una mano.', partner: 'Una puerta que no se usa, preparada antes. Eso no es pánico: es costumbre. Alguien sabía que se abre por fuera.' },
				huellas: { name: 'Huellas en el barro', icon: '🥾', text: 'En el barro del jardín: huellas de **bota claveteada** de adulto, que entran y salen por la Sexta. Pasos largos, firmes, **sin marca de bastón**. Al tacón izquierdo **le falta un clavo**: estaba hundido en la huella.', partner: 'Una ilusión no pisa barro, no engrasa pestillos y no pierde clavos. El Zoroark, fuera. ¿Quién lleva clavos en las botas?' },
				botas: { name: 'Quién lleva clavos', icon: '👢', text: 'Fen enseña sus botas: suela **lisa**, de montaña. En Plié solo llevan **clavos** los **recolectores de setas**, por el musgo. Son tres: el viejo Abe (anda con **bastón**), la pequeña de los Morton (**doce años**) y **Maren**, la del puesto de la plaza.', partner: 'Fen, fuera. Y de tres, uno anda con bastón y otra tiene doce años. Esto se estrecha.' },
				dedicatoria: { name: 'La dedicatoria del libro', icon: '📕', text: 'En «Cuentos para salir de casa», de Edmund Vane, que guarda Sally: «**Para M., que siempre se salta el escalón que cruje. — E.**». Debajo, un dibujito: una **seta con el sombrero torcido**. «*Esta es la tuya*».', partner: 'Una M. que se sabe el escalón desde pequeña. Edmund escribía para alguien que creció en esa casa.' },
				nieta: { name: 'La nieta de Edmund', icon: '👧', text: 'Ottilie: cuando compró la Casa a los herederos, hace diez años, en la notaría había una chica de unos **veinte años**, con un **gorro de lana**, que no dijo nada. La nieta de Edmund. Llevaba el apellido de la madre.', partner: 'Veinte entonces, treinta ahora. Con gorro de lana. Y nadie en el pueblo la relaciona con el abuelo. A ver, a ver.' },
				doble_fondo: { name: 'El doble fondo del sillón', icon: '🛋️', text: 'Bajo el cojín del sillón de Edmund, en la Séptima: un **doble fondo** con una cerradura de latón que abre **la misma llave**. Vacío: solo una **cinta de raso** azul y olor a papel viejo. La Séptima se abre sin llave, con paciencia.', partner: 'No se llevaron la llave para abrir la puerta. Se la llevaron para abrir el sillón. Y sabían que había algo dentro.' },
				pase: { name: 'El sello de tu pase', icon: '🎫', text: 'Tu pase de la Gira tiene el sello granate de Odile con la fecha de tu llegada a Galar: casi **tres semanas después** de esa noche. Tu Zorua estaba contigo, en otra región.', partner: 'Coartada de manual. Con sello. Ojalá todas fueran así.' },
				puesto: { name: 'El puesto de Maren', icon: '🍄', text: 'En el puesto de setas de la plaza: el **gorro de lana** de Maren lleva bordada una **seta con el sombrero torcido**, la misma de la dedicatoria. Sus botas tienen **clavos**, y al tacón izquierdo **le falta uno**. Tiene unos treinta años.', partner: 'La seta de la dedicatoria, en su gorro. El clavo del barro, en su tacón. Esto ya no es una sospecha.' },
			},
			places: [
				{ id: 'registro', label: 'El libro de registro', sub: 'En el atril de la Sala Primera', icon: '📖', text: ['Quintana pasa el dedo por la página de la noche de la niebla, línea por línea, en voz baja. Seis líneas. Siete nombres. Un corazón.'], gives: ['registro'] },
				{ id: 'expediente', label: 'El expediente de la aseguradora', sub: 'La carpeta de Quintana', icon: '📑', text: ['Una carpeta de cartón con el logotipo de la aseguradora de Relieve tachado a boli. Dentro, la póliza y el parte de Ottilie, con su letra redonda y una mancha de cera.'], gives: ['poliza'] },
				{ id: 't_hester', label: 'Lo que contó Hester', sub: 'En el banco de la fuente, haciendo punto', icon: '🧶', text: ['«Ya estaba sentada en el banco cuando entramos. Con la capucha puesta. Pensé que era de la casa». *Clic, clic.* «Y la capucha era de punto. Buena lana».'], gives: ['banco'] },
				{ id: 't_lark', label: 'Lo que contó Lark', sub: 'En el comedor de la posada', icon: '💍', text: ['«Iba al lado de la excursionista, la de la mochila. Desde la puerta. Pegadita». Lark lo dice muy segura. Luego un poco menos.'], gives: ['version_lark'] },
				{ id: 't_dee', label: 'Lo que contó Dee', sub: 'En la fuente de la plaza', icon: '📣', text: ['«¡Iba pegada a mí! ¡Me pisó en la Segunda!». Y, a gritos: «¡Fue un ZOROARK! ¡Lo dice todo el bar!».'], gives: ['version_dee', 'zoroark'] },
				{ id: 't_pip', label: 'Lo que contó Pip', sub: 'Con Gelatina, en la fuente', icon: '🟣', text: ['«¡No fue Gelatina!». Gelatina se convierte en un peluche de Wooloo, como para demostrarlo. Desde la puerta del bar, alguien cuchichea.'], gives: ['ditto'] },
				{ id: 't_fen', label: 'Lo que contó Fen', sub: 'En su tienda del bosque', icon: '⛺', text: ['«Yo voy sola. Siempre. Había alguien detrás de mí que no era del grupo». Fen se sacude la chaqueta y salta polvo azul.'], gives: ['campamento'] },
				{ id: 't_clive', label: 'La foto de Clive', sub: 'Revelada en el sótano de la posada', icon: '📷', text: ['La foto, en la mesa, al lado de la taza. Quintana la mira con una lupa de verdad. Lupa, la Noctowl, la mira con la cabeza del revés.'], gives: ['foto'] },
				{ id: 'sala_tercera', label: 'La Sala Tercera', sub: 'El escalón que cruje', icon: '🪜', text: ['Primero cruje, luego avisa Ottilie. Siempre en ese orden. Robin oyó el aviso antes. Y Dee también.'], gives: ['escalon'] },
				{ id: 'sala_sexta', label: 'La Sala Sexta', sub: 'La línea que brilla en la oscuridad', icon: '🕯️', text: ['Sesenta segundos a oscuras. Una línea de puntitos azules desde el centro hasta la puerta gris. En el banco de la Primera, el mismo brillo y pelusa de lana.'], gives: ['esporas'] },
				{ id: 'puerta_sexta', label: 'La Puerta Sexta, por fuera', sub: 'Gris, con hiedra', icon: '🔩', text: ['El pestillo de hierro corre sin ruido. Te dejó los dedos negros de aceite. La hiedra, arrancada a la altura de una mano.'], gives: ['pestillo'] },
				{ id: 'jardin', label: 'El barro del jardín', sub: 'Las huellas que encontró {riolu}', icon: '🥾', needs: ['pestillo'], text: ['Las huellas siguen rodeadas de los palitos de Quintana. El clavo torcido, en una bolsita de plástico, encima de la libreta.'], gives: ['huellas'] },
				{ id: 'septima', label: 'El sillón de la Séptima', sub: 'El doble fondo vacío', icon: '🛋️', text: ['Una cerradura de latón en un doble fondo de terciopelo. Una cinta de raso azul. Un olor a papel viejo que ya casi no está.'], gives: ['doble_fondo'] },
				{ id: 'estante_sally', label: 'La estantería de Sally', sub: 'Cuentos de Edmund Vane', icon: '📕', needs: ['escalon'], text: ['El libro de tela azul, abierto por la primera página. Quintana lee la dedicatoria dos veces, la segunda moviendo los labios.'], gives: ['dedicatoria'] },
				{ id: 'pase', label: 'Tu pase de la Gira', sub: 'Con el sello de Odile', icon: '🎫', cond: 'flag.b07_casa_zorua', text: ['Un sello granate, una fecha y la firma de Odile, que es una O con un rabito.'], gives: ['pase'] },
				{ id: 'puesto', label: 'El puesto de setas de la plaza', sub: 'Junto a la farola sin seta', icon: '🍄', needs: ['dedicatoria', 'botas'], text: ['Maren pesa setas sin mirar. Lleva el gorro de lana gris de siempre. Cuando da un paso, sus botas suenan en los adoquines: *clac*. Y un *clac* más flojo en el tacón izquierdo.'], gives: ['puesto'] },
			],
			suspects: {
				ottilie: { npc: 'ottilie', role: 'La dueña de la Casa. Llevaba la llave en el cinturón.',
					questions: [
						{ id: 'noche', q: '¿Qué pasó en la Sexta?', a: ['Soplé los faroles, como siempre. Conté hasta sesenta, como siempre. Los encendí. Y el gancho estaba vacío. Nadie me tocó. O todos me tocaron. A oscuras, en una capa que pica, no se sabe.'] },
						{ id: 'sexta', q: '¿Se usa la Puerta Sexta?', a: ['¡Nunca! Desde que compré la Casa. Tiene hiedra por fuera y el cerrojo de dentro no se toca. Yo ni tengo llave. Edmund la hizo para que hubiera una puerta que nadie abre.'] },
						{ id: 'nieta', q: '¿Edmund tenía familia?', needs: ['dedicatoria'], a: ['Una hija que se fue de Plié joven. Y una nieta. La vi una vez, en la notaría, cuando firmé: una chica de veinte años con un gorro de lana. No dijo nada en toda la firma. Llevaba el apellido de la madre. Ni me acuerdo de cuál.'], gives: ['nieta'] },
					],
					present: {
						poliza: { a: ['¿El seguro? ¡Cuarenta mil! Y el señor Quintana me mira como si me la hubiera escondido en el moño. —Saca un sobre arrugado—. Mire esto. Un coleccionista de Artejo me ofrecía trescientos mil por el sillón, con su contenido. Sin llave, no hay venta.'], gives: ['coleccionista'] },
						foto: { a: ['Siete capas… y esa de atrás. ¡Esa no es mía! Las mías son de fieltro gris, y esa es de punto. A la mañana siguiente conté siete en el perchero. Secas. Esa no la di yo.'], gives: ['capas'] },
						esporas: { a: ['El bosque entra en la Casa con cada visitante. Barro, hojas, brillo. Barro todas las mañanas. Pero en la Sexta, no. En la Sexta no barro nunca: no se pisa, se cruza a oscuras.'] },
						dedicatoria: { a: ['«Para M.». —Se tapa la boca—. Él tenía una nieta. La de la notaría. ¿Era ella? ¿Era M.?'] },
					},
					presentDefault: ['No sé qué quiere que vea ahí. Yo cuento cuentos. Bueno, contaba.'] },
				abbot: { npc: 'casa_lark', name: 'Lark y Robin Abbot', role: 'Los recién casados. Firmaron a la vez, en la misma línea.',
					questions: [
						{ id: 'ocho', q: '¿Por qué están tan seguros de que eran ocho?', a: ['Porque yo cuento a la gente sin querer. Ocho capuchas. —Robin, al lado, asiente—.', { who: 'casa_robin', t: 'Y yo las farolas. Pero la gente también, cuando me pongo nervioso. Ocho.' }] },
						{ id: 'oscuridad', q: '¿Qué hicisteis en el apagón?', a: ['Le agarré la mano a Robin.', { who: 'casa_robin', t: 'Me agarró la mano. Y alguien pasó por delante de nosotros. Rápido. Sin tropezar. Yo tropiezo hasta con la luz encendida.' }] },
					],
					present: {
						foto: { a: ['Ah… pues no iba con la excursionista. Estaba junto al banco. Sola. —Se pone colorada—. Me lo he inventado de tanto contarlo, ¿verdad? Robin, ¿me lo he inventado?', { who: 'casa_robin', t: 'Un poco. Pero bonito.' }] },
						escalon: { a: [{ who: 'casa_robin', t: 'Eso. Bajito. Antes que la señora Brack. Como quien lo dice cada día de su vida.' }] },
					},
					presentDefault: ['Uy. No sé. ¿Robin?', { who: 'casa_robin', t: 'Yo tampoco. Veintitrés.' }] },
				pip: { npc: 'casa_pip', name: 'Pip (y Gelatina)', role: 'El niño del Ditto. Medio pueblo sospecha de su Pokémon.',
					questions: [
						{ id: 'gelatina', q: '¿Qué hizo Gelatina esa noche?', a: ['¡Ser un peluche! Un Wooloo. ¡Todo el rato! —Gelatina se convierte en un Wooloo de peluche, para que lo veas—.', { who: 'casa_hester', t: 'Toda la noche. Lo llevaba yo de la pata cuando el niño se cansaba.' }] },
					],
					present: {
						foto: { a: ['¡AHÍ! ¡Ahí está Gelatina! ¡En mis brazos! ¡De peluche! ¡Con su cara!', { who: 'casa_hester', t: 'Y la octava, al fondo, junto al banco. Sola. Gelatina estaba aquí, con nosotros. Y la octava habló en la escalera: un Ditto no habla.' }], gives: ['ditto_peluche'] },
						ditto: { a: ['¡NO FUE ÉL! —Se le llenan los ojos de lágrimas—.', { who: 'casa_hester', t: 'Enséñele la foto del señor de las fotos. Ahí se ve todo.' }] },
					},
					presentDefault: ['No sé qué es eso. ¿Se come?', { who: 'casa_hester', t: 'No, cariño.' }] },
				fen: { npc: 'casa_fen', role: 'La excursionista. Acampa en el bosque y brilla de esporas.',
					questions: [
						{ id: 'bosque', q: '¿Por qué acampas en el bosque?', a: ['Porque en el pueblo me miran mal. Porque brillo. —Se sacude la chaqueta—. Y porque el bosque es bonito. Pero sobre todo lo primero.'] },
						{ id: 'botas_fen', q: '¿Esas botas son nuevas?', a: ['Nuevas, de montaña, de suela lisa. Me he caído once veces. El musgo resbala como el jabón. Debería haber preguntado en el pueblo.'] },
					],
					present: {
						esporas: { a: ['¡Ya lo sé! ¡Brillo! ¡Todo lo que pasa por ese bosque brilla! ¡Brilla hasta el cartero! Eso no quiere decir que fuera yo.'] },
						huellas: { a: ['¿Clavos? —Se quita una bota y te la enseña: suela lisa, de goma—. Mire. Lisa. Por eso me caigo. Aquí solo llevan clavos los recolectores de setas, por el musgo. Quedan tres: el viejo Abe, que anda con bastón; la pequeña de los Morton, que tiene doce años; y Maren, la del puesto de la plaza.'], gives: ['botas'] },
						zoroark: { a: ['¿Lo ve? ¡Lo dicen todos! ¡Y yo duermo aquí! —Mira hacia los helechos—. No he visto ninguno. Pero eso es lo que haría un Zoroark, ¿no? Que no lo vieras.'] },
					},
					presentDefault: ['Uy. No sé qué tiene que ver eso conmigo. ¿Quiere sopa? No brilla.'] },
				clive: { npc: 'casa_clive', role: 'El fotógrafo. Tiene la foto del grupo.',
					questions: [
						{ id: 'cuando', q: '¿Cuándo hiciste la foto?', a: ['En la Primera, nada más entrar, antes de que la señora Brack apagara el farol de la puerta. Con flash. Los pillé a todos de frente. A todos menos a una. Esa ya estaba de espaldas cuando disparé. Junto al banco.'] },
						{ id: 'octava', q: '¿Viste a la octava entrar?', a: ['No la vi entrar. La vi estar. Que es distinto. Cuando entramos, ya estaba. Mirando la pared. Como quien espera un tren que conoce.'] },
					],
					present: {
						foto: { a: ['Mírela con lupa. La capucha de la octava es más oscura: la lana agarra el flash distinto que el fieltro. Treinta años de bodas, joven. Sé distinguir un velo de una cortina.'] },
					},
					presentDefault: ['Eso no sale en ninguna foto mía. Todavía.'] },
				dee: { npc: 'casa_dee', role: 'La hincha del Team Yell. Muy buena memoria para las caras y las voces.',
					questions: [
						{ id: 'cara', q: '¿Le viste la cara a la octava?', a: ['¡Un poco! ¡En la Tercera, cuando habló! No tenía cara de turista. Tenía cara de… de aquí. De bosque. ¡Como de setas! —Se ríe—. No sé explicarlo. Pero si la veo, la conozco.'] },
					],
					present: {
						foto: { a: ['Ya. Ya, ya. No iba pegada a mí. Estaba junto al banco. —Se mira el pie—. Entonces, ¿quién me pisó? ¡Con una bota dura! ¡Con algo que hacía clac!'] },
						zoroark: { a: ['¡Fue un Zoroark! ¡Lo sabe todo el bar! —Pausa—. Bueno. En el bar también dicen que el reloj del andén es puntual.'] },
						puesto: { a: ['¡ESA! —Se levanta de golpe—. ¡La de las setas! ¡Esa es la cara! ¡Esa es la voz! ¡Esa me pisó!'] },
					},
					presentDefault: ['¡YELL! Perdón. No sé. ¡Pero YELL!'] },
				maren: { npc: 'maren', role: 'Recolectora de setas. Vende en la plaza. No firmó en el registro.',
					questions: [
						{ id: 'casa', q: '¿Has entrado alguna vez en la Casa?', a: ['De niña. —Pesa una seta—. Antes no se cobraba entrada.'] },
						{ id: 'noche_maren', q: '¿Dónde estabas esa noche?', a: ['En el bosque. Recogiendo. Con niebla salen las mejores. —No levanta la vista—. Sola.'] },
					],
					present: {
						botas: { a: ['Para el musgo. —Se mira los pies. No dice nada más.'] },
						dedicatoria: { a: ['…', { who: null, t: 'Maren deja la seta en la balanza. La balanza baja. Ella no la mira.' }] },
						puesto: { a: ['…', { who: null, t: 'Maren se quita el gorro. Lo dobla. Lo vuelve a doblar. No dice nada. No hace falta.' }] },
						doble_fondo: { a: ['Una cinta azul. —Lo dice sin querer. Luego aprieta los labios.'] },
					},
					presentDefault: ['Setas. Del bosque. Las que brillan no se comen.'] },
			},
			culprit: 'maren', proof: ['puesto'],
			objection: {
				culpable: ['Eh, eh. Despacio. Con eso no se acusa a nadie. Esa persona tiene explicación para lo que le enseñas. Vuelve a mirar quién sabía cosas de la Casa que no sabe un visitante.'],
				prueba: ['La persona, puede que sí. La pista, no: eso la hace sospechosa, no culpable. Necesito algo que la ponga a ella en el barro del jardín y en la dedicatoria a la vez.'],
			},
			hurry: 'Aún hay sitios sin mirar y preguntas sin hacer. Yo no tengo prisa. El culpable, sí.',
			again: 'Aquí ya lo hemos mirado todo. Dos veces el mismo barro no da dos huellas.',
			solution: [
				{ who: Q, t: 'Una cosita nada más. La octava no entró con el grupo: ya estaba dentro, en el banco, con una capa de lana que no era de la casa. Entró por la Sexta, la que nadie usa, con el pestillo de fuera engrasado de antes.' },
				{ who: Q, t: 'Sabía qué escalón cruje sin pisarlo. Sabía que la llave abría el sillón. Sabía cruzar la Sexta a oscuras. Eso no lo sabe una visitante: lo sabe una niña que creció en esa casa.' },
				{ who: Q, t: 'Gelatina iba de peluche y no habla. Una ilusión no deja botas en el barro. Fen lleva suela lisa. De los tres que llevan clavos, uno anda con bastón y otra tiene doce años.' },
				{ who: Q, t: 'Cuando quitas lo imposible, lo que queda es una bota con clavos. Y un gorro con una seta torcida, la misma que Edmund dibujó en la dedicatoria: «Para M.».' },
				{ who: 'maren', t: 'Maren. Maren Vane. —Se quita el gorro—. Sí. Fui yo.' },
				{ who: Q, t: 'Siete firmas. Ocho personas. Ahora la cuenta sale. No me gusta cómo sale, pero sale.' },
			],
			escape: [
				{ who: null, t: 'Cuando vuelven a la plaza, el puesto de setas está desmontado. En la estación, el tren de las 6:40 se va. En la última ventanilla, una capucha de lana gris.' },
				{ who: Q, t: 'Se nos fue. Pasa. Lo apunto con fecha. Lo importante es que no acusamos a quien no era.' },
			],
			prize: [{ id: 'bottlecap', n: 1 }, { id: 'expcandyl', n: 2 }] },
	},

	// =====================================================================
	// BUZÓN: la carta de Quintana (encargo) y el eco de Ottilie (con la rama)
	// =====================================================================
	mail: [
		{ id: 'b07_casa_carta', kind: 'encargo', from: 'Mauro Quintana', npc: Q, title: 'Siete firmas, ocho personas', cond: 'flag.b07_t1_hecho', days: 1, item: 'cartaquintanacasa', script: 'b07_casa_carta' },
		{ id: 'b07_eco_casa', kind: 'carta', from: 'Ottilie Brack', npc: 'ottilie', title: 'Desde la Casa de las Siete Puertas', cond: 'flag.b07_t2_hecho', days: 3, script: 'b07_eco_casa' },
	],

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		cartaquintanacasa: { name: 'Carta de M. Quintana (Galar)', pocket: 'key', desc: 'Una hoja de libreta doblada en cuatro, con un sello de Correos de Galar torcido y una espora azul pegada al pliegue, que todavía brilla un poco.',
			read: '*(Hojas de libreta con anillas, arrancadas con cuidado. Letra pequeña, inclinada. En una esquina, un puntito azul que brilla.)*\n\n{jugador}:\n\nSi ya hemos trabajado juntos, sabes cómo va esto. Si no, Héctor te habrá hablado de mí. Y si no te ha hablado, es la primera vez en su vida.\n\nMe llamo Mauro Quintana y soy perito de siniestros en la aseguradora de Relieve. Desde que hay Puertas, los siniestros viajan. Yo, detrás.\n\nEn **Pueblo Plié**, al fondo del **Bosque Lumirinto**, hay una casa que se llama **la Casa de las Siete Puertas**. La construyó un cuentacuentos. Ahora es una atracción: se entra por la primera puerta, se sale por la séptima, y en medio te cuentan un cuento sala por sala.\n\nHace tres semanas, en una visita de noche, desapareció la **Llave de la Séptima Puerta**. La tenemos asegurada nosotros, como pieza histórica.\n\nHasta aquí, un siniestro normal. Lo raro es esto: los siete visitantes de esa noche juran, cada uno por su lado, que **entraron ocho**. El registro tiene siete firmas. Siete capas. Siete nombres.\n\nSiete firmas. Ocho personas. A ver, a ver.\n\nHay tren a Plié desde la estación de Pistón. Estaré en la posada, en la mesa del rincón. Gabardina color arena; no tiene pérdida.\n\nM. Quintana\n\nP. D.: En Plié las setas brillan de noche. No es un decir. No te las comas.' },
		cartacoleccionista: { name: 'Carta del coleccionista', pocket: 'key', desc: 'Una carta en papel grueso con membrete en relieve de una casa de antigüedades de Ciudad Artejo. Ottilie la ha doblado y desdoblado tantas veces que se rompe por los pliegues.',
			read: '*(Papel grueso, color hueso. Membrete en relieve: «Antigüedades Halloway · Ciudad Artejo · Desde siempre». Letra a máquina, firma a pluma.)*\n\nEstimada Sra. Brack:\n\nTras nuestra conversación del pasado martes, me complace confirmarle por escrito mi oferta por el **sillón orejero de Edmund Vane** que se encuentra en la Sala Séptima de su propiedad, **con su contenido**, por un importe de **300 000 ₽**.\n\nComo le indiqué, mi cliente tiene un interés particular en las piezas personales del Sr. Vane. La oferta se mantiene hasta el último día de este mes. La entrega se haría en la propia Sala Séptima, en presencia de un notario, una vez abierta la puerta con su llave original.\n\nEntiendo que la decisión no es fácil. Las casas con historia nunca lo son.\n\nAtentamente,\n\n*(Firma ilegible, muy elegante)*\nAntigüedades Halloway\n\n*(A lápiz, en el margen, con la letra redonda de Ottilie:)* ¿«Con su contenido»? ¿Qué contenido? Es un sillón.' },
		fotogrupocasa: { name: 'Foto «Los ocho»', pocket: 'key', art: 'casa_ocho', desc: 'Una foto con flash en una sala de paredes rojas: siete capuchas grises de frente, con caras de susto y de risa; un niño con un Wooloo de peluche de cara rara; y al fondo, junto a un banco, una octava capucha de lana, de espaldas, sola. Copia de Clive.' },
		clavobota: { name: 'Clavo de bota', pocket: 'key', desc: 'Un clavo de bota de recolector, de cabeza cuadrada, torcido y lleno de barro. Estaba hundido en una huella del jardín de la Casa de las Siete Puertas, justo donde a un tacón izquierdo le faltaba uno.' },
		cuentovane: { name: 'El cuento de Edmund Vane', pocket: 'key', desc: 'Un cuaderno cosido con hilo, con tapas de cartón y una cinta de raso azul. En la primera hoja, una seta con el sombrero torcido. El cuento que Edmund Vane escribió para su nieta; una copia a mano, para quien lo encontró.',
			read: '*(Hojas de cuaderno cosidas con hilo de bramante. Letra grande y redonda, un poco temblona en las mayúsculas. Hay faltas de ortografía, y alguien las ha subrayado con lápiz rojo y ha puesto al lado: «a propósito». En la primera hoja, una seta con el sombrero torcido.)*\n\n**LA NIÑA QUE SE SALTABA EL ESCALÓN**\n*(el final de verdad)*\n\nHabía una vez una casa con siete puertas, y una niña que se las sabía todas.\n\nSabía que la Primera pesa más de lo que parece. Que en la Segunda las ramas se te enganchan en el pelo si no vas agachada. Que en la Tercera hay un escalón que cruje, y que si lo pisas, la casa entera se entera.\n\nAsí que la niña se lo saltaba. Siempre. Sin mirar. Como se salta un charco que ya conoces.\n\nEn la Cuarta, el espejo le preguntaba qué era, y ella contestaba algo distinto cada vez. En la Quinta, el eco le devolvía su nombre un poco más bajo, como si se lo guardara. En la Sexta se apagaba todo, y la niña no tenía miedo, porque sabía que la Oscuridad de esa casa la había hecho alguien que la quería, y que duraba exactamente sesenta segundos. Ni uno más.\n\nY al final, en la Séptima, había un sillón, y en el sillón estaba sentado un viejo que olía a pipa y que hacía voces, y la niña se sentaba en el brazo del sillón, aunque no se podía, y el viejo le contaba el final.\n\nEl final era este:\n\nUn día el viejo ya no estaría en el sillón. Y la niña sería mayor, y tendría las botas llenas de barro y las manos negras de tierra, y pasaría por delante de la casa sin entrar, porque ya no sería su casa.\n\nY no pasaría nada. Porque una casa no es de quien la compra, ni de quien la hizo, sino de quien se sabe sus escalones.\n\nY esa niña, aunque no volviera a entrar nunca, se los sabría todos.\n\n**FIN**\n\n*(Debajo, más pequeño, con otra pluma:)*\n\nM.: si estás leyendo esto, ya eres mayor. No vuelvas a saltarte el escalón por mí. Písalo una vez, fuerte, para que la casa se entere de que has vuelto.\n\n— E.' },
		setaluminosa: { name: 'Seta luminosa', pocket: 'misc', cost: 0, desc: 'Una seta pequeña del Bosque Lumirinto que brilla en azul durante un rato. No se come. Los recolectores de Plié la usan para alumbrar el camino y, dicen, a algunas boticarias les encanta para sus mezclas.' },
		// ----- Ecos del Buzón (uno por rama) -----
		cartacasadevuelve: { name: 'Carta de Ottilie (la llave)', pocket: 'key', desc: 'Un sobre morado con el remite «Casa de las Siete Puertas · Plié». Dentro, una hoja con letra redonda y una mancha de cera.',
			read: '*(Letra redonda, grande, con muchos signos de exclamación tachados.)*\n\n¡Querid{o|a|e} {jugador}!\n\nLa Casa abre todas las noches. Siete capas, siete puertas, una llave en mi cinturón. Ahora la toco cada cinco minutos. Ya no se me va a caer. Creo que me la he cosido.\n\nEl señor de Artejo volvió a escribir. Le contesté que el sillón no se vende y que el contenido se lo llevó su dueña. No ha vuelto a escribir. Me alegro mucho.\n\nMaren pasa a veces por delante de la Casa. No entra. Me deja setas de las feas en el escalón de la Primera. Yo le dejo té en un termo. No hablamos. A lo mejor algún día. A lo mejor no hace falta.\n\nGracias por encontrar a la octava. Y por dejar que se fuera con lo suyo.\n\n**Ottilie**\n\nP. D.: El escalón de la Tercera sigue crujiendo. Lo he dejado así.' },
		cartacasalectura: { name: 'Carta de Ottilie (la Noche del Final)', pocket: 'key', desc: 'Un sobre morado con el remite «Casa de las Siete Puertas · Plié» y, pegado con cinta, un programa de mano: «La Noche del Final».',
			read: '*(Letra redonda, grande. Debajo, otra letra, pequeña y apretada.)*\n\n¡Querid{o|a|e} {jugador}!\n\nYa hemos hecho la primera **Noche del Final**. Vinieron cuarenta personas. Cuarenta. En la Séptima caben doce, así que hicimos cuatro turnos y Maren leyó cuatro veces.\n\nLeyó fatal la primera. Se le trababa la lengua y no se atrevía a mirar a nadie. La segunda, hizo una voz. La tercera, tres. La cuarta, un señor de Pistón lloró y pidió que lo leyera otra vez. Ella dijo que no, que los cuentos buenos son cortos para que se pidan otra vez. Él lo apuntó.\n\nLa Casa ya no está en la ruina. Ni mucho menos. La sopa de la posada, tampoco.\n\nGracias. Por los dos finales. El de la Casa y el mío.\n\n**Ottilie**\n\n*(Con la letra pequeña:)*\n\nPisé el escalón. Fuerte. Una vez. La casa se enteró.\n\n— M.' },
		cartacasaquintana: { name: 'Carta de Ottilie (el expediente)', pocket: 'key', desc: 'Un sobre morado con el remite «Casa de las Siete Puertas · Plié». Dentro, una hoja doblada con cuidado y un recorte de periódico de Artejo.',
			read: '*(Letra redonda, grande, más contenida de lo normal.)*\n\nQuerid{o|a|e} {jugador}:\n\nLa Casa abre todas las noches. La aseguradora pagó la llave y el señor Quintana me ayudó con los papeles, que eran muchos y en letra pequeña. Me dijo que la letra pequeña es como los escalones: hay que pisarla con cuidado.\n\nEl sillón de Edmund se lo llevó el juzgado de Artejo. En su sitio he puesto una silla de cocina y leo el final de la última página, el de siempre. Funciona. La gente aplaude. Yo sé que no es el de verdad, pero ellos no.\n\nA Maren la citaron en Artejo. Va el día veinte. Le he escrito para decirle que, si quiere, digo que la llave la perdí yo. No me ha contestado. No se lo reprocho.\n\nUsted hizo lo que era justo. Lo justo no siempre es lo que más gusta. Eso también lo escribió Edmund, en otro cuento.\n\n**Ottilie**\n\n*(Grapado: un recorte del* Heraldo de Artejo*, sección de tribunales, de tres líneas. «Una recolectora de Plié, citada por la desaparición de una llave histórica. El juez ha pedido una copia del cuento».)*' },
		cartacasafallido: { name: 'Carta de Ottilie (la nota)', pocket: 'key', desc: 'Un sobre morado con el remite «Casa de las Siete Puertas · Plié». Dentro, una hoja y una hoja de helecho seca, aplastada.',
			read: '*(Letra redonda, grande. La hoja de helecho va prendida con un clip.)*\n\nQuerid{o|a|e} {jugador}:\n\nLa Casa abre todas las noches, con su llave y su final de siempre.\n\nNo he cerrado la Sexta. Lo pedía la nota. Algunas mañanas, en el banco del fondo de la Primera, hay pelusa de lana gris. Nunca veo a nadie. No barro ese banco.\n\nEl señor Quintana dice que se le escapó. Yo creo que no se escapó: se fue. Que no es lo mismo. Él me ha dicho que en su libreta no hay casilla para eso.\n\nLe mando la hoja de helecho en la que venía envuelta la llave. Es lo único que me queda de esa noche que no sea un susto.\n\n**Ottilie**\n\nP. D.: El sillón no lo vendí. Ahí sigue, con su cojín y su olor a pipa. Por si vuelve.' },
	},

	// Puesto de setas de Maren (escena 1 en adelante)
	shops: {
		puesto_maren: { name: 'El puesto de setas', items: [
			{ id: 'tinymushroom', price: 500 }, { id: 'bigmushroom', price: 5000 }, { id: 'setaluminosa', price: 300 },
			{ id: 'balmmushroom', price: 15000, cond: 'flag.b07_t2_hecho' },
		] },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b07_lumi_setas: {
			name: 'El claro de las setas', icon: '🍄', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'bosque', hint: 'Sacude los sombreros con cuidado: las que brillan van aparte y las pochas restan. Los Morelull se llevan lo que cae fuera.' },
			ask: 'Un claro lleno de setas de todos los tamaños, unas que brillan y otras que no. Un cartel pequeño: «Las que no brillan se comen». Entre los helechos, dos Morelull te miran con mucha atención.',
			text: 'El claro de las setas suelta lo que tiene. Los Morelull se quedan con las que brillan más.',
			wait: 'Hoy el claro ya ha dado lo suyo. Los Morelull duermen encima de las setas que quedan, y no se les puede pedir que se aparten.',
			table: [
				{ id: 'tinymushroom', w: 16, n: [1, 2] }, { id: 'setaluminosa', w: 12, n: [1, 2] }, { id: 'bigmushroom', w: 8 },
				{ id: 'luminousmoss', w: 6 }, { id: 'mistyseed', w: 3 }, { id: 'pechaberry', w: 8, n: [1, 2] },
				{ id: 'balmmushroom', w: 2, rare: true }, { id: 'maxmushrooms', w: 1, rare: true }, { id: 'shinystone', w: 1, rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		caso_casa: {
			name: 'La Casa de las Siete Puertas', npc: 'quintana', type: 'Fairy', rec: 66,
			cond: 'flag.b07_casa_intro',
			info: [
				{ text: 'Un caso de **Quintana** en **Pueblo Plié**. Sin combates obligatorios. Escucha a los siete visitantes, recorre la Casa puerta a puerta y acusa con una prueba.' },
				{ text: 'Lleva a **{riolu}** en el equipo: en el jardín de la Casa hay algo que solo se lee con el aura.' },
				{ text: 'El Bosque Lumirinto es de tipo **Hada** y **Fantasma**, nivel 66–68: **Acero** y **Veneno** van bien; **Siniestro**, no tanto.' },
				{ cond: 'flag.b07_t2_hecho', text: '✔ Caso cerrado.' },
			],
		},
		reto_sally: {
			name: 'Sally, en el Estadio de Plié', npc: 'sally', trainer: 'sally_quiz', type: 'Fairy', rec: 69,
			cond: 'flag.b07_sally',
			info: [
				{ text: 'Combate **amistoso** y opcional. Su gimnasio está cerrado esta temporada. Te cura antes, si quieres.' },
				{ text: 'Antes de empezar, tres preguntas. No cambian el combate; cambian lo que te da si ganas.' },
				{ cond: 'beat("sally_quiz")', text: '5 Pokémon, hasta el nivel 69, casi todos **Hada**. **Acero** y **Veneno**; ojo con el Mawile, que es de Acero y muerde.' },
				{ cond: 'beat("sally_quiz")', text: '✔ Ganado. «Tiene usted un rosa por dentro».' },
			],
		},
	},

	// =====================================================================
	// NPCs genéricos de este tramo (los siete visitantes de la Casa)
	// =====================================================================
	npcs: {
		casa_lark: { name: 'Lark Abbot', generic: true, look: { hair: 'bun', hairColor: '#e9d27a', outfit: '#f2ece0', outfit2: '#d98aa0', skin: 0, eyesStyle: 'happy', mouth: 'open', collar: 'shirt', acc: 'flower' } },
		casa_robin: { name: 'Robin Abbot', generic: true, look: { hair: 'short', hairColor: '#6b4a2b', outfit: '#3a4a6a', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'wide', mouth: 'flat', brows: 'sad', collar: 'jacket' } },
		casa_pip: { name: 'Pip', generic: true, look: { hair: 'curly', hairColor: '#c4743a', outfit: '#5aa36b', outfit2: '#f2c84a', skin: 1, eyesStyle: 'big', mouth: 'open', collar: 'tshirt', acc: 'freckles', head: 'round' } },
		casa_hester: { name: 'Hester', generic: true, look: { hair: 'bun', hairColor: '#e9e8e0', outfit: '#8a3a3a', outfit2: '#c9a66b', skin: 1, eyesStyle: 'narrow', mouth: 'flat', age: 'old', collar: 'cardigan', acc: 'glasses' } },
		casa_fen: { name: 'Fen', generic: true, look: { hair: 'short', hairColor: '#2a2420', outfit: '#e98a3a', outfit2: '#8ad6e0', skin: 3, eyesStyle: 'wide', mouth: 'open', collar: 'jacket', acc: 'freckles' } },
		casa_clive: { name: 'Clive', generic: true, look: { hair: 'balding', hairColor: '#9aa0a8', outfit: '#6a5a3a', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'sleepy', mouth: 'smile', age: 'old', collar: 'vest', acc: 'mustache' } },
		casa_dee: { name: 'Dee', generic: true, look: { hair: 'ponytail', hairColor: '#c43a7a', outfit: '#2a2420', outfit2: '#c43a7a', skin: 2, eyesStyle: 'sharp', mouth: 'grin', collar: 'jacket', acc: 'scar' } },
	},
};
