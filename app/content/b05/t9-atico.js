// Bloque 5 · Pasada extra (2026-10-24, encargo de Mario): comprar el ático del Bulevar Norte.
//   b05_atico       Negocio (`ventures`): compras el inmueble del museo; Philippe sigue de conservador y sigue al frente.
//                   Aparece cuando el museo ya está inaugurado (`done.b05_s_museo`). Entrada ₽18 000 + mejoras ₽138 000.
//                   Líneas: visitas (dinero), eventos (alquiler por horas), recuerdos (objetos) y el trastero (bloqueada).
//                   Encargados: Philippe · Lucien (tras conocerlo de portero) · Matière.
//   Lucien          Portero del ático con su Chespin. Diálogos por avance (antes de Alola, Alola, tras Alola, Teselia, tras
//                   Teselia). Con `vars.lucien_viaje = 1` deja la portería y la lista de encargados (contrato en secreto/hilos.md).
//   atico_cuarto    Tu cuarto en el ático: cama (cura), PC, vitrina de medallas por región y muro de encuentros.
//                   La vitrina y el muro los genera el motor con la partida (`read.gen`, app/js/atico.js): nada inventado.
//                   El cuarto se llena con las mejoras del negocio y con lo vivido.
// El museo es lo público (decisiones e historia); el muro es lo íntimo (tus Pokémon). No repetir piezas del museo aquí.

const V = 'b05_atico';
const SOCIO = 'partner("' + V + '")';
const LUC = 'flag.b05_atico_lucien';
const LUC_AQUI = SOCIO + ' && !vars.lucien_viaje';
const CHESPIN = 'flag.b01_lucien_chespin';

export default {
	// =====================================================================
	// LUGAR: tu cuarto
	// =====================================================================
	locations: {
		atico_pesas: {
			name: 'Sala de pesas', short: 'Pesas', parent: 'museo_ficha', kind: 'building',
			bg: { type: 'indoor', wall: '#c9c2b8', floor: '#5a4a3a' },
			desc: 'Un cuarto estrecho con espejos en una pared y colchonetas en la otra. Philippe lo llama «el gimnasio del inmueble» y cobra por ello. Hay pesas de colores, un saco, y un cartel escrito a mano: «CADA RIVAL ENSEÑA UNA COSA».',
			mapNote: 'Sala de pesas · entrena un punto de esfuerzo a la vez',
			onEnter: [{ script: 'p9_pesas_llega', cond: '!flag.p9_pesas_vista', once: true }],
			spots: [
				{ label: 'Cómo funcionan los puntos de esfuerzo', sub: 'El cartel grande', icon: '📋', talk: [{ script: 'p9_pesas_cartel' }] },
				{ label: 'Ver el esfuerzo de tu equipo', sub: 'Una libreta colgada de un clavo', icon: '📓', talk: [{ script: 'p9_pesas_libreta' }] },
				{ label: 'Pesas de PS', sub: 'Rivales que dan PS', icon: '❤️', action: { training: { cap: 100, coach: 'La monitora de la sala', prompt: 'Rivales que suben los **PS**. Cada victoria da 2 puntos de esfuerzo de PS al que combata.', wild: [{ sp: 'lapras', lv: [48, 52] }, { sp: 'snorlax', lv: [48, 52] }, { sp: 'hariyama', lv: [48, 52] }, { sp: 'drifblim', lv: [48, 52] }] } } },
				{ label: 'Pesas de Ataque', sub: 'Rivales que dan Ataque', icon: '⚔️', action: { training: { cap: 100, coach: 'La monitora de la sala', prompt: 'Rivales que suben el **Ataque**. Cada victoria da 2 puntos de esfuerzo de Ataque.', wild: [{ sp: 'arcanine', lv: [48, 52] }, { sp: 'heracross', lv: [48, 52] }, { sp: 'scizor', lv: [48, 52] }, { sp: 'toxicroak', lv: [48, 52] }] } } },
				{ label: 'Pesas de Defensa', sub: 'Rivales que dan Defensa', icon: '🛡️', action: { training: { cap: 100, coach: 'La monitora de la sala', prompt: 'Rivales que suben la **Defensa**. Cada victoria da 2 puntos de esfuerzo de Defensa.', wild: [{ sp: 'steelix', lv: [48, 52] }, { sp: 'forretress', lv: [48, 52] }, { sp: 'skarmory', lv: [48, 52] }, { sp: 'gliscor', lv: [48, 52] }] } } },
				{ label: 'Pesas de Ataque Especial', sub: 'Rivales que dan Ataque Especial', icon: '✨', action: { training: { cap: 100, coach: 'La monitora de la sala', prompt: 'Rivales que suben el **Ataque Especial**. Cada victoria da 2 puntos de esfuerzo de Ataque Especial.', wild: [{ sp: 'houndoom', lv: [48, 52] }, { sp: 'espeon', lv: [48, 52] }, { sp: 'golduck', lv: [48, 52] }, { sp: 'zoroark', lv: [48, 52] }] } } },
				{ label: 'Pesas de Defensa Especial', sub: 'Rivales que dan Defensa Especial', icon: '🔮', action: { training: { cap: 100, coach: 'La monitora de la sala', prompt: 'Rivales que suben la **Defensa Especial**. Cada victoria da 2 puntos de esfuerzo de Defensa Especial.', wild: [{ sp: 'tentacruel', lv: [48, 52] }, { sp: 'umbreon', lv: [48, 52] }, { sp: 'milotic', lv: [48, 52] }, { sp: 'slowking', lv: [48, 52] }] } } },
				{ label: 'Pesas de Velocidad', sub: 'Rivales que dan Velocidad', icon: '💨', action: { training: { cap: 100, coach: 'La monitora de la sala', prompt: 'Rivales que suben la **Velocidad**. Cada victoria da 2 puntos de esfuerzo de Velocidad.', wild: [{ sp: 'jolteon', lv: [48, 52] }, { sp: 'starmie', lv: [48, 52] }, { sp: 'manectric', lv: [48, 52] }, { sp: 'aerodactyl', lv: [48, 52] }] } } },
				{ label: 'Volver a tu cuarto', icon: '🚪', action: { go: 'atico_cuarto' } },
			],
		},
		atico_cuarto: {
			name: 'Tu cuarto en el ático', short: 'Tu cuarto', parent: 'museo_ficha', kind: 'building',
			bg: { type: 'indoor', wall: '#d9cfe0', floor: '#7a5a40' },
			desc: 'El cuarto del fondo del ático, el que Philippe llamaba «el trastero con ambiciones». Techo inclinado, una ventana redonda que da a la **Puerta Lemnis** y una cama que cruje en dos idiomas.\n\nHay un PC en una mesa plegable, una vitrina vacía de madera y una pared de corcho con tachuelas sueltas. Es poco. Es tuyo.',
			descs: [{ cond: 'flag.b05_atico_muebles', text: 'El cuarto del fondo del ático. Ya no parece un trastero: hay una alfombra de rayas, un sillón que no hace juego con nada y una lámpara que Philippe jura que es «de época». La ventana redonda sigue dando a la **Puerta Lemnis**, que zumba bajito.\n\nLa vitrina de las medallas brilla en su rincón y la pared de corcho se va llenando sola.' }],
			descNight: 'De noche, la Puerta pinta el techo inclinado de azul. El zumbido se oye mejor con la luz apagada. Al rato ya no se oye: se nota, como un gato que ronronea en otra habitación.',
			mapNote: 'Tu cuarto · cama, PC, medallas y muro',
			onEnter: [{ script: 'b05_atico_cuarto_llega', cond: '!flag.b05_atico_cuarto_visto', once: true }],
			spots: [
				{ label: 'La cama', sub: 'Cruje, pero se duerme de maravilla', icon: '🛏️', talk: [{ script: 'b05_atico_cama' }] },
				{ label: 'El PC', sub: 'En una mesa plegable', icon: '💻', action: { pc: true } },
				{ label: 'La vitrina de las medallas', sub: 'Un estante por región', icon: '🏅', talk: [{ script: 'b05_atico_vitrina' }] },
				{ label: 'El muro de encuentros', sub: 'Fotos con tachuelas de colores', icon: '📌', talk: [{ script: 'b05_atico_muro' }] },
				{ label: 'Un dibujo pegado en la puerta', sub: 'Con la hora escrita en una esquina', icon: '🖍️', cond: LUC, talk: [{ script: 'b05_atico_dibujo' }] },
				{ label: 'El sillón que no hace juego', sub: 'Y una alfombra de rayas', icon: '🛋️', cond: 'flag.b05_atico_muebles', talk: [{ script: 'b05_atico_sillon' }] },
				{ label: 'Una postal en el espejo', sub: 'Una playa y un volcán', icon: '🌺', cond: 'flag.b05_atico_muebles && visited("hauoli")', talk: [{ script: 'b05_atico_postal' }] },
				{ label: 'La ventana redonda', sub: 'Da a la Puerta', icon: '🪟', talk: [{ script: 'b05_atico_ventana' }] },
				// Sala de pesas (pedido de Mario, 2026-10-28): entrenar un stat concreto con rivales que dan ese punto de esfuerzo
				{ label: 'La sala de pesas', sub: 'Un cuarto con espejos y olor a tiza', icon: '🏋️', action: { go: 'atico_pesas' }, new: '!flag.p9_pesas_vista' },
			],
		},
	},

	// Entradas en el vestíbulo del ático (museo_ficha, B5 T7)
	extraSpots: {
		museo_ficha: [
			{ label: 'Philippe, con una carpeta del banco', sub: 'Te mira, mira la carpeta y vuelve a mirarte', icon: '📁', cond: 'done.b05_s_museo && !flag.b05_atico_oferta && !' + SOCIO, new: 'true', talk: [{ script: 'b05_atico_oferta' }] },
			{ label: 'Las escrituras del ático', sub: 'En una carpeta con un lazo rojo', icon: '📜', cond: 'flag.b05_atico_oferta || ' + SOCIO, action: { venture: V } },
			{ label: 'Lucien, en un taburete junto a la puerta', sub: 'Con su Chespin y una libreta llena de horas', icon: '🧢', cond: LUC_AQUI, new: '!' + LUC, talk: [
				{ cond: '!' + LUC, script: 'b05_atico_lucien_1' },
				{ cond: 'flag.b06_fin', script: 'b05_atico_lucien_5' },
				{ cond: 'flag.b06_inicio_hecho', script: 'b05_atico_lucien_4' },
				{ cond: 'flag.b05_fin', script: 'b05_atico_lucien_3' },
				{ cond: 'flag.b05_inicio_hecho', script: 'b05_atico_lucien_2' },
				{ script: 'b05_atico_lucien_0' },
			] },
			{ label: 'La libreta de portero', sub: 'Encima del taburete, abierta', icon: '📓', cond: LUC_AQUI + ' && ' + LUC, talk: [{ script: 'b05_atico_libreta' }] },
			{ label: 'Tu cuarto', sub: 'La puerta del fondo del pasillo', icon: '🚪', cond: SOCIO, new: '!flag.b05_atico_cuarto_visto', action: { go: 'atico_cuarto' } },
		],
	},

	// =====================================================================
	// NEGOCIO
	// =====================================================================
	ventures: {
		b05_atico: {
			name: 'Ático del Bulevar Norte', icon: '🏛️', loc: 'museo_ficha', partner: 'philippe',
			cond: 'done.b05_s_museo',
			blurb: 'Un ático que zumba, un museo que no cobra entrada y un agente inmobiliario que por fin ha vendido algo.',
			buy: { cost: 18000, text: '«Phil-osofía: una casa no se vende; se encuentra con quien la estaba buscando. Y tú la estabas buscando. Aunque no lo supieras. Firma aquí. Y aquí. Y aquí no, que es el ticket del café.»', script: 'b05_atico_compra' },
			share: [{ pct: 50 }],
			upkeep: 600, store: 3,
			lines: {
				visitas: { name: 'Visitas al museo', icon: '🎟️', desc: 'La entrada es «la voluntad». Philippe se encarga de que la voluntad sea generosa con trucos de magia en la cola. Salen mal. La gente paga igual, por pena o por risa.', money: 1400 },
				eventos: { name: 'Alquiler por horas', icon: '📸', desc: 'Sesiones de fotos con la Puerta de fondo, presentaciones de libros, una pedida de mano al mes. El zumbido se vende como «ambiente».', money: 1600 },
				recuerdos: { name: 'Mostrador de recuerdos', icon: '🧸', desc: 'Crêpes de la panadería de abajo, muñecos de trapo y lo que los visitantes dejan olvidado en el libro de visitas, que a veces brilla.', money: 200,
					items: [{ id: 'lumiosegalette', perDay: 1 }, { id: 'pokedoll', perDay: 0.3 }, { id: 'stardust', perDay: 0.15 }, { id: 'starpiece', perDay: 0.04 }] },
				trastero: { name: 'El trastero', icon: '📦', desc: 'Las cajas «para la ficha número uno» que no caben en ninguna sala. Philippe no las abre: dice que no son para el museo, son para ti. Salen pocas y nunca dos iguales.', locked: true,
					items: [{ id: 'ppmax', perDay: 0.03 }, { id: 'rarecandy', perDay: 0.05 }, { id: 'pearlstring', perDay: 0.03 }, { id: 'cometshard', perDay: 0.02 }, { id: 'soothebell', perDay: 0.02 }] },
			},
			upgrades: [
				{ id: 'bombillas', name: 'Bombillas de verdad', cost: 3000, mult: { all: 1.1 },
					desc: 'Hasta ahora la luz la ponía la Puerta. Es bonita, pero es azul, y la gente sale de las salas con cara de pescado. Unas bombillas cálidas en cada sala.' },
				{ id: 'cartel', name: 'Un cartel en el portal', cost: 6000, mult: { visitas: 1.3 },
					desc: '«MUSEO DE LA FICHA NÚMERO UNO · 5.º SIN ASCENSOR · MERECE LA PENA». Lo pintó Philippe. La ñ de «pena» es una chistera. Más visitas.' },
				{ id: 'cortinas', name: 'Cortinas gruesas para el ventanal', cost: 8000, mult: { eventos: 1.35 },
					desc: 'Terciopelo granate, a juego con la vitrina del centro. Corridas, el zumbido baja a la mitad y se pueden alquilar las salas para cosas serias. Abiertas, siguen las vistas.' },
				{ id: 'muebles', name: 'Amueblar tu cuarto', cost: 12000, mult: { all: 1.05 }, set: { 'flag.b05_atico_muebles': true }, script: 'b05_atico_up_muebles',
					desc: 'Una alfombra, un sillón, una lámpara «de época» y un espejo. Lo elige Philippe, que tiene un gusto muy suyo. Tu cuarto deja de parecer un trastero.' },
				{ id: 'garita', name: 'Una garita para el portero', cost: 5000, mult: { visitas: 1.1 }, cond: LUC, set: { 'flag.b05_atico_garita': true }, script: 'b05_atico_up_garita',
					desc: 'Un mostradorcito de madera junto a la puerta, con un timbre y un cartel de «PORTERÍA». Lucien deja de trabajar en un taburete. Se toma el cargo muy en serio.' },
				{ id: 'mostrador', name: 'Mostrador con vitrina', cost: 14000, mult: { recuerdos: 1.5 }, slots: 1,
					desc: 'Un mostrador de verdad para los recuerdos, con cristal y llave. Ya no se apilan los muñecos en una silla. Sitio para un Pokémon más trabajando.' },
				{ id: 'escalera', name: 'Arreglar la escalera del portal', cost: 20000, store: 1, upkeep: -100,
					desc: 'Cinco pisos sin ascensor y un escalón, el del cuarto, que cruje como una puerta de castillo. Escalera nueva y barandilla. Los proveedores suben más a menudo: un día más de almacén.' },
				{ id: 'trastero', name: 'Abrir el trastero', cost: 30000, unlock: 'trastero', set: { 'flag.b05_atico_trastero': true }, script: 'b05_atico_up_trastero',
					desc: 'Detrás de tu cuarto hay una puertecita que nadie abre desde hace años. Estanterías, una bombilla y espacio para las cajas que no caben en el museo. Abre una línea nueva.' },
				{ id: 'escritura', name: 'Liquidar lo que queda de hipoteca', cost: 40000, share: 15, need: ['cartel'],
					desc: 'Con tu compra el banco se calmó, pero el ático aún arrastra un resto de hipoteca. Pagado, la parte del inmueble es más tuya. Philippe te apunta 15 puntos más y llora un poco al firmar.' },
			],
			jobs: { slots: 2, types: ['Psychic', 'Fairy', 'Electric'], favs: { fennekin: 0.06, mareep: 0.05, klefki: 0.08, mimejr: 0.06, flabebe: 0.04 },
				text: 'Hacer de guía, encender las vitrinas, guardar llaves o ayudar a Philippe con los trucos para que, por una vez, salgan bien.' },
			managers: [
				{ npc: 'philippe', desc: 'Lo lleva él, entre visita y visita y entre truco y truco. Cuando las cosas van bien, vende entradas hasta en la escalera.', mult: { visitas: 1.15 } },
				{ npc: 'lucien', cond: LUC + ' && !vars.lucien_viaje', wage: 150, mult: { visitas: 1.25, recuerdos: 1.1 },
					desc: 'Lleva el ático con su libreta: apunta quién entra, a qué hora y cuánto tiempo mira cada pieza. Le pagan en crêpes y en una paga que su madre le guarda.' },
				{ npc: 'matiere', wage: 400, mult: { eventos: 1.4 },
					desc: 'La Agencia usa las salas para reuniones «discretas» y se las alquila a quien sepa guardar un secreto. Mejores eventos. Faltan macarons.' },
			],
			eventRate: 0.7,
			events: [
				{ id: 'cliente', name: 'Un cliente para el zumbido', w: 3, npc: 'philippe',
					text: '¡Ficha número uno! Un señor quiere alquilar el ático entero un fin de semana. Para «meditar con la Puerta». Le he dicho que es un museo. Me ha dicho que mejor, que así medita rodeado de cultura. Paga bien. Muy bien. Phil-osofía: el dinero no huele, pero este señor sí. A incienso.',
					options: [
						{ text: '«Que medite.»', result: 'El señor medita dos días con los ojos cerrados delante del ventanal. Paga, da las gracias y se lleva un muñeco del mostrador «para el camino». El museo, cerrado el fin de semana.', effect: { money: 2500, boost: { mult: { visitas: 0.8 }, days: 2, label: 'Cerrado por meditación' } } },
						{ text: '«Es un museo, Philippe.»', result: 'Philippe asiente muy serio, se quita la chistera y cuelga un cartel: «Prohibido meditar». El sábado hay cola.', effect: { boost: { mult: { visitas: 1.15 }, days: 2, label: 'Museo abierto' } } },
					] },
				{ id: 'palomas', name: 'El truco de las palomas', w: 3, npc: 'philippe',
					text: 'Tengo una noticia buena y una mala. La buena: el truco de los Pidove por fin sale. La mala: salen todos. Por el ventanal. Y uno se ha quedado en la vitrina de Crómlech y no quiere bajar.',
					options: [
						{ text: '«Ya volverán.»', result: 'Vuelven a los dos días, uno a uno, como si no hubiera pasado nada. Mientras tanto, el museo huele a alpiste.', effect: { boost: { mult: { all: 0.9 }, days: 2, label: 'Olor a alpiste' } } },
						{ text: 'Pagar una red para el ventanal', cost: 800, result: 'Red fina, casi invisible. Los Pidove se quedan dentro y el truco sale tres veces seguidas. La tercera, el público aplaude de verdad.', effect: { boost: { mult: { visitas: 1.2 }, days: 3, label: 'El truco sale' } } },
					] },
				{ id: 'minutos', name: 'Dos minutos', w: 2, npc: 'lucien', cond: LUC + ' && !vars.lucien_viaje',
					text: '¡Emergencia de portero! Bueno, emergencia no. Dato. La Puerta ha zumbado a las 2:19. ¡A LAS 2:19! Siempre zumba a las 2:17. Lo he comprobado con el reloj de la cocina, con el de mi madre y con el del señor de la panadería. Dos minutos tarde. ¿Eso es mucho para una Puerta?',
					options: [
						{ text: '«Apúntalo. Con horas.»', result: 'Lo apunta en mayúsculas, lo subraya dos veces y le pone una estrella. Esa semana trabaja como nunca: quiere estar despierto por si vuelve a pasar.', effect: { boost: { mult: { visitas: 1.1 }, days: 2, label: 'Portero en guardia' } } },
						{ text: '«Lucien, a las 2:19 tú duermes.»', result: '«Ya. Mi madre dice lo mismo». Pausa. «Pero con más gritos». Se va a dormir. La libreta se queda abierta por la página de la estrella.' },
						{ text: 'Regalarle un despertador', cost: 500, result: 'Un despertador con forma de Chespin. El Chespin de verdad lo mira con mucha desconfianza. Lucien pone la alarma a las 2:16 «para estar preparado».', effect: { happy: 5 } },
					] },
				{ id: 'cordon', name: 'El cordón de la cinta', w: 2, npc: 'lucien', cond: LUC + ' && ' + CHESPIN + ' && !vars.lucien_viaje',
					text: 'No te enojes. Chespin se ha comido el cordón de terciopelo de la sala de Kalos. El de no pasar. Ahora se puede pasar. Bueno, siempre se podía, era un cordón. Pero ahora también se puede pasar oficialmente.',
					options: [
						{ text: '«Que pase la gente.»', result: 'La gente pasa, toca la canica de escayola y la canica sale rodando. Philippe la persigue por el pasillo. Lucien lo apunta todo, con horas.', effect: { boost: { mult: { visitas: 0.9 }, days: 1, label: 'Sin cordón' } } },
						{ text: 'Comprar un cordón nuevo', cost: 600, result: 'Cordón nuevo, más grueso. Chespin lo huele, lo respeta y se va a dormir debajo de la vitrina de Johto. Lucien le pone una etiqueta: «Pieza viva. No tocar».', effect: { happy: 5 } },
					] },
				{ id: 'excursion', name: 'Excursión del colegio', w: 2, npc: 'lucien', cond: LUC + ' && !vars.lucien_viaje',
					text: '¡Viene mi clase! ¡Mañana! ¡Treinta niños! La profesora quería ir al Museo de Luminalia, pero le he dicho que este es mejor porque aquí la ficha número uno existe de verdad. Y te conozco. ¿Vienes? Di que sí. Di que vienes.',
					options: [
						{ text: '«No puedo, Lucien.»', result: 'Lucien hace la visita guiada él solo. Dura tres horas. Al final, la profesora le pregunta si quiere ser guía de mayor. Dice que no: «viajero». Los niños se llevan muñecos.', effect: { boost: { mult: { recuerdos: 1.2 }, days: 2, label: 'Treinta niños' } } },
						{ text: 'Pagar la merienda', cost: 1200, result: 'Crêpes para treinta. Philippe hace un truco y le sale bien a la primera; los niños no se lo creen y él tampoco. Una semana después, vienen los padres.', effect: { boost: { mult: { visitas: 1.3 }, days: 3, label: 'Lo cuentan en el colegio' } } },
					] },
				{ id: 'macarons', name: 'El caso de los macarons', w: 2, npc: 'matiere',
					text: 'Me he fijado en una cosa. Cada lunes dejo seis macarons en la vitrina de Crómlech. Cada martes quedan cuatro. Philippe dice que no es él. Lucien dice que no es él. Chespin no dice nada, que es justo lo que diría un culpable. Voy a investigar. Esto es personal.',
					options: [
						{ text: '«Deja seis más.»', result: 'Ocho macarons. Al día siguiente quedan cinco y una nota: «Perdón. Estaban buenos. —H.». Matière la guarda en una bolsa de pruebas, sonriendo.', effect: { happy: 3 } },
						{ text: 'Pagar una caja grande de macarons', cost: 900, result: 'Una caja de veinte. Nadie roba ninguno: ya no tiene gracia. Las reuniones de la Agencia se alargan y se alquilan más salas.', effect: { boost: { mult: { eventos: 1.25 }, days: 3, label: 'Reuniones con macarons' } } },
					] },
				{ id: 'vecinos', name: 'Carta de la junta de vecinos', w: 2, npc: 'philippe',
					text: 'Ha llegado una carta de la junta de vecinos. Se quejan del ruido. Del zumbido. —Lo lee dos veces—. Les he contestado que el zumbido no es del ático, es de la Puerta, y que la Puerta no paga mantenimiento. No les ha hecho gracia. Quieren una cuota extra para insonorizar el portal.',
					options: [
						{ text: 'Pagar la cuota extra', cost: 2000, result: 'Corcho en el portal y una alfombra en la escalera. Los vecinos dejan de escribir. Uno sube a ver el museo y firma en el libro: «No está mal. Sigue zumbando».', effect: { boost: { mult: { all: 1.1 }, days: 3, label: 'Paz en la escalera' } } },
						{ text: '«Que se quejen a la Puerta.»', result: 'Philippe se lo dice así, con esas palabras. Una semana de miradas en el ascensor que no existe. Hay menos visitas.', effect: { boost: { mult: { visitas: 0.85 }, days: 2, label: 'Vecinos molestos' } } },
					] },
				{ id: 'caja', name: 'Una caja sin remitente', w: 2, npc: 'philippe',
					text: 'Ha llegado otra caja «para la ficha número uno». Pero esta no es para el museo, lo pone en la tapa: «No es para exponer. Es para que lo use». Phil-osofía: hay regalos que no se miran; se usan. No la he abierto. Bueno, un poquito.',
					options: [
						{ text: 'Abrirla del todo', result: 'Dentro, envueltas en papel de periódico de Luminalia, unas cuantas cosas brillantes y una nota que solo dice «para el camino».', effect: { items: [{ id: 'stardust', n: 2 }] } },
						{ text: 'Guardarla en el trastero', cond: 'flag.b05_atico_trastero', result: 'Philippe la lleva en brazos como si fuera un bebé. Al ponerla en la estantería suena algo dentro. El trastero rinde más esa semana.', effect: { boost: { mult: { trastero: 1.5 }, days: 3, label: 'Caja en el trastero' } } },
					] },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		p9_pesas_llega: [
			{ set: { 'flag.p9_pesas_vista': true } },
			{ text: 'La sala huele a tiza y a plástico nuevo. Una mujer con coleta y silbato te mira de arriba abajo, luego mira a {riolu}, y asiente como si hubiera decidido algo.' },
			{ say: null, as: 'Monitora', text: 'Philippe me dijo que el dueño tenía «un equipo de campeonato». No me dijo que estaba hecho a ojo. —Da una palmada—. Aquí no se sube de nivel: aquí se decide **en qué** es bueno cada uno. Elige una pesa, pelea, y ese punto crece. Nada más. Nada menos.' },
			{ say: null, as: 'Monitora', text: 'Con un **Brazal Firme** se gana el doble. Con los objetos **Recios** (Pesa, Brazal, Cinto, Lente, Banda, Franja) aún más. Cada Pokémon aguanta 510 puntos en total, 252 por stat. Lo tienes todo en el cartel.' },
		],
		p9_pesas_cartel: [
			{ text: 'CADA RIVAL ENSEÑA UNA COSA.\n\nCada Pokémon que vences deja **puntos de esfuerzo** en el que combatió: 4 puntos suben 1 de stat al nivel 100 (menos a niveles bajos, pero cuentan). Máximo **252 por stat** y **510 en total**.\n\nCon **Brazal Firme** se gana el doble; con el objeto **Recio** de ese stat, +8 por combate.\n\nLas pesas de esta sala dan **2 puntos** por victoria, todos del mismo stat. Con «Repartir Experiencia» activado (Ajustes), los puntos van a todo el equipo; sin él, solo a quien pelea.' },
		],
		p9_pesas_libreta: [
			{ read: { gen: 'esfuerzo' } },
		],

		// ---------- La oferta ----------
		b05_atico_oferta: [
			{ set: { 'flag.b05_atico_oferta': true } },
			{ text: 'Philippe se sienta en la escalera del ático con una carpeta del banco en las rodillas. Lleva la chistera torcida. No es un truco: se le ha olvidado ponerla bien.' },
			{ say: 'philippe', text: '¡Ficha número uno! Justo a ti quería verte. Bueno, a ti y a nadie más, que es lo mismo que decir a ti dos veces.' },
			{ say: 'philippe', text: 'El banco me ha mandado una carta. Muy educada. Muy fría. Dice que un ático que no se alquila es «un activo improductivo» y que la hipoteca no se paga con vistas. Que o lo alquilo antes de fin de mes o lo tengo que vender. —Pausa—. Con el museo dentro. Como si fuera un mueble.' },
			{ choice: [
				{ text: '«¿Y cuánto piden?»', then: [
					{ say: 'philippe', text: '¿Por el ático? Poco, porque zumba. Lo justo para que el banco me deje en paz: dieciocho mil. Es el precio más bajo de todo el Bulevar Norte. Lo he negociado yo. Contra mí mismo. He perdido.' },
				] },
				{ text: '«No pueden vender un museo.»', then: [
					{ say: 'philippe', text: 'Eso les dije. Me contestaron que el museo es mío, pero el techo es medio suyo. Y sin techo, un museo es una exposición al aire libre. Y aquí llueve.' },
				] },
				{ text: '«¿Y si lo compro yo?»', then: [
					{ say: 'philippe', text: '¿Tú? —Se le cae la carpeta. De la carpeta sale un pañuelo. Del pañuelo, otro—. ¡Eso iba a proponerte yo! ¡Me lo has robado! Es lo más bonito que me han robado nunca.' },
				] },
			] },
			{ say: 'philippe', text: 'Mira, te lo digo como agente y como conservador. Si compras el ático, el techo es tuyo. El museo sigue siendo de quien lo cuida, y ese soy yo. Las visitas, el alquiler de las salas y lo que se venda en el mostrador, a medias.' },
			{ say: 'philippe', text: 'Y el cuarto del fondo. El de la ventana redonda. Ese no lo alquilo a nadie: ese es tuyo. Phil-osofía: todo el mundo necesita un sitio donde dejar la mochila sin que nadie le pregunte por qué pesa tanto.' },
			{ say: 'philippe', text: 'Las escrituras están en la carpeta del lazo rojo. Sin prisa. Bueno, con un poco de prisa: fin de mes.' },
			{ venture: V },
		],

		// ---------- Al comprar (buy.script) ----------
		b05_atico_compra: [
			{ text: 'Philippe firma con una pluma que suelta tinta por los dos lados. Firmas tú. La pluma, de pronto, suelta un ramo de flores de papel. Es lo único que le ha salido bien en toda la mañana.' },
			{ say: 'philippe', text: '¡Vendido! ¡VENDIDO! —Se para—. Perdona. Es la primera vez en tres años que lo digo de verdad. Déjame decirlo otra vez. Vendido.' },
			{ say: 'philippe', text: 'Ahora eres dueñ{o|a|e} del ático del Bulevar Norte. Con zumbido, con vistas y con un conservador incluido, que no se puede devolver.' },
			{ say: 'philippe', text: 'Ah, y otra cosa. El ático viene con portero. No lo he contratado yo. Se ha contratado él solo. Llegó el lunes con un taburete y no se ha ido. Está en la puerta. Lo vas a reconocer por la libreta.', cond: '!vars.lucien_viaje' },
			{ say: 'rotom', text: '¡Bzzt! Te guardo el ático en **Negocios**. ¡Y tienes cuarto propio! Está al fondo del pasillo: cama, PC y una pared enorme para fotos. ¡Me encanta! ¡Bzzt!' },
			{ intel: { npc: 'philippe', text: 'Le compraste el ático del Bulevar Norte (Luminalia). El inmueble es tuyo; el museo sigue siendo de Philippe, que lo cuida como conservador. Las ganancias, a medias.' } },
		],

		// ---------- Lucien, portero ----------
		b05_atico_lucien_1: [
			{ set: { 'flag.b05_atico_lucien': true } },
			{ text: 'Junto a la puerta del ático hay un taburete de cocina. En el taburete, Lucien, con la gorra del revés y una libreta en las rodillas. Debajo del taburete, enroscado, un Chespin que te mira con un ojo.', cond: CHESPIN },
			{ text: 'Junto a la puerta del ático hay un taburete de cocina. En el taburete, Lucien, con la gorra del revés y una libreta en las rodillas.', cond: '!' + CHESPIN },
			{ say: 'lucien', text: '¡Alto! ¿Nombre y hora de llegada? —Te mira—. ¡ERES TÚ! Hora de llegada: ahora. Lo apunto. Ya está. Puedes pasar. Bueno, puedes pasar siempre, que el ático es tuyo. Me lo ha dicho Philippe. ¡Es tuyo!' },
			{ say: 'lucien', text: 'Soy el portero. Bueno, «portero en prácticas». Philippe dice que no me puede contratar porque tengo doce años. Mi madre dice que puedo venir si hago la tarea aquí. Así que hago la tarea y, de paso, vigilo.' },
			{ say: 'lucien', text: 'Y Chespin también vigila. Él vigila por abajo. Si alguien quiere robar algo, le muerde los cordones. Ya ha pasado una vez. Era Philippe. Pero Philippe no quería robar nada, quería atarse los zapatos.', cond: CHESPIN },
			{ choice: [
				{ text: '«¿Y por qué aquí?»', then: [
					{ say: 'lucien', text: 'Porque desde este ventanal se ve la Puerta mejor que desde la valla de la Plaza. Y no hay guardias que te digan «niño, aparta». Y hay crêpes. Philippe me paga en crêpes.' },
				] },
				{ text: '«Gracias por cuidarlo, Lucien.»', then: [
					{ say: 'lucien', text: '… —Se pone muy rojo. Apunta algo en la libreta—. «Me ha dado las gracias. Hora: ahora». Es para tener pruebas.' },
				] },
				{ text: '«¿Lo apuntas todo?»', then: [
					{ say: 'lucien', text: '¡Todo! ¡Con horas! Quién entra, quién sale, cuánto tarda la gente en la vitrina de Crómlech (mucho) y cuándo zumba la Puerta (siempre a las 2:17). Los investigadores apuntan. Y los porteros también.' },
				] },
			] },
			{ say: 'lucien', text: 'Toma. —Arranca una hoja de la libreta y te la da—. Es para tu cuarto. Lo he dibujado yo. Eres tú. Te he hecho la cabeza más pequeña que la otra vez. Más o menos.' },
			{ say: 'philippe', text: '—Desde el fondo del pasillo— ¡Si el portero quiere llevar el ático algún día, que me lo pida por escrito! ¡Y con letra clara!' },
			{ say: 'lucien', text: '¡Con letra clara y con horas!' },
			{ toast: 'Lucien puede llevar el ático (Negocios › Encargado).' },
		],
		b05_atico_lucien_0: [
			{ say: 'lucien', text: '{jugador}. Hora: ahora. —Lo apunta—. Novedades del día: tres visitas, un señor que ha llorado en la sala de Johto, Philippe ha sacado un pañuelo sin querer y la Puerta ha zumbado a las 2:17. Como siempre.' },
			{ say: 'lucien', text: 'Oye, ¿cuándo te vas otra vez? Cuando te vayas, avísame, que lo apunto. Lo de cuándo vuelves también.' },
		],
		b05_atico_lucien_2: [
			{ say: 'lucien', text: '¡Alola! ¡Te vas a Alola! ¡Lo he leído en el tablón de la Gira! —Se le cae la libreta—. ¿Me traes arena? En un bote. Con la hora a la que la recogiste escrita en la tapa.' },
			{ say: 'lucien', text: 'Chespin quiere un coco. No sabe qué es un coco, pero le he enseñado una foto y ha hecho así con las púas. Eso es que sí.', cond: CHESPIN },
			{ say: 'lucien', text: 'Yo vigilo el ático mientras tanto. Y la Puerta. Si pasa algo raro, te lo apunto. Si no pasa nada, también, porque eso también es un dato.' },
		],
		b05_atico_lucien_3: [
			{ say: 'lucien', text: '¡Has vuelto! ¡Estás más moren{o|a|e}! Hora de vuelta: ahora. Lo apunto. —Lo apunta. Lo subraya—. ¿Y mi arena?' },
			{ say: 'lucien', text: 'Mientras estabas fuera, la Puerta ha zumbado todos los días a las 2:17. Menos uno, que zumbó a las 2:17 y otra vez a las 2:18, bajito. Como un eco. Philippe dice que fue el refrigerador. El refrigerador no hace eco.' },
		],
		b05_atico_lucien_4: [
			{ say: 'lucien', text: '¿Teselia? ¿Es verdad que allí los puentes son tan largos que no se ve el final? ¡Hazles fotos! Desde el principio, para que se note que no se ve el final.' },
			{ say: 'lucien', text: 'Dato de portero: desde que te fuiste a Teselia, Chespin no duerme debajo del taburete. Duerme delante del ventanal, mirando la Puerta. Si le llamas, no viene. Viene luego, cuando quiere.', cond: CHESPIN },
			{ say: 'lucien', text: 'Dato de portero: desde que te fuiste a Teselia, la gente se queda más rato mirando por el ventanal. Nadie sabe por qué. Yo tampoco. Pero lo apunto.', cond: '!' + CHESPIN },
		],
		b05_atico_lucien_5: [
			{ say: 'lucien', text: '{jugador}. Hora: ahora. —No lo apunta. Se queda con el lápiz en el aire—. Oye, ¿tú has notado que la Puerta ya no zumba igual?' },
			{ say: 'lucien', text: 'Antes hacía «mmmm». Ahora hace «mmMMmm». Como cuando alguien te llama desde otra habitación y no sabes si te ha llamado o te lo has imaginado.' },
			{ text: 'Chespin está sentado en el alféizar del ventanal, muy quieto, con las púas un poco levantadas.', cond: CHESPIN },
			{ say: 'lucien', text: 'Mi madre dice que, de tanto mirar la Puerta, un día la Puerta me va a mirar a mí. —Se ríe. Un poco—. Qué tontería. ¿Verdad que es una tontería?' },
			{ choice: [
				{ text: '«Es una tontería.»', then: [{ say: 'lucien', text: 'Eso. Una tontería. —Vuelve a la libreta. Apunta la hora. La apunta dos veces—.' }] },
				{ text: '«Si pasa algo raro, llámame.»', then: [{ say: 'lucien', text: '¡Te llamo! Con horas. —Te mira muy serio, como un adulto pequeño—. Y tú contesta, ¿eh? Que aquí todo el mundo se va y no contesta.' }] },
			] },
		],
		b05_atico_libreta: [
			{ text: 'La libreta de portero de Lucien. En la tapa pone «REGISTRO OFICIAL. NO TOCAR (MENOS {jugador})».' },
			{ if: 'flag.b06_fin', then: [{ read: { title: 'Registro de portero (Lucien)', text: '*(Letra de niño, muy apretada. La hora siempre al margen.)*\n\n**2:17** — zumba.\n**2:17** — zumba otra vez. Dos veces seguidas. Ya van seis noches.\n**2:18** — Chespin se sube al alféizar. No baja.\n**10:05** — visita: una señora con un Furfrou. Mira la baraja. Dice «qué bonito». Se va.\n**18:40** — Philippe hace el truco de la moneda. La moneda se cae por la rendija del suelo. Ya van tres.\n**2:17** — zumba. Más grave. No sé explicarlo. Lo dibujo: ~~~~~~ (pero más grave).\n\n*Nota para mí: preguntarle a {jugador} si en las otras regiones las Puertas también hablan bajito.*' } }] },
			{ if: 'flag.b05_fin && !flag.b06_fin', then: [{ read: { title: 'Registro de portero (Lucien)', text: '*(Letra de niño, muy apretada. La hora siempre al margen.)*\n\n**9:00** — abro. (Abre Philippe. Yo llego a las 9:00 y digo «abro».)\n**11:30** — visita: un señor de Johto. Llora en la sala de la mecedora. Le doy un pañuelo de Philippe. Philippe tiene muchos.\n**2:17** — zumba.\n**2:18** — zumba otra vez, bajito. Como un eco. Philippe: «el refrigerador». Yo: «el refrigerador no hace eco».\n**17:00** — Chespin muerde el cordón de Kalos. Lo arreglo con cinta.\n\n*Pendiente: arena de Alola (me la debe {jugador}).*' } }] },
			{ if: '!flag.b05_fin', then: [{ read: { title: 'Registro de portero (Lucien)', text: '*(Letra de niño, muy apretada. La hora siempre al margen.)*\n\n**9:00** — abro.\n**9:01** — no viene nadie.\n**10:12** — viene una señora. Se ha equivocado de piso. Le enseño el museo igual. Se queda una hora.\n**13:00** — crêpe (pago).\n**16:45** — Philippe me pregunta si quiero ser mago de mayor. Le digo que no: viajero. Me dice que es casi lo mismo, que los dos desaparecen.\n**2:17** — zumba. Como siempre.\n\n*Nota: la ficha número uno (=**{jugador}**) ha comprado el ático. Eso significa que este es su ático y que yo soy su portero. Oficial.*' } }] },
		],

		// ---------- Mejoras con escena ----------
		b05_atico_up_muebles: [
			{ text: 'Philippe sube los cinco pisos con una alfombra de rayas al hombro, un sillón de terciopelo verde que no hace juego con nada y una lámpara con flecos.' },
			{ say: 'philippe', text: '¡Decoración de autor! El sillón es de una señora de Novarte que se mudó a una casa más pequeña. La alfombra es de Johto. —Pausa—. De los grandes almacenes de Luminalia. Pero tiene rayas de Johto.' },
			{ say: 'philippe', text: 'Y un espejo. Phil-osofía: un cuarto sin espejo es un cuarto donde nunca sabes qué cara tienes al volver. Y tú vuelves mucho.' },
		],
		b05_atico_up_garita: [
			{ text: 'Una garita de madera junto a la puerta, con un timbre de hotel, un cartel que dice «PORTERÍA» y un cajón con llave. Lucien la mira como quien mira un castillo.' },
			{ say: 'lucien', text: '¡Tengo garita! ¡Tengo TIMBRE! —Lo toca. Ding—. ¡Ding! ¿Lo has oído? Voy a tocarlo cada vez que entre alguien. Y cada vez que zumbe la Puerta. Y cuando me aburra.' },
			{ say: 'philippe', text: 'Ya me estoy arrepintiendo. —Ding—. Mucho.' },
		],
		b05_atico_up_trastero: [
			{ text: 'La puertecita del fondo de tu cuarto se atasca, cede y se abre con un suspiro de polvo. Dentro hay estanterías vacías y una bombilla que se enciende sola cuando entras. Philippe jura que no ha sido él.' },
			{ say: 'philippe', text: 'Aquí irán las cajas que no son para el museo. Las que dicen «para que lo use» en vez de «para que lo vea». —Coloca la primera, con mucho cuidado—. No sé quién las manda. Pero las manda alguien que te conoce.' },
		],

		// ---------- Tu cuarto ----------
		b05_atico_cuarto_llega: [
			{ set: { 'flag.b05_atico_cuarto_visto': true } },
			{ text: 'El cuarto del fondo huele a madera vieja y a la colonia de Philippe, que ha pasado por aquí hace poco. En la cama hay una toalla doblada con forma de Pidove. Le falta un ala.' },
			{ say: 'philippe', text: 'La cama es buena. Cruje, pero es buena. El PC lo ha conectado Matière, así que funciona. La vitrina era de mi abuela y la pared de corcho, de la agencia: ahí colgábamos los pisos que no se vendían. Estaba llena.' },
			{ say: 'philippe', text: 'Ahora es para ti. Para tus Pokémon. Lo del museo es para que lo vea la gente; esto es para que lo veas tú. —Se arregla la chistera—. Eso me ha quedado muy bien. Me lo voy a apuntar.' },
			{ if: '(inParty("riolu") || inParty("lucario"))', then: [{ text: '{riolu} da una vuelta al cuarto, olisquea la cama, se asoma a la ventana redonda y se sienta debajo del muro de corcho. Como si supiera que es suyo también.' }] },
			{ diary: 'Hoy mi entrenador{|a|e} se ha comprado un ático. ¡Con cuarto! Tiene una ventana redonda que da a la Puerta, y de noche zumba. A mí me gusta el zumbido: es como dormir dentro de un aparato. Hay un muro para fotos. Pienso salir en todas. ¡Bzzt!', cond: 'flag.b01_diario' },
		],
		b05_atico_cama: [
			{ text: 'Te tumbas un rato. La cama cruje en dos idiomas. Por la ventana redonda, la Puerta zumba muy bajito, como una nana que nadie canta.' },
			{ heal: 'Tu equipo duerme hecho una bola a tu alrededor. Al despertar, todos tienen las fuerzas recuperadas.' },
			{ if: 'night && flag.b05_atico_muebles', then: [{ text: 'Alguien ha dejado una lámpara encendida en el pasillo, para que no te tropieces al levantarte. Tiene flecos.' }] },
		],
		b05_atico_vitrina: [
			{ text: 'La vitrina de la abuela de Philippe: madera oscura, cristal limpio y un estante por región, forrado de terciopelo azul.' },
			{ read: { title: 'Vitrina de las medallas', gen: 'medallas' } },
		],
		b05_atico_muro: [
			{ text: 'La pared de corcho de la agencia. Las fotos aparecen solas: Philippe dice que Rotom las imprime por la noche, y Rotom dice que Philippe las cuelga. Ninguno de los dos lo admite.' },
			{ read: { title: 'El muro de encuentros', gen: 'muro' } },
			{ say: 'rotom', text: '¡Bzzt! Cada vez que pase algo importante con tus Pokémon, sale una foto nueva. ¡Las saco yo! Bueno, quizá. ¡Bzzt!', cond: '!flag.b05_atico_muro_visto' },
			{ set: { 'flag.b05_atico_muro_visto': true } },
		],
		b05_atico_dibujo: [
			{ read: { title: 'Dibujo de Lucien', text: '*(Lápices de colores en una hoja de libreta. En una esquina, la hora: 16:52.)*\n\nUna persona con una mochila enorme, delante de una Puerta con forma de ocho tumbado. A su lado, {riolu}, con las orejas muy largas. Detrás, pequeño, un niño con gorra y un Chespin que saludan.\n\nDebajo, en letras grandes: «LA FICHA NÚMERO UNO Y SU PORTERO».\n\n*P. D.: la cabeza te ha salido normal. Lo he medido.*' } },
		],
		b05_atico_sillon: [
			{ text: 'El sillón de terciopelo verde es blando de una forma que da un poco de miedo: te hundes y no sabes cuándo vas a tocar fondo. La alfombra de rayas tiene una quemadura pequeña con forma de estrella. Philippe dice que «ya venía».' },
		],
		b05_atico_postal: [
			{ text: 'Una postal de Alola encajada en el marco del espejo: una playa, un volcán al fondo y, en el reverso, la letra de Philippe: «Para el cuarto de alguien que viaja. Para que se acuerde de que vuelve. —P.»' },
		],
		b05_atico_ventana: [
			{ if: 'night', then: [
				{ text: 'De noche, la Puerta Lemnis es un ocho tumbado de luz azul y plata. El zumbido se nota en el cristal si pones la mano. Abajo, el Bulevar Norte está vacío; arriba, la Puerta no duerme nunca.' },
			], else: [
				{ text: 'De día, la Puerta Lemnis casi no se ve: un brillo en el aire, como el de una carretera con calor. Pero zumba igual. Si pones la mano en el cristal, lo notas.' },
			] },
		],
	},
};
