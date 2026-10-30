// Carreras de monturas (pedido de Mario, 2026-10-30). Motor en app/js/carreras.js, pantalla en app/js/ui/carreras-ui.js.
// Un circuito por región con monturas (Kalos: Rhyhorn · Alola: Lapras · Teselia: Aerodactyl), cada uno con 3 rivales
// con nombre que ya conoce el jugador y monturas de alquiler para quien no tenga la buena para ese terreno.
//   kalos    Gran Premio de Boceto   · anfitriona: la campeona retirada · rivales Rhi, Corelia, Héctor
//   alola    La Vuelta del Rancho    · Pueblo Ohana · anfitriona Leilani (corre) con Soldi de locutor · rivales Kiawe, Lulú, Leilani
//   teselia  La Vuelta de Chamota    · anfitrión don Teodoro (cronista) · rivales Camila, Inés, Celia
// Flags: carr_<id>_vista (primera charla), carrera_<id>_ganada (lo pone el motor al ganar). Récords en G.races.
// Ids con prefijo carr_. Nada se renombra. Sin spoilers: solo zonas ya visitadas y personajes ya conocidos.

const K = 'flag.b01_fin && visited("boceto")';
const A = 'flag.b05_fin && visited("ohana")';
const T = 'flag.b06_fin && visited("chamota")';
const RIOLU = '(inParty("riolu") || inParty("lucario"))';

// Tramo a tramo: cada camino con su terreno (velocidad según la montura), largo en segundos a ritmo normal,
// `need` = atajo que solo abre una montura con esa habilidad, `jump` = salto con toque a tiempo.
const P = (label, terrain, len, extra = {}) => ({ label, terrain, len, ...extra });

export default {
	items: {
		carrtrofeokalos: { name: 'Herradura dorada de Boceto', pocket: 'key', desc: 'Una herradura de Rhyhorn bañada en oro, con una muesca de cuando la campeona retirada la usó en su última temporada. Pesa más de lo que parece.',
			read: '**GRAN PREMIO DE BOCETO**\n*Grabado en el canto, con letra de herrero:*\n\n«A quien gane en mi pista sin agarrarse al cuerno.\nLa curva se gana frenando antes.\nEl charco no se rodea.»\n\n*Y debajo, más pequeño, rayado con una navaja:* «Me ganaste. No te acostumbres.»' },
		carrtrofeoalola: { name: 'Banderín del Rancho Ohana', pocket: 'key', desc: 'Un banderín de tela con un Tauros bordado, una mancha de grasa en forma de huella y la firma de Leilani en rotulador. Soldi añadió un punto de soldadura «para que dure».',
			read: '**LA VUELTA DEL RANCHO · OHANA**\n*Bordado a mano en el reverso:*\n\nPrimera vuelta ganada por alguien de fuera.\n\n*Rotulador, letra de Leilani:* «Calibración del Ride Gear: perfecta. La tuya, no tanto. ¿Sí o qué?»\n\n*Grabado con punta de soldador:* «Resultado satisfactorio. Para ser humano. — S.»' },
		carrtrofeoteselia: { name: 'Crónica enmarcada de Chamota', pocket: 'key', desc: 'Una hoja del archivo de don Teodoro, con su letra apretada y una foto pegada con cinta. El marco lo puso Celia; el cristal, Inés, «que el correo llega mojado».',
			read: '**CRÓNICA DE LA VUELTA DE CHAMOTA**\n*Archivo de don Teodoro, hoja suelta*\n\nHoy se ha corrido la vuelta al pueblo por primera vez en muchos años. Salida en la plaza, huertos, muralla norte, la boca helada y bajada.\n\nHa ganado alguien de fuera. Que conste. Camila ha dicho que el brillo no se cronometra; Inés ha dicho que sí, y que ella llevaba el reloj. Celia se ha reído tan fuerte que se ha asustado su Bouffalant.\n\nPara el archivo. Las cosas que no se escriben se las lleva el viento.' },
	},

	races: {
		kalos: {
			name: 'Gran Premio de Boceto', region: 'kalos', loc: 'boceto', host: 'jinete_boceto', icon: '🦏', cond: K,
			blurb: 'Cinco tramos por el pueblo y la sierra, contra tres jinetes. Rhyhorn parte la roca; las cabras trepan la ladera.',
			rent: ['gogoat'],
			rivals: [
				{ npc: 'rhi', mount: 'gogoat', pace: 1.01,
					start: 'Me he entrenado. Diez sprints al día. Bueno, los ha hecho la cabra. Pero yo miraba.', ahead: '¡No te veo! ¡Bueno, sí te veo, por detrás!', behind: '¡¿Cómo vas por delante?! ¡Eso es trampa! ¡No sé cuál, pero es trampa!',
					win: '¡GANÉ! ¡Nate, que lo estás grabando! ¿Lo estás grabando? …Claro que no.', lose: 'Ok. Ok. La próxima. La próxima te como en la ladera.' },
				{ npc: 'corelia', mount: 'gogoat', pace: 0.99,
					start: '¡A TOPE! ¡Que no he corrido nunca en cabra, pero en patines sí, y es casi lo mismo!', ahead: '¡A topísimo! ¡Esto es como patinar, pero con pelo!', behind: '¡No vale, que la cabra se para a comer!',
					win: '¡Primera! ¡Se lo cuento al abuelo! ¡No, mejor se lo cuentas tú, que si lo cuento yo no se lo cree!', lose: '¡Qué carrerón! ¡Revancha! ¡Ya! ¡Bueno, mañana, que la cabra me mira mal!' },
				{ npc: 'hector', mount: 'rhyhorn', pace: 1.06,
					start: '¡Transformación! …No pasa nada. El casco es el mismo. Pero ahora me siento más rápido.', ahead: '¡Por la justicia y por la tracción a cuatro patas!', behind: '¡Un héroe nunca pierde! ¡Solo llega después, con dignidad!',
					win: '¿He ganado? ¿YO? Que alguien lo apunte. En la aseguradora no se lo van a creer.', lose: 'He perdido con honor. Y con el casco torcido. Pero con honor.' },
			],
			tramos: [
				{ name: 'La calle mayor', text: 'Sales de la plaza entre banderines. Los del pueblo gritan desde las ventanas.', paths: [
					P('Recto por la calle', 'llano', 10), P('Saltar la cerca del corral', 'llano', 9.2, { jump: true }), P('Por los huertos de la vecina', 'barro', 8.8)] },
				{ name: 'La subida al Paso', text: 'La sierra empieza de golpe. A la izquierda, un pedregal; a la derecha, una ladera de hierba muy empinada.', paths: [
					P('El camino de herradura', 'llano', 12), P('Atravesar el pedregal', 'roca', 8, { need: 'roca' }), P('Trepar la ladera', 'monte', 8, { need: 'monte' })] },
				{ name: 'El arroyo', text: 'El agua baja fría y rápida. Hay un puente de madera, un vado y unas piedras que asoman.', paths: [
					P('El puente de madera', 'llano', 11), P('Cruzar a nado', 'agua', 7, { need: 'agua' }), P('Saltar de piedra en piedra', 'llano', 9.2, { jump: true })] },
				{ name: 'El bosquecillo', text: 'Árboles bajos, raíces y unas rocas grandes partidas por la mitad hace mucho.', paths: [
					P('El sendero', 'bosque', 11), P('Entre las rocas', 'roca', 8.5, { need: 'roca' }), P('Por la ladera del bosque', 'monte', 8.8, { need: 'monte' })] },
				{ name: 'La recta final', text: 'Se ve la meta. El abrevadero está en medio del camino, como siempre.', paths: [
					P('Rodear el abrevadero', 'llano', 10), P('Saltar el abrevadero', 'llano', 8.6, { jump: true })] },
			],
			prize: { first: [{ id: 'carrtrofeokalos', n: 1 }, { id: 'quickclaw', n: 1 }], win: [{ id: 'carbos', n: 1 }, { id: 'moomoomilk', n: 3 }, { id: 'ppup', n: 1 }], podium: { id: 'moomoomilk', n: 1 }, record: { id: 'carbos', n: 1 } },
		},
		alola: {
			name: 'La Vuelta del Rancho', region: 'alola', loc: 'ohana', host: 'leilani', icon: '🐂', cond: A,
			blurb: 'Pastos, barro, costa y colina. Lapras corta por el mar; un Mudsdale no se hunde en el lodo.',
			rent: ['tauros', 'mudsdale', 'stoutland'],
			rivals: [
				{ npc: 'kiawe', mount: 'tauros', pace: 0.97,
					start: 'Correr es como bailar. Pies, ritmo, y no pensar en la caída.', ahead: 'Ritmo.', behind: '…Bien. Me gusta que me lo pongas difícil.',
					win: 'El fuego llega primero. Pero tú has bailado bien.', lose: 'Has ganado. —Golpe de talón—. Mañana, otra vez. Con más fuego.' },
				{ npc: 'lulu', mount: 'stoutland', pace: 1.0,
					start: '¡Bien-bien! Mi Stoutland huele los atajos. Y las bayas. Sobre todo las bayas.', ahead: '¡Por aquí huele a atajo! ¡Y a tarta!', behind: '¡Se ha parado a oler una flor! ¡No, eran dos!',
					win: '¡Gané! ¡Esto lo celebro con un postre! ¡Con dos!', lose: '¡Bien corrido! Te guardo un trozo de pastel. Pequeño. Mediano.' },
				{ npc: 'leilani', mount: 'mudsdale', pace: 0.99,
					start: 'Calibro el Ride Gear mientras corro. Si explota algo, no era importante. ¿Sí o qué?', ahead: '¡El barro es mi casa!', behind: '¡Mi Mudsdale va a plena potencia! Bueno, a casi. A bastante.',
					win: '¡Gané! ¡Soldi, apúntalo! …No, no lo redondees.', lose: 'Me has ganado con mi propio invento. Eso es lo más bonito que me ha pasado esta semana.' },
			],
			tramos: [
				{ name: 'La salida del rancho', text: 'Los Tauros resoplan. Soldi grita «TRES, DOS, UNO» por un altavoz pegado con cinta aislante.', paths: [
					P('Por el camino de tierra', 'llano', 10), P('Saltar la valla de los Tauros', 'llano', 9.2, { jump: true }), P('Por las charcas', 'barro', 8.2, { need: 'barro' })] },
				{ name: 'Los pastos', text: 'Hierba alta, un lodazal enorme donde se revuelcan los Mudbray y el abrevadero grande, que es casi un lago.', paths: [
					P('Rodear el lodazal', 'llano', 11.5), P('Por el centro del lodazal', 'barro', 8, { need: 'barro' }), P('Por el abrevadero grande', 'agua', 11, { need: 'agua' })] },
				{ name: 'La costa', text: 'La carretera bordea el mar. Abajo, olas y una cala que corta camino.', paths: [
					P('La carretera', 'llano', 12), P('Por el mar', 'agua', 7, { need: 'agua' }), P('Saltar el murete del acantilado', 'llano', 10, { jump: true })] },
				{ name: 'La colina', text: 'Subida entre árboles. Hay rocas volcánicas, senderos que solo conoce quien tiene buen olfato y, abajo, el mar lamiendo la falda de la colina.', paths: [
					P('El sendero de la colina', 'bosque', 11), P('Por donde huele a atajo', 'bosque', 8, { need: 'bosque' }), P('Por las rocas volcánicas', 'roca', 8.5, { need: 'roca' }), P('Bordeando la colina por el mar', 'agua', 12, { need: 'agua' })] },
				{ name: 'La bajada a la meta', text: 'Se ve el rancho. Alguien ha puesto la meta encima de un comedero.', paths: [
					P('Bajar por el camino', 'llano', 10), P('Saltar el comedero', 'llano', 8.6, { jump: true })] },
			],
			prize: { first: [{ id: 'carrtrofeoalola', n: 1 }, { id: 'shellbell', n: 1 }], win: [{ id: 'moomoomilk', n: 3 }, { id: 'hpup', n: 1 }, { id: 'carbos', n: 1 }], podium: { id: 'moomoomilk', n: 1 }, record: { id: 'carbos', n: 1 } },
		},
		teselia: {
			name: 'La Vuelta de Chamota', region: 'teselia', loc: 'chamota', host: 'teodoro', icon: '⚡', cond: T,
			blurb: 'La plaza, los huertos, la muralla y la boca helada. Desde el aire se corta mucho; entre frutales, también.',
			rent: ['zebstrika', 'sawsbuck'],
			rivals: [
				{ npc: 'camila', mount: 'zebstrika', pace: 0.95,
					start: 'No vengo a ganar. Vengo a brillar. Si de paso gano, que se note.', ahead: 'Mírame bien. Esto no se repite.', behind: 'Vas delante. Te queda bien. No te acostumbres.',
					win: 'Primera. Y despeinada. Las dos cosas a la vez, por primera vez en mi vida.', lose: 'Has brillado más. Lo admito una vez. No lo grabes.' },
				{ npc: 'ines', mount: 'sawsbuck', pace: 0.99,
					start: 'Hago este recorrido todos los días. Con cartas. Hoy sin cartas. Voy a ir más ligera.', ahead: 'El correo no espera.', behind: 'Vas bien. Vas a llegar a tiempo. A tiempo no es antes.',
					win: 'Llegué. Como el tren de la mañana: cuando toca.', lose: 'Me has ganado en mi ruta. —Se recoloca la gorra—. Lo apunto. No lo cuento.' },
				{ npc: 'celia', mount: 'bouffalant', pace: 1.04,
					start: '¡Si gano, invito al pan! ¡Si pierdo, también! ¡Es que he hecho mucho!', ahead: '¡Ay, que vamos primeros! ¡Que alguien sujete las barras!', behind: '¡Que se me enfría el pan, que se me enfría!',
					win: '¡GANAMOS! ¡Pan para todo el pueblo! ¡Bueno, para la plaza!', lose: '¡Qué bien corres! Toma, una barra. Te la has ganado. Y aunque no.' },
			],
			tramos: [
				{ name: 'La plaza', text: 'Don Teodoro levanta el pañuelo desde el banco. El campanario da la hora justo cuando lo baja.', paths: [
					P('Por la calle del mercado', 'llano', 10), P('Saltar la fuente', 'llano', 9.2, { jump: true })] },
				{ name: 'Los huertos', text: 'Surcos embarrados, frutales en fila y un camino de rodeo seco.', paths: [
					P('Por los surcos', 'barro', 10), P('El camino de rodeo', 'llano', 11.5), P('Entre los frutales', 'bosque', 8, { need: 'bosque' })] },
				{ name: 'La muralla norte', text: 'La muralla vieja corta el paso. Hay una brecha llena de cascotes y una puerta lejísimos.', paths: [
					P('Hasta la puerta', 'llano', 12.5), P('Por la brecha de los cascotes', 'roca', 8.5, { need: 'roca' }), P('Por encima de la muralla', 'cielo', 9.5, { need: 'cielo' })] },
				{ name: 'El llano helado', text: 'Junto a la boca de la grieta, el suelo cruje de escarcha. Hay una zanja que se puede saltar.', paths: [
					P('Rodear la zanja', 'llano', 11), P('Saltar la zanja', 'llano', 9.5, { jump: true })] },
				{ name: 'La bajada al pueblo', text: 'Una cuesta larga hasta el campanario. Desde arriba, el pueblo entero.', paths: [
					P('La cuesta', 'monte', 10), P('El camino largo', 'llano', 12), P('Planear hasta la plaza', 'cielo', 9.5, { need: 'cielo' })] },
			],
			prize: { first: [{ id: 'carrtrofeoteselia', n: 1 }, { id: 'expertbelt', n: 1 }], win: [{ id: 'carbos', n: 1 }, { id: 'freshwater', n: 4 }, { id: 'ppup', n: 1 }], podium: { id: 'freshwater', n: 2 }, record: { id: 'carbos', n: 1 } },
		},
	},

	patches: {
		boceto: { spots: [
			{ label: 'Gran Premio de Boceto', sub: 'Tres jinetes y una pizarra con tiempos', icon: '🏁', cond: K, new: '!flag.carr_kalos_vista', talk: [
				{ cond: '!flag.carr_kalos_vista', script: 'carr_kalos_intro' },
				{ script: 'carr_kalos_correr' },
			] },
		] },
		ohana: { spots: [
			{ label: 'La Vuelta del Rancho', sub: 'Un altavoz con cinta aislante grita tiempos', icon: '🐂', cond: A, new: '!flag.carr_alola_vista', talk: [
				{ cond: '!flag.carr_alola_vista', script: 'carr_alola_intro' },
				{ script: 'carr_alola_correr' },
			] },
		] },
		chamota: { spots: [
			{ label: 'La Vuelta de Chamota', sub: 'Don Teodoro, con un cronómetro y la libreta', icon: '⏱️', cond: T, new: '!flag.carr_teselia_vista', talk: [
				{ cond: '!flag.carr_teselia_vista', script: 'carr_teselia_intro' },
				{ script: 'carr_teselia_correr' },
			] },
		] },
	},

	scripts: {
		// ---------------- Kalos ----------------
		carr_kalos_intro: [
			{ text: 'Delante de la pista hay tres monturas atadas a la cerca: dos Gogoat que mastican la cuerda y un Rhyhorn con un casco de juguete encajado entre los cuernos.' },
			{ say: 'jinete_boceto', text: 'Te estaba esperando. Una carrera tú y yo está bien. Pero las carreras de verdad son con más gente. Con gente que grita. Así que he invitado a gente que grita.' },
			{ say: 'rhi', text: '¡Hola! ¡Soy la que grita! ¡Me han dicho que hay carrera y yo no digo que no a una carrera! ¡Ni a dos!' },
			{ say: 'corelia', text: '¡Y yo! ¡A tope! ¡El abuelo dice que una líder no debería correr en cabra! ¡El abuelo no está aquí!' },
			{ say: 'hector', text: 'Y yo… he venido a mirar. Me han dado un casco. Y un Rhyhorn. Creo que ya estoy dentro.' },
			{ say: 'jinete_boceto', text: 'Reglas: cinco tramos, del pueblo a la sierra y vuelta. En cada uno eliges camino. Tu montura manda: mi Rhyhorn parte la roca, una cabra trepa la ladera, y quien sepa nadar, que nade.' },
			{ say: 'jinete_boceto', text: 'Si no tienes la montura buena para este terreno, te presto una cabra. Los saltos se ganan con los pies, no con la montura: aprieta cuando toca y vuela.' },
			{ if: RIOLU, then: [{ text: '{riolu} mira el casco de Héctor. Héctor se lo ajusta, muy digno. {riolu} aparta la mirada, muy digno también.' }] },
			{ say: 'jinete_boceto', text: 'Premio la primera vez que ganes. Después, algo de vez en cuando. Y tu mejor tiempo, en la pizarra. Eso no se compra.' },
			{ set: { 'flag.carr_kalos_vista': true } },
			{ call: 'carr_kalos_correr' },
		],
		carr_kalos_correr: [
			{ say: 'jinete_boceto', text: '¿Corremos? Las monturas están listas. Ellas siempre están listas; somos nosotros los que no.' },
			{ choice: [
				{ text: 'A la salida.', then: [
					{ race: 'kalos', onWin: [
						{ say: 'jinete_boceto', text: 'Bien corrido. Has frenado antes que nadie en las curvas. Eso no se enseña; se tiene o se pierde.' },
					], onLose: [
						{ say: 'jinete_boceto', text: 'La pista no se gana el primer día. Ni el segundo. Vuelve cuando quieras: aquí no se cierra.' },
					] },
				] },
				{ text: 'Otro rato.', then: [{ say: 'jinete_boceto', text: 'La pizarra no se va a ningún sitio. Yo tampoco.' }] },
			] },
		],
		// ---------------- Alola ----------------
		carr_alola_intro: [
			{ text: 'A la entrada del rancho, alguien ha montado una línea de salida con dos cubos y una cuerda. En la cuerda cuelga un altavoz, pegado con cinta aislante, que habla solo.' },
			{ say: 'soldabot', text: 'Probando. Probando. Excelente acústica. Para ser un rancho.' },
			{ say: 'leilani', text: '¡Llegas justo! Estoy calibrando el Ride Gear con monturas de verdad y necesito gente que corra. Gente que corra mucho. ¿Sí o qué?' },
			{ say: 'kiawe', text: 'Me ha llamado ella. —Mira los Tauros—. He venido por los Tauros. Y porque correr es bailar sin música.' },
			{ say: 'lulu', text: '¡Y yo por la merienda! ¡Bien-bien! Mi Stoutland huele los atajos. Y las tartas.' },
			{ say: 'leilani', text: 'Cinco tramos: rancho, pastos, costa, colina y vuelta. Si tienes montura que nade, el mar es tuyo. Si no, aquí hay Tauros, Mudsdale y Stoutland de alquiler. Gratis. Pagan los de la granja, que quieren ver el espectáculo.' },
			{ say: 'soldabot', text: 'Recordatorio: en los saltos, pulsar a tiempo. Pulsar tarde es caer. Caer es divertido. Para el público.' },
			{ set: { 'flag.carr_alola_vista': true } },
			{ call: 'carr_alola_correr' },
		],
		carr_alola_correr: [
			{ say: 'leilani', text: '¿Otra vuelta? Las monturas dicen que sí. Bueno, el Mudsdale no dice nada, pero tampoco se ha ido.' },
			{ choice: [
				{ text: 'A la salida.', then: [
					{ race: 'alola', onWin: [
						{ say: 'soldabot', text: 'Ganador registrado. Excelente. Para ser alguien sin brazo robótico.' },
					], onLose: [
						{ say: 'leilani', text: '¡Casi! Los datos me sirven igual. Vuelve cuando quieras: el rancho no cierra y Soldi no duerme.' },
					] },
				] },
				{ text: 'Otro rato.', then: [{ say: 'soldabot', text: 'Entendido. Guardando tu silla. Con cariño. Y con un tornillo.' }] },
			] },
		],
		// ---------------- Teselia ----------------
		carr_teselia_intro: [
			{ text: 'Don Teodoro está en su banco de la plaza, con la libreta abierta y un cronómetro de cuerda que suena como un reloj de pared pequeño.' },
			{ say: 'teodoro', text: 'Usted. Siéntese. Le cuento: cuando yo era joven, en Chamota se corría una vuelta al pueblo cada otoño. Con monturas. Hasta que dejó de correrse. Las cosas dejan de hacerse si nadie las apunta.' },
			{ say: 'celia', text: '¡Y yo le he dicho que la volvemos a correr! ¡Ya tengo montura! Bueno, es el Bouffalant que me trae la harina. Pero corre. Cuando quiere.' },
			{ say: 'ines', text: 'Yo la hago todos los días. Es mi ruta. —Se recoloca la gorra—. Solo que hoy hay reloj.' },
			{ say: 'camila', text: 'Me he enterado por la radio de que en un pueblo había una carrera. —Se baja las gafas—. Donde hay público, estoy yo. Mi Zebstrika también. Él brilla más, pero no se lo digan.' },
			{ say: 'teodoro', text: 'Cinco tramos: plaza, huertos, muralla norte, el llano helado y la bajada. Hay quien corta por el aire, hay quien corta entre frutales. Si no tiene montura que sirva, hay Zebstrika y Sawsbuck de la granja. Lo de la granja lo pago yo. Que conste.' },
			{ say: 'teodoro', text: 'Y yo lo apunto todo. Su mejor tiempo, en el archivo. Lo demás se lo lleva el viento.' },
			{ set: { 'flag.carr_teselia_vista': true } },
			{ call: 'carr_teselia_correr' },
		],
		carr_teselia_correr: [
			{ say: 'teodoro', text: '¿Otra vuelta? El cronómetro tiene cuerda. Yo también, todavía.' },
			{ choice: [
				{ text: 'A la salida.', then: [
					{ race: 'teselia', onWin: [
						{ say: 'teodoro', text: 'Primer puesto. Lo apunto con tinta, no con lápiz. —Carraspea—. La tinta es para lo que importa.' },
					], onLose: [
						{ say: 'teodoro', text: 'Lo apunto igual. En el archivo también caben los que llegan después. Sobre todo esos.' },
					] },
				] },
				{ text: 'Otro rato.', then: [{ say: 'teodoro', text: 'Aquí estaré. En el banco. Donde siempre.' }] },
			] },
		],
	},
};
