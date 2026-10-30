// Casos de detective (pedido de Mario, 2026-10-30). Motor: app/js/casos.js; pantalla: app/js/ui/casos-ui.js.
// Mauro Quintana (`quintana`), perito de siniestros de la aseguradora de Relieve (la de Héctor), escribe por el Buzón
// y te cita en el lugar del siniestro. Tres casos de la vida diaria, justos y sin nada sobrenatural:
//   det_c1  Luminalia (Kalos)  Pâtisserie Mirabelle: la recaudación del fin de semana     sencillo   tras b04_fin
//   det_c2  Iris (Johto)       Casa de té Hojarasca: el cuenco «Luna de Invierno»          medio      tras det_c1_carta
//   det_c3  Azafrán (Kanto)    Relojería El Segundero: el reloj de bolsillo de la caja     difícil    tras det_c2_carta
// Cartas: detcarta1..3 (objetos con `read`). Spot en cada ciudad con `new` hasta la primera visita.
// Flags nuevos: det_cN_carta (carta leída), det_cN_visto (intro vista), det_cN_ok / det_cN_escapo (resultado, para
// las cartas siguientes). El motor pone además det_cN_resuelto / det_cN_fallido.
// NPCs nuevos: quintana y nueve sospechosos `det_*` (generic: solo salen en su caso).
// Soluciones y caminos de pistas: secreto/bloques/p15-casos.md. Nada se renombra.

const Q = 'quintana';

/** Cierre común de cada caso: líneas, reputación y misión cerrada. */
const seguir = (id, solve, fail) => [
	{ case: id,
		onSolve: [...solve, { rep: { policia: 1 } }, { set: { [`flag.${id}_ok`]: true } }, { quest: id, stage: 'hecha' }, { quest: id, done: true }],
		onFail: [...fail, { set: { [`flag.${id}_escapo`]: true } }, { quest: id, stage: 'escapado' }, { quest: id, done: true }] },
];

export default {
	// =====================================================================
	// PERSONAJES
	// =====================================================================
	npcs: {
		quintana: { name: 'Mauro Quintana', title: 'Perito de siniestros', look: { hair: 'short', hairColor: '#9a9a96', eyes: '#4a3a2a', outfit: '#b8a37a', outfit2: '#e8e2d2', skin: 2, eyesStyle: 'sleepy', mouth: 'flat', acc: 'glasses beard tie', tie: '#7a3a3a', glassColor: '#2b2420', beardColor: '#8a8a86', brows: 'skeptic', nose: 'hook', collar: 'jacket', build: 'normal', age: 'adult' } },

		// ---- Caso 1 · Luminalia ----
		det_solene: { name: 'Solène Morel', title: 'Dueña de la Pâtisserie Mirabelle', generic: true, look: { hair: 'bun', hairColor: '#3a2a22', eyes: '#5a3a2a', outfit: '#d98aa0', outfit2: '#fff4f0', skin: 1, eyesStyle: 'sharp', mouth: 'flat', acc: 'flower', collar: 'cardigan', head: 'oval' } },
		det_florian: { name: 'Florián Ducasse', title: 'Repostero', generic: true, look: { hair: 'curly', hairColor: '#c48a3a', eyes: '#3a5a2a', outfit: '#f2f0ea', outfit2: '#3a3a40', skin: 0, eyesStyle: 'normal', mouth: 'grin', acc: 'freckles bandana', collar: 'shirt', build: 'broad' } },
		det_amandine: { name: 'Amandine Garnier', title: 'Camarera', generic: true, look: { hair: 'ponytail', hairColor: '#1e1e26', eyes: '#2a2a3a', outfit: '#3a3a4a', outfit2: '#f0e6e0', skin: 4, eyesStyle: 'happy', mouth: 'smile', acc: 'bow', collar: 'vest', head: 'heart' } },

		// ---- Caso 2 · Iris ----
		det_sumire: { name: 'Doña Sumire', title: 'Casa de té Hojarasca', generic: true, look: { hair: 'bun', hairColor: '#e6e2da', eyes: '#3a2a22', outfit: '#6a3a5a', outfit2: '#d8b46a', skin: 2, eyesStyle: 'sleepy', mouth: 'smile', acc: '', collar: 'cardigan', age: 'old', head: 'round' } },
		det_ren: { name: 'Ren', title: 'Aprendiz de la casa de té', generic: true, look: { hair: 'spiky', hairColor: '#2a2a2a', eyes: '#3a2a1a', outfit: '#4a6a4a', outfit2: '#e8e0cc', skin: 2, eyesStyle: 'normal', mouth: 'open', acc: '', collar: 'tshirt', build: 'narrow', head: 'round' } },
		det_haruki: { name: 'Don Haruki', title: 'Tasador de antigüedades', generic: true, look: { hair: 'tied', hairColor: '#4a4a52', eyes: '#2a2a2a', outfit: '#2e3a52', outfit2: '#c9c2b0', skin: 1, eyesStyle: 'sharp', mouth: 'smile', acc: 'glasses mustache', glassColor: '#b08a3a', collar: 'jacket', head: 'long', nose: 'l' } },

		// ---- Caso 3 · Azafrán ----
		det_nerea: { name: 'Nerea Prieto', title: 'Aprendiz de relojera', generic: true, look: { hair: 'short', hairColor: '#7a2a2a', streak: '#e0b040', eyes: '#3a2a1a', outfit: '#2f4a5a', outfit2: '#d8d0c0', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'goggles', collar: 'hoodie', head: 'square' } },
		det_fermin: { name: 'Fermín Salcedo', title: 'Vigilante nocturno', generic: true, look: { hair: 'cap', hairColor: '#3a3a3a', capColor: '#1f2a44', eyes: '#2a2a2a', outfit: '#1f2a44', outfit2: '#c8b04a', skin: 4, eyesStyle: 'sleepy', mouth: 'flat', acc: 'mustache', collar: 'jacket', build: 'broad', head: 'wide' } },
		det_octavio: { name: 'Octavio Lerma', title: 'Coleccionista de relojes', generic: true, look: { hair: 'short', hairColor: '#d8d4c8', eyes: '#3a4a5a', outfit: '#5a2a32', outfit2: '#f0ece0', skin: 0, eyesStyle: 'happy', mouth: 'smile', acc: 'tie', tie: '#c8a43a', collar: 'shirt', head: 'oval', nose: 'button', age: 'old' } },
	},

	// =====================================================================
	// CARTAS
	// =====================================================================
	items: {
		detcarta1: { name: 'Carta de M. Quintana', pocket: 'key', desc: 'Un sobre de la aseguradora de Relieve con el logotipo tachado a boli. Dentro, dos hojas de libreta escritas con letra pequeña y una mancha de café.',
			read: '*(Hojas de libreta con anillas, arrancadas con cuidado. Letra pequeña, inclinada. Una mancha redonda de taza en la esquina.)*\n\n{jugador}:\n\nNo me conoces. Me llamo Mauro Quintana y soy perito de siniestros en la aseguradora de Relieve. Lo que hago es sencillo de contar: cuando a un cliente le roban, se le rompe o se le pierde algo, voy yo, miro, pregunto y apunto. Y luego decido si lo que me cuentan es verdad.\n\nTe escribo por culpa de Héctor. Trabaja dos mesas más allá. Me ha hablado de ti unas cuarenta veces. Dice que eres «un héroe de verdad, Mauro, de los que no llevan casco». Yo no creo en héroes. Creo en libretas. Pero Héctor, con todo lo que salta, no se equivoca con la gente.\n\nDesde que hay Puertas, los siniestros viajan, y yo estoy solo para todo el Circuito. Necesito otro par de ojos. Unos que no estén cansados.\n\nEl primero es fácil. En Luminalia, la **Pâtisserie Mirabelle** denuncia que el domingo por la noche se llevaron la recaudación del fin de semana. Ventana rota, despacho revuelto, nadie vio nada. Tres personas con llave o con motivo.\n\nYo estaré allí. Gabardina color arena. No tiene pérdida: la gabardina tiene más años que tú.\n\nSi vienes, trae paciencia. Si no vienes, lo entiendo.\n\nM. Quintana\n\nP. D.: *(Otra letra, grande, con muchas exclamaciones.)* ¡{jugador}! ¡Soy Héctor! ¡Mauro es el mejor detective del mundo y no lo sabe! ¡Ayúdale y dile que me conteste los vídeos! ¡TRANSFORMACIÓN! *(Debajo, con la letra pequeña:)* No le contestes tú tampoco. — M.' },
		detcarta2: { name: 'Segunda carta de M. Quintana', pocket: 'key', desc: 'Una hoja de libreta doblada en cuatro, con una pipa de girasol olvidada dentro del pliegue.',
			read: '*(Letra pequeña, inclinada. Hay una pipa de girasol pegada al pliegue.)*\n\n{jugador}:\n\nOtro. Este es más fino.\n\nEn Iris, la **Casa de té Hojarasca** tiene asegurado un cuenco de doscientos años. Se llama «Luna de Invierno». Bonito nombre para un cuenco. Esta semana me tocaba ir a revisarlo, porque hace poco la dueña dobló el valor de la póliza.\n\nNo me ha dado tiempo. El lunes por la mañana, el cuenco apareció roto en su caja.\n\nUn cuenco que sube de precio y se rompe justo antes de que lo vea el perito. A ver, a ver. Puede ser mala suerte. La mala suerte existe. Pero se apunta.\n\nTe espero en Iris, a la puerta de la casa de té. Lupa ya está allí. Ha encontrado un tejado que le gusta.\n\nM. Quintana' },
		detcarta3: { name: 'Tercera carta de M. Quintana', pocket: 'key', desc: 'Un sobre grueso con un horario del Magnetotrén doblado dentro, subrayado en tres colores. Y una hoja de libreta.',
			read: '*(Letra pequeña. Esta vez, más apretada. Hay números en el margen.)*\n\n{jugador}:\n\nEste es de los míos. De los que no me dejan dormir.\n\nEn Azafrán, la **Relojería El Segundero** guardaba en la caja fuerte un reloj de bolsillo antiguo, el orgullo de su dueño, Don Anselmo Prieto. Esta madrugada la caja apareció abierta y vacía. Sin forzar. Con su combinación.\n\nEn la tienda hay un reloj de pared parado a una hora concreta, que es lo que todo el mundo me enseña primero. En una relojería, un reloj parado es como una firma. La pregunta es de quién.\n\nTres personas. Una sobrina que sabe la combinación, un vigilante que pasó la noche allí y un coleccionista que quería comprar ese reloj y tiene una coartada muy bien planchada.\n\nTe mando el horario del Magnetotrén. No sé si hará falta. Pero yo, por si acaso, siempre lo llevo.\n\nM. Quintana\n\nP. D.: Héctor quiere venir. Le he dicho que no. Lleva tres días practicando una pose de detective.' },
	},

	// =====================================================================
	// BUZÓN
	// =====================================================================
	mail: [
		{ id: 'det_c1', kind: 'encargo', from: 'Mauro Quintana', npc: Q, title: 'Otro par de ojos', cond: 'flag.b04_fin && visited("luminalia")', days: 1, item: 'detcarta1', script: 'det_c1_carta' },
		{ id: 'det_c2', kind: 'encargo', from: 'Mauro Quintana', npc: Q, title: 'Un cuenco con nombre', cond: 'flag.det_c1_carta && flag.b03_fin && visited("iris")', days: 3, item: 'detcarta2', script: 'det_c2_carta' },
		{ id: 'det_c3', kind: 'encargo', from: 'Mauro Quintana', npc: Q, title: 'Un reloj parado', cond: 'flag.det_c2_carta && flag.b04_fin && visited("azafran")', days: 3, item: 'detcarta3', script: 'det_c3_carta' },
	],

	// =====================================================================
	// MISIONES
	// =====================================================================
	quests: {
		det_c1: { name: 'El caso de la Pâtisserie Mirabelle', type: 'side', est: 25, stages: {
			ir: 'Mauro Quintana te espera en la **Pâtisserie Mirabelle**, en **Ciudad Luminalia**. Se llevaron la recaudación del fin de semana.',
			investigar: 'El caso sigue abierto en la **Pâtisserie Mirabelle** (**Ciudad Luminalia**). Registra, pregunta y acusa cuando lo tengas claro.',
			hecha: 'Caso cerrado. La recaudación vuelve a la pastelería.',
			escapado: 'El culpable se escapó. Quintana lo tiene apuntado.',
		} },
		det_c2: { name: 'El caso del cuenco Luna de Invierno', type: 'side', est: 35, stages: {
			ir: 'Quintana te espera en la **Casa de té Hojarasca**, en **Ciudad Iris**. Un cuenco antiguo y asegurado apareció roto en su caja.',
			investigar: 'El caso sigue abierto en la **Casa de té Hojarasca** (**Ciudad Iris**). Registra, pregunta y acusa cuando lo tengas claro.',
			hecha: 'Caso cerrado. El cuenco de verdad tiene quien lo busque.',
			escapado: 'El culpable se escapó. Quintana lo tiene apuntado.',
		} },
		det_c3: { name: 'El caso del reloj parado', type: 'side', est: 45, stages: {
			ir: 'Quintana te espera en la **Relojería El Segundero**, en **Ciudad Azafrán**. La caja fuerte apareció abierta y vacía, sin forzar.',
			investigar: 'El caso sigue abierto en la **Relojería El Segundero** (**Ciudad Azafrán**). Registra, pregunta y acusa cuando lo tengas claro.',
			hecha: 'Caso cerrado. El reloj vuelve a su caja.',
			escapado: 'El culpable se escapó. Quintana lo tiene apuntado.',
		} },
	},

	// =====================================================================
	// CASOS
	// =====================================================================
	cases: {
		// -------------------------------------------------------------
		// Caso 1 · Luminalia · sencillo
		// -------------------------------------------------------------
		det_c1: { name: 'El caso de la Pâtisserie Mirabelle', loc: 'luminalia', partner: Q, rep: 10,
			brief: 'El domingo por la noche desapareció del despacho la **lata con la recaudación del fin de semana**. La ventana del despacho está **rota** y no hay más daños. Tienen llave la dueña y el repostero. La camarera, no.',
			clues: {
				cristales: { name: 'Cristales en la acera', icon: '🪟', text: 'Los cristales de la ventana del despacho están **fuera**, en la acera. La ventana se rompió **desde dentro**.', partner: 'Si entras rompiendo, los cristales caen hacia dentro. Estos han caído hacia la calle. A ver, a ver.' },
				alquiler: { name: 'Aviso del casero', icon: '📄', text: 'Carta del casero a Solène: debe **tres meses** de alquiler y tiene hasta el lunes para pagar.', partner: 'Tres meses. Eso es un motivo. No es una prueba, pero se apunta.' },
				recibo: { name: 'Recibo del alquiler', icon: '🧾', text: 'Recibo sellado: Solène pagó los tres meses el **sábado por la mañana**, con un préstamo de su hermana.', partner: 'Sábado. Antes del robo. Quien ya ha pagado no necesita robarse a sí misma.' },
				pendiente: { name: 'Pendiente de fresa', icon: '🍓', text: 'Un pendiente con forma de fresa, debajo del escritorio del despacho, junto al cajón de la lata.', partner: 'Alguien ha estado agachado junto a ese cajón. No sé cuándo.' },
				arqueo: { name: 'Hoja de arqueo del sábado', icon: '📋', text: 'El sábado por la noche Amandine y Solène contaron la caja **juntas** en el despacho. Firman las dos.', partner: 'Así que el pendiente se cayó el sábado, delante de la dueña. Eso explica el pendiente. Y nada más.' },
				horno: { name: 'Registro del horno', icon: '🔥', text: 'El horno grande apunta cuándo se enciende. El lunes se encendió a las **3:12** de la madrugada.', partner: 'Los hornos no mienten. No saben.' },
				hora: { name: 'Florián: «llegué a las cinco»', icon: '🕔', text: 'Florián dice que llegó a las **5:00**, como siempre, y que la ventana ya estaba rota.', partner: 'Lo apunto tal cual. Con sus palabras.' },
				tres: { name: 'Florián llegó a las tres', icon: '🕒', text: 'Florián admite que llegó a las **3:00** para ensayar una tarta de concurso. Insiste en que la ventana ya estaba rota al llegar.', partner: 'Dos horas que no estaban en la primera versión. Eso no cuadra.' },
				cerrojo: { name: 'El cerrojo de atrás', icon: '🔒', text: 'Según Florián, la puerta de atrás tenía el **cerrojo echado por dentro** cuando llegó. Lo quitó él.', partner: 'Por la puerta no entró nadie, entonces. Me lo apunto.' },
				florista: { name: 'Lo que oyó la florista', icon: '💐', text: 'La florista de enfrente montó el puesto a las **4:30**: la acera estaba limpia. A las **4:50** oyó el cristal romperse. Solo había luz en el **obrador**.', partner: 'A las cuatro y cincuenta. Con alguien en el obrador desde las tres.' },
				moto: { name: 'Carta del concesionario', icon: '🛵', text: 'En la taquilla de Florián: un aviso de **cuatro plazos sin pagar** de una moto. Si no paga esta semana, se la quitan.', partner: 'Otro motivo. En esta pastelería hay más motivos que cruasanes.' },
			},
			places: [
				{ id: 'acera', label: 'La acera, bajo la ventana', sub: 'Brilla algo entre los adoquines', icon: '🪟', text: ['Bajo la ventana del despacho, el suelo de la calle está lleno de cristalitos. Lupa baja del canalón y se queda mirándolos con la cabeza ladeada.'], gives: ['cristales'] },
				{ id: 'despacho', label: 'El despacho', sub: 'Escritorio, cajón abierto, papeles', icon: '🗄️', text: ['Un despacho del tamaño de un armario. El cajón donde dormía la lata está abierto y vacío. Sobre la mesa, cartas sin abrir. Debajo, algo pequeño y rojo.'], gives: ['alquiler', 'pendiente'] },
				{ id: 'obrador', label: 'El obrador', sub: 'Huele a mantequilla', icon: '🥐', text: ['Mesas de mármol, sacos de harina y un horno enorme con una pantallita. Quintana pulsa un botón y la pantalla enseña las horas de encendido.'], gives: ['horno'] },
				{ id: 'taquillas', label: 'Las taquillas del personal', sub: 'Tres puertas metálicas', icon: '🚪', text: ['Tres taquillas. La de Solène, con un delantal planchado. La de Amandine, con fotos de su Swirlix. La de Florián, con un casco de moto y un sobre doblado con prisa.'], gives: ['moto'] },
				{ id: 'flores', label: 'El puesto de flores de enfrente', sub: 'Abre antes que nadie en la calle', icon: '💐', needs: ['cristales'], text: ['La florista tiene las manos mojadas y ganas de contarlo. Lo cuenta dos veces. La segunda, con más detalles.'], gives: ['florista'] },
			],
			suspects: {
				solene: { npc: 'det_solene', role: 'La dueña. Cerró el domingo y dejó la lata en el cajón.',
					questions: [
						{ id: 'noche', q: '¿Qué pasó el domingo al cerrar?', a: ['Cerré a las nueve con Amandine. Conté la lata, la guardé en el cajón y cerré el despacho con llave. Como cada domingo desde hace doce años.'] },
						{ id: 'llaves', q: '¿Quién tiene llave?', a: ['Yo y Florián, que abre el obrador. Amandine no. Es buena chica, pero es nueva.', { who: Q, t: 'Dos llaves. Y una ventana rota, que es como una tercera llave. Apuntado.' }] },
						{ id: 'seguro', q: '¿Cubre el seguro el robo?', a: ['Para eso lo pago. Y no me mire así, monsieur Quintana. Llevo doce años sin dar un parte.'] },
					],
					present: {
						alquiler: { a: ['¿Ha leído mis cartas? Qué bonito. Sí, debía tres meses. Los pagué el sábado. Mi hermana me prestó el dinero. Aquí tiene el recibo, con su sello.'], gives: ['recibo'] },
						pendiente: { a: ['Es de Amandine. Siempre lleva esas fresas. El sábado contamos la caja juntas en el despacho; se le caería entonces.'] },
						moto: { a: ['Florián y su moto. Me pidió un adelanto el mes pasado. Le dije que no. No soy un banco.'] },
						tres: { a: ['¿A las tres? Florián no ha llegado a las tres en su vida. Ni a las cinco, la mitad de los días.'] },
					},
					presentDefault: ['No sé qué quiere que vea ahí. Yo hago pasteles y cuentas. Por ese orden.'] },
				florian: { npc: 'det_florian', role: 'El repostero. Abre el obrador de madrugada.',
					questions: [
						{ id: 'hora', q: '¿A qué hora llegaste el lunes?', a: ['A las cinco, como siempre. Y ya estaba todo así: la ventana rota y el cajón abierto. Llamé a Solène enseguida.'], gives: ['hora'] },
						{ id: 'concurso', q: '¿Preparas algo especial?', a: ['El Concurso de Repostería de Luminalia, a la sombra de la Torre Prisma. Una tarta de tres pisos. Si gano, me hago un nombre.'] },
						{ id: 'litleo', q: '¿Tu Litleo no notó nada?', a: ['Litleo me enciende el horno pequeño, no vigila ventanas. Y duerme como una piedra, ¿eh? Como yo.'] },
					],
					present: {
						horno: { a: ['…Vale. Vale. Llegué a las tres. Quería ensayar la tarta sin que Solène me viera gastar mantequilla. Pero la ventana ya estaba rota. ¡Ya estaba rota cuando entré!'], gives: ['tres'] },
						cristales: { a: ['¿Y qué? El ladrón rompió desde dentro para salir, yo qué sé. Por la puerta no fue: tenía el cerrojo echado por dentro cuando llegué. Lo quité yo.'], gives: ['cerrojo'] },
						moto: { a: ['Eso es mío, ¿eh? Pago tarde. Como todo el mundo en esta ciudad.'] },
						florista: { a: ['La florista… la florista se confunde. Siempre tiene la radio puesta. Seguro que fue otro ruido.', { who: Q, t: 'Un cristal es un ruido muy suyo.' }] },
					},
					presentDefault: ['¿Eso qué tiene que ver conmigo? Yo hago masa. La masa no roba.'] },
				amandine: { npc: 'det_amandine', role: 'La camarera. Cerró con la dueña.',
					questions: [
						{ id: 'noche', q: '¿Qué hiciste el domingo al salir?', a: ['Cerramos a las nueve, Solène y yo. Cogí el autobús de las nueve y cuarto. Mi compañera de piso me vio llegar: estaba viendo la tele.'] },
						{ id: 'sueldo', q: '¿Estás contenta aquí?', a: ['Pedí un aumento hace un mes. Me dijo que no. Así que… contenta, contenta, no.', { who: Q, t: 'Lo dice sin bajar la voz. Eso también se apunta.' }] },
						{ id: 'llaves', q: '¿Tienes llave del local?', a: ['No. Nunca me la quisieron dar. Para entrar sin llave tendría que haber trepado, y con este uniforme ni de broma.'] },
					],
					present: {
						pendiente: { a: ['¡Mi fresa! La perdí el sábado, cuando contamos la caja con Solène. Mire, aquí está la hoja del arqueo; firmamos las dos.'], gives: ['arqueo'] },
						moto: { a: ['Florián no habla de otra cosa. La moto, la moto. Viene con el casco puesto hasta la cocina.'] },
					},
					presentDefault: ['Uy. No sé qué decirle de eso. ¿Quiere un café mientras lo piensa?'] },
			},
			culprit: 'florian', proof: ['florista'],
			objection: {
				culpable: ['Eh, eh. Despacio. Con eso no se acusa a nadie. Esa persona tiene explicación para lo que le enseñas. Vuelve a mirar quién estaba dentro, y cuándo.'],
				prueba: ['La persona puede que sí. La pista, no. Eso la hace sospechosa, no culpable. Necesito algo que diga cuándo se rompió esa ventana.'],
			},
			hurry: 'Aún hay sitios sin mirar y preguntas sin hacer. Yo no tengo prisa. El culpable, sí.',
			again: 'Aquí ya lo hemos mirado todo. Dos veces el mismo cajón no da dos pistas.',
			solution: [
				{ who: Q, t: 'Una cosita nada más. Los cristales están fuera: la ventana se rompió desde dentro. Por la puerta no entró nadie: cerrojo echado por dentro.' },
				{ who: Q, t: 'El horno se encendió a las tres y doce. Florián dijo que llegó a las cinco. Luego dijo que a las tres, y que la ventana ya estaba rota.' },
				{ who: Q, t: 'Pero la florista tenía la acera limpia a las cuatro y media y oyó el cristal a las cuatro y cincuenta. Con luz solo en el obrador. Y en el obrador estaba él.' },
				{ who: 'det_florian', t: 'Lo rompí para que pareciera un robo. La lata está en el baúl de la moto. Iba a devolverlo cuando ganara el concurso. Iba a devolverlo, de verdad.' },
				{ who: 'det_solene', t: 'Doce años, Florián. Doce años y me lo pides en un cristal roto.' },
				{ who: Q, t: 'La dueña, el recibo. La camarera, el pendiente. Cada uno tenía su motivo. Solo uno tenía la hora en contra.' },
			],
			escape: [
				{ who: null, t: 'Cuando volvéis a buscar a Florián, la moto ya no está en la esquina. En la taquilla solo queda el delantal.' },
				{ who: Q, t: 'Se ha ido con la moto y con la lata. Lo apunto. Las motos tienen matrícula y las libretas, memoria.' },
			],
			prize: [{ id: 'abilitycapsule', n: 1 }, { id: 'bottlecap', n: 1 }] },

		// -------------------------------------------------------------
		// Caso 2 · Iris · medio
		// -------------------------------------------------------------
		det_c2: { name: 'El caso del cuenco Luna de Invierno', loc: 'iris', partner: Q, rep: 12,
			brief: 'El cuenco **Luna de Invierno**, de doscientos años, apareció **roto dentro de su caja** el lunes al amanecer. El domingo por la noche se usó en una ceremonia con un invitado. La dueña **dobló el seguro** hace dos semanas.',
			clues: {
				pedazos: { name: 'Los pedazos', icon: '🍵', text: 'Siete pedazos en la caja. Por fuera, esmalte negro. Por dentro, el barro es **blanco y liso**, y los bordes del corte, limpios.', partner: 'Rotura limpia. Como de un golpe seco y pensado. A ver, a ver.' },
				peso: { name: 'Lo que pesan', icon: '⚖️', text: 'En la báscula de la cocina, los siete pedazos juntos pesan **290 gramos**.', partner: 'Doscientos noventa. Lo apunto con número grande.' },
				ficha: { name: 'Certificado del cuenco', icon: '📜', text: 'Certificado antiguo de Luna de Invierno: **barro negro de Iris**, interior **rugoso**, «peso: 380 gramos».', partner: 'El papel dice negro y rugoso. Los pedazos dicen blanco y liso. Uno de los dos miente, y el papel tiene cien años de ventaja.' },
				aipom: { name: 'Huellas de Aipom', icon: '🐒', text: 'Huellas de la cola-mano de un Aipom en el alféizar de la sala de té, y un rabito de caqui en el tatami.', partner: 'Un Aipom. Los Aipom tocan todo. Ahora, ¿cuándo?' },
				aipom_hora: { name: 'La hora del Aipom', icon: '🕗', text: 'El Aipom de Ren entró a las **20:00**, durante la cena, robó un caqui y se fue. El cuenco se guardó a las **21:30**.', partner: 'El mono se fue hora y media antes de que guardaran el cuenco. El mono, fuera.' },
				poliza: { name: 'Póliza doblada', icon: '📑', text: 'Hace dos semanas, Doña Sumire **dobló** el valor asegurado del cuenco.', partner: 'Subir el seguro y luego romper. Es lo primero que se me ocurre. Por eso desconfío.' },
				consejo: { name: 'La tasación de Haruki', icon: '🔍', text: 'Sumire subió el seguro porque **Don Haruki**, después de tener el cuenco **dos días en su tienda** para tasarlo, le dijo que valía el doble.', partner: 'Así que el precio nuevo no lo puso la dueña. Lo puso el tasador.' },
				guardo: { name: 'Quién lo guardó', icon: '🎁', text: 'El domingo, tras la ceremonia, **Don Haruki** se ofreció a envolver el cuenco en su seda y meterlo en la caja. Ren solo ató el cordón.', partner: 'El último que lo tuvo en la mano no es el que ató el lazo.' },
				revision: { name: 'La visita del perito', icon: '📅', text: 'Sumire le contó a Don Haruki que **esta semana** venía un perito de la aseguradora a revisar el cuenco de cerca.', partner: 'El perito era yo. El jueves. El cuenco se rompió el lunes. Eso no cuadra… o cuadra demasiado.' },
				descripcion: { name: 'Lo que tasó Haruki', icon: '🗒️', text: 'Don Haruki insiste en que el cuenco que tasó tenía el interior **blanco, liso y perfecto**. Lo describe como los pedazos, no como el certificado.', partner: 'Un tasador que confunde barro negro con barro blanco no es un tasador. O sí, y muy bueno.' },
				encargo: { name: 'Recibo del alfarero', icon: '🧾', text: 'En el maletín de Don Haruki: recibo de un alfarero de Trigal. «**Copia exacta** del cuenco de las fotos. Barro blanco, esmalte negro. Entregada a H.» Fechada **hace tres semanas**.', partner: 'Tres semanas. Una antes de llevarse el cuenco a «tasar».' },
			},
			places: [
				{ id: 'sala', label: 'La sala de té', sub: 'La caja de paulonia sigue en la mesa', icon: '🍵', text: ['Tatami, una tetera de hierro y una caja de madera clara, abierta. Dentro, envuelto en seda morada, lo que queda de Luna de Invierno.'], gives: ['pedazos'] },
				{ id: 'ventana', label: 'La ventana del jardín', sub: 'Da a un caqui cargado', icon: '🌳', text: ['La ventana corrediza da al jardín, donde hay un caqui lleno de fruta. Lupa se posa en el alféizar y gira la cabeza hacia unas marcas en la madera.'], gives: ['aipom'] },
				{ id: 'cocina', label: 'La cocina', sub: 'Hay una báscula para el té', icon: '⚖️', needs: ['pedazos'], text: ['Quintana pone los pedazos en la báscula del té, uno por uno, con un pañuelo. «Siete», dice. «Siete pedazos y ninguno pequeño.»'], gives: ['peso'] },
				{ id: 'archivo', label: 'El archivo de la casa', sub: 'Cajones de papeles viejos', icon: '🗃️', text: ['Un mueble de cajones con olor a alcanfor. Sumire guarda ahí los papeles de cada pieza. El de Luna de Invierno tiene una cinta roja. Al lado, la póliza nueva.'], gives: ['ficha', 'poliza'] },
				{ id: 'recibidor', label: 'El recibidor', sub: 'El maletín de Don Haruki, abierto', icon: '💼', needs: ['descripcion'], text: ['Don Haruki ha dejado el maletín abierto junto a los zapatos, con prisa por enseñaros fotos de su tienda. Entre catálogos asoma un papel doblado con el membrete de un horno de cerámica.'], gives: ['encargo'] },
			],
			suspects: {
				sumire: { npc: 'det_sumire', role: 'La dueña. Encontró el cuenco roto al amanecer.',
					questions: [
						{ id: 'manana', q: '¿Cómo lo encontró?', a: ['A las seis abrí la caja para la ceremonia de la mañana. El cordón estaba atado. Y dentro… siete pedazos. Mi abuela tomaba el té en ese cuenco.'] },
						{ id: 'anoche', q: '¿Quién estuvo anoche?', a: ['Don Haruki, de invitado. Ren sirvió. Yo me retiré a las nueve y media; me pesan las rodillas. Ellos se quedaron recogiendo.'] },
						{ id: 'perito', q: '¿Sabía alguien que venía un perito?', a: ['Se lo conté a Don Haruki en la ceremonia, toda orgullosa. «Este jueves viene un señor de la aseguradora a ver mi Luna.» Él se rio.'], gives: ['revision'] },
						{ id: 'ren', q: '¿Cómo va el aprendiz?', a: ['Ren es torpe y bueno. La semana pasada desportilló un plato y le reñí fuerte. Le dije que a la próxima se volvía a su pueblo. Quizá me pasé.'] },
					],
					present: {
						poliza: { a: ['La subí porque Don Haruki se llevó el cuenco dos días a su tienda para tasarlo y volvió diciendo que valía el doble. ¿Qué iba a hacer? ¿Dejarlo sin cubrir?'], gives: ['consejo'] },
						aipom: { a: ['Ese mono de Ren entra cada tarde a por caquis. Anoche entró durante la cena, a las ocho. Lo vi irse con la fruta en la cola.'] },
						ficha: { a: ['Negro y rugoso como la corteza de un pino. Así era. Lo he tenido en las manos cincuenta años.', { who: Q, t: 'Cincuenta años. Y no notó nada raro en las últimas semanas.' }] },
						pedazos: { a: ['No me los enseñe más, por favor. Ya los he visto.'] },
					},
					presentDefault: ['Mis ojos ya no son lo que eran, joven. Dígamelo usted.'] },
				ren: { npc: 'det_ren', role: 'El aprendiz. Sirvió la ceremonia y recogió.',
					questions: [
						{ id: 'anoche', q: '¿Quién guardó el cuenco?', a: ['Don Haruki. Dijo que una pieza así no la tocaba un aprendiz. Lo envolvió él, de espaldas, y lo metió en la caja. Yo solo até el cordón.'], gives: ['guardo'] },
						{ id: 'bronca', q: '¿Tenías miedo de que te echaran?', a: ['Sí. Mucho. Pero yo no lo he roto. Si lo hubiera roto, lo diría. Ya rompí un plato y lo dije.'] },
						{ id: 'pesado', q: '¿Notaste algo raro al servir?', a: ['Pesaba poco. Pensé que era cosa mía, que me temblaban las manos. Doña Sumire siempre dice que pesa «como una piedra de río».', { who: Q, t: 'Pesaba poco. Apuntado con letra grande.' }] },
					],
					present: {
						aipom: { a: ['¡Es Momo, mi Aipom! Entró a las ocho, durante la cena, y se llevó un caqui. Doña Sumire lo vio. A las nueve y media, cuando guardamos el cuenco, ya estaba durmiendo en mi cuarto.'], gives: ['aipom_hora'] },
						peso: { a: ['¿Doscientos noventa? Pues por eso pesaba poco… ¿no?'] },
					},
					presentDefault: ['P-perdone, no sé qué tengo que ver. Lo siento. Perdone.'] },
				haruki: { npc: 'det_haruki', role: 'Tasador de antigüedades. Invitado de la ceremonia.',
					questions: [
						{ id: 'tasacion', q: '¿Cuándo tasó el cuenco?', a: ['Hace dos semanas y media. Me lo llevé dos días a la tienda, con su permiso, claro. Una pieza magnífica. Le aconsejé subir el seguro. Es mi deber.'] },
						{ id: 'anoche', q: '¿Cómo estaba el cuenco al guardarlo?', a: ['Entero. Perfecto. Lo envolví en su seda con estas manos. Si se rompió, fue después. Quizá el chico, o ese mono…'] },
						{ id: 'negocio', q: '¿Qué tal va su tienda?', a: ['Floja. Las antigüedades ya no se llevan. La gente quiere cosas nuevas que parezcan viejas. —Se ríe solo.'] },
					],
					present: {
						ficha: { a: ['Ese papel es antiguo y está mal. Yo tuve el cuenco dos días: el interior era blanco, liso, perfecto. Barro blanco de primera. No me enseñe a mí lo que es barro.'], gives: ['descripcion'] },
						peso: { a: ['Las básculas de cocina mienten. Las de té, más.', { who: Q, t: 'Las básculas no mienten. No saben.' }] },
						guardo: { a: ['Por respeto a la pieza. ¿Ahora es un delito tener respeto?'] },
						revision: { a: ['¿Un perito? Ah, sí, lo mencionó. No le di importancia. —Se ajusta las gafas dos veces.'] },
					},
					presentDefault: ['Interesante. Inútil, pero interesante.'] },
			},
			culprit: 'haruki', proof: ['encargo'],
			objection: {
				culpable: ['Eh, eh. Despacio. Con eso no se acusa a nadie. Esa persona tiene explicación. Pregúntate otra cosa: ¿los pedazos son de verdad Luna de Invierno?'],
				prueba: ['La persona, quizá. La pista, no basta. Hace falta algo que diga cuándo y cómo salió el cuenco de verdad de esta casa.'],
			},
			hurry: 'Nos quedan sitios y preguntas. En una casa de té las cosas se hacen despacio. Esto también.',
			again: 'Aquí ya hemos mirado. Mirar dos veces el mismo tatami no lo cambia.',
			solution: [
				{ who: Q, t: 'Los pedazos son blancos y lisos y pesan doscientos noventa gramos. Luna de Invierno era negra, rugosa, de trescientos ochenta. Lo que se rompió no era el cuenco.' },
				{ who: Q, t: 'El cuenco salió de esta casa una sola vez: dos días en la tienda de Don Haruki. Y él describe el que tasó como los pedazos. Volvió una copia.' },
				{ who: Q, t: 'Una cosita nada más: la copia la encargó tres semanas atrás, antes de llevarse el cuenco. Lo traía pensado.' },
				{ who: Q, t: 'Luego le dijo a la dueña que subiera el seguro. Y cuando supo que venía un perito a mirarlo de cerca, se ofreció a guardarlo. Y lo partió.' },
				{ who: 'det_haruki', t: 'Lo vendí a un coleccionista de fuera. Pagaba bien. La copia era buena… lo bastante para una anciana. No para una báscula de cocina.' },
				{ who: 'det_sumire', t: 'Entonces mi Luna está entera. En algún sitio. Eso es lo único que quería oír.' },
			],
			escape: [
				{ who: null, t: 'Cuando volvéis al recibidor, el maletín ya no está. Ni los zapatos de Don Haruki.' },
				{ who: Q, t: 'Se ha ido. Lo apunto. Un tasador sin tienda dura poco. Y el cuenco de verdad, algún día, aparecerá en una subasta.' },
			],
			prize: [{ id: 'goldbottlecap', n: 1 }] },

		// -------------------------------------------------------------
		// Caso 3 · Azafrán · difícil
		// -------------------------------------------------------------
		det_c3: { name: 'El caso del reloj parado', loc: 'azafran', partner: Q, rep: 15,
			brief: 'Esta madrugada la **caja fuerte** de la relojería apareció abierta **con su combinación** y sin el reloj de bolsillo de Don Anselmo. Un reloj de pared de la tienda está **parado a las 23:47**. La puerta lateral, abierta.',
			clues: {
				reloj: { name: 'Reloj parado a las 23:47', icon: '🕰️', text: 'Entre cien relojes en marcha, uno de pared, junto a la caja fuerte, está **parado a las 23:47**. Todo el mundo da por hecho que el robo fue a esa hora.', partner: 'En una relojería, un reloj parado es una firma. Falta saber si es la del ladrón o una falsificada.' },
				cuerda: { name: 'Con cuerda de sobra', icon: '⚙️', text: 'Nerea le dio cuerda a ese reloj ayer a las 19:00 y dura **ocho días**. No se paró solo: alguien sujetó el péndulo y movió las agujas.', partner: 'Un reloj con cuerda no se para. Lo paran.' },
				rondas: { name: 'Libro de rondas', icon: '📒', text: 'Ronda de las **0:00**: todo cerrado. Ronda de la **1:00**: todo cerrado. Ronda de las **2:00**: puerta lateral abierta, caja fuerte vacía.', partner: 'Entre la una y las dos. Si el vigilante dice la verdad. Me lo apunto con su firma.' },
				pestillo: { name: 'Cartón en el pestillo', icon: '📰', text: 'En el pestillo de la puerta lateral, un cartón doblado: la puerta no llegó a cerrar. Es un **horario del Magnetotrén** con la salida de las **23:30 de Trigal a Azafrán** subrayada.', partner: 'Alguien dejó la puerta preparada. Y alguien estaba mirando trenes.' },
				resguardo: { name: 'Billete junto a la caja', icon: '🎫', text: 'Bajo la caja fuerte, un billete usado del Magnetotrén: **Trigal → Azafrán, 23:30, de anoche**. Llegada 23:58. Picado con el **abono nº 0417**.', partner: 'Alguien vino de Trigal anoche y estuvo arrodillado aquí. Ahora, ¿quién viaja con el 0417?' },
				salida: { name: 'El último en salir', icon: '🚪', text: 'Ayer, al cerrar a las 20:00, **Octavio Lerma** fue el último en salir, por la puerta lateral. Dijo: «Ya cierro yo».', partner: 'Muy amable. La amabilidad también se apunta.' },
				codigo: { name: 'La combinación, en voz alta', icon: '🔢', text: 'Don Anselmo ve mal y dice la combinación **en voz alta** cada mañana al abrir la caja fuerte. Quien esté en la tienda a las diez la oye.', partner: 'Una caja fuerte que canta. A ver quién venía a las diez.' },
				hotel: { name: 'La coartada de Octavio', icon: '🏨', text: 'Octavio enseña un recibo: entró en un hotel de **Trigal a las 22:40**. Dice que a las 23:47 estaba allí, dormido.', partner: 'Le enseñas una hora y ya traía el papel para esa hora en el bolsillo. Qué previsor.' },
				ida: { name: 'El billete de ida de Octavio', icon: '🎟️', text: 'Octavio fue a Trigal en el Magnetotrén de las **22:05**. Su billete de ida está picado con su abono: el **nº 0417**.', partner: 'Viaja con abono. Mucha gente viaja con abono. Lo apunto con el número.' },
				abono: { name: 'El abono 0417', icon: '📌', text: 'El billete de vuelta hallado **bajo la caja fuerte** es del abono **0417**, el de Octavio. Volvió a Azafrán a las 23:58 de anoche.', partner: 'Eso no cuadra con «estaba dormido en Trigal». Nada.' },
				vista: { name: 'Nerea, de noche', icon: '👀', text: 'El vigilante vio a **Nerea** junto a la relojería a las **23:00**, mirando el escaparate.', partner: 'La sobrina, que sabe la combinación, a una hora de las 23:47. Esto pinta mal para ella. Demasiado bien pintado.' },
				karaoke: { name: 'La noche de Nerea', icon: '🎤', text: 'Nerea volvió a las 23:00 a por el cargador del móvil y se fue a un karaoke con amigos de **23:30 a 3:00**. Hay fotos con hora y un ticket.', partner: 'De la una a las dos estaba cantando. Mal, dice ella. Pero cantando.' },
			},
			places: [
				{ id: 'tienda', label: 'La tienda', sub: 'Cien relojes hablando a la vez', icon: '🕰️', text: ['Tic, tac, tic, tac, en cien voces distintas. Lupa gira la cabeza de golpe hacia una pared: el único reloj que no dice nada.'], gives: ['reloj'] },
				{ id: 'mesa', label: 'La mesa de Don Anselmo', sub: 'Lupas, pinzas y un anciano triste', icon: '🔧', text: ['Don Anselmo, con una lupa de relojero en el ojo bueno, os cuenta que nunca apunta la combinación. «La digo en voz alta para no olvidarla. A mi edad, lo que no se dice se va.»'], gives: ['codigo'] },
				{ id: 'garita', label: 'La garita del vigilante', sub: 'Un termo, un libro y una silla vacía', icon: '📒', text: ['La garita del edificio huele a café recalentado. Sobre la mesita, el libro de rondas, con la letra cada vez más torcida según avanza la noche.'], gives: ['rondas'] },
				{ id: 'lateral', label: 'La puerta lateral', sub: 'Da al callejón de servicio', icon: '🚪', text: ['Una puerta de hierro que da al callejón. No está forzada. Quintana pasa el dedo por el pestillo y saca algo doblado muy pequeño.'], gives: ['pestillo'] },
				{ id: 'caja', label: 'La caja fuerte, de cerca', sub: 'Abierta y vacía', icon: '🔐', needs: ['cuerda'], text: ['Ahora que sabéis que la hora del reloj es mentira, miráis el suelo de otra manera. Quintana se agacha con un quejido. Bajo el zócalo de la caja hay un papelito.'], gives: ['resguardo'] },
			],
			suspects: {
				nerea: { npc: 'det_nerea', role: 'La sobrina y aprendiz. Sabe la combinación.',
					questions: [
						{ id: 'cierre', q: '¿Quién cerró ayer?', a: ['Cerramos a las ocho. Don Octavio se quedó hasta el final dándole la lata a mi tío con el reloj. Salió por la lateral y dijo «ya cierro yo». Mi tío le dio las gracias.'], gives: ['salida'] },
						{ id: 'reloj', q: '¿Ese reloj parado es normal?', needs: ['reloj'], a: ['¿Parado? Imposible. Le di cuerda yo ayer a las siete. Es de ocho días. Si está parado, alguien lo ha parado. Y ha movido las agujas: ayer iba en hora.'], gives: ['cuerda'] },
						{ id: 'herencia', q: '¿El reloj de bolsillo te tocaría a ti?', a: ['Algún día. Y no lo quiero en una caja. Quiero abrir mi propio taller, y mi tío no me suelta. Lo sé: suena fatal.', { who: Q, t: 'Suena a motivo. Lo dice ella sola. Se apunta igual.' }] },
					],
					present: {
						vista: { a: ['¡Volví a por el cargador del móvil! Lo dejé en el taller. Luego me fui al karaoke con mis amigos, de once y media a las tres. Mire, las fotos tienen la hora. Y el ticket.'], gives: ['karaoke'] },
						codigo: { a: ['Sí, la sé. Todos la sabemos. Mi tío la canta como un villancico. Don Octavio venía cada mañana a las diez a ver el reloj. Cada mañana.'] },
						resguardo: { a: ['¿El 0417? Yo voy andando a todas partes. No tengo ni abono.'] },
					},
					presentDefault: ['No sé qué quiere que diga. Pregúnteme por relojes, de eso sí sé.'] },
				fermin: { npc: 'det_fermin', role: 'El vigilante nocturno del edificio.',
					questions: [
						{ id: 'rondas', q: '¿Cómo fue la noche?', a: ['Tranquila. Ronda cada hora, como dice el libro. A las dos vi la lateral abierta y la caja fuerte vacía. Llamé a la policía y a Don Anselmo, por ese orden.'] },
						{ id: 'noche', q: '¿Viste a alguien?', a: ['A la sobrina, a las once. Pegada al escaparate. Luego se fue con prisa. No digo nada. Solo digo lo que vi.'], gives: ['vista'] },
						{ id: 'deudas', q: '¿Te va bien el trabajo?', a: ['Me pagan poco y tarde. Tengo deudas, como medio Azafrán. Pero yo no sé la combinación. Yo entro a las nueve de la noche y me voy a las siete.', { who: Q, t: 'A las diez de la mañana, durmiendo. Apuntado.' }] },
						{ id: 'growlithe', q: '¿Tu Growlithe no ladró?', a: ['Mi Growlithe estaba en el Centro Pokémon, con tos. Lo dejé a las nueve. Por eso hice yo solo todas las rondas, y con más cuidado que nunca.'] },
					],
					present: {
						reloj: { a: ['¿Las doce menos trece? A esa hora pasé yo por delante y todo estaba cerrado. Lo pone en el libro: a las doce, cerrado. A la una, cerrado.'] },
						resguardo: { a: ['Yo voy en bici. El Magnetotrén me sale caro hasta para mirarlo.'] },
						karaoke: { a: ['Pues si estaba cantando, no estaba aquí. Me alegro por la chica. De verdad.'] },
					},
					presentDefault: ['Eso yo no lo sé. Yo sé de puertas cerradas y de café malo.'] },
				octavio: { npc: 'det_octavio', role: 'Coleccionista. Quería comprar el reloj.',
					questions: [
						{ id: 'oferta', q: '¿Quería usted comprar el reloj?', a: ['Le ofrecí a Don Anselmo una fortuna. Tres veces. Tres veces dijo que no. Es una pieza que debería estar en una vitrina digna, no en una caja con olor a aceite.'] },
						{ id: 'viaje', q: '¿Dónde estuvo anoche?', a: ['En Trigal. Tomé el Magnetotrén de las diez y cinco; hay una subasta de relojes esta mañana. Aquí tiene mi billete de ida. Viajo con abono, ¿sabe? El 0417.'], gives: ['ida'] },
						{ id: 'manana', q: '¿Venía mucho por la tienda?', a: ['Cada mañana a las diez, a ver el reloj salir de la caja. Uno se enamora de las cosas. ¿No le pasa?'] },
					],
					present: {
						reloj: { a: ['¿Las 23:47? A esa hora yo estaba en un hotel de Trigal, dormido. Entré a las diez y cuarenta. Aquí tiene el recibo; lo llevo encima, qué casualidad.'], gives: ['hotel'] },
						resguardo: { a: ['Eso… eso es mi abono, sí. Lo habré perdido otro día. —Mira el sello de la fecha. No dice nada más.', { who: Q, t: 'El sello es de anoche. Y estaba debajo de la caja fuerte.' }], gives: ['abono'] },
						pestillo: { a: ['Cerré esa puerta, se lo aseguro. Quizá se quedó mal encajada. Es una puerta vieja.'] },
						rondas: { a: ['Las rondas de un vigilante. Qué fiable. Seguro que dormía.'] },
					},
					presentDefault: ['No veo qué relación tiene eso conmigo, la verdad.'] },
			},
			culprit: 'octavio', proof: ['abono'],
			objection: {
				culpable: ['Eh, eh. Despacio. Con eso no se acusa a nadie. Esa persona tiene una explicación que se sostiene. Antes de mirar a quién, mira a qué hora pasó de verdad.'],
				prueba: ['A esa persona la miro igual que tú. Pero esa pista no la pone delante de la caja fuerte. Necesito algo que la ponga ahí, anoche.'],
			},
			hurry: 'Aún hay cosas sin mirar. Aquí hay cien relojes y ninguno tiene prisa. Nosotros tampoco.',
			again: 'Aquí ya hemos mirado. Este sitio ya nos ha dicho lo que sabe.',
			solution: [
				{ who: Q, t: 'El reloj dice 23:47. Pero tenía cuerda para ocho días: lo pararon a mano. Y las rondas dicen que a la una todo estaba cerrado. El robo fue entre la una y las dos.' },
				{ who: Q, t: '¿A quién le conviene una hora falsa? Al que tiene coartada justo a esa hora. Octavio, en un hotel de Trigal desde las diez y cuarenta. Con el recibo en el bolsillo.' },
				{ who: Q, t: 'Una cosita nada más: el billete de vuelta de las 23:30, el de debajo de la caja fuerte, es de su abono, el 0417. Volvió a Azafrán a las doce menos dos.' },
				{ who: Q, t: 'La puerta lateral la dejó él sin cerrar, con un horario en el pestillo. La combinación la oía cada mañana a las diez. Y paró el reloj para dormir en Trigal sobre el papel.' },
				{ who: 'det_octavio', t: 'Tres veces le ofrecí comprarlo. Tres. Un reloj así no puede pasar la vida a oscuras. Lo tengo en mi casa, en una vitrina. Envuelto en terciopelo. Lo he tratado mejor que él.' },
				{ who: 'det_nerea', t: 'Mi tío lo sacaba cada mañana para que le diera la luz. No estaba a oscuras. Estaba en casa.' },
				{ who: Q, t: 'La sobrina tenía la combinación y el vigilante, la noche. Él tenía las dos cosas que no se ven: la hora y el tren.' },
			],
			escape: [
				{ who: null, t: 'Cuando volvéis a buscarlo, Octavio ya no está en la tienda. Por el ventanal se ve el Magnetotrén salir de la estación, puntual.' },
				{ who: Q, t: 'Se ha ido en el de las doce. Lo apunto. Un coleccionista acaba siempre enseñando lo que tiene. Y ese día estaré mirando.' },
			],
			prize: [{ id: 'abilitypatch', n: 1 }] },
	},

	// =====================================================================
	// PARCHES: el sitio del caso en cada ciudad
	// =====================================================================
	patches: {
		luminalia: { spots: [
			{ label: 'Pâtisserie Mirabelle', sub: 'Un señor con gabardina mira una ventana rota', icon: '🕵️', cond: 'flag.det_c1_carta && !done.det_c1', new: '!flag.det_c1_visto', talk: [
				{ cond: '!flag.det_c1_visto', script: 'det_c1_intro' },
				{ script: 'det_c1_seguir' },
			] },
		] },
		iris: { spots: [
			{ label: 'Casa de té Hojarasca', sub: 'Un Noctowl vigila desde el tejado', icon: '🕵️', cond: 'flag.det_c2_carta && !done.det_c2', new: '!flag.det_c2_visto', talk: [
				{ cond: '!flag.det_c2_visto', script: 'det_c2_intro' },
				{ script: 'det_c2_seguir' },
			] },
		] },
		azafran: { spots: [
			{ label: 'Relojería El Segundero', sub: 'Cien relojes y una caja fuerte abierta', icon: '🕵️', cond: 'flag.det_c3_carta && !done.det_c3', new: '!flag.det_c3_visto', talk: [
				{ cond: '!flag.det_c3_visto', script: 'det_c3_intro' },
				{ script: 'det_c3_seguir' },
			] },
		] },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ---- Cartas (se pueden abrir varias veces) ----
		det_c1_carta: [
			{ if: '!flag.det_c1_carta', then: [
				{ text: 'Con la carta venía una tarjeta de visita con una esquina doblada: «M. Quintana · Perito de siniestros». Por detrás, a boli: «Pâtisserie Mirabelle, Luminalia».' },
				{ set: { 'flag.det_c1_carta': true } },
				{ quest: 'det_c1', stage: 'ir' },
			], else: [
				{ text: 'La carta de Quintana. La P. D. de Héctor ocupa casi tanto como la carta entera.' },
			] },
		],
		det_c2_carta: [
			{ if: '!flag.det_c2_carta', then: [
				{ if: 'flag.det_c1_ok', then: [{ text: 'Al final de la hoja, en el margen: «Lo de la pastelería: Solène ha vuelto a hacer cruasanes. Me mandó una caja. Me comí tres. Gracias».' }] },
				{ if: 'flag.det_c1_escapo', then: [{ text: 'Al final de la hoja, en el margen: «Lo de la pastelería sigue en mi libreta. No te preocupes: las libretas no se cansan».' }] },
				{ set: { 'flag.det_c2_carta': true } },
				{ quest: 'det_c2', stage: 'ir' },
			], else: [
				{ text: 'La segunda carta de Quintana. La pipa de girasol sigue en el pliegue. No te atreves a quitarla.' },
			] },
		],
		det_c3_carta: [
			{ if: '!flag.det_c3_carta', then: [
				{ if: 'flag.det_c2_ok', then: [{ text: 'En el margen: «Doña Sumire me ha escrito. Dice que la copia rota la ha pegado con laca de oro, y que ahora le gusta más. Yo no entiendo de cuencos. Ella sí».' }] },
				{ if: 'flag.det_c2_escapo', then: [{ text: 'En el margen: «Lo de Iris sigue abierto en mi libreta. Algún día un cuenco negro saldrá en un catálogo. Yo lo estaré leyendo».' }] },
				{ set: { 'flag.det_c3_carta': true } },
				{ quest: 'det_c3', stage: 'ir' },
			], else: [
				{ text: 'La tercera carta de Quintana. El horario del Magnetotrén tiene tantos subrayados que parece un mapa.' },
			] },
		],

		// ---- Caso 1 · Luminalia ----
		det_c1_intro: [
			{ cutscene: { bg: { type: 'city' }, time: 'manana', start: 'fade', frames: [
				{ big: true, text: 'Pâtisserie Mirabelle', sub: 'Ciudad Luminalia', hold: 2400, cam: 'still' },
				{ cam: 'pull', text: 'Una calle estrecha a la sombra de la Torre Prisma. Huele a mantequilla y a cristal roto. Hay un cordón de cinta delante de una ventana pequeña.' },
				{ actors: [{ id: Q, at: 'right', enter: 'right' }], cam: 'push', text: 'Un hombre con gabardina color arena está agachado en la acera, contando algo con el dedo. No levanta la vista.' },
				{ actors: [{ mon: 'noctowl', key: 'lupa', at: 0.5, size: 's', enter: 'drop' }], text: 'Un Noctowl baja del canalón y se le posa en el hombro. Gira la cabeza hacia ti. Del todo. Y se queda mirándote.' },
				{ actors: [{ key: Q, do: 'turn', emote: '...' }], say: Q, text: 'Tú debes de ser {jugador}. Héctor te describió con más músculos. Y con capa.' },
			] } },
			{ say: Q, text: 'Mauro Quintana. Perito. Ella es Lupa. Mira lo que yo no miro. Yo miro lo que ella no entiende. Nos va bien.' },
			{ say: Q, text: 'Héctor me ha mandado once vídeos esta semana. En nueve sale saltando. En los otros dos sale hablando de ti. Por eso estás aquí.' },
			{ say: 'jugador', text: '¿Y qué pasó?' },
			{ say: Q, text: 'La recaudación del fin de semana. Una lata. Estaba en el cajón del despacho el domingo a las nueve. El lunes a las seis, no.' },
			{ say: Q, text: 'Tres personas: la dueña, Solène; el repostero, Florián; la camarera, Amandine. Las tres tienen motivo. Eso no es raro: casi todo el mundo tiene motivo para casi todo.' },
			{ say: Q, text: 'Tú registras, preguntas y apuntas. Cuando lo tengas, acusas. Con una pista que lo demuestre. Sin pista, no se acusa a nadie. ¿Trato?' },
			{ set: { 'flag.det_c1_visto': true } },
			{ quest: 'det_c1', stage: 'investigar' },
			{ call: 'det_c1_seguir' },
		],
		det_c1_seguir: seguir('det_c1', [
			{ say: Q, text: 'Bien. Muy bien. Sin gritar y sin adivinar. Así se hace.' },
			{ say: Q, text: 'Héctor va a querer un vídeo de esto. No se lo vamos a dar.' },
			{ text: 'Solène os pone dos cafés y una caja de macarons «para el camino». Quintana se come uno de pie, con la libreta debajo del brazo.' },
		], [
			{ say: Q, text: 'Pasa. A mí se me han escapado muchos. Este va a la libreta, con fecha.' },
			{ say: Q, text: 'Lo importante es que no acusamos a quien no era. Eso es lo que no se arregla.' },
		]),

		// ---- Caso 2 · Iris ----
		det_c2_intro: [
			{ text: 'La Casa de té Hojarasca está en una callejuela de Iris, entre farolillos apagados. En el tejado, Lupa duerme con un ojo abierto.' },
			{ say: Q, text: '{jugador}. Viniste. Bien. Aquí hay que descalzarse. Yo llevo calcetines distintos, no mires.' },
			{ say: Q, text: 'El cuenco se llama Luna de Invierno. Doscientos años. El domingo hubo ceremonia y el lunes al amanecer estaba roto dentro de su caja, con el cordón atado.' },
			{ say: Q, text: 'Doña Sumire, la dueña, dobló el seguro hace dos semanas. Ren, su aprendiz, tiene miedo de que lo echen. Y Don Haruki, un tasador, fue el invitado.' },
			{ say: Q, text: 'Yo tenía que venir el jueves a mirarlo de cerca. Se rompió el lunes. Lo dejo dicho y no digo nada más.' },
			{ text: 'Lupa abre el otro ojo y mira hacia la ventana del jardín. Luego hacia la cocina. Luego hacia ti.' },
			{ set: { 'flag.det_c2_visto': true } },
			{ quest: 'det_c2', stage: 'investigar' },
			{ call: 'det_c2_seguir' },
		],
		det_c2_seguir: seguir('det_c2', [
			{ say: Q, text: 'Una copia buena engaña a los ojos. A una báscula, no. Lo apunto para el próximo curso de peritos.' },
			{ text: 'Doña Sumire os sirve té en un cuenco cualquiera, blanco y desportillado. Dice que sabe igual. Luego dice que no, que sabe mejor.' },
		], [
			{ say: Q, text: 'Se nos fue. Pasa. El cuenco de verdad sigue en algún sitio. Las cosas bonitas no se esconden mucho tiempo.' },
			{ say: Q, text: 'Lo apunto. Y me tomo el té, que se enfría.' },
		]),

		// ---- Caso 3 · Azafrán ----
		det_c3_intro: [
			{ text: 'La Relojería El Segundero ocupa un bajo en una calle de oficinas de Azafrán. Dentro, cien relojes hacen tic-tac a la vez, y no hay dos que suenen igual.' },
			{ say: Q, text: '{jugador}. Escucha. Cien relojes. Noventa y nueve en marcha. Este es de los que me gustan.' },
			{ say: Q, text: 'El reloj de bolsillo de Don Anselmo dormía en la caja fuerte. Esta madrugada la caja estaba abierta, con su combinación, y vacía. Sin un arañazo.' },
			{ say: Q, text: 'Nerea, la sobrina, sabe la combinación. Fermín, el vigilante, pasó la noche aquí. Y Octavio Lerma, un coleccionista, quería ese reloj. Dice que dormía en Trigal.' },
			{ say: Q, text: 'Todo el mundo me enseña el reloj parado. Cuando todo el mundo te enseña lo mismo, mira lo otro. Es lo único que sé hacer bien.' },
			{ text: 'Don Anselmo, al fondo, limpia una lupa que ya está limpia. Lupa, la de verdad, se posa en la vitrina y no le quita ojo a la pared.' },
			{ set: { 'flag.det_c3_visto': true } },
			{ quest: 'det_c3', stage: 'investigar' },
			{ call: 'det_c3_seguir' },
		],
		det_c3_seguir: seguir('det_c3', [
			{ say: Q, text: 'Una hora falsa, un tren de verdad. Ha sido un placer, {jugador}. De los que no me dejan dormir, pero de los buenos.' },
			{ text: 'Don Anselmo abre la caja del reloj recuperado y lo pone al sol del escaparate. Esta vez no dice la combinación en voz alta. La dice Nerea, bajito, para que él la oiga.' },
			{ say: Q, text: 'Le voy a decir a Héctor que no hacen falta capas. Ya lo sabe. Pero se lo voy a decir.' },
		], [
			{ say: Q, text: 'Se nos fue en el Magnetotrén. Pasa. Lo apunto con la hora, que aquí sobran relojes para comprobarla.' },
			{ say: Q, text: 'No acusamos a la sobrina ni al vigilante. Eso cuenta más de lo que parece.' },
		]),
	},
};
