// Bloque 5 · Tramo 2: «Paraíso Æther» (~3 h).
// Barco de la Fundación desde Kantai → llegada (Zyra, Gladio, Rouxel de RR. PP.) → zona de conservación (las jaulas
// de Noa, Francine y los Skull, invernadero) → laboratorios (Fabio y Calder con Leilani, Kaori, Xero) → clínica
// (Camille, Bastien) → la puerta del archivo (el escáner) → el armario de Fabio (cerradura, el informe) → jefe Fabio
// → Código Cero y el barco a Poni (Magda, Ysolde). Zona de pruebas de Zyra (entrenamiento, tope 60, premio).
// Empieza cuando T1 activa b05_aether_invitacion. Termina con b05_t2_hecho (y b05_poni: barco a Isla Poni).

// ---------- Condiciones reutilizadas ----------
const LUC = '(inParty("riolu") || inParty("lucario"))';
const PLUMA = '(flag.b03_vencejo_pluma || flag.b04_vencejo_pluma)';
const LEAL = 'flag.b01_bastien_cubierto';
const CERO = '(owns("typenull") || owns("silvally"))';
const ARCHIVO_LISTO = 'flag.b05_jaulas_vistas && flag.b05_fabio_visto';
const DENTRO = 'flag.b05_aether_llegada';
const SKULL_OFERTA = 'flag.b03_rocket_libres && flag.b05_francine_vista && !flag.b05_skull_taller';

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== PARAÍSO ÆTHER (cubierta principal) ===================
		paraiso_aether: {
			name: 'Paraíso Æther', short: 'Æther', region: 'alola', kind: 'area', map: { x: 86, y: 40 },
			bg: { type: 'plaza', ground: '#e9eef2', far: '#5aa8d8', roofs: ['#e9e8e0', '#c9ced8', '#a8d0e8'] },
			desc: 'Una isla que no es una isla: una plataforma blanca, enorme y perfecta, clavada en el mar entre Akala y Poni. Suelo de baldosas que brillan, cristal por todas partes, jardines geométricos con las flores en filas exactas. No hay una hoja en el suelo. No hay una gaviota.\n\nDesde los altavoces, cada pocos minutos, una voz amable recuerda a los visitantes lo felices que son.',
			descNight: 'De noche, el Paraíso Æther se ilumina desde abajo: el suelo entero brilla en blanco azulado y la plataforma parece flotar sobre el agua negra. Los altavoces siguen hablando, más bajito. Nadie los escucha. Siguen igual.',
			descs: [
				{ cond: 'flag.b05_fabio_vencido', text: 'La plataforma blanca del Paraíso Æther, con sus jardines en filas y su cristal por todas partes.\n\nAlgo ha cambiado, aunque las baldosas brillen igual: los empleados hablan más alto, alguien ha dejado una flor torcida en un parterre y nadie la ha enderezado. Los altavoces, por primera vez, están callados.' },
			],
			mapNote: 'Fundación Æther · conservación · laboratorios · clínica · zona de pruebas (tope 60)',
			onEnter: [{ script: 'b05_aether_llegada', cond: '!flag.b05_aether_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon de la Fundación', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de la Fundación', sub: 'Todo blanco. Hasta las Poké Balls parecen más limpias', action: { shop: 'tienda_kantai' } },
				{ label: 'Gladio', sub: 'Apoyado en la barandilla, con la capucha puesta', icon: '🧥', cond: DENTRO, talk: [
					{ cond: 'flag.b05_t2_hecho', script: 'b05_gladio_despues' },
					{ script: 'b05_gladio_espera' },
				] },
				{ label: 'Relaciones Públicas', sub: 'Un mostrador con una planta muy grande', icon: '🪴', cond: DENTRO, new: '!flag.b05_rouxel_charla', talk: [
					{ cond: '!flag.b05_rouxel_charla', script: 'b05_rouxel_charla' },
					{ script: 'b05_rouxel_despues' },
				] },
				{ label: 'Zona de conservación', sub: 'La cubierta de abajo. Huele a tierra mojada', icon: '🌿', cond: DENTRO, new: 'true', action: { go: 'aether_conservacion' } },
				{ label: 'Laboratorios', sub: 'Un ascensor de cristal que baja al fondo de la plataforma', icon: '🔬', cond: DENTRO, new: 'true', action: { go: 'aether_lab' } },
				{ label: 'Clínica de la Fundación', sub: 'Puertas de cristal esmerilado con una cruz verde', icon: '🏥', cond: DENTRO, new: 'true', action: { go: 'aether_clinica' } },
				{ label: 'Zona de pruebas', sub: 'Zona de entrenamiento (nivel recomendado 60)', icon: '🥋', cond: DENTRO, new: 'true', action: { go: 'aether_pruebas' } },
				{ label: 'La puerta del archivo', sub: 'Gladio te espera delante', icon: '🚪', cond: ARCHIVO_LISTO + ' && !flag.b05_escaner', new: 'true', talk: [{ script: 'b05_escaner' }] },
				{ label: 'Una puerta con escáner', sub: 'Pone «ARCHIVO · Solo personal autorizado»', icon: '🚪', cond: DENTRO + ' && !(' + ARCHIVO_LISTO + ') && !flag.b05_escaner', talk: [{ script: 'b05_archivo_cerrado' }] },
				{ label: 'Archivo', sub: 'Una puerta que ya te conoce', icon: '🗄️', cond: 'flag.b05_escaner', new: 'true', action: { go: 'aether_archivo' } },
				{ label: 'Un señor en la barandilla', sub: 'Cárdigan gris. Mira el mar', icon: '🍬', cond: 'flag.b05_escaner && !flag.b05_ansel_aether', new: 'true', talk: [{ script: 'b05_ansel_aether' }] },
				{ label: 'Rotom: ¿qué me queda en Æther?', sub: 'Repasa lo pendiente', icon: '📱', cond: DENTRO + ' && !flag.b05_t2_hecho', talk: [{ script: 'b05_aether_pendiente' }] },
				{ label: 'Volver a Kantai', sub: 'El barco blanco que no hace ruido', icon: '🛥️', action: { go: 'kantai' } },
				{ label: '🛥️ Barco a Isla Poni', sub: 'El barco de la Fundación, con permiso de Gladio', icon: '🛥️', cond: 'flag.b05_poni', new: '!visited("aldea_marina")', action: { go: 'aldea_marina' } },
			],
			rumors: [
				{ text: 'Dicen que en el Paraíso Æther nunca ha caído una hoja al suelo. Que hay un empleado cuyo trabajo es atraparlas antes. Que lleva once años y no ha fallado ni una.' },
				{ text: 'Los altavoces de Æther preguntan cosas todo el rato: «¿quiere usted…?». Los empleados dicen que llega un día en que contestas que sí sin darte cuenta.' },
				{ text: 'La presidenta de la Fundación se fue «de viaje» hace tiempo. Su hijo lleva el despacho. Dicen que no ha cambiado ni una silla. Dicen que no se sienta en la suya.' },
				{ cond: 'flag.b05_fabio_vencido', text: 'Dicen que el jefe de la Rama Científica ha pedido unas vacaciones. Muy largas. Que se las ha pedido el presidente por él.' },
			],
		},

		// =================== ZONA DE CONSERVACIÓN ===================
		aether_conservacion: {
			name: 'Zona de conservación', parent: 'paraiso_aether', kind: 'area',
			bg: { type: 'forest', ground: '#5a8a5a', far: '#8ac0d8' },
			desc: 'La cubierta de abajo: un jardín enorme bajo un techo de cristal, con estanques, árboles jóvenes y Pokémon que la Fundación ha rescatado de todo Alola. Algunos se acercan a mirarte. Otros, los que llegaron hace poco, no se acercan a nada.\n\nAl fondo, detrás de una valla blanca con un cartel de «Cuarentena», hay una fila de jaulas. Delante, unos guardias con gorra negra y cara de aburrimiento.',
			descNight: 'De noche, la zona de conservación se queda en penumbra azul. Los estanques brillan un poco. Detrás de la valla de cuarentena, alguna jaula tiene una luz encendida, pequeña, como la de un aparato que nadie ha apagado.',
			descs: [
				{ cond: 'flag.b05_fabio_vencido', text: 'La cubierta de abajo: estanques, árboles jóvenes y Pokémon rescatados. La valla de cuarentena está abierta de par en par. Las jaulas están vacías y con la puerta abierta. En una, alguien ha dejado una manta doblada.\n\nLos que estaban dentro andan sueltos por el jardín, sin etiqueta. Todavía no se acercan a nadie. Ya se acercarán.' },
			],
			mapNote: 'Pokémon rescatados · las jaulas · invernadero',
			spots: [
				{ label: 'Las jaulas de cuarentena', sub: 'Detrás de la valla blanca', icon: '🔒', cond: '!flag.b05_jaulas_vistas', new: 'true', talk: [{ script: 'b05_jaulas' }] },
				{ label: 'La jaula del fondo', sub: 'Tiene la etiqueta del revés', icon: '🔒', cond: 'flag.b05_jaulas_vistas && !flag.b05_nota_noa', new: 'true', talk: [{ script: 'b05_jaula_noa' }] },
				{ label: 'Las jaulas de cuarentena', sub: 'Etiquetas escritas a mano', icon: '🔒', cond: 'flag.b05_nota_noa', talk: [{ script: 'b05_jaulas_despues' }] },
				{ label: 'Una mujer con el pelo bicolor', sub: 'Sentada en la valla, mirando a sus guardias', icon: '💀', cond: '!flag.b05_francine_vista', new: 'true', talk: [{ script: 'b05_francine' }] },
				{ label: 'Francine', sub: 'Jefa de la seguridad contratada', icon: '💀', cond: 'flag.b05_francine_vista', new: '!beat("francine_1") || (' + SKULL_OFERTA + ')', talk: [
					{ cond: '!beat("francine_1")', script: 'b05_francine_reto' },
					{ cond: SKULL_OFERTA, script: 'b05_francine_oferta' },
					{ script: 'b05_francine_despues' },
				] },
				{ label: 'Recluta Skull de guardia', sub: 'Hace girar una porra de juguete', icon: '🧢', action: { trainer: 'aether_skull_1' } },
				{ label: 'El invernadero', sub: 'Árboles de bayas bajo el cristal', icon: '🧺', new: '!flag.rec_b05_aether_invernadero', action: { gather: 'b05_aether_invernadero' } },
				{ label: 'Pasear entre los rescatados', sub: 'Hierba alta y sombras entre los árboles', icon: '🌿', action: { explore: 'grass' } },
				{ label: 'Asomarse al estanque', sub: 'Agua de mar filtrada, muy clara', icon: '🎣', action: { explore: 'water' } },
			],
			encounters: {
				grass: [
					{ sp: 'sableye', lv: [55, 57], w: 14, time: 'night' },
					{ sp: 'comfey', lv: [55, 57], w: 12, time: 'day' },
					{ sp: 'haunter', lv: [55, 57], w: 12, time: 'night' },
					{ sp: 'mimikyu', lv: [55, 57], w: 12 },
					{ sp: 'audino', lv: [55, 57], w: 10 },
					{ sp: 'trevenant', lv: [56, 58], w: 8 },
					{ sp: 'golbat', lv: [55, 57], w: 8, time: 'night' },
					{ sp: 'grumpig', lv: [56, 58], w: 6, displaced: true },
					{ sp: 'drapion', lv: [56, 58], w: 6, displaced: true },
					{ sp: 'heliolisk', lv: [56, 58], w: 5, displaced: true },
					{ sp: 'drampa', lv: [57, 59], w: 3 },
				],
				water: [
					{ sp: 'alomomola', lv: [55, 57], w: 18 },
					{ sp: 'bruxish', lv: [55, 57], w: 16 },
					{ sp: 'lumineon', lv: [55, 57], w: 14 },
					{ sp: 'mantine', lv: [56, 58], w: 10 },
					{ sp: 'huntail', lv: [56, 58], w: 6 },
					{ sp: 'gorebyss', lv: [56, 58], w: 6 },
					{ sp: 'corsola', lv: [55, 57], w: 6 },
					{ sp: 'lanturn', lv: [56, 58], w: 4, displaced: true },
				],
			},
			rumors: [
				{ text: 'Los Pokémon de la cuarentena no comen lo que les dan. Los cuidadores dicen que es por el viaje. Los cuidadores no saben de dónde viene el viaje.' },
				{ text: 'En la conservación hay un Mimikyu que se esconde siempre detrás del mismo árbol. Si lo miras, se tapa más. Si no lo miras, te sigue.' },
			],
		},

		// =================== LABORATORIOS ===================
		aether_lab: {
			name: 'Laboratorios de Æther', parent: 'paraiso_aether', kind: 'building',
			bg: { type: 'lab', wall: '#e9eef2', floor: '#b8c8d8' },
			desc: 'Un pasillo blanco, larguísimo, con puertas de cristal a los dos lados. Detrás de cada una, gente con bata hace cosas con mucho cuidado. Todo zumba un poco. Hace frío, ese frío limpio que solo hay en los sitios caros.\n\nAl fondo, una sala con una pantalla enorme: un mapa de **Isla Poni** con un punto que parpadea en el sur.',
			descNight: 'De noche, en los laboratorios solo quedan encendidas las pantallas. El punto del mapa de Poni sigue parpadeando, solo, en la sala vacía.',
			descs: [
				{ cond: 'flag.b05_fabio_vencido', text: 'El pasillo blanco de los laboratorios. La puerta del despacho del fondo está abierta y la sala, a medio vaciar: cajas de cartón, una bata colgada de una silla y un Alakazam de peluche boca abajo en una estantería.\n\nLa pantalla grande sigue encendida. El punto del sur de Poni sigue parpadeando.' },
			],
			mapNote: 'Rama Científica · Toxicología · la pantalla grande',
			spots: [
				{ label: 'La sala de la pantalla grande', sub: 'Se oyen voces. Una de ellas es muy alta', icon: '🖥️', cond: '!flag.b05_fabio_visto', new: 'true', talk: [{ script: 'b05_lab_fabio' }] },
				{ label: 'La pantalla grande', sub: 'Un punto parpadea en el sur de Poni', icon: '🖥️', cond: 'flag.b05_fabio_visto', talk: [{ script: 'b05_lab_pantalla' }] },
				{ label: 'Laboratorio 3 · Toxicología', sub: 'Alguien ha pegado un cartel: «NO TOCAR. NI MIRAR»', icon: '🧪', new: '!flag.b05_kaori_aether', talk: [
					{ cond: '!flag.b05_kaori_aether', script: 'b05_kaori_aether' },
					{ script: 'b05_kaori_despues' },
				] },
				{ label: 'Un técnico con bata manchada', sub: 'Atornilla cajas metálicas. Se ríe solo', icon: '🔧', new: '!flag.b05_xero_aether', talk: [
					{ cond: '!flag.b05_xero_aether', script: 'b05_xero_aether' },
					{ script: 'b05_xero_despues' },
				] },
				{ label: 'Una mesa con un telescopio plegado', sub: 'Encima, una taza fría y unas gafas de repuesto', icon: '🔭', cond: 'flag.b05_fabio_visto', talk: [{ script: 'b05_lab_mesa' }] },
			],
			rumors: [
				{ text: 'En los laboratorios de Æther hay una sala que no sale en los planos. Los técnicos la llaman «la sala del casco». Nadie quiere limpiarla.' },
			],
		},

		// =================== CLÍNICA ===================
		aether_clinica: {
			name: 'Clínica de la Fundación', parent: 'paraiso_aether', kind: 'building',
			bg: { type: 'center', wall: '#e9f2ee', floor: '#c8d8d0' },
			desc: 'Una clínica pequeña y luminosa, con plantas de verdad y sillones que no parecen de hospital. Huele a desinfectante y a flores. En la sala de espera, una tele sin sonido pone un partido de voleibol.\n\nAl fondo, un pasillo con un cartel nuevo: «Unidad de Estudios de Vínculo».',
			descNight: 'De noche, la clínica está en silencio. La tele de la sala de espera sigue encendida, sin sonido, con un partido repetido. Alguien ha dejado un balón en un sillón.',
			mapNote: 'Enfermería · Unidad de Estudios de Vínculo',
			spots: [
				{ label: 'Mostrador de enfermería', sub: 'Curan Pokémon y personas, en ese orden', action: { center: true } },
				{ label: 'Una chica con rodilleras', sub: 'Hace toques con un balón en la sala de espera', icon: '🏐', new: '!flag.b05_camille_vista', talk: [
					{ cond: '!flag.b05_camille_vista', script: 'b05_camille' },
					{ script: 'b05_camille_despues' },
				] },
				{ label: 'Unidad de Estudios de Vínculo', sub: 'Se oye a alguien leer en voz alta', icon: '📄', new: '!flag.b05_bastien_aether', talk: [
					{ cond: '!flag.b05_bastien_aether', script: 'b05_bastien_aether' },
					{ cond: '!beat("bastien_6")', script: 'b05_bastien_revancha' },
					{ script: 'b05_bastien_despues' },
				] },
			],
		},

		// =================== ARCHIVO ===================
		aether_archivo: {
			name: 'Archivo de la Fundación', parent: 'paraiso_aether', kind: 'building',
			bg: { type: 'indoor', wall: '#3a4048', floor: '#2a2e34' },
			desc: 'Una sala estrecha, sin ventanas, con estanterías de metal hasta el techo y una luz blanca que zumba. Carpetas, cajas, discos duros con etiquetas. Todo ordenado por fechas. Todo menos un armario del fondo, con una cerradura de runas y una placa: «Rama Científica · Fabio».',
			descs: [
				{ cond: 'flag.b05_fabio_vencido', text: 'La sala estrecha de las estanterías de metal. El armario de Fabio está abierto y vacío; sus carpetas están apiladas en una mesa con un pósit de Gladio encima: «Todo. Copia. Hoy».\n\nLa luz sigue zumbando.' },
			],
			mapNote: 'El armario de la Rama Científica',
			spots: [
				{ label: 'El armario de Fabio', sub: 'Una cerradura de runas que se encienden en orden', icon: '🗄️', cond: '!flag.b05_informe', new: 'true', talk: [{ script: 'b05_armario' }] },
				{ label: 'Fabio', sub: 'Se arregla la bata. Muy ofendido', icon: '🥼', cond: 'flag.b05_fabio_archivo && !flag.b05_fabio_vencido', new: 'true', talk: [{ script: 'b05_fabio_combate' }] },
				{ label: 'Las estanterías', sub: 'Carpetas ordenadas por fechas', icon: '📚', cond: 'flag.b05_informe', talk: [{ script: 'b05_archivo_estantes' }] },
				{ label: 'El guardia de la puerta', sub: 'Gorra negra. Muy firme', icon: '🧢', talk: [{ script: 'b05_archivo_guardia' }] },
			],
		},

		// =================== ZONA DE PRUEBAS (ENTRENAMIENTO) ===================
		aether_pruebas: {
			name: 'Zona de pruebas de Æther', parent: 'paraiso_aether', kind: 'gym',
			bg: { type: 'gym', wall: '#e9eef2', floor: '#a8c8e0' },
			desc: 'Un campo de combate blanco, rodeado de gradas vacías y pantallas que miden cosas. Aquí la Fundación pone a prueba a los Pokémon que se recuperan antes de devolverlos a su hábitat: «para que salgan con ganas», dice un cartel.\n\nEn la grada, una mujer de bata con gafas redondas aplaude cada combate. Todos. También los que pierde el suyo.',
			mapNote: 'Entrenamiento (tope 60) · Zyra',
			spots: [
				{ label: 'El campo de pruebas', sub: 'Zona de entrenamiento (nivel recomendado 60)', icon: '🥋', action: { training: {
					cap: 60, prize: { wins: 3, script: 'b05_premio_pruebas' }, trainers: ['aether_pruebas_1', 'aether_pruebas_2', 'aether_pruebas_3'], npc: 'zyra', coach: 'Zyra',
					closed: 'Zyra mira tu equipo en la pantalla y se le empañan las gafas de la emoción. «¡Ay, pero si ya están estupendos! Aquí ya no aprenden nada, de verdad. Bueno, aprenden a aburrirse. Eso no se lo quiero enseñar».',
				} } },
				{ label: 'Zyra', sub: 'Aplaude desde la grada', icon: '👓', new: 'flag.b05_fin && (flag.b05_scizorita || flag.b05_gengarita) && !(flag.b05_scizorita && flag.b05_gengarita)', talk: [
					{ cond: 'flag.b05_fin && (flag.b05_scizorita || flag.b05_gengarita) && !(flag.b05_scizorita && flag.b05_gengarita)', script: 'b05_zyra_segunda' },
					{ cond: '!flag.b05_zyra_pruebas', script: 'b05_zyra_pruebas' },
					{ script: 'b05_zyra_despues' },
				] },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Jefe de trama -----
		fabio_1: { name: 'Fabio', cls: 'Jefe de la Rama Científica', npc: 'fabio', ai: 5, iv: 29, reward: 7800, bg: 'lab',
			gimmick: 'mega', ace: 'alakazam',
			team: [
				{ sp: 'hypno', lv: 57, moves: ['psychic', 'foulplay', 'thunderpunch', 'icepunch'], ability: 'insomnia', nature: 'calm', iv: 27 },
				{ sp: 'claydol', lv: 58, moves: ['earthpower', 'psychic', 'icebeam', 'reflect'], ability: 'levitate', nature: 'modest', iv: 28 },
				{ sp: 'bruxish', lv: 58, moves: ['psychicfangs', 'aquatail', 'crunch', 'icefang'], ability: 'strongjaw', nature: 'jolly', iv: 28 },
				{ sp: 'slowking', lv: 58, moves: ['psychic', 'scald', 'icebeam', 'slackoff'], ability: 'owntempo', item: 'sitrusberry', nature: 'modest', iv: 28 },
				{ sp: 'alakazam', lv: 60, moves: ['psychic', 'shadowball', 'dazzlinggleam', 'calmmind'], ability: 'magicguard', item: 'alakazite', nature: 'timid', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: '¡Fabio! ¡Jefe de la Rama Científica de la Fundación Æther! Recuérdalo, porque lo vas a contar muchas veces. ¡Hypno, que vea las estrellas!',
			win: 'Imposible. Mi Alakazam tiene un cociente intelectual de cinco mil. ¡Lo medí yo!',
			lose: 'Lo esperaba. Lo esperaba todo. Soy científico: espero cosas.' },

		// ----- Opcionales -----
		francine_1: { name: 'Francine', cls: 'Ex administradora Skull', npc: 'francine', ai: 4, iv: 27, reward: 4700, bg: 'forest',
			team: [
				{ sp: 'crobat', lv: 57, moves: ['crosspoison', 'bravebird', 'uturn', 'roost'], ability: 'innerfocus', nature: 'jolly', iv: 26 },
				{ sp: 'golisopod', lv: 57, moves: ['firstimpression', 'liquidation', 'leechlife', 'razorshell'], ability: 'emergencyexit', nature: 'adamant', iv: 26 },
				{ sp: 'toxapex', lv: 57, moves: ['scald', 'toxic', 'recover', 'venoshock'], ability: 'merciless', nature: 'bold', iv: 27 },
				{ sp: 'mukalola', lv: 58, moves: ['knockoff', 'poisonjab', 'icepunch', 'firepunch'], ability: 'poisontouch', nature: 'adamant', iv: 27 },
				{ sp: 'salazzle', lv: 59, moves: ['flamethrower', 'sludgebomb', 'dragonpulse', 'nastyplot'], ability: 'corrosion', item: 'blacksludge', nature: 'timid', iv: 29 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Bien. Que vean los chicos cómo se hace. Y que nadie grabe, que luego lo suben con musiquita.',
			win: 'Mereces lo que cobras. Ojalá cobraras.',
			lose: 'No te lo tomes a mal. A mí me ganaron muchas veces antes de saber perder.' },
		bastien_6: { name: 'Bastien', cls: 'Rival', npc: 'bastien', ai: 3, iv: 28, reward: 4000, bg: 'center',
			team: [
				{ sp: 'talonflame', lv: 57, moves: ['bravebird', 'flareblitz', 'uturn', 'roost'], ability: 'flamebody', nature: 'jolly', iv: 27 },
				{ sp: 'meowstic', lv: 57, moves: ['psychic', 'shadowball', 'lightscreen', 'reflect'], ability: 'prankster', nature: 'timid', iv: 27 },
				{ sp: 'pyroar', lv: 58, moves: ['flamethrower', 'hypervoice', 'darkpulse', 'willowisp'], ability: 'unnerve', nature: 'modest', iv: 28 },
				{ sp: 'aegislash', lv: 58, moves: ['kingsshield', 'shadowball', 'flashcannon', 'sacredsword'], ability: 'stancechange', nature: 'quiet', iv: 28 },
				{ sp: 'greninja', lv: 60, moves: ['hydropump', 'darkpulse', 'icebeam', 'extrasensory'], ability: 'torrent', item: 'sitrusberry', nature: 'timid', iv: 29 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Página nueva: «Cosas que hago porque quiero». Primera línea: esto.',
			win: 'Lo apunto. Con mi letra. En mi libreta.',
			lose: 'Greninja dice que ha estado bien. Bueno, no lo dice. Pero lo dice.' },
		aether_skull_1: { name: 'Kekoa', cls: 'Recluta Skull', ai: 2, npc: 'recluta_skull', bg: 'forest',
			team: [
				{ sp: 'gumshoos', lv: 57, moves: ['crunch', 'superfang', 'earthquake', 'firefang'] },
				{ sp: 'salazzle', lv: 57, moves: ['flamethrower', 'venoshock', 'dragonpulse', 'flamecharge'] },
			],
			intro: '¡Yo, yo! Seguridad privada, ¿eh? ¡Con contrato! ¡Con uniforme! Bueno, el uniforme es el mío de siempre, pero ahora me pagan por llevarlo.',
			win: '¡Yo…! Bueno. Esto no sale en mi evaluación, ¿eh? ¿Eh?' },

		// ----- Zona de pruebas (entrenamiento) -----
		aether_pruebas_1: { name: 'Keoni', cls: 'Empleado de Æther', ai: 3, npc: 'empleado_aether', bg: 'gym',
			team: [
				{ sp: 'porygon2', lv: 58, moves: ['triattack', 'icebeam', 'thunderbolt', 'recover'] },
				{ sp: 'magnezone', lv: 59, moves: ['flashcannon', 'thunderbolt', 'voltswitch', 'mirrorcoat'] },
			],
			intro: 'Protocolo de prueba número cuarenta y dos. Sujeto: usted. Objetivo: que mis Pokémon salgan de aquí con ganas. Comenzamos.',
			win: 'Protocolo completado. Resultado: yo he salido sin ganas.' },
		aether_pruebas_2: { name: 'Alana', cls: 'Investigadora de Æther', ai: 3, bg: 'gym',
			team: [
				{ sp: 'vikavolt', lv: 59, moves: ['bugbuzz', 'thunderbolt', 'energyball', 'airslash'] },
				{ sp: 'klefki', lv: 58, moves: ['playrough', 'flashcannon', 'thunderwave', 'spikes'] },
			],
			intro: 'Estudio cómo se recuperan los Pokémon después de un susto. Lo mejor es un combate limpio. Lo peor es un formulario. ¡Combate!',
			win: 'Recuperación completa. Del susto, no de la derrota.',
			look: { hair: 'bun', hairColor: '#2a2420', outfit: '#e9e8e0', outfit2: '#8ab0c8', skin: 3, eyesStyle: 'happy', mouth: 'smile', acc: 'glasses' } },
		aether_pruebas_3: { name: 'Makoa', cls: 'Guardia de Æther', ai: 3, bg: 'gym',
			team: [
				{ sp: 'bewear', lv: 59, moves: ['hammerarm', 'doubleedge', 'payback', 'shadowclaw'] },
				{ sp: 'metagross', lv: 60, moves: ['meteormash', 'zenheadbutt', 'bulletpunch', 'earthquake'] },
			],
			intro: 'Antes vigilaba la puerta de la cuarentena. Ahora la vigilan unos de gorra negra, y a mí me han mandado aquí. Me han dicho que es un ascenso. No me lo creo. ¡Pero combato igual!',
			win: 'Un ascenso. Ya. Seguro.',
			look: { hair: 'short', hairColor: '#3a2a1e', outfit: '#e9e8e0', outfit2: '#3a4a6a', skin: 4, eyesStyle: 'sharp', mouth: 'flat', acc: 'cap', capColor: '#e9e8e0' } },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LLEGADA ===================
		b05_aether_llegada: [
			{ set: { 'flag.b05_aether_llegada': true } },
			{ cutscene: { time: 'dia', bg: { type: 'plaza', ground: '#e9eef2', far: '#5aa8d8', roofs: ['#e9e8e0', '#c9ced8', '#a8d0e8'] }, start: 'dark', frames: [
				{ big: true, text: 'Paraíso Æther', sub: 'Fundación Æther · Alola', hold: 2400, cam: 'still' },
				{ cam: 'pull', fx: 'light', text: 'El barco atraca sin un ruido. Delante, una plataforma blanca del tamaño de un pueblo, con cristal por todas partes y jardines con las flores en filas exactas. No hay ni una hoja en el suelo.' },
				{ cam: 'pan-up', text: 'Desde los altavoces, una voz amable: «Bienvenido al Paraíso Æther. ¿Quiere usted un refresco? ¿Quiere usted una visita guiada? ¿Quiere usted ser feliz?».' },
				{ actors: [{ id: 'zyra', at: 'left', enter: 'left', do: 'hop', emote: 'heart' }], cam: 'push', text: 'Por el muelle llega una mujer con bata y gafas redondas, casi corriendo, con una carpeta apretada contra el pecho.' },
				{ actors: [{ id: 'gladio', at: 'right', enter: 'fade', dim: true }], cam: 'pan-up', text: 'Arriba, en un balcón de cristal, un chico con la capucha puesta mira hacia abajo. No saluda. Se da la vuelta y se va.' },
			] } },
			{ say: 'zyra', text: '¡{jugador}! ¡Ha venido! ¡Ay, qué bien, qué bien! Soy Zyra, la subdirectora. La de la carta. —Se ajusta las gafas—. Perdone el lacre. Es de mi colección. No tenemos lacre oficial. Nadie escribe cartas ya.' },
			{ say: 'zyra', text: 'El Presidente en funciones le espera. Bueno, «espera» es mucho decir. Lleva tres días dando vueltas por la barandilla. Hoy ha dado once. Las he contado.' },
			{ if: LUC, then: [
				{ text: '{riolu} mira los altavoces del muelle con las orejas tiesas. Cada vez que la voz pregunta algo, gira la cabeza hacia el que suena, como si esperara que se callara.' },
				{ say: 'zyra', text: 'A su Lucario no le gusta la megafonía. —Baja la voz—. A mí tampoco. No se lo diga a nadie.' },
			] },
			{ text: 'Zyra te lleva por una pasarela de cristal hasta la barandilla del lado del mar. Allí, de espaldas, con las manos en los bolsillos de la sudadera, está el chico del balcón.' },
			{ say: 'gladio', text: 'Has venido. —Se gira. Pelo claro, mirada de alguien que duerme poco. Te mira a ti y luego, más rato, a tu equipo—. Bien.' },
			{ say: 'gladio', text: 'Gladio. Presidente en funciones. —Lo dice como quien dice una enfermedad—. Mi madre está de viaje. Larguísimo. Yo heredé el despacho, la isla y una caja de contratos.' },
			{ say: 'gladio', text: 'No te he llamado por la Gira. Te he llamado porque no estás en ninguna nómina. Ni en la de Æther, ni en la de Lemnis. Eso, aquí, es rarísimo.' },
			{ choice: [
				{ text: '«¿Por qué yo?»', then: [
					{ say: 'gladio', text: 'Porque la Policía Internacional te dejó una tarjeta. Porque en Kanto pasó algo en una cueva y tu nombre sale en todos los papeles que no se publicaron. —Se encoge de hombros—. Y porque Zyra dice que eres de fiar. Zyra no se equivoca con la gente. Conmigo se equivoca, pero a favor.' },
				] },
				{ text: '«Cuenta conmigo. ¿Qué pasa?»', then: [
					{ say: 'gladio', text: 'Directo. Bien. —Algo que casi es una sonrisa, y que se le pasa enseguida—. Odio las visitas guiadas.' },
				] },
			] },
			{ say: 'gladio', text: 'Lemnis lleva doce años donando a la Fundación. Mi madre aceptaba todo lo que viniera con un lazo. Yo he leído las cajas. Hay dos cosas que no firmé yo.' },
			{ say: 'gladio', text: 'Una, una «cesión de datos de umbral». Nueve años de lecturas de ultraumbrales, vendidas. Firma: **Fabio**, jefe de la Rama Científica. Dos: la **zona de conservación**. Desde hace meses entran más Pokémon de los que vuelven a casa. Fabio lo llama «almacén de tránsito».' },
			{ say: 'gladio', text: 'Mira la conservación. Mira los laboratorios: Fabio tiene visita hoy, y no me han dicho quién. Y luego búscame en la **puerta del archivo**. Mi tarjeta ya no abre ese archivo. Alguien me cambió los permisos. En mi propia casa.' },
			{ say: 'zyra', text: 'Y si necesita entrenar, ¡la **zona de pruebas** es suya! Yo estoy siempre allí. Bueno, casi siempre. Cuando no estoy aquí. —Mira a Gladio—. O detrás de él.' },
			{ quest: 'b05_m4', stage: 'dentro' },
			{ text: 'Mientras Gladio se aleja por la pasarela, la Pokédex vibra dos veces seguidas. Dos mensajes.' },
			{ say: 'kaori', as: 'Kaori (mensaje)', text: 'Estoy en Æther. Laboratorio 3. Toxicología. Han encontrado algo que conozco en su farmacia. Ven cuando puedas. No es una invitación. Es información.' },
			{ quest: 'b05_t_kaori', stage: 'aether' },
			{ if: LEAL, then: [
				{ say: 'bastien', as: 'Bastien (mensaje)', text: '¡{jugador}! Estoy en Æther. Me han traído «en virtud de la cláusula 14.4». Hay una 14.4. Claro que hay una 14.4. Estoy en la clínica. ¿La leemos juntos? Tú pones cara de entenderla.' },
			], else: [
				{ say: 'bastien', as: 'Bastien (mensaje)', text: 'Estoy en Æther. Por contrato. No vengas. …Bueno. Si vienes, estoy en la clínica. Pero no vengas.' },
			] },
			{ quest: 'b05_t_bastien', stage: 'aether' },
			{ say: 'rotom', text: '¡Bzzt! ¡Qué isla tan limpia! ¡Ni una mota! Me dan ganas de mancharla un poquito. No lo voy a hacer. Pero me dan ganas.' },
			{ diary: 'Hoy mi entrenador{|a|e} ha llegado al Paraíso Æther. ¡Es una isla de mentira hecha de baldosas! Todo es blanco y brilla, y los altavoces te preguntan si quieres ser feliz. Yo he dicho que sí. Nadie me ha contestado. La subdirectora, Zyra, es amabilísima y cuenta las vueltas que da el presidente. El presidente se llama Gladio y no sonríe. Bueno, casi una vez.', cond: 'flag.b01_diario' },
			{ intel: { npc: 'gladio', text: 'Presidente en funciones de Æther (su madre está «de viaje»). Te llamó porque no estás en ninguna nómina. Hay dos cosas que no firmó: la venta de nueve años de datos de ultraumbrales (firma: Fabio) y la conservación como «almacén de tránsito». Alguien le cambió los permisos del archivo.' } },
		],
		b05_gladio_espera: [
			{ if: ARCHIVO_LISTO, then: [
				{ say: 'gladio', text: 'La puerta del archivo. Ahora. —Ya está andando—. Antes de que alguien me cambie también la cerradura del baño.' },
			], else: [
				{ say: 'gladio', text: 'La conservación y los laboratorios. —No se gira—. Mira con tus ojos. Y con los de tu Lucario, si quiere. Los míos ya están cansados de esta isla.' },
				{ if: 'flag.b05_jaulas_vistas', then: [
					{ say: 'gladio', text: 'Has visto las jaulas. —Aprieta la barandilla—. Ya. Falta el laboratorio. Fabio tiene visita.' },
				] },
				{ if: 'flag.b05_fabio_visto', then: [
					{ say: 'gladio', text: 'Calder Wynn. Lemnis. —Lo apunta en una libreta pequeña—. Falta la conservación. Baja. Mira las etiquetas.' },
				] },
			] },
		],
		b05_gladio_despues: [
			{ say: 'gladio', text: 'Las jaulas están abiertas. Los papeles, copiados. Fabio, de vacaciones. —Mira el mar hacia el sur—. Y yo sigo en una isla que no es mía, arreglando cosas que no rompí.' },
			{ say: 'gladio', text: 'No me des las gracias. Ve a Poni. Y vuelve. Mi Silvally quiere conocer a tu Lucario como es debido. Sin nadie mirando.', cond: LUC },
			{ say: 'gladio', text: 'No me des las gracias. Ve a Poni. Y vuelve.', cond: '!(' + LUC + ')' },
		],

		// =================== ROUXEL (RR. PP.) ===================
		b05_rouxel_charla: [
			{ set: { 'flag.b05_rouxel_charla': true } },
			{ text: 'Detrás de un mostrador blanco con un cartel que dice «RELACIONES PÚBLICAS», hay una planta enorme. Muy bien cuidada. Detrás de la planta, un hombre con traje gris y una sonrisa de anuncio que se enciende al verte. Luego se apaga un poco.' },
			{ say: 'rouxel', text: 'Bienvenid{o|a|e} al Paraíso Æther, donde cada Pokémon encuentra su lugar y cada visitante encuentra… —Se detiene a mitad—. Perdón. Me lo sé de memoria. Ya no me lo creo, pero me lo sé.' },
			{ say: 'rouxel', text: 'Fabien Rouxel. Antes, director de Lemnis Kalos. Ahora, Relaciones Públicas de una fundación que recibe donativos de Lemnis. —Se ríe sin ruido—. Es lo que en mi oficio llamamos «un movimiento lateral». En el de los demás se llama de otra manera.' },
			{ text: 'La planta es la misma que se llevó en una caja de cartón el día que lo echaron. Ha crecido el doble. Es lo único de él que ha crecido.' },
			{ if: 'has("tarjetarouxel")', then: [
				{ say: 'rouxel', text: '¿Todavía tienes mi tarjeta? —Por primera vez, la sonrisa es de verdad—. No la uses aquí. Aquí las paredes son de cristal. Pero escucha, gratis, como la otra vez.' },
			] },
			{ say: 'rouxel', text: 'Fabio firma. Fabio firma muchísimo; le encanta su firma, la practica en las servilletas. Pero firmar es lo de menos. Mira quién manda las cajas. Mira quién viene a verlo y no sale en la agenda.' },
			{ say: 'rouxel', text: 'Ya te lo dije en Luminalia: no mires la boca. Mira las manos. Aquí todo el mundo sonríe muchísimo.' },
			{ intel: { npc: 'rouxel', text: 'Trabaja de Relaciones Públicas en Æther («movimiento lateral»). Te avisó de que Fabio firma, pero que hay que mirar «quién manda las cajas» y quién lo visita sin salir en la agenda.' } },
		],
		b05_rouxel_despues: [
			{ if: 'flag.b05_fabio_vencido', then: [
				{ say: 'rouxel', text: 'He tenido que redactar el comunicado de las «vacaciones» de Fabio. Tres párrafos, ninguna mentira, ninguna verdad. Es lo mejor que he escrito en años. Me da un poco de vergüenza.' },
			], else: [
				{ say: 'rouxel', text: '¿Quiere usted una visita guiada? —Sonríe—. Es broma. La megafonía me lo ha pegado. Ve. Yo riego la planta.' },
			] },
		],

		// =================== LA PUERTA DEL ARCHIVO ===================
		b05_archivo_cerrado: [
			{ text: 'Una puerta blanca sin pomo. A un lado, un escáner con una luz roja y un letrero: «ARCHIVO · Solo personal autorizado». Un recluta de gorra negra la vigila, mascando chicle.' },
			{ say: 'recluta_skull', text: '¡Yo! Aquí no se pasa, ¿eh? Órdenes. No sé de quién, pero órdenes.' },
			{ say: 'rotom', text: 'Gladio dijo que lo buscáramos aquí después de mirar la **conservación** y los **laboratorios**. ¡Bzzt! Primero eso.' },
		],
		b05_escaner: [
			{ text: 'Gladio está delante de la puerta del archivo, con una tarjeta blanca en la mano. Te ve llegar y no dice nada. Pasa la tarjeta por el escáner.' },
			{ text: 'Pitido. Luz roja. En la pantallita: «ACCESO DENEGADO · Presidencia (en funciones)».' },
			{ say: 'gladio', text: '…Ni la presidencia. —Vuelve a pasarla. Rojo otra vez—. Lo sabía. Quería verlo.' },
			{ text: 'El escáner emite un zumbido nuevo. Una franja de luz azul baja despacio por la puerta, sale de la pantalla y te recorre a ti, de arriba abajo. Se detiene en el bolsillo donde llevas la Pokédex.' },
			{ text: 'Pitido. Luz verde. En la pantallita, en letra pequeña y limpia: «**Dispositivo de Dirección · Lemnis · acceso total**».' },
			{ text: 'La puerta se abre con un suspiro de aire. El recluta de gorra negra se pone firme de golpe, tanto que se le cae el chicle.' },
			{ say: 'recluta_skull', text: '¡Señor! ¡Señora! ¡Lo que sea! ¡Adelante, adelante!' },
			{ say: 'rotom', text: '¡Bzzt! ¡Me han abierto a mí! ¿Lo vieron? ¡Será que soy famoso!' },
			{ text: 'Gladio te mira. Uno. Dos. Un segundo de más. Otro. No dice nada. Saca una libreta pequeña del bolsillo de la sudadera, apunta algo y la guarda.' },
			{ say: 'gladio', text: 'Vamos. Antes de que se arrepienta.' },
			{ set: { 'flag.b05_escaner': true } },
			{ go: 'aether_archivo' },
		],

		// =================== ANSEL ===================
		b05_ansel_aether: [
			{ set: { 'flag.b05_ansel_aether': true } },
			{ text: 'Al salir del ascensor, alguien te toca el hombro con mucha suavidad. Un señor mayor, de cárdigan gris, gafas de media luna y corbata azul, con un vaso de agua en la mano. Huele a menta.' },
			{ say: 'ansel', text: '¡{jugador}! ¡Qué casualidad tan bonita! Estoy en Alola de visita técnica. Æther tiene unos condensadores preciosos. Preciosos. Me han dejado verlos de lejos, como a un sobrino que rompe cosas.' },
			{ say: 'ansel', text: 'Te veo con el chico, con Gladio. Es buen muchacho. —Mira hacia la barandilla, donde Gladio no está—. Los hijos que heredan una casa con goteras siempre creen que la lluvia es culpa suya. Y se pasan la vida con un cubo. Ojalá alguien le diga que puede soltarlo.' },
			{ say: 'ansel', text: 'Toma. Para el barco. El mar de Alola es muy bonito y muy movido.' },
			{ text: 'Te pone en la mano un caramelo de menta envuelto en papel azul, retorcido por las dos puntas.' },
			{ text: 'Le ofrece otro a {riolu}. {riolu} no lo mira. Mira a Ansel. Muy quieto. Ansel se ríe bajito y se lo guarda en el bolsillo.', cond: LUC },
			{ say: 'ansel', text: 'Sigue sin gustarle la menta. Es un Lucario con principios.', cond: LUC },
			{ say: 'ansel', text: '—Una palmadita en tu brazo—. Cuídate mucho, ¿eh? Las islas pequeñas guardan secretos grandes. Y las de mentira, más.' },
			{ text: 'Se aleja hacia el muelle, saludando a los empleados por su nombre. Todos le devuelven el saludo. Todos sonríen.' },
			{ say: 'rotom', text: '¡Qué señor tan amable! Siempre aparece justo cuando estamos. ¡Qué suerte tenemos!' },
		],

		// =================== ROTOM: PENDIENTES ===================
		b05_aether_pendiente: [
			{ say: 'rotom', text: '¡Bzzt! Repaso, repaso:' },
			{ say: 'rotom', text: '• Gladio quiere que miremos la **zona de conservación** (la cubierta de abajo).', cond: '!flag.b05_jaulas_vistas' },
			{ say: 'rotom', text: '• Y los **laboratorios**: Fabio tiene visita.', cond: '!flag.b05_fabio_visto' },
			{ say: 'rotom', text: '• Gladio nos espera en la **puerta del archivo**.', cond: ARCHIVO_LISTO + ' && !flag.b05_escaner' },
			{ say: 'rotom', text: '• El **archivo** está abierto. Hay un armario con una cerradura rarísima.', cond: 'flag.b05_escaner && !flag.b05_informe' },
			{ say: 'rotom', text: '• **Fabio** está en el archivo. Muy ofendido. Hay que ganarle.', cond: 'flag.b05_fabio_archivo && !flag.b05_fabio_vencido' },
			{ say: 'rotom', text: '• Una jaula del fondo de la **conservación** tiene la etiqueta del revés.', cond: 'flag.b05_jaulas_vistas && !flag.b05_nota_noa' },
			{ say: 'rotom', text: 'Y si te apetece: **Kaori** en el laboratorio 3, **Bastien** en la clínica y la **zona de pruebas** de Zyra.', cond: '!flag.b05_kaori_aether || !flag.b05_bastien_aether' },
		],

		// =================== CONSERVACIÓN: LAS JAULAS (NOA) ===================
		b05_jaulas: [
			{ set: { 'flag.b05_jaulas_vistas': true } },
			{ text: 'Detrás de la valla de cuarentena hay doce jaulas en fila. Son blancas, limpias, con un bebedero automático y una mantita. Parecen cómodas. Eso es lo peor.' },
			{ text: 'Dentro de algunas duermen Pokémon que no son de Alola: un Ponyta con la crin casi apagada, un Pidgeotto que no abre los ojos, un Wooper encogido en una esquina. Ninguno se despierta al oírte. Ni siquiera se mueven.' },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca a la valla. Las orejas le tiemblan. El aura se le enciende sola, muy floja, y se apaga. Como cuando alguien intenta encender una cerilla mojada.' },
				{ happy: { who: 'riolu', n: 3 } },
			] },
			{ text: 'En cada jaula hay una etiqueta de cartón, escrita a mano. «Origen: Kanto. Lote 7. **Destino: emplazamiento 04**». La letra es redonda, cuidadosa, con las íes con un puntito muy gordo.' },
			{ text: 'Conoces esa letra. La has visto en etiquetas de jaulas en Kalos, en Johto, en Kanto. Siempre la misma.' },
			{ say: 'rotom', text: '¡Bzzt! Es la letra de Noa. —Bajito—. Noa siempre pone el puntito así de gordo. Dice que las íes se le escapan si no.' },
			{ say: 'recluta_skull', text: '¡Eh, eh! Atrás de la valla, ¿eh? Esto es cuarentena. —Se rasca la nuca—. Bueno, no sé de qué. Pero cuarentena.' },
			{ text: 'Al fondo de la fila hay una jaula vacía. Su etiqueta está colgada del revés.' },
			{ quest: 'b05_t_noa', stage: 'jaulas' },
		],
		b05_jaula_noa: [
			{ set: { 'flag.b05_nota_noa': true } },
			{ text: 'La jaula del fondo está vacía. La manta, doblada. Le das la vuelta a la etiqueta. Por detrás, con la misma letra, pone: «Debajo».' },
			{ if: LUC, then: [
				{ text: '{riolu} mete la pata por los barrotes y levanta la manta. Debajo, pegado con cinta al suelo de la jaula, hay un papel doblado muchas veces.' },
			], else: [
				{ text: 'Metes la mano por los barrotes y levantas la manta. Debajo, pegado con cinta al suelo de la jaula, hay un papel doblado muchas veces.' },
			] },
			{ give: 'notanoa04' },
			{ read: 'notanoa04' },
			{ text: 'Lo vuelves a doblar igual que estaba. No sabes por qué. Te parece que es lo que ella haría.' },
			{ say: 'rotom', text: 'Noa… —Una pausa larga, para Rotom—. «Ya sé contar». Yo también sé contar. Doce jaulas. Doce.' },
			{ quest: 'b05_t_noa', stage: 'hecha', done: true },
			{ intel: { npc: 'noa', text: 'Dejó una nota escondida en una jaula de la conservación de Æther: cuenta los desplazados que no volvieron (de Johto 31, a Kanto 24, aquí 19) y que la mandan con el siguiente envío. «Si un día no contesto, que alguien abra las jaulas. Esta vez lo digo en serio. Ya sé contar».' } },
		],
		b05_jaulas_despues: [
			{ if: 'flag.b05_fabio_vencido', then: [
				{ text: 'Las jaulas están abiertas y vacías. Las etiquetas siguen colgadas. Alguien ha tachado en todas «Destino: emplazamiento 04» y ha escrito encima, con rotulador gordo: «Destino: casa».' },
				{ text: 'Es la letra de Gladio. Es fea. Está muy bien.' },
			], else: [
				{ text: 'Doce jaulas blancas. Las etiquetas con la letra redonda de Noa. Los Pokémon de dentro siguen sin moverse. La cerradura de cada jaula tiene un teclado. Ninguno funciona sin el código de la Rama Científica.' },
			] },
		],

		// =================== CONSERVACIÓN: FRANCINE Y LOS SKULL ===================
		b05_francine: [
			{ set: { 'flag.b05_francine_vista': true } },
			{ text: 'Sentada en lo alto de la valla de cuarentena, con una pierna colgando, hay una mujer de pelo blanco con mechones rosas, recogido en lo alto. Chaqueta negra, labios oscuros y unos ojos amarillos que lo apuntan todo sin moverse.' },
			{ text: 'Abajo, tres reclutas de gorra negra hacen como que vigilan. Uno está dormido de pie.' },
			{ say: 'francine', text: 'Tú no eres de la Fundación. Andas mirando las jaulas como si fueran tuyas. —Baja de la valla de un salto—. Francine. Antes, Team Skull. Ahora, «Servicios de Seguridad Francine». Lo del nombre no fue idea mía. Fue de los chicos. Les gustó cómo sonaba.' },
			{ say: 'francine', text: 'Nos paga una fundación que no sale en ninguna parte. Factura con membrete blanco y una cosa azul en la esquina, un ocho tumbado. —Se encoge de hombros—. A nosotros nadie nos dio becas, ¿sabes? Ni prácticas. Ni una segunda carta. Nos dan esto, y esto aceptamos.' },
			{ say: 'francine', text: 'No me mires así. Los chicos no saben qué hay en las jaulas. Yo sí. Y no me gusta. Pero tampoco me gusta que mis chicos duerman en la calle.' },
			{ if: 'flag.b03_rocket_libres', then: [
				{ say: 'francine', text: 'Te conozco, por cierto. Los de Kanto hablan. Dicen que en un lago de Johto pillaste a una «familia» que trabajaba para quien pagaba. Y que no los entregaste. Que los dejaste ir.' },
				{ say: 'francine', text: '…Eso no lo hace casi nadie. Lo apunto.' },
			] },
			{ say: 'francine', text: 'Bueno. Si quieres medirte conmigo, aquí estoy. Los chicos se aburren. Les vendría bien ver un combate de verdad.' },
			{ call: 'b05_francine_combate' },
			{ if: 'flag.b03_rocket_libres', then: [{ call: 'b05_francine_oferta' }] },
		],
		b05_francine_reto: [
			{ say: 'francine', text: '¿Ahora sí? Los chicos ya han hecho apuestas. Dos contra ti, uno a favor. El del favor está dormido.' },
			{ call: 'b05_francine_combate' },
		],
		b05_francine_combate: [
			{ prompt: '¿Combatir con Francine? Es opcional.', choice: [
				{ text: 'Combatir (curar antes).', then: [
					{ heal: 'Francine silba. Un recluta trae una nevera portátil llena de pociones con etiquetas de colores. «Las robamos… las compramos. Las compramos. Tú cúrate y no preguntes».' },
					{ battle: 'francine_1', lose: 'continue',
						onWin: [
							{ say: 'francine', text: 'Bien. —Se sacude la chaqueta—. Chicos, ¿lo vieron? Así se pierde. Con la cabeza alta. Apúntenlo.' },
							{ say: 'recluta_skull', text: '¡Yo! ¡Apuntado, jefa! —Pausa—. ¿Dónde lo apunto?' },
						],
						onLose: [
							{ say: 'francine', text: 'No pasa nada. Hoy no era tu día. Mañana tampoco, si sigues mirando las jaulas en vez del combate.' },
							{ heal: true },
						] },
				] },
				{ text: 'Ahora no.', then: [
					{ say: 'francine', text: 'Como quieras. Aquí estaré. Cobrando por estar.' },
				] },
			] },
		],
		b05_francine_oferta: [
			{ say: 'francine', text: 'Oye. —Baja la voz—. Lo de los de Kanto. ¿Lo harías otra vez? Si mis chicos tuvieran dónde ir, me iría mañana. Pero no saben hacer nada más que poner cara de malos y llevar gorra.' },
			{ prompt: 'Leilani tiene un taller en Kantai y siempre le faltan manos. Y le sobran cosas que explotan.', choice: [
				{ text: '«Conozco un taller en Kantai que necesita gente.»', then: [
					{ set: { 'flag.b05_skull_taller': true } },
					{ rep: { alola: 3 } },
					{ text: 'Le escribes a Leilani. La respuesta llega antes de que guardes la Pokédex.' },
					{ say: 'leilani', as: 'Leilani (mensaje)', text: '¿Skull? ¿Los de las gorras? ¿Saben soldar? ¡Da igual, aprenden! Que vengan el lunes. No, el martes. El lunes exploto algo. ¿Sí o qué?' },
					{ say: 'francine', text: '…¿Así? ¿Sin entrevista? —Lee el mensaje dos veces—. «El lunes exploto algo». Esta chica me cae bien.' },
					{ say: 'francine', text: 'Los chicos van a hacer como que no les importa. Les importa muchísimo. —Se da la vuelta, rápido—. El contrato de aquí se acaba esta semana; si se abren esas jaulas, se acaba antes. Y entonces nos vamos. Termino lo que empiezo. Hasta lo que no me gusta.' },
					{ intel: { npc: 'francine', text: 'Ex administradora del Team Skull; su «Servicios de Seguridad Francine» trabaja en Æther pagado por una fundación con «un ocho tumbado». Aceptó que sus reclutas trabajen en el taller de Leilani en Kantai en cuanto acabe el contrato.' } },
				] },
				{ text: '«No puedo prometerte nada.»', then: [
					{ say: 'francine', text: 'Ya. Nadie puede. —Se encoge de hombros—. Pero lo has pensado. Eso también lo apunto.' },
				] },
			] },
		],
		b05_francine_despues: [
			{ if: 'flag.b05_skull_taller', then: [
				{ say: 'francine', text: 'Los chicos ya preguntan qué es un soplete. Uno quiere saber si se puede tunear. Le he dicho que sí. No tengo ni idea.' },
			], else: [
				{ say: 'francine', text: 'Ojos amarillos, bien abiertos. Así se vigila. —Mira las jaulas—. Lo malo es cuando no te gusta lo que ves y te pagan igual.' },
			] },
			{ if: 'flag.b05_fabio_vencido', then: [
				{ say: 'francine', text: 'Han abierto las jaulas. Mis chicos han ayudado a sacar a los Pokémon. Con cuidado. Uno ha llorado. Ha dicho que era el polen. Aquí no hay polen.' },
			] },
		],

		// =================== LABORATORIOS: FABIO, CALDER Y LEILANI ===================
		b05_lab_fabio: [
			{ set: { 'flag.b05_fabio_visto': true } },
			{ text: 'La sala del fondo tiene una pantalla que ocupa la pared: un mapa de **Isla Poni** con un punto rojo que parpadea en el sur. Delante, tres personas. Dos no te ven entrar.' },
			{ text: 'Un hombre con bata, flequillo verde peinado hacia arriba y unas gafas de protección que no protegen nada, habla muy alto. Un hombre mayor, de chaqueta de lino clara y barba canosa, escucha con las manos a la espalda. Y entre los dos, con un rollo de planos bajo el brazo y el overol manchado de grasa, está **Leilani**.' },
			{ say: 'fabio', text: '¡…financiación ilimitada, señorita Kahale! ¡Ilimitada! La Fundación Æther, y nuestros generosísimos amigos, le ofrecen un laboratorio como este. ¡Con mi nombre en la puerta de al lado, que es casi mejor! A cambio, solo los planos del anclaje. Unos dibujitos.' },
			{ say: 'leilani', text: 'No son dibujitos. Son… —Se le traba la lengua, cosa rara en ella—. Bueno, sí son dibujitos. Pero funcionan.' },
			{ say: 'calder', text: 'Y algo más. —Voz suave, sin prisa. Es Calder Wynn, el astrónomo de la charla de Hauoli—. La Fundación tiene nueve años de lecturas de ultraumbrales sobre Akala. Nueve. Si su madre dejó una señal, señorita Kahale, cualquier señal, está en esos datos. Podemos buscarla.' },
			{ text: 'Leilani se queda completamente quieta. Los planos se le resbalan un poco del brazo.' },
			{ if: 'flag.b05_carta_leida', then: [
				{ say: 'leilani', text: 'Usted firmó el informe. —Muy bajito—. «Colapso espontáneo». La profesora Pimpinela me lo contó.' },
				{ say: 'calder', text: 'Lo firmé. —No aparta la mirada. No se excusa—. Algún día le contaré por qué. Hoy no. Hoy solo le ofrezco buscarla.' },
			], else: [
				{ say: 'leilani', text: 'Usted… usted conocía a mi madre. Pimpinela dice que trabajaban juntos.' },
				{ say: 'calder', text: 'Trabajábamos juntos. —Una pausa larga—. Se reía como un motor que no arranca. Algún día le contaré más. Hoy solo le ofrezco buscarla.' },
			] },
			{ say: 'fabio', text: '¡Exacto! Buscar. Encontrar. Firmar. ¡En ese orden! Usted pone los planos y nosotros, todo lo demás. Al fin y al cabo, una proveedora tan pequeñita no va a poder aprovecharlos a gran escala…' },
			{ prompt: 'Leilani mira los planos. Te mira a ti, de reojo. No dice nada.', choice: [
				{ text: '«No es su proveedora. Es la que lo inventó.»', then: [
					{ af: { leilani: 5 } },
					{ set: { 'flag.b05_leilani_defendida': true } },
					{ say: 'fabio', text: '¿Disculpe? ¿Y usted es…? —Te mira de arriba abajo—. Ah. Un visitante. Los visitantes, a la sala de visitantes.' },
					{ say: 'leilani', text: '«La que lo inventó». —Se endereza. Los planos vuelven a su sitio bajo el brazo—. Eso. Lo que ha dicho. Con esas palabras. Me lo pienso, doctor Fabio. Y cuando me lo piense, se lo diré. A lo mejor.' },
				] },
				{ text: '«Leilani, es tu madre. Escúchalos.»', then: [
					{ say: 'leilani', text: 'Ya. Ya lo sé que es mi madre. —Aprieta los planos—. Por eso no puedo pensar. Me lo pienso. Mañana. O el martes.' },
				] },
				{ text: 'No meterte.', then: [
					{ say: 'leilani', text: 'Me… me lo pienso. —Se mete los planos en el cinturón de herramientas, que es imposible que quepan, y caben—. Gracias por el café. No me han dado café. Gracias igual.' },
				] },
			] },
			{ text: 'Calder se ha girado hacia ti. Te reconoce. Inclina la cabeza, educado, como en el Paseo Marítimo de Hauoli.' },
			{ say: 'calder', text: 'Buenas tardes otra vez. ¿Ha mirado el cielo a media tarde, como le pedí? —Espera tu respuesta sin prisa—. Se apaga un poco, ¿verdad? Unos minutos. Es lo que pasa cuando alguien acapara la luz que necesitan todos los demás.' },
			{ if: LUC, then: [
				{ text: '{riolu} da un paso hacia delante, entre tú y Calder. No gruñe. Solo se pone ahí. Calder lo mira con algo que parece tristeza.' },
				{ say: 'calder', text: 'Tiene razón en desconfiar. Yo también desconfiaría de mí. —Se coloca las gafas—. Mañana salgo hacia Poni. Desde allí el cielo se ve mejor. Que tengan buena tarde.' },
			], else: [
				{ say: 'calder', text: 'Mañana salgo hacia Poni. Desde allí el cielo se ve mejor. Que tengan buena tarde.' },
			] },
			{ text: 'Se va por el pasillo con su telescopio plegado al hombro. Fabio lo sigue, dándole conversación a su espalda. Leilani se queda un momento mirando el punto rojo de la pantalla.' },
			{ say: 'leilani', text: 'Me voy a Kantai. Tengo que… soldar algo. Lo que sea. —Intenta sonreír, y casi le sale—. Si me buscas, estaré debajo de una montura, hablando sola. Lo normal.' },
			{ intel: { npc: 'calder', text: 'En los laboratorios de Æther, con Fabio: le ofreció a Leilani buscar a su madre en nueve años de datos de ultraumbrales a cambio de los planos del anclaje. Admite que firmó el informe del «colapso espontáneo». Cree que alguien «acapara la luz». Sale hacia Poni.' } },
			{ intel: { npc: 'fabio', text: 'Jefe de la Rama Científica de Æther. Firmó la venta de los datos de umbral. Llama a Leilani «proveedora» y le ofrece «financiación ilimitada» por sus planos, con Calder Wynn (Lemnis) delante.' } },
		],
		b05_lab_pantalla: [
			{ text: 'El mapa de Isla Poni. El punto rojo parpadea en el sur, en un sitio con un nombre pequeño junto a un lago: «Altar». Debajo, en la esquina de la pantalla, un código: «E-04».' },
			{ if: LUC, then: [
				{ text: '{riolu} mira el punto rojo y se lleva una pata al pecho. Como si le picara algo por dentro.' },
			] },
		],
		b05_lab_mesa: [
			{ text: 'La mesa que usaba Calder. Una taza de té frío, unas gafas de repuesto en su funda y un cuaderno cerrado con una goma. En la tapa, a mano: «Lo que miramos es un recuerdo».' },
			{ text: 'No lo abres. La goma está muy tirante. Parece de alguien que lo abre y lo cierra muchas veces al día.' },
		],

		// =================== LABORATORIOS: KAORI ===================
		b05_kaori_aether: [
			{ set: { 'flag.b05_kaori_aether': true } },
			{ text: 'El laboratorio 3 huele a alcohol, a hierbas y a algo dulce que no debería. En una mesa hay doce frascos en fila, todos iguales. Delante, sentada en un taburete con las piernas cruzadas, el kimono remangado y las vendas del brazo nuevas, está **Kaori**.' },
			{ say: 'kaori', text: 'Has venido. —No levanta la vista del microscopio—. Bien. No toques los frascos. Ni la mesa. Ni el aire de encima de la mesa.' },
			{ say: 'kaori', text: 'Mira esto. —Te pasa un frasco de plástico blanco con una etiqueta alegre: «**Complemento vitamínico** · Lote 04 · Uso veterinario»—. Lo encontré en la farmacia de la Fundación. Se lo daban a los Pokémon de la conservación. Uno al día. Como vitaminas.' },
			{ text: 'Lo abre. Dentro, caramelos pequeños, azules, que brillan solos en la penumbra del laboratorio. Conoces ese brillo.' },
			{ say: 'kaori', text: 'Caramelo Lazo. Con otra etiqueta. Lo de siempre: estrecha el vínculo un momento y luego apaga. Por eso los de las jaulas no se mueven. No es el viaje. Es esto.' },
			{ say: 'kaori', text: 'Pero aquí hay otra cosa. —Por primera vez, la voz le cambia un poco—. Los de Æther llevan nueve años estudiando el veneno de unos Pokémon que no son de este mundo. Una neurotoxina que no se parece a nada. Tienen un método para sacarla del cuerpo poco a poco. Sin romper nada.' },
			{ say: 'kaori', text: 'Si junto su método con la resina de tejo de Lavanda… —Mueve un cuentagotas sobre una placa. Una gota azul se vuelve, despacio, transparente—. Oh. Esto es… precioso. Precioso.' },
			{ prompt: 'Kaori está a mitad de un experimento. Tiene la mirada fija en la placa.', choice: [
				{ text: 'Esperar en silencio a que termine.', then: [
					{ af: { kaori: 3 } },
					{ text: 'Te quedas quiet{o|a|e}. Ella trabaja. Pasan cuatro minutos sin que nadie diga nada. Cuando por fin levanta la vista, parece sorprendida de que sigas ahí.' },
					{ say: 'kaori', text: 'No has interrumpido. —Lo dice como quien anota un dato raro—. Lo apunto.' },
				] },
				{ text: '«¿Eso lo cura del todo?»', then: [
					{ af: { kaori: 1 } },
					{ say: 'kaori', text: 'No. —Sin dudar—. Pero una pregunta honesta merece una respuesta honesta. Lo saca. No devuelve lo que se llevó. Para eso me falta algo. Todavía no sé qué.' },
				] },
				{ text: '«¿Y si le soplamos para que dé suerte?»', then: [
					{ af: { kaori: -2 } },
					{ say: 'kaori', text: '—Te mira por encima de las gafas que no lleva—. La suerte no tiene principio activo. Sopla en tu casa.' },
				] },
			] },
			{ if: LUC, then: [
				{ say: 'kaori', text: 'Ahora, tu Lucario. —Señala una placa con una muestra de sangre de uno de los Pokémon de la jaula—. Cuando el Caramelo apaga a un Pokémon, el aura se le va primero. Quiero saber si con esto vuelve algo. Aunque sea poco. Tú lo verías.' },
				{ text: '{riolu} se acerca a la placa. Pone la palma encima, sin tocarla. El aura se le enciende, azul, y se queda un momento quieta sobre la muestra. Al principio, nada. Luego, muy en el fondo, un puntito de luz que tiembla. Pequeño. Pero ahí.' },
				{ say: 'kaori', text: '…Vuelve. —Kaori no sonríe. Pero apunta algo en su cuaderno con una letra mucho más grande que la de siempre—. Muy poco. Pero vuelve.' },
				{ happy: { who: 'riolu', n: 5 } },
			], else: [
				{ say: 'kaori', text: 'Me faltaría alguien que viera el aura para saber si vuelve algo. Lo apunto como «pendiente». No me gustan los pendientes.' },
			] },
			{ say: 'kaori', text: 'Me quedo los doce frascos. Que la Fundación me demande. —Los mete en su maleta, uno a uno, con un cuidado infinito—. Toma. Son de tienda. Las mías no te las doy: todavía matan.' },
			{ give: 'fullheal', n: 2 },
			{ quest: 'b05_t_kaori', stage: 'hecha', done: true },
			{ intel: { npc: 'kaori', text: 'En Æther encontró Caramelos Lazo con etiqueta de «complemento vitamínico» que daban a los Pokémon de la conservación. Con el método de Æther contra la neurotoxina de Pokémon de otro mundo, su antídoto saca el veneno, pero no devuelve lo que se llevó.' } },
		],
		b05_kaori_despues: [
			{ if: 'flag.b05_fabio_vencido', then: [
				{ say: 'kaori', text: 'Han abierto las jaulas. Gladio me ha dado permiso para tratar a los doce. Uno a uno. —Pausa—. El Ponyta ha comido. Es un dato pequeño. Me gusta mucho.' },
			], else: [
				{ say: 'kaori', text: 'Estoy ocupada. —Pausa—. Puedes quedarte. En silencio.' },
			] },
		],

		// =================== LABORATORIOS: XERO ===================
		b05_xero_aether: [
			{ set: { 'flag.b05_xero_aether': true } },
			{ text: 'En un rincón del pasillo, un hombre con bata manchada de aceite y unas gafas enormes atornilla la tapa de una caja metálica del tamaño de una nevera. Hay seis cajas más en fila. Todas con la misma etiqueta: «E-04 · Frágil · Este lado arriba».' },
			{ say: 'xero', text: '…siete tornillos, ocho tornillos… ¡Bwahaha! —Se gira—. Oh. Tú. Otra vez. En otro sitio donde trabajo. Ya no es casualidad, es estadística.' },
			{ say: 'xero', text: 'Xero. Contratista. Ahora en Alola, con el mismo permiso firmado y el mismo calor. —Le da una palmada a la caja—. ¿Sabes qué es esto? Un frasco. Un frasco muy grande, muy caro y muy bien hecho. Para guardar luz.' },
			{ say: 'xero', text: 'No me preguntes de qué luz. No lo sé. Bueno, lo sé. Pero no me pagan por saberlo, me pagan por atornillar. Y atornillo divinamente.' },
			{ if: 'flag.b04_xero_matiere', then: [
				{ say: 'xero', text: 'Por cierto. —Baja la voz—. Le dije a Matière lo que me dijiste. No me contestó. Contestó dos días después. Una palabra: «Come». —Se le escapa una sonrisa que no es de científico loco—. Llevo dos días comiendo.' },
			] },
			{ if: LUC, then: [
				{ say: 'xero', text: 'A tu Lucario tampoco le gustan mis cajas. Tiene buen criterio. —Las mira—. A mí me gustan mucho. Eso es lo que me preocupa.' },
			] },
		],
		b05_xero_despues: [
			{ if: 'flag.b05_fabio_vencido', then: [
				{ say: 'xero', text: 'Ya no queda ninguna caja. Salieron hacia Poni de noche, en un barco sin luces. —Se limpia las manos—. Atornillé divinamente. Ojalá lo hubiera hecho fatal.' },
			], else: [
				{ say: 'xero', text: '¡Bwahaha! Once tornillos, doce tornillos… No me cuentes nada. Si me cuentas algo, tendré que saberlo.' },
			] },
		],

		// =================== CLÍNICA: CAMILLE ===================
		b05_camille: [
			{ set: { 'flag.b05_camille_vista': true } },
			{ text: 'En la sala de espera, una chica de unos quince años, con coleta alta, rodilleras y una sudadera azul con un número a la espalda, hace toques con un balón de voleibol. Uno, dos, tres… el cuarto se le va.' },
			{ text: 'El balón rebota en el suelo y rueda hasta tus pies.' },
			{ if: LUC, then: [
				{ text: 'Antes de que te agaches, {riolu} lo para con el pie, lo levanta con un toque y se lo devuelve con la palma, limpio, a la altura exacta de sus manos.' },
				{ say: 'camille', text: '¡Oh! ¡¿Ha hecho un toque de antebrazo?! ¡Tu Lucario sabe hacer un toque de antebrazo! Bueno, de palma. Pero ha estado perfecto.' },
			], else: [
				{ text: 'Se lo devuelves con las manos. No muy bien. Ella lo atrapa igual y se ríe.' },
			] },
			{ say: 'camille', text: 'Camille. Estoy en revisión. Me operaron aquí hace seis años, de una válvula del corazón. Era pequeña; casi no me acuerdo. Ahora vengo cada seis meses a que me pongan cables y me digan que todo bien. —Se encoge de hombros—. Siempre dicen que todo bien. Me aburro un montón.' },
			{ say: 'camille', text: 'De pequeña no podía ni correr. Ahora juego de colocadora en el equipo del instituto. Bueno, de suplente. Pero el entrenador dice que el saque se me da genial. Bueno, que se me dará.' },
			{ if: 'flag.b04_lebrun_detenido', then: [
				{ say: 'camille', text: 'Papá está de viaje por trabajo. —Lo dice mirando el balón, no a ti—. Eso dice mi tía. Llevo semanas sin hablar con él.' },
				{ text: 'Le da vueltas al balón entre las manos. Sabe que no es un viaje. Se le nota en cómo no pregunta.' },
				{ say: 'camille', text: 'Oye… tú viajas mucho, ¿no? Si un día lo ves… dile que el saque ya me sale. El de arriba. Me sale. Él decía que no me iba a salir nunca porque tengo la muñeca floja. Dile que ya no.' },
			] },
			{ if: 'flag.b04_lebrun_cebo', then: [
				{ say: 'camille', text: 'Papá me llama todos los días. A las siete en punto. Nunca se le olvida. Antes se le olvidaban mis partidos. Ahora llama a las siete.' },
				{ say: 'camille', text: 'Se le oye cansado. Y a veces, en la línea, se oye como otra respiración. Como si hubiera alguien más escuchando. —Se encoge de hombros—. Le digo que estoy bien, muy clarito. Por si el que escucha también se preocupa.' },
			] },
			{ if: 'flag.b04_lebrun_libre', then: [
				{ say: 'camille', text: 'Papá se fue a algún sitio. No sé dónde. Hace un mes me llegó una postal sin sello, de Luminalia. Solo ponía: «Saque de abajo. Muñeca firme. Te quiero. P.».' },
				{ say: 'camille', text: 'La tengo en la mochila. —No la saca—. No tiene sello. Alguien la trajo en mano. No sé quién. Me gusta pensar que fue él.' },
			] },
			{ if: '!flag.b04_lebrun_detenido && !flag.b04_lebrun_cebo && !flag.b04_lebrun_libre', then: [
				{ say: 'camille', text: 'Mi padre trabaja muchísimo. En la policía, en Kalos. Siempre sabe dónde está todo el mundo. Menos él. Él nunca sabe dónde está, de lo cansado que va.' },
			] },
			{ say: 'camille', text: 'La operación la pagó un amigo de papá. Muy generoso. Nunca lo he conocido. Le escribí una carta para darle las gracias y papá me dijo que no hacía falta. —Hace un toque. Otro. Otro—. Yo creo que sí hacía falta.' },
			{ choice: [
				{ text: '«Si lo veo, se lo digo.»', then: [
					{ say: 'camille', text: '¿De verdad? —Se le ilumina la cara—. Gracias. No le digas que he estado aburrida. Dile lo del saque. Solo lo del saque.' },
				] },
				{ text: '«¿Me enseñas el saque?»', then: [
					{ text: 'Camille lanza el balón al aire, salta un poco, lo golpea con la palma abierta. El balón cruza la sala de espera, da en la pared de enfrente y vuelve rodando. La enfermera ni levanta la vista: debe de pasar mucho.' },
					{ say: 'camille', text: '¡Me ha salido! ¡Delante de alguien! Eso cuenta doble.' },
				] },
			] },
			{ intel: { npc: 'camille', text: 'Camille Lebrun, 15 años, en revisión en la clínica de Æther: la operaron de una válvula del corazón hace seis años; «la pagó un amigo de papá». Juega al voleibol. No sabe nada de lo de su padre, o sabe más de lo que dice.' } },
		],
		b05_camille_despues: [
			{ text: 'Camille sigue haciendo toques en la sala de espera. Cuenta en voz baja. Va por el doce.' },
			{ say: 'camille', text: '¡Trece! Bueno, doce y medio. El último ha sido con la cabeza.', cond: '!(' + LUC + ')' },
			{ say: 'camille', text: '¡Dile a tu Lucario que juegue conmigo! Bueno, dile no. Pídeselo. Seguro que tiene mejor muñeca que yo.', cond: LUC },
		],

		// =================== CLÍNICA: BASTIEN ===================
		b05_bastien_aether: [
			{ set: { 'flag.b05_bastien_aether': true } },
			{ text: 'La Unidad de Estudios de Vínculo es una sala blanca con dos sillones, uno para el entrenador y otro para el Pokémon, y un montón de cables colgando del techo. Greninja está de pie, con los brazos cruzados, y no se ha puesto ninguno.' },
			{ if: LEAL, then: [
				{ text: 'Bastien está sentado en su sillón con la chaqueta de Lemnis abierta y el contrato en las rodillas, siguiendo las líneas con el dedo.' },
				{ say: 'bastien', text: '¡{jugador}! Has venido. Lo apunto. —Te hace sitio en el brazo del sillón—. Siéntate. Vamos a leer la catorce punto cuatro. Yo leo y tú pones cara.' },
			], else: [
				{ text: 'Bastien está de pie junto a la ventana, con la chaqueta puesta y el contrato enrollado en la mano como un periódico. Te ve entrar y se le tensa la mandíbula.' },
				{ say: 'bastien', text: 'Te dije que no vinieras. —Te tira el contrato. Lo atrapas contra el pecho—. Toma. Léelo tú. Total, a ti siempre te sale bien dejar que otros lean solos.' },
				{ text: 'Se da la vuelta hacia la ventana. Cuenta hasta algo. Vuelve.' },
				{ say: 'bastien', text: '…Perdona. No. Perdona no. Bueno, sí. —Se sienta, por fin—. Página treinta y uno. Lee en voz alta, que yo ya me la sé y me da rabia.' },
			] },
			{ text: '*«14.4. Traslado para estudios. Concluidos los estudios de vínculo en la instalación designada (Alola: Paraíso Æther), el Talento y su Pokémon principal se trasladarán al **emplazamiento 04** para la fase de transferencia, sin plazo de retorno determinado.»*' },
			{ say: 'bastien', text: '«Fase de transferencia». «Sin plazo de retorno». —Se le escapa una risa rara—. Transferencia de qué. ¿De Greninja? ¿De mí? ¿De lo que hay en medio?' },
			{ text: 'Greninja le pone una mano palmeada en el hombro. No dice nada. Mira los cables del techo como se mira a algo que se va a romper muy pronto.' },
			{ if: 'flag.b05_nota_noa', then: [
				{ say: 'bastien', text: '«Emplazamiento 04». —Lo repite—. Eso lo he visto. En las etiquetas de abajo. Con la letra de Noa. Noa siempre pone el puntito de las íes así de gordo.' },
			], else: [
				{ say: 'bastien', text: 'Noa no me contesta. Hace un mes que no me contesta. —Toca la solapa, donde lleva la insignia de hojalata—. Ella sabría qué es el «emplazamiento 04». Ella lo sabe todo y no lo puede decir.' },
			] },
			{ prompt: 'Bastien te mira. Espera que digas algo.', choice: [
				{ text: '«Rómpelo. Si te demandan, yo te cubro.»', then: [
					{ if: LEAL, then: [
						{ set: { 'flag.b05_bastien_rompe': true } },
						{ say: 'bastien', text: 'Tú me cubres. —Lo dice despacio, como quien prueba una palabra—. Ya lo hiciste una vez. En una cueva. Con un montón de gente mirando.' },
						{ text: 'Toma el contrato, busca la página treinta y uno y la arranca. Con cuidado, por la línea de puntos, como quien corta un cupón. Se la guarda en el bolsillo.' },
						{ say: 'bastien', text: 'No la tiro. La guardo. Si un día dicen que no existió, les enseño el hueco. —Se quita la chaqueta de Lemnis y la deja doblada en el sillón de los cables—. Greninja. Nos vamos.' },
					], else: [
						{ set: { 'flag.b05_bastien_sigue': true } },
						{ say: 'bastien', text: '¿Tú me cubres? —Se ríe, feo—. La última vez que necesité que alguien me cubriera, tú estabas mirando. No. No me cubres. No te lo pido.' },
						{ say: 'bastien', text: 'Me quedo. Hago los estudios. Leo lo que me pongan delante. Y cuando me lleven a ese «emplazamiento», iré con los ojos abiertos. Eso no me lo puede quitar ningún contrato.' },
					] },
				] },
				{ text: '«Aguanta. Desde dentro vas a ver lo que nadie ve.»', then: [
					{ set: { 'flag.b05_bastien_sigue': true } },
					{ if: LEAL, then: [
						{ say: 'bastien', text: 'Desde dentro. —Lo piensa mucho rato—. Como Noa. Ella está dentro y lo ve todo. Y alguien tiene que estar cerca cuando no conteste.' },
						{ say: 'bastien', text: 'De acuerdo. Me quedo. Pero me quedo mirando. Y te lo cuento todo. Esa es mi cláusula. La catorce punto cinco. La escribo yo.' },
					], else: [
						{ say: 'bastien', text: 'Claro. Aguanta, Bastien. Calladito, Bastien. —Aprieta el contrato—. Es lo que me dice todo el mundo. Pero tienes razón. Si me voy, no veré nada. Me quedo. Con los ojos abiertos.' },
					] },
				] },
				{ text: '«No sé. Es tu decisión.»', then: [
					{ if: LEAL, then: [
						{ set: { 'flag.b05_bastien_sigue': true } },
						{ say: 'bastien', text: 'Mi decisión. —Asiente, despacio—. Pues decido quedarme. Por Noa. Alguien tiene que estar cerca de donde la lleven. Y yo ya llevo la chaqueta.' },
						{ say: 'bastien', text: 'Si un día te mando un mensaje raro, ven. Aunque no tenga sentido. Sobre todo si no tiene sentido.' },
					], else: [
						{ set: { 'flag.b05_bastien_rompe': true } },
						{ say: 'bastien', text: '…Mi decisión. —Te mira como si fuera la primera vez que alguien le dice eso—. Nadie me había dejado decidir nada. Mis padres, Lemnis, los abogados. Tú.' },
						{ text: 'Abre el contrato por la página treinta y uno. La arranca de un tirón, sin cuidado. La rompe en dos. En cuatro. Deja los trocitos en el sillón de los cables.' },
						{ say: 'bastien', text: 'Que me demanden. Que se dupliquen la demanda. Que la tripliquen. Greninja, nos vamos. —En la puerta, sin girarse—. Gracias. Por no decirme nada.' },
					] },
				] },
			] },
			{ quest: 'b05_t_bastien', stage: 'hecha', done: true },
			{ if: 'flag.b05_bastien_rompe', then: [
				{ intel: { npc: 'bastien', text: 'Rompió la cláusula 14.4 de su contrato («traslado al emplazamiento 04 para la fase de transferencia, sin plazo de retorno») y se fue de la Unidad de Estudios de Vínculo de Æther con Greninja.' } },
			], else: [
				{ intel: { npc: 'bastien', text: 'Se quedó en la Unidad de Estudios de Vínculo de Æther, «con los ojos abiertos». La cláusula 14.4 lo manda al «emplazamiento 04» para una «fase de transferencia» sin plazo de retorno.' } },
			] },
			{ say: 'bastien', text: 'Antes de nada. —Se gira, con una Poké Ball en la mano—. Combate. Página nueva: «Cosas que hago porque quiero». Quiero que la primera sea esta.' },
			{ choice: [
				{ text: '«Vamos.»', then: [{ call: 'b05_bastien_combate' }] },
				{ text: '«Luego, Bastien.»', then: [{ say: 'bastien', text: 'Luego. Lo apunto como pendiente. Pendiente mío, esta vez.' }] },
			] },
		],
		b05_bastien_revancha: [
			{ say: 'bastien', text: '¿Ahora sí? Página abierta. Greninja, más.' },
			{ call: 'b05_bastien_combate' },
		],
		b05_bastien_combate: [
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, en la enfermería.', then: [{ heal: 'La enfermera de la clínica cura a tu equipo sin levantar la vista de la tele. Bastien la mira con envidia: a él le ponen cables y a ti te dan una piruleta.' }] },
				{ text: 'No hace falta.', then: [{ say: 'bastien', text: 'Insisto. Cláusula mía. —Te lanza una Hiperpoción.' }, { heal: 'Curas a tu equipo con lo que te da Bastien.' }] },
			] },
			{ battle: 'bastien_6', lose: 'continue',
				onWin: [
					{ say: 'bastien', text: 'Otra vez. Bien. —Lo apunta—. Página «Cosas que hago porque quiero»: primera línea, perder contigo. Suena raro. Me gusta.' },
					{ text: 'Greninja te hace una reverencia corta. Luego se la hace a {riolu}, más larga.', cond: LUC },
				],
				onLose: [
					{ say: 'bastien', text: '¡He ganado! ¡En mi página! Lo subrayo dos veces.' },
					{ heal: true },
				] },
		],
		b05_bastien_despues: [
			{ if: 'flag.b05_bastien_rompe', then: [
				{ text: 'En el sillón de los cables queda la chaqueta de Lemnis, doblada. Bastien ya no está. En la mesa, una nota con su letra: «Me he ido a ver el mar. Mío. — B.».', cond: 'flag.b01_bastien_cubierto' },
				{ text: 'En el sillón de los cables quedan los trocitos de una página. Bastien ya no está. En la mesa, una nota con su letra: «Me he ido a ver el mar. Mío. — B.».', cond: '!flag.b01_bastien_cubierto' },
			], else: [
				{ say: 'bastien', text: 'Me han puesto dos cables. Uno en la muñeca y otro en la sien. Greninja sigue sin dejarse poner ninguno. —Sonríe un poco—. Le admiro.' },
			] },
		],

		// =================== ARCHIVO: EL ARMARIO, EL INFORME Y FABIO ===================
		b05_armario: [
			{ if: '!flag.b05_armario_visto', then: [
				{ set: { 'flag.b05_armario_visto': true } },
				{ text: 'El armario del fondo es de metal blanco, sin asas. En la puerta, una placa: «Rama Científica · Fabio». La cerradura no tiene ojo de llave: tiene seis runas que se encienden, una detrás de otra, en un orden que cambia.' },
				{ say: 'gladio', text: 'Fabio. —Lo dice como un insulto—. Se lo diseñó él. Le encantan las cosas que hay que memorizar. Dice que entrenan la mente.' },
				{ if: LUC, then: [
					{ text: '{riolu} pone la palma cerca de la cerradura. Las runas, al encenderse, le dejan un rastro en el aura: lo ves un instante más de lo que dura la luz. Te va a ayudar.' },
				] },
			], else: [
				{ text: 'La cerradura de runas del armario de Fabio. Se ha vuelto a cerrar, con su orden nuevo.' },
			] },
			{ minigame: { type: 'lock', id: 'b05_armario_fabio', title: 'El armario de Fabio', hint: 'Mira el orden en que se encienden las runas y repítelo. Cada cerrojo añade una más. Puedes verla otra vez gratis.', theme: 'caja', level: 3,
				guaranteed: ['informeaether'], loot: [{ id: 'ultraball', w: 6, n: [1, 2] }, { id: 'ppup', w: 4 }, { id: 'upgrade', w: 2, rare: true }], picks: 1, consolation: false, lootTitle: 'Dentro del armario' },
				onWin: [{ call: 'b05_informe' }],
				onLose: [
					{ text: 'La última runa se apaga con un pitido feo y las seis se quedan grises. El armario se ha bloqueado. Al rato, una a una, se vuelven a encender.' },
					{ say: 'gladio', text: 'Otra vez. Tranquil{o|a|e}. Fabio la abre veinte veces al día y es Fabio.' },
				],
				onQuit: [{ say: 'gladio', text: 'Cuando quieras. Yo no me muevo de aquí.' }] },
		],
		b05_informe: [
			{ set: { 'flag.b05_informe': true } },
			{ text: 'La última runa encaja con un clic suave. El armario se abre. Dentro, carpetas blancas, muy ordenadas, y una más gruesa encima de todas, con una banda roja: «CONFIDENCIAL · Programa Ultra».' },
			{ read: 'informeaether' },
			{ say: 'gladio', text: '«Copia a Dirección». —Lee la última línea dos veces—. Una letra. Ni siquiera un nombre. Mi madre firmaba con su nombre completo hasta las listas de la compra.' },
			{ say: 'gladio', text: 'Fuente F-04. Emplazamiento 04. Poni. Y mis datos. Nueve años de datos para encontrar… eso. —Cierra la carpeta muy despacio—. Y las jaulas eran el combustible.' },
			{ text: 'Debajo de la carpeta hay otra, más fina, de la clínica. Asoma una pestaña: «Paciente: Lebrun, C. · Cirugía cardiaca · **Pagado**». Grapado en la esquina, un sobre vacío. En el sobre, a mano, una sola letra: **Ω**.' },
			{ text: 'Gladio no la ve; está mirando la puerta. Tú la vuelves a dejar donde estaba.' },
			{ text: 'La puerta del archivo se abre de golpe.' },
			{ set: { 'flag.b05_fabio_archivo': true } },
			{ say: 'fabio', text: '¡¿Quién ha abierto mi armario?! ¡El sistema dice que ha entrado alguien de arriba! ¡De muy arriba! —Se para en seco al verte—. …¿Tú? ¿Y usted, presidente? ¿Con… su visitante?' },
			{ say: 'gladio', text: 'Lo firmaste tú. —Le enseña la carpeta—. Mis datos. Mi conservación. Mis jaulas.' },
			{ say: 'fabio', text: '¡Sus datos estaban en un cajón juntando polvo! —Se recoloca las gafas de protección—. ¡Yo los puse a trabajar! Y lo de «almacén de tránsito» es un término técnico. ¡Técnico! Los Pokémon están cómodos. ¡Tienen mantita!' },
			{ say: 'fabio', text: 'Lemnis paga la mitad de esta isla, presidente. La mitad. ¿Quiere usted que le diga qué mitad? —Se ríe muy alto—. ¡La de los sueldos!' },
			{ say: 'gladio', text: 'Son Pokémon, Fabio.' },
			{ say: 'fabio', text: '¡Y yo soy Fabio! ¡Jefe de la Rama Científica! Y no recibo órdenes de un presidente en funciones que no se sienta en su silla. —Saca una Poké Ball—. Usted, visitante. Si le gano, se olvida de lo que ha leído. Soy muy bueno haciendo que la gente olvide. Tengo un Hypno.' },
			{ call: 'b05_fabio_combate' },
		],
		b05_fabio_combate: [
			{ if: 'flag.b05_fabio_intento', then: [
				{ text: 'Fabio sigue en el archivo, arreglándose la bata delante del cristal de una estantería. Te ve y se pone muy derecho.' },
				{ say: 'fabio', text: '¡Otra vez! ¡Bien! La ciencia es repetición. ¡Y la repetición me encanta cuando gano yo!' },
			] },
			{ set: { 'flag.b05_fabio_intento': true } },
			{ say: 'gladio', text: 'Toma. —Te pone en la mano una bolsa blanca con pociones de la Fundación—. No pienso dejar que pelees cansad{o|a|e} contra él. Bastante tramposo es ya.' },
			{ prompt: '¿Curar al equipo antes de combatir contra Fabio?', choice: [
				{ text: 'Sí, curar al equipo.', then: [{ heal: 'Curas a tu equipo con las pociones de Gladio. Fabio protesta: «¡Eso es material de la Fundación!». Gladio: «Exacto».' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'gladio', text: 'Tú sabrás. —Se aparta un paso—. Su Alakazam lleva una piedra. Lo he visto megaevolucionar en las demostraciones. Fabio no pierde ninguna demostración.' }] },
			] },
			{ battle: 'fabio_1',
				onWin: [
					{ text: 'El Alakazam de Fabio cae de rodillas, suelta las cucharas, y vuelve a su forma de siempre con un destello. Fabio lo devuelve a la Poké Ball con la mano temblando.' },
					{ say: 'fabio', text: 'Imposible. Era una demostración. ¡Yo no pierdo demostraciones! —Se le cae la soberbia de golpe, como un abrigo—. …Yo solo firmé. Calder pidió los datos. El doctor Wynn. Dijo que eran para «devolver la luz a quien la necesita». ¡Sonaba bonito! ¡Firmar no es hacer!' },
					{ say: 'gladio', text: 'Firmar es hacer.' },
					{ say: 'gladio', text: 'Recoge tus cosas, Fabio. Vacaciones. Indefinidas. Y dame el código de las jaulas. —Tiende la mano—. Ahora. Antes de que se me olvide que soy educado.' },
					{ text: 'Fabio se lo da. Lo escribe en un pósit con una caligrafía preciosa. Luego sale del archivo muy derecho, como si fuera él quien se va de vacaciones porque quiere.' },
					{ cap: 61 },
					{ set: { 'flag.b05_fabio_vencido': true } },
					{ say: 'handsome', as: 'Handsome (mensaje)', text: '¿«Bata blanca», «Rama Científica», «vacaciones indefinidas»? Handsome lo ha oído todo por la radio de la Fundación. Handsome llega en el próximo barco. Que nadie toque la bata.' },
					{ call: 'b05_gladio_final' },
				] },
		],

		// =================== GLADIO: CÓDIGO CERO Y EL BARCO A PONI ===================
		b05_gladio_final: [
			{ say: 'gladio', text: 'Ven. —Ya está andando—. Hay una cosa que no está en los papeles.' },
			{ cutscene: { bg: { type: 'lab', wall: '#2a2e34', floor: '#3a4048' }, start: 'dark', frames: [
				{ actors: [{ id: 'gladio', at: 'left', enter: 'left' }], cam: 'still', text: 'Al fondo de los laboratorios hay una sala sin cartel. Gladio la abre con una llave de verdad, de metal, que lleva colgada del cuello. Dentro está oscuro. Algo respira.' },
				{ on: '_c', mon: 'typenull', fx: 'light', cam: 'push', text: 'Una cápsula de cristal. Dentro, un Pokémon de cuatro patas con un casco de hierro atornillado a la cabeza, tan pesado que casi no la puede levantar.' },
				{ say: 'gladio', actors: [{ key: 'gladio', do: 'step' }], text: 'Código Cero. Fabio los fabricaba para pelear contra cosas que vienen del otro lado. Les puso el casco para que no se hicieran daño a sí mismos. Para que obedecieran.' },
				{ say: 'gladio', cam: 'still', fx: 'heartbeat', color: '#5a8ac4', text: 'No es un arma. Es un niño al que nadie le preguntó.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.72, enter: 'right' }], on: 'rio', fx: 'glow', text: 'Gladio abre la cápsula. Código Cero sale despacio. Da un paso. Otro. Se detiene delante de {riolu}. {riolu} pone la palma en el casco, sin miedo, y el aura le pasa por las grietas del hierro.' },
				{ cond: '!(' + LUC + ')', actors: [{ key: '_c', do: 'step' }], text: 'Gladio abre la cápsula. Código Cero sale despacio. Da un paso. Otro. Se detiene delante de ti y te mira a través del casco, con unos ojos que nadie le ha pedido que use.' },
				{ actors: [{ key: '_c', do: 'nod' }, { key: 'gladio', dim: true }], on: '_c', cam: 'pull', fx: 'iris-out', text: 'Código Cero baja la cabeza. No es una reverencia. Es lo más parecido a una pregunta que sabe hacer.' },
			] } },
			{ if: '!' + CERO, then: [
				{ say: 'gladio', text: 'El mío ya no lleva casco. Se lo quitó él cuando estuvo listo. —Mira hacia su Poké Ball—. Este necesita a alguien que no le pida nada. Que solo lo deje estar.' },
				{ say: 'gladio', text: 'Llévatelo. No es un regalo. Es un favor que te pido.' },
				{ pokemon: { sp: 'typenull', lv: 55, nature: 'adamant', ability: 'battlearmor', happy: 120, moves: ['crushclaw', 'triattack', 'ironhead', 'airslash'], ivs: { hp: 28, atk: 30, def: 26, spa: 22, spd: 26, spe: 24 } } },
				{ set: { 'flag.b05_codigo_cero': true } },
				{ say: 'gladio', text: 'Cuando confíe en ti, se romperá el casco. Él solo. No lo fuerces. Nadie puede hacerlo por él.' },
			], else: [
				{ say: 'gladio', text: 'Ya tienes uno. —Te mira, y por primera vez lo hace sin desconfianza—. Entonces ya sabes lo que pesa el casco. Este se queda aquí. Conmigo. Nadie más va a fabricarlos.' },
				{ say: 'gladio', text: 'Toma. Son los discos que Fabio guardaba para «programarlos». Dáselos al tuyo, si quiere. O tíralos al mar. Lo que él prefiera.' },
				{ give: 'fightingmemory' },
				{ give: 'firememory' },
				{ set: { 'flag.b05_codigo_cero_discos': true } },
			] },
			{ go: 'paraiso_aether' },
			{ text: 'En la cubierta, Gladio teclea el código de Fabio en su teléfono. Abajo, en la zona de conservación, se oye un clic. Doce clics. Las jaulas se abren.' },
			{ say: 'gladio', text: 'Kaori se encarga de ellos. Y mis empleados, los que quieran. Los que no, que se vayan con Fabio de vacaciones.' },
			{ say: 'gladio', text: 'El informe dice «emplazamiento 04». Poni. El doctor Wynn ya ha salido hacia allí, con siete cajas que no he autorizado. —Señala un barco blanco en el muelle—. El barco de la Fundación te lleva a **Isla Poni** cuando quieras. Le he dicho al capitán que tú mandas.' },
			{ choice: [
				{ text: '«¿Vienes?»', then: [
					{ say: 'gladio', text: 'No. Alguien tiene que quedarse en esta casa mientras gotea. —Casi sonríe—. Además, tú ya llevas a quien hace falta.' },
				] },
				{ text: '«Gracias, Gladio.»', then: [
					{ say: 'gladio', text: 'No me las des. Tú abriste la puerta. Bueno, tu Pokédex. —Una pausa de dos segundos—. Ya hablaremos de eso. Otro día.' },
				] },
			] },
			{ set: { 'flag.b05_poni': true } },
			{ quest: 'b05_m4', stage: 'hecha', done: true },
			{ quest: 'b05_m5', stage: 'poni' },
			{ say: 'leilani', as: 'Leilani (mensaje)', text: '¡Me han dicho que le has ganado a Fabio! ¡Un pajarito! ¡Bueno, Zyra! Estoy en Kantai, debajo de una montura, como te dije. No he firmado nada. Tampoco he dicho que no. Tengo un mal presentimiento y una llave del catorce. Avísame si vas a Poni.' },
			{ if: 'has("notasmagda")', then: [
				{ set: { 'flag.b05_magda_correo': true } },
				{ text: 'Antes de subir al barco, la Pokédex vibra otra vez. Un correo, sin asunto, firmado con dos iniciales.' },
				{ give: 'correomagda' },
				{ read: 'correomagda' },
				{ intel: { npc: 'magda', text: 'Te escribió desde Kanto: sus cuentas le salieron distintas. Alola pidió un condensador cuarenta veces mayor que el del Nodo 03, «demasiado para un nodo, suficiente para guardar algo». No sabe qué se guarda y no le gusta no saberlo.' } },
			] },
			{ if: PLUMA, then: [
				{ text: 'En la cubierta del barco de la Fundación, atada a la barandilla con un hilo, hay una pluma gris. Debajo, doblada, una nota sin firma.' },
				{ give: 'notaysolde05' },
				{ read: 'notaysolde05' },
			] },
			{ say: 'rotom', text: '¡Bzzt! ¡A Poni! Dicen que allí el cielo se ve mejor. Ya veremos. Yo lo miro todo igual de bien.' },
			{ diary: 'Hoy mi entrenador{|a|e} ha conocido a Código Cero. Lleva un casco muy pesado y no habla, pero mira muchísimo. Gladio dice que es un niño al que nadie le preguntó. Yo le he preguntado cómo estaba. No me ha contestado, pero ha movido una oreja. ¡Eso cuenta! Lo demás fue un día de pasillos blancos. Mañana nos vamos a Poni en un barco que no hace ruido.', cond: 'flag.b01_diario && flag.b05_codigo_cero' },
			{ diary: 'Hoy mi entrenador{|a|e} ha visto a otro Código Cero. Lleva un casco muy pesado y mira muchísimo. Se queda con Gladio, y Gladio dice que nadie va a hacer más como él. Me parece bien. Lo demás fue un día de pasillos blancos. Mañana nos vamos a Poni en un barco que no hace ruido.', cond: 'flag.b01_diario && !flag.b05_codigo_cero' },
			{ intel: { npc: 'gladio', text: 'Venciste a Fabio en el archivo. Gladio lo mandó de «vacaciones indefinidas», abrió las jaulas y te dio el barco de la Fundación a Isla Poni: Calder Wynn salió hacia allí con siete cajas sin autorizar. Vio cómo el escáner te abría la puerta. No ha dicho nada.' } },
			{ set: { 'flag.b05_t2_hecho': true } },
		],

		// =================== ARCHIVO: DETALLES ===================
		b05_archivo_estantes: [
			{ text: 'Estanterías de metal hasta el techo. Carpetas por fechas, de doce años para acá. En el lomo de muchas, una pegatina pequeña: un ocho tumbado, azul y plata.' },
			{ text: 'Una caja tiene la etiqueta «Clínica · Pacientes patrocinados». No la abres. Ya sabes lo que hay en una de sus carpetas.', cond: 'flag.b05_informe' },
		],
		b05_archivo_guardia: [
			{ if: 'flag.b05_fabio_vencido', then: [
				{ say: 'recluta_skull', text: '¡Yo! ¡Ya no hay que vigilar nada! ¡Las jaulas están abiertas! —Pausa—. ¿Me siguen pagando igual? Pregunto por un amigo. El amigo soy yo.' },
			], else: [
				{ say: 'recluta_skull', text: '¡Señor! ¡Señora! ¡Lo que sea! —Se cuadra—. ¡No he visto nada! ¡Nunca veo nada! ¡Es mi mejor cualidad!' },
			] },
		],

		// =================== ZONA DE PRUEBAS: ZYRA ===================
		b05_zyra_pruebas: [
			{ set: { 'flag.b05_zyra_pruebas': true } },
			{ say: 'zyra', text: '¡Ay, ha venido a la zona de pruebas! ¡Qué ilusión! Aquí ponemos en forma a los Pokémon rescatados antes de devolverlos a su casa. Para que salgan con ganas. Con ganas de todo.' },
			{ say: 'zyra', text: 'Nuestros empleados combaten con usted cuando quiera. Son muy buenos. Bueno, son muy aplicados. Que es casi lo mismo. Y si gana tres, le tengo una sorpresa. Una sorpresa de las que pesan poco y valen mucho.' },
			{ say: 'zyra', text: 'Y… —baja la voz— gracias por venir. Por él. Gladio no se lo dirá. Gladio no dice casi nada. Pero ha dado once vueltas a la barandilla. Nadie da once vueltas por alguien que no le importa.' },
		],
		b05_zyra_despues: [
			{ if: 'flag.b05_fabio_vencido', then: [
				{ say: 'zyra', text: 'Gladio se ha sentado. En su silla. La del despacho. Diez minutos. —Se le empañan las gafas—. Perdone. Es la emoción. Diez minutos enteros.' },
			], else: [
				{ say: 'zyra', text: '¡Ánimo! ¡Mucho ánimo! Yo aplaudo a todo el mundo. A usted, un poquito más. No se lo diga a los empleados.' },
			] },
		],
		b05_zyra_segunda: [
			{ say: 'zyra', text: '¡Ay, qué bien que ha vuelto! Tengo que confesarle una cosa. —Baja la voz—. La otra piedra, la de la lata de galletas. Gladio ha dicho que en esta casa ya no se estudia nada que haya llegado de contrabando. Ni siquiera entre galletas.' },
			{ say: 'zyra', text: 'Así que el laboratorio no la quiere, y yo no sé guardar secretos dentro de una caja fuerte. Se me nota en la cara. Tenga. Las piedras esperan muy bien, pero esperan mejor juntas.' },
			{ if: 'flag.b05_scizorita', then: [
				{ give: 'gengarite' },
				{ set: { 'flag.b05_gengarita': true } },
			], else: [
				{ give: 'scizorite' },
				{ set: { 'flag.b05_scizorita': true } },
			] },
			{ say: 'zyra', text: 'Ya están juntas otra vez. Bueno, juntas en su mochila. Que es casi lo mismo.' },
		],
		b05_premio_pruebas: [
			{ say: 'zyra', text: '¡Tres! ¡Tres combates! —Aplaude tanto que se le caen las gafas—. Venga, venga conmigo, que esto no se da delante de la grada.' },
			{ text: 'En un despacho pequeño junto al campo, Zyra abre una caja fuerte. Dentro, una lata vieja de galletas de mantequilla. Dentro de la lata, sobre una servilleta, dos piedras redondas que brillan con un remolino de colores.' },
			{ say: 'zyra', text: 'Se las quitamos a un contrabandista en el muelle, hace un año. Las llevaba así, en la lata de galletas. ¡Imagínese! Una Megapiedra entre galletas.' },
			{ say: 'zyra', text: 'Una se queda aquí, para el laboratorio. La otra… la Fundación estaría encantada. Bueno, yo estaría encantada. La Fundación no lo sabe. Elija usted.' },
			{ choice: [
				{ text: 'La **Scizorita** (Scizor).', then: [
					{ give: 'scizorite' },
					{ set: { 'flag.b05_scizorita': true } },
					{ say: 'zyra', text: 'La de las pinzas. —Sonríe—. Un Scizor megaevolucionado parece una armadura con ganas de abrazar. Bueno, de abrazar fuerte. Muy fuerte.' },
					{ say: 'zyra', text: 'Seguro que el suyo la estaba esperando. Se le nota en la cara que tiene usted un Scizor. Bueno, no se le nota. ¡Pero me alegro!', cond: 'owns("scizor")' },
					{ say: 'zyra', text: 'No sé si tiene usted un Scizor. Pero si un día lo tiene, ya tiene su armadura. Las piedras esperan muy bien.', cond: '!owns("scizor")' },
				] },
				{ text: 'La **Gengarita** (Gengar).', then: [
					{ give: 'gengarite' },
					{ set: { 'flag.b05_gengarita': true } },
					{ say: 'zyra', text: 'La de la sonrisa. —Se estremece un poco—. Un Gengar megaevolucionado se mete medio cuerpo en el suelo y te mira desde abajo. Me da un miedo precioso.' },
					{ say: 'zyra', text: 'Y usted tiene un Gengar, ¿verdad? Lo noto. Hace un poco más de frío a su alrededor. ¡Es un cumplido!', cond: 'owns("gengar")' },
					{ say: 'zyra', text: 'No sé si tiene usted un Gengar. Pero si un día lo tiene, ya tiene su piedra. Las piedras esperan muy bien.', cond: '!owns("gengar")' },
				] },
			] },
		],
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		notanoa04: { name: 'Nota de Noa (jaula 12)', pocket: 'key', desc: 'Un papel de libreta doblado muchas veces, con la letra redonda y cuidadosa de Noa. Estaba pegado con cinta debajo de la manta de una jaula vacía del Paraíso Æther.',
			read: '*(Letra redonda, cuidadosa. Las íes con un puntito muy gordo. Algunas palabras están repasadas dos veces, como si el bolígrafo fallara. O la mano.)*\n\nSi encuentras esto y llevas corbata, déjalo donde estaba. Por favor.\n\nSi no llevas corbata:\n\nEsta vez he contado. Siempre me decían que no me tocaba contar, que yo solo firmaba. Así que firmaba y contaba a escondidas, en la palma de la mano, con boli.\n\nDe Johto salieron **31**. A Kanto llegaron **24**. De Kanto a aquí, **19**. Aquí hay doce jaulas. «Destino: emplazamiento 04». Las etiquetas las escribo yo. Me lo pidieron porque tengo buena letra. Tengo buena letra.\n\nNinguno ha vuelto. Ni uno. Los números no bajan por error. Bajan porque alguien los gasta.\n\nMe mandan con el envío del jueves. No sé adónde. Nunca me dicen adónde. Me dicen «ya verás» y sonríen.\n\nSi un día no contesto, que alguien abra las jaulas. Esta vez lo digo en serio. Ya sé contar.\n\n— N.\n\n*P. D.: Si ves a Bastien, dile que se lea el contrato entero. Hasta la última página. Yo no lo hice con el mío.*' },
		informeaether: { name: 'Informe del Programa Ultra', pocket: 'key', desc: 'Una carpeta blanca con una banda roja que pone «CONFIDENCIAL». La sacaste del armario de Fabio, en el archivo de la Fundación Æther. Gladio tiene copia.',
			read: '**FUNDACIÓN ÆTHER · RAMA CIENTÍFICA**\n**CONFIDENCIAL · Programa Ultra (Lemnis)**\n\n---\n\n**Asunto:** Cesión de lecturas de ultraumbral (9 años, archipiélago de Alola) y uso de instalaciones.\n\n**1. Datos.** Se ceden al Programa Ultra todas las lecturas de umbral de la Fundación. Objetivo declarado: *localizar la Fuente F-04*, entidad lumínica de gran capacidad cuyo rastro aparece en las lecturas desde hace siglos. Resultado: **localizada** (Isla Poni, sur).\n\n**2. Instalaciones.** La zona de conservación se habilita como **almacén de tránsito** para material biológico de otras regiones (desplazados). Destino: **emplazamiento 04**. Función del material: *estabilizar la extracción durante el arranque del nodo*.\n\n**3. Complemento.** Se suministrará el complemento vitamínico del lote 04 al material en tránsito, para mantenerlo tranquilo y receptivo.\n\n**4. Equipo.** Condensadores de gran capacidad (siete unidades, montaje externo), con destino al emplazamiento 04.\n\n**5. Contrapartida.** Donativo anual a la Fundación. *Discreción por ambas partes.*\n\n---\n\nAutoriza: *Fabio*, Jefe de la Rama Científica *(firma con rúbrica larguísima)*\nRecibe: *Dr. C. Wynn*, Director del Programa Ultra\n\nCopia a Dirección (Ω)' },
		correomagda: { name: 'Correo de Magda', pocket: 'key', desc: 'Un correo impreso sin asunto. Sin saludos ni despedidas. Firmado con dos iniciales.',
			read: '*(Sin asunto.)*\n\nUsted no me ha escrito. Le escribo yo. No es mi costumbre.\n\nLe dije que, si sus cuentas le salían distintas, me escribiera. Han sido las mías.\n\n**Dato 1.** La reparación del Nodo 03 necesita un condensador de capacidad **C**.\n**Dato 2.** Alola ha pedido siete condensadores de capacidad **40 C** cada uno.\n**Dato 3.** Para arrancar un nodo no hace falta tanto. Para *guardar* algo, sí.\n\nNo sé qué se guarda. No figura en ningún documento que yo pueda leer. Es la primera vez en once años que hay un documento que yo no puedo leer.\n\nNo me gusta no saber. La eficiencia es una forma de bondad, pero solo si sabes lo que estás haciendo eficiente.\n\nNo le pido que me conteste. Le pido que haga las cuentas.\n\n— M. I.\n\n*P. D.: Tengo copia. Siempre tengo copia.*' },
		notaysolde05: { name: 'Nota sin firma (barco a Poni)', pocket: 'key', desc: 'Una nota doblada que estaba atada, con una pluma gris, a la barandilla del barco de la Fundación.',
			read: 'Pluma:\n\nEn Alola no tenemos a nadie. Aún.\n\nAquí no hay tejados altos. Todo es playa, cristal y barcos. Mala tierra para mirar desde arriba. Así que mira tú por nosotros: desde el mástil, desde un acantilado, desde donde puedas.\n\nEn el sur de Poni hay algo que brilla de noche y no es la luna. Alguien lleva semanas subiendo cajas. Las cajas siempre llevan a quien firma. Pero no siempre a quien decide.\n\nMira quién te mira.\n\n*(Sin firma. Una pluma gris, atada con un hilo.)*' },
	},

	// =====================================================================
	// MISIONES PEQUEÑAS
	// =====================================================================
	quests: {},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b05_aether_invernadero: {
			name: 'El invernadero de la conservación', icon: '🧺', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'huerto', hint: 'Sacude las ramas con cuidado y recoge con la cesta. Aquí todo cae muy ordenado, menos las bayas pochas.' },
			ask: 'Árboles bajos de bayas bajo un techo de cristal, en filas exactas. Un cartel: «Alimento para los rescatados. Coja usted lo que necesite». Un Comfey te mira desde una rama, colgando.',
			text: 'Recoges lo que el invernadero da hoy. El Comfey te pone una flor en el pelo y se va. No sabes si es un regalo o una multa.',
			wait: 'El invernadero está recién cosechado. Las ramas, peladas en filas exactas. Hasta para estar vacío es ordenado.',
			table: [
				{ id: 'oranberry', w: 16, n: [1, 3] }, { id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'pechaberry', w: 12, n: [1, 2] },
				{ id: 'aspearberry', w: 10, n: [1, 2] }, { id: 'kelpsyberry', w: 8, n: [1, 1] }, { id: 'hondewberry', w: 8, n: [1, 1] },
				{ id: 'miracleseed', w: 4, n: [1, 1] },
				{ id: 'lumberry', w: 4, n: [1, 1], rare: true }, { id: 'leftovers', w: 1, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		jefe_fabio: {
			name: 'Fabio, en el archivo', npc: 'fabio', trainer: 'fabio_1', type: 'Psychic', rec: 60,
			cond: 'flag.b05_fabio_archivo',
			info: [
				{ text: 'Jefe de la Rama Científica de Æther. Tipo **Psíquico**. Muy seguro de sí mismo. Demasiado.' },
				{ text: '5 Pokémon, hasta el nivel 60. Su **Alakazam** lleva una Megapiedra.' },
				{ text: '**Siniestro**, **Fantasma** y **Bicho** le hacen daño. En la zona de conservación hay Mimikyu y, de noche, Sableye.' },
				{ text: 'Gladio te deja curar antes del combate.' },
				{ cond: 'flag.b05_fabio_vencido', text: '✔ Vencido. Fabio, de vacaciones indefinidas.' },
			],
		},
		aether_pruebas_entreno: {
			name: 'Zona de pruebas de Æther (entrenamiento)', npc: 'zyra', type: 'Steel', rec: 60,
			cond: 'visited("aether_pruebas")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **60**: empleados de la Fundación con Pokémon de laboratorio.' },
				{ text: 'Zyra tiene una sorpresa para quien gane tres combates. «De las que pesan poco y valen mucho».' },
			],
		},
		rival_francine: {
			name: 'Francine, en la conservación', npc: 'francine', trainer: 'francine_1', type: 'Poison', rec: 59,
			cond: 'flag.b05_francine_vista',
			info: [
				{ text: 'Ex administradora del Team Skull. Combate opcional; te deja curar antes.' },
				{ text: '5 Pokémon de tipo **Veneno**, hasta el nivel 59. Su Salazzle sale la última.' },
				{ cond: 'beat("francine_1")', text: '✔ Ganado. Los chicos lo han apuntado. No saben dónde.' },
			],
		},
		rival_bastien_b5: {
			name: 'Bastien, en la clínica', npc: 'bastien', trainer: 'bastien_6', type: 'Water', rec: 60,
			cond: 'flag.b05_bastien_aether',
			info: [
				{ text: 'Combate opcional. Te deja curar antes.' },
				{ text: '5 Pokémon, hasta el nivel 60. **Greninja** sale el último.' },
				{ cond: 'beat("bastien_6")', text: '✔ Ganado. Lo ha apuntado en su página nueva.' },
			],
		},
	},
};
