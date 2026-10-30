// Pueblo Cirio · historia por capítulos (pedido de Mario, 2026-10-30: «pueblo maldito por capítulos»).
// Motor: app/js/capitulos.js (un capítulo por semana real). Plan con la verdad y los capítulos siguientes:
// secreto/bloques/p16-cirio-plan.md. Nada de la trama principal (ni Lemnis, ni Fisuras, ni Puertas, ni Rotom).
//
// Capítulo 1 · «La nana» (~1 h). Se ve con flag.b04_fin. Llega por el Buzón (carta de Morti, cirio_carta) o
// llegando sin carta por el camino del lago de Ciudad Malva (Senda de Cirio, 6 tramos con niebla).
// Misión cirio_c1: ir → vecinos (4 testimonios, `parts`) → noche (dormir en la posada) → muelle (tu vela) →
//   rastro (gotas de cera; rastreo con {riolu} o a pie) → vela (decisión) → hecha.
// Decisión (excluyentes; el capítulo 2 las lee):
//   flag.cirio_c1_costumbre  encendiste tu vela y la dejaste en el muelle (Benigna)
//   flag.cirio_c1_prueba     te la guardaste como prueba (sigue en la mochila: velacirio) (Abril)
//   flag.cirio_c1_guardia    se la diste a Abril e hicisteis guardia en el faro: visteis una luz en el lago (Hilario)
// Otros flags: cirio_carta, cirio_llegada, cirio_t_consuelo/_hilario/_abril/_benigna (vars.cirio_testigos),
//   cirio_noche, cirio_velas, cirio_rastro_visto, cirio_rastro, cirio_c1_fin. Capítulo terminado: { chapter: done 1 }.
// NPCs nuevos: consuelo (posadera), hilario (barquero), abril (farera), benigna (guardesa de la cerería).

const LUC = '(inParty("riolu") || inParty("lucario"))';
const Q = 'quest.cirio_c1';
const LLEGADA = 'flag.cirio_llegada';
const ESPERA = "capituloHecho('cirio', 1) && !capitulo('cirio', 2)";
const BG_CIRIO = { type: 'town', fog: true, roofs: ['#4a4a5a', '#5a4a3a', '#3a4a52', '#6a5a4a'], far: '#9aa6b4', hill: '#4a5a52', ground: '#7a7466' };
const BG_MUELLE = { type: 'coast', fog: true, far: '#a8b2be', ground: '#6a6458' };

// Un testimonio más; al cuarto, la misión pasa a «noche»
const TESTIGO = [
	{ set: { 'vars.cirio_testigos': '+1' } },
	{ if: 'vars.cirio_testigos >= 4 && ' + Q + ' == "vecinos"', then: [
		{ quest: 'cirio_c1', stage: 'noche' },
		{ text: 'Ya has oído a los cuatro. Cada uno te ha contado una noche distinta, pero todas acaban igual: alguien duerme, alguien canta, y por la mañana falta algo.' },
		{ text: 'Consuelo dijo que te guardaba el cuarto del fondo. Quizá la única forma de entenderlo sea dormir aquí.' },
	] },
];

export default {
	// =====================================================================
	// PERSONAJES
	// =====================================================================
	npcs: {
		// Posadera, ~55. Habla mucho y rápido, cariñosa, refranes a medias, «mi vida», «ay, no». Su Furret le roba el sitio caliente.
		consuelo: { name: 'Consuelo Ibarra', title: 'Posadera de La Mecha', look: { hair: 'bun', hairColor: '#5a3a2a', streak: '#b8b0a8', eyes: '#4a2a1a', outfit: '#a8483a', outfit2: '#efe2c8', skin: 3, eyesStyle: 'happy', mouth: 'open', acc: 'flower', collar: 'cardigan', build: 'broad', age: 'adult' } },
		// Barquero, ~78. Frases de tres palabras, habla del tiempo para no hablar de otra cosa. Nunca dice «no sé»: «el lago sabrá».
		hilario: { name: 'Don Hilario', title: 'Barquero del lago', look: { hair: 'cap', hairColor: '#d8d4cc', capColor: '#2e3a4a', eyes: '#3a3a3a', outfit: '#3a4a5a', outfit2: '#c9b48a', skin: 2, eyesStyle: 'sleepy', mouth: 'flat', acc: 'beard', beardColor: '#d8d4cc', brows: 'thick', nose: 'hook', age: 'old' } },
		// Farera, ~31. Volvió de Trigal hace un mes para reabrir el faro de su abuelo. Escéptica, irónica, contesta con preguntas.
		abril: { name: 'Abril Lucero', title: 'Farera del lago', look: { hair: 'ponytail', hairColor: '#2a2a32', streak: '#d8a24a', eyes: '#3a5a6a', outfit: '#d8a24a', outfit2: '#2e3a4a', skin: 1, eyesStyle: 'sharp', mouth: 'smile', acc: 'freckles', collar: 'jacket', build: 'narrow', age: 'adult' } },
		// Guardesa de la cerería, ~68, hermana del cerero. Usted, frases exactas, vocabulario de oficio. Cree que el fantasma es él.
		benigna: { name: 'Benigna Arnau', title: 'Guardesa de la cerería', look: { hair: 'bun', hairColor: '#cfc8c0', eyes: '#2a2a3a', outfit: '#2a2a32', outfit2: '#e8dcc0', skin: 0, eyesStyle: 'normal', mouth: 'flat', acc: 'glasses', glassColor: '#6a5a3a', collar: 'shirt', head: 'long', age: 'old' } },
	},

	// =====================================================================
	// HISTORIA POR CAPÍTULOS
	// =====================================================================
	serials: {
		cirio: { name: 'Pueblo Cirio', loc: 'pueblo_cirio', gap: 7, written: 1, chapters: [
			{ n: 1, title: 'La nana' },
			{ n: 2, title: 'Cera trenzada' },
			{ n: 3, title: 'Luz en el agua' },
			{ n: 4, title: 'Lo que calla el lago' },
			{ n: 5, title: 'La Velada' },
		] },
	},

	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== SENDA DE CIRIO ===================
		senda_cirio: {
			name: 'Senda de Cirio', short: 'Senda de Cirio', region: 'johto', kind: 'route', map: { x: 74, y: 54 },
			bg: { type: 'forest', fog: true, far: '#a8b2be', ground: '#5a6a4a', hill: '#4a5a4a' },
			desc: 'Un camino de tierra que sale de Malva hacia el este, entre pinos y helechos, y baja poco a poco hacia un lago que no se ve. Se nota antes de verlo: el aire se vuelve frío y húmedo, y la niebla empieza a subir por los troncos.\n\nCada tantos pasos hay un mojón de piedra con un hueco tallado. Dentro de algunos queda un culo de vela.',
			descNight: 'De noche, la senda es un pasillo blanco. La niebla se traga la linterna a dos pasos. Los mojones de piedra son la única forma de saber que sigues en el camino, y alguno, muy de vez en cuando, tiene una vela encendida que nadie ha puesto.',
			links: ['malva', 'pueblo_cirio'],
			hidden: '!flag.b04_fin',
			enterCond: 'flag.b04_fin',
			blockedMsg: 'Un leñador de Malva te corta el paso con el hacha al hombro. «¿Al lago? Con esta niebla, ni lo pienses. Ve a lo tuyo y, cuando tengas menos prisa, vuelve».',
			mapNote: 'Niebla del lago · médium, pescador y sabio',
			rumors: [
				{ text: 'Los mojones de la Senda de Cirio tienen un hueco para una vela. Antes las encendían los del pueblo una vez al año. Dicen que ya no las enciende nadie. Dicen.' },
				{ text: 'Por la senda pasan Stantler en manada al amanecer. Si te quedas quieto entre la niebla, dicen, sus cuernos te enseñan cosas que no están. Mejor no quedarse quieto.' },
				{ text: 'Hay un Misdreavus que de noche ronda los mojones de la senda. O varios. O ninguno: cuando la niebla canta, cuesta saber qué es qué.' },
			],
			route: {
				from: 'malva', to: 'pueblo_cirio', length: 6, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Al dejar las últimas casas de Malva, un poste torcido: «PUEBLO CIRIO · por la senda del lago». Alguien ha dibujado debajo, con tiza, una velita.' }],
					1: [
						{ trainer: 'cirio_herminia' },
						{ spot: { action: { gather: 'cirio_senda_bayas' } }, label: 'Los arbustos del mojón', icon: '🫐', sub: 'Bayas mojadas de niebla', new: '!flag.rec_cirio_senda_bayas' },
					],
					2: [
						{ text: 'La niebla sube de golpe. De repente no ves los pinos, solo sus troncos más cercanos, como columnas de una casa que no existe. Huele a resina y a algo dulce, como a miel quemada.' },
						{ item: 'hyperpotion', hidden: true },
					],
					3: [
						{ trainer: 'cirio_damaso', optional: true, label: 'Un pescador que vuelve con la caña al hombro' },
						{ item: 'duskball' },
					],
					4: [
						{ terrain: 'water' },
						{ text: 'A la derecha, entre los juncos, por fin el agua: gris, quieta, sin otra orilla. El lago se pierde en la niebla. Muy lejos, en algún sitio, suena una campana. Una sola vez.' },
						{ script: 'cirio_mojon', once: true, mark: true },
					],
					5: [
						{ trainer: 'cirio_celedonio', optional: true, label: 'Un sabio medita sentado en un mojón' },
						{ item: 'spelltag', hidden: true },
					],
					6: [{ text: 'Los pinos se apartan y aparecen tejados oscuros, mojados, pegados al agua. En cada ventana hay una vela encendida. Aunque sea de día. **Pueblo Cirio**.' }],
				},
				encounters: {
					grass: [
						{ sp: 'stantler', lv: [50, 53], w: 20, time: 'day' },
						{ sp: 'girafarig', lv: [50, 52], w: 12, time: 'day' },
						{ sp: 'ledian', lv: [50, 52], w: 10, time: 'day' },
						{ sp: 'yanma', lv: [50, 52], w: 10, time: 'day' },
						{ sp: 'noctowl', lv: [50, 53], w: 22, time: 'night' },
						{ sp: 'haunter', lv: [50, 53], w: 18, time: 'night' },
						{ sp: 'murkrow', lv: [50, 52], w: 12, time: 'night' },
						{ sp: 'ariados', lv: [50, 52], w: 10, time: 'night' },
						{ sp: 'misdreavus', lv: [51, 53], w: 4, time: 'night' },
						{ sp: 'quagsire', lv: [50, 52], w: 10 },
					],
					water: [
						{ sp: 'golduck', lv: [50, 53], w: 30 },
						{ sp: 'poliwhirl', lv: [50, 52], w: 26 },
						{ sp: 'quagsire', lv: [50, 53], w: 26 },
						{ sp: 'azumarill', lv: [51, 53], w: 12 },
						{ sp: 'gyarados', lv: [52, 54], w: 3 },
					],
				},
			},
		},

		// =================== PUEBLO CIRIO ===================
		pueblo_cirio: {
			name: 'Pueblo Cirio', short: 'Cirio', region: 'johto', kind: 'town', map: { x: 84, y: 60 },
			bg: BG_CIRIO,
			desc: 'Un pueblo de casas bajas de piedra gris y tejados de pizarra, apretado contra la orilla de un lago que no tiene otra orilla: la niebla se la come. Calles de tierra, redes tendidas, un muelle largo de tablones y, en la punta del cabo, un **faro** blanco.\n\nEn cada ventana arde una vela, de día y de noche. Nadie te sabe decir desde cuándo. Nadie te sabe decir por qué no las apagan.',
			descNight: 'De noche, Cirio es una fila de puntos amarillos flotando en la niebla. El faro barre el lago despacio, y en cada vuelta la luz se queda un instante enredada en algo, muy lejos, en mitad del agua. Las puertas se cierran pronto. Se oye el lago respirar contra los tablones del muelle.',
			descs: [
				{ cond: 'flag.cirio_c1_costumbre', text: 'Pueblo Cirio, gris y pegado al agua, con una vela en cada ventana. Al final del muelle, entre las de las casas, arde una con tu nombre. Benigna Arnau pasa cada mañana a mirarla, como si fuera una más del pueblo. Quizá ya lo es.' },
				{ cond: 'flag.cirio_c1_prueba', text: 'Pueblo Cirio, gris y pegado al agua, con una vela en cada ventana. Los vecinos te miran pasar con una mezcla de respeto y de reproche: dicen que eres quien se guardó su vela en la mochila, sin encender. En Cirio eso no se había hecho nunca.' },
				{ cond: 'flag.cirio_c1_guardia', text: 'Pueblo Cirio, gris y pegado al agua, con una vela en cada ventana. Desde que hicisteis guardia, la luz del faro tarda un poco más al pasar por el centro del lago. Abril jura que es casualidad. Don Hilario ha dejado de saludarla.' },
			],
			mapNote: 'Velas en las ventanas · la posada, el muelle, el faro y la cerería',
			onEnter: [{ script: 'cirio_llegada', cond: '!flag.cirio_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Colmado del pueblo', sub: 'Redes, velas y cosas de botica', action: { shop: 'tienda_1' } },
				{ label: 'Posada La Mecha', sub: 'Una puerta verde con un farol encendido', icon: '🛏️', cond: LLEGADA, new: '!flag.cirio_t_consuelo || ' + Q + ' == "noche"', action: { go: 'posada_cirio' } },
				{ label: 'El muelle', sub: 'Tablones largos que se pierden en la niebla', icon: '⚓', cond: LLEGADA, new: '!flag.cirio_t_hilario || ' + Q + ' == "muelle" || ' + Q + ' == "rastro" || ' + Q + ' == "vela"', action: { go: 'muelle_cirio' } },
				{ label: 'El faro del lago', sub: 'Blanco, en la punta del cabo', icon: '🗼', cond: LLEGADA, new: '!flag.cirio_t_abril', action: { go: 'faro_cirio' } },
				{ label: 'La cerería de los Arnau', sub: 'Persianas bajadas desde hace diez años', icon: '🕯️', cond: LLEGADA, new: '!flag.cirio_t_benigna', action: { go: 'cereria_cirio' } },
				{ label: 'La plaza, al caer la niebla', sub: 'Alguien te espera junto a la fuente', icon: '🌫️', cond: ESPERA, talk: [
					{ cond: 'flag.cirio_c1_costumbre', script: 'cirio_espera_costumbre' },
					{ cond: 'flag.cirio_c1_prueba', script: 'cirio_espera_prueba' },
					{ script: 'cirio_espera_guardia' },
				] },
			],
			rumors: [
				{ text: 'En Cirio hubo una fiesta que se llamaba la Velada: una noche al año, todo el pueblo encendía velas en el lago por los que ya no estaban. Hace diez años dejó de hacerse. La misma noche en que desapareció el cerero.' },
				{ text: 'Las velas de las ventanas de Cirio no se apagan nunca. Si preguntas, unos dicen que es costumbre. Otros dicen que es para que alguien sepa volver.' },
				{ text: 'La posadera de Cirio tiene un Furret que duerme en la cama del huésped antes que el huésped. Dicen que es para calentarla. Dicen que es porque le da la gana.' },
				{ cond: 'flag.cirio_noche', text: 'Dicen que quien duerme en Cirio oye una nana. Que no da miedo. Que da pena. Y que por la mañana, en el muelle, hay una vela más.' },
			],
		},

		// =================== POSADA LA MECHA ===================
		posada_cirio: {
			name: 'Posada La Mecha', parent: 'pueblo_cirio', kind: 'building',
			bg: { type: 'indoor', wall: '#8a6a4a', floor: '#5a4030' },
			desc: 'Un comedor de vigas bajas, seis mesas, una chimenea que siempre está encendida y un olor a caldo que no se va nunca. En la entrada, una **pizarra** con los nombres de los huéspedes escritos con tiza. Al fondo, una escalera estrecha sube a los cuartos.\n\nEn el alféizar de cada ventana, una vela. En la mejor silla junto al fuego, un Furret enroscado que no piensa moverse.',
			descNight: 'De noche, la posada cruje como un barco. La chimenea queda en brasas y el Furret se sube a la escalera, a vigilar. Desde los cuartos de arriba se oye el lago. Y, algunas noches, algo más.',
			mapNote: 'Consuelo, la posadera · la pizarra de huéspedes',
			spots: [
				{ label: 'Consuelo', sub: 'Remueve una olla y habla con el Furret', icon: '🍲', new: '!flag.cirio_t_consuelo', talk: [
					{ cond: '!flag.cirio_t_consuelo', script: 'cirio_consuelo_1' },
					{ cond: 'flag.cirio_c1_fin', script: 'cirio_consuelo_despues' },
					{ script: 'cirio_consuelo_gen' },
				] },
				{ label: 'Subir a dormir', sub: 'El cuarto del fondo, el que da al lago', icon: '🌙', cond: Q + ' == "noche"', new: 'true', talk: [{ script: 'cirio_noche' }] },
				{ label: 'La pizarra de huéspedes', sub: 'Nombres escritos con tiza', icon: '🖍️', cond: 'flag.cirio_t_consuelo', talk: [{ script: 'cirio_pizarra' }] },
			],
			rumors: [
				{ text: 'Consuelo apunta a cada huésped en la pizarra de la entrada con una frase al lado. «Para no olvidarme de quién es quién», dice. Don Hilario lee la pizarra cada tarde, cuando trae el pescado para la cena. Dice que para saber cuántas bocas hay que llenar.' },
			],
		},

		// =================== EL MUELLE ===================
		muelle_cirio: {
			name: 'El muelle de Cirio', parent: 'pueblo_cirio', kind: 'area',
			bg: BG_MUELLE,
			desc: 'Un muelle largo de tablones negros, con barcas amarradas a los dos lados y redes secándose en postes. En la punta cuelga una **campana** de bronce verde para llamar al barquero. Más allá, solo niebla y agua.\n\nAl pie de la campana, en fila sobre los tablones, hay velas. Algunas consumidas hasta el plato. Otras, recién apagadas.',
			descNight: 'De noche, el muelle es lo último que se ve antes de la niebla. La campana se mueve sola con el aire y a veces suena. Las barcas chocan entre sí, despacio, como si hablaran.',
			mapNote: 'Don Hilario · la campana · la fila de velas · pesca',
			encounters: {
				water: [
					{ sp: 'golduck', lv: [50, 53], w: 28 },
					{ sp: 'poliwhirl', lv: [50, 52], w: 24 },
					{ sp: 'quagsire', lv: [50, 53], w: 24 },
					{ sp: 'azumarill', lv: [51, 53], w: 14 },
					{ sp: 'gyarados', lv: [52, 54], w: 4 },
				],
			},
			spots: [
				{ label: 'Don Hilario', sub: 'Sentado en su barca, sin remar', icon: '🚣', new: '!flag.cirio_t_hilario', talk: [
					{ cond: '!flag.cirio_t_hilario', script: 'cirio_hilario_1' },
					{ cond: 'flag.cirio_c1_fin', script: 'cirio_hilario_despues' },
					{ script: 'cirio_hilario_gen' },
				] },
				{ label: 'La fila de velas', sub: 'Al pie de la campana', icon: '🕯️', new: Q + ' == "muelle"', talk: [
					{ cond: Q + ' == "muelle"', script: 'cirio_velas' },
					{ script: 'cirio_velas_gen' },
				] },
				{ label: 'Las gotas de cera', sub: '{riolu} ya está agachado junto a ellas', icon: '🐾', cond: Q + ' == "rastro" && ' + LUC, new: 'true', talk: [{ script: 'cirio_rastro' }] },
				{ label: 'Las gotas de cera', sub: 'Salen del muelle hacia la orilla', icon: '🐾', cond: Q + ' == "rastro" && !' + LUC, new: 'true', talk: [{ script: 'cirio_rastro_sin_aura' }] },
				{ label: 'Tu vela', sub: 'Decide qué hacer con ella', icon: '🕯️', cond: Q + ' == "vela"', new: 'true', talk: [{ script: 'cirio_decision' }] },
				{ label: 'La campana del muelle', sub: 'Bronce verde, una cuerda deshilachada', icon: '🔔', talk: [{ script: 'cirio_campana' }] },
				{ label: 'Pescar desde los tablones', sub: 'El agua está quieta y gris', icon: '🎣', new: '!flag.rec_cirio_muelle', action: { gather: 'cirio_muelle' } },
				{ label: 'Asomarse al agua', sub: 'Algo se mueve bajo los tablones', icon: '💧', action: { explore: 'water' } },
			],
			rumors: [
				{ text: 'Don Hilario lleva sesenta años de barquero en Cirio. Ya casi no lleva a nadie. Pero cada madrugada, antes de que salga el sol, su barca no está en el muelle.' },
				{ text: 'La campana del muelle se toca para llamar al barquero. Si suena y nadie la ha tocado, dicen los viejos, es que alguien quiere volver.' },
			],
		},

		// =================== EL FARO ===================
		faro_cirio: {
			name: 'El faro del lago', parent: 'pueblo_cirio', kind: 'building',
			bg: { type: 'tower', wall: '#d8d4c8', floor: '#6a5a4a' },
			desc: 'Una torre blanca y gruesa en la punta del cabo, con una escalera de caracol de hierro y, arriba, la **linterna**: una lente enorme que gira despacio. Abajo, la casa del farero: una mesa con mapas del lago, un cuaderno abierto y una taza de café frío.\n\nEn la pared, una foto de un hombre mayor con gorra de marino. Debajo, escrito a lápiz: «Ginés. 40 años sin dejar el lago a oscuras».',
			descNight: 'De noche, el faro zumba. La lente gira, la luz barre el lago y, durante un segundo, pinta la niebla de amarillo. Abril sube y baja la escalera con una linterna en la boca y un Lanturn que le alumbra los escalones.',
			mapNote: 'Abril Lucero, la farera · el cuaderno del faro',
			spots: [
				{ label: 'Abril', sub: 'Engrasa el mecanismo con la manga arremangada', icon: '🔧', new: '!flag.cirio_t_abril', talk: [
					{ cond: '!flag.cirio_t_abril', script: 'cirio_abril_1' },
					{ cond: 'flag.cirio_c1_fin', script: 'cirio_abril_despues' },
					{ script: 'cirio_abril_gen' },
				] },
				{ label: 'La foto de la pared', sub: 'Un hombre mayor con gorra de marino', icon: '🖼️', talk: [{ script: 'cirio_foto_gines' }] },
			],
			rumors: [
				{ text: 'El faro de Cirio estuvo apagado seis años, desde que murió el viejo farero. Hace un mes volvió a encenderse. Lo encendió su nieta, que vino de Trigal con una caja de herramientas y un Lanturn.' },
			],
		},

		// =================== LA CERERÍA ===================
		cereria_cirio: {
			name: 'La cerería de los Arnau', parent: 'pueblo_cirio', kind: 'building',
			bg: { type: 'indoor', wall: '#6a5a48', floor: '#3a3028' },
			desc: 'Una tienda estrecha con las persianas bajadas. Por la rendija de la puerta se ven estantes llenos de velas cubiertas con sábanas, una pila de moldes de latón y un caldero frío. Huele a cera vieja y a polvo.\n\nEn el escaparate, detrás del cristal sucio, sigue pegado un **cartel** amarillento. En el escalón, una mujer mayor barre un polvo que no hay.',
			descNight: 'De noche, la cerería es la única casa de Cirio sin vela en la ventana. Benigna dice que, si la encendiera, sería darlo por muerto. Así que la deja a oscuras. Y en la oscuridad, a veces, el caldero frío hace un ruidito.',
			mapNote: 'Benigna Arnau · cerrada desde la última Velada',
			spots: [
				{ label: 'Benigna Arnau', sub: 'Barre el escalón de la cerería', icon: '🧹', new: '!flag.cirio_t_benigna', talk: [
					{ cond: '!flag.cirio_t_benigna', script: 'cirio_benigna_1' },
					{ cond: 'flag.cirio_c1_fin', script: 'cirio_benigna_despues' },
					{ script: 'cirio_benigna_gen' },
				] },
				{ label: 'El escaparate', sub: 'Un cartel amarillento detrás del cristal', icon: '🪟', talk: [{ script: 'cirio_escaparate' }] },
			],
			rumors: [
				{ text: 'Benigna Arnau abre la cerería cada jueves, quita el polvo de las velas de su hermano y la vuelve a cerrar. Lleva diez años haciéndolo. Nunca ha vendido una.' },
			],
		},
	},

	// =====================================================================
	// PARCHES (Ciudad Malva: la entrada al camino del lago)
	// =====================================================================
	patches: {
		malva: {
			spots: [
				{ label: 'El camino del lago', sub: 'Sale hacia el este, entre pinos y niebla', icon: '🌫️', cond: 'flag.b04_fin', new: '!visited("senda_cirio")', action: { go: 'senda_cirio' } },
			],
			rumors: [
				{ cond: 'flag.b04_fin', text: 'Al este de Malva, pasando el pinar, hay un lago con niebla y un pueblo pequeño que se llama Cirio. Los leñadores no van por allí de noche. Dicen que se oye cantar.' },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES (genéricos; la senda)
	// =====================================================================
	trainers: {
		cirio_herminia: { name: 'Herminia', cls: 'Médium', ai: 2,
			team: [{ sp: 'haunter', lv: 52 }, { sp: 'hypno', lv: 53 }],
			intro: 'Vienes al lago. Lo sabía. Lo he soñado. Bueno, he soñado con un lago y con alguien. Podías ser tú. Podía ser el panadero. ¡En guardia!',
			win: 'Esto no lo había soñado. Me lo apunto para soñarlo esta noche y que no me pille otra vez.',
			look: { hair: 'long', hairColor: '#3a2a4a', outfit: '#5a3a6a', outfit2: '#e8dcc0', skin: 1, eyesStyle: 'sleepy', mouth: 'flat', acc: 'bandana' } },
		cirio_damaso: { name: 'Dámaso', cls: 'Pescador', ai: 2,
			team: [{ sp: 'golduck', lv: 53 }, { sp: 'poliwrath', lv: 53 }],
			intro: 'Tres horas en el lago y ni un mordisco. Con esta niebla los peces no ven el anzuelo. Ni yo el corcho. ¿Combatimos? Algo tengo que sacar hoy.',
			win: 'Ni peces ni combate. Mañana pruebo con la caña de mi suegro. Esa sí que pesca. Será porque se la cuida él.',
			look: { hair: 'cap', hairColor: '#4a3a2a', capColor: '#3a5a4a', outfit: '#5a6a4a', outfit2: '#d8c89a', skin: 3, eyesStyle: 'normal', mouth: 'grin', acc: 'beard' } },
		cirio_celedonio: { name: 'Celedonio', cls: 'Sabio', ai: 2,
			team: [{ sp: 'xatu', lv: 53 }, { sp: 'noctowl', lv: 54 }],
			intro: 'Medito en los mojones de la senda. Cada uno es una vela que alguien dejó de encender. Pesan mucho, para estar vacíos. Muéstrame si tu equipo pesa más.',
			win: 'Ligero de pies y pesado de golpes. Así se camina por la niebla. Sigue: el pueblo está cerca. Siempre lo ha estado.',
			look: { hair: 'bald', hairColor: '#2a2a2a', outfit: '#4a3a2a', outfit2: '#c9a66b', skin: 2, eyesStyle: 'sleepy', mouth: 'smile', acc: '' } },
	},

	// =====================================================================
	// MISIONES
	// =====================================================================
	quests: {
		cirio_c1: { name: 'Pueblo Cirio · La nana', type: 'side', est: 60,
			stages: {
				ir: '**Morti** te pide que vayas a **Pueblo Cirio**, a orillas de un lago al este de **Ciudad Malva**. El camino sale de Malva hacia el este.',
				vecinos: 'En **Pueblo Cirio** falta algo de cada casa cada mañana. Pregunta a los cuatro vecinos que te pueden contar qué pasa.',
				noche: 'Ya oíste a los cuatro. Sube a dormir a la **Posada La Mecha**, en **Pueblo Cirio**, y escucha la noche.',
				muelle: 'Esta mañana te falta la cinta de Consuelo. Ve al **muelle** de **Pueblo Cirio**: allí aparecen las velas.',
				rastro: 'Hay gotas de cera desde la fila de velas hacia la orilla. Síguelas desde el **muelle** de **Pueblo Cirio**.',
				vela: 'Tienes tu vela en la mano. Decide qué hacer con ella en el **muelle** de **Pueblo Cirio**.',
				hecha: 'Capítulo 1 terminado. **Pueblo Cirio** recordará lo que hiciste con tu vela.',
			},
			parts: { title: 'Lo que cuentan en Cirio', var: 'cirio_testigos', items: [
				{ label: 'Consuelo, la posadera', where: 'posada_cirio', done: 'flag.cirio_t_consuelo', hint: 'Lleva la **Posada La Mecha**, junto a la plaza.' },
				{ label: 'Don Hilario, el barquero', where: 'muelle_cirio', done: 'flag.cirio_t_hilario', hint: 'Está en su barca, en el **muelle**, sin remar.' },
				{ label: 'Abril, la farera', where: 'faro_cirio', done: 'flag.cirio_t_abril', hint: 'Arreglando el **faro**, en la punta del cabo.' },
				{ label: 'Benigna, la de la cerería', where: 'cereria_cirio', done: 'flag.cirio_t_benigna', hint: 'Barre el escalón de la **cerería**, que está cerrada.' },
			] },
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		cirio_senda: {
			name: 'Senda de Cirio', type: 'Ghost', rec: 54,
			cond: 'visited("senda_cirio")',
			info: [
				{ text: 'Un camino con niebla entre Malva y **Pueblo Cirio**. Una médium te corta el paso; un pescador y un sabio esperan por si quieres combate.' },
				{ text: 'De noche salen **Fantasma**, **Siniestro** y **Volador**; de día, **Normal**, **Psíquico** y **Bicho**. En el agua, **Agua**.' },
				{ text: 'Para la noche, algo de tipo **Siniestro** o **Fantasma** va servido. Para el lago, **Eléctrico** o **Planta**.' },
			],
		},
		cirio_misterio: {
			name: 'Las velas de Cirio', npc: 'consuelo', type: 'Ghost', rec: 54,
			cond: 'visited("pueblo_cirio")',
			info: [
				{ text: 'Una historia por capítulos, no un combate. Cada noche, en **Pueblo Cirio**, alguien canta una nana y, por la mañana, falta algo pequeño de cada casa.' },
				{ text: 'Escucha a los cuatro vecinos. Ninguno miente del todo. Ninguno lo cuenta todo.' },
				{ cond: 'flag.cirio_noche', text: 'Lo que falta vuelve en el muelle, atado a una vela con un nombre grabado. Fíjate en los nombres.' },
				{ cond: 'flag.cirio_c1_fin', text: '✔ Capítulo 1 terminado. El siguiente llegará en unos días: lo que hiciste con tu vela se recordará.' },
			],
		},
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		cartacirio: { name: 'Carta de Morti', pocket: 'key', desc: 'Un sobre gris sin sello, cerrado con una gota de cera morada. Huele a incienso y a madera vieja.',
			read: '*(Papel de arroz. Letra fina, con mucho espacio entre línea y línea, como si quien escribe se parara a escuchar algo.)*\n\n{jugador}:\n\nMe ha escrito una mujer de un pueblo del lago, al este de Malva. Se llama Cirio. Ella se llama Consuelo. Escribe muy rápido. He tardado tres tazas de té en leer la carta.\n\nDice que cada noche, en su pueblo, alguien canta. Que por la mañana falta una cosa pequeña de cada casa. Que en el muelle aparece una vela encendida con el nombre de la casa grabado.\n\nLe ha escrito al gimnasio porque los fantasmas son cosa mía. Tiene razón.\n\nNo puedo ir. Lo que hay allí me conoce. Si voy yo, se esconde. A ti no te conoce. Todavía.\n\nVe despacio. No le tengas miedo. Lo que canta no quiere asustar a nadie. Quiere que alguien escuche.\n\nEso lo sé. Lo demás, no. Por eso te escribo.\n\n— Morti\n\n*P. D.: Dile a Consuelo que no hace falta que vuelva a mandar galletas. Que me las he comido todas. Que mande más.*' },
		cintaposada: { name: 'Cinta de La Mecha', pocket: 'key', desc: 'Un lazo azul con una campanita de barro, de los que Consuelo ata a la muñeca de sus huéspedes. «Para que el lago sepa que tienes dónde volver». La campanita no suena. Nunca ha sonado.' },
		velacirio: { name: 'Tu vela del muelle', pocket: 'key', desc: 'Una vela de cera de abeja, gruesa y amarilla, que apareció en el muelle de Cirio tras tu primera noche allí. Lleva grabado tu nombre, con letra temblona, y detrás: «de parte de Morti». El pabilo está trenzado de una forma rara. Huele a miel y a resina de pino.' },
		pabilocirio: { name: 'Pabilo quemado', pocket: 'key', desc: 'Un trozo de pabilo que encontraste al final de las gotas de cera, en la orilla de Cirio. Está trenzado en tres, con un nudo pequeño en la punta que no habías visto nunca. Huele a miel.' },
		hojafaro: { name: 'Hoja del cuaderno del faro', pocket: 'key', desc: 'Una hoja que Abril Lucero ha copiado de su cuaderno del faro «para que alguien más lo tenga, por si acaso». Letra de ingeniera: pequeña, recta, con flechas.',
			read: '**FARO DE CIRIO · CUADERNO DE SERVICIO**\n*(copia de A. Lucero)*\n\n**Día 1.** Faro encendido a las 20:10 por primera vez en seis años. La lente gira a su ritmo. El abuelo tenía razón: la vieja aún sabe. Lanturn, nervioso. Yo también.\n\n**Día 2.** Revisión del mecanismo. Engranaje del rodamiento norte: cambiar. Sin incidencias en el lago.\n\n**Día 3.** Niebla densa. Sin incidencias.\n\n**Día 6.** Consuelo me trae caldo. Dice que esta noche ha oído cantar. Le digo que será la radio de alguien.\n\n**Día 7.** Primera vela en el muelle. «Posada Ibarra». Le falta un dedal a Consuelo.\n\n**Día 8.** Velas: posada, cerería, casa de los Mora. Falta: un dedal (ya), unas tijeras de pabilo, un botón.\n\n**Día 11.** Vela con «Faro · Ginés». Me falta la llave vieja de la linterna, la del abuelo. **No tiene gracia.**\n\n**Día 15.** Velas cada noche. Siempre de madrugada, entre las 3 y las 5. Siempre con la niebla alta.\n\n**Día 19.** Pregunto a Hilario. Dice que el lago sabrá. El lago no contesta preguntas, Hilario.\n\n**Día 24.** Nadie ha visto quién las deja. Las gotas de cera van del muelle hacia el agua. Hacia **el** agua. No hacia el pueblo.\n\n*(Al margen, con una flecha:)* ¿Quién se acuerda de que el abuelo se llamaba Ginés y no de que el faro ahora es mío?' },
		cartelvelada: { name: 'Cartel de la última Velada', pocket: 'key', desc: 'Un cartel amarillento, con las esquinas comidas, que Benigna ha despegado del escaparate de la cerería para dártelo. Lo ha alisado con la mano tres veces.',
			read: '**VELADA DEL LAGO**\n*Pueblo Cirio · como cada año*\n\nAl caer la noche, cuando el **faro** empiece a girar despacio, todo el pueblo bajará al muelle.\n\nCada casa encenderá una vela por los suyos que ya no están, y la dejará en el agua con algo que les gustara: un botón, un dedal, una carta, una canica.\n\nEl lago se las llevará hasta el islote. Así nos los cuida.\n\nVelas, a cargo de la **Cerería Arnau**, como siempre. Don Elías las tiene grabadas con el nombre de cada casa. Si la vuestra no está, pasad por la tienda: se graba en el momento.\n\nDespués, chocolate en la Posada.\n\n*Se ruega silencio mientras se canta la nana.*\n\n*(Abajo, a mano, con la tinta corrida:)* **Última Velada.** Elías no volvió del islote. — B. A.' },
	},

	// =====================================================================
	// BUZÓN
	// =====================================================================
	mail: [
		{ id: 'cirio_carta', kind: 'carta', from: 'Morti', npc: 'morti', title: 'Algo canta en el lago', cond: 'flag.b04_fin && visited("iris")', days: 1, item: 'cartacirio', script: 'cirio_carta' },
	],

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		cirio_senda_bayas: {
			name: 'Los arbustos del mojón', icon: '🫐', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'otono', hint: 'Sacude los arbustos de al lado del mojón. Con la niebla, las bayas caen mojadas; las piñas de los pinos también caen. Esas no.' },
			ask: 'Junto a un mojón de piedra, unos arbustos cargados de bayas mojadas de niebla. Dentro del hueco del mojón, un culo de vela y una baya que alguien ha dejado ahí, como una ofrenda.',
			text: 'Recoges lo que la niebla ha dejado caer. La baya del mojón la dejas donde está.',
			wait: 'Los arbustos están recién sacudidos. Lo que queda está verde.',
			table: [
				{ id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'leppaberry', w: 12, n: [1, 2] }, { id: 'persimberry', w: 12, n: [1, 3] },
				{ id: 'chestoberry', w: 10, n: [1, 2] }, { id: 'aspearberry', w: 8, n: [1, 2] }, { id: 'oranberry', w: 12, n: [2, 3] },
				{ id: 'tinymushroom', w: 6, n: [1, 2] }, { id: 'lumberry', w: 2, n: [1, 1], rare: true }, { id: 'bigmushroom', w: 1, n: [1, 1], rare: true },
			],
		},
		cirio_muelle: {
			name: 'Los tablones del muelle', icon: '🎣', hours: 20, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'lago', hint: 'El corcho apenas se ve en la niebla. Espera al «!» y no tires antes: aquí los peces son desconfiados.',
				wild: [{ sp: 'quagsire', lv: [50, 52], w: 6 }, { sp: 'golduck', lv: [50, 52], w: 5 }, { sp: 'poliwhirl', lv: [50, 52], w: 5 }, { sp: 'gyarados', lv: [52, 53], w: 1 }] },
			ask: 'El agua bajo el muelle está quieta y gris. Entre los pilotes, a veces, brilla algo: el lago devuelve lo que le tiran, dicen aquí, pero tarda.',
			text: 'Del fondo del lago sube lo que sube.',
			wait: 'El agua está revuelta de tanto lanzar. Mejor dejarla descansar.',
			table: [
				{ id: 'pearl', w: 16, n: [1, 2] }, { id: 'mysticwater', w: 8, n: [1, 1] }, { id: 'heartscale', w: 10, n: [1, 2] },
				{ id: 'tinymushroom', w: 8, n: [1, 1] }, { id: 'bigpearl', w: 3, n: [1, 1], rare: true }, { id: 'starpiece', w: 1, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ---------- Buzón ----------
		cirio_carta: [
			{ if: '!flag.cirio_carta', then: [
				{ set: { 'flag.cirio_carta': true } },
				{ text: 'Debajo de la firma, la gota de cera morada que cerraba el sobre todavía huele a incienso.' },
				{ quest: 'cirio_c1', stage: 'ir', cond: '!' + Q },
			], else: [
				{ text: 'Vuelves a leer la carta. «Lo que canta no quiere asustar a nadie». Morti nunca escribe nada que no haya oído.' },
			] },
		],

		// ---------- La senda ----------
		cirio_mojon: [
			{ text: 'En el mojón de este tramo, el hueco tallado tiene una vela entera. Encendida. La llama no se mueve aunque la niebla sí.' },
			{ text: 'Grabado en la cera, con letra temblona: «**Por los de la senda**».' },
			{ text: '{riolu} la mira un rato largo con las orejas bajas. No tiene miedo. Parece que le da pena.', cond: LUC },
			{ text: 'Cuando vuelves a mirar, la llama sigue igual. Tú no la tocas. Algo te dice que no es tuya.' },
		],

		// ---------- Llegada ----------
		cirio_llegada: [
			{ cutscene: { weather: 'fog', bg: BG_CIRIO, start: 'dark', frames: [
				{ big: true, text: 'Pueblo Cirio', sub: 'Johto', hold: 2400, cam: 'still' },
				{ cam: 'pull', fx: 'light', text: 'La senda se acaba en una calle de tierra mojada. Casas bajas de piedra gris, tejados de pizarra, redes tendidas. Detrás, el lago, que no tiene otra orilla: la niebla se la ha comido.' },
				{ cam: 'pan-right', fx: 'sparkle', text: 'En cada ventana hay una vela encendida. En todas. Aunque sea de día. Las llamas están quietas, como pintadas.' },
				{ cam: 'still', fx: 'ripple', on: false, text: 'Al fondo, en la punta del muelle, una campana suena una vez. No hay nadie tirando de la cuerda.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left', emote: '?' }], on: 'rio', fx: 'glow', cond: LUC, text: '{riolu} levanta las orejas hacia el lago. El aura le tiembla en las manos, pero no se pone en guardia. Escucha.' },
				{ actors: [{ id: 'consuelo', at: 'right', enter: 'right', do: 'step' }], cam: 'push', text: 'Una puerta verde se abre de golpe. Sale una mujer con delantal, un farol en una mano y un cucharón en la otra, como si no hubiera tenido tiempo de soltarlo.' },
			] } },
			{ set: { 'flag.cirio_llegada': true } },
			{ quest: 'cirio_c1', stage: 'vecinos' },
			{ if: 'flag.cirio_carta', then: [
				{ say: 'consuelo', text: '¡Ay, no! ¿Eres tú? ¿{el|la|le} de Morti? ¡Me contestó! Yo pensé que ese muchacho no contestaba cartas, que solo las miraba fijamente. ¡Pasa, pasa, mi vida, que con esta niebla se te mete el frío en los huesos!' },
			], else: [
				{ say: 'consuelo', text: '¡Ay! Un forastero. Una forastera. Una persona de fuera, pues. ¿Te has perdido, mi vida? Aquí nadie llega por gusto, y menos con esta niebla. Le escribí a Morti, el de Iris, para que viniera alguien, pero ese muchacho no contesta ni a su madre.' },
			] },
			{ say: 'consuelo', text: 'Consuelo Ibarra, de la **Posada La Mecha**. La de la puerta verde. Te cuento rápido, que tengo un caldo al fuego: cada noche alguien canta en el pueblo. Una nana. Bonita, ¿eh? No es eso. Es que por la mañana falta algo de cada casa.' },
			{ say: 'consuelo', text: 'Cosas chiquitas. Un dedal, un botón. Y luego, en el muelle, aparece una vela encendida con el nombre de la casa. Grabado. Como las que hacía el cerero.' },
			{ choice: [
				{ text: '«¿Qué cerero?»', then: [
					{ say: 'consuelo', text: 'Don Elías. Elías Arnau. Hacía las velas de todo Johto, mi vida, hasta de la Torre de Iris. Hace diez años, la noche de la Velada, se fue en barca al islote y ya no volvió. Desde entonces no se hizo más Velada. Ni más velas.' },
				] },
				{ text: '«¿Y nadie ha visto quién las deja?»', then: [
					{ say: 'consuelo', text: 'Nadie. Abril, la del faro, dice que es un bromista. Benigna, la hermana del cerero, dice que es él. Don Hilario no dice nada, pero eso no es nuevo: Hilario no dice nada desde hace sesenta años.' },
				] },
			] },
			{ say: 'consuelo', text: 'Pregunta por ahí. Somos cuatro gatos y cada gato te lo va a contar a su manera. Y luego te vienes a la posada, que te guardo el cuarto del fondo. El que da al lago. El bueno. ¡Ándale!' },
			{ text: 'Consuelo vuelve a meterse en la posada con el farol y el cucharón. La puerta verde se cierra. La vela de su ventana ni se mueve.' },
		],

		// ---------- Consuelo ----------
		cirio_consuelo_1: [
			{ set: { 'flag.cirio_t_consuelo': true } },
			{ text: 'El Furret de la mejor silla abre un ojo, te mira y lo vuelve a cerrar. Consuelo deja la olla y se limpia las manos en el delantal.' },
			{ say: 'consuelo', text: 'A mí lo primero que me faltó fue el dedal de mi madre. De plata, chiquito, con una florecita. Lo tenía en el costurero desde que ella se fue. Y una mañana, ¡zas!, no estaba. Y en el muelle, una vela: «**Posada Ibarra**».' },
			{ say: 'consuelo', text: 'Con el dedal atado al pie con un hilito, mi vida. Como se hacía en la Velada: una vela por los que ya no están, y al lado algo que les gustara.' },
			{ choice: [
				{ text: '«¿Te dio miedo?»', then: [
					{ say: 'consuelo', text: '¿Miedo? Me dio un coraje… ¡Que es mío! Y luego me dio otra cosa. Ganas de llorar, pues. Porque mi madre ese dedal lo quería mucho. Y quien lo agarró, sabía a quién ponérselo.' },
				] },
				{ text: '«¿Y la nana?»', then: [
					{ say: 'consuelo', text: 'Ay, la nana. Es de aquí. La cantaba el cerero cuando metía los pabilos en la cera, para llevar el ritmo. Nos la sabemos todos. «Duérmete, mecha…». No, no te la canto. Da no sé qué.' },
				] },
			] },
			{ say: 'consuelo', text: 'Mira, te apunto en la pizarra para que no se me olvide quién eres, que con tanto cliente… —Somos cuatro gatos—. Y toma: esto se lo pongo a todos mis huéspedes.' },
			{ give: 'cintaposada' },
			{ text: 'Consuelo te ata a la muñeca un lazo azul con una campanita de barro. Lo aprieta dos veces.' },
			{ say: 'consuelo', text: 'Para que el lago sepa que tienes dónde volver. Es una tontería. Pero aquí todos tenemos una.' },
			...TESTIGO,
		],
		cirio_consuelo_gen: [
			{ if: Q + ' == "muelle" || ' + Q + ' == "rastro" || ' + Q + ' == "vela"', then: [
				{ say: 'consuelo', text: '¿Ya fuiste al muelle? Ve, mi vida. Yo no voy a mirar mi dedal cada mañana como hace Benigna con lo suyo. Si me pongo, no salgo de ahí.' },
			], else: [
				{ say: 'consuelo', text: '¿Hambre? Siéntate. No, ahí no, que es la silla de Furret. Bueno, sí, si consigues que se quite. Yo llevo seis años intentándolo.' },
			] },
		],
		cirio_consuelo_despues: [
			{ if: 'flag.cirio_c1_costumbre', then: [
				{ say: 'consuelo', text: 'Tu vela sigue encendida en el muelle, ¿la viste? Benigna le cambia el platito cada mañana. Dice que es para que no se ensucie el tablón. Mentira: es para verla.' },
			] },
			{ if: 'flag.cirio_c1_prueba', then: [
				{ say: 'consuelo', text: 'Ay, tú y tu vela en la mochila. Aquí no se había hecho nunca, ¿sabes? Pero oye, cada quien guarda sus cosas como quiere. Yo guardo el caldo en la olla y nadie me dice nada.' },
			] },
			{ if: 'flag.cirio_c1_guardia', then: [
				{ say: 'consuelo', text: '¿Pasaste la noche en el faro con Abril? Esa niña no duerme. Le llevé caldo a las cuatro de la mañana y me dijo «gracias» sin mirarme, con los ojos pegados al lago. Igualita a su abuelo.' },
			] },
			{ say: 'consuelo', text: 'Desde que llegaste, esto está más tranquilo. O más raro. A estas alturas ya no distingo. ¿Un caldito?' },
		],
		cirio_pizarra: [
			{ text: 'Una pizarra de colegio colgada junto a la puerta. Con tiza, la letra redonda de Consuelo:' },
			{ read: { title: 'La pizarra de La Mecha', text: '**HUÉSPEDES**\n\nCuarto del fondo: **{jugador}, de parte de Morti**\n\nCuarto de la escalera: *(vacío)*\n\nCuarto del Furret: **el Furret**\n\n*Desayunos: 1 (y el Furret)*\n\n*(En una esquina, con otra letra, gruesa y torcida, como de alguien que escribe con guantes:)* «2 truchas. H.»' } },
			{ text: 'Debajo, en la repisa, un trapo con restos de tiza. Alguien borra y vuelve a escribir esta pizarra cada mañana.' },
		],

		// ---------- Don Hilario ----------
		cirio_hilario_1: [
			{ set: { 'flag.cirio_t_hilario': true } },
			{ text: 'Un hombre muy mayor sentado en una barca amarrada, con los remos recogidos y una gorra de lana calada hasta las cejas. Mira la niebla como si la estuviera leyendo.' },
			{ say: 'hilario', text: 'Va a levantar a las once.' },
			{ text: 'No sabes si habla de la niebla o de otra cosa. No te ha mirado.' },
			{ choice: [
				{ text: 'Preguntarle por las velas.', then: [
					{ say: 'hilario', text: 'Velas. —Escupe al agua, con respeto—. Salen. Por la mañana. Las veo.' },
					{ say: 'hilario', text: '¿Quién? El lago sabrá.' },
				] },
				{ text: 'Preguntarle qué le falta a él.', then: [
					{ say: 'hilario', text: 'A mí, nada. —Por primera vez te mira, un segundo—. No tengo nada que valga.' },
					{ text: 'Es el único del pueblo al que no le ha faltado nada. Lo dice como quien dice la hora.' },
				] },
				{ text: 'Preguntarle por el cerero.', then: [
					{ say: 'hilario', text: 'Elías. —Se le mueve algo en la mandíbula—. Lo llevé al islote. Esa noche. Con la vela grande.' },
					{ say: 'hilario', text: 'Volví solo. Ya está. Ya lo dije. Diez años diciéndolo.' },
				] },
			] },
			{ say: 'hilario', text: 'Duerme bien, foraster{o|a|e}. Aquí se duerme bien. Lo malo es despertar.' },
			{ text: 'Vuelve a mirar la niebla. Debajo del banco de la barca hay una cesta tapada con un trapo. Huele a pan.' },
			...TESTIGO,
		],
		cirio_hilario_gen: [
			{ if: Q + ' == "rastro" || ' + Q + ' == "vela"', then: [
				{ say: 'hilario', text: 'Gotas. —Señala el tablón con la barbilla—. Van al agua. Todo va al agua.' },
			], else: [
				{ say: 'hilario', text: 'Hoy no remo. Hoy no hay a quién.' },
			] },
		],
		cirio_hilario_despues: [
			{ if: 'flag.cirio_c1_guardia', then: [
				{ say: 'hilario', text: 'Los vi. Arriba. Con la luz. —No dice dónde—. Las noches son del lago, no del faro.' },
				{ text: 'No te mira. Pero tampoco se va.' },
			] },
			{ if: 'flag.cirio_c1_costumbre', then: [
				{ say: 'hilario', text: 'Esta noche no faltará nada en tu cuarto.' },
				{ text: 'Lo dice muy seguro. Como si lo supiera.' },
			] },
			{ if: 'flag.cirio_c1_prueba', then: [
				{ say: 'hilario', text: 'Esa vela. Enciéndela algún día. —Pausa—. Para eso son.' },
			] },
			{ say: 'hilario', text: 'Va a levantar a las once. —Pausa—. O no.' },
		],

		// ---------- Abril ----------
		cirio_abril_1: [
			{ set: { 'flag.cirio_t_abril': true } },
			{ text: 'Arriba de la escalera de hierro, con medio cuerpo metido en el mecanismo de la linterna, una mujer con una coleta llena de grasa. Un Lanturn le alumbra las manos desde el rellano.' },
			{ say: 'abril', text: '¿Vienes por lo de las velas? ¿O vienes a decirme que es un fantasma? Porque si es lo segundo, Consuelo ya me lo ha dicho once veces y Benigna veintitrés. Tengo una tabla.' },
			{ say: 'abril', text: 'Abril Lucero. Farera. Desde hace un mes. Antes, ingeniera en Trigal, que es como ser farera pero sin vistas. —Saca la cabeza del mecanismo—. El faro era de mi abuelo. Estuvo apagado seis años.' },
			{ say: 'abril', text: 'Lo encendí. Y a la semana empezaron las velas. —Se encoge de hombros—. ¿Casualidad? Pues claro. ¿Qué va a tener que ver un faro con un bromista?' },
			{ say: 'abril', text: 'Lo apunto todo, ¿eh? Fechas, horas, qué falta. Toma, te he hecho una copia. Así, si me caigo por la escalera, alguien más lo sabe.' },
			{ give: 'hojafaro' },
			{ read: 'hojafaro' },
			{ choice: [
				{ text: '«¿Y lo de “Faro · Ginés”?»', then: [
					{ say: 'abril', text: '—Se queda quieta un momento—. ¿Quién te ha…? Ah. El cuaderno. Claro.' },
					{ say: 'abril', text: 'Mi abuelo. Ginés. Murió hace seis años. Alguien grabó su nombre en una vela y le ató su llave. ¿Te parece una broma? A mí tampoco. Por eso no me río.' },
				] },
				{ text: '«¿Has intentado pillarlo?»', then: [
					{ say: 'abril', text: '¿Pillarlo? Me he pasado tres noches en el muelle con una cámara. ¿Sabes qué grabé? Niebla. En alta definición.' },
					{ say: 'abril', text: 'Y Lanturn se puso a temblar a las tres y media. No a ladrar. A temblar. Lanturn no tiembla ni con tormenta.' },
				] },
			] },
			{ say: 'abril', text: 'Si averiguas algo, ven y me lo cuentas. Si no averiguas nada, ven igual: aquí la única que habla con frases de más de tres palabras soy yo.' },
			...TESTIGO,
		],
		cirio_abril_gen: [
			{ say: 'abril', text: '¿Novedades? Yo tampoco. —Aprieta una tuerca—. Bueno, una: el rodamiento norte. Ya no chirría. Algo es algo.' },
		],
		cirio_abril_despues: [
			{ if: 'flag.cirio_c1_guardia', then: [
				{ say: 'abril', text: 'Tu vela la tengo aquí, en el cajón del cuaderno. No la he encendido. ¿Y si es una prueba? ¿Y si alguien viene a buscarla? Pues que venga. Aquí lo espero.' },
				{ say: 'abril', text: 'Y lo de la luz… No digo nada hasta tener tres noches iguales. Llevo dos.' },
			] },
			{ if: 'flag.cirio_c1_prueba', then: [
				{ say: 'abril', text: '¿La tienes todavía? ¿La vela? Bien. No la enciendas. Las pruebas no se rezan. —Pausa—. Benigna no me habla. Dice que te he malacostumbrado. Como si yo te conociera de algo.' },
			] },
			{ if: 'flag.cirio_c1_costumbre', then: [
				{ say: 'abril', text: '¿La encendiste? ¿En serio? —Te mira un rato—. Bueno. Yo habría hecho otra cosa. Pero la vela era tuya. Supongo.' },
			] },
		],
		cirio_foto_gines: [
			{ text: 'La foto es vieja, de colores lavados. Un hombre mayor, con gorra de marino y una sonrisa con huecos, posa delante de este mismo faro. A su lado, una niña con coleta sujeta un Chinchou como quien sujeta una linterna.' },
			{ text: 'Debajo, a lápiz: «Ginés. 40 años sin dejar el lago a oscuras». Y más abajo, con otra letra, más reciente: «Y 6 a oscuras. Perdona, abuelo».' },
		],

		// ---------- Benigna ----------
		cirio_benigna_1: [
			{ set: { 'flag.cirio_t_benigna': true } },
			{ text: 'Una mujer mayor, de negro, con unas gafas pequeñas de montura dorada, barre el escalón de la cerería. No hay nada que barrer. Barre igual.' },
			{ say: 'benigna', text: 'Usted es la persona que manda el gimnasio de Iris. O la que se ha perdido. En este pueblo se llega por una de las dos.' },
			{ say: 'benigna', text: 'Benigna Arnau. Esta era la cerería de mi hermano. Sigue siéndolo. Las cosas no dejan de ser de uno porque uno no esté.' },
			{ say: 'benigna', text: 'A mí me faltaron sus tijeras de pabilo. Y apareció una vela: «**Cerería Arnau**». Cera de abeja con resina de pino. Pabilo trenzado. Es la receta de esta casa. Nadie más en Johto la sabe hacer.' },
			{ choice: [
				{ text: '«¿Cree que es su hermano?»', then: [
					{ say: 'benigna', text: 'No lo creo. Lo sé. Es él. —Deja la escoba—. Lo que no sé es si está vivo o si ha vuelto de donde estuviera. Y no me importa. Me importa que ha vuelto.' },
				] },
				{ text: '«Podría ser alguien que conocía la receta.»', then: [
					{ say: 'benigna', text: 'La cera se enfría como se enfría la gente, joven: de fuera hacia dentro. Por fuera, cualquiera la imita. Por dentro, no. Las he partido. Son suyas.' },
				] },
			] },
			{ say: 'benigna', text: 'Tome. Lo tenía en el escaparate desde aquella noche. Lea la última línea. La escribí yo.' },
			{ give: 'cartelvelada' },
			{ read: 'cartelvelada' },
			{ say: 'benigna', text: 'Diez años. Cada jueves abro, quito el polvo y cierro. Por si vuelve y le apetece encontrar las cosas limpias.' },
			...TESTIGO,
		],
		cirio_benigna_gen: [
			{ if: Q + ' == "muelle" || ' + Q + ' == "rastro" || ' + Q + ' == "vela"', then: [
				{ say: 'benigna', text: 'Ya ha visto el muelle. Ya sabe lo que yo sé. Ahora mírelo usted, que yo ya no veo nada de tanto mirar.' },
			], else: [
				{ say: 'benigna', text: 'Hoy es jueves en algún sitio. Paso a quitar el polvo.' },
			] },
		],
		cirio_benigna_despues: [
			{ if: 'flag.cirio_c1_costumbre', then: [
				{ say: 'benigna', text: 'Encendió su vela. Como se hacía. —Asiente una sola vez—. Mi hermano estaría contento. Él decía que una vela sin encender es una pregunta que nadie se atreve a hacer.' },
			] },
			{ if: 'flag.cirio_c1_prueba', then: [
				{ say: 'benigna', text: 'Se la guardó. Sin encender. —Lo dice sin enfado, que es peor—. Cuídela, al menos. Esa cera la hizo una mano que yo conozco.' },
			] },
			{ if: 'flag.cirio_c1_guardia', then: [
				{ say: 'benigna', text: '¿Guardia? ¿Con la del faro? —Se sube las gafas—. A mi hermano no se le pilla. Se le espera. Es distinto.' },
			] },
		],
		cirio_escaparate: [
			{ if: 'has("cartelvelada")', then: [
				{ text: 'Donde estaba el cartel, el cristal está más limpio: un rectángulo claro en mitad del polvo. Detrás, las velas tapadas con sábanas parecen gente sentada esperando algo.' },
			], else: [
				{ text: 'Detrás del cristal sucio, un cartel amarillento: «VELADA DEL LAGO». No se lee bien desde aquí. La mujer del escalón te mira mirarlo.' },
			] },
		],

		// ---------- La primera noche ----------
		cirio_noche: [
			{ say: 'consuelo', text: 'Arriba, mi vida, el del fondo. Te dejé una manta de más y el Furret ya te la calentó. No le digas nada, que se ofende.' },
			{ cutscene: { time: 'noche', weather: 'fog', bg: { type: 'indoor', wall: '#4a3a30', floor: '#2a221c' }, start: 'dark', frames: [
				{ cam: 'still', text: 'El cuarto del fondo huele a madera y a jabón. Por la ventana entra la luz del faro cada pocos segundos, pinta la pared de amarillo y se va.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'none', do: 'idle', emote: 'zzz' }], cond: LUC, text: '{riolu} se ha hecho una bola a los pies de la cama. Respira despacio. Tú también, al final.' },
				{ tint: '#6a7aa8', fx: 'dark', on: false, cam: 'push', text: 'Muy tarde, algo te despierta. No es un ruido. Es una voz. Fina, lejana, como de alguien que canta con la boca cerrada.' },
				{ fx: 'letter', on: false, cam: 'still', text: '*Duérmete, mecha, / que el lago no espera; / la luz que se apaga / se queda a la vera.*' },
				{ actors: [{ key: 'rio', do: 'turn', emote: '!' }], on: 'rio', fx: 'glow', cond: LUC, text: '{riolu} está de pie junto a la ventana, con las palmas pegadas al cristal. El aura le brilla azul, muy suave. No gruñe. Escucha.' },
				{ fx: 'heartbeat', color: '#8fb0d8', on: false, cam: 'still', text: 'La nana se acerca. Pasa por debajo de la ventana. Pasa por tu puerta. Y se aleja hacia el agua, hasta que solo queda el faro, girando.' },
				{ tint: 'none', fx: 'light', on: false, cam: 'pull', text: 'Despiertas con la luz gris de la mañana. Te miras la muñeca. La cinta de Consuelo no está.' },
			] } },
			{ heal: true },
			{ take: 'cintaposada', cond: 'has("cintaposada")', silent: true },
			{ set: { 'flag.cirio_noche': true } },
			{ quest: 'cirio_c1', stage: 'muelle' },
			{ text: 'Abajo, en el comedor, Consuelo te ve bajar la escalera y se le cae el cucharón.' },
			{ say: 'consuelo', text: '¡Ay, no! Tu muñeca. —Se tapa la boca—. Ya te tocó, mi vida. A ti también. Y eso que tú no eres de aquí.' },
			{ say: 'consuelo', text: 'Ve al muelle. Ahorita. Yo no voy, que me pongo mala. Pero ve.' },
		],

		// ---------- El muelle por la mañana ----------
		cirio_velas: [
			{ set: { 'flag.cirio_velas': true } },
			{ text: 'Al pie de la campana, sobre los tablones mojados, una fila de velas recién apagadas. Gruesas, amarillas, de cera de abeja. Cada una con un nombre grabado y algo pequeño atado al pie con un hilo.' },
			{ text: '«Posada Ibarra». «Cerería Arnau». «Casa de los Mora». «Faro · Ginés». Y, la última, más nueva que las demás, con la letra igual de temblona:' },
			{ text: '«**{jugador}, de parte de Morti**». Atada al pie, tu cinta azul, con su campanita de barro.' },
			{ give: 'velacirio' },
			{ give: 'cintaposada', silent: true },
			{ text: 'Benigna está de pie al lado de la fila, con las manos cruzadas sobre el abrigo. Viene cada mañana. Mira las velas una por una, como quien pasa lista.' },
			{ say: 'benigna', text: '«De parte de Morti». —Lo lee dos veces—. Mi hermano nunca grababa más de tres palabras en una vela. Decía que el resto lo pone quien la enciende.' },
			{ text: 'En su barca, Don Hilario remienda una red. No ha levantado la cabeza. Pero los dedos se le han quedado quietos.' },
			{ say: 'hilario', text: 'Esa es nueva.' },
			{ text: 'Desde la fila de velas sale un reguero de gotas de cera. Pequeñas, redondas, todavía blandas. Van por los tablones hacia la orilla y se pierden entre los juncos.' },
			{ quest: 'cirio_c1', stage: 'rastro' },
		],
		cirio_velas_gen: [
			{ if: 'flag.cirio_c1_costumbre', then: [
				{ text: 'La fila de velas al pie de la campana. Hoy hay una encendida entre las de las casas: la tuya. La llama apenas se mueve.' },
			], else: [
				{ text: 'La fila de velas al pie de la campana. Algunas consumidas hasta el plato, otras de esta mañana. Nadie se lleva ninguna. En Cirio, eso no se hace.' },
			] },
		],
		cirio_campana: [
			{ text: 'Una campana de bronce verde, con una cuerda deshilachada. Por dentro, alguien ha grabado hace mucho: «Para que vuelva el barquero».' },
			{ choice: [
				{ text: 'Tocarla.', then: [
					{ text: 'Suena una vez, grave, y el sonido se mete en la niebla y no vuelve.' },
					{ if: 'flag.cirio_t_hilario', then: [{ say: 'hilario', text: 'Estoy aquí. —Sin levantar la vista—. Siempre estoy aquí.' }], else: [{ text: 'Desde una barca amarrada, un hombre muy mayor levanta la cabeza, te mira y la vuelve a bajar.' }] },
				] },
				{ text: 'Dejarla.' },
			] },
		],

		// ---------- El rastro de cera ----------
		cirio_rastro: [
			{ if: '!flag.cirio_rastro_visto', then: [
				{ set: { 'flag.cirio_rastro_visto': true } },
				{ text: '{riolu} se agacha junto a la primera gota de cera. La toca con la punta de la pata, la huele y cierra los ojos. Las orejas se le levantan despacio.' },
				{ text: 'No mira hacia el pueblo. Mira hacia los juncos. Hacia el agua.' },
			], else: [
				{ text: '{riolu} vuelve a agacharse junto a las gotas. El aura le dibuja en el aire un hilo azul que se mete en la niebla.' },
			] },
			{ minigame: { type: 'aura', id: 'cirio_rastro_cera', title: 'Gotas de cera en la orilla', hint: '{riolu} sigue el rastro por los juncos. Cada pulso dice si estás cerca de donde se acaba.', theme: 'playa', level: 2,
				guaranteed: ['pabilocirio'], loot: [{ id: 'honey', w: 6 }, { id: 'tinymushroom', w: 5 }, { id: 'pearl', w: 4 }, { id: 'bigpearl', w: 1, rare: true }], picks: 2, consolation: false, lootTitle: 'Al final de las gotas' },
				onWin: [{ call: 'cirio_aparicion' }],
				onLose: [{ text: 'La niebla se cierra y el rastro se te pierde entre los juncos. {riolu} sacude la cabeza, vuelve al muelle y se planta junto a la primera gota. Quiere otra vez.' }],
				onQuit: [{ text: '{riolu} se queda mirando los juncos un rato más. Luego te sigue, de mala gana, mirando atrás.' }] },
		],
		cirio_rastro_sin_aura: [
			{ text: 'Sigues las gotas de cera a pie. Por los tablones, por la arena gris, entre los juncos. Son pequeñas y se confunden con las piedras; las pierdes tres veces y tres veces las vuelves a encontrar.' },
			{ text: 'Tienes la sensación de que, con alguien que sintiera las cosas en vez de verlas, habría sido más fácil.' },
			{ text: 'Al final, donde los juncos tocan el agua, las gotas se acaban. Entre dos piedras hay un trozo de pabilo quemado.' },
			{ give: 'pabilocirio' },
			{ call: 'cirio_aparicion' },
		],
		cirio_aparicion: [
			{ cutscene: { time: 'manana', weather: 'fog', bg: BG_MUELLE, frames: [
				{ cam: 'still', text: 'Las gotas se acaban en el agua. No en la orilla: **en** el agua. Las últimas flotan, quietas, como si alguien hubiera seguido caminando por encima del lago.' },
				{ fx: 'ripple', on: false, cam: 'push', text: 'Entonces, muy bajito, otra vez la nana. *Duérmete, mecha…* Viene de delante. De la niebla. Muy cerca.' },
				{ actors: [{ mon: 'misdreavus', key: 'sombra', at: 0.68, enter: 'fade', size: 's', dim: true }], fx: 'silhouette', on: 'sombra', cam: 'still', text: 'A pocos metros, sobre el agua, algo flota. Pequeño. Oscuro. Con un collar de cuentas que brilla rojo, apagado, como brasas.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left', do: 'step' }], on: 'rio', fx: 'glow', cond: LUC, text: '{riolu} da un paso hacia el agua con las palmas abiertas. El aura le sale de las manos, azul, tranquila. No es un ataque. Es un saludo.' },
				{ actors: [{ key: 'sombra', do: 'shake', emote: '!' }], cam: 'still', text: 'La forma se encoge. La nana se corta de golpe, a mitad de un verso.' },
				{ actors: [{ key: 'sombra', remove: true, exit: 'right' }], cam: 'pan-right', text: 'Y se va. Rápida, sin ruido, hacia el centro del lago. Allí, muy lejos, donde no debería haber nada, un punto de luz se enciende un instante y se apaga.' },
			] } },
			{ set: { 'flag.cirio_rastro': true } },
			{ quest: 'cirio_c1', stage: 'vela' },
			{ happy: { who: 'riolu', n: 10 }, cond: LUC },
			{ text: '{riolu} se queda mirando el punto donde se apagó la luz. Luego te mira a ti, con la cabeza ladeada. No parece asustado. Parece que quiere volver.', cond: LUC },
			{ text: 'Vuelves al muelle con el pabilo en una mano y tu vela en la otra. En Cirio te están esperando para saber qué vas a hacer con ella.' },
		],

		// ---------- La decisión ----------
		cirio_decision: [
			{ text: 'En el muelle se ha juntado, sin que nadie lo haya pedido, medio pueblo. Que en Cirio, a estas horas, son cuatro personas y un Furret.' },
			{ say: 'consuelo', text: 'Yo no he venido a mirar, ¿eh? He venido a traer café. —Trae café—. Bueno, y a mirar.' },
			{ say: 'benigna', text: 'Esa vela es suya. Aquí la costumbre es encenderla y dejarla en el muelle, con las demás. Lo que usted haga es cosa suya. Pero eso es lo que se hace.' },
			{ say: 'abril', text: 'Y yo digo que es la única prueba que tenemos que lleva el nombre de alguien que llegó ayer. ¿Saben lo que significa? Que quien la grabó sabe quién llegó ayer. Eso no lo sabe un fantasma. Lo sabe un vecino.' },
			{ say: 'hilario', text: 'Va a levantar a las once.' },
			{ say: 'abril', text: 'Gracias, Hilario. Muy útil.' },
			{ choice: [
				{ text: 'Encenderla y dejarla en el muelle, como manda la costumbre.', then: [
					{ set: { 'flag.cirio_c1_costumbre': true } },
					{ take: 'velacirio', cond: 'has("velacirio")', silent: true },
					{ text: 'Benigna saca del abrigo una caja de cerillas. Te la tiende sin decir nada. La llama prende a la primera, recta, sin humo.' },
					{ text: 'Dejas tu vela en el tablón, al final de la fila, con las de las casas. Consuelo se seca los ojos con el delantal y dice que es por el humo. No hay humo.' },
					{ say: 'benigna', text: 'Así se hacía. —Lo dice muy bajito—. Gracias.' },
					{ text: 'Don Hilario se queda mirando la llama. Luego mira el lago. Asiente, despacio, a nadie.' },
				] },
				{ text: 'Guardarla en la mochila. Es una prueba.', then: [
					{ set: { 'flag.cirio_c1_prueba': true } },
					{ text: 'Envuelves la vela en un pañuelo y la metes en la mochila. Benigna aprieta los labios. Consuelo mira el café.' },
					{ say: 'abril', text: 'Bien. Las pruebas no se rezan. —Te da una palmada en el hombro, con grasa—. Cuando quieras comparar pabilos, ya sabes dónde estoy.' },
					{ say: 'benigna', text: 'Una vela sin encender es una pregunta sin hacer. Hágala bien, al menos.' },
					{ text: 'Don Hilario se levanta de la barca por primera vez desde que llegaste. Te mira la mochila. Se vuelve a sentar.' },
				] },
				{ text: 'Dársela a Abril y hacer guardia esta noche en el faro.', then: [
					{ set: { 'flag.cirio_c1_guardia': true } },
					{ take: 'velacirio', cond: 'has("velacirio")', silent: true },
					{ say: 'abril', text: '¿En serio? ¿Conmigo? —Se le escapa una sonrisa que corrige enseguida—. Bueno. Pues café, mantas y Lanturn. Y nada de dormirse.' },
					{ call: 'cirio_guardia' },
				] },
			] },
			{ call: 'cirio_c1_cierre' },
		],
		cirio_guardia: [
			{ text: 'Esa noche subes al faro. Abril pone tu vela en el cajón de su cuaderno, sin encender, y apaga todas las luces de la casa menos la de la linterna.' },
			{ say: 'abril', text: 'Reglas: no se habla, no se duerme, y si ves algo, me tocas el brazo. No me grites. Lanturn se asusta. Yo también, pero yo lo disimulo mejor.' },
			{ text: 'Horas. El faro gira. La luz barre el lago, pinta la niebla de amarillo, se va. Lanturn dormita con la antena encendida. {riolu} no duerme: mira el agua con las orejas tiesas.', cond: LUC },
			{ text: 'Horas. El faro gira. La luz barre el lago, pinta la niebla de amarillo, se va. Lanturn dormita con la antena encendida.', cond: '!' + LUC },
			{ text: 'A las cuatro menos veinte, la luz pasa por el centro del lago y, durante un segundo, se queda enganchada en algo. Una lucecita pequeña, amarilla, quieta. Donde no debería haber nada.' },
			{ text: 'Le tocas el brazo a Abril. Ella ya lo está mirando.' },
			{ text: 'En la siguiente vuelta del faro, la lucecita ya no está. Como si alguien la hubiera tapado con la mano.' },
			{ say: 'abril', text: '—En un susurro—. ¿Lo has visto? Dime que lo has visto. Eso es el islote. Ahí no vive nadie desde hace… —Se calla—. Desde hace diez años.' },
			{ text: 'Un rato después, muy lejos, en la niebla, se oye algo. No es la nana. Es un ruido de madera contra agua, lento, regular. Como unos remos.' },
			{ text: 'Al amanecer, en el muelle, hay velas nuevas. Abril las cuenta desde arriba con los prismáticos y lo apunta todo. Tú te duermes encima de una manta, con la cabeza en el cuaderno.' },
			{ heal: true },
		],
		cirio_c1_cierre: [
			{ set: { 'flag.cirio_c1_fin': true } },
			{ text: 'Antes de que te vayas del muelle, Benigna te pone algo en la mano. Un papel antiguo, doblado, con letras pintadas.' },
			{ say: 'benigna', text: 'Un Hechizo. Mi hermano los pegaba en la puerta de la tienda para que no entraran los malos espíritus. Nunca entró ninguno. Entraban los buenos. Lléveselo.' },
			{ give: 'spelltag' },
			{ say: 'abril', text: 'Y esto, de mi parte. Lo encontré en la playa del faro, debajo de la escalera. Dicen que les gusta a los Pokémon de la noche. A mí no me sirve: yo de noche trabajo.' },
			{ give: 'duskstone' },
			{ say: 'consuelo', text: 'Y yo te doy de desayunar, que es lo que doy yo. ¡Siéntate!' },
			{ quest: 'cirio_c1', stage: 'hecha' },
			{ quest: 'cirio_c1', done: true },
			{ text: 'Desayunas en la posada, con el Furret en las rodillas y la niebla pegada a los cristales. Nadie dice nada de la nana. Pero todos, de vez en cuando, miran hacia el lago.' },
			{ chapter: { id: 'cirio', done: 1 } },
		],

		// ---------- Entre capítulos ----------
		cirio_espera_costumbre: [
			{ text: 'Junto a la fuente de la plaza, Benigna Arnau espera con las manos cruzadas sobre el abrigo. Te ve llegar y asiente.' },
			{ say: 'benigna', text: 'Su vela sigue encendida. Cada mañana le recorto el pabilo. Una vela gruesa de mi hermano, bien cuidada, aguanta semanas. —Pausa—. Esta noche alguien ha vuelto a cantar. Más cerca. Venga dentro de unos días. Creo que ya no tardará.' },
			{ chapter: { id: 'cirio', wait: true } },
		],
		cirio_espera_prueba: [
			{ text: 'Junto a la fuente de la plaza, Abril Lucero espera con el cuaderno bajo el brazo y una lupa colgada del cuello.' },
			{ say: 'abril', text: '¿Todavía la llevas? ¿La vela? Bien. Necesito unos días: estoy comparando la cera con la de las demás. Benigna dice que no le toque las de su hermano. Ya le he tocado tres. —Pausa—. No se lo digas.' },
			{ chapter: { id: 'cirio', wait: true } },
		],
		cirio_espera_guardia: [
			{ text: 'Junto a la fuente de la plaza, Don Hilario está sentado en el pretil, con una cesta tapada con un trapo en las rodillas. No te mira.' },
			{ say: 'hilario', text: 'Subiste al faro. —No es una pregunta—. Las noches son del lago. Déjalas unos días. El lago también descansa.' },
			{ text: 'Se levanta y se va hacia el muelle. La cesta huele a pan.' },
			{ chapter: { id: 'cirio', wait: true } },
		],
	},
};
