// Bloque 7 · Tramo 1: «El marcador» (~2 h 15) + «La Liga de los Siete Oficios» (opcional, ~1 h 30).
// Área Silvestre (sur): el tiempo cambia por tramos, dos nidos con Dinamax salvaje, el Dubwool Tera Fantasma de la
// Pradera Radiante (Fisura), pesca en el Lago Axew y el Nido de la Pradera (entrenamiento, tope 69, MT Ala Bis) →
// Ciudad Pistón: la Apertura de la Temporada (Lionel, Mireille, Renata con Nico y la Tía Rosa, Tadeo en el descanso),
// el segundo acto del Apuntador (el marcador, con reloj del directo hasta las 18:40), Grookey en la calle de los
// talleres, la Liga de los Siete Oficios (siete maestros, convences a cuatro, dos vías o más cada uno; ganar un combate
// es solo una de ellas y NO sustituye al gimnasio: el Estadio de Pistón está en obras de temporada), el duelo de curri
// Priya contra Gaspar y la Sopa Maxi, y los trenes de la estación (Plié y Crampón).
// Empieza con b07_t0_hecho (b07_m2 en «area»). Termina con b07_t1_hecho (b07_m2 hecha, b07_m3 en «hoyuelo»).
//
// Contrato del Apuntador: solo sabe lo dicho EN ANTENA. Las frases que puede citar van marcadas con // EN ANTENA;
// las que no, con // FUERA DE MICRO. La carta 4 está escrita días ANTES del directo (la trajo un mensajero pagado
// por adelantado): solo cita lo que Renata dijo en antena en directos anteriores, y no sabe cómo acabó el último minuto.
//
// Ids: la zona de entrenamiento usa nido_galar_1…3 (nido_1…3 ya existen en b06/t3-antano.js).

// ---------- Condiciones reutilizadas ----------
const LUC = '(inParty("riolu") || inParty("lucario"))';
const PURG = 'flag.b06_eco_purgado';
const FOGON = 'flag.b07_sopa_maxi && (flag.b07_oficio_calderas || flag.b07_percy_vencido)'; // fogón de Naboru para la Sopa Maxi
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado';
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';
const GROOKEY = '(owns("grookey") || owns("thwackey") || owns("rillaboom"))';
const INICIALES = '(flag.b07_sobble || flag.b07_sobble_vive) && (flag.b07_grookey || flag.b07_grookey_vive) && (flag.b07_scorbunny || flag.b07_scorbunny_vive)';
const OFI_N = '((flag.b07_oficio_herreria?1:0)+(flag.b07_oficio_relojeria?1:0)+(flag.b07_oficio_tintoreria?1:0)+(flag.b07_oficio_carpinteria?1:0)+(flag.b07_oficio_aguja?1:0)+(flag.b07_oficio_curri?1:0)+(flag.b07_oficio_calderas?1:0))';
const OFI_DOS = OFI_N + ' >= 2';
const MARCADOR = 'flag.b07_marcador_activo && !flag.b07_marcador';
const TINTES = 'has("tamatoberry") && has("blukberry") && has("pinapberry")';
const LEILANI = '(flag.b05_leilani_conocida || flag.b05_leilani_taller)';

// Abrir la Liga al hablar con el primer maestro (una vez)
const ABRE_LIGA = { quest: 'b07_s_oficios', stage: 'maestros', cond: '!quest.b07_s_oficios' }; // se copia con { ...ABRE_LIGA }

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== ÁREA SILVESTRE (SUR) ===================
		area_silvestre: {
			name: 'Área Silvestre', short: 'Área Silvestre', region: 'galar', kind: 'route', map: { x: 50, y: 104 },
			bg: { type: 'route', ground: '#6aa35a', hill: '#4f8a4a', far: '#9ab8c4', flowers: '#e9e3a0' },
			desc: 'Al norte de Pueblo Par, la hierba se abre de golpe y no se vuelve a cerrar. El **Área Silvestre** es una llanura enorme, de colinas suaves, lagos, torres en ruinas y árboles de bayas sueltos, como si alguien los hubiera dejado caer.\n\nEl cielo cambia cada media hora: lluvia, sol, niebla, otra vez lluvia. En la hierba brillan, aquí y allá, columnas de luz roja que suben de unos agujeros de piedra: los **nidos**. Al fondo, al norte, las chimeneas de **Ciudad Pistón**.',
			descNight: 'De noche, el Área Silvestre se queda a oscuras salvo por los nidos, que siguen echando luz roja hacia arriba como faros. Se oyen Noctowl y, muy lejos, el tren de Pistón. Las nubes pasan tan bajas que parece que se pueden tocar.',
			links: ['par', 'piston'],
			enterCond: 'flag.b07_t0_hecho', blockedMsg: 'Una guarda del Área Silvestre con chubasquero amarillo te corta el paso, muy amable. «Antes de meterte ahí, termina lo tuyo en Par. Y que la profesora te dé lo de la muñeca. Sin eso, en un nido no duras ni un turno».',
			onEnter: [{ script: 'b07_area_llegada', cond: '!flag.b07_area_silvestre', once: true }],
			mapNote: 'Nidos con Dinamax · Pradera Radiante · Lago Axew · Nido de la Pradera (entrenamiento)',
			rumors: [
				{ text: 'En el Área Silvestre no se pregunta qué tiempo hace. Se pregunta qué tiempo hace **ahora**.' },
				{ text: 'Los nidos echan luz roja cuando dentro duerme algo muy grande. Los que acampan cerca dicen que la luz late, como un corazón.' },
				{ text: 'En la Pradera Radiante hay una oveja que brilla como si fuera de cristal. La gente que la ha visto de cerca dice que no hace ruido al andar.' },
				{ text: 'Los Corviknight taxi no aterrizan nunca en la hierba alta. Dicen los taxistas que es por los Wooloo. Los Wooloo dicen otra cosa, pero nadie los entiende.' },
				{ cond: 'flag.b07_premio_nido', text: 'El guía de los taxis del nido presume de que enseña a volar «a lo que tenga alas y a lo que crea que las tiene».' },
			],
			route: {
				from: 'par', to: 'piston', length: 8, terrain: 'grass', rate: 0.22,
				tramos: {
					0: [{ text: 'Detrás, los tejados de Par y el humo de la estación. Delante, la hierba hasta donde alcanza la vista. Un cartel de madera, medio caído: «ÁREA SILVESTRE · Prohibido acampar en los nidos · Prohibido despertar a lo que duerma en ellos».' }],
					1: [
						{ trainer: 'silv_hamish' },
						{ item: 'maxrevive' },
						{ text: 'Llueve. No mucho: lo justo para que la hierba huela y el pelo se te pegue a la frente. Un Wooloo te mira desde una roca, empapado, con cara de que esto le pasa todos los días.' },
					],
					2: [
						{ text: 'Sale el sol de golpe, como si alguien hubiera abierto una ventana. La hierba echa vapor. A tu izquierda, en un círculo de piedras negras, una columna de luz roja sube hasta las nubes.' },
						{ talk: [{ cond: '!flag.b07_nido_bewear', script: 'b07_nido_bewear' }, { script: 'b07_nido_apagado' }], label: 'Un nido con luz roja', icon: '🔴', sub: 'Algo enorme respira ahí dentro', new: '!flag.b07_nido_bewear' },
						{ spot: { action: { gather: 'b07_silv_arbol' } }, label: 'Un árbol de bayas solitario', icon: '🌳', sub: 'Las ramas se doblan de fruta' },
						{ branch: { label: 'Bajar a la Pradera Radiante', go: 'pradera_radiante', cond: 'true' } },
					],
					3: [
						{ trainer: 'silv_moira', optional: true, label: 'Una mujer remueve una olla en mitad de la hierba' },
						{ item: 'maxmushrooms', hidden: true },
					],
					4: [
						{ text: 'Niebla. Baja de las colinas en un minuto y lo tapa todo. Oyes agua cerca, y el chapoteo de algo grande. Cuando se levanta, a la derecha hay un lago redondo con una isla en medio y un letrero: «LAGO AXEW».' },
						{ trainer: 'silv_lucie' },
						{ branch: { label: 'Acercarse al Lago Axew', go: 'lago_axew', cond: 'true' } },
					],
					5: [
						{ text: 'Vuelve a llover, esta vez de lado. Junto al lago, entre juncos, otra columna de luz roja. Esta huele a algas.' },
						{ talk: [{ cond: '!flag.b07_nido_drednaw', script: 'b07_nido_drednaw' }, { script: 'b07_nido_apagado' }], label: 'Un nido entre los juncos', icon: '🔴', sub: 'La luz roja tiembla en el agua', new: '!flag.b07_nido_drednaw' },
						{ item: 'ultraball' },
					],
					6: [
						{ text: 'Un graznido metálico. Arriba, un Corviknight cruza el cielo con una caja amarilla colgada de las patas. Dentro de la caja, un señor con bombín lee el periódico. Ni levanta la vista.' },
						{ trainer: 'silv_duncan' },
						{ branch: { label: 'Ir al Nido de la Pradera (campamento de entrenamiento)', go: 'nido_pradera', cond: 'true' } },
					],
					7: [
						{ text: 'Durante un minuto, nieva. Copos gordos, lentos, que se deshacen al tocar la hierba. Luego sale el sol otra vez y nadie, ni los Pokémon, parece sorprendido.' },
						{ trainer: 'silv_glen', optional: true, label: 'Un técnico con un aparato que pita mira el suelo' },
						{ item: 'hyperpotion', hidden: true },
					],
					8: [{ text: 'La hierba se acaba en un puente de hierro sobre un río. Al otro lado, ladrillo rojo, chimeneas que echan vapor blanco, un estadio enorme con el tejado de cristal y un reloj de torre que da la hora mal. **Ciudad Pistón**.' }],
				},
				encounters: {
					grass: [
						{ sp: 'diggersby', lv: [65, 67], w: 18 },
						{ sp: 'greedent', lv: [65, 67], w: 14, time: 'day' },
						{ sp: 'unfezant', lv: [65, 67], w: 10 },
						{ sp: 'mudsdale', lv: [66, 68], w: 10 },
						{ sp: 'bewear', lv: [66, 68], w: 8 },
						{ sp: 'pangoro', lv: [66, 68], w: 8 },
						{ sp: 'vespiquen', lv: [65, 67], w: 8, time: 'day' },
						{ sp: 'manectric', lv: [65, 67], w: 8 },
						{ sp: 'xatu', lv: [65, 67], w: 6 },
						{ sp: 'noctowl', lv: [65, 67], w: 10, time: 'night' },
						{ sp: 'thievul', lv: [65, 67], w: 8, time: 'night' },
						{ sp: 'drifblim', lv: [66, 68], w: 6, time: 'night' },
						{ sp: 'corviknight', lv: [67, 68], w: 3 },
						{ sp: 'zebstrika', lv: [66, 67], w: 3, displaced: true },
						{ sp: 'staraptor', lv: [66, 67], w: 2, displaced: true },
					],
				},
			},
		},

		// =================== PRADERA RADIANTE ===================
		pradera_radiante: {
			name: 'Pradera Radiante', parent: 'area_silvestre', kind: 'area', region: 'galar',
			bg: { type: 'route', ground: '#7ab85a', hill: '#5a9a4a', far: '#b8d4e0', flowers: '#f2e6a0' },
			desc: 'Una ladera de hierba tan verde que parece recién pintada, salpicada de flores amarillas y de Wooloo que pastan sin prisa. Al fondo, unos arbustos bajos con bayas de colores. En el centro, bajo un roble viejo, setas: pequeñas, grandes y alguna que brilla con una luz rojiza que no es de este mundo.\n\nEl viento trae olor a lana mojada.',
			descNight: 'De noche, la Pradera Radiante se llena de luciérnagas y de Wooloo dormidos, como piedras blancas. Las setas del roble brillan más. Alguna, demasiado.',
			descs: [
				{ cond: 'flag.b07_tera_visto', text: 'Una ladera de hierba muy verde, flores amarillas y Wooloo que pastan sin prisa. Bajo el roble viejo, las setas de siempre. En la hierba, donde estuvo la oveja de cristal, todavía hay un círculo de hierba aplastada, con un polvillo brillante que no se va con la lluvia.' },
			],
			mapNote: 'Cosecha diaria (Maxisetas raras) · Pokémon de Fisura',
			onEnter: [{ script: 'b07_pradera_llegada', cond: '!flag.b07_pradera_llegada', once: true }],
			spots: [
				{ label: 'El roble de las setas', sub: 'Setas pequeñas, grandes y alguna que brilla', icon: '🍄', new: '!flag.rec_b07_pradera_setas', action: { gather: 'b07_pradera_setas' } },
				{ label: 'Una oveja que brilla como cristal', sub: 'No hace ruido al andar', icon: '💎', cond: 'flag.b07_pradera_llegada && !flag.b07_tera_visto', new: 'true', talk: [{ script: 'b07_tera_dubwool' }] },
				{ label: 'Los arbustos de tinte', sub: 'Bayas rojas, azules y amarillas', icon: '🫐', cond: 'flag.b07_ofi_tinte_pedido && !flag.b07_oficio_tintoreria && !(' + TINTES + ')', new: 'true', talk: [{ script: 'b07_ofi_tintes_cosecha' }] },
				{ label: 'Explorar la pradera', sub: 'Lana, flores y algo que se mueve', icon: '🐑', action: { explore: 'grass' } },
			],
			encounters: {
				grass: [
					{ sp: 'dubwool', lv: [65, 67], w: 20 },
					{ sp: 'cinccino', lv: [65, 67], w: 14 },
					{ sp: 'eldegoss', lv: [65, 67], w: 14, time: 'day' },
					{ sp: 'diggersby', lv: [65, 67], w: 12 },
					{ sp: 'greedent', lv: [65, 67], w: 10 },
					{ sp: 'butterfree', lv: [65, 66], w: 8, time: 'day' },
					{ sp: 'bewear', lv: [66, 68], w: 6 },
					{ sp: 'noctowl', lv: [65, 67], w: 8, time: 'night' },
					{ sp: 'snorlax', lv: [67, 68], w: 3 },
					{ sp: 'dubwool', lv: [66, 67], w: 3, displaced: true, gimmick: 'tera', tera: 'Ghost' },
				],
			},
			rumors: [
				{ text: 'Las setas que brillan bajo el roble se llaman **Maxisetas**. Dicen que salen donde la tierra tiene «demasiada energía». Los cocineros de Pistón pagan lo que sea por una.' },
				{ text: 'La oveja de cristal apareció la noche que en Par zumbó la Puerta. Antes no estaba. Los Wooloo de la pradera no se le acercan.' },
			],
		},

		// =================== LAGO AXEW ===================
		lago_axew: {
			name: 'Lago Axew', parent: 'area_silvestre', kind: 'area', region: 'galar',
			bg: { type: 'coast', ground: '#7a9a6a', far: '#9ab8c4' },
			desc: 'Un lago redondo, frío y muy quieto, con una isla de piedra en el centro donde dicen que viven dragones pequeños. En la orilla, juncos, barcas varadas y un embarcadero de tablas con un cubo de cebo que huele a demonios.\n\nEn una cala del norte, el agua se queda helada aunque haga sol: ahí duermen unos Vanillite que sueltan escarcha al bostezar.',
			descNight: 'De noche, el Lago Axew refleja la luz roja de los nidos de la orilla. En la isla del centro se oye algo que raspa la piedra, como una uña. Los pescadores se van antes de que salga la luna.',
			mapNote: 'Pesca diaria · la cala helada',
			spots: [
				{ label: 'El embarcadero', sub: 'Una caña apoyada en el cubo del cebo', icon: '🎣', new: '!flag.rec_b07_lago_axew', action: { gather: 'b07_lago_axew' } },
				{ label: 'La cala helada', sub: 'Unos Vanillite bostezan escarcha', icon: '🧊', cond: 'flag.b07_ofi_hielo_pedido && !flag.b07_oficio_herreria && !has("hieloaxew")', new: 'true', talk: [{ script: 'b07_ofi_hielo_cala' }] },
				{ label: 'La cala helada', sub: 'Unos Vanillite duermen en el hielo', icon: '🧊', cond: '!flag.b07_ofi_hielo_pedido || flag.b07_oficio_herreria || has("hieloaxew")', talk: [{ script: 'b07_cala_generico' }] },
				{ label: 'Explorar la orilla', sub: 'Juncos y barro', icon: '🌾', action: { explore: 'grass' } },
				{ label: 'Remontar el lago a lomos de Lapras', sub: 'Hasta la isla del centro', icon: '🌊', cond: 'flag.mount_lapras', action: { explore: 'water' } },
			],
			encounters: {
				grass: [
					{ sp: 'quagsire', lv: [65, 67], w: 16 },
					{ sp: 'seismitoad', lv: [65, 67], w: 12 },
					{ sp: 'kingler', lv: [65, 67], w: 10 },
					{ sp: 'crawdaunt', lv: [66, 68], w: 8 },
					{ sp: 'pelipper', lv: [65, 67], w: 10, time: 'day' },
					{ sp: 'vanilluxe', lv: [66, 68], w: 6 },
					{ sp: 'haxorus', lv: [67, 68], w: 3 },
				],
				water: [
					{ sp: 'gyarados', lv: [65, 67], w: 16 },
					{ sp: 'seaking', lv: [65, 67], w: 14 },
					{ sp: 'whiscash', lv: [65, 67], w: 10 },
					{ sp: 'lanturn', lv: [66, 68], w: 12, time: 'night' },
					{ sp: 'drednaw', lv: [66, 68], w: 8 },
					{ sp: 'cloyster', lv: [66, 68], w: 8 },
					{ sp: 'jellicent', lv: [66, 68], w: 6 },
					{ sp: 'lapras', lv: [67, 68], w: 3 },
				],
			},
			rumors: [
				{ text: 'En la isla del Lago Axew viven Axew, por eso se llama así. Nadie los ha visto. Pero hay marcas de colmillo en todas las piedras.' },
			],
		},

		// =================== NIDO DE LA PRADERA (entrenamiento) ===================
		nido_pradera: {
			name: 'Nido de la Pradera', parent: 'area_silvestre', kind: 'area', region: 'galar',
			bg: { type: 'route', ground: '#6a9a4a', hill: '#4f7a3a', far: '#a8c4d0' },
			desc: 'Alrededor de un nido apagado, enorme, la gente ha montado un campamento: tiendas, una hoguera, una pizarra con «PRÁCTICA DE NIDO · Turnos de tarde» y una caseta de madera con un letrero de **Corviknight Taxi · Parada de la Pradera**. En el techo de la caseta, un Corviknight dormita con una pata recogida.\n\nLos que entrenan aquí se preparan para las incursiones de verdad: combate tras combate, sin salir del círculo de piedras.',
			descNight: 'De noche, la hoguera del campamento sigue encendida. El Corviknight del taxi duerme con la cabeza bajo el ala. Alguien toca la armónica, mal. El nido apagado, en la oscuridad, parece un pozo.',
			mapNote: 'Entrenamiento (tope 69) · premio del guía de los taxis',
			spots: [
				{ label: 'La práctica de nido', sub: 'Zona de entrenamiento (nivel recomendado 69)', icon: '🔴', action: { training: {
					cap: 69, trainers: ['nido_galar_1', 'nido_galar_2', 'nido_galar_3'], coach: 'Guía de los taxis',
					prize: { wins: 3, script: 'b07_premio_nido' },
					closed: 'El guía de los taxis mira a tu equipo y silba. «Con esos, la práctica de nido les queda corta. Sigan hacia Pistón, que allí hay cosas más grandes que un nido. Bueno, más grandes no. Más altas».',
				} } },
				{ label: 'La parada de los taxis', sub: 'Un Corviknight duerme en el tejado', icon: '🐦‍⬛', new: '!flag.b07_taxi_visto', talk: [{ script: 'b07_taxista' }] },
				{ label: 'Mandarle una foto del taxi a Leilani', sub: 'Un pájaro de acero con una caja colgando', icon: '📸', cond: 'flag.b07_taxi_visto && ' + LEILANI + ' && !flag.b07_leilani_taxi', new: 'true', talk: [{ script: 'b07_leilani_taxi' }] },
			],
		},

		// =================== CIUDAD PISTÓN ===================
		piston: {
			name: 'Ciudad Pistón', short: 'Pistón', region: 'galar', kind: 'city', map: { x: 62, y: 92 },
			bg: { type: 'city', roofs: ['#8a3a2a', '#a4543a', '#5a3a2a', '#c4743a'], far: '#9aa8b4' },
			desc: 'Ladrillo rojo, hierro negro y vapor blanco. **Ciudad Pistón** vive de sus calderas: debajo de las calles corren tuberías que calientan las casas, y de las chimeneas sale vapor a todas horas. Por encima de los tejados pasan trenes por puentes de hierro.\n\nEn el centro, el **Estadio de Pistón**, con su tejado de cristal. Junto a la **estación**, la **calle de los talleres**, donde todavía se hacen las cosas a mano. Y en una esquina, una taberna de la que sale un olor a curri que te para en seco.',
			descNight: 'De noche, Pistón no se apaga: las calderas siguen rugiendo bajo los adoquines y las ventanas de los talleres se quedan encendidas hasta tarde. El vapor de las chimeneas se pone naranja con las farolas. El reloj de la torre de la estación da las doce a las doce y siete.',
			links: ['area_silvestre'],
			mapNote: 'Apertura de la Temporada · estación (trenes) · talleres · curri · calderas',
			onEnter: [{ script: 'b07_piston_llegada', cond: '!flag.b07_piston_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Pistón', action: { shop: 'tienda_piston' } },
				{ label: 'Estadio de Pistón', sub: 'Tejado de cristal. Hoy, la Apertura de la Temporada', icon: '🏟️', action: { go: 'estadio_piston' }, new: 'flag.b07_piston_llegada && !flag.b07_marcador' },
				{ label: 'Estación de Pistón', sub: 'Trenes a toda Galar. Y un reloj que va a su aire', icon: '🚉', action: { go: 'estacion_piston' }, new: '!visited("estacion_piston")' },
				{ label: 'La calle de los talleres', sub: 'Martillos, telares y alguien que toca el tambor fatal', icon: '🔨', action: { go: 'piston_talleres' }, new: '!visited("piston_talleres")' },
				{ label: 'La taberna de curri', sub: 'El olor llega hasta la plaza', icon: '🍛', action: { go: 'curri_piston' }, new: '!visited("curri_piston")' },
				{ label: 'Las calderas', sub: 'Una escalera que baja hacia el calor', icon: '🔥', action: { go: 'calderas_piston' }, new: '!visited("calderas_piston")' },
				{ label: 'El pabellón de la plaza', sub: 'Hoy juega el equipo juvenil de Kalos', icon: '🏐', cond: 'flag.b06_camille_estadio && weekday == 5 && !flag.b07_camille_pabellon', new: 'true', talk: [{ script: 'b07_camille_pabellon' }] },
				{ label: '📞 Llamar al estudio de Casos Fríos', sub: 'Renata no ha vuelto a escribir desde el directo', icon: '📞', cond: 'flag.b07_renata_dolida && !flag.b07_renata_reparada', new: 'true', talk: [{ script: 'b07_renata_reparar' }] },
				{ label: 'Rotom: ¿qué me queda en Pistón?', sub: 'Repasa lo pendiente', icon: '📱', cond: 'flag.b07_piston_llegada', talk: [{ script: 'b07_piston_pendiente' }] },
				{ label: 'La ribera del río', sub: 'Por debajo de los puentes del tren', icon: '🌉', action: { explore: 'grass' } },
			],
			encounters: {
				grass: [
					{ sp: 'rhydon', lv: [66, 68], w: 12 },
					{ sp: 'drapion', lv: [66, 68], w: 12 },
					{ sp: 'sigilyph', lv: [65, 67], w: 10 },
					{ sp: 'bisharp', lv: [66, 68], w: 10 },
					{ sp: 'boltund', lv: [65, 67], w: 8, time: 'day' },
					{ sp: 'ribombee', lv: [65, 67], w: 8, time: 'day' },
					{ sp: 'coalossal', lv: [66, 68], w: 6 },
					{ sp: 'conkeldurr', lv: [66, 68], w: 6 },
					{ sp: 'noctowl', lv: [65, 67], w: 10, time: 'night' },
					{ sp: 'weavile', lv: [66, 68], w: 6, time: 'night' },
					{ sp: 'snorlax', lv: [67, 68], w: 2 },
				],
			},
			rumors: [
				{ text: 'El Gimnasio de Pistón está «en obras de temporada». Naboru, el líder, baja todos los días a las calderas a vigilar la presión. Dice que un gimnasio se puede cerrar, pero una caldera no.' },
				{ text: 'En Pistón hay una tradición vieja: la **Liga de los Siete Oficios**. Quien convence a cuatro maestros de la ciudad compra en los talleres como si fuera de aquí. No se convence a nadie con dinero. Se ha intentado.' },
				{ text: 'El reloj de la torre de la estación lleva una semana dando la hora mal. Agnes, la guardagujas, dice que el reloj miente y los trenes no. Los trenes llegan a su hora. El reloj, no.' },
				{ cond: 'flag.b07_marcador', text: 'Desde la Apertura, en la ventanilla 3 del estadio han puesto un cartel: «LOS MENSAJES DE LA AFICIÓN SE LEEN ANTES DE EMITIRSE». Lo han escrito a mano. Con rabia.' },
			],
		},

		// =================== ESTADIO DE PISTÓN ===================
		estadio_piston: {
			name: 'Estadio de Pistón', parent: 'piston', kind: 'building', region: 'galar',
			bg: { type: 'plaza', ground: '#3a8a4a', far: '#2b2b38' },
			desc: 'Un estadio de ladrillo y hierro con el tejado de cristal, gradas para cuarenta mil personas y un **marcador gigante** colgado sobre el fondo norte. En el vestíbulo, un **tablón** con papeles clavados, unas **ventanillas** de cristal con números pintados y, en una percha del Musical, un Chatot con un lazo.\n\nEl gimnasio de dentro está cerrado: «**EN OBRAS DE TEMPORADA** · El líder les atiende en las calderas».',
			descs: [
				{ cond: 'flag.b07_marcador', text: 'El Estadio de Pistón, con su tejado de cristal y sus cuarenta mil asientos, ya vacío. Los operarios barren confeti. En el marcador gigante solo sale el resultado del combate de exhibición y la hora, que esta vez es la buena.\n\nEn el vestíbulo, el tablón, las ventanillas y el Chatot del Musical, que repite «¡dieciocho cuarenta!» cuando pasa alguien.' },
			],
			descNight: 'De noche, el estadio vacío suena distinto: el viento silba entre las gradas y el tejado de cristal cruje cuando se enfría. El marcador está apagado. Solo queda encendida una franja pequeña, abajo, con la hora.',
			mapNote: 'La Apertura · el marcador · gimnasio en obras',
			spots: [
				{ label: 'La Apertura de la Temporada', sub: 'Cuarenta mil personas y un campeón que no llega', icon: '🏟️', cond: '!flag.b07_apertura', new: 'true', talk: [{ script: 'b07_apertura' }] },
				// --- Durante el directo (reloj hasta las 18:40) ---
				{ label: 'El tablón del vestíbulo', sub: 'Papeles clavados con chinchetas', icon: '📋', cond: MARCADOR, new: '!has("escaletaapertura")', talk: [{ script: 'b07_marcador_tablon' }] },
				{ label: 'La ventanilla 3', sub: '«Mensajes de la afición»', icon: '🎟️', cond: MARCADOR, new: 'true', talk: [{ script: 'b07_marcador_ventanilla' }] },
				{ label: 'El Chatot del vestíbulo', sub: 'Con lazo. Habla solo', icon: '🦜', cond: MARCADOR + ' && !flag.b07_chatot_oido', new: 'true', talk: [{ script: 'b07_marcador_chatot' }] },
				{ label: 'Nico, en la mesa de sonido', sub: 'Auriculares puestos y una libreta de episodios', icon: '🎧', cond: MARCADOR + ' && !flag.b07_nico_oido', new: 'true', talk: [{ script: 'b07_marcador_nico' }] },
				{ label: 'Volver a la grada de prensa y esperar', sub: 'Que pase lo que tenga que pasar', icon: '⏱️', cond: MARCADOR, talk: [{ script: 'b07_marcador_esperar' }] },
				// --- Después ---
				{ label: 'El pasillo de artistas', sub: 'El Musical recoge el decorado', icon: '🎭', cond: 'flag.b07_marcador && !flag.b07_tadeo_pasillo', new: 'true', talk: [{ script: 'b07_tadeo_pasillo' }] },
				{ label: 'El pasillo de artistas', sub: 'Baúles, pelucas y un olor a laca', icon: '🎭', cond: 'flag.b07_tadeo_pasillo', talk: [{ script: 'b07_tadeo_despues' }] },
				{ label: 'El Chatot del vestíbulo', sub: 'Repite la hora', icon: '🦜', cond: 'flag.b07_marcador', talk: [{ script: 'b07_chatot_despues' }] },
				{ label: 'El gimnasio de Pistón', sub: '«En obras de temporada»', icon: '🚧', talk: [{ script: 'b07_estadio_obras' }] },
			],
			rumors: [
				{ text: 'Los mensajes de la afición del marcador se compran en la ventanilla 3, con días de antelación, y se programan al minuto. Hay gente que se declara así. Hay gente que se divorcia así.' },
			],
		},

		// =================== ESTACIÓN DE PISTÓN ===================
		estacion_piston: {
			name: 'Estación de Pistón', parent: 'piston', kind: 'building', region: 'galar',
			bg: { type: 'indoor', wall: '#6a3a2a', floor: '#8a7a6a' },
			desc: 'Una nave de hierro y cristal con cuatro andenes, palomas, vapor y un tablero de llegadas de letras que giran solas, *clac-clac-clac*. Sobre la entrada, la torre del **reloj**, que va a su aire.\n\nEn la garita del cambio de agujas, una señora con gorra de ferroviaria apunta algo en un cuaderno sin mirar el reloj. No le hace falta.',
			descNight: 'De noche, la estación se queda casi vacía. El tablero de llegadas sigue girando para nadie. En la garita, la lámpara de Agnes sigue encendida: el último tren sale a las 23:58 y ella no se va hasta verlo salir.',
			mapNote: 'Trenes a Plié y a Crampón · Agnes, la guardagujas',
			spots: [
				{ label: 'Agnes, la guardagujas', sub: 'Gorra, silbato y un cuaderno', icon: '🚦', new: '!flag.b07_agnes_visto', talk: [{ script: 'b07_agnes' }] },
				{ label: '🚆 Tren a Pueblo Plié', sub: 'Al oeste, entre bosques', icon: '🚆', cond: 'flag.b07_t1_hecho', new: 'quest.b07_s_casa == "carta"', action: { go: 'plie' } },
				{ label: '🚆 Tren a Pueblo Crampón', sub: 'Al este. Última parada de la línea', icon: '🚆', cond: 'flag.b07_t3_hecho', new: 'quest.b07_m4 == "crampon"', action: { go: 'crampon' } },
				{ label: 'El tablero de llegadas', sub: 'Letras que giran solas', icon: '🕰️', talk: [{ script: 'b07_tablero' }] },
			],
		},

		// =================== LA CALLE DE LOS TALLERES ===================
		piston_talleres: {
			name: 'La calle de los talleres', parent: 'piston', kind: 'area', region: 'galar',
			bg: { type: 'town', roofs: ['#8a3a2a', '#5a3a2a', '#a4543a'], far: '#9aa8b4', ground: '#6a5a4a' },
			desc: 'Una calle estrecha de adoquines, con talleres a los dos lados: una **herrería** con la puerta abierta y el fuego encendido, una **relojería** con cien relojes que no dan la misma hora, una **tintorería** con bufandas tendidas de balcón a balcón y una **carpintería** que huele a serrín y de la que sale un ruido de tambor muy mal tocado.\n\nEn la esquina, una placa de latón atornillada a la pared: «**LIGA DE LOS SIETE OFICIOS**».',
			descNight: 'De noche, la calle de los talleres huele a hierro enfriándose. La relojería tiene cien tic-tacs a destiempo. En la carpintería, el tambor sigue. Más bajito. Igual de mal.',
			mapNote: 'Liga de los Siete Oficios · Grookey · tienda de los talleres',
			spots: [
				{ label: 'La placa de la esquina', sub: '«Liga de los Siete Oficios»', icon: '🔰', talk: [{ script: 'b07_ofi_placa' }] },
				{ label: 'La herrería', sub: 'El fuego encendido y una mujer con mandil de cuero', icon: '⚒️', new: '!flag.b07_ofi_herrera_visto', talk: [{ script: 'b07_ofi_herrera' }] },
				{ label: 'La relojería', sub: 'Cien relojes. Ninguno de acuerdo', icon: '🕰️', new: '!flag.b07_ofi_relojero_visto', talk: [{ script: 'b07_ofi_relojero' }] },
				{ label: 'La tintorería', sub: 'Bufandas de todos los colores menos uno', icon: '🧣', new: '!flag.b07_ofi_tintorera_visto', talk: [{ script: 'b07_ofi_tintorera' }] },
				{ label: 'La carpintería', sub: 'Serrín y un tambor que no lleva el ritmo', icon: '🪚', new: '!flag.b07_ofi_carpintero_visto', talk: [{ script: 'b07_ofi_carpintero' }] },
				{ label: 'El aprendiz del tambor', sub: 'Un Pokémon pequeño con un palito', icon: '🥁', cond: 'flag.b07_ofi_carpintero_visto && !flag.b07_grookey && !flag.b07_grookey_vive', new: 'true', talk: [{ script: 'b07_grookey' }] },
				{ label: 'El aprendiz del tambor', sub: 'Ya tiene ritmo', icon: '🥁', cond: 'flag.b07_grookey_vive', talk: [{ script: 'b07_grookey_despues' }] },
				{ label: 'Los talleres (tienda)', sub: 'Lo que se hace aquí, se vende aquí', icon: '🛠️', action: { shop: 'taller_oficios' } },
			],
		},

		// =================== LA TABERNA DE CURRI ===================
		curri_piston: {
			name: 'La taberna de curri', parent: 'piston', kind: 'building', region: 'galar',
			bg: { type: 'indoor', wall: '#6a3a2a', floor: '#8a5a3a' },
			desc: 'Una taberna de techo bajo, vigas negras y mesas largas, con una cocina abierta al fondo donde borbotean seis ollas a la vez. Huele a cúrcuma, a pan tostado y a algo que pica antes de probarlo.\n\nEn la cocina, una mujer con moño alto y un lápiz clavado en él remueve tres ollas con una sola mano. En la barra, un hombre calvo con barba y pañuelo apunta en un cuaderno todo lo que ella hace.',
			descNight: 'De noche, la taberna se llena de ferroviarios, herreros y gente de los talleres. Se canta. Mal, pero se canta. Las ollas no se apagan nunca.',
			mapNote: 'Priya y su curri · Gaspar · el Sello de los Siete Oficios',
			spots: [
				{ label: 'Priya, en la cocina', sub: 'Tres ollas, una mano', icon: '🍛', new: '!flag.b07_priya_vista', talk: [{ script: 'b07_priya' }] },
				{ label: 'Gaspar, en la barra', sub: 'Apunta todo lo que hace Priya', icon: '📓', cond: '!flag.b07_gaspar_curri', new: '!flag.b07_gaspar_galar', talk: [{ script: 'b07_gaspar_galar' }] },
				{ label: 'Gaspar, en la cocina de Priya', sub: 'Con una seta que brilla en la mano', icon: '🍄', cond: 'flag.b07_gaspar_curri && !flag.b07_sopa_maxi', new: 'true', talk: [{ script: 'b07_sopa_maxi' }] },
				{ label: 'Pedirle una Sopa Maxi a Gaspar', sub: 'Una olla aparte, tapada', icon: '🍲', cond: 'flag.b07_sopa_maxi', talk: [{ script: 'b07_sopa_pedir' }] },
				{ label: 'Los maestros, en la mesa del fondo', sub: 'Te esperan con una taza de té', icon: '🫖', cond: 'quest.b07_s_oficios == "sello"', new: 'true', talk: [{ script: 'b07_oficios_sello' }] },
			],
		},

		// =================== LAS CALDERAS ===================
		calderas_piston: {
			name: 'Las calderas', parent: 'piston', kind: 'building', region: 'galar',
			bg: { type: 'indoor', wall: '#3a2a2a', floor: '#5a4a3a' },
			desc: 'Bajo el estadio, una sala enorme de hierro y ladrillo con tres calderas del tamaño de una casa, manómetros, válvulas, tuberías que suben hacia la ciudad y un calor que te seca los ojos. Unos Torkoal duermen junto a los hornos, roncando humo.\n\nEn una pasarela, un hombre mayor con una cinta en la frente y una camisa blanca impecable mira las agujas de los manómetros sin parpadear.',
			descNight: 'De noche, las calderas suenan como un animal grande que respira dormido. El hombre de la cinta sigue en la pasarela, con un termo de té. No se ha ido. No se va nunca antes que la última aguja.',
			mapNote: 'Naboru (líder de Pistón, gimnasio en obras)',
			spots: [
				{ label: 'Naboru, en la pasarela', sub: 'Cinta en la frente. Mira los manómetros', icon: '🔥', new: '!flag.b07_naboru_visto', talk: [{ script: 'b07_naboru' }] },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Área Silvestre -----
		silv_hamish: { name: 'Hamish', cls: 'Excursionista', ai: 2,
			team: [
				{ sp: 'diggersby', lv: 66, moves: ['earthquake', 'return', 'quickattack', 'swordsdance'] },
				{ sp: 'mudsdale', lv: 67, moves: ['highhorsepower', 'heavyslam', 'rockslide', 'counter'] },
			],
			intro: 'En el Área Silvestre el tiempo cambia cada media hora. Yo me cambio de calcetines cada hora. Voy ganando. ¡Combate!',
			win: 'Me has ganado y ha salido el sol. Las dos cosas en un minuto. Típico de aquí.',
			look: { hair: 'cap', hairColor: '#a4543a', outfit: '#5a6a3a', outfit2: '#e9c46a', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'beard', capColor: '#5a6a3a', collar: 'jacket' } },
		silv_moira: { name: 'Moira', cls: 'Cocinera de acampada', ai: 2,
			team: [
				{ sp: 'greedent', lv: 66, moves: ['bodyslam', 'crunch', 'seedbomb', 'stockpile'] },
				{ sp: 'appletun', lv: 67, moves: ['appleacid', 'dragonpulse', 'bodypress', 'recover'] },
			],
			intro: 'Estoy haciendo curri en mitad del campo. Si me ganas, te sirvo un plato. Si pierdes, me lo como yo y lo disfruto el doble.',
			win: 'Toma. Plato. —Te lo da—. Bueno, toma la cuchara. El plato es mío y el curri lo necesito para la foto.',
			look: { hair: 'bun', hairColor: '#4a3a2a', outfit: '#e98a3a', outfit2: '#3a6a4a', skin: 2, eyesStyle: 'happy', mouth: 'smile', acc: 'bandana', collar: 'apron' } },
		silv_lucie: { name: 'Lucie', cls: 'Aspirante de la Gira', ai: 2,
			team: [
				{ sp: 'bewear', lv: 67, moves: ['hammerarm', 'doubleedge', 'payback', 'bulkup'] },
				{ sp: 'corviknight', lv: 67, moves: ['bravebird', 'ironhead', 'bodypress', 'drillpeck'] },
			],
			intro: 'Soy de Kalos, como tú. Me dijeron que en Galar los Pokémon se hacen enormes. Me compré una mochila más grande. Por si acaso. ¡Combate!',
			win: 'La mochila no ha servido de nada. Pero es muy bonita.',
			look: { hair: 'bob', hairColor: '#e9c46a', outfit: '#3b5bb5', outfit2: '#e9e8e0', skin: 1, eyesStyle: 'big', mouth: 'open', acc: 'beanie', capColor: '#c43a3a', collar: 'hoodie' } },
		silv_duncan: { name: 'Duncan', cls: 'Ornitólogo', ai: 2,
			team: [
				{ sp: 'unfezant', lv: 67, moves: ['hurricane', 'return', 'uturn', 'roost'] },
				{ sp: 'braviary', lv: 68, moves: ['bravebird', 'superpower', 'crushclaw', 'tailwind'] },
			],
			intro: 'Llevo la cuenta de los Corviknight taxi que pasan por aquí. Hoy, cuarenta y uno. Uno llevaba un piano. ¡Combate, que me desconcentro!',
			win: 'Cuarenta y dos. Ha pasado otro mientras me ganabas. No me ha dado tiempo a ver qué llevaba.',
			look: { hair: 'short', hairColor: '#9aa0a8', outfit: '#5a6a3a', outfit2: '#c9a66b', skin: 1, eyesStyle: 'normal', mouth: 'flat', acc: 'glasses hat', hatColor: '#5a6a3a', collar: 'vest' } },
		silv_glen: { name: 'Glen', cls: 'Técnico de mediciones', ai: 3,
			team: [
				{ sp: 'klinklang', lv: 67, moves: ['geargrind', 'wildcharge', 'shiftgear', 'thunderwave'] },
				{ sp: 'bronzong', lv: 67, moves: ['gyroball', 'psychic', 'earthquake', 'lightscreen'] },
				{ sp: 'magnezone', lv: 68, moves: ['flashcannon', 'thunderbolt', 'bodypress', 'voltswitch'] },
			],
			intro: 'Mido la energía que sale de los nidos. Antes medía para la empresa de la torre. Ahora mido para quien pague. Las agujas son las mismas. ¡Combate!',
			win: 'Pitan las agujas. Siempre pitan cuando alguien pierde cerca de un nido. Será una casualidad.',
			look: { hair: 'short', hairColor: '#2a2420', outfit: '#3a3a4a', outfit2: '#f2c84a', skin: 2, eyesStyle: 'narrow', mouth: 'flat', acc: 'goggles', collar: 'vest' } },

		// ----- Nido de la Pradera (zona de entrenamiento) -----
		nido_galar_1: { name: 'Fiona', cls: 'Investigadora de nidos', ai: 2,
			team: [
				{ sp: 'drednaw', lv: 66, moves: ['liquidation', 'rockslide', 'crunch', 'headsmash'] },
				{ sp: 'eldegoss', lv: 67, moves: ['energyball', 'hypervoice', 'pollenpuff', 'cottonguard'] },
			],
			intro: 'Practicamos aquí lo que haríamos dentro de un nido: aguantar, aguantar y aguantar. ¿Tú aguantas?',
			win: 'Aguantas. Y además pegas. Eso no estaba en la práctica.',
			look: { hair: 'ponytail', hairColor: '#c4743a', outfit: '#3aa3a0', outfit2: '#e9e8e0', skin: 1, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses', collar: 'coat' } },
		nido_galar_2: { name: 'Rory', cls: 'Fotógrafo de incursiones', ai: 2,
			team: [
				{ sp: 'coalossal', lv: 67, moves: ['heatcrash', 'stoneedge', 'flamethrower', 'stealthrock'] },
				{ sp: 'sandaconda', lv: 67, moves: ['earthquake', 'rockslide', 'glare', 'coil'] },
			],
			intro: 'Hago fotos de Pokémon enormes. Para practicar, hago fotos de combates normales y luego las amplío. Sonríe. ¡Combate!',
			win: 'Ha salido movida. Has ganado tan deprisa que ha salido movida.',
			look: { hair: 'curly', hairColor: '#2a2420', outfit: '#5a3a2a', outfit2: '#e9c46a', skin: 4, eyesStyle: 'happy', mouth: 'grin', acc: 'cap', capColor: '#3a3a4a', collar: 'vest' } },
		nido_galar_3: { name: 'Isla', cls: 'Guía de incursiones', ai: 3,
			team: [
				{ sp: 'hatterene', lv: 67, moves: ['dazzlinggleam', 'psychic', 'mysticalfire', 'calmmind'] },
				{ sp: 'flapple', lv: 67, moves: ['dragonrush', 'acrobatics', 'uturn', 'dragondance'] },
				{ sp: 'toxtricity', lv: 68, moves: ['overdrive', 'sludgewave', 'boomburst', 'voltswitch'] },
			],
			intro: 'Cuatro entrenadores contra un Pokémon gigante: así se entra en un nido. Hoy somos tú y yo. Y yo hago de gigante.',
			win: 'Bueno. Hoy el gigante eres tú. Me apunto tu nombre para la próxima incursión.',
			look: { hair: 'long', hairColor: '#8a3a8a', outfit: '#2b2b38', outfit2: '#c43a7a', skin: 2, eyesStyle: 'sharp', mouth: 'smile', acc: 'headphones', collar: 'jacket' } },

		// ----- Liga de los Siete Oficios (todos opcionales y amistosos; curan antes) -----
		herrera_oficio: { name: 'Bronwen', cls: 'Herrera', ai: 3, iv: 26, bg: 'indoor',
			team: [
				{ sp: 'bronzong', lv: 66, moves: ['gyroball', 'psychic', 'earthquake', 'trickroom'], ability: 'levitate', nature: 'relaxed' },
				{ sp: 'copperajah', lv: 68, moves: ['ironhead', 'heavyslam', 'superpower', 'rockslide'], ability: 'sheerforce', nature: 'adamant', iv: 28 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'El hierro se templa a golpes. La gente también. Veamos de qué está hecho lo tuyo.',
			win: 'Buen temple. Te doblas, pero no te partes. Eso en mi oficio es lo único que importa.',
			lose: 'Te has partido. No pasa nada: el hierro partido se vuelve a fundir. Vuelve cuando estés más caliente.',
			look: { hair: 'tied', hairColor: '#3a2a2a', outfit: '#5a3a2a', outfit2: '#c43a3a', skin: 2, eyesStyle: 'sharp', mouth: 'flat', acc: 'goggles scar', collar: 'apron' } },
		carpintero_oficio: { name: 'Abel', cls: 'Carpintero', npc: 'maestro_oficio', ai: 3, iv: 26, bg: 'indoor',
			team: [
				{ sp: 'sudowoodo', lv: 66, moves: ['woodhammer', 'stoneedge', 'suckerpunch', 'headsmash'], ability: 'sturdy', nature: 'adamant' },
				{ sp: 'trevenant', lv: 67, moves: ['woodhammer', 'shadowclaw', 'hornleech', 'willowisp'], ability: 'naturalcure', nature: 'adamant' },
				{ sp: 'conkeldurr', lv: 68, moves: ['hammerarm', 'knockoff', 'stoneedge', 'icepunch'], ability: 'guts', nature: 'adamant', iv: 28 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Un banquillo de estadio aguanta a once jugadores gritando durante noventa minutos. A ver cuánto aguantas tú.',
			win: 'Aguantas más que un banquillo. Y no crujes. Bien.',
			lose: 'Has crujido. Un poco. Lija, barniz y vuelve.' },
		tintorera_oficio: { name: 'Ivy', cls: 'Tintorera', ai: 3, iv: 26, bg: 'indoor',
			team: [
				{ sp: 'flareon', lv: 66, moves: ['flareblitz', 'superpower', 'quickattack', 'facade'], ability: 'flashfire', nature: 'adamant' },
				{ sp: 'vaporeon', lv: 67, moves: ['surf', 'icebeam', 'shadowball', 'haze'], ability: 'waterabsorb', nature: 'modest' },
				{ sp: 'jolteon', lv: 68, moves: ['thunderbolt', 'shadowball', 'voltswitch', 'hypervoice'], ability: 'voltabsorb', nature: 'timid', iv: 28 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Rojo, azul y amarillo. Con estos tres se hace cualquier color. Bueno, casi cualquiera. Veamos qué color sacas tú.',
			win: 'Has sacado un color que no tengo en la tienda. Me lo apunto.',
			lose: 'Te ha desteñido un poco. Lávalo en frío y vuelve.',
			look: { hair: 'curly', hairColor: '#c43a7a', outfit: '#3a5ab5', outfit2: '#f2c84a', skin: 3, eyesStyle: 'happy', mouth: 'grin', acc: 'bandana freckles', collar: 'apron' } },
		naboru_oficio: { name: 'Naboru', cls: 'Líder', npc: 'naboru', ai: 4, iv: 27, reward: 4140, bg: 'indoor',
			team: [
				{ sp: 'torkoal', lv: 66, moves: ['lavaplume', 'earthpower', 'yawn', 'stealthrock'], ability: 'drought', item: 'heatrock', nature: 'bold', iv: 27 },
				{ sp: 'ninetales', lv: 67, moves: ['fireblast', 'extrasensory', 'solarbeam', 'willowisp'], ability: 'flashfire', nature: 'timid', iv: 28 },
				{ sp: 'arcanine', lv: 68, moves: ['flareblitz', 'extremespeed', 'wildcharge', 'crunch'], ability: 'intimidate', nature: 'adamant', iv: 28 },
				{ sp: 'centiskorch', lv: 69, moves: ['firelash', 'leechlife', 'powerwhip', 'crunch'], ability: 'flashfire', item: 'sitrusberry', nature: 'adamant', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'No es un combate de gimnasio. Mi gimnasio está en obras. Es un combate de caldera: se trata de ver quién mantiene el fuego sin que se le apague. Ni se le escape.',
			win: 'El fuego se ha mantenido. El tuyo. —Inclina la cabeza—. Disciplina. Se nota en cómo esperas tu turno.',
			lose: 'Se te ha escapado la presión al final. Respira. Vuelve. La caldera no tiene prisa. Yo tampoco.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== ÁREA SILVESTRE ===================
		b07_area_llegada: [
			{ set: { 'flag.b07_area_silvestre': true } },
			{ text: 'La hierba te llega a las rodillas y no se acaba nunca. A lo lejos, una torre en ruinas. Más lejos, un lago. Más lejos todavía, humo de chimeneas. Y por todas partes, el viento.' },
			{ text: 'En lo que tardas en atarte una bota, empieza a llover, para, sale el sol y se levanta niebla en una colina. Un Wooloo pasa a tu lado sin inmutarse.' },
			{ say: 'rotom', text: '¡Bzzt! ¡El **Área Silvestre**! Dicen que el tiempo cambia cada media hora. Yo he contado tres cambios en un minuto. Creo que los cuentan a la galesa. ¡O a la galaresa!', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. El Área Silvestre. Llueve. Ya no. Sí. —Pausa—. No sé qué apuntar. Apunto «tiempo».', cond: PURG },
			{ say: 'rotom', text: 'Las columnas de luz roja son **nidos**. Ahí dentro duermen Pokémon que se hacen enormes, como con la Maximuñequera. Al norte está **Ciudad Pistón**.' },
			{ if: LUC, then: [
				{ text: '{riolu} mira una de las columnas rojas sin parpadear. Tiene el pelo de la nuca de punta. No gruñe: escucha, como se escucha un ruido muy grave que no se oye con los oídos.' },
			] },
		],
		b07_nido_bewear: [
			{ text: 'Te acercas al círculo de piedras negras. La luz roja sube de un agujero en el suelo, ancho como una mesa, y late despacio. Dentro, abajo del todo, algo respira. Las piedras están calientes.' },
			{ say: 'rotom', text: '¡Bzzt! Leo… mucha energía. Muchísima. Lo que hay dentro se va a hacer enorme en cuanto le molestemos. Si le molestamos. ¿Le molestamos?', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Mucha energía. Algo grande. ¿Bajamos? Decide tú.', cond: PURG },
			{ prompt: 'La luz roja late. Algo se mueve dentro del nido.', choice: [
				{ text: 'Asomarse al nido.', then: [
					{ text: 'Te inclinas sobre el agujero. La luz te da en la cara. Y de golpe, con un rugido que hace temblar la hierba de alrededor, algo sale del nido hinchándose, creciendo, hasta tapar el sol: un **Bewear** del tamaño de una casa, rodeado de nubes rojas.' },
					{ wild: { sp: 'bewear', lv: 66, gimmick: 'dynamax', unique: false }, canRun: true,
						onWin: [{ set: { 'flag.b07_nido_bewear': true } }, { text: 'El Bewear se deshincha, se sacude y se va andando hacia la pradera, muy digno, como quien sale de una siesta que le han estropeado. La luz del nido se apaga.' }],
						onCatch: [{ set: { 'flag.b07_nido_bewear': true } }, { text: 'La luz del nido se apaga. Dentro solo queda un hueco en la tierra, todavía tibio.' }],
						onRun: [{ text: 'Te alejas. El Bewear se deshincha despacio y vuelve a meterse en el nido, refunfuñando. La luz sigue latiendo.' }],
						onLose: [{ text: 'El Bewear gigante te aparta de un manotazo y vuelve a su nido. La luz sigue latiendo. Estará ahí cuando vuelvas. Él no se va a ninguna parte.' }] },
				] },
				{ text: 'Mejor no despertarlo.', then: [{ text: 'Te apartas del círculo. La luz sigue latiendo, tranquila. Lo que hay dentro no se ha enterado de nada. O hace como que no.' }] },
			] },
		],
		b07_nido_drednaw: [
			{ text: 'Entre los juncos, el nido echa luz roja hacia arriba y el agua tiembla alrededor, como si hirviera sin estar caliente. Huele a algas y a piedra mojada. Algo con concha golpea el fondo, toc, toc, toc.' },
			{ prompt: 'El agua del nido tiembla.', choice: [
				{ text: 'Meter la mano en el agua.', then: [
					{ text: 'El agua está fría. Durante un segundo, nada. Luego el nido revienta en una columna de agua y luz roja, y de dentro sale, creciendo hasta tapar medio lago, un **Drednaw** con la concha cubierta de nubes rojas. Abre la boca. No es para saludar.' },
					{ wild: { sp: 'drednaw', lv: 67, gimmick: 'dynamax', unique: false }, canRun: true,
						onWin: [{ set: { 'flag.b07_nido_drednaw': true } }, { text: 'El Drednaw se deshincha con un ruido de globo y se hunde en el lago, ofendido. La luz del nido se apaga. Los juncos dejan de temblar.' }],
						onCatch: [{ set: { 'flag.b07_nido_drednaw': true } }, { text: 'El nido se queda a oscuras. Solo se oye el lago lamiendo los juncos.' }],
						onRun: [{ text: 'Te apartas del agua. El Drednaw se deshincha y vuelve al nido de un chapuzón. La luz roja vuelve a temblar.' }],
						onLose: [{ text: 'El Drednaw gigante te echa del nido de un cabezazo de agua. Vuelve al fondo. La luz sigue temblando.' }] },
				] },
				{ text: 'Seguir el camino.', then: [{ text: 'Sigues por la orilla. Detrás, el toc, toc, toc del fondo del nido. Paciente.' }] },
			] },
		],
		b07_nido_apagado: [
			{ text: 'El nido está apagado. Un círculo de piedras negras alrededor de un agujero tibio. Dentro, nada. Bueno, algo de pelo. O de algas.' },
		],
		b07_pradera_llegada: [
			{ set: { 'flag.b07_pradera_llegada': true } },
			{ text: 'Bajas por la ladera. Wooloo por todas partes, pastando, dormidos o rodando cuesta abajo sin querer. Bajo un roble viejo crecen setas. Una de ellas brilla con una luz rojiza, como una brasa.' },
			{ text: 'Y en mitad de la pradera, quieta, una oveja grande que no se parece a las demás: tiene la lana dura, transparente, como si fuera de cristal tallado, y en la cabeza un brillo que cambia de color. Los Wooloo se mantienen lejos de ella. Muy lejos.' },
			{ say: 'rotom', text: '¡Bzzt! Ese Dubwool… no sale en mi base de datos de Galar. O sea, sí sale. Pero así, no. Brilla como los Pokémon de Fisura que vimos en Teselia. Es de los que llegan de **otro sitio**.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Esa oveja brilla. Como las de las Fisuras. No es de aquí. Creo.', cond: PURG },
		],
		b07_tera_dubwool: [
			{ text: 'Te acercas despacio. La oveja de cristal no huye. Te mira. La lana le tintinea como un móvil de campanillas. Encima de la cabeza le flota algo parecido a una corona de cristal, morada, que no hace sombra.' },
			{ if: LUC, then: [
				{ text: '{riolu} se pone delante de ti con las orejas pegadas a la cabeza. El aura le sale sola, azul, en la palma. La oveja da un paso hacia atrás. No es miedo. Es como si le hubiera reconocido algo.' },
			] },
			{ set: { 'flag.b07_tera_visto': true } },
			{ text: 'Y de pronto, la corona se rompe en mil reflejos y la oveja entera se cubre de cristal: un **Dubwool** teracristalizado, que brilla con el morado de los fantasmas.' },
			{ wild: { sp: 'dubwool', lv: 67, gimmick: 'tera', tera: 'Ghost' }, canRun: true,
				onCatch: [{ set: { 'flag.b07_dubwool_tera': true } }, { say: 'rotom', text: '¡Bzzt! ¡Lo tenemos! Sigue brillando un poco por dentro de la Poké Ball. Lo apunto como «oveja con fantasma». Es lo más preciso que se me ocurre.', cond: '!' + PURG }, { say: 'rotom', text: 'Bzzt. Lo tenemos. Brilla un poco. Lo apunto.', cond: PURG }],
				onWin: [{ text: 'El cristal se deshace en polvo morado. El Dubwool sacude la lana, que vuelve a ser lana, y se va trotando hacia los otros Wooloo. Esta vez no se apartan.' }],
				onRun: [{ text: 'Te alejas. El Dubwool se queda quieto, brillando, en mitad de la pradera. Como si esperara a alguien. Puede que a ti.' }],
				onLose: [{ text: 'El Dubwool de cristal te aparta con un empujón frío, como de niebla, y se queda donde estaba. Brillando.' }] },
		],
		b07_taxista: [
			{ set: { 'flag.b07_taxi_visto': true } },
			{ text: 'En la caseta de la parada, un hombre con chaqueta de aviador y una gorra con alas bordadas lee el periódico. El Corviknight del tejado abre un ojo cuando llegas. Luego lo vuelve a cerrar.' },
			{ say: 'taxista_galar', text: 'Corviknight Taxi, parada de la Pradera. Llevo treinta años volando gente por Galar. Ahora el taxi lleva él solo la caja y yo me quedo aquí, con los que entrenan. Les enseño a volar. Bueno, a sus Pokémon.' },
			{ say: 'taxista_galar', text: 'Si ganas tres combates en la práctica de nido, te doy algo. Sé de alas. Treinta años mirando desde abajo cómo vuela un pájaro de acero se aprende mucho.' },
			{ if: 'flag.mount_aerodactyl', then: [
				{ say: 'taxista_galar', text: '¿Eso es un Aerodactyl? ¿Lo montas? —Se quita la gorra—. Pues ten cuidado al aterrizar en Pistón. La torre del reloj está más baja de lo que parece. A uno de mis chicos le ha costado dos plumas.' },
			] },
		],
		b07_premio_nido: [
			{ set: { 'flag.b07_premio_nido': true } },
			{ say: 'taxista_galar', text: 'Tres seguidas. Ni has mirado el cielo para pedir ayuda. —Dobla el periódico—. Los que aguantan en el nido son los que no miran arriba.' },
			{ text: 'Abre una caja de herramientas llena de plumas de acero numeradas. Debajo, envuelto en una gamuza, hay un disco plano con dos alas grabadas.' },
			{ say: 'taxista_galar', text: 'Mis Corviknight la aprenden de pollitos. Dos aletazos seguidos: uno para levantar, otro para pegar. Si tienes algo con alas, se la enseñas. Si no tiene alas, pero se lo cree, también.' },
			{ give: 'b07_mt_ala_bis' },
			{ say: 'taxista_galar', text: '**Ala Bis**. A tu Aerodactyl le va a gustar. A los Pokémon que vuelan de verdad siempre les gusta pegar dos veces.' },
		],
		b07_leilani_taxi: [
			{ set: { 'flag.b07_leilani_taxi': true } },
			{ text: 'Le haces una foto al Corviknight del tejado, con su caja amarilla y su taxista leyendo el periódico debajo. Se la mandas a Leilani. La respuesta llega antes de que guardes la Pokédex.' },
			{ say: 'leilani', as: 'Leilani (mensaje)', text: '¡¿QUÉ?! ¿Un pájaro de acero que lleva una caja con gente dentro? ¿Y la gente lee el periódico? ¿Sí o qué? ¡Eso es un Ride Gear con alas! ¡Eso es MI IDEA pero con un pájaro!' },
			{ say: 'leilani', as: 'Leilani (mensaje)', text: 'Pregúntale cómo ata la caja. No. No le preguntes. Sí. Pregúntale. Mándame una foto del arnés. De cerca. Con flash. Soldi dice que no hace falta flash. Soldi no tiene sentido del drama.' },
			{ af: { leilani: 1 } },
		],

		// =================== CIUDAD PISTÓN: LLEGADA ===================
		b07_piston_llegada: [
			{ set: { 'flag.b07_piston_llegada': true } },
			{ text: 'Cruzas el puente de hierro y Pistón te recibe con un soplido de vapor que sale de una alcantarilla. Ladrillo rojo, trenes por encima de los tejados, un olor a carbón y a pan caliente. En las farolas cuelgan banderines: «**APERTURA DE LA TEMPORADA** · Estadio de Pistón · Hoy, 17:30».' },
			{ text: 'En una esquina, un hombre altísimo con una capa roja llena de parches de patrocinadores y una gorra de visera mira un mapa de la ciudad del revés. Le da la vuelta. Lo vuelve a girar. Lo mira de lado.' },
			{ say: 'lionel', text: '¡Perdona! ¿El estadio? Es un edificio grande, con un tejado de cristal, y yo tengo que estar dentro en… —mira el reloj— …hace diez minutos. Lo he visto desde el tren. Luego he bajado del tren y ya no.' },
			{ text: 'Señalas el tejado de cristal, que asoma tres calles más allá, enorme, por encima de todo.' },
			{ say: 'lionel', text: '¡Ese! ¡Gracias! —Echa a correr en dirección contraria. Para. Vuelve. Corre en la dirección buena—. ¡Nos vemos dentro! ¡Va a ser una temporada de campeones!' },
			{ say: 'rotom', text: '¡Bzzt! Ese era **Lionel**. El Campeón de Galar. El que no ha perdido un combate oficial en diez años. Y se ha perdido en su propia ciudad. —Pausa—. Lo apunto con cariño.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Era Lionel. El Campeón. Se ha perdido. Lo apunto.', cond: PURG },
			{ say: 'rotom', text: 'La **Apertura de la Temporada** es en el **estadio**. Renata dijo que estaría en la grada de prensa, con Nico y la Tía Rosa. Y el gimnasio de Pistón… —lee algo— …está «en obras de temporada». El líder, Naboru, «atiende en las calderas».' },
			{ quest: 'b07_m2', stage: 'apertura' },
			{ diary: 'Hoy cruzamos el Área Silvestre. Llovió. Sol. Lluvia. Niebla. Conté seis. {riolu} se sacudió seis veces.\n\nAhora estamos en Pistón. Huele a carbón. Hay trenes encima de las casas. Me gusta el ruido. No sé por qué me gusta.', cond: D_PURGADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo cruzamos el Área Silvestre de punta a punta: seis cambios de tiempo en una tarde, nidos con luz roja y Corviknight que llevan cajas con gente dentro. Llegamos a Ciudad Pistón con la ropa mojada. El Campeón de Galar nos preguntó por el estadio. Lo tenía detrás.\n\nHoy es la Apertura de la Temporada. Renata emite desde allí.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo cruzamos el Área Silvestre. ¡Es enorme! Llovió, nevó un poquito y salió el sol, todo en la misma tarde. ¡Y hay pájaros de metal que hacen de taxi! Ahora estamos en Ciudad Pistón, que huele a chimenea y a pan. ¡Hoy hay fiesta en el estadio!', cond: D_DOBLE },
		],
		b07_piston_pendiente: [
			{ say: 'rotom', text: '¡Bzzt! Cosas de Pistón:', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Lista:', cond: PURG },
			{ say: 'rotom', text: '• La **Apertura de la Temporada**, en el **estadio**. Renata emite en directo.', cond: '!flag.b07_apertura' },
			{ say: 'rotom', text: '• El **marcador** del estadio le está contestando a Renata. Hay que averiguar cómo antes de las **18:40**.', cond: MARCADOR },
			{ say: 'rotom', text: '• La **Liga de los Siete Oficios**: convencer a cuatro maestros. Llevamos {vars.b07_oficios_n}.', cond: 'quest.b07_s_oficios == "maestros"' },
			{ say: 'rotom', text: '• Los maestros nos esperan en la **taberna de curri**. ¡Con té!', cond: 'quest.b07_s_oficios == "sello"' },
			{ say: 'rotom', text: '• En la **carpintería** hay un Pokémon pequeño que toca el tambor. Fatal.', cond: '!flag.b07_grookey && !flag.b07_grookey_vive' },
			{ say: 'rotom', text: '• **Gaspar** está en la taberna de curri. Mirando cocinar a alguien. Con envidia.', cond: '!flag.b07_gaspar_galar' },
			{ say: 'rotom', text: '• **Naboru**, el líder, está en las **calderas**. Su gimnasio, en obras. Habrá que volver otra vez a Galar para ese.', cond: '!flag.b07_naboru_visto' },
			{ say: 'rotom', text: '• Al norte, por la **Ruta 3**, se va hacia **Pueblo Hoyuelo**. Rhi nos espera.', cond: 'quest.b07_m3 == "hoyuelo"' },
			{ say: 'rotom', text: '• Quintana nos ha escrito desde **Pueblo Plié**. Hay tren en la estación.', cond: 'flag.b07_t1_hecho && quest.b07_s_casa == "carta"' },
		],

		// =================== LA APERTURA DE LA TEMPORADA ===================
		b07_apertura: [
			{ set: { 'flag.b07_apertura': true } },
			{ text: 'El estadio está lleno hasta la última fila. Cuarenta mil personas con bufandas de colores, tambores, Wooloo con camisetas, hinchas del Team Yell con la cara pintada. El césped huele a recién cortado. En el fondo norte, un **marcador gigante** pasa anuncios de bebidas y mensajes de la afición: «FELICIDADES, ABUELA DORIS», «TE QUIERO, KEVIN (NO ME ESCRIBAS)».' },
			{ text: 'A las 17:41, con once minutos de retraso, la megafonía se vuelve loca. Lionel sale por el túnel de vestuarios. Bueno, por el túnel de al lado. Lo devuelven al bueno. La grada se ríe con cariño, como quien se ríe de un hermano.' },
			{ say: 'lionel', as: 'Lionel (megafonía)', text: '¡Galar! ¡Bienvenidos a la Apertura de la Temporada! Este año tenemos aspirantes de todas las regiones, por la Gira. Kalos, Johto, Kanto, Alola, Teselia… ¡y alguno que ha llegado esta mañana por la estación! ¡Que gane quien más disfrute! ¡A disfrutar como campeones!' },
			{ if: LUC, then: [
				{ text: 'Desde el centro del campo, Lionel busca algo en la grada de los aspirantes. Te encuentra. Mira a {riolu}. Levanta el pulgar. {riolu} se lo devuelve, muy serio, como quien firma un contrato.' },
			] },
			// ----- Mireille calienta a los novatos -----
			{ text: 'En la banda, los aspirantes de la Gira calientan con sus Pokémon. Delante de todos, una chica pelirroja con cinta en la frente y un silbato los hace correr en círculos. Es **Mireille**, la monitora de la sala de pesas del ático de Philippe.' },
			{ say: 'mireille', text: '¿Tú? —Te ve y no deja de pitar—. La Gira me ha contratado para calentar a los novatos. Dicen que en Galar los Pokémon «se hacen grandes». Yo digo que grandes no: hinchados. Lo grande se entrena.' },
			{ say: 'mireille', text: 'Te lo explico una vez bien y ya: el Dinamax dura **tres turnos**. Ni uno más. Si lo usas el primero, el rival lo sabe. Si lo usas el último, ya no hace falta. Úsalo cuando el otro esté a punto de respirar. —Pita—. Para eso cobro.' },
			{ set: { 'flag.b07_mireille_galar': true } },
			{ intel: { npc: 'mireille', text: 'La Gira la ha contratado para calentar a los aspirantes en la Apertura de Pistón. Consejo del Dinamax: tres turnos, ni uno más; «úsalo cuando el otro esté a punto de respirar».' } },
			// ----- La grada de prensa -----
			{ text: 'Arriba, en la grada de prensa, alguien agita un micrófono por encima de la cabeza como si fuera una bengala. Gabardina mostaza, gafas redondas, rizos imposibles. Te hace un gesto: «sube».' },
			{ text: 'La cabina de prensa es un cuartito con un cristal al campo, dos mesas, una maraña de cables y un termo. Renata tiene los pies encima de la mesa. Nico, con los cascos puestos, ajusta botones. La Tía Rosa teje algo amarillo con agujas muy gordas.' },
			// FUERA DE MICRO
			{ say: 'renata', text: '¡{jugador}! Cool, cool, cool. Has llegado. A las 18:05 entramos en directo, para Teselia y para medio Galar, que aquí se escucha *Casos Fríos* en los trenes. Tema de hoy: «el Circuito y sus misterios». Tú eres el misterio. No te pongas nervios{o|a|e}.' }, // FUERA DE MICRO
			{ if: 'flag.b06_renata_grabadora', then: [
				{ text: 'Colgada del cuello, encima de los auriculares, Renata lleva la grabadora vieja de casete, la gris con la pegatina de Zorua. Apagada. Te ve mirarla y se la mete por dentro de la gabardina sin decir nada.' },
			] },
			{ if: 'flag.b06_cinta_ep3', then: [
				{ text: 'En la mochila de Renata, abierta en el suelo, asoma una cinta de casete con una pegatina amarilla. «EP. 3». Renata la empuja hacia dentro con el pie. No explica nada. No le preguntas.' },
			] },
			{ say: 'nico_ferrer', text: 'Hola. Sí. Hola. —Se quita un casco—. Nivel de sonido de la grada: un Exploud con hipo. Me encanta.' }, // FUERA DE MICRO
			{ say: 'nico_ferrer', text: 'Y esta vez vienes con el horario aprendido. Lo de la noria, en Mayólica. Sigo contándolo en las cenas. Nadie me cree que alguien leyera un horario.', cond: 'flag.b06_noria_antes' }, // FUERA DE MICRO
			{ say: 'tia_rosa', text: 'Cariño, siéntate, que estás de pie como un Wooloo en una boda. ¿Has comido? En Galar se come a las cinco y luego otra vez a las siete. No es vicio. Es el frío.' }, // FUERA DE MICRO
			// ----- Tadeo -----
			{ text: 'Llaman a la puerta de la cabina, dos golpecitos suaves. Asoma una cabeza con el pelo engominado, la raya muy marcada y un bigote fino. Lleva un guion bajo el brazo y una acreditación del **Musical de Mayólica** colgada del cuello.' },
			{ say: 'tadeo', text: '¡Señorita Castellanos! Perdone que interrumpa. El Musical hace el descanso de hoy, un fragmento de «La dama de la luna». Me he enterado de que estaba usted aquí y no podía no saludar.' }, // FUERA DE MICRO
			{ say: 'tadeo', text: '¿Y Nico? ¿Qué tal ese oído? ¿Sigue reconociendo a la gente por la tos? —Se ríe bajito—. Y usted, doña Rosa, ¿cómo va la tos? La del faro. Me acuerdo de que se le atragantó una galleta. Me hizo mucha gracia. Con todo el respeto.' }, // FUERA DE MICRO
			{ say: 'tia_rosa', text: 'Ay, qué memoria tiene este hombre. Ya ni me acordaba yo.' }, // FUERA DE MICRO
			{ say: 'tadeo', text: 'Deformación profesional: me lo sé todo de memoria. —Te ve—. ¡Y usted también está! Qué alegría. Bueno, me voy al foso, que a las 18:15 entramos y no me he perdido un pie en quince años. ¡Mucha suerte! Bueno, en el teatro se dice otra cosa, pero no delante de doña Rosa.' },
			{ text: 'Se va por el pasillo, despacio, con el guion bajo el brazo, saludando a todo el mundo por su nombre.' },
			{ set: { 'flag.b07_tadeo_galar': true, 'flag.b07_renata_galar': true } },
			{ call: 'b07_directo' },
		],
		b07_directo: [
			{ text: 'Las 18:05. Nico levanta tres dedos. Dos. Uno. Se enciende una luz roja encima del cristal.' },
			// EN ANTENA ------------------------------------------------------------
			{ say: 'renata', as: 'Renata (en directo)', text: '¡Buenas tardes, Teselia! ¡Y buenas tardes, Galar, que me dicen que nos oyen en los trenes! Esto es *Casos Fríos*, en directo especial desde la Apertura de la Temporada, en Ciudad Pistón. Hoy: el Circuito y sus misterios. Y conmigo, mi colaborador{|a|e} de siempre. {jugador}, saluda a los trenes.' }, // EN ANTENA
			{ choice: [
				{ text: '«Hola, trenes. Agárrense.»', then: [
					{ af: { renata: 1 } },
					{ say: 'jugador', text: 'Hola, trenes. Agárrense, que vienen curvas.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: '¡Ha saludado a los trenes! Oyentes del de las seis y diez: les ha dicho que se agarren. Háganle caso. Cool, cool, cool.' }, // EN ANTENA
				] },
				{ text: 'Saludar normal.', then: [
					{ say: 'jugador', text: 'Hola a todos. Buenas tardes desde Pistón.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: 'Clásico. Elegante. Como un buen abrigo. Seguimos.' }, // EN ANTENA
				] },
			] },
			{ text: 'En el marcador gigante, en la franja de mensajes de la afición, sale una línea nueva: **BUENAS TARDES, CASOS FRÍOS. SE LES OYE MUY BIEN DESDE AQUÍ.** La grada aplaude, divertida. Renata le lanza un beso al cristal.' },
			{ text: 'A las 18:08: **¿SEGURA, SEÑORITA CASTELLANOS?** Renata, en antena, se ríe. A las 18:12: **ESO NO LO DIJO EL MARTES.** Renata ya no se ríe. Sigue hablando sin cambiar el tono, como una profesional. Debajo de la mesa, el pie le da golpecitos al suelo.' },
			{ cutscene: { time: 'tarde', bg: { type: 'plaza', ground: '#3a8a4a', far: '#2b2b38' }, frames: [
				{ actors: [{ id: 'renata', at: 'left', enter: 'none' }], say: 'renata', as: 'Renata (en directo)', cam: 'still', text: 'Y aquí, oyentes, viene lo bueno. Nota para el episodio: aquí hay gato encerrado.' }, // EN ANTENA
				{ cam: 'pan-up', fx: 'flash', color: '#f2c84a', text: 'Un minuto después, a las 18:16, el marcador gigante parpadea. En letras de dos metros, delante de cuarenta mil personas: **NOTA PARA EL EPISODIO: AQUÍ HAY GATO ENCERRADO.**' },
				{ actors: [{ key: 'renata', do: 'shake', emote: '!' }], cam: 'push', fx: 'heartbeat', color: '#c4473a', text: 'Renata se queda con la boca abierta. Cuarenta mil personas leen su frase. Ella la lee la última.' },
				{ cam: 'still', text: '18:19. El marcador, otra vez: **CUIDADO CON LOS HORARIOS. SON PÚBLICOS.**' },
				{ actors: [{ key: 'renata', do: 'turn' }], cam: 'pull', text: 'Renata pulsa un botón sin mirar. La luz roja se apaga. Publicidad.' },
			] } },
			// FUERA DE MICRO -------------------------------------------------------
			{ say: 'renata', text: 'Micro apagado. —Ya no sonríe—. Me está contestando. Con un minuto de retraso. A frases que acabo de decir. En un marcador de cuarenta mil personas.' }, // FUERA DE MICRO
			{ say: 'nico_ferrer', text: 'La franja de la afición. Se compran los mensajes en una ventanilla del vestíbulo y salen cuando toca. —Se rasca la nuca—. Pero eso sería con días de antelación. Y esto es ahora.' }, // FUERA DE MICRO
			{ say: 'renata', text: 'Es él. El de la concha. «El segundo se representa en otra región. Con más público». Más público que esto no hay. —Respira—. Yo tengo que volver a antena hasta las **18:40**. No puedo moverme de esta silla.' }, // FUERA DE MICRO
			{ say: 'renata', text: 'Tú sí. Sé mis piernas. Averigua cómo lo hace antes de que termine el directo. Si tiene un último mensaje preparado, quiero quitárselo. —Te mira por encima de las gafas—. Cool. Ve. Ya.' }, // FUERA DE MICRO
			{ set: { 'flag.b07_marcador_activo': true, 'vars.b07_marcador_min': 0 } },
			{ quest: 'b07_t_apuntador', stage: 'estadio' },
			{ say: 'rotom', text: '¡Bzzt! Son las **18:20**. El directo termina a las **18:40**. Cada cosa que miremos son unos seis minutos, entre ir y volver por las escaleras. Calculo que nos da para **tres**. ¡Corre! Bueno, corre tú. Yo vuelo.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Las 18:20. Termina a las 18:40. Cada cosa, seis minutos. Tres cosas. Vamos.', cond: PURG },
		],

		// ----- El reloj del directo -----
		b07_marcador_tic: [
			{ set: { 'vars.b07_marcador_min': '+1' } },
			{ if: 'vars.b07_marcador_min == 1', then: [
				{ text: '18:26. Por el cristal del vestíbulo se ve el marcador: **EL PRIMER ACTO FUE SUYO.** Y justo después: **¿Y SI LA CONCHA ESTÁ EN LA GRADA?** Media grada se gira a mirar a la otra media.' },
				{ say: 'rotom', text: '¡Bzzt! Las 18:26. Nos quedan dos cosas. A lo mejor tres si la última es muy rápida.', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. 18:26. Dos cosas.', cond: PURG },
			] },
			{ if: 'vars.b07_marcador_min == 2', then: [
				{ text: '18:30. En el marcador: **APLAUDAN AL MARCADOR. TRES VECES. DESPACIO.** Y la grada, que no sabe nada, aplaude tres veces, despacio. A las 18:33: **QUEDA POCO.**' },
				{ say: 'rotom', text: '¡Bzzt! ¡Las 18:33! ¡Una cosa más y se acaba!', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. 18:33. Una más.', cond: PURG },
			] },
			{ if: 'vars.b07_marcador_min >= 3 && !flag.b07_apuntador_vencido_2', then: [{ call: 'b07_marcador_1840' }] },
		],
		b07_marcador_tablon: [
			{ text: 'El tablón del vestíbulo está lleno de papeles: objetos perdidos, una oferta de clases de tambor, un cartel de «SE BUSCA WOOLOO (RESPONDE A "GERALD")» y, en el centro, una hoja grande con el sello del estadio: la **escaleta** de la Apertura. Es pública. La puede leer cualquiera.' },
			{ give: 'escaletaapertura', silent: true, cond: '!has("escaletaapertura")' },
			{ read: 'escaletaapertura' },
			{ text: '«18:40 · Cierre de *Casos Fríos*». El final del directo de Renata, a la vista de todo el mundo. Y la franja de mensajes, «un mensaje por minuto», abierta hasta las 18:45.' },
			{ if: LUC, then: [{ text: '{riolu} pone el dedo, muy despacio, encima de «18:40». No lo quita.' }] },
			{ call: 'b07_marcador_tic' },
		],
		b07_marcador_ventanilla: [
			{ text: 'La ventanilla 3 tiene un cartel escrito a mano: «MENSAJES DE LA AFICIÓN · Un minuto, un mensaje · Se programan al minuto». Detrás del cristal, una mujer con chaleco del estadio hace un crucigrama.' },
			{ if: '!has("recibomarcador")', then: [
				{ say: 'ventanilla_piston', text: '¿Mensajes? Hoy ya no queda casi nada, cielo. Esto se vende con días. Mira, este señor compró doce de golpe. Pagó en efectivo, el importe exacto. Me acuerdo porque nadie paga el importe exacto.' },
				{ text: 'Te enseña una copia del recibo por el cristal. Luego, porque le caes bien o porque está aburrida, te la da.' },
				{ give: 'recibomarcador', silent: true },
				{ read: 'recibomarcador' },
				{ say: 'ventanilla_piston', text: 'Doce mensajes. El último, a las 18:40. Libres me quedan el 18:39, el 18:42 y el 18:44. —Vuelve al crucigrama—. Seis letras, «el que te sopla el texto desde abajo». Ni idea.', cond: '!has("escaletaapertura")' },
			] },
			{ if: 'has("escaletaapertura") && has("recibomarcador")', then: [
				{ text: 'Juntas las dos hojas en la cabeza. Doce mensajes comprados hace cinco días, cada uno a su minuto, para un directo cuyo horario estaba colgado en el tablón. El último, a las **18:40**: el cierre de *Casos Fríos*. La última palabra.' },
				{ text: 'Y el **18:39** está libre.' },
				{ prompt: 'La mujer de la ventanilla espera, con el bolígrafo del crucigrama en la mano.', choice: [
					{ text: 'Comprar el minuto 18:39.', then: [{ call: 'b07_marcador_compra' }] },
					{ text: 'Todavía no.', then: [
						{ say: 'ventanilla_piston', text: 'Tú verás. El 18:39 no se lo lleva nadie. Bueno, el reloj.' },
						{ call: 'b07_marcador_tic' },
					] },
				] },
			], else: [
				{ text: 'Doce mensajes, el último a las 18:40. Pero ¿qué tiene de especial ese minuto? Te falta algo para saberlo.', cond: 'has("recibomarcador")' },
				{ call: 'b07_marcador_tic' },
			] },
		],
		b07_marcador_chatot: [
			{ set: { 'flag.b07_chatot_oido': true } },
			{ text: 'En el vestíbulo, en una percha del Musical, un Chatot con lazo de terciopelo te mira de lado. Abre el pico y, con la voz de un regidor de teatro, recita:' },
			{ text: '«*¡Dieciocho cero cinco, Casos Fríos! ¡Dieciocho quince, descanso, el Musical! ¡Dieciocho cuarenta, cierre! ¡Dieciocho cuarenta, cierre! ¡Dieciocho cuarenta!*»' },
			{ say: 'actriz_musical', as: 'Actriz del Musical', text: '¿El Chatot? Se aprende la escaleta en cuanto la cuelgan. Nos avisa de las entradas. Lleva toda la semana con esa: «dieciocho cuarenta». Ya no lo aguantamos.' },
			{ call: 'b07_marcador_tic' },
		],
		b07_marcador_nico: [
			{ set: { 'flag.b07_nico_oido': true } },
			{ text: 'Vuelves corriendo a la cabina. Renata habla en antena sin mirarte. Nico se quita un casco y te pasa una libreta llena de columnas.' },
			// FUERA DE MICRO
			{ say: 'nico_ferrer', text: 'Lo he mirado mientras hablaba. «Nota para el episodio: aquí hay gato encerrado». La ha dicho en **treinta y un** episodios. Siempre en directo. Siempre a los **diez minutos** de empezar, cuando se le calienta la voz.' }, // FUERA DE MICRO
			{ say: 'nico_ferrer', text: 'O sea, que no le ha contestado a lo que acaba de decir. —Traga saliva—. Lo sabía antes. Cualquiera que escuche el programa lo sabría. Y sabía que hoy empezábamos a las 18:05.' }, // FUERA DE MICRO
			{ call: 'b07_marcador_tic' },
		],
		b07_marcador_esperar: [
			{ text: 'Vuelves a la grada de prensa y te sientas junto a la Tía Rosa, que te pasa una galleta sin dejar de tejer. Miras el marcador. Esperas.' },
			{ set: { 'vars.b07_marcador_min': 3 } },
			{ call: 'b07_marcador_1840' },
		],
		b07_marcador_compra: [
			{ set: { 'flag.b07_apuntador_vencido_2': true, 'vars.b07_marcador_min': 3 } },
			{ text: 'La mujer saca un formulario de debajo del mostrador. «Mensaje para el 18:39. Máximo cuarenta letras. En mayúsculas, que el marcador no tiene minúsculas». Te da el bolígrafo del crucigrama.' },
			{ prompt: '¿Qué escribes?', choice: [
				{ text: '«EL SEGUNDO ACTO TERMINA UN MINUTO ANTES.»', then: [{ set: { 'flag.b07_marcador_frase_1': true } }] },
				{ text: '«LOS HORARIOS SON PÚBLICOS. LOS NUESTROS, TAMBIÉN.»', then: [{ set: { 'flag.b07_marcador_frase_2': true } }] },
				{ text: '«APLAUDIMOS. TRES VECES. DESPACIO.»', cond: 'flag.b06_apuntador_3', then: [{ set: { 'flag.b07_marcador_frase_3': true } }] },
				{ text: '«NOS VEMOS EN EL TERCERO.»', cond: '!flag.b06_apuntador_3', then: [{ set: { 'flag.b07_marcador_frase_3': true } }] },
			] },
			{ text: 'La mujer lo teclea con dos dedos, muy despacio. «Programado. 18:39». Subes las escaleras de dos en dos.' },
			{ text: 'Llegas a la cabina a las 18:38. Renata te ve entrar, sudando, y sin dejar de hablar en antena levanta una ceja. Le señalas el marcador. Ella lo mira.' },
			{ text: '18:39. El marcador parpadea. Tu frase, en letras de dos metros: **EL SEGUNDO ACTO TERMINA UN MINUTO ANTES.**', cond: 'flag.b07_marcador_frase_1' },
			{ text: '18:39. El marcador parpadea. Tu frase, en letras de dos metros: **LOS HORARIOS SON PÚBLICOS. LOS NUESTROS, TAMBIÉN.**', cond: 'flag.b07_marcador_frase_2' },
			{ text: '18:39. El marcador parpadea. Tu frase, en letras de dos metros: **APLAUDIMOS. TRES VECES. DESPACIO.**', cond: 'flag.b07_marcador_frase_3 && flag.b06_apuntador_3' },
			{ text: '18:39. El marcador parpadea. Tu frase, en letras de dos metros: **NOS VEMOS EN EL TERCERO.**', cond: 'flag.b07_marcador_frase_3 && !flag.b06_apuntador_3' },
			{ text: 'Y un minuto después, a las 18:40, puntual como un tren, sale el último mensaje del de la concha, programado hace cinco días: **SEGUNDO ACTO PARA MÍ. EL TERCERO, EN CASA.**' },
			{ text: 'Pero ya no es la última palabra. Llega detrás de la tuya, como quien contesta tarde. Cuarenta mil personas lo leen así. Primero una risa en el fondo sur. Luego todo el estadio.' },
			// EN ANTENA ------------------------------------------------------------
			{ say: 'renata', as: 'Renata (en directo)', text: 'Oyentes, para los que van en tren y no lo ven: el marcador del estadio llevaba media hora contestándome. Y alguien de esta cabina le ha contestado a él. Un minuto antes. —Pausa de radio—. Llega usted tarde, señor de la concha. Un minuto.' }, // EN ANTENA
			{ say: 'renata', as: 'Renata (en directo)', text: 'Y ahora, para que conste en acta: ¿quién ha comprado el minuto 18:39?' }, // EN ANTENA
			{ af: { renata: 5 } },
			{ choice: [
				{ text: '«*Casos Fríos*. La idea fue de Renata.»', then: [
					{ af: { renata: 3 } },
					{ say: 'jugador', text: 'Lo ha comprado *Casos Fríos*. La idea fue de Renata: me mandó a mirar lo que nadie lee.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: '…Cool. —Muy bajito, casi sin micro—. Cool, cool, cool. Seguimos.' }, // EN ANTENA
				] },
				{ text: '«La grada de prensa. Y un Chatot.»', then: [
					{ af: { renata: 1 } },
					{ say: 'jugador', text: 'La grada de prensa entera. Y un Chatot del Musical, que se sabe la escaleta mejor que nadie.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: '¡Un Chatot! Nota para el episodio: contratar al Chatot. ¡Nico, apunta!' }, // EN ANTENA
				] },
				{ text: '«Yo. Lo he resuelto yo.»', then: [
					{ af: { renata: -5 } },
					{ set: { 'flag.b07_renata_dolida': true, 'vars.b07_af_renata_perdida': '+5' } },
					{ say: 'jugador', text: 'Yo. Lo he resuelto yo, desde la ventanilla.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: '«Yo». —Pausa de radio, larguísima—. Apuntado, oyentes. En el episodio saldrá así. Con su nombre. Solo el suyo.' }, // EN ANTENA
				] },
			] },
			{ call: 'b07_marcador_fin' },
		],
		b07_marcador_1840: [
			{ set: { 'flag.b07_apuntador_gana_2': true } },
			{ text: '18:40. Puntual como un tren, el marcador parpadea por última vez. En letras de dos metros, sobre cuarenta mil cabezas: **SEGUNDO ACTO PARA MÍ. EL TERCERO, EN CASA.**' },
			{ text: 'La grada aplaude sin saber por qué. Les parece parte del espectáculo. Lo es. En la cabina, Renata mira el marcador sin moverse, con el micro abierto, durante un segundo de más.' },
			// EN ANTENA ------------------------------------------------------------
			{ say: 'renata', as: 'Renata (en directo)', text: 'Oyentes, para los que van en tren: el marcador del estadio me ha estado contestando media hora. Y acaba de despedirse. —Respira—. Se lo concedo. Este acto es suyo. —Te mira—. {jugador}, ¿unas palabras para el marcador?' }, // EN ANTENA
			{ choice: [
				{ text: '«Que vaya barriendo la casa.»', then: [
					{ af: { renata: 1 } },
					{ say: 'jugador', text: 'Que vaya barriendo la casa. Vamos para allá.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: '¡Ja! «Que vaya barriendo». Nota para el episodio: esa frase va en la camiseta. Cool, cool, cool.' }, // EN ANTENA
				] },
				{ text: '«Le contestaremos el martes.»', then: [
					{ say: 'jugador', text: 'Le contestaremos el martes. Como siempre.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: 'El martes. A la hora de siempre. Que lo apunte, que le gusta mucho apuntar.' }, // EN ANTENA
				] },
				{ text: '«Esto no tiene ninguna gracia.»', then: [
					{ af: { renata: -2 } },
					{ set: { 'flag.b07_renata_dolida': true, 'vars.b07_af_renata_perdida': '+2' } },
					{ say: 'jugador', text: 'Esto no tiene ninguna gracia. Es un acosador con un marcador.' }, // EN ANTENA
					{ say: 'renata', as: 'Renata (en directo)', text: 'Ya. —El tono se le apaga, como una bombilla—. Bueno. Seguimos después de la publicidad.' }, // EN ANTENA
				] },
			] },
			{ call: 'b07_marcador_fin' },
		],
		b07_marcador_fin: [
			{ set: { 'flag.b07_marcador': true, 'flag.b07_marcador_activo': false } },
			{ say: 'renata', as: 'Renata (en directo)', text: 'Y hasta aquí *Casos Fríos* desde Pistón. Gracias, Galar. Gracias, trenes. Nos oímos el martes. —Clic—.' }, // EN ANTENA
			// FUERA DE MICRO -------------------------------------------------------
			{ text: 'La luz roja se apaga. Nico se quita los cascos y apoya la frente en la mesa. La Tía Rosa deja las agujas en el regazo por primera vez en toda la tarde.' },
			{ if: 'flag.b07_apuntador_vencido_2', then: [
				{ say: 'renata', text: 'Le hemos pisado el último verso. Un minuto. —Se ríe, de verdad, con la mano en la cara—. Lo tenía programado desde hace cinco días y le hemos pisado el último verso. Eso no se le olvida a nadie que escriba en mayúsculas.' }, // FUERA DE MICRO
			], else: [
				{ say: 'renata', text: 'No pasa nada. —Lo dice dos veces, la segunda para ella—. Lo tenía todo programado desde hace días. Nadie gana a alguien que ya ha jugado. Pero ahora sabemos cómo juega.' }, // FUERA DE MICRO
			] },
			{ say: 'nico_ferrer', text: 'No sabe nada que no hayamos dicho nosotros. —Lo dice mirando la libreta—. Solo lo que sale por el micro. Y los horarios. Lo que está colgado en un tablón.' }, // FUERA DE MICRO
			// ----- La carta 4 -----
			{ text: 'Llaman a la puerta. Es un muchacho de unos catorce años con una gorra del Team Yell puesta del revés y un sobre color crema en la mano.' },
			{ say: 'hincha_yell', as: 'Muchacho de la gorra', text: '¿*Casos Fríos*? Para ustedes. Me pagaron el jueves. En efectivo, en un sobre, en una taquilla de la estación. Ponía: «Entregar en la cabina de prensa cuando se apague la luz roja». —Se encoge de hombros—. Se ha apagado. Adiós.' },
			{ choice: [
				{ text: '«¿Quién te pagó?»', then: [{ say: 'hincha_yell', as: 'Muchacho de la gorra', text: 'Una taquilla. Ya te lo he dicho. Las taquillas no tienen cara. —Lo piensa—. El dinero estaba contado al céntimo. Eso sí.' }] },
				{ text: 'Darle las gracias.', then: [{ say: 'hincha_yell', as: 'Muchacho de la gorra', text: 'De nada. Es lo más fácil que he cobrado nunca. ¡Vamos, Crampón! —Se va corriendo.' }] },
			] },
			{ text: 'Renata abre el sobre con una uña. Papel color crema, grueso, como el de un programa de teatro. Máquina de escribir. Las «e» medio borradas. Te lo pasa sin leerlo entero: «Léelo tú. Yo ya lo he oído».' },
			{ give: 'cartaapuntador4' },
			{ read: 'cartaapuntador4' },
			{ set: { 'flag.b07_apuntador_4': true } },
			{ say: 'renata', text: '«Lo escribo el jueves, antes que nada». No sabía cómo iba a acabar el último minuto. —Dobla la carta—. Bien. Ya sé una cosa de él que él no sabe que sé.' }, // FUERA DE MICRO
			{ intel: { npc: 'renata', text: 'Segundo acto del Apuntador en la Apertura de Pistón: doce mensajes del marcador comprados en efectivo hace cinco días en la ventanilla 3 y programados al minuto con la escaleta pública del tablón. La frase «aquí hay gato encerrado» sale en 31 episodios, siempre a los diez minutos. La carta 4 se escribió antes del directo.' } },
			{ quest: 'b07_t_apuntador', stage: 'hecha', done: true },
			// ----- Petición de Renata (Confidente) -----
			{ if: 'af.renata >= 70 && !flag.b07_renata_peticion', then: [{ call: 'b07_renata_peticion' }] },
			// ----- Cierre de la Apertura -----
			{ text: 'Abajo, en el campo, Lionel despide la Apertura con la capa al viento y un Charizard que escupe fuego hacia el tejado de cristal. Cuando vuelve a los vestuarios, se equivoca de túnel otra vez. Esta vez la grada lo aplaude.' },
			{ text: 'Al salir de la cabina, por el pasillo de prensa, te lo encuentras de frente, buscando la salida con el mapa del revés.' },
			{ say: 'lionel', text: '¡Tú! ¡Los del marcador! Qué divertido ha sido. Pensaba que era parte del espectáculo. ¿Era parte del espectáculo? —Ni espera respuesta—. Oye, que el gimnasio de Pistón está en obras. Naboru no quiere a nadie en su estadio hasta que las calderas estén perfectas. Es así. Disciplina.' },
			{ say: 'lionel', text: 'El siguiente estadio abierto es el de **Pueblo Hoyuelo**, al norte, por la **Ruta 3** y la **Mina**. El líder es **Percy**. Planta. El muchacho más amable de Galar. —Sonríe—. Y allí vive una delantera muy pesada que lleva una semana preguntándome si ya has llegado.' },
			{ say: 'lionel', text: '¿La salida? —Señalas detrás de él—. ¡Gracias! —Se va hacia el otro lado—.' },
			{ if: 'flag.b07_apuntador_vencido_2', then: [
				{ diary: 'Hoy en el estadio de Pistón el marcador le contestaba a Renata. Bajamos al vestíbulo. Un papel en un tablón. Un recibo. Compramos un minuto. El 18:39. Escribimos antes que él.\n\nLa gente se rió. Renata también. Se rió de verdad. Me gustó oírla.', cond: D_PURGADO },
				{ diary: 'Hoy mi entrenador{|a|e} y yo estuvimos en la Apertura de la Temporada, en el Estadio de Pistón. Durante el directo de Renata, el marcador gigante empezó a contestarle. Los mensajes estaban comprados hace cinco días y programados al minuto, con la escaleta que colgaba del tablón. Compramos el minuto de antes del último y le quitamos la última palabra.\n\nLlegó una carta escrita a máquina. Era de antes del directo.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
				{ diary: 'Hoy fuimos a la Apertura de la Temporada en Pistón. ¡Cuarenta mil personas! El marcador gigante se puso a hablar con Renata, ¡qué gracioso! Y mi entrenador{|a|e} escribió un mensaje en el marcador. Salió en letras enormes. Todo el estadio se rió. ¡Lionel se perdió dos veces!', cond: D_DOBLE },
			], else: [
				{ diary: 'Hoy en el estadio de Pistón el marcador le contestaba a Renata. Buscamos. No llegamos. A las 18:40 dijo «segundo acto para mí».\n\nRenata dijo «no pasa nada» dos veces. La segunda era para ella. Lo sé.', cond: D_PURGADO },
				{ diary: 'Hoy mi entrenador{|a|e} y yo estuvimos en la Apertura de la Temporada, en el Estadio de Pistón. Durante el directo de Renata, el marcador gigante empezó a contestarle con frases del programa. A las 18:40 salió el último mensaje: «Segundo acto para mí. El tercero, en casa». No llegamos a tiempo.\n\nLlegó una carta escrita a máquina. Era de antes del directo.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
				{ diary: 'Hoy fuimos a la Apertura de la Temporada en Pistón. ¡Cuarenta mil personas! El marcador gigante se puso a hablar con Renata, como en un juego. Al final se despidió solo. ¡Qué espectáculo tan raro! Y Lionel, el Campeón, se perdió dos veces. ¡Dos!', cond: D_DOBLE },
			] },
			{ quest: 'b07_m2', stage: 'hecha', done: true },
			{ quest: 'b07_m3', stage: 'hoyuelo' },
			{ set: { 'flag.b07_t1_hecho': true } },
			{ say: 'rotom', text: '¡Bzzt! Siguiente: **Pueblo Hoyuelo**, por la **Ruta 3**. Y en la estación ya hay tren a **Pueblo Plié**, por si nos apetece un bosque. A mí me apetece. Los bosques tienen buena cobertura. Mentira.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Hoyuelo. Ruta 3. Y un tren a Plié. Bien.', cond: PURG },
		],
		b07_renata_peticion: [
			{ set: { 'flag.b07_renata_peticion': true } },
			{ text: 'Nico y la Tía Rosa bajan a por café. Renata se queda en la cabina, de espaldas al cristal. Mete la mano en la mochila y saca una cinta de casete con una pegatina amarilla. «EP. 3».' },
			// FUERA DE MICRO
			{ say: 'renata', text: 'Esto no es nada. Es el episodio tres. Uno en el que me equivoqué y lo arreglé con una pegatina, muy tarde. —Le da vueltas entre los dedos—. Guárdamela tú.' }, // FUERA DE MICRO
			{ say: 'renata', text: 'Por si un día tengo que pedir perdón en antena. Que estés. Que la tengas tú y me la des. —Te la pone en la mano y no la suelta enseguida—. No preguntes. Todavía no.' }, // FUERA DE MICRO
			{ give: 'cintaep3' },
			{ intel: { npc: 'renata', text: 'Te dio a guardar la cinta del episodio 3 de *Casos Fríos*: «por si un día tengo que pedir perdón en antena, que estés».' } },
		],
		b07_renata_reparar: [
			{ text: 'Desde el Centro Pokémon de Pistón llamas al estudio de Porcelana. Contesta Nico, al cuarto tono, con la boca llena.' },
			{ say: 'nico_ferrer', as: 'Nico (llamada)', text: '¿Sí? Ah, eres tú. —Baja la voz—. Estamos montando el episodio de Galar. Renata no ha dicho tu nombre en toda la mañana. Eso, en Renata, es mucho decir. Bueno, mucho no decir.' }, // FUERA DE MICRO
			{ prompt: 'Nico tiene la mesa de grabación encendida.', choice: [
				{ text: '«Ponme en antena. Una frase. Para el episodio.»', then: [
					{ say: 'nico_ferrer', as: 'Nico (llamada)', text: '¿En el episodio? Va. Grabando. Tres, dos…' },
					// EN ANTENA
					{ say: 'jugador', text: 'Para el episodio de Galar: el minuto del marcador lo vio Renata. Yo solo corrí escaleras abajo. Si alguien tiene que salir con su nombre, que sea ella.' }, // EN ANTENA
					{ text: 'Silencio. Luego, un ruido de silla que se arrastra y una voz que ya conoces, muy cerca del micro.' },
					{ say: 'renata', as: 'Renata (llamada)', text: '…Corta, Nico. —Una pausa larga—. Eso se queda en el episodio. Sin editar. —Otra pausa—. Gracias. Cool. Cool.' }, // FUERA DE MICRO
					{ if: 'vars.b07_af_renata_perdida >= 5', then: [{ af: { renata: 5 } }], else: [{ af: { renata: 2 } }] },
					{ set: { 'flag.b07_renata_reparada': true } },
				] },
				{ text: '«Luego llamo.»', then: [{ say: 'nico_ferrer', as: 'Nico (llamada)', text: 'Sale. Pero no tardes, que el episodio sale el martes. Y los martes no se mueven.' }] },
			] },
		],

		// ----- Después del marcador -----
		b07_tadeo_pasillo: [
			{ set: { 'flag.b07_tadeo_pasillo': true } },
			{ text: 'En el pasillo de artistas, el Musical recoge: baúles, percheros, una luna de cartón piedra. Tadeo, con la camisa remangada, enrolla cables. Te ve y se le iluminan los ojos.' },
			{ say: 'tadeo', text: '¡Qué tarde! Desde el foso no vi nada, claro. Estuve abajo de las seis y cuarto a las seis y treinta y cinco, apuntando a la dama de la luna, que hoy se ha olvidado el segundo verso dos veces. Me he enterado de lo del marcador al salir. ¡Qué cosa! Cuarenta mil personas mirando una frase.' },
			{ say: 'tadeo', text: '¿Quién haría algo así? —Lo pregunta con una curiosidad muy limpia—. Hay que tener mucha paciencia. Y saberse muy bien el programa. Yo me sé el programa, pero porque lo escucho. Como medio Teselia.' },
			{ text: 'Piensas en el recibo: doce mensajes pagados hace cinco días y programados al minuto. Para que salgan a su hora no hace falta estar en ningún sitio. Tampoco en un foso.' },
			{ prompt: 'Tadeo sigue enrollando cables, tarareando.', choice: [
				{ text: 'Apuntarlo en el Expediente, sin decir nada.', then: [
					{ set: { 'flag.b07_coartada_rota': true } },
					{ intel: { npc: 'tadeo', text: 'En la Apertura de Pistón, Tadeo dice que estuvo en el foso del escenario de 18:15 a 18:35. Los mensajes del marcador se pagaron cinco días antes y estaban programados al minuto: no hacía falta estar en ningún sitio para que salieran.' } },
					{ text: 'Lo apuntas en la Pokédex mientras le dices que la dama de la luna ha estado muy bien. Él sonríe. No ve lo que escribes.' },
				] },
				{ text: 'No apuntar nada.', then: [{ text: 'Le dices que la dama de la luna ha estado muy bien. Tadeo sonríe como si se lo hubieras dicho a él.' }] },
			] },
			{ say: 'tadeo', text: 'Bueno, me voy, que el autobús del Musical sale a las ocho y no espera ni al apuntador. Salude a la señorita Castellanos. Dígale que la escucho el martes. Siempre la escucho el martes.' },
		],
		b07_tadeo_despues: [
			{ text: 'El pasillo de artistas está vacío. En el suelo, un trozo de luna de cartón piedra y un programa de mano del Musical con una mancha de café. El autobús ya se ha ido.' },
		],
		b07_chatot_despues: [
			{ text: 'El Chatot del Musical se ha quedado en el vestíbulo: alguien se lo ha olvidado. Un operario le da pipas. El Chatot le recita, con la voz de Renata: «*Nota para el episodio…*». Y luego, con una voz que no reconoces, muy suave: «*…en casa*».' },
			{ text: 'El operario dice que mañana vienen a por él los del Musical. Que ya han llamado. Que han preguntado si había dicho algo raro.' },
		],
		b07_estadio_obras: [
			{ text: 'Una valla de obra con un cartel: «**GIMNASIO DE PISTÓN · EN OBRAS DE TEMPORADA** · Revisión de las calderas del estadio. El líder les atiende abajo. No bajen sin casco». Al lado, un casco amarillo colgado de un clavo, para quien lo necesite.' },
			{ say: 'rotom', text: '¡Bzzt! El gimnasio de Naboru va a tener que esperar a otra visita. Pero se le puede ver en las calderas. —Pausa—. Las calderas tienen casco. Yo no tengo cabeza. Ventaja.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. En obras. Otra vez será.', cond: PURG },
		],

		// ----- Camille (el viernes, en el pabellón) -----
		b07_camille_pabellon: [
			{ set: { 'flag.b07_camille_pabellon': true } },
			{ text: 'En el pabellón de la plaza juega el equipo juvenil de Kalos. Camiseta azul, flor de lis. En la línea de saque, una chica de coleta alta bota el balón, lo lanza, salta y lo clava al otro lado sin mirar. No hay pancartas en la grada. Hay un señor con un bocadillo.' },
			{ say: 'camille', text: '¡{jugador}! —Desde la cancha, en un tiempo muerto—. ¿Has visto? Sin pancarta. Te lo dije en la postal. —Se ríe—. Vamos segundas. Llueve dentro del pabellón otra vez, pero solo por el lado del banquillo. Ganamos igual.' },
		],

		// =================== ESTACIÓN: AGNES ===================
		b07_agnes: [
			{ ...ABRE_LIGA },
			{ if: 'flag.b07_oficio_aguja', then: [{ call: 'b07_agnes_despues' }, { end: true }] },
			{ if: '!flag.b07_agnes_visto', then: [
				{ set: { 'flag.b07_agnes_visto': true } },
				{ text: 'En la garita de las agujas, una señora mayor con gorra de ferroviaria azul, gafas de cerca colgadas de una cadena y un silbato al cuello apunta números en un cuaderno. No levanta la vista.' },
				{ say: 'agnes', text: 'El de las 17:12 a Hoyuelo, andén 1, puntual. El de las 17:40 a Plié, andén 2, puntual. El reloj de la torre dice que han llegado tarde. El reloj miente. —Por fin te mira—. Agnes Tull. Guardagujas. ¿Viene a pelear? Aquí no se pelea. Aquí se llega a la hora.' },
				{ say: 'agnes', text: 'Si viene por lo de la Liga, soy uno de los siete. El oficio más viejo de Pistón: que las cosas lleguen a donde tienen que llegar, cuando tienen que llegar. Para convencerme, demuéstreme que sabe leer un horario. O que sabe llevar algo sin perderlo.' },
				{ give: 'horariopiston' },
				{ say: 'agnes', text: 'Tenga. El horario de la estación. Es público. Nadie lo lee. Usted, léalo.' },
			] },
			{ if: 'flag.b07_ofi_agnes_mal_a && flag.b07_ofi_agnes_mal_b && !(' + OFI_DOS + ')', then: [
				{ say: 'agnes', text: 'Hoy no. Lo de ayer ya está apuntado en el cuaderno, y lo apuntado no se borra. Vaya a ver a los demás maestros. Si ellos hablan bien de usted, lo vuelvo a apuntar.' },
				{ end: true },
			] },
			{ if: '(flag.b07_ofi_agnes_mal_a || flag.b07_ofi_agnes_mal_b) && ' + OFI_DOS + ' && !flag.b07_ofi_agnes_segunda', then: [
				{ set: { 'flag.b07_ofi_agnes_segunda': true, 'flag.b07_ofi_agnes_mal_a': false, 'flag.b07_ofi_agnes_mal_b': false } },
				{ say: 'agnes', text: 'Me han dicho cosas de usted en la taberna. Cosas buenas. —Pasa una página del cuaderno—. Página nueva. No se acostumbre: tengo pocas.' },
			] },
			{ prompt: 'Agnes espera, con el lápiz en la oreja.', choice: [
				{ text: 'Leer un horario (deducción).', cond: '!flag.b07_ofi_agnes_mal_a', then: [{ call: 'b07_agnes_puzle' }] },
				{ text: 'Llevar un paquete en el tren de las 17:12.', cond: '!flag.b07_ofi_agnes_mal_b', then: [{ call: 'b07_agnes_paquete' }] },
				{ text: 'Ahora no.', then: [{ say: 'agnes', text: 'El próximo sale en cuatro minutos. Usted no. Usted cuando quiera.' }] },
			] },
		],
		b07_agnes_puzle: [
			{ say: 'agnes', text: 'Un señor ha llegado corriendo a las 18:41 al andén 2. Ha visto las luces rojas del último vagón. Me jura que ha perdido el tren de Crampón. Mírese el horario. ¿Le creo?' },
			{ read: 'horariopiston' },
			{ prompt: '¿Qué tren ha perdido el señor del andén 2?', choice: [
				{ text: '«Sí. Ha perdido el de Crampón.»', then: [
					{ set: { 'flag.b07_ofi_agnes_mal_a': true } },
					{ say: 'agnes', text: 'El de Crampón sale del andén 3. En punto. Solo las horas pares. —Cierra el cuaderno—. No ha leído el horario. Lo ha mirado. No es lo mismo.' },
				] },
				{ text: '«No. Ha perdido el de Plié, el de y cuarenta.»', then: [
					{ say: 'agnes', text: 'Andén 2, a y cuarenta. El de Plié. —Asiente una sola vez—. Le diré al señor que ha perdido el tren que no quería tomar. Se llevará un disgusto pequeño en vez de uno grande.' },
					{ call: 'b07_agnes_convencida' },
				] },
				{ text: '«No. Ha perdido el de Hoyuelo.»', then: [
					{ set: { 'flag.b07_ofi_agnes_mal_a': true } },
					{ say: 'agnes', text: 'El de Hoyuelo sale del 1, a y doce. A las 18:41 ya va por la Ruta 3. —Cierra el cuaderno—. Otra vez será. No hoy.' },
				] },
			] },
		],
		b07_agnes_paquete: [
			{ say: 'agnes', text: 'Este paquete va a la estación de la Ruta 3 en el de las 17:12, y vuelve con la firma del jefe de estación en el de las 17:40. Nada más. Mucha gente lo pierde. No sé cómo. Es una caja.' },
			{ text: 'Te da una caja de cartón atada con cuerda, del tamaño de un libro, que pesa más de lo que parece. Subes al tren. Te sientas. A los cinco minutos, notas que alguien te mira desde el portaequipajes.' },
			{ text: 'Una cola roja, una sonrisa blanca y unos ojos que no miran tu cara: miran la caja. Un **Thievul**. Antes de que te des cuenta, la caja ya no está en tu regazo.' },
			{ wild: { sp: 'thievul', lv: 66, noCatch: true }, canRun: false,
				onWin: [
					{ text: 'El Thievul suelta la caja, ofendido, y se escapa por la ventanilla hacia la Ruta 3. La caja está entera. La cuerda, un poco mordida.' },
					{ text: 'En la estación de la Ruta 3, el jefe de estación firma sin mirar. Vuelves en el de las 17:40. Agnes te ve bajar con la caja y apunta algo en el cuaderno.' },
					{ say: 'agnes', text: 'Thievul. Siempre en el de las 17:12. Se aprende el horario mejor que los viajeros. —Mira la cuerda mordida—. Ha llegado. Eso es lo que cuenta. Lo demás es literatura.' },
					{ call: 'b07_agnes_convencida' },
				],
				onLose: [
					{ set: { 'flag.b07_ofi_agnes_mal_b': true } },
					{ text: 'El Thievul se escapa por la ventanilla con la caja. Lo ves alejarse por la hierba, contento como un niño. Vuelves en el de las 17:40 con las manos vacías.' },
					{ say: 'agnes', text: 'Thievul. En el de las 17:12. —No se enfada. Apunta—. La caja tenía piedras. Era una prueba. Pero usted no lo sabía, y la ha perdido igual.' },
				] },
		],
		b07_agnes_convencida: [
			{ set: { 'flag.b07_oficio_aguja': true } },
			{ say: 'agnes', text: 'Agnes Tull, guardagujas, le da su palabra. —Lo dice como quien da una salida a un tren—. Dígaselo a Priya. Y no llegue tarde a la taberna. Allí también se apunta.' },
			{ call: 'b07_ofi_cuenta' },
		],
		b07_agnes_despues: [
			{ say: 'agnes', text: 'El de las 17:12, puntual. El reloj de la torre, cuatro minutos tarde, mejor que la semana pasada. —Señala la torre con el lápiz—. Eso es cosa de usted y del relojero, ¿verdad? No me lo diga. Lo apunto igual.', cond: 'flag.b07_oficio_relojeria' },
			{ say: 'agnes', text: 'El de las 17:12, puntual. El reloj de la torre sigue mintiendo. Algún día alguien convencerá al relojero de que mire los trenes.', cond: '!flag.b07_oficio_relojeria' },
			{ say: 'agnes', text: 'Hay tren a Plié en el andén 2, a y cuarenta. Al oeste, entre bosques. Dicen que allí hay una casa con siete puertas. Yo solo sé que el tren llega a su hora.', cond: 'flag.b07_t1_hecho' },
		],
		b07_tablero: [
			{ text: 'El tablero de llegadas gira, *clac-clac-clac*: «HOYUELO 17:12 · ANDÉN 1 · EN HORA», «PLIÉ 17:40 · ANDÉN 2 · EN HORA», «CRAMPÓN 18:00 · ANDÉN 3 · EN HORA». Abajo del todo, en letras más pequeñas: «ARTEJO · SERVICIO SUSPENDIDO POR OBRAS».' },
			{ text: 'En la torre, el reloj marca otra hora. Ninguna de las que pone el tablero.', cond: '!flag.b07_oficio_relojeria' },
		],

		// =================== LA LIGA DE LOS SIETE OFICIOS ===================
		b07_ofi_placa: [
			{ text: 'Una placa de latón ennegrecido, atornillada a la pared con siete tornillos: «**LIGA DE LOS SIETE OFICIOS** · Herrería · Relojería · Tintorería · Carpintería · Agujas · Fogones · Calderas · *Quien gane la palabra de cuatro maestros, que compre en esta calle como uno de casa*».' },
			{ text: 'Debajo, alguien ha rayado con una llave: «Con dinero no». Y debajo, con otra letra: «Ya lo sé, Kevin».' },
			{ say: 'rotom', text: '¡Bzzt! Siete maestros. Hay que convencer a **cuatro**. Y no todos se convencen igual. Esto me gusta. Es como un gimnasio, pero sin gimnasio. Y con té.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Siete. Hay que convencer a cuatro. Bien.', cond: PURG },
			{ ...ABRE_LIGA },
		],
		// Recuento común: se llama tras cada maestro convencido.
		b07_ofi_cuenta: [
			{ set: { 'vars.b07_oficios_n': '+1' } },
			{ if: OFI_N + ' >= 4 && quest.b07_s_oficios == "maestros"', then: [
				{ quest: 'b07_s_oficios', stage: 'sello' },
				{ say: 'rotom', text: '¡Bzzt! ¡Cuatro! ¡Ya tenemos cuatro palabras de maestro! Dicen que nos esperan en la **taberna de curri**, con té. ¡Té!', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. Cuatro. A la taberna de curri.', cond: PURG },
			], else: [
				{ say: 'rotom', text: '¡Bzzt! Llevamos {vars.b07_oficios_n} de cuatro.', cond: '!flag.b07_oficios_hecho && !' + PURG },
				{ say: 'rotom', text: 'Bzzt. {vars.b07_oficios_n} de cuatro.', cond: '!flag.b07_oficios_hecho && ' + PURG },
			] },
			{ if: OFI_N + ' >= 7 && flag.b07_oficios_hecho && !flag.b07_oficios_siete', then: [{ call: 'b07_oficios_siete' }] },
		],

		// ----- La herrera -----
		b07_ofi_herrera: [
			{ ...ABRE_LIGA },
			{ if: 'flag.b07_oficio_herreria', then: [
				{ say: 'of_herrera', as: 'La herrera', text: 'Ya tienes mi palabra. —Golpea el yunque—. Y si algún día te hace falta una herradura para algo con más de cuatro patas, vienes. Aquí no se pregunta.' },
				{ end: true },
			] },
			{ if: '!flag.b07_ofi_herrera_visto', then: [
				{ set: { 'flag.b07_ofi_herrera_visto': true } },
				{ text: 'En la herrería hace un calor de horno. Una mujer ancha, con mandil de cuero, gafas de soldar en la frente y una cicatriz en el antebrazo, golpea una pieza al rojo sobre el yunque. Un Copperajah enorme, verde de cobre viejo, le sujeta la pieza con la trompa.' },
				{ say: 'of_herrera', as: 'La herrera', text: 'Bronwen. Herrera. Forjo las piezas de los trenes de Pistón desde antes de que tú nacieras. —No para de golpear—. ¿La Liga? Mi palabra no se regala. Se gana a golpes o se gana sudando. Elige.' },
				{ say: 'of_herrera', as: 'La herrera', text: 'O peleas con mi Copperajah, que es de cobre del bueno, o me ayudas a templar esta pieza. Para templarla me hace falta hielo del de verdad, del de la **cala helada del Lago Axew**, en el Área Silvestre. El del congelador no sirve: se derrite de vergüenza.' },
				{ say: 'of_herrera', as: 'La herrera', text: 'Antes también bajaba alguien a la Mina a por hierro de veta. Ya no baja nadie. Pero eso es otra historia.' },
				{ if: LUC, then: [
					{ text: 'El Copperajah mira a {riolu} de arriba abajo, despacio, como se mira una pieza de metal antes de comprarla. {riolu} le aguanta la mirada con los brazos cruzados.' },
					{ say: 'of_herrera', as: 'La herrera', text: 'Un Lucario. Acero por dentro. —Casi sonríe—. A mi Copperajah le gustan los que no se doblan.' },
				] },
			] },
			{ if: 'flag.b07_ofi_herrera_mal && !(' + OFI_DOS + ')', then: [
				{ say: 'of_herrera', as: 'La herrera', text: 'Contra mi Copperajah ya has perdido. No te voy a dejar que pierdas otra vez hoy: es malo para el temple. Si quieres mi palabra, tráeme el hielo.' },
			] },
			{ if: 'flag.b07_ofi_herrera_mal && ' + OFI_DOS + ' && !flag.b07_ofi_herrera_segunda', then: [
				{ set: { 'flag.b07_ofi_herrera_segunda': true, 'flag.b07_ofi_herrera_mal': false } },
				{ say: 'of_herrera', as: 'La herrera', text: 'Me han dicho en la taberna que tienes buen temple. Que te doblas y no te partes. —Deja el martillo—. Venga. Otra vez. El hierro también se vuelve a fundir.' },
			] },
			{ if: 'has("hieloaxew")', then: [{ call: 'b07_ofi_herrera_hielo' }, { end: true }] },
			{ prompt: 'Bronwen sigue golpeando la pieza.', choice: [
				{ text: 'Combatir contra su Copperajah.', cond: '!flag.b07_ofi_herrera_mal', then: [{ call: 'b07_ofi_herrera_combate' }] },
				{ text: 'Ir a por el hielo de la cala helada.', then: [
					{ set: { 'flag.b07_ofi_hielo_pedido': true } },
					{ say: 'of_herrera', as: 'La herrera', text: 'Lago Axew, la cala del norte. Hay unos Vanillite que bostezan escarcha. Recógela antes de que toque el suelo, que si toca el suelo ya es agua. Y el agua no templa nada.' },
				] },
				{ text: 'Ahora no.', then: [{ say: 'of_herrera', as: 'La herrera', text: 'El hierro no espera. Yo sí. Un rato.' }] },
			] },
		],
		b07_ofi_herrera_combate: [
			{ say: 'of_herrera', as: 'La herrera', text: 'Primero, agua y sombra para tus Pokémon. Aquí dentro se cuece cualquiera.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, gracias.', then: [{ heal: 'Bronwen te pasa un cubo de agua fresca y un puñado de pociones de la caja de las herramientas. Tu equipo se recupera.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'of_herrera', as: 'La herrera', text: 'Valiente. O de hierro colado. Ya veremos cuál.' }] },
			] },
			{ battle: 'herrera_oficio', lose: 'continue',
				onWin: [
					{ text: 'El Copperajah se sienta en el suelo de la herrería, que tiembla, y suelta un resoplido que apaga una vela. Bronwen le da una palmada en la trompa.' },
					{ if: LUC, then: [{ text: '{riolu} y el Copperajah se miran. El Copperajah inclina la trompa, muy despacio. {riolu} inclina la cabeza.' }, { happy: { who: 'riolu', n: 4 } }] },
					{ call: 'b07_ofi_herrera_si' },
				],
				onLose: [
					{ set: { 'flag.b07_ofi_herrera_mal': true } },
					{ heal: true },
					{ say: 'of_herrera', as: 'La herrera', text: 'Te has partido. —No lo dice mal—. Si quieres mi palabra, tráeme el hielo del lago. O que te recomiende alguien. Aquí nos lo contamos todo.' },
				] },
		],
		b07_ofi_hielo_cala: [
			{ text: 'En la cala del norte del Lago Axew, el agua está helada aunque haga sol. Sobre el hielo duermen tres Vanillite, muy juntos. Cuando bostezan, les sale una nube de escarcha que cae en copos gordos y brillantes. Si tocan el suelo, se derriten.' },
			{ minigame: { type: 'catch', id: 'b07_hielo_axew', title: 'La escarcha de los Vanillite', hint: 'Recoge la escarcha en la cesta antes de que toque el suelo. Las piedras del lago, fuera.', theme: 'nieve', level: 2,
				guaranteed: ['hieloaxew'], loot: [{ id: 'nevermeltice', w: 2, rare: true }, { id: 'snowball', w: 5 }, { id: 'freshwater', w: 6 }], picks: 1, consolation: 'freshwater', lootTitle: 'En la cesta' },
				onWin: [{ text: 'En el fondo de la cesta, un bloque de hielo azulado que no suda ni al sol. Los Vanillite se dan la vuelta y siguen durmiendo.' }],
				onLose: [{ text: 'La escarcha cae al suelo antes de que llegues. Agua. Los Vanillite bostezan otra vez. Se puede volver a probar.' }],
				onQuit: [{ text: 'Te apartas de la cala. Los Vanillite ni se han enterado.' }] },
		],
		b07_cala_generico: [
			{ text: 'En la cala helada duermen tres Vanillite muy juntos. Uno abre un ojo, te mira, bosteza escarcha y lo vuelve a cerrar.' },
		],
		b07_ofi_herrera_hielo: [
			{ if: '!has("hieloaxew")', then: [{ end: true }] },
			{ take: 'hieloaxew', cond: 'has("hieloaxew")' },
			{ text: 'Le das el bloque de hielo a Bronwen. Lo mira a contraluz, lo pesa con la mano y asiente. Mete la pieza al rojo en el fuego, la saca, y la apoya sobre el hielo.' },
			{ text: 'Un siseo enorme. Vapor hasta el techo. Cuando se aclara, la pieza tiene un color azul oscuro, como el de una tormenta, y suena distinto cuando la golpea: más limpia.' },
			{ say: 'of_herrera', as: 'La herrera', text: 'Esto. Esto es temple. —La deja en el banco con cuidado—. Hace años que no me salía así. El hielo de la cala lo traía mi padre. Luego nadie.' },
			{ call: 'b07_ofi_herrera_si' },
		],
		b07_ofi_herrera_si: [
			{ set: { 'flag.b07_oficio_herreria': true } },
			{ say: 'of_herrera', as: 'La herrera', text: 'Bronwen, herrera, te da su palabra. Ve a la taberna y que te pongan el té cargado. Diles que vas de mi parte. No, mejor no se lo digas: se ponen celosos.' },
			{ call: 'b07_ofi_cuenta' },
		],

		// ----- El relojero -----
		b07_ofi_relojero: [
			{ ...ABRE_LIGA },
			{ if: 'flag.b07_oficio_relojeria', then: [
				{ say: 'of_relojero', as: 'El relojero', text: 'Tic. Tac. ¿Lo oyes? La torre, en hora. Bueno, en hora de tren. Que es la hora de verdad, me han dicho. —Se ajusta la lupa—. Me cuesta admitirlo. Lo admito.' },
				{ end: true },
			] },
			{ if: '!flag.b07_ofi_relojero_visto', then: [
				{ set: { 'flag.b07_ofi_relojero_visto': true } },
				{ text: 'En la relojería hay cien relojes en las paredes, cien tic-tacs a destiempo y ninguno da la misma hora. Detrás del mostrador, un hombre flaco con una lupa en el ojo y un chaleco con siete bolsillos desmonta un reloj de cuco sin respirar.' },
				{ say: 'of_relojero', as: 'El relojero', text: 'Silas. Relojero. Arreglo el reloj de la torre de la estación desde hace cuarenta años. Y hace una semana que no da la hora buena. No sé si adelanta, si atrasa o si se para a ratos. Me tiene loco.' },
				{ say: 'of_relojero', as: 'El relojero', text: '¿Mi palabra? Ayúdame con la torre. O me abres el cofre de la maquinaria, que tiene una cerradura de campanas que se toca en orden, y me la he olvidado. O me dices qué le pasa al reloj. Pero me lo dices con pruebas, que los relojeros no creemos en nada sin engranaje.' },
			] },
			{ if: 'flag.b07_ofi_relojero_mal && ' + OFI_DOS + ' && !flag.b07_ofi_relojero_segunda', then: [
				{ set: { 'flag.b07_ofi_relojero_segunda': true, 'flag.b07_ofi_relojero_mal': false } },
				{ say: 'of_relojero', as: 'El relojero', text: 'Dicen en la calle que tienes cabeza. Que no adivinas: miras. —Se quita la lupa—. A lo mejor te juzgué demasiado deprisa. Defecto de relojero.' },
			] },
			{ prompt: 'Silas mira la torre por la ventana, con la lupa puesta.', choice: [
				{ text: 'Abrir el cofre de la maquinaria (cerradura).', then: [{ call: 'b07_ofi_relojero_cofre' }] },
				{ text: 'Decirle qué le pasa al reloj.', cond: '!flag.b07_ofi_relojero_mal', then: [{ call: 'b07_ofi_relojero_hora' }] },
				{ text: 'Ahora no.', then: [{ say: 'of_relojero', as: 'El relojero', text: 'Tiempo, eso es lo que me sobra. Mal medido, pero me sobra.' }] },
			] },
		],
		b07_ofi_relojero_cofre: [
			{ text: 'Subes con Silas a la torre por una escalera de caracol que cruje. Arriba, junto a la maquinaria, un cofre de hierro con siete campanitas en la tapa. Cuando las rozas, se encienden por dentro, una detrás de otra, y vuelven a apagarse.' },
			{ minigame: { type: 'lock', id: 'b07_cofre_torre', title: 'El cofre de la torre', hint: 'Las campanas se encienden en un orden. Repítelo. Cada cerrojo, una campana más.', theme: 'cofre', level: 3,
				loot: [{ id: 'stardust', w: 6 }, { id: 'metalcoat', w: 2, rare: true }, { id: 'starpiece', w: 1, rare: true }], picks: 1, consolation: 'stardust', lootTitle: 'En el cofre de la torre' },
				onWin: [
					{ text: 'El cofre se abre con un *clonc*. Dentro hay herramientas viejas, una aceitera y, sujeto con un alambre, un piñón de latón partido por la mitad. Silas lo toma con dos dedos como si fuera un pajarito herido.' },
					{ say: 'of_relojero', as: 'El relojero', text: '¡El piñón de los minutos! Partido. Por eso adelantaba siete minutos y luego se paraba. —Se le empañan las gafas—. Cuarenta años y me lo encuentras tú en una tarde.' },
					{ call: 'b07_ofi_relojero_si' },
				],
				onLose: [{ say: 'of_relojero', as: 'El relojero', text: 'Se ha trabado. No pasa nada: se traba siempre. Respira y vuelve a empezar. Las campanas no tienen prisa.' }],
				onQuit: [{ say: 'of_relojero', as: 'El relojero', text: 'Bajamos. La torre seguirá mintiendo un rato más.' }] },
		],
		b07_ofi_relojero_hora: [
			{ if: '!has("horariopiston")', then: [
				{ say: 'of_relojero', as: 'El relojero', text: '¿Con qué pruebas? Para saber si un reloj miente hace falta algo que no mienta. Yo no conozco nada así. —Pausa—. Dicen que Agnes, la de las agujas, tampoco miente nunca. Pregúntale a ella.' },
				{ end: true },
			] },
			{ text: 'Sacas el horario de Agnes. El de las 17:12 a Hoyuelo, puntual. El de las 17:40 a Plié, puntual. Y te acuerdas del tablero de la estación y de lo que dijo Agnes: «El reloj de la torre dice que han llegado tarde».' },
			{ say: 'of_relojero', as: 'El relojero', text: 'El de las 17:12 entró en el andén cuando mi torre marcaba las 17:19. Y el de las 17:40, cuando marcaba las 17:47. Los dos días. —Te mira por encima de la lupa—. ¿Y bien?' },
			{ prompt: '¿Qué le pasa al reloj de la torre?', choice: [
				{ text: '«Adelanta siete minutos.»', then: [
					{ say: 'of_relojero', as: 'El relojero', text: 'Siete. Siempre siete. Si los trenes no mienten… —Saca un destornillador del chaleco—. Entonces es el piñón de los minutos. Lo sabía. No lo sabía. Ahora lo sé.' },
					{ call: 'b07_ofi_relojero_si' },
				] },
				{ text: '«Atrasa siete minutos.»', then: [
					{ set: { 'flag.b07_ofi_relojero_mal': true } },
					{ say: 'of_relojero', as: 'El relojero', text: 'Si atrasara, los trenes llegarían antes de hora. Y no llegan antes: llegan a su hora. —Se encoge de hombros—. Lo siento. Sin engranaje no hay palabra.' },
				] },
				{ text: '«Se para a ratos.»', then: [
					{ set: { 'flag.b07_ofi_relojero_mal': true } },
					{ say: 'of_relojero', as: 'El relojero', text: 'Si se parara a ratos, unas veces serían cinco y otras doce. Son siete. Siempre siete. —Niega con la lupa—. No has mirado los números. Has mirado el reloj.' },
				] },
			] },
		],
		b07_ofi_relojero_si: [
			{ set: { 'flag.b07_oficio_relojeria': true } },
			{ say: 'of_relojero', as: 'El relojero', text: 'Silas, relojero, te da su palabra. Mañana la torre dará la hora de los trenes. Agnes va a poner una cara… —Se ríe, un tic-tac de risa—. Va a poner la misma cara. Pero yo sabré que por dentro se alegra.' },
			{ call: 'b07_ofi_cuenta' },
		],

		// ----- La tintorera -----
		b07_ofi_tintorera: [
			{ ...ABRE_LIGA },
			{ if: 'flag.b07_oficio_tintoreria', then: [
				{ say: 'of_tintorera', as: 'La tintorera', text: '¿Has visto los balcones? El morado de Pistón, otra vez. Los hinchas viejos se paran a mirar las bufandas y no dicen nada. Eso, en Pistón, es llorar.' },
				{ end: true },
			] },
			{ if: '!flag.b07_ofi_tintorera_visto', then: [
				{ set: { 'flag.b07_ofi_tintorera_visto': true } },
				{ text: 'La tintorería tiene bufandas tendidas de balcón a balcón, de todos los colores: rojo de Pistón, verde de Hoyuelo, rosa del Team Yell. Dentro, entre cubas que humean, una mujer de rizos rosas y manos azules hasta el codo remueve un tinte con un palo.' },
				{ say: 'of_tintorera', as: 'La tintorera', text: 'Ivy. Tintorera. Tiño las bufandas de los hinchas de toda Galar. Todas menos una: el **morado de Pistón**. El de antes, el de cuando el estadio era de madera. Se me ha olvidado cómo se hacía. A mi abuela no.' },
				{ say: 'of_tintorera', as: 'La tintorera', text: 'Mi palabra es para quien me ayude a recordarlo. Rojo, azul y una pizca de amarillo, eso sé. Pero de baya, no de bote: **Baya Tamate**, **Baya Oram** y **Baya Pinia**, de los arbustos de tinte de la **Pradera Radiante**. O, si eres de pocas palabras, combate con mis tres colores. Mis Pokémon hablan por mí.' },
			] },
			{ if: 'flag.b07_ofi_tintorera_mal && ' + OFI_DOS + ' && !flag.b07_ofi_tintorera_segunda', then: [
				{ set: { 'flag.b07_ofi_tintorera_segunda': true, 'flag.b07_ofi_tintorera_mal': false } },
				{ say: 'of_tintorera', as: 'La tintorera', text: 'Me han dicho que eres de las que no destiñen. —Se seca las manos azules en el mandil, sin éxito—. Venga. Otro lavado.' },
			] },
			{ if: TINTES, then: [{ call: 'b07_ofi_tintorera_bayas' }, { end: true }] },
			{ prompt: 'Ivy remueve la cuba sin dejar de mirarte.', choice: [
				{ text: 'Combatir contra sus tres colores.', cond: '!flag.b07_ofi_tintorera_mal', then: [{ call: 'b07_ofi_tintorera_combate' }] },
				{ text: 'Ir a por las bayas de tinte.', then: [
					{ set: { 'flag.b07_ofi_tinte_pedido': true } },
					{ say: 'of_tintorera', as: 'La tintorera', text: 'Los arbustos de tinte están al borde de la Pradera Radiante, donde los Wooloo no llegan. Sacúdelos con cuidado: si las bayas caen al suelo, se manchan y ya no tiñen. Tiñen el suelo.' },
				] },
				{ text: 'Ahora no.', then: [{ say: 'of_tintorera', as: 'La tintorera', text: 'Bueno. Pero no tardes, que el tinte se enfría y luego todo sale beige.' }] },
			] },
		],
		b07_ofi_tintes_cosecha: [
			{ text: 'Al borde de la Pradera Radiante, donde la hierba se vuelve piedra, hay tres arbustos bajos: uno con bayas rojas, otro con bayas azules y otro con bayas amarillas muy pequeñas. Un Wooloo intenta llegar y no llega.' },
			{ minigame: { type: 'catch', id: 'b07_tintes', title: 'Los arbustos de tinte', hint: 'Sacude con cuidado. Una roja, una azul y una amarilla tienen que llegar enteras a la cesta.', theme: 'bosque', level: 2,
				guaranteed: ['tamatoberry', 'blukberry', 'pinapberry'], loot: [{ id: 'oranberry', w: 6 }, { id: 'sitrusberry', w: 3 }], picks: 1, consolation: 'oranberry', lootTitle: 'Bayas de tinte' },
				onWin: [{ text: 'Una Baya Tamate, una Baya Oram y una Baya Pinia, enteras, sin una mancha. El Wooloo te mira con envidia.' }],
				onLose: [{ text: 'Las bayas caen al suelo y lo tiñen de morado. Bonito, pero no sirve. Se puede volver a sacudir.' }],
				onQuit: [{ text: 'Te alejas de los arbustos. El Wooloo sigue intentándolo.' }] },
		],
		b07_ofi_tintorera_bayas: [
			{ if: '!(' + TINTES + ')', then: [{ text: 'Te faltan bayas de tinte. Ivy niega con la cabeza: «Las tres. Si falta una, sale beige»' }, { end: true }] },
			{ take: 'tamatoberry', cond: 'has("tamatoberry")' }, { take: 'blukberry', cond: 'has("blukberry")' }, { take: 'pinapberry', cond: 'has("pinapberry")' },
			{ text: 'Ivy aplasta las tres bayas en un mortero, por separado, y las echa en la cuba en un orden que no te explica: rojo, azul, y el amarillo al final, de una en una gota, contando en voz baja. Mete una bufanda blanca. La saca.' },
			{ text: 'Es morada. Pero no un morado cualquiera: uno oscuro, cálido, con un brillo rojizo cuando le da la luz. Como el ladrillo de Pistón al atardecer.' },
			{ say: 'of_tintorera', as: 'La tintorera', text: 'Ese. Es ese. —Se le quiebra la voz—. Siete gotas de amarillo. Lo decía mi abuela. Siete, como los oficios. Yo creía que era una manera de hablar.' },
			{ call: 'b07_ofi_tintorera_si' },
		],
		b07_ofi_tintorera_combate: [
			{ say: 'of_tintorera', as: 'La tintorera', text: 'Antes de nada, que tus Pokémon se laven la cara. Aquí todo mancha.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, gracias.', then: [{ heal: 'Ivy rocía a tu equipo con un agua que huele a lavanda y les pone pociones con las manos azules. Ahora tus Pokémon tienen huellas azules. Pero están curados.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'of_tintorera', as: 'La tintorera', text: 'Tú misma. Tú mismo. Tú. —Se ríe—. Perdona, el vapor.' }] },
			] },
			{ battle: 'tintorera_oficio', lose: 'continue',
				onWin: [
					{ say: 'of_tintorera', as: 'La tintorera', text: 'Rojo, azul y amarillo, y los tres por el suelo. —Recoge a sus Pokémon—. Me has sacado un color que no tengo. Ese vale.' },
					{ call: 'b07_ofi_tintorera_si' },
				],
				onLose: [
					{ set: { 'flag.b07_ofi_tintorera_mal': true } },
					{ heal: true },
					{ say: 'of_tintorera', as: 'La tintorera', text: 'Desteñido. Pero no pasa nada: si me traes las bayas, también vale. Y si te recomienda alguien de la calle, te dejo otro lavado.' },
				] },
		],
		b07_ofi_tintorera_si: [
			{ set: { 'flag.b07_oficio_tintoreria': true } },
			{ say: 'of_tintorera', as: 'La tintorera', text: 'Ivy, tintorera, te da su palabra. Y una bufanda. No, la bufanda no. La bufanda es para la Liga. Te la ponen en la taberna. Hazte el sorprendido.' },
			{ call: 'b07_ofi_cuenta' },
		],

		// ----- El carpintero y Grookey -----
		b07_ofi_carpintero: [
			{ ...ABRE_LIGA },
			{ if: 'flag.b07_oficio_carpinteria', then: [
				{ say: 'maestro_oficio', as: 'El carpintero', text: 'El banquillo nuevo del estadio de Hoyuelo, terminado. Sin un clavo torcido. —Mira hacia la puerta del taller, donde suena un tambor—. Y con ritmo. Eso no lo pedían. Lo pongo yo.', cond: 'flag.b07_grookey_vive' },
				{ say: 'maestro_oficio', as: 'El carpintero', text: 'El banquillo nuevo del estadio de Hoyuelo, terminado. Sin un clavo torcido. El taller está muy callado. Me había acostumbrado al tambor. No se lo digas a nadie.', cond: '!flag.b07_grookey_vive' },
				{ end: true },
			] },
			{ if: '!flag.b07_ofi_carpintero_visto', then: [
				{ set: { 'flag.b07_ofi_carpintero_visto': true } },
				{ text: 'La carpintería huele a serrín y a cola caliente. Entre tablones, banquillos de estadio a medio hacer y un Conkeldurr que carga vigas con una mano, un hombre de manos grandes y cejas espesas cepilla una tabla. Al fondo, sobre un taburete, un **Grookey** golpea un tronco con un palito. *Tac. Tac-tac. Tac.* Fatal.' },
				{ say: 'maestro_oficio', as: 'El carpintero', text: 'Abel. Carpintero. Hago los banquillos de los estadios de Galar. —El Grookey da un golpe a destiempo y el cepillo se le tuerce—. Y tengo un aprendiz.' },
				{ say: 'maestro_oficio', as: 'El carpintero', text: 'Apareció en el taller hace un mes. No se va. Quiere tocar. No sabe. Si alguien le enseña a llevar el ritmo, le doy mi palabra a quien sea. Y si no, combate: mis Pokémon cargan vigas y aguantan noventa minutos de grito.' },
			] },
			{ if: 'flag.b07_ofi_carpintero_mal && ' + OFI_DOS + ' && !flag.b07_ofi_carpintero_segunda', then: [
				{ set: { 'flag.b07_ofi_carpintero_segunda': true, 'flag.b07_ofi_carpintero_mal': false } },
				{ say: 'maestro_oficio', as: 'El carpintero', text: 'En la taberna hablan de ti. Bien. —Sopla el serrín de la tabla—. Una tabla se puede volver a lijar. Vamos.' },
			] },
			{ prompt: 'Abel sigue cepillando. El Grookey, golpeando.', choice: [
				{ text: 'Combatir contra el carpintero.', cond: '!flag.b07_ofi_carpintero_mal', then: [{ call: 'b07_ofi_carpintero_combate' }] },
				{ text: 'Ayudar al aprendiz del tambor.', cond: '!flag.b07_grookey && !flag.b07_grookey_vive', then: [{ call: 'b07_grookey' }] },
				{ text: 'Ahora no.', then: [{ say: 'maestro_oficio', as: 'El carpintero', text: 'Bueno. Tac. Tac-tac. Él sigue.' }] },
			] },
		],
		b07_ofi_carpintero_combate: [
			{ say: 'maestro_oficio', as: 'El carpintero', text: 'Que se sienten un rato en el banquillo antes. Que para eso los hago.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, gracias.', then: [{ heal: 'Tu equipo se sienta en un banquillo de estadio a estrenar mientras Abel les pasa pociones. El banquillo cruje. Abel frunce el ceño y apunta algo.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'maestro_oficio', as: 'El carpintero', text: 'Como quieras. El banquillo sigue ahí.' }] },
			] },
			{ battle: 'carpintero_oficio', lose: 'continue',
				onWin: [
					{ say: 'maestro_oficio', as: 'El carpintero', text: 'Aguantas más que mis banquillos. —Se limpia el serrín—. Eso no lo dice nadie de mis banquillos.' },
					{ call: 'b07_ofi_carpintero_si' },
				],
				onLose: [
					{ set: { 'flag.b07_ofi_carpintero_mal': true } },
					{ heal: true },
					{ say: 'maestro_oficio', as: 'El carpintero', text: 'Has crujido. Lija y vuelve. O ayúdame con el aprendiz, que eso vale más que un combate.' },
				] },
		],
		b07_ofi_carpintero_si: [
			{ set: { 'flag.b07_oficio_carpinteria': true } },
			{ say: 'maestro_oficio', as: 'El carpintero', text: 'Abel, carpintero, te da su palabra. Y un consejo: en la taberna, siéntate en el banco de la izquierda. Lo hice yo. El de la derecha lo hizo mi primo.' },
			{ call: 'b07_ofi_cuenta' },
		],
		b07_grookey: [
			{ if: '!flag.b07_ofi_carpintero_visto', then: [{ set: { 'flag.b07_ofi_carpintero_visto': true } }] },
			{ text: 'Te sientas en un tablón junto al Grookey. Golpea el tronco con su palito: *tac, tac-tac, tac*. Se le va el ritmo, se enfada, golpea más fuerte, peor. Detrás del taller hay un nogal viejo de Galanuez con las ramas llenas de frutos que se balancean con el viento, todos a la vez.' },
			{ if: LUC, then: [
				{ text: '{riolu} se pone detrás del Grookey y le pone la mano en el hombro. No hace nada más. Solo respira, despacio, al ritmo del viento en el nogal. El Grookey, sin darse cuenta, empieza a respirar igual.' },
			] },
			{ text: 'Se te ocurre algo: sacudir el nogal al ritmo del viento, para que los frutos caigan seguidos, *tac, tac, tac*, y el Grookey los oiga caer.' },
			{ minigame: { type: 'catch', id: 'b07_grookey_ritmo', title: 'El ritmo del nogal', hint: 'Sacude el nogal con el viento, no contra él. Que los frutos caigan seguidos, y a la cesta.', theme: 'bosque', level: 2,
				loot: [{ id: 'galaricatwig', w: 3 }, { id: 'sitrusberry', w: 6 }, { id: 'oranberry', w: 8 }, { id: 'miracleseed', w: 1, rare: true }], picks: 2, consolation: 'oranberry', lootTitle: 'Bajo el nogal' },
				onWin: [{ call: 'b07_grookey_ritmo' }],
				onLose: [{ text: 'Los frutos caen todos a la vez, *plof*, y el Grookey se tapa los oídos. Se puede volver a probar: el nogal no se va.' }],
				onQuit: [{ text: 'Te levantas del tablón. El Grookey sigue golpeando. *Tac. Tac-tac.* Peor.' }] },
		],
		b07_grookey_ritmo: [
			{ text: 'Los frutos caen del nogal uno detrás de otro, *tac, tac, tac*, como gotas de una gotera bien educada. El Grookey deja de golpear. Escucha. Levanta el palito. Y golpea el tronco justo a la vez que cae el siguiente fruto.' },
			{ text: '*Tac. Tac. Tac-tac. Tac.* Ya no es ruido. Es un ritmo. El Conkeldurr del taller deja las vigas en el suelo para escucharlo. El carpintero deja el cepillo.' },
			{ say: 'maestro_oficio', as: 'El carpintero', text: '…Eso es. —Lo dice muy bajo—. Un mes intentándolo, y lo ha agarrado en una tarde.' },
			{ if: '!flag.b07_oficio_carpinteria', then: [
				{ set: { 'flag.b07_oficio_carpinteria': true } },
				{ say: 'maestro_oficio', as: 'El carpintero', text: 'Abel, carpintero, te da su palabra. Te la ganaste sin tocar una tabla. Eso no lo había hecho nadie.' },
				{ call: 'b07_ofi_cuenta' },
			] },
			{ call: 'b07_grookey_eleccion' },
		],
		b07_grookey_eleccion: [
			{ text: 'El Grookey se baja del taburete, se te sube a la rodilla de un salto y te da un golpecito con el palito en la frente. *Tac.* Muy suave. Como quien llama a una puerta.' },
			{ quest: 'b07_s_iniciales', stage: 'buscar', cond: '!quest.b07_s_iniciales' },
			{ if: GROOKEY, then: [
				{ say: 'rotom', text: '¡Bzzt! Ya tenemos uno de su familia en la caja. Lo noto. Y él lo nota en ti: te ha dado el golpecito de los primos.', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. Ya tenemos uno de su familia. Lo noto.', cond: PURG },
				{ say: 'maestro_oficio', as: 'El carpintero', text: '¿Ya tienes uno de esos? Entonces este se queda aquí. —Le pone la mano en la cabeza al Grookey—. Me hace falta alguien que marque el ritmo del martillo. Puedes venir a verlo cuando quieras. Toca los jueves.' },
				{ set: { 'flag.b07_grookey_vive': true } },
				{ text: 'El Grookey vuelve al taburete y golpea el tronco. *Tac. Tac. Tac.* Perfecto. Te mira para que lo veas.' },
			], else: [
				{ say: 'maestro_oficio', as: 'El carpintero', text: 'Te ha elegido. —Se cruza de brazos—. Aquí ya ha aprendido lo que tenía que aprender. Lo demás se aprende por el camino. Llévatelo, si quieres. O se queda conmigo, marcando el ritmo del martillo. Tú decides.' },
				{ prompt: 'El Grookey espera sentado en tu rodilla, con el palito en alto.', choice: [
					{ text: '«Vente conmigo.»', then: [
						{ text: 'El Grookey suelta un chillido de alegría y te toca un redoble en la cabeza. El carpintero le da una ramita nueva, más gruesa, de la madera del nogal. «Para el camino».' },
						{ pokemon: { sp: 'grookey', lv: 15, nature: 'adamant', ability: 'overgrow', happy: 170, ivs: { hp: 28, atk: 31, def: 26, spa: 20, spd: 24, spe: 29 } } },
						{ set: { 'flag.b07_grookey': true } },
						{ say: 'maestro_oficio', as: 'El carpintero', text: 'Cuídamelo. Y si un día tienes que hacer un banquillo, que lo toque él antes. Si suena bien, aguanta.' },
					] },
					{ text: '«Quédate. Aquí te necesitan.»', then: [
						{ set: { 'flag.b07_grookey_vive': true } },
						{ text: 'El Grookey te mira un momento. Luego mira el taller, el martillo, el Conkeldurr. Vuelve al taburete y golpea el tronco al ritmo del cepillo del carpintero. *Tac. Shhh. Tac. Shhh.*' },
						{ say: 'maestro_oficio', as: 'El carpintero', text: 'Bueno. —Se le escapa media sonrisa—. Pues ya tengo aprendiz de verdad. Ven a verlo cuando quieras. Toca los jueves.' },
					] },
				] },
			] },
			{ quest: 'b07_s_iniciales', stage: 'hecha', done: true, cond: INICIALES },
			{ intel: { npc: 'maestro_oficio', text: 'Abel, el carpintero de Pistón, hace los banquillos de los estadios de Galar. Su aprendiz, un Grookey que no llevaba el ritmo, lo encontró con el nogal de detrás del taller.' } },
		],
		b07_grookey_despues: [
			{ text: 'El Grookey del taller toca el tronco al ritmo del martillo del carpintero. *Tac. Clang. Tac. Clang.* Cuando te ve, hace un redoble y se le cae el palito. Lo recoge. Disimula.' },
		],

		// =================== LA TABERNA: PRIYA Y GASPAR ===================
		b07_priya: [
			{ ...ABRE_LIGA },
			{ if: 'flag.b07_oficio_curri', then: [
				{ say: 'priya', text: '¿Otra vez por aquí? —Te sirve un cuenco sin preguntar—. El de hoy pica. Si lloras, es que está bueno. Si no lloras, es que eres de Pistón.' },
				{ end: true },
			] },
			{ if: '!flag.b07_priya_vista', then: [
				{ set: { 'flag.b07_priya_vista': true } },
				{ text: 'En la cocina, una mujer con un moño alto y un lápiz clavado en él remueve tres ollas con una mano y con la otra corta cebolla sin mirar. Lleva un delantal naranja con manchas de cúrcuma que parecen un mapa. Sonríe como quien ya sabe que va a ganar.' },
				{ say: 'priya', text: 'Priya Lal. La del curri. En Pistón no hay boda, entierro ni Apertura sin mi curri. —Prueba una olla con el dedo—. ¿La Liga? Soy de las siete. La de los fogones. Mi palabra cuesta cara: o me traes una **Maxiseta** de la Pradera Radiante, o me demuestras que sabes de cocina.' },
				{ say: 'priya', text: 'Y para lo segundo… —Señala la barra con el cucharón—. Ese señor de ahí lleva tres días apuntando todo lo que hago. Dice que es chef. Que viene de Alola. Que quiere aprender. No le he dejado entrar en mi cocina.' },
			] },
			{ if: 'flag.b07_ofi_priya_mal && ' + OFI_DOS + ' && !flag.b07_ofi_priya_segunda', then: [
				{ set: { 'flag.b07_ofi_priya_segunda': true, 'flag.b07_ofi_priya_mal': false } },
				{ say: 'priya', text: 'Bronwen dice que tienes temple, y Silas que tienes cabeza. Yo digo que tienes hambre. Las tres cosas valen. —Se limpia las manos—. Otra ronda, si quieres.' },
			] },
			{ prompt: 'Priya prueba otra olla. Gaspar mira desde la barra.', choice: [
				{ text: 'Darle una Maxiseta.', cond: 'has("maxmushrooms")', then: [{ call: 'b07_priya_seta' }] },
				{ text: 'Proponer un duelo de curri con Gaspar.', cond: '!flag.b07_gaspar_curri && !flag.b07_ofi_priya_mal', then: [{ call: 'b07_curri_duelo' }] },
				{ text: 'Volver a cocinar con Gaspar.', cond: 'flag.b07_gaspar_curri && !flag.b07_ofi_priya_mal', then: [{ call: 'b07_curri_duelo' }] },
				{ text: 'Ahora no.', then: [{ say: 'priya', text: 'Aquí la puerta siempre está abierta. La cocina, no.' }] },
			] },
		],
		b07_priya_seta: [
			{ if: '!has("maxmushrooms")', then: [{ end: true }] },
			{ take: 'maxmushrooms', cond: 'has("maxmushrooms")' },
			{ text: 'Le das la Maxiseta. Priya la toma con dos dedos, la huele, la mira a contraluz. Brilla un poco en su mano, roja, como una brasa pequeña.' },
			{ say: 'priya', text: 'De la Pradera. Del roble viejo. —Cierra los ojos—. Huele a tormenta. Las buenas huelen a tormenta. Con esta hago una olla que se acordarán en Artejo.' },
			{ call: 'b07_priya_si' },
		],
		b07_priya_si: [
			{ set: { 'flag.b07_oficio_curri': true } },
			{ say: 'priya', text: 'Priya Lal, de los fogones, te da su palabra. Y cuando tengas cuatro, aquí se brinda. Con té. El curri, después. Siempre después.' },
			{ call: 'b07_ofi_cuenta' },
		],
		b07_gaspar_galar: [
			{ set: { 'flag.b07_gaspar_galar': true } },
			{ text: 'En la barra, un hombre calvo con barba, pañuelo rojo y un cuaderno lleno de manchas apunta algo, mira la cocina, tacha, vuelve a apuntar. Al verte, se le ilumina la cara entera.' },
			{ say: 'gaspar', text: '¡{jugador}! ¡Qué alegría! ¿Tú también en Galar? Yo llevo una semana. La Fonda de Konikoni la cuida Lulú, que me echa la bronca por carta. Yo he venido a por el curri. El de aquí. El de ella.' },
			{ say: 'gaspar', text: 'Comer bien es la mitad de la aventura. Y esta mujer cocina la otra mitad. —Baja la voz—. Pero no me deja entrar en la cocina. Dice que no conozco la tierra. Y tiene razón: en Galar todo sabe a lluvia y yo no sé por qué.' },
			{ if: 'flag.b05_shoku_hecho', then: [
				{ say: 'gaspar', text: 'En Alola aprendí que un duelo de cocina se gana cocinando para el otro, no contra él. Lulú me lo enseñó perdiendo. O ganando. Ya no me acuerdo de quién ganó. Me acuerdo de lo que comimos.' },
			] },
			{ say: 'gaspar', text: 'Si tú le propusieras un duelo… Ella y yo, el mismo curri, y tú eliges los ingredientes. Los mismos para los dos. Así se vería quién cocina. —Te mira con los ojos brillantes—. Y yo podría entrar en la cocina. Aunque sea para perder.' },
		],
		b07_curri_duelo: [
			{ if: '!flag.b07_gaspar_curri', then: [
				{ text: 'Le propones el duelo a Priya. Ella mira a Gaspar de arriba abajo. Gaspar se pone de pie tan deprisa que tira el taburete.' },
				{ say: 'priya', text: '¿Un duelo? ¿En mi taberna? —Se ríe—. Sale. Pero las reglas son mías: tú eliges los ingredientes, los mismos para los dos. Si eliges como un turista, perdemos los dos. Y tú no tienes mi palabra.' },
				{ say: 'gaspar', text: 'Acepto. —Ya se está atando el delantal—. Y si gano, entro en la cocina. Y si pierdo, también entro. A fregar.' },
			], else: [
				{ say: 'priya', text: '¿Otra vez? —Se ata el delantal—. Gaspar, a los fogones. Este se cree que ya sabe de curri.' },
			] },
			{ set: { 'vars.b07_curri_pts': 0 } },
			{ text: 'Los parroquianos apartan las mesas. Alguien pone una pizarra: «PRIYA · GASPAR». Los dos esperan delante de los fogones, quietos, mirándote. Te toca elegir.' },
			{ prompt: 'La base del curri.', choice: [
				{ text: 'Salchichas de Pistón.', then: [{ set: { 'vars.b07_curri_pts': '+1' } }, { say: 'priya', text: 'Bien. Las de la carnicería de la estación. Las que comen los ferroviarios.' }] },
				{ text: 'Arroz de Alola.', then: [{ say: 'gaspar', text: '¡Arroz de Alola! —A Priya no le hace gracia. A Gaspar, mucha.' }] },
				{ text: 'Tofu.', then: [{ say: 'priya', text: 'Tofu. —Silencio en la taberna—. Bueno. Es una elección. Se respeta. No se entiende, pero se respeta.' }] },
			] },
			{ prompt: 'Lo que pica.', choice: [
				{ text: 'Baya Tamate.', then: [{ set: { 'vars.b07_curri_pts': '+1' } }, { say: 'priya', text: 'Tamate. Pica dulce y luego pica de verdad. Como un galarés.' }] },
				{ text: 'Guindilla de Kalos.', then: [{ say: 'gaspar', text: 'Esa la conozco. —Gaspar sonríe. Priya, no.' }] },
				{ text: 'Nada. Que no pique.', then: [{ say: 'priya', text: '¿Un curri que no pica? —Le pasa a Gaspar un vaso de leche, por si acaso—. Eso es un guiso. Con buena voluntad.' }] },
			] },
			{ prompt: 'El toque final.', choice: [
				{ text: 'Una Manzana Dulce.', then: [{ set: { 'vars.b07_curri_pts': '+1' } }, { say: 'priya', text: 'Manzana. Como en la receta de mi madre. —Te mira de otra manera—. ¿Quién te lo ha dicho?' }] },
				{ text: 'Una Maxiseta.', cond: 'has("maxmushrooms")', then: [{ take: 'maxmushrooms', cond: 'has("maxmushrooms")' }, { set: { 'vars.b07_curri_pts': '+2' } }, { say: 'priya', text: '¡Una Maxiseta! ¡Eso es trampa! —Se le escapa la risa—. Me encanta la trampa.' }] },
				{ text: 'Leche Mu-mu.', then: [{ say: 'gaspar', text: 'Para suavizar. —Priya asiente, a regañadientes. Es lo que haría Gaspar.' }] },
			] },
			{ text: 'Cocinan. Nadie habla. Priya, con una mano en tres ollas. Gaspar, con las dos en una sola, oliendo cada cosa antes de echarla, como si le pidiera permiso. La taberna huele a algo que no habías olido nunca.' },
			{ if: 'vars.b07_curri_pts >= 2', then: [
				{ text: 'Los dos curris llegan a la mesa a la vez. Los parroquianos prueban, en silencio. Un ferroviario viejo deja la cuchara y se queda mirando el plato de Priya. Luego el de Gaspar. Luego el de Priya otra vez.' },
				{ say: 'priya', text: '…El mío gana. —Prueba el de Gaspar—. Por poco. Por muy poco. Has cocinado como si fuera tu tierra, y no lo es. —Le tiende la mano—. Mañana a las seis, en mi cocina. Llega tarde y friegas.' },
				{ say: 'gaspar', text: 'A las seis. A las cinco y media. —Le tiembla el bigote—. Comer bien es la mitad de la aventura. Y cocinar con quien te gana, la otra mitad.' },
				{ set: { 'flag.b07_gaspar_curri': true } },
				{ say: 'priya', text: 'Y tú. —Se gira hacia ti—. Has elegido como alguien de aquí. Eso no se aprende en un día.' },
				{ call: 'b07_priya_si' },
			], else: [
				{ text: 'Los dos curris llegan a la mesa. Los parroquianos prueban. Educados. Muy educados. Un ferroviario viejo dice «interesante». En Pistón, «interesante» es lo peor que se le puede decir a un plato.' },
				{ say: 'gaspar', text: 'Gana el mío. —Lo dice sin alegría—. Porque con estos ingredientes yo improviso mejor. Pero esto no es curri de aquí. Esto es curri de viaje.' },
				{ say: 'priya', text: 'Lo es. —Se cruza de brazos—. Gaspar: mañana a las seis, en mi cocina, que te enseño lo que es de aquí. Tú: hoy no. Has elegido como un turista. Sin rencor. Los turistas también comen.' },
				{ set: { 'flag.b07_gaspar_curri': true, 'flag.b07_ofi_priya_mal': true } },
			] },
		],
		b07_sopa_maxi: [
			{ set: { 'flag.b07_sopa_maxi': true } },
			{ text: 'En la cocina de Priya, Gaspar tiene una olla aparte, pequeña, tapada con un plato. Cuando levanta el plato sale un vapor rojizo que brilla un segundo en el aire, como las nubes de los nidos.' },
			{ say: 'gaspar', text: 'Mira. Mira. —Te pone la cuchara delante sin dejarte probar—. Priya me enseñó una receta de su abuela, de cuando en Pistón había más Maxisetas que farolas. Una sopa. **Sopa Maxi**. Dicen que a algunos Pokémon les despierta algo. Algo que solo se ve en Galar.' },
			{ say: 'priya', text: 'No a todos. —Desde los fogones, sin mirar—. A los que lo tienen dentro. Mi abuela decía que había un Snorlax en Pistón que se comía una olla y se ponía tan grande que le salía un árbol en la barriga. Mi abuela decía muchas cosas.' },
			{ give: 'recetasopamaxi' },
			{ say: 'gaspar', text: 'Te he copiado la receta. Con mi letra, que se entiende peor que la suya. —Se rasca la barba—. Hace falta Maxiseta. Cuantas más mejor. Y un fogón que aguante el fuego que pide, que el de Priya ya no es lo que era.' },
			{ intel: { npc: 'gaspar', text: 'En Pistón, en la cocina de Priya, aprendió la Sopa Maxi, una receta antigua con Maxisetas: «a algunos Pokémon les despierta algo que solo se ve en Galar».' } },
		],
		b07_sopa_pedir: [
			// Factor Gigamax (motor del paso 5: comando `gmax`). El fogón de Naboru está listo cuando la caldera ya va bien
			// (su oficio) o cuando ha pasado tiempo (Medalla Planta). Gasta 1 Maxiseta, como dice la receta.
			{ if: '!(' + FOGON + ')', then: [
				{ say: 'gaspar', text: '¿Una Sopa Maxi? —Mira la olla pequeña con pena—. Todavía no. El fogón de Priya no aguanta el fuego que pide: se apaga a la mitad y la sopa se queda en sopa. Naboru dice que me hará uno en las calderas, cuando termine con la presión.' },
				{ say: 'gaspar', text: 'Cuando lo tenga, guárdame Maxisetas. Y elige con calma a quién se la das. No a todos les despierta lo mismo. A algunos, nada. A otros… ya lo verás.' },
				{ end: true },
			] },
			{ if: '!flag.b07_fogon_visto', then: [
				{ set: { 'flag.b07_fogon_visto': true } },
				{ text: 'Al fondo de la cocina de Priya hay un fogón nuevo, de hierro negro, con remaches de caldera y una placa pequeña: «N.». Gaspar le da una palmada como quien saluda a un caballo.' },
				{ say: 'gaspar', text: 'Me lo trajo Naboru ayer, en una carretilla, él solo. No dijo nada. Lo encendió, miró la llama un minuto, asintió y se fue. —Se ríe—. Es la reseña más bonita que me han hecho nunca.' },
			] },
			{ say: 'gaspar', text: 'Una Maxiseta por olla, que es lo que pide la receta. Y un Pokémon que lo lleve dentro. Si no lo lleva, la sopa solo le quita el hambre, que tampoco está mal.' },
			{ gmax: 'maxmushrooms', n: 1, prompt: '¿A quién le das la Sopa Maxi?',
				onNone: [
					{ if: '!has("maxmushrooms")', then: [
						{ say: 'gaspar', text: 'Sin Maxiseta no hay sopa. Salen en la **Pradera Radiante**, entre la hierba alta, cuando ha llovido. Tráeme una y encendemos el fogón.' },
					], else: [
						{ say: 'gaspar', text: 'Huele la olla, mira a tu equipo… y nada. —Niega con la cabeza—. Ninguno de los que llevas encima lo tiene dentro. Tráeme a otro. Priya dice que los que lo tienen se notan: se les ponen los ojos grandes cuando huelen la seta.' },
					] },
				],
				onQuit: [{ say: 'gaspar', text: 'Bien hecho. Se elige con calma. La olla no se va a ningún sitio.' }],
				onWin: [
					{ cutscene: { bg: { type: 'indoor', wall: '#6a3a2a', floor: '#8a5a3a' }, frames: [
						{ actors: [{ id: 'gaspar', at: 'left', enter: 'left' }], item: 'maxmushrooms', on: '_c', cam: 'push', fx: 'light', text: 'Gaspar remueve la olla en el fogón de Naboru. La Maxiseta se deshace en el caldo y el vapor se vuelve rojo, espeso, con chispas que suben despacio.' },
						{ actors: [{ key: 'gaspar', do: 'nod' }, { key: '_c', dim: true }], on: false, fx: ['flash', 'sparkle'], color: '#e63946', text: '{vars.gmax_ultimo} se toma el cuenco entero sin respirar. Durante un segundo, a su alrededor, el aire se llena de nubes rojas pequeñitas, como las de los nidos. Luego se van.' },
						{ on: false, cam: 'pull', fx: 'glow', text: '{vars.gmax_ultimo} tiene ahora el **factor Gigamax**. Cuando se dinamaxice en Galar, cambiará de forma.' },
					] } },
					{ set: { 'flag.b07_gmax_dado': true } },
					{ say: 'gaspar', text: '¡Eso es! ¡Eso es lo que decía Priya! —Te agarra del hombro—. Lo he visto. Lo he visto con estos ojos. Lo apunto en el recetario: «funciona». Subrayado dos veces.' },
					{ say: 'priya', text: '—Desde la barra, sin girarse—. Te lo dije. Mi abuela decía muchas cosas. Algunas, verdad.', cond: '!flag.b07_gmax_priya' },
					{ set: { 'flag.b07_gmax_priya': true } },
				],
			},
		],
		b07_oficios_sello: [
			{ set: { 'flag.b07_oficios_hecho': true } },
			{ text: 'En la mesa del fondo de la taberna, los maestros que te han dado su palabra te esperan con una taza de té delante. Hay una para ti. Priya la llena hasta arriba, de pie, con la tetera en alto.' },
			{ text: 'Bronwen, con el mandil todavía puesto.', cond: 'flag.b07_oficio_herreria' },
			{ text: 'Silas, con la lupa colgada del chaleco, mirando el reloj de la pared, que por una vez va en hora.', cond: 'flag.b07_oficio_relojeria' },
			{ text: 'Ivy, con las manos azules alrededor de la taza y una bufanda morada en las rodillas.', cond: 'flag.b07_oficio_tintoreria' },
			{ text: 'Abel, sentado en el banco de la izquierda, muy recto.', cond: 'flag.b07_oficio_carpinteria' },
			{ text: 'Agnes, que ha venido con la gorra puesta y mira el reloj de bolsillo cada dos minutos: el último tren sale a las 23:58.', cond: 'flag.b07_oficio_aguja' },
			{ text: 'Naboru, en la punta de la mesa, con su camisa blanca impecable y una taza que no bebe.', cond: 'flag.b07_oficio_calderas' },
			{ say: 'priya', text: 'En Pistón hay siete oficios. Los siete hacen que esta ciudad funcione: que el hierro aguante, que el reloj diga la verdad, que las bufandas tengan color, que los banquillos no cojeen, que los trenes lleguen, que la gente coma y que las casas no se queden frías.' },
			{ say: 'priya', text: 'Quien consigue la palabra de cuatro, es de aquí. No porque haya nacido aquí. Porque ha trabajado aquí. —Levanta la taza—. Por quien llega de fuera y se queda a fregar.' },
			{ cutscene: { time: 'noche', bg: { type: 'indoor', wall: '#6a3a2a', floor: '#8a5a3a' }, start: 'dark', frames: [
				{ actors: [{ id: 'priya', at: 'left', enter: 'left' }], on: '_c', cam: 'push', item: 'sellooficios', fx: 'light', text: 'Priya deja sobre la mesa una chapa de latón del tamaño de una moneda grande, con siete muescas en el borde y una cinta roja.' },
				{ actors: [{ key: 'priya', do: 'nod' }], on: '_c', fx: ['flash', 'sparkle'], color: '#e9c46a', text: 'Los maestros golpean la mesa con la taza, uno por uno. *Toc. Toc. Toc. Toc.* Cada golpe suena como una muesca.' },
				{ on: '_c', cam: 'pull', fx: 'glow', text: 'El **Sello de los Siete Oficios**. En Pistón, quien lo lleva compra en los talleres como uno de casa.' },
			] } },
			{ give: 'sellooficios' },
			{ say: 'rotom', text: '¡Bzzt! ¡Somos de Pistón! Bueno, un poco. Lo apunto como «vecin{o|a|e} honorari{o|a|e}». Y en los talleres ya nos venden las cosas que no se venden en ningún otro sitio. ¡Manzanas! ¡Teteras rotas! ¡Teteras rotas a propósito!', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Somos de aquí. Un poco. En los talleres ya nos venden. Lo apunto.', cond: PURG },
			{ quest: 'b07_s_oficios', stage: 'hecha', done: true },
			{ diary: 'Hoy en Pistón, en una taberna, nos dieron una chapa. Siete muescas. Una cinta roja. Brindaron con té. Nadie bebió el té. Todos golpearon la mesa.\n\nCreo que eso es ser de un sitio. Lo pienso. No estoy seguro.', cond: D_PURGADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo conseguimos el Sello de los Siete Oficios, en Ciudad Pistón. Para ganarlo hay que convencer a cuatro de los siete maestros de la ciudad: herrería, relojería, tintorería, carpintería, agujas, fogones y calderas. No se convence a nadie con dinero. Se ha intentado.\n\nBrindaron con té en la taberna de Priya.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: 'Hoy nos hicieron de Pistón. ¡De verdad! Hay una tradición muy antigua de siete maestros, y conseguimos que cuatro nos dieran su palabra. Nos dieron una chapa preciosa con una cinta roja y brindamos con té. ¡El té de Galar es muy fuerte! Bueno, eso dicen. Yo no bebo.', cond: D_DOBLE },
			{ if: OFI_N + ' >= 7 && !flag.b07_oficios_siete', then: [{ call: 'b07_oficios_siete' }] },
		],
		b07_oficios_siete: [
			{ set: { 'flag.b07_oficios_siete': true } },
			{ text: 'Naboru se levanta de la punta de la mesa, despacio, con la taza que no ha bebido. La deja delante de ti. Todos se callan.' },
			{ say: 'naboru', text: 'Siete. —No lo dice alto—. Hace veinte años que nadie conseguía la palabra de los siete. La última fui yo. Antes de ser líder. Antes de las calderas.' },
			{ say: 'naboru', text: 'Firmamos todos. Como entonces. —Saca del bolsillo de la camisa una hoja doblada y una pluma—. No es un premio. Es una constancia. En Pistón, lo que consta, pesa.' },
			{ give: 'firmasoficios' },
			{ give: 'charcoal' },
			{ say: 'naboru', text: 'Y el carbón, de mis calderas. Para que lleves un poco de fuego de aquí. Se apaga si no lo cuidas. Como todo.' },
			{ intel: { npc: 'naboru', text: 'Consiguió la palabra de los siete maestros de Pistón antes de ser líder. Hacía veinte años que nadie lo repetía. Te dio una hoja con las siete firmas «para que conste».' } },
		],

		// =================== LAS CALDERAS: NABORU ===================
		b07_naboru: [
			{ ...ABRE_LIGA },
			{ if: 'flag.b07_oficio_calderas', then: [
				{ say: 'naboru', text: 'La presión, estable. El fuego, contento. —No te mira: mira las agujas—. Mi gimnasio volverá a abrir cuando vuelvas a Galar en otra temporada. Para entonces quiero ver si tu fuego ha crecido. Disciplina.' },
				{ say: 'naboru', text: 'Gaspar me ha pedido un fogón para su sopa. Lo estoy haciendo. Despacio. Las cosas de fuego se hacen despacio.', cond: 'flag.b07_sopa_maxi && !(' + FOGON + ')' },
				{ say: 'naboru', text: 'El fogón de Gaspar ya está en la cocina de Priya. Aguanta. —Una pausa—. La sopa, no la he probado. No como cosas que brillan.', cond: FOGON },
				{ end: true },
			] },
			{ if: '!flag.b07_naboru_visto', then: [
				{ set: { 'flag.b07_naboru_visto': true } },
				{ text: 'Subes a la pasarela. El calor de las calderas te seca los ojos. El hombre de la cinta en la frente no se gira. Tiene el pelo gris, la espalda muy recta y una camisa blanca sin una mancha, cosa que, aquí abajo, debería ser imposible.' },
				{ say: 'naboru', text: 'Naboru. Líder de Pistón. —Inclina la cabeza, sin dejar de mirar las agujas—. Mi gimnasio está en obras de temporada. No es una excusa. Es que estas calderas calientan media ciudad y este año tosen. Un gimnasio puede cerrarse. Una caldera, no.' },
				{ say: 'naboru', text: 'Vendrás otra vez a Galar. Entonces combatiremos en mi estadio, por la medalla. Hoy no. —Por fin te mira—. Pero si vienes por la Liga, soy uno de los siete. Las calderas.' },
				{ say: 'naboru', text: 'Mi palabra se gana con disciplina. Un combate amistoso, sin medalla, donde se vea si sabes mantener el fuego. O la presión de esta caldera: lleva toda la mañana subiendo y bajando. Si la estabilizas, me ahorras una tarde.' },
				{ if: LUC, then: [
					{ text: '{riolu} se acerca a la barandilla de la pasarela y pone la palma hacia la caldera del centro. No la toca. El aura le tiembla un poco, como el aire encima del fuego.' },
					{ say: 'naboru', text: 'Lo nota. —Mira a {riolu} con atención—. La del centro tiene una válvula atascada. Yo tardé tres días en encontrarla. Él, tres segundos. —Asiente—. Disciplina de otro tipo.' },
				] },
			] },
			{ if: 'flag.b07_ofi_naboru_mal && ' + OFI_DOS + ' && !flag.b07_ofi_naboru_segunda', then: [
				{ set: { 'flag.b07_ofi_naboru_segunda': true, 'flag.b07_ofi_naboru_mal': false } },
				{ say: 'naboru', text: 'Los demás maestros me han hablado de ti. —Se ajusta la cinta—. Un fuego que se apaga una vez no es un fuego malo. Es un fuego que ha aprendido. Otra vez.' },
			] },
			{ prompt: 'Naboru espera, con las manos a la espalda.', choice: [
				{ text: 'Combate amistoso.', cond: '!flag.b07_ofi_naboru_mal', then: [{ call: 'b07_naboru_combate' }] },
				{ text: 'Estabilizar la presión de la caldera.', then: [{ call: 'b07_naboru_caldera' }] },
				{ text: 'Ahora no.', then: [{ say: 'naboru', text: 'La caldera esperará. Yo también. Es lo que hacemos aquí abajo.' }] },
			] },
		],
		b07_naboru_combate: [
			{ say: 'naboru', text: 'Antes, cura a tu equipo. No combato contra Pokémon cansados. No es disciplina: es ventaja.' },
			{ prompt: '¿Curar al equipo antes del combate con Naboru?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'Naboru abre un armario de la pasarela: pociones ordenadas por fecha, en filas perfectas. Cura a tu equipo uno por uno, sin prisa.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'naboru', text: 'Respeto la decisión. No la comparto.' }] },
			] },
			{ battle: 'naboru_oficio', lose: 'continue',
				onWin: [
					{ text: 'El Centiskorch de Naboru se enrosca sobre sí mismo y deja de arder, poco a poco, como una estufa que se apaga. Naboru lo devuelve a su Poké Ball y se queda un momento en silencio.' },
					{ say: 'naboru', text: 'Has esperado tu turno. Incluso cuando ibas perdiendo. —Se inclina, de verdad, una reverencia corta—. Eso es lo que buscaba. La medalla, otra temporada. La palabra, hoy.' },
					{ intel: { npc: 'naboru', text: 'Líder de Pistón (Fuego). Su gimnasio está en obras de temporada: cuida las calderas que calientan la ciudad. Su Centiskorch sale el último. Medalla, en la siguiente visita a Galar.' } },
					{ call: 'b07_naboru_si' },
				],
				onLose: [
					{ set: { 'flag.b07_ofi_naboru_mal': true } },
					{ heal: 'Naboru cura a tu equipo con las pociones del armario, en el mismo orden.' },
					{ say: 'naboru', text: 'Se te ha escapado la presión al final. Hoy no. Pero la caldera sigue ahí, si quieres demostrarlo de otra manera.' },
				] },
		],
		b07_naboru_caldera: [
			{ text: 'Naboru te da unos guantes gruesos y te lleva a la base de la caldera del centro. Hay un suelo de rejilla, dos contrapesos de hierro sobre ruedas y dos placas de válvula en el suelo. Al fondo, tras una compuerta de vapor, el manómetro principal.' },
			{ say: 'naboru', text: 'Un contrapeso sobre cada válvula. Entonces se abre la compuerta y llegas al manómetro. Los contrapesos se empujan; no se arrastran. Piensa antes. Empujar es fácil. Desempujar, no.' },
			{ puzzle: { id: 'b07_caldera', title: 'La presión de la caldera', hint: 'Un contrapeso en cada válvula abre la compuerta. Los contrapesos se empujan, nunca se arrastran.', theme: 'lab',
				grid: [
					'#######',
					'#P..#G#',
					'#.R.#D#',
					'#..R..#',
					'#S..S.#',
					'#.....#',
					'#######',
				] },
				onSolve: [
					{ text: 'El segundo contrapeso cae en su válvula con un *clonc*. La compuerta de vapor se abre con un silbido. Llegas al manómetro: la aguja tiembla, baja, sube un poco, y se queda quieta en la marca verde. La caldera del centro deja de toser.' },
					{ say: 'naboru', text: 'Estable. —Lo mira mucho rato—. La primera vez que yo lo hice, tardé una tarde entera y me quemé el codo. Tú no te has quemado nada. Disciplina.' },
					{ call: 'b07_naboru_si' },
				],
				onQuit: [{ say: 'naboru', text: 'Deja los contrapesos. Los pondré yo como estaban. La caldera no se va a ir a ninguna parte.' }] },
		],
		b07_naboru_si: [
			{ set: { 'flag.b07_oficio_calderas': true } },
			{ say: 'naboru', text: 'Naboru, de las calderas, te da su palabra. Ve a la taberna. Yo iré después. Llego tarde siempre: espero a la última aguja.' },
			{ call: 'b07_ofi_cuenta' },
		],
	},

	// =====================================================================
	// NPCs GENÉRICOS DE ESTE TRAMO
	// =====================================================================
	npcs: {
		taxista_galar: { name: 'Guía de los taxis', generic: true, look: { hair: 'cap', hairColor: '#9aa0a8', outfit: '#5a3a2a', outfit2: '#f2c84a', skin: 1, eyesStyle: 'narrow', mouth: 'smile', acc: 'mustache', capColor: '#2b2b38', collar: 'jacket' } },
		ventanilla_piston: { name: 'Taquillera', generic: true, look: { hair: 'bun', hairColor: '#c4743a', outfit: '#3a6a4a', outfit2: '#e9e8e0', skin: 1, eyesStyle: 'sleepy', mouth: 'flat', acc: 'glasses', collar: 'vest' } },
		of_herrera: { name: 'La herrera', generic: true, look: { hair: 'tied', hairColor: '#3a2a2a', outfit: '#5a3a2a', outfit2: '#c43a3a', skin: 2, eyesStyle: 'sharp', mouth: 'flat', brows: 'thick', acc: 'goggles scar', collar: 'apron', build: 'broad' } },
		of_relojero: { name: 'El relojero', generic: true, look: { hair: 'short', hairColor: '#cfcac0', outfit: '#5a4a3a', outfit2: '#c9a66b', skin: 1, eyesStyle: 'narrow', mouth: 'smile', acc: 'glasses mustache', collar: 'vest', build: 'narrow', age: 'old' } },
		of_tintorera: { name: 'La tintorera', generic: true, look: { hair: 'curly', hairColor: '#c43a7a', outfit: '#3a5ab5', outfit2: '#f2c84a', skin: 3, eyesStyle: 'happy', mouth: 'grin', acc: 'bandana freckles', collar: 'apron' } },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		escaletaapertura: { name: 'Escaleta de la Apertura', pocket: 'key', desc: 'La hoja con el orden de la Apertura de la Temporada, clavada con chinchetas en el tablón público del vestíbulo del Estadio de Pistón. La podía leer cualquiera.',
			read: '**ESTADIO DE PISTÓN**\n*Apertura de la Temporada · Escaleta pública*\n\n---\n\n**17:00** · Apertura de puertas\n**17:30** · Bienvenida del Campeón, **Lionel**\n**17:45** · Calentamiento de los aspirantes de la Gira Interregional\n**18:00** · Combate de exhibición (primera parte)\n**18:05** · *Casos Fríos* · directo desde la grada de prensa · «El Circuito y sus misterios»\n**18:15** · Descanso · Musical de Mayólica: «La dama de la luna» (fragmento)\n**18:35** · Combate de exhibición (segunda parte)\n**18:40** · **Cierre de *Casos Fríos***\n**18:45** · Despedida del Campeón\n\n---\n\n**Franja de mensajes de la afición en el marcador:** de 18:00 a 18:45. **Un mensaje por minuto.** Se programan al minuto. Venta en la **ventanilla 3** hasta completar.\n\n*Se ruega no arrojar Poké Balls al césped.*' },
		recibomarcador: { name: 'Recibo de la ventanilla 3', pocket: 'key', desc: 'Copia de un recibo de la ventanilla de mensajes de la afición del Estadio de Pistón. Doce mensajes, pagados en efectivo. La taquillera te lo dio porque estaba aburrida.',
			read: '**ESTADIO DE PISTÓN · VENTANILLA 3**\n*Mensajes de la afición · Copia para archivo*\n\n---\n\n**Pedido n.º 0412** · Jueves (cinco días antes de la Apertura)\n**Cantidad:** 12 mensajes · franja de la afición · Apertura de la Temporada\n\n**Minutos reservados:** 18:05 · 18:08 · 18:12 · 18:16 · 18:19 · 18:23 · 18:26 · 18:30 · 18:33 · 18:36 · 18:38 · **18:40**\n\n**Pago:** en efectivo. Importe exacto.\n\n**Firma del cliente:** *(a máquina, con las «e» medio borradas)* Desde la concha\n\n---\n\n**Minutos libres en la franja:** 18:39 · 18:42 · 18:44\n\n*Nota de la ventanilla, a bolígrafo:* «Pidió que nadie leyera los mensajes antes de que salieran. Le dije que aquí no leemos nada. Insistió. Pagó el importe exacto. Nadie paga el importe exacto».' },
		cartaapuntador4: { name: 'Carta del Apuntador (IV)', pocket: 'key', desc: 'Papel color crema de programa de teatro, escrito a máquina, con todas las «e» medio borradas. La trajo a la cabina de prensa del Estadio de Pistón un muchacho pagado por adelantado.',
			read: '*(Papel color crema, grueso, como el de los programas de teatro. Máquina de escribir. La «e» se come la tinta en cada palabra que la lleva.)*\n\n---\n\nA la atención de *Casos Fríos*, grada de prensa del Estadio de Pistón:\n\nSi están leyendo esto, el marcador ya ha dicho lo que tenía que decir. No sé qué ha pasado en el último minuto. No me hace falta saberlo. Esto lo escribo el jueves, antes que nada.\n\nEl primer acto fue de ustedes. Lo reconozco porque me gusta perder bien.\n\nDoce mensajes, señorita Castellanos. Doce frases que ya estaban dichas. «**Nota para el episodio: aquí hay gato encerrado.**» La ha dicho usted treinta y una veces en antena. Siempre a los diez minutos. Yo solo la he puesto en un sitio más grande, un minuto más tarde, para que parezca que la oigo pensar.\n\nNo adivino nada. Nunca adivino. Escucho. Y ustedes hablan mucho, y siempre a la misma hora.\n\nEl tercer acto, en casa.\n\nLes guardo las butacas.\n\n— *Desde la concha*' },
		horariopiston: { name: 'Horario de la estación de Pistón', pocket: 'key', desc: 'Una hoja de horarios de la estación de Ciudad Pistón, con una esquina doblada. Te la dio Agnes Tull, la guardagujas. Es pública. Nadie la lee.',
			read: '**ESTACIÓN DE CIUDAD PISTÓN**\n*Horario de salidas · Temporada de otoño*\n\n---\n\n**Andén 1 · Hoyuelo** (por la Ruta 3)\nSalida a **y doce** de cada hora, de 6:12 a 22:12.\n\n**Andén 2 · Plié**\nSalida a **y cuarenta** de cada hora, de 6:40 a 23:40.\n\n**Andén 3 · Crampón**\nSalida **en punto**, solo las **horas pares**, de 6:00 a 22:00.\n\n**Andén 4 · Artejo**\n*Servicio suspendido por obras hasta nuevo aviso.*\n\n---\n\n*Último tren del día: 23:58 (Plié, mercancías).*\n\n*(A lápiz, con la letra de Agnes:)* *Los trenes llegan a su hora. El reloj de la torre, no. Se ruega no fiarse del reloj.*' },
		hieloaxew: { name: 'Hielo de la cala', pocket: 'key', desc: 'Un bloque de hielo azulado de la cala helada del Lago Axew, hecho con la escarcha que bostezan los Vanillite. No suda ni al sol. Lo pidió Bronwen, la herrera de Pistón, para templar una pieza.' },
		recetasopamaxi: { name: 'Receta de la Sopa Maxi', pocket: 'key', desc: 'Una hoja de cuaderno con manchas de cúrcuma, copiada por Gaspar con su letra apretada de la receta de la abuela de Priya.',
			read: '*(Letra de Gaspar, apretada, con dibujitos en el margen. Manchas de cúrcuma y de algo rojo que brilla un poco.)*\n\n**SOPA MAXI** · *receta de la abuela de Priya Lal, Pistón*\n\n---\n\n· Caldo de hueso, de toda la noche.\n· Cebolla, mucha. Más.\n· Una Baya Tamate, para que despierte.\n· **Maxisetas**: las que tengas. Nunca menos de una. «Que huelan a tormenta».\n· Fuego fuerte, constante. Si se apaga a la mitad, se queda en sopa.\n\n---\n\n*Priya dice:* «No a todos los Pokémon les hace algo. A los que lo llevan dentro, les despierta lo que solo se ve en Galar».\n\n*Yo digo:* comer bien es la mitad de la aventura. Esta sopa, quizá, es la otra mitad.\n\n*(Al pie, subrayado:)* **Falta: un fogón que aguante.**' },
		cintaep3: { name: 'Cinta del episodio 3', pocket: 'key', desc: 'Una cinta de casete con una pegatina amarilla que pone «EP. 3» con la letra de Renata. Te la dio a guardar en la cabina de prensa de Pistón. No te dijo por qué. Te dijo «todavía no».' },
		firmasoficios: { name: 'Las siete firmas', pocket: 'key', desc: 'Una hoja doblada con las firmas de los siete maestros de la Liga de los Siete Oficios de Pistón. Te la dio Naboru «para que conste».',
			read: '*(Papel grueso, doblado en cuatro, con olor a carbón.)*\n\n**LIGA DE LOS SIETE OFICIOS · CIUDAD PISTÓN**\n\nLos abajo firmantes, maestros de los siete oficios de esta ciudad, damos fe de que quien lleva esta hoja ganó la palabra de los siete.\n\n---\n\n*Bronwen*, herrería. *(La firma está un poco quemada en una esquina.)*\n*Silas*, relojería. *(Con la hora exacta debajo: 19:12.)*\n*Ivy*, tintorería. *(Con huella azul.)*\n*Abel*, carpintería. *(Con un poco de serrín pegado.)*\n*Agnes Tull*, agujas. *(Letra perfecta. Ni una vuelta de más.)*\n*Priya Lal*, fogones. *(Con una mancha de cúrcuma con forma de corazón. Dice que no ha sido a propósito.)*\n*Naboru*, calderas.\n\n---\n\n*La última vez que se llenó esta hoja fue hace veinte años. La firmó un muchacho que todavía no era líder de nada.*' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b07_pradera_setas: {
			name: 'El roble de las setas', icon: '🍄', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'bosque', hint: 'Sacude las ramas del roble: caen setas y bellotas. Las que brillan valen por tres; las pochas, para los Wooloo.' },
			ask: 'Un roble viejo en mitad de la Pradera Radiante, con setas al pie y entre las raíces. Algunas brillan con una luz rojiza. Un Wooloo duerme apoyado en el tronco.',
			text: 'Bajo el roble, setas de todos los tamaños. El Wooloo ni se despierta.',
			wait: 'Bajo el roble ya no queda nada que recoger. Las setas tardan en volver. El Wooloo, no: sigue ahí.',
			table: [
				{ id: 'tinymushroom', w: 18, n: [1, 2] }, { id: 'oranberry', w: 14, n: [1, 2] }, { id: 'sitrusberry', w: 10, n: [1, 1] },
				{ id: 'bigmushroom', w: 8, n: [1, 1] }, { id: 'leppaberry', w: 8, n: [1, 1] }, { id: 'galaricatwig', w: 4, n: [1, 1] },
				{ id: 'maxmushrooms', w: 3, n: [1, 1], rare: true }, { id: 'balmmushroom', w: 1, n: [1, 1], rare: true },
			],
		},
		b07_lago_axew: {
			name: 'El embarcadero del Lago Axew', icon: '🎣', hours: 20, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'lago', hint: 'El lago es frío y muy quieto. Lo que pica, pica fuerte. Espera al «!».',
				wild: [{ sp: 'seaking', lv: [65, 67], w: 6 }, { sp: 'whiscash', lv: [65, 67], w: 5 }, { sp: 'gyarados', lv: [66, 67], w: 3 }, { sp: 'barraskewda', lv: [66, 67], w: 3 }], wildChance: 0.35 },
			ask: 'Un embarcadero de tablas sobre el Lago Axew, con una caña vieja apoyada en un cubo de cebo que huele a demonios. El agua está tan quieta que parece cristal.',
			text: 'El Lago Axew suelta lo suyo. Sale frío hasta lo que no está mojado.',
			wait: 'El lago está quieto. Demasiado quieto. Hoy ya no pica nada.',
			table: [
				{ id: 'pearl', w: 16, n: [1, 1] }, { id: 'freshwater', w: 14, n: [1, 2] }, { id: 'heartscale', w: 8, n: [1, 1] },
				{ id: 'mysticwater', w: 6, n: [1, 1] }, { id: 'shoalsalt', w: 10, n: [1, 2] }, { id: 'prettyfeather', w: 8, n: [1, 2] },
				{ id: 'bigpearl', w: 3, n: [1, 1], rare: true }, { id: 'starpiece', w: 2, n: [1, 1], rare: true },
			],
		},
		b07_silv_arbol: {
			name: 'Un árbol de bayas solitario', icon: '🌳', hours: 18, picks: [2, 3],
			text: 'Las ramas se doblan de fruta. A veces, al sacudirlas, cae algo más que bayas: un Skwovet indignado, por ejemplo.',
			wait: 'El árbol está pelado. Un Skwovet te mira desde la rama más alta con las mejillas llenas. Ha sido él.',
			table: [
				{ id: 'oranberry', w: 18, n: [1, 3] }, { id: 'sitrusberry', w: 12, n: [1, 2] }, { id: 'pechaberry', w: 10, n: [1, 2] },
				{ id: 'cheriberry', w: 10, n: [1, 2] }, { id: 'leppaberry', w: 6, n: [1, 1] }, { id: 'lumberry', w: 3, n: [1, 1] },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		nido_pradera_entreno: {
			name: 'Nido de la Pradera (entrenamiento)', type: 'Normal', rec: 69,
			cond: 'visited("nido_pradera")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **69**: investigadores, fotógrafos y guías que practican combates de nido en el Área Silvestre.' },
				{ text: 'El guía de los taxis da un premio a quien gane **tres** combates. Dice que «sabe de alas».' },
				{ cond: 'flag.b07_premio_nido', text: '✔ Premio conseguido: MT Ala Bis.' },
			],
		},
		naboru_calderas: {
			name: 'Naboru, en las calderas', npc: 'naboru', trainer: 'naboru_oficio', type: 'Fire', rec: 69,
			cond: 'flag.b07_naboru_visto',
			info: [
				{ text: 'El líder de Pistón. Su gimnasio está **en obras de temporada**: este combate es **amistoso**, sin medalla, y una de las dos vías para ganarte su palabra en la Liga de los Siete Oficios. Opcional. Te deja curar antes.' },
				{ text: '4 Pokémon, hasta el nivel 69. Empieza con un Pokémon que **trae el sol**: el fuego pega más fuerte. Su as sale el último.' },
				{ text: '**Agua**, **Roca** y **Tierra** contra el fuego. Con el sol fuera, el agua pierde fuerza: cambia rápido o quítale el sol.' },
				{ cond: 'beat("naboru_oficio")', text: '✔ Ganado. «Has esperado tu turno».' },
			],
		},
		liga_oficios: {
			name: 'La Liga de los Siete Oficios', type: 'Normal', rec: 68,
			cond: 'quest.b07_s_oficios',
			info: [
				{ text: 'Siete maestros de Pistón: herrería, relojería, tintorería y carpintería en la **calle de los talleres**; **Agnes** en la estación; **Priya** en la taberna de curri; **Naboru** en las calderas. Bastan **cuatro**.' },
				{ text: 'Cada maestro tiene **al menos dos vías**. Solo cuatro aceptan un combate, y nunca es la única. Agnes no combate nunca.' },
				{ text: 'Si un maestro te rechaza, prueba su otra vía. Y cuando ya tengas la palabra de **dos**, los que te rechazaron te darán otra oportunidad: en Pistón se lo cuentan todo.' },
				{ text: '**No sustituye al gimnasio:** el de Pistón está en obras de temporada.' },
				{ cond: 'flag.b07_oficios_hecho', text: '✔ Sello de los Siete Oficios conseguido.' },
				{ cond: 'flag.b07_oficios_siete', text: '✔ La palabra de los siete.' },
			],
		},
	},
};
