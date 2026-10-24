// Bloque 6 · Tramo 1: «Luces de Mayólica» (~2 h 30).
// Ruta 4 (borde del desierto; desvío a las Ruinas del desierto: huevo de Larvesta con un Darmanitan,
// excavación diaria; Krookodile Tera de Fisura) → Ciudad Mayólica: llegada (cinemática), Gimnasio de Camila
// (pasarelas: puzle; Mega-Eelektross), Metro Batalla (zona de entrenamiento, tope 63; Acromo mira; Bastien
// si rompió el contrato), Musical (Liam invitado, Tadeo Lis el apuntador, el Chatot del atrezo, Tepig y Azucena),
// estadio (Camille, según la rama de Lebrun), parque (remanente Plasma), la noria (segundo caso del Apuntador,
// el directo del martes y la carta 2), y el Pase de la Gira para el tren (abre Chamota y el Bosque Azulejo).
// Empieza cuando T0 activa b06_t0_hecho y pone b06_m2 en «mayolica». Termina con b06_t1_hecho.
//
// Contrato del Apuntador: solo sabe lo dicho EN ANTENA. Las frases que puede citar van marcadas
// con // EN ANTENA; las que no, con // FUERA DE MICRO. La carta 2 cita solo las primeras.

// ---------- Condiciones reutilizadas ----------
const LUC = '(inParty("riolu") || inParty("lucario"))';
const LARVESTA = '(owns("larvesta") || owns("volcarona"))';
const TEPIG = '(owns("tepig") || owns("pignite") || owns("emboar"))';
const GYM_T = 'beat("gym_mayolica_1") && beat("gym_mayolica_2")';
const GYM_LISTO = GYM_T + ' && flag.b06_pasarelas';
const LEBRUN_NINGUNO = '!flag.b04_lebrun_detenido && !flag.b04_lebrun_cebo && !flag.b04_lebrun_libre';
const NORIA_ABIERTA = 'flag.b06_apuntador_1 && !flag.b06_noria_hecha';
const LEAL = 'flag.b01_bastien_cubierto';

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== RUTA 4 ===================
		tes_ruta4: {
			name: 'Ruta 4', short: 'Ruta 4', region: 'teselia', kind: 'route', map: { x: 44, y: 52 },
			bg: { type: 'route', ground: '#d8b878', hill: '#c49a5a', far: '#e9c98a', flowers: '#c4743a' },
			desc: 'Al salir de Porcelana, el asfalto se rinde enseguida. La Ruta 4 es una carretera a medio hacer entre dunas bajas: tramos de cemento nuevo, tramos de arena que se los ha vuelto a comer, conos naranjas medio enterrados y un viento que no para de cambiar de idea.\n\nAl oeste, el desierto de verdad, con unas ruinas que asoman de la arena como dientes. Al norte, las luces de **Ciudad Mayólica**.',
			descNight: 'De noche, la arena de la Ruta 4 suelta el calor del día y el aire tiembla encima, como encima de un horno. Los conos naranjas reflejan las luces de Mayólica. Muy lejos, en las ruinas, algo brilla un segundo y se apaga.',
			links: ['porcelana', 'mayolica'],
			enterCond: 'flag.b06_t0_hecho', blockedMsg: 'Un operario con chaleco naranja te para con una sonrisa. «La carretera aún está cerrada al tráfico de la Gira. Termina lo tuyo en Porcelana y vuelve. La arena no se va a ningún sitio. Bueno, sí. Pero vuelve».',
			mapNote: 'Borde del desierto · desvío a las Ruinas',
			rumors: [
				{ text: 'Las obras de la Ruta 4 llevan seis años. Cada vez que asfaltan un tramo, el viento lo tapa de arena. Los obreros ya no se enfadan: le ponen nombre a cada duna.' },
				{ text: 'En las Ruinas del desierto hay un Darmanitan que no se mueve en todo el día. Los niños de Mayólica creen que es una estatua. Los mayores también, hasta que estornuda.' },
				{ text: 'Desde la última tormenta de arena se ven por aquí Pokémon que no son del desierto. Uno parece un montón de arena con un cubo en la cabeza. Otro, una serpiente que se enrosca como una manguera. Ninguno sabe cómo ha llegado.' },
				{ text: 'Dicen que en la arena de la Ruta 4 hay un Krookodile que brilla como si fuera de cristal. Y que cuando pelea, se cubre de agua. En pleno desierto.' },
			],
			route: {
				from: 'porcelana', to: 'mayolica', length: 8, terrain: 'sand', rate: 0.2,
				tramos: {
					0: [{ text: 'Detrás de ti, los rascacielos de Porcelana se hacen pequeños muy deprisa. Delante, la carretera nueva se mete entre dunas. Un cartel de obra: «RUTA 4 · ABIERTA AL PASO (MÁS O MENOS)».' }],
					1: [
						{ trainer: 'tes4_eneko' },
						{ item: 'hyperpotion' },
					],
					2: [
						{ text: 'Un tramo de asfalto recién echado, todavía brillante. En mitad, las huellas de un Sandile que lo cruzó cuando aún estaba blando. Alguien ha puesto un conito alrededor de cada huella, con mucho cariño.' },
						{ spot: { action: { gather: 'b06_r4_dunas' } }, label: 'La duna del cartel caído', icon: '🏜️', sub: 'El viento deja cosas al pie de la duna' },
					],
					3: [
						{ trainer: 'tes4_dalia' },
						{ item: 'softsand', hidden: true },
					],
					4: [
						{ text: 'La carretera se bifurca. A la izquierda, un camino de tablones sobre la arena se mete en el desierto, hacia unas columnas rotas. Un poste de madera dice: «RUINAS DEL DESIERTO · Campamento de la expedición del Museo de Esmalte · Prohibido llevarse piedras (las piedras no son tuyas)».' },
						{ branch: { label: 'Seguir los tablones hacia las Ruinas del desierto', go: 'ruinas_desierto', cond: 'true' } },
					],
					5: [
						{ trainer: 'tes4_bernabe', optional: true, label: 'Un montañero se sacude la arena de las botas' },
						{ item: 'ultraball' },
					],
					6: [
						{ text: 'El viento sube de golpe. Durante un minuto no ves nada: arena en la cara, en los dientes, en la Pokédex. Cuando pasa, en la duna de al lado hay un Pokémon que no habías visto nunca en una duna, quieto, mirando las luces de la ciudad como tú.' },
						{ trainer: 'tes4_ramona' },
						{ item: 'maxrevive', hidden: true },
					],
					7: [
						{ trainer: 'tes4_tristan', optional: true, label: 'Un turista fotografía un Sigilyph que no quiere posar' },
						{ text: 'El asfalto vuelve, ya en serio. Farolas, una gasolinera con un cartel de neón que parpadea en amarillo y, colgado del puente de la autopista, un anuncio enorme: una mujer rubia con auriculares de oro y un vestido de rayos. «**CAMILA** · Gimnasio de Mayólica · *Brilla o no brilles*».' },
					],
					8: [{ text: 'Las dunas se acaban de golpe, como cortadas con una regla. Delante, una ciudad entera iluminada a pleno día: pantallas, focos, un estadio con forma de concha y una noria enorme que gira despacio sobre los tejados. **Ciudad Mayólica**.' }],
				},
				encounters: {
					sand: [
						{ sp: 'krookodile', lv: [60, 62], w: 18 },
						{ sp: 'darmanitan', lv: [60, 62], w: 14 },
						{ sp: 'scrafty', lv: [59, 61], w: 12 },
						{ sp: 'garbodor', lv: [59, 61], w: 10 },
						{ sp: 'cinccino', lv: [59, 61], w: 8, time: 'day' },
						{ sp: 'maractus', lv: [59, 61], w: 10 },
						{ sp: 'crustle', lv: [60, 62], w: 8 },
						{ sp: 'sigilyph', lv: [60, 62], w: 6, time: 'night' },
						{ sp: 'excadrill', lv: [60, 62], w: 4 },
						{ sp: 'mandibuzz', lv: [61, 62], w: 3, time: 'day' },
						{ sp: 'palossand', lv: [60, 62], w: 4, displaced: true },
						{ sp: 'sandaconda', lv: [60, 62], w: 3, displaced: true },
						{ sp: 'krookodile', lv: [61, 62], w: 3, displaced: true, gimmick: 'tera', tera: 'Water' },
					],
				},
			},
		},

		// =================== RUINAS DEL DESIERTO ===================
		ruinas_desierto: {
			name: 'Ruinas del desierto', short: 'Ruinas', region: 'teselia', kind: 'area', map: { x: 36, y: 48 },
			bg: { type: 'ruins', ground: '#d8b878', far: '#e9c98a', wall: '#a8885a' },
			desc: 'Columnas rotas, escaleras que bajan a ninguna parte y una arena tan fina que se mete por las costuras. Hace muchísimo calor. Entre dos columnas, la expedición del Museo de Esmalte ha montado un campamento: una lona, una mesa plegable, cubos y cepillos, y una radio que solo agarra una emisora de boleros.\n\nEn lo alto de una escalinata, inmóvil como si fuera parte de las ruinas, hay un **Darmanitan** sentado con los brazos cruzados.',
			descNight: 'De noche, las ruinas se enfrían de golpe. La arena cruje. En el campamento hay una lámpara encendida y la radio sigue con sus boleros, muy bajito. En la escalinata, el Darmanitan sigue sentado. Desprende calor como una estufa: se ve el aire temblar a su alrededor.',
			descs: [
				{ cond: 'flag.b06_larvesta && !owns("larvesta") && !owns("volcarona") && flag.b06_larvesta_ruinas', text: 'Columnas rotas, escaleras que bajan a ninguna parte y arena fina. El campamento de la expedición sigue entre dos columnas, con su radio de boleros.\n\nEn la escalinata, el Darmanitan sigue sentado, con los brazos cruzados alrededor de algo que no quiere soltar.' },
			],
			links: ['tes_ruta4'],
			mapNote: 'Excavación diaria · campamento del Museo de Esmalte',
			spots: [
				{ label: 'La arqueóloga del campamento', sub: 'Cepilla una piedra con un pincel de maquillaje', icon: '🧑‍🔬', new: '!flag.b06_larvesta_visto', talk: [
					{ cond: '!flag.b06_larvesta_visto', script: 'b06_larvesta_inicio' },
					{ script: 'b06_arqueologa_generico' },
				] },
				{ label: 'El Darmanitan de la escalinata', sub: 'No se mueve. Desprende calor', icon: '🔥', cond: 'flag.b06_larvesta_visto && !flag.b06_larvesta', new: 'true', talk: [{ script: 'b06_larvesta_buscar' }] },
				{ label: 'El Darmanitan de la escalinata', sub: 'Sentado. Te mira de reojo', icon: '🔥', cond: 'flag.b06_larvesta', talk: [{ script: 'b06_darmanitan_despues' }] },
				{ label: 'El frente de excavación', sub: 'Una pared de arenisca con vetas', icon: '⛏️', new: '!flag.rec_b06_ruinas_excavacion', action: { gather: 'b06_ruinas_excavacion' } },
				{ label: 'Explorar entre las columnas', sub: 'La arena se mueve sola', icon: '🏛️', action: { explore: 'sand' } },
			],
			encounters: {
				sand: [
					{ sp: 'krookodile', lv: [60, 62], w: 20 },
					{ sp: 'cofagrigus', lv: [60, 62], w: 16 },
					{ sp: 'sandslash', lv: [59, 61], w: 14 },
					{ sp: 'sigilyph', lv: [60, 62], w: 12 },
					{ sp: 'crustle', lv: [60, 62], w: 10 },
					{ sp: 'darmanitan', lv: [60, 62], w: 8, time: 'day' },
					{ sp: 'golurk', lv: [61, 62], w: 4, time: 'night' },
					{ sp: 'runerigus', lv: [61, 62], w: 3, displaced: true },
				],
			},
			rumors: [
				{ text: 'La expedición del Museo de Esmalte busca en las ruinas «un sol que se fue». Eso pone en la caja de las muestras. Nadie del campamento quiere explicarlo.' },
				{ text: 'Por la noche, entre las columnas, a veces pasa volando algo enorme con seis alas de fuego. Los de la expedición dicen que es el reflejo de los focos de Mayólica. Mayólica está lejísimos.' },
			],
		},

		// =================== CIUDAD MAYÓLICA ===================
		mayolica: {
			name: 'Ciudad Mayólica', short: 'Mayólica', region: 'teselia', kind: 'city', map: { x: 40, y: 36 },
			bg: { type: 'city', roofs: ['#f2c84a', '#3a8ac4', '#c43a7a', '#e9e8e0'], far: '#2b2b48' },
			desc: 'La ciudad del espectáculo: pantallas gigantes en las fachadas, focos que barren el cielo a pleno día, un **estadio** con forma de concha, el **Musical** con su marquesina de bombillas y, sobre los tejados, una **noria** enorme que gira tan despacio que parece que no se mueve.\n\nBajo tierra, el **Metro Batalla**: trenes donde se combate de estación en estación. En lo alto de una torre de cristal, el **Gimnasio** de Camila, con una pasarela que sale por la ventana.',
			descNight: 'De noche, Mayólica brilla más que de día. Las pantallas cambian de color al ritmo de una música que sale de todas partes y de ninguna. La noria se ilumina en espiral, cabina a cabina. En el parque, alguien habla por un megáfono a un público que no le hace caso.',
			links: ['tes_ruta4'],
			mapNote: 'Gimnasio: Camila (Eléctrico) · Metro Batalla · Musical · estadio · noria · tren',
			onEnter: [{ script: 'b06_mayolica_llegada', cond: '!flag.b06_mayolica_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Mayólica', action: { shop: 'tienda_mayolica' } },
				{ label: 'Gimnasio de Mayólica', sub: 'Una torre de cristal con una pasarela al vacío', icon: '⚡', action: { go: 'gym_mayolica' }, new: 'flag.b06_mayolica_llegada && !beat("camila_g")' },
				{ label: 'Metro Batalla', sub: 'Escaleras abajo. Huele a freno y a combate', icon: '🚇', action: { go: 'metro_batalla' }, new: '!visited("metro_batalla")' },
				{ label: 'El Musical', sub: 'Marquesina de bombillas. Hoy, función de tarde', icon: '🎭', action: { go: 'musical_mayolica' }, new: '!flag.b06_tadeo_conocido' },
				{ label: 'El estadio', sub: 'Torneo juvenil de voleibol', icon: '🏐', action: { go: 'estadio_mayolica' }, new: '!flag.b06_camille_estadio' },
				{ label: 'La noria', sub: 'Gira tan despacio que parece quieta', icon: '🎡', action: { go: 'noria_mayolica' }, new: NORIA_ABIERTA },
				{ label: 'Estación de Mayólica', sub: 'Trenes regionales. Y una salida al bosque', icon: '🚉', action: { go: 'estacion_mayolica' }, new: 'flag.b06_pase_tren && !visited("estacion_mayolica")' },
				{ label: 'El parque', sub: 'Alguien grita por un megáfono', icon: '📢', cond: 'flag.b06_mayolica_llegada', new: '!flag.b06_plasma_parque', talk: [{ cond: '!flag.b06_plasma_parque', script: 'b06_plasma_parque' }, { script: 'b06_plasma_parque_despues' }] },
				{ label: 'Un chico con gorra de mensajero', sub: 'Lleva un sobre color crema y mira a todo el mundo', icon: '✉️', cond: 'flag.b06_noria_hecha && !flag.b06_apuntador_2', new: 'true', talk: [{ script: 'b06_apuntador_2' }] },
				{ label: 'El huevo de las ruinas', sub: 'Se mueve dentro de la mochila. Está muy caliente', icon: '🥚', cond: 'has("huevolarvesta") && flag.b06_camila_vencida', new: 'true', talk: [{ script: 'b06_larvesta_nace' }] },
				{ label: 'Rotom: ¿qué me queda en Mayólica?', sub: 'Repasa lo pendiente', icon: '📱', cond: 'flag.b06_mayolica_llegada && !flag.b06_t1_hecho', talk: [{ script: 'b06_mayolica_pendiente' }] },
				{ label: 'Las afueras', sub: 'Jardines entre los bloques de pisos', icon: '🌳', action: { explore: 'grass' } },
				{ label: 'Los árboles del bulevar', sub: 'Bayas en las jardineras de la avenida', icon: '🧺', new: '!flag.rec_b06_bulevar', action: { gather: 'b06_bulevar' } },
			],
			encounters: {
				grass: [
					{ sp: 'cinccino', lv: [59, 61], w: 18 },
					{ sp: 'liepard', lv: [59, 61], w: 16 },
					{ sp: 'garbodor', lv: [59, 61], w: 12 },
					{ sp: 'gothitelle', lv: [60, 62], w: 10 },
					{ sp: 'reuniclus', lv: [60, 62], w: 10 },
					{ sp: 'audino', lv: [59, 61], w: 12 },
					{ sp: 'emolga', lv: [59, 61], w: 8, time: 'day' },
					{ sp: 'zebstrika', lv: [61, 62], w: 3 },
					{ sp: 'togedemaru', lv: [60, 61], w: 3, displaced: true },
				],
			},
			rumors: [
				{ text: 'Camila no da entrevistas. Da desfiles. Dicen que una vez contestó a un periodista solo con la mirada y que el periodista lo publicó entero.' },
				{ text: 'En el Metro Batalla hay un tren que nunca para en la última estación. Los que llegan dicen que al fondo del vagón hay una puerta. Los que no llegan dicen que es mentira.' },
				{ text: 'La noria de Mayólica tarda veinte minutos en dar una vuelta. Hay parejas que se declaran en la primera y se arrepienten en la segunda.' },
				{ cond: 'flag.b06_noria_hecha', text: 'Desde lo de la cabina siete, en la taquilla de la noria han puesto el horario de mantenimiento en letra muy grande. «Para los detectives», dice el operario.' },
			],
		},

		// =================== GIMNASIO DE MAYÓLICA ===================
		gym_mayolica: {
			name: 'Gimnasio de Mayólica', parent: 'mayolica', kind: 'gym',
			bg: { type: 'gym', wall: '#1e1e2e', floor: '#f2c84a' },
			desc: 'Por dentro, el gimnasio es una pasarela de moda en mitad de una tormenta. El suelo es de paneles luminosos que se encienden al pisarlos; las paredes, de cristal negro; el techo, un enjambre de focos. Una música con mucho bajo hace temblar el pecho.\n\nAl fondo, la pasarela sale por la ventana y se queda colgando sobre la ciudad. Allí, de espaldas, alguien espera con los brazos cruzados.',
			mapNote: 'Líder: Camila (Eléctrico) · pasarelas',
			spots: [
				{ label: 'Modelo: Mirta', sub: 'Desfila sin mirar dónde pisa', icon: '⚡', action: { trainer: 'gym_mayolica_1' } },
				{ label: 'Modelo: Celestino', sub: 'Posa con un Electivire. Los dos con gafas de sol', icon: '⚡', action: { trainer: 'gym_mayolica_2' } },
				{ label: 'Las pasarelas de luz', sub: 'Los paneles se encienden y se apagan', icon: '💡', cond: '!(' + GYM_T + ')', talk: [{ script: 'b06_pasarelas_pronto' }] },
				{ label: 'Las pasarelas de luz', sub: 'Un bloque de metacrilato y una placa apagada', icon: '💡', cond: GYM_T + ' && !flag.b06_pasarelas', new: 'true', talk: [{ script: 'b06_pasarelas' }] },
				{ label: 'Camila', sub: 'Líder · tipo Eléctrico', icon: '⚡', cond: GYM_LISTO, new: '!beat("camila_g")', talk: [{ cond: 'beat("camila_g")', script: 'b06_camila_despues' }, { script: 'b06_camila_reto' }] },
			],
		},

		// =================== METRO BATALLA ===================
		metro_batalla: {
			name: 'Metro Batalla', parent: 'mayolica', kind: 'building',
			bg: { type: 'indoor', wall: '#3a4a6a', floor: '#5a5a6a' },
			desc: 'Un andén subterráneo con baldosas blancas, un reloj enorme y trenes que llegan cada tres minutos con las puertas abiertas y un combate dentro. Se sube, se pelea de estación en estación, se baja. Los revisores llevan gorra y un silbato que suena a final de combate.\n\nEn un banco del andén, un hombre de bata y gafas apunta en una libreta cada combate que pasa por delante.',
			mapNote: 'Entrenamiento (tope 63) · premio de los revisores',
			spots: [
				{ label: 'Subir al tren de práctica', sub: 'Zona de entrenamiento (nivel recomendado 63)', icon: '🚇', action: { training: {
					cap: 63, prize: { wins: 3, script: 'b06_premio_metro' }, trainers: ['metro_1', 'metro_2', 'metro_3', 'metro_4'], coach: 'Jefa de revisores',
					closed: 'La jefa de revisores te pica el billete, mira a tu equipo y te lo devuelve sin picar. «Con esos, el tren de práctica les queda corto. Suban a la torre de cristal, que Camila tiene ganas de que alguien la despeine».',
				} } },
				{ label: 'La jefa de revisores', sub: 'Gorra, silbato y un reloj de bolsillo', icon: '🎫', talk: [{ script: 'b06_revisora' }] },
				{ label: 'El hombre de la libreta', sub: 'Bata, gafas y un mechón azul', icon: '📓', new: '!flag.b06_acromo_visto', talk: [{ cond: '!flag.b06_acromo_visto', script: 'b06_acromo_metro' }, { script: 'b06_acromo_despues' }] },
				{ label: 'Un entrenador de alquiler', sub: 'Chaqueta vieja, un Greninja y un cartel: «SE ALQUILA RIVAL»', icon: '🐸', cond: 'flag.b05_bastien_rompe', new: '!flag.b06_bastien_metro', talk: [
					{ cond: '!flag.b06_bastien_metro', script: 'b06_bastien_metro' },
					{ cond: '!beat("bastien_7")', script: 'b06_bastien_reto' },
					{ script: 'b06_bastien_despues' },
				] },
			],
		},

		// =================== EL MUSICAL ===================
		musical_mayolica: {
			name: 'El Musical', parent: 'mayolica', kind: 'building',
			bg: { type: 'indoor', wall: '#5a1f3a', floor: '#8a3a2a' },
			desc: 'Terciopelo rojo, lámparas de araña y un escenario con el telón medio abierto. Entre bambalinas, percheros llenos de trajes con lentejuelas, plumas y pelucas para Pokémon. Huele a laca y a palomitas.\n\nEn el centro del escenario hay una trampilla pequeña, con forma de concha, por la que asoma una lucecita.',
			descNight: 'Después de la función, el Musical se queda a media luz. Los trajes cuelgan en silencio. En una percha del atrezo, un Chatot repite en voz baja las últimas frases de la obra, una por una, con la voz de cada actor.',
			mapNote: 'Liam (invitado) · Tadeo, el apuntador · el atrezo',
			spots: [
				{ label: 'Bambalinas', sub: 'Alguien grita «¡FUEGO!» y nadie se mueve', icon: '🔥', new: '!flag.b06_tepig', talk: [{ cond: '!flag.b06_tepig', script: 'b06_tepig' }, { script: 'b06_tepig_despues' }] },
				{ label: 'La trampilla del escenario', sub: 'Con forma de concha. Hay luz dentro', icon: '🐚', new: '!flag.b06_tadeo_conocido', talk: [{ cond: '!flag.b06_tadeo_conocido', script: 'b06_tadeo' }, { script: 'b06_tadeo_despues' }] },
				{ label: 'Un Chatot en una percha', sub: 'Entre las pelucas del atrezo', icon: '🦜', talk: [{ script: 'b06_chatot' }] },
				{ label: 'El programa de mano', sub: 'Un montón de programas en la taquilla', icon: '📜', talk: [{ script: 'b06_programa' }] },
				{ label: 'Una espectadora con sombrero de paja', sub: 'Su Altaria canta en la prueba de voces', icon: '☁️', cond: 'flag.b06_tadeo_conocido || flag.b06_tepig', new: '!beat("azucena_2")', talk: [{ cond: '!beat("azucena_2")', script: 'b06_azucena' }, { script: 'b06_azucena_despues' }] },
			],
			rumors: [
				{ text: 'El apuntador del Musical lleva quince años en la concha y nunca se ha perdido una función. Dicen que se sabe todas las obras de memoria. Y que el Chatot del atrezo, también.' },
				{ text: 'En el Musical hay un baúl de trajes que nadie abre desde hace años. Pone «Vestuario · temporada 1». Tiene un candado nuevo.' },
			],
		},

		// =================== EL ESTADIO ===================
		estadio_mayolica: {
			name: 'Estadio de Mayólica', parent: 'mayolica', kind: 'area',
			bg: { type: 'plaza', ground: '#3a8a5a', far: '#2b2b48' },
			desc: 'Un estadio con forma de concha, gradas de colores y una pista central dividida en cuatro canchas. Hoy hay **torneo juvenil de voleibol**: chicas y chicos de toda Teselia, y un par de equipos invitados de otras regiones. Silbatos, zapatillas chirriando, padres que gritan más que los entrenadores.',
			mapNote: 'Torneo juvenil de voleibol',
			spots: [
				{ label: 'La cancha 3', sub: 'Juega el equipo invitado de Kalos', icon: '🏐', new: '!flag.b06_camille_estadio', talk: [{ cond: '!flag.b06_camille_estadio', script: 'b06_camille' }, { script: 'b06_camille_despues' }] },
				{ label: 'La grada de arriba', sub: 'Un señor con un bigote que no es suyo', icon: '🥸', cond: 'flag.b04_lebrun_libre && has("notacamille") && !flag.b06_lebrun_nota', new: 'true', talk: [{ script: 'b06_lebrun_grada' }] },
			],
			rumors: [
				{ text: 'En el torneo juvenil hay una colocadora del equipo de Kalos que saca de arriba como una profesional. Dicen que hace un año no podía ni correr.' },
			],
		},

		// =================== LA NORIA ===================
		noria_mayolica: {
			name: 'La noria de Mayólica', parent: 'mayolica', kind: 'area',
			bg: { type: 'plaza', ground: '#8a8a9a', far: '#4a6a9a' },
			desc: 'Una noria de hierro blanco, altísima, con cabinas de cristal numeradas del 1 al 24. Gira tan despacio que la gente sube y baja sin que pare. Al pie, una **taquilla** con un toldo a rayas y un operario con mono azul que mira las cabinas pasar como quien cuenta ovejas.',
			descs: [
				{ cond: 'flag.b06_noria_hecha', text: 'La noria de hierro blanco gira despacio, con sus veinticuatro cabinas de cristal. En la taquilla, el horario de mantenimiento está pegado ahora en letra enorme, con un cartel nuevo: «LAS PLACAS SE CAMBIAN EN LA VUELTA LENTA. NO SE ASUSTEN».\n\nEl operario te saluda con la gorra. Su Emolga duerme en el toldo.' },
			],
			mapNote: 'El caso de la cabina siete',
			spots: [
				{ label: 'La taquilla', sub: 'Hay papeles pegados con celo', icon: '🎫', talk: [{ script: 'b06_taquilla' }] },
				{ label: 'El operario', sub: 'Mono azul. Mira la cabina siete sin parpadear', icon: '🎡', cond: NORIA_ABIERTA, new: 'true', talk: [{ script: 'b06_noria' }] },
				{ label: 'El operario', sub: 'Mono azul y un Emolga en el hombro', icon: '🎡', cond: '!(' + NORIA_ABIERTA + ')', talk: [{ script: 'b06_operario' }] },
				{ label: 'Subir a dar una vuelta', sub: '₽300. Veinte minutos sobre la ciudad', icon: '🎡', cond: 'flag.b06_noria_hecha', talk: [{ script: 'b06_noria_vuelta' }] },
			],
		},

		// =================== ESTACIÓN ===================
		estacion_mayolica: {
			name: 'Estación de Mayólica', parent: 'mayolica', kind: 'building',
			bg: { type: 'indoor', wall: '#8a6a4a', floor: '#c9b48a' },
			desc: 'Una estación antigua de ladrillo rojo y hierro verde, con un reloj de cuatro caras colgado del techo. Por un andén salen los trenes regionales hacia el este. Por el otro lado, una puerta de cristal da a un camino que se mete entre árboles muy altos: el **Bosque Azulejo**.\n\nEl revisor lleva una gorra con el sello de la Gira cosido a mano.',
			mapNote: 'Tren a Pueblo Chamota · salida al Bosque Azulejo',
			spots: [
				{ label: '🚆 Tren a Pueblo Chamota', sub: 'Al este, donde las murallas', icon: '🚆', cond: 'flag.b06_pase_tren', new: '!visited("chamota")', action: { go: 'chamota' } },
				{ label: 'Salida al Bosque Azulejo', sub: 'Hacia el Puente Saeta y Ciudad Esmalte', icon: '🌲', cond: 'flag.b06_pase_tren', new: '!visited("bosque_azulejo")', action: { go: 'bosque_azulejo' } },
				{ label: 'El revisor', sub: 'Pica billetes con mucha ceremonia', icon: '🎫', talk: [{ script: 'b06_revisor_estacion' }] },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Ruta 4 -----
		tes4_eneko: { name: 'Eneko', cls: 'Motorista', ai: 2,
			team: [
				{ sp: 'scrafty', lv: 60, moves: ['highjumpkick', 'crunch', 'dragonclaw', 'icepunch'] },
				{ sp: 'garbodor', lv: 61, moves: ['gunkshot', 'bodyslam', 'drainpunch', 'toxicspikes'] },
			],
			intro: 'Llevo seis años esperando a que acaben la Ruta 4. Seis. Hoy me he cansado y he venido en moto por la arena. ¿Combate? Así le doy tiempo a la moto para que se le enfríe el motor.',
			win: 'La moto sigue caliente. Yo, frío. Me vuelvo a Porcelana por la autopista, como la gente normal.',
			look: { hair: 'spiky', hairColor: '#2a2420', outfit: '#2b2b38', outfit2: '#c43a3a', skin: 2, eyesStyle: 'sharp', mouth: 'grin', acc: 'goggles', collar: 'jacket' } },
		tes4_dalia: { name: 'Dalia', cls: 'Excavadora', ai: 2,
			team: [
				{ sp: 'crustle', lv: 61, moves: ['rockslide', 'xscissor', 'earthquake', 'shellsmash'] },
				{ sp: 'cofagrigus', lv: 61, moves: ['shadowball', 'willowisp', 'hex', 'protect'] },
			],
			intro: 'Soy de la expedición del Museo. Me han mandado a por agua. ¡Sin agua no se excava! Bueno, se excava, pero de mal humor. ¡Combate!',
			win: 'Me vuelvo sin agua y sin victoria. La jefa me va a mirar raro. Me mira raro siempre, pero hoy con motivo.',
			look: { hair: 'ponytail', hairColor: '#8a5a2f', outfit: '#c9a66b', outfit2: '#3a6a4a', skin: 3, eyesStyle: 'happy', mouth: 'open', acc: 'hat', hatColor: '#c9a66b' } },
		tes4_bernabe: { name: 'Bernabé', cls: 'Montañero', ai: 2,
			team: [
				{ sp: 'excadrill', lv: 62, moves: ['earthquake', 'ironhead', 'rockslide', 'swordsdance'] },
				{ sp: 'sandslash', lv: 61, moves: ['earthquake', 'crushclaw', 'rockslide', 'rapidspin'] },
			],
			intro: 'Me dijeron que en Teselia no había montañas por aquí. Así que subo dunas. Llevo cuarenta. ¡La cuarenta y una eres tú!',
			win: 'No eras una duna. Eras un acantilado. Me lo apunto.',
			look: { hair: 'cap', hairColor: '#6a6a6a', outfit: '#8a5a2f', outfit2: '#e9e3d0', skin: 3, eyesStyle: 'normal', mouth: 'smile', acc: 'beard', capColor: '#3a6a4a' } },
		tes4_ramona: { name: 'Ramona', cls: 'Dama', ai: 2,
			team: [
				{ sp: 'cinccino', lv: 61, moves: ['tailslap', 'rockblast', 'bulletseed', 'uturn'] },
				{ sp: 'gothitelle', lv: 62, moves: ['psychic', 'shadowball', 'thunderbolt', 'calmmind'] },
			],
			intro: 'Voy a Mayólica a ver el Musical. A pie, porque el chófer se negó a meter el coche en la arena. Despedido. ¿Me acompañas un trecho? Primero, combate. Es lo educado.',
			win: 'Encantadora. Usted, no la arena. La arena es una grosería.',
			look: { hair: 'bun', hairColor: '#e9e8e0', outfit: '#8a2f5a', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'sleepy', mouth: 'smile', acc: 'hat glasses', hatColor: '#e9e3d0' } },
		tes4_tristan: { name: 'Tristán', cls: 'Turista', ai: 2,
			team: [
				{ sp: 'sigilyph', lv: 62, moves: ['psychic', 'airslash', 'heatwave', 'roost'] },
				{ sp: 'maractus', lv: 61, moves: ['petalblizzard', 'suckerpunch', 'spikyshield', 'leechseed'] },
			],
			intro: 'He venido de Alola por la Puerta nueva para ver el desierto. En Alola también hay desierto, pero es de otro sitio. Literalmente. Es largo de contar. ¡Combate!',
			win: 'Este desierto me gusta más. Por lo menos se queda donde está.',
			look: { hair: 'waves', hairColor: '#e9c46a', outfit: '#3aa8c4', outfit2: '#e9e8e0', skin: 2, eyesStyle: 'happy', mouth: 'grin', acc: 'hat', hatColor: '#f2c84a' } },

		// ----- Gimnasio -----
		gym_mayolica_1: { name: 'Mirta', cls: 'Modelo', ai: 3, iv: 24, bg: 'gym',
			team: [
				{ sp: 'heliolisk', lv: 61, moves: ['thunderbolt', 'surf', 'grassknot', 'voltswitch'] },
				{ sp: 'jolteon', lv: 62, moves: ['thunderbolt', 'shadowball', 'voltswitch', 'hypervoice'] },
			],
			intro: 'En la pasarela de Camila no se mira al suelo. El suelo te mira a ti. ¡Desfila o cae!',
			win: 'Has mirado al suelo. Dos veces. Y aun así. Qué rabia.',
			look: { hair: 'long', hairColor: '#f2e6a0', outfit: '#2b2b38', outfit2: '#f2c84a', skin: 1, eyesStyle: 'lashes', mouth: 'lips', acc: 'lipstick' } },
		gym_mayolica_2: { name: 'Celestino', cls: 'Modelo', ai: 3, iv: 24, bg: 'gym',
			team: [
				{ sp: 'magnezone', lv: 61, moves: ['flashcannon', 'thunderbolt', 'bodypress', 'voltswitch'] },
				{ sp: 'electivire', lv: 62, moves: ['thunderpunch', 'icepunch', 'lowkick', 'earthquake'] },
			],
			intro: 'Electivire y yo llevamos las mismas gafas. Las suyas son graduadas. Las mías, no. Pero las suyas me las pidió prestadas a mí. ¡Combate!',
			win: 'Electivire dice que le tapaban la vista. Excusas. Las gafas eran preciosas.',
			look: { hair: 'quiff', hairColor: '#2a2420', outfit: '#e9e8e0', outfit2: '#3a8ac4', skin: 3, eyesStyle: 'sharp', mouth: 'smirk', acc: 'squareglasses' } },

		// ----- Camila (líder) -----
		camila_g: { name: 'Camila', cls: 'Líder', npc: 'camila', ai: 4, iv: 26, reward: 7560, bg: 'gym',
			gimmick: 'mega', ace: 'eelektross',
			team: [
				{ sp: 'emolga', lv: 60, moves: ['acrobatics', 'thunderbolt', 'encore', 'uturn'], ability: 'motordrive', nature: 'jolly', iv: 27 },
				{ sp: 'zebstrika', lv: 61, moves: ['wildcharge', 'overheat', 'highhorsepower', 'bounce'], ability: 'sapsipper', nature: 'jolly', iv: 28 },
				{ sp: 'galvantula', lv: 61, moves: ['thunder', 'bugbuzz', 'energyball', 'stickyweb'], ability: 'compoundeyes', item: 'focussash', nature: 'timid', iv: 28 },
				{ sp: 'ampharos', lv: 62, moves: ['thunderbolt', 'dragonpulse', 'focusblast', 'powergem'], ability: 'static', item: 'sitrusberry', nature: 'modest', iv: 29 },
				{ sp: 'eelektross', lv: 63, moves: ['wildcharge', 'thunderfang', 'thunderwave', 'flamethrower'], ability: 'levitate', item: 'eelektrossite', nature: 'brave', iv: 29 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: 'Las luces. —Chasquea los dedos y se apagan todas menos una, encima de ella—. Así. Ahora sí. ¡Emolga, sal a brillar!',
			win: 'Me has apagado. —Se ríe, de verdad—. Hacía mucho que nadie me apagaba.',
			lose: 'No pasa nada. Hasta las estrellas tienen días nublados. Vuelve cuando brilles.' },

		// ----- Metro Batalla (zona de entrenamiento) -----
		metro_1: { name: 'Adolfo', cls: 'Ferroviario', ai: 2,
			team: [
				{ sp: 'klinklang', lv: 61, moves: ['geargrind', 'wildcharge', 'shiftgear', 'thunderwave'] },
				{ sp: 'excadrill', lv: 61, moves: ['earthquake', 'ironhead', 'rockslide', 'rapidspin'] },
			],
			intro: 'Treinta años engrasando estos trenes. Si me ganas, te dejo tocar el silbato. Si no, lo toco yo. Lo toco yo siempre.',
			win: 'Toca, toca. Pero flojito, que asusta a los Woobat del túnel.',
			look: { hair: 'cap', hairColor: '#9aa0a8', outfit: '#3a4a6a', outfit2: '#f2c84a', skin: 2, eyesStyle: 'sleepy', mouth: 'smile', acc: 'mustache', capColor: '#3a4a6a' } },
		metro_2: { name: 'Brenda', cls: 'Revisora', ai: 2,
			team: [
				{ sp: 'zebstrika', lv: 62, moves: ['wildcharge', 'flamecharge', 'stomp', 'agility'] },
				{ sp: 'liepard', lv: 61, moves: ['nightslash', 'playrough', 'uturn', 'fakeout'] },
			],
			intro: '¡Billete, por favor! ¿No tienes? Pues se paga en combate. Es la tarifa de siempre.',
			win: 'Billete pagado. Con propina. Buen viaje.',
			look: { hair: 'bob', hairColor: '#3a2a1e', outfit: '#3a4a6a', outfit2: '#c43a3a', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'cap', capColor: '#3a4a6a' } },
		metro_3: { name: 'Greta', cls: 'Entrenadora de alquiler', ai: 3,
			team: [
				{ sp: 'conkeldurr', lv: 62, moves: ['drainpunch', 'firepunch', 'stoneedge', 'icepunch'] },
				{ sp: 'scolipede', lv: 62, moves: ['megahorn', 'poisonjab', 'earthquake', 'rockslide'] },
			],
			intro: 'Me alquilan por horas para que la gente practique. Tú no me has alquilado, así que esta va gratis. No te acostumbres.',
			win: 'Si quieres la siguiente, son quinientos. Es broma. Son ochocientos.',
			look: { hair: 'short', hairColor: '#c4473a', outfit: '#2b2b38', outfit2: '#f2b33d', skin: 4, eyesStyle: 'sharp', mouth: 'grin', acc: 'bandana' } },
		metro_4: { name: 'Leonel', cls: 'Maquinista', ai: 3,
			team: [
				{ sp: 'galvantula', lv: 62, moves: ['thunder', 'bugbuzz', 'energyball', 'voltswitch'] },
				{ sp: 'chandelure', lv: 63, moves: ['shadowball', 'flamethrower', 'energyball', 'willowisp'] },
			],
			intro: 'El último tren. El de la puerta al fondo del vagón. Si me ganas, la abres. Si no, te bajas en la siguiente. Como todos.',
			win: 'Abre la puerta. Detrás no hay nada. Es la cabina del conductor. Pero qué ilusión hace, ¿eh?',
			look: { hair: 'cap', hairColor: '#2a2420', outfit: '#2b2b38', outfit2: '#e9e8e0', skin: 2, eyesStyle: 'narrow', mouth: 'flat', acc: 'goggles', capColor: '#2b2b38' } },

		// ----- Parque: remanente Plasma (opcional) -----
		plasma_may_1: { name: 'Recluta', cls: 'Equipo Plasma', npc: 'recluta_plasma', ai: 2,
			team: [
				{ sp: 'liepard', lv: 61, moves: ['nightslash', 'playrough', 'fakeout', 'uturn'] },
				{ sp: 'garbodor', lv: 61, moves: ['gunkshot', 'bodyslam', 'drainpunch', 'toxicspikes'] },
			],
			intro: '¿Vienes a liberar a tus Pokémon? ¿No? ¡Entonces vienes a pelear! ¡Es lo que hacen siempre los que no escuchan!',
			win: 'Pelear contra ti me ha liberado de algo. De la idea de que te iba a ganar.' },

		// ----- Azucena (opcional, Mega-Altaria) -----
		azucena_2: { name: 'Azucena', cls: 'Turista', ai: 3, iv: 26, reward: 3800, gimmick: 'mega', ace: 'altaria', bg: 'center',
			team: [
				{ sp: 'pelipper', lv: 60, moves: ['hurricane', 'scald', 'uturn', 'roost'], ability: 'drizzle', nature: 'modest' },
				{ sp: 'comfey', lv: 60, moves: ['drainingkiss', 'gigadrain', 'calmmind', 'synthesis'], ability: 'triage', nature: 'calm' },
				{ sp: 'swanna', lv: 61, moves: ['hurricane', 'scald', 'icebeam', 'roost'], ability: 'keeneye', nature: 'timid' },
				{ sp: 'altaria', lv: 62, moves: ['hypervoice', 'dragonpulse', 'flamethrower', 'roost'], ability: 'naturalcure', item: 'altarianite', nature: 'modest' },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Altaria ha vuelto a cantar. Desde Alola no lo hacía. Quiero que lo oigas en serio: en un combate. ¡Es cuando mejor canta!',
			win: 'Ha cantado hasta el final. Hasta perdiendo. Eso no me lo había hecho nunca.',
			lose: '¿Has oído el agudo del final? Era para ti. Bueno, contra ti. Pero para ti.',
			look: { hair: 'long', hairColor: '#4a8ac4', outfit: '#e9e8e0', outfit2: '#8ab0e0', skin: 1, eyesStyle: 'happy', mouth: 'smile', acc: 'hat flower' } },

		// ----- Bastien (opcional, solo si rompió el contrato) -----
		bastien_7: { name: 'Bastien', cls: 'Rival', npc: 'bastien', ai: 4, iv: 29, reward: 5040, bg: 'indoor',
			team: [
				{ sp: 'talonflame', lv: 60, moves: ['bravebird', 'flareblitz', 'uturn', 'roost'], ability: 'flamebody', nature: 'jolly', iv: 28 },
				{ sp: 'meowstic', lv: 61, moves: ['psychic', 'shadowball', 'lightscreen', 'reflect'], ability: 'prankster', nature: 'timid', iv: 28 },
				{ sp: 'pyroar', lv: 61, moves: ['flamethrower', 'hypervoice', 'darkpulse', 'willowisp'], ability: 'unnerve', nature: 'modest', iv: 28 },
				{ sp: 'aegislash', lv: 62, moves: ['kingsshield', 'shadowball', 'flashcannon', 'sacredsword'], ability: 'stancechange', nature: 'quiet', iv: 29 },
				{ sp: 'greninja', lv: 63, moves: ['hydropump', 'darkpulse', 'icebeam', 'extrasensory'], ability: 'torrent', item: 'sitrusberry', nature: 'timid', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Este no te lo cobro. Primer combate gratis de la página nueva: «Cosas que hago porque quiero, segunda parte».',
			win: 'Lo apunto. Con mi letra, en mi libreta, que ya no es de nadie más.',
			lose: '¡Te he ganado sin contrato! Suena mejor de lo que esperaba.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LLEGADA A MAYÓLICA ===================
		b06_mayolica_llegada: [
			{ set: { 'flag.b06_mayolica_llegada': true } },
			{ cutscene: { time: 'dia', weather: 'sparks', bg: { type: 'city', roofs: ['#f2c84a', '#3a8ac4', '#c43a7a', '#e9e8e0'], far: '#2b2b48' }, start: 'dark', frames: [
				{ big: true, text: 'Ciudad Mayólica', sub: 'Teselia', hold: 2400, cam: 'still' },
				{ cam: 'pull', fx: 'light', text: 'A pleno día, Mayólica tiene todos los focos encendidos. Barren el cielo de un lado a otro como si buscaran algo que se les ha perdido arriba.' },
				{ cam: 'pan-up', text: 'Pantallas en las fachadas, un estadio con forma de concha y, por encima de los tejados, una noria blanca que gira tan despacio que parece pintada.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left' }], cam: 'push', text: 'En la pantalla más grande, una mujer rubia con auriculares de oro mira a cámara sin pestañear. Un rayo cruza la pantalla de lado a lado. {riolu} se pone a su altura y le aguanta la mirada.', cond: LUC },
				{ cam: 'push', text: 'En la pantalla más grande, una mujer rubia con auriculares de oro mira a cámara sin pestañear. Un rayo cruza la pantalla de lado a lado. Durante un segundo, tienes la impresión de que te mira a ti.', cond: '!(' + LUC + ')' },
				{ fx: ['flash', 'sparkle'], color: '#f2c84a', cam: 'still', text: '«**CAMILA** · Gimnasio de Mayólica». Debajo, más pequeño: «Brilla o no brilles».' },
			] } },
			{ say: 'rotom', text: '¡Bzzt! ¡Mayólica! La ciudad con más vatios por metro cuadrado de todo el mundo. Lo dice un cartel. Yo lo he medido y me han dado cosquillas.' },
			{ say: 'rotom', text: 'El **Gimnasio** está en la torre de cristal: la líder es **Camila**, tipo **Eléctrico**. Y además hay un **Metro Batalla** para entrenar, un **Musical**, un **estadio** y la **noria**.' },
			{ say: 'rotom', text: 'Y la carta de la caja decía «la noria». No se me olvida. A mí no se me olvida nada.', cond: 'flag.b06_apuntador_1' },
			{ quest: 'b06_m2', stage: 'gimnasio' },
			{ text: 'La Pokédex vibra. Un mensaje.' },
			{ if: 'flag.b04_lebrun_detenido', then: [
				{ say: 'handsome', as: 'Handsome (mensaje)', text: '¡Colaborador! Handsome está en Mayólica. En el estadio. Con una pancarta. Hay un torneo juvenil y juega cierta colocadora de Kalos. Su padre me lo pidió. Desde donde está. Handsome no podía decir que no. Ven si puedes. La pancarta necesita apoyo.' },
			] },
			{ if: 'flag.b04_lebrun_cebo', then: [
				{ say: 'handsome', as: 'Handsome (mensaje)', text: 'Colaborador. Torneo juvenil en el estadio de Mayólica. Juega Camille. Su padre ha venido a verla. Handsome también. Dos filas más atrás. Con gorra. No es un disfraz: es una gorra. Pasa a saludar a la niña. Al padre, si quieres.' },
			] },
			{ if: 'flag.b04_lebrun_libre', then: [
				{ say: 'handsome', as: 'Handsome (mensaje)', text: 'Colaborador. Hay un torneo juvenil en el estadio de Mayólica. Juega Camille. Su padre sigue sin aparecer. Handsome no puede ir hoy. Si pasas por allí… salúdala de mi parte. Y mira las gradas. Por costumbre.' },
			] },
			{ if: LEBRUN_NINGUNO, then: [
				{ say: 'handsome', as: 'Handsome (mensaje)', text: 'Colaborador. Hay un torneo juvenil en el estadio de Mayólica. Juega una chica de Kalos que conocimos en Alola: Camille. Si pasas por allí, salúdala. Le hará ilusión ver una cara conocida.' },
			] },
			{ quest: 'b06_t_camille', stage: 'estadio' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo llegamos a Ciudad Mayólica cruzando un desierto. ¡Un desierto de verdad, con arena que se mete en los botones! Bueno, yo no tengo botones. Tengo uno. Se me metió arena.\n\nMayólica tiene más luces que Luminalia, y eso que Luminalia se llama así. Hay una noria, un metro donde se combate y una líder en una pantalla gigante que no parpadea. {riolu} tampoco parpadeó. Empate.', cond: 'flag.b01_diario' },
		],
		b06_mayolica_pendiente: [
			{ say: 'rotom', text: '¡Bzzt! Lista de cosas en Mayólica:' },
			{ say: 'rotom', text: '• La líder **Camila**, en la torre de cristal. Primero hay que ganar a sus dos modelos.', cond: '!beat("camila_g")' },
			{ say: 'rotom', text: '• Entrenar en el **Metro Batalla**. La jefa de revisores da un premio a quien gane tres.', cond: '!flag.b06_premio_metro' },
			{ say: 'rotom', text: '• La carta de la caja: la **noria**. El operario está muy nervioso.', cond: NORIA_ABIERTA },
			{ say: 'rotom', text: '• Un chico con gorra te busca por la ciudad. Lleva un sobre color crema. Uf.', cond: 'flag.b06_noria_hecha && !flag.b06_apuntador_2' },
			{ say: 'rotom', text: '• **Camille** juega en el **estadio**.', cond: '!flag.b06_camille_estadio' },
			{ say: 'rotom', text: '• En el **Musical** alguien grita «¡fuego!» y nadie se mueve. Eso no es normal. Bueno, en un teatro, a lo mejor sí.', cond: '!flag.b06_tepig' },
			{ say: 'rotom', text: '• La arqueóloga de las **Ruinas del desierto** (desvío de la Ruta 4) busca algo en la arena.', cond: '!flag.b06_larvesta_visto' },
			{ say: 'rotom', text: '• El huevo de las ruinas. Va muy calentito en la mochila. Calculo que se moverá después de un buen combate con mucha electricidad. Es un cálculo a ojo. No tengo ojo. Tengo lente.', cond: 'has("huevolarvesta") && !flag.b06_camila_vencida' },
			{ say: 'rotom', text: '• En el **Metro Batalla** hay alguien con un cartel de «SE ALQUILA RIVAL». Tiene un Greninja. ¡Y una cara conocida!', cond: 'flag.b05_bastien_rompe && !flag.b06_bastien_metro' },
		],

		// =================== RUINAS DEL DESIERTO: LARVESTA ===================
		b06_larvesta_inicio: [
			{ set: { 'flag.b06_larvesta_visto': true } },
			{ text: 'Debajo de la lona del campamento, una mujer con sombrero de explorador y un pañuelo al cuello cepilla una piedra con un pincel de maquillaje. Tiene arena en las cejas.' },
			{ say: 'paleontologa', as: 'Arqueóloga', text: '¿Eres de la Gira? Llevas la tarjeta en la mochila, se ve desde aquí. Expedición del Museo de Esmalte. Bueno, la expedición soy yo, dos becarios y una radio que solo agarra boleros.' },
			{ say: 'paleontologa', as: 'Arqueóloga', text: 'La profesora Encina nos mandó a buscar restos de un Pokémon que los antiguos llamaban «el sol de las ruinas». Restos no hemos encontrado. Pero hace una semana pasó una cosa.' },
			{ text: 'Señala con el pincel a la escalinata. El Darmanitan sigue allí sentado, con los brazos cruzados alrededor de la barriga, sin moverse.' },
			{ say: 'paleontologa', as: 'Arqueóloga', text: 'Una noche vimos volar algo enorme sobre las ruinas. Seis alas de fuego. Bajó, se quedó un rato en la escalinata y se fue hacia el oeste. Por la mañana, el Darmanitan ya estaba ahí sentado. No se ha movido desde entonces. Ni para comer.' },
			{ say: 'paleontologa', as: 'Arqueóloga', text: 'Creo que está tapando algo con el cuerpo. Algo que se dejó el que se fue. Pero no deja que nadie se acerque. A mí me ha soplado dos veces. Soplar, para un Darmanitan, es como para ti gritar.' },
			{ if: LUC, then: [
				{ text: '{riolu} se adelanta un paso. Mira la escalinata. Las orejas hacia delante, la palma un poco abierta, como cuando nota algo vivo debajo de algo.' },
				{ say: 'paleontologa', as: 'Arqueóloga', text: '¿Tu Lucario lo nota? ¿Lo que tiene debajo? —Se le van las cejas para arriba y se le cae arena de ellas—. A lo mejor a él le deja acercarse.' },
			], else: [
				{ say: 'paleontologa', as: 'Arqueóloga', text: 'Tengo un detector en la caja. Para metales, no para huevos. Pero a lo mejor algo pita. Si te animas, te lo presto.' },
			] },
			{ quest: 'b06_s_larvesta', stage: 'huevo' },
		],
		b06_larvesta_buscar: [
			{ text: 'Subes la escalinata despacio. El aire tiembla de calor. El Darmanitan abre un ojo. Luego el otro. Suelta un resoplido que te despeina y que huele a carbón.' },
			{ if: LUC, then: [
				{ text: '{riolu} se pone delante de ti. No se agacha ni levanta la guardia: se sienta en el escalón, de lado, como quien se sienta en un banco al lado de un desconocido. El Darmanitan lo mira mucho rato. Luego descruza un brazo.' },
				{ text: 'Debajo hay arena. Solo arena. Pero el aura de {riolu} se enciende, muy suave, y empieza a palpar el suelo con la palma, como quien busca un latido.' },
				{ minigame: { type: 'aura', id: 'b06_larvesta_arena', title: 'Algo late bajo la arena', hint: '{riolu} nota algo vivo y caliente bajo la escalinata. Cuanto más cerca, más tibio. No pises lo que late.', theme: 'ruina', level: 2,
					guaranteed: ['huevolarvesta'], loot: [{ id: 'stardust', w: 6 }, { id: 'softsand', w: 5 }, { id: 'heatrock', w: 3 }, { id: 'sunstone', w: 1, rare: true }], picks: 2, consolation: 'softsand', lootTitle: 'Bajo la escalinata' },
					onWin: [{ call: 'b06_larvesta_huevo' }],
					onLose: [{ text: 'El aura de {riolu} se apaga. Ha perdido el rastro. El Darmanitan resopla, pero no se mueve: sigue dejando el brazo descruzado. Se puede volver a intentar.' }],
					onQuit: [{ text: 'Se apartan de la escalinata. El Darmanitan vuelve a cruzar el brazo. Despacio. Como quien dice «cuando quieras».' }] },
			], else: [
				{ text: 'La arqueóloga sube detrás de ti con un detector de metales que pita cada vez que pasa por encima de una lata. El Darmanitan la mira con desprecio. A ti, con un poco menos.' },
				{ minigame: { type: 'aura', id: 'b06_larvesta_detector', title: 'El detector de la expedición', hint: 'El detector pita más cuanto más cerca está algo caliente. Lo que busca el Darmanitan no es una lata.', theme: 'buscaobjetos', level: 2,
					guaranteed: ['huevolarvesta'], loot: [{ id: 'stardust', w: 6 }, { id: 'softsand', w: 5 }, { id: 'heatrock', w: 3 }, { id: 'sunstone', w: 1, rare: true }], picks: 2, consolation: 'softsand', lootTitle: 'Bajo la escalinata' },
					onWin: [{ call: 'b06_larvesta_huevo' }],
					onLose: [{ text: 'El detector pita por una chapa de refresco. El Darmanitan resopla. La arqueóloga dice que el detector es de segunda mano y que su anterior dueño solo buscaba chapas.' }],
					onQuit: [{ text: 'Bajan de la escalinata. El Darmanitan no les quita ojo.' }] },
			] },
		],
		b06_larvesta_huevo: [
			{ set: { 'flag.b06_larvesta': true } },
			{ text: 'Entre la arena, a un palmo de la superficie, hay un **huevo**: blanco, con manchas color ceniza, tan caliente que casi no se puede tocar. Late. Despacio, como una brasa que respira.' },
			{ text: 'El Darmanitan lo mira. Te mira a ti. Mira el huevo otra vez. Y se aparta, muy despacio, como quien deja el asiento a otro en el autobús.' },
			{ say: 'paleontologa', as: 'Arqueóloga', text: 'Te lo deja a ti. —Lo dice en voz bajísima—. Una semana sin dejar que se acerque nadie, y te lo deja a ti.' },
			{ if: LARVESTA, then: [
				{ text: 'Pero cuando vas a tomarlo, el huevo se mueve hacia el Darmanitan. Un poco. Como si supiera quién le ha dado calor toda la semana.' },
				{ say: 'rotom', text: '¡Bzzt! Ya tenemos un Pokémon de esa familia, ¿verdad? Lo noto en la caja. Mejor que este se quede con su… ¿abuelo? ¿Niñera? ¿Estufa?' },
				{ prompt: 'El huevo se arrima al Darmanitan.', choice: [
					{ text: 'Dejárselo al Darmanitan.', then: [
						{ take: 'huevolarvesta' },
						{ set: { 'flag.b06_larvesta_ruinas': true } },
						{ text: 'Vuelves a dejar el huevo en la arena. El Darmanitan lo rodea con los brazos y suelta un resoplido que esta vez no huele a carbón. Huele a algo parecido a «gracias».' },
						{ say: 'paleontologa', as: 'Arqueóloga', text: 'Lo apuntaré en el diario de la expedición. «Huevo de origen desconocido, bajo custodia de un Darmanitan». Encina se va a reír. Luego vendrá a verlo.' },
						{ quest: 'b06_s_larvesta', stage: 'hecha', done: true },
					] },
				] },
			], else: [
				{ say: 'rotom', text: '¡Bzzt! Leo… nada. La Pokédex no reconoce el huevo. Solo pone «caliente». Muy caliente. Calculo que se abrirá cuando haya pasado un poco de tiempo con nosotros. Y con un buen chispazo de por medio, por si acaso.' },
				{ say: 'paleontologa', as: 'Arqueóloga', text: 'Llévatelo. Envuélvelo en algo. Y cuando se abra, vuelve a decírmelo. Al Darmanitan también: aunque no lo parezca, se enterará.' },
			] },
			{ if: LUC, then: [{ happy: { who: 'riolu', n: 5 } }] },
		],
		b06_larvesta_nace: [
			{ take: 'huevolarvesta' },
			{ set: { 'flag.b06_larvesta_nacido': true } },
			{ text: 'En mitad de la avenida, la mochila se pone a temblar. Luego, a echar humo. Una señora con un caniche se aparta. El caniche, no: se queda mirando, fascinado.' },
			{ cutscene: { time: 'tarde', bg: { type: 'city', roofs: ['#f2c84a', '#3a8ac4', '#c43a7a'], far: '#2b2b48' }, frames: [
				{ cam: 'push', fx: 'heartbeat', color: '#f2a03a', text: 'El huevo late cada vez más deprisa. Tiene una grieta. Dos. Por las grietas sale una luz naranja, como la de una estufa vieja.' },
				{ mon: 'larvesta', fx: ['flash', 'sparkle'], color: '#f2a03a', text: 'Y de dentro, de un salto, sale un **Larvesta**: blanco y peludo, con cinco cuernos rojos que echan humo. Estornuda. Se le encienden los cuernos.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.25, enter: 'left' }], on: '_c', fx: 'glow', text: '{riolu} se agacha. El Larvesta le toca la palma con un cuerno, comprueba que no quema, y se le sube al brazo como si fuera una duna.', cond: LUC },
				{ on: '_c', cam: 'pull', fx: 'rays', text: 'Te mira. Muy en serio. Como si le hubieran contado algo de ti dentro del huevo y quisiera comprobar si era verdad.' },
			] } },
			{ pokemon: { sp: 'larvesta', lv: 58, nature: 'modest', ability: 'flamebody', happy: 140, moves: ['flamethrower', 'bugbuzz', 'leechlife', 'flamecharge'], ivs: { hp: 26, atk: 22, def: 24, spa: 31, spd: 28, spe: 29 } } },
			{ say: 'rotom', text: '¡Bzzt! ¡Larvesta! Pokémon Antorcha. Dicen que es la cría del «sol» de las leyendas. ¡Y ha nacido en mitad de una avenida con caniche! Lo apunto todo. Sobre todo el caniche.' },
			{ say: 'paleontologa', as: 'Arqueóloga (mensaje)', text: '¿Ha nacido? ¡¿Ha nacido?! Se lo he dicho al Darmanitan. Ha resoplado tres veces. Eso es muchísimo. Cuídalo. Y si algún día le salen alas, mándame una foto. Bueno, dos.' },
			{ quest: 'b06_s_larvesta', stage: 'hecha', done: true },
		],
		b06_arqueologa_generico: [
			{ if: 'flag.b06_larvesta_ruinas', then: [
				{ say: 'paleontologa', as: 'Arqueóloga', text: 'El Darmanitan ya come. Una vez al día, con el huevo entre los brazos. Lo llamamos «el abuelo». No le gusta. Se lo seguimos llamando.' },
			] },
			{ if: 'flag.b06_larvesta_nacido', then: [
				{ say: 'paleontologa', as: 'Arqueóloga', text: '¡Larvesta! ¡En persona! —Lo mira por la lupa, aunque no le hace falta—. Ahora el Darmanitan se pasa el día mirando al oeste. Por donde se fue el de las seis alas. Creo que espera que vuelva a por noticias.' },
			] },
			{ if: 'has("huevolarvesta")', then: [
				{ say: 'paleontologa', as: 'Arqueóloga', text: '¿Sigue caliente? Que no se te enfríe. Y no lo metas en la nevera, que ya me ha pasado con una muestra. Era un sándwich. Pero aun así.' },
			] },
			{ if: '!flag.b06_larvesta', then: [
				{ say: 'paleontologa', as: 'Arqueóloga', text: 'El Darmanitan sigue en la escalinata. Si quieres intentarlo, ve despacio. Y no le mires a los ojos. Bueno, sí. Pero con respeto.' },
			] },
			{ say: 'paleontologa', as: 'Arqueóloga', text: 'Si te sobra tiempo, el frente de excavación es tuyo. A veces salen monedas de cobre de hace mil años. A veces, chapas de refresco de hace dos. Las dos cosas van al museo.' },
		],
		b06_darmanitan_despues: [
			{ if: 'flag.b06_larvesta_ruinas', then: [
				{ text: 'El Darmanitan está sentado con el huevo entre los brazos. Cuando te ve, levanta un brazo un poco, lo justo para que veas que sigue ahí. Luego lo vuelve a tapar.' },
			], else: [
				{ text: 'El Darmanitan está sentado en la escalinata, mirando hacia el oeste. Cuando te ve, resopla una vez, sin carbón. Te reconoce.' },
			] },
		],

		// =================== GIMNASIO: PASARELAS ===================
		b06_pasarelas_pronto: [
			{ text: 'Los paneles del suelo se encienden y se apagan en un orden que no entiendes. Algunos llevan a la pasarela del fondo. Otros, a una pared de cristal negro.' },
			{ say: 'rotom', text: '¡Bzzt! Primero los dos modelos, creo. Están mirándonos como quien mira a alguien que no ha desfilado.' },
		],
		b06_pasarelas: [
			{ text: 'Con los dos modelos vencidos, los paneles del suelo se quedan quietos. Encendidos solo los de un recorrido. En el centro, un bloque de metacrilato del tamaño de una maleta, con un rayo pintado dentro. Al lado, una placa en el suelo con el mismo rayo, apagada.' },
			{ say: 'modelo_mirta', as: 'Mirta', text: 'La pasarela de Camila se abre cuando el rayo toca el rayo. Empújalo. Y no mires al suelo, que el suelo te mira.' },
			{ puzzle: { id: 'b06_pasarelas', title: 'Las pasarelas de luz', hint: 'El bloque del rayo sobre la placa del rayo abre la puerta de luz. Los bloques no se arrastran: se empujan.', theme: 'lab',
				grid: [
					'########',
					'#P.....#',
					'#..R...#',
					'#.###.##',
					'#S#..D.#',
					'#.#..#G#',
					'#...##.#',
					'########',
				] },
				onSolve: [
					{ set: { 'flag.b06_pasarelas': true } },
					{ text: 'El bloque cae sobre la placa con un «clac». El rayo de dentro se enciende. Todos los focos del techo giran a la vez hacia la pasarela del fondo, la que sale por la ventana.' },
					{ text: 'Allí, de espaldas, sobre la ciudad, alguien se da la vuelta.' },
				],
				onQuit: [{ text: 'Te bajas de los paneles. Los focos te siguen un momento y luego vuelven a su sitio, aburridos.' }] },
		],

		// =================== CAMILA ===================
		b06_camila_reto: [
			{ text: 'Al final de la pasarela, colgada sobre la ciudad, **Camila** te espera con los brazos cruzados. Los auriculares de oro al cuello. El viento le mueve el pelo justo lo necesario, como si lo hubiera ensayado. Puede que lo haya ensayado.' },
			{ say: 'camila', text: 'Así que tú eres {el|la|le} de la Gira. —Te mira de arriba abajo, sin prisa, como se mira un vestido—. En la tele sales más bajit{o|a|e}. O más alt{o|a|e}. No me acuerdo. En la tele todo el mundo sale igual.' },
			{ if: LUC, then: [
				{ say: 'camila', text: 'Él no. —Señala a {riolu} con la barbilla—. Él sale distinto en todas partes. Tiene presencia. La presencia no se ensaya. Se tiene o no se tiene. Yo la ensayo, por si acaso.' },
			] },
			{ if: 'has("huevolarvesta")', then: [
				{ say: 'camila', text: '¿Y eso que te humea en la mochila? ¿Un huevo? ¿En mi pasarela? —Se le escapa media sonrisa—. Bueno. Que mire. Le va a gustar la luz.' },
			] },
			{ say: 'camila', text: 'En este gimnasio no se gana. Se brilla. El que más brille al final, se queda con la pasarela. Y con mi medalla. Aunque la medalla da igual. Lo que importa es la pasarela.' },
			{ prompt: '¿Curar al equipo antes de retar a Camila?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'Camila chasquea los dedos. Mirta y Celestino llegan desfilando con una bandeja de pociones cada uno y curan a tu equipo sin perder el paso.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'camila', text: 'Valiente. O despistad{o|a|e}. En la pasarela, se parecen mucho.' }] },
			] },
			{ battle: 'camila_g', onWin: [
				{ text: 'El Eelektross de Camila se apaga, poco a poco, como una ciudad cuando amanece. Se queda flotando un segundo más de lo normal, por orgullo, y luego baja. Camila lo devuelve a su Poké Ball y se queda mirándola.' },
				{ say: 'camila', text: 'Me has apagado. —Se ríe. No es la risa de los anuncios: es más baja, más torpe—. Hacía muchísimo que nadie me apagaba. Se me había olvidado cómo es. Es… refrescante.' },
				{ if: LUC, then: [
					{ say: 'camila', text: 'Y tu Lucario. Peleaba como si oyera la electricidad antes de que llegara. Como si supiera dónde iba a caer cada rayo. —Lo mira mucho rato—. A mí me gustaría oír así.' },
					{ happy: { who: 'riolu', n: 10 } },
				] },
				{ say: 'camila', text: 'La **Medalla Voltio**. Brilla un poco en la oscuridad. La diseñé yo, para que la gente que la tiene no se pierda de noche. Es lo más útil que he hecho en mi vida.' },
				{ badge: 'medalla_voltio' },
				{ cap: 64 },
				{ set: { 'flag.b06_camila_vencida': true } },
				{ say: 'camila', text: 'Y esto. **MT Electrotela**: una red de electricidad que frena al que la toca. Para que los que corren demasiado sepan lo que es esperar.' },
				{ give: 'b06_mt_electrotela' },
				{ heal: 'Los focos del techo bajan la intensidad. Mirta y Celestino curan a tu equipo con la bandeja de pociones, esta vez sin desfilar.' },
				{ intel: { npc: 'camila', text: 'Líder de Mayólica (Eléctrico), modelo. Te dio la Medalla Voltio y la MT Electrotela. Su Eelektross megaevoluciona. Dice que hacía mucho que nadie «la apagaba».' } },
				{ diary: 'Hoy mi entrenador{|a|e} ha ganado a Camila, la líder de Mayólica. ¡Su gimnasio es una pasarela de moda colgada encima de la ciudad! Yo iba muy nervioso. Bueno, cargado. Es casi lo mismo.\n\nSu Eelektross se transformó y se puso a flotar como un globo enfadado, pero al final se apagó. Camila se rió de una manera que no sale en los anuncios. Me gustó más. ¡Ya tenemos la Medalla Voltio! Brilla un poco en la oscuridad. Como yo.', cond: 'flag.b01_diario' },
				{ call: 'b06_pase' },
			] },
		],
		b06_pase: [
			{ if: 'flag.b06_pase_tren', then: [{ end: true }] },
			{ say: 'camila', text: 'Espera. Me falta una cosa. —Saca de un bolsillo que no debería existir en ese vestido un billete de cartón—. La Gira me pidió que te lo diera yo. Los líderes de Teselia damos el pase a quien gana la medalla. Es tradición. Bueno, es tradición desde la semana pasada.' },
			{ cutscene: { time: 'tarde', bg: { type: 'gym', wall: '#1e1e2e', floor: '#f2c84a' }, start: 'dark', frames: [
				{ actors: [{ id: 'camila', at: 'left', enter: 'left' }], on: '_c', cam: 'push', item: 'pasetrentes', fx: 'light', text: 'Un billete de cartón grueso, con el sello de la Gira en rojo y una esquina picada. Debajo del sello, en letra de imprenta: «VÁLIDO EN TODOS LOS TRENES REGIONALES DE TESELIA».' },
				{ actors: [{ key: 'camila', do: 'nod' }], on: '_c', fx: ['flash', 'sparkle'], color: '#f2c84a', text: 'Camila lo sostiene un momento a contraluz, delante del único foco encendido. El sello brilla. Luego te lo pone en la mano.' },
				{ on: '_c', cam: 'pull', fx: 'glow', text: 'Con él, el tren de la estación lleva al este, a un pueblo con murallas. Y la puerta del otro andén da al bosque, camino del sur.' },
			] } },
			{ give: 'pasetrentes' },
			{ set: { 'flag.b06_pase_tren': true } },
			{ say: 'camila', text: 'El tren de la estación va a **Pueblo Chamota**, al este. Un sitio raro, con murallas y gente que se acuerda de las cosas a su manera. Y por la puerta del otro andén se sale al **Bosque Azulejo**: por ahí se llega a **Ciudad Esmalte**, la del museo.' },
			{ say: 'camila', text: 'Dicen que en el museo de Esmalte hay un reloj que se para. Yo nunca he ido. Los relojes que se paran me ponen nerviosa. Prefiero los que van deprisa.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Un pase! ¡Para trenes! ¡Hacía muchísimo que no subíamos a un tren que no fuera de combate! Bueno, el de Azafrán. Pero eso fue otra región.' },
			{ quest: 'b06_m2', stage: 'hecha', done: true },
			{ quest: 'b06_m3', stage: 'esmalte' },
			{ set: { 'flag.b06_t1_hecho': true } },
		],
		b06_camila_despues: [
			{ say: 'camila', text: '¿Vuelves a mi pasarela? —Se ajusta los auriculares—. Me gusta. La gente no suele volver al sitio donde ganó. Les da miedo que no sea igual. Nunca es igual. Por eso hay que volver.' },
			{ if: '!flag.b06_pase_tren', then: [{ call: 'b06_pase' }] },
		],

		// =================== METRO BATALLA ===================
		b06_revisora: [
			{ say: 'metro_revisora', text: 'Billete. ¿No tienes? Aquí abajo el billete es el combate. Tres victorias en el tren de práctica y te doy algo que llevamos los revisores en el bolsillo. No es un billete. Es mejor.' },
			{ say: 'metro_revisora', text: 'Y no te asustes si ves al de la libreta. Lleva una semana viniendo. Apunta. Nunca combate. Nunca saca billete. —Pausa—. No me cae mal. Me cae raro.', cond: '!flag.b06_acromo_visto' },
		],
		b06_premio_metro: [
			{ say: 'metro_revisora', text: 'Tres. Sin bajarte en ninguna estación. —Saca el reloj de bolsillo, lo mira, lo cierra—. Has tardado exactamente lo que tarda el tren de la línea 3 en dar la vuelta. Eso aquí es un cumplido.' },
			{ text: 'Abre una taquilla con su llave. Dentro, entre bocadillos envueltos en papel de aluminio, hay un disco metálico con una funda que tiene cosido un rayo.' },
			{ say: 'metro_revisora', text: 'Los revisores la usamos para que los trenes arranquen cuando se les va la corriente. Una bola de electricidad. Cuanto más rápido vas tú y más lento va el otro, más fuerte pega. Como el metro en hora punta.' },
			{ give: 'b06_mt_bola_voltio' },
			{ set: { 'flag.b06_premio_metro': true } },
			{ say: 'metro_revisora', text: '**Bola Voltio**. Un Ampharos con esto, en un andén, es lo más bonito que hay. Créeme. Lo he visto.' },
		],
		b06_acromo_metro: [
			{ set: { 'flag.b06_acromo_visto': true } },
			{ text: 'El hombre del banco no levanta la vista de la libreta cuando pasa un tren. La levanta cuando bajas tú. Bata blanca sobre un traje oscuro, gafas cuadradas y un mechón azul que no parece de tinte. Te mira con mucha educación y con mucha atención. Demasiada para las dos cosas.' },
			{ say: 'acromo', text: 'Disculpe. No quería mirar. Sí quería. Pero no quería que se notara. —Cierra la libreta con un dedo dentro—. Acromo. Científico. Estudio a los entrenadores que bajan de esos trenes. Bueno, a sus Pokémon. Bueno, a lo que hay entre los dos.' },
			{ if: LUC, then: [
				{ text: '{riolu} se pone delante de ti. No gruñe. Pero tiene las orejas pegadas a la cabeza y la palma un poco abierta, como en un combate.' },
				{ say: 'acromo', text: 'Fascinante. —Ni se mueve—. Se ha puesto entre usted y yo antes de que yo hiciera nada. No ha sido una orden. Ha sido una decisión. Eso es justo lo que intento medir.' },
			] },
			{ say: 'acromo', text: 'Un vínculo es una fuerza. Y las fuerzas se miden. La gente se ofende cuando lo digo. Dice que el cariño no se mide. Yo creo que lo que no se mide, se pierde. —Sonríe, amable—. ¿Usted qué cree?' },
			{ choice: [
				{ text: '«Que hay cosas que no caben en una libreta.»', then: [
					{ say: 'acromo', text: 'Entonces hace falta una libreta más grande. —Lo dice sin ironía, apuntándolo—. Gracias. Es una respuesta muy útil.' },
				] },
				{ text: '«¿Y para qué quiere medirlo?»', then: [
					{ say: 'acromo', text: 'Para saber hasta dónde llega un Pokémon cuando alguien lo quiere. Nadie lo sabe. Ni los que lo quieren. —Mira a {riolu}—. Sobre todo los que lo quieren.' },
				] },
				{ text: 'No contestar.', then: [
					{ say: 'acromo', text: 'También es un dato. —Lo apunta—. Le agradezco el silencio. Es más honrado que la mayoría de las respuestas.' },
				] },
			] },
			{ text: 'Llega un tren. Acromo se levanta, se sacude la bata y se sube sin mirar el número. Las puertas se cierran. Por la ventanilla, ves que sigue escribiendo.' },
			{ say: 'rotom', text: '¡Bzzt! No sale en mi base de datos de la Gira. Ni en la de Teselia. Ni en la de nada. —Pausa—. Escribía muy rápido. Con la izquierda. Lo apunto. Por si acaso.' },
			{ intel: { npc: 'acromo', text: 'Científico. Observa combates en el Metro Batalla de Mayólica y lo apunta todo en una libreta. «Un vínculo es una fuerza. Y las fuerzas se miden». Quiere saber «hasta dónde llega un Pokémon cuando alguien lo quiere».' } },
		],
		b06_acromo_despues: [
			{ text: 'El banco del andén está vacío. En el suelo, una hoja arrancada de una libreta, llena de números en columnas. En la última línea, subrayado dos veces: «*Respuesta antes del estímulo. Repetir.*»' },
		],
		b06_bastien_metro: [
			{ set: { 'flag.b06_bastien_metro': true } },
			{ quest: 'b06_t_bastien', stage: 'metro' },
			{ text: 'Al fondo del andén, junto a una columna, un chico con una chaqueta vieja y remendada sujeta un cartel de cartón: «**SE ALQUILA RIVAL** · Combates de práctica · 500 ₽/hora · Greninja incluido». A su lado, el Greninja hace estiramientos con cara de profesional.' },
			{ text: 'En la solapa de la chaqueta, donde antes iba el logotipo de Lemnis, lleva una insignia pequeña de hojalata.' },
			{ if: LEAL, then: [
				{ say: 'bastien', text: '¡{jugador}! —Suelta el cartel y te da un abrazo que te levanta del suelo—. ¡Qué haces aquí! ¡No! ¡Ya sé qué haces aquí! ¡La Gira! ¡Yo también estoy en la Gira! Bueno, debajo. Literalmente debajo.' },
			], else: [
				{ say: 'bastien', text: '¿Tú? —Se le tensa la cara un segundo. Luego se le afloja—. Claro que tú. Siempre tú. —Se ríe, raro—. Bueno. Hola. Hola de verdad. Ya no estoy enfadado. Estoy pobre. Es distinto.' },
			] },
			{ say: 'bastien', text: 'Lemnis me ha demandado. Tres veces. Una por romper el contrato, otra por «daños a la imagen» y otra porque devolví la chaqueta mal doblada. Esa me la merezco. La doblé fatal a propósito.' },
			{ say: 'bastien', text: 'Así que trabajo aquí. La gente me alquila por horas para practicar antes de subir al tren. Gano poco. Duermo en un albergue con siete literas y un Snorlax que no es de nadie. Y soy… —lo piensa—. Soy feliz. Qué raro decirlo en voz alta.' },
			{ text: 'Se toca la insignia de la solapa sin darse cuenta.' },
			{ say: 'bastien', text: 'Es de Noa. Me la dio antes de que todo. Antes de todo. —No termina la frase—. No me contesta. Le escribo los domingos igual. Si un día contesta, que vea que no he dejado de escribir.' },
			{ choice: [
				{ text: '«Estoy orgullos{o|a|e} de ti, Bastien.»', then: [
					{ say: 'bastien', text: '…—Se le ponen las orejas rojas—. No digas eso en un andén, que hay eco. Y me lo creo.' },
				] },
				{ text: '«¿Necesitas dinero?»', then: [
					{ say: 'bastien', text: 'No. Sí. No. —Se cruza de brazos—. No acepto dinero de amigos. Acepto combates. Los combates no se devuelven y no tienen intereses.' },
				] },
				{ text: '«¿Y si Noa no contesta nunca?»', then: [
					{ say: 'bastien', text: 'Entonces seguiré escribiendo. —Sin dudar—. Alguien tiene que acordarse de ella los domingos.' },
				] },
			] },
			{ intel: { npc: 'bastien', text: 'Trabaja de «rival de alquiler» en el Metro Batalla de Mayólica. Lemnis lo ha demandado tres veces. Duerme en un albergue y dice que es feliz. Lleva en la solapa la insignia de hojalata de Noa; le escribe todos los domingos aunque no conteste.' } },
			{ say: 'bastien', text: '¿Combate? El primero te lo regalo. Con cura incluida, que soy un profesional.' },
			{ choice: [
				{ text: '«Vamos.»', then: [{ call: 'b06_bastien_reto' }] },
				{ text: '«Luego.»', then: [
					{ say: 'bastien', text: 'Luego. Aquí estaré. De ocho a ocho. Bueno, de ocho a cuando me echen.' },
					{ quest: 'b06_t_bastien', stage: 'hecha', done: true },
				] },
			] },
		],
		b06_bastien_reto: [
			{ say: 'bastien', text: 'Política de la casa: antes del combate, todo el mundo cura. Incluso los que dicen que no.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, gracias.', then: [{ heal: 'Bastien saca de la mochila un puñado de pociones de oferta, de las que se compran en paquetes de diez, y cura a tu equipo una a una. Lleva la cuenta en una libreta.' }] },
				{ text: 'No hace falta.', then: [{ say: 'bastien', text: 'Política de la casa. —Te lanza una poción—.' }, { heal: 'Curas a tu equipo con lo que te da Bastien.' }] },
			] },
			{ battle: 'bastien_7', lose: 'continue',
				onWin: [
					{ say: 'bastien', text: '¡Otra vez! —Lo apunta, encantado—. Sin contrato pierdo igual. Pero pierdo yo, no la marca. Eso se nota. Se nota muchísimo.' },
					{ text: 'Greninja te hace una reverencia. Luego se la hace a {riolu}, más larga. {riolu} se la devuelve.', cond: LUC },
				],
				onLose: [
					{ say: 'bastien', text: '¡He ganado! ¡Sin abogados! —Se ríe—. Esto lo enmarco. En cartón, que no me da para más.' },
					{ heal: true },
				] },
			{ quest: 'b06_t_bastien', stage: 'hecha', done: true },
		],
		b06_bastien_despues: [
			{ say: 'bastien', text: 'Hoy me han alquilado cuatro horas. Una señora para practicar con su Musharna, un niño para aprender a perder y un señor que solo quería hablar. Le cobré la mitad. Hablaba bien.' },
			{ text: 'Se toca la insignia de la solapa. Es domingo, o casi. Tiene una carta a medio escribir sobresaliendo del bolsillo.' },
		],

		// =================== EL MUSICAL ===================
		b06_tepig: [
			{ set: { 'flag.b06_tepig': true } },
			{ text: 'Entre bambalinas, una actriz con un vestido de plumas grita «¡FUEGO! ¡FUEGO!» mientras se apaga la falda a manotazos. Nadie se mueve. Un tramoyista, sin levantar la vista del periódico, le echa un vaso de agua. Por lo visto, pasa mucho.' },
			{ text: 'Debajo de un perchero, entre plumas chamuscadas, un **Tepig** pequeño estornuda. Le sale una brasa por la nariz. Aterriza en una peluca. La peluca empieza a humear.' },
			{ say: 'liam', text: '¡Quieto todo el mundo! ¡Nadie apague esa peluca! —Un chico con un peinado perfecto aparta a los tramoyistas con las dos manos—. ¿No lo veis? ¡Es arte! ¡Ese humo tiene una forma! ¡Es un Swanna!' },
			{ text: 'Es **Liam**, el capitán de Melemele. Lleva una bufanda de seda y una carpeta con bocetos de trajes. Cuando te ve, se le ilumina la cara.' },
			{ say: 'liam', text: '¡{jugador}! ¡Mi aspirante favorit{o|a|e} de Melemele! ¿Qué haces en Teselia? No. Espera. Ya sé. La Gira. Yo también: me han invitado de estilista para el Musical. «Intercambio de capitanes». Me han dado un camerino. Con mi nombre. Mal escrito, pero con mi nombre.' },
			{ say: 'liam', text: 'Y este pequeño artista lleva una semana colándose entre los trajes. Estornuda brasas. Ha quemado tres pelucas, un abanico y la capa del protagonista. La capa era horrible. Yo diría que le ha hecho un favor a la obra.' },
			{ text: 'El Tepig se te acerca. Te huele los zapatos. Estornuda. La brasa te cae en el cordón y se apaga sola, como si te conociera.' },
			{ if: TEPIG, then: [
				{ say: 'rotom', text: '¡Bzzt! Ya tenemos un Pokémon de su familia en la caja. Lo noto. Y él lo nota en ti, porque te mira como a un primo lejano.' },
				{ say: 'liam', text: '¿Ya tienes uno? Entonces este se queda. —Lo dice con alivio y lo disimula muy mal—. Lo voy a meter en el número final. Un Tepig estornudando brasas sobre un escenario a oscuras. Es lo más elegante que va a ver esta ciudad. Ven a verlo cuando quieras.' },
				{ set: { 'flag.b06_tepig_musical': true } },
				{ text: 'El Tepig suelta una brasa pequeña, redonda, perfecta. Por primera vez, nadie grita.' },
			], else: [
				{ say: 'liam', text: 'El director quiere echarlo. Yo quiero que salga en el número final. Pero creo que él quiere otra cosa. —Mira cómo el Tepig se te sienta encima del zapato—. Creo que te quiere a ti. Qué gusto tan obvio. Y qué bueno.' },
				{ prompt: 'El Tepig te mira desde tu zapato.', choice: [
					{ text: '«Me lo llevo. Le enseñaremos a estornudar donde toca.»', then: [
						{ text: 'Te agachas. El Tepig se te sube a las manos de un salto, estornuda de alegría y te chamusca un poco la manga. Liam aplaude despacio, como en un estreno.' },
						{ pokemon: { sp: 'tepig', lv: 16, gender: 'M', nature: 'adamant', ability: 'blaze', happy: 160, moves: ['flamecharge', 'tackle', 'defensecurl', 'ember'], ivs: { hp: 28, atk: 31, def: 24, spa: 22, spd: 24, spe: 26 } } },
						{ say: 'liam', text: 'Llévalo. Pero tráelo al estreno. Quiero que vea desde el público lo que se ha perdido. Con su mejor estornudo.' },
					] },
					{ text: '«Que se quede en el Musical. Aquí brilla.»', then: [
						{ set: { 'flag.b06_tepig_musical': true } },
						{ say: 'liam', text: '¿De verdad? —Te mira, conmovido, y lo disimula colocándose la bufanda—. Qué generosidad tan bien vestida. Lo meto en el número final. Y le pongo tu nombre en el programa. Mal escrito, por tradición.' },
					] },
				] },
			] },
			{ quest: 'b06_s_iniciales', stage: 'buscar', cond: '!quest.b06_s_iniciales' },
			{ quest: 'b06_s_iniciales', stage: 'hecha', done: true, cond: 'flag.b06_oshawott && flag.b06_tepig && flag.b06_snivy' },
			{ intel: { npc: 'liam', text: 'Invitado de estilista en el Musical de Mayólica por el «intercambio de capitanes». Descubrió a un Tepig que estornuda brasas sobre los trajes y lo llama «arte».' } },
		],
		b06_tepig_despues: [
			{ if: 'flag.b06_tepig_musical', then: [
				{ text: 'Entre bambalinas, el Tepig del Musical ensaya su número: un estornudo, una brasa, una pirueta. Cuando te ve, estornuda dos veces. Una es de saludo.' },
				{ say: 'liam', text: 'Lo está bordando. Bueno, quemando. Pero con precisión. Es la estrella del final. La actriz principal no me habla.' },
			], else: [
				{ say: 'liam', text: '¿Qué tal mi artista? ¿Sigue estornudando? Dile de mi parte que la elegancia empieza por saber dónde estornudar. Y que a mí me debe una bufanda.' },
			] },
		],
		b06_tadeo: [
			{ set: { 'flag.b06_tadeo_conocido': true } },
			{ text: 'La trampilla del centro del escenario tiene forma de concha y está entreabierta. De dentro sale una lucecita y una voz que repite frases en voz baja, sin prisa, como quien reza.' },
			{ text: 'Cuando te acercas, la trampilla se levanta un poco más y asoma una cabeza: pelo engominado con la raya muy marcada, bigote fino y unos ojos amables que se ríen antes que la boca.' },
			{ say: 'tadeo', text: '¡Ay! Perdone. Se me ha olvidado que la gente se asoma. —Sale hasta la cintura, con un guion lleno de anotaciones bajo el brazo—. Tadeo Lis. El apuntador. Nadie sabe que existo hasta que alguien se olvida del texto. Entonces soy el hombre más importante del teatro durante tres segundos.' },
			{ say: 'tadeo', text: 'Trabajo aquí abajo. En la concha. —Da dos golpecitos en el borde de la trampilla—. Así se llama este hueco, aunque la gente ya no lo sepa. Desde aquí se oye todo y nadie te ve. Es el mejor sitio de un teatro. Y el más solitario.' },
			{ if: 'flag.b06_caso_prueba', then: [
				{ say: 'tadeo', text: 'Oiga… ¿no será usted quien salió en el programa de Renata Castellanos? ¿{El|La|Le} del martes? —Se le iluminan los ojos—. ¡Lo escucho siempre! Aquí abajo, en los entreactos, con un auricular. Qué bien razonado. Qué ritmo. Habla usted como alguien que ha leído buen teatro.' },
				{ choice: [
					{ text: '«¿Escucha mucho *Casos Fríos*?»', then: [
						{ say: 'tadeo', text: 'Desde el primer episodio. Desde antes de que fuera famoso. —Sonríe, pero algo se le queda quieto en la cara—. Me los sé casi de memoria. Deformación profesional: me lo sé todo de memoria.' },
					] },
					{ text: '«Gracias. Fue cosa de Renata, sobre todo.»', then: [
						{ say: 'tadeo', text: 'Qué modest{o|a|e}. —Te mira un momento más de lo normal—. Renata Castellanos tiene muchas virtudes. La modestia nunca ha sido una de ellas. Que alguien a su lado la tenga… es bonito. Teatral, incluso.' },
					] },
				] },
			] },
			{ say: 'tadeo', text: 'Bueno, le dejo. Tengo función de tarde a las cinco y media, y no me la he perdido nunca. Quince años. Ni un resfriado. Los actores dicen que soy un mueble más del teatro. Lo tomo como un cumplido. Los muebles se quedan.' },
			{ text: 'Vuelve a bajar a la concha. La trampilla se cierra hasta dejar solo la rendija de luz. Desde abajo, otra vez, la voz en susurro, repasando el texto.' },
			{ intel: { npc: 'tadeo', text: 'Tadeo Lis, apuntador del Musical de Mayólica desde hace quince años. Trabaja en «la concha», el hueco bajo el escenario: «desde aquí se oye todo y nadie te ve». No se ha perdido nunca una función de tarde (17:30). Fan de *Casos Fríos* desde el primer episodio.' } },
		],
		b06_tadeo_despues: [
			{ if: 'flag.b06_noria_hecha', then: [
				{ say: 'tadeo', text: '¿Lo de la noria? Lo oí en el entreacto, por el auricular. ¡Qué cosa! Una cabina vacía. —Se ríe, bajito—. Yo estaba aquí abajo, claro. Como siempre. Ni me enteré hasta que lo dijeron en el programa. Muy bien resuelto, por cierto. Muy… limpio.' },
			], else: [
				{ say: 'tadeo', text: '¿Necesita algo? Si se le olvida lo que iba a decir, yo se lo apunto. Es lo único que sé hacer. —Guiña un ojo—. Bueno, y comer pipas sin hacer ruido.' },
			] },
		],
		b06_chatot: [
			{ text: 'En una percha, entre pelucas y sombreros con plumas, un Chatot con un lazo de terciopelo te mira de lado. Abre el pico.' },
			{ text: '«*¡Oh, dama de la luna, no te vayas!*», dice, con voz de soprano. Y luego, con voz de barítono: «*¡Me voy, porque la luna no espera!*». Y luego, con una vocecita de niño: «*¡Mamá, el Minccino se ha comido el decorado!*». Eso último no parece de la obra.' },
			{ say: 'actriz_musical', text: '¿El Chatot? Es del atrezo. Se sabe el guion entero. Todos los papeles. Con la voz de cada uno. —Se ajusta una pluma—. A veces nos apunta él antes que el apuntador. Tadeo dice que es su alumno más aplicado.' },
			{ text: 'El Chatot ladea la cabeza, te estudia un momento y repite, con tu voz exacta, lo último que has dicho en voz alta. Luego se pone a acicalarse como si nada.' },
		],
		b06_programa: [
			{ give: 'programamusical', silent: true, cond: '!has("programamusical")' },
			{ read: 'programamusical' },
		],
		b06_azucena: [
			{ text: 'En la tercera fila, una mujer con sombrero de paja y una flor en el pelo escucha la prueba de voces con los ojos cerrados. A su lado, un Altaria esponjoso canta. Un agudo limpio, larguísimo, que hace vibrar las lámparas.' },
			{ if: 'beat("kantai_iolana")', then: [
				{ say: 'kantai_turista', as: 'Azucena', text: '¡Tú! ¡La de Kantai! Bueno, el. Bueno, quien seas: {el|la|le} del malecón. —Abre los ojos y te reconoce de golpe—. Te debo una. Aquella tarde, en Kantai, mi Altaria cantó al final del combate. Desde entonces no ha dejado de cantar.' },
			], else: [
				{ say: 'kantai_turista', as: 'Azucena', text: 'Tú estabas en Kantai. En el malecón, cuando el cielo se apagaba. Me acuerdo de tu Lucario. Mirabas el cielo como yo, con cara de que te debía algo.' },
			] },
			{ say: 'kantai_turista', as: 'Azucena', text: 'Le enseñé las fotos del cielo de Alola a una señora de un observatorio, como dije. Me dijo que el cielo se había «quedado sin algo». Luego se arregló. Y Altaria volvió a cantar. Así que lo he traído aquí, a la prueba de voces del Musical. Para que cante donde lo oiga más gente.' },
			{ say: 'kantai_turista', as: 'Azucena', text: '¿Combatimos? Cuando canta en combate se transforma. Y cuando se transforma, canta todavía mejor. Te aviso, como la otra vez: es muy bonito. Y muy fuerte.' },
			{ prompt: '¿Combatir con Azucena? Cura antes, si quieres.', choice: [
				{ text: 'Combatir (curar antes).', then: [
					{ heal: 'Azucena te pasa un termo de té frío para ti y un puñado de pociones para tu equipo. «Que sea justo. Las fotos salen mejor cuando es justo».' },
					{ battle: 'azucena_2', lose: 'continue',
						onWin: [{ say: 'kantai_turista', as: 'Azucena', text: '¿Lo has oído? Hasta el final. —Le hace una foto a su Altaria—. Le mandaré esta a la señora del observatorio. Con el cielo de Teselia detrás. Aquí el cielo está entero.' }],
						onLose: [{ say: 'kantai_turista', as: 'Azucena', text: 'Altaria está contentísimo. Y yo. Gracias por dejarte… no. Por combatir.' }, { heal: true }] },
				] },
				{ text: 'Ahora no.', then: [{ say: 'kantai_turista', as: 'Azucena', text: 'Me quedo a la función. Altaria quiere ver a los demás. Para criticarlos, creo.' }] },
			] },
		],
		b06_azucena_despues: [
			{ say: 'kantai_turista', as: 'Azucena', text: 'Me han ofrecido un papel para Altaria en la próxima temporada. Un coro de nubes. Le he dicho que sí sin preguntarle. Me ha mirado mal. Luego ha cantado.' },
		],

		// =================== EL ESTADIO: CAMILLE ===================
		b06_camille: [
			{ set: { 'flag.b06_camille_estadio': true } },
			{ text: 'En la cancha 3 juega el equipo invitado de Kalos: camisetas azules con una flor de lis en el pecho. Hay tiempo muerto. Una chica de coleta alta y rodilleras bota el balón en la línea de saque, concentrada, contando en voz baja.' },
			{ text: 'Lanza el balón al aire. Salta. Lo golpea de arriba, con la palma abierta. El balón cruza la red como una piedra y se clava en el suelo del otro lado. El público grita. Ella no: se mira la muñeca, sorprendida, como si no fuera suya.' },
			{ if: 'flag.b05_camille_vista', then: [
				{ say: 'camille', text: '¡{jugador}! —Te ve desde la cancha y se le olvida el partido un segundo—. ¡{El|La|Le} de Æther! ¿Lo has visto? ¡¿Lo has visto?! ¡El de arriba! ¡Me sale!' },
			], else: [
				{ say: 'camille', text: '¿Tú eres {jugador}? ¿{El|La|Le} de la Gira? —Se acerca a la valla durante el tiempo muerto—. Papá tenía una foto tuya en el corcho, con una chincheta roja. Camille. ¿Lo has visto? El saque. El de arriba. Me sale.' },
			] },
			// ----- Rama: Lebrun detenido → Handsome hace de tío -----
			{ if: 'flag.b04_lebrun_detenido', then: [
				{ text: 'En la primera fila de la grada, un hombre con gabardina y una gorra de visera sostiene una pancarta enorme hecha a mano: «**¡ÁNIMO CAMIL!**». Le falta la E. La ha intentado añadir con rotulador por detrás, al revés.' },
				{ say: 'handsome', text: '¡Colaborador! ¡Llegas a tiempo! Handsome hace de tío. Es su primer partido en Teselia y su padre… su padre me pidió que no viniera sola. Desde donde está. Por carta. Con muy buena letra.' },
				{ say: 'handsome', text: 'Handsome no sabe nada de voleibol. Handsome aplaude cuando aplauden los demás. A veces un poco antes. —Baja la voz—. Me han pedido silencio dos veces. Lo considero un éxito.' },
				{ say: 'camille', text: 'Le he dicho que la pancarta está mal escrita. —A ti, bajito—. No quiero que la arregle. Es la pancarta más bonita del estadio.' },
				{ say: 'camille', text: 'Papá me escribe cada semana. Desde… desde donde está. Sé dónde está. Nadie me lo ha dicho, pero lo sé. Las cartas llevan un sello que no es de correos. —Bota el balón una vez—. Me pregunta por el saque. Solo por el saque. Le contesto lo del saque. Es nuestra manera.' },
			] },
			// ----- Rama: Lebrun de cebo → Lebrun en la grada, Handsome dos filas atrás -----
			{ if: 'flag.b04_lebrun_cebo', then: [
				{ text: 'En la grada, en primera fila, un hombre con abrigo gris y el ceño fruncido mira el partido con los brazos cruzados, sin aplaudir. Dos filas más atrás, otro hombre con gabardina y una gorra calada hasta las cejas mira al primero sin disimular nada.' },
				{ say: 'lebrun', text: '{jugador}. —Lo dice sin levantarse, sin mirarte del todo—. Ha venido. Bien. Ella quería que alguien la viera sacar.' },
				{ text: 'Abre la boca para decir algo más. La cierra. Mira el partido. Se le mueve la mandíbula, como si masticara una frase que no le cabe.' },
				{ say: 'lebrun', text: 'El saque. Le sale. —Pausa larga—. Yo le dije que tenía la muñeca floja. Me equivoqué. Me equivoco mucho últimamente.' },
				{ say: 'camille', text: 'Papá habla poco. —A ti, en el tiempo muerto, junto a la valla—. Antes hablaba mucho y no decía nada. Ahora habla poco y se le nota todo. Y el señor de la gorra de atrás lleva toda la mañana sin mirar el partido.' },
				{ say: 'camille', text: 'No me lo expliques. —Te para con la mano antes de que digas nada—. No quiero saberlo hoy. Hoy quiero que me vea sacar.' },
			] },
			// ----- Rama: Lebrun libre → disfrazado en las gradas; la nota -----
			{ if: 'flag.b04_lebrun_libre', then: [
				{ say: 'camille', text: 'Oye. ¿Puedes hacerme un favor? —Lo dice mirando el balón, como en Æther—. En la grada de arriba, la última fila, hay un señor con un bigote que no es suyo. Lleva todo el partido ahí. Aplaude mal: con un dedo.' },
				{ say: 'camille', text: 'Es papá. —Se encoge de hombros—. Se disfraza fatal. Como el señor de la gabardina de Kalos, el de la Policía. Seguro que ha aprendido de él. No quiero que baje. Si baja, alguien lo ve. Pero quiero que sepa una cosa.' },
				{ text: 'Saca de la rodillera un papelito doblado muchas veces, hasta quedarse del tamaño de un sello.' },
				{ give: 'notacamille' },
				{ say: 'camille', text: 'Dáselo tú. Tú eres de los que suben gradas sin que se note. Bueno, se nota. Pero da igual.' },
			] },
			// ----- Sin decisión de Lebrun (caso raro) -----
			{ if: LEBRUN_NINGUNO, then: [
				{ say: 'camille', text: 'Papá no ha podido venir. Mucho trabajo. Ha venido mi tía, que está ahí, con un bocadillo y un termo, sin mirar el partido. Pero el saque me sale igual. Eso no me lo quita nadie.' },
			] },
			// ----- Común: el amigo que pagó -----
			{ text: 'Pita el árbitro. Se acaba el tiempo muerto. Camille se gira para volver a la cancha. Se para. Vuelve.' },
			{ say: 'camille', text: 'Una pregunta. Rápida. —Muy seria, de golpe—. El amigo de papá. El que pagó la operación. ¿Tú sabes quién es?' },
			{ choice: [
				{ text: '«No lo sé.»', then: [
					{ say: 'camille', text: 'Bueno. —Te mira un segundo más—. Me lo creo. Casi. —Sonríe—. Si un día lo sabes, no me lo digas en un partido.' },
				] },
				{ text: '«Todavía no.»', then: [
					{ say: 'camille', text: 'Todavía. —Lo repite, despacio—. Me gusta más «todavía» que «no». Gracias por no mentirme bonito.' },
				] },
				{ text: 'No contestar. Sonreírle.', then: [
					{ say: 'camille', text: 'Eso es un «no te lo puedo decir». —Bota el balón una vez—. Papá también sonríe así. Se parecen. Qué horror.' },
				] },
			] },
			{ text: 'Vuelve a la línea de saque. Lanza. Salta. Golpea. El balón cruza la red, rozándola, y cae justo en la línea. Punto. Camille levanta el puño sin mirar a nadie. Luego mira a la grada. A una grada concreta.' },
			{ if: LUC, then: [
				{ text: '{riolu} levanta el puño a la vez que ella. Camille lo ve desde la cancha y se ríe en mitad del partido.' },
				{ happy: { who: 'riolu', n: 4 } },
			] },
			{ if: '!flag.b04_lebrun_libre', then: [
				{ quest: 'b06_t_camille', stage: 'hecha', done: true },
			] },
			{ intel: { npc: 'camille', text: 'Juega el torneo juvenil de voleibol en Mayólica con el equipo de Kalos. El saque de arriba ya le sale. Te preguntó si sabes quién es «el amigo» que pagó su operación.' } },
		],
		b06_lebrun_grada: [
			{ set: { 'flag.b06_lebrun_nota': true } },
			{ text: 'Subes a la última fila de la grada. Entre una familia con bocadillos y un señor dormido, un hombre con una gorra de un equipo de béisbol de Galar, gafas de sol y un bigote castaño enorme, pegado ligeramente torcido, aplaude con un dedo.' },
			{ say: 'lebrun', as: 'Señor del bigote', text: 'No sé quién es usted. —Sin mirarte—. Vengo a ver voleibol. Me gusta mucho el voleibol. Soy de Galar. —El bigote se le despega por una esquina. Se lo sujeta con el dedo de aplaudir.' },
			{ text: 'Le das la nota. Tarda en tomarla. La desdobla con las manos quietas, muy despacio, una vez, otra, otra, hasta que es un papel del tamaño de una mano.' },
			{ read: 'notacamille' },
			{ text: 'Se quita las gafas de sol. Tiene los ojos rojos, y no es por el sol. Se pasa el pulgar por la nariz. El bigote se termina de despegar y se le queda en la rodilla. No lo recoge.' },
			{ say: 'lebrun', text: '«El saque ya me sale». —Lo lee en voz alta, muy bajo, como si alguien pudiera quitárselo—. Le dije que no le saldría nunca. Tiene la muñeca de su madre.' },
			{ say: 'lebrun', text: 'Quédesela usted. —Te devuelve el papel, doblado otra vez, con mucho cuidado—. Si me la quedo yo, la leo cien veces y alguien me ve leerla. Y entonces me encuentran. Y entonces la encuentran a ella.' },
			{ say: 'lebrun', text: 'Usted trabaja con Handsome. —No es una pregunta—. Haga lo que tenga que hacer. Pero espere a que termine el partido. Por favor. Solo eso.' },
			{ prompt: 'Lebrun vuelve a ponerse las gafas. El bigote sigue en su rodilla.', choice: [
				{ text: 'Avisar a Handsome cuando acabe el partido.', then: [
					{ set: { 'flag.b06_lebrun_avisado': true } },
					{ rep: { policia: 3 } },
					{ text: 'Esperas al último punto. Camille gana el set con un saque que roza la red. La grada se levanta. Cuando vuelves a mirar, la última fila está vacía. En el asiento, un bigote castaño.' },
					{ text: 'Mandas el mensaje a Handsome. La respuesta tarda un minuto.' },
					{ say: 'handsome', as: 'Handsome (mensaje)', text: 'Recibido. Handsome tomará nota. —Otro mensaje, un rato después—. Colaborador. ¿Ganó el set? Pregunto por la niña. Solo por la niña.' },
				] },
				{ text: 'No decir nada. Es su partido.', then: [
					{ set: { 'flag.b06_lebrun_callado': true } },
					{ text: 'Bajas de la grada sin mirar atrás. Camille gana el set con un saque que roza la red. Cuando la grada se levanta, buscas la última fila con los ojos. Está vacía. En el asiento, un bigote castaño.' },
					{ text: 'Camille te mira desde la cancha. Mira la última fila. Te vuelve a mirar. No dice nada. Asiente una vez, muy pequeño.' },
				] },
			] },
			{ quest: 'b06_t_camille', stage: 'hecha', done: true },
		],
		b06_camille_despues: [
			{ text: 'El equipo de Kalos celebra en el centro de la cancha. Camille te ve y te saluda con el balón en alto.' },
			{ say: 'camille', text: '¡Hemos pasado de ronda! Bueno, han pasado. Yo he sacado. Pero el saque cuenta. El saque es lo que más cuenta. —Pausa—. Lo dice papá.' },
		],

		// =================== EL PARQUE: PLASMA ===================
		b06_plasma_parque: [
			{ set: { 'flag.b06_plasma_parque': true } },
			{ text: 'En el parque, subido a un banco, un hombre con capucha y una capa con un escudo azul habla por un megáfono. Delante, cuatro palomas, un jubilado y un Pidove que no sabe si es una paloma.' },
			{ say: 'recluta_plasma', as: 'Recluta del megáfono', text: '¡Ciudadanos de Mayólica! ¡Los Pokémon no son suyos! ¡Les han hecho creer que las Poké Balls son casas! ¡Son jaulas con buena publicidad! ¡El Equipo Plasma se lo dijo hace años y no escucharon!' },
			{ say: 'recluta_plasma', as: 'Recluta del megáfono', text: '¡Pero ahora es distinto! ¡Ahora hay un **Lazo**! ¡Un lazo que unirá a todos los Pokémon de todas las regiones en uno solo! ¡Y entonces nadie será dueño de nadie! ¡El Lazo nos liberará!' },
			{ text: 'El jubilado se levanta y se va. Las palomas, también. El Pidove se queda. El recluta te ve y baja el megáfono.' },
			{ if: LUC, then: [
				{ text: '{riolu} se ha quedado muy quieto al oír «Lazo». No mira al recluta: mira el megáfono, como si la palabra hubiera dejado algo en el aire.' },
			] },
			{ say: 'rotom', text: '¡Bzzt! ¿Un lazo? ¿De todas las regiones? —Pausa larga—. Eso no lo tengo en mi base de datos. Lo apunto. Lo apunto dos veces.' },
			{ say: 'recluta_plasma', as: 'Recluta del megáfono', text: '¿Tú qué miras? ¿Vienes a escuchar o a pelear? Los que no escuchan siempre vienen a pelear.' },
			{ choice: [
				{ text: '«¿Qué es ese Lazo?»', then: [
					{ say: 'recluta_plasma', as: 'Recluta del megáfono', text: 'No… no lo sé del todo. Me lo explicaron una vez. Con diagramas. —Baja la voz—. Lo dice un señor que viene de vez en cuando con una libreta. Yo solo repito. Repetir también es luchar.' },
					{ intel: { npc: 'recluta_plasma', text: 'Un recluta del Equipo Plasma predica en el parque de Mayólica: «el Lazo nos liberará» y unirá a los Pokémon de todas las regiones. No sabe explicarlo; se lo explicó «un señor con una libreta».' } },
				] },
				{ text: '«A pelear, entonces.»', then: [
					{ battle: 'plasma_may_1', lose: 'continue',
						onWin: [{ say: 'recluta_plasma', as: 'Recluta del megáfono', text: 'Bah. Pelear contra ti no me ha liberado de nada. Solo de la idea de ganar.' }],
						onLose: [{ say: 'recluta_plasma', as: 'Recluta del megáfono', text: '¿Ves? El Lazo está de mi parte. Hoy.' }, { heal: true }] },
				] },
				{ text: 'Irte.', then: [{ text: 'Te vas. El recluta vuelve a subir al banco. Al Pidove le da igual.' }] },
			] },
		],
		b06_plasma_parque_despues: [
			{ text: 'El banco del parque está vacío. Alguien ha dejado el megáfono atado con una cuerda, como si fuera a volver. En el respaldo, pintado con tiza azul, un escudo y una palabra: «LAZO».' },
		],

		// =================== LA NORIA: EL CASO DE LA CABINA SIETE ===================
		b06_taquilla: [
			{ text: 'La taquilla de la noria tiene un toldo a rayas y la ventanilla llena de papeles pegados con celo: precios, «NO SE ADMITEN MASCOTAS SALVO POKÉMON», un dibujo de un niño y, en una esquina, una hoja oficial con un sello del ayuntamiento, ya amarilla por el sol.' },
			{ give: 'hojanoria', silent: true, cond: '!has("hojanoria")' },
			{ set: { 'flag.b06_noria_hoja': true } },
			{ read: 'hojanoria' },
			{ text: 'Es un horario público. Lo puede leer cualquiera. Lo ha podido leer cualquiera.', cond: NORIA_ABIERTA },
		],
		b06_operario: [
			{ if: 'flag.b06_noria_hecha', then: [
				{ say: 'operario_noria', text: '¡Hombre, el detective! —Se toca la gorra—. Mi Emolga ya no se duerme en las cabinas. Ahora se duerme en el toldo. Así, si desaparece, desaparece a la vista.' },
			], else: [
				{ say: 'operario_noria', text: 'Veinte minutos por vuelta. Veinticuatro cabinas. Cuarenta años girando. —Mira la noria con cariño—. Es la única cosa de Mayólica que no tiene prisa. Por eso me gusta.' },
			] },
		],
		b06_noria: [
			{ text: 'El operario de la noria está de pie junto a los mandos, con la gorra en la mano y la vista clavada en una cabina que acaba de salir del andén: la **7**. Sube despacio, como todas. Desde aquí se ve dentro un bulto amarillo y negro, acurrucado en el asiento.' },
			{ say: 'operario_noria', text: '¿Usted es de la Gira? ¿El de la radio? —Te agarra del brazo—. Me han llamado esta mañana. Una voz rara. Muchas voces raras. Me han dicho que a las seis, en la cabina siete, algo iba a desaparecer.' },
			{ say: 'operario_noria', text: 'Y en la siete está mi Emolga. Se mete en las cabinas a dormir la siesta. Lo hace siempre. Y ya son casi las seis.' },
			{ say: 'rotom', text: '¡Bzzt! ¿Tiene la llamada grabada? ¡Póngamela! Yo la guardo.' },
			{ text: 'El operario saca un teléfono viejo y pone el buzón de voz. Se oye: «…*en la cabina*…» con una voz de mujer joven, rápida. Una tos ronca. «…*siete*…» con otra voz, de hombre. «…*a las seis*…» otra vez la primera. «…*desaparece*…». Y se corta.' },
			{ say: 'rotom', text: 'Esa primera voz… —Pausa—. Esa voz la conozco. ¿No es…? No puede ser. Lo guardo. Lo guardo todo.' },
			{ if: 'flag.b06_noria_hoja', then: [
				// Rama: leíste el horario antes. Te adelantas.
				{ text: 'Te acuerdas de la hoja de la taquilla. «**18:00 · Vuelta lenta de revisión**. El operario retira las placas numeradas para limpiarlas y las repone al pasar por el andén, una posición más adelante».' },
				{ text: 'Si las placas se mueven, la «siete» de las seis no será la siete de ahora. Lo que importa no es el número. Es la cabina.' },
				{ say: 'operario_noria', text: '¿La vuelta lenta? Sí, a las seis. Es lo de todos los días. —Se queda blanco—. Ay. Ay, las placas.' },
				{ cutscene: { time: 'tarde', bg: { type: 'plaza', ground: '#8a8a9a', far: '#4a6a9a' }, frames: [
					{ cam: 'pan-up', text: 'Saltas a la cabina siguiente justo antes de que se cierre el andén y subes detrás de la siete. La ciudad se hace pequeña. Los focos de Mayólica barren el cielo por debajo de ti.' },
					{ cam: 'still', fx: 'heartbeat', color: '#f2c84a', text: 'A las seis en punto, la noria frena. Vuelta lenta. Abajo, en el andén, alguien con mono azul quita una placa y pone otra. Muy deprisa. Demasiado deprisa para ser el operario, que está a tu lado, por teléfono.' },
					{ mon: 'emolga', fx: 'sparkle', cam: 'push', text: 'Cuando tu cabina se cruza con la que era la siete, miras dentro. El Emolga duerme hecho una bola, con un lazo color crema atado a la cola. La placa de fuera ya dice **6**.' },
				] } },
				{ set: { 'flag.b06_noria_antes': true } },
				{ text: 'Cuando bajan, la nueva cabina «7» llega vacía al andén. En el andén no hay nadie con mono azul. Solo una placa vieja tirada en el suelo y un olor a abrillantador.' },
				{ say: 'operario_noria', text: '¡Mi Emolga! —Lo abraza al bajar la cabina seis—. ¡Estaba en la seis! ¡La siete está vacía porque… porque…!' },
				{ say: 'jugador', text: 'Porque el Emolga nunca se movió. Se movió el siete.' },
			], else: [
				// Rama: no leíste el horario. Llega la siete vacía; deduces.
				{ cutscene: { time: 'tarde', bg: { type: 'plaza', ground: '#8a8a9a', far: '#4a6a9a' }, frames: [
					{ cam: 'pan-up', text: 'Esperan las seis al pie de la noria. La cabina siete sube, llega arriba del todo, empieza a bajar. Dentro se ve el bulto amarillo. Todo normal.' },
					{ cam: 'still', text: 'A las seis en punto, la noria frena. Vuelta lenta, de revisión. Las cabinas pasan por el andén muy despacio. Hay tanta gente mirando que no ves bien el andén.' },
					{ cam: 'push', fx: 'heartbeat', color: '#c4473a', text: 'Y cuando la cabina con la placa **7** llega abajo, está vacía. Sin Emolga. Sin nada. Solo un lazo color crema, atado a la barandilla.' },
				] } },
				{ say: 'operario_noria', text: '¡No está! ¡Ha desaparecido! ¡En el aire! ¡Como dijo la voz!' },
				{ text: 'Una cabina no se vacía en el aire. Algo ha cambiado entre que la viste subir y ahora. Piensas.' },
				{ prompt: '¿Dónde está el Emolga?', choice: [
					{ text: 'Alguien abrió la cabina arriba y se lo llevó.', then: [
						{ text: 'Miras la cabina. Las puertas solo se abren desde fuera, en el andén, con la llave del operario. Arriba no hay nadie. Y un Emolga despierto, en el aire, se habría puesto a planear y lo habría visto toda la plaza.' },
						{ say: 'rotom', text: '¡Bzzt! ¿Y si miramos la taquilla? Tiene papeles pegados. Los papeles pegados a veces dicen cosas.' },
						{ call: 'b06_noria_hoja_tarde' },
					] },
					{ text: 'El número. La cabina no es la misma.', then: [
						{ call: 'b06_noria_hoja_tarde' },
					] },
					{ text: 'Se ha ido volando él solo.', then: [
						{ text: 'Un Emolga dormido no se va volando. Y uno despierto no ata lazos a una barandilla.' },
						{ say: 'rotom', text: '¡Bzzt! ¿Y si miramos la taquilla? Tiene papeles pegados. Los papeles pegados a veces dicen cosas.' },
						{ call: 'b06_noria_hoja_tarde' },
					] },
				] },
			] },
			{ call: 'b06_noria_resuelta' },
		],
		b06_noria_hoja_tarde: [
			{ give: 'hojanoria', silent: true, cond: '!has("hojanoria")' },
			{ set: { 'flag.b06_noria_hoja': true } },
			{ read: 'hojanoria' },
			{ text: '«Vuelta lenta de revisión. Las placas se reponen una posición más adelante». La placa del siete ha pasado a la cabina siguiente. Y la cabina que era la siete…' },
			{ say: 'operario_noria', text: '…ahora lleva el seis. —Se le cae la gorra—. ¡La seis! ¡Está en la seis!' },
			{ text: 'Cuando la cabina seis llega al andén, dentro, hecho una bola en el asiento, el Emolga sigue durmiendo la siesta. No se ha enterado de nada.' },
			{ say: 'jugador', text: 'El Emolga nunca se movió. Se movió el siete.' },
		],
		b06_noria_resuelta: [
			{ set: { 'flag.b06_noria_hecha': true } },
			{ text: 'En el lazo color crema hay una tarjeta pequeña, del tamaño de un billete de tranvía. Letra de máquina de escribir. Las «e» medio borradas.' },
			{ text: '«*Prestado. Devuelto. Desde la concha.*»' },
			{ say: 'operario_noria', text: '¿Prestado? —Toma al Emolga en brazos. El Emolga bosteza—. ¿Quién presta un Emolga que no es suyo? ¿Y quién hace eso para devolverlo?' },
			{ say: 'rotom', text: 'Alguien que quería que lo viéramos. —Muy bajito, para Rotom—. Y que sabía a qué hora se cambian las placas. Como cualquiera que lea la taquilla.' },
			{ text: 'Entonces la Pokédex suena. Un número de Teselia con un emoji de micrófono. Es martes. Son las seis y cuarto. Hoy hay directo especial, de tarde: esto no podía esperar a las nueve.' },
			{ call: 'b06_directo_noria' },
		],
		b06_directo_noria: [
			{ text: 'Descuelgas. Antes de que digas nada, oyes una sintonía y una voz que ya conoces, en modo radio.' },
			// EN ANTENA ------------------------------------------------------------
			{ say: 'renata', as: 'Renata (en directo)', text: '¡Buenas tardes, Teselia, esto es *Casos Fríos* en un directo especial, que hoy el martes empieza antes! Y tenemos en línea a nuestr{o|a|e} colaborador{|a|e} desde Ciudad Mayólica, porque al parecer allí una noria se ha comido un Pokémon. {jugador}, estás en antena.' }, // EN ANTENA
			{ choice: [
				{ text: 'Contarlo serio, sin adornos.', then: [
					{ say: 'jugador', text: 'Cabina siete, a las seis, vacía. El Emolga estaba en la seis. A las seis hay una vuelta lenta y se cambian las placas de sitio: está en el horario de la taquilla.' }, // EN ANTENA
				] },
				{ text: 'Contarlo con un poco de teatro.', then: [
					{ af: { renata: 1 } },
					{ say: 'jugador', text: 'Damas y caballeros: a las seis en punto, en lo alto de Mayólica, una cabina se vació en el aire. O eso parecía. Spoiler: la noria tiene un horario, y nadie lee los horarios.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: '¡Spoiler! ¡Ha dicho spoiler en mi programa! Cool, cool, cool. Me gusta. No te acostumbres.' }, // EN ANTENA
				] },
				{ text: 'Decir que lo has resuelto tú sol{o|a|e}, sin ayuda.', then: [
					{ af: { renata: -5 } },
					{ say: 'jugador', text: 'Lo he resuelto yo. Sin ayuda de nadie. La cabina siete se vació porque se cambian las placas en la vuelta lenta.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: '«Sin ayuda de nadie». —Pausa de radio, larguísima—. Apuntado. Para la próxima te dejo sin ayuda también del micro.' }, // EN ANTENA
				] },
			] },
			{ say: 'jugador', text: 'El Emolga nunca se movió. Se movió el siete.' }, // EN ANTENA
			{ say: 'renata', as: 'Renata (en directo)', text: 'Nota para el episodio: la noria no se tragó a nadie. Se tragó un número. —Se le oye sonreír—. Y quien lo montó sabía que lo íbamos a contar. Así que… hola. Sí. A ti. Te estamos oyendo nosotros también.' }, // EN ANTENA
			{ if: 'flag.b06_noria_antes', then: [
				{ say: 'renata', as: 'Renata (en directo)', text: 'Y, oyentes, para que conste en acta: mi colaborador{|a|e} subió a la noria **antes** de que se cambiara la placa. Llegó a la cabina antes que la cabina. Eso, en mi oficio, se llama ganar.' }, // EN ANTENA
				{ af: { renata: 5 } },
			], else: [
				{ af: { renata: 2 } },
			] },
			{ say: 'renata', as: 'Renata (en directo)', text: 'Seguimos después de la publicidad. Tía Rosa, tu cuña. —Se oye un clic—.' }, // EN ANTENA
			// FUERA DE MICRO -------------------------------------------------------
			{ text: 'Clic. El ruido de fondo cambia. Ya no es el estudio: es una cabina de sonido, con alguien que sorbe café muy cerca del teléfono.' },
			{ say: 'renata', as: 'Renata (fuera de micro)', text: 'Micro apagado. Ahora en serio. —La voz le baja una octava, sin chistes—. ¿Tienes la llamada que recibió el operario? Pónmela.' }, // FUERA DE MICRO
			{ text: 'Rotom reproduce el buzón de voz. «…*en la cabina*…». La tos. «…*siete*…». «…*a las seis*…». «…*desaparece*…».' },
			{ say: 'nico_ferrer', as: 'Nico (fuera de micro)', text: 'Para. Para. Rebobina la tos. —Se oye cómo deja el café—. Esa tos es de la Tía Rosa. Episodio doce, el del faro. Se le atragantó una galleta en el minuto catorce y no lo cortamos porque quedaba tierno. La grabé yo. Me la sé de memoria.' }, // FUERA DE MICRO
			{ say: 'renata', as: 'Renata (fuera de micro)', text: 'Y «en la cabina» soy yo. Episodio siete. «Siete» es Nico, en el doce. Son trozos. Alguien nos está recortando, {jugador}. Con tijeras y con paciencia. O con un pájaro que repite.' }, // FUERA DE MICRO
			{ say: 'renata', as: 'Renata (fuera de micro)', text: 'Esto no se cuenta en antena. Ni la tos, ni los trozos. Si lo sabe, que lo sepa por otro sitio. —Pausa—. Nota para mí, no para el episodio: el que escribe las cartas oye el programa. Y solo el programa.' }, // FUERA DE MICRO
			{ say: 'renata', as: 'Renata (fuera de micro)', text: 'Buen trabajo. De verdad. —Muy rápido, como si le costara—. Vuelvo a antena. Cool, cool, cool.' }, // FUERA DE MICRO
			{ text: 'Clic. Se corta.' },
			{ intel: { npc: 'renata', text: 'El caso de la noria se resolvió en el directo del martes. Fuera de micro, Nico reconoció en la llamada al operario la tos de la Tía Rosa del episodio 12: la voz era un montaje de trozos del programa. Renata: «el que escribe las cartas oye el programa. Y solo el programa».' } },
		],
		b06_apuntador_2: [
			{ set: { 'flag.b06_apuntador_2': true } },
			{ text: 'El chico de la gorra de mensajero te ve, mira una foto que lleva en la mano —la tuya, recortada de una revista de la Gira— y viene derecho.' },
			{ say: 'mensajero_may', text: '¿{jugador}? Para ti. —Te da un sobre color crema—. Me llamó un señor desde un teléfono público. Me dijo una taquilla de la estación. Dentro estaba el sobre y las monedas, todas contadas. Que te lo diera en cuanto acabara el programa de la radio. Ni antes ni después.' },
			{ choice: [
				{ text: '«¿Cómo era el señor?»', then: [
					{ say: 'mensajero_may', text: 'No lo vi. Le digo «señor» porque hablaba muy bien, como en las películas. —Se encoge de hombros—. Y las monedas, exactas. Ni una de propina. Eso me fijé.' },
				] },
				{ text: '«¿Te dijo algo más?»', then: [
					{ say: 'mensajero_may', text: 'Que si me preguntabas cómo era, te dijera que «como todo el mundo». —Lo piensa—. Era verdad. Era como todo el mundo. Eso es lo raro.' },
				] },
			] },
			{ text: 'El chico se va corriendo antes de que le preguntes nada más. Abres el sobre.' },
			{ give: 'cartaapuntador2' },
			{ read: 'cartaapuntador2' },
			{ text: 'Una pegatina. Te acuerdas de otra: amarilla, en una cinta del archivo del estudio, que ponía «CORRECCIÓN» con la letra de Renata.', cond: 'flag.b06_cinta_ep3' },
			{ say: 'rotom', text: '¡Bzzt! Cita lo que dijiste en la radio. Palabra por palabra. —Pausa—. Lo que dijiste en la radio, sí. Lo que dijo Nico después, no. Ni lo de la tos. Ni lo de los trozos.' },
			{ say: 'rotom', text: 'O sea, que solo sabe lo que se dice con el micro encendido. —Se queda callado un momento—. Eso es útil. Creo. Lo apunto para Renata.' },
			{ quest: 'b06_t_apuntador', stage: 'espera' },
		],
		b06_noria_vuelta: [
			{ if: 'money < 300', then: [
				{ say: 'operario_noria', text: 'Son trescientos. ¿No llevas? Bueno… —Mira a su Emolga—. Hoy no. Que el Emolga se ofende si ve que se cuela gente.' },
				{ end: true },
			] },
			{ money: -300 },
			{ text: 'La cabina sube despacio. Mayólica se hace pequeña: las pantallas, el estadio con forma de concha, la torre de cristal del gimnasio, el desierto al sur, dorado. Al este, muy lejos, una muralla. Al sur, un bosque tan verde que parece azul.' },
			{ text: 'Arriba del todo, la noria se para un momento. En el cristal, alguien ha rayado con una uña, muy pequeño: «aquí me dijo que sí». Debajo, con otra letra: «y aquí me dijo que no».' },
			{ if: LUC, then: [
				{ text: '{riolu} pega la cara al cristal y mira hacia el sur, hacia el bosque. Se queda así toda la bajada.' },
				{ happy: { who: 'riolu', n: 3 } },
			] },
		],

		// =================== ESTACIÓN ===================
		b06_revisor_estacion: [
			{ if: 'flag.b06_pase_tren', then: [
				{ say: 'revisor_tes', text: '¡Pase de la Gira! —Te lo pica con una ceremonia que ya quisiera un notario—. Tren a Chamota cada media hora. Y el bosque, por la puerta de cristal: ese no necesita billete, pero el pase da suerte.' },
				{ say: 'revisor_tes', text: 'En Chamota cuentan cada uno una historia distinta de la misma noche. Si vas, no te creas a ninguno. O créetelos a todos. Es lo mismo.' },
			], else: [
				{ say: 'revisor_tes', text: 'Sin pase no se sube, joven. Ni al tren ni al andén del bosque, que lo tenemos cerrado por obras hasta que la Gira diga. Los pases los da la líder a quien gana su medalla.' },
			] },
		],
	},

	// =====================================================================
	// NPCs GENÉRICOS DE ESTE TRAMO
	// =====================================================================
	npcs: {
		operario_noria: { name: 'Operario de la noria', generic: true, look: { hair: 'cap', hairColor: '#6a6a6a', outfit: '#3a5ab5', outfit2: '#e9e8e0', skin: 3, eyesStyle: 'wide', mouth: 'open', acc: 'mustache', capColor: '#3a5ab5' } },
		mensajero_may: { name: 'Mensajero', generic: true, look: { hair: 'cap', hairColor: '#3a2a1e', outfit: '#c4743a', outfit2: '#f2c84a', skin: 4, eyesStyle: 'happy', mouth: 'grin', capColor: '#c43a3a', collar: 'tshirt' } },
		metro_revisora: { name: 'Jefa de revisores', generic: true, look: { hair: 'bun', hairColor: '#4a3a2a', outfit: '#3a4a6a', outfit2: '#f2c84a', skin: 2, eyesStyle: 'sharp', mouth: 'flat', acc: 'cap', capColor: '#3a4a6a' } },
		modelo_mirta: { name: 'Mirta', generic: true, look: { hair: 'long', hairColor: '#f2e6a0', outfit: '#2b2b38', outfit2: '#f2c84a', skin: 1, eyesStyle: 'lashes', mouth: 'lips', acc: 'lipstick' } },
		revisor_tes: { name: 'Revisor', generic: true, look: { hair: 'cap', hairColor: '#e9e8e0', outfit: '#3a6a4a', outfit2: '#c43a3a', skin: 1, eyesStyle: 'happy', mouth: 'smile', acc: 'mustache', capColor: '#3a6a4a' } },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		huevolarvesta: { name: 'Huevo de las ruinas', pocket: 'key', desc: 'Un huevo blanco con manchas color ceniza, tan caliente que hay que llevarlo envuelto. Late despacio, como una brasa que respira. Lo cuidaba un Darmanitan en las Ruinas del desierto.' },
		hojanoria: { name: 'Horario de la noria', pocket: 'key', desc: 'Una hoja oficial del ayuntamiento, amarilla por el sol, que estaba pegada con celo en la taquilla de la noria de Mayólica. Es un horario público.',
			read: '**AYUNTAMIENTO DE CIUDAD MAYÓLICA**\n*Servicio de Atracciones Municipales*\n\n**NORIA DEL BULEVAR · HORARIO DE SERVICIO Y MANTENIMIENTO**\n\n---\n\n**Servicio:** todos los días, de 10:00 a 24:00. Una vuelta completa: 20 minutos. 24 cabinas, numeradas del 1 al 24.\n\n**Vuelta lenta de revisión:** todos los días, de **18:00 a 18:15**.\n\nDurante la vuelta lenta, el personal de la atracción retira las **placas numeradas** de las cabinas para su limpieza y las repone al paso de cada cabina por el andén. Por razones de operativa, cada placa se repone **una posición más adelante** en el sentido de giro (la placa 7 se coloca en la cabina que sigue a la que la llevaba, y así sucesivamente). La numeración se corrige en la revisión semanal de los lunes.\n\nLos usuarios no tienen que bajar de las cabinas durante la vuelta lenta.\n\n**Se ruega no asustarse.**\n\n---\n\n*Firmado: el Concejal de Atracciones.*\n\n*(Debajo, a bolígrafo, con la letra del operario:)* *Ya sé que lo de las placas es una tontería. No lo decidí yo.*' },
		cartaapuntador2: { name: 'Segunda carta «Desde la concha»', pocket: 'key', desc: 'Un sobre color crema, de papel grueso como el de un programa de teatro. Escrito a máquina. Te la trajo un mensajero pagado por adelantado.',
			read: '*(Papel color crema, grueso, como el de los programas de teatro. Máquina de escribir. Todas las «e» están medio borradas, como si la tecla se comiera la tinta.)*\n\n---\n\nDetective (o lo que sea usted ahora):\n\nComo dijo el martes, en antena: «**El Emolga nunca se movió. Se movió el siete.**»\n\nBien dicho. Lo dijo usted con la voz de quien ha leído un horario. Yo también los leo. Los horarios son la única literatura honrada de esta región: dicen exactamente lo que va a pasar, a qué hora y en qué orden, y nadie los lee. Usted los lee. Me alegro. Así es más divertido.\n\nY su amiga dijo, también en antena: «**La noria no se tragó a nadie. Se tragó un número.**» Qué frase tan bonita. Seguro que la ha apuntado para algún episodio. Ella lo apunta todo para algún episodio.\n\nEl Emolga ya está con su dueño. Yo no robo. Presto, y devuelvo con lazo. No como otros, que señalan a alguien en público y luego, cuando ya da igual, corrigen con una pegatina.\n\nNo me busque. No estoy donde usted mira. Estoy donde se oye.\n\nHasta el próximo acto.\n\n— *Desde la concha*' },
		notacamille: { name: 'Nota de Camille', pocket: 'key', desc: 'Un papelito doblado muchas veces, hasta quedarse del tamaño de un sello. Camille lo llevaba dentro de la rodillera. Su padre te pidió que lo guardaras tú.',
			read: '*(Letra redonda, apretada, con un corazón pequeño en lugar del punto de la última i. El papel huele a goma de rodillera.)*\n\nPapá:\n\nEl saque ya me sale. El de arriba.\n\nYa sé que estás ahí. Te he visto en el primer set. Aplaudes con un dedo. Y el bigote es horrible.\n\nNo bajes. Ya sé por qué no bajas. Bueno, no lo sé. Pero lo sé.\n\nMuñeca firme. Como dijiste.\n\nTe quiero.\n\nC.\n\n*P. D.: El de la gabardina de Kalos se disfraza mejor que tú. Y eso es decir mucho.*' },
		programamusical: { name: 'Programa del Musical', pocket: 'key', desc: 'El programa de mano de la temporada del Musical de Mayólica. Papel grueso, color crema, con letras doradas.',
			read: '**MUSICAL DE MAYÓLICA**\n*Temporada de otoño*\n\n## «La dama de la luna»\n*Comedia musical en dos actos, con Pokémon*\n\n---\n\n**Funciones**\n\n· De martes a domingo: **función de tarde**, 17:30 (entreacto a las 18:10).\n· Viernes y sábados: **función de noche**, 21:00.\n· Lunes: descanso.\n\n---\n\n**Reparto**\n\nLa dama de la luna · *Rosalía Funes y su Gardevoir*\nEl capitán de las nubes · *Héctor Mairena y su Swanna*\nEl bufón · *Minccino de la compañía (se come el decorado)*\n\n**Vestuario y estilismo invitado:** *Liam, de Alola*\n**Atrezo:** *Chatot de la compañía*\n**Apuntador:** *Tadeo Lis* (desde hace quince temporadas)\n\n---\n\n*Se ruega silencio. Si a un actor se le olvida el texto, no se preocupen: alguien se lo dirá.*' },
		b06_mt_electrotela: { name: 'MT Electrotela', pocket: 'machines', tm: 'electroweb', desc: 'Atrapa al objetivo en una red eléctrica que reduce su Velocidad. Premio de Camila, líder de Mayólica: «para que los que corren demasiado sepan lo que es esperar».' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b06_ruinas_excavacion: {
			name: 'El frente de excavación', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 2, theme: 'ruina', hint: 'Arenisca blanda: el pico gasta poco. Los destellos del principio marcan dónde hay monedas antiguas.' },
			ask: 'Una pared de arenisca con vetas rojizas, cuadriculada con cuerdas por la expedición del Museo. La arqueóloga te deja un pico fino y un martillo «para cuando te canses de ser fino».',
			text: 'La arenisca suelta lo suyo. La arqueóloga lo apunta todo, hasta la arena.',
			wait: 'La arqueóloga ha tapado el frente con una lona. «Mañana. Que respire la piedra».',
			table: [
				{ id: 'softsand', w: 16, n: [1, 1] }, { id: 'hardstone', w: 12, n: [1, 1] }, { id: 'stardust', w: 14, n: [1, 2] },
				{ id: 'reliccopper', w: 12, n: [1, 2] }, { id: 'relicsilver', w: 6, n: [1, 1] }, { id: 'smoothrock', w: 6, n: [1, 1] },
				{ id: 'heatrock', w: 6, n: [1, 1] }, { id: 'relicgold', w: 2, n: [1, 1], rare: true }, { id: 'sunstone', w: 2, n: [1, 1], rare: true },
			],
		},
		b06_r4_dunas: {
			name: 'La duna del cartel caído', icon: '🏜️', hours: 18, picks: [1, 3],
			text: 'Al pie de la duna, el viento ha dejado cosas: arena fina, piedras pulidas y, a veces, algo que se le ha caído a alguien.',
			wait: 'El viento todavía no ha traído nada nuevo. Las dunas tardan.',
			table: [
				{ id: 'softsand', w: 18, n: [1, 2] }, { id: 'stardust', w: 14, n: [1, 2] }, { id: 'smoothrock', w: 8, n: [1, 1] },
				{ id: 'heatrock', w: 6, n: [1, 1] }, { id: 'starpiece', w: 3, n: [1, 1] }, { id: 'nugget', w: 1, n: [1, 1] },
			],
		},
		b06_bulevar: {
			name: 'Los árboles del bulevar', icon: '🧺', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'huerto', hint: 'Sacude las ramas sin tirar las jardineras. Las doradas valen por tres; las pochas, al Pidove.' },
			ask: 'Jardineras con árboles bajos de bayas en mitad de la avenida, entre pantallas gigantes. Un Pidove vigila desde una farola.',
			text: 'Las bayas del bulevar saben un poco a ciudad. Pero saben.',
			wait: 'El bulevar está pelado. El Pidove de la farola te mira como si hubieras sido tú. Has sido tú.',
			table: [
				{ id: 'oranberry', w: 18, n: [1, 3] }, { id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'cheriberry', w: 12, n: [1, 2] },
				{ id: 'wikiberry', w: 8, n: [1, 1] }, { id: 'magoberry', w: 8, n: [1, 1] },
				{ id: 'lumberry', w: 4, n: [1, 1], rare: true }, { id: 'starfberry', w: 1, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		metro_batalla_entreno: {
			name: 'Metro Batalla (entrenamiento)', type: 'Electric', rec: 63,
			cond: 'visited("metro_batalla")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **63**: revisores, ferroviarios y entrenadores de alquiler en el tren de práctica.' },
				{ text: 'La jefa de revisores da un premio a quien gane **tres** combates.' },
				{ cond: 'flag.b06_premio_metro', text: '✔ Premio conseguido: MT Bola Voltio.' },
			],
		},
		azucena_musical: {
			name: 'Azucena en el Musical', type: 'Dragon', trainer: 'azucena_2', rec: 62,
			cond: 'flag.b06_tadeo_conocido || flag.b06_tepig',
			info: [
				{ text: 'La turista del Altaria que canta. Opcional. Te deja curar antes.' },
				{ text: '4 Pokémon, hasta el nivel 62. Su **Altaria** megaevoluciona y cambia de tipo: deja de ser Volador y pasa a ser **Hada**.' },
				{ cond: 'beat("azucena_2")', text: '✔ Ganado. Altaria cantó hasta el final.' },
			],
		},
		bastien_metro: {
			name: 'Bastien, rival de alquiler', npc: 'bastien', trainer: 'bastien_7', type: 'Water', rec: 63,
			cond: 'flag.b06_bastien_metro',
			info: [
				{ text: 'Bastien se gana la vida en el Metro Batalla. El primer combate es gratis. Opcional. Te deja curar antes.' },
				{ text: '5 Pokémon, hasta el nivel 63. Su **Greninja** sale el último.' },
				{ cond: 'beat("bastien_7")', text: '✔ Ganado. Lo apuntó en su libreta.' },
			],
		},
	},
};
