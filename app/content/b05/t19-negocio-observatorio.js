// Negocio p10_observatorio (2026-10-28): el observatorio de la loma de Crómlech, con la Dra. Irene Solberg.
//   Lugar: Pueblo Crómlech (Kalos), donde el jugador conoció a Irene en el B1. La vieja estación meteorológica de la loma
//   del sur, fuera de las vallas de la excavación del norte. Irene lee el cielo como lee las inscripciones.
//   Abre con `flag.b04_fin` (Irene ya se fue a Ciudad Canal tras las Ruinas Alfa del B3 y ha tenido tiempo de volver).
//   Escena de apertura: `p10_obs_apertura` (flag `p10_obs_visto`). Entrada ₽15 000 (`p10_obs_compra`), parte 40 % (hasta 65 %).
//   Líneas: visitas (dinero), lo que cae del cielo (Polvo Estelar, Trozo Estrella, Fragmento Cometa), piedras del círculo
//   (piedras evolutivas) y la cúpula grande (bloqueada). Mejoras: ₽145 000. El Meteorito de items.json es objeto clave
//   de historia (Deoxys): no se produce aquí.
//   Encargados: Irene · Handsome · Simón (solo con `flag.p7_simon`).
//   Afinidad: como mucho +4 en la apertura y la compra (`af.irene`), por estudiar lo que enseña y respetar el sitio.
//   Sin spoilers: nada del Acto VII, del aura ni del origen de Riolu. Referencia escondida: las tres constelaciones de
//   Kalos (el Arquero, el Cáliz y el Dragón).

const V = 'p10_observatorio';
const SOCIO = 'partner("' + V + '")';
const ABRE = 'flag.b04_fin && flag.b01_irene_1';
const LUC = '(inParty("riolu") || inParty("lucario"))';

export default {
	// =====================================================================
	// OBJETOS (de lectura)
	// =====================================================================
	items: {
		p10_cartaceleste: { name: 'Carta celeste de Crómlech', pocket: 'key', desc: 'Un pliego enorme doblado en ocho, con las estrellas dibujadas a tinta y la hora apuntada al lado de cada una.',
			read: '**CARTA CELESTE DE CRÓMLECH**\n*Cielo de otoño, vista desde la loma del sur. Dibujado por I. S.*\n\nLos de Crómlech no les ponen a las estrellas nombres de héroes. Les ponen nombres de cosas que se usan. Hay tres que se ven todo el año, y las tres están talladas, muy gastadas, en el menhir mayor de la plaza.\n\n**El Arquero.** Al este, en otoño. Cuatro estrellas para el arco y una para la flecha, que apunta siempre al mismo menhir. *(Visto a las 21:40.)*\n\n**El Cáliz.** En verano, bajo. Siete estrellas en forma de copa. Dicen en el pueblo que de ahí bebe la luna. *(Visto a las 23:05. No es verdad. Es bonito.)*\n\n**El Dragón.** Enroscado alrededor del norte. No se pone nunca: da la vuelta entera sin tocar el horizonte. *(Toda la noche. Por eso no le apunto hora. Perdón.)*\n\nEl norte de la carta lo he dibujado de memoria: los focos de la excavación no dejan ver nada por ese lado. Las estrellas no se mueven porque alguien encienda una luz. Solo dejan de verse un rato.\n\n*(En el margen, muy pequeño, tres letras Unown: L · U · Z.)*' },
		p10_catalogo: { name: 'Catálogo de la loma (n.º 1)', pocket: 'key', desc: 'Un boletín grapado, con tapas azules y el sello de la Biblioteca de Ciudad Canal. Huele a tinta nueva.',
			read: '**OBSERVATORIO DE LA LOMA · CRÓMLECH**\n**Catálogo, número 1**\n*Dra. Irene Solberg (Biblioteca de Ciudad Canal)*\n\n**Resumen.** El círculo de menhires de Crómlech no es solo un monumento: es un calendario. El menhir mayor marca la salida del sol el día más largo del año, y los tres grabados de su cara este coinciden con tres asterismos que se ven desde la loma. Se adjuntan 212 observaciones con fecha y hora.\n\n**Observaciones destacadas.**\n— N.º 31: lluvia de estrellas, 74 trazas en una hora.\n— N.º 58: grupo de Clefairy en el interior del círculo, noche de luna llena. Se observó a distancia. *No se publica cuál de los menhires, por respeto a los Clefairy.*\n— N.º 140: una luz que cambia de rumbo tres veces. Un Minior. No era otra cosa. *(Ver nota de un colaborador escéptico, anexo C, que pide constar como «muy decepcionado».)*\n\n**Conclusión.** El cielo es la inscripción más vieja que existe, y la única que nadie ha podido raspar.\n\n**Agradecimientos.** Al pueblo de Crómlech, por el tejado. A la Policía Internacional, por el permiso. Y a {jugador}, que hizo posible este observatorio y que, además, preguntaba cuando no entendía, que es lo que hace una persona curiosa de verdad y lo que casi nadie se atreve a…\n\n*(La frase sigue en la página siguiente. La página siguiente está en blanco.)*' },
	},

	// =====================================================================
	// PARCHES: la loma del sur de Crómlech
	// =====================================================================
	patches: {
		cromlech: { spots: [
			{ label: 'Una cúpula abierta en la loma del sur', sub: 'Alguien ha subido un telescopio. Y un taburete', icon: '🔭', cond: ABRE + ' && !flag.p10_obs_visto', new: 'true', talk: [{ script: 'p10_obs_apertura' }] },
			{ label: 'El observatorio de la loma', sub: 'La vieja estación meteorológica, con la cúpula a medio abrir', icon: '🔭', cond: 'flag.p10_obs_visto', new: '!' + SOCIO, action: { venture: V } },
			{ label: 'Irene, con la libreta abierta', sub: 'Escribe sin mirar el papel', icon: '📓', cond: 'flag.p10_obs_visto', new: '!flag.p10_irene_charla', talk: [
				{ cond: 'night', script: 'p10_irene_noche' },
				{ script: 'p10_irene_dia' },
			] },
		] },
	},

	// =====================================================================
	// NEGOCIO
	// =====================================================================
	ventures: {
		p10_observatorio: {
			name: 'Observatorio de la loma', icon: '🔭', loc: 'cromlech', partner: 'irene',
			cond: 'flag.p10_obs_visto',
			blurb: 'Una estación meteorológica vieja, un telescopio de antes de que nacieras y una doctora que apunta la hora de todo.',
			buy: { cost: 15000, text: '«No te estoy pidiendo dinero. Te estoy ofreciendo una participación en el conocimiento. Que, casualmente, viene con gastos.»', script: 'p10_obs_compra' },
			share: [{ pct: 40 }],
			upkeep: 600, store: 3,
			lines: {
				visitas: { name: 'Noches de telescopio', icon: '🌌', desc: 'Grupos pequeños, mantas y diez minutos por persona delante del ocular. Irene explica lo que ven. Se pasa del tiempo siempre, y nadie se queja.', money: 1800 },
				polvo: { name: 'Lo que cae del cielo', icon: '✨', desc: 'Tras cada lluvia de estrellas, la loma amanece con granitos rojos entre la hierba. La mayoría es polvo. De vez en cuando, no.', money: 200,
					items: [{ id: 'stardust', perDay: 0.4 }, { id: 'starpiece', perDay: 0.06 }, { id: 'cometshard', perDay: 0.015 }] },
				piedras: { name: 'Piedras del círculo', icon: '🪨', desc: 'Los vecinos traen las piedras raras que encuentran entre los menhires. Irene las cataloga; las que no le sirven a la ciencia, se quedan en la caja de «sin catalogar». Algunas hacen evolucionar a ciertos Pokémon.',
					items: [{ id: 'moonstone', perDay: 0.05 }, { id: 'sunstone', perDay: 0.04 }, { id: 'dawnstone', perDay: 0.03 }, { id: 'duskstone', perDay: 0.03 }, { id: 'shinystone', perDay: 0.03 }, { id: 'icestone', perDay: 0.02 }] },
				cupula: { name: 'La cúpula grande', icon: '🌕', desc: 'La cúpula del ala vieja, con el telescopio de la universidad que nadie desmontó. Se ve más lejos y cae más cerca. Se cobra aparte.', locked: true, money: 600,
					items: [{ id: 'moonstone', perDay: 0.06 }, { id: 'starpiece', perDay: 0.08 }, { id: 'cometshard', perDay: 0.03 }, { id: 'moonball', perDay: 0.15 }] },
			},
			upgrades: [
				{ id: 'limpiar', name: 'Sacar a los Pidgey de la cúpula', cost: 3000, mult: { all: 1.1 },
					desc: 'Hay seis nidos dentro de la cúpula. Irene los ha catalogado. No los va a echar sin una casita de madera para cada uno, fuera. Seis casitas.' },
				{ id: 'pantallas', name: 'Lonas contra los focos del norte', cost: 9000, mult: { all: 1.15 }, set: { 'flag.p10_o_pantallas': true },
					desc: 'Los focos de la excavación manchan medio cielo. Unas lonas negras en la valla de la loma y, por fin, el norte vuelve a tener estrellas.' },
				{ id: 'bancos', name: 'Bancos y mantas', cost: 6000, mult: { visitas: 1.3 }, slots: 1,
					desc: 'Hasta ahora, los visitantes se sentaban en el suelo y en la escalera. Bancos de madera, mantas de lana de Vánitas y sitio para un Pokémon más trabajando.' },
				{ id: 'mesa', name: 'Una mesa de catalogar', cost: 12000, mult: { piedras: 1.5 }, store: 1,
					desc: 'Mesa larga, flexo, lupa y cajones con etiqueta. Las piedras dejan de vivir en una caja de zapatos. Más piedras catalogadas y un día más de almacén.' },
				{ id: 'telescopio', name: 'Un telescopio de verdad', cost: 18000, mult: { visitas: 1.4, polvo: 1.2 }, script: 'p10_up_telescopio',
					desc: 'El de ahora es de hace sesenta años y tiene una lente rajada que Irene llama «la cicatriz». Uno nuevo, con montura que sigue a las estrellas sola.' },
				{ id: 'cupula', name: 'Abrir la cúpula grande', cost: 32000, unlock: 'cupula', set: { 'flag.p10_o_cupula': true }, script: 'p10_up_cupula',
					desc: 'El ala vieja de la estación lleva treinta años cerrada. Engrasar la cúpula, cambiar la chapa y despertar al telescopio de la universidad. Abre una línea nueva.' },
				{ id: 'informe', name: 'Publicar el catálogo', cost: 25000, share: 10, need: ['telescopio'], script: 'p10_up_informe',
					desc: 'Imprenta, sellos y envíos a todas las bibliotecas de Kalos y Sinnoh. Con el observatorio en los boletines, la universidad aporta y tu parte sube 10 puntos.' },
				{ id: 'escritura', name: 'Comprarle la estación al pueblo', cost: 40000, share: 15, need: ['informe'],
					desc: 'La estación es de la junta de Crómlech, que la alquila por año. Comprada, nadie puede venderla a quien pague más por el tejado. Tu parte sube 15 puntos más.' },
			],
			jobs: { slots: 2, types: ['Psychic', 'Fairy', 'Rock'], favs: { clefairy: 0.06, clefable: 0.06, cleffa: 0.06, solrock: 0.08, lunatone: 0.08, minior: 0.08, bronzor: 0.05, bronzong: 0.05, natu: 0.04, xatu: 0.05, sigilyph: 0.05, elgyem: 0.05, beheeyem: 0.05, espeon: 0.04, umbreon: 0.04 },
				text: 'Girar el telescopio con la mente, guiar a los visitantes a oscuras, vigilar las piedras de la mesa o, sencillamente, mirar hacia arriba sin parpadear. Los que, según los libros, vinieron de las estrellas parecen estar en casa.' },
			managers: [
				{ npc: 'irene', desc: 'Lo lleva ella, con hora. Explica de más, cataloga de más y no tira nada. Con ella, la loma da más de lo que cae del cielo.', mult: { polvo: 1.15, piedras: 1.1 } },
				{ npc: 'handsome', cond: 'flag.b01_fin', wage: 200, mult: { visitas: 1.25 },
					desc: 'Viene de noche, disfrazado de astrónomo aficionado (gabardina, gorro de lana, barba postiza). Los visitantes lo adoran. Cobra en café.' },
				{ npc: 'simon', cond: 'flag.p7_simon', wage: 300, mult: { visitas: 1.15, cupula: 1.2 },
					desc: 'La «noche escéptica»: explica por qué cada luz rara no es un ovni. Casi siempre acierta. Cuando no, se enfada muchísimo, y eso también se vende.' },
			],
			eventRate: 0.7,
			events: [
				{ id: 'lluvia', name: 'Lluvia de estrellas', w: 3, npc: 'irene', cond: 'night',
					text: 'Esta noche hay lluvia de estrellas. Máximo a las dos y cuarto, más o menos. No: a las dos y once. Lo he recalculado. Tres veces. La pregunta es si abrimos al público o si las cuento yo sola, con hora, como debe ser.',
					options: [
						{ text: '«Cuéntalas tú. Con hora.»', result: 'Setenta y cuatro trazas en una hora, cada una con su minuto. Al amanecer, la loma está llena de granitos rojos y la libreta, de números.', effect: { boost: { mult: { polvo: 1.4 }, days: 2, label: 'Noche de recuento' } } },
						{ text: 'Pagar un autobús desde Yantra', cost: 1500, result: 'Llega un autobús lleno de gente con termos. Irene da la charla subida a un banco. Nadie mira el reloj, salvo ella.', effect: { money: 4200, boost: { mult: { visitas: 1.2 }, days: 2, label: 'Lo cuentan en Yantra' } } },
					] },
				{ id: 'focos', name: 'Los focos del norte', w: 3, npc: 'irene', cond: 'night && !flag.p10_o_pantallas',
					text: 'Otra vez. Los focos de la excavación encendidos toda la noche, apuntando hacia arriba. No hacia la excavación: hacia arriba. Medio cielo blanco. No sé qué iluminan. No me dejan acercarme a preguntarlo.',
					options: [
						{ text: '«Mira hacia el sur.»', result: 'Esa noche se mira hacia el sur. El sur está bien. El sur no tiene focos. Irene lo apunta todo con letra muy apretada.', effect: { boost: { mult: { all: 0.9 }, days: 2, label: 'Medio cielo' } } },
						{ text: 'Pagar unas lonas provisionales', cost: 1200, result: 'Dos lonas negras atadas a la valla de la loma. No tapan todo. Tapan lo suficiente para que vuelva el Dragón.', effect: { boost: { mult: { all: 1.1 }, days: 3, label: 'Lonas provisionales' } } },
					] },
				{ id: 'clefairy', name: 'Luna llena en el círculo', w: 2, npc: 'irene', cond: 'night',
					text: 'No hagas ruido. No hagas ruido aunque estés leyendo esto. Hay Clefairy dentro del círculo de menhires. Ocho. Están bailando alrededor de algo que brilla. Llevo cuarenta minutos sin respirar bien.',
					options: [
						{ text: 'Apagar la cúpula y mirar desde lejos', result: 'Bailan hasta que se pone la luna. Al irse, dejan en la hierba un polvo rojo que brilla un poco. Irene lo recoge con pinzas, sin pisar el círculo.', effect: { items: [{ id: 'stardust', n: 2 }], happy: 6 } },
						{ text: 'Dejarles un cesto de bayas', cost: 500, result: 'Los Clefairy rodean el cesto, se lo llevan entero y, en su lugar, dejan una piedra oscura con motas. Irene no la toca durante una hora. Luego sí.', effect: { items: [{ id: 'moonstone', n: 1 }] } },
						{ text: '«Que suban los visitantes a hacer fotos.»', result: 'Los Clefairy se van en cuanto ven la primera linterna. Las fotos salen movidas, pero se venden. Irene no dice nada en toda la mañana.', effect: { boost: { mult: { visitas: 1.15 }, days: 2, label: 'Fotos movidas' } } },
					] },
				{ id: 'ocular', name: 'El ocular', w: 2, npc: 'irene',
					text: 'Los niños de la escuela de Crómlech no llegan al ocular. Nadie más tiene ese problema. Nadie. Es un problema exclusivamente infantil. Ni una palabra.',
					options: [
						{ text: '«Bajen la montura un palmo.»', result: 'La bajan un palmo. Los niños llegan. Los adultos se agachan y se quejan de la espalda. Irene mira por el ocular sin ponerse de puntillas por primera vez y no comenta nada.' },
						{ text: 'Comprar una escalerita con barandilla', cost: 700, result: 'Tres peldaños, barandilla y una pegatina de Clefairy. Los niños hacen fila. Irene la usa cuando cree que nadie la ve.', effect: { boost: { mult: { visitas: 1.15 }, days: 3, label: 'Escalerita para todos' } } },
					] },
				{ id: 'vecina', name: 'La ventana de la señora', w: 2, npc: 'irene',
					text: 'Ha subido una señora del pueblo. Muy mayor. Dice que el telescopio apunta a su ventana. Le he explicado, con un diagrama, que el telescopio apunta a 41 grados sobre el horizonte y su ventana está a 2. No le ha convencido el diagrama.',
					options: [
						{ text: '«Invítala a mirar.»', result: 'La señora mira por el ocular, ve los anillos de un planeta y se sienta en el suelo de la impresión. Desde entonces sube todos los jueves con galletas.', effect: { boost: { mult: { visitas: 1.1 }, days: 3, label: 'Jueves de galletas' } } },
						{ text: 'Pagarle una cortina nueva', cost: 400, result: 'Cortina de flores, gruesa. La señora la cuelga y, a la semana, vuelve a subir: quiere saber qué se ve desde aquí que ella no ve desde abajo.', effect: { happy: 4 } },
					] },
				{ id: 'gabardina', name: 'Un astrónomo con gabardina', w: 2, npc: 'handsome', cond: 'night',
					text: 'Handsome no está aquí. Aquí hay un astrónomo aficionado de Pueblo Boceto que pasaba por la loma. El astrónomo quiere usar el telescopio esta noche. Para mirar la luna. Solo la luna. Por motivos personales.',
					options: [
						{ text: '«Que mire la luna.»', result: 'El astrónomo mira la luna cuarenta minutos, suspira y se va antes del amanecer. Deja en el banco una caja de macarons de Matière con una nota: «Para la doctora. De nadie».', effect: { happy: 5 } },
						{ text: 'Invitarlo a café y a una noche entera', cost: 600, result: 'Café, mantas y una noche entera. A las tres, el astrónomo se queda dormido con la barba postiza en el ocular. Los visitantes de la mañana creen que es parte de la visita y pagan el doble.', effect: { boost: { mult: { visitas: 1.25 }, days: 2, label: 'El astrónomo dormido' } } },
					] },
				{ id: 'minior', name: 'Una luz que cambia de rumbo', w: 2, npc: 'simon', cond: 'flag.p7_simon',
					text: 'Lo he visto. Una luz que cruza el cielo y cambia de rumbo tres veces. Tres. La doctora dice que es un Pokémon. Yo digo que es un fenómeno sin explicar hasta que alguien me lo explique. Quiero decirlo en antena. Con su permiso. O sin él.',
					options: [
						{ text: '«Dilo en antena.»', result: 'Lo dice. A la noche siguiente la loma se llena de gente buscando ovnis. Encuentran estrellas. Se quedan igual.', effect: { boost: { mult: { visitas: 1.2 }, days: 2, label: 'Busca ovnis' } } },
						{ text: 'Pagarle una noche en la cúpula para que lo compruebe', cost: 800, result: 'A las 3:40, la luz vuelve. Irene la enfoca: es un Minior, con la coraza rota, dando tumbos. Simón lo mira mucho rato. «Ni ovnis ni fantasmas. Un Minior y una doctora que tiene razón. Lo segundo me molesta más».', effect: { boost: { mult: { visitas: 1.15, cupula: 1.2 }, days: 3, label: 'Noche escéptica' } } },
					] },
				{ id: 'cometa', name: 'Un cometa', w: 1, npc: 'irene', cond: 'night', once: true,
					text: 'Hay un cometa. No lo había anunciado nadie. No sale en ningún catálogo. Es pequeño, verde y va a estar una semana. Lo vi a las 4:02. Llevo despierta desde entonces. No puedo dormir. No quiero.',
					options: [
						{ text: '«Que lo vea todo Crómlech.»', result: 'Durante una semana, el pueblo entero sube a la loma después de cenar. La última noche, algo pequeño cae en el prado del oeste. Irene lo encuentra al amanecer, todavía tibio.', effect: { items: [{ id: 'cometshard', n: 1 }], boost: { mult: { visitas: 1.4 }, days: 3, label: 'El cometa de Crómlech' } } },
						{ text: 'Pagar el anuncio en el periódico de Luminalia', cost: 2000, result: 'Sale en portada: «Una doctora de Sinnoh descubre un cometa desde Crómlech». Llegan visitantes de todo Kalos. Irene recorta la noticia y la guarda sin decir nada.', effect: { money: 6500 } },
					] },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ---------- Apertura ----------
		p10_obs_apertura: [
			{ set: { 'flag.p10_obs_visto': true } },
			{ text: 'En la loma del sur, fuera del círculo de menhires y lejos de las vallas del norte, está la vieja estación meteorológica de Crómlech: una caseta de piedra, una veleta torcida y una cúpula de chapa que alguien ha conseguido abrir a medias.' },
			{ text: 'Dentro, un telescopio muy viejo sobre un trípode. Delante del telescopio, un taburete. Encima del taburete, de puntillas, un sombrero de ala ancha con dos trenzas azules debajo.' },
			{ if: 'flag.b01_enc_irene_1', then: [
				{ say: 'irene', text: 'Ni una palabra sobre el taburete. —No se gira—. Es otro taburete. Es más alto. Eso tampoco lo comentes.' },
			], else: [
				{ say: 'irene', text: 'No toques el trípode. No me refiero a tu Pokémon. Esta vez me refiero a ti. —No se gira—. Hola, {jugador}. Te he reconocido por los pasos. Pisas como alguien que lleva mucho camino.' },
			] },
			{ say: 'irene', text: 'Volví a Crómlech hace tres semanas. Handsome me consiguió un permiso de la Policía Internacional para estudiar el pueblo. —Se baja del taburete. Le llega a tu hombro, más o menos—. Para mirar hacia arriba. Hacia abajo, ni con permiso.' },
			{ say: 'irene', text: 'Así que miro hacia arriba. Y resulta que es lo mismo. Los menhires no están puestos al azar: el mayor marca por dónde sale el sol el día más largo del año, y en su cara este hay tres dibujos que son tres grupos de estrellas. Es un calendario. Es una frase. Escrita en piedra y en cielo a la vez.' },
			{ say: 'irene', text: 'El cielo es la inscripción más vieja que existe. —Lo dice muy deprisa, como si llevara tiempo queriendo decírselo a alguien—. Y la única que nadie ha podido raspar.' },
			{ if: 'flag.b05_fin', then: [
				{ say: 'irene', text: 'Por cierto: me han llegado mediciones rarísimas de Alola. Del cielo. Tú estabas allí, ¿verdad? No me lo cuentes ahora. Cuéntamelo un día. Con hora.' },
			] },
			{ say: 'irene', text: 'Mira. —Te hace sitio en el taburete. No te subes; te agachas—. Esas cinco estrellas de ahí. Un palo vertical y una abajo, a la derecha, más brillante, como un pie. ¿Qué te recuerda?' },
			{ choice: [
				{ text: '«Una L. Como en LUZ.»', cond: 'flag.b03_irene_leccion', then: [
					{ af: { irene: 2 } },
					{ say: 'irene', text: '…Te acuerdas. —Se queda quieta—. Una L, sí. Los de aquí la llaman el pie del Arquero, pero es una L. Las letras que copiaron los Unown estaban en el cielo antes que en la piedra. Eso es una hipótesis. Mía. Me la acabas de confirmar sin querer.' },
				] },
				{ text: '«Una L.»', cond: '!flag.b03_irene_leccion', then: [
					{ af: { irene: 1 } },
					{ say: 'irene', text: 'Una L. Sí. El pie del Arquero, dicen aquí. Pero es una L. Tienes buen ojo. Para las letras, digo.' },
				] },
				{ text: '«No sé. ¿Me lo explicas más despacio?»', then: [
					{ af: { irene: 2 } },
					{ say: 'irene', text: '…Claro. —Lo explica otra vez, más despacio, dibujándolo en la libreta: el palo, el pie, la estrella brillante—. Es una L. La primera letra de LUZ. Hay quien piensa que los que tallaron las letras las copiaron de ahí arriba. Ese alguien soy yo.' },
				] },
				{ text: '«¿No llegas al ocular sin el taburete?»', then: [
					{ af: { irene: -1 } },
					{ say: 'irene', text: 'Llego perfectamente. El ocular está mal montado. Lleva mal montado sesenta años. —Cierra la libreta—. Era una L. Ya no te lo explico.' },
				] },
			] },
			{ say: 'irene', text: 'El problema. —Señala la cúpula; por la rendija entra un poco de viento—. La estación es de la junta del pueblo. Me la alquilan con mi sueldo de la Biblioteca, que da para el alquiler y para pan. El tejado gotea, la cúpula se atasca y hay seis nidos de Pidgey dentro que no pienso echar.' },
			{ say: 'irene', text: 'Y la junta dice que, si no le saco rendimiento, la vende a quien pague el tejado. —Se coloca el sombrero—. Así que he pensado en abrirla al público. Noches de telescopio. Catalogar lo que cae. Y necesito un socio. No, socio no. Un… colaborador con capital.' },
			{ if: LUC, then: [
				{ text: '{riolu} se ha sentado en el borde de la cúpula, con las patas colgando hacia fuera, y mira el cielo sin moverse. Irene lo mira a él un rato. Luego apunta algo. Con hora.' },
			] },
			{ say: 'irene', text: 'Te lo he dejado todo por escrito, en la mesa de la entrada. Presupuesto, mejoras, riesgos. Los riesgos ocupan dos páginas. La mayoría son el tejado.' },
			{ venture: V },
		],

		// ---------- Al entrar como socio (buy.script) ----------
		p10_obs_compra: [
			{ af: { irene: 2 } },
			{ text: 'Firmas en la última página. Irene firma debajo, con letra pequeña y muy recta, y escribe la hora al lado de las dos firmas. Luego se queda mirando el papel más rato del necesario.' },
			{ say: 'irene', text: 'Ya está. Ahora el observatorio es… nuestro. En un cuarenta por ciento. Tuyo, digo. El cuarenta. —Carraspea—. Las fracciones no se me dan mal. Es que no estoy acostumbrada a que alguien diga que sí a la primera.' },
			{ say: 'irene', text: 'Toma. Es la carta celeste del pueblo. La he dibujado yo. No es para que la cuelgues: es para que la uses. Si un día te pierdes en Kalos de noche, el Dragón está siempre al norte.' },
			{ give: 'p10_cartaceleste' },
			{ say: 'rotom', text: '¡Bzzt! Te guardo el observatorio en **Negocios**. ¡Y he aprendido una constelación! Bueno, la he fotografiado. Es casi lo mismo. ¡Bzzt!' },
			{ intel: { npc: 'irene', text: 'Ha vuelto a Crómlech con un permiso de la Policía Internacional. Alquila la vieja estación meteorológica de la loma del sur y estudia los menhires como un calendario del cielo. Eres socio del observatorio.' } },
			{ diary: 'Hoy mi entrenador{|a|e} se ha hecho socio de un observatorio. ¡En Crómlech! La doctora Irene ha vuelto y ahora mira las estrellas con un telescopio más viejo que yo. Dice que el cielo es una inscripción. A mí me parece un techo con agujeritos, pero no se lo he dicho. Me ha caído muy bien otra vez. ¡Bzzt!', cond: 'flag.b01_diario' },
		],

		// ---------- Irene en la loma (repetible) ----------
		p10_irene_noche: [
			{ set: { 'flag.p10_irene_charla': true } },
			{ text: 'Irene está sentada en el escalón de la estación, envuelta en una manta, con la libreta en las rodillas y el sombrero echado hacia atrás para ver el cielo entero.' },
			{ if: '!' + SOCIO, then: [
				{ say: 'irene', text: 'Esta noche hay buen cielo. Lástima que la cúpula se atasque. —No te mira—. El presupuesto sigue en la mesa de la entrada. No te estoy presionando. Te estoy informando. Con hora: las… ahora.' },
			], else: [
				{ if: '!flag.p10_o_pantallas', then: [
					{ say: 'irene', text: 'El norte, otra vez blanco. Los focos. —Señala la valla con el lápiz—. El Dragón está ahí detrás. Lo sé porque siempre está. Que no se vea no quiere decir que no esté.' },
				], else: [
					{ say: 'irene', text: 'Mira el norte. ¿Lo ves? El Dragón, entero. Con las lonas se ve hasta la cola. —Sonríe sin darse cuenta—. Llevaba un mes dibujándolo de memoria.' },
				] },
				{ say: 'irene', text: 'El Arquero, al este. El Cáliz se esconde en otoño. El Dragón no se esconde nunca. —Lo dice como quien recita una declinación—. Tres frases. Una para el año entero.' },
			] },
			{ choice: [
				{ text: 'Sentarte a su lado y mirar un rato.', then: [
					{ text: 'Te sientas en el escalón. No dice nada. Tú tampoco. Al cabo de un rato, te pasa la mitad de la manta sin mirarte y sigue escribiendo.' },
					{ text: '{riolu} se acurruca a tus pies y se queda dormido mirando hacia arriba.', cond: LUC },
				] },
				{ text: '«¿Qué estás apuntando?»', then: [
					{ say: 'irene', text: 'La hora. La temperatura. Las estrellas que se ven y las que no. Lo que dice la gente que sube. —Pasa una página—. Hace un rato, un niño ha dicho que la luna parece una galleta mordida. Eso también lo he apuntado. Es un dato.' },
				] },
				{ text: 'Despedirte.', then: [
					{ say: 'irene', text: 'Buenas noches, {jugador}. —Mira el reloj y lo apunta—. Las… ahora. Ya está.' },
				] },
			] },
		],
		p10_irene_dia: [
			{ set: { 'flag.p10_irene_charla': true } },
			{ text: 'De día, la cúpula está cerrada y la estación huele a café y a papel. Irene está en la mesa de la entrada, rodeada de piedras con etiqueta, con una lupa en un ojo.' },
			{ if: '!' + SOCIO, then: [
				{ say: 'irene', text: 'De día no se ve nada. Bueno, se ve el sol, pero no se mira. Primera regla de la astronomía. —Se quita la lupa—. Vuelve de noche. O lee el presupuesto, que está aquí mismo, encima de una Piedra Lunar.' },
			], else: [
				{ say: 'irene', text: 'Los vecinos me siguen trayendo piedras. Esta la encontró un niño junto al menhir de la fuente. Esta, una señora en su huerto. Esta… no sé de dónde es. Me la dejaron en la puerta. Con una nota: «para la doctora bajita».' },
				{ say: 'irene', text: 'He tachado «bajita». —Te enseña la nota. Está tachado tres veces—. Y he catalogado la piedra. Es una Piedra Alba. Muy bonita. El remitente sigue siendo un maleducado.' },
			] },
			{ if: 'flag.p10_o_cupula', then: [
				{ say: 'irene', text: 'Ah, y la anciana de la casa del pozo ha vuelto a subir a la cúpula grande. Dice que desde que la abrimos duerme mejor. No veo la relación. La he apuntado igual.' },
			] },
		],

		// ---------- Mejoras con escena ----------
		p10_up_telescopio: [
			{ text: 'El telescopio nuevo llega en tres cajas y lo suben entre cuatro vecinos. Irene supervisa el montaje con un destornillador en cada mano y no deja que nadie toque la lente.' },
			{ say: 'irene', text: 'Hay una tradición: el primero que mira por un telescopio nuevo le pone nombre a lo primero que ve. —Se aparta del ocular—. Me la acabo de inventar. Pero a partir de ahora existe. Mira tú.' },
			{ text: 'Miras. Una estrella pequeña, temblorosa, que no habías visto nunca. Irene apunta en la libreta el nombre que le dices sin decirte si le parece bien. Luego, debajo, escribe la hora.' },
			{ say: 'irene', text: 'El viejo, «la cicatriz», se queda en la ventana. Mirando hacia fuera. —Lo dice muy seria—. Sesenta años trabajando. Se ha ganado ver el cielo sin que nadie le meta un ojo.' },
		],
		p10_up_cupula: [
			{ text: 'La cúpula del ala vieja chirría como un barco al girar. Entre el polvo y la chapa nueva aparece el telescopio de la universidad, grande como un cañón, con una funda de lona que alguien cosió a mano hace treinta años.' },
			{ say: 'anciana_cromlech', as: 'Anciana de Crómlech', text: 'Ay, la cúpula grande. Cuando yo era niña, el señor de la universidad nos dejaba mirar los domingos. Yo vi ahí un planeta con anillos. Pensé que era un sombrero.' },
			{ say: 'irene', text: 'Es un planeta. Gaseoso. —Pausa—. Pero sí. Parece un sombrero. —Se toca el suyo sin darse cuenta—. Suba cuando quiera, señora. Los domingos. Y entre semana también.' },
		],
		p10_up_informe: [
			{ text: 'Llega una caja de la imprenta de Yantra con cien boletines de tapas azules. Irene abre el primero, lo huele, lo cierra y lo vuelve a abrir.' },
			{ say: 'irene', text: 'Mi primer catálogo sin una sola nota a pie de página de otra persona diciendo que me equivoco. —Te da uno—. El tuyo. Lee los agradecimientos. No. Mejor no los leas. Bueno, sí. Pero no delante de mí.' },
			{ give: 'p10_catalogo' },
		],
	},
};
