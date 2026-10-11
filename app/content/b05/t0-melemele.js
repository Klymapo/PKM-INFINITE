// Bloque 5 · Tramo 0: «Melemele».
// Convocatoria en Kanto/Kalos/Johto → Puerta de Kanto → Puerta Lemnis de Alola (Paseo Marítimo de Hauoli; Rotom: «bzzt… sincronizando…»)
// → recepción de la Gira (Kukui, Sera o el directivo, Alexia, Handsome, la charla del cielo de Calder Wynn)
// → Leilani se estrella con un prototipo (meet-cute) → laboratorio de Kukui (Litten) → Ruta 1 → Pueblo Lilii (Kaudan y Kiyo)
// → Ramiro trae un huevo de Elm → Ruta 2 → Cueva Sotobosque (Liam: combate, puzle y Pokémon dominante; Normastal Z)
// → Senda Mahalo: Tapu Koko y la Pulsera Z → Gran Prueba de Kaudan (Lizastal Z: el primer movimiento Z de {riolu})
// → llamada de Ciprés (la hipótesis del Lazo) → ferry a Akala.
// Escuela de Entrenadores (zona de entrenamiento, tope 57, premio MT Golpe Cuerpo) y pesca diaria del Paseo Marítimo.

// ---------- Condiciones reutilizadas (cadenas planas) ----------
const LUC = 'inParty("riolu") || inParty("lucario")';
const TRATO_ROTO = 'flag.b01_trato_sera && !flag.b02_frag_sera';
const SERA_TU = 'flag.b01_trato_sera && flag.b02_frag_sera';
const CRUCE = 'flag.b05_inicio_hecho && !flag.b05_puerta_alola';
const RECEP = 'flag.b05_recepcion';
const LAB = 'flag.b05_lab_hecho';
const LILII = 'flag.b05_lilii_kaudan';
const TIENE_LITTEN = 'owns("litten") || owns("torracat") || owns("incineroar")';
const GRAN = 'quest.b05_m2 == "gran"';
const A_CRUZAR = { label: '🌺 Cruzar con la Gira a Alola', sub: 'La Gira se reúne en la Puerta de Kanto', icon: '🌺', cond: CRUCE, new: CRUCE, talk: [{ script: 'b05_cruce_aviso' }] };

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== CIUDAD HAUOLI ===================
		hauoli: {
			name: 'Ciudad Hauoli', short: 'Hauoli', region: 'alola', kind: 'city', map: { x: 20, y: 38 },
			bg: { type: 'city', roofs: ['#f2c84a', '#e98a6a', '#e9e3d0', '#5aa8c4'], far: '#7fc4d8' },
			desc: 'La ciudad más grande de Melemele es, sobre todo, **una playa con tiendas**. Calles anchas de casas bajas pintadas de colores que el sol ya ha bajado un tono, palmeras torcidas por el viento, chanclas en todos los pies.\n\nAl sur, el **Paseo Marítimo**, con su puesto de malasadas y la **Puerta Lemnis de Alola**, recién estrenada. Al oeste, por la arena, el **laboratorio del Prof. Kukui**. En el centro, la **Escuela de Entrenadores**, con su patio de tierra.\n\nAl norte salen dos caminos: la **Ruta 1**, cuesta arriba hacia Pueblo Lilii, y la **Ruta 2**, que bordea el cementerio y sube hacia las colinas.',
			descNight: 'De noche, Hauoli huele a sal y a aceite de freír. Las tiendas cierran pronto, pero el Paseo Marítimo no: hay gente sentada en el muro con los pies colgando, un ukelele en alguna parte y el zumbido azul y plata de la Puerta, que se refleja en el agua como una luna que no está donde debería.',
			descs: [{ cond: 'flag.b05_t0_hecho', text: 'Hauoli, con su calma de siempre. En el puerto, el **ferry a Akala** espera con la pasarela bajada y un marinero dormido en una hamaca. En el Paseo Marítimo, el escenario de la Gira ya está desmontado; solo queda la Puerta, zumbando.\n\nLa Escuela de Entrenadores, el laboratorio de la playa, el puesto de malasadas: ya sabes dónde está todo. Y todo sigue oliendo a sal.' }],
			mapNote: 'Puerta Lemnis de Alola · Laboratorio de Kukui · Escuela de Entrenadores (tope 57) · pesca en el Paseo · ferry a Akala',
			onEnter: [{ script: 'b05_llegada', cond: '!flag.b05_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Hauoli', action: { shop: 'tienda_hauoli' } },
				{ label: 'Paseo Marítimo', sub: 'La recepción de la Gira, el mar y las malasadas', icon: '🌊', new: '!' + RECEP, action: { go: 'paseo_hauoli' } },
				{ label: 'Puerta Lemnis de Alola', sub: 'En el Paseo Marítimo, junto al muelle', icon: '♾️', action: { go: 'puerta_alola' } },
				{ label: 'Laboratorio del Prof. Kukui', sub: 'Una casa de madera sobre la arena', icon: '🏖️', cond: RECEP, new: RECEP + ' && !' + LAB, action: { go: 'lab_kukui' } },
				{ label: 'Escuela de Entrenadores', sub: 'Un patio de tierra y un timbre que suena a todas horas', icon: '🏫', cond: RECEP, action: { go: 'escuela_entrenadores' } },
				{ label: 'Jardines y descampados', sub: 'Entre las tiendas hay más hierba alta de lo que parece', icon: '🌺', action: { explore: 'grass' } },
				{ label: '⛴️ Ferry a Akala (Kantai)', sub: 'Sale del puerto cada hora, más o menos', icon: '⛴️', cond: 'flag.b05_ferry_akala', new: 'flag.b05_ferry_akala && !visited("kantai")', action: { go: 'kantai' } },
			],
			rumors: [
				{ text: 'En Alola no hay gimnasios: hay **pruebas**. Las ponen los capitanes, chavos que casi no han dejado la escuela, y dicen que son más difíciles que muchos gimnasios. Al final de cada isla espera el **kahuna**.' },
				{ text: 'El Prof. Kukui vive en la playa y estudia los movimientos Pokémon recibiéndolos. En persona. Dicen que tiene un Rockruff que le pega en la espinilla cada mañana a las siete, por encargo.' },
				{ text: 'La malasada de Hauoli se come caliente, con los dedos y sin servilleta. Con servilleta se nota que eres turista. Sin servilleta también, pero menos.' },
				{ cond: RECEP, text: 'Un pescador del muelle jura que ayer el sol se puso diez minutos antes de lo que decía el periódico. Su mujer dice que el periódico es de la semana pasada. Él dice que eso no tiene nada que ver.' },
				{ cond: RECEP, text: 'La Puerta Lemnis de Alola la montaron en tres noches. De día no se veía nada; de noche, focos y grúas. Los vecinos del Paseo dicen que no pegaron ojo. Los Wingull del muelle, tampoco.' },
			],
			encounters: {
				grass: [
					{ sp: 'furfrou', lv: [50, 52], w: 25 },
					{ sp: 'persianalola', lv: [50, 52], w: 20 },
					{ sp: 'kadabra', lv: [50, 52], w: 15 },
					{ sp: 'mrmime', lv: [50, 52], w: 12 },
					{ sp: 'pelipper', lv: [50, 52], w: 12 },
					{ sp: 'magneton', lv: [51, 53], w: 8 },
					{ sp: 'mukalola', lv: [51, 53], w: 6, time: 'night' },
					{ sp: 'electabuzz', lv: [51, 53], w: 4, displaced: true },
				],
			},
		},

		// ---------- Paseo Marítimo ----------
		paseo_hauoli: {
			name: 'Paseo Marítimo de Hauoli', short: 'Paseo Marítimo', parent: 'hauoli', kind: 'area',
			bg: { type: 'coast', far: '#7fc4d8', ground: '#e9d8a6' },
			desc: 'Un paseo largo de baldosas blancas entre la arena y las tiendas, con palmeras cada diez pasos y bancos que queman al sentarse. El mar es de un azul que en otras regiones sería ilegal.\n\nJunto al muelle se levanta la **Puerta Lemnis de Alola**. Según se sale de ella, a la **derecha**, el escenario de la Gira con banderines azul y plata; a la izquierda, un **puesto de malasadas** con cola hasta la arena.',
			descNight: 'De noche, el Paseo es de los que no duermen: parejas en el muro, un señor que pesca con linterna y el puesto de malasadas sirviendo las últimas, más baratas y menos crujientes. El mar suena más cerca que de día.',
			descs: [{ cond: 'flag.b05_t0_hecho', text: 'El escenario de la Gira ya no está: solo quedan cuatro marcas en las baldosas y un banderín azul enganchado en una palmera, que nadie alcanza a quitar.\n\nLa Puerta zumba junto al muelle. El puesto de malasadas sigue con su cola. El mar, con su azul.' }],
			mapNote: 'Recepción de la Gira · pesca diaria · puesto de malasadas',
			onEnter: [{ script: 'b05_recepcion', cond: '!' + RECEP, once: true }],
			spots: [
				{ label: 'Pescar en el muelle', sub: 'Un tramo de muelle con cañas olvidadas', icon: '🎣', action: { gather: 'pesca_paseo_hauoli' } },
				{ label: 'Puesto de malasadas', sub: 'Huele a gloria. Hay cola', icon: '🍩', talk: [{ script: 'b05_malasadas' }] },
				{ label: 'Calder Wynn', sub: 'Monta un telescopio pequeño en el muro del Paseo', icon: '🔭', cond: 'flag.b05_calder_charla && !flag.b05_t0_hecho', new: '!flag.b05_calder_telescopio', talk: [{ cond: 'flag.b05_calder_telescopio', script: 'b05_calder_despues' }, { script: 'b05_calder_telescopio' }] },
				{ label: 'Alexia', sub: 'Fotografía la Puerta con el mar detrás', icon: '📸', cond: RECEP + ' && !flag.b05_t0_hecho', talk: [{ script: 'b05_alexia_paseo' }] },
				{ label: 'Handsome', sub: 'Camisa de flores, bigote de mentira, gafas de sol de mentira', icon: '🕵️', cond: RECEP + ' && !flag.b05_t0_hecho', talk: [{ script: 'b05_handsome_paseo' }] },
			],
			rumors: [
				{ text: 'El puesto de malasadas abre a las seis de la mañana y a las seis y cuarto ya hay cola. Nadie sabe quién es el primero de la cola. Algunos sospechan que duerme allí.' },
				{ text: 'Desde el muelle se pescan Luvdisc, Corsola, Octillery… y, alguna vez, algo grande que rompe el sedal. Los del muelle lo llaman «el Jefe». Nadie lo ha visto entero.' },
			],
		},

		// ---------- Puerta Lemnis de Alola ----------
		puerta_alola: {
			name: 'Puerta Lemnis de Alola', parent: 'hauoli', kind: 'building',
			bg: { type: 'plaza', landmark: 'gate' },
			desc: 'El arco de la Puerta de Alola se levanta en el extremo del Paseo Marítimo, entre dos palmeras que alguien ha atado con cables para que no se inclinen hacia la lemniscata. Las columnas de metal plateado están calientes al tacto y huelen a sal.\n\nAl otro lado, borrosas como a través del agua, se turnan la Puerta de Kanto, la plaza de la Torre Prisma y el andén de Trigal. Un técnico de Lemnis con camisa de flores reglamentaria atiende una mesa plegable bajo una sombrilla.',
			mapNote: 'Viaje a Kanto (Azafrán), Kalos (Luminalia) y Johto (Trigal)',
			spots: [
				{ label: 'Cruzar a Kanto (Azafrán)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b05_puerta_alola', action: { go: 'puerta_azafran' } },
				{ label: 'Cruzar a Kalos (Luminalia)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b05_puerta_alola', action: { go: 'luminalia_plaza' } },
				{ label: 'Cruzar a Johto (Trigal)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b05_puerta_alola', action: { go: 'puerta_trigal' } },
				{ label: 'El técnico de la sombrilla', sub: 'Camisa de flores con lemniscatas', icon: '💻', talk: [{ script: 'b05_puerta_tecnico' }] },
			],
		},

		// ---------- Laboratorio del Prof. Kukui ----------
		lab_kukui: {
			name: 'Laboratorio del Prof. Kukui', short: 'Laboratorio de Kukui', parent: 'hauoli', kind: 'building',
			bg: { type: 'indoor', wall: '#d8b98a', floor: '#8a6a4a' },
			desc: 'Una casa de madera sobre la arena, con la puerta siempre abierta y el mar a diez pasos. Por dentro es mitad laboratorio y mitad gimnasio: una computadora vieja, cajas de fichas, una pizarra llena de flechas… y **un ring de lucha** en medio del salón, con las cuerdas gastadas.\n\nEn la pared, un cartel: «Aquí se investigan los movimientos Pokémon. De cerca».',
			descs: [{ cond: 'flag.b05_ramiro_huevo', text: 'La casa de la playa de Kukui, con su ring en medio del salón. En una esquina, sobre una toalla doblada, hay un **huevo** de cáscara clara con manchas, dentro de una incubadora hecha con una lámpara de escritorio. Al lado, un pósit amarillo: «Darle la vuelta cada 4 h. Perdón. — R.»' }],
			mapNote: 'Prof. Kukui · Litten',
			onEnter: [{ script: 'b05_lab', cond: RECEP + ' && !' + LAB, once: true }],
			spots: [
				{ label: 'Prof. Kukui', sub: 'Toma apuntes colgado de las cuerdas del ring', icon: '🧢', cond: LAB, talk: [{ cond: 'flag.b05_t0_hecho', script: 'b05_kukui_final' }, { script: 'b05_kukui_charla' }] },
				{ label: 'Litten', sub: 'Dormita en una caja de cartón, al sol', icon: '🐈‍⬛', cond: LAB + ' && (' + TIENE_LITTEN + ') && !flag.b05_litten_tuyo', talk: [{ script: 'b05_litten_caja' }] },
				{ label: 'Un ciclista con casco y chaleco reflectante', sub: 'Abraza una caja con agujeros como si fuera de cristal', icon: '🚲', cond: LILII + ' && !flag.b05_ramiro_huevo', new: 'true', talk: [{ script: 'b05_ramiro' }] },
				{ label: 'La pizarra de Kukui', icon: '📝', cond: LAB, talk: [{ script: 'b05_pizarra' }] },
			],
		},

		// ---------- Escuela de Entrenadores ----------
		escuela_entrenadores: {
			name: 'Escuela de Entrenadores de Hauoli', short: 'Escuela de Entrenadores', parent: 'hauoli', kind: 'gym',
			bg: { type: 'gym', wall: '#e9d8a6', floor: '#c4a46a' },
			desc: 'Un edificio de dos plantas con pupitres de madera, una pizarra que no se borra del todo y un patio de tierra con líneas de cal: el campo de combate. En la puerta, una placa: «Aquí empezó el capitán **Liam**». Debajo, más pequeño, alguien ha escrito: «y nos lo recuerda cada vez que viene».\n\nLos alumnos de último curso se pelean por combatir contra los aspirantes de la Gira. La directora lo permite «por motivos pedagógicos».',
			descNight: 'De noche, la Escuela está cerrada, pero el patio no: los alumnos mayores se cuelan por la valla para combatir a la luz de las farolas. La directora lo sabe. La directora, de hecho, deja la valla floja a propósito.',
			mapNote: 'Entrenamiento (nivel recomendado 57) · premio de la directora',
			spots: [
				{ label: 'Combatir en el patio', sub: 'Entrenamiento (nivel recomendado 57)', icon: '🏫', action: { training: { cap: 57, prize: { wins: 3, script: 'b05_premio_escuela' }, trainers: ['escuela_1', 'escuela_2', 'escuela_3', 'escuela_4'], wild: [{ sp: 'gumshoos', lv: [54, 56] }, { sp: 'toucannon', lv: [54, 56] }, { sp: 'hariyama', lv: [55, 57] }], coach: 'La directora de la Escuela', closed: 'La directora mira a tu equipo por encima de las gafas y tacha algo en su lista. «Aprobado. Con nota. Aquí ya no les queda nada que aprender, salvo a llegar tarde, y eso lo saben hacer solos. Vayan a ver a Kaudan».' } } },
				{ label: 'Alumno: Keoni', sub: 'Repasa una chuleta de tipos escrita en el brazo', icon: '⚔️', action: { trainer: 'escuela_1' } },
				{ label: 'Profesora: Iolana', sub: 'Corrige exámenes con un boli rojo y una sonrisa peligrosa', icon: '⚔️', action: { trainer: 'escuela_2' } },
				{ label: 'La placa de la puerta', icon: '🪧', talk: [{ script: 'b05_escuela_placa' }] },
			],
		},

		// =================== RUTA 1 ===================
		alola_ruta1: {
			name: 'Ruta 1', region: 'alola', kind: 'route', map: { x: 16, y: 26 },
			bg: { type: 'route', flowers: '#e98aa8', far: '#5aa36b' },
			desc: 'Un camino de tierra roja que sube desde las afueras de Hauoli hacia el interior de la isla, entre hierba alta, flores de hibisco y casitas con el tejado de chapa. A la izquierda, abajo, el mar. A la derecha, el monte.\n\nArriba del todo, entre árboles, **Pueblo Lilii**.',
			descNight: 'De noche, la Ruta 1 es un camino de grillos y luciérnagas. Las casitas tienen la luz del porche encendida y alguien cocina con ajo. Los Ariados tejen entre los hibiscos y los Raticate cruzan el camino sin mirar.',
			links: ['hauoli', 'lilii'],
			enterCond: LAB,
			blockedMsg: 'Un niño con un Yungoos en brazos te corta el paso a la salida de la ciudad. «¡El profe Kukui dice que los de la Gira pasan primero por su lab! ¡Está en la playa! ¡Me dio un dulce por decírtelo a todos!» Te enseña el dulce. Se lo come. Se va corriendo.',
			mapNote: 'Camino a Pueblo Lilii · árbol de bayas',
			rumors: [
				{ text: 'En la cuesta de la Ruta 1 hay un árbol de bayas que no es de nadie. Bueno, es de los Pikipek. Pero lo comparten si no los miras a los ojos.' },
				{ text: 'Dicen que de noche los Rockruff de la ladera aúllan a la luna, y que algunos, al crecer, le aúllan también al sol. Depende de a qué hora los pilles.' },
				{ cond: RECEP, text: 'Un Tauros con la cabeza llena de flores lleva una semana paseando por la cuesta, desorientado, como si buscara una valla que no está. En Alola, dicen, nunca habían visto uno así.' },
			],
			route: {
				from: 'hauoli', to: 'lilii', length: 7, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Las afueras de Hauoli: las últimas casas, una gasolinera con un Snorlax dormido de cartón en la puerta y la cuesta que empieza. El mar queda a tu izquierda, cada vez más abajo.' }],
					1: [
						{ trainer: 'a1_kalani' },
						{ item: 'greatball', n: 3 },
					],
					2: [
						{ text: 'Una casita con un letrero pintado a mano: «Se venden huevos. Se compran Pokémon perdidos. Se cuentan chismes». La puerta está abierta y no hay nadie.' },
						{ talk: [{ cond: 'flag.b05_vecina_r1', script: 'b05_vecina_r1_2' }, { script: 'b05_vecina_r1' }], label: 'Una vecina en el porche', sub: 'Pela mangos con un cuchillo enorme', icon: '🥭' },
					],
					3: [
						{ spot: { action: { gather: 'arbol_ruta1' } }, label: 'El árbol de bayas de la cuesta', sub: 'Los Pikipek lo vigilan', icon: '🌳' },
						{ trainer: 'a1_pilipo', optional: true, label: 'Un pescador que sube a pie, con la caña al hombro' },
					],
					4: [
						{ text: 'Una curva con vistas: abajo, Hauoli entera, el Paseo, la Puerta como una moneda de plata junto al muelle. Si entrecierras los ojos, se ve hasta el escenario de la Gira.' },
						{ item: 'hyperpotion', hidden: true },
					],
					5: [
						{ trainer: 'a1_noelani' },
						{ text: 'En el borde del camino, un cartel de madera de los antiguos: «Recorrido insular · Pueblo Lilii → arriba». Alguien ha pegado encima una pegatina azul y plata: «y Circuito Infinito».' },
					],
					6: [
						{ item: 'revive' },
						{ text: 'Los árboles se cierran sobre el camino. Se oye un tambor a lo lejos, despacio, y risas. Muchas risas. Una de ellas, enorme.' },
					],
					7: [
						{ text: 'Un arco de madera tallada con figuras de Pokémon: la entrada a **Pueblo Lilii**.' },
						{ item: 'rarecandy', hidden: true },
					],
				},
				encounters: {
					grass: [
						{ sp: 'gumshoos', lv: [50, 53], w: 25, time: 'day' },
						{ sp: 'raticatealola', lv: [50, 53], w: 25, time: 'night' },
						{ sp: 'toucannon', lv: [51, 53], w: 18 },
						{ sp: 'ledian', lv: [50, 52], w: 14, time: 'day' },
						{ sp: 'ariados', lv: [50, 52], w: 14, time: 'night' },
						{ sp: 'charjabug', lv: [50, 52], w: 12 },
						{ sp: 'lopunny', lv: [51, 53], w: 10 },
						{ sp: 'butterfree', lv: [50, 52], w: 8, time: 'day' },
						{ sp: 'sudowoodo', lv: [51, 53], w: 6 },
						{ sp: 'lycanroc', lv: [52, 54], w: 3, time: 'day' },
						{ sp: 'lycanrocmidnight', lv: [52, 54], w: 3, time: 'night' },
						{ sp: 'snorlax', lv: [53, 55], w: 2 },
						{ sp: 'tauros', lv: [51, 53], w: 4, displaced: true },
					],
				},
			},
		},

		// =================== PUEBLO LILII ===================
		lilii: {
			name: 'Pueblo Lilii', short: 'Lilii', region: 'alola', kind: 'town', map: { x: 14, y: 14 },
			bg: { type: 'town', roofs: ['#8a5a3a', '#c4a46a', '#5aa36b'], far: '#3a7a4a' },
			desc: 'Un pueblo pequeño en lo alto de Melemele, entre árboles enormes: casas de madera sobre pilotes, faroles de papel y, en medio, un **escenario de madera** cuadrado, sin techo, donde se celebran los festivales… y los combates que importan.\n\nAl fondo empieza la **Senda Mahalo**, que sube hacia las ruinas del guardián de la isla. En el pueblo vive el kahuna, **Kaudan**: se le encuentra por la risa.',
			descNight: 'De noche, Lilii enciende los faroles de papel y el escenario de madera brilla en medio del pueblo como un barco varado. Kaudan suele sentarse en el borde con los pies colgando, mirando hacia la Senda Mahalo, sin reírse. Es la única hora del día en que no se ríe.',
			descs: [{ cond: 'beat("kaudan_gp")', text: 'Pueblo Lilii, en lo alto de la isla. En el escenario de madera todavía se ven las marcas de tu Gran Prueba: dos tablas astilladas que Kaudan se niega a cambiar («son un recuerdo; los recuerdos no se cambian, se pisan con cuidado»).\n\nKiyo y él siguen discutiendo, ahora sobre quién de los dos entrena más horas. Ninguno entrena mientras discute.' }],
			mapNote: 'Kahuna Kaudan (Lucha) · Gran Prueba de Melemele · Senda Mahalo',
			onEnter: [{ script: 'b05_lilii_llegada', cond: '!' + LILII, once: true }],
			spots: [
				{ label: 'Centro Pokémon', sub: 'Una caseta de madera con una enfermera y un Comfey en la ventana', action: { center: true } },
				{ label: 'Kaudan', sub: 'Una montaña de hombre, sentado en el borde del escenario', icon: '🥋', new: '(' + GRAN + ') && !beat("kaudan_gp")', talk: [
					{ cond: GRAN + ' && !flag.b05_pulsera_z', script: 'b05_pulsera' },
					{ cond: 'flag.b05_pulsera_z && !beat("kaudan_gp")', script: 'b05_gran_prueba' },
					{ cond: 'beat("kaudan_gp")', script: 'b05_kaudan_despues' },
					{ script: 'b05_kaudan_espera' },
				] },
				{ label: 'Kiyo', sub: 'Practica katas delante de un árbol. El árbol, por ahora, aguanta', icon: '🥋', cond: LILII, talk: [{ cond: 'beat("kaudan_gp")', script: 'b05_kiyo_despues' }, { script: 'b05_kiyo_lilii' }] },
				{ label: 'El escenario de madera', icon: '🪵', talk: [{ script: 'b05_escenario_lilii' }] },
			],
			rumors: [
				{ text: 'Kaudan fue luchador antes que kahuna, y kahuna antes que abuelo. Dice que lo más difícil de los tres es lo de abuelo, porque no hay árbitro.' },
				{ text: 'En la Senda Mahalo hay un puente de tablas colgado sobre un barranco. Los del pueblo lo cruzan sin mirar. Los turistas lo cruzan mirando. Los que miran tardan más.' },
				{ text: 'El guardián de Melemele se llama **Tapu Koko**. No baja casi nunca. Cuando baja, dicen, deja algo. Y cuando deja algo, siempre es a alguien que no lo esperaba.' },
				{ cond: LILII, text: 'Ese señor de Kanto que vino a visitar a Kaudan, el del pelo de punta, se ha comido catorce malasadas en dos días y no ha dicho más de veinte palabras. Kaudan dice que eso, en él, es estar contentísimo.' },
			],
		},

		// =================== RUTA 2 ===================
		alola_ruta2: {
			name: 'Ruta 2', region: 'alola', kind: 'route', map: { x: 30, y: 30 },
			bg: { type: 'route', flowers: '#f2c84a', far: '#4a8a5a' },
			desc: 'Sale de Hauoli hacia el norte, bordea el **cementerio** y sube por colinas de hierba alta con huertos de bayas y vallas de madera. A media cuesta hay un **Centro Pokémon** con motel, de los de carretera.\n\nAl final, entre rocas, la boca de la **Cueva Sotobosque**.',
			descNight: 'De noche, la Ruta 2 es más silenciosa de lo que debería. Junto al cementerio flotan luces pequeñas que no son luciérnagas, y el motel del Centro Pokémon tiene el letrero de «Hay habitaciones» parpadeando, al que le falta la H.',
			links: ['hauoli', 'cueva_sotobosque'],
			enterCond: LILII,
			blockedMsg: 'Al pie de la cuesta, un vecino con sombrero de paja barre la entrada del camino. «Alto, alto. ¿De la Gira? Por aquí se va a la cueva del capitán, pero el capitán no recibe a nadie que no le mande el kahuna. Sube antes a **Pueblo Lilii**, por la Ruta 1. Kaudan es el que manda. Bueno. Él dice que manda la isla. Pero la isla no habla».',
			mapNote: 'Cementerio · Centro Pokémon · huertos · Cueva Sotobosque',
			rumors: [
				{ text: 'En los huertos de la Ruta 2 los Crabrawler se suben a los árboles de bayas a pegarles puñetazos hasta que caen. Las bayas. Los Crabrawler también, a veces.' },
				{ text: 'El motel del Centro Pokémon de la Ruta 2 tiene diez habitaciones. La seis no se alquila nunca. La recepcionista dice que no pasa nada raro. Lo dice muy rápido.' },
				{ cond: LILII, text: 'Un Hypno que brilla como si estuviera hecho de cristal anda por las colinas desde que abrió la Puerta. Los niños del huerto lo llaman «el Hypno de azúcar». Nadie se le acerca. Por si acaso.' },
				{ cond: LILII, text: 'Unos chavos con gorra y pañuelo de calavera rondan la Ruta 2. Dicen que eran del Team Skull, que el Team Skull ya no existe y que ahora «trabajan». Nadie sabe de qué. Ellos tampoco lo dicen.' },
			],
			route: {
				from: 'hauoli', to: 'cueva_sotobosque', length: 7, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Las últimas casas de Hauoli. A la derecha, tras una verja baja, el **cementerio**: lápidas blancas entre flores frescas y conchas. Huele a incienso y a mar.' }],
					1: [
						{ trainer: 'a2_lani' },
						{ spot: { action: { gather: 'hojas_cementerio' } }, label: 'Un montón de hojas junto a la verja del cementerio', icon: '🍂' },
					],
					2: [
						{ text: 'Colinas de hierba alta, con vallas de madera que no sirven para nada: los Tauros de por aquí las saltan y los Gumshoos pasan por debajo.' },
						{ item: 'ultraball', n: 2 },
					],
					3: [
						{ text: 'Un huerto de bayas con un cartel: «No pegarle a los árboles». Debajo, más pequeño: «Esto va por los Crabrawler».' },
						{ spot: { action: { gather: 'huerto_ruta2' } }, label: 'Los árboles del huerto', sub: 'Un Crabrawler entrena con el tronco', icon: '🍒' },
					],
					4: [
						{ trainer: 'a2_skull', optional: true, label: 'Dos chavos con gorra y pañuelo de calavera, sentados en una valla' },
						{ item: 'fullheal', hidden: true },
					],
					5: [
						{ text: 'Un **Centro Pokémon** de carretera, con motel y una máquina de refrescos que da cambio de más. La enfermera dice que los de la Gira se paran todos aquí antes de la cueva. «El capitán es muy simpático. Y muy exigente. Mucho. Las dos cosas mucho».' },
						{ spot: { action: { center: true } }, label: 'Centro Pokémon de la Ruta 2', icon: '🏥' },
					],
					6: [
						{ trainer: 'a2_kekoa' },
						{ item: 'maxrepel' },
					],
					7: [
						{ text: 'Rocas grandes, un riachuelo y, entre dos peñas cubiertas de musgo, la boca oscura de la **Cueva Sotobosque**. Alguien ha puesto una cuerda con banderitas de colores y un cartel: «Prueba del capitán. Pase sin miedo. Pase arreglado».' },
						{ item: 'leftovers', hidden: true },
					],
				},
				encounters: {
					grass: [
						{ sp: 'hypno', lv: [51, 53], w: 20 },
						{ sp: 'hariyama', lv: [51, 53], w: 18 },
						{ sp: 'arbok', lv: [50, 52], w: 16 },
						{ sp: 'fearow', lv: [50, 52], w: 14 },
						{ sp: 'ribombee', lv: [50, 52], w: 12, time: 'day' },
						{ sp: 'kadabra', lv: [50, 52], w: 8 },
						{ sp: 'smeargle', lv: [51, 53], w: 8 },
						{ sp: 'growlithe', lv: [50, 52], w: 6 },
						{ sp: 'persianalola', lv: [50, 52], w: 10, time: 'night' },
						{ sp: 'dunsparce', lv: [52, 54], w: 3 },
						{ sp: 'hypno', lv: [53, 55], w: 3, gimmick: 'tera', tera: 'Fairy' },
						{ sp: 'sawsbuck', lv: [51, 53], w: 4, displaced: true },
					],
				},
			},
		},

		// =================== CUEVA SOTOBOSQUE ===================
		cueva_sotobosque: {
			name: 'Cueva Sotobosque', region: 'alola', kind: 'cave', map: { x: 36, y: 20 },
			bg: { type: 'cave', crystals: '#8ad8a6' },
			desc: 'Una cueva poco profunda, de techo bajo y suelo de tierra, con raíces que bajan del techo como cortinas. La luz entra por agujeros del monte y cae en charcos verdes sobre el musgo.\n\nPor todas partes hay **madrigueras**: agujeros redondos del tamaño de un puño, del tamaño de una cabeza, del tamaño de algo mucho mayor. Al fondo, unas rocas grandes cierran el paso a la madriguera más honda. Ahí vive el **Pokémon dominante** de la prueba.',
			descNight: 'De noche, la cueva cambia de dueños: los Gumshoos se van a dormir y salen los Raticate, gordos y de bigote negro, que corren por las paredes como si fueran suelo. Los charcos de luz se vuelven de luna.',
			descs: [{ cond: 'flag.b05_liam_hecha', text: 'La Cueva Sotobosque, tranquila. Las rocas del fondo están apartadas y la madriguera grande está vacía: el dominante se ha mudado a una más pequeña «por pura dignidad», dice Liam.\n\nLas raíces siguen colgando del techo. Los charcos de luz siguen cayendo sobre el musgo.' }],
			links: ['alola_ruta2'],
			mapNote: 'Prueba del capitán Liam (Normal) · madrigueras',
			rumors: [
				{ text: 'La prueba de Liam siempre tiene tres partes: la que te dice, la que no te dice y la que te dice que no es una parte. Los que la pasan dicen que la tercera es la peor.' },
				{ text: 'El dominante de la cueva es un Gumshoos de día y un Raticate de noche. No son el mismo. No se llevan bien. Liam dice que «comparten piso».' },
			],
			encounters: {
				cave: [
					{ sp: 'golbat', lv: [51, 53], w: 28 },
					{ sp: 'dugtrioalola', lv: [51, 53], w: 24 },
					{ sp: 'gumshoos', lv: [51, 53], w: 16, time: 'day' },
					{ sp: 'raticatealola', lv: [51, 53], w: 16, time: 'night' },
					{ sp: 'noivern', lv: [52, 54], w: 8 },
					{ sp: 'crobat', lv: [53, 55], w: 3, time: 'night' },
					{ sp: 'onix', lv: [51, 53], w: 5, displaced: true },
				],
			},
			spots: [
				{ label: 'Liam', sub: 'Se peina en el reflejo de un charco', icon: '✨', cond: '!beat("liam_1")', new: 'true', talk: [{ script: 'b05_liam_reto' }] },
				{ label: 'Prueba de Liam: el fondo de la cueva', sub: 'Las rocas cierran la madriguera grande', icon: '🕳️', cond: 'beat("liam_1") && !flag.b05_liam_hecha', new: 'true', talk: [{ script: 'b05_liam_prueba' }] },
				{ label: 'Liam', sub: 'Pule un cristal con un pañuelo de seda', icon: '✨', cond: 'flag.b05_liam_hecha', talk: [{ script: 'b05_liam_despues' }] },
				{ label: 'Explorar las galerías', icon: '🦇', action: { explore: 'cave' } },
				{ label: 'Madrigueras abandonadas', sub: 'Agujeros redondos en la pared de tierra', icon: '⛏️', action: { gather: 'madrigueras_sotobosque' } },
			],
		},
	},

	// =====================================================================
	// PARCHES A LUGARES DE BLOQUES ANTERIORES (cruzar con la Gira)
	// =====================================================================
	patches: {
		puerta_azafran: { spots: [A_CRUZAR] },
		luminalia_plaza: { spots: [A_CRUZAR] },
		puerta_trigal: { spots: [A_CRUZAR] },
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Capitán Liam (antes de su prueba) -----
		liam_1: { name: 'Liam', cls: 'Capitán', npc: 'liam', ai: 4, iv: 27, reward: 1650, terrain: 'cave',
			team: [
				{ sp: 'furfrou', lv: 53, moves: ['takedown', 'bite', 'uturn', 'thunderwave'], ability: 'furcoat', nature: 'impish', iv: 26 },
				{ sp: 'stoutland', lv: 54, moves: ['takedown', 'crunch', 'playrough', 'wildcharge'], ability: 'intimidate', nature: 'adamant', iv: 27 },
				{ sp: 'lopunny', lv: 54, moves: ['return', 'lowkick', 'icepunch', 'quickattack'], ability: 'limber', item: 'sitrusberry', nature: 'jolly', iv: 27 },
				{ sp: 'gumshoos', lv: 55, moves: ['superfang', 'crunch', 'earthquake', 'bodyslam'], ability: 'adaptability', item: 'silkscarf', nature: 'adamant', iv: 29 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Antes de la prueba, un combate. No es obligatorio por el reglamento: es obligatorio por educación. Me gusta saber a quién le abro mi cueva. ¡En guardia, y con estilo!',
			win: 'Impecable. No, de verdad: impecable. Lo digo poco. Lo digo casi nunca. Me duele un poco decirlo.',
			lose: 'Un combate es como un peinado: si no sale a la primera, se moja y se vuelve a empezar. Vuelve cuando quieras.' },

		// ----- Kahuna Kaudan (Gran Prueba de Melemele) -----
		kaudan_gp: { name: 'Kaudan', cls: 'Kahuna', npc: 'kaudan', ai: 4, iv: 29, reward: 3420, terrain: 'gym', bg: 'gym',
			gimmick: 'z', ace: 'crabominable',
			team: [
				{ sp: 'primeape', lv: 54, moves: ['closecombat', 'uturn', 'stoneedge', 'icepunch'], ability: 'defiant', nature: 'jolly', iv: 28 },
				{ sp: 'poliwrath', lv: 55, moves: ['liquidation', 'drainpunch', 'icepunch', 'hypnosis'], ability: 'waterabsorb', item: 'expertbelt', nature: 'adamant', iv: 28 },
				{ sp: 'bewear', lv: 55, moves: ['hammerarm', 'doubleedge', 'shadowclaw', 'payback'], ability: 'fluffy', item: 'sitrusberry', nature: 'adamant', iv: 28 },
				{ sp: 'hariyama', lv: 56, moves: ['closecombat', 'heavyslam', 'knockoff', 'fakeout'], ability: 'thickfat', item: 'leftovers', nature: 'adamant', iv: 29 },
				{ sp: 'crabominable', lv: 57, moves: ['closecombat', 'icehammer', 'liquidation', 'earthquake'], ability: 'ironfist', item: 'fightiniumz', nature: 'adamant', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: '¡Jo, jo, jo! ¡Esto es la Gran Prueba de Melemele! Aquí no se pelea contra mí: se pelea contra la isla, y la isla soy yo con hambre. ¡Que se oiga desde Akala!',
			win: '¡JO, JO, JO! ¡Me has tumbado, y en mi propio escenario! Ay, qué gusto. Hacía años que no me dolía tan bonito.',
			lose: '¡Jo, jo! Hoy ha ganado la isla. Mañana a lo mejor ganas tú. La isla tiene paciencia. Y malasadas.' },

		// ----- Escuela de Entrenadores (zona de entrenamiento, tope 57) -----
		escuela_1: { name: 'Keoni', cls: 'Alumno', ai: 2, reward: 1650,
			team: [
				{ sp: 'komala', lv: 54, moves: ['woodhammer', 'suckerpunch', 'earthquake', 'rapidspin'] },
				{ sp: 'toucannon', lv: 55, moves: ['beakblast', 'bulletseed', 'rockblast', 'roost'] },
			],
			intro: 'Me sé la tabla de tipos entera. Bueno, la tengo escrita en el brazo, que es casi lo mismo. ¡Examen sorpresa!',
			win: 'Se me ha borrado el Hada con el sudor. Eso no cuenta.',
			look: { hair: 'spiky', hairColor: '#2a2420', outfit: '#e9e3d0', outfit2: '#3a7a8a', skin: 4, eyesStyle: 'happy', mouth: 'grin' } },
		escuela_2: { name: 'Iolana', cls: 'Profesora', ai: 3, reward: 1700,
			team: [
				{ sp: 'mrmime', lv: 55, moves: ['psychic', 'dazzlinggleam', 'reflect', 'lightscreen'] },
				{ sp: 'alakazam', lv: 56, moves: ['psychic', 'shadowball', 'focusblast', 'energyball'] },
			],
			intro: 'Les pongo un problema: tienen un Lucario, una profesora con prisa y un Alakazam. ¿Qué pasa primero? Respuesta: el combate.',
			win: 'Un diez. No se lo digan a nadie; me arruinan la fama.',
			look: { hair: 'bun', hairColor: '#3a2a1e', outfit: '#c4743a', outfit2: '#e9e3d0', skin: 3, eyesStyle: 'sharp', mouth: 'smile', acc: 'glasses' } },
		escuela_3: { name: 'Makoa', cls: 'Monitor', ai: 3, reward: 1700,
			team: [
				{ sp: 'pangoro', lv: 55, moves: ['drainpunch', 'crunch', 'bulletpunch', 'gunkshot'] },
				{ sp: 'hariyama', lv: 56, moves: ['closecombat', 'heavyslam', 'knockoff', 'icepunch'] },
			],
			intro: 'Yo doy Educación Física. Mis alumnos dicen que es la asignatura más difícil. Mis alumnos tienen razón. ¡Calentamos!',
			win: 'Diez vueltas al patio. Yo, no tú. Por perder. Así es la Escuela.',
			look: { hair: 'short', hairColor: '#1a1a1a', outfit: '#c4473a', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'sharp', mouth: 'grin', acc: 'headphones' } },
		escuela_4: { name: 'Pualani', cls: 'Exalumna', ai: 3, reward: 1750,
			team: [
				{ sp: 'ribombee', lv: 55, moves: ['dazzlinggleam', 'bugbuzz', 'quiverdance', 'energyball'] },
				{ sp: 'oricoriopompom', lv: 56, moves: ['revelationdance', 'hurricane', 'calmmind', 'roost'] },
				{ sp: 'lycanroc', lv: 57, moves: ['stoneedge', 'accelerock', 'crunch', 'drillrun'], ability: 'sandrush' },
			],
			intro: 'Saqué la nota más alta de mi promoción. La segunda más alta la sacó Liam, y aún no me lo perdona. Ven, que me aburro.',
			win: 'Hmm. Liam diría que lo he hecho «casi impecable». Le odio un poco por eso.',
			look: { hair: 'long', hairColor: '#2a2420', outfit: '#e98aa8', outfit2: '#e9e3d0', skin: 3, eyesStyle: 'happy', mouth: 'smile', acc: 'flower' } },

		// ----- Ruta 1 -----
		a1_kalani: { name: 'Kalani', cls: 'Aspirante', ai: 2,
			team: [
				{ sp: 'raichualola', lv: 52, moves: ['thunderbolt', 'psychic', 'surf', 'nastyplot'] },
				{ sp: 'lopunny', lv: 53, moves: ['return', 'lowkick', 'icepunch', 'bounce'] },
			],
			intro: '¡Ocho medallas y me mandan a una isla a hacer pruebas otra vez! Como repetir curso pero con playa. ¡Por lo menos, combatamos!',
			win: 'Mi Raichu flota. Yo, no. Por eso pierdo, seguro.',
			look: { hair: 'ponytail', hairColor: '#4a2a1a', outfit: '#3a7aa8', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'happy', mouth: 'open' } },
		a1_pilipo: { name: 'Pilipo', cls: 'Pescador', ai: 2,
			team: [
				{ sp: 'pelipper', lv: 52, moves: ['hurricane', 'scald', 'roost', 'uturn'] },
				{ sp: 'malamar', lv: 53, moves: ['superpower', 'nightslash', 'psychocut', 'topsyturvy'] },
				{ sp: 'slowbro', lv: 53, moves: ['scald', 'psychic', 'slackoff', 'icebeam'] },
			],
			intro: 'Subo a pescar al río de Lilii porque en el muelle hay mucha gente de la Puerta. Ahora también hay gente de la Puerta en el río. ¡En guardia!',
			win: 'Ya está. Me bajo otra vez al muelle. Por lo menos allí hay malasadas.',
			look: { hair: 'cap', hairColor: '#4a3a2a', outfit: '#5a8a5a', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'sleepy', mouth: 'flat', capColor: '#3a6a8a' } },
		a1_noelani: { name: 'Noelani', cls: 'Excursionista', ai: 2,
			team: [
				{ sp: 'sudowoodo', lv: 53, moves: ['woodhammer', 'rockslide', 'suckerpunch', 'earthquake'] },
				{ sp: 'lycanrocmidnight', lv: 54, moves: ['stoneedge', 'crunch', 'counter', 'firefang'] },
			],
			intro: 'Llevo treinta años subiendo esta cuesta. Antes había un camino. Ahora hay un camino, una pegatina azul y un montón de gente con prisa. ¡Vamos a ver qué traes!',
			win: 'Bueno. Los de la pegatina azul, por lo menos, saben pelear.',
			look: { hair: 'short', hairColor: '#a8a49a', outfit: '#8a5a2f', outfit2: '#e9c46a', skin: 4, eyesStyle: 'narrow', mouth: 'smile', acc: 'hat', hatColor: '#c9a66b' } },

		// ----- Ruta 2 -----
		a2_lani: { name: 'Lani', cls: 'Médium', ai: 2,
			team: [
				{ sp: 'drifblim', lv: 52, moves: ['shadowball', 'hex', 'willowisp', 'airslash'] },
				{ sp: 'mimikyu', lv: 54, moves: ['playrough', 'shadowclaw', 'shadowsneak', 'swordsdance'] },
			],
			intro: 'Los del cementerio me dicen que hay una Puerta nueva y que no les gusta el zumbido. Que no les deja descansar. Me han pedido que te lo diga. Y que te pegue un poco.',
			win: 'Dicen que vale. Que se lo tomarán con calma. Tienen todo el tiempo del mundo.',
			look: { hair: 'long', hairColor: '#1a1a2a', outfit: '#4a3a6a', outfit2: '#e9e3d0', skin: 3, eyesStyle: 'sleepy', mouth: 'flat', acc: 'flower' } },
		a2_skull: { name: 'Tiki y Pono', cls: 'Reclutas Skull', npc: 'recluta_skull', ai: 2,
			team: [
				{ sp: 'golbat', lv: 52, moves: ['poisonfang', 'crunch', 'airslash', 'confuseray'] },
				{ sp: 'mukalola', lv: 53, moves: ['knockoff', 'gunkshot', 'snarl', 'protect'] },
				{ sp: 'salazzle', lv: 54, moves: ['flamethrower', 'sludgebomb', 'dragonpulse', 'nastyplot'] },
			],
			intro: '¡Yo, yo! El Team Skull se acabó hace años, ¿sí? Nadie nos pagaba. Ahora alguien nos paga. ¡Shhh! No lo digas. Peleamos gratis, eso sí. Por nostalgia.',
			win: '¡Ugh! Bueno. Por lo menos ahora tenemos seguro médico. Creo. ¿Tenemos, Pono?',
			lose: '¡Yo! ¡Todavía lo tenemos! ¡El estilo no se despide!' },
		a2_kekoa: { name: 'Kekoa', cls: 'Karateka', ai: 2,
			team: [
				{ sp: 'hitmontop', lv: 53, moves: ['closecombat', 'tripleaxel', 'suckerpunch', 'rapidspin'] },
				{ sp: 'crabominable', lv: 54, moves: ['closecombat', 'icehammer', 'payback', 'thunderpunch'] },
			],
			intro: 'Entreno con Kaudan desde los seis años. Ahora tengo treinta. Me dice que todavía no estoy listo. Para qué, no me lo dice. ¡HU!',
			win: 'Ya entiendo. Para esto no estaba listo. ¡Gracias por la lección! ¡HA!',
			look: { hair: 'short', hairColor: '#1a1a1a', outfit: '#e9e8e0', outfit2: '#c4473a', skin: 4, acc: 'bandana', eyesStyle: 'sharp', mouth: 'grin' } },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== INICIO: LA CONVOCATORIA ===================
		b05_inicio: [
			{ if: 'flag.b05_inicio_hecho', then: [{ end: true }] },
			{ set: { 'flag.b05_inicio_hecho': true } },
			{ quest: 'b05_m1', stage: 'puerta' },
			{ say: 'rotom', text: '¡Bzzt! ¡Aviso nuevo de la Gira! Te lo leo con voz de anuncio: «Para los participantes clasificados de la temporada: **la Gira Interregional continúa en Alola**. Salida por la **Puerta Lemnis de Kanto**, en Ciudad Azafrán. Recepción en Ciudad Hauoli. Traje de baño opcional».' },
			{ say: 'rotom', text: '¡ALOLA! Islas, playas, volcanes… y Pokémon que en otras regiones son de otra forma. ¡Un Exeggutor con cuello de palmera! ¡Un Vulpix de nieve en una isla de playa! ¡Mis sensores se van a hacer un lío precioso!' },
			{ text: '{riolu} levanta la cabeza al oír la palabra «Puerta». No se tensa como antes; solo escucha. Como quien ya conoce el camino y aún no sabe si le gusta.', cond: LUC },
			{ choice: [
				{ text: 'Ir ya a la Puerta de Kanto', then: [{ call: 'b05_cruce' }] },
				{ text: 'Todavía no (preparar el equipo)', then: [
					{ say: 'rotom', text: '¡Va! La Gira sale cuando estemos todos, y nosotros somos parte de todos. Cuando quieras, vamos a la **Puerta de Kanto**, en Azafrán. Desde Luminalia o Trigal también se llega: por su Puerta.' },
				] },
			] },
		],
		b05_cruce_aviso: [
			{ text: 'Los aspirantes de la Gira hacen cola delante de la lemniscata con mochilas, gorras y toallas al hombro. Un técnico de Lemnis reparte collares de flores de plástico. Le pone uno a {riolu}. {riolu} lo mira como se mira una ofensa.', cond: LUC },
			{ text: 'Los aspirantes de la Gira hacen cola delante de la lemniscata con mochilas, gorras y toallas al hombro. Un técnico de Lemnis reparte collares de flores de plástico.', cond: '!(' + LUC + ')' },
			{ choice: [
				{ text: 'Cruzar a Alola', then: [{ call: 'b05_cruce' }] },
				{ text: 'Todavía no', then: [{ say: 'rotom', text: 'Ok. Pero que conste que el collar de flores ya me lo he puesto. En la pantalla. Es una animación.' }] },
			] },
		],

		// =================== EL CRUCE (cinemática) ===================
		b05_cruce: [
			{ if: 'flag.b05_puerta_alola', then: [{ end: true }] },
			{ go: 'puerta_azafran', silent: true },
			{ cutscene: { bg: { type: 'plaza', landmark: 'gate' }, start: 'fade', time: 'dia', cam: 'still', frames: [
				{ cam: 'still', text: 'La Puerta de Kanto, a primera hora. Treinta aspirantes de la Gira, cada uno con sus ocho medallas y su toalla. La lemniscata zumba más fuerte que nunca: al otro lado, en vez de Luminalia o Trigal, se ve **arena**.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.36, enter: 'left' }], cond: LUC, cam: 'push', text: '{riolu} da el primer paso antes que tú. Sin miedo. Las orejas, eso sí, de punta.' },
				{ fx: ['rays', 'flash'], cam: 'push', text: 'Cruzas. Luz. El estómago se te queda un segundo en Kanto y luego te alcanza.' },
				{ say: 'rotom', fx: 'shake', shake: 1, cam: 'still', text: '…bzzt… sincronizando… sincronizando… …sincronizando…' },
				{ say: 'rotom', cam: 'still', text: '…¡ya! ¡Ya, ya, ya! ¡Hola! Perdón. Tercera vez que me pasa en una Puerta. Ya casi es tradición. ¿Hemos llegado? ¿Hace calor? ¡Hace calor!' },
				{ bg: { type: 'coast', far: '#7fc4d8', ground: '#e9d8a6' }, fx: 'wipe', weather: 'petals', big: true, text: 'Ciudad Hauoli', sub: 'Isla Melemele · Alola', hold: 2400, cam: 'still' },
				{ fx: 'light', cam: 'pull', text: 'Sol. Muchísimo sol. Un paseo de baldosas blancas, palmeras, el mar de un azul que parece retocado. A tu derecha, un escenario con banderines azul y plata y unos técnicos probando micrófonos: «sí, sí, probando, sí».' },
				{ actors: [{ key: 'rio', do: 'hop', emote: '!' }], cond: LUC, cam: 'push', text: '{riolu} olfatea el aire: sal, flores, aceite caliente. Se le escapa la cola de un lado a otro. Es la primera vez que ves a {riolu} sonreír con la nariz.' },
			] } },
			{ set: { 'flag.b05_puerta_alola': true } },
			{ quest: 'b05_m1', stage: 'hauoli' },
			{ go: 'hauoli' },
		],
		b05_llegada: [
			{ set: { 'flag.b05_llegada': true } },
			{ text: 'Una chica de la Gira con chanclas, camiseta azul y una carpeta te pone un collar de flores de verdad (huele a hibisco) y te despega del montón de aspirantes con una sonrisa profesional.' },
			{ text: '«¡Alola! La recepción es en el **Paseo Marítimo**, junto a la Puerta, dentro de media hora. Mientras, pueden dar una vuelta. ¡No se alejen mucho! ¡Y no se coman todas las malasadas antes del discurso!»' },
			{ say: 'rotom', text: '¡Bzzt! ¿Qué es una malasada? ¿Se puede comer con la pantalla? Necesito saberlo. Necesito saberlo AHORA.' },
		],

		// =================== RECEPCIÓN DE LA GIRA ===================
		b05_recepcion: [
			{ set: { 'flag.b05_recepcion': true } },
			{ text: 'El Paseo Marítimo está lleno. Aspirantes de la Gira con collares de flores, vecinos curiosos, un Pikachu robando una malasada a un niño. Según se sale de la Puerta, a la derecha, el **escenario de la Gira**, con banderines azul y plata que el viento enreda en las palmeras.' },
			{ text: 'Sube al escenario de un salto (no por la escalera: de un salto) un hombre con gorra, gafas de sol, bata blanca abierta sobre el pecho desnudo y una sonrisa del tamaño del muelle.' },
			{ say: 'kukui', text: '¡ALOLA! ¡Woo! ¡Bienvenidos a Alola, aspirantes de la Gira! Soy el **Prof. Kukui**. Investigo movimientos Pokémon, fundé la Liga de Alola y esta semana, además, soy su anfitrión. ¡Tres trabajos, un sueldo! ¡Woo!' },
			{ say: 'kukui', text: 'Aquí no hay gimnasios, ¿eh? Aquí hay **recorrido insular**: los **capitanes** ponen las **pruebas**, y al final de cada isla espera el **kahuna** con su **Gran Prueba**. La Gira y la Liga de Alola lo han firmado: cada Gran Prueba cuenta como medalla del Circuito. ¡Las islas son el gimnasio, y el gimnasio tiene playa!' },
			{ say: 'kukui', text: 'Empiecen por Melemele, que es esta. El kahuna, **Kaudan**, los espera en **Pueblo Lilii**, subiendo por la Ruta 1. Pero antes pasen por mi laboratorio, en la playa: tengo algo para cada uno. Es una pulsera. Bueno, no tengo la pulsera. Tengo la idea de la pulsera. ¡Woo!' },
			// ----- Lemnis: Sera o el directivo -----
			{ if: TRATO_ROTO, then: [
				{ text: 'Detrás de Kukui sube un hombre con traje azul brillante, sudando como si el traje fuera de lana. Lleva una tarjeta de notas en cada mano y un collar de flores que alguien le ha puesto sin consultarle.' },
				{ say: 'directivo_lemnis', as: 'Directivo de Lemnis', text: '¡Alola! —Lo pronuncia como si fuera una marca registrada—. Lemnis se enorgullece de patrocinar la llegada de la Gira a Alola. Esta tarde, además, tendremos una **charla del cielo**, a cargo de nuestro astrónomo, ¡el doctor Calder Wynn! Habrá canapés. Bueno, malasadas. Son canapés con agujero.' },
				{ text: 'Levantas la vista. En el balcón de un hotel del Paseo, a la sombra, con traje azul medianoche y gafas oscuras, está **Serafina Lemnis**. No baja. Mira hacia el mar, no hacia el escenario.' },
				{ text: 'Cuando te ve, se quita las gafas. Un segundo. Se las vuelve a poner. Y entra en el hotel sin volverse.' },
			], else: [
				{ text: 'Detrás de Kukui sube, por la escalera, una mujer joven con traje azul medianoche, melena negra recta, guantes blancos y gafas oscuras. No se ha puesto collar de flores. Nadie se ha atrevido a ofrecérselo.' },
				{ say: 'sera', text: 'Lemnis patrocina la llegada de la Gira a Alola. La Fundación Æther, nuestra socia en la región, les da también la bienvenida. —Pausa medida—. Esta tarde, el doctor **Calder Wynn**, de nuestro departamento de astronomía, les dará una **charla del cielo**. Les ruego que no se la pierdan. Él se lo tomaría como algo personal. Yo, también.' },
				{ if: SERA_TU, then: [
					{ text: 'Al bajar del escenario pasa a tu lado, sin detenerse del todo.' },
					{ say: 'sera', text: 'Una pregunta, ya que estás. La pieza que me diste en Iris. En el inventario de Lemnis pone «**en uso**». —Te mira por encima de las gafas—. ¿Tú sabes en uso de qué? Porque yo no. Y yo lo sé todo.' },
					{ choice: [
						{ text: '«No lo sé.»', then: [{ say: 'sera', text: 'Ya. Era más fácil que lo supieras. —Se ajusta un guante—. Lo averiguaré. Y te lo diré, o no. Depende de lo que sea.' }] },
						{ text: '«¿No te fías de tu propia empresa?»', then: [
							{ say: 'sera', text: 'Me fío de los inventarios. Y los inventarios no dicen «en uso» de algo que está en una caja fuerte. —Pausa—. No lo repitas.' },
							{ af: { sera: 2 } },
						] },
					] },
				] },
				{ if: '!flag.b01_trato_sera', then: [
					{ text: 'Al bajar, pasa junto a ti sin detenerse. Solo un gesto de cabeza, exacto, de un centímetro. «Señor{|a|e} {jugador}», dicen sus labios. Y sigue andando.' },
				] },
			] },
			// ----- Calder Wynn: la charla del cielo -----
			{ text: 'Por la tarde, cuando el sol baja hacia el mar, la Gira se sienta en la arena delante del escenario. Sube un hombre de unos cincuenta y tantos años: barba corta y canosa, gafas de montura fina, chaqueta de lino clara con una lemniscata pequeña en la solapa y un **telescopio plegable** colgado al hombro como una guitarra.' },
			{ say: 'calder', text: 'Buenas tardes. Me llamo Calder Wynn. Me han pedido que les hable del cielo de Alola, y es un encargo injusto, porque el cielo de Alola se explica solo. Basta con mirarlo.' },
			{ say: 'calder', text: 'Les cuento un secreto de astrónomo: la luz que ven ahí arriba es vieja. Salió de su estrella hace cientos de años, a veces miles. Cuando por fin nos llega, la estrella puede que ya no esté. —Sonríe—. Lo que miramos, casi siempre, es un recuerdo.' },
			{ say: 'calder', text: 'En Alola la gente dice que el sol y la luna tienen dueño. Que hay algo, más allá del cielo, que se come la luz y la devuelve. Es una leyenda preciosa. Yo llevo media vida intentando medirla.' },
			{ say: 'calder', text: 'Estos días, la Gira podrá ver algo **especial en el cielo**. No les diré qué: les estropearía la sorpresa, y las sorpresas son de las pocas cosas que no se pueden medir. Solo les pido una cosa. Cuando ocurra, **mírenlo**. Es lo único que le debemos a la luz.' },
			{ text: 'Aplausos en la arena. Una niña de la Gira pregunta si los Pokémon también miran las estrellas. Calder se agacha para contestarle a su altura, y tarda un buen rato.' },
			{ text: 'Al final, un ayudante de Lemnis reparte un folleto a cada uno.' },
			{ give: 'b05_folleto_cielo' },
			{ set: { 'flag.b05_calder_charla': true } },
			// ----- Alexia -----
			{ text: 'Cuando la gente se levanta, alguien te da un golpecito en el hombro con una cámara. **Alexia**, quemada por el sol, con un sombrero de paja de turista y el cuaderno de reportera en la mano.' },
			{ say: 'alexia', text: '¡Mariquita! ¡Llegaste a Alola sin que te mandara la Puerta a un bosque! Eso es un titular. Pequeño, pero titular.' },
			{ if: 'flag.b01_prensa_verdad', then: [
				{ say: 'alexia', text: 'Todavía me acuerdo de lo que contaste en Luminalia, el primer día. Fuiste la única persona que me dijo lo que vio. Desde entonces te sigo, ¿lo sabías? Profesionalmente. —Sonríe—. Bueno. No solo.' },
			] },
			{ if: 'flag.b01_prensa_lemnis', then: [
				{ say: 'alexia', text: 'Por cierto: Lemnis me ha vuelto a mandar las «preguntas sugeridas». Esta vez con un collar de flores pegado al sobre. —Lo levanta—. Me ha gustado más el collar.' },
			] },
			{ if: '!flag.b01_prensa_verdad && !flag.b01_prensa_lemnis', then: [
				{ say: 'alexia', text: 'Y sigues sin querer salir en la radio, ¿no? Me parece bien. Te pongo en la crónica de espaldas. Mariquita, de espaldas, en una playa. Misterio y bronceado.' },
			] },
			{ say: 'alexia', text: 'Me quedo unos días por Hauoli. El cielo, el astrónomo, el profesor sin camisa… Hay material para tres crónicas y una queja formal de mi espalda.' },
			// ----- Handsome -----
			{ text: 'Mientras Alexia se aleja, un turista con camisa de flores, bigote negro de los que se pegan y gafas de sol enormes se sienta a tu lado en la arena. Te ofrece una malasada sin mirarte.' },
			{ say: 'handsome', as: 'Turista', text: 'Psst. No te gires. Soy un turista. Un turista cualquiera. Que se llama de cualquier manera.' },
			{ say: 'handsome', text: '…Soy Handsome. Ya lo sabías. —Se ajusta el bigote—. Handsome tiene un asunto en Alola. Un asunto con bata blanca. No puede contarte más. Todavía.' },
			{ if: 'flag.b04_lebrun_detenido', then: [
				{ say: 'handsome', text: 'Y Lebrun… está en una sala sin ventanas, con un abogado bueno y un café malo. Handsome lo visita los domingos. No hablan. Se toman el café. —Pausa—. El café, de verdad, es muy malo.' },
			] },
			{ if: 'flag.b04_lebrun_cebo', then: [
				{ say: 'handsome', text: 'Y Lebrun sigue en su despacho. Cada mañana, Handsome le da una mentira y él se la pasa a Lemnis. Los dos lo hacemos muy bien. Ninguno de los dos duerme.' },
			] },
			{ if: 'flag.b04_lebrun_libre', then: [
				{ say: 'handsome', text: 'Y Lebrun… se fue. Los martes y los jueves, Handsome pasa por el Bulevar Sur 14. Nunca hay nadie. —Mira el mar—. Siempre hay un sobre.' },
			] },
			{ if: '!flag.b04_lebrun_detenido && !flag.b04_lebrun_cebo && !flag.b04_lebrun_libre', then: [
				{ say: 'handsome', text: 'Y en Kalos, mi superior me sigue preguntando siempre dónde estás. Siempre. Handsome ya no le contesta. Handsome le dice que estás de vacaciones. Mira: ahora es verdad.' },
			] },
			{ say: 'handsome', text: 'Si me buscas, estoy por el Paseo. De incógnito. —Se levanta, se le cae el bigote en la arena, lo recoge, se lo pega al revés y se va con mucha dignidad.' },
			{ quest: 'b05_m1', stage: 'hecha', done: true },
			{ call: 'b05_leilani_choque' },
		],

		// =================== LEILANI (meet-cute) ===================
		b05_leilani_choque: [
			{ if: 'flag.b05_leilani_conocida', then: [{ end: true }] },
			{ set: { 'flag.b05_leilani_conocida': true } },
			{ text: 'Vas hacia la playa, hacia el laboratorio de Kukui, cuando se oye un pitido agudo, como un microondas con prisa. Luego, un grito: «¡NO, NO, NO, POR LA IZQUIERDA, LA OTRA IZQUIERDA!».' },
			{ text: 'Un **Tauros** sale disparado por el Paseo Marítimo a toda velocidad. Lleva una silla de montar con antenas, cables y una pantallita que echa chispas. Sobre la silla, agarrada a los cuernos, va una chica con un overol naranja y unas gafas de soldar en la frente.' },
			{ text: 'El Tauros frena en seco delante del puesto de malasadas, como si se acordara de algo. La chica no frena. Sale volando por encima de los cuernos, dando una vuelta entera en el aire, directa hacia ti.' },
			{ if: LUC, then: [
				{ text: '{riolu} no lo piensa. Se pone delante de ti, abre las patas y el aura se le enciende en las manos, azul. La atrapa en el aire con las dos zarpas y la deja en el suelo, de pie, sin un rasguño. Como quien coloca un jarrón.' },
				{ text: 'La chica se queda mirando a {riolu}. Luego, a ti. Luego, a {riolu} otra vez.' },
			], else: [
				{ text: 'Te aparta de un empujón un señor que pasaba con una tabla de surf y la chica aterriza en la arena blanda, de culo, con un «¡puf!» enorme.' },
			] },
			{ say: 'leilani', text: '…OK. Ok, ok, ok. Estoy viva. ¡Estoy viva! Y el prototipo… —Mira hacia el Tauros, que se come una malasada del puesto con la silla echando humo—. El prototipo está vivo a medias, que es más de lo que esperaba, ¿sí o qué?' },
			{ say: 'leilani', text: 'Perdón, perdón. Soy **Leilani**. Leilani Kahale. Mecánica de monturas, de Akala. Bueno, mecánica. Lo de «de monturas» depende del día. Hoy, claramente, no.' },
			{ text: 'Se sacude la arena del overol. Tiene el pelo negro, rizado, con un mechón chamuscado en la frente que parece haber sido así siempre, y un cinturón de herramientas con más bolsillos de los que caben en un cinturón.' },
			{ say: 'leilani', text: 'Es una silla que llama a la montura sola, aunque no esté contigo. Bueno, esa es la idea. Ahora mismo llama a la montura y luego la montura hace lo que le da la gana. Que, para ser justos, es lo que hacen las monturas sin silla.' },
			{ say: 'leilani', text: 'Lo que no entiendo es por qué ha frenado. —Se rasca la cabeza con una llave inglesa que ha sacado de un bolsillo demasiado pequeño para ella—. A lo mejor el Tauros también tenía hambre. Un Tauros con hambre es un Tauros con prioridades.' },
			{ choice: [
				{ text: '«¿Puedo probarlo?»', then: [
					{ text: 'Leilani se te queda mirando con la boca abierta. Como si le hubieras ofrecido un riñón.' },
					{ say: 'leilani', text: '¿En serio? ¿Después de ver eso? Ok. Ok. Nadie se ofrece nunca. Normalmente me ofrezco yo y luego me arrepiento yo. Esto es nuevo.' },
					{ text: 'Te subes al Tauros (que acepta porque aún le quedan dos malasadas). Leilani aprieta tres botones, le da un golpe seco a la pantallita y grita «¡AHORA!». El Tauros da tres pasos perfectos, rectos, elegantes.' },
					{ text: 'Al cuarto, la silla hace «pff» y suelta un hilillo de humo azul. El Tauros se sienta. Tú sigues encima. Con mucha dignidad.' },
					{ say: 'leilani', text: '¡TRES PASOS! ¡Tres pasos rectos! ¡Es un récord! El anterior era uno y medio. ¡Y nadie ha salido volando! —Se queda pensando—. Bueno, yo antes. Pero eso es otra prueba.' },
					{ af: { leilani: 5 } },
				] },
				{ text: '«Es increíble que funcione, aunque sea a medias.»', then: [
					{ say: 'leilani', text: '…¿Sí? —Se le escapa una sonrisa que intenta guardar y no le cabe—. Es que la antena la hice con una percha. Y el chip, con un mando de la tele. ¡Y aun así llamó al Tauros! Que luego el Tauros hizo su vida, ok, pero LLAMAR, llamó.' },
					{ af: { leilani: 2 } },
				] },
				{ text: '«Deberías dejar eso a gente con más experiencia.»', then: [
					{ text: 'Leilani deja de sonreír medio segundo. Luego vuelve a sonreír, pero ya no es la misma sonrisa: es la de las fotos de grupo.' },
					{ say: 'leilani', text: 'Ya. Sí. Lo sé. Me lo dicen bastante. —Guarda la llave inglesa—. Es que la gente con más experiencia no hace sillas para Tauros. Por eso las hago yo. Alguien tiene que estrellarse primero, ¿sí o qué?' },
					{ af: { leilani: -3 } },
				] },
				{ text: '«Eso es chatarra con antenas.»', then: [
					{ say: 'leilani', text: 'Es chatarra con antenas **que llama a un Tauros**. La chatarra sin antenas no llama a nadie. Eso es una diferencia, ¿eh? —Lo dice riéndose. Casi del todo.' },
					{ af: { leilani: -3 } },
				] },
			] },
			{ say: 'leilani', text: 'Bueno. Te debo una. Me has salvado la cara, literalmente. ¿Sabes por qué los mecánicos no juegan a las cartas? Porque siempre les tocan las **tuercas**. —Silencio—. Las tuercas. Como las cuerdas, pero… No. Ya. Lo sé. Es malísimo.' },
			{ choice: [
				{ text: 'Reírte', then: [
					{ text: 'Te ríes. Leilani se queda un segundo parada, como quien no sabe qué hacer con algo que no se esperaba, y luego se ríe más fuerte que tú, por las dos.' },
					{ af: { leilani: 1 } },
				] },
				{ text: '«Es malísimo, sí.»', then: [
					{ say: 'leilani', text: 'Gracias. Me gusta que la gente sea honesta. Tengo cincuenta más. Todos peores. Vas a sufrir, te aviso.' },
				] },
			] },
			{ say: 'leilani', text: 'Me vuelvo a Akala en el ferry de la tarde, antes de que el Tauros pida el divorcio. Tengo un taller en **Ciudad Kantai**, al lado del Centro de Investigaciones Dimensionales. Si pasas por allí, búscame. Te invito a algo. O te arreglo algo. Lo que se rompa primero.' },
			{ say: 'leilani', text: 'Mi ma… —Se calla. Se le traba algo en la boca, medio segundo—. Mi **maquinaria** te espera. Ok. Me voy. ¡Gracias, tú! ¡Y gracias, {riolu}! ¡Tienes unas manos increíbles! Para un Pokémon. Para cualquiera.', cond: LUC },
			{ say: 'leilani', text: 'Mi ma… —Se calla. Se le traba algo en la boca, medio segundo—. Mi **maquinaria** te espera. Ok. Me voy. ¡Gracias!', cond: '!(' + LUC + ')' },
			{ text: 'Se va tirando del Tauros, que se resiste a dejar el puesto de malasadas. La silla sigue soltando humo azul. La chica sigue hablando con el Tauros como si el Tauros le contestara.' },
			{ say: 'rotom', text: '¡Bzzt! Apunto: «Leilani, mecánica, Akala, chiste de tuercas». Le pongo una estrellita. Una pequeña. Por el chiste no; por la silla.' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo llegamos a Alola. Al cruzar la Puerta me dio un hipo de esos (bzzt), pero ya estoy bien. ¡Hace muchísimo calor!\n\nHauoli huele a sal y a malasada. Al salir de la Puerta está el Paseo Marítimo: palmeras, el mar de frente y el escenario de la Gira a la izquierda, con sus banderines azules. Allí nos dio la bienvenida el Prof. Kukui, que no lleva camiseta y dice «¡woo!» cuando está contento, o sea, siempre.\n\nY luego una chica salió volando de un Tauros y {riolu} la atrapó en el aire. ¡Así, sin más! Se llama Leilani y hace inventos que echan humo. Me cae bien. Mañana, el laboratorio de la playa.', cond: 'flag.b01_diario && (' + LUC + ')' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo llegamos a Alola. Al cruzar la Puerta me dio un hipo de esos (bzzt), pero ya estoy bien. ¡Hace muchísimo calor!\n\nHauoli huele a sal y a malasada. Al salir de la Puerta está el Paseo Marítimo: palmeras, el mar de frente y el escenario de la Gira a la izquierda, con sus banderines azules. Allí nos dio la bienvenida el Prof. Kukui, que no lleva camiseta y dice «¡woo!» cuando está contento, o sea, siempre.\n\nY luego una chica salió volando de un Tauros y aterrizó en la arena. Se llama Leilani y hace inventos que echan humo. Me cae bien. Mañana, el laboratorio de la playa.', cond: 'flag.b01_diario && !(' + LUC + ')' },
		],

		// =================== PASEO MARÍTIMO ===================
		b05_malasadas: [
			{ text: 'El puesto de malasadas: una caseta pintada de rosa con un letrero de neón al que le faltan dos letras. Detrás, una señora con un Slowpoke que mira las malasadas como quien mira el horizonte.' },
			{ if: '!flag.b05_malasada_rotom', then: [
				{ set: { 'flag.b05_malasada_rotom': true } },
				{ say: 'rotom', text: '¡Bzzt! Las he escaneado. Azúcar, masa, aceite y felicidad. La felicidad no sale en el escáner, pero se nota. ¡Cómprame una! Para mirarla. Solo para mirarla.' },
			] },
			{ text: '«Sin fiado, cariño. El Slowpoke lleva las cuentas». El Slowpoke no lleva las cuentas.' },
			{ shop: 'puesto_malasadas' },
		],
		b05_alexia_paseo: [
			{ say: 'alexia', text: 'Estoy fotografiando la Puerta con el atardecer detrás. Llevo cuarenta fotos. En todas sale un Wingull distinto. Creo que posan.' },
			{ say: 'alexia', text: 'Por cierto, el astrónomo es encantador. Le pedí una entrevista y me dijo que solo si se la hacía de noche, «para que hablemos con testigos». Se refería a las estrellas. Creo.' },
		],
		b05_handsome_paseo: [
			{ text: 'Handsome está tumbado en una hamaca del Paseo, con un periódico abierto al revés. Tiene un agujero en el periódico. Te mira por el agujero.' },
			{ say: 'handsome', text: 'Handsome está de incógnito. —Pasa una página. Al revés—. Handsome ha visto a tres empleados de una fundación de bata blanca comprar cuarenta malasadas. Cuarenta. Eso no es un desayuno. Eso es una reunión.' },
			{ say: 'handsome', text: 'Tú sigue con tus pruebas. Si Handsome necesita algo, te mandará una señal. —Pausa—. Todavía no hemos acordado la señal. Ya la acordaremos.' },
		],
		b05_calder_telescopio: [
			{ set: { 'flag.b05_calder_telescopio': true } },
			{ text: 'Calder Wynn ha montado su telescopio plegable sobre el muro del Paseo y mira el cielo sin prisa, con las manos a la espalda. Al verte, se aparta medio paso, como quien deja sitio en un banco.' },
			{ say: 'calder', text: '¿Quiere mirar? Adelante. Esa estrella de ahí, la rojiza, sobre el volcán de Akala. No la mire mucho rato; es tímida.' },
			{ text: 'Miras. Un punto rojo, temblando, en un cielo que empieza a ponerse morado.' },
			{ say: 'calder', text: 'Esa luz salió antes de que usted naciera. Antes que yo. Ha cruzado todo ese frío para llegarle a usted al ojo esta tarde, en Hauoli, entre un puesto de malasadas y una Puerta. —Sonríe—. Hay quien dice que eso no significa nada. Yo creo que es lo más parecido a una carta que tenemos.' },
			{ if: LUC, then: [
				{ text: '{riolu} se ha sentado en el muro, a tu lado, y mira hacia arriba. Calder lo observa con una ternura extraña, como quien ve a alguien hacer bien algo que él hace mal.' },
				{ say: 'calder', text: 'Dicen que los Lucario ven una luz que nosotros no vemos. La de dentro. —Se quita las gafas, las limpia con la chaqueta—. Qué envidia. Yo llevo toda la vida mirando hacia fuera.' },
			] },
			{ choice: [
				{ text: '«¿Qué es eso especial que va a pasar en el cielo?»', then: [
					{ say: 'calder', text: 'Si se lo digo, lo mirará esperándolo. Y lo que se espera, se mira peor. —Recoge el telescopio con cuidado—. Le prometo que lo sabrá cuando lo vea. Es lo más honesto que le puedo decir.' },
				] },
				{ text: '«¿Siempre ha trabajado para Lemnis?»', then: [
					{ say: 'calder', text: 'No. Durante muchos años trabajé aquí, en Akala, en un centro pequeño con poco dinero y mucho café. Tenía una compañera que se reía como un motor que no arranca. —Se queda un momento callado—. Luego me fui. Las razones son aburridas y largas. Como casi todas las razones.' },
				] },
				{ text: 'Mirar un rato más, sin decir nada', then: [
					{ text: 'Miras. Calder no dice nada. Al cabo de un rato, la estrella roja se esconde detrás de una nube y él suspira, contento, como si se hubiera despedido de alguien en un andén.' },
				] },
			] },
		],
		b05_calder_despues: [
			{ say: 'calder', text: 'Buenas noches. —Sigue mirando por el telescopio—. Hoy el cielo está tranquilo. Disfrútelo. Los cielos tranquilos no avisan cuando se van.' },
		],
		b05_puerta_tecnico: [
			{ if: '!flag.b05_puerta_alola', then: [{ end: true }] },
			{ text: 'El técnico de Lemnis tiene una camisa de flores con lemniscatas en lugar de flores y la cara de alguien que lleva tres días intentando que una tablet funcione al sol.' },
			{ text: '«¿Volver? Cuando quiera. Kanto, Kalos o Johto: la Puerta lo lleva. Y lo trae. Normalmente en ese orden». Se seca el sudor con la manga. «Aquí no hay sombra. La sombrilla es mía. Me la traje de casa».' },
		],

		// =================== LABORATORIO DE KUKUI ===================
		b05_lab: [
			{ set: { 'flag.b05_lab_hecho': true } },
			{ text: 'El laboratorio de Kukui es una casa de madera sobre la arena, con la puerta abierta de par en par. Dentro: fichas, una computadora con pegatinas de Pokémon de lucha, una pizarra llena de flechas… y un ring en medio del salón.' },
			{ text: 'Kukui está colgado de las cuerdas del ring, boca abajo, tomando apuntes en una libreta. Al verte, se deja caer, rueda por la lona y se levanta de un salto.' },
			{ say: 'kukui', text: '¡Woo! ¡{El|La|Le} de la Gira que llegó con un Pokémon de aura! —Te estrecha la mano con las dos suyas, fuerte—. Tenía ganas de verlo de cerca. ¿Me dejas…? —Se agacha delante de {riolu}, sin tocarlo, mirándole las manos—. Las palmas. Los pinchos. Esa postura de guardia, aunque esté relajado. ¡Qué maravilla!', cond: LUC },
			{ say: 'kukui', text: '¡Woo! ¡{El|La|Le} de la Gira que llegó con cara de no haber dormido! ¡Bienvenid{o|a|e}! ¡Pasa, pasa, que no muerdo! Bueno, el Rockruff sí, pero lo tengo de vacaciones.', cond: '!(' + LUC + ')' },
			{ say: 'kukui', text: 'Te cuento: aquí estudio los movimientos Pokémon. Cómo salen, por qué salen, qué pasa en el cuerpo de un Pokémon cuando da un golpe que no debería poder dar. —Se toca el pecho—. Muchos los estudio recibiéndolos. En persona. Por la ciencia. Mi esposa dice que por la ciencia y por la cabeza dura.' },
			{ say: 'kukui', text: 'Y sobre lo de la pulsera… Aquí, en Alola, los entrenadores usan **movimientos Z**: un golpe que el Pokémon y su entrenador hacen juntos, una vez por combate. Para eso hace falta una **Pulsera Z**. Y las Pulseras Z… —Sonríe— …no se compran. Las da la isla. Ya lo verás.' },
			// ----- Litten -----
			{ text: 'De una caja de cartón que hay al sol, junto a la ventana, sale un gatito negro con rayas rojas, se estira, bosteza enseñando todos los dientes y mira a Rotom, que flota a tu lado.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Un Litten! Pokémon Gato Fuego. Muy independiente, no le gusta que lo toquen, escupe bolas de pelo que se incend…' },
			{ text: 'El Litten escupe una brasa del tamaño de una canica. Directa a la pantalla de Rotom. *Fssst.*' },
			{ say: 'rotom', text: '¡AY! ¡Mi pantalla! ¡Me ha dejado una mancha negra en la mitad de los ojos! ¡Veo la mitad de las cosas! ¡Ahora tú eres la mitad de ti!' },
			{ if: TIENE_LITTEN, then: [
				{ text: 'El Litten se acerca, te olfatea los zapatos, encuentra en ellos el olor de otro de su especie, y se sienta delante de ti con cara de estar evaluando a la competencia.' },
				{ say: 'kukui', text: '¡Jajajá! Ya conoce a uno de los suyos, ¿eh? Lo huele en ti. —Recoge al Litten, que se deja (raro)—. Este se queda conmigo, entonces. Es el gato de la casa. Bueno, el gato de la casa es él; la casa es suya. Yo estoy de alquiler.' },
				{ say: 'kukui', text: 'Pasa a verlo cuando quieras. Está en su caja, al sol, juzgando a todo el que entra. Es su trabajo. Y lo hace muy bien.' },
				{ set: { 'flag.b05_litten': true } },
			], else: [
				{ text: 'Luego el Litten se acerca a ti, despacio, con la cola en alto. Te olfatea los zapatos. Te mira. Y se sienta encima de tu pie, como quien se sienta en algo que ya es suyo.' },
				{ text: '{riolu} lo mira desde arriba, muy serio. El Litten le aguanta la mirada. Luego bosteza. {riolu} resopla, con algo que en un humano sería media sonrisa.', cond: LUC },
				{ say: 'kukui', text: '…Ah. Vaya. Woo. —Se rasca la nuca—. Ese Litten llegó hace tres semanas, solo, a esta caja. No se ha dejado tocar por nadie. Ni por mí, y eso que le doy de comer. A ti, en cambio…' },
				{ say: 'kukui', text: 'Aquí, en Alola, los iniciales no se eligen: eligen ellos. Y este acaba de elegir. ¿Te lo llevas? Yo lo apunto en mi libreta como «adopción voluntaria». Por las dos partes.' },
				{ pokemon: { sp: 'litten', lv: 15, gender: 'M', nature: 'adamant', ability: 'blaze', happy: 160, item: 'charcoal', moves: ['ember', 'bite', 'furyswipes', 'roar'], ivs: { hp: 26, atk: 31, def: 22, spa: 20, spd: 24, spe: 28 } } },
				{ set: { 'flag.b05_litten': true, 'flag.b05_litten_tuyo': true } },
				{ say: 'kukui', text: 'En la Poké Ball le he metido un **Carbón**. Para que practique sin quemarme la libreta. Otra vez.' },
			] },
			{ quest: 'b05_s_iniciales', stage: 'buscar' },
			{ say: 'kukui', text: 'Por cierto: en Alola hay otros dos como él. Una foca que hace burbujas en Akala y un búho que duerme en Poni, dicen. Si te los cruzas… —Te guiña un ojo—. Ellos también eligen.' },
			{ quest: 'b05_m2', stage: 'lilii' },
			{ say: 'kukui', text: 'Y ahora: ¡a Lilii! Sube por la **Ruta 1** hasta el pueblo y preséntate al kahuna **Kaudan**. Es grande. Es muy grande. Se ríe mucho. Si alguna vez deja de reírse, corre. ¡Woo!' },
		],
		b05_kukui_charla: [
			{ if: 'flag.b05_pulsera_z', then: [
				{ say: 'kukui', text: '¡La Pulsera Z! ¡Déjame verla! —Te la gira en la muñeca con mucho cuidado, como un relojero—. Tapu Koko no regala cosas a cualquiera. Bueno, a veces sí. Pero no a cualquiera cualquiera.' },
			], else: [
				{ if: 'flag.b05_liam_hecha', then: [
					{ say: 'kukui', text: '¡Pasaste la prueba de Liam! ¿Te dijo «impecable»? ¿No? Entonces sí lo pensó. Liam piensa «impecable» muchísimo más de lo que lo dice.' },
				], else: [
					{ say: 'kukui', text: 'Las pruebas de Alola no son como los gimnasios. En un gimnasio, ganas al líder. En una prueba, ganas a la isla. Y la isla, cuando pierde, se ríe. Es muy buena perdedora.' },
				] },
			] },
			{ say: 'kukui', text: 'Si quieres practicar antes de ver a Kaudan, pasa por la **Escuela de Entrenadores**. Allí aprendí yo. Bueno, allí suspendí yo, que es otra forma de aprender. ¡Woo!' },
		],
		b05_kukui_final: [
			{ say: 'kukui', text: '¡{El|La|Le} de la Gira que tumbó a Kaudan! ¡Woo! El ferry a Akala sale del puerto. Allí te esperan tres capitanes y una kahuna que tiene una joyería. No le digas que sus anillos son bonitos: ya lo sabe.' },
			{ say: 'kukui', text: 'Y no te olvides de lo que dijo Ciprés. Mega y Z. Mismo acento, distinto idioma. —Se toca la sien—. Esa idea me va a tener despierto una semana. ¡Qué maravilla!' },
		],
		b05_litten_caja: [
			{ text: 'El Litten de Kukui dormita en su caja de cartón, al sol. Abre un ojo cuando te acercas. Lo vuelve a cerrar. Es un saludo. En Litten, es casi un abrazo.' },
		],
		b05_pizarra: [
			{ text: 'La pizarra de Kukui: flechas, círculos, la palabra «¡¿POR QUÉ?!» subrayada tres veces. En una esquina, un dibujo de una pulsera y, al lado, uno de una piedra redonda. Entre los dos, un signo de interrogación enorme.' },
			{ text: 'Debajo, con otra letra, más pequeña y más ordenada: «Cariño, el lunes es tu turno de comprar café. — P.».', cond: '!flag.b05_pulsera_z' },
			{ text: 'Debajo del signo de interrogación, Kukui ha añadido con letra nueva: «Ciprés también lo piensa. ¡¡WOO!!». Y debajo, con otra letra, más pequeña y ordenada: «Y el café, ¿lo piensa alguien? — P.».', cond: 'flag.b05_pulsera_z' },
		],

		// =================== RAMIRO Y EL HUEVO DE ELM ===================
		b05_ramiro: [
			{ if: 'flag.b05_ramiro_huevo', then: [{ end: true }] },
			{ set: { 'flag.b05_ramiro_huevo': true } },
			{ text: 'Un chico con casco de bici, chaleco reflectante amarillo y la cara roja de calor sujeta una caja de plástico con agujeros contra el pecho. Kukui la mira como un niño mira un regalo.' },
			{ say: 'becario_elm', text: '¡Perdón, perdón, perdón! ¡Llego tarde! El ferry, la Puerta, el calor, una señora que me ha puesto un collar de flores sin preguntar, otro collar… ¡Ah! ¡{jugador}!' },
			{ say: 'becario_elm', text: 'Soy Ramiro, el becario de Elm. Ramiro Alcalde. Nos vimos en Johto, con los… —hace con las manos la forma de tres Poké Balls— …los tres de Primavera. ¿Cómo están? No me lo digas. Sí. Dímelo. Luego.', cond: 'flag.b02_ini_chikorita || flag.b02_ini_cyndaquil || flag.b03_ini_totodile' },
			{ say: 'becario_elm', text: 'Soy Ramiro, el becario del Prof. Elm, de Pueblo Primavera, en Johto. Ramiro Alcalde. Creo que nos cruzamos alguna vez. Yo me cruzo con todo el mundo; luego nadie se acuerda. Es el casco.', cond: '!(flag.b02_ini_chikorita || flag.b02_ini_cyndaquil || flag.b03_ini_totodile)' },
			{ say: 'becario_elm', text: 'El profesor le manda esto al Prof. Kukui. Es un **huevo**. De la nidada de primavera. Intercambio entre laboratorios: él nos manda datos de movimientos y nosotros… —levanta la caja— …un huevo que he llevado en brazos desde Johto. En brazos. Por la Puerta. En el ferry. En la bici. En brazos.' },
			{ say: 'kukui', text: '¡Woo! ¡Un huevo de Johto en Alola! —Lo saca de la caja como si fuera de cristal y lo pone sobre una toalla, bajo una lámpara de escritorio—. Aquí va a nacer con sol, con sal y con lucha libre de fondo. Va a ser un Pokémon muy feliz o muy raro. Las dos cosas, ojalá.' },
			{ text: 'A Ramiro le suena el holomisor del chaleco. Lo saca, lo pone sobre la mesa. Se proyecta, borrosa y temblona, la cara de un hombre con gafas redondas y el pelo hecho un nido.' },
			{ say: 'elm', text: '¿Ramiro? ¿Ramiro? ¿Se oye? ¡Ah, Kukui! ¡Y {jugador}! ¡Qué casualidad! Bueno, no es casualidad: Ramiro me dijo que le avisara cuando llegara y me he quedado esperando. Mi mujer dice que espero como un Slowpoke. Tiene razón.' },
			{ say: 'elm', text: 'Kukui, dele la vuelta cada cuatro horas. Ramiro le ha dejado un pósit. Probablemente siete pósits. No lea el séptimo: es una disculpa.' },
			{ say: 'elm', text: 'Y {jugador}… —Se acerca a la cámara, mucho—. Gracias por lo de los tres de Primavera. Los papeles los arreglé tarde. Pero los arreglé. Y cuida de ellos, ¿eh? Son de una nidada que nació antes de tiempo. Las cosas que nacen antes de tiempo tienen más prisa por vivir.', cond: 'flag.b02_ini_chikorita || flag.b02_ini_cyndaquil || flag.b03_ini_totodile' },
			{ say: 'elm', text: 'Y {jugador}… —Se acerca a la cámara, mucho—. Si alguna vez pasa por Pueblo Primavera, venga a verme. Tengo un laboratorio lleno de huevos y nadie con quien hablar de ellos. Ramiro dice que hablo demasiado de huevos. Ramiro tiene razón, pero no se lo diga.', cond: '!(flag.b02_ini_chikorita || flag.b02_ini_cyndaquil || flag.b03_ini_totodile)' },
			{ text: 'La imagen se congela con Elm a medio parpadear y se apaga.' },
			{ say: 'becario_elm', text: 'Se le acaba la batería siempre en lo mejor. —Se quita el casco: tiene el pelo pegado de sudor—. Bueno. Misión cumplida. Ahora me toca volver. En bici. Con este calor. —Se le ilumina la cara—. ¿Aquí venden helados?' },
			{ if: LILII + ' && !flag.b05_liam_hecha', then: [
				{ say: 'becario_elm', text: 'Por cierto, en el ferry venía un chico rubio muy elegante que se peinaba en el reflejo de la ventana. Me preguntó si el viento de Johto «despeina mucho». Le dije que sí. Se quedó muy preocupado. Iba hacia la Ruta 2.' },
			] },
			{ text: 'Antes de irse, Ramiro rebusca en el chaleco y te da algo envuelto en una servilleta, todavía tibio.' },
			{ say: 'becario_elm', text: 'Me compré dos en el Paseo. Por si me perdía. No me he perdido. —Te la da—. Es la primera vez que no me pierdo en un viaje. Por eso te la doy. Para celebrarlo.' },
			{ give: 'bigmalasada' },
		],

		// =================== ESCUELA DE ENTRENADORES ===================
		b05_escuela_placa: [
			{ text: '«Aquí empezó el capitán **Liam**». La placa es de bronce y está muy limpia. Demasiado limpia. Como si alguien viniera a pulirla.' },
			{ text: 'Debajo, a rotulador: «y nos lo recuerda cada vez que viene». Y debajo de eso, con otra letra, más elegante: «Con cariño. — L.».' },
		],
		b05_premio_escuela: [
			{ text: 'Suena el timbre. La directora de la Escuela, una señora bajita con gafas en la punta de la nariz y una carpeta contra el pecho, cruza el patio hasta ti.' },
			{ text: '«Tres combates, tres lecciones. Mis alumnos dicen que ya no quieren combatir contigo, que «no es pedagógico». Eso, en esta escuela, es un diploma».' },
			{ text: '«Lo primero que enseñamos aquí no es un movimiento raro ni un truco de capitán. Es a usar **el cuerpo entero**. Liam lo aprendió el primer día y no lo ha olvidado nunca, aunque ahora lo haga con más estilo. Tome. Para que no lo olviden los suyos».' },
			{ give: 'b05_mt_golpe_cuerpo' },
			{ text: '«Y no se lo diga a Liam. Si se entera de que regalo su asignatura favorita a los de fuera, viene a pulir la placa dos veces por semana».' },
		],

		// =================== RUTA 1 ===================
		b05_vecina_r1: [
			{ set: { 'flag.b05_vecina_r1': true } },
			{ say: 'vecina_alola', text: '¡Alola! ¿De la Gira? Siéntate, siéntate. ¿Quieres mango? No preguntes, toma mango.' },
			{ say: 'vecina_alola', text: 'Aquí vendo huevos, cuento chismes y busco Pokémon perdidos. Últimamente, más de lo tercero. Desde que pusieron la Puerta, por la cuesta pasan Pokémon que no son de aquí. Un Tauros con la cabeza llena de flores. Un Onix en la cueva del capitán. —Baja la voz—. Y de noche, cuando no hay luna, algo brillante por el monte. Como de cristal.' },
			{ say: 'vecina_alola', text: 'Mi abuela decía que en Alola la luz tiene dueño. Que si alguien la toma sin pedir permiso, el cielo se enfada. —Se ríe—. Mi abuela también decía que los Slowpoke predicen la lluvia. Y no. Solo están ahí.' },
			{ give: 'sitrusberry', n: 2 },
		],
		b05_vecina_r1_2: [
			{ say: 'vecina_alola', text: '¿Otra vez por aquí? Mango. Toma. —Te lo da sin preguntar—. Kaudan y su amigo de Kanto llevan dos días compitiendo a ver quién come más malasadas. El de Kanto va ganando. Kaudan dice que lo deja ganar. Kaudan miente fatal.' },
		],

		// =================== PUEBLO LILII: KAUDAN Y KIYO ===================
		b05_lilii_llegada: [
			{ set: { 'flag.b05_lilii_kaudan': true } },
			{ text: 'En el centro de Pueblo Lilii, sobre el escenario de madera, hay dos hombres sentados con las piernas cruzadas, uno frente al otro. Entre los dos, una bandeja con malasadas. Muchas. Menos de las que había.' },
			{ text: 'Uno es enorme: barriga redonda, bigote blanco y una camisa de flores abierta. El otro, delgado y fibroso, lleva un kimono de kárate y el pelo de punta. Lo conoces: **Kiyo**, el Rey del Kárate.', cond: 'flag.b04_kiyo_dojo || flag.b03_kiyo_visto' },
			{ text: 'Uno es enorme: barriga redonda, bigote blanco y una camisa de flores abierta. El otro, delgado y fibroso, lleva un kimono de kárate y el pelo de punta, y se sienta con la espalda tan recta que parece atornillado al escenario.', cond: '!flag.b04_kiyo_dojo && !flag.b03_kiyo_visto' },
			{ say: 'kaudan', text: '¡Jo, jo, jo! Ocho.' },
			{ say: 'kiyo', text: 'Nueve.' },
			{ say: 'kaudan', text: '¡La novena era mía! ¡Jo, jo! La tenía en la mano.' },
			{ say: 'kiyo', text: 'La tenías. Ahora no.' },
			{ text: 'Kiyo te ve. Se levanta de un salto, sin usar las manos, y te señala con una malasada.' },
			{ say: 'kiyo', text: '¡Tú! Azafrán. {El|La|Le} de las tablas. —Asiente, una vez—. Bien. Kaudan, est{e|a|e} es {el|la|le} que te dije.', cond: 'flag.b04_kiyo_dojo' },
			{ say: 'kiyo', text: '¡Tú! Monte Mortero. {El|La|Le} de la roca. —Asiente, una vez—. Bien. Kaudan, est{e|a|e} es {el|la|le} que te dije.', cond: '!flag.b04_kiyo_dojo && flag.b03_kiyo_visto' },
			{ say: 'kiyo', text: 'De la Gira. Lo dice el collar. —Te mira de arriba abajo, una vez—. Kiyo. Rey del Kárate. Del Monte Mortero, en Johto. Vine a ver a este. —Señala a Kaudan con la malasada—. Kaudan, otr{o|a|e} de la Gira. Viene a verte a ti.', cond: '!flag.b04_kiyo_dojo && !flag.b03_kiyo_visto' },
			{ say: 'kiyo', text: '¿Y el cinturón? —Te mira la cintura, o la mochila, o donde creas que lo guardaste—. No me lo digas. Lo llevas. Bien.', cond: 'flag.b04_kiyo_cinturon' },
			{ say: 'kaudan', text: '¡Jo, jo, jo! ¡Alola! ¡Así que tú eres de quien me habla este hombre que no habla! Me ha dicho seis palabras sobre ti. Para Kiyo, eso es una biografía. —Se levanta. Tarda un poco. Es mucho hombre que levantar—. Soy **Kaudan**, el kahuna de Melemele.', cond: 'flag.b04_kiyo_dojo || flag.b03_kiyo_visto' },
			{ say: 'kaudan', text: '¡Jo, jo, jo! ¡Alola! ¡Kukui me avisó de que subían los de la Gira! Diez palabras seguidas, Kiyo. Ya llevas más que en toda la semana. —Se levanta. Tarda un poco. Es mucho hombre que levantar—. Soy **Kaudan**, el kahuna de Melemele.', cond: '!flag.b04_kiyo_dojo && !flag.b03_kiyo_visto' },
			{ say: 'kaudan', text: 'Kiyo y yo nos conocemos desde jóvenes. Él me tumbó una vez en Kanto. Yo lo tumbé dos en Alola. Él dice que la segunda no cuenta. Llevamos treinta años discutiéndolo y comiendo malasadas. Es una amistad muy sana.' },
			{ say: 'kiyo', text: 'No cuenta.' },
			{ say: 'kaudan', text: '¡Jo, jo! ¿Ves? —Te pone una mano en el hombro. Pesa como un ancla—. Bueno. Al grano. Kukui te habrá contado lo del recorrido insular: aquí no hay líderes, hay **capitanes**, y cada capitán pone su **prueba**. Cuando las pruebas de una isla están hechas, el kahuna pone la **Gran Prueba**.' },
			{ say: 'kaudan', text: 'En Melemele, la prueba la pone **Liam**, en la **Cueva Sotobosque**. Bajas a Hauoli y sigues por la **Ruta 2**, hacia el norte, hasta el final. Liam es un chico muy educado y muy guapo, y lo sabe. Las dos cosas. Él te lo dirá.' },
			{ say: 'kaudan', text: 'Cuando vuelvas con su cristal… entonces hablaremos tú y yo. En ese escenario. —Señala las tablas con la barbilla, y por primera vez no se ríe—. Y no habrá malasadas.' },
			{ say: 'kiyo', text: 'Habrá. Para después.' },
			{ say: 'kaudan', text: '¡JO, JO, JO! ¡Para después, sí! ¡Kiyo, eres un sabio!' },
			{ if: LUC, then: [
				{ text: 'Kaudan se fija entonces en {riolu}. Se agacha (otra vez tarda) y le mira las manos, igual que Kukui. Pero no dice nada de los pinchos ni de la postura. Solo le toca la frente con un dedo enorme, muy despacio.' },
				{ say: 'kaudan', text: 'Este tiene la isla dentro. —Se incorpora—. No esta isla. Otra. Una lejos, fría, que huele a metal. Ya la encontrará.' },
				{ text: '{riolu} se queda muy quieto. Luego mira al norte. Solo un segundo.' },
			] },
			{ quest: 'b05_m2', stage: 'prueba' },
		],
		b05_kaudan_espera: [
			{ if: 'quest.b05_m2 == "prueba"', then: [
				{ say: 'kaudan', text: '¡Jo, jo! ¿Todavía aquí? La Cueva Sotobosque está al final de la **Ruta 2**, al norte de Hauoli. Liam te espera. Bueno, Liam espera a todo el mundo, pero a ti un poco más: le he dicho que vas con {riolu} y se ha ido a peinar.' },
			], else: [
				{ say: 'kaudan', text: '¡Jo, jo, jo! ¡Alola! ¿Has probado ya las malasadas del Paseo? ¿No? Pues pruébalas. Es una orden de kahuna. La única que doy.' },
			] },
		],
		b05_kiyo_lilii: [
			{ if: 'flag.b05_pulsera_z', then: [
				{ say: 'kiyo', text: 'Kaudan pega como una ola. No te pega a ti. Te pega con todo el mar detrás.' },
				{ say: 'kiyo', text: 'No le aguantes. Muévete. —Hace un gesto con la mano, de lado—. El mar no se cansa. Tú, sí. Pero tú puedes moverte. El mar, no.' },
			], else: [
				{ text: 'Kiyo da una patada al aire delante de un árbol enorme. Se para a un pelo de la corteza. El árbol suelta una hoja, por si acaso.' },
				{ say: 'kiyo', text: 'Vine a visitarlo. Llevaba diez años sin salir del Monte. Luego, Azafrán. Ahora, aquí. —Mira el mar, a lo lejos—. Perder me ha hecho viajero.' },
				{ say: 'kiyo', text: '¿El Tyrogue? Dime que ya ha elegido. No. No me lo digas. Que me lo diga él.', cond: 'flag.b03_tyrogue' },
			] },
		],
		b05_kiyo_despues: [
			{ say: 'kiyo', text: 'Lo tumbaste. —Asiente, despacio—. A mí me costó diez años y una roca. A ti, una tarde.' },
			{ say: 'kiyo', text: 'No es que seas mejor. —Pausa—. Es que llegaste acompañad{o|a|e}. Eso es lo que yo tardé diez años en entender.' },
		],
		b05_escenario_lilii: [
			{ text: 'Un escenario de madera, cuadrado, sin techo ni cuerdas, levantado a un palmo del suelo. Las tablas están pulidas por los pies descalzos de cien años de festivales y combates.' },
			{ text: 'En una esquina, alguien ha tallado con navaja una marca diminuta: dos líneas, una frente a la otra, y entre las dos, «K y K». Es vieja. Muy vieja.', cond: '!beat("kaudan_gp")' },
			{ text: 'En el centro, dos tablas astilladas por tu Gran Prueba. Kaudan no las cambia. Dice que los recuerdos se pisan con cuidado.', cond: 'beat("kaudan_gp")' },
		],

		// =================== CUEVA SOTOBOSQUE: LA PRUEBA DE LIAM ===================
		b05_liam_reto: [
			{ text: 'Junto a un charco de luz, un chico rubio de unos veinte años, con una camisa clara impecable y un pañuelo de seda al cuello, se peina mirándose en el agua. Al oírte, termina el gesto (no lo interrumpe; lo termina) y se vuelve.' },
			{ say: 'liam', text: '¡Alola! Tú eres a quien manda Kaudan. Lo sé porque me ha dicho «va con un Lucario» y yo, que soy muy observador, veo un Lucario. —Hace una pequeña reverencia—. **Liam**, capitán de Melemele. Tipo Normal. Que, bien hecho, no tiene nada de normal.', cond: LUC },
			{ say: 'liam', text: '¡Alola! Tú eres a quien manda Kaudan. Lo sé porque eres la única persona en esta cueva que no es un Gumshoos. —Hace una pequeña reverencia—. **Liam**, capitán de Melemele. Tipo Normal. Que, bien hecho, no tiene nada de normal.', cond: '!(' + LUC + ')' },
			{ say: 'liam', text: 'Mi prueba tiene dos partes: una cosa que pensar y una cosa con la que pelear. Pero antes, si me lo permites, un combate entre los dos. No lo pide el reglamento. Lo pide la educación: me gusta saber a quién le abro mi cueva.' },
			{ say: 'liam', text: 'Y antes de eso… —Saca de un bolsillo una botellita de cristal con un lazo— …tu equipo debería estar perfecto. Si va a perder conmigo, que pierda bonito. Si va a ganarme, que me gane en su mejor día. Lo contrario sería de mal gusto.' },
			{ choice: [
				{ text: 'Aceptar sus pociones y combatir', then: [
					{ heal: 'Liam pulveriza el contenido de la botellita sobre tu equipo, Pokémon a Pokémon, como quien perfuma una habitación. Huele a hibisco. Todos están como nuevos.' },
					{ call: 'b05_liam_combate' },
				] },
				{ text: 'Combatir así', then: [{ call: 'b05_liam_combate' }] },
				{ text: 'Volver luego', then: [{ say: 'liam', text: 'Por supuesto. La perfección no tiene prisa. Yo, un poco. Pero la escondo muy bien.' }] },
			] },
		],
		b05_liam_combate: [
			{ battle: 'liam_1',
				onWin: [
					{ say: 'liam', text: '…Impecable. —Se le escapa, y frunce un poco el ceño, como si le hubiera costado una moneda—. Bien. Ya sé a quién le abro mi cueva.' },
					{ heal: 'Liam saca otra botellita (¿cuántas lleva?) y deja a tu equipo como nuevo. «No pienso dejar que nadie llegue a mi dominante con la melena despeinada».' },
					{ say: 'liam', text: 'Ahora, la prueba. Al fondo hay una madriguera. Las rocas cierran la entrada y alguien tiene que apartarlas sin taparla. Ese alguien eres tú. Y cuando la abras… —sonríe— …saldrá el dueño. Muy enfadado. Por la mudanza.' },
					{ call: 'b05_liam_prueba' },
				],
				onLose: [
					{ say: 'liam', text: 'Un combate es como un peinado: si no sale a la primera, se moja y se vuelve a empezar. —Te ofrece la botellita—. Toma. Vuelve cuando quieras.' },
					{ heal: 'Liam deja a tu equipo como nuevo con su botellita de cristal. Huele a hibisco.' },
				],
			},
		],
		b05_liam_prueba: [
			{ if: 'flag.b05_liam_hecha', then: [{ end: true }] },
			{ if: '!flag.b05_liam_puzle', then: [
				{ text: 'Al fondo de la cueva, la galería se ensancha en una sala redonda con el suelo de tierra apisonada. Unas rocas grandes, del tamaño de una lavadora, cierran el paso a la madriguera más honda. Delante, un agujero en el suelo y, junto a la pared, una losa plana que se hunde si la pisas.' },
				{ text: '{riolu} se pone delante de ti y se queda mirando la pared de rocas. No a las rocas: a lo que hay detrás. El aura le brilla un poco en las manos, como quien enciende una linterna en el bolsillo.', cond: LUC },
				{ say: 'liam', text: 'La losa abre la reja de la madriguera, pero solo mientras tenga algo encima. Algo pesado. Las rocas son pesadas. Tú no tanto. —Te mira de arriba abajo—. Con todo el respeto.' },
				{ puzzle: {
					id: 'b05_liam_madriguera',
					title: 'La madriguera del dominante',
					hint: 'Una roca sobre la losa abre la reja. El hoyo se tapa con otra. Piensa antes de empujar: las rocas no vuelven atrás.',
					theme: 'cueva',
					grid: [
						'########',
						'#P..#..#',
						'#.R.#.G#',
						'#..R..D#',
						'##.##..#',
						'#..H.S.#',
						'#......#',
						'########',
					],
				},
				onSolve: [
					{ set: { 'flag.b05_liam_puzle': true } },
					{ text: 'La roca encaja en la losa con un golpe sordo. Un chasquido. La reja de troncos que cerraba la madriguera se levanta despacio, con un crujido largo de madera vieja.' },
					{ say: 'liam', text: 'Bien. Muy bien. Has tardado lo justo: ni tan poco que parezca suerte ni tanto que parezca esfuerzo. Eso tiene un nombre. —No lo dice—. Pero no te lo digo, que te lo crees.' },
				],
				onQuit: [
					{ say: 'liam', text: 'Tómate tu tiempo. Las rocas no se van a ir a ninguna parte. Son rocas. Es lo único que se les da bien.' },
				] },
			] },
			{ if: 'flag.b05_liam_puzle', then: [{ call: 'b05_liam_dominante' }] },
		],
		b05_liam_dominante: [
			{ text: 'Silencio. Un silencio que pesa. De la madriguera sale primero un olor (tierra, pelo, rabia) y luego un sonido, como un motor que arranca muy despacio.' },
			{ if: 'night', then: [
				{ text: 'Sale un **Raticate**. Pero no un Raticate: uno enorme, el doble de grande que los de las galerías, negro como la cueva, con los mofletes hinchados y un bigote que parece hecho de alambre. Un aura brillante, rojiza, le rodea el cuerpo como un abrigo.' },
			], else: [
				{ text: 'Sale un **Gumshoos**. Pero no un Gumshoos: uno enorme, el doble de grande que los de la ruta, con la gabardina de pelo erizada y los ojos entrecerrados de detective cansado. Un aura brillante, dorada, le rodea el cuerpo como un abrigo.' },
			] },
			{ say: 'liam', text: 'El **Pokémon dominante**. Más grande, más fuerte, más gruñón. No se captura: se respeta. ¿Quieres que antes te arregle el equipo? Te advierto que no tengo más botellitas. Bueno, sí. Pero las cuento.' },
			{ choice: [
				{ text: 'Sí, por favor', then: [{ heal: 'Liam saca, con un suspiro teatral, otra botellita. Tu equipo está perfecto. «Esta era la de reserva de la reserva»' }] },
				{ text: 'Estamos bien', then: [{ say: 'liam', text: 'Con estilo, entonces.' }] },
			] },
			{ if: 'night', then: [
				{ wild: { sp: 'raticatealolatotem', lv: 56, noCatch: true, moves: ['suckerpunch', 'crunch', 'superfang', 'doubleedge'], ability: 'thickfat', nature: 'adamant', minIVs: 24 }, canRun: false,
					onWin: [{ call: 'b05_liam_aliado' }],
					onLose: [{ call: 'b05_liam_perder' }] },
			], else: [
				{ wild: { sp: 'gumshoostotem', lv: 56, noCatch: true, moves: ['superfang', 'crunch', 'earthquake', 'bodyslam'], ability: 'adaptability', nature: 'adamant', minIVs: 24 }, canRun: false,
					onWin: [{ call: 'b05_liam_aliado' }],
					onLose: [{ call: 'b05_liam_perder' }] },
			] },
		],
		b05_liam_aliado: [
			{ text: 'El dominante se tambalea. Pero antes de caer, levanta el morro y suelta un chillido largo que rebota por toda la cueva. De un agujero de la pared sale otro, más pequeño, a defenderlo.' },
			{ say: 'liam', text: '¡Ha llamado a un aliado! Clásico. Muy de dominante. Muy de familia.' },
			{ if: 'night', then: [
				{ wild: { sp: 'raticatealola', lv: 53, noCatch: true, moves: ['suckerpunch', 'crunch', 'quickattack', 'swordsdance'] }, canRun: false, lose: 'continue' },
			], else: [
				{ wild: { sp: 'gumshoos', lv: 53, noCatch: true, moves: ['crunch', 'takedown', 'bite', 'scaryface'] }, canRun: false, lose: 'continue' },
			] },
			{ call: 'b05_liam_fin' },
		],
		b05_liam_perder: [
			{ say: 'liam', text: 'Ah. Bueno. Esto también es parte de la prueba: la parte que no te dicen. —Te ayuda a levantarte—. El dominante se ha vuelto a meter en su madriguera, ofendido. Las rocas siguen apartadas. Cuando quieras, vuelves a llamar.' },
			{ heal: 'Liam vacía sobre tu equipo la última botellita, sin contarla. Huele a hibisco.' },
		],
		b05_liam_fin: [
			{ set: { 'flag.b05_liam_hecha': true } },
			{ text: 'Los dos se meten a la vez en la madriguera, refunfuñando, y se oye cómo se pelean ahí dentro por el sitio. Luego, nada. Luego, un ronquido.' },
			{ say: 'liam', text: '…Prueba superada. —Se pasa la mano por el pelo, que no se ha despeinado ni un milímetro—. ¿Sabes qué es lo que más me gusta de esta parte? Que es la única en la que no tengo que fingir que no estoy impresionado.' },
			{ say: 'liam', text: 'Toma. El **Normastal Z**. El cristal de mi prueba. Con una **Pulsera Z** te deja hacer un movimiento Z de tipo Normal: el golpe más elegante que existe, si me preguntas. Y si no me preguntas, también.' },
			{ give: 'normaliumz' },
			{ say: 'liam', text: 'No tienes pulsera, ya lo sé. Kaudan tampoco te la va a dar: la pulsera no la da nadie. La da la isla. —Mira hacia el techo de la cueva, por donde entra la luz—. Vuelve a Lilii. Y si en el camino pasa algo raro… no corras. Las cosas raras de Melemele no persiguen. Esperan.' },
			{ if: LUC, then: [
				{ text: 'Liam mira a {riolu} un momento, con la cabeza ladeada.' },
				{ say: 'liam', text: '{riolu} no se ha movido ni un centímetro de más en todo el combate. Ni uno. —Se queda callado—. Eso tampoco te lo digo, que te lo crees.' },
			] },
			{ quest: 'b05_m2', stage: 'gran' },
		],
		b05_liam_despues: [
			{ say: 'liam', text: 'Estoy puliendo el cristal de reserva. Los Normastal Z se empañan con la humedad de la cueva. Yo también, pero lo disimulo mejor.' },
			{ if: 'beat("kaudan_gp")', then: [
				{ say: 'liam', text: '¿Tumbaste a Kaudan? —Deja de pulir—. Sabía que lo harías. No lo dije porque decirlo antes es de mal gusto. Decirlo después es de buena educación: felicidades.' },
			], else: [
				{ say: 'liam', text: 'Kaudan te espera en Lilii. Un consejo de capitán: no le mires a la barriga. Todo el mundo mira la barriga. El golpe viene del hombro.' },
			] },
		],

		// =================== LA PULSERA Z: TAPU KOKO (cinemática) ===================
		b05_pulsera: [
			{ if: 'flag.b05_pulsera_z', then: [{ end: true }] },
			{ say: 'kaudan', text: '¡Jo, jo, jo! ¡El cristal de Liam! ¡Te lo dio! ¿Te dijo «impecable»? ¡Jo, jo! Bien. Bien.' },
			{ say: 'kaudan', text: 'Ahora, escucha. Para la Gran Prueba hace falta una **Pulsera Z**. Y las pulseras, en Melemele, no las hago yo. Las hago yo, sí, con mis manos. Pero la piedra no. La piedra la da el guardián.' },
			{ say: 'kaudan', text: 'Ven. Vamos a dar un paseo por la **Senda Mahalo**. Si el guardián quiere, bajará. Si no quiere… —se encoge de hombros, y es como si se encogiera una montaña— …nos comemos una malasada en el puente y volvemos.' },
			{ cutscene: { bg: { type: 'ruins', far: '#4a8a5a' }, start: 'fade', time: 'tarde', cam: 'still', frames: [
				{ actors: [{ id: 'kaudan', at: 'left', enter: 'left' }], cam: 'pan-right', text: 'La Senda Mahalo sube entre árboles hasta un barranco. Lo cruza un puente de tablas, colgado de cuerdas viejas. Abajo, muy abajo, un río. Kaudan se para en el primer tablón.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.6, enter: 'right' }], cond: LUC, cam: 'still', text: 'A mitad del puente, el viento se para. Todo de golpe. Los pájaros se callan. {riolu} levanta las orejas y se le eriza el pelo del cuello, todo a la vez.' },
				{ cond: '!(' + LUC + ')', cam: 'still', text: 'A mitad del puente, el viento se para. Todo de golpe. Los pájaros se callan. Las cuerdas del puente dejan de crujir.' },
				{ weather: 'sparks', fx: ['flash', 'fall'], shake: 2, actors: [{ mon: 'tapukoko', key: 'koko', at: 'center', size: 'l', enter: 'up' }], cam: 'push', text: 'Un rayo amarillo cae del cielo despejado y se queda flotando sobre el puente. Tiene forma de… algo. Una concha amarilla y negra, con una cresta naranja. Dentro, unos ojos que te miran.' },
				{ say: 'kaudan', actors: [{ key: 'kaudan', do: 'bow' }], cam: 'still', text: '…**Tapu Koko**. El guardián de Melemele. —Kaudan no se ríe. Inclina la cabeza—. Hacía nueve años que no bajaba.' },
				{ actors: [{ key: 'koko', do: 'step' }, { key: 'rio', emote: '!' }], on: 'koko', fx: 'sparkle', cam: 'push', text: 'Tapu Koko se acerca a ti. Tanto que notas la electricidad en los dientes. Mira a {riolu}, largo rato. Luego, a ti. Abre la concha un instante y deja caer algo que rebota en las tablas: una **piedra brillante**.', cond: LUC },
				{ actors: [{ key: 'koko', do: 'step' }], on: 'koko', fx: 'sparkle', cam: 'push', text: 'Tapu Koko se acerca a ti. Tanto que notas la electricidad en los dientes. Te mira largo rato. Abre la concha un instante y deja caer algo que rebota en las tablas: una **piedra brillante**.', cond: '!(' + LUC + ')' },
				{ actors: [{ key: 'koko', remove: true, exit: 'up' }], fx: 'flash', weather: 'none', cam: 'pan-up', text: 'Y se va. Hacia arriba, como un rayo al revés. El viento vuelve a soplar. Un pájaro, muy bajito, se atreve a cantar.' },
				{ actors: [{ key: 'kaudan', do: 'nod', at: 0.3 }], item: 'zring', on: '_c', fx: ['glow', 'rays'], cam: 'pull', text: 'Esa noche, en Lilii, Kaudan talla la piedra con una herramienta del tamaño de una aguja, que en sus manos parece aún más pequeña. Al amanecer te pone en la muñeca una **Pulsera Z**.' },
			] } },
			{ give: 'zring' },
			{ unlock: 'z' },
			{ set: { 'flag.b05_pulsera_z': true } },
			{ say: 'kaudan', text: 'Ya está. Tapu Koko no elige a cualquiera. Bueno… Tapu Koko elige a quien le da la gana. Pero hoy le ha dado la gana contigo. ¡Jo, jo! Eso, en Melemele, es como que te elija el clima.' },
			{ say: 'kaudan', text: 'Con la pulsera y un cristal Z, tu Pokémon y tú pueden hacer un **movimiento Z** una vez por combate: ponen los dos todo lo que tienen en un solo golpe. Los dos. A la vez. Sin guardarse nada.' },
			{ say: 'kaudan', text: 'Descansa. Cura a tu equipo. Cuando estés list{o|a|e}, súbete a ese escenario. —Señala las tablas—. Yo estaré aquí. Con hambre.' },
		],

		// =================== LA GRAN PRUEBA DE KAUDAN ===================
		b05_gran_prueba: [
			{ say: 'kaudan', text: '¡Jo, jo, jo! ¿Ya? ¿List{o|a|e}? ¿Segur{o|a|e}? —Se truena los nudillos. Suena como una ladera que se desprende—. La Gran Prueba de Melemele. Cinco Pokémon. Un movimiento Z. Y la isla entera mirando.' },
			{ text: 'El pueblo se ha juntado alrededor del escenario. Kiyo, en primera fila, con los brazos cruzados. Kukui, que ha subido corriendo desde Hauoli, sin aliento, con la libreta en la mano: «¡No empiecen sin mí! ¡Woo! ¡Ya estoy!».' },
			{ choice: [
				{ text: 'Pedir que curen al equipo primero', then: [
					{ heal: 'La enfermera de Lilii sube al escenario con su Comfey, que le pone una flor a cada uno de tus Pokémon. Todos quedan como nuevos (y muy guapos).' },
					{ call: 'b05_gran_prueba_combate' },
				] },
				{ text: '«Empecemos.»', then: [{ call: 'b05_gran_prueba_combate' }] },
				{ text: 'Todavía no', then: [{ say: 'kaudan', text: '¡Jo, jo! Sin prisa. La isla espera. Lleva esperando un millón de años; un rato más no le importa.' }] },
			] },
		],
		b05_gran_prueba_combate: [
			{ battle: 'kaudan_gp',
				onWin: [{ call: 'b05_kaudan_vencido' }],
				onLose: [
					{ say: 'kaudan', text: '¡Jo, jo, jo! ¡Uf! ¡Qué buen combate! Hoy gana la isla. Mañana, quién sabe. Ven cuando quieras: el escenario no se mueve. Yo, tampoco. Mucho.' },
					{ heal: 'La enfermera de Lilii y su Comfey se llevan a tu equipo a la caseta. Vuelven con una flor detrás de la oreja cada uno.' },
				],
			},
		],
		b05_kaudan_vencido: [
			{ if: 'flag.b05_kaudan_vencido', then: [{ end: true }] },
			{ set: { 'flag.b05_kaudan_vencido': true } },
			{ text: 'Kaudan se sienta en el escenario, sin aire, con las piernas abiertas como un niño grande. Se ríe tanto que el escenario tiembla.' },
			{ say: 'kaudan', text: '¡Jo, jo, jo, jo! ¡Me has tumbado! ¡En mi escenario! ¡Delante de Kiyo! —Le señala—. ¡Que se te borre esa sonrisa, Kiyo!' },
			{ say: 'kiyo', text: 'No estoy sonriendo.' },
			{ text: 'Kiyo está sonriendo.' },
			{ badge: 'sello_melemele' },
			{ cap: 58 },
			{ say: 'kaudan', text: 'El **Sello de Melemele**. Para la Gira cuenta como una medalla del Circuito. Para mí cuenta como que has pasado la isla. Las dos cosas son verdad. La segunda, un poco más.' },
			{ say: 'kaudan', text: 'Y esto. —Saca de la camisa un cristal naranja, del tamaño de una uña—. El **Lizastal Z**. El cristal de la lucha. Pero no te lo doy para que me lo enseñes en un combate. Te lo doy para que me lo enseñes ahora. Ven. Al acantilado.' },
			{ give: 'fightiniumz' },
			{ if: LUC, then: [
				{ cutscene: { bg: { type: 'coast', far: '#f2a03a' }, start: 'light', time: 'tarde', weather: 'none', cam: 'pull', frames: [
					{ actors: [{ id: 'kaudan', at: 'left', dim: true }, { mon: '{riolu}', key: 'rio', at: 'center', enter: 'right' }], cam: 'pull', text: 'El borde del acantilado de Lilii, al atardecer. Abajo, el mar rompe contra las rocas. Kaudan se aparta. {riolu} se pone delante de ti, de espaldas, mirando el agua.' },
					{ on: 'rio', fx: 'glow', cam: 'push', text: 'Levantas la muñeca. El cristal de la Pulsera Z se enciende, naranja. {riolu} no se gira: lo nota. El aura le sube por los brazos, azul, y se mezcla con la luz naranja hasta que no se sabe dónde termina una y empieza la otra.' },
					{ on: 'rio', fx: ['aura', 'heartbeat'], color: '#5ab0ff', cam: 'still', text: 'Haces los gestos que te enseñó Kaudan, despacio, como en un sueño. {riolu} los hace a la vez. No los ha visto nunca. Los hace igual. Exactos.' },
					{ on: 'rio', fx: ['speedlines', 'impact'], shake: 3, cam: 'push', text: '**Ráfaga Demoledora**. Cien golpes en un segundo, todos a la vez, contra una roca del tamaño de una casa que sobresale del mar.' },
					{ on: false, fx: ['quake', 'ripple'], cam: 'pull', text: 'La roca no se rompe. Se **parte**, limpia, en dos mitades, y el mar entra por en medio con un rugido. Las gaviotas se van a Akala.' },
					{ actors: [{ key: 'kaudan', dim: false, do: 'hop', emote: 'heart' }, { key: 'rio', do: 'turn' }], cam: 'still', text: '{riolu} se gira hacia ti, jadeando, con las manos todavía humeando de aura. Kaudan aplaude. Da saltitos. Kaudan, que pesa lo que pesa, da **saltitos**.' },
				] } },
				{ say: 'kaudan', text: '¡JO, JO, JO, JO! ¡Eso! ¡Eso es un movimiento Z! ¡Los dos a la vez, sin guardarse nada! —Se seca una lágrima—. Llevo cuarenta años enseñando ese gesto. Nunca lo había visto hacer tan bien a alguien que no lo hubiera visto antes.' },
				{ happy: { who: 'riolu', n: 20 } },
			], else: [
				{ text: 'En el acantilado, al atardecer, haces los gestos que te enseña Kaudan. Tu Pokémon los imita. La pulsera brilla, naranja. El golpe parte una roca del tamaño de una casa y el mar entra por en medio con un rugido.' },
				{ say: 'kaudan', text: '¡JO, JO, JO! ¡Eso es un movimiento Z! ¡Los dos a la vez, sin guardarse nada! Así se hace.' },
			] },
			{ quest: 'b05_m2', stage: 'hecha', done: true },
			// ----- Kukui y la llamada de Ciprés (hipótesis del Lazo) -----
			{ text: 'Kukui llega corriendo por el borde del acantilado, con la libreta abierta y el lápiz entre los dientes.' },
			{ say: 'kukui', text: '¡WOO! ¡Lo he visto! ¡Lo he apuntado! Bueno, lo he apuntado mal porque me temblaba la mano, pero lo he visto. —Te agarra la muñeca, mira la Pulsera Z—. Oye… tú también llevas una Piedra Llave, ¿verdad? De Kalos. ¿Me dejas verlas juntas?', cond: 'has("megaring")' },
			{ say: 'kukui', text: '¡WOO! ¡Lo he visto! ¡Lo he apuntado! Bueno, lo he apuntado mal porque me temblaba la mano, pero lo he visto. —Te agarra la muñeca, mira la Pulsera Z, muy de cerca—. Qué curioso. Qué curioso…', cond: '!has("megaring")' },
			{ text: 'Pone tu muñeca a contraluz, con la Pulsera Z y la Megapulsera una junto a otra. Las dos piedras, con el sol detrás, tienen el mismo brillo raro por dentro: como una gota de luz atrapada.', cond: 'has("megaring")' },
			{ say: 'kukui', text: 'Esto lo tiene que oír alguien. —Saca un holomisor del bolsillo de la bata—. ¡Augustine! ¡Contesta, que sé que estás despierto!' },
			{ say: 'cipres', text: '¿Kukui? Son las cuatro de la mañana en Luminalia, mon ami. —Una pausa, y luego un bostezo encantador—. Ah. Y {jugador}. Bonjour. Bueno, bonsoir. Bueno, lo que sea a estas horas.' },
			{ say: 'kukui', text: 'Augustine, escucha. Acabo de ver un movimiento Z con un Pokémon de aura, y el aura de {riolu} y la luz de la pulsera… se han **mezclado**. Como si fueran lo mismo.' },
			{ say: 'cipres', text: '…Ah. —Ciprés deja de bostezar—. Kukui. Llevo dos años con una idea en un cajón. Una idea que no me atrevo a enseñar en un congreso porque se reirían de mí.' },
			{ say: 'cipres', text: 'La Piedra Llave y la Pulsera Z hacen **lo mismo**, pero con distinto acento. El Pokémon no se transforma por la piedra. Se transforma por lo que pasa **entre** el Pokémon y quien la lleva. La piedra solo… lo traduce.' },
			{ say: 'kukui', text: '¡WOO! ¡Es lo que yo digo de la lucha libre y el combate Pokémon! ¡Es lo mismo con distinto público!' },
			{ say: 'cipres', text: 'No es exactamente lo mismo, Kukui. —Se ríe—. Pero casi. Es una hipótesis. Solo una hipótesis. Y las hipótesis, a las cuatro de la mañana, son todas preciosas. Hablamos con café.' },
			{ say: 'cipres', text: '{jugador}, cuida esas dos piedras. Y sobre todo cuida a quien las hace brillar. —La imagen tiembla—. Au revoir, mes amis.' },
			{ intel: { npc: 'cipres', text: 'Hipótesis de Ciprés y Kukui: la Piedra Llave y la Pulsera Z «hacen lo mismo con distinto acento». La transformación sale del vínculo entre Pokémon y entrenador; la piedra solo lo traduce.' } },
			{ say: 'kukui', text: '…Bueno. Ya no voy a dormir en una semana. ¡Qué maravilla! —Se guarda el holomisor—. Y tú, a Akala. El **ferry** sale del puerto de Hauoli. Allí te esperan tres capitanes y una kahuna que, además, es joyera.' },
			{ say: 'kukui', text: 'Y si en Kantai ves a una chica con el pelo chamuscado y algo echando humo cerca… salúdala de mi parte. Leilani me arregló la silla de la playa el año pasado. Ahora la silla anda sola. No sé si eso era lo que le pedí.' },
			{ set: { 'flag.b05_ferry_akala': true } },
			{ quest: 'b05_m3', stage: 'kantai' },
			{ quest: 'b05_t_leilani', stage: 'taller' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo pasamos la Gran Prueba de Melemele. ¡Le ganamos a Kaudan, que es enorme y se ríe como un tambor!\n\nPrimero bajó Tapu Koko, el guardián de la isla. ¡Un rayo con concha! Nos dio una piedra y Kaudan la convirtió en una Pulsera Z. Y luego, en el acantilado, {riolu} hizo su primer movimiento Z: partió una roca en dos y el mar entró por en medio. ¡Hasta las gaviotas se fueron!\n\nKukui y Ciprés dicen que la Pulsera y la Piedra Llave hacen lo mismo con distinto acento. Yo también tengo acento: de Pokédex. Mañana, ferry a Akala. ¡Espero no marearme!', cond: 'flag.b01_diario && (' + LUC + ')' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo pasamos la Gran Prueba de Melemele. ¡Le ganamos a Kaudan, que es enorme y se ríe como un tambor!\n\nPrimero bajó Tapu Koko, el guardián de la isla. ¡Un rayo con concha! Nos dio una piedra y Kaudan la convirtió en una Pulsera Z. Y luego, en el acantilado, hicimos nuestro primer movimiento Z: partimos una roca en dos y el mar entró por en medio.\n\nKukui y Ciprés dicen que la Pulsera y la Piedra Llave hacen lo mismo con distinto acento. Yo también tengo acento: de Pokédex. Mañana, ferry a Akala. ¡Espero no marearme!', cond: 'flag.b01_diario && !(' + LUC + ')' },
			{ set: { 'flag.b05_t0_hecho': true } },
		],
		b05_kaudan_despues: [
			{ say: 'kaudan', text: '¡Jo, jo, jo! ¡Alola! ¿Te has comido ya la malasada de después? Kiyo me ha robado la mía. Dice que me la debía desde hace treinta años. No sé de qué. Él tampoco.' },
			{ say: 'kaudan', text: 'En Akala, la kahuna es **Mayla**. Roca. Dura por fuera y por dentro, pero tiene buen corazón. Muy al fondo. Detrás de varias capas. Como un geodo. —Se ríe—. No le digas que te he dicho eso.' },
		],
	},

	// =====================================================================
	// TIENDAS
	// =====================================================================
	shops: {
		puesto_malasadas: { name: 'Puesto de malasadas del Paseo', items: [{ id: 'bigmalasada', price: 350 }, { id: 'freshwater', price: 200 }, { id: 'sodapop', price: 300 }, { id: 'lemonade', price: 400 }] },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		b05_folleto_cielo: { name: 'Folleto de la charla del cielo', pocket: 'key', desc: 'Un folleto de papel satinado con una lemniscata en la esquina y una foto del cielo de Alola de noche. Lo repartieron en el Paseo Marítimo de Hauoli.',
			read: '**LA LUZ QUE VIAJA**\nCharla del cielo de la Gira Interregional · Paseo Marítimo de Hauoli\n\nPonente: **Dr. Calder Wynn**, Departamento de Astronomía Aplicada de Lemnis. Antes, investigador del Centro de Investigaciones Dimensionales de Akala.\n\n«Toda la luz que vemos es un recuerdo: salió de su estrella hace mucho, y llega cuando quiere. En Alola dicen que la luz del sol y de la luna tiene dueño. Durante la estancia de la Gira, el cielo de Alola ofrecerá un fenómeno especial. Les rogamos que, cuando ocurra, lo miren. Es lo único que le debemos a la luz».\n\nLemnis · *Un mundo. Una liga.*\n\n(En el reverso, a bolígrafo, alguien ha dibujado una estrella pequeña y ha escrito debajo, con una letra fina e inclinada: «para quien mire».)' },
		b05_mt_golpe_cuerpo: { name: 'MT Golpe Cuerpo', pocket: 'machines', tm: 'bodyslam', desc: 'El usuario se lanza contra el objetivo con todo su peso. Puede paralizarlo. Premio de la Escuela de Entrenadores de Hauoli.' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		pesca_paseo_hauoli: {
			name: 'Muelle del Paseo Marítimo', icon: '🎣', hours: 20, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'mar', hint: 'Espera el «!» y no te precipites. El Jefe del muelle muerde el sedal, no el anzuelo.',
				wild: [{ sp: 'luvdisc', lv: [50, 52], w: 8 }, { sp: 'corsola', lv: [50, 52], w: 6 }, { sp: 'octillery', lv: [51, 53], w: 5 }, { sp: 'wishiwashi', lv: [50, 52], w: 4 }, { sp: 'toxapex', lv: [51, 53], w: 2 }, { sp: 'gyarados', lv: [52, 54], w: 1 }], wildChance: 0.3 },
			ask: 'Un tramo de muelle con cañas olvidadas apoyadas en la barandilla. Un señor con linterna te presta una sin decir nada, señala el agua y vuelve a lo suyo.',
			text: 'El mar de Hauoli suelta lo suyo.',
			wait: 'El señor de la linterna te quita la caña con mucha suavidad. «Por hoy, el mar ya ha dado. Mañana más».',
			table: [
				{ id: 'pearl', w: 18, n: [1, 2] },
				{ id: 'shoalsalt', w: 14, n: [1, 2] },
				{ id: 'shoalshell', w: 14, n: [1, 2] },
				{ id: 'heartscale', w: 10 },
				{ id: 'bigpearl', w: 7 },
				{ id: 'netball', w: 8, n: [1, 2] },
				{ id: 'diveball', w: 8, n: [1, 2] },
				{ id: 'starpiece', w: 3, rare: true },
				{ id: 'pearlstring', w: 1, rare: true },
			],
		},
		arbol_ruta1: {
			name: 'Árbol de bayas de la cuesta', icon: '🌳', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'bosque', hint: 'Sacude la copa y no recojas las pochas. Los Pikipek se llevan las que caen al suelo.' },
			ask: 'Un árbol bajo y ancho en la curva de la cuesta, lleno de bayas. En las ramas, tres Pikipek te miran con mucha atención. No parece que vayan a impedírtelo. Parece que van a tomar nota.',
			text: 'Las bayas de la cuesta, al sol.',
			wait: 'Los Pikipek han dejado el árbol pelado. Se oyen sus picotazos satisfechos desde la rama más alta.',
			table: [
				{ id: 'oranberry', w: 20, n: [1, 3] },
				{ id: 'pechaberry', w: 16, n: [1, 2] },
				{ id: 'cheriberry', w: 14, n: [1, 2] },
				{ id: 'sitrusberry', w: 12, n: [1, 2] },
				{ id: 'rawstberry', w: 10, n: [1, 2] },
				{ id: 'lumberry', w: 3, rare: true },
				{ id: 'chopleberry', w: 2, rare: true },
			],
		},
		hojas_cementerio: {
			name: 'Hojas junto a la verja del cementerio', icon: '🍂', hours: 20, picks: [1, 2],
			text: 'Entre las hojas secas, junto a la verja, aparecen cosas que el viento ha ido dejando.',
			wait: 'Solo quedan hojas. Y una concha pequeña, que alguien ha dejado en una lápida a propósito. Esa no se toca.',
			table: [
				{ id: 'tinymushroom', w: 16, n: [1, 2] },
				{ id: 'bigmushroom', w: 8 },
				{ id: 'honey', w: 12 },
				{ id: 'cleansetag', w: 5 },
				{ id: 'spelltag', w: 3 },
			],
		},
		huerto_ruta2: {
			name: 'Huerto de bayas de la Ruta 2', icon: '🍒', hours: 20, picks: [2, 3],
			text: 'El Crabrawler le da un puñetazo al tronco y llueven bayas. Te mira como diciendo: «la mitad son mías». La mitad no son suyas. Pero tampoco le discutes.',
			wait: 'El Crabrawler está sentado al pie del árbol, comiéndose la última baya, satisfecho. Mañana vuelve a entrenar.',
			table: [
				{ id: 'oranberry', w: 18, n: [1, 3] },
				{ id: 'aspearberry', w: 12, n: [1, 2] },
				{ id: 'persimberry', w: 12, n: [1, 2] },
				{ id: 'leppaberry', w: 8 },
				{ id: 'sitrusberry', w: 10, n: [1, 2] },
			],
		},
		madrigueras_sotobosque: {
			name: 'Madrigueras abandonadas', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 2, theme: 'cueva', hint: 'La tierra de las madrigueras es blanda, pero se hunde. Usa el pico fino cerca de los destellos.' },
			ask: 'Una pared de tierra apisonada llena de madrigueras viejas. Los Gumshoos que vivían aquí se mudaron y se dejaron cosas. Muchas cosas. Los Gumshoos no hacen mudanzas ordenadas.',
			text: 'La pared de las madrigueras suelta lo que los Gumshoos olvidaron.',
			wait: 'Un Dugtrio de Alola asoma la cabeza por un agujero, te mira con sus bigotes dorados y se vuelve a meter. Por hoy, las madrigueras están vacías.',
			table: [
				{ id: 'hardstone', w: 14 },
				{ id: 'softsand', w: 10 },
				{ id: 'stardust', w: 14, n: [1, 2] },
				{ id: 'redshard', w: 6 },
				{ id: 'blueshard', w: 6 },
				{ id: 'rarebone', w: 4 },
				{ id: 'nugget', w: 2, rare: true },
				{ id: 'ovalstone', w: 2, rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		prueba_liam: {
			name: 'Prueba del capitán Liam', npc: 'liam', trainer: 'liam_1', type: 'Normal', rec: 56,
			cond: 'visited("cueva_sotobosque")',
			info: [
				{ text: 'Capitán: **Liam**, tipo **Normal**. Muy educado. Muy peinado. Antes de la prueba, un combate de 4 Pokémon hasta el nivel 55.' },
				{ text: 'Su **Lopunny** golpea con las piernas: lo **Fantasma** le resbala y lo **Lucha** le duele.' },
				{ cond: 'beat("liam_1")', text: 'La prueba: unas rocas cierran la madriguera del fondo. Hay que abrirla y luego aguantar al **Pokémon dominante** (nivel 56), que no se captura.' },
				{ cond: 'beat("liam_1")', text: 'De día sale un Gumshoos; de noche, un Raticate de Alola. Los dos pegan fuerte de cerca.' },
				{ cond: 'flag.b05_liam_hecha', text: '✔ Prueba superada. Normastal Z conseguido.' },
			],
		},
		escuela_hauoli: {
			name: 'Escuela de Entrenadores', type: 'Normal', rec: 57,
			cond: 'visited("escuela_entrenadores")',
			info: [
				{ text: 'Alumnos, profesores y exalumnos de Hauoli combaten contra los aspirantes de la Gira. Entrenamiento hasta el nivel **57**.' },
				{ text: 'Mucho tipo **Normal**, **Lucha** y **Psíquico**. Gánales tres combates y la directora te dará un premio.' },
			],
		},
	},
};
