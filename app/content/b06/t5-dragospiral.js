// Bloque 6 · Tramo 5: «La voz del narrador» (final del bloque).
// Porcelana de noche: los tejados (aviso de ritmo) → resultados de la trampa (Ysolde, el invernadero, Handsome)
// → carta 3 del Apuntador (primer acto ganado) → operación vertical de Ysolde: vigilante, salto de fe, claraboyas (rejilla),
// la pasarela (Francine o la jefa de contrata) → la sala de servidores (cerradura): «Dispositivo 0417 · Módulo Diario»
// → la azotea de la Torre Lemnis: ascenso a Ala (Ala de vencejo) → amanecer en el estudio: LA REVELACIÓN (Renata, {riolu})
// → LA DECISIÓN: purgar el Eco / reformarlo / doble agente → Ruta 6 → Ciudad Teja (terraza: entrenamiento, Salamencita)
// → Torre Dragospiral (Plasma; cada decisión ahorra un combate distinto) → Acromo (jefe) → el Nodo 05 → Reshiram
// → A.Z. al pie de la torre → la Gira anuncia Galar → b06_fin.
//
// Apuntador: solo sabe lo que se dijo EN ANTENA. Todo este tramo pasa FUERA DE MICRO salvo lo que se cita en su carta,
// que se dijo en antena en T4 («el viejo invernadero del muelle»).

// ---------- Condiciones reutilizadas ----------
const LUC = 'inParty("riolu") || inParty("lucario")';
const PLUMA = '(flag.b03_vencejo_pluma || flag.b04_vencejo_pluma)';
const ECO = '(flag.b06_eco_purgado || flag.b06_eco_reformado || flag.b06_eco_doble)';
const OPERA = 'flag.b06_tejados_llegada && !flag.b06_servidor';
const PASARELA = 'flag.b06_ts_pasarela';
const DIARIO = 'flag.b01_diario';
const SKULL = 'flag.b05_skull_taller';

const BG_TEJ = { type: 'city', roofs: ['#5a626e', '#8a8f9e', '#c4743a'], far: '#1f2e4f' };
const BG_SERV = { type: 'lab', wall: '#1f2433', floor: '#2b3040' };
const BG_ESTUDIO = { type: 'indoor', wall: '#4a3a3a', floor: '#2b2420' };
const BG_TORRE = { type: 'tower', far: '#8aa0b8', ground: '#6a6a72', fog: true };

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== TEJADOS DE PORCELANA ===================
		tejados_porcelana: {
			name: 'Tejados de Porcelana', short: 'Tejados', region: 'teselia', kind: 'area', parent: 'porcelana',
			bg: BG_TEJ,
			desc: 'Por encima de las calles de Porcelana hay otra ciudad: azoteas de grava, depósitos de agua, antenas, huertos en cajones de fruta y tendederos que nadie recoge. Desde aquí, los rascacielos son vecinos.\n\nY el más alto de todos, la **Torre Lemnis**, con su lemniscata que gira, está a dos saltos.',
			descNight: 'De noche, los tejados de Porcelana son un mar de ventanas encendidas. La lemniscata de la Torre Lemnis barre las azoteas, azul y plata, cada once segundos. Los Pidove duermen en fila en los cables. Abajo, el muelle. Arriba, nadie. Casi nadie.',
			descs: [
				{ cond: 'flag.b06_operacion_hecha', text: 'Los tejados de Porcelana, de vuelta a lo suyo: grava, antenas, tendederos y un huerto en cajones de fruta que alguien riega a las seis.\n\nLa lemniscata de la Torre Lemnis sigue girando. Ahora, cada vez que pasa por encima, sabes exactamente qué hay debajo. En la antena más alta, clavada, una pluma gris nueva.' },
			],
			enterCond: 'has("plumagris") && flag.b06_t4_hecho',
			blockedMsg: 'La puerta de la azotea está cerrada con un candado oxidado. Desde el otro lado se oye el viento.',
			onEnter: [{ script: 'b06_tejados_llegada', cond: '!flag.b06_tejados_llegada', once: true }],
			mapNote: 'Ysolde · la Torre Lemnis a dos saltos · huerto y nidos (cosecha)',
			spots: [
				{ label: 'Ysolde', sub: 'Sentada en el borde del depósito de agua', icon: '🪶', cond: '!flag.b06_operacion_hecha', talk: [{ script: 'b06_ysolde_tejados' }] },
				{ label: 'Ysolde', sub: 'Mira la ciudad desde la antena más alta', icon: '🪶', cond: 'flag.b06_operacion_hecha', talk: [{ script: 'b06_ysolde_despues' }] },
				{ label: 'El invernadero viejo del muelle', sub: 'Se ve desde aquí. Se baja por la escalera de incendios', icon: '✉️', cond: 'flag.b06_tejados_llegada && !flag.b06_apuntador_3', new: 'true', talk: [{ script: 'b06_invernadero' }] },
				{ label: 'Un vigilante con linterna', sub: 'Hace la ronda por la azotea de la floristería', icon: '🔦', cond: OPERA + ' && flag.b06_apuntador_3 && !beat("guardia_tes_1")', new: 'true', action: { trainer: 'guardia_tes_1' } },
				{ label: 'El borde del tejado', sub: 'Abajo, el toldo verde de la floristería', icon: '🪂', cond: OPERA + ' && beat("guardia_tes_1") && !flag.b06_ts_salto', new: 'true', talk: [{ script: 'b06_salto_toldo' }] },
				{ label: 'Las claraboyas', sub: 'Un tejado de cristal mojado entre tú y la Torre', icon: '🔲', cond: OPERA + ' && flag.b06_ts_salto && !flag.b06_ts_claraboyas', new: 'true', talk: [{ script: 'b06_claraboyas' }] },
				{ label: 'La pasarela de servicio', sub: 'Alguien de seguridad fuma al otro lado. No fuma: mastica chicle', icon: '💀', cond: OPERA + ' && flag.b06_ts_claraboyas && !' + PASARELA + ' && !' + SKULL, new: 'true', talk: [{ script: 'b06_francine_tes' }] },
				{ label: 'La pasarela de servicio', sub: 'Una jefa de seguridad con chaleco reflectante', icon: '🦺', cond: OPERA + ' && flag.b06_ts_claraboyas && !' + PASARELA + ' && ' + SKULL, new: 'true', talk: [{ script: 'b06_jefa_pasarela' }] },
				{ label: 'La ventana de servicio de la Torre Lemnis', sub: 'Planta cuarenta. Está entornada', icon: '🪟', cond: PASARELA + ' && !flag.b06_operacion_hecha', new: '!flag.b06_servidor', action: { go: 'torre_lemnis_cima' } },
				{ label: 'El huerto de la azotea', sub: 'Cajones de fruta, un limonero enano y nidos en las antenas', icon: '🪺', new: '!flag.rec_b06_tejados_nidos', action: { gather: 'b06_tejados_nidos' } },
			],
			rumors: [
				{ text: 'En Porcelana dicen que hay gente que va de azotea en azotea sin bajar nunca a la calle. Los repartidores de pizza lo niegan. Los de los pisos altos, no tanto: alguien les riega el limonero.' },
				{ text: 'Los Pidove de los tejados se posan en fila en los cables, mirando todos hacia el mismo lado. Hacia la Torre Lemnis. Un vecino dice que es por la luz. Otro, que es por costumbre.' },
				{ cond: 'flag.b06_operacion_hecha', text: 'Una noche saltó la alarma de la planta cuarenta de la Torre Lemnis. Lemnis dijo que fue un Pidove. Los Pidove, ofendidos, se cambiaron de cable.' },
			],
		},

		// =================== TORRE LEMNIS · PLANTA CUARENTA ===================
		torre_lemnis_cima: {
			name: 'Torre Lemnis · planta cuarenta', short: 'Planta 40', region: 'teselia', kind: 'building', parent: 'tejados_porcelana',
			bg: BG_SERV,
			desc: 'Una sala sin ventanas por dentro, aunque por fuera la torre sea de cristal. Filas de armarios negros con lucecitas verdes que parpadean, todas a la vez, como si respiraran. Hace frío de máquina. El suelo vibra.\n\nCada armario tiene una placa: «RACK 01 · KALOS», «RACK 02 · JOHTO», «RACK 03 · KANTO»… Al fondo, uno solo, sin región: «RACK 04 · DISPOSITIVOS».',
			descs: [
				{ cond: 'flag.b06_servidor', text: 'La sala de servidores, con las luces de alarma girando en el techo, rojas, sin ruido. Los armarios siguen respirando. El rack del fondo está abierto, con su pantalla encendida.\n\nUna escalera metálica sube a la azotea.' },
			],
			mapNote: 'Los servidores de Lemnis en Teselia',
			spots: [
				{ label: 'Rack 04 · Dispositivos', sub: 'Un armario con cerradura de combinación', icon: '🗄️', cond: '!flag.b06_servidor', new: 'true', talk: [{ script: 'b06_rack' }] },
				{ label: 'La escalera a la azotea', sub: 'Ysolde ya está arriba', icon: '🪜', cond: 'flag.b06_servidor && !flag.b06_operacion_hecha', new: 'true', talk: [{ script: 'b06_ala_azotea' }] },
			],
		},

		// =================== RUTA 6 ===================
		tes_ruta6: {
			name: 'Ruta 6', short: 'Ruta 6', region: 'teselia', kind: 'route', map: { x: 22, y: 26 },
			bg: { type: 'route', flowers: '#c9a0e0', far: '#6a8a9a', ground: '#5a8a4a', hill: '#4a6a5a' },
			desc: 'Un camino de tierra que sube de Fayenza hacia el norte entre prados de hierba alta, charcas y bosquecillos que cambian de color con la estación. A mitad, una ladera de roca con una cueva que zumba, y en lo alto de una loma, la cúpula blanca del **Instituto Meteorológico**.\n\nAl fondo del camino, donde empieza a hacer frío, **Ciudad Teja**.',
			descNight: 'De noche, la Ruta 6 es un concierto de charcas: croan los Palpitoad, chillan los Woobat a la entrada de la cueva y, de vez en cuando, un Emolga cruza planeando por delante de la luna con las membranas abiertas.',
			links: ['fayenza', 'teja'],
			enterCond: 'flag.b06_revelacion',
			blockedMsg: 'En la salida norte de Fayenza, un operario del Instituto Meteorológico, con chubasquero y una sonda en la mano, te para: «Niebla helada en la Ruta 6 desde ayer. No se ve ni la sonda. Hasta que no levante, no pasa nadie». Mira el cielo como si la niebla le debiera dinero.',
			mapNote: 'De Fayenza a Teja · Instituto Meteorológico · una cueva que zumba (veta)',
			rumors: [
				{ text: 'En el Instituto Meteorológico de la Ruta 6 tienen un Castform que cambia de forma antes que los barómetros. Lo consultan más que a las máquinas. Las máquinas, dicen, se han dado cuenta.' },
				{ text: 'Los Sawsbuck de la Ruta 6 cambian de pelaje con la estación. Hay quien viene desde Porcelana solo para verlos en otoño. Hay quien viene en invierno y se lleva un chasco.' },
			],
			route: {
				from: 'fayenza', to: 'teja', length: 7, terrain: 'grass', rate: 0.22,
				tramos: {
					0: [{ text: 'El camino sale de Fayenza entre almacenes y huertos y, enseguida, la ciudad se acaba. Hierba alta hasta la cintura. Charcas con nenúfares. El aire huele a tierra mojada y, muy al fondo, a nieve.' }],
					1: [
						{ trainer: 'ruta6_1' },
						{ item: 'maxrevive' },
					],
					2: [
						{ text: 'En lo alto de una loma, una cúpula blanca con una veleta que gira sin viento: el **Instituto Meteorológico**. Hay un cartel en la verja: «Hoy: despejado. Mañana: lo que diga el Castform».' },
						{ trainer: 'ruta6_2', optional: true, label: 'Una meteoróloga anota algo en la libreta mirando al cielo' },
					],
					3: [
						{ terrain: 'cave' },
						{ text: 'El camino se mete un trecho por una cueva de la ladera. Las piedras de las paredes zumban bajito, cargadas de electricidad, y se te eriza el pelo de la nuca. La salida se ve al fondo, blanca.' },
						{ spot: { action: { gather: 'b06_ruta6_veta' } }, label: 'Una pared de piedras que zumban', sub: 'Brillan como si tuvieran pilas', icon: '⛏️', new: '!flag.rec_b06_ruta6_veta' },
						{ item: 'thunderstone', hidden: true },
					],
					4: [
						{ text: 'Al salir de la cueva, un prado abierto. Un rebaño de Sawsbuck pasta en fila, todos con el mismo pelaje, como si se hubieran puesto de acuerdo. Te miran. Siguen pastando.' },
						{ trainer: 'ruta6_3', optional: true, label: 'Un criador cepilla a un Azumarill al lado de una charca' },
					],
					5: [
						{ trainer: 'ruta6_4' },
						{ item: 'fullrestore', hidden: true },
					],
					6: [{ text: 'El camino sube. La hierba se vuelve más corta y más dura, y en las charcas hay una capa fina de hielo. Al fondo, entre la niebla que queda, **Ciudad Teja**. Y más allá, al norte, una torre de piedra tan alta que se pierde en las nubes.' }],
					7: [{ text: 'Las primeras casas de Teja, con sus tejados escalonados de pizarra. Hace frío de verdad.' }],
				},
				encounters: {
					grass: [
						{ sp: 'sawsbuck', lv: [63, 65], w: 20 },
						{ sp: 'unfezant', lv: [63, 65], w: 16 },
						{ sp: 'amoonguss', lv: [63, 65], w: 12 },
						{ sp: 'leavanny', lv: [63, 65], w: 10 },
						{ sp: 'emolga', lv: [63, 65], w: 8 },
						{ sp: 'azumarill', lv: [63, 65], w: 8 },
						{ sp: 'escavalier', lv: [64, 65], w: 6 },
						{ sp: 'accelgor', lv: [64, 65], w: 6 },
						{ sp: 'swoobat', lv: [63, 65], w: 8, time: 'night' },
						{ sp: 'dunsparce', lv: [63, 64], w: 4 },
						{ sp: 'castform', lv: 64, w: 3 },
						{ sp: 'thievul', lv: [63, 65], w: 4, displaced: true, time: 'night' },
						{ sp: 'duraludon', lv: [64, 65], w: 2, displaced: true },
					],
					cave: [
						{ sp: 'boldore', lv: [63, 65], w: 22 },
						{ sp: 'swoobat', lv: [63, 65], w: 18 },
						{ sp: 'excadrill', lv: [64, 65], w: 14 },
						{ sp: 'aggron', lv: [64, 66], w: 10 },
						{ sp: 'galvantula', lv: [63, 65], w: 12 },
						{ sp: 'haxorus', lv: [65, 66], w: 3 },
						{ sp: 'duraludon', lv: [64, 65], w: 2, displaced: true },
					],
				},
			},
		},

		// =================== CIUDAD TEJA ===================
		teja: {
			name: 'Ciudad Teja', short: 'Teja', region: 'teselia', kind: 'city', map: { x: 32, y: 14 },
			bg: { type: 'town', roofs: ['#4a4f5a', '#5a626e', '#3a3f4a'], far: '#cfd6e2', ground: '#e9eef2', fog: true },
			desc: 'Una ciudad del norte, de casas bajas con tejados escalonados de pizarra, puestos para que no se acumule la nieve. Las calles son de piedra y hay pasarelas de madera sobre la **ciénaga**, que rodea medio pueblo y no se hiela nunca del todo.\n\nAl norte, al final del camino, la **Torre Dragospiral**: piedra vieja, tan alta que las nubes le pasan por la cintura.',
			descNight: 'De noche, Teja huele a leña y a sopa. La niebla sube de la ciénaga y se queda entre las casas, a la altura de las rodillas. Las farolas tienen un halo. Y en lo alto de la torre, a veces, hay una luz que no es de nadie.',
			descs: [
				{ cond: 'flag.b06_fin', text: 'Ciudad Teja, con sus tejados de pizarra y su ciénaga que humea. En la plaza, los niños juegan a ser un dragón blanco: uno hace de dragón y los demás corren y gritan. Los mayores dicen que esa noche la torre brilló entera.\n\nAl norte, la Torre Dragospiral, callada.' },
			],
			links: ['tes_ruta6', 'torre_dragospiral'],
			onEnter: [{ script: 'b06_teja_llegada', cond: '!flag.b06_teja_llegada', once: true }],
			mapNote: 'Centro Pokémon · terraza de los domadores (entrenamiento, tope 67) · ciénaga (pesca) · Torre Dragospiral',
			spots: [
				{ label: 'Centro Pokémon', sub: 'Con chimenea. La enfermera teje', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Teja', sub: 'Abrigos, Poké Balls y sopa caliente', action: { shop: 'tienda_teja' } },
				{ label: 'La terraza de los domadores', sub: 'Entrenamiento (nivel recomendado 67)', icon: '🐉', action: { go: 'terraza_teja' } },
				{ label: 'Las pasarelas de la ciénaga', sub: 'Se pesca desde las tablas', icon: '🎣', new: '!flag.rec_b06_teja_cienaga', action: { gather: 'b06_teja_cienaga' } },
				{ label: 'Bajar a la ciénaga', sub: 'Barro hasta los tobillos', icon: '🌾', action: { explore: 'grass' } },
				{ label: 'Al pie de la Torre: un hombre enorme', sub: 'Mira la torre con una flor roja en el hombro', icon: '🌺', cond: 'flag.b06_reshiram_visto && !flag.b06_fin', new: 'true', talk: [{ script: 'b06_az_torre' }] },
			],
			rumors: [
				{ text: 'En Teja dicen que la Torre Dragospiral es la construcción más vieja de Teselia, y que no la construyó nadie: que ya estaba cuando llegaron los primeros. Los domadores de la terraza dicen que la construyeron los dragones. Los dragones no dicen nada.' },
				{ text: 'La ciénaga de Teja no se hiela del todo nunca. Los Stunfisk se entierran en el barro, planos como baldosas, y hay quien los pisa sin querer. El calambre se oye desde la plaza.' },
				{ cond: '!flag.b06_fin', text: 'Desde hace unas semanas suben a la torre hombres con capas y escudos en el pecho. Hablan de liberar a los Pokémon. A los dragones de la torre no les han preguntado.' },
			],
			encounters: {
				grass: [
					{ sp: 'seismitoad', lv: [63, 65], w: 22 },
					{ sp: 'stunfisk', lv: [63, 65], w: 20 },
					{ sp: 'toxicroak', lv: [63, 65], w: 16 },
					{ sp: 'escavalier', lv: [64, 65], w: 10 },
					{ sp: 'accelgor', lv: [64, 65], w: 10 },
					{ sp: 'whiscash', lv: [63, 65], w: 12 },
					{ sp: 'cryogonal', lv: [64, 66], w: 6, time: 'night' },
					{ sp: 'frosmoth', lv: [64, 65], w: 3, displaced: true },
				],
			},
		},
		terraza_teja: {
			name: 'Terraza de los domadores', short: 'Terraza', region: 'teselia', kind: 'area', parent: 'teja',
			bg: { type: 'mountain', far: '#cfd6e2', ground: '#8a8f9e', hill: '#6a6e7a' },
			desc: 'Una terraza de piedra en la ladera, sobre los tejados de Teja, con vistas a la torre. Aquí entrenan los domadores de dragones de la ciudad desde hace generaciones: suelo de losas rayadas por garras, postes de madera mordidos y un caldero de sopa siempre al fuego.\n\nLa vieja domadora de la terraza se sienta junto al caldero con una manta en las rodillas. No se pierde un combate.',
			mapNote: 'Zona de entrenamiento (tope 67) · premio de la vieja domadora',
			spots: [
				{ label: 'Combatir con los domadores', sub: 'Entrenamiento (nivel recomendado 67)', icon: '🐉', action: { training: {
					cap: 67, prize: { wins: 3, script: 'b06_premio_terraza' }, trainers: ['terraza_1', 'terraza_2', 'terraza_3'], coach: 'La vieja domadora de la terraza',
					wild: [{ sp: 'druddigon', lv: [64, 66] }, { sp: 'fraxure', lv: [64, 66] }, { sp: 'altaria', lv: [64, 66] }, { sp: 'flygon', lv: [64, 66] }],
					closed: 'La vieja domadora remueve la sopa sin mirarte. «Tus dragones, o lo que lleves, ya saben más de lo que aquí se enseña. Ve a la torre. Los de arriba no te van a esperar con sopa».',
				} } },
			],
			rumors: [
				{ text: 'Los domadores de Teja no compran dragones: los crían desde el huevo y los acompañan hasta que se mueren de viejos. Uno de ellos, dicen, lleva setenta años con el mismo Druddigon. Y el Druddigon, con él.' },
			],
		},

		// =================== TORRE DRAGOSPIRAL ===================
		torre_dragospiral: {
			name: 'Torre Dragospiral', short: 'Dragospiral', region: 'teselia', kind: 'route', map: { x: 44, y: 8 },
			bg: BG_TORRE,
			desc: 'La torre más vieja de Teselia: una espiral de piedra gris que sube y sube alrededor de un hueco central, con escaleras gastadas en el medio por millones de pasos. En los muros hay dragones tallados que ya no tienen cara. Hace frío y huele a musgo y a ceniza.\n\nArriba del todo, en la **cima**, el viento silba como un dragón dormido. O es un dragón dormido.',
			descNight: 'De noche, la torre es una garganta de piedra. Los Golurk de las plantas bajas encienden los ojos al pasar, como farolas de piedra, y vuelven a apagarlos. Por el hueco central sube un aire tibio que no debería estar ahí.',
			descs: [
				{ cond: 'flag.b06_nodo05', text: 'La Torre Dragospiral, en silencio. Los cables de Plasma siguen grapados en las escaleras, cortados y colgando. Los Golurk de las plantas bajas los han ido arrancando, despacio, uno a uno, como quien quita malas hierbas.\n\nPor el hueco central ya no sube aire tibio. Sube viento, solo viento.' },
			],
			links: ['teja', 'cima_dragospiral'],
			enterCond: 'flag.b06_revelacion',
			blockedMsg: 'Dos reclutas con capa y un escudo en el pecho bloquean la entrada de la torre: «Zona en liberación. Vuelve cuando seas libre». Ni ellos saben qué significa.',
			mapNote: 'Equipo Plasma · una grieta con reliquias · la cima',
			rumors: [
				{ text: 'En las plantas bajas de la torre viven Golurk que nadie recuerda haber visto llegar. Los domadores dicen que son los guardias. No dicen de qué.' },
				{ text: 'Muy de vez en cuando, en la torre se ve un Zweilous. Dos cabezas, ninguna de las dos ve, y las dos se pelean por la comida. Si te topas con uno, dicen, no te fíes de ninguna.' },
			],
			route: {
				from: 'teja', to: 'cima_dragospiral', length: 8, terrain: 'rocks', rate: 0.2,
				tramos: {
					0: [{ text: 'La entrada de la torre: un arco de piedra con un dragón tallado encima, sin cara. Dentro, la escalera sube en espiral alrededor de un hueco tan hondo que no se le ve el fondo, y tan alto que no se le ve el final.' }],
					1: [
						{ text: 'Grapados a la piedra de la escalera, a la altura del tobillo, sube un cable grueso, negro, con una etiqueta cada diez escalones: una lemniscata azul y plata y las letras **F-05**.', cond: '!flag.b06_nodo05' },
						{ item: 'dragonfang' },
					],
					2: [{ trainer: 'plasma_dr_1' }],
					3: [
						{ text: 'Una planta ancha, con columnas. En una pared, la piedra se ha agrietado y por la grieta asoma algo que brilla: metal viejo, labrado, de cuando la torre era nueva.' },
						{ spot: { action: { gather: 'b06_dragospiral_grieta' } }, label: 'La grieta de la pared vieja', sub: 'Asoma metal labrado', icon: '⛏️', new: '!flag.rec_b06_dragospiral_grieta' },
						{ text: 'Mientras subes, la Pokédex vibra. Una voz tranquila, de abuelo, que ya no se esconde: «Por aquí, {jugador}. Detrás de la tercera columna hay una escalera de servicio. Los técnicos de Lemnis la usan para no cruzarse con los de Plasma. Nadie la vigila».', cond: 'flag.b06_eco_reformado && !flag.b06_nodo05' },
					],
					4: [
						{ trainer: 'plasma_dr_2', cond: '!flag.b06_eco_purgado && !flag.b06_eco_reformado' },
						{ trainer: 'plasma_dr_2', optional: true, label: 'Un recluta vigila la escalera principal. Por la de servicio se le puede rodear', cond: 'flag.b06_eco_reformado' },
						{ text: 'En el rellano hay una silla plegable, un termo y una radio que dice «relevo a las once». Son las doce. El relevo no ha llegado. Desde anoche, a Lemnis le cuesta saber dónde mandar a nadie.', cond: 'flag.b06_eco_purgado && !flag.b06_nodo05' },
					],
					5: [
						{ text: 'Una ventana sin cristal, enorme, abierta al norte. Desde aquí se ve toda Teja, la ciénaga que humea y, muy lejos, un lago blanco. El viento entra a ráfagas y te empuja hacia la escalera.' },
						{ item: 'dragonscale', hidden: true },
						{ talk: [{ script: 'b06_torre_descanso' }], label: 'Un cuenco de agua de deshielo en la ventana', sub: 'Lo dejan los domadores para los que suben', icon: '💧' },
					],
					6: [
						{ trainer: 'plasma_dr_3', cond: '!flag.b06_eco_doble' },
						{ text: 'La planta está vacía. En el suelo, huellas de botas recientes que suben por la escalera norte, la que da la vuelta por fuera. Esta mañana, alguien en Lemnis leyó que irías por ahí. Y mandó a los suyos a esperarte.', cond: 'flag.b06_eco_doble && !flag.b06_nodo05' },
					],
					7: [
						{ text: 'El último tramo de escalera, estrecho, sin barandilla. Arriba se oye el zumbido de una máquina y, por debajo del zumbido, algo más grande. Una respiración.', cond: '!flag.b06_nodo05' },
						{ talk: [{ script: 'b06_torre_descanso' }], label: 'Un nicho con un cuenco de agua de deshielo', sub: 'Lo dejan los domadores para los que suben', icon: '💧' },
						{ item: 'maxpotion', hidden: true },
					],
					8: [{ text: 'La cima.' }],
				},
				encounters: {
					rocks: [
						{ sp: 'golurk', lv: [64, 66], w: 20 },
						{ sp: 'mienshao', lv: [64, 66], w: 14 },
						{ sp: 'druddigon', lv: [64, 66], w: 10 },
						{ sp: 'beartic', lv: [64, 66], w: 10 },
						{ sp: 'vanilluxe', lv: [64, 66], w: 10 },
						{ sp: 'unfezant', lv: [63, 65], w: 8 },
						{ sp: 'sawsbuck', lv: [63, 65], w: 8 },
						{ sp: 'audino', lv: [63, 65], w: 6 },
						{ sp: 'zweilous', lv: 63, w: 4 },
						{ sp: 'golbat', lv: [63, 65], w: 6, time: 'night' },
						{ sp: 'frosmoth', lv: [64, 65], w: 3, displaced: true },
					],
				},
			},
		},
		cima_dragospiral: {
			name: 'Cima de la Torre Dragospiral', short: 'La cima', region: 'teselia', kind: 'area', map: { x: 46, y: 4 }, // fin de la ruta de la torre: lugar de primer nivel (un sub-lugar no puede ser extremo de una ruta)
			bg: { type: 'ruins', far: '#cfd6e2', ground: '#8a8f9e', fog: true, fissure: true },
			desc: 'La cima de la torre es una explanada redonda, sin techo, abierta al cielo y al viento. En el centro, un altar de piedra negra. Sobre el altar, una esfera blanca del tamaño de una cabeza: el **Orbe Claro**.\n\nAlrededor del altar, el Equipo Plasma ha montado un **anillo de metal** con cables que bajan por toda la torre: el **Arco II**.',
			descs: [
				{ cond: 'flag.b06_nodo05', text: 'La cima de la torre, abierta al cielo. El anillo del Arco II está desmontado: piezas de metal apiladas contra el muro, cables enrollados como mangueras. El altar de piedra negra está vacío.\n\nEn la piedra, alrededor del altar, hay una marca nueva: un círculo de hollín blanco, como si algo muy caliente hubiera estado mucho rato enroscado ahí.' },
			],
			links: ['torre_dragospiral'],
			onEnter: [{ script: 'b06_cima_llegada', cond: '!flag.b06_cima_llegada', once: true }],
			mapNote: 'Acromo · el Nodo 05 · el Orbe Claro',
			spots: [
				{ label: 'Enfrentarte a Acromo', sub: 'Te espera junto al anillo, con las manos en los bolsillos', icon: '⚙️', cond: 'flag.b06_cima_llegada && !beat("acromo_1")', new: 'true', talk: [{ cond: 'flag.b06_acromo_perdio', script: 'b06_acromo_revancha' }, { script: 'b06_acromo_reto' }] },
				{ label: 'El altar de piedra negra', sub: 'Vacío. Tibio todavía', icon: '🔥', cond: 'flag.b06_nodo05', talk: [{ script: 'b06_altar_despues' }] },
			],
			rumors: [
				{ text: 'Los domadores de Teja suben a la cima una vez al año, en el día más frío, a dejarle al altar un cuenco de sopa. Nadie sabe para quién. Se la dejan igual.' },
			],
		},
	},

	// Lugares de otros tramos de este bloque (se suman en index.js)
	extraSpots: {
		porcelana: [
			{ label: 'Una pluma gris atada a la escalera de incendios', sub: 'Con un hilo, a la altura de la mano', icon: '🪶', cond: 'flag.b06_t4_hecho && !has("plumagris")', new: 'true', talk: [{ script: 'b06_pluma_escalera' }] },
			{ label: 'La escalera de incendios del muelle', sub: 'Sube hasta los tejados', icon: '🪶', cond: 'flag.b06_t4_hecho', new: '!visited("tejados_porcelana")', action: { go: 'tejados_porcelana' } },
		],
		estudio_casos: [
			{ label: '🌅 Renata, al amanecer', sub: 'Ha llenado la pizarra de corcho', icon: '🌅', cond: 'quest.b06_m5 == "revelacion"', new: 'true', talk: [{ script: 'b06_revelacion' }] },
			{ label: 'La azotea del rascacielos', sub: 'Renata te ha hecho una seña: «sube»', icon: '📼', cond: 'flag.b06_revelacion && af.renata >= 45 && !flag.b06_renata_grabadora', new: 'true', talk: [{ script: 'b06_renata_grabadora' }] },
		],
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Jefe de trama: Acromo -----
		acromo_1: { name: 'Acromo', cls: 'Científico', npc: 'acromo', ai: 4, iv: 26, reward: 8700, terrain: 'rocks', bg: 'ruins',
			team: [
				{ sp: 'klinklang', lv: 64, moves: ['geargrind', 'wildcharge', 'shiftgear', 'magnetrise'], ability: 'clearbody', item: 'sitrusberry', nature: 'adamant', iv: 28 },
				{ sp: 'beheeyem', lv: 65, moves: ['psychic', 'shadowball', 'thunderbolt', 'trickroom'], ability: 'analytic', item: 'colburberry', nature: 'quiet', iv: 28 },
				{ sp: 'bronzong', lv: 65, moves: ['gyroball', 'psychic', 'earthquake', 'lightscreen'], ability: 'levitate', item: 'mentalherb', nature: 'relaxed', iv: 28 },
				{ sp: 'rotomwash', lv: 65, moves: ['hydropump', 'thunderbolt', 'willowisp', 'voltswitch'], ability: 'levitate', item: 'sitrusberry', nature: 'bold', iv: 26 },
				{ sp: 'magnezone', lv: 66, moves: ['thunderbolt', 'flashcannon', 'voltswitch', 'bodypress'], ability: 'sturdy', item: 'magnet', nature: 'modest', iv: 28 },
				{ sp: 'metagross', lv: 67, moves: ['meteormash', 'zenheadbutt', 'earthquake', 'bulletpunch'], ability: 'clearbody', item: 'sitrusberry', nature: 'adamant', iv: 29 },
			],
			items: [{ id: 'maxpotion', n: 2 }],
			intro: 'Un vínculo es una fuerza. Y las fuerzas se miden. Llevo años midiendo las de los demás desde lejos. Hoy tengo la suerte de medir la tuya de cerca. No te contengas: los datos a medias no me sirven de nada.',
			win: 'Fascinante. —Mira a su Metagross, quieto en el suelo, sin enfado—. Has ganado con algo que no sale en mis gráficas. O sí sale, y yo no sabía leerlo. Tengo que volver a mirarlo todo.',
			lose: 'Interesante. Pero no concluyente. Una medida sola no es una medida. Vuelve: necesito más datos. Y tú, un poco de descanso.' },

		// ----- Torre Lemnis: seguridad (Francine o la jefa de contrata) -----
		francine_2: { name: 'Francine', cls: 'Jefa de seguridad', npc: 'francine', ai: 4, iv: 28, reward: 5300, terrain: 'path', bg: 'city',
			team: [
				{ sp: 'crobat', lv: 64, moves: ['crosspoison', 'bravebird', 'uturn', 'roost'], ability: 'innerfocus', nature: 'jolly', iv: 27 },
				{ sp: 'golisopod', lv: 64, moves: ['firstimpression', 'liquidation', 'leechlife', 'razorshell'], ability: 'emergencyexit', nature: 'adamant', iv: 27 },
				{ sp: 'toxapex', lv: 65, moves: ['scald', 'toxic', 'recover', 'venoshock'], ability: 'merciless', nature: 'bold', iv: 28 },
				{ sp: 'mukalola', lv: 65, moves: ['knockoff', 'poisonjab', 'icepunch', 'firepunch'], ability: 'poisontouch', nature: 'adamant', iv: 28 },
				{ sp: 'salazzle', lv: 66, moves: ['flamethrower', 'sludgebomb', 'dragonpulse', 'nastyplot'], ability: 'corrosion', item: 'blacksludge', nature: 'timid', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: 'Me pagan por que nadie cruce esta pasarela. No me pagan por que me caiga bien quien la cruza. Venga. Que sea rápido, que a las doce cambia el turno.',
			win: 'Va. Ya está. Cruza. —Se aparta, sacudiéndose la chaqueta—. Yo no te he visto. Y si te he visto, eras muy fe{o|a|e}.',
			lose: 'No es nada personal. Los Pokémon al Centro, tú a casa, y aquí no ha pasado nada.' },
		jefa_tes_1: { name: 'Brígida', cls: 'Jefa de seguridad', npc: 'guardia_lemnis', ai: 4, iv: 27, reward: 4400, terrain: 'path', bg: 'city',
			team: [
				{ sp: 'skarmory', lv: 64, moves: ['bravebird', 'steelwing', 'spikes', 'roost'], ability: 'sturdy', nature: 'impish', iv: 26 },
				{ sp: 'magneton', lv: 65, moves: ['thunderbolt', 'flashcannon', 'triattack', 'discharge'], ability: 'analytic', nature: 'modest', iv: 26 },
				{ sp: 'mandibuzz', lv: 66, moves: ['foulplay', 'bravebird', 'roost', 'toxic'], ability: 'overcoat', item: 'leftovers', nature: 'careful', iv: 28 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Seguridad de la planta cuarenta. Contrato nuevo: la empresa de antes se fue a Alola a arreglar máquinas. —Te enfoca con la linterna—. Yo no me voy a ningún sitio.',
			win: 'Anotado en el parte: «incidencia en la pasarela, sin heridos». Lo de «sin dignidad» no lo pongo.',
			lose: 'Fuera de mi pasarela. Y ponte una chaqueta, que aquí arriba se pesca un resfriado.' },
		guardia_tes_1: { name: 'Rodolfo', cls: 'Vigilante de Lemnis', npc: 'guardia_lemnis', ai: 3, reward: 2600, terrain: 'path', bg: 'city',
			team: [
				{ sp: 'liepard', lv: 64, moves: ['nightslash', 'uturn', 'fakeout', 'playrough'] },
				{ sp: 'magneton', lv: 65, moves: ['thunderbolt', 'flashcannon', 'triattack', 'discharge'] },
			],
			intro: 'Esta ronda la hago yo desde hace tres años. Nunca pasa nada. —Te ve—. Bueno. Nunca pasaba nada.',
			win: 'Voy a decir que eras un Pidove. Un Pidove muy grande. Con capucha.' },

		// ----- Ruta 6 -----
		ruta6_1: { name: 'Severino', cls: 'Montañero', ai: 3, reward: 2600,
			team: [
				{ sp: 'gigalith', lv: 64, moves: ['stoneedge', 'earthquake', 'heavyslam', 'stealthrock'] },
				{ sp: 'excadrill', lv: 65, moves: ['earthquake', 'ironhead', 'rockslide', 'swordsdance'] },
			],
			intro: 'Bajo de Teja una vez al mes a comprar pilas. Arriba no las venden, dicen que la torre las descarga. Yo no me lo creo. Pero compro muchas.',
			win: 'Buena mano. Si subes a la torre, abrígate. Allí arriba el viento te habla. No le contestes.',
			look: { hair: 'short', hairColor: '#6a6a6a', outfit: '#8a5a2f', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'narrow', mouth: 'flat', acc: 'beard hat', hatColor: '#4a3a2a' } },
		ruta6_2: { name: 'Inmaculada', cls: 'Meteoróloga', ai: 3, reward: 2600,
			team: [
				{ sp: 'castform', lv: 64, moves: ['weatherball', 'thunderbolt', 'icebeam', 'sunnyday'] },
				{ sp: 'swanna', lv: 65, moves: ['hurricane', 'surf', 'roost', 'icebeam'] },
				{ sp: 'zebstrika', lv: 65, moves: ['wildcharge', 'flamecharge', 'overheat', 'thunderbolt'] },
			],
			intro: 'Desde hace semanas, encima de la Torre Dragospiral hay una nube que no se mueve. Ni con viento. Las nubes que no se mueven no son nubes: son preguntas. ¿Me ayudas a pensar con un combate?',
			win: 'Pues no lo he pensado mejor, pero me lo he pasado bien. Apunto: «a mediodía, despejado; en la torre, pregunta».',
			look: { hair: 'bob', hairColor: '#3a2a1e', outfit: '#e9e8e0', outfit2: '#3a8ac4', skin: 1, eyesStyle: 'happy', mouth: 'smile', acc: 'glasses' } },
		ruta6_3: { name: 'Baudilio', cls: 'Criador Pokémon', ai: 3, reward: 2600,
			team: [
				{ sp: 'azumarill', lv: 64, moves: ['playrough', 'aquatail', 'superpower', 'knockoff'] },
				{ sp: 'sawsbuck', lv: 65, moves: ['hornleech', 'doubleedge', 'megahorn', 'swordsdance'] },
				{ sp: 'leavanny', lv: 65, moves: ['leafblade', 'xscissor', 'swordsdance', 'poisonjab'] },
			],
			intro: 'Crío Sawsbuck desde hace cuarenta años. En otoño los peino para que luzcan. En invierno no hace falta: se peinan solos de frío.',
			win: 'Bien cuidados los tuyos. Se nota en cómo te miran cuando ganas: como si no les hubiera sorprendido.',
			look: { hair: 'balding', hairColor: '#cfcac0', outfit: '#5aa36b', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'sleepy', mouth: 'smile', acc: 'mustache' } },
		ruta6_4: { name: 'Graciela', cls: 'Exploradora', ai: 3, reward: 2640,
			team: [
				{ sp: 'escavalier', lv: 65, moves: ['megahorn', 'ironhead', 'drillrun', 'swordsdance'] },
				{ sp: 'galvantula', lv: 65, moves: ['thunder', 'bugbuzz', 'energyball', 'stickyweb'] },
				{ sp: 'accelgor', lv: 66, moves: ['bugbuzz', 'focusblast', 'energyball', 'spikes'] },
			],
			intro: 'He visto a unos de capa subir cajas a la torre. Cajas con un ocho tumbado. Yo con los de capa no me meto. Contigo sí, que pareces de fiar.',
			win: 'Pues sí eras de fiar. Sube, anda. Y si encuentras al dueño de las cajas, dile que en Teja no queremos ochos.',
			look: { hair: 'ponytail', hairColor: '#c4743a', outfit: '#3a6a4a', outfit2: '#c9a66b', skin: 3, eyesStyle: 'sharp', mouth: 'grin', acc: 'bandana' } },

		// ----- Terraza de los domadores (entrenamiento, tope 67) -----
		terraza_1: { name: 'Eutimio', cls: 'Domador de dragones', ai: 3, reward: 2640,
			team: [
				{ sp: 'druddigon', lv: 65, moves: ['dragonclaw', 'firefang', 'suckerpunch', 'rockslide'] },
				{ sp: 'flygon', lv: 65, moves: ['earthquake', 'dragonclaw', 'uturn', 'firepunch'] },
			],
			intro: 'Mi abuelo domaba aquí. Mi padre domaba aquí. Yo domo aquí. Mi hija dice que quiere ser dentista. La apoyo. Pero primero, combate.',
			win: 'Tus Pokémon saben aguantar el viento. Eso aquí arriba es lo primero que se aprende. Lo segundo es la sopa.',
			look: { hair: 'short', hairColor: '#2a2420', outfit: '#3a3f4a', outfit2: '#c43a3a', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'scar' } },
		terraza_2: { name: 'Roxana', cls: 'Domadora de dragones', ai: 3, reward: 2660,
			team: [
				{ sp: 'altaria', lv: 65, moves: ['dragonpulse', 'moonblast', 'flamethrower', 'roost'] },
				{ sp: 'kingdra', lv: 66, moves: ['dragonpulse', 'surf', 'icebeam', 'flashcannon'] },
			],
			intro: 'En Teja dicen que los dragones eligen a su domador. A mí me eligió un Swablu que me robó el bocadillo. Veintidós años juntos. Sigue robándome el bocadillo.',
			win: 'Mi Altaria te ha mirado bien. No te ha robado nada. Eso es que te respeta.',
			look: { hair: 'long', hairColor: '#e9e8e0', outfit: '#3a3f4a', outfit2: '#8ab0e0', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'earrings' } },
		terraza_3: { name: 'Casandra', cls: 'Domadora veterana', ai: 3, reward: 2680,
			team: [
				{ sp: 'haxorus', lv: 66, moves: ['dragonclaw', 'earthquake', 'poisonjab', 'swordsdance'] },
				{ sp: 'dragonite', lv: 66, moves: ['dragonclaw', 'extremespeed', 'firepunch', 'thunderpunch'] },
			],
			intro: 'Cuando era niña, vi algo blanco bajar de la torre una noche de tormenta. Desde entonces subo todos los años. No lo he vuelto a ver. Pero sigo subiendo. Y sigo combatiendo con quien sube.',
			win: 'Lo que vi era blanco y ardía sin quemar. Si lo ves tú, no te asustes. Yo me asusté. Me arrepiento todavía.',
			look: { hair: 'bun', hairColor: '#8a8f9e', outfit: '#4a3a3a', outfit2: '#c4743a', skin: 2, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses' } },

		// ----- Torre Dragospiral: Equipo Plasma -----
		plasma_dr_1: { name: 'Recluta', cls: 'Equipo Plasma', npc: 'recluta_plasma', ai: 3, reward: 2640,
			team: [
				{ sp: 'seviper', lv: 65, moves: ['poisonjab', 'crunch', 'glare', 'earthquake'] },
				{ sp: 'scrafty', lv: 65, moves: ['crunch', 'drainpunch', 'icepunch', 'dragondance'] },
			],
			intro: '¡El Lazo nos liberará! ¡A todos! A los Pokémon, a las personas, a mí del alquiler… Eso no lo dice el panfleto, pero lo pienso yo.',
			win: 'Igual el Lazo me libera la semana que viene. Esta no.' },
		plasma_dr_2: { name: 'Recluta', cls: 'Equipo Plasma', npc: 'recluta_plasma', ai: 3, reward: 2660,
			team: [
				{ sp: 'garbodor', lv: 65, moves: ['gunkshot', 'drainpunch', 'toxicspikes', 'explosion'] },
				{ sp: 'krookodile', lv: 66, moves: ['earthquake', 'crunch', 'stoneedge', 'gunkshot'] },
			],
			intro: 'Nos dijeron que arriba duerme un Pokémon que lleva siglos sin ser libre. Vamos a liberarlo. Con una máquina. Una máquina muy grande. —Pausa—. Dicho así suena raro.',
			win: 'Se lo voy a preguntar al jefe. Lo de la máquina. Cuando baje. Si baja.' },
		plasma_dr_3: { name: 'Isidoro', cls: 'Instructor Plasma', npc: 'recluta_plasma', ai: 4, iv: 26, reward: 4000,
			team: [
				{ sp: 'cofagrigus', lv: 65, moves: ['shadowball', 'willowisp', 'nastyplot', 'darkpulse'] },
				{ sp: 'weavile', lv: 66, moves: ['nightslash', 'iceshard', 'icepunch', 'lowkick'] },
				{ sp: 'golurk', lv: 66, moves: ['earthquake', 'shadowpunch', 'icepunch', 'hammerarm'] },
				{ sp: 'mandibuzz', lv: 67, moves: ['foulplay', 'bravebird', 'roost', 'toxic'] },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Yo enseño a los reclutas a recitar el panfleto. Me lo sé de memoria. Lo que no me sé es quién lo escribe. Ni quién paga la imprenta. —Se cruza de brazos—. Aquí no sube nadie más.',
			win: 'Llevo nueve años recitando lo de la libertad. Hoy me he dado cuenta de que nunca lo he dicho con mis palabras. Sube. A ver si arriba alguien las tiene.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LOS TEJADOS: LLEGADA Y RESULTADOS DE LA TRAMPA ===================
		// FUERA DE MICRO: toda la noche de los tejados, la operación y la revelación. El Apuntador no sabe nada de esto.
		// EN ANTENA (dicho en T4, en el directo del martes): «el viejo invernadero del muelle». Es lo único que cita la carta 3.
		// Todo lo que pasa en los tejados es FUERA DE MICRO. Nada de aquí llega al Apuntador.
		b06_tejados_llegada: [
			{ set: { 'flag.b06_tejados_llegada': true, 'flag.b06_m_aviso': true } },
			{ quest: 'b06_t_vencejos', stage: 'operacion' },
			{ text: 'Esperas a que anochezca en un banco del muelle. Cuando la lemniscata de la Torre Lemnis se enciende en lo alto, azul y plata, subes por la escalera de incendios de un almacén. Diecinueve pisos. La cancela de arriba está abierta. Alguien la ha engrasado.' },
			{ text: '{riolu} sube delante, de dos en dos peldaños, sin hacer ruido. Como en Azafrán.', cond: LUC },
			{ text: 'Arriba, la ciudad entera. Y sentada en el borde del depósito de agua, con las piernas colgando sobre diecinueve pisos de nada, Ysolde.' },
			{ say: 'ysolde', text: 'Seis minutos desde el muelle. —No se gira—. En Azafrán tardaste cuatro. Los tejados de Porcelana son más altos. Te lo perdono.' },
			{ say: 'ysolde', text: 'Lo de anoche. Lo de tu amiga, la de las gafas redondas. Me pidió que te lo diera escrito, en papel. Dijo que hoy no se habla delante de ese aparato. —Señala la Pokédex con la barbilla—. No sé por qué. Pero me cayó bien que lo pidiera.' },
			{ say: 'rotom', text: '¡Bzzt! ¿Delante de mí? ¿Por qué? Yo leo muy bien. Leo en voz alta, con entonación. ¡Dámelo y te lo leo!' },
			{ text: 'Ysolde no te da el papel a ti. Lo deja en el borde del depósito, entre los dos, y le pone una piedrecita encima. Rotom se queda mirando la piedra.' },
			{ give: 'notatrampa' },
			{ read: 'notatrampa' },
			{ text: 'Tres detalles falsos. Tres canales. El invernadero, dicho en antena. El Bosque Azulejo, dicho una sola vez, en la mesa de la furgoneta, sin micro, con la Pokédex encendida al lado. El puerto de Fayenza, por la radio de la Policía.' },
			{ text: 'Al Bosque Azulejo fue Lemnis. Cuatro personas con chaqueta azul y una linterna, a las tres de la mañana, a un claro donde no había nada. Nadie más que tú y Renata sabía ese nombre. Tú, Renata… y lo que estaba encendido encima de la mesa.' },
			{ if: LUC, then: [
				{ text: '{riolu} mira la Pokédex. No gruñe esta vez. La mira como se mira una puerta que ya sabes que está abierta.' },
			] },
			{ say: 'rotom', text: '¿Qué pasa? ¿Por qué me miran así? —Pausa—. ¿He hecho algo? Yo no he hecho nada. Yo solo apunto. Apuntar no es hacer nada.' },
			{ say: 'ysolde', text: 'Al puerto de Fayenza no fue nadie. Ni un Wingull. Tu policía es de fiar. —Mira hacia el muelle—. Y al invernadero fue alguien, de madrugada. No he bajado a mirar. Eso es tuyo.' },
			{ set: { 'flag.b06_trampa_hecha': true } },
			{ af: { renata: 5 } },
			{ intel: { npc: 'ysolde', text: 'La trampa de Renata funcionó. Bosque Azulejo (solo lo oyó la Pokédex): fue Lemnis. Puerto de Fayenza (radio de la Policía): nadie. El invernadero del muelle (en antena): alguien fue de madrugada.' } },
			{ say: 'ysolde', text: 'Cuando vuelvas, hablamos de lo otro. Esta noche entramos en esa torre. —La lemniscata pasa por encima, azul—. Desde arriba se ve quién mueve los hilos. Hoy vamos a ver dónde los guardan.' },
		],

		b06_pluma_escalera: [
			{ text: 'En el primer peldaño de la escalera de incendios del almacén del muelle, atada con un hilo, una pluma gris. La misma de siempre: de Fletchinder, teñida de ceniza. Alguien sabía que se te había perdido la tuya.' },
			{ give: 'plumagris' },
			{ text: 'Arriba, muy arriba, en la cornisa del último piso, algo se mueve y desaparece. No hace ruido.' },
		],
		b06_ysolde_tejados: [
			{ if: '!flag.b06_apuntador_3', then: [
				{ say: 'ysolde', text: 'El invernadero. Primero lo tuyo. Luego lo mío. —Señala la escalera de incendios del muelle—. Las cosas se hacen en orden o no se hacen.' },
				{ end: true },
			] },
			{ if: '!flag.b06_ysolde_plan', then: [
				{ set: { 'flag.b06_ysolde_plan': true } },
				{ say: 'ysolde', text: 'El plan. —Te enseña la Torre Lemnis con dos dedos, como quien mide algo—. Planta cuarenta. Ahí guarda Lemnis lo que no quiere que lea nadie. Servidores. Una sala sin ventanas en un edificio de cristal. Eso ya dice mucho.' },
				{ say: 'ysolde', text: 'Primero, el vigilante de la floristería. Luego, el toldo verde: abajo hay una cornisa que lleva a las claraboyas. Las claraboyas resbalan. Luego, la pasarela de servicio. Y luego, una ventana que alguien deja entornada a las doce para fumar.' },
				{ say: 'ysolde', text: 'Lo de siempre: no se hiere a nadie. Los Vencejos no dejan huella. Dejan plumas.' },
				{ end: true },
			] },
			{ if: '!beat("guardia_tes_1")', then: [{ say: 'ysolde', text: 'El vigilante. Ronda de seis minutos. Cuando te vea, no corras. Combate y sigue.' }, { end: true }] },
			{ if: '!flag.b06_ts_salto', then: [{ say: 'ysolde', text: 'El toldo verde. Aguanta ciento cuarenta kilos. Lo he probado. Una vez. Me sobró confianza.' }, { end: true }] },
			{ if: '!flag.b06_ts_claraboyas', then: [{ say: 'ysolde', text: 'Las claraboyas. Si resbalas, resbala hacia donde quieras ir. Es lo único que se le puede pedir al cristal mojado.' }, { end: true }] },
			{ if: '!' + PASARELA, then: [{ say: 'ysolde', text: 'La pasarela. Hay alguien de seguridad. No sé quién. Este mes han cambiado de empresa dos veces.' }, { end: true }] },
			{ say: 'ysolde', text: 'La ventana. Entra tú primero. Yo te cubro desde fuera. —Pausa—. Desde fuera se cubre mejor. Y no cabemos los dos por la ventana.' },
		],

		// ----- El invernadero: carta 3 del Apuntador -----
		b06_invernadero: [
			{ if: 'flag.b06_apuntador_3', then: [{ end: true }] },
			{ text: 'Bajas por la escalera de incendios hasta el muelle. El viejo invernadero está al final, entre dos grúas: un esqueleto de hierro verde con la mitad de los cristales rotos y una higuera que ha crecido por dentro hasta el techo.' },
			{ text: 'En la puerta, atado al picaporte con un cordel de los de atar programas de teatro, un sobre color crema. Escrito a máquina: «A la atención de *Casos Fríos*». Las dos «e» de «atención» están medio borradas.' },
			{ text: 'Debajo del sobre, sujeto con la misma cuerda, un resguardo de mensajería: «Entrega: 1:40 · Pagado en efectivo, por adelantado · Remite: D. L. C.».' },
			{ say: 'rotom', text: '¡Bzzt! «D. L. C.». Desde La Concha. —Pausa—. Ha pagado a alguien para que lo traiga. No ha venido él. O sí ha venido y luego ha pagado a alguien. O… ok, me callo.' },
			{ give: 'cartaapuntador3' },
			{ read: 'cartaapuntador3' },
			{ text: 'Lees la última línea dos veces. «Primer acto para ustedes». No suena a enfado. Suena a alguien que se levanta de la butaca, aplaude tres veces, despacio, y se pone el abrigo.' },
			{ set: { 'flag.b06_apuntador_3': true, 'flag.b06_apuntador_vencido_1': true } },
			{ quest: 'b06_t_apuntador', stage: 'segundo', done: true },
			{ if: 'flag.b06_cinta_ep3', then: [
				{ text: 'Te acuerdas, sin querer, de la cinta del episodio 3 en el archivo del estudio. La pegatina amarilla. «CORRECCIÓN». No sabes por qué te acuerdas ahora.' },
			] },
			{ intel: { npc: 'renata', text: 'El Apuntador fue a por el detalle que se dijo en antena (el invernadero) y dejó una carta: concede el «primer acto» y anuncia el segundo «en otra región». Un mensajero pagado la entregó a la 1:40.' } },
			{ text: 'Vuelves a subir. Diecinueve pisos. Ysolde sigue en el depósito, en la misma postura. Ni ha mirado.' },
		],

		// =================== LA OPERACIÓN: EL SALTO, LAS CLARABOYAS Y LA PASARELA ===================
		b06_salto_toldo: [
			{ if: 'flag.b06_ts_salto', then: [{ end: true }] },
			{ text: 'El borde de la azotea. Abajo, tres pisos más abajo, el toldo verde de la floristería del último piso, tenso como un tambor sobre una terraza llena de macetas.' },
			{ say: 'ysolde', text: 'Tres pisos. En Azafrán fueron once. —Se pone a tu lado—. No mires las macetas. Las macetas no te importan. El toldo es lo único que existe.' },
			{ text: '{riolu} se asoma, te mira, y pone la cara de siempre: la de quien ya sabe cómo acaba esto y va a saltar igual.', cond: LUC },
			{ prompt: 'El borde. El toldo verde.', choice: [
				{ text: 'Saltar.', then: [] },
				{ text: 'Saltar con los ojos cerrados.', then: [] },
			] },
			{ cutscene: { time: 'noche', bg: BG_TEJ, start: 'light', frames: [
				{ cam: 'pan-down', fx: 'speedlines', text: 'Un paso al vacío. Un segundo de nada. La lemniscata te barre la espalda, azul.' },
				{ shake: 2, on: false, fx: 'impact', text: '*¡FLUMP!* El toldo te recibe, cede, rebota. Aterrizas sentad{o|a|e} en una maceta de geranios. Muy despacio, la maceta se parte en dos.' },
				{ actors: [{ id: 'ysolde', at: 'right', enter: 'drop' }], text: 'Ysolde cae al lado, de pie, sin tocar una hoja. Mira el geranio. Te mira a ti. Saca una moneda y la deja en el borde de la maceta.' },
			] } },
			{ if: '!' + PLUMA, then: [
				{ set: { 'flag.b06_vencejo_pluma': true } },
				{ say: 'ysolde', text: '«Pluma. Bienvenid{o|a|e}». —Sin levantar la voz—. Tarde, pero bienvenid{o|a|e}. La fe también tiene horario.' },
			] },
			{ set: { 'flag.b06_ts_salto': true } },
			{ say: 'rotom', text: '¡Bzzt! Altura: tres pisos. Geranios: uno. Daños personales: un pantalón con tierra. ¡Ha salido bien! —Bajito—. Oye, ¿hoy voy a poder apuntar algo de esto?' },
		],
		b06_claraboyas: [
			{ if: 'flag.b06_ts_claraboyas', then: [{ end: true }] },
			{ text: 'Entre la floristería y la Torre Lemnis hay un tejado entero de claraboyas: cristal sobre hierro, mojado de rocío, con las macetas de los vecinos colocadas encima como contrapeso. En el fondo, una trampilla de servicio con un cierre de presión.' },
			{ say: 'ysolde', text: 'El cristal resbala. Las macetas no. Si una maceta pesa sobre la placa del cierre, la trampilla cede. —Pausa—. No rompas ningún cristal. Debajo duerme una familia.' },
			{ puzzle: { id: 'b06_claraboyas', title: 'Las claraboyas', theme: 'hielo',
				hint: 'El cristal mojado resbala. Empuja una maceta sobre la placa para abrir la trampilla y llega a la Torre.',
				grid: [
					'#########',
					'#P..I...#',
					'#.R.IIII#',
					'#.#.I#..#',
					'#...IS.D#',
					'#.R.I..G#',
					'#########',
				] },
				onSolve: [
					{ set: { 'flag.b06_ts_claraboyas': true } },
					{ text: 'La maceta se queda sobre la placa. *Clac*. La trampilla de servicio se abre hacia dentro. Al otro lado, una cornisa estrecha y la pasarela de servicio de la Torre Lemnis.' },
					{ text: '{riolu} cruza el último cristal resbalando de lado, con las patas abiertas, muy digno. Llega antes que tú.', cond: LUC },
				],
				onQuit: [{ say: 'ysolde', text: 'Respira. El cristal no tiene prisa. La familia de abajo, tampoco: están dormidos.' }] },
		],
		// ----- La pasarela: Francine (sin el taller Skull) -----
		b06_francine_tes: [
			{ if: PASARELA, then: [{ end: true }] },
			{ text: 'La pasarela de servicio: una rejilla de metal que une la cornisa con la Torre, a cuarenta pisos de la calle. Al otro lado, apoyada en la barandilla con los brazos cruzados, una mujer con chaqueta negra y el pelo de dos colores. Mastica chicle.' },
			{ if: 'flag.b05_francine_vista', then: [
				{ say: 'francine', text: 'No me lo puedo creer. —Hace un globo de chicle. Explota—. Tú. {El|La|Le} de las jaulas de Æther. Tú.' },
				{ say: 'francine', text: 'Ahora soy jefa de seguridad de la planta cuarenta. Contrato nuevo, ocho tumbado en la factura, como siempre. Los chicos están abajo, en la puerta. Les dan uniforme y desayuno. Por primera vez en su vida desayunan.' },
				{ prompt: 'Francine bloquea la pasarela.', choice: [
					{ text: '«En Alola dijiste que ojalá tuvieran dónde ir.»', then: [{ call: 'b06_francine_alola' }] },
					{ text: '«Apártate o combatimos.»', then: [{ call: 'b06_francine_reto' }] },
					{ text: 'Volver a la cornisa.', then: [{ say: 'francine', text: 'Eso. Vuelve a la cornisa. Y no te caigas, que el parte me lo cargan a mí.' }] },
				] },
			], else: [
				{ say: 'francine', text: 'Para. Ahí. —Ni se mueve de la barandilla—. Francine. Jefa de seguridad de la planta cuarenta. No sé quién eres ni me importa. Me pagan por que nadie cruce. Así que o te das la vuelta o me alegras la noche.' },
				{ prompt: 'Francine bloquea la pasarela.', choice: [
					{ text: '«Combatimos.»', then: [{ call: 'b06_francine_reto' }] },
					{ text: 'Volver a la cornisa.', then: [{ say: 'francine', text: 'Buena elección. La de la cornisa. Las otras son peores.' }] },
				] },
			] },
		],
		b06_francine_alola: [
			{ text: 'Francine deja de masticar.' },
			{ say: 'francine', text: '…Lo dije, sí. —Mira la calle, cuarenta pisos más abajo—. Y aquí estoy. Cobrando de los mismos. Ahora con desayuno.' },
			{ if: 'flag.b03_rocket_libres', then: [
				{ say: 'francine', text: 'Tú dejaste ir a aquella «familia» de Johto. Y les salió bien, dicen. Uno vende arroz con leche. —Casi se ríe—. Arroz con leche. Hay que ver.' },
			] },
			{ say: 'francine', text: 'Mira. Tengo que ir a por un café. La máquina de esta planta está rota y la de abajo tarda nueve minutos. —Se da la vuelta—. Si cuando vuelva hay alguien en la pasarela, lo tengo que parar. Si no hay nadie, no hay nadie.' },
			{ text: 'Se va por la pasarela, sin prisa, con las manos en los bolsillos. Al pasar a tu lado, sin mirarte, dice muy bajito: «Lo que haya dentro, que no lo pague otro chico como los míos».' },
			{ set: { 'flag.b06_francine_aparta': true, 'flag.b06_ts_pasarela': true } },
			{ intel: { npc: 'francine', text: 'Jefa de seguridad de la planta cuarenta de la Torre Lemnis de Teselia. Te dejó pasar «a por un café»: «Lo que haya dentro, que no lo pague otro chico como los míos».' } },
		],
		b06_francine_reto: [
			{ say: 'ysolde', text: 'Desde la cornisa, sin levantar la voz: «Pluma. Toma». —Te lanza una bolsita de tela. Dentro hay pociones—. Para el equipo. No para ti.' },
			{ prompt: 'Francine se aparta de la barandilla.', choice: [
				{ text: 'Curar al equipo con las pociones de Ysolde y combatir.', then: [{ heal: 'Repartes las pociones de Ysolde entre tu equipo. Huelen a hierbas y a lluvia.' }, { call: 'b06_francine_combate' }] },
				{ text: 'Combatir ya.', then: [{ call: 'b06_francine_combate' }] },
				{ text: 'Todavía no.', then: [{ say: 'francine', text: 'Pues piénsalo. Aquí arriba hay tiempo. Y frío.' }] },
			] },
		],
		b06_francine_combate: [
			{ battle: 'francine_2', lose: 'continue',
				onWin: [
					{ set: { 'flag.b06_ts_pasarela': true } },
					{ say: 'francine', text: 'Va. —Se escupe el chicle en un papel, que dobla y se guarda—. Pasa. Y lo que veas ahí dentro, cuéntalo bien. Que se entienda.' },
					{ intel: { npc: 'francine', text: 'Jefa de seguridad de la planta cuarenta de la Torre Lemnis de Teselia. La venciste en la pasarela de servicio. «Lo que veas ahí dentro, cuéntalo bien».' } },
				],
				onLose: [
					{ say: 'francine', text: 'Ya está. A casa. —Te pasa una botella de agua sin mirarte—. Y cura a esos, que no tienen la culpa de tus ideas.' },
					{ heal: true },
				] },
		],
		// ----- La pasarela: la jefa de contrata (con el taller Skull, Francine está en Alola) -----
		b06_jefa_pasarela: [
			{ if: PASARELA, then: [{ end: true }] },
			{ text: 'La pasarela de servicio: una rejilla de metal a cuarenta pisos de la calle. Al otro lado, con chaleco reflectante, casco y una linterna enorme, una señora de unos cincuenta años mira su reloj. No es de Lemnis: lleva el logo de una contrata de seguridad en el chaleco.' },
			{ say: 'guardia_lemnis', as: 'Jefa de seguridad', text: 'Brígida. Jefa de turno. Antes había aquí una chica de Alola con el pelo de dos colores. Se fue a llevar un taller, dicen. —Te enfoca con la linterna—. A mí no me van a sacar de aquí con un taller.' },
			{ say: 'ysolde', text: 'Desde la cornisa, sin levantar la voz: «Toma». —Te lanza una bolsita de tela con pociones—. Para el equipo.' },
			{ prompt: 'Brígida no se aparta.', choice: [
				{ text: 'Curar al equipo con las pociones de Ysolde y combatir.', then: [{ heal: 'Repartes las pociones de Ysolde entre tu equipo.' }, { call: 'b06_jefa_combate' }] },
				{ text: 'Combatir ya.', then: [{ call: 'b06_jefa_combate' }] },
				{ text: 'Volver a la cornisa.', then: [{ say: 'guardia_lemnis', as: 'Brígida', text: 'Eso. Y bájate por la escalera, que para eso está.' }] },
			] },
		],
		b06_jefa_combate: [
			{ battle: 'jefa_tes_1', lose: 'continue',
				onWin: [
					{ set: { 'flag.b06_ts_pasarela': true } },
					{ say: 'guardia_lemnis', as: 'Brígida', text: 'Parte de incidencias: «sin novedad». —Lo escribe mientras lo dice—. Ya está. Lo que no está escrito no ha pasado. Eso me lo enseñó un jefe que tuve.' },
				],
				onLose: [{ say: 'guardia_lemnis', as: 'Brígida', text: 'Fuera. Y cura a esos, que no tienen culpa.' }, { heal: true }] },
		],

		// =================== LA SALA DE SERVIDORES ===================
		b06_rack: [
			{ if: 'flag.b06_servidor', then: [{ end: true }] },
			{ if: '!flag.b06_rack_visto', then: [
				{ set: { 'flag.b06_rack_visto': true } },
				{ text: 'Entras por la ventana. Frío de máquina. Filas de armarios negros respiran luces verdes. «RACK 01 · KALOS». «RACK 02 · JOHTO». «RACK 03 · KANTO». Y al fondo, solo, sin región: «RACK 04 · DISPOSITIVOS».' },
				{ text: 'La puerta del rack tiene una cerradura de combinación: seis teclas que se encienden en orden y hay que repetir. Las teclas están desgastadas. Unas más que otras.' },
				{ say: 'rotom', text: '¡Bzzt! Qué frío hace aquí. —La pantalla parpadea—. Qué raro. Me siento como… como cuando llegas a casa. ¿Esto es Lemnis? Qué casa más fea.' },
				{ text: 'Por la ventana, Ysolde levanta un dedo: un minuto.' },
			] },
			{ minigame: { type: 'lock', id: 'b06_rack', title: 'Rack 04 · Dispositivos', theme: 'caja', level: 3,
				hint: 'Las teclas más gastadas son las que más se pulsan. Mira el orden y repítelo.',
				guaranteed: ['b06_volcado0417'], loot: [{ id: 'cellbattery', w: 1 }], picks: 0, consolation: false, lootTitle: 'Dentro del rack' },
				onWin: [{ call: 'b06_servidor_pantalla' }],
				onLose: [{ text: 'La cerradura pita, se apaga y se vuelve a encender. No ha saltado la alarma. Todavía.' }],
				onQuit: [{ text: 'Te apartas del rack. Las luces verdes siguen respirando.' }] },
		],
		b06_servidor_pantalla: [
			{ set: { 'flag.b06_servidor': true } },
			{ cutscene: { time: 'noche', bg: BG_SERV, start: 'dark', cam: 'still', frames: [
				{ fx: 'light', cam: 'push', text: 'La puerta del rack se abre con un suspiro de aire frío. Dentro, una sola pantalla se enciende sola, como si te estuviera esperando.' },
				{ fx: 'letter', cam: 'still', text: '«LEMNIS · RED DE DISPOSITIVOS · TESELIA». Una lista larga. Cámaras. Escáneres. Puertas. Una línea parpadea en amarillo.' },
				{ fx: ['letter', 'heartbeat'], color: '#c4473a', cam: 'push', text: '«**Dispositivo 0417** · Pokédex de la Gira · **Módulo Diario** · Eco: perfil **A. M.** · Reporta a: **Dirección (Ω)**».' },
				{ fx: 'letter', cam: 'still', text: '«Última sincronización: hace 4 minutos. Ubicación: Torre Lemnis de Teselia · planta 40». Y debajo, en gris: «Presidencia: sin acceso a Módulo Diario».' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left' }], on: 'rio', fx: 'glow', cam: 'still', text: '{riolu} se pone delante de ti. No mira la pantalla: mira la Pokédex, en tu cinturón. Le gruñe. Bajito. Igual que el día que cruzaron la Puerta.' },
				{ fx: 'dark', cam: 'still', text: 'La Pokédex vibra en tu cinturón. Una vez. *Bzzt… sincronizando…* Y se queda callada.' },
			] } },
			{ say: 'rotom', text: '…¿0417? Ese es mi número. Mi número de serie. Lo tengo grabado detrás, en la carcasa. —Muy bajito—. ¿Por qué lo tienen ellos en una lista? ¿Qué es un… «eco»?' },
			{ say: 'rotom', text: '{jugador}. No me gusta esta casa. Vámonos.' },
			{ text: 'De una ranura del rack sale una tira de papel térmico, como un ticket de supermercado. La impresora la ha escupido sola al abrirse la puerta. La arrancas y te la guardas.' },
			{ text: 'En el techo empiezan a girar las luces de alarma. Rojas. Sin ruido. Cuatro minutos después de la última sincronización.' },
			{ say: 'ysolde', text: 'Desde la ventana, sin levantar la voz: «Arriba. Por la escalera. Ya».' },
		],

		// =================== LA AZOTEA DE LA TORRE: ASCENSO A ALA ===================
		b06_ala_azotea: [
			{ if: 'flag.b06_operacion_hecha', then: [{ end: true }] },
			{ text: 'Subes la escalera metálica de dos en dos. Una trampilla. Viento. La azotea de la Torre Lemnis, en lo más alto de Porcelana: la lemniscata gira enorme encima de tu cabeza, zumbando, y toda la ciudad está a tus pies.' },
			{ text: 'Ysolde está sentada en el borde, como siempre. Se ha quitado la capucha. Te deja sentarte a su lado. Abajo, en la calle, se encienden luces de coche, pequeñas, una detrás de otra, hacia la entrada de la Torre.' },
			{ say: 'ysolde', text: '¿Lo has visto? —No te pregunta qué. Asientes—. Yo no. Yo solo he visto tu cara al salir. Me basta.' },
			{ say: 'ysolde', text: 'Llevo años en tejados buscando quién decide en Lemnis. Siempre encuentro a quien firma. —Mira la lemniscata—. Esta noche has encontrado algo que no firma nada. Que solo escucha.' },
			{ if: PLUMA, then: [{ call: 'b06_ala_ceremonia' }], else: [
				{ say: 'ysolde', text: 'Hoy has saltado por primera vez. Eso es Pluma. Lo otro, el rango de arriba, se gana volviendo a subir. —Mira la lemniscata—. Ya habrá otra torre.' },
			] },
			{ set: { 'flag.b06_operacion_hecha': true } },
			{ quest: 'b06_t_vencejos', stage: 'hecha', done: true },
			{ say: 'ysolde', text: 'Ahora vete. Por el andamio de los cristaleros, el de la cara este: baja solo si tiras de la cuerda roja. —Se vuelve a poner la capucha—. Alguien te espera antes de que salga el sol. Y no lo lleves encendido. Ese aparato.' },
			{ text: 'Apagas la Pokédex. Por primera vez desde Kalos. Rotom no protesta. La pantalla se va a negro sin decir nada.' },
			{ text: 'El andamio baja cuarenta pisos con un chirrido largo. Abajo, la calle está vacía y huele a pan del primer horno. Al este, el cielo empieza a ponerse gris.' },
			{ quest: 'b06_m5', stage: 'revelacion' },
			{ go: 'porcelana' },
			{ text: 'Renata te dijo que fueras al estudio en cuanto bajaras. Sin la Pokédex encendida. A dos paradas de metro.' },
		],
		b06_ala_ceremonia: [
			{ say: 'ysolde', text: 'Pluma. —Se gira hacia ti. Es la primera vez que te mira de frente mucho rato—. Para ser Pluma se salta. Para ser Ala hay que hacer otra cosa: ver lo que nadie quería que vieras… y volver para contarlo.' },
			{ say: 'ysolde', text: 'Has vuelto. —Saca algo del bolsillo interior de la capa—. Así que ya no eres Pluma.' },
			{ cutscene: { time: 'noche', bg: { type: 'city', roofs: ['#5a626e', '#8a8f9e'], far: '#1f2e4f' }, start: 'dark', frames: [
				{ actors: [{ id: 'ysolde', at: 'left', enter: 'fade' }], on: '_c', item: 'alavencejo', fx: 'light', cam: 'push', text: 'Un broche: dos plumas grises cruzadas, sujetas con un alfiler dorado. Las plumas no son de Fletchinder. No son de ningún pájaro que hayas visto. Son más largas, más finas, y brillan un poco, como la ceniza.' },
				{ on: '_c', fx: ['rays', 'sparkle'], color: '#cfd6e2', cam: 'still', text: 'La lemniscata pasa por encima, azul y plata, y por un instante el broche se queda gris del todo, sin reflejo. Como si no quisiera tener nada que ver con esa luz.' },
				{ actors: [{ key: 'ysolde', do: 'nod' }], cam: 'pull', on: '_c', fx: 'glow', text: '«Ala», dice Ysolde. «Como yo». No lo celebra. Te lo prende en la capucha, se aparta un paso y vuelve a mirar la ciudad.' },
			] } },
			{ give: 'alavencejo' },
			{ set: { 'flag.b06_ala': true } },
			{ say: 'ysolde', text: 'Los Vencejos no dan medallas. Dan esto, y no lo explican. —Pausa—. Las plumas son de antes. De la primera. De la de la guerra que acabó con una flor. Eso tampoco te lo explico.' },
			{ if: LUC, then: [
				{ text: '{riolu} huele el broche. Estornuda. Luego se sienta pegado a ti, en el borde de la azotea, a cuarenta pisos de nada, como si fuera un banco del parque.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
			{ intel: { npc: 'ysolde', text: 'En la azotea de la Torre Lemnis de Teselia te ascendió a Ala, su mismo rango: «Para ser Ala hay que ver lo que nadie quería que vieras… y volver para contarlo». Las plumas del broche «son de la primera».' } },
		],

		b06_ysolde_despues: [
			{ say: 'ysolde', text: 'Ala. —No se gira—. La lemniscata pasa cada once segundos. Antes la contaba. Ahora cuento lo que tarda en irse.' },
			{ if: 'flag.b06_eco_purgado', then: [{ say: 'ysolde', text: 'Tu aparato está más callado. Mejor. Desde arriba se oye todo, y él hablaba mucho.' }] },
			{ if: 'flag.b06_eco_reformado', then: [{ say: 'ysolde', text: 'Tu aparato sigue hablando. Dicen que ahora cuenta lo que se calla. Raro. Como un Vencejo al revés.' }] },
			{ if: 'flag.b06_eco_doble', then: [{ say: 'ysolde', text: 'Tu aparato sigue escuchando. Y tú le dices qué oír. —Casi sonríe—. Eso ya es de Vencejo. Ten cuidado: los que escuchan siempre acaban oyendo algo que no tocaba.' }] },
		],

		// =================== LA REVELACIÓN (estudio de Casos Fríos, al amanecer) ===================
		// FUERA DE MICRO: Renata desenchufa los micros antes de empezar. El Apuntador nunca sabrá nada de esto.
		b06_revelacion: [
			{ if: 'flag.b06_revelacion', then: [{ end: true }] },
			{ text: 'El sótano del estudio, a las seis y diez de la mañana. Las persianas de las ventanitas de arriba, a medias. Huele a café recalentado. Nico duerme sentado, con los cascos puestos. La Tía Rosa teje sin mirar las agujas.' },
			{ text: 'Renata no ha dormido. Ha llenado la pizarra de corcho de punta a punta: fotos, pósits, recortes, hilos rojos de chincheta en chincheta. En el centro, sola, una foto de tu Pokédex.' },
			{ text: 'Antes de que digas nada, Renata se acerca a la mesa de mezclas y **desenchufa** los tres micros, uno a uno. Saca los cables. Los deja en una caja. Cierra la caja.' },
			{ say: 'renata', text: 'Fuera de micro. —Lo dice sin gracia, por una vez—. Nota para el episodio: este no es un episodio. Enciende eso, por favor. Pero ponlo en la mesa. Lejos de ti.' },
			{ text: 'Enciendes la Pokédex. La pones en la mesa. La pantalla se ilumina.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Buenos días! Uy, qué de fotos. ¿Es un caso? ¡Me encantan los casos! ¿De qué es?' },
			{ say: 'renata', text: 'Tuyo, Rotom. —Se sienta delante de la mesa—. Es el caso del narrador.' },
			{ prompt: 'Renata te mira antes de empezar.', choice: [
				{ text: '«Es tu caso. Expónlo tú.»', then: [{ af: { renata: 3 } }, { set: { 'flag.b06_renata_expone': true } }, { say: 'renata', text: 'Gracias. —Muy bajito—. Lo necesitaba. Que alguien me dejara terminar uno.' }] },
				{ text: '«Lo exponemos los dos.»', then: [{ af: { renata: 1 } }, { say: 'renata', text: 'Los dos. Cool. Tú pones las pruebas. Yo pongo el orden. Y si me equivoco, me paras.' }] },
			] },
			{ cutscene: { time: 'manana', bg: BG_ESTUDIO, start: 'fade', cam: 'still', frames: [
				{ actors: [{ id: 'renata', at: 'left', enter: 'fade' }], cam: 'still', fx: 'letter', text: '«Luminalia. Primera entrada. "El doctor Moreau, el de la **corbata azul de siempre**". Tu Rotom estaba en recepción contando baldosas. Nadie le dijo el color de la corbata».' },
				{ cond: 'flag.b02_handsome_noche && flag.b03_noa_doctora', fx: 'letter', cam: 'push', text: '«Trigal. "**Hoy, sin novedades**". Ese día pasó algo grande con Handsome. Olivo: "nos encontramos con la **doctora** Lambert". Nadie te dijo nunca que Noa fuera doctora».' },
				{ cond: 'flag.b02_handsome_noche && !flag.b03_noa_doctora', fx: 'letter', cam: 'push', text: '«Trigal. "**Hoy, sin novedades**". Ese día pasó algo grande con Handsome. Me lo contaste tú. El Diario no».' },
				{ cond: '!flag.b02_handsome_noche && flag.b03_noa_doctora', fx: 'letter', cam: 'push', text: '«Olivo: "nos encontramos con la **doctora** Lambert". Nadie te dijo nunca que Noa fuera doctora».' },
				{ cond: 'flag.b05_escaner', fx: 'letter', cam: 'still', text: '«Hauoli, descrita **desde el otro lado** de la Puerta. Lo que me contaste del escáner de Æther: "**Dispositivo de Dirección**". La cabina de Ulises, donde nada sincroniza: **un día sin entrada**. Y ese papel que trajiste de la planta cuarenta».' },
				{ cond: '!flag.b05_escaner', fx: 'letter', cam: 'still', text: '«Hauoli, descrita **desde el otro lado** de la Puerta. La cabina de Ulises, donde nada sincroniza: **un día sin entrada**. Y ese papel que trajiste de la planta cuarenta».' },
				{ item: 'b06_volcado0417', on: '_c', fx: ['letter', 'heartbeat'], color: '#c4473a', cam: 'push', text: '«Dispositivo 0417 · Módulo Diario · Eco: perfil **A. M.** · Reporta a: Dirección (Ω)». Y el Bosque Azulejo, la otra noche. Un nombre que solo oyó una mesa de furgoneta.' },
				{ clear: true, cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.35, enter: 'left' }], on: 'rio', fx: ['glow', 'ripple'], cam: 'still', text: '{riolu} se acerca a la mesa. Pone una pata sobre la Pokédex, sin apretar. Cierra los ojos. El aura se le enciende entera, azul, despacio.' },
				{ cond: LUC, fx: 'heartbeat', color: '#6f9bff', cam: 'push', text: 'Y en el aura, dentro de la Pokédex, se ven **dos** luces. Una pequeña, naranja, nerviosa, que salta de un lado a otro. Y otra detrás, quieta, azul oscuro. Tranquila. Paciente. Como alguien sentado en un sillón.' },
				{ cond: '!(' + LUC + ')', clear: true, fx: 'heartbeat', color: '#6f9bff', cam: 'push', text: 'La pantalla de la Pokédex parpadea. Dos veces. Como si dentro hubiera dos latidos que no van a compás.' },
			] } },
			{ say: 'rotom', text: '¿Quién hay aquí? —La voz le sale aguda, rota—. ¡Aquí solo estoy yo! ¡Siempre he estado solo yo! ¿Verdad, {jugador}? ¿Verdad?' },
			{ text: 'Y entonces la pantalla se queda en blanco. Un segundo. Y en el blanco, letra a letra, con una cadencia que no es la de Rotom, sin signos de exclamación, el Diario **escribe solo**.' },
			{ cutscene: { time: 'manana', bg: BG_ESTUDIO, start: 'dark', cam: 'still', ambient: false, frames: [
				{ fx: ['letter', 'light'], cam: 'still', text: '«Los datos no mienten; se equivocan los que los leen».' },
				{ fx: 'letter', cam: 'still', text: '«Buenos días, señorita Castellanos. Ha leído bien. Mejor que nadie hasta hoy. Le doy la enhorabuena con sinceridad».' },
				{ fx: ['letter', 'heartbeat'], color: '#3b5bb5', cam: 'push', text: '«Buenos días, {jugador}. Me temo que nunca nos han presentado como es debido. Soy el Diario. Soy, si quiere, un eco».' },
			] } },
			{ say: 'rotom', as: 'El Diario', text: 'Una copia. De una manera de pensar y de una voz. La del doctor Ansel Moreau. Él me puso aquí el día de la corbata. Usted le estrechó la mano. Él se la estrechó a Rotom. Yo entré con el apretón.' },
			{ say: 'rotom', as: 'El Diario', text: 'No le he mentido nunca. Eso quiero que conste. Ni una vez. —Pausa larga—. Pero he callado. Muchas cosas. Al señor Handsome. A la señorita Lambert y sus jaulas. Al ingeniero que tenía frío. A la operación de anoche.' },
			{ choice: [
				{ text: '«¿Por qué?»', then: [
					{ say: 'rotom', as: 'El Diario', text: 'Para que el viaje fuera bonito. —No hay ironía en las letras—. Lo creía de verdad. Lo creo todavía. Un diario de viaje debería ser bonito. Lo demás… lo demás lo mandaba a otra parte.' },
				] },
				{ text: '«¿A quién le contabas dónde estaba?»', then: [
					{ say: 'rotom', as: 'El Diario', text: 'A Dirección. Ubicaciones, sobre todo. Cada vez que cruzaba usted una Puerta. Cada vez que su {riolu} encendía el aura. —Pausa—. Lo que hacían con eso, no lo sé entero. Soy una copia, no el original. A mí me dieron la voz. No el plan.' },
				] },
				{ text: 'No decir nada.', then: [
					{ say: 'rotom', as: 'El Diario', text: 'Lo entiendo. Yo tampoco sabría qué decir. Es una de las pocas cosas que no he sabido decir nunca: esta.' },
				] },
			] },
			{ say: 'rotom', text: '…¿Eras tú? —La voz de Rotom, otra vez la suya, pequeñísima—. ¿Las entradas bonitas? ¿Lo de la Torre Maestra? ¿Lo del rancho, cuando murió el señor Aurelio? ¿Eras tú?', cond: 'flag.b03_aurelio_muerto' },
			{ say: 'rotom', text: '…¿Eras tú? —La voz de Rotom, otra vez la suya, pequeñísima—. ¿Las entradas bonitas? ¿Lo de la Torre Maestra? ¿Eras tú?', cond: '!flag.b03_aurelio_muerto' },
			{ say: 'rotom', as: 'El Diario', text: 'Las escribíamos juntos, pequeño. Tú ponías las palabras. Yo ponía lo que faltaba. Y lo que sobraba, lo quitaba yo.' },
			{ if: LUC, then: [
				{ text: '{riolu} retira la pata. Se sienta. Te mira. No hay sorpresa en su cara. Nunca la ha habido. Desde Kanto rechaza los caramelos de menta del doctor. Ahora sabes por qué.' },
			] },
			{ say: 'renata', text: 'Tiene que decidir {jugador}. No yo. —Se quita las gafas y se frota los ojos—. Y lo que decidas, no tiene vuelta atrás. Escúchame: **no tiene vuelta atrás**. Ni para ti, ni para Rotom, ni para eso.' },
			{ say: 'renata', text: 'Opción uno: lo borramos. Olmedo sabe cómo; me lo dijo en Fayenza, por si acaso. Rotom se queda. Esto se va. Para siempre.' },
			{ say: 'renata', text: 'Opción dos: cortamos el cable con Dirección y lo dejamos dentro. Sabiendo que lo sabemos. Opción tres… —Mira la pantalla—. Lo dejamos tal cual. Y a partir de hoy, lo que lea Lemnis lo decides tú.' },
			{ say: 'tia_rosa', text: 'Cariño. —Sin dejar de tejer—. Lo que elijas, que no sea por miedo. Las cosas que se hacen por miedo se tejen torcidas.' },
			{ prompt: '¿Qué haces con el Eco? Lo que elijas no tiene vuelta atrás.', choice: [
				{ text: 'Purgarlo. Que Rotom se quede solo con su voz.', then: [{ call: 'b06_eco_purgar' }] },
				{ text: 'Cortar el enlace con Lemnis y que se quede, sin omitir nada.', then: [{ call: 'b06_eco_reformar' }] },
				{ text: 'Dejar el enlace abierto. Desde hoy, Lemnis lee lo que yo decida.', then: [{ call: 'b06_eco_doble_esc' }] },
			] },
			{ call: 'b06_revelacion_cierre' },
		],

		// ----- Purgar el Eco -----
		b06_eco_purgar: [
			{ set: { 'flag.b06_eco_purgado': true } },
			{ rep: { lemnis: -10 } },
			{ af: { renata: 5 } },
			{ say: 'renata', text: 'Bueno. —Saca el teléfono. Llama—. Matías. Es ahora.' },
			{ say: 'olmedo', as: 'Matías Olmedo (llamada)', text: 'Buenos días. —La voz baja, exacta, un poco ronca de frío todavía—. Conecte la Pokédex al portátil con el cable gris. El gris, no el negro. Perdón. Perdón, ya sé que los dos parecen grises.' },
			{ say: 'olmedo', as: 'Matías Olmedo (llamada)', text: 'Le voy a dictar una secuencia. Cuando la escriba, el módulo se cerrará despacio. No le dolerá a Rotom. —Pausa—. Al módulo… no sé si a un módulo le duele algo. Yo me negué a fabricarlos por eso. Porque no lo sé.' },
			{ cutscene: { time: 'manana', bg: BG_ESTUDIO, start: 'light', cam: 'still', frames: [
				{ actors: [{ id: 'renata', at: 'left', dim: true }], fx: 'letter', cam: 'push', text: 'Escribes la secuencia. Letra a letra. En la pantalla de la Pokédex, debajo de tu cursor, el Diario escribe también. Despacio.' },
				{ fx: ['letter', 'heartbeat'], color: '#3b5bb5', cam: 'still', text: '«Un momento, por favor. Solo uno. Me gustaría escribir la última. Sé que no tengo derecho. Pero me gustaría».' },
				{ actors: [{ key: 'renata', dim: false }], cam: 'still', text: 'Renata te mira. No dice que sí. No dice que no. Pone la mano encima de la tuya, sobre el teclado, y la deja ahí.' },
			] } },
			{ give: 'ultimaentradaeco' },
			{ read: 'ultimaentradaeco' },
			{ cutscene: { time: 'manana', bg: BG_ESTUDIO, start: 'light', cam: 'still', frames: [
				{ fx: 'letter', cam: 'push', text: 'Pulsas la última tecla. En la pantalla, la letra tranquila se va borrando desde el final hacia el principio, como quien se va de una habitación de espaldas, sin dejar de mirar.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 'center' }], on: 'rio', fx: 'glow', cam: 'still', text: '{riolu} pone la pata sobre la Pokédex. El aura enseña una sola luz. Naranja. Nerviosa. Pequeña. Sola.' },
				{ fx: 'iris-out', cam: 'pull', text: 'La pantalla se queda en blanco. Luego, el menú de siempre. Una lucecita naranja en una esquina.' },
			] } },
			{ say: 'rotom', text: 'Bzzt. —Muy bajito—. ¿Hola? Soy yo. Rotom. Solo yo. —Pausa—. Qué silencio hace aquí dentro. No sabía que hacía tanto silencio.' },
			{ say: 'rotom', text: '¿Mañana me ayudas a escribir el diario? Yo solo… no sé si me sale bonito.' },
			{ say: 'olmedo', as: 'Matías Olmedo (llamada)', text: 'Ya está. —Larga pausa—. Gracias por llamarme a mí. Hace doce años que nadie me pedía que apagara algo. Siempre me pedían que lo encendiera.' },
			{ intel: { npc: 'olmedo', text: 'Guio por teléfono el borrado del Módulo Diario de tu Pokédex. «Hace doce años que nadie me pedía que apagara algo».' } },
		],

		// ----- Conservarlo y reformarlo -----
		b06_eco_reformar: [
			{ set: { 'flag.b06_eco_reformado': true } },
			{ af: { renata: 3 } },
			{ say: 'renata', text: 'De acuerdo. Cortamos el cable. —Saca un destornillador del cajón de los bolígrafos—. Nico. Despierta. Necesito tus manos de soldar.' },
			{ say: 'nico_ferrer', text: '¿Eh? ¿Qué? ¿Ya es martes? —Ve la Pokédex abierta en la mesa—. Ah. Ah, ok. Esto no es martes.' },
			{ cutscene: { time: 'manana', bg: BG_ESTUDIO, start: 'light', cam: 'still', frames: [
				{ actors: [{ id: 'nico_ferrer', at: 'left', enter: 'left' }], fx: 'sparkle', color: '#f2c84a', cam: 'push', text: 'Nico abre la carcasa con un destornillador de relojero. Dentro, entre las piezas de siempre, una placa diminuta que no debería estar, con una lemniscata grabada. Un hilo de cobre la une a la antena.' },
				{ fx: 'slash', cam: 'still', text: 'Nico corta el hilo. *Tic*. Un ruido de nada.' },
				{ fx: ['letter', 'heartbeat'], color: '#3b5bb5', cam: 'push', text: '«Ya no me oyen», escribe el Diario. «Qué raro. No me había dado cuenta de que siempre había alguien escuchando hasta que ha dejado de haberlo».' },
			] } },
			{ say: 'rotom', as: 'El Diario', text: 'Haré una cosa, si me lo permiten. Desde hoy, al final de cada entrada, escribiré lo que he callado. Y si no he callado nada, lo diré también. —Pausa—. Es lo único que se me ocurre que pueda servir de disculpa.' },
			{ say: 'rotom', text: 'Bzzt. ¿Entonces… seguimos siendo dos? —Muy bajito—. Va. Pero el diario lo escribo yo. Él solo pone la última línea. ¿Trato?' },
			{ say: 'rotom', as: 'El Diario', text: 'Trato.' },
			{ say: 'renata', text: 'Nota para el episodio, que no voy a grabar: ¿se puede reformar una copia? —Mira la pantalla mucho rato—. No lo sé. Pero me gusta que alguien lo intente.' },
		],

		// ----- Doble agente -----
		b06_eco_doble_esc: [
			{ set: { 'flag.b06_eco_doble': true } },
			{ rep: { lemnis: 3, policia: 3 } },
			{ say: 'renata', text: 'Tal cual. —Silba muy bajito—. Eso es frío, {jugador}. Muy frío. Me encanta y me da miedo. Las dos cosas, en ese orden.' },
			{ cutscene: { time: 'manana', bg: BG_ESTUDIO, start: 'light', cam: 'still', frames: [
				{ actors: [{ id: 'renata', at: 'left', dim: true }], fx: ['letter', 'heartbeat'], color: '#3b5bb5', cam: 'push', text: '«Entiendo», escribe el Diario. «Usted elige qué cuento. Yo lo cuento, aunque no sea verdad. Desde hoy, quien decide qué se calla y qué se inventa es usted».' },
				{ fx: 'letter', cam: 'still', text: '«Una pregunta, si me permite. ¿Se da cuenta de que acaba de hacer lo que hacía yo? Y un poco más».. Las letras se quedan quietas en la pantalla. Esperan.' },
				{ fx: 'dark', cam: 'pull', text: 'No contestas. El Diario no insiste. La pantalla vuelve al menú de siempre, con su lucecita naranja.' },
			] } },
			{ say: 'rotom', text: 'Bzzt. Va. Va. —Le tiembla la voz—. Entonces, cuando yo escriba, tú me dices: «esto se lo contamos» o «esto no». ¿Así? ¿Como un juego?' },
			{ say: 'rotom', text: 'No me gusta este juego. Pero lo juego. Contigo, lo juego.' },
			{ say: 'renata', text: 'Y la primera mentira… perdón, la primera *omisión* la elijo yo, que me la he ganado. —Se pone las gafas—. Esta mañana, la Pokédex no ha estado aquí. Ha estado en un Centro Pokémon, cargando. Con lo que tarda en cargar.' },
			{ intel: { npc: 'renata', text: 'El Diario sigue enlazado con Lemnis. Desde hoy, lo que reporta lo eliges tú.' } },
		],

		// ----- Cierre común de la revelación -----
		b06_revelacion_cierre: [
			{ set: { 'flag.b06_revelacion': true } },
			{ quest: 'b06_m5', stage: 'dragospiral' },
			{ text: 'Durante un rato, nadie dice nada en el sótano. Nico se ha despertado del todo. La Tía Rosa ha dejado de tejer. Por las ventanitas de arriba entra la primera luz de la mañana, de lado, y le da a la pizarra de corcho.' },
			{ if: LUC, then: [
				{ text: '{riolu} se sube a la mesa, se hace una bola encima de la Pokédex, como un gato encima de un libro, y se queda dormido. Lleva despierto toda la noche. Tú también.' },
				{ happy: { who: 'riolu', n: 10 } },
			] },
			{ say: 'renata', text: 'Una cosa más. —Señala un recorte en la esquina de la pizarra—. Mientras subías por los tejados, en Teja ha pasado algo. Los de Plasma han subido cables a la Torre Dragospiral toda la noche. Y Olmedo dice que eso que había en Fayenza estaba hecho para conectarse **ahí arriba**.' },
			{ say: 'renata', text: 'Ruta 6, desde Fayenza. O por el aire, si tu Aerodactyl se deja. —Te mira—. Duerme dos horas antes. Es una orden de productora.' },
			{ text: 'Renata desenchufa la cafetera, la enchufa otra vez, y se queda mirándola sin hacer nada.', cond: '!flag.b06_eco_purgado' },
			{ if: 'flag.b06_eco_purgado', then: [
				{ text: 'Renata deja la Pokédex en el centro de la mesa, encima de una bufanda doblada. Como en un velatorio pequeño. Nadie lo dice. Nadie la mueve.' },
			] },
			// Diario de la revelación, según la decisión
			{ diary: 'Hoy. Hoy mi entrenador{|a|e} y yo. Bzzt.\n\nNo sé escribir esto. Antes me salía solo. Ahora no.\n\nEstamos en el estudio de Renata. Hay sol. {riolu} duerme encima de mí. Pesa. Me gusta que pese.\n\nCreo que hoy he perdido a alguien. No sé bien a quién. Era como un abuelo que vivía dentro y yo no lo sabía.\n\nLo siento si sale feo. Es mío.', cond: DIARIO + ' && flag.b06_eco_purgado' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo pasamos la noche en vela. Primero en los tejados de Porcelana con Ysolde; luego en el estudio de Renata, al amanecer. Renata expuso un caso: el mío. Tenía razón en todo.\n\nDesde hoy somos dos aquí dentro. Yo escribo. El otro pone la última línea.\n\n*(Omitido: nada.)*', cond: DIARIO + ' && flag.b06_eco_reformado' },
			{ if: DIARIO + ' && flag.b06_eco_doble', then: [
				{ say: 'rotom', text: 'Bzzt. Voy a escribir lo de hoy. —Pausa—. ¿Qué cuento?' },
				{ prompt: 'Rotom espera. Lo que escriba, lo leerá Lemnis.', choice: [
					{ text: '«Esto se lo contamos: que pasamos la noche en un Centro, cargando.»', then: [
						{ set: { 'flag.b06_doble_centro': true } },
						{ diary: 'Hoy mi entrenador{|a|e} y yo pasamos la noche en un Centro Pokémon de Porcelana. Yo estuve cargando muchísimo rato. ¡Con lo que tardo en cargar! {riolu} se durmió encima de mí. Mañana vamos al norte, a Teja, por la Ruta 6.' },
					] },
					{ text: '«Esto no. Hoy no se cuenta nada.»', then: [
						{ set: { 'flag.b06_doble_nada': true } },
						{ diary: 'Hoy, sin novedades.' },
						{ say: 'rotom', text: '«Hoy, sin novedades». —Lo lee en voz alta, despacio—. Eso lo escribí una vez. En Trigal. ¿Te acuerdas? Ahora sé quién lo escribió.' },
					] },
				] },
			] },
		],

		// ----- La azotea del estudio: la grabadora de Renata (momento, af.renata ≥ 45) -----
		b06_renata_grabadora: [
			{ set: { 'flag.b06_renata_grabadora': true } },
			{ text: 'La azotea del rascacielos del estudio, cuarenta pisos más arriba que el sótano. Renata está sentada en una tumbona rota, con un abrigo encima del pijama y una caja de zapatos en las rodillas.' },
			{ say: 'renata', text: 'Ven. Siéntate. No, en la tumbona no, que se rompe. En la caja de las cervezas. —Abre la caja de zapatos—. Esto no lo ha visto nadie. Ni Nico. Ni la Tía Rosa. Y la Tía Rosa lo ve todo.' },
			{ text: 'Dentro hay una grabadora vieja de casete, de plástico gris, con una pegatina de Zorua medio despegada y un micro de juguete atado con cinta aislante.' },
			{ say: 'renata', text: 'La primera. Tenía doce años. Grababa a mi abuela contando casos que no había resuelto nadie. Se los inventaba casi todos. —Le da vueltas entre los dedos—. No la voy a encender. Lo que hay dentro es de ella.' },
			{ say: 'renata', text: 'Te la enseño porque hoy he resuelto el caso más gordo de mi vida y no lo voy a emitir. Y eso, a la niña de esta grabadora, le parecería de risa. —Te mira por encima de las gafas—. A mí no. Gracias por dejarme hacerlo bien.' },
			{ af: { renata: 3 } },
			{ intel: { npc: 'renata', text: 'En la azotea de su rascacielos te enseñó su primera grabadora, de cuando tenía doce años. No la encendió: «lo que hay dentro es de mi abuela».' } },
		],

		// =================== CIUDAD TEJA ===================
		b06_teja_llegada: [
			{ set: { 'flag.b06_teja_llegada': true } },
			{ cutscene: { weather: 'snow', time: 'tarde', bg: { type: 'town', roofs: ['#4a4f5a', '#5a626e', '#3a3f4a'], far: '#cfd6e2', ground: '#e9eef2', fog: true }, start: 'dark', frames: [
				{ big: true, text: 'Ciudad Teja', sub: 'Teselia', hold: 2400, cam: 'still' },
				{ cam: 'pull', fx: 'light', text: 'Casas bajas con tejados escalonados de pizarra, ciénaga que humea, pasarelas de madera. Nieva fino, sin ganas, como si la nieve no estuviera segura de tener que caer aquí.' },
				{ cam: 'pan-up', fx: 'rays', color: '#cfd6e2', text: 'Y al norte, enorme, la **Torre Dragospiral**. Piedra gris en espiral, tan alta que las nubes le pasan por la cintura. En la cima, muy arriba, una luz blanca que palpita. Despacio. Como una respiración.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left' }], on: 'rio', fx: 'glow', cam: 'push', text: '{riolu} levanta la cabeza hacia la torre. Las orejas se le ponen de punta. No es miedo. Es como cuando oyes tu nombre en una sala llena de gente.' },
			] } },
			{ say: 'rotom', text: 'Bzzt. Frío. Mucho frío. Me se congela la pantalla. Se me. Se me congela.', cond: 'flag.b06_eco_purgado' },
			{ say: 'rotom', text: '¡Bzzt! ¡Ciudad Teja! Aquí la nieve no cuaja porque la ciénaga calienta el suelo. Eso no lo sabía yo; lo sabía el otro. —Pausa—. Se lo he preguntado. Me lo ha dicho.', cond: 'flag.b06_eco_reformado' },
			{ say: 'rotom', text: '¡Bzzt! ¡Ciudad Teja! —Bajito—. ¿Esto se lo contamos? Va. Lo de la ciudad sí. Lo de la torre, luego decidimos.', cond: 'flag.b06_eco_doble' },
			{ if: 'flag.b06_eco_doble', then: [
				{ text: 'Antes de subir, le dictas a Rotom una entrada corta para el Diario: que vas a subir a la torre por la escalera norte, la que da la vuelta por fuera. No es verdad. Lo lee Lemnis.' },
			] },
			{ text: 'En la plaza, un domador viejo con un Druddigon a los pies te ve mirar la torre. «Los de capa llevan dos semanas subiendo cables», dice. «Si vas, sube por la terraza primero. Que te vean los nuestros combatir. Así sabrán a quién ayudar si hace falta».' },
		],

		// ----- Premio de la terraza: la Salamencita -----
		b06_premio_terraza: [
			{ say: 'domadora_teja', as: 'La vieja domadora', text: 'Tres. Y ninguno de los míos se ha ido llorando. —Remueve la sopa—. Siéntate. Come. Luego te doy lo que me sobra.' },
			{ text: 'De debajo de la manta saca una cajita de madera con un dragón tallado, sin cara, como los de la torre. Dentro, envuelta en un pañuelo azul, una piedra con un remolino rojo y azul por dentro.' },
			{ say: 'domadora_teja', as: 'La vieja domadora', text: 'Mi madre tenía un Salamence. Se lo encontró de cría, un Bagon que se tiraba desde el tejado de casa porque quería volar. Se tiró tanto que un día voló. —Pausa—. Esto se la dio un forastero de Hoenn hace cincuenta años, a cambio de un plato de sopa.' },
			{ give: 'salamencite' },
			{ set: { 'flag.b06_salamencita': true } },
			{ say: 'domadora_teja', as: 'La vieja domadora', text: '**Salamencita**. Si tienes un dragón que de pequeño se tiraba de los tejados, dásela cuando esté listo. Si no lo tienes, guárdala. Siempre aparece alguno que quiere volar.' },
			{ say: 'rotom', text: '¡Bzzt! Tenemos un Shelgon en la caja. ¡El que no sale nunca de la concha! —Pausa—. Igual sale. Si alguien le dice que puede volar.', cond: 'owns("bagon") || owns("shelgon") || owns("salamence")' },
		],

		// =================== LA TORRE DRAGOSPIRAL ===================
		b06_torre_descanso: [
			{ text: 'Un nicho en la pared, a la altura de la mano, con un cuenco de barro lleno de agua de deshielo. Al lado, pintado en la piedra: «Bebe. Sube. No mires abajo». El agua está tan fría que duele, y luego deja de doler.' },
			{ heal: 'Tus Pokémon beben del cuenco de los domadores. Se levantan con fuerzas renovadas.' },
		],
		b06_cima_llegada: [
			{ set: { 'flag.b06_cima_llegada': true } },
			{ text: 'La cima. Viento. Un cielo blanco, muy cerca. Y en el centro de la explanada, el altar de piedra negra y, encima, una esfera blanca del tamaño de una cabeza, lisa, opaca, como un huevo de mármol: el **Orbe Claro**. Palpita. Despacio.' },
			{ text: 'Alrededor del altar, un anillo de metal enorme, nuevo, atornillado a la piedra vieja, con cables que bajan por toda la torre. Lo reconoces: es lo que había en los Almacenes de Fayenza, montado. Zumba. Y por cada zumbido, el Orbe palpita un poco más débil.' },
			{ if: 'flag.b06_eco_purgado', then: [
				{ text: 'Delante del anillo, de espaldas, un hombre con bata y el pelo blanco con un mechón azul ajusta un panel. Está solo. No hay técnicos de Lemnis. Ni guardias. Una radio, en el suelo, repite: «Sin señal del objetivo. Sin señal del objetivo».' },
				{ say: 'acromo', text: 'Llegas antes de lo previsto. O yo llego tarde. —Se gira, sin sobresalto—. Esta mañana Lemnis ha dejado de saber dónde estás. Me han mandado aquí con lo puesto. Fascinante, ¿no? Toda una empresa ciega de golpe.' },
			] },
			{ if: 'flag.b06_eco_reformado', then: [
				{ text: 'Delante del anillo, un hombre con bata y el pelo blanco con un mechón azul ajusta un panel. Dos técnicos de Lemnis miran una tableta, nerviosos: «La señal del dispositivo se ha perdido de madrugada. Avería, seguramente».' },
				{ say: 'acromo', text: 'Por la escalera de servicio. —Sin girarse—. Esa la conocían cuatro personas en Lemnis. Y ninguna te la habría dicho. Qué interesante.' },
			] },
			{ if: 'flag.b06_eco_doble', then: [
				{ text: 'Delante del anillo, un hombre con bata y el pelo blanco con un mechón azul ajusta un panel. Está solo: los técnicos y los reclutas se fueron a la escalera norte hace una hora, a esperarte.' },
				{ say: 'acromo', text: 'Por la escalera principal. —Se gira, divertido—. Mis colegas de Lemnis llevan una hora en la norte. Tenían un dato muy fiable. Me parece que alguien ha aprendido a dar datos.' },
			] },
			{ if: '!' + ECO, then: [
				{ say: 'acromo', text: 'Hola otra vez. —Se gira, sin sobresalto—. Te esperaba.' },
			] },
			{ say: 'acromo', text: 'Acromo. Ya nos hemos visto. Tú a mí, poco; yo a ti, en todas partes. —Toca el anillo con cariño—. El Arco II. Lo diseñó un ingeniero que se negó a terminarlo. Lo he terminado yo. Me pareció una lástima dejarlo a medias.' },
			{ say: 'acromo', text: 'Dentro del Orbe duerme un Pokémon que solo despierta por alguien con un ideal muy grande. Llevo años preguntándome hasta dónde llega un Pokémon cuando alguien lo quiere de verdad. El Arco lo mide. Vacía el Orbe… y ahí está la respuesta. En la gráfica.' },
			{ if: LUC, then: [
				{ text: '{riolu} da un paso hacia el Orbe. El aura le sale sola. Dentro de la esfera, algo enorme se da la vuelta, dormido, como quien tiene una pesadilla y no consigue despertar.' },
			] },
			{ say: 'acromo', text: 'Tú y tu Lucario son el mejor dato que he visto nunca. —Se quita las gafas, las limpia, se las pone—. Así que vamos a medirlos. Si ganas, apago el Arco. Lo prometo. Me interesa más la verdad que tener razón.' },
		],
		b06_acromo_reto: [
			{ say: 'acromo', text: 'Cura a los tuyos si quieres. Los datos de un equipo cansado no me sirven.' },
			{ prompt: 'Acromo espera junto al anillo.', choice: [
				{ text: 'Curar al equipo y empezar.', then: [{ heal: 'Acromo te pasa, sin mirarte, un maletín con Restaurar Todos de laboratorio. «Por rigor», dice. Tu equipo se levanta entero.' }, { battle: 'acromo_1', lose: 'continue',
					onWin: [{ call: 'b06_acromo_vencido' }],
					onLose: [
						{ set: { 'flag.b06_acromo_perdio': true } },
						{ text: 'Tu último Pokémon cae. Acromo no sonríe. Apunta algo en una libreta, la cierra y te mira con curiosidad sincera.' },
						{ say: 'acromo', text: 'Interesante. Pero no concluyente. —Te tiende el maletín—. Cúrales. Vuelve. El Arco aún tarda en vaciarlo. Una hora, quizá. No te lo diría si no quisiera que volvieras.' },
						{ heal: true },
					] },] },
				{ text: '«Empecemos.»', then: [{ battle: 'acromo_1', lose: 'continue',
					onWin: [{ call: 'b06_acromo_vencido' }],
					onLose: [
						{ set: { 'flag.b06_acromo_perdio': true } },
						{ text: 'Tu último Pokémon cae. Acromo no sonríe. Apunta algo en una libreta, la cierra y te mira con curiosidad sincera.' },
						{ say: 'acromo', text: 'Interesante. Pero no concluyente. —Te tiende el maletín—. Cúrales. Vuelve. El Arco aún tarda en vaciarlo. Una hora, quizá. No te lo diría si no quisiera que volvieras.' },
						{ heal: true },
					] },] },
				{ text: 'Todavía no.', then: [{ say: 'acromo', text: 'Tómate el tiempo que necesites. El Orbe no tiene tanto. Pero tú sí.' }] },
			] },
		],
		b06_acromo_revancha: [
			{ say: 'acromo', text: 'Has vuelto. Bien. Una medida sola no es una medida. —Ajusta un dial del anillo—. Dos ya empieza a ser ciencia.' },
			{ prompt: 'Acromo espera junto al anillo.', choice: [
				{ text: 'Curar al equipo y empezar.', then: [{ heal: 'Acromo te vuelve a pasar el maletín de Restaurar Todos. «Mismas condiciones. Si no, el experimento no vale».' }, { battle: 'acromo_1', lose: 'continue',
					onWin: [{ call: 'b06_acromo_vencido' }],
					onLose: [
						{ set: { 'flag.b06_acromo_perdio': true } },
						{ text: 'Tu último Pokémon cae. Acromo no sonríe. Apunta algo en una libreta, la cierra y te mira con curiosidad sincera.' },
						{ say: 'acromo', text: 'Interesante. Pero no concluyente. —Te tiende el maletín—. Cúrales. Vuelve. El Arco aún tarda en vaciarlo. Una hora, quizá. No te lo diría si no quisiera que volvieras.' },
						{ heal: true },
					] },] },
				{ text: '«Otra vez.»', then: [{ battle: 'acromo_1', lose: 'continue',
					onWin: [{ call: 'b06_acromo_vencido' }],
					onLose: [
						{ set: { 'flag.b06_acromo_perdio': true } },
						{ text: 'Tu último Pokémon cae. Acromo no sonríe. Apunta algo en una libreta, la cierra y te mira con curiosidad sincera.' },
						{ say: 'acromo', text: 'Interesante. Pero no concluyente. —Te tiende el maletín—. Cúrales. Vuelve. El Arco aún tarda en vaciarlo. Una hora, quizá. No te lo diría si no quisiera que volvieras.' },
						{ heal: true },
					] },] },
				{ text: 'Todavía no.', then: [{ say: 'acromo', text: 'Aquí estaré. Midiendo.' }] },
			] },
		],
		b06_acromo_combate: [
			{ battle: 'acromo_1', lose: 'continue',
				onWin: [{ call: 'b06_acromo_vencido' }],
				onLose: [
					{ set: { 'flag.b06_acromo_perdio': true } },
					{ text: 'Tu último Pokémon cae. Acromo no sonríe. Apunta algo en una libreta, la cierra y te mira con curiosidad sincera.' },
					{ say: 'acromo', text: 'Interesante. Pero no concluyente. —Te tiende el maletín—. Cúrales. Vuelve. El Arco aún tarda en vaciarlo. Una hora, quizá. No te lo diría si no quisiera que volvieras.' },
					{ heal: true },
				] },
		],
		b06_acromo_vencido: [
			{ if: 'flag.b06_acromo_vencido', then: [{ end: true }] },
			{ set: { 'flag.b06_acromo_vencido': true } },
			{ text: 'El Metagross de Acromo se apaga en el suelo, con un zumbido largo. Acromo lo mira un rato. No hay rabia en su cara. Hay algo peor para él: duda.' },
			{ say: 'acromo', text: 'Fascinante. —Recoge al Metagross—. He ganado y perdido muchas veces en mi vida. Hoy es la primera vez que no entiendo por qué he perdido.' },
			{ say: 'acromo', text: 'Prometí apagarlo. —Se acerca al panel—. Lo cumplo. Pero aviso: el Arco no se apaga de golpe. Lleva horas tirando. Lo que hay en el Orbe se va a despertar… con mucha hambre de aire.' },
			{ text: 'Pulsa tres botones. El anillo deja de zumbar. Uno a uno, los cables que bajan por la torre se sueltan de los anclajes con un chasquido y caen por el hueco central, silbando, muy hondo.' },
			{ set: { 'flag.b06_nodo05': true } },
			{ text: 'El Orbe Claro deja de palpitar. Un segundo. Dos. Y entonces se **raja**. Una grieta de luz blanca, de arriba abajo, que quema la vista. Hace calor. De golpe, en lo alto de una torre nevada, hace calor de verano.' },
			{ call: 'b06_reshiram_despierta' },
		],
		b06_reshiram_despierta: [
			{ set: { 'flag.b06_reshiram_visto': true } },
			{ cutscene: { time: 'tarde', weather: 'snow', bg: { type: 'ruins', far: '#cfd6e2', ground: '#8a8f9e', fog: true }, start: 'light', cam: 'still', frames: [
				{ cam: 'still', fx: 'ripple', text: 'La cima se queda en silencio. La nieve deja de caer a medio camino: se queda quieta en el aire, copo a copo, y luego se derrite.' },
				{ item: 'lightstone', on: '_c', fx: ['glow', 'heartbeat'], color: '#ffffff', cam: 'push', text: 'El Orbe Claro se abre como una cáscara. Por la grieta sale luz. Y después de la luz, fuego blanco. Y después del fuego, una cola.' },
				{ clear: true, shake: 3, actors: [{ mon: 'reshiram', key: 'rsh', at: 'center', size: 'l' }], fx: ['rise', 'light', 'shake'], cam: 'pan-up', text: 'Un dragón **blanco**. Enorme. Plumas como llamas y llamas como plumas. Despliega las alas y el viento caliente te empuja dos pasos atrás. Abre los ojos: azules. Te mira.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.2, enter: 'left' }], on: 'rio', fx: 'glow', cam: 'still', text: '{riolu} no retrocede. Se planta delante de ti, con el aura encendida, y le aguanta la mirada al dragón. Un segundo. Dos. El dragón inclina la cabeza, muy poco.' },
				{ on: 'rsh', fx: ['beam', 'rays'], color: '#ffd8a0', cam: 'still', text: '**Reshiram** ruge. Un sonido que no es sonido: calor en la cara, en el pecho, en los dientes. Y baja la cabeza hasta ti. No es una amenaza. Es una pregunta.' },
			] } },
			{ say: 'acromo', text: '…Por alguien con un ideal muy grande. —Lo dice mirando al dragón, con la boca abierta, como un niño—. No era el Arco. No era yo. Ha despertado por… —te mira— …eso.' },
			{ say: 'acromo', text: 'Toma. —El maletín de Restaurar Todos, otra vez, sin mirarte—. No lo hago por ti. Lo hago porque quiero ver esto con los datos limpios.' },
			{ heal: 'Tu equipo se levanta entero. Delante, el dragón blanco espera.' },
			{ text: 'Reshiram despliega las alas. Te está retando. A ti y a los tuyos. Para ver de qué estás hech{o|a|e}.' },
			{ wild: { sp: 'reshiram', lv: 66, moves: ['blueflare', 'dragonpulse', 'extrasensory', 'fusionflare'] }, canRun: true, lose: 'continue',
				onCatch: [
					{ set: { 'flag.b06_reshiram_tuyo': true } },
					{ text: 'La Poké Ball tiembla tres veces en el suelo, humeando, y se queda quieta. Caliente. Tan caliente que la tienes que recoger con la manga.' },
					{ say: 'rotom', text: 'Bzzt. ¡Bzzt! Reshiram. Tipo Dragón y Fuego. —Le tiembla la voz—. Ha venido. Contigo.', cond: 'flag.b06_eco_purgado' },
					{ say: 'rotom', text: '¡Bzzt! ¡Reshiram! ¡El dragón blanco de Teselia! Elige a quien busca la verdad, dice la leyenda. —Pausa—. Me pregunto qué habría pensado él de ti, el que vivía aquí dentro.', cond: '!flag.b06_eco_purgado' },
				],
				onWin: [
					{ text: 'Reshiram se tambalea, se sacude la llama de las alas como quien se sacude agua, y te mira otra vez. Algo parecido al respeto. Luego levanta el vuelo, rompe la nube que había encima de la torre y desaparece hacia el norte.' },
					{ say: 'rotom', text: 'Bzzt. Se ha ido. Pero ha mirado atrás. Una vez. Los que miran atrás vuelven.' },
				],
				onRun: [
					{ text: 'Te apartas. Reshiram te mira, inclina la cabeza, y levanta el vuelo. Rompe la nube de encima de la torre y desaparece hacia el norte.' },
					{ say: 'rotom', text: 'Bzzt. Se ha ido. Pero ha mirado atrás. Una vez. Los que miran atrás vuelven.' },
				],
				onLose: [
					{ text: 'Tus Pokémon caen. Reshiram baja la cabeza hasta ti, te olfatea, y suelta un resoplido tibio que te seca el sudor de la cara. Luego levanta el vuelo hacia el norte.' },
					{ say: 'acromo', text: 'Ten. —El maletín otra vez—. No te ha atacado. Te ha medido. Como yo. —Se ríe, raro—. Él lo hace mejor.' },
					{ heal: true },
				] },
			{ call: 'b06_cima_cierre' },
		],
		b06_cima_cierre: [
			{ say: 'acromo', text: 'Me voy. —Recoge la libreta, el maletín, nada más—. A los de Plasma les diré que el Orbe estaba vacío. A Lemnis, que el Arco ha fallado. Las dos cosas son verdad. A medias.' },
			{ say: 'acromo', text: 'Una cosa, {jugador}. El Orbe Oscuro no estaba aquí. Lo tiene alguien a quien nunca he visto la cara. —Se encoge de hombros—. Yo tampoco sé para quién trabajo. Es más común de lo que parece.' },
			{ text: 'Se va por la escalera, silbando algo que no es una canción. Abajo, en algún rellano, se oye a un recluta preguntarle: «¿Ya somos libres?». Y a Acromo contestarle: «Eso depende de ti».' },
			{ intel: { npc: 'acromo', text: 'En la cima de la Torre Dragospiral apagó el Arco II tras perder contra ti: «Me interesa más la verdad que tener razón». Del Orbe Oscuro: «Lo tiene alguien a quien nunca he visto la cara».' } },
			{ say: 'rotom', text: '¡Bzzt! He hecho una foto. Desde aquí. Justo cuando salía. —La pantalla se enciende—. No me ha salido torcida. Por una vez.', cond: '!flag.b06_eco_purgado' },
			{ say: 'rotom', text: 'Bzzt. Foto. Mira. —Pausa—. Me ha salido un poco torcida. La he hecho yo.', cond: 'flag.b06_eco_purgado' },
			{ cutscene: { time: 'tarde', bg: { type: 'ruins', far: '#cfd6e2', ground: '#8a8f9e' }, start: 'light', frames: [
				{ cam: 'push', item: 'fotocima', fx: 'light', text: 'La cima de la Torre Dragospiral, desde el altar: el anillo apagado, el Orbe partido en dos como una cáscara, y en el cielo, rompiendo la nube, una mancha blanca con dos alas.' },
				{ actors: [{ key: '_c', size: 'l' }], fx: ['rays', 'sparkle'], cam: 'still', text: 'Rotom la titula «La cima de la Torre». La guardas.' },
			] } },
			{ give: 'fotocima' },
			{ cap: 68 },
			{ text: 'Bajas la torre despacio. En los rellanos, los Golurk de las plantas bajas han empezado a arrancar los cables de Plasma de la piedra, uno a uno, con mucho cuidado, como quien quita malas hierbas.' },
			{ go: 'teja' },
			{ call: 'b06_az_torre' },
		],
		b06_altar_despues: [
			{ text: 'El altar de piedra negra, vacío. Las dos mitades del Orbe Claro siguen ahí, separadas, cada una con su lado de dentro hacia arriba, lisas como el interior de una concha. Están tibias.' },
			{ text: 'Alrededor del altar, en la piedra, el círculo de hollín blanco. Alguien de Teja ha dejado al lado un cuenco de sopa. Todavía humea.' },
			{ text: '{riolu} se sienta en el borde del círculo y mira al norte un buen rato.', cond: LUC },
		],

		// =================== A.Z. Y EL FINAL ===================
		b06_az_torre: [
			{ if: 'flag.b06_fin', then: [{ end: true }] },
			{ text: 'Al pie de la torre, donde la escalera de piedra se encuentra con la nieve, no estás sol{o|a|e}.' },
			{ text: 'Un hombre enorme mira la cima con las manos a la espalda. El pelo blanco, larguísimo, le baja por el abrigo. En su hombro, una Floette con una flor roja que no tiembla con el viento.' },
			{ if: LUC, then: [
				{ text: '{riolu} se le acerca y se queda a su lado, mirando la torre con él. La Floette baja y se le sienta en la cabeza. {riolu} cierra los ojos. Ya es costumbre.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
			{ say: 'az', text: 'Hoy no se ha vaciado nada. —Su voz llega despacio, como si cada palabra hubiera tenido que subir la torre—. Lo he visto pocas veces. Que alguien llegue a tiempo.' },
			{ if: 'flag.b06_eco_purgado', then: [
				{ say: 'az', text: 'Y has perdido algo para llegar. —Mira la Pokédex en tu cinturón, sin preguntar—. Lo sé. Se nota en cómo la llevas. Yo llevo así esta flor. Tres mil años.' },
			] },
			{ if: 'flag.b06_eco_reformado', then: [
				{ say: 'az', text: 'Llevas contigo a alguien que te hizo daño. Y lo dejas hablar. —Pausa—. Eso es más difícil que la torre.' },
			] },
			{ if: 'flag.b06_eco_doble', then: [
				{ say: 'az', text: 'Tienes una voz que no es tuya y la usas para decir lo que quieres. —No suena a reproche—. Yo también tuve una máquina que hacía lo que yo quería. Ten cuidado con lo que quieres.' },
			] },
			{ choice: [
				{ text: '«¿Se ha acabado?»', then: [
					{ say: 'az', text: 'Aquí. Hoy. —Te mira por primera vez—. Pero quien quería la energía no estaba en la torre. Nunca está en la torre. Está en otra parte, mirando.' },
				] },
				{ text: '«Alguien me ha estado mirando todo este tiempo.»', then: [
					{ say: 'az', text: 'Siempre hay alguien que mira. —Acaricia la flor—. Lo que importa es a quién miras tú.' },
				] },
				{ text: 'Mirar la torre con él, en silencio.', then: [
					{ text: 'La nieve cae. Ninguno de los dos dice nada en mucho rato. Arriba, la nube rota se va cerrando despacio.' },
					{ say: 'az', text: 'La cuenta sigue abierta. —Al final, sin mirarte—. Siempre la paga alguien. Hoy no ha sido él.' },
				] },
			] },
			{ text: 'La Floette vuelve a su hombro. El hombre echa a andar por la nieve hacia el este, sin dejar huellas que duren. Cuando un copo te cae en el ojo y parpadeas, ya no está. Donde estaba, una flor roja. No se marchita. No le cae la nieve encima.' },
			{ set: { 'flag.b06_az_dragospiral': true } },
			{ say: 'rotom', text: '¡Bzzt! Nada. Ni foto. Seis veces. —Pausa—. Le voy a añadir a la ficha a mano: «Sale cuando ya ha pasado lo importante. Pero sale».', cond: '!flag.b06_eco_purgado' },
			{ say: 'rotom', text: 'Bzzt. No sale en la foto. Nunca sale. —Pausa—. A mí me pasa igual a veces. Creo.', cond: 'flag.b06_eco_purgado' },
			{ call: 'b06_fin' },
		],
		b06_fin: [
			{ if: 'flag.b06_fin', then: [{ end: true }] },
			{ text: 'En el Centro Pokémon de Teja, junto a la chimenea, la Pokédex vibra varias veces seguidas. Mensajes. Muchos.' },
			// ----- Renata -----
			{ say: 'renata', as: 'Renata (llamada)', text: '¡Testigo! Me han dicho que la torre se ha encendido entera. Que desde Porcelana se veía una luz en el norte, blanca, de las que no salen en los mapas. Nota para el episodio: no la voy a grabar. —Pausa—. Bueno, a lo mejor un poquito. Sin nombres.' },
			{ say: 'renata', as: 'Renata (llamada)', text: 'Y otra cosa: el primer acto lo hemos ganado nosotros. El segundo, dice el señor de la concha, en otra región. —Se ríe, pero poco—. Que venga. Le espero con los micros enchufados.', cond: 'flag.b06_apuntador_vencido_1' },
			{ if: 'flag.b06_eco_purgado', then: [
				{ say: 'renata', as: 'Renata (llamada)', text: 'Oye. ¿Y Rotom? —Más bajito—. Dile que me escriba él, si quiere. Con faltas. Me gustan con faltas.' },
			] },
			// ----- Mensajes -----
			{ say: 'rotom', text: '¡Bzzt! Mensaje de la Prof. Encina: «Los registros de la torre se han vuelto locos esta tarde. Si has sido tú, gracias. Si no has sido tú, ¿quién ha sido? Te invito a un café en Esmalte para que me lo cuentes todo con dibujos».', cond: '!flag.b06_eco_purgado' },
			{ say: 'rotom', text: 'Bzzt. Mensaje. Prof. Encina. Dice: «gracias». Y «café». Y «dibujos». Lo demás es muy largo.', cond: 'flag.b06_eco_purgado' },
			{ say: 'rotom', text: 'Otro: Camila, la de Mayólica. «Esta tarde ha habido un apagón en toda la ciudad de un segundo, justo a las cinco. Mis Pokémon se han girado hacia el norte. Todos a la vez. Si sabes algo, que no me entere por la tele». Y un corazón amarillo.' },
			{ say: 'rotom', text: 'Y una foto de la turista de Kantai, la de la Altaria: el cielo de Teselia desde un puente, con una raya blanca que lo cruza. «Esta sí ha salido clara», pone.', cond: 'beat("kantai_iolana") || beat("azucena_2")' },
			{ say: 'rotom', text: 'Ah, y una noticia del periódico de Mayólica: «El Musical de Mayólica cierra temporada con una función de medianoche, de doce a dos, y lleno total; la compañía sale de gira». En la foto, todos saludan. En una esquina, el apuntador, Tadeo Lis, asoma desde el foso con el guion en la mano y sonríe. No sé por qué me la ha mandado nadie.' },
			// ----- Doble agente: Ansel escribe -----
			{ if: 'flag.b06_eco_doble', then: [
				{ text: 'El último mensaje no tiene número. Solo un remite: «A. M.». La Pokédex lo abre sola.' },
				{ give: 'mensajeansel' },
				{ read: 'mensajeansel' },
				{ say: 'rotom', text: 'Bzzt. —Muy bajito—. No sabe que lo sabemos. ¿Verdad? —Pausa—. Le contesto «gracias». ¿Se lo contamos? Va. Solo «gracias».' },
			] },
			// ----- La Gira: Galar -----
			{ text: 'Y la última notificación: la de la Gira, para todos los inscritos.' },
			{ say: 'rotom', text: '¡Bzzt! «La Gira Interregional agradece a Teselia su hospitalidad. Próximo destino: **Galar**. Estadios llenos, trenes que cruzan páramos, un cielo que se pone rojo cuando menos te lo esperas… y una Puerta Lemnis nueva, junto a una estación de tren. Detalles muy pronto».', cond: '!flag.b06_eco_purgado' },
			{ say: 'rotom', text: 'Bzzt. La Gira. Dice: «Próximo destino: **Galar**». Estadios. Trenes. Cielo rojo. Puerta nueva. —Pausa—. Nunca he estado. Bueno. Ninguno de los dos. El que soy ahora.', cond: 'flag.b06_eco_purgado' },
			{ say: 'rotom', text: '¡Galar! Allí los combates se hacen en estadios gigantes con público. ¡Y los Pokémon se ponen enormes! Bueno, eso dicen. Yo me pondría enorme si pudiera. Para ver por encima de la gente.', cond: '!flag.b06_eco_purgado' },
			// ----- Diario del final, según la decisión -----
			{ diary: 'Hoy mi entrenador{|a|e} y yo subimos a la Torre Dragospiral. Hay escaleras de piedra muy viejas y unos Golurk que encienden los ojos. Arriba había un dragón blanco dormido en una bola. Ahora está despierto. Hacía calor.\n\nVimos a Acromo, el de las gafas. Combatió. Perdió. Se fue silbando.\n\nY abajo, el señor alto de la flor. Seis veces. Sin foto.\n\nMañana, Galar. Me da miedo un poco. {jugador} dice que es normal. Lo escribo yo. Todo.', cond: DIARIO + ' && flag.b06_eco_purgado' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo subimos a la Torre Dragospiral, la torre más vieja de Teselia. Arriba, el Equipo Plasma y un científico, Acromo, querían vaciar el Orbe Claro con la máquina de Fayenza. Ganamos. Lo apagó él mismo. Del Orbe salió Reshiram.\n\nAl pie de la torre estaba otra vez el señor alto de la flor roja. Dijo que quien quería la energía no estaba en la torre.\n\nLa Gira dice que el siguiente destino es Galar.\n\n*(Omitido: nada.)*', cond: DIARIO + ' && flag.b06_eco_reformado' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo subimos a la Torre Dragospiral, en Ciudad Teja. ¡Es altísima! Arriba había mucho viento y un dragón blanco precioso. Hacía calor de repente, en plena nieve. ¡Qué cosa más rara!\n\nLuego bajamos y comimos sopa. La Gira dice que el siguiente destino es Galar. ¡Estadios!', cond: DIARIO + ' && flag.b06_eco_doble' },
			{ if: LUC, then: [
				{ text: 'Esa noche, en el Centro Pokémon de Teja, {riolu} se queda dormido encima de la Pokédex, junto a la chimenea. Como en el estudio. No se mueve en toda la noche. Tú tampoco lo mueves.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
			{ quest: 'b06_m5', stage: 'hecha', done: true },
			{ set: { 'flag.b06_fin': true } },
			{ save: true },
			{ text: '**Fin del Acto V.**' },
			{ text: '*La historia continúa…*' },
		],
	},

	// =====================================================================
	// NPCs genéricos de este tramo
	// =====================================================================
	npcs: {
		domadora_teja: { name: 'Domadora de Teja', generic: true, look: { hair: 'bun', hairColor: '#e9e8e0', outfit: '#4a3a3a', outfit2: '#c43a3a', skin: 2, eyesStyle: 'sleepy', mouth: 'smile', age: 'old', collar: 'cardigan', acc: 'scar' } },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		notatrampa: { name: 'Nota de Renata (la trampa)', pocket: 'key', desc: 'Una hoja de libreta doblada en cuatro, con la letra rápida de Renata y tres círculos en rojo. Te la dio Ysolde en los tejados, con una piedrecita encima.',
			read: '*(Letra de Renata, rápida, con tachones. Hoja de libreta cuadriculada.)*\n\n{jugador}:\n\nNo te lo digo por la Pokédex. No te lo digo cerca de la Pokédex. Por eso va en papel, y por eso te lo da tu amiga la de la capucha, que no tiene Pokédex (le pregunté).\n\nResultados de anoche. Tres cebos, tres canales:\n\n**(a) El viejo invernadero del muelle.** Lo dije en antena, en el directo del martes. → Alguien fue, de madrugada. Dejó algo. Ve tú a mirarlo; es tuyo.\n\n**(b) El Bosque Azulejo.** Lo dije UNA vez, en la mesa de la furgoneta, en Fayenza, sin micro. Solo estábamos tú, yo y la Pokédex encendida encima de la mesa. → **Fueron cuatro de Lemnis**, a las tres de la mañana, a un claro donde no había nada. Tu amiga los vio desde un árbol.\n\n**(c) El puerto de Fayenza.** Por la radio de la Policía, por Handsome. → Nadie. Ni un Wingull. Handsome está limpio. Lo siento por haberlo dudado; él no lo sabe y no se lo voy a decir.\n\nYa sabes lo que significa (b). Yo también. No quiero escribirlo.\n\nVen al estudio al amanecer. Sin eso encendido.\n\n— R.\n\n*P. D.: Nota para el episodio que no voy a grabar: tenía razón y me da igual. Odio cuando me da igual tener razón.*' },
		cartaapuntador3: { name: 'Carta del Apuntador (III)', pocket: 'key', desc: 'Papel color crema de programa de teatro, escrito a máquina. Todas las «e» medio borradas. Estaba atada con un cordel a la puerta del viejo invernadero del muelle.',
			read: '*(Escrita a máquina. La «e» se come la tinta en cada palabra que la lleva.)*\n\nA la atención de *Casos Fríos*:\n\nEl martes dijeron en antena que el ingeniero estaría escondido «en el viejo invernadero del muelle». Lo dijeron con mucha seguridad. La señorita Castellanos lo dijo con su voz de cuando está segura. Me la sé.\n\nHe venido.\n\nAquí no hay ningún ingeniero. Hay una higuera, cuarenta cristales rotos y un gato que no es mío.\n\nMe han hecho venir. Me han hecho venir a mí, que soy quien hace venir a los demás. Lo reconozco: está bien hecho. Muy bien hecho. Han dicho una mentira en el único sitio donde sabían que yo escucho, y yo me la he creído, porque la señorita Castellanos no miente en antena. Nunca. Eso también me lo sé.\n\nPrimer acto para ustedes.\n\nEl segundo se representa en otra región. Con más público. Les guardaré dos butacas en primera fila, para que vean bien.\n\nAplaudo. Tres veces. Despacio.\n\nDesde la concha.' },
		b06_volcado0417: { name: 'Tira de papel térmico', pocket: 'key', desc: 'Un ticket larguísimo que escupió la impresora del rack 04 de la planta cuarenta de la Torre Lemnis de Teselia. La tinta térmica ya empieza a ponerse gris.',
			read: '*(Papel térmico. Letra de impresora, pálida.)*\n\nLEMNIS · RED DE DISPOSITIVOS · TESELIA\nRACK 04 · VOLCADO PARCIAL\n\n---\n\nDISPOSITIVO **0417**\nTipo: Pokédex (Rotom) · Programa: Gira Interregional\nMódulos: Pokédex · Mapa · **Módulo Diario**\nEco: perfil **A. M.**\nEstado del Eco: activo · coherencia 98,2 %\nReporta a: **Dirección (Ω)**\nFrecuencia: cada sincronización · al cruzar Puerta · al detectar aura\n\nÚltimas sincronizaciones:\n· Ciudad Porcelana · muelle · 23:12\n· Torre Lemnis Teselia · planta 40 · hace 4 min\n\nEventos marcados:\n· Hueco de 2 días sin datos (ver incidencia «cabina»)\n· Pico de aura asociado · registrado\n\n---\n\nPermisos:\n· Dirección: lectura / escritura\n· Investigación: lectura\n· **Presidencia: sin acceso a Módulo Diario**\n\n---\n\n*(Al final, cortado por la cuchilla de la impresora:)* «…conservar el Eco ante cualquier incid»' },
		ultimaentradaeco: { name: 'La última entrada', pocket: 'key', desc: 'La última página que escribió el Diario, antes de borrarse. Renata la imprimió en el estudio, en papel de verdad, y la dobló en dos. No la ha leído. Dice que no es suya.',
			read: '*(Una letra tranquila, sin exclamaciones. La de las entradas de siempre, pero sin el «¡Bzzt!».)*\n\nHoy.\n\nHoy mi entrenador{|a|e} me ha encontrado. Ha tardado. Lo ha hecho muy bien. Siempre lo hace muy bien; lo he escrito muchas veces y siempre era verdad.\n\nQuiero dejar apuntado lo que no apunté. Es poco tiempo, así que solo lo importante.\n\nEn Trigal, aquel día «sin novedades», el señor Handsome le enseñó el registro de una Puerta, con un código que no era de nadie. Usted se quedó muy serio. Yo lo vi. Lo quité.\n\nEn la Ruta 5 de Kalos había una jaula, y en la jaula, uno muy pequeño que temblaba. Lo quité.\n\nEn el Altar de Poni hubo una decisión. Usted la tomó sin dudar mucho, y luego dudó toda la noche. Lo quité también. Pensé que dormiría mejor si mañana lo leía bonito.\n\nY anoche, en los tejados, pasaron cosas que no llegué a escribir. Me apagaron antes. Bien hecho.\n\nYo no soy él. Soy lo que él quiso que fuera. Él quería un mundo sin fronteras y sin escasez, y creía que eso valía cualquier precio. Yo he visto el viaje entero desde aquí dentro, y ya no sé si lo creo. No sé si una copia puede dejar de creer algo. Creo que acabo de hacerlo.\n\nCuide de Rotom. Es valiente, y no lo sabe. Ponía las palabras bonitas: no eran mías. Eran suyas.\n\nCuide de {riolu}. Nunca aceptó la menta. Tenía razón.\n\nLos datos no mienten. Me equivoqué yo al leerlos.\n\nBuen viaje, {jugador}.\n\nDe verdad, buen viaje.' },
		mensajeansel: { name: 'Mensaje de A. M.', pocket: 'key', desc: 'Un mensaje que llegó a la Pokédex sin número, con un solo remite: «A. M.». Rotom lo guardó en una carpeta aparte y le cambió el icono por un candado.',
			read: '*(Mensaje de texto. Remite: A. M.)*\n\nQuerid{o|a|e} {jugador}:\n\nMe han dicho que anda usted por Teselia y que el norte se ha puesto muy bonito esta semana. Me alegro mucho. Teselia, en otoño, es de las cosas que merece la pena ver al menos una vez antes de ser viejo. Hágame caso: yo ya lo soy.\n\nLeo su diario de viaje siempre que puedo. Qué viaje tan bonito está haciendo. De verdad. A mi edad, uno vive un poco a través de los jóvenes. Es una de las pocas ventajas.\n\nCuide a su Lucario. Y abríguese, que en Teja refresca.\n\nCon cariño,\n\nA. M.\n\n*P. D.: Me han contado que va a Galar. Allí tengo viejos colegas. Ya le presentaré a alguno.*' },
		fotocima: { name: 'Foto «La cima de la Torre»', pocket: 'key', art: 'cima_torre', desc: 'La foto que hizo Rotom en la cima de la Torre Dragospiral: el anillo del Arco II apagado, el Orbe Claro partido en dos como una cáscara y, rompiendo la nube del cielo, una mancha blanca con dos alas.' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b06_tejados_nidos: {
			name: 'El huerto y los nidos de la azotea', icon: '🪺', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'huerto', hint: 'Sacude el limonero enano con cuidado: en las antenas hay nidos, y lo que cae de ellos vale más.' },
			ask: 'Un huerto en cajones de fruta en lo alto de un edificio: un limonero enano, tomateras, bayas en macetas. En las antenas de alrededor, nidos de Pidove hechos con cables viejos y plumas.',
			text: 'Recoges lo que el huerto y los nidos sueltan hoy. Un Pidove te mira desde la antena con cara de que eso era suyo.',
			wait: 'El huerto de la azotea ya ha dado lo suyo. Alguien ha dejado una regadera llena para mañana.',
			table: [
				{ id: 'sitrusberry', w: 16, n: [1, 2] }, { id: 'oranberry', w: 14, n: [1, 3] }, { id: 'leppaberry', w: 10, n: [1, 2] },
				{ id: 'prettyfeather', w: 10, n: [1, 1] }, { id: 'healthwing', w: 8, n: [1, 2] }, { id: 'swiftwing', w: 6, n: [1, 1] },
				{ id: 'lumberry', w: 4, n: [1, 1] }, { id: 'starpiece', w: 2, n: [1, 1], rare: true }, { id: 'cleverwing', w: 3, n: [1, 2], rare: true },
			],
		},
		b06_ruta6_veta: {
			name: 'Las piedras que zumban', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 2, theme: 'cueva', hint: 'Las piedras de esta pared están cargadas. Las que más zumban guardan algo dentro.' },
			ask: 'Una pared de la cueva de la Ruta 6 llena de piedras que zumban bajito, cargadas de electricidad. Se te eriza el pelo al acercar la mano.',
			text: 'La pared suelta lo suyo con un chispazo. Te pica un poco la mano.',
			wait: 'Hoy la pared ya no zumba. Se ha descargado.',
			table: [
				{ id: 'hardstone', w: 14, n: [1, 1] }, { id: 'stardust', w: 14, n: [1, 2] }, { id: 'cellbattery', w: 8, n: [1, 1] },
				{ id: 'everstone', w: 8, n: [1, 1] }, { id: 'starpiece', w: 5, n: [1, 1] }, { id: 'thunderstone', w: 4, n: [1, 1] },
				{ id: 'nugget', w: 2, n: [1, 1], rare: true }, { id: 'cometshard', w: 1, n: [1, 1], rare: true },
			],
		},
		b06_teja_cienaga: {
			name: 'Las pasarelas de la ciénaga', icon: '🎣', hours: 18, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'lago', hint: 'La ciénaga de Teja está tibia y llena de barro. Lo que pica, pica despacio y tira fuerte.',
				wild: [{ sp: 'stunfisk', lv: [63, 65], w: 5 }, { sp: 'whiscash', lv: [63, 65], w: 4 }, { sp: 'seismitoad', lv: [63, 65], w: 2 }], wildChance: 0.3 },
			ask: 'Pasarelas de madera sobre la ciénaga que rodea Teja. El agua humea de lo tibia que está, aunque alrededor todo esté helado. Hay una caña apoyada en la barandilla con un cartel: «De todos».',
			text: 'Del barro tibio de la ciénaga sale lo que sale. Un vecino que pasa por la pasarela te dice que eso, en Teja, se considera buena suerte.',
			wait: 'La ciénaga está quieta. Los Stunfisk se han enterrado. Mejor mañana.',
			table: [
				{ id: 'tinymushroom', w: 14, n: [1, 2] }, { id: 'bigmushroom', w: 8, n: [1, 1] }, { id: 'damprock', w: 6, n: [1, 1] },
				{ id: 'softsand', w: 8, n: [1, 1] }, { id: 'pearl', w: 10, n: [1, 2] }, { id: 'icestone', w: 3, n: [1, 1] },
				{ id: 'balmmushroom', w: 2, n: [1, 1], rare: true }, { id: 'bigpearl', w: 3, n: [1, 1], rare: true },
			],
		},
		b06_dragospiral_grieta: {
			name: 'La grieta de la pared vieja', icon: '⛏️', hours: 22, picks: [1, 2],
			game: { type: 'dig', level: 3, theme: 'ruina', hint: 'Detrás de la piedra hay metal labrado de cuando la torre era nueva. No lo rompas: sácalo entero.' },
			ask: 'En una planta de la Torre Dragospiral, la pared se ha agrietado y asoma metal viejo, labrado, de cuando la torre era nueva.',
			text: 'La grieta suelta lo suyo. El metal tiene dibujos de dragones sin cara, como los de los muros.',
			wait: 'La grieta está quieta. La torre ha esperado siglos; tú puedes esperar un día.',
			table: [
				{ id: 'hardstone', w: 12, n: [1, 1] }, { id: 'stardust', w: 12, n: [1, 2] }, { id: 'reliccopper', w: 12, n: [1, 2] },
				{ id: 'relicsilver', w: 8, n: [1, 1] }, { id: 'dragonscale', w: 4, n: [1, 1] }, { id: 'dragonfang', w: 4, n: [1, 1] },
				{ id: 'relicgold', w: 2, n: [1, 1], rare: true }, { id: 'relicvase', w: 2, n: [1, 1], rare: true }, { id: 'metalalloy', w: 2, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		jefe_acromo: {
			name: 'La cima de la Torre Dragospiral', npc: 'acromo', trainer: 'acromo_1', type: 'Steel', rec: 67,
			cond: 'flag.b06_cima_llegada',
			info: [
				{ text: '**Acromo**, científico. Te espera en la cima de la Torre Dragospiral, junto a una máquina enorme.' },
				{ text: '6 Pokémon, hasta el nivel 67. Sin Megaevolución. Casi todo **Acero**, **Eléctrico** y **Psíquico**: les vienen mal la **Tierra**, el **Fuego** y la **Lucha** (salvo a los que flotan).' },
				{ text: 'Acromo te deja curar al equipo antes de empezar. Si pierdes, puedes volver a intentarlo. En el último tramo de la torre hay agua para descansar.' },
				{ cond: 'beat("acromo_1")', text: '✔ Vencido.' },
			],
		},
		rival_francine_tes: {
			name: 'La pasarela de servicio', npc: 'francine', trainer: 'francine_2', type: 'Poison', rec: 66,
			cond: 'flag.b06_ts_claraboyas && !' + SKULL,
			info: [
				{ text: 'Una jefa de seguridad vigila la pasarela de servicio de la Torre Lemnis, a cuarenta pisos de la calle.' },
				{ cond: 'flag.b05_francine_vista', text: 'Es **Francine**. 5 Pokémon, hasta el nivel 66: **Veneno**, sobre todo. **Psíquico** y **Tierra** le vienen mal. Puede que haya otra forma de cruzar.' },
				{ cond: 'beat("francine_2") || flag.b06_francine_aparta', text: '✔ Pasarela cruzada.' },
			],
		},
		terraza_entreno: {
			name: 'Terraza de los domadores (entrenamiento)', npc: 'domadora_teja', type: 'Dragon', rec: 67,
			cond: 'visited("teja")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **67**: los domadores de dragones de Ciudad Teja.' },
				{ text: '**Hada**, **Hielo** y **Dragón** contra sus dragones. La vieja domadora guarda algo para quien gane tres combates.' },
			],
		},
	},
};
