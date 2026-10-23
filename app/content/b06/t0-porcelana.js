// Bloque 6 · T0 · «La voz de Teselia» (Ciudad Porcelana).
// Convocatoria (Alola, Kanto, Kalos o Johto) → cruce por la Puerta (Rotom no dice «bzzt»; {riolu} gruñe a la Pokédex)
// → recepción de la Gira en el muelle (Prof. Encina, Sera o el directivo, Alexia, Héctor) → la carpa de Brock
// (comida; Handsome llega con Calder custodiado; Camille según Lebrun) → Oshawott y su concha (pesca)
// → el estudio de «Casos Fríos» (Renata, Nico, la Tía Rosa y Simón): entrevista y caso de prueba EN DIRECTO
// → la noche en el hotel → a la mañana, la caja cerrada en la puerta del estudio (cerradura) con la carta 1 del Apuntador
// → fuera de micro, Renata lee tres entradas viejas del Diario y dice una sola frase → la Ruta 4 queda abierta.
// Contratos: secreto/bloques/b06-encargo.md.
//
// CONTRATO DEL APUNTADOR (solo sabe lo dicho en antena). Frases que su carta 1 cita y que se dicen con micro:
//   · «No mires lo que falta: mira lo que sobra» (la deducción del jugador, caso de prueba)
//   · «la taza azul», «diez minutos», «los martes» (datos del caso, leídos en antena)
//   · «Nota para el episodio» (muletilla de Renata, en antena)
// Lo que se dice FUERA DE MICRO en este tramo (no puede saberlo nunca): la lectura del Diario y la frase de Renata,
// el recibo del mensajero, lo que hablan Renata y el jugador de Olmedo por la mañana.

// ---------- Condiciones reutilizadas ----------
const LUC = 'inParty("riolu") || inParty("lucario")';
const TRATO_ROTO = 'flag.b01_trato_sera && !flag.b02_frag_sera';
const SERA_TU = 'flag.b01_trato_sera && flag.b02_frag_sera';
const CRUCE = 'flag.b06_inicio_hecho && !flag.b06_puerta_teselia';
const RECEP = 'flag.b06_recepcion';
const CASO = 'flag.b06_caso_prueba';
const T0 = 'flag.b06_t0_hecho';
const PLUMA = '(flag.b03_vencejo_pluma || flag.b04_vencejo_pluma)';
const TIENE_OSHA = 'owns("oshawott") || owns("dewott") || owns("samurott") || owns("samurotthisui")';
const A_CRUZAR = { label: '🏙️ Cruzar con la Gira a Teselia', sub: 'La Gira se reúne en la Puerta', icon: '🏙️', cond: CRUCE, new: CRUCE, talk: [{ script: 'b06_cruce_aviso' }] };

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== CIUDAD PORCELANA ===================
		porcelana: {
			name: 'Ciudad Porcelana', short: 'Porcelana', region: 'teselia', kind: 'city', map: { x: 52, y: 62 },
			bg: { type: 'city', roofs: ['#8a96a8', '#c9cfd8', '#5a6a8a', '#e9e3d0'], far: '#9ab8d0' },
			desc: 'La ciudad más grande de Teselia es **vertical**. Rascacielos de cristal y piedra clara pegados unos a otros, calles estrechas que siempre están a la sombra, el metro retumbando bajo los pies y un viento de mar que se cuela por los callejones y te despeina en cada esquina.\n\nAl sur, el **muelle**, con sus grúas, sus barcos y la **Puerta Lemnis de Teselia** entre dos almacenes. En el centro, la **Torre Lemnis**, más alta que todas, con la lemniscata encendida en la cima. Por todas partes, gente con prisa y un vaso de café en la mano.\n\nDe la salida norte sale la **Ruta 4**, hacia el desierto y Ciudad Mayólica.',
			descNight: 'Porcelana de noche no se apaga: se enciende de otra manera. Las oficinas dejan una ventana de cada diez con luz, los puestos de Porcehelados cierran tarde y el muelle huele a gasóleo y a sal. Arriba, la lemniscata de la Torre Lemnis gira despacio, azul y plata, y se ve desde cualquier calle. Los tejados están llenos de Pidove dormidos. Y de algo más que no duerme.',
			descs: [{ cond: T0, text: 'Porcelana, con su prisa de siempre. Ya sabes en qué esquina sale el metro, qué puesto de Porcehelados tiene menos cola y que el estudio de *Casos Fríos* está en el sótano del rascacielos de la esquina, detrás de una puerta que no anuncia nada.\n\nLa **Ruta 4** sale por el norte, hacia el desierto. La Torre Lemnis sigue cerrada al público. El muelle, abierto siempre.' }],
			mapNote: 'Puerta Lemnis de Teselia · muelle (pesca) · estudio de «Casos Fríos» · Torre Lemnis (cerrada)',
			onEnter: [{ script: 'b06_llegada', cond: '!flag.b06_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Porcelana', action: { shop: 'tienda_porcelana' } },
				{ label: 'Recepción de la Gira', sub: 'En una nave del muelle, con banderines azul y plata', icon: '🏙️', cond: 'flag.b06_llegada && !' + RECEP, new: 'true', action: { go: 'recepcion_gira_tes' } },
				{ label: 'El muelle', sub: 'Grúas, barcos, pescadores y un olor a gasóleo que no se va', icon: '⚓', action: { go: 'muelle_porcelana' } },
				{ label: 'Puerta Lemnis de Teselia', sub: 'Entre dos almacenes del muelle', icon: '♾️', action: { go: 'puerta_teselia' } },
				{ label: 'La carpa de la Gira', sub: 'Huele a guiso. Alguien cocina para treinta', icon: '🍲', cond: RECEP + ' && !flag.b06_brock_comida', new: 'true', talk: [{ script: 'b06_brock_carpa' }] },
				{ label: 'Brock', sub: 'Friega ollas en la carpa de la Gira, silbando', icon: '🍲', cond: 'flag.b06_brock_comida', talk: [{ cond: T0, script: 'b06_brock_despues' }, { script: 'b06_brock_charla' }] },
				{ label: 'Estudio de «Casos Fríos»', sub: 'Un sótano a dos paradas de metro. Sin cartel', icon: '🎙️', cond: RECEP, new: '!flag.b06_renata_estudio', action: { go: 'estudio_casos' } },
				{ label: '🏨 Hotel de la Gira', sub: 'Dormir hasta mañana', icon: '🏨', cond: CASO + ' && !flag.b06_manana', new: 'true', talk: [{ script: 'b06_hotel' }] },
				{ label: 'Torre Lemnis', sub: 'La lemniscata gira en la cima, día y noche', icon: '🏢', action: { go: 'torre_lemnis_tes' } },
				{ label: 'Una pluma gris en una cornisa', sub: 'A media altura de un rascacielos', icon: '🪶', cond: PLUMA + ' && ' + RECEP + ' && !flag.b06_pluma_cornisa', new: 'true', talk: [{ script: 'b06_pluma_cornisa' }] },
				{ label: 'Correo en el Centro Pokémon', sub: 'Hay algo con tu nombre en el casillero', icon: '✉️', cond: RECEP + ' && flag.b03_fin && !flag.b06_postal_adela', new: 'true', talk: [{ script: 'b06_postal_adela' }] },
				{ label: 'Puesto de Porcehelados', sub: 'La cola da la vuelta a la manzana', icon: '🍦', talk: [{ script: 'b06_porcehelados' }] },
				{ label: 'El callejón de los cerezos', sub: 'Tres árboles entre dos rascacielos', icon: '🌸', action: { gather: 'b06_cerezos_callejon' } },
				{ label: 'Jardines entre rascacielos', sub: 'Hierba alta donde nadie la poda', icon: '🌿', action: { explore: 'grass' } },
				{ label: 'Oficinista: Iker', sub: 'Come un bocadillo de pie, con la corbata al hombro', icon: '⚔️', cond: RECEP, action: { trainer: 'porc_iker' } },
				{ label: 'Pintora callejera: Marta', sub: 'Dibuja la Torre Lemnis con tiza en la acera', icon: '⚔️', cond: RECEP, action: { trainer: 'porc_marta' } },
				{ label: 'Oyente: Valentina', sub: 'Lleva una chapa de «Casos Fríos» en la mochila', icon: '⚔️', cond: CASO, action: { trainer: 'porc_valentina' } },
			],
			rumors: [
				{ text: 'En Porcelana hay más Porcehelados que bancos. Dicen que el de verdad, el bueno, solo se vende los martes y que se acaba a las diez. Los de las oficinas bajan a las nueve y media en manada.' },
				{ text: 'El metro de Porcelana tiene una línea que nadie usa porque no lleva a ningún sitio. Bueno, lleva a una estación que cerraron hace años. Hay quien dice que los trenes siguen parando allí. Hay quien dice que eso son leyendas, y lo dice muy serio.' },
				{ text: 'Los Pidove de los tejados de Porcelana son más listos que los de cualquier otra ciudad. Saben a qué hora salen los oficinistas a comer y dónde se caen más migas. Algunos esperan en el mismo alféizar cada día.' },
				{ cond: RECEP, text: 'La Torre Lemnis de Teselia está cerrada al público «por reformas en las plantas altas». Los del turno de noche del muelle dicen que en las plantas altas no se reforma nada: que allí arriba hay luz todas las noches y que nunca se apaga a la misma hora.' },
				{ cond: RECEP, text: 'Un pódcast de misterio graba en algún sótano de la ciudad. Los martes, en directo. Los taxistas lo ponen en la radio y se pierden las salidas por escuchar el final.' },
				{ cond: CASO, text: 'Desde el martes, en los puestos de Porcehelados ya no se habla de otra cosa: «la taza azul». Una señora de la cola juraba que había sido el portero. Otra decía que eso no lo pensaba nadie desde la primera pista.' },
			],
			encounters: {
				grass: [
					{ sp: 'unfezant', lv: [58, 60], w: 24 },
					{ sp: 'whimsicott', lv: [58, 60], w: 18, time: 'day' },
					{ sp: 'lilligant', lv: [58, 60], w: 14, time: 'day' },
					{ sp: 'lopunny', lv: [58, 60], w: 14 },
					{ sp: 'raticate', lv: [58, 60], w: 18, time: 'night' },
					{ sp: 'delcatty', lv: [58, 60], w: 10 },
					{ sp: 'audino', lv: [59, 61], w: 10 },
					{ sp: 'swoobat', lv: [58, 60], w: 12, time: 'night' },
					{ sp: 'eevee', lv: [58, 59], w: 3 },
					{ sp: 'oricoriopau', lv: [59, 61], w: 4, displaced: true },
					{ sp: 'corvisquire', lv: [58, 60], w: 3, displaced: true },
				],
			},
		},

		// ---------- Puerta Lemnis de Teselia ----------
		puerta_teselia: {
			name: 'Puerta Lemnis de Teselia', short: 'Puerta de Teselia', parent: 'porcelana', kind: 'building',
			bg: { type: 'plaza', landmark: 'gate' },
			desc: 'La Puerta de Teselia se levanta en el muelle, entre dos almacenes de ladrillo rojo con las persianas bajadas. Las columnas son más altas que en ninguna otra región, como si Porcelana no supiera hacer nada pequeño, y la lemniscata zumba un tono más grave.\n\nAl otro lado, borrosos como a través del agua, se turnan el Paseo Marítimo de Hauoli, la plaza de Azafrán, la Torre Prisma y el andén de Trigal. Un técnico de Lemnis con chaleco reflectante y casco atiende una garita de obra.',
			descNight: 'De noche, la Puerta ilumina las fachadas de los almacenes con una luz azul que tiembla, como la del agua en un acuario. Los estibadores del turno de noche pasan por delante sin mirarla. Ya se han acostumbrado. Los Pidove no.',
			mapNote: 'Viaje a Alola (Hauoli), Kanto (Azafrán), Kalos (Luminalia) y Johto (Trigal)',
			spots: [
				{ label: 'Cruzar a Alola (Hauoli)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b06_puerta_teselia', action: { go: 'puerta_alola' } },
				{ label: 'Cruzar a Kanto (Azafrán)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b06_puerta_teselia', action: { go: 'puerta_azafran' } },
				{ label: 'Cruzar a Kalos (Luminalia)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b06_puerta_teselia', action: { go: 'luminalia_plaza' } },
				{ label: 'Cruzar a Johto (Trigal)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b06_puerta_teselia', action: { go: 'puerta_trigal' } },
				{ label: 'El técnico de la garita', sub: 'Chaleco reflectante, casco y un termo', icon: '👷', talk: [{ script: 'b06_puerta_tecnico' }] },
			],
		},

		// ---------- Recepción de la Gira (se cierra tras la escena) ----------
		recepcion_gira_tes: {
			name: 'Recepción de la Gira en Porcelana', short: 'Recepción de la Gira', parent: 'porcelana', kind: 'building',
			bg: { type: 'indoor', wall: '#8a6a5a', floor: '#5a5a6a' },
			desc: 'Una nave del muelle reconvertida para la ocasión: vigas de hierro, ladrillo visto, banderines azul y plata colgados de las grúas de dentro y un escenario de tarimas de obra. Huele a café de máquina y a mar.',
			mapNote: 'Recepción de la Gira (Prof. Encina)',
			onEnter: [{ script: 'b06_recepcion', cond: '!' + RECEP, once: true }],
			spots: [],
		},

		// ---------- El muelle ----------
		muelle_porcelana: {
			name: 'Muelle de Porcelana', short: 'Muelle', parent: 'porcelana', kind: 'area',
			bg: { type: 'coast', far: '#7a96b0', ground: '#7a7a82' },
			desc: 'El muelle de Porcelana es largo, gris y ruidoso: grúas amarillas, contenedores apilados como piezas de construcción, barcos que llegan y se van, y pescadores sentados en el borde con las piernas colgando y un termo al lado, como si el ruido no fuera con ellos.\n\nEntre los pilotes de madera del final, donde el agua es verde y profunda, se juntan los Basculin. Los estibadores dicen que también se junta todo lo que se le cae a la gente.',
			descNight: 'De noche, el muelle es de los estibadores del turno largo y de los pescadores que no tienen sueño. Las grúas tienen una luz roja en la punta. El agua, entre los pilotes, refleja la Puerta en pedacitos azules.',
			descs: [
				{ cond: 'flag.b06_oshawott && !flag.b06_oshawott_tuyo', text: 'El muelle de Porcelana, con sus grúas y su ruido. En la caseta del capataz, sobre una caja de fruta con una manta, duerme un **Oshawott** con su concha bien sujeta en la barriga. Los estibadores lo llaman «el Jefe». Él lo sabe.' },
			],
			mapNote: 'Pesca diaria · Oshawott · entrenadores del muelle',
			spots: [
				{ label: 'Un Oshawott llorando en el borde', sub: 'Mira el agua entre los pilotes', icon: '🦦', cond: RECEP + ' && !flag.b06_oshawott', new: 'true', talk: [{ script: 'b06_oshawott' }] },
				{ label: 'El Oshawott del muelle', sub: 'Duerme en la caseta del capataz, abrazado a su concha', icon: '🦦', cond: 'flag.b06_oshawott && !flag.b06_oshawott_tuyo', talk: [{ script: 'b06_oshawott_visita' }] },
				{ label: 'Pescar entre los pilotes', sub: 'Una caña de préstamo atada a una bita', icon: '🎣', action: { gather: 'b06_muelle_pesca' } },
				{ label: 'Pescador: Paco', sub: 'Lleva treinta años sin pescar nada que quiera contar', icon: '⚔️', action: { trainer: 'muelle_paco' } },
				{ label: 'Estibadora: Olvido', sub: 'Mueve cajas que pesan más que ella', icon: '⚔️', action: { trainer: 'muelle_olvido' } },
				{ label: 'Los estibadores', sub: 'Toman café en la caseta del capataz', icon: '☕', talk: [{ script: 'b06_estibadores' }] },
			],
			rumors: [
				{ text: 'Los Basculin de raya azul y los de raya roja no se mezclan nunca entre los pilotes. Los pescadores del muelle tampoco: los de la izquierda y los de la derecha no se hablan desde una apuesta de hace veinte años.' },
				{ text: 'De vez en cuando sale un Alomomola a la superficie, junto a un barco, y se queda ahí quieto. Dicen que lo hace cuando hay un Pokémon herido cerca, y que nunca se equivoca.' },
			],
		},

		// ---------- El estudio de «Casos Fríos» ----------
		estudio_casos: {
			name: 'Estudio de «Casos Fríos»', short: 'Estudio Casos Fríos', parent: 'porcelana', kind: 'building',
			bg: { type: 'indoor', wall: '#5a3a3a', floor: '#3a2a2a' },
			desc: 'Se baja por una escalera de servicio del rascacielos de la esquina, se pasa junto a los contadores de la luz y se llega a una puerta metálica con una pegatina pequeña: «🎙️ Si está la luz roja, no llames. Si no está, tampoco».\n\nDentro: un sótano con las paredes forradas de moqueta y hueveras, tres micrófonos con su brazo, una mesa de mezclas con más cinta adhesiva que botones, un corcho lleno de fotos y de hilos rojos, una cafetera heroica y cajas. Muchas cajas. El archivo.',
			descNight: 'De noche el estudio huele a café recalentado y a moqueta. Solo hay luz en la mesa de mezclas y en el corcho de los hilos rojos. Por la rejilla de ventilación se oye el metro, muy lejos, cada siete minutos exactos.',
			descs: [{ cond: T0, text: 'El sótano de *Casos Fríos*: moqueta, hueveras, tres micrófonos, la cafetera heroica y el corcho de los hilos rojos. En el corcho hay una foto nueva, sujeta con una chincheta: la tuya, de la noche del directo. Y, aparte, en una esquina, un sobre color crema con una chincheta amarilla. Nadie lo ha quitado.' }],
			mapNote: 'Renata, Nico y la Tía Rosa · negocio «Estudio Casos Fríos»',
			onEnter: [{ script: 'b06_estudio_entrada', cond: RECEP + ' && !flag.b06_renata_estudio', once: true }],
			spots: [
				{ label: 'La caja de la puerta', sub: 'Cerrada con una cerradura de botones', icon: '📦', cond: 'flag.b06_manana && !flag.b06_apuntador_1', new: 'true', talk: [{ script: 'b06_caja' }] },
				{ label: 'Renata', sub: 'Escribe en el corcho con un rotulador en la boca', icon: '🎙️', cond: 'flag.b06_renata_estudio', new: '!' + CASO, talk: [
					{ cond: '!' + CASO, script: 'b06_renata_espera' },
					{ cond: 'flag.b06_manana && !flag.b06_apuntador_1', script: 'b06_renata_caja' },
					{ cond: 'flag.b06_apuntador_1 && !flag.b06_renata_diario', script: 'b06_renata_diario' },
					{ cond: T0, script: 'b06_renata_despues' },
					{ script: 'b06_renata_noche' },
				] },
				{ label: 'Renata: un combate amistoso', sub: '«Para ver cómo piensas cuando no hablas»', icon: '⚔️', cond: CASO + ' && !beat("renata_1")', talk: [{ script: 'b06_renata_reto' }] },
				{ label: 'Nico Ferrer', sub: 'Pelea con un cable que no quiere que lo enchufen', icon: '🎧', cond: 'flag.b06_renata_estudio', talk: [{ cond: T0, script: 'b06_nico_despues' }, { script: 'b06_nico_charla' }] },
				{ label: 'La Tía Rosa', sub: 'Hace punto con los cascos puestos', icon: '🧶', cond: 'flag.b06_renata_estudio', talk: [{ script: 'b06_rosa_charla' }] },
				{ label: 'Simón', sub: 'Repasa sus notas con un bolígrafo rojo', icon: '🎧', cond: 'flag.b06_simon_antena', talk: [{ script: 'b06_simon_charla' }] },
				{ label: 'El corcho de los hilos rojos', icon: '📌', cond: 'flag.b06_renata_estudio', talk: [{ script: 'b06_corcho' }] },
				{ label: 'El negocio del estudio', sub: 'Renata busca socio. «O socia. O socie»', icon: '🎙️', cond: CASO, action: { venture: 'b06_estudio' } },
			],
			rumors: [
				{ text: 'La cafetera del estudio es de la Tía Rosa, tiene nombre (Doña Fermina) y cuarenta años. Nadie la ha limpiado por dentro nunca. Nico dice que por eso el café sabe a pódcast.' },
			],
		},

		// ---------- Torre Lemnis de Teselia (vestíbulo; cerrada hasta T5) ----------
		torre_lemnis_tes: {
			name: 'Torre Lemnis de Teselia', short: 'Torre Lemnis', parent: 'porcelana', kind: 'building',
			bg: { type: 'indoor', wall: '#3a4a6a', floor: '#c9cfd8' },
			desc: 'La entrada de la torre más alta de Porcelana: un vestíbulo de mármol blanco tan grande que tu voz tarda en volver, la lemniscata de metal en la pared del fondo y una **puerta de cristal** que no se abre. Detrás del cristal, los ascensores, quietos.\n\nUn guardia de Lemnis, de pie junto a la puerta, finge que no te mira. Un cartel: «Cerrado al público por reformas en las plantas altas. Disculpen las molestias».',
			descNight: 'De noche el vestíbulo está a oscuras, salvo la lemniscata de la pared, que brilla sola. El guardia es otro. Hace lo mismo: fingir que no te mira.',
			mapNote: 'Cerrada al público',
			spots: [
				{ label: 'El guardia de la puerta', sub: 'Uniforme azul medianoche, auricular en la oreja', icon: '💂', talk: [{ script: 'b06_torre_guardia' }] },
				{ label: 'La puerta de cristal', icon: '🚪', talk: [{ script: 'b06_torre_cristal' }] },
			],
		},
	},

	// =====================================================================
	// PARCHES A LUGARES DE BLOQUES ANTERIORES (cruzar con la Gira)
	// =====================================================================
	patches: {
		puerta_alola: { spots: [A_CRUZAR] },
		puerta_azafran: { spots: [A_CRUZAR] },
		luminalia_plaza: { spots: [A_CRUZAR] },
		puerta_trigal: { spots: [A_CRUZAR] },
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Renata (amistoso, opcional, tras el caso de prueba) -----
		renata_1: { name: 'Renata', cls: 'Detective del pódcast', npc: 'renata', ai: 4, iv: 27, reward: 3660, terrain: 'indoor',
			team: [
				{ sp: 'watchog', lv: 59, moves: ['hyperfang', 'crunch', 'hypnosis', 'thunderpunch'], ability: 'analytic', item: 'sitrusberry', nature: 'adamant', iv: 26 },
				{ sp: 'liepard', lv: 59, moves: ['knockoff', 'uturn', 'fakeout', 'playrough'], ability: 'prankster', nature: 'jolly', iv: 27 },
				{ sp: 'gothitelle', lv: 60, moves: ['psychic', 'shadowball', 'thunderbolt', 'calmmind'], ability: 'competitive', item: 'leftovers', nature: 'modest', iv: 28 },
				{ sp: 'zoroark', lv: 61, moves: ['nightdaze', 'flamethrower', 'sludgebomb', 'focusblast'], ability: 'illusion', item: 'lifeorb', nature: 'timid', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Nota para el episodio: «la invitada propone un combate para ver cómo piensa el invitado cuando no habla». Esto no se emite. Bueno, igual sí. Depende de quién gane. ¡Cool, cool, cool!',
			win: '…Me fastidia. Me fastidia muchísimo. Me encanta. Has visto la ilusión a la primera, ¿verdad? No me contestes. Lo apunto como «sí».',
			lose: 'Ah. Eso no lo has deducido. Pasa. A mí también me pasa. Con menos frecuencia. Revancha cuando quieras.' },

		// ----- Ciudad -----
		porc_iker: { name: 'Iker', cls: 'Oficinista', ai: 3, reward: 2440,
			team: [
				{ sp: 'conkeldurr', lv: 60, moves: ['drainpunch', 'stoneedge', 'icepunch', 'knockoff'], ability: 'guts' },
				{ sp: 'unfezant', lv: 61, moves: ['bravebird', 'uturn', 'facade', 'quickattack'] },
			],
			intro: 'Tengo veinte minutos para comer. Me sobran cinco. En Porcelana, cinco minutos son un combate entero. ¡Rápido, que me cierran el ascensor!',
			win: 'Ya está. Ni he terminado el bocadillo. Esta ciudad no te deja ni perder tranquilo.',
			look: { hair: 'short', hairColor: '#2a2420', outfit: '#3a4a6a', outfit2: '#e9e8e0', skin: 2, eyesStyle: 'sleepy', mouth: 'flat', acc: 'tie' } },
		porc_marta: { name: 'Marta', cls: 'Pintora callejera', ai: 3, reward: 2440,
			team: [
				{ sp: 'leavanny', lv: 60, moves: ['leafblade', 'xscissor', 'knockoff', 'swordsdance'] },
				{ sp: 'whimsicott', lv: 61, moves: ['moonblast', 'energyball', 'uturn', 'taunt'] },
			],
			intro: 'Llevo una semana dibujando la Torre Lemnis en la acera. Cada noche la lluvia la borra y cada mañana la vuelvo a pintar. Hoy me ha salido torcida. Desahógate tú, que yo ya no puedo.',
			win: 'Mira, ahora sí me sale recta. Era eso: me faltaba perder.',
			look: { hair: 'bun', hairColor: '#c4473a', outfit: '#e9e3d0', outfit2: '#5aa36b', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'freckles' } },
		porc_valentina: { name: 'Valentina', cls: 'Oyente', ai: 3, reward: 2480,
			team: [
				{ sp: 'zebstrika', lv: 61, moves: ['wildcharge', 'overheat', 'lowkick', 'voltswitch'] },
				{ sp: 'swanna', lv: 61, moves: ['hurricane', 'surf', 'roost', 'icebeam'] },
				{ sp: 'cinccino', lv: 62, moves: ['tailslap', 'bulletseed', 'rockblast', 'uturn'], ability: 'skilllink' },
			],
			intro: '¡Eres {el|la|le} del martes! ¡{El|La|Le} de la taza azul! Lo escuché en el autobús y me pasé tres paradas. Si te gano, mañana lo cuento en el buzón de oyentes.',
			win: 'Ya. Ya. No lo cuento. Pero que conste que lo de la taza lo vi venir yo también. Más o menos. A la tercera pista.',
			look: { hair: 'ponytail', hairColor: '#3a2a1e', outfit: '#5aa36b', outfit2: '#f2c84a', skin: 4, eyesStyle: 'happy', mouth: 'open', acc: 'headphones' } },

		// ----- Muelle -----
		muelle_paco: { name: 'Paco', cls: 'Pescador', ai: 2, reward: 2400,
			team: [
				{ sp: 'seismitoad', lv: 59, moves: ['earthpower', 'sludgewave', 'scald', 'hydropump'] },
				{ sp: 'basculin', lv: 60, moves: ['wavecrash', 'crunch', 'aquajet', 'headsmash'] },
			],
			intro: 'Treinta años pescando en este muelle y lo más grande que he sacado es una bota. Una bota buena, eso sí. De piel. ¡Si me ganas, te la enseño!',
			win: 'No te la enseño. Me da vergüenza. Es una bota muy buena, pero sigue siendo una bota.',
			look: { hair: 'cap', hairColor: '#9aa0a8', outfit: '#5a6a3a', outfit2: '#c9a66b', skin: 2, eyesStyle: 'sleepy', mouth: 'smile', acc: 'beard' } },
		muelle_olvido: { name: 'Olvido', cls: 'Estibadora', ai: 3, reward: 2480,
			team: [
				{ sp: 'jellicent', lv: 61, moves: ['scald', 'shadowball', 'recover', 'willowisp'] },
				{ sp: 'alomomola', lv: 60, moves: ['scald', 'wish', 'protect', 'knockoff'] },
				{ sp: 'excadrill', lv: 62, moves: ['earthquake', 'ironhead', 'rockslide', 'swordsdance'] },
			],
			intro: 'Me llamo Olvido y no se me olvida nada. Ni una caja, ni una cara, ni un combate. Este lo vas a recordar tú también.',
			win: 'Apuntado. Tu cara y tu equipo. No se me va a olvidar. Es lo que tiene el nombre.',
			look: { hair: 'buzz', hairColor: '#2a2420', outfit: '#c4743a', outfit2: '#3a3a4a', skin: 4, eyesStyle: 'sharp', mouth: 'flat', acc: 'beanie' } },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== INICIO: LA CONVOCATORIA ===================
		b06_inicio: [
			{ if: 'flag.b06_inicio_hecho', then: [{ end: true }] },
			{ set: { 'flag.b06_inicio_hecho': true } },
			{ quest: 'b06_m1', stage: 'puerta' },
			{ say: 'rotom', text: '¡Bzzt! ¡Aviso de la Gira! Te lo leo con voz de telediario: «Para los participantes clasificados: **la Gira Interregional continúa en Teselia**. Se cruza por cualquier Puerta Lemnis. Recepción en el muelle de **Ciudad Porcelana**. Se recomienda calzado cómodo: allí la gente anda muy deprisa».' },
			{ say: 'rotom', text: '¡TESELIA! ¡Rascacielos! ¡Puentes que cantan! ¡Un desierto con ruinas! ¡Y la región de Renata! Si me entrevista, ¿qué digo? ¿Tengo voz de radio? Prueba, prueba… ¡Bzzt! No. Tengo voz de Pokédex. Es parecida.' },
			{ text: '{riolu} levanta la cabeza al oír «Puerta». No se tensa. Mira la pantalla de la Pokédex un segundo más de lo normal, y luego mira hacia otro lado.', cond: LUC },
			{ choice: [
				{ text: 'Ir ya a la Puerta', then: [{ call: 'b06_cruce' }] },
				{ text: 'Todavía no (preparar el equipo)', then: [
					{ say: 'rotom', text: '¡Va! Cuando quieras, vamos a cualquier **Puerta Lemnis**: la de Hauoli, la de Azafrán, la de Luminalia o la de Trigal. Todas llevan a Porcelana. Yo voy ensayando la voz de radio.' },
				] },
			] },
		],
		b06_cruce_aviso: [
			{ text: 'Los aspirantes de la Gira esperan delante de la lemniscata con abrigos al brazo: les han dicho que en Porcelana sopla el viento. Un técnico de Lemnis reparte planos del metro. Le da uno a {riolu}. {riolu} lo dobla en cuatro, con mucho cuidado, y se lo devuelve.', cond: LUC },
			{ text: 'Los aspirantes de la Gira esperan delante de la lemniscata con abrigos al brazo: les han dicho que en Porcelana sopla el viento. Un técnico de Lemnis reparte planos del metro.', cond: '!(' + LUC + ')' },
			{ choice: [
				{ text: 'Cruzar a Teselia', then: [{ call: 'b06_cruce' }] },
				{ text: 'Todavía no', then: [{ say: 'rotom', text: 'Va. Me guardo el plano del metro. Ya me lo he aprendido. Tiene once líneas y una que no lleva a ningún sitio. Qué raro.' }] },
			] },
		],

		// =================== EL CRUCE (cinemática de llegada) ===================
		b06_cruce: [
			{ if: 'flag.b06_puerta_teselia', then: [{ end: true }] },
			{ cutscene: { bg: { type: 'plaza', landmark: 'gate' }, start: 'fade', time: 'manana', cam: 'still', frames: [
				{ cam: 'still', text: 'La Puerta, a primera hora. Treinta aspirantes con abrigo al brazo. Al otro lado de la lemniscata no se ve playa, ni bosque, ni andén: se ven **rascacielos**, muy juntos, y un cielo gris que corre.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.36, enter: 'left' }], cond: LUC, cam: 'push', text: '{riolu} cruza a tu lado, hombro con hombro. Las orejas, quietas.' },
				{ fx: ['rays', 'flash'], cam: 'push', text: 'Cruzas. Luz. Un tirón en el estómago, como en un ascensor que baja demasiado deprisa.' },
				{ cam: 'still', text: 'Y luego, silencio. Esperas el «bzzt… sincronizando…» de siempre. No llega. La Pokédex está encendida, tranquila, como si no hubiera cruzado nada.' },
				{ bg: { type: 'city', roofs: ['#8a96a8', '#c9cfd8', '#5a6a8a', '#e9e3d0'], far: '#9ab8d0' }, fx: 'wipe', weather: 'leaves', big: true, text: 'Ciudad Porcelana', sub: 'Teselia', hold: 2400, cam: 'still' },
				{ fx: 'light', cam: 'pull', text: 'Viento. Mucho viento, salado, que baja por las calles como por un tobogán. Grúas, contenedores, gaviotas y, detrás, una pared de rascacielos de cristal que no deja ver el cielo.' },
				{ cam: 'pan-up', text: 'En medio de todos, más alta que ninguna, una torre con una lemniscata azul y plata en la cima, girando despacio. La **Torre Lemnis**.' },
			] } },
			{ set: { 'flag.b06_puerta_teselia': true } },
			{ quest: 'b06_m1', stage: 'porcelana' },
			{ go: 'porcelana' },
		],
		// onEnter de Porcelana (primera vez): la pista de mundo. {riolu} gruñe a la Pokédex.
		b06_llegada: [
			{ set: { 'flag.b06_llegada': true } },
			{ if: LUC, then: [
				{ text: 'Das tres pasos por el muelle y {riolu} se para en seco.' },
				{ text: 'Mira la Pokédex. No a ti: a la Pokédex, que flota a tu lado. Enseña los colmillos y **gruñe**. Bajito, muy hondo, un segundo. Es un ruido que no le habías oído nunca. Ni con Lemnis, ni con el Team Rocket, ni con nadie.' },
				{ text: 'Y luego, nada. Se sacude, se rasca una oreja y echa a andar como si no hubiera pasado. Como si lo hubieras soñado.' },
			], else: [
				{ text: 'Das tres pasos por el muelle y la Poké Ball de {riolu} se sacude en tu cinturón. Una vez, fuerte, como un golpe en una puerta. La Pokédex, a tu lado, se queda quieta.' },
				{ text: 'Y luego, nada. La Poké Ball se queda tranquila. Como si lo hubieras soñado.' },
			] },
			{ say: 'rotom', text: '¿Qué le pasa? ¿Le he dicho algo? Yo no he dicho nada. —Pausa—. ¿He dicho algo? ¡No he dicho nada! Bzzt. Ay. Eso sí lo he dicho.' },
			{ text: 'Un chico de la Gira con un chaleco azul y una carpeta se les acerca entre el viento.' },
			{ say: 'empleado_gira', text: '¡Bienvenid{o|a|e} a Porcelana! La recepción es en la nave tres del muelle, la de los banderines. Empieza en diez minutos. —Se le vuela un papel de la carpeta. No lo persigue—. Aquí se vuelan los papeles. Uno se acostumbra.' },
		],
		b06_puerta_tecnico: [
			{ if: '!flag.b06_puerta_teselia', then: [{ end: true }] },
			{ text: 'El técnico de la garita lleva el casco puesto aunque no hay nada encima. Tiene un termo de café, una radio con el pódcast de *Casos Fríos* muy bajito y la cara de alguien que lleva tres turnos seguidos.' },
			{ text: '«¿Volver? A Alola, a Kanto, a Kalos o a Johto. Cuando quiera. —Señala la lemniscata con el termo—. Esta es la más grande de todas. La pidieron así desde arriba. En Porcelana, si no es lo más grande, no vale». Se encoge de hombros. «Yo solo la enciendo».' },
		],

		// =================== RECEPCIÓN DE LA GIRA ===================
		b06_recepcion: [
			{ set: { 'flag.b06_recepcion': true } },
			{ text: 'La nave tres está llena. Aspirantes de la Gira con el abrigo puesto, periodistas, curiosos del muelle y una máquina de café que no da abasto. En el escenario de tarimas, bajo una grúa de dentro con banderines, alguien prueba el micro: «sí, sí, ¿se me oye? Bueno, da igual, hablo alto».' },
			{ text: 'Sube una mujer con bata blanca abierta sobre una blusa verde, el pelo castaño suelto y una sonrisa enorme, de las que no caben en la cara. Viene corriendo y se le caen tres folios del atril antes de empezar. Los deja en el suelo.' },
			{ say: 'encina', text: '¡Hola, hola, hola! ¡Bienvenidos a Teselia! Soy la **Prof. Encina**. Estudio de dónde vienen los Pokémon, y esta semana, además, soy su anfitriona. Me han dado un discurso escrito. —Mira los folios del suelo—. Lo improviso.' },
			{ say: 'encina', text: 'En Teselia, el Circuito tiene dos medallas para ustedes. La primera, en **Ciudad Mayólica**, cruzando la **Ruta 4** por el borde del desierto: la líder es **Camila**, tipo **Eléctrico**. Es rapidísima. En la pasarela y en el campo. Sobre todo en la pasarela.' },
			{ say: 'encina', text: 'La segunda, en **Ciudad Fayenza**… cuando terminen las obras del puente. El líder de intercambio ya está aquí. Les va a dar de comer antes que de pelear. Ya lo verán.' },
			{ say: 'encina', text: 'Y una cosa más, que me la piden siempre: Teselia tiene Pokémon que no se ven en ningún otro sitio. Si ven algo raro, apúntenlo. Si ven algo muy raro, vengan a contármelo. ¡Me encanta lo raro! ¡Bienvenidos!' },
			// ----- Lemnis: Sera o el directivo -----
			{ if: TRATO_ROTO, then: [
				{ text: 'Detrás de Encina sube un hombre de traje azul brillante con la corbata volada por encima del hombro. Habla mirando a un punto fijo del techo, como quien lee un cartel que solo ve él.' },
				{ say: 'directivo_lemnis', as: 'Directivo de Lemnis Teselia', text: 'Lemnis da la bienvenida a la Gira a la región donde todo se construye hacia arriba. La Puerta de Teselia es la más grande del Circuito. —Pausa para aplausos. No llegan—. Y la Torre Lemnis, la más alta. Está cerrada por reformas. Pero es la más alta.' },
				{ text: 'Al fondo de la nave, junto a la puerta, con un abrigo largo azul medianoche y gafas oscuras aunque está nublado, está **Serafina Lemnis**. No sube. No aplaude. Cuando tus ojos se cruzan con los suyos, sale a la calle sin prisa.' },
			], else: [
				{ text: 'Detrás de Encina sube una mujer joven con abrigo largo azul medianoche, guantes blancos y la melena negra recta, que el viento de la puerta no consigue despeinar. **Serafina Lemnis**. La nave se calla sola.' },
				{ say: 'sera', text: 'Lemnis patrocina la llegada de la Gira a Teselia. Aquí está nuestra Puerta más grande y nuestra torre más alta. —Pausa medida—. La torre está cerrada al público por reformas. Les ruego que no intenten subir. Lo digo porque alguno lo intentará.' },
				{ if: SERA_TU, then: [
					{ text: 'Al bajar del escenario pasa a tu lado y se para. No del todo. Lo justo.' },
					{ say: 'sera', text: 'La pieza que me diste en Iris. —Muy bajo—. En Alola el inventario decía «en uso». Aquí dice «trasladada». No dice adónde. —Se ajusta un guante—. Algo se mueve en Teselia que no pasa por mi mesa. No me gusta que haya cosas que no pasan por mi mesa.' },
					{ choice: [
						{ text: '«¿Me lo estás contando a mí?»', then: [
							{ say: 'sera', text: 'Te lo estoy contando a ti porque tú no trabajas para nadie que yo conozca. —Te mira por encima de las gafas—. Es un elogio. No lo repitas.' },
							{ af: { sera: 2 } },
						] },
						{ text: '«A lo mejor deberías mirar en la torre.»', then: [
							{ say: 'sera', text: 'La torre es mía. —Pausa—. Las plantas altas, según el organigrama, también. —Otra pausa, más larga—. Lo miraré. Si lo encuentro, no te lo diré. Si no lo encuentro, tampoco.' },
						] },
					] },
				] },
				{ if: '!flag.b01_trato_sera', then: [
					{ text: 'Al bajar pasa junto a ti sin detenerse. Un gesto de cabeza, exacto, de un centímetro. Y sigue andando hacia la puerta, donde la espera un coche negro con el motor encendido.' },
				] },
			] },
			// ----- Alexia: el titular -----
			{ text: 'Cuando la gente se dispersa hacia la máquina de café, alguien te pone un periódico doblado delante de la cara. **Alexia**, con una bufanda de lana de tres vueltas y la nariz roja del viento.' },
			{ say: 'alexia', text: '¡Mariquita! ¡En Teselia! Mira, te he traído la prensa de Alola. La de esta semana. Para que veas lo que dejaste atrás.' },
			{ if: 'flag.b05_luz_necrozma', then: [
				{ text: 'En la portada, a toda página, una foto del cielo de Poni ardiendo de colores: «**Alola recupera su cielo de golpe**».' },
				{ say: 'alexia', text: 'Y escucha esto: aquí, en Teselia, los del observatorio vieron esa misma noche una «estrella nueva». Que se movía. Que se movía muy deprisa. Y luego ya no estaba. —Dobla el periódico—. Me encanta cuando los astrónomos no saben qué decir.' },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ text: 'En la portada, una foto del Paraíso Æther de noche, todo iluminado: «**Æther custodia un hallazgo**». Debajo, más pequeño: «La Fundación no hace comentarios».' },
				{ say: 'alexia', text: '«No hace comentarios». Cuatro palabras. Llevo diez años en esto y no hay frase que me guste más. Quiere decir que hay comentario. Y gordo.' },
			] },
			{ if: 'flag.b05_luz_leilani', then: [
				{ text: 'En la portada, una foto borrosa de la Aldea Marina con un resplandor raro sobre el mar: «**Ingeniera de Akala abre un ultraumbral un minuto**». Debajo, una foto de carné de Leilani, con la cara manchada de grasa.' },
				{ say: 'alexia', text: 'Se la pedí para el artículo. Me mandó esa. Dice que es la única en la que sale «con cara de ingeniera». —Se ríe—. Me cae genial. Le escribí. Me contestó con un dibujo de una tuerca.' },
			] },
			{ if: '!flag.b05_luz_necrozma && !flag.b05_luz_aether && !flag.b05_luz_leilani', then: [
				{ text: 'En la portada, el atardecer de Hauoli y un titular sobre la Gira: «**Los novatos del Circuito, de isla en isla**».' },
			] },
			{ if: 'flag.b01_prensa_lemnis', then: [
				{ say: 'alexia', text: 'Por cierto, Lemnis me ha mandado otra vez las «preguntas sugeridas» para la Gira. Las he usado de posavasos. Para el café. Que es de Lemnis también, ahora que lo pienso.' },
			] },
			{ if: 'flag.b01_prensa_verdad', then: [
				{ say: 'alexia', text: 'Y sigues siendo la única persona de la Gira que me contó lo que vio el primer día. Te lo digo cada región. Te lo voy a seguir diciendo. Es mi forma de dar las gracias sin tener que darlas.' },
			] },
			{ say: 'alexia', text: 'Me quedo en Porcelana unos días. Dicen que aquí graba un pódcast de misterio en un sótano. Los periodistas de verdad no escuchamos pódcasts. —Pausa—. Lo escucho todos los martes.' },
			// ----- Héctor -----
			{ text: 'Entre la gente aparece alguien con capa. Una capa de verdad, roja, hecha con una cortina, con una máscara de cartón pintada de plata y unas botas de agua. Debajo de la capa, una camisa de oficina con corbata.' },
			{ say: 'hector', text: '¡{jugador}! ¡Soy yo! ¡Héctor! Bueno, ahora no: ahora soy **Capitán Batista**, versión Teselia. El traje lo he hecho yo. La capa era la cortina del salón. Mi madre aún no lo sabe.' },
			{ if: 'flag.p7_hector', then: [
				{ say: 'hector', text: 'Le he dejado la taquilla del castillo a un sobrino del Conde. Bueno, el Conde dice que es su sobrino. Tiene su misma cara. Y he pedido otra excedencia. Dos excedencias en un año. En la aseguradora creen que estoy enfermo. De algo, sí.' },
			], else: [
				{ say: 'hector', text: 'He pedido una excedencia en la aseguradora. Tres semanas. Me han preguntado para qué y he dicho «para formarme». Es verdad. Me estoy formando como héroe.' },
			] },
			{ say: 'hector', text: 'He venido por una persona. ¡Camila! La líder de Mayólica. Sale en las revistas con un traje que brilla, sube a la pasarela y se ilumina el estadio. ¡Eso es un héroe! Uno que se enciende. —Se toca la capa—. Yo, de momento, me enciendo poco.' },
			{ say: 'hector', text: 'Si llegas a Mayólica antes que yo, ¿le dirías que hay un fan con capa que quiere conocerla? Sin presión. Mucha presión. Me voy, que el viento me está llevando la capa hacia el mar.' },
			{ quest: 'b06_m1', stage: 'hecha', done: true },
			{ text: 'Cuando sales de la nave, la Pokédex vibra. Un mensaje, todo en mayúsculas, con un emoji de micrófono.' },
			{ say: 'renata', as: 'Renata (mensaje)', text: '«TESTIGO. ESTÁS EN MI CIUDAD. LO SÉ PORQUE TE HE VISTO EN LA FOTO DE LA RECEPCIÓN, DETRÁS DE UN SEÑOR CON CAPA. ESTUDIO DE CASOS FRÍOS: SÓTANO DEL RASCACIELOS DE LA ESQUINA, A DOS PARADAS DE METRO. HOY ES MARTES. LOS MARTES HAY DIRECTO. NO ES CASUALIDAD. VEN.»' },
			{ say: 'rotom', text: '¡Bzzt! ¡Nos ha invitado! ¡A la radio! Bueno, al pódcast. ¡Es como la radio pero en un sótano! —Pausa—. ¿Tengo que hablar? ¿Puedo pitar? Pitar es casi hablar.' },
			{ text: 'Por la puerta de la nave entra un olor a guiso que no tiene nada que ver con el muelle. Viene de la **carpa de la Gira**, al lado. Alguien cocina para treinta.' },
			{ diary: 'Hoy mi entrenador{|a|e} y yo llegamos a Teselia. ¡Ciudad Porcelana es altísima! Hay que mirar hacia arriba todo el rato y se te cansa el cuello. Bueno, a mí no, que no tengo. Pero a {jugador} sí.\n\nLa recepción fue en una nave del muelle con grúas por dentro. La anfitriona es la Prof. Encina, que habla muy deprisa y se ríe mucho. Dijo que la primera medalla está en Ciudad Mayólica, cruzando el desierto. También vimos a Alexia, que nos trajo el periódico, y a Héctor con una capa nueva.\n\nY Renata nos ha invitado a su pódcast. ¡En directo! Esta noche. Voy a practicar mi mejor pitido.', cond: 'flag.b01_diario' },
			{ go: 'porcelana' },
		],

		// =================== LA CARPA DE BROCK (+ Handsome y Calder) ===================
		b06_brock_carpa: [
			{ if: 'flag.b06_brock_comida', then: [{ end: true }] },
			{ set: { 'flag.b06_brock_comida': true } },
			{ text: 'La carpa de la Gira es una lona azul y plata atada a dos farolas, con mesas plegables, bancos y una olla del tamaño de una bañera puesta sobre tres hornillos. Detrás de la olla, con un delantal que dice «EL JEFE DE COCINA ES EL LÍDER», hay un hombre moreno, alto, de ojos que parecen siempre cerrados.' },
			{ say: 'brock', text: '¡{jugador}! ¡Aquí! ¡Siéntate, siéntate! —Te pone un cuenco delante antes de que digas nada—. **Guiso de Porcelana**. Bueno, se llamará así cuando me salga bien. Lleva pescado del muelle, papas, pimentón y una cosa que me ha vendido un señor en la calle sin decirme qué era.' },
			{ say: 'brock', text: 'La última vez que te vi tenías una medalla. La mía. —Se cruza de brazos, sonriendo—. Y ahora vienes con el Circuito entero en el bolsillo y una Puerta a la espalda. Así me gusta. Cuando vuelva a Kanto, presumiré de que te di la primera. Ya lo hago, pero con más datos.' },
			{ if: LUC, then: [
				{ text: 'Brock se agacha delante de {riolu} y le pone un cuenco más pequeño, con el pescado sin espinas. {riolu} lo huele, lo mira a él y se lo come entero sin respirar.' },
				{ say: 'brock', text: 'Ese Lucario come como un Pokémon que sabe lo que es pasar hambre. —Se lo dice a {riolu}, no a ti—. Aquí no te va a faltar. Mientras yo tenga olla, no.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
			{ say: 'brock', text: 'Me han dado el gimnasio de **Fayenza**. Intercambio otra vez. Lo que pasa es que Fayenza está al otro lado de un puente, y el puente está en obras. Dicen que lo bajan «cuando terminen». Llevo una semana aquí cocinando para la Gira hasta que terminen.' },
			{ say: 'brock', text: 'Así que primero ve a ver a Camila, a Mayólica. Yo te espero en Fayenza. Te lo aviso: allí no te voy a dejar ganar con una medalla. Allí tengo un Pokémon que no cabe en esta carpa.' },
			// ----- Handsome trae a Calder -----
			{ text: 'Por la entrada de la carpa aparecen dos personas. Una es un hombre con gabardina, sombrero y un bigote que, esta vez, parece suyo. La otra es un hombre de unos cincuenta años con barba canosa, chaqueta de lino arrugada y un telescopio plegable que no le han dejado traer: solo la funda, vacía, colgada al hombro.' },
			{ say: 'handsome', text: '¡Brock! ¡Dos cuencos! Uno para Handsome y uno para el señor. El señor paga Handsome. —Se sienta. Te ve—. ¡Ah! ¡{jugador}! Handsome sabía que estarías donde hubiera comida.' },
			{ say: 'handsome', text: 'Te presento… bueno, ya lo conoces. El doctor **Calder Wynn** está bajo custodia de la Policía Internacional. Lo he recogido en Poni. La kahuna Hela me lo ha dado con una lista de cosas que no puede hacer. Es larga. Una es «mirar el cielo sin permiso».' },
			{ say: 'calder', text: 'Buenas tardes, {jugador}. —La voz, suave como siempre. Se sienta despacio, con las manos sobre la mesa, a la vista—. Me han traído de testigo. Dicen que en Teselia hay máquinas que quizá reconozca. Espero no reconocerlas. Me temo que sí.' },
			{ if: 'flag.b05_calder_verdad', then: [
				{ say: 'calder', text: 'Antes de salir de Poni, Hela me dio algo para usted. Una carta. —Se toca el bolsillo de la chaqueta—. Me pidió que se la diera cuando estuviéramos los dos en un sitio con frío. Aquí no hace bastante. Hela es muy precisa con esas cosas.' },
				{ say: 'calder', text: 'Y Lani… la señorita Kahale. —Se corrige solo—. No sé si querrá saber de mí. Si la ve, no le diga que he preguntado. O dígaselo. No lo sé. Llevo nueve años sin saber qué decirle; puedo esperar un poco más.' },
			], else: [
				{ say: 'calder', text: 'Hice cosas en Alola de las que no estoy orgulloso. Las estoy contando, una a una, a quien me pregunta. —Mira el guiso—. Es más difícil que medir la luz. Y se mide peor.' },
			] },
			{ text: 'Brock le pone el cuenco delante. Calder lo mira un rato, sin tocarlo, como quien no está acostumbrado a que le den nada.' },
			{ say: 'brock', text: 'Come. Aquí no se pregunta quién eres hasta el postre. —Le pone una cuchara en la mano—. Y de postre no hay.' },
			{ say: 'calder', text: '…Gracias. —Prueba. Cierra los ojos—. Pimentón. Y una cosa que no sé qué es.' },
			{ say: 'brock', text: '¡Yo tampoco! ¡Ya somos dos!' },
			{ set: { 'flag.b06_handsome_calder': true } },
			// ----- Camille, según Lebrun -----
			{ if: 'flag.b04_lebrun_detenido', then: [
				{ say: 'handsome', text: 'Y otra cosa. En **Mayólica** juegan un torneo juvenil de voleibol. Juega Camille. —Baja la voz—. Su padre me lo pidió. Desde la sala sin ventanas. Que vaya alguien a verla. Que vaya alguien que aplauda.' },
				{ say: 'handsome', text: 'Handsome va a ir. Handsome ha hecho una pancarta. —Saca un cartón enrollado—. Pone «¡ÁNIMO, CAMIL!». Se le acabó el rotulador. Dice Brock que la E se adivina.' },
			] },
			{ if: 'flag.b04_lebrun_cebo', then: [
				{ say: 'handsome', text: 'Y otra cosa. En **Mayólica** juegan un torneo juvenil de voleibol. Juega Camille. Lebrun la acompaña. —Pausa—. Handsome también va. Dos filas más atrás. Con otro bigote. Son las órdenes que le doy a Lebrun y las que me doy a mí.' },
				{ say: 'handsome', text: 'Si los ves… sé amable con ella. Con él, como quieras. Pero delante de ella, amable.' },
			] },
			{ if: 'flag.b04_lebrun_libre', then: [
				{ say: 'handsome', text: 'Y otra cosa. La chica, Camille, me escribió. A la oficina de Kalos. Juega un torneo juvenil de voleibol en **Mayólica**. —Saca una postal—. Pone: «Por si alguien quiere venir. Cualquiera». Subrayado «cualquiera».' },
				{ say: 'handsome', text: 'Handsome cree que alguien va a ir. Alguien que no quiere que lo vean. —Se toca el bigote—. Handsome sabe mucho de no querer que lo vean. Lo hace fatal.' },
			] },
			{ if: '!flag.b04_lebrun_detenido && !flag.b04_lebrun_cebo && !flag.b04_lebrun_libre && flag.b05_camille_vista', then: [
				{ say: 'handsome', text: 'Ah, y la chica de la clínica de Æther, la del balón. Camille. Juega un torneo en **Mayólica**. Handsome lo sabe porque Handsome lo sabe todo. Bueno, porque lo pone en un cartel del metro.' },
			] },
			{ say: 'handsome', text: 'Handsome se queda en Porcelana con el doctor unos días, «tomando declaración». Es decir: comiendo aquí. —A Brock—. ¿Mañana hay guiso?' },
			{ say: 'brock', text: 'Mañana hay guiso con la cosa que me venda el señor de la calle. Lo que sea.' },
			{ intel: { npc: 'calder', text: 'En Porcelana, bajo custodia de Handsome, «de testigo». Dicen que en Teselia hay máquinas que quizá reconozca. No le han dejado traer el telescopio: solo la funda.' } },
			{ intel: { npc: 'brock', text: 'Líder de intercambio en Ciudad Fayenza, «cuando terminen las obras del puente». Mientras, cocina en la carpa de la Gira de Porcelana. Promete un Pokémon «que no cabe en la carpa».' } },
		],
		b06_brock_charla: [
			{ say: 'brock', text: '¿Más guiso? Siempre hay más guiso. El secreto de una olla grande es que nunca se acaba. El secreto de un buen criador, igual: nunca se acaba lo que das.' },
			{ text: 'En una mesa del fondo, Handsome toma declaración a Calder. Es decir, los dos comen en silencio, mirando el mar entre las farolas.', cond: 'flag.b06_handsome_calder' },
		],
		b06_brock_despues: [
			{ say: 'brock', text: 'Te vas a Mayólica, ¿eh? Llévate esto para el camino. —Te da una fiambrera envuelta en un trapo—. Por el desierto se pasa hambre. Y el pescado frito no se estropea. Se pone peor, pero no se estropea.' },
			{ if: '!flag.b06_brock_fiambrera', then: [
				{ set: { 'flag.b06_brock_fiambrera': true } },
				{ give: 'leftovers' },
				{ say: 'brock', text: 'Eso no es la fiambrera. La fiambrera me la devuelves. Eso son unos **Restos**. Para tu Pokémon. Es lo que sobra de la olla buena. Nunca se acaba.' },
			] },
		],

		// =================== OSHAWOTT Y SU CONCHA (pesca, escena única) ===================
		b06_oshawott: [
			{ if: 'flag.b06_oshawott', then: [{ end: true }] },
			{ if: '!flag.b06_oshawott_visto', then: [
				{ set: { 'flag.b06_oshawott_visto': true } },
				{ text: 'Al final del muelle, en el borde de los pilotes, hay un **Oshawott** sentado con las patitas colgando sobre el agua. Llora. Sin ruido, con la boca muy apretada. Mira el agua verde, entre los pilotes, como si se le hubiera caído allí el mundo.' },
				{ text: 'Una estibadora con chaleco naranja se acerca con dos cafés. Te da uno sin preguntar, como si fueras del turno.' },
				{ say: 'estibador', as: 'La capataz del muelle', text: 'Es el de la grúa. Vive aquí desde que era así de pequeño, en la caseta. Esta mañana se le ha caído la concha al agua. La de la barriga. —Sopla el café—. Sin ella no es nadie. Ni come.' },
				{ say: 'estibador', as: 'La capataz del muelle', text: 'Hemos probado con el gancho de la grúa, con una red y con el sobrino de Paco, que bucea. Nada. El agua aquí es muy honda y hay corriente. Tú eres de la Gira, ¿no? Los de la Gira siempre traen suerte. O la gastan, una de dos.' },
				{ say: 'rotom', text: '¡Bzzt! La concha de un Oshawott se llama vieira. La usa para cortar, para comer y para abrir cosas. Es como su navaja suiza. ¡Y está ahí abajo, a cuatro metros! Lo dice mi sonar. Bueno, mi micrófono. Se oye algo que hace «clic» contra la madera.' },
			], else: [
				{ text: 'El Oshawott sigue en el borde de los pilotes, mirando el agua. Te ve llegar y se aparta medio paso, para dejarte sitio. Como si ya supiera a qué vienes.' },
			] },
			{ minigame: { type: 'fish', id: 'b06_concha_oshawott', title: 'La concha entre los pilotes', theme: 'mar', level: 2,
				hint: 'La concha está enganchada en un pilote, abajo. Espera el «!» y recoge con calma: si tiras de golpe, se suelta.',
				guaranteed: ['b06_concha_oshawott'], loot: [{ id: 'pearl', w: 6 }, { id: 'shoalshell', w: 6, n: [1, 2] }, { id: 'bigpearl', w: 2, rare: true }], picks: 1, consolation: 'shoalshell', lootTitle: 'Lo que sale de entre los pilotes' },
				onWin: [{ call: 'b06_oshawott_fin' }],
				onLose: [
					{ text: 'El sedal se tensa, se tensa… y se afloja. Algo vuelve a hacer «clic» contra la madera, más abajo. El Oshawott suspira, muy largo, por la nariz.' },
					{ say: 'estibador', as: 'La capataz del muelle', text: 'Casi. Prueba otra vez. Aquí la mitad de las cosas salen a la segunda. La otra mitad, a la tercera.' },
				],
				onQuit: [{ text: 'Dejas la caña en la bita. El Oshawott te mira, y luego mira el agua otra vez.' }] },
		],
		b06_oshawott_fin: [
			{ set: { 'flag.b06_oshawott': true } },
			{ text: 'Del agua sale el anzuelo con una cosa enganchada: una **concha** blanca y crema, en forma de abanico, del tamaño de una galleta. Chorrea. Brilla.' },
			{ text: 'El Oshawott da un salto. Se pone de pie en el borde del muelle, con los brazos extendidos, temblando. Le pones la concha en las manos. Se la pega a la barriga con las dos patas, muy fuerte, y cierra los ojos.' },
			{ take: 'b06_concha_oshawott', silent: true },
			{ if: LUC, then: [
				{ text: '{riolu} se agacha a su lado y le da un golpecito en la concha con la punta de la zarpa. *Toc.* El Oshawott abre un ojo, mira a {riolu}, y le da otro golpecito en la mano con la concha. *Toc.* Ya son amigos. Así, sin más.' },
			] },
			{ if: TIENE_OSHA, then: [
				{ text: 'El Oshawott te olfatea la mochila. Huele a otro de los suyos. Se queda pensando, con la cabeza ladeada. Luego se gira hacia la caseta del capataz, donde la estibadora le ha puesto una manta en una caja de fruta.' },
				{ say: 'estibador', as: 'La capataz del muelle', text: 'Ya tienes uno como él, ¿verdad? Lo huele. Pues este se queda aquí, con nosotros. Es el que vigila las grúas. Le vamos a hacer un chaleco. Naranja. Ven a verlo cuando quieras: estará en su caja, haciéndose el jefe.' },
			], else: [
				{ text: 'El Oshawott se te queda mirando. Luego mira a la estibadora. Luego a ti otra vez. Y se pone a tu lado, con la concha en la barriga y el pecho hinchado.' },
				{ say: 'estibador', as: 'La capataz del muelle', text: 'Ah. Ya está. —Se ríe, ronco—. Este muelle se le ha quedado pequeño desde que le has sacado la concha. Llévatelo. Bueno, que se vaya contigo. Aquí nadie se lleva a nadie: se van solos.' },
				{ pokemon: { sp: 'oshawott', lv: 15, gender: 'M', nature: 'adamant', ability: 'torrent', happy: 170, item: 'mysticwater', moves: ['watergun', 'focusenergy', 'soak', 'tailwhip'], ivs: { hp: 27, atk: 31, def: 24, spa: 22, spd: 25, spe: 28 } } },
				{ set: { 'flag.b06_oshawott_tuyo': true } },
				{ say: 'estibador', as: 'La capataz del muelle', text: 'Le he metido una **Agua Mística** en la Poké Ball. Era del muelle, para la suerte. Ahora la suerte va contigo.' },
			] },
			{ quest: 'b06_s_iniciales', stage: 'buscar' },
			{ if: 'flag.b06_tepig && flag.b06_snivy', then: [{ quest: 'b06_s_iniciales', stage: 'hecha', done: true }] },
			{ say: 'rotom', text: '¡Bzzt! Apunto: «Oshawott, del muelle de Porcelana, con concha». Encina dijo que Teselia tiene Pokémon que no se ven en otro sitio. Este es uno. ¡Y en Mayólica y en Esmalte dicen que hay más como él!' },
		],
		b06_oshawott_visita: [
			{ text: 'El Oshawott del muelle duerme en su caja de fruta, en la caseta del capataz, con un chaleco naranja que le queda grande y la concha bien sujeta. Al oírte, abre un ojo y te saluda dándose un golpecito en la concha. *Toc.*' },
			{ text: 'Uno de los estibadores le está enseñando a señalar los barcos que llegan. Lo hace muy serio. Señala a todos, también a los que se van.' },
		],
		b06_estibadores: [
			{ text: 'En la caseta del capataz hay una estufa de butano, un calendario de hace tres años y seis estibadores tomando café de un termo enorme. Hablan de fútbol, de barcos y del pódcast del martes.' },
			{ text: '«Yo digo que lo de la abuela es el portero». «Tú dices eso de todo». «Porque siempre es el portero». «Nunca es el portero». «Pues un día lo será, y ese día me vais a pedir perdón».', cond: CASO },
			{ text: '«Esta noche hay directo de *Casos Fríos*». «¿Otra vez el de los casos?». «Es los martes». «Hoy no es martes». «Hoy es martes». Silencio. Alguien mira el calendario de hace tres años.', cond: '!' + CASO },
		],

		// =================== EL ESTUDIO: LLEGADA ===================
		b06_estudio_entrada: [
			{ set: { 'flag.b06_renata_estudio': true } },
			{ text: 'Bajas por la escalera de servicio, junto a los contadores de la luz, hasta una puerta metálica con una pegatina: «🎙️ Si está la luz roja, no llames. Si no está, tampoco». La luz no está. Llamas.' },
			{ text: 'La puerta se abre de golpe. Detrás, una mujer joven con gafas redondas, rizos castaños que van cada uno a su aire, gabardina mostaza llena de chapas y unos cascos al cuello. Tiene un rotulador en la boca.' },
			{ say: 'renata', text: '¡Testigo! —Se quita el rotulador—. ¡En carne y hueso! ¡En mi sótano! Cool, cool, cool, cool. Pasa, pasa. No toques nada. Toca lo que quieras. Bueno, el corcho no.' },
			{ say: 'renata', text: 'Renata Castellanos. *Casos Fríos de Teselia*. Ya lo sabes, pero hay que decirlo. Si no lo digo, me pongo nerviosa. —Te señala con el rotulador—. Te debía un café. Y una disculpa. Y un capítulo entero. Empiezo por el café, que es lo fácil.' },
			{ text: 'Al fondo, en la mesa de mezclas, un chico pelirrojo con un gorro de lana y gafas cuadradas levanta la vista de un nudo de cables. Al lado, en un sillón de orejas forrado de cinta americana, una señora mayor con un moño canoso alto teje con los cascos puestos.' },
			{ say: 'renata', text: 'Él es **Nico Ferrer**: sonido, montaje, cables y pánico. Ella es **la Tía Rosa**: la voz. Cuarenta años de radio. Si la Tía Rosa dice tu nombre por el micro, existes un poco más.' },
			{ say: 'nico_ferrer', text: 'Hola. Perdón. Hola. —Se le enreda el cable en la manga—. Bienvenid{o|a|e}. No pises el cable azul. Ni el negro. Mejor no pises.' },
			{ say: 'tia_rosa', text: 'Ay, qué cara de buena persona, cariño. —Se baja los cascos, te mira por encima de las gafas de media luna—. Renata dice que tú encontraste el armario. El de Kanto. Desde entonces no duerme. Bueno, antes tampoco.' },
			{ if: 'flag.b03_renata_publica', then: [
				{ say: 'renata', text: 'Desde que emití lo de Trigal, me escriben unos abogados todos los lunes. Los tengo en el corcho. —Señala tres sobres gruesos clavados con chinchetas—. Y la carpeta de Olmedo, vacía. Me la vaciaron porque yo les dije dónde buscar. Con efectos de sonido.' },
			], else: [
				{ say: 'renata', text: 'Me esperé, como dijiste. Y en el expediente ponía «Trasladado a Proyecto Arco II · Teselia». Mi ingeniero, aquí. En mi ciudad. —Toca el corcho—. Lo busqué en la casa de todos los demás y estaba en la mía.' },
			] },
			{ text: 'En el corcho, en el centro de todos los hilos rojos, una foto vieja de una fiesta de empresa: un hombre delgado, con gafas, brindando. Debajo, en una tarjeta: «**MATÍAS OLMEDO** · 12 años».' },
			{ say: 'renata', text: 'Pero eso es para luego. —Se gira de golpe—. Ahora: son las nueve menos diez. Los martes, a las nueve, directo. Y hoy, mi invitad{o|a|e} especial eres tú. —Sonríe con todos los dientes—. Te lo digo ahora para que no te dé tiempo a huir.' },
			{ choice: [
				{ text: '«¿Directo? ¿Ahora?»', then: [
					{ say: 'renata', text: 'Ahora. Si te lo hubiera dicho antes, habrías ensayado. Y lo ensayado suena a ensayado. Lo bueno sale cuando no da tiempo. Lo dice el manual. El manual lo he escrito yo.' },
				] },
				{ text: '«Encantad{o|a|e}.»', then: [
					{ say: 'renata', text: '¡Así me gusta! Sin miedo. Bueno, con un poco: el miedo da buen sonido. Nico, ¿da buen sonido el miedo?' },
					{ say: 'nico_ferrer', text: 'Da un sonido. Bueno no sé.' },
					{ af: { renata: 1 } },
				] },
			] },
			{ text: 'Detrás de ti, la puerta se abre otra vez. Entra un hombre con auriculares enormes al cuello, chaqueta gris y cara de no creerse nada, cargando una maleta con ruedas que hace un ruido terrible por la escalera.' },
			{ if: 'flag.p7_simon', then: [
				{ say: 'simon', text: 'Llego. No llego tarde: el metro llega tarde. —Te ve—. Tú. Claro que eres tú. Siempre eres tú. —Deja la maleta—. He cruzado tres Puertas. Seis meses, dije. Han pasado seis meses. Hoy lo digo en antena.' },
				{ say: 'renata', text: '¿El qué? —Lo mira de arriba abajo—. ¿Qué dices en antena? ¿Que no ha cenado con el Conde? Eso ya lo sabemos todos.' },
				{ say: 'simon', text: 'Lo que dije que diría. Nada más. —Se sienta en el tercer micro, muy tieso—. Y no he cenado. Que conste.' },
			], else: [
				{ say: 'simon', text: 'Llego. No llego tarde: el metro llega tarde. —Te mira—. Ah. La visita. Simón. Sección del escéptico. Nos vimos en Kalos, junto a un pozo, delante de un castillo absurdo. —Deja la maleta—. Por fin en casa. Por fin, mi micrófono.' },
				{ say: 'renata', text: 'Tu micrófono está desenchufado desde la temporada dos, Simón.' },
				{ say: 'simon', text: 'Lo sé. Hoy lo enchufo. Hoy hablo. Tres años haciendo de escéptico en el montaje, por escrito, en los créditos. Hoy, en directo. —Mira a Nico—. Enchúfalo.' },
				{ text: 'Nico mira a Renata. Renata mira a Simón. Lo piensa. Asiente, muy poco. Nico enchufa el micro tres.' },
			] },
		],
		b06_renata_espera: [
			{ say: 'renata', text: '¿Listo? ¿Lista? ¿Liste? Da igual, no hay tiempo de estarlo. Cuando quieras, empezamos. —Te enseña el pulgar en el aire, encima del botón rojo—. Cuando quieras es ya.' },
			{ choice: [
				{ text: 'Empezar el directo', then: [{ call: 'b06_directo' }] },
				{ text: 'Un momento todavía', then: [
					{ say: 'renata', text: 'Un momento. Bueno. Tengo un momento. —Mira el reloj—. Tenía. Bueno, sube a respirar. El directo espera. Yo no, pero el directo sí.' },
				] },
			] },
		],

		// =================== EL DIRECTO (entrevista y caso de prueba) ===================
		// Todo lo que se dice aquí con el micro encendido lo oye cualquiera que escuche el pódcast.
		b06_directo: [
			{ if: CASO, then: [{ end: true }] },
			{ text: 'Nico levanta tres dedos. Dos. Uno. La luz roja de encima de la puerta se enciende. La Tía Rosa se quita las gafas, se acerca al micro y habla con una voz que no es la suya de antes: grave, cálida, de las que se oyen en un taxi a medianoche.' },
			// EN ANTENA
			{ say: 'tia_rosa', text: 'Buenas noches, Porcelana. Buenas noches, Teselia. Es martes, son las nueve, y esto es *Casos Fríos*. Los casos que nadie cierra, contados por quien no los deja en paz.' },
			// EN ANTENA
			{ say: 'renata', text: '¡Hola, hola! Renata Castellanos. Hoy tenemos invitad{o|a|e}. Le he visto cruzar Puertas, abrir armarios y encontrar a un mecánico por el zumbido de un Magneton. Viene de la Gira. Viene con un Lucario. Y viene, sobre todo, sin saber lo que le espera. —Te acerca el micro—. Saluda.' },
			{ choice: [
				{ text: '«Buenas noches. Vengo a buscar el café que me debes.»', then: [
					// EN ANTENA
					{ say: 'renata', text: '¡Ja! En directo. Me lo ha dicho en directo. Nota para el episodio: la Tía Rosa le debe un café a nuestr{o|a|e} invitad{o|a|e}. Yo no. Yo nunca debo nada.' },
					{ af: { renata: 1 } },
				] },
				{ text: '«Hola. Estoy un poco nervios{o|a|e}.»', then: [
					// EN ANTENA
					{ say: 'renata', text: 'Eso es honestidad. En antena. Me encanta. Nico, apunta: «invitad{o|a|e} nervios{o|a|e} y honest{o|a|e}». Es lo mejor que se puede ser en un pódcast.' },
				] },
				{ text: '«Me presento con la seriedad que el momento exige.»', then: [
					// EN ANTENA
					{ say: 'renata', text: '…Ah. Bueno. Muy formal. Muy… de telediario. —Se le escapa una mueca—. Nico, ¿tenemos música de telediario? No tenemos. Seguimos.' },
					{ af: { renata: -2 } },
				] },
			] },
			// EN ANTENA
			{ say: 'renata', text: 'Primera pregunta, la que hacemos a todos: ¿qué se siente al cruzar una Puerta Lemnis?' },
			{ choice: [
				{ text: '«Como un ascensor que baja demasiado deprisa.»', then: [
					// EN ANTENA
					{ say: 'renata', text: 'Un ascensor que baja demasiado deprisa. Lo apunto. Lo voy a robar. Ya es mío.' },
				] },
				{ text: '«Mi Rotom siempre se cuelga un rato al cruzar.»', then: [
					// EN ANTENA
					{ say: 'renata', text: '¿Se cuelga? ¿Como una computadora? —Mira a Rotom, que flota junto al micro dos—. Rotom, saluda a los oyentes.' },
					{ say: 'rotom', text: '¡Bzzt! ¡Hola, oyentes! Hoy no me he colgado. Hoy he cruzado perfecto. ¡Primera vez!' },
					{ say: 'renata', text: 'Primera vez. Interesante. —Lo dice muy deprisa y pasa a otra cosa. Pero lo apunta.' },
				] },
				{ text: '«Prefiero no hablar de eso.»', then: [
					// EN ANTENA
					{ say: 'renata', text: 'Uh. Misterio. En un pódcast de misterio. —Sonríe—. Respeto. Nota para el episodio: el invitado guarda secretos. Bien. Así me gusta la gente.' },
				] },
			] },
			// ----- Simón, por fin en antena -----
			{ if: 'flag.p7_simon', then: [
				// EN ANTENA
				{ say: 'simon', text: 'Antes de seguir, un asunto pendiente. Hace seis meses dije que, si no encontraba una explicación racional para un señor de Kalos que no envejece, lo diría en antena. —Pausa larga—. No la he encontrado.' },
				// EN ANTENA
				{ say: 'simon', text: 'No digo que no la haya. Digo que no la he encontrado. Es distinto. Y es todo. —Se echa hacia atrás—. Lo he dicho. En directo. Ya me puedo morir tranquilo. No literalmente.' },
				{ text: 'Renata lo mira con la boca abierta. La Tía Rosa aplaude sin hacer ruido. Nico tiene los ojos un poco húmedos y dice que es la calefacción.' },
			], else: [
				// EN ANTENA
				{ say: 'simon', text: 'Y antes de seguir, un aviso de la sección del escéptico, que hoy tiene voz. Todo lo que vais a oír esta noche tiene explicación. Toda. Siempre. —Pausa—. Se me había olvidado lo bien que suena eso en un micro.' },
				{ say: 'renata', text: 'Bienvenido a la antena, Simón. —Bajito, fuera del tono de radio—. Tres años. Se te ha oído bien.' },
			] },
			{ set: { 'flag.b06_simon_antena': true } },
			// ----- El caso de prueba -----
			// EN ANTENA
			{ say: 'renata', text: 'Y ahora, el caso de la semana. Lo ha mandado una oyente. Tía Rosa…' },
			{ text: 'La Tía Rosa saca una carta escrita a mano en papel de cuadros y la lee despacio, con su voz de taxi a medianoche.' },
			// EN ANTENA
			{ say: 'tia_rosa', text: '«Querida *Casos Fríos*: soy una oyente de Porcelana. Mi abuela vive sola, en un cuarto piso. Dice que alguien entra en su casa **los martes**, por la mañana, mientras ella va al bingo de la parroquia. No falta nada. Nunca. Ni un céntimo, ni una joya, ni una galleta».' },
			// EN ANTENA
			{ say: 'tia_rosa', text: '«Pero ella vuelve y nota cosas. El reloj de cuco del pasillo va **diez minutos** adelantado; ella lo pone en hora y al martes siguiente otra vez. Y en el fregadero hay una taza de más, enjuagada a medias: **la taza azul**, la del dibujo de un Pidove, que nadie usa desde hace años».' },
			// EN ANTENA
			{ say: 'tia_rosa', text: '«El portero jura que los martes no sube ningún desconocido. Mi abuela ha cambiado la cerradura dos veces y siguen entrando. Ella tiene una copia de la llave, y la otra la tiene la familia. Y llega al bingo siempre tarde, siempre diez minutos, porque nunca encuentra el abrigo. Ayúdenme. Firmado: una nieta preocupada».' },
			{ text: 'Silencio en el estudio. El metro pasa por debajo, muy lejos. Renata te acerca el micro despacio, con una sonrisa que da un poco de miedo.' },
			// EN ANTENA
			{ say: 'renata', text: 'Ya lo has oído todo. Lo mismo que los oyentes. Ni una pista más. Vamos por partes, como en los buenos casos. Primera pregunta: ¿qué se llevan?' },
			{ call: 'b06_caso_p1' },
		],
		b06_caso_p1: [
			{ prompt: '¿Qué se llevan de casa de la abuela?', choice: [
				{ text: '«Nada. No es un robo: es una visita.»', then: [
					// EN ANTENA
					{ say: 'renata', text: 'Una visita. —Lo repite despacio, saboreándolo—. Alguien que entra con llave, no se lleva nada y deja una taza. Eso no es un ladrón. Eso es una costumbre. Segunda pregunta.' },
					{ call: 'b06_caso_p2' },
				] },
				{ text: '«Algo pequeño que la abuela todavía no ha echado de menos.»', then: [
					{ set: { 'vars.b06_caso_fallos': '+1' } },
					// EN ANTENA
					{ say: 'renata', text: '¿Durante semanas? ¿Todos los martes? ¿Y nunca lo echa de menos, con lo que se fija en un reloj diez minutos? No. Esa señora cuenta las galletas. Otra vez. Sin presión. Hay presión. Hay oyentes.' },
					{ call: 'b06_caso_p1' },
				] },
				{ text: '«Información. Alguien busca papeles.»', then: [
					{ set: { 'vars.b06_caso_fallos': '+1' } },
					// EN ANTENA
					{ say: 'renata', text: 'Uh, me gusta, es muy de espías. Pero los espías no se toman un café y dejan la taza en el fregadero. Los espías friegan. Lo dice el manual de espías. Otra.' },
					{ call: 'b06_caso_p1' },
				] },
			] },
		],
		b06_caso_p2: [
			// EN ANTENA
			{ say: 'renata', text: 'La abuela dice que no falta nada y tiene razón. Entonces, ¿dónde miramos?' },
			{ prompt: '¿Dónde está la pista?', choice: [
				{ text: '«No mires lo que falta: mira lo que sobra.»', then: [
					// EN ANTENA (la frase que citará el Apuntador)
					{ say: 'renata', text: '…«No mires lo que falta: mira lo que sobra». —Se queda quieta—. Nico. Nico, ¿lo has grabado? Dime que lo has grabado. Eso es una sintonía. Eso es una camiseta.' },
					// EN ANTENA
					{ say: 'renata', text: 'Lo que sobra: una taza azul y diez minutos. Una taza que nadie usa desde hace años. Diez minutos que la abuela siempre llega tarde. —Te mira—. Tercera pregunta, la buena. ¿Quién?' },
					{ call: 'b06_caso_p3' },
				] },
				{ text: '«En la cerradura. Alguien sabe forzarla.»', then: [
					{ set: { 'vars.b06_caso_fallos': '+1' } },
					// EN ANTENA
					{ say: 'renata', text: 'La ha cambiado dos veces. Y siguen entrando. Si alguien la forzara, la tercera ya estaría rota. Nadie fuerza nada: abren. Mira otra cosa. Mira lo que **hay**, no lo que no hay.' },
					{ call: 'b06_caso_p2' },
				] },
				{ text: '«En el portero. Miente.»', then: [
					{ set: { 'vars.b06_caso_fallos': '+1' } },
					// EN ANTENA
					{ say: 'renata', text: 'El portero dice que no sube ningún **desconocido**. —Pone mucho énfasis en la palabra—. No ha dicho que no suba nadie. Lo has oído igual que yo. Otra.' },
					{ call: 'b06_caso_p2' },
				] },
			] },
		],
		b06_caso_p3: [
			{ prompt: '¿Quién entra los martes?', choice: [
				{ text: '«Alguien de la familia. Tiene llave, conoce la taza azul y sabe que ella llega tarde.»', then: [
					{ call: 'b06_caso_resuelto' },
				] },
				{ text: '«Un vecino del edificio. El portero no lo cuenta como desconocido.»', then: [
					{ set: { 'vars.b06_caso_fallos': '+1' } },
					// EN ANTENA
					{ say: 'renata', text: 'Cerca, cerca. Pero ¿un vecino con una copia de la llave nueva? ¿Dos veces? ¿Y que sepa cuál era la taza de hace años? La taza azul no es de cualquiera. La taza azul es de **alguien**. Otra.' },
					{ call: 'b06_caso_p3' },
				] },
				{ text: '«La propia abuela. No se acuerda.»', then: [
					{ set: { 'vars.b06_caso_fallos': '+1' } },
					// EN ANTENA
					{ say: 'renata', text: 'Uf. Esa me da pena. Y no cuadra: el martes ella está en el bingo, con veinte señoras de testigo. Bueno, diecinueve: una siempre hace trampa. Otra.' },
					{ call: 'b06_caso_p3' },
				] },
			] },
		],
		b06_caso_resuelto: [
			{ set: { 'flag.b06_caso_prueba': true } },
			{ if: 'vars.b06_caso_fallos == 0', then: [
				{ af: { renata: 5 } },
				// EN ANTENA
				{ say: 'renata', text: '¡A la primera! ¡Las tres a la primera! —Se lleva las manos a la cabeza—. Me fastidia. Me fastidia muchísimo. Me encanta. Iba a decirlo yo, ¿eh? Que conste en el episodio. Nico, que conste.' },
			], else: [
				{ af: { renata: 2 } },
				// EN ANTENA
				{ say: 'renata', text: 'Eso. Ahí. Nos ha costado, pero ahí. Nota para el episodio: el invitado acierta cuando deja de buscar al ladrón y mira la taza.' },
			] },
			// EN ANTENA
			{ say: 'renata', text: 'Alguien de la familia. Con la otra llave. Que se toma un café en la taza que usaba de pequeño, la del Pidove. Y que, antes de irse, adelanta el reloj diez minutos. —Pausa—. ¿Por qué adelanta el reloj, invitad{o|a|e}?' },
			{ choice: [
				{ text: '«Para que la abuela llegue a tiempo al bingo, aunque no encuentre el abrigo.»', then: [
					// EN ANTENA
					{ say: 'renata', text: 'Para que llegue a tiempo. —Se le baja la voz—. Alguien que va a verla cuando ella no está. Que no quiere que lo sepa. Y que, aun así, le cuida los diez minutos.' },
					{ af: { renata: 1 } },
				] },
				{ text: '«Porque le gusta fastidiar.»', then: [
					// EN ANTENA
					{ say: 'renata', text: '…No. Nadie fastidia adelantando el reloj justo lo que la abuela llega tarde. Eso no es fastidiar. Eso es cuidar. Mal, pero cuidar. Para que llegue a tiempo al bingo.' },
				] },
			] },
			// EN ANTENA
			{ say: 'tia_rosa', text: 'Y a la nieta que nos escribe, cariño: pregunta en casa quién tiene libres los martes por la mañana. Desde hace poco. Y no se lo preguntes delante de la abuela.' },
			// EN ANTENA
			{ say: 'renata', text: 'Ese es el caso. Esto es *Casos Fríos*. Y mi invitad{o|a|e} de hoy acaba de resolver uno en directo, delante de toda Teselia. —Te mira—. No te acostumbres. Bueno, sí. Acostúmbrate. ¡Buenas noches, Porcelana!' },
			{ text: 'La luz roja se apaga. Nico se quita los cascos y se deja caer en la silla como si hubiera corrido una maratón. La Tía Rosa vuelve a su punto. Rotom pita, por fin, muy bajito: llevaba toda la hora aguantándose.' },
			// FUERA DE MICRO
			{ say: 'renata', text: 'Fuera de micro: lo has hecho muy bien. —Lo dice rápido, sin mirarte, ordenando papeles que no necesitan orden—. Lo de «mira lo que sobra»… Me lo voy a poner en una taza. Una taza azul. Muy meta.' },
			{ if: 'flag.p7_simon', then: [
				{ say: 'simon', text: 'Lo he dicho. —Sigue mirando el micro tres—. Lo he dicho y no se ha caído el techo. —Te mira—. Gracias. Por lo del castillo. Si no me hubieras mandado a dar visitas, no habría tenido nada que decir.' },
			] },
			{ say: 'nico_ferrer', text: 'Récord de llamadas al buzón. Cuarenta y una. Treinta dicen que era el portero. —Lee la pantalla—. Y una dice que era obvio desde la primera frase. Esa siempre hay.' },
			// FUERA DE MICRO
			{ say: 'renata', text: 'Vete a dormir. Hay un hotel de la Gira en la avenida, con camas de verdad. —Se le escapa un bostezo—. Mañana a las nueve, aquí. Tengo que contarte lo de Olmedo con calma. Y tú me tienes que contar cosas a mí. Sin micro.' },
			{ intel: { npc: 'renata', text: 'Te entrevistó en directo en «Casos Fríos» y resolviste con ella un caso de oyentes («la taza azul»). Tu frase en antena: «No mires lo que falta: mira lo que sobra». Te espera mañana a las nueve, sin micro, para hablar de Olmedo.' } },
		],
		b06_renata_caja: [
			{ say: 'renata', text: 'No me hables. Bueno, háblame. Pero de la caja. —Señala la puerta sin mirarla—. Está ahí. Ábrela tú. Yo la miro. Mirar se me da bien.' },
		],
		b06_renata_noche: [
			{ say: 'renata', text: '¿Sigues aquí? Al hotel. Mañana, a las nueve. Yo me quedo montando el episodio. Bueno, mirando el corcho. Es casi lo mismo.' },
		],

		// =================== LA NOCHE Y LA MAÑANA ===================
		b06_hotel: [
			{ if: 'flag.b06_manana', then: [{ end: true }] },
			{ set: { 'flag.b06_manana': true } },
			{ heal: true },
			{ text: 'El hotel de la Gira es un edificio estrecho de catorce plantas con un ascensor para tres personas y moqueta de flores. Tu habitación da a un patio de luces. Desde la cama se ve un trozo de cielo del tamaño de un sello.' },
			{ text: 'Duermes. {riolu} no: se queda sentado en el alféizar, de espaldas al cristal, mirando la Pokédex, que carga en la mesilla con su lucecita verde. Cada vez que abres un ojo, sigue ahí. Mirándola.', cond: LUC },
			{ text: 'Duermes como hacía tiempo que no dormías. Las ciudades que no paran a veces son las que mejor te dejan dormir.', cond: '!(' + LUC + ')' },
			{ text: 'Por la mañana, a las ocho y media, la Pokédex vibra. Una llamada. El número de Teselia con el emoji de micrófono.' },
			{ say: 'renata', as: 'Renata (llamada)', text: 'Ven. Ya. —No hay «testigo», ni «cool»—. Hay una caja en la puerta del estudio. No la he tocado. Nico tampoco. La Tía Rosa ha querido abrirla con una horquilla y la hemos parado. Ven.' },
			{ go: 'estudio_casos' },
		],

		// =================== LA CAJA DEL APUNTADOR (cerradura) ===================
		b06_caja: [
			{ if: 'flag.b06_apuntador_1', then: [{ end: true }] },
			{ if: '!flag.b06_caja_vista', then: [
				{ set: { 'flag.b06_caja_vista': true } },
				{ text: 'En el suelo, junto a la puerta metálica, hay una caja de madera clara del tamaño de una caja de zapatos, con las esquinas de latón. No tiene nombre. En la tapa, una cerradura de botones de las antiguas, de las de los baúles de teatro: seis teclas que se encienden por orden cuando la tocas.' },
				{ say: 'nico_ferrer', text: 'Estaba aquí a las siete y cuarto, cuando he bajado. Ni huellas, ni nota. Bueno, huellas las mías, que la he tocado sin querer. Perdón.' },
				{ say: 'tia_rosa', text: 'Una caja con cerradura en la puerta de un pódcast de misterio, cariño. —Teje un punto—. Si esto no es una invitación, que venga alguien y me lo explique.' },
				{ say: 'renata', text: 'Es para ti. —Te señala la tapa: en el latón, rayado con algo fino, pone «AL INVITADO DEL MARTES»—. No para mí. Para ti. Me molesta muchísimo. Ábrela.' },
				{ if: LUC, then: [
					{ text: '{riolu} pone la palma cerca de la cerradura. Al encenderse, las teclas le dejan un rastro en el aura: lo ves un instante más de lo que dura la luz. Te va a ayudar a recordar el orden.' },
				] },
			], else: [
				{ text: 'La caja de madera clara sigue en la puerta del estudio, con su cerradura de seis teclas. Renata la vigila con los brazos cruzados, como si fuera a escaparse.' },
			] },
			{ minigame: { type: 'lock', id: 'b06_caja_apuntador', title: 'La caja de la puerta', theme: 'caja', level: 3,
				hint: 'Las teclas se encienden en un orden. Repítelo. Cada cerrojo añade una. Puedes verla otra vez gratis.',
				guaranteed: ['cartaapuntador1', 'b06_recibo_mensajero', 'shellbell'], loot: [{ id: 'stardust', w: 4 }, { id: 'expertbelt', w: 1, rare: true }], picks: 1, consolation: false, lootTitle: 'Dentro de la caja' },
				onWin: [{ call: 'b06_carta1' }],
				onLose: [
					{ text: 'La última tecla se apaga con un «clac» seco y las seis se quedan grises. Al rato, una a una, vuelven a encenderse. La caja tiene paciencia.' },
					{ say: 'renata', text: 'Otra vez. Despacio. —Se muerde el pulgar—. No me mires. No estoy nerviosa. Estoy concentrada en tu lugar.' },
				],
				onQuit: [{ say: 'renata', text: 'Bueno. Respira. La caja no se va a ninguna parte. Yo tampoco. Ninguna de las dos.' }] },
		],
		b06_carta1: [
			{ set: { 'flag.b06_apuntador_1': true } },
			{ cutscene: { bg: { type: 'indoor', wall: '#5a3a3a', floor: '#3a2a2a' }, start: 'dark', time: 'manana', cam: 'still', frames: [
				{ actors: [{ id: 'renata', at: 'right', dim: true }], on: '_c', cam: 'push', item: 'cartaapuntador1', text: 'La tapa se abre con un clic de teatro. Dentro, sobre un lecho de papel de seda, un sobre **color crema**, grueso, sin sello.' },
				{ on: '_c', fx: 'glow', text: 'Debajo del sobre, una campanita hecha con una concha blanca, atada con un cordón. Y un papelito doblado, de esos que dan los mensajeros.' },
				{ actors: [{ key: 'renata', dim: false, emote: '...' }], cam: 'still', fx: 'letter', text: 'En el sobre, escrito a máquina, con la «e» medio comida, como si la tecla estuviera cansada: «**Al invitado del martes. Desde la concha.**»' },
				{ on: '_c', cam: 'pull', fx: 'light', text: 'Renata no dice nada. Es la primera vez que la ves sin nada que decir.' },
			] } },
			{ read: 'cartaapuntador1' },
			{ text: 'Renata te quita la carta de las manos. La lee dos veces, moviendo los labios. La tercera vez la lee en voz alta, solo un trozo: «No mires lo que falta: mira lo que sobra».' },
			{ say: 'renata', text: 'Es tu frase. Palabra por palabra. Y la taza azul. Y los diez minutos. Y mi «Nota para el episodio». —Se le pone la voz fina—. Todo esto lo dijimos anoche. Con el micro.' },
			{ say: 'nico_ferrer', text: 'Cuarenta mil oyentes, anoche. Cualquiera de ellos. —Se rasca el gorro—. Bueno, cualquiera que sepa escribir a máquina en 2026. Eso ya son menos.' },
			{ say: 'tia_rosa', text: 'La letra. Mírala, cariño. La «e» no marca. Es una máquina vieja, de las de cinta. Mi primer jefe de la radio tenía una igual. La «e» es la que más se gasta: es la que más usamos.' },
			{ read: 'b06_recibo_mensajero' },
			{ say: 'nico_ferrer', text: 'El recibo es de una mensajería de bicis. He llamado. —Ya tiene el teléfono en la mano—. Pagado en efectivo, en una consigna del metro, una sola vez. «No vuelva a llamar». Ni nombre, ni cámara. Lo dejaron en una taquilla y lo recogieron.' },
			{ say: 'renata', text: 'Un mensajero para una vez. Así no hay dos. Así no hay patrón. —Da vueltas por el sótano—. Es listo. Es muy listo. Me cae fatal.' },
			{ if: 'flag.b06_oshawott', then: [
				{ say: 'renata', text: '«Desde la concha». ¿Concha de qué? ¿Del muelle? Me han dicho que ayer sacaste una concha del agua, delante de medio muelle. —Te mira—. ¿Y si el que escribe estaba allí? ¿Y si te vio?' },
				{ say: 'nico_ferrer', text: 'O es un pescador. O un estibador. O un Oshawott que sabe escribir a máquina.' },
				{ say: 'renata', text: 'No descartes al Oshawott. Nunca descartes al Oshawott.' },
			], else: [
				{ say: 'renata', text: '«Desde la concha». ¿Qué concha? ¿La del muelle? Allí todo es conchas. —Se para—. Me pondré a buscar a todos los pescadores de Porcelana con una máquina de escribir. Serán seis. Serán sesenta.' },
			] },
			{ say: 'renata', text: 'Y la cita. «Ciudad Mayólica, la noria». —Mira el corcho, buscando un hueco donde clavar algo—. Quiere que vayas. Quiere demostrar algo. Que me equivoco, supongo. Que se equivoca la narradora.' },
			{ text: 'Clava la carta en el corcho, en una esquina, aparte de todos los hilos. Con una chincheta amarilla.' },
			{ quest: 'b06_t_apuntador', stage: 'noria' },
			{ intel: { npc: 'renata', text: 'Una caja en la puerta del estudio, «al invitado del martes», firmada «Desde la concha». Cita frases del directo palabra por palabra y te cita en la noria de Ciudad Mayólica. Entregada por un mensajero pagado una sola vez.' } },
			{ say: 'renata', text: 'Ahora siéntate. Que tengo una cosa que pedirte. —Se gira hacia Nico—. Nico. Apágalo todo. Todo. El micro dos también.' },
			{ call: 'b06_renata_diario' },
		],

		// =================== FUERA DE MICRO: RENATA LEE EL DIARIO ===================
		b06_renata_diario: [
			{ if: 'flag.b06_renata_diario', then: [{ end: true }] },
			{ set: { 'flag.b06_renata_diario': true } },
			{ text: 'Nico apaga la mesa de mezclas. La luz roja de la puerta, que no estaba encendida, la desenchufa del todo. La Tía Rosa deja el punto en el regazo. En el sótano solo se oye la cafetera, haciendo sus ruidos de cafetera vieja.' },
			// FUERA DE MICRO
			{ say: 'renata', text: 'En Alola te lo dije de broma. Ahora no. —Se sienta delante de ti, en el borde de la mesa—. Tu Rotom escribe un diario. ¿Me dejas leerlo? Unas páginas. Las viejas. Las de antes de conocerme.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Claro! ¡Mi diario es precioso! Lo escribo con mucho cariño. ¡Lee lo que quieras! —Se acerca a Renata y le pone la pantalla delante—. Empieza por el principio. El principio es el mejor.' },
			{ if: 'flag.b01_diario', then: [
				{ text: 'Renata pasa las entradas con el dedo, muy despacio. Se para en la primera. La lee en voz alta, sin entonación, como quien lee una lista de la compra.' },
				// FUERA DE MICRO
				{ say: 'renata', text: '«Yo me quedé en recepción. Conté doscientas doce baldosas. {jugador} estuvo un buen rato en una sala con el señor Rouxel y con el doctor Moreau, **el de la corbata azul de siempre**».' },
				{ text: 'Sigue pasando. Se para otra vez.' },
				{ if: 'flag.b02_handsome_noche', then: [
					// FUERA DE MICRO
					{ say: 'renata', text: '«**Hoy, sin novedades.** Paseamos por Trigal y comimos algo dulce». —Te mira por encima de las gafas—. Trigal. ¿Sin novedades?' },
				] },
				{ if: 'flag.b03_noa_doctora', then: [
					// FUERA DE MICRO
					{ say: 'renata', text: '«Hoy, en el puerto de Olivo, **nos encontramos con la doctora Lambert**. ¡Qué casualidad, tan lejos de Kalos!». —Pasa la página. La vuelve a pasar hacia atrás—. Doctora.' },
				] },
				{ if: '!flag.b02_handsome_noche && !flag.b03_noa_doctora', then: [
					{ say: 'renata', text: '«Los datos no mienten; se equivocan los que los leen». —Lo lee dos veces—. Qué frase tan bonita para un Rotom.' },
				] },
				{ text: 'Renata cierra el Diario. Le devuelve la Pokédex a Rotom con las dos manos, con mucho cuidado, como quien devuelve algo que se puede romper.' },
				// FUERA DE MICRO
				{ say: 'renata', text: 'Tu Rotom narra como alguien que ya sabe cómo acaba la historia.' },
				{ say: 'rotom', text: '¡Jajaja! ¡Bzzt! ¡Qué cosas dices! ¡Ojalá! Si supiera cómo acaba, te lo contaría. ¡Me encantan los finales!' },
				{ text: 'Rotom se ríe. Renata no.' },
				{ if: LUC, then: [
					{ text: '{riolu}, desde el rincón, levanta la cabeza. Mira a Renata. Luego, a la Pokédex. No gruñe esta vez. Solo mira.' },
				] },
			], else: [
				{ say: 'rotom', text: '…¿Diario? Bzzt. No tengo diario. ¿Debería tenerlo? Me gustaría. ¡Seguro que lo escribiría precioso!' },
				{ say: 'renata', text: 'Ah. —Se queda un momento callada—. Pensaba que sí. Me lo habré imaginado. Me imagino muchas cosas. Es mi trabajo.' },
			] },
			{ text: 'Durante un rato largo, nadie dice nada. Luego la Tía Rosa se levanta, pone la cafetera otra vez y, de espaldas, dice: «¿Alguien quiere café? Yo sí. Yo siempre».' },
			// FUERA DE MICRO
			{ say: 'renata', text: 'Bueno. —Se pone de pie de golpe, sacude la cabeza, vuelve a ser Renata—. Olmedo. Lo prometido.' },
			{ if: 'flag.b03_renata_publica', then: [
				{ say: 'renata', text: 'Me vaciaron la carpeta. Pero una cosa no me la pudieron quitar: el nombre del proyecto. «Arco». Y en Teselia hay una empresa de frío en **Fayenza** que hace dos años firmó con una fundación de nombre largo y sin web. Lo dice el registro mercantil. Es aburridísimo. Es lo que tengo.' },
			], else: [
				{ say: 'renata', text: '«Proyecto Arco II · Teselia». Lo pone el expediente que me encontraste. Y en Teselia hay una empresa de frío en **Fayenza** que hace dos años firmó con una fundación de nombre largo y sin web. Lo dice el registro mercantil. Es aburridísimo. Es lo mejor que tengo.' },
			] },
			{ if: 'has("fotoexpediente")', then: [
				{ say: 'renata', text: 'Y la foto. «Para D., por si preguntan». La llevo en la cartera. Si un día lo encuentro, se la doy. Es lo único que tengo de él que no es un papel.' },
			] },
			{ say: 'renata', text: 'Fayenza está al otro lado del puente que no bajan. Tú vas a ir de todas formas, con la Gira, a por la medalla de Brock. Cuando bajen el puente, avísame. Yo voy contigo. Sin micro.' },
			{ quest: 'b06_t_renata', stage: 'olmedo' },
			{ say: 'renata', text: 'Y mientras: Mayólica. Por la **Ruta 4**, al norte, por el borde del desierto. La medalla, la noria y ese señor de la concha. —Te pone una mano en el hombro, un segundo, y la quita—. Gana. Y cuéntamelo. Primero a mí.' },
			{ quest: 'b06_m2', stage: 'mayolica' },
			{ set: { 'flag.b06_t0_hecho': true } },
			{ diary: 'Hoy mi entrenador{|a|e} salió en la radio. ¡Bueno, en el pódcast! Renata le hizo preguntas y resolvió un caso de una abuela, una taza y un reloj de cuco. Al final no era nadie malo. Me gustó mucho que no fuera nadie malo. Yo no hablé, pero pité una vez al final, muy bajito.\n\nEsta mañana alguien ha dejado una caja en la puerta del estudio, con una campanita de concha dentro. Renata se ha puesto muy seria. Luego estuvieron hablando un rato de sus cosas de detectives, y yo me puse a ordenar las fotos de Porcelana. Tengo cuarenta y tres rascacielos. Me falta uno.\n\nMañana, a Mayólica, por el desierto. ¡Arena! Tengo que tener cuidado con las rendijas.', cond: 'flag.b01_diario' },
		],
		b06_renata_despues: [
			{ say: 'renata', text: '¿Todavía en Porcelana? La Ruta 4 sale por el norte. La noria no se va a resolver sola. Bueno, a lo mejor sí. Pero se resolvería mal.' },
			{ if: 'af.renata >= 30', then: [
				{ say: 'renata', text: 'Oye. Lo de anoche. Lo del micro. —No te mira—. Hacía mucho que no me ganaba nadie a una deducción. Me ha gustado. Me ha gustado demasiado. No se lo digas a nadie. Ni a tu Rotom.' },
			] },
		],

		// =================== EL ESTUDIO: CONVERSACIONES ===================
		b06_renata_reto: [
			{ say: 'renata', text: 'Una cosa más. Quiero ver cómo piensas cuando no hablas. En un combate se ve. Amistoso, ¿eh? Nada de apuestas. Bueno, una pequeña: si gano, me cuentas tu peor caso. Si ganas tú, te cuento el mío.' },
			{ say: 'tia_rosa', text: 'Toma, cariño, que en esta casa no se pelea con hambre. —Te pone en la mano una bolsa de papel con un bollo y dos pociones—. Las pociones son de verdad. El bollo es de ayer.' },
			{ choice: [
				{ text: 'Curar al equipo y aceptar', then: [
					{ heal: true },
					{ text: 'La Tía Rosa te cura al equipo con una paciencia de enfermera de las de antes. El bollo de ayer está buenísimo.' },
					{ battle: 'renata_1', lose: 'continue',
						onWin: [
							{ say: 'renata', text: 'Bueno. Mi peor caso: el primero. Temporada uno, episodio tres. Me equivoqué y lo emití. Lo corregí, pero lo emití. —Se encoge de hombros, muy rápido—. Ya está. Ya lo he dicho. Siguiente tema.' },
							{ af: { renata: 2 } },
						],
						onLose: [
							{ say: 'renata', text: 'Me debes tu peor caso. No hace falta que sea hoy. Me lo cuentas cuando quieras. O en antena. —Sonríe—. Mejor no en antena.' },
						] },
				] },
				{ text: 'Otro día', then: [{ say: 'renata', text: 'Otro día. Lo apunto. Lo apunto todo: tengo una libreta para las cosas que me deben.' }] },
			] },
		],
		b06_nico_charla: [
			{ say: 'nico_ferrer', text: 'Esto es la mesa de mezclas. Tiene treinta y dos canales. Funcionan once. Los otros tienen nombres, pero no funcionan. —Señala uno con cinta—. Ese se llama «Pedro». No sé por qué. Ya se llamaba así cuando llegué.' },
			{ say: 'nico_ferrer', text: 'Renata dice que soy técnico de sonido. Yo digo que soy técnico de cinta americana. Las dos cosas son verdad. Una más que otra.' },
		],
		b06_nico_despues: [
			{ say: 'nico_ferrer', text: 'He escuchado el directo otra vez. Tres veces. —Se quita el gorro, se lo vuelve a poner—. Lo de la carta… todo lo que cita está en la grabación. Todo. Lo he comprobado con el minutaje. Lo de esta mañana, no. Lo de esta mañana no lo grabamos.' },
			{ say: 'nico_ferrer', text: 'No sé si eso sirve de algo. Me gusta saber dónde empieza y dónde acaba una grabación. Es lo único que sé hacer bien.' },
		],
		b06_rosa_charla: [
			{ if: '!' + CASO, then: [
				{ say: 'tia_rosa', text: 'Cuarenta años de radio, cariño. Empecé leyendo los partes del tiempo a las cinco de la mañana. Nadie me escuchaba. Bueno, los pescadores. Los pescadores siempre escuchan. Son los únicos que madrugan tanto como la radio.' },
			], else: [
				{ say: 'tia_rosa', text: 'A Renata le has gustado. Se nota porque no para de hablar de otra cosa. —Cuenta los puntos en voz baja—. Cuando algo le gusta mucho, habla de todo menos de eso. Cuando le duele, igual.' },
				{ say: 'tia_rosa', text: 'Y yo, cariño, ya no hablo de nada. Yo tejo. Esto es una bufanda para ella. Lleva tres temporadas. Se la daré cuando cierre el caso del ingeniero. Por eso no la termino.' },
			] },
		],
		b06_simon_charla: [
			{ if: 'flag.p7_simon', then: [
				{ say: 'simon', text: 'Se me ha llenado el buzón. Doscientos mensajes. La mitad, de gente que dice que el Conde es un vampiro. La otra mitad, de gente que dice que soy muy valiente por admitirlo. —Suspira—. No admití nada. Dije que no lo había encontrado.' },
				{ say: 'simon', text: 'Vuelvo al castillo cuando acabe la temporada. A seguir buscando. —Se coloca los auriculares—. Si me invita a cenar, diré que no. Pero lo diré más despacio.' },
			], else: [
				{ say: 'simon', text: 'Tres años en los créditos, por escrito. «Sección del escéptico: Simón». Ahora, con voz. —Se toca el micro—. Me han llamado tres oyentes para decir que suena más joven de lo que pensaban. No sé si es un elogio.' },
			] },
		],
		b06_corcho: [
			{ text: 'El corcho de los hilos rojos ocupa una pared entera. Fotos, recortes, billetes de tren, un plano del metro con una línea marcada en rojo (la que no lleva a ningún sitio), la foto de la fiesta de empresa con Matías Olmedo brindando y una tarjeta: «12 años».' },
			{ text: 'Junto a la foto de Olmedo, alguien ha clavado una foto tuya, sacada de una revista de la Gira, con un pósit: «Testigo. Útil. Muy útil. No decírselo».', cond: '!' + CASO },
			{ text: 'Hay una foto nueva: la tuya, de anoche, con los cascos puestos y cara de concentración. Debajo, un pósit: «Invitad{o|a|e}. Ganó. Me fastidia». Y en una esquina, aparte de todos los hilos, el sobre color crema con su chincheta amarilla.', cond: 'flag.b06_apuntador_1' },
			{ text: 'Hay una foto nueva: la tuya, de anoche, con los cascos puestos y cara de concentración. Debajo, un pósit: «Invitad{o|a|e}. Ganó. Me fastidia».', cond: CASO + ' && !flag.b06_apuntador_1' },
		],

		// =================== PORCELANA: VARIOS ===================
		b06_porcehelados: [
			{ text: 'El puesto de Porcehelados: un carrito blanco con toldo de rayas y una cola que da la vuelta a la manzana. Los helados tienen forma de torre, con la punta en espiral. La señora que los sirve no levanta la vista nunca: los sirve por el tacto.' },
			{ if: '!flag.b06_porcehelado_rotom', then: [
				{ set: { 'flag.b06_porcehelado_rotom': true } },
				{ say: 'rotom', text: '¡Bzzt! Porcehelado: el helado oficial de Porcelana desde hace sesenta años. La receta es secreta. Dicen que la sabe una sola persona en toda la ciudad y que nunca toma el mismo autobús dos días seguidos, por si acaso.' },
			] },
			{ text: '«Uno por persona, cariño. Los Pokémon también son personas. Los Rotom, no: no tienen boca».' },
			{ shop: 'b06_puesto_porcehelados' },
		],
		b06_postal_adela: [
			{ if: 'flag.b06_postal_adela', then: [{ end: true }] },
			{ set: { 'flag.b06_postal_adela': true } },
			{ text: 'En el casillero del Centro Pokémon de Porcelana hay una postal con tu nombre, reenviada por la Gira. Sello de la Ruta 42, matasellos de Iris. Ha cruzado una Puerta para llegar hasta aquí y tiene una esquina doblada.' },
			{ if: 'flag.b03_rancho_lemnis', then: [
				{ give: 'postal_adela_tes_l' }, { read: 'postal_adela_tes_l' },
			], else: [
				{ if: 'flag.b03_rancho_jugador', then: [
					{ text: 'Dentro, doblada, una foto: Copito en el porche del rancho, con el lazo azul en el cencerro, mirando a la cámara con cara de no haber dado permiso.', cond: 'flag.b03_copito_contigo' },
					{ text: 'Dentro, doblada, una foto: el establo rojo con la cerca nueva y, en primer plano, un Mareep saltándola por el sitio correcto.', cond: '!flag.b03_copito_contigo' },
					{ give: 'postal_adela_tes_j' }, { read: 'postal_adela_tes_j' },
				], else: [
					{ if: 'partner("p7_rancho") || flag.b03_rancho_sobrina', then: [
						{ text: 'Dentro, doblada, una foto: Copito dormida en la mecedora del porche, con la lana recién esquilada.', cond: '!flag.b03_copito_contigo' },
						{ text: 'Dentro, doblada, una foto: el establo con el tejado arreglado y, encima de la puerta, un cartón torcido que dice CREE.', cond: 'flag.b03_copito_contigo' },
						{ give: 'postal_adela_tes_s' }, { read: 'postal_adela_tes_s' },
					], else: [
						{ give: 'postal_adela_tes_n' }, { read: 'postal_adela_tes_n' },
					] },
				] },
			] },
			{ intel: { npc: 'sobrina', text: 'Te escribió a Teselia desde el rancho de la Ruta 42. Sigue sin gustarle escribir cartas.' } },
		],
		b06_pluma_cornisa: [
			{ set: { 'flag.b06_pluma_cornisa': true } },
			{ text: 'Levantas la vista entre dos rascacielos. A media altura, en la cornisa de una ventana del piso veinte, hay algo gris que el viento mueve pero no se lleva. Rotom amplía la imagen.' },
			{ say: 'rotom', text: '¡Bzzt! Es una pluma. Gris. Está clavada en la cornisa con un alfiler. Con un alfiler. A sesenta metros de altura. —Pausa—. Las plumas no se clavan solas con alfileres.' },
			{ text: 'Es igual que la tuya. Señala hacia arriba, hacia la Torre Lemnis. No hay nadie en la cornisa. Nunca hay nadie. Pero alguien ha subido hasta allí solo para que tú la vieras.' },
			{ if: LUC, then: [{ text: '{riolu} mira la pluma, luego la Torre, y luego te mira a ti. El aura le brilla un instante en las manos, muy poco. Hay alguien arriba, en algún tejado. Lejos. Quieto. Mirando.' }] },
		],
		b06_torre_guardia: [
			{ text: 'El guardia tiene el uniforme azul medianoche de Lemnis, un auricular en la oreja y la mirada fija en un punto de la pared que está justo encima de tu cabeza.' },
			{ text: '«Cerrado al público. Por reformas. En las plantas altas». Lo dice como quien lo ha dicho mil veces. «No, no se puede subir. No, no se puede ver. No, no sé cuándo abren. Sí, la lemniscata se enciende sola. No, no sé quién la apaga. Nadie la apaga».' },
			{ if: LUC, then: [{ text: '{riolu} se queda mirando los ascensores detrás del cristal. No hace nada. Solo mira, con las orejas hacia atrás, hasta que te vas.' }] },
		],
		b06_torre_cristal: [
			{ text: 'La puerta de cristal es gruesa, sin manilla, con un lector de tarjetas a un lado que parpadea en rojo. Al otro lado, los ascensores, con sus botones apagados. En el panel de uno de ellos, el último botón no tiene número. Tiene una lemniscata.' },
			{ say: 'rotom', text: '¡Bzzt! El lector pide tarjeta de Lemnis. Nosotros no tenemos. —Pausa—. Qué raro. Por un momento me ha parecido que me reconocía. Habrá sido un reflejo.' },
		],
	},

	// =====================================================================
	// TIENDAS
	// =====================================================================
	shops: {
		b06_puesto_porcehelados: { name: 'Puesto de Porcehelados', items: [{ id: 'casteliacone', price: 350 }, 'freshwater', 'sodapop', 'lemonade'] },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		b06_concha_oshawott: { name: 'Concha de Oshawott', pocket: 'key', desc: 'Una concha blanca y crema, en forma de abanico, del tamaño de una galleta. Está húmeda. Tiene dueño, y el dueño la está esperando en el borde del muelle.' },
		cartaapuntador1: { name: 'Carta «Desde la concha» (1)', pocket: 'key', desc: 'Un sobre color crema, grueso, sin sello, que dejaron en una caja cerrada en la puerta del estudio de «Casos Fríos». Escrita a máquina; la «e» no marca bien. Firmada «Desde la concha».',
			read: '*(Papel color crema, grueso, con un borde perforado, como si lo hubieran arrancado de algo más grande. Letra de máquina de escribir. La «e» sale siempre a medias, como si a esa tecla le faltara tinta.)*\n\n---\n\nQuerida narradora. Querido invitado del martes:\n\n«**No mires lo que falta: mira lo que sobra.**» Lo dijo usted el martes, en antena, a las nueve y veintidós. Muy bien dicho. La taza azul. Los diez minutos. El reloj de cuco. Una abuela, un nieto y un martes por la mañana. Muy bien resuelto.\n\nY qué fácil.\n\nEse caso no lo mandó una oyente. Lo mandé yo. La abuela existe, el nieto existe y la taza existe; lo único que no existía era el misterio, hasta que se lo di a ustedes envuelto en papel de cuadros. Era una prueba. La han pasado. Nota para el episodio, como dice ella: el invitado piensa rápido.\n\nPero la narradora, señorita Castellanos, se equivoca. Siempre se equivoca un poco. Cuenta las historias como si ya supiera cómo acaban, y luego acaban de otra manera, y ella pone una pegatina y sigue. Yo no pongo pegatinas.\n\nLes propongo un juego. Yo monto los casos; ustedes los resuelven en antena. Si aciertan, lo diré. Si se equivocan, lo dirá toda Teselia.\n\nEl siguiente ya está montado. **Ciudad Mayólica, la noria.** Una cabina sube llena y baja vacía. Miren lo que sobra, si pueden.\n\nLe dejo una campanita. Es de concha, como yo. Suena bonito cuando se gana.\n\nAtentamente,\n\n**Desde la concha**' },
		b06_recibo_mensajero: { name: 'Recibo de la mensajería', pocket: 'key', desc: 'Un papelito de una mensajería en bicicleta de Porcelana, doblado en cuatro. Venía en la caja del Apuntador, debajo de la carta.',
			read: '**MENSAJERÍA PIDOVE EXPRÉS · PORCELANA**\n«Si vuela, llega».\n\nEncargo n.º 4471\n\nRecogida: consigna automática, estación de metro de la Avenida, taquilla 12. 6:10 h.\nEntrega: puerta del sótano del rascacielos de la esquina (escalera de servicio). Antes de las 7:30 h.\n\nPago: **en efectivo, por adelantado**, dejado dentro de la taquilla.\nCliente: no consta.\nTeléfono: no consta.\n\nObservaciones del cliente: «Una sola entrega. No vuelva a llamar».\n\nFirma del repartidor: *(un garabato con forma de Pidove)*' },
		postal_adela_tes_l: { name: 'Postal de Adela (Teselia)', pocket: 'key', desc: 'Una postal de un prado con niebla, con matasellos de Iris, reenviada a la Gira de Teselia. La letra es pequeña y apretada.',
			read: '{jugador}:\n\nMe han dicho los de la Fundación que estás en Teselia. Lo saben siempre antes que yo. No sé cómo.\n\nEl rancho sigue en pie. Los Mareep, gordos, tranquilos. Demasiado tranquilos, a veces. Ayer Copito se quedó mirando la valla una hora y no le encontré nada.\n\nLos martes siguen viniendo. Siguen siendo muy educados. Ya queda menos para que se acabe el contrato. Te lo digo cada vez para que se me quede a mí.\n\nAdela' },
		postal_adela_tes_j: { name: 'Postal de Adela (Teselia)', pocket: 'key', desc: 'Una postal de tu rancho de la Ruta 42, con matasellos de Iris, reenviada a la Gira de Teselia.',
			read: '{jugador}:\n\nTu rancho está bien. Lo digo así, «tu rancho», para acostumbrarme yo.\n\nHe arreglado la cerca del este. Me ha costado tres domingos y dos dedos morados. Los Mareep la saltan igual, pero ahora la saltan por el sitio que yo quiero.\n\nTe mando una foto. Para que no se te olvide a qué huele esto cuando estés entre rascacielos.\n\nVuelve cuando puedas. Los ranchos son de quien vuelve. Lo decía el tío.\n\nAdela' },
		postal_adela_tes_s: { name: 'Postal de Adela (Teselia)', pocket: 'key', desc: 'Una postal del rancho de la Ruta 42, con matasellos de Iris, reenviada a la Gira de Teselia.',
			read: '{jugador}:\n\nEl rancho, bien. Las cuentas, cuadradas. Te las mando aparte, como hacen los socios. No me gusta escribir cartas, pero las cuentas sí, que son números y los números no se ponen tristes.\n\nTe mando una foto. La he hecho yo. No sale torcida porque la he hecho tres veces.\n\nCuídate en Teselia. Dicen que allí la gente anda muy deprisa. Tú anda a tu paso. Al tuyo.\n\nAdela' },
		postal_adela_tes_n: { name: 'Postal de Adela (Teselia)', pocket: 'key', desc: 'Una postal de un prado con niebla, con matasellos de Iris, reenviada a la Gira de Teselia.',
			read: '{jugador}:\n\nNo sé si te acuerdas de mí. La sobrina de Aurelio. La del rancho de la Ruta 42.\n\nEl rancho sigue. Yo también. Las dos cosas me sorprenden algunos días.\n\nMe acordé de ti el otro día, cuando la niebla bajó por el prado como bajaba cuando estaba el tío. No sé por qué. A lo mejor porque tú también estabas aquella vez.\n\nSuerte en Teselia.\n\nAdela' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b06_muelle_pesca: {
			name: 'Entre los pilotes del muelle', icon: '🎣', hours: 18, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'mar', hint: 'Entre los pilotes hay corriente. Espera el «!» y recoge sin prisa: aquí todo tira hacia el fondo.',
				wild: [{ sp: 'basculin', lv: [58, 60], w: 5 }, { sp: 'basculinbluestriped', lv: [58, 60], w: 4 }, { sp: 'jellicent', lv: [59, 61], w: 3 }, { sp: 'alomomola', lv: [59, 61], w: 1 }], wildChance: 0.3 },
			ask: 'Al final del muelle, donde el agua es verde y honda, hay una caña de préstamo atada a una bita con una cadena y un cartel escrito a rotulador: «Pesque. Devuelva. Si pica algo grande, avise a la capataz».',
			text: 'El agua de entre los pilotes devuelve lo que se le cae a la ciudad.',
			wait: 'Hoy el agua está revuelta por los barcos y no pica nada. Mañana estará más tranquila. O no: esto es un muelle.',
			table: [
				{ id: 'pearl', w: 16, n: [1, 2] }, { id: 'shoalsalt', w: 12, n: [1, 2] }, { id: 'shoalshell', w: 12, n: [1, 2] }, { id: 'heartscale', w: 8 },
				{ id: 'bigpearl', w: 6 }, { id: 'mysticwater', w: 3 }, { id: 'starpiece', w: 3 },
				{ id: 'pearlstring', w: 1, rare: true }, { id: 'prismscale', w: 2, rare: true }, { id: 'waterstone', w: 2, rare: true },
			],
		},
		b06_cerezos_callejon: {
			name: 'El callejón de los cerezos', icon: '🌸', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'huerto', hint: 'Sacude las ramas con cuidado: los Pidove del alféizar también quieren su parte, y lo pocho resta.' },
			ask: 'Entre dos rascacielos, en un callejón que no sale en los mapas, alguien plantó hace años tres árboles. Ahora dan bayas aunque no les toque el sol más que una hora al día. Una oficinista jubilada los riega con una regadera de plástico y un cartel: «Tome. No arranque».',
			text: 'Los árboles del callejón sueltan lo que han conseguido con su hora de sol.',
			wait: 'Los árboles del callejón ya han dado lo suyo. La señora de la regadera te saluda desde su ventana.',
			table: [
				{ id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'oranberry', w: 12, n: [1, 3] }, { id: 'pechaberry', w: 10, n: [1, 2] }, { id: 'leppaberry', w: 8 },
				{ id: 'lumberry', w: 6 }, { id: 'tinymushroom', w: 6 },
				{ id: 'keeberry', w: 2, rare: true }, { id: 'marangaberry', w: 2, rare: true }, { id: 'balmmushroom', w: 1, rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		amistoso_renata: {
			name: 'Un combate en el estudio', npc: 'renata', trainer: 'renata_1', type: 'Dark', rec: 61,
			cond: 'flag.b06_caso_prueba',
			info: [
				{ text: '**Renata**, de *Casos Fríos*, quiere ver «cómo piensas cuando no hablas». Amistoso y opcional. La Tía Rosa cura antes.' },
				{ text: '4 Pokémon, hasta el nivel 61. Sus Pokémon engañan: **no te fíes de lo primero que veas**. **Lucha** y **Bicho** le vienen mal a casi todo su equipo; ojo con lo **Psíquico**.' },
				{ cond: 'beat("renata_1")', text: '✔ Vencida. Te debe su peor caso. Ya te lo ha contado.' },
			],
		},
	},
};
