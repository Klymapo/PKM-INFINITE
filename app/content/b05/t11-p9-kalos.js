// Pasada 9 · Secundarias en Kalos (2026-10-28). Tres misiones en zonas que el jugador ya pisó:
//   p9_s_carreras  Pueblo Boceto · la pista de Rhyhorn reabre: una carrera al día contra la campeona retirada (B1, `b01_s_rhyhorn`).
//                  Elecciones de pilotaje → segundos (`vars.p9_carrera_t`); mejor tiempo en `vars.p9_carrera_mejor`; una carrera por
//                  día (`vars.p9_carrera_wd`, día de la semana: el motor no expone el día del año). Premio por batirla la primera vez:
//                  MT Pulimento (`p9_mt_pulimento`, Roca); ₽ cada vez que se gana.
//   p9_s_magia     Luminalia, Café Soleil · la Noche de Magia: Philippe quiere que un truco le salga por fin. Baraja (Novarte o la
//                  pieza cero del museo), ensayo y función. Premio: Maxipepita + pieza para la Sala de Kalos del museo del ático.
//   p9_s_fosiles   Petroglifo · la cantera vieja (`p7_excavacion`) crece: mejora «Zanja profunda» (₽30 000) que abre la línea
//                  «La capa de los huesos» (fósiles, ~1 cada 5 días con todo el esfuerzo), un bloque para excavar a mano y una
//                  «bandeja nueva» del Restaurador que revive los fósiles que la máquina del B3 no admitía.
// Reglas: ids y flags con prefijo p9_, todo con `new`, nada se renombra. Sin spoilers en textos visibles.

const RH = 'flag.mount_rhyhorn && done.b01_s_rhyhorn';
const PISTA = 'flag.p9_carrera_vista';
const HOY = 'vars.p9_carrera_wd == weekday + 1'; // ya corrió hoy (día de la semana + 1, para no confundirlo con el 0 por defecto)
const LUC = '(inParty("riolu") || inParty("lucario"))';
const MAG = 'quest.p9_s_magia';
const SOCIO_E = 'partner("p7_excavacion")';
const FOS2 = 'has("rootfossil") || has("clawfossil") || has("skullfossil") || has("armorfossil") || has("coverfossil") || has("plumefossil")';
const pieza = (id, label, sub, icon, cond) => ({ label, sub, icon, cond, new: '!flag.museo_v_' + id, talk: [{ script: 'museo_' + id }] });

// La campeona hace la pista en 50 segundos «justos, como siempre». El jugador sale con 60 y cada decisión suma o resta.
const T0 = 60, RIVAL = 50;
const t = n => ({ set: { 'vars.p9_carrera_t': (n >= 0 ? '+' : '') + n } }); // '+0' suma cero (una cadena '0' sustituiría el valor)

export default {
	locations: {},
	trainers: {},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		p9_mt_pulimento: { name: 'MT Pulimento', pocket: 'machines', tm: 'rockpolish', desc: 'El usuario pule su cuerpo para reducir la resistencia. Sube mucho la Velocidad. La campeona de Boceto jura que así se ganan las curvas.' },
		p9_reglamento: { name: 'Reglamento de la pista de Boceto', pocket: 'key', desc: 'Una hoja plastificada, con las esquinas mordidas. Alguien la clavó en el poste de salida y alguien la arrancó, varias veces.',
			read: '**PISTA DE CARRERAS DE PUEBLO BOCETO**\n*Reglamento (versión corta; la larga se la comió un Rhyhorn)*\n\n1. Una carrera al día por jinete. El Rhyhorn se aburre, y un Rhyhorn aburrido se va.\n2. Se gana en la **curva**, no en la recta. Quien frene antes, sale antes.\n3. Al cuerno solo se agarran los novatos y los muertos. Agárrate a la silla.\n4. El charco grande no se rodea. Pregúntale a tu Rhyhorn.\n5. Si ganas a la campeona, lo dices tú. Ella no lo va a decir.\n6. La leche Mu-mu es para todos, también para los que pierden. Sobre todo para los que pierden.\n\n*(Debajo, con letra de niño, muy antigua:)* «La regla 2 es mentira. Se gana en todas partes.»' },
		p9_barajanueva: { name: 'Baraja «Prisma»', pocket: 'key', desc: 'Una baraja nueva del quiosco de Novarte, con la Torre Prisma en el dorso. Todavía huele a plástico. Le faltan cero cartas, que ya es más de lo que Philippe está acostumbrado.' },
		p9_barajaprestada: { name: 'La baraja de la suerte (en préstamo)', pocket: 'key', desc: 'La pieza cero del Museo de la Ficha Número Uno, fuera de su vitrina por una noche. Philippe te la ha dado envuelta en el pañuelo de su chistera y con un recibo firmado por él mismo, a él mismo.' },
		p9_croquis40: { name: 'Croquis n.º 40 de Petra', pocket: 'key', desc: 'Una servilleta de bar con un dibujo a bolígrafo, una mancha de café y tres flechas. Lazare la ha plastificado. No lo reconocerá.',
			read: '**CROQUIS N.º 40** *(servilleta; la 39 se mojó)*\n\nLazare: he vuelto a mirar las fotos de la zanja dos. Debajo de la veta, donde la roca cambia de gris a gris-más-oscuro, hay una **capa fina y negra**. Cuando una capa es así de fina y así de negra es porque **ahí se murió mucha gente a la vez**. Gente con concha, con pico, con aleta. Hace mucho.\n\nEs la capa de los huesos. Lo juro por mi muñeca buena.\n\nHay que bajar **recto**, no de lado: una zanja profunda, con tablas, hasta la línea negra. Yo lo haría con las manos, pero tú me dirías que no, y tendrías razón, y por eso te lo dibujo.\n\nFlecha 1: la zanja. Flecha 2: la capa. Flecha 3: el café. No hagas caso a la flecha 3.\n\n**P.** *(Pala pone la huella aquí: 🐾)*' },
	},

	// =====================================================================
	// PARCHES A LUGARES YA PUBLICADOS
	// =====================================================================
	patches: {
		// ---------- Pueblo Boceto: la pista reabre ----------
		boceto: { spots: [
			{ label: 'La pista, con banderines nuevos', sub: 'La campeona espera en la salida con dos Rhyhorn ensillados', icon: '🏁', cond: RH, new: '!' + PISTA, talk: [
				{ cond: '!' + PISTA, script: 'p9_carr_intro' },
				{ cond: HOY, script: 'p9_carr_hoy_no' },
				{ script: 'p9_carr_correr' },
			] },
			{ label: 'El muro de los tiempos', sub: 'Una pizarra con tizas, junto al poste de salida', icon: '🪨', cond: PISTA, talk: [{ script: 'p9_carr_muro' }] },
		] },

		// ---------- Luminalia: Café Soleil, Novarte y el museo ----------
		cafe_soleil: { spots: [
			{ label: 'Philippe, con un cartel enrollado', sub: 'Lo desenrolla, lo mira, lo vuelve a enrollar', icon: '🎩', cond: 'flag.b01_fin && !done.p9_s_magia',
				new: '!flag.p9_mag_1 || ' + MAG + ' == "ensayo" || ' + MAG + ' == "noche"', talk: [
				{ cond: '!flag.p9_mag_1', script: 'p9_mag_intro' },
				{ cond: MAG + ' == "baraja"', script: 'p9_mag_sin_baraja' },
				{ cond: MAG + ' == "ensayo"', script: 'p9_mag_ensayo' },
				{ cond: MAG + ' == "noche"', script: 'p9_mag_noche' },
			] },
			{ label: 'Philippe, el mago de los jueves', sub: 'Le hace el truco a la dueña. Otra vez', icon: '🃏', cond: 'done.p9_s_magia', talk: [{ script: 'p9_mag_despues' }] },
		] },
		novarte: { spots: [
			{ label: 'Quiosco de la plaza', sub: 'Revistas, postales y una caja de barajas con la Torre Prisma', icon: '🗞️', cond: MAG + ' == "baraja"', new: 'true', talk: [{ script: 'p9_mag_quiosco' }] },
		] },
		museo_ficha: { spots: [
			{ label: 'La vitrina del centro, con una nota pegada', sub: '«NO TOCAR. Ni yo.» Firmado: el conservador', icon: '🃏', cond: MAG + ' == "baraja" && done.b05_s_museo && done.b01_s_philippe', new: 'true', talk: [{ script: 'p9_mag_vitrina' }] },
		] },
		museo_sala_kalos: { spots: [
			pieza('p9_magia', 'Una carta enmarcada, sola', 'El siete de corazones, con una esquina doblada', '🃏', 'flag.p9_magia'),
		] },

		// ---------- Petroglifo: la cantera vieja ----------
		lab_fosiles: { spots: [
			{ label: 'Lazare, con una servilleta plastificada', sub: 'La mira como si le debiera dinero', icon: '🧻', cond: SOCIO_E + ' && !flag.p9_fos_1', new: 'true', talk: [{ script: 'p9_fos_intro' }] },
			{ label: 'La zanja profunda', sub: 'Tablas, una escalera y una línea negra al fondo', icon: '🕳️', cond: 'flag.p9_zanja && !flag.p9_fos_bloque', new: 'true', talk: [{ script: 'p9_fos_bloque' }] },
			{ label: 'La escombrera de la zanja profunda', sub: 'Lo que sube en los cubos y nadie ha mirado', icon: '⛏️', cond: 'flag.p9_zanja', new: '!flag.rec_p9_fos_escombrera', action: { gather: 'p9_fos_escombrera' } },
			{ label: 'El Restaurador · la bandeja nueva', sub: 'Lazare le ha atornillado una bandeja más ancha', icon: '🦴', cond: FOS2, new: FOS2, talk: [{ script: 'p9_fos_maquina' }] },
		] },
	},

	// =====================================================================
	// MISIONES
	// =====================================================================
	quests: {
		p9_s_carreras: { name: 'Una carrera al día', type: 'side', est: 20, stages: {
			pista: 'Corre contra la **campeona retirada** en la pista de **Pueblo Boceto**, a lomos de tu Rhyhorn. Una carrera al día. Si la bates, hay premio.',
			hecha: 'Le ganaste a la campeona en su propia pista de **Boceto**. La pista sigue abierta: una carrera al día, y tu mejor tiempo en el muro.',
		} },
		p9_s_magia: { name: 'La Noche de Magia', type: 'side', est: 35, stages: {
			baraja: 'Philippe necesita una baraja para la Noche de Magia del **Café Soleil**: compra una en el quiosco de **Novarte** o pídele la suya al museo del ático (Luminalia).',
			ensayo: 'Ensaya el truco con **Philippe** en el **Café Soleil** (Luminalia). Fíjate en lo que hace siempre igual.',
			noche: 'La función es en el **Café Soleil** (Luminalia). Philippe te espera en la terraza con la baraja: tú eres {el|la|le} ayudante.',
			hecha: 'A Philippe le salió un truco en el **Café Soleil**. Él no sabe muy bien cómo. Tú sí.',
		} },
		p9_s_fosiles: { name: 'La capa de los huesos', type: 'side', est: 25, stages: {
			zanja: 'El Dr. Lazare quiere abrir una **zanja profunda** en la cantera vieja de **Petroglifo**: cómprala como mejora en la ficha del negocio (Laboratorio de Fósiles).',
			bloque: 'Baja a la **zanja profunda** de la cantera (Laboratorio de Fósiles, Petroglifo) y saca entero el bloque que ha aparecido en la línea negra.',
			restaurar: 'Lleva el fósil de la zanja al **Restaurador** del Dr. Lazare, en el Laboratorio de Fósiles de Petroglifo. Tiene bandeja nueva.',
			hecha: 'La zanja profunda de la cantera de **Petroglifo** suelta fósiles de vez en cuando. El Restaurador de Lazare ya los revive todos.',
		} },
	},

	// =====================================================================
	// NEGOCIO: la cantera vieja crece (mismo id que en b04/t6-negocios.js; el motor suma las listas y mezcla las líneas)
	// =====================================================================
	ventures: {
		p7_excavacion: {
			lines: {
				fosiles: { name: 'La capa de los huesos', icon: '🦴', locked: true,
					desc: 'La línea negra del fondo de la zanja profunda. Fósiles de verdad, de los que el Restaurador devuelve a la vida: más o menos uno cada cinco días con todo el esfuerzo puesto aquí. Nunca se sabe cuál.',
					items: [
						{ id: 'helixfossil', perDay: 0.018 }, { id: 'domefossil', perDay: 0.018 }, { id: 'oldamber', perDay: 0.018 },
						{ id: 'rootfossil', perDay: 0.018 }, { id: 'clawfossil', perDay: 0.018 }, { id: 'skullfossil', perDay: 0.018 },
						{ id: 'armorfossil', perDay: 0.018 }, { id: 'coverfossil', perDay: 0.018 }, { id: 'plumefossil', perDay: 0.018 },
						{ id: 'jawfossil', perDay: 0.018 }, { id: 'sailfossil', perDay: 0.018 },
					] },
			},
			upgrades: [
				{ id: 'zanja', name: 'Zanja profunda', cost: 30000, unlock: 'fosiles', hidden: '!flag.p9_fos_1', set: { 'flag.p9_zanja': true }, script: 'p9_fos_zanja',
					desc: 'Bajar recto, con tablas y escalera, desde la zanja dos hasta la línea negra del croquis de Petra. Abre una línea nueva: la capa de los huesos.' },
			],
			events: [
				{ id: 'p9_dientes', name: 'Una bolsa de dientes', w: 2, npc: 'cientifico_fosiles', cond: 'flag.p9_zanja',
					text: 'La zanja profunda ha soltado una bolsa de dientes. Cuarenta. Todos iguales. Ningún animal tiene cuarenta dientes iguales, salvo que los mude como quien cambia de camisa. Petra quiere que los contemos otra vez. Desde un barco.',
					options: [
						{ text: 'Contarlos otra vez', result: 'Los cuentan. Son cuarenta y uno. Lazare se sienta. Petra, por el holomisor, grita tanto que se le cae al mar. La capa de los huesos, de pronto, le interesa a todo el mundo.', effect: { boost: { mult: { fosiles: 1.3 }, days: 3, label: 'Cuarenta y un dientes' } } },
						{ text: 'Mandarle la bolsa a Petra', cost: 1200, result: 'Un paquete certificado a un puerto que cambia cada semana. Llega. Petra manda una foto de los dientes en fila sobre una toalla, y a cambio, dos huesos que «sobraban» de su propia zanja.', effect: { items: [{ id: 'rarebone', n: 2 }], happy: 6 } },
					] },
				{ id: 'p9_frio', name: 'Veinte metros de frío', w: 2, npc: 'cientifico_fosiles', cond: 'flag.p9_zanja',
					text: 'En el fondo de la zanja profunda hace frío. Yo no me resfrío; llevo cuarenta años en una cantera. Lo que tengo es una reacción alérgica a los veinte metros de profundidad. Es distinto. Lo he leído.',
					options: [
						{ text: 'Comprarle una bufanda', cost: 600, result: 'Bufanda gris, de lana de la Ruta 42. Lazare dice que no la necesita. La lleva todos los días, también en el laboratorio, también en el puerto.', effect: { boost: { mult: { all: 1.1 }, days: 3, label: 'Bufanda' } } },
						{ text: '«Que lo cuide Pala por holomisor.»', result: 'Pala aparece en la pantalla, lo mira fijamente y no se va hasta que Lazare se toma el jarabe. Nadie sabía que un Diggersby pudiera supervisar.', effect: { happy: 6 } },
					] },
			],
		},
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		p9_fos_escombrera: {
			name: 'La escombrera de la zanja profunda', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 3, theme: 'cantera', hint: 'Roca gris y, entre medias, la negra. Lo que brilla al principio es polvo de estrellas; lo que no brilla y pesa, mira dos veces.' },
			ask: 'Un montón de tierra y piedra que sube en cubos desde la zanja profunda. Lazare ha puesto un cartel: «ESTO TAMBIÉN ES CIENCIA. CRIBAR ANTES DE TIRAR».',
			text: 'Cribas el montón con una malla fina. Lazare lo apunta todo, hasta lo que no es nada.',
			wait: 'La escombrera está cribada. Los cubos siguen subiendo; vuelve otro día.',
			table: [
				{ id: 'stardust', w: 20, n: [1, 2] }, { id: 'hardstone', w: 14, n: [1, 1] }, { id: 'rarebone', w: 8, n: [1, 1] },
				{ id: 'smoothrock', w: 6, n: [1, 1] }, { id: 'everstone', w: 5, n: [1, 1] }, { id: 'nugget', w: 3, n: [1, 1] },
				{ id: 'rootfossil', w: 1, n: [1, 1], rare: true }, { id: 'clawfossil', w: 1, n: [1, 1], rare: true },
				{ id: 'armorfossil', w: 1, n: [1, 1], rare: true }, { id: 'coverfossil', w: 1, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== PUEBLO BOCETO: UNA CARRERA AL DÍA ===================
		p9_carr_intro: [
			{ text: 'La pista de piedras pintadas tiene banderines nuevos, de tela roja y crema, y un poste de salida con una pizarra. En la salida, la campeona retirada sujeta dos Rhyhorn ensillados. Uno es el tuyo. El otro la mira a ella como si fuera la única persona del mundo.' },
			{ say: 'jinete_boceto', text: '¡Ahí está! El jinete que corrió contra mí en mi pista y se fue sin cobrar. Mira lo que has conseguido: los del pueblo se han venido arriba. Banderines. Pizarra. Hasta hay quien apuesta leche.' },
			{ say: 'jinete_boceto', text: 'Te propongo una cosa seria. Una carrera al día, tú y yo. Ni dos ni media: una. El Rhyhorn se aburre si repite, y un Rhyhorn aburrido se va al huerto de la vecina. Lo sé por experiencia.' },
			{ say: 'jinete_boceto', text: 'Si me ganas, el pueblo paga la bolsa. Si me ganas la primera vez, además te doy algo que guardo desde mi última temporada. Y si pierdes… leche Mu-mu. La leche aquí no se niega a nadie.' },
			{ text: 'Arranca una hoja plastificada del poste y te la planta en la mano.' },
			{ say: 'jinete_boceto', text: 'El reglamento. La versión corta. La larga se la comió uno de estos. Léelo, que luego no quiero oír «no lo sabía».' },
			{ give: 'p9_reglamento' },
			{ read: 'p9_reglamento' },
			{ say: 'jinete_boceto', text: 'Mi peque escribió lo de abajo con siete años. Tenía razón, qué remedio. Pero la regla dos sigue siendo la que más vale.' },
			{ set: { 'flag.p9_carrera_vista': true } },
			{ quest: 'p9_s_carreras', stage: 'pista' },
			{ choice: [
				{ text: '«Hoy mismo. Ahora.»', then: [{ say: 'jinete_boceto', text: 'Así me gusta. Sin pensarlo. Sube.' }, { call: 'p9_carr_correr' }] },
				{ text: '«Déjame estudiar el reglamento.»', then: [{ say: 'jinete_boceto', text: 'Estúdialo. Lo que no pone es dónde está el charco. Eso se aprende con el Rhyhorn. Cuando quieras, aquí estoy; aquí estoy siempre.' }] },
			] },
		],

		p9_carr_hoy_no: [
			{ say: 'jinete_boceto', text: 'Hoy ya has corrido. Una al día: regla uno. Mira cómo te mira tu Rhyhorn: está pensando en el huerto de la vecina.' },
			{ if: 'flag.p9_carrera_1', then: [{ say: 'jinete_boceto', text: 'Mañana, si quieres, la revancha. Yo no me retiro de la revancha. Me retiré de todo lo demás.' }],
				else: [{ say: 'jinete_boceto', text: 'Mañana más. Y piensa en la curva mientras duermes. Yo lo hice doce temporadas.' }] },
			{ heal: 'La campeona te sirve leche Mu-mu y tu equipo descansa en el establo. Salen como nuevos.' },
		],

		p9_carr_correr: [
			{ set: { 'vars.p9_carrera_t': T0, 'vars.p9_carrera_wd': '=weekday + 1', 'vars.p9_carrera_n': '+1' } },
			{ text: 'Subes por el lado de la oreja buena. Te agarras a la silla. La campeona monta de un salto, sin mirar, y su Rhyhorn ni se mueve: lleva doce temporadas sin moverse hasta que ella lo diga.' },
			{ say: 'jinete_boceto', text: 'Tres piedras pintadas, el charco y la meta. Cincuenta segundos, que es lo que hago yo. Siempre. A la de tres.' },
			{ text: 'Uno. Dos.' },
			{ prompt: 'La salida. ¿Qué haces?', choice: [
				{ text: 'Inclinarte hacia delante, pegad{o|a|e} a la silla.', then: [t(-3), { text: 'El Rhyhorn nota tu peso y arranca antes de que ella diga «tres». Sales con medio cuerpo de ventaja. Ella se ríe: le gusta.' }] },
				{ text: 'Hablarle al oído.', then: [t(-2), { text: '«Vamos, grandullón». El Rhyhorn resopla, divertido, y sale como si lo hubieran llamado por su nombre. Que no tiene. O sí: el que tú le pusiste.' }] },
				{ text: 'Gritar.', then: [t(1), { text: 'Gritas. El Rhyhorn también. Salen los dos gritando, medio segundo tarde y con muchísimo estilo. Los del pueblo aplauden. Los aplausos no cuentan.' }] },
			] },
			{ text: 'La primera curva: las piedras pintadas de rojo. La campeona la toma por fuera, muy ancha, muy tranquila, como quien no tiene prisa.' },
			{ prompt: 'La curva de las piedras. Regla dos.', choice: [
				{ text: 'Frenar antes y acelerar en la salida.', then: [t(-4), { text: 'Tiras de la silla un instante antes de la curva. El Rhyhorn clava las patas, gira y sale disparado por la recta. La campeona te mira de reojo: eso lo enseñó ella.' }] },
				{ text: 'Cerrar por dentro, como Mylène.', then: [t(-2), { text: 'Te metes por el hueco entre las piedras y el seto. El Rhyhorn roza una piedra pintada y la deja de otro color. Ganas un poco. La piedra, no.' }] },
				{ text: 'Entrar a fondo.', then: [t(0), { text: 'Entras a fondo. El Rhyhorn también. Derrapan los dos, levantan medio huerto y salen de la curva en la misma dirección por pura suerte. No pierdes tiempo. Tampoco lo ganas.' }] },
			] },
			{ text: 'La recta del huerto. Ciruelos a un lado, muro de piedra al otro, y en el muro el agujero con forma de cuerno que nadie ha arreglado.' },
			{ prompt: 'La recta. El Rhyhorn quiere más.', choice: [
				{ text: 'Soltar las riendas.', then: [t(-2), { text: 'Sueltas. El Rhyhorn entiende el mensaje: ahora manda él. Y él quiere ganar más que tú.' }] },
				{ text: 'Que {riolu} dé la señal.', cond: LUC, then: [t(-3), { text: '{riolu} va de pie en la silla, detrás de ti, con las orejas hacia atrás. Nota algo en el Rhyhorn un segundo antes que tú y golpea la silla con la pata: ¡AHORA! El Rhyhorn arranca el acelerón justo donde el suelo está más duro. Ni tú ni la campeona entienden cómo lo ha sabido.' }] },
				{ text: 'Agarrarte al cuerno.', then: [t(3), { text: 'Te agarras al cuerno. El Rhyhorn levanta la cabeza, ofendidísimo, y frena. Regla tres. La campeona, al pasar, ni te mira: le da vergüenza ajena.' }] },
				{ text: 'Mirar atrás.', cond: '!' + LUC, then: [t(1), { text: 'Miras atrás. Ella no está atrás. Está al lado, y te saluda con la mano. Pierdes un segundo en volver la cabeza y otro en digerirlo.' }] },
			] },
			{ text: 'El charco grande. Un barrizal del ancho de la pista, marrón, hondo, con burbujas. El Rhyhorn de la campeona entra sin frenar y levanta una ola.' },
			{ prompt: 'El charco. Regla cuatro.', choice: [
				{ text: 'Atravesarlo.', then: [t(-2), { text: 'El Rhyhorn entra como entraría en un sueño. El barro le llega al pecho y a ti a las rodillas. Sale por el otro lado más contento y, por lo que sea, más rápido.' }] },
				{ text: 'Saltarlo.', then: [t(0), { text: 'Le pides que salte. El Rhyhorn te mira, se lo piensa y hace algo que en un Rhyhorn se parece a un salto: un paso muy grande. Caes en el centro exacto del charco. No pierdes tiempo: el charco no era tan hondo. Ganas barro.' }] },
				{ text: 'Rodearlo.', then: [t(2), { text: 'Lo rodeas por el seto. Es más largo, está lleno de zarzas y el Rhyhorn te lo reprocha con cada paso. Regla cuatro. Lo pone en el reglamento.' }] },
			] },
			{ text: 'La meta. Los banderines, el poste, la pizarra y medio pueblo asomado a los muros. La campeona va a tu altura, pegada a la silla, con cara de niña.' },
			{ prompt: 'Los últimos metros.', choice: [
				{ text: 'Todo o nada.', then: [t(-2), { text: 'Te pegas al Rhyhorn hasta que no se sabe dónde acaba uno y empieza el otro. Él lo da todo. Tú también. Cruzan la meta.' }] },
				{ text: 'Mirar a la campeona y reírte.', then: [t(-1), { text: 'Te ríes. Ella también. El Rhyhorn se contagia y da un último acelerón de alegría. Cruzan la meta.' }] },
				{ text: 'Llegar enter{o|a|e}.', then: [t(0), { text: 'Llegas enter{o|a|e}, con las dos manos en la silla y el barro hasta las cejas. Cruzan la meta. Nadie te lo va a reprochar. Bueno, ella un poco.' }] },
			] },
			{ text: 'La pizarra. Un chico del pueblo apunta el tiempo con tiza y lo tacha dos veces para que se lea bien.' },
			{ if: 'vars.p9_carrera_t <= ' + (RIVAL - 1), then: [{ call: 'p9_carr_gana' }], else: [{ call: 'p9_carr_pierde' }] },
			// Mejor tiempo personal
			{ if: 'vars.p9_carrera_mejor == 0 || vars.p9_carrera_t < vars.p9_carrera_mejor', then: [
				{ set: { 'vars.p9_carrera_mejor': '=vars.p9_carrera_t' } },
				{ toast: '🏁 Mejor tiempo personal. Está en el muro.' },
			] },
			{ heal: 'La campeona reparte leche Mu-mu. Tu equipo descansa en el establo mientras el Rhyhorn se revuelca en el charco. Salen como nuevos.' },
		],

		p9_carr_gana: [
			{ if: 'vars.p9_carrera_t <= 46', then: [{ text: 'Cuarenta y seis. El chico de la tiza se queda con la tiza en el aire. Nadie ha bajado nunca de cuarenta y siete en esta pista. Nadie que esté en la pizarra, al menos.' }],
				else: [{ text: 'Por debajo de cincuenta. Por un cuerno, pero por debajo. El pueblo entero resopla a la vez, igual que sus Rhyhorn.' }] },
			{ if: '!flag.p9_carrera_1', then: [
				{ say: 'jinete_boceto', text: '…Me has ganado. En mi pista, y esta vez no era tu primera carrera, así que no vale lo de «casi». —Se baja. Le da una palmada a su Rhyhorn. Al tuyo, otra—. Bien hecho. Los dos.' },
				{ say: 'jinete_boceto', text: 'Lo prometido. Esto es de mi última temporada: me lo dio el mecánico de la pista cuando me retiré. «Para que no se te oxide», dijo. No me he oxidado. Pero ya no lo necesito.' },
				{ give: 'p9_mt_pulimento' },
				{ say: 'jinete_boceto', text: 'Pulimento. Lo que hace un Rhyhorn bien cuidado antes de una carrera: quitarse el polvo y salir volando. Sirve para más Pokémon de piedra de los que crees. Dáselo a uno que tenga que llegar antes que los demás.' },
				{ say: 'jinete_boceto', text: 'Y la bolsa del pueblo, que para eso apostaron.' },
				{ money: 2500 },
				{ set: { 'flag.p9_carrera_1': true } },
				{ quest: 'p9_s_carreras', done: true },
				{ diary: 'Hoy mi entrenador{|a|e} le ha ganado otra vez a la campeona de Boceto. Yo iba en el bolsillo y he contado los segundos en voz alta, para ayudar. Nadie me ha oído por el barro. Al final, la campeona ha dado un regalo y ha dicho que no lo necesitaba. A mí me ha parecido que sí lo echaba de menos, un poco. Bzzt. No lo he apuntado en la pizarra.', cond: 'flag.b01_diario' },
				{ say: 'jinete_boceto', text: 'Mañana, revancha. No te creas que esto se acaba aquí. Yo me retiré de las carreras, no de perder. De perder no se retira nadie.' },
			], else: [
				{ say: 'jinete_boceto', text: '¡Otra! ¡Otra vez! Esto va a acabar en la tele y mi peque va a llamar para preguntar quién eres. —Te tira la bolsa del pueblo—. Mañana más.' },
				{ money: 2500 },
			] },
		],

		p9_carr_pierde: [
			{ if: 'vars.p9_carrera_t <= 53', then: [{ text: 'Cincuenta y pico. Ella cruza un cuerno por delante y frena en tres pasos, como siempre. El chico de la tiza no sabe si aplaudir.' }],
				else: [{ text: 'Bastante más de cincuenta. Ella ya ha desmontado cuando llegas. Está dándole una manzana a su Rhyhorn y otra al tuyo, por adelantado.' }] },
			{ if: 'vars.p9_carrera_t >= 58', then: [{ say: 'jinete_boceto', text: '¿Te has agarrado al cuerno? Te has agarrado al cuerno. Regla tres. Lo pone en el papel. —Se ríe tanto que su Rhyhorn se contagia—. Leche. Mucha leche.' }],
				else: [{ say: 'jinete_boceto', text: 'Casi. Un casi de los buenos. Mañana piensa en la curva: se gana frenando, no acelerando. Y el charco se cruza. Siempre se cruza.' }] },
			{ say: 'jinete_boceto', text: 'La leche es para todos. Sobre todo para los que pierden. Regla seis.' },
			{ money: 500 },
			{ text: 'Alguien del pueblo te pone en la mano «la propina del perdedor»: lo que sobra de las apuestas cuando gana la de siempre.' },
		],

		p9_carr_muro: [
			{ text: 'Una pizarra con un marco de madera, clavada al poste de salida. Arriba, con letra grande y tiza nueva: «CAMPEONA · 50». Debajo, nombres del pueblo y tiempos que van de los cincuenta y tantos a los sesenta y largos.' },
			{ if: 'vars.p9_carrera_mejor == 0', then: [{ text: 'Tu nombre todavía no está. Hay un hueco justo debajo del de la campeona. El chico de la tiza lo ha dejado a propósito.' }] },
			{ if: 'vars.p9_carrera_mejor > 0 && vars.p9_carrera_mejor <= 46', then: [{ text: 'Tu nombre está **encima** del de la campeona, con un tiempo que empieza por cuatro. Alguien ha dibujado al lado un Rhyhorn con alas. La campeona no lo ha borrado.' }] },
			{ if: 'vars.p9_carrera_mejor > 46 && vars.p9_carrera_mejor <= 49', then: [{ text: 'Tu nombre está **encima** del de la campeona: cuarenta y pico. La tiza está un poco borrosa, como si alguien lo hubiera mirado mucho con el dedo.' }] },
			{ if: 'vars.p9_carrera_mejor >= 50 && vars.p9_carrera_mejor <= 53', then: [{ text: 'Tu nombre está justo debajo del de la campeona: cincuenta y pico. Hay un «casi» escrito al lado, con otra letra.' }] },
			{ if: 'vars.p9_carrera_mejor > 53', then: [{ text: 'Tu nombre está entre los del pueblo, con un tiempo de los que la campeona llama «de leche». Al lado hay una flecha hacia arriba. Se entiende.' }] },
			{ if: 'vars.p9_carrera_n >= 5', then: [{ text: 'En un rincón de la pizarra alguien lleva la cuenta de tus carreras con palitos. Ya son bastantes. Debajo pone «vuelve siempre», sin signos.' }] },
		],

		// =================== LUMINALIA: LA NOCHE DE MAGIA ===================
		p9_mag_intro: [
			{ set: { 'flag.p9_mag_1': true } },
			{ text: 'Philippe está de pie junto a su mesa de siempre, con la chistera puesta y un cartel enrollado que desenrolla, mira y vuelve a enrollar. La dueña del café lo observa desde la barra con los brazos cruzados.' },
			{ say: 'philippe', text: '¡{jugador}! ¡Mi ficha número uno! Justo a tiempo. O justo a destiempo, que es lo mismo pero peor. —Desenrolla el cartel y te lo enseña—. Léelo. En voz baja. Ella ya lo sabe.' },
			{ read: { title: 'Cartel · Café Soleil', text: '**I NOCHE DE MAGIA DEL CAFÉ SOLEIL**\n*Abierta a aficionados. Un truco por persona.*\n\nCon la actuación de **Philippe Dumont**, agente inmobiliario y mago.\n\n*(Más abajo, a bolígrafo, con otra letra:)* «Si al señor Dumont no le sale el truco, no vuelve a hacer trucos en mi terraza. Firmado: la dueña.»\n\n*(Más abajo aún, con la letra de Philippe:)* «Acepto. —P.»' } },
			{ say: 'philippe', text: 'Lo firmé. Phil-osofía: un mago que no acepta un reto no es un mago, es un señor con chistera. Y yo ya soy un señor con chistera. Necesito que me salga uno. Uno. Delante de gente.' },
			{ say: 'philippe', text: 'Y para eso necesito tres cosas. Una baraja, porque la mía… —Se toca el bolsillo del pecho—. Una baraja de la suerte no se usa. Se tiene. Como un seguro. Como una tía rica.', cond: 'done.b01_s_philippe && !done.b05_s_museo' },
			{ say: 'philippe', text: 'Y para eso necesito tres cosas. Una baraja, porque la mía está en una vitrina, en mi museo, y el conservador ha prohibido tocarla. El conservador soy yo. Me caigo fatal cuando me pongo así.', cond: 'done.b05_s_museo && done.b01_s_philippe' },
			{ say: 'philippe', text: 'Y para eso necesito tres cosas. Una baraja, porque la mía se la quedó un Pancham en la Ruta 5 hace mucho y la he dado por emancipada.', cond: '!done.b01_s_philippe' },
			{ say: 'philippe', text: 'Dos: ensayar. Con alguien que me diga la verdad. Tres: un ayudante en la función. Alguien que baraje, que corte y que no se ría. Lo de no reírse es negociable.' },
			{ choice: [
				{ text: '«Cuenta conmigo, Philippe.»', then: [{ say: 'philippe', text: '¡Lo sabía! Lo supe desde que te vendí… bueno, desde que te intenté vender aquella plaza de garaje. Hay clientes que son para siempre.' }] },
				{ text: '«¿Y si no sale?»', then: [{ say: 'philippe', text: 'Si no sale, me quedo sin terraza. Y esta terraza tiene vistas a la Torre. Son las mejores vistas que no he conseguido vender en veinte años. No puede no salir.' }] },
			] },
			{ say: 'philippe', text: 'En el quiosco de la plaza de Novarte venden barajas con la Torre en el dorso. Buenas. Resbalan lo justo. —Baja la voz—. O… no. No. La pieza cero no sale de la vitrina. Olvida que lo he pensado en voz alta.', cond: 'done.b05_s_museo && done.b01_s_philippe' },
			{ say: 'philippe', text: 'En el quiosco de la plaza de Novarte venden barajas con la Torre en el dorso. Buenas. Resbalan lo justo. Tráeme una y empezamos.', cond: '!(done.b05_s_museo && done.b01_s_philippe)' },
			{ quest: 'p9_s_magia', stage: 'baraja' },
		],

		p9_mag_sin_baraja: [
			{ say: 'philippe', text: '¿La baraja? ¿Ya? —Te mira las manos. Vacías—. No. Bueno. El quiosco de Novarte. Dorso con la Torre. Y si no, lo que tú veas: un mago trabaja con lo que hay. Yo, sobre todo.' },
			{ say: 'philippe', text: 'Y si pasas por el ático… no mires la vitrina del centro. Ni se te ocurra. Es una orden del conservador. Que soy yo. Que no me hago caso.', cond: 'done.b05_s_museo && done.b01_s_philippe' },
		],

		p9_mag_quiosco: [
			{ text: 'Un quiosco de madera verde en la plaza, con revistas de entrenadores, postales del gimnasio y, en una caja junto a la caja, barajas nuevas con la Torre Prisma en el dorso. Un cartelito: «Baraja Prisma · ₽800 · No se cambian las que ya se han abierto».' },
			{ text: 'El quiosquero, sin levantar la vista del periódico, señala la caja con el mentón.' },
			{ if: 'has("p9_barajaprestada")', then: [{ text: 'Ya llevas una baraja encima, y no una cualquiera. El quiosquero mira el bulto de tu bolsillo y vuelve al periódico: él vende a quien no tiene.' }, { end: true }] },
			{ choice: [
				{ text: 'Comprar una baraja (₽800).', cond: 'money >= 800', then: [
					{ money: -800 },
					{ give: 'p9_barajanueva' },
					{ text: 'El quiosquero te la envuelve en papel de periódico, por costumbre. «Para el señor de la chistera, ¿no? Dile que la del año pasado todavía la tengo yo. Se la dejó aquí. Entera».' },
					{ set: { 'flag.p9_mag_novarte': true } },
					{ quest: 'p9_s_magia', stage: 'ensayo' },
				] },
				{ text: 'No llevas suficiente.', cond: 'money < 800', then: [{ text: 'El quiosquero ni levanta la vista. «Las revistas viejas, gratis. Las barajas, no».' }] },
				{ text: 'Mirar las postales y nada más.', then: [{ text: 'Postales del gimnasio de Novarte, de la fuente de las Flabébé y una en la que se ve, muy al fondo, un Rhyhorn que no se mueve. La compras con la mirada y te vas.' }] },
			] },
		],

		p9_mag_vitrina: [
			{ text: 'La vitrina del centro, con la baraja de la suerte sobre su terciopelo. Pegada al cristal, una nota con la letra de Philippe: «NO TOCAR. Ni yo.». Philippe está detrás de ti, haciendo como que no está.' },
			{ say: 'philippe', text: 'No la mires así. Ella lo nota. —Se acerca. Se aleja. Se acerca—. Es la pieza cero. Si la pieza cero sale del museo, el museo deja de empezar. Phil-osofía. Aunque suene a excusa.' },
			{ say: 'philippe', text: 'Pero también es la única baraja que me ha salido bien una vez. Una. Contigo, hace mucho. Y una función es una función.' },
			{ choice: [
				{ text: '«Conservador: autorice el préstamo. Una noche.»', then: [
					{ say: 'philippe', text: '…El conservador lo ha deliberado. El conservador tiene un conflicto de intereses tremendo. El conservador dice que sí, con recibo.' },
					{ text: 'Abre la vitrina con la llave pequeña, envuelve la baraja en el pañuelo de la chistera y te la da. Escribe un recibo en el libro de visitas: «Prestada la pieza cero a su conservador. Devolver antes del alba. Firmado: el conservador».' },
					{ give: 'p9_barajaprestada' },
					{ if: 'flag.b05_philippe && ' + LUC, then: [{ say: 'philippe', text: 'Y por si acaso… —Saca de la cartera el tres de tréboles, el que tu Pokémon encontró en Alola, y lo mete en el mazo con mucho cuidado—. Completa. Por primera vez en años. Si hay una noche para que esté completa, es esta.' }] },
					{ set: { 'flag.p9_mag_museo': true } },
					{ quest: 'p9_s_magia', stage: 'ensayo' },
					{ say: 'philippe', text: 'Nos vemos en el Café Soleil. Y no la barajes por el camino: tiene su orden. Un orden que no entiendo, pero que respeto.' },
				] },
				{ text: '«Mejor compro una nueva en Novarte.»', then: [
					{ say: 'philippe', text: 'Sí. Sí. Eso. El conservador respira aliviado. Y el mago, un poco menos. Los dos somos yo, así que empate.' },
				] },
			] },
		],

		p9_mag_ensayo: [
			{ text: 'La terraza del Café Soleil a media tarde, casi vacía. Philippe ha juntado dos mesas y ha puesto encima un mantel negro que es, claramente, una toalla de playa del revés.' },
			{ if: 'flag.p9_mag_museo', then: [
				{ say: 'philippe', text: '¡La pieza cero, fuera de casa! Me siento como un padre el primer día de colegio. Dámela. Despacio. Eso.' },
				{ if: 'has("p9_barajaprestada")', then: [{ take: 'p9_barajaprestada' }] },
			], else: [
				{ say: 'philippe', text: '¡La Prisma! Buen dorso, buen peso, resbala lo justo. El quiosquero me conoce. Me conoce demasiado. ¿Te ha dicho lo del año pasado? No contestes.' },
				{ if: 'has("p9_barajanueva")', then: [{ take: 'p9_barajanueva' }] },
			] },
			{ say: 'philippe', text: 'El truco es el de siempre: eliges una carta, la devuelves, yo barajo, y la encuentro. Es el truco más fácil del mundo. Me lleva veinte años. Vamos. Elige una. No me la enseñes.' },
			{ text: 'Eliges una carta. La devuelves al mazo. Philippe baraja con mucho aparato, saca una carta con la mano en alto y la enseña a la terraza vacía.' },
			{ say: 'philippe', text: '¡El siete de corazones! —Pausa—. ¿No? ¿Y la tuya cuál era? Ah. Bueno. La magia es así: a veces la magia eres tú.' },
			{ text: 'Otra vez. Eliges, devuelves, él baraja, saca una carta.' },
			{ say: 'philippe', text: '¡El siete de corazones! —Te mira—. ¿Tampoco? Qué cosa. Pero fíjate en la mano. La mano ha estado impecable.' },
			{ text: 'Una tercera. Eliges, devuelves, él baraja. Antes de que saque la carta, ya sabes cuál va a ser.' },
			{ prompt: 'Lo que hace siempre igual es…', choice: [
				{ text: 'Saca siempre el siete de corazones.', then: [
					{ say: 'philippe', text: '¡El siete de co…! —Se detiene con la carta en alto—. ¿Siempre? ¿Siempre el siete? —Mira la carta. Mira el mazo—. Es la carta en la que pienso. Siempre pienso en el siete de corazones. Es… es un número que me gusta. De un mes que me gusta.' },
				] },
				{ text: 'Baraja igual las tres veces.', then: [
					{ say: 'philippe', text: '¿Igual? Barajo con arte. El arte se repite, sí, pero… —Mira la carta que tiene en la mano—. El siete de corazones. Otra vez. ¿Lo has visto venir? Lo has visto venir.' },
				] },
				{ text: 'Cierra los ojos al sacar la carta.', then: [
					{ say: 'philippe', text: '¡No cierro los…! —Los cierra. Saca la carta—. El siete de corazones. —Los abre—. Bueno. Cierro los ojos. Y saco siempre el siete. Es la carta en la que pienso. Siempre.' },
				] },
			] },
			{ text: 'Te quedas mirando el mazo. Philippe barajará lo que quiera: su mano, al final, va a buscar la carta de arriba. Y su cabeza va a decir «siete de corazones». Si la carta que elige el público es esa, y esa está arriba, el truco sale solo.' },
			{ say: 'philippe', text: 'Espera. Espera, espera. Tengo una idea y me da miedo. Si tú barajas por mí en la función, como ayudante, y yo solo… saco… —Se le ilumina la cara. Se le apaga—. No. Eso sería trampa. ¿Sería trampa?' },
			{ choice: [
				{ text: '«Es magia. La magia es trampa con cariño.»', then: [{ say: 'philippe', text: 'Trampa con cariño. —Lo apunta en el mantel que es una toalla—. Phil-osofía nueva. Me la quedo.' }] },
				{ text: '«Tú saca la carta. Del resto me ocupo yo.»', then: [{ say: 'philippe', text: 'Del resto te ocupas tú. Es la frase que más veces me han dicho en la vida, y nunca me había sonado tan bien.' }] },
			] },
			{ if: LUC, then: [{ text: '{riolu} se sube a la silla de al lado, olisquea el mazo y, con una pata, da un golpecito justo en la carta de arriba. Philippe le hace una reverencia con la chistera.' }] },
			{ say: 'philippe', text: 'La función es esta noche. Bueno, la noche que tú vengas: la dueña ha dicho «cuando el señor Dumont se atreva». Yo estaré aquí. Con el mantel. Y con el siete.' },
			{ set: { 'flag.p9_mag_ensayo': true } },
			{ quest: 'p9_s_magia', stage: 'noche' },
		],

		p9_mag_noche: [
			{ set: { 'vars.p9_mag_intentos': '+1' } },
			{ text: 'La terraza del Café Soleil, con farolillos y todas las mesas llenas: vecinos, dos aficionados con capa que ya han actuado y la dueña en primera fila, con los brazos cruzados y un reloj de cocina en la mano.' },
			{ if: 'vars.p9_mag_intentos > 1', then: [{ say: 'philippe', text: 'La revancha. La dueña ha dicho «última». Lo ha dicho otras veces. Esta vez lo ha dicho mirando el reloj.' }] },
			{ say: 'philippe', text: 'Señoras, señores, Pokémon. Philippe Dumont, agente inmobiliario… y mago. Esta noche me acompaña mi ayudante, {jugador}, que barajará por mí, porque un mago de verdad no se mancha las manos. Es una frase que acabo de inventar.' },
			{ text: 'Un vecino de la primera mesa elige una carta y la enseña a todo el mundo menos a Philippe: el **siete de corazones**. No lo puedes creer. Sí lo puedes creer: Philippe se la ha ofrecido con la mano temblando y la carta un dedo más salida que las demás.' },
			{ text: 'El vecino te devuelve la carta. Te toca barajar.' },
			{ prompt: 'Barajas. ¿Dónde dejas el siete de corazones?', choice: [
				{ text: 'Arriba del mazo.', then: [
					{ text: 'Barajas con todo el aparato que has visto hacer a Philippe, y al final, sin que nadie lo note, dejas el siete de corazones arriba. Le pasas el mazo.' },
					{ call: 'p9_mag_exito' },
				] },
				{ text: 'En el medio, bien escondido.', then: [
					{ text: 'Barajas de verdad. El siete se pierde por el medio. Philippe cierra los ojos, baraja con mucho arte, saca la carta de arriba y la enseña.' },
					{ say: 'philippe', text: '¡El siete de corazones! —Es el cuatro de picas—. ¿No? Es que… es que el cuatro, bien mirado… Bueno. La magia es así: a veces la magia son ustedes.' },
					{ text: 'Silencio. Luego la dueña suspira, para el reloj y dice: «El jueves. Última. Y la próxima vez, que baraje bien su ayudante». La terraza aplaude por compasión. Philippe saluda como si fuera por otra cosa.' },
					{ say: 'philippe', text: 'Ha ido… bien. Ha ido casi. —Baja la voz—. El siete tiene que estar arriba, {jugador}. Arriba. Yo solo sé sacar la de arriba. Es lo único que sé hacer. Vuelve cuando quieras y lo repetimos.' },
				] },
				{ text: 'Abajo del todo.', then: [
					{ text: 'Dejas el siete abajo, por probar. Philippe cierra los ojos, baraja con mucho arte, saca la carta de arriba y la enseña.' },
					{ say: 'philippe', text: '¡El siete de corazones! —Es la dama de tréboles—. …Una dama. Una dama siempre es buena noticia. ¿No? ¿No es buena noticia?' },
					{ text: 'La dueña para el reloj. «El jueves. Última». Un niño de la tercera mesa le explica a su madre que «el señor siempre dice siete». Philippe lo oye. Hace una reverencia.' },
					{ say: 'philippe', text: 'El niño tiene razón. Siempre digo siete. Es lo que hago. Si el siete está arriba, {jugador}, lo demás lo hago yo. Vuelve cuando quieras y lo repetimos.' },
				] },
			] },
		],

		p9_mag_exito: [
			{ text: 'Philippe cierra los ojos. Baraja con todo el arte del mundo, que es la forma más complicada de no mover ninguna carta de sitio. Levanta la de arriba sin mirar, muy despacio, y la enseña a la terraza.' },
			{ say: 'philippe', text: '¡El siete de corazones!' },
			{ text: 'Es el siete de corazones.' },
			{ text: 'Nadie dice nada durante un segundo entero. Luego el vecino de la primera mesa se pone de pie y grita «¡ESA ES!», y la terraza se viene abajo. La dueña para el reloj, lo mira, y por primera vez en la noche descruza los brazos.' },
			{ if: LUC, then: [{ text: '{riolu} aplaude desde tu silla, con las dos patas, más fuerte que nadie. Philippe le dedica la reverencia más larga de su vida.' }] },
			{ text: 'Philippe abre los ojos. Mira la carta. Mira a la gente. Te mira a ti. Tiene la cara de alguien a quien le acaban de decir que la casa que lleva veinte años intentando vender se la han comprado.' },
			{ say: 'philippe', text: 'Ha salido. —No lo grita. Lo dice bajito, para él—. Ha salido.' },
			{ text: 'La dueña se acerca, le quita la carta de la mano, la mira por los dos lados y se la devuelve. «Los jueves, señor Dumont. Después de las ocho. Y sin cobrar». Philippe asiente como quien firma la hipoteca de su vida.' },
			{ prompt: 'Philippe te mira, todavía con la carta en alto. ¿Qué le dices?', choice: [
				{ text: '«Ha sido todo tuyo, Philippe.»', then: [
					{ set: { 'flag.p9_mag_callado': true } },
					{ say: 'philippe', text: 'Todo mío. —Mira la carta otra vez—. Veinte años. Veinte años y hoy. Con esta baraja, con esta gente, con mi ficha número uno barajando. Todo mío, dice. Phil-osofía: los milagros no se investigan. Se enmarcan.' },
				] },
				{ text: '«Philippe… estaba arriba. La puse yo.»', then: [
					{ set: { 'flag.p9_mag_dicho': true } },
					{ say: 'philippe', text: '…¿Arriba? —Mira el mazo. Mira la carta. Te mira—. ¿La pusiste tú? —Silencio. Y luego la risa más grande que le has visto, con la chistera cayéndosele hacia atrás—. ¡Pues claro que la pusiste tú! ¡Yo solo sé sacar la de arriba! ¡Es un truco de dos! ¡Todos los trucos buenos son de dos!' },
					{ say: 'philippe', text: 'Phil-osofía recién hecha: la magia no es que nadie sepa cómo se hace. Es que a quien lo sabe le dé igual. A mí me da igual. Me da exactamente igual. Ha salido.' },
				] },
			] },
			{ say: 'philippe', text: 'Toma. Esto lo tenía guardado para el día en que me saliera uno. La señal de un chalet que no se vendió nunca; el comprador se fue y me la dejó «para el mago». Es lo único que he ganado con la magia en veinte años. Ahora es tuyo. Hoy he ganado otra cosa.' },
			{ give: 'bignugget' },
			{ if: 'flag.p9_mag_museo', then: [{ say: 'philippe', text: 'Y la pieza cero vuelve a su vitrina antes del alba, como pone en el recibo. Pero esta carta… esta carta no vuelve con las demás. Esta va aparte. Ya sé dónde.' }],
				else: [{ say: 'philippe', text: 'Y esta carta no vuelve a la baraja. Esta va aparte, en un marco, en una sala del ático que ya sé cuál. Las demás se quedan en el quiosco de Novarte el año que viene, seguramente. Es lo que hago con las barajas.' }] },
			{ set: { 'flag.p9_magia': true } },
			{ quest: 'p9_s_magia', done: true },
			{ toast: 'Philippe va a mandar algo al museo del ático.' },
			{ diary: 'Esta noche, en el Café Soleil, al señor Dumont le ha salido un truco. Mi entrenador{|a|e} barajaba. He grabado la cara del señor Dumont en el momento exacto, y la voy a guardar aunque ocupe mucho. Bzzt. Hay datos que no se borran. La dueña ha descruzado los brazos; eso también lo he guardado.', cond: 'flag.b01_diario' },
		],

		p9_mag_despues: [
			{ say: 'philippe', text: '¡Ficha número uno! Los jueves, después de las ocho. Sin cobrar. La dueña dice que es «por el ambiente». Yo digo que es por el siete.' },
			{ if: 'flag.p9_mag_dicho', then: [{ say: 'philippe', text: 'Ahora lo hago con la dueña de ayudante. Baraja ella, lo deja arriba, yo lo saco. Un truco de dos. Ella dice que no sabe de qué hablo. Es la mejor ayudante que he tenido después de ti.' }],
				else: [{ say: 'philippe', text: 'Desde esa noche me sale una de cada tres. ¡Una de cada tres! No sé qué cambió. Creo que fue la baraja. O la gente. O que tú barajas muy bien. Barajas muy bien. Nunca te lo he dicho.' }] },
			{ say: 'philippe', text: '¿Otra carta? ¿No? ¿Seguro? El siete. Siempre es el siete. Esa parte ya la sé.' },
		],

		// ---------- Pieza del museo: Sala de Kalos ----------
		museo_p9_magia: [
			{ set: { 'flag.museo_v_p9_magia': true } },
			{ text: 'Un marco pequeño, dorado, de los de fotos de boda. Dentro, sobre terciopelo negro, una sola carta: el siete de corazones, con una esquina un poco doblada. Debajo, la cartela más larga de la sala.' },
			{ if: 'flag.p9_mag_dicho', then: [
				{ read: { title: 'Cartela · La Noche de Magia', text: '**EL SIETE DE CORAZONES**\nDonado por el conservador. A sí mismo. Con recibo.\n\nEn la terraza del Café Soleil, una noche de farolillos, a un mago aficionado le salió un truco por primera vez en veinte años. Lo sacó de arriba del mazo, que es lo único que sabe hacer.\n\nArriba lo había dejado otra persona. Esa persona se lo dijo. El mago se rio hasta que se le cayó la chistera.\n\nTruco de dos. Todos los buenos lo son.' } },
			], else: [
				{ read: { title: 'Cartela · La Noche de Magia', text: '**EL SIETE DE CORAZONES**\nDonado por el conservador. A sí mismo. Con recibo.\n\nEn la terraza del Café Soleil, una noche de farolillos, a un mago aficionado le salió un truco por primera vez en veinte años. Lo sacó de arriba del mazo, que es lo único que sabe hacer.\n\nNadie le ha explicado cómo llegó la carta ahí. El conservador tiene una sospecha muy educada y ha decidido no investigarla.\n\nLos milagros no se investigan. Se enmarcan.' } },
			] },
			{ if: 'flag.p9_mag_museo', then: [{ text: 'En una esquina del marco, una etiqueta minúscula: «De la pieza cero. Salió una noche. Volvió antes del alba. Esta no».' }] },
			{ if: 'flag.p9_mag_novarte', then: [{ text: 'En una esquina del marco, una etiqueta minúscula: «Baraja Prisma, quiosco de Novarte. Las otras cincuenta y una siguen en el quiosco. El quiosquero las guarda».' }] },
			{ if: LUC, then: [{ text: '{riolu} se acerca al marco, olisquea el cristal y da un golpecito con la pata justo encima de la carta. Como aquella tarde en el café.' }] },
			{ say: 'philippe', text: 'Esta pieza la cuelgo yo mismo todos los días. Se tuerce sola. Yo creo que es por el peso del siete. Phil-osofía: hay piezas que se tuercen porque quieren que las mires.' },
		],

		// =================== PETROGLIFO: LA CAPA DE LOS HUESOS ===================
		p9_fos_intro: [
			{ set: { 'flag.p9_fos_1': true } },
			{ text: 'El Dr. Lazare tiene en la mano una servilleta de bar plastificada. La mira como si le debiera dinero. Al verte, la sujeta por una esquina y la aleja de sí.' },
			{ say: 'cientifico_fosiles', text: 'Brossard. Croquis cuarenta. El treinta y nueve se mojó, así que este lo he plastificado. No se lo digas. Va a pensar que me importa.' },
			{ give: 'p9_croquis40' },
			{ read: 'p9_croquis40' },
			{ say: 'cientifico_fosiles', text: 'Lo he comprobado. Las fotos de la zanja dos, con lupa, dos noches. Hay una línea negra debajo de la veta. Fina como un cabello. —Se quita las gafas—. Tiene razón. Me molesta muchísimo que tenga razón desde un barco.' },
			{ text: 'El holomisor del laboratorio se enciende solo. Petra aparece de perfil, con el pelo lleno de sal y una venda nueva en la mano.' },
			{ say: 'petra', text: '¿Está {jugador}? ¡{jugador}! ¿Le has enseñado el cuarenta? ¡No hagas caso a la flecha tres! —Se le cae algo fuera de plano—. Estoy bien. Era un remo.' },
			{ say: 'petra', text: 'Es la capa de los huesos. Lo he visto en tres regiones. Cuando la roca se pone así de negra y así de fina es porque todo se acabó a la vez, y lo que se acaba a la vez se queda junto. Conchas, picos, aletas. Para el Restaurador, eso es una fiesta.' },
			{ say: 'cientifico_fosiles', text: 'Para llegar hay que bajar recto desde la zanja dos. Tablas, escalera, bombas de agua. Treinta mil. Lo he calculado dos veces, y la segunda me ha salido igual, que es lo peor que le puede pasar a un cálculo.' },
			{ say: 'cientifico_fosiles', text: 'Es tu dinero y tu cantera. Si dices que sí, lo compras en la ficha, como lo demás, y yo empiezo mañana. Si dices que no, lo entiendo, y Brossard no, y te llamará. Desde un barco.' },
			{ say: 'petra', text: '¡Te llamaré desde un barco!' },
			{ quest: 'p9_s_fosiles', stage: 'zanja' },
			{ intel: { npc: 'petra', text: 'Croquis n.º 40: una «capa de los huesos» bajo la zanja dos de la cantera vieja. Lazare lo comprobó dos noches con lupa antes de admitir que tiene razón. Petra sigue lejos, midiendo algo, con una venda nueva en la mano.' } },
			{ venture: 'p7_excavacion' },
		],

		p9_fos_zanja: [
			{ text: 'Tardan seis días. Al séptimo, la zanja dos tiene un pozo cuadrado de tablas en el centro, una escalera de hierro, dos focos y una bomba de agua que no para. Abajo, a veinte metros, el gris de la roca cambia a gris oscuro y, en una línea fina como un cabello, a negro.' },
			{ say: 'cientifico_fosiles', text: 'Ahí está. —Lo dice sin bajar la voz, pero con la voz distinta—. Cuarenta años mirando esta cantera desde la ventana del laboratorio. Estaba a veinte metros. Hacia abajo. Nunca se me ocurrió lo de abajo.' },
			{ say: 'petra', text: '¡Enfoca! ¡La línea! ¡ESA! —La imagen del holomisor da una vuelta completa—. Lazare, te lo dije. Te lo dije desde un… bueno, ya sabes desde dónde.' },
			{ say: 'cientifico_fosiles', text: 'Me lo dijo. —Lo apunta en su cuaderno, como quien paga la segunda multa del año—. En la línea negra ya asoma algo redondo y duro. Un bloque. No lo hemos tocado: lo que sale de la zanja lo saca el socio. Es la regla de esta cantera. Me la acabo de inventar, pero es la regla.' },
			{ quest: 'p9_s_fosiles', stage: 'bloque' },
			{ toast: 'Nueva línea de producción: la capa de los huesos. Y un bloque esperando en la zanja profunda.' },
		],

		p9_fos_bloque: [
			{ text: 'Bajas por la escalera de hierro, peldaño a peldaño, con el ruido de la bomba de agua encima y el frío subiendo desde abajo. En el fondo, bajo el foco, la línea negra. Y en la línea negra, medio fuera de la roca, un bloque del tamaño de una sandía.' },
			{ say: 'cientifico_fosiles', text: '—Desde arriba, asomado—. Despacio. Con el cincel fino. Lo que hay dentro lleva cien millones de años sin que nadie lo toque, así que no le va a importar esperar diez minutos a que lo hagas bien.' },
			{ minigame: {
				type: 'dig', id: 'p9_fos_bloque', title: 'El bloque de la línea negra', level: 3, theme: 'cantera',
				hint: 'Hay algo alargado y frágil dentro. Destápalo entero antes de que el bloque se agriete por el frío.',
				guaranteed: ['plumefossil'], picks: 2, lootTitle: 'Dentro del bloque',
				loot: [{ id: 'rarebone', w: 5 }, { id: 'hardstone', w: 6 }, { id: 'stardust', w: 6 }, { id: 'smoothrock', w: 3 }, { id: 'sunstone', w: 1, rare: true }],
				consolation: false,
			},
			onWin: [
				{ set: { 'flag.p9_fos_bloque': true } },
				{ text: 'La roca cede con un «crac» limpio. Dentro, aplastado contra la piedra como una hoja en un libro, hay un fósil fino, con la forma de un ala pequeña y plumas que son líneas de piedra.' },
				{ say: 'cientifico_fosiles', text: '…Plumas. —Baja la escalera él mismo, cosa que tiene prohibida por escrito—. Es un Fósil Pluma. Aquí no debería haber un Fósil Pluma. Esto es de muy lejos y de hace muchísimo. Esta capa se trajo cosas de todas partes.' },
				{ say: 'petra', text: '¡¿PLUMAS?! —El holomisor de Lazare, en el bolsillo de la bata, grita solo—. ¡Lazare, un Fósil Pluma! ¡Yo quería un Fósil Pluma! ¡Desde los nueve años! —Pausa—. Que se lo quede {jugador}. Primera regla de la cantera: lo que sacas tú, es tuyo. Es tu regla. La has dicho tú.' },
				{ say: 'cientifico_fosiles', text: 'La he dicho yo. —Suspira—. Llévalo arriba. Al Restaurador le he atornillado una bandeja más ancha, por si acaso. Por si acaso era esto.' },
				{ quest: 'p9_s_fosiles', stage: 'restaurar' },
			],
			onLose: [
				{ say: 'cientifico_fosiles', text: '¡Quieto! Se ha partido una esquina del bloque, nada más. Lo de dentro sigue dentro; lo he oído. Respira. Vuelve a bajar cuando tengas las manos quietas. Yo no bajo: tengo prohibido bajar. Por escrito. Por mí.' },
			],
			onQuit: [
				{ say: 'cientifico_fosiles', text: 'Bien. Parar a tiempo es la mitad de la paleontología. La otra mitad es volver mañana y que la bomba de agua siga funcionando.' },
			] },
		],

		p9_fos_maquina: [
			{ text: 'El Restaurador de Fósiles, con su bandeja nueva atornillada a un lado: más ancha, más plana y con una pegatina que pone «NO ES PARA EL CAFÉ». Lazare se pone las gafas de soldador encima de las normales.' },
			{ say: 'cientifico_fosiles', text: 'La bandeja de siempre solo admitía lo que yo conocía. Esta admite lo que no. Lo cual, desde la zanja profunda, es casi todo. Dame.' },
			{ prompt: '¿Qué fósil pones en la bandeja nueva?', choice: [
				{ text: 'Fósil Pluma', cond: 'has("plumefossil")', then: [{ take: 'plumefossil' }, { call: 'p9_fos_archen' }] },
				{ text: 'Fósil Raíz', cond: 'has("rootfossil")', then: [{ take: 'rootfossil' }, { call: 'p9_fos_lileep' }] },
				{ text: 'Fósil Garra', cond: 'has("clawfossil")', then: [{ take: 'clawfossil' }, { call: 'p9_fos_anorith' }] },
				{ text: 'Fósil Cráneo', cond: 'has("skullfossil")', then: [{ take: 'skullfossil' }, { call: 'p9_fos_cranidos' }] },
				{ text: 'Fósil Coraza', cond: 'has("armorfossil")', then: [{ take: 'armorfossil' }, { call: 'p9_fos_shieldon' }] },
				{ text: 'Fósil Tapa', cond: 'has("coverfossil")', then: [{ take: 'coverfossil' }, { call: 'p9_fos_tirtouga' }] },
				{ text: 'Ahora no.', then: [{ say: 'cientifico_fosiles', text: 'Muy bien. Los fósiles no tienen prisa. Yo sí, pero me aguanto. Es lo que llevo haciendo desde que entré en esta profesión.' }] },
			] },
			{ if: 'quest.p9_s_fosiles == "restaurar" && flag.p9_fos_revivido', then: [
				{ say: 'cientifico_fosiles', text: 'El primero de la línea negra. Vivo. —Se quita las dos gafas y se queda mirando la bandeja vacía—. El museo de Luminalia ha pagado por la foto del bloque antes de que lo abriéramos. Tu parte. Es la regla.' },
				{ money: 3000 },
				{ say: 'cientifico_fosiles', text: 'La capa seguirá soltando cosas. Despacio; es una capa, no una tienda. Lo que suba, tráelo aquí. La bandeja nueva no se va a ir a ningún sitio. Yo tampoco. Salvo los martes.' },
				{ quest: 'p9_s_fosiles', done: true },
				{ diary: 'Hoy, en el laboratorio de Petroglifo, algo que llevaba cien millones de años quieto ha abierto los ojos en una bandeja. El doctor Lazare se ha quitado las gafas. Las dos. La paleontóloga gritaba desde el holomisor y nadie le hacía caso, y a nadie le importaba. Bzzt. He apuntado la hora exacta. No sé para qué. Para tenerla.', cond: 'flag.b01_diario' },
			] },
		],

		p9_fos_archen: [
			{ text: 'Lazare coloca el Fósil Pluma en la bandeja nueva con las dos manos. La máquina zumba, se ilumina por dentro de azul y, durante un segundo, se ve la sombra de un ala abriéndose contra el cristal.' },
			{ text: 'La tapa salta con un siseo. Sobre la bandeja, un pajarraco pequeño, de plumas azules y rojas y una cara de muy pocos amigos, se sacude el polvo de cien millones de años y mira a Lazare como si fuera culpa suya.' },
			{ say: 'cientifico_fosiles', text: 'Un **Archen**. Que no vuela. Que no volará nunca, por mucho que lo intente, y lo va a intentar. —Al Archen—. Bienvenido. Aquí nadie vuela. Te vas a sentir como en casa.' },
			{ say: 'petra', text: '¡ARCHEN! ¡Hola! ¡HOLA! ¡No, no me mires así, no te voy a tocar, estoy en un barco! —Al jugador—. Cuídalo mucho. Y no lo dejes cerca de un balcón. Lo digo por experiencia ajena.' },
			{ pokemon: { sp: 'archen', lv: 30, happy: 70 } },
			{ set: { 'flag.p9_fos_revivido': true } },
		],
		p9_fos_lileep: [
			{ text: 'El Fósil Raíz entra en la bandeja. La máquina zumba, se ilumina y algo dentro se despliega muy despacio, como una flor que se abre en una película acelerada.' },
			{ text: 'La tapa se abre. Sobre la bandeja, un **Lileep** se balancea con sus ocho tentáculos, se agarra al borde y se queda quieto, satisfecho, como si llevara esperando ese borde cien millones de años.' },
			{ say: 'cientifico_fosiles', text: 'Se va a quedar ahí. Lo sé. Hay que despegarlo con cuidado y con paciencia. Yo tengo lo segundo. Lo primero se lo pido a tu Pokémon.' },
			{ pokemon: { sp: 'lileep', lv: 30, happy: 70 } },
			{ set: { 'flag.p9_fos_revivido': true } },
		],
		p9_fos_anorith: [
			{ text: 'El Fósil Garra entra en la bandeja. La máquina zumba, se ilumina y algo dentro empieza a dar golpecitos contra el cristal: toc, toc, toc.' },
			{ text: 'La tapa se abre. Un **Anorith** sale nadando por el aire, con las garras por delante, da dos vueltas al laboratorio y aterriza en la cabeza de Lazare, que no se mueve.' },
			{ say: 'cientifico_fosiles', text: 'Que no se mueva nadie. —Muy quieto—. Me está midiendo. Los Anorith miden lo que no conocen. Déjalo. Es ciencia. Mala, pero ciencia.' },
			{ pokemon: { sp: 'anorith', lv: 30, happy: 70 } },
			{ set: { 'flag.p9_fos_revivido': true } },
		],
		p9_fos_cranidos: [
			{ text: 'El Fósil Cráneo entra en la bandeja nueva, que es la única donde cabe. La máquina zumba, se ilumina y suelta un «clonc» que hace saltar una tapa.' },
			{ text: 'Sobre la bandeja, algo pequeño y gris con la cabeza azul y muy dura. Lo primero que hace es darle un cabezazo a la máquina. La máquina se abolla. Lazare suspira.' },
			{ say: 'cientifico_fosiles', text: 'Un **Cranidos**. Segunda abolladura de la temporada. Cuídalo. Y mantenlo lejos de todo lo que te importe y de todo lo que me importe a mí, que es esta máquina.' },
			{ pokemon: { sp: 'cranidos', lv: 30, happy: 70 } },
			{ set: { 'flag.p9_fos_revivido': true } },
		],
		p9_fos_shieldon: [
			{ text: 'El Fósil Coraza entra en la bandeja. La máquina zumba, se ilumina y algo dentro se queda completamente quieto, como si estuviera decidiendo si merece la pena.' },
			{ text: 'La tapa se abre. Un **Shieldon** mira el laboratorio desde detrás de su cara de piedra, decide que sí, y da un paso. Uno. Luego se queda un rato.' },
			{ say: 'cientifico_fosiles', text: 'Tranquilo. Sólido. Sin prisa. Si yo tuviera que ser un fósil, sería este. —Al Shieldon—. No es un cumplido. Bueno, sí.' },
			{ pokemon: { sp: 'shieldon', lv: 30, happy: 70 } },
			{ set: { 'flag.p9_fos_revivido': true } },
		],
		p9_fos_tirtouga: [
			{ text: 'El Fósil Tapa entra en la bandeja. La máquina zumba, se ilumina y por dentro se oye un chapoteo que no debería estar ahí.' },
			{ text: 'La tapa se abre. Un **Tirtouga** asoma la cabeza, mira alrededor buscando el mar, no lo encuentra y se mete de cabeza en el cubo de la fregona.' },
			{ say: 'cientifico_fosiles', text: 'El mar está a cien pasos. Lo de la fregona es provisional. —Mira el cubo—. Como mi criba. Veinte años provisional.' },
			{ pokemon: { sp: 'tirtouga', lv: 30, happy: 70 } },
			{ set: { 'flag.p9_fos_revivido': true } },
		],
	},
};
