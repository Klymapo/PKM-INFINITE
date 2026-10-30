// Encargos de conocidos (pedido de Mario, 2026-10-29: «encargos de conocidos»). Motor: app/js/correo.js; formato: docs/CONTENIDO.md §15.
// Siete favores chicos que llegan por el Buzón, de personajes con nombre de regiones ya visitadas, y que se cumplen en su región.
// Cada carta es un objeto con `read`; su guion empieza la misión solo si no estaba empezada (reabrir la carta no reinicia nada).
// Los spots van en zonas ya visitadas (patches), con `new` y `cond` sobre la etapa: desaparecen al terminar.
//
//   enc_kurt     Kurt (Johto)        Azalea → Gimnasio de Iris (Morti) → Azalea
//   enc_li       Sabio Li (Johto)    tres tablillas: Ruta 32 (tramo 2), Patio de la Torre, Ruinas Alfa → Torre Bellsprout
//   enc_misty    Misty (Kanto)       Puente Pepita (Ruta 24, tramo 3) → Gimnasio de Celeste (+ combate amistoso opcional)
//   enc_dolores  Dolores (Kanto)     sótano de la Torre Radio de Lavanda (cerradura) → Lavanda. Cierra el muñeco prometido en el B4
//   enc_lila     Lila (Kalos)        Torre Maestra (Yantra). Afinidad
//   enc_kiawe    Kiawe (Alola)       Rancho Ohana (Kalena) → Colina Saltagua (Nereida) y Joyería de Mayla → Área del Wela
//   enc_celia    Celia (Teselia)     Bosque Azulejo (tramo 2, cosecha) → Panadería de Chamota → Don Teodoro
//
// Flags nuevos: enc_li_1/2/3, enc_misty_psyduck, enc_lila_abajo, enc_kiawe_nereida, enc_kiawe_mayla.

const K = 'quest.enc_kurt', LI = 'quest.enc_li', MI = 'quest.enc_misty', DO = 'quest.enc_dolores';
const LA = 'quest.enc_lila', KI = 'quest.enc_kiawe', CE = 'quest.enc_celia';
const LI_TRES = 'flag.enc_li_1 && flag.enc_li_2 && flag.enc_li_3';
const KI_DOS = 'flag.enc_kiawe_nereida && flag.enc_kiawe_mayla';
const LUC = 'inParty("lucario") || inParty("riolu")';
// Kalena solo dice su nombre en «Lo que no crece» (b05_s_terron); si no se lo dijo, es «la capataza»
const KALENA_CONOCIDA = '!!quest.b05_s_terron';

export default {
	// =====================================================================
	// BUZÓN
	// =====================================================================
	mail: [
		{ id: 'enc_kurt', kind: 'encargo', from: 'Kurt', npc: 'kurt', title: 'Un paquete para Iris', cond: 'flag.b03_fin && flag.b02_kurt_gracias && beat("morti_g5")', days: 2, item: 'cartaenckurt', script: 'enc_kurt_carta' },
		{ id: 'enc_li', kind: 'encargo', from: 'Sabio Li', npc: 'li', title: 'Lo que se llevó el viento', cond: 'flag.b03_fin && beat("sabio_li")', days: 3, item: 'cartaencli', script: 'enc_li_carta' },
		{ id: 'enc_misty', kind: 'encargo', from: 'Misty', npc: 'misty', title: '¡Urgente! (más o menos)', cond: 'flag.b04_fin && beat("misty_g8")', days: 2, item: 'cartaencmisty', script: 'enc_misty_carta' },
		{ id: 'enc_dolores', kind: 'encargo', from: 'Dolores', npc: 'p7_dolores', title: 'Un brazo', cond: 'flag.b04_fin && flag.p7_dolores_1', days: 3, item: 'cartaencdolores', script: 'enc_dolores_carta' },
		{ id: 'enc_lila', kind: 'encargo', from: 'Lila', npc: 'lila', title: 'E-esto… un favor pequeño', cond: 'flag.b04_fin && done.b01_t_lila', days: 2, item: 'cartaenclila', script: 'enc_lila_carta' },
		{ id: 'enc_kiawe', kind: 'encargo', from: 'Kiawe', npc: 'kiawe', title: 'Reparto', cond: 'flag.b05_fin && flag.b05_kiawe_hecha && flag.b05_nereida_hecha && flag.b05_mayla_conocida && visited("rancho_ohana")', days: 3, item: 'cartaenckiawe', script: 'enc_kiawe_carta' },
		{ id: 'enc_celia', kind: 'encargo', from: 'Celia', npc: 'celia', title: 'Miel para un horno', cond: 'flag.b06_fin && flag.b06_testigo_celia && flag.b06_testigo_teodoro', days: 2, item: 'cartaencelia', script: 'enc_celia_carta' },
	],

	// =====================================================================
	// MISIONES
	// =====================================================================
	quests: {
		enc_kurt: { name: 'Un paquete para Iris', type: 'side', est: 20, stages: {
			iris: 'Kurt ha tallado algo para **Morti**. Llévale la caja al **Gimnasio de Iris**.',
			azalea: 'Morti te ha dado una respuesta para Kurt. Vuelve a la **casa de Kurt**, en **Pueblo Azalea**.',
			hecha: 'Kurt ya tiene su respuesta. Gruñó, pero la tiene.',
		} },
		enc_li: { name: 'Lo que se llevó el viento', type: 'side', est: 25, stages: {
			buscar: 'El viento se llevó tres tablillas de la **Torre Bellsprout**. El **Sabio Li** cree que cayeron entre **Malva** y las **Ruinas Alfa**.',
			volver: 'Tienes las tres tablillas. Súbeselas al **Sabio Li**, arriba de la **Torre Bellsprout**.',
			hecha: 'Las tres tablillas vuelven a colgar en la torre.',
		},
		parts: { title: 'Las tres tablillas', items: [
			{ label: 'La de los juncos', where: 'ruta32', tramo: 2, done: 'flag.enc_li_1', hint: 'Junto a la charca de los Wooper de la **Ruta 32**. El agua no se la ha llevado: los juncos la sujetan.' },
			{ label: 'La de la rama', where: 'patio_bellsprout', done: 'flag.enc_li_2', hint: 'No llegó lejos: en el **Patio de la Torre**, en Malva, colgada de algo alto.' },
			{ label: 'La de las piedras', where: 'ruinas_alfa', done: 'flag.enc_li_3', hint: 'La que más voló. En las **Ruinas Alfa**, junto a las vallas.' },
		] } },
		enc_misty: { name: '¡Urgente! (más o menos)', type: 'side', est: 20, stages: {
			puente: 'Misty dejó la bici en el **Puente Pepita** (**Ruta 24**), junto a la farola de las fotos. Tráesela.',
			celeste: 'Ya tienes la bici. Llévasela a **Misty** al **Gimnasio de Celeste**.',
			hecha: 'La bici está en su sitio. Por ahora.',
		} },
		enc_dolores: { name: 'Un brazo', type: 'side', est: 20, stages: {
			torre: 'A Dolores le falta el brazo de un muñeco, y Remiendo sabe dónde está. Busca en el **sótano de la Torre Radio de Lavanda**.',
			lavanda: 'Tienes el brazo. Llévaselo a **Dolores**, en su banco frente al cementerio pequeño de **Lavanda**.',
			hecha: 'El muñeco ya tiene sus dos brazos. Y dueño.',
		} },
		enc_lila: { name: 'E-esto… un favor pequeño', type: 'side', est: 15, stages: {
			yantra: 'Una aprendiz de la **Torre Maestra** no consigue encender el pebetero. **Lila** te pide que vayas a **Yantra**. No a ayudarla: a estar.',
			hecha: 'En la Torre Maestra hay una llama más.',
		} },
		enc_kiawe: { name: 'Reparto', type: 'side', est: 30, stages: {
			rancho: 'Kiawe no puede repartir hoy. Recoge las botellas de leche en el **Rancho Ohana**, en **Pueblo Ohana**.',
			reparto: 'Lleva una caja de leche a **Nereida** (**Colina Saltagua**) y otra a **Mayla** (su joyería de **Konikoni**).',
			wela: 'Reparto hecho. Díselo a **Kiawe**, en el **Área Volcánica del Wela**.',
			hecha: 'Toda la leche llegó fría. Kiawe dice que eso es lo difícil.',
		},
		parts: { title: 'Las dos entregas', items: [
			{ label: 'Nereida', where: 'colina_saltagua', done: 'flag.enc_kiawe_nereida', hint: 'En la **Colina Saltagua**, con el brazo metido en el agua. Como siempre.' },
			{ label: 'Mayla', where: 'joyeria_mayla', done: 'flag.enc_kiawe_mayla', hint: 'En su **joyería de Konikoni**. Que no se te ocurra decirle que la caja está mal cortada.' },
		] } },
		enc_celia: { name: 'Miel para un horno', type: 'side', est: 25, stages: {
			miel: 'Celia necesita un panal del **Bosque Azulejo**. Hay uno en una rama baja, junto a la charca azul (tramo 2).',
			horno: 'Tienes el panal. Llévaselo a **Celia**, a la **panadería de Chamota**.',
			teodoro: 'La torta está hecha. Llévasela a **Don Teodoro**, en la plaza de **Chamota**.',
			hecha: 'Don Teodoro tuvo su torta. Y la puso por escrito.',
		} },
	},

	// =====================================================================
	// OBJETOS (cartas y cosas del encargo)
	// =====================================================================
	items: {
		cartaenckurt: { name: 'Carta de Kurt', pocket: 'key', desc: 'Papel de envolver doblado en cuatro, con olor a barniz. Venía pegada con cinta a una caja de madera pequeña.',
			read: '*(Letra grande, apretada, con el lápiz clavado en el papel.)*\n\nTú:\n\nNo me gusta escribir. Me gusta tallar. Así que poco.\n\nEl chico de Iris, Morti, me encargó hace meses una Ball para un amigo suyo que «no está del todo aquí». No le pregunté. A Morti no se le pregunta: te contesta y luego te pasas una semana pensándolo.\n\nYa está hecha. Bonguri amarillo, del árbol de mi abuelo. La caja va con esta carta. No la abras. Respira, pero no la abras.\n\nYo no voy a Iris. Tengo la espalda como un Sudowoodo y el tren me marea. Tú andas siempre de un lado para otro, así que llévasela. Al **Gimnasio de Iris**. En mano.\n\nY tráeme lo que te diga. Si no te dice nada, tráeme eso.\n\n— Kurt\n\nP. D.: Si la abres, lo sabré.' },
		cajakurt: { name: 'Caja de Kurt', pocket: 'key', desc: 'Una caja de madera clara, del tamaño de una mano, cerrada con un cordel. Si la acercas al oído, juras que algo dentro respira despacio. Es para Morti.' },
		velamorti: { name: 'Cabo de vela de Morti', pocket: 'key', desc: 'Un cabo de vela blanca, gastado por un lado, envuelto en un pañuelo morado. Morti dice que Kurt sabrá qué significa.' },

		cartaencli: { name: 'Carta del Sabio Li', pocket: 'key', desc: 'Papel de arroz, muy fino, doblado como un abanico. Huele a madera vieja y a lluvia.',
			read: '*(Pincel. Trazos lentos, sin una sola mancha.)*\n\nA quien subió la torre:\n\nHubo viento la semana pasada. Un viento de los que vienen del mar y no saben adónde van. La torre se movió, como debe. No cayó, como debe.\n\nPero se llevó tres tablillas.\n\nEn la torre colgamos tablillas de madera con los nombres de los Bellsprout que vivieron aquí. Algunas tienen cien años. El viento no las quiere: solo juega con ellas. Las suelta donde se cansa.\n\nMis aprendices las buscan deprisa. Por eso no las encuentran.\n\nTú te moviste con la torre. Busca como te moviste. Creo que no han ido lejos: hacia el sur de **Malva**, hacia las piedras viejas de las **Ruinas Alfa**.\n\nNo hay prisa. Los nombres esperan.\n\n— Li, de la **Torre Bellsprout**' },

		cartaencmisty: { name: 'Nota de Misty', pocket: 'key', desc: 'Una hoja de libreta arrancada con prisa, con un borde mojado. Escrita con rotulador azul que se ha corrido un poco.',
			read: '*(Rotulador azul. Letra grande, que se va torciendo hacia arriba.)*\n\n¡{jugador}!\n\nNo es nada grave. Bueno, sí. Bueno, no.\n\nMe han dado una bici nueva. Roja. Preciosa. La primera en años que me dura más de una semana. ¡No preguntes por las otras!\n\nEl caso: la dejé apoyada en el **Puente Pepita**, en la farola de las fotos (la tercera), para bajar un momento al río. Un momento. Y cuando subí, ¡había un **Psyduck** sentado encima! Sentado. Mirándome. Y no se quita.\n\nYo no puedo ir ahora, tengo clase de natación con los peques del gimnasio, y si me ven discutir con un Psyduck pierdo toda la autoridad.\n\nTú tienes paciencia. O eso dice Brock. ¿Me la traes al **Gimnasio de Celeste**? Te invito a algo. Y si quieres, a un combate. ¡Amistoso! Más o menos.\n\n— Misty\n\nP. D.: No le hagas daño al Psyduck. Tampoco le hagas caso. Las dos cosas a la vez.' },

		cartaencdolores: { name: 'Carta de Dolores', pocket: 'key', desc: 'Un sobre de tela, cosido por los bordes en vez de pegado. Dentro, una hoja con letra pequeña y redonda, y una hebra de hilo azul.',
			read: '*(Letra pequeña, redonda, muy ordenada. Una hebra de hilo azul cosida en la esquina.)*\n\nPara {el|la|le} de la Gira que pasó por Lavanda:\n\nTe escribo porque te debo un muñeco. Uno que empecé pensando en tu compañero azul, el del antifaz. Le faltaba un brazo. Ya no le falta: lo cosí la semana pasada.\n\nEl problema es que ya no está.\n\nRemiendo se lo ha llevado. No el muñeco: el brazo. Remiendo es así. Los muñecos que se cosen para otro le dan celos, y esconde una pieza para que no se terminen. Luego se le pasa. Pero no se acuerda de dónde la puso.\n\nBueno. Sí se acuerda. No me lo quiere decir a mí.\n\nSé que baja al **sótano de la Torre Radio**, a lo que queda de la vieja Torre. Ahí guarda sus cosas. Yo no bajo. Me duelen las rodillas y allí abajo hay gente que no me apetece saludar.\n\nSi lo encuentras, tráemelo al banco. Lo coso delante de ti y te lo llevas.\n\n— Dolores\n\nP. D.: El hilo de la esquina es del brazo. Remiendo lo sigue a todas partes. Tú, también.' },
		brazomuneco: { name: 'Brazo de trapo azul', pocket: 'key', desc: 'Un brazo de muñeco de fieltro azul, relleno y cosido con punto pequeño, con una manopla negra en la punta. Le cuelga una hebra de hilo. Es de Dolores.' },
		munecolucario: { name: 'Muñeco de trapo azul', pocket: 'key', desc: 'Un muñeco de fieltro azul con dos orejas largas, un antifaz negro bordado y dos brazos (uno con la puntada un poco más apretada). Lo cosió Dolores, en Lavanda, pensando en tu compañero. Remiendo lo miró mucho rato antes de dejarte ir.',
			read: '*(Una etiqueta de tela cosida en la espalda del muñeco, con letra pequeña y redonda.)*\n\nHecho en Lavanda, a mano.\nRelleno: lana y paciencia.\nBrazo izquierdo: encontrado.\n\nNo es para ninguna tumba. Es para alguien que sigue andando.\n\n— D. (y R., que no ayudó)' },

		cartaenclila: { name: 'Carta de Lila', pocket: 'key', desc: 'Un sobre crema con una cinta verde menta. La letra empieza pequeña y se va haciendo más grande y más segura a mitad de la hoja.',
			read: '*(Letra pequeña al principio, más firme al final. Hay una palabra tachada tres veces.)*\n\n{jugador}:\n\nE-esto… hola. Soy Lila. Ya lo sabes, porque pone «Lila» abajo. Perdona.\n\nTe escribo por un favor. Uno pequeño. Si no puedes, no pasa nada. De verdad.\n\nEn la **Torre Maestra** hay una aprendiz nueva. Tiene ocho años y un Flabébé que se le duerme en el pelo. Le toca la Prueba de la Llama. La del pebetero. La mía.\n\nY no se enciende. Pone las manos en el bronce, sabe que la miramos, y se le olvida respirar. Tres veces ya.\n\nYo la suspendí seis. Tú lo sabes.\n\nNo quiero que se la encienda nadie. Eso no. Pero me acordé de cuando viniste a acompañarme, aquella noche. De que no hacía falta que hicieras nada. De que estuvieras.\n\n¿Puedes venir a **Yantra**? Solo un rato. Solo a estar.\n\n— Lila\n\nP. D.: Sylveon dice hola. Bueno, no lo dice. Pero ha atado una cinta en el sobre, y eso es hola.' },

		cartaenckiawe: { name: 'Nota de Kiawe', pocket: 'key', desc: 'Una hoja de pedido de la granja de su familia, con el membrete medio quemado por una esquina. Por detrás, una nota escrita con trazo firme.',
			read: '*(Hoja de pedido. Por detrás, letra grande y recta, sin adornos.)*\n\nTú. Te escribo porque bailas mal pero llegas.\n\nCharizard está en el taller de Leilani. La silla ha explotado otra vez. La cuarta. Leilani dice que la quinta vuela seguro. La creo. Pero hoy no vuela nada.\n\nY hoy hay reparto.\n\nLa leche sale del **Rancho Ohana**. Hay dos cajas listas. Una es para **Nereida**, en la **Colina Saltagua**. La otra, para **Mayla**, en su joyería de **Konikoni**. Las dos la piden fría. Las dos se quejan si no llega fría.\n\nSi la llevas, ven al **Área del Wela** cuando acabes. Te pago. No con dinero solo.\n\nEl reparto tiene ritmo, como la danza. Recoges. Llevas. Vuelves. No te pares en medio.\n\n— Kiawe' },
		lechekiawe: { name: 'Caja de Leche Mu-mu', pocket: 'key', desc: 'Una caja de madera con seis botellas de Leche Mu-mu, envueltas en paja húmeda para que no se calienten. Es del reparto de Kiawe.' },

		cartaencelia: { name: 'Carta de Celia', pocket: 'key', desc: 'Una bolsa de papel de la panadería, abierta y alisada, con una mancha de harina con forma de pulgar. Por dentro, escrito a lápiz.',
			read: '*(Lápiz de carpintero, sobre papel de bolsa de pan. Una huella de harina en la esquina.)*\n\n¡Eh, detective!\n\nNo es un caso, tranquil{o|a|e}. Es una torta.\n\nDon Teodoro cumple años la semana que viene y no se lo ha dicho a nadie, que es su manera de decírselo a todo el pueblo. Le quiero hacer una torta de miel, como las de mi madre. Y la de mi madre llevaba miel del **Bosque Azulejo**. No de la tienda. Del bosque.\n\nYo no puedo ir: si dejo el horno, se me enfada. Tú andas por todas partes.\n\nHay un panal en una rama baja, junto a la charca azul, entrando desde **Mayólica**. Los Combee de allí no son malos, solo tienen mucho carácter. Como yo. Sacude con cariño.\n\nTráemelo a la **panadería de Chamota** y hacemos la torta. Y luego se la llevas tú, que a mí me da vergüenza.\n\n— Celia\n\nP. D.: Ven con hambre.' },
		panalazulejo: { name: 'Panal del Bosque Azulejo', pocket: 'key', desc: 'Un trozo de panal envuelto en una hoja grande, todavía tibio. Huele a flores azules y un poco a Combee enfadado. Es para la torta de Celia.' },
		tortamiel: { name: 'Torta de miel de Celia', pocket: 'key', desc: 'Una torta redonda y dorada, envuelta en un paño de cuadros y atada con cordel. Todavía caliente. Es para Don Teodoro.' },
		cronicatorta: { name: 'Crónica de la torta', pocket: 'key', desc: 'Una hoja de la libreta de Don Teodoro, escrita delante de ti con su pluma de siempre. Te la arrancó y te la dio «para el archivo».',
			read: '*(Pluma estilográfica. Letra inclinada, de otro siglo.)*\n\n**CRÓNICA DE CHAMOTA**\n**Sobre una torta**\n\nA media tarde, con el sol ya bajo sobre la muralla, se presentó en la plaza una persona forastera con un paquete envuelto en un paño de cuadros. El paquete estaba caliente. La persona, también: venía de la panadería de la calle del Pozo, a paso ligero.\n\nEl contenido: una torta de miel. La miel: del Bosque Azulejo, sacudida de una rama baja. La receta: la de Asunción, que el pueblo daba por perdida y que no lo estaba. Solo estaba esperando.\n\nEl destinatario, que no había dicho a nadie que era su cumpleaños, fingió sorpresa. El cronista certifica que la sorpresa fue fingida y que la emoción no.\n\nSin más incidencias.\n\n— T. A., cronista' },
	},

	// =====================================================================
	// PARCHES: los spots que cumplen cada encargo, en zonas ya visitadas
	// =====================================================================
	patches: {
		// ---- Kurt ----
		gym_iris: { spots: [
			{ label: 'Morti, junto a una vela', sub: 'Parece que te esperaba', icon: '🕯️', cond: K + ' == "iris"', new: K + ' == "iris"', talk: [{ script: 'enc_kurt_morti' }] },
		] },
		casa_kurt: { spots: [
			{ label: 'Kurt, mirando la puerta', sub: 'Espera la respuesta de Iris', icon: '🧓', cond: K + ' == "azalea"', new: K + ' == "azalea"', talk: [{ script: 'enc_kurt_fin' }] },
		] },
		// ---- Sabio Li ----
		ruta32: { route: { tramos: { 2: [
			{ talk: [{ script: 'enc_li_juncos' }], label: 'Algo de madera entre los juncos', sub: 'Tiene letras pintadas', icon: '🪵', cond: LI + ' == "buscar" && !flag.enc_li_1', new: LI + ' == "buscar" && !flag.enc_li_1' },
		] } } },
		patio_bellsprout: { spots: [
			{ label: 'Una tablilla colgada de una rama', sub: 'Se balancea con el aire', icon: '🪵', cond: LI + ' == "buscar" && !flag.enc_li_2', new: LI + ' == "buscar" && !flag.enc_li_2', talk: [{ script: 'enc_li_rama' }] },
		] },
		ruinas_alfa: { spots: [
			{ label: 'Una tablilla junto a la valla', sub: 'Entre dos piedras grises', icon: '🪵', cond: LI + ' == "buscar" && !flag.enc_li_3', new: LI + ' == "buscar" && !flag.enc_li_3', talk: [{ script: 'enc_li_piedras' }] },
		] },
		torre_bellsprout: { spots: [
			{ label: 'Sabio Li, junto a la ventana', sub: 'Con los ojos cerrados', icon: '🧘', cond: LI + ' == "volver"', new: LI + ' == "volver"', talk: [{ script: 'enc_li_fin' }] },
		] },
		// ---- Misty ----
		ruta24: { route: { tramos: { 3: [
			{ talk: [{ script: 'enc_misty_bici' }], label: 'Una bici roja apoyada en la farola', sub: 'Hay alguien sentado encima', icon: '🚲', cond: MI + ' == "puente"', new: MI + ' == "puente"' },
		] } } },
		gym_celeste: { spots: [
			{ label: 'Misty, en el borde de la piscina', sub: 'Mira la puerta cada dos segundos', icon: '🚲', cond: MI + ' == "celeste"', new: MI + ' == "celeste"', talk: [{ script: 'enc_misty_fin' }] },
			{ label: 'Misty (combate amistoso)', sub: 'Más o menos amistoso', icon: '💧', cond: 'done.enc_misty && !beat("enc_misty_amistoso")', talk: [{ script: 'enc_misty_reto' }] },
		] },
		// ---- Dolores ----
		sotano_torre: { spots: [
			{ label: 'Una hebra de hilo azul', sub: 'Baja por la escalera y se mete detrás de una caja', icon: '🧵', cond: DO + ' == "torre"', new: DO + ' == "torre"', talk: [{ script: 'enc_dolores_caja' }] },
		] },
		lavanda: { spots: [
			{ label: 'Dolores, con un muñeco manco', sub: 'Remiendo se hace el dormido a su lado', icon: '🧵', cond: DO + ' == "lavanda"', new: DO + ' == "lavanda"', talk: [{ script: 'enc_dolores_fin' }] },
		] },
		// ---- Lila ----
		torre_maestra: { spots: [
			{ label: 'Lila y una aprendiz muy pequeña', sub: 'Junto al pebetero apagado', icon: '🏮', cond: LA + ' == "yantra"', new: LA + ' == "yantra"', talk: [{ script: 'enc_lila_torre' }] },
		] },
		// ---- Kiawe ----
		rancho_ohana: { spots: [
			{ label: 'Dos cajas de leche junto a la cerca', sub: 'Envueltas en paja húmeda', icon: '🥛', cond: KI + ' == "rancho"', new: KI + ' == "rancho"', talk: [{ script: 'enc_kiawe_rancho' }] },
		] },
		colina_saltagua: { spots: [
			{ label: 'Entregar la leche a Nereida', sub: 'Del reparto de Kiawe', icon: '🥛', cond: KI + ' == "reparto" && !flag.enc_kiawe_nereida && has("lechekiawe")', new: KI + ' == "reparto" && !flag.enc_kiawe_nereida', talk: [{ script: 'enc_kiawe_nereida' }] },
		] },
		joyeria_mayla: { spots: [
			{ label: 'Entregar la leche a Mayla', sub: 'Del reparto de Kiawe', icon: '🥛', cond: KI + ' == "reparto" && !flag.enc_kiawe_mayla && has("lechekiawe")', new: KI + ' == "reparto" && !flag.enc_kiawe_mayla', talk: [{ script: 'enc_kiawe_mayla' }] },
		] },
		area_wela: { spots: [
			{ label: 'Kiawe, bailando sin público', sub: 'Espera noticias del reparto', icon: '🔥', cond: KI + ' == "wela"', new: KI + ' == "wela"', talk: [{ script: 'enc_kiawe_fin' }] },
		] },
		// ---- Celia ----
		bosque_azulejo: { route: { tramos: { 2: [
			{ talk: [{ cond: '!flag.enc_celia_panal_visto', script: 'enc_celia_panal' }, { script: 'enc_celia_panal_otra' }], label: 'Un panal en una rama baja', sub: 'Unos Combee montan guardia', icon: '🍯', cond: CE + ' == "miel"', new: CE + ' == "miel"' },
		] } } },
		panaderia_chamota: { spots: [
			{ label: 'Celia, con el horno encendido', sub: 'Te espera con las manos en la masa', icon: '🍞', cond: CE + ' == "horno"', new: CE + ' == "horno"', talk: [{ script: 'enc_celia_horno' }] },
		] },
		chamota: { spots: [
			{ label: 'Don Teodoro, con la libreta en las rodillas', sub: 'En su banco de la plaza', icon: '🎂', cond: CE + ' == "teodoro" && has("tortamiel")', new: CE + ' == "teodoro"', talk: [{ script: 'enc_celia_teodoro' }] },
		] },
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// Combate amistoso y opcional de Misty (tras el encargo). Niveles del final del B4 (tope 56).
		enc_misty_amistoso: { name: 'Misty', cls: 'Líder', npc: 'misty', ai: 4, iv: 26, reward: 3000, bg: 'gym',
			team: [
				{ sp: 'golduck', lv: 55, moves: ['scald', 'icebeam', 'calmmind', 'psychic'], ability: 'cloudnine', item: 'sitrusberry', nature: 'modest' },
				{ sp: 'lapras', lv: 55, moves: ['surf', 'icebeam', 'bodyslam', 'sing'], ability: 'waterabsorb', item: 'leftovers', nature: 'modest' },
				{ sp: 'gyarados', lv: 55, moves: ['waterfall', 'crunch', 'icefang', 'dragondance'], ability: 'intimidate', item: 'sitrusberry', nature: 'adamant' },
				{ sp: 'starmie', lv: 57, moves: ['surf', 'psychic', 'thunderbolt', 'rapidspin'], ability: 'naturalcure', item: 'mysticwater', nature: 'timid', iv: 28 },
			],
			items: [{ id: 'superpotion', n: 1 }],
			intro: '¡Amistoso! Eso quiere decir que no me enfado si pierdo. Mucho. ¡Starmie, tú al final, que te conozco!',
			win: '¡Vale, vale! Amistoso. Lo he dicho yo. …¡La próxima no es amistoso!',
			lose: '¡Ja! Amistoso, ¿eh? Ven cuando quieras la revancha. La bici te la presto para venir.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ========================= KURT (Johto) =========================
		enc_kurt_carta: [
			{ if: '!' + K, then: [
				{ text: 'Con la carta ha llegado una caja de madera clara, cerrada con un cordel. Pesa menos de lo que parece. Si la acercas al oído, algo dentro respira despacio.' },
				{ give: 'cajakurt' },
				{ quest: 'enc_kurt', stage: 'iris' },
			], else: [
				{ text: 'La carta de Kurt. «Si la abres, lo sabré.» Lo dice de la caja, pero te queda la duda de si también lo dice de la carta.' },
			] },
		],
		enc_kurt_morti: [
			{ text: 'Al fondo del gimnasio, entre las velas, Morti está sentado en el suelo con las piernas cruzadas. No levanta la vista.' },
			{ say: 'morti', text: 'Huele a barniz. Y a té verde. —Abre un ojo—. Kurt. Se ha decidido a mandarla. Tardaba tanto que pensé que ya me la había dado y yo no me había enterado.' },
			{ take: 'cajakurt', cond: 'has("cajakurt")' },
			{ text: 'Desata el cordel muy despacio. Dentro hay una **Luna Ball** de madera, amarilla y negra, todavía brillante de barniz. Morti la sostiene en la palma abierta sin cerrar los dedos.' },
			{ say: 'morti', text: 'Respira. —No es una pregunta—. Tiene un amigo mío que no cabe en una de fábrica. Las de fábrica son demasiado… de ahora. Esta tiene años dentro. Los del árbol.' },
			{ choice: [
				{ text: '«¿Para quién es?»', then: [
					{ say: 'morti', text: 'Para alguien que vive en lo alto de la Torre Quemada desde antes de que se quemara. No le gusta que diga su nombre. A mí tampoco me gustaría, si fuera él.' },
				] },
				{ text: '«Kurt quiere una respuesta.»', then: [
					{ say: 'morti', text: 'Kurt siempre quiere una respuesta. Y luego, cuando se la doy, gruñe. Es nuestra forma de llevarnos bien.' },
				] },
				{ text: 'No decir nada.', then: [
					{ say: 'morti', text: 'Bien. Él tampoco dijo nada al tallarla. Se nota. Las cosas que se hacen callando salen más redondas.' },
				] },
			] },
			{ text: 'Morti se saca del bolsillo un cabo de vela blanca, gastado por un lado, y lo envuelve en un pañuelo morado.' },
			{ say: 'morti', text: 'Dale esto. Es la respuesta. Él sabrá. —Te lo pone en la mano—. Y dile que su abuelo también la habría tallado así. Eso no lo sé. Pero lo noto.' },
			{ give: 'velamorti' },
			{ quest: 'enc_kurt', stage: 'azalea' },
		],
		enc_kurt_fin: [
			{ say: 'kurt', text: 'Tú. ¿Y bien? ¿Le gustó? No. No me lo digas. Dame lo que te dio.' },
			{ take: 'velamorti', cond: 'has("velamorti")' },
			{ text: 'Kurt desenvuelve el pañuelo morado. Mira el cabo de vela un buen rato, sin decir nada. Luego lo pone en la repisa, junto a la foto de la pared.' },
			{ say: 'kurt', text: 'Hmpf. Una vela de la Torre. De las de antes del incendio. —Se aclara la garganta. Mucho rato—. Eso es que le ha gustado. Ese chico no sabe decir «gracias» como la gente normal.' },
			{ say: 'kurt', text: 'Toma. Dos. Una por la ida, otra por la vuelta. Ni una más. Y no me las cambies por nada en la tienda, que lo sabré.' },
			{ give: 'moonball' },
			{ give: 'friendball' },
			{ give: 'yellowapricorn', n: 2 },
			{ say: 'kurt', text: 'Y los Bonguris, para que vuelvas. No por mí. Por las Balls. Las Balls quieren salir de esta casa.' },
			{ quest: 'enc_kurt', stage: 'hecha', done: true },
		],

		// ========================= SABIO LI (Johto) =========================
		enc_li_carta: [
			{ if: '!' + LI, then: [
				{ quest: 'enc_li', stage: 'buscar' },
			], else: [
				{ text: 'La carta del Sabio Li. «No hay prisa. Los nombres esperan.»' },
			] },
		],
		enc_li_comprobar: [
			{ if: LI_TRES, then: [
				{ text: 'Ya tienes las tres tablillas. Pesan poco. Los nombres, menos.' },
				{ quest: 'enc_li', stage: 'volver' },
			] },
		],
		enc_li_juncos: [
			{ text: 'Entre los juncos de la charca, una tablilla de madera oscura, del tamaño de una mano, con un cordel roto. Los Wooper la rodean y la miran con la boca abierta, como si esperaran que dijera algo.' },
			{ text: 'Tiene un nombre pintado con pincel: «Hojilla». Debajo, más pequeño: «Cuarenta primaveras en la torre. Se movía bien».' },
			{ set: { 'flag.enc_li_1': true } },
			{ call: 'enc_li_comprobar' },
		],
		enc_li_rama: [
			{ text: 'En lo alto del patio, colgada de una rama por el cordel, una tablilla se balancea con el aire. Justo fuera de tu alcance.' },
			{ if: LUC, then: [
				{ text: '{riolu} se te sube a los hombros sin pedir permiso, estira el brazo y la descuelga con dos dedos. Luego se baja como si no hubiera hecho nada.' },
			], else: [
				{ text: 'Un aprendiz de la torre pasa por allí, ve lo que miras, trae una escoba y la descuelga sin decir nada. Hace una reverencia y se va.' },
			] },
			{ text: 'La tablilla dice: «Brotecillo. Llegó en una tormenta y se quedó por la calma».' },
			{ set: { 'flag.enc_li_2': true } },
			{ call: 'enc_li_comprobar' },
		],
		enc_li_piedras: [
			{ text: 'Entre dos piedras grises, junto a la valla de Lemnis, una tablilla medio enterrada en la tierra suelta. El viento la ha traído hasta aquí, lejísimos. Las marcas de las cámaras parecen mirarla.' },
			{ text: 'Está gastada. Casi no se lee. Pasas el dedo y notas el trazo: «Sin nombre. Vino a morir a la torre. Lo cuidamos igual».' },
			{ set: { 'flag.enc_li_3': true } },
			{ call: 'enc_li_comprobar' },
		],
		enc_li_fin: [
			{ say: 'li', text: 'Has vuelto. —No abre los ojos—. Traes madera. Tres trozos. Y uno pesa más que los otros dos.' },
			{ text: 'Le das las tablillas. Las toca una por una, sin mirarlas, siguiendo los trazos con la yema de los dedos.' },
			{ say: 'li', text: 'Hojilla. Brotecillo. —Se detiene en la tercera—. Y este. El que no tenía nombre. Lo cuidó mi maestro, cuando yo era más pequeño que tú. Fue el primero que vi irse.' },
			{ say: 'li', text: 'El viento se llevó a los tres. Tú fuiste a buscarlos sin correr. Por eso los has encontrado.' },
			{ text: 'Cuelga las tablillas de nuevo en la viga, junto a la ventana. La torre se mueve un poco. Las tablillas, con ella.' },
			{ if: 'has("p7mtpazmental")', then: [
				{ say: 'li', text: 'No tengo nada que darte que no tengas ya. Toma esto, para el camino. Las hierbas del patio curan más que la prisa.' },
				{ give: 'revivalherb', n: 2 },
				{ give: 'healpowder', n: 3 },
			], else: [
				{ say: 'li', text: 'Toma. Lo que mis maestros enseñaban antes que nada: estar quieto por dentro aunque todo se mueva fuera.' },
				{ give: 'p7mtpazmental' },
				{ give: 'healpowder', n: 2 },
			] },
			{ quest: 'enc_li', stage: 'hecha', done: true },
		],

		// ========================= MISTY (Kanto) =========================
		enc_misty_carta: [
			{ if: '!' + MI, then: [
				{ quest: 'enc_misty', stage: 'puente' },
			], else: [
				{ text: 'La nota de Misty. «No le hagas daño al Psyduck. Tampoco le hagas caso.» Sigues sin saber cómo se hacen las dos cosas a la vez.' },
			] },
		],
		enc_misty_bici: [
			{ text: 'En la tercera farola del puente, apoyada con cuidado, una bici roja con cesta. Brilla de nueva. Y encima, sentado en el sillín con las patas colgando, un **Psyduck**.' },
			{ text: 'El Psyduck te mira. Se agarra la cabeza con las dos manos. Te sigue mirando.' },
			{ choice: [
				{ text: 'Esperar a que se aburra.', then: [
					{ text: 'Te sientas en la barandilla. Él se queda en el sillín. Pasa un Goldeen por el río. Pasa una nube. Pasa otra nube que se parece a un Psyduck.' },
					{ text: 'Al cabo de un rato, el Psyduck bosteza, se baja de la bici y se va por el puente andando como si tuviera una cita. Se para a mitad de camino. Se le ha olvidado cuál.' },
				] },
				{ text: 'Ofrecerle una baya.', then: [
					{ text: 'Le enseñas una baya. El Psyduck la mira. Mira la bici. Mira la baya otra vez. Se le nota el esfuerzo.' },
					{ text: 'Al final baja, coge la baya con las dos manos y se la come muy despacio, de pie junto a la rueda, sin dejar de mirarte. No se va. Pero ya no está encima.' },
				] },
				{ text: 'Levantarlo con cuidado.', then: [
					{ text: 'Lo levantas por debajo de los brazos. Pesa más de lo que parece. Se deja hacer, con la cabeza ladeada, y cuando lo dejas en las tablas del puente se queda exactamente en la misma postura.' },
					{ text: 'Como una estatua. Una estatua con dolor de cabeza.' },
				] },
			] },
			{ set: { 'flag.enc_misty_psyduck': true } },
			{ text: 'Empujas la bici de vuelta hacia Celeste. Las tablas del puente traquetean. Detrás, oyes unas patas planas que te siguen un rato y luego se cansan.' },
			{ quest: 'enc_misty', stage: 'celeste' },
		],
		enc_misty_fin: [
			{ text: 'En cuanto entras con la bici por la puerta del gimnasio, Misty sale del agua de un salto y llega hasta ti chorreando.' },
			{ say: 'misty', text: '¡Mi bici! ¡Entera! ¡Con las dos ruedas! —La mira por todos los lados—. ¿Sabes cuántas bicis me han durado una semana con las dos ruedas puestas? ¡Ninguna! ¡Esta es la primera!' },
			{ say: 'misty', text: '¿Y el Psyduck? ¿Le has hecho algo? No, ¿verdad? Ya sé que no. Tienes cara de no hacerle nada a nadie. Bueno, a nadie que no te rete.' },
			{ say: 'misty', text: 'Toma, lo prometido. —Te pone en la mano un frasquito y un puñado de billetes un poco mojados—. El agua es de la piscina grande. Mística, dicen. Yo digo que es de Celeste, que es mejor.' },
			{ give: 'mysticwater' },
			{ money: 2500 },
			{ quest: 'enc_misty', stage: 'hecha', done: true },
			{ say: 'misty', text: 'Y lo otro también lo dije en serio. ¡El combate! Amistoso. Si quieres. Ahora o cuando vuelvas, que la piscina no se va a ningún sitio.' },
			{ call: 'enc_misty_reto' },
		],
		enc_misty_reto: [
			{ prompt: '¿Combate amistoso contra Misty?', choice: [
				{ text: '«Vamos, pero primero curo al equipo.»', then: [
					{ text: 'Misty te lanza una toalla y señala el Centro Pokémon del gimnasio: una máquina vieja junto a las gradas que pita dos veces y funciona.' },
					{ heal: 'Tu equipo está como nuevo. PS y PP al máximo.' },
					{ call: 'enc_misty_combate' },
				] },
				{ text: '«Vamos, así como estamos.»', then: [
					{ call: 'enc_misty_combate' },
				] },
				{ text: '«Otro día.»', then: [
					{ say: 'misty', text: '¡Vale! Pero no tardes años, ¿eh? Que me aburro.' },
				] },
			] },
		],
		enc_misty_combate: [
			{ battle: 'enc_misty_amistoso', lose: 'continue', onWin: [
				{ say: 'misty', text: '¡Hala! —Se sienta en el borde de la piscina con los pies en el agua—. Amistoso, amistoso… ¡y me has ganado en serio! Me gusta. Así se entrena.' },
				{ say: 'misty', text: 'La próxima vez que pierda la bici, te escribo a ti. No a Brock. Brock me la devuelve con un lazo.' },
			], onLose: [
				{ say: 'misty', text: '¡Gané! ¡Amistosamente! —Te tiende la mano para levantarte—. Cura a los tuyos, que han peleado bien. La revancha, cuando quieras.' },
				{ heal: true },
			] },
		],

		// ========================= DOLORES (Kanto) =========================
		enc_dolores_carta: [
			{ if: '!' + DO, then: [
				{ quest: 'enc_dolores', stage: 'torre' },
			], else: [
				{ text: 'La carta de Dolores. La hebra azul de la esquina sigue cosida. Si tiras un poco, no se suelta.' },
			] },
		],
		enc_dolores_caja: [
			{ text: 'La hebra de hilo azul baja por la escalera del sótano, se enreda en un clavo, sigue por el suelo y se mete detrás de una caja vieja de la Torre, de las de guardar velas. La caja tiene un candado pequeño de tres botones de colores.' },
			{ text: 'Encima de la caja, alguien ha dejado una cremallera suelta. Como una firma.' },
			{ minigame: { type: 'lock', id: 'enc_dolores_caja', title: 'La caja de Remiendo', hint: 'Remiendo cierra con botones de colores. Mira bien el orden en que se encienden.', theme: 'caja', level: 2, guaranteed: ['brazomuneco'], picks: 1, loot: [{ id: 'spelltag', w: 2 }, { id: 'cleansetag', w: 2 }, { id: 'pokedoll', w: 3 }], consolation: false, lootTitle: 'Dentro de la caja' },
				onWin: [
					{ text: 'El candado se abre con un clic de juguete. Dentro, entre cabos de vela y botones sueltos, está el brazo de trapo azul, con su manopla negra. Y la hebra de hilo, atada en la punta con un lazo.' },
					{ quest: 'enc_dolores', stage: 'lavanda' },
				],
				onLose: [{ text: 'El candado se traba. Los botones dejan de encenderse un momento, como si alguien se riera por lo bajo. Cuando vuelven a lucir, puedes probar otra vez.' }],
				onQuit: [{ text: 'Dejas la caja donde estaba. La hebra azul sigue ahí. Remiendo no tiene prisa; tú tampoco.' }] },
		],
		enc_dolores_fin: [
			{ say: 'p7_dolores', text: 'Ah, tú. —No deja de coser—. Traes cara de haber bajado. ¿Lo tienes?' },
			{ take: 'brazomuneco', cond: 'has("brazomuneco")' },
			{ text: 'Le das el brazo. Dolores lo mira, mira a Remiendo, y Remiendo, que hacía como que dormía, se da la vuelta en el banco y le enseña la espalda.' },
			{ say: 'p7_dolores', text: 'Sí, sí. Tú no has sido. Nunca eres tú. —Enhebra la aguja sin mirarla—. Ahora quieto, que esto lleva su tiempo.' },
			{ text: 'Cose el brazo con punto pequeño, apretado. Tarda lo que tarda. No habla. Remiendo se gira poco a poco hasta que está mirando otra vez, con la cremallera un poco abierta.' },
			{ text: 'Cuando termina, corta el hilo con los dientes y te pone el muñeco en las manos: azul, con dos orejas largas, un antifaz negro bordado y dos brazos. El izquierdo tiene la puntada un poco más apretada que el derecho.', cond: LUC },
			{ text: 'Cuando termina, corta el hilo con los dientes y te pone el muñeco en las manos: azul, con dos orejas largas, un antifaz negro bordado y dos brazos. El izquierdo tiene la puntada un poco más apretada que el derecho. Te acuerdas de alguien que no viene contigo hoy.', cond: '!(' + LUC + ')' },
			{ give: 'munecolucario' },
			{ say: 'p7_dolores', text: 'Es tuyo. No es para ninguna tumba: es para alguien que sigue andando. Esos los coso pocas veces. Cuesta más.' },
			{ say: 'p7_dolores', text: 'Y esto, por bajar. Allí abajo hay quien agradece que se le haga una visita, aunque sea de paso. —Te da un cuadradito de tela con un dibujo de trazo grueso—. Un hechizo. De los míos. Los de tienda no aguantan.' },
			{ give: 'spelltag' },
			{ text: 'Remiendo estira un brazo hacia el muñeco. Lo toca una vez, con la punta, y lo retira. Luego se vuelve a hacer el dormido.' },
			{ quest: 'enc_dolores', stage: 'hecha', done: true },
		],

		// ========================= LILA (Kalos) =========================
		enc_lila_carta: [
			{ if: '!' + LA, then: [
				{ quest: 'enc_lila', stage: 'yantra' },
			], else: [
				{ text: 'La carta de Lila. La cinta verde de Sylveon sigue atada al sobre. Nadie la ha desatado. Nadie se atreve.' },
			] },
		],
		enc_lila_torre: [
			{ text: 'Es casi de noche. Cornelio ha apagado el pebetero para la prueba. Delante del bronce, de rodillas, una niña de unos ocho años con la túnica de aprendiz arremangada y un Flabébé dormido en el pelo. A su lado, de cuclillas, Lila le habla bajito.' },
			{ say: 'lila', text: '¡{jugador}! Has venido. —Se le ponen las orejas rojas al instante—. E-esto… hola. Gracias. Ella es la nueva. Le toca hoy. Otra vez.' },
			{ say: 'lila', text: 'No llora, ¿eh? Pone las manos en el borde y se queda quieta. Muy quieta. Y la piedra del fondo, nada. Como me pasaba a mí. Igualito.' },
			{ text: 'La niña te mira de arriba abajo. Mira a tu equipo. Luego mira sus manos, que tiemblan un poco sobre el bronce.' },
			{ prompt: '¿Qué haces?', choice: [
				{ text: 'Sentarte cerca, mirando el pebetero y no a ella.', then: [
					{ set: { 'flag.enc_lila_abajo': true } },
					{ text: 'Te sientas en el suelo, a unos pasos, y miras el pebetero. No a ella. No dices nada. Lila hace lo mismo a tu lado.' },
					{ say: 'lila', text: '—Muy bajito, sin dejar de mirar el bronce—. Eso. Eso es lo que hiciste. No hiciste nada. Fue lo mejor que hizo nadie por mí.' },
				] },
				{ text: 'Contarle una vez que tuviste miedo.', then: [
					{ text: 'Te agachas a su altura y le cuentas una vez que tuviste miedo. No una de las grandes. Una pequeña, de las que nadie ve. Ella escucha con la boca un poco abierta.' },
					{ text: 'Al terminar, asiente muy seria, como si le hubieras dado instrucciones. Vuelve a poner las manos en el bronce.' },
					{ say: 'lila', text: 'Le has contado la verdad. —Sonríe—. Eso también ayuda. Saber que los mayores también se paran. Yo no me lo creía. Ahora sí.' },
				] },
				{ text: 'Poner tus manos sobre las suyas para ayudarla.', then: [
					{ say: 'lila', text: 'No. —Lo dice firme, sin tartamudear, y luego se le pone todo rojo—. P-perdona. Ya sé que es por ayudar. Pero si la enciendes tú, se enciende la tuya. La suya se queda apagada.' },
					{ text: 'Apartas las manos. La niña te mira, mira a Lila, y, como si la negativa le hubiera dado permiso, vuelve a intentarlo sola.' },
				] },
			] },
			{ text: 'Pasa un minuto. La niña respira rápido, corto. Luego, poco a poco, más despacio. El Flabébé se despierta, se asoma por encima de su flequillo y mira el bronce también.' },
			{ text: 'En el fondo del pebetero aparece un punto de luz. Pequeño, como una brasa. Crece. Y de pronto la llama sube, azul y blanca, y la sala se llena de sombras que bailan.' },
			{ text: 'La niña no grita. Se queda mirando la llama con las manos todavía en el borde. Desde la escalera llega la risa de Cornelio, que estaba esperando arriba sin decírselo a nadie.' },
			{ say: 'lila', text: '¡Lo ha hecho! —Te agarra de la manga sin darse cuenta—. ¡Lo ha… ! E-esto… perdona. —Te suelta la manga. Las orejas, rojísimas—. Lo ha hecho.' },
			{ say: 'lila', text: 'Gracias por venir. Ya sé que estás muy ocupad{o|a|e}, con la Gira y todo. Pero has venido. Y no has hecho nada. —Se ríe, bajito—. Eso se te da muy bien.' },
			{ say: 'lila', text: 'Toma. Son de las que hace Cornelio para los que pasan la prueba. Ella tiene las suyas. Estas son para quien se quedó cerca.' },
			{ give: 'sweetheart', n: 3 },
			{ af: { lila: 3 } },
			{ af: { lila: 1 }, cond: 'flag.enc_lila_abajo' },
			{ quest: 'enc_lila', stage: 'hecha', done: true },
		],

		// ========================= KIAWE (Alola) =========================
		enc_kiawe_carta: [
			{ if: '!' + KI, then: [
				{ quest: 'enc_kiawe', stage: 'rancho' },
			], else: [
				{ text: 'La nota de Kiawe. «Recoges. Llevas. Vuelves. No te pares en medio.»' },
			] },
		],
		enc_kiawe_rancho: [
			{ text: 'Junto a la cerca del corral, dos cajas de madera envueltas en paja húmeda. Encima, un papel sujeto con una piedra: «KIAWE. NO TOCAR». Debajo, con otra letra: «Salvo quien venga de su parte».' },
			{ if: KALENA_CONOCIDA, then: [
				{ say: 'kalena', text: 'Tú. —Kalena se acerca desde el abrevadero secándose las manos—. Kiawe dijo que vendría alguien. No dijo que fueras tú. Mejor. Tú no tiras las cosas.' },
			], else: [
				{ say: 'kalena', as: 'Capataza', text: 'Tú. —La capataza se acerca desde el abrevadero secándose las manos—. Kiawe dijo que vendría alguien. No dijo quién. Vale cualquiera que no tire las cosas.' },
			] },
			{ say: 'kalena', text: 'Una para la capitana del agua. Otra para la kahuna. Fría. Si la paja se seca, se calienta. Si se calienta, se quejan. Y luego Kiawe viene a quejarse aquí. Y aquí no se quejan conmigo.' },
			{ give: 'lechekiawe', n: 2 },
			{ say: 'kalena', text: 'Hala. Ritmo.' },
			{ quest: 'enc_kiawe', stage: 'reparto' },
		],
		enc_kiawe_comprobar: [
			{ if: KI_DOS, then: [
				{ text: 'Reparto hecho. Las dos cajas, entregadas. Frías.' },
				{ quest: 'enc_kiawe', stage: 'wela' },
			] },
		],
		enc_kiawe_nereida: [
			{ text: 'Nereida está sentada en la orilla de la poza, con el brazo metido en el agua hasta el hombro. Te ve llegar con la caja y no saca el brazo.' },
			{ say: 'nereida', text: 'Leche. Bien. —Pausa—. Kiawe no viene porque su Charizard se ha vuelto a escapar a la luna. Lo sé porque lo he visto. Ayer. Con estos ojos.' },
			{ choice: [
				{ text: '«La silla explotó otra vez.»', then: [
					{ say: 'nereida', text: '…Sí. —Saca por fin el brazo del agua—. Era mentira lo de la luna. Lo de la silla me lo creo. Leilani es así.' },
				] },
				{ text: '«¿Y qué tal la luna?»', then: [
					{ say: 'nereida', text: 'Fría. Como la leche. —Te mira muy seria. Y luego, por primera vez, casi sonríe—. Era mentira. Me caes bien.' },
				] },
			] },
			{ take: 'lechekiawe', n: 1, cond: 'has("lechekiawe")' },
			{ say: 'nereida', text: 'Dile a Kiawe que llegó fría. Si no llega fría, se lo digo yo. Y entonces le cuento lo del Wailord. Otra vez.' },
			{ set: { 'flag.enc_kiawe_nereida': true } },
			{ call: 'enc_kiawe_comprobar' },
		],
		enc_kiawe_mayla: [
			{ text: 'Mayla está detrás del mostrador con una lupa en el ojo, tasando una piedra verde. No levanta la vista cuando entras.' },
			{ say: 'mayla', text: 'La leche de Kiawe. Llegas a la hora. Me gusta lo puntual. —Deja la piedra en el platito—. Déjala ahí. No, ahí no. Ahí. Ahí da la sombra.' },
			{ take: 'lechekiawe', n: 1, cond: 'has("lechekiawe")' },
			{ text: 'Mayla saca una botella, la mira a contraluz como si fuera una gema y le da la vuelta.' },
			{ say: 'mayla', text: 'Fría. Bien. Kiawe es rápido incluso cuando no viene. —Por fin te mira—. Tú también. Dile que la paja estaba bien puesta. A él le importa eso más que el dinero.' },
			{ set: { 'flag.enc_kiawe_mayla': true } },
			{ call: 'enc_kiawe_comprobar' },
		],
		enc_kiawe_fin: [
			{ text: 'Kiawe baila solo en el escenario de las antorchas, sin música, marcando el compás con el talón. El Marowak lo imita desde una roca. Cuando te ve, se para en seco.' },
			{ say: 'kiawe', text: '¿Fría?' },
			{ text: 'Asientes.' },
			{ say: 'kiawe', text: 'Bien. —Golpe de talón—. Recoges. Llevas. Vuelves. Sin pararte en medio. Así se reparte. Y así se baila. Es lo mismo, pero nadie me cree.' },
			{ say: 'kiawe', text: 'Lo prometido. —Te da una bolsa de cuero—. Leche de la granja, de la buena, la que no se reparte. Y esto, para tu fuego. Que salga el sol cuando lo necesites.' },
			{ give: 'moomoomilk', n: 3 },
			{ money: 3000 },
			{ if: 'has("p7mtdiasoleado")', then: [
				{ give: 'charcoal' },
			], else: [
				{ give: 'p7mtdiasoleado' },
			] },
			{ say: 'kiawe', text: 'Cuando Charizard vuelva a volar, te llevo a dar una vuelta. Si la silla aguanta. Si no, también. Pero más deprisa hacia abajo.' },
			{ quest: 'enc_kiawe', stage: 'hecha', done: true },
		],

		// ========================= CELIA (Teselia) =========================
		enc_celia_carta: [
			{ if: '!' + CE, then: [
				{ quest: 'enc_celia', stage: 'miel' },
			], else: [
				{ text: 'La carta de Celia, en su bolsa de pan. Todavía huele un poco a horno. «Ven con hambre.»' },
			] },
		],
		enc_celia_panal: [
			{ set: { 'flag.enc_celia_panal_visto': true } },
			{ text: 'Junto a la charca azul, en una rama baja de un árbol torcido, cuelga un panal grande, dorado, que zumba. Tres Combee montan guardia en la entrada, muy serios, como porteros de discoteca.' },
			{ text: 'Si sacudes la rama con cariño, algunos trozos caerán. Hay que recogerlos antes de que toquen el suelo. Y sin que los Combee se enfaden demasiado.' },
			{ call: 'enc_celia_cosecha' },
		],
		enc_celia_panal_otra: [
			{ text: 'El panal sigue en su rama. Los tres Combee te reconocen. No les hace ninguna gracia.' },
			{ call: 'enc_celia_cosecha' },
		],
		enc_celia_cosecha: [
			{ minigame: { type: 'catch', id: 'enc_celia_panal', title: 'El panal del Bosque Azulejo', hint: 'Sacude la rama con cuidado y recoge los trozos de panal. Las piñas no las quiere nadie.', theme: 'bosque', level: 2, guaranteed: ['panalazulejo'], picks: 2, loot: [{ id: 'honey', w: 6 }, { id: 'oranberry', w: 4 }, { id: 'pechaberry', w: 4 }], consolation: false, lootTitle: 'De la rama' },
				onWin: [
					{ text: 'En la cesta, un trozo de panal grande, tibio, que gotea. Lo envuelves en una hoja. Los Combee se lo toman con filosofía: el panal es grande, y tú no has vuelto a por más.' },
					{ quest: 'enc_celia', stage: 'horno' },
				],
				onLose: [{ text: 'Los trozos buenos se han caído al suelo y los Combee ya los están recogiendo ellos, muy indignados. Espera a que se calmen y prueba otra vez.' }],
				onQuit: [{ text: 'Dejas la rama en paz. Los Combee te siguen con la mirada hasta que te vas.' }] },
		],
		enc_celia_horno: [
			{ say: 'celia', text: '¡Eh, detective! ¿Lo traes? ¡Lo traes! —Se ríe muy fuerte—. A ver, a ver… Huele a bosque. Huele a como olía antes. Ay.' },
			{ take: 'panalazulejo', cond: 'has("panalazulejo")' },
			{ text: 'Celia trabaja deprisa: harina, huevos, la miel del panal estrujada con las manos, una pizca de sal «para que se note la miel». No mide nada. No le hace falta.' },
			{ say: 'celia', text: 'Mi madre decía que la torta de miel no se mira mientras se hace. Que se pone tímida. Así que tú cuéntame algo mientras tanto. Lo que quieras. Algo que no sea un caso.' },
			{ text: 'Le cuentas algo. Ella escucha y se ríe en los sitios que no tocan, y en los que tocan también. El horno hace lo suyo. Al rato, la panadería entera huele a miel.' },
			{ text: 'Celia saca una torta redonda y dorada, la envuelve en un paño de cuadros y la ata con cordel. Te la da con las dos manos.' },
			{ give: 'tortamiel' },
			{ say: 'celia', text: 'Llévasela tú. Está en la plaza, en su banco, con la libreta. Si se la llevo yo, me pongo a llorar, y luego llora él, y luego se nos enfría. ¡Corre, que está caliente!' },
			{ quest: 'enc_celia', stage: 'teodoro' },
		],
		enc_celia_teodoro: [
			{ say: 'teodoro', text: 'Usted otra vez. Siéntese, siéntese. —Ve el paño de cuadros. Se le quedan los ojos quietos un momento—. ¿Y eso?' },
			{ take: 'tortamiel', cond: 'has("tortamiel")' },
			{ text: 'Don Teodoro desata el cordel con mucho cuidado, como quien abre un documento antiguo. Huele la torta. No dice nada durante un buen rato.' },
			{ say: 'teodoro', text: 'Miel del Azulejo. La receta de Asunción. —Carraspea—. Esto lo ha hecho la chica. Y no me lo ha traído ella porque se habría puesto a llorar. Lo sé. La conozco desde que no levantaba un palmo.' },
			{ say: 'teodoro', text: 'No le dije a nadie que era mi cumpleaños. Que conste. —Se seca un ojo con el dorso de la mano—. Es el polen. En esta época hay mucho polen.' },
			{ text: 'Saca la pluma y la libreta, escribe deprisa durante un minuto largo, arranca la hoja y te la da.' },
			{ say: 'teodoro', text: 'Para el archivo. Las cosas que no se escriben se las lleva el viento. Esta no. —Te pone también unas monedas en la mano—. Y esto, por el recado. No me discuta: un cronista siempre paga a sus fuentes.' },
			{ give: 'cronicatorta' },
			{ money: 2500 },
			{ give: 'casteliacone', n: 2 },
			{ say: 'teodoro', text: 'Dígale a la chica que estaba buena. No, mejor no le diga nada. Ya se lo diré yo. Mañana. Con la crónica delante.' },
			{ quest: 'enc_celia', stage: 'hecha', done: true },
		],
	},
};
