// Bloque 5 · Secundaria grande (2026-10-23): «Lo que no crece» (~1 h 45).
// Idea de ChatGPT: un Pokémon cumple los requisitos para evolucionar y se niega. Parece una avería; es una razón.
// Rancho Ohana (Akala). Terrón, el Mudbray de Don Kekoa (el señor del abrevadero de T1), lleva veinte niveles sin
// evolucionar. La capataza, Kalena (la de T1, hija de Kekoa), cree que es la silla con sensores que le hizo Leilani.
// Taller Kahale (cerradura del panel → el registro de la silla: el mismo peso cada mañana) → el alba en el abrevadero
// (Kekoa ya no puede subir a algo más alto que un Mudbray, y Terrón lo sabe) → la piedra de montar (puzle) y la libreta
// de Kekoa (read) → Leilani hace un estribo «para cuando él quiera» → Kekoa da su caracola (objeto clave, PX_ITEMS)
// → la caracola abre la Hondonada de los Mudbray en la Ruta 4 (donde nació Terrón). Amistoso opcional con Kekoa y Terrón.
// Terrón NO evoluciona aquí: el cierre queda para un bloque futuro (flag `b05_terron_estribo`, ver secreto/hilos.md).
// Empieza tras el Ride Gear (`b05_ridegear`) y la primera visita al rancho. No toca ninguna misión de T1.

const LUC = '(inParty("riolu") || inParty("lucario"))';
const Q = 'quest.b05_s_terron';
const ABRE = 'flag.b05_ridegear && visited("rancho_ohana")';
const HECHA = 'done.b05_s_terron';
const KALENA_LOOK = { hair: 'braids', hairColor: '#6a6a6a', outfit: '#8a5a2f', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'sharp', mouth: 'smile', acc: 'hat', hatColor: '#c9a66b' };

export default {
	// =====================================================================
	// NPCs
	// =====================================================================
	npcs: {
		// La capataza del Rancho Ohana de T1 (mismo aspecto que `capataza_ohana`, para que se reconozca). Brief: trenzas
		// grises bajo el sombrero de ala ancha · silbato al cuello · chaleco de cuero. Habla en órdenes y en refranes que no lo son.
		kalena: { name: 'Kalena', title: 'Capataza del Rancho Ohana', look: KALENA_LOOK },
		// Don Kekoa, el señor del abrevadero de T1 («setenta años bebiendo de aquí»). Brief: bigote blanco · sombrero de
		// paniolo con cinta de flores secas · camisa abrochada hasta arriba. Lento, orgulloso, chistes secos.
		kekoa: { name: 'Don Kekoa', title: 'Ranchero de Pueblo Ohana', look: { hair: 'short', hairColor: '#d8d4cc', outfit: '#e9e3d0', outfit2: '#8a5a2f', skin: 4, eyes: '#3a2a1e', eyesStyle: 'sleepy', mouth: 'smile', brows: 'thick', head: 'long', nose: 'hook', collar: 'shirt', age: 'old', acc: 'hat mustache', hatColor: '#a8784a' } },
	},

	// =====================================================================
	// LUGAR NUEVO: la Hondonada de los Mudbray (la abre la caracola de Kekoa)
	// =====================================================================
	locations: {
		hondonada_mudbray: {
			name: 'Hondonada de los Mudbray', short: 'Hondonada', region: 'alola', kind: 'area', map: { x: 62, y: 55 },
			bg: { type: 'ranch', ground: '#a85a3a', far: '#6a9a4a', hill: '#8a4a2a' },
			desc: 'Detrás de la hierba alta de la Ruta 4, el suelo baja de golpe y se vuelve rojo: una hondonada de barro tibio, con charcas que humean un poco por la mañana y helechos en el borde. Aquí no llega el ruido del puerto.\n\nEn el barro hay huellas pequeñas, muchas, de cascos redondos. Y en la pared de tierra, un hueco liso, gastado, del tamaño exacto de un Mudbray tumbado.',
			descNight: 'De noche, la hondonada es un sitio de respiraciones. Los Mudbray duermen pegados unos a otros en el barro tibio, y de vez en cuando uno resopla y todos cambian de postura a la vez. El cielo se ve entero desde el fondo, como desde un pozo.',
			links: ['alola_ruta4'],
			hidden: '!flag.b05_hondonada_abierta',
			enterCond: 'flag.b05_hondonada_abierta',
			blockedMsg: 'La hierba alta es un muro. Detrás se oyen resoplidos y cascos, pero no hay manera de pasar sin que la manada te deje.',
			mapNote: 'Manada de Mudbray · barro y bayas · donde nació Terrón',
			spots: [
				{ label: 'Explorar el barro', sub: 'Huellas redondas por todas partes', icon: '🐾', action: { explore: 'grass' } },
				{ label: 'Las matas de bayas del borde', sub: 'Los Mudbray las dejan para el final', icon: '🧺', new: '!flag.rec_b05_hondonada_bayas', action: { gather: 'b05_hondonada_bayas' } },
				{ label: 'La pared de barro rojo', sub: 'Blanda, con cosas dentro', icon: '⛏️', new: '!flag.rec_b05_hondonada_barro', action: { gather: 'b05_hondonada_barro' } },
				{ label: 'El hueco liso de la pared', sub: 'Del tamaño exacto de un Mudbray tumbado', icon: '🪨', talk: [{ script: 'b05_hondonada_cuna' }] },
				{ label: 'Tocar la caracola', sub: 'Un sonido largo y grave', icon: '🐚', cond: 'has("caracolakekoa")', talk: [{ script: 'b05_hondonada_tocar' }] },
			],
			rumors: [
				{ text: 'En Ohana dicen que todos los Mudbray del rancho nacieron en la Hondonada, y que vuelven a revolcarse en su barro cuando están tristes. Kalena dice que no. Kalena lleva barro rojo en las botas.' },
				{ text: 'El barro de la Hondonada no se seca nunca del todo. Los Mudsdale de las vallas lo echan de menos: se nota en cómo miran hacia aquí.' },
			],
			encounters: {
				grass: [
					{ sp: 'mudbray', lv: [55, 57], w: 34 },
					{ sp: 'mudsdale', lv: [56, 58], w: 14 },
					{ sp: 'tauros', lv: [55, 57], w: 14 },
					{ sp: 'stoutland', lv: [55, 57], w: 14 },
					{ sp: 'miltank', lv: [55, 57], w: 10 },
					{ sp: 'lycanroc', lv: [56, 58], w: 6, time: 'day' },
					{ sp: 'lycanrocmidnight', lv: [56, 58], w: 6, time: 'night' },
					{ sp: 'whiscash', lv: [55, 57], w: 2, displaced: true },
				],
			},
		},
	},

	// =====================================================================
	// SPOTS EN LUGARES DE T1 (mismo bloque)
	// =====================================================================
	extraSpots: {
		rancho_ohana: [
			{ label: 'La capataza, con un Mudbray pequeño', sub: 'Lo mira como si fuera una cerca rota', icon: '🐴', cond: ABRE + ' && !' + Q, new: 'true', talk: [{ script: 'b05_terron_inicio' }] },
			{ label: 'Pedirle el pajar a Kalena', sub: 'Para ver el alba desde el rancho', icon: '🌅', cond: Q + ' == "alba"', new: 'true', talk: [{ script: 'b05_terron_alba' }] },
			{ label: 'Kalena', sub: 'Con el silbato entre los dientes', icon: '🤠', cond: '!!' + Q + ' && !(' + Q + ' == "alba")', talk: [
				{ cond: HECHA, script: 'b05_kalena_despues' },
				{ script: 'b05_kalena_espera' },
			] },
		],
		ohana: [
			{ label: 'La piedra de montar del abrevadero', sub: 'Piedras sueltas y una cancela torcida', icon: '🪨', cond: Q + ' == "montadero"', new: 'true', talk: [{ script: 'b05_terron_montadero' }] },
			{ label: 'Don Kekoa y Terrón', sub: 'En el abrevadero, sin prisa', icon: '🐴', cond: Q + ' == "kekoa"', new: 'true', talk: [{ script: 'b05_terron_kekoa' }] },
			{ label: 'Don Kekoa y Terrón', sub: 'El estribo cuelga del abrevadero', icon: '🐴', cond: HECHA, new: '!beat("kekoa_terron")', talk: [
				{ cond: '!beat("kekoa_terron")', script: 'b05_kekoa_duelo' },
				{ script: 'b05_kekoa_despues' },
			] },
		],
		taller_kahale: [
			{ label: 'Enseñarle a Leilani la caja de la silla', sub: 'La de Terrón, con su antenita', icon: '📦', cond: Q + ' == "taller"', new: 'true', talk: [{ script: 'b05_terron_taller' }] },
			{ label: 'Pedirle a Leilani lo de Kalena', sub: '«Para cuando él quiera»', icon: '🔧', cond: Q + ' == "estribo"', new: 'true', talk: [{ script: 'b05_terron_estribo' }] },
		],
	},

	// Ruta 4: la entrada de la Hondonada (tramo 3, junto a la hierba alta)
	patches: {
		alola_ruta4: { route: { tramos: { 3: [
			{ talk: [{ script: 'b05_terron_caracola' }], label: 'La hierba alta que resopla', sub: 'Detrás se oyen cascos', icon: '🐚', cond: 'has("caracolakekoa") && !flag.b05_hondonada_abierta', new: 'true' },
			{ branch: { label: 'Bajar a la Hondonada de los Mudbray', sub: 'La manada te deja pasar', go: 'hondonada_mudbray', cond: 'flag.b05_hondonada_abierta' } },
		] } } },
	},

	// =====================================================================
	// MISIÓN
	// =====================================================================
	quests: {
		b05_s_terron: { name: 'Lo que no crece', type: 'side', est: 110, stages: {
			rancho: 'La capataza del **Rancho Ohana**, en **Pueblo Ohana**, tiene un Mudbray que no evoluciona. Cree que es culpa de su silla.',
			taller: 'Lleva la caja de la silla de Terrón al **taller Kahale**, en **Ciudad Kantai**. La hizo Leilani: ella sabrá abrirla.',
			alba: 'La silla carga el mismo peso cada mañana, a la misma hora. Pídele a **Kalena** el pajar del **Rancho Ohana** y mira qué pasa al alba.',
			montadero: 'La piedra de montar del abrevadero de **Pueblo Ohana** se está deshaciendo. Ayuda a Kalena a rehacerla.',
			estribo: 'Kalena quiere que **Leilani** haga algo para Terrón, «para cuando él quiera, no para ya». Ve al **taller Kahale** de **Ciudad Kantai**.',
			kekoa: 'Lleva el estribo a **Don Kekoa**, al abrevadero de **Pueblo Ohana**.',
			hondonada: 'Don Kekoa te dio su caracola. Tócala junto a la hierba alta del tramo 3 de la **Ruta 4**, donde nació Terrón.',
			hecha: 'Terrón sigue siendo un Mudbray, porque así lo quiere. El estribo espera colgado en el abrevadero de Ohana, por si un día cambia de idea.',
		} },
	},

	// =====================================================================
	// ENTRENADOR (amistoso, opcional)
	// =====================================================================
	trainers: {
		kekoa_terron: { name: 'Don Kekoa', cls: 'Ranchero', npc: 'kekoa', ai: 3, iv: 26, reward: 3480, bg: 'ranch', terrain: 'grass',
			team: [
				{ sp: 'tauros', lv: 57, moves: ['doubleedge', 'earthquake', 'zenheadbutt', 'rockslide'], ability: 'intimidate', nature: 'adamant' },
				{ sp: 'mudbray', lv: 58, moves: ['highhorsepower', 'heavyslam', 'rockslide', 'irondefense'], ability: 'owntempo', item: 'eviolite', nature: 'impish' },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Una vez. Para que veas que a este no le falta nada. Kalena, aparta, que te salpica.',
			win: 'Bien peleado. Él también, ¿eh? Míralo. Ni un rasguño de vergüenza.',
			lose: 'Setenta años y todavía gano alguna. No se lo cuentes a mi hija; se pone insoportable.' },
	},

	// =====================================================================
	// OBJETOS Y RECOLECCIÓN
	// =====================================================================
	items: {
		cajasilla: { name: 'Caja de la silla de Terrón', pocket: 'key', desc: 'Una cajita de metal con remaches de cobre, una antenita y dos luces, una verde y una roja. Va atornillada debajo de la silla de Terrón. Lleva un sello de cera con una «K» de Kahale.' },
		registrosilla: { name: 'Registro de la silla', pocket: 'key', desc: 'Una tira de papel térmico que sacó la impresora del taller Kahale, larga como un brazo. Números, horas y una línea que sube y baja todos los días a la misma hora.',
			read: '*(Papel térmico, letra de impresora. Arriba, a bolígrafo, la letra rapidísima de Leilani.)*\n\n**SILLA K-07 · «TERRÓN» · ÚLTIMOS 60 DÍAS**\n\nCarga en el lomo, por día (kg):\n\n06:08–06:31 · **71** · 71 · 70 · 71 · 72 · 71 · 71 · 70 · 71 · 71 · 71 · 69 · 71…\n\nResto del día · 0 · 0 · 0 · 0 · 0 · 0 · 0…\n\nSalto de luz (¿evolución?) · día 12, 19:02 · día 31, 18:54 · día 47, 19:10 · **cancelado** las tres veces, a los 4 s.\n\nTemperatura del lomo durante la carga: estable. Pulso: estable. Pasos: cortos, iguales, como contados.\n\n*(A bolígrafo:)* La silla no frena nada. Solo mide. Lo que mide es que alguien de unos 70 kilos se sube a Terrón todas las mañanas antes de que salga el sol, durante veintitrés minutos, y se baja. Siempre el mismo camino. Siempre los mismos minutos.\n\nKalena pesa 58. Lo sé porque me lo dijo para que le hiciera la silla y luego me hizo jurar que no lo repetiría. Ups.\n\n—L.' },
		fotoalba: { name: 'Foto «El alba del abrevadero»', pocket: 'key', art: 'alba_abrevadero', desc: 'La foto que hizo Rotom desde el pajar del Rancho Ohana, antes de que saliera el sol: un señor con sombrero sobre un Mudbray, junto al abrevadero de Ohana, con la niebla a la altura de las rodillas. Rotom no usó el flash. Dice que «no tocaba».' },
		libretakekoa: { name: 'Libreta de Don Kekoa', pocket: 'key', desc: 'Una libreta de recibos de pienso del almacén de Ohana, con las tapas reblandecidas. Por delante, los recibos. Por detrás, en la parte en blanco, una letra grande y temblona.',
			read: '*(En el reverso de los recibos de pienso. Lápiz de carpintero. Letra grande, que tiembla un poco y se endereza al final de cada línea.)*\n\nLunes. La rodilla, mal. Terrón me esperó en la piedra. Me subí a la primera.\n\nMartes. A la segunda.\n\nMiércoles. La piedra se mueve. Terrón se agachó para que yo llegara. No se lo enseñé. Lo aprendió solo.\n\nJueves. Kalena dice que a Terrón le toca crecer, que en un rancho de Mudsdale un Mudbray da risa. Tiene razón en lo de la risa. Me reí.\n\nViernes. Esta tarde Terrón se encendió entero, como un farol. Luego se sacudió y se apagó. Me miró. Yo no le dije nada. No sé qué le habría dicho.\n\nSábado. Si crece, no llego. Si no crece, Kalena sufre. Que decida él, que es el que carga.\n\nDomingo. No escribo nada. Los domingos no se escribe. Pero hoy tampoco me caí.\n\n*(Más abajo, con otra presión de lápiz, más reciente:)* Kalena no tiene que saberlo. Ya tiene un rancho que llevar.' },
		estribokoa: { name: 'Estribo de koa', pocket: 'key', desc: 'Una escalerita plegable de madera de koa, con tres peldaños, bisagras de cobre y una correa para colgarla de una silla de montar. Plegada cabe bajo el brazo. Desplegada, llega a la altura de un Mudsdale. Leilani grabó en el lateral: «para cuando quieras».' },
		caracolakekoa: { name: 'Caracola de Kekoa', pocket: 'key', desc: 'Una caracola grande, rosada por dentro, con la punta limada para soplar y un cordón rojo trenzado. Era de Don Kekoa: con ella llamaba a la manada de la Hondonada de los Mudbray, en la Ruta 4. Suena grave, largo, como un mugido lejano.' },
	},
	gather: {
		b05_hondonada_bayas: {
			name: 'Matas de bayas de la Hondonada', icon: '🧺', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'huerto', hint: 'Los Mudbray se comen las bayas que caen al barro. Las de arriba, para la cesta.' },
			ask: 'Las matas del borde de la hondonada están cargadas. Un Mudbray pequeño te mira desde el barro, esperando a que se caiga alguna.',
			text: 'Las matas de la Hondonada sueltan lo suyo. Un Mudbray se queda con las que caen al barro y no te parece mal.',
			wait: 'Hoy las matas ya dieron lo que tenían. Lo que queda, se lo ha comido la manada. Con toda la razón.',
			table: [
				{ id: 'sitrusberry', w: 18, n: [1, 2] },
				{ id: 'lumberry', w: 12, n: [1, 1] },
				{ id: 'leppaberry', w: 14, n: [1, 2] },
				{ id: 'oranberry', w: 18, n: [1, 3] },
				{ id: 'pomegberry', w: 8, n: [1, 2] },
				{ id: 'tamatoberry', w: 8, n: [1, 2] },
				{ id: 'shucaberry', w: 4, n: [1, 1], rare: true },
				{ id: 'chopleberry', w: 3, n: [1, 1], rare: true },
			],
		},
		b05_hondonada_barro: {
			name: 'Pared de barro rojo', icon: '⛏️', hours: 22, picks: [1, 2],
			game: { type: 'dig', level: 2, theme: 'cantera', hint: 'El barro es blando, pero se derrumba enseguida. Pico fino.' },
			ask: 'La pared de la hondonada es de barro rojo, blando como pan. Entre las capas asoman cosas que brillan.',
			text: 'El barro rojo suelta lo que guardaba. Te llenas hasta los codos. Los Mudbray te miran con envidia.',
			wait: 'La pared ya está bastante escarbada por hoy. Si sigues, se te cae encima, y aquí nadie te iba a sacar más que la manada.',
			table: [
				{ id: 'softsand', w: 18, n: [1, 1] },
				{ id: 'hardstone', w: 14, n: [1, 1] },
				{ id: 'stardust', w: 14, n: [1, 2] },
				{ id: 'heartscale', w: 8, n: [1, 1] },
				{ id: 'everstone', w: 5, n: [1, 1] },
				{ id: 'nugget', w: 2, n: [1, 1], rare: true },
				{ id: 'rarebone', w: 2, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ---------- 1. La capataza y el Mudbray que no crece ----------
		b05_terron_inicio: [
			{ text: 'Junto a la cerca del corral, la capataza tiene sujeto por el ronzal a un Mudbray. Es pequeño para ser de este rancho: le llega a la cintura. Lleva una silla de cuero con una cajita de metal atornillada debajo, una antenita y dos luces.' },
			{ say: 'kalena', as: 'Capataza', text: 'Tú. {El|La|Le} del brazalete de la chica Kahale. Ven. No, no vengas a entrenar. Ven a mirar. Hoy sí se mira desde dentro de la cerca.' },
			{ cutscene: { time: 'tarde', bg: { type: 'ranch', ground: '#7aa05a', far: '#e9a05a' }, start: 'light', cam: 'still', frames: [
				{ actors: [{ id: 'kalena', at: 'left', dim: true }], on: '_c', mon: 'mudbray', text: 'El Mudbray está quieto. Respira despacio, con las patas muy abiertas, como quien se planta.' },
				{ color: '#ffe8a8', cam: 'push', fx: 'glow', text: 'Y de pronto se enciende. Una luz blanca le sube desde los cascos, le envuelve el lomo, le crece por el cuello. Es esa luz. La que todo el mundo conoce.' },
				{ actors: [{ key: '_c', do: 'shake' }], fx: 'shake', shake: 1, text: 'A los cuatro segundos, el Mudbray se sacude. Fuerte. Como un perro mojado. La luz se le cae a trozos al suelo y se apaga en la hierba.' },
				{ actors: [{ key: 'kalena', dim: false, emote: '...' }, { key: '_c', do: 'idle' }], cam: 'pull', text: 'Se queda igual que estaba. Pequeño. Mira a la capataza. Parpadea. Vuelve a comer hierba.' },
			] } },
			{ say: 'kalena', as: 'Capataza', text: 'Cuarta vez. Terrón tiene nivel para ser Mudsdale desde hace años. Casi treinta niveles de más. Lo he visto encenderse cuatro veces. Las cuatro se sacude y se apaga.' },
			{ say: 'kalena', text: 'Kalena. Capataza de esto. —Se toca el sombrero—. El veterinario dice que está sano. No tiene Piedra Eterna, le revisé hasta los dientes. No es la edad, no es la comida, no es el agua.' },
			{ say: 'kalena', text: 'Es la silla. Tiene que ser la silla. La chica Kahale le puso esa caja con antena para medirle el paso, y desde que la lleva, nada. Una cosa de esas, con luces, seguro que frena algo. «Interferencia», dice ella siempre.' },
			{ prompt: 'Kalena te mira el brazalete.', choice: [
				{ text: '«¿Y si no quiere evolucionar?»', then: [
					{ say: 'kalena', text: '¿Querer? —Resopla—. Los Mudbray crecen. Es lo que hacen. Como la hierba. La hierba no quiere; crece. —Pausa—. Es un decir.' },
				] },
				{ text: '«¿Por qué tanta prisa?»', then: [
					{ say: 'kalena', text: 'Esto es un rancho de Mudsdale. Vienen compradores de todo Akala. Y en el corral, el Mudbray de mi padre, que les llega a la hebilla. Se ríen. —Se encoge de hombros—. A mí no me importa que se rían. A él sí, seguro.' },
				] },
				{ text: '«¿Por qué me lo pides a mí?»', then: [
					{ say: 'kalena', text: 'Porque llevas su brazalete. La chica Kahale no le hace caso a nadie, pero a ti te hizo eso. Y porque le debo dos sillas y una disculpa, y no pienso ir yo a pedirle un favor encima.' },
				] },
			] },
			{ say: 'kalena', text: 'Terrón es de mi padre, por cierto. De Don Kekoa. El del abrevadero. Él dice que lo deje en paz. Mi padre dice eso de todo. —Desatornilla la cajita de la silla con una navaja y te la pone en la mano—. Llévasela a Kantai. Que la abra. Que me diga qué le hace.' },
			{ give: 'cajasilla' },
			{ if: LUC, then: [
				{ text: 'Mientras te la guardas, {riolu} se queda mirando a Terrón. El Mudbray le devuelve la mirada, tranquilo, mascando. {riolu} ladea la cabeza, como cuando algo no le cuadra pero tampoco le preocupa.' },
			] },
			{ quest: 'b05_s_terron', stage: 'taller' },
			{ intel: { npc: 'kalena', text: 'Kalena, capataza del Rancho Ohana e hija de Don Kekoa. El Mudbray de su padre, Terrón, empieza a evolucionar y se sacude la luz cada vez. Ella cree que es la silla con sensores que le hizo Leilani.' } },
		],
		b05_kalena_espera: [
			{ if: Q + ' == "taller"', then: [
				{ say: 'kalena', text: '¿Todavía con la caja en el bolsillo? Kantai está bajando la Ruta 4. La chica Kahale está debajo de alguna silla. Se la encuentra por los gritos.' },
				{ end: true },
			] },
			{ if: Q + ' == "montadero"', then: [
				{ say: 'kalena', text: 'Mi padre ha vuelto a la casa. No le he dicho nada. Él tampoco a mí. Así llevamos treinta años y nos va bien. —Mira hacia el pueblo—. La piedra del abrevadero. Si me ayudas, la rehacemos antes de mañana.' },
				{ end: true },
			] },
			{ if: Q + ' == "estribo"', then: [
				{ say: 'kalena', text: 'Para cuando él quiera. No para ya. Díselo así a la chica Kahale. Si le dices «para ya», lo hace en una hora y explota.' },
				{ end: true },
			] },
			{ if: Q + ' == "kekoa" || ' + Q + ' == "hondonada"', then: [
				{ say: 'kalena', text: 'Mi padre está en el abrevadero. Ve tú. Si voy yo, le pongo nervioso. Y si le pongo nervioso, me pone nerviosa. Es de familia.' },
				{ end: true },
			] },
			{ say: 'kalena', text: 'Tres combates sin caerte y algo te llevas. Lo de Terrón es aparte. Lo de Terrón no se gana.' },
		],

		// ---------- 2. El taller: la cerradura del panel y el registro ----------
		b05_terron_taller: [
			{ text: 'Le enseñas la cajita a Leilani. La reconoce antes de que termines de sacarla: se le iluminan los ojos y se le caen dos tornillos de la boca.' },
			{ say: 'leilani', text: '¡La K-07! ¡La silla de Terrón! ¡Mi primera silla con telemetría! ¿Qué le pasa? ¿Explotó? Dime que no explotó. Si explotó, dime que fue bonito.' },
			{ text: 'Le cuentas lo de Kalena, lo de la luz, lo de las cuatro veces. Leilani se pone seria de golpe, cosa que en ella dura muy poco.' },
			{ say: 'leilani', text: '¿Que mi silla frena una evolución? —Se cruza de brazos—. No. No, no, no. Mis cosas explotan, se incendian, a veces muerden, pero no FRENAN. Frenar es de cobardes. Vamos a abrirla, ¿sí o qué?' },
			{ say: 'soldabot', text: 'Advertencia. La señorita selló ese panel con un código de seguridad «que no se me va a olvidar nunca». Fecha: hace siete meses. Probabilidad de que lo recuerde: cuatro por ciento.' },
			{ say: 'leilani', text: 'Cuatro por ciento es un montón. Es más que cero. Ayúdame: tú aprietas las runas y yo te digo «¡esa no!».' },
			{ minigame: {
				type: 'lock', id: 'b05_terron_panel', title: 'El panel de la silla K-07', level: 2, theme: 'caja',
				hint: 'Leilani se acuerda del orden si lo ve encenderse. Más o menos. Repite la secuencia.',
				guaranteed: ['registrosilla'], picks: 0, consolation: false, lootTitle: 'Dentro del panel',
			}, onWin: [
				{ text: 'El panel se abre con un clic y un olor a cobre caliente. Dentro, en vez de nada que frene nada, hay una tarjeta de memoria y una impresora del tamaño de una caja de cerillas. Leilani la conecta a su mesa. La impresora del taller escupe una tira larguísima.' },
				{ read: 'registrosilla' },
				{ say: 'leilani', text: 'La silla no hace nada. Mide. Y lo que mide es raro. —Pasa el dedo por la línea—. Todos los días, a las seis y algo de la mañana, se sube alguien encima. Unos setenta kilos. Veintitrés minutos. Se baja. El resto del día, nada.' },
				{ say: 'leilani', text: 'Siempre los mismos minutos. Siempre los mismos pasos, cortos, iguales. Como contados. —Te mira—. Kalena pesa cincuenta y ocho. Eso no lo has oído. Lo de los setenta tampoco es ella.' },
				{ say: 'soldabot', text: 'Conclusión: el problema no está en la silla. Está encima de ella. Excelente deducción, señorita. Para ser humana.' },
				{ say: 'leilani', text: 'Calla, Soldi. —Pero sonríe—. Vuelve al rancho. Pídele a Kalena el pajar y mira quién se sube a Terrón antes de que salga el sol. Y si es un fantasma, me llamas, que siempre quise hacer una silla para fantasmas.' },
				{ af: { leilani: 2 } },
				{ quest: 'b05_s_terron', stage: 'alba' },
			], onLose: [
				{ say: 'soldabot', text: 'Cerradura trabada. Cuatro por ciento era generoso. Reiniciando el panel en tres, dos…' },
				{ say: 'leilani', text: 'Otra vez. Ahora sí me acuerdo. Creo. Era algo con un siete.' },
			], onQuit: [
				{ say: 'leilani', text: 'Ok, descansamos. Yo tampoco me acuerdo. Me lo apunté en la mano y me lavé las manos. Error de principiante.' },
			] },
		],

		// ---------- 3. El alba en el abrevadero ----------
		b05_terron_alba: [
			{ say: 'kalena', text: '¿El pajar? ¿Para ver quién se sube a Terrón? —Te mira largo rato. Algo se le mueve en la cara—. Te dejo una manta. Y yo me quedo contigo. No porque me fíe. Porque es mi rancho.' },
			{ text: 'Esa noche duermes mal, en el heno, con Kalena a dos balas de paja y la puerta del establo entornada. Antes de las seis, Kalena te despierta con un dedo en los labios. Fuera hay niebla a la altura de las rodillas y una luz gris que aún no es día.' },
			{ cutscene: { time: 'manana', weather: 'fog', bg: { type: 'town', roofs: ['#8a5a2f', '#c4743a', '#e9c46a'], far: '#8aa0a8' }, start: 'dark', frames: [
				{ actors: [{ mon: 'mudbray', key: 'terron', at: 0.66, enter: 'fade' }], cam: 'still', fx: 'light', text: 'En la plaza de Ohana, junto al abrevadero, Terrón espera. Solo. Al lado de una piedra baja, plana, gastada por el medio.' },
				{ actors: [{ id: 'kekoa', at: 'left', enter: 'left' }], cam: 'pan-left', text: 'Por la calle baja un señor muy mayor, con sombrero y bastón. Camina despacio. Muy despacio. Se para cada pocos pasos, con la mano en la rodilla.' },
				{ actors: [{ key: 'kekoa', at: 0.46, do: 'step' }], text: 'Llega a la piedra. Sube un pie. Le tiembla la pierna. Lo baja. Lo intenta otra vez.' },
				{ actors: [{ key: 'terron', do: 'bow' }], cam: 'push', text: 'Y Terrón se agacha. Dobla las patas delanteras, despacio, hasta que el lomo le queda a la altura exacta de la piedra.' },
				{ actors: [{ key: 'kekoa', at: 0.6, do: 'hop' }, { key: 'terron', do: 'nod' }], color: '#f2d8a8', fx: 'rays', text: 'El señor se sienta en la silla. Le da dos palmadas en el cuello. Terrón se levanta, sin un tirón, y echan a andar alrededor del abrevadero. Pasos cortos. Iguales. Como contados.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.12, size: 's', enter: 'fade' }], fx: 'aura', on: 'rio', text: 'A tu lado, {riolu} mira a Terrón con el aura encendida. No está atascada, la de Terrón. Está quieta. Como la de quien se sienta a esperar a alguien.' },
				{ cam: 'pull', fx: 'iris-out', on: 'terron', text: 'Veintitrés minutos. Luego Terrón se vuelve a agachar junto a la piedra y el señor se baja. Beben los dos del abrevadero. Él con las manos. Terrón con la boca.' },
			] } },
			{ text: 'Kalena no dice nada durante mucho rato. Tiene las manos agarradas a la manta.' },
			{ say: 'kalena', text: 'Me dijo que ya no montaba. Hace dos años. Que estaba viejo para eso, que se iba a dar paseos andando. —Se quita el sombrero y le da vueltas—. Andando. Hasta el abrevadero. Todos los días.' },
			{ say: 'kalena', text: 'Un Mudsdale es el doble de alto. Con esa rodilla no llega. Ni con esa piedra. —Mira a Terrón, que bebe—. Y él lo sabe. El muy… Lo sabe.' },
			{ text: 'Rotom asoma por tu hombro. Ha hecho una foto desde el pajar, sin flash. Te la enseña en la pantalla sin decir nada, por una vez.' },
			{ give: 'fotoalba' },
			{ say: 'kalena', text: 'No le voy a decir que lo he visto. Si se lo digo, deja de venir. Lo conozco. —Se pone el sombrero—. Pero esa piedra se está deshaciendo. Mírala. Un día se le mueve y se cae. Ayúdame a rehacerla. Hoy. Antes de que vuelva mañana.' },
			{ happy: { who: 'riolu', n: 4 }, cond: LUC },
			{ quest: 'b05_s_terron', stage: 'montadero' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo dormimos en un pajar. ¡Pica muchísimo! Pero valió la pena: antes del amanecer vimos a un señor muy mayor montar en un Mudbray que se agachaba para él. Hice una foto sin flash. Hay fotos que se hacen en silencio. Esa era una. ¡Bzzt! (bajito)', cond: 'flag.b01_diario' },
		],

		// ---------- 4. La piedra de montar (puzle) y la libreta ----------
		b05_terron_montadero: [
			{ if: '!flag.b05_terron_montadero_visto', then: [
				{ set: { 'flag.b05_terron_montadero_visto': true } },
				{ text: 'Junto al abrevadero, la piedra de montar ya no es una piedra: son tres, mal encajadas, y una se mueve cuando la pisas. Al lado está el corral pequeño de Terrón, con la cancela torcida y dos piedras planas tiradas en la hierba.' },
				{ say: 'kalena', text: 'Antes eran tres escalones. Los puso mi madre, para ella, cuando yo era niña. Mi padre nunca los usó: decía que eran para gente sin piernas. —Pausa—. Ahora sí los usa. Lo que queda de ellos.' },
				{ say: 'kalena', text: 'Las dos piedras planas van en sus marcas, al pie del corral. Con las dos puestas, la cancela vuelve a cerrar derecha y Terrón llega a la piedra sin dar la vuelta por el barro. Empuja. Yo no puedo con ellas. Tú tampoco, pero tú eres más joven.' },
			] },
			{ puzzle: {
				id: 'b05_terron_montadero', title: 'La piedra de montar',
				hint: 'Las dos piedras planas van sobre sus marcas. Con las dos puestas, la cancela se abre y Terrón llega a la piedra.',
				theme: 'ruina',
				grid: [
					'#######',
					'#P..#.#',
					'#.R...#',
					'#..R#.#',
					'#S.S#D#',
					'#...#G#',
					'#######',
				],
			}, onSolve: [
				{ text: 'La segunda piedra encaja en su marca con un golpe que se oye en todo el pueblo. La cancela se cierra derecha por primera vez en años. Kalena empuja la piedra de montar con la bota: no se mueve.' },
				{ text: 'Al apartar la última losa suelta, debajo, envuelta en una bolsa de pienso doblada en cuatro, hay una libreta. Las tapas están blandas de tanta humedad.' },
				{ give: 'libretakekoa' },
				{ say: 'kalena', text: 'Es de los recibos del almacén. Mi padre los guarda todos. —La abre por detrás. Ve la letra. Se sienta en el borde del abrevadero—. Léela tú. En voz alta no. Léela tú y ya.' },
				{ read: 'libretakekoa' },
				{ text: 'Cuando levantas la vista, Kalena está mirando el agua del abrevadero. Tiene la libreta cerrada en las rodillas.' },
				{ say: 'kalena', text: '«Kalena no tiene que saberlo». —Lo repite sin voz—. Treinta años igual. Él no dice las cosas y yo no las pregunto. Y en medio, un Mudbray haciendo de mensajero.' },
				{ prompt: 'Kalena no te mira. Espera algo.', choice: [
				{ text: '«Terrón no está roto. Está ocupado.»', then: [
						{ say: 'kalena', text: 'Ocupado. —Casi se ríe—. Sí. Tiene trabajo. El trabajo más tonto y más importante del rancho, y yo intentando ascenderlo.' },
					] },
					{ text: '«Crecer no lo haría mejor. Solo más alto.»', then: [
						{ say: 'kalena', text: 'En un rancho se mide todo por la alzada. Las cercas, las sillas, los precios. —Mira a Terrón, a lo lejos—. A él no. A él que lo mida otro.' },
					] },
					{ text: '«¿Se lo vas a decir a tu padre?»', then: [
						{ say: 'kalena', text: 'No. Si se lo digo, deja de venir por orgullo. Y entonces sí que se queda sin piernas. —Aprieta la libreta—. Pero algo voy a hacer. Que no se diga.' },
					] },
				] },
				{ say: 'kalena', text: 'No quiero que crezca. No ahora. Pero tampoco quiero que no pueda crecer por nosotros. Que sea su decisión, no la rodilla de mi padre. —Se levanta—. La chica Kahale. Que haga algo para subirse a un Mudsdale. Plegable. Bonito. Para cuando él quiera. No para ya.' },
				{ quest: 'b05_s_terron', stage: 'estribo' },
				{ intel: { npc: 'kekoa', text: 'Don Kekoa ya no puede subir a algo más alto que un Mudbray: tiene mal la rodilla. Terrón lo lleva cada mañana al abrevadero de Ohana y se agacha para él. Por eso se sacude la evolución. Kalena no lo sabía; lo escribía él en una libreta de recibos.' } },
			], onQuit: [
				{ say: 'kalena', text: 'Descansa. Las piedras llevan ahí treinta años. Aguantan otra media hora.' },
			] },
		],

		// ---------- 5. El estribo de koa ----------
		b05_terron_estribo: [
			{ text: 'Le cuentas a Leilani lo del alba, la piedra y la libreta. No le enseñas la libreta: no es tuya. Leilani escucha sin interrumpir, que en ella es casi un milagro médico.' },
			{ say: 'leilani', text: 'O sea que mi silla medía a un señor muy terco. Sin querer. —Se rasca la nuca—. Es lo mejor que ha medido nunca una cosa mía. Lo voy a poner en el folleto. No. No lo voy a poner. Eso no se vende.' },
			{ say: 'leilani', text: '«Para cuando él quiera». —Lo dice despacio, probando las palabras—. Ok. Una escalerita. Plegable. Que cuelgue de la silla y que se despliegue hasta la altura de un Mudsdale. Madera, no metal: el metal en el lomo se enfría por la mañana.' },
			{ cutscene: { bg: { type: 'indoor', wall: '#5a4a3a', floor: '#3a3a40' }, start: 'light', cam: 'push', frames: [
				{ actors: [{ id: 'leilani', at: 'left' }], weather: 'sparks', text: 'Leilani trabaja dos horas sin hablar. Sierra, lija, bisagras de cobre, una correa de cuero. Soldi le pasa las piezas antes de que las pida.' },
				{ on: '_c', item: 'estribokoa', fx: ['sparkle', 'glow'], color: '#e0a868', text: 'Tres peldaños de madera de koa, plegados como un libro. En el lateral, con un pirograbador, Leilani escribe algo pequeño y lo sopla para que se enfríe.' },
				{ actors: [{ key: 'leilani', emote: 'heart' }], weather: 'none', cam: 'pull', text: '«Para cuando quieras». Sin firma. Leilani dice que las cosas buenas no se firman, que se firman las facturas.' },
			] } },
			{ give: 'estribokoa' },
			{ say: 'leilani', text: 'Llévaselo tú al señor. Si voy yo, me pongo a explicarle las bisagras y se aburre. Y dile a Kalena que las dos sillas que me debe ya están pagadas. Con esto. —Pausa—. La disculpa, no. La disculpa la quiero en persona.' },
			{ af: { leilani: 3 } },
			{ quest: 'b05_s_terron', stage: 'kekoa' },
		],

		// ---------- 6. Don Kekoa y la caracola ----------
		b05_terron_kekoa: [
			{ text: 'Don Kekoa está sentado en el borde del abrevadero, con el sombrero en las rodillas. Terrón bebe a su lado. Cuando te ve llegar con algo bajo el brazo, entorna los ojos.' },
			{ say: 'kekoa', text: 'Tú eres {el|la|le} del pajar. —No es una pregunta—. Mi hija no sabe esconder a nadie. Respira muy fuerte cuando está nerviosa. Desde niña.' },
			{ text: 'Le das el estribo. Lo despliega despacio, peldaño a peldaño. Lee lo que pone en el lateral. Se le mueve el bigote.' },
			{ take: 'estribokoa', cond: 'has("estribokoa")' },
			{ say: 'kekoa', text: '«Para cuando quieras». —Lo pliega otra vez—. Esto lo ha pedido Kalena. Lo sé porque es cabezota y bonito a la vez, como ella. Y lo ha hecho la chica Kahale, porque tiene la madera llena de chispas.' },
			{ say: 'kekoa', text: 'No lo voy a usar. Todavía no. Terrón no quiere, y yo no quiero que quiera por mí. —Le da una palmada en el cuello—. Pero que esté. Que esté colgado aquí, en el abrevadero, donde él lo vea cada mañana.' },
			{ text: 'Cuelga el estribo de un clavo del abrevadero, junto a su sombrero. Terrón lo huele. Lo mira un buen rato. Luego sigue bebiendo.' },
			{ say: 'kekoa', text: 'Toma. Esto ya no me hace falta, y a ti sí. —Se desata del cinturón una caracola grande con un cordón rojo—. Con ella llamaba a la manada. Ahora ya no llego a la Hondonada.' },
			{ cutscene: { time: 'dia', bg: { type: 'town', roofs: ['#8a5a2f', '#c4743a', '#e9c46a'], far: '#7aa05a' }, start: 'light', frames: [
				{ actors: [{ id: 'kekoa', at: 'left' }, { mon: 'mudbray', key: 'terron', at: 0.8, size: 's', dim: true }], on: '_c', cam: 'push', item: 'caracolakekoa', text: 'Una caracola del tamaño de dos puños, rosada por dentro y gastada por fuera, con la punta limada para soplar. El cordón rojo está trenzado a mano. Huele a mar y a rancho.' },
				{ actors: [{ key: 'kekoa', do: 'nod' }], on: '_c', fx: ['flash', 'sparkle'], color: '#ffd8c0', text: '«En la Ruta 4, donde la hierba es más alta, detrás hay una hondonada. La manada vive allí. Si la tocas, te dejan pasar. A mí siempre me dejaron».' },
				{ actors: [{ key: 'terron', dim: false, do: 'hop' }], on: '_c', cam: 'pull', fx: 'glow', text: '«Terrón nació allí, en un hueco de la pared. Cabía en mi sombrero. Si vas, mira el hueco. Ahora ya no cabe nadie. Pero sigue liso».' },
			] } },
			{ give: 'caracolakekoa' },
			{ say: 'kekoa', text: 'Y no le digas a Kalena que te he dado la caracola. Diría que me estoy despidiendo. No me estoy despidiendo. Me estoy aligerando, que es distinto. Los viejos pesamos mucho de tanto guardar cosas.' },
			{ quest: 'b05_s_terron', stage: 'hondonada' },
		],

		// ---------- 7. La caracola en la Ruta 4 (primer uso) ----------
		b05_terron_caracola: [
			{ text: 'La hierba alta del tramo 3 es un muro: te llega por encima de la cabeza. Detrás se oyen resoplidos, cascos que pisan barro y, de vez en cuando, un bramido corto.' },
			{ text: 'Te llevas la caracola de Don Kekoa a la boca. Soplas.' },
			{ cutscene: { time: 'dia', bg: { type: 'route', flowers: '#f2a03a', hill: '#6a9a4a', far: '#4a8ac4' }, start: 'light', cam: 'still', frames: [
				{ on: '_c', item: 'caracolakekoa', fx: 'ripple', text: 'Sale un sonido grave, largo, que no parece de una concha: parece un mugido muy lejano. La hierba tiembla.' },
				{ clear: true, fx: 'quake', cam: 'pan-right', text: 'Silencio. Luego, cascos. Muchos. La hierba se mueve en ondas, como el agua cuando pasa algo grande por debajo.' },
				{ actors: [{ mon: 'mudbray', key: 'm1', at: 0.3, size: 's', enter: 'up' }, { mon: 'mudbray', key: 'm2', at: 0.55, size: 's', enter: 'up' }, { mon: 'mudsdale', key: 'm3', at: 0.8, size: 'm', enter: 'up' }], fx: 'rise', text: 'Asoman cabezas entre la hierba. Mudbray, con las orejas tiesas. Detrás, un Mudsdale viejo, enorme, con el hocico canoso, que te mira de arriba abajo.' },
				{ actors: [{ key: 'm3', do: 'nod' }, { key: 'm1', do: 'hop' }], cam: 'push', text: 'El Mudsdale viejo huele la caracola. Resopla. Se da la vuelta. Y la manada se aparta en dos, abriendo un pasillo de hierba aplastada que baja hacia un suelo rojo.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.12, size: 's', enter: 'fade' }], fx: 'glow', on: 'rio', text: '{riolu} pasa el primero, despacio, con las palmas abiertas. El Mudsdale viejo baja la cabeza a su paso. Un saludo entre los que cargan con alguien.' },
				{ fx: 'iris-out', on: 'm3', cam: 'pull', text: 'Al fondo, la Hondonada de los Mudbray. Huele a barro tibio y a hierba pisada.' },
			] } },
			{ set: { 'flag.b05_hondonada_abierta': true } },
			{ quest: 'b05_s_terron', stage: 'hecha', done: true },
			{ set: { 'flag.b05_terron_estribo': true } },
			{ rep: { alola: 2 } },
			{ diary: 'Hoy mi entrenador{|a|e} sopló una caracola y una manada entera de Mudbray nos abrió paso. ¡Como en una película! Abajo hay una hondonada de barro rojo donde nació Terrón. Terrón no quiere crecer todavía, porque tiene a alguien a quien llevar. Yo tampoco crecería. Bueno, yo no crezco. Pero si creciera, no lo haría. ¡Bzzt!', cond: 'flag.b01_diario' },
			{ go: 'hondonada_mudbray' },
		],

		// ---------- La Hondonada ----------
		b05_hondonada_cuna: [
			{ text: 'En la pared de barro rojo hay un hueco liso, redondeado, del tamaño de un Mudbray tumbado. Está gastado por dentro, brillante, como el asiento de una silla muy usada. Nadie lo ocupa.' },
			{ text: 'En el borde, alguien clavó hace mucho un trozo de cinta de sombrero, de las que llevan flores secas. Ya no tiene flores. Pero sigue ahí.' },
			{ if: LUC, then: [{ text: '{riolu} pone la palma en el borde del hueco. El barro está tibio. Se queda un rato así, con los ojos cerrados, y luego te mira como si te contara algo que no hace falta decir.' }] },
		],
		b05_hondonada_tocar: [
			{ text: 'Soplas la caracola. El sonido rebota en las paredes de la hondonada y vuelve tres veces. Los Mudbray levantan la cabeza del barro, te miran, y siguen a lo suyo. Ya te conocen.' },
			{ if: 'morning', then: [{ text: 'Desde arriba, desde la Ruta 4, contesta otro sonido: un bramido corto, de un Mudbray que no está aquí. En Ohana, alguien ha oído la caracola.' }] },
		],

		// ---------- Después ----------
		b05_kalena_despues: [
			{ say: 'kalena', text: 'Mi padre dice que le diste la caracola a alguien de fuera. Le he dicho que me parece muy bien. Ha puesto una cara rarísima. Llevaba treinta años esperando a que le discutiera algo y no se lo he discutido.' },
			{ say: 'kalena', text: 'Los compradores siguen riéndose del Mudbray del corral. Ahora les digo que es el que más carga de todo el rancho. Se callan. No entienden por qué. Mejor.' },
			{ if: 'has("registrosilla")', then: [{ say: 'kalena', text: 'Y dile a la chica Kahale que la disculpa se la doy en persona. Algún día. Cuando me toque bajar a Kantai. Que no me toca.' }] },
		],
		b05_kekoa_duelo: [
			{ say: 'kekoa', text: '¿Otra vez tú? Te ha gustado el pueblo. Normal: aquí todo va despacio y se ve mejor.' },
			{ say: 'kekoa', text: 'Oye. Los de fuera piensan que Terrón es pequeño porque es flojo. ¿Quieres verlo pelear? Una vez. Y luego me dejas beber tranquilo.' },
			{ prompt: '¿Un combate amistoso con Don Kekoa?', choice: [
				{ text: '«Con mucho gusto.»', then: [
					{ text: 'Kalena aparece de la nada con un cubo de agua del abrevadero, un trapo y dos Hiperpociones. Cura a tu equipo sin preguntar, como quien cepilla a un Tauros.' },
					{ heal: true },
					{ say: 'kalena', text: 'Si se cae, el combate se acaba. Si se cae él, no Terrón. —Mira a su padre—. Lo digo en serio, papá.' },
					{ battle: 'kekoa_terron', lose: 'continue', onWin: [
						{ text: 'Terrón se sacude el polvo. Tiene la frente alta. No ha crecido ni un centímetro y aun así parece más grande que hace un rato.' },
						{ say: 'kekoa', text: 'Lleva una piedrecita de esas que hacen más fuerte al que todavía no ha crecido. La compró Kalena, a escondidas, hace un año. Yo creo que ya lo sabía. —Sonríe bajo el bigote—. Mi hija sabe más de lo que pregunta.' },
						{ say: 'kekoa', text: 'Toma la otra. Compró dos. Kalena siempre compra dos de todo, por si se rompe una. Así es ella.' },
						{ give: 'eviolite' },
					], onLose: [
						{ say: 'kekoa', text: 'No pasa nada. Terrón tiene muchos años de práctica: todas las mañanas carga con un viejo terco. Eso entrena mucho.' },
						{ heal: true },
					] },
				] },
				{ text: '«Otro día.»', then: [
					{ say: 'kekoa', text: 'Otro día. Aquí todos los días son otro día. Por eso duran tanto.' },
				] },
			] },
		],
		b05_kekoa_despues: [
			{ if: 'morning', then: [
				{ text: 'Don Kekoa da su vuelta al abrevadero sobre Terrón. Pasos cortos, iguales. Al verte, se toca el sombrero sin pararse. El estribo de koa cuelga de su clavo, plegado.' },
			], else: [
				{ text: 'Don Kekoa bebe del abrevadero con las manos. Terrón, con la boca. El estribo de koa cuelga de su clavo, plegado, y Terrón lo mira de vez en cuando, como quien mira una puerta que todavía no le toca abrir.' },
			] },
			{ say: 'kekoa', text: 'El agua sabe igual. El cielo, ya no tanto. —Mira hacia arriba—. Pero hoy no me he caído. Eso lo apunto.' },
		],
	},
};
