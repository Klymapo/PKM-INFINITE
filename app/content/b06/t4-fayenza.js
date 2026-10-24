// Bloque 6 · Tramo 4: «El frío de Fayenza» (~2 h 45).
// Ruta 5 (desde Esmalte) → Puente de Fayenza (bajado por fin; block hasta b06_t3_hecho) → Ciudad Fayenza (llegada,
// cinemática) → Gimnasio de Brock (cocina antes del combate; Mega-Steelix; Lucario brilla, cinemática) → Handsome y
// Calder: los Almacenes Frigoríficos (Proyecto Arco II) → vestíbulo (Pimpinela y Zyra según la luz, Fabio opcional,
// reclutas Plasma) → cámaras (dos puzles de hielo, Kaori y el lote 05, Bastien si siguió con el contrato) → el
// laboratorio frío: Xero (jefe) → Acromo huye con el Arco (cinemática) → {riolu} encuentra a Matías Olmedo (rastreo)
// → Olmedo: «módulos de acompañamiento» (cinemática) → Renata llega: cierra su caso; Dámaso por llamada
// → la furgoneta de Casos Fríos en el muelle: el mensaje sin firma (Noa) y LA TRAMPA, en papel → b06_t4_hecho.
// Muelle de Fayenza: zona de entrenamiento (tope 65, Feraligatrita) y pesca diaria. Mercado: piedras y MT de Teselia.
//
// Contrato del Apuntador: las frases marcadas // EN ANTENA son las únicas que el Apuntador puede conocer de este tramo.
// Las marcadas // FUERA DE MICRO no las sabe nunca.

// ---------- Condiciones reutilizadas ----------
const LUC = '(inParty("riolu") || inParty("lucario"))';
const LEAL = 'flag.b01_bastien_cubierto';
const SIGUE = 'flag.b05_bastien_sigue';
const GYM_T = 'beat("gym_fayenza_1") && beat("gym_fayenza_2")';
const FOTO = '(has("expedienteolmedo") || has("fotoexpediente"))';
const DAMASO = '(flag.b03_sotano_abierto || flag.b03_renata_deduccion)';
const CAMARA2 = 'flag.b06_hielo_1';
const LAB = 'flag.b06_hielo_2';

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== RUTA 5 ===================
		tes_ruta5: {
			name: 'Ruta 5', short: 'Ruta 5', region: 'teselia', kind: 'route', map: { x: 16, y: 62 },
			bg: { type: 'route', flowers: '#e9c46a', hill: '#6a8a4a', far: '#9ab8d0' },
			desc: 'Al norte de Esmalte, el camino se ensancha entre caravanas pintadas y furgonetas con el techo lleno de bártulos. Aquí paran los artistas que van de ciudad en ciudad: un músico afina debajo de un toldo, una bailarina ensaya con un Cinccino que le copia los pasos.\n\nAl fondo, por encima de los árboles, asoman dos torres de hierro rojo: el **Puente de Fayenza**.',
			descNight: 'De noche, la Ruta 5 huele a hoguera y a guiso. Las caravanas encienden farolillos y alguien toca el acordeón, siempre la misma canción, cada vez un poco más despacio. Los Liepard cruzan el camino sin hacer ruido.',
			links: ['esmalte', 'puente_levadizo'],
			mapNote: 'Caravanas de artistas · camino al Puente de Fayenza',
			rumors: [
				{ text: 'Los artistas de la Ruta 5 dicen que el puente lleva meses levantado «por obras». Que las obras eran de noche. Que de día no se veía a ningún obrero.' },
				{ text: 'Hay un Emolga que roba las púas de las guitarras de las caravanas. Dicen que tiene un nido lleno, y que con ellas se ha hecho una cama.' },
				{ cond: 'flag.b06_t4_hecho', text: 'Por la Ruta 5 pasó de noche una furgoneta con «CASOS FRÍOS» pintado en el lateral. Iba despacio. Dentro alguien hablaba sola, como si contara un cuento.' },
			],
			route: {
				from: 'esmalte', to: 'puente_levadizo', length: 6, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Sales de Esmalte por la puerta norte. La carretera vieja se convierte en un camino de tierra lleno de rodadas, entre hierba alta y caravanas aparcadas de cualquier manera.' }],
					1: [
						{ trainer: 'tes5_gualterio' },
						{ item: 'hyperpotion' },
					],
					2: [
						{ text: 'Un claro con tres caravanas en círculo y una mesa plegable en medio. En la mesa, un cartel escrito con tiza: «Coja lo que quiera del arbusto. Deje una canción».' },
						{ spot: { action: { gather: 'b06_tes5_arbusto' } }, label: 'El arbusto de las caravanas', sub: 'Cargado de bayas. Alguien ha colgado cascabeles', icon: '🫐', new: '!flag.rec_b06_tes5_arbusto' },
					],
					3: [
						{ trainer: 'tes5_irati', optional: true, label: 'Una bailarina ensaya con un Cinccino que la imita' },
						{ item: 'maxrevive', hidden: true },
					],
					4: [
						{ text: 'La hierba se aplana en un camino ancho. Un cartel de la Gira, nuevo, clavado sobre uno viejo de obras: «PUENTE DE FAYENZA · ABIERTO». Debajo, el viejo todavía asoma: «…CERRADO HASTA NUEVO AV…».' },
						{ trainer: 'tes5_leoncio' },
					],
					5: [
						{ trainer: 'tes5_nuria', optional: true, label: 'Una guardabosques mira el puente con prismáticos' },
						{ item: 'ultraball', n: 3 },
						{ item: 'ppup', hidden: true },
					],
					6: [{ text: 'Los árboles se acaban de golpe. Delante, el río ancho y gris, y encima, las dos torres rojas del **Puente de Fayenza** con su tablero de hierro tendido de orilla a orilla.' }],
				},
				encounters: {
					grass: [
						{ sp: 'cinccino', lv: [62, 64], w: 16 },
						{ sp: 'audino', lv: [62, 64], w: 16 },
						{ sp: 'liepard', lv: [62, 64], w: 14, time: 'night' },
						{ sp: 'gothitelle', lv: [62, 64], w: 12 },
						{ sp: 'garbodor', lv: [62, 64], w: 12 },
						{ sp: 'reuniclus', lv: [62, 64], w: 10 },
						{ sp: 'emolga', lv: [62, 63], w: 8, time: 'day' },
						{ sp: 'sawsbuck', lv: [62, 64], w: 6 },
						{ sp: 'zebstrika', lv: [63, 64], w: 3 },
						{ sp: 'toucannon', lv: [62, 64], w: 4, displaced: true },
						{ sp: 'corviknight', lv: [63, 64], w: 3, displaced: true },
					],
				},
			},
		},

		// =================== PUENTE DE FAYENZA ===================
		puente_levadizo: {
			name: 'Puente de Fayenza', short: 'Puente de Fayenza', region: 'teselia', kind: 'route', map: { x: 12, y: 50 },
			bg: { type: 'coast', far: '#8aa8c0', ground: '#8a3a2f' },
			desc: 'El puente levadizo más largo de Teselia: un tablero de hierro pintado de rojo, tendido sobre el río entre dos torres con poleas del tamaño de una casa. Cuando sube o baja, las poleas gruñen. De verdad. Un quejido largo y grave, como un barco que se despide.\n\nAl otro lado, las grúas del puerto de **Ciudad Fayenza**.',
			descNight: 'De noche, el puente se ilumina con una fila de farolas amarillas que se reflejan en el río. Las poleas crujen de vez en cuando, como si soñaran. Los Swanna duermen en las vigas, con la cabeza debajo del ala.',
			links: ['tes_ruta5', 'fayenza'],
			mapNote: 'El puente levadizo · las torres de las poleas',
			rumors: [
				{ text: 'Dicen que el Puente de Fayenza se levanta cada noche a las tres para dejar pasar barcos que no salen en ningún registro. Los pescadores dicen que no. Que se levanta a las tres y cuarto.' },
				{ text: 'El operario del puente lleva veinte años en la caseta. Dice que conoce cada remache por su nombre. Que el que más se queja es el treinta y siete, y que tiene motivos.' },
			],
			route: {
				from: 'tes_ruta5', to: 'fayenza', length: 3, terrain: 'path', rate: 0.15,
				tramos: {
					0: [
						{ text: 'La rampa del puente. Hierro rojo, remaches del tamaño de un puño y un letrero esmaltado: «Puente de Fayenza · Velocidad máxima: la de un Swanna».' },
						{ block: { cond: 'flag.b06_t3_hecho', dir: 1, msg: 'El tablero del puente está levantado, de pie contra el cielo como una pared roja. Una cadena cruza la rampa con un cartel: «OBRAS · CERRADO HASTA NUEVO AVISO». Desde la caseta, un operario con casco se encoge de hombros: «Cuando me lo digan, lo bajo. Nadie me lo dice».' } },
					],
					1: [
						{ trainer: 'tes_puente_brais', optional: true, label: 'Un pescador echa la caña desde la barandilla' },
						{ item: 'pearlstring', hidden: true },
					],
					2: [
						{ text: 'A mitad del puente sopla el viento y el tablero entero vibra bajo tus pies, despacio, como la cubierta de un barco. Un Swanna se posa en la barandilla y te mira como si el puente fuera suyo.' },
						{ trainer: 'tes_puente_amaya', optional: true, label: 'Una señora con un Swanna en brazos y una cámara al cuello' },
						{ item: 'fullheal' },
					],
					3: [{ text: 'El tablero baja hacia la orilla. Grúas amarillas, contenedores, gaviotas, y un olor a salitre y a pescado que llega antes que la ciudad: **Ciudad Fayenza**.' }],
				},
				encounters: {
					path: [
						{ sp: 'swanna', lv: [62, 64], w: 30 },
						{ sp: 'unfezant', lv: [62, 64], w: 16 },
						{ sp: 'mandibuzz', lv: [62, 64], w: 6 },
						{ sp: 'braviary', lv: [63, 64], w: 3, time: 'day' },
						{ sp: 'pelipper', lv: [62, 64], w: 8, displaced: true },
					],
				},
			},
		},

		// =================== CIUDAD FAYENZA ===================
		fayenza: {
			name: 'Ciudad Fayenza', short: 'Fayenza', region: 'teselia', kind: 'city', map: { x: 10, y: 38 },
			bg: { type: 'coast', roofs: ['#8a3a2f', '#c4743a', '#5a6a7a'], far: '#7a9ab0', ground: '#9a8a7a' },
			desc: 'Una ciudad de puerto que trabaja: grúas amarillas, contenedores apilados como piezas de construcción, estibadores con chaleco naranja y un mercado que abre a las cinco de la mañana. Huele a salitre, a gasóleo y a pan recién hecho.\n\nEn la colina, la boca de una mina vieja con un cartel: **Gimnasio de Fayenza**. Al sur, junto al agua, unas naves blancas sin ventanas que echan vaho por el tejado: los **Almacenes Frigoríficos**.',
			descNight: 'De noche, el puerto de Fayenza no duerme: los focos de las grúas pintan el agua de blanco y los barcos descargan con un pitido largo. En el mercado, una sola persiana subida: la del puesto de buñuelos.\n\nLas naves de los Almacenes Frigoríficos siguen echando vaho por el tejado, como si respiraran.',
			descs: [
				{ cond: 'flag.b06_t4_hecho', text: 'El puerto de Fayenza, con sus grúas y su mercado de madrugada. Los estibadores hablan de lo de los Almacenes en voz baja, mirando hacia el sur: las naves blancas tienen precintos amarillos de la Policía Internacional y ya no echan vaho.\n\nEn el gimnasio de la colina, alguien ha colgado un delantal de una piqueta, como una bandera.' },
			],
			onEnter: [{ script: 'b06_fayenza_llegada', cond: '!flag.b06_fayenza_llegada', once: true }],
			mapNote: 'Gimnasio: Brock (Roca) · muelle (tope 65) · Almacenes Frigoríficos · Mercado (MT)',
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Fayenza', action: { shop: 'tienda_fayenza' } },
				{ label: 'Mercado de Fayenza', sub: 'Piedras y MT en cajas de pescado', icon: '💿', action: { shop: 'b06_mt_fayenza' } },
				{ label: 'Gimnasio de Fayenza', sub: 'Líder de intercambio: Brock (Roca)', icon: '🪨', new: '!beat("brock_tes")', action: { go: 'gym_fayenza' } },
				{ label: 'El muelle de los estibadores', sub: 'Zona de entrenamiento (nivel recomendado 65)', icon: '⚓', action: { go: 'muelle_fayenza' } },
				{ label: 'Las naves del sur', sub: 'Blancas, sin ventanas. Echan vaho por el tejado', icon: '❄️', cond: '!flag.b06_brock_vencido', talk: [{ script: 'b06_almacen_cerrado' }] },
				{ label: 'Almacenes Frigoríficos', sub: 'Handsome te espera en la puerta', icon: '❄️', cond: 'flag.b06_brock_vencido', new: '!flag.b06_almacen', action: { go: 'almacen_frio' } },
				{ label: 'La furgoneta de Casos Fríos', sub: 'Aparcada en el muelle. Con las luces de dentro encendidas', icon: '🚐', cond: 'flag.b06_olmedo && !flag.b06_trampa', new: 'true', talk: [{ script: 'b06_trampa_plan' }] },
				{ label: 'Rotom: ¿qué me queda en Fayenza?', sub: 'Repasa lo pendiente', icon: '📱', cond: '!flag.b06_t4_hecho', talk: [{ script: 'b06_fayenza_pendiente' }] },
			],
			rumors: [
				{ text: 'El líder de siempre del gimnasio de Fayenza, Yakón, se fue de intercambio a otra región. Dejó dicho que nadie toque la palanca roja del ascensor de la mina. El nuevo líder la ha tocado. Dos veces.' },
				{ text: 'En los Almacenes Frigoríficos dicen que guardan pescado. Los pescadores del puerto dicen que hace meses que no les compran ni una caja.' },
				{ text: 'Los camiones que entran en los Almacenes de noche no llevan matrícula. Llevan un dibujo pequeño en la puerta: un ocho tumbado.', cond: '!flag.b06_t4_hecho' },
				{ text: 'En el puesto de buñuelos del mercado hay una foto de un líder de gimnasio con delantal, firmada: «Los mejores de Teselia. Después de los míos».', cond: 'flag.b06_brock_vencido' },
			],
		},

		// =================== GIMNASIO DE FAYENZA ===================
		gym_fayenza: {
			name: 'Gimnasio de Fayenza', parent: 'fayenza', kind: 'gym',
			bg: { type: 'cave', crystals: '#c4743a', dark: false },
			desc: 'El gimnasio es una mina de verdad: galerías con raíles, vagonetas, un ascensor de reja que baja chirriando y lámparas colgadas de las vigas. Las paredes son de roca roja, rayada por siglos de pico.\n\nAbajo del todo, en la galería grande, alguien ha montado una **cocina**: dos fogones, una olla del tamaño de un barril y una mesa larga hecha con tablones. Huele a estofado.',
			descNight: 'De noche, la mina del gimnasio solo tiene encendidas las lámparas de la galería grande. La olla sigue al fuego. Siempre hay alguien comiendo.',
			mapNote: 'Líder de intercambio: Brock (Roca)',
			spots: [
				{ label: 'Entrenador: Montañero Horacio', icon: '⛏️', action: { trainer: 'gym_fayenza_1' } },
				{ label: 'Entrenadora: Obrera Selene', icon: '⛏️', action: { trainer: 'gym_fayenza_2' } },
				{ label: 'La cocina de la galería', sub: 'Una olla enorme y una mesa larga', icon: '🍲', new: '!flag.b06_brock_cocina', talk: [
					{ cond: '!flag.b06_brock_cocina', script: 'b06_brock_cocina' },
					{ script: 'b06_brock_olla' },
				] },
				{ label: 'Brock', sub: 'Remueve la olla. Te hace un gesto: «primero, los de arriba»', icon: '🪨', cond: 'flag.b06_brock_cocina && !(' + GYM_T + ')', talk: [{ script: 'b06_brock_antes' }] },
				{ label: 'Brock', sub: 'Líder · tipo Roca', icon: '🪨', cond: 'flag.b06_brock_cocina && ' + GYM_T, new: '!beat("brock_tes")', talk: [
					{ cond: 'beat("brock_tes")', script: 'b06_brock_fay_despues' },
					{ script: 'b06_brock_reto' },
				] },
			],
		},

		// =================== MUELLE DE FAYENZA (ENTRENAMIENTO) ===================
		muelle_fayenza: {
			name: 'Muelle de los estibadores', parent: 'fayenza', kind: 'area',
			bg: { type: 'coast', far: '#6a8aa0', ground: '#6a5a4a' },
			desc: 'El muelle más viejo del puerto: tablones negros de salitre, bolardos de hierro y cabos gruesos como brazos. Los estibadores entrenan aquí al acabar el turno, entre caja y caja, con Pokémon tan fuertes como ellos.\n\nAmarrado al bolardo del fondo, un mercante enorme tira de sus cabos con cada ola. Y algo, en el agua, tira de él hacia la orilla.',
			descNight: 'De noche, el muelle se queda con una sola farola y el ruido del agua contra los pilotes. En el bolardo del fondo, unos ojos rojos asoman del agua de vez en cuando, miran a ver si todo sigue en su sitio, y se vuelven a hundir.',
			mapNote: 'Entrenamiento (tope 65) · pesca',
			spots: [
				{ label: 'Los estibadores del turno de tarde', sub: 'Zona de entrenamiento (nivel recomendado 65)', icon: '⚓', action: { training: {
					cap: 65, prize: { wins: 3, script: 'b06_premio_muelle' }, trainers: ['muelle_fay_1', 'muelle_fay_2', 'muelle_fay_3'], npc: 'estibador', coach: 'Capataz del muelle',
					closed: 'El capataz mira a tu equipo, luego al mercante, y luego otra vez a tu equipo. «Esos ya amarran un barco ellos solos. Aquí no aprenden nada. Vete a la colina, que el de la mina cocina mejor que entrena. Bueno, entrena bien. Pero cocina mejor».',
				} } },
				{ label: 'El capataz', sub: 'Chaleco naranja y un silbato de latón', icon: '👷', talk: [{ script: 'b06_capataz' }] },
				{ label: 'El borde del muelle', sub: 'Agua honda y verde, entre los pilotes', icon: '🎣', new: '!flag.rec_b06_muelle_fayenza', action: { gather: 'b06_muelle_fayenza' } },
			],
			rumors: [
				{ text: 'El Feraligatr del capataz lleva veinte años en el agua del muelle. Dicen que una vez, en un temporal, sujetó él solo un mercante que se había soltado. Que estuvo tirando toda la noche. Que al amanecer pidió un bocadillo.' },
			],
		},

		// =================== ALMACENES FRIGORÍFICOS ===================
		almacen_frio: {
			name: 'Almacenes Frigoríficos', parent: 'fayenza', kind: 'building',
			bg: { type: 'lab', wall: '#d8e4ec', floor: '#8aa0b0' },
			desc: 'Por fuera, una nave de pescado. Por dentro, no huele a pescado. Un vestíbulo enorme, de techo alto, con cajas apiladas que pone «PESCADO CONGELADO» y que nadie ha abierto nunca. El suelo brilla de escarcha. El aliento se te hace nube.\n\nAl fondo, una puerta acolchada de las que pesan una tonelada: **las cámaras**. En una pared, con letras recién pintadas, alguien ha escrito un nombre que no es de pescado: **ARCO II**.',
			descNight: 'De noche, los Almacenes Frigoríficos zumban más fuerte. Las cajas de «pescado congelado» tienen escarcha por fuera y, si pegas la oreja, algo que hace tic por dentro.',
			descs: [
				{ cond: 'flag.b06_t4_hecho', text: 'El vestíbulo de los Almacenes Frigoríficos, con las cajas abiertas y vacías y una cinta amarilla de la Policía Internacional de pared a pared. Las letras de **ARCO II** siguen en la pared. Alguien ha pegado debajo un pósit: «Pruebas. No tocar. Handsome».\n\nYa no hace tanto frío. Pero hace.' },
			],
			onEnter: [{ script: 'b06_almacen_entrada', cond: '!flag.b06_almacen', once: true }],
			mapNote: 'Proyecto Arco II · las cámaras · el laboratorio',
			spots: [
				{ label: 'Handsome y Calder', sub: 'Junto a la puerta, con el vaho por delante', icon: '🕵️', talk: [
					{ cond: 'flag.b06_t4_hecho', script: 'b06_handsome_final' },
					{ script: 'b06_handsome_almacen' },
				] },
				{ label: 'Dos científicas discuten con un guardia', sub: 'Una lleva bata; la otra, unas gafas redondas empañadas', icon: '🥼', new: '!flag.b06_pimpinela_zyra', talk: [
					{ cond: '!flag.b06_pimpinela_zyra', script: 'b06_pimpinela_zyra' },
					{ script: 'b06_pimpinela_zyra_despues' },
				] },
				{ label: 'Un hombre con un mono de climatización', sub: 'Tiene una bata debajo del mono. Se nota', icon: '🧰', new: '!flag.b06_fabio_visto', talk: [
					{ cond: '!flag.b06_fabio_visto', script: 'b06_fabio_almacen' },
					{ cond: '!beat("fabio_2")', script: 'b06_fabio_reto' },
					{ script: 'b06_fabio_despues' },
				] },
				{ label: 'Recluta Plasma junto a las cajas', sub: 'Capucha gris. Cuenta cajas sin contar', icon: '🛡️', action: { trainer: 'plasma_alm_1' } },
				{ label: 'Recluta Plasma en la escalera', sub: 'Mira la puerta de las cámaras con cara de frío', icon: '🛡️', action: { trainer: 'plasma_alm_2' } },
				{ label: 'Las cámaras', sub: 'Una puerta acolchada que pesa una tonelada', icon: '🚪', new: '!flag.b06_hielo_1', action: { go: 'almacen_camaras' } },
			],
			rumors: [
				{ text: 'En el vestíbulo de los Almacenes hay cajas con la etiqueta «PESCADO CONGELADO · LOTE 05». No huelen a pescado. Huelen a azúcar.' },
			],
		},

		// =================== LAS CÁMARAS ===================
		almacen_camaras: {
			name: 'Las cámaras', parent: 'almacen_frio', kind: 'cave',
			bg: { type: 'cave', crystals: '#a8e0f0', fog: true },
			desc: 'Pasillos de hielo entre cámaras numeradas. El suelo es una pista de patinaje: lo que se mueve, resbala hasta que choca. En las paredes, la escarcha ha crecido en plumas blancas. Algún Pokémon salvaje se ha colado por los conductos y se ha quedado: aquí hace el frío que les gusta.\n\nLas cámaras 1 a 3 tienen el número pintado en rojo. La 4 tiene una cerradura de las caras. La puerta del fondo pone **LABORATORIO**.',
			descNight: 'De noche, en las cámaras solo zumban los compresores. El hielo del suelo refleja las luces de emergencia, rojas. Un Cryogonal flota en el pasillo como una lámpara que nadie ha colgado.',
			descs: [
				{ cond: 'flag.b06_t4_hecho', text: 'Los pasillos de hielo de las cámaras. Los compresores van más despacio: alguien de la Policía ha subido la temperatura dos grados. Los Pokémon salvajes no se han ido. Han decidido que esto ya es suyo.' },
			],
			mapNote: 'Pasillos de hielo · las cámaras 1 a 4 · el laboratorio',
			spots: [
				{ label: 'El pasillo de la cámara 3', sub: 'Hielo de pared a pared. Hay que cruzarlo', icon: '🧊', cond: '!' + CAMARA2, new: 'true', talk: [{ script: 'b06_hielo_1' }] },
				{ label: 'El pasillo de la cámara 3', sub: 'Ya sabes por dónde se resbala', icon: '🧊', cond: CAMARA2, talk: [{ script: 'b06_hielo_1_despues' }] },
				{ label: 'Cámara 2 · Lote 05', sub: 'Se oye a alguien contar en voz baja', icon: '🧪', cond: CAMARA2, new: '!flag.b06_kaori_frio', talk: [
					{ cond: '!flag.b06_kaori_frio', script: 'b06_kaori_frio' },
					{ script: 'b06_kaori_despues' },
				] },
				{ label: 'Cámara 4 · Unidad de Estudios de Vínculo', sub: 'Cerradura de runas. Dentro, alguien tose', icon: '🔒', cond: CAMARA2 + ' && ' + SIGUE + ' && !flag.b06_bastien_sujeto', new: 'true', talk: [{ script: 'b06_bastien_cabina' }] },
				{ label: 'Cámara 4 · Unidad de Estudios de Vínculo', sub: 'La puerta abierta. Un sillón con cables', icon: '🔓', cond: CAMARA2 + ' && flag.b06_bastien_sujeto', talk: [{ script: 'b06_bastien_camara' }] },
				{ label: 'Cámara 4', sub: 'Cerrada. Un cartel: «Estudios de vínculo · sin sujeto asignado»', icon: '🔒', cond: CAMARA2 + ' && !' + SIGUE, talk: [{ script: 'b06_cabina_vacia' }] },
				{ label: 'Recluta Plasma de guardia', sub: 'Tirita. Lleva tres bufandas', icon: '🛡️', cond: CAMARA2, action: { trainer: 'plasma_alm_3' } },
				{ label: 'El pasillo del laboratorio', sub: 'Hielo, rocas y una compuerta con placas en el suelo', icon: '🧊', cond: CAMARA2 + ' && !' + LAB, new: 'true', talk: [{ script: 'b06_hielo_2' }] },
				{ label: 'El laboratorio', sub: 'Una puerta de acero con un ojo de buey empañado', icon: '🔬', cond: LAB, new: '!flag.b06_olmedo', action: { go: 'almacen_lab' } },
				{ label: 'La pared de hielo viejo', sub: 'Algo brilla dentro, a un palmo de la superficie', icon: '⛏️', new: '!flag.rec_b06_camaras_hielo', action: { gather: 'b06_camaras_hielo' } },
				{ label: 'Recorrer los pasillos', sub: 'Pokémon de hielo colados por los conductos', icon: '❄️', action: { explore: 'cave' } },
			],
			encounters: {
				cave: [
					{ sp: 'beartic', lv: [62, 64], w: 18 },
					{ sp: 'cryogonal', lv: [62, 64], w: 14 },
					{ sp: 'vanilluxe', lv: [62, 64], w: 12 },
					{ sp: 'boldore', lv: [62, 63], w: 12 },
					{ sp: 'excadrill', lv: [62, 64], w: 10 },
					{ sp: 'durant', lv: [62, 64], w: 8 },
					{ sp: 'heatmor', lv: [62, 64], w: 6, time: 'night' },
					{ sp: 'gurdurr', lv: [62, 63], w: 6 },
					{ sp: 'steelix', lv: [63, 64], w: 2 },
					{ sp: 'eiscue', lv: [62, 64], w: 4, displaced: true },
					{ sp: 'sandslashalola', lv: [62, 64], w: 4, displaced: true },
				],
			},
			rumors: [
				{ text: 'Un Beartic se ha hecho una cueva en la cámara 1, detrás de las cajas. Los reclutas no entran. Le dejan pescado en la puerta, por si acaso.' },
				{ text: 'El suelo de las cámaras está tan liso que los reclutas Plasma van de una puerta a otra resbalando sentados. Lo llaman «el tobogán». Lo tienen prohibido. Lo hacen igual.' },
			],
		},

		// =================== EL LABORATORIO FRÍO ===================
		almacen_lab: {
			name: 'El laboratorio frío', parent: 'almacen_frio', kind: 'building',
			bg: { type: 'lab', wall: '#2a3440', floor: '#4a5a6a' },
			desc: 'Una sala alta y helada, con mesas de acero llenas de piezas, monitores con la pantalla escarchada y cables gruesos que suben por las paredes. En el centro, un círculo pintado en el suelo, del tamaño de una casa, con marcas de algo muy grande que estuvo apoyado ahí.\n\nAl fondo, una puerta pequeña con un letrero torcido: **CÁMARA 0**.',
			descs: [
				{ cond: 'flag.b06_acromo_huye', text: 'El laboratorio frío, medio vacío. El círculo del suelo está desnudo: lo que había encima ya no está. Quedan cables cortados, una taza helada en una mesa y un monitor que repite, en bucle, la misma línea: «TRANSPORTE · DESTINO: TORRE».\n\nAl fondo, la puerta de la **cámara 0**.' },
				{ cond: 'flag.b06_olmedo', text: 'El laboratorio frío, vacío. El círculo del suelo, desnudo. La puerta de la cámara 0, abierta de par en par, con una manta tirada en el umbral.\n\nEn una mesa, una taza con dibujos de tren, lavada y boca abajo sobre un trapo.' },
			],
			mapNote: 'Xero · la cámara 0',
			spots: [
				{ label: 'Un hombre de bata con las gafas enormes', sub: 'Te estaba esperando. A esta hora, exactamente', icon: '🔧', cond: '!flag.b06_xero_vencido', new: 'true', talk: [{ script: 'b06_xero_combate' }] },
				{ label: 'La cámara 0', sub: '{riolu} no le quita la vista de encima', icon: '❄️', cond: 'flag.b06_xero_vencido && !flag.b06_olmedo && ' + LUC, new: 'true', talk: [{ script: 'b06_camara0_aura' }] },
				{ label: 'La cámara 0', sub: 'Una puerta pequeña con escarcha. Alguien golpea desde dentro', icon: '❄️', cond: 'flag.b06_xero_vencido && !flag.b06_olmedo && !' + LUC, new: 'true', talk: [{ script: 'b06_camara0' }] },
				{ label: 'La mesa de Olmedo', sub: 'Una taza boca abajo sobre un trapo', icon: '☕', cond: 'flag.b06_olmedo', talk: [{ script: 'b06_mesa_olmedo' }] },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Líder -----
		brock_tes: { name: 'Brock', cls: 'Líder', npc: 'brock', ai: 4, iv: 27, reward: 7800, bg: 'cave',
			gimmick: 'mega', ace: 'steelix',
			team: [
				{ sp: 'gigalith', lv: 63, moves: ['stoneedge', 'earthquake', 'heavyslam', 'stealthrock'], ability: 'sandstream', item: 'sitrusberry', nature: 'adamant', iv: 28 },
				{ sp: 'kabutops', lv: 62, moves: ['rockslide', 'liquidation', 'xscissor', 'aquajet'], ability: 'battlearmor', nature: 'jolly', iv: 26 },
				{ sp: 'omastar', lv: 63, moves: ['hydropump', 'ancientpower', 'icebeam', 'earthpower'], ability: 'shellarmor', nature: 'modest', iv: 28 },
				{ sp: 'rhyperior', lv: 64, moves: ['stoneedge', 'earthquake', 'icepunch', 'megahorn'], ability: 'solidrock', nature: 'adamant', iv: 29 },
				{ sp: 'steelix', lv: 65, moves: ['ironhead', 'earthquake', 'stoneedge', 'crunch'], ability: 'rockhead', item: 'steelixite', nature: 'impish', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: '¡Sin prisas, que la roca no se va a ningún sitio! Y la comida tampoco: la he tapado. ¡Gigalith, abre la galería!',
			win: '¡Ja! ¡Así se cava! Mi Steelix lleva diez años sin agacharse ante nadie. Hoy se ha agachado. Y lo ha hecho a gusto.',
			lose: '¡Buen combate! Ve al Centro, cómete algo y vuelve. La olla no se enfría. Nunca. Es una olla de Kanto.' },

		// ----- Gimnasio -----
		gym_fayenza_1: { name: 'Horacio', cls: 'Montañero', ai: 3, iv: 24, bg: 'cave',
			team: [
				{ sp: 'golem', lv: 63, moves: ['earthquake', 'stoneedge', 'heavyslam', 'suckerpunch'] },
				{ sp: 'probopass', lv: 63, moves: ['powergem', 'earthpower', 'thunderbolt', 'flashcannon'] },
			],
			intro: 'El líder nuevo cocina como los ángeles y entrena como un Golem. Yo solo entreno como un Golem. ¡Golem, demuéstralo!',
			win: 'Va, va. Sube. Y pide el estofado sin cebolla, que lleva mucha.' },
		gym_fayenza_2: { name: 'Selene', cls: 'Obrera', ai: 3, iv: 24, bg: 'cave',
			team: [
				{ sp: 'crustle', lv: 63, moves: ['stoneedge', 'xscissor', 'rockslide', 'shellsmash'] },
				{ sp: 'carbink', lv: 63, moves: ['powergem', 'moonblast', 'reflect', 'stealthrock'] },
				{ sp: 'sudowoodo', lv: 64, moves: ['woodhammer', 'rockslide', 'suckerpunch', 'headsmash'] },
			],
			intro: 'Con Yakón esto era una mina. Con Brock es una mina con cocina. Yo prefiero la mina. ¡Pero me como el estofado! ¡Vamos!',
			win: 'Pasa. Y no toques la palanca roja del ascensor. Él la toca. Tú no.' },

		// ----- Ruta 5 -----
		tes5_gualterio: { name: 'Gualterio', cls: 'Músico', ai: 2, bg: 'route',
			team: [
				{ sp: 'zebstrika', lv: 62 },
				{ sp: 'cinccino', lv: 62 },
			],
			intro: 'Toco en las caravanas desde hace veinte años. Este año me han pagado en entradas para el puente. ¡Y por fin lo han bajado! ¡Con música!',
			win: 'Desafiné. Pasa, pasa. Las poleas del puente desafinan menos que yo.' },
		tes5_irati: { name: 'Irati', cls: 'Bailarina', ai: 2, bg: 'route',
			team: [
				{ sp: 'cinccino', lv: 63 },
				{ sp: 'lilligant', lv: 63 },
			],
			intro: 'Mi Cinccino me copia los pasos. Luego se los inventa mejor. ¡Te enseño los suyos!',
			win: 'Mañana ensayo los tuyos. Los de perder no, los otros.',
			look: { hair: 'bun', hairColor: '#2a2440', outfit: '#e98aa8', outfit2: '#f2e6a0', skin: 3, eyesStyle: 'happy', mouth: 'smile', acc: 'flower' } },
		tes5_leoncio: { name: 'Leoncio', cls: 'Motorista', ai: 2, bg: 'route',
			team: [
				{ sp: 'garbodor', lv: 63 },
				{ sp: 'scrafty', lv: 63 },
				{ sp: 'liepard', lv: 63 },
			],
			intro: 'Tres meses dando la vuelta por la Ruta 6 porque «el puente está en obras». ¡Obras! ¡Si nunca vi a un obrero! Bueno, uno. Con capucha.',
			win: 'Ahora sí cruzo. Por el puente. Con la moto. Despacito.' },
		tes5_nuria: { name: 'Ximena', cls: 'Guardabosques', ai: 2, bg: 'route',
			team: [
				{ sp: 'sawsbuck', lv: 63 },
				{ sp: 'reuniclus', lv: 64 },
			],
			intro: 'Cuento los Swanna que cruzan el puente. Este año hay menos. Dicen que los asustaban unos camiones de noche. ¿Combatimos mientras cuento?',
			win: 'Cuarenta y uno. Cuarenta y dos con el que acaba de pasar. Y tú, uno.' },

		// ----- Puente -----
		tes_puente_brais: { name: 'Brais', cls: 'Pescador', ai: 2, bg: 'coast',
			team: [
				{ sp: 'basculin', lv: 63 },
				{ sp: 'seismitoad', lv: 63 },
			],
			intro: '¡Desde la barandilla se pesca de maravilla! Hacía meses que no podía. ¡El puente estaba de pie, como un armario!',
			win: 'Ya está. Se me ha escapado el Basculin y el combate. Vuelvo a lo primero.' },
		tes_puente_amaya: { name: 'Amaya', cls: 'Pokéfan', ai: 2, bg: 'coast',
			team: [
				{ sp: 'swanna', lv: 63 },
				{ sp: 'audino', lv: 63 },
			],
			intro: '¡Le estoy haciendo fotos a mi Swanna con el puente detrás! ¡Ahora una con combate! ¡Sonríe!',
			win: 'Ha salido movida. Las de perder siempre salen movidas.',
			look: { hair: 'curly', hairColor: '#cfcac0', outfit: '#e9e3d0', outfit2: '#3a8ac4', skin: 2, eyesStyle: 'happy', mouth: 'grin', age: 'old', acc: 'glasses' } },

		// ----- Muelle (entrenamiento) -----
		muelle_fay_1: { name: 'Dimas', cls: 'Estibador', ai: 3, npc: 'estibador', bg: 'coast',
			team: [
				{ sp: 'conkeldurr', lv: 63, moves: ['hammerarm', 'stoneedge', 'icepunch', 'bulkup'] },
				{ sp: 'golurk', lv: 64, moves: ['earthquake', 'shadowpunch', 'dynamicpunch', 'icepunch'] },
			],
			intro: 'Turno de seis a seis. Me queda energía para un combate. Uno. Que sea bueno.',
			win: 'Bueno era. A casa.' },
		muelle_fay_2: { name: 'Txell', cls: 'Marinera', ai: 3, bg: 'coast',
			team: [
				{ sp: 'jellicent', lv: 64, moves: ['hex', 'scald', 'recover', 'shadowball'] },
				{ sp: 'wailord', lv: 64, moves: ['hydropump', 'bounce', 'heavyslam', 'waterspout'] },
			],
			intro: 'Mi Wailord no cabe en el muelle. Lo saco igual. Al agua, que el muelle es suyo.',
			win: 'Ha salpicado al capataz. Eso vale más que ganar.',
			look: { hair: 'ponytail', hairColor: '#8a3a2f', outfit: '#3a4a6a', outfit2: '#e9e8e0', skin: 2, eyesStyle: 'sharp', mouth: 'grin', acc: 'beanie', capColor: '#c4473a' } },
		muelle_fay_3: { name: 'Ovidio', cls: 'Pescador', ai: 3, bg: 'coast',
			team: [
				{ sp: 'swanna', lv: 64, moves: ['hurricane', 'surf', 'roost', 'bravebird'] },
				{ sp: 'basculin', lv: 64, moves: ['aquatail', 'crunch', 'headsmash', 'zenheadbutt'] },
				{ sp: 'alomomola', lv: 65, moves: ['scald', 'wish', 'protect', 'waterpulse'] },
			],
			intro: 'Cuarenta años pescando en este muelle. He visto al Feraligatr del capataz sujetar un barco. ¿Tú qué has visto?',
			win: 'Ya veo lo que has visto. Muchas cosas.' },

		// ----- Almacenes Frigoríficos -----
		plasma_alm_1: { name: 'Sixto', cls: 'Recluta del Equipo Plasma', ai: 2, npc: 'recluta_plasma', bg: 'lab',
			team: [
				{ sp: 'liepard', lv: 63 },
				{ sp: 'garbodor', lv: 63 },
			],
			intro: '¡El Lazo nos liberará! Bueno, eso dicen arriba. Abajo nos dicen que contemos cajas. ¡Contaré tu derrota!',
			win: 'Una caja. Dos cajas. Una derrota. Me he liado.' },
		plasma_alm_2: { name: 'Marga', cls: 'Recluta del Equipo Plasma', ai: 2, npc: 'recluta_plasma', bg: 'lab',
			team: [
				{ sp: 'seviper', lv: 63 },
				{ sp: 'watchog', lv: 63 },
				{ sp: 'krookodile', lv: 64 },
			],
			intro: 'Antes liberábamos Pokémon. Ahora vigilamos una nevera. Algo ha salido mal por el camino, pero no sé dónde. ¡Combate!',
			win: 'Aquí dentro no se piensa bien. Hace demasiado frío para pensar.' },
		plasma_alm_3: { name: 'Fede', cls: 'Recluta del Equipo Plasma', ai: 2, npc: 'recluta_plasma', bg: 'cave',
			team: [
				{ sp: 'cofagrigus', lv: 64 },
				{ sp: 'beartic', lv: 64 },
			],
			intro: 'Tres bufandas. Tres. Y sigo temblando. Si te gano, me dejan subir a la torre. Allí arriba al menos da el sol.',
			win: 'Pues nada. Otra bufanda.' },

		// ----- Opcional -----
		fabio_2: { name: 'Fabio', cls: 'Consultor externo', npc: 'fabio', ai: 4, iv: 28, reward: 5100, bg: 'lab',
			team: [
				{ sp: 'hypno', lv: 62, moves: ['psychic', 'foulplay', 'thunderpunch', 'icepunch'], ability: 'insomnia', nature: 'calm', iv: 27 },
				{ sp: 'claydol', lv: 63, moves: ['earthpower', 'psychic', 'icebeam', 'reflect'], ability: 'levitate', nature: 'modest', iv: 27 },
				{ sp: 'bruxish', lv: 63, moves: ['psychicfangs', 'aquatail', 'crunch', 'icefang'], ability: 'strongjaw', nature: 'jolly', iv: 27 },
				{ sp: 'slowking', lv: 63, moves: ['psychic', 'scald', 'icebeam', 'slackoff'], ability: 'owntempo', nature: 'modest', iv: 27 },
				{ sp: 'alakazam', lv: 64, moves: ['psychic', 'shadowball', 'dazzlinggleam', 'focusblast'], ability: 'magicguard', item: 'twistedspoon', nature: 'timid', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: '¡Revancha! Esta vez sin piedra. La piedra me la quitaron. Con factura. ¡Pero el talento no me lo quita nadie!',
			win: 'Dos veces. Es una tendencia. Odio las tendencias cuando no son mías.',
			lose: '¡Ja! ¡La ciencia es repetición! Y repetir ganando es todavía más ciencia.' },

		// ----- Jefe de trama -----
		xero_1: { name: 'Xero', cls: 'Contratista', npc: 'xero', ai: 4, iv: 27, reward: 8400, bg: 'lab',
			team: [
				{ sp: 'malamar', lv: 64, moves: ['superpower', 'knockoff', 'psychocut', 'rockslide'], ability: 'contrary', nature: 'adamant', iv: 28 },
				{ sp: 'scrafty', lv: 64, moves: ['knockoff', 'drainpunch', 'icepunch', 'bulkup'], ability: 'intimidate', nature: 'adamant', iv: 28 },
				{ sp: 'toxicroak', lv: 65, moves: ['gunkshot', 'drainpunch', 'suckerpunch', 'icepunch'], ability: 'dryskin', nature: 'jolly', iv: 28 },
				{ sp: 'crawdaunt', lv: 65, moves: ['crabhammer', 'knockoff', 'xscissor', 'crunch'], ability: 'adaptability', item: 'sitrusberry', nature: 'adamant', iv: 29 },
				{ sp: 'drapion', lv: 66, moves: ['knockoff', 'poisonjab', 'earthquake', 'xscissor'], ability: 'battlearmor', item: 'blacksludge', nature: 'jolly', iv: 29 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: '¡Bwahaha! Contratista, sí. Pero esta parte del contrato me la he escrito yo: «Si llega {jugador}, pelear divinamente». ¡Malamar!',
			win: 'Bwaha… ha. —Se quita las gafas, las limpia, se las pone—. Pues ya está. Cláusula cumplida. Fatal.',
			lose: 'Te avisé de que atornillo divinamente. También los combates. Vuelve cuando quieras. A esta hora no, que me la sé.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LLEGADA A FAYENZA ===================
		b06_fayenza_llegada: [
			{ set: { 'flag.b06_fayenza_llegada': true } },
			{ cutscene: { time: 'tarde', weather: 'none', bg: { type: 'coast', roofs: ['#8a3a2f', '#c4743a', '#5a6a7a'], far: '#7a9ab0', ground: '#9a8a7a' }, start: 'dark', frames: [
				{ big: true, text: 'Ciudad Fayenza', sub: 'Teselia', hold: 2400, cam: 'still' },
				{ cam: 'pull', fx: 'light', text: 'Grúas amarillas, contenedores de colores apilados hasta el cielo y un ruido de puerto que no para: pitidos, cadenas, gaviotas y gente que se grita de barco a barco.' },
				{ cam: 'pan-up', text: 'En la colina, la boca de una mina con un cartel de gimnasio. Y de la boca de la mina sale humo. Humo de cocina.' },
				{ cam: 'pan-right', weather: 'fog', text: 'Al sur, junto al agua, unas naves blancas sin ventanas echan vaho por el tejado. Hace calor en el puerto. Alrededor de esas naves, no.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.35, enter: 'left' }], on: 'rio', fx: 'glow', cam: 'push', text: '{riolu} se ha parado en seco. Mira las naves del sur. El aura se le enciende un segundo alrededor de las manos, como cuando hay algo debajo de la tierra que nadie ve.' },
			] } },
			{ say: 'rotom', text: '¡Bzzt! ¡Fayenza! Puerto, mercado, grúas… ¡y Brock! El gimnasio está en la mina de la colina. —Pausa—. Huele a estofado desde aquí. Yo no huelo. Pero se ve que huele.' },
			{ if: LUC, then: [
				{ say: 'rotom', text: '¿Qué miras, {riolu}? ¿Las naves? Son neveras gigantes. Para pescado. Bueno, eso pone en el cartel.' },
			] },
			{ diary: 'Hoy mi entrenador{|a|e} ha llegado a Ciudad Fayenza por el puente levadizo. ¡Por fin lo han bajado! Las poleas gruñen como un barco que bosteza. Fayenza es un puerto lleno de grúas amarillas y de gente con chaleco naranja que se grita cosas cariñosas de un barco a otro. En la colina hay una mina que es un gimnasio, y del gimnasio sale humo de estofado. Eso solo puede ser una persona.', cond: 'flag.b01_diario' },
		],
		b06_fayenza_pendiente: [
			{ say: 'rotom', text: '¡Bzzt! Lista de cosas en Fayenza:' },
			{ say: 'rotom', text: '• **Brock** dirige el **gimnasio de la mina**, en la colina. Primero hay que ganar a sus dos entrenadores. Y comer, según él.', cond: '!beat("brock_tes")' },
			{ say: 'rotom', text: '• **Handsome** nos espera en los **Almacenes Frigoríficos**, al sur. Abrígate. Bueno, yo no puedo abrigarme. Abrígate tú por los dos.', cond: 'flag.b06_brock_vencido && !flag.b06_almacen' },
			{ say: 'rotom', text: '• Hay que cruzar el **pasillo de hielo** de las cámaras. Lo que se mueve, resbala.', cond: 'flag.b06_almacen && !' + CAMARA2 },
			{ say: 'rotom', text: '• Kaori está en la **cámara 2**, contando caramelos.', cond: CAMARA2 + ' && !flag.b06_kaori_frio' },
			{ say: 'rotom', text: '• En la **cámara 4** hay alguien. Tose. Me suena la tos.', cond: CAMARA2 + ' && ' + SIGUE + ' && !flag.b06_bastien_sujeto' },
			{ say: 'rotom', text: '• Falta el **pasillo del laboratorio**: hielo, rocas y una compuerta con placas.', cond: CAMARA2 + ' && !' + LAB },
			{ say: 'rotom', text: '• El **laboratorio** está abierto. Alguien nos espera dentro.', cond: LAB + ' && !flag.b06_xero_vencido' },
			{ say: 'rotom', text: '• La **cámara 0**, al fondo del laboratorio. Alguien golpea la puerta desde dentro.', cond: 'flag.b06_xero_vencido && !flag.b06_olmedo' },
			{ say: 'rotom', text: '• **Renata** te espera en la **furgoneta de Casos Fríos**, en el muelle.', cond: 'flag.b06_olmedo && !flag.b06_trampa' },
			{ say: 'rotom', text: '• Y si quieres entrenar: los estibadores del **muelle** (hasta el nivel 65). Dicen que el capataz guarda algo para quien gane tres veces.' },
		],
		b06_almacen_cerrado: [
			{ text: 'Las naves del sur: blancas, altas, sin una sola ventana. Un cartel: «ALMACENES FRIGORÍFICOS DE FAYENZA · Prohibido el paso». En la puerta, dos tipos con capucha gris y cara de frío te miran pasar sin decir nada.' },
			{ text: 'Del tejado sale vaho. Del suelo, junto a la puerta, sube un frío que te muerde los tobillos aunque en el puerto haga calor.' },
			{ if: LUC, then: [{ text: '{riolu} se queda mirando la puerta más rato del que te gustaría. Luego tira de ti hacia la colina, hacia el gimnasio. Primero lo primero.' }] },
		],

		// =================== GIMNASIO: BROCK ===================
		b06_brock_cocina: [
			{ set: { 'flag.b06_brock_cocina': true } },
			{ text: 'Bajas en el ascensor de reja, que chirría como un Pokémon viejo. Abajo, en la galería grande, hay una mesa larga de tablones llena de mineros, entrenadores del gimnasio y un par de estibadores que se han colado. Todos comen.' },
			{ text: 'En los fogones, con un delantal que pone «LÍDER (Y COCINERO)» bordado a mano y torcido, remueve una olla del tamaño de un barril alguien que conoces muy bien.' },
			{ say: 'brock', text: '¡{jugador}! —Suelta el cucharón, que se hunde en el estofado—. ¡Por fin! Ya bajaron el puente, ¿eh? ¡Te dije que te esperaba en la colina con el combate y con comida! Bueno, no te lo dije. Pero lo pensé muy fuerte.' },
			{ if: 'flag.b06_brock_comida', then: [
				{ say: 'brock', text: 'Desde la comida de Porcelana no he parado. Me dieron el gimnasio, me dieron la mina y me dieron una cocina con un fogón roto. El fogón ya no está roto. La mina tampoco. Bueno, la mina un poco.' },
			] },
			{ say: 'brock', text: 'Aquí hay una regla. Me la he inventado yo, que para eso soy el líder de intercambio: en mi gimnasio, antes de combatir, se come. Todo el gimnasio. Los que ganan y los que pierden. Así nadie pelea con hambre, y nadie pierde con hambre, que es peor.' },
			{ if: LUC, then: [
				{ text: '{riolu} se ha sentado a la mesa sin que nadie lo invite, entre un minero y un Gurdurr, y espera con las manos sobre los tablones.' },
				{ say: 'brock', text: '¡Mira quién se acuerda de mí! —Se agacha a su altura—. En Novarte eras así de pequeño y me mirabas las piedras como si fueran a morderte. Ahora te sientas a mi mesa como si fuera tuya. Así me gusta.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
			{ prompt: 'Brock te pone delante un plato hondo de estofado de Fayenza.', choice: [
				{ text: 'Comer con todo el gimnasio (cura al equipo).', then: [
					{ heal: 'Comes en la mesa larga, apretad{o|a|e} entre mineros. Tus Pokémon comen en el suelo, en cuencos de hojalata, con los de los entrenadores del gimnasio. Nadie habla de combates. Hablan de pan. Tu equipo está como nuevo.' },
				] },
				{ text: '«Después del combate.»', then: [
					{ say: 'brock', text: 'Eso decía yo a tu edad. Luego aprendí. —Tapa la olla—. Aquí te espera. Cuando quieras, bajas y comes.' },
				] },
			] },
			{ say: 'brock', text: 'El líder de siempre, Yakón, se ha ido de intercambio. Me dejó la mina, un ascensor y una nota: «No toques la palanca roja». —Pausa—. La he tocado. Dos veces. No pasa nada. Bueno, pasa algo. Pero poco.' },
			{ say: 'brock', text: 'Primero, mis dos entrenadores de arriba. Luego, yo. Y luego, otra vez a comer. Es un buen plan. Es el mejor plan que tengo.' },
		],
		b06_brock_olla: [
			{ text: 'La olla de Brock sigue al fuego. Siempre hay alguien comiendo en la mesa larga.' },
			{ prompt: '¿Comer algo?', choice: [
				{ text: 'Un plato (cura al equipo).', then: [{ heal: 'Brock te sirve sin preguntar. «Para eso está». Tu equipo come contigo. Están como nuevos.' }] },
				{ text: 'Ahora no.', then: [{ say: 'brock', text: 'Aquí se queda. Las ollas de Kanto no se enfrían nunca.' }] },
			] },
		],
		b06_brock_antes: [
			{ say: 'brock', text: 'Primero los de arriba. Horacio y Selene. Son duros como su mina. Y luego bajas, comes otra vez si quieres, y me ganas. O lo intentas. —Sonríe—. Las dos cosas me valen.' },
		],
		b06_brock_reto: [
			{ text: 'Brock se quita el delantal, lo dobla con cuidado y lo deja sobre la mesa. Al fondo de la galería, donde los raíles se acaban, hay un campo de combate marcado con tiza sobre la roca.' },
			{ say: 'brock', text: 'Esta es mi parte favorita. Bueno, la segunda. La primera es la de comer.' },
			{ say: 'brock', text: 'Te conozco desde Novarte, {jugador}. Llevabas un Riolu asustado y una mochila mal cerrada. Ahora llevas… —mira tu equipo— …muchas cosas. Pero la mochila sigue mal cerrada.' },
			{ say: 'brock', text: 'Mi Onix de entonces ya no es un Onix. Te va a gustar. Bueno, no. No te va a gustar nada. Pero lo vas a respetar.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, un plato de estofado antes.', then: [{ heal: 'Brock te sirve un último plato. «Para que pierdas con el estómago lleno. O ganes. Lo mismo me da». Tu equipo está como nuevo.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'brock', text: '¡Así me gusta! Valor. Y luego estofado.' }] },
			] },
			{ battle: 'brock_tes',
				onWin: [
					{ cutscene: { bg: { type: 'cave', crystals: '#c4743a' }, start: 'light', frames: [
						{ actors: [{ mon: 'steelix', key: 'steelix', at: 0.68, size: 'l', enter: 'none' }], cam: 'still', fx: 'quake', text: 'El Mega-Steelix de Brock aguanta de pie en mitad de la galería, enorme, con el cuerpo de acero cubierto de cristales de roca. Le cuesta respirar. Las vigas tiemblan con cada respiración.' },
						{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left' }], on: 'rio', fx: ['glow', 'ripple'], cam: 'push', text: '{riolu} no ataca. Da un paso al frente, abre las manos, y el aura se le extiende por el suelo de roca como agua azul, hasta tocar al Steelix.' },
						{ cond: LUC, actors: [{ key: 'steelix', do: 'bow' }], on: 'steelix', fx: 'sparkle', text: 'El Steelix baja la cabeza. Despacio, con un ruido de mina vieja, hasta dejarla en el suelo delante de {riolu}. Los cristales se le apagan uno a uno y vuelve a su forma de siempre.' },
						{ cond: '!' + LUC, actors: [{ key: 'steelix', do: 'bow' }], on: 'steelix', fx: 'sparkle', text: 'El Steelix baja la cabeza, despacio, con un ruido de mina vieja. Los cristales se le apagan uno a uno y vuelve a su forma de siempre. Se ha rendido. A gusto.' },
						{ actors: [{ id: 'brock', at: 'left', enter: 'left', emote: 'heart' }], cam: 'pull', text: 'Brock se acerca y le pone la mano en el morro de acero. Se queda así un rato. No dice nada. Brock, callado: no lo habías visto nunca.' },
					] } },
					{ if: LUC, then: [
						{ say: 'brock', text: '…Diez años. Diez años sin agacharse ante nadie. Ni ante mí. —Mira a {riolu}—. Y llega este. Sin un golpe. Con las manos abiertas.' },
						{ say: 'brock', text: 'En Novarte me mirabas las piedras con miedo. Ahora las piedras te miran a ti. —Le revuelve las orejas, con cuidado, como a un hermano pequeño—. Mis hermanos no crecieron tan bien. No se lo digas.' },
						{ happy: { who: 'riolu', n: 15 } },
					], else: [
						{ say: 'brock', text: '…Diez años sin agacharse ante nadie. Ni ante mí. —Se ríe, bajito—. Y hoy se agacha. Me alegro de que hayas sido tú.' },
					] },
					{ say: 'brock', text: 'Toma. La **Medalla Temblor**. No es la de Yakón, es la de los líderes de intercambio: se llama así porque los de intercambio movemos un poco el suelo de cada sitio al que vamos. Eso dicen. Yo creo que es por la palanca roja.' },
					{ badge: 'medalla_temblor' },
					{ cap: 66 },
					{ set: { 'flag.b06_brock_vencido': true } },
					{ say: 'brock', text: 'Y esto, de regalo. **MT Cuerpo Pesado**. Cuanto más pesas que el otro, más daño. Mi Steelix lo hace sin querer cuando se da la vuelta en la cama. Imagínate queriendo.' },
					{ give: 'b06_mt_cuerpo_pesado' },
					{ heal: 'Los mineros curan a tu equipo con agua de la fuente de la mina y un trapo limpio. Brock vuelve a ponerse el delantal.' },
					{ intel: { npc: 'brock', text: 'Líder de intercambio de Fayenza: te dio la Medalla Temblor y la MT Cuerpo Pesado. Su Steelix megaevoluciona con la Steelixita. Cocina para todo el gimnasio antes de cada combate.' } },
					{ diary: 'Hoy mi entrenador{|a|e} ha ganado a Brock en su mina. ¡Su Steelix se hace más grande todavía y le salen cristales! Al final se agachó delante de nosotros, y Brock se quedó callado un rato. Nunca se queda callado. Luego nos dio estofado. Y una medalla. En ese orden no: primero la medalla. Pero el estofado lo recuerdo mejor.', cond: 'flag.b01_diario' },
					{ call: 'b06_handsome_aviso' },
				] },
		],
		b06_brock_fay_despues: [
			{ say: 'brock', text: '¡Siéntate, siéntate! Hoy hay estofado con pan de Chamota. Me lo trajo un chef ambulante que pasó por aquí. Dice que es «el pan de una noche muy rara». Está buenísimo. La noche no sé.', cond: 'flag.b06_shoku_celia' },
			{ say: 'brock', text: 'Aquí sigo, entre la mina y la olla. Si pasas por Fayenza, baja a comer. Es una orden. De líder.', cond: '!flag.b06_shoku_celia' },
			{ if: 'flag.b06_t4_hecho', then: [
				{ say: 'brock', text: 'Me han contado lo de los Almacenes. —Deja el cucharón—. Ese señor que sacaron del frío… dile que aquí siempre hay un plato caliente. A esa gente se le olvida comer. Se les nota en las manos.' },
			] },
			{ prompt: '¿Comer algo?', choice: [
				{ text: 'Un plato (cura al equipo).', then: [{ heal: 'Comes con Brock en la mesa larga. Tus Pokémon, con los suyos. Están como nuevos.' }] },
				{ text: 'Ahora no.', then: [{ say: 'brock', text: 'La olla no se va a ningún sitio.' }] },
			] },
		],

		// =================== HANDSOME: EL AVISO ===================
		b06_handsome_aviso: [
			{ text: 'Cuando subes en el ascensor de reja, alguien te espera arriba, en la boca de la mina. Un hombre con gabardina, sombrero de pescador y un bigote que no termina de quedarse en su sitio.' },
			{ say: 'handsome', as: 'Pescador', text: 'Psst. Buenos días. Soy un pescador. De Fayenza. De toda la vida. Pesco… peces.' },
			{ say: 'handsome', text: '…Soy Handsome. —Se quita el sombrero; el bigote se queda pegado dentro—. Handsome no sabe pescar. Pero sabe esperar. Y ha esperado a que ganaras para no distraerte.' },
			{ say: 'handsome', text: 'Las naves del sur. Los **Almacenes Frigoríficos**. Llevan seis meses sin comprar ni una caja de pescado y gastan la electricidad de media ciudad. Por la noche entran camiones sin matrícula con un dibujo en la puerta. Un ocho tumbado.' },
			{ say: 'handsome', text: 'Y en los papeles de la obra del puente pone «Arco II». La obra del puente se hizo de noche y sin obreros. Lo que se hizo de verdad fue traer algo muy grande hasta esas naves. Por eso tuvieron el puente levantado tanto tiempo.' },
			{ say: 'handsome', text: 'Handsome tiene orden para entrar. Handsome tiene un testigo que reconoce las piezas. —Mira hacia el sur—. Y Handsome no quiere entrar sin ti. Ven cuando estés list{o|a|e}. Te espero en la puerta.' },
			{ quest: 'b06_m4', stage: 'almacen' },
		],

		// =================== ALMACENES: ENTRADA ===================
		b06_almacen_entrada: [
			{ set: { 'flag.b06_almacen': true } },
			{ text: 'Handsome abre la puerta lateral con una tarjeta que no es suya. Dentro, el frío te da en la cara como un portazo. El vestíbulo es enorme y blanco, con cajas de «pescado congelado» hasta el techo y el suelo brillante de escarcha.' },
			{ text: 'Detrás de Handsome entra un hombre delgado, con el pelo canoso revuelto y un abrigo prestado dos tallas grande. Lleva las manos juntas delante, como si todavía llevara esposas. No las lleva. Es **Calder Wynn**.' },
			{ say: 'calder', text: 'Buenas tardes, {jugador}. —Su voz, suave como siempre. Mira las cajas, el techo, las tuberías—. El inspector me ha traído para mirar piezas. Es lo único que todavía sé hacer bien. Mirar.' },
			{ say: 'handsome', text: 'El doctor Wynn colabora. Handsome lo vigila. Los dos tenemos frío. —Se sube el cuello de la gabardina—. Doctor, ¿le suena algo?' },
			{ text: 'Calder se acerca a una de las cajas abiertas. Dentro no hay pescado. Hay un cilindro de metal del tamaño de un niño, con aletas de refrigeración y una placa remachada.' },
			{ say: 'calder', text: 'Condensadores. —Pasa los dedos por la placa sin tocarla—. Los mismos del Altar. De Poni. «Clase 40 C». Siete. Los fabricaron para guardar algo que no cabe en ninguna otra parte. Allí era luz.' },
			{ set: { 'flag.b06_magda_condensadores': true } },
			{ if: 'flag.b05_magda_correo', then: [
				{ say: 'rotom', text: '¡Bzzt! ¡Siete condensadores de **40 C**! ¡Como en el correo de Magda! —Lo dice en voz alta, muy alta, y el eco lo repite por todo el vestíbulo—. «Para arrancar un nodo no hace falta tanto. Para *guardar* algo, sí».' },
				{ say: 'handsome', text: '¿Magda? ¿La de Kanto? —Handsome apunta en una libreta con un lápiz que se le congela en la mano—. Handsome quiere una copia de ese correo.' },
				{ say: 'rotom', text: '¡Ella siempre tiene copia! Lo pone al final.' },
			] },
			{ if: 'flag.b05_luz_necrozma', then: [
				{ say: 'calder', text: 'En el Altar se fue entero. La luz, digo. Por el agujero, de golpe, de vuelta a su dueño. —Mira el condensador—. Así que esto está vacío. Y si está vacío, tienen prisa por llenarlo. Las prisas, en Lemnis, salen caras.' },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ say: 'calder', text: 'En el Altar la luz se la quedó Æther. Gladio no la va a soltar. —Una sonrisa muy pequeña—. Así que esto está vacío. Y quieren llenarlo con otra cosa.' },
			] },
			{ if: 'flag.b05_luz_leilani', then: [
				{ text: 'Calder no mira a nadie mientras habla. Ni a ti, ni a Handsome. Mira el condensador como quien mira por una ventana.' },
				{ say: 'calder', text: 'Este está vacío. Lo que había en el del Altar lo gastaron en abrir una puerta un minuto. —Pausa—. Fue un buen minuto. Yo no lo habría gastado así. Por eso no me tocaba decidir.' },
			] },
			{ if: 'flag.b05_calder_verdad', then: [
				{ say: 'calder', text: 'Antes de que se me olvide. —Saca un sobre del bolsillo del abrigo, doblado y algo húmedo—. La kahuna Hela me pidió que se la diera en mano. Dijo: «Si te la quitan, te tiro al mar». No me la han quitado.' },
				{ give: 'b06_cartahela' },
				{ read: 'b06_cartahela' },
				{ say: 'calder', text: 'Malia hacía piezas como estas. —Señala el condensador—. Mejores. Los suyos no guardaban nada: abrían. Es la diferencia entre una caja y una puerta.' },
			] },
			{ say: 'handsome', text: 'Bien. Handsome se queda aquí, en el vestíbulo, con el doctor. Alguien tiene que vigilar la puerta y alguien tiene que vigilar al doctor. Handsome hace las dos cosas.' },
			{ say: 'handsome', text: 'Las **cámaras** están detrás de esa puerta acolchada. Y al fondo, un **laboratorio**. —Baja la voz—. Hay más gente aquí dentro. Una de ellas es amiga tuya. Huele a hierbas.' },
			{ quest: 'b06_t_kaori', stage: 'almacen' },
			{ if: SIGUE, then: [
				{ say: 'handsome', text: 'Y en la lista de personal de la nave hay un nombre que no es de personal. Pone «Sujeto». Pone «B. Lacroix». —Te mira—. Handsome cree que lo conoces.' },
				{ quest: 'b06_t_bastien', stage: 'almacen' },
			] },
			{ intel: { npc: 'calder', text: 'Testigo de la Policía Internacional en los Almacenes Frigoríficos de Fayenza: reconoció los siete condensadores de clase 40 C, iguales a los del Altar de Poni.' } },
		],
		b06_handsome_almacen: [
			{ say: 'handsome', text: 'Handsome vigila. El doctor mira cajas. —Calder levanta la mano para saludar sin apartar la vista de un condensador—. Tú, adelante. Si necesitas curar a tu equipo, Handsome lleva pociones en todos los bolsillos. Hasta en los de dentro.' },
			{ prompt: '¿Curar al equipo?', choice: [
				{ text: 'Sí, gracias.', then: [{ heal: 'Handsome saca pociones de seis bolsillos distintos. Una está congelada. Tu equipo está como nuevo.' }] },
				{ text: 'Estoy bien.', then: [{ say: 'handsome', text: 'Handsome confía en ti. Y en sus bolsillos.' }] },
			] },
			{ if: 'flag.b06_xero_vencido && !flag.b06_olmedo', then: [
				{ say: 'calder', text: 'He oído un camión salir por el muelle de carga. Muy pesado. Llevaba algo redondo. —Pausa—. Del tamaño de una puerta.' },
			] },
		],
		b06_handsome_final: [
			{ say: 'handsome', text: 'Handsome ha precintado todo. Las cajas, los condensadores y la taza de tren. La taza, por cariño. —Se sube el cuello—. El doctor Wynn ha pedido quedarse a catalogar. Dice que es lo que mejor sabe hacer. Handsome le ha dejado.' },
			{ say: 'calder', text: 'Siete condensadores, cuarenta y dos placas, un ascensor de carga y una taza. —Sin levantar la vista—. Lo apunto todo. Alguien tiene que hacer las cuentas. Esta vez, bien.' },
		],

		// =================== VESTÍBULO: PIMPINELA Y ZYRA ===================
		b06_pimpinela_zyra: [
			{ set: { 'flag.b06_pimpinela_zyra': true } },
			{ text: 'Junto a una fila de servidores con escarcha en las rejillas, dos mujeres discuten con un recluta Plasma que intenta tapar con el cuerpo un armario de discos. Una lleva una bata y una galleta en la mano. La otra, unas gafas redondas tan empañadas que no ve nada.' },
			{ say: 'pimpinela', text: '¡{jugador}! ¡Qué alegría! ¿Galleta? —Te da una sin esperar respuesta—. Pimpinela, del Centro de Investigaciones Dimensionales de Kantai. Te acuerdas de mí, ¿verdad? Los puntitos en la pantalla.' },
			{ say: 'zyra', text: '¡Y yo! ¡Zyra! ¡De Æther! —Se limpia las gafas en la bata y se las vuelve a empañar al ponérselas—. Hemos venido juntas. Bueno, en el mismo barco. Ella traía galletas y yo traía una orden judicial.' },
			{ say: 'pimpinela', text: 'Nueve años de lecturas de ultraumbrales. Las del CID y las de Æther. Las vendió Fabio a Lemnis. —Señala el armario—. Están ahí. Y son nuestras. Bueno, son del cielo. Pero las medimos nosotras.' },
			{ if: 'flag.b05_luz_aether', then: [
				{ say: 'zyra', text: 'Y hay más. —Baja la voz, cosa que no le sale nada bien—. Hace dos semanas, alguien intentó llevarse la cápsula del Altar. De noche. Con un barco sin luces. El presidente Gladio estaba despierto. Siempre está despierto.' },
				{ say: 'zyra', text: 'No la soltó. Se sentó encima. Literalmente. Encima de la cápsula, con la capucha puesta, toda la noche. Los del barco se fueron. ¡Es tan valiente! No se lo diga.' },
			] },
			{ if: 'flag.b05_luz_leilani', then: [
				{ say: 'pimpinela', text: 'Y traigo esto. —Saca de la bata una tira de papel continuo, enrollada—. Las lecturas de la baliza de la bahía. Tres cortas y una larga. Todas las noches a la misma hora. Desde aquel minuto.' },
				{ say: 'pimpinela', text: 'Lani no sabe que las traigo. Quería enseñárselas a Calder. —Mira hacia la puerta, donde Calder cataloga en silencio—. No me ha mirado. Ni una vez. Lo entiendo. Yo tampoco me miraría.' },
			] },
			{ if: 'flag.b05_luz_necrozma', then: [
				{ say: 'pimpinela', text: 'Desde que el cielo volvió de golpe, los puntitos se han apagado todos. Todos menos uno, muy al norte. Muy lejos. Como una estrella nueva que se mueve. —Se come la galleta—. Los astrónomos de Teselia también la vieron. Dicen que era muy bonita.' },
			] },
			{ say: 'zyra', text: 'El recluta no nos deja pasar. Le hemos enseñado la orden. Dice que no sabe leer letra de juez. —El recluta asiente, muerto de frío—. Nosotras esperamos aquí. Somos muy buenas esperando. Usted siga, que tiene cara de no esperar.' },
			{ intel: { npc: 'pimpinela', text: 'En los Almacenes Frigoríficos de Fayenza, con Zyra: han venido a recuperar nueve años de lecturas de ultraumbrales del CID y de Æther que Fabio vendió a Lemnis.' } },
		],
		b06_pimpinela_zyra_despues: [
			{ if: 'flag.b06_t4_hecho', then: [
				{ say: 'zyra', text: '¡Ya tenemos los discos! ¡Todos! Handsome nos los ha dado en una caja de «pescado congelado». —Se ríe—. Es la caja más bonita que he visto nunca.' },
				{ say: 'pimpinela', text: 'Galleta de la victoria. —Te da otra—. Cuida de Lani. No se lo digas.' },
			], else: [
				{ say: 'pimpinela', text: 'Seguimos esperando. El recluta y yo ya somos amigos. Le he dado tres galletas. Me ha dicho su nombre. No lo voy a decir, que es secreto.' },
				{ say: 'zyra', text: 'Se me han congelado las gafas. Por dentro. ¡No sabía que se podía!' },
			] },
		],

		// =================== VESTÍBULO: FABIO ===================
		b06_fabio_almacen: [
			{ set: { 'flag.b06_fabio_visto': true } },
			{ text: 'Un hombre con un mono azul de climatización se ajusta una válvula con mucha ceremonia. Debajo del mono asoma el cuello de una bata blanca, almidonada. En la espalda del mono pone «CLIMA TESELIA S.L.». Debajo, cosido a mano: «Consultor».' },
			{ say: 'fabio', text: '¡Tú! —Se gira tan rápido que casi se cae—. ¡No! No soy yo. Soy un técnico de climatización. Externo. Con factura.' },
			{ say: 'fabio', text: '…Bueno, sí, soy yo. Fabio. Jefe de la Rama Científica de Æther. Bueno, «de vacaciones indefinidas». En las vacaciones uno puede trabajar de lo que quiera. Yo quiero climatizar.' },
			{ say: 'fabio', text: 'Me contrataron para mantener el frío. Dicen que lo que guardan aquí «se cansa con el calor». No me dijeron qué. Yo no pregunto. ¡Yo cobro! Que es una forma de preguntar, pero al revés.' },
			{ if: 'flag.b06_pimpinela_zyra', then: [
				{ say: 'fabio', text: '¿Están ahí Zyra y la de las galletas? —Se esconde detrás de la válvula—. No les digas que estoy aquí. Me deben una disculpa. O yo a ellas. Algo se debe, seguro.' },
			] },
			{ say: 'fabio', text: 'Y si quieres revancha, ¡la tendrás! Sin Megapiedra, que me la requisaron con factura. ¡Pero con todo mi talento, que eso no se requisa!' },
		],
		b06_fabio_reto: [
			{ say: 'fabio', text: '¿Revancha? ¡Revancha! La ciencia es repetición. Y esta vez tengo los Pokémon bien climatizados.' },
			{ prompt: '¿Combatir contra Fabio?', choice: [
				{ text: 'Combatir (curar antes).', then: [
					{ heal: 'Fabio te da una caja de pociones «del material de Æther». Las tiene con su nombre escrito en cada una. Tu equipo está como nuevo.' },
					{ battle: 'fabio_2', lose: 'continue',
						onWin: [
							{ say: 'fabio', text: 'Dos de dos. —Se sienta en una caja de «pescado congelado»—. Te diré una cosa gratis, que no lo hago nunca: el frío de aquí no es para pescado. Es para unos caramelos. Y para un señor. El señor está al fondo. No me mires así, yo solo climatizo.' },
							{ money: 2000 },
						],
						onLose: [
							{ say: 'fabio', text: '¡Ja! ¡Ciencia! —Se le escapa una sonrisa genuina—. Ve a curarte. Yo me quedo climatizando mi victoria.' },
							{ heal: true },
						] },
				] },
				{ text: 'Ahora no.', then: [{ say: 'fabio', text: 'Tú te lo pierdes. Bueno, yo me lo pierdo. Alguien se lo pierde.' }] },
			] },
		],
		b06_fabio_despues: [
			{ if: 'flag.b06_t4_hecho', then: [
				{ say: 'fabio', text: 'Handsome me ha tomado declaración. Tres horas. He hablado muy bien. —Se arregla el cuello de la bata—. Me ha dicho que soy «un testigo con mucha autoestima». Lo voy a poner en el currículum.' },
			], else: [
				{ say: 'fabio', text: 'Sigo climatizando. Es un trabajo muy noble. Nadie lo valora. Como la ciencia.' },
			] },
		],

		// =================== CÁMARAS: PUZLES DE HIELO ===================
		b06_hielo_1: [
			{ if: '!flag.b06_hielo_1_visto', then: [
				{ set: { 'flag.b06_hielo_1_visto': true } },
				{ text: 'El pasillo de la cámara 3 es una pista de hielo de pared a pared, con columnas de escarcha aquí y allá. Un recluta Plasma pasa a tu lado sentado, resbalando, y se estampa contra la pared del fondo. «¡El tobogán!», grita. Nadie le contesta.' },
				{ if: LUC, then: [{ text: '{riolu} pone un pie en el hielo, lo retira, y te mira. Luego mira las columnas. Las cuenta. Tiene un plan. Tú también deberías.' }] },
			] },
			{ puzzle: { id: 'b06_hielo_camara3', title: 'El pasillo de la cámara 3', theme: 'hielo',
				hint: 'En el hielo resbalas hasta chocar. Usa las columnas de escarcha para frenar.',
				grid: [
					'########',
					'#P.I.II#',
					'#I*I.II#',
					'#*IIII*#',
					'#IIII.*#',
					'#IIIIII#',
					'#I.II*G#',
					'########',
				] },
				onSolve: [
					{ set: { 'flag.b06_hielo_1': true } },
					{ text: 'Llegas al fondo del pasillo de un último resbalón, justo delante de una fila de puertas numeradas. La 2 tiene la luz encendida. La 4 tiene una cerradura de runas. Al fondo, otro pasillo de hielo y una compuerta con un letrero: **LABORATORIO**.' },
				],
				onQuit: ['Vuelves a la puerta acolchada patinando de culo. El recluta del tobogán te aplaude.'] },
		],
		b06_hielo_1_despues: [
			{ text: 'El pasillo de la cámara 3, con sus columnas de escarcha. Ya sabes por dónde se resbala. El recluta del tobogán sigue a lo suyo.' },
		],
		b06_hielo_2: [
			{ if: '!flag.b06_hielo_2_visto', then: [
				{ set: { 'flag.b06_hielo_2_visto': true } },
				{ text: 'El último pasillo antes del laboratorio: hielo, unas cuantas columnas de escarcha y, en medio, una roca de hielo viejo suelta. Al fondo, la compuerta del laboratorio, cerrada. Delante, en el suelo, una placa de presión con un letrero: «Carga mínima: 1 bloque».' },
				{ say: 'rotom', text: '¡Bzzt! Una placa. Hay que ponerle peso encima para que abra. ¿La roca? ¡La roca! Pero sin que se escurra hasta la otra punta. Ay, qué nervios.' },
			] },
			{ puzzle: { id: 'b06_hielo_laboratorio', title: 'El pasillo del laboratorio', theme: 'hielo',
				hint: 'Empuja la roca hasta la placa. En el hielo, la roca también resbala. La compuerta abre con peso encima.',
				grid: [
					'########',
					'#P.I.II#',
					'#I...IS#',
					'#*II..I#',
					'#*RIIII#',
					'#II**II#',
					'#I.IIID#',
					'######G#',
				] },
				onSolve: [
					{ set: { 'flag.b06_hielo_2': true } },
					{ text: 'La roca se para encima de la placa con un crujido. Algo hace «clac» dentro de la pared y la compuerta del laboratorio se abre hacia arriba, despacio, soltando escarcha.' },
					{ text: 'Al otro lado, una luz azul y un zumbido grave. Y una voz que conoces, que cuenta tornillos.' },
					{ if: LUC, then: [{ text: '{riolu} se pone delante de ti. Las orejas tiesas. No mira la voz. Mira más al fondo, a una puerta pequeña que no se ve desde aquí.' }] },
				],
				onQuit: ['La roca se queda donde estaba. La compuerta también. Ya volverás.'] },
		],

		// =================== CÁMARAS: KAORI ===================
		b06_kaori_frio: [
			{ set: { 'flag.b06_kaori_frio': true } },
			{ text: 'La cámara 2 está llena de estanterías metálicas, y en cada estantería, cajas de cartón con la misma etiqueta: «**Complemento vitamínico · Lote 05**». En medio, sentada en una caja con las piernas cruzadas, una bufanda enorme y las vendas del brazo asomando del abrigo, está **Kaori**. Cuenta frascos.' },
			{ say: 'kaori', text: 'Cuatrocientos doce. —No levanta la vista—. Has venido. Bien. No toques nada. Ni las cajas. Ni el frío.' },
			{ say: 'kaori', text: 'Lote 05. Caramelos Lazo. La misma porquería de Æther, con otra etiqueta. —Abre un frasco. Los caramelos brillan, azules, pero más apagados que los que viste en Alola—. Aquí los guardan en frío. ¿Sabes por qué?' },
			{ prompt: 'Kaori espera una respuesta. De verdad.', choice: [
				{ text: '«Porque con el calor se estropean.»', then: [
					{ af: { kaori: 1 } },
					{ say: 'kaori', text: 'Casi. No se estropean. Se cansan. —Lo dice muy despacio—. Lo pone en la hoja de control del lote. «Mantener bajo cero. Con calor, el producto se cansa». Un caramelo que se cansa.' },
				] },
				{ text: '«Porque están vivos.»', then: [
					{ af: { kaori: 3 } },
					{ say: 'kaori', text: '—Por primera vez, te mira—. No. Pero lo que llevan dentro lo estuvo. Muy bien. Eso es pensar.' },
					{ say: 'kaori', text: 'La hoja de control del lote dice «con calor, el producto se cansa». Los caramelos no se cansan. Lo que se cansa es la energía que les meten. Es de alguien. Y ese alguien, en frío, aguanta más.' },
				] },
				{ text: '«¿Para que duren más en la tienda?»', then: [
					{ af: { kaori: -1 } },
					{ say: 'kaori', text: 'Esto no se vende en ninguna tienda. Se da. Como las vitaminas. Uno al día. —Cierra el frasco—. Piensa antes de contestar. No hay prisa. Aquí no se pudre nada.' },
				] },
			] },
			{ if: 'flag.b05_kaori_muestra', then: [
				{ say: 'kaori', text: 'Ahora lo bueno. —Saca de la bufanda un vial con un líquido transparente—. La muestra de Æther. La de la luz que se quedaron. Con ella, el método de sacar el veneno funciona sin romper nada. Y con el frío de este lote, lo veo trabajar despacio.' },
				{ text: 'Echa una gota del vial sobre un caramelo. El azul se apaga. Luego, muy en el fondo, el caramelo se vuelve transparente, como hielo limpio. Ya no brilla. Ya no es nada.' },
				{ say: 'kaori', text: 'Oh. —La voz se le rompe un poco—. Esto es… precioso. Lo deshace. Del todo. Ya no apaga a nadie.' },
				{ say: 'kaori', text: 'No devuelve lo que se llevó. Eso todavía no. Pero ya no se lleva más. Es el paso más grande que he dado nunca. Y lo he dado sentada en una caja, con frío. Muy propio.' },
			], else: [
				{ say: 'kaori', text: 'Con el frío lo veo trabajar despacio. Mi antídoto. —Echa una gota sobre un caramelo. El azul se apaga un poco. Solo un poco—. Lo frena. No lo para. Me falta algo. Algo de la luz de Alola, creo. No lo tengo.' },
				{ say: 'kaori', text: 'Un paso pequeño. Los pasos pequeños son los que más se olvidan. Yo no los olvido. Los apunto.' },
			] },
			{ if: 'af.kaori >= 45', then: [
				{ set: { 'flag.b06_kaori_momento': true } },
				{ text: 'Kaori cierra el cuaderno. Se le han puesto los dedos morados de tanto escribir con frío. Intenta frotárselos. No le sirve.' },
				{ say: 'kaori', text: 'Dame las manos.' },
				{ text: 'No es una pregunta. Te toma las manos entre las suyas, heladas, y las aprieta. No te mira. Mira un punto de la estantería.' },
				{ say: 'kaori', text: 'Por eficiencia térmica. Dos cuerpos pierden menos calor juntos que separados. Es física. —Pausa larga—. No lo digas en voz alta. Que suena a otra cosa.' },
				{ text: 'Se quedan así un rato, en la cámara 2, entre cuatrocientos doce frascos de caramelos que se cansan. Fuera, los compresores zumban. Dentro, no se oye nada más.' },
				{ say: 'kaori', text: 'Ya. —Te suelta. Se mete las manos en las mangas—. Ya tengo los dedos. Gracias. Por la física.' },
				{ af: { kaori: 3 } },
			] },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca a la estantería del lote 05 y pone la palma delante de una caja, sin tocarla. El aura le tiembla, inquieta. Retira la mano y se la frota contra el pelo del pecho, como quien se quita algo pegajoso.' },
				{ say: 'kaori', text: 'También lo nota. Lo apunto. —Lo apunta—. «El aura del Lucario rechaza el lote 05». Eso, en un informe, vale más que mi firma.' },
			] },
			{ quest: 'b06_t_kaori', stage: 'hecha', done: true },
			{ intel: { npc: 'kaori', text: 'En la cámara 2 de los Almacenes Frigoríficos: el lote 05 de Caramelos Lazo se guarda bajo cero porque «con calor, el producto se cansa». Su antídoto deshace el caramelo con la muestra de Æther; sin ella, solo lo frena.' } },
		],
		b06_kaori_despues: [
			{ if: 'flag.b06_t4_hecho', then: [
				{ say: 'kaori', text: 'Handsome me deja llevarme diez frascos. Para estudiar. —Los mete en la bufanda—. El resto los van a quemar. Les he pedido que lo hagan al aire libre. Por si acaso.' },
			], else: [
				{ say: 'kaori', text: 'Cuatrocientos trece. Había uno detrás. —Sin levantar la vista—. Sigue con lo tuyo. Yo sigo con lo mío. Aquí no se pudre nada.' },
			] },
		],

		// =================== CÁMARAS: BASTIEN (rama `sigue`) ===================
		b06_bastien_cabina: [
			{ if: '!flag.b06_bastien_visto', then: [
				{ set: { 'flag.b06_bastien_visto': true } },
				{ text: 'La puerta de la cámara 4 tiene una ventanita redonda empañada. Al limpiarla con la manga ves una sala blanca con dos sillones, uno para el entrenador y otro para el Pokémon, y cables colgando del techo. En el de la izquierda, envuelto en una manta térmica, alguien tose. En el de la derecha, un Greninja de pie, con los brazos cruzados, mira la puerta.' },
				{ text: 'En la puerta, una placa: «**Unidad de Estudios de Vínculo · emplazamiento 05 · Sujeto: B. Lacroix**». Y una cerradura de runas.' },
				{ say: 'rotom', text: '¡Bzzt! ¡Es Bastien! ¡Es la tos de Bastien! ¡Tose igual que cuando pierde! —Pausa—. ¿Abrimos? ¡Abrimos!' },
			] },
			{ minigame: { type: 'lock', id: 'b06_cabina_vinculo', title: 'La cámara 4', theme: 'caja', level: 3,
				hint: 'Las runas se encienden en orden. Repite la secuencia. Bastien te mira desde dentro, sin respirar.',
				guaranteed: ['b06_informevinculo'],
				loot: [{ id: 'hyperpotion', w: 4 }, { id: 'fullheal', w: 3 }, { id: 'maxether', w: 2 }, { id: 'expertbelt', w: 1, rare: true }],
				picks: 1, lootTitle: 'En la mesa de la cámara 4' },
				onWin: [{ call: 'b06_bastien_sujeto' }],
				onLose: [{ text: 'La cerradura pita y se bloquea un momento. Dentro, Greninja da un golpe con la palma contra el cristal. No es enfado. Es «otra vez».' }],
				onQuit: [{ text: 'Te apartas de la puerta. Bastien levanta la mano desde el sillón, despacio. «Aquí sigo».' }] },
		],
		b06_bastien_sujeto: [
			{ set: { 'flag.b06_bastien_sujeto': true } },
			{ text: 'La puerta se abre con un suspiro de aire frío. Dentro hace más frío que fuera. Greninja se aparta para dejarte pasar. Bastien se quita la manta de la cabeza: tiene ojeras, los labios morados y la chaqueta de Lemnis abrochada hasta arriba. En la solapa, por dentro, brilla algo pequeño de hojalata.' },
			{ if: LEAL, then: [
				{ say: 'bastien', text: '¡{jugador}! —Se levanta demasiado rápido y se marea—. Lo sabía. Lo apunté. «Viene». Y has venido.' },
				{ say: 'bastien', text: 'Mira. —Toma una carpeta de la mesa y te la pone en las manos—. El informe de los estudios. Me lo dejan leer porque soy el sujeto. Léelo tú. Yo ya me lo sé y me da frío.' },
			], else: [
				{ say: 'bastien', text: 'Tú. —Se le tensa la mandíbula—. Claro. Siempre llegas cuando ya me he congelado. Nunca antes.' },
				{ text: 'Agarra una carpeta de la mesa y te la tira. La atrapas contra el pecho.' },
				{ say: 'bastien', text: 'Toma. Léelo. Total, a ti te sale bien leer lo que me pasa a mí. —Se sienta. Cuenta hasta algo—. …No. Perdona. Léelo. Por favor. Necesito que alguien que no sea de Lemnis lo lea en voz alta.' },
			] },
			{ read: 'b06_informevinculo' },
			{ say: 'bastien', text: '«Transferencia parcial». —Se ríe, raro—. Me han estado sacando algo. A Greninja y a mí. De en medio. De lo que hay entre los dos. Lo meten en esas cajas de la otra cámara. Las de caramelos.' },
			{ text: 'Greninja le pone una mano palmeada en el hombro. Lo tiene muy flaco. Los dos.' },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca a Greninja y le pone la palma en el pecho. El aura se le enciende, azul, y pasa a Greninja como agua que se cuela por una grieta. Greninja cierra los ojos. Se le ponen derechas las aletas de la cabeza.' },
				{ say: 'bastien', text: '…Eso. Eso es lo que nos quitaban. Lo he notado volver. —Se le humedecen los ojos y se los frota con la manta—. Es el frío. Que conste.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
			{ if: 'flag.b02_noa_trigal', then: [
				{ say: 'bastien', text: 'La insignia la llevo. —Se toca la solapa—. Noa no me contesta. Hace dos meses. Pero la llevo.' },
			] },
			{ say: 'bastien', text: 'El contrato tiene una cláusula nueva. La 14.6. «Extensión voluntaria». Si firmo, me quedo de sujeto «hasta la fase final». Si no firmo, me echan. Con demanda. Y sin Greninja, porque Greninja «es material del programa».' },
			{ say: 'bastien', text: 'Y yo… —Te mira—. ¿Tú qué harías?' },
			{ prompt: 'Bastien espera. Greninja también.', choice: [
				{ text: '«Sal de aquí. Ahora. Greninja es tuyo y lo vamos a demostrar.»', then: [
					{ set: { 'flag.b06_bastien_sale': true } },
					{ if: LEAL, then: [
						{ say: 'bastien', text: 'Lo vamos a demostrar. —Lo repite despacio—. Tú y yo. Como en la cueva.' },
					], else: [
						{ say: 'bastien', text: '«Lo vamos a demostrar». En plural. —Aprieta la mandíbula. Luego, despacio, la suelta—. Bueno. Bueno. Por una vez, en plural.' },
					] },
					{ text: 'Bastien se quita la chaqueta de Lemnis, la dobla y la deja en el sillón de los cables. Se pone la manta térmica como una capa. Greninja toma el informe y se lo mete debajo del brazo.' },
					{ say: 'bastien', text: 'Me voy con Handsome. De testigo. Si me demandan, que me demanden con testigos. —Casi sonríe—. Página nueva de la libreta: «Cosas que hago en plural».' },
				] },
				{ text: '«Firma. Quédate dentro y cuéntanos cómo es la fase final.»', then: [
					{ set: { 'flag.b06_bastien_firma': true } },
					{ if: LEAL, then: [
						{ say: 'bastien', text: 'Desde dentro. Como Noa. —Lo piensa mucho rato—. Alguien tiene que estar en la fase final para contarla. Y para sacar a Greninja de ahí si hace falta.' },
						{ say: 'bastien', text: 'Firmo. Pero firmo con mi letra. Y cada noche te escribo lo que vea. Esa es mi cláusula. La catorce punto siete. La escribo yo.' },
					], else: [
						{ say: 'bastien', text: 'Claro. Quédate, Bastien. Mira, Bastien. —Se le escapa una risa fea. Luego otra, mejor—. …Tienes razón. Si me voy, no veo nada. Y quiero ver la cara del que firmó esto.' },
						{ say: 'bastien', text: 'Firmo. Con los ojos abiertos. Y te lo cuento. Aunque me cueste. Me cuesta.' },
					] },
					{ text: 'Firma la cláusula 14.6 con un bolígrafo que se le congela a mitad de la firma. Lo calienta con el aliento y termina. Greninja mira el papel como se mira algo que va a haber que romper algún día.' },
				] },
				{ text: '«Es tu decisión, Bastien. Tuya y de Greninja.»', then: [
					{ say: 'bastien', text: 'Mía y de Greninja. —Mira a Greninja. Greninja lo mira. Se entienden sin decir nada, como siempre—. Pues ya está decidido.' },
					{ if: LEAL, then: [
						{ set: { 'flag.b06_bastien_sale': true } },
						{ say: 'bastien', text: 'Nos vamos. Greninja ha dicho que sí. Bueno, no lo ha dicho. Pero lo ha dicho. Me voy con Handsome, de testigo.' },
					], else: [
						{ set: { 'flag.b06_bastien_firma': true } },
						{ say: 'bastien', text: 'Nos quedamos. Greninja quiere ver quién está detrás. Yo también. Firmo, con los ojos abiertos. Y esta vez, gracias por no decidir por mí. Lo digo mal. Pero lo digo.' },
					] },
				] },
			] },
			{ quest: 'b06_t_bastien', stage: 'hecha', done: true },
			{ if: 'flag.b06_bastien_sale', then: [
				{ intel: { npc: 'bastien', text: 'Era el «sujeto» de la Unidad de Estudios de Vínculo de los Almacenes Frigoríficos (emplazamiento 05). No firmó la cláusula 14.6: salió con Greninja y se fue con Handsome de testigo.' } },
			], else: [
				{ intel: { npc: 'bastien', text: 'Era el «sujeto» de la Unidad de Estudios de Vínculo de los Almacenes Frigoríficos (emplazamiento 05). Firmó la cláusula 14.6, «extensión voluntaria hasta la fase final», para seguir dentro y contarlo.' } },
			] },
		],
		b06_bastien_camara: [
			{ if: 'flag.b06_bastien_sale', then: [
				{ text: 'La cámara 4, vacía. En el sillón de los cables, la chaqueta de Lemnis, doblada. Encima, un pósit: «Devuelta. Sin usar. B. L.».' },
			], else: [
				{ text: 'La cámara 4. Bastien duerme en el sillón, envuelto en la manta térmica, con una libreta abierta encima del pecho. Greninja vela de pie. Te saluda con una mano palmeada, muy despacio, para no despertarlo.' },
			] },
		],
		b06_cabina_vacia: [
			{ text: 'La cámara 4 está cerrada. Por la ventanita redonda se ven dos sillones vacíos con cables colgando del techo. Un cartel: «Unidad de Estudios de Vínculo · emplazamiento 05 · Sin sujeto asignado».' },
			{ text: 'Debajo, a bolígrafo, alguien ha añadido: «(el sujeto rompió el contrato)». Y debajo, con otra letra: «(bien hecho)».', cond: 'flag.b05_bastien_rompe' },
		],

		// =================== EL LABORATORIO: XERO ===================
		b06_xero_combate: [
			{ if: 'flag.b06_xero_visto', then: [
				{ say: 'xero', text: '¡Otra vez tú! A otra hora. Esta no me la sabía. —Se cruje los dedos—. Mejor. Así no hay guion.' },
			], else: [
				{ set: { 'flag.b06_xero_visto': true } },
				{ text: 'El laboratorio frío es una sala alta, con monitores escarchados y cables gruesos subiendo por las paredes. En el centro, sobre un círculo pintado en el suelo, hay un **arco**: dos columnas de metal unidas por arriba, del tamaño de una casa, con los siete condensadores de Calder encajados en la base como dientes.' },
				{ text: 'Delante del arco, atornillando una placa con mucha concentración, está un hombre con bata manchada de aceite y unas gafas enormes.' },
				{ say: 'xero', text: '…cuarenta tornillos, cuarenta y uno… ¡Bwahaha! —Se gira—. Las cinco y diez. Llegas a las cinco y diez. Exactamente.' },
				{ say: 'xero', text: 'Me avisaron. «Llegará a las cinco y diez, por el pasillo del laboratorio, con su Lucario». Y aquí estás. A las cinco y diez. Por el pasillo. Con tu Lucario. —Ladea la cabeza—. ¿No te inquieta? A mí me inquietaría.', cond: LUC },
				{ say: 'xero', text: 'Me avisaron. «Llegará a las cinco y diez, por el pasillo del laboratorio». Y aquí estás. A las cinco y diez. —Ladea la cabeza—. ¿No te inquieta? A mí me inquietaría.', cond: '!' + LUC },
				{ say: 'xero', text: 'El Proyecto Arco II. Mi mejor trabajo. Bueno, el de un señor que tenemos en la nevera, pero los tornillos son míos. Y esta noche se va. A la torre. Y yo tengo que entretenerte hasta que se vaya.' },
				{ if: 'flag.b04_xero_matiere', then: [
					{ say: 'xero', text: 'Matière me escribe ahora todos los domingos. «Come». Una palabra. —Se le borra la sonrisa un segundo—. Si te gano, no se lo cuentes. Si pierdo, tampoco.' },
				] },
				{ if: LUC, then: [
					{ text: '{riolu} no mira a Xero. Mira la puerta pequeña del fondo, la que pone **CÁMARA 0**. Gruñe, muy bajo.' },
				] },
			] },
			{ text: 'Detrás de Xero, unas manos con guantes de goma levantan una lona sobre el arco. Alguien más está en la sala. Alguien que no tiene prisa.' },
			{ say: 'handsome', as: 'Handsome (radio)', text: '{jugador}, Handsome te oye por la radio. Handsome no puede entrar: hay un recluta sentado en la puerta y no se quiere mover. Handsome te manda pociones por el conducto de ventilación. Cuidado: están frías.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, tomar las pociones del conducto.', then: [{ heal: 'Por la rejilla del conducto caen cinco pociones atadas con un cordón, envueltas en un pañuelo con una «H» bordada. Están heladas. Funcionan igual. Tu equipo está como nuevo.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'xero', text: '¡Valiente! O mal calculado. Las dos cosas me gustan.' }] },
			] },
			{ battle: 'xero_1',
				onWin: [
					{ text: 'El Drapion de Xero se derrumba sobre el círculo del suelo con un ruido de tenazas. Xero lo devuelve a la Poké Ball y se queda mirándola. Luego mira el reloj de la pared.' },
					{ say: 'xero', text: 'Las cinco y veintiséis. —Suspira—. Dieciséis minutos. Me pidieron veinte. Me faltan cuatro. —Se quita las gafas—. Bueno. Pues ya no hace falta que te entretenga más. Mira.' },
					{ cap: 67 },
					{ set: { 'flag.b06_xero_vencido': true } },
					{ intel: { npc: 'xero', text: 'Contratista del Proyecto Arco II en los Almacenes Frigoríficos. Sabía a qué hora llegarías y por dónde: «me avisaron». Te entretuvo dieciséis minutos de los veinte que le pidieron.' } },
					{ call: 'b06_acromo_huida' },
				] },
		],

		// =================== ACROMO HUYE CON EL ARCO ===================
		b06_acromo_huida: [
			{ set: { 'flag.b06_acromo_huye': true } },
			{ cutscene: { bg: { type: 'lab', wall: '#2a3440', floor: '#4a5a6a' }, start: 'light', weather: 'fog', frames: [
				{ cam: 'pan-up', fx: 'quake', text: 'El techo del laboratorio se abre por la mitad. No es un techo: es una compuerta de carga. Entra el aire de la tarde, caliente, y el vaho del laboratorio sube en una columna blanca hacia el cielo.' },
				{ actors: [{ id: 'acromo', at: 'right', enter: 'fade' }], cam: 'push', text: 'Junto al arco, quitándose los guantes de goma dedo a dedo, hay un hombre alto, de pelo blanco con un mechón azul y unas gafas cuadradas que reflejan los monitores. Te mira con una curiosidad enorme. Como a un dato nuevo.' },
				{ say: 'acromo', actors: [{ key: 'acromo', do: 'nod' }], text: 'Así que tú eres el dato que se repite. El que siempre llega. —Sonríe, amable—. Me llamo Acromo. Investigo una cosa muy sencilla: hasta dónde llega un Pokémon cuando alguien lo quiere.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.3, enter: 'left', emote: 'anger' }], on: 'rio', fx: 'glow', text: '{riolu} da un paso hacia él con el aura encendida. Acromo no se aparta. Se inclina para mirarlo mejor, fascinado, como quien mira un experimento que ha salido mejor de lo previsto.' },
				{ say: 'acromo', cam: 'still', text: 'Un vínculo es una fuerza. Y las fuerzas se miden. —Señala el arco con la barbilla—. Esto las mide. Y luego las toma prestadas. Nadie lo había hecho con algo tan grande.' },
				{ actors: [{ key: 'acromo', remove: true, exit: 'up' }], cam: 'pan-up', fx: ['speedlines', 'shake'], text: 'Un rugido de motores. Unas cadenas bajan por la compuerta, enganchan el arco y lo levantan entero, despacio, hacia un helicóptero de carga sin luces. Acromo sube agarrado a una de las cadenas, saludando con la mano libre.' },
				{ cam: 'pull', fx: 'dark', text: 'El arco se pierde en el cielo de la tarde, hacia el norte. Hacia unas montañas donde, muy lejos, se ve la silueta de una torre. Luego, solo vaho. Y el círculo vacío en el suelo.' },
			] } },
			{ say: 'xero', text: '…Acromo. —Lo dice mirando el techo—. Es de los otros. De los de capucha gris. Lemnis le paga a él y él les dice a los de capucha lo que quieren oír: «el Lazo nos liberará». Ellos se lo creen. Él no se cree nada. Solo mide.' },
			{ say: 'xero', text: 'Yo tengo contrato hasta que el arco salga por esa compuerta. —Mira el reloj—. Ha salido. Así que ya no tengo contrato. —Se quita la bata manchada y la deja en una silla—. Y el señor de la cámara 0 tampoco tiene ya contrato. Pero ese nunca lo quiso.' },
			{ say: 'xero', text: 'Está ahí detrás. Lleva meses ahí. Le dejo café en la puerta. No se lo toma. —Se pone el abrigo—. Ábrela tú. Yo me voy a comer. Lo dice Matière.' },
			{ text: 'Xero sale por la compuerta del pasillo sin mirar atrás. Por la radio, Handsome dice algo de «un señor sin bata que pasa por delante muy tranquilo». Luego, nada.' },
		],

		// =================== LA CÁMARA 0: OLMEDO ===================
		b06_camara0_aura: [
			{ text: 'La puerta de la cámara 0 es pequeña, con escarcha en las bisagras. No tiene picaporte por este lado. Al fondo de la sala hay otras tres puertas iguales, sin número. Detrás de una de ellas, muy débil, alguien golpea con los nudillos. Tres golpes. Pausa. Tres golpes.' },
			{ text: '{riolu} cierra los ojos. Pone las dos palmas en el suelo helado. El aura se le extiende por el hielo, despacio, buscando.' },
			{ minigame: { type: 'aura', id: 'b06_camara0', title: 'La cámara 0', theme: 'cueva', level: 2,
				hint: '{riolu} busca a alguien detrás del hielo. Cada pulso dice si está frío o caliente.',
				guaranteed: ['b06_notasolmedo'],
				loot: [{ id: 'nevermeltice', w: 4 }, { id: 'icestone', w: 3 }, { id: 'stardust', w: 4 }, { id: 'starpiece', w: 1, rare: true }],
				picks: 2, lootTitle: 'Detrás del hielo' },
				onWin: [{ call: 'b06_olmedo' }],
				onLose: [{ text: 'El aura de {riolu} se dispersa por el hielo sin encontrar nada. Se sacude, como quien se quita agua. Los golpes siguen. Tres. Pausa. Tres. Lo vuelve a intentar cuando quieras.' }],
				onQuit: [{ text: '{riolu} retira las manos del hielo. Te mira. No quiere irse. Los golpes siguen.' }] },
		],
		b06_camara0: [
			{ text: 'La puerta de la cámara 0 es pequeña, con escarcha en las bisagras. No tiene picaporte por este lado. Alguien golpea desde dentro con los nudillos. Tres golpes. Pausa. Tres golpes.' },
			{ text: 'Buscas por el laboratorio. En la mesa de Xero, debajo de una caja de tornillos, hay una llave con una etiqueta de cartón: «0 · café». Abres.' },
			{ give: 'b06_notasolmedo' },
			{ call: 'b06_olmedo' },
		],
		b06_olmedo: [
			{ set: { 'flag.b06_olmedo': true } },
			{ cutscene: { bg: { type: 'indoor', wall: '#a8c8d8', floor: '#5a6a7a' }, start: 'dark', weather: 'snow', frames: [
				{ fx: 'light', cam: 'still', text: 'La cámara 0 es un cuarto pequeño de paredes blancas, con escarcha en las esquinas. Un catre. Una mesa plegable llena de papeles escritos a mano. Una estufa eléctrica apagada. Y una taza con dibujos de tren, boca abajo sobre un trapo.' },
				{ actors: [{ id: 'olmedo', at: 'left', enter: 'fade', dim: true }], cam: 'push', text: 'Sentado en el catre, con un abrigo de plumas encima de una bata y las gafas tan empañadas que no se le ven los ojos, hay un hombre delgado de unos cincuenta años. Se levanta despacio, como quien no se fía de sus rodillas.' },
				{ say: 'olmedo', actors: [{ key: 'olmedo', dim: false, do: 'bow' }], text: 'Perdón. —Se limpia las gafas en la bufanda—. Perdón por el frío. No es mío. Lo pusieron ellos. Pero me disculpo igual. Es una costumbre.' },
				{ say: 'olmedo', cam: 'still', text: 'Matías Olmedo. Ingeniero. —Mira la puerta abierta como si no terminara de creérsela—. Llevo aquí… no sé. Desde que hacía calor fuera. Antes, en otro sitio. Antes, en otro. Doce años de sitios.' },
			] } },
			{ say: 'rotom', text: '¡Bzzt! ¡Matías Olmedo! ¡El ingeniero de Renata! ¡El de la taza! —Se calla de golpe—. Ay. Perdón. Me he emocionado.' },
			{ say: 'olmedo', text: '¿Renata? —Parpadea—. No conozco a ninguna Renata. ¿La taza? —Mira la taza del trapo—. La taza me la hizo mi hija. Tenía cuatro años. Ahora tendrá dieciséis. Lavo la taza todas las noches. Así sé que ha pasado un día.' },
			{ say: 'olmedo', text: 'Lo que había ahí fuera, el arco. —Se sienta otra vez—. Es mío. Lo diseñé hace doce años en Trigal, el primero. El de ahora es más grande. Lo llaman Arco II. No genera energía. La toma. Lo escribí en el margen del primer plano para que alguien lo leyera.' },
			{ choice: [
				{ text: '«Lo leímos. Lo encontramos en tu despacho de Trigal.»', cond: 'flag.b03_renata_deduccion', then: [
					{ say: 'olmedo', text: '…¿Lo encontraron? —Se le empañan las gafas, ahora por dentro—. El doble fondo. Pensé que nadie miraría nunca un doble fondo. Gracias. Perdón. Gracias.' },
				] },
				{ text: '«¿Para qué es el Arco II?»', then: [
					{ say: 'olmedo', text: 'Para vaciar algo. Algo muy grande que duerme en lo alto de una torre, al norte. No sé qué es. Nunca me dejaron verlo. Solo me dieron las medidas. —Se mira las manos—. Las medidas eran enormes.' },
				] },
			] },
			{ say: 'olmedo', text: 'Tienen prisa. Antes no tenían prisa. Algo les salió mal en otra región y ahora todo es para ayer. —Se frota las manos—. Las máquinas con prisa se rompen. Lo saben. Les da igual.', cond: 'flag.b05_luz_necrozma || flag.b05_luz_leilani' },
			{ say: 'olmedo', text: 'Les falta algo que esperaban tener. Lo buscan aquí. Las máquinas que se hacen para sustituir a otra nunca salen bien. Se lo dije. No me escucharon.', cond: 'flag.b05_luz_aether' },
			{ text: 'Olmedo se queda callado un rato. Toma uno de los papeles de la mesa, lo mira y lo deja otra vez, bocabajo.' },
			{ cutscene: { bg: { type: 'indoor', wall: '#a8c8d8', floor: '#5a6a7a' }, start: 'light', ambient: false, frames: [
				{ actors: [{ id: 'olmedo', at: 'left', enter: 'none' }], cam: 'still', fx: 'letter', text: 'No me trasladaron por el arco. El arco lo hice. Me trasladaron por lo otro. Hace doce años, Dirección me pidió un segundo proyecto.' },
				{ say: 'olmedo', fx: 'letter', text: '«Módulos de acompañamiento». Para los Rotom de las Pokédex. Copiar una voz dentro de un Rotom. Una voz y una forma de pensar. Entera.' },
				{ say: 'olmedo', fx: ['letter', 'heartbeat'], color: '#5a8ac4', text: 'Para que «acompañe». Y para que «reporte». Esas dos palabras, juntas, en la misma línea del encargo.' },
				{ say: 'olmedo', cam: 'push', text: 'Dije que no. Una máquina que te acompaña y te vigila a la vez no es una máquina. Es un engaño con batería. —Se quita las gafas—. Al martes siguiente ya estaba en otro sitio.' },
				{ cam: 'pull', fx: 'dark', text: 'No sé de quién era la voz. No llegué a saberlo. Solo sé que alguien lo terminó, porque al final dejaron de preguntarme cómo se hacía.' },
			] } },
			{ say: 'rotom', text: '¡Bzzt! ¡Qué miedo! Un Rotom con la voz de otro. Pobrecito. —Pausa—. Menos mal que yo soy yo. Bueno. Soy yo, ¿no? ¡Claro que soy yo! ¡Qué pregunta!' },
			{ if: LUC, then: [
				{ text: '{riolu} está sentado junto a la estufa apagada. No mira a Olmedo. Mira la Pokédex, en tu mano. Un segundo largo. Luego aparta la vista, como si no hubiera mirado nada.' },
			] },
			{ say: 'olmedo', text: 'Perdón. —Otra vez—. No sé por qué te cuento esto. Hace doce años que no hablo con nadie que no tenga contrato.' },
			{ prompt: 'Olmedo tiembla. Afuera, en el laboratorio, la radio de Handsome crepita.', choice: [
				{ text: 'Llamar a Renata. Ahora.', then: [{ call: 'b06_renata_olmedo' }] },
			] },
		],
		b06_renata_olmedo: [
			{ text: 'La llamada no da ni dos tonos.' },
			{ say: 'renata', as: 'Renata (llamada)', text: '¡Testigo! Estoy montando el episodio de los martes con una mano y comiéndome un bollo con la otra, así que si es para hablar de mi bollo…' },
			{ text: 'Le dices un nombre. Al otro lado de la línea, por primera vez desde que la conoces, Renata Castellanos se queda callada. Se oye el metro. Se oye a la Tía Rosa preguntar algo. Se oye una silla que cae.' },
			{ say: 'renata', as: 'Renata (llamada)', text: 'No te muevas. No lo muevas. Que no se mueva nadie. Nico, las llaves de la furgoneta. ¡LAS LLAVES! —Pausa—. Cuarenta minutos. Treinta. Nico conduce fatal. Veinte.' },
			{ text: 'Llega en cuarenta y cinco. Entra en el laboratorio frío corriendo, con la gabardina mostaza abierta, los rizos llenos de escarcha y el micrófono en la mano. Lo trae apagado. Se para en la puerta de la cámara 0.' },
			{ say: 'renata', text: '…Matías Olmedo. —Lo dice bajito. No como en el pódcast. Como una persona—. Doce años buscándolo. Le he dedicado nueve episodios. Hay gente que tiene su cara de fondo de pantalla. Yo la tengo.' },
			{ say: 'olmedo', text: 'Perdón. —Se levanta—. No sabía que me buscaba nadie. Si lo hubiera sabido, me habría dejado encontrar antes.' },
			{ text: 'Renata se ríe. Es una risa rara, mojada. Se quita las gafas, se limpia la escarcha y se las vuelve a poner. Le tiende la mano. Él se la estrecha con las dos.' },
			{ quest: 'b06_t_renata', stage: 'hecha', done: true },
			{ if: 'flag.b03_renata_publica', then: [
				{ say: 'renata', text: 'Le escondieron más hondo después de mi episodio. Lo sé. Vaciaron su carpeta al día siguiente de emitirlo. —Mira el catre, la estufa apagada—. Esto también es culpa mía. Un poco. Nota para mí, no para el episodio.' },
			] },
			{ if: FOTO, then: [
				{ text: 'Sacas de la mochila la foto de carné de la carpeta de Silph: gafas torcidas, cara de no haber dormido. Detrás, a lápiz, «Para D., por si preguntan».' },
				{ say: 'olmedo', text: 'Para Dámaso. —La toma con mucho cuidado—. La grapé ahí el último lunes. Por si un día preguntaba alguien. Pensé que nadie preguntaría.' },
				{ say: 'renata', text: 'Preguntamos. Bastante. Durante doce años. —Se le quiebra la voz y lo disimula fatal—. Dámaso Ferrán sigue en Trigal. Leyendo contadores. Mirando una pared.' },
			] },
			{ if: DAMASO, then: [
				{ text: 'Renata marca un número en su móvil y se lo pasa a Olmedo sin decir nada. Él lo mira como si fuera una pieza que no sabe dónde va.' },
				{ say: 'damaso', as: 'Dámaso (llamada)', text: '¿Sí? ¿Quién es? Son las seis, estoy con los contadores…' },
				{ say: 'olmedo', text: 'Dámaso. —Pausa larga—. Soy Matías. El martes no fui. Lo siento. Quería contártelo el martes.' },
				{ text: 'Al otro lado, mucho rato, nada. Luego un ruido, como una persona grande que se sienta en el suelo de un cuarto de contadores.' },
				{ say: 'damaso', as: 'Dámaso (llamada)', text: '…Fregaste la taza. Doce años pensando en por qué fregaste la taza. —Se le rompe la voz—. Ven a por ella. Te la he guardado.' },
				{ set: { 'flag.b06_damaso_olmedo': true } },
			] },
			{ text: 'Renata se aparta para dejarles hablar. Se apoya en la pared helada, junto a ti. No enciende el micrófono.' },
			{ prompt: 'Renata te mira de reojo. «¿Cómo lo cuento?»', choice: [
				{ text: '«Es tu caso. Doce años tuyos. El mérito es tuyo.»', then: [
					{ af: { renata: 3 } },
					{ say: 'renata', text: 'Mío. —Lo prueba—. No. Nuestro. Pero gracias por decirlo así. Me ha gustado mucho. No te acostumbres.' },
				] },
				{ text: '«Lo encontramos entre todos. Tú, yo, Dámaso, {riolu}.»', then: [
					{ af: { renata: 1 } },
					{ say: 'renata', text: 'Entre todos. Cool. Cool, cool. Así lo voy a contar. Con una lista de créditos larguísima al final, como en las películas.' },
				] },
				{ text: '«Bueno, técnicamente lo encontré yo.»', then: [
					{ af: { renata: -5 } },
					{ say: 'renata', text: '—Te mira por encima de las gafas, muy despacio—. Técnicamente, testigo, llevo doce años con esto en la pared. Técnicamente tú llevas tres semanas en Teselia. Técnicamente cállate un rato.' },
				] },
			] },
			{ text: 'Antes de irse, Olmedo le pide a Renata su libreta de papel. Escribe algo largo, con letra apretada, mirando de vez en cuando la Pokédex de tu mano. Dobla la hoja dos veces.' },
			{ say: 'olmedo', text: 'Por si acaso. Por si un día se encuentran uno de esos módulos y hay que quitarlo. Se puede. Es feo, pero se puede. —Se la da—. Perdón. No la leas aquí.' },
			{ text: 'Renata se guarda la hoja en el bolsillo interior de la gabardina sin leerla. Delante de ti, no.' },
			{ say: 'renata', text: 'Handsome se lo lleva a un sitio seguro. No me ha dicho dónde y no se lo he preguntado. Primera vez en mi vida que no pregunto algo. —Pausa—. Te espero en la **furgoneta**, en el muelle. Cuando puedas. Trae a {riolu}. Y trae la Pokédex. Sobre todo, trae la Pokédex.' }, // FUERA DE MICRO
			{ intel: { npc: 'olmedo', text: 'Matías Olmedo, ingeniero del primer Arco (Trigal) y del Arco II. Retenido doce años en instalaciones de Lemnis. Lo trasladaron por negarse a fabricar «módulos de acompañamiento»: copiar una voz dentro de un Rotom para que «acompañe» y «reporte». No sabe de quién era la voz.' } },
			{ intel: { npc: 'renata', text: 'Encontró por fin a Matías Olmedo, en la cámara 0 de los Almacenes Frigoríficos de Fayenza. Cerró su caso de doce años. No encendió el micrófono.' } },
		],
		b06_mesa_olmedo: [
			{ text: 'La mesa plegable de Olmedo, con sus papeles escritos a mano y la taza de tren boca abajo sobre el trapo. Handsome la ha dejado ahí a propósito. «Que se quede donde la dejó él».' },
			{ if: 'has("b06_notasolmedo")', then: [{ read: 'b06_notasolmedo' }] },
		],

		// =================== LA FURGONETA: EL BUZÓN Y LA TRAMPA ===================
		b06_trampa_plan: [
			{ text: 'La furgoneta de Casos Fríos está aparcada al final del muelle, con «CASOS FRÍOS» pintado a mano en el lateral y una antena torcida en el techo. Dentro hay una mesa plegable, dos taburetes, una cafetera de camping y Renata, con los cascos al cuello y una libreta de papel en el regazo. Nico duerme en el asiento del conductor.' },
			{ say: 'renata', text: 'Siéntate. —Hoy no dice «testigo»—. Antes de nada, una cosa del buzón. Me ha llegado esta mañana. Quiero que la oigas.' },
			{ text: 'Pulsa un botón del portátil. Por el altavoz sale una voz de mujer, joven, muy bajita, con mucho ruido de fondo: carretillas, pitidos, una megafonía lejana.' },
			{ say: 'noa', as: 'Mensaje sin firma', text: '«Hola. Soy… una oyente. Trabajo en logística. —Pausa larga—. ¿Cómo se abre una jaula desde dentro? No es para un episodio. Perdón. Gracias.»' },
			{ text: 'Al fondo, antes de que se corte, la megafonía dice algo. Solo se entiende el final: «…**emplazamiento 06**…».' },
			{ text: 'Conoces esa voz. La conoces de Luminalia, de una ruta con jaulas, de una nota escrita con un puntito muy gordo en las íes.' },
			{ quest: 'b06_t_noa', stage: 'buzon' },
			{ set: { 'flag.b06_noa_buzon': true } },
			{ say: 'renata', text: 'No sé quién es. No dejó número. —Te mira—. Pero tú has puesto una cara. Te he visto ponerla.' },
			{ prompt: 'Renata espera.', choice: [
				{ text: '«La conozco. Déjamelo a mí.»', then: [
					{ say: 'renata', text: 'Va. —Lo dice sin pelear, y eso en ella es mucho—. No pregunto. Segunda vez hoy que no pregunto. Me estoy volviendo una persona horrible.' },
					{ af: { renata: 1 } },
				] },
				{ text: 'No decir nada.', then: [
					{ say: 'renata', text: 'Bueno. Lo guardo en una caja sin etiqueta. —Cierra el portátil—. Cuando quieras contármelo, la caja estará ahí.' },
				] },
			] },
			{ quest: 'b06_t_noa', stage: 'hecha', done: true },
			{ intel: { npc: 'noa', text: 'Dejó un mensaje sin firma en el buzón de Casos Fríos: «¿Cómo se abre una jaula desde dentro?». De fondo, una megafonía: «emplazamiento 06». Renata no sabe quién es.' } },
			// ----- La trampa -----
			{ text: 'Renata deja la Pokédex sobre la mesa plegable, entre las dos tazas, con la pantalla hacia arriba. Luego, sin decir nada, abre la libreta, escribe algo, arranca la hoja y te la pasa por debajo de la mesa.' },
			{ give: 'b06_planrenata' },
			{ read: 'b06_planrenata' },
			{ text: 'Levantas la vista. Renata se lleva un dedo a los labios. Luego habla en voz alta, normal, con su voz de siempre, mirando a la Pokédex de reojo.' },
			{ say: 'renata', text: 'Bueno. Pues lo de Olmedo queda así: Handsome lo esconde en el **Bosque Azulejo**, en la cabaña vieja del guarda. Una semana. Hasta que pase lo de la torre.' }, // FUERA DE MICRO (lo oye solo la Pokédex)
			{ say: 'rotom', text: '¡Bzzt! ¡En el Bosque Azulejo! ¡Qué bonito! Hay muchos Sewaddle. Le van a hacer una bufanda.' },
			{ text: 'Renata asiente, muy seria, y escribe otra cosa en la libreta: «Uno». La tacha.' },
			{ text: 'Luego toma la Pokédex con mucho cuidado, la mete en la nevera de camping de la furgoneta, entre dos latas de refresco, y cierra la tapa. «Para que no se caliente», dice en voz alta. No hace calor.' },
			{ text: 'Después toma el móvil y llama a Handsome. Pone el altavoz.' },
			{ say: 'handsome', as: 'Handsome (radio de la Policía)', text: 'Aquí Handsome. Canal de la Policía Internacional. Confirmo: el testigo pasa la semana en el **puerto de Fayenza**, en un barco amarrado. Corto y cambio. —Pausa—. Handsome siempre quiso decir «corto y cambio».' }, // FUERA DE MICRO (radio de la Policía)
			{ text: 'Renata escribe «Dos». Lo tacha. Luego mira el reloj de la furgoneta: las nueve menos cinco. Martes. Despierta a Nico de un codazo.' },
			{ say: 'renata', text: 'Nico. Directo. Desde aquí, por teléfono. Que la Tía Rosa abra el programa.' },
			{ text: 'Nico se despierta, conecta dos cables, pulsa un botón rojo. Una luz se enciende encima de la mesa: **EN ANTENA**. Renata se pone los cascos y le cambia la voz: la voz de *Casos Fríos*.' },
			{ say: 'renata', as: 'Renata (en antena)', text: '¡Buenas noches, Teselia! Martes, nueve en punto, *Casos Fríos* en directo. Hoy no tengo episodio. Tengo algo mejor: una noticia. Matías Olmedo está vivo.' }, // EN ANTENA
			{ say: 'renata', as: 'Renata (en antena)', text: 'Está a salvo, con amigos, y esta semana duerme en un sitio que nadie mira: **el viejo invernadero del muelle de Porcelana**. No vayan a molestarlo, que los conozco.' }, // EN ANTENA
			{ say: 'renata', as: 'Renata (en antena)', text: 'Nota para el episodio: doce años. Y lo encontró una persona de la Gira con un Lucario, que me ha dejado llevarme el mérito. Bueno, a medias. Gracias, Teselia. Volvemos la semana que viene.', cond: LUC }, // EN ANTENA
			{ say: 'renata', as: 'Renata (en antena)', text: 'Nota para el episodio: doce años. Y lo encontró una persona de la Gira que me ha dejado llevarme el mérito. Bueno, a medias. Gracias, Teselia. Volvemos la semana que viene.', cond: '!' + LUC }, // EN ANTENA
			{ text: 'La luz roja se apaga. Renata saca la Pokédex de la nevera, le quita el frío con la manga y te la devuelve. Se quita los cascos y escribe «Tres». Lo tacha. Luego dobla la hoja de la libreta en ocho, la mete en la taza vacía y le echa el resto del café encima. El papel se deshace.' },
			{ say: 'renata', text: 'Ya está. —Muy bajito, sin mirar la Pokédex—. Ahora, a esperar. Lo que pase, pasará de noche, en Porcelana.' }, // FUERA DE MICRO
			{ prompt: 'Renata te mira. Lleva un rato sin decir «cool».', choice: [
				{ text: '«No se lo cuento a nadie.»', then: [
					{ af: { renata: 5 } },
					{ say: 'renata', text: 'A nadie. —Asiente—. Ni a ti mism{o|a|e} en voz alta. Me gusta la gente que sabe callarse. Hay muy poca.' },
				] },
				{ text: '«¿Y si no pica nadie?»', then: [
					{ af: { renata: 1 } },
					{ say: 'renata', text: 'Entonces me he equivocado y lo emito el martes que viene. «Episodio diez: me equivoqué». —Sonríe, de lado—. Ya lo hice una vez. Con otro caso. No me gustó. Pero se hace.' },
				] },
				{ text: '«Esto es muy serio, Renata.»', then: [
					{ af: { renata: -2 } },
					{ say: 'renata', text: 'Ya sé que es serio. Por eso hago chistes. —Te da un golpecito en la frente con el bolígrafo—. No te me pongas solemne, que me aburro y me equivoco.' },
				] },
			] },
			{ set: { 'flag.b06_trampa': true } },
			{ quest: 'b06_t_apuntador', stage: 'trampa' },
			{ if: LUC, then: [
				{ text: 'Cuando bajas de la furgoneta, {riolu} se queda un momento en el escalón. Mira la Pokédex, que llevas en la mano. Luego te mira a ti. Luego echa a andar delante, como siempre, como si no hubiera mirado nada.' },
			] },
			{ say: 'rotom', text: '¡Bzzt! ¡Qué día tan largo! Frío, hielo, un señor con frío… ¡y encima Renata me ha guardado un rato en la nevera! Para que no me calentara. Qué detalle. Creo.' },
			{ diary: 'Hoy mi entrenador{|a|e} ha entrado en unos almacenes enormes llenos de cajas de pescado que no eran de pescado. ¡Hacía tanto frío que se le hacía nube el aliento! Había un pasillo de hielo donde todo resbalaba, y lo cruzamos resbalando con mucho estilo. Al fondo estaba Xero, el de los tornillos, y le ganamos. Luego encontramos a un señor con frío y lo sacamos de allí. Por la noche, en el muelle, Renata nos invitó a café en su furgoneta. El café de furgoneta sabe a gasolina. A mi entrenador{|a|e} le gustó igual.', cond: 'flag.b01_diario' },
			{ say: 'renata', text: 'Me vuelvo a Porcelana esta noche. —Desde la ventanilla, mientras Nico arranca—. Ah. Ysolde ha preguntado por ti. Bueno, no ha preguntado: me dejó una pluma gris en el parabrisas con una nota que ponía tu nombre. Y una hora. De noche.', cond: '(flag.b03_vencejo_pluma || flag.b04_vencejo_pluma)' },
			{ say: 'renata', text: 'Me vuelvo a Porcelana esta noche. —Desde la ventanilla, mientras Nico arranca—. Ven tú también, en cuanto puedas. Lo que pase, pasará allí. Y de noche.', cond: '!(flag.b03_vencejo_pluma || flag.b04_vencejo_pluma)' },
			{ quest: 'b06_m4', stage: 'hecha', done: true },
			{ quest: 'b06_m5', stage: 'tejados' },
			{ set: { 'flag.b06_t4_hecho': true } },
		],

		// =================== MUELLE: EL CAPATAZ Y LA FERALIGATRITA ===================
		b06_capataz: [
			{ text: 'El capataz del muelle es un hombre enorme con un chaleco naranja a punto de reventar y un silbato de latón colgado del cuello. Está de pie junto al bolardo del fondo, mirando el agua.' },
			{ say: 'estibador', as: 'Capataz del muelle', text: 'Ahí abajo está Garfio. Mi Feraligatr. Lleva veinte años sujetando los mercantes cuando el amarre no aguanta. —Señala el agua—. Mira. Ahí. Los ojos.' },
			{ text: 'Del agua verde asoman dos ojos rojos y un morro azul lleno de dientes. El Feraligatr te mira, mira el mercante, y tira de un cabo con los dientes. El barco entero se mueve medio metro hacia el muelle.' },
			{ say: 'estibador', as: 'Capataz del muelle', text: 'Aquí entrenamos al acabar el turno. Si ganas a tres de los míos, te enseño una cosa que tiene Garfio en la caja de las herramientas. Una piedra. No le gusta enseñarla. Le gusta más tirar de barcos.' },
			{ if: 'flag.b06_feraligita', then: [
				{ say: 'estibador', as: 'Capataz del muelle', text: 'Garfio dice que la cuides. Bueno, no lo dice. Pero tira del barco con más ganas desde que se la diste a alguien que sabe usarla.' },
			] },
		],
		b06_premio_muelle: [
			{ say: 'estibador', as: 'Capataz del muelle', text: 'Tres. Sin caerte al agua. —Hace sonar el silbato dos veces, cortas—. ¡Garfio! Ven aquí. Tenemos visita.' },
			{ text: 'El Feraligatr sale del agua por la escalera de hierro del muelle, chorreando, con un cabo todavía entre los dientes. Lo suelta a tus pies. Atada al extremo del cabo, en una red de pescador, hay una piedra redonda que brilla con un remolino azul y rojo.' },
			{ say: 'estibador', as: 'Capataz del muelle', text: 'La encontró él. En el fondo del puerto, hace años, enganchada en un ancla vieja. No me la deja tocar. La lleva en la boca cuando tira de los barcos, como un chupete. —Se ríe—. Hoy te la trae a ti.' },
			{ if: 'owns("feraligatr")', then: [
				{ say: 'estibador', as: 'Capataz del muelle', text: 'Tú tienes uno, ¿verdad? Se te nota. Un Feraligatr. Garfio lo huele. Por eso te la da. Entre Feraligatr se entienden.' },
			], else: [
				{ say: 'estibador', as: 'Capataz del muelle', text: 'No llevas ningún Feraligatr, ¿no? Da igual. Garfio dice que algún día lo llevarás. Garfio nunca se equivoca con estas cosas. Con el tiempo sí. Con esto no.' },
			] },
			{ give: 'feraligite' },
			{ set: { 'flag.b06_feraligita': true } },
			{ say: 'estibador', as: 'Capataz del muelle', text: 'La **Feraligatrita**. Con ella, un Feraligatr se pone que da miedo. Garfio se puso así una vez, en un temporal, y el mercante llegó al muelle él solo. Al día siguiente pidió un bocadillo.' },
			{ text: 'Garfio te da un cabezazo suave en la mano, que casi te tira al agua, y se vuelve al agua por la escalera de hierro. Al mercante del fondo le tira del cabo con más ganas que antes.' },
		],
	},

	// =====================================================================
	// RETOS
	// =====================================================================
	challenges: {
		jefe_xero: {
			name: 'Xero, en el laboratorio frío', npc: 'xero', trainer: 'xero_1', type: 'Dark', rec: 66,
			cond: 'flag.b06_xero_visto',
			info: [
				{ text: 'Contratista. Esta vez, con un equipo de **Siniestro** y **Veneno**. Muy seguro de sus tornillos.' },
				{ text: '5 Pokémon, hasta el nivel 66. Sin mecánicas.' },
				{ text: 'El **Hada**, la **Lucha**, el **Bicho** y el **Psíquico** le hacen daño a casi todo su equipo. Cuidado con los que pegan en el suelo: su as no es pequeño.' },
				{ text: 'Handsome te manda pociones por el conducto antes del combate.' },
				{ cond: 'flag.b06_xero_vencido', text: '✔ Vencido. Dieciséis minutos de veinte.' },
			],
		},
		muelle_fayenza_entreno: {
			name: 'Muelle de los estibadores (entrenamiento)', npc: 'estibador', type: 'Water', rec: 65,
			cond: 'visited("muelle_fayenza")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **65**: estibadores, marineras y pescadores al acabar el turno.' },
				{ text: 'El capataz guarda algo para quien gane tres combates. Lo guarda su Feraligatr, en realidad.' },
				{ cond: 'flag.b06_feraligita', text: '✔ Premio conseguido.' },
			],
		},
		fabio_revancha: {
			name: 'Fabio, en los Almacenes', npc: 'fabio', trainer: 'fabio_2', type: 'Psychic', rec: 64,
			cond: 'flag.b06_fabio_visto',
			info: [
				{ text: 'Revancha opcional. Tipo **Psíquico**, como siempre. Esta vez, sin Megapiedra.' },
				{ text: 'Te deja curar antes. Con sus pociones, que tienen su nombre escrito.' },
				{ cond: 'beat("fabio_2")', text: '✔ Vencido. Otra vez.' },
			],
		},
	},

	// =====================================================================
	// TIENDAS
	// =====================================================================
	shops: {
		b06_mt_fayenza: { name: 'Mercado de Fayenza (piedras y MT)', items: [
			{ id: 'firestone', price: 3000 }, { id: 'leafstone', price: 3000 }, { id: 'thunderstone', price: 3000 },
			{ id: 'moonstone', price: 3000 }, { id: 'sunstone', price: 3000 }, { id: 'shinystone', price: 3000 }, { id: 'duskstone', price: 3000 }, { id: 'ovalstone', price: 3000 },
			{ id: 'b06_mt_antiaereo', price: 6000 }, { id: 'b06_mt_nitrocarga', price: 6000 }, { id: 'b06_mt_rayo_carga', price: 6000 }, { id: 'b06_mt_alarido', price: 6000 },
			{ id: 'b06_mt_viento_afin', price: 8000 }, { id: 'b06_mt_terratemblor', price: 8000 }, { id: 'b06_mt_puntapie', price: 8000 },
			{ id: 'b06_mt_acrobata', price: 10000 }, { id: 'b06_mt_cola_dragon', price: 10000 }, { id: 'b06_mt_vaho_gelido', price: 10000 }, { id: 'b06_mt_infortunio', price: 10000 },
			{ id: 'b06_mt_onda_vacio', price: 10000 }, { id: 'b06_mt_arenas_ardientes', price: 15000 }, { id: 'b06_mt_onda_toxica', price: 15000 },
			{ id: 'b06_mt_metalaser', price: 20000 }, { id: 'b06_mt_gigaimpacto', price: 20000 },
		] },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		// ----- Para leer -----
		b06_cartahela: { name: 'Carta de Hela', pocket: 'key', desc: 'Un sobre doblado y algo húmedo, con una arenilla de playa en los pliegues. Lo trajo Calder desde Poni, en mano.',
			read: '{jugador}:\n\nNo sé escribir cartas. Escribo esta porque Calder me ha dicho que te va a ver y yo no me fío de que te diga las cosas bien. Él las dice bonitas. Yo las digo como son.\n\nCalder arregla redes. Las arregla bien. Ha arreglado todas las de la Aldea y ahora arregla las de los barcos que pasan. Por la noche mira el cielo con el telescopio y no apunta nada. Antes lo apuntaba todo.\n\nMalia era amiga mía. Venía a Poni a pescar los domingos y siempre se le enredaba el sedal. Yo se lo desenredaba. Ella me arreglaba la radio. Nunca le pregunté qué hacía en Kantai. No hacía falta.\n\nNo te pido que le perdones. Eso no es cosa tuya. Te pido que, si le ves mirar mucho rato una pieza, le dejes. Es lo único que lo calma. Como a mi Mudsdale el cepillo.\n\nLa tierra no tiene prisa. Tú tampoco la tengas.\n\n— Hela\n\n*P. D.: El Mudsdale te manda un resoplido. No sé escribirlo.*' },
		b06_notasolmedo: { name: 'Notas de Olmedo', pocket: 'key', desc: 'Hojas escritas a mano con letra pequeña y exacta, sujetas con una pinza de tender. Estaban en la mesa de la cámara 0.',
			read: '**Día 1 (o lo que sea).** Me trasladan otra vez. Esta vez hace frío. Me disculpo con la estufa: no funciona y no es culpa suya.\n\n**Día 9.** Me piden revisar los anclajes del arco. Están mal calculados. Lo digo. Me dan las gracias. Los dejan igual.\n\n**Día 23.** Lavo la taza todas las noches. Si la lavo, ha pasado un día. Si no la lavo, no sé.\n\n**Día 40.** Viene un hombre de pelo blanco con un mechón azul. Me pregunta si quiero a mis máquinas. Le digo que les pido perdón. Lo apunta. Dice que es un dato precioso.\n\n**Día 61.** Me vuelven a preguntar por el otro encargo. El de hace doce años. El de la voz. Les digo lo mismo que entonces: que no. Que una cosa que acompaña y vigila a la vez es un engaño con batería. Dejan de preguntar. Eso me asusta más que las preguntas.\n\n**Día 88.** Un contratista de gafas enormes me deja café en la puerta. No me lo bebo. Pero lo huelo. Huele a casa de alguien.\n\n**Día ¿?** Si alguien lee esto: el arco no genera la energía. La toma. Lo escribí hace doce años en un margen. Lo vuelvo a escribir aquí. Alguien tendrá que leerlo alguna vez.\n\n— M. O.' },
		b06_informevinculo: { name: 'Informe de estudio de vínculo', pocket: 'key', desc: 'Una carpeta de Lemnis con el logotipo del ocho tumbado y una etiqueta: «Emplazamiento 05 · Sujeto: B. L.».',
			read: '**LEMNIS · PROGRAMA DE TALENTOS**\n**Unidad de Estudios de Vínculo · Emplazamiento 05 (Teselia)**\n\nSujeto: **B. Lacroix**. Pokémon principal: Greninja.\n\nFase actual: **transferencia parcial**.\n\nObservaciones:\n— Índice de vínculo inicial: muy alto. «El sujeto y su Pokémon se entienden sin hablar». Valor excepcional para la extracción.\n— Tras 14 sesiones: el índice baja un 31 %. El sujeto duerme mal. El Pokémon come poco. Ambos «miran la puerta».\n— El material extraído se estabiliza en frío (ver lote 05). Con calor, se cansa.\n\nRecomendación: ofrecer al sujeto la **cláusula 14.6** (extensión voluntaria hasta la fase final). Los sujetos con vínculo alto suelen firmar «para no separarse de su Pokémon».\n\nCopia a: Dirección (Ω).\n\n*(En el margen, con bolígrafo, otra letra: «Miran la puerta porque quieren salir. No es un síntoma. Es una respuesta. — X.»)*' },
		b06_planrenata: { name: 'Hoja de la libreta de Renata', pocket: 'key', desc: 'Una hoja arrancada de una libreta, escrita deprisa con bolígrafo. Te la pasó por debajo de la mesa, sin decir nada.',
			read: '**NO DIGAS NADA EN VOZ ALTA. LEE.**\n\nAlguien sabe cosas que no debería. Siempre llega donde acabamos de estar. Hay tres sitios por donde se escapan las cosas:\n\n**1.** Lo que se dice delante de tu Pokédex.\n**2.** Lo que dice la radio de la Policía.\n**3.** Lo que digo yo en antena los martes.\n\nVoy a soltar **un sitio falso distinto** por cada uno. Olmedo no estará en ninguno: Handsome lo lleva a otro lado y no me ha dicho cuál. Bien.\n\nDonde aparezca alguien, sabremos por dónde se escapa.\n\nTú solo sígueme la corriente. Y no se lo cuentes a nadie. A NADIE. Ni en voz alta a ti mism{o|a|e}.\n\n— R.\n\n*P. D.: Esto lo quemo luego. Bueno, lo ahogo en café. Es lo que hay en una furgoneta.*' },

		// ----- MT -----
		b06_mt_cuerpo_pesado: { name: 'MT Cuerpo Pesado', pocket: 'machines', tm: 'heavyslam', desc: 'El usuario se lanza sobre el objetivo con todo su peso. Cuanto más pese que él, más daño hace. Regalo de Brock en Fayenza.' },
		b06_mt_antiaereo: { name: 'MT Antiaéreo', pocket: 'machines', tm: 'smackdown', desc: 'Lanza una piedra que derriba al objetivo: si volaba o levitaba, deja de hacerlo y puede recibir ataques de tipo Tierra.' },
		b06_mt_nitrocarga: { name: 'MT Nitrocarga', pocket: 'machines', tm: 'flamecharge', desc: 'Se envuelve en llamas y embiste. Cada vez que lo usa, aumenta su Velocidad.' },
		b06_mt_rayo_carga: { name: 'MT Rayo Carga', pocket: 'machines', tm: 'chargebeam', desc: 'Dispara un rayo eléctrico. Puede aumentar el Ataque Especial del usuario.' },
		b06_mt_alarido: { name: 'MT Alarido', pocket: 'machines', tm: 'snarl', desc: 'Un grito furioso que hiere a los rivales y les baja el Ataque Especial.' },
		b06_mt_viento_afin: { name: 'MT Viento Afín', pocket: 'machines', tm: 'tailwind', desc: 'Levanta un viento a favor que duplica la Velocidad de los Pokémon del equipo durante unos turnos.' },
		b06_mt_terratemblor: { name: 'MT Terratemblor', pocket: 'machines', tm: 'bulldoze', desc: 'Pisa con fuerza y sacude el suelo. Hiere a todos los que están alrededor y les baja la Velocidad.' },
		b06_mt_puntapie: { name: 'MT Puntapié', pocket: 'machines', tm: 'lowsweep', desc: 'Un barrido rápido a las piernas del objetivo que le baja la Velocidad.' },
		b06_mt_acrobata: { name: 'MT Acróbata', pocket: 'machines', tm: 'acrobatics', desc: 'Un ataque ágil. Si el usuario no lleva objeto, hace el doble de daño.' },
		b06_mt_cola_dragon: { name: 'MT Cola Dragón', pocket: 'machines', tm: 'dragontail', desc: 'Golpea con la cola y obliga al rival a cambiar de Pokémon. Ataca siempre el último.' },
		b06_mt_vaho_gelido: { name: 'MT Vaho Gélido', pocket: 'machines', tm: 'frostbreath', desc: 'Sopla un aliento helado que siempre asesta un golpe crítico.' },
		b06_mt_infortunio: { name: 'MT Infortunio', pocket: 'machines', tm: 'hex', desc: 'Un ataque implacable que hace el doble de daño si el objetivo sufre un problema de estado.' },
		b06_mt_onda_vacio: { name: 'MT Onda Vacío', pocket: 'machines', tm: 'vacuumwave', desc: 'Gira los puños y lanza una onda de vacío. Ataca siempre primero.' },
		b06_mt_arenas_ardientes: { name: 'MT Arenas Ardientes', pocket: 'machines', tm: 'scorchingsands', desc: 'Lanza arena muy caliente. Puede quemar al objetivo.' },
		b06_mt_onda_toxica: { name: 'MT Onda Tóxica', pocket: 'machines', tm: 'sludgewave', desc: 'Una ola de lodo tóxico que alcanza a todos los que están alrededor. Puede envenenar.' },
		b06_mt_metalaser: { name: 'MT Metaláser', pocket: 'machines', tm: 'steelbeam', desc: 'Dispara un rayo con todo el acero de su cuerpo. Hace muchísimo daño, y al usuario también.' },
		b06_mt_gigaimpacto: { name: 'MT Gigaimpacto', pocket: 'machines', tm: 'gigaimpact', desc: 'Carga con todas sus fuerzas contra el objetivo. Después necesita un turno para recuperarse.' },
	},

	// =====================================================================
	// PUNTOS DE RECOLECCIÓN
	// =====================================================================
	gather: {
		b06_tes5_arbusto: {
			name: 'El arbusto de las caravanas', icon: '🫐', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'bosque', hint: 'Sacude las ramas y recoge con la cesta. Los cascabeles no se recogen: avisan.' },
			ask: 'Un arbusto enorme cargado de bayas en medio de las caravanas, con cascabeles colgados de las ramas. Un cartel: «Coja lo que quiera. Deje una canción».',
			text: 'Recoges lo que el arbusto da hoy. Desde una caravana, alguien toca tres notas de acordeón. Es la canción que dejas.',
			wait: 'El arbusto está pelado hasta mañana. Los cascabeles suenan solos con el viento, como si se rieran.',
			table: [
				{ id: 'oranberry', w: 14, n: [1, 3] }, { id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'cheriberry', w: 10, n: [1, 2] },
				{ id: 'pechaberry', w: 10, n: [1, 2] }, { id: 'leppaberry', w: 8, n: [1, 1] }, { id: 'persimberry', w: 6, n: [1, 1] },
				{ id: 'tinymushroom', w: 6, n: [1, 2] },
				{ id: 'lumberry', w: 4, n: [1, 1], rare: true }, { id: 'balmmushroom', w: 2, n: [1, 1], rare: true },
			],
		},
		b06_muelle_fayenza: {
			name: 'El borde del muelle', icon: '🎣', hours: 20, picks: [1, 2],
			game: { type: 'fish', level: 3, theme: 'mar', hint: 'El agua del muelle es honda y verde. Lo que pica tira hacia los pilotes. Aguanta.',
				wild: [{ sp: 'basculin', lv: [62, 64], w: 5 }, { sp: 'jellicent', lv: [62, 64], w: 4 }, { sp: 'alomomola', lv: [62, 64], w: 3 }, { sp: 'wailord', lv: [63, 64], w: 1 }], wildChance: 0.3 },
			ask: 'El borde del muelle de los estibadores: agua honda y verde entre los pilotes negros. Un estibador te presta su caña sin decir nada. Al fondo, unos ojos rojos miran a ver qué haces.',
			text: 'Sacas lo que el puerto suelta hoy. Garfio, el Feraligatr del capataz, asoma el morro, mira lo que has pescado y se vuelve a hundir. Parece que lo aprueba.',
			wait: 'Los estibadores del turno de tarde han pescado todo lo que había. El agua del muelle está quieta. Mañana habrá más.',
			table: [
				{ id: 'pearl', w: 14, n: [1, 2] }, { id: 'heartscale', w: 10, n: [1, 1] }, { id: 'stardust', w: 10, n: [1, 2] },
				{ id: 'mysticwater', w: 6, n: [1, 1] }, { id: 'diveball', w: 8, n: [1, 2] }, { id: 'netball', w: 8, n: [1, 2] },
				{ id: 'bigpearl', w: 4, n: [1, 1], rare: true }, { id: 'waterstone', w: 2, n: [1, 1], rare: true },
			],
		},
		b06_camaras_hielo: {
			name: 'La pared de hielo viejo', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 3, theme: 'hielo', hint: 'Este hielo lleva años sin derretirse. Lo de dentro se ve, pero está hondo.' },
			ask: 'Una pared de hielo viejo al fondo del pasillo, gris de tantas capas. Dentro, a un palmo de la superficie, brillan cosas que se han quedado atrapadas: piedras, cristales, un tornillo.',
			text: 'Sacas lo que el hielo suelta hoy. Un Cryogonal flota detrás de ti y mira el agujero con mucho interés.',
			wait: 'La pared de hielo está llena de agujeros recientes. Habrá que esperar a que vuelva a helarse.',
			table: [
				{ id: 'nevermeltice', w: 10, n: [1, 1] }, { id: 'stardust', w: 14, n: [1, 2] }, { id: 'hardstone', w: 10, n: [1, 1] },
				{ id: 'snowball', w: 8, n: [1, 1] }, { id: 'pearl', w: 8, n: [1, 1] }, { id: 'metalcoat', w: 4, n: [1, 1] },
				{ id: 'icestone', w: 3, n: [1, 1], rare: true }, { id: 'starpiece', w: 2, n: [1, 1], rare: true },
			],
		},
	},
};
