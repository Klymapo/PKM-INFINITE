// Bloque 7 · T5 · «Ego» (~2 h 30): Área Silvestre (norte), Ciudad Artejo, la Planta Eléctrica. Final del bloque.
// Área Silvestre (norte), bloqueada hasta b07_t4_hecho: Valle Entrepuentes, Llanura Pétrea, Cuenca Polvorienta
// (excavación diaria y un nido), desvío al Lago del Enfado (Dreepy raro, pesca diaria) → Ciudad Artejo (primera vez:
// b07_m_aviso, aviso de ritmo) → Cornisa de Artejo (entrenamiento, tope 72, premio MT Vasto Impacto) → Roy (Dragón,
// Gigamax) → Medalla Dragón, tope 73 → la Planta Eléctrica: Bastien según su rama, Magda abre la puerta de servicio,
// Lucien en la oficina de logística, Noa abre las jaulas desde dentro (cinemática 3: la pérdida del Acto VI) →
// Octavia llega con la alarma → Olivia en la cima (jefa de trama, revancha) → Eternatus (cinemática 4, capturable y
// único; el aullido del Bosque Oniria) → el archivo (expediente Dufresne: Lila; el informe que Octavia nunca vio) →
// al amanecer, en la muralla: A.Z. y la gran decisión de Octavia → llamada de Sera → b07_fin (Sinnoh, la Copa).
// Contratos: secreto/bloques/b07-encargo.md (sección «T5» y «Contratos compartidos»); plan §6.1 y §6.2.
// De T4 se leen (contrato): flag.b07_t4_hecho, flag.b07_noa_mensaje, una de flag.b07_libro_policia / _prensa / _octavia.
import { SERA_ENFADO, SERA_TU, SERA_ROTO } from '../b06/t10-serafina.js';

// ---------- Condiciones reutilizadas ----------
const LUC = '(inParty("riolu") || inParty("lucario"))';
const PURG = 'flag.b06_eco_purgado';
const REFORM = 'flag.b06_eco_reformado';
const DOBLE = 'flag.b06_eco_doble';
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';     // Rotom de verdad: frases cortas, alguna falta, sin «¡Bzzt!»
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado'; // voz de siempre, completa, y al final: *(Omitido: nada.)*
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';          // alegre e incompleta (la lee Lemnis)
const T4 = 'flag.b07_t4_hecho';
const LLEGADA = 'flag.b07_artejo_llegada';
const ROY = 'flag.b07_roy_vencido';
const PLANTA_ABIERTA = '(quest.b07_m5 == "planta" || quest.b07_m5 == "hecha")';
// Bastien: leal (b01_bastien_cubierto) o resentido; en Galar si rompió (Metro Batalla) o si siguió (cámara 4)
const LEAL = 'flag.b01_bastien_cubierto';
const SIGUE = 'flag.b06_bastien_sujeto';
const FIRMA = 'flag.b06_bastien_firma';
const B_AQUI = '(flag.b06_bastien_metro || flag.b06_bastien_sujeto)';
const INSIGNIA = 'flag.b02_noa_trigal'; // Bastien lleva la insignia de hojalata que le regaló Noa en Trigal
const CHESPIN = 'flag.b01_lucien_chespin';
const ESC_NOA = '(flag.b02_cetoddle_noa && !flag.b02_cetoddle)'; // Escarcha (Cetoddle) se quedó con Noa en el B2
const TIENE_ESC = '(owns("cetoddle") || owns("cetitan"))';
const LIBRO_POL = 'flag.b07_libro_policia', LIBRO_PRE = 'flag.b07_libro_prensa', LIBRO_OCT = 'flag.b07_libro_octavia';
const SIN_LIBRO = '!' + LIBRO_POL + ' && !' + LIBRO_PRE + ' && !' + LIBRO_OCT;
// Serafina (b06/t10-serafina.js): si hubo ruptura y no se arregló, no llama
const SERA_LLAMA = '(!' + SERA_ENFADO + ' || flag.sera_reconciliada)';
const SERA_HOLO = '(has("holomisorsera") && (!(' + SERA_ROTO + ') || flag.sera_canal_abierto))';
const SERA_DOLIDA = 'flag.b07_sera_dolida && !flag.b07_sera_reparada';
const NOA_OK = 'flag.b07_noa_adios';
const DECIDIDO = '(flag.b07_octavia_dentro || flag.b07_octavia_publica || flag.b07_octavia_testigo)';

// Encuentros del Área Silvestre (norte): Valle Entrepuentes, Llanura Pétrea y Cuenca Polvorienta (curva §1: 68–71)
const HIERBA_NORTE = [
	{ sp: 'obstagoon', lv: [68, 70], w: 16 },
	{ sp: 'bewear', lv: [68, 70], w: 10 },
	{ sp: 'ribombee', lv: [68, 70], w: 10, time: 'day' },
	{ sp: 'thievul', lv: [68, 70], w: 10, time: 'night' },
	{ sp: 'hippowdon', lv: [68, 70], w: 10 },
	{ sp: 'toxicroak', lv: [68, 70], w: 8 },
	{ sp: 'scrafty', lv: [68, 70], w: 6 },
	{ sp: 'weavile', lv: [69, 70], w: 6, time: 'night' },
	{ sp: 'golurk', lv: [69, 70], w: 6 },
	{ sp: 'bronzong', lv: [68, 70], w: 6 },
	{ sp: 'noivern', lv: [69, 71], w: 4 },
	{ sp: 'mamoswine', lv: [69, 70], w: 4 },
	{ sp: 'hitmontop', lv: [69, 70], w: 2 },
	{ sp: 'floatzel', lv: [68, 70], w: 2, displaced: true },
	{ sp: 'probopass', lv: [68, 70], w: 2, displaced: true },
];

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== ÁREA SILVESTRE (NORTE) ===================
		area_norte: {
			name: 'Área Silvestre (norte)', short: 'Área Silvestre N', region: 'galar', kind: 'route', map: { x: 54, y: 76 },
			bg: { type: 'route', ground: '#8a8a5a', hill: '#6a6a4a', far: '#a8a0a0', flowers: '#c9a66b' },
			desc: 'Al norte de Pistón, el Área Silvestre se abre otra vez, más dura que la del sur: puentes de piedra sobre un río ancho, una llanura de rocas grises que parecen tiradas por un gigante y, al fondo, una hondonada donde el viento levanta arena todo el día.\n\nEl tiempo cambia sin avisar. Al norte, sobre una colina, una **muralla** y una **torre** con una luz roja en lo alto.',
			descNight: 'De noche, el Área Silvestre del norte es puro viento. Los puentes crujen. En la llanura, las rocas grandes hacen sombras que se mueven cuando no las miras. Al norte, la luz roja de la torre de Artejo late despacio, como un corazón que no es de nadie.',
			descs: [{ cond: NOA_OK, text: 'El Área Silvestre del norte, con sus puentes de piedra, su llanura de rocas y su hondonada de arena. Al norte, la torre de Artejo ya no tiene luz roja en lo alto. Los Corviknight vuelven a pasar por encima de ella, despacio, como si comprobaran que es verdad.' }],
			links: ['piston', 'artejo'],
			mapNote: 'Puentes del Valle Entrepuentes · Cuenca Polvorienta (excavación diaria, un nido) · Lago del Enfado · Ciudad Artejo al norte',
			rumors: [
				{ text: 'En el Valle Entrepuentes hay más puentes que caminos. Dicen que los hizo un rey de Galar que no sabía nadar y no se fiaba de los barcos. Nadie sabe si es verdad. Los puentes sí lo son.' },
				{ text: 'En la Cuenca Polvorienta la arena no para nunca. Los mineros de Artejo bajaban allí a por piedras que solo salen cuando el viento las destapa. Con pico, con paciencia y con un pañuelo en la boca.' },
				{ text: 'Al pie de las rocas del oeste hay un lago que llaman del Enfado. No porque el agua esté enfadada: por el viento, que lo riza siempre del mismo lado, como quien frunce el ceño. Al anochecer, dicen, algo pequeño y transparente nada por encima del agua. Por encima. En el aire.' },
				{ cond: '!' + NOA_OK, text: 'Los dragones de Artejo vuelan en círculos alrededor de la torre de la Planta Eléctrica. Nunca por encima. Los niños de la ciudad tienen una canción sobre eso. Los mayores no la cantan.' },
			],
			route: {
				from: 'piston', to: 'artejo', length: 6, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Sales de Pistón por el norte, entre las últimas chimeneas. El camino baja hacia un río ancho y marrón cruzado por puentes de piedra, uno detrás de otro, como si alguien no se hubiera decidido. Es el **Valle Entrepuentes**.' }],
					1: [
						{ text: 'Un puente levadizo de madera y hierro, el único camino hacia el norte. Hay una garita con una ventanita, un timbre y un cartel: «PUENTE DEL NORTE · SE LEVANTA CON CRECIDA».' },
						{ block: { cond: T4, msg: 'El puente levadizo está levantado. Desde la garita, un operario con impermeable te habla por la ventanita: «Crecida. Esta semana no baja nadie hacia el norte, salvo los trenes de mercancías. Vuelve en unos días, que el río se cansa antes que yo».', dir: 1 } },
					],
					2: [
						{ trainer: 'artn_imogen' },
						{ text: 'Entre dos puentes, en una isla de hierba en mitad del río, crece un árbol de bayas enorme con las ramas colgando sobre el agua. Un Greedent duerme en la horquilla, con las mejillas llenas.' },
						{ spot: { action: { gather: 'b07_entrepuentes' } }, label: 'El árbol de la isla', icon: '🌳', sub: 'Las ramas cuelgan sobre el río' },
						{ item: 'maxpotion' },
					],
					3: [
						{ text: 'La **Llanura Pétrea**: rocas grises del tamaño de casas, tiradas por el prado como dados. Algunas tienen marcas de garra muy antiguas. En una, alguien ha pintado una flecha y la palabra «ARTEJO», y debajo, más pequeño, «por si acaso».' },
						{ trainer: 'artn_callum', optional: true, label: 'Un karateka rompe tablas contra una roca. La roca gana' },
						{ item: 'hyperpotion', hidden: true },
						{ item: 'dragonfang', hidden: true },
					],
					4: [
						{ text: 'La **Cuenca Polvorienta**: una hondonada de arena rojiza donde el viento no para nunca. Te tapas la boca con la manga. Las rocas del borde están medio destapadas, con vetas brillantes que el viento enseña y vuelve a esconder.' },
						{ trainer: 'artn_tamsin' },
						{ spot: { action: { gather: 'b07_cuenca' } }, label: 'Las rocas destapadas', icon: '⛏️', sub: 'El viento enseña vetas que luego vuelve a esconder' },
						{ talk: [{ cond: '!flag.b07_nido_cuenca', script: 'b07_nido_cuenca' }, { script: 'b07_nido_cuenca_apagado' }], label: 'Un nido en mitad de la arena', icon: '🔴', sub: 'La arena se levanta en remolino alrededor', new: '!flag.b07_nido_cuenca' },
						{ item: 'fullrestore', hidden: true },
					],
					5: [
						{ text: 'El camino sube hacia unas rocas negras. A la izquierda, entre las rocas, un sendero baja hacia un lago oscuro que el viento riza siempre del mismo lado.' },
						{ branch: { label: 'Bajar al Lago del Enfado', go: 'lago_enfado', cond: 'true' } },
						{ trainer: 'artn_fergal', optional: true, label: 'Un pescador con chubasquero amarillo te mira desde una roca' },
					],
					6: [{ text: 'En lo alto de la colina, la **muralla** de Artejo: piedra gris, almenas, una puerta enorme con un rastrillo levantado. Por encima, las torres de un castillo. Y detrás, más alta que todo, una torre de metal con una luz roja en la punta. Alrededor, en círculos, dragones. Ninguno pasa por encima.', cond: '!' + NOA_OK }, { text: 'En lo alto de la colina, la **muralla** de Artejo y el castillo. Detrás, la torre de metal, apagada. Por encima, ahora sí, pasan los dragones.', cond: NOA_OK }],
				},
				encounters: { grass: HIERBA_NORTE },
			},
		},

		// ---------- Lago del Enfado ----------
		lago_enfado: {
			name: 'Lago del Enfado', short: 'Lago del Enfado', parent: 'area_norte', kind: 'area',
			bg: { type: 'coast', far: '#5a6a7a', ground: '#4a5a4a' },
			desc: 'Un lago oscuro encajado entre rocas negras, con la orilla de guijarros y juncos tiesos. El viento lo riza siempre del mismo lado, como un ceño fruncido, y nunca del otro. Aquí hace más frío que en el resto del Área Silvestre.\n\nEn una roca plana de la orilla, alguien ha dejado un termo vacío, una caña rota y un cartel escrito a mano: «Al anochecer, no grites. Se asustan».',
			descNight: 'De noche, el Lago del Enfado es negro y quieto, salvo por el lado del viento. Sobre el agua, a ratos, se ven unas formas pequeñas y transparentes que nadan en el aire, muy despacio, como peces que se hubieran equivocado de sitio.',
			mapNote: 'Pesca diaria · Pokémon raros al anochecer · hierba alta entre las rocas',
			rumors: [
				{ text: 'Los pescadores del Lago del Enfado juran que han visto «peces fantasma» nadando en el aire al anochecer. Pequeños, verdes y transparentes. Se acercan a las cañas, miran y se van. Si los persigues, nunca vuelven a acercarse.' },
				{ text: 'En las rocas del lago vive una colonia de Golurk muy viejos. No hacen nada. Miran el agua. Dicen que llevan ahí desde antes que la muralla de Artejo, esperando una orden que no llega.' },
			],
			spots: [
				{ label: 'La hierba alta entre las rocas', sub: 'Algo se mueve donde no llega el viento', icon: '🌿', action: { explore: 'grass' } },
				{ label: 'La orilla del lado del viento', sub: 'Una caña rota y un termo vacío', icon: '🎣', new: '!flag.rec_b07_enfado_pesca', action: { gather: 'b07_enfado_pesca' } },
				{ label: 'El cartel de la roca plana', sub: '«Al anochecer, no grites»', icon: '🪧', talk: [{ script: 'b07_cartel_enfado' }] },
			],
			encounters: {
				grass: [
					{ sp: 'golurk', lv: [68, 70], w: 22 },
					{ sp: 'beheeyem', lv: [68, 70], w: 10 },
					{ sp: 'drapion', lv: [68, 70], w: 8 },
					{ sp: 'garbodor', lv: [68, 70], w: 8 },
					{ sp: 'seismitoad', lv: [68, 70], w: 10 },
					{ sp: 'galvantula', lv: [68, 70], w: 8 },
					{ sp: 'vanilluxe', lv: [68, 70], w: 6 },
					{ sp: 'glalie', lv: [68, 70], w: 6 },
					{ sp: 'braviary', lv: [69, 70], w: 4, time: 'day' },
					{ sp: 'mandibuzz', lv: [69, 70], w: 4, time: 'day' },
					{ sp: 'sigilyph', lv: [68, 70], w: 3 },
					{ sp: 'ditto', lv: [68, 70], w: 4 },
					{ sp: 'noivern', lv: [69, 71], w: 3, time: 'night' },
					{ sp: 'drakloak', lv: [66, 68], w: 3, time: 'night' },
					{ sp: 'dreepy', lv: 66, w: 2 },
					{ sp: 'haxorus', lv: [69, 70], w: 1 },
				],
			},
		},

		// =================== CIUDAD ARTEJO ===================
		artejo: {
			name: 'Ciudad Artejo', short: 'Artejo', region: 'galar', kind: 'city', map: { x: 50, y: 62 },
			bg: { type: 'city', roofs: ['#6a6a7a', '#8a5a3a', '#5a5a6a', '#7a4a3a'], far: '#a8a0a0', ground: '#7a7a6a' },
			desc: 'Una ciudad entera metida dentro de una **muralla** de piedra gris, con calles empinadas, puentes por encima de las calles y tejados de pizarra. En el centro, un **castillo** de verdad: dentro del castillo, aunque parezca mentira, el **Estadio de Artejo**. En la biblioteca del castillo, dicen, hay unos tapices viejos que cuentan una noche en que el cielo de Galar se puso rojo.\n\nDetrás del castillo, más alta que todo, la torre de la **Planta Eléctrica**: metal, cables y una luz roja en la punta. Alrededor vuelan dragones. Nunca por encima.',
			descNight: 'De noche, Artejo es una ciudad de farolas amarillas encerrada en piedra. Las almenas de la muralla tienen faroles. El castillo, iluminado desde abajo, parece más grande de lo que es. La torre de la Planta es lo único que no se apaga nunca: su luz roja late sobre los tejados, despacio.',
			descs: [{ cond: NOA_OK, text: 'Ciudad Artejo, dentro de su muralla de piedra, con su castillo y su estadio. La torre de la Planta Eléctrica sigue ahí, detrás de todo, pero ya no tiene luz en la punta. Por encima, al fin, pasan los dragones.\n\nEn la puerta de la Planta, alguien ha dejado un ramo de flores del Área Silvestre atado con un cordel. Nadie sabe quién. Cada mañana hay uno nuevo.' }],
			links: ['area_norte'],
			mapNote: 'Estadio de Artejo (Roy, Dragón) · Cornisa (entrenamiento) · la muralla · la Planta Eléctrica',
			onEnter: [{ script: 'b07_artejo_llegada', cond: '!' + LLEGADA, once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Artejo', action: { shop: 'tienda_artejo' } },
				{ label: 'Estadio de Artejo', sub: 'Dentro del castillo, aunque parezca mentira', icon: '🏟️', new: '!visited("estadio_artejo")', action: { go: 'estadio_artejo' } },
				{ label: 'Cornisa de Artejo', sub: 'Al pie de la muralla, donde entrenan los dragones', icon: '🐉', new: '!visited("cornisa_artejo")', action: { go: 'cornisa_artejo' } },
				{ label: 'La muralla', sub: 'Piedra gris, almenas y viento', icon: '🏰', action: { go: 'muralla_artejo' } },
				{ label: 'La torre de la Planta Eléctrica', sub: 'Una luz roja en la punta. Los dragones la rodean', icon: '🗼', cond: '!' + PLANTA_ABIERTA, talk: [{ script: 'b07_torre_fuera' }] },
				{ label: 'Planta Eléctrica', sub: 'La torre de metal detrás del castillo', icon: '🗼', cond: PLANTA_ABIERTA, new: 'quest.b07_m5 == "planta" && !visited("planta_artejo")', action: { go: 'planta_artejo' } },
				{ label: 'Dos señores con gabardina en una esquina', sub: 'Leen el mismo periódico. Al derecho', icon: '🕵️', cond: LIBRO_POL + ' && !' + DECIDIDO, talk: [{ script: 'b07_agentes_artejo' }] },
				{ label: 'El quiosco de la plaza', sub: 'Hay cola. Todo el mundo compra la Gaceta', icon: '📰', cond: LIBRO_PRE + ' && !' + DECIDIDO, talk: [{ script: 'b07_quiosco_artejo' }] },
				{ label: 'Escribir a Sera', sub: 'Lo de anoche no se puede quedar así', icon: '📳', cond: SERA_DOLIDA, new: 'true', talk: [{ script: 'b07_sera_reparar' }] },
				{ label: 'Rotom: ¿qué me queda en Artejo?', sub: 'Repasa lo pendiente', icon: '📱', cond: LLEGADA, talk: [{ script: 'b07_artejo_pendiente' }] },
				{ label: 'Las afueras, junto a la muralla', sub: 'Colinas de hierba donde planean los dragones', icon: '🌿', action: { explore: 'grass' } },
			],
			encounters: {
				grass: [
					{ sp: 'corviknight', lv: [69, 70], w: 14 },
					{ sp: 'unfezant', lv: [68, 70], w: 14, time: 'day' },
					{ sp: 'bewear', lv: [68, 70], w: 10 },
					{ sp: 'sudowoodo', lv: [68, 70], w: 10 },
					{ sp: 'machamp', lv: [69, 70], w: 8 },
					{ sp: 'gourgeist', lv: [68, 70], w: 10, time: 'night' },
					{ sp: 'seismitoad', lv: [68, 70], w: 6 },
					{ sp: 'golisopod', lv: [69, 70], w: 4 },
					{ sp: 'beartic', lv: [68, 70], w: 6 },
					{ sp: 'aegislash', lv: [70, 71], w: 2, time: 'night' },
					{ sp: 'flygon', lv: [69, 71], w: 2 },
					{ sp: 'dreepy', lv: 66, w: 1, time: 'night' },
				],
			},
			rumors: [
				{ text: 'El Estadio de Artejo está dentro del castillo porque, cuando hicieron el estadio, nadie quiso tirar el castillo. Así que metieron el estadio dentro. Los de Pistón dicen que es lo más de Artejo que han hecho nunca.' },
				{ text: 'Roy, el líder, se hace fotos con todo el mundo. Con los que le ganan, con los que pierden, con los turistas y con las palomas. Dicen que tiene más fotos que el Campeón. Él dice que no es una competencia. Lo dice siempre. Eso quiere decir que sí.' },
				{ cond: '!' + NOA_OK, text: 'La Planta Eléctrica de Artejo era de Macrocosmos. Cuando el presidente de Macrocosmos cayó, la planta siguió funcionando sola. O eso dicen. En el turno de noche entran furgonetas blancas sin logotipo. Las ven los panaderos, que son los únicos despiertos a esas horas.' },
				{ cond: NOA_OK, text: 'Dicen que la Planta Eléctrica se paró una madrugada y que esa noche se oyó un rugido debajo de la ciudad. Los perros de Artejo se pusieron a aullar todos a la vez, mirando al oeste. Por la mañana, los dragones volaban por encima de la torre por primera vez en años.' },
			],
		},

		// ---------- Estadio de Artejo ----------
		estadio_artejo: {
			name: 'Estadio de Artejo', short: 'Estadio', parent: 'artejo', kind: 'gym',
			bg: { type: 'gym', wall: '#4a4a5a', floor: '#6a6a5a' },
			desc: 'Se entra por el patio del castillo, bajo un arco de piedra con escudos tallados. Dentro, sorpresa: un estadio moderno, con gradas de hormigón, focos enormes y un campo de tierra apisonada, encajado entre los muros del castillo como un barco en una botella.\n\nEn lo alto, por las ventanas del torreón, se ven pasar dragones.',
			descNight: 'De noche, los focos del estadio rebotan en las paredes del castillo y lo pintan de blanco. En las gradas vacías, un Flygon duerme hecho una bola. Alguien ha dejado un palo de selfi apoyado en la barandilla.',
			descs: [{ cond: ROY, text: 'El Estadio de Artejo, encajado en el castillo. En el túnel de los jugadores han colgado una foto nueva, recién impresa: Roy, muy sonriente, y a su lado tú, con cara de no saber que te estaban haciendo una foto.' }],
			mapNote: 'Gimnasio de Roy (Dragón)',
			onEnter: [{ script: 'b07_estadio_artejo_entrada', cond: '!flag.b07_gym_artejo_visto', once: true }],
			spots: [
				{ label: 'Retar a Roy', sub: 'Líder de Artejo · tipo Dragón', icon: '🐉', cond: '!' + ROY, new: 'true', talk: [{ script: 'b07_roy_reto' }] },
				{ label: 'Roy', sub: 'Mira su teléfono y luego el cielo', icon: '🐉', cond: ROY, talk: [{ script: 'b07_roy_despues' }] },
				{ label: 'Entrenador del estadio', sub: 'Un ayudante de Roy calienta con su Flapple', icon: '🥾', action: { trainer: 'gym_artejo_ayudante' } },
			],
		},

		// ---------- Cornisa de Artejo (entrenamiento) ----------
		cornisa_artejo: {
			name: 'Cornisa de Artejo', short: 'Cornisa', parent: 'artejo', kind: 'area',
			bg: { type: 'mountain', far: '#a8a0a0', ground: '#7a7a6a' },
			desc: 'Un saliente de roca al pie de la muralla, por fuera, con vistas a todo el Área Silvestre. El viento sube por la ladera y los dragones de la ciudad lo usan para planear sin mover las alas.\n\nAquí entrenan los domadores de Artejo. En una garita de piedra, una mujer mayor con un catalejo vigila el cielo y apunta cosas en una pizarra.',
			descNight: 'De noche, en la Cornisa solo se oye el viento y, de vez en cuando, un batir de alas por encima. La garita de la vigía tiene la lámpara encendida. El catalejo apunta a la torre de la Planta.',
			mapNote: 'Entrenamiento (tope 72) · premio de la vigía',
			spots: [
				{ label: 'El saliente de los domadores', sub: 'Zona de entrenamiento (nivel recomendado 72)', icon: '🐉', action: { training: {
					cap: 72, trainers: ['cornisa_1', 'cornisa_2', 'cornisa_3'], npc: 'vigia_artejo', coach: 'La vigía',
					prize: { wins: 3, script: 'b07_premio_cornisa' },
					closed: 'La vigía baja el catalejo, mira a tu equipo de arriba abajo y vuelve a subir el catalejo. «Esos ya vuelan solos. Aquí no aprenden nada. Si quieres echar unos combates de exhibición, los chicos encantados: les sienta bien perder con alguien que sabe».',
				} } },
				{ label: 'La vigía, en su garita', sub: 'Un catalejo, una pizarra y un termo', icon: '🔭', new: '!flag.b07_vigia_charla', talk: [{ script: 'b07_vigia' }] },
			],
		},

		// ---------- La muralla ----------
		muralla_artejo: {
			name: 'La muralla de Artejo', short: 'Muralla', parent: 'artejo', kind: 'area',
			bg: { type: 'castle', far: '#b8b0a8', ground: '#7a7a6a' },
			desc: 'El adarve de la muralla: un pasillo de piedra entre almenas, tan ancho que caben dos carros. Desde aquí se ve toda Artejo por un lado y todo el Área Silvestre por el otro, hasta las chimeneas de Pistón.\n\nEn las almenas hay nombres rayados con navaja, algunos de hace siglos. Uno dice solo «VOLVÍ».',
			descNight: 'De noche, la muralla es un camino de faroles entre dos oscuridades: la ciudad dormida y el campo. El viento silba entre las almenas. A lo lejos, al oeste, una mancha de niebla que no se mueve: el Bosque Oniria.',
			descs: [{ cond: 'flag.b07_az_artejo', text: 'El adarve de la muralla de Artejo, entre almenas. En una piedra, a la altura de la mano, hay una flor roja que no se marchita y que el viento no mueve. Nadie la quita. Los guardias la rodean al hacer la ronda, sin hablar de ello.' }],
			mapNote: 'Vistas del Área Silvestre · al amanecer',
			onEnter: [{ script: 'b07_muralla', cond: 'flag.b07_archivo_hecho && !flag.b07_az_artejo', once: true }],
			spots: [
				{ label: 'Al amanecer: un hombre enorme', sub: 'Mira el Área Silvestre con una flor en el hombro', icon: '🌺', cond: 'flag.b07_archivo_hecho && !flag.b07_az_artejo', new: 'true', talk: [{ script: 'b07_muralla' }] },
				{ label: 'Octavia Lemnis, apoyada en una almena', sub: 'Espera a que digas algo', icon: '♾️', cond: 'flag.b07_az_artejo && !' + DECIDIDO, new: 'true', talk: [{ script: 'b07_octavia_muralla' }] },
				{ label: 'Bajar al Centro Pokémon', sub: 'Ya es de día', icon: '🌅', cond: DECIDIDO + ' && !flag.b07_fin', new: 'true', talk: [{ script: 'b07_fin' }] },
				{ label: 'La flor roja de la almena', sub: 'No se marchita. No la mueve el viento', icon: '🌺', cond: 'flag.b07_az_artejo', talk: [{ script: 'b07_flor_muralla' }] },
				{ label: 'Las almenas', sub: 'Nombres rayados con navaja', icon: '🧱', talk: [{ script: 'b07_almenas' }] },
			],
		},

		// =================== LA PLANTA ELÉCTRICA ===================
		planta_artejo: {
			name: 'Planta Eléctrica', short: 'Planta', parent: 'artejo', kind: 'building',
			bg: { type: 'lab', wall: '#3a3a4a', floor: '#2b2b38' },
			desc: 'La sala de control de la Planta Eléctrica de Artejo: un vestíbulo redondo de metal y cristal, con pantallas en las paredes, una consola enorme en el centro y un ascensor de rejilla que sube por dentro de la torre. Todo zumba. El suelo vibra un poco, siempre, como si debajo hubiera algo respirando.\n\nEn las pantallas, gráficas que suben. En una placa, junto al ascensor: «NODO 06 · ACCESO RESTRINGIDO». Al fondo, una puerta de servicio que baja.',
			descNight: 'De noche, la sala de control de la Planta solo tiene la luz de las pantallas: verde, azul y, en una esquina, roja. El zumbido se oye más. Los técnicos del turno de noche no levantan la vista.',
			descs: [{ cond: NOA_OK, text: 'La sala de control de la Planta Eléctrica, con sus pantallas y su consola. Ya no zumba. Ya no vibra el suelo. Las gráficas de las paredes están planas. Los técnicos hablan bajito, como en un hospital.\n\nAl fondo, la puerta de servicio que baja al emplazamiento 06 tiene una cinta amarilla cruzada y una silla delante. En la silla, cada mañana, un ramo de flores.' }],
			mapNote: 'La sala de control · el emplazamiento 06 · el archivo · la cima de la torre',
			onEnter: [{ script: 'b07_planta_entrada', cond: '!flag.b07_planta_dentro', once: true }],
			spots: [
				{ label: 'El guardia de la entrada', sub: 'Uniforme gris, gafas cuadradas y prisa', icon: '🛡️', cond: '!beat("macro_1")', new: 'true', talk: [{ script: 'b07_guardia_entrada' }] },
				{ label: 'Magda Ivers, delante de la consola', sub: 'Abrigo gris, termo de té y una libreta', icon: '📐', cond: 'beat("macro_1") && !flag.b07_magda', new: 'true', talk: [{ script: 'b07_magda' }] },
				{ label: 'Magda, en la consola', sub: 'Repasa las cuentas con el dedo', icon: '📐', cond: 'flag.b07_magda', talk: [{ script: 'b07_magda_despues' }] },
				{ label: 'Un guardia en el pasillo de servicio', sub: 'Bloquea la escalera que baja', icon: '🛡️', cond: 'flag.b07_magda && !beat("macro_2") && !flag.b07_atajo_eco && !' + NOA_OK, new: 'true', talk: [{ script: 'b07_guardia_pasillo' }] },
				{ label: 'Rotom: «Conozco otro camino»', sub: 'La pantalla de la Pokédex enseña un plano', icon: '📱', cond: REFORM + ' && flag.b07_magda && !beat("macro_2") && !flag.b07_atajo_eco && !' + NOA_OK, new: 'true', talk: [{ script: 'b07_atajo_eco' }] },
				{ label: 'Bajar al emplazamiento 06', sub: 'La puerta de servicio, abierta por Magda', icon: '⬇️', cond: 'flag.b07_magda && (beat("macro_2") || flag.b07_atajo_eco) && !' + NOA_OK, new: '!visited("planta_jaulas")', action: { go: 'planta_jaulas' } },
				{ label: 'Subir a la cima de la torre', sub: 'El ascensor de rejilla', icon: '⬆️', cond: 'flag.b07_octavia', new: '!flag.b07_olivia_vencida', action: { go: 'planta_cima' } },
				{ label: 'El archivo', sub: 'Una puerta blindada detrás de la consola', icon: '🗄️', cond: 'flag.b07_eternatus_visto', new: '!flag.b07_archivo_hecho', action: { go: 'planta_archivo' } },
				{ label: 'La puerta del emplazamiento 06', sub: 'Una cinta amarilla y una silla con flores', icon: '💐', cond: NOA_OK, talk: [{ script: 'b07_puerta_precintada' }] },
			],
		},
		planta_jaulas: {
			name: 'Emplazamiento 06', short: 'Emplazamiento 06', parent: 'planta_artejo', kind: 'building',
			bg: { type: 'lab', wall: '#2b2b38', floor: '#1e1e28' },
			desc: 'Una sala larga y baja bajo la Planta, iluminada con tubos blancos. A los dos lados, jaulas. Muchas. Cada una con una etiqueta: «Destino: por asignar». De cada jaula sale un cable que va por el suelo hasta el fondo de la sala, hasta una **sala de cristal** con una compuerta de acero levantada.\n\nA la derecha, una puerta con un cartel de plástico: «LOGÍSTICA».',
			descNight: 'Aquí abajo no hay noche ni día: solo los tubos blancos, el zumbido y la respiración de los Pokémon en las jaulas. Ninguno hace ruido. Eso es lo peor.',
			mapNote: 'Las jaulas · la oficina de logística · la sala de cristal',
			onEnter: [{ script: 'b07_jaulas_entrada', cond: '!flag.b07_jaulas_vistas', once: true }],
			spots: [
				{ label: 'La oficina de logística', sub: 'La puerta está entornada. Dentro hay luz', icon: '🚪', cond: '!flag.b07_lucien_encontrado', new: 'true', talk: [{ script: 'b07_lucien_oficina' }] },
				{ label: 'Dos guardias bajan por la escalera', sub: 'Vienen directos. Como si supieran adónde', icon: '🛡️', cond: 'flag.b07_doble_cuenta_t5 && !beat("macro_3") && !' + NOA_OK, new: 'true', talk: [{ script: 'b07_guardias_jaulas' }] },
				{ label: 'La sala de cristal', sub: 'Al fondo, entre los cables. Hay alguien dentro', icon: '🪟', cond: 'flag.b07_lucien_encontrado && (!flag.b07_doble_cuenta_t5 || beat("macro_3")) && !' + NOA_OK, new: 'true', talk: [{ script: 'b07_noa' }] },
			],
		},
		planta_archivo: {
			name: 'Archivo de la Planta', short: 'Archivo', parent: 'planta_artejo', kind: 'building',
			bg: { type: 'indoor', wall: '#4a4a5a', floor: '#3a3a44' },
			desc: 'Una sala sin ventanas, fría, con estanterías metálicas hasta el techo llenas de carpetas grises. Huele a papel y a polvo de impresora. En el centro, una mesa larga y una lámpara de flexo.\n\nEn las carpetas, etiquetas con fechas, códigos y una palabra que se repite: «Dirección».',
			descNight: 'En el archivo no hay noche: solo el flexo y el zumbido de un deshumidificador. Las carpetas grises parecen todas iguales hasta que lees las etiquetas. Entonces ya no.',
			mapNote: 'Carpetas de Dirección',
			onEnter: [{ script: 'b07_archivo', cond: 'flag.b07_eternatus_visto && !flag.b07_archivo_hecho', once: true }],
			spots: [
				{ label: 'La mesa del flexo', sub: 'Octavia ha dejado dos carpetas abiertas', icon: '🗄️', cond: 'flag.b07_eternatus_visto && !flag.b07_archivo_hecho', new: 'true', talk: [{ script: 'b07_archivo' }] },
				{ label: 'Las estanterías', sub: 'Carpetas grises hasta el techo', icon: '📚', cond: 'flag.b07_archivo_hecho', talk: [{ script: 'b07_archivo_despues' }] },
			],
		},
		planta_cima: {
			name: 'La cima de la torre', short: 'Cima', parent: 'planta_artejo', kind: 'area',
			bg: { type: 'tower', far: '#3a2a3a', ground: '#4a4a5a' },
			desc: 'La plataforma de lo alto de la torre: una rejilla de metal al aire libre, barandillas y, en el centro, el **nodo**: un anillo de acero del tamaño de una casa, con una luz roja girando dentro, despacio. El viento de Galar silba entre los cables. Abajo, Artejo entera, sus tejados y su muralla.\n\nDebajo de la rejilla, por el hueco de la torre, se ve muy hondo. Y algo, todavía más hondo, que brilla.',
			descNight: 'De noche, en la cima de la torre, la luz roja del nodo lo tiñe todo: la rejilla, las barandillas, tus manos. Abajo, la ciudad es un puñado de farolas dentro de un anillo de piedra.',
			descs: [{ cond: 'flag.b07_olivia_vencida', text: 'La cima de la torre, con su rejilla y sus barandillas. El anillo del nodo está apagado y frío, con una grieta de arriba abajo. Por el hueco de la torre ya no brilla nada. El viento sopla igual que siempre, como si no se hubiera enterado de nada.' }],
			mapNote: 'El nodo',
			spots: [
				{ label: 'Olivia, junto al nodo', sub: 'Traje oscuro, pelo blanco, ni un mechón fuera de sitio', icon: '🔴', cond: '!flag.b07_olivia_vencida', new: 'true', talk: [{ script: 'b07_olivia' }] },
				{ label: 'Olivia, sentada en la rejilla', sub: 'Mira el anillo apagado', icon: '⚫', cond: 'flag.b07_olivia_vencida', talk: [{ script: 'b07_olivia_despues' }] },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Área Silvestre (norte) -----
		artn_imogen: { name: 'Imogen', cls: 'Montañera', ai: 3, reward: 2800,
			team: [
				{ sp: 'hippowdon', lv: 69, moves: ['earthquake', 'stoneedge', 'slackoff', 'yawn'], ability: 'sandstream' },
				{ sp: 'mamoswine', lv: 70, moves: ['earthquake', 'iciclespear', 'iceshard', 'knockoff'], ability: 'thickfat' },
			],
			intro: 'Cruzo estos puentes todas las semanas, desde Pistón hasta Artejo, con la mochila llena de piedras para el museo. Treinta y dos puentes. Los cuento. ¡Y en el treinta y tres, combate!',
			win: 'Bueno. Treinta y dos puentes y una derrota. Lo apunto en la libreta de las piedras. Ahí cabe todo.',
			look: { hair: 'braids', hairColor: '#6b4a2b', outfit: '#5a6a3a', outfit2: '#c9a66b', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'beanie freckles', collar: 'vest', capColor: '#c43a3a' } },
		artn_callum: { name: 'Callum', cls: 'Karateka', ai: 3, reward: 2800,
			team: [
				{ sp: 'bewear', lv: 69, moves: ['hammerarm', 'doubleedge', 'shadowclaw', 'payback'], ability: 'fluffy' },
				{ sp: 'scrafty', lv: 70, moves: ['drainpunch', 'crunch', 'icepunch', 'bulkup'], ability: 'intimidate' },
			],
			intro: 'Esta roca y yo llevamos tres años peleando. Ella va ganando, pero yo tengo más resistencia. Bueno, ella también. ¡Te toca a ti, que ella necesita descansar!',
			win: 'Ni la roca ni tú. Hoy me voy a casa con las manos rojas y el orgullo azul. Es un color raro para un orgullo.',
			look: { hair: 'short', hairColor: '#2a2420', outfit: '#e9e8e0', outfit2: '#2a2420', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'headband', collar: 'tshirt', build: 'broad' } },
		artn_tamsin: { name: 'Tamsin', cls: 'Excavadora', ai: 3, reward: 2800,
			team: [
				{ sp: 'drapion', lv: 70, moves: ['crunch', 'poisonjab', 'earthquake', 'aquatail'], ability: 'battlearmor' },
				{ sp: 'stonjourner', lv: 70, moves: ['stoneedge', 'heatcrash', 'highhorsepower', 'wideguard'], ability: 'powerspot' },
			],
			intro: 'En la Cuenca no se excava: se espera a que el viento destape y se corre. ¡Yo llevo diez años corriendo! ¡Ahora me toca estar quieta y que corras tú!',
			win: '¡Arena en los ojos y una derrota en la mochila! Buen día, pese a todo. El viento me ha destapado una veta mientras peleábamos. Nunca lo hace cuando miro.',
			look: { hair: 'tied', hairColor: '#c4743a', outfit: '#8a6448', outfit2: '#f2c84a', skin: 2, eyesStyle: 'narrow', mouth: 'grin', acc: 'goggles bandana', collar: 'vest' } },
		artn_fergal: { name: 'Fergal', cls: 'Pescador', ai: 3, reward: 2840,
			team: [
				{ sp: 'barraskewda', lv: 70, moves: ['liquidation', 'closecombat', 'psychicfangs', 'crunch'], ability: 'propellertail' },
				{ sp: 'gyarados', lv: 71, moves: ['waterfall', 'earthquake', 'icefang', 'dragondance'], ability: 'intimidate' },
			],
			intro: 'En el Lago del Enfado no se grita. Así que te reto en voz baja. ¿Me oyes? Te estoy retando. Muy bajito.',
			win: '…Bien jugado. —Muy bajito—. Si bajas al lago al anochecer, quédate quiet{o|a|e}. Lo que nada en el aire se acerca a los que no se mueven.',
			look: { hair: 'cap', hairColor: '#4a3a2a', outfit: '#f2c84a', outfit2: '#3a4a5a', skin: 1, eyesStyle: 'sleepy', mouth: 'flat', acc: 'beard', collar: 'jacket', capColor: '#f2c84a' } },

		// ----- Estadio de Artejo -----
		gym_artejo_ayudante: { name: 'Dougal', cls: 'Domador del estadio', ai: 3, reward: 2840, bg: 'gym',
			team: [
				{ sp: 'flapple', lv: 70, moves: ['gravapple', 'dragonrush', 'uturn', 'acrobatics'], ability: 'hustle' },
				{ sp: 'noivern', lv: 71, moves: ['airslash', 'dragonpulse', 'boomburst', 'uturn'], ability: 'infiltrator' },
			],
			intro: 'Antes de Roy, yo. Bueno, no es obligatorio. Pero Roy dice que si un retador no calienta, luego sale mal en las fotos. ¡Y Roy se toma las fotos muy en serio!',
			win: 'Caliente estás. Roy está en el centro del campo, mirando el teléfono. No le digas que lo has visto mirando el teléfono.',
			look: { hair: 'spiky', hairColor: '#2a2420', outfit: '#3a3a4a', outfit2: '#e98a3a', skin: 4, eyesStyle: 'normal', mouth: 'grin', acc: 'headband', collar: 'hoodie' } },

		// ----- Cornisa de Artejo (zona de entrenamiento) -----
		cornisa_1: { name: 'Elspeth', cls: 'Domadora de dragones', ai: 2,
			team: [
				{ sp: 'drampa', lv: 69, moves: ['hypervoice', 'dragonpulse', 'flamethrower', 'thunderbolt'] },
				{ sp: 'kingdra', lv: 70, moves: ['hydropump', 'dracometeor', 'icebeam', 'raindance'] },
			],
			intro: 'La vigía dice que un dragón que no pelea se aburre y, cuando se aburre, se come las almenas. ¡Literal! ¡Hay almenas mordidas! ¡Combate, por la muralla!',
			win: 'La muralla está a salvo un día más. Mis dragones están cansados y contentos. Yo, solo cansada.',
			look: { hair: 'ponytail', hairColor: '#c4473a', outfit: '#3a3a4a', outfit2: '#3aa3a0', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'goggles', collar: 'jacket' } },
		cornisa_2: { name: 'Lachlan', cls: 'Domador de dragones', ai: 2,
			team: [
				{ sp: 'haxorus', lv: 70, moves: ['outrage', 'earthquake', 'poisonjab', 'dragondance'] },
				{ sp: 'dragalge', lv: 70, moves: ['sludgewave', 'dragonpulse', 'focusblast', 'toxic'] },
			],
			intro: 'Aquí el viento sube por la ladera y los dragones planean sin mover las alas. Yo no planeo: yo peleo. ¡A ver si lo aguantas sin moverte!',
			win: 'Me has dejado sin viento. Eso aquí arriba es difícil. Muy difícil.',
			look: { hair: 'short', hairColor: '#6b4a2b', outfit: '#4a5a3a', outfit2: '#e98a3a', skin: 2, eyesStyle: 'sharp', mouth: 'smirk', acc: 'scar', collar: 'jacket' } },
		cornisa_3: { name: 'Cerys', cls: 'Domadora veterana', ai: 3,
			team: [
				{ sp: 'garchomp', lv: 70, moves: ['earthquake', 'dragonclaw', 'stoneedge', 'swordsdance'] },
				{ sp: 'hydreigon', lv: 71, moves: ['darkpulse', 'dragonpulse', 'flamethrower', 'earthpower'] },
			],
			intro: 'Yo entrené con la vigía cuando Roy todavía llevaba la gorra del revés. Bueno, la sigue llevando. Pero entonces no tenía razón. ¡Combate!',
			win: 'Es verdad lo que dice la vigía de ti. —Se cruza de brazos—. Y no lo dice de casi nadie.',
			look: { hair: 'long', hairColor: '#9aa0a8', outfit: '#2a2420', outfit2: '#c43a3a', skin: 3, eyesStyle: 'narrow', mouth: 'flat', acc: 'earrings', collar: 'cape' } },

		// ----- Seguridad de Macrocosmos (la Planta) -----
		macro_1: { name: 'Seguridad de Macrocosmos', cls: 'Guardia', npc: 'seguridad_macro', ai: 3, reward: 2840, bg: 'lab',
			team: [
				{ sp: 'klinklang', lv: 70, moves: ['geargrind', 'wildcharge', 'shiftgear', 'thunderwave'], ability: 'clearbody' },
				{ sp: 'perrserker', lv: 70, moves: ['ironhead', 'crunch', 'closecombat', 'uturn'], ability: 'toughclaws' },
				{ sp: 'magnezone', lv: 71, moves: ['flashcannon', 'thunderbolt', 'voltswitch', 'bodypress'], ability: 'analytic' },
			],
			intro: 'Turno de noche. Nadie entra, nadie sale. Son las normas. Me pagan por cumplirlas, no por entenderlas.',
			win: 'Ya, ya. —Levanta las manos—. Pasa. No te he visto. Mañana pido el traslado a la central de Puntera. Allí por lo menos hay máquina de café.',
			lose: 'Normas son normas. Vete al Centro Pokémon y vuelve con otra cara. O con la misma, pero descansada.' },
		macro_2: { name: 'Seguridad de Macrocosmos', cls: 'Guardia', npc: 'seguridad_macro', ai: 3, reward: 2840, bg: 'lab',
			team: [
				{ sp: 'bronzong', lv: 70, moves: ['gyroball', 'earthquake', 'psychic', 'trickroom'], ability: 'levitate' },
				{ sp: 'corviknight', lv: 71, moves: ['bravebird', 'ironhead', 'bodypress', 'uturn'], ability: 'pressure' },
			],
			intro: 'Por esta escalera no baja nadie. La señora Olivia ha sido muy clara. Ha dicho «nadie» tres veces. Yo nunca había oído a nadie decir «nadie» tres veces.',
			win: 'Ya. —Se aparta de la escalera—. Abajo hay cosas que no me pagan por mirar. Yo no las miro. A lo mejor tú sí.' },
		macro_3: { name: 'Seguridad de Macrocosmos', cls: 'Guardias', npc: 'seguridad_macro', ai: 3, reward: 2840, bg: 'lab',
			team: [
				{ sp: 'weezinggalar', lv: 70, moves: ['strangesteam', 'sludgebomb', 'fireblast', 'willowisp'], ability: 'neutralizinggas' },
				{ sp: 'boltund', lv: 70, moves: ['wildcharge', 'crunch', 'firefang', 'playrough'], ability: 'strongjaw' },
				{ sp: 'copperajah', lv: 71, moves: ['ironhead', 'playrough', 'heavyslam', 'highhorsepower'], ability: 'sheerforce' },
			],
			intro: 'Nos han dicho que estarías aquí abajo. Y aquí estás. Qué puntual.',
			win: 'Da igual. Ya saben dónde estás. Lo saben desde hace un rato.' },

		// ----- Roy (líder de Artejo, Dragón) -----
		roy_g: { name: 'Roy', cls: 'Líder', npc: 'roy', ai: 4, iv: 26, reward: 7920, bg: 'gym', terrain: 'gym',
			gimmick: 'dynamax', ace: 'duraludon',
			team: [
				{ sp: 'flygon', lv: 68, moves: ['earthquake', 'dragonclaw', 'uturn', 'firepunch'], ability: 'levitate', nature: 'jolly', iv: 25 },
				{ sp: 'sandaconda', lv: 68, moves: ['drillrun', 'stoneedge', 'rockslide', 'bodyslam'], ability: 'shedskin', nature: 'impish', iv: 25 },
				{ sp: 'turtonator', lv: 69, moves: ['flamethrower', 'dragonpulse', 'bodypress', 'protect'], ability: 'shellarmor', nature: 'modest', iv: 26 },
				{ sp: 'goodra', lv: 69, moves: ['dragonpulse', 'thunderbolt', 'sludgebomb', 'flamethrower'], ability: 'sapsipper', nature: 'modest', iv: 26 },
				{ sp: 'duraludon', lv: 72, gmax: true, moves: ['flashcannon', 'dragonpulse', 'thunderbolt', 'bodypress'], ability: 'stalwart', item: 'sitrusberry', nature: 'modest', iv: 30 },
			],
			items: [{ id: 'superpotion', n: 1 }, { id: 'fullheal', n: 1 }],
			intro: 'Foto antes, que luego salgo despeinado. —Clic—. Ya está. Ahora sí: vamos a ver qué tiempo hace en este combate. Porque lo voy a cambiar.',
			win: 'Vaya. Vaya, vaya. —Se ríe, de verdad—. Me has ganado en mi castillo. Esta foto la voy a imprimir.',
			lose: 'Tormenta de arena, dragones y una torre que se hace enorme. Ya sabes cómo va esto. Vuelve cuando quieras: siempre tengo batería.' },

		// ----- Olivia (jefa de trama) -----
		olivia_1: { name: 'Olivia', cls: 'Ex directiva de Macrocosmos', npc: 'olivia_mc', ai: 5, iv: 28, reward: 8760, bg: 'gym', terrain: 'gym',
			gimmick: 'dynamax', ace: 'garbodor',
			team: [
				{ sp: 'froslass', lv: 69, moves: ['icebeam', 'shadowball', 'spikes', 'willowisp'], ability: 'cursedbody', nature: 'timid', iv: 27 },
				{ sp: 'milotic', lv: 70, moves: ['surf', 'icebeam', 'dragontail', 'toxic'], ability: 'competitive', nature: 'bold', iv: 27 },
				{ sp: 'salazzle', lv: 70, moves: ['flamethrower', 'sludgewave', 'venoshock', 'protect'], ability: 'corrosion', nature: 'timid', iv: 27 },
				{ sp: 'tsareena', lv: 70, moves: ['highjumpkick', 'tropkick', 'uturn', 'knockoff'], ability: 'queenlymajesty', nature: 'jolly', iv: 27 },
				{ sp: 'copperajah', lv: 71, moves: ['ironhead', 'playrough', 'heavyslam', 'highhorsepower'], ability: 'sheerforce', nature: 'adamant', iv: 27 },
				{ sp: 'garbodor', lv: 73, gmax: true, moves: ['gunkshot', 'drainpunch', 'toxicspikes', 'stompingtantrum'], ability: 'aftermath', item: 'blacksludge', nature: 'adamant', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 1 }, { id: 'superpotion', n: 1 }],
			intro: 'Le voy a enseñar lo que hace esta torre. Para que sepa lo que está apagando.',
			win: 'Eficiente. —Se alisa la falda—. Muy eficiente. Ojalá todo el mundo lo fuera.',
			lose: 'El nodo sigue encendido. Usted sigue aquí. Una de las dos cosas va a cambiar. No será el nodo.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== ÁREA SILVESTRE (NORTE) ===================
		b07_nido_cuenca: [
			{ text: 'En mitad de la arena, un círculo de piedras negras. El viento sopla alrededor sin entrar, como si hubiera una pared invisible. Dentro, una luz roja late en un agujero, y huele a carbón caliente.' },
			{ say: 'rotom', text: '¡Bzzt! Otro nido. Este quema. Lo que hay dentro está muy despierto y de muy mal humor. ¿Lo molestamos?', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Nido. Caliente. Algo enfadado. ¿Bajamos?', cond: PURG },
			{ prompt: 'La luz roja late. La arena de alrededor se levanta en remolino.', choice: [
				{ text: 'Meter una piedra en el nido.', then: [
					{ text: 'La piedra cae, rebota, y el nido entero escupe una columna de arena y fuego. De dentro sale, creciendo, retorciéndose, un **Centiskorch** del tamaño de un tren, con todas las patas encendidas y nubes rojas alrededor.' },
					{ wild: { sp: 'centiskorch', lv: 69, gimmick: 'dynamax', unique: false }, canRun: true,
						onWin: [{ set: { 'flag.b07_nido_cuenca': true } }, { text: 'El Centiskorch se deshincha con un silbido de tetera y se entierra en la arena, dejando un surco humeante. La luz del nido se apaga.' }],
						onCatch: [{ set: { 'flag.b07_nido_cuenca': true } }, { text: 'El nido se queda a oscuras. La arena entra por fin y lo tapa poco a poco.' }],
						onRun: [{ text: 'Te alejas tosiendo arena. El Centiskorch se deshincha y vuelve a enroscarse en el nido. La luz sigue latiendo.' }],
						onLose: [{ text: 'El Centiskorch gigante te echa del círculo con una ola de arena caliente y vuelve a su nido. La luz sigue latiendo. Te espera.' }] },
				] },
				{ text: 'Mejor no.', then: [{ text: 'Te apartas. El viento vuelve a soplar alrededor del círculo, sin entrar. Lo que hay dentro sigue a lo suyo.' }] },
			] },
		],
		b07_nido_cuenca_apagado: [
			{ text: 'El nido de la Cuenca está apagado y medio lleno de arena. Un surco chamuscado se aleja de él hacia las rocas. Ahí no queda nada más que calor.' },
		],
		b07_cartel_enfado: [
			{ text: 'El cartel está escrito con rotulador en una tabla de cajón: «AL ANOCHECER, NO GRITES. SE ASUSTAN. Y SI SE ASUSTAN, NO VUELVEN. — F.».' },
			{ text: 'Debajo, con otra letra, más torpe: «¿Quiénes?». Y debajo, otra vez con la primera: «Ya los verás».' },
			{ text: 'Ahora mismo, sobre el agua, algo pequeño y transparente da una vuelta en el aire y desaparece entre las rocas.', cond: 'night' },
		],

		// =================== ARTEJO: LLEGADA ===================
		b07_artejo_llegada: [
			{ if: LLEGADA, then: [{ end: true }] },
			{ set: { 'flag.b07_artejo_llegada': true, 'flag.b07_m_aviso': true } },
			{ text: 'Pasas bajo el rastrillo de la puerta de la muralla. Dentro, las calles suben empinadas entre casas de piedra, con puentes de una casa a otra por encima de tu cabeza. Huele a pan, a piedra mojada y a algo eléctrico, como antes de una tormenta.' },
			{ text: 'En el centro, el castillo. Detrás del castillo, la torre de la Planta Eléctrica, más alta que todo, con una luz roja en la punta que late despacio. Alrededor de la torre, en círculos, vuelan dragones. Ninguno pasa por encima. Ni uno.' },
			{ if: LUC, then: [
				{ text: '{riolu} se para en mitad de la calle y mira la torre. No gruñe. Se le encoge el aura, como cuando hace frío.' },
			] },
			{ if: 'flag.b07_noa_mensaje', then: [
				{ text: 'Sacas el sobre de logística del bolsillo y lo vuelves a leer, aunque ya te lo sabes: «Emplazamiento 06. Artejo. Sé contar. Si no llego, abre tú».' },
			] },
			{ if: LIBRO_POL, then: [
				{ text: 'En una esquina de la plaza, dos señores con gabardina leen el mismo periódico. Al derecho. Uno te hace un gesto con la cabeza, muy pequeño. Son de Handsome.' },
			] },
			{ if: LIBRO_PRE, then: [
				{ text: 'En el quiosco de la plaza hay cola. En la portada de la *Gaceta*, en letras enormes: «¿QUIÉN PAGA LOS TORNEOS QUE NO EXISTEN?». Debajo, la firma de Alexia. Y en la esquina, «con la colaboración de *Casos Fríos*».' },
			] },
			{ if: LIBRO_OCT, then: [
				{ text: 'En la oficina de correos de la plaza, mandas el libro de cuentas del torneo por mensajería urgente: «A la atención de la presidenta de Lemnis. En mano». El empleado pregunta si es frágil. Le dices que sí.' },
			] },
			{ quest: 'b07_m5', stage: 'gimnasio' },
			{ say: 'rotom', text: '¡Bzzt! Ciudad Artejo. Muralla, castillo y un estadio dentro del castillo. ¡Dentro! El líder es **Roy**, tipo Dragón. —Pausa—. Y la torre… Esa torre lleva la luz roja como los nodos. Lo apunto. No me gusta apuntarlo.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Artejo. Estadio en el castillo. Líder: Roy. Dragón. —Pausa—. La torre tiene una luz roja. Como en Teselia. No me gusta.', cond: PURG },
			{ diary: 'Hoy llegamos a Artejo. Tiene una muralla de verdad, con un rastrillo. Las calles suben mucho.\n\nHay una torre con una luz roja arriba. Los dragones vuelan alrededor. Por encima, no. Ninguno.\n\nEl sobre decía «emplazamiento 06». Creo que es aquí. {jugador} lo ha leído otra vez.', cond: D_PURGADO },
			{ diary: 'Hoy llegamos a Ciudad Artejo, al norte del Área Silvestre: una ciudad entera dentro de una muralla, con un castillo en el centro y el estadio de Roy metido dentro del castillo.\n\nDetrás, la torre de la Planta Eléctrica, con una luz roja en la punta igual que la de los nodos. Los dragones de la ciudad vuelan en círculos a su alrededor y nunca por encima. El mensaje de Crampón decía «emplazamiento 06. Artejo».\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy llegamos a Ciudad Artejo! ¡Tiene una muralla enorme y un castillo de verdad con un estadio DENTRO! Hay puentes entre las casas y huele a pan. Los dragones vuelan por toda la ciudad. ¡Qué bonito!\n\nMañana, a por la Medalla Dragón.', cond: D_DOBLE },
			{ say: 'rotom', text: 'Bzzt. —Muy bajito—. Lo del sobre no lo he puesto. Ni lo de la torre. He puesto «huele a pan». Es verdad. Huele a pan.', cond: DOBLE },
		],
		b07_torre_fuera: [
			{ text: 'La torre de la Planta Eléctrica se levanta detrás del castillo: metal gris, cables gruesos como troncos que bajan por los lados y se meten en la tierra, y una luz roja en la punta que late. La verja de la entrada tiene un cartel: «PLANTA ELÉCTRICA DE ARTEJO · PROPIEDAD PRIVADA · TURNO DE NOCHE: SOLO PERSONAL AUTORIZADO».' },
			{ text: 'Un Flygon pasa planeando junto a la torre, la rodea, y se aparta de golpe, como si se hubiera quemado.' },
			{ text: '{riolu} tira de ti para alejarte de la verja. Con suavidad, pero tira.', cond: LUC },
			{ say: 'rotom', text: 'Bzzt. Primero, la medalla. Roy es el que conoce esta ciudad. Si alguien sabe qué le pasa a esa torre, es él.', cond: '!' + ROY },
		],
		b07_agentes_artejo: [
			{ text: 'Los dos señores de gabardina doblan el periódico a la vez. Uno de ellos te habla sin mirarte, como en las películas malas.' },
			{ say: 'handsome', as: 'Agente de paisano', text: 'El inspector Handsome nos manda vigilar la Planta. Turno de noche. Hemos contado las furgonetas blancas que entran: siete. Las que salen: ninguna. Eso no se puede, dice mi compañero. Yo digo que sí se puede, pero que no debería.' },
			{ say: 'handsome', as: 'Agente de paisano', text: 'Si entra usted, nosotros estamos aquí. Y si sale corriendo, también. Bueno, corriendo menos. Tenemos una edad.' },
		],
		b07_quiosco_artejo: [
			{ text: 'La quiosquera te vende la última *Gaceta* que le queda. En la portada, la foto de una caja de caudales abierta y el titular: «¿QUIÉN PAGA LOS TORNEOS QUE NO EXISTEN?». Dentro, cuatro páginas de Alexia y una columna de Renata: «Nota para el episodio: siga el dinero, y el dinero le llevará al norte».' },
			{ text: 'En la contraportada, una foto pequeña de la torre de la Planta, con una flecha. Nadie en la cola habla de otra cosa. Un señor dice que «eso siempre ha sido así». Otro le dice que entonces es peor.' },
			{ say: 'rotom', text: '¡Bzzt! Renata me ha mandado un mensaje: «¿Has visto la portada? Cool, cool, cool. Ten cuidado ahí arriba. Lemnis lee la *Gaceta* antes que nadie». —Pausa—. Lo de «antes que nadie» lo ha subrayado.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Mensaje de Renata: «Cuidado. Lemnis lee la *Gaceta*». Nada más.', cond: PURG },
		],
		b07_artejo_pendiente: [
			{ if: '!' + ROY, then: [
				{ say: 'rotom', text: '**Roy**, en el estadio del castillo. Tipo Dragón. Si el equipo no llega, en la **Cornisa** de la muralla entrenan los domadores de la ciudad.', cond: '!' + PURG },
				{ say: 'rotom', text: 'Roy. Estadio. Dragón. Si falta nivel: la Cornisa.', cond: PURG },
			] },
			{ if: ROY + ' && !flag.b07_octavia', then: [
				{ say: 'rotom', text: 'La **Planta Eléctrica**, detrás del castillo. Roy dice que sus dragones no quieren volar por encima. Y el sobre de Noa decía «emplazamiento 06». Es ahí.', cond: '!' + PURG },
				{ say: 'rotom', text: 'La Planta. Detrás del castillo. Es ahí.', cond: PURG },
			] },
			{ if: 'flag.b07_octavia && !flag.b07_olivia_vencida', then: [
				{ say: 'rotom', text: 'Olivia sigue arriba, en la **cima de la torre**, con el nodo encendido. Se sube por el ascensor de la sala de control.' },
			] },
			{ if: 'flag.b07_eternatus_visto && !flag.b07_archivo_hecho', then: [
				{ say: 'rotom', text: 'Octavia te espera en el **archivo** de la Planta. Detrás de la consola.' },
			] },
			{ if: 'flag.b07_archivo_hecho && !' + DECIDIDO, then: [
				{ say: 'rotom', text: 'Está amaneciendo. Octavia dijo «en la **muralla**».' },
			] },
			{ if: SERA_DOLIDA, then: [
				{ say: 'rotom', text: 'Lo de Sera… Bzzt. Se puede arreglar. Creo. Con la verdad, por escrito.' },
			] },
			{ if: 'flag.b07_fin', then: [
				{ say: 'rotom', text: '¡Bzzt! Aquí ya no queda nada urgente. Bueno: la Cornisa, si no fuiste. Y el Lago del Enfado, al anochecer. Dicen que hay peces que nadan en el aire.', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. Nada urgente. El lago. Al anochecer.', cond: PURG },
			] },
		],

		// =================== CORNISA: LA VIGÍA ===================
		b07_vigia: [
			{ set: { 'flag.b07_vigia_charla': true } },
			{ text: 'La vigía es una mujer pequeña y seca, con un gorro de lana calado hasta las cejas y un catalejo de latón más viejo que ella. En la pizarra de la garita hay columnas de rayitas: «Flygon», «Noivern», «Corviknight», «otros». Al lado de cada una, una hora.' },
			{ say: 'vigia_artejo', text: 'Cuento dragones. Cuarenta años contando. Cuántos pasan, a qué hora y por dónde. Antes pasaban por encima de todo. De la muralla, del castillo, de la torre. —Baja el catalejo—. Desde hace tres años, por encima de la torre, ninguno. Ni uno.' },
			{ say: 'vigia_artejo', text: 'Abajo, en el saliente, entrenan los chicos de Roy. Si les ganas tres, te doy una cosa. No es por la medalla. Es porque así sé si vuelas o solo planeas.' },
			{ intel: { npc: 'vigia_artejo', text: 'La vigía de la Cornisa de Artejo cuenta dragones desde hace cuarenta años. Desde hace tres, ninguno vuela por encima de la torre de la Planta Eléctrica.' } },
		],
		b07_premio_cornisa: [
			{ set: { 'flag.b07_premio_cornisa': true } },
			{ text: 'La vigía baja de la garita con el catalejo bajo el brazo y un disco plateado en la mano. Los domadores se apartan. Uno se quita la gorra.' },
			{ say: 'vigia_artejo', text: 'Tres. Vuelas. —Apunta algo en la pizarra, en una columna nueva que pone «gente»—. Esto lo usaban los dragones de la muralla en invierno: un coletazo que barre la nieve de las almenas y, de paso, le quita las ganas de pelear a quien esté delante.' },
			{ say: 'vigia_artejo', text: '**MT Vasto Impacto**. Para un dragón que barra. O para cualquiera con cola y mal genio. —Te la da—. Y cuando se arregle lo de la torre, ven a contarlo. Quiero apuntar el primero que pase por encima.' },
			{ give: 'b07_mt_vasto_impacto' },
			{ if: 'owns("ampharos") || owns("tyrantrum") || owns("tyranitar") || owns("haxorus")', then: [
				{ say: 'rotom', text: '¡Bzzt! A Candela le queda bien. Y a Tyrantrum. Y a cualquiera con cola, ha dicho. Tenemos muchas colas.', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. Tenemos colas. Varias. Sirve.', cond: PURG },
			] },
		],

		// =================== ROY ===================
		b07_estadio_artejo_entrada: [
			{ set: { 'flag.b07_gym_artejo_visto': true } },
			{ text: 'Cruzas el patio del castillo, pasas bajo un arco con escudos tallados y sales a un estadio de hormigón y focos, metido entre los muros como un barco en una botella. Las gradas están medio llenas. Alguien grita tu nombre mal. Alguien lo corrige.' },
			{ text: 'En el centro del campo, un chico alto con una cinta en la frente y una sudadera con capucha se hace una foto con un palo de selfi. Detrás de él, un Flygon posa. Luego un Goodra. Luego un Duraludon, muy serio, que no sabe posar.' },
			{ say: 'roy', text: '¡Hola! Espera, espera, que me pillas en mitad de una. —Clic—. Ya. Roy. Líder de Artejo. Y rival oficial del Campeón, aunque él diga que no llevamos la cuenta. La llevo yo. Por los dos.' },
			{ say: 'roy', text: 'Tú eres {el|la|le} de la Gira, ¿no? {El|La|Le} que sale en todos los informes. —Se ríe—. Es broma. Bueno, no del todo: Sonia me habla de ti. Dice que tu Lucario tiene una mirada que da miedo.', cond: 'inParty("lucario")' },
			{ say: 'roy', text: 'Tú eres {el|la|le} de la Gira, ¿no? Sonia me ha hablado de ti. Dice que viajas con un Riolu que mira las cosas como si las fuera a desmontar.', cond: '!inParty("lucario")' },
			{ text: 'Roy levanta la vista hacia el cielo, por encima de las murallas, donde se ve la punta de la torre de la Planta. La luz roja late. Se le borra la sonrisa un segundo.' },
			{ say: 'roy', text: 'Bueno. Cuando quieras combatimos. Aquí debajo hay un punto de energía, ya sabes lo que pasa. Y yo, además, cambio el tiempo. Me encanta cambiar el tiempo.' },
			{ quest: 'b07_m5', stage: 'gimnasio', cond: 'quest.b07_m5 == "artejo"' },
		],
		b07_roy_reto: [
			{ if: ROY, then: [{ end: true }] },
			{ text: 'Roy guarda el palo de selfi en el bolsillo de la sudadera, se ajusta la cinta de la frente y te mira de arriba abajo. Ya no sonríe tanto. Se nota que esto le importa.' },
			{ say: 'roy', text: 'Mis dragones son lo mejor de Galar. Lo digo yo, que soy objetivo. —Pausa—. No lo soy. Pero son lo mejor de Galar.' },
			{ if: LUC, then: [
				{ say: 'roy', text: 'Y ese Lucario tuyo… —Mira a {riolu}, que no le quita los ojos de encima al Duraludon de la banda—. Ya ha visto a mi as. Y mi as lo ha visto a él. Esto va a ser bonito.', cond: 'inParty("lucario")' },
				{ say: 'roy', text: 'Y ese Riolu tuyo… —Mira a {riolu}, que no le quita los ojos de encima al Duraludon de la banda—. Le está midiendo. Mi Duraludon está fingiendo que no se da cuenta. Se da cuenta.', cond: 'inParty("riolu") && !inParty("lucario")' },
			] },
			{ prompt: '¿Curar al equipo antes de retar a Roy?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'Roy chasca los dedos y un ayudante sale corriendo del túnel con una caja de Pociones Máximas. «Que no se diga que gano con ventaja. Se diría en todas las redes.» Tu equipo se recupera del todo.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'roy', text: 'Valiente. Me gusta. Lo voy a poner en el pie de foto.' }] },
			] },
			{ battle: 'roy_g', onWin: [
				{ text: 'El Duraludon gigante de Roy se tambalea, se encoge en un torbellino de nubes rojas y vuelve a su tamaño. Se queda de pie en el centro del campo, muy tieso, con una abolladura nueva en el pecho. Roy lo recoge. Le pasa la mano por la abolladura.' },
				{ say: 'roy', text: 'Bien. Muy bien. —Se ríe, y no le sale del todo—. Te he cambiado el tiempo tres veces y no te ha importado nada. Eso no me lo hace casi nadie. Casi.' },
				{ if: LUC, then: [
					{ say: 'roy', text: 'Y tu {riolu}. Le ha leído el acero a mi Duraludon como si fuera un libro abierto. Ha ido directo al sitio donde se dobla. Ni mi rival encuentra ese sitio. —Lo mira con respeto—. Se lo voy a decir. Le va a sentar fatal.' },
					{ happy: { who: 'riolu', n: 10 } },
				] },
				{ say: 'roy', text: 'La **Medalla Dragón**. Tiene grabada la muralla. Si la miras de lado, parece que tiembla. No tiembla. Creo.' },
				{ badge: 'medalla_dragon' },
				{ cap: 73 },
				{ set: { 'flag.b07_roy_vencido': true } },
				{ say: 'roy', text: 'Y esto, de regalo. **MT Ráfaga Escamas**. Golpea varias veces seguidas y te deja más rápido, aunque más blando. Como yo después de un combate.' },
				{ give: 'b07_mt_rafaga_escamas' },
				{ say: 'roy', text: 'Foto. —Te pasa el brazo por los hombros antes de que puedas decir nada. Clic—. Esta va al túnel. Al lado de la de mi rival. Para que la vea cada vez que pase.' },
				{ heal: 'Un ayudante te trae otra caja de Pociones Máximas sin que nadie se lo pida. Tu equipo se recupera del todo.' },
				// ----- El aviso de Roy: la Planta -----
				{ text: 'Al salir del campo, Roy se para en el túnel y mira hacia arriba, por una tronera, a la torre de la Planta. Tarda en hablar.' },
				{ say: 'roy', text: 'Oye. Una cosa, que no es de líder. —Baja la voz—. Algo raro pasa en la Planta. Mis dragones no quieren volar por encima. Desde hace tres años. Antes lo hacían todos los días, era su atajo. Ahora la rodean. Ni el Duraludon, que no le tiene miedo a nada.' },
				{ say: 'roy', text: 'Lo he preguntado. Me han dicho que es «el campo magnético». A los dragones el campo magnético les da igual. A mí, también. —Se encoge de hombros—. Tú vas por ahí con la policía, ¿no? Pues ya está. Ya te lo he dicho.' },
				{ intel: { npc: 'roy', text: 'Líder de Artejo (Dragón), rival del Campeón, se hace fotos con todo el mundo. Su Duraludon gigamaxiza. Te dio la Medalla Dragón y la MT Ráfaga Escamas. «Mis dragones no quieren volar por encima de la Planta. Desde hace tres años».' } },
				{ quest: 'b07_m5', stage: 'planta' },
				// ----- Mensajes: Bastien (rama «sigue») y la presidenta -----
				{ if: SIGUE, then: [
					{ text: 'La Pokédex vibra. Un mensaje de Bastien. Una sola palabra.' },
					{ text: '«Ven».' },
					{ text: 'Y debajo, un segundo después, otro: «Planta Eléctrica. Esta noche. Turno de noche. Ella está aquí».', cond: FIRMA },
					{ text: 'Y debajo, un segundo después, otro: «Estoy en Artejo. La he seguido hasta aquí. Esta noche, en la Planta».', cond: '!' + FIRMA },
					{ quest: 'b07_t_bastien', stage: 'planta' },
				] },
				{ text: 'Otro mensaje, de un número que empieza por el prefijo de Lemnis. Sin foto. Sin firma de persona: solo un cargo.' },
				{ say: 'octavia', as: 'Presidencia de Lemnis (mensaje)', text: '«La presidenta Octavia Lemnis solicita reunirse con usted esta noche en la Planta Eléctrica de Artejo. Sin cámaras. Sin su equipo. Sin el nuestro». ', cond: LIBRO_OCT },
				{ say: 'octavia', as: 'Presidencia de Lemnis (mensaje)', text: '«La presidenta Octavia Lemnis ha leído la *Gaceta* de esta mañana. Solicita reunirse con usted esta noche en la Planta Eléctrica de Artejo. Sin cámaras. Sin periodistas».', cond: LIBRO_PRE },
				{ say: 'octavia', as: 'Presidencia de Lemnis (mensaje)', text: '«La presidenta Octavia Lemnis visitará esta noche la Planta Eléctrica de Artejo, a petición de la Policía Internacional. Solicita que usted esté presente. Sin cámaras».', cond: LIBRO_POL },
				{ say: 'octavia', as: 'Presidencia de Lemnis (mensaje)', text: '«La presidenta Octavia Lemnis solicita reunirse con usted esta noche en la Planta Eléctrica de Artejo. Sin cámaras».', cond: SIN_LIBRO },
				{ quest: 'b07_t_octavia', stage: 'cita' },
				// ----- El Diario de la medalla, según la rama -----
				{ diary: 'Hoy ganamos a Roy. Tiene muchos dragones y cambia el tiempo. Arena, luego sol. Su Duraludon se hizo enorme, como una torre. {riolu} le pegó donde el acero se dobla.\n\nMedalla Dragón. Roy nos hizo una foto. Salimos movidos.\n\nRoy dice que sus dragones no vuelan por encima de la Planta. Esta noche vamos.', cond: D_PURGADO },
				{ diary: 'Hoy ganamos a Roy, el líder de Artejo, en el estadio del castillo. Cambió el tiempo tres veces y su Duraludon se hizo gigantesco con el Gigamax. {riolu} le encontró el punto débil del acero a la primera.\n\nTenemos la Medalla Dragón y la MT Ráfaga Escamas. Roy nos contó que sus dragones llevan tres años sin volar por encima de la Planta Eléctrica. Esta noche, la presidenta de Lemnis quiere vernos allí.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
				{ diary: '¡Hoy ganamos la Medalla Dragón! Roy es supersimpático y se hace fotos con todo el mundo. ¡Nos hizo una! Su Duraludon se hizo GIGANTE, como un rascacielos. ¡Y cambió el tiempo en mitad del combate! Arena, sol… ¡de todo!\n\nArtejo es preciosa de noche. ¡Vamos a dar un paseo!', cond: D_DOBLE },
				{ say: 'rotom', text: 'Bzzt. —Bajito—. «Un paseo». No he puesto adónde. Ni lo de la presidenta. Ni lo de Bastien. Me estoy volviendo bueno en esto. No sé si es bueno ser bueno en esto.', cond: DOBLE },
			] },
		],
		b07_roy_despues: [
			{ text: 'Roy está sentado en el banquillo, pasando fotos en el teléfono. Al verte, te enseña una: tú, con cara de susto, y él sonriendo como en un anuncio.' },
			{ say: 'roy', text: 'Mira qué bien salimos. Bueno, yo. Tú sales como si te hubieran pillado robando galletas. Me encanta.', cond: '!' + NOA_OK },
			{ say: 'roy', text: 'Esta mañana mis dragones han volado por encima de la torre. Todos. El Duraludon el último, muy despacio, como si no se lo creyera. —Te enseña la foto—. No sé qué pasó anoche ahí arriba. No te lo voy a preguntar. Pero gracias.', cond: NOA_OK },
		],

		// =================== LA PLANTA: ENTRADA, BASTIEN, MAGDA ===================
		b07_planta_entrada: [
			{ set: { 'flag.b07_planta_dentro': true } },
			{ text: 'De noche. La verja de la Planta está abierta: alguien ha atascado el cierre con un trapo. Dentro, el vestíbulo redondo zumba. Las pantallas de las paredes enseñan gráficas que suben, suben, suben. El suelo vibra bajo tus pies, despacio, como un pecho.' },
			{ if: LUC, then: [
				{ text: '{riolu} da un paso atrás. Luego dos adelante. El aura le sale sola, sin que se lo pidas, y apunta hacia abajo. Hacia el suelo. Hacia algo que está debajo del suelo.' },
			] },
			{ if: PURG, then: [
				{ text: 'En cada puerta del vestíbulo hay un guardia. En todas. Hasta en la del cuarto de la limpieza. Uno de ellos le dice a otro, sin bajar la voz: «La señora Olivia lleva aquí desde las seis. Ha puesto gente en todas las puertas. Dice que ya no sabe por cuál vendrá».' },
			] },
			// ----- Bastien, según su rama -----
			{ if: B_AQUI + ' && ' + FIRMA, then: [
				{ text: 'De una garita de cristal, junto a la consola, sale un chico con uniforme gris de Lemnis y una tarjeta colgada del cuello. Tiene ojeras hasta la barbilla. En la solapa del uniforme, por dentro, brilla algo pequeño de hojalata.', cond: INSIGNIA },
				{ text: 'De una garita de cristal, junto a la consola, sale un chico con uniforme gris de Lemnis y una tarjeta colgada del cuello. Tiene ojeras hasta la barbilla.', cond: '!' + INSIGNIA },
			] },
			{ if: B_AQUI + ' && !' + FIRMA, then: [
				{ text: 'Junto a la consola, medio escondido detrás de una columna, un chico con una chaqueta remendada en los dos codos. Lleva tres días sin afeitarse y un Greninja pegado a la espalda como una sombra.' },
			] },
			{ if: B_AQUI + ' && ' + LEAL, then: [
				{ say: 'bastien', text: '{jugador}. —Te agarra de los dos brazos, fuerte—. Has venido. Lo sabía. Lo he apuntado esta mañana: «Viene». Siempre que lo apunto, vienes.' },
				{ say: 'bastien', text: 'Noa está abajo. En el emplazamiento 06. Lleva nueve días aquí, haciendo inventario. No me contesta, pero la he visto entrar. —Traga saliva—. Hay una puerta de servicio que baja. Yo voy por el otro lado, por el pasillo de los cables. Tú por donde puedas. Nos vemos abajo. ¿Sí?' },
				{ text: 'No espera a que contestes. Se va con Greninja por una puerta lateral, casi corriendo.' },
			] },
			{ if: B_AQUI + ' && !' + LEAL, then: [
				{ say: 'bastien', text: 'Tú. —Se mete las manos en los bolsillos—. Claro que has venido. Llegas siempre. Tarde, pero llegas.' },
				{ say: 'bastien', text: 'Noa está aquí. En algún sitio de abajo. Le he preguntado a uno de seguridad, hace dos horas, dónde trabajaba una tal Lambert. Me ha dicho que no sabía. Luego le he visto hablar por la radio. —Se encoge de hombros—. Será que les gusta la radio.' },
				{ say: 'bastien', text: 'Voy por el pasillo de los cables. Tú haz lo que quieras. Como siempre.' },
				{ text: 'Se va por una puerta lateral. Greninja se gira una vez para mirarte antes de seguirle. Es una mirada larga.' },
			] },
			{ if: B_AQUI + ' && ' + SIGUE, then: [
				{ intel: { npc: 'bastien', text: 'En la Planta Eléctrica de Artejo, de noche. Buscaba a Noa en el emplazamiento 06 «por el pasillo de los cables».' } },
			] },
			{ say: 'rotom', text: 'Bzzt… —Muy bajito, para no oírse—. Hay un guardia en la entrada. Y alguien que conocemos en la consola. Con un termo.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Guardia. Y Magda. La de Kanto. Con el termo.', cond: PURG },
		],
		b07_guardia_entrada: [
			{ text: 'Un guardia de uniforme gris, con gafas cuadradas y una tablilla, se planta delante de ti con los pies muy juntos.' },
			{ say: 'seguridad_macro', text: 'Turno de noche. Acceso restringido. ¿Su tarjeta? —Mira tus manos vacías—. Ya. Entonces no.' },
			{ say: 'rotom', text: 'El Centro Pokémon está fuera, al otro lado de la verja. Por si hace falta.', cond: '!' + PURG },
			{ prompt: 'El guardia saca tres Poké Balls de la tablilla.', choice: [
				{ text: 'Combatir.', then: [
					{ battle: 'macro_1', onWin: [
						{ say: 'seguridad_macro', text: 'Una cosa, ya que me ha ganado. —Baja la voz—. Los de logística dicen que anoche vieron a un crío por el pasillo de abajo. Con una gorra y una libreta. Apuntando la hora. Que no es nuestro problema, dicen. —Se recoloca las gafas—. A mí me parece que sí es nuestro problema.' },
						{ quest: 'b07_t_lucien', stage: 'buscar' },
						{ say: 'rotom', text: '¡Bzzt! ¡Una libreta! ¡Apuntando la hora! —Pausa—. Es Lucien. Tiene que ser Lucien. No hay dos.', cond: '!' + PURG },
						{ say: 'rotom', text: 'Bzzt. Libreta. La hora. Lucien. No hay dos.', cond: PURG },
					] },
				] },
				{ text: 'Volver luego.', then: [{ say: 'seguridad_macro', text: 'Aquí estaré. Toda la noche. Es lo que tiene el turno de noche.' }] },
			] },
		],
		b07_magda: [
			{ if: 'flag.b07_magda', then: [{ end: true }] },
			{ set: { 'flag.b07_magda': true } },
			{ text: 'Delante de la consola, de pie, una mujer con el pelo gris rapado y un abrigo largo de cuello alto pasa el dedo por una columna de números en una pantalla. Tiene un termo de té en la otra mano. No se gira.' },
			{ say: 'magda', text: 'Cuarenta y tres minutos desde la verja. —Sigue con el dedo en la pantalla—. Con un combate en medio. Ha mejorado sus tiempos. Yo no.' },
			{ say: 'magda', text: 'Me han traído de Kanto para «cuadrar» las cifras del Nodo 06. Llevo tres días. No cuadran. —Por fin se gira. Ojos grises, tranquilos, cansados—. Eso no me pasa nunca. Las cifras siempre cuadran. Si no cuadran, es que falta una fuente.' },
			{ if: 'has("notasmagda")', then: [
				{ prompt: 'Llevas en la mochila su libreta milimetrada, la de la Cueva Celeste.', choice: [
					{ text: 'Enseñarle sus propias notas de la Cueva Celeste', then: [
						{ text: 'Le tiendes la libreta de tapas grises. Magda la reconoce antes de tocarla. La abre por la página del Nodo 03 y la pone al lado de la pantalla. Compara. Columna con columna. Mueve los labios al contar.' },
						{ say: 'magda', text: 'En Celeste, la fuente era una. F-03. Grande, estable, apuntada. —Toca la pantalla—. Aquí, la fuente principal duerme debajo de la torre y rinde un ochenta y dos por ciento. El otro dieciocho por ciento sale de abajo. Del emplazamiento 06. Y no figura como fuente.' },
						{ say: 'magda', text: 'Figura como «logística». —Cierra la libreta muy despacio, con un dedo dentro—. Le dije que si le salían las cuentas distintas, me escribiera. No me ha escrito. Ha venido. Es más eficiente.' },
					] },
					{ text: 'Dejarla hablar', then: [
						{ say: 'magda', text: 'La fuente principal duerme debajo de la torre y rinde un ochenta y dos por ciento. El otro dieciocho sale de abajo, del emplazamiento 06. Y no figura como fuente. Figura como «logística».' },
					] },
				] },
			], else: [
				{ say: 'magda', text: 'La fuente principal duerme debajo de la torre y rinde un ochenta y dos por ciento. El otro dieciocho sale de abajo, del emplazamiento 06. Y no figura como fuente. Figura como «logística».' },
			] },
			{ say: 'magda', text: 'Una vez le dije que la eficiencia es una forma de bondad. Lo sigo pensando. —Pausa—. Esto no es eficiente. Es otra cosa. Para esto no tengo unidad de medida.' },
			{ text: 'Saca una tarjeta de su abrigo, la pasa por un lector junto a la puerta de servicio del fondo y el piloto se pone verde. La puerta suspira y se queda entornada.' },
			{ say: 'magda', text: 'Mi tarjeta abre todo lo que se puede medir. Abajo hay un guardia, en el pasillo. Ese no se mide: se convence. —Vuelve a la pantalla—. Yo me quedo aquí. Alguien tiene que apuntar lo que pase. Con hora.' },
			{ intel: { npc: 'magda', text: 'En la Planta Eléctrica de Artejo, traída a «cuadrar» las cifras del Nodo 06: el 18 % de la energía sale del emplazamiento 06 y figura como «logística». Te abrió la puerta de servicio. «Para esto no tengo unidad de medida».' } },
		],
		b07_magda_despues: [
			{ text: 'Magda sigue delante de la consola, con el termo y la libreta. Ha abierto una columna nueva en la pantalla. Arriba pone: «Fuentes no declaradas».', cond: '!' + NOA_OK },
			{ say: 'magda', text: 'Sigo contando. Es lo único que sé hacer bien. Usted vaya. No tarde.', cond: '!' + NOA_OK },
			{ text: 'Magda está sentada en el suelo, con la espalda contra la consola apagada y la libreta cerrada en las rodillas. El termo, a su lado, ya no humea. No ha escrito nada en una hora.', cond: NOA_OK },
			{ say: 'magda', text: 'Ciento doce. Las he contado al salir. —No levanta la vista—. Ella también las contó. Lo pone en su lista. Su letra es más bonita que la mía.', cond: NOA_OK },
		],
		b07_guardia_pasillo: [
			{ text: 'Al otro lado de la puerta de servicio, una escalera de metal baja hacia una luz blanca. Delante, un guardia enorme con los brazos cruzados.' },
			{ prompt: 'El guardia no se mueve.', choice: [
				{ text: 'Combatir.', then: [{ battle: 'macro_2' }] },
				{ text: 'Volver luego.', then: [{ text: 'El guardia no dice nada. No hace falta.' }] },
			] },
		],
		b07_atajo_eco: [
			{ set: { 'flag.b07_atajo_eco': true } },
			{ text: 'La pantalla de la Pokédex se enciende sola y enseña un plano: la torre por dentro, en líneas azules, con nombres en letra pequeña. Un pasillo de mantenimiento, detrás de las pantallas de la pared, baja hasta abajo sin pasar por la escalera.' },
			{ say: 'rotom', text: 'Bzzt. Este plano no lo he dibujado yo. —Pausa—. Lo tenía él. El que estaba dentro de mí. Lo dejó aquí, en un rincón, con todo lo demás. Se lo sabía de memoria.' },
			{ say: 'rotom', text: 'No lo usé nunca. Lo uso ahora. —La flecha del plano parpadea—. Si él supiera para qué lo estoy usando… No. No sé lo que pensaría. Ya no le pregunto.' },
			{ text: 'Detrás de la tercera pantalla de la pared hay un panel que se abre empujando. Dentro, una escalerilla de mantenimiento que baja, con olor a polvo y a cable caliente. El guardia de la escalera no se entera de nada.' },
		],

		// =================== EL EMPLAZAMIENTO 06: LUCIEN ===================
		b07_jaulas_entrada: [
			{ set: { 'flag.b07_jaulas_vistas': true } },
			{ text: 'Abajo. Una sala larga y baja, con tubos blancos en el techo. A los dos lados, jaulas, en filas. Dentro, Pokémon de todas partes: un Mareep, dos Shinx, un Cubchoo, algo con alas que no es de aquí, algo con escamas que tampoco. Ninguno hace ruido. Te miran pasar.' },
			{ text: 'Cada jaula tiene una etiqueta de plástico: «Destino: por asignar». De cada jaula sale un cable que va por el suelo hasta el fondo de la sala, hasta una sala pequeña con las paredes de cristal y una compuerta de acero levantada encima de la entrada.' },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca a una jaula. Dentro, un Pokémon pequeño tiembla. {riolu} pone la palma en los barrotes y el aura pasa, azul, muy poco, lo justo. El pequeño deja de temblar. {riolu} no se mueve de ahí hasta que le llamas.' },
			] },
			{ text: 'A la derecha, una puerta con un cartel de plástico: «LOGÍSTICA». Está entornada. Dentro hay luz.' },
		],
		b07_lucien_oficina: [
			{ if: 'flag.b07_lucien_encontrado', then: [{ end: true }] },
			{ text: 'La oficina de logística: una mesa con una lámpara, un archivador, una máquina de café rota y una nevera pequeña con la puerta abierta de la que sale vaho frío. En la mesa, todo en fila: un bolígrafo, una grapadora, una taza con dibujos de Wooloo. En la pared, hojas de inventario con columnas de nombres, cada línea tachada y vuelta a escribir.' },
			{ text: 'Debajo de la mesa, algo se mueve.' },
			{ say: 'lucien', text: '¿Hola? —Una gorra asoma. Luego dos ojos. Luego una libreta, por delante, como un escudo—. ¡Hala! ¡Eres tú! ¡{El|La|Le} de la Gira! ¡{El|La|Le} del Lucario!', cond: 'inParty("lucario")' },
			{ say: 'lucien', text: '¿Hola? —Una gorra asoma. Luego dos ojos. Luego una libreta, por delante, como un escudo—. ¡Hala! ¡Eres tú! ¡{El|La|Le} de la Gira!', cond: '!inParty("lucario")' },
			{ if: CHESPIN, then: [
				{ text: 'Detrás de él sale Chespin, con las púas de la cabeza de punta. Se planta delante de Lucien con los brazos abiertos. Te mira. Te reconoce. Baja las púas, pero no los brazos.' },
			] },
			{ say: 'lucien', text: 'Llegué a las 2:18. Bueno, a las 2:19, porque el reloj de aquí va un minuto adelantado. Lo he apuntado. —Te enseña la libreta: «2:19 · Puerta · luz violeta · frío · aquí»—. Bajé a mirar la Puerta, como siempre, y la Puerta se puso violeta, y luego hacía frío, y luego estaba en una jaula.' },
			{ say: 'lucien', text: 'Con una etiqueta. Como ellos. «Destino: por asignar». —Lo dice muy rápido, para que no pese—. Pero vino Noa. Noa contó las jaulas y dijo «ciento trece; ciento doce y un niño», y me sacó, y me escondió aquí. Me da galletas de la máquina. La máquina está rota, pero Noa sabe dónde darle.' },
			{ if: CHESPIN, then: [
				{ say: 'lucien', text: 'Chespin no dejaba que nadie se acercara a mi jaula. Nadie. A los guardias les pinchaba. Noa dice que por eso la apuntaron a ella para el inventario: porque era la única a la que Chespin dejaba pasar.' },
			] },
			{ if: ESC_NOA, then: [
				{ text: 'En la nevera, entre botellas de agua, algo redondo y blanco abre un ojo y estornuda. Copos de nieve. Una manta azul, con bolsas de hielo cosidas por dentro.' },
				{ say: 'lucien', text: 'Ese es Escarcha. Es de Noa. Duerme en la nevera porque tiene calor siempre. Noa dice que es el único de aquí que tiene casa. Que su casa es ella.' },
			] },
			{ say: 'lucien', text: 'Noa me ha enseñado a contar envíos. Se cuenta de dos en dos, y si sale impar, se vuelve a empezar. —Baja la voz—. Me ha dicho que cuando viniera alguien con un Lucario, me fuera con él. Y que no mirara la sala de cristal.' },
			{ say: 'lucien', text: 'Está ahí dentro. Desde esta tarde. Dice que tiene que contar una última cosa.' },
			{ set: { 'flag.b07_lucien_encontrado': true } },
			{ quest: 'b07_t_lucien', stage: 'buscar' },
			{ intel: { npc: 'lucien', text: 'Encontrado en la oficina de logística del emplazamiento 06, en la Planta de Artejo. La Fisura de las 2:18 lo dejó en una jaula «con una etiqueta, como ellos». Noa lo sacó y lo escondió allí.' } },
			// ----- Rama doble: ¿se lo contamos? -----
			{ if: DOBLE, then: [
				{ say: 'rotom', text: 'Bzzt. Voy a escribir lo de esta noche. —Pausa larga—. ¿Esto se lo contamos? Que Noa está aquí abajo. En el emplazamiento 06.' },
				{ prompt: 'Rotom espera. Lo que escriba, lo leerá Lemnis. Contarlo o callarlo no cambia lo que va a pasar en esa sala; cambia quién baja por la escalera.', choice: [
					{ text: '«Cuéntalo. Que vengan. Así sabremos quién manda aquí.»', then: [
						{ set: { 'flag.b07_doble_cuenta_t5': true } },
						{ diary: '¡Hoy en la Planta Eléctrica de Artejo hemos encontrado a Lucien, el niño de Luminalia! Estaba bien escondido en la oficina de logística, con galletas. Y Noa está aquí también, en el emplazamiento 06. ¡Qué casualidad!' },
						{ say: 'rotom', text: 'Ya está. —Muy bajito—. Lo he escrito bonito. Como le gusta a él.' },
					] },
					{ text: '«No. Esto no.»', then: [
						{ set: { 'flag.b07_doble_calla_t5': true } },
						{ diary: 'Hoy, de noche, paseo por Artejo. Huele a pan.' },
						{ say: 'rotom', text: '«Huele a pan». —Pausa—. Ahora mismo la seguridad estará buscando por las panaderías. —Pausa—. No tiene gracia. Perdón.' },
					] },
				] },
			] },
		],
		b07_guardias_jaulas: [
			{ text: 'Por la escalera de servicio bajan dos guardias, rápido, sin linterna: saben adónde van. Se plantan entre tú y el fondo de la sala.' },
			{ say: 'rotom', text: 'Bzzt… Han venido directos. Por lo que escribí. —Muy bajito—. Perdón.' },
			{ text: 'Por el altavoz de la sala de cristal, una voz que conoces, muy suave: «Hay Pociones en el archivador de logística. Segundo cajón. Son de inventario. Úsalas. Nadie las va a contar ya».' },
			{ prompt: '¿Curar al equipo antes de combatir?', choice: [
				{ text: 'Sí. Segundo cajón.', then: [{ heal: 'En el segundo cajón del archivador hay una caja de Pociones Máximas con una etiqueta escrita a mano: «Inventario. Sobran». Tu equipo se recupera del todo.' }] },
				{ text: 'No hace falta.', then: [{ text: 'Cierras el cajón. Los guardias ya están aquí.' }] },
			] },
			{ battle: 'macro_3' },
		],

		// =================== EL EMPLAZAMIENTO 06: NOA ===================
		b07_noa: [
			{ if: NOA_OK, then: [{ end: true }] },
			{ if: 'flag.b07_noa_jaulas', then: [
				{ text: 'Vuelves a la sala de cristal. Noa sigue dentro, sentada junto al panel, con la carpeta en las rodillas. Te ve y levanta la mano. La deja levantada un momento más de lo normal.' },
			], else: [
				{ set: { 'flag.b07_noa_jaulas': true } },
				{ text: 'Al fondo de la sala, entre los cables, la sala de cristal. Por dentro, un panel de mandos lleno de interruptores, una silla y una mesa pequeña con una carpeta. Encima de la entrada, levantada, la compuerta de acero. En el cristal, a la altura de la cara, una ventanilla para pasar papeles, como la de los bancos.' },
				{ text: 'Dentro, sentada en la silla, con el pelo recogido de cualquier manera y una tarjeta de **VISITANTE** colgada del cuello, Noa Lambert cuenta algo en voz baja con el bolígrafo. Te ve. Se le cae el bolígrafo.' },
				{ say: 'noa', text: 'Hola. —Por el altavoz del cristal, su voz suena pequeña—. Has venido. Perdón, perdón. Es que te he contado tantas veces llegando, en la cabeza, que ahora que llegas no sé qué decir.' },
				{ say: 'noa', text: '¿Lucien está bien? ¿Ha comido? —No espera—. Sí. Ha comido. Se ha comido mis galletas. Eso también es un dato.' },
			] },
			{ say: 'noa', text: 'Ciento doce. —Toca la carpeta—. Los he contado. Ciento doce Pokémon en ciento doce jaulas. Cada jaula tiene un cable. Cada cable viene aquí. Lo que les sacan pasa por esta sala y sube. Arriba lo juntan con lo que le sacan al grande, al que duerme debajo de la torre.' },
			{ say: 'noa', text: 'El panel que abre las jaulas está aquí dentro. Solo aquí. Lo pusieron aquí para que nadie lo abriera. Porque cuando se abre, todo lo que les han quitado vuelve de golpe a quien se lo quitaron. Todo a la vez. Y esta sala se queda sin aire unos segundos. —Señala arriba, a la compuerta—. Esa baja sola. Por seguridad. Por la seguridad de fuera.' },
			{ say: 'noa', text: 'Lo he contado. Me sale. Me sale siempre igual.' },
			// ----- Olmedo, por llamada -----
			{ say: 'rotom', text: 'Bzzt. Llamo a Olmedo. Tengo su número desde Fayenza. —La Pokédex marca sola.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Olmedo. Llamo.', cond: PURG },
			{ say: 'olmedo', as: 'Matías Olmedo (llamada)', text: '¿Sí? ¿Diga? —Una voz con sueño, y luego, al oír lo que le cuentas, sin nada de sueño—. Perdón. Enséñeme el panel. Con la cámara. Despacio.' },
			{ say: 'olmedo', as: 'Matías Olmedo (llamada)', text: '…Es primo del Arco II. Lo reconozco: el primero lo dibujé yo, en Trigal, hace doce años. Esto es una válvula. Solo se abre desde dentro porque lo que hay dentro es lo que se vacía. Desde fuera no. —Pausa—. No hay otra manera desde fuera. Lo siento. Lo siento mucho.' },
			{ say: 'olmedo', as: 'Matías Olmedo (llamada)', text: 'Señorita. —A Noa, por el altavoz—. Perdón. Me disculpo igual. Es una costumbre. —Y cuelga, porque no sabe qué más decir.' },
			{ prompt: 'Noa te mira desde el otro lado del cristal. Espera.', choice: [
				{ text: '«Déjame hacerlo a mí.»', then: [
					{ say: 'noa', text: 'No. El panel tiene mi huella. La puse yo hace nueve días, cuando me nombraron responsable de inventario del emplazamiento. —Casi se ríe—. Responsable. Me lo dieron porque soy muy simpática. Siempre lo dicen.' },
				] },
				{ text: '«Tiene que haber otra forma.»', then: [
					{ say: 'noa', text: 'La he buscado. Nueve días. —Levanta la carpeta—. Está todo aquí. No hay. Y si esperamos, mañana a las seis los conectan a la fase nueva y ya no salen. Lo pone en la hoja de turnos. Las hojas de turnos no mienten nunca.' },
				] },
				{ text: 'No decir nada.', then: [
					{ say: 'noa', text: 'Gracias por no decir nada. Todo el mundo dice cosas. —Se pone el pelo detrás de la oreja—. Tú no. Por eso te escribí a ti.' },
				] },
			] },
			// ----- Bastien leal: llega a tiempo -----
			{ if: B_AQUI + ' && ' + LEAL, then: [
				{ text: 'Por el pasillo de los cables, al otro lado de la sala de cristal, llega corriendo Bastien, con Greninja detrás. Se para delante del cristal. Pone las dos manos encima. No dice nada.' },
				{ say: 'noa', text: 'Hola, Bastien. —Muy suave—. Has llegado. Llegas siempre a tiempo cuando no te lo digo.' },
				{ if: INSIGNIA, then: [
					{ text: 'Bastien se quita la insignia de hojalata de la solapa, el Froakie sin logo, y la mete por la ventanilla de los papeles. Para devolvérsela. «Por si acaso». Le tiemblan los dedos.' },
					{ text: 'Noa la recoge. La mira. Y la vuelve a pasar por la ventanilla, hacia él, y le cierra la mano encima con la suya, a través del hueco.' },
					{ say: 'noa', text: 'No. Ahora tiene dueño.' },
				], else: [
					{ text: 'Noa saca del bolsillo una insignia pequeña de hojalata, un Froakie sonriente sin logo de nada, y la pasa por la ventanilla de los papeles. Bastien la recoge. Noa le cierra la mano encima con la suya, a través del hueco.' },
					{ say: 'noa', text: 'La guardaba para ti. Por si acaso. Ahora tiene dueño.' },
				] },
				{ say: 'noa', text: 'Lo de tu libreta. Lo que me debías. —Le sonríe—. Ya sé lo que era. Era venir.' },
			] },
			// ----- Bastien resentido: alguien preguntó por ella -----
			{ if: B_AQUI + ' && !' + LEAL, then: [
				{ say: 'noa', text: 'Me han encontrado porque alguien preguntó por mí, hace un rato. «¿Dónde trabaja una tal Lambert?». Lo he oído por la radio de los guardias. —Se encoge de hombros—. Seguro que fue sin querer. Casi todo se hace sin querer.' },
				{ say: 'noa', text: 'Si ves a Bastien… dile que no fue culpa suya. —Pausa—. Aunque lo fuera un poco. Que no lo fue.' },
				{ text: 'Mete por la ventanilla de los papeles una insignia pequeña de hojalata. Un Froakie sonriente, sin logo de nada.', cond: '!' + INSIGNIA },
				{ text: 'Mete por la ventanilla de los papeles un papel doblado con una sola palabra escrita: «Pagado».', cond: INSIGNIA },
			] },
			// ----- Bastien no está en esta partida -----
			{ if: '!' + B_AQUI, then: [
				{ say: 'noa', text: 'Una cosa. —Mete por la ventanilla de los papeles una insignia pequeña de hojalata: un Froakie sonriente, sin logo de nada—. Es para Bastien. No sé dónde está. Tú lo encontrarás, tú encuentras a todo el mundo. Para que se la des. Dile que ahora tiene dueño.' },
				{ give: 'insignianoa' },
			] },
			// ----- Los cerrojos de fuera: lo que Mario puede hacer con las manos -----
			{ say: 'noa', text: 'Los cerrojos de fuera de las jaulas los puedes quitar tú. Los del pasillo, en los cuadros eléctricos. Si los quitas, cuando yo abra, salen todos a la vez y no se pisan. Si no, salen igual, pero más despacio. —Te mira—. Me gustaría que no se pisaran.' },
			{ puzzle: { id: 'b07_cerrojos_06', title: 'Los cerrojos del pasillo', theme: 'lab',
				hint: 'Empuja los dos bloques de fusibles hasta las placas. Con las dos pulsadas, se abre la reja del cuadro.',
				grid: [
					'#######',
					'#P..#G#',
					'#..R#D#',
					'#..S..#',
					'#.R.S.#',
					'#.....#',
					'#######',
				] },
				onSolve: [{ set: { 'flag.b07_cerrojos': true } }, { text: 'Clac. Clac. Clac. A lo largo de la sala, en cada jaula, un cerrojo se suelta con un ruido pequeño. Los Pokémon levantan la cabeza a la vez.' }],
				onQuit: [{ say: 'noa', text: 'No pasa nada. Los quito yo desde aquí. Tardo un poco más. —Mira el panel—. Tengo tiempo. Un poco.' }] },
			// ----- Aviso claro y lo que hace Mario -----
			{ say: 'noa', text: 'Lucien. —Por el altavoz, más alto—. Lucien, cariño, ven con {jugador}. Y no mires el cristal. ¿Te acuerdas? No se mira.' },
			{ text: 'Lucien sale de la oficina con la libreta apretada contra el pecho. Se pone a tu lado. No mira el cristal. Mira tus zapatos.' },
			{ prompt: 'Noa va a abrir el panel. No hay nada que puedas hacer para impedirlo. Sí puedes elegir qué haces tú mientras tanto.', choice: [
				{ text: 'Llevarte a Lucien lejos, hacia la salida, sin dejarle girarse.', then: [{ set: { 'flag.b07_noa_lucien': true } }] },
				{ text: 'Sujetar la puerta de la escalera para que salgan todos sin pisarse.', then: [{ set: { 'flag.b07_noa_puerta': true } }] },
				{ text: 'Quedarte junto al cristal, con ella, hasta que baje la compuerta.', then: [{ set: { 'flag.b07_noa_cristal': true } }] },
			] },
			{ prompt: 'Noa pone la mano en el panel. Te mira una última vez. ¿Qué le dices?', choice: [
				{ text: '«Gracias, Noa.»', then: [{ say: 'noa', text: 'De nada. —Lo dice de verdad—. Es la primera vez que me lo dicen sin un «pero» detrás.' }] },
				{ text: '«Te vamos a recordar. Todos.»', then: [{ say: 'noa', text: 'Ciento doce y un niño. —Sonríe—. Son muchos para recordar. Pero cuentan bien. Los he enseñado yo.' }] },
				{ text: '«Ya sabes contar. Lo has hecho bien.»', then: [{ say: 'noa', text: 'Ya sé contar. —Se le humedecen los ojos y no se los toca—. Lo he hecho bien. Me lo apunto.' }] },
			] },
			{ say: 'noa', text: 'Bastien. Lucien. {jugador}. —Mira a uno y a otro—. Cuenten conmigo. Hasta tres.', cond: B_AQUI + ' && ' + LEAL },
			{ say: 'noa', text: 'Lucien. {jugador}. —Mira a uno y luego al otro—. Cuenten conmigo. Hasta tres.', cond: '!(' + B_AQUI + ' && ' + LEAL + ')' },
			// ----- Cinemática 3: las jaulas se abren -----
			{ cutscene: { bg: { type: 'lab', wall: '#1e1e28', floor: '#2b2b38' }, time: 'noche', start: 'dark', cam: 'still', frames: [
				{ actors: [{ id: 'noa', at: 'right', dim: true }], fx: 'light', cam: 'still', text: 'Detrás del cristal, Noa deja la carpeta en la mesa. La pone recta con el canto, como pone siempre las cosas. Luego pone la mano en el panel.' },
				{ cond: B_AQUI + ' && ' + LEAL, actors: [{ id: 'bastien', at: 'left', enter: 'left' }], cam: 'push', text: 'Bastien tiene las dos manos en el cristal. No dice nada. Ella tampoco. No hace falta.' },
				{ cond: 'flag.b07_noa_cristal', cam: 'push', text: 'Pones la mano en el cristal, a la altura de la suya. Ella la mira. Asiente. Una vez.' },
				{ cond: 'flag.b07_noa_lucien', actors: [{ id: 'lucien', at: 0.3, enter: 'left' }], cam: 'pan-left', text: 'Te llevas a Lucien hacia la salida, con la mano en su hombro. Cuenta en voz baja: «uno». Se quiere girar. No le dejas.' },
				{ cond: 'flag.b07_noa_puerta', cam: 'pull', text: 'Apoyas la espalda en la puerta de la escalera y la sujetas con todo el cuerpo. Desde aquí, al fondo, el cristal se ve pequeño, con una luz dentro.' },
				{ on: 'noa', fx: ['flash', 'light'], color: '#ffffff', cam: 'pull', text: '«Tres». Luz blanca. Toda la sala a la vez. Las ciento doce puertas se abren con un solo ruido, como una respiración muy grande.' },
				{ cond: 'flag.b07_cerrojos', on: false, fx: 'speedlines', shake: 1, cam: 'pan-right', text: 'Salen corriendo. Todos. Un Mareep, dos Shinx, algo con alas, algo con escamas, una fila de Pokémon que no deberían estar juntos, hacia la escalera, hacia fuera. Ninguno se pisa.' },
				{ cond: '!flag.b07_cerrojos', on: false, fx: 'speedlines', shake: 1, cam: 'pan-right', text: 'Los cerrojos de fuera se sueltan solos, uno detrás de otro, más despacio. Y salen. Todos. Un Mareep, dos Shinx, algo con alas, algo con escamas, hacia la escalera, hacia fuera.' },
				{ actors: [{ mon: 'wooloo', key: 'mer', at: 'center', enter: 'pop', size: 's' }], cam: 'still', text: 'Uno se queda. Un Wooloo con un pañuelo atado al cuello, de pie delante de la sala de cristal. Quieto. Mirando dentro.' },
				{ actors: [{ key: 'noa', remove: true, exit: 'fade' }], fx: 'dark', cam: 'still', text: 'La compuerta baja. Despacio. Sin ruido.' },
				{ on: 'mer', fx: 'iris-out', cam: 'still', text: 'Silencio. Después, nada.' },
			] } },
			{ call: 'b07_noa_despues' },
		],
		b07_noa_despues: [
			{ if: NOA_OK, then: [{ end: true }] },
			{ text: 'La sala está vacía. Las jaulas, abiertas. Los cables del suelo ya no zumban. La compuerta de acero está bajada, lisa, sin una marca, como si siempre hubiera estado así.' },
			{ text: 'Lucien está a tu lado. No llora. Cuenta en voz baja, de dos en dos. Le sale impar. No vuelve a empezar.', cond: '!flag.b07_noa_lucien' },
			{ text: 'Lucien está a tu lado, en la escalera, con la cara contra tu manga. No llora. Cuenta en voz baja, de dos en dos. Le sale impar. No vuelve a empezar.', cond: 'flag.b07_noa_lucien' },
			// ----- Bastien resentido: llega tarde -----
			{ if: B_AQUI + ' && !' + LEAL, then: [
				{ text: 'Pasos corriendo por el pasillo de los cables. Bastien llega con Greninja, sin aliento, y se para en seco delante de la compuerta bajada. Mira la compuerta. Mira las jaulas abiertas. Te mira a ti.' },
				{ say: 'bastien', text: '¿Dónde…? —No termina—. Le pregunté a uno. «¿Dónde trabaja una tal Lambert?». Le pregunté a uno. Hace dos horas.' },
				{ text: 'Se sienta en el suelo, despacio, con la espalda contra el cristal. Greninja se sienta a su lado. Ninguno dice nada en mucho rato.' },
				{ text: 'En la ventanilla de los papeles, Noa ha dejado algo. Se lo das.' },
				{ text: 'Es la insignia de hojalata del Froakie sin logo. Bastien la mira en la palma de la mano como si pesara mucho.', cond: '!' + INSIGNIA },
				{ text: 'Es un papel doblado. Bastien lo abre. Pone una sola palabra: «Pagado». Se toca la solapa, donde lleva la insignia de hojalata. Aprieta.', cond: INSIGNIA },
				{ say: 'bastien', text: 'Dijo que no fue culpa mía, ¿verdad? —No te mira—. No hace falta que me lo digas. Ya sé que lo dijo. Ella decía esas cosas.' },
				{ set: { 'flag.b07_bastien_tarde': true } },
			] },
			{ if: B_AQUI + ' && ' + LEAL, then: [
				{ text: 'Bastien sigue con una mano en el cristal. La otra, cerrada, con la insignia de hojalata dentro. Greninja le apoya la frente en el hombro.' },
				{ say: 'bastien', text: 'Ha llegado a tiempo. —Muy bajito—. Yo. Por una vez. —Pausa—. No sé si quería llegar a tiempo para esto.' },
				{ set: { 'flag.b07_bastien_llega': true } },
			] },
			{ if: SIGUE, then: [
				{ quest: 'b07_t_bastien', stage: 'hecha', done: true },
			] },
			{ if: B_AQUI, then: [
				{ intel: { npc: 'bastien', text: 'En el emplazamiento 06 de Artejo, cuando Noa abrió las jaulas desde dentro. Lleva la insignia de hojalata del Froakie sin logo: «Ahora tiene dueño».' } },
			] },
			// ----- La nota de Noa -----
			{ text: 'En la ventanilla de los papeles, además, hay unas hojas de inventario grapadas. Su letra redonda, cada vez más pequeña para que quepa todo.' },
			{ give: 'notanoa' },
			{ read: 'notanoa' },
			{ set: { 'flag.b07_noa_adios': true } },
			{ quest: 'b07_t_noa', stage: 'hecha', done: true },
			{ intel: { npc: 'noa', text: 'Abrió desde dentro las jaulas del emplazamiento 06, en la Planta Eléctrica de Artejo, y devolvió a ciento doce Pokémon lo que les habían quitado. Se quedó en la sala de cristal. Dejó su lista: «Destino: casa».' } },
			// ----- Merengue -----
			{ text: 'El Wooloo del pañuelo sigue delante de la compuerta, quieto. En el pañuelo, bordado con hilo azul, pone **MERENGUE**. Debajo, en una etiqueta vieja de plástico: «KAL-0031».' },
			{ say: 'lucien', text: 'Es Merengue. —Se agacha a su lado—. Noa me lo contó. Lo buscó desde el primer día. Desde Kalos. Lo apuntó en todas las listas y en todas ponía «no consta». —Le toca el pañuelo—. Ahora consta.' },
			{ text: 'Merengue no se mueve. Ya tienes un Wooloo; este no es para tu equipo. Pero tiene que irse a algún sitio.', cond: 'owns("wooloo") || owns("dubwool")' },
			{ text: 'Merengue no se mueve. No es para tu equipo: lleva demasiado tiempo esperando volver a algún sitio. Pero tiene que irse a algún sitio.', cond: '!owns("wooloo") && !owns("dubwool")' },
			{ prompt: '¿Adónde va Merengue?', choice: [
				{ text: 'Al Campo de los Hargreave, en Hoyuelo: césped de verdad y un señor que habla con la hierba.', then: [
					{ set: { 'flag.b07_merengue_campo': true } },
					{ say: 'lucien', text: 'Un campo. Con hierba. —Lo apunta en la libreta—. «Merengue · Destino: un campo». Le va a gustar. Los Wooloo comen hierba. Lo sé.' },
				] },
				{ text: 'A Kalos, con Lucien: a casa, que es de donde salió.', then: [
					{ set: { 'flag.b07_merengue_lucien': true } },
					{ say: 'lucien', text: '¿Conmigo? —Abre mucho los ojos—. A Luminalia. A la plaza. Mi madre va a decir que no. Luego va a decir que sí. —Lo apunta—. «Merengue · Destino: casa»—. Como en la lista.' },
				] },
			] },
			{ text: 'Merengue se gira despacio, mira la compuerta una última vez y se pega a la pierna de Lucien.' },
			// ----- Escarcha, si se quedó con Noa -----
			{ if: ESC_NOA, then: [
				{ text: 'Lucien vuelve de la oficina con la manta azul en brazos. Dentro, Escarcha, el Cetoddle de Noa, tiembla. No de frío.' },
				{ if: TIENE_ESC, then: [
					{ say: 'lucien', text: 'Me lo llevo yo, ¿sí? —Lo dice antes de que lo pienses—. Tú ya tienes uno igual. Yo tengo una nevera grande. Y un balcón que da al norte. —Lo aprieta—. Noa decía que eso era algo.' },
					{ set: { 'flag.b07_escarcha_lucien': true } },
				], else: [
					{ prompt: 'Escarcha te mira desde la manta. Estornuda copos de nieve.', choice: [
						{ text: 'Llevártelo. Noa quería que tuviera casa.', then: [
							{ say: 'lucien', text: 'Bueno. —Te lo pone en los brazos, con manta y todo—. Las bolsas de hielo se cambian cada hora. Noa lo tenía apuntado. Te dejo la hoja.' },
							{ pokemon: { sp: 'cetoddle', lv: 50, nature: 'adamant', ability: 'thickfat', moves: ['iciclecrash', 'icefang', 'iceshard', 'bodyslam'], happy: 200, metAt: 'planta_jaulas' } },
							{ set: { 'flag.b07_escarcha_tuyo': true } },
						] },
						{ text: 'Que se vaya con Lucien. Lucien lo cuidará.', then: [
							{ say: 'lucien', text: '¿Conmigo? —Lo aprieta contra el pecho—. Tengo una nevera grande. Y un balcón que da al norte. Noa decía que eso era algo.' },
							{ set: { 'flag.b07_escarcha_lucien': true } },
						] },
					] },
				] },
			] },
			// ----- El Diario de la pérdida, según la rama -----
			{ diary: 'Hoy se ha ido Noa. No sé escribirlo. Lo intento mañana.', cond: D_PURGADO },
			{ diary: 'Hoy, en el emplazamiento 06 de la Planta Eléctrica de Artejo, Noa Lambert abrió desde dentro las jaulas de ciento doce Pokémon desplazados. El panel solo se abría desde la sala del nodo. Cuando lo abrió, todo lo que les habían quitado volvió a ellos de golpe, y la sala se quedó sin aire. La compuerta bajó sola.\n\nAntes contó con nosotros hasta tres. Dejó una lista: cada «Destino: por asignar» tachado, y encima, «casa». La última línea es para Lucien.\n\n*(Omitido: nada.)*\n\n*(Omitido: que me habría gustado conocerla mejor.)*', cond: D_REFORMADO },
			{ if: D_DOBLE, then: [
				{ say: 'rotom', text: 'Bzzt. —Muy bajito. Mucho rato callado—. Esta… ¿esta también se la contamos?' },
				{ prompt: 'Lo que Rotom escriba, lo leerá Lemnis.', choice: [
					{ text: '«Escríbela. Que la lean. Que sepan lo que ha hecho.»', then: [
						{ diary: 'Hoy en la Planta Eléctrica de Artejo, Noa Lambert, de logística, abrió las jaulas del emplazamiento 06 y salieron todos los Pokémon. Todos. Ciento doce. Era muy buena contando. Ha sido muy valiente.' },
						{ say: 'rotom', text: 'Ya está. No le he puesto nada bonito. Bueno, «valiente». Eso no es bonito. Es verdad.' },
					] },
					{ text: '«No. Esta es nuestra.»', then: [
						{ diary: 'Hoy, sin novedades.' },
						{ say: 'rotom', text: '«Sin novedades». —Pausa—. Es la primera vez que eso me pesa.' },
					] },
				] },
			] },
			{ call: 'b07_octavia_llega' },
		],

		// =================== OCTAVIA LLEGA ===================
		b07_octavia_llega: [
			{ if: 'flag.b07_octavia', then: [{ end: true }] },
			{ set: { 'flag.b07_octavia': true } },
			{ text: 'Arriba, en algún sitio de la torre, empieza a sonar una alarma. Larga, monótona. Las luces blancas del techo se ponen rojas. Por la escalera de servicio baja alguien, sin prisa, con tacones que resuenan en el metal.' },
			{ text: 'Una mujer de unos cincuenta años, con el pelo plateado cortado recto a la altura de la mandíbula, un traje blanco con el bajo manchado de barro y un broche de lemniscata en la solapa. Ojeras que no se tapa. Se para al pie de la escalera y mira la sala. Las jaulas abiertas. Los cables muertos. La compuerta bajada.' },
			{ say: 'octavia', text: 'He leído el libro que me hizo llegar. Tres veces. En el avión. —No te mira: mira las jaulas—. La tercera ya no lo leía. Solo pasaba las páginas.', cond: LIBRO_OCT },
			{ say: 'octavia', text: 'Vengo de una rueda de prensa que no he dado. Cuarenta periodistas y un titular. Les he dejado esperando. —No te mira: mira las jaulas—. Primera vez en doce años.', cond: LIBRO_PRE },
			{ say: 'octavia', text: 'El señor Handsome me ha dejado pasar. Me ha mirado como se mira a una sospechosa. —No te mira: mira las jaulas—. Lo entiendo. Yo también me estoy mirando así.', cond: LIBRO_POL },
			{ say: 'octavia', text: 'Me dijeron que aquí había algo que yo no podía ver. —No te mira: mira las jaulas—. Tenían razón. No podía.', cond: SIN_LIBRO },
			{ say: 'octavia', text: 'Octavia Lemnis. Presidenta de Lemnis. —Lo dice como quien lee una placa en una tumba—. Usted es {jugador}. Sé su nombre desde la inauguración de Luminalia. No sabía nada más. Ahora lo sé.' },
			{ text: 'Recoge del suelo una hoja que se ha caído de la ventanilla de los papeles. Una de las hojas de la lista de Noa. Lee una línea. Otra. Se le mueven los labios, como a quien cuenta.' },
			{ text: 'En la pared, junto a la compuerta, una pantalla pequeña sigue encendida. Octavia se acerca. Toca. Lee en voz alta, despacio:' },
			{ say: 'octavia', text: '«Emplazamiento 06 · Aporte vital: dieciocho por ciento · Reporta a: Dirección (Ω)». —Toca otra vez—. «Presidencia: sin acceso a Módulo Diario. Sin acceso a Emplazamiento 06».' },
			{ say: 'octavia', text: 'Sin acceso. —Se ríe una vez, sin nada dentro—. Fundé esta empresa con mi nombre. La **Fundación Horizonte** está en nuestros papeles desde antes de que Lemnis se llamara Lemnis: pagaba fianzas a gente que quería empezar de cero. Yo firmaba su memoria cada año. Sin leerla. Y alguien la ha usado para comprar esto. Con mi firma. Sin mi acceso.' },
			{ say: 'octavia', text: 'Dirección. —Lo dice muy bajo—. Desde el primer día. Me lo escondió desde el primer día, y yo firmaba donde me decían porque confiaba. —Se quita una mota de la manga. Le tiembla la mano. La para—. No. Ahora no.' },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca a Octavia y se le queda delante, mirándola. El aura le sale despacio, sin forma. Octavia lo mira. No se aparta. Tarda en hablar.' },
				{ say: 'octavia', text: 'Mi marido decía que los Lucario ven lo que uno es por dentro. —Pausa—. Espero que no.' },
			] },
			{ say: 'octavia', text: 'Arriba, en la cima, hay una mujer que sabe apagar esto y no quiere. Olivia. Era la secretaria de Rose. —Se gira hacia la escalera—. Yo no sé pelear. Usted sí. Suba conmigo.' },
			{ intel: { npc: 'octavia', text: 'Llegó a la Planta Eléctrica de Artejo con la alarma. La consola dice «Presidencia: sin acceso a Emplazamiento 06». La Fundación Horizonte llevaba su firma desde antes de Lemnis; Dirección (Ω) la usó para pagar el drenaje «con su firma, sin su acceso».' } },
			{ go: 'planta_artejo' },
		],
		b07_puerta_precintada: [
			{ text: 'La puerta de servicio que baja al emplazamiento 06 tiene una cinta amarilla cruzada. Delante, una silla de oficina y, en la silla, un ramo de flores del Área Silvestre atado con un cordel.' },
			{ text: 'Por el cristal de la puerta, al fondo, se ve la oficina de logística con la luz apagada. En la mesa, todo en fila: el bolígrafo, la grapadora, la taza con dibujos de Wooloo. Pegado en la lámpara, un pósit con su letra redonda: «Contar otra vez mañana».' },
			{ text: '{riolu} se sienta delante de la silla. No se mueve hasta que le llamas. Y luego tarda un poco más.', cond: LUC },
		],

		// =================== OLIVIA Y ETERNATUS ===================
		b07_olivia: [
			{ if: 'flag.b07_olivia_vencida', then: [{ end: true }] },
			{ if: 'flag.b07_olivia_hablado', then: [
				{ text: 'Olivia sigue junto al anillo del nodo, con las manos a la espalda, como si nada hubiera cambiado. Octavia, apoyada en la barandilla, no le quita los ojos de encima.' },
				{ say: 'olivia_mc', text: 'Ha vuelto. Bien. La gente que vuelve es la única que termina las cosas.' },
			], else: [
				{ set: { 'flag.b07_olivia_hablado': true } },
				{ text: 'El ascensor de rejilla se abre arriba del todo. Viento. La luz roja del nodo gira dentro del anillo de acero y lo tiñe todo. Junto al anillo, de espaldas, una mujer alta con el pelo blanco recogido sin un mechón fuera de sitio y un traje oscuro. Mira la ciudad.' },
				{ say: 'olivia_mc', text: 'Presidenta. —Sin girarse—. Qué honor. Doce años y es la primera vez que sube.' },
				{ say: 'octavia', text: 'Apáguelo, Olivia.' },
				{ say: 'olivia_mc', text: 'No. —Se gira. Tiene la cara tranquila, cansada y muy bien maquillada—. Usted no manda aquí, presidenta. Nunca ha mandado aquí. Lo pone en la consola.' },
				{ say: 'olivia_mc', text: 'El presidente Rose quería que Galar tuviera energía para mil años. Lo dijo en un estadio lleno. Le encerraron por intentarlo. Yo me quedé con su torre, sus planos y una deuda con el futuro. —Mira el anillo—. Dirección pagó lo que Rose no pudo terminar. Yo lo he terminado.' },
				{ say: 'olivia_mc', text: 'Ustedes ven jaulas. Yo veo mil años sin apagones. Hospitales, trenes, la calefacción de una anciana en Crampón. Alguien tiene que hacer la cuenta. La he hecho yo.' },
				{ say: 'olivia_mc', text: 'Lo de la señorita Lambert… —Se calla un momento. Parece que de verdad le cuesta—. Lo siento. Sinceramente. Yo no habría abierto. No era necesario. Lo hizo ella.' },
				{ say: 'olivia_mc', text: 'Usted llegó a Galar por Par. Andén dos, un martes, con lluvia. Lo leímos esa misma noche. —Casi sonríe—. Dirección es muy puntual con la lectura.', cond: 'flag.b07_doble_cuenta_t0' },
				{ say: 'olivia_mc', text: 'Usted lleva semanas sin salir en ningún informe. Por eso puse gente en todas las puertas. —Le sale un mohín pequeño—. No sabía por cuál vendría. Es muy poco eficiente no saber.', cond: PURG },
				{ say: 'octavia', text: 'Era su gente, Olivia. La señorita Lambert. Era de logística. Era nuestra.' },
				{ say: 'olivia_mc', text: 'Era de inventario. —Se ajusta un guante—. Y el inventario, presidenta, lo firmaba usted.' },
			] },
			{ say: 'olivia_mc', text: 'Le voy a enseñar lo que hace esta torre. Para que sepa lo que está apagando. —Saca una Poké Ball—. Cure a los suyos, si quiere. No me interesan las victorias contra gente cansada.' },
			{ prompt: 'El nodo gira detrás de Olivia. Octavia te ofrece un maletín de Lemnis con Restaurar Todos.', choice: [
				{ text: 'Curar al equipo y combatir.', then: [
					{ heal: 'Octavia abre el maletín: Restaurar Todos, con el logotipo de la lemniscata. «Por una vez, que sirvan para algo», dice. Tu equipo se recupera del todo.' },
					{ call: 'b07_olivia_combate' },
				] },
				{ text: 'Combatir así.', then: [{ call: 'b07_olivia_combate' }] },
				{ text: 'Todavía no.', then: [{ say: 'olivia_mc', text: 'Tómese su tiempo. El nodo tiene todo el del mundo. Literalmente.' }] },
			] },
		],
		b07_olivia_combate: [
			{ battle: 'olivia_1', lose: 'continue',
				onWin: [{ call: 'b07_olivia_vencida' }],
				onLose: [
					{ set: { 'flag.b07_olivia_perdio': true } },
					{ text: 'Tu último Pokémon cae sobre la rejilla. El Garbodor gigante de Olivia se encoge en una nube de humo rojo y vuelve a su tamaño. Olivia lo recoge sin mirarlo.' },
					{ say: 'olivia_mc', text: 'Eficiente, pero no suficiente. —Se alisa la falda—. Vuelva cuando quiera. Yo no me muevo de aquí. El nodo, tampoco.' },
					{ heal: 'Octavia vacía el maletín en tu equipo, sin decir nada. Tus Pokémon se recuperan del todo.' },
				] },
		],
		b07_olivia_vencida: [
			{ if: 'flag.b07_olivia_vencida', then: [{ end: true }] },
			{ set: { 'flag.b07_olivia_vencida': true } },
			{ text: 'El Garbodor gigante de Olivia se deshincha en una nube de humo rojo que el viento se lleva. Olivia lo recoge. Se queda un momento mirando la Poké Ball. Luego mira el anillo.' },
			{ say: 'olivia_mc', text: 'Bien. —Lo dice como quien firma un parte—. Ha ganado. Eso no apaga nada, presidenta. Para apagarlo hay que querer.' },
			{ text: 'Octavia pasa a su lado sin mirarla, se acerca a la consola del anillo y la estudia. Busca. No encuentra. Olivia, al cabo de un rato, alarga la mano por encima de la suya y gira una llave. Una sola.' },
			{ say: 'olivia_mc', text: 'Es esta. —Sin expresión—. Tres años en un cajón y nadie preguntó cuál era.' },
			{ intel: { npc: 'olivia_mc', text: 'Dirigía el Nodo 06 de Artejo «para terminar lo que empezó el presidente Rose: energía para mil años», con el dinero de Dirección. «Ustedes ven jaulas. Yo veo mil años sin apagones». Perdió contra ti y giró ella misma la llave del nodo.' } },
			{ call: 'b07_eternatus' },
		],
		b07_eternatus: [
			{ set: { 'flag.b07_eternatus_visto': true } },
			// ----- Cinemática 4: Eternatus despierta -----
			{ cutscene: { bg: { type: 'tower', far: '#2a1a3a', ground: '#3a3a4a' }, time: 'noche', weather: 'sparks', start: 'light', cam: 'still', frames: [
				{ cam: 'still', fx: 'ripple', text: 'El anillo del nodo se para. La luz roja deja de girar. El zumbido de la torre se apaga de golpe, y el silencio que deja es tan grande que se oye la ciudad entera respirando abajo.' },
				{ fx: 'quake', shake: 2, cam: 'pan-down', text: 'Y entonces, debajo. Muy debajo, por el hueco de la torre. Algo que llevaba mucho tiempo dormido se da la vuelta.' },
				{ tint: '#8a2a6a', shake: 3, actors: [{ mon: 'eternatus', key: 'ete', at: 'center', size: 'l' }], fx: ['rise', 'light', 'shake'], cam: 'pan-up', text: 'Sube por el hueco como una columna de luz roja con huesos. Cinco garras abiertas, un pecho que late como un núcleo y un rugido que no suena: aprieta. **Eternatus**.' },
				{ on: 'ete', fx: 'heartbeat', color: '#c43a7a', cam: 'still', text: 'Lleva años sin comer y años comiendo a la fuerza. Mira el anillo que le chupaba. Luego te mira a ti, que estás de pie encima.' },
				{ on: false, fx: 'ripple', cam: 'pan-left', text: 'Y desde muy lejos, al oeste, de un bosque donde la niebla no se va nunca, llega un aullido. Largo. Viejo. Como si alguien contestara a una pregunta que lleva mil años hecha.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.2, enter: 'left' }], on: 'rio', fx: 'glow', cam: 'still', text: '{riolu} levanta la cabeza hacia el oeste. El aura le sale sola, azul, y tiembla como si conociera esa voz. Contesta. Sin sonido. Con el aura.' },
				{ cond: 'inParty("reshiram")', on: false, fx: 'glow', color: '#ffd8a0', cam: 'push', text: 'En tu cinturón, una Poké Ball se calienta tanto que quema. Dentro, Reshiram se ha girado hacia el gigante rojo antes que nadie.' },
				{ on: 'ete', tint: 'none', fx: ['beam', 'shake'], shake: 2, cam: 'push', text: 'Eternatus baja la cabeza hacia ti. Ruge otra vez. Esta vez sí suena.' },
			] } },
			{ say: 'octavia', text: 'Eso… —Retrocede hasta la barandilla—. Eso es lo que dormía debajo. Eso es lo que nos daba la luz.' },
			{ heal: 'Octavia vacía lo que queda del maletín sobre tu equipo sin apartar los ojos del gigante. Tus Pokémon se recuperan del todo.' },
			{ text: 'Eternatus despliega las garras sobre la cima de la torre. No es un ataque. Es una pregunta, de las que se contestan peleando.' },
			{ wild: { sp: 'eternatus', lv: 72, moves: ['dynamaxcannon', 'sludgebomb', 'flamethrower', 'cosmicpower'] }, canRun: true, lose: 'continue',
				onCatch: [
					{ set: { 'flag.b07_eternatus_tuyo': true } },
					{ text: 'La Poké Ball tiembla tres veces sobre la rejilla, echando chispas rojas, y se queda quieta. Tibia. Late, muy despacio, como un corazón que por fin descansa.' },
					{ say: 'rotom', text: '¡Bzzt! Eternatus. Tipo Veneno y Dragón. Ha venido. —Pausa—. Lleva años sin que nadie le pregunte nada. Le hemos preguntado.', cond: '!' + PURG },
					{ say: 'rotom', text: 'Bzzt. Eternatus. Veneno. Dragón. Ha venido. Despacio.', cond: PURG },
				],
				onWin: [
					{ text: 'Eternatus se encoge, se sacude la luz roja como quien se sacude agua y te mira otra vez. Luego sube, rompe las nubes de encima de Artejo y se pierde hacia el norte, dejando una estela roja que tarda mucho en borrarse.' },
					{ say: 'rotom', text: 'Bzzt. Se ha ido. Libre. —Pausa—. Ha mirado atrás. Los que miran atrás vuelven.' },
				],
				onRun: [
					{ text: 'Te apartas hasta la barandilla. Eternatus te mira, baja la cabeza muy poco y sube, rompiendo las nubes de encima de Artejo, hacia el norte.' },
					{ say: 'rotom', text: 'Bzzt. Se ha ido. Libre. —Pausa—. Ha mirado atrás. Los que miran atrás vuelven.' },
				],
				onLose: [
					{ text: 'Tus Pokémon caen sobre la rejilla. Eternatus baja la cabeza hasta ti, te mira de cerca con unos ojos que no parpadean, y sube despacio hacia el norte, rompiendo las nubes.' },
					{ heal: 'Octavia rebusca en el fondo del maletín y encuentra dos Restaurar Todos más. Tus Pokémon se recuperan del todo.' },
				] },
			{ text: 'Olivia se ha sentado en la rejilla, junto al anillo apagado, con las piernas cruzadas y la espalda muy recta. Mira el cielo por donde se ha ido.' },
			{ say: 'olivia_mc', text: 'Mil años. —Muy bajo—. Rose decía «mil años» como quien dice «mañana».' },
			{ say: 'octavia', text: 'Baje conmigo al archivo, {jugador}. —Ya camina hacia el ascensor—. Quiero ver todo lo que firmé sin leer. Y quiero que alguien que no sea yo lo vea conmigo.' },
		],
		b07_olivia_despues: [
			{ text: 'Olivia sigue sentada en la rejilla junto al anillo apagado, con la espalda recta. Ha sacado un pañuelo y limpia la Poké Ball de su Garbodor, despacio, por todos lados.' },
			{ say: 'olivia_mc', text: 'Me quedo. Alguien tiene que apagar las luces. —No te mira—. Las de verdad.' },
		],

		// =================== EL ARCHIVO ===================
		b07_archivo: [
			{ if: 'flag.b07_archivo_hecho', then: [{ end: true }] },
			{ text: 'El archivo. Octavia ha encendido el flexo y ha sacado carpetas grises a puñados. Las tiene abiertas por toda la mesa. Ha encontrado lo que buscaba y no lo quiere tocar.' },
			{ say: 'octavia', text: 'El informe trimestral del Nodo 06. —Te lo acerca con dos dedos—. Distribución: Dirección. Presidencia: no. Léalo usted. Yo ya lo he leído y no quiero oírmelo en la cabeza con mi voz.' },
			{ give: 'informeoctavia' },
			{ read: 'informeoctavia' },
			{ say: 'octavia', text: 'Doce trimestres. —Cierra la carpeta—. Doce veces me dijeron «Galar va bien» en una reunión, y yo dije «gracias», y salimos a comer.' },
			{ text: 'Debajo del informe hay otra carpeta, más vieja, con el canto amarillo. En la etiqueta, a máquina: «PERSONAL · PROYECTO LEMNISCATA · BAJAS». Octavia la abre por una página que alguien ha marcado con un clip.' },
			{ give: 'expedientedufresne' },
			{ read: 'expedientedufresne' },
			{ text: 'Octavia mira la foto del expediente mucho rato. La mujer. El bebé. La tela bordada con la lemniscata. Luego cierra la carpeta y la deja en la mesa, con la mano encima.' },
			{ say: 'octavia', text: 'No la conocía. —Nadie le ha preguntado—. Era de antes. De cuando éramos cuatro en una oficina.' },
			{ if: LUC, then: [
				{ text: '{riolu} mira a Octavia, y luego a la carpeta, y luego a ti. Tiene la misma cara que cuando alguien miente en un combate.' },
			] },
			{ say: 'rotom', text: 'Bzzt… Dufresne. —Muy bajito—. Como Lila. Lila Dufresne. De la Torre Maestra.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Dufresne. Como Lila.', cond: PURG },
			{ prompt: 'El expediente de E. Dufresne está en tu mochila. Lila no sabe que existe.', choice: [
				{ text: 'Mandárselo a Lila. Una foto, con una nota corta y cuidadosa.', then: [
					{ set: { 'flag.b07_lila_expediente_enviado': true } },
					{ af: { lila: 2 } },
					{ text: 'Le haces una foto a la página, con la luz del flexo. Escribes una nota corta. La borras. La vuelves a escribir más corta. «He encontrado esto. Creo que es tuyo. No tienes que contestar». Enviar.' },
					{ text: 'Pasan cuatro minutos. Luego, la Pokédex vibra una vez.' },
					{ say: 'lila', as: 'Lila (mensaje)', text: 'G-gracias. Ya. Ya.' },
					{ text: 'Nada más. Ni un emoji. Ni un «hablamos».' },
				] },
				{ text: 'Guardarlo. Esto se lo das en persona, cuando la veas.', then: [
					{ set: { 'flag.b07_lila_expediente_guardado': true } },
					{ text: 'Guardas el expediente en el fondo de la mochila, entre la Pokédex y el pase de la Gira, donde no se arrugue. Lila está en Kalos. Hay cosas que no se mandan por mensaje.' },
				] },
			] },
			{ set: { 'flag.b07_archivo_hecho': true } },
			{ text: 'Cuando salen de la Planta, ya clarea. El cielo, por encima de la muralla, se pone de un gris lechoso. Octavia se para en la verja y se aprieta el abrigo.' },
			{ say: 'octavia', text: 'Suba conmigo a la muralla. Quiero ver amanecer. Hace años que no lo veo sin un informe en la mano.' },
			{ go: 'muralla_artejo' },
		],
		b07_archivo_despues: [
			{ text: 'Las estanterías del archivo, con sus carpetas grises. Faltan unas cuantas: Octavia se las llevó bajo el brazo. En su sitio ha dejado una hoja escrita a mano, con letra grande y recta: «Retirado por la presidenta. Para leer».' },
		],

		// =================== LA MURALLA AL AMANECER ===================
		b07_muralla: [
			{ if: 'flag.b07_az_artejo', then: [{ end: true }] },
			{ text: 'El adarve de la muralla, al amanecer. El cielo se pone rosa por el este, sobre el Área Silvestre. Abajo, la ciudad empieza a encender las panaderías. La torre de la Planta, detrás del castillo, está apagada.' },
			{ text: 'Octavia se ha quedado unos metros atrás, apoyada en una almena. Delante, mirando el campo con las manos a la espalda, un hombre enorme con el pelo blanco larguísimo cayéndole por el abrigo. En el hombro, una Floette con una flor roja que no tiembla con el viento.' },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca al hombre y se sienta a su lado, en el borde de la almena. La Floette baja y se le posa en la cabeza. {riolu} no cierra los ojos esta vez. Mira el campo con los dos.' },
			] },
			{ text: 'La Floette vuela hasta la piedra de la almena y deja allí su flor roja. La deja con mucho cuidado, como quien deja algo en una tumba. Luego vuelve al hombro.' },
			{ say: 'az', text: 'Toda energía infinita se cobra en vidas. —Despacio, como si cada palabra tuviera que subir la muralla—. Hoy ha cobrado una.' },
			{ say: 'az', text: 'No dejes que se acostumbre a cobrar.' },
			{ text: 'Echa a andar por el adarve hacia el norte, sin prisa. No mira atrás. El sol sale justo entonces y te da en los ojos. Cuando vuelves a mirar, ya no está. La flor roja sigue en la piedra.' },
			{ set: { 'flag.b07_az_artejo': true } },
			{ say: 'rotom', text: 'Bzzt. Ni foto. —Pausa—. Hoy no la quería hacer.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. No he hecho foto. No quería.', cond: PURG },
			{ call: 'b07_octavia_muralla' },
		],
		b07_octavia_muralla: [
			{ if: DECIDIDO, then: [{ end: true }] },
			{ text: 'Octavia se acerca. Mira la flor roja de la almena, no la toca. Se apoya en la piedra con las dos manos.' },
			{ say: 'octavia', text: 'Firmé cuatrocientos papeles el año en que nació la red. Leí treinta. Los otros me los resumía Dirección. Con mucho cariño. Con muy buena letra.' },
			{ say: 'octavia', text: 'Mi marido, Julien, murió porque un hombre construyó una máquina «para el bien» y nadie le preguntó cuánto costaba. Fundé Lemnis para que eso no volviera a pasar. —Mira la torre apagada—. Y he construido otra.' },
			{ say: 'octavia', text: 'No le voy a pedir perdón. El perdón se le pide a quien se le debe, y a quien se lo debo está debajo de una compuerta. —Pausa—. Le voy a pedir otra cosa.' },
			{ if: SERA_ENFADO + ' && !flag.sera_reconciliada', then: [
				{ say: 'octavia', text: 'He llamado a mi hija. Seis veces. No me contesta el teléfono. —Casi sonríe—. Tampoco a usted, imagino. Eso lo ha sacado de mí.' },
			] },
			{ text: 'Se lleva la mano a la solapa y se arranca el broche de la lemniscata. El cierre se rompe con un chasquido pequeño. Se queda mirándolo en la palma.' },
			{ say: 'octavia', text: 'Que me diga desde dónde le sirvo. Yo ya no sé. —Te mira por fin, de frente—. Y escúcheme bien: lo que decidamos ahora no tiene vuelta atrás. Lo que elija, lo haré esta misma mañana. Piénselo.' },
			{ call: 'b07_octavia_decide' },
		],
		b07_octavia_decide: [
			{ prompt: 'Lo que elijas no tiene vuelta atrás. No hay una respuesta correcta.', choice: [
				{ text: '«Quédese dentro. Siga de presidenta, y cuénteme lo que vea.» (En secreto: Dirección no sabrá que usted sabe.)', then: [
					{ prompt: '¿Seguro? Octavia seguirá al frente de Lemnis, sola, delante de quien la engañó.', choice: [
						{ text: 'Sí. Desde dentro.', then: [{ call: 'b07_octavia_dentro' }] },
						{ text: 'Espera. Déjame pensarlo otra vez.', then: [{ call: 'b07_octavia_decide' }] },
					] },
				] },
				{ text: '«Cuéntelo. En público. Hoy.» (Rueda de prensa y dimisión: Lemnis se queda sin presidenta.)', then: [
					{ prompt: '¿Seguro? El consejo de Lemnis elegirá a otra persona para su sitio.', choice: [
						{ text: 'Sí. En público.', then: [{ call: 'b07_octavia_publica' }] },
						{ text: 'Espera. Déjame pensarlo otra vez.', then: [{ call: 'b07_octavia_decide' }] },
					] },
				] },
				{ text: '«Entréguese a Handsome. Como testigo.» (Protección policial: Lemnis se queda sin cabeza visible.)', then: [
					{ prompt: '¿Seguro? Octavia desaparecerá de la vida pública y alguien tendrá que ocupar su sitio en funciones.', choice: [
						{ text: 'Sí. Como testigo.', then: [{ call: 'b07_octavia_testigo' }] },
						{ text: 'Espera. Déjame pensarlo otra vez.', then: [{ call: 'b07_octavia_decide' }] },
					] },
				] },
			] },
		],
		b07_octavia_dentro: [
			{ if: DECIDIDO, then: [{ end: true }] },
			{ set: { 'flag.b07_octavia_dentro': true } },
			{ rep: { lemnis: 5 } },
			{ say: 'octavia', text: 'Dentro. —Lo piensa—. Sentarme cada lunes en la misma mesa que Dirección, sin saber todavía qué cara tiene Dirección. Dar las gracias por los resúmenes. —Se le endurece la cara—. Sí. Eso sé hacerlo. Llevo doce años haciéndolo sin saber. Ahora lo haré sabiendo.' },
			{ text: 'Se vuelve a poner el broche roto en la solapa. Torcido. El cierre no engancha y lo sujeta con un imperdible que saca del bolsillo del abrigo.' },
			{ say: 'octavia', text: 'Así me acordaré cada mañana. —Se lo toca—. Le escribiré. No por correo de Lemnis. Ya sabrá cómo.' },
			// ----- Rama doble: el error terrible -----
			{ if: DOBLE, then: [
				{ say: 'rotom', text: 'Bzzt. —Muy bajito, cuando Octavia se aleja—. ¿Esto se lo contamos? —Pausa—. Si lo escribo, lo leen. Todo. Leerán que ella sabe.' },
				{ prompt: 'Lo que Rotom escriba, lo leerá Lemnis. Esta vez, Lemnis es la persona que acaba de quedarse dentro.', choice: [
					{ text: '«Escríbelo.»', then: [
						{ set: { 'flag.b07_doble_delata_octavia': true } },
						{ diary: 'Hoy, al amanecer, en la muralla de Artejo, hemos hablado con la presidenta Octavia Lemnis. Ya lo sabe todo. Se queda en Lemnis, como si nada. ¡Qué valiente!' },
						{ say: 'rotom', text: '…Ya está. —Pausa larga—. Lo he escrito. —Pausa—. ¿Por qué me has dicho que lo escriba?' },
					] },
					{ text: '«No. Ni una palabra.»', then: [
						{ diary: 'Hoy, al amanecer, hemos visto la muralla de Artejo. Había una flor roja en una almena.' },
						{ say: 'rotom', text: 'Una flor. Eso es verdad. —Pausa—. Lo demás no existe. Ni para él.' },
					] },
				] },
			] },
			{ call: 'b07_post_decision' },
		],
		b07_octavia_publica: [
			{ if: DECIDIDO, then: [{ end: true }] },
			{ set: { 'flag.b07_octavia_publica': true } },
			{ rep: { lemnis: -10, galar: 5 } },
			{ af: { renata: 3 } },
			{ say: 'octavia', text: 'En público. —Asiente despacio—. Llamaré a la periodista de la *Gaceta*, la de los torneos. Y a la del pódcast. Que lo cuenten ellas, que saben contarlo. Yo solo sé firmar.' },
			{ text: 'Deja el broche roto encima de la almena, junto a la flor roja. No lo recoge.' },
			{ say: 'octavia', text: 'Diré lo del drenaje, lo de la fundación y lo de la señorita Lambert, con su nombre completo. Y dimitiré a las doce, porque a las doce se dicen las cosas. —Pausa—. El consejo nombrará a alguien. No será nadie que yo elija.' },
			{ call: 'b07_post_decision' },
		],
		b07_octavia_testigo: [
			{ if: DECIDIDO, then: [{ end: true }] },
			{ set: { 'flag.b07_octavia_testigo': true } },
			{ rep: { policia: 5 } },
			{ text: 'Por la escalera de la muralla sube Handsome, resoplando, con una gabardina mal abrochada y una bolsa de bollos. Se para en seco al ver a Octavia. La bolsa de bollos se le cae.' },
			{ say: 'handsome', text: 'Presidenta. —Se cuadra, sin saber muy bien por qué—. Handsome. Policía Internacional. Handsome… ha traído bollos. Para tres. Por si acaso.' },
			{ say: 'octavia', text: 'Inspector. Me entrego como testigo. —Le tiende el broche roto, en la palma—. Esto es una prueba. De algo. Usted sabrá de qué.' },
			{ say: 'handsome', text: 'Testigo. —Guarda el broche en una bolsita de plástico con mucho cuidado—. Con el ingeniero Olmedo. Ya tienen de qué hablar. Él también firmaba cosas que no leía. —Pausa—. Handsome no lo dice con maldad.' },
			{ say: 'octavia', text: 'Lemnis se quedará sin cabeza. Alguien tendrá que sentarse en mi silla mientras tanto. —Mira al sur, hacia muy lejos—. Ya sé quién. No le va a gustar. Lo hará muy bien.' },
			{ call: 'b07_post_decision' },
		],
		b07_post_decision: [
			{ if: 'flag.b07_post_decision', then: [{ end: true }] },
			{ set: { 'flag.b07_post_decision': true } },
			{ quest: 'b07_t_octavia', stage: 'hecha', done: true },
			{ intel: { npc: 'octavia', text: 'En la muralla de Artejo, al amanecer, se arrancó el broche de la lemniscata y te preguntó «desde dónde le sirvo».' }, cond: '!flag.b07_octavia_dentro' },
			{ intel: { npc: 'octavia', text: 'En la muralla de Artejo, al amanecer: se queda de presidenta de Lemnis, en secreto, para contarte lo que vea. Lleva el broche roto sujeto con un imperdible.' }, cond: 'flag.b07_octavia_dentro' },
			{ call: 'b07_sera' },
		],

		// =================== SERA ===================
		b07_sera: [
			{ if: 'flag.b07_sera_llamada || !' + SERA_LLAMA, then: [{ call: 'b07_fin' }, { end: true }] },
			{ set: { 'flag.b07_sera_llamada': true } },
			{ text: 'El Holomisor vibra en tu bolsillo. Es la primera vez en mucho tiempo que lo hace a esta hora. En la pantalla, una figura pequeña de luz azul: Sera, en un despacho a oscuras, con el traje puesto y el pelo perfecto, como si no se hubiera acostado.', cond: SERA_HOLO },
			{ text: 'La Pokédex vibra. Una llamada de un número que no tienes guardado, pero que conoces. Sera.', cond: '!' + SERA_HOLO },
			{ say: 'sera', as: 'Serafina', text: 'Buenos días. Perdona la hora. No, no la perdones: es una hora perfectamente razonable para que una hija pregunte por su madre.', cond: SERA_TU },
			{ say: 'sera', as: 'Serafina', text: 'Buenos días. Disculpe la hora. No, no la disculpe: es una hora perfectamente razonable para que una hija pregunte por su madre.', cond: '!' + SERA_TU },
			{ say: 'sera', as: 'Serafina', text: 'Mi madre ha salido de Paldea anoche sin avisar a su secretaría. No lo ha hecho nunca. Las cámaras del aeropuerto de Galar la sitúan en Artejo. —Pausa—. Y a ti también. Dime qué ha pasado. Sin adornos.', cond: SERA_TU },
			{ say: 'sera', as: 'Serafina', text: 'Mi madre ha salido de Paldea anoche sin avisar a su secretaría. No lo ha hecho nunca. Las cámaras del aeropuerto de Galar la sitúan en Artejo. —Pausa—. Y a usted también. Dígame qué ha pasado. Sin adornos.', cond: '!' + SERA_TU },
			{ if: SERA_TU, then: [
				{ prompt: 'Sera espera. No interrumpe nunca.', choice: [
					{ text: '«Tu madre no sabía lo que hacía Lemnis aquí. Lo ha visto esta noche. Ha muerto una persona. Y tu madre ha elegido.»', then: [{ call: 'b07_sera_verdad' }] },
					{ text: '«Ha sido una noche muy dura para ella. Tienes que estar muy orgullosa de tu madre, de verdad…»', then: [{ call: 'b07_sera_adorno' }] },
					{ text: '«No ha pasado nada. Una avería en la Planta. Tu madre está bien.»', then: [{ call: 'b07_sera_mentira' }] },
				] },
			], else: [
				{ prompt: 'Sera espera. No interrumpe nunca.', choice: [
					{ text: '«Su madre no sabía lo que hacía Lemnis aquí. Lo ha visto esta noche. Ha muerto una persona. Y su madre ha elegido.»', then: [{ call: 'b07_sera_verdad' }] },
					{ text: '«Ha sido una noche muy dura para ella. Tiene que estar muy orgullosa de su madre, de verdad…»', then: [{ call: 'b07_sera_adorno' }] },
					{ text: '«No ha pasado nada. Una avería en la Planta. Su madre está bien.»', then: [{ call: 'b07_sera_mentira' }] },
				] },
			] },
			{ if: 'flag.b07_octavia_dentro && flag.sera_canal_abierto', then: [
				{ say: 'sera', as: 'Serafina', text: 'Una cosa más. Mi madre me ha mandado un mensaje a las seis y cuarto. Dos palabras: «Todo bien». —Pausa—. Mi madre no ha escrito «todo bien» en su vida. Lo escribe la gente que se queda a ver algo que no le gusta.' },
				{ say: 'sera', as: 'Serafina', text: 'No me lo expliques. Si me lo explicas, tendré que saberlo. —Muy bajo—. Cuídamela. Desde fuera. Yo, desde aquí, no puedo.' },
			] },
			{ if: 'flag.b07_octavia_testigo', then: [
				{ say: 'sera', as: 'Serafina', text: 'El consejo me ha llamado a las siete y diez. Presidenta en funciones. Por teléfono, con el pelo sin peinar. —Pausa—. Ha sido la peor llamada de mi vida y la he contestado con una frase perfecta. Me ha salido sola. Eso es lo que más me asusta.' },
			] },
			{ if: 'flag.b07_octavia_publica', then: [
				{ say: 'sera', as: 'Serafina', text: 'A las doce dimite, ¿no? Lo dice en la convocatoria de prensa. «A las doce». —Casi se ríe—. A las doce se dicen las cosas. Me lo enseñó ella. Voy a verla. Por la tele. Con el broche torcido, seguro.' },
			] },
			{ text: 'La figura de luz se apaga. El Holomisor se queda tibio en tu mano.', cond: SERA_HOLO },
			{ text: 'Cuelga. Sin despedirse. Como hace siempre.', cond: '!' + SERA_HOLO },
			{ call: 'b07_fin' },
		],
		b07_sera_verdad: [
			{ af: { sera: 5 } },
			{ text: 'Silencio. Largo. Del otro lado se oye un bolígrafo que se deja sobre una mesa.' },
			{ say: 'sera', as: 'Serafina', text: 'Gracias. —Muy bajo—. Por no decirme que «está bien». Todo el mundo me dice que está bien. Llevo veinticuatro años oyendo que mi madre está bien.' },
		],
		b07_sera_adorno: [
			{ af: { sera: -2 } },
			{ set: { 'flag.b07_sera_dolida': true, 'vars.b07_af_sera_perdida': '+2' } },
			{ say: 'sera', as: 'Serafina', text: 'Eso es una tarjeta de felicitación. Te he pedido un informe. —Pausa seca—. Lo averiguaré por otro lado. Siempre lo averiguo por otro lado.', cond: SERA_TU },
			{ say: 'sera', as: 'Serafina', text: 'Eso es una tarjeta de felicitación. Le he pedido un informe. —Pausa seca—. Lo averiguaré por otro lado. Siempre lo averiguo por otro lado.', cond: '!' + SERA_TU },
		],
		b07_sera_mentira: [
			{ af: { sera: -5 } },
			{ set: { 'flag.b07_sera_dolida': true, 'vars.b07_af_sera_perdida': '+5' } },
			{ say: 'sera', as: 'Serafina', text: 'Una avería. —No lo pregunta—. Las cámaras de Artejo enseñan a mi madre saliendo de la Planta al amanecer con carpetas del archivo bajo el brazo. Mi madre no lleva carpetas. Tiene a seis personas para eso. —Pausa—. No me mientas. Es lo único que te pedí.', cond: SERA_TU },
			{ say: 'sera', as: 'Serafina', text: 'Una avería. —No lo pregunta—. Las cámaras de Artejo enseñan a mi madre saliendo de la Planta al amanecer con carpetas del archivo bajo el brazo. Mi madre no lleva carpetas. Tiene a seis personas para eso. —Pausa—. No me mienta. Es lo único que le pedí.', cond: '!' + SERA_TU },
		],
		b07_sera_reparar: [
			{ if: '!(' + SERA_DOLIDA + ')', then: [{ end: true }] },
			{ text: 'Abres la conversación con Sera. Lo último es lo de esta mañana. Escribes algo y lo borras tres veces. Las frases no van a servir.' },
			{ prompt: '¿Qué le mandas?', choice: [
				{ text: 'Una copia de la lista de Noa, entera. Y una línea: «Esto es lo que pasó. Perdón por no decírtelo así».', cond: 'has("notanoa")', then: [
					{ text: 'Fotografías las hojas de inventario de Noa, una a una, con su letra redonda que se va haciendo pequeña. Las mandas todas. Y la línea. Enviar.' },
					{ text: 'Tarda una hora en contestar. La Pokédex vibra una vez.' },
					{ say: 'sera', as: 'Serafina (mensaje)', text: '«Recibido. Las he leído todas. La última dos veces». —Y otro, un minuto después—: «La verdad llega tarde a veces. Llega. Eso cuenta. Gracias».' },
					{ if: 'vars.b07_af_sera_perdida >= 5', then: [{ af: { sera: 5 } }], else: [{ af: { sera: 2 } }] },
					{ set: { 'flag.b07_sera_reparada': true } },
					{ intel: { npc: 'sera', text: 'Le mandaste la lista de Noa entera para contarle lo que pasó en Artejo. «La verdad llega tarde a veces. Llega. Eso cuenta».' } },
				] },
				{ text: 'Una disculpa larga, bonita, con todo lo que sientes.', then: [
					{ text: 'Escribes una disculpa larga. Te queda bonita. La mandas.' },
					{ say: 'sera', as: 'Serafina (mensaje)', text: '«Muy bien escrita». —Nada más.' },
					{ say: 'rotom', text: 'Bzzt. Creo que a Sera no le gustan las cosas bonitas. Le gustan las verdaderas. —Pausa—. Igual que a mí, ahora.' },
				] },
				{ text: 'Mejor otro día.', then: [{ text: 'Cierras la conversación. La verdad no caduca, pero se enfría.' }] },
			] },
		],

		// =================== EL FINAL ===================
		b07_fin: [
			{ if: 'flag.b07_fin', then: [{ end: true }] },
			{ if: '!flag.b07_post_decision', then: [{ call: 'b07_post_decision' }, { end: true }] },
			{ text: 'Esa mañana, en el Centro Pokémon de Artejo, te quedas dormid{o|a|e} en una silla de la sala de espera, con la mochila en las rodillas. Te despierta alguien que te tira de la manga.' },
			{ say: 'lucien', text: 'Te has dormido a las 5:52. Roncas. Poco. Lo he apuntado. —Te enseña la libreta, muy serio. Luego se le escapa una risa pequeña, la primera, y se tapa la boca como si hubiera hecho algo mal.' },
			{ text: 'A su lado, Merengue, con el pañuelo limpio.', cond: 'flag.b07_merengue_lucien' },
			{ text: 'En sus brazos, envuelto en la manta azul, Escarcha.', cond: 'flag.b07_escarcha_lucien' },
			{ if: CHESPIN, then: [{ text: 'Chespin duerme en la capucha de su sudadera, con la cabeza fuera.' }] },
			{ text: 'Dos agentes de Handsome lo acompañan hasta la Puerta de Par en el primer tren. Antes de subir, Lucien te da una hoja arrancada de la libreta. Pone: «{jugador} · Destino: volver a verte».' },
			{ set: { 'vars.lucien_viaje': 0 } },
			{ quest: 'b07_t_lucien', stage: 'hecha', done: true },
			// ----- Philippe y la señora Perrot -----
			{ text: 'A media tarde, la Pokédex vibra. Una videollamada. Un bigote de agente inmobiliario, muy de cerca, y detrás, la plaza de Luminalia.' },
			{ say: 'philippe', as: 'Philippe (llamada)', text: '¡Ha llegado! ¡Ha cruzado la Puerta a las 15:14! Lo ha dicho él, con la libreta, antes de saludar. —Se seca un ojo con la corbata—. Phil-osofía: hay niños que vuelven a casa y niños que vuelven a casa con la hora apuntada. Los segundos son mejores.' },
			{ say: 'philippe', as: 'Philippe (llamada)', text: 'Dejo la garita. Bueno, la dejo mañana. Esta noche me quedo un rato más. Por costumbre. —Pausa—. Y por si la Puerta zumba. Que no zumbe.' },
			{ say: 'madre_lucien', as: 'Señora Perrot (al fondo)', text: '¡LUCIEN PERROT! ¡Ven aquí ahora mismo! —Y luego, mucho más bajo, al teléfono—: Gracias. Gracias. Le debo un pan. Le debo todos los panes.' },
			{ say: 'madre_lucien', as: 'Señora Perrot (al fondo)', text: '¿Y este Wooloo? ¿Quién ha dicho que este Wooloo se queda? —Pausa—. Bueno. Se queda.', cond: 'flag.b07_merengue_lucien' },
			// ----- Las noticias, según la decisión -----
			{ if: 'flag.b07_octavia_publica', then: [
				{ text: 'A las doce, en la plaza de Artejo, Octavia Lemnis da una rueda de prensa sin atril, de pie, con Alexia a un lado y Renata al otro. Lo cuenta todo: el drenaje, la Fundación Horizonte, el emplazamiento 06. Dice el nombre completo de Noa Lambert dos veces. Luego dimite.' },
				{ say: 'renata', as: 'Renata (mensaje)', text: 'Testigo. Nota para el episodio: hoy no hay episodio. Hoy hay noticia. —Y otro mensaje—: Cool, cool, cool. No. No es cool. Es lo que tocaba.' },
				{ text: 'A las seis de la tarde, un comunicado de Lemnis: «El consejo de administración ha nombrado presidente en funciones al director de Investigación, el **Dr. Ansel Moreau**». En la foto, Ansel sonríe con su corbata azul de siempre. Parece un abuelo muy amable.' },
				{ say: 'rotom', text: '…Bzzt. —Nada más.', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. Él. Ahora manda él. A la vista.', cond: PURG },
			] },
			{ if: 'flag.b07_octavia_testigo', then: [
				{ text: 'Por la tarde, un comunicado de Lemnis de tres líneas: «La presidenta Octavia Lemnis se retira temporalmente por motivos personales. La sustituye en funciones la señorita Serafina Lemnis». Ninguna foto.' },
			] },
			{ if: 'flag.b07_octavia_dentro', then: [
				{ text: 'Por la tarde, una nota de prensa de Lemnis: «La presidenta Octavia Lemnis visitó anoche la Planta Eléctrica de Artejo tras una avería. La situación está bajo control». En la foto, Octavia sale de la Planta con el broche torcido en la solapa. Nadie más que tú sabe por qué está torcido.' },
			] },
			// ----- Galar se despide -----
			{ say: 'roy', as: 'Roy (mensaje)', text: 'Mira. —Una foto: la torre de la Planta apagada y, por encima, seis dragones en fila—. Esta mañana. Por encima. Todos. No sé qué hiciste anoche y no te lo voy a preguntar. Esta foto va al túnel, al lado de la tuya.' },
			{ say: 'sonia', as: 'Sonia (mensaje)', text: '¡Hola! Las lecturas de partículas de Artejo han bajado a la mitad esta madrugada. Y en el Bosque Oniria se han disparado, todas a la vez, a las 4:41. La leyenda de Galar habla de un héroe y de algo que lo acompañaba desde el bosque. —Pausa—. Esto no te lo he dicho. Es solo una investigadora emocionada.' },
			{ say: 'magnolia', as: 'Prof. Magnolia (mensaje)', text: 'Sonia me lo ha contado. A su manera, que es toda a la vez. Cuida esa Maximuñequera, {jugador}. Y cuídate tú, que eso no lo da ninguna profesora.' },
			{ say: 'lionel', as: 'Lionel (pantallas del estadio)', text: '¡Galar! La Temporada sigue, y este año tiene final. ¡La **Copa de la Temporada** se jugará al cierre de Galar! Retadores de todas las regiones, ¡a por las medallas! —Pausa—. Y si alguien sabe por dónde se va al estadio de Artejo desde aquí, que me lo diga, que llevo media hora en una rotonda.' },
			// ----- Rama doble: Ansel escribe -----
			{ if: DOBLE, then: [
				{ text: 'El último mensaje del día no tiene número. Solo un remite: «A. M.». La Pokédex lo abre sola.' },
				{ give: 'mensajeanselartejo' },
				{ read: 'mensajeanselartejo' },
				{ say: 'ansel', as: 'A. M. (posdata)', text: '«P. D.: Salude a la presidenta si la ve. La noto muy callada últimamente. Los callados siempre tienen algo que contar».', cond: 'flag.b07_doble_delata_octavia' },
				{ say: 'rotom', text: 'Bzzt. —Muy bajito—. «Era muy buena contando». —Pausa—. Él lo sabía. Lo de las jaulas. Siempre lo supo.' },
			] },
			// ----- La Gira: Sinnoh -----
			{ text: 'Y la última notificación: la de la Gira, para todos los inscritos.' },
			{ say: 'rotom', text: '¡Bzzt! «La Gira Interregional agradece a Galar su hospitalidad, su lluvia y su té. Próximo destino: **Sinnoh**. Montañas, lagos y un idioma muy viejo. Detalles muy pronto».', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. La Gira. «Sinnoh». Montañas. Lagos. Un idioma muy viejo. —Pausa—. Me gustan los idiomas viejos. No sé por qué.', cond: PURG },
			{ if: LUC, then: [
				{ text: 'Al oír «Sinnoh», {riolu} levanta la cabeza de golpe. Se queda mirando al este, mucho rato, como si oyera algo que tú no oyes. Luego se pega a tu pierna y se queda ahí.' },
				{ happy: { who: 'riolu', n: 10 } },
			] },
			// ----- Diario del final, según la rama -----
			{ diary: 'Hoy. Lo intento.\n\nNoa contó hasta tres. Abrió las jaulas. Salieron todos.\n\nLucien ha vuelto a casa. Ha apuntado la hora.', cond: D_PURGADO },
			{ diary: 'Hoy amaneció en la muralla de Artejo. Había una flor roja en una almena; la dejó la Floette del señor alto.\n\nAnoche, en la cima de la Planta, ganamos a Olivia y se apagó el Nodo 06. Debajo dormía Eternatus. Despertó. Desde el oeste, desde el Bosque Oniria, algo aulló, y el aura de {riolu} contestó.\n\nLa presidenta Octavia Lemnis vio lo que nadie le había enseñado y eligió. La Fundación Horizonte llevaba su firma; la usaban otros.\n\nLucien ha vuelto a Luminalia. La Gira dice que el siguiente destino es Sinnoh.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy amaneció precioso en la muralla de Artejo! Todo rosa. Lucien, el niño de Luminalia, ya va de vuelta a casa con un montón de cosas apuntadas en su libreta.\n\nY la Gira ha anunciado el siguiente destino: ¡Sinnoh! Montañas, lagos… ¡qué ganas!', cond: D_DOBLE },
			{ quest: 'b07_m5', stage: 'hecha', done: true },
			{ cap: 74 },
			{ set: { 'flag.b07_fin': true } },
			{ save: true },
			{ text: '**Fin del Acto VI.**' },
			{ text: '*La historia continúa…*' },
		],
		b07_merengue_visita: [
			{ text: 'Merengue está tumbado en el área pequeña, sobre una manta, con el pañuelo bordado recién lavado. Al verte, levanta la cabeza. No se levanta. Mueve una oreja.' },
			{ say: 'padre_rhi', text: 'Ya come. Ya se mueve. Bueno, se mueve cuando le chutan. —Se apoya en el carrito de la cal—. Le he puesto la manta donde le da el sol por la mañana. Los Wooloo tienen que mirar algo bonito al despertarse. Lo dice Gareth. O sea, yo.' },
			{ text: '{riolu} se sienta junto a Merengue un rato. Ninguno de los dos hace nada. Está bien así.', cond: LUC },
		],
		b07_flor_muralla: [
			{ text: 'La flor roja sigue en la piedra de la almena. No se marchita. El viento de la muralla no la mueve. Alguien ha dejado al lado una piedrecita, para sujetarla, aunque no haga falta.' },
			{ text: 'Al lado de la flor, sujeto con la misma piedrecita, sigue el broche roto de la lemniscata. Nadie se lo ha llevado. Los guardias dicen que no es suyo.', cond: 'flag.b07_octavia_publica' },
			{ text: '{riolu} acerca la nariz a la flor y estornuda. Muy bajito. Como si fuera de mala educación.', cond: LUC },
		],
		b07_almenas: [
			{ text: 'Nombres rayados con navaja en la piedra de las almenas, de todas las épocas. «E. + M.». «AQUÍ ESTUVO EL 4.º DE ARTEJO». «LLUEVE». Uno, muy antiguo, casi borrado, dice solo: «VOLVÍ».' },
			{ text: 'Uno nuevo, de esta misma mañana, con letra redonda de niño y la hora al lado: «L. P. · 5:40 · Destino: casa».', cond: 'flag.b07_fin' },
		],
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		b07_mt_rafaga_escamas: { name: 'MT Ráfaga Escamas', pocket: 'machines', tm: 'scaleshot', desc: 'Lanza escamas de dos a cinco veces seguidas; el usuario gana Velocidad y pierde Defensa. Te la dio Roy, el líder de Artejo, con la Medalla Dragón.' },
		notanoa: { name: 'La lista de Noa', pocket: 'key', desc: 'Unas hojas de inventario grapadas, con la letra redonda de Noa Lambert, cada vez más pequeña para que quepa todo. Las dejó en la ventanilla de los papeles de la sala de cristal.',
			read: '*(Hojas de inventario grapadas. Letra redonda, cada vez más pequeña. En cada línea, el «Destino: por asignar» impreso está tachado con una raya recta y, encima, a mano, otra palabra.)*\n\n**EMPLAZAMIENTO 06 · INVENTARIO · RESPONSABLE: N. LAMBERT**\n\n1. Mareep · Johto · Destino: *casa*\n2. Shinx · Sinnoh · Destino: *casa*\n3. Shinx · Sinnoh · Destino: *casa (con el otro)*\n4. Cubchoo · Teselia · Destino: *casa*\n5. Fletchling · Kalos · Destino: *casa*\n6. Wingull · Hoenn · Destino: *casa*\n7. Snom · Galar · Destino: *casa (está aquí al lado)*\n8. Pichu · Johto · Destino: *casa*\n9. Bergmite · Kalos · Destino: *casa*\n10. Sandile · Teselia · Destino: *casa*\n\n*(La lista sigue. Ciento doce líneas. Ninguna se salta.)*\n\n…\n\n111. Rookidee · Galar · Destino: *casa*\n112. Wooloo · «Merengue» · KAL-0031 · Destino: *casa. Esta vez sí.*\n\n---\n\n*(Debajo, separada de las demás por una raya doble, una última línea con otra tinta.)*\n\n**113. Lucien P. · 12 años · Destino: su madre.**\n\n---\n\n*(Al pie de la última hoja, muy pequeño, casi en el borde:)*\n\nTotal: 112 y uno. Contado dos veces. Sale impar. No vuelvo a empezar: esta vez está bien así.\n\n— N.' },
		expedientedufresne: { name: 'Expediente de E. Dufresne', pocket: 'key', desc: 'Una hoja de personal mecanografiada, amarillenta, de la carpeta de bajas del Proyecto Lemniscata. Grapada arriba, una foto pequeña en blanco y negro.',
			read: '*(Hoja de personal mecanografiada, amarillenta. Grapada en una esquina, una foto pequeña en blanco y negro.)*\n\n**PROYECTO LEMNISCATA · PERSONAL · BAJAS**\n\n**Nombre:** E. Dufresne\n**Puesto:** Investigadora, Mediciones Vitales (grupo inicial)\n**Alta:** año 1 del proyecto\n**Baja:** voluntaria, hace veintiún años\n**Motivo declarado:** «Las mediciones vitales no cuadran».\n**Observaciones (a mano, otra letra):** «Se ha llevado sus cuadernos. Recuperarlos. No insistir con ella».\n\n---\n\n*(La foto: una mujer joven, con el pelo claro muy corto, de pie delante de una ventana. Lleva un bebé en brazos, envuelto en una tela con un bordado: una lemniscata. La mujer no sonríe a la cámara. Mira al bebé.)*\n\n*(Detrás de la foto, a lápiz, casi borrado:)* «Para que conste que existió».' },
		informeoctavia: { name: 'Informe trimestral del Nodo 06', pocket: 'key', desc: 'Un informe encuadernado en canutillo, con el sello de Dirección y una casilla de distribución en la portada. Octavia Lemnis no lo había visto nunca. Te lo dio en el archivo de la Planta de Artejo.',
			read: '*(Informe encuadernado en canutillo. Portada con el sello: una Ω dentro de un círculo.)*\n\n**NODO 06 · ARTEJO · INFORME TRIMESTRAL (12.º)**\n**Distribución:** Dirección (Ω). **Presidencia:** no.\n\n**1. Fuente principal.** Sujeto dormido bajo la torre. Rendimiento del 82 %. Estable. Sin cambios en su estado. Se recomienda no despertarlo.\n\n**2. Aporte complementario (emplazamiento 06).** Desplazados de las Puertas, 112 unidades. Aporte vital del 18 %. Las unidades se reponen con los envíos de logística. En el registro contable figura como «logística».\n\n**3. Incidencias.** Una unidad no prevista llegó por la Fisura de Luminalia (2:18). Edad aproximada: 12 años. No figura en el inventario. La responsable de inventario dice no haberla visto. *(A mano, en el margen:)* «Comprobar».\n\n**4. Personal.** La responsable de inventario hace preguntas. *(A mano:)* «Mantener. Es muy simpática».\n\n**5. Proyección.** Con la fase nueva, el aporte complementario sube al 31 %. Fecha de conexión: mañana, 6:00.\n\n**Firmado:** Dirección (Ω).\n**Visto bueno de Presidencia:** —' },
		insignianoa: { name: 'Insignia de hojalata', pocket: 'key', desc: 'Una insignia pequeña de mercadillo: un Froakie sonriente, sin lemniscata ni logo de nada. Noa te la dio por la ventanilla de los papeles: «Para Bastien. Para que se la des. Dile que ahora tiene dueño».' },
		mensajeanselartejo: { name: 'Mensaje de A. M. (Artejo)', pocket: 'key', desc: 'Un mensaje que llegó a la Pokédex sin número, con un solo remite: «A. M.». Rotom lo guardó en la carpeta del candado, con los otros dos.',
			read: '*(Mensaje de texto. Remite: A. M.)*\n\nQuerid{o|a|e} {jugador}:\n\nMe cuentan que ha tenido usted una noche muy larga en Artejo. Las noches largas, a su edad, se recuperan con un buen desayuno. A la mía, no tanto.\n\nQué pena lo de la señora Lambert. Era muy buena contando.\n\nLa conocí poco. Le gustaban los inventarios, las listas y las cosas en fila. Siempre pensé que habría sido una científica estupenda, si hubiera querido. Hay personas que nacen para medir y prefieren cuidar. Es una lástima, desde el punto de vista de los datos. Desde los otros puntos de vista, supongo que no.\n\nCuídese mucho. Y cuide a su Lucario. Los que cuentan bien se nos van siempre antes.\n\nCon cariño,\n\nA. M.' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b07_entrepuentes: {
			name: 'El árbol de la isla', icon: '🌳', hours: 18, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'bosque', hint: 'Sacude las ramas que cuelgan sobre el río. Lo que cae al agua, se lo lleva la corriente. Lo dorado vale por tres.' },
			ask: 'Un árbol de bayas enorme en una isla de hierba entre dos puentes, con las ramas colgando sobre el río. En la horquilla, un Greedent duerme con las mejillas llenas. No parece dispuesto a compartir. No parece dispuesto a despertarse, tampoco.',
			text: 'El árbol de la isla suelta lo que tiene. Lo que cae al río, el río se lo queda.',
			wait: 'El árbol de la isla está pelado. El Greedent de la horquilla tiene las mejillas el doble de grandes que antes. Nadie ha sido. Nadie.',
			table: [
				{ id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'oranberry', w: 14, n: [1, 3] }, { id: 'leppaberry', w: 8, n: [1, 1] },
				{ id: 'chestoberry', w: 8, n: [1, 2] }, { id: 'yacheberry', w: 4, n: [1, 1] }, { id: 'habanberry', w: 4, n: [1, 1] },
				{ id: 'lumberry', w: 3, n: [1, 1] },
				{ id: 'starfberry', w: 1, n: [1, 1], rare: true }, { id: 'liechiberry', w: 1, n: [1, 1], rare: true },
			],
		},
		b07_cuenca: {
			name: 'Las rocas destapadas de la Cuenca', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 3, theme: 'cantera', hint: 'El viento destapa las vetas y las vuelve a tapar. Pica rápido donde brilla, pero no tan rápido como para que se venga abajo.' },
			ask: 'Las rocas del borde de la Cuenca Polvorienta, medio destapadas por el viento. Hay vetas brillantes que aparecen y desaparecen con cada ráfaga. Alguien ha dejado un pico clavado en la arena con un pañuelo atado al mango.',
			text: 'La Cuenca suelta lo que el viento ha destapado. Te lo llevas con la boca llena de arena.',
			wait: 'Hoy el viento ha tapado todas las vetas. Las rocas son solo rocas, rojizas y calientes. Mañana el viento cambiará de idea.',
			table: [
				{ id: 'hardstone', w: 16 }, { id: 'stardust', w: 14, n: [1, 2] }, { id: 'softsand', w: 12 }, { id: 'smoothrock', w: 8 },
				{ id: 'heatrock', w: 6 }, { id: 'everstone', w: 6 }, { id: 'nugget', w: 4 }, { id: 'starpiece', w: 3 },
				{ id: 'dragonscale', w: 2, rare: true }, { id: 'dawnstone', w: 1, rare: true }, { id: 'icestone', w: 1, rare: true },
			],
		},
		b07_enfado_pesca: {
			name: 'La orilla del Lago del Enfado', icon: '🎣', hours: 18, picks: [1, 2],
			game: { type: 'fish', level: 3, theme: 'lago', hint: 'El viento riza el agua siempre del mismo lado. Lanza al otro, donde está quieta, y no grites.',
				wild: [{ sp: 'barraskewda', lv: [68, 70], w: 6 }, { sp: 'lanturn', lv: [68, 70], w: 5 }, { sp: 'qwilfish', lv: [68, 70], w: 2 }, { sp: 'gyarados', lv: [69, 70], w: 2 }], wildChance: 0.3 },
			ask: 'La orilla del lado del viento, con una caña rota apoyada en una roca y un termo vacío. El agua está fría y oscura. Por el otro lado, donde el viento no llega, está quieta como un espejo.',
			text: 'El Lago del Enfado devuelve lo que se le cae a la gente que pesca en silencio.',
			wait: 'Hoy el viento sopla de los dos lados a la vez. El lago está enfadado de verdad. Mejor otro día.',
			table: [
				{ id: 'freshwater', w: 14, n: [1, 2] }, { id: 'pearl', w: 12 }, { id: 'diveball', w: 8, n: [1, 2] }, { id: 'heartscale', w: 8 },
				{ id: 'mysticwater', w: 6 }, { id: 'damprock', w: 4 }, { id: 'bigpearl', w: 3 },
				{ id: 'pearlstring', w: 1, rare: true }, { id: 'waterstone', w: 2, rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		cornisa_artejo_entreno: {
			name: 'Cornisa de Artejo (entrenamiento)', npc: 'vigia_artejo', type: 'Dragon', rec: 72,
			cond: 'visited("cornisa_artejo")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **72**: los domadores de dragones de Artejo entrenan en el saliente de la Cornisa, al pie de la muralla. Casi todo es dragón: **Hielo**, **Hada** y **Dragón** les sientan mal.' },
				{ text: '**La vigía** da una cosa a quien gane **tres** combates. Está en su garita, con el catalejo.' },
				{ cond: 'flag.b07_premio_cornisa', text: '✔ Premio conseguido: MT Vasto Impacto.' },
			],
		},
		jefe_olivia: {
			name: 'Olivia, en la cima de la Planta', npc: 'olivia_mc', trainer: 'olivia_1', type: 'Poison', rec: 73,
			cond: 'flag.b07_octavia',
			info: [
				{ text: 'En lo alto de la torre de la Planta Eléctrica de Artejo, junto al nodo. Te deja curar antes (Octavia trae un maletín). Si pierdes, se puede volver a intentar: no se mueve de ahí.' },
				{ text: '6 Pokémon, hasta el nivel 73. Muy variados: hielo y fantasma, agua, fuego y veneno, planta, acero. Su último Pokémon **se hace enorme** de una forma que no has visto.' },
				{ text: 'Contra su as: **Tierra** y **Psíquico**. Al **Acero** no le hace nada su veneno. Ojo con su Pokémon de acero: pega muy fuerte y aguanta más.' },
				{ cond: 'flag.b07_olivia_vencida', text: '✔ Vencida en la cima de la torre.' },
			],
		},
	},

	// =====================================================================
	// NPCs genéricos de este tramo
	// =====================================================================
	npcs: {
		vigia_artejo: { name: 'La vigía', title: 'Vigía de la Cornisa de Artejo', generic: true, look: { hair: 'cap', hairColor: '#9aa0a8', outfit: '#5a4a3a', outfit2: '#c9a66b', skin: 1, eyesStyle: 'narrow', mouth: 'flat', age: 'old', collar: 'coat', acc: 'beanie', capColor: '#3a5a6a' } },
	},

	// =====================================================================
	// NEGOCIO: Merengue en el Campo de los Hargreave (se suma a b07_campo de comun.js)
	// =====================================================================
	ventures: {
		b07_campo: {
			events: [
				{ id: 'merengue', name: 'Merengue en el área', w: 3, npc: 'padre_rhi', once: true, cond: 'flag.b07_merengue_campo',
					text: 'Ha llegado el Wooloo que mandaste. El del pañuelo. Lleva tres días de pie en el área pequeña, delante de la portería, sin moverse. No come. Mira la red. Los críos no se atreven a chutar.',
					options: [
						{ text: '«Déjalo estar. Ya se moverá.»', result: 'Gareth le pone un cubo de agua y una manta al lado de la portería y no dice nada más. Al cuarto día, Merengue se tumba sobre la manta. Al quinto, se come la banda. Gareth la vuelve a pintar silbando.', effect: { happy: 10, boost: { mult: { cesped: 1.15 }, days: 3, label: 'Merengue se queda' } } },
						{ text: '«Que juegue de portero.»', result: 'Los críos le chutan flojito. Merengue no se mueve, pero el balón rebota en su lana. Gol parado. Otro. Al final de la tarde lo llevan a hombros, o lo intentan. Gareth apunta en la libreta: «Portero nuevo. No habla. Para todo».', effect: { boost: { mult: { escuela: 1.25 }, days: 3, label: 'El portero de lana' } } },
					] },
			],
		},
	},

	// Spots que este tramo añade a lugares de otros tramos del B7 (index.js los suma)
	extraSpots: {
		campo_hargreave: [
			{ label: 'Merengue, en el área pequeña', sub: 'Un Wooloo con un pañuelo bordado', icon: '🐑', cond: 'flag.b07_merengue_campo', talk: [{ script: 'b07_merengue_visita' }] },
		],
	},

	// =====================================================================
	// RADIO LAVANDA (comentan lo que el jugador ya vivió)
	// =====================================================================
	radio: [
		{ id: 'rl_b07_roy', kind: 'noticia', cond: 'flag.b07_roy_vencido', text: 'Desde Galar nos llega que Roy, el líder de Artejo, ha perdido la Medalla Dragón contra alguien de la Gira y ha colgado la foto en el túnel de su estadio, al lado de la del Campeón. Dicen que la del Campeón está un poco más torcida desde entonces. Nadie la ha tocado. Dicen.' },
		{ id: 'rl_b07_publica', kind: 'noticia', cond: 'flag.b07_octavia_publica && flag.b07_fin', text: 'Noticia seria, oyentes: la presidenta de Lemnis dimitió ayer en una plaza de Galar, sin atril, de pie. Contó cosas que no vamos a repetir aquí porque no sabríamos contarlas bien. Dijo un nombre dos veces. Aquí en Lavanda sabemos lo que es eso. Un minuto de música, sin anuncios.' },
		{ id: 'rl_b07_lucien', kind: 'dedicatoria', from: 'Una panadera de Luminalia', cond: 'flag.b07_fin', text: 'Una dedicatoria desde Kalos: «Para {el|la|le} que me trajo a mi hijo de vuelta, con la hora apuntada. Te debo todos los panes. Y para una señorita que contaba muy bien y que no conocí: gracias». Nos ha pedido una canción tranquila. Aquí va.' },
	],
};
