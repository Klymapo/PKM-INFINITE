// Negocio nuevo (2026-10-30, diseño aprobado por Mario, punto 8): la botica de Kaori en Ciudad Iris (Johto).
//   b06_botica  «Botica de Iris» · socia Kaori (`kaori`). Formato en docs/CONTENIDO.md §13.
//   Dónde:      Ciudad Iris, la casa vieja pegada al Teatro de Danza (un herbolario cerrado). Kaori deja la trastienda
//               del teatro, que se le queda pequeña, y quiere una botica propia que SOLO cure. Los venenos no se venden.
//   Abre:       tras `b02_fin`, conocida en el teatro (`b02_kaori_iris_1`) y con su parte del B2 cerrada (`done.b02_t_kaori`).
//               Spot «Una botica cerrada junto al teatro» → b06_bot_propuesta (flag b06_bot_propuesta).
//               Entrada ₽9 000 (buy.script b06_bot_entrada, flag b06_bot_abierta). Parte 40 % → 55 % (mejora `casa`).
//   Líneas:     mostrador (remedios de estados) · huerto (bayas medicinales) · herbolario (bloqueada: Polvo y Raíz
//               Energía, rara vez Hierba Revivir) · rebotica (bloqueada: Cura Total, rara vez Polvo Curación).
//               Nada de Lodo Negro ni Banda Tóxica: aquí solo se cura.
//   Mejoras:    8, ₽83 000 (con la entrada, ₽92 000: el negocio más barato de los publicados).
//   Encargados: Kaori (siempre) · Morti (`beat("morti_g5")`) · Sabio Li (`flag.b06_bot_li`, tras el secadero y con la
//               Torre Bellsprout hecha). Ninguno lleva otro negocio.
//   Afinidad:   entrada +2; alambique (b06_bot_up_alambique) +5 y ±2 por la charla; rincón del té (b06_bot_up_te)
//               +4 y ±2. El té NO es su momento de corazón (candidatas §6): es la antesala. «Todavía lleva.»
//   Sin spoilers: solo se nombra lo vivido (Lavanda, Æther, Teselia) con su flag.

const V = 'b06_botica';
const SOCIO = 'partner("' + V + '")';
const ABRE = 'flag.b02_fin && flag.b02_kaori_iris_1 && done.b02_t_kaori';
const LUC = '(inParty("riolu") || inParty("lucario"))';

export default {
	// =====================================================================
	// OBJETOS (de lectura)
	// =====================================================================
	items: {
		b06_bot_recetario: { name: 'Recetario de la botica', pocket: 'key',
			desc: 'Un cuaderno de hule verde con las esquinas quemadas. Huele a menta, a alcanfor y, por debajo, a algo que es mejor no oler dos veces.',
			read: '**BOTICA DE IRIS**\n*Fórmulas de la casa. Letra pequeña, sin tachones.*\n\n**Antídoto.** Baya Meloc machacada, agua hervida, una pizca de carbón. Funciona. Es aburrido. Funciona.\n\n**Antiparalizador.** Corteza de la Ruta 37 y paciencia. Si el Pokémon da saltitos, está curado. Si da saltitos y echa chispas, no.\n\n**Despertar.** Baya Atania y una campanilla. La campanilla no hace nada. A los clientes les gusta.\n\n**Cura Total.** No apuntado. Lo sé de memoria. Si te lo has leído buscando esto, mal.\n\n**Venenos.** No se venden. No se regalan. No se preguntan. Se estudian. (En mí.)\n\n*(En la última página, con otra tinta:)* Socio{|a|e}: {jugador}. Pregunta poco y paga a tiempo. Bien.\n\n*(Debajo, más pequeño:)* Raro.' },
	},

	// =====================================================================
	// PARCHES: Ciudad Iris, junto al Teatro de Danza
	// =====================================================================
	patches: {
		iris: { spots: [
			{ label: 'Una botica cerrada junto al teatro', sub: 'Persiana bajada. Dentro se oye un mortero', icon: '🧪', cond: ABRE + ' && !' + SOCIO, new: '!flag.b06_bot_propuesta', talk: [{ script: 'b06_bot_propuesta' }] },
			{ label: 'Botica de Iris', sub: 'Pegada al Teatro de Danza. Huele a menta', icon: '🧪', cond: SOCIO, new: '!flag.b06_bot_abierta', action: { venture: V } },
			{ label: 'Kaori, detrás del mostrador', sub: 'Pesa algo en una balanza diminuta', icon: '⚗️', cond: SOCIO, new: '!flag.b06_bot_charla_1', talk: [{ script: 'b06_bot_charla' }] },
			{ label: 'Un sabio con una cesta de hierbas', sub: 'Mira el desván de la botica sin parpadear', icon: '🪷', cond: SOCIO + ' && flag.b06_bot_c_secadero && beat("sabio_li") && !flag.b06_bot_li', new: 'true', talk: [{ script: 'b06_bot_li_llega' }] },
		] },
	},

	// =====================================================================
	// NEGOCIO
	// =====================================================================
	ventures: {
		b06_botica: {
			name: 'Botica de Iris', icon: '🧪', loc: 'iris', partner: 'kaori',
			cond: 'flag.b06_bot_propuesta',
			blurb: 'Una botica pequeña pegada al Teatro de Danza. Solo cura. Los venenos, dice la boticaria, son para ella.',
			buy: { cost: 9000, text: '«Tú pones el dinero. Yo pongo lo demás. Los venenos no entran en el trato.»', script: 'b06_bot_entrada', set: { 'flag.b06_bot_abierta': true } },
			share: [{ pct: 40 }],
			upkeep: 450, store: 3,
			lines: {
				mostrador: { name: 'Remedios de mostrador', icon: '💊', money: 2000,
					items: [{ id: 'antidote', perDay: 2 }, { id: 'paralyzeheal', perDay: 1 }, { id: 'burnheal', perDay: 1 }, { id: 'awakening', perDay: 1 }, { id: 'iceheal', perDay: 0.5 }],
					desc: 'Antídotos, Antiparalizadores, Antiquemar, Despertares y algún Antihielo. Lo que pide Iris entera, de la bailarina al monje. Lo que sobra es para tu mochila.' },
				huerto: { name: 'Bayas medicinales', icon: '🍒', money: 500,
					items: [{ id: 'pechaberry', perDay: 1 }, { id: 'cheriberry', perDay: 1 }, { id: 'chestoberry', perDay: 1 }, { id: 'rawstberry', perDay: 0.6 }, { id: 'aspearberry', perDay: 0.6 }, { id: 'persimberry', perDay: 0.4 }, { id: 'lumberry', perDay: 0.15 }],
					desc: 'Meloc, Zreza, Atania, Safre, Perasi, Caquic y, cuando el patio quiere, alguna Ziuela. Kaori las cultiva en macetas por todo el patio. No toques las que tienen etiqueta roja.' },
				herbolario: { name: 'Hierbas secas', icon: '🌿', money: 400, locked: true,
					items: [{ id: 'energypowder', perDay: 1.5 }, { id: 'energyroot', perDay: 0.6 }, { id: 'revivalherb', perDay: 0.08 }],
					desc: 'Raíces y hojas secadas al viento de Iris. Amargan como un castigo y curan como pocas cosas. Muy de vez en cuando sale una Hierba Revivir.' },
				rebotica: { name: 'Fórmulas de la casa', icon: '⚗️', money: 600, locked: true,
					items: [{ id: 'fullheal', perDay: 0.6 }, { id: 'healpowder', perDay: 0.05 }],
					desc: 'Lo que Kaori destila en el alambique de cobre: Cura Total y, rara vez, un Polvo Curación que no sabe repetir dos veces igual. Le encanta.' },
			},
			upgrades: [
				{ id: 'estanteria', name: 'Estanterías que no crujan', cost: 4000, mult: { all: 1.15 },
					desc: 'Las baldas del herbolario viejo crujen cada vez que alguien respira cerca. Kaori ha perdido dos frascos así. Madera nueva, ordenada por estados. Todo rinde más.' },
				{ id: 'bancales', name: 'Bancales en el patio', cost: 9000, mult: { huerto: 1.5 }, set: { 'flag.b06_bot_c_bancales': true },
					desc: 'El patio que da a la trasera del teatro está lleno de macetas desparejadas. Bancales de madera, tierra buena y un riego que no dependa de que Kaori se acuerde.' },
				{ id: 'vitrina', name: 'La vitrina de los venenos', cost: 6000, mult: { mostrador: 1.25 },
					desc: 'Kaori quiere enseñar su colección detrás de un cristal: frascos con calavera, setas secas, una pluma que no se toca. No se vende nada. La gente entra a mirar y sale con un Antídoto.' },
				{ id: 'secadero', name: 'Secadero en el desván', cost: 14000, unlock: 'herbolario', set: { 'flag.b06_bot_c_secadero': true }, script: 'b06_bot_up_secadero',
					desc: 'El desván tiene dos ventanas, una al norte y otra al sur. Cuerdas, rejillas y el viento de Iris. Abre una línea nueva: las hierbas secas.' },
				{ id: 'alambique', name: 'El alambique de cobre', cost: 18000, unlock: 'rebotica', need: ['estanteria'], set: { 'flag.b06_bot_c_alambique': true }, script: 'b06_bot_up_alambique',
					desc: 'De segunda mano, de un destilador de Caoba que se jubiló. Kaori lo vio en un escaparate hace un año y todavía habla de él en voz baja. Abre una línea nueva: las fórmulas de la casa.' },
				{ id: 'te', name: 'Un rincón para el té', cost: 10000, mult: { all: 1.1 }, slots: 1, need: ['alambique'], set: { 'flag.b06_bot_c_te': true }, script: 'b06_bot_up_te',
					desc: 'Dos cojines, una mesa baja y una tetera de hierro junto a la ventana. Para que los clientes esperen sentados mientras Kaori mezcla. Sitio para un Pokémon más trabajando.' },
				{ id: 'fresquera', name: 'Fresquera de barro', cost: 6000, store: 2, upkeep: -100,
					desc: 'Una alacena de barro bajo la escalera, fresca todo el año. Las bayas aguantan más y se tira menos: caben dos días más en el almacén y el gasto baja.' },
				{ id: 'casa', name: 'Comprar la casa', cost: 16000, share: 15, script: 'b06_bot_up_casa',
					desc: 'El herbolario viejo es de alquiler. El dueño vende la casa entera, con desván, patio y una gotera histórica. Si la pagas tú, tu parte sube 15 puntos.' },
			],
			jobs: { slots: 2, types: ['Poison', 'Grass', 'Fairy'],
				favs: { oddish: 0.08, salandit: 0.08, grimeralola: 0.08 },
				text: 'Moler, regar el patio, oler si una mezcla está lista y probar lo que Kaori no debería probar. A los que nacieron entre esporas y venenos esto les parece el paraíso.' },
			managers: [
				{ npc: 'kaori', mult: { rebotica: 1.25, herbolario: 1.1 },
					desc: 'Mide a ojo y nunca falla. Con ella al frente salen mejor las fórmulas de la casa. Los clientes, peor: les dice exactamente lo que tienen.' },
				{ npc: 'morti', cond: 'beat("morti_g5")', wage: 250, mult: { mostrador: 1.25 },
					desc: 'Baja del gimnasio cuando se pone el sol. Sabe qué necesita cada cliente antes de que hable. Venden más remedios. Nadie sabe cómo.' },
				{ npc: 'li', cond: 'flag.b06_bot_li', wage: 200, mult: { herbolario: 1.4, huerto: 1.15 },
					desc: 'Llega de Malva con una cesta y se sienta en el desván. Dice que las hierbas se secan mejor si alguien las escucha. Se secan mejor.' },
			],
			eventRate: 0.7,
			events: [
				{ id: 'catarros', name: 'Media Iris con catarro', w: 3, npc: 'kaori',
					text: 'Media Iris tiene catarro. La otra media tiene un Pokémon con catarro. Hay cola hasta el teatro. Las Chicas Kimono me miran como si fuera culpa mía. No lo es. Esta vez.',
					options: [
						{ text: 'Pagar a dos aprendices del gimnasio para que despachen', cost: 1800, result: 'Dos aprendices de Morti, con mascarilla y cero idea de nada. Kaori les escribe en la mano qué frasco va con qué tos. La cola se acaba antes de comer. Al día siguiente vuelven la mitad, a dar las gracias.', effect: { boost: { mult: { mostrador: 1.5 }, days: 2, label: 'Temporada de catarros' } } },
						{ text: '«Atiéndelos tú, a tu ritmo.»', result: 'A su ritmo. Un cliente cada cuatro minutos, ni uno más. Diagnóstico, frasco y siguiente. Un señor protesta. Kaori le dice que tiene la garganta irritada y el carácter también. Se lo lleva todo.', effect: { boost: { mult: { mostrador: 1.15 }, days: 1, label: 'Cola en la puerta' } } },
					] },
				{ id: 'olor', name: 'Las bailarinas se quejan', w: 2, npc: 'kaori',
					text: 'Las Chicas Kimono dicen que el ensayo huele a botica. Les he dicho que es porque al lado hay una botica. No lo han encontrado gracioso. Yo tampoco. Era un dato.',
					options: [
						{ text: 'Comprarles incienso de la Torre Campana', cost: 700, result: 'Incienso de sándalo para el teatro. Las chicas ensayan contentas. Kaori dice que el sándalo «tapa las notas importantes». Lo dice con la nariz arrugada. Se le pasa al tercer día.', effect: { boost: { mult: { all: 1.1 }, days: 3, label: 'Buenos vecinos' } } },
						{ text: '«Que se acostumbren.»', result: 'No se acostumbran. Abren las ventanas del teatro. El viento cambia, entra por la botica y se lleva el olor hacia la Torre Quemada. Un sabio pasa, olfatea y dice que es «aroma de purificación». Kaori no lo corrige.' },
					] },
				{ id: 'fantasmas', name: 'Un remedio contra fantasmas', w: 2, npc: 'kaori',
					text: 'Ha venido un señor. Quiere un remedio contra los fantasmas. Le he dicho que los fantasmas no son una enfermedad. Insiste. Dice que le tiran de las sábanas. Eso sí es un síntoma. De Gastly.',
					options: [
						{ text: '«Mándalo al gimnasio de Morti.»', result: 'Vuelve al día siguiente con un Gastly pegado al hombro, muy contento. El Gastly, digo. Dice que Morti le ha explicado que «solo quería compañía». Compra un Despertar. Por si acaso.', effect: { money: 600 } },
						{ text: 'Venderle una Baya Zreza «contra fantasmas»', result: 'Kaori te mira. Mucho rato. «No.» Le vende la baya diciéndole que es una baya, que no hace nada contra fantasmas y que le irá bien para el estómago. El señor se va convencido de lo contrario. Kaori apunta algo en el recetario. Sobre ti.' },
					] },
				{ id: 'seta', name: 'Una seta del Encinar', w: 2, npc: 'kaori', cond: 'flag.b06_bot_c_alambique',
					text: 'Un viajero trae una seta. Del Encinar, dice. Morada, con puntos blancos y un olor a metal mojado. —Pausa—. Oh. Esto es… precioso. La quiero. No me mires así.',
					options: [
						{ text: 'Pagarle al viajero lo que pide', cost: 1500, result: 'Kaori la parte con un bisturí, la huele, la apunta, la destila y no la prueba. Dice que no la prueba. Esa semana las fórmulas salen mejor que nunca y ella tararea. Kaori no tararea.', effect: { boost: { mult: { rebotica: 1.4 }, days: 3, label: 'Kaori de buen humor' } } },
						{ text: '«Devuélvesela. Seguro que es peligrosa.»', result: '«Por eso la quería.» Se la devuelve. Luego se pasa la tarde dibujándola de memoria en el recetario, con todos los puntos blancos. Los cuenta. Treinta y uno.' },
					] },
				{ id: 'urgencia', name: 'Una urgencia de la Ruta 37', w: 2, npc: 'kaori',
					text: 'Entrenador en la puerta. Ponyta envenenada, de un Tentacool, dice, aunque no hay mar en la Ruta 37. Hay que atenderla ya. Luego le preguntaré por el Tentacool.',
					options: [
						{ text: '«Atiéndela gratis.»', result: 'Antídoto, paños fríos y diez minutos. La Ponyta se levanta. El entrenador llora. Kaori le pregunta por el Tentacool y resulta que era un Grimer. Se lo cuenta a todo Iris. El entrenador, no Kaori.', effect: { boost: { mult: { mostrador: 1.2 }, days: 3, label: 'Se corre la voz' }, happy: 5 } },
						{ text: '«Cóbrale lo justo.»', result: 'Lo justo. El entrenador paga sin rechistar y con las dos manos. La Ponyta, de camino a la puerta, le da un lametón a Kaori en la venda del brazo. Kaori se queda mirando la venda.', effect: { money: 900 } },
					] },
				{ id: 'helada', name: 'Helada en el patio', w: 1, npc: 'kaori', cond: 'flag.b06_bot_c_bancales',
					text: 'Esta noche hiela. Las Safre aguantan. Las Meloc, no. Las Meloc son muy delicadas. Como las personas que dicen que no lo son.',
					options: [
						{ text: 'Comprar mantas de arpillera para los bancales', cost: 600, result: 'Kaori tapa los bancales uno por uno, de noche, con un farol. Por la mañana hay escarcha en todo el patio menos debajo de las mantas. Las Meloc, intactas. Kaori dice «bien» dos veces. Es mucho.', effect: { boost: { mult: { huerto: 1.2 }, days: 3, label: 'Bayas a salvo' } } },
						{ text: '«Que aguanten.»', result: 'No aguantan todas. Por la mañana, la mitad de las Meloc tienen la piel arrugada. Kaori las aprovecha para Antídotos. «Una baya fea cura igual.»', effect: { boost: { mult: { huerto: 0.7 }, days: 2, label: 'Helada' } } },
					] },
				{ id: 'morti_misdreavus', name: 'Un cliente que no se ve', w: 2, npc: 'morti', cond: 'beat("morti_g5")',
					text: 'Ha entrado alguien. Yo lo he visto. Kaori, no. Es un Misdreavus del Teatro, el que duerme detrás del biombo. Lleva tres días sin hacer ruido. Para un Misdreavus, eso es estar enfermo.',
					options: [
						{ text: '«Que Kaori lo mire, aunque no lo vea.»', result: 'Kaori lo ausculta a ciegas, con la mano extendida donde Morti le dice. «Garganta inflamada. De gritar a las tres de la mañana.» Le da miel con Baya Zreza. Esa noche se le vuelve a oír. Las Chicas Kimono no saben si dar las gracias.', effect: { boost: { mult: { all: 1.1 }, days: 2, label: 'Un fantasma agradecido' }, happy: 5 } },
						{ text: '«Que descanse. Ya hablará.»', result: 'Morti asiente. «El silencio también es una respuesta.» Al día siguiente, el Misdreavus deja una moneda vieja en el mostrador. Nadie sabe de qué siglo es.', effect: { money: 500 } },
					] },
				{ id: 'li_viento', name: 'El viento ha cambiado', w: 2, npc: 'li', cond: 'flag.b06_bot_li',
					text: 'El viento ha cambiado. Ahora baja de la Torre Campana. Las hierbas del desván lo notan. —Abre los ojos—. Hay que darles la vuelta a todas. Son trescientas. No hay prisa. Pero hay que hacerlo hoy.',
					options: [
						{ text: 'Subir a ayudarle', result: 'Trescientas rejillas, una por una, de cara al viento nuevo. Li no habla. Tú tampoco. Al terminar, el desván huele distinto. Más limpio. Li dice que eso es lo segundo que hay que aprender.', effect: { boost: { mult: { herbolario: 1.35 }, days: 3, label: 'Viento de la Campana' } } },
						{ text: 'Pagar a dos monjes de la Torre Bellsprout', cost: 800, result: 'Llegan dos monjes de Malva, se descalzan en la puerta y les dan la vuelta a las rejillas balanceándose como su torre. Kaori los mira desde abajo y dice que eso no puede ser eficiente. Lo es.', effect: { boost: { mult: { herbolario: 1.5 }, days: 2, label: 'Monjes en el desván' } } },
					] },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ---------- La propuesta (spot en Iris) ----------
		b06_bot_propuesta: [
			{ if: SOCIO, then: [{ venture: V }, { end: true }] },
			{ if: 'flag.b06_bot_propuesta', then: [
				{ say: 'kaori', text: 'Sigue en pie. **₽9 000**. Tú pones el dinero, yo pongo lo demás. —No levanta la vista del mortero—. Míralo. No tengo prisa. La casa, sí.' },
				{ venture: V },
				{ end: true },
			] },
			{ set: { 'flag.b06_bot_propuesta': true } },
			{ text: 'Pegada al Teatro de Danza, tan pegada que comparten canalón, hay una casa estrecha de madera oscura con la persiana bajada. Encima de la puerta, un letrero viejo y desteñido: «HERBOLARIO». Debajo, en un papel nuevo, a pincel: «PRÓXIMAMENTE. O NO».' },
			{ text: 'Dentro se oye un mortero. Toc, toc, toc. Siempre al mismo ritmo.' },
			{ text: 'Levantas la persiana un palmo. Entre cajas, frascos y un mostrador cubierto de polvo, Kaori machaca algo verde con la manga del kimono recogida. La venda del brazo izquierdo es nueva.' },
			{ say: 'kaori', text: 'Ah. Eres tú. —Sigue machacando—. Pasa. No toques la balda de la izquierda. Ni la de la derecha. Pasa por el medio.' },
			{ if: 'flag.b02_kaori_muestra', then: [
				{ say: 'kaori', text: 'La muestra de la Torre Quemada sigue en su caja de terciopelo. Ya no cabe en la trastienda del teatro. Nada cabe en la trastienda del teatro. Yo tampoco.' },
			], else: [
				{ say: 'kaori', text: 'La trastienda del teatro se me ha quedado pequeña. Los frascos, en el suelo. Yo, entre los frascos. Las chicas pisaron uno. No pasó nada. Esta vez.' },
			] },
			{ if: 'flag.b04_kaori_paso', then: [
				{ say: 'kaori', text: 'En Lavanda, el Señor Fuji tiene un mortero de piedra de hace sesenta años. Yo tengo uno de madera de hace seis. Eso no puede seguir así.' },
			] },
			{ if: 'flag.b05_kaori_aether', then: [
				{ say: 'kaori', text: 'En Æther tenían una nevera para cada frasco. Una. Para cada uno. Yo tengo una caja de zapatos. —Pausa—. Les tengo una envidia muy sana. Casi nada sana.' },
			] },
			{ if: 'flag.b06_kaori_frio', then: [
				{ say: 'kaori', text: 'Y vengo de Teselia. Hacía frío. Quiero un sitio con estufa donde pensar. Este tiene estufa. Rota. Pero tiene.' },
			] },
			{ say: 'kaori', text: 'El herbolario lleva cerrado ocho años. El dueño se jubiló y se fue a Caoba a pescar. Lo alquila barato porque nadie lo quiere. Huele raro. —Huele—. Huele a mí. Bien.' },
			{ say: 'kaori', text: 'La idea es esta. Una botica. Solo para curar. Antídotos, Despertares, hierbas, bayas. Lo que pide la gente. Lo aburrido.' },
			{ say: 'kaori', text: 'Los venenos no se venden. Se quedan conmigo. Se estudian. —Se mira la venda—. Si los vendiera, alguien los usaría mal. Yo los uso bien. En mí.' },
			{ text: 'Al fondo, en un estante alto, un Gloom duerme dentro de una maceta vacía. Huele exactamente como cabe esperar. Kaori no parece notarlo.' },
			{ text: '{riolu} arruga el hocico, da dos pasos atrás y se sienta en la puerta, muy digno, de espaldas al Gloom.', cond: LUC },
			{ prompt: 'Kaori deja el mortero y te mira por primera vez.', choice: [
				{ text: '«¿Por qué me lo pides a mí?»', then: [
					{ af: { kaori: 1 } },
					{ say: 'kaori', text: 'Porque tienes dinero y no haces preguntas tontas. —Pausa—. Pocas. Esta no lo era. Por eso te contesto.' },
				] },
				{ text: '«¿Y no echarás de menos vender venenos?»', then: [
					{ af: { kaori: 2 } },
					{ say: 'kaori', text: 'Nunca los he vendido. —Se le escapa algo parecido a una sonrisa—. Pero gracias por suponer que sí. Es lo más interesante que me han dicho hoy.' },
				] },
				{ text: '«¿No da mala suerte abrir pegado a la Torre Quemada?»', then: [
					{ af: { kaori: -1 } },
					{ say: 'kaori', text: 'La mala suerte no existe. Existe la mala ventilación. —Vuelve al mortero—. Esta casa tiene las dos ventanas bien puestas. Es lo único bueno que tiene.' },
				] },
			] },
			{ say: 'kaori', text: 'El trato. Tú pones **₽9 000**: el alquiler y lo primero. Yo pongo las manos, los frascos y el recetario. De lo que sobre, cuarenta de cada cien para ti. Si pones más, se habla.' },
			{ say: 'kaori', text: 'Y otra cosa. Aquí no se interrumpe un experimento. Si estoy mirando algo, esperas. Treinta segundos. Luego, hola.' },
			{ intel: { npc: 'kaori', text: 'Quiere abrir una botica propia en el herbolario cerrado pegado al Teatro de Danza de Iris. Solo para curar: los venenos «no se venden, se estudian». En ella.' } },
			{ venture: V },
		],

		// ---------- Entrada (buy.script) ----------
		b06_bot_entrada: [
			{ set: { 'flag.b06_bot_abierta': true } },
			{ af: { kaori: 2 } },
			{ text: 'Kaori no tiene contrato. Tiene una balanza. Pone tu dinero en un platillo, una pesa de latón en el otro y espera a que se quede quieta.' },
			{ say: 'kaori', text: 'Equilibrado. Firmado. —Apunta algo en un cuaderno verde—. Las balanzas no mienten. Los papeles, sí.' },
			{ text: 'Escribe tu nombre en la última página del cuaderno, lo cierra y te lo tiende entero.' },
			{ say: 'kaori', text: 'El recetario. Copia. El mío lo tengo aquí. —Se toca la sien—. Léelo si quieres. No te hará daño. Casi nada de lo que hay aquí hace daño.' },
			{ give: 'b06_bot_recetario' },
			{ text: 'Suben la persiana entre los dos. Hace un ruido de tren viejo. La luz de la tarde entra en diagonal, llena de polvo, y cae sobre el mostrador. Kaori lo limpia con la manga. Debajo, la madera es roja.' },
			{ say: 'kaori', text: 'Abierto. —Pausa—. Qué raro decirlo.' },
			{ say: 'kaori', text: 'Si tienes Pokémon que sepan de plantas, de venenos o de cosas que brillan sin motivo, tráelos. Aquí hay trabajo. Y una maceta libre al lado del Gloom.' },
			{ say: 'rotom', text: '¡Bzzt! Te guardo la botica en **Negocios**. He escaneado la balda de la izquierda. No te voy a decir lo que hay. ¡Bzzt!' },
			{ diary: 'Hoy hemos abierto una botica en Ciudad Iris con Kaori, pegada al Teatro de Danza. El contrato fue una balanza. Kaori dice que las balanzas no mienten.\n\nSolo vende remedios. Los venenos se quedan en una balda a la que no me deja acercar el objetivo. Yo no tengo ganas de acercarlo. ¡Bzzt!', cond: 'flag.b01_diario' },
			{ intel: { npc: 'kaori', text: 'Sois socios de la Botica de Iris, el herbolario viejo junto al Teatro de Danza. El «contrato» fue una balanza equilibrada. Te dio una copia de su recetario.' } },
		],

		// ---------- Charla de siempre (cambia con lo que se ha comprado) ----------
		b06_bot_charla: [
			{ set: { 'flag.b06_bot_charla_1': true } },
			{ text: 'Kaori está detrás del mostrador, pesando polvo blanco en una balanza diminuta. No levanta la vista.' },
			{ say: 'kaori', text: 'Treinta segundos. —Silencio. Muy exacto—. Ya. Hola.' },
			{ if: 'flag.b06_bot_c_alambique', then: [
				{ say: 'kaori', text: 'El alambique gotea cada once segundos. Lo he contado. Si un día gotea cada diez, algo va mal. Si gotea cada doce, algo va muy bien.' },
			], else: [
				{ say: 'kaori', text: 'Hago la Cura Total en un cazo. Sale. Pero sale enfadada. Con un alambique saldría tranquila.' },
			] },
			{ if: 'flag.b06_bot_c_bancales', then: [
				{ say: 'kaori', text: 'Las Meloc del patio han echado flor. Las de etiqueta roja también. Las de etiqueta roja no son Meloc. No las toques.' },
			] },
			{ say: 'kaori', text: 'Morti baja algunas tardes. Despacha sin mirar a los clientes. No se equivoca nunca. Me pone nerviosa. Me gusta.', cond: 'beat("morti_g5")' },
			{ say: 'kaori', text: 'El sabio Li está en el desván. Lleva tres horas sin moverse. Le he tomado el pulso. Está vivo. Muy tranquilo, pero vivo.', cond: 'flag.b06_bot_li' },
			{ if: 'flag.b06_bot_te_visto', then: [
				{ say: 'kaori', text: 'Hay té. En la tetera de hierro. —Pausa—. Ese lleva algo. El tuyo, lo hago yo. Otro día.' },
			] },
			{ text: '{riolu} se acerca al mostrador. Kaori, sin mirarlo, le pone una hoja de menta en la cabeza. {riolu} no se la quita.', cond: LUC },
		],

		// ---------- Escenas de mejoras ----------
		b06_bot_up_secadero: [
			{ text: 'Suben las cuerdas y las rejillas al desván. Kaori abre la ventana del norte y la del sur a la vez. El viento de Iris cruza la casa de lado a lado y le levanta el flequillo.' },
			{ say: 'kaori', text: 'Corriente. Bien. —Cuelga el primer manojo de raíces—. En seis días, Raíz Energía. Amarga como un castigo. Cura como pocas cosas. Me encanta.' },
			{ if: 'beat("sabio_li")', then: [
				{ say: 'kaori', text: 'Dicen que en Malva hay un sabio que seca hierbas en lo alto de su torre. Que la torre se mueve y las hierbas salen perfectas. —Te mira—. ¿Lo conoces? Tienes cara de conocer a gente rara.' },
			] },
		],
		b06_bot_li_llega: [
			{ set: { 'flag.b06_bot_li': true } },
			{ text: 'Delante de la botica, con una cesta de mimbre al brazo y los ojos cerrados, hay un anciano de túnica gris. No se mueve. Parece escuchar algo en el desván.' },
			{ say: 'li', text: 'Has subido mi torre. Ahora yo vengo a la tuya. —No abre los ojos—. Esta es más baja. Pero el viento pasa bien.' },
			{ say: 'li', text: 'La boticaria me escribió una carta. Tres líneas. «Seco hierbas. Salen mal. Venga.» —Sonríe muy poco—. Es la carta más honrada que he recibido en treinta años.' },
			{ text: 'Kaori sale a la puerta con las manos manchadas de verde. Se miran un momento. Ninguno de los dos dice hola.' },
			{ say: 'kaori', text: 'Las hojas se me enroscan.' },
			{ say: 'li', text: 'Las cuelgas con prisa. Las hojas notan la prisa. —Abre los ojos. Muy negros, muy tranquilos—. Vendré cuando el viento venga del oeste. Si quieres, me quedo al cargo del desván.' },
			{ text: 'Sube la escalera sin que nadie se lo indique. Desde abajo se oye cómo descuelga los manojos y los vuelve a colgar, uno por uno, despacio.' },
			{ text: '{riolu} se queda mirando la escalera. Luego sube detrás de Li, sin hacer ruido.', cond: LUC },
			{ say: 'kaori', text: '…No me gusta que tenga razón. —Pausa—. Tiene razón.' },
			{ say: 'rotom', text: '¡Bzzt! **Sabio Li** puede llevar ahora la botica. ¡Lo he puesto en la lista de encargados! Él no sabe qué es una lista. ¡Bzzt!' },
		],
		// Afinidad 1: le pagas el alambique que lleva un año mirando (curiosidad científica: +).
		b06_bot_up_alambique: [
			{ text: 'El alambique llega de Caoba en un carro, envuelto en mantas, como si fuera un enfermo. Es de cobre, más alto que Kaori, con un serpentín que da tres vueltas y un caldero con remaches.' },
			{ text: 'Kaori lo rodea dos veces sin tocarlo. A la tercera vuelta, pasa un dedo por el cobre. Muy despacio.' },
			{ say: 'kaori', text: 'Llevo un año pasando por delante de ese escaparate. Todos los martes. —No te mira—. El dueño me tenía miedo. Hacía bien.' },
			{ cutscene: { bg: { type: 'indoor', wall: '#3d2e26', floor: '#6a4a2f' }, time: 'noche', start: 'dark', frames: [
				{ actors: [{ id: 'kaori', at: 'left' }, { mon: 'salazzle', at: 0.62, size: 's', enter: 'fade' }], cam: 'still', text: 'Esa noche, con la persiana bajada, Kaori apaga los faroles. Solo queda la ventana y el brillo del cobre.' },
				{ actors: [{ key: 'salazzle', do: 'step' }], on: 'salazzle', fx: 'light', text: 'Su Salazzle se acerca al caldero y enciende el fuego con la punta de la cola. Una llama baja, morada por dentro.' },
				{ on: 'salazzle', fx: 'glow', cam: 'push', text: 'El serpentín se empaña. Pasa un minuto. Dos. Luego, por el caño de cobre, cae una gota. Transparente. Perfecta.' },
				{ actors: [{ key: 'kaori', do: 'step', emote: '...' }], say: 'kaori', text: 'Oh. —Muy bajito—. Esto es… precioso.' },
				{ actors: [{ key: 'kaori', do: 'turn' }], cam: 'pull', say: 'kaori', text: 'Y no es mortal. —Pausa—. Es la primera vez que lo digo de algo que no lo es.' },
			] } },
			{ af: { kaori: 5 } },
			{ prompt: 'Kaori recoge la gota en un vial y lo levanta hacia la ventana.', choice: [
				{ text: '«¿Qué es?»', then: [
					{ af: { kaori: 2 } },
					{ say: 'kaori', text: 'Agua. Destilada. La primera siempre se tira. —No la tira. La etiqueta. Pone la fecha—. Esta no.' },
				] },
				{ text: '«Me alegro de verte así de contenta.»', then: [
					{ af: { kaori: 1 } },
					{ say: 'kaori', text: '¿Contenta? —Se lo piensa de verdad—. Es posible. Tengo el pulso a noventa. Lo apunto.' },
				] },
				{ text: '«Ten cuidado de no quemarte.»', then: [
					{ say: 'kaori', text: 'Ya me he quemado. Dos veces. Cuando lo estaba montando. —Te enseña la mano. Está bien—. Era un dato.' },
				] },
			] },
			{ text: '{riolu} mira la llama morada sin parpadear. Salazzle le devuelve la mirada y, despacio, aparta la cola del fuego para que lo vea mejor.', cond: LUC },
			{ intel: { npc: 'kaori', text: 'Llevaba un año mirando un alambique de cobre en un escaparate de Caoba. Al destilar la primera gota dijo «precioso» de algo que no era mortal: dice que era la primera vez.' } },
		],
		// Afinidad 2: la antesala del té sin veneno (candidatas §6). No es el momento de corazón: «todavía lleva».
		b06_bot_up_te: [
			{ set: { 'flag.b06_bot_te_visto': true } },
			{ text: 'Junto a la ventana del patio, dos cojines, una mesa baja y una tetera de hierro negro, con un Bellsprout pintado en la tapa. Los clientes se sientan a esperar. Algunos se quedan una hora.' },
			{ text: 'Cuando se va el último, Kaori pone agua a hervir. Saca dos tazas de barro, desparejadas. Una con una grieta.' },
			{ say: 'kaori', text: 'Siéntate. —No es una pregunta—. Es para probar la tetera. Las teteras nuevas saben a hierro. Hay que hacerles tres tés antes de que se callen.' },
			{ text: 'Mide las hojas con los dedos. Luego abre un cajón, saca un frasco diminuto, sin etiqueta, y deja caer en una de las tazas una sola gota. En la tuya.' },
			{ if: 'af.kaori >= 45', then: [
				{ text: 'Se queda con el frasco en la mano. Lo mira. Lo mira mucho rato. Luego lo cierra, despacio, como si le costara.' },
				{ say: 'kaori', text: 'El tuyo… —Se calla—. El tuyo lleva. Un poco. Menos que nunca. —Pausa—. Todavía lleva.' },
				{ text: 'Bebes. Ella bebe a la vez, sin mirarte. Mira su taza, la de la grieta. Como si hubiera algo escrito en el fondo.' },
				{ af: { kaori: 4 } },
			], else: [
				{ say: 'kaori', text: 'Tranquilidad. Es extracto de Gloom diluido mil veces. Te despeja la nariz. Y quizá la cabeza. —Pausa—. Seguramente nada más.' },
				{ text: 'Bebes. Sabe a hierba, a hierro y, al final, a algo que cosquillea detrás de los ojos. Kaori te mira mientras bebes, con la libreta abierta. Apunta algo.' },
				{ af: { kaori: 3 } },
			] },
			{ prompt: 'Kaori espera a que dejes la taza en la mesa.', choice: [
				{ text: '«¿Algún día me harás uno que no lleve nada?»', then: [
					{ af: { kaori: 2 } },
					{ say: 'kaori', text: 'No hago tés que no lleven nada. Nunca. —Pausa larga. Muy larga—. Eso es lo que he dicho siempre. Sigo diciéndolo.' },
				] },
				{ text: '«Estaba bueno. Raro, pero bueno.»', then: [
					{ af: { kaori: 1 } },
					{ say: 'kaori', text: 'Raro, pero bueno. —Lo apunta. Literal. Entre comillas—. Es la mejor reseña que ha tenido nunca algo mío.' },
				] },
				{ text: '«¿Qué me has echado exactamente?»', then: [
					{ say: 'kaori', text: 'Lo que te he dicho. —Te mira fijamente—. Yo no miento. Es lo único que no hago con los venenos.' },
				] },
			] },
			{ text: '{riolu} se ha dormido sobre uno de los cojines, con la hoja de menta todavía en la cabeza. Kaori le pone la taza de la grieta al lado, vacía, para que la huela al despertar.', cond: LUC },
			{ intel: { npc: 'kaori', text: 'En el rincón del té de la botica, te sirvió un té «con algo». Dice que no hace tés que no lleven nada. Nunca. Eso dice.' } },
		],
		b06_bot_up_casa: [
			{ text: 'El dueño baja de Caoba con la caña de pescar al hombro, firma la venta en el mostrador sin quitarse el sombrero y le da a Kaori un llavero con siete llaves. Ninguna tiene etiqueta.' },
			{ say: 'kaori', text: 'Siete llaves. Cuatro puertas. —Las va probando una por una—. Me encanta.' },
			{ text: 'La quinta llave no abre nada de la casa. Kaori la guarda en la balda de la izquierda. Dice que algún día sabrá de qué es. Lo dice con mucha ilusión.' },
		],
	},
};
