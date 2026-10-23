// Eventos de temporada 2026 (Publicación 10): novedades de Halloween y de Día de Muertos que conviven con las de b01/eventos.js.
// No sustituyen nada: el Gran Atraco (Castillo Caduco) y la ofrenda de Remedios (Luminalia) siguen igual.
//
//   halloween_retrato  24–31 oct · Castillo Caduco. «La vigilia del retrato»: cada Halloween aparece un retrato nuevo del Conde.
//                      Simón (el escéptico), Tobías y Duquesa y el Prof. Gadd vigilan la galería. El primer año: Sinistea
//                      (forma Antigua) + Tetera Rota; los siguientes, una variante corta según `year` y un premio pequeño.
//                      Punto diario con minijuego (cerradura): el arcón de disfraces del Conde.
//   muertos_lavanda    28 oct – 3 nov · Pueblo Lavanda. «Ofrenda en Lavanda»: Dolores quiere poner la mesa a los que nadie
//                      visita. Tres partes (flores con minijuego de cosecha, pan de Lola, velas y copal del Señor Fuji) y una
//                      noche de ofrenda con cinemática. El jugador elige a quién recuerda (Don Aurelio solo si ya lo perdió).
//                      Primer año: Greavard. Calaverita de Lola (read). Pan de muerto (cura y alegra al equipo).
//
// Repetición anual: todo se marca con `vars.*_year = year`, nunca con flags permanentes, y los textos cambian con
// `vars.*_n` (veces hecho) y `year % 3`. Condiciones: solo flags de B1–B4.

const LANA = 'inParty("ampharos")';
const XOLO = '(inParty("greavard") || inParty("houndstone"))';
const TETERA = '(owns("sinistea") || owns("sinisteaantique") || owns("polteageist") || owns("polteageistantique"))';
const PERRO = '(owns("greavard") || owns("houndstone"))';
// Día de Muertos en Lavanda: ¿en qué punto está la ofrenda de este año?
const ML_INI = 'vars.ml_ini == year';
const ML_TODO = 'vars.ml_flores == year && vars.ml_pan == year && vars.ml_velas == year';
const ML_HECHA = 'vars.ofrenda_lavanda_year == year';
const SABE = '(has("recetapanmuerto") || done.ev_muertos || flag.b02_remedios)';

export default {
	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		pan_muerto: { name: 'Pan de muerto', pocket: 'medicine', cost: 0, use: 'ev_ml_usar_pan',
			desc: 'Pan redondo de Lavanda, con huesitos en cruz y azúcar por encima. Huele a naranja y a azahar. Al compartirlo fuera de combate, tu equipo se recupera y se pone contento.' },
		calaverita_lola: { name: 'Calaverita de Lola', pocket: 'key', cost: 0,
			desc: 'Media servilleta de papel de estraza, doblada en cuatro, con letra apretada. Huele a vapor y a frijol dulce.',
			read: '*Calaverita para quien cruza Puertas*\n*(de parte de Lola, que no sabe hacer versos y se nota)*\n\nLa Calaca llegó a Lavanda\nuna noche sin avisar:\nbuscaba a quien cruza Puertas\ny no para de viajar.\n\nTocó en la Casa Pokémon;\nle abrió el Señor Fuji en bata,\nle sirvió té de lavanda…\n¡y se le durmió la ingrata!\n\nLuego fue al puesto de Lola\npor un bollito de frijol.\n«Fiado no», le dijo Lola,\n«ni a la Muerte ni a su farol».\n\nY así se fue la Calaca,\nsin bollo, con sueño y sin ti:\n«Que siga cruzando Puertas;\nya vendré otro año por aquí».\n\n— L.\n\n*(Abajo, más pequeño: «No se aceptan reclamaciones. Tampoco devoluciones».)*' },
		foto_vigilia: { name: 'Foto de la vigilia', pocket: 'key', cost: 0,
			desc: 'Una foto cuadrada de la Cámara Espectral del Prof. Gadd. Todavía huele un poco a revelador.',
			read: 'La galería del Castillo Caduco, a medianoche, blanca de flash.\n\nA la izquierda, Simón, con los ojos muy abiertos y una taza de té en la mano. De la taza asoma una carita morada que sonríe a la cámara.\n\nA la derecha, un Smeargle de puntillas, con la cola manchada de pintura, termina un retrato.\n\nEn medio hay un sillón de terciopelo. Estás segur{o|a|e} de que el Conde estaba sentado en él cuando saltó el flash.\n\nEn la foto, el sillón está vacío.\n\nPor detrás, con la letra de Simón: «Defecto de revelado». Debajo, con la de Gadd: «No». Debajo, con una letra muy elegante que no es de ninguno de los dos: «Feliz Halloween».' },
	},

	// =====================================================================
	// MISIÓN (solo la usa el primer año; los siguientes la ofrenda se repite sin ella)
	// =====================================================================
	quests: {
		ev_muertos_lavanda: { name: 'Ofrenda en Lavanda', type: 'event', est: 30, stages: {
			ofrenda: '**Dolores** quiere poner una ofrenda en el cementerio pequeño de **Pueblo Lavanda**. Consigue flores, pan y velas, y vuelve con ella.',
			hecha: 'La ofrenda de Lavanda está puesta. Dolores dice que el año que viene, otra vez.',
		}, parts: { title: 'Lo que falta en la ofrenda', items: [
			{ label: 'Flores de cempasúchil', where: 'lavanda', done: 'vars.ml_flores == year', hint: 'Los vecinos colgaron ristras en el **árbol grande de Lavanda**. Sacude las ramas y recógelas.' },
			{ label: 'Pan de muerto', where: 'lavanda', done: 'vars.ml_pan == year',
				hint: [{ cond: 'flag.lola_3', text: '**Lola** tiene la vaporera junto al Centro Pokémon de Lavanda.' }, { text: 'En la **Casa Pokémon** de Lavanda hay horno.' }] },
			{ label: 'Velas y copal', where: 'casa_fuji', done: 'vars.ml_velas == year',
				hint: [{ cond: 'flag.b04_fuji_1', text: 'El **Señor Fuji**, en la Casa Pokémon, tiene una caja de velas.' }, { text: 'Preséntate antes en la **Casa Pokémon** de Lavanda.' }] },
		] } },
	},

	// =====================================================================
	// EVENTOS
	// =====================================================================
	events: [
		// ---------- Halloween · variante de este año ----------
		{
			id: 'halloween_retrato', name: 'La vigilia del retrato', from: '10-24', to: '10-31', cond: 'flag.b01_conde_1',
			icon: '🖼️', doneCond: 'vars.hw_retrato_year == year',
			blurb: 'Una vigilia a medianoche en la galería de un castillo, con cámaras, invitados conocidos y un arcón de disfraces.',
			spots: {
				castillo_caduco: [
					{ label: 'La galería, a medianoche', sub: 'Alguien ha montado cámaras delante de los retratos', icon: '🖼️', new: 'vars.hw_retrato_year != year',
						talk: [{ cond: 'vars.hw_retrato_year == year', script: 'ev_hwr_despues' }, { script: 'ev_hwr_vigilia' }] },
					{ label: 'El arcón de disfraces del Conde', sub: 'Solo se abre en Halloween', icon: '🎭', new: '!flag.rec_ev_hw_arcon', action: { gather: 'ev_hw_arcon' } },
				],
			},
		},
		// ---------- Día de Muertos · Lavanda ----------
		{
			id: 'muertos_lavanda', name: 'Ofrenda en Lavanda', from: '10-28', to: '11-03', cond: 'flag.b04_lavanda_llegada',
			icon: '🕯️', doneCond: ML_HECHA,
			blurb: 'En un pueblo de Kanto han brotado flores naranjas entre la lavanda. Alguien quiere poner una mesa para los que nadie visita.',
			spots: {
				lavanda: [
					{ label: 'Dolores, en el murete del cementerio', sub: 'Cose junto a una cubeta llena de flores naranjas', icon: '🕯️',
						new: '!(' + ML_HECHA + ') && (!(' + ML_INI + ') || (' + ML_TODO + '))',
						talk: [
							{ cond: ML_HECHA, script: 'ev_ml_despues' },
							{ cond: ML_INI + ' && ' + ML_TODO, script: 'ev_ml_noche' },
							{ cond: ML_INI, script: 'ev_ml_recordar' },
							{ script: 'ev_ml_inicio' },
						] },
					{ label: 'El árbol grande de la calle', sub: 'Ristras de flores naranjas enredadas en las ramas', icon: '🌼',
						cond: ML_INI + ' && vars.ml_flores != year', new: 'true', talk: [{ script: 'ev_ml_flores' }] },
					{ label: 'Lola, con la vaporera encendida', sub: 'Huele a algo que no es frijol', icon: '🍞',
						cond: 'flag.lola_3 && ' + ML_INI + ' && vars.ml_pan != year', new: 'true', talk: [{ script: 'ev_ml_pan' }] },
					{ label: 'El horno de la Casa Pokémon', sub: 'Alguien lo ha encendido', icon: '🍞',
						cond: '!flag.lola_3 && ' + ML_INI + ' && vars.ml_pan != year', new: 'true', talk: [{ script: 'ev_ml_pan_fuji' }] },
				],
				casa_fuji: [
					{ label: 'Señor Fuji, con una caja de velas', sub: 'Cuenta las velas dos veces', icon: '🕯️',
						cond: 'flag.b04_fuji_1 && ' + ML_INI + ' && vars.ml_velas != year', new: 'true', talk: [{ script: 'ev_ml_velas' }] },
				],
			},
		},
	],

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		ev_hw_arcon: {
			name: 'Arcón de disfraces del Conde', icon: '🎭', hours: 20, picks: [1, 2], game: { type: 'lock', level: 2, theme: 'cofre' },
			ask: 'Un arcón negro con herrajes de plata, al pie de la escalera. En la tapa, una placa: «Disfraces. Uno por invitado. Devolución obligatoria antes del amanecer». Tiene una cerradura de runas que se encienden en orden.',
			text: 'El arcón suspira al abrirse. Entre capas, máscaras y una peluca que se mueve sola, hay cosas que alguien olvidó devolver.',
			wait: 'El arcón está cerrado. En la placa, alguien ha añadido con tiza: «Mañana más. Los disfraces también descansan».',
			table: [
				{ id: 'lavacookie', w: 12 }, { id: 'oldgateau', w: 10 }, { id: 'sweetheart', w: 5 }, { id: 'spelltag', w: 5 }, { id: 'healpowder', w: 8 },
				{ id: 'reapercloth', w: 3, rare: true }, { id: 'duskstone', w: 2, rare: true }, { id: 'nugget', w: 1, rare: true },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ===================== Halloween · La vigilia del retrato =====================
		ev_hwr_vigilia: [
			{ if: 'vars.hw_retrato_n > 0', then: [{ call: 'ev_hwr_otra' }, { end: true }] },
			{ text: 'Al fondo del salón, la galería de retratos: decenas de veces el mismo hombre pálido, en todas las modas de los últimos siglos. Entre dos de ellos hay un hueco vacío, con un clavo dorado esperando.' },
			{ say: 'conde', text: 'Ah, {jugador}. Llega a tiempo para la otra tradición de la noche. La silenciosa. Cada Halloween, a medianoche, aparece en esa pared un retrato nuevo. Nadie lo cuelga. Nadie lo pinta. Y, sin embargo, ahí está.' },
			{ say: 'simon', text: 'Y este año se acaba el misterio. Cuatro cámaras, dos micrófonos, un cronómetro y un testigo independiente. —Te señala con el bolígrafo—. Tú eres el testigo independiente.' },
			{ say: 'simon', text: 'Además, trabajo aquí. Hacer la visita escéptica con un retrato que aparece solo es como hacer de bombero en una casa que se quema por gusto.', cond: 'flag.p7_simon' },
			{ say: 'tobias', text: '¡Patrocinadores! ¡Episodio especial: la vigilia del retrato! ¡En directo y a oscuras! Duquesa se encarga de la seguridad. —Duquesa duerme panza arriba en un cojín de terciopelo—. Está concentrada.' },
			{ say: 'gadd', text: '¡Hola, hola! ¡Y yo traigo la **Cámara Espectral**! Saca lo que se ve y lo que no se ve. Lo que se ve lo saca regular, pero eso es lo de menos. Apunta la hora, que nadie apunta la hora.' },
			{ say: 'conde', text: '¿Té? Es de mi vajilla antigua. La de verdad, no las copias que compré para despistar a los ladrones. —Sirve una taza—. Señor Simón, sé que usted no acepta copas de nada rojo. Esto es verde.' },
			{ say: 'simon', text: '…Solo el té. El té no cuenta. Es una infusión. Las infusiones son química.' },
			{ cutscene: { time: 'noche', bg: { type: 'castle', fog: true }, start: 'dark', frames: [
				{ big: true, text: 'Medianoche', sub: 'Castillo Caduco', hold: 2400, cam: 'still' },
				{ actors: [{ id: 'simon', at: 'left', enter: 'left' }, { id: 'tobias', at: 'right', enter: 'right', dim: true }], fx: 'light', cam: 'pull',
					text: 'La galería, con una sola vela. Simón, con la taza en una mano y el cronómetro en la otra. Tobías susurra a la cámara. Duquesa ronca.' },
				{ actors: [{ key: 'tobias', remove: true, exit: 'fade' }], fx: 'dark', cam: 'still',
					text: 'A las doce en punto, la vela se apaga. Sola. Simón no dice nada. La taza le tiembla un poco.' },
				{ actors: [{ key: 'simon', emote: '!', do: 'shake' }], mon: 'sinisteaantique', fx: 'glow', color: '#b08ad8',
					text: 'No es su mano: es la taza. Del té asoma una carita morada que lo mira, parpadea y se ríe bajito.' },
				{ on: false, fx: 'flash', cam: 'push', text: '¡Flash! La Cámara Espectral de Gadd dispara sola. Durante un segundo, toda la galería se ve blanca.' },
				{ actors: [{ key: '_c', size: 's', at: 0.38 }, { mon: 'smeargle', key: 'pintor', at: 0.72, enter: 'fade' }], fx: 'light', cam: 'pan-right',
					text: 'Y en la pared, delante del hueco, un Smeargle de puntillas da los últimos toques a un retrato nuevo con la punta de la cola. Ni se inmuta.' },
				{ cond: 'year % 3 == 1', actors: [{ key: 'pintor', do: 'bow' }], cam: 'pull',
					text: 'En el retrato, el Conde lleva sudadera con capucha y audífonos al cuello. «La moda de este año», dice una voz detrás de ti. El Conde.' },
				{ cond: 'year % 3 == 2', actors: [{ key: 'pintor', do: 'bow' }], cam: 'pull',
					text: 'En el retrato, el Conde lleva un dorsal de la Copa Infinita y una bufanda de aficionado. «La moda de este año», dice una voz detrás de ti. El Conde.' },
				{ cond: 'year % 3 == 0', actors: [{ key: 'pintor', do: 'bow' }], cam: 'pull',
					text: 'En el retrato, el Conde va disfrazado de Pumpkaboo, con una dignidad imposible. «La moda de este año», dice una voz detrás de ti. El Conde.' },
				{ fx: 'iris-out', on: 'pintor', cam: 'still', text: 'El Smeargle se limpia la cola en un trapo, hace una reverencia corta y se va por detrás de un tapiz. El retrato se queda. Todavía brilla, fresco.' },
			] } },
			{ say: 'gadd', text: '¡Revelada! ¡Mira, mira! El Smeargle, la taza, Simón con cara de… bueno, con cara. ¿Y el Conde? —Mira la foto. Mira al Conde. Mira la foto—. El sillón sale vacío. Qué interesante. Qué precioso. Qué miedo.' },
			{ say: 'simon', text: 'Nota para el episodio: «El retrato lo pinta un Smeargle». Explicado. Caso cerrado. —Mira la foto. Tarda en hablar—. La foto la dejo como «indeterminado». Es un defecto de revelado.' },
			{ say: 'conde', text: 'Es el mismo Smeargle de siempre. O su nieto. O un Smeargle que se parece. —Le guiña un ojo a Simón, que aprieta el bolígrafo—. Y la taza, por fin, ha elegido. Lleva en mi vajilla desde antes de que existieran las tazas.' },
			{ if: '!flag.ev_hwr_sinistea && !' + TETERA, then: [
				{ say: 'conde', text: 'Se ha encariñado con quien no le tuvo miedo. Simón no cuenta: Simón sí le tuvo miedo, solo que con método.' },
				{ say: 'simon', text: 'Me niego a beber de algo que me mira. Llévatela tú.' },
				{ pokemon: { sp: 'sinisteaantique', lv: 16, nature: 'modest', ability: 'cursedbody', happy: 120 }, cond: 'badges < 4' },
				{ pokemon: { sp: 'sinisteaantique', lv: 32, nature: 'modest', ability: 'cursedbody', happy: 120 }, cond: 'badges >= 4 && badges < 8' },
				{ pokemon: { sp: 'sinisteaantique', lv: 44, nature: 'modest', ability: 'cursedbody', happy: 120 }, cond: 'badges >= 8' },
				{ say: 'conde', text: 'Y la tetera. Está rota y sirve un té espantoso, pero a la taza le gusta. Un día sabrá usted para qué sirve. Yo lo sé desde hace mucho. Es lo malo de saberlo todo desde hace mucho.' },
				{ give: 'chippedpot' },
				{ set: { 'flag.ev_hwr_sinistea': true } },
			], else: [
				{ if: '!flag.ev_hwr_sinistea', then: [
					{ say: 'conde', text: 'Veo que ya tiene usted una de esas. Entonces esta se queda aquí, en su vitrina, a asustar a mis invitados. Es lo que mejor sabe hacer, después del té.' },
					{ give: 'spelltag' },
					{ set: { 'flag.ev_hwr_sinistea': true } },
				] },
			] },
			{ say: 'gadd', text: '¡Toma! Te la regalo. Tengo el negativo. Bueno, el negativo también sale sin Conde. Me voy a revisar la cámara. O el castillo. O a mí.' },
			{ give: 'foto_vigilia' },
			{ read: 'foto_vigilia' },
			{ set: { 'vars.hw_retrato_year': '=year', 'vars.hw_retrato_n': '+1' } },
			{ diary: '¡Esta noche hicimos guardia en la galería del Conde! A las doce se apagó la vela, una taza se rió y un Smeargle pintó un retrato nuevo. En la foto de Gadd no sale el Conde. Simón dice que es un defecto. Yo creo que el Conde es muy tímido con las cámaras. ¡Bzzt!', cond: 'flag.b01_diario' },
		],
		// Años siguientes: misma vigilia, otro método de Simón y otra moda en el retrato
		ev_hwr_otra: [
			{ text: 'El hueco vacío de la galería vuelve a esperar con su clavo dorado. Simón ha traído algo nuevo.' },
			{ say: 'simon', text: 'Este año, polvo de talco en el suelo. Si hay pisadas, hay pintor. Si hay pintor, no hay misterio. Si no hay misterio, me voy a casa. Es un plan infalible.', cond: 'year % 3 == 1' },
			{ say: 'simon', text: 'Este año, un cascabel en cada marco. Si alguien toca un cuadro, suena. Si suena, no es magia: es un cascabel.', cond: 'year % 3 == 2' },
			{ say: 'simon', text: 'Este año no traigo nada. He decidido que, si no miro, no pasa. Es una técnica nueva. Se llama «madurez».', cond: 'year % 3 == 0' },
			{ text: 'A medianoche se apaga la vela. Cuando vuelve la luz, el Smeargle ya se ha ido y hay un retrato nuevo, todavía brillante de óleo fresco.' },
			{ text: 'Este año, el Conde lleva sudadera con capucha y audífonos al cuello.', cond: 'year % 3 == 1' },
			{ text: 'Este año, el Conde lleva un dorsal de la Copa Infinita y una bufanda de aficionado.', cond: 'year % 3 == 2' },
			{ text: 'Este año, el Conde va disfrazado de Pumpkaboo. Con una dignidad imposible.', cond: 'year % 3 == 0' },
			{ say: 'tobias', text: '¡Patrocinadores, otra vez! ¡La vigilia del retrato ya es una franquicia! Duquesa, saluda. —Duquesa no saluda—. Saluda por dentro.' },
			{ say: 'conde', text: 'Gracias por velar conmigo, {jugador}. Tome: los invitados que velan no se van con las manos vacías. Lo dice el reglamento. Lo escribí yo.' },
			{ give: 'spelltag', cond: 'year % 2 == 1' },
			{ give: 'reapercloth', cond: 'year % 2 == 0' },
			{ set: { 'vars.hw_retrato_year': '=year', 'vars.hw_retrato_n': '+1' } },
		],
		ev_hwr_despues: [
			{ say: 'conde', text: 'El retrato de este año ya está colgado. Seco del todo, no. El óleo tarda. Yo, en cambio, nunca tardo en nada.' },
			{ say: 'simon', text: 'Sigo en «indeterminado». Indeterminado es una categoría científica respetable. No me mires así.', cond: 'flag.p7_simon' },
		],

		// ===================== Día de Muertos · Ofrenda en Lavanda =====================
		ev_ml_inicio: [
			{ text: 'En el murete del cementerio pequeño, una mujer de trenzas grises cose sin mirar la aguja. A su lado, un muñeco de trapo con cremallera en la boca la mira coser. A sus pies, una cubeta llena de flores naranjas.' },
			{ if: 'vars.ofrenda_lavanda_n > 0', then: [
				{ say: 'p7_dolores', text: 'Otra vez el año. —Sonríe con los ojos medio cerrados—. Ya han vuelto a salir las flores naranjas entre la lavanda. Ya sabes lo que hace falta: flores, pan, velas. Yo me pongo con el papel.' },
			], else: [
				{ if: '!flag.p7_dolores_1', then: [
					{ say: 'p7_dolores', text: 'No te asustes del muñeco. Se llama Remiendo. Mira así a todo el mundo. Soy Dolores. Coso muñecos para las tumbas que no tienen visita. Uno por lápida, uno por año.' },
				], else: [
					{ say: 'p7_dolores', text: 'Ah, tú. Remiendo te ha reconocido antes que yo. Se le nota en la cremallera.' },
				] },
				{ say: 'p7_dolores', text: 'Mira lo que ha brotado este año entre la lavanda. —Levanta una flor naranja, gorda, de muchos pétalos—. No es de aquí. Huele fuerte, como a especia. Los fantasmas del sótano no se le acercan. Los del cementerio, en cambio, se sientan a su lado.' },
				{ choice: [
					{ text: '«Es cempasúchil. Sé para qué sirve.»', cond: SABE, then: [
						{ text: 'Le cuentas lo de la abuela Remedios, en Luminalia: la mesa con lo que les gustaba a los que se fueron, el papel picado, el pan, el caminito de pétalos para que encuentren la casa.' },
						{ say: 'p7_dolores', text: 'Una mesa para los que se fueron. Con su comida. Para que vengan una noche. —Se queda con la aguja en el aire—. Y yo cosiéndoles muñecos, que no comen. Qué tonta.' },
					] },
					{ text: '«¿Qué flor es?»', then: [
						{ say: 'p7_dolores', text: 'Un señor de paso me dijo que se llama cempasúchil. Que en un sitio muy lejos la ponen en unas mesas para los muertos, con su comida, para que vengan una noche al año. Ofrendas, las llamaba.' },
					] },
				] },
				{ say: 'p7_dolores', text: 'Este año quiero ponerles la mesa. A los de aquí, a los que nadie viene a ver. ¿Me ayudas? Yo sola no sé hacer casi nada de lo que lleva.' },
			] },
			{ say: 'p7_dolores', text: 'Hacen falta **flores**, que los vecinos colgaron en el **árbol grande** de la calle y se les enredaron; **pan**, y en Lavanda solo hay una persona que sepa de masa; y **velas y copal**, que tiene el **Señor Fuji**, que lleva cuarenta años encendiendo las de aquí.', cond: 'flag.lola_3' },
			{ say: 'p7_dolores', text: 'Hacen falta **flores**, que los vecinos colgaron en el **árbol grande** de la calle y se les enredaron; **pan**, y en la **Casa Pokémon** hay horno; y **velas y copal**, que tiene el **Señor Fuji**, que lleva cuarenta años encendiendo las de aquí.', cond: '!flag.lola_3' },
			{ say: 'p7_dolores', text: 'El papel picado lo hago yo. Recortar es coser al revés. ¿Qué figuras le pongo?' },
			{ choice: [
				{ text: 'Calaveras sonrientes y flores.', then: [{ set: { 'vars.ml_picado': 1 } }, { say: 'p7_dolores', text: 'Calaveras que se ríen. Me gusta. Así nadie se pone triste mucho rato.' }] },
				{ text: 'Los Pokémon del pueblo: Gastly, Cubone, Haunter.', then: [{ set: { 'vars.ml_picado': 2 } }, { say: 'p7_dolores', text: 'Los de aquí. Les va a dar vergüenza verse colgados. Mejor.' }] },
				{ text: '«Lo que tú quieras, Dolores.»', then: [{ set: { 'vars.ml_picado': 3 } }, { say: 'p7_dolores', text: 'Entonces Remiendos. Muchos Remiendos. —El muñeco se sube la cremallera un poquito. Parece contento—. Ya lo ves.' }] },
			] },
			{ quest: 'ev_muertos_lavanda', stage: 'ofrenda' },
			{ set: { 'vars.ml_ini': '=year' } },
			{ say: 'p7_dolores', text: 'Cuando lo tengas todo, ven a buscarme aquí. La mesa la ponemos de noche. Las cosas de los muertos se hacen de noche, que de día tienen mucho trabajo.' },
		],
		ev_ml_recordar: [
			{ say: 'p7_dolores', text: 'El papel ya está casi. —Te enseña una tira de papel morado llena de agujeros con forma—. ¿Qué nos falta?' },
			{ say: 'p7_dolores', text: 'Las **flores**: están en el **árbol grande** de la calle.', cond: 'vars.ml_flores != year' },
			{ say: 'p7_dolores', text: 'El **pan**: pregúntale a **Lola**, la de los bollos. Lleva todo el día con la vaporera encendida y diciendo que no es para nadie.', cond: 'vars.ml_pan != year && flag.lola_3' },
			{ say: 'p7_dolores', text: 'El **pan**: en la **Casa Pokémon** han encendido el horno.', cond: 'vars.ml_pan != year && !flag.lola_3' },
			{ say: 'p7_dolores', text: 'Las **velas y el copal**: el **Señor Fuji**, en la **Casa Pokémon**.', cond: 'vars.ml_velas != year' },
		],
		ev_ml_flores: [
			{ text: 'El árbol grande de la calle, el que da sombra al buzón del cementerio. Los vecinos colgaron ristras de flores naranjas para que se orearan, y el viento de la Ruta 8 las ha enredado en las ramas altas.' },
			{ text: 'Una vecina te pasa una cesta. «Sacude con cuidado, que si caen al suelo se pisan. Y si cae algo que no es flor, no es mío».' },
			{ minigame: {
				type: 'catch', id: 'ev_ml_ristras', title: 'Cempasúchil entre las ramas', level: 2, theme: 'otono',
				hint: 'Desliza por la copa para sacudirla y mueve la cesta para recoger las flores. Lo que no es flor, déjalo caer.',
				guaranteed: ['cempasuchil'], picks: 3, lootTitle: 'En la cesta',
				loot: [{ id: 'cempasuchil', w: 10, n: [1, 2] }, { id: 'pechaberry', w: 4 }, { id: 'healpowder', w: 3 }, { id: 'revivalherb', w: 1, rare: true }],
				consolation: 'cempasuchil',
			},
			onWin: [
				{ set: { 'vars.ml_flores': '=year' } },
				{ text: 'La cesta huele tan fuerte que la vecina estornuda. «Eso ya es una ofrenda», dice. «Llévaselas a Dolores, que se le van a marchitar las ganas».' },
			],
			onLose: [{ text: 'Las ristras se han quedado en lo alto. La vecina se encoge de hombros: «El árbol no se va a ningún sitio. Vuelve a intentarlo».' }],
			onQuit: [{ text: 'Dejas la cesta junto al tronco. Las flores siguen ahí arriba, esperando.' }] },
		],
		ev_ml_pan: [
			{ text: 'La vaporera de Lola echa humo, pero no huele a frijol. Huele a naranja, a mantequilla y a algo de flor. Lola amasa encima del carrito, con los nudillos, como si la masa le debiera dinero.' },
			{ say: 'lola', text: 'Ya sé. La de los muñecos. Pan para su mesa. —No levanta la vista—. No sé hacer ese pan. Nunca lo he hecho. Pero masa es masa.' },
			{ if: 'has("recetapanmuerto")', then: [
				{ text: 'Le enseñas la receta de la abuela Remedios. Lola se limpia las manos en el mandil antes de tocarla.' },
				{ say: 'lola', text: '«Harina, mantequilla, huevo, ralladura de naranja, agua de azahar… a ojo, mijo, como todo lo importante». —Resopla por la nariz—. Esta señora sabe.' },
				{ say: 'lola', text: 'La letra le tiembla al final. ¿Ves? Es letra de alguien que ya escribe despacio. —Dobla la hoja por sus dobleces de siempre y te la devuelve—. Guárdala bien. Esto no se vuelve a escribir.' },
			], else: [
				{ text: 'Le cuentas lo que recuerdas: redondo, con huesitos de masa encima en cruz y una bolita en medio, azúcar por fuera, y que sabe a naranja.' },
				{ say: 'lola', text: 'Huesitos en cruz. Una bolita. Naranja. —Asiente—. Con eso me alcanza. Las recetas de verdad nunca traen las cantidades.' },
			] },
			{ text: 'Lola forma la bola, le pone los huesitos encima, la bolita en medio, y la mete al horno pequeño de debajo del carrito. Tacho se sienta delante del horno y no se mueve de ahí.' },
			{ say: 'lola', text: '¿Para los que nadie viene a ver, dice la de los muñecos? —Mira hacia el final de la calle, al cementerio—. Hay una piedra ahí que sí tiene visita. Pero que le pongan pan no le va a hacer daño.' },
			{ text: 'El pan sale dorado, redondo, con azúcar por encima. Lola lo deja enfriar en una servilleta y hace dos más, pequeños, sin decir nada.' },
			{ say: 'lola', text: 'El grande, para la mesa. Los chicos, para ti, que vas a seguir con hambre. Esos no son fiados: son regalados. Es distinto.' },
			{ give: 'pan_muerto', n: 2 },
			{ if: '!has("calaverita_lola")', then: [
				{ say: 'lola', text: 'Y esto. —Te mete en el bolsillo una servilleta doblada—. Me dijeron que en esa fiesta se escriben versos a los vivos, de que se los lleva la Muerte. Es de mala educación, pero es tradición. No lo leas delante de mí.' },
				{ give: 'calaverita_lola' },
			], else: [
				{ say: 'lola', text: 'Este año no hay verso. El del año pasado sigue sirviendo: la Flaca todavía no te ha encontrado.' },
			] },
			{ set: { 'vars.ml_pan': '=year' } },
		],
		ev_ml_pan_fuji: [
			{ text: 'En la cocina de la Casa Pokémon, el horno viejo está encendido. El Señor Fuji, con un mandil de flores encima de la chaqueta de punto, mira una bola de masa con mucho respeto.' },
			{ say: 'fuji', text: 'Dolores me ha dicho que hace falta pan. Hace cuarenta años que no amaso. —Se ríe muy bajito—. La masa se acuerda mejor que yo.' },
			{ if: 'has("recetapanmuerto")', then: [
				{ text: 'Le enseñas la receta de la abuela Remedios. Fuji la lee despacio y se ajusta las gafas.' },
				{ say: 'fuji', text: '«A ojo, como todo lo importante». Es la mejor instrucción que he leído en mi vida. Y he leído muchas.' },
			] },
			{ text: 'El pan sale un poco torcido, con los huesitos de masa más gordos de un lado. Huele a naranja. Es perfecto.' },
			{ say: 'fuji', text: 'Uno para la mesa. Dos para ti. Los viejos damos de comer como otros dan los buenos días.' },
			{ give: 'pan_muerto', n: 2 },
			{ set: { 'vars.ml_pan': '=year' } },
		],
		ev_ml_velas: [
			{ text: 'El Señor Fuji cuenta velas de una caja de cartón, de dos en dos, con mucho cuidado. Cuando termina, vuelve a empezar.' },
			{ say: 'fuji', text: 'Dolores me lo ha contado. Una mesa para los que se fueron. —Sonríe un poco—. Cuarenta años encendiéndoles velas y nunca se me ocurrió ponerles la cena.' },
			{ say: 'fuji', text: 'Velas, todas las que quieras. Y esto. —Una bolsita de papel con trocitos de resina—. Copal. Del incensario de la torre vieja. Ese que humea solo. No se va a enfadar porque le haya pedido un poco.', cond: 'flag.b04_sotano_hondo' },
			{ say: 'fuji', text: 'Velas, todas las que quieras. Y esto. —Una bolsita de papel con trocitos de resina—. Copal. De la torre vieja, de cuando era torre. Lo guardaba para algo. Supongo que era para esto.', cond: '!flag.b04_sotano_hondo' },
			{ say: 'fuji', text: 'Pero una ofrenda, me dice Dolores, también lleva a alguien de quien la pone. ¿Y tú? ¿A quién vas a poner?' },
			{ choice: [
				{ text: '«A Don Aurelio.»', cond: 'flag.b03_aurelio_muerto', then: [
					{ set: { 'vars.ml_quien': 1 } },
					{ say: 'fuji', text: '¿Qué le gustaba?' },
					{ text: 'Piensas en el porche, en la mecedora, en el vaso de Leche Mu-mu que te ponía delante sin preguntar. En que silbaba.' },
					{ say: 'fuji', text: 'Pues leche. —Asiente despacio—. Lo de silbar no cabe en una mesa. Eso se lo pones tú cuando pases por su tierra.' },
				] },
				{ text: '«A los que nadie viene a ver.»', then: [
					{ set: { 'vars.ml_quien': 2 } },
					{ say: 'fuji', text: 'Esos son muchos. —Mira por la ventana, hacia el cementerio—. Pero caben. Las mesas, cuando son para eso, siempre caben.' },
				] },
				{ text: '«A alguien mío. De antes de todo esto.»', then: [
					{ set: { 'vars.ml_quien': 3 } },
					{ say: 'fuji', text: 'Entonces no me digas el nombre. Los nombres de una ofrenda son de quien los pone. —Te da una vela más—. Esta, para que la enciendas tú.' },
				] },
			] },
			{ text: 'Por un momento, el Señor Fuji mira la foto boca abajo de la estantería. No la levanta. Mete una vela de más en la caja y la cierra.' },
			{ set: { 'vars.ml_velas': '=year' } },
		],
		ev_ml_noche: [
			{ say: 'p7_dolores', text: 'Flores, pan, velas. Ya está todo. —Guarda la aguja—. Ven. Es de noche en algún sitio, y aquí ya casi.' },
			{ cutscene: { time: 'noche', weather: 'petals', bg: { type: 'town', roofs: ['#8a6ab8', '#6a4a8a', '#e9e3d0', '#b08ad8'], far: '#2a2a44', fog: true }, start: 'dark', frames: [
				{ big: true, text: 'Noche de ofrenda', sub: 'Pueblo Lavanda', hold: 2400, cam: 'still' },
				{ actors: [{ id: 'p7_dolores', at: 'left', enter: 'left' }], fx: 'light', cam: 'pull',
					text: 'Al fondo del cementerio pequeño, sobre unos tablones, la ofrenda: tres escalones forrados con tela morada, porque en Lavanda no había de otro color.' },
				{ cond: 'vars.ml_picado == 1', on: false, fx: 'sparkle', cam: 'pan-up', text: 'Arriba, el papel picado de Dolores se mueve con el aire: calaveras que se ríen y flores, en morado, naranja y blanco.' },
				{ cond: 'vars.ml_picado == 2', on: false, fx: 'sparkle', cam: 'pan-up', text: 'Arriba, el papel picado de Dolores se mueve con el aire: Gastly, Cubone y Haunter recortados, que desde abajo parecen saludar.' },
				{ cond: 'vars.ml_picado != 1 && vars.ml_picado != 2', on: false, fx: 'sparkle', cam: 'pan-up', text: 'Arriba, el papel picado de Dolores se mueve con el aire: una fila de Remiendos de papel, todos con la cremallera abierta en una sonrisa.' },
				{ actors: [{ id: 'fuji', at: 'right', enter: 'right' }], item: 'pan_muerto', cam: 'push',
					text: 'Velas en cada escalón. El Señor Fuji deja el copal humeando. En medio, el pan, con sus huesitos en cruz. Un vaso de agua, por si vienen con sed del camino.' },
				{ cond: 'vars.ml_quien == 1', item: 'moomoomilk', cam: 'still', text: 'En el escalón de en medio, un vaso de leche y un mechón de lana. Para Don Aurelio. «Lana, leche y paciencia», decía el cartel de su rancho.' },
				{ cond: 'vars.ml_quien == 1 && ' + LANA, actors: [{ key: '_c', remove: true, exit: 'fade' }, { mon: 'ampharos', key: 'lana', at: 'center', enter: 'pop' }], fx: 'glow', color: '#f2b33d',
					text: 'Tu Ampharos se acerca a la mesa y enciende la cola, despacio. Como las del rebaño, de noche, en el prado, para no perderse.' },
				{ cond: 'vars.ml_quien == 2', cam: 'still', text: 'En el escalón de en medio, los muñecos de Dolores: uno por cada lápida sin visita. Remiendo los mira de uno en uno, como quien pasa lista.' },
				{ cond: 'vars.ml_quien != 1 && vars.ml_quien != 2', cam: 'still', text: 'En el escalón de en medio hay un hueco sin foto. Pones ahí algo pequeño que solo tú sabes de quién es, y enciendes tu vela. Nadie pregunta.' },
				{ cond: 'vars.ofrenda_lavanda_n == 0', clear: true, fx: 'ripple', cam: 'still', text: 'Por el caminito de pétalos, desde la calle, viene algo blanco. Despacio. Olfateando cada flor.' },
				{ cond: 'vars.ofrenda_lavanda_n == 0', mon: 'greavard', fx: 'glow', color: '#e0903a', cam: 'push',
					text: 'Un Greavard. Se sienta delante de la ofrenda, muy derecho, con la llamita de la cabeza encendida. Como si llevara toda la noche esperando a alguien.' },
				{ cond: 'vars.ofrenda_lavanda_n > 0 && ' + XOLO, clear: true, mon: 'greavard', fx: 'glow', color: '#e0903a', cam: 'push',
					text: 'Tu Greavard se sienta delante de la ofrenda, muy derecho, igual que la primera vez. Sabe el camino de memoria.' },
				{ fx: 'iris-out', cam: 'pull', text: 'Nadie dice nada. Las velas chisporrotean. Lavanda, por una vez, no está callada: está escuchando.' },
			] } },
			{ say: 'lola', text: 'Ha quedado bonita. —Se cruza de brazos—. No se lo digan a nadie.', cond: 'flag.lola_3' },
			{ say: 'fuji', text: 'Hacía cuarenta años que no ponía la mesa para nadie. —Enciende una vela que ya estaba encendida—. Se me había olvidado lo que pesa un plato.' },
			{ if: 'vars.ofrenda_lavanda_n == 0', then: [
				{ say: 'p7_dolores', text: 'Dicen que de donde vienen estas flores, un perro como ese acompaña a los que se van a cruzar un río muy ancho. Que por eso hay que tratar bien a los perros: nunca sabes quién te va a llevar de la mano.' },
				{ text: 'El Greavard se levanta, da una vuelta alrededor de tus piernas y se vuelve a sentar a tu lado. Con mucha formalidad. Como quien firma algo.' },
				{ if: '!' + PERRO, then: [
					{ say: 'p7_dolores', text: 'Ha salido de una de esas grietas, como las flores. Lleva una semana durmiendo encima de las tumbas que nadie visita, para que no estén solas. —Le rasca la cabeza—. Creo que ya ha decidido con quién sigue el camino.' },
					{ pokemon: { sp: 'greavard', lv: 29, nature: 'calm', ability: 'pickup', happy: 160 } },
					{ say: 'p7_dolores', text: 'Cuídalo. Y el año que viene, tráelo. Le va a gustar ver la mesa puesta otra vez.' },
				], else: [
					{ say: 'p7_dolores', text: 'Ya tienes uno igual, ¿verdad? Se le nota en cómo te huele. Entonces este se queda conmigo, a cuidar a los de aquí. Ven a verlo cuando quieras: duerme en el murete.' },
					{ give: 'revivalherb' },
				] },
			], else: [
				{ say: 'p7_dolores', text: 'Otro año más. Las ofrendas son como los muñecos: una por año, aunque sea la misma gente. Sobre todo si es la misma gente.' },
				{ give: 'revivalherb' },
			] },
			{ quest: 'ev_muertos_lavanda', done: true },
			{ set: { 'vars.ofrenda_lavanda_year': '=year', 'vars.ofrenda_lavanda_n': '+1' } },
			{ diary: 'Esta noche pusimos una ofrenda en Lavanda, con Dolores y el Señor Fuji, y pan recién hecho. Había papel picado, velas y un vaso de agua por si llegaban con sed. Pusimos leche para Don Aurelio. Creo que le habría gustado. Creo que habría silbado. ¡Bzzt!', cond: 'flag.b01_diario && vars.ml_quien == 1' },
			{ diary: 'Esta noche pusimos una ofrenda en Lavanda, con Dolores y el Señor Fuji, y pan recién hecho. Había papel picado, velas y un vaso de agua por si llegaban con sed. Era para los que nadie viene a ver. Ahora alguien vino. ¡Bzzt!', cond: 'flag.b01_diario && vars.ml_quien == 2' },
			{ diary: 'Esta noche pusimos una ofrenda en Lavanda, con Dolores y el Señor Fuji, y pan recién hecho. Había papel picado, velas y un vaso de agua por si llegaban con sed. Mi entrenador{|a|e} puso algo suyo en el escalón de en medio. No le pregunté. Hay cosas que no se apuntan. ¡Bzzt!', cond: 'flag.b01_diario && vars.ml_quien != 1 && vars.ml_quien != 2' },
		],
		ev_ml_despues: [
			{ text: 'La ofrenda sigue en el fondo del cementerio pequeño. Alguien ha cambiado las velas que se gastaron y ha puesto pétalos nuevos en el caminito.' },
			{ say: 'p7_dolores', text: 'Anoche vinieron. No los vi, pero el pan amaneció más ligero. —Sonríe con los ojos cerrados—. Será el aire. Seguro que es el aire.' },
		],
		ev_ml_usar_pan: [
			{ text: 'Partes un pan de muerto. Todavía huele a naranja. Repartes los pedazos entre tu equipo, y los huesitos, que son lo mejor, también.' },
			{ heal: true },
			{ happy: { who: 'party0', n: 5 } }, { happy: { who: 'party1', n: 5 } }, { happy: { who: 'party2', n: 5 } },
			{ happy: { who: 'party3', n: 5 } }, { happy: { who: 'party4', n: 5 } }, { happy: { who: 'party5', n: 5 } },
			{ text: 'Tu equipo come despacio y con azúcar hasta en las orejas. Se han recuperado del todo.' },
		],
	},
};
