// Pasada 9 (2026-10-28) · T10: Megas y cristales Z con historia, en zonas ya jugadas.
//   p9_s_alakazamita  Ciudad Azafrán (gym_azafran). Sabrina y la prueba de los tres espejos. Alakazamita.
//                     Exhibición opcional contra su Alakazam (Mega). Flags: p9_espejos_1, p9_alakazamita.
//   p9_s_chandelurita Pueblo Lavanda, de noche. Dolores (p7_dolores) y el Señor Fuji (fuji): la vela que no se apaga
//                     en el sótano de la vieja Torre. Chandelurita. Flags: p9_vela_1, p9_chandelurita.
//   p9_s_snorlium     Paseo Marítimo de Hauoli. Festival de la malasada con Kaudan; concurso de comer con tu Snorlax
//                     y exhibición contra el Snorlax de Tutu Moana. Snorlastal Z. Flags: p9_fest_1, p9_fest_comido, p9_snorlium.
//   p9_s_incinium     Área Volcánica del Wela. Kiawe enseña la danza del lariat a tu Litten/Torracat/Incineroar;
//                     el cristal se entrega con Incineroar en el equipo. Incinostal Z. Flags: p9_danza_1, p9_incinium.
// Todo con `new` (zonas ya visitadas). Ningún texto visible adelanta nada de bloques futuros.

const LUC = '(inParty("riolu") || inParty("lucario"))';
const ALK_OWNS = '(owns("alakazam") || owns("kadabra"))';
const ALK_PARTY = '(inParty("alakazam") || inParty("kadabra"))';
const CHAND_OWNS = '(owns("chandelure") || owns("lampent") || owns("litwick"))';
const CHAND_PARTY = '(inParty("chandelure") || inParty("lampent") || inParty("litwick"))';
const CAT_OWNS = '(owns("incineroar") || owns("torracat") || owns("litten"))';
const CAT_CRIA = '(inParty("torracat") || inParty("litten"))';
const Z = 'has("zring")';

export default {
	locations: {},
	ventures: {},

	// =====================================================================
	// SPOTS EN LUGARES DEL B5 (Alola)
	// =====================================================================
	extraSpots: {
		paseo_hauoli: [
			{ label: 'Festival de la malasada', sub: 'Una mesa larga, bandejas hasta el muelle y Kaudan presidiendo', icon: '🍩',
				cond: Z + ' && owns("snorlax") && !flag.p9_snorlium',
				new: '!flag.p9_fest_1 || inParty("snorlax")',
				talk: [
					{ cond: 'inParty("snorlax")', script: 'p9_fest_concurso' },
					{ script: 'p9_fest_intro' },
				] },
			{ label: 'Kaudan, con la mesa vacía', sub: 'Se sacude el azúcar de la camisa', icon: '🍩', cond: 'flag.p9_snorlium', talk: [{ script: 'p9_fest_despues' }] },
		],
		area_wela: [
			{ label: 'Kiawe, en el borde del cráter', sub: 'Marca un compás nuevo con el talón. Más lento', icon: '🔥',
				cond: 'flag.b05_kiawe_hecha && ' + Z + ' && ' + CAT_OWNS + ' && !flag.p9_incinium',
				new: '!flag.p9_danza_1 || inParty("incineroar")',
				talk: [
					{ cond: 'inParty("incineroar")', script: 'p9_danza_incineroar' },
					{ cond: CAT_CRIA, script: 'p9_danza_cria' },
					{ script: 'p9_danza_traer' },
				] },
			{ label: 'Kiawe (exhibición)', sub: 'Quiere ver el cristal en combate', icon: '🔥', cond: 'flag.p9_incinium && !beat("p9_kiawe_z")', new: '!flag.p9_kiawe_z_visto',
				talk: [{ script: 'p9_kiawe_reto' }] },
		],
	},

	// =====================================================================
	// PARCHES A LUGARES DEL B4 (Kanto)
	// =====================================================================
	patches: {
		gym_azafran: {
			spots: [
				{ label: 'Los tres espejos', sub: 'Sabrina los ha puesto frente a su silla. No estaban', icon: '🪞',
					cond: 'flag.b04_fin && flag.b04_sabrina_eco && ' + ALK_OWNS,
					new: '!flag.p9_espejos_1 || (!flag.p9_alakazamita && ' + ALK_PARTY + ') || (flag.p9_alakazamita && !beat("p9_sabrina_mega") && !flag.p9_alk_reto_visto)',
					talk: [
						{ cond: '!flag.p9_espejos_1', script: 'p9_alk_inicio' },
						{ cond: '!flag.p9_alakazamita && ' + ALK_PARTY, script: 'p9_alk_tercero' },
						{ cond: '!flag.p9_alakazamita', script: 'p9_alk_espera' },
						{ cond: '!beat("p9_sabrina_mega")', script: 'p9_alk_reto' },
						{ script: 'p9_alk_despues' },
					] },
			],
		},
		lavanda: {
			spots: [
				{ label: 'Dolores, despierta a deshora', sub: 'Cose a la luz de una farola. Remiendo no duerme', icon: '🕯️',
					cond: 'night && flag.b04_lavanda_llegada && ' + CHAND_OWNS + ' && !flag.p9_vela_1',
					new: 'true',
					talk: [{ script: 'p9_vela_dolores' }] },
				{ label: 'Dolores y Remiendo, dormidos en el banco', sub: 'La aguja clavada en el cojín. Por fin', icon: '🧵',
					cond: 'night && flag.p9_chandelurita && !flag.p9_vela_fin', new: 'true',
					talk: [{ script: 'p9_vela_fin' }] },
			],
		},
		casa_fuji: {
			spots: [
				{ label: 'Señor Fuji, con un candelero en las manos', sub: 'Lo frota con la manga sin darse cuenta', icon: '🕯️',
					cond: 'quest.p9_s_chandelurita == "fuji"', new: 'true',
					talk: [{ script: 'p9_vela_fuji' }] },
			],
		},
		sotano_torre: {
			spots: [
				{ label: 'Una vela que no se apaga', sub: 'En un nicho sin nombre, al fondo del pasillo', icon: '🕯️',
					cond: 'quest.p9_s_chandelurita == "sotano"',
					new: 'night && ' + CHAND_PARTY,
					talk: [
						{ cond: 'night && ' + CHAND_PARTY, script: 'p9_vela_escena' },
						{ cond: 'night', script: 'p9_vela_sin' },
						{ script: 'p9_vela_dia' },
					] },
				{ label: 'El nicho de la vela', sub: 'Ahora hay velas nuevas en todos los nichos', icon: '🕯️', cond: 'flag.p9_chandelurita', new: '!flag.rec_p9_velas_sotano',
					action: { gather: 'p9_velas_sotano' } },
			],
		},
	},

	// =====================================================================
	// MISIONES
	// =====================================================================
	quests: {
		p9_s_alakazamita: { name: 'Los tres espejos', type: 'side', est: 25, stages: {
			espejos: 'Sabrina ha puesto tres espejos en el **Gimnasio de Azafrán**. Mira en ellos lo que te pida. El tercero no es para ti.',
			traer: 'El tercer espejo es para tu **Alakazam** (o tu Kadabra). Llévalo en el equipo al **Gimnasio de Azafrán** y vuelve a hablar con Sabrina.',
			hecha: 'Tu Pokémon vio la piedra antes que tú. La **Alakazamita** es tuya. Sabrina sigue en su silla; si quieres, le pides una exhibición.',
		} },
		p9_s_chandelurita: { name: 'La vela que no se apaga', type: 'side', est: 30, stages: {
			fuji: 'Dolores dice que en el sótano de la vieja Torre hay una vela que no se apaga y que a Remiendo le quita el sueño. Pregunta al **Señor Fuji**, en la **Casa Pokémon** de Lavanda.',
			sotano: 'El Señor Fuji te dio el candelero. Baja al **sótano de la vieja Torre** (Torre Radio de Lavanda) **de noche**, con tu **Chandelure** (o Lampent o Litwick) en el equipo.',
			hecha: 'Tu Pokémon adoptó la llama. Dentro había una **Chandelurita**. Las velas del sótano vuelven a ser velas: Remiendo ya duerme.',
		} },
		p9_s_snorlium: { name: 'Festival de la malasada', type: 'side', est: 25, stages: {
			traer: 'Kaudan preside un concurso de comer malasadas en el **Paseo Marítimo de Hauoli**. Inscribe a tu **Snorlax**: llévalo en el equipo y habla con Kaudan.',
			comer: 'Tu Snorlax está en la mesa del **Paseo Marítimo de Hauoli**. Marca el ritmo. Si hay empate, Kaudan lo resuelve a su manera.',
			hecha: 'Tu Snorlax ganó el festival. Kaudan te dio el **Snorlastal Z**: con Gigaimpacto y la Pulsera Z, un movimiento Z solo suyo.',
		} },
		p9_s_incinium: { name: 'La danza del lariat', type: 'side', est: 25, stages: {
			traer: 'Kiawe quiere enseñar un paso a tu Litten, Torracat o Incineroar. Llévalo en el equipo al **borde del cráter** del **Área Volcánica del Wela**.',
			volver: 'Tu gato ya sabe los pasos, pero el cristal es de **Incineroar**. Cuando evolucione, vuelve con él en el equipo al **Área Volcánica del Wela** y busca a Kiawe.',
			hecha: 'Tu Incineroar bailó con Kiawe en el borde del cráter. El **Incinostal Z** es suyo: con Lariat Oscuro y la Pulsera Z, un movimiento Z propio.',
		} },
	},

	// =====================================================================
	// ENTRENADORES (todos opcionales, con curación antes)
	// =====================================================================
	trainers: {
		p9_sabrina_mega: { name: 'Sabrina', cls: 'Líder', npc: 'sabrina', ai: 4, iv: 28, reward: 5800, terrain: 'gym', bg: 'gym', gimmick: 'mega', ace: 'alakazam',
			team: [
				{ sp: 'mrmime', lv: 56, moves: ['psychic', 'dazzlinggleam', 'reflect', 'lightscreen'], ability: 'filter', item: 'lightclay', nature: 'bold' },
				{ sp: 'espeon', lv: 57, moves: ['psychic', 'dazzlinggleam', 'morningsun', 'calmmind'], ability: 'magicbounce', item: 'leftovers', nature: 'timid' },
				{ sp: 'alakazam', lv: 58, moves: ['psychic', 'focusblast', 'shadowball', 'recover'], ability: 'synchronize', item: 'alakazite', nature: 'timid', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Ya sé cómo acaba. No te lo voy a decir: estropea el combate.',
			win: 'Acababa así. Lo sabía. —Una pausa—. No siempre me alegro de tener razón. Hoy sí.',
			lose: 'Acababa así. También lo sabía. Vuelve: lo que veo cambia cuando cambias tú.' },
		p9_tutu_snorlax: { name: 'Tutu Moana', cls: 'Malasadera', ai: 2, iv: 24, reward: 2600, terrain: 'city', bg: 'coast',
			look: { hair: 'bun', hairColor: '#e9e8e0', eyes: '#3a2a1e', outfit: '#e98a6a', outfit2: '#f2c84a', skin: 4, eyesStyle: 'happy', mouth: 'grin', acc: 'flower' },
			team: [
				{ sp: 'snorlax', lv: 55, moves: ['bodyslam', 'crunch', 'rest', 'highhorsepower'], ability: 'thickfat', item: 'leftovers', nature: 'careful' },
			],
			intro: 'Puka, cariño, enséñale a este Snorlax quién lleva treinta años comiéndose las que se caen al suelo.',
			win: 'Ay, Puka. Te has quedado dormido en el mejor momento. Como siempre. Como yo.',
			lose: 'Eso es, Puka. Ahora la siesta. Te la has ganado. Y tú, cariño, vuelve mañana, que la mesa no se quita.' },
		p9_kiawe_z: { name: 'Kiawe', cls: 'Capitán', npc: 'kiawe', ai: 4, iv: 28, reward: 5000, bg: 'mountain', gimmick: 'z', ace: 'marowakalola',
			team: [
				{ sp: 'turtonator', lv: 57, moves: ['flamethrower', 'dragonpulse', 'bodypress', 'shelltrap'], ability: 'shellarmor', item: 'sitrusberry', nature: 'modest' },
				{ sp: 'arcanine', lv: 57, moves: ['flareblitz', 'extremespeed', 'crunch', 'wildcharge'], ability: 'intimidate', nature: 'adamant' },
				{ sp: 'marowakalola', lv: 58, moves: ['flareblitz', 'shadowbone', 'bonemerang', 'willowisp'], ability: 'lightningrod', item: 'firiumz', nature: 'adamant', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Un cristal no se entiende hasta que lo ves arder enfrente. Mira el mío. Luego enséñame el tuyo.',
			win: 'Dos fuegos en el mismo escenario y ninguno se ha apagado. Eso casi nunca pasa.',
			lose: 'Te ha quemado el mío. Pasa. Mañana baila mejor. El fuego también.' },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		p9_candelero: { name: 'Candelero de los sin nombre', pocket: 'key', desc: 'Un candelero de latón, bajo y pesado, con un asa gastada por una sola mano. Era de los monjes de la vieja Torre Pokémon de Lavanda. El Señor Fuji te lo prestó para una vela que no se apaga.' },
		p9_reglamento_malasada: { name: 'Reglamento del festival', pocket: 'key', desc: 'Una hoja de papel manchada de azúcar con las reglas del Festival de la Malasada de Hauoli, escritas a mano por Kaudan. Se puede leer.',
			read: '*(Letra enorme, de alguien que escribe con el mismo brazo con el que levanta rocas. Manchas de aceite en las esquinas.)*\n\n**FESTIVAL DE LA MALASADA DE HAUOLI**\n**Reglamento (el de siempre)**\n\n1. Come el Pokémon, no el entrenador. El entrenador marca el ritmo. Si el entrenador come, descalificado. Si el kahuna come, no cuenta. El kahuna siempre come.\n\n2. Malasadas calientes. Las frías no se cuentan y no se tiran: se las lleva la mesa del jurado.\n\n3. Tres rondas. Al final de cada ronda, el Pokémon tiene que poder levantar la cabeza. Si no la levanta, se le espera. Con cariño.\n\n4. En caso de empate, lo decide el kahuna. El kahuna decide siempre lo mismo: un combate. Suave. De exhibición. Con la barriga llena.\n\n5. El premio es el premio. No se pregunta antes qué es.\n\n6. Tutu Moana lleva treinta años ganando con Puka. Esto no es una regla. Es un aviso.\n\n*— Kaudan, kahuna de Melemele. Con hambre.*' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		p9_velas_sotano: { name: 'Los nichos de la vieja Torre', icon: '🕯️', hours: 24, picks: [1, 2],
			text: 'Desde la noche de la vela, alguien deja cosas en los nichos sin nombre: flores secas, una cera que brilla, algo que alguien quiso que otro tuviera.',
			wait: 'Los nichos están como los dejaste. Las velas, encendidas. Vuelve mañana.',
			game: { type: 'aura', level: 2, theme: 'cueva', hint: 'Entre tantas velas, solo algunas tiemblan sin viento. Sigue las que tiemblan.' },
			ask: '¿Rastrear con calma entre los nichos (más cosas, y alguna rara) o recoger lo que está a la vista?',
			table: [
				{ id: 'revive', w: 14, n: [1, 1] },
				{ id: 'spelltag', w: 10, n: [1, 1] },
				{ id: 'pokedoll', w: 10, n: [1, 1] },
				{ id: 'dreadplate', w: 2, n: [1, 1], rare: true },
				{ id: 'rarecandy', w: 2, n: [1, 1], rare: true },
			] },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// -----------------------------------------------------------------
		// AZAFRÁN · Sabrina y los tres espejos
		// -----------------------------------------------------------------
		p9_alk_inicio: [
			{ set: { 'flag.p9_espejos_1': true } },
			{ text: 'Frente a la silla de Sabrina hay ahora tres espejos de pie, altos y estrechos, con el marco de madera negra. No estaban la última vez. No hay huellas en el polvo del suelo: nadie los ha traído andando.' },
			{ say: 'sabrina', text: 'Llegas a la hora. Es la primera vez. —No abre los ojos—. Los espejos son para ti. Los dos primeros. El tercero, no.' },
			{ say: 'sabrina', text: 'Tienes un Pokémon que mira como yo. Lo sé porque llevo tres días viéndolo en el techo cuando cierro los ojos. Un Alakazam, o uno que lo será. Por eso están los espejos.', cond: 'owns("alakazam")' },
			{ say: 'sabrina', text: 'Tienes un Pokémon que mira como yo. Lo sé porque llevo tres días viéndolo en el techo cuando cierro los ojos. Un Kadabra que aún no ha terminado de ser lo que es. Por eso están los espejos.', cond: '!owns("alakazam")' },
			{ quest: 'p9_s_alakazamita', stage: 'espejos' },
			// ---- Primer espejo ----
			{ text: 'Te pones frente al primer espejo. Refleja la sala entera: las baldosas apagadas, la silla, las tres cucharas girando. A ti, no. Donde deberías estar, hay sala.' },
			{ prompt: 'Sabrina, desde la silla: «Primer espejo. ¿Qué falta?»', choice: [
				{ text: '«Falto yo.»', then: [
					{ say: 'sabrina', text: 'Es lo que dice todo el mundo. No está mal. Está incompleto. —Una cuchara se inclina un poco—. El espejo no quita: enseña lo que hay cuando no estás mirando. La sala sigue. Tú también, en otra parte.' },
				] },
				{ text: '«No falta nada. La sala está entera.»', then: [
					{ set: { 'vars.p9_espejos': '+1' } },
					{ say: 'sabrina', text: '…Eso casi nadie lo dice. —Abre un ojo—. La sala está entera. Tú estás entero también, solo que no aquí. Mirar sin verse es la mitad de mi trabajo. La otra mitad es aguantarlo.' },
				] },
				{ text: '«Faltan las huellas en el polvo.»', then: [
					{ say: 'sabrina', text: 'Las huellas. —Las cucharas se detienen un instante—. Observador{|a|e}. Pero las huellas no faltan en el espejo: faltan en el suelo. Son dos preguntas distintas. Te contesto la segunda otro día.' },
				] },
			] },
			// ---- Segundo espejo ----
			{ text: 'El segundo espejo refleja a Sabrina y sus tres cucharas. En el espejo, las cucharas giran como siempre. Pero en la sala, una de ellas se ha parado.' },
			{ prompt: 'Sabrina: «Segundo espejo. Una cuchara no gira. ¿Cuál?»', choice: [
				{ text: '«La de la izquierda.»', then: [
					{ say: 'sabrina', text: 'La de la izquierda gira. Despacio, pero gira. Has mirado el espejo y has contestado la sala. O al revés. —No parece molesta—. Es un error muy humano. Yo lo cometí hasta los nueve años.' },
				] },
				{ text: '«La del medio.»', then: [
					{ set: { 'vars.p9_espejos': '+1' } },
					{ say: 'sabrina', text: 'La del medio. —La cuchara vuelve a girar en cuanto lo dices—. En el espejo giraban las tres, porque el espejo enseña lo que *suele* pasar. La sala enseña lo que pasa. Casi nadie mira la sala cuando tiene un espejo delante.' },
				] },
				{ text: '«Ninguna. Giran las tres. Lo que no gira soy yo.»', then: [
					{ say: 'sabrina', text: '—Un silencio largo—. Esa respuesta es más bonita que correcta. Me la quedo igual. La del medio estaba parada. Pero tienes razón en lo otro: tú tampoco girabas.' },
				] },
			] },
			{ say: 'sabrina', text: 'Dos espejos. Ya has visto más que la mayoría de los que entran aquí a pedir medallas. —Mira el tercero sin volver la cabeza—. El tercero no lo vas a mirar tú.' },
			{ if: ALK_PARTY, then: [
				{ call: 'p9_alk_tercero' },
			], else: [
				{ say: 'sabrina', text: 'Tu Pokémon no está contigo. El de la cuchara. —Cierra los ojos otra vez—. El tercer espejo es suyo. Tráelo. Yo no me muevo: ya lo has visto en el primer espejo.' },
				{ quest: 'p9_s_alakazamita', stage: 'traer' },
			] },
		],
		p9_alk_espera: [
			{ say: 'sabrina', text: 'El tercer espejo sigue esperando. No a ti. —Sin abrir los ojos—. Trae al de la cuchara. Las cosas que tienen que verse se ven mejor con quien tiene que verlas.' },
		],
		// Tercer espejo: lo mira tu Alakazam (o Kadabra). Entrega la Alakazamita.
		p9_alk_tercero: [
			{ if: 'flag.p9_alakazamita', then: [{ end: true }] },
			{ set: { 'flag.p9_alakazamita': true } },
			{ if: 'inParty("alakazam")', then: [
				{ text: 'Tu Alakazam sale de la Poké Ball y se queda muy quieto frente al tercer espejo, con las dos cucharas cruzadas sobre el pecho. El espejo no refleja nada. Es negro, como una ventana a una habitación sin luz.' },
				{ say: 'sabrina', text: 'Tercer espejo. —Se levanta. Las cucharas la siguen—. Yo no sé lo que enseña. Nunca lo he mirado. No es para los que ven: es para los que *leen*.' },
			], else: [
				{ text: 'Tu Kadabra sale de la Poké Ball y se queda frente al tercer espejo con la cuchara apretada en la mano, como quien aprieta un pasamanos. El espejo no refleja nada. Es negro, como una ventana a una habitación sin luz.' },
				{ say: 'sabrina', text: 'Tercer espejo. —Se levanta. Las cucharas la siguen—. Aún no ha terminado de ser lo que es, pero ya lee. Se le nota en cómo sujeta la cuchara. Yo tampoco he mirado este espejo nunca. No es para los que ven: es para los que *leen*.' },
			] },
			{ cutscene: { bg: { type: 'gym', wall: '#2a2440', floor: '#6a4a8a' }, start: 'dark', frames: [
				{ cond: 'inParty("alakazam")', actors: [{ id: 'sabrina', at: 0.8, enter: 'none', dim: true }, { mon: 'alakazam', key: 'psi', at: 0.3, enter: 'left' }], fx: 'glow', cam: 'push', text: 'Los ojos de tu Alakazam se encienden de un azul muy pálido. El espejo negro, despacio, deja de ser negro: por dentro aparece la misma sala, pero vista desde abajo. Desde el suelo. Desde debajo de una baldosa.' },
				{ cond: '!inParty("alakazam")', actors: [{ id: 'sabrina', at: 0.8, enter: 'none', dim: true }, { mon: 'kadabra', key: 'psi', at: 0.3, enter: 'left' }], fx: 'glow', cam: 'push', text: 'Los ojos de tu Kadabra se encienden de un azul muy pálido. El espejo negro, despacio, deja de ser negro: por dentro aparece la misma sala, pero vista desde abajo. Desde el suelo. Desde debajo de una baldosa.' },
				{ tint: '#d86aa8', fx: ['ripple', 'sparkle'], actors: [{ key: 'psi', emote: '!' }], cam: 'still', text: 'En el espejo, debajo de la baldosa, algo brilla con un color que no es de ninguna cuchara: una piedra pequeña, con una espiral dentro. Tu Pokémon la ve antes que tú. Mucho antes.' },
				{ tint: 'none', fx: 'light', shake: 1, cam: 'pan-left', text: 'Una baldosa de teletransporte, la tercera de la segunda fila, se enciende sola. Por primera vez en meses. Y se queda encendida.' },
			] } },
			{ text: 'Tu Pokémon camina hasta la baldosa encendida sin mirar el suelo, como quien va a su casa. La baldosa cede un dedo bajo su pie. Debajo hay una **Alakazamita**, fría, con la espiral girando dentro muy despacio.' },
			{ give: 'alakazite' },
			{ say: 'sabrina', text: 'No es mía. Lleva aquí desde antes que yo. Desde antes que el gimnasio, quizá. La encontré el día que me senté en esta silla y la dejé donde estaba: no me llamaba a mí.' },
			{ say: 'sabrina', text: 'Tres días viendo a tu Pokémon en el techo. Ahora ya sé por qué. —Vuelve a la silla—. La piedra no da nada que él no tenga. Le quita el miedo a enseñarlo. Es lo que hacen las Megapiedras, aunque nadie lo escriba así.' },
			{ if: 'inParty("kadabra") && !inParty("alakazam")', then: [
				{ say: 'sabrina', text: 'Y cuando termine de ser lo que es, la piedra seguirá ahí. Un cordón, un amigo, o tiempo: los Kadabra terminan de tres maneras. Las tres sirven.' },
			] },
			{ if: LUC, then: [
				{ text: '{riolu} ha visto la escena entera desde la puerta, sin acercarse. Sabrina lo mira un segundo.' },
				{ say: 'sabrina', text: 'Y tú llamaste antes de entrar, como siempre. Buenos modales. —Casi sonríe—. Hoy tu compañero ha abierto la puerta de golpe. Se le perdona: era la suya.' },
				{ happy: { who: 'riolu', n: 3 } },
			] },
			{ happy: { who: 'alakazam', n: 10 }, cond: 'inParty("alakazam")' },
			{ happy: { who: 'kadabra', n: 10 }, cond: '!inParty("alakazam")' },
			{ if: 'vars.p9_espejos >= 2', then: [
				{ say: 'sabrina', text: 'Y una cosa más. Dos espejos de dos. Eso no lo había visto. —Una cuchara flota hasta ti y deja caer algo en tu mano—. No es un premio. Es un recuerdo de que miraste la sala.' },
				{ give: 'twistedspoon' },
			] },
			{ quest: 'p9_s_alakazamita', stage: 'hecha', done: true },
			{ say: 'rotom', text: '¡Bzzt! ¡Alakazamita! Se equipa como cualquier objeto: dásela a tu Alakazam y, en combate, Megaevolución. ¡Ya la tengo apuntada en la mochila!' },
			{ say: 'sabrina', text: 'Ahora tengo curiosidad. Es raro: no suelo tenerla, porque suelo saber. Si un día quieres enseñarme cómo lee esa piedra en combate, estaré aquí. Con el mío.' },
			{ diary: 'Hoy mi entrenador{|a|e} miró tres espejos en Azafrán y yo no salí en ninguno. ¡Bzzt! ¡Soy una Pokédex! ¡Debería salir en todos los espejos! Sabrina dice que el tercero no era para los que ven. Yo veo muchísimo. Nuestro Pokémon de la cuchara encontró una piedra debajo del suelo. Yo la escaneé después. Después no cuenta.', cond: 'flag.b01_diario' },
			{ intel: { npc: 'sabrina', text: 'Puso tres espejos en su gimnasio para ti. El tercero lo miró tu Alakazam (o Kadabra) y encontró una Alakazamita bajo una baldosa: «no es mía; no me llamaba a mí». Ofrece una exhibición con su propio Alakazam.' } },
		],
		p9_alk_reto: [
			{ set: { 'flag.p9_alk_reto_visto': true } },
			{ say: 'sabrina', text: 'Has vuelto a mirar la sala. Bien. —Se levanta sin prisa—. Mi Alakazam lleva su piedra desde antes de que el Intercambio pusiera el cartel de la puerta. No la ha usado en todo este tiempo. Yo tampoco he querido.' },
			{ say: 'sabrina', text: 'Una exhibición. Sin medalla, sin cartel. Tú con la piedra que encontró el tuyo; yo con la que encontró el mío. A ver cuál de los dos lee mejor.' },
			{ prompt: '¿Combate de exhibición contra Sabrina? (Megaevoluciona a su Alakazam)', choice: [
				{ text: '«Que lean.»', then: [
					{ text: 'Sabrina levanta una mano. Las tres cucharas se separan y flotan sobre tu equipo, una por una, despacio. Donde pasan, el cansancio se va como el vaho de un cristal.' },
					{ heal: 'Tu equipo está en plena forma: PS y PP al máximo.' },
					{ battle: 'p9_sabrina_mega', lose: 'continue', onWin: [
						{ text: 'El Alakazam de Sabrina vuelve a su tamaño, baja las cinco cucharas y se sienta en el suelo con las piernas cruzadas, como quien ha terminado un libro largo. Sabrina lo mira. Luego te mira a ti.' },
						{ say: 'sabrina', text: 'Lo había visto. Pero verlo pasar es otra cosa. —Vuelve a la silla—. Toma. Estaba junto a la medalla que no pude darte. Ya no tiene sentido guardarlo.' },
						{ give: 'bignugget' },
						{ say: 'sabrina', text: 'Dile a tu Pokémon que ha leído bien. Que lo diga yo vale poco; que lo diga el mío, vale algo. —La cuchara del medio gira sola un momento—. Eso es que lo dice.' },
					], onLose: [
						{ say: 'sabrina', text: 'Acababa así. También lo sabía. —Una cuchara te roza el hombro—. Vuelve. Lo que veo cambia cuando cambias tú. Y tú cambias deprisa.' },
						{ heal: true },
					] },
				] },
				{ text: '«Hoy no.»', then: [
					{ say: 'sabrina', text: 'Hoy no. —Se sienta—. Ya sé qué día sí. No te lo voy a decir: te lo estropearía.' },
				] },
			] },
		],
		p9_alk_despues: [
			{ say: 'sabrina', text: 'Los espejos siguen ahí. No los voy a quitar. Desde que están, las baldosas se encienden solas de vez en cuando. Una, dos. Como si la sala recordara que un día va a volver a servir para algo.' },
			{ say: 'sabrina', text: 'La baldosa de tu piedra, siempre la primera.' },
		],

		// -----------------------------------------------------------------
		// LAVANDA · La vela que no se apaga (Dolores, Fuji, el sótano)
		// -----------------------------------------------------------------
		p9_vela_dolores: [
			{ set: { 'flag.p9_vela_1': true } },
			{ text: 'Es tarde. En el banco de la calle, bajo la farola, Dolores cose con los ojos entrecerrados. A su lado, Remiendo está sentado muy derecho, con la cremallera abierta un dedo. No duerme. Mira hacia la Torre Radio.' },
			{ say: 'p7_dolores', text: 'Ah, tú. A estas horas. —No deja de coser—. Remiendo no duerme desde hace tres noches. Y si él no duerme, yo coso. Es el trato.' },
			{ say: 'p7_dolores', text: 'Dice que abajo, en lo que queda de la vieja Torre, hay una vela que no se apaga. En un nicho sin nombre, al fondo. Los demás fantasmas no se le acercan. Él tampoco, y mira que no le tiene miedo a nada que tenga costuras.' },
			{ if: 'inParty("chandelure") || inParty("lampent") || inParty("litwick")', then: [
				{ text: 'Remiendo gira la cabeza de trapo hacia tu Poké Ball, la que lleva dentro una llama. Se queda así. Dolores lo nota.' },
				{ say: 'p7_dolores', text: 'Mira cómo lo mira. Tu Pokémon de la llama. Remiendo nunca mira a nadie así: él busca caras, no fuegos. —Clava la aguja en el cojín—. A lo mejor por eso te lo cuento a ti y no al cura.' },
			], else: [
				{ say: 'p7_dolores', text: 'Tú llevas uno de llama, ¿no? De los que nacen de una vela. Me lo dijo Remiendo. Bueno, no me lo dijo: se le abrió la cremallera cuando pasaste. Él sabe esas cosas.' },
			] },
			{ choice: [
				{ text: '«¿Qué quieres que haga?»', then: [
					{ say: 'p7_dolores', text: 'No sé. Yo coso. Tú eres {el|la|le} que baja a los sitios. —Mira a Remiendo—. Pregúntale al Señor Fuji. Él encendía las velas de la Torre cuando era Torre. Si hay una que no se apaga, él sabrá de quién era.' },
				] },
				{ text: '«Una vela que no se apaga no es tan raro, en Lavanda.»', then: [
					{ say: 'p7_dolores', text: 'En Lavanda, no. Aquí hay velas que se encienden solas. Pero las que se encienden solas se apagan solas también. Esta, no. —Baja la voz—. Esta está esperando a alguien. Las cosas que esperan no descansan. Y no dejan descansar.' },
					{ say: 'p7_dolores', text: 'Pregúntale al Señor Fuji. Él encendía las velas de la Torre cuando era Torre.' },
				] },
			] },
			{ say: 'p7_dolores', text: 'Y si bajas, ve de noche. Remiendo dice que de día la vela casi no se ve. Las cosas que esperan se ven mejor cuando todo lo demás se apaga.' },
			{ quest: 'p9_s_chandelurita', stage: 'fuji' },
		],
		p9_vela_fuji: [
			{ text: 'El Señor Fuji tiene en el regazo un candelero de latón, bajo y pesado, y lo frota con la manga del cárdigan sin darse cuenta de que lo hace. Al verte, deja de frotar.' },
			{ say: 'fuji', text: 'Dolores me ha mandado aviso con la vecina de las macetas. —Muy suave—. La vela del nicho sin nombre. Ya. Yo pensaba que se había apagado hace cuarenta años. Pensaba muchas cosas hace cuarenta años.' },
			{ say: 'fuji', text: 'En la Torre había un nicho para los que llegaban sin nombre. Pokémon que nadie reclamaba. Los monjes les ponían una vela a todos juntos, una sola, y la encendían cada noche. Decían que mientras la vela estuviera encendida, ninguno estaba solo.' },
			{ say: 'fuji', text: 'Cuando derribaron la Torre, las demás velas se trasladaron con sus nombres. Esa no tenía nombre que trasladar. Se quedó. —Mira el candelero—. Y parece que alguien la ha seguido encendiendo. O que ella sola no ha querido apagarse.' },
			{ choice: [
				{ text: '«¿Y qué hago yo con eso?»', then: [
					{ say: 'fuji', text: 'Lo que hacen los que tienen un Pokémon de llama. —Te mira con sus ojos cansados—. Los Litwick nacen de una vela que alguien dejó encendida por otro. Esa vela lleva cuarenta años encendida por muchos. Si tu Pokémon la acepta, la vela por fin tendrá a alguien. Y los nichos, descanso.' },
				] },
				{ text: '«Usted encendía esa vela.»', then: [
					{ say: 'fuji', text: '…Sí. Todas las noches, durante años. Era lo único que sabía hacer bien entonces. —Una pausa larga—. Luego hice otras cosas, en otro sitio, y dejé de venir. Cuando volví, la Torre ya no estaba. Pensé que la vela tampoco.' },
					{ say: 'fuji', text: 'Si tu Pokémon de llama la acepta, la vela por fin tendrá a alguien. Y yo podré dejar de frotar este candelero.' },
				] },
			] },
			{ text: 'Te tiende el candelero. Pesa más de lo que parece. El asa está gastada por una sola mano, siempre la misma.' },
			{ give: 'p9_candelero' },
			{ say: 'fuji', text: 'Baja de noche, con tu Pokémon en el equipo. Pon la vela en el candelero si te deja. Los que están abajo no se le acercan porque no es suya. A la tuya sí se acercarán: a ver si es de verdad.' },
			{ say: 'fuji', text: 'Y si alguno se pone bravo… no le tengas miedo. Llevan cuarenta años cuidando una vela que no era de nadie. Están cansados. Desde fuera se parece mucho a estar enfadados.' },
			{ quest: 'p9_s_chandelurita', stage: 'sotano' },
		],
		p9_vela_dia: [
			{ text: 'Al fondo del pasillo, en un nicho sin nombre, hay una vela. De día, la llama casi no se ve: un hilo de luz que se confunde con el polvo. Remiendo tenía razón. Esto se ve de noche.' },
		],
		p9_vela_sin: [
			{ text: 'De noche, la vela del nicho sin nombre se ve desde la escalera: una llama alta, quieta, que no tiembla aunque todo el sótano tiemble. Los demás nichos, con sus velas pequeñas, parecen apartarse de ella.' },
			{ text: 'Sacas el candelero. La llama no se mueve. No es para ti: espera a alguien que sepa qué hacer con una llama. Tu Pokémon de la vela, el de la Poké Ball que está en el PC, no está aquí.' },
			{ say: 'rotom', text: '¡Bzzt! Sin tu Chandelure, Lampent o Litwick en el equipo esto no va a pasar de ser una vela. Una vela muy terca, pero vela. ¡Ve a buscarlo!' },
		],
		// La escena: de noche, con la línea de Litwick en el equipo.
		p9_vela_escena: [
			{ if: 'flag.p9_chandelurita', then: [{ end: true }] },
			{ text: 'De noche, la vela del nicho sin nombre se ve desde la escalera: una llama alta, quieta, que no tiembla aunque todo el sótano tiemble. Al acercarte, el incensario de bronce de abajo manda un hilo de humo que sube por la escalera y se enrosca en tus Poké Balls.' },
			{ heal: 'El humo del incensario huele a cuarenta años de despedidas bien hechas. Tu equipo respira hondo. PS y PP al máximo.' },
			{ if: 'inParty("chandelure")', then: [
				{ text: 'Tu Chandelure sale solo, sin que lo llames, y se queda flotando frente al nicho, con sus cuatro llamas moradas bajas, casi apagadas, como quien baja la voz en una iglesia.' },
			] },
			{ if: 'inParty("lampent") && !inParty("chandelure")', then: [
				{ text: 'Tu Lampent sale solo, sin que lo llames, y se queda flotando frente al nicho con la llama encogida dentro del cristal, como quien baja la voz en una iglesia.' },
			] },
			{ if: 'inParty("litwick") && !inParty("lampent") && !inParty("chandelure")', then: [
				{ text: 'Tu Litwick sale solo, sin que lo llames, y se queda frente al nicho con la llama de la cabeza encogida, muy pequeña, como quien baja la voz en una iglesia.' },
			] },
			{ text: 'Antes de que la llama se mueva, el aire del pasillo se espesa. De los nichos vacíos sale una risa, baja, y luego una sombra grande con dos ojos rojos que se planta entre tu Pokémon y la vela. Un **Gengar**. No se ríe como los Gengar. Está cansado.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Un Gengar! Lleva cuarenta años cuidando esa vela, apuesto. No quiere que nadie se la lleve… hasta ver si la tuya es de verdad. ¡No se puede capturar: esto es suyo!' },
			{ wild: { sp: 'gengar', lv: 56, noCatch: true }, canRun: false,
				onWin: [
					{ text: 'El Gengar se deshace en humo sin dejar de mirar a tu Pokémon. No parece vencido: parece aliviado. Antes de irse del todo, inclina la cabeza hacia el nicho. Como quien deja un turno.' },
					{ cutscene: { bg: { type: 'cave', dark: true, fog: true, crystals: '#b08ad8' }, start: 'dark', frames: [
						{ cond: 'inParty("chandelure")', actors: [{ mon: 'chandelure', key: 'vela', at: 0.35, enter: 'left' }], fx: 'glow', cam: 'push', text: 'Tu Chandelure se acerca al nicho. Sacas el candelero de latón y lo pones debajo de la vela. La llama, por primera vez en cuarenta años, se inclina. Hacia él.' },
						{ cond: '!inParty("chandelure") && inParty("lampent")', actors: [{ mon: 'lampent', key: 'vela', at: 0.35, enter: 'left' }], fx: 'glow', cam: 'push', text: 'Tu Lampent se acerca al nicho. Sacas el candelero de latón y lo pones debajo de la vela. La llama, por primera vez en cuarenta años, se inclina. Hacia él.' },
						{ cond: '!inParty("chandelure") && !inParty("lampent")', actors: [{ mon: 'litwick', key: 'vela', at: 0.35, enter: 'left' }], fx: 'glow', cam: 'push', text: 'Tu Litwick se acerca al nicho. Sacas el candelero de latón y lo pones debajo de la vela. La llama, por primera vez en cuarenta años, se inclina. Hacia él.' },
						{ tint: '#b08ad8', fx: ['sparkle', 'ripple'], actors: [{ key: 'vela', emote: '!' }], cam: 'still', text: 'La llama salta. No se apaga: cambia de sitio. Se mete en tu Pokémon como quien entra en una casa con la puerta abierta y, dentro, se vuelve morada. Todos los nichos del pasillo se encienden a la vez, pequeños, tranquilos.' },
						{ tint: 'none', fx: 'light', cam: 'pan-right', text: 'En el nicho, donde estaba la vela, queda un charco de cera fría. Y en medio del charco, algo que no es cera: una piedra con una llama dibujada dentro, que gira muy despacio.' },
					] } },
					{ text: 'Recoges la piedra del nicho. Está tibia, como una taza que alguien acaba de soltar. Una **Chandelurita**.' },
					{ give: 'chandelurite' },
					{ set: { 'flag.p9_chandelurita': true } },
					{ if: 'inParty("chandelure")', then: [
						{ text: 'Tu Chandelure flota muy despacio por el pasillo, nicho por nicho, y en cada uno se queda un segundo. Las velas pequeñas se le inclinan. Cuando vuelve a ti, sus cuatro llamas arden un poco más altas que antes. Ninguna tiembla.' },
						{ happy: { who: 'chandelure', n: 15 } },
					], else: [
						{ text: 'Tu Pokémon flota muy despacio por el pasillo, nicho por nicho, y en cada uno se queda un segundo. Las velas pequeñas se le inclinan. Cuando vuelve a ti, su llama arde un poco más alta. La piedra espera a que crezca: las piedras saben esperar.' },
						{ happy: { who: 'lampent', n: 15 }, cond: 'inParty("lampent")' },
						{ happy: { who: 'litwick', n: 15 }, cond: '!inParty("lampent")' },
					] },
					{ if: LUC, then: [
						{ text: '{riolu} se ha quedado en la escalera todo el rato, con las orejas bajas, sin intervenir. Ahora baja un escalón. El humo del incensario le pasa por delante y él no se aparta.' },
					] },
					{ quest: 'p9_s_chandelurita', stage: 'hecha', done: true },
					{ say: 'rotom', text: '¡Bzzt! ¡Chandelurita! Se equipa como cualquier objeto: dásela a tu Chandelure y, en combate, Megaevolución. Y las velas de los nichos… ¿has visto? Ya no tiemblan. ¡Lo apunto!' },
					{ toast: 'Desde ahora, los nichos del sótano se pueden rastrear una vez al día.' },
					{ diary: 'Esta noche bajamos al sótano de Lavanda y había una vela que llevaba cuarenta años encendida por Pokémon que no tenían nombre. Nuestro Pokémon de la llama se la quedó. No la apagó: se la llevó dentro. ¡Bzzt! Yo tengo nombre y una pantalla con una mancha de Litten, y aun así, al salir, me quedé mirando las velas un rato. Sin escanear. Solo mirando.', cond: 'flag.b01_diario' },
					{ intel: { npc: 'fuji', text: 'Te prestó el candelero de los monjes para la vela del nicho sin nombre, la que él encendía cada noche hace cuarenta años. Tu Pokémon de llama adoptó la vela; dentro había una Chandelurita.' } },
				],
				onLose: [
					{ text: 'El Gengar vuelve a los nichos sin dejar de mirar a tu Pokémon. La vela sigue ardiendo, quieta. No se ha movido. Sabe esperar: lleva cuarenta años haciéndolo.' },
					{ say: 'rotom', text: '¡Bzzt! No ha querido dejarnos pasar. Todavía. Curamos, volvemos de noche y lo intentamos otra vez: la vela no se va a ninguna parte.' },
				] },
		],
		p9_vela_fin: [
			{ set: { 'flag.p9_vela_fin': true } },
			{ text: 'En el banco de la calle, bajo la farola, Dolores duerme con la cabeza apoyada en el respaldo y la aguja clavada en el cojín. Remiendo, a su lado, también: con la cremallera cerrada del todo. Es la primera vez que lo ves con la cremallera cerrada.' },
			{ text: 'Al pasar, Dolores abre un ojo. Solo uno.' },
			{ say: 'p7_dolores', text: 'Ya. Ya lo sé. Se ha dormido a las diez, como un niño. —Cierra el ojo—. Gracias. Mañana te coso algo. Hoy, déjame dormir yo también. Tres noches son muchas noches.' },
			{ text: 'Antes de que te vayas, sin abrir los ojos, te deja en la mano algo pequeño que tenía en el bolsillo del delantal: un amuleto de tela negra con un hilo rojo cosido en espiral.' },
			{ give: 'spelltag' },
			{ say: 'p7_dolores', text: 'Para el tuyo de la llama. Se lo cosí ayer, por si acaso. Yo siempre coso por si acaso.' },
		],

		// -----------------------------------------------------------------
		// HAUOLI · Festival de la malasada (Kaudan, Tutu Moana y tu Snorlax)
		// -----------------------------------------------------------------
		p9_fest_intro: [
			{ if: 'flag.p9_fest_1', then: [
				{ say: 'kaudan', text: '¡Jo, jo! ¡La mesa sigue puesta! Y tu Snorlax sigue sin estar en ella. Ve a buscarlo. Yo vigilo las bandejas. —Se come una—. Las vigilo de cerca.' },
				{ end: true },
			] },
			{ set: { 'flag.p9_fest_1': true } },
			{ text: 'El Paseo Marítimo tiene hoy una mesa larga de tablones que va desde el puesto de malasadas hasta casi el muelle, con bandejas humeantes cada dos pasos. En la cabecera, en una silla que cruje, Kaudan. Lleva un collar de flores y azúcar en la barba.' },
			{ say: 'kaudan', text: '¡Jo, jo, jo! ¡{jugador}! ¡Justo a tiempo! Bueno, justo a tiempo no: llevamos dos horas. Pero quedan malasadas, así que a tiempo.' },
			{ say: 'kaudan', text: 'El **Festival de la Malasada**. Una vez al año, cuando la señora del puesto decide que es el día. Los Pokémon comen, los entrenadores marcan el ritmo y el kahuna hace de jurado. —Se señala la barriga—. Para eso me eligieron. Para lo otro también, pero para esto sobre todo.' },
			{ say: 'kaudan', text: 'Y me han dicho que tienes un Snorlax. —Se le iluminan los ojos—. ¡Un Snorlax! Hace treinta años que nadie gana a Puka, el de Tutu Moana. Treinta. Yo lo intenté con un Hariyama. Se durmió en la segunda ronda. El Hariyama. Y yo.' },
			{ text: 'Te pone en la mano una hoja manchada de azúcar.' },
			{ give: 'p9_reglamento_malasada' },
			{ say: 'kaudan', text: 'El reglamento. Es corto. Léelo cuando quieras; la regla importante es la cinco. Trae a tu Snorlax en el equipo y siéntalo en la mesa. Yo guardo la silla. —Mira la silla. Es enorme—. La hice yo. Para él. Bueno, para mí. Cabe.' },
			{ quest: 'p9_s_snorlium', stage: 'traer' },
		],
		p9_fest_concurso: [
			{ if: '!flag.p9_fest_1', then: [
				{ set: { 'flag.p9_fest_1': true } },
				{ text: 'El Paseo Marítimo tiene hoy una mesa larga de tablones que va desde el puesto de malasadas hasta casi el muelle, con bandejas humeantes cada dos pasos. En la cabecera, en una silla que cruje, Kaudan. Lleva un collar de flores y azúcar en la barba.' },
				{ say: 'kaudan', text: '¡Jo, jo, jo! ¡{jugador}! ¡Y un Snorlax! ¡Te has traído un Snorlax al **Festival de la Malasada**! —Se levanta. Tarda—. Treinta años que nadie gana a Puka, el de Tutu Moana. Treinta. Hoy se acaba, o se come mucho intentándolo. Las dos cosas me valen.' },
				{ text: 'Te pone en la mano una hoja manchada de azúcar.' },
				{ give: 'p9_reglamento_malasada' },
				{ say: 'kaudan', text: 'El reglamento. La regla importante es la cinco. Siéntalo. La silla la hice yo. Cabe.' },
			] },
			// ---- El concurso (una vez) ----
			{ if: '!flag.p9_fest_comido', then: [
				{ set: { 'flag.p9_fest_comido': true } },
				{ quest: 'p9_s_snorlium', stage: 'comer' },
				{ text: 'Tu Snorlax se sienta en la silla de Kaudan. La silla aguanta. Kaudan aplaude. Al otro lado de la mesa, una señora bajita de pelo blanco y flor en la oreja sienta a su Snorlax, uno con una cicatriz en forma de media luna en la barriga. **Puka**. Puka no te mira. Puka mira las bandejas.' },
				{ say: 'kaudan', text: 'Tutu Moana, la del puesto. Treinta años de malasadas y treinta de Puka. —Baja la voz—. No le digas que Puka está gordo. Lo sabe. Le gusta.' },
				{ text: '«Sin fiado, cariño. Y sin servilleta», dice Tutu Moana. Puka bosteza. Kaudan levanta una malasada como quien levanta una bandera.' },
				{ say: 'kaudan', text: '¡Tres rondas! ¡El entrenador marca el ritmo; el Pokémon come! ¡Si el kahuna come, no cuenta! —Se come una—. ¡Ronda uno!' },
				{ prompt: 'Ronda uno. Puka empieza despacio, una malasada por vez, sin masticar mucho. ¿Qué ritmo le marcas a tu Snorlax?', choice: [
					{ text: 'Despacio y seguido, como Puka.', then: [
						{ set: { 'vars.p9_malasadas': '+1' } },
						{ text: 'Tu Snorlax come al compás de Puka, malasada por malasada, mirándolo de reojo. Al final de la ronda van empatados. Kaudan apunta algo en la mano con un dedo mojado en azúcar.' },
					] },
					{ text: 'A lo bestia. Dos a la vez.', then: [
						{ set: { 'vars.p9_malasadas': '+2' } },
						{ text: 'Tu Snorlax se mete dos malasadas en la boca y una tercera en la mano. Tutu Moana levanta una ceja. Puka, por primera vez, levanta la vista de la bandeja. Vas por delante. Un poco.' },
					] },
					{ text: 'Que decida Snorlax.', then: [
						{ set: { 'vars.p9_malasadas': '+1' } },
						{ text: 'Tu Snorlax decide. Decide comerse la bandeja. No las malasadas: la bandeja. Kaudan la rescata a tiempo y le da las malasadas una a una, riéndose tanto que se le cae el collar. Empate técnico.' },
					] },
				] },
				{ say: 'kaudan', text: '¡Ronda dos! ¡Las calientes! —Una bandeja nueva sale del puesto echando humo—. Puka las espera a que enfríen. Es su truco: treinta años sin quemarse la lengua.' },
				{ prompt: 'Ronda dos. Las malasadas queman. Puka espera. ¿Y tu Snorlax?', choice: [
					{ text: 'Que espere también. Las frías no cuentan, pero las quemadas tampoco.', then: [
						{ set: { 'vars.p9_malasadas': '+1' } },
						{ text: 'Los dos Snorlax esperan frente a las bandejas con la misma cara. Tutu Moana se ríe por primera vez: «Mira, cariño, son iguales». En cuanto dejan de humear, comen a la vez. Empate.' },
					] },
					{ text: 'Que las sople. Rápido y a comer.', then: [
						{ set: { 'vars.p9_malasadas': '+2' } },
						{ text: 'Tu Snorlax sopla. Sopla tanto que la bandeja de Puka se enfría también, y una servilleta sale volando hasta el muelle. Come primero. Puka, ofendido, come después, pero más.' },
					] },
					{ text: 'Que mire a Puka y haga lo contrario.', then: [
						{ set: { 'vars.p9_malasadas': '+1' } },
						{ text: 'Tu Snorlax mira a Puka. Puka espera. Tu Snorlax come caliente. Se quema. Bebe de la jarra de Kaudan. Kaudan protesta. Al final come igual, con la lengua fuera. Empate, con lágrimas.' },
					] },
				] },
				{ say: 'kaudan', text: '¡Ronda tres! ¡La última! —Se levanta. Cruje la silla, cruje él—. Aquí es donde Puka gana siempre: los demás ya no pueden levantar la cabeza. Regla tres. Con cariño.' },
				{ prompt: 'Ronda tres. Puka sigue comiendo como en la primera. Tu Snorlax tiene los ojos a medio cerrar.', choice: [
					{ text: '«Una más. Solo una. Por mí.»', then: [
						{ set: { 'vars.p9_malasadas': '+2' } },
						{ text: 'Tu Snorlax te mira. Abre los ojos del todo. Se come una. Y otra. Y otra, mirándote a ti y no a la bandeja. Kaudan deja de reírse. Tutu Moana deja de reírse. Puka deja de comer para mirar.' },
					] },
					{ text: 'Dejarlo dormir. Ya ha comido bastante.', then: [
						{ set: { 'vars.p9_malasadas': '+1' } },
						{ text: 'Tu Snorlax apoya la cabeza en la mesa y se duerme con media malasada en la mano. Puka lo mira. Y hace lo mismo. Los dos roncan a la vez. Tutu Moana: «Ay, cariño. Treinta años y nunca lo había visto hacer eso».' },
					] },
					{ text: 'Cantarle. Lo que sea.', then: [
						{ set: { 'vars.p9_malasadas': '+1' } },
						{ text: 'Le cantas. No muy bien. Kaudan se une, peor. Tu Snorlax abre un ojo, come una malasada al ritmo de la canción y vuelve a cerrarlo. Puka come dos. La gente del Paseo aplaude. No sabes a quién.' },
					] },
				] },
				{ text: 'Kaudan cuenta las bandejas vacías con el dedo. Las vuelve a contar. Mira a Tutu Moana. Tutu Moana mira a Puka. Puka mira la última malasada, que está en medio de la mesa, y no se mueve. Tu Snorlax tampoco.' },
				{ say: 'kaudan', text: '…Empate. —Silencio en el Paseo—. ¡EMPATE! ¡Jo, jo, jo! ¡Treinta años! ¡Treinta años y un empate! —Se sienta. La silla aguanta, por poco—. Regla cuatro. Lo decide el kahuna. Y el kahuna decide siempre lo mismo.' },
			] },
			// ---- El desempate (se repite hasta ganar) ----
			{ say: 'kaudan', text: 'Un combate. Suave. De exhibición. Con la barriga llena, que así es más justo: nadie puede moverse. —A Tutu Moana—. ¿Puka está despierto?' },
			{ text: '«Puka está siempre despierto por dentro, cariño». Puka ronca. Tutu Moana le da un golpecito en la barriga y Puka abre un ojo.' },
			{ say: 'kaudan', text: 'Antes, una para cada uno de los tuyos. Las del jurado. —Reparte malasadas calientes a tu equipo, una por Poké Ball, con mucha ceremonia—. Nadie combate con hambre en mi isla.' },
			{ heal: 'Malasadas calientes del jurado para todo el equipo. PS y PP al máximo. Y azúcar en todas partes.' },
			{ battle: 'p9_tutu_snorlax', lose: 'continue', onWin: [
				{ text: 'Puka se queda dormido en mitad del Paseo, boca arriba, con una sonrisa. Tutu Moana se sienta a su lado y le pone la última malasada en la barriga. «Para cuando despiertes, cariño. Has perdido muy bien».' },
				{ say: 'kaudan', text: '¡Jo, jo, jo! ¡Treinta años! ¡Se acabó la racha! —Te levanta en el aire sin querer. Te deja en el suelo con cuidado—. Regla cinco: el premio es el premio. No se pregunta antes qué es. Ahora ya se puede.' },
				{ text: 'De un bolsillo de la camisa, envuelto en una servilleta de papel con azúcar, Kaudan saca un cristal. Es grande, pesado para su tamaño, y por dentro tiene la forma de un Snorlax dormido.' },
				{ say: 'kaudan', text: 'El **Snorlastal Z**. Me lo dio Tutu Moana hace treinta años, para el día que alguien ganara a Puka. Lo he llevado en este bolsillo todo ese tiempo. Pesa. —Se lo mira—. Pesaba.' },
				{ give: 'snorliumz' },
				{ set: { 'flag.p9_snorlium': true } },
				{ say: 'kaudan', text: 'No es un cristal de tipo. Es *suyo*. Solo un Snorlax puede usarlo, y solo si sabe **Gigaimpacto**. Con la Pulsera Z, lo que hace… —Se le escapa la risa—. Lo que hace es tirarse encima. Con todo. Es lo más Snorlax que existe.' },
				{ if: 'inParty("snorlax")', then: [
					{ say: 'kaudan', text: 'Y si el tuyo aún no sabe Gigaimpacto, se lo enseño yo ahora. Treinta años esperando esto. Un kahuna aprende cosas mientras espera.' },
					{ learn: { who: 'snorlax', move: 'gigaimpact' } },
					{ happy: { who: 'snorlax', n: 15 } },
				] },
				{ text: 'Tutu Moana se acerca, bajita, con una caja de cartón manchada de aceite.' },
				{ text: '«Para el camino, cariño. Y para el tuyo. Puka ya no come más hoy». Dentro hay malasadas grandes, de las que curan de todo.' },
				{ give: 'bigmalasada', n: 3 },
				{ quest: 'p9_s_snorlium', stage: 'hecha', done: true },
				{ say: 'rotom', text: '¡Bzzt! ¡Snorlastal Z! Dáselo a tu Snorlax como objeto y, si sabe Gigaimpacto y llevas la Pulsera Z, en combate tendrá su movimiento Z. ¡El suyo! ¡Lo apunto con letras grandes!' },
				{ if: LUC, then: [
					{ text: '{riolu} ha pasado el festival sentado en el muro del Paseo, comiéndose una sola malasada con las dos manos, muy despacio, como un asunto serio. Kaudan lo ha visto. Le manda otra sin decir nada.' },
					{ happy: { who: 'riolu', n: 3 } },
				] },
				{ diary: 'Hoy nuestro Snorlax ganó el Festival de la Malasada de Hauoli. Hubo empate con un Snorlax llamado Puka que lleva treinta años ganando, y lo decidió un combate con la barriga llena. ¡Bzzt! Kaudan sacó un cristal del bolsillo de la camisa. Treinta años en un bolsillo. Yo llevo tres meses en una mochila y ya me quejo.', cond: 'flag.b01_diario' },
				{ intel: { npc: 'kaudan', text: 'Jurado del Festival de la Malasada de Hauoli. Tu Snorlax empató con Puka, el de Tutu Moana (treinta años invicto), y ganó el desempate. Te dio el Snorlastal Z que guardaba en el bolsillo desde hacía treinta años.' } },
			], onLose: [
				{ say: 'kaudan', text: '¡Jo, jo! Puka sigue invicto. Treinta años y un día. —Te da una palmada que te mueve un metro—. La mesa no se quita. Cura al tuyo, duerme la siesta y vuelve. El cristal sigue en mi bolsillo. Ya está acostumbrado.' },
				{ heal: true },
			] },
		],
		p9_fest_despues: [
			{ say: 'kaudan', text: '¡Jo, jo! Tutu Moana ya está pensando en el año que viene. Dice que Puka va a entrenar. Puka está durmiendo debajo de la mesa. Yo creo que ese es el entrenamiento.' },
			{ say: 'kaudan', text: 'Y el bolsillo de la camisa me pesa menos. Es raro. Treinta años con un cristal ahí y ahora no sé qué meter. —Mete una malasada—. Ya está.' },
		],

		// -----------------------------------------------------------------
		// WELA · La danza del lariat (Kiawe y tu Litten / Torracat / Incineroar)
		// -----------------------------------------------------------------
		p9_danza_traer: [
			{ if: '!flag.p9_danza_1', then: [
				{ set: { 'flag.p9_danza_1': true } },
				{ text: 'En el borde del cráter, Kiawe marca un compás que no le habías visto: más lento, con los brazos abiertos y una vuelta al final que termina con el talón clavado en la roca. Su Marowak no lo sigue. Mira.' },
				{ say: 'kiawe', text: 'Este no es mío. —Golpe de talón—. Es de mi abuelo. Lo bailaba con un Incineroar que vino de otra isla y se quedó en nuestra granja a vigilar a los Miltank. El lariat. Un paso de brazos. El fuego no va en los pies: va en los hombros.' },
				{ say: 'kiawe', text: 'Me han dicho que tienes uno de esa familia. El gato negro del fuego. —Se para—. Tráelo. Quiero ver si recuerda algo que nunca aprendió. Los Pokémon de fuego recuerdan cosas que no les han pasado a ellos.' },
				{ quest: 'p9_s_incinium', stage: 'traer' },
			], else: [
				{ say: 'kiawe', text: 'Tu gato de fuego no está contigo. —Sigue bailando—. El paso espera. El fuego también, cuando quiere.' },
			] },
		],
		// Con Litten o Torracat en el equipo: la escena se celebra igual; el cristal, cuando sea Incineroar.
		p9_danza_cria: [
			{ if: '!flag.p9_danza_1', then: [
				{ set: { 'flag.p9_danza_1': true } },
				{ text: 'En el borde del cráter, Kiawe marca un compás que no le habías visto: más lento, con los brazos abiertos y una vuelta al final que termina con el talón clavado en la roca. Su Marowak no lo sigue. Mira.' },
				{ say: 'kiawe', text: 'Este no es mío. —Golpe de talón—. Es de mi abuelo. Lo bailaba con un Incineroar que vino de otra isla y se quedó en nuestra granja a vigilar a los Miltank. El lariat. Un paso de brazos. El fuego no va en los pies: va en los hombros.' },
			] },
			{ if: '!flag.p9_danza_cria', then: [
				{ set: { 'flag.p9_danza_cria': true } },
				{ text: 'Tu gato de fuego sale de la Poké Ball, se estira y mira a Kiawe con desconfianza, como mira a todo el mundo. Kiawe no le hace caso. Baila. A la tercera vuelta, el gato ha dejado de mirar con desconfianza y mira los hombros.', cond: 'inParty("litten")' },
				{ text: 'Tu Torracat sale de la Poké Ball y se sienta en la roca caliente, con la campana del cuello tintineando. Kiawe no le hace caso. Baila. A la tercera vuelta, la campana tintinea al compás. El Torracat no se ha dado cuenta.', cond: '!inParty("litten")' },
				{ say: 'kiawe', text: 'Lo ve. —Sin dejar de bailar—. Todavía no tiene los hombros, pero lo ve. Mi abuelo decía que el paso se aprende antes que el cuerpo. El cuerpo llega después, a buscarlo.' },
				{ say: 'kiawe', text: 'Enséñale tú. —Se para frente a ti—. Tres pasos. Yo hago uno; tú se lo dices. Si te equivocas, no pasa nada: el fuego se apaga y se enciende. Lo has visto.' },
				{ call: 'p9_danza_pasos' },
				{ say: 'kiawe', text: 'Ya tiene el paso en la cabeza. Le falta el cuerpo. —Mira al gato. El gato le aguanta la mirada—. Cuando sea Incineroar, vuelve. Hay algo que es suyo y que no le puedo dar todavía: le quemaría las manos.' },
				{ quest: 'p9_s_incinium', stage: 'volver' },
			], else: [
				{ say: 'kiawe', text: 'Sigue sin los hombros. —Golpe de talón—. No tengas prisa. El volcán tardó mil años en tener forma de volcán. Vuelve cuando sea Incineroar.' },
				{ text: 'Tu gato de fuego, desde tu lado, intenta la vuelta del lariat. Le sale a medias. Kiawe asiente como si le hubiera salido entera.' },
			] },
		],
		// Con Incineroar en el equipo: la danza completa y el cristal.
		p9_danza_incineroar: [
			{ if: 'flag.p9_incinium', then: [{ end: true }] },
			{ if: '!flag.p9_danza_1', then: [
				{ set: { 'flag.p9_danza_1': true } },
				{ text: 'En el borde del cráter, Kiawe marca un compás que no le habías visto: más lento, con los brazos abiertos y una vuelta al final que termina con el talón clavado en la roca. Su Marowak no lo sigue. Mira.' },
				{ say: 'kiawe', text: 'Este no es mío. —Golpe de talón—. Es de mi abuelo. Lo bailaba con un Incineroar que vino de otra isla y se quedó en nuestra granja a vigilar a los Miltank. El lariat. Un paso de brazos. El fuego no va en los pies: va en los hombros.' },
			] },
			{ text: 'Tu Incineroar sale de la Poké Ball y se planta en el borde del cráter con los brazos cruzados, el cinturón de fuego encendido a medias. Kiawe lo mira de arriba abajo. Luego sigue bailando, más despacio, como quien enseña sin decir que enseña.' },
			{ say: 'kiawe', text: 'Ya tiene los hombros. —Golpe de talón—. Ahora falta que los use para algo que no sea cruzar los brazos.' },
			{ if: 'flag.p9_danza_cria', then: [
				{ say: 'kiawe', text: 'Lo vio de pequeño. Se le nota: ya sabe dónde van las manos. Solo que ahora las manos son otras. —Se para frente a ti—. Tres pasos. Yo hago uno; tú se lo dices.' },
			], else: [
				{ say: 'kiawe', text: 'Tres pasos. Yo hago uno; tú se lo dices. Si te equivocas, no pasa nada: el fuego se apaga y se enciende. Lo has visto.' },
			] },
			{ call: 'p9_danza_pasos' },
			{ cutscene: { bg: { type: 'mountain', ground: '#3a2a2a', far: '#c4473a', hill: '#5a3a3a' }, start: 'fade', time: 'tarde', frames: [
				{ actors: [{ id: 'kiawe', at: 0.25, enter: 'left' }, { mon: 'incineroar', key: 'cat', at: 0.7, enter: 'right' }], cam: 'still', text: 'Kiawe y tu Incineroar bailan a la vez en el borde del cráter. Hombros abiertos. Vuelta. Talón. El cinturón de fuego de Incineroar sube con cada vuelta, y a la tercera ya no es un cinturón: es una rueda.' },
				{ weather: 'embers', fx: ['glow', 'flash'], shake: 1, actors: [{ key: 'cat', do: 'step' }, { key: 'kiawe', do: 'bow' }], cam: 'push', text: 'En la última vuelta, Incineroar cruza los brazos en el aire con un giro que no le ha enseñado nadie. El volcán contesta: una bocanada de humo blanco, redonda, sube del cráter y se deshace sobre los dos.' },
				{ weather: 'none', fx: 'light', actors: [{ key: 'kiawe', do: 'nod' }], cam: 'pull', text: 'Kiawe deja de bailar. Se queda mirando el humo mucho rato. Luego se lleva la mano al pañuelo del cuello y saca algo que llevaba atado dentro.' },
			] } },
			{ say: 'kiawe', text: 'Mi abuelo me lo dio para el Incineroar de la granja. Murió antes de que yo aprendiera el paso. El cristal se quedó conmigo. —Lo abre en la palma: un cristal rojo y negro, con un lazo de fuego dibujado dentro—. Yo no tengo Incineroar. Nunca lo he tenido. Esto no es mío: es del paso.' },
			{ text: 'Te pone en la mano el **Incinostal Z**. Quema un poco. Luego, no.' },
			{ give: 'inciniumz' },
			{ set: { 'flag.p9_incinium': true } },
			{ say: 'kiawe', text: 'Solo lo puede usar un Incineroar, y solo con **Lariat Oscuro**. El paso de los brazos. Con la Pulsera Z, lo que hace es… —Se calla. Golpe de talón—. Lo vas a ver. No te lo cuento: el fuego no se cuenta.' },
			{ happy: { who: 'incineroar', n: 15 } },
			{ if: LUC, then: [
				{ text: '{riolu} ha mirado la danza entera desde una roca, muy quieto. Cuando Incineroar vuelve a tu lado, {riolu} le hace una reverencia corta, la misma que le hizo Kiawe el día de la prueba. Incineroar no se la devuelve. Pero no cruza los brazos.' },
			] },
			{ quest: 'p9_s_incinium', stage: 'hecha', done: true },
			{ say: 'rotom', text: '¡Bzzt! ¡Incinostal Z! Dáselo a tu Incineroar como objeto y, si sabe Lariat Oscuro y llevas la Pulsera Z, tendrá su movimiento Z en combate. ¡El suyo! ¡Apuntado!' },
			{ say: 'kiawe', text: 'Y cuando quieras verlo arder enfrente de otro cristal, ven. Yo tengo el mío. El fuego se entiende mejor de dos en dos.' },
			{ diary: 'Hoy nuestro Incineroar bailó con Kiawe en el borde del volcán Wela. Un paso de brazos que era del abuelo de Kiawe. El volcán echó un humo redondo cuando terminaron. ¡Bzzt! Yo intenté grabarlo y me salió el humo y un trozo de oreja de {riolu}. Es mi mejor vídeo igual.', cond: 'flag.b01_diario' },
			{ intel: { npc: 'kiawe', text: 'Enseñó a tu Incineroar la danza del lariat, el paso de su abuelo, en el borde del cráter del Wela. Te dio el Incinostal Z que guardaba en el pañuelo: «no es mío, es del paso». Ofrece una exhibición con su Pirostal Z.' } },
		],
		// Los tres pasos (compartido por Torracat/Litten e Incineroar)
		p9_danza_pasos: [
			{ text: 'Kiawe abre los brazos, muy despacio, hasta ponerlos en cruz. Se queda así. Las antorchas del escenario, abajo, suben un dedo.' },
			{ prompt: 'Primer paso. Kiawe espera con los brazos en cruz. ¿Qué le dices a tu Pokémon?', choice: [
				{ text: '«Los brazos. Abiertos. Y quieto.»', then: [
					{ set: { 'vars.p9_compas': '+1' } },
					{ text: 'Tu Pokémon abre los brazos. Se queda quieto. Le cuesta más lo segundo que lo primero. Kiawe asiente sin moverse.' },
				] },
				{ text: '«Gira.»', then: [
					{ text: 'Tu Pokémon gira. Kiawe no se mueve. «Todavía no. El lariat empieza parado. Lo difícil es estar parado con fuego dentro». Las antorchas bajan un dedo. Vuelven a subir.' },
				] },
				{ text: '«Haz lo que él haga.»', then: [
					{ set: { 'vars.p9_compas': '+1' } },
					{ text: 'Tu Pokémon mira a Kiawe y abre los brazos. Tarde, pero bien. «Mirar también es un paso», dice Kiawe. «El primero».' },
				] },
			] },
			{ text: 'Kiawe gira sobre el talón, una vuelta entera, con los brazos aún en cruz. El Marowak golpea la roca con el hueso: *tac*.' },
			{ prompt: 'Segundo paso. La vuelta. ¿Qué le dices?', choice: [
				{ text: '«Gira. Con los brazos abiertos.»', then: [
					{ set: { 'vars.p9_compas': '+1' } },
					{ text: 'Tu Pokémon gira con los brazos abiertos. Casi se cae. No se cae. El Marowak hace *tac*. Eso, en Marowak, es un aplauso.' },
				] },
				{ text: '«Cierra los brazos y gira.»', then: [
					{ text: 'Tu Pokémon cierra los brazos y gira, rápido. Kiawe sacude la cabeza. «Rápido es fácil. El lariat es lento hasta el final». El Marowak no hace *tac*.' },
				] },
				{ text: '«Espera a que termine él.»', then: [
					{ text: 'Tu Pokémon espera. Kiawe termina la vuelta y se queda mirándolo. «Ahora te toca a ti. El fuego no espera dos veces». Tu Pokémon gira, deprisa, para compensar. Las antorchas tiemblan.' },
				] },
			] },
			{ text: 'Kiawe cruza los brazos en el aire, con fuerza, y clava el talón en la roca. El golpe suena a hueco: el volcán, debajo, está escuchando.' },
			{ prompt: 'Tercer paso. El lariat: los brazos cruzados y el talón. ¿Qué le dices?', choice: [
				{ text: '«Cruza los brazos. Con todo. Y el talón.»', then: [
					{ set: { 'vars.p9_compas': '+1' } },
					{ text: 'Tu Pokémon cruza los brazos con tanta fuerza que el aire cruje, y clava la pata en la roca. El volcán contesta con un hilo de humo. Kiawe cierra los ojos un segundo.' },
				] },
				{ text: '«Suave. Que no se haga daño.»', then: [
					{ text: 'Tu Pokémon cruza los brazos despacio y apoya la pata. Kiawe abre los ojos. «Suave no es lariat. Suave es abrazo. También vale, pero no hoy». Lo repite, con todo. El volcán contesta.' },
				] },
				{ text: '«Salta.»', then: [
					{ text: 'Tu Pokémon salta. Kiawe se lleva la mano a la cara, pero se le escapa algo que podría ser una risa. «Mi abuelo también saltaba. Decía que estaba mal. Lo hacía igual». Lo repiten, sin salto. El volcán contesta.' },
				] },
			] },
			{ if: 'vars.p9_compas >= 3', then: [
				{ say: 'kiawe', text: 'Tres de tres. A la primera. —Golpe de talón—. Yo tardé un año. No se lo digas a mi abuelo. Bueno. Díselo.' },
			], else: [
				{ say: 'kiawe', text: 'Ha costado. —Golpe de talón—. El fuego se ha apagado dos veces y se ha encendido tres. Eso es la danza entera: lo demás son pasos.' },
			] },
			{ set: { 'vars.p9_compas': 0 } },
		],
		p9_kiawe_reto: [
			{ set: { 'flag.p9_kiawe_z_visto': true } },
			{ say: 'kiawe', text: 'Dos cristales en el mismo escenario. El tuyo y el mío. —Se ajusta el pañuelo del cuello—. Quiero verlos arder a la vez. No para ganar. Para saber cómo suenan juntos.' },
			{ prompt: '¿Combate de exhibición contra Kiawe? (Usa un movimiento Z con su Marowak)', choice: [
				{ text: '«Que ardan.»', then: [
					{ text: 'Kiawe te lanza una bolsa de cuero: bayas, una Hiperpoción y un trozo de pan de la granja de su familia. «Primero come el equipo. Luego el fuego».' },
					{ heal: 'Tu equipo come a la sombra de la única roca que no quema. PS y PP al máximo.' },
					{ battle: 'p9_kiawe_z', lose: 'continue', onWin: [
						{ text: 'El Marowak de Kiawe clava el hueso en la roca y se sienta, jadeando, con las llamas verdes bajas. Kiawe se agacha a su lado y le pasa la mano por el cráneo. Luego se levanta.' },
						{ say: 'kiawe', text: 'Dos fuegos y ninguno se ha apagado. —Mira el cráter—. Mi abuelo decía que eso solo pasa cuando los dos saben para quién arden. Toma. De la granja. Es lo que hay.' },
						{ give: 'moomoomilk', n: 3 },
						{ give: 'charcoal' },
						{ say: 'kiawe', text: 'Y el Carbón, para el tuyo. No lo necesita. Pero el fuego agradece que le traigan leña aunque no le haga falta.' },
					], onLose: [
						{ say: 'kiawe', text: 'Te ha quemado el mío. Pasa. —Golpe de talón—. Mañana baila mejor. El fuego también. Vuelve.' },
						{ heal: true },
					] },
				] },
				{ text: '«Hoy no.»', then: [
					{ say: 'kiawe', text: 'Hoy no. —Sigue bailando—. El fuego no se ofende. Se guarda.' },
				] },
			] },
		],
	},
};
