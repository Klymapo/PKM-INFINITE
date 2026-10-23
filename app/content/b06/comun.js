// Bloque 6 — elementos comunes: medallas, objetos compartidos (claves y MT de los premios de entrenamiento),
// tiendas, retos de gimnasio, enganche de inicio (Alola, Kanto, Kalos, Johto), cruces de Puerta a Teselia,
// vuelos con Aerodactyl, negocio «Estudio Casos Fríos» y aviso de ritmo.
// Contratos: secreto/bloques/b06-encargo.md.
const INICIO = 'flag.b05_fin && !flag.b06_inicio_hecho';
const ENGANCHE = { label: '🏙️ La Gira: convocatoria para Teselia', sub: 'Un aviso nuevo en la Pokédex', icon: '🏙️', cond: INICIO, new: INICIO, script: 'b06_inicio' };
const A_TESELIA = { label: 'Cruzar a Teselia (Porcelana)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b06_puerta_teselia', action: { go: 'puerta_teselia' } };

// Vuelos: un spot `go` por destino (así el mapa y el Diario saben que se puede llegar).
// Solo a ciudades ya visitadas. Excepciones: la Isla Libertad (se descubre volando) y Teja, a la que se
// puede volar sin pisarla en cuanto toca ir allí (b06_m5 en `dragospiral`: «Ruta 6 o vuelo», plan T5).
const VUELOS = [
	['porcelana', 'Ciudad Porcelana', 'visited("porcelana")'],
	['mayolica', 'Ciudad Mayólica', 'visited("mayolica")'],
	['esmalte', 'Ciudad Esmalte', 'visited("esmalte")'],
	['fayenza', 'Ciudad Fayenza', 'visited("fayenza")'],
	['teja', 'Ciudad Teja', '(visited("teja") || quest.b06_m5 == "dragospiral")'],
	['isla_libertad', 'Isla Libertad', 'true'],
];
const volar = desde => VUELOS.filter(([id]) => id !== desde).map(([id, name, ok]) => ({
	label: '🦅 Volar a ' + name, sub: 'A lomos de tu Aerodactyl', icon: '🦅',
	cond: 'flag.mount_aerodactyl && ' + ok,
	new: 'flag.mount_aerodactyl && !visited("' + id + '")',
	action: { go: id },
}));

export default {
	badges: {
		medalla_voltio: { name: 'Medalla Voltio', type: 'Electric', desc: 'Circuito Infinito · Ciudad Mayólica (Camila). Brilla un poco en la oscuridad.' },
		medalla_temblor: { name: 'Medalla Temblor', type: 'Rock', desc: 'Circuito Infinito · Ciudad Fayenza (Brock, líder de intercambio). Pesa más de lo que parece.' },
	},
	items: {
		// ----- Objetos clave (pixel art en PX_ITEMS de app/js/art.js) -----
		penduloambar: { name: 'Péndulo de ámbar', pocket: 'key', desc: 'El Ámbar sin registro, engarzado en el péndulo de latón del reloj viejo del Museo de Esmalte. Del hilo cuelga la tarjeta de Ulises. Late despacio, a compás. Abre la cabina del patio.' },
		alavencejo: { name: 'Ala de vencejo', pocket: 'key', desc: 'Un broche de dos plumas grises cruzadas, sujetas con un alfiler dorado. Los Vencejos no dan medallas. Dan esto, y no lo explican.' },
		pasetrentes: { name: 'Pase de la Gira', pocket: 'key', desc: 'Un billete de cartón grueso con el sello de la Gira Interregional. Vale para todos los trenes regionales de Teselia. El revisor lo pica con una sonrisa.' },
		// ----- MT de los premios de entrenamiento (las da el instructor de cada zona; ver b06-encargo.md) -----
		b06_mt_bola_voltio: { name: 'MT Bola Voltio', pocket: 'machines', tm: 'electroball', desc: 'Lanza una bola eléctrica. Cuanto más rápido es el usuario que el objetivo, más daño hace. Premio del Metro Batalla de Mayólica.' },
		b06_mt_alud: { name: 'MT Alud', pocket: 'machines', tm: 'avalanche', desc: 'Un golpe de hielo que pega el doble si el usuario ha recibido daño ese turno. Premio de la muralla norte de Chamota.' },
		b06_mt_pedrada: { name: 'MT Pedrada', pocket: 'machines', tm: 'rockblast', desc: 'Lanza pedruscos al objetivo de dos a cinco veces seguidas. Premio del nido del Valle de Antaño.' },
	},
	shops: {
		tienda_porcelana: { name: 'Tienda de Porcelana', items: ['pokeball', 'greatball', 'ultraball', 'quickball', 'timerball', 'duskball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'fullheal', 'maxrepel', 'maxether', { id: 'casteliacone', price: 350 }, { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_mayolica: { name: 'Tienda de Mayólica', items: ['ultraball', 'luxuryball', 'quickball', 'repeatball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', 'elixir', { id: 'thunderstone', price: 3000 }, { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_fayenza: { name: 'Tienda de Fayenza', items: ['ultraball', 'diveball', 'netball', 'healball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', 'maxether', { id: 'waterstone', price: 3000 }, { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_teja: { name: 'Tienda de Teja', items: ['ultraball', 'duskball', 'timerball', 'healball', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', 'maxelixir', { id: 'icestone', price: 3000 }, { id: 'dawnstone', price: 3000 }, { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
	},
	challenges: {
		gym_mayolica: {
			name: 'Gimnasio de Ciudad Mayólica', npc: 'camila', trainer: 'camila_g', type: 'Electric', rec: 63,
			cond: 'visited("mayolica")',
			info: [
				{ text: 'Líder: **Camila**, tipo **Eléctrico**. Modelo, estrella de la pasarela y, según la ciudad, la persona más rápida de Teselia.' },
				{ cond: 'visited("gym_mayolica")', text: '5 Pokémon, hasta el nivel 63. Su as **megaevoluciona**.' },
				{ cond: 'visited("gym_mayolica")', text: 'La **Tierra** le pega fuerte a casi todo su equipo. Cuidado: no todo lo eléctrico toca el suelo. En la **Ruta 4** y sus ruinas hay Pokémon de tipo Tierra.' },
				{ cond: 'beat("camila_g")', text: '✔ Medalla Voltio conseguida.' },
			],
		},
		gym_fayenza: {
			name: 'Gimnasio de Ciudad Fayenza', npc: 'brock', trainer: 'brock_tes', type: 'Rock', rec: 65,
			cond: 'visited("fayenza")',
			info: [
				{ text: 'Líder de intercambio: **Brock**, tipo **Roca**. Lo conoces. Él a ti también. Y sigue cocinando para todo el gimnasio.' },
				{ cond: 'visited("gym_fayenza")', text: '5 Pokémon, hasta el nivel 65. Su as **megaevoluciona**, y no es pequeño.' },
				{ cond: 'visited("gym_fayenza")', text: '**Lucha**, **Agua** y **Tierra** contra la roca; **Fuego** y **Lucha** contra el acero. Un Lucario lo sabe bien.' },
				{ cond: 'beat("brock_tes")', text: '✔ Medalla Temblor conseguida.' },
			],
		},
	},
	patches: {
		// Enganche del inicio: Mario terminó el B5 en la Aldea Marina o anda por Alola, Kanto, Kalos o Johto.
		aldea_marina: { spots: [ENGANCHE] },
		kantai: { spots: [ENGANCHE] },
		hauoli: { spots: [ENGANCHE] },
		konikoni: { spots: [ENGANCHE] },
		azafran: { spots: [ENGANCHE] },
		// Cruces por Puerta a Teselia (se abren cuando T0 activa b06_puerta_teselia)
		puerta_alola: { spots: [ENGANCHE, A_TESELIA] },
		puerta_azafran: { spots: [ENGANCHE, A_TESELIA] },
		luminalia_plaza: { spots: [ENGANCHE, A_TESELIA] },
		puerta_trigal: { spots: [ENGANCHE, A_TESELIA] },
	},
	// Vuelos (lugares de los tramos T0, T1, T3, T4, T5): se suman en index.js
	extraSpots: {
		porcelana: volar('porcelana'), mayolica: volar('mayolica'), esmalte: volar('esmalte'),
		fayenza: volar('fayenza'), teja: volar('teja'), isla_libertad: volar('isla_libertad'),
	},
	// ----- Negocio del bloque: Estudio Casos Fríos (plan §10). T0 pone el spot { venture: 'b06_estudio' } -----
	ventures: {
		b06_estudio: {
			name: 'Estudio Casos Fríos', icon: '🎙️', loc: 'estudio_casos', partner: 'renata',
			cond: 'flag.b06_caso_prueba',
			blurb: 'Un sótano con moqueta en las paredes, tres micrófonos, una cafetera heroica y el pódcast de misterio más escuchado de Teselia.',
			buy: { cost: 25000, text: '«Socia. Socio. Socie. Cool, cool, cool. Nota para el episodio: hoy {jugador} compra una parte del programa. Tú pones dinero, yo pongo genio y Nico pone los cables. La Tía Rosa pone la voz. Y el café lo pone quien llegue primero.»' },
			share: [{ pct: 35 }],
			upkeep: 800, store: 3,
			lines: {
				episodios: { name: 'Episodios', icon: '🎧', desc: 'Un caso por semana y un directo los martes. Lo que paga el alquiler, los micros y los bollos de la Tía Rosa.', money: 3000 },
				patrocinios: { name: 'Patrocinios', icon: '📦', desc: 'Las marcas mandan cajas a cambio de una mención. A veces es un objeto de combate de los buenos. A veces es una baya rara. A veces es champú.', money: 400,
					items: [{ id: 'sitrusberry', perDay: 1 }, { id: 'lumberry', perDay: 0.5 }, { id: 'keeberry', perDay: 0.2 }, { id: 'marangaberry', perDay: 0.2 }, { id: 'widelens', perDay: 0.04 }, { id: 'scopelens', perDay: 0.04 }, { id: 'shellbell', perDay: 0.04 }, { id: 'expertbelt', perDay: 0.03 }] },
				archivo: { name: 'El archivo', icon: '🗄️', desc: 'Treinta años de cajas que nadie ha abierto: pruebas de casos viejos que los oyentes donan. Algunas son cosas que hacen evolucionar a un Pokémon.', money: 200,
					items: [{ id: 'dubiousdisc', perDay: 0.05 }, { id: 'reapercloth', perDay: 0.05 }, { id: 'prismscale', perDay: 0.05 }, { id: 'razorfang', perDay: 0.05 }, { id: 'razorclaw', perDay: 0.05 }, { id: 'sachet', perDay: 0.04 }, { id: 'whippeddream', perDay: 0.04 }, { id: 'protector', perDay: 0.04 }] },
				exclusiva: { name: 'Exclusiva', icon: '⭐', desc: 'Cuando un oyente manda algo que no tiene precio. Pasa poco. Renata lo celebra subida a la mesa.', locked: true,
					items: [{ id: 'cometshard', perDay: 0.03 }, { id: 'leftovers', perDay: 0.02 }, { id: 'focussash', perDay: 0.02 }, { id: 'rarecandy', perDay: 0.03 }] },
			},
			upgrades: [
				{ id: 'cafetera', name: 'Una cafetera que no gotee', cost: 4000, mult: { all: 1.1 },
					desc: 'La de ahora es de la Tía Rosa y tiene nombre. Una nueva, de las grandes. Renata deja de grabar con taza en la mano. Bueno, menos.' },
				{ id: 'cabina', name: 'Cabina insonorizada', cost: 14000, mult: { episodios: 1.3 },
					desc: 'Ya no se oye el metro a mitad de una deducción. Ni a los vecinos de arriba. Más episodios, mejor sonido.' },
				{ id: 'micros', name: 'Micrófonos nuevos', cost: 12000, mult: { episodios: 1.2, patrocinios: 1.2 },
					desc: 'Tres micros de estudio de los buenos, con su brazo y su antipop. Las marcas escuchan la diferencia y mandan más cajas.' },
				{ id: 'sintonia', name: 'La sintonía nueva de Nico', cost: 6000, mult: { episodios: 1.15 }, slots: 1,
					desc: 'Nico lleva dos años con una sintonía en la cabeza. Con un teclado y una tarde, sale. Un poco más de audiencia y sitio para que trabaje un Pokémon más.' },
				{ id: 'estanterias', name: 'Estanterías para el archivo', cost: 16000, mult: { archivo: 1.5 }, store: 1,
					desc: 'Cajas numeradas, una escalera con ruedas y una etiqueta por caso. Aparecen cosas que nadie sabía que estaban ahí. Un día más de almacén.' },
				{ id: 'furgoneta', name: 'Furgoneta de exteriores', cost: 30000, mult: { all: 1.15 }, upkeep: 200,
					desc: 'Una furgoneta vieja con la antena en el techo y «CASOS FRÍOS» pintado a mano. Ahora se graba en el sitio de los hechos. Gasta gasolina.' },
				{ id: 'buzon', name: 'Línea de oyentes', cost: 24000, unlock: 'exclusiva',
					desc: 'Un teléfono y un buzón de voz solo para los oyentes. La mayoría llama para opinar del episodio. Algunos mandan cosas. Abre una línea nueva: exclusivas.' },
				{ id: 'local', name: 'Comprar el sótano', cost: 40000, share: 15,
					desc: 'El casero quiere vender. Si el sótano es del programa, nadie lo puede echar a la calle por un episodio incómodo. Renata te apunta 15 puntos más.' },
			],
			jobs: { slots: 1, types: ['Normal', 'Dark', 'Psychic'], favs: { zorua: 0.06, purrloin: 0.05, gothita: 0.05, whismur: 0.05, audino: 0.05 },
				text: 'Hacer de público en los directos, vigilar la puerta, ordenar cajas y, si saben, dar voces de fondo. Los que se quedan quietos delante del micro valen oro.' },
			managers: [
				{ npc: 'renata', desc: 'Lo lleva ella, que no duerme. Cuando un caso la tiene enganchada, el programa vuela.', mult: { episodios: 1.15 } },
				{ npc: 'tia_rosa', desc: 'Cuarenta años de radio. Las marcas la adoran y ella las trata de usted. Más patrocinios.', mult: { patrocinios: 1.35 }, wage: 300 },
				{ npc: 'nico_ferrer', desc: 'Se pasa las noches en el archivo con una linterna en la boca. Encuentra cosas. Más archivo.', mult: { archivo: 1.3 }, wage: 250 },
				{ npc: 'simon', cond: 'flag.p7_simon || flag.b06_simon_antena', desc: 'Lleva años esperando salir en antena. Ahora que sale, la audiencia sube. Él dice que es por su escepticismo.', mult: { episodios: 1.25 }, wage: 300 },
			],
			eventRate: 0.7,
			events: [
				{ id: 'abogados', name: 'Carta de unos abogados', w: 2, npc: 'renata', cond: '!flag.b03_renata_publica',
					text: 'Ha llegado un sobre muy grueso de un bufete con tres apellidos. Nota para el episodio: cuanto más grueso el sobre, más miedo tienen. Este es MUY grueso.',
					options: [
						{ text: '«Que lo lea la Tía Rosa en antena.»', result: 'La Tía Rosa lo lee con voz de cuento de buenas noches. Es el episodio más escuchado del mes. El bufete no vuelve a escribir. Esa semana.', effect: { boost: { mult: { episodios: 1.3 }, days: 2, label: 'Carta leída en antena' } } },
						{ text: 'Pagar a un abogado propio', cost: 3000, result: 'Un abogado joven, con corbata prestada, contesta en dos líneas. Renata la enmarca. El estudio trabaja tranquilo.', effect: { boost: { mult: { all: 1.1 }, days: 3, label: 'Con abogado' } } },
						{ text: 'Guardarla en el archivo', result: 'Nico la mete en una caja que pone «AMENAZAS (VARIAS)». Hay otras seis.' },
					] },
				{ id: 'abogados_publica', name: 'Otra carta de los abogados', w: 4, npc: 'renata', cond: 'flag.b03_renata_publica',
					text: 'Tercera carta de los abogados de Lemnis este mes. Desde que lo publiqué, no fallan ni un lunes. Ahora dicen «difamación continuada». Me gusta lo de continuada. Suena a serie.',
					options: [
						{ text: '«Ni la abras.»', result: 'Renata la abre igual. La lee. La dobla en forma de Pidove y la tira por la rejilla del sótano. Graba con rabia y le sale el mejor episodio del año.', effect: { boost: { mult: { episodios: 1.2 }, days: 2, label: 'Rabia productiva' } } },
						{ text: 'Pagar a un abogado propio', cost: 4000, result: 'El abogado contesta con cuatro folios. Lemnis tarda dos semanas en volver a escribir. Dos semanas son mucho.', effect: { boost: { mult: { all: 1.15 }, days: 3, label: 'Dos semanas de paz' } } },
					] },
				{ id: 'cable', name: 'Un Zorua en los cables', w: 3, npc: 'nico_ferrer',
					text: 'Eh… hay un Zorua en el estudio. Creo. O hay un cable del micro dos que se mueve solo y se ríe. Se ha comido medio cable. El otro medio lo tiene en la boca y no lo suelta.',
					options: [
						{ text: 'Dejarle un bollo de la Tía Rosa', result: 'El Zorua suelta el cable, se come el bollo y se va por la rejilla haciendo como que es un gato. Nico empalma el cable con cinta. Se oye un poco peor dos días.', effect: { boost: { mult: { episodios: 0.85 }, days: 2, label: 'Cable empalmado' } } },
						{ text: 'Comprar cables nuevos', cost: 1500, result: 'Cables nuevos, con funda gruesa. El Zorua vuelve, los olfatea, decide que no saben a nada y se queda a ver el directo desde la estantería. Hace de público.', effect: { boost: { mult: { all: 1.1 }, days: 3, label: 'Público de cuatro patas' }, happy: 5 } },
					] },
				{ id: 'oyente', name: 'Llamada de una oyente', w: 2, npc: 'renata', cond: 'flag.b06_t0_hecho',
					text: 'Llamó una oyente al buzón. No dijo su nombre. Preguntó cuánto se tarda en olvidar un número de serie si te lo repites cada noche. Colgó antes de que contestara. Nota para el episodio: no sé qué nota poner.',
					options: [
						{ text: '«Guarda la grabación.»', result: 'Renata la guarda en una caja sin etiqueta. La escucha dos veces más esa semana, a oscuras, con los cascos puestos.' },
						{ text: '«Ponla en el próximo directo.»', result: 'Renata lo piensa mucho rato. Al final no la pone. «Hay cosas que no son para antena». Es la primera vez que le oyes decirlo.' },
					] },
				{ id: 'cinta', name: 'La cinta del episodio 3', w: 2, npc: 'nico_ferrer', once: true, cond: 'flag.b06_apuntador_1',
					text: 'Ordenando el archivo he encontrado la cinta del episodio 3, el de la costurera. Tiene una pegatina amarilla encima que pone «CORRECCIÓN». Con la letra de Renata. No sabía que habíamos corregido nada nunca.',
					options: [
						{ text: '«Pregúntale a Renata.»', result: 'Renata mira la pegatina un momento largo. «Primera temporada. Me equivoqué. Lo corregimos». Le pone otra pegatina encima, también amarilla, y la guarda al fondo.', effect: { set: { 'flag.b06_cinta_ep3': true } } },
						{ text: 'Dejarla donde estaba', result: 'Nico la vuelve a meter en su caja. La caja tiene polvo de muchos años. La de al lado, no.', effect: { set: { 'flag.b06_cinta_ep3': true } } },
					] },
				{ id: 'audiencia', name: 'Una carta sin remite', w: 2, npc: 'tia_rosa', once: true, cond: 'flag.b06_apuntador_1',
					text: 'Ha llegado un sobre color crema, sin remite, escrito a máquina. Dentro solo hay dos palabras: «Buena audiencia». Las dos «e» están medio borradas. A Renata se le ha cortado el café, cariño.',
					options: [
						{ text: '«Tíralo.»', result: 'La Tía Rosa lo tira. Renata lo saca de la papelera cuando cree que nadie mira y lo guarda en un cajón con llave.' },
						{ text: '«Archívalo con las otras cartas.»', result: 'Nico abre una carpeta nueva y escribe en el lomo: «DESDE LA CONCHA». Renata le corrige la tilde que no lleva. Las dos se ríen. Poco.', effect: { boost: { mult: { episodios: 1.1 }, days: 2, label: 'Mosqueo productivo' } } },
					] },
				{ id: 'leyendas', name: 'Simón y la palabra prohibida', w: 2, npc: 'simon', cond: 'flag.p7_simon || flag.b06_simon_antena',
					text: 'No pienso decir «Leyendas» en antena. Me niego. Es un programa de casos. Los casos se demuestran. Las leyendas se cuentan en las acampadas. Que lo diga la Tía Rosa.',
					options: [
						{ text: '«Que lo diga la Tía Rosa.»', result: 'La Tía Rosa lo dice con tanta voz que se le eriza el pelo hasta a Simón. Él dice que es la calefacción.', effect: { boost: { mult: { episodios: 1.1 }, days: 2, label: 'Voz de la Tía Rosa' } } },
						{ text: 'Apostarle una cena a que lo dice', cost: 500, result: 'Simón aguanta tres episodios. En el cuarto se le escapa: «la leyenda de…». Se pone rojo. Paga la cena. La audiencia lo adora.', effect: { boost: { mult: { episodios: 1.25 }, days: 3, label: 'Se le escapó' } } },
					] },
			],
		},
	},
	milestones: [{ flag: 'b06_m_aviso', hoursLeft: 3 }],
};
