// Pasada 9 (2026-10-28, pedido de Mario): secundarias nuevas en zonas ya jugadas. Ver secreto/bloques/p9-plan.md
//   p9_s_mareep   «Cinco líos con lana» · Rancho Prado (Johto). Adela tiene un lío por oveja: Copito (o Nieve) en el Monte
//                 Mortero, Borla sin lana, Nube peleada con el Wooloo Bizcocho de la Ruta 5 de Kalos, Algodón que quiere ser
//                 montura y una noche con Chispita. `parts` con las cinco. Premio: Lana Eléctrica (recuerdo, `read`) y la
//                 Mareep rosada de la camada nueva, que se queda a vivir en el rancho si ya tienes la línea.
//                 Rama `b03_rancho_lemnis`: sin misión; una Mareep fuera de la cerca (`p9_mareep_lemnis`).
//   p9_s_bastien  «La definitiva» · Bastien con seis Pokémon (Mega-Greninja). Si rompió, está mirando el mar en el Paseo de
//                 Hauoli; si siguió, en la clínica de Æther. Ofrece curar antes. Premio: Greninjanita, con escena por rama.
//   p9_buzon      El buzón de la puerta de tu cuarto (`atico_cuarto`): cartas con `read` que llegan según lo vivido
//                 (Noa, Rhi, Lila, Kaori, Adela, Lucien). Sin misión. Flags `p9_carta_<quien>`.
// Limitación del motor: los objetos del contenido no pueden tener efecto en combate (el simulador solo conoce los suyos), así
// que la Lana Eléctrica es un objeto clave para leer y mirar, no equipable.

// ---------- Condiciones reutilizadas ----------
const LUC = 'inParty("riolu") || inParty("lucario")';
const RANCHO_OK = '(flag.b03_rancho_sobrina || flag.b03_rancho_jugador)';
const LEMNIS = 'flag.b03_rancho_lemnis';
const Q = 'p9_s_mareep';
const EN_CURSO = `quest.${Q} && !done.${Q}`;
const COPITO_FUERA = '(flag.b03_copito_contigo && flag.b01_mareep_copito)'; // Copito viaja contigo: la del monte es Nieve
const CHISPITA_FUERA = '(flag.b01_mareep_lemnis && !flag.b01_mareep_jaula)'; // Chispita sigue con Lemnis
const LANA_PARTY = '(inParty("mareep") || inParty("flaaffy") || inParty("ampharos"))';
const LANA_OWNS = '(owns("mareep") || owns("flaaffy") || owns("ampharos"))';
const CINCO = 'flag.p9_mareep_copito && flag.p9_mareep_borla && flag.p9_mareep_nube && flag.p9_mareep_algodon && flag.p9_mareep_chispita';
const SOCIO_ATICO = 'partner("b05_atico")';

// Bastien
const BASTIEN_OK = '(flag.b05_bastien_rompe || flag.b05_bastien_sigue)';
const QB = 'p9_s_bastien';

// Cartas del buzón: [id, condición de llegada]
const CARTAS = [
	['noa', 'flag.b04_noa_celeste'],
	['rhi', 'flag.b05_rhi_wela'],
	['lila', '(flag.b03_lila_fin || flag.b03_sylveon)'],
	['kaori', 'flag.b04_kaori_paso'],
	['adela', `flag.b03_rancho_sobrina && done.${Q}`],
	['lucien', 'vars.lucien_viaje'],
];
const PENDIENTE = c => `(${c[1]} && !flag.p9_carta_${c[0]})`;
const ALGUNA_CARTA = CARTAS.map(PENDIENTE).join(' || ');

export default {
	// =====================================================================
	// LUGARES: ninguno nuevo. Todo son parches a zonas ya jugadas.
	// =====================================================================
	locations: {},

	npcs: {
		p9_margaux: { name: 'Margaux', title: 'Criadora de la Ruta 5', generic: true, look: { hair: 'braids', hairColor: '#8a5a2f', outfit: '#8a7a5a', outfit2: '#e9e3d0', skin: 2, acc: 'hat', mouth: 'smile' } },
	},

	patches: {
		// =================== RANCHO PRADO ===================
		rancho_aurelio: {
			spots: [
				// La misión (ramas sobrina y jugador)
				{ label: 'Adela, con una lista en la mano', sub: 'Cinco nombres y cinco tachones que no son tachones', icon: '📋',
					cond: RANCHO_OK + ' && !done.' + Q, new: `!quest.${Q} || (${CINCO})`,
					talk: [
						{ cond: `!quest.${Q}`, script: 'p9_mareep_intro' },
						{ cond: CINCO, script: 'p9_mareep_final' },
						{ script: 'p9_mareep_estado' },
					] },
				// Borla
				{ label: 'Borla, tumbada junto al pozo', sub: 'Con la lana corta y cara de que no es asunto tuyo', icon: '🐑',
					cond: EN_CURSO + ' && !flag.p9_mareep_borla', new: 'has("moomoomilk")',
					talk: [{ cond: 'has("moomoomilk")', script: 'p9_borla_leche' }, { script: 'p9_borla_sin' }] },
				// Algodón
				{ label: 'Algodón, con una silla de montar puesta', sub: 'Del revés', icon: '🐑',
					cond: EN_CURSO + ' && !flag.p9_mareep_algodon', new: 'true',
					talk: [{ script: 'p9_algodon' }] },
				// Chispita
				{ label: 'Pasar la noche en el establo', sub: 'Chispita duerme en el sombrero de Don Aurelio', icon: '🌙',
					cond: EN_CURSO + ' && !flag.p9_mareep_chispita && !' + CHISPITA_FUERA, new: 'night',
					talk: [{ cond: 'night', script: 'p9_chispita_noche' }, { script: 'p9_chispita_dia' }] },
				{ label: 'Pasar la noche en el porche', sub: 'El sombrero de Don Aurelio sigue colgado del clavo', icon: '🌙',
					cond: EN_CURSO + ' && !flag.p9_mareep_chispita && ' + CHISPITA_FUERA, new: 'night',
					talk: [{ cond: 'night', script: 'p9_chispita_noche' }, { script: 'p9_chispita_dia' }] },
				// La rosada, después
				{ label: 'La Mareep rosada', sub: 'Vive en el rancho. Lo ha decidido ella', icon: '🌸',
					cond: 'flag.p9_mareep_rosada_vive', talk: [{ script: 'p9_rosada_visita' }] },
				// Rama Lemnis: variante corta
				{ label: 'Una Mareep fuera de la cerca', sub: 'Pasta junto a la placa azul, muy quieta', icon: '🐑',
					cond: LEMNIS + ' && !flag.p9_mareep_lemnis', new: 'true', talk: [{ script: 'p9_mareep_lemnis' }] },
			],
			rumors: [
				{ cond: RANCHO_OK + ' && done.' + Q, text: 'En la Ruta 42 dicen que la veterinaria del rancho Prado tiene una lista en la nevera con cinco nombres. Ya no la mira. Pero no la quita.' },
			],
		},

		// =================== MONTE MORTERO: Copito (o Nieve) en el lago ===================
		monte_mortero: {
			route: { tramos: {
				3: [
					{ talk: [{ cond: '!flag.p9_mareep_copito', script: 'p9_copito_lago' }, { script: 'p9_copito_despues' }],
						label: 'Un cencerro suena junto al lago', sub: 'Una lucecita amarilla se refleja en el agua negra', icon: '🔔',
						cond: EN_CURSO, new: '!flag.p9_mareep_copito' },
				],
			} },
		},

		// =================== RUTA 5 (KALOS): Nube y Bizcocho ===================
		ruta5: {
			route: { tramos: {
				6: [
					{ talk: [{ cond: '!flag.p9_mareep_nube', script: 'p9_nube_bizcocho' }, { script: 'p9_nube_despues' }],
						label: 'Dos ovejas se miran fijamente', sub: 'Una blanca y una de lana negra. Ninguna parpadea', icon: '🐑',
						cond: EN_CURSO, new: '!flag.p9_mareep_nube' },
				],
			} },
		},

		// =================== HAUOLI: Bastien, si rompió ===================
		paseo_hauoli: {
			spots: [
				{ label: 'Bastien, en el muro del Paseo', sub: 'Con los pies colgando y una libreta abierta', icon: '📓',
					cond: 'flag.b05_bastien_rompe && !done.' + QB, new: `!quest.${QB}`,
					talk: [
						{ cond: `!quest.${QB}`, script: 'p9_bastien_intro' },
						{ script: 'p9_bastien_revancha' },
					] },
				{ label: 'Bastien, en el muro del Paseo', sub: 'Mira el mar. El suyo', icon: '📓',
					cond: 'flag.b05_bastien_rompe && done.' + QB, talk: [{ script: 'p9_bastien_despues' }] },
			],
		},

		// =================== ÆTHER, CLÍNICA: Bastien, si siguió ===================
		aether_clinica: {
			spots: [
				{ label: 'Bastien, en el pasillo de la Unidad', sub: 'Sin cables. Con la libreta', icon: '📓',
					cond: 'flag.b05_bastien_sigue && !done.' + QB, new: `!quest.${QB}`,
					talk: [
						{ cond: `!quest.${QB}`, script: 'p9_bastien_intro' },
						{ script: 'p9_bastien_revancha' },
					] },
				{ label: 'Bastien, en el pasillo de la Unidad', sub: 'Apunta algo. Sonríe', icon: '📓',
					cond: 'flag.b05_bastien_sigue && done.' + QB, talk: [{ script: 'p9_bastien_despues' }] },
			],
		},

		// =================== TU CUARTO: el buzón ===================
		atico_cuarto: {
			spots: [
				{ label: 'El buzón de la puerta', sub: 'Una caja de latón con una ranura. Philippe dice que es «de época»', icon: '📬',
					cond: SOCIO_ATICO, new: ALGUNA_CARTA,
					talk: [{ cond: ALGUNA_CARTA, script: 'p9_buzon_cartas' }, { script: 'p9_buzon_vacio' }] },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// Bastien, la definitiva: su equipo de siempre, completo, más el Wimpod que recogió en la arena de Hauoli y que
		// ya es Golisopod (Retirada: se va cuando le va mal. A Bastien le hace gracia).
		p9_bastien_6: { name: 'Bastien', cls: 'Rival', npc: 'bastien', ai: 4, iv: 29, reward: 4800, bg: 'coast',
			gimmick: 'mega', ace: 'greninja',
			team: [
				{ sp: 'talonflame', lv: 58, moves: ['bravebird', 'flareblitz', 'uturn', 'roost'], ability: 'flamebody', item: 'sharpbeak', nature: 'jolly', iv: 28 },
				{ sp: 'meowstic', lv: 58, moves: ['psychic', 'shadowball', 'lightscreen', 'reflect'], ability: 'prankster', item: 'lightclay', nature: 'timid', iv: 28 },
				{ sp: 'pyroar', lv: 58, moves: ['flamethrower', 'hypervoice', 'darkpulse', 'willowisp'], ability: 'unnerve', item: 'wiseglasses', nature: 'modest', iv: 28 },
				{ sp: 'golisopod', lv: 59, moves: ['firstimpression', 'liquidation', 'suckerpunch', 'swordsdance'], ability: 'emergencyexit', item: 'sitrusberry', nature: 'adamant', iv: 28 },
				{ sp: 'aegislash', lv: 59, moves: ['kingsshield', 'shadowball', 'flashcannon', 'sacredsword'], ability: 'stancechange', item: 'leftovers', nature: 'quiet', iv: 29 },
				{ sp: 'greninja', lv: 60, moves: ['hydropump', 'darkpulse', 'icebeam', 'extrasensory'], ability: 'torrent', item: 'greninjite', nature: 'timid', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: 'Página nueva. Arriba pone «La definitiva». Debajo no hay nada: lo escribo después. ¡Talonflame, abre! ¡Greninja, cierra!',
			win: 'Lo apunto: «Perdí. Seis contra seis. Sin cláusulas». Y lo subrayo. Nunca había subrayado una derrota.',
			lose: 'Gané la definitiva. —Lo mira en la libreta un rato—. Qué raro. Pensaba que iba a sentirse más grande.' },

		// Margaux, la criadora de la Ruta 5, años después. Bizcocho ya no es un Wooloo.
		p9_margaux: { name: 'Margaux', cls: 'Criadora', ai: 2, iv: 24, reward: 2300, look: { hair: 'braids', hairColor: '#8a5a2f', outfit: '#8a7a5a', outfit2: '#e9e3d0', skin: 2, acc: 'hat', mouth: 'smile' },
			team: [
				{ sp: 'dodrio', lv: 57, moves: ['bravebird', 'drillpeck', 'agility', 'quickattack'], ability: 'earlybird', nature: 'jolly' },
				{ sp: 'dubwool', lv: 58, moves: ['bodypress', 'cottonguard', 'doubleedge', 'thunderwave'], ability: 'fluffy', item: 'leftovers', nature: 'impish' },
			],
			intro: 'Bizcocho ya no llora cuando pierde. Ahora se enfada. Yo también. Vamos a ver quién se enfada más.',
			win: 'Bizcocho, cariño, no te enfades. Rodaste muy fuerte. Siempre ruedas muy fuerte.',
			lose: 'Ves, Bizcocho. Así se defiende un huerto.' },
	},

	// =====================================================================
	// MISIONES
	// =====================================================================
	quests: {
		p9_s_mareep: {
			name: 'Cinco líos con lana', type: 'side', est: 90,
			stages: {
				inicio: 'Adela, en el rancho Prado, tiene un lío por cada Mareep de Kalos. La lista está en esta ficha: resuélvelos en el orden que quieras.',
				volver: 'Los cinco líos están resueltos. Vuelve con Adela, al rancho Prado, a dar el parte.',
				hecha: 'Las cinco Mareep de Kalos, en paz. Adela te dio la Lana Eléctrica. La Mareep rosada de la camada nueva ya sabe dónde vive.',
			},
			parts: { title: 'Las cinco de Kalos', var: 'p9_mareep', items: [
				{ label: 'Copito y el monte', where: 'monte_mortero', tramo: 3, done: 'flag.p9_mareep_copito',
					hint: [
						{ cond: COPITO_FUERA, text: 'Nieve, la madre de Copito, se ha ido al Monte Mortero. Copito sabrá por qué: llévala en el equipo.' },
						{ text: 'Copito se escapa al Monte Mortero cuando falta alguien. Busca una lucecita en el lago de dentro.' },
					] },
				{ label: 'Borla', where: 'rancho_aurelio', done: 'flag.p9_mareep_borla', got: 'has("moomoomilk")',
					hint: 'No da lana desde hace semanas. Adela dice que no está enferma: está triste. Una Leche Mu-mu (el huerto del rancho da) puede ayudar.',
					gotHint: 'Llevas Leche Mu-mu. Dásela a Borla junto al pozo.' },
				{ label: 'Nube', where: 'ruta5', tramo: 6, done: 'flag.p9_mareep_nube',
					hint: 'Se coló en el camión de la lana que cruza la Puerta hacia Kalos. Está en la Ruta 5, en el huerto del Wooloo Bizcocho. No se hablan.' },
				{ label: 'Algodón', where: 'rancho_aurelio', done: 'flag.p9_mareep_algodon',
					hint: 'Quiere ser montura. No puede. Alguien tiene que decírselo, y Adela no quiere ser ese alguien.' },
				{ label: 'Chispita', where: 'rancho_aurelio', done: 'flag.p9_mareep_chispita',
					hint: [
						{ cond: CHISPITA_FUERA, text: 'Chispita no está en el rancho. Adela te pide una noche en el porche, con el sombrero de Don Aurelio. Ve de noche.' },
						{ text: 'Sigue asustadiza. Adela te pide que pases una noche en el establo con ella. Ve al rancho de noche.' },
					] },
			] },
		},
		p9_s_bastien: {
			name: 'La definitiva', type: 'side', est: 25,
			stages: {
				inicio: 'Bastien quiere el combate definitivo: seis contra seis, sin cláusulas. Acepta cuando tengas el equipo listo.',
				revancha: 'Perdiste la definitiva. Bastien sigue donde estaba, con la página abierta: vuelve cuando quieras.',
				hecha: 'Ganaste la definitiva. Bastien te dio su Greninjanita: ya no la necesita.',
			},
		},
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		p9_lanaelectrica: { name: 'Lana Eléctrica', pocket: 'key',
			desc: 'Un ovillo de lana de Mareep que no se apaga. Lo hilaron las cinco de Kalos, una hebra cada una, y lo tejió Adela con las agujas de su tía. Suelta chispitas si lo aprietas. Lleva una etiqueta de cartón atada con cordel.',
			read: '*(Etiqueta de cartón, letra de veterinaria: recta, apretada, sin florituras.)*\n\n**LANA ELÉCTRICA · Rancho Prado**\n\nCinco hebras. En este orden, porque así se pusieron ellas en fila:\n\n**Copito.** La que se va al monte cuando falta alguien. Hebra blanca, la más larga. Siempre vuelve. Siempre tarde.\n\n**Borla.** Hebra corta y gorda. Es lo primero que ha dado en semanas. Se la cambié por una Leche Mu-mu y un rato de no decirle nada.\n\n**Nube.** Hebra con una ramita de Kalos enganchada. Se la dejé. Es su recuerdo del viaje, y de la pelea, y del Wooloo.\n\n**Algodón.** Hebra rizada. La dio ella sola, sin que se lo pidiera, el día que le dijimos la verdad. Hay quien da más cuando le dicen que no.\n\n**Chispita.** Hebra que chispea. Hilarla me costó dos chispazos y una noche. Valió.\n\nMi tío decía que la lana de una Mareep guarda lo que la Mareep siente cuando se la quitas. Yo decía que eso no es ciencia. Apriétala y me cuentas.\n\nNo se vende. No se gasta. Es para que te acuerdes de que tienes cinco en Johto que te esperan en fila.\n\n**A. Prado**' },

		// ---------- Cartas del buzón ----------
		p9_carta_noa: { name: 'Carta de Noa', pocket: 'key',
			desc: 'Un sobre gris, de los de la empresa, con el logo tachado a bolígrafo. Matasellos de Ciudad Celeste. Dentro, una hoja de libreta con las íes con el puntito muy gordo.',
			read: '*(Letra redonda, cuidadosa. La hoja está escrita por una cara. La otra está en blanco, salvo un número en una esquina: 24.)*\n\n{jugador}:\n\nNo me has visto. Lo repito por escrito para que conste: no me has visto, no hemos hablado, y esta carta no existe. Es un dato. Los datos se archivan.\n\nTe escribo desde el hostal de Celeste, con el felpudo de Psyduck en la puerta. Es horrible. Me gusta. Es lo único de aquí que no lleva logo.\n\nHoy he contado el furgón entero por primera vez. Antes firmaba sin contar. Me decían «Lambert, firme» y yo firmaba, con buena letra, porque tengo buena letra. Hoy conté. No te pongo el número en esta cara. Lo he puesto detrás, pequeño, por si alguien abre el sobre antes que tú.\n\nMe mandaron a Celeste con una tarjeta de VISITANTE. Trabajo en un sitio al que soy visitante. Eso también lo he archivado.\n\nAntes de irme del callejón miré la bici roja del escaparate. La de un millón. No la quiero. Quería mirar algo que costara mucho y no fuera nadie.\n\nSi te mando otra carta, cuenta los días entre esta y la siguiente. Si pasan muchos, ya sabes lo que te pedí. No me esperes para hacerlo.\n\nGracias por quedarte en el callejón hasta el final. Pesa menos.\n\n— N.\n\n*P. D.: Las íes gordas son a propósito. Para que sepas que soy yo y no alguien que firma por mí.*' },

		p9_carta_rhi: { name: 'Postal de Rhi', pocket: 'key',
			desc: 'Una postal de un volcán, doblada por la mitad para que quepa en el sobre, lo cual la convierte en una carta, dice Rhi. Está escrita con dos bolígrafos porque el primero se acabó.',
			read: '*(Letra grande, inclinada hacia delante, como quien corre. Las exclamaciones ocupan dos líneas.)*\n\n¡{jugador}!\n\nTe escribo porque Nate dice que las postales son «un esfuerzo innecesario» y yo quería hacer un esfuerzo innecesario. Ya está. Punto para mí.\n\nSigo con lo del baile. Golpe de talón, giro. Lo hago fatal. Kiawe ya no se tapa la cara con el pañuelo: ahora se tapa con las dos manos. ¡Eso es progreso! Antes le sobraba una mano.\n\nMi padre se ha comprado una tele para ver la Copa. Con el finiquito. ¿Te lo conté? Igual no. Me ha mandado una foto de la tele apagada, con el mando encima, y debajo: «Lista». Así de hablador es. Lo entendí igual.\n\nOye. Lo de nuestros partidos. No se los he contado a nadie en Galar porque no me creerían, y no porque fueran en un tren o en un volcán. No me creerían que hay alguien contra quien perder no me quita el sueño. Y si todavía no te he ganado como quiero, es que lo estoy guardando para cuando importe. Lo estoy entrenando. Se me da mejor que el baile.\n\nCuando llegues a la Copa, llega con los seis bien. Si llegas con cinco, te espero. Si llegas con cuatro, te meto un gol y te espero igual.\n\n¡GOLAZO POR ADELANTADO!\n\nRhi (la 9)\n\n*P. D.: Nate dice hola. No lo ha dicho. Pero lo dice.*' },

		p9_carta_lila: { name: 'Carta de Lila', pocket: 'key',
			desc: 'Un sobre crema con un lazo rosa muy fino atado alrededor, no pegado: para que se pueda desatar sin romper nada. Huele un poco a parqué encerado.',
			read: '*(Letra pequeña y limpia. En dos sitios la pluma se ha parado y ha dejado un puntito más oscuro, como quien respira antes de seguir.)*\n\nHola, {jugador}.\n\nE-esto… no sé empezar las cartas. Lo he intentado tres veces. Sylveon me ha quitado los dos primeros intentos con las cintas y se los ha llevado debajo de la cama. Creo que los está guardando. Creo que me está diciendo que todos valían.\n\nEstamos en Trigal. Corelia me deja el primer combate de la mañana. A veces el segundo. Ya no me tiembla la primera palabra. La segunda a veces sí, pero esa no la oye nadie más que Sylveon, y ella no se lo cuenta a nadie.\n\nEl otro día un niño vino a retarme a mí. A mí, no a la líder. Preguntó por «la de las cintas». Le gané. Luego le enseñé a su Eevee a no tener miedo de mi Sylveon, porque le tenía miedo. Corelia dice que eso también es ser Guardiana. No sé. Creo que sí.\n\nMe acuerdo de ti en la puerta del gimnasio, el día de Sylveon. Me ayudó que estuvieras. Te lo dije entonces, o quise decírtelo y me salió muy bajito, así que te lo escribo ahora, que por escrito no tiemblo.\n\nCuídate. Cuida a {riolu}. Y no te disculpes tanto, que eso lo hago yo.\n\nLila\n\n*P. D.: Sylveon ha puesto una cinta encima de la carta mientras la cerraba. No sé qué significa. Creo que es bueno.*' },

		p9_carta_kaori: { name: 'Nota de Kaori', pocket: 'key',
			desc: 'No es un sobre: es una bolsita de papel de botica, de las de las hierbas, doblada y cerrada con una grapa. Dentro, una hoja cuadriculada y una flor de lavanda seca.',
			read: '*(Letra cuadrada, toda igual, sin inclinación. Ni una tachadura. Al final, una línea escrita más apretada que el resto.)*\n\n{jugador}.\n\nInforme. La Ponyta de la Casa Pokémon: estable. Llamita de 1,2 cm. El Señor Fuji le ha puesto nombre. No te lo digo porque no estoy de acuerdo con el nombre.\n\nLa flor que va dentro es lavanda del árbol de la calle. No lleva nada. Lo he comprobado dos veces. La tercera vez ya era por costumbre.\n\nHe probado el antídoto en mí otras once veces. Resultado: nada. Eso es bueno. Lo malo sería algo.\n\nSigo sin saber adónde va el cansancio. Sé que va a alguna parte. Las cosas que se quitan no desaparecen; cambian de dueño. Cuando sepa el dueño, sabré la dosis.\n\nNo me escribas para preguntarme cómo estoy. Estoy como siempre. Escríbeme si ves algo raro: una resina, un polvo que brille, un Pokémon que esté cansado sin motivo. Eso sí me interesa.\n\nSi vienes, trae silencio. Se piensa mejor.\n\nK.\n\n*(Y, apretado, al final:)* El té de lavanda sigue sin nada raro. Por si un día lo tomas.' },

		p9_carta_adela: { name: 'Carta de Adela (la tercera)', pocket: 'key',
			desc: 'Papel de estraza, sellos de Johto torcidos, remite «A. Prado · Ruta 42». Esta vez el mechón de lana pegado con celo es de cinco colores de blanco distintos.',
			read: '*(Letra recta y apretada. Esta vez el bolígrafo no cambia a mitad: la escribió de una vez.)*\n\n{jugador}:\n\nEsta es la tercera. La segunda te llegó; la primera la tienes o la tendrás, según cómo me pille el día.\n\nInforme de las cinco. La del monte duerme en el establo, no en el monte. Borla ha dado lana dos veces esta semana y ya no mira el cubo como si le debiera dinero. Nube no se ha subido a ningún camión; la vigilo igual. Algodón se pone la silla del revés todas las mañanas, pero ya no intenta que nadie se suba: la lleva como quien lleva un sombrero. Y Chispita duerme donde siempre, y la noche que tú no estás, se enciende sola un rato y luego se apaga. Yo lo apunto. No sé para qué.\n\nLa Lana que te di no vale nada. Lo digo por si piensas venderla. No vale nada y la hice con las agujas de mi tía, que no las había tocado nadie desde que ella se fue. Me costó más la etiqueta que la lana.\n\nLa mecedora sigue en el porche. Me siento. No un minuto: lo que haga falta. Ya no me levanto enseguida.\n\nNo me contestes con una carta larga. Contesta viniendo.\n\n**A.**\n\n*P. D.: La mecedora no se vende. Eso tampoco ha cambiado.*' },

		p9_carta_lucien: { name: 'Carta de Lucien (para abrir solo entonces)', pocket: 'key',
			desc: 'Un sobre de los de la libreta de portero, cerrado con tres trozos de cinta adhesiva y una pegatina de Chespin. Fuera, con letra de niño: «PARA {jugador}. ABRIR SOLO CUANDO ME HAYA IDO DE VIAJE. HORA: la que sea».',
			read: '*(Letra grande, con las líneas torcidas hacia arriba. Hay una mancha de crêpe en la esquina. Cada párrafo lleva una hora apuntada al lado, y todas son distintas.)*\n\n{jugador}:\n\nSi lees esto es que me he ido de viaje. ¡Por fin! Llevo desde los nueve años esperando. Lo apunté en la libreta el primer día: «Lucien: viajar por una Puerta. Hora: pendiente». Pues ya no está pendiente.\n\nNo sé adónde, porque esta carta la escribí antes. La escribí en la portería, un martes, mientras la Puerta zumbaba (2:17, como siempre). Pensé: cuando me vaya, {jugador} va a venir y no voy a estar, y se va a enfadar porque no apunté la hora de salida. Así que te la apunto ahora: hora de salida, la que ponga en la libreta. Mírala. Está en la garita, o en el taburete, abierta.\n\nChespin va conmigo. Siempre va conmigo. Si no va conmigo, es que ha pasado algo raro, y entonces búscalo tú, que a ti te hace caso.\n\nNo te preocupes. Bueno, un poco sí, que si no, no es un viaje de verdad. Los viajes de verdad tienen a alguien que se preocupa. Tú tienes a {riolu}. Yo te tengo a ti.\n\nCuando vuelva te lo cuento todo con horas.\n\nLucien, portero en prácticas\n\n*P. D.: El dibujo de tu puerta eres tú. Si no te pareces, es que has cambiado tú, no el dibujo.*' },
	},

	// =====================================================================
	// NEGOCIOS: un imprevisto nuevo para el rancho, cuando ya están las cinco en paz
	// =====================================================================
	ventures: {
		p7_rancho: {
			events: [
				{ id: 'p9_fila', name: 'Las cinco en fila', w: 2, npc: 'sobrina', cond: 'done.' + Q, once: false,
					text: 'Informe. Esta mañana las cinco de Kalos se han puesto en fila delante de la cancela, mirando la Ruta 42. Media hora. Luego han vuelto a pastar como si nada. Yo creo que te esperaban. No lo apunto porque no es ciencia.',
					options: [
						{ text: 'Mandar un saco de zanahorias para las cinco', cost: 600, result: 'Las zanahorias torcidas para cuatro y las derechas para Borla. Eso no ha cambiado. El rebaño entero chisporrotea de buen humor.', effect: { boost: { mult: { lana: 1.15 }, days: 3, label: 'Las cinco contentas' }, happy: 6 } },
						{ text: '«Dile que voy pronto.»', result: '«Se lo he dicho. Copito ha mirado el monte y luego a mí. Date prisa».', effect: { happy: 3 } },
					] },
			],
		},
	},

	gather: {},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== CINCO LÍOS CON LANA ===================
		p9_mareep_intro: [
			{ text: 'Adela está en el escalón del porche con una hoja de cuaderno en la mano. Tiene cinco nombres escritos y, al lado de cada uno, una raya. No son tachones: son rayas de quien ha empezado a tachar y se ha arrepentido.' },
			{ say: 'sobrina', text: 'Llegas bien. —Lo dice como quien dice la hora—. Siéntate. Tengo un informe, y no es bueno, y no es malo. Es raro.' },
			{ say: 'sobrina', text: 'Las cinco de Kalos. Las que trajiste con mi tío. Cada una se ha buscado un lío. Las otras cuarenta y ocho, perfectas. Estas cinco, no. Como si se hubieran puesto de acuerdo.' },
			{ if: COPITO_FUERA, then: [
				{ say: 'sobrina', text: 'Nieve, la madre de Copito, se ha ido al **Monte Mortero**. Ella, que no sale del prado ni para la esquila. Creo que busca a su hija. Si llevas a Copito, llévala contigo: la madre la oirá antes que a ti.' },
			], else: [
				{ say: 'sobrina', text: '**Copito** se ha ido al Monte Mortero. Se va cuando falta alguien, y aquí sigue faltando el mismo. Está dentro, junto al lago. Lo sé porque de noche se le ve la luz desde la cancela.' },
			] },
			{ say: 'sobrina', text: '**Borla** no da lana. Tres semanas. No está enferma; la he mirado entera. Está triste, y una Mareep triste no da. Antes, cuando se ponía así, mi tío le daba Leche Mu-mu caliente y se sentaba a su lado sin decir nada. Yo le doy la leche. Lo de no decir nada no me sale.' },
			{ say: 'sobrina', text: '**Nube** se coló en el camión de la lana. El que cruza la Puerta a Kalos, a la tejedora de Vánitas. Me llamó una criadora de la **Ruta 5**: Nube se ha bajado en su huerto y se ha peleado con su Wooloo. Un Wooloo que se llama Bizcocho. No se hablan. Las dos.' },
			{ say: 'sobrina', text: '**Algodón** quiere ser montura. Se pone la silla del revés y se planta delante de la gente. No puede. Una Mareep no aguanta a nadie encima. Alguien tiene que decírselo y a mí no me sale. Yo digo verdades a los humanos. A las ovejas no sé.' },
			{ if: CHISPITA_FUERA, then: [
				{ say: 'sobrina', text: 'Y **Chispita** no está, ya lo sabes. Pero mi tío contaba hasta ella todas las noches, y yo he dejado de contar, y el rebaño lo nota. Quiero que pases una noche en el porche, con su sombrero. No sé qué espero. Algo.' },
			], else: [
				{ say: 'sobrina', text: 'Y **Chispita** sigue asustadiza. Duerme en el sombrero de mi tío, en el establo, y si alguien entra de noche se enciende como una alarma. Quiero que pases una noche con ella. Que se acostumbre a que entre alguien que no sea él.' },
			] },
			{ say: 'sobrina', text: 'Cinco. En el orden que quieras. No te pago: te doy una cosa que estoy haciendo y que no vale nada. Ya la verás. ¿Estamos?' },
			{ choice: [
				{ text: '«Estamos.»', then: [{ say: 'sobrina', text: 'Bien. —Dobla la lista y se la guarda en el bolsillo de la camisa—. La lista la llevo yo. Tú llévate los nombres.' }] },
				{ text: '«¿Por qué justo estas cinco?»', then: [{ say: 'sobrina', text: 'Porque las trajiste tú. —Se encoge de hombros—. Las Mareep no olvidan a quien les dio de comer. Lo decía él. Yo creía que era un refrán. No lo es.' }] },
			] },
			{ quest: Q, stage: 'inicio' },
			{ say: 'rotom', text: '¡Bzzt! He apuntado las cinco en la ficha de la misión, con sus sitios. Copito, Borla, Nube, Algodón, Chispita. Me sale solo: las conté muchas veces en Kalos.', cond: '!' + COPITO_FUERA },
			{ say: 'rotom', text: '¡Bzzt! He apuntado las cinco en la ficha de la misión, con sus sitios. Lo de Nieve lo he puesto en la línea de Copito: es su madre, y Copito va a hacer el trabajo.', cond: COPITO_FUERA },
		],

		p9_mareep_estado: [
			{ say: 'sobrina', text: 'Informe. —Saca la lista del bolsillo sin mirarla—.' },
			{ say: 'sobrina', text: 'Copito, en el monte todavía. De noche se le ve la luz desde aquí.', cond: '!flag.p9_mareep_copito && !' + COPITO_FUERA },
			{ say: 'sobrina', text: 'Nieve, en el monte todavía. Llévate a Copito, que la oirá antes que tú.', cond: '!flag.p9_mareep_copito && ' + COPITO_FUERA },
			{ say: 'sobrina', text: 'Borla, junto al pozo, sin lana. Si traes Leche Mu-mu, dásela tú. A mí ya me conoce el truco.', cond: '!flag.p9_mareep_borla' },
			{ say: 'sobrina', text: 'Nube, en Kalos. Ruta 5, el huerto de la criadora. Con el Wooloo.', cond: '!flag.p9_mareep_nube' },
			{ say: 'sobrina', text: 'Algodón, con la silla puesta. Del revés. Habla con ella, que a mí no me escucha.', cond: '!flag.p9_mareep_algodon' },
			{ say: 'sobrina', text: 'Y la noche de Chispita. Ven cuando esté oscuro.', cond: '!flag.p9_mareep_chispita' },
			{ say: 'sobrina', text: 'Lo demás, hecho. Lo he puesto con una raya que sí es una raya.' },
		],

		// ----- Copito (o Nieve) en el lago del Monte Mortero -----
		p9_copito_lago: [
			{ text: 'Junto al lago negro suena un cencerro. Una vez. Luego otra, más cerca. En la orilla, pegada a la roca, hay una lucecita amarilla que tiembla y se refleja en el agua como una vela.' },
			{ if: COPITO_FUERA, then: [
				{ text: 'Es **Nieve**. La lana gris en las puntas, sin cencerro. Mira el lago como si estuviera buscando algo en el fondo. No se gira cuando llegas.' },
				{ if: LANA_PARTY, then: [
					{ text: 'Copito sale de su Poké Ball sin que la llames. Da tres pasos y bala. Un balido corto, nada especial. Nieve levanta la cabeza como si le hubieran tirado de una cuerda.' },
					{ text: 'Se encuentran a mitad de la orilla. Frente con frente. Las dos se encienden a la vez, *chss*, y por un segundo el lago entero es amarillo.' },
					{ text: 'Nieve se deja llevar. No hace falta más.' },
				], else: [
					{ text: 'No la conoces mucho. Ella a ti tampoco. Te acercas despacio, con la mano abierta, como hacía Don Aurelio.' },
					{ text: '{riolu} se sienta en la orilla, a dos pasos, y baja las orejas. No hace nada. Hace lo que hacía en el escalón del porche: estar.', cond: LUC },
					{ choice: [
						{ text: 'Rascarle detrás de la oreja izquierda. La derecha no.', then: [
							{ text: 'Nieve cierra los ojos. Suspira como suspiran las Mareep: con todo el cuerpo. Luego se apoya en tu pierna. Pesa más de lo que parece.' },
							{ say: 'rotom', text: 'Bzzt… La oreja izquierda. Lo de la carta. Te lo has acordado.' },
						] },
						{ text: 'Silbar bajito, como hacía Don Aurelio.', then: [
							{ text: 'Silbas mal. Silbas fatal. Pero Nieve levanta la cabeza igual, porque el silbido no importa: importa que alguien silbe.' },
						] },
					] },
					{ text: 'Cuando echas a andar hacia la salida, te sigue. No te mira. Te sigue.' },
				] },
			], else: [
				{ text: 'Es **Copito**. El lazo azul del cencerro está sucio de barro. Está sentada en la orilla, mirando el agua, con la luz de la cola encendida a medias, como quien deja una lámpara por si alguien vuelve tarde.' },
				{ text: 'Te ve. Se le enciende la cola del todo. Y no se mueve. Va a esperar a que llegues tú, como siempre.' },
				{ text: '{riolu} se adelanta y se sienta a su lado. Ninguno de los dos hace nada. Cuando dos saben esperar, esperan juntos.', cond: LUC },
				{ if: LANA_PARTY, then: [
					{ text: 'Tu Pokémon de lana sale de su Poké Ball y trota hasta la orilla. Copito la mira, la huele, y las dos se encienden a la vez. El lago se vuelve amarillo un segundo.' },
				] },
				{ choice: [
					{ text: 'Rascarle detrás de la oreja izquierda. La derecha no.', then: [
						{ text: 'Copito cierra los ojos. Apoya la cabeza en tu rodilla. Igual que en el porche, el día de la carta.' },
					] },
					{ text: 'Sentarte en la orilla, a su lado, un rato.', then: [
						{ text: 'Te sientas. El lago gotea. Arriba, muy lejos, el *hu… ha…* del Rey del Kárate. Copito no se mueve. Tú tampoco. Pasa el tiempo que tiene que pasar.' },
						{ text: 'Al rato, Copito se levanta ella sola y echa a andar hacia la salida. Se gira para ver si la sigues.' },
					] },
					{ text: '«Venga, Copito. En casa te esperan.»', then: [
						{ text: 'Copito te mira como se mira a alguien que no ha entendido nada. Luego se levanta, despacio, y echa a andar. Hacia casa. Porque se lo has pedido tú.' },
					] },
				] },
			] },
			{ set: { 'flag.p9_mareep_copito': true } },
			{ text: 'La sacas del monte por la senda del rancho. En la cancela, Adela está esperando con los brazos cruzados y la cara de quien no estaba esperando.' },
			{ say: 'sobrina', text: 'Ya. —Le mira la cola a la Mareep. La luz, firme—. Ya. Al establo. Y mañana, esquila. Para que se le quite lo de irse.' },
			{ quest: Q, stage: 'volver', cond: CINCO },
			{ toast: 'Lista de las cinco: Copito, hecho.' },
		],
		p9_copito_despues: [
			{ text: 'Junto al lago queda un trozo de lazo azul enganchado en la roca. Lo dejas ahí: una Mareep que se va al monte tiene que saber volver al sitio exacto.' },
		],

		// ----- Borla -----
		p9_borla_sin: [
			{ text: 'Borla está tumbada junto al pozo, con la lana corta y rala, mirando el cubo del pienso como si le debiera dinero. Cuando te acercas, cierra los ojos a propósito.' },
			{ say: 'sobrina', text: '—Desde el porche— Leche Mu-mu. Caliente. Y un rato sin decirle nada. En el huerto suele haber alguna, o en la cocina de cualquier granja.' },
			{ text: 'Borla abre un ojo para comprobar que te vas.' },
		],
		p9_borla_leche: [
			{ if: '!has("moomoomilk")', then: [{ call: 'p9_borla_sin' }, { end: true }] },
			{ text: 'Borla está tumbada junto al pozo, con la lana corta y rala. Sacas la Leche Mu-mu. No la mira. Lo huele. Las Mareep tristes no miran: huelen.' },
			{ take: 'moomoomilk', cond: 'has("moomoomilk")' },
			{ text: 'Le acercas la botella. Borla bebe despacio, con los ojos cerrados, como bebía Don Aurelio el café: sin prisa, porque el café no se acaba si no lo apuras.' },
			{ prompt: 'Borla termina la leche y se queda mirándote.', choice: [
				{ text: 'Sentarte a su lado sin decir nada.', then: [
					{ text: 'Te sientas. Borla se recuesta contra ti. Pasa un rato largo. Rotom intenta decir algo y se calla solo, que ya es mérito.' },
					{ text: 'Al cabo, Borla estira el cuello y te quita, con los dientes, un hilo suelto de la manga. Lo mastica. Lo escupe. Es su manera de dar las gracias: comerse algo que no debe.' },
				] },
				{ text: 'Contarle lo de Kalos: la jaula, el jaleo, la voltereta de {riolu}.', then: [
					{ text: 'Se lo cuentas. Lo de la Ruta 5, lo del espectáculo que no quería dejar, la voltereta de {riolu} que la convenció. Borla te mira con cara de que te estás inventando la mitad.' },
					{ text: '{riolu} hace la voltereta otra vez. Borla chisporrotea. Poco. Pero chisporrotea.', cond: LUC },
					{ text: 'A la mitad del cuento, Borla se ha quedado dormida. Con la lana, por primera vez en semanas, un poquito encendida.' },
				] },
			] },
			{ say: 'sobrina', text: '—Desde el porche, bajito— Mira. Mírala la lana. Se le está poniendo. —Pausa—. No se lo digas, que si se lo dices, se le quita.' },
			{ set: { 'flag.p9_mareep_borla': true } },
			{ quest: Q, stage: 'volver', cond: CINCO },
			{ toast: 'Lista de las cinco: Borla, hecho.' },
		],

		// ----- Nube y Bizcocho (Ruta 5, Kalos) -----
		p9_nube_bizcocho: [
			{ text: 'El huerto de la cerca rota. La cerca sigue rota, pero ahora hay dos ovejas dentro: un Wooloo de lana oscura y una Mareep con un cencerro que pone **NUBE**. Están a un metro. Se miran fijamente. Ninguna parpadea.' },
			{ text: 'Entre las dos, en el suelo, una zanahoria. Una sola. Se nota que llevan así desde la zanahoria.' },
			{ say: 'p9_margaux', text: '¿Tú eres {el|la|le} del rancho de Johto? Menos mal. Esta se bajó del camión de la lana con mucha dignidad, se metió en mi huerto como si fuera suyo y se puso a dormir en el sitio de Bizcocho. Bizcocho no lo ha llevado bien.' },
			{ say: 'p9_margaux', text: 'Dos días así. Ni comen ni se mueven. Yo les pongo la zanahoria en medio y las dos la miran como si la zanahoria fuera la culpable.' },
			{ if: 'beat("r5_criadora_margaux")', then: [
				{ say: 'p9_margaux', text: 'Y tú y yo ya nos conocemos, ¿eh? De hace unos meses. Bizcocho rodó muy fuerte y perdió igual. Ha crecido. Ya no llora. Ahora se enfada.' },
			] },
			{ prompt: 'Nube y Bizcocho no se mueven. ¿Qué haces?', choice: [
				{ text: 'Partir la zanahoria en dos y darle media a cada una.', then: [
					{ text: 'Partes la zanahoria. Le das media a Nube. Media a Bizcocho. Las dos miran su mitad, luego la del otro, luego a ti, con la misma cara: la de quien sospecha que le han dado la mitad pequeña.' },
					{ text: 'Comen a la vez, sin dejar de mirarse. Terminan a la vez. Y entonces, sin ponerse de acuerdo, se tumban las dos en el mismo sitio, pegadas, de espaldas.' },
					{ say: 'p9_margaux', text: 'Dos días. Dos días y era una zanahoria. —Se quita el sombrero y se abanica—. A veces los Pokémon son exactamente como la gente y me da una rabia…' },
				] },
				{ text: 'Sacar a tu Pokémon de lana para que hable con Nube.', cond: LANA_PARTY, then: [
					{ text: 'Tu Pokémon de lana sale de la Poké Ball, mira a Nube, mira a Bizcocho, mira la zanahoria. Suspira con todo el cuerpo. Luego se pone en medio, le da un cabezazo suave a Nube y otro a Bizcocho, y se come la zanahoria.' },
					{ text: 'Nube y Bizcocho se quedan tan sorprendidos que se olvidan de la pelea. Cuando se dan cuenta, ya están los tres pastando juntos.' },
					{ say: 'p9_margaux', text: '…Vaya. Eso ha sido diplomacia. Diplomacia de oveja. Me lo apunto.' },
				] },
				{ text: 'Que {riolu} se siente entre las dos.', cond: LUC, then: [
					{ text: '{riolu} entra en el huerto, se sienta entre las dos ovejas y cierra los ojos. No hace nada. Lo mismo que hizo con Borla en Kalos fue una voltereta. Esta vez no. Esta vez se queda quieto.' },
					{ text: 'A Nube se le apaga la luz de la cola, que la tenía encendida de puro enfado sin que nadie lo notara. A Bizcocho se le baja la lana del lomo. Dos minutos después están las dos dormidas, una a cada lado de {riolu}, que sigue sin abrir los ojos.' },
					{ say: 'p9_margaux', text: 'Si eso lo hiciera yo, cobraría. Tu Pokémon lo hace gratis. Qué desperdicio.' },
				] },
			] },
			{ say: 'p9_margaux', text: 'Llévatela cuando quieras. El camión de la lana pasa de vuelta por la tarde; le digo al chófer que te la lleve hasta la Puerta y de ahí al rancho. Él la conoce: fue el que la bajó.' },
			{ if: LUC, then: [
				{ text: '{riolu} le acerca el hocico a Bizcocho. Bizcocho, que no se deja tocar por nadie, se deja.' },
			] },
			{ choice: [
				{ text: '«¿Un combate, Margaux? Por los viejos tiempos.»', then: [
					{ say: 'p9_margaux', text: 'Por los viejos tiempos. Bizcocho ya no es un Wooloo, que lo sepas. —Mira a tu equipo—. Espera. ¿Vienes de viaje? Tengo Leche Mu-mu en la casa, de la buena. Primero curas, luego peleas. En mi huerto se pelea sano.' },
					{ choice: [
						{ text: 'Aceptar la leche.', then: [{ heal: 'Margaux te saca una jarra de Leche Mu-mu caliente y tu equipo bebe por turnos. Bizcocho mira la jarra con muy mala cara.' }] },
						{ text: '«Así estoy bien.»', then: [{ say: 'p9_margaux', text: 'Ni hablar. En mi huerto, sano. —Te pone la jarra en la mano.' }, { heal: 'Bebes la leche con todo el equipo. No había manera de decir que no.' }] },
					] },
					{ battle: 'p9_margaux', lose: 'continue',
						onWin: [{ say: 'p9_margaux', text: 'Bizcocho, cariño, lo hiciste muy bien. Rodaste fuerte. —A ti—. Toma. Para el viaje de la oveja. Y para ti.' }, { give: 'moomoomilk', n: 3 }],
						onLose: [{ say: 'p9_margaux', text: 'Así se defiende un huerto. Toma leche igual, que has perdido pero has venido de lejos.' }, { heal: 'Margaux te cura al equipo con otra jarra de leche. Esta vez Bizcocho la mira con orgullo.' }] },
				] },
				{ text: 'Despedirte.', then: [{ say: 'p9_margaux', text: 'Saluda a la veterinaria de mi parte. Y dile que la próxima vez que una oveja suya se baje en mi huerto, me la quedo. Es broma. Es medio broma.' }] },
			] },
			{ set: { 'flag.p9_mareep_nube': true } },
			{ say: 'rotom', text: '¡Bzzt! Nube vuelve a Johto por la tarde, en el camión de la lana. He avisado a Adela por mensaje. Me ha contestado «Bien». Solo eso. Es mucho, viniendo de ella.' },
			{ quest: Q, stage: 'volver', cond: CINCO },
			{ toast: 'Lista de las cinco: Nube, hecho.' },
		],
		p9_nube_despues: [
			{ text: 'El huerto de Margaux. Bizcocho pasta solo otra vez, pero duerme en el sitio donde dormía Nube. La cerca sigue rota. Margaux dice que ya no la arregla: «Por si vuelve».' },
		],

		// ----- Algodón -----
		p9_algodon: [
			{ text: 'Algodón está plantada en mitad del prado con una silla de montar puesta del revés, la cincha colgando y una expresión de absoluta seguridad. Cuando te ve, se agacha un poco. Como invitándote a subir.' },
			{ say: 'sobrina', text: '—Desde la cerca— Lleva así desde que vio pasar un Rhyhorn con jinete por la Ruta 42. La silla es de un Ponyta de una clienta. Se la puso ella sola. Del revés, pero sola.' },
			{ text: '{riolu} rodea a Algodón y mira la silla con cara de entender perfectamente el problema.', cond: LUC },
			{ if: 'flag.b05_ridegear', then: [
				{ say: 'rotom', text: 'Bzzt… El Ride Gear de Leilani funciona con monturas de verdad. Una Mareep no está en la lista. Lo he mirado dos veces. Lo siento, Algodón.' },
			] },
			{ prompt: 'Algodón te espera, agachada. ¿Qué haces?', choice: [
				{ text: 'Decirle la verdad, despacio: una Mareep no puede llevar a nadie encima.', then: [
					{ text: 'Te agachas a su altura. Le dices que no. Que no es por ella: es por el cuerpo. Que las Mareep son para otra cosa. Algodón te escucha con las orejas muy quietas.' },
					{ text: 'Luego se levanta, se sacude la silla, que cae al suelo con un golpe de cuero, y te da un cabezazo suave en la rodilla. No está triste. Está pensando.' },
					{ say: 'sobrina', text: 'Mira. Mírala. Le has dicho que no y se ha quedado. Yo le digo que no a la gente y se va. Tengo que aprender eso.' },
				] },
				{ text: 'Darle una vuelta al prado contigo al lado, a pie, con la silla puesta. Como si fuera montura.', then: [
					{ text: 'Caminas a su lado, muy seri{o|a|e}, con la mano en la silla del revés. Algodón levanta la cabeza y trota con un orgullo que no le cabe en la lana. Dan la vuelta al prado entera. Las otras cuarenta y ocho los miran.' },
					{ text: 'Al terminar, Algodón se sacude la silla ella sola. Ya está. Ya ha sido montura. Un día. Con eso le vale.' },
					{ say: 'sobrina', text: 'No sé si eso es mentirle o es otra cosa. —Pausa—. Es otra cosa. Va.' },
				] },
				{ text: 'Ponerle la silla del derecho, por lo menos.', then: [
					{ text: 'Le das la vuelta a la silla y le ajustas la cincha. No sirve para nada, pero por lo menos parece una silla. Algodón se mira de reojo y se le enciende la cola de satisfacción.' },
					{ text: 'Se pasa la tarde paseando por el prado con la silla del derecho, sin que nadie se suba, saludando a las demás. Adela dice que es la Mareep más feliz que ha visto en su vida y que no entiende nada.' },
				] },
			] },
			{ text: 'Antes de irte, Algodón se acerca y deja en tu mano un mechón de lana rizada. Lo da ella. Nadie se lo ha pedido.' },
			{ say: 'sobrina', text: 'Guárdalo. Lo voy a necesitar. Ya verás para qué.' },
			{ set: { 'flag.p9_mareep_algodon': true } },
			{ quest: Q, stage: 'volver', cond: CINCO },
			{ toast: 'Lista de las cinco: Algodón, hecho.' },
		],

		// ----- La noche con Chispita -----
		p9_chispita_dia: [
			{ say: 'sobrina', text: 'De día no. De día está bien; se asusta de noche, que es cuando entra alguien que no es él. Vuelve cuando esté oscuro. Te dejo el sofá, por si quieres esperar aquí.' },
		],
		p9_chispita_noche: [
			{ if: CHISPITA_FUERA, then: [
				{ text: 'Adela te deja el sombrero de Don Aurelio. El de ala ancha, el que llevaba en Kalos. Lo descuelga del clavo del porche y te lo pone en las manos sin decir nada.' },
				{ say: 'sobrina', text: 'Ahí dormía Chispita. Antes. —Se aclara la garganta—. Ponlo en el escalón. Y quédate. No sé qué espero. Él contaba hasta ella todas las noches y yo dejé de contar. Igual el rebaño lo nota. Igual lo noto yo.' },
				{ cutscene: { time: 'noche', bg: { type: 'ranch', ground: '#3a4a3a', far: '#1e2238' }, start: 'dark', frames: [
					{ item: 'cuadernoaurelio', cam: 'still', text: 'Te sientas en el escalón con el sombrero al lado, boca arriba, como una cuna vacía. El rancho se enciende poco a poco: cincuenta y pico lucecitas detrás del cristal del establo.' },
					{ on: false, color: '#ffe27a', cam: 'pan-right', fx: 'glow', text: 'Cuentas. Como él. Copito, Borla, Nube, Algodón… y te paras donde se paraba él. «Y Chispita no».' },
					{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.7, size: 's', enter: 'fade' }], cam: 'still', text: '{riolu} se sienta a tu lado y mira el sombrero. Luego mira la Ruta 42, hacia el oeste, hacia donde queda Kalos. Mucho rato.', cond: LUC },
					{ on: false, fx: 'sparkle', color: '#ffe27a', text: 'A medianoche, una Mareep del establo se separa de las demás, sale al prado y se enciende sola. Solo una. Se queda así un minuto, mirando la cancela, y vuelve a entrar.' },
					{ fx: 'iris-out', cam: 'still', text: 'Adela lo ha visto desde la ventana. No dice nada. Por la mañana, en el cuaderno del rancho, hay una línea nueva con su letra: «Contado hasta Chispita. Las 53».' },
				] } },
				{ diary: 'Esta noche mi entrenador{|a|e} y yo nos hemos sentado en el escalón del rancho Prado con un sombrero vacío. Hemos contado Mareep. Yo soy muy bueno contando; me paré en 52 porque mi entrenador{|a|e} se paró ahí, y a veces hay que pararse donde se para la gente.\n\nA medianoche una Mareep salió sola al prado y se encendió. No era Chispita. Pero se encendió en su sitio. ¡Bzzt! No sé cómo se apunta eso en un diario. Lo apunto así.', cond: 'flag.b01_diario' },
			], else: [
				{ text: 'El establo de noche huele a heno y a lana caliente. Cincuenta y dos Mareep duermen en montones, encendidas a medias, como brasas. En un rincón, encima de un sombrero de ala ancha, hay un bulto pequeño que tiembla.' },
				{ text: 'Es **Chispita**. Cuando la puerta cruje, se enciende de golpe, blanca, como un flash. Toda la fila del fondo se despierta y protesta.' },
				{ say: 'sobrina', text: '—Desde la puerta, en voz baja— Ya la ves. Así cada noche que entra alguien. Mi tío entraba y no pasaba nada. Yo entro y parece una comisaría. Siéntate ahí, cerca, y no hagas nada. Yo me voy a dormir. O a hacer que me duermo.' },
				{ cutscene: { time: 'noche', bg: { type: 'indoor', wall: '#6a4a30', floor: '#3a2a1a' }, start: 'dark', frames: [
					{ actors: [{ mon: 'mareep', key: 'chis', at: 0.65, size: 's', enter: 'none', dim: true }], cam: 'still', text: 'Te sientas en el heno, a tres pasos del sombrero. Chispita te mira con los ojos muy abiertos y la luz de la cola a tope. No se apaga. Tú tampoco te mueves.' },
					{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, size: 's', enter: 'fade' }], text: '{riolu} se tumba entre tú y ella, de lado, dándole la espalda a Chispita. Es lo contrario de vigilar. Es decirle «yo tampoco te miro».', cond: LUC },
					{ actors: [{ key: 'chis', dim: false, emote: '?' }], on: 'chis', fx: 'glow', color: '#ffe27a', text: 'Pasa una hora. La luz de Chispita baja a la mitad. Pasa otra. Baja a un cuarto. Cada vez que se mueve el heno, sube un poco y vuelve a bajar. Como una respiración.' },
					{ actors: [{ key: 'chis', at: 0.5, do: 'step' }], text: 'Mucho después, cuando ya casi te duermes, notas un peso en la rodilla. Chispita se ha bajado del sombrero. Está a tu lado. Encendida muy poco, lo justo para verle la cara.' },
					{ actors: [{ key: 'chis', emote: 'zzz' }], fx: 'iris-out', text: 'Te quedas dormid{o|a|e} así. Por la mañana, el sombrero está vacío y Chispita sigue en el mismo sitio. Adela, en la puerta, con dos tazas de café, no dice nada. Tarda un rato en decir nada.' },
				] } },
				{ say: 'sobrina', text: 'Dos tazas. —Te da una—. Hoy sí. Hoy las dos.' },
				{ diary: 'Esta noche hemos dormido en el establo del rancho Prado, con cincuenta y dos Mareep encendidas a medias y una, Chispita, encendida del todo. Yo intenté bajar mi brillo para no asustarla. Un Rotom no puede bajar su brillo. Lo intenté igual.\n\nAl final se bajó del sombrero y se durmió contra la rodilla de mi entrenador{|a|e}. ¡Bzzt! No la fotografié. Hay cosas que se apuntan y no se fotografían. Lo estoy aprendiendo.', cond: 'flag.b01_diario' },
			] },
			{ set: { 'flag.p9_mareep_chispita': true } },
			{ heal: true },
			{ quest: Q, stage: 'volver', cond: CINCO },
			{ toast: 'Lista de las cinco: Chispita, hecho.' },
		],

		// ----- El cierre: la Lana Eléctrica y la rosada -----
		p9_mareep_final: [
			{ text: 'Adela te espera en el escalón del porche. No tiene la lista. Tiene un ovillo en las manos: lana blanca que no es blanca del todo, con hebras de cinco blancos distintos, y que suelta chispitas cuando lo aprieta.' },
			{ say: 'sobrina', text: 'Informe final. Copito, en el establo. Borla, dando lana. Nube, en casa, sin camiones. Algodón, con la silla del derecho y sin jinete. Chispita… —Mira el prado—. Chispita, bien.' },
			{ say: 'sobrina', text: 'Y esto. —Te pone el ovillo en las manos—. Una hebra de cada una. Copito la dio al volver del monte; Borla, la primera que dio; Nube trajo una ramita de Kalos enganchada, se la dejé; la de Algodón te la dio ella, y la de Chispita me costó dos chispazos. Lo tejí con las agujas de mi tía. No las había tocado nadie.' },
			{ cutscene: { time: 'tarde', bg: { type: 'ranch', ground: '#8ab86a', far: '#c97a4a' }, start: 'dark', frames: [
				{ cam: 'push', item: 'p9_lanaelectrica', text: 'Un ovillo de lana que no se apaga. Lo aprietas. *Chss.* Chispitas amarillas, pequeñas, que te suben por los dedos sin hacer daño.' },
				{ actors: [{ key: '_c', do: 'bob' }], fx: ['glow', 'sparkle'], color: '#ffe27a', text: 'Huele a heno, a leche caliente y a tormenta lejana. Huele a la Ruta 5 de Kalos, a una jaula abierta de noche, a un anciano contando con los dedos.' },
				{ fx: 'light', text: 'Don Aurelio decía que la lana guarda lo que la Mareep siente cuando se la quitas. Adela decía que eso no es ciencia. El ovillo chispea en tu mano como si tuviera opinión.' },
			] } },
			{ give: 'p9_lanaelectrica' },
			{ say: 'sobrina', text: 'No vale nada. No se vende, no se gasta y no sirve para pelear, que te veo la cara. Es para que te acuerdes de que tienes cinco en Johto. En fila. Esperándote.' },
			{ text: 'Detrás de ella, del establo, sale trotando una Mareep pequeña. La lana no es blanca: es **rosa**, rosa pálido, como el algodón de azúcar de las ferias. Brilla un poco más que las demás.' },
			{ if: 'flag.b02_mareep_rosa', then: [
				{ say: 'sobrina', text: 'La hermana de la tuya. De la misma camada rosa. Nacieron dos y mi tío solo te contó una, porque a esta la escondió la vecina para quedársela y luego le dio vergüenza. Volvió al rancho el mes pasado.' },
			], else: [
				{ say: 'sobrina', text: 'Nació en la camada de primavera, el mes que mi tío se fue a Kalos. La crió la vecina. Rosa. En setenta años de rancho, él no vio una igual. Yo tampoco. No se separa de las cinco: ha decidido que es la sexta.' },
			] },
			{ if: LANA_OWNS, then: [
				{ say: 'sobrina', text: 'Tú ya tienes de las nuestras. Más de una, si no me equivoco, y no me equivoco. Mi tío no habría regalado dos veces lo mismo, y yo tampoco. Así que esta se queda. A vivir. Es suya la decisión y la ha tomado: duerme en la mecedora.' },
				{ text: 'La Mareep rosada se sube al porche, da dos vueltas sobre el asiento de la mecedora y se tumba hecha una bola. La mecedora se mueve un poco. Luego se para.' },
				{ say: 'sobrina', text: 'Ya se sienta alguien. —Lo dice bajito—. Él lo pidió en la carta. Pues ya está.' },
				{ set: { 'flag.p9_mareep_rosada_vive': true } },
				{ if: 'partner("p7_rancho")', then: [
					{ say: 'rotom', text: '¡Bzzt! Si quieres que trabaje en el rancho, puedes ponerla a trabajar desde Negocios como a cualquier Pokémon tuyo del PC… bueno, no es tuya. Pero puedes venir a verla. Lo he apuntado en el rancho: «La Mareep rosada».' },
				] },
			], else: [
				{ say: 'sobrina', text: 'Tú no tienes ninguna de las nuestras. Eso no puede ser. Mi tío no lo habría permitido y yo tampoco. —Señala a la rosada—. Ella ha decidido que la sexta es ella. Tú decides si viaja o se queda.' },
				{ choice: [
					{ text: 'Llevártela contigo.', then: [
						{ pokemon: { sp: 'mareep', lv: 40, shiny: true, nature: 'calm', ability: 'static', moves: ['thunderwave', 'discharge', 'cottonguard', 'powergem'], happy: 180 } },
						{ set: { 'flag.p9_mareep_rosada_contigo': true } },
						{ say: 'sobrina', text: 'Cuídamela. Y si evoluciona, foto. Yo sí me lo voy a creer.' },
					] },
					{ text: 'Que se quede en el rancho, con las cinco.', then: [
						{ say: 'sobrina', text: 'También se vale. Así vuelves. —La rosada se sube al porche, da dos vueltas y se tumba en la mecedora—. Mira. Ya se sienta alguien.' },
						{ set: { 'flag.p9_mareep_rosada_vive': true } },
					] },
				] },
			] },
			{ quest: Q, stage: 'hecha', done: true },
			{ rep: { johto: 2 } },
			{ intel: { npc: 'sobrina', text: 'Tejió la Lana Eléctrica con una hebra de cada una de las cinco Mareep de Kalos y las agujas de su tía. La Mareep rosada de la camada de primavera se ha quedado en el rancho como «la sexta».' } },
			{ diary: 'Hoy Adela le dio a mi entrenador{|a|e} un ovillo que chispea. Lo escaneé: lana de Mareep, cinco hebras, cero utilidad en combate, utilidad general: muy alta. No sé medir eso, pero lo he puesto así.\n\nEn el rancho Prado hay una Mareep rosa que se ha sentado en la mecedora. Don Aurelio pidió en su carta que se sentara alguien. ¡Bzzt! Creo que ya se puede tachar esa línea. Yo no la tacho. La subrayo.', cond: 'flag.b01_diario' },
			{ say: 'sobrina', text: 'Y ahora, café. Dos tazas. —Entra en la casa—. Y después, esquila. Que para algo has venido.' },
		],

		p9_rosada_visita: [
			{ text: 'La Mareep rosada está en la mecedora, hecha una bola, con la lana del color del algodón de azúcar. Abre un ojo cuando llegas. Lo cierra. Luego los dos. Luego se baja y te da un cabezazo en la rodilla.' },
			{ text: 'Las cinco de Kalos la miran desde el prado como se mira a la pequeña de la casa: con paciencia y sin ninguna autoridad.', cond: 'done.' + Q },
			{ if: LANA_PARTY, then: [
				{ text: 'Tu Pokémon de lana sale de la Poké Ball y las dos se encienden a la vez. La rosada, un poco más rosa. La tuya, un poco más amarilla. Luego se vuelven a apagar, como quien se ha dado los buenos días.' },
				{ happy: { who: 'party0', n: 3 } },
			] },
			{ say: 'sobrina', text: '—Desde el huerto— Déjala, que se vuelve a subir. Esa mecedora ya tiene dueña.' },
		],

		// ----- Rama Lemnis: una Mareep perdida (sin misión) -----
		p9_mareep_lemnis: [
			{ set: { 'flag.p9_mareep_lemnis': true } },
			{ text: 'Fuera de la cerca blanca, junto a la placa azul, hay una Mareep sola. Pasta muy despacio. No chisporrotea. Cuando te acercas no se asusta: te mira como quien mira pasar un coche.' },
			{ text: 'Lleva un cencerro de latón. Pone **NUBE**.' },
			{ say: 'rotom', text: 'Bzzt… Nube. La dormilona. La que encontramos entre las flores altas de Kalos. Está… tranquila. Muy tranquila. Como las demás.' },
			{ text: '{riolu} le acerca el hocico. Nube ni parpadea. {riolu} retira la cabeza y mira la placa azul con las orejas bajas.', cond: LUC },
			{ choice: [
				{ text: 'Rascarle detrás de la oreja izquierda. La derecha no.', then: [
					{ text: 'Le rascas. Tarda en reaccionar. Luego, muy despacio, cierra los ojos y se apoya en tu pierna, y por un segundo, solo uno, se le enciende la punta de la cola. Débil. Pero se enciende.' },
					{ say: 'rotom', text: '¡Se ha encendido! Bzzt… Poco. Pero se ha encendido. Lo apunto.' },
				] },
				{ text: 'Llevarla dentro de la cerca sin más.', then: [
					{ text: 'La empujas suavemente hacia la cancela. Va. No protesta. No se alegra. Va.' },
				] },
			] },
			{ text: 'Adela sale de la casa con el maletín. Ve a Nube. Ve la cancela abierta. No pregunta cómo salió.' },
			{ say: 'sobrina', text: 'Los martes, cuando se van los de las bolsas azules, siempre hay una fuera. Nunca la misma. Nunca se van lejos. Se quedan ahí, junto a la placa, como si esperaran el camión. —Pausa—. Gracias. Toma, de la cocina. Y vete antes de que vuelvan, que preguntan mucho.' },
			{ give: 'moomoomilk', n: 2 },
			{ say: 'sobrina', text: 'Y una cosa. Los contratos se acaban. Ese día sí te voy a llamar. Lo dije y lo mantengo.' },
			{ intel: { npc: 'sobrina', text: 'Con la Fundación en el rancho, los martes siempre aparece una Mareep fuera de la cerca, junto a la placa azul, demasiado tranquila. Nunca la misma.' } },
		],

		// =================== BASTIEN: LA DEFINITIVA ===================
		p9_bastien_intro: [
			{ if: 'flag.b05_bastien_rompe', then: [
				{ text: 'Bastien está sentado en el muro del Paseo con los pies colgando sobre la arena. Sin chaqueta. Camisa blanca con las mangas subidas, la libreta abierta en las rodillas y la insignia de hojalata de Froakie, sin logo, prendida en el bolsillo.' },
				{ say: 'bastien', text: '{jugador}. —No se levanta. Da una palmada en el muro, a su lado—. Siéntate. Estoy mirando el mar. Es mío. Me lo dije a mí mismo en una nota y las notas hay que cumplirlas.' },
				{ say: 'bastien', text: 'Aquí abajo, en la arena, había un Wimpod. Salía corriendo cada vez que me acercaba. Tres días. Al cuarto se quedó. No sé por qué. Yo tampoco sé por qué me quedé yo.' },
			], else: [
				{ text: 'Bastien está en el pasillo de la Unidad, de pie, sin cables. La chaqueta de Lemnis puesta, pero desabrochada. Libreta en la mano. Cuando te ve, la cierra con un dedo dentro, para no perder la página.' },
				{ say: 'bastien', text: '{jugador}. Me dejan salir al jardín dos horas al día. «Ejercicio del sujeto». Lo apunto cada vez: hora de salida, hora de entrada. Soy mi propio portero.' },
				{ say: 'bastien', text: 'En el jardín había un Wimpod, debajo de un banco. Salía corriendo cada vez que alguien pasaba. Me senté a leer el contrato en voz alta y, al tercer día, se quedó. Creo que le aburrí tanto que se quedó. Ya es Golisopod. Sigue huyendo cuando le va mal. Lo admiro.' },
			] },
			{ say: 'bastien', text: 'Tengo seis. Por primera vez. Y tengo una página que lleva un título y nada debajo. —Te la enseña: «La definitiva»—. No es una revancha. Las revanchas son de la página de antes. Esta es la que cuenta.' },
			{ say: 'bastien', text: 'Seis contra seis. Con todo lo que tengamos. Sin cláusulas, sin informes, sin que nadie mire. Después de esto, da igual quién gane: la página se cierra y empieza otra. Pero quiero saber qué pongo debajo del título.' },
			{ quest: QB, stage: 'inicio' },
			{ choice: [
				{ text: '«Vamos.»', then: [{ call: 'p9_bastien_combate' }] },
				{ text: '«Dame un rato, Bastien.»', then: [{ say: 'bastien', text: 'Lo apunto como pendiente. Pendiente tuyo. Aquí sigo. El mar no se va. —Pausa—. Yo tampoco. Esta vez no.' }] },
			] },
		],
		p9_bastien_revancha: [
			{ say: 'bastien', text: '¿Ahora sí? La página sigue abierta. Debajo del título no he escrito nada todavía.' },
			{ call: 'p9_bastien_combate' },
		],
		p9_bastien_combate: [
			{ prompt: '¿Curar al equipo antes de la definitiva?', choice: [
				{ text: 'Sí. Es la definitiva.', then: [
					{ heal: 'Bastien saca de la mochila Hiperpociones y Restaurar Todo, de los buenos: «Mis padres me mandan cajas. Nunca los uso. Hoy sí». Tu equipo queda como nuevo.', cond: 'flag.b05_bastien_rompe' },
					{ heal: 'La enfermera de la clínica cura a tu equipo sin apartar la vista de la tele. A Bastien, de paso, le toma el pulso. «Normal. Qué raro», dice ella. Él se encoge de hombros.', cond: 'flag.b05_bastien_sigue' },
				] },
				{ text: 'Así estoy bien.', then: [
					{ say: 'bastien', text: 'Insisto. Cláusula mía, la única que me queda. —Te pone un Restaurar Todo en la mano—. Seis contra seis enteros, o no cuenta.' },
					{ heal: 'Curas a tu equipo con lo que te da Bastien.' },
				] },
			] },
			{ text: 'Bastien se pone de pie. Se toca la muñeca: lleva una pulsera negra, sencilla, con una piedra que no habías visto nunca. Se da cuenta de que la miras.' },
			{ say: 'bastien', text: 'Mis padres. Me la regalaron el día que firmé. «Para que ganes». Nunca la usé con ellos mirando. Nunca la usé con nadie mirando. Hoy la uso contigo, que no estás mirando: estás jugando.' },
			{ battle: 'p9_bastien_6', lose: 'continue',
				onWin: [
					{ text: 'Greninja vuelve a su forma de siempre, despacio, como quien se quita una chaqueta. Bastien se sienta en el suelo. Abre la libreta. Escribe. Tarda.' },
					{ say: 'bastien', text: '«Perdí. Seis contra seis. Sin cláusulas.» —Lo lee en voz alta—. Y debajo: «Fue mío». Ya está. Ya tiene algo debajo del título.' },
					{ call: 'p9_bastien_greninjita' },
				],
				onLose: [
					{ say: 'bastien', text: 'Gané. —Lo apunta. Mira la página—. «Gané la definitiva». Pues no. No se siente definitivo. Se siente a medias. —Cierra la libreta—. Cuando quieras, otra. La página sigue abierta hasta que uno de los dos la cierre bien.' },
					{ heal: 'Bastien te cura al equipo con lo que le queda en la mochila. «Sin cláusulas», dice. «Pero con pociones».' },
					{ quest: QB, stage: 'revancha' },
				] },
		],
		p9_bastien_greninjita: [
			{ text: 'Bastien se quita la pulsera negra. Saca la piedra con la uña: una esfera pequeña, azul y negra, con un remolino dentro que se mueve cuando la giras.' },
			{ cutscene: { time: 'tarde', bg: { type: 'coast', far: '#7fc4d8', ground: '#e9d8a6' }, start: 'dark', frames: [
				{ actors: [{ id: 'bastien', at: 'left' }], on: '_c', item: 'greninjite', cam: 'push', text: 'Una Greninjanita. La piedra que su familia compró el día del contrato. La única cosa de aquel día que se quedó él.' },
				{ actors: [{ mon: 'greninja', key: 'gre', at: 0.72, size: 'm', enter: 'fade' }], cam: 'still', text: 'Greninja la mira. Luego mira a Bastien. Luego a ti. Hace un gesto con la cabeza que en un Greninja es casi un encogerse de hombros.' },
				{ fx: ['glow', 'sparkle'], on: '_c', color: '#5aa8d8', text: 'La piedra brilla un segundo entre los dedos de Bastien. Luego se apaga. Como si ya hubiera hecho lo que tenía que hacer.' },
			] } },
			{ if: 'flag.b05_bastien_rompe', then: [
				{ say: 'bastien', text: 'Toma. Es tuya. No la necesito. —La dice despacio, como una frase que lleva tiempo ensayando—. La compraron para que ganara con la chaqueta puesta. Me he quitado la chaqueta. Lo que gane a partir de ahora lo gano sin ella: la piedra y la chaqueta.' },
				{ say: 'bastien', text: 'Greninja está de acuerdo. Lo hemos hablado. Bueno, yo hablé y él me miró, pero es lo que hace cuando está de acuerdo.' },
				{ if: 'flag.b01_bastien_cubierto', then: [
					{ say: 'bastien', text: 'Me cubriste en una cueva, delante de todo el mundo, sin que te lo pidiera. —Se ríe, un poco—. Pues esto es lo mismo, al revés. No me lo pidas. Lo hago igual.' },
				], else: [
					{ say: 'bastien', text: 'En aquella cueva no me cubriste. Me enfadé mucho tiempo. Luego me di cuenta de que fue la primera vez que alguien me dejó cargar con lo mío. —Te pone la piedra en la mano—. Esto es lo mismo. Carga tú con ella ahora.' },
				] },
			], else: [
				{ say: 'bastien', text: 'Toma. Es tuya. No la necesito. —Mira el pasillo de la Unidad, las puertas, las cámaras—. Aquí dentro no me dejan usarla: «variable no controlada». Fuera no sé cuándo voy a estar. Y una piedra que no se usa es una piedra que alguien acaba inventariando.' },
				{ say: 'bastien', text: 'Prefiero que la lleve alguien que la va a usar sin pedir permiso a nadie. Greninja también lo prefiere. Me lo ha dicho con la cara.' },
				{ if: 'flag.b01_bastien_cubierto', then: [
					{ say: 'bastien', text: 'Tú me cubriste una vez. Yo te dejo esto. No es lo mismo, ya lo sé. Pero es lo que tengo que no sea de ellos.' },
				], else: [
					{ say: 'bastien', text: 'En aquella cueva te quedaste mirando. Todavía me acuerdo. Pero también me acuerdo de que en Æther estabas delante cuando decidí. Pues ahora decido otra cosa: la piedra, tú. Yo, los ojos abiertos. Cada uno con lo suyo.' },
				] },
			] },
			{ give: 'greninjite' },
			{ set: { 'flag.p9_bastien_final': true } },
			{ quest: QB, stage: 'hecha', done: true },
			{ if: 'owns("greninja") || owns("frogadier") || owns("froakie")', then: [
				{ say: 'bastien', text: 'Y tienes a quién dársela. Lo sé. Lo he visto en tu equipo alguna vez. —Sonríe de lado—. Dale recuerdos del mío. Que no es mejor. Pero es el mío.' },
			], else: [
				{ say: 'bastien', text: 'Ya sé que no tienes un Greninja. Da igual. Un día tendrás uno, o conocerás a alguien que lo tenga, o la guardarás en un cajón y la mirarás. Las tres cosas valen. Lo importante es que no esté en un inventario.' },
			] },
			{ say: 'bastien', text: 'Página nueva. —La pasa—. Arriba pongo tu nombre. Debajo no pongo nada. Ya lo iremos escribiendo.' },
			{ intel: { npc: 'bastien', text: 'Perdió «la definitiva» (seis contra seis, con Mega-Greninja) y te dio su Greninjanita: la pulsera y la piedra se las compraron sus padres el día del contrato y nunca las usó delante de nadie. Su sexto Pokémon es un Golisopod que recogió de Wimpod.' } },
			{ diary: 'Hoy mi entrenador{|a|e} ha jugado «la definitiva» contra Bastien. Seis contra seis. ¡Su Greninja se hizo enorme y oscuro un rato! Luego volvió a su tamaño y Bastien se sentó en el suelo a escribir.\n\nNos ha dado una Greninjanita. Dijo que ya no la necesita. Yo creo que sí la necesitaba y por eso la ha dado; las personas hacen eso a veces y no me cuadra. ¡Bzzt! Lo apunto igual. Como él.', cond: 'flag.b01_diario' },
		],
		p9_bastien_despues: [
			{ if: 'flag.b05_bastien_rompe', then: [
				{ say: 'bastien', text: 'Sigo aquí. El mar sigue siendo mío. —Levanta la libreta—. Página nueva con tu nombre arriba. Todavía en blanco. No tengo prisa: es la primera vez que no tengo prisa.' },
				{ text: 'Golisopod asoma la cabeza por detrás del muro, te ve y se vuelve a esconder. Bastien ni se gira: «Lo hace con todo el mundo. Es su forma de saludar».' },
			], else: [
				{ say: 'bastien', text: 'Dos horas de jardín al día. Las uso para leer el contrato otra vez, por si se me escapó algo. —Baja la voz—. Se me escapan cosas a propósito. Para tener algo que leer mañana.' },
				{ text: 'Golisopod está debajo del banco del jardín, con la cabeza asomada, vigilando el pasillo. Cuando pasa alguien con bata, se mete del todo.' },
			] },
			{ say: 'bastien', text: '¿La piedra? Tuya. No preguntes más. Lo apunté y lo que se apunta no se devuelve.' },
		],

		// =================== EL BUZÓN DEL ÁTICO ===================
		p9_buzon_vacio: [
			{ text: 'El buzón de latón de la puerta de tu cuarto. Philippe lo encontró en un anticuario y jura que es «de época». No dice de qué época. Lo abres: vacío.' },
			{ say: 'rotom', text: 'Nada hoy. Bzzt… Las cartas llegan cuando la gente tiene algo que decir. Te avisaré con un punto en la puerta.' },
		],
		p9_buzon_cartas: [
			{ text: 'El buzón de latón de la puerta. Al tocarlo suena a hueco con algo dentro: papel. Philippe no lo abre nunca; dice que un buzón ajeno es «un secreto con ranura».' },
			{ say: 'rotom', text: '¡Bzzt! ¡Correo! Lo he olido antes de que llegaras. No huelo, pero lo he olido.' },
			// Cada carta se entrega una sola vez; se leen en el momento, en hoja de papel.
			{ if: PENDIENTE(CARTAS[0]), then: [
				{ set: { 'flag.p9_carta_noa': true } },
				{ text: 'Un sobre gris, de empresa, con el logo tachado a bolígrafo. Matasellos de Ciudad Celeste. Sin remite. No hace falta: las íes del sobre llevan un puntito muy gordo.' },
				{ give: 'p9_carta_noa' },
				{ read: 'p9_carta_noa' },
				{ text: 'Le das la vuelta a la hoja. En la esquina, pequeño, un número: **24**. Lo vuelves a doblar igual que estaba.' },
				{ say: 'rotom', text: 'Veinticuatro. Bzzt… Ya sé contar. Ella también.', cond: 'flag.b05_nota_noa' },
				{ say: 'rotom', text: 'Veinticuatro. No sé qué cuenta. Pero lo guardo.', cond: '!flag.b05_nota_noa' },
			] },
			{ if: PENDIENTE(CARTAS[1]), then: [
				{ set: { 'flag.p9_carta_rhi': true } },
				{ text: 'Una postal de un volcán doblada por la mitad y metida en un sobre. En el sobre, con letra grande: «ESTO ES UNA CARTA, NO UNA POSTAL. Rhi».' },
				{ give: 'p9_carta_rhi' },
				{ read: 'p9_carta_rhi' },
				{ af: { rhi: 2 } },
				{ say: 'rotom', text: '«Golazo por adelantado». Bzzt… Lo he archivado en la carpeta «Rhi», que ya tiene bastantes exclamaciones.' },
			] },
			{ if: PENDIENTE(CARTAS[2]), then: [
				{ set: { 'flag.p9_carta_lila': true } },
				{ text: 'Un sobre crema con un lazo rosa muy fino atado alrededor. Se desata sin romper nada. Dentro, una carta y, pegado a la carta, un hilo de cinta rosa que no es tela.' },
				{ give: 'p9_carta_lila' },
				{ read: 'p9_carta_lila' },
				{ af: { lila: 2 } },
				{ text: '{riolu} huele el sobre y se le levantan un poco las orejas. Olor a parqué encerado y a Sylveon.', cond: LUC },
			] },
			{ if: PENDIENTE(CARTAS[3]), then: [
				{ set: { 'flag.p9_carta_kaori': true } },
				{ text: 'Una bolsita de papel de botica cerrada con una grapa. Cuando la abres, cae una flor de lavanda seca. Dentro, una hoja cuadriculada.' },
				{ give: 'p9_carta_kaori' },
				{ read: 'p9_carta_kaori' },
				{ say: 'rotom', text: 'He analizado la lavanda. No lleva nada. Bzzt… Lo he comprobado dos veces. La tercera, por costumbre.' },
			] },
			{ if: PENDIENTE(CARTAS[4]), then: [
				{ set: { 'flag.p9_carta_adela': true } },
				{ text: 'Papel de estraza, sellos de Johto torcidos, remite «A. Prado · Ruta 42». El mechón de lana pegado con celo es, esta vez, de cinco blancos distintos.' },
				{ give: 'p9_carta_adela' },
				{ read: 'p9_carta_adela' },
				{ say: 'rotom', text: '«Contesta viniendo». Bzzt… He puesto el rancho Prado en la lista de viajes. No me lo has pedido. Lo he hecho igual.' },
			] },
			{ if: PENDIENTE(CARTAS[5]), then: [
				{ set: { 'flag.p9_carta_lucien': true } },
				{ text: 'Un sobre de los de la libreta de portero, con tres trozos de cinta y una pegatina de Chespin. Fuera, con letra de niño: «ABRIR SOLO CUANDO ME HAYA IDO DE VIAJE». Lo abres.' },
				{ give: 'p9_carta_lucien' },
				{ read: 'p9_carta_lucien' },
				{ text: 'Rotom no dice nada. La pantalla se queda encendida un rato, en blanco, con un puntito parpadeando donde iría la hora.' },
			] },
			{ text: 'Cierras el buzón. La tapa de latón suena a hueco. Hasta la próxima.' },
		],
	},
};
