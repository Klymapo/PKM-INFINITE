// Bloque 7 — elementos comunes: medallas, objetos compartidos (MT de los premios de entrenamiento, Sello de los
// Siete Oficios, cartas del Buzón), tiendas, retos de gimnasio, enganche de inicio (desde Teselia, Alola, Kanto,
// Kalos y Johto), vuelos con Aerodactyl por Galar, negocio nuevo «El Campo de los Hargreave», ampliación del
// Estudio Casos Fríos, ecos del Buzón (Terrón, Chamota, Camille) y aviso de ritmo.
// Contratos: secreto/bloques/b07-encargo.md.
// Lo que depende de lugares o entrenadores de los tramos (venture.loc, challenges.trainer, parts.where) lo filtra
// index.js mientras no existan: así el bloque valida con los tramos vacíos.
const INICIO = 'flag.b06_fin && !flag.b07_inicio_hecho';
const ENGANCHE = { label: '🏟️ La Gira: convocatoria para Galar', sub: 'Un aviso nuevo en la Pokédex', icon: '🏟️', cond: INICIO, new: INICIO, script: 'b07_inicio' };
const PURGADO = 'flag.b06_eco_purgado';

// Vuelos: un spot `go` por destino, solo a ciudades y pueblos de Galar ya visitados (como en el B6).
const VUELOS = [
	['par', 'Pueblo Par'],
	['piston', 'Ciudad Pistón'],
	['hoyuelo', 'Pueblo Hoyuelo'],
	['plie', 'Pueblo Plié'],
	['crampon', 'Pueblo Crampón'],
	['artejo', 'Ciudad Artejo'],
];
const volar = desde => VUELOS.filter(([id]) => id !== desde).map(([id, name]) => ({
	label: '🦅 Volar a ' + name, sub: 'A lomos de tu Aerodactyl', icon: '🦅',
	cond: `flag.mount_aerodactyl && visited("${id}")`,
	action: { go: id },
}));

export default {
	badges: {
		medalla_planta: { name: 'Medalla Planta', type: 'Grass', desc: 'Circuito Infinito · Pueblo Hoyuelo (Percy). Huele a césped recién cortado, aunque sea de metal.' },
		medalla_dragon: { name: 'Medalla Dragón', type: 'Dragon', desc: 'Circuito Infinito · Ciudad Artejo (Roy). Tiene grabada una muralla. Si la miras de lado, parece que tiembla.' },
	},

	items: {
		// ----- Objeto clave (pixel art pendiente: escudo de latón con siete muescas y una cinta roja; ver encargo) -----
		sellooficios: { name: 'Sello de los Siete Oficios', pocket: 'key', desc: 'Una chapa de latón del tamaño de una moneda grande, con siete muescas en el borde y una cinta roja. En Pistón, quien la lleva puede comprar en los talleres «como uno de casa».' },
		// ----- MT de los premios de entrenamiento (ninguna se ha dado antes; ver encargo) -----
		b07_mt_ala_bis: { name: 'MT Ala Bis', pocket: 'machines', tm: 'dualwingbeat', desc: 'Golpea dos veces con las alas. Premio del nido de la Pradera Radiante, en el Área Silvestre.' },
		b07_mt_desahogo: { name: 'MT Desahogo', pocket: 'machines', tm: 'lashout', desc: 'Un golpe siniestro que pega el doble si al usuario le han bajado alguna característica ese turno. Premio del callejón de Crampón.' },
		b07_mt_vasto_impacto: { name: 'MT Vasto Impacto', pocket: 'machines', tm: 'breakingswipe', desc: 'Un coletazo de dragón que además baja el Ataque del objetivo. Premio de la Cornisa de Artejo.' },
		// ----- Ecos del Buzón -----
		cartakalenab07: { name: 'Carta de Kalena', pocket: 'key', desc: 'Una carta corta en papel de estraza, con una huella de barro rojo en una esquina. Viene del Rancho Ohana, en Akala.',
			read: '*(Letra grande, apretada. Lápiz de carpintero.)*\n\n{jugador}:\n\nTe escribo porque Kiawe dice que las cosas se cuentan, y porque si no te lo cuento yo te lo cuenta Leilani con dibujos.\n\nEl martes, antes del sol, mi padre bajó al abrevadero como siempre. Terrón se agachó como siempre. Y mi padre no se subió como siempre.\n\nAgarró el estribo. El de koa, el que colgamos para cuando él quisiera. Se lo puso él solo. Tardó. No le ayudé. Me costó mucho no ayudarle.\n\nSubió. Dieron la vuelta al corral. Una. Despacio.\n\nPor la tarde Terrón ya no cabía por la puerta del establo.\n\nNo te digo más porque no sé decirlo mejor. Va una foto. La hizo Leilani y salió movida porque se puso a llorar. Ella dice que fue el polvo.\n\nMi padre dice: «Dile que gracias. Y que no venga a ver cómo me subo, que todavía me sale feo».\n\nYo te debo dos sillas y una disculpa. Ahora te debo también esto.\n\n**Kalena**' },
		fotomudsdale: { name: 'Foto «El abrevadero»', pocket: 'key', art: 'mudsdale_abrevadero', desc: 'Una foto un poco movida: un Mudsdale enorme junto a un abrevadero de piedra, con un estribo de koa colgando y un señor mayor encima, muy tieso, intentando no sonreír. No lo consigue.' },
		cartainesb07: { name: 'Carta de Inés', pocket: 'key', desc: 'Un sobre de Correos de Teselia con el matasellos de Pueblo Chamota y tres sellos de más «por si Galar cobra distinto».',
			read: '*(Letra pequeña y muy recta. Bolígrafo azul.)*\n\nHola:\n\nSoy Inés, la cartera de Chamota. Te escribo porque el correo a Galar sale los jueves y hoy es jueves. No es por otra cosa.\n\nAquí sigue todo igual, que es lo que tiene Chamota. El tren de la mañana llega a su hora. El de la tarde, no.\n\nCelia dice que te diga que el pan de la escarcha ya lo hace todos los sábados y que se acaba antes de las diez. Don Teodoro dice que te diga que ha corregido otra cosa de una crónica vieja, que no es de esa noche, y que «ya es costumbre».\n\nYo no tengo nada que decirte. Solo que la muralla norte sigue fría. Lo he comprobado. Con la mano.\n\nSi en Galar hay correos, salúdalos de mi parte. Siempre tienen prisa.\n\n**Inés Garza**\n\nP. D.: Van tres sellos de más. Si sobran, son tuyos.' },
		postalcamilleb07: { name: 'Postal de Camille', pocket: 'key', desc: 'Una postal del Estadio de Pistón con el césped muy verde y una mancha de café en la esquina. Detrás, letra redonda con prisa.',
			read: '*(Postal. Letra redonda, con prisa.)*\n\n¡Hola, {jugador}!\n\nEstoy en Galar con el equipo. Gira de voleibol juvenil: seis partidos, cinco ciudades, un autobús que huele a calcetín.\n\nGanamos dos. Perdimos uno. El otro lo suspendieron porque llovía DENTRO del pabellón. Galar es así.\n\nEl saque me sale. El de arriba. Lo hago siempre. Ya no lo pienso.\n\nPapá me escribe todas las semanas. No te digo qué pone. Pone cosas normales. Eso es lo raro: que pone cosas normales.\n\nSi vienes a Pistón, el viernes jugamos en el pabellón de la plaza. No traigas pancarta.\n\n**Camille**\n\nP. D.: Sigo sin saber quién era «el amigo». Ya no pregunto. Pero me acuerdo.' },
	},

	shops: {
		tienda_par: { name: 'Tienda de Par', items: ['pokeball', 'greatball', 'ultraball', 'quickball', 'timerball', 'repeatball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'fullheal', 'maxrepel', 'maxether', { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_piston: { name: 'Tienda de Pistón', items: ['ultraball', 'quickball', 'timerball', 'luxuryball', 'healball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', 'elixir', { id: 'firestone', price: 3000 }, { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_hoyuelo: { name: 'Tienda de Hoyuelo', items: ['ultraball', 'netball', 'nestball', 'quickball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', 'maxether', { id: 'leafstone', price: 3000 }, { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_crampon: { name: 'Tienda de Crampón', items: ['ultraball', 'duskball', 'quickball', 'repeatball', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', 'maxelixir', { id: 'duskstone', price: 3000 }, { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_artejo: { name: 'Tienda de Artejo', items: ['ultraball', 'duskball', 'timerball', 'healball', 'quickball', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', 'maxelixir', { id: 'dawnstone', price: 3000 }, { id: 'icestone', price: 3000 }, { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		// Los talleres de Pistón: objetos de evolución de Galar que no se venden en ningún otro sitio. T1 pone el spot.
		taller_oficios: { name: 'Los talleres de Pistón', items: [
			{ id: 'sweetapple', price: 3000, cond: 'has("sellooficios")' }, { id: 'tartapple', price: 3000, cond: 'has("sellooficios")' },
			{ id: 'crackedpot', price: 3000, cond: 'has("sellooficios")' }, { id: 'galaricacuff', price: 6000, cond: 'has("sellooficios")' },
			{ id: 'galaricawreath', price: 6000, cond: 'has("sellooficios")' }, { id: 'whippeddream', price: 3000, cond: 'has("sellooficios")' },
			{ id: 'sachet', price: 3000, cond: 'has("sellooficios")' }, { id: 'metalcoat', price: 3000, cond: 'has("sellooficios")' },
			{ id: 'strawberrysweet', price: 500 }, { id: 'berrysweet', price: 500 }, { id: 'lovesweet', price: 500 },
			{ id: 'starsweet', price: 500 }, { id: 'cloversweet', price: 500 }, { id: 'flowersweet', price: 500 }, { id: 'ribbonsweet', price: 500 },
		] },
	},

	// Retos de gimnasio. El `trainer` lo filtra index.js hasta que T3 (percy_g) y T5 (roy_g) existan.
	challenges: {
		gym_hoyuelo: {
			name: 'Estadio de Pueblo Hoyuelo', npc: 'percy', trainer: 'percy_g', type: 'Grass', rec: 69,
			cond: 'flag.b07_hoyuelo_llegada',
			info: [
				{ text: 'Líder: **Percy**, tipo **Planta**. Granjero, grandullón y el más amable de Galar. Dicen que nunca ha levantado la voz. Ni para pedir el balón.' },
				{ cond: 'flag.b07_gym_hoyuelo_visto', text: '5 Pokémon, hasta el nivel 69. En su estadio, su as **dinamaxiza**: se hace enorme durante tres turnos.' },
				{ cond: 'flag.b07_gym_hoyuelo_visto', text: '**Fuego**, **Volador**, **Hielo** y **Bicho** contra la planta. Cuidado con lo que crece: algunos se curan solos si les das tiempo.' },
				{ cond: 'flag.b07_percy_vencido', text: '✔ Medalla Planta conseguida.' },
			],
		},
		gym_artejo: {
			name: 'Estadio de Ciudad Artejo', npc: 'roy', trainer: 'roy_g', type: 'Dragon', rec: 72,
			cond: 'flag.b07_artejo_llegada',
			info: [
				{ text: 'Líder: **Roy**, tipo **Dragón**. El rival de toda la vida del campeón. Se hace fotos con todo el mundo. También contigo, si ganas.' },
				{ cond: 'flag.b07_gym_artejo_visto', text: '5 Pokémon, hasta el nivel 72. Le gusta cambiar el tiempo del combate. Su as **dinamaxiza**, y de una forma que no has visto.' },
				{ cond: 'flag.b07_gym_artejo_visto', text: '**Hada**, **Hielo** y **Dragón** contra los dragones. Su as es de **Acero** por fuera: ahí, **Lucha** y **Tierra**. Un Lucario lo sabe.' },
				{ cond: 'flag.b07_roy_vencido', text: '✔ Medalla Dragón conseguida.' },
			],
		},
	},

	patches: {
		// Enganche del inicio: Mario terminó el B6 en Ciudad Teja o anda por Teselia, Alola, Kanto, Kalos o Johto.
		// Los cruces «Cruzar con la Gira a Galar» y «Cruzar a Galar (Par)» los pone T0 (dependen de su `puerta_galar`).
		teja: { spots: [ENGANCHE] },
		porcelana: { spots: [ENGANCHE] },
		mayolica: { spots: [ENGANCHE] },
		esmalte: { spots: [ENGANCHE] },
		fayenza: { spots: [ENGANCHE] },
		puerta_teselia: { spots: [ENGANCHE] },
		hauoli: { spots: [ENGANCHE] },
		puerta_alola: { spots: [ENGANCHE] },
		azafran: { spots: [ENGANCHE] },
		puerta_azafran: { spots: [ENGANCHE] },
		luminalia_plaza: { spots: [ENGANCHE] },
		puerta_trigal: { spots: [ENGANCHE] },
	},

	// Vuelos (lugares de T0, T1, T2, T3, T4 y T5): se suman en index.js cuando existan
	extraSpots: {
		par: volar('par'), piston: volar('piston'), hoyuelo: volar('hoyuelo'),
		plie: volar('plie'), crampon: volar('crampon'), artejo: volar('artejo'),
	},

	scripts: {
		// Enganche: la convocatoria. T0 escribe el cruce (`b07_cruce`) y la llegada.
		b07_inicio: [
			{ set: { 'flag.b07_inicio_hecho': true } },
			{ say: 'rotom', text: '¡Bzzt! Aviso de la Gira Interregional para todos los inscritos: «Próxima parada: **Galar**. La Puerta Lemnis de Galar abre mañana en la **estación de Pueblo Par**. Se cruza desde cualquier Puerta. Traigan chubasquero».', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Aviso. De la Gira. «Galar. Pueblo Par. Estación». Y una palabra que no sé qué es. «Chubasquero». —Pausa—. Lo busco. Es un abrigo para la lluvia. Bueno. Lo apunto.', cond: PURGADO },
			{ say: 'rotom', text: 'Y un mensaje de Rhi. Muchos signos de exclamación. Lo leo tal cual: «¡¡¡POR FIN MI REGIÓN!!! ¡TE ESPERO EN EL ANDÉN! ¡NO TE PIERDAS! ¡¡SI TE PIERDES TE BUSCO!!». Son once exclamaciones. Las he contado.' },
			{ quest: 'b07_m1', stage: 'puerta' },
			{ text: 'Las Puertas Lemnis de Porcelana, Hauoli, Azafrán, Luminalia y Trigal ya muestran el cartel: **GALAR · PAR**.' },
		],
		// ----- Ecos del Buzón (los abre Más › Buzón) -----
		b07_eco_terron: [
			{ if: '!flag.b07_terron_mudsdale', then: [
				{ text: 'En el sobre, además de la carta, hay una foto. Y una tira de papel con otra letra, más temblona.' },
				{ say: 'kekoa', as: 'Don Kekoa (nota)', text: '«No es nada. Se agachó y me subí. Ya está. —K.»' },
				{ say: 'kalena', as: 'Kalena (debajo, con lápiz)', text: '«Sí es algo. Lo pone él porque no sabe decirlo. —Ka.»' },
				{ give: 'fotomudsdale' },
				{ set: { 'flag.b07_terron_mudsdale': true } },
				{ diary: 'Hoy ha llegado una carta de Akala. Terrón ha crecido. Del todo. En la foto no cabe entero.', cond: 'flag.b01_diario && ' + PURGADO },
				{ diary: 'Hoy ha llegado una carta del Rancho Ohana, en Akala. Terrón, el Mudbray de don Kekoa, ha evolucionado: el martes, antes del amanecer, don Kekoa usó por fin el estribo de koa, y por la tarde Terrón ya era un Mudsdale. La foto la hizo Leilani. Salió movida.\n\n*(Omitido: nada.)*', cond: 'flag.b01_diario && flag.b06_eco_reformado' },
				{ diary: 'Hoy ha llegado una carta de Akala con una foto preciosa: ¡Terrón ya es un Mudsdale enorme! Y don Kekoa va encima, tan tieso como una escoba. Qué bonito es que las cosas pasen cuando tienen que pasar.', cond: 'flag.b01_diario && !' + PURGADO + ' && !flag.b06_eco_reformado' },
			] },
		],
		b07_eco_ines: [
			{ if: '!flag.b07_ines_carta', then: [
				{ set: { 'flag.b07_ines_carta': true } },
				{ text: 'Dentro del sobre, además de la carta, hay una hoja doblada de un horario de trenes de Teselia. Alguien ha subrayado en rojo «Chamota: 7.40».' },
				{ say: 'ines', as: 'Inés (a lápiz, al lado)', text: '«Por si vuelves. No es una invitación. Es un horario».' },
				{ if: 'flag.b06_chamota_privado', then: [
					{ say: 'ines', as: 'Inés (en el margen)', text: '«Celia y yo desayunamos juntas los domingos. No se lo digas a nadie. Bueno, a ti sí».' },
				] },
				{ if: 'flag.b06_chamota_cronica', then: [
					{ text: 'Grapado al horario, un recorte del *Correo de Porcelana*: la crónica nueva de don Teodoro ya está en la biblioteca del pueblo, «con una tilde corregida a mano».' },
				] },
				// Celia y don Teodoro: su aparición del B7 (regla de las 3 apariciones repartidas), por escrito en el mismo sobre
				{ text: 'En el dorso del horario, otra letra, grande y redonda, con una mancha de harina en la esquina.' },
				{ say: 'celia', as: 'Celia (en el dorso)', text: '«¡Hola! Soy Celia, la del pan. Inés dice que no escriba en sus cartas. Escribo igual. En Galar dicen que el pan viene en bolsa y en rebanadas. Si es verdad, no vuelvas sin probar el mío otra vez. ¡Besos de harina!»' },
				{ text: 'Debajo, con pluma estilográfica, una línea recta como una regla.' },
				{ say: 'teodoro', as: 'Don Teodoro (al pie)', text: '«Conste en el archivo de Chamota que el correo a Galar tarda nueve días. Lo apunto. Lo demás se lo lleva el viento. —T.»' },
			] },
		],
	},

	mail: [
		{ id: 'b07_eco_terron', kind: 'carta', from: 'Kalena', npc: 'kalena', title: 'Noticias del abrevadero', cond: 'flag.b07_inicio_hecho && flag.b05_terron_estribo', days: 3, item: 'cartakalenab07', script: 'b07_eco_terron' },
		{ id: 'b07_eco_ines', kind: 'carta', from: 'Inés Garza', npc: 'ines', title: 'Correo de Chamota', cond: 'flag.b07_inicio_hecho && flag.b06_testigo_ines', days: 2, item: 'cartainesb07', script: 'b07_eco_ines' },
		{ id: 'b07_eco_camille', kind: 'carta', from: 'Camille', npc: 'camille', title: 'Una postal de Pistón', cond: 'flag.b07_puerta_galar && flag.b06_camille_estadio', days: 2, item: 'postalcamilleb07' },
	],

	// ----- Negocio del bloque: El Campo de los Hargreave (plan §10). T3 pone el spot { venture: 'b07_campo' } en
	// `campo_hargreave` y activa flag.b07_campo en la escena de la cena. El `loc` lo filtra index.js hasta que T3 exista.
	ventures: {
		b07_campo: {
			name: 'El Campo de los Hargreave', icon: '⚽', loc: 'campo_hargreave', partner: 'padre_rhi',
			cond: 'flag.b07_campo',
			blurb: 'Un campo de césped de verdad a las afueras de Hoyuelo: dos porterías torcidas, una caseta de herramientas y un hombre que sabe de hierba más que nadie en Galar.',
			buy: { cost: 30000, text: '«Veinte años cuidando un césped que no era mío. Este sí. —Se limpia la mano en el chaleco antes de dártela—. Bueno, ahora un poco tuyo también. No pises la banda, que la acabo de pintar.»' },
			share: [{ pct: 40 }],
			upkeep: 900, store: 3,
			lines: {
				cesped: { name: 'Tepes de césped', icon: '🌱', desc: 'Rollos de césped que Gareth cultiva y vende a los estadios pequeños y a los colegios de la región. Lo que paga el riego.', money: 3200 },
				escuela: { name: 'Escuela de novatos', icon: '🥅', desc: 'Entrenamientos de tarde para los críos de Hoyuelo y sus Pokémon. Pagan poco y en caramelos, pero pagan.', money: 1200,
					items: [{ id: 'expcandym', perDay: 1 }, { id: 'expcandyl', perDay: 0.15 }] },
				semillero: { name: 'Semillero', icon: '🍎', desc: 'El invernadero de detrás de la caseta: bayas, ramitas y, si la temporada es buena, alguna manzana de las que no se venden en ninguna tienda.', money: 300,
					items: [{ id: 'sitrusberry', perDay: 1 }, { id: 'miracleseed', perDay: 0.1 }, { id: 'galaricatwig', perDay: 0.2 }, { id: 'sweetapple', perDay: 0.05 }, { id: 'tartapple', perDay: 0.05 }] },
				noches: { name: 'Partidos de noche', icon: '💡', desc: 'Con focos, el campo se llena de entrenadores de toda la comarca. Apuestan cosas raras. Gareth no apuesta, pero guarda lo que se deja la gente.', locked: true,
					items: [{ id: 'bottlecap', perDay: 0.03 }, { id: 'abilitycapsule', perDay: 0.03 }, { id: 'expcandyxl', perDay: 0.04 }, { id: 'wishingpiece', perDay: 0.02 }] },
			},
			upgrades: [
				{ id: 'riego', name: 'Riego por goteo', cost: 8000, mult: { all: 1.1 },
					desc: 'Gareth lleva años diciendo que la manguera «no reparte». Ahora reparte. Se nota en todo el campo.' },
				{ id: 'porterias', name: 'Porterías que no bailan', cost: 6000, mult: { escuela: 1.2 }, slots: 1,
					desc: 'Dos porterías de verdad, clavadas al suelo. Los críos dejan de discutir si fue gol. Y sitio para que trabaje un Pokémon más.' },
				{ id: 'segadora', name: 'Una segadora decente', cost: 14000, mult: { cesped: 1.3 },
					desc: 'La de ahora es del año en que nació Rhi y tiene nombre. La nueva no tiene nombre. Todavía.' },
				{ id: 'caseta', name: 'Arreglar la caseta', cost: 12000, mult: { semillero: 1.3 }, store: 1,
					desc: 'Tejado nuevo, estanterías y una puerta que cierra. Cabe un día más de producción y el semillero deja de mojarse.' },
				{ id: 'invernadero', name: 'Invernadero grande', cost: 18000, mult: { semillero: 1.5 }, need: ['caseta'],
					desc: 'Cristal, calor y un Pokémon Planta durmiendo en un rincón. Las manzanas raras salen más a menudo.' },
				{ id: 'focos', name: 'Focos para la noche', cost: 24000, unlock: 'noches', upkeep: 150,
					desc: 'Cuatro torres de luz. A partir de ahora, el campo no cierra cuando se pone el sol. Gasta electricidad.' },
				{ id: 'gradas', name: 'Unas gradas pequeñas', cost: 30000, mult: { escuela: 1.3, noches: 1.2 },
					desc: 'Cuarenta asientos de madera. Las familias vienen a ver entrenar a los críos y se quedan a merendar.' },
				{ id: 'parcela', name: 'Comprar la parcela', cost: 45000, share: 15,
					desc: 'El terreno es de alquiler. Si es del campo, nadie lo puede vender a nadie por encima de la cabeza de Gareth. Otra vez no. 15 puntos más para ti.' },
			],
			jobs: { slots: 1, types: ['Grass', 'Ground', 'Normal'], favs: { wooloo: 0.05, dubwool: 0.06, eldegoss: 0.06, mudsdale: 0.05, scorbunny: 0.04, grookey: 0.04 },
				text: 'Pisar el césped para que agarre, regar, recoger balones, perseguir a los Wooloo que se comen la banda y hacer de portero cuando falta uno.' },
			managers: [
				{ npc: 'padre_rhi', desc: 'Lo lleva él, que se levanta antes que la hierba. El césped crece mejor cuando lo miras, dice.', mult: { cesped: 1.2 } },
				{ npc: 'rhi', cond: 'flag.b07_rhi_combate', desc: 'Cuando está en casa, entrena a los críos a gritos. Los críos la adoran. La escuela vuela.', mult: { escuela: 1.3 }, wage: 300 },
				{ npc: 'nate', cond: 'flag.b07_nate', desc: 'Se tumba en el banquillo y corrige a todo el mundo sin levantarse. Funciona, y nadie sabe por qué.', mult: { escuela: 1.1, noches: 1.3 }, wage: 200 },
				{ npc: 'mireille', cond: 'flag.b07_mireille_galar', desc: 'Ha venido de Luminalia con un plan de entrenamiento por días y un silbato. Los críos le tienen miedo y respeto, por ese orden.', mult: { escuela: 1.35 }, wage: 350 },
			],
			eventRate: 0.7,
			events: [
				{ id: 'wooloo', name: 'Wooloo en la banda', w: 3, npc: 'padre_rhi',
					text: 'Se ha colado un rebaño de Wooloo por la valla y se está comiendo la banda del córner. La que pinté ayer. Con lo que me costó la cal.',
					options: [
						{ text: 'Dejarles comer', result: 'Los Wooloo comen, se tumban y se quedan dormidos en el área. Gareth dice que así el césped queda «abonado de serie». Los críos entrenan esquivando ovejas. Mejoran el regate.', effect: { boost: { mult: { escuela: 1.2, cesped: 0.85 }, days: 2, label: 'Regate entre Wooloo' } } },
						{ text: 'Pagar una valla nueva', cost: 2500, result: 'Valla nueva, de las altas. Los Wooloo la miran un rato, ofendidos, y se van a comerse el campo del vecino. El vecino no tiene campo: tiene un jardín. Ya no tiene jardín.', effect: { boost: { mult: { cesped: 1.15 }, days: 3, label: 'Banda intacta' } } },
					] },
				{ id: 'lluvia', name: 'Tres días de lluvia', w: 3, npc: 'padre_rhi',
					text: 'Llueve desde el lunes. No es una queja, eh. En Galar no te quejas de la lluvia, te quejas cuando no llueve. Pero el campo es un lago y los críos no vienen.',
					options: [
						{ text: '«Que entrenen igual.»', result: 'Los críos entrenan en el barro, felices como Psyduck. Las madres no están felices. Gareth reparte toallas y té para todos.', effect: { boost: { mult: { escuela: 1.1, cesped: 0.9 }, days: 2, label: 'Partido en el barro' } } },
						{ text: 'Esperar a que escampe', result: 'Gareth aprovecha para arreglar el semillero. Cuando sale el sol, el césped está más verde que nunca. «¿Ves? No te quejes de la lluvia».', effect: { boost: { mult: { semillero: 1.25 }, days: 2, label: 'Después de la lluvia' } } },
					] },
				{ id: 'carta_macro', name: 'Una oferta por el terreno', w: 2, npc: 'padre_rhi', cond: '!flag.b07_campo_parcela_rechazada',
					text: 'Ha llegado una carta muy educada de unos señores de Artejo. Quieren comprar el terreno «para un proyecto energético comunitario». El membrete tiene un logo que conozco. Uno redondo. El de antes.',
					options: [
						{ text: '«Ni hablar.»', result: 'Gareth dobla la carta en cuatro y la mete debajo de la pata de la mesa que cojea. La mesa deja de cojear. «Algo bueno tenía que tener».', effect: { set: { 'flag.b07_campo_parcela_rechazada': true }, boost: { mult: { all: 1.1 }, days: 2, label: 'Mesa que no cojea' } } },
						{ text: 'Guardarla para Handsome', result: 'Gareth te da la carta en una funda de plástico, «por si las huellas». Lo ha visto en la tele. Handsome, cuando se la das, dice que es «muy útil» y luego la mira mucho rato.', effect: { set: { 'flag.b07_campo_parcela_rechazada': true, 'flag.b07_carta_macro_policia': true } } },
					] },
				{ id: 'ojeador', name: 'Un ojeador en la grada', w: 2, npc: 'rhi', cond: 'flag.b07_rhi_combate',
					text: 'Oye. Hay un señor con una libreta en la grada. Lleva tres días. Dice que es de un club de la liga de Artejo. Dice que quiere ver a los críos. No me mira a mí. —Pausa—. Bueno, un poco sí me mira.',
					options: [
						{ text: '«Ve a hablar con él.»', result: 'Rhi tarda media hora en volver. Vuelve con la libreta del ojeador, que se la ha quitado «para ver qué ponía». Ponía su nombre subrayado dos veces. No dice nada en toda la tarde. Entrena a los críos como nunca.', effect: { boost: { mult: { escuela: 1.3 }, days: 3, label: 'Rhi subrayada' } } },
						{ text: '«Tú a lo tuyo.»', result: '«Ya. A lo mío». Rhi se pone de portera para los críos y para todo lo que le tiran. El ojeador apunta algo. Ella hace como que no lo ve.' },
					] },
				{ id: 'siesta', name: 'Nate en la portería', w: 2, npc: 'nate', cond: 'flag.b07_nate',
					text: 'Qué flojera… Los críos querían un portero. Me he puesto. Me he dormido. Han metido cero goles. No sé cómo.',
					options: [
						{ text: '«Sigue así.»', result: 'Nate se duerme en la portería tres tardes seguidas. Los críos, desesperados, aprenden a chutar a la escuadra. Es la mejor generación de delanteros de Hoyuelo en años.', effect: { boost: { mult: { escuela: 1.25 }, days: 3, label: 'Portero dormido' } } },
						{ text: 'Comprarle una hamaca', cost: 800, result: 'Nate cuelga la hamaca entre los dos postes de la portería. Por fin, dice, un sitio donde se puede trabajar. Los Pokémon que trabajan en el campo se turnan para dormir con él.', effect: { happy: 5 } },
					] },
				{ id: 'plan', name: 'El plan de Mireille', w: 2, npc: 'mireille', cond: 'flag.b07_mireille_galar',
					text: 'He hecho un plan. Lunes, carrera. Martes, fuerza. Miércoles, técnica. Jueves, carrera otra vez. Viernes, partido. —Da una palmada—. Gareth dice que el jueves llueve. El jueves también se corre.',
					options: [
						{ text: '«Adelante.»', result: 'Una semana de plan. Los críos acaban agotados y orgullosos. Uno vomita el jueves. Mireille le da un plátano y le dice que eso es «información».', effect: { boost: { mult: { escuela: 1.3 }, days: 3, label: 'Plan de Mireille' } } },
						{ text: '«Que el jueves descansen.»', result: 'Mireille te mira como si le hubieras pedido que suba el nivel sin entrenar. Luego tacha el jueves. «Descanso activo». Los críos van al semillero a recoger manzanas.', effect: { boost: { mult: { semillero: 1.2, escuela: 1.1 }, days: 2, label: 'Descanso activo' } } },
					] },
				{ id: 'final', name: 'La final infantil', w: 2, npc: 'padre_rhi', once: true, cond: 'flag.b07_rhi_combate',
					text: 'El sábado se juega la final infantil de la comarca. Aquí, en nuestro campo. Los de Pistón traen autobús. Rhi dice que no viene. Rhi ha preguntado tres veces a qué hora es.',
					options: [
						{ text: '«Que pite ella.»', result: 'Rhi arbitra con el silbato de su padre. Pita todo. Pita hasta un Wooloo. Gana Hoyuelo en el último minuto, con un gol de rebote que nadie sabe quién metió. Gareth llora detrás de la caseta y dice que es el polen.', effect: { boost: { mult: { all: 1.2 }, days: 3, label: 'Campeones de la comarca' }, happy: 10 } },
						{ text: 'Mirarla desde la grada', result: 'Gana Pistón. Los críos de Hoyuelo lloran. Rhi baja de la grada, los junta en el centro del campo y les dice algo que no oyes. Cuando vuelve, tiene los ojos rojos. «Les he dicho que perder no es ser del montón. Que me lo apunten».' },
					] },
			],
		},
		// Ampliación del Estudio Casos Fríos (B6): dos imprevistos nuevos desde Galar. No dicen quién es el Apuntador.
		b06_estudio: {
			events: [
				{ id: 'galar_directo', name: 'Directo desde Galar', w: 2, npc: 'nico_ferrer', once: true, cond: 'flag.b07_marcador',
					text: 'Ya he montado el episodio del estadio. El sonido de la grada se come la mitad de lo que dice Renata. La otra mitad la dice muy rápido. ¿Lo dejo así o lo arreglo?',
					options: [
						{ text: '«Déjalo así.»', result: 'El episodio sale con todo el ruido de Pistón. Los oyentes dicen que es como estar allí. Uno escribe que oyó «a un Corviknight estornudar». Nico lo confirma.', effect: { boost: { mult: { episodios: 1.2 }, days: 2, label: 'Episodio con grada' } } },
						{ text: 'Pagarle una noche de mezcla', cost: 1500, result: 'Nico mezcla toda la noche. A las cinco de la mañana te manda un audio: «Se oye todo. Hasta lo que no se tenía que oír». Lo dice con voz de haber encontrado algo. Luego dice que no, que es el sueño.', effect: { boost: { mult: { all: 1.1 }, days: 3, label: 'Mezcla fina' } } },
					] },
				{ id: 'cuarta_carta', name: 'La cuarta carta', w: 2, npc: 'tia_rosa', once: true, cond: 'flag.b07_apuntador_4',
					text: 'Cariño, ha llegado al estudio una copia de la carta que te dejaron en Galar. Con matasellos de aquí. La han mandado dos veces, para que la tengamos los dos. Renata dice que eso es de mala educación o de muy buena. No se decide.',
					options: [
						{ text: '«Archívala con las otras.»', result: 'Nico abre la carpeta «DESDE LA CONCHA». Ya no le cabe nada. Abre otra: «DESDE LA CONCHA (2)». La Tía Rosa le dice que con una tilde menos ya sería un libro.' },
						{ text: '«Que la lea la Tía Rosa en antena.»', result: 'La Tía Rosa la lee con su voz de cuento. Es lo más escuchado del mes. Renata no sale en el episodio. Dice que está «en Galar». Está en el sótano, con los cascos puestos, escuchándolo tres veces.', effect: { boost: { mult: { episodios: 1.2 }, days: 2, label: 'La carta en antena' } } },
					] },
			],
		},
	},

	milestones: [{ flag: 'b07_m_aviso', hoursLeft: 3 }],
};
