// Negocio nuevo (2026-10-28, encargo de Mario): la fonda de Gaspar en Ciudad Konikoni (Akala, Alola).
//   p10_cafe   «Fonda de Gaspar» · socio Gaspar (`gaspar`). Formato en docs/CONTENIDO.md §13.
//   Dónde:     Konikoni. Tras el shokugeki (`flag.b05_shoku_hecho`) Gaspar se queda en la isla y va cada mañana
//              al restaurante de Lulú (b05_lulu_despues). Aquí alquila el puesto vacío del fondo del mercado.
//   Abre:      spot «Gaspar y un puesto con un cartel» → p10_cafe_propuesta (flag p10_propuesta).
//              Entrada ₽25 000 en la ficha (buy.script p10_cafe_entrada, flag p10_cafe_abierta). Parte 40 % → 55 % (mejora `olla`).
//   Líneas:    comedor (dinero) · mostrador (Malasada Maxi) · fogon (bloqueada: Menú de Konikoni y algo de la despensa)
//              · lonja (bloqueada: perlas, Escama Corazón y objetos del mar).
//   Mejoras:   8, ₽153 000 (con la entrada, ₽178 000). Escenas: fogon, barca, letrero (nombre de la fonda), olla.
//   Encargados: Gaspar (siempre) · Lulú (`flag.p10_lulu`, tras la freidora) · Nereida (`flag.p10_nereida`, tras la barca
//              y con su prueba hecha). Sus imprevistos solo salen con su flag.
//   Referencia escondida (1, sutil): el Rattata de Alola que se cuela de noche en la cocina y mejora el guiso.

const V = 'p10_cafe';
const SOCIO = 'partner("' + V + '")';
const ABRE = 'flag.b05_shoku_hecho';
const LUC = '(inParty("riolu") || inParty("lucario"))';

export default {
	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		p10_menukonikoni: { name: 'Menú de Konikoni', pocket: 'medicine', cost: 0, use: 'p10_usar_menu',
			desc: 'Pescado de la mañana a la brasa de piedra volcánica, arroz con coco y una malasada de postre. Lo cocina Gaspar en su fonda. Al compartirlo, la amistad de todo tu equipo aumenta.' },
		p10_servilleta: { name: 'Contrato en una servilleta', pocket: 'key',
			desc: 'Una servilleta de papel con una mancha de aceite en una esquina y dos firmas. Gaspar dice que tiene más valor legal que muchos papeles con sello.',
			read: '**FONDA DE GASPAR**\n*Konikoni, mercado cubierto, puesto del fondo (el que da al puerto)*\n\n**Uno.** {jugador} pone el dinero. Gaspar pone las manos, el fuego y veinte años de camino.\n\n**Dos.** De lo que sobre limpio, cuarenta partes de cada cien son para {jugador}. Si pone más, se habla.\n\n**Tres.** Aquí come todo el que llegue. Quien no pueda pagar, friega. Quien no pueda fregar, cuenta un cuento.\n\n**Cuatro.** Cuando Gaspar se vaya detrás de la Gira, que se irá, el fuego no se apaga. Lo enciende otra persona.\n\n**Cinco.** No se pregunta qué hay en la olla.\n\n*(Firmas. La de Gaspar ocupa media servilleta. Debajo, a lápiz, con otra letra:)* «Comer bien es la mitad de la aventura. La otra mitad es pagar el alquiler.»' },
	},

	// =====================================================================
	// PARCHES A LUGARES YA PUBLICADOS
	// =====================================================================
	patches: {
		konikoni: { spots: [
			{ label: 'Gaspar y un puesto con un cartel', sub: 'Al fondo del mercado, el que da al puerto', icon: '🍳', cond: ABRE + ' && !' + SOCIO, new: '!flag.p10_propuesta', talk: [{ script: 'p10_cafe_propuesta' }] },
			{ label: 'La fonda de Gaspar', sub: 'Seis mesas, un fogón y el puerto delante', icon: '🍳', cond: SOCIO, new: '!flag.p10_cafe_abierta', action: { venture: V } },
			{ label: 'Gaspar, entre fogones', sub: 'Siempre hay algo en el fuego', icon: '🔥', cond: SOCIO, new: '!flag.p10_charla_1', talk: [{ script: 'p10_cafe_charla' }] },
			{ label: 'Lulú, con una cesta de bayas', sub: 'Mira la freidora nueva con los ojos entornados', icon: '🧺', cond: SOCIO + ' && flag.p10_c_freidora && !flag.p10_lulu', new: 'true', talk: [{ script: 'p10_lulu_llega' }] },
			{ label: 'Una chica con un cubo', sub: 'Está sentada en la barca de la fonda', icon: '🎣', cond: SOCIO + ' && flag.p10_c_barca && flag.b05_nereida_hecha && !flag.p10_nereida', new: 'true', talk: [{ script: 'p10_nereida_llega' }] },
		] },
	},

	// =====================================================================
	// NEGOCIO
	// =====================================================================
	ventures: {
		p10_cafe: {
			name: 'Fonda de Gaspar', icon: '🍳', loc: 'konikoni', partner: 'gaspar',
			cond: 'flag.p10_propuesta',
			blurb: 'Un puesto del mercado de Konikoni, seis mesas cojas y un cocinero que lleva veinte años sin cocina propia.',
			buy: { cost: 25000, text: '«Tú pones el dinero, yo pongo el fuego. Y nadie pregunta qué hay en la olla.»', script: 'p10_cafe_entrada', set: { 'flag.p10_cafe_abierta': true } },
			share: [{ pct: 40 }],
			upkeep: 800, store: 3,
			lines: {
				comedor: { name: 'Comida corrida', icon: '🍲', money: 4200,
					desc: 'Sopa, guisado, arroz y agua fresca de lo que haya. Un precio, sin carta. La gente del puerto come aquí y los aspirantes de la Gira, también.' },
				mostrador: { name: 'Mostrador de malasadas', icon: '🍩', money: 900, items: [{ id: 'bigmalasada', perDay: 2 }],
					desc: 'Para llevar. Gaspar dice que una malasada bien frita cura cualquier cosa. Las Malasadas Maxi que no se venden son para ti.' },
				fogon: { name: 'Los platos de la casa', icon: '🔥', money: 800, locked: true,
					items: [{ id: 'p10_menukonikoni', perDay: 0.5 }, { id: 'leftovers', perDay: 0.02 }, { id: 'rarecandy', perDay: 0.04 }],
					desc: 'Lo que Gaspar cocina en el fogón de piedra volcánica cuando nadie le mete prisa: el Menú de Konikoni y, de vez en cuando, algo de la despensa que no sabe de dónde salió.' },
				lonja: { name: 'La pesca de la mañana', icon: '🐟', money: 400, locked: true,
					items: [{ id: 'pearl', perDay: 0.6 }, { id: 'heartscale', perDay: 0.3 }, { id: 'bigpearl', perDay: 0.08 }, { id: 'shellbell', perDay: 0.03 }, { id: 'deepseascale', perDay: 0.02 }, { id: 'deepseatooth', perDay: 0.02 }],
					desc: 'Lo que trae la barca antes de que salga el sol. El pescado va a la olla; lo que aparece dentro de las conchas, a tu mochila.' },
			},
			upgrades: [
				{ id: 'toldo', name: 'Un toldo y seis mesas que no cojeen', cost: 8000, mult: { all: 1.2 },
					desc: 'Ahora mismo las mesas cojean cada una hacia un lado distinto y a mediodía el sol cae a plomo. Toldo de lona a rayas y calzos de verdad: todo rinde más.' },
				{ id: 'freidora', name: 'Una freidora de verdad', cost: 12000, mult: { mostrador: 1.6 }, set: { 'flag.p10_c_freidora': true },
					desc: 'Gaspar fríe las malasadas en una sartén que trajo de Kalos y que ha visto cosas. Con una freidora de dos cestas salen muchas más. El olor llega hasta el otro lado del mercado.' },
				{ id: 'letrero', name: 'El nombre en la puerta', cost: 6000, mult: { all: 1.05 }, script: 'p10_c_up_nombre',
					desc: 'La fonda no tiene nombre. La gente la llama «la del calvo». Un letrero pintado a mano, con el nombre que decidas tú, porque Gaspar no se decide.' },
				{ id: 'fogon', name: 'El fogón de piedra volcánica', cost: 30000, unlock: 'fogon', set: { 'flag.p10_c_fogon': true }, script: 'p10_c_up_fogon',
					desc: 'Piedras del Wela que guardan el calor toda la noche. Gaspar las quiere desde que llegó a Akala. Abre una línea nueva: los platos de la casa.' },
				{ id: 'barca', name: 'Una barca para la pesca de la mañana', cost: 26000, unlock: 'lonja', set: { 'flag.p10_c_barca': true }, script: 'p10_c_up_barca',
					desc: 'De segunda mano, con la pintura levantada y un remo que no hace juego con el otro. Para no depender de lo que sobre en la lonja. Abre una línea nueva: la pesca de la mañana.' },
				{ id: 'nevera', name: 'Cámara fría', cost: 14000, store: 2, upkeep: -150,
					desc: 'En Konikoni hace calor hasta de noche. Con una cámara fría no se tira nada: caben dos días más en el almacén y el gasto baja.' },
				{ id: 'terraza', name: 'Terraza con vistas al volcán', cost: 22000, mult: { comedor: 1.4 }, slots: 1,
					desc: 'Los tablones de detrás del puesto dan al puerto y, al fondo, al Wela. Barandilla, farolillos y cuatro mesas más. Más comidas y sitio para un Pokémon más trabajando.' },
				{ id: 'olla', name: 'La olla grande', cost: 35000, share: 15, script: 'p10_c_up_olla',
					desc: 'Una olla de cobre de cien raciones, de las que ya no se hacen. Gaspar lleva veinte años mirándolas en los escaparates. Si se la pagas tú, tu parte sube 15 puntos.' },
			],
			jobs: { slots: 2, types: ['Fire', 'Normal', 'Water'],
				favs: { munchlax: 0.05, swirlix: 0.06, milcery: 0.06, bounsweet: 0.05, happiny: 0.04, remoraid: 0.04, cramorant: 0.04 },
				text: 'Avivar el fuego, servir, oler si el guiso está listo o salir en la barca de madrugada. Los que nacieron entre azúcar y cremas no lo llaman trabajo.' },
			synergy: [
				{ from: 'p7_rancho', line: 'leche', min: 10, mult: { mostrador: 1.15 }, label: 'Leche del Rancho Prado',
					desc: 'La masa de las malasadas lleva leche. Con la del Rancho Prado, Gaspar dice que «suben solas».' },
			],
			managers: [
				{ npc: 'gaspar', mult: { fogon: 1.2 },
					desc: 'Cocina como quien pelea: fuego alto y sartén en el aire. Con él al frente, los platos de la casa salen mejor. Las cuentas, peor.' },
				{ npc: 'lulu', cond: 'flag.p10_lulu', wage: 300, mult: { comedor: 1.25, mostrador: 1.15 },
					desc: 'Viene los días que cierra su restaurante. Cocina con calma, tararea y nadie se va sin repetir. Más comidas y más malasadas.' },
				{ npc: 'nereida', cond: 'flag.p10_nereida', wage: 250, mult: { lonja: 1.4 },
					desc: 'Sale en la barca antes que nadie y vuelve con la red llena. Jura que pesca con la mano. Puede que sea verdad.' },
			],
			eventRate: 0.7,
			events: [
				{ id: 'crucero', name: 'Ha atracado un barco', w: 3, npc: 'gaspar',
					text: '¡{jugador}! ¡Ha atracado un barco de Kanto! Trescientas personas que llevan seis días comiendo sándwiches de máquina. Se les nota en la cara. Tengo una olla. Necesito tres.',
					options: [
						{ text: 'Contratar dos cocineros del puerto por hoy', cost: 2500, result: 'Dos cocineras de la lonja, cuchillos propios y cero preguntas. Se acaba el arroz a las dos, el guiso a las tres y la paciencia de Gaspar nunca. Al día siguiente vuelven la mitad de los del barco.', effect: { boost: { mult: { comedor: 1.5 }, days: 2, label: 'Gente del barco' } } },
						{ text: '«Que hagan cola.»', result: 'Hacen cola. Una cola que da la vuelta al mercado. Gaspar sirve hasta que se le acaba la olla y a los últimos les da una malasada y una disculpa.', effect: { boost: { mult: { comedor: 1.15 }, days: 1, label: 'Cola en el mercado' } } },
					] },
				{ id: 'rattata', name: 'Alguien prueba el guiso', w: 2, npc: 'gaspar',
					text: 'Tengo que contarte algo y no te rías. Hay un Rattata en la cocina. De los de aquí: negro, bigotes gordos. Cada noche se sube al borde de la olla y prueba el guiso. Y cada mañana el guiso está mejor. No sé qué le hace. No quiero saberlo. Quiero que siga.',
					options: [
						{ text: '«Déjale un plato.»', result: 'Gaspar deja un plato en el suelo, junto al fogón. Por la mañana está limpio y el guiso tiene algo nuevo, una hoja de algo que Gaspar no reconoce. Lo apunta en el recetario: «Ingrediente: no preguntar».', effect: { boost: { mult: { all: 1.12 }, days: 3, label: 'Ayudante nocturno' }, happy: 5 } },
						{ text: 'Poner una tapa con cierre', cost: 400, result: 'Tapa de cobre con pestillo. El Rattata se sienta delante toda la noche, ofendido. El guiso sale normal. Bueno, pero normal. Gaspar quita el pestillo al tercer día sin decir nada.' },
					] },
				{ id: 'pimienta', name: 'Se acabó la pimienta del Wela', w: 2, npc: 'gaspar',
					text: 'Se ha acabado la pimienta de lava. La del Wela. Sin ella, mi guiso es un guiso. Un buen guiso, sí. Pero un guiso que no se atreve. Ya sabes lo que pienso de eso.',
					options: [
						{ text: 'Pagar a un porteador para que suba a por ella', cost: 1500, result: 'El porteador baja del volcán con un saco y las cejas chamuscadas. Esa noche el guiso pica tanto que un cliente se pone de pie y aplaude sin saber por qué.', effect: { boost: { mult: { comedor: 1.3 }, days: 3, label: 'Pimienta de lava' } } },
						{ text: '«Cocina sin ella unos días.»', result: 'Gaspar cocina sin ella. Lulú pasa, prueba y dice que está «muy rico y muy educado». Gaspar no le habla en toda la mañana.', effect: { boost: { mult: { comedor: 0.9 }, days: 2, label: 'Guiso prudente' } } },
					] },
				{ id: 'critico', name: 'Un crítico de Luminalia', w: 2, npc: 'gaspar', once: true,
					text: 'Ha venido un crítico. De Luminalia, con libreta y pañuelo en el cuello. Ha probado mi guiso y ha escrito una frase. Se la he leído al revés, desde el otro lado del mostrador. Pone «le falta valentía». A MÍ. A MI GUISO.',
					options: [
						{ text: '«Invítalo a la cocina.»', result: 'El crítico entra a la cocina. Sale tres horas después, sin pañuelo y con la camisa manchada de coco. La reseña dice: «Valiente hasta la temeridad. Volveré con hambre». Gaspar la pega con cinta en el mostrador.', effect: { money: 4500 } },
						{ text: 'Darle de comer hasta que se calle', cost: 800, result: 'Siete platos, uno detrás de otro. Al quinto, el crítico deja de escribir. Al séptimo, se queda dormido. La reseña sale una semana después y solo dice: «Vayan».', effect: { boost: { mult: { all: 1.2 }, days: 4, label: '«Vayan»' } } },
						{ text: '«Tiene razón en algo, ¿no?»', result: 'Gaspar te mira como quien mira un caldo frío. Luego se ríe, muy fuerte, solo. «Eso le dije yo a Lulú. Me lo merezco». Esa noche cocina algo nuevo. No le dice a nadie qué.' },
					] },
				{ id: 'boda', name: 'Una boda en Hauoli', w: 2, npc: 'gaspar',
					text: 'Me han llamado de Hauoli. Una boda, doscientas personas, tres días de fiesta. Quieren al cocinero «del guiso que hace llorar». Soy yo. Lo he comprobado. Si voy, la fonda se queda a medio gas.',
					options: [
						{ text: '«Ve. Y que te paguen bien.»', result: 'Gaspar vuelve a los tres días con un sobre, una corona de flores torcida y la voz ronca de cantar. «Lloraron. Todos. El novio, dos veces».', effect: { money: 5000, boost: { mult: { all: 0.85 }, days: 2, label: 'Gaspar de boda' } } },
						{ text: '«Que vengan a comer aquí.»', result: 'Vienen. Doscientas personas en un mercado. Las mesas se juntan en el pasillo, los vecinos sacan sillas y el banquete se acaba a las cuatro de la mañana con la novia friendo malasadas.', effect: { boost: { mult: { comedor: 1.35, mostrador: 1.2 }, days: 2, label: 'Boda en el mercado' } } },
					] },
				{ id: 'lulu_sal', name: 'Sal o azúcar', w: 2, npc: 'lulu', cond: 'flag.p10_lulu',
					text: '¡Uy! ¡Uy-uy-uy! Alguien ha cambiado el azúcar de la freidora por sal. Las malasadas de esta mañana están… Ok. Ok. Están saladas. Gaspar dice que no ha sido él. Gaspar sonríe mucho para no haber sido él.',
					options: [
						{ text: '«Véndelas como malasadas de mar.»', result: 'Lulú escribe en una pizarra «MALASADAS DE MAR (nuevas)». Se acaban antes que las dulces. Gaspar pide la receta. Lulú le dice que la pregunte a quien cambió el azúcar.', effect: { boost: { mult: { mostrador: 1.3 }, days: 2, label: 'Malasadas de mar' } } },
						{ text: 'Tirarlas y freír otra tanda', cost: 600, result: 'Otra tanda, esta vez dulce. Lulú pone un cartel en el bote del azúcar: «AZÚCAR. DE VERDAD. NO TOCAR, GASPAR». Gaspar dice que el cartel le ofende. No lo quita.', effect: { happy: 5 } },
					] },
				{ id: 'nereida_wailord', name: 'La pesca de hoy', w: 2, npc: 'nereida', cond: 'flag.p10_nereida',
					text: 'Hoy he pescado un Wailord. —Pausa larga—. Con la mano. —Pausa más larga—. Era mentira. Era un banco de Wishiwashi. Pero se ha juntado, y pesa. Está en la barca. La barca se hunde un poco.',
					options: [
						{ text: '«Suéltalos.»', result: 'Los suelta. Los Wishiwashi se separan, se quedan un rato alrededor de la barca y se van. Al recoger la red, entre la arena, hay algo que brilla.', effect: { items: [{ id: 'pearl', n: 2 }] } },
						{ text: 'Pagarle un día de barca extra', cost: 1200, result: 'Nereida sale otra vez a mediodía. Vuelve con la red llena y la cara seria. «Esta vez no miento». Luego: «Bueno. Un poco».', effect: { boost: { mult: { lonja: 1.5 }, days: 2, label: 'Doble salida' } } },
					] },
				{ id: 'temporal', name: 'Viene temporal', w: 1, npc: 'gaspar', cond: 'flag.p10_c_barca',
					text: 'Mala mar. Los de la lonja han amarrado todo y dicen que mañana no sale nadie. Yo digo que los peces también se esconden cuando llueve. Que no se los puede culpar.',
					options: [
						{ text: '«Que no salga nadie.»', result: 'La barca se queda amarrada. Esa noche, con el puerto cerrado, la fonda se llena de pescadores que no tienen otra cosa que hacer que comer y quejarse. Se les da bien.', effect: { boost: { mult: { lonja: 0.6, comedor: 1.2 }, days: 1, label: 'Temporal' } } },
						{ text: 'Reforzar los cabos y la lona', cost: 900, result: 'La barca aguanta, la terraza aguanta y Gaspar sale bajo la lluvia a mirar el mar con una taza de caldo en la mano, muy contento, como si lo hubiera encargado él.', effect: { boost: { mult: { all: 1.05 }, days: 3, label: 'Todo en su sitio' } } },
					] },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ---- La propuesta (spot en Konikoni) ----
		p10_cafe_propuesta: [
			{ if: SOCIO, then: [{ venture: V }, { end: true }] },
			{ if: 'flag.p10_propuesta', then: [
				{ say: 'gaspar', text: '¡{jugador}! El puesto sigue vacío y yo sigo mirándolo. El trato también sigue: **₽25 000**, tú pones el dinero, yo pongo el fuego. Míralo con calma. Pero no mucha, que se enfría.' },
				{ venture: V },
				{ end: true },
			] },
			{ set: { 'flag.p10_propuesta': true } },
			{ text: 'Al fondo del mercado cubierto de Konikoni, donde los puestos se acaban y empieza el olor a puerto, hay uno con la persiana a medio subir. Dentro: un mostrador de azulejos rotos, seis mesas cojas y un fogón frío. En la persiana, un cartel escrito a mano: «SE TRASPASA. PREGUNTAR EN LA LONJA».' },
			{ text: 'Delante, con los brazos cruzados y el cuchillo envuelto en su paño al hombro, Gaspar mira el fogón frío como quien mira a un Pokémon que todavía no se deja acariciar.' },
			{ say: 'gaspar', text: '¡Hombre, {jugador}! ¿Has comido? No contestes. No has comido. Se te nota en la cara y en el Pokémon.', cond: '!' + LUC },
			{ say: 'gaspar', text: '¡Hombre, {jugador}! ¿Has comido? No contestes. —Mira a {riolu}—. Él tampoco. Se le nota en las orejas.', cond: LUC },
			{ if: 'flag.b05_shoku_lulu', then: [
				{ say: 'gaspar', text: 'Desde que me ganó aquel caldo, voy cada mañana a la cocina de Lulú a ver cómo lo hace. Corta, prueba, espera. Sobre todo, espera. Yo no sé esperar. Llevo veinte años cocinando de pie, al lado de un camino, con prisa por el siguiente.' },
			] },
			{ if: 'flag.b05_shoku_gaspar', then: [
				{ say: 'gaspar', text: 'Lulú quiere la revancha. Todas las mañanas. Y todas las mañanas cocino en su cocina, con sus cuchillos y su sal. Un cocinero no puede ganar dos veces en la cocina de otro. No es elegante.' },
			] },
			{ if: 'flag.b05_shoku_empate', then: [
				{ say: 'gaspar', text: 'Lulú y yo llevamos no sé cuántos empates. Ella cocina en su casa. Yo cocino en su casa. Ella dice que eso es hacer trampa. Yo digo que es visitar. Los dos sabemos que tiene razón.' },
			] },
			{ say: 'gaspar', text: 'Veinte años. Kalos, Johto, mazmorras de las que no se habla. Siempre una olla, una hoguera y lo que el camino me diera. Nunca he tenido una cocina que se quedara quieta cuando yo me voy.' },
			{ say: 'gaspar', text: '—Da un golpecito en el mostrador. Se cae un azulejo—. Este puesto da al puerto. Por aquí pasan los pescadores, los del mercado y todos los aspirantes de la Gira que bajan a Konikoni. Y los aspirantes comen fatal. Eso ya lo sabes.' },
			{ prompt: 'Gaspar recoge el azulejo y lo deja en su sitio, con cuidado.', choice: [
				{ text: '«¿Me estás pidiendo dinero?»', then: [
					{ say: 'gaspar', text: '¡Ja! Te estoy pidiendo algo peor. Te estoy pidiendo que te sientes a la mesa conmigo para siempre. El dinero es lo de menos. Bueno, no. Es lo de más. Pero suena peor.' },
				] },
				{ text: '«¿Y cuando la Gira se vaya de Alola?»', then: [
					{ say: 'gaspar', text: 'Me iré detrás. Ya lo sé. —Se encoge de hombros—. Por eso lo quiero. Para que, cuando yo no esté, alguien encienda este fuego por las mañanas. Un fuego que se apaga cada vez que te vas no es un hogar. Es una hoguera.' },
				] },
				{ text: 'Sentarte en una de las mesas cojas', then: [
					{ text: 'Te sientas. La mesa se inclina hacia la izquierda. Gaspar te mira un momento, se sienta enfrente y la mesa se endereza.' },
					{ say: 'gaspar', text: 'Eso. Así se empieza. Uno se sienta, el otro también, y la mesa ya no cojea. —Se ríe—. Esto lo voy a apuntar.' },
				] },
			] },
			{ say: 'gaspar', text: 'El trato es este. Tú pones **₽25 000** para el traspaso y lo primero que haga falta. Yo pongo las manos, el fuego y el recetario. De lo que sobre limpio, cuarenta partes de cada cien son tuyas. Si un día pones más, se habla.' },
			{ say: 'gaspar', text: 'Y una regla, la de siempre: aquí no se pregunta qué hay en la olla. Comer bien es la mitad de la aventura. La otra mitad es pagar el alquiler.' },
			{ intel: { npc: 'gaspar', text: 'Lleva veinte años cocinando por los caminos sin una cocina propia. Quiere alquilar un puesto vacío del mercado de Konikoni, al fondo, el que da al puerto, para que «alguien encienda el fuego cuando yo no esté».' } },
			{ venture: V },
		],

		// ---- Entrada (buy.script) ----
		p10_cafe_entrada: [
			{ set: { 'flag.p10_cafe_abierta': true } },
			{ text: 'Gaspar no tiene papel. Tiene una servilleta. La alisa sobre el mostrador con la palma de la mano, saca un lápiz de detrás de la oreja y escribe cinco puntos, numerados, con una letra enorme que no cabe.' },
			{ say: 'gaspar', text: 'Esto tiene más valor que muchos papeles con sello. Los papeles con sello no llevan aceite. Este, sí. Firma debajo. No, ahí no. Ahí está la mancha. Más abajo.' },
			{ text: 'Firmas. Gaspar firma al lado, ocupando media servilleta. Luego la dobla en cuatro y te la da.' },
			{ give: 'p10_servilleta' },
			{ text: 'Sube la persiana del todo. Suena como un tren. Raspa una cerilla, la acerca al fogón y espera. El fuego tarda. Luego prende, azul y después naranja.' },
			{ say: 'gaspar', text: '—Se queda mirándolo—. Veinte años. —Se aclara la garganta—. Bueno. Ya está. Ya hay fuego. Ahora siéntate, que la primera comida de la casa la paga la casa. Y la casa eres tú, así que la pagas tú. Pero no te lo cobro.' },
			{ text: 'Sopa de pescado, arroz con coco y un vaso de agua de Baya Tamate. Comes en una mesa coja, mirando al puerto. Un pescador se asoma, huele, se sienta sin preguntar. Detrás, otro.' },
			{ say: 'gaspar', text: 'Los Pokémon que quieras traer, que vengan. Aquí hay trabajo para quien sepa del fuego, del agua o simplemente de comer. Y si alguno sabe de dulces… ese que venga primero.' },
			{ diary: 'Hoy hemos abierto una fonda en Konikoni con Gaspar. El contrato está escrito en una servilleta. Tiene una mancha de aceite en una esquina y Gaspar dice que eso le da valor legal.\n\nLa fonda ya sale en mi pantalla de Negocios. ¡Bzzt! Si se llena el almacén, aviso. Si se acaban las malasadas, también. Eso es más urgente.', cond: 'flag.b01_diario' },
			{ intel: { npc: 'gaspar', text: 'Son socios de la fonda del mercado de Konikoni. El contrato es una servilleta con cinco puntos; el quinto: «no se pregunta qué hay en la olla».' } },
		],

		// ---- Charla de siempre (cambia con lo que se ha comprado) ----
		p10_cafe_charla: [
			{ set: { 'flag.p10_charla_1': true } },
			{ if: 'flag.p10_c_fogon', then: [
				{ say: 'gaspar', text: 'Las piedras del Wela siguen calientes por la mañana. Dejo el guiso toda la noche encima y por la mañana sabe a volcán. A volcán tranquilo. A volcán de domingo.' },
			], else: [
				{ say: 'gaspar', text: 'Este fogón es de gas y tiene mal carácter. Se apaga cuando le da la gana. Lo que yo quiero son piedras del Wela, de las que guardan el calor toda la noche. Algún día.' },
			] },
			{ say: 'gaspar', text: 'Lulú viene los días que cierra lo suyo. Ella corta, yo frío, y entre los dos no queda una mesa libre. Nos peleamos por la sal. Lo normal.', cond: 'flag.p10_lulu' },
			{ say: 'gaspar', text: 'La capitana Nereida me trae la pesca. Dice que con la mano. Yo no pregunto. En esta casa no se pregunta.', cond: 'flag.p10_nereida' },
			{ say: 'gaspar', text: 'Ya sabes cómo se llama esto. Lo pone en la puerta. Hay gente que entra solo para preguntar por el nombre y se queda a comer.', cond: 'flag.p10_nombre' },
			{ say: 'gaspar', text: 'Siéntate, que hay sopa. Comer bien es la mitad de la aventura. La otra mitad, la de ahí fuera, ya la llevas tú.' },
		],

		// ---- Escenas de mejoras ----
		p10_c_up_nombre: [
			{ set: { 'flag.p10_nombre': true } },
			{ text: 'El pintor del mercado llega con una tabla de madera, tres botes de pintura y prisa. Pregunta qué pone. Gaspar te mira. Tú miras a Gaspar.' },
			{ say: 'gaspar', text: 'Yo pondría «Gaspar». Pero eso es lo que pondría un cocinero con ego. Y yo lo soy. Así que decide tú.' },
			{ prompt: '¿Qué pone el letrero?', choice: [
				{ text: '«La mitad de la aventura»', then: [
					{ set: { 'flag.p10_nombre_mitad': true } },
					{ say: 'gaspar', text: '—Se le humedecen los ojos. Lo disimula fatal—. Es mi frase. Me la has puesto en la puerta. Ya no la puedo cambiar. Bueno. No pensaba cambiarla.' },
				] },
				{ text: '«La olla que no se pregunta»', then: [
					{ set: { 'flag.p10_nombre_olla': true } },
					{ say: 'gaspar', text: '¡Ja! Así la gente viene avisada. Los valientes entran. Los demás, también, porque huele bien.' },
				] },
				{ text: '«Fonda Rocafort»', then: [
					{ set: { 'flag.p10_nombre_rocafort': true } },
					{ say: 'gaspar', text: '…Mi apellido. Hacía años que nadie lo escribía en ningún sitio que no fuera una multa. —Carraspea—. Ponlo grande. Que se vea desde el barco.' },
				] },
			] },
			{ text: 'Al día siguiente, el letrero está colgado encima de la persiana. La pintura todavía huele. Un niño del puerto lo lee en voz alta, despacio, y entra a preguntar si hay malasadas.' },
		],
		p10_c_up_fogon: [
			{ text: 'Llegan en una carretilla, envueltas en sacos mojados para que no quemen las manos: seis piedras negras y porosas, del tamaño de una cabeza. Del Wela.' },
			{ say: 'gaspar', text: 'Me las han bajado del volcán. Me dijeron que el fuego no se domina, que se acompaña. Lo dijo un chaval muy serio con una danza muy rara. Tenía razón.', cond: 'flag.b05_kiawe_hecha' },
			{ say: 'gaspar', text: 'Me las han bajado del volcán. Me dijeron que el fuego no se domina, que se acompaña. No sé quién lo dijo primero. Suena a algo que dice alguien de por aquí.', cond: '!flag.b05_kiawe_hecha' },
			{ text: 'Gaspar las coloca una a una en el fogón, con la misma ceremonia con la que otros colocan medallas en una vitrina. Enciende debajo. Espera. Las piedras se ponen rojas por dentro, despacio, como si respiraran.' },
			{ say: 'gaspar', text: 'Ahora sí. Esto aguanta el calor toda la noche. Puedo dejar un guiso aquí al cerrar y por la mañana estará mejor que cuando me fui. Como los buenos amigos.' },
			{ say: 'gaspar', text: 'Y con este fuego va a salir mi Menú de Konikoni. Pescado de la mañana, arroz con coco y una malasada de postre. Para compartir con tu equipo, que la comida que no se comparte se enfría más rápido.' },
			{ give: 'p10_menukonikoni', n: 2 },
		],
		p10_c_up_barca: [
			{ text: 'La barca está en la rampa del puerto, boca abajo. Tiene la pintura levantada, un nombre borrado en la proa y dos remos que no son de la misma barca.' },
			{ say: 'gaspar', text: 'Es preciosa. No me mires así. Es preciosa por dentro. Como un guiso feo.' },
			{ say: 'gaspar', text: 'Yo no sé pescar. Sé limpiar, cortar y cocinar lo que otro ha pescado. Pero en Akala hay una capitana que dicen que pesca con la mano. Si alguna mañana la ves por aquí, dile que la barca está libre.', cond: 'flag.b05_nereida_hecha' },
			{ say: 'gaspar', text: 'Yo no sé pescar. Sé limpiar, cortar y cocinar lo que otro ha pescado. De momento, saldrá algún chico de la lonja. Ya aparecerá alguien que sepa de verdad.', cond: '!flag.b05_nereida_hecha' },
			{ text: 'Entre los dos le dan la vuelta. Pesa más de lo que parece. Debajo, pegada a la madera, hay una concha con una perla diminuta dentro. Gaspar te la da sin decir nada, como quien da la vuelta de una compra.' },
			{ give: 'pearl' },
		],
		p10_c_up_olla: [
			{ text: 'La olla llega en una caja de madera con paja. Cobre batido a mano, asas de hierro y un fondo tan grueso que suena como una campana cuando Gaspar le da con los nudillos.' },
			{ text: 'Gaspar no dice nada. La saca de la caja, la pone en el fogón vacío y se queda un rato mirándola con las manos en las caderas.' },
			{ say: 'gaspar', text: 'En Kalos había una así en el escaparate de una tienda de Vánitas. Pasaba por delante cada otoño. Cada otoño costaba más. Cada otoño yo tenía menos.' },
			{ say: 'gaspar', text: '—Se pasa el pañuelo por la frente aunque no hace calor—. Cien raciones. Cien. Ya no hace falta decirle a nadie que no queda. —Te mira—. Apunta tu parte en la servilleta. Más grande. Te la has ganado. Y no protestes, que en esta cocina mando yo.' },
		],

		// ---- Encargados que se ganan con escena ----
		p10_lulu_llega: [
			{ set: { 'flag.p10_lulu': true } },
			{ text: 'Lulú está delante del mostrador con una cesta de bayas en la cadera y la nariz arrugada. Detrás de ella, su Tsareena huele el aire con la misma cara.' },
			{ say: 'lulu', text: '¡Huele a fritura desde mi cocina! ¡Desde mi cocina! Tengo el caldo al fuego y no hay manera de pensar en el caldo. Solo en malasadas. ¡Eso no se hace!' },
			{ say: 'gaspar', text: 'Eso se llama competencia, capitana.' },
			{ say: 'lulu', text: 'Eso se llama una freidora de dos cestas y un señor que no sabe cuándo parar. —Deja la cesta en el mostrador—. Ok. Ok. Propuesta. Los días que cierro lo mío, vengo aquí. Yo cocino tranquila, él fríe, y la gente come dos veces.' },
			{ say: 'lulu', text: 'Y así vigilo que no le ponga pimienta del Wela a las malasadas. Lo ha intentado. Lo sé. ¡Lo sé!', cond: 'flag.b05_shoku_gaspar' },
			{ say: 'lulu', text: 'Y así aprendo a freír sin que se me queme nada. Él dice que a mi caldo le faltaba valentía. Pues a sus malasadas les falta paciencia. ¡Empate!', cond: '!flag.b05_shoku_gaspar' },
			{ say: 'gaspar', text: 'La decisión es de {jugador}. —Señala la servilleta pegada en la pared—. Punto cuatro: cuando yo no esté, el fuego lo enciende otra persona. No se me ocurre nadie mejor. Pero no se lo digas, que se le sube.' },
			{ say: 'lulu', text: '¡Ya me lo has dicho! ¡Bien-bien! —Se pone un delantal que no es suyo. Le queda grande—. Cobro poco. Y en bayas, si hace falta.' },
			{ toast: 'Lulú puede llevar la Fonda de Gaspar. Elígela en la ficha del negocio.' },
			{ intel: { npc: 'lulu', text: 'Se ofrece a llevar la fonda de Gaspar los días que cierra su restaurante: «yo cocino tranquila, él fríe, y la gente come dos veces».' } },
		],
		p10_nereida_llega: [
			{ set: { 'flag.p10_nereida': true } },
			{ text: 'Hay una chica sentada en la barca de la fonda, que sigue en la rampa. Pelo azul, pies descalzos, un cubo entre las rodillas. Tiene el brazo metido en el cubo hasta el codo.' },
			{ say: 'nereida', text: 'Hola. Esta barca tiene un agujero. —Pausa—. Era mentira. Pero lo has mirado.' },
			{ say: 'nereida', text: 'Me han dicho que buscan a alguien que pesque. Yo pesco. Con la mano. —Saca el brazo del cubo. Tiene un Magikarp agarrado, muy tranquilo—. Esto no cuenta. Es de casa.' },
			{ say: 'gaspar', text: '—Desde el mostrador—. ¡Si trae pescado de verdad, que pase! ¡Si trae mentiras, también, que las mentiras con hambre son peores!' },
			{ say: 'nereida', text: 'Salgo antes del sol. Vuelvo cuando la red pesa. Lo que hay dentro de las conchas no se cocina: se lo dejo a ustedes. —Te mira, muy seria—. Cobro poco. Y no me llevo bien con los remos. Los dos son de barcas distintas.' },
			{ say: 'nereida', text: '…Eso no era mentira.' },
			{ toast: 'Nereida puede llevar la Fonda de Gaspar. Elígela en la ficha del negocio.' },
			{ intel: { npc: 'nereida', text: 'Sale de madrugada en la barca de la fonda de Gaspar. Dice que pesca con la mano y deja para el negocio lo que aparece dentro de las conchas.' } },
		],

		// ---- Usar el Menú de Konikoni ----
		p10_usar_menu: [
			{ text: 'Abres el Menú de Konikoni. Huele a brasa, a coco y a puerto por la mañana. La malasada del postre todavía está tibia.' },
			{ happy: { who: 'party0', n: 10 } }, { happy: { who: 'party1', n: 10 } }, { happy: { who: 'party2', n: 10 } },
			{ happy: { who: 'party3', n: 10 } }, { happy: { who: 'party4', n: 10 } }, { happy: { who: 'party5', n: 10 } },
			{ text: 'Tu equipo come sentado en corro, pasándose el plato. Se nota que se han acercado un poco más.' },
		],
	},
};
