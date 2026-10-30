// Cuadrante: juego de cartas del mundo (pedido de Mario, 2026-10-30). Motor en app/js/cartas.js, pantalla en
// app/js/ui/cartas-ui.js, formato en docs/CONTENIDO.md §20. Prueba: herramientas/test/cartas-test.mjs.
// Un campeón por ciudad grande ya visitada (personajes que el jugador ya conoce) y dos aficionados para empezar.
//   Luminalia  Philippe (campeón) · una aficionada del café        Kalos    tras b01_fin
//   Trigal     Lola (campeona) · un aficionado del andén           Johto    tras b02_fin
//   Azafrán    Sabrina (campeona)                                  Kanto    tras b04_fin
//   Kantai     Soldi (campeón, en el Taller Kahale)                Alola    tras b05_fin
//   Mayólica   Camila (campeona)                                   Teselia  tras b06_fin
// El primero que te enseña te da el sobre de inicio (`cardStarter`: las especies de tu equipo + comunes).
// Flags: cq_<id>_vista (primera charla), cq_sobre (sobre entregado), cartas_<id>_ganada (lo pone el motor).
// Nada se renombra. Sin spoilers: solo ciudades ya visitadas y personajes ya conocidos.

const LUM = 'flag.b01_fin && visited("luminalia")';
const TRI = 'flag.b02_fin && visited("trigal")';
const AZA = 'flag.b04_fin && visited("azafran")';
const KAN = 'flag.b05_fin && visited("kantai")';
const MAY = 'flag.b06_fin && visited("mayolica")';

/** Explicación corta y sobre de inicio si aún no tiene cartas. `who` enseña con su voz. */
const SOBRE = (who, lines) => ({ if: '!flag.cq_sobre', then: [
	...lines.map(t => ({ say: who, text: t })),
	{ text: 'Te da un sobre de cartón con un Cuadrante dibujado. Dentro hay cartas de tus propios Pokémon (alguien las ha pintado con mucho cariño y poca puntería) y unas cuantas comunes.' },
	{ cardStarter: true },
	{ set: { 'flag.cq_sobre': true } },
	{ text: '*Tu mazo y tu colección están en Más › Cuadrante.*' },
] });

/** Partida y respuesta corta según el resultado. */
// `quit` (2026-10-30): lo que dice el rival si te levantas a mitad de partida (antes la escena se cortaba sin nada).
const PARTIDA = (id, who, win, lose, draw, quit) => ({ cards: id,
	onWin: [{ say: who, text: win }], onLose: [{ say: who, text: lose }], onDraw: [{ say: who, text: draw }],
	...(quit ? { onQuit: [{ say: who, text: quit }] } : {}) });

export default {
	npcs: {
		cq_aficionada: { name: 'Aficionada del Cuadrante', title: 'Café de la avenida', generic: true, look: { hair: 'bob', hairColor: '#b0563a', outfit: '#3a5a8a', outfit2: '#efe8d6', skin: 1, eyesStyle: 'happy', mouth: 'smile', acc: 'glasses' } },
		cq_aficionado: { name: 'Aficionado del Cuadrante', title: 'Andén de Trigal', generic: true, look: { hair: 'cap', hairColor: '#2b2b30', outfit: '#5a7a3a', outfit2: '#d8c49a', skin: 3, eyesStyle: 'normal', mouth: 'grin' } },
	},

	cardPlayers: {
		lum_aficionada: { npc: 'cq_aficionada', name: 'Aficionada del café', loc: 'luminalia', level: 1, max: 2, every: 2, cond: LUM,
			deck: ['fletchling', 'bunnelby', 'scatterbug', 'litleo', 'skiddo'],
			win: '¡Te gané! Uy, perdón. No suelo ganar. Me ha salido la voz de ganar.', lose: 'Bien jugado. Me has girado la esquina como si nada.', draw: 'Empate. El café también se ha quedado a medias.' },
		lum_philippe: { npc: 'philippe', loc: 'luminalia', champion: true, level: 3, max: 4, every: 1, cond: LUM,
			deck: ['mrmime', 'meowstic', 'klefki', 'furfrou', 'delphox'],
			prize: [{ id: 'bottlecap', n: 1 }],
			win: '¡Y la carta que elegiste estaba… en mi mano todo el tiempo! Phil-osofía número doce: la magia es saber contar hasta nueve.',
			lose: '¡Ta-chán! Tú ganas. Ese era el truco: hacer que ganaras. …No, no era el truco. Me has ganado.',
			draw: 'Empate. Como cuando el conejo sale a medias del sombrero. Ni tú ni yo.' },
		tri_aficionado: { npc: 'cq_aficionado', name: 'Aficionado del andén', loc: 'trigal', level: 2, max: 2, cond: TRI,
			deck: ['sentret', 'hoothoot', 'ledyba', 'marill', 'snubbull'],
			win: 'El Magnetotrén pasa cada doce minutos. Me ha dado tiempo de ganarte.', lose: 'Me has ganado antes de que llegara el tren. Eso no pasa.', draw: 'Empate. Y el tren, puntual.' },
		tri_lola: { npc: 'lola', loc: 'trigal', champion: true, level: 3, max: 4, every: 1, cond: TRI,
			deck: ['raticate', 'persian', 'sneasel', 'weezing', 'houndoom'],
			prize: [{ id: 'nugget', n: 1 }],
			win: 'Cuentas claras: ganó la casa. Llévate un bollo para el camino. Ese sí es de gratis. Ese, solo ese.',
			lose: 'Me ganaste limpio. Eso no se ve mucho. —Baraja sin mirar—. Fiado no, pero la revancha sí.',
			draw: 'Tablas. Como en las cuentas bien hechas: nadie le debe a nadie.' },
		aza_sabrina: { npc: 'sabrina', loc: 'azafran', champion: true, level: 3, max: 4, every: 1, cond: AZA,
			deck: ['alakazam', 'espeon', 'hypno', 'slowbro', 'mrmime'],
			prize: [{ id: 'twistedspoon', n: 1 }],
			win: 'No he mirado tus cartas. Ni con los ojos ni de la otra manera. Has perdido tú solo.',
			lose: 'Interesante. Vi la jugada un segundo antes de que la hicieras… y aun así no supe pararla.',
			draw: 'Empate. El futuro también se queda a veces sin decidir.' },
		kan_soldi: { npc: 'soldabot', loc: 'taller_kahale', champion: true, level: 3, max: 4, every: 1, cond: KAN,
			deck: ['magnemite', 'klink', 'metang', 'magnezone', 'bronzong'],
			prize: [{ id: 'metalcoat', n: 1 }, { id: 'starpiece', n: 1 }],
			win: 'Victoria. Excelente. Para ser yo. Siempre es excelente para ser yo.',
			lose: 'Derrota registrada. Excelente. Para ser alguien con solo dos manos.',
			draw: 'Empate. Probabilidad estimada: baja. Satisfacción: media.' },
		may_camila: { npc: 'camila', loc: 'mayolica', champion: true, level: 3, max: 4, every: 1, cond: MAY,
			deck: ['emolga', 'zebstrika', 'galvantula', 'eelektross', 'ampharos'],
			prize: [{ id: 'cometshard', n: 1 }],
			win: 'Gané. Y las cartas, perfectas. Hasta en la mesa hay que brillar.',
			lose: 'Me has ganado. Lo apunto en la agenda, entre la sesión de fotos y el ensayo. Con brillantina.',
			draw: 'Empate. Las dos pasarelas a la vez. No está mal.' },
	},

	patches: {
		luminalia: { spots: [
			{ label: 'Mesa de Cuadrante del café', sub: 'Cartas, tazas y alguien con chistera', icon: '🃏', cond: LUM, new: '!flag.cq_lum_vista', talk: [
				{ cond: '!flag.cq_lum_vista', script: 'cq_lum_intro' },
				{ script: 'cq_lum_mesa' },
			] },
		] },
		trigal: { spots: [
			{ label: 'Cuadrante en el andén', sub: 'Una mesa plegable junto al puesto de bollos', icon: '🃏', cond: TRI, new: '!flag.cq_tri_vista', talk: [
				{ cond: '!flag.cq_tri_vista', script: 'cq_tri_intro' },
				{ script: 'cq_tri_mesa' },
			] },
		] },
		azafran: { spots: [
			{ label: 'Sala de espera del gimnasio', sub: 'Una baraja que se baraja sola', icon: '🃏', cond: AZA, new: '!flag.cq_aza_vista', talk: [
				{ cond: '!flag.cq_aza_vista', script: 'cq_aza_intro' },
				{ script: 'cq_aza_mesa' },
			] },
		] },
		taller_kahale: { spots: [
			{ label: 'Soldi y su mesa de cartas', sub: 'Una mesa de trabajo con un Cuadrante soldado', icon: '🃏', cond: KAN, new: '!flag.cq_kan_vista', talk: [
				{ cond: '!flag.cq_kan_vista', script: 'cq_kan_intro' },
				{ script: 'cq_kan_mesa' },
			] },
		] },
		mayolica: { spots: [
			{ label: 'Cuadrante en el camerino', sub: 'Focos, espejos y una baraja con purpurina', icon: '🃏', cond: MAY, new: '!flag.cq_may_vista', talk: [
				{ cond: '!flag.cq_may_vista', script: 'cq_may_intro' },
				{ script: 'cq_may_mesa' },
			] },
		] },
	},

	scripts: {
		// ---------------- Luminalia: Philippe ----------------
		cq_lum_intro: [
			{ text: 'En una terraza de la avenida, dos mesas están pegadas para hacer una grande. Encima, un tablero de madera con nueve casillas, tazas por todas partes y un sombrero de copa boca arriba lleno de cartas.' },
			{ say: 'philippe', text: '¡Mi cliente favorit{o|a|e}! ¿Sabes jugar al Cuadrante? ¿No? ¡Perfecto! Me encanta enseñar cosas que sé hacer.' },
			{ say: 'philippe', text: 'En Luminalia se juega en los cafés desde que mi abuelo era joven. Él decía que era «el ajedrez de los que tienen prisa». Yo digo que es magia con números. Phil-osofía número cuatro.' },
			SOBRE('philippe', [
				'Te explico rápido, que la gente se va. Cada carta es un Pokémon con cuatro números: arriba sus PS, a la derecha su ataque, abajo su defensa y a la izquierda su velocidad.',
				'Pones una carta pegada a una mía: si tu número de ese lado gana al mío, ¡zas!, la carta se pasa a tu bando. Si tu tipo le gana al suyo, un puntito extra. Nueve casillas, cinco cartas cada quien, y gana quien tenga más al final.',
				'Te he hecho un sobre. Con tus Pokémon. Los he dibujado yo de memoria. …El de las orejas no me salió.',
			]),
			{ say: 'cq_aficionada', text: '¡Si quieres practicar antes de enfrentarte a él, juego contigo! Él hace trampa. Bueno, no. Pero lo parece.' },
			{ say: 'philippe', text: '¡No hago trampa! Te distraigo. Es distinto. Lo pone en el libro.' },
			{ set: { 'flag.cq_lum_vista': true } },
			{ call: 'cq_lum_mesa' },
		],
		cq_lum_mesa: [
			{ say: 'philippe', text: '¿Una partida? El sombrero está lleno y la tarde, vacía.' },
			{ choice: [
				{ text: 'Contra Philippe.', then: [PARTIDA('lum_philippe', 'philippe',
					'Vuelve cuando quieras. Te dejo ganar la próxima. …Es broma. Te gano otra vez.',
					'Te mereces la carta. Y una ovación. Una pequeña: la terraza está llena.',
					'Ni para ti ni para mí. Pido otro café para pensarlo.',
					'¿Te vas a mitad del truco? Phil-osofía número trece: la carta que no se juega no se pierde. Guardo la mesa.')] },
				{ text: 'Contra la aficionada del café.', then: [PARTIDA('lum_aficionada', 'cq_aficionada',
					'¡Revancha cuando quieras! Bueno, cuando yo quiera. Que ahora estoy feliz.',
					'Juegas bien. Philippe va a sufrir. Me encanta.',
					'Empate. Me sirve.',
					'¡Ah! Vale, vale. Yo tampoco iba muy bien. Te guardo el sitio.')] },
				{ text: 'Otro rato.', then: [{ say: 'philippe', text: 'Las cartas no se van. Bueno, a veces sí, pero vuelven. Como yo.' }] },
			] },
		],

		// ---------------- Trigal: Lola ----------------
		cq_tri_intro: [
			{ text: 'Junto al puesto de bollos, Lola ha montado una mesa plegable con una tela verde encima. Tacho, su Raticate, vigila la caja del dinero como si fuera suya.' },
			{ say: 'lola', text: 'Mira quién. Siéntate. No vendo, hoy juego. El Cuadrante lo trajo un turista de Kalos hace años y ahora en el andén no se habla de otra cosa.' },
			{ say: 'lola', text: 'Aquí se juega como en todas partes: cinco cartas, nueve casillas, y la que pones gira a las que tiene al lado si les gana en ese lado. Lo único distinto es que aquí no se fía.' },
			SOBRE('lola', [
				'¿No tienes cartas? —Suspira—. Ten. Le pedí al de la imprenta unas de tus bichos, por si pasabas. Me debía una.',
			]),
			{ say: 'cq_aficionado', text: 'Si quieres calentar, juego contigo mientras llega el tren. Lola no perdona ni a su madre.' },
			{ say: 'lola', text: 'A mi madre menos. Ella me enseñó.' },
			{ set: { 'flag.cq_tri_vista': true } },
			{ call: 'cq_tri_mesa' },
		],
		cq_tri_mesa: [
			{ say: 'lola', text: '¿Juegas o miras? Mirar es gratis. Jugar también, pero se nota más.' },
			{ choice: [
				{ text: 'Contra Lola.', then: [PARTIDA('tri_lola', 'lola',
					'La próxima mírate las esquinas. Ahí se pierde todo.',
					'Llévate la carta. Te la ganaste. Y no le digas a nadie que perdí, que me espantas a la clientela.',
					'Ni tú ni yo. Así me gusta.',
					'¿Te levantas? Sin problema. La partida no se cobra a medias. Aquí sigo.')] },
				{ text: 'Contra el aficionado del andén.', then: [PARTIDA('tri_aficionado', 'cq_aficionado',
					'Llega el tren. Me voy contento.',
					'Bien jugado. Me ha dado tiempo de perder y todo.',
					'Empate. El tren ni se ha enterado.',
					'Te vas antes que el tren. Raro, pero respetable. Si quieres, te espero al de las doce y cuarto.')] },
				{ text: 'Otro rato.', then: [{ say: 'lola', text: 'Aquí estoy. Siempre estoy.' }] },
			] },
		],

		// ---------------- Azafrán: Sabrina ----------------
		cq_aza_intro: [
			{ text: 'En la sala de espera del gimnasio hay una mesa baja con un tablero de nueve casillas. Las cartas se barajan solas en el aire, despacio, y se posan en un montón perfecto.' },
			{ say: 'sabrina', text: 'Sabía que vendrías a esta mesa. Y no lo he leído en tu mente: todo el que entra en esta sala acaba mirándola.' },
			{ say: 'sabrina', text: 'Juego al Cuadrante porque es un juego en el que todo está a la vista. Las cartas, la mesa, la mano del otro. No hay nada que adivinar. Me descansa.' },
			SOBRE('sabrina', [
				'Cinco cartas cada quien. Pones una al lado de las mías y, si tu número de ese lado es mayor, la carta cambia de dueño. El tipo ayuda un poco.',
				'Toma. Las dibujó alguien del gimnasio que tiene buena mano. Son tus Pokémon. Te conocen bien.',
			]),
			{ say: 'sabrina', text: 'No leeré tu mente. Lo prometo. Sería como jugar con los ojos abiertos mientras tú los tienes cerrados.' },
			{ set: { 'flag.cq_aza_vista': true } },
			{ call: 'cq_aza_mesa' },
		],
		cq_aza_mesa: [
			{ say: 'sabrina', text: '¿Juegas?' },
			{ choice: [
				{ text: 'Una partida.', then: [PARTIDA('aza_sabrina', 'sabrina',
					'Vuelve. Cada vez juegas distinto. Eso me gusta.',
					'Bien. Me quedo con la sensación. Es nueva.',
					'Así está bien.',
					'Lo sabía antes de que te levantaras. No pasa nada.')] },
				{ text: 'Otro rato.', then: [{ say: 'sabrina', text: 'Lo sé.' }] },
			] },
		],

		// ---------------- Kantai: Soldi ----------------
		cq_kan_intro: [
			{ text: 'En el banco de trabajo del taller hay un tablero de nueve casillas hecho con chapa y remaches. Soldi lo ha soldado a la mesa «para que nadie lo vuelque al perder».' },
			{ say: 'soldabot', text: 'Visitante detectado. Propuesta: partida de Cuadrante. Leilani no juega conmigo. Dice que hago cálculos. Hago cálculos.' },
			{ say: 'leilani', text: '¡Hace cálculos! Pero va, juega con él, que lleva toda la semana diciendo que es el campeón de la isla. Es el único que juega en la isla. ¿Sí o qué?' },
			SOBRE('soldabot', [
				'Instrucciones: cinco cartas. Nueve casillas. Número mayor en el lado que se toca: captura. Ventaja de tipo: más uno. Fin.',
				'Entrego sobre. Cartas de tus Pokémon, impresas en la máquina de etiquetas. Calidad excelente. Para ser etiquetas.',
			]),
			{ set: { 'flag.cq_kan_vista': true } },
			{ call: 'cq_kan_mesa' },
		],
		cq_kan_mesa: [
			{ say: 'soldabot', text: 'Mesa lista. Brazo listo. ¿Partida?' },
			{ choice: [
				{ text: 'Una partida.', then: [PARTIDA('kan_soldi', 'soldabot',
					'Recomendación: menos corazón, más cálculo. O al revés. Datos insuficientes.',
					'Recalibrando. Vuelve. Mi orgullo también se suelda.',
					'Empate. Lo guardo en la memoria. En la buena, no en la de errores.',
					'Partida interrumpida. Guardando estado: ninguno. Excelente estrategia de huida. Para ser human{o|a|e}.')] },
				{ text: 'Otro rato.', then: [{ say: 'soldabot', text: 'Entendido. Mesa en espera. Brazo en espera. Yo también.' }] },
			] },
		],

		// ---------------- Mayólica: Camila ----------------
		cq_may_intro: [
			{ text: 'En el camerino del gimnasio, entre focos y espejos, hay una mesita con un tablero de nueve casillas. Las cartas tienen los bordes pintados con purpurina.' },
			{ say: 'camila', text: 'Entre sesión y sesión, aquí se juega. Las modelos, los técnicos, yo. Sobre todo yo. Soy la que más gana. No es por presumir. Bueno, un poco.' },
			SOBRE('camila', [
				'Cada quien pone cinco cartas, por turnos, en estas nueve casillas. Si tu lado gana al lado de la mía que tocas, la carta es tuya. Con ventaja de tipo, un punto más.',
				'Toma. Te hice un sobre en la imprenta de las revistas. Tus Pokémon, con buena luz. Se nota, ¿verdad?',
			]),
			{ set: { 'flag.cq_may_vista': true } },
			{ call: 'cq_may_mesa' },
		],
		cq_may_mesa: [
			{ say: 'camila', text: 'Tengo diez minutos antes del siguiente ensayo. Me sobran cinco.' },
			{ choice: [
				{ text: 'Una partida.', then: [PARTIDA('may_camila', 'camila',
					'La próxima vez juega con más luz. Se nota cuando alguien duda.',
					'Ganaste. Lo pongo en mis historias. Sin filtro, que es verdad.',
					'Empate. Foto de las dos manos y a otra cosa.',
					'¿Ya? —Alza una ceja—. Bueno. Una salida a tiempo también es estilo.')] },
				{ text: 'Otro rato.', then: [{ say: 'camila', text: 'Te guardo la silla. Con purpurina.' }] },
			] },
		],
	},
};
