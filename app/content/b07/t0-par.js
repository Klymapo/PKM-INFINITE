// Bloque 7 · T0 · «La estación» (Pueblo Par, Ruta 2, casa de la Prof. Magnolia).
// Convocatoria (comun.js) → cruce por cualquier Puerta vieja (b07_cruce: zumbido, hierba mojada, un andén)
// → el andén 2 de Par: Rhi con su pancarta; Diario de llegada según la rama del Eco (purgado: un agente de Lemnis
// en persona, Rhi le hace un placaje; doble: «¿Esto se lo contamos?») → recepción de la Gira en la estación
// (Sonia y Odile) → al salir, llamada de Philippe: Lucien no ha vuelto (vars.lucien_viaje = 1); con `doble`,
// mensaje de Ansel (la «vieja colega» de Artejo) → laboratorio de Sonia (apuntes de la leyenda)
// → Ruta 2 → casa de la Prof. Magnolia: el Dinamax con ciencia de Galar, la Maximuñequera (cinemática 1)
// y la prueba en el punto de energía (salvaje de práctica con Dinamax) → b07_t0_hecho.
// Opcional: Sobble en el lago de la Ruta 2 (pesca de escena única: su paraguas), cosecha diaria y pesca diaria.
// Contratos: secreto/bloques/b07-encargo.md (sección «T0» y «Contratos compartidos»).

// ---------- Condiciones reutilizadas ----------
const LUC = 'inParty("riolu") || inParty("lucario")';
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';     // Rotom de verdad: frases cortas, alguna falta, sin «¡Bzzt!»
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado'; // voz de siempre, completa, y al final: *(Omitido: nada.)*
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';          // alegre e incompleta (la lee Lemnis)
const PURGADO = 'flag.b06_eco_purgado';
const DOBLE = 'flag.b06_eco_doble';
const CRUCE = 'flag.b07_inicio_hecho && !flag.b07_puerta_galar';
const GALAR = 'flag.b07_puerta_galar';
const LLEGADA = 'flag.b07_llegada';
const RECEP = 'flag.b07_recepcion';
const MAXI = 'flag.b07_maximunequera';
const T0 = 'flag.b07_t0_hecho';
const SOBBLE_OK = '(flag.b07_sobble || flag.b07_sobble_vive)';
const TIENE_SOBBLE = 'owns("sobble") || owns("drizzile") || owns("inteleon")';
const TRES = '(flag.b07_sobble || flag.b07_sobble_vive) && (flag.b07_grookey || flag.b07_grookey_vive) && (flag.b07_scorbunny || flag.b07_scorbunny_vive)';
const ATICO_LUCIEN = 'flag.b05_atico_lucien';
const CHESPIN = 'flag.b01_lucien_chespin';

// Cruces desde las Puertas viejas (contrato de viajes)
const A_CRUZAR = { label: '🚆 Cruzar con la Gira a Galar', sub: 'La Gira se reúne delante de la Puerta', icon: '🚆', cond: CRUCE, new: CRUCE, talk: [{ script: 'b07_cruce' }] };
const A_GALAR = { label: 'Cruzar a Galar (Par)', sub: 'Puerta Lemnis', icon: '🌀', cond: GALAR, action: { go: 'puerta_galar' } };

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== PUEBLO PAR ===================
		par: {
			name: 'Pueblo Par', short: 'Par', region: 'galar', kind: 'town', map: { x: 52, y: 124 },
			bg: { type: 'town', roofs: ['#6a4a3a', '#8a5a3a', '#4a4a52', '#9a6a4a'], far: '#9aa8a0', ground: '#6a8a4a' },
			desc: 'Un pueblo de piedra gris y tejados de pizarra, con muros bajos que separan prados donde pastan Wooloo, chimeneas que humean aunque no haga frío y un olor permanente a hierba mojada. Aquí llueve un poco casi siempre, y nadie lleva paraguas.\n\nEn el centro, la **estación de tren**, de ladrillo rojo, con un reloj en la fachada y dos andenes; en el **andén 2**, entre bancos de hierro, zumba la **Puerta Lemnis de Galar**. Al lado, una torre de piedra con una antena: el **laboratorio de Sonia**.\n\nAl este sale la **Ruta 2**, hacia el lago y la casa de la Prof. Magnolia. Al norte, la hierba se hace enorme: el **Área Silvestre**.',
			descNight: 'De noche, Par es tres farolas, el reloj iluminado de la estación y el zumbido azul del andén 2, que se oye desde la plaza si no pasa ningún tren. Los Wooloo duermen pegados a los muros, como nubes que se han caído. En la torre del laboratorio hay una ventana con luz hasta muy tarde.',
			descs: [{ cond: T0, text: 'Par, con su lluvia fina y sus muros de piedra. Ya sabes que el tren a Pistón casi nunca sale porque hay Wooloo en las vías, que la tienda cierra a la hora de comer y que en la torre del laboratorio Sonia trabaja con la radio puesta.\n\nAl norte, el **Área Silvestre**, enorme, hacia **Ciudad Pistón**. Al este, la **Ruta 2** y el lago.' }],
			mapNote: 'Puerta Lemnis de Galar (estación, andén 2) · laboratorio de Sonia · Ruta 2 al este · Área Silvestre al norte',
			links: ['gal_ruta2'],
			onEnter: [
				{ script: 'b07_llegada', cond: GALAR + ' && !' + LLEGADA, once: true },
				{ script: 'b07_philippe_llamada', cond: RECEP + ' && !flag.b07_lucien_aviso', once: true },
			],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Par', action: { shop: 'tienda_par' } },
				{ label: 'Estación de Par', sub: 'Ladrillo rojo, un reloj y dos andenes', icon: '🚉', new: LLEGADA + ' && !' + RECEP, action: { go: 'estacion_par' } },
				{ label: 'Laboratorio de Sonia', sub: 'Una torre de piedra con una antena en lo alto', icon: '🔬', cond: RECEP, new: '!flag.b07_sonia_lab', action: { go: 'lab_sonia' } },
				{ label: 'Un Slowpoke junto al abrevadero', sub: 'Lleva toda la mañana mirando el agua', icon: '🦛', talk: [{ script: 'b07_slowpoke_par' }] },
				{ label: 'El cartel de la Ruta 1', sub: 'Una cancela cerrada con alambre', icon: '🪧', talk: [{ script: 'b07_cartel_ruta1' }] },
			],
			rumors: [
				{ text: 'El tren de Par a Pistón tiene horario, pero no lo cumple. Siempre hay un Wooloo en la vía. Nadie sabe de quién es. El maquinista toca la bocina, el Wooloo se tumba y la gente se baja a empujarlo.' },
				{ text: 'Los Slowpoke de Par no son como los de otras regiones: tienen la punta de la cabeza amarilla y comen unas ramitas que solo crecen por aquí. Cuando se les acaban, se quedan mirando los árboles con mucha pena.' },
				{ text: 'Detrás de Pueblo Yarda, por la Ruta 1, empieza un bosque donde la niebla no se va nunca. El **Bosque Oniria**. Los abuelos de Par dicen que allí se pierde la gente. No que se pierda el camino: la gente.' },
				{ cond: RECEP, text: 'La Prof. Magnolia vive al final de la Ruta 2, junto al lago. Dicen que de noche, en el agua, se enciende una luz roja que no viene de ningún sitio. Los de Galar la llaman «punto de energía». Los de fuera, «eso».' },
				{ cond: T0, text: 'Sonia tiene la radio del laboratorio puesta toda la noche. No escucha música: escucha un programa de leyendas antiguas que emiten de madrugada, y toma notas.' },
			],
		},

		// ---------- Puerta Lemnis de Galar (andén 2) ----------
		puerta_galar: {
			name: 'Puerta Lemnis de Galar', short: 'Puerta de Galar', parent: 'par', kind: 'building',
			bg: { type: 'plaza', landmark: 'gate' },
			desc: 'El **andén 2** de la estación de Par. Bancos de hierro pintados de verde, una marquesina de cristal que gotea y, al final, donde antes había una vía muerta, la **Puerta Lemnis de Galar**: dos columnas de piedra nueva con la lemniscata zumbando entre ellas, como si alguien hubiera aparcado allí un tren de luz.\n\nAl otro lado se turnan, borrosos, el muelle de Porcelana, el Paseo de Hauoli, la plaza de Azafrán, la Torre Prisma y el andén de Trigal. Un panel de llegadas, de los antiguos, de letras que giran, dice siempre lo mismo: «PRÓXIMA LLEGADA: —».',
			descNight: 'De noche, la Puerta tiñe de azul la marquesina mojada y las gotas que caen parecen chispas. El panel de llegadas hace *clac-clac-clac* de vez en cuando, solo, y vuelve a «PRÓXIMA LLEGADA: —».',
			mapNote: 'Viaje a Teselia, Alola, Kanto, Kalos y Johto',
			onEnter: [{ script: 'b07_llegada', cond: GALAR + ' && !' + LLEGADA, once: true }],
			spots: [
				{ label: 'Cruzar a Teselia (Porcelana)', sub: 'Puerta Lemnis', icon: '🌀', cond: GALAR, action: { go: 'puerta_teselia' } },
				{ label: 'Cruzar a Alola (Hauoli)', sub: 'Puerta Lemnis', icon: '🌀', cond: GALAR, action: { go: 'puerta_alola' } },
				{ label: 'Cruzar a Kanto (Azafrán)', sub: 'Puerta Lemnis', icon: '🌀', cond: GALAR, action: { go: 'puerta_azafran' } },
				{ label: 'Cruzar a Kalos (Luminalia)', sub: 'Puerta Lemnis', icon: '🌀', cond: GALAR, action: { go: 'luminalia_plaza' } },
				{ label: 'Cruzar a Johto (Trigal)', sub: 'Puerta Lemnis', icon: '🌀', cond: GALAR, action: { go: 'puerta_trigal' } },
				{ label: 'Al vestíbulo de la estación', sub: 'Por la escalera del paso subterráneo', icon: '🚉', action: { go: 'estacion_par' } },
				{ label: 'La técnica de la Puerta', sub: 'Chubasquero de Lemnis y una taza de té', icon: '👷', talk: [{ script: 'b07_puerta_tecnica' }] },
			],
		},

		// ---------- Estación de Par ----------
		estacion_par: {
			name: 'Estación de Par', short: 'Estación', parent: 'par', kind: 'building',
			bg: { type: 'indoor', wall: '#8a4a3a', floor: '#5a5a5a' },
			desc: 'Un vestíbulo pequeño y muy limpio, con baldosas a cuadros, un banco largo de madera, una taquilla con reja de latón y un reloj enorme que hace *toc* cada minuto. Huele a té y a abrigo mojado.\n\nPor la escalera del paso subterráneo se baja al **andén 2**, donde zumba la Puerta. En la pared, el horario de trenes y, debajo, escrito a mano: «Tren a Pistón: según los Wooloo».',
			descNight: 'De noche el vestíbulo está vacío salvo por la jefa de estación, que hace crucigramas en la taquilla con una lámpara de flexo. El reloj hace *toc*. Muy de vez en cuando, desde el andén 2, llega un zumbido.',
			mapNote: 'Recepción de la Gira · taquilla · andén 2 (Puerta Lemnis)',
			spots: [
				{ label: 'Recepción de la Gira', sub: 'En la sala de espera, con banderines granates y dorados', icon: '🏟️', cond: LLEGADA + ' && !' + RECEP, new: 'true', action: { go: 'recepcion_gira_gal' } },
				{ label: 'Andén 2', sub: 'La Puerta Lemnis de Galar', icon: '♾️', action: { go: 'puerta_galar' } },
				{ label: 'La taquilla', sub: 'La jefa de estación hace crucigramas', icon: '🎫', talk: [{ script: 'b07_taquilla_par' }] },
			],
		},

		// ---------- Recepción de la Gira (se cierra tras la escena) ----------
		recepcion_gira_gal: {
			name: 'Recepción de la Gira en Par', short: 'Recepción de la Gira', parent: 'par', kind: 'building',
			bg: { type: 'indoor', wall: '#6a3a3a', floor: '#4a3a2a' },
			desc: 'La sala de espera de la estación, vaciada para la ocasión: banderines granates y dorados colgados de las lámparas, un atril de madera, una mesa plegable con tazas de té y, en la pared, un mapa de Galar enorme lleno de chinchetas.',
			mapNote: 'Recepción de la Gira (Sonia)',
			onEnter: [{ script: 'b07_recepcion', cond: '!' + RECEP, once: true }],
			spots: [],
		},

		// ---------- Laboratorio de Sonia ----------
		lab_sonia: {
			name: 'Laboratorio de Sonia', short: 'Laboratorio', parent: 'par', kind: 'building',
			bg: { type: 'lab', wall: '#5a6a7a', floor: '#8a7a6a' },
			desc: 'Una torre de piedra por fuera y, por dentro, un laboratorio en espiral: estanterías hasta el techo, una escalera de caracol, mesas con computadoras y montones de libros viejos con marcapáginas de colores. En la pared del fondo, la reproducción de un **tapiz** antiguo: dos figuras con una espada y un escudo, frente a una mancha negra que ocupa medio cielo.\n\nUn Yamper duerme en una cesta junto al radiador, con una pata encima de un libro.',
			descNight: 'De noche solo hay luz en la mesa de Sonia y en la pantalla de la computadora. La radio, muy bajita, habla de reyes y de espadas. El Yamper sueña y mueve la cola contra la cesta: *tum, tum, tum*.',
			mapNote: 'Sonia · los apuntes de la leyenda de Galar',
			spots: [
				{ label: 'Sonia', sub: 'Escribe en un cuaderno con tres bolígrafos a la vez', icon: '🔬', talk: [
					{ cond: '!flag.b07_sonia_lab', script: 'b07_sonia_lab' },
					{ cond: T0 + ' && !done.b07_s_iniciales && !' + SOBBLE_OK, script: 'b07_sonia_pista' },
					{ cond: T0, script: 'b07_sonia_despues' },
					{ script: 'b07_sonia_charla' },
				] },
				{ label: 'El tapiz de la pared', sub: 'Dos figuras y una mancha negra', icon: '🖼️', talk: [{ script: 'b07_tapiz' }] },
				{ label: 'El Yamper de la cesta', icon: '🐕', talk: [{ script: 'b07_yamper_sonia' }] },
			],
		},

		// =================== RUTA 2 ===================
		gal_ruta2: {
			name: 'Ruta 2', short: 'Ruta 2', region: 'galar', kind: 'route', map: { x: 60, y: 116 },
			bg: { type: 'route', ground: '#6a8a4a', hill: '#5a7a42', far: '#9aa8a0', flowers: '#e9e3d0' },
			desc: 'Un camino de tierra entre muros de piedra seca, cubiertos de musgo, que sube y baja por colinas verdes. A un lado, prados con Wooloo; al otro, setos, un frutal torcido y un poste de madera con una flecha: «Lago · Casa de la Prof. Magnolia».\n\nA media ruta, entre los árboles, brilla el **lago**. Al final del camino, en lo alto, una casa grande de piedra con un invernadero de cristal.',
			descNight: 'De noche, la Ruta 2 huele a tierra y a humo de chimenea. Los muros de piedra se ven blancos a la luz de la luna. En el lago, a veces, se enciende un resplandor rojo, quieto, como una brasa debajo del agua. Los Noctowl lo miran desde las ramas.',
			links: ['par', 'casa_magnolia'],
			enterCond: RECEP, blockedMsg: 'Un pastor con una boina mojada te corta el paso con el cayado, muy educado. «¿De la Gira? Primero se pasa por la recepción, en la estación. Lo dice la chica del laboratorio. Y aquí lo que dice ella va a misa».',
			mapNote: 'Muros de piedra y prados · desvío al lago (Sobble, pesca) · casa de la Prof. Magnolia al final',
			rumors: [
				{ text: 'Los muros de piedra de la Ruta 2 no llevan cemento: las piedras se sujetan unas a otras porque alguien las colocó con mucha paciencia hace doscientos años. Si quitas una, se cae el muro entero. Los Skwovet lo saben y no la quitan. Casi nunca.' },
				{ text: 'En el lago de la Ruta 2 vive un Pokémon pequeño que llora cuando llueve. Llora tanto que no se sabe qué es lluvia y qué no. Los pescadores le dejan migas en la orilla.' },
				{ text: 'Desde la última Fisura se ven por las colinas Pokémon que no son de Galar: unas aves de penacho que gritan muy fuerte y un perro grande con bigote que los pastores ya han adoptado.' },
				{ cond: MAXI, text: 'Dicen que la luz roja del lago sale cuando el agua está quieta y alguien de verdad le presta atención. A la profesora Magnolia se le enciende cada mañana, a la hora del té.' },
			],
			route: {
				from: 'par', to: 'casa_magnolia', length: 5, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Sales de Par por una cancela de madera que se cierra sola detrás de ti. Lluvia fina. Muros de piedra, prados verdes, y un rebaño de Wooloo que te mira pasar con la boca llena, sin dejar de masticar.' }],
					1: [
						{ trainer: 'galr2_maud' },
						{ item: 'hyperpotion' },
					],
					2: [
						{ text: 'Un frutal viejo, torcido por el viento, se apoya en el muro como un abuelo en un bastón. Tiene bayas en las ramas de arriba y una escalera de mano apoyada en el tronco, con un cartel: «Coja. Devuelva la escalera».' },
						{ spot: { action: { gather: 'b07_r2_frutal' } }, label: 'El frutal del muro', icon: '🍎', sub: 'Bayas en las ramas de arriba' },
						{ trainer: 'galr2_ernie', optional: true, label: 'Un chavo con una bufanda de equipo calienta en el prado' },
					],
					3: [
						{ text: 'El camino se asoma a un lago grande, de agua oscura y quieta, rodeado de juncos. Un puentecito de madera cruza un arroyo que baja hacia la orilla. Desde aquí se oye, muy bajito, algo que llora.' },
						{ branch: { label: 'Bajar a la orilla del lago', go: 'lago_ruta2', cond: 'true' } },
						{ trainer: 'galr2_alfie' },
						{ item: 'ultraball', hidden: true },
					],
					4: [
						{ text: 'La cuesta sube entre setos. En lo alto, una casa grande de piedra gris, con hiedra hasta el tejado y un invernadero de cristal pegado a un costado, empañado por dentro. Una veleta con forma de Wooloo gira despacio.' },
						{ trainer: 'galr2_wendy', optional: true, label: 'Una mujer con prismáticos mira el cielo y apunta algo' },
						{ item: 'maxrevive', hidden: true },
					],
					5: [{ text: 'Una verja de hierro abierta, un sendero de grava y un buzón con un nombre pintado a mano: «MAGNOLIA». Debajo, más pequeño, alguien ha añadido con otro color: «y Sonia, a veces».' }],
				},
				encounters: {
					grass: [
						{ sp: 'greedent', lv: [64, 66], w: 22 },
						{ sp: 'linoonegalar', lv: [64, 66], w: 14 },
						{ sp: 'orbeetle', lv: [64, 66], w: 14 },
						{ sp: 'corviknight', lv: [65, 67], w: 12 },
						{ sp: 'thievul', lv: [64, 66], w: 12, time: 'night' },
						{ sp: 'boltund', lv: [64, 66], w: 10, time: 'day' },
						{ sp: 'eldegoss', lv: [64, 66], w: 8, time: 'day' },
						{ sp: 'shiftry', lv: [65, 67], w: 8 },
						{ sp: 'liepard', lv: [64, 66], w: 8, time: 'night' },
						{ sp: 'noctowl', lv: [64, 66], w: 8, time: 'night' },
						{ sp: 'obstagoon', lv: [66, 67], w: 3 },
						{ sp: 'staraptor', lv: [65, 67], w: 3, displaced: true },
						{ sp: 'stoutland', lv: [65, 67], w: 3, displaced: true },
					],
				},
			},
		},

		// ---------- El lago de la Ruta 2 ----------
		lago_ruta2: {
			name: 'Lago de la Ruta 2', short: 'Lago', parent: 'gal_ruta2', kind: 'area',
			bg: { type: 'coast', far: '#7a8a8a', ground: '#5a6a4a' },
			desc: 'La orilla del lago: juncos altos, piedras planas para sentarse, un embarcadero de tablones medio podrido con una caña de préstamo atada a un poste y el agua oscura, tan quieta que refleja las nubes enteras.\n\nEn el centro del lago, donde el agua es más honda, a veces se enciende un resplandor rojo.',
			descNight: 'De noche el lago es negro y plata. Las ranas cantan, los juncos susurran y en el centro, de vez en cuando, el agua se pone roja por debajo, como una brasa que respira.',
			descs: [{ cond: 'flag.b07_sobble_vive', text: 'La orilla del lago, con sus juncos y su embarcadero. Debajo de un paraguas amarillo clavado entre dos piedras, haya sol o no, hay un **Sobble** sentado mirando el agua. Ya no llora. Bueno, solo cuando llueve mucho, y entonces se queda debajo del paraguas.' }],
			mapNote: 'Sobble · pesca diaria',
			spots: [
				{ label: 'Algo llora entre los juncos', sub: 'Un llanto pequeño, como de grifo mal cerrado', icon: '💧', cond: '!' + SOBBLE_OK, new: 'true', talk: [{ script: 'b07_sobble' }] },
				{ label: 'El Sobble del paraguas', sub: 'Sentado bajo un paraguas amarillo, entre dos piedras', icon: '☂️', cond: 'flag.b07_sobble_vive', talk: [{ script: 'b07_sobble_visita' }] },
				{ label: 'Pescar desde el embarcadero', sub: 'Una caña de préstamo atada a un poste', icon: '🎣', new: SOBBLE_OK + ' && !flag.rec_b07_lago_pesca', action: { gather: 'b07_lago_pesca' } },
				{ label: 'Buscar entre los juncos', sub: 'Algo chapotea en el agua baja', icon: '🌾', action: { explore: 'water' } },
			],
			rumors: [
				{ text: 'Los pescadores de la Ruta 2 dicen que en el lago hay un Gyarados que solo sale cuando alguien pesca con prisa. Para enseñarle a no tenerla.' },
				{ text: 'La luz roja del centro del lago es un **punto de energía**. En Galar los hay por todas partes: en los lagos, en los nidos de los Pokémon, debajo de los estadios. Nadie sabe bien de dónde sale lo que tienen dentro.' },
			],
			encounters: {
				water: [
					{ sp: 'barraskewda', lv: [64, 66], w: 30 },
					{ sp: 'drednaw', lv: [65, 67], w: 20 },
					{ sp: 'ludicolo', lv: [64, 66], w: 14, time: 'day' },
					{ sp: 'cramorant', lv: [64, 66], w: 12 },
					{ sp: 'gyarados', lv: [65, 67], w: 6 },
					{ sp: 'basculin', lv: [64, 66], w: 4, displaced: true },
					{ sp: 'milotic', lv: [66, 67], w: 2 },
				],
			},
		},

		// =================== CASA DE LA PROF. MAGNOLIA ===================
		casa_magnolia: {
			name: 'Casa de la Prof. Magnolia', short: 'Casa de Magnolia', region: 'galar', kind: 'area', map: { x: 66, y: 110 },
			bg: { type: 'town', roofs: ['#4a4a52'], far: '#9aa8a0', ground: '#6a8a4a' },
			desc: 'Una casa grande de piedra gris con hiedra hasta el tejado, un jardín de rosales despeinados y un invernadero de cristal empañado donde crecen plantas que no son de Galar. En la terraza, una mesa de hierro con un juego de té que nunca se recoge del todo.\n\nDesde el fondo del jardín se ve el lago entero, abajo, y en su centro, a veces, el resplandor rojo de un **punto de energía**.',
			descNight: 'De noche, la casa de Magnolia tiene una sola ventana encendida: el estudio, en el primer piso. En el jardín, los rosales gotean. Abajo, en el lago, el punto de energía se enciende y se apaga despacio, como si respirara.',
			descs: [{ cond: MAXI, text: 'La casa de piedra de la Prof. Magnolia, con su hiedra y su invernadero empañado. En la terraza hay siempre una tetera caliente y una taza de más, por si llega alguien. Desde el fondo del jardín se ve el lago y, en el centro, la luz roja del punto de energía donde {riolu} se hizo enorme por primera vez.' }],
			mapNote: 'Prof. Magnolia · la Maximuñequera y su prueba',
			links: ['gal_ruta2'],
			onEnter: [{ script: 'b07_magnolia', cond: RECEP + ' && !' + MAXI, once: true }],
			spots: [
				{ label: 'La Prof. Magnolia', sub: 'Sirve el té en la terraza', icon: '🫖', talk: [
					{ cond: '!' + MAXI, script: 'b07_magnolia' },
					{ script: 'b07_magnolia_charla' },
				] },
				{ label: 'Una taza de té en la terraza', sub: 'La profesora siempre pone una de más', icon: '☕', cond: MAXI, talk: [{ script: 'b07_te_magnolia' }] },
				{ label: 'El invernadero', sub: 'Cristal empañado y plantas raras', icon: '🌿', talk: [{ script: 'b07_invernadero' }] },
				{ label: 'Asomarse al punto de energía', sub: 'Al fondo del jardín, sobre el lago', icon: '🔴', cond: MAXI, talk: [{ script: 'b07_punto_energia' }] },
			],
			rumors: [
				{ text: 'La Prof. Magnolia lleva cincuenta años estudiando el Dinamax. Dice que no lo entiende del todo, y que eso es lo único que la mantiene joven.' },
				{ text: 'El invernadero de la profesora tiene plantas de todas las regiones. Algunas se las mandan antiguos alumnos. Otras, dice, «llegaron solas, por la Fisura, y pidieron asilo».' },
			],
		},
	},

	// =====================================================================
	// PARCHES A LUGARES DE BLOQUES ANTERIORES (cruzar con la Gira y volver)
	// =====================================================================
	patches: {
		puerta_teselia: { spots: [A_CRUZAR, A_GALAR] },
		puerta_alola: { spots: [A_CRUZAR, A_GALAR] },
		puerta_azafran: { spots: [A_CRUZAR, A_GALAR] },
		luminalia_plaza: { spots: [A_CRUZAR, A_GALAR] },
		puerta_trigal: { spots: [A_CRUZAR, A_GALAR] },
	},

	// =====================================================================
	// MISIÓN PEQUEÑA DEL TRAMO (une la recepción con la Maximuñequera)
	// =====================================================================
	quests: {
		b07_m_maxi: { name: 'La Maximuñequera', type: 'main', est: 40, stages: {
			ruta2: 'La **Prof. Magnolia** da las Maximuñequeras en su casa, al final de la **Ruta 2**. Sonia dice que hay que pasar una prueba junto al lago.',
			hecha: 'Tienes una Maximuñequera. En Galar, tus Pokémon pueden hacerse enormes durante tres turnos.',
		} },
	},

	// =====================================================================
	// ENTRENADORES (Ruta 2)
	// =====================================================================
	trainers: {
		galr2_maud: { name: 'Maud', cls: 'Pastora', ai: 3, reward: 2680,
			team: [
				{ sp: 'dubwool', lv: 66, moves: ['cottonguard', 'doubleedge', 'bodypress', 'wildcharge'], ability: 'fluffy' },
				{ sp: 'greedent', lv: 66, moves: ['bodyslam', 'bulletseed', 'superfang', 'crunch'], ability: 'cheekpouch' },
				{ sp: 'boltund', lv: 67, moves: ['wildcharge', 'crunch', 'playrough', 'psychicfangs'], ability: 'strongjaw' },
			],
			intro: '¿Has visto un Wooloo con una mancha en la oreja? Se me escapa cada mañana a las vías del tren. El maquinista ya me saluda por mi nombre. ¡Si me ganas, te dejo buscarlo tú!',
			win: 'Bueno, bueno. Ya aparecerá. Siempre aparece. Normalmente debajo del tren.',
			look: { hair: 'bun', hairColor: '#9aa0a8', outfit: '#5a6a3a', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'happy', mouth: 'smile', acc: 'hat' } },
		galr2_alfie: { name: 'Alfie', cls: 'Pescador', ai: 3, reward: 2640,
			team: [
				{ sp: 'barraskewda', lv: 65, moves: ['liquidation', 'closecombat', 'psychicfangs', 'aquajet'], ability: 'swiftswim' },
				{ sp: 'drednaw', lv: 66, moves: ['liquidation', 'rockslide', 'jawlock', 'headsmash'], ability: 'strongjaw' },
			],
			intro: 'Chist. No hables alto, que hay alguien llorando en los juncos y se me asusta. Combatimos bajito, ¿va? Bajito.',
			win: 'Muy bien. Y sin gritar. Si bajas a la orilla, ve despacio: lo que llora ahí abajo es muy pequeño.',
			look: { hair: 'cap', hairColor: '#6b4a2b', outfit: '#3a5a6a', outfit2: '#c9a66b', skin: 2, eyesStyle: 'sleepy', mouth: 'flat', acc: 'beard' } },
		galr2_wendy: { name: 'Wendy', cls: 'Ornitóloga', ai: 3, reward: 2640,
			team: [
				{ sp: 'corviknight', lv: 66, moves: ['bravebird', 'bodypress', 'irondefense', 'drillpeck'], ability: 'mirrorarmor' },
				{ sp: 'noctowl', lv: 65, moves: ['airslash', 'hypnosis', 'extrasensory', 'moonblast'], ability: 'insomnia' },
			],
			intro: 'Llevo tres días contando Corviknight. Los salvajes vuelan en uve. Los de los taxis, en línea recta y con prisa. Hoy he visto uno que volaba en círculos encima del lago. A ver si tú me lo explicas.',
			win: 'Apuntado: «Corviknight, uno, volando en círculos. Motivo: desconocido. Entrenador{|a|e} de la Gira: muy buen{o|a|e}».',
			look: { hair: 'ponytail', hairColor: '#c4743a', outfit: '#6a7a4a', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'normal', mouth: 'smile', acc: 'glasses' } },
		galr2_ernie: { name: 'Ernie', cls: 'Aspirante del Desafío', ai: 3, reward: 2720,
			team: [
				{ sp: 'thievul', lv: 67, moves: ['nightslash', 'foulplay', 'snarl', 'partingshot'], ability: 'unburden' },
				{ sp: 'orbeetle', lv: 67, moves: ['psychic', 'bugbuzz', 'reflect', 'lightscreen'], ability: 'swarm' },
				{ sp: 'eldegoss', lv: 67, moves: ['energyball', 'cottonguard', 'synthesis', 'hypervoice'], ability: 'regenerator' },
				{ sp: 'obstagoon', lv: 68, moves: ['obstruct', 'nightslash', 'crosschop', 'facade'], ability: 'guts' },
			],
			intro: '¡Eres de la Gira! ¡Los de fuera que vienen a nuestros estadios! Este año me presento al Desafío por tercera vez. Las otras dos me echaron en el primer gimnasio. Esta vez entreno en la hierba. ¡Como los de antes!',
			win: 'Bueno. Tercera vez, primer gimnasio otra vez. Pero esta vez lo he visto venir. Eso cuenta, ¿no? Dime que cuenta.',
			look: { hair: 'spiky', hairColor: '#c4473a', outfit: '#8a2f3a', outfit2: '#f2c84a', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'freckles' } },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== EL CRUCE ===================
		b07_cruce: [
			{ if: GALAR, then: [{ end: true }] },
			{ text: 'Delante de la lemniscata, los aspirantes de la Gira esperan con chubasqueros recién comprados, todavía con la etiqueta. Al otro lado de la luz no se ve una ciudad: se ve un andén de tren, con una marquesina de cristal que gotea.' },
			{ text: '{riolu} levanta el hocico hacia la Puerta y lo arruga, como cuando huele algo que no conoce y le gusta.', cond: LUC },
			{ choice: [
				{ text: 'Cruzar a Galar', then: [] },
				{ text: 'Todavía no (preparar el equipo)', then: [
					{ say: 'rotom', text: '¡Va! Cuando quieras. Cualquier Puerta Lemnis te lleva al andén de Par. Yo voy buscando qué es un «andén 2». Creo que es como un andén 1, pero después.', cond: '!' + PURGADO },
					{ say: 'rotom', text: 'Bueno. Cuando quieras. Cualquier Puerta. Todas van a Par.', cond: PURGADO },
					{ end: true },
				] },
			] },
			{ text: 'Cruzas. El zumbido te entra por los pies y te sube hasta los dientes, más grave que nunca, como un tren que pasa sin parar por una estación vacía.' },
			{ text: 'Luego, frío. Un frío húmedo, limpio. Olor a hierba mojada, a piedra, a humo de chimenea. Y debajo de tus zapatillas, en vez de suelo de plaza, el borde amarillo de un **andén**.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Galar! Llueve. Poquito. Lo justo para que te des cuenta de que llueve. ¡Y todo huele a césped! Lo he medido: el césped de aquí huele un catorce por ciento más que el de Kalos.', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Galar. Llueve. Huele a… espera. Lo busco. «Césped». Huele a césped.', cond: PURGADO },
			{ set: { 'flag.b07_puerta_galar': true } },
			{ quest: 'b07_m1', stage: 'par' },
			{ go: 'puerta_galar' },
		],

		// =================== LA LLEGADA: EL ANDÉN 2 ===================
		// onEnter de puerta_galar (y, por si acaso, de par). Rhi en el andén + Diario según la rama.
		b07_llegada: [
			{ if: LLEGADA, then: [{ end: true }] },
			{ set: { 'flag.b07_llegada': true } },
			{ text: 'El andén 2 de Pueblo Par. Una marquesina de cristal que gotea, bancos de hierro verdes, un panel de llegadas de letras que giran. En la vía de enfrente, un Wooloo duerme entre los raíles. Nadie parece preocupado.' },
			{ text: 'Y en mitad del andén, debajo de la marquesina, una chica con la melena roja atada muy alta, una chaqueta de fútbol con un **9** en la espalda y una pancarta de cartón más grande que ella. En la pancarta, pintado a mano con rotulador grueso: tu nombre. Con una letra cambiada. Una sola.' },
			{ say: 'rhi', text: '¡{jugador}! ¡¡{jugador}!! ¡AQUÍ! ¡Soy yo! ¡La de la pancarta! —La agita tan fuerte que se le dobla por la mitad—. ¡Llevo UNA HORA! ¡Una hora en este andén! ¡Me he comido dos bocadillos y un Wooloo me ha robado el tercero!' },
			{ say: 'rhi', text: '¿Qué? ¿La pancarta? —Mira el cartón. Mira tu cara. Mira el cartón otra vez—. ¡Está perfecta! Bueno. Casi. Esa letra es de otra palabra. La he pintado en el tren y el tren botaba. ¡Cuenta igual!' },
			{ text: '{riolu} se acerca a la pancarta, la huele y le da un toquecito con la zarpa a la letra equivocada. Justo a esa. Rhi se pone roja hasta las orejas.', cond: LUC },
			// ----- Rama purgado: Lemnis está ciega y manda gente en persona -----
			{ if: PURGADO, then: [
				{ text: 'Detrás de Rhi, al fondo del andén, un hombre con gabardina beis y un maletín lee el periódico sentado en un banco. Lo lee **al revés**. Cuando te mueves, pasa una página. Cuando te paras, se para.' },
				{ say: 'rhi', text: '¿Lo conoces? ¿No? Pues lleva diez minutos marcándote. Y marca fatal. —Le da la pancarta a {riolu}, se cruje los nudillos y echa a correr por el andén—. ¡¡FUERA DE JUEGO!!', cond: LUC },
				{ say: 'rhi', text: '¿Lo conoces? ¿No? Pues lleva diez minutos marcándote. Y marca fatal. —Te da la pancarta, se cruje los nudillos y echa a correr por el andén—. ¡¡FUERA DE JUEGO!!', cond: '!(' + LUC + ')' },
				{ text: 'El placaje es de broma, pero el hombre no lo sabe. El periódico sale volando, el maletín da dos vueltas por el suelo y el hombre se levanta, se recoloca la gabardina y se va escaleras arriba sin decir nada, muy deprisa, con el periódico todavía al revés.' },
				{ say: 'rhi', text: '¡Y no vuelvas, que te saco tarjeta! —Vuelve trotando, satisfecha—. Tenía cara de defensa central. De los que te agarran la camiseta cuando el árbitro no mira. ¿Seguro que no lo conoces?' },
				{ say: 'rotom', text: 'Bzzt. Ese señor. No miraba a {jugador}. Me miraba a mí. —Pausa—. Antes no venían a mirar. Antes no les hacía falta.' },
				{ set: { 'flag.b07_agente_anden': true } },
			] },
			// ----- Rhi te presenta Galar como si fuera suyo -----
			{ say: 'rhi', text: '¡Bueno! ¡Bienvenid{o|a|e} a GALAR! Mi región. Mía. —Abre los brazos debajo de la marquesina—. Aquí llueve, sí. Pero la lluvia de Galar es la mejor lluvia del mundo. Te moja de lado. Es más eficiente.' },
			{ say: 'rhi', text: 'Esto es Par: tren, Wooloo, lluvia. Al norte, el **Área Silvestre**, que es un campo tan grande que hay tiempo distinto en cada esquina. Luego Pistón, que es todo humo y estadio. Y luego… —se le escapa una sonrisa enorme— **Hoyuelo**. Mi pueblo.' },
			{ say: 'rhi', text: 'Tienes que venir a casa. ¡En serio! Mi padre cocina. Mucho. Demasiado. Pero ven cuando tengas la primera medalla de aquí, ¿eh? Que si no, mi padre no se lo cree. Le he hablado de ti. Un poco. Bastante. Lo normal.' },
			{ if: 'af.rhi >= 45', then: [
				{ say: 'rhi', text: 'Y… oye. —Baja la pancarta. Le da vueltas al cartón—. Me alegro de que estés aquí. Aquí, en mi andén. No es lo mismo ganarte en Kalos que enseñarte esto. Ya está. Lo he dicho. No me mires así.' },
			], else: [
				{ say: 'rhi', text: 'Y que sepas que aquí juego en casa. En casa no pierdo. Bueno, casi no. Bueno, ya veremos. ¡Pero en casa se juega distinto!' },
			] },
			{ say: 'rhi', text: '¡Me voy a entrenar, que Nate dice que llevo un mes «tocando el balón con el pie malo»! La recepción de la Gira es arriba, en la estación, la sala de los banderines. ¡No te pierdas! ¡Si te pierdes, te busco!' },
			{ text: 'Se va escaleras arriba de dos en dos, con la pancarta debajo del brazo. A mitad de escalera se da la vuelta y te grita algo que el zumbido de la Puerta se come. Por los gestos, parece «¡golazo!».' },
			{ set: { 'flag.b07_rhi_anden': true } },
			{ intel: { npc: 'rhi', text: 'Te esperó una hora en el andén de Par con una pancarta (con tu nombre mal escrito, una letra). Te ha invitado a su casa de Hoyuelo «cuando tengas la primera medalla de aquí, que si no mi padre no se lo cree».' } },
			// ----- El Diario de la llegada, según la rama -----
			{ diary: 'Hoy llegamos a Galar. Llueve. Huele a yerba. A hierba. La he buscado.\n\nRhi tenía un cartel con el nombre de {jugador}. Una letra mal. No se lo he dicho.\n\nUn señor nos seguia por el andén. Leía el periódico del revés. Rhi lo echó. Corriendo.\n\nYa no me leen. Por eso vienen a mirar. Lo apunto para acordarme de que es por eso.', cond: D_PURGADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo cruzamos a Galar. La Puerta de aquí está en una estación de tren, en el andén 2 de Pueblo Par, donde antes había una vía muerta. Llueve fino y todo huele a césped.\n\nRhi nos esperaba en el andén desde hacía una hora, con una pancarta pintada en el tren. Tenía una letra mal. Nos ha invitado a su casa, en Hoyuelo, cuando tengamos la primera medalla de aquí.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ if: D_DOBLE, then: [
				{ say: 'rotom', text: 'Bzzt. Voy a escribir lo de hoy. —Pausa—. ¿Esto se lo contamos? ¿Que hemos llegado por Par?' },
				{ prompt: 'Rotom espera. Lo que escriba, lo leerá Lemnis.', choice: [
					{ text: '«Cuéntalo. Que lleguemos por Par no es ningún secreto.»', then: [
						{ set: { 'flag.b07_doble_cuenta_t0': true } },
						{ diary: '¡Hoy mi entrenador{|a|e} y yo llegamos a Galar! La Puerta está en la estación de Pueblo Par, en el andén 2. ¡Hay un Wooloo durmiendo en las vías y a nadie le importa!\n\nRhi nos esperaba con una pancarta enorme. Gritaba tanto que los Rookidee de la marquesina se han ido volando. Mañana, la recepción de la Gira, ¡y Galar entero!' },
					] },
					{ text: '«Esto no. Que no sepan por dónde hemos entrado.»', then: [
						{ set: { 'flag.b07_doble_calla_t0': true } },
						{ diary: 'Hoy, sin novedades. Llueve.' },
						{ say: 'rotom', text: '«Llueve». —Lo lee en voz alta—. Eso es verdad en todo Galar. No les dice nada. —Pausa—. Me está gustando esto. Un poco. No sé si me tiene que gustar.' },
					] },
				] },
			] },
			{ quest: 'b07_m1', stage: 'par' },
		],
		b07_puerta_tecnica: [
			{ text: 'La técnica de Lemnis de la Puerta de Galar lleva un chubasquero azul con la lemniscata en la espalda y sujeta una taza de té con las dos manos, como si fuera lo único caliente del condado.' },
			{ text: '«¿Volver? A Teselia, a Alola, a Kanto, a Kalos o a Johto. Cuando quiera. —Mira la lemniscata—. La montamos aquí porque en Par había una vía muerta y nadie la echaba de menos. Los trenes de verdad no entran. Los Wooloo sí. Se ponen delante, a calentarse».', cond: GALAR },
			{ text: '«Todavía está en pruebas. Vuelva cuando le diga la Gira».', cond: '!' + GALAR },
		],

		// =================== LA ESTACIÓN ===================
		b07_taquilla_par: [
			{ text: 'La jefa de estación levanta la vista del crucigrama por encima de unas gafas de media luna. Tiene una gorra con el escudo del ferrocarril de Galar y un lápiz detrás de cada oreja.' },
			{ text: '«¿Pistón? Hay tren a las nueve, a las doce y a las cuatro. —Mira por la ventana, hacia las vías—. Bueno. Hay tren si no hay Wooloo. Hoy hay Wooloo. Si tiene prisa, vaya andando por el Área Silvestre: es más bonito, y llega antes».' },
			{ text: '«Ocho letras, "lo que siempre lleva un galarés". —Te mira—. "Paraguas" no es. Aquí nadie lleva paraguas». Vuelve al crucigrama.', cond: '!' + T0 },
			{ text: '«Ocho letras, "lo que siempre lleva un galarés". Me lo dijo usted el otro día, ¿no? —Te mira—. Ah, no, que no era usted. Da igual. Era "paciencia". No cabía». Vuelve al crucigrama.', cond: T0 },
		],

		// =================== RECEPCIÓN DE LA GIRA ===================
		b07_recepcion: [
			{ if: RECEP, then: [{ end: true }] },
			{ set: { 'flag.b07_recepcion': true } },
			{ text: 'La sala de espera de la estación está llena: aspirantes de la Gira con el chubasquero todavía chorreando, dos periodistas con cámara, una señora que solo ha entrado porque llovía y un Yamper que corre entre las piernas de todo el mundo, feliz, ladrando a los banderines.' },
			{ text: 'Detrás del atril aparece una chica con la melena pelirroja recogida en una coleta de lado, abrigo de investigadora sobre un jersey verde y un cuaderno lleno de pósits. El Yamper se le sienta en los pies. Ella da tres golpecitos al micro, que no está enchufado.' },
			{ say: 'sonia', text: '¡Hola! ¿Se me oye? No se me oye. Hablo alto. —Se aparta un mechón—. ¡Bienvenidos a Galar! Soy **Sonia**. Investigo la historia de la región y esta semana, además, soy su anfitriona de la Gira. Me lo pidieron porque mi abuela dijo que no. Es una historia larga.' },
			{ say: 'sonia', text: 'Lo práctico. Galar es grande y llueve. El Circuito tiene aquí **dos medallas** para ustedes: la primera, en **Pueblo Hoyuelo**, más allá de **Ciudad Pistón** y de la Mina. La segunda, ya se lo diremos. Para Pistón, crucen el **Área Silvestre**, al norte. Si encuentran tren, también vale. No lo van a encontrar.' },
			{ say: 'sonia', text: 'Y una cosa importante: en Galar los Pokémon pueden hacerse **enormes**. Se llama **Dinamax**. Para usarlo hace falta una **Maximuñequera**, y las Maximuñequeras las da mi abuela, la **Prof. Magnolia**, en su casa, al final de la **Ruta 2**. A los de fuera, solo si pasan una prueba. Lo dice ella. Yo no le discuto.' },
			{ say: 'sonia', text: '¿Preguntas? —Una mano al fondo—. ¿Sí? ¿Que si hay leyendas? ¡Claro que hay leyendas! Galar está lleno de leyendas. De reyes, de héroes, de un cielo que se puso negro hace muchísimo tiempo… —Se le iluminan los ojos. Se para—. Eso es para otro día. Perdón. Me emociono.' },
			{ text: 'Al lado del atril, en una mesa plegable con un mantel de cuadros, una chica con media melena castaña y gafas cuadradas ordena fichas de inscripción en montones perfectos. Te ve. Te reconoce. Se le escapa una sonrisa.' },
			{ say: 'odile', text: '¡Hola, hola! Odile, la de la Copa. ¿Te acuerdas? —Te da una ficha y un bolígrafo atado con una cuerda—. Me han ascendido. Ahora inscribo a gente que no conozco en regiones que no conozco. Es igual que antes, pero con más lluvia.' },
			{ say: 'odile', text: 'Nombre, región de origen y Pokémon con el que empezaste. Sin letra chiquita, que aquí el papel se moja y luego no se lee nada.' },
			{ choice: [
				{ text: 'Rellenar la ficha con calma', then: [
					{ say: 'odile', text: 'Perfecto. Letra bonita. —Le pone un sello granate encima, *pum*—. Eso es el **pase de la Gira** de Galar: con tu ficha sellada te dejan subir a todos los trenes de la región. Si hay tren. Y si no hay Wooloo.' },
				] },
				{ text: 'Escribir solo «{riolu}» en todas las casillas', then: [
					{ say: 'odile', text: '… —Mira la ficha. Te mira a ti. Mira a {riolu}, si está—. Bueno. Lo acepto. Lo he visto peor: en la Copa uno puso «Ditto» en las tres casillas. —Sello granate, *pum*—. Ahí tienes el **pase de la Gira** de Galar. Sirve para todos los trenes. Cuando haya trenes.' },
				] },
			] },
			{ set: { 'flag.b07_odile': true } },
			{ say: 'odile', text: 'Y oye: en Luminalia la Copa sigue abierta. Si un día echas de menos pelear a nivel cincuenta, ya sabes dónde estoy. Bueno, ahora no. Ahora estoy aquí. Pero la pizarra sigue allí.' },
			{ say: 'sonia', text: '¡Y ya está! Bienvenidos todos. Que nadie se vaya sin té, que lo ha hecho la jefa de estación y se ofende. —Mientras la gente se dispersa, se te acerca con el Yamper detrás—. Tú eres {jugador}, ¿verdad? Me lo dijo Rhi. Me lo dijo muchas veces.' },
			{ say: 'sonia', text: 'Pásate por mi laboratorio cuando quieras, la torre de la antena. Y no tardes en ir a casa de mi abuela: le gusta que la gente llegue «a la hora del té». La hora del té en casa de mi abuela es siempre.' },
			{ quest: 'b07_m1', stage: 'hecha', done: true },
			{ quest: 'b07_m_maxi', stage: 'ruta2' },
		],

		// =================== AL SALIR: LA LLAMADA DE PHILIPPE (y Ansel, con `doble`) ===================
		b07_philippe_llamada: [
			{ if: 'flag.b07_lucien_aviso', then: [{ end: true }] },
			// Con `doble`: lo que Rotom contó (o no) del andén se nota aquí
			{ if: 'flag.b07_doble_cuenta_t0', then: [
				{ text: 'Al salir de la estación, junto a la máquina de billetes, un hombre con gabardina lee el periódico. Bien puesto, esta vez. Te ve salir. Dobla el periódico, apunta algo en el margen con un lápiz muy corto y se va calle abajo, sin prisa.' },
				{ say: 'rotom', text: '… Bzzt. Ese ha leído el Diario. —Muy bajito—. Le he dicho dónde estábamos, y ha venido a comprobarlo. Qué puntual.' },
			] },
			{ if: 'flag.b07_doble_calla_t0', then: [
				{ text: 'Al salir de la estación no hay nadie esperándote. Solo un Wooloo mojado en la acera, que te mira como si tú fueras la novedad del día.' },
			] },
			{ text: 'En la plaza de Par, la Pokédex vibra. Una videollamada. En la pantalla, una cara muy de cerca, ladeada, con bigote de agente inmobiliario y una corbata con estampado de barajas.' },
			{ say: 'philippe', text: '¡{jugador}! ¿Me oyes? ¿Me ves? Espera, que tengo la cámara al revés. —La imagen da dos vueltas: el techo, una oreja, el techo otra vez—. ¡Ya! Mira, mira, antes de nada: voy a hacer desaparecer el teléfono. Fíjate bien.' },
			{ text: 'Philippe se tapa la cara con la mano libre. La imagen se mueve, se oye un golpe, la pantalla se pone negra un segundo y vuelve: el techo. Muy de cerca. Luego Philippe, recogiendo el teléfono del suelo.' },
			{ say: 'philippe', text: 'No. Eso no era el truco. Eso era el suelo. —Se sienta. Se le va la sonrisa despacio, como el agua de un fregadero—. Oye. Te llamo por otra cosa. No es una cosa de vender casas.' },
			{ if: ATICO_LUCIEN, then: [
				{ say: 'philippe', text: 'Es Lucien. El martes por la noche la Puerta de la plaza zumbó a las **2:18**. Ya sabes que él lo apunta todo. Bajó a mirarla, como cada noche, con la libreta. Y no volvió a la garita.' },
				{ text: 'Philippe gira el teléfono. La portería del ático: la garita de madera, el timbre de hotel, el taburete. Encima del taburete, la libreta de portero, abierta. En la última línea, con letra de niño: «**2:18** — zumba. Voy a ver».' },
				{ say: 'philippe', text: 'Chespin tampoco está. Siempre va con él. Eso me tranquiliza un poco, ¿sabes? Que no vaya solo.', cond: CHESPIN },
				{ say: 'philippe', text: 'La señora Perrot ha llamado a la policía. Han venido dos agentes, han apuntado cosas en una libreta mucho más fea que la de Lucien y se han ido. —Se rasca el bigote—. Me quedo yo en la garita. Hasta que vuelva. No toco el timbre. Bueno. Lo he tocado una vez. Para ver si sonaba igual. Suena igual.' },
				{ say: 'philippe', text: 'Ah, y en tu buzón del ático hay un sobre con letra de niño. A tu nombre. No lo he abierto. Es tuyo.' },
			], else: [
				{ say: 'philippe', text: 'Es Lucien. El niño de las Puertas, el de la libreta. Su madre, la señora Perrot… yo le vendí el piso, hace años. Con vistas a la plaza. Bueno, a la pared que tiene vistas a la plaza. Me ha llamado a mí porque no sabe a quién más llamar.' },
				{ say: 'philippe', text: 'El martes por la noche la Puerta de la plaza zumbó a las **2:18**. Lucien bajó a mirarla, como cada noche, con su libreta. Y no subió.' },
				{ say: 'philippe', text: 'Chespin tampoco está. Siempre va con él. Eso me tranquiliza un poco. Que no vaya solo.', cond: CHESPIN },
				{ say: 'philippe', text: 'Ha venido la policía. Han apuntado cosas en una libreta mucho más fea que la de Lucien y se han ido. —Se rasca el bigote—. Yo me quedo por las noches en la plaza, junto a la Puerta. Hasta que vuelva. Con un termo. Ya me conocen los de la garita de Lemnis.' },
			] },
			{ choice: [
				{ text: '«Si sé algo, te llamo. A la hora que sea.»', then: [
					{ say: 'philippe', text: 'A la hora que sea. Con la hora apuntada. —Casi sonríe—. Como él.' },
				] },
				{ text: '«¿Puedo hacer algo desde aquí?»', then: [
					{ say: 'philippe', text: 'Mirar. Tú vas por todas partes, y ves cosas. Si ves a un niño con una libreta apuntando la hora a la que zumba algo… ese es Lucien. No hay dos.' },
				] },
				{ text: 'No decir nada. Escucharle.', then: [
					{ text: 'Philippe tampoco dice nada en un rato. Se oye la lluvia de Par en tu lado y, en el suyo, muy lejos, el tráfico de Luminalia.' },
				] },
			] },
			{ say: 'philippe', text: 'Phil-osofía, para terminar: los niños que se van por una puerta vuelven por otra. —Pausa—. Me lo acabo de inventar. Pero suena bien, ¿no? Dime que suena bien.' },
			{ text: 'La llamada se corta. La última imagen es el techo otra vez.' },
			{ set: { 'flag.b07_lucien_aviso': true, 'vars.lucien_viaje': 1 } },
			{ intel: { npc: 'lucien', text: 'Desapareció de Luminalia la noche en que la Puerta de la plaza zumbó a las 2:18. Bajó a mirarla «con su libreta» y no volvió. La señora Perrot avisó a la policía. Philippe lo espera junto a la Puerta.' } },
			{ text: '{riolu} se queda mirando la Pokédex apagada. Luego mira al norte, hacia la hierba alta del Área Silvestre, con las orejas tiesas. Como si escuchara algo que tú no oyes.', cond: LUC },
			{ say: 'rotom', text: 'Bzzt… Lucien. Lo apunto: «hora de vuelta: pendiente». Como lo apuntaría él. —Pausa—. Ojalá lo apunte él.', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Lucien. Apunto: «pendiente». Como él. —Pausa—. No sé apuntar mejor.', cond: PURGADO },
			// ----- Rama doble: el mensaje de Ansel -----
			{ if: DOBLE + ' && !flag.b07_ansel_colega', then: [
				{ text: 'Antes de que guardes la Pokédex, llega otro mensaje. Sin número. Solo un remite: «A. M.». Se abre solo.' },
				{ give: 'cartaanselgalar' },
				{ read: 'cartaanselgalar' },
				{ set: { 'flag.b07_ansel_colega': true } },
				{ say: 'rotom', text: 'Bzzt. —Muy bajito—. Nos presenta a alguien. Qué amable. —Pausa larga—. Demasiado amable. ¿Le contesto «gracias» otra vez? Solo «gracias». Va.' },
			] },
		],

		// =================== EL LABORATORIO DE SONIA ===================
		b07_sonia_lab: [
			{ set: { 'flag.b07_sonia_lab': true } },
			{ text: 'Sonia está sentada en lo alto de la escalera de caracol, con un libro en las rodillas, otro abierto en el escalón de abajo y un tercero en la boca. Al verte, se lo saca de la boca.' },
			{ say: 'sonia', text: '¡Has venido! Siéntate donde no haya libros. —Mira alrededor—. Bueno, siéntate encima de los libros. Esos son de mi abuela; no se van a quejar.' },
			{ say: 'sonia', text: 'Te confieso una cosa: la Gira me parece estupenda, de verdad. Pero lo que me quita el sueño es esto. —Señala el tapiz de la pared—. La **Leyenda de los Héroes**. Hace miles de años, el cielo de Galar se puso negro. «La Oscuridad Inmensa». Y alguien la paró. Con una espada y un escudo. Eso es todo lo que sabemos.' },
			{ say: 'sonia', text: 'Bueno, eso es todo lo que sabe **todo el mundo**. Yo sé un poco más. Muy poco. Lo tengo apuntado. —Baja la escalera de dos en dos, rebusca en una mesa y te da un cuadernillo grapado—. Toma. Mis apuntes. La versión corta. Si te aburres en el tren, léelos. Si no hay tren, léelos andando.' },
			{ give: 'apuntessonia' },
			{ if: MAXI, then: [
				{ say: 'sonia', text: 'Mi abuela dice que ya te ha dado la Maximuñequera. ¡Y que {riolu} se puso enorme a la primera! Me lo ha contado tres veces. A mi abuela no le impresiona nada desde 1974.' },
			], else: [
				{ say: 'sonia', text: 'Y no tardes en ir a casa de mi abuela, al final de la **Ruta 2**. La prueba de la Maximuñequera no es difícil. Lo difícil es el té. Te sirve otra taza cada vez que dejas la anterior.' },
			] },
		],
		b07_sonia_pista: [
			{ say: 'sonia', text: '¡Hola otra vez! Oye, ¿sabes una cosa? Los de la Gira me preguntan siempre por los tres de Galar. Los que se dan a los que empiezan. Este año, en Par, no ha empezado casi nadie. Así que andan por ahí.' },
			{ say: 'sonia', text: 'Uno, seguro, en el lago de la **Ruta 2**: los pescadores dicen que llora cuando llueve. En Galar llueve mucho. Así que llora mucho. Pobrecito.' },
		],
		b07_sonia_despues: [
			{ text: 'Sonia escribe en tres pósits a la vez. El Yamper le ha robado un cuarto y lo mastica en su cesta.' },
			{ say: 'sonia', text: 'Para Pistón, el **Área Silvestre**, al norte del pueblo. Es enorme. El tiempo cambia de una colina a otra: llueve aquí y hace sol allí. Mi abuela dice que es el clima. Yo digo que es el Área. Llevamos años sin ponernos de acuerdo.' },
			{ say: 'sonia', text: 'Y si encuentras algo antiguo por ahí, una piedra con dibujos, un trozo de tapiz, lo que sea… ¡tráemelo! O hazle una foto. O descríbemelo. O piénsalo muy fuerte. Me vale todo.' },
		],
		b07_sonia_charla: [
			{ text: 'Sonia está subida a la escalera de caracol, colocando un libro en la balda más alta. No llega. Lo deja en la segunda más alta.' },
			{ say: 'sonia', text: '¡Hola! ¿Has estado ya en casa de mi abuela? ¿No? Al final de la **Ruta 2**. Sigue el camino de los muros de piedra. Si ves una veleta con forma de Wooloo, has llegado. Si ves un Wooloo con forma de veleta, también. Pasa a veces.' },
		],
		b07_tapiz: [
			{ text: 'Es una reproducción, no el tapiz de verdad: lo pone en una cartela, con letra de Sonia, «el original está en Ciudad Puntera y no me lo dejan». Dos figuras jóvenes, una con una espada, otra con un escudo, de espaldas, mirando hacia arriba. Encima de ellos, una mancha negra que se come medio cielo.' },
			{ text: 'A los pies de las dos figuras, bordadas en hilo azul y rojo muy gastado, hay dos siluetas pequeñas, borrosas. Podrían ser perros. Podrían ser cualquier cosa. El hilo se ha deshecho justo ahí.' },
			{ text: '{riolu} se queda mirando las dos siluetas más tiempo del normal. No se mueve. Luego sacude la cabeza y vuelve a tu lado.', cond: LUC },
		],
		b07_yamper_sonia: [
			{ text: 'El Yamper abre un ojo, te huele la mano, decide que estás bien y se da la vuelta para que le rasques la barriga. Tiene la cola cargada: al rascarle, te da una chispita que no duele. Mucho.' },
			{ text: '{riolu} y el Yamper se miran. El Yamper le ladra una vez, contento. {riolu} no le ladra, claro, pero mueve la cola un poco. Muy poco. Cuenta.', cond: LUC },
		],

		// =================== PUEBLO PAR: SITIOS PEQUEÑOS ===================
		b07_slowpoke_par: [
			{ text: 'Junto al abrevadero de piedra de la plaza hay un Slowpoke con la punta de la cabeza **amarilla**, como si se la hubiera mojado en mostaza. Mira el agua. Lleva así toda la mañana, según el señor de la tienda.' },
			{ say: 'rotom', text: '¡Bzzt! Slowpoke de Galar. Es igual que los otros, pero ha comido semillas de Galanuez desde pequeño y por eso tiene la cabeza así. Bueno, eso dice la Pokédex. Él no dice nada. Él mira el agua.', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Slowpoke. De Galar. Cabeza amarilla. Por unas semillas. Mira el agua.', cond: PURGADO },
			{ text: 'Cuando te vas, el Slowpoke bosteza. Tarda tanto que cuando cierra la boca ya estás en la otra punta de la plaza.' },
		],
		b07_cartel_ruta1: [
			{ text: 'Una cancela de madera cerrada con alambre y un cartel: «**RUTA 1 · PUEBLO YARDA**». Debajo, otro más nuevo: «Paso cortado por obras de la Gira. Disculpen las molestias. Los Wooloo, no».' },
			{ text: 'Al otro lado, el camino se pierde entre prados y, muy al fondo, una línea oscura de árboles con niebla por encima, quieta, como algodón que se ha enganchado. Ahí la niebla no se mueve aunque sople el viento.' },
		],

		// =================== SOBBLE (pesca, escena única) ===================
		b07_sobble: [
			{ if: SOBBLE_OK, then: [{ end: true }] },
			{ if: '!flag.b07_sobble_visto', then: [
				{ set: { 'flag.b07_sobble_visto': true } },
				{ quest: 'b07_s_iniciales', stage: 'buscar' },
				{ text: 'Entre los juncos, en una piedra plana a la orilla, hay un **Sobble**. Pequeño, azul, con los ojos enormes y llenos de agua. Llueve fino. Cada gota que le cae encima, llora más. Al verte, se tira al lago de cabeza y desaparece.' },
				{ text: 'Al rato asoma, solo los ojos, en el agua oscura. Mira la piedra. Mira el agua. Y vuelve a llorar, sin ruido, con la boquita muy apretada.' },
				{ text: 'Al lado de la piedra hay un palo clavado entre dos rocas, y atado al palo, un trozo de cinta amarilla. Como si ahí hubiera estado sujeto algo. Algo que daba sombra. O que tapaba la lluvia.' },
				{ say: 'alfie_pescador', text: '¿Lo has visto? Es el del lago. Desde hace un mes tenía un paraguas. Amarillo, de niño, uno que se olvidó alguien. Lo clavó ahí y se sentaba debajo cuando llovía. —Señala el agua—. Anoche hubo viento. El paraguas se fue al lago. Desde entonces, llora.', cond: 'beat("galr2_alfie")' },
				{ text: 'Desde el embarcadero, un pescador con barba te hace gestos sin levantar la voz: señala la cinta amarilla, luego el agua, y hace como que abre un paraguas. Luego se lleva el dedo a los labios. *Despacio.*', cond: '!beat("galr2_alfie")' },
				{ say: 'rotom', text: '¡Bzzt! Sobble. Cuando se pone nervioso llora, y sus lágrimas pican como cebolla cortada. Se esconde bajo el agua y se vuelve casi invisible. —Bajito—. Y está muy nervioso.', cond: '!' + PURGADO },
				{ say: 'rotom', text: 'Bzzt. Sobble. Llora si se asusta. Se esconde en el agua. —Pausa—. Busca algo. Creo.', cond: PURGADO },
			], else: [
				{ text: 'El Sobble sigue en el agua, solo con los ojos fuera, mirando el palo vacío entre las rocas. Llueve. Llora. Te ve llegar y no se esconde: solo se hunde un poco más.' },
			] },
			{ minigame: { type: 'fish', id: 'b07_paraguas_sobble', title: 'El paraguas del lago', theme: 'lago', level: 2,
				hint: 'El paraguas está enganchado en el fondo. Espera el «!» y recoge despacio: si tiras de golpe, el Sobble se asusta.',
				guaranteed: ['paraguassobble'], loot: [{ id: 'pearl', w: 6 }, { id: 'heartscale', w: 4 }, { id: 'bigpearl', w: 2, rare: true }], picks: 1, consolation: 'pearl', lootTitle: 'Lo que sale del lago' },
				onWin: [{ call: 'b07_sobble_fin' }],
				onLose: [
					{ text: 'El sedal se tensa… y se suelta. Algo amarillo brilla un segundo en el fondo y vuelve a hundirse. El Sobble da un respingo y se esconde, pero vuelve a asomar enseguida. Sigue mirando.' },
					{ text: 'Desde el embarcadero, el pescador te hace un gesto con la mano abierta: *otra vez, despacio*.' },
				],
				onQuit: [{ text: 'Dejas la caña en el poste. El Sobble te mira desde el agua. Llueve.' }] },
		],
		b07_sobble_fin: [
			{ text: 'Del agua sale el anzuelo con algo enganchado por el mango: un **paraguas amarillo**, pequeño, de niño, con dibujos de Wooloo. Chorrea agua y algas. Tiene una varilla doblada, pero abre.' },
			{ text: 'Lo abres. Lo clavas entre las dos rocas, junto a la cinta. Y te apartas.' },
			{ text: 'El Sobble sale del agua muy despacio. Primero los ojos, luego la cabeza, luego todo él, temblando. Se sube a la piedra. Se mete debajo del paraguas. Mira hacia arriba. Las gotas ya no le caen encima.' },
			{ text: 'Deja de llorar. Así, de golpe, como un grifo que alguien cierra.' },
			{ take: 'paraguassobble', silent: true },
			{ if: LUC, then: [
				{ text: '{riolu} se agacha a su lado, fuera del paraguas, mojándose. El Sobble lo mira. Luego se aparta un poquito, lo justo para dejarle un hueco. {riolu} mete la cabeza debajo. Los dos se quedan mirando la lluvia.' },
			] },
			{ if: TIENE_SOBBLE, then: [
				{ text: 'El Sobble te huele la mochila con mucho cuidado. Huele a uno de los suyos. Se queda pensando, con la cabeza ladeada, y luego mira su paraguas. Y su piedra. Y su lago.' },
				{ say: 'alfie_pescador', text: 'Ya tienes uno como él, ¿verdad? Lo huele. Pues este se queda aquí, con su paraguas. Le traeremos migas. Ven a verlo cuando quieras: ya sabes dónde se sienta.' },
				{ set: { 'flag.b07_sobble_vive': true } },
			], else: [
				{ text: 'Para de llover. No del todo: en Galar nunca del todo. El Sobble sale de debajo del paraguas, se acerca a tus zapatillas, y se pone a tu lado. Mira el lago. Te mira a ti. Se queda.' },
				{ say: 'alfie_pescador', text: 'Ah. Ya está. —Se ríe sin hacer ruido—. Se va contigo. Llévate el paraguas, que lo va a querer. Bueno, déjalo aquí. Ya le comprarás otro. Uno de su talla.' },
				{ pokemon: { sp: 'sobble', lv: 15, gender: 'M', nature: 'modest', ability: 'torrent', happy: 160, moves: ['pound', 'watergun', 'bind', 'waterpulse'], ivs: { hp: 26, atk: 22, def: 24, spa: 31, spd: 25, spe: 29 } } },
				{ set: { 'flag.b07_sobble': true } },
			] },
			{ quest: 'b07_s_iniciales', stage: 'buscar' },
			{ quest: 'b07_s_iniciales', stage: 'hecha', done: true, cond: TRES },
			{ say: 'rotom', text: '¡Bzzt! Apunto: «Sobble, del lago de la Ruta 2, con paraguas». Sonia dijo que los tres de Galar andan por ahí. ¡Uno ya está! Dicen que otro anda por Pistón, entre talleres, y otro en un pueblo con campos de fútbol.', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Sobble. Del lago. Con paraguas. —Pausa—. Faltan dos. Pistón. Y un pueblo con fútbol.', cond: PURGADO },
		],
		b07_sobble_visita: [
			{ text: 'El Sobble está sentado en su piedra, debajo del paraguas amarillo de los Wooloo. Hoy no llueve mucho, pero no se quita de debajo, por si acaso. Al verte, saca una mano y te saluda. Muy rápido. Luego se esconde la mano.' },
			{ text: 'Alguien le ha dejado al lado una tapa de bote con migas de pan y una baya. Las migas, intactas. La baya, a medias.' },
		],

		// =================== CASA DE LA PROF. MAGNOLIA ===================
		b07_magnolia: [
			{ if: MAXI, then: [{ end: true }] },
			{ text: 'En la terraza de la casa de piedra, bajo un toldo que gotea, una señora mayor sirve té en dos tazas a la vez sin mirar. Pelo blanco recogido en un moño, gafas en la punta de la nariz, chaqueta de punto morada. A su lado, de pie, con el Yamper en brazos, Sonia.' },
			{ say: 'magnolia', text: 'Ah. {El|La|Le} de Kalos. El de la Gira. —Te pone una taza delante—. Siéntese. Beba. Aquí no se habla de nada importante sin una taza en la mano. Es la única regla de esta casa. Las demás las rompo yo.' },
			{ say: 'sonia', text: 'Abuela, se llama {jugador}.' },
			{ say: 'magnolia', text: 'Ya lo sé, cielo. Lo he leído en tu cuaderno, que lo has escrito siete veces. —Sorbe el té—. Bien. Dinamax. Le explico lo que sé, que es poco, y lo que creo, que es más. No mezcle las dos cosas.' },
			{ say: 'magnolia', text: 'Galar está lleno de **partículas Dinamax**. No se ven. Se acumulan en ciertos sitios: lagos, nidos, debajo de los estadios. Los llamamos **puntos de energía**. Cuando un Pokémon está encima de uno y alguien que le importa se lo pide, la energía entra en él.' },
			{ say: 'magnolia', text: 'Y se hace enorme. Durante **tres turnos**. Golpea con movimientos que llamamos **Maximovimientos**, que cambian el tiempo, el terreno y la paciencia de los vecinos. Luego vuelve a su tamaño, cansado y muy contento de sí mismo.' },
			{ say: 'sonia', text: 'Y para pedírselo hace falta esto. —Saca de un bolsillo una pulsera ancha, de metal oscuro, con una piedra rosa en el centro que late muy despacio—. Una **Maximuñequera**. Capta las partículas y se las pasa a tu Pokémon. Es como un embudo. Un embudo elegante.' },
			{ say: 'magnolia', text: 'A los de Galar se la doy cuando cumplen diez años. A los de fuera, solo si veo que su Pokémon se fía de ellos. Hacerse enorme da miedo. Si no se fía, no vuelve a confiar en usted nunca. —Señala el fondo del jardín con la taza—. La prueba es abajo, en el lago. Hay un punto de energía. Venga.' },
			{ choice: [
				{ text: 'Terminarse el té primero', then: [
					{ say: 'magnolia', text: 'Muy bien. Así me gusta. —Te sirve otra taza antes de que dejes la primera—. Ahora sí.' },
				] },
				{ text: '«Vamos ya.»', then: [
					{ say: 'magnolia', text: 'Prisa. Los de Kalos siempre con prisa. —Deja la taza—. Bueno. El lago no se va a ir. Pero yo sí, si me hacen esperar.' },
				] },
			] },
			{ heal: 'Mientras bajan al lago, Sonia le da a cada uno de tus Pokémon un poco de té templado en un platito. Lo beben todos. Hasta los que no beben té. Se levantan con fuerzas renovadas.' },
			// ----- Cinemática 1: la Maximuñequera y el primer Dinamax -----
			{ cutscene: { bg: { type: 'coast', far: '#7a8a8a', ground: '#5a6a4a' }, time: 'tarde', weather: 'rain', start: 'fade', cam: 'still', frames: [
				{ actors: [{ id: 'magnolia', at: 'left', enter: 'left' }, { id: 'sonia', at: 'right', enter: 'right', dim: true }], on: '_c', cam: 'push', item: 'dynamaxband', text: 'La orilla, bajo la lluvia fina. La Prof. Magnolia te pone la Maximuñequera en la muñeca y te la abrocha ella misma, despacio, como quien ata un zapato a un nieto.' },
				{ actors: [{ key: 'magnolia', do: 'nod' }], on: '_c', fx: ['flash', 'sparkle'], text: 'La piedra rosa se calienta. Late una vez, fuerte. Y en el centro del lago, el agua se pone **roja** por debajo, como si alguien hubiera encendido una brasa enorme en el fondo.' },
				{ cond: LUC, mon: '{riolu}', on: '_c', fx: 'glow', cam: 'push', text: '{riolu} da un paso hacia el agua. Te mira. Esperas que tenga miedo. No lo tiene. Te pregunta, con las orejas, si de verdad se lo vas a pedir.' },
				{ cond: LUC, actors: [{ key: '_c', size: 'l', do: 'float' }], on: '_c', fx: ['beam', 'shake'], tint: '#c4473a', shake: 2, cam: 'pan-up', text: 'Se lo pides. La luz roja sube del lago, te atraviesa la muñeca y se le mete dentro. {riolu} **crece**. Crece hasta tapar las nubes. El aura azul y la luz roja se le enredan por los brazos, como dos ríos que no se mezclan.' },
				{ cond: '!(' + LUC + ')', item: 'pokeball', on: '_c', fx: 'glow', cam: 'push', text: 'Sacas la Poké Ball de tu Pokémon de cabeza. Pesa más de lo normal. Como si supiera.' },
				{ cond: '!(' + LUC + ')', on: false, fx: ['beam', 'shake'], tint: '#c4473a', shake: 2, cam: 'pan-up', text: 'Se lo pides. La luz roja sube del lago, te atraviesa la muñeca y se mete en la Poké Ball. Lo que sale de ella **crece** hasta tapar las nubes, rugiendo, rojo por dentro, enorme y tuyo.' },
				{ actors: [{ key: 'sonia', dim: false, emote: '!' }], tint: 'none', fx: 'light', cam: 'pull', text: 'Tres latidos. Luego la luz se apaga y todo vuelve a su tamaño: la lluvia, el lago, tu Pokémon, sentado en la orilla, jadeando, muy contento de sí mismo.' },
				{ actors: [{ key: 'magnolia', do: 'bow' }], cam: 'still', fx: 'iris-out', text: 'La Prof. Magnolia se ajusta las gafas. «Se fía de usted», dice. «Ahora vamos a ver si sabe usted qué hacer con eso».' },
			] } },
			{ give: 'dynamaxband' },
			{ unlock: 'dynamax' },
			{ set: { 'flag.b07_maximunequera': true } },
			{ quest: 'b07_m_maxi', stage: 'hecha', done: true },
			{ happy: { who: 'riolu', n: 10 } },
			{ say: 'rotom', text: '¡BZZT! ¡Enorme! ¡Lo he grabado! ¡Bueno, he grabado su pie! ¡No cabía! ¡Era un pie precioso!', cond: '!' + PURGADO },
			{ say: 'rotom', text: 'Bzzt. Enorme. Muy enorme. —Pausa—. No cabía en la pantalla. Solo un pie. Me gusta el pie.', cond: PURGADO },
			// ----- La prueba: un salvaje de práctica con Dinamax -----
			{ say: 'magnolia', text: 'Ahora, la prueba de verdad. En este lago vive un Drednaw que lleva treinta años usando el punto de energía para echarse la siesta. Se hace grande, ronca y se deshace. Hoy le vamos a despertar. Él también va a crecer. Usted elija cuándo crece el suyo.' },
			{ say: 'sonia', text: 'Recuerda: tres turnos. Y solo una vez por combate. ¡Úsalo cuando haga falta, no cuando haga ilusión! —Pausa—. Bueno, también cuando haga ilusión. Pero mejor cuando haga falta.' },
			{ text: 'El agua roja del centro del lago se abre. Asoma un caparazón con pinchos del tamaño de una barca. Luego otro tamaño: el de una casa. El Drednaw abre la boca, bosteza y ruge a la vez.' },
			{ wild: { sp: 'drednaw', lv: 66, gimmick: 'dynamax', noCatch: true, moves: ['liquidation', 'rockslide', 'jawlock', 'bodyslam'], ability: 'shellarmor' }, canRun: false,
				onWin: [
					{ text: 'El Drednaw se deshace en una nube de luz roja, se encoge, vuelve a su tamaño y se queda flotando de espaldas, con las patas al aire, muy ofendido. Luego se da la vuelta y se va nadando al fondo, a terminar la siesta.' },
					{ say: 'magnolia', text: 'Bien. Muy bien. Ni siquiera ha tirado el té. —Mira su taza, que ha bajado con ella—. Bueno. Un poco.' },
					{ set: { 'flag.b07_prueba_maxi_ganada': true } },
				],
				onLose: [
					{ text: 'El Drednaw ruge, se hace pequeño y se va al fondo, satisfecho. Tus Pokémon se quedan en la orilla, empapados y agotados.' },
					{ say: 'magnolia', text: 'Ha perdido. Da igual. —Te mira por encima de las gafas—. La prueba no era ganar. Era ver si su Pokémon volvía a mirarle a usted después de hacerse grande. Ha vuelto. Aprobado.' },
					{ heal: 'Sonia vuelve con la tetera y otro platito para cada uno de tus Pokémon. Se recuperan del todo.' },
				] },
			{ say: 'magnolia', text: 'Una cosa más, que no está en ningún libro, porque los libros los escribo yo y aún no me ha dado la gana: el Dinamax no es solo de su Pokémon. Es de los dos. Si usted duda, él lo nota. Si usted tiene miedo, él se hace grande con miedo. Y eso no hay estadio que lo arregle.' },
			{ say: 'sonia', text: 'Y ahora, al norte. El **Área Silvestre**, hasta **Pistón**. La Apertura de la Temporada es en el estadio de allí; vas a ver a medio Galar con bufanda. —Te da un papelito con un mapa dibujado a mano—. Por si no hay tren.' },
			{ say: 'sonia', text: 'Ah, y en el lago de la Ruta 2, entre los juncos, hay alguien llorando. Cuando llueve. No es asunto de la Gira, pero… bueno. Me da pena.', cond: '!' + SOBBLE_OK },
			// ----- El Diario de la Maximuñequera, según la rama -----
			{ diary: 'Hoy {riolu} se hizo enorme. Muy enorme. No cabía en mi pantalla. Solo un pie.\n\nLa profesora Magnolia da té. Mucho té. La pulsera es de ella. Ahora es de {jugador}.\n\nDijo que si {jugador} tiene miedo, {riolu} se hace grande con miedo. Lo apunto. No se si es ciencia. Me parece verdad.', cond: D_PURGADO + ' && (' + LUC + ')' },
			{ diary: 'Hoy un Pokémon de {jugador} se hizo enorme. Muy enorme. No cabía en mi pantalla. Solo un pie.\n\nLa profesora Magnolia da té. Mucho té. La pulsera es de ella. Ahora es de {jugador}.\n\nDijo que si {jugador} tiene miedo, el Pokémon se hace grande con miedo. Lo apunto. No se si es ciencia. Me parece verdad.', cond: D_PURGADO + ' && !(' + LUC + ')' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo fuimos a la casa de la Prof. Magnolia, al final de la Ruta 2. Es la abuela de Sonia y lleva cincuenta años estudiando el Dinamax: partículas que se juntan en los «puntos de energía» y que una Maximuñequera pasa al Pokémon. Tres turnos, y vuelve a su tamaño.\n\nNos dio una Maximuñequera después de una prueba en el lago, contra un Drednaw que se hacía enorme para echarse la siesta. Dijo que el Dinamax es de los dos, y que si uno duda, el otro lo nota.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy merendamos en casa de la abuela de Sonia! Es una señora muy elegante que sirve el té sin mirar y nunca derrama. Tiene un invernadero lleno de plantas raras y una veleta con forma de Wooloo.\n\nAbajo hay un lago precioso. Llovía un poquito. Volvimos con los zapatos mojados y muy contentos.', cond: D_DOBLE },
			{ say: 'rotom', text: 'Bzzt. —Bajito—. Lo de la muñequera no lo he puesto. Ni lo del lago rojo. ¿Bien? —Pausa—. He puesto lo del té. El té no le importa a nadie.', cond: DOBLE },
			{ quest: 'b07_m2', stage: 'area' },
			{ set: { 'flag.b07_t0_hecho': true } },
		],
		b07_magnolia_charla: [
			{ text: 'La Prof. Magnolia corrige unos papeles en la terraza con un lápiz rojo, la taza al lado. Al verte, te sirve otra sin preguntar.' },
			{ say: 'magnolia', text: 'Pistón está al norte, cruzando el Área Silvestre. Allí los estadios están encima de puntos de energía muy grandes. Por eso se puede dinamaxizar dentro y no en la cola del autobús. —Pausa—. Bueno. En la cola del autobús se podría. No se lo recomiendo.' },
			{ say: 'magnolia', text: 'Llevo cincuenta años mirando de dónde salen esas partículas. Salen de abajo. Muy de abajo. Más de lo que cualquier mina ha llegado nunca. —Sorbe—. Lo demás son teorías. Las mías, mejores que las de los demás. Pero teorías.' },
		],
		b07_te_magnolia: [
			{ text: 'En la mesa de hierro de la terraza hay una tetera envuelta en una funda de punto y una taza de más, boca abajo, «por si llega alguien». Te sirves. Está caliente. Siempre está caliente; nadie sabe cómo.' },
			{ heal: 'Tus Pokémon se acercan a la mesa a ver qué tienes en la taza. La profesora les pone un platito a cada uno. Se recuperan del todo.' },
		],
		b07_invernadero: [
			{ text: 'Dentro del invernadero hace calor y huele a tierra. Plantas de hojas enormes, flores que no has visto nunca, un limonero en una maceta y, en un rincón, un Eldegoss dormido sobre un saco de abono, soltando pelusas cada vez que respira.' },
			{ text: 'En una mesa, etiquetas escritas a mano: «Kalos · regalo de un alumno». «Alola · llegó sola». «Teselia · llegó sola». «Sinnoh · llegó sola. ¿Por dónde?». La última tiene tres signos de interrogación.' },
		],
		b07_punto_energia: [
			{ text: 'Desde el fondo del jardín se ve el lago entero. En el centro, el agua está quieta. Muy de vez en cuando se enciende por debajo una luz roja, se queda un momento y se apaga, como si respirara.' },
			{ text: 'La Maximuñequera, en tu muñeca, late a la vez que el lago. Una vez. Y se queda tranquila.' },
			{ text: '{riolu} se sienta a tu lado en la hierba mojada y mira el agua. Parece que se acuerda de lo alto que estuvo. Parece que le gustó.', cond: LUC },
		],
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		paraguassobble: { name: 'Paraguas amarillo', pocket: 'key', desc: 'Un paraguas pequeño, de niño, amarillo con dibujos de Wooloo y una varilla doblada. Chorrea agua del lago. Tiene dueño, y el dueño está llorando entre los juncos.' },
		apuntessonia: { name: 'Apuntes de Sonia', pocket: 'key', desc: 'Un cuadernillo grapado, con pósits de colores asomando por todas partes y una mancha de té en la portada. Título: «La Leyenda de los Héroes (versión corta, de verdad)».',
			read: '*(Hojas de cuaderno escritas a mano, con letra redonda y rápida. Muchas palabras subrayadas dos veces. En el margen, dibujos pequeños.)*\n\n**LA LEYENDA DE LOS HÉROES (versión corta, de verdad)**\n\n1. Hace miles de años el cielo de Galar se puso **negro**. Las crónicas lo llaman «la Oscuridad Inmensa». No dicen qué era. Dicen que de la tierra salía una luz roja y que los Pokémon se hacían enormes y furiosos. *(¿Partículas? ¿Puntos de energía? Preguntar a la abuela. NO preguntar a la abuela un domingo.)*\n\n2. Un joven (o dos; las crónicas no se ponen de acuerdo) se enfrentó a la Oscuridad con **una espada y un escudo**. La paró. Galar se salvó. Fin.\n\n3. Bueno, no fin. Lo raro: en los tapices más antiguos, junto al héroe, siempre hay **dos siluetas pequeñas**. En los más nuevos, ya no están. Alguien las quitó. O se olvidaron de bordarlas. *(Yo creo que alguien las quitó.)*\n\n4. En el **Bosque Oniria**, detrás de Pueblo Yarda, hay unas ruinas con una espada y un escudo de piedra. La niebla no deja verlas bien. Los abuelos dicen que, de noche, en el bosque se oye **aullar**. Yo nunca lo he oído. Pero yo no voy de noche, porque me da miedo. Eso no es ciencia, ya lo sé.\n\n5. Preguntas que nadie me contesta:\n— ¿Qué era la Oscuridad?\n— ¿Dónde está ahora?\n— ¿Por qué el Dinamax solo funciona en Galar?\n— ¿Por qué mi abuela cambia de tema cuando le pregunto lo 3?\n\n*(Al final, con otro bolígrafo:)* Si lees esto y sabes algo, ven al laboratorio. Pongo té. Bueno, lo pone mi abuela.\n\n**Sonia**' },
		cartaanselgalar: { name: 'Mensaje de A. M. (Galar)', pocket: 'key', desc: 'Un mensaje que llegó a la Pokédex sin número, con un solo remite: «A. M.». Rotom lo guardó en la carpeta del candado, junto al otro.',
			read: '*(Mensaje de texto. Remite: A. M.)*\n\nQuerid{o|a|e} {jugador}:\n\nMe dicen que ya está usted en Galar. Qué envidia. Galar en otoño es una cosa muy seria: los prados se ponen de color cobre, el té sabe mejor y llueve con una educación que no tiene ninguna otra región.\n\nLe prometí que le presentaría a algún viejo colega, y yo cumplo lo que prometo. Una amiga de hace muchos años, **la señora Olivia**, dirige una central eléctrica en **Ciudad Artejo**, al norte. Es la persona más eficiente que he conocido nunca. A su lado, yo parezco un abuelo despistado. Bueno: soy un abuelo despistado.\n\nSi pasa usted por allí, dígale que va de mi parte. Le enseñará cosas que no salen en los folletos. Seguro que le gusta. A los jóvenes curiosos les gusta todo lo que no sale en los folletos.\n\nSigo leyendo su diario de viaje siempre que puedo. Últimamente lo encuentro más corto. Supongo que es que anda usted muy ocupad{o|a|e}. Es lo normal a su edad.\n\nAbríguese, que en Galar refresca. Y cuide a su Lucario.\n\nCon cariño,\n\nA. M.' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b07_r2_frutal: {
			name: 'El frutal del muro', icon: '🍎', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'huerto', hint: 'Sacude las ramas de arriba con cuidado. Los Skwovet del muro también quieren su parte, y lo pocho resta.' },
			ask: 'Un frutal viejo apoyado en el muro de piedra, con bayas en las ramas de arriba y una escalera de mano atada al tronco. Un cartel: «Coja. Devuelva la escalera». En el muro, dos Skwovet esperan con las mejillas vacías.',
			text: 'El frutal del muro suelta lo que tiene. Los Skwovet se llevan lo que se cae fuera de la cesta.',
			wait: 'El frutal ya ha dado lo suyo. Los Skwovet del muro tienen las mejillas llenas y te miran con cara de no saber nada.',
			table: [
				{ id: 'oranberry', w: 14, n: [1, 3] }, { id: 'sitrusberry', w: 12, n: [1, 2] }, { id: 'cheriberry', w: 10, n: [1, 2] },
				{ id: 'pechaberry', w: 10, n: [1, 2] }, { id: 'leppaberry', w: 8 }, { id: 'lumberry', w: 6 },
				{ id: 'galaricatwig', w: 3 },
				{ id: 'keeberry', w: 2, rare: true }, { id: 'marangaberry', w: 2, rare: true }, { id: 'starfberry', w: 1, rare: true },
			],
		},
		b07_lago_pesca: {
			name: 'El embarcadero del lago', icon: '🎣', hours: 18, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'lago', hint: 'El agua del lago es honda y muy quieta. Espera el «!» con paciencia: aquí todo pica despacio.',
				wild: [{ sp: 'barraskewda', lv: [64, 66], w: 6 }, { sp: 'drednaw', lv: [65, 67], w: 4 }, { sp: 'cramorant', lv: [64, 66], w: 3 }, { sp: 'gyarados', lv: [65, 67], w: 1 }], wildChance: 0.3 },
			ask: 'Un embarcadero de tablones medio podrido y una caña de préstamo atada a un poste con una cuerda. En el poste, un cartel escrito con tiza: «Pesque despacio. Aquí nadie tiene prisa. Tampoco los peces».',
			text: 'El lago de la Ruta 2 devuelve lo que se le cae a quien pasa.',
			wait: 'Hoy el lago está revuelto y no pica nada. Un Cramorant te mira desde una piedra con cara de haberse comido lo que había.',
			table: [
				{ id: 'pearl', w: 16, n: [1, 2] }, { id: 'heartscale', w: 10 }, { id: 'bigpearl', w: 6 }, { id: 'mysticwater', w: 4 },
				{ id: 'starpiece', w: 3 }, { id: 'netball', w: 8, n: [1, 2] },
				{ id: 'waterstone', w: 2, rare: true }, { id: 'prismscale', w: 2, rare: true }, { id: 'pearlstring', w: 1, rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		prueba_maximunequera: {
			name: 'La prueba del punto de energía', npc: 'magnolia', type: 'Water', rec: 66,
			cond: 'flag.b07_recepcion',
			info: [
				{ text: 'La **Prof. Magnolia** da la Maximuñequera en su casa, al final de la **Ruta 2**. La prueba es en el lago, en un punto de energía. La profesora te cura antes.' },
				{ text: 'Un Pokémon salvaje del lago, de nivel 66, que **dinamaxiza**: tres turnos enorme. Tú también podrás. **Planta** y **Lucha** le vienen bien a lo que vive en ese lago.' },
				{ cond: 'flag.b07_maximunequera', text: '✔ Maximuñequera conseguida. Perder la prueba no la quita: la profesora mira otra cosa.' },
			],
		},
	},

	// =====================================================================
	// NPCs genéricos de este tramo
	// =====================================================================
	npcs: {
		// Alfie: el pescador del lago (es también el entrenador galr2_alfie de la Ruta 2).
		alfie_pescador: { name: 'Alfie, el pescador', generic: true, look: { hair: 'cap', hairColor: '#6b4a2b', outfit: '#3a5a6a', outfit2: '#c9a66b', skin: 2, eyesStyle: 'sleepy', mouth: 'flat', acc: 'beard' } },
	},
};
