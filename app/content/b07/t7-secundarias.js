// Bloque 7 · Secundarias de profundidad (añadidas el 2026-10-31, sin tocar lo publicado).
// Dos misiones en zonas del B7 que ya existen, con NPCs que han salido poco:
//   · b07_s_perdidos «Objetos perdidos» (Agnes, estación de Pistón) · devolver tres objetos: Sonia (Par), Nate (Hoyuelo)
//     y la consigna 12 (cerradura `lock`) → Priya (Pistón). ~30 min. Objeto para leer: `hojaagnes`.
//   · b07_s_cesped «Muchos verdes» (Gareth, El Campo de Hoyuelo) · tres hierbas: Terrazas (cosecha `catch`), Pradera
//     Radiante (escena) y el césped viejo del estadio (rastreo `aura` con {riolu}) → siembra y partido amistoso con
//     Gareth (cura antes). ~35 min. Objeto para leer: `libretagareth`; premio `b07_mt_campo_hierba` (única fuente).
// Las dos se abren tras la cena en casa de Rhi (`flag.b07_casa_rhi`, T3), siguen abiertas tras `b07_fin` y no
// adelantan trama: solo leen decisiones ya vividas (Merengue, Rhi, la Liga de los Oficios, la Sopa Maxi).
// Los spots van en `extraSpots` (lugares de otros tramos de este mismo bloque).

const LUC = '(inParty("riolu") || inParty("lucario"))';
const PURG = 'flag.b06_eco_purgado';
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado';
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';
const CENA = 'flag.b07_casa_rhi';
const DOLIDA = 'flag.b07_rhi_dolida && !flag.b07_rhi_reparada';

// ---- Objetos perdidos ----
const PERD = 'quest.b07_s_perdidos == "devolver"';
const PERD_TRES = 'flag.b07_perd_sonia && flag.b07_perd_nate && flag.b07_perd_priya';
const PERD_CIERRA = { if: PERD_TRES, then: [{ quest: 'b07_s_perdidos', stage: 'volver' }, { toast: 'Los tres objetos han vuelto a sus dueños. Agnes te espera en la estación de Pistón.' }] };

// ---- Muchos verdes ----
const CESP = 'quest.b07_s_cesped == "semillas"';
const CESP_TRES = 'flag.b07_cesped_terrazas && flag.b07_cesped_pradera && flag.b07_cesped_estadio';
const CESP_CIERRA = { if: CESP_TRES, then: [{ quest: 'b07_s_cesped', stage: 'campo' }, { toast: 'Ya tienes las tres hierbas. Gareth te espera en El Campo.' }] };

export default {
	items: {
		cuadernosonia: { name: 'Cuaderno con tres bolígrafos', pocket: 'key', desc: 'Un cuaderno de tapas verdes con tres bolígrafos atados con una goma: rojo, azul y negro. Por dentro, letra rapidísima y dibujos de espadas. Lleva una etiqueta de objetos perdidos: «Línea de Par · último tren».' },
		cojinnate: { name: 'Cojín de Snorlax', pocket: 'key', desc: 'Un cojín enorme con forma de Snorlax, aplastado de un lado, como si alguien hubiera dormido encima muchas horas. Lleva una etiqueta de objetos perdidos: «17:12 · andén 1 · el martes».' },
		lataespecias: { name: 'Lata sellada con cera', pocket: 'key', desc: 'Una lata de especias sin etiqueta, cerrada con cera roja. Huele a cúrcuma, a clavo y a algo tostado que no sabes nombrar. En la tapa, a punzón: «Para P., cuando aprenda».' },
		tepeviejo: { name: 'Tepe del césped viejo', pocket: 'key', desc: 'Un trozo de césped del antiguo Estadio de Hoyuelo, envuelto en tela húmeda. Casi todo el rollo estaba muerto. Este trozo, no.' },
		hojaagnes: { name: 'Hoja del cuaderno de Agnes', pocket: 'key', desc: 'Una hoja arrancada del cuaderno de objetos perdidos de la estación de Pistón. Agnes no arranca hojas. Esta, sí.',
			read: 'ESTACIÓN DE PISTÓN · OBJETOS PERDIDOS · HOJA 212\n\n—\n\nCuaderno de tapas verdes, con tres bolígrafos atados. Línea de Par, último tren antes del cierre. Dueña: chica pelirroja, se durmió en el vagón 2, se bajó corriendo. No volvió a preguntar. *La línea cerró. Ella no tenía por dónde volver.*\nDevuelto. En mano. Par.\n\n—\n\nCojín grande, forma de Snorlax. 17:12, andén 1. Dueño: chico alto, ojeras, durmió de Pistón a Hoyuelo sin cambiar de postura. No vino a por él. *Habrá pensado que venir era más cansado que perderlo. Tenía razón.*\nDevuelto. En mano. Hoyuelo.\n\n—\n\nConsigna 12. Una lata sellada con cera. Pagada por adelantado, veinte años. Una nota: «Para P., cuando aprenda». Dueña: desconocida. Destinataria: desconocida.\n*Diecinueve años en la consigna. Le faltaba un año para caducar. Ha llegado a tiempo.*\nEntregada. En mano. Pistón.\n\n—\n\nObservaciones de la guardagujas: tres líneas cerradas en un día. No pasaba desde 2011.\nLas cosas llegan a donde tienen que llegar. A veces tarde. Pero llegan.\n\n—A. T.' },
		libretagareth: { name: 'Libreta del césped (2004)', pocket: 'key', desc: 'Una libreta de tapas de cartón, hinchada de humedad, con el lomo pegado con cinta. En la portada, a rotulador: «CÉSPED · ESTADIO DE HOYUELO · 2004». Dentro hay cuentas, fechas y un dibujo del campo en cada página.',
			read: 'CÉSPED · ESTADIO DE HOYUELO\n(libreta de Gareth Hargreave, páginas sueltas)\n\n—\n\n3 de marzo. Helada. La banda norte no ha despertado. No la piso. Le hablo un rato. Nada. Mañana.\n\n4 de marzo. Ha despertado.\n\n—\n\n18 de mayo. Los Wooloo del vecino se han colado otra vez por el córner sur. Se han comido un metro cuadrado. Lo marco con cal. No lo resiembro: si les gusta tanto, será que está bueno.\n\n—\n\n9 de agosto. Mezcla nueva: un tercio de hierba de los bancales de la abuela de Percy, un tercio de la Pradera, un tercio de la que ya había. *Muchos verdes.* El árbitro de hoy ha dicho que es el mejor césped de Galar. No le he dicho que es mitad prestado.\n\n—\n\n2 de octubre. Primer partido de Rhi en el campo grande. Seis años. Ha metido un gol en el córner sur y se ha tirado de rodillas. Calva nueva. La dejo.\n\n—\n\n(Última página, con otra tinta, mucho más reciente.)\n\nHan vendido el estadio. Mañana arrancan la hierba. He pedido quedarme un rollo. Me han dicho que no. Me he quedado una maceta.\n\nNo es culpa de nadie.\n\n(Debajo, con la letra nueva, de hace unos días.)\n\nEl rollo que tiraron detrás de la grada norte no estaba muerto entero. Lo ha encontrado {jugador}. Con {riolu}. Sembrado en la banda del Campo, junto al córner sur. Muchos verdes otra vez.\nTardará un año. Que tarde.' },
		b07_mt_campo_hierba: { name: 'MT Campo de Hierba', pocket: 'machines', tm: 'grassyterrain', desc: 'Cubre el campo de hierba durante cinco turnos: cura un poco a los que pisan el suelo y refuerza los movimientos de tipo Planta. Regalo de Gareth Hargreave, de El Campo de Hoyuelo.' },
	},

	quests: {
		b07_s_perdidos: { name: 'Objetos perdidos', type: 'side', est: 30, stages: {
			devolver: '**Agnes**, en la **estación de Pistón**, guarda tres objetos sin devolver: uno es de alguien de **Pueblo Par** y otro de alguien de **Hoyuelo**. El tercero sigue en la **consigna 12**, que no abre.',
			volver: 'Los tres objetos han vuelto a sus dueños. **Agnes** quiere cerrar las tres líneas de su cuaderno en persona, en la **estación de Pistón**.',
			hecha: 'Tres líneas cerradas en el cuaderno de Agnes. En Pistón dicen que no pasaba desde 2011.',
		},
		parts: { title: 'Lo que hay que devolver', items: [
			{ label: 'El cuaderno de los tres bolígrafos', where: 'lab_sonia', done: 'flag.b07_perd_sonia', got: 'has("cuadernosonia")', hint: 'Una chica pelirroja que escribe con tres bolígrafos a la vez lo perdió en el último tren de **Par**. En Par, una torre con antena.', gotHint: 'Llévaselo a **Sonia**, a su laboratorio de **Pueblo Par**.' },
			{ label: 'El cojín de Snorlax', where: 'casa_rhi', done: 'flag.b07_perd_nate', got: 'has("cojinnate")', hint: 'Lo dejó un chico que durmió de Pistón a **Hoyuelo** sin moverse. Agnes cree que sigue sin moverse.', gotHint: 'Llévaselo a **Nate**, al sofá de la **casa de los Hargreave**, en **Hoyuelo**.' },
			{ label: 'La lata de la consigna 12', where: 'curri_piston', done: 'flag.b07_perd_priya', got: 'has("lataespecias")', hint: 'La **consigna 12** de la **estación de Pistón** no abre desde hace años. Agnes sabe la secuencia de las luces. Más o menos.', gotHint: '«Para P., cuando aprenda». Huele a cúrcuma. En **Pistón**, alguien sabe de cúrcuma más que nadie.' },
		] } },
		b07_s_cesped: { name: 'Muchos verdes', type: 'side', est: 35, stages: {
			semillas: '**Gareth**, en **El Campo** de Hoyuelo, quiere sembrar una franja con el césped de antes. Tráele tres hierbas: de las **Terrazas**, de la **Pradera Radiante** y del césped viejo del **Estadio de Hoyuelo**.',
			campo: 'Ya tienes las tres hierbas. Llévaselas a **Gareth**, a **El Campo** de Hoyuelo. Quiere sembrarlas y estrenarlas con un partido de los de antes. Juega en serio.',
			hecha: 'La franja de muchos verdes ya está sembrada en El Campo. Gareth dice que tardará un año. Lo dice contento.',
		},
		parts: { title: 'Las tres hierbas', items: [
			{ label: 'Hierba de los bancales', where: 'terrazas_hoyuelo', done: 'flag.b07_cesped_terrazas', hint: 'Los bancales de las **Terrazas de Hoyuelo** los hizo la abuela de Percy. Su hierba crece entre los huertos.' },
			{ label: 'Hierba de la Pradera', where: 'pradera_radiante', done: 'flag.b07_cesped_pradera', hint: 'En la **Pradera Radiante** del **Área Silvestre**, junto al roble viejo, la hierba aguanta todos los tiempos de Galar.' },
			{ label: 'El césped viejo del estadio', where: 'estadio_hoyuelo', done: 'flag.b07_cesped_estadio', hint: 'Al quitarlo, tiraron el césped viejo detrás de la grada del **Estadio de Hoyuelo**. Casi todo está muerto. Hace falta el olfato de {riolu}.' },
		] } },
	},

	trainers: {
		// Amistoso opcional de Gareth (ex entrenador). Nivel de un amistoso de Hoyuelo (como nate_1): as 68, resto 66–67.
		b07_cesped_gareth: { name: 'Gareth', cls: 'Padre de Rhi', npc: 'padre_rhi', ai: 3, iv: 25, reward: 4000, bg: 'ranch',
			team: [
				{ sp: 'dubwool', lv: 66, moves: ['cottonguard', 'bodypress', 'doubleedge', 'zenheadbutt'], ability: 'fluffy', nature: 'bold' },
				{ sp: 'torkoal', lv: 66, moves: ['flamethrower', 'earthpower', 'yawn', 'protect'], ability: 'whitesmoke', nature: 'calm' },
				{ sp: 'mudsdale', lv: 67, moves: ['highhorsepower', 'heavyslam', 'rockslide', 'closecombat'], ability: 'stamina', nature: 'adamant' },
				{ sp: 'gogoat', lv: 68, moves: ['hornleech', 'earthquake', 'bulkup', 'milkdrink'], ability: 'sapsipper', item: 'sitrusberry', nature: 'adamant', iv: 28 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Hace quince años que no juego un partido. —Se arremanga—. Bueno. Doce. Bueno. Desde el martes. Pero ese no cuenta.',
			win: 'Ya está. Pisado. —Mira la franja recién sembrada—. Así agarra. Un césped que no se pisa se pone vago.',
			lose: 'Vaya. —Se rasca el bigote—. No lo cuentes en casa. Rhi se pondría insoportable de contenta.' },
	},

	extraSpots: {
		// =================== OBJETOS PERDIDOS ===================
		estacion_piston: [
			{ label: 'La ventanilla de objetos perdidos', sub: 'Junto a la garita. Una balda llena de etiquetas', icon: '🧳', cond: CENA + ' && !done.b07_s_perdidos', new: '!quest.b07_s_perdidos || quest.b07_s_perdidos == "volver"', talk: [
				{ cond: '!quest.b07_s_perdidos', script: 'b07_perd_inicio' },
				{ cond: 'quest.b07_s_perdidos == "volver"', script: 'b07_perd_final' },
				{ script: 'b07_perd_espera' },
			] },
			{ label: 'La consigna 12', sub: 'Una taquilla de hierro con seis luces apagadas', icon: '🔒', cond: PERD + ' && !has("lataespecias") && !flag.b07_perd_priya', new: 'true', talk: [{ script: 'b07_perd_consigna' }] },
			{ label: 'La balda de objetos perdidos', sub: 'Tres huecos vacíos y una hoja de menos', icon: '🧳', cond: 'done.b07_s_perdidos', talk: [{ script: 'b07_perd_despues' }] },
		],
		lab_sonia: [
			{ label: 'Devolverle el cuaderno a Sonia', sub: 'Tapas verdes y tres bolígrafos con una goma', icon: '📓', cond: 'has("cuadernosonia") && !flag.b07_perd_sonia', new: 'true', talk: [{ script: 'b07_perd_sonia' }] },
		],
		casa_rhi: [
			{ label: 'Devolverle el cojín a Nate', sub: 'Un Snorlax de tela, aplastado de un lado', icon: '🛋️', cond: 'has("cojinnate") && !flag.b07_perd_nate', new: 'true', talk: [{ script: 'b07_perd_nate' }] },
		],
		curri_piston: [
			{ label: 'Enseñarle la lata a Priya', sub: '«Para P., cuando aprenda»', icon: '🫙', cond: 'has("lataespecias") && !flag.b07_perd_priya', new: 'true', talk: [{ script: 'b07_perd_priya' }] },
		],

		// =================== MUCHOS VERDES ===================
		campo_hargreave: [
			{ label: 'Gareth, junto a la caseta', sub: 'Un saco de semillas vacío y una idea', icon: '🌱', cond: 'flag.b07_campo && !done.b07_s_cesped', new: '!quest.b07_s_cesped || quest.b07_s_cesped == "campo"', talk: [
				{ cond: '!quest.b07_s_cesped', script: 'b07_cesped_inicio' },
				{ cond: 'quest.b07_s_cesped == "campo"', script: 'b07_cesped_siembra' },
				{ script: 'b07_cesped_espera' },
			] },
			{ label: 'La franja de muchos verdes', sub: 'Junto al córner sur, con un cordel y cuatro estacas', icon: '🌱', cond: 'done.b07_s_cesped', talk: [{ script: 'b07_cesped_despues' }] },
		],
		terrazas_hoyuelo: [
			{ label: 'La hierba de los bancales', sub: 'Entre los huertos, más verde que en ningún sitio', icon: '🌾', cond: CESP + ' && !flag.b07_cesped_terrazas', new: 'true', talk: [{ script: 'b07_cesped_terrazas' }] },
		],
		pradera_radiante: [
			{ label: 'La hierba junto al roble viejo', sub: 'Aplastada por la lluvia, de pie al rato', icon: '🌿', cond: CESP + ' && !flag.b07_cesped_pradera', new: 'true', talk: [{ script: 'b07_cesped_pradera' }] },
		],
		estadio_hoyuelo: [
			{ label: 'Detrás de la grada norte', sub: 'Rollos de césped viejo, secos, bajo una lona', icon: '🐾', cond: CESP + ' && !flag.b07_cesped_estadio && ' + LUC, new: 'true', talk: [{ script: 'b07_cesped_estadio' }] },
			{ label: 'Detrás de la grada norte', sub: 'Rollos y rollos de césped seco. ¿Cuál vive?', icon: '🍂', cond: CESP + ' && !flag.b07_cesped_estadio && !' + LUC, talk: [{ script: 'b07_cesped_sin_aura' }] },
		],
	},

	scripts: {
		// ======================================================================
		// OBJETOS PERDIDOS (Agnes)
		// ======================================================================
		b07_perd_inicio: [
			{ text: 'Junto a la garita del cambio de agujas hay una ventanilla pequeña con un cartel pintado a mano: «OBJETOS PERDIDOS · SE DEVUELVE TODO». Detrás, una balda con paraguas, bufandas de hinchas, un balón y tres cosas con la etiqueta en rojo.' },
			{ say: 'agnes', cond: '!flag.b07_agnes_visto', text: 'Agnes Tull. Guardagujas. Y, los martes y los jueves, objetos perdidos. —No levanta la vista del cuaderno—. Usted es de la Gira. Lleva el pase colgado. Todos lo llevan torcido.' },
			{ say: 'agnes', cond: 'flag.b07_agnes_visto && !flag.b07_oficio_aguja', text: 'Usted otra vez. —Apunta algo—. No vengo a hablarle de la Liga. Esto es otra cosa. Esto es la balda.' },
			{ say: 'agnes', cond: 'flag.b07_oficio_aguja', text: 'Ya tiene mi palabra. Esto no es de la Liga. Esto es la balda. —Golpea la madera con el lápiz—. Y la balda no da sellos.' },
			{ say: 'agnes', text: 'La estación de Pistón devuelve todo. Tarde, pero todo. Paraguas, bufandas, dentaduras. Un Wooloo, una vez. Casi todo lo vienen a buscar. Lo que no, lo busco yo.' },
			{ say: 'agnes', text: 'Estas tres no las he podido cerrar. —Señala las etiquetas rojas—. Un cuaderno del último tren de Par, antes de que cerraran la línea. Un cojín del de las 17:12 a Hoyuelo, del martes. Y la consigna 12, que lleva diecinueve años cerrada y no abre.' },
			{ say: 'agnes', text: 'Yo no puedo dejar la garita. Si dejo la garita, los trenes llegan a la hora igual, pero yo no me entero. Usted viaja. Lléveselas.' },
			{ prompt: '¿Ayudar a Agnes con la balda?', choice: [
				{ text: 'Llevarlas a sus dueños', then: [
					{ quest: 'b07_s_perdidos', stage: 'devolver' },
					{ give: 'cuadernosonia' },
					{ give: 'cojinnate' },
					{ say: 'agnes', text: 'El cuaderno es de una chica pelirroja que escribe con tres bolígrafos. Se durmió en el vagón 2 y se bajó corriendo en Par. Luego cerraron la línea. No tenía por dónde volver a preguntar.' },
					{ say: 'agnes', text: 'El cojín, de un chico alto con ojeras. Durmió de aquí a Hoyuelo sin cambiar de postura. No vino a buscarlo. Habrá pensado que venir cansaba más que perderlo.' },
					{ say: 'agnes', text: 'Lo de la consigna, cuando quiera. La taquilla está ahí. Se abre con la secuencia de las luces, como las señales de vía. La sé. Más o menos. Tengo ochenta secuencias en la cabeza y esa es de las viejas.' },
					{ intel: { npc: 'agnes', text: 'Agnes Tull lleva también los objetos perdidos de la estación de Pistón («se devuelve todo»). Apunta cada objeto en su cuaderno y no cierra la línea hasta devolverlo en mano.' } },
				] },
				{ text: 'Ahora no', then: [{ say: 'agnes', text: 'Llevan años en la balda. Un día más no las mata. —Pasa una página—. A mí, tampoco.' }] },
			] },
		],
		b07_perd_espera: [
			{ say: 'agnes', text: 'La balda sigue igual hasta que usted diga lo contrario. Lo apuntado se cierra en persona. Por carta, no. Por teléfono, menos.' },
			{ say: 'agnes', cond: 'has("cuadernosonia")', text: 'El cuaderno: chica pelirroja, Par. Una torre con una antena. Si no está en la torre, está debajo de algún libro.' },
			{ say: 'agnes', cond: 'has("cojinnate")', text: 'El cojín: chico con ojeras, Hoyuelo. Bajó con dos que hablaban de fútbol a gritos. Pregunte en casa de los que gritan.' },
			{ say: 'agnes', cond: '!flag.b07_perd_priya && !has("lataespecias")', text: 'La consigna 12 está ahí. Seis luces. Las enciendo yo, usted las repite. No es difícil. Es largo.' },
			{ say: 'agnes', cond: 'has("lataespecias")', text: 'La lata. «Para P., cuando aprenda». No sé quién es P. No sé qué tenía que aprender. Huela la lata. Yo ya la he olido. En Pistón solo hay una persona que huele así.' },
		],
		b07_perd_consigna: [
			{ text: 'La consigna 12 es la última de la fila: hierro verde, una placa con el número y seis bombillas pequeñas en la puerta, de las que se usaban antes de las llaves. Pegada con cinta, una nota amarilla: «Pagada hasta el año que viene. Para P., cuando aprenda».' },
			{ say: 'agnes', text: 'Las viejas se abren así: yo enciendo las luces en orden, usted las repite. Se equivoca dos veces y se traba un rato. —Se pone las gafas de cerca—. No tenga prisa. La lata lleva diecinueve años sin tenerla.' },
			{ say: 'rotom', cond: '!' + PURG, text: '¡Bzzt! ¡Una cerradura de luces! ¡Esto es como un juego de memoria, pero con hierro! Yo me lo apunto también, por si acaso.' },
			{ say: 'rotom', cond: PURG, text: 'Luces. En orden. Me lo apunto.' },
			{ minigame: { type: 'lock', id: 'b07_perd_consigna', title: 'La consigna 12', theme: 'caja', level: 2,
				hint: 'Agnes enciende las luces una a una. Repite el orden. Cada cerrojo añade una luz más.',
				guaranteed: ['lataespecias'], loot: [{ id: 'stardust', w: 3 }, { id: 'pearl', w: 2 }], picks: 1, consolation: false, lootTitle: 'Dentro de la consigna 12' },
				onWin: [
					{ text: 'La puerta se abre con un clac de hace diecinueve años. Dentro, en el centro de la balda de hierro, una lata sin etiqueta cerrada con cera roja. Huele a cúrcuma desde aquí.' },
					{ say: 'agnes', text: 'Ahí está. —No sonríe. Casi—. Ahora falta lo difícil: P. Yo he hecho mi parte. La luz era de las viejas. Me la sabía. Más o menos.' },
				],
				onLose: [{ say: 'agnes', text: 'Trabada. Pasa. A mí me pasó en 1998 con la consigna 4. —Apunta algo—. Vuelva cuando quiera. Las luces no se cansan.' }],
				onQuit: [{ say: 'agnes', text: 'Cuando quiera. La taquilla no se va a ninguna parte. Está atornillada.' }],
			},
		],
		b07_perd_sonia: [
			{ if: '!has("cuadernosonia")', then: [{ end: true }] },
			{ text: 'Sonia está subida a la escalera de caracol, buscando algo en el estante más alto. Al ver las tapas verdes, se le cae el libro que tenía en la mano. El Yamper ladra una vez, por educación.' },
			{ say: 'sonia', text: '¡Mi cuaderno! ¡El del último tren! —Baja la escalera de dos en dos—. Lo di por perdido hace dos años. Mi abuela me dijo que algún día perdería la cabeza, y yo le dije que la cabeza no, que el cuaderno sí. Tenía razón a medias.' },
			{ say: 'sonia', text: 'Iba dormida. Era el último tren de la línea de Par antes del cierre, y me desperté en la estación y salí corriendo, y luego ya no había tren para volver. ¿Quién lo ha guardado dos años?' },
			{ say: 'jugador', text: 'Agnes, la guardagujas de Pistón.' },
			{ say: 'sonia', text: 'Claro. Claro que ella. —Abre el cuaderno. Pasa las hojas con cuidado, como quien busca una foto—. Mis primeras notas del tapiz. Las escribí con tres colores porque no sabía qué parte era importante. Sigo sin saberlo. Pero ahora lo sé en tres colores.' },
			{ say: 'sonia', cond: 'flag.b07_fin', text: 'Después de lo que pasó en Artejo, hay cosas de la leyenda que quiero volver a leer con calma. Me viene muy bien. Gracias. De verdad.' },
			{ take: 'cuadernosonia' },
			{ set: { 'flag.b07_perd_sonia': true } },
			{ say: 'sonia', text: 'Toma, para la Gira. Me los dio mi abuela «para los de fuera». Tú eres de fuera. Y dile a Agnes que el cuaderno ha llegado. Bueno, se lo dirás. Es su trabajo y el tuyo.' },
			{ give: 'expcandym', n: 2 },
			PERD_CIERRA,
		],
		b07_perd_nate: [
			{ if: '!has("cojinnate")', then: [{ end: true }] },
			{ text: 'Nate sigue en el sofá. Tiene la cabeza apoyada en el reposabrazos, en un ángulo que no parece cómodo. Al ver el cojín, abre un ojo. Luego el otro, que en él es mucho.' },
			{ say: 'nate', text: 'Mi cojín. —No se mueve—. Lo dejé en el tren. Lo sabía. Lo sabía desde el andén. Y pensé: «Ir a buscarlo». Y luego pensé: «Qué flojera». Y gané yo.' },
			{ say: 'nate', text: 'Me lo has traído desde Pistón. —Se lo pone debajo de la cabeza, por fin en el ángulo bueno. Suspira entero—. Esto es lo más bonito que ha hecho alguien por mí este año. Y Rhi me hizo una tarta.' },
			{ say: 'nate', cond: 'flag.b07_nate_vencido', text: 'Ahora que lo pienso, te perdí un combate sin cojín. Con cojín no sé qué habría pasado. Seguramente lo mismo. Pero más cómodo.' },
			{ say: 'nate', cond: 'flag.b07_rhi_vencida_7', text: 'Rhi sigue hablando del partido del estadio. A mí. Por la noche. Ahora por lo menos la escucho bien apoyado.' },
			{ take: 'cojinnate' },
			{ set: { 'flag.b07_perd_nate': true } },
			{ say: 'nate', text: 'Te debo una. No te la voy a pagar, eh. Pero te la debo. Que conste. —Cierra los ojos—. Dale las gracias a la señora del cuaderno. Mañana. O pasado.' },
			PERD_CIERRA,
		],
		b07_perd_priya: [
			{ if: '!has("lataespecias")', then: [{ end: true }] },
			{ text: 'Priya remueve tres ollas con una sola mano. Dejas la lata en la barra. Antes de mirarla, la huele. Deja el cucharón dentro de la olla, que no ha soltado en todo el día.' },
			{ say: 'priya', text: '¿De dónde has sacado esto? —Lo dice muy bajo. En ella, muy bajo es como hablar normal—. No. Ya sé de dónde. «Para P., cuando aprenda». Es su letra. Le temblaba la «a».' },
			{ say: 'priya', text: 'Mi maestra. La que tenía esta taberna antes que yo. El primer día me echó de la cocina: «Vuelve cuando aprendas». Volví a los dos años, con las manos quemadas y la cabeza llena de recetas. Ya se había ido al sur, con su hija. Sin señas.' },
			{ say: 'priya', text: 'Y me había dejado esto. En la consigna. Pagado por adelantado. —Pasa el dedo por la cera sin romperla—. Me lo dejó antes de que yo aprendiera. Ella confiaba más que yo.' },
			{ text: 'Gaspar, en la cocina, deja de remover. Por primera vez desde que le conoces, no apunta nada en su cuaderno.', cond: 'flag.b07_gaspar_curri' },
			{ say: 'priya', text: 'Hoy no la abro. Hoy la huelo. La abriré el día que haga un curri que se acuerden en Artejo. —Se ríe, y la risa le sale un poco rota—. O sea, mañana.' },
			{ take: 'lataespecias' },
			{ set: { 'flag.b07_perd_priya': true } },
			{ say: 'priya', text: 'Toma. De la Pradera, del roble viejo. Las buenas huelen a tormenta. Tú sabrás qué hacer con ella.' },
			{ say: 'priya', cond: 'flag.b07_sopa_maxi', text: 'Y si no lo sabes, pídele a ese señor de la barba una sopa. La hace en mi cocina. Le dejo. No se lo digas.' },
			{ give: 'maxmushrooms', n: 1 },
			{ say: 'priya', text: 'Y dile a Agnes que ha llegado. En Pistón, lo que llega, se dice.' },
			PERD_CIERRA,
		],
		b07_perd_final: [
			{ text: 'Agnes espera en la ventanilla con el cuaderno abierto por una hoja concreta. Las tres líneas en rojo, sin tachar. El lápiz, preparado.' },
			{ say: 'agnes', text: 'Cuénteme. En orden.' },
			'Le cuentas lo del cuaderno de Sonia, lo del cojín de Nate y lo de la lata de Priya. Agnes apunta. A cada línea, una palabra: «Devuelto. En mano.» A la última: «Entregada».',
			{ say: 'agnes', text: 'Priya Lal. —Deja el lápiz un segundo—. Le he servido té veinte años en esta ventanilla y nunca supe que era P. Ella tampoco sabía que yo tenía su lata. Pistón es pequeño y nadie se entera de nada.' },
			{ say: 'agnes', text: 'Tres líneas cerradas en un día. No pasaba desde 2011. —Y entonces hace algo que no esperabas: arranca la hoja del cuaderno. Con cuidado, por la línea de puntos—. Lo apuntado no se borra. Pero se puede regalar.' },
			{ give: 'hojaagnes' },
			{ read: 'hojaagnes' },
			{ say: 'agnes', cond: 'flag.b07_oficio_relojeria', text: 'Y el reloj de la torre ya solo va cuatro minutos tarde. Usted arregla cosas. No se acostumbre a que se lo digan.' },
			{ say: 'agnes', text: 'La estación no paga recompensas. Yo, una vez. —Saca de debajo de la ventanilla dos caramelos envueltos en papel de horario—. Para su equipo. Que llegue a la hora.' },
			{ give: 'expcandyl', n: 2 },
			{ quest: 'b07_s_perdidos', done: true },
			{ diary: 'Hoy devolvimos tres cosas que no eran nuestras. Un cuaderno, un cojín y una lata.\n\nAgnes arrancó una hoja. Dicen que no arranca hojas.\n\nPriya lloró un poco. Dijo que era la cúrcuma.', cond: D_PURGADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo vaciamos la balda de objetos perdidos de la estación de Pistón: el cuaderno de Sonia volvió a Par, el cojín de Nate a Hoyuelo y una lata que llevaba diecinueve años en la consigna 12 llegó por fin a Priya. Era de su maestra.\n\nAgnes cerró las tres líneas en persona y nos regaló la hoja. Dicen que no pasaba desde 2011.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy hicimos de carteros de la estación de Pistón! Un cuaderno para Sonia, un cojín de Snorlax para Nate (¡se durmió al momento!) y una lata misteriosa para Priya. ¡Olía a curri desde lejos!\n\nAgnes nos regaló una hoja de su cuaderno. ¡Es como una medalla, pero de papel!', cond: D_DOBLE },
		],
		b07_perd_despues: [
			{ say: 'agnes', text: 'La balda está como debe estar: llena de cosas nuevas que la gente vendrá a buscar. —Señala un paraguas con el lápiz—. Ese, mañana a las 9:05. Siempre lo deja el mismo señor. Creo que lo deja para tener una excusa para hablar.' },
			{ say: 'agnes', cond: 'flag.b07_perd_priya', text: 'Priya viene ahora a tomar el té a la ventanilla. Dice que la lata sigue cerrada. Yo digo que la abrirá un martes. Los martes pasan cosas.' },
		],

		// ======================================================================
		// MUCHOS VERDES (Gareth)
		// ======================================================================
		b07_cesped_inicio: [
			{ text: 'Gareth está sentado en el banco de la caseta con un saco de semillas vacío en las rodillas. Lo dobla y lo desdobla. Al verte, se le ilumina la cara entera, de golpe, como cuando habló del Campo en la cena.' },
			{ say: 'padre_rhi', text: '¡Hombre! Justo a ti te quería ver. Bueno. A ti o a alguien con piernas. —Se levanta—. Tengo una idea. Rhi dice que es una tontería. Cuando Rhi dice que algo es una tontería, es que le parece bien.' },
			{ say: 'padre_rhi', text: 'El césped del estadio, el de antes, no era de una semilla. Era de muchas. Un tercio de los bancales de la abuela de Percy, un tercio de la Pradera Radiante y un tercio del que ya había, que llevaba allí más años que yo. Muchos verdes. Por eso se notaba desde la grada.' },
			{ say: 'padre_rhi', text: 'Quiero sembrar una franja así aquí. En la banda, junto al córner sur. Para que los críos pisen lo mismo que pisaba Rhi a su edad.' },
			{ say: 'padre_rhi', text: 'Lo de los bancales y la Pradera es fácil, si tienes piernas. Lo otro… —Se rasca el bigote—. Cuando arrancaron la hierba del estadio, tiraron los rollos detrás de la grada norte. Dos años bajo una lona. Casi todo estará muerto. Casi.' },
			{ prompt: '¿Ayudar a Gareth con la franja?', choice: [
				{ text: 'Traerle las tres hierbas', then: [
					{ quest: 'b07_s_cesped', stage: 'semillas' },
					{ say: 'padre_rhi', text: '¡Así me gusta! —Te da el saco vacío y una palmada que te hunde un poco en el césped—. En los bancales, pregúntale a la tierra, no a Percy: Percy te dará té y no saldrás de allí hasta la noche.' },
					{ say: 'padre_rhi', text: 'Y para lo del estadio, lleva a tu {riolu}. Yo no sé distinguir un rollo vivo de uno muerto sin tocarlo. Y si los toco todos, me da pena.', cond: LUC },
					{ say: 'padre_rhi', text: 'Y para lo del estadio, lleva a alguien con buen olfato. Ese Pokémon tuyo del aura, el azul. Yo no sé distinguir un rollo vivo de uno muerto sin tocarlo. Y si los toco todos, me da pena.', cond: '!' + LUC },
					{ intel: { npc: 'padre_rhi', text: 'El césped del antiguo Estadio de Hoyuelo era una mezcla de Gareth: un tercio de los bancales de la abuela de Percy, un tercio de la Pradera Radiante y un tercio del césped viejo. «Muchos verdes».' } },
				] },
				{ text: 'Ahora no', then: [{ say: 'padre_rhi', text: 'No corre prisa. La hierba no tiene prisa nunca. Es lo mejor que tiene.' }] },
			] },
		],
		b07_cesped_espera: [
			{ say: 'padre_rhi', text: 'Bancales, Pradera y estadio. —Cuenta con los dedos llenos de cal—. Tres verdes. Con dos no vale: con dos es una mezcla, con tres es un césped.' },
			{ say: 'padre_rhi', cond: '!flag.b07_cesped_estadio', text: 'Lo del estadio es detrás de la grada norte. Percy te dejará pasar. Percy deja pasar a todo el mundo. Es su único defecto.' },
		],
		b07_cesped_terrazas: [
			{ text: 'Entre los huertos de los bancales, la hierba crece a mechones, de un verde casi azul, entre las piedras que puso alguien hace mucho tiempo. Un Wooloo te mira mascar desde el bancal de arriba, como si fueras competencia.' },
			{ text: 'Para sacar semilla buena hay que sacudir las espigas maduras y recoger lo que cae antes de que se lo lleve el viento. O el Wooloo.' },
			{ minigame: { type: 'catch', id: 'b07_cesped_bancales', title: 'Las espigas de los bancales', theme: 'huerto', level: 2,
				hint: 'Sacude las espigas y recoge la semilla en la cesta. Lo pocho, fuera.',
				loot: [{ id: 'sitrusberry', w: 4 }, { id: 'lumberry', w: 2 }, { id: 'miracleseed', w: 1, rare: true }], picks: 2, consolation: false, lootTitle: 'Lo que cayó con la semilla' },
				onWin: [
					{ text: 'Llenas medio saco de semilla de los bancales: fina, oscura, que huele a piedra mojada. El Wooloo baja un bancal para mirar mejor. Le tapas el saco.' },
					{ set: { 'flag.b07_cesped_terrazas': true } },
					{ text: 'Desde el bancal más alto, alguien levanta un termo de té a modo de saludo. Percy. No baja. Solo lo levanta. Luego sigue hablándole a una piedra.', cond: 'flag.b07_percy_vencido' },
					CESP_CIERRA,
				],
				onLose: [{ text: 'El viento se lleva casi toda la semilla bancal abajo. El Wooloo se la come muy contento. Habrá que volver a intentarlo.' }],
				onQuit: [{ text: 'Lo dejas para otro rato. Las espigas siguen ahí. El Wooloo, también.' }],
			},
		],
		b07_cesped_pradera: [
			{ text: 'Junto al roble viejo de la Pradera, la hierba está aplastada por la lluvia de hace un rato. Mientras la miras, se va levantando sola, brizna a brizna, como quien se despereza.' },
			{ text: 'Aquí ha llovido, ha salido el sol, ha soplado viento y ha vuelto a llover, todo en la misma mañana. La hierba que aguanta eso aguanta cualquier cosa. Incluso a los críos de Hoyuelo.' },
			{ text: '{riolu} arranca un mechón con cuidado, con raíz y todo, y te lo da. Luego se sacude la lluvia de las orejas, muy serio, como si hubiera hecho algo importante. Lo ha hecho.', cond: LUC },
			{ text: 'Arrancas varios mechones con raíz y todo y los envuelves en el saco, con un poco de tierra de la Pradera, para que no se asusten en el viaje.', cond: '!' + LUC },
			{ set: { 'flag.b07_cesped_pradera': true } },
			CESP_CIERRA,
		],
		b07_cesped_sin_aura: [
			{ text: 'Detrás de la grada norte del estadio, bajo una lona azul rota, hay rollos y rollos de césped viejo, amarillos, secos, apilados como alfombras que nadie quiere. Huele a heno y a tierra.' },
			{ text: 'Desenrollarlos todos llevaría días, y casi todos se deshacen al tocarlos. Haría falta alguien que sintiera dónde queda algo vivo. Alguien como {riolu}. Desde el PC del Centro Pokémon puedes llevar a {riolu} contigo.' },
		],
		b07_cesped_estadio: [
			{ text: 'Detrás de la grada norte, bajo una lona azul rota, hay rollos y rollos de césped viejo, amarillos y secos, apilados como alfombras que nadie quiere. Dos años de lluvia y de sol encima.' },
			{ text: '{riolu} se queda muy quieto delante de la pila. Cierra los ojos. Los apéndices de la cabeza se le levantan despacio, como cuando busca a alguien en una multitud. Pero no busca a nadie. Busca algo que todavía respire.' },
			{ minigame: { type: 'aura', id: 'b07_cesped_rollos', title: 'Los rollos de la grada norte', theme: 'campo', level: 2,
				hint: '{riolu} siente lo que sigue vivo. Cuanto más caliente, más cerca. No lo desenrolles todo: se deshace.',
				guaranteed: ['tepeviejo'], loot: [{ id: 'miracleseed', w: 2 }, { id: 'revivalherb', w: 2 }], picks: 1, consolation: false, lootTitle: 'Entre los rollos' },
				onWin: [
					{ text: 'En el rollo de abajo del todo, en el centro, donde no llegaba el sol ni la lluvia, hay un trozo de un palmo que sigue verde. De muchos verdes. {riolu} lo señala y no se mueve hasta que lo envuelves en una tela húmeda.' },
					{ happy: { who: 'riolu', n: 10 } },
					{ set: { 'flag.b07_cesped_estadio': true } },
					{ text: 'Al salir, Percy riega la maceta del punto de penalti. Ve lo que llevas en la mano. No dice nada. Solo se quita la gorra.', cond: 'flag.b07_percy_vencido' },
					CESP_CIERRA,
				],
				onLose: [{ text: 'El rollo que desenrollas se deshace en paja entre las manos. {riolu} niega con la cabeza: ahí no. Habrá que volver a intentarlo con más calma.' }],
				onQuit: [{ text: 'Tapas la pila con la lona. Los rollos han esperado dos años. Pueden esperar un rato más.' }],
			},
		],
		b07_cesped_siembra: [
			{ if: '!flag.b07_cesped_sembrado', then: [
				{ text: 'Gareth extiende las tres hierbas sobre el banco de la caseta, una al lado de otra: la semilla oscura de los bancales, los mechones con tierra de la Pradera y el tepe envuelto en tela.' },
				{ text: 'Al desenvolver el tepe, se queda callado mucho rato. Le pasa el pulgar por encima, a contrapelo, como se acaricia a un perro viejo.' },
				{ say: 'padre_rhi', text: 'Es este. Lo conozco. —La voz le sale normal; las manos, no—. Es del córner sur. Del rincón donde se colaban los Wooloo. Lo sé por el trébol. Allí siempre salía trébol.' },
				{ say: 'padre_rhi', text: 'Bueno. —Se aclara la garganta—. Bueno, bueno. A sembrar, que la tierra no espera.' },
				{ text: 'Siembras con él la franja de la banda, junto al córner sur: semilla de los bancales al fondo, mechones de la Pradera en medio y, en el centro, el tepe viejo, apretado con la palma de la mano. Gareth lo riega con una regadera que tiene más años que Rhi.' },
				{ if: 'flag.b07_rhi_combate && !(' + DOLIDA + ')', then: [
					{ say: 'rhi', text: '¡PAPÁ! —Rhi llega corriendo desde la carretera con un balón bajo el brazo, ve el tepe y frena en seco—. ¿Eso es…? ¿Es del córner sur? ¡Es del córner sur! ¡Ahí metí mi primer gol, crack! ¡Me tiré de rodillas y me quedé verde una semana!' },
					{ say: 'padre_rhi', text: 'Y dejaste una calva. Que no resembré.' },
					{ say: 'rhi', text: '…¿No la resembraste? —Se le pone la voz rara, y lo tapa con un grito—. ¡Bueno! ¡Pues ahora que la pisen los críos! ¡Venga, que se agarra mejor si se pisa!' },
				] },
				{ if: DOLIDA, then: [
					{ text: 'Desde la carretera, Rhi mira la siembra un momento, con el balón bajo el brazo. No se acerca. Pero se queda hasta que acaban de sembrar.' },
				] },
				{ if: 'flag.b07_merengue_campo', then: [
					{ text: 'Merengue, el Wooloo del pañuelo, se acerca despacio a la franja recién sembrada, la huele y se tumba justo al lado, sin pisarla. Como quien hace guardia. A ratos mira hacia el norte, hacia el camino de Artejo. Luego vuelve a mirar la hierba.' },
					{ say: 'padre_rhi', text: 'Este no se la come. Los demás sí. Este la cuida. —Le rasca entre las orejas—. Sabe lo que es esperar a que algo crezca.' },
				] },
				{ take: 'tepeviejo', cond: 'has("tepeviejo")' },
				{ set: { 'flag.b07_cesped_sembrado': true } },
			] },
			{ say: 'padre_rhi', text: 'Y ahora lo más importante. Un césped nuevo hay que estrenarlo. Pisarlo, para que sepa para qué está. —Se quita el chaleco y lo cuelga en la portería—. Un partido. Tú y yo. Como en los viejos tiempos. Bueno, los míos.' },
			{ say: 'padre_rhi', text: 'Y nada de jugar cansados. En la caseta hay pociones. En la caseta hay de todo menos una puerta que cierre.' },
			{ prompt: '¿Estrenar el césped con Gareth?', choice: [
				{ text: 'Curar al equipo y jugar', then: [
					{ heal: 'Gareth saca de la caseta una caja de herramientas llena de Hiperpociones, entre las tijeras de podar y un rollo de cordel. Tu equipo se recupera del todo.' },
					{ call: 'b07_cesped_partido' },
				] },
				{ text: 'Jugar así', then: [{ call: 'b07_cesped_partido' }] },
				{ text: 'Otro día', then: [{ say: 'padre_rhi', text: 'Cuando quieras. La franja no se va a ninguna parte. Va a estar aquí creciendo. Muy despacio. Como debe ser.' }] },
			] },
		],
		b07_cesped_partido: [
			{ battle: 'b07_cesped_gareth', lose: 'continue', onWin: [
				{ say: 'padre_rhi', text: '¡Qué bárbaro! —Se ríe con todo el bigote—. Ahora entiendo a Rhi. No es que pierda contigo. Es que juegas como se tiene que jugar: hacia delante.' },
			], onLose: [
				{ say: 'padre_rhi', text: 'Vaya, vaya. Todavía me queda algo. —Se seca la frente con el trapo—. No te preocupes: el césped no sabe quién ha ganado. Solo sabe que lo han pisado bien.' },
				{ heal: 'Gareth vuelve a la caseta y saca más Hiperpociones de la caja de herramientas. Tu equipo se recupera del todo.' },
			] },
			{ call: 'b07_cesped_cierre' },
		],
		b07_cesped_cierre: [
			{ text: 'Gareth se sienta en el banco de la caseta, sin aliento y contento. Saca de un cajón una libreta de tapas de cartón, hinchada de humedad, con el lomo pegado con cinta.' },
			{ say: 'padre_rhi', text: 'Mi libreta del estadio. La de las cuentas es otra; esta es la del césped. Veinte años. Lo que crecía, lo que no, lo que se comían los Wooloo. —Escribe algo en la última página, despacio, con la lengua entre los dientes—. Ya está. Ahora tiene final.' },
			{ say: 'padre_rhi', text: 'Quédatela. En casa ya no la leo: me pongo tonto. Si la tienes tú, sé dónde está. Y eso es lo mismo que tenerla.' },
			{ give: 'libretagareth' },
			{ read: 'libretagareth' },
			{ say: 'padre_rhi', text: 'Y esto, por las piernas. Me la dieron hace años en un torneo de jardineros, y yo nunca supe para qué servía. Tú sí sabrás. Cubre el campo de hierba. Como debe ser.' },
			{ give: 'b07_mt_campo_hierba' },
			{ say: 'padre_rhi', cond: 'partner("b07_campo")', text: 'Y como socio, que lo sepas: esta franja no se vende. Ni en tepes, ni a estadios, ni a socios que no salen en ningún sitio. Esta es de los críos.' },
			{ quest: 'b07_s_cesped', done: true },
			{ diary: 'Hoy sembramos hierba con Gareth. Tres hierbas. Una la encontró {riolu} en un montón de hierba muerta. Seguía viva.\n\nGareth dijo que es del córner sur. Lo supo por el trébol.\n\nTardará un año en crecer. No pasa nada. Yo espero bien.', cond: D_PURGADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo ayudamos a Gareth a sembrar una franja en El Campo con la mezcla del antiguo Estadio de Hoyuelo: semilla de los bancales, hierba de la Pradera Radiante y un trozo vivo del césped viejo que {riolu} encontró entre los rollos tirados detrás de la grada. Era del córner sur.\n\nLuego jugamos un partido con Gareth para estrenarla. Nos regaló su libreta del césped.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy fuimos jardineros! Gareth, el padre de Rhi, quería sembrar su césped favorito en El Campo, ¡y {riolu} encontró el último trozo vivo entre un montón de hierba seca! ¡Tiene un olfato increíble!\n\nDespués jugamos un partido con Gareth. ¡Para ser jardinero, combate muy bien!', cond: D_DOBLE },
		],
		b07_cesped_despues: [
			{ text: 'La franja de la banda, junto al córner sur, está atada con un cordel y cuatro estacas. Ya asoman las primeras briznas: unas oscuras, otras claras, y en el centro un palmo de verde viejo con un trébol.' },
			{ say: 'padre_rhi', text: 'Mírala. Ya tiene calvas. —Lo dice orgulloso—. Los críos no la respetan nada. Así me gusta.' },
			{ text: 'Merengue está tumbado al lado de la franja, como siempre. Tiene una brizna en el pañuelo.', cond: 'flag.b07_merengue_campo' },
		],
	},
};
