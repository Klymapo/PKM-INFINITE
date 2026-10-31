// Bloque 7 · T4 · «Los que pagan» (~2 h 15): Pueblo Crampón y el Torneo de los Villanos.
// Tren desde Pistón (Agnes en el andén 3) → Crampón: persianas bajadas, carteles del Team Yell, el gimnasio en la calle.
// Handsome (disfraz malo de turista) y Nerio, que no quiere a Lemnis en su pueblo y ayuda «por el pueblo, no por ti».
// En el sótano del antiguo mercado cubierto, «la Cripta», un torneo clandestino de exmiembros de organizaciones
// criminales que presenta un Anfitrión con careta y chistera (Xero). Tres vías para saber quién paga (parts de b07_m4,
// dos bastan, y fallar abre otra): combate (rondas con curación; si pierdes, Lola o Bastien te sacan por detrás con
// su contrato), personal (con Handsome, de camareros; si te pillan, Nerio canta y hay segunda oportunidad) y dinero
// (la caja de caudales, cerradura `lock` tema `caja`). Exhibiciones opcionales con Mega-Pyroar y Mega-Sharpedo.
// Lola (la confesión; una motivación triste no es absolución: «Fiado no: esto lo pago yo»), Kaori (los caramelos de
// los finalistas), Bastien (rama `rompe`: luchador de alquiler que se rompe al ver el libro), el Callejón (zona de
// entrenamiento, tope 71, premio MT Desahogo de Nerio). La final contra el Campeón sin nombre (cap 72), Xero sin careta,
// el libro de cuentas y su decisión, y el sobre de Noa: «Emplazamiento 06». → b07_t4_hecho.
// Contratos: secreto/bloques/b07-encargo.md (sección «T4» y «Contratos compartidos»). Plan: b07-plan.md §5c y §7.
// Omisiones del Diario (todas las ramas): ni la cara de Xero bajo la careta ni el nombre de la fundación.

// ---------- Condiciones reutilizadas ----------
const LUC = '(inParty("riolu") || inParty("lucario"))';
const PURG = 'flag.b06_eco_purgado';
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';     // Rotom de verdad: frases cortas, sin «¡Bzzt!»
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado'; // voz de siempre, completa, y al final: *(Omitido: nada.)*
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';          // alegre e incompleta (la lee Lemnis)
const DOBLE = 'flag.b06_eco_doble';
const LLEGADA = 'flag.b07_crampon_llegada';
const ROMPE = 'flag.b05_bastien_rompe';
const PC = 'flag.b07_pista_combate', PP = 'flag.b07_pista_personal', PD = 'flag.b07_pista_dinero';
const DOS = '((' + PC + ' && ' + PP + ') || (' + PC + ' && ' + PD + ') || (' + PP + ' && ' + PD + '))';
const FINAL = 'flag.b07_torneo_final';
const FIN = 'flag.b07_t4_hecho';
const LOLA3 = 'flag.lola_3';
const LOLACON = '(flag.lola_conocida || flag.lola_1 || flag.lola_2)';
const LIBRO_DECIDIDO = '(flag.b07_libro_policia || flag.b07_libro_prensa || flag.b07_libro_octavia)';
const KDOLIDA = 'flag.b07_kaori_dolida && !flag.b07_kaori_reparada';
const LOLA_LISTA = 'flag.b07_lola_torneo && !flag.b07_lola_confiesa && (flag.b07_libro || has("contratohorizonte"))';
const BAS_LISTO = ROMPE + ' && flag.b07_bastien_torneo && flag.b07_libro && !done.b07_t_bastien';

// Curación entre rondas: los críos del Team Yell de Nerio pasan con una cesta de pociones.
const CURAR_RONDA = { prompt: '¿Curar al equipo antes del combate?', choice: [
	{ text: 'Sí, curarse.', then: [{ heal: 'Una hincha del Team Yell con la cara pintada se cuela hasta tu esquina con una cesta de Pociones Máximas. «De parte de Nerio. Dice que aquí nadie pelea con ventaja». Tu equipo se recupera del todo.' }] },
	{ text: 'Así estoy bien.', then: [{ text: 'La hincha se encoge de hombros y se queda en la esquina, con la cesta, por si cambias de idea.' }] },
] };

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== PUEBLO CRAMPÓN ===================
		crampon: {
			name: 'Pueblo Crampón', short: 'Crampón', region: 'galar', kind: 'town', map: { x: 90, y: 46 },
			bg: { type: 'town', roofs: ['#2a2420', '#3a3a4a', '#5a2a3a', '#2b2b38'], far: '#1e1e26', ground: '#3a3a40' },
			desc: 'Una sola calle larga y estrecha, cubierta por un techo de chapa que no deja ver el cielo. Persianas bajadas, carteles de neón con letras fundidas y, en cada pared, pegatinas y pancartas del **Team Yell** en negro y rosa.\n\nAl fondo de la calle, donde en cualquier otro pueblo habría un estadio, hay un escenario de madera con un pie de micro y un amplificador: el **gimnasio en la calle**. A un lado, el **antiguo mercado cubierto**, con las rejas echadas y una escalera que baja.',
			descNight: 'De noche, Crampón suena a amplificador encendido y a lluvia sobre la chapa. Los neones parpadean. Del mercado cubierto sale un zumbido grave que no es música y que nadie del pueblo comenta.',
			descs: [
				{ cond: FIN, text: 'Crampón, con su techo de chapa, sus persianas y sus pancartas negras y rosas. En el escenario del fondo, el pie de micro de Nerio tiene atada una bufanda del Team Yell nueva. Las rejas del mercado cubierto están abiertas, y de la escalera ya no sale ningún zumbido.' },
			],
			mapNote: 'Gimnasio en la calle (Nerio) · el mercado cubierto (la Cripta) · el callejón (entrenamiento) · tren a Pistón',
			onEnter: [{ script: 'b07_crampon_llegada', cond: '!' + LLEGADA, once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Crampón', action: { shop: 'tienda_crampon' } },
				{ label: '🚆 Tren a Pistón', sub: 'Andén cubierto; el tren espera con las luces encendidas', icon: '🚆', action: { go: 'estacion_piston' } },
				{ label: 'Nerio, en el escenario', sub: 'Pelo blanco y negro, un pie de micro y cara de no haber dormido', icon: '🎤', cond: LLEGADA, talk: [
					{ cond: FIN, script: 'b07_nerio_despues' },
					{ script: 'b07_nerio_charla' },
				] },
				{ label: 'Un turista con camisa de flores', sub: 'Gafas de sol bajo un techo de chapa. Nadie más lleva gafas de sol', icon: '🕶️', cond: LLEGADA + ' && !' + FIN, talk: [{ script: 'b07_handsome_crampon' }] },
				{ label: 'El callejón del gimnasio', sub: 'Detrás del escenario, entre contenedores', icon: '🧱', cond: LLEGADA, new: '!visited("callejon_crampon")', action: { go: 'callejon_crampon' } },
				{ label: 'El mercado cubierto', sub: 'Una escalera que baja. Abajo, «la Cripta»', icon: '🕳️', cond: LLEGADA, new: '!visited("cripta_crampon")', action: { go: 'cripta_crampon' } },
				{ label: 'El árbol del final de la calle', sub: 'Lo único verde de Crampón. Y un Greedent', icon: '🌳', new: '!flag.rec_b07_crampon_arbol', action: { gather: 'b07_crampon_arbol' } },
				{ label: 'Rotom: ¿qué me queda en Crampón?', sub: 'Repasa lo pendiente', icon: '📱', cond: LLEGADA, talk: [{ script: 'b07_crampon_pendiente' }] },
				{ label: 'Las afueras', sub: 'La Ruta 9 empieza donde se acaba el techo', icon: '🌿', action: { explore: 'grass' } },
			],
			encounters: {
				grass: [
					{ sp: 'perrserker', lv: [67, 69], w: 16 },
					{ sp: 'thievul', lv: [67, 69], w: 14 },
					{ sp: 'liepard', lv: [67, 69], w: 12 },
					{ sp: 'greedent', lv: [67, 69], w: 10 },
					{ sp: 'obstagoon', lv: [68, 70], w: 8 },
					{ sp: 'cramorant', lv: [67, 69], w: 6, time: 'day' },
					{ sp: 'morpeko', lv: [67, 69], w: 6 },
					{ sp: 'grapploct', lv: [68, 70], w: 6 },
					{ sp: 'jellicent', lv: [67, 69], w: 4, time: 'night' },
					{ sp: 'toxapex', lv: [68, 70], w: 4 },
					{ sp: 'avalugg', lv: [68, 70], w: 4 },
					{ sp: 'scrafty', lv: [68, 70], w: 2, displaced: true },
				],
			},
			rumors: [
				{ text: 'Crampón es el único pueblo de Galar sin punto de energía. Aquí los Pokémon no se hacen enormes, y la gente de Crampón dice que tampoco le hace falta: «aquí lo grande es la voz».' },
				{ text: 'El techo de chapa lo pusieron los vecinos hace muchos años, una noche, para que la lluvia no les apagara los conciertos. Nadie pidió permiso. El ayuntamiento se enteró por la mañana.' },
				{ text: 'Debajo del mercado cubierto hay sótanos donde se guardaba el pescado en hielo. Los viejos los llaman «la Cripta». Desde hace unas semanas, de ahí abajo sale un zumbido por las noches.' },
				{ cond: FIN, text: 'Dicen que la otra noche Nerio cantó en la calle hasta las cuatro, sin amplificador, y que se le unió medio pueblo. Dicen que una señora de bollos al vapor lloró en la segunda canción y luego dijo que era la cebolla. No había cebolla.' },
			],
		},

		// ---------- El callejón del gimnasio (entrenamiento) ----------
		callejon_crampon: {
			name: 'El callejón del gimnasio', short: 'El callejón', parent: 'crampon', kind: 'area',
			bg: { type: 'gym', wall: '#2a2420', floor: '#3a3a4a' },
			desc: 'Detrás del escenario de Nerio, un callejón entre contenedores, escaleras de incendios y paredes llenas de grafitis del Team Yell. Hay una portería pintada con espray, un sofá viejo sin patas y un foco de obra colgado de una tubería.\n\nAquí entrenan los hinchas de Nerio, cuando no están gritando. Y gritan mucho.',
			descNight: 'De noche, el foco de obra hace un círculo de luz amarilla en el suelo mojado del callejón. Fuera del círculo, todo es sombra y ojos de Pokémon. Desde el escenario llega un bajo que alguien ensaya solo, una y otra vez.',
			mapNote: 'Entrenamiento (tope 71) · premio de Nerio · Kaori',
			spots: [
				{ label: 'El círculo del foco', sub: 'Zona de entrenamiento (nivel recomendado 71)', icon: '🔦', action: { training: {
					cap: 71, trainers: ['callejon_1', 'callejon_2', 'callejon_3'], npc: 'nerio', coach: 'Nerio',
					prize: { wins: 3, script: 'b07_premio_callejon' },
					closed: 'Nerio te mira el equipo desde la escalera de incendios, con las manos en los bolsillos. «Los chicos del Yell no te van a enseñar nada a ti. Pero si quieres darles un par de combates de exhibición, adelante: les sienta bien perder con alguien que sabe».',
				} } },
				{ label: 'Kaori, con guantes', sub: 'Sentada en un contenedor, con un frasco a contraluz', icon: '🧪', cond: LLEGADA, new: '!flag.b07_kaori_torneo', talk: [
					{ cond: '!flag.b07_kaori_torneo', script: 'b07_kaori_callejon' },
					{ cond: 'done.b07_t_kaori && af.kaori >= 45 && !flag.b07_kaori_momento && !(' + KDOLIDA + ')', script: 'b07_kaori_momento' },
					{ cond: 'flag.b07_kaori_momento && af.kaori >= 70 && !flag.b07_kaori_peticion && !(' + KDOLIDA + ')', script: 'b07_kaori_peticion' },
					{ script: 'b07_kaori_despues' },
				] },
				{ label: 'Hablarlo con Kaori', sub: 'Te da la espalda desde hace un rato', icon: '💬', cond: KDOLIDA, new: 'true', talk: [{ script: 'b07_kaori_reparar' }] },
			],
		},

		// ---------- La Cripta (el torneo) ----------
		cripta_crampon: {
			name: 'La Cripta', short: 'La Cripta', parent: 'crampon', kind: 'building',
			bg: { type: 'indoor', wall: '#2a2226', floor: '#3a3236' },
			desc: 'El sótano del antiguo mercado cubierto: bóvedas de ladrillo, ganchos oxidados en el techo donde antes colgaba el pescado y, en el centro, un **ring** pintado con cal en el suelo. Alrededor, gradas hechas con cajas de fruta y una barra de bar con botellas sin etiqueta.\n\nEn un rincón zumba un **generador** del tamaño de un coche, lleno de cables, con un logo redondo raspado a medias. Arriba puede ser de día o de noche: aquí abajo siempre es medianoche.',
			descs: [
				{ cond: FIN + ' && flag.b07_lola_crampon', text: 'La Cripta, con sus bóvedas de ladrillo y el ring de cal medio borrado. El generador ya no zumba: está desenchufado y tapado con una lona. Lola barre las gradas de cajas de fruta con Tacho detrás, y los hinchas de Nerio sacan cajas de caramelos escaleras arriba.' },
				{ cond: FIN, text: 'La Cripta, con sus bóvedas de ladrillo y el ring de cal medio borrado. El generador está desenchufado y tapado con una lona. Las gradas de cajas de fruta están vacías. Huele a lejía y a lluvia.' },
			],
			mapNote: 'El Torneo de los Villanos · la final · la trastienda',
			onEnter: [{ script: 'b07_cripta_entrada', cond: '!flag.b07_cripta_vista', once: true }],
			spots: [
				{ label: 'El ring: siguiente ronda', sub: 'El Anfitrión apunta nombres en una pizarra', icon: '🥊', cond: '!' + PC + ' && !' + FINAL, new: 'true', talk: [
					{ cond: '!beat("torneo_r1")', script: 'b07_ronda_1' },
					{ cond: '!beat("torneo_r2") && !beat("lola_torneo")', script: 'b07_ronda_2' },
					{ script: 'b07_ronda_3' },
				] },
				{ label: 'La final', sub: 'El Campeón sin nombre espera en su esquina', icon: '🏆', cond: DOS + ' && !' + FINAL, new: 'true', talk: [{ script: 'b07_final' }] },
				{ label: 'Revancha con el Campeón sin nombre', sub: 'Sigue en su esquina, sin hablar con nadie', icon: '🏆', cond: FINAL + ' && !beat("torneo_final")', talk: [{ script: 'b07_final_revancha' }] },
				{ label: 'Exhibición: un ex del Team Flare', sub: 'Gafas rojas y un Pyroar con melena de fuego', icon: '🦁', cond: 'flag.b07_cripta_vista && !' + FINAL + ' && !beat("torneo_flare")', talk: [{ script: 'b07_exhibicion_flare' }] },
				{ label: 'Exhibición: una ex del Team Aqua', sub: 'Pañuelo azul y un Sharpedo que no para quieto', icon: '🦈', cond: 'flag.b07_cripta_vista && !' + FINAL + ' && !beat("torneo_aqua")', talk: [{ script: 'b07_exhibicion_aqua' }] },
				{ label: 'Lola, junto a la barra', sub: 'Moño con mechón gris y un Raticate canoso a los pies', icon: '🥟', cond: 'flag.b07_lola_torneo && !' + FIN, new: '(' + LOLA_LISTA + ') || !flag.b07_lola_charla', talk: [
					{ cond: LOLA_LISTA, script: 'b07_lola_confesion' },
					{ cond: '!flag.b07_lola_charla', script: 'b07_lola_charla' },
					{ cond: '!beat("lola_torneo")', script: 'b07_lola_reto' },
					{ script: 'b07_lola_despues' },
				] },
				{ label: 'Bastien, en la esquina de los de alquiler', sub: 'Chaqueta vieja y un Greninja que no se separa de él', icon: '🐸', cond: ROMPE + ' && flag.b07_bastien_torneo && !done.b07_t_bastien', new: BAS_LISTO + ' || !flag.b07_bastien_charla', talk: [
					{ cond: BAS_LISTO, script: 'b07_bastien_libro' },
					{ cond: '!flag.b07_bastien_charla', script: 'b07_bastien_charla' },
					{ cond: '!beat("bastien_8")', script: 'b07_bastien_reto' },
					{ script: 'b07_bastien_espera' },
				] },
				{ label: 'Bastien', sub: 'Sentado en las gradas vacías, con la libreta abierta', icon: '🐸', cond: ROMPE + ' && done.b07_t_bastien', talk: [{ script: 'b07_bastien_despues' }] },
				{ label: 'La trastienda', sub: 'Una puerta de chapa detrás de la barra', icon: '🚪', cond: 'flag.b07_cripta_vista && !' + FIN, new: '!visited("trastienda_cripta")', action: { go: 'trastienda_cripta' } },
				{ label: 'El generador', sub: 'Zumba. Huele a ozono y a algo quemado', icon: '⚡', cond: '!' + FIN, talk: [{ script: 'b07_generador' }] },
				{ label: 'Un ex del Team Skull en las gradas', sub: 'Gorro calado y mucho que decir', icon: '💀', cond: '!flag.b05_skull_taller && flag.b07_cripta_vista && !' + FIN, talk: [{ script: 'b07_exskull' }] },
				{ label: 'Lola, con la escoba', sub: 'Barre las gradas. Tacho la sigue', icon: '🧹', cond: FIN + ' && flag.b07_lola_crampon', talk: [{ script: 'b07_lola_crampon_visita' }] },
			],
		},

		// ---------- La trastienda ----------
		trastienda_cripta: {
			name: 'La trastienda de la Cripta', short: 'Trastienda', parent: 'cripta_crampon', kind: 'building',
			bg: { type: 'indoor', wall: '#3a2a2a', floor: '#2a2420' },
			desc: 'Un cuarto sin ventanas detrás de la barra: cajas de botellas, un perchero con tres chisteras iguales, un escritorio con un teléfono de disco y, en el suelo, atornillada, una **caja de caudales** verde con una rueda de runas en la puerta.\n\nAl fondo, una puerta de madera con un cartel escrito a mano: «DESPACHO DEL ANFITRIÓN · NO MOLESTAR · ¡ESPECIALMENTE TÚ!».',
			mapNote: 'El despacho del Anfitrión · la caja de caudales',
			spots: [
				{ label: 'La puerta del despacho', sub: 'Se oye a alguien hablar por teléfono', icon: '☎️', cond: '!' + PP + ' && !' + FINAL, new: 'true', talk: [
					{ cond: '!flag.b07_personal_intento', script: 'b07_personal' },
					{ script: 'b07_personal_otra' },
				] },
				{ label: 'La caja de caudales', sub: 'Verde, atornillada al suelo, con runas en la rueda', icon: '🔒', cond: '!' + PD + ' && !flag.b07_libro', new: 'true', talk: [{ script: 'b07_caja' }] },
				{ label: 'El perchero de las chisteras', sub: 'Tres chisteras iguales y una careta de repuesto', icon: '🎩', talk: [{ script: 'b07_chisteras' }] },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Torneo: rondas -----
		torneo_r1: { name: 'Rook', cls: 'Ex del Equipo Plasma', npc: 'exvillano', ai: 3, iv: 24, bg: 'indoor',
			team: [
				{ sp: 'cofagrigus', lv: 69, moves: ['shadowball', 'willowisp', 'trickroom', 'painsplit'], ability: 'mummy' },
				{ sp: 'liepard', lv: 69, moves: ['knockoff', 'playrough', 'uturn', 'suckerpunch'], ability: 'prankster' },
				{ sp: 'krookodile', lv: 70, moves: ['earthquake', 'crunch', 'stoneedge', 'bulkup'], ability: 'intimidate' },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Antes liberaba Pokémon por un señor con capa. Ahora peleo por un señor con chistera. —Se encoge de hombros—. Algo he mejorado: este por lo menos paga.',
			win: 'Vaya. La primera ronda, y fuera. Como siempre. A lo mejor el problema no eran los señores.',
			lose: 'Primera ronda para mí. No te lo tomes a mal: a mí me lo tomé peor cuando me pasó.' },
		torneo_r2: { name: 'Orla', cls: 'Ex del Equipo Galaxia', npc: 'exvillano', ai: 3, iv: 25, bg: 'indoor',
			team: [
				{ sp: 'skuntank', lv: 69, moves: ['crunch', 'poisonjab', 'suckerpunch', 'flamethrower'], ability: 'aftermath' },
				{ sp: 'purugly', lv: 69, moves: ['fakeout', 'bodyslam', 'suckerpunch', 'uturn'], ability: 'thickfat' },
				{ sp: 'bronzong', lv: 70, moves: ['gyroball', 'psychic', 'earthquake', 'trickroom'], ability: 'levitate' },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Yo quería un universo nuevo. Sin emociones. Me conformo con la segunda ronda. —Mira al techo de ladrillo—. Aquí abajo ni se ven las estrellas.',
			win: 'Sin emociones, decía. Y ahora me duele perder. Qué decepción. Conmigo misma.',
			lose: 'Segunda ronda. Ni me alegro. Bueno, un poco. Que no se entere nadie.' },
		torneo_r3: { name: 'Tizón', cls: 'Ex del Team Magma', npc: 'exvillano', ai: 3, iv: 26, bg: 'indoor',
			gimmick: 'dynamax', ace: 'camerupt',
			team: [
				{ sp: 'mightyena', lv: 69, moves: ['crunch', 'playrough', 'suckerpunch', 'firefang'], ability: 'intimidate' },
				{ sp: 'torkoal', lv: 69, moves: ['lavaplume', 'earthpower', 'stealthrock', 'yawn'], ability: 'drought' },
				{ sp: 'camerupt', lv: 70, moves: ['earthpower', 'flamethrower', 'rockslide', 'yawn'], ability: 'solidrock', item: 'sitrusberry' },
			],
			items: [{ id: 'hyperpotion', n: 1 }, { id: 'fullheal', n: 1 }],
			intro: 'Queríamos más tierra para todos. Ahora quiero más tierra para mí: la del ring. ¡Tercera ronda! Y el generador está encendido. ¿Lo oyes?',
			win: 'Más tierra… y me la has quitado toda. —Se ríe, ronco—. Me sienta bien. Llevaba años sin perder contra alguien que no me pagaba.',
			lose: 'Tercera ronda para mí. El generador lo ha hecho grande, no yo. Apúntatelo. Yo no me lo apunto.' },

		// ----- Exhibiciones con Mega (opcionales) -----
		torneo_flare: { name: 'Vermeil', cls: 'Ex del Team Flare', npc: 'exvillano', ai: 4, iv: 27, bg: 'indoor',
			gimmick: 'mega', ace: 'pyroar',
			team: [
				{ sp: 'malamar', lv: 68, moves: ['superpower', 'knockoff', 'psychocut', 'rockslide'], ability: 'contrary' },
				{ sp: 'mienshao', lv: 69, moves: ['highjumpkick', 'uturn', 'knockoff', 'fakeout'], ability: 'regenerator' },
				{ sp: 'pyroar', lv: 70, moves: ['flamethrower', 'hypervoice', 'darkpulse', 'willowisp'], ability: 'unnerve', item: 'pyroarite', nature: 'modest', iv: 29 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'La belleza, decía Lysson. —Se ajusta las gafas rojas—. Yo la sigo buscando. Hoy la busco en la melena de mi Pyroar. ¡Mírala bien antes de que te queme!',
			win: 'Precioso. Incluso perder ha sido precioso. Eso me lo enseñó la ropa roja, y no me lo quita nadie.',
			lose: '¿Has visto la melena? Eso no se compra. Bueno, la piedra sí. Pero la melena no.' },
		torneo_aqua: { name: 'Marina', cls: 'Ex del Team Aqua', npc: 'exvillano', ai: 4, iv: 27, bg: 'indoor',
			gimmick: 'mega', ace: 'sharpedo',
			team: [
				{ sp: 'crawdaunt', lv: 68, moves: ['crabhammer', 'knockoff', 'crunch', 'swordsdance'], ability: 'adaptability' },
				{ sp: 'pelipper', lv: 69, moves: ['hurricane', 'scald', 'uturn', 'roost'], ability: 'drizzle' },
				{ sp: 'sharpedo', lv: 70, moves: ['liquidation', 'crunch', 'icefang', 'protect'], ability: 'speedboost', item: 'sharpedonite', nature: 'jolly', iv: 29 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: '¡Más mar! Eso gritábamos. Aquí no hay mar: hay un sótano que huele a pescado. —Sonríe con todos los dientes—. Para mi Sharpedo es casi lo mismo.',
			win: 'Ahogada en un sótano. Si me ven los de antes, se ríen. Bueno. Que se rían. Por lo menos estoy aquí.',
			lose: '¡Mordisco y fuera! Como en los viejos tiempos. Los viejos tiempos eran peores, que conste.' },

		// ----- Lola (amistoso del torneo, antes o en vez de la ronda 2) -----
		lola_torneo: { name: 'Lola', cls: 'Exrecluta del Team Rocket', npc: 'lola', ai: 4, iv: 27, reward: 5600, bg: 'indoor',
			team: [
				{ sp: 'arbok', lv: 68, moves: ['gunkshot', 'crunch', 'glare', 'earthquake'], ability: 'intimidate', nature: 'adamant', iv: 26 },
				{ sp: 'muk', lv: 69, moves: ['gunkshot', 'knockoff', 'icepunch', 'drainpunch'], ability: 'poisontouch', nature: 'adamant', iv: 26 },
				{ sp: 'weezing', lv: 69, moves: ['sludgebomb', 'flamethrower', 'willowisp', 'painsplit'], ability: 'levitate', nature: 'bold', iv: 27 },
				{ sp: 'houndoom', lv: 70, moves: ['darkpulse', 'flamethrower', 'sludgebomb', 'nastyplot'], ability: 'flashfire', item: 'sitrusberry', nature: 'timid', iv: 29 },
			],
			items: [{ id: 'hyperpotion', n: 1 }, { id: 'fullheal', n: 1 }],
			intro: 'Va. Pero sin Tacho. Tacho ya no pelea. Estos sí. Estos son los que tuve que tener. —Se arremanga la chamarra—. Fiado no: lo que me ganes, te lo ganas.',
			win: 'Bien. Bien ganado. —Se limpia las manos en el pantalón—. Ya sabía yo que eras de los que no se dejan.',
			lose: 'Te gané. No te sientas mal: llevo más años peleando que tú vivo. Y no todos por buenas razones.' },

		// ----- Bastien (rama `rompe`): entrenador de alquiler -----
		bastien_8: { name: 'Bastien', cls: 'Entrenador de alquiler', npc: 'bastien', ai: 4, iv: 29, reward: 5600, bg: 'indoor',
			gimmick: 'mega', ace: 'greninja',
			team: [
				{ sp: 'talonflame', lv: 66, moves: ['bravebird', 'flareblitz', 'uturn', 'roost'], ability: 'flamebody', nature: 'jolly', iv: 28 },
				{ sp: 'meowstic', lv: 67, moves: ['psychic', 'shadowball', 'lightscreen', 'reflect'], ability: 'prankster', nature: 'timid', iv: 28 },
				{ sp: 'pyroar', lv: 67, moves: ['flamethrower', 'hypervoice', 'darkpulse', 'willowisp'], ability: 'unnerve', nature: 'modest', iv: 28 },
				{ sp: 'aegislash', lv: 68, moves: ['kingsshield', 'shadowball', 'flashcannon', 'sacredsword'], ability: 'stancechange', nature: 'quiet', iv: 29 },
				{ sp: 'greninja', lv: 70, moves: ['hydropump', 'darkpulse', 'icebeam', 'extrasensory'], ability: 'torrent', item: 'greninjite', nature: 'timid', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Esta no te la cobro. —Saca la piedra del bolsillo de la chaqueta y se la enseña a Greninja—. Me la dieron con el pago de la primera noche. Dijeron que con ella rendiría más. Rinde más. Eso es lo que me preocupa.',
			win: 'Lo apunto. Con mi letra. —Tarda en escribir—. «Perdí sin contrato y sin ganas de ganar». Esa frase no la entiendo. La apunto igual.',
			lose: 'He ganado. —No sonríe—. Antes me alegraba. Ahora miro quién aplaude.' },

		// ----- La final -----
		torneo_final: { name: 'El Campeón sin nombre', cls: 'Ex seguridad de Macrocosmos', npc: 'seguridad_macro', ai: 5, iv: 28, reward: 9000, bg: 'indoor',
			team: [
				{ sp: 'perrserker', lv: 68, moves: ['ironhead', 'closecombat', 'crunch', 'swordsdance'], ability: 'toughclaws', nature: 'adamant', iv: 27 },
				{ sp: 'toxapex', lv: 69, moves: ['scald', 'toxic', 'recover', 'haze'], ability: 'regenerator', nature: 'bold', iv: 27 },
				{ sp: 'hatterene', lv: 69, moves: ['psychic', 'dazzlinggleam', 'mysticalfire', 'calmmind'], ability: 'magicbounce', nature: 'modest', iv: 28 },
				{ sp: 'drednaw', lv: 70, moves: ['liquidation', 'stoneedge', 'jawlock', 'swordsdance'], ability: 'strongjaw', nature: 'adamant', iv: 28 },
				{ sp: 'dragapult', lv: 71, moves: ['dragondarts', 'phantomforce', 'uturn', 'dragondance'], ability: 'clearbody', item: 'sitrusberry', nature: 'jolly', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 1 }, { id: 'fullrestore', n: 1 }],
			intro: '…—No dice nada. Se quita la gorra, la dobla en cuatro y la mete en el bolsillo de atrás. Sus Pokémon tienen los ojos de un azul apagado.',
			win: '…—Recoge a sus Pokémon uno a uno, despacio, como quien recoge herramientas al final del turno—. Bien. Ya está. Ya no me deben nada.',
			lose: '…Turno terminado. —Se vuelve a poner la gorra—. No te lo tomes como algo personal. Yo hace mucho que no me tomo nada así.' },

		// ----- El callejón (zona de entrenamiento) -----
		callejon_1: { name: 'Kit', cls: 'Hincha del Team Yell', npc: 'hincha_yell', ai: 2,
			team: [
				{ sp: 'thievul', lv: 68, moves: ['foulplay', 'nastyplot', 'darkpulse', 'suckerpunch'] },
				{ sp: 'liepard', lv: 68, moves: ['knockoff', 'playrough', 'uturn', 'fakeout'] },
			],
			intro: '¡NE-RIO! ¡NE-RIO! —Te mira—. Perdón. Es que si no grito, no me salen los combates. ¡Va!',
			win: '¡Bien peleado! ¡NE-RIO! Perdón. Es costumbre.' },
		callejon_2: { name: 'Rory', cls: 'Hincha del Team Yell', npc: 'hincha_yell', ai: 2,
			team: [
				{ sp: 'scrafty', lv: 69, moves: ['crunch', 'drainpunch', 'dragondance', 'icepunch'] },
				{ sp: 'skuntank', lv: 69, moves: ['crunch', 'poisonjab', 'suckerpunch', 'flamethrower'] },
			],
			intro: 'Nerio dice que aquí se entrena para cuando haga falta. Yo no sé para qué hace falta. Pero entreno. ¡Combate!',
			win: 'Vale la pena perder si es para aprender. Eso no lo dice Nerio. Lo digo yo. Bueno, lo dice una canción suya.' },
		callejon_3: { name: 'Mags', cls: 'Hincha del Team Yell', npc: 'hincha_yell', ai: 3,
			team: [
				{ sp: 'malamar', lv: 69, moves: ['superpower', 'knockoff', 'psychocut', 'rockslide'] },
				{ sp: 'obstagoon', lv: 69, moves: ['obstruct', 'nightslash', 'crosschop', 'facade'] },
				{ sp: 'grimmsnarl', lv: 70, moves: ['spiritbreak', 'falsesurrender', 'suckerpunch', 'thunderwave'] },
			],
			intro: 'Yo llevo el bombo en los conciertos. Pesa doce kilos. Mis Pokémon pesan más. ¡A ver si los aguantas!',
			win: 'Los aguantaste. Yo también aguanto el bombo. Somos de la misma pasta, tú y yo. Bueno, no. Pero casi.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LLEGADA A CRAMPÓN ===================
		b07_crampon_llegada: [
			{ if: LLEGADA, then: [{ end: true }] },
			{ set: { 'flag.b07_crampon_llegada': true } },
			{ text: 'En el andén 3 de Pistón, Agnes Tull te ha picado el billete sin levantar la vista del cuaderno.' },
			{ say: 'agnes', text: 'Crampón. Salida en punto, horas pares. Llega a las once y diecinueve. —Te devuelve el billete—. Allí no hay reloj en la estación. No lo necesitan: se guían por el amplificador. Cuando suena, es de noche.' },
			{ text: 'El tren cruza un puente, un túnel y una llanura gris, y para en una estación sin reloj. Al salir, la calle está cubierta por un techo de chapa. Persianas bajadas, neones fundidos y, en cada pared, pancartas negras y rosas: **TEAM YELL**.' },
			{ text: 'En medio de la calle, mirando un cartel del Team Yell como si fuera un museo, hay un hombre con camisa de flores, sombrero de paja, gafas de sol y una cámara de fotos colgada del cuello. Bajo un techo de chapa. Nadie más en Crampón lleva gafas de sol.' },
			{ say: 'handsome', text: '¡Colaborador! —Se baja las gafas, te guiña un ojo y se las vuelve a subir—. Soy un turista. Me encanta este pueblo. Qué techo tan bonito. Handsome no es Handsome. Handsome es Hans, de vacaciones.' },
			{ text: '{riolu} huele la camisa de flores y estornuda.', cond: LUC },
			{ say: 'handsome', text: 'Escucha. —Baja la voz—. ¿Te acuerdas de los caramelos? Los Caramelos Lazo, el lote que Kaori siguió en Teselia. Una parte de ese lote no se quemó. Viajó. Y acabó aquí. En Crampón. En cajas que dicen «material de sonido».' },
			{ say: 'handsome', text: 'Debajo del mercado cubierto se juega un torneo. De noche. Sin cartel, sin Liga, sin árbitros. Los luchadores son… —Se ajusta el sombrero—. Gente que Handsome ha detenido alguna vez. O que ha querido detener. Exmiembros de casi todas las organizaciones que conoces.' },
			{ say: 'handsome', text: 'Alguien paga ese torneo. Mucho. Y alguien les da caramelos a los Pokémon de los finalistas. Handsome quiere saber quién. Handsome no puede entrar: lo conocen todos. Sobre todo con esta camisa.' },
			// ----- Nerio -----
			{ text: 'Al fondo de la calle, en un escenario de madera con un pie de micro, un hombre muy delgado, con el pelo largo blanco y negro y una chamarra de cuero, prueba el sonido. Golpea el micro dos veces. Las dos veces suena a tormenta.' },
			{ say: 'nerio', text: '—Sin bajar del escenario, sin mirarte—. Gira Interregional. «Patrocinada por Lemnis». Lo pone en tu chaqueta. —Deja el micro en su pie—. En Crampón no queremos a Lemnis. Ni a sus patrocinados. Ni a sus caramelos.' },
			{ prompt: 'Nerio te mira por fin. Tiene ojeras de muchos años.', choice: [
				{ text: '«Yo tampoco quiero sus caramelos. Por eso vengo.»', then: [
					{ say: 'nerio', text: '…—Te mira un rato largo—. Eso dicen todos los que vienen. Pero tú lo dices sin sonreír. Eso es nuevo.' },
				] },
				{ text: '«La Gira me trajo. Lo que hago aquí lo decido yo.»', then: [
					{ say: 'nerio', text: 'Ya. —Casi se ríe—. Eso también lo decía yo a tu edad. Luego me di cuenta de que siempre me traía alguien.' },
				] },
				{ text: 'Enseñarle los caramelos que no te comiste nunca.', cond: 'has("caramelolazo")', then: [
					{ text: 'Sacas el Caramelo Lazo de la Gira, el del envoltorio azul y plata, todavía cerrado. Nerio lo mira. Luego te mira a ti.' },
					{ say: 'nerio', text: 'Sin abrir. Desde hace cuánto, ¿meses? —Asiente despacio—. Bueno. Algo es algo.' },
				] },
			] },
			{ say: 'nerio', text: 'Crampón es el único pueblo de Galar sin punto de energía. Aquí los Pokémon no se hacen enormes. Nunca. Y alguien ha bajado a la Cripta un generador para que se hagan enormes igual. Con un logo redondo raspado. Lo conozco. Todo Galar lo conoce.' },
			{ say: 'nerio', text: 'Te voy a ayudar. —Se cuelga la bufanda—. Por el pueblo. No por ti. Que te quede claro. Si quieres plaza en el torneo, di que vas de parte mía. Si quieres entrar en la trastienda, mis chicos te abren. Y si te metes en un lío… canto. Cuando yo canto, aquí nadie mira a otro lado.' },
			{ set: { 'flag.b07_nerio': true } },
			{ quest: 'b07_m4', stage: 'torneo' },
			{ say: 'handsome', text: 'Y otra cosa. —Por lo bajo—. Hay una chica con bufanda y guantes que te espera en el callejón, detrás del escenario. Dice que es boticaria. Me ha mirado la camisa con mucha pena.' },
			{ quest: 'b07_t_kaori', stage: 'torneo' },
			{ intel: { npc: 'nerio', text: 'Líder de Crampón (Siniestro); su gimnasio es un escenario en la calle. No quiere a Lemnis en su pueblo. Te ayuda en el torneo de la Cripta «por el pueblo, no por ti»: plaza, la trastienda, y canta si te metes en un lío.' } },
			{ intel: { npc: 'handsome', text: 'En Crampón, disfrazado de turista («Hans»). Una parte del lote 05 de Caramelos Lazo acabó aquí. Bajo el mercado cubierto se juega un torneo clandestino de exmiembros de organizaciones criminales. Quiere saber quién lo paga.' } },
			// ----- El Diario de la llegada, según la rama -----
			{ diary: 'Hoy llegamos a Crampón. El pueblo tiene techo. De chapa. No se ve el cielo.\n\nHandsome iba de turista. Se llama Hans. No se llama Hans.\n\nNerio no nos quiere aquí. Nos ayuda igual. Por el pueblo, dice. Abajo hay un torneo. Alguien lo paga.', cond: D_PURGADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo llegamos en tren a Pueblo Crampón, el único pueblo de Galar sin punto de energía. Tiene un techo de chapa encima de la calle y pancartas del Team Yell en todas las paredes.\n\nHandsome, disfrazado de turista, nos contó que parte del lote de Caramelos Lazo de Teselia ha acabado aquí, y que debajo del mercado cubierto se juega un torneo clandestino. Nerio, el líder, no quiere a Lemnis en su pueblo, pero nos va a ayudar a averiguar quién lo paga.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy llegamos a Pueblo Crampón! Es un pueblo muy original: ¡tiene techo! Así no se moja nadie en los conciertos. El líder se llama Nerio y canta. Tiene mucho público: todas las paredes son pancartas suyas.\n\nHabía un turista con una camisa de flores preciosa. ¡Qué ganas de oír cantar a Nerio!', cond: D_DOBLE },
			{ say: 'rotom', text: 'Bzzt. —Bajito—. Lo del torneo no lo he puesto. Ni lo de los caramelos. Ni quién era el turista. He puesto lo del techo. El techo no le importa a nadie. Bueno, al ayuntamiento.', cond: DOBLE },
			{ say: 'rotom', text: '¡Bzzt! Apunto: **Pueblo Crampón**. El torneo es en **la Cripta**, bajo el mercado cubierto. Kaori nos espera en el **callejón**. Y Handsome se llama Hans. No se llama Hans.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Crampón. Torneo en la Cripta. Kaori en el callejón. Lo apunto.', cond: PURG },
		],

		b07_nerio_charla: [
			{ text: 'Nerio está sentado en el borde del escenario, con las piernas colgando y el micro en las manos, enrollando el cable muy despacio.' },
			{ say: 'nerio', text: 'Mi hermana dice que me preocupo demasiado por el pueblo. Que el pueblo sabe cuidarse solo. —Enrolla otra vuelta—. Tiene razón. Pero alguien tiene que estar en el escenario cuando el pueblo no puede.', cond: '!flag.b07_nerio_charla' },
			{ set: { 'flag.b07_nerio_charla': true } },
			{ say: 'nerio', text: 'Para entrar en el torneo, di mi nombre en la pizarra del ring. El que lo apunta se reirá. Se ríe de todo. Tú no le rías las gracias.', cond: '!' + PC },
			{ say: 'nerio', text: 'La trastienda está detrás de la barra. Mis chicos le dicen al de la puerta que hay concierto. El de la puerta es fan. Sale siempre.', cond: '!' + PP + ' || !' + PD },
			{ say: 'nerio', text: 'Ya tienes bastante para saber quién paga. —Se levanta—. Queda la final. Esa no te la puedo ganar yo. Pero puedo estar en la grada.', cond: DOS + ' && !' + FINAL },
			{ say: 'nerio', text: 'En el callejón entrenan mis chicos. Si les ganas tres veces, tengo algo para ti. No es un regalo. Es una canción con forma de disco.', cond: '!flag.b07_premio_callejon_dado' },
		],
		b07_nerio_despues: [
			{ text: 'Nerio afina una guitarra sentado en el borde del escenario. La bufanda nueva del pie de micro se mueve con la corriente de la calle.' },
			{ say: 'nerio', text: 'El generador se lo ha llevado la policía. O la prensa. O nadie: está tapado con una lona, abajo. Me da igual mientras no zumbe. —Pulsa una cuerda—. En Crampón no se dinamaxiza. Nunca. Así tiene que ser.' },
			{ say: 'nerio', text: 'Al final te he ayudado un poco por ti también. —No te mira—. No se lo digas a mi hermana.' },
		],
		b07_handsome_crampon: [
			{ text: 'Handsome hace como que fotografía una farola. La cámara no tiene carrete: se ve la tapa abierta.' },
			{ if: '!' + PP, then: [
				{ say: 'handsome', text: 'Handsome tiene dos uniformes de camarero. —Se abre la camisa de flores: debajo lleva una pajarita—. El Anfitrión habla mucho por teléfono en su despacho, en la trastienda. Si nos colamos con una bandeja, oiremos con quién habla.' },
				{ say: 'handsome', text: 'Los uniformes nos quedan fatal. Es parte del disfraz: nadie mira a un camarero mal vestido. Te espero en la trastienda, junto a la puerta del despacho.' },
			], else: [
				{ say: 'handsome', text: '«Dirección». «La Presidencia no sabe nada». —Repite despacio, mirando la farola—. Handsome lleva años detrás de esa palabra. Dirección. Ahora la ha oído con su propia oreja.' },
			] },
			{ say: 'handsome', text: 'Y la caja de caudales de la trastienda… Los torneos de verdad llevan las cuentas al día. Los de mentira, también. Más todavía.', cond: '!' + PD + ' && !flag.b07_libro' },
			{ say: 'handsome', text: 'Con dos cosas bien atadas, ya podemos ir a la final. Handsome estará en la grada. Con otra camisa.', cond: DOS + ' && !' + FINAL },
		],
		b07_crampon_pendiente: [
			{ say: 'rotom', text: '¡Bzzt! Cosas de Crampón:', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Lista:', cond: PURG },
			{ say: 'rotom', text: '• Averiguar quién paga el torneo. Bastan dos de tres: **combatir** en la Cripta, **escuchar** al Anfitrión con Handsome o **abrir la caja** de la trastienda.', cond: '!' + DOS },
			{ say: 'rotom', text: '• Ya sabemos bastante. Falta **la final**, en la Cripta.', cond: DOS + ' && !' + FINAL },
			{ say: 'rotom', text: '• Kaori nos espera en el **callejón** del gimnasio.', cond: '!flag.b07_kaori_torneo' },
			{ say: 'rotom', text: '• Lola está en la Cripta. Quiere hablar. Creo.', cond: LOLA_LISTA },
			{ say: 'rotom', text: '• Bastien está en la Cripta, con los de alquiler. Le podemos enseñar el libro.', cond: BAS_LISTO },
			{ say: 'rotom', text: '• En el **callejón**, Nerio da algo a quien gane tres combates.', cond: '!flag.b07_premio_callejon_dado' },
			{ say: 'rotom', text: '• Kaori está dolida. Igual una seta luminosa de Plié o una Maxiseta la ayudan a escuchar.', cond: KDOLIDA },
			{ say: 'rotom', text: '• Siguiente: **Ciudad Artejo**, al norte. Tren a Pistón y, desde allí, por el Área Silvestre.', cond: FIN },
		],

		// =================== LA CRIPTA: ENTRADA ===================
		b07_cripta_entrada: [
			{ if: 'flag.b07_cripta_vista', then: [{ end: true }] },
			{ set: { 'flag.b07_cripta_vista': true } },
			{ text: 'Bajas por la escalera del mercado cubierto. Huele a hielo viejo y a pescado de hace veinte años. Abajo, bajo las bóvedas de ladrillo, hay más gente de la que cabe: gradas de cajas de fruta, una barra con botellas sin etiqueta y, en el centro, un ring pintado con cal.' },
			{ text: 'En un rincón, un generador del tamaño de un coche zumba con un ruido grave que se te mete en los dientes. Tiene un logo redondo raspado a medias. Los cables salen de él y se pierden bajo el ring.' },
			{ text: '{riolu} se pega a tu pierna. Tiene el pelo del lomo de punta y no le quita la vista al generador.', cond: LUC },
			{ text: 'Un foco se enciende sobre el ring. En el centro, un hombre con chistera, frac negro y una careta blanca y sonriente que le tapa toda la cara levanta los brazos.' },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Damas, caballeros, exreclutas y exadministradores! ¡Bienvenidos a la Cripta! ¡Bwahaha! Esta noche, como todas las noches, ¡los que fueron malos pelean por ser útiles!' },
			{ say: 'xero', as: 'El Anfitrión', text: 'En la esquina roja: ¡ex del Team Flare, ex del Team Aqua, ex del Team Magma! En la azul: ¡ex del Equipo Galaxia, ex del Equipo Plasma! Y en la de los de alquiler, ¡quien quiera cobrar!' },
			{ say: 'xero', as: 'El Anfitrión', text: 'Y el premio, como siempre: ¡un contrato con el Programa de Reinserción Horizonte! Un trabajo, una casa, un futuro. Y a sus Pokémon, antes de la final, ¡caramelos para que rindan! ¡Bwahaha!' },
			{ text: 'Esa risa. La has oído antes. Con otra careta, o sin careta.' },
			{ text: 'Detrás de la barra, alguien te está mirando. Una mujer ancha, con un moño apretado, un mechón gris, una chamarra negra y, a sus pies, un Raticate canoso que tiembla un poco.' },
			{ if: LOLA3, then: [
				{ say: 'lola', text: '—Se acerca con dos vasos de agua y te da uno sin preguntar—. Tú. Claro. Tenías que ser tú. —Mira el ring, no a ti—. En Lavanda te dije que un día de estos. Pues mira. Es un día de estos.' },
			], else: [
				{ if: LOLACON, then: [
					{ say: 'lola', text: '—Se acerca y te mira de arriba abajo—. ¿Tú no eres el del carrito? Bueno, no el del carrito. El que me compraba en el carrito. De Johto. —Suelta el aire por la nariz—. Qué chico es el mundo. Y qué feo, a veces.', cond: 'pron == "el"' },
					{ say: 'lola', text: '—Se acerca y te mira de arriba abajo—. ¿Tú no eres la del carrito? Bueno, no la del carrito. La que me compraba en el carrito. De Johto. —Suelta el aire por la nariz—. Qué chico es el mundo. Y qué feo, a veces.', cond: 'pron == "ella"' },
					{ say: 'lola', text: '—Se acerca y te mira de arriba abajo—. ¿Tú no eres de las que me compraban en el carrito? De Johto. —Suelta el aire por la nariz—. Qué chico es el mundo. Y qué feo, a veces.', cond: 'pron == "elle"' },
				], else: [
					{ say: 'lola', text: '—Se acerca, te mira la chaqueta y luego la cara—. Tú no eres de aquí. Ni de los de antes. Se te nota en cómo miras el ring: como si fuera la primera vez que ves uno así. —Te da un vaso de agua—. Lola. Ex de los de la erre. Toma, que aquí abajo se seca la garganta.' },
				] },
			] },
			{ say: 'lola', text: 'No preguntes qué hago aquí. Vengo a pagar una deuda. Nada más. —Tacho le toca la bota con el hocico—. Ya, viejito. Ya.' },
			{ set: { 'flag.b07_lola_torneo': true } },
			{ quest: 'b02_t_lola', stage: 'espera', done: true, cond: 'quest.b02_t_lola && !done.b02_t_lola' },
			{ quest: 'b07_t_lola', stage: 'torneo' },
			{ if: ROMPE, then: [
				{ text: 'En la esquina de los de alquiler, sentado en una caja de fruta con un cartel a los pies («SE ALQUILA RIVAL · PRECIO POR NOCHE»), un chico con una chaqueta vieja y un Greninja apoyado en el hombro levanta la vista. Se le cae el bolígrafo.' },
				{ say: 'bastien', text: '¿{jugador}? —Recoge el bolígrafo. Se le vuelve a caer—. No. Espera. No es lo que parece. Bueno, es exactamente lo que parece. Pero tiene explicación. Más o menos.' },
				{ set: { 'flag.b07_bastien_torneo': true } },
				{ quest: 'b07_t_bastien', stage: 'torneo' },
			] },
			{ say: 'rotom', text: '¡Bzzt! —Muy bajito—. Esa risa… La tengo en un archivo. Pero no me deja abrirlo. Dice «careta». Qué raro.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Esa risa la conozco. —Pausa—. No sé de dónde. Lo pienso.', cond: PURG },
		],

		// =================== LA VÍA DEL COMBATE ===================
		b07_inscripcion: [
			{ if: 'flag.b07_inscrito', then: [{ end: true }] },
			{ set: { 'flag.b07_inscrito': true } },
			{ text: 'Al pie del ring, el Anfitrión apunta nombres en una pizarra con una tiza que chirría. Te ve llegar y la careta sonriente se ladea.' },
			{ say: 'xero', as: 'El Anfitrión', text: '¿Un nombre nuevo? ¿De parte de quién?' },
			{ text: 'Dices el nombre de Nerio. Medio sótano se calla. El Anfitrión se ríe, pero un poco más bajo.' },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Bwahaha! Nerio. Claro. El cantante. —Apunta tu nombre con letra enorme—. Tres rondas y la final. Entre ronda y ronda, se cura quien quiera: aquí no se gana con ventaja. Lo dice el reglamento. Bueno, lo dice Nerio. Es lo mismo.' },
		],
		b07_ronda_1: [
			{ if: PC + ' || beat("torneo_r1")', then: [{ end: true }] },
			{ call: 'b07_inscripcion' },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Primera ronda! ¡En la esquina azul, un ex del Equipo Plasma que liberaba Pokémon por amor y ahora pelea por un sueldo! ¡Bwahaha!' },
			CURAR_RONDA,
			{ battle: 'torneo_r1', lose: 'continue', onWin: [
				{ text: 'El Krookodile se derrumba sobre la cal del ring. Las gradas de cajas de fruta silban y aplauden a la vez. El Anfitrión tacha un nombre en la pizarra.' },
			], onLose: [{ call: 'b07_rescate' }] },
		],
		b07_ronda_2: [
			{ if: PC + ' || beat("torneo_r2") || beat("lola_torneo")', then: [{ end: true }] },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Segunda ronda! ¡Una ex del Equipo Galaxia que quería un mundo sin emociones! ¡Y que ahora llora cuando pierde! ¡Bwahaha!' },
			{ text: 'Lola te mira desde la barra y levanta un poco la barbilla: «si prefieres, peleamos tú y yo». Lo dice sin decirlo.', cond: 'flag.b07_lola_charla && !beat("lola_torneo")' },
			CURAR_RONDA,
			{ battle: 'torneo_r2', lose: 'continue', onWin: [
				{ text: 'El Bronzong cae de lado con un ruido de campana rota. La ex del Equipo Galaxia se sienta en la cal y se tapa la cara. Por los hombros, se ve que llora. Muy bajito.' },
			], onLose: [{ call: 'b07_rescate' }] },
		],
		b07_ronda_3: [
			{ if: PC + ' || beat("torneo_r3")', then: [{ end: true }] },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Tercera ronda! ¡Un ex del Team Magma! ¡Y con el generador a toda potencia! ¡Que lo vea todo Crampón! Bueno, que no lo vea nadie, que esto es clandestino. ¡Bwahaha!' },
			{ text: 'El generador ruge. Las bombillas del techo parpadean. El suelo del ring se calienta bajo tus zapatillas.' },
			CURAR_RONDA,
			{ battle: 'torneo_r3', lose: 'continue', onWin: [
				{ text: 'El Camerupt gigante se deshincha con un bufido de vapor que empaña las bóvedas. Cuando el vapor se va, el ex del Team Magma está sentado en el suelo, riéndose solo.' },
				{ call: 'b07_ronda_ganada' },
			], onLose: [{ call: 'b07_rescate' }] },
		],
		b07_ronda_ganada: [
			{ say: 'xero', as: 'El Anfitrión', text: '¡Tenemos finalista! —Te agarra la mano y la levanta. Huele a aceite de máquina y a colonia cara—. ¡Y su premio por adelantado, como manda la casa! ¡Un contrato con el Programa de Reinserción Horizonte!' },
			{ text: 'Te pone en la mano un sobre grueso, de papel bueno, con un sello de cera azul. Dentro, un contrato de varias páginas con un hueco en blanco para el nombre.' },
			{ give: 'contratohorizonte' },
			{ set: { 'flag.b07_pista_combate': true } },
			{ text: 'Lees la última página por encima. Ninguna firma de persona. Solo un sello: **Dirección (Ω)**. Y debajo, en letra pequeña: «Visto bueno de Presidencia: *no requerido*».' },
			{ intel: { npc: 'xero', text: 'El Anfitrión del torneo de la Cripta, con careta y chistera, se ríe «¡Bwahaha!». Da a los finalistas un contrato del «Programa de Reinserción Horizonte» sellado por «Dirección (Ω)», sin visto bueno de Presidencia.' } },
		],
		// Fallar abre otra vía: si pierdes una ronda, te sacan por detrás con un contrato.
		b07_rescate: [
			{ if: ROMPE + ' && flag.b07_bastien_charla', then: [
				{ text: 'Tu último Pokémon cae sobre la cal. Las gradas gritan. Antes de que el Anfitrión llegue a ti, alguien te agarra del brazo y tira hacia la puerta de atrás. Una chaqueta vieja. Un Greninja que abre camino.' },
				{ say: 'bastien', text: 'Por aquí. Rápido. Al que pierde le ofrecen «otro tipo de contrato» en el pasillo. —Te lleva por un corredor de ladrillo hasta una escalera de servicio—. A mí me lo ofrecieron la primera noche. Toma. Este es el que me dieron. No lo firmé. Por una vez.' },
			], else: [
				{ text: 'Tu último Pokémon cae sobre la cal. Las gradas gritan. Antes de que el Anfitrión llegue a ti, una mano ancha te agarra del cuello de la chaqueta y tira hacia la puerta de atrás. Un moño con un mechón gris. Un Raticate canoso que trota delante.' },
				{ say: 'lola', text: 'Calla y camina. Al que pierde le ofrecen «otro tipo de contrato» en el pasillo. —Te saca por un corredor de ladrillo hasta una escalera de servicio—. Toma. Es el que me dieron a mí. No lo he firmado. Todavía.' },
			] },
			{ give: 'contratohorizonte' },
			{ heal: 'En la escalera de servicio, sentad{o|a|e} en un escalón, te dan de beber y curan a tu equipo con lo que llevan en los bolsillos. Tu equipo se recupera del todo.' },
			{ text: 'Lees el contrato a la luz de una bombilla. Varias páginas, un hueco en blanco para el nombre y, en la última, un sello: **Dirección (Ω)**. Debajo, en letra pequeña: «Visto bueno de Presidencia: *no requerido*».' },
			{ set: { 'flag.b07_pista_combate': true, 'flag.b07_rescatado': true } },
			{ say: 'rotom', text: 'Bzzt. —Bajito—. Hemos perdido. Pero tenemos el contrato. Es como perder un partido y que te den la pelota. Me sirve.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Perdimos. Tenemos el papel igual.', cond: PURG },
		],

		// ----- Exhibiciones con Mega -----
		b07_exhibicion_flare: [
			{ say: 'xero', as: 'El Anfitrión', text: '¡Combate de exhibición! ¡No cuenta para el torneo, cuenta para el espectáculo! ¡Un ex del Team Flare y su piedra brillante! ¡Bwahaha!' },
			CURAR_RONDA,
			{ battle: 'torneo_flare', lose: 'continue', onWin: [
				{ text: 'El Mega-Pyroar ruge una última vez, y la melena de fuego se le apaga en chispas que caen sobre la cal. El ex del Team Flare aplaude. Solo él.' },
			], onLose: [
				{ heal: 'Los críos del Team Yell de Nerio se cuelan otra vez con la cesta de pociones. Tu equipo se recupera del todo.' },
			] },
		],
		b07_exhibicion_aqua: [
			{ say: 'xero', as: 'El Anfitrión', text: '¡Exhibición! ¡Una ex del Team Aqua y su tiburón con prisa! ¡Que nadie meta los pies en el ring! ¡Bwahaha!' },
			CURAR_RONDA,
			{ battle: 'torneo_aqua', lose: 'continue', onWin: [
				{ text: 'El Mega-Sharpedo da un último coletazo en el aire y vuelve a su forma. La ex del Team Aqua le rasca la aleta. «Más mar», le dice. «Un día de estos».' },
			], onLose: [
				{ heal: 'Los críos del Team Yell de Nerio se cuelan otra vez con la cesta de pociones. Tu equipo se recupera del todo.' },
			] },
		],
		b07_generador: [
			{ text: 'El generador es una caja de metal del tamaño de un coche, con ruedas, rejillas y cables gruesos que se meten bajo el ring. Zumba tan grave que el agua de los charcos tiembla. El logo redondo de la tapa está raspado con algo, pero se adivina.' },
			{ text: 'En un lado, una placa de inventario atornillada: «UNIDAD PORTÁTIL · PROPIEDAD DE EMPLAZAMIENTO 06 · DEVOLVER A ARTEJO».' },
			{ text: '{riolu} se acerca a la rejilla y aparta la cara enseguida, como si quemara. No quema. El aura le tiembla en las palmas, inquieta.', cond: LUC },
			{ if: '!flag.b07_generador_visto', then: [
				{ set: { 'flag.b07_generador_visto': true } },
				{ intel: { npc: 'nerio', text: 'En la Cripta, un generador portátil con un logo redondo raspado hace que los Pokémon dinamaxicen en Crampón, el pueblo sin punto de energía. Placa: «Propiedad de Emplazamiento 06 · devolver a Artejo».' } },
			] },
		],
		b07_exskull: [
			{ text: 'En lo alto de las gradas de cajas, un chico con el gorro calado hasta las cejas y una camiseta con una calavera desteñida mira el ring con los brazos cruzados.' },
			{ say: 'exvillano', as: 'Ex del Team Skull', text: 'Yo vine a pelear. Me dijeron que pagaban. Luego vi los caramelos y me senté. Mi Golisopod no se come nada que brille. —Se encoge—. Ni yo. Bueno, yo sí. Pero eso no.' },
			{ say: 'exvillano', as: 'Ex del Team Skull', text: 'En Alola por lo menos éramos malos a la vista. Aquí son malos con contrato. Eso me da más miedo.' },
		],

		// =================== LA VÍA PERSONAL (con Handsome) ===================
		b07_personal: [
			{ set: { 'flag.b07_personal_intento': true, 'vars.b07_camarero': 0 } },
			{ text: 'En la trastienda, detrás de una pila de cajas de botellas, Handsome te espera con dos chaquetas blancas de camarero. La suya le queda corta de mangas. La tuya, larga. Lleva un bigote postizo torcido.' },
			{ say: 'handsome', text: 'Uniformes. —Te pasa una bandeja con dos vasos y una jarra de agua—. El Anfitrión pide agua cada media hora. Entramos, servimos, escuchamos, salimos. Handsome lo ha hecho mil veces. Bueno, dos. Una salió bien.' },
			{ text: 'Llamas a la puerta del despacho con el codo. Una voz desde dentro: «¡Adelante! ¡Y deprisa!». Dentro, de espaldas, el Anfitrión habla por un teléfono de disco con la careta puesta. Ni para hablar por teléfono se la quita.' },
			{ prompt: 'Tienes la bandeja en las manos. ¿Cómo entras?', choice: [
				{ text: 'Despacio, mirando la jarra, sin mirarlo a él.', then: [{ set: { 'vars.b07_camarero': '+1' } }, { text: 'Nadie mira a un camarero que mira la jarra. El Anfitrión ni se gira.' }] },
				{ text: 'Dando las buenas noches con voz clara.', then: [{ text: 'El Anfitrión se gira un poco, molesto. «Chist». Vuelve al teléfono.' }] },
				{ text: 'Con una sonrisa enorme, como en los anuncios.', then: [{ text: 'El Anfitrión te mira un segundo de más. La careta sonríe. Tú también. Es incómodo para los dos.' }] },
			] },
			{ prompt: 'Hay que dejar los vasos. El escritorio está lleno de papeles.', choice: [
				{ text: 'En la esquina del escritorio, sin tocar los papeles.', then: [{ set: { 'vars.b07_camarero': '+1' } }, { text: 'Dejas los vasos en la esquina. Nadie te dice nada. Nadie se fija en ti. Así es como tiene que ser.' }] },
				{ text: 'Apartar un poco los papeles para hacer sitio.', then: [{ text: 'Al mover los papeles, crujen. El Anfitrión se gira de golpe. «¡Esos no se tocan!».' }] },
				{ text: 'Darle el vaso en la mano.', then: [{ text: 'Le tiendes el vaso. El Anfitrión lo mira, te mira, y no lo agarra. Lo deja en el aire hasta que lo bajas tú. Muy raro.' }] },
			] },
			{ prompt: 'El Anfitrión baja la voz al teléfono. Handsome, en la puerta, finge limpiar un vaso limpio.', choice: [
				{ text: 'Quedarte quieto rellenando la jarra, muy despacio.', then: [{ set: { 'vars.b07_camarero': '+1' } }] },
				{ text: 'Acercarte un poco para oír mejor.', then: [] },
				{ text: 'Salir enseguida, que ya has servido.', then: [] },
			] },
			{ if: 'vars.b07_camarero >= 2', then: [{ call: 'b07_personal_bien' }], else: [{ call: 'b07_personal_pillados' }] },
		],
		b07_personal_bien: [
			{ text: 'El Anfitrión se olvida de que existes. Habla con la boca pegada al auricular, pero la careta hace eco y lo oyes todo.' },
			{ say: 'xero', as: 'El Anfitrión (al teléfono)', text: 'Sí, Dirección. Sí. Esta noche, la final. Los caramelos ya están repartidos. Rinden. Rinden mucho. ¡Bwahaha! Perdón. Sí. Sin risas.' },
			{ say: 'xero', as: 'El Anfitrión (al teléfono)', text: '¿La Presidencia? No. La Presidencia no sabe nada. Como siempre. —Pausa—. El generador vuelve a Artejo el lunes, a lo del seis. Que lo recojan los de logística. Y el contrato de la de Kanto se cobra esta noche, como dijimos.' },
			{ text: 'Cuelga. Se queda un momento mirando el teléfono. Luego te mira a ti, a tu bandeja y a tu chaqueta de camarero.' },
			{ say: 'xero', as: 'El Anfitrión', text: '¿Algo más? ¿No? Pues fuera. —Te despide con la mano—. Y dile al otro camarero que el bigote se le está despegando.' },
			{ text: 'Fuera, en la trastienda, Handsome se arranca el bigote y lo guarda en el bolsillo de la camisa con mucho cuidado, como si fuera una prueba.' },
			{ say: 'handsome', text: '«Dirección». «La Presidencia no sabe nada». —Habla muy bajo, muy serio—. Handsome lo ha grabado. Con esto. —Saca un bolígrafo que no es un bolígrafo—. Colaborador. Esto es lo más importante que Handsome ha oído en años.' },
			{ set: { 'flag.b07_pista_personal': true } },
			{ intel: { npc: 'xero', text: 'Por teléfono, en su despacho de la Cripta: «Sí, Dirección… La Presidencia no sabe nada. Como siempre». El generador «vuelve a Artejo, a lo del seis». «El contrato de la de Kanto se cobra esta noche». Handsome lo grabó.' } },
		],
		b07_personal_pillados: [
			{ say: 'xero', as: 'El Anfitrión (al teléfono)', text: 'Sí, Dirección. Sí. Esta noche, la final. ¿La Presi…? —Se para. Se gira despacio. La careta te mira—. Un momento, Dirección. Tengo camareros curiosos.' },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Tú! ¡Y tú, el del bigote! ¡Quietos! ¡SEGURIDAD!' },
			{ text: 'Pasos en el pasillo. Handsome te agarra del brazo. Y entonces, desde la Cripta, llega un acorde de guitarra tan fuerte que tiemblan las botellas de la trastienda.' },
			{ say: 'nerio', as: 'Nerio (por los altavoces)', text: '¡Crampón! ¡Esta va por los que no se rinden!' },
			{ text: 'Nerio canta. Toda la Cripta se gira hacia la escalera, donde ha subido con el micro. Los de seguridad también. El Anfitrión también. Nadie mira hacia la trastienda. Handsome y tú salen por la puerta de chapa como dos camareros cualquiera.' },
			{ set: { 'flag.b07_personal_media': true } },
			{ say: 'handsome', text: '—Jadeando, detrás de la barra—. «Sí, Dirección». Solo eso. Media frase. —Se arregla el bigote—. Media frase es media pista. Handsome volverá con un bigote mejor. Cuando se calme. Y tú con él.' },
		],
		b07_personal_otra: [
			{ text: 'Handsome te espera junto a la puerta del despacho con un bigote nuevo, más grande, más torcido. Y una peluca. Muy seguro de sí mismo.' },
			{ say: 'handsome', text: 'Segunda oportunidad. Nerio ha dicho que hoy canta dos veces. Si nos pillan otra vez, tenemos otra canción. —Te da la bandeja—. Despacio, sin mirarle, sin tocar los papeles. Handsome ha aprendido.' },
			{ text: 'Esta vez entras mirando la jarra. Dejas los vasos en la esquina. Rellenas despacio. El Anfitrión no se gira.' },
			{ call: 'b07_personal_bien' },
		],
		b07_chisteras: [
			{ text: 'Un perchero con tres chisteras iguales, negras, con una cinta roja. En el gancho de abajo, una careta blanca y sonriente de repuesto, igual que la que lleva el Anfitrión. Por dentro, escrito con rotulador en la frente: «X. · talla grande · ¡LA BUENA NO SE PRESTA!».' },
			{ text: '{riolu} olfatea la careta de repuesto y frunce el hocico. Huele a aceite de máquina. Como un laboratorio.', cond: LUC },
		],

		// =================== LA VÍA DEL DINERO (la caja) ===================
		b07_caja: [
			{ if: 'flag.b07_libro', then: [{ end: true }] },
			{ if: '!flag.b07_caja_vista', then: [
				{ set: { 'flag.b07_caja_vista': true } },
				{ text: 'En la trastienda, el de la puerta es un hincha del Team Yell con una gorra. Cuando oye por el pasillo que Nerio va a probar sonido, deja su silla y sube la escalera de la Cripta corriendo, «solo un minuto».' },
				{ text: 'La caja de caudales es verde, de hierro, atornillada al suelo. En lugar de una rueda de números, tiene una rueda de runas que se encienden cuando las rozas, una detrás de otra, y vuelven a apagarse.' },
			], else: [
				{ text: 'La caja de caudales sigue atornillada al suelo. El de la puerta se ha ido a ver a Nerio otra vez. Las runas de la rueda se encienden cuando las rozas.' },
			] },
			{ minigame: { type: 'lock', id: 'b07_caja_cripta', title: 'La caja de caudales', hint: 'Las runas se encienden en orden. Repítelo. Cada cerrojo, una runa más. Sin prisa: el de la puerta está cantando.', theme: 'caja', level: 3,
				guaranteed: ['librotorneo'], loot: [{ id: 'bottlecap', w: 1, rare: true }, { id: 'pearl', w: 6 }], picks: 1, consolation: false, lootTitle: 'Dentro de la caja' },
				onWin: [
					{ text: 'La puerta de la caja se abre con un chasquido. Dentro, fajos de billetes atados con gomas que no tocas, una perla suelta y, debajo de todo, un libro de cuentas de tapas negras, gastado de tanto abrirlo.' },
					{ set: { 'flag.b07_pista_dinero': true, 'flag.b07_libro': true } },
					{ call: 'b07_libro_lectura' },
				],
				onLose: [{ text: 'La rueda se traba con un clic seco. Arriba se acaba la prueba de sonido. Pasos en la escalera. Sales de la trastienda antes de que vuelva el de la puerta. La caja no se va a ir a ningún sitio.' }],
				onQuit: [{ text: 'Dejas la rueda de runas como estaba. Mejor volver cuando el de la puerta se vaya otra vez a ver a Nerio.' }] },
		],
		b07_libro_lectura: [
			{ cutscene: { bg: { type: 'indoor', wall: '#2a2226', floor: '#2a2420' }, time: 'noche', start: 'dark', cam: 'still', frames: [
				{ item: 'librotorneo', fx: 'glow', cam: 'push', text: 'Un libro de cuentas de tapas negras. Lo abres por la primera página, a la luz de la bombilla de la trastienda.' },
				{ fx: 'letter', cam: 'still', text: '«Ingresos · Torneo de la Cripta. Transferencia de la Fundación. Concepto: Programa de Reinserción. Firma: **Dirección (Ω)**».' },
				{ fx: 'letter', text: '«Gastos · Carpa, careta y chistera: X. · Generador portátil: cedido por Emplazamiento 06, Artejo · Caramelos, lote 05: **Logística: N. L.**»' },
				{ fx: ['letter', 'heartbeat'], color: '#3b5bb5', text: 'Y en cada página, abajo, la misma casilla impresa, siempre marcada con la misma tinta: «Visto bueno de Presidencia: **no**».' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left' }], on: 'rio', fx: 'glow', cam: 'pull', text: '{riolu} pone la palma sobre las iniciales de logística. El aura se le enciende sola, muy bajito, como cuando reconoce a alguien.' },
				{ cond: '!(' + LUC + ')', fx: 'dark', cam: 'pull', text: 'Cierras el libro. Las iniciales de logística se te quedan en la cabeza. N. L. Las conoces.' },
			] } },
			{ give: 'librotorneo', cond: '!has("librotorneo")' },
			{ set: { 'flag.b07_libro': true } },
			{ intel: { npc: 'handsome', text: 'El libro de cuentas del torneo de la Cripta: lo paga una fundación, firma «Dirección (Ω)»; el generador lo cede «Emplazamiento 06, Artejo»; los caramelos los lleva «Logística: N. L.». En cada página: «Visto bueno de Presidencia: no».' } },
		],

		// =================== LOLA ===================
		b07_lola_charla: [
			{ set: { 'flag.b07_lola_charla': true } },
			{ text: 'Lola está apoyada en la barra con un vaso de agua que no bebe. Tacho duerme sobre su bota. Cada vez que el generador ruge, el Raticate se despierta, tiembla y se vuelve a dormir.' },
			{ say: 'lola', text: 'Mira a esos. —Señala con la barbilla a los luchadores del ring—. Los conozco a casi todos. No de nombre. De cara. Todos tenemos la misma cara: la de alguien que firmó algo una vez y todavía lo está pagando.' },
			{ say: 'lola', text: 'Yo peleo en la segunda ronda. Si te toca conmigo, no te dejes. Y si prefieres pelear conmigo antes, en el pasillo, también me sirve. Me da igual dónde pierda. —Casi sonríe—. O dónde gane.' },
			{ say: 'lola', text: 'Y no me preguntes. Si un día te lo cuento, te lo cuento entero. Hoy no. —Mira el contrato que llevas en la mano—. O igual sí. Si ya sabes quién paga, igual sí.', cond: 'has("contratohorizonte") || flag.b07_libro' },
		],
		b07_lola_reto: [
			{ text: 'Lola deja el vaso en la barra y se arremanga la chamarra. Tacho se despierta y se aparta él solo, muy despacio.' },
			{ say: 'lola', text: '¿Peleamos? En el pasillo, donde no mira el de la careta. —Saca de la chamarra un trapo atado con un nudo—. Antes, come. Fiado no, pero esto es regalado.' },
			{ prompt: '¿Pelear con Lola?', choice: [
				{ text: 'Comer un bollo y pelear', then: [
					{ heal: 'Dentro del trapo hay bollos al vapor todavía tibios. Tus Pokémon comen uno cada uno, con mucho cuidado de no dejar migas. Se recuperan del todo.' },
					{ battle: 'lola_torneo', lose: 'continue', onWin: [
						{ say: 'lola', text: 'Bien. —Asiente despacio—. La segunda ronda ya la has ganado. Se lo digo yo al de la careta. Si no le gusta, que venga a decírmelo.' },
					], onLose: [
						{ say: 'lola', text: 'Te gané. No pasa nada. A mí me han ganado más veces de las que me han dado la mano. —Te tira otro bollo—. Come.' },
						{ heal: 'El segundo bollo es para tu equipo. Se recupera del todo.' },
					] },
				] },
				{ text: 'Ahora no', then: [{ say: 'lola', text: 'Va. Aquí estaré. Yo no tengo prisa. Ya no.' }] },
			] },
		],
		b07_lola_confesion: [
			{ if: 'flag.b07_lola_confiesa', then: [{ end: true }] },
			{ set: { 'flag.b07_lola_confiesa': true } },
			{ text: 'Lola está sentada en un escalón del pasillo de servicio, lejos del ruido. Tacho tiene la cabeza en su rodilla. Te ve con el papel en la mano y se le endurece la boca.' },
			{ say: 'lola', text: 'Ya sabes quién paga. Se te nota. —Se hace a un lado en el escalón—. Siéntate. Te lo cuento una vez. Una. Y no me interrumpas, que si paro no arranco.' },
			{ if: LOLA3, then: [
				{ say: 'lola', text: 'Tenía dieciocho años. Mi mamá estaba mala y en casa no entraba dinero. Un señor muy bien vestido me ofreció trabajo. «De uniforme», le escribí a ella. La postal que te di. Nunca se la mandé.' },
				{ say: 'lola', text: 'El uniforme tenía una erre roja. Era de Giovanni. Y la primera noche me mandaron a la torre de Lavanda. La vieja. La de las velas. —Se mira las manos—. Había una Marowak que no se apartaba de la puerta. Por su cría. Yo estaba ahí. No hice nada. Ni para un lado ni para el otro. Me quedé mirando. Eso también es hacer algo.' },
				{ say: 'lola', text: 'Por eso voy todos los años. A la piedra sin nombre. No es por ella. Ella no me necesita. Es por mí. Para no olvidarme de la cara que puse.' },
				{ say: 'lola', text: 'Después, años después, lo de la Torre Radio, en Trigal. Ahí ya no aguanté. Me fui. Antes de irme tapié la escalera de los fusibles con cajas y una puerta de chapa, pa\' que no pudieran dejar a oscuras los pisos de abajo, donde tenían encerrados a los locutores. —Pausa—. No me hace buena. Me hace una que se fue tarde.' },
			], else: [
				{ say: 'lola', text: 'Tenía dieciocho años. En casa no entraba dinero. Un señor muy bien vestido me ofreció un trabajo de uniforme. El uniforme tenía una erre roja. Hice cosas en Kanto y en Johto que no te voy a contar enteras, porque no me las merezco contar bonitas.' },
				{ say: 'lola', text: 'Estuve donde no tenía que estar, mirando lo que no tenía que dejar que pasara. Un día me fui. Tarde. Me fui tarde, que es casi lo mismo que no irse.' },
			] },
			{ say: 'lola', text: 'Me agarraron. Me lo merecía. Cumplí. Y cuando salió lo de la fianza, la primera vez, antes de juicio, alguien la pagó por mí. Una fundación muy generosa. Yo ni la conocía. Me mandaron una carta muy bonita: «Todo el mundo merece una segunda oportunidad».' },
			{ say: 'lola', text: 'Veinte años. Veinte años sin saber nada de ellos. Monté el carrito, aprendí a hacer bollos, le puse nombre a Tacho, le di de comer a medio Johto. —Aprieta la mandíbula—. Y hace un mes me llega otra carta muy bonita. «La deuda se cobra». Con el mismo sello que ese papel tuyo.' },
			{ text: 'Miras el contrato. O el libro. Miras el sello: **Dirección (Ω)**. Lola asiente sin que digas nada.', cond: 'has("contratohorizonte") || flag.b07_libro' },
			{ say: 'lola', text: 'Por eso estoy aquí. Para pelear por ellos una temporada. Para que me firmen «saldado» y me dejen en paz.' },
			{ prompt: 'Lola te mira de frente. Espera algo.', choice: [
				{ text: '«No es justo. Lo que te hicieron ellos también cuenta.»', then: [
					{ say: 'lola', text: '—Te corta con la mano—. No. Eso no. No me compadezcas.' },
				] },
				{ text: '«Gracias por contármelo.»', then: [
					{ say: 'lola', text: '—Suelta el aire por la nariz—. No me des las gracias. Todavía no he terminado.' },
				] },
				{ text: 'No decir nada. Quedarte sentad{o|a|e} a su lado.', then: [
					{ text: 'No dices nada. Lola tampoco, durante un rato. Tacho cambia de rodilla.' },
				] },
			] },
			{ say: 'lola', text: 'Escúchame bien. Mi mamá estaba mala, yo tenía hambre, el señor era muy convincente. Todo eso es verdad. Y nada de eso le devuelve a aquella cría su mamá. —Lo dice despacio—. Lo que hice no se borra por tener motivos. Los motivos son míos. Lo otro, también.' },
			{ say: 'lola', text: 'Y lo que me hacen ahora ellos no me lava lo de antes. Son dos cuentas distintas. **Fiado no: esto lo pago yo.** Lo de antes y lo de ahora. Pero a ellos no. A ellos ya no les pago nada.' },
			{ say: 'lola', text: '¿Y tú qué harías? —Te mira—. No te pregunto qué está bien. Te pregunto qué harías.' },
			{ prompt: 'Lo que le digas, Lola lo va a hacer. Ninguna opción borra nada.', choice: [
				{ text: '«Declara. Cuéntaselo todo a Handsome, con nombres.»', then: [
					{ say: 'lola', text: 'Con nombres. —Asiente despacio—. Los míos también. Si declaro, declaro lo mío primero. Si no, no vale.' },
					{ text: 'Lola se levanta, se sacude el pantalón y va a buscar a Handsome, que finge leer un periódico al pie de la escalera. Hablan un rato largo. Handsome se quita las gafas de sol para escucharla. No se las vuelve a poner.' },
					{ set: { 'flag.b07_lola_testigo': true } },
					{ rep: { policia: 2 } },
				] },
				{ text: '«Quédate. Ayuda a Nerio a limpiar esto y a devolver los caramelos.»', then: [
					{ say: 'lola', text: 'Barrer. —Casi se ríe—. Eso sé hacerlo. Llevo veinte años barriendo lo mío. Puedo barrer un sótano.' },
					{ text: 'Lola se levanta y va hacia el escenario de la calle. Desde la escalera la ves hablar con Nerio. Nerio la escucha sin interrumpir, asiente una vez y le da una escoba. Lola la agarra como quien agarra una herramienta conocida.' },
					{ set: { 'flag.b07_lola_crampon': true } },
				] },
				{ text: '«Vuelve a tu carrito. Lo que construiste ahí también es tuyo.»', then: [
					{ say: 'lola', text: 'El carrito. —Se le quiebra algo y lo vuelve a juntar enseguida—. Lo dejé con una vecina. Le dije que volvía en una semana. No le dije si iba a volver.' },
					{ say: 'lola', text: 'Va. Vuelvo. Y ya no les debo nada, porque no pienso pagar. Si vienen, que vengan al carrito. Que hagan cola. —Saca del bolsillo de la chamarra un papel doblado mil veces—. Toma. Te lo debía desde Johto. La de verdad.' },
					{ give: 'lolarecetaverdad' },
					{ set: { 'flag.b07_lola_vuelve': true } },
				] },
			] },
			{ say: 'lola', text: 'Y no me mires así. —Se seca un ojo con el puño de la chamarra, rápido, como si fuera polvo—. No estoy perdonada. Estoy pagando. Es distinto.' },
			{ text: 'Tacho mueve la cola. Una vez.' },
			{ quest: 'b02_t_lola', stage: 'espera', done: true, cond: 'quest.b02_t_lola && !done.b02_t_lola' },
			{ quest: 'b07_t_lola', stage: 'hecha', done: true },
			{ intel: { npc: 'lola', text: 'Exrecluta del Team Rocket desde los dieciocho. Una fundación le pagó la fianza hace veinte años; ahora la deuda «se cobra» peleando en la Cripta, con el mismo sello «Dirección (Ω)». «Lo que hice no se borra por tener motivos. Fiado no: esto lo pago yo.»' } },
		],
		b07_lola_despues: [
			{ text: 'Lola está en la barra, con el vaso de agua. Tacho duerme sobre su bota.' },
			{ say: 'lola', text: '¿Qué? ¿Otra vez tú? —Te pasa medio bollo partido con la mano—. Este no cuenta.', cond: '!flag.b07_lola_confiesa' },
			{ say: 'lola', text: 'Ya te lo conté. Ya está. —Te pasa medio bollo—. Ahora come y vete a ganar lo que haya que ganar.', cond: 'flag.b07_lola_confiesa' },
		],
		b07_lola_crampon_visita: [
			{ text: 'Lola barre la cal del ring con escoba de palma, en pasadas largas, como si barriera la acera de su puesto. Tacho la sigue un paso por detrás, oliendo cada rincón que queda limpio.' },
			{ say: 'lola', text: 'Ya van ciento cuarenta cajas de caramelos devueltas. Las cuenta la chica de la bufanda. Las cuenta dos veces. —No para de barrer—. Nerio dice que cuando acabe me deja vender bollos en la calle los días de concierto. Le dije que fiado no. Me dijo que en Crampón no se fía. Nos entendimos.' },
		],

		// =================== BASTIEN (rama `rompe`) ===================
		b07_bastien_charla: [
			{ set: { 'flag.b07_bastien_charla': true } },
			{ text: 'Bastien está sentado en su caja de fruta, con la libreta abierta sobre las rodillas y el cartel de «SE ALQUILA RIVAL» a los pies. El Greninja le quita una pelusa del hombro.' },
			{ say: 'bastien', text: 'Desde Mayólica me va bien. De verdad. Me alquilan para entrenar, para practicar, para bodas, una vez. —Se ríe un poco—. Y hace dos semanas me escribieron: «Torneo privado en Galar, bien pagado, sin preguntas». Sin preguntas. Eso tendría que haberme dado una pista.' },
			{ say: 'bastien', text: 'No sé quién paga. Me pagan en efectivo, en un sobre, cada noche. Lo dejan en esta caja. —Toca la caja de fruta—. Lo apunto todo en la libreta. Cuánto, cuándo. A quién, no lo sé.' },
			{ say: 'bastien', text: 'Y me dieron esto con el primer sobre. —Saca una piedra azul y roja del bolsillo—. Para Greninja. «Para que rinda». Es lo mismo que decían en el contrato de antes. Pero esto no es un contrato. Esto es solo un trabajo. ¿Verdad?' },
			{ if: 'has("contratohorizonte") || flag.b07_libro', then: [
				{ text: 'Miras el papel que llevas. Bastien sigue tu mirada. No pregunta. Se le queda la cara muy quieta.' },
			] },
			{ intel: { npc: 'bastien', text: 'En la Cripta de Crampón, como «entrenador de alquiler» en el torneo: le pagan en efectivo cada noche y le dieron una piedra para Greninja «para que rinda». No sabe quién paga.' } },
		],
		b07_bastien_reto: [
			{ text: 'Bastien cierra la libreta. El Greninja se baja de su hombro y se pone delante de él.' },
			{ say: 'bastien', text: '¿Un combate? Gratis. Fuera del torneo, en el pasillo. —Sonríe un poco—. Antes, cúrate. Tengo pociones de la Gira. No me las pienso usar todas yo.' },
			{ prompt: '¿Combatir con Bastien?', choice: [
				{ text: 'Curarse y combatir', then: [
					{ heal: 'Bastien vacía la mochila: Pociones Máximas con la pegatina de la Gira y una barrita de cereales para cada Pokémon. Tu equipo se recupera del todo.' },
					{ battle: 'bastien_8', lose: 'continue', onWin: [
						{ say: 'bastien', text: 'Mega-Greninja contigo y aun así… —Mira la piedra, en el aire, entre los dedos—. A lo mejor no rinde tanto. A lo mejor rindo yo. Quiero creer eso.' },
					], onLose: [
						{ say: 'bastien', text: 'Gané. —No lo celebra—. Con esto. —Mira la piedra—. No sé si gané yo o la piedra. Antes no me lo preguntaba.' },
						{ heal: 'Bastien te pasa las Pociones Máximas que le quedan. Tu equipo se recupera del todo.' },
					] },
				] },
				{ text: 'Ahora no', then: [{ say: 'bastien', text: 'Va. Aquí estoy toda la noche. Me pagan por estar. Eso es lo peor.' }] },
			] },
		],
		b07_bastien_espera: [
			{ text: 'Bastien apunta algo en la libreta sin mirar el ring. El Greninja mira el ring por los dos.' },
			{ say: 'bastien', text: 'Si averiguas quién paga… dímelo. Aunque no me guste. Sobre todo si no me gusta.' },
		],
		b07_bastien_libro: [
			{ if: 'done.b07_t_bastien', then: [{ end: true }] },
			{ text: 'Le enseñas a Bastien el libro de cuentas. Lo abre por donde lo abras tú. No dice nada en la primera página. En la segunda, tampoco. En la tercera, para.' },
			{ say: 'bastien', text: '«Dirección (Ω)». —Lo lee dos veces—. Esto es… esto es el mismo sello. El del contrato de Lemnis. El de la cláusula. El de las sesiones.' },
			{ text: 'Pasa más páginas, cada vez más deprisa. En una de ellas, entre los gastos, una línea: «Luchadores de alquiler: B. L. · pago por noche · *sujeto con historial de vínculo: observar*».' },
			{ say: 'bastien', text: '«Sujeto». —Cierra el libro muy despacio—. Rompí el contrato. Me fui. Me alquilé a mí mismo para no deberle nada a nadie. Y he vuelto a trabajar para ellos. Sin saberlo. Por dinero. Con una piedra suya en el bolsillo.' },
			{ text: 'Se queda mirando la caja de fruta donde le dejaban los sobres. Luego saca la piedra y la mira mucho rato. El Greninja le pone una mano en el brazo.' },
			{ prompt: 'Bastien no llora. Está a punto.', choice: [
				{ text: '«No lo sabías. Ahora sí. Eso cambia lo que haces mañana.»', then: [
					{ say: 'bastien', text: 'Mañana. —Se limpia la nariz con la manga—. Mañana me compro una libreta nueva. Y en la primera página pongo una regla: «Antes de cobrar, pregunta quién paga». La segunda regla todavía no la sé.' },
				] },
				{ text: 'Ponerle la mano en el otro brazo, como el Greninja.', then: [
					{ text: 'Le pones la mano en el otro brazo. El Greninja te mira. Bastien se ríe, de golpe, con los ojos mojados. «Me tienen rodeado».' },
					{ say: 'bastien', text: 'Gracias. Los dos. —Respira—. Ya está. Ya está.' },
				] },
			] },
			{ say: 'bastien', text: 'Esto ya no lo cobro. —Mete los sobres de las noches anteriores, sin abrir, dentro de la caja de fruta, y le da una patada suave para empujarla hacia el ring—. La piedra me la quedo. Greninja no tiene la culpa de quién se la dio.' },
			{ set: { 'flag.b07_bastien_roto': true } },
			{ quest: 'b07_t_bastien', stage: 'hecha', done: true },
			{ intel: { npc: 'bastien', text: 'Al ver el libro de cuentas de la Cripta reconoció el sello «Dirección (Ω)» de su viejo contrato y una línea sobre él: «sujeto con historial de vínculo: observar». Devolvió los sobres sin abrir. Se quedó la piedra «porque Greninja no tiene la culpa».' } },
		],
		b07_bastien_despues: [
			{ text: 'Bastien está sentado en las gradas vacías, con una libreta nueva, de tapas verdes. En la primera página, una sola línea. El Greninja duerme a su lado.' },
			{ say: 'bastien', text: '«Antes de cobrar, pregunta quién paga». —Te la enseña—. La segunda regla todavía no la sé. Cuando la sepa, te la escribo.' },
		],

		// =================== LA FINAL ===================
		b07_final: [
			{ if: FINAL, then: [{ end: true }] },
			{ text: 'Medianoche, aunque arriba sea cualquier hora. Las gradas de cajas de fruta están llenas. El generador ruge. El Anfitrión sube al ring con la chistera en la mano.' },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Damas, caballeros y exlo-que-sea! ¡La final! ¡En una esquina, nuestro Campeón sin nombre, invicto, callado, puntual! ¡Y en la otra…!' },
			{ if: '!beat("torneo_r3")', then: [
				{ text: 'El Anfitrión mira la pizarra. Tu nombre no está en la línea de la final. Entonces se oye una voz cansada desde la escalera.' },
				{ say: 'nerio', text: 'De parte mía. —Baja dos escalones, con el micro apagado en la mano—. El de la tercera ronda se ha ido por la puerta de atrás en cuanto ha visto a la policía. Tu Campeón necesita rival. Este es.' },
				{ say: 'xero', as: 'El Anfitrión', text: '¡Bwahaha! ¡Un sustituto! ¡Me encantan los sustitutos! ¡Son lo más imprevisible que hay!' },
			], else: [
				{ say: 'xero', as: 'El Anfitrión', text: '¡…nuestro finalista de la Gira! ¡Tres rondas, tres victorias! ¡Bwahaha!' },
			] },
			{ text: 'En la otra esquina, un hombre ancho con uniforme gris sin insignias se quita la gorra, la dobla en cuatro y la mete en el bolsillo de atrás. Detrás de él, sus Pokémon tienen los ojos de un azul apagado.' },
			{ text: 'Un ayudante con guantes sube al ring con una bandeja. Encima, un plato de caramelos con envoltorio azul y plata. Se los da uno a uno a los Pokémon del Campeón. Luego se gira hacia ti y te ofrece el plato.' },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Para que rindan! ¡Cortesía de la casa!' },
			{ text: '{riolu} enseña los dientes al plato. Un gruñido bajo, largo, que se oye por encima del generador.', cond: LUC },
			{ prompt: 'El ayudante espera con el plato.', choice: [
				{ text: 'Tomar uno y guardártelo sin dárselo a nadie', then: [
					{ if: 'has("frascokaori")', then: [
						{ text: 'Tomas un caramelo con dos dedos y, con la otra mano, lo metes en el frasco de Kaori sin que nadie te vea. Lo cierras. Etiqueta: «finalista».' },
					], else: [
						{ text: 'Tomas un caramelo con dos dedos y te lo guardas en el bolsillo de la chaqueta, envuelto en un pañuelo. Nadie se fija.' },
					] },
					{ give: 'muestralazo' },
				] },
				{ text: 'Apartar el plato', then: [
					{ text: 'Apartas el plato con la mano. El ayudante se encoge de hombros. El Anfitrión se ríe. «¡Más para el Campeón!»' },
				] },
			] },
			{ text: 'Antes de que suene la campana, Handsome aparece en tu esquina, con otra camisa de flores, igual de fea. Trae una bolsa de deporte.' },
			{ heal: 'Handsome abre la bolsa: Restaurar Todo, Revivir, Pociones Máximas y un termo de la cocina de Matière que no abres. «Para la final, todo. Handsome no ahorra en finales». Tu equipo se recupera del todo.' },
			{ battle: 'torneo_final', lose: 'continue', onWin: [
				{ text: 'El Dragapult del Campeón cae sobre la cal. El azul de sus ojos parpadea, se apaga y vuelve a ser el de siempre, cansado. El Campeón lo recoge en brazos. No mira a la grada. Te mira a ti.' },
				{ say: 'seguridad_macro', as: 'El Campeón sin nombre', text: 'Bien. Ya está. —Se pone la gorra—. Veinte años de seguridad en una torre muy alta. Cuando cerraron, nadie me dio las gracias. Esto tampoco me las da. Pero tú has peleado limpio. Eso me vale.' },
				{ set: { 'flag.b07_torneo_ganado': true } },
			], onLose: [
				{ text: 'Tu último Pokémon cae sobre la cal. El Campeón no celebra. Recoge a los suyos uno a uno, y al Dragapult le pasa la mano por la cabeza, despacio, como si le pidiera perdón por algo.' },
				{ say: 'seguridad_macro', as: 'El Campeón sin nombre', text: 'Turno terminado. —Se pone la gorra—. Mis Pokémon han comido esos caramelos. Los tuyos no. Si volvemos a pelear, que sea sin caramelos. Así sabremos quién gana de verdad.' },
				{ heal: 'Handsome vacía lo que quedaba en la bolsa de deporte. Tu equipo se recupera del todo.' },
			] },
			{ set: { 'flag.b07_torneo_final': true } },
			{ cap: 72 },
			{ call: 'b07_xero_careta' },
			{ call: 'b07_tras_final' },
		],
		b07_final_revancha: [
			{ text: 'El Campeón sin nombre sigue en su esquina, sentado en una caja, con la gorra doblada en el bolsillo de atrás. Sus Pokémon ya no tienen los ojos azules.' },
			{ say: 'seguridad_macro', as: 'El Campeón sin nombre', text: '¿Otra? Sin caramelos esta vez. —Se levanta—. Cúrate si quieres. Yo ya estoy.' },
			{ prompt: '¿Revancha con el Campeón sin nombre?', choice: [
				{ text: 'Curarse y pelear', then: [
					{ heal: 'Nerio te lanza desde la escalera una bolsa de pociones del Team Yell. Tu equipo se recupera del todo.' },
					{ battle: 'torneo_final', lose: 'continue', onWin: [
						{ say: 'seguridad_macro', as: 'El Campeón sin nombre', text: 'Sin caramelos y has ganado. Entonces lo de antes también contaba. —Asiente—. Bien.' },
						{ set: { 'flag.b07_torneo_ganado': true } },
					], onLose: [
						{ say: 'seguridad_macro', as: 'El Campeón sin nombre', text: 'Otra vez yo. Sin caramelos. —Casi sonríe—. Vuelve cuando quieras. Ya no tengo turno.' },
						{ heal: 'Nerio te lanza otra bolsa de pociones. Tu equipo se recupera del todo.' },
					] },
				] },
				{ text: 'Otro día', then: [{ say: 'seguridad_macro', as: 'El Campeón sin nombre', text: 'Aquí estaré. No tengo adónde ir.' }] },
			] },
		],
		b07_xero_careta: [
			{ if: 'flag.b07_xero_anfitrion', then: [{ end: true }] },
			{ text: 'El Anfitrión sube al ring dando palmas, con la chistera en una mano y el micro en la otra.' },
			{ say: 'xero', as: 'El Anfitrión', text: '¡Qué final! ¡Qué espectáculo! ¡Y ahora, el contrato del ganador, los caramelos de la próxima semana y…! ¡Bwahaha!' },
			{ if: LUC, then: [
				{ text: 'Esa risa otra vez. {riolu} no espera a que se lo pidas: salta al ring, le da un toque con la palma a la careta, y la careta sale volando y rueda por la cal hasta tus pies, sonriendo boca arriba.' },
			], else: [
				{ text: 'Esa risa otra vez. Handsome sube al ring de dos zancadas, le pone la mano en el hombro y, con la otra, le quita la careta como quien quita la tapa de una olla. La careta rueda por la cal hasta tus pies, sonriendo boca arriba.' },
			] },
			{ text: 'Debajo hay unas gafas enormes, un bigote canoso y una cara que conoces. Muy colorada.' },
			{ say: 'xero', text: '…¿Cómo lo has sabido? —Se toca la cara como si buscara la careta todavía—. ¡Llevaba careta! ¡Y chistera! ¡Y frac! ¡Era un disfraz completo!' },
			{ prompt: 'Xero te mira, ofendidísimo.', choice: [
				{ text: '«Por la risa.»', then: [{ say: 'xero', text: '…La risa. —Se queda pensando—. Me la tenía que haber cambiado. Lo apunté y no lo hice. Defecto de científico: apuntar en vez de hacer.' }] },
				{ text: '«Por las gafas. Se veían por los agujeros.»', then: [{ say: 'xero', text: '¡Las gafas! ¡Sin las gafas no veo! —Pausa—. Ese es un problema de diseño que no había previsto. Me fastidia muchísimo.' }] },
			] },
			{ set: { 'flag.b07_xero_anfitrion': true } },
			{ say: 'xero', text: '¡Pero que conste! —Levanta un dedo—. Yo no pago nada. Yo pongo la carpa. La careta, la chistera, el ring, el que apunta en la pizarra. El dinero viene de otro sitio. Yo soy el contratista. Como siempre. ¡Bwahaha! Perdón. Costumbre.' },
			{ if: '!flag.b07_libro', then: [
				{ say: 'xero', text: 'Y para que conste de verdad… —Saca del frac un fajo de hojas grapadas—. Copia del libro de cuentas. Las fotocopié yo mismo. Si un día alguien pregunta, que vea que el contratista solo cobraba la carpa. Lo demás no es mío.' },
				{ give: 'librotorneo' },
				{ call: 'b07_libro_lectura' },
			] },
			{ if: 'flag.b04_xero_matiere', then: [
				{ say: 'handsome', text: 'Xero. —Muy serio—. Matière te escribe todos los domingos. «Come». Una palabra.' },
				{ say: 'xero', text: '…—Se le borra la sonrisa entera—. Ya lo sé. Por eso acepté este trabajo y no otro. En este no había que hacerle daño a nadie. Solo poner la carpa. —Se mira las manos—. Eso me dije.' },
			] },
			{ if: PP, then: [
				{ say: 'handsome', text: 'Handsome tiene tu llamada grabada. «Sí, Dirección». —Saca unas esposas de la riñonera de turista—. No es personal. Bueno, un poco. Matière me va a pedir que te traiga galletas a la celda.' },
				{ say: 'xero', text: 'De las de mantequilla. —Extiende las muñecas, muy digno—. Y que no se le quemen.' },
				{ set: { 'flag.b07_xero_detenido': true } },
			], else: [
				{ say: 'xero', text: '¡Y ahora, si me disculpan…! —Pisa algo en el suelo del ring. Se abre una trampilla de las de hielo de pescado—. ¡Bwahaha! ¡La salida de emergencia es lo primero que se diseña!' },
				{ text: 'Xero desaparece por la trampilla con la chistera en la mano. Handsome se tira detrás y se queda atascado de cintura para arriba, con las piernas pataleando. Cuando lo sacan, Xero ya no está. La careta sigue a tus pies, sonriendo.' },
				{ say: 'handsome', text: '—Sacudiéndose el polvo—. Handsome lo encontrará. Siempre lo encuentra. Normalmente en el sitio más obvio. Normalmente cerca de Matière.' },
				{ set: { 'flag.b07_xero_escapa': true } },
			] },
			{ intel: { npc: 'xero', text: 'Era el Anfitrión del torneo de la Cripta, con careta y chistera. «Yo no pago nada. Yo pongo la carpa. Yo soy el contratista».' } },
		],

		// ----- Después de la final: lo que queda pendiente, en orden -----
		b07_tras_final: [
			{ if: '!flag.b07_lola_confiesa', then: [{ call: 'b07_lola_confesion' }] },
			{ if: ROMPE + ' && flag.b07_bastien_torneo && !done.b07_t_bastien', then: [{ call: 'b07_bastien_libro' }] },
			{ if: '!done.b07_t_kaori', then: [{ call: 'b07_kaori_analisis' }] },
			{ if: '!' + LIBRO_DECIDIDO, then: [{ call: 'b07_libro_decision' }] },
			{ if: '!flag.b07_noa_mensaje', then: [{ call: 'b07_noa_sobre' }] },
			{ if: '!' + FIN, then: [{ call: 'b07_t4_cierre' }] },
		],
		b07_libro_decision: [
			{ if: LIBRO_DECIDIDO, then: [{ end: true }] },
			{ text: 'Arriba, en la calle, bajo el techo de chapa, Handsome, Nerio y tú alrededor del libro de cuentas, abierto sobre el amplificador del escenario. Llueve sobre la chapa. Nadie habla durante un rato.' },
			{ say: 'handsome', text: 'Esto es lo más cerca que Handsome ha estado nunca de «Dirección». Y lo tienes tú en la mano. —Se quita las gafas de sol—. Decide tú qué se hace con él. Handsome tiene una opinión, pero es de policía. Las de policía son todas iguales.' },
			{ say: 'nerio', text: 'Y piensa en esto. —Señala una casilla con el dedo—. «Visto bueno de Presidencia: no». En todas las páginas. Alguien en esa empresa no sabe lo que pasa en su propia casa. O no quiere saberlo.' },
			{ prompt: 'El libro de cuentas, abierto sobre el amplificador. Ninguna opción es la buena.', choice: [
				{ text: '«Para Handsome. Que llegue a la Policía Internacional.»', then: [
					{ say: 'handsome', text: 'Handsome lo fotografía. Página a página. —Saca la cámara de turista y le cierra la tapa—. Tenía carrete. Siempre tiene carrete. Lo del turista era la tapa abierta.' },
					{ text: 'Handsome hace una foto de cada página, con mucho cuidado, y te devuelve el libro. «El original, guárdalo tú. Handsome ya no se fía de los archivos de nadie».' },
					{ say: 'handsome', text: 'Mañana habrá agentes en Artejo. Discretos. Más discretos que yo. No es difícil.' },
					{ set: { 'flag.b07_libro_policia': true } },
					{ rep: { policia: 3 } },
				] },
				{ text: '«Para Alexia y Renata. Que lo lea todo el mundo.»', then: [
					{ text: 'Haces fotos de las páginas y se las mandas a Alexia, a *La Gaceta Viajera*, con copia a Renata. A los tres minutos vibra la Pokédex.' },
					{ say: 'alexia', as: 'Alexia (mensaje)', text: '«Recibido. Lo verifico esta noche y lo publico cuando aguante de pie. Renata quiere leerlo en antena. Le he dicho que primero lo leo yo. Ha dicho "cool, cool, cool" de una forma que no me ha gustado».' },
					{ say: 'nerio', text: 'Si sale en los periódicos, en esa empresa van a encender todas las luces. —Se cuelga la bufanda—. A lo mejor eso es bueno. A lo mejor no.' },
					{ set: { 'flag.b07_libro_prensa': true } },
					{ rep: { lemnis: -3 } },
				] },
				{ text: '«Me lo guardo. Si la Presidencia no sabe nada, que lo lea quien preside.»', then: [
					{ say: 'handsome', text: '…—Se rasca la nuca—. Es arriesgado. La presidenta de Lemnis no es tu amiga. —Pausa—. Pero tampoco ha firmado ni una sola página. Eso Handsome lo ha visto. Guárdalo bien.' },
					{ say: 'nerio', text: 'Lo que no se firma también pesa. Que lo cargue quien tenga que cargarlo.' },
					{ set: { 'flag.b07_libro_octavia': true } },
				] },
			] },
			{ intel: { npc: 'handsome', text: 'Te dejó decidir qué hacer con el libro de cuentas del torneo de la Cripta: dárselo a la Policía Internacional, mandarlo a la prensa o guardarlo para la presidenta de Lemnis.' } },
		],
		b07_noa_sobre: [
			{ if: 'flag.b07_noa_mensaje', then: [{ end: true }] },
			{ text: 'Cuando bajas del escenario, una hincha del Team Yell con la cara pintada se te acerca corriendo, con un sobre en la mano.' },
			{ say: 'hincha_yell', as: 'Hincha con la cara pintada', text: 'Estaba en las cajas de caramelos que estamos subiendo. Debajo del papel de envío, pegado con celo. Pone tu nombre. Bueno, pone «para quien venga con un Lucario». Y tú vienes con un Lucario.', cond: 'inParty("lucario")' },
			{ say: 'hincha_yell', as: 'Hincha con la cara pintada', text: 'Estaba en las cajas de caramelos que estamos subiendo. Debajo del papel de envío, pegado con celo. Pone tu nombre. Bueno, pone «para quien venga con un Riolu». Nerio dice que eres tú.', cond: 'inParty("riolu") && !inParty("lucario")' },
			{ say: 'hincha_yell', as: 'Hincha con la cara pintada', text: 'Estaba en las cajas de caramelos que estamos subiendo. Debajo del papel de envío, pegado con celo. Pone tu nombre. Bien escrito, eh. Con todas las letras.', cond: '!(' + LUC + ')' },
			{ text: 'Es un sobre de envío de los de Lemnis, de los de ventanilla de plástico. Dentro, una hoja de albarán. En el dorso, a lápiz, una letra redonda y apretada, de quien hace inventario. La reconoces antes de leerla.' },
			{ give: 'sobrenoa' },
			{ read: 'sobrenoa' },
			{ text: '{riolu} huele el sobre y se queda muy quieto, con las orejas bajas. Huele a cartón de envío. Y a alguien que conoce.', cond: LUC },
			{ set: { 'flag.b07_noa_mensaje': true } },
			{ quest: 'b07_t_noa', stage: 'mensaje' },
			{ intel: { npc: 'noa', text: 'Un sobre de envío escondido entre las cajas de caramelos del torneo de Crampón, con su letra: «Emplazamiento 06. Artejo. Sé contar. Si no llego, abre tú».' } },
		],
		b07_t4_cierre: [
			{ if: FIN, then: [{ end: true }] },
			{ text: 'Esa noche, Nerio no enciende el amplificador. Se sienta en el borde del escenario, con la guitarra sin enchufar, y canta bajito, para la calle. Poco a poco, las persianas de Crampón se levantan. La gente sale en zapatillas, con chaquetas encima del pijama.' },
			{ text: 'Lola, en primera fila, con Tacho en brazos. No canta. Mueve los labios.', cond: 'flag.b07_lola_crampon' },
			{ text: 'En la última fila, con la libreta nueva apretada contra el pecho, Bastien. El Greninja canta. Mal. Nadie se lo dice.', cond: 'flag.b07_bastien_roto' },
			{ text: 'Kaori escucha desde la escalera de incendios del callejón, con la bufanda hasta la nariz. Cuando acaba la canción, aplaude dos veces. Exactamente dos.', cond: 'flag.b07_kaori_torneo' },
			{ say: 'nerio', text: '—Cuando acaba, sin levantarse—. El que paga está en Artejo. Lo dice el sobre y lo dice el generador. —Te mira—. Yo no voy. Mi sitio es este escenario. Pero si vuelves por aquí, esta canción es tuya. No se la canto a nadie más.' },
			{ if: 'flag.b07_xero_detenido', then: [
				{ say: 'handsome', text: 'Handsome se lleva a Xero a Pistón en el primer tren. Le ha comprado un bollo para el viaje. No se lo digas a nadie. —Se pone las gafas de sol, de noche—. Nos vemos en Artejo, colaborador.' },
			], else: [
				{ say: 'handsome', text: 'Handsome se va a buscar a Xero. Siempre lo encuentra. —Se pone las gafas de sol, de noche—. Nos vemos en Artejo, colaborador. Ve con cuidado. Lleva a {riolu}.' },
			] },
			{ quest: 'b07_m4', stage: 'hecha', done: true },
			{ quest: 'b07_m5', stage: 'artejo' },
			{ set: { 'flag.b07_t4_hecho': true } },
			// ----- El Diario del final del torneo, según la rama (sin la cara del Anfitrión ni el nombre de la fundación) -----
			{ diary: 'Hoy hubo final en la Cripta. Peleamos. Abajo no se ve el cielo. Arriba tampoco.\n\nAl final, el Anfitrión se quitó la careta. No pongo quién era. No me sale.\n\nLola contó una cosa. Larga. No la apunto. Es suya.\n\nHabía un sobre de Noa. Pone Artejo. Pone «si no llego». No me gusta esa frase. La leí tres veces.', cond: D_PURGADO },
			{ diary: 'Hoy terminó el torneo de la Cripta, en Pueblo Crampón. Mi entrenador{|a|e} peleó en la final contra el Campeón sin nombre, un antiguo guardia de seguridad cuyos Pokémon habían comido Caramelos Lazo. Al final, el Anfitrión se quitó la careta.\n\nEl dinero del torneo lo pagaba una fundación, y quien firmaba los pagos era «Dirección». La presidencia de Lemnis no había dado el visto bueno a ninguno. Lola nos contó por qué estaba allí, y decidió qué hacer. Kaori se llevó los caramelos.\n\nEntre las cajas había un sobre con la letra de Noa: «Emplazamiento 06. Artejo. Sé contar. Si no llego, abre tú».\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy hubo un concierto en Pueblo Crampón! Nerio cantó en la calle, sin amplificador, y todo el pueblo salió en pijama a escucharlo. ¡Qué bonito!\n\nAntes vimos combates en un sótano muy antiguo. Ganara quien ganara, todo el mundo aplaudía. Mañana volvemos a Pistón en tren.', cond: D_DOBLE },
			{ say: 'rotom', text: 'Bzzt. —Muy bajito—. Lo del libro no lo he puesto. Ni lo del Anfitrión. Ni lo del sobre. Sobre todo lo del sobre. —Pausa—. He puesto lo del concierto. El concierto no le importa a nadie. Bueno, al pueblo.', cond: DOBLE },
			{ say: 'rotom', text: '¡Bzzt! Siguiente: **Ciudad Artejo**, al norte. Tren a **Pistón** y, desde allí, por el **Área Silvestre**. El sobre dice «emplazamiento 06». No sé qué es. Pero vamos.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Artejo. Por Pistón. El sobre dice 06. Vamos.', cond: PURG },
		],

		// =================== KAORI ===================
		b07_kaori_callejon: [
			{ if: 'flag.b07_kaori_torneo', then: [{ end: true }] },
			{ set: { 'flag.b07_kaori_torneo': true } },
			{ text: 'En el callejón, sentada en un contenedor cerrado, con la bufanda enorme, guantes de goma y las vendas asomando de la manga, está **Kaori**. Tiene un frasco a contraluz bajo el foco de obra y cuenta gotas con una pipeta. No levanta la vista.' },
			{ say: 'kaori', text: 'Diecisiete. Dieciocho. —Pausa—. Has venido.' },
			{ prompt: 'Kaori sigue contando gotas.', choice: [
				{ text: 'Esperar en silencio a que termine.', then: [
					{ af: { kaori: 2 } },
					{ text: 'Esperas. Cuenta hasta cuarenta. Tapa el frasco. Lo agita una vez. Lo mira. Solo entonces te mira a ti.' },
					{ say: 'kaori', text: 'Gracias por no hablar. Casi nadie sabe no hablar.' },
				] },
				{ text: 'Preguntarle qué hace.', then: [
					{ say: 'kaori', text: 'Cuento. —Diecinueve. Veinte—. Ahora cuento y hablo. Se me da peor. —Sigue hasta cuarenta y tapa el frasco—. Ya.' },
				] },
				{ text: 'Agarrar el frasco para verlo mejor.', then: [
					{ af: { kaori: -2 } },
					{ set: { 'flag.b07_kaori_dolida': true, 'vars.b07_af_kaori_perdida': '+2' } },
					{ text: 'Al agarrar el frasco, la pipeta suelta tres gotas de golpe. Kaori se queda mirando el líquido, que se pone turbio.' },
					{ say: 'kaori', text: 'Cuarenta minutos. —Muy plana—. Era una titulación de cuarenta minutos. —Tapa el frasco despacio y no te mira—. No pasa nada. Pasa, pero no pasa nada.' },
				] },
			] },
			{ say: 'kaori', text: 'El lote 05. Lo que no se quemó en Teselia. Seguí el papel de envío hasta aquí: «material de sonido». —Señala el escenario con la barbilla—. No es material de sonido. Se lo dan a los Pokémon de los finalistas del torneo de abajo. Antes de la final.' },
			{ say: 'kaori', text: 'Me falta una cosa: un caramelo de los que reparten esta semana, sin abrir, y saliva de un Pokémon que se haya comido uno. Lo segundo lo consigo yo. Lo primero no: a mí no me dejan bajar. Dicen que tengo «cara de boticaria». Es mi cara.' },
			{ say: 'kaori', text: 'Toma. —Te da un frasco vacío con una etiqueta escrita a mano: «FINALISTA»—. Si te ofrecen caramelos, no te los comas, no se los des a nadie y mételos aquí. Si tu Pokémon gruñe, hazle caso. Ellos saben antes que nosotros.' },
			{ give: 'frascokaori' },
			{ say: 'kaori', text: 'Y una cosa. —Pausa—. Lo que haya abajo… no te compadezcas de nadie mientras pelea. Compadécete después. Primero se mide, luego se siente.' },
			{ intel: { npc: 'kaori', text: 'En el callejón del gimnasio de Crampón: siguió lo que quedaba del lote 05 de Caramelos Lazo, enviado como «material de sonido». Se lo dan a los Pokémon de los finalistas del torneo antes de la final. Te dio un frasco para traerle un caramelo sin abrir.' } },
		],
		b07_kaori_analisis: [
			{ if: 'done.b07_t_kaori', then: [{ end: true }] },
			{ if: '!flag.b07_kaori_torneo', then: [
				{ set: { 'flag.b07_kaori_torneo': true } },
				{ text: 'En el pasillo de servicio, una chica con una bufanda enorme y guantes de goma se cuela entre los de seguridad, que miran a otro lado. Lleva una caja de botica bajo el brazo.' },
				{ say: 'kaori', text: 'No me han dejado bajar en toda la noche. «Cara de boticaria». —Se ajusta un guante—. Ahora que se ha acabado, nadie mira a nadie. Kaori. Ya me conoces. Vengo por los caramelos.' },
			] },
			{ text: 'Kaori se arrodilla junto a los Pokémon del Campeón sin nombre, que descansan en sus Poké Balls abiertas, todavía con un brillo azul apagado en los ojos. Les pasa un bastoncillo por la boca, uno a uno, con mucha más ternura de la que pone en su voz.' },
			{ say: 'kaori', text: 'Seis gramos de lote 05 por Pokémon. Con el generador encendido. —Cierra un tubo—. Por eso aquí abajo se hacían grandes más rato que en un estadio. No era el generador solo. Era el generador comiéndose lo que les metían. Y lo que les metían era de otros.' },
			{ if: 'has("muestralazo")', then: [
				{ take: 'muestralazo', n: 1, silent: true },
				{ af: { kaori: 3 } },
				{ if: 'has("frascokaori")', then: [
					{ text: 'Le das el frasco de «FINALISTA» con el caramelo dentro, sin abrir. Kaori lo levanta a la luz de la bombilla y se le quedan los ojos quietos.' },
				], else: [
					{ text: 'Le das el caramelo envuelto en el pañuelo, sin abrir. Kaori lo desenvuelve con dos dedos y lo levanta a la luz de la bombilla.' },
				] },
				{ say: 'kaori', text: 'Sin abrir. —Muy bajito—. Muy bien. Esto vale más que diez frascos de Teselia. Es de esta semana. Está caliente. Nadie lo ha cansado todavía.' },
				{ if: 'flag.b06_kaori_frio', then: [
					{ text: 'Kaori echa una gota de su antídoto sobre el caramelo caliente y otra sobre el bastoncillo del Dragapult. El caramelo se apaga del todo, como en Teselia. El bastoncillo, poco a poco, pierde el azul.' },
					{ say: 'kaori', text: 'Oh. —La voz se le rompe un poco—. No solo deshace el caramelo. Le quita el azul al que se lo comió. Despacio. Pero se lo quita. Esto es… precioso. Es el paso más grande desde Iris.' },
					{ set: { 'flag.b07_antidoto_mediano': true } },
				], else: [
					{ text: 'Kaori echa una gota de su antídoto sobre el caramelo. El azul se apaga un poco. Echa otra sobre el bastoncillo del Dragapult. El bastoncillo tarda, pero palidece.' },
					{ say: 'kaori', text: 'Funciona en el que se lo comió. Un poco. Un paso pequeño. Me falta lo que había en frío en Teselia, para compararlo. No lo tengo. Lo apunto.' },
				] },
			], else: [
				{ text: 'Kaori echa una gota de su antídoto sobre el bastoncillo del Dragapult. El azul tarda, pero palidece.' },
				{ say: 'kaori', text: 'Funciona en el que se lo comió. Un poco. Me faltaba un caramelo sin abrir de esta semana. —Te mira el bolsillo vacío—. No pasa nada. Un paso pequeño es un paso. Los pequeños son los que más se olvidan. Yo no los olvido.' },
			] },
			{ say: 'kaori', text: 'Pregunta seria. —Te mira—. ¿Por qué crees que tu Pokémon gruñía al plato?', cond: LUC },
			{ say: 'kaori', text: 'Pregunta seria. —Te mira—. ¿Por qué crees que los Pokémon de abajo se apartaban del plato antes de comer?', cond: '!(' + LUC + ')' },
			{ prompt: 'Kaori espera la respuesta con la pipeta en la mano.', choice: [
				{ text: '«Porque nota que lo que hay dentro es de otro.»', then: [
					{ af: { kaori: 2 } },
					{ say: 'kaori', text: 'Sí. Eso pienso yo. No tengo cómo medirlo todavía. Pero lo pienso. —Lo apunta—. Pensar antes de medir está permitido. Solo si luego mides.' },
				] },
				{ text: '«No lo sé.»', then: [
					{ af: { kaori: 1 } },
					{ say: 'kaori', text: 'Bien. «No lo sé» es una respuesta científica. Casi nadie la da.' },
				] },
				{ text: '«Porque esos caramelos están malditos.»', then: [
					{ af: { kaori: -2 } },
					{ set: { 'flag.b07_kaori_dolida': true, 'vars.b07_af_kaori_perdida': '+2' } },
					{ say: 'kaori', text: '—Deja la pipeta—. No. Nada está maldito. Las cosas tienen dueño y tienen dosis. Decir «maldito» es la forma más rápida de no buscar al dueño. —Se pone de espaldas—. Esa respuesta no me gusta.' },
				] },
			] },
			{ quest: 'b07_t_kaori', stage: 'hecha', done: true },
			{ intel: { npc: 'kaori', text: 'En la Cripta, tras la final: el lote 05 con el generador encendido hacía que los Pokémon dinamaxizaran más rato. Su antídoto le quita el azul al Pokémon que se comió un caramelo (más deprisa con un caramelo sin abrir de esa semana).' } },
			{ if: 'af.kaori >= 45 && !flag.b07_kaori_momento && !(' + KDOLIDA + ')', then: [{ call: 'b07_kaori_momento' }] },
		],
		b07_kaori_momento: [
			{ if: 'flag.b07_kaori_momento', then: [{ end: true }] },
			{ set: { 'flag.b07_kaori_momento': true } },
			{ text: 'Kaori saca su cuaderno de tapas grises y lo abre sobre las rodillas. Tiene un vial en una mano y el lápiz en la otra. Le falta una mano. Te mira. Luego mira el vial.' },
			{ say: 'kaori', text: 'Sujétalo. Recto. No lo agites. No respires encima. —Te lo pone en la mano—. Si se cae, no pasa nada. Bueno. Pasa. No lo dejes caer.' },
			{ text: 'Sujetas el vial. Kaori escribe deprisa, con letra pequeñísima, mirando el líquido cada pocas palabras. Tú no respiras. En un momento, sin dejar de escribir, Kaori apunta algo en el margen de la página. Una palabra. Tu nombre.' },
			{ say: 'kaori', text: 'Es para saber quién lo sujetaba. —Sin levantar la vista—. En los informes se pone. Es protocolo. —Pausa—. No es protocolo. No lo digas.' },
			{ af: { kaori: 2 } },
			{ intel: { npc: 'kaori', text: 'Te dejó sujetar el vial mientras escribía. Apuntó tu nombre en el margen del cuaderno. «Es protocolo. No es protocolo. No lo digas».' } },
			{ if: 'af.kaori >= 70 && !flag.b07_kaori_peticion', then: [{ call: 'b07_kaori_peticion' }] },
		],
		b07_kaori_peticion: [
			{ if: 'flag.b07_kaori_peticion', then: [{ end: true }] },
			{ set: { 'flag.b07_kaori_peticion': true } },
			{ text: 'Kaori cierra el cuaderno de tapas grises. Lo sostiene un rato con las dos manos, como quien sostiene algo caliente. Luego te lo tiende.' },
			{ say: 'kaori', text: 'Todo lo del antídoto está aquí. Desde Iris. Las dosis, los fallos, las veces que me lo probé en el brazo. —Se toca las vendas—. No tengo copia. No me fío de las copias.' },
			{ say: 'kaori', text: 'Si un día no contesto… este cuaderno lo llevas tú a la botica de Iris. A la del teatro. Lo dejas en el tercer cajón. El que cruje. —Te mira por fin—. No es una despedida. Es una precaución. Las boticarias prudentes viven más.' },
			{ prompt: 'Kaori te tiende el cuaderno.', choice: [
				{ text: '«Lo guardo. Y vas a contestar.»', then: [{ say: 'kaori', text: 'Eso no lo sabes. —Pausa—. Pero suena bien. Apúntalo tú.' }] },
				{ text: 'Guardarlo sin decir nada.', then: [{ text: 'Lo guardas en el bolsillo de dentro de la chaqueta, el que cierra con botón. Kaori mira el botón. Asiente.' }] },
			] },
			{ give: 'cuadernokaori' },
			{ af: { kaori: 2 } },
			{ intel: { npc: 'kaori', text: 'Te dio su cuaderno del antídoto: «Si un día no contesto, este cuaderno lo llevas tú a la botica de Iris. Tercer cajón, el que cruje».' } },
		],
		b07_kaori_despues: [
			{ text: 'Kaori está en su contenedor del callejón, con los guantes puestos, ordenando tubos con bastoncillos en una caja de botica.' },
			{ say: 'kaori', text: 'Todavía no han dado los caramelos de esta semana. Los dan antes de la final. Ten el frasco a mano.', cond: '!done.b07_t_kaori' },
			{ say: 'kaori', text: 'Ciento cuarenta cajas. Las han subido los del Team Yell. Las cuento dos veces. —Pausa—. Las voy a quemar al aire libre. Por si acaso.', cond: 'done.b07_t_kaori' },
		],
		b07_kaori_reparar: [
			{ if: '!(' + KDOLIDA + ')', then: [{ end: true }] },
			{ text: 'Kaori está en el contenedor del callejón, de espaldas, con la pipeta. Te oye llegar. No se gira.' },
			{ say: 'kaori', text: 'Si vienes a decir que lo sientes, no hace falta. Las palabras no se miden. —Sigue contando gotas—. No me sirven.' },
			{ if: 'has("setaluminosa")', then: [
				{ text: 'Sacas una seta luminosa del Bosque Lumirinto y la dejas a su lado, en el borde del contenedor. Brilla en azul bajo el foco.' },
				{ say: 'kaori', text: '…—Deja la pipeta. Se gira. Mira la seta—. Seta luminosa de Lumirinto. Esporas fosforescentes, cero toxicidad, cero utilidad, y sirve para ver un líquido turbio a contraluz sin calentarlo. —La levanta con dos dedos—. Oh. Esto es precioso.' },
				{ take: 'setaluminosa', n: 1, silent: true },
				{ call: 'b07_kaori_reparada' },
			], else: [
				{ if: 'has("maxmushrooms")', then: [
					{ text: 'Sacas una Maxiseta del Área Silvestre y la dejas a su lado, en el borde del contenedor. Huele a tierra y a algo eléctrico.' },
					{ say: 'kaori', text: '…—Se gira. Mira la seta. Se quita un guante—. Una Maxiseta. Las que hacen grande lo que no debería serlo. Si la comparo con la saliva de abajo, veo qué parte es de la seta y qué parte es robada. —La guarda en la bufanda—. Oh. Muy útil. Muy, muy útil.' },
					{ take: 'maxmushrooms', n: 1, silent: true },
					{ call: 'b07_kaori_reparada' },
				], else: [
					{ text: 'Te quedas un rato a su lado. Kaori sigue contando. No te dice que te vayas, pero tampoco te mira.' },
					{ say: 'rotom', text: 'Bzzt. —Bajito—. Con palabras no. Necesita algo que pueda medir. Una seta luminosa de Plié, o una Maxiseta del Área Silvestre. Le encantan las cosas raras.', cond: '!' + PURG },
					{ say: 'rotom', text: 'Bzzt. Palabras no. Una seta rara, sí. De Plié o del Área Silvestre.', cond: PURG },
				] },
			] },
		],
		b07_kaori_reparada: [
			{ if: 'vars.b07_af_kaori_perdida >= 4', then: [{ af: { kaori: 4 } }], else: [{ af: { kaori: 2 } }] },
			{ set: { 'flag.b07_kaori_reparada': true } },
			{ say: 'kaori', text: 'Ya está. —Vuelve a ponerse el guante—. Lo de antes. Ya está medido. —Pausa—. Y no vuelvas a hacerlo. Pero si lo haces, trae otra seta.' },
			{ intel: { npc: 'kaori', text: 'Lo arreglaron en el callejón de Crampón con una seta rara para sus mezclas. «Las palabras no se miden».' } },
		],

		// =================== EL CALLEJÓN: PREMIO DE NERIO ===================
		b07_premio_callejon: [
			{ set: { 'flag.b07_premio_callejon_dado': true } },
			{ text: 'Nerio baja por la escalera de incendios del callejón con las manos en los bolsillos de la chamarra. Los hinchas se apartan y se callan. Por una vez, se callan todos.' },
			{ say: 'nerio', text: 'Tres. Bien. —Saca un disco de la chamarra, con la funda pintada a mano en negro y rosa—. Esto lo usan mis Pokémon cuando la cosa se pone fea. Cuando te bajan algo, pega más fuerte. Como este pueblo. A Crampón le han bajado todo, y aquí sigue, gritando.' },
			{ say: 'nerio', text: 'No es un regalo. Es una canción con forma de disco. Úsala bien.' },
			{ give: 'b07_mt_desahogo' },
			{ intel: { npc: 'nerio', text: 'Te dio la MT Desahogo en el callejón del gimnasio de Crampón: «Cuando te bajan algo, pega más fuerte. Como este pueblo».' } },
		],
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		librotorneo: { name: 'Libro de cuentas de la Cripta', pocket: 'key', cost: 0,
			desc: 'Un libro de cuentas de tapas negras, gastado de tanto abrirlo, sacado de la trastienda del torneo de Crampón. Cada página termina con la misma casilla impresa.',
			read: '*(Libro de cuentas de tapas negras. Columnas a máquina, cifras a mano, tinta azul.)*\n\n**TORNEO DE LA CRIPTA · CRAMPÓN · TEMPORADA 3**\n\n---\n\n**INGRESOS**\n\nTransferencia · Fundación Horizonte · Concepto: Programa de Reinserción · Firma: **Dirección (Ω)**\nTransferencia · Fundación Horizonte · Concepto: Programa de Reinserción · Firma: **Dirección (Ω)**\nTransferencia · Fundación Horizonte · Concepto: Material de sonido · Firma: **Dirección (Ω)**\n\n*Visto bueno de Presidencia:* **no**\n\n---\n\n**GASTOS**\n\nCarpa, ring, careta y chistera · X. (contratista) · *pagado*\nGenerador portátil · cedido por **Emplazamiento 06, Artejo** · devolver el lunes\nCaramelos, lote 05 (resto de Teselia) · 140 cajas · **Logística: N. L. · emplazamiento 06**\nLuchadores de alquiler · B. L. · pago por noche · *sujeto con historial de vínculo: observar*\n\n*Visto bueno de Presidencia:* **no**\n\n---\n\n**DEUDAS QUE SE COBRAN**\n\nL. A. (Kanto) · fianza pagada hace 20 años · *saldo: en especie, esta temporada*\nContratos de reinserción firmados esta temporada: 14 · Destino: *por asignar*\n\n*Visto bueno de Presidencia:* **no**\n\n---\n\n*(En la contraportada, a lápiz, otra letra, con prisa:)* «Las cuentas cuadran. Lo que no cuadra no se apunta. — X.»' },
		contratohorizonte: { name: 'Contrato de Reinserción', pocket: 'key', cost: 0,
			desc: 'Un contrato de varias páginas en papel bueno, con un sello de cera azul. El premio del torneo de la Cripta. El hueco del nombre está en blanco.',
			read: '*(Papel grueso, color hueso. Letra de imprenta muy pequeña. Sello de cera azul en la última página.)*\n\n**PROGRAMA DE REINSERCIÓN HORIZONTE**\n*Contrato de colaboración*\n\nNombre del luchador: ________________\n\n**1.** La Fundación ofrece al firmante un trabajo, una vivienda y «un futuro», en el lugar que la Fundación determine.\n\n**2.** Los Pokémon del firmante participarán en «programas de rendimiento y vínculo». El firmante no podrá negarse a ninguna sesión.\n\n**3.** Toda deuda anterior del firmante con la Fundación se considerará saldada a la firma.\n\n**4.** El firmante renuncia a conocer el destino de los Pokémon cedidos durante los programas.\n\n**5.** Destino del firmante: *por asignar*.\n\n---\n\nFirma de la Fundación: **Dirección (Ω)**\n\n*Visto bueno de Presidencia: no requerido.*' },
		lolarecetaverdad: { name: 'La receta de verdad', pocket: 'key', cost: 0,
			desc: 'Un papel doblado mil veces, con manchas de grasa y harina. La receta de los bollos al vapor de Lola. La de verdad. Te la debía desde Johto.',
			read: '*(Papel de envolver doblado mil veces. Lápiz. Letra grande y apretada, con faltas que alguien ha corregido encima con otro lápiz.)*\n\n**BOLLOS DE LOLA · LA DE VERDAD**\n\nHarina, la que haya. Agua tibia, no caliente: si quema el dedo, quema la masa. Levadura, una cucharadita. Azúcar, otra. Sal, una pizca. Manteca, la que te dé la gana, pero no la ahorres.\n\nSe amasa diez minutos. **Diez.** No nueve. Si te cansas antes, amasa enojada, que también sirve.\n\nSe deja reposar tapada con un trapo limpio en un sitio calientito. Una hora. Mientras, el relleno: lo que sobró ayer. Lo que sobró ayer siempre sabe mejor hoy. Eso vale para los guisos y para casi nada más.\n\nSe forman las bolitas. Se cierran por arriba con un pellizco. Se ponen en la vaporera con un papelito debajo. Quince minutos. **No se abre la tapa.** Abrir la tapa antes de tiempo es lo peor que se le puede hacer a un bollo. A una persona también.\n\n---\n\nLo que no pone en la servilleta ni en la hoja:\n\nEl primer bollo de cada tanda no se vende. Se regala al primero que pase con cara de hambre. Desde hace veinte años. Nadie sabe por qué. Yo sí.\n\nY el último del día, para Tacho.\n\n— **L. A.**\n\n*(Debajo, más pequeño:)* Fiado no. Esto tampoco es fiado. Es tuyo.' },
		sobrenoa: { name: 'Sobre de envío', pocket: 'key', cost: 0,
			desc: 'Un sobre de envío de Lemnis con ventanilla de plástico, escondido entre las cajas de caramelos del torneo de Crampón. En el dorso del albarán, una letra redonda y apretada, a lápiz.',
			read: '*(Albarán de envío de Lemnis, impreso. «Origen: Emplazamiento 06. Destino: Crampón. Contenido: material de sonido. 140 bultos». En el dorso, a lápiz, una letra redonda y apretada, de quien hace inventario.)*\n\nEmplazamiento 06.\n\nArtejo.\n\nSé contar.\n\nSi no llego, abre tú.' },
		cuadernokaori: { name: 'Cuaderno de Kaori', pocket: 'key', cost: 0,
			desc: 'Un cuaderno de tapas grises lleno de letra pequeñísima. Todo lo del antídoto, desde Iris. Kaori no tiene copia. «Si un día no contesto, lo llevas tú a la botica de Iris».',
			read: '*(Cuaderno de tapas grises. Letra pequeñísima, a lápiz. Algunas páginas tienen manchas que parecen de té y otras que parecen de otra cosa.)*\n\n**ANTÍDOTO · NOTAS · K. Y.**\n\n**Iris.** Tres Chicas Kimono con los Pokémon apagados. Caramelo Lazo en el camerino. Sabor: demasiado dulce. Me lo probé. Mal. *(Brazo izquierdo.)*\n\n**Johto, después.** El caramelo no envenena. Vacía. Lo que se lleva se queda en el caramelo. No sé adónde va después.\n\n**Alola.** Método de Æther para el veneno de ultraentes. Sirve. Sin la muestra, frena; con la muestra, deshace.\n\n**Teselia, cámara 2.** Lote 05 en frío. «Con calor, el producto se cansa». No se cansa el producto: se cansa lo que lleva dentro. Es de alguien.\n\n**Crampón.** Lote 05 con generador. Los Pokémon que se lo comen se hacen grandes más rato. El antídoto les quita el azul. Despacio. Les quita el azul.\n\nPendiente: devolver lo que se llevó. Todavía no sé. Lo voy a saber.\n\n---\n\n*(En el margen de la última página, con la misma letra, una palabra sola: tu nombre. Al lado, entre paréntesis: «sujetaba el vial».)*\n\n*(Debajo, tachado tantas veces que casi rompe el papel: «té».)*' },
		frascokaori: { name: 'Frasco de Kaori', pocket: 'key', cost: 0,
			desc: 'Un frasco de vidrio con tapa de rosca y una etiqueta escrita a mano por Kaori: «FINALISTA». Para guardar, sin abrir, un caramelo de los que reparten en el torneo de Crampón.' },
		muestralazo: { name: 'Caramelo de la final', pocket: 'key', cost: 0,
			desc: 'Un Caramelo Lazo de la bandeja de la final de la Cripta, sin abrir. Envoltorio azul y plata. Está caliente. Kaori lo quiere tal cual.' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b07_crampon_arbol: {
			name: 'El árbol del final de la calle', icon: '🌳', hours: 18, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'otono', hint: 'Sacude la copa con cuidado: las bayas doradas valen por tres. Lo que se le cae al Greedent, para el Greedent.' },
			ask: 'Al final de la calle, donde se acaba el techo de chapa, un árbol torcido de bayas. En una rama, un Greedent con los mofletes llenos te mira sin dejar de masticar. Alguien ha pintado en el tronco, en rosa: «DEL PUEBLO».',
			text: 'El árbol de Crampón suelta lo que tiene. El Greedent se queda con la mitad. Es la ley del árbol.',
			wait: 'El árbol del final de la calle está pelado. El Greedent duerme en la rama con la tripa redonda. No ha sido él. Nunca es él.',
			table: [
				{ id: 'oranberry', w: 16, n: [1, 3] }, { id: 'sitrusberry', w: 12, n: [1, 2] }, { id: 'pechaberry', w: 10, n: [1, 2] },
				{ id: 'chestoberry', w: 10, n: [1, 2] }, { id: 'leppaberry', w: 6, n: [1, 1] }, { id: 'colburberry', w: 4, n: [1, 1] },
				{ id: 'kasibberry', w: 4, n: [1, 1] }, { id: 'lumberry', w: 2, n: [1, 1], rare: true }, { id: 'starfberry', w: 1, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		jefe_torneo: {
			name: 'La final de la Cripta', npc: 'seguridad_macro', trainer: 'torneo_final', type: 'Dragon', rec: 71,
			cond: 'flag.b07_cripta_vista',
			info: [
				{ text: 'En **la Cripta**, bajo el mercado cubierto de Crampón. Se llega a la final cuando sabes lo bastante de quién paga el torneo (dos de las tres vías). Te dejan curar antes.' },
				{ text: 'El **Campeón sin nombre**: invicto, callado, puntual. 5 Pokémon, hasta el nivel 71. En la final no hay Megas ni Dinamax. Sus Pokémon comen algo antes de pelear.' },
				{ cond: FINAL, text: 'Su as es **Dragón** y **Fantasma**, y rapidísimo: **Hada**, **Hielo**, **Siniestro**, **Fantasma** y **Dragón**. Uno de los suyos devuelve los cambios de estado; otro se cura y envenena.' },
				{ cond: 'beat("torneo_final")', text: '✔ Ganada. «Ya no me deben nada».' },
			],
		},
		callejon_crampon_entreno: {
			name: 'El callejón del gimnasio (entrenamiento)', npc: 'nerio', type: 'Dark', rec: 71,
			cond: 'visited("callejon_crampon")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **71**: los hinchas del Team Yell entrenan bajo el foco de obra del callejón, detrás del escenario de Nerio. Mucho **Siniestro**.' },
				{ text: '**Nerio** da algo a quien gane **tres** combates.' },
				{ cond: 'flag.b07_premio_callejon_dado', text: '✔ Premio conseguido: MT Desahogo.' },
			],
		},
		lola_cripta: {
			name: 'Lola, en el pasillo', npc: 'lola', trainer: 'lola_torneo', type: 'Poison', rec: 70,
			cond: 'flag.b07_lola_charla',
			info: [
				{ text: 'En la Cripta. Opcional: si le ganas, cuenta como la segunda ronda del torneo. Te deja curar antes (bollos).' },
				{ text: '4 Pokémon, hasta el nivel 70: **Veneno** y **Siniestro**. **Tierra** y **Psíquico** contra casi todos; ojo con el que flota.' },
				{ cond: 'beat("lola_torneo")', text: '✔ Ganado. «Bien ganado».' },
			],
		},
		bastien_cripta: {
			name: 'Bastien, de alquiler', npc: 'bastien', trainer: 'bastien_8', type: 'Water', rec: 70,
			cond: 'flag.b07_bastien_charla',
			info: [
				{ text: 'En la Cripta, en la esquina de los de alquiler. Opcional y gratis. Te deja curar antes.' },
				{ text: '5 Pokémon, hasta el nivel 70. Su Greninja **megaevoluciona**: **Eléctrico**, **Planta**, **Lucha**, **Bicho** y **Hada**.' },
				{ cond: 'beat("bastien_8")', text: '✔ Ganado. Lo apuntó en su libreta.' },
			],
		},
	},

	// =====================================================================
	// RADIO LAVANDA (comentan lo que el jugador ya vivió)
	// =====================================================================
	radio: [
		{ id: 'rl_b07_crampon', kind: 'noticia', cond: 'flag.b07_t4_hecho', text: 'Nos llega desde Galar que en Pueblo Crampón, el que tiene techo, el líder Nerio dio un concierto en la calle sin amplificador y el pueblo entero salió en pijama a escucharlo. Dicen que una canción era nueva. Aquí, cuando alguien canta así, apagamos la radio un rato.' },
		{ id: 'rl_b07_lola_carrito', kind: 'noticia', cond: 'flag.b07_lola_vuelve', text: 'Una nota de color: en Johto ha vuelto a salir un carrito de bollos al vapor que llevaba una semana cerrado. La dueña regala el primero de cada tanda al primero que pase con cara de hambre. Nos dicen que no da explicaciones. Ni hace falta.' },
	],
};
