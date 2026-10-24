// Bloque 6 · Tramo 2 · «La Noche Blanca» (Pueblo Chamota, secundaria larga y opcional, ~2 h 30).
// Se llega en tren desde la estación de Mayólica (T1: b06_pase_tren). Misión b06_s_chamota:
//   testigos (5, orden libre, `parts`) → decreto (archivo del ayuntamiento, a mitad: la pista que ordena las horas;
//   llamada de Matière y tabla de horarios) → campanario (mecanismo del reloj; el Zorua) → hipótesis (la pizarra de
//   Renata por holomisor, antes de saber la verdad) → verdad (Celia, a solas) → qué haces con ella → hecha.
// Extras: rastreo de la escarcha vieja con {riolu} (muralla norte), zona de entrenamiento de la Ronda (tope 64,
//   MT Alud), cosecha diaria en los huertos, hielo de la boca del Boquete Gigante (excavación diaria), shokugeki de
//   Gaspar y Lulú contra Celia (pan de la Noche Blanca), carta 2b del Apuntador si Renata emite la pizarra.
//
// LA VERDAD (para quien revise; nada de esto sale en textos visibles antes de tiempo):
//   Hace treinta años, la noche del 14 de agosto, Chamota adoptó a medianoche la hora del ferrocarril regional:
//   los relojes se atrasaron una hora (00:00 → 23:00). Las doce sonaron dos veces de verdad: el padre del campanero
//   las tocó a mano (hora vieja) y el reloj de la torre, ya ajustado, las dio solo una hora después.
//   El frío solo llegó al norte: un aire helado bajó del Boquete Gigante por una grieta de la muralla norte.
//   Celia (la hija, aprendiza) encendió el horno grande para que no se helara la masa; el tiro estaba taponado de
//   hielo y prendió la harina (00:40 hora vieja = 23:40 del ferrocarril: Teodoro y los bomberos apuntan la misma
//   hora con relojes distintos). Su madre, Asunción, estaba en la plaza del ayuntamiento firmando el acta; llegó
//   después, dijo «lo encendí yo; algo bajó por el tiro» y cargó con la culpa. Un Zorua del campanario (una familia
//   que lleva generaciones allí y hereda la ilusión de «una niña de pelo azul») sacó a Inés de su casa, pegada a la
//   panadería, ANTES del fuego, y la abrigó en la muralla.
//
// Apuntador: solo sabe lo que se dice en antena. La pizarra es FUERA DE MICRO. Lo único EN ANTENA es el segmento
// del martes (`b06_chamota_antena`), y solo si Mario deja emitirlo; la carta 2b cita SOLO esas frases.

const LUC = '(inParty("riolu") || inParty("lucario"))';
const ZORUA_LINEA = '(owns("zorua") || owns("zoroark") || owns("zoruahisui") || owns("zoroarkhisui"))';
const T = 'quest.b06_s_chamota';
const LLEGADA = 'flag.b06_chamota_llegada';
const DECRETO_LISTO = 'vars.b06_testigos >= 3 && flag.b06_testigo_alcaldesa && !flag.b06_decreto';
const BG_CHAMOTA = { type: 'town', roofs: ['#8a4a3a', '#a85a3a', '#6a4a3a', '#c4743a'], far: '#9ab0c8', hill: '#6a7a5a', ground: '#b8a68a' };

// Avanza a «decreto» al tercer testigo (si ya está la alcaldesa, o en cuanto hable con ella)
const AVANCE_TESTIGO = [
	{ set: { 'vars.b06_testigos': '+1' } },
	{ quest: 'b06_s_chamota', stage: 'decreto', cond: 'vars.b06_testigos >= 3 && ' + T + ' == "testigos"' },
	{ text: 'Rotom vibra en tu bolsillo: «¡Bzzt! ¡Tres versiones y ninguna casa con otra! ¡Si esto fuera un puzle, faltan piezas! ¿El ayuntamiento no tenía un archivo?».', cond: 'vars.b06_testigos == 3' },
];

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== PUEBLO CHAMOTA ===================
		chamota: {
			name: 'Pueblo Chamota', short: 'Chamota', region: 'teselia', kind: 'town', map: { x: 82, y: 40 },
			bg: BG_CHAMOTA,
			desc: 'Un pueblo de piedra rojiza metido entero dentro de una muralla, al final de la vía del tren. Calles empinadas, tejados de teja vieja, un campanario que se ve desde cualquier esquina y, al norte, la muralla más alta, la que da al **Boquete Gigante**.\n\nAquí todo el mundo se conoce. Y todo el mundo te cuenta la misma noche de una forma distinta.',
			descNight: 'De noche, Chamota se apaga pronto. Queda la luz de la panadería, que abre de madrugada, y el reloj del campanario, iluminado desde dentro como una luna cuadrada. Por la muralla norte camina una linterna: la Ronda.',
			descs: [
				{ cond: 'flag.b06_chamota_cronica', text: 'Pueblo Chamota, de piedra rojiza y tejados viejos. En la puerta de la panadería hay un letrero nuevo, pintado a mano: «Aquí se hace el pan de la Noche Blanca. Desde hace treinta años. Por las dos».\n\nLa gente se para a leerlo. Algunos entran a comprar sin tener hambre.' },
				{ cond: 'flag.b06_chamota_privado', text: 'Pueblo Chamota, de piedra rojiza y tejados viejos. Esta mañana se ha visto a la cartera desayunando en la panadería, sentada en el mostrador, como si fuera de la familia. Nadie sabe por qué. Nadie pregunta.' },
				{ cond: 'flag.b06_chamota_calla', text: 'Pueblo Chamota, de piedra rojiza y tejados viejos. En la plaza, dos vecinas discuten si aquella noche se heló todo el pueblo o solo media calle. Llevan treinta años con la misma discusión. Parecen muy a gusto.' },
			],
			mapNote: 'La Noche Blanca · muralla norte (entrenamiento, tope 64) · boca del Boquete Gigante',
			onEnter: [{ script: 'b06_chamota_llegada', cond: '!flag.b06_chamota_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Ultramarinos de la plaza', sub: 'Lo traen en el tren de la mañana', action: { shop: 'tienda_mayolica' } },
				{ label: '🚆 Tren a Mayólica', sub: 'Andén único, banco de madera, un reloj con dos agujas', icon: '🚆', action: { go: 'mayolica' } },
				{ label: 'Inés, la cartera', sub: 'Reparte con la bandolera llena', icon: '✉️', cond: LLEGADA, new: '!flag.b06_testigo_ines', talk: [
					{ cond: '!flag.b06_testigo_ines', script: 'b06_testigo_ines' },
					{ cond: 'flag.b06_t2_hecho', script: 'b06_ines_despues' },
					{ script: 'b06_ines_generico' },
				] },
				{ label: 'Don Teodoro', sub: 'En su banco de la plaza, con un cuaderno de tapas duras', icon: '📰', cond: LLEGADA, new: '!flag.b06_testigo_teodoro', talk: [
					{ cond: '!flag.b06_testigo_teodoro', script: 'b06_testigo_teodoro' },
					{ cond: 'flag.b06_chamota_cronica', script: 'b06_teodoro_cronica_despues' },
					{ script: 'b06_teodoro_generico' },
				] },
				{ label: 'Un vecino del barrio sur', sub: 'Riega geranios en una ventana baja', icon: '🪴', cond: LLEGADA, talk: [{ script: 'b06_vecino_sur' }] },
				{ label: 'Rotom: la tabla de horarios', sub: 'Lo que ha dicho cada testigo, y a qué hora', icon: '📱', cond: 'vars.b06_testigos >= 1 && !flag.b06_t2_hecho', talk: [{ script: 'b06_tabla_rotom' }] },
				{ label: 'Llamar a Renata', sub: 'Quiere tu hipótesis antes de saber la verdad', icon: '📞', cond: T + ' == "hipotesis"', new: 'true', talk: [{ script: 'b06_pizarra' }] },
				{ label: 'El campanario', sub: 'Se ve desde cualquier esquina', icon: '🔔', cond: LLEGADA, action: { go: 'campanario_chamota' } },
				{ label: 'Panadería de la calle del Pozo', sub: 'Huele a pan desde la estación', icon: '🥖', cond: LLEGADA, action: { go: 'panaderia_chamota' } },
				{ label: 'Ayuntamiento', sub: 'Un edificio con balcón y un reloj de sol', icon: '🏛️', cond: LLEGADA, action: { go: 'ayuntamiento_chamota' } },
				{ label: 'La muralla norte', sub: 'Zona de entrenamiento (nivel recomendado 64)', icon: '🧱', cond: LLEGADA, action: { go: 'muralla_norte' } },
				{ label: 'Los huertos de dentro', sub: 'Entre la muralla y las últimas casas', icon: '🧺', cond: LLEGADA, action: { go: 'huertos_chamota' } },
				{ label: 'La puerta norte', sub: 'Da a la boca del Boquete Gigante', icon: '🌫️', cond: LLEGADA, action: { go: 'boca_gran_grieta' } },
				{ label: 'Los prados del sur', sub: 'Hierba alta junto a la vía del tren', icon: '🌾', action: { explore: 'grass' } },
			],
			encounters: {
				grass: [
					{ sp: 'unfezant', lv: [60, 62], w: 22 },
					{ sp: 'audino', lv: [60, 62], w: 18 },
					{ sp: 'leavanny', lv: [60, 62], w: 14 },
					{ sp: 'roserade', lv: [60, 62], w: 12, time: 'day' },
					{ sp: 'vespiquen', lv: [61, 62], w: 10, time: 'day' },
					{ sp: 'drifblim', lv: [60, 62], w: 12, time: 'night' },
					{ sp: 'tangrowth', lv: [61, 63], w: 8 },
					{ sp: 'emolga', lv: [60, 62], w: 8 },
					{ sp: 'dunsparce', lv: [60, 62], w: 6 },
					{ sp: 'pinsir', lv: [61, 63], w: 5 },
					{ sp: 'heracross', lv: [61, 63], w: 5 },
					{ sp: 'absol', lv: [62, 63], w: 4, time: 'night' },
					{ sp: 'toucannon', lv: [61, 62], w: 4, displaced: true },
				],
			},
			rumors: [
				{ text: 'En Chamota dicen que hace treinta años, una noche de agosto, el pueblo amaneció helado. Cada vecino te lo cuenta distinto. Y todos se enfadan si les dices que el otro lo cuenta mejor.' },
				{ text: 'El tren de Mayólica llega a Chamota dos veces al día. La cartera lo espera en el andén, siempre la primera, como si esperara a alguien más que al correo.' },
				{ text: 'De noche, en lo alto del campanario, a veces se ve una sombra grande con una melena roja. Los niños dicen que es el fantasma. Los viejos dicen que el fantasma es más pequeño.' },
				{ cond: 'flag.b06_t2_hecho', text: 'Dicen que en Chamota ya no se discute tanto sobre la Noche Blanca. Dicen que se discute igual, pero ahora con cariño.' },
			],
		},

		// =================== EL CAMPANARIO ===================
		campanario_chamota: {
			name: 'El campanario', parent: 'chamota', kind: 'building',
			bg: { type: 'tower', wall: '#8a5a4a', floor: '#5a3a2a' },
			desc: 'Una torre cuadrada de piedra rojiza, con la escalera de caracol por dentro y una puerta pequeña al pie, donde vive el campanero. Arriba, la sala del reloj: una caja de engranajes cerrada con una cerradura de runas. Más arriba, la campana.\n\nLa escalera cruje. Siempre. Aunque no suba nadie.',
			descNight: 'De noche, la esfera del reloj brilla desde dentro y tiñe la escalera de amarillo. Se oye el tictac de los engranajes, lento, y algún crujido de más en los escalones de arriba.',
			descs: [
				{ cond: 'flag.b06_campanario', text: 'La torre cuadrada de piedra rojiza, con su escalera que cruje. La caja del reloj está abierta y engrasada; el campanero ha puesto un cuenco con agua y otro con bayas en el rellano de arriba.\n\nDe vez en cuando, en la escalera, se oyen pasitos. Ya nadie dice que sea un fantasma.' },
			],
			mapNote: 'El campanero · la sala del reloj',
			spots: [
				{ label: 'El campanero', sub: 'En la puerta de su casa, al pie de la torre', icon: '🔔', new: '!flag.b06_testigo_campanero', talk: [
					{ cond: '!flag.b06_testigo_campanero', script: 'b06_testigo_campanero' },
					{ script: 'b06_campanero_generico' },
				] },
				{ label: 'La sala del reloj', sub: 'Una caja de engranajes con cerradura de runas', icon: '⚙️', cond: '!flag.b06_campanario', new: T + ' == "campanario"', talk: [
					{ cond: T + ' == "campanario"', script: 'b06_mecanismo' },
					{ script: 'b06_mecanismo_cerrado' },
				] },
				{ label: 'El rellano de arriba', sub: 'Un cuenco con agua y otro con bayas', icon: '🦊', cond: 'flag.b06_zorua_vive', talk: [{ script: 'b06_zorua_visita' }] },
				{ label: 'El rellano de arriba', sub: 'Un cuenco con agua. Ya no hay pasitos', icon: '🥣', cond: 'flag.b06_zorua', talk: [{ script: 'b06_rellano_vacio' }] },
			],
			rumors: [
				{ text: 'El reloj del campanario de Chamota no se ha parado en treinta años. El campanero dice que no se ha parado nunca. Pero que una vez se paró a pensar.' },
			],
		},

		// =================== LA PANADERÍA ===================
		panaderia_chamota: {
			name: 'Panadería de la calle del Pozo', parent: 'chamota', kind: 'building',
			bg: { type: 'indoor', wall: '#c9a66b', floor: '#8a5a3a' },
			desc: 'Un horno de leña enorme, de bóveda, que ocupa media pared; un mostrador de madera gastado por el centro; sacos de harina hasta el techo. Huele a pan, a leña y a azúcar quemado.\n\nEn una repisa, sobre el horno, una foto vieja de una mujer con delantal y el pelo recogido. Al lado, un ramito de lavanda seca.',
			descNight: 'De madrugada, la panadería ya está encendida: el horno grande respira naranja y la masa sube en sus tablas. Es el único sitio de Chamota donde a las cuatro de la mañana hay alguien cantando.',
			descs: [
				{ cond: 'flag.b06_chamota_cronica', text: 'El horno de bóveda, el mostrador gastado, los sacos de harina. En la repisa, junto a la foto de la mujer del delantal, hay ahora un recorte de periódico enmarcado: la crónica nueva de don Teodoro. Celia lo limpia cada mañana con el delantal.' },
			],
			mapNote: 'Celia, la panadera · el pan de la Noche Blanca',
			spots: [
				{ label: 'Celia', sub: 'Amasa con los brazos llenos de harina', icon: '🥖', new: '!flag.b06_testigo_celia || ' + T + ' == "verdad"', talk: [
					{ cond: '!flag.b06_testigo_celia', script: 'b06_testigo_celia' },
					{ cond: T + ' == "verdad"', script: 'b06_verdad' },
					{ cond: 'flag.b06_t2_hecho', script: 'b06_celia_despues' },
					{ script: 'b06_celia_generico' },
				] },
				{ label: 'Gaspar y Lulú', sub: 'Dos delantales y un saco de azúcar en la puerta', icon: '🍳', cond: 'flag.b06_testigo_celia', new: '!flag.b06_shoku_celia', talk: [
					{ cond: '!flag.b06_shoku_celia', script: 'b06_shokugeki' },
					{ script: 'b06_shoku_despues' },
				] },
				{ label: 'La foto de la repisa', sub: 'Una mujer con delantal y lavanda seca al lado', icon: '🖼️', talk: [{ script: 'b06_foto_asuncion' }] },
			],
		},

		// =================== EL AYUNTAMIENTO ===================
		ayuntamiento_chamota: {
			name: 'Ayuntamiento de Chamota', parent: 'chamota', kind: 'building',
			bg: { type: 'indoor', wall: '#a8988a', floor: '#6a5a4a' },
			desc: 'Un vestíbulo de baldosas frías, un banco largo para esperar y, al fondo, la puerta del despacho de la alcaldesa, siempre abierta. En la pared, un reloj de estación de tren, grande y redondo, que no pega con nada.\n\nDetrás de una reja, el archivo municipal: una puerta de hierro con una cerradura de runas de las de la reforma.',
			descNight: 'De noche, el ayuntamiento está cerrado, pero la ventana del despacho sigue encendida. La alcaldesa trabaja tarde. El reloj de estación da la hora con un clac muy serio.',
			mapNote: 'La alcaldesa · el archivo municipal',
			spots: [
				{ label: 'La alcaldesa', sub: 'Firma papeles con una pluma muy vieja', icon: '🏛️', new: '!flag.b06_testigo_alcaldesa', talk: [
					{ cond: '!flag.b06_testigo_alcaldesa', script: 'b06_testigo_alcaldesa' },
					{ script: 'b06_alcaldesa_generico' },
				] },
				{ label: 'El archivo municipal', sub: 'Puerta de hierro con cerradura de runas', icon: '🗄️', cond: '!flag.b06_decreto', new: DECRETO_LISTO, talk: [
					{ cond: DECRETO_LISTO, script: 'b06_archivo' },
					{ script: 'b06_archivo_cerrado' },
				] },
				{ label: 'El archivo municipal', sub: 'Abierto. Huele a papel viejo', icon: '🗄️', cond: 'flag.b06_decreto', talk: [{ script: 'b06_archivo_despues' }] },
				{ label: 'El reloj de estación', sub: 'Grande, redondo, de otro sitio', icon: '🕰️', talk: [{ script: 'b06_reloj_estacion' }] },
			],
		},

		// =================== LA MURALLA NORTE ===================
		muralla_norte: {
			name: 'La muralla norte', parent: 'chamota', kind: 'area',
			bg: { type: 'castle', far: '#b8c8d8', ground: '#8a7a6a', fog: true },
			desc: 'El tramo más alto de la muralla de Chamota: un paseo de ronda ancho, con almenas mordidas por el viento y una escalera de piedra a cada lado. Desde aquí se ve el norte entero: un bosque oscuro que baja hacia una niebla que no se mueve. El **Boquete Gigante**.\n\nAquí arriba hace frío. Siempre. Incluso en agosto.\n\nLos de la **Ronda de la muralla** hacen guardia por turnos, con linterna, desde hace treinta años. Y entrenan entre guardia y guardia.',
			descNight: 'De noche, la muralla norte es una línea de linternas. La niebla del Boquete brilla un poco con la luna, como si tuviera escarcha por dentro. El viento que sube huele a nieve.',
			mapNote: 'La Ronda (entrenamiento, tope 64) · una grieta que no se derrite',
			spots: [
				{ label: 'La Ronda de la muralla', sub: 'Zona de entrenamiento (nivel recomendado 64)', icon: '🥋', action: { training: {
					cap: 64, trainers: ['muralla_1', 'muralla_2', 'muralla_3'], npc: 'vecino_teselia', coach: 'El capitán de la Ronda',
					prize: { wins: 3, script: 'b06_premio_muralla' },
					closed: 'El capitán de la Ronda mira a tu equipo, luego a la muralla, luego otra vez a tu equipo. «Con esos no me hace falta guardia. Me hace falta que no me tiren una almena. Aquí ya no aprenden nada».',
				} } },
				{ label: 'Una grieta en la muralla', sub: '{riolu} se ha quedado mirándola', icon: '🌀', cond: LUC + ' && !flag.b06_escarcha', new: 'true', talk: [{ script: 'b06_rastreo' }] },
				{ label: 'Una grieta en la muralla', sub: 'Escarcha en pleno día', icon: '❄️', cond: '!(' + LUC + ') && !flag.b06_escarcha', talk: [{ script: 'b06_rastreo_sin_aura' }] },
				{ label: 'La grieta de la escarcha', sub: 'Sigue blanca. Sigue fría', icon: '❄️', cond: 'flag.b06_escarcha', talk: [{ script: 'b06_grieta_despues' }] },
			],
			rumors: [
				{ text: 'La Ronda de la muralla de Chamota se fundó a la mañana siguiente de la Noche Blanca. Desde entonces, cada noche, alguien camina la muralla norte con una linterna. Nadie se acuerda ya de qué vigilan. Siguen vigilándolo.' },
				{ cond: 'flag.b06_escarcha', text: 'En una grieta de la muralla norte hay escarcha que no se derrite. Dicen que es de aquella noche. Dicen que, si pegas la oreja, se oye algo respirar muy lejos, muy despacio.' },
			],
		},

		// =================== LOS HUERTOS ===================
		huertos_chamota: {
			name: 'Los huertos de dentro', parent: 'chamota', kind: 'area',
			bg: { type: 'ranch', ground: '#7a8a4a', far: '#c9a46a' },
			desc: 'Entre las últimas casas y la muralla hay una franja de huertos en terrazas, cada uno con su caseta, su pozo y su vecino discutiendo con el de al lado por el agua. Árboles de bayas en espaldera contra la piedra, que da calor de día y lo devuelve de noche.\n\nUn cartel en la cancela: «Coja lo que caiga. Lo que cuelga, pregunte».',
			descNight: 'De noche, los huertos huelen a tierra mojada y a fruta. Las casetas tienen un farol cada una, y los Pokémon del pueblo bajan a comerse lo que se ha caído.',
			mapNote: 'Árboles de bayas en espaldera (cosecha diaria)',
			spots: [
				{ label: 'Las espalderas de bayas', sub: 'Ramas pegadas a la muralla, cargadas', icon: '🧺', new: '!flag.rec_b06_huertos_chamota', action: { gather: 'b06_huertos_chamota' } },
				{ label: 'Pasear entre las terrazas', sub: 'Algo se mueve entre las coles', icon: '🌿', action: { explore: 'grass' } },
			],
			encounters: {
				grass: [
					{ sp: 'audino', lv: [60, 62], w: 26 },
					{ sp: 'leavanny', lv: [60, 62], w: 18 },
					{ sp: 'vespiquen', lv: [60, 62], w: 14, time: 'day' },
					{ sp: 'roserade', lv: [60, 62], w: 14 },
					{ sp: 'tangrowth', lv: [61, 63], w: 12 },
					{ sp: 'drifblim', lv: [60, 62], w: 10, time: 'night' },
					{ sp: 'heracross', lv: [61, 63], w: 4 },
				],
			},
		},

		// =================== LA BOCA DEL BOQUETE GIGANTE ===================
		boca_gran_grieta: {
			name: 'Boca del Boquete Gigante', parent: 'chamota', kind: 'area',
			bg: { type: 'forest', ground: '#6a7a6a', far: '#c8d8e8', fog: true },
			desc: 'Al otro lado de la puerta norte, el camino baja entre pinos negros hasta un claro que no tiene fondo: la boca del **Boquete Gigante**. Una niebla blanca, quieta, como si estuviera pintada. El suelo cruje: hay escarcha en las agujas de pino, en agosto, en enero, siempre.\n\nMás adentro, el paso está cerrado por una pared de hielo azul, lisa como un espejo, más alta que la muralla.',
			descNight: 'De noche, la niebla del Boquete brilla con un azul muy pálido, desde dentro. El hielo de la pared refleja tu linterna mil veces. Y de muy al fondo, a veces, llega un sonido largo, grave, que no es el viento.',
			mapNote: 'Boca del Boquete Gigante · el paso, cerrado por el hielo',
			spots: [
				{ label: 'Entre los pinos de la boca', sub: 'Hierba escarchada que cruje', icon: '🌲', action: { explore: 'grass' } },
				{ label: 'La pared de hielo', sub: 'Lisa, azul, más alta que la muralla', icon: '🧊', talk: [{ script: 'b06_pared_hielo' }] },
				{ label: 'El hielo de la boca', sub: 'Bloques sueltos al pie de la pared', icon: '⛏️', new: '!flag.rec_b06_hielo_boca', action: { gather: 'b06_hielo_boca' } },
			],
			encounters: {
				grass: [
					{ sp: 'tangrowth', lv: [60, 62], w: 22 },
					{ sp: 'pelipper', lv: [60, 62], w: 14 },
					{ sp: 'mamoswine', lv: [61, 63], w: 12 },
					{ sp: 'vanilluxe', lv: [61, 63], w: 12 },
					{ sp: 'clefable', lv: [61, 63], w: 10, time: 'night' },
					{ sp: 'lunatone', lv: [61, 62], w: 8, time: 'night' },
					{ sp: 'solrock', lv: [61, 62], w: 8, time: 'day' },
					{ sp: 'delibird', lv: [60, 62], w: 8 },
					{ sp: 'ditto', lv: [60, 62], w: 6 },
					{ sp: 'ninetalesalola', lv: [61, 63], w: 4, displaced: true },
					{ sp: 'metagross', lv: [62, 63], w: 3 },
				],
			},
			rumors: [
				{ text: 'Nadie de Chamota ha pasado de la pared de hielo del Boquete Gigante. El hielo no se derrite ni se rompe. El campanero dice que se puede oír, de noche, cómo alguien lo empuja desde dentro. Muy despacio.' },
				{ text: 'En la boca del Boquete hay un Ditto que imita a los pinos. Los de la Ronda lo saben porque es el único pino que estornuda.' },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES (zona de entrenamiento de la muralla, tope 64)
	// =====================================================================
	trainers: {
		muralla_1: { name: 'Eladio', cls: 'Vigía de la Ronda', ai: 3, npc: 'vecino_teselia', bg: 'castle',
			team: [
				{ sp: 'beartic', lv: 62, moves: ['iciclecrash', 'superpower', 'aquajet', 'stoneedge'], ability: 'swiftswim' },
				{ sp: 'excadrill', lv: 62, moves: ['earthquake', 'ironhead', 'rockslide', 'swordsdance'], ability: 'moldbreaker' },
			],
			intro: 'Mi turno es de dos a cuatro de la madrugada. Treinta años sin que pase nada. ¿Sabes lo que cuesta vigilar nada? Venga, que me despejo.',
			win: 'Despejado. Del todo. Ahora no me duermo ni en el turno de las cuatro.' },
		muralla_2: { name: 'Clotilde', cls: 'Vigía de la Ronda', ai: 3, bg: 'castle',
			team: [
				{ sp: 'vanilluxe', lv: 63, moves: ['freezedry', 'flashcannon', 'blizzard', 'acidarmor'], ability: 'snowwarning' },
				{ sp: 'gigalith', lv: 63, moves: ['stoneedge', 'earthquake', 'heavyslam', 'stealthrock'], ability: 'sturdy' },
			],
			intro: 'Mi abuela fundó la Ronda la mañana después. Decía: «Si algo baja del norte, que nos pille despiertos». No ha bajado nada. Yo sigo despierta.',
			win: 'Buen combate. Mi abuela te habría dejado hacer el turno de la una. Es el de más frío.',
			look: { hair: 'braids', hairColor: '#4a3a2a', outfit: '#5a6a7a', outfit2: '#c9a66b', skin: 2, eyesStyle: 'sharp', mouth: 'flat', acc: 'bandana' } },
		muralla_3: { name: 'Nemesio', cls: 'Capitán de la Ronda', ai: 3, bg: 'castle',
			team: [
				{ sp: 'mamoswine', lv: 63, moves: ['earthquake', 'iciclespear', 'iceshard', 'stoneedge'], ability: 'thickfat' },
				{ sp: 'cryogonal', lv: 63, moves: ['freezedry', 'rapidspin', 'recover', 'reflect'], ability: 'levitate' },
				{ sp: 'golurk', lv: 64, moves: ['highhorsepower', 'shadowpunch', 'icepunch', 'rockslide'], ability: 'ironfist' },
			],
			intro: 'Capitán de la Ronda. Lo de capitán es porque soy el único que tiene silbato. Si me ganas, te doy algo que se ha quedado frío aquí arriba. Literalmente.',
			win: 'Toma aire. Del frío. Aquí arriba es gratis.',
			look: { hair: 'short', hairColor: '#9aa0a8', outfit: '#3a4a5a', outfit2: '#e9e3d0', skin: 3, eyesStyle: 'narrow', mouth: 'flat', acc: 'beard beanie', capColor: '#8a2f3a' } },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LLEGADA ===================
		b06_chamota_llegada: [
			{ set: { 'flag.b06_chamota_llegada': true } },
			{ cutscene: { time: 'dia', bg: BG_CHAMOTA, start: 'dark', frames: [
				{ big: true, text: 'Pueblo Chamota', sub: 'Teselia', hold: 2400, cam: 'still' },
				{ cam: 'pull', fx: 'light', text: 'El tren de Mayólica se para al final de la vía, donde se acaba el raíl y empieza la muralla. Un pueblo entero de piedra rojiza, apretado, con los tejados uno encima de otro.' },
				{ cam: 'pan-up', text: 'Por encima de todo, un campanario cuadrado. Y al norte, la muralla más alta, y detrás, una niebla blanca que no se mueve aunque sople el viento.' },
				{ actors: [{ id: 'ines', at: 'left', enter: 'left', do: 'nod' }], cam: 'push', text: 'En el andén, la primera, una mujer con gorra de Correos y una bandolera llena. Recoge la saca del tren y te mira como se mira a alguien que no viene en el horario.' },
			] } },
			{ say: 'ines', text: 'Tú no eres de aquí. —No es una pregunta—. Inés Garza, la cartera. Recojo el correo de los dos trenes. Al de la mañana y al de la tarde. A ti no te esperaba ninguno.' },
			{ say: 'ines', text: '¿De la Gira? —Mira tu pase—. Vaya. Aquí no viene nadie de la Gira. No hay gimnasio, no hay Puerta y no hay nada que ver, salvo la muralla. Y la muralla ya la ha visto todo el mundo.' },
			{ text: 'La Pokédex vibra. Una llamada. En la pantalla, una foto de perfil con unas gafas redondas y un micrófono.' },
			// FUERA DE MICRO
			{ say: 'renata', as: 'Renata (holomisor)', text: '¡Testigo! ¿Estás en Chamota? Dime que estás en Chamota. Rotom me ha mandado tu ubicación. Bueno, se la he pedido yo. Bueno, se la he pedido tres veces.' },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Escúchame. Chamota es **el** caso frío de Teselia. Treinta años. Una noche de agosto: el pueblo amanece helado, el campanario da las doce dos veces, arde la panadería y una niña pasa la noche fuera de casa. Y cinco vecinos que lo cuentan de cinco formas.' },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Yo no puedo ir. Desde el episodio nueve, en Chamota me cuelgan el teléfono. Soy «la de la radio». Pero tú eres de la Gira. A ti te van a hablar.' },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Regla de la casa: escúchalos a todos. Apunta las horas. Y cuando tengas una hipótesis, me llamas **antes** de saber la verdad. Si me la cuentas después, no vale. Nota para el episodio: no hay trampas en mi pizarra.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Yo apunto las horas! ¡Es lo que mejor se me da! ¡Bueno, eso y las fotos! ¡Y los mapas! ¡Y…!' },
			{ say: 'ines', text: '—Ha oído la llamada entera. Se recoloca la gorra—. La Noche Blanca. Claro. Siempre es por la Noche Blanca. —Pausa—. Yo tenía ocho años. Si quieres mi versión, búscame. Reparto hasta las tres. Después estoy en la plaza.' },
			{ quest: 'b06_s_chamota', stage: 'testigos' },
			{ diary: 'Hoy mi entrenador{|a|e} ha llegado en tren a Pueblo Chamota, que está metido dentro de una muralla como un caracol en su concha. Renata quiere que resolvamos un misterio de hace treinta años. Dice que hay cinco versiones. Yo solo tengo una memoria, pero es muy buena. La cartera, Inés, nos esperaba en el andén sin esperarnos. Eso también es un misterio.', cond: 'flag.b01_diario' },
		],

		// =================== TESTIGOS ===================
		b06_testigo_campanero: [
			{ set: { 'flag.b06_testigo_campanero': true } },
			{ text: 'Al pie de la torre, en una puerta pequeña con un felpudo que pone «NO SUBIR», un hombre con chaleco y la cara redonda saca brillo a una campana de mano.' },
			{ say: 'campanero', text: '¿La Noche Blanca? —Deja la campana muy despacio—. Fue el fantasma. Lo sabe todo el pueblo. Bueno, lo sabe todo el pueblo que tiene oídos.' },
			{ say: 'campanero', text: 'Mi padre era campanero, como su padre. Tocaba las horas a mano. El reloj de la torre ya daba solo, desde la reforma, pero él no se fiaba de un reloj que no tiene manos. Así que subía y las tocaba él.' },
			{ say: 'campanero', text: 'Esa noche subió a dar las doce. Las dio, una a una, por su reloj de bolsillo. Bajó. Se sentó aquí, donde está usted. Y al rato, cosa de una hora, **la campana dio otras doce**. Sola. Y él no había subido.' },
			{ say: 'campanero', text: 'Y oyó pasitos en la escalera. Pasitos pequeños, subiendo. Mi padre no volvió a subir de noche en su vida. Cerró la caja del reloj con la combinación y dejó que diera las horas solo.' },
			{ choice: [
				{ text: '«¿Pasitos de qué?»', then: [
					{ say: 'campanero', text: 'Pequeños. Como de crío descalzo. —Se frota los brazos—. Yo los sigo oyendo, ¿eh? De noche. Pero ya no digo nada, porque mi mujer dice que es la madera.' },
				] },
				{ text: '«¿Y la caja del reloj? ¿Se puede abrir?»', then: [
					{ say: 'campanero', text: 'Mi padre la cerró. Y lo que cerró mi padre no lo abro yo sin un motivo. Un motivo de verdad, no de la radio.' },
				] },
			] },
			{ if: LUC, then: [{ text: '{riolu} mira hacia arriba, hacia lo alto de la escalera de caracol, con una oreja girada. No gruñe. Solo escucha.' }] },
			...AVANCE_TESTIGO,
			{ intel: { npc: 'ines', text: 'La Noche Blanca · el campanero: su padre tocó las doce a mano; una hora después, la campana dio otras doce sola. Pasitos en la escalera. Cerró la caja del reloj y no volvió a subir de noche.' } },
		],
		b06_testigo_teodoro: [
			{ set: { 'flag.b06_testigo_teodoro': true } },
			{ text: 'En el banco de la plaza, a la sombra del campanario, un anciano de boina y barba blanca escribe en un cuaderno de tapas duras con una pluma estilográfica. Lleva un reloj de bolsillo de plata colgado del chaleco.' },
			{ say: 'teodoro', text: 'Siéntese, siéntese. Teodoro Albar, cronista de Chamota. Sesenta años de crónicas. Nadie las lee. Por eso las escribo bien: para el que las lea dentro de cien años, que será más listo que los de ahora.' },
			{ say: 'teodoro', text: '¿La Noche Blanca? La escribí yo a la mañana siguiente, con los dedos todavía helados. Lo que vi, a la hora que lo vi. Ni una palabra de más. —Saca un recorte amarillo de entre las páginas—. Tenga. Léala. Luego me dice.' },
			{ give: 'cronicachamota' },
			{ read: 'cronicachamota' },
			{ say: 'teodoro', text: 'El pueblo entero, blanco. Hasta el último tejado. Lo vi con estos ojos desde mi balcón.' },
			{ choice: [
				{ text: '«¿Dónde vivía usted, don Teodoro?»', then: [
					{ say: 'teodoro', text: 'En la calle de la Muralla, junto a la puerta norte. La mejor vista del pueblo. —Se para—. ¿Por qué lo pregunta?' },
					{ say: 'teodoro', text: 'Los del sur dicen que en su calle no se heló nada. Los del sur dicen muchas cosas. Tienen el sol todo el día y se les reblandece el juicio.' },
				] },
				{ text: '«¿Y ese reloj de bolsillo?»', then: [
					{ say: 'teodoro', text: 'Era de mi padre. Lleva la hora de mi padre. —Le da un golpecito—. Hay quien cambia su reloj por lo que le diga un tren. Yo no. Un reloj no se cambia por un tren.' },
				] },
			] },
			...AVANCE_TESTIGO,
			{ intel: { npc: 'teodoro', text: 'Cronista de Chamota, 80 años. Escribió la crónica de la Noche Blanca a la mañana siguiente: fuego a las 00:40 por su reloj, doce campanadas a la una. Vivía en el norte. No cambia su reloj «por un tren».' } },
		],
		b06_testigo_celia: [
			{ set: { 'flag.b06_testigo_celia': true } },
			{ text: 'Detrás del mostrador, una mujer grande con rizos canosos recogidos en un pañuelo amasa como si la masa le debiera dinero. Tiene las mejillas encendidas del horno y las manos llenas de harina. Y de marcas viejas, de quemaduras, como todas las panaderas.' },
			{ say: 'celia', text: '¡Pasa, pasa, que no muerdo! La masa sí. —Se ríe muy fuerte—. Celia. La panadería es mía y de mi madre, que en paz descanse. ¿Qué te pongo? ¿Una barra? ¿Dos? ¿Una historia?' },
			{ say: 'celia', text: '¿La Noche Blanca? —La risa se le queda un segundo en la cara, sin nada detrás—. Fue el frío. Mira, eso lo sé seguro. A medianoche bajó un frío de los que no se ven en agosto, y mi madre encendió el horno grande para que no se le helara la masa.' },
			{ say: 'celia', text: 'Y el frío reventó algo. El tiro, el ladrillo, no sé. Ardió media panadería. Mi madre lo levantó todo otra vez, con estas manos. Bueno, con las suyas.' },
			{ choice: [
				{ text: '«¿Y tú dónde estabas?»', then: [
					{ say: 'celia', text: 'Yo… en cama. Con fiebre. En casa de mi tía, al otro lado del pueblo. —Amasa más fuerte—. Me enteré por la mañana. Como todos.' },
				] },
				{ text: '«¿Tu madre te dejaba usar el horno grande?»', then: [
					{ say: 'celia', text: '¿A mí? ¡Ja! Ni tocarlo. Yo era la aprendiza. La aprendiza barre, acarrea leña y mira. Mi madre decía que el horno grande tiene genio y que hay que ganárselo.' },
				] },
			] },
			{ say: 'celia', text: 'Y la gente dice «fue el fantasma». Que lo diga. Un fantasma no paga la harina. —Te pone un panecillo en la mano sin preguntar—. Toma. Que estás muy flac{o|a|e} para andar de detective.' },
			...AVANCE_TESTIGO,
			{ intel: { npc: 'celia', text: 'Panadera de Chamota, 60 años. Su versión: fue el frío; su madre encendió el horno grande a medianoche y algo reventó. Dice que ella estaba en cama con fiebre, en casa de su tía. Era la aprendiza.' } },
		],
		b06_testigo_ines: [
			{ set: { 'flag.b06_testigo_ines': true } },
			{ text: 'Inés está sentada en el borde de la fuente de la plaza, con la saca vacía doblada en las rodillas y un bocadillo a medias.' },
			{ say: 'ines', text: 'Has venido. —Mira el bocadillo, luego a ti—. Te lo cuento una vez. Luego no me preguntes más, que llevo treinta años contándolo y nadie se lo cree.' },
			{ say: 'ines', text: 'Vivía en la calle del Pozo. Pared con pared con la panadería. Esa noche una niña me tocó en la ventana. Una niña de mi edad, más o menos, con el pelo **azul**. No era de aquí. Aquí no hay nadie con el pelo azul.' },
			{ say: 'ines', text: 'Me hizo así con la mano. Que fuera. Y fui. En camisón. Me llevó calle arriba hasta la muralla norte, y allí **nevaba**. En agosto. Me dormí en un hueco de la piedra, con algo caliente encima. Algo que respiraba.' },
			{ say: 'ines', text: 'Me encontraron por la mañana. Mi casa olía a humo. La niña no estaba. No la encontró nadie. Mi madre dijo que me la había inventado.' },
			{ say: 'ines', text: '—Saca de la bandolera un cuaderno pequeño, de colegio, con las tapas dobladas—. Lo escribí al día siguiente. Tenía ocho años, no te rías de las faltas. Lo llevo siempre encima. No sé por qué. Bueno, sí sé.' },
			{ give: 'cuadernoines' },
			{ read: 'cuadernoines' },
			{ choice: [
				{ text: '«Te creo.»', then: [
					{ say: 'ines', text: '—Te mira mucho rato—. Eres la cuarta persona que me lo dice en treinta años. Las otras tres eran mi perro, mi abuela y un señor del tren que iba borracho.' },
				] },
				{ text: '«¿Por qué una niña te iba a sacar de casa?»', then: [
					{ say: 'ines', text: 'Eso me pregunto yo. Para jugar no era. No se reía. Tiraba de mí como si llegáramos tarde a algo.' },
				] },
			] },
			...AVANCE_TESTIGO,
			{ intel: { npc: 'ines', text: 'Cartera de Chamota, 38 años. A los 8, una «niña de pelo azul» la sacó de su casa (pared con pared con la panadería) hasta la muralla norte, donde nevaba; durmió con «algo caliente que respiraba». Lleva siempre su cuaderno de entonces.' } },
		],
		b06_testigo_alcaldesa: [
			{ set: { 'flag.b06_testigo_alcaldesa': true } },
			{ text: 'La alcaldesa es una mujer seria, con media melena y gafas en la punta de la nariz. Firma papeles con una pluma muy vieja y no levanta la vista hasta que ha terminado la firma. Es una firma larga.' },
			{ say: 'alcaldesa', text: 'Siéntese. Me lo imaginaba. La Noche Blanca. —Deja la pluma—. Le voy a decir lo que pienso, y luego usted va a hacer lo que hace todo el mundo: no hacerme caso.' },
			{ say: 'alcaldesa', text: 'Esa noche cambiamos la hora. Chamota adoptó la hora del ferrocarril regional, que va una hora por detrás de la del sol. Mi padre era el secretario del ayuntamiento: levantó el acta él.' },
			{ say: 'alcaldesa', text: 'La gente dice que eso fue otro año, porque la fiesta del reloj, con banda y todo, se hizo a la semana siguiente. Pero el cambio fue esa noche, a medianoche, sin banda. Cuatro firmas en la plaza y a casa.' },
			{ choice: [
				{ text: '«¿Y qué tiene que ver la hora con un incendio?»', then: [
					{ say: 'alcaldesa', text: 'No lo sé. Yo no he dicho que lo sepa. He dicho que todo el mundo cuenta horas, y nadie dice con qué reloj.' },
				] },
				{ text: '«¿Tiene el acta?»', then: [
					{ say: 'alcaldesa', text: 'En el archivo municipal. Que está cerrado desde las obras con una cerradura de runas que eligió un concejal que ya no es concejal. Me sé la combinación de oído, pero me pongo nerviosa.' },
				] },
			] },
			{ say: 'alcaldesa', text: 'Una cosa sí le puedo dar, que la tengo a mano porque la uso para que no me tomen el pelo con los presupuestos. —Saca una factura de una carpeta—. El ayuntamiento pagó los cristales rotos de aquella noche. Mire de qué calles son.' },
			{ give: 'facturavidriero' },
			{ read: 'facturavidriero' },
			{ say: 'alcaldesa', text: 'El vidriero no cambió ni un cristal del sur. Ni uno. Y en agosto, si se hiela el norte, se hiela el sur. Eso no es un fantasma. Eso es una corriente.' },
			...AVANCE_TESTIGO,
			{ say: 'alcaldesa', text: 'Si quiere ver el acta, el archivo está detrás de la reja. Cuando haya escuchado a los demás, venga y la abrimos. No me gusta abrir el archivo para una sola versión.', cond: '!(' + DECRETO_LISTO + ')' },
			{ say: 'alcaldesa', text: 'Ya ha hablado con medio pueblo, ¿no? Pues vamos al archivo. Por lo menos que alguien lea el acta antes de que me jubile.', cond: DECRETO_LISTO },
			{ intel: { npc: 'ines', text: 'La alcaldesa (Chamota): esa noche, a medianoche, el pueblo adoptó la hora del ferrocarril, una hora por detrás de la del sol (acta en el archivo). El ayuntamiento solo pagó cristales rotos de las calles del norte.' } },
		],

		// ---------- Conversaciones después ----------
		b06_campanero_generico: [
			{ if: 'flag.b06_campanario', then: [
				{ say: 'campanero', text: 'Le he puesto agua y bayas en el rellano. Mi mujer dice que es para la madera. Yo le digo que sí, que la madera tiene mucha sed.' },
			], else: [
				{ say: 'campanero', text: 'Las doce dos veces. Una con mano y otra sin mano. —Se santigua con la campana—. Usted dirá.', cond: T + ' != "campanario"' },
				{ say: 'campanero', text: '¿Que fue la hora? ¿Que mi padre tocó unas doce y el reloj otras? —Se queda muy quieto—. Pues suba. Abra la caja. Si dentro hay una explicación, quiero verla. Y si hay otra cosa, también.', cond: T + ' == "campanario"' },
			] },
		],
		b06_teodoro_generico: [
			{ if: 'flag.b06_decreto', then: [
				{ say: 'teodoro', text: '¿El ferrocarril? ¿Esa noche? —Abre el reloj de bolsillo, lo mira, lo cierra—. Treinta años diciendo que a la una dieron las doce. Y a la una dieron las doce. Yo no mentía. Mi reloj tampoco. Es el mundo, que se movió una hora.' },
			], else: [
				{ say: 'teodoro', text: 'Lea la crónica otra vez. Todo está ahí. Las horas, las campanadas, el fuego. Lo que no está ahí, es que no pasó.' },
			] },
		],
		b06_teodoro_cronica_despues: [
			{ say: 'teodoro', text: 'He escrito la crónica más importante de mi vida a los ochenta años. Y la segunda más importante a los cincuenta. Las dos de la misma noche. —Se ríe, bajito—. La primera era verdad. La segunda es más verdad.' },
		],
		b06_ines_generico: [
			{ if: 'flag.b06_campanario', then: [
				{ say: 'ines', text: 'Dicen que en el campanario hay algo con cola. —Se recoloca la gorra—. No me lo cuentes todavía. Cuéntamelo cuando lo sepas entero.' },
			], else: [
				{ say: 'ines', text: 'Hoy hay poco correo. Un catálogo de semillas, una multa y una postal de alguien que está de vacaciones y quiere que se sepa.' },
			] },
		],
		b06_ines_despues: [
			{ if: 'flag.b06_zorua', then: [
				{ say: 'ines', text: '¿Cómo está? ¿Come? ¿Se porta bien? —No te deja contestar—. Da igual. Dile que en el andén de Chamota hay alguien que lo espera. A él no le hace falta horario.' },
			], else: [
				{ say: 'ines', text: 'Subo al campanario cada tarde, después del reparto. Le llevo bayas. Él me trae cosas: un botón, una pinza, una carta que no era para nadie. —Sonríe con media boca—. Es peor cartero que yo.' },
			] },
		],
		b06_celia_generico: [
			{ say: 'celia', text: '¿Otra vez por aquí? Toma, una barra. Gratis. Hoy me ha salido torcida y no me la compra nadie del pueblo; los del pueblo son muy suyos con la forma.' },
		],
		b06_celia_despues: [
			{ if: 'flag.b06_chamota_cronica', then: [
				{ say: 'celia', text: 'Esta semana he vendido el doble. La gente entra, compra, me da un abrazo y se va. Uno me ha abrazado con la barra puesta y me la ha partido. Me da igual. Que abracen.' },
			] },
			{ if: 'flag.b06_chamota_privado', then: [
				{ say: 'celia', text: 'Inés viene a desayunar todos los días. Se sienta en el mostrador, como cuando era una cría, y me roba los bordes del pan. —Se pasa el dorso de la mano por los ojos—. Harina. Es la harina.' },
			] },
			{ if: 'flag.b06_chamota_calla', then: [
				{ say: 'celia', text: 'Ayer una vecina me dijo que fue el fantasma. Le dije que sí, que seguro. Y por primera vez en treinta años no me pesó decirlo. —Te guiña un ojo—. Porque ya lo sabe alguien.' },
			] },
		],
		b06_alcaldesa_generico: [
			{ if: 'flag.b06_decreto', then: [
				{ say: 'alcaldesa', text: 'Treinta años sin que nadie me haga caso, y llega usted y lee un acta. —Se ajusta las gafas—. Voy a proponer que la fiesta del reloj se haga el día que toca. Con banda. Va a haber un escándalo precioso.' },
			], else: [
				{ say: 'alcaldesa', text: 'Escuche a los demás y vuelva. El archivo no se va a ir. Por desgracia, tampoco se va a ordenar solo.' },
			] },
		],
		b06_vecino_sur: [
			{ say: 'vecino_teselia', as: 'Vecino del barrio sur', text: '¿Helada? ¿En agosto? —Se ríe con la regadera en la mano—. Eso son cuentos de los del norte. Yo esa noche dormí con la ventana abierta y sudando. Mis geranios ni se enteraron.' },
			{ say: 'vecino_teselia', as: 'Vecino del barrio sur', text: 'Lo que sí me despertó fueron las campanas. Doce. Y luego, al rato, otras doce. Pensé que me había quedado dormido una hora y que el campanero se había vuelto loco. Lo primero era verdad.' },
		],
		b06_foto_asuncion: [
			{ text: 'Una foto en blanco y negro con marco de madera: una mujer con delantal, el pelo recogido en un moño apretado y los brazos cruzados delante de un horno. No sonríe, pero se le nota que está a punto.' },
			{ text: 'Abajo, en el marco, con letra de lápiz: «Asunción Prieto. El horno tiene genio. Hay que ganárselo».' },
			{ if: 'flag.b06_t2_hecho', then: [{ text: 'Alguien ha puesto lavanda fresca junto a la seca.' }] },
		],
		b06_reloj_estacion: [
			{ text: 'Un reloj de estación, redondo y enorme, con el escudo del Ferrocarril Regional de Teselia en la esfera. No pega con las baldosas, ni con el banco, ni con nada del ayuntamiento.' },
			{ text: 'En una placa de latón, debajo: «Regalo de la Compañía a la villa de Chamota, con motivo de su incorporación a la hora del ferrocarril».' },
			{ text: 'La placa no tiene fecha. Alguien la limó hace mucho.', cond: '!flag.b06_decreto' },
			{ text: 'La placa no tiene fecha. Ahora sabes cuál era.', cond: 'flag.b06_decreto' },
		],

		// =================== LA TABLA DE ROTOM ===================
		b06_tabla_rotom: [
			{ say: 'rotom', text: '¡Bzzt! ¡Tabla de horarios de la Noche Blanca! Versión «lo que nos han dicho», sin ordenar. ¡Ordenar es lo difícil!', cond: '!flag.b06_decreto' },
			{ say: 'rotom', text: 'Campanero: su padre tocó **las doce** a mano. Una hora después, la campana dio **otras doce** sola.', cond: 'flag.b06_testigo_campanero' },
			{ say: 'rotom', text: 'Don Teodoro: **00:40**, fuego en la panadería, por su reloj. **A la una**, doce campanadas. Y todo el pueblo helado.', cond: 'flag.b06_testigo_teodoro' },
			{ say: 'rotom', text: 'Celia: a **medianoche**, su madre encendió el horno grande. Ella, en cama con fiebre, al otro lado del pueblo.', cond: 'flag.b06_testigo_celia' },
			{ say: 'rotom', text: 'Inés: la sacaron de casa **antes de las doce**. Estaba en la muralla cuando sonaron. Luego, otra vez.', cond: 'flag.b06_testigo_ines' },
			{ say: 'rotom', text: 'Alcaldesa: a **medianoche**, el pueblo cambió a la hora del ferrocarril. Cristales rotos, solo en el norte.', cond: 'flag.b06_testigo_alcaldesa' },
			{ say: 'rotom', text: '¡Bzzt! Todo el mundo dice «medianoche». Pero, ¿qué medianoche? ¡Me da vueltas el procesador!', cond: '!flag.b06_decreto && vars.b06_testigos >= 3' },
			{ if: 'flag.b06_decreto', then: [
				{ say: 'rotom', text: '¡Bzzt! ¡Versión ordenada, con el método de Matière! ¡Dos columnas! ¡Me encantan las columnas!' },
				{ read: 'tablahorarios' },
			] },
		],

		// =================== EL ARCHIVO (el decreto, a mitad) ===================
		b06_archivo_cerrado: [
			{ text: 'Una puerta de hierro detrás de una reja, con una cerradura de seis runas. Un cartel pegado con celo: «ARCHIVO MUNICIPAL. Cerrado por obras. Las obras terminaron hace once años».' },
			{ text: 'La alcaldesa tiene la combinación. Habla antes con ella.', cond: '!flag.b06_testigo_alcaldesa' },
			{ text: 'La alcaldesa no quiere abrirlo para una sola versión. Escucha antes a más vecinos.', cond: 'flag.b06_testigo_alcaldesa' },
		],
		b06_archivo: [
			{ if: '!flag.b06_archivo_visto', then: [
				{ set: { 'flag.b06_archivo_visto': true } },
				{ text: 'La alcaldesa sale del despacho con un manojo de llaves que no sirven para nada y se planta delante de la cerradura. Las seis runas se encienden, una detrás de otra.' },
				{ say: 'alcaldesa', text: 'Es así… y así… y luego… —Se equivoca. Las runas se apagan con un pitido—. ¿Ve? Nerviosa. Hágalo usted. Yo le digo si me suena.' },
			], else: [
				{ text: 'La cerradura del archivo vuelve a encender sus runas, con un orden nuevo.' },
			] },
			{ minigame: { type: 'lock', id: 'b06_archivo_chamota', title: 'El archivo municipal', hint: 'Mira en qué orden se encienden las runas y repítelo. Cada cerrojo añade una. La alcaldesa asiente cuando le suena.', theme: 'ruina', level: 3,
				guaranteed: ['decretohora', 'partebomberos'], loot: [{ id: 'oldgateau', w: 6 }, { id: 'ppup', w: 1, rare: true }], picks: 1, consolation: false, lootTitle: 'En la caja de aquel año' },
				onWin: [{ call: 'b06_decreto' }],
				onLose: [
					{ text: 'La última runa se apaga con un zumbido. La cerradura se bloquea. Al rato, una a una, se vuelven a encender.' },
					{ say: 'alcaldesa', text: 'Tranquil{o|a|e}. El concejal que la eligió tardaba diez minutos. Y era el concejal.' },
				],
				onQuit: [{ say: 'alcaldesa', text: 'Cuando quiera. El acta lleva treinta años esperando. Diez minutos más no le van a doler.' }] },
		],
		b06_decreto: [
			{ set: { 'flag.b06_decreto': true } },
			{ text: 'La puerta de hierro se abre con un quejido. Dentro, cajas de cartón numeradas por años, hasta el techo. La alcaldesa va directa a una, como si la hubiera buscado mil veces con los ojos cerrados.' },
			{ text: 'Dentro hay dos papeles juntos, con un clip oxidado. El primero, con sello del ayuntamiento.' },
			{ read: 'decretohora' },
			{ say: 'alcaldesa', text: 'Ahí está. Medianoche. Cuatro firmas. Mi padre, el relojero de la Compañía, el alcalde de entonces… y doña Asunción, la panadera, que trajo el pan del brindis.' },
			{ text: 'El segundo papel lleva el sello del Ferrocarril Regional. Un parte de bomberos.' },
			{ read: 'partebomberos' },
			{ say: 'alcaldesa', text: '«Aviso: 23:40». Antes de medianoche. Y don Teodoro escribió «a la una menos veinte». —Se quita las gafas—. Treinta años llamándolo exagerado. Y los dos tenían razón. Con relojes distintos.' },
			{ if: LUC, then: [{ text: '{riolu} acerca el hocico al parte de bomberos y aparta la cabeza enseguida, como si todavía oliera a humo.' }] },
			// La llamada de Matière: el método de las dos columnas (Database Detective)
			{ set: { 'flag.b06_matiere_llamada': true } },
			{ text: 'La Pokédex vibra. Una llamada desde Kalos.' },
			{ say: 'matiere', as: 'Matière (holomisor)', text: '¡{jugador}! Matière, de la Agencia. ¿Te pillo bien? Handsome me ha dicho que estás en Teselia resolviendo casos para otra detective. Me he puesto celosa. Profesionalmente.' },
			{ say: 'matiere', as: 'Matière (holomisor)', text: 'Una tal Renata ha llamado a la Agencia para preguntar si eres de fiar. Le he dicho que sí. Y que si te roba, la encuentro. —Se ríe—. Bueno. ¿Qué tienes?' },
			{ text: 'Le cuentas lo de las dos medianoches. Se queda callada un momento. Se oye a alguien al fondo, en la Agencia, preguntar si queda café. Ella dice que no sin mirar.' },
			{ say: 'matiere', as: 'Matière (holomisor)', text: 'Lo que tienes es un problema de columnas. Haz una tabla. Una columna con la hora vieja, la del sol. Otra con la hora nueva, la del tren. Y mete cada testimonio en la columna del reloj que llevaba quien lo dijo. No en la que te diga. En la del reloj.' },
			{ say: 'matiere', as: 'Matière (holomisor)', text: 'Cuando dos testigos no casan, no siempre miente uno. A veces llevan relojes distintos. Y a veces uno miente y el otro lleva otro reloj. Por eso se hace la tabla: para saber cuál de las dos cosas pasa.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Tabla hecha! ¡Dos columnas! ¡Ahora tiene sentido casi todo! ¡Lo que no tiene sentido lo he dejado en blanco, que es lo que se hace!' },
			{ give: 'tablahorarios' },
			{ read: 'tablahorarios' },
			{ say: 'matiere', as: 'Matière (holomisor)', text: 'Bien hecho. Ahora, lo que ya cuadra, déjalo. Ve a por lo que no cuadra. —Pausa—. Y dile a esa Renata que en Kalos también hacemos pódcast. Bueno, no. Pero podríamos.' },
			{ quest: 'b06_s_chamota', stage: 'campanario' },
			{ intel: { npc: 'matiere', text: 'Llamó en Chamota: el método de la tabla de dos columnas (hora vieja, hora nueva). «Cuando dos testigos no casan, no siempre miente uno. A veces llevan relojes distintos.»' } },
		],
		b06_archivo_despues: [
			{ text: 'Cajas de cartón por años, hasta el techo. La de aquel año está en la mesa, abierta, con el clip oxidado encima. La alcaldesa ha puesto una etiqueta nueva: «LEÍDO».' },
		],

		// =================== EL RASTREO DE LA ESCARCHA ===================
		b06_rastreo: [
			{ if: '!flag.b06_rastreo_visto', then: [
				{ set: { 'flag.b06_rastreo_visto': true } },
				{ text: 'En la cara norte de la muralla, a la altura de la rodilla, hay una grieta larga entre dos sillares. Y dentro de la grieta, en pleno día, hay escarcha. Blanca. Crujiente.' },
				{ text: '{riolu} se agacha delante, con las palmas abiertas. Las orejas le tiemblan. No mira la grieta: mira a través de ella, hacia el norte, hacia la niebla del Boquete.' },
				{ say: 'rotom', text: '¡Bzzt! Temperatura de la grieta: tres grados bajo cero. Temperatura del aire: veintiséis. Esto no cuadra ni con dos columnas.' },
			], else: [
				{ text: '{riolu} vuelve a agacharse ante la grieta. El aura le dibuja el frío en el aire, en hilos blancos.' },
			] },
			{ minigame: { type: 'aura', id: 'b06_rastreo_escarcha', title: 'La grieta de la escarcha', hint: '{riolu} sigue el frío por dentro de la muralla. Cada pulso dice si está cerca. Busca de dónde viene.', theme: 'campo', level: 3,
				guaranteed: ['escarchamuralla'], loot: [{ id: 'nevermeltice', w: 6 }, { id: 'stardust', w: 4 }, { id: 'icestone', w: 1, rare: true }], picks: 2, consolation: false, lootTitle: 'Dentro de la grieta' },
				onWin: [{ call: 'b06_escarcha' }],
				onLose: [{ text: 'El frío se te escapa entre los sillares. {riolu} resopla, se sacude las patas y vuelve a ponerse delante de la grieta. Quiere otra vez.' }],
				onQuit: [{ text: '{riolu} se queda un rato más mirando la grieta. Luego te sigue, de mala gana.' }] },
		],
		b06_escarcha: [
			{ set: { 'flag.b06_escarcha': true } },
			{ text: 'Al fondo de la grieta, donde la muralla tiene más de un metro de grosor, hay un trozo de hielo del tamaño de un puño. No se derrite en la mano. Está frío como si lo acabaran de hacer.' },
			{ text: 'La grieta atraviesa la muralla entera. Si acercas la cara, sale un aire helado, fino, constante. Viene del norte. Del Boquete.' },
			{ text: '{riolu} se queda con la palma pegada a la piedra mucho rato. Luego retira la mano de golpe, como si algo, muy lejos, la hubiera tocado también.', cond: LUC },
			{ say: 'rotom', text: '¡Bzzt! Si esa noche entró por aquí un aire así, de golpe… las calles del norte se helarían. Las del sur, detrás de las casas, no. —Pausa—. ¡Como en la factura del vidriero!' },
			{ intel: { npc: 'teodoro', text: 'En la muralla norte hay una grieta con escarcha que no se derrite: un aire helado entra desde el Boquete Gigante. Explicaría que solo se helara el norte.' } },
		],
		b06_rastreo_sin_aura: [
			'En la cara norte de la muralla, a la altura de la rodilla, hay una grieta larga entre dos sillares. Dentro, en pleno día, hay escarcha.',
			'Metes la mano. Está helado y no llegas al fondo. Tienes la sensación de que la grieta es mucho más larga de lo que parece, y de que hay algo al otro lado.',
			{ text: 'Para seguir ese frío por dentro de la piedra hace falta un aura. **{riolu}** lo encontraría: vuelve con él en el equipo.' },
		],
		b06_grieta_despues: [
			{ text: 'La grieta de la escarcha. Blanca, crujiente, a veintiséis grados. Del otro lado llega el aire del Boquete, fino y constante, como una respiración que no termina nunca.' },
		],

		// =================== LA SALA DEL RELOJ (el campanario) ===================
		b06_mecanismo_cerrado: [
			{ text: 'La puerta de la sala del reloj tiene una cerradura de runas. El campanero no la abre sin un motivo «de verdad, no de la radio».' },
			{ text: 'Quizá cuando sepas algo de las horas de aquella noche te deje pasar.', cond: '!flag.b06_decreto' },
		],
		b06_mecanismo: [
			{ if: '!flag.b06_mecanismo_visto', then: [
				{ set: { 'flag.b06_mecanismo_visto': true } },
				{ text: 'El campanero sube contigo, despacio, contando los escalones en voz baja. Cruje uno. Luego otro. Luego otro que no ha pisado ninguno de los dos.' },
				{ say: 'campanero', text: '—Se para delante de la caja del reloj—. La combinación la tengo aquí. —Se toca la frente—. Mi padre me la enseñó cantando. Pero yo canto fatal. Ábrala usted y yo tarareo.' },
			], else: [
				{ text: 'El campanero tararea la combinación otra vez, peor que antes. Las runas se encienden.' },
			] },
			{ minigame: { type: 'lock', id: 'b06_caja_reloj', title: 'La caja del reloj', hint: 'Las runas se encienden al compás de los engranajes. Repite el orden. El campanero tararea, pero no le hagas mucho caso.', theme: 'ruina', level: 3,
				guaranteed: ['chapareloj'], loot: [{ id: 'stardust', w: 5 }, { id: 'hardstone', w: 4 }, { id: 'starpiece', w: 1, rare: true }], picks: 1, consolation: false, lootTitle: 'Dentro de la caja del reloj' },
				onWin: [{ call: 'b06_campanario' }],
				onLose: [
					{ text: 'Un engranaje hace clac y las runas se apagan. El campanero se tapa la cara con las manos.' },
					{ say: 'campanero', text: 'Ha sido mi tarareo. Seguro. Otra vez, y esta vez me callo.' },
				],
				onQuit: [{ say: 'campanero', text: 'Bajamos. Pero despacito, que hay escalones que no son nuestros.' }] },
		],
		b06_campanario: [
			{ set: { 'flag.b06_campanario': true } },
			{ text: 'La caja se abre. Dentro, los engranajes del reloj, grandes como platos, giran despacio, brillantes de grasa. Atornillada al bastidor, una chapa de latón con letras grabadas.' },
			{ read: 'chapareloj' },
			{ say: 'campanero', text: '—Lee la chapa tres veces, moviendo los labios—. «Atrasado una hora. Medianoche». Mi padre tocó las doce a mano… y una hora después, el reloj, que ya iba atrasado, dio las suyas. —Se sienta en un escalón—. Treinta años. Un decreto.' },
			{ cutscene: { time: 'tarde', bg: { type: 'tower', wall: '#6a4a3a', floor: '#3a2a20' }, start: 'dark', frames: [
				{ cam: 'still', fx: 'light', text: 'Detrás de los engranajes, en el hueco donde la torre se estrecha, algo se mueve. Una sombra pequeña. Y luego no es una sombra.' },
				{ fx: 'silhouette', cam: 'push', text: 'Es una niña. Una niña de ocho años, más o menos, descalza, con un camisón viejo y el pelo azul, muy azul. Te mira sin parpadear. Levanta la mano y te hace así: que vayas.' },
				{ actors: [{ id: 'campanero', at: 'left', enter: 'none', dim: true, emote: '!' }], cam: 'still', text: 'El campanero se queda blanco. No grita. Abre la boca y no le sale nada.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left' }], on: 'rio', fx: 'glow', text: '{riolu} da un paso adelante, muy despacio, con las palmas abiertas. El aura le brilla en las manos. No gruñe. Está tranquilo.', cond: LUC },
				{ actors: [{ mon: 'zorua', key: 'zo', at: 'center', enter: 'pop', do: 'hop', emote: '?' }], fx: ['sparkle'], text: 'La niña parpadea, se encoge… y donde estaba hay un Zorua. Pequeño, con un mechón rojo en la frente y los ojos enormes. Te mira con cara de «¿cómo me has visto?».' },
				{ actors: [{ mon: 'zoroark', key: 'zk', at: 0.8, enter: 'fade', dim: true, size: 'l' }], cam: 'pan-up', text: 'Arriba, en la viga más alta, junto a la campana, algo más grande, de melena roja, mira sin bajar. Luego desaparece entre las sombras.' },
				{ actors: [{ key: 'zo', do: 'bob', emote: 'note' }], cam: 'pull', text: 'El Zorua se sienta en un engranaje parado y se rasca una oreja. Como si llevara aquí toda la vida. Como si su familia llevara aquí todas las suyas.' },
			] } },
			{ say: 'campanero', text: 'Pasitos. —Lo dice muy bajito—. Pasitos pequeños. Mi padre los oyó. Yo los oigo. Y no eran de un fantasma. Eran de… esto.' },
			{ say: 'rotom', text: '¡Bzzt! Zorua. Pokémon Zorro Pillo. Se transforma en personas o en otros Pokémon para engañar. Las ilusiones se aprenden de la madre. —Pausa—. ¿Una niña de pelo azul? ¿Durante generaciones? ¡Es una ilusión de familia!' },
			{ say: 'campanero', text: 'Inés. —Se levanta de golpe—. La niña de Inés. El pelo azul. —Mira al Zorua, que bosteza—. No se lo voy a decir yo. Se lo tiene que decir quien lo entienda entero. Y eso, ahora mismo, no soy yo.' },
			{ say: 'rotom', text: '¡Bzzt! Renata dijo que la llamáramos **antes** de saber la verdad. ¡Creo que ahora es antes! ¡Pero muy poquito antes!' },
			{ quest: 'b06_s_chamota', stage: 'hipotesis' },
			{ intel: { npc: 'ines', text: 'En la sala del reloj del campanario vive un Zorua (una familia, desde hace generaciones; uno grande, de melena roja, vigila desde arriba). Su ilusión: una niña de pelo azul. La chapa del reloj: atrasado una hora a medianoche aquella noche.' } },
		],

		// =================== LA PIZARRA DE RENATA (FUERA DE MICRO) ===================
		b06_pizarra: [
			{ set: { 'vars.b06_aciertos': 0 } },
			{ text: 'Renata contesta al primer tono. Se oye una tiza contra una pizarra y, de fondo, la cafetera del estudio gorgoteando como un Wooper con asma.' },
			// FUERA DE MICRO: la pizarra no se graba. El Apuntador no sabe nada de lo que se dice aquí.
			{ say: 'renata', as: 'Renata (holomisor)', text: '¡Testigo! ¿Lo tienes? No me lo digas. Sí, dímelo. No, espera, que agarro la tiza buena. —Ruido de tiza—. Vale. El micro está apagado: esto es entre tú, yo y la pizarra. Nota para el episodio: no hay episodio.' },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Pregunta cero, la de las trampas. ¿Hay **una sola explicación** para todo lo que pasó esa noche?' },
			{ prompt: 'Renata espera con la tiza en alto.', choice: [
				{ text: '«Sí: el fantasma del campanario lo hizo todo.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Ajá. ¿Un fantasma que solo rompe cristales en las calles del norte? Mira la factura del vidriero: ni uno en el sur. Los fantasmas no tienen barrio. Bueno, este a lo mejor sí, pero no paga cristales.' },
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Piénsalo otra vez. Sin prisa. Tengo café.' },
					{ choice: [{ text: '«Vale. No es una sola cosa.»', then: [] }] },
				] },
				{ text: '«Sí: el frío. Todo vino del frío.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: '¿El frío da campanadas? Mira el decreto: las doce dos veces salen de un papel con cuatro firmas, no de un termómetro. Y el frío no saca a una niña de casa de la mano.' },
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Piénsalo otra vez. Una causa sola es muy cómoda. Lo cómodo es sospechoso.' },
					{ choice: [{ text: '«Vale. No es una sola cosa.»', then: [] }] },
				] },
				{ text: '«No. Son varias cosas que pasaron a la vez.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: '¡Eso! Cool, cool, cool. Las noches raras casi nunca son una cosa rara. Son tres cosas normales que se ponen de acuerdo. —Tiza—. Vamos por partes.' },
				] },
			] },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Uno. **El frío.** ¿Qué heló Chamota en agosto?' },
			{ choice: [
				{ text: '«Un aire helado del Boquete Gigante, por una grieta de la muralla norte. Solo se heló el norte.»', then: [
					{ set: { 'vars.b06_aciertos': '+1' } },
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Factura del vidriero, solo el norte. Don Teodoro, que vivía en el norte, lo vio todo blanco. El del sur, sudando. —Tiza fuerte—. ¡Sí! El cronista no mentía: escribía desde su balcón.' },
					{ say: 'renata', as: 'Renata (holomisor)', text: '¿Y encima tienes un trozo de hielo de treinta años? Me estás haciendo el episodio entero y no lo voy a poder emitir. Esto es tortura.', cond: 'flag.b06_escarcha' },
				] },
				{ text: '«El pueblo entero se heló, como cuenta don Teodoro.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Mmm. Don Teodoro vivía junto a la puerta norte. Y los cristales del sur están todos enteros. Lo apunto con un interrogante. Uno grande.' },
				] },
				{ text: '«Lo trajo el Pokémon del campanario.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: '¿Un Zorua? ¿De tipo Siniestro? ¿Helando calles? Si un Zorua hiciera eso, Nico tendría la calefacción encendida en julio. Lo apunto en la esquina de «ideas bonitas».' },
				] },
			] },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Dos. **Las doce dos veces.** ¿Qué sonó?' },
			{ choice: [
				{ text: '«El cambio de hora. El campanero tocó las doce a mano y el reloj, ya atrasado, dio otras doce una hora después.»', then: [
					{ set: { 'vars.b06_aciertos': '+1' } },
					{ say: 'renata', as: 'Renata (holomisor)', text: '¡Un decreto! ¡Las doce sonaron dos veces **de verdad**! Ni fantasma ni eco: burocracia. —Se ríe mucho—. La burocracia es el fantasma más grande de Teselia.' },
				] },
				{ text: '«El fantasma subió a tocar la campana.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: '¿Con qué manos? El Zorua las tiene muy pequeñas para una campana de media tonelada. Y la chapa del reloj dice otra cosa. Interrogante.' },
				] },
				{ text: '«El campanero se equivocó y la tocó dos veces.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Se equivocó de algo, eso seguro: de reloj. Pero no la tocó dos veces. Interrogante pequeño.' },
				] },
			] },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Tres. **Inés.** ¿Qué le pasó a la niña?' },
			{ choice: [
				{ text: '«El Zorua la sacó de casa antes del fuego. A propósito. La salvó.»', then: [
					{ set: { 'vars.b06_aciertos': '+1' } },
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Ya estaba en la muralla cuando sonaron las primeras doce; el fuego fue a la una menos veinte de la hora vieja. Su casa, pared con pared con la panadería. —La tiza se para—. Tiraba de ella como si llegaran tarde. Llegaban tarde a no quemarse.' },
					{ say: 'renata', as: 'Renata (holomisor)', text: '…Perdona. Se me ha metido tiza en un ojo. En los dos.' },
				] },
				{ text: '«El Zorua se la llevó jugando, y se salvó de casualidad.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Puede. Pero Inés dice que no se reía. Que tiraba de ella con prisa. Los que juegan no tienen prisa. Interrogante.' },
				] },
				{ text: '«Salió sonámbula y lo soñó todo.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: '¿Y el Zorua de pelo azul del campanario también lo soñó? Porque tú lo has visto despierto. Interrogante enorme.' },
				] },
			] },
			{ set: { 'flag.b06_hipotesis': true } },
			{ if: 'vars.b06_aciertos >= 3', then: [
				{ say: 'renata', as: 'Renata (holomisor)', text: 'Tres de tres. —Silencio largo—. Me has ganado. Odio que me ganen. Me encanta que me ganes. Las dos cosas a la vez, como esa noche.' },
				{ af: { renata: 5 } },
			], else: [
				{ if: 'vars.b06_aciertos == 2', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Dos de tres. Muy bien. Casi me ganas. Casi. Que es mi palabra favorita cuando se la digo a otro.' },
					{ af: { renata: 3 } },
				], else: [
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Bueno. Tienes una pizarra con muchos interrogantes. Me gustan las pizarras así: se notan las ganas. Y la verdad se va a reír de los dos igual.' },
					{ af: { renata: 1 }, cond: 'vars.b06_aciertos == 1' },
				] },
			] },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Y ahora la pregunta buena. La que no se apunta. —Deja la tiza—. **¿Quién encendió el horno?**' },
			{ choice: [
				{ text: '«Doña Asunción, la madre, como dijo ella.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: '¿A medianoche? ¿Mientras firmaba el acta en la plaza del ayuntamiento? El parte dice que llegó corriendo desde la plaza. Mmm. Ella lo dijo, sí. La gente dice muchas cosas para que otro no tenga que decirlas.' },
				] },
				{ text: '«Celia. La aprendiza. Estaba allí: Inés la vio con la pala.»', then: [
					{ set: { 'flag.b06_hipotesis_horno': true } },
					{ af: { renata: 2 } },
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Fiebre en casa de su tía, dice. Y una niña la ve en la panadería con la pala antes de las doce. Y el parte habla de una aprendiza con quemaduras en las manos. —Muy bajito—. Ya.' },
				] },
				{ text: '«Nadie. El frío reventó el horno solo.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Un horno apagado no revienta. Alguien lo encendió. El parte dice «tiro obstruido»: alguien lo encendió con el tiro lleno de hielo. La pregunta es quién.' },
				] },
			] },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Esa respuesta no es mía, ni tuya. Es de alguien de Chamota. Ve a la panadería. Y, {jugador}… escucha más de lo que preguntes. Eso no lo digo nunca en antena, porque me quita trabajo.' },
			{ quest: 'b06_s_chamota', stage: 'verdad' },
		],

		// =================== LA VERDAD (Celia, a solas) ===================
		b06_verdad: [
			{ text: 'La panadería está vacía de clientes. Celia saca una hornada con la pala larga. Cuando te ve, deja la pala en su sitio, muy despacio, y se limpia las manos en el delantal. Las manos con marcas viejas.' },
			{ say: 'celia', text: 'Has subido al campanario. Se te nota. —No es una pregunta—. Aquí todo se sabe en media hora. Lo de la hora, lo del reloj. Lo del bicho del pelo azul.' },
			{ say: 'celia', text: 'Siéntate. Cierro la puerta. —Le da la vuelta al cartel: «CERRADO». No lo ha hecho en treinta años a esta hora—. Si lo voy a decir, lo digo una vez.' },
			{ say: 'celia', text: 'No tenía fiebre. Estaba aquí. Mi madre se fue a la plaza con el pan del brindis, para lo del reloj, y me dejó vigilando la masa. «No toques el horno grande», me dijo. Siempre me lo decía.' },
			{ say: 'celia', text: 'Y bajó el frío. De golpe. Se me empezó a cuajar la masa en las tablas, por la ventana vi pasar a Inés, en camisón, de la mano de una niña que no era de aquí, con el pelo azul. Me saludó. Le dije adiós con la pala, sin pensar. Y pensé: si se hiela la masa, mañana no hay pan, y mi madre…' },
			{ say: 'celia', text: 'Encendí el horno grande. Yo. Con el tiro lleno de hielo, que no lo sabía, porque nunca se había helado un tiro en agosto. El humo volvió para dentro. La harina del aire… prendió.' },
			{ say: 'celia', text: 'Mi madre llegó corriendo de la plaza. Yo tenía las manos quemadas y la cara negra. Me miró. Y luego miró al bombero y dijo: «Lo encendí yo. Algo bajó por el tiro». —Se ríe, sin nada de risa—. Y el pueblo oyó «algo bajó» y dijo «el fantasma».' },
			{ say: 'celia', text: 'Me dijo: «Tú di que fue el frío. Lo demás me lo quedo yo». Y se lo quedó. Treinta años. Hasta el final. Hace seis años que se lo llevó.' },
			{ if: 'flag.b06_hipotesis_horno', then: [
				{ text: 'Lo habías dicho tú, en la pizarra, sin micro. Ahora lo oyes con su voz. No se parece en nada.' },
			] },
			{ say: 'celia', text: 'Y la niña. Inés. —Se le quiebra algo—. Yo creía que la había matado. Esa noche, cuando vi la casa de al lado llena de humo. Hasta que la trajeron por la mañana, en camisón, con escarcha en el pelo. Nunca he podido mirarla a la cara del todo.' },
			{ cutscene: { time: 'noche', tint: '#8fb0d8', weather: 'none', bg: BG_CHAMOTA, start: 'dark', frames: [
				{ big: true, text: 'La Noche Blanca', sub: 'Hace treinta años', hold: 2400, cam: 'still' },
				{ weather: 'snow', cam: 'pan-down', fx: 'light', text: 'Once y media de la noche, hora del sol. Por una grieta de la muralla norte entra un aire del Boquete Gigante. Las calles del norte se vuelven blancas. Las del sur, detrás de las casas, ni se enteran.' },
				{ fx: 'silhouette', cam: 'push', text: 'En la calle del Pozo, una niña de pelo azul toca en una ventana. Dentro, una niña de ocho años se levanta en camisón.' },
				{ actors: [{ id: 'celia', at: 'right', enter: 'right', dim: true }], cam: 'still', text: 'En la panadería, la aprendiza saluda con la pala. Luego mira la masa, que se cuaja, y mira el horno grande.' },
				{ fx: ['ripple'], cam: 'pan-up', text: 'Medianoche. El campanero sube y da las doce a mano. En la plaza, cuatro firmas: el pueblo atrasa sus relojes una hora. Inés ya está en la muralla, dormida bajo algo caliente.' },
				{ weather: 'embers', actors: [{ key: 'celia', do: 'shake', emote: '!' }], fx: ['heartbeat'], color: '#c4473a', text: 'Una menos veinte por el reloj de don Teodoro. Once y cuarenta por el de los bomberos. La misma hora. El humo vuelve por el tiro helado y la harina prende.' },
				{ weather: 'snow', actors: [{ key: 'celia', remove: true, exit: 'fade' }], cam: 'pan-up', text: 'Y una hora después de las primeras doce, el reloj de la torre, solo, atrasado, da otras doce. Como si la noche empezara otra vez.' },
				{ tint: 'none', weather: 'none', cam: 'pull', fx: 'iris-out', text: 'Por la mañana, medio pueblo blanco, una panadería negra, una niña con escarcha en el pelo y cinco versiones. Ninguna mentía del todo.' },
			] } },
			{ say: 'celia', text: '—Te mira, con los ojos rojos y la barbilla alta—. Ya está. Ya lo sabe alguien. Y ahora, ¿qué haces tú con esto?' },
			{ text: 'Nadie te obliga a nada. El pueblo lleva treinta años con sus versiones; Celia, con su secreto; Inés, con su niña de pelo azul. Lo que decidas no tiene una respuesta buena. Tiene la tuya.' },
			{ prompt: '¿Qué haces con la verdad de la Noche Blanca?', choice: [
				{ text: 'Contarla entera, en una crónica nueva de don Teodoro.', then: [{ call: 'b06_final_cronica' }] },
				{ text: 'Contarla solo a Inés. Que lo hablen ellas dos.', then: [{ call: 'b06_final_privado' }] },
				{ text: 'Dejar al pueblo con sus versiones.', then: [{ call: 'b06_final_calla' }] },
			] },
			{ call: 'b06_final_zorua' },
			{ call: 'b06_final_renata' },
			{ call: 'b06_final_cierre' },
		],
		b06_final_cronica: [
			{ set: { 'flag.b06_chamota_cronica': true } },
			{ say: 'celia', text: '¿En el periódico? —Se lleva las manos a la boca—. ¿Con mi nombre? —Las baja. Respira—. Con mi nombre. Y con el de mi madre. Que se sepa lo que hizo por mí. Eso sí quiero que se sepa.' },
			{ text: 'Esa tarde, en el banco de la plaza, don Teodoro escucha a Celia sin interrumpirla una sola vez. Cuando termina, cierra el cuaderno, se quita la boina y se queda un rato mirando el campanario.' },
			{ say: 'teodoro', text: 'Treinta años escribiendo una crónica a la que le faltaba una línea. —Abre la pluma—. La voy a escribir otra vez. Toda. Y esta vez con dos relojes.' },
			{ text: 'A la mañana siguiente, la crónica nueva está pegada en la puerta del ayuntamiento, en la de la panadería y en la estación. La gente la lee en silencio. Luego entra en la panadería. Una vecina abraza a Celia por encima del mostrador. Luego otra. Celia llora con la pala en la mano.' },
			{ give: 'cronicanueva' },
			{ read: 'cronicanueva' },
			{ text: 'Inés lee la crónica en el andén, de pie, con la saca a los pies. La lee dos veces. Luego va a la panadería y se queda en la puerta mucho rato, sin entrar. Al final entra.' },
			{ rep: { teselia: 3 } },
		],
		b06_final_privado: [
			{ set: { 'flag.b06_chamota_privado': true } },
			{ say: 'celia', text: '¿Solo a ella? —Se aprieta el delantal—. Sí. Es suyo. Más que de nadie. Pero no me dejes sola. Por lo menos hasta que abra la boca.' },
			{ text: 'Inés llega con la saca vacía y la gorra en la mano. Se sienta en el mostrador, como debía de sentarse de niña. Celia se lo cuenta sin mirarla. Tú te quedas junto a la puerta, con {riolu}, mirando la calle.' },
			{ text: 'Cuando Celia termina, no habla nadie. Mucho rato. Fuera pasa el tren de la tarde y se va.' },
			{ say: 'ines', text: 'Me saludaste con la pala. —Muy bajito—. Lo apunté. Lo tenía apuntado y no lo había leído nunca de verdad.' },
			{ say: 'ines', text: 'Treinta años creyendo que no me miras porque te caigo mal. —Se baja del mostrador—. Y era esto.' },
			{ text: 'Celia levanta la vista, por fin. Inés toma un pan de la bandeja, lo parte por la mitad y le da una. Comen las dos, sin decir nada, con la boca llena de migas. Es lo más parecido a hablar que han hecho en treinta años. Y es muchísimo.' },
			{ af: { renata: 1 } },
		],
		b06_final_calla: [
			{ set: { 'flag.b06_chamota_calla': true } },
			{ say: 'celia', text: '¿No lo vas a contar? —Te mira como si no te entendiera. Luego sí te entiende—. ¿Y Inés?' },
			{ text: 'Le dices que a Inés le contarás lo que es suyo: quién la sacó de casa y por qué. Lo de la pala no. Eso es de Celia, si un día quiere.' },
			{ say: 'celia', text: '—Asiente despacio—. Las versiones son del pueblo. La verdad, de quien la necesite. —Se ríe un poco—. Mi madre decía eso de los rumores. Nunca pensé que lo diría de mí.' },
			{ say: 'celia', text: 'Treinta años cargando una cosa sola. Y ahora la llevo a medias contigo. Pesa la mitad. Fíjate qué tontería: con lo que pesa y lo poco que cuesta.' },
		],
		b06_final_zorua: [
			{ text: 'Al caer la tarde, subes al campanario con Inés. El Zorua está en el rellano de arriba, comiéndose las bayas del campanero. Cuando ve a Inés, se queda quieto. Luego, muy despacio, se convierte en una niña de pelo azul.' },
			{ say: 'ines', text: '—Se tapa la boca con las dos manos—. Eres tú. No. Eres… otro. Eres de los suyos. —Se agacha—. Tu abuela. O tu madre. Me sacó de casa. Antes del humo. Lo hizo a propósito, ¿verdad? Lo sabía.' },
			{ text: 'La niña de pelo azul vuelve a ser un Zorua y se le sube a las rodillas, sin pedir permiso, como si conociera el camino.' },
			{ say: 'ines', text: 'Algo caliente que respiraba. —Le pone la mano en el lomo—. Treinta años diciéndolo. Y era verdad.' },
			{ if: '!' + ZORUA_LINEA, then: [
				{ say: 'ines', text: '—Te mira, con el Zorua en brazos—. Llévatelo. En serio. Su familia lleva generaciones aquí arriba sin ver mundo. A mí me sacó de casa una vez. Que salga él ahora. Y que me mande postales.' },
				{ text: 'Desde la viga más alta, una sombra grande de melena roja mira hacia abajo. No baja. Pero tampoco se esconde. Parece que asiente.' },
				{ set: { 'flag.b06_zorua': true } },
				{ pokemon: { sp: 'zorua', lv: 28, nature: 'timid', ability: 'illusion', happy: 140, moves: ['knockoff', 'faketears', 'taunt', 'scaryface'], ivs: { hp: 24, atk: 22, def: 20, spa: 31, spd: 24, spe: 30 } } },
				{ say: 'ines', text: 'Cuídalo. Y si un día ves a una niña de pelo azul que te hace señas, ve. No preguntes. Ve.' },
			], else: [
				{ set: { 'flag.b06_zorua_vive': true } },
				{ say: 'ines', text: 'Ya tienes uno como él, ¿verdad? Se te nota en cómo lo miras. —Lo abraza más fuerte—. Entonces este se queda. Aquí arriba, con los suyos. Yo le subo bayas cada tarde. Ven a verlo cuando quieras.' },
				{ text: 'Desde la viga más alta, una sombra grande de melena roja mira hacia abajo. No baja. Pero tampoco se esconde.' },
			] },
			{ say: 'campanero', text: '—Desde la escalera, asomado—. Pongo otro cuenco. —Se va—. Y un cojín.', cond: '!flag.b06_zorua' },
		],
		b06_final_renata: [
			{ text: 'Ya en la plaza, la Pokédex vibra. Renata.' },
			// FUERA DE MICRO
			{ say: 'renata', as: 'Renata (holomisor)', text: '¿Y? No, no me lo cuentes. Bueno, cuéntame solo una cosa: ¿está bien?', cond: '!flag.b06_chamota_cronica' },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Me ha llegado una foto de una crónica pegada en una estación. Nico dice que la ha visto en tres sitios. —Pausa—. Lo hiciste bien. Y lo hiciste delante de todos. Eso cuesta más.', cond: 'flag.b06_chamota_cronica' },
			{ say: 'renata', as: 'Renata (holomisor)', text: 'Te pido una cosa. El martes tengo directo. Quiero contar lo de la pizarra: las tres preguntas, las horas, el decreto. Solo eso. Lo de la panadería no lo voy a emitir ni aunque me pagues, que no me pagas.' },
			{ prompt: '¿Dejas que Renata emita la pizarra el martes?', choice: [
				{ text: '«Emítelo. Y di que lo resolvimos los dos.»', then: [
					{ set: { 'flag.b06_chamota_emitido': true } },
					{ af: { renata: 3 } },
					{ say: 'renata', as: 'Renata (holomisor)', text: '¿Los dos? —Se le nota la sonrisa en la voz—. Cool. Cool, cool, cool. Nadie me había dado la mitad de algo. Siempre me lo quitaban entero.' },
					{ call: 'b06_chamota_antena' },
				] },
				{ text: '«Emítelo. Pero di que lo resolví yo.»', then: [
					{ set: { 'flag.b06_chamota_emitido': true, 'vars.b06_credito': 1 } },
					{ af: { renata: -5 } },
					{ say: 'renata', as: 'Renata (holomisor)', text: '—Silencio corto—. Ah. Vale. Lo diré así. Nota para el episodio: el colaborador ha aprendido a negociar. Y yo a no apuntárselo en la lista de los buenos. Todavía.' },
					{ call: 'b06_chamota_antena' },
				] },
				{ text: '«Mejor no. Que Chamota se quede fuera de la radio.»', then: [
					{ say: 'renata', as: 'Renata (holomisor)', text: 'Me duele. Físicamente. En la parte del cerebro donde vive el episodio. —Suspira—. Vale. Tienes razón. Hay casos que son para resolverlos, no para contarlos. Lo dice siempre la Tía Rosa y nunca le hago caso.' },
					{ af: { renata: 1 } },
				] },
			] },
		],
		b06_chamota_antena: [
			{ text: 'El martes por la noche, en algún sitio, una radio vieja se enciende. Y otra. Y en un sótano de Porcelana, una luz roja: EN EL AIRE.' },
			// EN ANTENA (el Apuntador puede citar solo estas frases)
			{ say: 'renata', as: 'Renata (en antena)', text: 'Buenas noches, Teselia. Esto es Casos Fríos, y hoy cerramos un caso de hace treinta años sin salir del sótano. Bueno, salió mi colaborador{|a|e}. Yo puse la pizarra.' },
			// EN ANTENA
			{ say: 'renata', as: 'Renata (en antena)', text: 'La Noche Blanca de Chamota. Cinco vecinos, cinco versiones. Y la regla de oro de esta casa: una sola causa no lo explica todo.' },
			// EN ANTENA
			{ say: 'renata', as: 'Renata (en antena)', text: 'Las doce sonaron dos veces. No fue un fantasma: fue un decreto. El resto no lo cuento. Hay cosas que son del pueblo.' },
			// EN ANTENA
			{ say: 'renata', as: 'Renata (en antena)', text: 'Lo resolvimos entre los dos. Nota para el episodio: es la primera vez que digo «los dos» en este programa.', cond: 'vars.b06_credito != 1' },
			// EN ANTENA
			{ say: 'renata', as: 'Renata (en antena)', text: 'Todo el mérito es de mi colaborador{|a|e}. Lo digo porque me lo ha pedido. Con esas palabras.', cond: 'vars.b06_credito == 1' },
		],
		b06_final_cierre: [
			{ set: { 'flag.b06_t2_hecho': true } },
			{ quest: 'b06_s_chamota', stage: 'hecha', done: true },
			{ text: 'Antes de irte, Celia te pone en las manos un paquete atado con cordel, todavía caliente. «Pan de la Noche Blanca. Y lo que me sobra de los huertos. No se discute».' },
			{ give: 'lumberry', n: 2 },
			{ give: 'sitrusberry', n: 3 },
			{ say: 'rotom', text: '¡Bzzt! Caso cerrado. Bueno, caso… doblado. Con cuidado. Como una carta que no se tira.' },
			{ diary: 'Hoy mi entrenador{|a|e} ha resuelto la Noche Blanca de Chamota. ¡Las doce sonaron dos veces porque cambiaron la hora! El frío entró por una grieta de la muralla. Y la niña de pelo azul era un Zorua. Don Teodoro ha escrito una crónica nueva y la han pegado hasta en la estación. Lo bueno de un diario es que no cambia de versión.', cond: 'flag.b01_diario && flag.b06_chamota_cronica' },
			{ diary: 'Hoy mi entrenador{|a|e} ha resuelto la Noche Blanca de Chamota. ¡Las doce sonaron dos veces porque cambiaron la hora! El frío entró por una grieta de la muralla. Y la niña de pelo azul era un Zorua. Lo de la panadería no lo apunto: es de Chamota, no de mi diario. Un diario también sabe callarse.', cond: 'flag.b01_diario && !flag.b06_chamota_cronica' },
			{ intel: { npc: 'celia', text: 'La Noche Blanca, resuelta. Celia lo contó a solas. Su madre, Asunción, cargó con la culpa treinta años.' } },
		],

		// ---------- Visitas al Zorua y rellano ----------
		b06_zorua_visita: [
			{ text: 'El Zorua está en el rellano, panza arriba sobre un cojín que alguien ha subido. Cuando te ve, se convierte en una niña de pelo azul, te hace así con la mano y vuelve a ser un Zorua antes de que llegues. Le encanta.' },
			{ if: 'flag.b06_chamota_privado || flag.b06_chamota_cronica', then: [{ text: 'Junto al cuenco de agua hay un panecillo con escarcha de azúcar. Alguien de la panadería sube todas las tardes.' }] },
			{ happy: { who: 'party0', n: 2 } },
		],
		b06_rellano_vacio: [
			{ text: 'El rellano de arriba del campanario. El cuenco de agua sigue ahí, por si acaso. En la viga más alta, de vez en cuando, una sombra grande de melena roja mira el horizonte, hacia la vía del tren.' },
		],
		b06_pared_hielo: [
			{ text: 'Una pared de hielo azul cierra la boca del Boquete Gigante de lado a lado. Es lisa como un espejo y no tiene una sola grieta. Te ves dentro, muy pequeñ{o|a|e}, mil veces.' },
			{ text: 'Pones la mano. No se derrite. Y no está fría del todo: está fría como algo que respira despacio.' },
			{ text: '{riolu} no se acerca. Se queda a tres pasos, con el aura encendida en las palmas, y no quita los ojos del fondo azul. Por primera vez desde que lo conoces, da un paso atrás.', cond: LUC },
			{ text: 'Por aquí no se pasa. Todavía no.' },
		],

		// =================== EL SHOKUGEKI: el pan de la Noche Blanca ===================
		b06_shokugeki: [
			{ set: { 'flag.b06_shoku_celia': true } },
			{ text: 'En la puerta de la panadería, un hombre calvo con barba y pañuelo en la cabeza discute con un saco de azúcar. A su lado, una chica de coletas verdes con un delantal de flores toma notas en una libreta con una pegatina de Bounsweet.' },
			{ say: 'gaspar', text: '¡{jugador}! ¡Otra vez nos cruzamos! Donde va la Gira, voy yo. —Señala a la chica—. Esta vez no voy solo: Lulú ha venido a aprender pan. Dice que en Alola el pan es «un poco tímido».', cond: 'flag.b05_shoku_hecho' },
			{ say: 'gaspar', text: '¡Tú! ¡De la Gira! Gaspar Rocafort, cocinero ambulante. Donde va la Gira, voy yo: los aspirantes comen fatal. Ella es Lulú, capitana de Alola. Viajamos juntos para aprender pan.', cond: '!flag.b05_shoku_hecho' },
			{ say: 'lulu', text: '¡Hola-hola! Nos han dicho que aquí hacen un pan que solo se hace en agosto. ¡Con escarcha! ¡De azúcar! ¡Y que la panadera no le da la receta a nadie!' },
			{ say: 'celia', text: '—Desde dentro, con los brazos cruzados—. A nadie. Ni a mi sombra. El pan de la Noche Blanca lo inventó mi madre al año siguiente, para que la helada se acordara dulce. Se hace en mi horno o no se hace.' },
			{ say: 'gaspar', text: 'Pues duelo. Un plato. El mismo pan. Tú en tu horno, nosotros en el de leña de la Ronda. Y {jugador} prueba y decide. Si gano, me das la receta. Si ganas, Lulú y yo te pelamos almendras una semana.' },
			{ say: 'celia', text: '—Te mira, mira a Gaspar, mira el saco de azúcar—. Trato. Pero las almendras las quiero peladas de verdad. No como las pela la gente de ciudad.' },
			{ text: 'Celia trabaja en silencio, rapidísima. Antes de encender el horno grande, toma un farol, se agacha y mira por el tiro. Mucho rato. Luego mete la mano, palpa, y solo entonces enciende.' },
			{ say: 'gaspar', text: '¿Por qué miras el tiro? Es agosto.' },
			{ say: 'celia', text: 'Siempre miro el tiro. Siempre. —No se gira—. Desde hace treinta años.' },
			{ text: 'Gaspar y Lulú cocinan a cuatro manos en el horno de leña de la Ronda: él con fuego alto y una masa con mantequilla tostada que huele a avellana; ella con flores de azúcar y una ralladura de Baya Tamate que le da un brillo rosado. Discuten tres veces y se ríen dos.' },
			{ text: 'Dos panes sobre el mostrador. El de Celia: redondo, de corteza crujiente, cubierto de una escarcha de azúcar fina como la de una mañana de invierno, y por dentro blanco y tierno. El de Gaspar y Lulú: trenzado, dorado, con la escarcha en espirales y un corazón de crema rosa.' },
			{ text: 'Pruebas el de Celia. Es sencillo y está perfecto, como si llevara treinta años haciendo el mismo pan para la misma persona. Pruebas el otro. Te explota en la boca: mantequilla, Tamate, azúcar que cruje. **¡Oh, ese sabor!**' },
			{ prompt: 'Celia, Gaspar y Lulú te miran sin parpadear.', choice: [
				{ text: 'Gana el pan de Celia.', then: [
					{ set: { 'flag.b06_shoku_celiagana': true } },
					{ say: 'celia', text: '¡Ja! —Da una palmada que levanta harina hasta el techo—. ¡Almendras! ¡Una semana!' },
					{ say: 'gaspar', text: '—Se come medio pan de Celia de pie, con los ojos cerrados—. Es un pan que no quiere impresionar a nadie. Por eso impresiona. Enhorabuena, maestra.' },
				] },
				{ text: 'Gana el pan de Gaspar y Lulú.', then: [
					{ set: { 'flag.b06_shoku_gaspar': true } },
					{ say: 'lulu', text: '¡Bien-bien-bien! —Saltitos—. ¡La escarcha en espiral! ¡Ha sido idea mía! ¡La crema también! ¡Bueno, la crema fue de los dos!' },
					{ say: 'celia', text: '—Prueba el trenzado. Mastica despacio—. …Pues está bueno, el condenado. —Se limpia las manos—. La receta no te la doy. Pero te dejo mirar cómo la hago. Que es más.' },
				] },
				{ text: '«Empate. Uno es memoria y otro es fiesta.»', then: [
					{ set: { 'flag.b06_shoku_empate': true } },
					{ say: 'gaspar', text: 'Memoria y fiesta. —Se quita el pañuelo—. Eso no se gana. Eso se junta. Celia, ¿hacemos uno a seis manos?' },
					{ say: 'celia', text: 'Hacemos uno a seis manos. Pero en mi horno. —Mira el tiro—. Y el tiro lo miro yo.' },
				] },
			] },
			{ say: 'gaspar', text: 'Toma. Lo que ha sobrado se le da a quien va de viaje. Y esto otro es nuevo: lo he apuntado esta noche, con lo que da Teselia.' },
			{ give: 'menuteselia', n: 2 },
			{ say: 'lulu', text: '¡Y bayas de los huertos! Las ha agarrado Gaspar «sin preguntar», pero el cartel pone «tome lo que caiga» y yo las he hecho caer.' },
			{ give: 'tamatoberry', n: 2 },
			{ intel: { npc: 'gaspar', text: 'En Chamota, con Lulú («viajamos juntos para aprender pan»), duelo con la panadera Celia: el pan de la Noche Blanca. Celia mira siempre el tiro antes de encender el horno, «desde hace treinta años».' } },
		],
		b06_shoku_despues: [
			{ if: 'flag.b06_shoku_celiagana', then: [{ say: 'lulu', text: 'Llevamos cuatro días pelando almendras. ¡Cuatro! Gaspar dice que es «formación». Yo digo que tengo los dedos arrugados como una Baya Grana.' }] },
			{ if: 'flag.b06_shoku_gaspar', then: [{ say: 'gaspar', text: 'Celia me deja mirar cómo amasa. No habla, no explica. Solo amasa. Es la mejor clase que me han dado en veinte años. Lulú lo apunta todo con dibujitos.' }] },
			{ if: 'flag.b06_shoku_empate', then: [{ say: 'lulu', text: '¡El pan a seis manos sale torcido! ¡Siempre! ¡Celia dice que es porque Gaspar amasa enfadado! ¡Gaspar dice que amasa con pasión! ¡Yo digo que da igual, que está riquísimo!' }] },
			{ if: 'flag.b06_t2_hecho', then: [{ say: 'gaspar', text: 'Celia está distinta estos días. Más ligera. Amasa cantando. —Te mira de reojo—. No sé qué ha pasado. No te lo pregunto. Las cocinas guardan secretos mejor que nadie.' }] },
		],

		// =================== PREMIO DE LA RONDA ===================
		b06_premio_muralla: [
			{ say: 'vecino_teselia', as: 'Capitán de la Ronda', text: 'Tres combates en la muralla norte y sin pedir un abrigo. Eso aquí arriba es de ley. —Suelta el silbato—. Ven, que te doy lo que se da.' },
			{ text: 'En la garita de la Ronda, en un cajón que huele a lana mojada, hay una caja de latón. Dentro, un disco brillante con un copo de nieve grabado.' },
			{ say: 'vecino_teselia', as: 'Capitán de la Ronda', text: 'La fundadora de la Ronda decía que si algún día bajaba algo del norte, había que recibirlo con lo mismo. Nunca bajó nada. La MT se ha quedado aquí, aburrida, treinta años. Llévatela tú, que tienes cara de ir a sitios fríos.' },
			{ give: 'b06_mt_alud' },
			{ say: 'vecino_teselia', as: 'Capitán de la Ronda', text: 'Alud. Pega más fuerte si te han pegado antes. Como la Ronda: llegamos tarde, pero llegamos con ganas.' },
		],
		// =================== CARTA 2b Y MENÚ ===================
	b06_carta_2b: [
		{ set: { 'flag.b06_apuntador_2b': true } },
		{ text: 'En el buzón del estudio hay un sobre color crema, sin remite. Nico lo toma con dos dedos, como si mordiera. La Tía Rosa dice que lo ha traído un chico en bici que ha cobrado al llegar y se ha ido sin mirar atrás. «Un solo viaje, le han pagado. Lo ha dicho él».' },
		{ give: 'cartaapuntador2b' },
		{ read: 'cartaapuntador2b' },
		{ say: 'renata', text: '«Lo que no contó, no lo sé». —Lo lee tres veces—. Solo sabe lo que dije en antena. Ni una coma más. —Te mira por encima de las gafas—. Eso es un dato, testigo. Uno muy bueno.' },
		{ say: 'renata', text: 'Y llegó segundo. —Se le escapa media sonrisa—. Nota para el episodio: al que llega segundo se le nota en la letra.' },
		{ intel: { npc: 'renata', text: 'Carta 2b del Apuntador tras el directo de Chamota: cita solo lo que se dijo en antena y admite que no sabe «lo que no contó». La trajo un mensajero pagado para un solo viaje.' } },
	],
	usar_menu_teselia: [
		{ text: 'Abres el Menú de Teselia de Gaspar y Lulú. Huele a mantequilla tostada, a azúcar y a Baya Tamate.' },
		{ happy: { who: 'party0', n: 10 } }, { happy: { who: 'party1', n: 10 } }, { happy: { who: 'party2', n: 10 } },
		{ happy: { who: 'party3', n: 10 } }, { happy: { who: 'party4', n: 10 } }, { happy: { who: 'party5', n: 10 } },
		{ text: 'Tu equipo se lo come a mordiscos pequeños, para que dure. La escarcha de azúcar cruje. Se nota que se han acercado un poco más.' },
	],
	},

	// =====================================================================
	// RETOS
	// =====================================================================
	challenges: {
		caso_chamota: {
			name: 'La Noche Blanca de Chamota', npc: 'ines', type: 'Dark', rec: 62,
			cond: 'visited("chamota")',
			info: [
				{ text: 'Un caso frío de hace treinta años, no un combate. Cinco vecinos de **Pueblo Chamota** recuerdan la misma noche de forma distinta.' },
				{ text: 'Escúchalos a todos y apunta las horas. Lo que no cuadra es una pista, no un error.' },
				{ cond: 'flag.b06_decreto', text: 'Todo el mundo cuenta horas. Pregúntate siempre con qué reloj.' },
				{ cond: 'flag.b06_campanario', text: '**Renata** quiere tu hipótesis antes de saber la verdad. No hay respuesta que te cierre el caso: ninguna te bloquea.' },
				{ cond: 'flag.b06_t2_hecho', text: '✔ Caso cerrado. Lo que hiciste con la verdad es cosa tuya.' },
			],
		},
		muralla_entreno: {
			name: 'La Ronda de la muralla (entrenamiento)', npc: 'vecino_teselia', type: 'Ice', rec: 64,
			cond: 'visited("muralla_norte")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **64**: los vigías de la Ronda, con Pokémon de **Hielo**, **Roca** y **Tierra**.' },
				{ text: '**Fuego**, **Lucha**, **Acero** y **Agua** les sientan mal a casi todos. Un Lucario va servido.' },
				{ text: 'El capitán de la Ronda guarda algo «que se ha quedado frío aquí arriba» para quien gane tres combates.' },
			],
		},
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		cronicachamota: { name: 'Crónica de la Noche Blanca', pocket: 'key', desc: 'Un recorte amarillo de periódico, escrito por don Teodoro a la mañana siguiente de la Noche Blanca. Lleva treinta años entre las páginas de su cuaderno.',
			read: '**CRÓNICA DE CHAMOTA**\n*por Teodoro Albar, cronista de la villa*\n\n**LA NOCHE BLANCA**\n\nEscribo con los dedos helados, en agosto, y que me perdone el lector la mala letra.\n\nAnoche, a eso de las once y media, desde mi balcón de la calle de la Muralla, vi blanquear los tejados. Primero el de enfrente, luego el siguiente, como si alguien fuera pintándolos con una brocha desde el norte. Escarcha. En agosto.\n\nA las doce en punto, por mi reloj (que es el de mi padre y no se toca), el campanario dio las doce.\n\nA la una menos veinte, ya ardía la panadería de la calle del Pozo. Se veía el resplandor por encima de los tejados blancos. Corrí. Llegaron los bomberos de la estación. Doña Asunción, la panadera, con la cara tiznada, dijo que algo había bajado por el tiro.\n\nA la una en punto, por mi reloj, la campana dio **doce**. Doce, no una. Las conté. Como si la noche hubiera empezado otra vez.\n\nPor la mañana, la villa entera amaneció blanca, hasta el último tejado. La niña de los Garza apareció dormida en la muralla norte, sin un rasguño.\n\nQue Dios, el Ayuntamiento o quien corresponda nos explique lo que pasó anoche. Yo solo lo cuento.\n\n— T. A.' },
		facturavidriero: { name: 'Factura del vidriero', pocket: 'key', desc: 'Una factura de hace treinta años, pagada por el Ayuntamiento de Chamota. La alcaldesa la guarda para que no le tomen el pelo con los presupuestos.',
			read: '**VIDRIERÍA HERMANOS OCAÑA** · Mayólica\n*Cristales, espejos y lunas de escaparate*\n\nCliente: **Excmo. Ayuntamiento de la Villa de Chamota**\nConcepto: reposición de cristales rotos por helada (15 de agosto)\n\n— Calle de la Muralla, n.º 2, 4, 6, 7 y 9 · 14 cristales\n— Calle del Pozo, n.º 1, 3 y 5 · 9 cristales\n— Plaza del Norte, fuente y farolas · 6 cristales\n— Cuesta de la Puerta Norte, n.º 11 · 3 cristales\n— Panadería de la calle del Pozo · escaparate entero *(daños por fuego, se cobra aparte)*\n\nCalles del sur, plaza mayor y estación: *sin daños*.\n\nTotal: 32 cristales y un escaparate.\n\n*Nota del vidriero, a lápiz, en el margen:* «Nunca había visto helarse media villa y la otra media no. Es como si la muralla hubiera hecho de cortina».' },
		cuadernoines: { name: 'Cuaderno de Inés', pocket: 'key', desc: 'Un cuaderno pequeño de colegio, con las tapas dobladas y una pegatina de Sewaddle medio despegada. Inés lo escribió con ocho años y lo lleva siempre encima.',
			read: '*(Letra grande y torcida de niña de ocho años. Algunas palabras tachadas y vueltas a escribir.)*\n\n**LO QE PASÓ LA NOCHE BLANCA** — por Inés Garza, 3.º B\n\nYo estaba en la cama y una niña tocó en mi ventana. Tenía el pelo azul azul. No era de aquí.\n\nMe izo así con la mano que fuera y fui. En camisón. Hacía mucho frío en la calle y los tejados estaban blancos.\n\nLa panadería tenía luz. La Celia estaba haciendo pan muy tarde y me saludó con la pala. Yo la saludé. La niña tiraba de mí.\n\nFuimos por la calle del Pozo hasta la muralla. Allí nevaba. EN AGOSTO.\n\nSonaron las doce. Yo ya estaba en la muralla. Me dormí en un agujero de la piedra con algo calentito encima que tenía cola.\n\nLuego sonaron las doce otra vez y pensé que la noche empezaba de nuevo y me dio miedo pero el calentito no se fue.\n\nPor la mañana mi casa olía a humo. Mi mamá dice que me lo he inventado.\n\nNO ME LO E INVENTADO.\n\n*(Debajo, un dibujo con lápices de colores: una niña de pelo azul, de la mano de otra niña en camisón. La de pelo azul tiene, si te fijas, una cola negra y peluda saliéndole por debajo del vestido.)*' },
		decretohora: { name: 'Acta del cambio de hora', pocket: 'key', desc: 'El acta de la noche en que Chamota cambió de hora. Estaba en el archivo municipal, en una caja con un clip oxidado.',
			read: '**ACTA DE LA SESIÓN EXTRAORDINARIA**\n**Excmo. Ayuntamiento de la Villa de Chamota**\n\nEn la Plaza Mayor, a las **doce de la noche, hora solar**, del 14 de agosto, se reúnen los abajo firmantes para dar cumplimiento al acuerdo del Pleno:\n\n**Primero.** Desde este instante, la Villa de Chamota adopta la **hora del Ferrocarril Regional de Teselia**, que va **una hora por detrás** de la hora solar de la villa.\n\n**Segundo.** En consecuencia, a las doce de la noche, hora solar, todos los relojes públicos de la villa se **atrasan una hora**, pasando a marcar las **once de la noche**. El relojero de la Compañía ajusta en este acto el reloj del campanario.\n\n**Tercero.** La celebración pública se aplaza a la semana próxima, con banda de música.\n\nFirman, a la luz de un farol:\n\n— El Alcalde.\n— El Secretario, que levanta acta.\n— El relojero de la Compañía del Ferrocarril.\n— **Doña Asunción Prieto**, panadera, en representación de los comerciantes, que trajo el pan del brindis.\n\n*(Al margen, con otra tinta: «El campanero no ha querido venir. Dice que él toca las horas del sol»).*' },
		partebomberos: { name: 'Parte de bomberos n.º 117', pocket: 'key', desc: 'Un parte de la Brigada del Ferrocarril Regional, que siempre llevó la hora del tren. Estaba grapado al acta del cambio de hora.',
			read: '**BRIGADA DE INCENDIOS · FERROCARRIL REGIONAL DE TESELIA**\n**Parte n.º 117** · Estación de Chamota\n\n*(Todas las horas en hora del ferrocarril)*\n\n**Aviso recibido:** 23:40, por el guardagujas, que vio resplandor sobre la calle del Pozo.\n**Llegada:** 23:48.\n**Lugar:** horno de la panadería de la calle del Pozo, propiedad de doña Asunción Prieto.\n**Causa probable:** tiro del horno grande **obstruido por hielo**. Retroceso de humos, ignición de harina en suspensión.\n**Heridos:** una aprendiza, quemaduras leves en ambas manos. Atendida en el sitio. Se niega a ir a la estación.\n**Propietaria:** llega a las 23:55, corriendo, desde la Plaza Mayor.\n**Declaración de la propietaria:** «Lo encendí yo. Algo bajó por el tiro».\n**Observaciones:** escarcha en tejados de la calle del Pozo y calles del norte, impropia de la estación. En la estación y el sur, sin novedad.\n**Extinguido:** 00:20.\n\nFirma, el cabo de guardia.' },
		tablahorarios: { name: 'Tabla de horarios', pocket: 'key', desc: 'La tabla de la Noche Blanca que Rotom hizo con el método de Matière: dos columnas, dos relojes. Lo que no cuadra está en blanco.',
			read: '**LA NOCHE BLANCA · TABLA DE HORARIOS**\n*(método Matière: una columna por reloj)*\n\n**Hora vieja (sol, la de Teodoro)** · **Hora nueva (tren, la de los bomberos)** · Qué pasó · Quién lo dice\n\n— **23:30** · 22:30 · Se blanquean los tejados del norte · Teodoro, factura del vidriero (solo el norte)\n— **antes de las 00:00** · 23:00 · Luz en la panadería; alguien hace pan · cuaderno de Inés\n— **00:00** · 23:00 · Primeras doce, a mano · campanero, Teodoro, Inés (ya en la muralla)\n— **00:00** · 23:00 · La villa atrasa sus relojes una hora · acta (cuatro firmas en la plaza)\n— **00:40** · **23:40** · Fuego en la panadería · Teodoro (00:40) y bomberos (23:40): **la misma hora**\n— 00:55 · 23:55 · Llega la panadera desde la plaza · parte de bomberos\n— **01:00** · **00:00** · Segundas doce: el reloj de la torre, solo · campanero, Teodoro, Inés, vecino del sur\n\n**En blanco:** ¿qué heló solo el norte? ¿Quién estaba en la panadería? ¿Quién era la niña de pelo azul?\n\n*Nota de Matière:* «Cuando dos testigos no casan, no siempre miente uno. A veces llevan relojes distintos. — M.»' },
		chapareloj: { name: 'Chapa del relojero', pocket: 'key', desc: 'Una chapa de latón que estaba atornillada a la caja del reloj del campanario de Chamota. El campanero te la ha dado «para que alguien la lea fuera de esta torre».',
			read: '**COMPAÑÍA DEL FERROCARRIL REGIONAL DE TESELIA**\n*Servicio de Relojería*\n\nReloj público de la Villa de Chamota (campanario)\n\n**AJUSTADO A LA HORA DEL FERROCARRIL**\n**Atrasado una hora a medianoche, hora solar, 14 de agosto.**\n**Da las horas solo. No requiere campanero.**\n\n*(Debajo, rayado con algo puntiagudo, quizá una navaja: «Yo toco las del sol». Y al lado, muy pequeñas, dos marcas que parecen arañazos de una pata).*' },
		escarchamuralla: { name: 'Escarcha de la muralla', pocket: 'key', desc: 'Un trozo de hielo del tamaño de un puño, sacado del fondo de una grieta de la muralla norte de Chamota. No se derrite en la mano ni en la mochila. Está frío como si lo acabaran de hacer. Si lo acercas al oído, no se oye nada. Casi.' },
		cronicanueva: { name: 'Crónica de las dos horas', pocket: 'key', desc: 'La crónica nueva de don Teodoro sobre la Noche Blanca, treinta años después. Está pegada en la estación, en el ayuntamiento y en la panadería. Esta es tu copia.',
			read: '**CRÓNICA DE CHAMOTA**\n*por Teodoro Albar, cronista de la villa*\n\n**LA NOCHE BLANCA, CON DOS RELOJES**\n\nHace treinta años escribí la crónica de la Noche Blanca con los dedos helados. Era verdad. Le faltaba una línea.\n\nEsa noche, a medianoche, Chamota cambió de hora. Las doce sonaron dos veces porque fueron dos medianoches: la del sol, a mano, y la del tren, una hora después. No fue un fantasma. Fue un acta.\n\nEl frío no heló la villa entera: heló el norte, por una grieta de la muralla que mira al Boquete. Yo vivía en el norte. Lo vi todo blanco y lo escribí todo blanco. Pido perdón a los geranios del sur.\n\nLa panadería no la encendió doña Asunción. La encendió su hija Celia, que tenía la masa cuajándose en las tablas y miedo de que al día siguiente no hubiera pan. El tiro estaba lleno de hielo. Nadie podía saberlo. Doña Asunción llegó de la plaza, vio las manos de su hija y dijo «lo encendí yo». Lo dijo treinta años. Murió diciéndolo.\n\nY la niña de los Garza no la sacó de casa ningún fantasma ni ninguna forastera, sino un Zorua del campanario, de una familia que lleva allí más que el reloj. La sacó **antes** del fuego. Que cada cual saque sus conclusiones. Yo ya he sacado las mías.\n\nCinco versiones. Ninguna mentía del todo.\n\nQue no se diga que en Chamota no sabemos corregirnos. Tardamos, eso sí.\n\n— T. A.' },
		cartaapuntador2b: { name: 'Carta «Desde la concha» (2b)', pocket: 'key', desc: 'Un sobre color crema, sin remite, escrito a máquina. Papel de programa de teatro. Todas las «e» medio comidas por la tinta.',
			read: '*(Papel color crema de programa de teatro. Máquina de escribir. Todas las «e» están medio borradas, como si la tinta se las comiera.)*\n\nA la narradora y a su colaborador{|a|e}:\n\n«Una sola causa no lo explica todo». Bonita frase para un martes por la noche. Se la apunto.\n\n«No fue un fantasma: fue un decreto». También me la apunto. Yo llegué a lo mismo con el horario de la vía, que se vende en el quiosco de la estación por cincuenta pokédólares.\n\nYo también lo resolví. Llegué segundo. No me gusta llegar segundo.\n\nDijo usted que el resto no lo cuenta, que hay cosas que son del pueblo. Lo que no contó, no lo sé. Y me molesta no saberlo. Que conste.\n\nUn buen narrador no deja nada fuera. Pero eso usted ya lo sabe.\n\n— Desde la concha' },
		menuteselia: { name: 'Menú de Teselia', pocket: 'medicine', cost: 0, desc: 'El pan de la Noche Blanca a la manera de Gaspar y Lulú: trenzado, con escarcha de azúcar en espiral y crema de Baya Tamate. Al compartirlo, la amistad de todo tu equipo aumenta.', use: 'usar_menu_teselia' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b06_huertos_chamota: {
			name: 'Las espalderas de los huertos', icon: '🧺', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'otono', hint: 'Sacude las ramas pegadas a la muralla y recoge con la cesta. Las piñas de los pinos del norte se cuelan; no las agarres.' },
			ask: 'Árboles de bayas en espaldera, con las ramas atadas contra la piedra de la muralla, que da calor de día. El cartel de la cancela: «Coja lo que caiga. Lo que cuelga, pregunte».',
			text: 'Recoges lo que ha caído hoy. Un vecino te mira desde su caseta, mira lo que llevas y asiente: ha caído, vale.',
			wait: 'Las espalderas están recién sacudidas. Lo que queda cuelga, y lo que cuelga hay que preguntarlo.',
			table: [
				{ id: 'persimberry', w: 14, n: [1, 3] }, { id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'leppaberry', w: 12, n: [1, 2] },
				{ id: 'rawstberry', w: 10, n: [1, 2] }, { id: 'pomegberry', w: 8, n: [1, 1] }, { id: 'qualotberry', w: 8, n: [1, 1] },
				{ id: 'grepaberry', w: 6, n: [1, 1] }, { id: 'tamatoberry', w: 6, n: [1, 1] }, { id: 'miracleseed', w: 4, n: [1, 1] },
				{ id: 'lumberry', w: 3, n: [1, 1], rare: true }, { id: 'bigroot', w: 1, n: [1, 1], rare: true },
			],
		},
		b06_hielo_boca: {
			name: 'El hielo de la boca', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 2, theme: 'hielo', hint: 'Bloques de hielo que se han soltado de la pared. Algo brilla dentro. Pica con cuidado: el hielo viejo se agrieta de golpe.' },
			ask: 'Al pie de la pared de hielo del Boquete hay bloques sueltos, del tamaño de una puerta, con cosas atrapadas dentro desde hace quién sabe cuánto.',
			text: 'El bloque se abre con un crujido limpio. Lo de dentro está seco, frío y perfecto.',
			wait: 'Los bloques sueltos ya están picados. La pared no suelta otro hasta mañana. O hasta que ella quiera.',
			table: [
				{ id: 'nevermeltice', w: 14, n: [1, 1] }, { id: 'icyrock', w: 8, n: [1, 1] }, { id: 'hardstone', w: 12, n: [1, 1] },
				{ id: 'stardust', w: 12, n: [1, 2] }, { id: 'pearl', w: 10, n: [1, 1] }, { id: 'snowball', w: 6, n: [1, 1] },
				{ id: 'icestone', w: 3, n: [1, 1], rare: true }, { id: 'starpiece', w: 2, n: [1, 1], rare: true }, { id: 'nugget', w: 1, n: [1, 1], rare: true },
			],
		},
	},

	// Carta 2b del Apuntador: llega al buzón del estudio de Porcelana (T0) si Renata emitió la pizarra
	extraSpots: {
		estudio_casos: [
			{ label: 'Un sobre color crema', sub: 'En el buzón del estudio, sin remite', icon: '✉️', cond: 'flag.b06_chamota_emitido && !flag.b06_apuntador_2b', new: 'true', talk: [{ script: 'b06_carta_2b' }] },
		],
	},

	patches: {},
	events: [],
	milestones: [],
};

