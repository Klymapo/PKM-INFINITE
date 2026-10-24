// Bloque 6 · T3 · «Lo que late a destiempo»: la cabina y el Valle de Antaño (Esmalte).
// Mayólica → Bosque Azulejo → Puente Saeta → Ciudad Esmalte (Museo: Encina, Petra en una vitrina, el reloj que se para,
// Snivy) → la cabina aterriza en el patio (Ulises) → Péndulo de ámbar (cinemática) → dentro de la cabina (más grande por
// dentro; Rotom no sincroniza: pista; puzle de la consola; tercer sueño de aura) → Valle de Antaño (llegada, Archen,
// pared de ámbar, lago, el nido y el alfa de la bandada) → montura Aerodactyl (arnés de Leilani por llamada)
// → el Dialga joven se calma (clímax) → vuelta al patio (sin Diario de esos días) → b06_t3_hecho.
// Opcional: Isla Libertad (vuelo o Lapras; rumor de Victini). Tras el final, el valle queda visitable con el péndulo.
// Contratos: secreto/bloques/b06-encargo.md. Este tramo no tiene nada «en antena» (el Apuntador no sabe nada de él).

const LUC = 'inParty("riolu") || inParty("lucario")';
const AMBAR = 'has("ambarsinregistro")';
const SNIVY_LINEA = 'owns("snivy") || owns("servine") || owns("serperior")';
const ARCHEN_LINEA = 'owns("archen") || owns("archeops")';
const AERO = 'owns("aerodactyl")';
const PEND = 'flag.b06_pendulo';
const FIN = 'flag.b06_t3_hecho';

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== BOSQUE AZULEJO ===================
		bosque_azulejo: {
			name: 'Bosque Azulejo', short: 'Bosque Azulejo', region: 'teselia', kind: 'route', map: { x: 36, y: 62 },
			bg: { type: 'forest', ground: '#2f5a3a', far: '#1f3a2a' },
			desc: 'Al suroeste de Mayólica, la ciudad se acaba de golpe y empieza un bosque viejo, de troncos rectos y copas tan cerradas que la luz llega al suelo **azul**, como filtrada por un cristal. De ahí el nombre.\n\nEl sendero baja entre helechos y charcas hasta el mar. Al otro lado del agua, el **Puente Saeta** y, detrás, **Ciudad Esmalte**.',
			descNight: 'De noche, el Bosque Azulejo es negro de verdad. Solo brillan las charcas, donde algo con escamas sube a respirar, y los ojos de los Liepard en las ramas bajas, que no se mueven cuando pasas. Te siguen con la vista.',
			links: ['mayolica', 'puente_saeta'],
			enterCond: 'flag.b06_pase_tren',
			blockedMsg: 'Un guarda forestal con chaleco verde te para en la linde. «¿Al bosque? Con la Gira se entra con el Pase, que hay que firmar el registro de la reserva. Lo da la líder de Mayólica a quien gana su medalla. Antes, no. Normas».',
			mapNote: 'Bosque viejo · charcas · camino a Esmalte',
			rumors: [
				{ text: 'En el Bosque Azulejo hay un árbol con un reloj de cuco clavado en el tronco. Nadie sabe quién lo puso. Se para cuando pasa alguien con prisa.' },
				{ text: 'Los de Mayólica vienen al bosque a «desconectar». Los del bosque dicen que se nota: dejan las pantallas encendidas en los bancos y se van tan tranquilos.' },
				{ cond: '!flag.b06_t3_hecho', text: 'Últimamente, en el Bosque Azulejo, los Leavanny cosen las hojas al revés: primero el nudo y luego la puntada. Los guardas dicen que es el calor. No hace calor.' },
			],
			route: {
				from: 'mayolica', to: 'puente_saeta', length: 7, terrain: 'forest', rate: 0.22,
				tramos: {
					0: [{ text: 'Las últimas farolas de Mayólica y, de repente, árboles. Un cartel de madera: «Reserva del Bosque Azulejo. No se alimenta a los Pokémon. Tampoco se les pide que posen».' }],
					1: [
						{ trainer: 'azu_gervasio' },
						{ item: 'ultraball', n: 2 },
					],
					2: [
						{ text: 'Un claro con una charca redonda. La luz que cae de las copas la vuelve azul cobalto. En el borde, un Leavanny cose una hoja grande con mucha paciencia y muy mal: la puntada va antes que el nudo.' },
						{ spot: { action: { gather: 'b06_azulejo_bayas' } }, label: 'Los zarzales de la charca', sub: 'Bayas maduras entre las espinas', icon: '🫐', new: '!flag.rec_b06_azulejo_bayas' },
					],
					3: [
						{ trainer: 'azu_amaranta', optional: true, label: 'Una criadora con tres Whimsicott dormidos en el regazo' },
						{ item: 'fullrestore', hidden: true },
					],
					4: [
						{ text: 'Un tronco enorme, hueco, con un reloj de cuco clavado a la altura de los ojos. Las agujas marcan las once y cuarto. Pasas por delante. Marcan las once y cuarto otra vez. Y otra vez.', cond: '!flag.b06_t3_hecho' },
						{ text: 'Un tronco enorme, hueco, con un reloj de cuco clavado a la altura de los ojos. Va bien. El cuco sale, dice la hora con mucha dignidad y se vuelve a meter.', cond: 'flag.b06_t3_hecho' },
						{ text: 'Notas el bolsillo tibio. El Ámbar sin registro late más deprisa, como si alguien lo llamara desde lejos.', cond: AMBAR + ' && !flag.b06_t3_hecho' },
					],
					5: [
						{ trainer: 'azu_remigio' },
						{ item: 'maxrevive', hidden: true },
					],
					6: [
						{ trainer: 'azu_leire', optional: true, label: 'Una guarda forestal que vigila desde una plataforma entre las ramas' },
						{ item: 'leafstone' },
					],
					7: [{ text: 'El bosque se abre sobre un acantilado bajo. Abajo, el mar; enfrente, sobre pilares de piedra blanca, el arco largo y fino del **Puente Saeta**. Al fondo, tejados rojos y una cúpula de cristal: Esmalte.' }],
				},
				encounters: {
					forest: [
						{ sp: 'leavanny', lv: [60, 62], w: 18 },
						{ sp: 'seismitoad', lv: [60, 62], w: 14 },
						{ sp: 'scolipede', lv: [60, 62], w: 12 },
						{ sp: 'toxicroak', lv: [60, 62], w: 10 },
						{ sp: 'whimsicott', lv: [60, 62], w: 10, time: 'day' },
						{ sp: 'lilligant', lv: [60, 62], w: 8, time: 'day' },
						{ sp: 'liepard', lv: [60, 62], w: 12, time: 'night' },
						{ sp: 'yanmega', lv: [61, 63], w: 8 },
						{ sp: 'throh', lv: [61, 63], w: 6 },
						{ sp: 'sawk', lv: [61, 63], w: 6 },
						{ sp: 'audino', lv: [60, 62], w: 6 },
						{ sp: 'slaking', lv: [62, 63], w: 2 },
						{ sp: 'ribombee', lv: [60, 62], w: 4, displaced: true, time: 'day' },
						{ sp: 'thievul', lv: [60, 62], w: 4, displaced: true, time: 'night' },
					],
				},
			},
		},

		// =================== PUENTE SAETA ===================
		puente_saeta: {
			name: 'Puente Saeta', short: 'Puente Saeta', region: 'teselia', kind: 'route', map: { x: 28, y: 72 },
			bg: { type: 'coast', far: '#7fb4d8', ground: '#d8d0c0' },
			desc: 'Un puente colgante larguísimo, blanco, con los cables tan tensos que, cuando sopla el viento del mar, **cantan**: una nota larga y grave que se oye desde las dos orillas. Abajo, muy abajo, el agua verde y las barcas de los pescadores.\n\nAl final del puente empieza **Ciudad Esmalte**.',
			descNight: 'De noche, el Puente Saeta se ilumina de punta a punta con farolillos blancos. Los cables siguen cantando, más bajito. Abajo, las barcas encienden sus lámparas para pescar y el agua parece llena de estrellas que se mueven.',
			links: ['bosque_azulejo', 'esmalte'],
			mapNote: 'El puente que canta · pesca desde el mirador',
			rumors: [
				{ text: 'Cuando el viento sopla del sur, el Puente Saeta da un **la**. Los músicos de Mayólica vienen a afinar aquí. Los de Esmalte dicen que es un **si** bemol y que los de Mayólica no tienen oído.' },
				{ text: 'Los Swanna anidan bajo el tablero del puente. Dicen que, cuando el puente canta, ellos contestan. Nadie se pone de acuerdo en si es cierto, pero todo el mundo se calla para escucharlo.' },
			],
			route: {
				from: 'bosque_azulejo', to: 'esmalte', length: 4, terrain: 'path', rate: 0.18,
				tramos: {
					0: [{ text: 'El primer pilar, de piedra blanca, con una placa: «Puente Saeta. Si oye un canto, es el puente. Si oye dos, es el puente y un Swanna. Si oye tres, siga andando».' }],
					1: [
						{ trainer: 'saeta_celestino' },
						{ item: 'maxrepel' },
					],
					2: [
						{ text: 'A mitad del puente hay un mirador con bancos y unas cañas atadas a la barandilla. El viento sopla fuerte. Los cables cantan tan alto que notas la nota en los dientes.' },
						{ terrain: 'water' },
						{ spot: { action: { gather: 'b06_saeta_pesca' } }, label: 'El mirador de los pescadores', sub: 'Cañas largas atadas a la barandilla', icon: '🎣', new: '!flag.rec_b06_saeta_pesca' },
					],
					3: [
						{ trainer: 'saeta_olvido', optional: true, label: 'Una pescadora con un sombrero de paja y un cubo lleno de algo que se mueve' },
						{ item: 'hyperpotion', n: 2, hidden: true },
					],
					4: [{ text: 'El último tramo baja en curva hacia una ciudad de calles de ladrillo y almacenes viejos convertidos en talleres. Huele a pintura fresca y a café. En lo alto, la cúpula de cristal del **Museo**.' }],
				},
				encounters: {
					path: [
						{ sp: 'unfezant', lv: [60, 62], w: 22 },
						{ sp: 'swanna', lv: [60, 62], w: 18 },
						{ sp: 'zebstrika', lv: [61, 63], w: 12 },
						{ sp: 'stoutland', lv: [60, 62], w: 12 },
						{ sp: 'watchog', lv: [60, 61], w: 10 },
						{ sp: 'liepard', lv: [60, 62], w: 10, time: 'night' },
						{ sp: 'yanmega', lv: [61, 62], w: 6 },
						{ sp: 'toucannon', lv: [60, 62], w: 4, displaced: true },
					],
					water: [
						{ sp: 'basculin', lv: [60, 62], w: 26 },
						{ sp: 'basculinbluestriped', lv: [60, 62], w: 20 },
						{ sp: 'seaking', lv: [60, 62], w: 20 },
						{ sp: 'alomomola', lv: [60, 62], w: 8 },
						{ sp: 'jellicent', lv: [61, 63], w: 6, time: 'night' },
						{ sp: 'pelipper', lv: [60, 62], w: 4, displaced: true },
					],
				},
			},
		},

		// =================== CIUDAD ESMALTE ===================
		esmalte: {
			name: 'Ciudad Esmalte', short: 'Esmalte', region: 'teselia', kind: 'city', map: { x: 20, y: 78 },
			bg: { type: 'city', roofs: ['#b84a3a', '#c4743a', '#8a5a3a'], far: '#7fa4c4', ground: '#b8a48a' },
			desc: 'Una ciudad de **almacenes de ladrillo** que un día fueron de una fábrica y hoy son talleres de pintores, carpinteros y alfareros. Las calles huelen a barniz. En las aceras hay caballetes, cajas de herramientas y gatos.\n\nEn lo alto, el edificio más antiguo de todos: el **Museo de Esmalte**, con su cúpula de cristal y, en la fachada, un reloj que lleva parado desde antes de que nadie se acuerde.',
			descNight: 'De noche, los talleres de Esmalte dejan las persianas a medio bajar y por debajo sale luz y música. Alguien sigue pintando. Alguien sigue lijando. En lo alto, la cúpula del Museo brilla como un farol, y el reloj de la fachada sigue sin moverse.',
			descs: [
				{ cond: FIN, text: 'Una ciudad de **almacenes de ladrillo** que hoy son talleres de pintores, carpinteros y alfareros. Las calles huelen a barniz.\n\nEn lo alto, el **Museo de Esmalte** y, en su fachada, el reloj viejo. **Funciona.** Por primera vez en muchos años da las horas, un poco grave, un poco ronco, y la gente de los talleres se para a escucharlo como quien oye a un pariente que vuelve a hablar.' },
			],
			mapNote: 'Museo (Prof. Encina) · el patio y la cabina · talleres · Lapras a la Isla Libertad',
			onEnter: [{ script: 'b06_esmalte_llegada', cond: '!flag.b06_esmalte_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', sub: 'En un almacén viejo con vigas de hierro', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Esmalte', sub: 'Una ferretería que también vende Poké Balls', action: { shop: 'tienda_esmalte' } },
				{ label: 'Museo de Esmalte', sub: 'La cúpula de cristal y el reloj parado', icon: '🏛️', new: '!flag.b06_petra_museo', action: { go: 'museo_esmalte' } },
				{ label: 'El patio del Museo', sub: 'Detrás del edificio, entre setos', icon: '🌳', cond: 'flag.b06_cabina_patio', new: 'flag.b06_cabina_patio && !' + PEND, action: { go: 'patio_museo' } },
				{ label: 'Los talleres', sub: 'Persianas a medio subir y olor a barniz', icon: '🎨', talk: [{ script: 'b06_esmalte_talleres' }] },
				{ label: 'Cruzar en Lapras a la Isla Libertad', sub: 'Montura · al sur, mar adentro', icon: '🌊', cond: 'flag.mount_lapras', new: 'flag.mount_lapras && !visited("isla_libertad")', action: { go: 'isla_libertad' } },
			],
			rumors: [
				{ text: 'El reloj de la fachada del Museo se paró hace tantos años que en Esmalte quedar «a la hora del reloj» significa «nunca». Los novios lo usan para cortar.' },
				{ text: 'En los talleres de Esmalte hay un alfarero que solo hace tazas con el asa al revés. Dice que así se sujetan mejor. Tiene lista de espera de dos años.' },
				{ cond: '!' + FIN, text: 'Dicen que el reloj viejo del Museo, el del vestíbulo, se para cada vez que entra alguien de la Gira. La profesora que lo estudia no duerme. Lo apunta todo.' },
				{ cond: FIN, text: 'En el patio del Museo hay una cabina de madera azul que nadie ha visto llegar. Los niños dicen que por dentro es enorme. Los mayores dicen que es una caseta de herramientas. Ninguno ha conseguido abrirla.' },
			],
		},
		museo_esmalte: {
			name: 'Museo de Esmalte', short: 'Museo', region: 'teselia', kind: 'building', parent: 'esmalte',
			bg: { type: 'indoor', wall: '#c9b48a', floor: '#6b4a2b' },
			desc: 'Un vestíbulo altísimo, de madera oscura, bajo la cúpula de cristal. En el centro, el esqueleto de un **Archeops** con las alas abiertas, colgado del techo con cables finos. Alrededor, vitrinas: ámbares, conchas, huesos, piedras con huellas.\n\nAl fondo, contra la pared, un **reloj de pie** viejísimo, más alto que dos personas, con un péndulo de latón que no se mueve.',
			descs: [
				{ cond: FIN, text: 'El vestíbulo del Museo, bajo la cúpula de cristal. El Archeops de huesos sigue volando sin moverse.\n\nAl fondo, el **reloj de pie** tiene un péndulo nuevo de latón, sin ámbar, que va y viene despacio. La Prof. Encina le ha puesto al lado un taburete y una libreta. Dice que es para escucharlo.' },
			],
			mapNote: 'Prof. Encina · el reloj viejo · Snivy',
			spots: [
				{ label: 'La vitrina de los ámbares', sub: 'Alguien golpea el cristal desde dentro', icon: '🦴', cond: '!flag.b06_petra_museo', new: 'true', talk: [{ script: 'b06_museo' }] },
				{ label: 'Prof. Encina', sub: 'Mira el reloj con una libreta en la mano', icon: '🔬', cond: 'flag.b06_petra_museo', talk: [
					{ cond: FIN, script: 'b06_encina_despues' },
					{ script: 'b06_encina_charla' },
				] },
				{ label: 'Snivy', sub: 'Mira a todo el mundo por encima del hombro', icon: '🌿', cond: 'flag.b06_petra_museo && !flag.b06_snivy', new: 'true', talk: [{ script: 'b06_snivy' }] },
				{ label: 'Snivy', sub: 'Vigila el ala de los fósiles', icon: '🌿', cond: 'flag.b06_snivy_vive', talk: [{ script: 'b06_snivy_visita' }] },
				{ label: 'El reloj de pie', sub: 'Un péndulo de latón que no se mueve', icon: '🕰️', cond: '!' + FIN, talk: [{ script: 'b06_reloj' }] },
				{ label: 'El reloj de pie', sub: 'Va y viene, despacio', icon: '🕰️', cond: FIN, talk: [{ script: 'b06_reloj_despues' }] },
			],
		},
		patio_museo: {
			name: 'Patio del Museo', short: 'Patio', region: 'teselia', kind: 'area', parent: 'esmalte',
			bg: { type: 'town', ground: '#6a8a4a', far: '#7fa4c4' },
			desc: 'Un patio cuadrado detrás del Museo, con setos recortados, un banco de hierro y una fuente seca. En medio de la hierba, donde ayer no había nada, hay una **cabina de madera azul** con un farolillo encima y ventanitas, un poco torcida, como si hubiera aterrizado con prisa.',
			descs: [
				{ cond: FIN, text: 'El patio de detrás del Museo, con sus setos y su fuente seca. En medio de la hierba sigue la **cabina azul**, aparcada, recta por fin. El farolillo de arriba se enciende y se apaga despacio, al ritmo de algo que duerme dentro.\n\nEn la cerradura de la puerta hay una llave puesta. No gira con la mano. Gira con el péndulo.' },
			],
			mapNote: 'La cabina azul',
			spots: [
				{ label: 'Ulises', sub: 'Le da golpecitos a la cabina como a un caballo', icon: '🧣', cond: '!' + PEND, new: 'true', talk: [{ script: 'b06_ulises_patio' }] },
				{ label: 'Entrar en la cabina', sub: 'La puerta está entornada', icon: '🚪', cond: PEND + ' && !flag.b06_dialga_calmado', new: PEND + ' && !flag.b06_cabina_dentro', action: { go: 'cabina_ulises' } },
				{ label: 'Abrir la cabina', sub: 'La llave puesta gira con el péndulo', icon: '🔑', cond: FIN, action: { go: 'cabina_ulises' } },
				{ label: 'El banco de hierro', sub: 'Una bufanda de rayas olvidada en el respaldo', icon: '🪑', cond: FIN, talk: [{ script: 'b06_banco_patio' }] },
			],
		},
		cabina_ulises: {
			name: 'La cabina', short: 'La cabina', region: 'teselia', kind: 'building', parent: 'patio_museo',
			bg: { type: 'lab', wall: '#2a3a6a', floor: '#5a3a2a', crystals: '#6fc0ff' },
			desc: 'Por fuera es una cabina. Por dentro es **una sala enorme**, redonda, con el techo tan alto que no se ve. Escaleras de madera que suben a galerías llenas de libros, alfombras viejas, una tetera encima de un motor, y en el centro una **consola de mandos** de latón y madera, llena de palancas, relojes y teclas de máquina de escribir.\n\nEn un rincón, entre cojines, hay relojes por todas partes. Ninguno marca la misma hora.',
			descs: [
				{ cond: FIN, text: 'La sala enorme y redonda de la cabina, más silenciosa que antes. La consola de mandos está apagada salvo una luz verde, fija. La tetera está fría.\n\nEn el rincón de los cojines duerme algo pequeño, hecho un ovillo, rodeado de relojes. Ahora todos marcan la misma hora. Y respiran con él.' },
			],
			mapNote: 'Más grande por dentro · la consola · el rincón de los relojes',
			onEnter: [{ script: 'b06_cabina_entra', cond: '!flag.b06_cabina_dentro', once: true }],
			spots: [
				{ label: 'La consola de mandos', sub: 'Palancas, relojes y una placa que no encaja', icon: '🎛️', cond: '!flag.b06_cabina_rumbo', new: 'true', talk: [{ script: 'b06_consola' }] },
				{ label: 'El rincón de los relojes', sub: '{riolu} no le quita ojo', icon: '🕰️', cond: LUC + ' && !flag.b06_sueno_aura3', new: 'true', talk: [{ script: 'b06_sueno_aura3' }] },
				{ label: 'El rincón de los relojes', sub: 'Algo pequeño duerme entre cojines', icon: '🕰️', cond: '!(' + LUC + ') || flag.b06_sueno_aura3', talk: [{ script: 'b06_rincon' }] },
				{ label: 'Ulises', sub: 'Pelea con una palanca que no quiere bajar', icon: '🧣', cond: '!flag.b06_dialga_calmado', talk: [{ script: 'b06_ulises_cabina' }] },
				{ label: 'Rotom', sub: 'La pantalla dice «SIN SEÑAL»', icon: '📟', cond: 'flag.b06_cabina_dentro && !flag.b06_dialga_calmado', talk: [{ script: 'b06_rotom_cabina' }] },
				{ label: 'Salir al valle', sub: 'La puerta del fondo da a otro sitio', icon: '🌿', cond: 'flag.b06_cabina_rumbo', new: 'flag.b06_cabina_rumbo && !flag.b06_valle', action: { go: 'valle_antano' } },
				{ label: 'Volver al museo', sub: 'La puerta por la que entraste', icon: '🚪', action: { go: 'patio_museo' } },
			],
		},

		// =================== VALLE DE ANTAÑO ===================
		valle_antano: {
			name: 'Valle de Antaño', short: 'Valle de Antaño', region: 'teselia', kind: 'area', parent: 'cabina_ulises',
			bg: { type: 'forest', ground: '#4a6a2a', far: '#c4a46a', fog: true },
			desc: 'Un valle verde y dorado, encajado entre paredes de roca roja. **Helechos** más altos que una casa, árboles de corteza escamosa, un cielo amarillo pálido sin un solo avión. El aire huele a resina y a tormenta.\n\nAl fondo, un **lago** quieto. A un lado, una pared que brilla como miel: **ámbar**. Arriba del todo, en un risco, un **nido** enorme. Y en el cielo, en círculo, una bandada de Aerodactyl.',
			descs: [
				{ cond: 'flag.b06_dialga_calmado', text: 'El valle de los helechos gigantes, verde y dorado, bajo un cielo amarillo pálido. Las sombras van ahora hacia donde tienen que ir. El lago está quieto.\n\nArriba, en el risco, el **nido** de la bandada. Junto a la cabina, un campamento pequeño: la tienda de Petra, una mesa plegable y un cubo en cada esquina.' },
			],
			mapNote: 'Fósiles vivos · el lago · la pared de ámbar · el nido',
			onEnter: [{ script: 'b06_valle_llegada', cond: '!flag.b06_valle', once: true }],
			spots: [
				{ label: 'Petra', sub: 'Sentada en una roca, sin decir nada', icon: '🦴', cond: 'flag.b06_valle && !flag.b06_archen', new: 'true', talk: [{ script: 'b06_archen' }] },
				{ label: 'Petra', sub: 'Mide un helecho con una cinta métrica', icon: '🦴', cond: 'flag.b06_archen', talk: [
					{ cond: FIN + ' && !has("cuadernopetra")', script: 'b06_petra_cuaderno' },
					{ cond: FIN, script: 'b06_petra_valle_despues' },
					{ script: 'b06_petra_valle' },
				] },
				{ label: 'Ulises', sub: 'Mira el cielo con la mano de visera', icon: '🧣', cond: 'flag.b06_valle && !flag.b06_dialga_calmado', talk: [{ script: 'b06_ulises_valle' }] },
				{ label: '🕰️ El tiempo se escapa', sub: 'Algo sale de la cabina. Las sombras se mueven al revés', icon: '🕰️', cond: 'flag.b06_alfa_vencido && !flag.b06_dialga_calmado', new: 'true', talk: [{ script: 'b06_dialga' }] },
				{ label: 'Entre los helechos', sub: 'Algo grande se mueve entre las hojas', icon: '🌿', action: { explore: 'grass' } },
				{ label: 'El lago', sub: 'Agua quieta y conchas enormes', icon: '💧', action: { go: 'lago_antano' } },
				{ label: 'La pared de ámbar', sub: 'Brilla como miel al sol', icon: '🟠', new: '!flag.b06_pared_hecha', action: { go: 'pared_ambar' } },
				{ label: 'El nido', sub: 'En lo alto del risco', icon: '🪺', new: '!flag.b06_alfa_vencido', action: { go: 'nido_antano' } },
				{ label: 'Volver a la cabina', sub: 'La puerta azul, entre dos helechos', icon: '🚪', action: { go: 'cabina_ulises' } },
			],
			rumors: [
				{ text: 'En el Valle de Antaño no hay caminos: hay pisadas. Las de tres dedos van hacia el lago. Las de cuatro, hacia la pared de ámbar. Las que no tienen dedos, mejor no seguirlas.' },
				{ text: 'Los Pokémon del valle no tienen miedo de la gente. No es que sean mansos. Es que no han visto a nadie nunca. Petra dice que es la cosa más bonita y más peligrosa que ha visto.' },
				{ cond: '!flag.b06_dialga_calmado', text: 'A veces, en el valle, la sombra de un helecho se mueve hacia el sol en vez de alejarse. Dura un segundo. Los Pokémon se quedan quietos mientras pasa.' },
			],
			encounters: {
				grass: [
					{ sp: 'archeops', lv: [61, 64], w: 14 },
					{ sp: 'aerodactyl', lv: [61, 64], w: 12 },
					{ sp: 'armaldo', lv: [61, 63], w: 10 },
					{ sp: 'rampardos', lv: [61, 64], w: 10, time: 'day' },
					{ sp: 'bastiodon', lv: [61, 64], w: 10 },
					{ sp: 'yanmega', lv: [61, 63], w: 8 },
					{ sp: 'tangrowth', lv: [61, 63], w: 8 },
					{ sp: 'dunsparce', lv: [61, 62], w: 4 },
					{ sp: 'anorith', lv: [38, 39], w: 3 },
					{ sp: 'shieldon', lv: [28, 29], w: 3 },
					{ sp: 'tirtouga', lv: [35, 36], w: 3 },
					{ sp: 'archen', lv: [35, 36], w: 2 },
				],
			},
		},
		lago_antano: {
			name: 'Lago de Antaño', short: 'El lago', region: 'teselia', kind: 'area', parent: 'valle_antano',
			bg: { type: 'coast', far: '#c4a46a', ground: '#6a7a4a' },
			desc: 'Un lago redondo, quieto como una bandeja, rodeado de colas de caballo gigantes. En la orilla hay conchas espirales del tamaño de una rueda. Algunas están vacías. Otras no.',
			descs: [
				{ cond: '!flag.b06_dialga_calmado', text: 'Un lago redondo rodeado de colas de caballo gigantes. Mientras lo miras, el agua **sube** hasta tus pies… y vuelve a bajar, sin olas, sin viento. Como si respirara. En la orilla, conchas espirales del tamaño de una rueda.' },
			],
			mapNote: 'Pesca · Carracosta, Omastar, Kabutops',
			spots: [
				{ label: 'Pescar en el lago', sub: 'Con la caña de bambú de Petra', icon: '🎣', new: '!flag.rec_b06_lago_antano', action: { gather: 'b06_lago_antano' } },
				{ label: 'Nadar en la orilla', sub: 'Algo con concha se mueve en el fondo', icon: '🐚', action: { explore: 'water' } },
			],
			encounters: {
				water: [
					{ sp: 'carracosta', lv: [61, 64], w: 26 },
					{ sp: 'omastar', lv: [61, 63], w: 22 },
					{ sp: 'kabutops', lv: [61, 63], w: 20 },
					{ sp: 'cradily', lv: [61, 63], w: 12 },
					{ sp: 'relicanth', lv: [62, 64], w: 8 },
					{ sp: 'tirtouga', lv: [35, 36], w: 5 },
					{ sp: 'lileep', lv: [38, 39], w: 4 },
				],
			},
		},
		pared_ambar: {
			name: 'La pared de ámbar', short: 'Pared de ámbar', region: 'teselia', kind: 'area', parent: 'valle_antano',
			bg: { type: 'mountain', far: '#c4a46a', ground: '#a8743a', hill: '#e0a040' },
			desc: 'Una pared de roca roja con vetas de ámbar tan gruesas que, con el sol de cara, parece de miel. Dentro del ámbar se ven cosas: hojas, alas de insecto, una pluma. En la base, un hueco redondo, del tamaño de un puño, recién abierto.',
			descs: [
				{ cond: 'flag.b06_pared_hecha', text: 'La pared de roca roja y vetas de miel. Donde excavaste queda una ventana limpia en el ámbar, y detrás, a un palmo de la superficie, una huella de tres dedos que alguien dejó cuando esto era barro.' },
			],
			mapNote: 'Excavación de la pared',
			spots: [
				{ label: 'Excavar la veta', sub: 'Petra ha marcado un círculo con tiza', icon: '⛏️', cond: '!flag.b06_pared_hecha', new: 'true', talk: [{ script: 'b06_pared' }] },
				{ label: 'El hueco redondo', sub: 'Del tamaño del Ámbar sin registro', icon: '🕳️', talk: [{ script: 'b06_pared_hueco' }] },
			],
		},
		nido_antano: {
			name: 'El nido', short: 'El nido', region: 'teselia', kind: 'area', parent: 'valle_antano',
			bg: { type: 'mountain', far: '#e0c48a', ground: '#8a5a3a', hill: '#a8743a' },
			desc: 'Lo alto del risco: una explanada de roca con un nido de ramas, huesos y plumas del tamaño de una plaza. Desde aquí se ve el valle entero, el lago y, muy pequeña, la cabina azul entre los helechos. El viento no para.',
			descs: [
				{ cond: FIN, text: 'Lo alto del risco y el nido de la bandada. Los Aerodactyl ya no te gritan: te miran pasar y siguen a lo suyo. En una esquina, unos paleontólogos con chaleco y casco han montado un toldo y una mesa con mapas sujetos con piedras.' },
			],
			mapNote: 'El alfa de la bandada · entrenamiento (tope 65)',
			spots: [
				{ label: 'El alfa de la bandada', sub: 'Un Aerodactyl enorme, con una cicatriz en el ala', icon: '🦖', cond: '!flag.b06_alfa_vencido', new: 'true', talk: [{ cond: 'flag.b06_alfa_visto', script: 'b06_alfa_otra' }, { script: 'b06_alfa' }] },
				{ label: 'El alfa de la bandada', sub: 'Te mira desde el borde del nido', icon: '🦖', cond: 'flag.b06_alfa_vencido', talk: [{ script: 'b06_alfa_despues' }] },
				{ label: 'Los alrededores del nido', sub: 'Plumas y huesos entre las rocas', icon: '🪶', action: { explore: 'grass' } },
				{ label: 'La expedición de Encina', sub: 'Entrenamiento (nivel recomendado 65)', icon: '⛺', cond: FIN, new: '!flag.b06_premio_nido', action: { training: {
					cap: 65, prize: { wins: 3, script: 'b06_premio_nido' }, trainers: ['nido_1', 'nido_2', 'nido_3'], npc: 'paleontologa',
					wild: [{ sp: 'archeops', lv: [62, 64] }, { sp: 'aerodactyl', lv: [62, 64] }, { sp: 'rampardos', lv: [62, 64] }, { sp: 'bastiodon', lv: [62, 64] }],
					closed: '«Tu equipo ya tiene más nivel que todo el valle junto. Yo no te dejo pelear con mis becarios así: luego lloran y lo apuntan en el cuaderno de campo».',
				} } },
			],
			encounters: {
				grass: [
					{ sp: 'aerodactyl', lv: [62, 64], w: 30 },
					{ sp: 'archeops', lv: [62, 64], w: 26 },
					{ sp: 'rampardos', lv: [62, 64], w: 16 },
					{ sp: 'bastiodon', lv: [62, 64], w: 14 },
					{ sp: 'yanmega', lv: [61, 63], w: 10 },
					{ sp: 'archen', lv: [35, 36], w: 4 },
				],
			},
		},

		// =================== ISLA LIBERTAD ===================
		isla_libertad: {
			name: 'Isla Libertad', short: 'Isla Libertad', region: 'teselia', kind: 'area', map: { x: 12, y: 90 },
			bg: { type: 'coast', far: '#5a8aa8', ground: '#d8c89a' },
			desc: 'Una isla pequeña al sur, lejos de todo, con una playa de arena blanca, un bosquecillo de palmeras torcidas y, en la punta, un **faro** viejo de ladrillo, sin luz desde hace mucho.\n\nNo hay barcos que vengan aquí. Solo se llega por el aire o nadando, y nadie nada tan lejos.',
			descNight: 'De noche, la Isla Libertad es solo el ruido de las olas y la silueta del faro apagado. A veces, en lo alto del faro, se ve una lucecita naranja, del tamaño de una vela, que se apaga cuando la miras.',
			mapNote: 'El faro apagado · rastreo en la playa · solo por aire o por mar',
			spots: [
				{ label: 'El faro viejo', sub: 'Ladrillo rojo y una puerta sin cerradura', icon: '🗼', talk: [{ cond: '!flag.b06_faro_libertad', script: 'b06_faro_libertad' }, { script: 'b06_faro_despues' }] },
				{ label: 'Rastrear la playa con {riolu}', sub: 'Huele a algo tibio bajo la arena', icon: '🔷', cond: LUC, new: '!flag.rec_b06_libertad_playa', action: { gather: 'b06_libertad_playa' } },
				{ label: 'La playa', sub: 'Algo tibio bajo la arena. Haría falta un buen olfato', icon: '🏖️', cond: '!(' + LUC + ')', talk: [{ script: 'b06_libertad_sin_aura' }] },
				{ label: 'Entre las palmeras', sub: 'Hierba alta y cangrejos', icon: '🌴', action: { explore: 'grass' } },
				{ label: 'Nadar cerca de la orilla', sub: 'Algo transparente flota en el agua', icon: '🌊', action: { explore: 'water' } },
				{ label: 'Marinera con un barco varado', sub: 'Repara un casco a martillazos', icon: '⚓', action: { trainer: 'lib_feliciana' } },
				{ label: 'Volver en Lapras a Esmalte', sub: 'Montura', icon: '🌊', cond: 'flag.mount_lapras', action: { go: 'esmalte' } },
			],
			rumors: [
				{ text: 'Hace muchos años, en la Isla Libertad hubo un hotel. Lo cerraron cuando se apagó el faro. Dicen que el faro se apagó solo, y que antes de apagarse brillaba de un color que no era el de las bombillas.' },
				{ text: 'Los pescadores de Esmalte dicen que, en la Isla Libertad, el que gana un combate en la playa tiene suerte una semana. Los que pierden dicen que es mentira.' },
				{ text: 'Un niño de Esmalte jura que vio en el faro de la Isla Libertad a un Pokémon pequeñito, con orejas en forma de V, comiéndose una magdalena. Nadie le cree. Él sigue dejando magdalenas en el muelle por si acaso.' },
			],
			encounters: {
				grass: [
					{ sp: 'scrafty', lv: [61, 63], w: 18 },
					{ sp: 'crustle', lv: [61, 63], w: 16 },
					{ sp: 'tropius', lv: [61, 63], w: 12 },
					{ sp: 'carnivine', lv: [61, 63], w: 10 },
					{ sp: 'sawk', lv: [61, 63], w: 10 },
					{ sp: 'throh', lv: [61, 63], w: 10 },
					{ sp: 'audino', lv: [60, 62], w: 10 },
					{ sp: 'dunsparce', lv: [60, 62], w: 6 },
				],
				water: [
					{ sp: 'jellicent', lv: [61, 63], w: 26 },
					{ sp: 'alomomola', lv: [61, 63], w: 18 },
					{ sp: 'lumineon', lv: [60, 62], w: 18 },
					{ sp: 'seadra', lv: [60, 62], w: 14 },
					{ sp: 'kingdra', lv: [62, 63], w: 3 },
				],
			},
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Bosque Azulejo -----
		azu_gervasio: { name: 'Gervasio', cls: 'Montañero', ai: 3,
			team: [
				{ sp: 'conkeldurr', lv: 61 },
				{ sp: 'seismitoad', lv: 62 },
			],
			intro: 'Treinta años subiendo montes y la Gira me manda a un bosque llano. Llano. Pues aquí me entreno igual. ¡En guardia!',
			win: 'Bueno. Al menos en el llano me caigo menos.',
			look: { hair: 'short', hairColor: '#6b4a2b', outfit: '#8a5a3a', outfit2: '#c9a66b', skin: 2, eyesStyle: 'normal', mouth: 'grin', acc: 'beard hat', hatColor: '#4a6a3a' } },
		azu_amaranta: { name: 'Amaranta', cls: 'Criadora', ai: 3,
			team: [
				{ sp: 'whimsicott', lv: 61 },
				{ sp: 'whimsicott', lv: 61 },
				{ sp: 'lilligant', lv: 63 },
			],
			intro: 'Shh. Que duermen. Bueno, ya no. Ya los has despertado con las botas. Ahora te aguantas.',
			win: 'Vuelven a dormirse. Míralos. Ni se acuerdan. Ojalá yo.',
			look: { hair: 'curly', hairColor: '#e9e3d0', outfit: '#f2c8d8', outfit2: '#5aa36b', skin: 1, eyesStyle: 'sleepy', mouth: 'smile', acc: 'flower' } },
		azu_remigio: { name: 'Remigio', cls: 'Naturalista', ai: 3,
			team: [
				{ sp: 'leavanny', lv: 62 },
				{ sp: 'scolipede', lv: 62 },
				{ sp: 'yanmega', lv: 63 },
			],
			intro: 'Llevo una semana apuntando que los Leavanny cosen al revés. Primero el nudo, luego la puntada. Como si el tiempo les fuera hacia atrás. ¿Tú lo has visto? ¿No? Pues pelea, que estoy de mal humor.',
			win: 'Lo apunto: «perdí contra alguien que no se fijaba en los Leavanny». Con fecha.',
			look: { hair: 'bald', outfit: '#6a7a4a', outfit2: '#e9e3d0', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses mustache' } },
		azu_leire: { name: 'Leire', cls: 'Guarda forestal', ai: 3,
			team: [
				{ sp: 'liepard', lv: 62 },
				{ sp: 'toxicroak', lv: 63 },
				{ sp: 'zebstrika', lv: 63 },
			],
			intro: 'Te he visto desde arriba hace diez minutos. Has pisado tres flores protegidas. Dos sin querer. La otra me ha parecido que con ganas.',
			win: 'Bueno. Te perdono la tercera flor. Las otras dos, no: esas eran mías.',
			look: { hair: 'ponytail', hairColor: '#3a2a1e', outfit: '#3a6a4a', outfit2: '#c9a66b', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'hat', hatColor: '#3a6a4a' } },

		// ----- Puente Saeta -----
		saeta_celestino: { name: 'Toribio', cls: 'Ciclista', ai: 3,
			team: [
				{ sp: 'unfezant', lv: 62 },
				{ sp: 'zebstrika', lv: 63 },
			],
			intro: '¡El récord del puente es de cuatro minutos! ¡Yo hago cinco! ¡Porque paro a escuchar los cables! ¡Y porque ahora paro a pelear contigo!',
			win: 'Seis minutos. Hoy, seis. El récord se puede quedar donde está.',
			look: { hair: 'cap', hairColor: '#c4743a', outfit: '#f2c84a', outfit2: '#2b2b38', skin: 1, eyesStyle: 'wide', mouth: 'open', capColor: '#c4473a' } },
		saeta_olvido: { name: 'Maruja', cls: 'Pescadora', ai: 3,
			team: [
				{ sp: 'seaking', lv: 62 },
				{ sp: 'basculin', lv: 62 },
				{ sp: 'jellicent', lv: 63 },
			],
			intro: 'Cuarenta años pescando desde este puente. Los peces me conocen. Tú todavía no. Eso se arregla rápido.',
			win: 'Ya te conozco. El pez, en cambio, se me ha escapado.',
			look: { hair: 'braids', hairColor: '#8a8a8a', outfit: '#3a6a8a', outfit2: '#e9c46a', skin: 2, eyesStyle: 'sharp', mouth: 'smile', acc: 'hat', hatColor: '#e9c46a' } },

		// ----- Isla Libertad -----
		lib_feliciana: { name: 'Feliciana', cls: 'Marinera', ai: 3,
			team: [
				{ sp: 'crustle', lv: 62 },
				{ sp: 'alomomola', lv: 62 },
				{ sp: 'scrafty', lv: 64 },
			],
			intro: 'Encallé aquí hace una semana y nadie viene a buscarme. Mejor: nadie me molesta. Bueno, tú sí. Ya que estás, pelea.',
			win: 'Pues ya está. Esta semana tienes tú la suerte de la playa. Yo me quedo con el barco.',
			look: { hair: 'tied', hairColor: '#3a2a1e', outfit: '#e9e3d0', outfit2: '#3a5a9a', skin: 4, eyesStyle: 'narrow', mouth: 'grin', acc: 'bandana scar' } },

		// ----- El nido (expedición de Encina, entrenamiento) -----
		nido_1: { name: 'Prudencia', cls: 'Paleontóloga', npc: 'paleontologa', ai: 3,
			team: [
				{ sp: 'rampardos', lv: 62 },
				{ sp: 'armaldo', lv: 63 },
			],
			intro: '¡Becaria de primer año! ¡Primera expedición! ¡Primer combate en un sitio que no sale en los libros! ¡Lo voy a apuntar todo! ¡Hasta que pierda! ¡Si pierdo!',
			win: '«Perdí». Lo apunto. Con letra bonita, que va al informe.' },
		nido_2: { name: 'Baldomero', cls: 'Paleontólogo', ai: 3,
			team: [
				{ sp: 'bastiodon', lv: 63 },
				{ sp: 'kabutops', lv: 63 },
				{ sp: 'cradily', lv: 63 },
			],
			intro: 'Cuarenta años desenterrando huesos y ahora resulta que los huesos andan. Y muerden. Y comen de mi bocadillo. Déjame desahogarme.',
			win: 'Ya está. Me he desahogado. Ahora vuelvo a medir un fémur que se mueve.',
			look: { hair: 'short', hairColor: '#e9e8e0', outfit: '#c9a66b', outfit2: '#3a4a3a', skin: 2, eyesStyle: 'droopy', mouth: 'flat', acc: 'beard hat', hatColor: '#c9a66b' } },
		nido_3: { name: 'Nuria', cls: 'Paleontóloga', ai: 3,
			team: [
				{ sp: 'carracosta', lv: 63 },
				{ sp: 'omastar', lv: 63 },
				{ sp: 'archeops', lv: 64 },
			],
			intro: 'Mi tesis era que los Archeops no podían volar de verdad. Llevo tres días viéndolos volar. Necesito pegarle a algo. Con respeto.',
			win: 'Tesis nueva: «los Archeops vuelan y yo me equivoco». Me la aprueban seguro.',
			look: { hair: 'bob', hairColor: '#2a2440', outfit: '#c9a66b', outfit2: '#3a6a4a', skin: 3, eyesStyle: 'sharp', mouth: 'grin', acc: 'goggles' } },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LLEGADA A ESMALTE ===================
		b06_esmalte_llegada: [
			{ set: { 'flag.b06_esmalte_llegada': true } },
			{ text: 'El Puente Saeta deja de cantar a tu espalda y empiezan los ladrillos. **Ciudad Esmalte**: almacenes viejos con las persianas a medio subir, olor a barniz y a café, caballetes en las aceras y un gato dormido encima de cada uno.' },
			{ text: 'En lo alto de la calle, la cúpula de cristal del **Museo**. En su fachada, un reloj enorme con las agujas paradas en las doce menos diez.' },
			{ if: AMBAR, then: [
				{ text: 'En el bolsillo, el **Ámbar sin registro** se ha puesto caliente. No tibio, como siempre: caliente. Late deprisa, a trompicones, como un corazón que ha subido una escalera corriendo.' },
				{ text: '{riolu} se para en seco y mira hacia el Museo, con las orejas hacia delante.', cond: LUC },
			] },
			{ say: 'vecino_teselia', as: 'Un pintor con la cara manchada de azul', text: '¿De la Gira? Pues si vas al Museo, date prisa. Hay una chica dentro de una vitrina. Se ha caído. Dentro. De una vitrina cerrada. Nadie sabe cómo. La profesora está buscando la llave y un Diggersby está aporreando el cristal.' },
			{ say: 'vecino_teselia', as: 'Un pintor con la cara manchada de azul', text: 'Yo he venido a pintarlo. No todos los días pasa algo en Esmalte.' },
			{ quest: 'b06_t_petra', stage: 'museo' },
		],
		b06_esmalte_talleres: [
			{ if: '!' + FIN, then: [
				{ text: 'En un taller de cerámica, un alfarero da forma a una taza con el asa al revés. Te mira. No deja de girar el torno.' },
				{ say: 'vecino_teselia', as: 'El alfarero', text: 'Desde hace un mes, el barro se me seca antes de mojarlo. Es la única forma que tengo de decirlo. Antes de mojarlo. —Pausa—. Y el horno se enfría cuando lo enciendo. Te lo cuento porque tienes cara de no reírte.' },
			], else: [
				{ text: 'El alfarero de las tazas con el asa al revés te saluda con la barbilla sin soltar el barro.' },
				{ say: 'vecino_teselia', as: 'El alfarero', text: 'El barro vuelve a secarse cuando le toca. El horno, a calentarse. Y el reloj del Museo da las horas. Ronco, pero las da. —Te tiende una taza recién hecha, con el asa al revés—. No te la regalo. Te la presto. Para siempre.' },
			] },
		],

		// =================== MUSEO: PETRA, ENCINA Y EL RELOJ ===================
		b06_museo: [
			{ set: { 'flag.b06_petra_museo': true } },
			{ text: 'El vestíbulo del Museo, altísimo, bajo la cúpula de cristal. Del techo cuelga el esqueleto de un Archeops con las alas abiertas. Y debajo, en medio de la sala, hay jaleo.' },
			{ text: 'Un **Diggersby** golpea una vitrina con las orejas, muy educado: toc, toc, toc. Dentro de la vitrina, entre ámbares y conchas, hecha un ovillo y con las gafas de protección torcidas, hay una mujer de coleta naranja. Saluda con la mano. Desde dentro.' },
			{ say: 'petra', text: '¡{jugador}! ¡Hola! ¡No me mires así! ¡Esto tiene explicación científica! —Pausa—. Bueno, tiene explicación. Científica, no mucho.' },
			{ say: 'encina', text: '¡Aquí está, aquí está! —Una mujer de bata blanca baja corriendo una escalera con un manojo de llaves enorme—. ¡{jugador}! ¡Qué alegría verte por aquí! Sujétame esto. No, esto no. Esto. ¡Fascinante, esto de que la gente se meta en mis vitrinas!' },
			{ text: 'La Prof. Encina prueba once llaves. La duodécima abre. Petra sale de la vitrina a gatas, con un trozo de ámbar apretado contra el pecho, y se pone de pie. No se cae. Se queda tan sorprendida que se cae.' },
			{ say: 'petra', text: '…Ya estoy. Gracias, Pala. —Pala le devuelve las gafas—. Seguía a un primo. Un primo de mi ámbar. Lo sentía desde la puerta. Y la vitrina estaba abierta. Y luego, de repente, no. ¿Las vitrinas se cierran solas en Teselia?' },
			{ say: 'encina', text: 'No. —Se ajusta la bata—. Pero desde hace un mes, en este museo pasan cosas que no pasan. Lo apunto todo. Mira. —Te enseña una libreta llena de horas tachadas—. Y la más rara es esa.' },
			{ text: 'Señala el fondo de la sala: un **reloj de pie** altísimo, de madera oscura, con un péndulo de latón grande como un plato.' },
			{ say: 'encina', text: 'Ese reloj lleva parado cincuenta años. Pues ahora anda. Anda solo, unos minutos al día. Y se para de golpe, cada vez que entra alguien. Siempre la misma clase de alguien. Alguien de la Gira, que ha cruzado una Puerta.' },
			{ if: AMBAR, then: [
				{ text: 'Y entonces lo notas. En el bolsillo, el Ámbar sin registro da un latido. Uno solo, tan fuerte que lo oyes.' },
				{ text: 'Al fondo de la sala, el péndulo del reloj se mueve. Solo. Una vez hacia la izquierda, una vez hacia la derecha. **A tu ritmo.** Al ritmo del ámbar. Y se para.' },
				{ say: 'petra', text: '…' },
				{ say: 'petra', text: 'Sácalo. Por favor. Sácalo despacio.' },
				{ text: 'Lo sacas. El ámbar brilla azul, por dentro, como nunca lo habías visto. Petra acerca el primo, el de la vitrina: un ámbar normal, dorado, quieto. Al lado del tuyo, se apaga del todo.' },
				{ say: 'petra', text: 'No es primo. No es nada. Es solo ámbar. —Se ríe sin ganas—. El que late es el tuyo. El primo latía porque estaba cerca del reloj. Y el reloj late porque está cerca de ti.' },
			], else: [
				{ text: 'Petra abre las manos. El trozo de ámbar que sacó de la vitrina brilla azul por dentro, muy débil, como una brasa.' },
				{ text: 'Al fondo de la sala, el péndulo del reloj se mueve. Solo. Una vez hacia la izquierda, una vez hacia la derecha. Al ritmo del ámbar. Y se para.' },
				{ say: 'petra', text: '…Es como el mío. El que perdí. Late igual. A destiempo. —Lo aprieta—. Este no lo suelto. Esta vez no.' },
			] },
			{ say: 'encina', text: '¡Fascinante! —Lo dice muy bajito, que en ella es raro—. Llevo un mes buscando la causa en el reloj. Y la causa entra por la puerta en un bolsillo.' },
			// ----- Mayla tasa el ámbar (llamada) -----
			{ say: 'petra', text: 'Necesito una segunda opinión. De alguien que no sea paleontóloga. De alguien que sepa de piedras bonitas. ¿Conoces a alguien así? ¿Que no tenga miedo de decirte que algo es feo?' },
			{ prompt: 'Alguien que tase una piedra sin piedad…', choice: [
				{ text: 'Llamar a Mayla, la joyera de Konikoni.', then: [
					{ text: 'Marcas. Al tercer tono, la pantalla se llena con una cara seria, unas gafas de lupa en la frente y un platito de terciopelo.' },
					{ say: 'mayla', as: 'Mayla (llamada)', text: 'Joyería de Konikoni. Cierro a las seis. Son las seis menos cuarto. Rápido.' },
					{ say: 'petra', text: '¡Hola! Petra Brossard, paleontóloga. ¿Me tasa esto? —Lo pone tan cerca de la pantalla que solo se ve naranja.' },
					{ say: 'mayla', as: 'Mayla (llamada)', text: '…Más lejos. —Petra lo aleja—. Ámbar. Color: miel oscura. Inclusión: una pluma. Corte: ninguno, gracias a nadie. Y ese brillo azul de dentro…' },
					{ say: 'mayla', as: 'Mayla (llamada)', text: 'Eso no es una inclusión. Eso es un problema. —Pausa—. No lo vendas. No lo pulas. No lo lleves al cuello. Y no me lo enseñes más, que me ha cambiado la hora del reloj de la tienda. Adiós.' },
					{ text: 'Cuelga. Petra se queda mirando la pantalla negra.' },
					{ say: 'petra', text: 'Me encanta. Me ha encantado. Quiero que me tase todo lo que tengo. Hasta a Pala.' },
				] },
				{ text: '«No hace falta. Yo te lo digo: es raro.»', then: [
					{ say: 'petra', text: '«Raro». —Lo apunta—. Primera tasación profesional: raro. Es más de lo que me dijo la máquina de Lazare.' },
				] },
			] },
			// ----- La cabina aterriza -----
			{ text: 'Y entonces se oye. Desde el patio de detrás del Museo, a través de las ventanas: un ruido como de **acordeón respirando hondo**, una vez, dos, tres, cada vez más fuerte.' },
			{ cutscene: { time: 'dia', weather: 'leaves', bg: { type: 'town', ground: '#6a8a4a', far: '#7fa4c4' }, start: 'light', frames: [
				{ cam: 'still', text: 'El patio del Museo. Setos recortados, un banco de hierro, una fuente seca. Nada. Las hojas dan vueltas en el aire sin que sople el viento.' },
				{ fx: ['ripple', 'shake'], shake: 1, cam: 'push', text: 'El aire de en medio se arruga como una sábana. El ruido de acordeón sube, sube… y en la hierba aparece, a trompicones, una **cabina de madera azul**, con su farolillo encendido.' },
				{ actors: [{ id: 'viajero', at: 'left', enter: 'left' }], cam: 'pull', text: 'La puerta se abre de golpe. Sale un hombre de rizos castaños y abrigo granate, tosiendo humo, con una bufanda de rayas que sigue saliendo de la cabina cuando él ya está en el banco.' },
				{ actors: [{ key: 'viajero', do: 'turn', emote: '!' }], cam: 'still', text: 'Mira las ventanas del Museo. Te ve. Se le pone la sonrisa más grande que has visto en una cara.' },
			] } },
			{ say: 'viajero', text: '¡{jugador}! ¡AHÍ ESTÁS! ¡Te dije que no me dejaras irme sin ti! ¡Y no me has dejado! ¡Bueno, todavía no me he ido! ¡Ven! ¡Ven al patio! ¡Y trae eso que late!' },
			{ set: { 'flag.b06_cabina_patio': true } },
			{ quest: 'b06_m3', stage: 'cabina' },
			{ quest: 'b06_t_ulises', stage: 'cabina' },
			{ diary: '¡Hoy mi entrenador{|a|e} y yo cruzamos un bosque donde la luz es azul, como si alguien hubiera pintado el suelo con agua! Después, un puente que canta. De verdad: sopla el viento y hace «uuuuuh». Yo le contesté con un pitido. Creo que nos entendimos.\n\nEn Ciudad Esmalte hay un museo enorme con un esqueleto de Archeops colgado del techo. Y una amiga dentro de una vitrina. Dentro. La Prof. Encina tuvo que probar doce llaves.\n\nLuego sonó un acordeón en el patio. Ahora vamos a ver qué es. ¡Qué día tan raro y tan bonito!', cond: 'flag.b01_diario' },
		],
		b06_encina_charla: [
			{ if: '!' + PEND, then: [
				{ say: 'encina', text: 'Yo estudio los orígenes. De dónde viene cada Pokémon, quién fue el primero, por qué es como es. Y ahora mismo tengo un reloj que parece querer contarme de dónde viene el tiempo. ¡Fascinante! Y un poco aterrador.' },
				{ say: 'encina', text: 'Ve al patio. Ese señor de la bufanda te espera a ti, no a mí. Aunque luego me lo presentas. Tengo veinte preguntas. Treinta.' },
			], else: [
				{ say: 'encina', text: 'He visto entrar a ese señor en su cabina, y la cabina no es más ancha que una puerta. Y he oído un eco dentro. Un eco grande. De catedral. —Se frota los ojos—. Me lo vas a explicar algún día. Hoy no, que no duermo.' },
			] },
		],
		b06_encina_despues: [
			{ say: 'encina', text: '¡{jugador}! Mira el reloj: va. Va solo, va bien y va despacio. Lo he puesto en hora y no se ha movido ni un segundo en tres días. —Lo dice con lágrimas en los ojos, cosa que no esperabas—. Cincuenta años. Perdona. Es que me gustan mucho los relojes.' },
			{ say: 'encina', text: 'Petra me ha contado lo del valle. No me lo creo. Me lo creo entero. He mandado a tres de mis becarios con ella, al nido. Si vas, sé buen{o|a|e} con ellos: es su primera expedición a un sitio que no existe.' },
		],
		b06_reloj: [
			{ text: 'El reloj de pie, más alto que dos personas. En la esfera, unos números romanos gastados y un letrero de latón: «Donado por la familia Arbós. Este reloj **no** se para». Debajo, alguien ha añadido a lápiz: «se paró en 1974».' },
			{ text: 'El péndulo de latón cuelga quieto. En el centro tiene un hueco redondo, vacío, como si un día hubiera llevado una piedra.' },
		],
		b06_reloj_despues: [
			{ text: 'El reloj de pie va y viene, tic, tac, sin prisa. El péndulo de latón es nuevo: la Prof. Encina hizo fundir uno igual que el viejo, sin piedra en el centro. Suena un poco más agudo. Dice que se acostumbrará.' },
			{ text: 'Si te acercas con el Péndulo de ámbar en el bolsillo, el reloj no se para. Pero da un tic un poco más fuerte. Como quien saluda.', cond: 'has("penduloambar")' },
		],

		// =================== SNIVY ===================
		b06_snivy: [
			{ if: '!flag.b06_snivy_visto', then: [
				{ set: { 'flag.b06_snivy_visto': true } },
				{ text: 'Encima de una vitrina de huesos, con los brazos cruzados (o lo que hace un Snivy cuando cruza los brazos), un **Snivy** te mira de arriba abajo. Despacio. Como quien tasa unos zapatos. Luego mira a otro lado.' },
				{ say: 'encina', text: 'Ah, ese es mío. Bueno, «mío». Vino conmigo de Arcilla para la Gira. Mira a todo el mundo así. A mí también. —Suspira—. A todos menos a los fósiles. A los fósiles los mira como si fueran de la familia.' },
			] },
			{ prompt: 'El Snivy te ignora con mucha intensidad. ¿Qué haces?', choice: [
				{ text: 'Ignorarlo tú también y ponerte a mirar los fósiles de la vitrina.', then: [
					{ text: 'Te agachas delante de la vitrina. Dentro hay una huella de tres dedos en piedra, un diente del tamaño de un plátano y una pluma convertida en roca. Te quedas mirándola un buen rato.' },
					{ text: 'Al rato notas algo en el hombro. El Snivy ha bajado de la vitrina, se ha subido a tu espalda y mira la pluma de piedra contigo, muy serio, con la barbilla apoyada en tu cabeza.' },
					{ call: 'b06_snivy_eleccion' },
				] },
				{ cond: LUC, text: 'Dejar que {riolu} se encargue.', then: [
					{ text: '{riolu} se pone delante del Snivy, a la misma altura, y le devuelve la mirada. Exactamente la misma mirada: de arriba abajo, despacio, con desdén.' },
					{ text: 'Se miran así un rato largo. Luego el Snivy resopla por la nariz. {riolu} también. Y los dos, a la vez, se giran hacia la vitrina de los fósiles. El Snivy se te sube al hombro sin pedir permiso.' },
					{ happy: { who: 'riolu', n: 3 } },
					{ call: 'b06_snivy_eleccion' },
				] },
				{ text: 'Saludarlo con mucha educación.', then: [
					{ text: 'Le haces una reverencia. El Snivy te mira la reverencia. Te mira la cara. Se da la vuelta y te enseña la cola.' },
					{ say: 'encina', text: 'Ya te lo dije. —Se ríe—. Prueba a mirar lo que mira él. A veces funciona.' },
				] },
			] },
		],
		b06_snivy_eleccion: [
			{ if: SNIVY_LINEA, then: [
				{ set: { 'flag.b06_snivy': true, 'flag.b06_snivy_vive': true } },
				{ say: 'encina', text: '¡Fascinante! No se sube encima de nadie. —Te mira el equipo—. Ah, pero tú ya tienes uno de su familia, ¿verdad? Lo huele. Entonces que se quede aquí, de guardia en la sala de los fósiles. Es lo que más le gusta. Ven a verlo cuando quieras: te dejará mirar con él.' },
				{ text: 'El Snivy baja de tu hombro, vuelve a su vitrina y se cruza de brazos. Esta vez, cuando te mira, no aparta la vista.' },
			], else: [
				{ say: 'encina', text: '¡Fascinante! No se sube encima de nadie. Ni de mí. —Se pone las manos en la cintura—. Pues ya está. Ha elegido. En Teselia los iniciales eligen con quién se van, y este lleva un mes eligiendo a nadie. Llévatelo. Que vea fósiles por el mundo.' },
				{ set: { 'flag.b06_snivy': true } },
				{ pokemon: { sp: 'snivy', lv: 16, gender: 'M', nature: 'timid', ability: 'overgrow', happy: 160, moves: ['magicalleaf', 'vinewhip', 'wrap', 'growth'], ivs: { hp: 26, atk: 20, def: 24, spa: 30, spd: 26, spe: 31 } } },
				{ say: 'encina', text: 'Dale fruta, no pienso. Y si te mira mal, es que te quiere. Si te mira bien, preocúpate: algo trama.' },
			] },
			{ quest: 'b06_s_iniciales', stage: 'buscar', cond: '!quest.b06_s_iniciales' },
			{ quest: 'b06_s_iniciales', stage: 'hecha', done: true, cond: 'flag.b06_oshawott && flag.b06_tepig && flag.b06_snivy' },
		],
		b06_snivy_visita: [
			{ text: 'El Snivy de la Prof. Encina vigila la sala de los fósiles desde lo alto de una vitrina, con los brazos cruzados. Te ve. Baja, se queda a tu lado mirando la pluma de piedra un rato y vuelve a subir. Eso, en un Snivy, es una conversación larga.' },
		],

		// =================== EL PATIO: ULISES Y EL PÉNDULO ===================
		b06_ulises_patio: [
			{ text: 'Ulises da golpecitos en el costado de la cabina, como quien le palmea el cuello a un caballo cansado. Petra está a su lado con Pala, mirando la cabina con la boca abierta.' },
			{ say: 'viajero', text: '¿Qué día es? No me lo digas. Martes. —Se para—. No es martes. Aquí nunca es martes, por eso he venido. Bueno, no. He venido por eso.' },
			{ text: 'Señala tu bolsillo.', cond: AMBAR },
			{ text: 'Señala las manos de Petra.', cond: '!' + AMBAR },
			{ say: 'viajero', text: '¿Me dejas? —Lo toma con dos dedos, a contraluz. Ya no sonríe. Se le ha quedado la cara que ponía en las cuevas, la de las frases serias—. Es suyo. Es un *tic*.' },
			{ say: 'petra', text: '¿Un qué?' },
			{ say: 'viajero', text: 'Un tic. Del tictac. —Lo hace sonar contra la uña: tic—. Al pequeñito se le cayó cuando se asustó, hace muchísimo. O dentro de muchísimo. Se le cayó un trocito del latido y fue a parar a una época donde había resina. Y la resina lo envolvió. Y aquí está.' },
			{ say: 'petra', text: '«Menos tres años». —Se le escapa en voz alta—. La máquina de Lazare dijo «menos tres años». No es que sea joven. Es que es de alguien joven. Muy joven.' },
			{ say: 'viajero', text: '¡Exacto! ¡Qué lista eres! Siempre lo fuiste. Lo serás. —Le devuelve el ámbar con mucho cuidado—. Te presento al pequeñito.' },
			{ text: 'Abre la puerta de la cabina un palmo. Dentro está oscuro y, sin embargo, hay luz azul. Y un ruido: un tictac pequeño, irregular, como el de un reloj que ha tenido una pesadilla.' },
			{ say: 'viajero', text: 'Es un **Dialga**. Uno joven, muy joven. Los Dialga son el tiempo, o el tiempo es de ellos, nunca me acuerdo. Este se escapó de su sitio hace mucho, y desde entonces voy detrás de él, recogiéndole los sustos.' },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca a la rendija de la puerta. No gruñe. Se queda muy quieto, con la palma en la madera, como quien escucha a alguien llorar al otro lado de una pared.' },
			] },
			{ say: 'viajero', text: 'Estaba mejor, ¿sabes? Desde lo de la cueva de Kanto dormía tranquilo. Pero en esta región alguien está tirando del tiempo. Desde lo alto de una torre muy vieja, al norte. Tira como de un mantel, despacio, para que no se caigan los platos. Y el pequeñito lo nota, y se despierta, y se asusta.' },
			{ say: 'viajero', text: 'Y cuando se asusta, el tiempo se le escapa. Los relojes se paran. El barro se seca antes de mojarlo. Las vitrinas se cierran antes de que entre nadie.' },
			{ say: 'petra', text: '…Eso explica lo de la vitrina. —Pausa—. No explica nada. Me encanta.' },
			{ say: 'viajero', text: 'Necesita volver al sitio donde se le cayó el tic. Ver que allí está todo bien. Que no pasa nada. Y para encontrar ese sitio necesito una brújula. Una que apunte a un *cuándo*, no a un *dónde*.' },
			{ text: 'Petra mira el ámbar. Mira el Museo. Mira el ámbar otra vez.' },
			{ say: 'petra', text: 'El reloj. El del vestíbulo. El péndulo tiene un hueco redondo en el centro. Vacío. Del tamaño de… —Se queda callada. Cuando Petra se calla, es que algo le importa mucho—. Ahora vuelvo.' },
			{ text: 'Vuelve a los diez minutos, con la Prof. Encina detrás y, en brazos, como quien lleva a un bebé, el **péndulo de latón** del reloj viejo. Encina lleva una caja de herramientas y cara de no haber pedido permiso a nadie.' },
			{ say: 'encina', text: 'El reloj es del Museo. El Museo soy yo esta semana. Y si esto sirve para que deje de pararse, lo firmo. ¡Fascinante! Con cuidado, Petra. Con muchísimo cuidado.' },
			{ cutscene: { time: 'tarde', bg: { type: 'town', ground: '#6a8a4a', far: '#c4a46a' }, start: 'light', frames: [
				{ actors: [{ id: 'petra', at: 'left', enter: 'left' }, { id: 'viajero', at: 'right', enter: 'right' }], on: '_c', item: 'ambarsinregistro', cam: 'push', text: 'El banco de hierro del patio. Petra se arrodilla con el péndulo en el regazo y el ámbar en la mano. Por una vez en su vida, no le tiembla nada.' },
				{ actors: [{ key: 'petra', do: 'nod' }], on: '_c', fx: 'sparkle', cam: 'still', text: 'Lo encaja en el hueco del centro. Entra justo. Hace *clic*. Como si el péndulo lo hubiera estado esperando cincuenta años. O desde antes de que lo hicieran.' },
				{ cond: 'has("tarjetaviajero")', actors: [{ key: 'viajero', do: 'step' }], on: '_c', text: 'Ulises te pide algo con la mano. Tu tarjeta. La que te dio hace tanto. La ata al hilo del péndulo con un nudo de marinero. «La dirección. Para que sepa volver».' },
				{ cond: '!has("tarjetaviajero")', actors: [{ key: 'viajero', do: 'step' }], on: '_c', text: 'Ulises saca una tarjeta azul del bolsillo, escribe algo con prisa y la ata al hilo del péndulo con un nudo de marinero. «La dirección. Para que sepa volver».' },
				{ item: 'penduloambar', on: '_c', fx: ['flash', 'glow'], color: '#6fc0ff', text: 'El péndulo se mueve solo en las manos de Petra. Izquierda, derecha. Despacio. El brillo azul late dentro del ámbar **a compás**, por primera vez desde que lo conoces.' },
				{ actors: [{ key: 'petra', dim: true }, { key: 'viajero', dim: true }], on: '_c', cam: 'pull', fx: 'light', text: 'Petra te lo pone en las manos. Está tibio. Pesa más de lo que parece. Y apunta, con todo su peso, hacia la puerta de la cabina.' },
			] } },
			{ take: 'ambarsinregistro', cond: AMBAR, silent: true },
			{ take: 'tarjetaviajero', cond: 'has("tarjetaviajero")', silent: true },
			{ give: 'penduloambar' },
			{ set: { 'flag.b06_pendulo': true } },
			{ say: 'petra', text: 'Péndulo de ámbar. —Lo dice como quien bautiza un fósil—. Lo apunto así. No. Lo apunto luego. Ahora quiero ver adónde apunta.' },
			{ say: 'viajero', text: '¡Pues adentro! ¡Los dos! ¡Los tres! ¡Los que sean! —Abre la puerta de par en par—. Y profesora: si tardamos, no se preocupe. Si tardamos mucho, preocúpese un poco.' },
			{ say: 'encina', text: 'Yo me quedo con el reloj sin péndulo. Es como quedarse con una casa sin perro. —Los mira—. Vuelvan.' },
		],
		b06_banco_patio: [
			{ text: 'En el respaldo del banco de hierro alguien ha dejado doblada, con mucho cuidado, una bufanda de rayas larguísima. Tiene una nota prendida con un imperdible: «No es para ti. Es para cuando vuelva. Pero puedes ponértela si hace frío. U.».' },
			{ text: 'No hace frío. Te la pones un rato igual. Huele a té y a tormenta.' },
		],

		// =================== DENTRO DE LA CABINA ===================
		b06_cabina_entra: [
			{ set: { 'flag.b06_cabina_dentro': true } },
			{ text: 'Cruzas la puerta.' },
			{ text: 'Y te quedas quiet{o|a|e} en el umbral, porque no tiene sentido. Por fuera la cabina es del tamaño de un armario. Por dentro es **una sala enorme**, redonda, con el techo tan alto que se pierde en la penumbra, galerías de madera llenas de libros, alfombras, una tetera encima de un motor y, en el centro, una consola de latón llena de palancas y relojes.' },
			{ say: 'petra', text: '…' },
			{ say: 'petra', text: 'Es más grande por dentro.' },
			{ say: 'viajero', text: '¡Todo el mundo dice eso! ¡Todo el mundo! ¡Y siempre con esa cara! —Se le ve encantado—. Pasen, pasen. No toquen la tetera, que está enfadada.' },
			{ text: 'La Pokédex vibra en tu mano. En la pantalla, en letras grises: **SIN SEÑAL**. Y luego, más pequeño: *sincronización: no disponible*.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Uy! ¡Qué grande! ¡Más grande que la Pokédex! Bueno, todo es más grande que la Pokédex. ¡Pero esto mucho!' },
			{ text: 'Algo en su voz es distinto. No sabrías decir qué. Habla más deprisa. Más corto. Se ríe de sus propios chistes antes de terminarlos.' },
			{ prompt: 'Rotom da vueltas por la sala, pitando a los libros.', choice: [
				{ text: '«Rotom, ¿apuntas esto en el Diario?»', then: [
					{ say: 'rotom', text: '¿Diario? —Se para en el aire—. Yo no escribo diarios. Bzzt. ¿Escribo diarios? —Se lo piensa, muy serio—. Bueno… me acuerdo de leerlos. No me acuerdo de escribirlos.' },
					{ say: 'rotom', text: '¡Da igual! ¡Mira, una escalera de caracol! ¡Yo bajo por las escaleras de caracol dando vueltas! ¡Mira! ¡Bzzzzzzt!' },
				] },
				{ text: '«Hoy no hace falta que apuntes nada.»', then: [
					{ say: 'rotom', text: '¿Apuntar? ¿En un diario? —Se para en el aire—. Yo no escribo diarios. Bzzt. ¿Escribo diarios? —Se lo piensa, muy serio—. Bueno… me acuerdo de leerlos. No me acuerdo de escribirlos.' },
					{ say: 'rotom', text: '¡Da igual! ¡Mira, una escalera de caracol! ¡Yo bajo por las escaleras de caracol dando vueltas! ¡Mira! ¡Bzzzzzzt!' },
				] },
			] },
			{ if: LUC, then: [
				{ text: '{riolu} mira a Rotom dar vueltas por la escalera. Desde que cruzaron la Puerta de Teselia, cada vez que miraba la Pokédex arrugaba el hocico. Ahora no. Se acerca, le pone la palma encima a la pantalla, con mucho cuidado, y se queda así un momento.' },
				{ text: 'Rotom se deja. Hace un ruidito que no le habías oído nunca. Como un ronroneo con estática.' },
			] },
			{ text: 'Ulises lo mira todo desde la consola, con la mano en una palanca. Por un momento no sonríe.' },
			{ say: 'viajero', text: 'Aquí dentro cada uno es solo lo que es. Las cosas que se te pegan por el camino se quedan en la puerta, como el barro de las botas.' },
			{ say: 'viajero', text: '…Eso no lo he dicho. ¡La consola! ¡Hay que poner rumbo! ¡Y la palanca de rumbo lleva atascada desde la Edad del Bronce!' },
		],
		b06_rotom_cabina: [
			{ say: 'rotom', text: '¡Bzzt! ¡Hola! ¡Estoy aquí! ¡Siempre estoy aquí! ¿Sabes que aquí no hay señal? Es raro. Me noto… ligero. Como cuando te quitas una mochila que no sabías que llevabas.' },
			{ say: 'rotom', text: '¿Qué mochila? No sé. Bzzt. ¡Mira, un libro que se abre solo! ¡Hola, libro!' },
		],
		b06_ulises_cabina: [
			{ if: '!flag.b06_cabina_rumbo', then: [
				{ say: 'viajero', text: 'La consola. —Le da una patada cariñosa—. Para poner rumbo hay que bajar las dos palancas de cuándo a la vez y la compuerta del rumbo se abre. Las palancas pesan como rocas. Bueno, son rocas. Las cambié por las de metal hace siglos. Fue mala idea.' },
				{ say: 'viajero', text: 'Tú tienes buenos reflejos. Petra me lo ha dicho. Petra me lo dirá. Prueba tú, que yo empujo siempre hacia el lado equivocado.' },
			], else: [
				{ say: 'viajero', text: '¡Rumbo puesto! ¡El péndulo apunta y la cabina obedece! La puerta del fondo da al sitio donde se le cayó el tic. —Pausa—. A la época. No al sitio. Bueno, a las dos cosas. Sal, sal.' },
			] },
		],
		b06_consola: [
			{ if: '!flag.b06_consola_vista', then: [
				{ set: { 'flag.b06_consola_vista': true } },
				{ text: 'La consola de mandos, de cerca: relojes, teclas de máquina de escribir y, en el centro, una placa de latón con una rejilla grabada. En la rejilla hay dos piedras redondas, dos huecos marcados con una flecha y una compuerta.' },
				{ text: 'Cuelgas el Péndulo de ámbar del gancho de encima. Se queda quieto, apuntando a la compuerta.' },
			] },
			{ puzzle: {
				id: 'b06_cabina_consola',
				title: 'La consola de mandos',
				hint: 'Las dos piedras sobre las dos placas abren la compuerta del rumbo. Empujar es fácil; volver atrás, no.',
				theme: 'lab',
				grid: [
					'########',
					'#P..#..#',
					'#.R.#..#',
					'#..S#R.#',
					'##.#.S.#',
					'#......#',
					'###D####',
					'###G####',
				],
			},
				onSolve: [
					{ set: { 'flag.b06_cabina_rumbo': true } },
					{ text: 'La segunda piedra cae en su placa con un *clonc*. La compuerta de la rejilla se abre. En toda la sala, los relojes dan la misma hora a la vez, una sola vez. Luego vuelven a lo suyo.' },
					{ text: 'El Péndulo de ámbar se mueve solo en su gancho. Izquierda, derecha. La cabina entera se inclina un poco, como un barco que gira, y se oye fuera el acordeón respirar hondo.' },
					{ say: 'viajero', text: '¡LO TENEMOS! ¡Ni yo lo hubiera hecho mejor! ¡Bueno, sí, pero tardando tres siglos! —Señala una puerta al fondo de la sala que antes no estaba—. Por ahí. Cuando quieras.' },
					{ quest: 'b06_m3', stage: 'valle' },
				],
				onQuit: [{ say: 'viajero', text: 'Tranquil{o|a|e}. La consola no tiene prisa. Bueno, sí tiene. Pero se aguanta.' }] },
		],
		b06_sueno_aura3: [
			{ set: { 'flag.b06_sueno_aura3': true } },
			{ text: 'En el rincón de los cojines, entre relojes que marcan horas distintas, hay algo pequeño hecho un ovillo. Azul oscuro, con brillos de metal. Duerme mal: se agita, suspira, y a cada suspiro los relojes de alrededor se adelantan o se atrasan un poco.' },
			{ text: '{riolu} se sienta a su lado, en el suelo, sin tocarlo. Cierra los ojos. El aura se le enciende despacio, como una lámpara que alguien sube poco a poco.' },
			{ text: 'Y aquí dentro, donde el tiempo no va a ningún sitio, tú también cierras los ojos un momento.' },
			{ cutscene: { time: 'noche', tint: '#3a4a8a', bg: { type: 'coast', far: '#2a3448', ground: '#4a3a3a' }, start: 'dark', frames: [
				{ cam: 'pan-right', fx: 'light', text: 'La isla otra vez. Rocas de hierro viejo, olas grises. Pero esta vez no es de noche ni de día: el cielo tiene el color de un reloj parado.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, size: 's', enter: 'fade' }], cam: 'still', text: '{riolu} está en el acantilado, solo. Ya no hay lámpara. Ya no hay Lucario viejo.' },
				{ cam: 'pan-up', text: 'Solo el hombre del sombrero. Esta vez está de frente. La cara no se ve: la tapa el ala del sombrero. Pero ves que sonríe.' },
				{ actors: [{ key: 'rio', do: 'step' }], cam: 'push', fx: 'glow', on: 'rio', text: 'Se agacha. Le tiende algo a {riolu}, en la palma abierta. Una piedra pequeña, redonda, que brilla con **dos colores** a la vez, uno dentro del otro.' },
				{ fx: ['heartbeat', 'ripple'], color: '#5a8ad8', cam: 'still', text: '{riolu} alarga la mano. Casi la toca.' },
				{ fx: 'dark', cam: 'still', text: 'Un reloj suena en algún sitio. Uno solo, muy lejos. Y la isla se apaga.' },
			] } },
			{ text: 'Abres los ojos. {riolu} sigue sentado junto al ovillo, con la palma abierta delante, vacía. La mira un buen rato. Luego la cierra despacio, como quien guarda algo.' },
			{ text: 'El pequeño del rincón ha dejado de agitarse. Duerme mejor. Los relojes de alrededor van un poco más a la par.' },
			{ happy: { who: 'riolu', n: 6 } },
		],
		b06_rincon: [
			{ if: '!flag.b06_dialga_calmado', then: [
				{ text: 'En el rincón de los cojines, entre relojes que marcan horas distintas, hay algo pequeño hecho un ovillo, azul oscuro, con brillos de metal. Duerme mal. A cada suspiro, los relojes de alrededor se adelantan o se atrasan un poco.' },
				{ say: 'viajero', text: 'No lo despiertes. Bueno, despiértalo si quieres, total, está medio despierto siempre. Pero no le grites. A los pequeños que tienen miedo no se les grita.' },
			], else: [
				{ text: 'En el rincón, el Dialga joven duerme hecho un ovillo, tranquilo, con la cabeza apoyada en un cojín de rayas. Los relojes de alrededor marcan todos la misma hora y respiran con él. Tic. Tac.' },
				{ text: 'El Péndulo de ámbar, en tu bolsillo, va exactamente a su ritmo.', cond: 'has("penduloambar")' },
			] },
		],

		// =================== EL VALLE DE ANTAÑO ===================
		b06_valle_llegada: [
			{ set: { 'flag.b06_valle': true } },
			{ cutscene: { time: 'manana', weather: 'leaves', bg: { type: 'forest', ground: '#4a6a2a', far: '#c4a46a', fog: true }, start: 'dark', frames: [
				{ big: true, text: 'Valle de Antaño', sub: 'Teselia · hace muchísimo', hold: 2600, cam: 'still' },
				{ cam: 'pull', fx: 'light', text: 'La puerta del fondo de la cabina se abre a un valle verde y dorado. **Helechos** más altos que una casa. Árboles de corteza escamosa. Un cielo amarillo pálido sin un solo avión.' },
				{ actors: [{ mon: 'cradily', key: 'cra', at: 0.25, size: 's', enter: 'fade' }, { mon: 'armaldo', key: 'arm', at: 0.75, size: 's', enter: 'fade' }], cam: 'pan-right', text: 'En la orilla de un lago, un Cradily mueve los tentáculos al sol. Un Armaldo cruza el agua con las garras en alto. No los miran. No saben lo que es mirar a una persona.' },
				{ actors: [{ key: 'cra', remove: true, exit: 'fade' }, { key: 'arm', remove: true, exit: 'fade' }, { mon: 'tyrantrum', key: 'tyr', at: 0.3, size: 's', enter: 'fade', dim: true }, { mon: 'aurorus', key: 'aur', at: 0.7, size: 's', enter: 'fade', dim: true }], cam: 'pan-left', text: 'Muy lejos, en la otra punta del valle, un Tyrantrum y una Aurorus beben juntos en un arroyo. Se ven pequeños. No lo son.' },
				{ actors: [{ key: 'tyr', remove: true, exit: 'fade' }, { key: 'aur', remove: true, exit: 'fade' }, { mon: 'aerodactyl', key: 'aero', at: 'center', size: 'l', enter: 'drop' }], cam: 'pan-up', fx: 'speedlines', text: 'Y arriba, en círculo, una bandada entera de **Aerodactyl**, gritando, con el sol de cara. Una sombra enorme pasa por encima y el viento te despeina.' },
				{ actors: [{ key: 'aero', remove: true, exit: 'up' }, { id: 'petra', at: 'left', enter: 'left' }], cam: 'still', text: 'Petra da dos pasos en la hierba. Se para. Abre la boca para decir algo. La cierra. Se sienta en una roca y se queda así, mirándolo todo, sin decir nada.' },
			] } },
			{ say: 'viajero', text: 'Petra. ¿Estás bien?' },
			{ say: 'petra', text: '…Toda mi vida he estudiado esto. Dibujado. Medido. Desenterrado a trozos. —Le tiembla la voz—. Y nunca, nunca, me había imaginado que olía a algo.' },
			{ say: 'petra', text: 'Huele a resina. —Se ríe y se seca la cara con la manga—. Huele a resina, Ulises.' },
			{ text: 'Rotom asoma de la mochila. En la pantalla sigue diciendo **SIN SEÑAL**.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Pokémon que no salen en la Pokédex! Bueno, sí salen. ¡Pero no así! ¡Así de vivos no! ¡Hola, Pokémon antiguos! ¡Soy Rotom! ¡Soy moderno!' },
			{ text: 'Un Aerodactyl grita desde el risco del fondo. Toda la bandada se gira hacia ustedes a la vez, en el aire. Luego sigue dando vueltas, más deprisa, más nerviosa.' },
			{ say: 'viajero', text: 'Están inquietos. Notan al pequeño. Notan que el tiempo se escurre por aquí cerca. —Mira hacia el risco—. Y su jefe, el de arriba, el de la cicatriz, no va a dejar que nadie se acerque al nido. Y debajo del nido es justo donde se le cayó el tic.' },
			{ say: 'viajero', text: 'El pequeño no saldrá de la cabina hasta que el valle esté tranquilo. Y el valle no estará tranquilo hasta que su jefe sepa que no venimos a quitarle nada.' },
		],
		b06_ulises_valle: [
			{ if: '!flag.b06_alfa_vencido', then: [
				{ say: 'viajero', text: 'El alfa está en el nido, arriba del risco. Un Aerodactyl con una cicatriz en el ala, así de grande. —Abre los brazos todo lo que puede—. Más grande. No le vas a convencer con palabras. Ellos no hablan con palabras. Hablan con… dientes. Mucho con dientes.' },
				{ say: 'viajero', text: 'Mídete con él. No para ganarle: para que te mire. Cuando un alfa te mira, ya no eres un intruso. Eres alguien.' },
			], else: [
				{ say: 'viajero', text: 'El valle está más tranquilo. Lo noto en los relojes. Los de dentro de la cabina se están poniendo de acuerdo. —Se queda mirando la puerta azul—. Ya viene. No hagas ruido. O haz ruido bonito.' },
			] },
		],

		// ----- Archen (escena segura) -----
		b06_archen: [
			{ set: { 'flag.b06_archen': true } },
			{ text: 'Petra sigue sentada en su roca, callada, con la mochila a los pies. La mochila se mueve.' },
			{ text: 'Se mueve otra vez. Pía. Y por la boca de la mochila, entre la libreta y un bocadillo aplastado, asoma una cabecita amarilla con plumas rojas y azules, mordiendo una esquina del bocadillo.' },
			{ say: 'petra', text: '…Es un Archen. —Muy bajito, sin moverse—. Un Archen vivo. Dentro de mi mochila. Comiéndose mi bocadillo. —Pausa larga—. Es el mejor día de mi vida.' },
			{ text: 'El Archen sale de la mochila de un salto, aletea sin despegar, se cae de morros en la hierba, se levanta como si no hubiera pasado nada y te mira.' },
			{ say: 'petra', text: 'Se ha caído. —Se le iluminan los ojos—. Se ha caído y ha hecho como que no. Pala, mira. Es como yo.' },
			{ if: ARCHEN_LINEA, then: [
				{ text: 'El Archen va de ti a Petra, de Petra a ti. Huele tus zapatos. Encuentra en ellos el olor de alguien de su familia, de otra época. Lo piensa. Se da la vuelta y se mete otra vez en la mochila de Petra.' },
				{ say: 'petra', text: '¿Me ha elegido a mí? ¿A MÍ? —Abraza la mochila—. Ya tienes uno, ¿verdad? Lo ha olido. Pues se queda conmigo. Pala, tenemos compañero nuevo. No le pises la cola. No tiene cola. Bueno, sí. No se la pises.' },
				{ set: { 'flag.b06_archen_petra': true } },
			], else: [
				{ text: 'El Archen va de ti a Petra, de Petra a ti. Se te sube a la bota. Te picotea el cordón. Te mira con la cabeza ladeada, como esperando algo.' },
				{ say: 'petra', text: 'Te ha elegido. —Se le quiebra un poco la voz, pero sonríe—. Claro que te ha elegido. Tú tienes buenos reflejos. Y un Pokémon que no se cae.' },
				{ say: 'petra', text: 'Llévatelo. Por favor. Que vea el futuro. Que vea Teselia, y Kalos, y todos los sitios donde lo estuvimos buscando. Y si un día vuelve aquí, que lo vea con otros ojos.' },
				{ pokemon: { sp: 'archen', lv: 36, nature: 'jolly', ability: 'defeatist', happy: 140, moves: ['rockslide', 'crunch', 'uturn', 'agility'], ivs: { hp: 26, atk: 31, def: 22, spa: 18, spd: 22, spe: 30 } } },
				{ set: { 'flag.b06_archen_tuyo': true } },
				{ say: 'petra', text: 'Apúntalo: primer Archen que viaja en el tiempo hacia delante. Bueno, lo apunto yo. Tú no tienes libreta. Tú tienes un Rotom.' },
			] },
			{ say: 'rotom', text: '¡Bzzt! ¿Apuntar? ¡Yo no apunto nada! ¡Yo miro! ¡Qué bonito todo! ¡Bzzt!' },
		],
		b06_petra_valle: [
			{ say: 'petra', text: 'He medido un helecho. Once metros. Lo he medido tres veces. Las tres me he caído de la escalera. —Se frota el codo—. Los datos son buenos. El codo, no tanto.' },
			{ if: '!flag.b06_pared_hecha', then: [
				{ say: 'petra', text: 'En la pared de ámbar hay un hueco redondo, recién abierto. Del tamaño de tu péndulo. He marcado con tiza dónde creo que hay más. Si excavas tú, que tienes pulso, yo te dicto. Yo dicto muy bien. Lo que no hago bien es picar.' },
			] },
			{ if: '!flag.b06_alfa_vencido', then: [
				{ say: 'petra', text: 'Ulises dice que hay que hablar con el jefe de la bandada. Hablar. Con un Aerodactyl. —Te mira—. Ten cuidado. Los Aerodactyl tienen setenta dientes. Los he contado. En fósiles. En vivo no pienso contarlos.' },
			] },
		],
		b06_petra_cuaderno: [
			{ say: 'petra', text: '¡{jugador}! Mira. He empezado un cuaderno nuevo. Para el valle. El primero de la historia. —Te lo enseña. Tiene barro, una huella de Archen en la portada y una mancha de té—. Tómalo. Yo ya he empezado el segundo.' },
			{ give: 'cuadernopetra' },
			{ say: 'petra', text: 'Lee la última página. No. Mejor no la leas delante de mí. Me da vergüenza. Léela luego. O ahora. Pero no me mires.' },
		],
		b06_petra_valle_despues: [
			{ say: 'petra', text: 'Me quedo un tiempo en el valle. Con Pala y los becarios de Encina. Ulises me ha dejado la tetera. La tetera ya no está enfadada: ahora está de mal humor, que es mejor.' },
			{ say: 'petra', text: 'Ven cuando quieras. La cabina se abre con tu péndulo. Y yo siempre tengo bocadillos. Bueno, tengo hasta que llega el Archen.', cond: '!flag.b06_archen_petra' },
			{ say: 'petra', text: 'Ven cuando quieras. La cabina se abre con tu péndulo. —El Archen asoma de su mochila con una corteza de pan en el pico—. Y yo siempre tengo bocadillos. Tenía.', cond: 'flag.b06_archen_petra' },
		],

		// ----- La pared de ámbar (excavación única) -----
		b06_pared: [
			{ if: '!flag.b06_pared_vista', then: [
				{ set: { 'flag.b06_pared_vista': true } },
				{ text: 'La pared de ámbar, de cerca, es como asomarse a un tarro de miel. Petra ha dibujado con tiza un círculo en la roca roja, junto a una veta gruesa.' },
				{ say: 'petra', text: 'Ahí. Despacio. La roca es blanda, el ámbar no. Si te pasas, se raja. Si te quedas corto, no sale. —Se sienta con la libreta—. La primera regla: no te caigas al agujero. La segunda: compara. La tercera es nueva: no excaves deprisa en un sitio donde el tiempo va despacio.' },
			] },
			{ minigame: { type: 'dig', id: 'b06_pared_ambar', title: 'La pared de ámbar', hint: 'La roca roja cede; el ámbar, no. Destapa lo que brilla entero antes de que la pared se canse.', theme: 'cantera', level: 3,
				guaranteed: ['oldamber'], loot: [{ id: 'hardstone', w: 6 }, { id: 'stardust', w: 6, n: [1, 2] }, { id: 'starpiece', w: 4 }, { id: 'rarebone', w: 3 }, { id: 'cometshard', w: 1, rare: true }],
				picks: 2, lootTitle: 'Dentro de la pared' },
				onWin: [
					{ set: { 'flag.b06_pared_hecha': true } },
					{ text: 'De la veta sale, entero, un trozo de ámbar dorado. Dentro no late nada. Tiene un mosquito, un trocito de hoja y un pelo de algo que no conoces.' },
					{ say: 'petra', text: 'Ámbar Viejo. De los normales. De los que salen en los libros. —Lo mira a contraluz—. Este sí tiene registro: Aerodactyl. Lazare lo reconocería con los ojos cerrados. Es casi aburrido. Me encanta lo aburrido, hoy.' },
					{ text: 'Detrás del trozo que has sacado, a un palmo dentro de la roca, se ve una **huella de tres dedos**. Pequeña. De cuando esto era barro.' },
					{ say: 'petra', text: 'Una huella de Archen. De cría. —Te mira—. Igual es del abuelo del tuyo. Del tatarabuelo. De alguien de su familia, seguro.', cond: 'flag.b06_archen_tuyo' },
					{ say: 'petra', text: 'Una huella de Archen. De cría. —Mira su mochila—. Igual es del abuelo del mío. Qué raro es decir «el mío».', cond: 'flag.b06_archen_petra' },
					{ say: 'petra', text: 'Una huella de Archen. De cría. Lo apunto. Con fecha. Bueno, sin fecha. ¿Qué fecha pongo aquí?', cond: '!flag.b06_archen' },
				],
				onLose: [
					{ text: 'La roca roja se desmorona de golpe y tapa la veta. El ámbar sigue ahí detrás, entero. La pared necesita descansar.' },
					{ say: 'petra', text: 'Nada roto. Lo importante. Otra vez, cuando quieras. La pared no se va a ir a ningún sitio. Lleva aquí desde siempre.' },
				],
				onQuit: [{ say: 'petra', text: 'Bien hecho. Parar también es excavar. Lo dice mi director de tesis. Lo dice cuando paro yo, no cuando para él.' }] },
		],
		b06_pared_hueco: [
			{ text: 'En la base de la pared, un hueco redondo, liso, del tamaño de un huevo de Pidgey. La roca de alrededor está tibia.' },
			{ text: 'Acercas el Péndulo de ámbar. El ámbar del centro encaja con la forma del hueco como una llave en su cerradura. De aquí salió. De aquí se cayó hacia delante, hacia el futuro, cuando el pequeño se asustó.', cond: 'has("penduloambar")' },
			{ text: 'Por eso estaba tibio. Por eso latía. Llevaba toda la vida queriendo volver aquí.', cond: 'has("penduloambar")' },
		],

		// ----- El nido: el alfa de la bandada -----
		b06_alfa: [
			{ set: { 'flag.b06_alfa_visto': true } },
			{ text: 'Lo alto del risco. El viento no para. En el centro del nido, sobre ramas, huesos y plumas, hay un **Aerodactyl** enorme, más grande que cualquiera que hayas visto, con una cicatriz blanca que le cruza el ala izquierda de punta a punta.' },
			{ text: 'Abre la boca. Setenta dientes. Grita. Toda la bandada contesta desde el cielo.' },
			{ if: 'inParty("aerodactyl")', then: [
				{ text: 'La Poké Ball de tu Aerodactyl se sacude sola en tu cinturón. Se abre. Tu Aerodactyl sale, se posa en el borde del nido y le grita al alfa. No es un grito de miedo. Es otra cosa. Algo antiguo que se reconoce.' },
			] },
			{ if: AERO + ' && !inParty("aerodactyl")', then: [
				{ text: 'Piensas en tu Aerodactyl, el que está en el PC, el que salió de un ámbar en un laboratorio. Este podría ser su abuelo. Su tatarabuelo. Su todo.' },
			] },
			{ if: LUC, then: [
				{ text: '{riolu} da un paso al frente, con las palmas abiertas. El aura le brilla, firme, sin amenaza. El alfa lo mira. Deja de gritar. Ladea la cabeza.' },
			] },
			{ say: 'viajero', text: '—Desde abajo, a gritos—. ¡No vienes a ganarle! ¡Vienes a que te mire! ¡Pero si no le das un buen combate no te va a mirar! ¡Es un poco contradictorio! ¡Ya lo sé!' },
			{ prompt: 'El alfa extiende las alas. Va a por ti.', choice: [
				{ text: 'Curar al equipo antes (Petra trae pociones en un cubo).', then: [{ heal: true }, { say: 'petra', text: '—Sube jadeando con un cubo lleno de pociones—. ¡Ya! ¡Todas! ¡No me preguntes por qué tengo un cubo de pociones! ¡Tengo un cubo de todo!' }] },
				{ text: 'Así está bien.', then: [{ text: 'Respiras hondo. El viento te empuja hacia atrás. No te mueves.' }] },
			] },
			{ call: 'b06_alfa_combate' },
		],
		b06_alfa_otra: [
			{ text: 'El alfa de la cicatriz te espera en el centro del nido. Te ha reconocido. Abre la boca y grita, pero esta vez es casi un saludo. Casi.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí (el cubo de pociones de Petra).', then: [{ heal: true }, { say: 'petra', text: '—Desde abajo—. ¡Agarra las del fondo, que las de arriba son de Pala!' }] },
				{ text: 'Así está bien.', then: [{ text: 'El viento sopla. El alfa extiende las alas.' }] },
			] },
			{ call: 'b06_alfa_combate' },
		],
		b06_alfa_combate: [
			{ wild: { sp: 'aerodactyl', lv: 65, noCatch: true, nature: 'jolly', ability: 'pressure', moves: ['stoneedge', 'crunch', 'ironhead', 'earthquake'], minIVs: 28 }, canRun: false,
				onWin: [
					{ set: { 'flag.b06_alfa_vencido': true } },
					{ text: 'El alfa cae de espaldas en el nido, levanta una nube de plumas y se queda así un momento, mirando el cielo amarillo. Luego se levanta. Se sacude. Y te mira.' },
					{ text: 'Te mira de verdad. Ya no como a algo que hay que echar del nido. Como a alguien.' },
					{ call: 'b06_montura' },
				],
				onLose: [
					{ text: 'Una ala enorme te barre del borde del nido. Ruedas por el risco hasta un montón de helechos blandos. Desde arriba, el alfa grita. No suena enfadado. Suena a «otra vez».' },
					{ say: 'viajero', text: '¡Ha estado muy bien! ¡Para mí! ¡Para él no tanto! ¡Otra vez, cuando estés list{o|a|e}! ¡Los alfas no se cansan, pero se aburren, y eso juega a tu favor!' },
					{ heal: true },
				] },
		],
		b06_montura: [
			{ if: AERO, then: [
				{ text: 'Llamas a tu Aerodactyl desde el PC de la Pokédex. Aquí no hay señal, pero la Poké Ball llega igual, con un chasquido, como si hubiera atajado por algún sitio.', cond: '!inParty("aerodactyl")' },
				{ text: 'Tu Aerodactyl sale de su Poké Ball sin que se lo pidas.', cond: 'inParty("aerodactyl")' },
				{ text: 'Se posa junto al alfa. Los dos se miran un rato largo, frente con frente. El alfa le gruñe algo, bajito. Tu Aerodactyl contesta. Luego el alfa se aparta del nido y le deja el sitio del centro.' },
				{ text: 'Tu Aerodactyl se gira hacia ti y baja el cuello hasta el suelo. Te está invitando a subir. Aquí, en su época, ha aprendido algo que en el laboratorio no le enseñó nadie.' },
			], else: [
				{ text: 'El alfa se aparta del centro del nido. Debajo, entre ramas y plumas, hay una cría: un Aerodactyl joven, más pequeño que los del cielo, con los dientes demasiado grandes para la cara.' },
				{ text: 'La cría te mira. Mira al alfa. El alfa le da un empujón con el morro, hacia ti. La cría da tres pasos, se tropieza con una rama y se queda delante de tus pies, muy digna.' },
				{ say: 'petra', text: '—Asomada al borde del risco, sin aliento—. Te lo está dando. El jefe te está dando una cría. Eso no lo hace ningún animal. Ninguno. Lo apunto. Lo apunto y luego lloro.' },
				{ pokemon: { sp: 'aerodactyl', lv: 40, nature: 'jolly', ability: 'rockhead', happy: 150, moves: ['rockslide', 'crunch', 'ironhead', 'wingattack'], ivs: { hp: 28, atk: 31, def: 24, spa: 16, spd: 24, spe: 31 } } },
				{ set: { 'flag.b06_aerodactyl_regalo': true } },
				{ text: 'La cría es pequeña para lo que es, pero no para ti: aguanta tu peso sin pestañear. Te baja el cuello para que subas.' },
			] },
			// ----- Leilani por llamada: el arnés -----
			{ text: 'La Pokédex vibra. Rotom: «¡Bzzt! ¡Una llamada! ¿Aquí? ¡Si no hay señal!». La pantalla sigue diciendo SIN SEÑAL. Pero la llamada entra. Con eco. Con retraso, como si viniera de muy lejos y de un poco después.' },
			{ say: 'viajero', text: 'Las llamadas son tozudas. Pasan por donde sea. Lo que no pasa es la hora: ahí fuera será mañana, o anteayer. No se lo digas, que se agobia.' },
			{ say: 'leilani', as: 'Leilani (llamada)', text: '¿Hola? ¿{jugador}? Te oigo… raro. Te oigo antes de que hables. ¿Sí o qué? Bueno, da igual. ¿Por qué me sale en el Ride Gear un «Aerodactyl, vinculado» y una ubicación que es… ¿un signo de interrogación?' },
			{ if: 'flag.b05_ridegear', then: [
				{ say: 'leilani', as: 'Leilani (llamada)', text: 'Ya, ya, no me lo expliques. Escucha: el Ride Gear lo llama, perfecto. Pero algo tiene que sujetarte. Un Lapras nada recto. Un Aerodactyl hace loopings porque le da la gana. Necesitas un **arnés**.' },
			], else: [
				{ say: 'leilani', as: 'Leilani (llamada)', text: 'No tienes mi Ride Gear, ¿verdad? Lo noto en la voz. Bueno, da igual: un Pokémon que vuela necesita algo que te sujete. Te dicto un **arnés** con lo que tengas. Cuerdas. Correas. Fe.' },
			] },
			{ say: 'leilani', as: 'Leilani (llamada)', text: 'Te dicto. Correa por debajo del pecho, que no toque las alas. Dos lazos en los hombros. Un nudo que se suelta tirando, por si hay que saltar. Y una hebilla. La hebilla es lo importante. Sin hebilla no hay arnés, hay una cuerda con esperanza.' },
			{ if: 'flag.b05_skull_taller', then: [
				{ say: 'francine', as: 'Una voz detrás de Leilani', text: '¡Hebilla doble, que los de arriba no perdonan! —Se oye un golpe de llave inglesa—. Y no lo pruebes sin casco. Lo digo yo, que llevo el taller. ¡Siguiente encargo!' },
				{ say: 'leilani', as: 'Leilani (llamada)', text: 'Francine. Lleva el taller con mano de hierro. Los chicos le tienen pánico. Yo también. Me cae genial.' },
			] },
			{ if: 'flag.b05_luz_leilani', then: [
				{ say: 'leilani', as: 'Leilani (llamada)', text: 'Por cierto. —Baja la voz—. Saqué la lámpara de debajo de la cama. La de mamá. Está encima de la mesa. No la he tocado. Pero la veo cada mañana. Eso ya es algo, ¿no?' },
			], else: [
				{ say: 'leilani', as: 'Leilani (llamada)', text: 'Por cierto. —Pausa—. Nada. Una cosa que tengo debajo de la cama. No es nada. Algún día te la enseño. Algún día.' },
			] },
			{ prompt: 'Has atado el arnés como te ha dictado. La hebilla brilla en el pecho de tu Aerodactyl.', choice: [
				{ text: '«Confío en tu arnés. Me subo ya.»', then: [
					{ af: { leilani: 3 } },
					{ say: 'leilani', as: 'Leilani (llamada)', text: '¿Ya? ¿Sin probarlo? ¿Sin tirar de la hebilla tres veces? —Se le nota la sonrisa en la voz, con retraso—. Nadie hace eso. Tú sí. Pues no voy a fallar. Ya no puedo fallar.' },
				] },
				{ text: 'Tirar de la hebilla tres veces antes de subir.', then: [
					{ say: 'leilani', as: 'Leilani (llamada)', text: '¡Así se hace! Tres tirones. Uno por la correa, uno por el nudo y uno por si acaso. El «por si acaso» es el que más trabaja. ¿Sí o qué?' },
				] },
			] },
			{ say: 'leilani', as: 'Leilani (llamada)', text: 'Bueno, cuelgo, que esta llamada me está costando un dineral y no sé en qué año la voy a pagar. ¡Vuela bonito!' },
			{ cutscene: { time: 'dia', weather: 'none', bg: { type: 'mountain', far: '#e0c48a', ground: '#8a5a3a', hill: '#a8743a' }, start: 'light', frames: [
				{ actors: [{ mon: 'aerodactyl', key: 'aero', at: 'center', size: 'l', enter: 'pop' }], cam: 'push', text: 'Subes. El cuero del arnés cruje. La hebilla, fría contra el pecho. Debajo de ti, un corazón antiguo late muy deprisa.' },
				{ actors: [{ key: 'aero', do: 'hop' }], fx: ['speedlines', 'shake'], shake: 2, cam: 'pan-up', text: 'Un salto desde el borde del risco. El estómago se te queda en el nido. El valle entero cae hacia abajo, y luego, de golpe, las alas se abren y **suben**.' },
				{ cam: 'pull', fx: 'rays', text: 'Desde arriba se ve todo: el lago como una moneda, la pared de ámbar brillando, los helechos como hierba. Y, muy pequeña, la cabina azul entre las hojas.' },
				{ actors: [{ key: 'aero', do: 'spin' }], cam: 'drift', text: 'La bandada se les une. Treinta Aerodactyl en círculo, gritando, y ustedes dos en medio. Tu Aerodactyl grita con ellos. Por primera vez, suena exactamente como ellos.' },
				{ cam: 'pull', fx: 'iris-out', on: 'aero', text: 'Aterrizan junto a la cabina. Rotom asoma de la mochila, con la pantalla del revés. «¡Bzzt! ¡Otra vez! ¡Otra vez!».' },
			] } },
			{ set: { 'flag.mount_aerodactyl': true } },
			{ toast: '🦅 Montura: Aerodactyl. Podrás volar entre ciudades de Teselia que ya conozcas.' },
		],
		b06_alfa_despues: [
			{ if: '!' + FIN, then: [
				{ text: 'El alfa de la cicatriz te mira desde el borde del nido. Ya no grita. Abre un poco las alas y las vuelve a cerrar, como quien se encoge de hombros.' },
			], else: [
				{ text: 'El alfa de la cicatriz dormita al sol en el borde del nido. Cuando llegas, abre un ojo. Ve a tu Aerodactyl. Cierra el ojo. Eso, en un alfa, es «estás en tu casa».' },
			] },
		],

		// =================== CLÍMAX: EL DIALGA JOVEN ===================
		b06_dialga: [
			{ text: 'Al volver junto a la cabina, lo notas antes de verlo. La sombra de un helecho se mueve **hacia el sol**. Luego otra. Luego todas. El lago, al fondo, sube hasta la orilla y baja, sube y baja, sin una ola.' },
			{ text: 'La puerta de la cabina está abierta. En el umbral, algo pequeño, azul oscuro, con brillos de metal en el pecho, mira el valle con los ojos muy abiertos. Tiembla.' },
			{ say: 'viajero', text: 'Ha salido. —Muy bajito—. Ha visto el valle. Ha reconocido el sitio. Y se ha acordado del susto.' },
			{ text: 'El Dialga joven da un grito. No es un rugido: es un grito de cría. Y con el grito, el valle entero **salta**: las hojas caen hacia arriba, una bandada de Yanmega vuela hacia atrás, la luz se pone de noche y de día dos veces en un segundo.' },
			{ say: 'petra', text: '¡Ulises! ¡Las capas! ¡Las estoy viendo moverse! ¡Las capas de la tierra se están moviendo!' },
			{ say: 'viajero', text: '¡Nada de combates! ¡A un pequeño asustado no se le pega! ¡Se le acompaña! —Saca de la cabina, de quién sabe dónde, un acordeón viejísimo—. Necesito que cada uno haga lo que sabe hacer. Yo toco. Petra cuenta. Y tú…' },
			{ say: 'viajero', text: 'Tú tienes su latido en la mano. Sujétalo. No lo sueltes pase lo que pase.' },
			{ prompt: 'El Péndulo de ámbar tira de tu mano hacia el Dialga. ¿Qué haces?', choice: [
				{ text: 'Acercarte despacio, con el péndulo por delante.', then: [{ set: { 'flag.b06_dialga_paso': true } }] },
				{ text: 'Sentarte en la hierba y esperar a que venga él.', then: [{ set: { 'flag.b06_dialga_espera': true } }] },
				{ text: 'Hablarle bajito, sin gritar.', then: [{ set: { 'flag.b06_dialga_voz': true } }] },
			] },
			{ cutscene: { time: 'tarde', weather: 'leaves', bg: { type: 'forest', ground: '#4a6a2a', far: '#c4a46a', fog: true }, start: 'light', frames: [
				{ cam: 'still', fx: 'ripple', text: 'El valle, quieto un instante. Luego no. Las sombras de los helechos giran como agujas de reloj, todas a la vez, hacia el sol.' },
				{ actors: [{ mon: 'dialga', key: 'dia', at: 'center', size: 'm', enter: 'fade' }], fx: ['quake', 'heartbeat'], color: '#6fc0ff', on: 'dia', text: 'En medio, el **Dialga joven**. Pequeño, para lo que es. Las placas del pecho le brillan a trompicones. Cada latido descoloca el mundo un poco más.' },
				{ actors: [{ id: 'viajero', at: 'right', enter: 'right' }], cam: 'pan-right', text: 'Ulises abre el acordeón. La primera nota es la misma que la cabina hace al llegar: un acordeón respirando hondo. Lenta. Y otra. Y otra.' },
				{ actors: [{ id: 'petra', at: 'left', enter: 'left' }], cam: 'pan-left', text: 'Petra, de rodillas, con la mano en la tierra, cuenta las capas en voz alta. «Una. Dos. Tres». Lo antiguo abajo, lo nuevo arriba. La primera regla. Una y otra vez.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.36, size: 's', enter: 'fade' }], fx: ['glow', 'ripple'], on: 'rio', cam: 'push', text: '{riolu} se pone a tu lado. Cierra los ojos. El aura le sale de las palmas y se extiende por la hierba como agua, despacio, hasta tocar las patas del Dialga.' },
				{ cond: '!(' + LUC + ')', fx: 'ripple', on: 'dia', cam: 'push', text: 'Respiras despacio. Contando con Petra. Y notas tu propio pulso en la mano que sujeta el péndulo, firme, tranquilo.' },
				{ fx: 'glow', color: '#6fc0ff', on: 'dia', cam: 'still', text: 'El Péndulo de ámbar, en tu mano, va y viene. Izquierda. Derecha. El brillo azul de dentro late. Y el Dialga, poco a poco, **late con él**.' },
				{ actors: [{ key: 'dia', do: 'nod' }], fx: ['light', 'sparkle'], cam: 'pull', text: 'Las sombras se paran. El lago se queda quieto. Las hojas que caían hacia arriba caen, por fin, hacia abajo. El Dialga cierra los ojos. Bosteza enseñando unos dientes que no asustan a nadie.' },
				{ actors: [{ key: 'dia', remove: true, exit: 'fade' }], cam: 'still', fx: 'iris-out', on: false, text: 'Se da la vuelta. Entra en la cabina, despacio, arrastrando un poco la cola. Y se acurruca en su rincón, entre los relojes, que ahora marcan todos la misma hora.' },
			] } },
			{ set: { 'flag.b06_dialga_calmado': true } },
			{ text: 'Durante un buen rato nadie dice nada. Ulises cierra el acordeón sin hacer ruido. Petra sigue con la mano en la tierra.' },
			{ if: 'flag.b06_dialga_paso', then: [{ say: 'viajero', text: 'Te has acercado tú. Con el péndulo por delante, sin prisa. —Sonríe—. Eso es lo más valiente que se le puede hacer a un susto: acercarse despacio.' }] },
			{ if: 'flag.b06_dialga_espera', then: [{ say: 'viajero', text: 'Te has sentado. Has esperado a que viniera él. —Sonríe—. La gente siempre quiere ir a buscar. Casi nadie sabe quedarse donde lo puedan encontrar.' }] },
			{ if: 'flag.b06_dialga_voz && flag.b01_enc_viajero_2', then: [{ say: 'viajero', text: 'Le has hablado bajito. Te acordabas. —Se le humedecen los ojos—. Te lo dije en un laberinto, hace mucho. Para ti. Para mí fue ayer.' }] },
			{ if: 'flag.b06_dialga_voz && !flag.b01_enc_viajero_2', then: [{ say: 'viajero', text: 'Le has hablado bajito. Sin gritar. —Se le humedecen los ojos—. A los pequeños que tienen miedo no se les grita. Eso lo sabías sin que nadie te lo dijera. O te lo diré. Da igual.' }] },
			{ if: LUC, then: [
				{ text: '{riolu} abre los ojos. Está cansado; se le nota en las orejas. Se apoya en tu pierna un momento. Luego mira hacia la cabina, hacia el rincón de los relojes, y hace algo que no le habías visto hacer nunca: sonríe con los ojos.' },
				{ happy: { who: 'riolu', n: 8 } },
			] },
			{ say: 'petra', text: 'Una, dos, tres. —Se levanta, con las rodillas llenas de barro—. Las capas están en su sitio. Todas. Por orden. Lo antiguo abajo. Lo nuevo arriba. —Se ríe, temblando—. Nunca me había alegrado tanto de que algo estuviera donde tenía que estar.' },
			{ call: 'b06_vuelta' },
		],

		// =================== LA VUELTA (sin Diario de estos días) ===================
		b06_vuelta: [
			{ say: 'viajero', text: 'Ya podemos volver. Él necesita dormir. Y dormir quieto. Y en una cabina que viaja no se duerme: se marea.' },
			{ text: 'Cruzan la sala de la cabina de puntillas. En el rincón, el Dialga ronca. Ronca a compás.' },
			{ go: 'patio_museo', silent: true },
			{ text: 'El patio del Museo. Los setos, el banco de hierro, la fuente seca. Es de mañana, o eso parece. La Prof. Encina está dormida en el banco con la libreta abierta en el pecho.' },
			{ text: 'La Pokédex vibra en tu mano. La pantalla parpadea: «**bzzt… sincronizando…**». Una barra que se llena. Un pitido. El menú de siempre.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Aquí estoy! ¡Ya estoy! —Da una vuelta en el aire, como desperezándose—. Uy. Qué raro. ¿Qué hicimos ayer? No tengo nada apuntado. Qué raro. Yo lo apunto todo.' },
			{ text: 'Petra te mira. Tú miras a Rotom. Rotom mira a todos lados, contento, como si no pasara nada.' },
			{ prompt: 'Rotom espera, flotando, a que alguien le cuente algo.', choice: [
				{ text: '«Fuimos a un valle. Te encantó.»', then: [
					{ say: 'rotom', text: '¿Un valle? ¿Yo? Bzzt. Pues no me acuerdo. ¡Seguro que me encantó! ¡A mí me encantan los valles! Creo.' },
				] },
				{ text: '«Nada importante.»', then: [
					{ say: 'rotom', text: '¡Ah, bueno! ¡Entonces no pasa nada! Un día sin novedades. ¡A veces hacen falta!' },
					{ say: 'petra', text: '…—Petra no dice nada. Apunta algo en su libreta. Lo subraya dos veces.' },
				] },
			] },
			{ if: LUC, then: [
				{ text: '{riolu} mira la Pokédex. Ya no está relajado, como dentro de la cabina. Tiene otra vez el hocico arrugado. Un segundo. Luego mira hacia otro lado, como si no hubiera pasado nada.' },
			] },
			// ----- Despedida de Ulises -----
			{ text: 'Ulises cierra la puerta de la cabina con mucho cuidado, como quien arropa a alguien. Mete una llave en la cerradura. La deja puesta.' },
			{ say: 'viajero', text: 'La cabina se queda aquí. Con él dentro. Necesita dormir en un sitio que no se mueva. Una temporada. Unos años. Un ratito largo.' },
			{ say: 'viajero', text: 'La llave no gira con la mano. Gira con tu péndulo. Y desde aquí, la puerta del fondo solo da al valle: lo he dejado así. Para que puedan volver. Para que Petra mida sus helechos. Para que él tenga visitas.' },
			{ prompt: 'Ulises se sube el cuello del abrigo. Parece que se va.', choice: [
				{ text: '«¿Y tú? ¿Cómo te vas sin la cabina?»', then: [
					{ say: 'viajero', text: 'Andando. —Sonríe enorme—. Hace siglos que no ando. Literalmente. Tengo ganas. Por los sitios a los que se llega andando pasan cosas que no salen en ningún mapa.' },
				] },
				{ text: '«Te dije que no te dejaría irte sin mí.»', cond: 'flag.b05_ulises_caleta', then: [
					{ say: 'viajero', text: 'Y no me has dejado. —Se le quiebra algo en la cara, un momento—. Me has acompañado hasta aquí. Esto era lo de «sin ti». Lo de después lo tengo que andar yo.' },
				] },
			] },
			{ say: 'viajero', text: 'Volveré cuando el pequeño crezca. Volví. Bueno, volveré. A por los dos: a por él y a por la cabina. Y a por ti, si quieres venir. Querrás.' },
			{ say: 'viajero', text: 'Y oye. —Muy serio, una sola frase—. Lo que pasa dentro de la cabina se queda dentro de la cabina. Lo de dentro y lo de los que están dentro. Acuérdate tú, por los que no se acuerdan.' },
			{ say: 'viajero', text: '…No he dicho nada. ¡Me voy! ¡Llego tarde a algo que no ha empezado, y esta vez voy a pie!' },
			{ text: 'Y se va. Atraviesa el patio dando zancadas, salta el seto en vez de rodearlo, se engancha la bufanda, la deja en el respaldo del banco y sigue sin ella. Al doblar la esquina del Museo, se gira y te saluda con las dos manos.' },
			{ text: 'La Prof. Encina se despierta de golpe con el ruido del seto. Mira la cabina. Mira el banco vacío. Te mira a ti.' },
			{ say: 'encina', text: '¿Cuánto he dormido? ¿Qué hora es? ¿Por qué tengo la sensación de que me he perdido algo fascinante?' },
			// ----- Petra: el registro -----
			{ say: 'petra', text: 'El ámbar tiene registro. Por fin. —Saca la libreta, arranca una hoja, escribe con letra temblorosa y te la da—. Toma. Es la ficha. Para que conste. Que algún día alguien la lea y sepa que no estaba loca. O que sí, pero que tenía razón.' },
			{ give: 'registroambar' },
			{ read: 'registroambar' },
			{ text: 'Petra te enseña también una foto, todavía caliente, de una cámara de las de antes que nadie sabía que llevaba: el valle desde el risco, con la bandada en el cielo y, abajo, entre los helechos, una cabina azul diminuta.' },
			{ give: 'fotovalle' },
			{ say: 'petra', text: 'Ahí estás tú. Ese punto. No, ese no, ese es Pala. El otro.' },
			{ say: 'petra', text: 'Me quedo un tiempo en el valle. La Prof. Encina dice que me manda a sus becarios. Pala ya está cavando la letrina. —Se pone seria, de golpe—. Gracias, {jugador}. Por guardarme el ámbar todo este tiempo. Lo has guardado mejor que yo.' },
			// ----- Cierres -----
			{ quest: 'b06_t_petra', stage: 'hecha', done: true },
			{ quest: 'b06_t_ulises', stage: 'hecha', done: true },
			{ quest: 'b06_m3', stage: 'hecha', done: true },
			{ set: { 'flag.b06_t3_hecho': true } },
			{ intel: { npc: 'viajero', text: 'El «pequeñito que late a destiempo» era un Dialga joven. Calmado en el Valle de Antaño, duerme en la cabina, aparcada en el patio del Museo de Esmalte. Ulises se fue a pie; volverá «cuando el pequeño crezca». Algo tira del tiempo de Teselia desde una torre al norte.' } },
			{ intel: { npc: 'petra', text: 'El Ámbar sin registro era un trozo del latido del Dialga joven, caído hacia el futuro desde el Valle de Antaño. Engarzado en el péndulo del reloj del Museo, abre la cabina. Petra se queda en el valle con los becarios de Encina.' } },
			// ----- Brock: el puente -----
			{ text: 'Al salir a la calle, la Pokédex vibra otra vez. Un mensaje de un número de Kanto, con un emoji de olla.' },
			{ say: 'brock', as: 'Brock (mensaje)', text: '¡{jugador}! ¡Ya bajaron el puente! El de Fayenza, el levadizo: lo han terminado esta mañana. El gimnasio abre por fin y yo ya tengo la cocina montada. Sigue la **Ruta 5** desde Esmalte. Te guardo un plato. Y un combate. Por ese orden.' },
			{ quest: 'b06_m4', stage: 'fayenza' },
		],

		// =================== PREMIO DEL NIDO (MT Pedrada) ===================
		b06_premio_nido: [
			{ set: { 'flag.b06_premio_nido': true } },
			{ say: 'paleontologa', as: 'La jefa de la expedición', text: 'Tres. Les has ganado a los tres becarios y no ha llorado ninguno. Bueno, uno. Pero de emoción. —Se quita el casco—. Ven, que te enseño algo que hemos visto hacer aquí arriba.' },
			{ text: 'En la mesa de los mapas, sujeto con piedras, hay un disco gris con una etiqueta escrita a mano: «Observación 14».' },
			{ say: 'paleontologa', as: 'La jefa de la expedición', text: 'Los Aerodactyl de la bandada no cazan con los dientes. Primero tiran piedras desde arriba. Una, dos, cinco seguidas, hasta que la presa se cansa. Lo hemos grabado en un disco. Se lo enseñas a un Pokémon de roca y lo aprende en una tarde.' },
			{ give: 'b06_mt_pedrada' },
			{ say: 'paleontologa', as: 'La jefa de la expedición', text: '**Pedrada**. Hecho en el Valle de Antaño, con datos de hace muchísimo. La Prof. Encina dice que es la primera MT de la historia con fuentes primarias.' },
		],

		// =================== ISLA LIBERTAD ===================
		b06_faro_libertad: [
			{ set: { 'flag.b06_faro_libertad': true } },
			{ text: 'El faro de la Isla Libertad: ladrillo rojo, una puerta sin cerradura y una escalera de caracol que sube a oscuras. Arriba, la linterna grande, con los cristales rotos y el mecanismo oxidado.' },
			{ text: 'En el suelo, junto a la linterna, hay un platito de cerámica con migas. Y unas pisadas pequeñísimas en el polvo, de algo que camina de puntillas.' },
			{ text: 'En la pared, alguien ha escrito a tiza, con letra de niño: «Aquí vive el que trae la suerte. Si le dejas una magdalena, ganas». Debajo, en otra letra: «No es verdad. Pero déjenle magdalenas igual».' },
			{ if: LUC, then: [
				{ text: '{riolu} olisquea las pisadas. Se le erizan un poco las orejas. Mira hacia arriba, hacia la linterna rota, y se queda muy quieto, como si escuchara una risa muy lejos.' },
			] },
			{ say: 'rotom', text: '¡Bzzt! Huellas de… no sé de qué. No coinciden con nada que tenga registrado. ¡Qué emocionante! ¡Otro sin registro! ¡Me encantan los sin registro!' },
			{ text: 'Al bajar, notas el bolsillo tibio. Te das la vuelta. En lo alto del faro, durante un segundo, una lucecita naranja del tamaño de una vela. Luego nada.' },
		],
		b06_faro_despues: [
			{ text: 'El faro de la Isla Libertad, con su linterna rota. En el platito de cerámica de arriba hay migas nuevas. Alguien sigue viniendo a comer. Alguien sigue dejándole comida.' },
		],
		b06_libertad_sin_aura: [
			{ text: 'La playa de la Isla Libertad. La arena está tibia en algunos sitios y fría en otros, sin razón aparente. Ahí debajo hay cosas, seguro. Pero haría falta un buen olfato para encontrarlas. Uno con aura, mejor.' },
		],
	},

	// =====================================================================
	// TIENDAS
	// =====================================================================
	shops: {
		tienda_esmalte: { name: 'Ferretería de Esmalte', items: ['ultraball', 'timerball', 'nestball', 'quickball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', 'maxether', 'elixir', { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		registroambar: { name: 'Registro del ámbar', pocket: 'key', desc: 'Una hoja arrancada de la libreta de Petra, con barro en una esquina y letra temblorosa. La ficha que el Ámbar sin registro no tuvo nunca.',
			read: '**FICHA DE REGISTRO · MUESTRA N.º 1 (antes «sin registro»)**\n\n**Descubierta por:** Petra Brossard, paleontóloga de campo, en los acantilados de la Muralla Costera (Kalos). Se cayó encima.\n**Custodiada por:** {jugador}, que tiene buenos reflejos.\n\n**Material:** ámbar. Color miel oscura. Inclusión: una pluma diminuta.\n**Tasación:** «raro» (opinión no profesional) / «un problema» (Mayla, joyera de Konikoni, por teléfono).\n\n**Antigüedad:** muy alta, por fuera. «−3 años», por dentro (máquina del Dr. Lazare, Petroglifo). Las dos cosas son verdad.\n\n**Procedencia:** la pared de ámbar del Valle de Antaño. Hay un hueco de su tamaño. Encaja.\n\n**Qué es:** un trocito del latido de un Dialga muy joven, que se le cayó cuando se asustó, hacia delante en el tiempo. La resina lo envolvió por el camino.\n\n**Estado actual:** engarzado en el péndulo de latón del reloj del Museo de Esmalte. Late a compás. Tibio y quieto.\n\n**Observaciones:** las capas están en su sitio. Todas.\n\n*(Debajo, más pequeño, tachado y vuelto a escribir:)* Gracias por guardármelo.' },
		cuadernopetra: { name: 'Cuaderno del valle', pocket: 'key', desc: 'El cuaderno de campo de Petra en el Valle de Antaño. Tiene barro, una mancha de té y una huella de Archen en la portada.',
			read: '**Cuaderno de campo · Valle de Antaño · n.º 1**\n*(«n.º 1 de la historia», añadido a bolígrafo)*\n\n---\n\n**Día 1.** Huele a resina. Nadie me dijo que olía a algo. Lo apunto lo primero, antes que todo lo demás, porque es lo que más me ha sorprendido.\n\n**Día 1, más tarde.** Un Archen en mi mochila. Se ha comido el bocadillo. Datos: los Archen comen bocadillos de queso. Hipótesis: los Archen comen todo lo que es mío.\n\n**Día 2.** Helecho mayor: once metros. Caídas de la escalera: tres. Codo: mal.\n\n**Día 2.** Los Cradily se ponen al sol en fila, del más grande al más pequeño. Los Armaldo no hacen fila. Los Armaldo no respetan nada.\n\n**Día 3.** El lago sube y baja como si respirara. Ulises dice que es el pequeño soñando. Lo apunto así, aunque no sea ciencia. Hoy no me importa que no sea ciencia.\n\n**Día 4.** Las capas se movieron. Las vi moverse. Conté: una, dos, tres. Se pararon. No sé si las paré yo contando o si se pararon solas y yo estaba contando. Prefiero no saberlo.\n\n**Día 4, por la noche.** Rotom no se acuerda de nada de estos días. Dice que no tiene nada apuntado. Él, que lo apunta todo.\n\nYo sí lo tengo apuntado. Lo dejo aquí, por si alguien lo necesita algún día.\n\n---\n\n**Última página.**\n\nToda mi vida he excavado cosas que estaban muertas. Esta semana he visto cosas vivas que llevaban muertas toda mi vida.\n\nNo sé escribir lo que siento. Sé escribir capas. Así que lo escribo como una capa: abajo del todo, lo más antiguo, todo lo que he estudiado. Encima, esta semana. Y arriba del todo, lo más nuevo: que no estaba loca.' },
		fotovalle: { name: 'Foto «El Valle de Antaño»', pocket: 'key', art: 'valle_antano', desc: 'La foto que hizo Petra desde el risco del nido: el valle de los helechos gigantes bajo un cielo amarillo pálido, la bandada de Aerodactyl en círculo y, abajo, una cabina azul diminuta. Hay un punto que eres tú. Y otro que es Pala.' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b06_azulejo_bayas: {
			name: 'Los zarzales de la charca', icon: '🫐', hours: 18, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'bosque', hint: 'Los zarzales del Bosque Azulejo sueltan las bayas azules primero. Ojo con las pochas: los Leavanny las dejan caer a propósito.' },
			ask: 'Zarzales espesos alrededor de la charca azul, cargados de bayas. Un Leavanny cose una hoja al lado, sin prisa.',
			text: 'Recoges lo que los zarzales sueltan hoy. El Leavanny te mira coser una cesta de hojas con su misma puntada torcida.',
			wait: 'Hoy los zarzales ya están pelados. Los Leavanny se han comido el resto.',
			table: [
				{ id: 'sitrusberry', w: 16, n: [1, 2] }, { id: 'leppaberry', w: 14, n: [1, 2] }, { id: 'lumberry', w: 10, n: [1, 1] },
				{ id: 'aguavberry', w: 10, n: [1, 2] }, { id: 'miracleseed', w: 4, n: [1, 1] }, { id: 'bigroot', w: 3, n: [1, 1] },
				{ id: 'leafstone', w: 2, n: [1, 1], rare: true }, { id: 'sweetapple', w: 1, n: [1, 1], rare: true },
			],
		},
		b06_saeta_pesca: {
			name: 'El mirador de los pescadores', icon: '🎣', hours: 18, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'rio', hint: 'Desde el Puente Saeta el sedal baja mucho. Cuando los cables cantan, lo de abajo pica.', wild: [{ sp: 'basculin', lv: [60, 62], w: 5 }, { sp: 'seaking', lv: [60, 62], w: 4 }, { sp: 'alomomola', lv: [60, 62], w: 1 }], wildChance: 0.3 },
			ask: 'Un mirador a mitad del puente, con cañas largas atadas a la barandilla y un cartel: «Para los de la Gira. Si pescan algo bonito, suéltenlo. Si pescan algo feo, también».',
			text: 'Subes el sedal mientras los cables cantan. Un pescador de la barca de abajo te saluda con el sombrero.',
			wait: 'Las cañas están recogidas. Hoy el agua ya ha dado lo suyo.',
			table: [
				{ id: 'pearl', w: 16, n: [1, 2] }, { id: 'bigpearl', w: 8, n: [1, 1] }, { id: 'mysticwater', w: 6, n: [1, 1] },
				{ id: 'heartscale', w: 6, n: [1, 1] }, { id: 'stardust', w: 12, n: [1, 2] }, { id: 'starpiece', w: 4, n: [1, 1] },
				{ id: 'prismscale', w: 1, n: [1, 1], rare: true }, { id: 'waterstone', w: 2, n: [1, 1], rare: true },
			],
		},
		b06_lago_antano: {
			name: 'El lago de Antaño', icon: '🎣', hours: 20, picks: [1, 2],
			game: { type: 'fish', level: 3, theme: 'lago', hint: 'En el lago de Antaño lo que pica lleva concha y no tiene prisa. Espera el «!» y tira con calma.', wild: [{ sp: 'carracosta', lv: [61, 63], w: 4 }, { sp: 'omastar', lv: [61, 63], w: 3 }, { sp: 'kabutops', lv: [61, 63], w: 3 }], wildChance: 0.35 },
			ask: 'La orilla del lago, entre colas de caballo gigantes. Petra te ha prestado una caña de bambú con un anzuelo de hueso.',
			text: 'El lago suelta lo suyo. Una concha espiral enorme se acerca a mirar el anzuelo y se vuelve al fondo, ofendida.',
			wait: 'El lago está quieto como una bandeja. Mejor no molestarlo hasta mañana.',
			table: [
				{ id: 'pearl', w: 14, n: [1, 2] }, { id: 'bigpearl', w: 8, n: [1, 1] }, { id: 'rarebone', w: 6, n: [1, 1] },
				{ id: 'stardust', w: 12, n: [1, 2] }, { id: 'hardstone', w: 8, n: [1, 1] }, { id: 'starpiece', w: 5, n: [1, 1] },
				{ id: 'cometshard', w: 1, n: [1, 1], rare: true }, { id: 'oldamber', w: 1, n: [1, 1], rare: true },
			],
		},
		b06_libertad_playa: {
			name: 'La playa de la Isla Libertad', icon: '🔷', hours: 20, picks: [1, 2],
			game: { type: 'aura', level: 2, theme: 'playa', hint: '{riolu} nota lo que está tibio bajo la arena. Cuanto más caliente, más cerca.' },
			ask: 'La arena de la Isla Libertad está tibia en unos sitios y fría en otros. {riolu} ya está olisqueando.',
			text: '{riolu} desentierra lo suyo y lo deja a tus pies, muy serio. En lo alto del faro, nada. Esta vez.',
			wait: 'La arena está fría por todas partes. Lo tibio se ha ido a dormir.',
			table: [
				{ id: 'pearl', w: 14, n: [1, 2] }, { id: 'shoalshell', w: 12, n: [1, 2] }, { id: 'bigpearl', w: 8, n: [1, 1] },
				{ id: 'starpiece', w: 6, n: [1, 1] }, { id: 'stardust', w: 12, n: [1, 2] }, { id: 'heartscale', w: 6, n: [1, 1] },
				{ id: 'relicsilver', w: 1, n: [1, 1], rare: true }, { id: 'sunstone', w: 2, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		alfa_bandada: {
			name: 'El alfa de la bandada', type: 'Rock', rec: 64,
			cond: 'flag.b06_valle',
			info: [
				{ text: 'En lo alto del risco del Valle de Antaño, el jefe de una bandada de **Aerodactyl** no deja acercarse a nadie a su nido.' },
				{ cond: 'flag.b06_alfa_visto', text: 'Un **Aerodactyl** muy grande, nivel 65, rápido y con dientes de sobra. **Agua**, **Hielo**, **Acero**, **Roca** y **Eléctrico** le vienen bien. No se puede capturar ni huir; si pierdes, puedes volver a intentarlo.' },
				{ cond: 'flag.b06_alfa_visto', text: 'Petra trae pociones en un cubo: te deja curar antes.' },
				{ cond: 'flag.b06_alfa_vencido', text: '✔ Ya te mira de otra manera.' },
			],
		},
		nido_entreno: {
			name: 'El nido (entrenamiento)', npc: 'paleontologa', type: 'Rock', rec: 65,
			cond: 'flag.b06_t3_hecho',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **65**: los becarios de la expedición de la Prof. Encina, con Pokémon del valle.' },
				{ text: 'La jefa de la expedición tiene algo para quien gane tres combates. «Con fuentes primarias», dice.' },
				{ cond: 'flag.b06_premio_nido', text: '✔ Premio conseguido.' },
			],
		},
	},
};
