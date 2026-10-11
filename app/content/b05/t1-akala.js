// Bloque 5 · Tramo 1: «Akala» (~3 h 30).
// Ferry → Ciudad Kantai (taller de Leilani, CID y la carta de Malia) → Ruta 4 → Pueblo Ohana y Rancho Ohana
// (zona de entrenamiento, huerto, segundo sueño de aura) → Ruta 5 → Colina Saltagua (prueba de Nereida, Misty,
// Popplio, el Lapras de la red, el Ride Gear Universal) → Ruta 8 (caleta de Ulises con Lapras; desvío al Área
// Volcánica del Wela: Kiawe, Rhi) → Ciudad Konikoni (Philippe, postal de Adela, Bill, joyería de Mayla,
// Tyranitarita, shokugeki opcional de Gaspar y Lulú) → Ruinas de la Vida (Gran Prueba de Mayla) → invitación de Æther.
// Empieza cuando T0 activa b05_ferry_akala y pone b05_m3 en «kantai». Termina con b05_t1_hecho.

// ---------- Condiciones reutilizadas ----------
const LUC = '(inParty("riolu") || inParty("lucario"))';
const TT = '(owns("larvitar") || owns("pupitar") || owns("tyranitar"))';
const TT_EQ = '(inParty("larvitar") || inParty("pupitar") || inParty("tyranitar"))';
const POPPLIO = '(owns("popplio") || owns("brionne") || owns("primarina"))';
const PRUEBAS = 'flag.b05_nereida_hecha && flag.b05_kiawe_hecha';
const CARTA_PEND = 'flag.b05_carta_leida && !flag.b05_leilani_carta';

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== CIUDAD KANTAI ===================
		kantai: {
			name: 'Ciudad Kantai', short: 'Kantai', region: 'alola', kind: 'city', map: { x: 52, y: 40 },
			bg: { type: 'city', roofs: ['#c4743a', '#3a6a8a', '#e9e3d0', '#8a5a2f'], far: '#4a8ac4' },
			desc: 'La ciudad del puerto de **Akala**: grúas, contenedores de colores, gaviotas que se pelean por una malasada y olor a gasóleo y a sal. Aquí se arregla todo lo que flota y casi todo lo que no.\n\nEn el muelle, el **taller Kahale** tiene la persiana a medio subir y una montura de Tauros colgada en la puerta. Al lado, un edificio blanco con una antena en forma de anillo: el **Centro de Investigaciones Dimensionales**.',
			descNight: 'De noche, Kantai no duerme: las grúas del puerto siguen girando con luces rojas en la punta y los ferris pitan al entrar. La persiana del taller Kahale sigue a medio subir. Dentro hay luz y, de vez en cuando, una chispa azul.',
			descs: [
				{ cond: 'flag.b05_ridegear', text: 'El puerto de Akala: grúas, contenedores, gaviotas y olor a gasóleo y a sal.\n\nEn la persiana del **taller Kahale** hay un cartel nuevo, escrito con rotulador: «SE ARREGLAN MONTURAS · SE INVENTAN COSAS · NO SE ACEPTAN DEVOLUCIONES (todavía no ha explotado nada) (casi nada)». Al lado, el **Centro de Investigaciones Dimensionales** con su antena en forma de anillo.' },
			],
			links: ['alola_ruta4', 'alola_ruta8'],
			mapNote: 'Taller Kahale · Centro de Investigaciones Dimensionales · ferris',
			onEnter: [{ script: 'b05_kantai_llegada', cond: '!flag.b05_kantai_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Kantai', action: { shop: 'tienda_kantai' } },
				{ label: 'Taller Kahale', sub: 'Persiana a medio subir. Chispas dentro', icon: '🔧', action: { go: 'taller_kahale' }, new: '!flag.b05_leilani_taller || (' + CARTA_PEND + ')' },
				{ label: 'Centro de Investigaciones Dimensionales', sub: 'Un edificio blanco con una antena en anillo', icon: '🔭', action: { go: 'cid_kantai' }, new: 'flag.b05_leilani_taller && !flag.b05_carta_leida' },
				{ label: 'Una turista en el malecón', sub: 'Su Altaria lleva una piedra en el cuello', icon: '☁️', cond: 'flag.b05_kantai_llegada', new: '!beat("kantai_iolana")', talk: [{ cond: '!beat("kantai_iolana")', script: 'b05_iolana' }, { script: 'b05_iolana_despues' }] },
				{ label: 'Rotom: ¿qué me queda en Akala?', sub: 'Repasa lo pendiente', icon: '📱', cond: 'flag.b05_kantai_llegada && !flag.b05_t1_hecho', talk: [{ script: 'b05_akala_pendiente' }] },
				{ label: '⛴️ Ferry a Melemele (Hauoli)', sub: 'Sale cada hora', icon: '⛴️', action: { go: 'hauoli' } },
				{ label: '🛥️ Barco de la Fundación Æther', sub: 'Blanco, sin ruido, con el logotipo en el casco', icon: '🛥️', cond: 'flag.b05_aether_invitacion', new: '!visited("paraiso_aether")', action: { go: 'paraiso_aether' } },
			],
			rumors: [
				{ text: 'En el taller Kahale arreglan cualquier montura. Dicen que una vez le pusieron un motor a un Tauros. El Tauros no quería. Ahora no quiere otra cosa.' },
				{ text: 'La antena del Centro de Investigaciones Dimensionales gira sola algunas noches, aunque no haya viento. Los del puerto ya ni la miran.' },
				{ text: 'Los barcos de la Fundación Æther no hacen ruido al atracar. Ni al zarpar. Los estibadores dicen que es de mala educación.' },
				{ cond: 'flag.b05_ridegear', text: 'Dicen que la chica del taller Kahale ha hecho un brazalete con el que cualquiera puede llamar a un Lapras. La chica dice que «cualquiera» no. Que hay que caerle bien al Lapras.' },
			],
		},

		taller_kahale: {
			name: 'Taller Kahale', parent: 'kantai', kind: 'building',
			bg: { type: 'indoor', wall: '#5a4a3a', floor: '#3a3a40' },
			desc: 'Un hangar de chapa que huele a soldadura, a aceite y a coco quemado. Hay monturas por todas partes: sillas de Tauros, arneses de Mudsdale, unas aletas de cuero que no sabrías decir para qué Pokémon son. En una esquina, un **Turtonator** dormido hace de fragua.\n\nEn la mesa del fondo, un brazo robótico con un soplete. En la pared, una foto vieja sujeta con un imán.',
			descs: [
				{ cond: 'flag.b05_ridegear', text: 'El taller Kahale, con su olor a soldadura y a coco quemado. El banco de trabajo está más despejado que antes: el **Ride Gear** ya no está en él. Ahora hay un cuaderno abierto lleno de dibujos de un Lapras visto desde todos los ángulos.\n\nEl Turtonator duerme. El brazo robótico vigila. La foto sigue en la pared.' },
			],
			mapNote: 'Leilani (mecánica de monturas)',
			spots: [
				{ label: 'Leilani', sub: 'Debajo de una silla de montar, con una llave inglesa', icon: '🔧', new: '!flag.b05_leilani_taller || (' + CARTA_PEND + ')', talk: [
					{ cond: '!flag.b05_leilani_taller', script: 'b05_leilani_taller' },
					{ cond: CARTA_PEND, script: 'b05_leilani_carta' },
					{ script: 'b05_leilani_generico' },
				] },
				{ label: 'El brazo robótico', sub: 'Tiene un altavoz. Y opiniones', icon: '🤖', talk: [{ script: 'b05_soldabot' }] },
				{ label: 'La foto de la pared', sub: 'Una mujer con una llave inglesa al hombro', icon: '🖼️', talk: [{ script: 'b05_foto_malia' }] },
			],
		},

		cid_kantai: {
			name: 'Centro de Investigaciones Dimensionales', parent: 'kantai', kind: 'building',
			bg: { type: 'lab', wall: '#e9e8e0', floor: '#8ab0c8' },
			desc: 'Paredes blancas, suelo azul y una pantalla enorme que ocupa una pared entera: un mapa de Alola con puntitos de colores que se encienden y se apagan. Los investigadores hablan bajo, como en una biblioteca.\n\nAl fondo hay un escritorio que nadie usa. Tiene una planta. La planta está muy bien cuidada.',
			mapNote: 'Prof. Pimpinela · ultraumbrales',
			spots: [
				{ label: 'Prof. Pimpinela', sub: 'Mira la pantalla grande con una taza en la mano', icon: '🔭', new: 'flag.b05_leilani_taller && !flag.b05_carta_leida', talk: [
					{ cond: 'flag.b05_leilani_taller && !flag.b05_carta_leida', script: 'b05_pimpinela_carta' },
					{ cond: '!flag.b05_pimpinela_vista', script: 'b05_pimpinela_intro' },
					{ script: 'b05_pimpinela_generico' },
				] },
				{ label: 'El escritorio del fondo', sub: 'Una planta muy bien cuidada', icon: '🪴', talk: [{ script: 'b05_cid_escritorio' }] },
				{ label: 'La pantalla grande', sub: 'Puntitos de colores sobre el mapa de Alola', icon: '🗺️', talk: [{ script: 'b05_cid_pantalla' }] },
			],
		},

		// =================== RUTA 4 ===================
		alola_ruta4: {
			name: 'Ruta 4', short: 'Ruta 4', region: 'alola', kind: 'route', map: { x: 56, y: 50 },
			bg: { type: 'route', flowers: '#f2a03a', hill: '#6a9a4a', far: '#4a8ac4' },
			desc: 'Un camino de tierra roja que sube desde el puerto entre campos de hierba alta y palmeras torcidas por el viento. A un lado, el mar. Al otro, vallas de madera y Mudsdale pastando con cara de no tener prisa.\n\nAl final, **Pueblo Ohana** y su rancho.',
			descNight: 'De noche, la Ruta 4 huele a hierba caliente que se enfría. Los Mudsdale duermen de pie, junto a las vallas, como estatuas. Las luces del puerto de Kantai se quedan atrás, abajo, como un montón de brasas.',
			links: ['kantai', 'ohana'],
			mapNote: 'Camino al rancho',
			rumors: [
				{ text: 'Los Mudsdale de la Ruta 4 no dejan pasar a nadie que corra. Hay que caminar. Ellos deciden qué es caminar.' },
				{ text: 'Hay un Eevee que vive entre las vallas. Dicen que es de nadie. Dicen que lo ha decidido él.' },
			],
			route: {
				from: 'kantai', to: 'ohana', length: 6, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Sales del puerto por una cuesta de tierra roja. El ruido de las grúas se va apagando y lo sustituye otro: el viento en la hierba alta y, de vez en cuando, un relincho grave.' }],
					1: [
						{ trainer: 'ak4_marlene' },
						{ item: 'hyperpotion' },
					],
					2: [
						{ text: 'Una valla de madera con un cartel: «RANCHO OHANA · 3 km · Despacio, que nos ven». Un Mudsdale apoya la cabeza en la valla y te mira pasar. Muy despacio.' },
						{ spot: { action: { gather: 'b05_r4_bayas' } }, label: 'Árbol de bayas junto a la valla', icon: '🌳', sub: 'Un Mudsdale vigila que nadie se las coma todas' },
					],
					3: [
						{ trainer: 'ak4_ikaika' },
						{ item: 'rarecandy', hidden: true },
					],
					4: [
						{ text: 'Desde aquí se ve el mar entero. A lo lejos, una isla blanca y perfecta, sin árboles, como una maqueta puesta encima del agua. Un barco igual de blanco va hacia ella sin hacer espuma.' },
						{ trainer: 'ak4_noelani', optional: true, label: 'Una chica con un Wigglytuff le canta a las vacas' },
					],
					5: [
						{ item: 'ultraball' },
						{ text: 'Un poste de madera con tres flechas: «Ohana», «Kantai» y, tachada con pintura, una tercera que decía algo que ya no se lee.' },
					],
					6: [{ text: 'La cuesta se allana. Casitas de madera con porche, un abrevadero, un campanario pequeño y, detrás, un prado enorme lleno de Tauros: **Pueblo Ohana**.' }],
				},
				encounters: {
					grass: [
						{ sp: 'stoutland', lv: [53, 55], w: 20 },
						{ sp: 'toucannon', lv: [53, 55], w: 16 },
						{ sp: 'mudsdale', lv: [54, 56], w: 14 },
						{ sp: 'wigglytuff', lv: [53, 55], w: 10 },
						{ sp: 'gumshoos', lv: [53, 55], w: 12, time: 'day' },
						{ sp: 'raticatealola', lv: [53, 55], w: 12, time: 'night' },
						{ sp: 'charjabug', lv: [53, 55], w: 10 },
						{ sp: 'eevee', lv: [53, 55], w: 3 },
						{ sp: 'dodrio', lv: [54, 56], w: 5, displaced: true },
					],
				},
			},
		},

		// =================== PUEBLO OHANA ===================
		ohana: {
			name: 'Pueblo Ohana', short: 'Ohana', region: 'alola', kind: 'town', map: { x: 58, y: 60 },
			bg: { type: 'town', roofs: ['#8a5a2f', '#c4743a', '#e9c46a'], far: '#7aa05a' },
			desc: 'Un pueblo de rancheros: casas de madera con porche, sombreros colgados en los clavos de la puerta y un abrevadero en la plaza donde beben a la vez un Tauros, un Mudsdale y un señor muy mayor. Todo el mundo saluda. Todo el mundo saluda despacio.\n\nAl este, el **Rancho Ohana**. Al sur, la **Ruta 5** baja hacia una colina con arroyos.',
			descNight: 'De noche, en Ohana solo hay tres luces: la del Centro Pokémon, la del porche del rancho y la de un Ampharos que alguien deja fuera para que los Tauros no tropiecen.',
			links: ['alola_ruta4', 'alola_ruta5'],
			mapNote: 'Rancho Ohana (entrenamiento, tope 59) · huerto',
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Ohana', sub: 'En el porche del almacén', action: { shop: 'tienda_kantai' } },
				{ label: 'Rancho Ohana', sub: 'Prado, establos y un huerto', icon: '🐂', action: { go: 'rancho_ohana' }, new: '!visited("rancho_ohana")' },
				{ label: 'El abrevadero', sub: 'Un Mudsdale con una silla muy rara', icon: '🐴', talk: [{ script: 'b05_ohana_mudsdale' }] },
				{ label: 'El señor del abrevadero', sub: 'Bebe agua con un Tauros', icon: '🤠', talk: [{ script: 'b05_ohana_abuelo' }] },
			],
			rumors: [
				{ text: 'En Ohana se dice que los Tauros saben cuándo va a llover. Últimamente miran al cielo a media tarde y se quedan muy quietos. No llueve.' },
				{ text: 'El Rancho Ohana entrena a cualquiera que aguante una tarde con sus vaqueros. Dicen que la capataza regala algo «a quien no se caiga del caballo». No hay caballos. Es un decir.' },
			],
		},

		rancho_ohana: {
			name: 'Rancho Ohana', parent: 'ohana', kind: 'area',
			bg: { type: 'ranch', ground: '#7aa05a', far: '#c4a06a' },
			desc: 'Un prado sin fin cercado con troncos. Tauros que corren en grupo, Miltank que no corren nunca y Mudsdale que miran a los dos con desprecio. Al fondo, los establos rojos y un **huerto** de bayas con espantapájaros.\n\nEn una cerca, una mujer con sombrero de ala ancha y un silbato al cuello grita órdenes a unos vaqueros que no le hacen caso.',
			descNight: 'De noche, el rancho huele a heno y a tierra. Los Tauros duermen en círculo, con los cuernos hacia fuera. En el pajar del establo hay una lámpara encendida y una manta doblada, como si alguien esperara visita.',
			mapNote: 'Entrenamiento (tope 59) · huerto · pajar',
			spots: [
				{ label: 'El corral de los vaqueros', sub: 'Zona de entrenamiento (nivel recomendado 59)', icon: '🥋', action: { training: {
					cap: 59, prize: { wins: 3, script: 'b05_premio_rancho' }, trainers: ['rancho_ohana_1', 'rancho_ohana_2', 'rancho_ohana_3'], coach: 'Capataza del Rancho Ohana',
					wild: [{ sp: 'mudsdale', lv: [56, 58] }, { sp: 'tauros', lv: [56, 58] }, { sp: 'miltank', lv: [56, 58] }, { sp: 'stoutland', lv: [56, 58] }],
					closed: 'La capataza te mira el equipo de arriba abajo, se echa el sombrero hacia atrás y silba. «Esos ya no se caen del caballo. Ni del Mudsdale. Vete a por la kahuna, que aquí me espantas a los novatos».',
				} } },
				{ label: 'El huerto', sub: 'Árboles bajos cargados de bayas', icon: '🧺', new: '!flag.rec_b05_huerto_ohana', action: { gather: 'b05_huerto_ohana' } },
				{ label: 'La capataza', sub: 'Sombrero de ala ancha y silbato', icon: '🤠', talk: [{ script: 'b05_capataza' }] },
				{ label: 'El pajar del establo', sub: 'Una lámpara y una manta doblada', icon: '🌙', cond: LUC + ' && !flag.b05_sueno_aura', new: 'true', talk: [{ script: 'b05_sueno_aura' }] },
				{ label: 'El pajar del establo', sub: 'Huele a heno y a tierra', icon: '🌾', cond: '!(' + LUC + ') || flag.b05_sueno_aura', talk: [{ script: 'b05_pajar' }] },
			],
			rumors: [
				{ text: 'En el huerto del rancho hay un árbol al que le salen bayas doradas. La capataza dice que no. Luego se come una a escondidas.' },
			],
		},

		// =================== RUTA 5 ===================
		alola_ruta5: {
			name: 'Ruta 5', short: 'Ruta 5', region: 'alola', kind: 'route', map: { x: 48, y: 64 },
			bg: { type: 'route', flowers: '#e98aa8', hill: '#5a8a4a', far: '#7ab0d0' },
			desc: 'Desde Ohana, el camino baja entre helechos gigantes y árboles de flores rosas. Hace más humedad a cada paso. Se empieza a oír agua: arroyos que bajan de una colina y se cruzan con el camino sin pedir permiso.\n\nAl final, la **Colina Saltagua**.',
			descNight: 'De noche, en la Ruta 5 se oyen más arroyos que de día. Los helechos gotean. Entre las hojas brillan setas pequeñas, azules, que se apagan cuando las miras.',
			links: ['ohana', 'colina_saltagua'],
			mapNote: 'Camino a la Colina Saltagua',
			rumors: [
				{ text: 'En la Ruta 5 hay un Scyther que brilla como si fuera de metal. No es de aquí. Nadie sabe de dónde es. Él tampoco, parece.' },
				{ text: 'Los Fomantis de la Ruta 5 se hacen pasar por flores. Funciona hasta que les pisas una.' },
			],
			route: {
				from: 'ohana', to: 'colina_saltagua', length: 6, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'El camino baja. Los helechos te llegan por encima de la cabeza. Un Toucannon se ríe de algo desde una rama. Esperas que no sea de ti.' }],
					1: [
						{ trainer: 'ak5_pono' },
						{ item: 'fullheal' },
					],
					2: [
						{ terrain: 'flowers' },
						{ text: 'Un claro lleno de flores rosas. Una de las flores se gira para mirarte. Era un Lurantis. Vuelve a ser una flor.' },
						{ spot: { action: { gather: 'b05_r5_helechos' } }, label: 'Charca entre los helechos', icon: '🍄', sub: 'Setas, bayas y algo que brilla en el barro' },
					],
					3: [
						{ trainer: 'ak5_mahina' },
						{ item: 'revive', hidden: true },
					],
					4: [
						{ text: 'Un arroyo cruza el camino. Hay piedras para saltar. Hay también una piedra que no es una piedra y que se aparta sola cuando vas a pisarla: un Pyukumuku, ofendido.' },
						{ trainer: 'ak5_kawika', optional: true, label: 'Un pescador mira el arroyo sin caña' },
					],
					5: [
						{ item: 'maxrepel' },
						{ text: 'En el tronco de un árbol, alguien ha clavado un cartel a mano: «PRUEBA DE LA CAPITANA NEREIDA → · Traiga toalla · No traiga prisa».' },
					],
					6: [{ text: 'Los helechos se abren. Delante, una colina verde con el agua bajando por todas partes, en hilos, en cascadas, en charcas que reflejan el cielo: la **Colina Saltagua**.' }],
				},
				encounters: {
					grass: [
						{ sp: 'toucannon', lv: [54, 56], w: 16 },
						{ sp: 'lurantis', lv: [54, 56], w: 16 },
						{ sp: 'stoutland', lv: [54, 56], w: 14 },
						{ sp: 'charjabug', lv: [54, 56], w: 12 },
						{ sp: 'butterfree', lv: [54, 56], w: 10, time: 'day' },
						{ sp: 'shiinotic', lv: [54, 56], w: 12, time: 'night' },
						{ sp: 'sawsbuck', lv: [55, 57], w: 4, displaced: true },
						{ sp: 'scyther', lv: [55, 57], w: 3, displaced: true, gimmick: 'tera', tera: 'Steel' },
					],
					flowers: [
						{ sp: 'lurantis', lv: [54, 56], w: 22 },
						{ sp: 'butterfree', lv: [54, 56], w: 16, time: 'day' },
						{ sp: 'ribombee', lv: [54, 56], w: 14 },
						{ sp: 'shiinotic', lv: [54, 56], w: 14, time: 'night' },
						{ sp: 'comfey', lv: [55, 57], w: 4 },
					],
				},
			},
		},

		// =================== COLINA SALTAGUA ===================
		colina_saltagua: {
			name: 'Colina Saltagua', short: 'Saltagua', region: 'alola', kind: 'area', map: { x: 50, y: 72 },
			bg: { type: 'forest', far: '#5a9ac4', ground: '#4a7a4a' },
			desc: 'Una colina verde que suda agua por todas partes. Arroyos, charcas, cascadas pequeñas y una poza grande al fondo, rodeada de rocas lisas. Cada pocos segundos, algo salpica en algún sitio. Nunca donde estás mirando.\n\nEn una roca junto a la poza, con los pies en el agua, una chica de pelo azul pesca sin caña.',
			descNight: 'De noche, la poza grande refleja la luna entera. Las salpicaduras siguen, más espaciadas, como si alguien debajo del agua tuviera sueño.',
			descs: [
				{ cond: 'flag.b05_ridegear', text: 'La Colina Saltagua, con sus arroyos y sus charcas y sus salpicaduras que nunca están donde miras.\n\nEn la poza grande quedan, enganchados en una roca, unos jirones de red violeta que ya no brillan. Desde la orilla, el mar se ve muy cerca: con un Lapras, se llega a cualquier parte.' },
			],
			links: ['alola_ruta5'],
			mapNote: 'Prueba de la capitana Nereida (Agua)',
			spots: [
				{ label: 'Centro Pokémon de campaña', sub: 'Una caseta con una enfermera muy morena', action: { center: true } },
				{ label: 'Nereida', sub: 'Pesca sin caña en una roca', icon: '🎣', new: '!flag.b05_nereida_conocida || (flag.b05_nereida_hecha && !flag.b05_popplio && !flag.b05_popplio_pensar)', talk: [
					{ cond: '!flag.b05_nereida_conocida', script: 'b05_nereida_intro' },
					{ cond: 'flag.b05_nereida_hecha && !flag.b05_popplio', script: 'b05_popplio' },
					{ cond: 'flag.b05_nereida_hecha', script: 'b05_nereida_despues' },
					{ script: 'b05_nereida_mientras' },
				] },
				{ label: 'Misty', sub: 'Compite con Nereida a ver quién salpica más', icon: '💧', cond: 'flag.b05_nereida_conocida', talk: [{ script: 'b05_misty_saltagua' }] },
				{ label: 'Primera salpicadura', sub: 'En la charca de las rocas planas', icon: '💦', cond: 'flag.b05_nereida_conocida && !flag.b05_saltagua_1', new: 'true', talk: [{ script: 'b05_saltagua_1' }] },
				{ label: 'Segunda salpicadura', sub: 'En el arroyo de las piedras negras', icon: '💦', cond: 'flag.b05_saltagua_1 && !flag.b05_saltagua_2', new: 'true', talk: [{ script: 'b05_saltagua_2' }] },
				{ label: 'La poza grande', sub: 'Algo muy grande salpica en el centro', icon: '🌊', cond: 'flag.b05_saltagua_2 && !flag.b05_nereida_hecha', new: 'true', talk: [{ script: 'b05_saltagua_dominante' }] },
				{ label: 'Gritos en la orilla', sub: 'Leilani corre hacia el mar con una caja de herramientas', icon: '🛟', cond: 'flag.b05_leilani_taller && flag.b05_nereida_hecha && !flag.b05_ridegear', new: 'true', talk: [{ script: 'b05_lapras_red' }] },
				{ label: 'Lapras, en la orilla', sub: 'Te espera con la cabeza fuera del agua', icon: '🌅', cond: 'flag.b05_ridegear', talk: [{ script: 'b05_lapras_orilla' }] },
				{ label: '🌊 Cruzar el mar a Konikoni con Lapras', sub: 'Un atajo por la costa', icon: '🌊', cond: 'flag.mount_lapras', action: { go: 'konikoni' } },
				{ label: 'Pescar en la poza', sub: 'El agua es tan clara que da vértigo', icon: '🎣', action: { explore: 'water' } },
				{ label: 'Buscar entre los arroyos', sub: 'Hierba alta y piedras mojadas', icon: '🌿', action: { explore: 'grass' } },
			],
			encounters: {
				water: [
					{ sp: 'seaking', lv: [54, 56], w: 18 },
					{ sp: 'golduck', lv: [54, 56], w: 14 },
					{ sp: 'basculin', lv: [54, 56], w: 14 },
					{ sp: 'gyarados', lv: [55, 57], w: 8 },
					{ sp: 'poliwrath', lv: [55, 57], w: 6 },
					{ sp: 'araquanid', lv: [54, 56], w: 12 },
					{ sp: 'wishiwashi', lv: [54, 56], w: 12 },
					{ sp: 'alomomola', lv: [55, 57], w: 5 },
					{ sp: 'feebas', lv: [40, 45], w: 2 },
					{ sp: 'slowbro', lv: [55, 57], w: 4, displaced: true },
				],
				grass: [
					{ sp: 'masquerain', lv: [54, 56], w: 16 },
					{ sp: 'pelipper', lv: [54, 56], w: 14 },
					{ sp: 'poliwhirl', lv: [53, 55], w: 12 },
					{ sp: 'parasect', lv: [54, 56], w: 12 },
					{ sp: 'shiinotic', lv: [54, 56], w: 14, time: 'night' },
					{ sp: 'golduck', lv: [54, 56], w: 10 },
					{ sp: 'araquanid', lv: [54, 56], w: 10 },
				],
			},
			rumors: [
				{ text: 'La capitana Nereida cuenta que una vez pescó un Wailord con la mano. Lo dice muy seria. Nadie se atreve a preguntarle si es broma.' },
				{ text: 'En la poza grande vive algo enorme que salpica a los que se acercan sin respeto. Nereida dice que es su mascota. Su mascota dice que no.' },
			],
		},

		// =================== RUTA 8 ===================
		alola_ruta8: {
			name: 'Ruta 8', short: 'Ruta 8', region: 'alola', kind: 'route', map: { x: 64, y: 50 },
			bg: { type: 'route', flowers: '#e9c46a', hill: '#8a6a4a', far: '#4a8ac4' },
			desc: 'Una carretera de la costa que va de Kantai a Konikoni, con el mar a un lado y, al otro, la falda negra de un volcán que echa un hilito de humo. Hay una gasolinera, un motel con un cartel que parpadea y playas pequeñas entre rocas de lava.\n\nA media ruta, un sendero sube hacia el **Área Volcánica del Wela**.',
			descNight: 'De noche, en la Ruta 8 solo brillan el cartel del motel, que parpadea en rosa, y la cima del Wela, que brilla en naranja por dentro. Las olas rompen contra la lava vieja con un ruido de cristal.',
			links: ['kantai', 'konikoni'],
			mapNote: 'Desvío al Área Volcánica del Wela · caleta',
			rumors: [
				{ text: 'En la Ruta 8 hay una caleta a la que solo se llega por mar. Los pescadores juran que han visto allí una caseta azul de madera. Luego vuelven a mirar y no está.' },
				{ text: 'El motel de la Ruta 8 tiene una habitación, la 4, que nunca se alquila. El dueño dice que es «por superstición». No dice cuál.' },
			],
			route: {
				from: 'kantai', to: 'konikoni', length: 8, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Sales de Kantai por la carretera de la costa. A la izquierda, el mar. A la derecha, una ladera negra de lava vieja, con hierba que crece en las grietas.' }],
					1: [
						{ trainer: 'ak8_kai' },
						{ item: 'hyperpotion' },
					],
					2: [
						{ terrain: 'sand' },
						{ text: 'Una playa pequeña de arena oscura. Un Wishiwashi solo, muy pequeño, nada en círculos en una charca. Lo miras. Te mira. Sigue nadando en círculos, más deprisa, por si acaso.' },
						{ spot: { action: { gather: 'b05_r8_playa' } }, label: 'La orilla de arena negra', icon: '🐚', sub: 'La marea deja cosas entre la lava' },
					],
					3: [
						{ trainer: 'ak8_hoku' },
						{ text: 'Una gasolinera con un mostrador al aire libre. El dependiente lee una revista de motos. «Si vas al volcán, el sendero empieza un poco más allá. Y lleva agua. Allí arriba hasta el agua tiene sed».' },
					],
					4: [
						{ branch: { label: 'Subir al Área Volcánica del Wela', go: 'area_wela', cond: 'true' } },
						{ talk: [{ script: 'b05_volver_wela' }], label: 'Subir al escenario de Kiawe', sub: 'Las antorchas siguen encendidas arriba', icon: '🔥', cond: 'visited("area_wela") && !flag.b05_kiawe_hecha' },
						{ text: 'Un sendero de piedra negra sube hacia el volcán. Un cartel de madera quemada: «ÁREA VOLCÁNICA DEL WELA · Prueba del capitán Kiawe · Por favor, no baile en el borde».' },
						{ item: 'firestone', hidden: true },
					],
					5: [
						{ text: 'La carretera bordea un acantilado. Abajo, entre dos brazos de lava, hay una caleta escondida con arena blanquísima. No hay camino para bajar. Solo el mar.', cond: '!flag.mount_lapras' },
						{ talk: [{ cond: '!flag.b05_ulises_caleta', script: 'b05_ulises_caleta' }, { script: 'b05_caleta_despues' }], label: 'La caleta escondida', sub: 'Solo se llega por mar', icon: '🏝️', cond: 'flag.mount_lapras', new: '!flag.b05_ulises_caleta' },
						{ trainer: 'ak8_pua', optional: true, label: 'Un pescador fuma una pipa sin tabaco en el acantilado' },
					],
					6: [
						{ trainer: 'ak8_lani' },
						{ item: 'maxrevive', hidden: true },
					],
					7: [
						{ text: 'El motel de la Ruta 8. Un cartel con un Slowpoke de neón que parpadea. En la recepción, un señor pone una película de karate en una tele pequeña y no la mira.' },
						{ item: 'ultraball' },
					],
					8: [{ text: 'La carretera dobla una curva y aparece el puerto de pescadores: barcas de colores, un mercado cubierto con tejado de hojas de palma y un ruido de gente regateando. **Ciudad Konikoni**.' }],
				},
				encounters: {
					grass: [
						{ sp: 'toucannon', lv: [54, 56], w: 16 },
						{ sp: 'gumshoos', lv: [54, 56], w: 14, time: 'day' },
						{ sp: 'raticatealola', lv: [54, 56], w: 14, time: 'night' },
						{ sp: 'talonflame', lv: [55, 57], w: 12 },
						{ sp: 'salandit', lv: [54, 56], w: 10 },
						{ sp: 'bewear', lv: [55, 57], w: 8 },
						{ sp: 'salazzle', lv: [55, 57], w: 4 },
						{ sp: 'electabuzz', lv: [55, 57], w: 4, displaced: true },
					],
					sand: [
						{ sp: 'sandygast', lv: [53, 55], w: 18 },
						{ sp: 'palossand', lv: [55, 57], w: 6 },
						{ sp: 'pelipper', lv: [54, 56], w: 16 },
						{ sp: 'crabominable', lv: [55, 57], w: 8 },
					],
				},
			},
		},

		// =================== ÁREA VOLCÁNICA DEL WELA ===================
		area_wela: {
			name: 'Área Volcánica del Wela', short: 'Wela', region: 'alola', kind: 'area', map: { x: 66, y: 34 },
			bg: { type: 'mountain', ground: '#3a2a2a', far: '#c4473a', hill: '#5a3a3a' },
			desc: 'Roca negra, roca roja y, entre las dos, vapor que sale del suelo por grietas finas como cortes de papel. Hace un calor que se mete en la ropa. Arriba, el cráter echa un humo blanco y tranquilo.\n\nEn una explanada de piedra, alguien ha montado un escenario de troncos con antorchas. Un chico sin camisa practica pasos de baile con un Marowak que lleva el hueso en llamas.',
			descNight: 'De noche, las grietas del Wela brillan en naranja, como si el suelo respirara. Las antorchas del escenario siguen encendidas. Los Salandit se juntan alrededor, como en una hoguera.',
			links: ['alola_ruta8'],
			mapNote: 'Prueba del capitán Kiawe (Fuego) · veta de excavación',
			spots: [
				{ label: 'Kiawe', sub: 'Baila con un Marowak en el escenario', icon: '🔥', new: '!beat("kiawe_1")', talk: [
					{ cond: '!beat("kiawe_1") && flag.b05_kiawe_intro', script: 'b05_kiawe_otra' },
				{ cond: '!beat("kiawe_1")', script: 'b05_kiawe_intro' },
					{ cond: '!flag.b05_kiawe_hecha', script: 'b05_kiawe_mientras' },
					{ script: 'b05_kiawe_despues' },
				] },
				{ label: 'El escenario de las antorchas', sub: 'La prueba de Kiawe', icon: '💃', cond: 'beat("kiawe_1") && !flag.b05_kiawe_hecha', new: 'true', talk: [
					{ cond: '!flag.b05_kiawe_danza', script: 'b05_kiawe_danza' },
					{ script: 'b05_kiawe_dominante' },
				] },
				{ label: 'Rhi', sub: 'Da toques a una Poké Ball junto al cráter', icon: '⚽', cond: 'flag.b05_kiawe_hecha && !flag.b05_rhi_wela', new: 'true', talk: [{ script: 'b05_rhi_wela' }] },
				{ label: 'Rhi', sub: 'Practica pasos de baile. Fatal', icon: '⚽', cond: 'flag.b05_rhi_wela', talk: [{ cond: '!beat("rhi_6")', script: 'b05_rhi_revancha' }, { script: 'b05_rhi_despues' }] },
				{ label: 'Bailarina del volcán', sub: 'Gira con un Oricorio en la mano', icon: '🌺', action: { trainer: 'wela_hulali' } },
				{ label: 'La veta de roca roja', sub: 'Brilla con el calor', icon: '⛏️', new: '!flag.rec_b05_wela_veta', action: { gather: 'b05_wela_veta' } },
				{ label: 'Explorar entre las fumarolas', sub: 'Algo se mueve entre el vapor', icon: '🌋', action: { explore: 'grass' } },
			],
			encounters: {
				grass: [
					{ sp: 'talonflame', lv: [55, 57], w: 16 },
					{ sp: 'salandit', lv: [54, 56], w: 18 },
					{ sp: 'salazzle', lv: [55, 57], w: 6 },
					{ sp: 'magmar', lv: [55, 57], w: 14 },
					{ sp: 'marowakalola', lv: [55, 57], w: 12, time: 'night' },
					{ sp: 'kangaskhan', lv: [55, 57], w: 3 },
					{ sp: 'rapidash', lv: [55, 57], w: 5, displaced: true },
					{ sp: 'darmanitan', lv: [55, 57], w: 3, displaced: true },
				],
			},
			rumors: [
				{ text: 'Dicen que el capitán Kiawe baila todas las mañanas al amanecer en el borde del cráter. Dicen que el volcán le contesta.' },
				{ text: 'En la veta de roca roja salen a veces piedras que queman al tocarlas. Los de Konikoni las compran para la sauna.' },
			],
		},

		// =================== CIUDAD KONIKONI ===================
		konikoni: {
			name: 'Ciudad Konikoni', short: 'Konikoni', region: 'alola', kind: 'city', map: { x: 72, y: 64 },
			bg: { type: 'city', roofs: ['#c43a3a', '#e9c46a', '#3a8a6a', '#e9e3d0'], far: '#c4743a' },
			desc: 'Una ciudad de puerto con tejados de pagoda rojos, farolillos de papel y un mercado cubierto que huele a pescado, a especias y a malasada recién hecha. Las calles son estrechas y suben. Al fondo se ve el volcán.\n\nEn la calle principal, una **joyería** con el escaparate lleno de piedras que brillan. En la puerta, un cartel: «Cerrado los días de Gran Prueba».',
			descNight: 'De noche, los farolillos de Konikoni se encienden todos a la vez. El mercado cierra, pero los puestos de comida no. La joyería tiene la persiana bajada y, detrás, una luz de lámpara de trabajo.',
			links: ['alola_ruta8', 'ruinas_vida'],
			mapNote: 'Joyería de Mayla · Ruinas de la Vida',
			onEnter: [{ script: 'b05_konikoni_llegada', cond: '!flag.b05_konikoni_llegada', once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Mercado de Konikoni', action: { shop: 'tienda_konikoni' } },
				{ label: 'Joyería', sub: 'Escaparate de piedras que brillan', icon: '💎', action: { go: 'joyeria_mayla' }, new: '!flag.b05_mayla_conocida || (' + TT + ' && !flag.b05_tt_visto) || (' + TT_EQ + ' && !flag.b05_tyranitarita)' },
				{ label: 'Un señor con chistera', sub: 'Reparte folletos de villas con vistas al volcán', icon: '🎩', new: '!flag.b05_philippe', talk: [{ cond: '!flag.b05_philippe', script: 'b05_philippe' }, { script: 'b05_philippe_despues' }] },
				{ label: 'Correo en el Centro Pokémon', sub: 'Hay algo con tu nombre en el casillero', icon: '✉️', cond: 'flag.b05_konikoni_llegada && !flag.b05_postal_adela', new: 'true', talk: [{ script: 'b05_postal_adela' }] },
				{ label: 'Llamada perdida', sub: 'Bill · «Hola-hola»', icon: '📞', cond: 'flag.b05_ridegear && !flag.b05_bill_llamada', new: 'true', talk: [{ script: 'b05_bill_llamada' }] },
				{ label: 'Restaurante de Lulú', sub: 'Dos chefs se miran a través del mostrador', icon: '🍲', cond: 'flag.b05_konikoni_llegada', new: '!flag.b05_shoku_hecho', talk: [
					{ cond: '!flag.b05_shoku_hecho', script: 'b05_shokugeki' },
					{ cond: '!beat("lulu_1")', script: 'b05_lulu_reto' },
					{ script: 'b05_lulu_despues' },
				] },
				{ label: 'Rotom: ¿qué me queda en Akala?', sub: 'Repasa lo pendiente', icon: '📱', cond: '!flag.b05_t1_hecho', talk: [{ script: 'b05_akala_pendiente' }] },
			],
			rumors: [
				{ text: 'La kahuna de Akala tiene una joyería en Konikoni. Dicen que tasa una piedra con solo mirarla y una persona con solo mirarle los zapatos.' },
				{ text: 'En el Restaurante de Lulú no hay carta. Hay lo que la tierra quiera dar hoy. Y lo que Lulú quiera cocinar con eso, que no siempre es lo mismo.' },
				{ text: 'En las Ruinas de la Vida, al sur, vive un tapu. Dicen que, si le caes bien, te cura un dolor de cabeza. Si le caes mal, te lo da.' },
			],
		},

		joyeria_mayla: {
			name: 'Joyería de Mayla', parent: 'konikoni', kind: 'building',
			bg: { type: 'indoor', wall: '#4a2a4a', floor: '#2a2030' },
			desc: 'Terciopelo morado, vitrinas de cristal y lámparas pequeñas que apuntan a las piedras como focos de teatro. Todo brilla. Todo está tasado. Hay una lupa en cada mostrador y un cartel en letra cursiva: «El tiempo es lo único que aquí no se vende».\n\nDetrás del mostrador, una mujer con una melena larguísima y los labios pintados mira una piedra contra la luz.',
			mapNote: 'Kahuna Mayla (joyera)',
			spots: [
				{ label: 'Mayla', sub: 'Mira una piedra contra la luz', icon: '💎', new: '!flag.b05_mayla_conocida', talk: [
					{ cond: '!flag.b05_mayla_conocida', script: 'b05_mayla_joyeria' },
					{ script: 'b05_mayla_generico' },
				] },
				{ label: 'La geoda de la trastienda', sub: 'Mayla la guarda para alguien con paciencia', icon: '🪨', cond: 'flag.b05_mayla_conocida && ' + TT + ' && !flag.b05_tyranitarita', new: '!flag.b05_tt_visto || ' + TT_EQ, talk: [
					{ cond: '!flag.b05_tt_visto', script: 'b05_tt_inicio' },
					{ script: 'b05_tt_tallar' },
				] },
				{ label: 'La vitrina del fondo', sub: 'Una piedra verde oscura, sin etiqueta', icon: '🪨', cond: 'flag.b05_mayla_conocida && !' + TT, talk: [{ script: 'b05_tt_guardada' }] },
			],
		},

		// =================== RUINAS DE LA VIDA ===================
		ruinas_vida: {
			name: 'Ruinas de la Vida', short: 'Ruinas', region: 'alola', kind: 'area', map: { x: 78, y: 72 },
			bg: { type: 'ruins', ground: '#c4a06a', far: '#e98aa8' },
			desc: 'Un templo de piedra rosa en lo alto de un acantilado, con escaleras anchas y columnas cubiertas de flores. El aire huele dulce. Muy dulce. Demasiado dulce, como si alguien hubiera echado perfume por todas partes.\n\nEn la explanada, delante del templo, un círculo de piedra con la marca de un rombo. Aquí se celebra la **Gran Prueba de Akala**.',
			descs: [
				{ cond: 'beat("mayla_gp")', text: 'Las Ruinas de la Vida, en lo alto del acantilado. Las flores de las columnas se han abierto todas a la vez. El aire sigue oliendo dulce, pero ya no empalaga.\n\nEn el círculo de piedra quedan marcas de garras y de algo muy pesado que cayó desde muy alto.' },
			],
			links: ['konikoni'],
			mapNote: 'Gran Prueba de la kahuna Mayla (Roca)',
			spots: [
				{ label: 'El círculo de la Gran Prueba', sub: 'Mayla espera con los brazos cruzados', icon: '🪨', cond: PRUEBAS + ' && !beat("mayla_gp")', new: 'true', talk: [{ script: 'b05_mayla_gp' }] },
				{ label: 'El círculo de la Gran Prueba', sub: 'Vacío. Mayla no está', icon: '🪨', cond: '!(' + PRUEBAS + ')', talk: [{ script: 'b05_ruinas_pronto' }] },
				{ label: 'El círculo de la Gran Prueba', sub: 'Marcas de garras en la piedra', icon: '🪨', cond: 'beat("mayla_gp")', talk: [{ script: 'b05_ruinas_despues' }] },
				{ label: 'La puerta del templo', sub: 'Cerrada. Huele a flores', icon: '🌸', talk: [{ script: 'b05_templo_lele' }] },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Kantai: Mega ajena (opcional) -----
		kantai_iolana: { name: 'Azucena', cls: 'Turista', ai: 3, iv: 24, reward: 3400, gimmick: 'mega', ace: 'altaria',
			team: [
				{ sp: 'pelipper', lv: 55, moves: ['hurricane', 'scald', 'uturn', 'roost'], ability: 'drizzle', nature: 'modest' },
				{ sp: 'comfey', lv: 55, moves: ['drainingkiss', 'gigadrain', 'calmmind', 'synthesis'], ability: 'triage', nature: 'calm' },
				{ sp: 'altaria', lv: 57, moves: ['hypervoice', 'dragonpulse', 'flamethrower', 'roost'], ability: 'naturalcure', item: 'altarianite', nature: 'modest' },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: '¡Vengo de Hoenn a ver el cielo de Alola! Me dijeron que al atardecer se pone de colores. Mi Altaria lleva una semana mirando arriba y no le gusta lo que ve. ¿Combatimos? Así se distrae.',
			win: 'Qué bonito ha sido. Altaria canta cuando pierde bien. No le pasa casi nunca.',
			lose: 'Altaria está contento. Es raro verlo contento estos días.',
			look: { hair: 'long', hairColor: '#4a8ac4', outfit: '#e9e8e0', outfit2: '#8ab0e0', skin: 1, eyesStyle: 'happy', mouth: 'smile', acc: 'hat flower' } },

		// ----- Ruta 4 -----
		ak4_marlene: { name: 'Marlene', cls: 'Ranchera', ai: 2,
			team: [
				{ sp: 'mudsdale', lv: 55, moves: ['highhorsepower', 'heavyslam', 'rocktomb', 'bodyslam'] },
				{ sp: 'stoutland', lv: 56, moves: ['crunch', 'playrough', 'wildcharge', 'takedown'] },
			],
			intro: '¡Alto ahí, que vas corriendo! En la Ruta 4 se camina. Si corres, los Mudsdale se ofenden. Y yo también. ¡Combate!',
			win: 'Ya, ya. Puedes correr. Un poquito.',
			look: { hair: 'braids', hairColor: '#4a2a1a', outfit: '#8a5a2f', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'sharp', mouth: 'grin', acc: 'hat bandana', hatColor: '#c9a66b' } },
		ak4_ikaika: { name: 'Ikaika', cls: 'Joven', ai: 2,
			team: [
				{ sp: 'toucannon', lv: 55, moves: ['beakblast', 'rockblast', 'bulletseed', 'drillpeck'] },
				{ sp: 'gumshoos', lv: 56, moves: ['crunch', 'superfang', 'earthquake', 'firefang'] },
			],
			intro: 'Mi Gumshoos lleva tres días persiguiendo a un Raticate que no es de aquí. Uno gordo, de Kanto. ¡Se le escapa siempre! Contigo a lo mejor se desahoga.',
			win: 'Pues no se ha desahogado. Ahora persigue a tu Pokémon con la mirada.',
			look: { hair: 'spiky', hairColor: '#2a2420', outfit: '#3a8a6a', outfit2: '#e9e3d0', skin: 5, eyesStyle: 'normal', mouth: 'grin', collar: 'tshirt' } },
		ak4_noelani: { name: 'Leimomi', cls: 'Chica', ai: 2,
			team: [
				{ sp: 'wigglytuff', lv: 56, moves: ['hypervoice', 'playrough', 'sing', 'dazzlinggleam'] },
				{ sp: 'raticatealola', lv: 56, moves: ['suckerpunch', 'crunch', 'hyperfang', 'swordsdance'] },
			],
			intro: 'Le canto a los Mudsdale para que den más leche. ¿Que los Mudsdale no dan leche? Pues por eso hay que cantarles más.',
			win: 'Tú no necesitas que te canten. Se nota.',
			look: { hair: 'curly', hairColor: '#2a2420', outfit: '#e98aa8', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'happy', mouth: 'open', acc: 'flower' } },

		// ----- Rancho Ohana (zona de entrenamiento) -----
		rancho_ohana_1: { name: 'Kimo', cls: 'Vaquero', ai: 2,
			team: [
				{ sp: 'tauros', lv: 56, moves: ['doubleedge', 'earthquake', 'zenheadbutt', 'rockslide'] },
				{ sp: 'miltank', lv: 57, moves: ['bodyslam', 'milkdrink', 'playrough', 'earthquake'] },
			],
			intro: 'Primer día como vaquero. Llevo seis años. Es que la capataza no me firma el segundo día.',
			win: 'Hoy tampoco me lo firma. Ya lo veo venir.',
			look: { hair: 'short', hairColor: '#3a2a1e', outfit: '#c4743a', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'sleepy', mouth: 'smile', acc: 'hat', hatColor: '#8a5a2f' } },
		rancho_ohana_2: { name: 'Makana', cls: 'Domadora', ai: 2,
			team: [
				{ sp: 'mudsdale', lv: 57, moves: ['highhorsepower', 'heavyslam', 'closecombat', 'rocktomb'] },
				{ sp: 'stoutland', lv: 57, moves: ['crunch', 'playrough', 'wildcharge', 'facade'] },
			],
			intro: 'En todo Akala, solo yo domo Mudsdale con una mano. Lo dice mi tarjeta de visita. La escribí yo, pero lo dice.',
			win: 'Con una mano no. Ahora entiendo por qué la gente usa dos.',
			look: { hair: 'ponytail', hairColor: '#4a2a1a', outfit: '#3b5bb5', outfit2: '#c4a06a', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'hat', hatColor: '#c9a66b' } },
		rancho_ohana_3: { name: 'Palani', cls: 'Vaquero', ai: 3,
			team: [
				{ sp: 'tauros', lv: 58, moves: ['doubleedge', 'closecombat', 'zenheadbutt', 'earthquake'] },
				{ sp: 'dodrio', lv: 57, moves: ['bravebird', 'drillrun', 'swordsdance', 'quickattack'] },
			],
			intro: 'Este Dodrio llegó por una grieta del cielo hace un mes. Ahora es del rancho. Dice la capataza que aquí no se pregunta de dónde viene nadie. Solo si trabaja.',
			win: 'Trabaja. Lo que no hace es ganar. Tampoco se lo pedimos.',
			look: { hair: 'short', hairColor: '#e9e3d0', outfit: '#8a5a2f', outfit2: '#e9e3d0', skin: 3, eyesStyle: 'happy', mouth: 'grin', acc: 'hat mustache', hatColor: '#c9a66b' } },

		// ----- Ruta 5 -----
		ak5_pono: { name: 'Nalu', cls: 'Cazabichos', ai: 2,
			team: [
				{ sp: 'charjabug', lv: 55, moves: ['bugbite', 'discharge', 'xscissor', 'crunch'] },
				{ sp: 'lurantis', lv: 56, moves: ['leafblade', 'xscissor', 'solarblade', 'superpower'] },
			],
			intro: 'Mi Charjabug quiere evolucionar y no le sale. Dicen que en algún sitio de Alola hay un campo magnético perfecto. Yo creo que es mentira. Él cree que no. ¡Combate!',
			win: 'Él sigue creyendo que no. Bien por él.',
			look: { hair: 'cap', hairColor: '#2a2420', outfit: '#6a9a5a', outfit2: '#f2c43a', skin: 4, eyesStyle: 'happy', mouth: 'grin', capColor: '#f2c43a' } },
		ak5_mahina: { name: 'Mahina', cls: 'Montañera', ai: 2,
			team: [
				{ sp: 'bewear', lv: 56, moves: ['hammerarm', 'doubleedge', 'payback', 'shadowclaw'] },
				{ sp: 'golduck', lv: 56, moves: ['scald', 'icebeam', 'psychic', 'calmmind'] },
			],
			intro: 'Mi Bewear me abraza cuando me ve triste. Me rompió dos costillas el martes. Hoy estoy contentísima. ¡Contentísima!',
			win: 'No me abraces. No me abraces. Bueno, un poquito.',
			look: { hair: 'bun', hairColor: '#3a2a1e', outfit: '#8a5a2f', outfit2: '#6a9a5a', skin: 3, eyesStyle: 'normal', mouth: 'smile', acc: 'bandana' } },
		ak5_kawika: { name: 'Kawika', cls: 'Pescador', ai: 2,
			team: [
				{ sp: 'pyukumuku', lv: 56, moves: ['soak', 'recover', 'toxic', 'counter'] },
				{ sp: 'seaking', lv: 57, moves: ['waterfall', 'megahorn', 'drillrun', 'poisonjab'] },
			],
			intro: 'No pesco con caña desde que vi a la capitana pescar con la mano. Llevo un mes. Todavía no he pescado nada. Pero estoy muy cerca. Creo.',
			win: 'Con la mano tampoco se gana. Lo apunto.',
			look: { hair: 'cap', hairColor: '#cfd6e2', outfit: '#3a6a8a', outfit2: '#e9e3d0', skin: 3, eyesStyle: 'sleepy', mouth: 'flat', acc: 'beard', capColor: '#3a6a8a' } },

		// ----- Ruta 8 -----
		ak8_kai: { name: 'Kai', cls: 'Surfista', ai: 2,
			team: [
				{ sp: 'pelipper', lv: 56, moves: ['hurricane', 'scald', 'uturn', 'roost'] },
				{ sp: 'golisopod', lv: 57, moves: ['firstimpression', 'liquidation', 'leechlife', 'razorshell'] },
			],
			intro: '¡Las olas de la Ruta 8 son las mejores de Akala! Bueno, eran. Hace una semana que a media tarde el mar se queda quieto. Muy quieto. ¡Y yo con la tabla!',
			win: 'Ni olas ni victoria. Hoy es un día de mar quieto.',
			look: { hair: 'waves', hairColor: '#e9c46a', outfit: '#3aa8c4', outfit2: '#e9e8e0', skin: 3, eyesStyle: 'happy', mouth: 'grin', collar: 'tshirt' } },
		ak8_hoku: { name: 'Hoku', cls: 'Bailarina', ai: 2,
			team: [
				{ sp: 'oricorio', lv: 56, moves: ['revelationdance', 'airslash', 'roost', 'featherdance'] },
				{ sp: 'oricoriopau', lv: 56, moves: ['revelationdance', 'hurricane', 'roost', 'calmmind'] },
			],
			intro: 'Voy al volcán a aprender a bailar con Kiawe. Dicen que si bailas bien, el fuego te sigue. Si bailas mal, también, pero de otra manera.',
			win: 'Me ha faltado ritmo. Y fuego. Y un poco de todo.',
			look: { hair: 'long', hairColor: '#2a2420', outfit: '#c43a3a', outfit2: '#f2c84a', skin: 4, eyesStyle: 'happy', mouth: 'smile', acc: 'flower' } },
		ak8_pua: { name: 'Pua', cls: 'Pescador', ai: 2,
			team: [
				{ sp: 'toxapex', lv: 57, moves: ['scald', 'toxic', 'recover', 'venoshock'] },
				{ sp: 'octillery', lv: 56, moves: ['octazooka', 'fireblast', 'icebeam', 'gunkshot'] },
			],
			intro: 'Desde aquí arriba se ve la caleta de abajo. Ayer había una caseta azul. Hoy no. Mañana, ¿quién sabe? Yo solo pesco. Y me fijo.',
			win: 'Fíjate tú también. Abajo. En la caleta.',
			look: { hair: 'bald', hairColor: '#cfd6e2', outfit: '#3a6a8a', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'sleepy', mouth: 'flat', acc: 'beard' } },
		ak8_lani: { name: 'Malie', cls: 'Excursionista', ai: 2,
			team: [
				{ sp: 'crabominable', lv: 57, moves: ['icehammer', 'closecombat', 'earthquake', 'thunderpunch'] },
				{ sp: 'salazzle', lv: 57, moves: ['flamethrower', 'sludgebomb', 'dragonpulse', 'nastyplot'] },
			],
			intro: 'Bajo del volcán. Kiawe me ha echado del escenario. Dice que bailo como un Crabominable. ¡Mi Crabominable baila muy bien, para que lo sepas!',
			win: 'Bueno. Bailamos mal los dos. Pero con estilo.',
			look: { hair: 'ponytail', hairColor: '#c4743a', outfit: '#8a3a2a', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'sharp', mouth: 'grin', acc: 'bandana' } },

		// ----- Wela -----
		wela_hulali: { name: 'Hulali', cls: 'Bailarina', ai: 2,
			team: [
				{ sp: 'oricorio', lv: 57, moves: ['revelationdance', 'hurricane', 'roost', 'teeterdance'] },
				{ sp: 'magmar', lv: 57, moves: ['flamethrower', 'thunderpunch', 'psychic', 'clearsmog'] },
			],
			intro: 'Kiawe dice que el fuego no se baila: se escucha. Yo lo bailo igual. ¡Escucha esto!',
			win: 'Escuchado. Muy alto. Me pitan los oídos.',
			look: { hair: 'long', hairColor: '#c43a3a', outfit: '#f2c84a', outfit2: '#c43a3a', skin: 4, eyesStyle: 'happy', mouth: 'open', acc: 'flower' } },

		// ----- Kiawe (capitán) -----
		kiawe_1: { name: 'Kiawe', cls: 'Capitán', npc: 'kiawe', ai: 4, iv: 27, reward: 4600, bg: 'mountain',
			team: [
				{ sp: 'marowakalola', lv: 56, moves: ['flareblitz', 'shadowbone', 'bonemerang', 'willowisp'], ability: 'cursedbody', nature: 'adamant', iv: 26 },
				{ sp: 'turtonator', lv: 56, moves: ['flamethrower', 'dragonpulse', 'bodypress', 'shelltrap'], ability: 'shellarmor', nature: 'modest', iv: 27 },
				{ sp: 'arcanine', lv: 58, moves: ['flareblitz', 'extremespeed', 'crunch', 'wildcharge'], ability: 'intimidate', item: 'sitrusberry', nature: 'adamant', iv: 28 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'El fuego no se gana. Se baila. ¡Marowak, el ritmo! ¡Arcanine, el final!',
			win: '…Has bailado bien. Sin moverte. Eso es lo más difícil.',
			lose: 'Respira. El fuego también descansa entre llama y llama.' },

		// ----- Rhi (opcional) -----
		rhi_6: { name: 'Rhi', cls: 'Rival', npc: 'rhi', ai: 3, iv: 27, reward: 3500, bg: 'mountain',
			team: [
				{ sp: 'falinks', lv: 55, moves: ['closecombat', 'megahorn', 'rockslide', 'ironhead'], ability: 'battlearmor', nature: 'adamant', iv: 26 },
				{ sp: 'sirfetchd', lv: 56, moves: ['leafblade', 'brutalswing', 'closecombat', 'knockoff'], ability: 'steadfast', item: 'leek', nature: 'adamant', iv: 27 },
				{ sp: 'toxtricity', lv: 56, moves: ['overdrive', 'sludgebomb', 'hypervoice', 'voltswitch'], ability: 'punkrock', nature: 'modest', iv: 27 },
				{ sp: 'corviknight', lv: 57, moves: ['bravebird', 'ironhead', 'bodypress', 'uturn'], ability: 'mirrorarmor', nature: 'impish', iv: 27 },
				{ sp: 'cinderace', lv: 58, moves: ['pyroball', 'bounce', 'uturn', 'zenheadbutt'], ability: 'blaze', item: 'oranberry', nature: 'jolly', iv: 29 },
			],
			items: [{ id: 'superpotion', n: 1 }],
			intro: '¡Partido en campo volcánico! ¡El césped no aguanta, pero yo sí! ¡Cinderace sale al final, que es donde se marcan los goles!',
			win: 'Fuera de juego. Ha sido fuera de juego. …No. Ha sido gol. Tuyo. Lo odio.',
			lose: '¡GOOOL! ¡Por la escuadra! ¡Con calor y todo!' },

		// ----- Lulú (opcional) -----
		lulu_1: { name: 'Lulú', cls: 'Capitana', npc: 'lulu', ai: 3, iv: 25, reward: 3600,
			team: [
				{ sp: 'shiinotic', lv: 55, moves: ['moonblast', 'gigadrain', 'spore', 'strengthsap'], ability: 'effectspore', nature: 'calm', iv: 25 },
				{ sp: 'tsareena', lv: 56, moves: ['tropkick', 'lowsweep', 'uturn', 'knockoff'], ability: 'queenlymajesty', nature: 'jolly', iv: 26 },
				{ sp: 'lurantis', lv: 57, moves: ['leafblade', 'xscissor', 'superpower', 'synthesis'], ability: 'contrary', item: 'miracleseed', nature: 'adamant', iv: 27 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: '¡De postre, un combate! Mis Pokémon han comido bien. ¡Los tuyos, espero que también!',
			win: '¡Uy! Esto me pasa por servir el postre antes del plato fuerte.',
			lose: '¡Bien rico! Pásate a merendar cuando quieras. A combatir, también.' },

		// ----- Mayla (Gran Prueba) -----
		mayla_gp: { name: 'Mayla', cls: 'Kahuna', npc: 'mayla', ai: 4, iv: 29, reward: 7100, bg: 'ruins',
			gimmick: 'z', ace: 'lycanrocmidnight',
			team: [
				{ sp: 'carbink', lv: 56, moves: ['moonblast', 'powergem', 'reflect', 'psychic'], ability: 'sturdy', nature: 'bold', iv: 27 },
				{ sp: 'relicanth', lv: 57, moves: ['rockslide', 'aquatail', 'earthquake', 'yawn'], ability: 'rockhead', nature: 'adamant', iv: 28 },
				{ sp: 'golemalola', lv: 56, moves: ['rockslide', 'doubleedge', 'earthquake', 'thunderpunch'], ability: 'galvanize', nature: 'adamant', iv: 28 },
				{ sp: 'probopass', lv: 58, moves: ['powergem', 'earthpower', 'thunderbolt', 'flashcannon'], ability: 'magnetpull', item: 'sitrusberry', nature: 'modest', iv: 29 },
				{ sp: 'lycanrocmidnight', lv: 59, moves: ['rockslide', 'crunch', 'counter', 'psychicfangs'], ability: 'keeneye', item: 'rockiumz', nature: 'adamant', iv: 30 },
			],
			items: [{ id: 'superpotion', n: 2 }],
			intro: 'Tengo una tasación a las cinco. No me hagas llegar tarde. ¡Carbink, brilla!',
			win: 'Una piedra con buen corte. Y yo que te había tasado a la baja.',
			lose: 'Vuelve cuando hayas pulido un poco más. Te espero. Pero no mucho.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LLEGADA A KANTAI ===================
		b05_kantai_llegada: [
			{ set: { 'flag.b05_kantai_llegada': true } },
			{ text: 'El ferry atraca con un golpe suave y un pitido que hace volar a todas las gaviotas a la vez. Kantai huele a gasóleo, a sal y, desde algún puesto que no ves, a malasada.' },
			{ text: 'Grúas. Contenedores de colores. Un Machamp descarga cajas con los cuatro brazos y silba con la boca. En el muelle, junto a una persiana a medio subir, hay un cartel pintado a mano: **TALLER KAHALE · MONTURAS**. Debajo, más pequeño: «y lo que haga falta».' },
			{ say: 'rotom', text: '¡Bzzt! ¡Akala! Segunda isla. Aquí el recorrido tiene **dos pruebas**: la capitana **Nereida**, en la **Colina Saltagua** (pasando Ohana por la Ruta 5), y el capitán **Kiawe**, en el **volcán**, desde la **Ruta 8**. Y luego la Gran Prueba con la kahuna.' },
			{ say: 'rotom', text: 'Y el taller de Leilani está aquí mismo. Con la persiana a medio subir. Se oyen martillazos. Y un robot que dice «excelente».' },
			{ if: LUC, then: [
				{ text: '{riolu} se ha quedado mirando el edificio blanco de al lado del taller, el de la antena en forma de anillo. Las orejas hacia delante. No gruñe. Escucha, como quien oye una radio mal sintonizada.' },
			] },
			{ quest: 'b05_m3', stage: 'pruebas' },
		],
		b05_akala_pendiente: [
			{ say: 'rotom', text: '¡Bzzt! Lista de cosas en Akala:' },
			{ say: 'rotom', text: '• Leilani nos espera en su **taller**, en el muelle de Kantai.', cond: '!flag.b05_leilani_taller' },
			{ say: 'rotom', text: '• Leilani quiere que recojamos algo en el **Centro de Investigaciones Dimensionales**, al lado de su taller.', cond: 'flag.b05_leilani_taller && !flag.b05_carta_leida' },
			{ say: 'rotom', text: '• Leilani querrá saber si la carta era larga. Está en su taller.', cond: CARTA_PEND },
			{ say: 'rotom', text: '• La prueba de **Nereida**, en la **Colina Saltagua**: Ruta 4, Ohana, Ruta 5.', cond: '!flag.b05_nereida_hecha' },
			{ say: 'rotom', text: '• Leilani quería probar su invento con un Pokémon grande. Algo pasa en la **Colina Saltagua**.', cond: 'flag.b05_leilani_taller && flag.b05_nereida_hecha && !flag.b05_ridegear' },
			{ say: 'rotom', text: '• La prueba de **Kiawe**, en el **Área Volcánica del Wela**: sale un sendero de la **Ruta 8**.', cond: '!flag.b05_kiawe_hecha' },
			{ say: 'rotom', text: '• ¡Las dos pruebas hechas! La kahuna **Mayla** nos espera en las **Ruinas de la Vida**, al sur de **Konikoni**.', cond: PRUEBAS + ' && !beat("mayla_gp")' },
			{ say: 'rotom', text: '• En la Ruta 8 hay una caleta a la que solo se llega por mar. Con Lapras, ya podemos.', cond: 'flag.mount_lapras && !flag.b05_ulises_caleta' },
			{ say: 'rotom', text: '• Mayla tiene algo en su joyería para tu Pupitar. O tu Tyranitar. ¡O tu Larvitar!', cond: 'flag.b05_mayla_conocida && ' + TT + ' && !flag.b05_tyranitarita' },
			{ say: 'rotom', text: '¡Ya está todo! Hay un barco blanco en Kantai esperando. Muy blanco. Sospechosamente blanco.', cond: 'flag.b05_aether_invitacion' },
		],

		// =================== TALLER KAHALE ===================
		b05_leilani_taller: [
			{ set: { 'flag.b05_leilani_taller': true } },
			{ text: 'Dentro del taller hace más calor que fuera. Un Turtonator duerme en la esquina con el caparazón al rojo, y encima, en una parrilla, se tuestan tres cocos y una llave inglesa.' },
			{ text: 'De debajo de una silla de montar enorme asoman dos piernas con botas de seguridad y un overol lleno de grasa. Un Togedemaru hecho una bola rueda hacia ti, te huele los zapatos y vuelve corriendo a avisar.' },
			{ say: 'leilani', text: '¿Qué? ¿Quién? ¿Ya? —Se oye un golpe seco—. ¡Au! —Leilani sale arrastrándose, con las gafas de soldar torcidas y una mancha de aceite en la nariz—. ¡{jugador}! ¡Viniste! ¡Viniste-viniste! Pensé que lo de «búscame» lo habías tomado como un «adiós educado».' },
			{ say: 'leilani', text: 'Perdón por el desorden. Es un desorden organizado. Bueno, no. Es un desorden. Pero yo sé dónde está todo. Menos el destornillador de estrella. Ese nadie sabe dónde está. Ni el destornillador.' },
			{ text: 'Por encima de la mesa de trabajo, un brazo robótico con un soplete gira la «cabeza» hacia ti. Tiene un altavoz pegado con cinta.' },
			{ say: 'soldabot', text: 'Visita detectada. Excelente. Otra persona que no va a limpiar nada.' },
			{ say: 'leilani', text: 'No le hagas caso, es Soldi. Lo programé para que me diera ánimos. Algo salió mal. Bueno, algo salió muy bien, porque es muy sincero. ¿Sí o qué, Soldi?' },
			{ say: 'soldabot', text: 'Afirmativo. Sincero. Para ser una máquina hecha por ti.' },
			{ choice: [
				{ text: 'Reírte.', then: [
					{ af: { leilani: 1 } },
					{ say: 'leilani', text: '¡Se ríe! ¡Soldi, se ríe! Por fin alguien que no me mira como si tuviera que llamar a un técnico. Bueno, yo soy la técnica. Ese es el problema.' },
				] },
				{ text: '«¿Lo hiciste tú sola? Es increíble.»', then: [
					{ af: { leilani: 2 } },
					{ say: 'leilani', text: '¿Increíble? ¿Soldi? —Se le iluminan los ojos un segundo; luego se encoge de hombros—. Bah. Es un brazo con mala leche. Cualquiera hace uno. Bueno, cualquiera no. Pero cualquiera con tiempo libre y ningún amigo. O sea, yo.' },
				] },
				{ text: '«Un robot que insulta. Qué utilidad.»', then: [
					{ af: { leilani: -3 } },
					{ say: 'leilani', text: 'Ya. Ya, claro. —Se rasca la nuca con la llave inglesa—. No todo tiene que servir para algo, ¿no? Algunas cosas solo… acompañan.' },
					{ say: 'soldabot', text: 'Comentario registrado. Excelente. Le recordaré esto.' },
				] },
			] },
			{ say: 'leilani', text: 'Bueno. ¡Bueno! Te debo una por lo del Paseo, así que te voy a enseñar lo más importante que he hecho en mi vida. Hasta hoy. Mañana igual hago algo mejor. O lo rompo.' },
			{ text: 'Abre un cajón y saca, envuelto en un trapo de cocina, un brazalete de cuero y metal con una pantallita rajada y tres botones. Uno de ellos está pegado con cinta aislante.' },
			{ say: 'leilani', text: 'El **Ride Gear**. Versión… —cuenta con los dedos y se queda sin dedos—. Versión muchas. Con esto puedes llamar a una montura en cualquier región. Teóricamente. Con un Pokémon de tierra ya funciona. Los Mudsdale de Ohana lo aman.' },
			{ if: 'flag.mount_rhyhorn', then: [
				{ say: 'leilani', text: '¿Tienes un Rhyhorn? ¡Claro que tienes un Rhyhorn, se te nota en las rodillas! Pues con esto, tu Rhyhorn te va a responder en cualquier parte. En Kalos, en Johto, en el fondo del mar no, que se ahoga. Pero en cualquier otra parte.' },
			] },
			{ say: 'leilani', text: 'Lo que no me sale es el agua. Necesito calibrarlo con un Pokémon grande, de agua, que aguante la descarga sin enojarse. Y aquí todos los de agua grandes me tienen miedo. Me pasó una vez con un Wailord. Una vez. Y ya se corrió la voz.' },
			{ say: 'leilani', text: 'La capitana **Nereida**, en la **Colina Saltagua**, tiene Pokémon de agua que no se asustan de nada. Si vas para allá, voy detrás. Con mi caja. Bueno, con Soldi no, que se marea.' },
			{ quest: 'b05_t_leilani', stage: 'lapras' },
			{ text: 'Mientras habla, notas que, sin darse cuenta, se ha colocado entre tú y la pared del fondo. En la pared hay una foto sujeta con un imán: una mujer con el mismo pelo rizado y una llave inglesa al hombro, riéndose de algo que no sale en la foto.' },
			{ choice: [
				{ text: '«¿Quién es la de la foto?»', then: [
					{ say: 'leilani', text: '¿La de la…? Ah. Esa. —Mira la foto. No se ríe. Por primera vez desde que entraste, no se ríe—. Mi mamá. Malia. Trabajaba en el edificio de al lado, el de la antena. Ingeniera.' },
				] },
				{ text: 'No preguntar. Esperar.', then: [
					{ text: 'No dices nada. Leilani se da cuenta de que no dices nada. Se gira hacia la foto.' },
					{ say: 'leilani', text: 'Mi mamá. Malia. —Lo dice sin chiste. Le sale raro, como un traje que no es de su talla—. Ingeniera. Del edificio de al lado.' },
				] },
			] },
			{ say: 'leilani', text: 'Se fue a arreglar una cosa hace nueve años. Un agujero en el cielo, de esos de los que hablan en la tele. Y sigue arreglándolo, supongo. Es muy perfeccionista. —Intenta sonreír. No le sale del todo.' },
			{ say: 'leilani', text: 'En el Centro de al lado tienen un sobre con mi nombre. Desde aquella noche. La profesora me lo guarda. Nunca lo he recogido, porque si lo recojo es que… bueno. Es que lo recojo.' },
			{ say: 'leilani', text: '¿Me harías un favor raro? Recógelo tú. No me lo traigas. Léelo. Y si es largo, me dices que es largo. Solo eso. ¿Sí o qué?' },
			{ choice: [
				{ text: '«Claro que sí.»', then: [
					{ af: { leilani: 2 } },
					{ say: 'leilani', text: 'Gracias. —Muy bajito. Luego, muy alto—: ¡Bueno! ¡A trabajar! ¡Soldi, la música!' },
					{ say: 'soldabot', text: 'Reproduciendo «música». Excelente elección. Si te gusta el ruido.' },
				] },
				{ text: '«¿No deberías leerlo tú?»', then: [
					{ say: 'leilani', text: 'Debería. Sí. Lo sé. —Se ajusta las gafas, aunque no le hace falta—. Por eso te lo pido a ti. Para poder seguir no haciéndolo un rato más.' },
				] },
			] },
			{ quest: 'b05_t_malia', stage: 'carta' },
			{ intel: { npc: 'leilani', text: 'Mecánica de monturas en Kantai. Ha hecho un Ride Gear que funciona con Pokémon de tierra; le falta calibrarlo con uno de agua grande. Su madre, Malia, ingeniera del Centro de Investigaciones Dimensionales, se fue «a arreglar un agujero en el cielo» hace nueve años. Hay un sobre para ella en el Centro que nunca ha recogido.' } },
		],
		b05_leilani_carta: [
			{ set: { 'flag.b05_leilani_carta': true } },
			{ text: 'Leilani está soldando algo que no necesita soldarse. Cuando entras, apaga el soplete. No se gira.' },
			{ say: 'leilani', text: '¿Y? —Pausa—. ¿Era larga?' },
			{ choice: [
				{ text: '«Es larga.»', then: [
					{ say: 'leilani', text: 'Claro que es larga. Mi mamá no sabía escribir una lista de la compra en menos de tres páginas. —Se ríe por la nariz—. Larga. Bueno. Bien.' },
				] },
				{ text: '«Es tuya. Cuando quieras.»', then: [
					{ af: { leilani: 2 } },
					{ say: 'leilani', text: 'Cuando quiera. —Lo repite como si probara la frase—. Me gusta cómo suena eso. Como si hubiera tiempo.' },
				] },
				{ text: '«Habla de ti. Mucho.»', then: [
					{ say: 'leilani', text: '…—Se le van los ojos a la foto. Vuelven—. Seguro que habla de que dejaba los tornillos en el suelo. Siempre los dejaba en el suelo. Todavía los dejo en el suelo.' },
				] },
			] },
			{ say: 'leilani', text: 'Guárdamela tú. No la pierdas, ¿eh? A ti no te tiembla el pulso. A mí ahora mismo me tiembla hasta el soplete.' },
			{ say: 'soldabot', text: 'Afirmativo. Tiembla. Excelente pulso para ser humana.' },
			{ say: 'leilani', text: 'Cállate, Soldi. —Se le escapa la risa, de verdad esta vez—. Cállate.' },
		],
		b05_leilani_generico: [
			{ if: 'flag.b05_ridegear', then: [
				{ say: 'leilani', text: '¡{jugador}! ¿Qué tal Lapras? ¿Te obedece? ¿Te habla? ¡No me digas que te habla, que entonces lo he roto! —Sigue dibujando Lapras en un cuaderno, uno detrás de otro—. Estoy pensando en una versión con aletas. Para ti, no. Para mí.' },
				{ say: 'soldabot', text: 'Versión con aletas. Excelente. Otra cosa que no terminarás.' },
				{ say: 'leilani', text: 'Que sí la termino. Algún día. Yo termino todo algún día.' },
			], else: [
				{ say: 'leilani', text: '¿Ya fuiste a la Colina Saltagua? Nereida es buena gente. Te dirá que pescó un Wailord con la mano. No te rías. Bueno, sí, ríete, pero por dentro.', cond: '!flag.b05_nereida_hecha' },
				{ say: 'leilani', text: '¿Ya pasaste la prueba de Nereida? ¡Pues voy para allá en cuanto encuentre la caja de herramientas! Que está… —mira alrededor—. Debajo de Turtonator. Claro.', cond: 'flag.b05_nereida_hecha' },
			] },
		],
		b05_soldabot: [
			{ say: 'soldabot', text: 'Hola. Soy el Asistente de Soldadura y Motivación, modelo Kahale-1. Mi función es animar a la creadora. Excelente trabajo, creadora. Para ser humana.' },
			{ say: 'soldabot', text: 'Llevo nueve años en este taller. La creadora me encendió a los quince años, una noche que no podía dormir. Desde entonces no ha dormido mucho más. Dato que comparto sin que me lo pidan. Excelente.', cond: 'flag.b05_carta_leida' },
			{ say: 'soldabot', text: 'Si encuentra el destornillador de estrella, no se lo diga. Me divierte verla buscarlo. Es lo único que me divierte.', cond: '!flag.b05_carta_leida' },
		],
		b05_foto_malia: [
			{ text: 'Una foto vieja, con las esquinas dobladas, sujeta con un imán con forma de Magnemite. Una mujer con el pelo rizado recogido con un lápiz, un overol con más bolsillos que tela y una llave inglesa apoyada en el hombro como una espada.' },
			{ text: 'Se ríe con la boca muy abierta, mirando a alguien que no sale en la foto. Por la altura de la mirada, ese alguien era bajito. Quince años, tal vez.' },
			{ text: 'Detrás, al fondo, se ve el edificio blanco de al lado. La antena en forma de anillo es la misma. Brilla.' },
		],

		// =================== CENTRO DE INVESTIGACIONES DIMENSIONALES ===================
		b05_pimpinela_intro: [
			{ set: { 'flag.b05_pimpinela_vista': true } },
			{ say: 'pimpinela', text: '¡Hola, hola! ¿Eres de la Gira? Te he visto en las noticias. Bueno, he visto a {riolu}. Tú salías un poco cortado por el borde. —Te ofrece la mano y una galleta—. Pimpinela. Dirijo este centro. Estudiamos los ultraumbrales.' },
			{ say: 'pimpinela', text: 'Son agujeros. Agujeros en el cielo, pequeños y raros, que llevan a otros sitios. No a otras regiones: a otros *sitios*. Como si el mundo tuviera trastienda.' },
			{ say: 'pimpinela', text: 'Últimamente se nos encienden puntitos en la pantalla que no deberían encenderse. Y el cielo de Alola, a media tarde, hace una cosa rara. Pero bueno, eso es trabajo. ¿Galleta?' },
		],
		b05_pimpinela_carta: [
			{ set: { 'flag.b05_carta_leida': true, 'flag.b05_pimpinela_vista': true } },
			{ text: 'La profesora Pimpinela está delante de la pantalla grande, con una taza que pone «LA MEJOR JEFA (según yo)». Cuando le dices que vienes de parte de Leilani, deja la taza en la mesa. Despacio.' },
			{ say: 'pimpinela', text: '¿Leilani te ha mandado a ti? —Te mira un rato largo, con mucho cariño y algo de cálculo, como quien comprueba un dato—. Nueve años. Nueve años sin pisar este edificio. Y te manda a ti. Bueno. Bueno. Eso ya es algo.' },
			{ say: 'pimpinela', text: 'Malia Kahale. La mejor ingeniera que ha tenido este centro. Hacía las piezas que los demás dibujábamos. Y luego nos decía por qué nuestros dibujos estaban mal. Siempre tenía razón. Era insoportable. La quería muchísimo.' },
			{ say: 'pimpinela', text: 'Hace nueve años se abrió un ultraumbral encima de la bahía. Grande. Inestable. Crecía. Si seguía creciendo, iba a tragarse media costa. Malia diseñó una forma de cerrarlo desde dentro: cruzar con un anclaje y coserlo, como quien cose un roto, desde el otro lado.' },
			{ say: 'pimpinela', text: 'Cruzó. El umbral se cerró. Ella no volvió.' },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca a la pantalla grande. Le pone la palma encima, en el punto de la bahía. El aura le brilla, muy poco. Luego aparta la mano y se la mira, como si hubiera tocado algo frío.' },
			] },
			{ say: 'pimpinela', text: 'El informe oficial dice «colapso espontáneo del umbral». Lo firmó su compañero de proyecto, el doctor **Calder Wynn**. Se fue del centro al año siguiente. Ahora trabaja para Lemnis, con los cielos.' },
			{ say: 'pimpinela', text: '¿Lo conoces? Claro, dio una charla en Hauoli para la Gira. Habla precioso. Siempre habló precioso. Esa noche no habló nada.', cond: 'flag.b05_calder_charla' },
			{ say: 'pimpinela', text: 'Los datos dicen eso: «colapso espontáneo». Yo respeto mucho los datos. Pero nunca me he creído del todo que esa noche nada fuera espontáneo.' },
			{ text: 'Abre un cajón con llave. Dentro, entre papeles con membrete del centro, hay un sobre amarillo, gastado por los bordes de tanto sacarlo y volverlo a guardar. Pone, con letra grande y rápida: «Para Lani. Si tardo».' },
			{ say: 'pimpinela', text: 'Lo dejó en mi mesa esa noche, antes de ponerse el traje. Dijo: «Si tardo, dáselo. Si no tardo, quémalo y no me digas nada». —Se ríe, triste—. Tardó.' },
			{ say: 'pimpinela', text: 'Leilani me ha llamado hace un rato. Me ha dicho que te lo dé a ti. Que a ti no te tiembla el pulso. —Te pone el sobre en las manos—. Léelo. Ella te lo ha pedido.' },
			{ give: 'cartamalia' },
			{ read: 'cartamalia' },
			{ text: 'Cuando levantas la vista, la profesora está mirando la planta del escritorio del fondo.' },
			{ say: 'pimpinela', text: '¿«Que sea Calder»? —Lo ha leído por encima de tu hombro; no se disculpa—. No sé qué quiso decir. Se lo pregunté a Calder una vez, hace años. Me dijo que tampoco lo sabía. Luego se fue a casa y no vino a trabajar en una semana.' },
			{ say: 'pimpinela', text: 'Guárdala bien. Y cuida de Lani. No se lo digas, que se enoja. Pero cuídala.' },
			{ quest: 'b05_t_malia', stage: 'hecha', done: true },
			{ intel: { npc: 'pimpinela', text: 'Malia Kahale cruzó hace nueve años un ultraumbral sobre la bahía de Kantai para cerrarlo desde dentro. Se cerró y no volvió. El informe («colapso espontáneo») lo firmó su compañero, Calder Wynn, que dejó el centro al año siguiente. Malia dejó una carta: «Si tardo».' } },
		],
		b05_pimpinela_generico: [
			{ if: 'flag.b05_carta_leida', then: [
				{ say: 'pimpinela', text: '¿Leilani está bien? No me lo digas si no. Bueno, sí, dímelo. Pero dímelo despacio.' },
				{ say: 'pimpinela', text: 'Esta semana se nos han encendido tres puntitos más en el mapa. Todos hacia el sur. Hacia Poni. Lo apunto. A lo mejor es el sensor. A lo mejor es el cielo.' },
			], else: [
				{ say: 'pimpinela', text: 'Si ves un agujero en el cielo, no te acerques. Y avísame. Primero no te acerques, luego avísame. En ese orden.' },
			] },
		],
		b05_cid_escritorio: [
			{ text: 'Un escritorio limpio. Una silla con la funda de cuando era nueva. Un portalápices con una llave inglesa pequeña dentro, en vez de lápices. Una placa: **M. KAHALE · INGENIERÍA**.' },
			{ text: 'La planta es una pata de elefante, con el tronco gordo y las hojas largas. Tiene la tierra húmeda. Alguien la riega todos los días desde hace nueve años.' },
			{ if: 'flag.b05_carta_leida', then: [
				{ text: 'En el borde de la mesa, a la altura de la rodilla, alguien ha rayado con un destornillador tres rayitas cortas y una larga. Muy pequeñas. Muy antiguas.' },
			] },
		],
		b05_cid_pantalla: [
			{ text: 'La pantalla grande muestra Alola desde arriba: las cuatro islas y, entre ellas, una quinta, pequeña y perfecta, blanca como un azulejo. Encima del mapa se encienden y se apagan puntitos de colores.' },
			{ text: 'La mayoría son azules. Algunos, verdes. Al sur, sobre **Isla Poni**, hay uno que no parpadea: está encendido siempre, en un violeta oscuro, casi negro. Al lado, una etiqueta escrita a mano: «¿sensor?».' },
			{ say: 'rotom', text: '¡Bzzt! A ese punto violeta no me gusta mirarlo. No sé por qué. Es como cuando te miran desde atrás.' },
		],

		// =================== OHANA ===================
		b05_ohana_mudsdale: [
			{ text: 'Un Mudsdale enorme bebe del abrevadero. Lleva una silla de montar que no se parece a ninguna: cuero, remaches de cobre, una antenita y un panel con dos lucecitas, una verde y una roja. La verde parpadea.' },
			{ say: 'ranchero_ohana', text: '¿Te gusta? La hizo la chica Kahale, la del taller de Kantai. Antes, este grandulón no dejaba que le subiera nadie. Desde que lleva la silla, me deja subir. Y además me avisa cuando va a llover. Bueno, la luz roja avisa. Él solo se para.' },
			{ say: 'ranchero_ohana', text: 'Últimamente la luz roja se enciende todos los días a media tarde. Y no llueve. La chica dice que es «interferencia». Yo digo que es el cielo, que está raro.' },
		],
		b05_ohana_abuelo: [
			{ text: 'Un señor muy mayor bebe agua del abrevadero con las manos, junto a un Tauros que bebe igual pero con la boca.' },
			{ say: 'ranchero_ohana', as: 'Señor del abrevadero', text: 'Setenta años bebiendo de aquí. El agua sabe igual que siempre. El cielo no. A media tarde se apaga un rato, ¿no lo has visto? Como cuando pasa una nube. Pero no pasa ninguna nube.' },
			{ say: 'ranchero_ohana', as: 'Señor del abrevadero', text: 'Mi abuela decía que, cuando el cielo de Alola se apaga, es que alguien se está comiendo la luz. Mi abuela decía muchas cosas. Esta me la creo.' },
		],

		// =================== RANCHO OHANA ===================
		b05_capataza: [
			{ say: 'capataza_ohana', text: '¿Vienes a entrenar o vienes a mirar? Si vienes a mirar, mira desde fuera de la cerca. Si vienes a entrenar, entra y no te caigas del caballo.' },
			{ choice: [
				{ text: '«Aquí no hay caballos.»', then: [
					{ say: 'capataza_ohana', text: 'Es un decir. Como «la leche no se derrama». Sí se derrama. Pero no aquí.' },
				] },
				{ text: '«¿Qué se gana si no me caigo?»', then: [
					{ say: 'capataza_ohana', text: 'Respeto. Y si ganas tres seguidos, algo que les enseñamos a los Mudsdale. Un pisotón que hace temblar las vallas. Nadie lo ha aprendido sin sudar.' },
				] },
			] },
			{ if: 'flag.b05_ridegear', then: [
				{ say: 'capataza_ohana', text: '¿Ese brazalete es de la chica Kahale? —Lo mira con respeto—. Esa niña tiene manos de oro y boca de chicharra. Dile que le debo dos sillas y una disculpa. Las sillas se las pago. La disculpa, ya veremos.' },
			] },
		],
		b05_premio_rancho: [
			{ say: 'capataza_ohana', text: 'Tres. Sin caerte. —Se baja el sombrero sobre los ojos, que es su manera de sonreír—. Ven al establo, que esto no se da en el corral.' },
			{ text: 'En el establo, colgado de un clavo junto a la herradura más grande que has visto nunca, hay un disco metálico en una funda de cuero con la marca del rancho.' },
			{ say: 'capataza_ohana', text: 'Los Mudsdale tienen un pisotón que no se enseña: se gana. Carga todo el peso del cuerpo en una pata y la deja caer. Las vallas tiemblan hasta el pueblo. Aquí lo llamamos «el saludo».' },
			{ give: 'b05_mt_fuerza_equina' },
			{ say: 'capataza_ohana', text: '**Fuerza Equina**. Úsala con respeto. Y si un día te cruzas con un Mudsdale salvaje que te lo hace a ti, quítate el sombrero. Se lo ha ganado.' },
		],
		b05_sueno_aura: [
			{ set: { 'flag.b05_sueno_aura': true } },
			{ text: 'La capataza te ofrece el pajar para pasar la noche: «Mejor que el Centro. Huele a heno, no a desinfectante». Aceptas.' },
			{ text: 'Esa noche, el rancho está en silencio. Los Tauros duermen en círculo. {riolu} se tumba a tus pies, con la espalda contra una bala de paja y la cara hacia la puerta del establo, como siempre.' },
			{ text: 'Tarda mucho en dormirse. Cuando por fin se duerme, el aura le brilla al ritmo de la respiración. Y sueñas.' },
			{ cutscene: { time: 'noche', weather: 'fog', tint: '#5a6a8a', bg: { type: 'coast', far: '#2a3448', ground: '#4a3a3a' }, start: 'dark', frames: [
				{ cam: 'pan-right', fx: 'light', text: 'Otra vez la isla. Rocas de color de hierro viejo, olas grises que rompen sin ruido. El mismo cielo gris. Pero esta vez es de noche, y en el acantilado hay una lámpara encendida.' },
				{ actors: [{ mon: 'lucario', key: 'viejo', at: 0.7, size: 'l', enter: 'fade', flip: true }], fx: 'aura', on: 'viejo', text: 'El Lucario viejo está junto a la lámpara. Su aura se enciende y se apaga despacio, como un faro que no quiere despertar a nadie.' },
				{ cam: 'pan-up', text: 'Detrás de él, el hombre del sombrero. Por primera vez no está de espaldas. Está de perfil. La lámpara le ilumina media cara y deja la otra media en la oscuridad.' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.24, size: 's', enter: 'fade' }], cam: 'still', text: 'Y habla. No a ti. A {riolu}, que está a tu lado en el sueño. Una sola palabra, en voz baja, sin volverse del todo.' },
				{ fx: ['heartbeat', 'ripple'], color: '#5a8ad8', cam: 'push', text: '«Vuelve».' },
				{ actors: [{ key: 'viejo', remove: true, exit: 'fade' }], fx: 'dark', cam: 'still', text: 'La lámpara se apaga. La ola rompe. Esta vez sí suena.' },
			] } },
			{ text: 'Te despiertas. Todavía es de noche. {riolu} está de pie en la puerta del establo, mirando hacia fuera. No hacia el mar. Hacia el norte. Hacia muy lejos.' },
			{ text: 'Lo llamas. Tarda en girarse. Cuando por fin vuelve y se tumba, lo hace pegado a ti, con la palma apoyada en tu brazo, como si quisiera asegurarse de que sigues ahí. O de que sigue él.' },
			{ happy: { who: 'riolu', n: 6 } },
		],
		b05_pajar: [
			{ text: 'El pajar del establo. Una lámpara, una manta doblada y heno que pica. Un Miltank asoma la cabeza por la puerta, te mira y decide que no vale la pena entrar.' },
		],

		// =================== COLINA SALTAGUA: NEREIDA ===================
		b05_nereida_intro: [
			{ set: { 'flag.b05_nereida_conocida': true } },
			{ text: 'En una roca lisa junto a la poza grande, una chica de pelo azul pesca con la mano. Literalmente: tiene el brazo metido en el agua hasta el codo y la cara de alguien que espera el autobús.' },
			{ text: 'A su lado, sentada en otra roca, con los pies en el agua y una toalla con un Starmie bordado en los hombros, hay alguien que conoces. Pelo naranja. Cara de competir hasta por quién se moja menos.' },
			{ say: 'misty', text: '¡Anda! ¡Si es mi aspirante favorit{o|a|e}! ¡{jugador}! —Se levanta de un salto y te salpica sin querer. O queriendo—. ¿Qué haces en Alola? No me lo digas: la Gira. ¡Yo también! «Intercambio de capitanes». Me han mandado de vacaciones con otro nombre.' },
			{ say: 'nereida', text: 'Hola. Soy Nereida. Capitana de la prueba de agua. —No saca el brazo del agua—. Ayer pesqué un Wailord así. Con la mano.' },
			{ choice: [
				{ text: '«¿En serio?»', then: [
					{ say: 'nereida', text: 'Sí. —Pausa larga. Cara totalmente seria—. Era mentira.' },
					{ say: 'misty', text: '¡Lleva toda la mañana! ¡Toda la mañana! Me ha dicho que su Araquanid habla francés. ¡Y casi me lo creo!' },
					{ say: 'nereida', text: 'Habla un poco.' },
				] },
				{ text: '«Era mentira, ¿verdad?»', then: [
					{ say: 'nereida', text: '…—Te mira. Por primera vez saca el brazo del agua—. Me caes bien. Eras mentira tú también, ¿a que sí?' },
					{ say: 'misty', text: '¿Eso qué significa? —Nadie le contesta—. ¡¿Qué significa?!' },
				] },
			] },
			{ say: 'nereida', text: 'Mi prueba es fácil. En la colina hay salpicaduras. Tres. Encuentras lo que salpica. La tercera es la grande. La grande muerde.' },
			{ say: 'nereida', text: 'Primero la charca de las **rocas planas**. Luego el arroyo de las **piedras negras**. Luego la **poza grande**. No te equivoques de orden, que el que salpica en la poza se ofende si llegas antes de tiempo.' },
			{ say: 'misty', text: '¡Y luego, si quieres, me cuentas qué tal! Que yo la he intentado esta mañana. Y la he pasado. Claro. —Pausa—. A la segunda.' },
		],
		b05_nereida_mientras: [
			{ say: 'nereida', text: 'Sigue la salpicadura. Siempre hay una. Si no la ves, es que no estás mirando donde no miras.' },
			{ say: 'misty', text: '¿Eso tiene sentido? —A ti—. ¿Tú le has encontrado sentido? Yo llevo dos días.' },
		],
		b05_saltagua_1: [
			{ text: 'La charca de las rocas planas. El agua está tan quieta que parece un espejo. Esperas. Esperas un poco más. Y, justo cuando miras hacia otro lado, ¡plaf!: una salpicadura enorme te moja enter{o|a|e}.' },
			{ text: 'En el centro de la charca, un Wishiwashi diminuto te mira con cara de culpa. Luego llama a sus amigos. Muchos amigos.' },
			{ wild: { sp: 'wishiwashi', lv: 55, unique: false }, canRun: false,
				onWin: [
					{ set: { 'flag.b05_saltagua_1': true } },
					{ text: 'El banco de Wishiwashi se deshace en cien pececitos que se van cada uno por su lado, muy ofendidos. La charca vuelve a estar quieta. Desde lejos, Nereida levanta el pulgar sin girarse.' },
				],
				onCatch: [
					{ set: { 'flag.b05_saltagua_1': true } },
					{ text: 'El Wishiwashi entra en la Poké Ball con todos sus amigos. Bueno, sin ellos. Pero con la actitud. Desde lejos, Nereida levanta el pulgar sin girarse.' },
				] },
		],
		b05_saltagua_2: [
			{ text: 'El arroyo de las piedras negras. Aquí el agua corre deprisa y salpica todo el rato, por todas partes. Imposible saber cuál de todas es *la* salpicadura.' },
			{ say: 'nereida', text: 'Esta se pesca. —Ha aparecido detrás de ti sin que la oigas. Te da una caña de bambú—. Con caña. Yo pesco con la mano, pero tú todavía no.' },
			{ minigame: { type: 'fish', id: 'b05_saltagua_arroyo', title: 'La segunda salpicadura', hint: 'Lo que salpica aquí pica fuerte y tira hacia el fondo. Espera el «!» y aguanta.', theme: 'rio', level: 2,
				guaranteed: ['mysticwater'], loot: [{ id: 'pearl', w: 6 }, { id: 'bigpearl', w: 2 }], picks: 1, consolation: 'pearl' },
				onWin: [
					{ set: { 'flag.b05_saltagua_2': true } },
					{ text: 'Del agua sale… una botellita de cristal azul, con un tapón de corcho y una etiqueta: **Agua Mística**.' },
					{ say: 'nereida', text: 'Ah, sí. Eso lo tiré yo esta mañana. Para probarte. —Pausa, cara seria—. No es mentira.' },
					{ say: 'misty', text: '¡Eso es trampa! —Desde la otra orilla—. ¡A mí me tiró una bota!' },
					{ say: 'nereida', text: 'Era una bota buena.' },
				],
				onLose: [
					{ say: 'nereida', text: 'Se ha escapado. Pasa. Las salpicaduras vuelven. Son así.' },
				],
				onQuit: [{ say: 'nereida', text: 'Cuando quieras. El arroyo no se va a ningún sitio. Bueno, sí. Pero vuelve.' }] },
		],
		b05_saltagua_dominante: [
			{ text: 'La poza grande. Te acercas a la orilla. El agua está quieta. Demasiado quieta. Las libélulas no se posan. Los Masquerain se han ido.' },
			{ say: 'nereida', text: 'Aquí está el que muerde. Es grande. Le gusta ser grande. Si vas a entrar, entra con todo el equipo entero.' },
			{ prompt: '¿Curar al equipo antes de acercarte a la poza?', choice: [
				{ text: 'Sí, gracias.', then: [{ heal: 'Nereida silba. La enfermera del puesto de campaña aparece con una bandeja de pociones y te cura a todo el equipo en un minuto. Se va sin decir nada. Nereida dice que es su tía. Seguramente es mentira.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'nereida', text: 'Valiente. O no. Ya veremos.' }] },
			] },
			{ text: 'Una burbuja enorme sube desde el fondo. Luego otra. Y entonces el agua se levanta como una cortina y, de debajo, sale un **Araquanid** gigantesco, el doble de grande de lo normal, envuelto en una burbuja que brilla. Te mira con los ojos de la cabeza y con los de las patas.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Un Pokémon dominante! Son más grandes, más fuertes, y tienen un aura que les sube las estadísticas. ¡No se puede capturar! ¡Tampoco se puede huir! ¡Ánimo!' },
			{ wild: { sp: 'araquanidtotem', lv: 58, noCatch: true }, canRun: false,
				onWin: [
					{ text: 'El Araquanid dominante se hunde despacio en la poza. La burbuja se deshace en espuma. Al rato, asoma la cabeza, ya de tamaño normal, y se aleja nadando, digno.' },
					{ say: 'nereida', text: 'Prueba superada. —Sonríe por primera vez. Es una sonrisa muy pequeña y muy sincera—. Muerde, ¿a que sí? Le enseñé yo.' },
					{ say: 'misty', text: '¡Así se hace! —Te da una palmada en la espalda que casi te tira a la poza—. ¡Con estilo! Yo lo hice con más estilo, pero ¡con estilo!' },
					{ text: 'Nereida saca del bolsillo un cristal azul, con forma de rombo, que brilla como una gota de agua congelada.' },
					{ say: 'nereida', text: 'El **Hidrostal Z**. Si tu Pokémon sabe un movimiento de agua, con esto lo hace enorme. Una vez. Como una ola de verdad.' },
					{ give: 'wateriumz' },
					{ set: { 'flag.b05_nereida_hecha': true } },
					{ quest: 'b05_m3', stage: 'gran', cond: PRUEBAS },
					{ say: 'nereida', text: 'Por cierto. Tengo un Popplio que no es de nadie. Ven a verme cuando te hayas secado.' },
					{ say: 'rotom', text: '¡Una prueba de dos! Falta la de **Kiawe**, en el volcán, desde la **Ruta 8**.', cond: '!flag.b05_kiawe_hecha' },
					{ say: 'rotom', text: '¡Las dos pruebas! ¡Toca la Gran Prueba con la kahuna, en las **Ruinas de la Vida**, al sur de **Konikoni**!', cond: 'flag.b05_kiawe_hecha' },
				],
				onLose: [
					{ say: 'nereida', text: 'Te ha mordido. Pasa. A mí también, la primera vez. Y la segunda. Vuelve cuando quieras. Él te espera. Le gusta morder.' },
				] },
		],
		b05_popplio: [
			{ if: 'flag.b05_popplio_pensar', then: [
				{ text: 'El Popplio de la poza te ve llegar, hace una burbuja pequeña y se esconde detrás de la pierna de Nereida. Luego asoma. Te mira.' },
				{ say: 'nereida', text: 'Te estaba esperando. Bueno, yo no. Él. —Cara seria—. Yo también un poco.' },
			], else: [
			{ text: 'Nereida está sentada en la roca, con algo en el regazo: un **Popplio** pequeño, con la nariz rosa, que hace burbujas. Burbujas muy pequeñas. Las mira subir, y cuando estallan, se esconde debajo de la toalla de Nereida.' },
			{ say: 'nereida', text: 'Lo encontré en la poza hace un mes. No sabe hacer burbujas grandes. Bueno, sabe. No se atreve. Cuando le sale una grande, se asusta de su propia burbuja.' },
			{ say: 'misty', text: 'Yo he probado a animarlo. Le he hecho una demostración con mi Starmie. Se ha escondido una hora entera.' },
			] },
			{ if: POPPLIO, then: [
				{ set: { 'flag.b05_popplio': true } },
				{ say: 'nereida', text: '¿Ya tienes uno de estos? —Mira a tu equipo, luego al Popplio—. Entonces este se queda conmigo. En la poza. Le hace falta alguien que no tenga prisa. Yo nunca tengo prisa.' },
				{ set: { 'flag.b05_popplio_nereida': true } },
				{ text: 'El Popplio sale de debajo de la toalla, te mira, y hace una burbuja. Mediana. La más grande que le has visto. No se esconde.' },
				{ say: 'nereida', text: 'Eso ha sido para ti. Vuelve a verlo cuando quieras. Le hará bien.' },
			], else: [
				{ say: 'nereida', text: '¿Te lo quieres llevar? A lo mejor contigo se atreve. Tú tienes cara de hacer cosas grandes y luego asustarte un poco. Como él.' },
				{ choice: [
					{ text: '«Me lo llevo. Le enseñaremos a no asustarse.»', then: [
						{ set: { 'flag.b05_popplio': true } },
						{ text: 'El Popplio te mira desde la toalla. Nereida lo empuja con un dedo, muy suavemente. Duda. Y luego salta a tus brazos y hace una burbuja. Pequeña. Pero no se esconde.' },
						{ pokemon: { sp: 'popplio', lv: 16, gender: 'M', nature: 'modest', ability: 'torrent', happy: 160, moves: ['watergun', 'disarmingvoice', 'aquajet', 'icywind'], ivs: { hp: 28, atk: 20, def: 24, spa: 31, spd: 31, spe: 22 } } },
						{ say: 'nereida', text: 'Cuídalo. Y no lo regañes si se asusta. Regáñalo si no lo intenta. Es distinto.' },
					] },
					{ text: '«Mejor que se quede contigo. Por ahora.»', then: [
						{ set: { 'flag.b05_popplio_pensar': true } },
						{ say: 'nereida', text: 'Bueno. Se queda en la poza hasta que vuelvas. Igual un día te sorprende con una burbuja del tamaño de un Wailord. —Pausa—. Eso sí es mentira. Pero ojalá.' },
					] },
				] },
			] },
			{ quest: 'b05_s_iniciales', stage: 'buscar', cond: '!quest.b05_s_iniciales' },
			{ quest: 'b05_s_iniciales', done: true, cond: 'flag.b05_litten && flag.b05_popplio && flag.b05_rowlet' },
		],
		b05_nereida_despues: [
			{ if: 'flag.b05_popplio_nereida', then: [
				{ text: 'El Popplio de la poza te ve llegar y hace una burbuja. Mediana. Nereida aplaude sin hacer ruido.' },
			] },
			{ say: 'nereida', text: 'Misty me ha retado a ver quién aguanta más debajo del agua. He ganado. Me ha dicho que he hecho trampa. He hecho trampa.' },
		],
		b05_misty_saltagua: [
			{ if: 'flag.b05_ridegear', then: [
				{ say: 'misty', text: 'Lo del Lapras ha sido precioso. No se lo digas a nadie, pero he llorado un poquito. Por la sal. Era la sal.' },
				{ say: 'misty', text: 'Cuando vuelvas a Kanto, pásate por Celeste con él. Mi Lapras querrá conocerlo. Se aburre. Todos nos aburrimos sin rivales.' },
			], else: [
				{ say: 'misty', text: 'El intercambio de capitanes es una excusa de la Liga para que los líderes conozcan otras regiones. Yo lo acepté porque Alola tiene playas. Y porque en Celeste me miraban raro desde que perdí contigo.' },
				{ say: 'misty', text: 'Nereida es buena. Muy buena. Y miente fatal, pero lo hace tan seria que da igual. —Pausa—. ¿Crees que mi Starmie habla francés? Me ha entrado la duda.' },
			] },
		],

		// =================== EL LAPRAS DE LA RED Y EL RIDE GEAR ===================
		b05_lapras_red: [
			{ set: { 'flag.b05_lapras_visto': true } },
			{ text: 'En la orilla donde la colina se encuentra con el mar hay gente gritando. Misty corre hacia el agua con la toalla al cuello. Nereida corre detrás, sin prisa pero sin pausa. Y bajando por el sendero, cargada con una caja de herramientas que pesa más que ella, viene Leilani.' },
			{ say: 'leilani', text: '¡{jugador}! ¡Llegué! ¡Llegué tarde, pero llegué! ¡¿Qué pasa?! ¡¿Por qué grita todo el mundo?! ¡Yo también grito, por si acaso!' },
			{ text: 'En el agua, a unos metros de la orilla, un **Lapras** se revuelve atrapado en una red. No es una red de pesca: brilla en violeta, con un zumbido eléctrico, y cada vez que el Lapras tira, se aprieta más.' },
			{ text: 'De la red cuelgan etiquetas de plástico. En una se lee, con letra de impresora: «**Destino: por asignar**». En otra, un logotipo arrancado a medias. Queda la mitad de un símbolo. Media lemniscata.' },
			{ say: 'misty', text: '¡Es de Kanto! ¡Los Lapras de aquí no tienen ese tono de concha! ¡Este es de mi mar! ¡¿Qué hace aquí?!' },
			{ say: 'leilani', text: 'Es una red de contención. —Se le ha borrado la sonrisa—. La conozco. Me pidieron una cotización para fabricarlas hace un año. Dije que no. Bueno… dije «quizá». Luego dije que no. Esta no la hice yo. Pero se parece demasiado a una que sí dibujé.' },
			{ prompt: 'El Lapras tira de la red y se hunde un palmo. Hay que hacer algo ya.', choice: [
				{ cond: LUC, text: 'Acercarte despacio con {riolu}.', then: [
					{ text: 'Te metes en el agua hasta la cintura. {riolu} va a tu lado, con el agua hasta el pecho, sin dudar. El Lapras los ve y se revuelve más.' },
					{ text: '{riolu} levanta una palma. El aura se enciende, azul, tranquila. No es la del combate: es otra, más lenta, como una mano en la espalda. El Lapras deja de tirar. Los mira. Respira.' },
					{ happy: { who: 'riolu', n: 4 } },
				] },
				{ text: 'Pedirle a Misty que lo calme.', then: [
					{ say: 'misty', text: '¡Eso sí sé hacerlo! —Se mete en el agua y le habla al Lapras bajito, cantando algo sin letra, una nana de Celeste. El Lapras deja de tirar. Escucha.' },
				] },
				{ text: 'Meterte tú a sujetarlo.', then: [
					{ text: 'Te metes en el agua y te agarras a la red, para que no se apriete más. Te da un calambre que te sube hasta los dientes. El Lapras te mira, sorprendido de que alguien se haya metido en su problema. Deja de tirar.' },
				] },
			] },
			{ say: 'leilani', text: '¡Así! ¡Quietos así! —Se mete en el agua con un cortador de cable en la boca y la caja de herramientas flotando detrás—. Esta red tiene un nodo de carga. Si lo corto mal, explota. Si lo corto bien, también, pero menos.' },
			{ say: 'nereida', text: 'Te sujeto la caja. —Ya está a su lado, con el agua al cuello, cara seria—. Si explota, digo que fue mentira.' },
			{ text: 'Leilani encuentra el nodo: una cajita metálica con una luz violeta. Mete el cortador. Cierra un ojo. Corta.' },
			{ text: '*¡Pzzzt!* Una chispa violeta, un olor a pelo quemado (el mechón de Leilani, otra vez) y la red se afloja de golpe, como un globo pinchado. El Lapras sale del lío, sacude el cuello, y lanza un canto largo y grave que hace vibrar el agua.' },
			{ say: 'leilani', text: '¡Funcionó! ¡No explotó! Bueno, explotó un poquito. Lo normal. ¿Sí o qué? —Se toca el mechón—. Ah. Otra vez el mechón. Ya ni crece, del susto.' },
			{ text: 'El Lapras no se va. Nada en círculos delante de la orilla, despacio, sin alejarse. Mira el mar abierto. Mira a Misty. Te mira a ti.' },
			{ say: 'misty', text: 'No sabe volver. La Fisura lo trajo y no sabe por dónde se vuelve a Kanto. —Le acaricia el cuello—. Pobrecito. Está lejísimos de casa.' },
			{ say: 'leilani', text: 'Pues… —Mira el Lapras. Mira su caja de herramientas. Te mira a ti. Algo se le enciende detrás de las gafas—. Pues yo necesito un Pokémon grande, de agua, que no se asuste de nada. Y él necesita a alguien que lo lleve a casa algún día. Por cualquier mar. En cualquier región.' },
			{ say: 'leilani', text: 'Si lo conecto al Ride Gear, te sigue a donde vayas. Y cuando pases por Kanto… —se encoge de hombros, haciéndose la desinteresada—. Bueno. Ya sabría por dónde.' },
			{ say: 'leilani', text: 'Pero tengo que hacerlo aquí, ahora, con el prototipo. Que no está terminado. Que a lo mejor… ya sabes. Explota. Un poquito. Lo normal.' },
			{ prompt: 'Leilani te tiende el brazalete. La pantallita rajada parpadea.', choice: [
				{ text: '«Pónmelo. Confío en ti.»', then: [
					{ af: { leilani: 5 } },
					{ set: { 'flag.b05_leilani_confia': true } },
					{ say: 'leilani', text: '¿Confías en…? —Se queda un segundo sin palabras, lo cual en Leilani es mucho tiempo—. Nadie dice eso. Nadie. La gente dice «¿seguro que es seguro?». Tú has dicho… bueno. Bueno. Pues no voy a fallar. Ahora no puedo fallar.' },
				] },
				{ text: '«Leilani, apártate. Que lo pruebe otro.»', then: [
					{ af: { leilani: -3 } },
					{ say: 'leilani', text: 'Otro. Ya. —Se le apaga algo—. Siempre hay otro que lo haga. Alguien con bata. Alguien que no sobre. —Se ajusta las gafas—. Pero el invento es mío. Y la que se moja soy yo. Ponte el brazalete y no te muevas.' },
				] },
				{ text: '«¿Seguro que es seguro?»', then: [
					{ say: 'leilani', text: '¡No! —Sonríe enorme—. ¡Por eso es emocionante! Venga, que el Lapras se aburre.' },
				] },
			] },
			{ cutscene: { time: 'tarde', weather: 'sparks', bg: { type: 'coast', far: '#e98a5a', ground: '#c4a06a' }, start: 'light', frames: [
				{ actors: [{ id: 'leilani', at: 'left', enter: 'left' }, { mon: 'lapras', key: 'lapras', at: 0.72, size: 'l', enter: 'pop' }], cam: 'pull', text: 'La orilla al atardecer. Leilani se arrodilla en la arena con la caja abierta, las gafas de soldar bajadas y la lengua entre los dientes. El Lapras espera en el agua, quieto, como si entendiera.' },
				{ on: '_c', item: 'ridegear', cam: 'push', fx: 'sparkle', text: 'El brazalete en tu muñeca. Leilani suelda un último cable a la pantallita rajada. Saltan chispas. Una le cae en el mechón quemado. No se inmuta.' },
				{ actors: [{ key: 'leilani', do: 'hop', emote: '!' }], on: '_c', fx: ['flash', 'shake'], shake: 1, text: '*¡Pzzt!* La pantallita se enciende. Primero roja. Luego naranja. Leilani deja de respirar.' },
				{ on: 'lapras', fx: ['glow', 'ripple'], color: '#5ab8e8', text: 'Luego verde. En el agua, alrededor del Lapras, se abre un anillo de luz que se va ensanchando sobre las olas. El Lapras canta. El brazalete vibra con la misma nota.' },
				{ actors: [{ key: 'leilani', do: 'spin', emote: 'heart' }], on: '_c', fx: 'beam', text: '«¡FUNCIONA! ¡Funciona-funciona-funciona! ¡No ha explotado nada! ¡Bueno, una cosa! ¡Pero pequeña!»' },
				{ actors: [{ key: 'leilani', dim: true }], on: 'lapras', cam: 'pull', fx: 'iris-out', text: 'El sol se apoya en el mar. El Lapras se acerca a la orilla y baja el cuello hasta la arena, delante de ti. Te está invitando a subir.' },
			] } },
			{ give: 'ridegear' },
			{ set: { 'flag.b05_ridegear': true, 'flag.mount_lapras': true } },
			{ say: 'leilani', text: 'El **Ride Gear Universal**. Con esto, el Lapras te escucha en cualquier mar. Y tus otras monturas, en cualquier tierra. Lo he hecho yo. —Se queda mirando sus propias manos como si fueran de otra—. Lo he hecho yo, ¿sí o qué?' },
			{ if: 'flag.mount_rhyhorn', then: [
				{ say: 'leilani', text: 'Y tu Rhyhorn también responde. Ya no tienes que ir a buscarlo a Kalos. Lo llamas y viene. Bueno, viene a su ritmo. Que es un ritmo de Rhyhorn.' },
			] },
			{ text: 'Subes al lomo del Lapras. La concha está tibia del sol. Él gira el cuello, te mira, y canta otra vez, más bajito, solo para ti. El mar entero, de golpe, es un camino.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Foto! ¡Foto, foto, foto! ¡Quieto todo el mundo! ¡Que nadie explote!' },
			{ give: 'fotolapras' },
			{ text: 'La Pokédex de Leilani vibra. Ella mira la pantalla. Se le tuerce la sonrisa.' },
			{ say: 'leilani', text: 'Un correo. «Programa Ultra · Lemnis». —Lee en voz alta, imitando una voz de anuncio—. «Estimada proveedora: hemos sabido de sus avances en sistemas de anclaje para Pokémon. Nos encantaría adquirir sus planos. Ya que usted no los va a poder aprovechar a gran escala…»' },
			{ say: 'leilani', text: 'Proveedora. —Se ríe sin ganas—. Es la tercera vez que me escriben. Siempre me llaman así. Como si yo fuera una ferretería.' },
			{ choice: [
				{ text: '«No eres una proveedora. Eres la que lo ha inventado.»', then: [
					{ af: { leilani: 5 } },
					{ say: 'leilani', text: '…La que lo ha inventado. —Lo repite despacio—. Eso. Eso pondré en el taller. En grande. Con luces. —Borra el correo sin contestar—. Que se busquen otra ferretería.' },
				] },
				{ text: '«Igual te pagan bien.»', then: [
					{ say: 'leilani', text: 'Seguro que me pagan bien. Siempre pagan bien. —Guarda la Pokédex—. Eso es lo que me da miedo.' },
				] },
				{ text: 'No decir nada.', then: [
					{ say: 'leilani', text: 'Ya. Yo tampoco sé qué decirles. Por eso no les contesto. Es mi técnica. Técnica de avestruz.' },
				] },
			] },
			{ say: 'misty', text: 'Bueno, yo ya he llorado bastante por hoy. Por la sal. —Se seca los ojos con la toalla de Starmie—. Cuídamelo, ¿eh? Es de mi mar.' },
			{ say: 'nereida', text: 'Les quedó bonito. —Cara seria—. No es mentira.' },
			{ quest: 'b05_t_leilani', stage: 'hecha', done: true },
			{ diary: 'Hoy mi entrenador{|a|e} se ha subido a un Lapras. ¡Un Lapras de verdad! Estaba atrapado en una red muy fea, y entre todos lo hemos soltado. Leilani ha hecho un brazalete que funciona (casi seguro) y el Lapras canta cuando lo tocas. Yo también he cantado un poco. Nadie me lo ha pedido. Misty dice que lloró por la sal. Yo no tengo ojos para llorar, pero si los tuviera, también habría sido por la sal.', cond: 'flag.b01_diario' },
			{ intel: { npc: 'leilani', text: 'Terminó el Ride Gear Universal en la Colina Saltagua, con un Lapras de Kanto atrapado en una red de contención («Destino: por asignar», media lemniscata). Lemnis («Programa Ultra») le ha escrito tres veces para comprarle los planos y la llama «proveedora».' } },
		],
		b05_lapras_orilla: [
			{ text: 'El Lapras te espera en la orilla, con la cabeza fuera del agua. Cuando te ve, canta. El Ride Gear vibra en tu muñeca con la misma nota.' },
			{ if: 'flag.b05_popplio_nereida', then: [
				{ text: 'En su lomo, como quien se sube a un barco, va el Popplio de Nereida. Hace burbujas. Medianas.' },
			] },
		],

		b05_volver_wela: [
			{ text: 'Subes por el sendero de piedra negra. A cada paso hace más calor. Arriba, las antorchas del escenario siguen encendidas, y se oye un golpe de talón, seco, a compás.' },
			{ go: 'area_wela' },
		],

		// =================== RUTA 8: LA CALETA (ULISES) ===================
		b05_ulises_caleta: [
			{ set: { 'flag.b05_ulises_caleta': true } },
			{ text: 'Llamas al Lapras con el Ride Gear. Bajas por el acantilado hasta el agua y él te lleva, rodeando los brazos de lava, hasta la caleta escondida. Arena blanquísima. Silencio. Ni gaviotas.' },
			{ text: 'Y en medio de la arena, una cabina de madera azul, con su farolillo y sus ventanitas. Te suena. Claro que te suena.' },
			{ text: 'La puerta se abre de golpe. Sale un hombre de rizos castaños y abrigo granate, descalzo, con los pantalones remangados y la bufanda arrastrando por la arena.' },
			{ say: 'viajero', text: '¡{jugador}! ¡En una playa! ¡Por fin una playa! ¡Siempre me tocan cuevas! ¿Qué día es? Martes. Seguro que martes. —Mira el Lapras—. ¡Y en Lapras! ¡Has llegado en Lapras! Eso no lo esperaba. Bueno, sí. Pero no hoy.' },
			{ say: 'viajero', text: 'Escucha, escucha. —Se agacha y escribe algo en la arena con el dedo; luego lo borra antes de que lo leas—. El pequeñito. Está bien. Duerme. Duerme mucho, desde lo de la cueva.' },
			{ say: 'viajero', text: 'Pero anoche soñó. Él no sueña nunca, o sueña al revés, que es lo mismo. Y anoche soñó con una luz. Una luz enorme, muy vieja, que se iba apagando poquito a poco. Como una vela en una habitación sin aire.' },
			{ if: LUC, then: [
				{ text: '{riolu} se ha quedado muy quieto. Mira hacia el sur, hacia el mar, hacia algún sitio que no se ve. Las orejas tiemblan un poco.' },
				{ say: 'viajero', text: 'Tú también lo notas, ¿eh? —Le habla a {riolu}, muy serio—. Alguien se está bebiendo el cielo. No dejes que te lo cuente nadie: míralo tú. A media tarde.' },
			] },
			{ say: 'viajero', text: 'Él se despertó llorando. Bueno, los de su tipo no lloran. Se despertó con el tiempo mojado alrededor. Es parecido.' },
			{ text: 'Se levanta de golpe y se sacude la arena. Se queda serio. Serio de verdad, como pocas veces.' },
			{ say: 'viajero', text: 'La próxima vez que me veas, no me dejes irme sin ti. Prométemelo. Yo me olvidaré de pedírtelo. Me olvidé.' },
			{ say: 'viajero', text: '…No he dicho eso. ¡Me voy! ¡Llego tarde a algo que acaba de empezar!' },
			{ text: 'Se mete en la cabina. La bufanda tarda un poco más, como siempre. El acordeón respira hondo. Cuando se apaga, en la arena blanca queda un cuadrado de arena seca y, en medio, una concha pequeña con forma de espiral.' },
			{ give: 'shoalshell' },
			{ intel: { npc: 'viajero', text: 'En la caleta de la Ruta 8 (solo por mar): «el pequeñito» duerme desde lo de la cueva, pero soñó con «una luz enorme, muy vieja, que se iba apagando». «Alguien se está bebiendo el cielo». Te pidió que, la próxima vez, no le dejes irse sin ti.' } },
		],
		b05_caleta_despues: [
			{ text: 'La caleta escondida. Arena blanca, agua quieta y, en el centro, un cuadrado de arena más seca que el resto. Lapras lo rodea nadando, con mucho respeto, sin pisarlo.' },
		],

		// =================== ÁREA VOLCÁNICA DEL WELA: KIAWE ===================
		b05_kiawe_otra: [
			{ say: 'kiawe', text: '—Golpe de talón. El Marowak lo imita—. Otra vez tú. Bien. El ritmo no se aprende a la primera. Ni a la segunda. Yo tardé un año.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'La bailarina del cesto vuelve a bajar del escenario. Esta vez no te corrige la postura: te guiña un ojo.' }] },
				{ text: 'Estoy bien así.', then: [{ say: 'kiawe', text: 'Entonces, a bailar.' }] },
			] },
			{ battle: 'kiawe_1',
				onWin: [
					{ say: 'kiawe', text: 'Ahí está. Ese era el compás. —Se seca el sudor con el pañuelo—. Ahora la prueba de verdad. En el escenario. Ven cuando quieras.' },
				] },
		],
		b05_kiawe_intro: [
			{ set: { 'flag.b05_kiawe_intro': true } },
			{ text: 'En el escenario de troncos, un chico alto, sin camisa, con un pañuelo en la cabeza y unas flores en el pelo, baila. No es un baile bonito: es un baile serio, de pasos secos, golpes de talón y brazos que cortan el aire como si fuera de papel.' },
			{ text: 'Un Marowak con el hueso en llamas baila con él. Cada vez que el chico golpea el suelo, el hueso se enciende más. Cada vez que gira, las antorchas se inclinan hacia él.' },
			{ say: 'kiawe', text: '—Sin dejar de bailar—. Llegas en el compás equivocado. —Golpe de talón—. Pero llegas. Eso cuenta.' },
			{ say: 'kiawe', text: 'Kiawe. Capitán de la prueba de fuego. —Se para de golpe. El Marowak también. Las antorchas tardan un segundo más—. El fuego no se domina. Se acompaña. Como una danza. Si no sabes acompañarlo, te quema. Si sabes, también, pero te importa menos.' },
			{ if: 'flag.b05_ridegear', then: [
				{ say: 'kiawe', text: 'Ese brazalete. Es de Leilani. —Asiente, serio—. Ella me arregló la silla de mi Charizard. Explotó dos veces. La tercera, voló. Leilani es así.' },
			] },
			{ say: 'kiawe', text: 'Antes de mi prueba, quiero ver cómo te mueves. No con los pies: con tu equipo. Un combate. Si me sigues el ritmo, te enseño el resto.' },
			{ prompt: '¿Curar al equipo antes del combate?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'Kiawe silba. Una bailarina baja del escenario con un cesto de bayas y pociones. Mientras curas a tu equipo, ella te corrige la postura. No te habías dado cuenta de que tenías postura.' }] },
				{ text: 'Estoy bien así.', then: [{ say: 'kiawe', text: 'Bien. El fuego tampoco espera.' }] },
			] },
			{ battle: 'kiawe_1',
				onWin: [
					{ say: 'kiawe', text: 'Has seguido el ritmo. —Se seca el sudor con el pañuelo—. Ahora la prueba de verdad. En el escenario. Con las antorchas. Ven cuando quieras.' },
				] },
		],
		b05_kiawe_mientras: [
			{ say: 'kiawe', text: 'El escenario te espera. Mira los pasos. No los pienses. Míralos.' },
		],
		b05_kiawe_danza: [
			{ text: 'Subes al escenario. Las antorchas están encendidas en círculo, siete. Kiawe se pone delante de ti. El Marowak, detrás de él.' },
			{ say: 'kiawe', text: 'Mi prueba es una danza. Yo bailo. Tú repites. Cada vez, un paso más. Si te equivocas, el fuego se apaga y empezamos. Si no te equivocas, el fuego sube.' },
			{ say: 'kiawe', text: 'Y cuando el fuego sube del todo… viene alguien a ver quién baila en su volcán.' },
			{ minigame: { type: 'lock', id: 'b05_kiawe_danza', title: 'La danza del Wela', hint: 'Kiawe enciende las antorchas en orden. Repite la secuencia. Cada vuelta, un paso más.', theme: 'ruina', level: 2,
				loot: [{ id: 'charcoal', w: 4 }, { id: 'lavacookie', w: 6, n: [1, 2] }], picks: 1, consolation: 'lavacookie', lootTitle: 'Al pie del escenario' },
				onWin: [
					{ set: { 'flag.b05_kiawe_danza': true } },
					{ text: 'El último paso. Golpe de talón. Las siete antorchas se levantan a la vez en siete columnas de fuego, altísimas, y se doblan hacia el centro del escenario, hacia ti.' },
					{ say: 'kiawe', text: '—Te mira con algo parecido al respeto. O al calor—. Ya viene.' },
					{ call: 'b05_kiawe_dominante' },
				],
				onLose: [
					{ say: 'kiawe', text: 'El fuego se ha apagado. No pasa nada. El fuego se apaga muchas veces. Vuelve a encenderlo.' },
				],
				onQuit: [{ say: 'kiawe', text: 'Descansa. El escenario no se mueve. El volcán tampoco. Casi nunca.' }] },
		],
		b05_kiawe_dominante: [
			{ if: 'flag.b05_kiawe_hecha', then: [{ end: true }] },
			{ text: 'El suelo del escenario tiembla. De una grieta de la roca, detrás de las antorchas, sale un humo blanco, y luego un ruido de hueso contra piedra, rítmico, como un tambor.' },
			{ prompt: 'Kiawe te mira. Algo grande sube por la grieta. ¿Curar al equipo antes?', choice: [
				{ text: 'Sí, rápido.', then: [{ heal: 'Kiawe te lanza una bolsa de cuero con bayas y una Hiperpoción. «Rápido. No le gusta esperar». Curas a tu equipo con las manos temblando de calor.' }] },
				{ text: 'No hace falta.', then: [{ say: 'kiawe', text: 'Bien. El fuego tampoco pide permiso.' }] },
			] },
			{ text: 'Sale de la grieta un **Marowak** de Alola enorme, el doble de grande que el de Kiawe, con el hueso ardiendo en llamas verdes y un aura que deforma el aire a su alrededor. Golpea el suelo con el hueso. Una vez. Dos. Tres. Y baila.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Otro Pokémon dominante! ¡Y baila mejor que nosotros! ¡No se puede huir! ¡Ni capturar!' },
			{ wild: { sp: 'marowakalolatotem', lv: 58, noCatch: true }, canRun: false,
				onWin: [
					{ text: 'El Marowak dominante clava el hueso en la roca y se queda quieto, jadeando. Las llamas verdes bajan. Luego se encoge, poco a poco, hasta su tamaño de siempre, se echa el hueso al hombro y vuelve a meterse en la grieta, con mucha dignidad.' },
					{ say: 'kiawe', text: '—Te pone una mano en el hombro. Quema un poco—. Has bailado con el fuego y no te has quemado. Bueno. Un poco. Como todos.' },
					{ text: 'Saca un cristal rojo con forma de rombo que brilla por dentro como una brasa.' },
					{ say: 'kiawe', text: 'El **Pirostal Z**. Si tu Pokémon sabe un movimiento de fuego, esto lo convierte en un volcán entero. Una vez por combate. No lo malgastes. El fuego no se malgasta.' },
					{ give: 'firiumz' },
					{ cap: 59 },
					{ set: { 'flag.b05_kiawe_hecha': true } },
					{ quest: 'b05_m3', stage: 'gran', cond: PRUEBAS },
					{ if: LUC, then: [
						{ text: '{riolu} se ha quedado mirando las antorchas, que ya bajan. Luego mira a Kiawe. Kiawe le devuelve la mirada y, muy despacio, le hace una reverencia. {riolu} se la devuelve. Ninguno de los dos se ríe.' },
					] },
					{ say: 'rotom', text: '¡Una prueba de dos! Falta la de **Nereida**, en la **Colina Saltagua**, pasando **Ohana**.', cond: '!flag.b05_nereida_hecha' },
					{ say: 'rotom', text: '¡Las dos pruebas! ¡La kahuna nos espera en las **Ruinas de la Vida**, al sur de **Konikoni**!', cond: 'flag.b05_nereida_hecha' },
				],
				onLose: [
					{ say: 'kiawe', text: 'Te ha quemado. Pasa. Vuelve cuando el fuego te dé un poco menos de miedo. O un poco más de respeto. Es lo mismo.' },
				] },
		],
		b05_kiawe_despues: [
			{ say: 'kiawe', text: 'Ven al amanecer algún día. Bailo en el borde del cráter. El volcán contesta. Bueno, contesta su humo. Pero contesta.' },
			{ if: 'flag.b05_rhi_wela', then: [
				{ say: 'kiawe', text: 'Tu amiga la del balón quiere hacer mi prueba. Baila fatal. —Pausa—. Pero no se rinde. Eso también es danza.' },
			] },
		],

		// =================== RHI ===================
		b05_rhi_wela: [
			{ set: { 'flag.b05_rhi_wela': true } },
			{ text: 'Junto al borde del cráter, alguien da toques a una Poké Ball con el empeine, sin dejar que toque el suelo. Treinta y uno. Treinta y dos. Pelo rojo, sudadera atada a la cintura, cara de calor y de ganas.' },
			{ say: 'rhi', text: '¡{jugador}! ¡Lo sabía! ¡Sabía que te iba a encontrar en el sitio más caliente de Alola! —Treinta y tres. La Poké Ball cae. Se le escapa una palabrota bajito—. Llevaba un récord. Era récord.' },
			{ say: 'rhi', text: 'Oye, una cosa. Eso que te ha dado Kiawe. El cristal rojo. El **Pirostal Z**. —Se le iluminan los ojos—. ¿Tú sabes lo que haría mi Cinderace con eso? ¡Un balón de fuego del tamaño de un estadio! ¡Gol desde el centro del campo!' },
			{ say: 'rhi', text: 'Pero Kiawe no me deja hacer la prueba. Dice que bailo «como un defensa central». ¡Yo soy delantera! ¡Los delanteros bailan de maravilla! Bueno. Bailan. Más o menos.' },
			{ say: 'rhi', text: 'Así que te propongo un partido. Si te gano, me enseñas los pasos de la danza. Y si me ganas… —se encoge de hombros, con una sonrisa torcida—. Pues me ganas, y me fastidio, y te invito a una malasada. Que es lo que pasa siempre.' },
			{ choice: [
				{ text: '«Vamos. Pero que conste que bailo fatal.»', then: [
					{ af: { rhi: 1 } },
					{ say: 'rhi', text: '¡Perfecto! ¡Así estamos igual! ¡Partido igualado!' },
					{ call: 'b05_rhi_combate' },
				] },
				{ text: '«Ahora no, Rhi.»', then: [
					{ say: 'rhi', text: 'Va. Calentamiento, entonces. Yo aquí sigo. Dando toques. Batiendo récords. —La Poké Ball cae otra vez—. Batiendo… bueno.' },
				] },
			] },
		],
		b05_rhi_revancha: [
			{ say: 'rhi', text: '¿Ahora sí? ¡Balón al centro!' },
			{ call: 'b05_rhi_combate' },
		],
		b05_rhi_combate: [
			{ prompt: '¿Curar al equipo antes del partido?', choice: [
				{ text: 'Sí, que acabo de salir de la prueba.', then: [{ heal: 'Rhi te lanza una bolsa de deporte. Dentro hay pociones, una toalla y una bebida isotónica de Galar que sabe a pila. Curas a tu equipo. «¡Sin ventajas! ¡Partido limpio!»' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'rhi', text: '¿Seguro? ¡Luego no me digas que el campo estaba en mal estado!' }, { heal: 'Rhi, igual, te pone una poción en la mano. «Partido limpio o nada». Curas a tu equipo.' }] },
			] },
			{ battle: 'rhi_6', lose: 'continue',
				onWin: [
					{ say: 'rhi', text: '¡Aaah! ¡Otra vez! —Se tira de espaldas en la roca caliente y se levanta de un salto porque quema—. ¡Ay! ¡Quema! ¡Todo quema aquí!' },
					{ say: 'rhi', text: 'Bueno, bueno. Te invito a una malasada. Pero me enseñas igual un paso. Uno. El más fácil. Por pena.' },
					{ text: 'Le enseñas el primer paso de la danza: golpe de talón y giro. Rhi lo hace. Lo hace fatal. Kiawe, desde el escenario, se tapa la cara con el pañuelo.' },
					{ say: 'rhi', text: '¡Mira! ¡Kiawe se ha tapado la cara de emoción!' },
					{ af: { rhi: 2 } },
				],
				onLose: [
					{ say: 'rhi', text: '¡GOOOL! ¡Gol en campo contrario! ¡Con calor! —Te tiende la mano—. Venga. Enséñame los pasos. Lo prometiste. Bueno, lo prometí yo. Pero vale igual.' },
					{ text: 'Le enseñas el primer paso de la danza. Rhi lo hace fatal. Kiawe, desde el escenario, se tapa la cara con el pañuelo.' },
					{ heal: true },
				] },
			{ say: 'rhi', text: 'Le voy a pedir a Kiawe otra oportunidad. Con este paso. Seguro que me dice que no. Le voy a pedir otra después. Los delanteros no se rinden. Los delanteros rematan.' },
			{ intel: { npc: 'rhi', text: 'En el Área Volcánica del Wela, quiere el Pirostal Z para su Cinderace. Kiawe no la deja hacer la prueba porque baila «como un defensa central». No se rinde.' } },
		],
		b05_rhi_despues: [
			{ text: 'Rhi practica el paso de la danza en el borde del cráter. Golpe de talón, giro. Golpe de talón, giro. Se tropieza. Lo vuelve a hacer.' },
			{ say: 'rhi', text: 'Kiawe me ha dicho que vuelva mañana. ¡Mañana! ¡Eso es un sí! ¡Es un sí en idioma Kiawe! —Pausa—. Creo.' },
		],

		// =================== KONIKONI ===================
		b05_konikoni_llegada: [
			{ set: { 'flag.b05_konikoni_llegada': true } },
			{ text: 'Konikoni huele a pescado frito, a jengibre y a incienso. Farolillos rojos cuelgan de cuerda en cuerda sobre las calles estrechas. En el mercado cubierto, un Machoke vende fruta con los cuatro brazos y una señora regatea con él por una papaya.' },
			{ text: 'Al fondo de la calle principal hay una joyería con el escaparate lleno de piedras que brillan, y un cartel en la puerta: «Cerrado los días de Gran Prueba». Hoy no es día de Gran Prueba. Está abierta.' },
			{ say: 'rotom', text: '¡Bzzt! La kahuna de Akala, **Mayla**, es la de la joyería. Y la Gran Prueba es en las **Ruinas de la Vida**, al sur de la ciudad. ¡Pero primero hay que pasar las dos pruebas de capitán!', cond: '!(' + PRUEBAS + ')' },
			{ say: 'rotom', text: '¡Bzzt! ¡Las dos pruebas hechas! La kahuna **Mayla** tiene una joyería aquí, y la Gran Prueba es en las **Ruinas de la Vida**, al sur.', cond: PRUEBAS },
		],
		b05_philippe: [
			{ set: { 'flag.b05_philippe': true } },
			{ text: 'En una esquina del mercado, un señor con chistera, chaqueta verde y una corbata amarilla con palmeras reparte folletos a todo el que pasa. Nadie los agarra. Él sigue sonriendo.' },
			{ say: 'philippe', text: '¡Villas con vistas al volcán! ¡Calefacción natural! ¡Sauna incluida, porque el suelo está caliente! —Te ve. Se le cae un folleto—. ¡{jugador}! ¡Mi cliente número uno! ¡En Alola! ¡El destino existe, y tiene muy buen gusto!' },
			{ say: 'philippe', text: 'Philippe Dumont, ahora también en Alola. Inmobiliaria Dumont, sucursal Konikoni. La sucursal es esta esquina. Mira. —Te enseña un folleto con una casita de madera y, detrás, un volcán echando humo—. Villa «Lava Bonita». Dos habitaciones. Vistas al Wela.' },
			{ choice: [
				{ text: '«¿No es peligroso vivir al lado de un volcán?»', then: [
					{ say: 'philippe', text: 'Peligroso, peligroso… Phil-osofía: un volcán es una montaña con carácter. Y a una montaña con carácter no se la ignora. Se la respeta. Y se le pone una terraza delante.' },
				] },
				{ text: '«¿Cuánto cuesta?»', then: [
					{ say: 'philippe', text: 'Más de lo que tienes. —Te mira de arriba abajo—. Bueno, a lo mejor no. Has crecido. Se te ve en los zapatos. Te guardo la ficha. La ficha número uno. Siempre la número uno.' },
				] },
				{ text: '«¿Qué haces en Alola, Philippe?»', then: [
					{ say: 'philippe', text: '¡Expansión! Kalos está muy visto. Johto, también. Y con las Puertas, la gente se muda más que nunca. Todos quieren una segunda casa en otra región. Phil-osofía: si el mundo se hace pequeño, las casas se venden más grandes.' },
				] },
			] },
			{ say: 'philippe', text: 'Mira, te hago un truco. Para cerrar el trato. Piensa en un número. Del uno al diez. ¿Ya? No me lo digas.' },
			{ text: 'Saca una baraja del bolsillo. La baraja está húmeda del calor. Las cartas se le pegan unas a otras y salen todas a la vez, en abanico, por encima de un puesto de pescado.' },
			{ say: 'philippe', text: '¿Era el siete? —El pescadero le devuelve un siete de corazones con olor a atún—. ¿No? ¿Era… el atún? El atún tampoco. Bueno. El clima. Es el clima. En Kalos me sale.' },
			{ if: LUC, then: [
				{ text: '{riolu} le da a Philippe una carta que se le había quedado pegada a la espalda. Es el tres de tréboles. Philippe se la queda mirando un buen rato.' },
				{ say: 'philippe', text: 'El tres de tréboles. El de Luminalia. —Muy serio, de pronto—. Llevo dos regiones buscando esta carta. Gracias. —Se le humedecen los ojos. Será el clima—.' },
			] },
			{ say: 'philippe', text: 'Cuando te canses de dormir en Centros Pokémon, me buscas. Tengo casas en tres regiones. Bueno, folletos. Pero los folletos son el primer paso de una casa. Phil-osofía.' },
		],
		b05_philippe_despues: [
			{ say: 'philippe', text: '¡Ficha número uno! ¿Has pensado en lo de la villa? No me lo digas. Sé que lo has pensado. Se te ve en la cara. O es el calor. Aquí todo es el calor.' },
		],
		b05_postal_adela: [
			{ set: { 'flag.b05_postal_adela': true } },
			{ text: 'En el casillero del Centro Pokémon hay una postal con tu nombre. Viene de Johto: sello de la Ruta 42, matasellos de Iris. Una foto de un prado con mucha niebla por un lado y, por el otro, letra apretada, sin adornos.' },
			{ if: 'flag.b03_rancho_lemnis', then: [
				{ give: 'postal_adela_l' },
				{ read: 'postal_adela_l' },
			], else: [
				{ if: 'flag.b03_rancho_jugador', then: [
					{ give: 'postal_adela_j' },
					{ read: 'postal_adela_j' },
				], else: [
					{ if: 'partner("p7_rancho")', then: [
						{ text: 'Dentro de la postal, doblada en dos, una foto: Copito en la mecedora del porche, muy seria, con la lana recién esquilada.', cond: '!flag.b03_copito_contigo' },
						{ text: 'Dentro de la postal, doblada en dos, una foto: el establo con el tejado arreglado y, encima de la puerta, un cartón torcido que dice CREE.', cond: 'flag.b03_copito_contigo' },
						{ give: 'postal_adela_s' },
						{ read: 'postal_adela_s' },
					], else: [
						{ give: 'postal_adela_n' },
						{ read: 'postal_adela_n' },
					] },
				] },
			] },
			{ say: 'rotom', text: '¡Bzzt! Adela escribe como habla. Corto. Pero se nota que lo ha escrito tres veces antes de mandarlo.' },
		],
		b05_bill_llamada: [
			{ set: { 'flag.b05_bill_llamada': true } },
			{ text: 'La Pokédex vibra. Una llamada. En la pantalla, una cara con gafas protectoras y un Clefairy al fondo, saludando.' },
			{ say: 'bill', as: 'Bill (llamada)', text: '¡Hola-hola! ¡{jugador}! ¡Te llamo desde el Cabo! ¡Desde Kanto! ¡Con una señal que rebota en tres antenas y un satélite que no sé de quién es!' },
			{ say: 'bill', as: 'Bill (llamada)', text: 'Me ha llegado un aviso de mi sistema de PC: «montura registrada · Lapras · protocolo desconocido». ¡Desconocido! ¡En mi sistema! ¿Sabes cuánto tiempo hacía que algo era desconocido en mi sistema? ¡Desde lo del teletransportador!' },
			{ say: 'bill', as: 'Bill (llamada)', text: 'Es ese brazalete, ¿verdad? El Ride Gear. No guarda al Pokémon en datos, como mi PC. Guarda… la *costumbre*. El sitio donde el Pokémon espera que lo llames. ¡Es precioso! ¡Es una idea preciosa! ¿Quién lo ha hecho?' },
			{ choice: [
				{ text: '«Leilani Kahale. Una mecánica de Kantai.»', then: [
					{ af: { leilani: 1 } },
					{ say: 'bill', as: 'Bill (llamada)', text: '¡Kahale! ¡Apuntado! Dile que si necesita piezas, que me llame. Tengo una ruedecita de sobra. Gira como un sueño. —Pausa—. Y dile que no se lo venda a nadie. A nadie con corbata, sobre todo.' },
				] },
				{ text: '«Es un secreto.»', then: [
					{ say: 'bill', as: 'Bill (llamada)', text: '¡Un secreto! ¡Me encantan los secretos! Bueno, me encanta descubrirlos. Lo descubriré. Lo descubrí. —Se le oye teclear—. Kahale. Kantai. Ya está.' },
				] },
			] },
			{ say: 'bill', as: 'Bill (llamada)', text: '¡Me voy, que el Clefairy ha encontrado el destornillador de estrella! ¡Llevaba tres semanas buscándolo! ¡Hola-hola! ¡Adiós-adiós!' },
		],

		// =================== SHOKUGEKI (opcional) ===================
		b05_shokugeki: [
			{ set: { 'flag.b05_shoku_hecho': true } },
			{ text: 'El Restaurante de Lulú es una casa de madera con la puerta abierta, mesas largas y un mostrador de cocina a la vista. Huele a hierbas, a coco y a algo que se cuece desde hace horas.' },
			{ text: 'Detrás del mostrador, una chica con coletas verdes y un delantal lleno de flores. Delante, apoyado en el mostrador con los brazos cruzados y un cuchillo envuelto en un paño al hombro, un hombre calvo con barba y un pañuelo en la cabeza. Se miran como dos Mudsdale en la misma valla.' },
			{ say: 'gaspar', text: '¡{jugador}! ¡Llegas en el momento justo! —No aparta la vista de la chica—. Gaspar Rocafort. Bueno, ya lo sabes. Estoy en mitad de un duelo. De cocina. El más importante de mi vida. Desde el anterior.' },
			{ say: 'lulu', text: '¡Hola! Soy Lulú, capitana de la prueba de Planta. Bueno, de la prueba de comer. Este señor ha entrado en mi cocina y ha dicho que mi caldo «le falta valentía». ¡En mi cocina!' },
			{ say: 'gaspar', text: 'Le falta valentía. Lo mantengo. Es un caldo precioso. Prudente. Un caldo que no se atreve a ser lo que podría ser.' },
			{ say: 'lulu', text: 'Así que vamos a cocinar los dos. Con lo que da la tierra de Akala. Y tú decides. Tú y… —mira a Rotom— y la Pokédex, si come.' },
			{ say: 'rotom', text: '¡Bzzt! ¡No como! ¡Pero huelo! ¡Bueno, tampoco huelo! ¡Pero opino muchísimo!' },
			{ text: 'Cocinan a la vez, sin mirarse. Lulú, con calma: corta, prueba, añade una hoja, prueba otra vez, tararea. Gaspar, como quien pelea: fuego alto, sartén en el aire, un chorro de algo que hace llamarada. Un Tsareena y un Lurantis miran desde la puerta con las patas cruzadas.' },
			{ text: 'Dos platos sobre el mostrador. El de Lulú: un caldo claro de Baya Tamate con hojas de taro y un huevo de Chansey que tiembla. El de Gaspar: un guiso oscuro de pescado de la Ruta 8 con pimienta de lava del Wela, servido en media cáscara de coco que todavía echa humo.' },
			{ text: 'Pruebas el de Lulú. Es suave, cálido, como un abrazo de alguien que no te pregunta nada. Pruebas el de Gaspar. Te sube un calor por la nuca que te despeina por dentro. Por un segundo, ves el volcán entero. **¡Oh, ese sabor!**' },
			{ prompt: 'Lulú y Gaspar te miran sin parpadear.', choice: [
				{ text: 'Gana el caldo de Lulú.', then: [
					{ set: { 'flag.b05_shoku_lulu': true } },
					{ say: 'lulu', text: '¡Bien! ¡Bien-bien! —Da saltitos detrás del mostrador—. ¡La valentía también es saber cuándo no gritar!' },
					{ say: 'gaspar', text: '—Se lleva una cucharada del caldo a la boca. Cierra los ojos. Mucho rato—. …Le he dicho cobarde a un caldo que se había atrevido a estar callado. Me lo merezco. Enhorabuena, capitana.' },
				] },
				{ text: 'Gana el guiso de Gaspar.', then: [
					{ set: { 'flag.b05_shoku_gaspar': true } },
					{ say: 'gaspar', text: '¡Ja! ¡Comer bien es la mitad de la aventura! ¡Y la otra mitad es comer con fuego!' },
					{ say: 'lulu', text: '¡Uy! —Prueba el guiso. Se le ponen las mejillas rojas—. ¡Uy-uy-uy! Ok. Ok. Esto pica. Esto pica como para escribir una canción. Me apunto la pimienta del Wela. Para la revancha.' },
				] },
				{ text: '«Empate. Los dos son de la tierra.»', then: [
					{ set: { 'flag.b05_shoku_empate': true } },
					{ say: 'lulu', text: '¿Empate? —Mira a Gaspar. Gaspar la mira a ella. Se ríen los dos a la vez—. ¡Empate! ¡Eso es que hay que repetir! ¡Mañana, a la misma hora!' },
					{ say: 'gaspar', text: 'Empate. —Se quita el pañuelo y se seca la frente—. La primera vez en veinte años. Me gusta esta isla.' },
				] },
			] },
			{ say: 'gaspar', text: 'Toma. Lo que ha sobrado. En una cocina de verdad nunca sobra nada: se le da a alguien que va de viaje.' },
			{ give: 'bigmalasada', n: 2 },
			{ give: 'tamatoberry', n: 2 },
			{ say: 'lulu', text: '¡Y si quieres, de postre, un combate! Mis Pokémon han comido. ¡Están llenísimos de energía!' },
			{ intel: { npc: 'gaspar', text: 'En Konikoni, en duelo de cocina con la capitana Lulú: «cocinar con la tierra». Le dijo a su caldo que le faltaba valentía.' } },
		],
		b05_lulu_reto: [
			{ say: 'lulu', text: '¿Combate de postre? ¡Siéntate primero, que comer de pie da hipo! —Te pone delante un vaso de jugo de bayas—. Así no llegas con hambre.' },
			{ prompt: '¿Curar al equipo antes?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'Lulú les sirve a tus Pokémon un plato de bayas a cada uno. Se lo comen todo. Quedan como nuevos y bastante más contentos.' }] },
				{ text: 'No hace falta.', then: [{ say: 'lulu', text: '¡Bueno! Pero luego no digas que tenías hambre.' }] },
			] },
			{ battle: 'lulu_1', lose: 'continue',
				onWin: [
					{ say: 'lulu', text: '¡Qué rico combate! Te has ganado la receta de mi caldo. —Te da una hoja doblada—. Es mentira. No hay receta. Es a ojo. Pero la hoja está bonita.' },
					{ give: 'miracleseed' },
				],
				onLose: [
					{ say: 'lulu', text: '¡Te he ganado con el estómago lleno! Eso no se hace. Vuelve cuando hayas comido tú también.' },
					{ heal: true },
				] },
		],
		b05_lulu_despues: [
			{ if: 'flag.b05_shoku_gaspar', then: [
				{ say: 'lulu', text: 'Le he puesto pimienta del Wela a mi caldo. Gaspar dice que ahora sí tiene valentía. Yo digo que ahora tiene hipo. ¡Pruébalo!' },
			] },
			{ if: 'flag.b05_shoku_lulu', then: [
				{ say: 'lulu', text: 'Gaspar viene todas las mañanas a probar mi caldo. Dice que es «para estudiarlo». Repite tres veces. ¡Eso no es estudiar!' },
			] },
			{ if: 'flag.b05_shoku_empate', then: [
				{ say: 'lulu', text: 'Llevamos cuatro empates. ¡Cuatro! Gaspar dice que es un récord. Yo digo que es que nos gusta cocinar juntos y no lo queremos admitir. ¡Ups! ¡No se lo digas!' },
			] },
		],

		// =================== JOYERÍA DE MAYLA ===================
		b05_mayla_joyeria: [
			{ set: { 'flag.b05_mayla_conocida': true } },
			{ text: 'Entras. Suena una campanilla. La mujer del mostrador no levanta la vista de la piedra que mira contra la luz. Tiene una lupa en un ojo y un reloj de pulsera grande y dorado que mira cada pocos segundos.' },
			{ say: 'mayla', text: 'Un momento. —Gira la piedra—. Inclusiones. Muchas. Corte mediocre. —La deja en un platito de terciopelo como quien deja una mala noticia—. Siguiente. Tú.' },
			{ text: 'Por fin te mira. Te mira entero, de los zapatos al pelo, en un solo vistazo. Como a una piedra.' },
			{ say: 'mayla', text: 'Mayla. Kahuna de Akala y, cuando la isla me deja, joyera. Tú eres de la Gira. Lo sé porque traes cara de haber viajado demasiado y botas de no haberlas limpiado nunca.' },
			{ if: PRUEBAS, then: [
				{ say: 'mayla', text: 'Y tienes las dos pruebas de capitán. Bien. Rápido. Me gusta lo rápido. Te espero en las **Ruinas de la Vida**, al sur. No me hagas esperar. Cierro a las seis.' },
			], else: [
				{ say: 'mayla', text: 'Te faltan pruebas de capitán. Ve a por ellas. Cuando las tengas, búscame en las **Ruinas de la Vida**, al sur de la ciudad. No antes. No me gusta que me hagan perder el tiempo, y menos en lo alto de un acantilado.' },
			] },
			{ if: TT, then: [
				{ text: 'Mayla deja la lupa. Ladea la cabeza, como si escuchara algo que tú no oyes.' },
				{ say: 'mayla', text: 'Un momento. Tú llevas encima algo que pesa. No en la mochila. En el equipo. —Te mira las Poké Balls como a un escaparate—. Un Pokémon de roca que todavía no es lo que va a ser. Lo noto. Las piedras se notan.' },
				{ say: 'mayla', text: 'Tengo algo en la trastienda que lleva años esperando a alguien como ese Pokémon. Si tienes un minuto. Un minuto. No dos.' },
			] },
		],
		b05_mayla_generico: [
			{ if: 'beat("mayla_gp")', then: [
				{ say: 'mayla', text: 'Tienes el sello. Ya no hace falta que vengas a la joyería. —Pausa—. Pero si vienes, no me molesta. Hay piedras que hay que ver dos veces.' },
			], else: [
				{ say: 'mayla', text: 'Las Ruinas de la Vida, al sur. Cuando tengas las dos pruebas. Y date prisa: a las cinco tengo una tasación.', cond: '!(' + PRUEBAS + ')' },
				{ say: 'mayla', text: 'Ya tienes las dos pruebas. ¿Qué haces aún aquí? Las Ruinas. Al sur. Ya.', cond: PRUEBAS },
			] },
		],
		b05_tt_guardada: [
			{ text: 'En la vitrina del fondo, sola, sin etiqueta y sin precio, hay una piedra en bruto del tamaño de un puño: verde oscuro, rugosa, con vetas que brillan como si tuviera algo vivo dentro.' },
			{ say: 'mayla', text: 'Esa no está a la venta. Es para cuando tengas a quién dársela. —Ni levanta la vista—. Un Larvitar, un Pupitar, un Tyranitar. Lo que sea, pero tuyo. Hasta entonces, la guardo yo. Las piedras saben esperar. Yo no, pero ellas sí.' },
		],
		b05_tt_inicio: [
			{ set: { 'flag.b05_tt_visto': true } },
			{ quest: 'b05_s_tyranitarita', stage: 'joyeria' },
			{ text: 'Mayla abre una puerta detrás del mostrador. La trastienda es pequeña, sin terciopelo: una mesa de piedra, herramientas de joyero colgadas por tamaños y, en el centro, encima de un paño, una **geoda** grande como una sandía, partida a medias.' },
			{ text: 'Por la grieta se ve un brillo verde oscuro. No es cristal. Es algo más denso. Más lento.' },
			{ say: 'mayla', text: 'La encontré en la cantera de las Ruinas hace once años. Dentro hay una **Tyranitarita**. Una Megapiedra. Lo supe en cuanto la oí. Las Megapiedras se oyen, si sabes escuchar. Esta zumba bajito, como un Pupitar dentro de su caparazón.' },
			{ say: 'mayla', text: 'Llevo once años sin sacarla. ¿Sabes por qué? Porque no se puede sacar con prisa. Si la golpeas mal, se raja. Y una Megapiedra rajada es una piedra bonita y nada más.' },
			{ say: 'mayla', text: 'Yo no tengo paciencia. Lo sé. Lo admito. Es mi único defecto. —Mira el reloj—. Uno de dos.' },
			{ if: TT_EQ, then: [
				{ text: 'Una de tus Poké Balls tiembla en el cinturón. Antes de que la saques, se abre sola.' },
				{ if: 'inParty("pupitar")', then: [
					{ text: 'Tu **Pupitar** cae al suelo de la trastienda con un golpe sordo. No se mueve. Dentro del caparazón, algo late. Se queda mirando la geoda por las rendijas de los ojos. Mucho rato.' },
				] },
				{ if: 'inParty("tyranitar") && !inParty("pupitar")', then: [
					{ text: 'Tu **Tyranitar** sale de la Poké Ball y tiene que agacharse para caber en la trastienda. No ruge. Se arrodilla delante de la geoda, muy despacio, como quien se agacha a mirar un nido.' },
				] },
				{ if: 'inParty("larvitar") && !inParty("pupitar") && !inParty("tyranitar")', then: [
					{ text: 'Tu **Larvitar** sale de la Poké Ball, se planta delante de la geoda y le da un mordisquito. Muy pequeño. Para probar.' },
				] },
				{ say: 'mayla', text: '¿Lo ves? La ha oído. —Por primera vez, Mayla sonríe sin mirar el reloj—. Once años esperando a que alguien la oyera.' },
			], else: [
				{ say: 'mayla', text: 'Pero tu Pokémon no está aquí. Lo noto en ti, pero no en tu cinturón. Tráelo en el equipo. Tiene que oírla él. Yo no puedo tallar por él.' },
			] },
		],
		b05_tt_tallar: [
			{ if: '!' + TT_EQ, then: [
				{ say: 'mayla', text: 'Sin tu Pokémon de roca en el equipo no hay nada que hacer. Tiene que estar aquí cuando salga la piedra. Si no, sale sorda.' },
				{ end: true },
			] },
			{ say: 'mayla', text: 'Así se hace. Tú quitas la roca de alrededor. Despacio. Con el pico fino donde haya brillo; con el martillo, solo donde no haya nada. Y tu Pokémon escucha. Cuando la piedra esté a la vista, él hará el resto.' },
			{ say: 'mayla', text: 'Y no me mires a mí. Yo no puedo mirar. Si miro, meto prisa. —Se da la vuelta y se pone a pulir un anillo que ya brilla—.' },
			{ minigame: { type: 'dig', id: 'b05_tt_geoda', title: 'La geoda de Mayla', hint: 'El brillo verde está dentro. Quita la roca de alrededor sin pasarte: si la pared se queda sin aguante, la geoda se cierra.', theme: 'cantera', level: 3,
				guaranteed: ['tyranitarite'], loot: [{ id: 'hardstone', w: 6 }, { id: 'stardust', w: 5, n: [1, 2] }, { id: 'starpiece', w: 2 }, { id: 'rarebone', w: 1, rare: true }], picks: 2, consolation: 'hardstone', lootTitle: 'Dentro de la geoda' },
				onWin: [{ call: 'b05_tt_final' }],
				onLose: [
					{ say: 'mayla', text: '—Sin darse la vuelta—. Se ha cerrado. ¿Lo has oído? Ese ruido. Así suena la prisa. No pasa nada: la geoda vuelve a abrirse si la dejas descansar. Las piedras perdonan. Yo, menos. Inténtalo otra vez.' },
				],
				onQuit: [{ say: 'mayla', text: 'Bien. Si no estás seguro, para. Es lo más inteligente que has hecho hoy. Vuelve cuando tengas las manos tranquilas.' }] },
		],
		b05_tt_final: [
			{ set: { 'flag.b05_tyranitarita': true } },
			{ cutscene: { bg: { type: 'indoor', wall: '#4a2a4a', floor: '#2a2030' }, start: 'dark', frames: [
				{ on: '_c', item: 'tyranitarite', fx: 'glow', color: '#4a8a4a', cam: 'push', text: 'La última capa de roca cae. En el hueco de la geoda, la piedra: verde oscuro, rugosa todavía, con un brillo lento que sube y baja como una respiración.' },
				{ actors: [{ mon: 'pupitar', key: 'tt', at: 0.3, size: 'm', enter: 'pop' }], on: 'tt', fx: 'shake', shake: 1, text: 'Tu Pokémon de roca se acerca. Pone el cuerpo encima de la piedra. Y aprieta. No golpea: aprieta, quieto, con todo su peso, como solo sabe hacerlo algo que ha pasado meses dentro de un caparazón.', cond: 'inParty("pupitar")' },
				{ actors: [{ mon: 'tyranitar', key: 'tt', at: 0.3, size: 'm', enter: 'pop' }], on: 'tt', fx: 'shake', shake: 1, text: 'Tu Tyranitar pone una garra encima de la piedra. Y aprieta. No golpea: aprieta, quieto, con todo su peso, con una paciencia que no le habías visto nunca.', cond: 'inParty("tyranitar") && !inParty("pupitar")' },
				{ actors: [{ mon: 'larvitar', key: 'tt', at: 0.3, size: 's', enter: 'pop' }], on: 'tt', fx: 'shake', shake: 1, text: 'Tu Larvitar se sienta encima de la piedra. Y no se mueve. Es pequeño, pero pesa como una montaña cuando quiere. Y quiere.', cond: 'inParty("larvitar") && !inParty("pupitar") && !inParty("tyranitar")' },
				{ on: '_c', fx: ['light', 'sparkle'], text: 'Un crujido limpio. Las aristas se asientan solas. Cuando tu Pokémon se aparta, la piedra tiene caras. Pocas, grandes, perfectas. La ha tallado la presión. Y la paciencia.' },
				{ on: '_c', cam: 'pull', fx: 'glow', text: '**Tyranitarita.**' },
			] } },
			{ say: 'mayla', text: '—Se ha dado la vuelta. Mira la piedra con la lupa. Mucho rato—. Corte perfecto. Sin una sola inclusión. Once años. Y la ha tallado en un minuto.' },
			{ say: 'mayla', text: 'No. Mentira. No ha sido un minuto. Han sido los meses que tu Pokémon se ha pasado dentro de un caparazón, apretando, sin poder moverse, esperando a ser otra cosa. Eso es lo que hay dentro de la piedra. Presión. Y paciencia.' },
			{ say: 'mayla', text: 'Es tuya. Bueno, es suya. Tú solo la llevas. —Te la pone en la mano y cierra tus dedos encima, firme—. Y ahora vete, que tengo una tasación.' },
			{ text: 'Mira el reloj. No tiene ninguna tasación. Tarda un buen rato en volver a ponerse la lupa.' },
			{ quest: 'b05_s_tyranitarita', stage: 'hecha', done: true },
			{ happy: { who: 'pupitar', n: 10 }, cond: 'inParty("pupitar")' },
			{ happy: { who: 'tyranitar', n: 10 }, cond: 'inParty("tyranitar") && !inParty("pupitar")' },
		],

		// =================== RUINAS DE LA VIDA: GRAN PRUEBA ===================
		b05_ruinas_pronto: [
			{ text: 'El círculo de piedra con la marca del rombo. Vacío. Una brisa con olor a flores te despeina. Por un segundo, ves un destello rosa entre las columnas del templo. Luego nada.' },
			{ say: 'rotom', text: '¡Bzzt! Aquí es la Gran Prueba. Pero la kahuna no está. Primero las dos pruebas de capitán: **Nereida** (Colina Saltagua) y **Kiawe** (Área Volcánica del Wela).' },
		],
		b05_mayla_gp: [
			{ text: 'En el círculo de piedra, Mayla espera de pie, con los brazos cruzados y la melena moviéndose con el viento del acantilado. Lleva en la muñeca una pulsera de piedras blancas. En el centro, un cristal gris con forma de rombo.' },
			{ say: 'mayla', text: 'Llegas. —Mira el reloj—. Cuatro minutos tarde. Te los perdono porque traes las dos pruebas. No te perdono nada más.' },
			{ say: 'mayla', text: 'La Gran Prueba de Akala. Mis Pokémon son de roca, como yo. Duros, pesados y caros. Y uno de ellos, al final, usará un movimiento Z. Uno de verdad. Para que sepas lo que llevas en la muñeca.' },
			{ if: 'flag.b05_tyranitarita', then: [
				{ say: 'mayla', text: 'Y no esperes que te trate mejor por lo de la geoda. Te trataré mejor después. Si ganas.' },
			] },
			{ prompt: '¿Curar al equipo antes de la Gran Prueba?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'Mayla chasquea los dedos. Una joven de la joyería sube las escaleras con una caja de terciopelo llena de pociones, perfectamente ordenadas por tamaño. Curas a tu equipo. Mayla mira el reloj todo el tiempo.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'mayla', text: 'Bien. Me gusta la gente que no hace perder el tiempo.' }] },
			] },
			{ battle: 'mayla_gp',
				onWin: [
					{ text: 'El Lycanroc de Mayla cae de rodillas en el centro del círculo, sobre la marca del rombo. Mayla lo devuelve a su Poké Ball. Se queda un momento mirándola. Luego se la guarda. Y luego, por primera vez, no mira el reloj.' },
					{ say: 'mayla', text: 'Bien. —Se aclara la garganta—. Muy bien. Mejor de lo que te había tasado. Y te había tasado alto.' },
					{ badge: 'sello_akala' },
					{ cap: 60 },
					{ say: 'mayla', text: 'El **Sello de Akala**. Vale como medalla del Circuito. Y esto. —Te da un cristal gris, áspero, que pesa más de lo que parece—. El **Litostal Z**. Para que tus Pokémon de roca también sepan hacer caer una montaña.' },
					{ give: 'rockiumz' },
					{ set: { 'flag.b05_mayla_vencida': true } },
					{ quest: 'b05_m3', stage: 'hecha', done: true },
					{ if: LUC, then: [
						{ text: '{riolu} se acerca a la marca del rombo y pone la palma encima. El aura le brilla un segundo. Entre las columnas del templo, muy rápido, pasa un destello rosa. Las flores se abren todas a la vez. El aire deja de oler tan dulce.' },
						{ say: 'mayla', text: 'Vaya. Le has caído bien. —Mira hacia el templo—. A ella no le cae bien casi nadie. A mí tampoco.' },
					] },
					{ diary: 'Hoy mi entrenador{|a|e} ha ganado la Gran Prueba de Akala. La kahuna Mayla tiene un Lycanroc que da muchísimo miedo y un reloj que mira todo el rato. Cuando perdió, no lo miró. Yo me fijé. Me fijo en todo. Bueno, en casi todo. ¡Ya tenemos dos sellos! Akala huele a flores y a volcán y a malasada. Es la isla que mejor huele de todas las que he olido, y eso que no tengo nariz.', cond: 'flag.b01_diario' },
					{ call: 'b05_aether_invitacion' },
				] },
		],
		b05_aether_invitacion: [
			{ if: 'flag.b05_aether_invitacion', then: [{ end: true }] },
			{ text: 'Al bajar las escaleras del templo, alguien te espera al pie del acantilado. Un hombre con un uniforme completamente blanco, guantes blancos y una gorra blanca. Hace calor. No suda.' },
			{ say: 'empleado_aether', text: 'Buenas tardes. ¿{jugador}? Fundación Æther. —Hace una reverencia pequeña y exacta—. Traigo una invitación. En mano. El Presidente en funciones insiste en que sea en mano.' },
			{ text: 'Te tiende un sobre blanco, grueso, cerrado con un sello de lacre plateado. En el sello, un símbolo que no conoces: una forma geométrica, como una flor de cristal.' },
			{ give: 'invitacionaether' },
			{ read: 'invitacionaether' },
			{ say: 'empleado_aether', text: 'El barco de la Fundación sale desde el puerto de Kantai. Cuando usted lo desee. La Fundación está a su disposición. —Pausa, sonrisa exacta—. ¿Quiere usted que le diga algo más?' },
			{ choice: [
				{ text: '«¿Por qué yo?»', then: [
					{ say: 'empleado_aether', text: 'No me corresponde saberlo. Solo entrego. Pero el Presidente en funciones no invita a nadie. Nunca. Puede usted sacar sus conclusiones.' },
				] },
				{ text: '«No, gracias.»', then: [
					{ say: 'empleado_aether', text: 'Perfecto. Que tenga usted un día excelente. —Se va. No hace ruido al andar. Ni siquiera en la grava.' },
				] },
			] },
			{ say: 'rotom', text: '¡Bzzt! ¡Una invitación! ¡Con lacre! ¡Nunca nos habían invitado con lacre! —Pausa—. ¿Por qué no suda? Aquí suda hasta la piedra. Él no sudaba.' },
			{ text: 'La Pokédex vibra. Un mensaje de Leilani.' },
			{ say: 'leilani', as: 'Leilani (mensaje)', text: '¿Te han invitado a Æther? ¡A mí también! Bueno, a mis planos. Bueno, a mí con mis planos. Me han mandado un sobre blanquísimo. Lo he abierto con las manos sucias y he manchado el lacre. Me siento fatal. Me siento genial. ¿Sí o qué?' },
			{ set: { 'flag.b05_aether_invitacion': true } },
			{ quest: 'b05_m4', stage: 'invitacion' },
			{ set: { 'flag.b05_t1_hecho': true } },
		],
		b05_ruinas_despues: [
			{ text: 'El círculo de piedra de la Gran Prueba. En la marca del rombo, las huellas de tu combate. Una brisa con olor a flores pasa, da una vuelta a tu alrededor como si te reconociera, y se va hacia el templo.' },
		],
		b05_templo_lele: [
			{ text: 'La puerta del templo es de piedra rosa, cerrada, sin cerradura. Tiene tallado un rombo y, alrededor, flores y mariposas. Huele tan dulce que da un poco de sueño.' },
			{ text: 'En el escalón de la puerta hay una ofrenda reciente: tres malasadas, una flor y un vaso de leche. Alguien se ha comido la mitad de una malasada. No sabes quién. No ha sido nadie que se vea.' },
			{ if: LUC, then: [
				{ text: '{riolu} mira la puerta y se queda quieto. No es miedo. Es como cuando alguien te mira desde detrás de una cortina y tú haces como que no lo notas, por educación.' },
			] },
		],

		// =================== KANTAI: TURISTA CON MEGA-ALTARIA ===================
		b05_iolana: [
			{ text: 'En el malecón, una turista con sombrero de paja y una flor en el pelo hace fotos al cielo con una cámara antigua. A su lado, un Altaria esponjoso mira también hacia arriba. Lleva al cuello un collar con una piedra azul que brilla.' },
			{ say: 'kantai_turista', as: 'Azucena', text: '¿Tú también lo has visto? A media tarde. El cielo se apaga un poco, como si pasara una nube. Pero no hay nube. Llevo tres días haciendo fotos y en todas sale igual: más oscuro de lo que debería.' },
			{ say: 'kantai_turista', as: 'Azucena', text: 'Mi Altaria lo nota. Desde que llegamos canta menos. ¿Combatimos? Cuando combate se olvida. Y cuando se olvida, a veces se transforma. Te aviso: es muy bonito cuando se transforma. Y muy fuerte.' },
			{ prompt: '¿Combatir con Azucena? Cura antes, si quieres.', choice: [
				{ text: 'Combatir (curar antes).', then: [
					{ heal: 'Azucena te ofrece un termo de té frío para ti y unas pociones para tu equipo. «Para que sea justo. Las fotos salen mejor cuando es justo».' },
					{ battle: 'kantai_iolana', lose: 'continue',
						onWin: [{ say: 'kantai_turista', as: 'Azucena', text: 'Ha cantado. ¿Lo has oído? Al final, ha cantado. Gracias. —Le hace una foto a su Altaria—. Esta foto sí sale clara.' }],
						onLose: [{ say: 'kantai_turista', as: 'Azucena', text: 'Altaria está contento. Gracias por dejarte… bueno, por combatir.' }, { heal: true }] },
				] },
				{ text: 'Ahora no.', then: [{ say: 'kantai_turista', as: 'Azucena', text: 'Aquí estaré, haciéndole fotos al cielo. Hasta que salga bien.' }] },
			] },
		],
		b05_iolana_despues: [
			{ say: 'kantai_turista', as: 'Azucena', text: 'Sigo haciendo fotos. Hoy el cielo se ha apagado cuatro minutos. Ayer, tres. Lo apunto todo. Cuando vuelva a Hoenn, se lo voy a enseñar a alguien que sepa de cielos.' },
		],
	},

	// =====================================================================
	// NPCs GENÉRICOS DE ESTE TRAMO
	// =====================================================================
	npcs: {
		soldabot: { name: 'Soldi', title: 'Asistente de soldadura del taller Kahale', generic: true, look: { hair: 'bald', hairColor: '#8a8a9a', outfit: '#8a8a9a', outfit2: '#f2c84a', skin: '#b8bcc8', eyes: '#5ab8e8', eyesStyle: 'sharp', mouth: 'flat', acc: 'goggles', bg: '#3a3a40' } },
		capataza_ohana: { name: 'Capataza del Rancho Ohana', generic: true, look: { hair: 'braids', hairColor: '#6a6a6a', outfit: '#8a5a2f', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'sharp', mouth: 'smile', acc: 'hat', hatColor: '#c9a66b' } },
		kantai_turista: { name: 'Turista', generic: true, look: { hair: 'long', hairColor: '#4a8ac4', outfit: '#e9e8e0', outfit2: '#8ab0e0', skin: 1, eyesStyle: 'happy', mouth: 'smile', acc: 'hat flower' } },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		cartamalia: { name: 'Carta de Malia Kahale', pocket: 'key', desc: 'Un sobre amarillo, gastado por los bordes, con letra grande y rápida: «Para Lani. Si tardo». Leilani te pidió que lo guardaras tú.',
			read: '*(Letra grande, rápida, inclinada hacia la derecha, como si tuviera prisa por llegar al final de cada renglón. Una mancha de grasa en una esquina. Otra de café.)*\n\nLani:\n\nSi estás leyendo esto, es que he tardado. Perdón. Ya sabes que siempre llego tarde. A las reuniones, a tus funciones del colegio, a cenar. Esta vez, igual. Pero llego. Lo arreglo y llego.\n\nHay un agujero encima de la bahía y está creciendo. Si sigue creciendo, se traga el puerto, el taller, el colegio y la tienda de malasadas de la esquina, que es lo que más me preocupa. Sé cómo cerrarlo. Hay que coserlo desde dentro, como el roto de tu mochila, ¿te acuerdas? Por el revés, para que no se note.\n\nAsí que voy a entrar. Llevo el anclaje que dibujamos juntas en la mesa de la cocina (el tuyo, el de las tres pinzas; el mío no servía, tenías razón, no te lo había dicho).\n\nCosas que tienes que saber:\n\n1. Los tornillos no se dejan en el suelo. Ya sé que yo los dejo. Haz lo que digo, no lo que hago.\n2. Riega la planta de mi mesa. A Pimpinela se le olvida.\n3. Tú no sobras. En ningún sitio. En ninguna mesa. Si alguien te hace sentir que sobras, es que la mesa está mal hecha. Las mesas se arreglan.\n4. ¿Te acuerdas de la linterna? Tres cortas y una larga: «estoy bien, vuelve a dormir». No se te olvide. A mí no se me olvida.\n5. Si alguien cierra la puerta, que sea Calder; él sabrá por qué.\n\nY ya. Que me esperan. Que me está mirando Pimpinela con cara de «Malia, el traje».\n\nTe quiero más que a mi llave inglesa. Y a la llave inglesa la quiero muchísimo.\n\nMamá\n\n*(Debajo, con otra tinta, más pequeño, como añadido en el último momento:)*\n\n*P. D.: Termina la lámpara. La que dejaste a medias. Sé que la tienes debajo de la cama.*' },
		postal_adela_j: { name: 'Postal de Adela', pocket: 'key', desc: 'Una postal con un prado con niebla. Matasellos de Iris. Letra apretada, sin adornos.',
			read: '{jugador}:\n\nEl rancho sigue en pie. El tejado aguanta. Los Mareep, gordos. Cuento las cabezas cada mañana y me salen las que tienen que salir.\n\nUso la llave de repuesto. La tuya la tienes tú, que para eso es tu rancho. Yo solo lo cuido. Cuando vengas, la puerta va a estar abierta igual. Pero me gusta pensar que tienes la llave.\n\nEl tío decía que un rancho es de quien vuelve. Vuelve cuando puedas.\n\nAdela\n\n*P. D.: Me han dicho que estás en Alola. Que haga calor. Aquí hace frío. No te lo digo para que vuelvas. Bueno, un poco.*' },
		postal_adela_s: { name: 'Postal de Adela', pocket: 'key', desc: 'Una postal con un prado con niebla y una foto doblada dentro. Matasellos de Iris. Letra apretada, sin adornos.',
			read: '{jugador}, socio:\n\nCuentas del mes. Las mando porque a un socio se le rinden cuentas, no las gracias. Ya te lo dije.\n\nLana: bien. Leche: más de la que bebemos. Gastos: los de siempre, y uno de más, porque Rosaura se empeñó en pintar la cerca. La cerca no lo necesitaba. Ella sí.\n\nTe mando una foto. No preguntes por qué. Me pareció que te gustaría.\n\nEl tío decía que un rancho es de quien vuelve. Tú vuelves en las cuentas. Con eso, por ahora, me basta.\n\nAdela\n\n*P. D.: En Alola dicen que hace calor. Aquí no. No es queja. Es un dato.*' },
		postal_adela_n: { name: 'Postal de Adela', pocket: 'key', desc: 'Una postal con un prado con niebla. Matasellos de Iris. Letra apretada, sin adornos.',
			read: '{jugador}:\n\nEl rancho sigue en pie. Me viene grande, pero sigue en pie. Los Mareep, gordos. Cuento las cabezas cada mañana y me salen las que tienen que salir.\n\nEl tío decía que un rancho es de quien vuelve. Yo no me he ido, así que supongo que es mío. Todavía me cuesta escribirlo.\n\nSi un día pasas por aquí, hay café. Malo, pero hay.\n\nAdela\n\n*P. D.: Me han dicho que estás en Alola. Que te vaya bien. Y que no te quemes. Eres de los que se queman.*' },
		postal_adela_l: { name: 'Postal de Adela', pocket: 'key', desc: 'Una postal con un prado con niebla. Matasellos de Iris. La letra es más pequeña de lo normal.',
			read: '{jugador}:\n\nEl rancho sigue en pie. Los Mareep, gordos. Eso es lo bueno.\n\nLos martes vienen los de la Fundación. Con traje. Miran las cuentas, cuentan los Mareep, apuntan cosas en una tableta y se van. Son muy educados. Nunca me han dicho nada malo. No sé por qué cada martes me duele la tripa.\n\nEl contrato es por tres años. Ya queda menos. Cuando se acabe, te llamo. Ese día sí.\n\nEl tío decía que un rancho es de quien vuelve. Yo no me he ido. Pero hay días que no sé si estoy.\n\nAdela\n\n*P. D.: El martes pasado, uno de los de la Fundación preguntó por ti. Si te había visto. Le dije que no. No sé por qué mentí. Me salió.*' },
		fotolapras: { name: 'Foto «Lapras al atardecer»', pocket: 'key', art: 'lapras_atardecer', desc: 'La foto que hizo Rotom en la Colina Saltagua: un Lapras en la orilla, al atardecer, con el cuello bajado hacia la arena. Leilani sale de espaldas, con los brazos en alto. Rotom dice que es la primera foto de algo que «casi explota y no explotó».' },
		invitacionaether: { name: 'Invitación de la Fundación Æther', pocket: 'key', desc: 'Un sobre blanco y grueso con un sello de lacre plateado en forma de flor de cristal. Huele a nada. Ni a papel.',
			read: '**FUNDACIÓN ÆTHER**\n*Paraíso Æther · Alola*\n\n---\n\nEstimad{o|a|e} {jugador}:\n\nEl Presidente en funciones de la Fundación Æther solicita su presencia en el **Paraíso Æther** a la mayor brevedad que le resulte conveniente.\n\nLa Fundación conoce su papel en la Gira Interregional y su condición de colaborador{|a|e} de la Policía Internacional. Por ese motivo, y por otros que preferimos tratar en persona, le rogamos que acuda.\n\nEl barco de la Fundación le esperará en el puerto de **Ciudad Kantai**.\n\nLe saluda atentamente,\n\n*Zyra*\nSubdirectora · Fundación Æther\n*en nombre del Presidente en funciones*\n\n---\n\n*(Debajo, a mano, con otra letra, más brusca, apretando tanto que el bolígrafo casi rompe el papel:)*\n\n*Ven sol{o|a|e}. O con tu Lucario. Con nadie más. — G.*' },
		b05_mt_fuerza_equina: { name: 'MT Fuerza Equina', pocket: 'machines', tm: 'highhorsepower', desc: 'El usuario arremete contra el objetivo con todo el peso de su cuerpo. Premio del Rancho Ohana: «el saludo» de los Mudsdale.' },
	},

	// =====================================================================
	// MISIONES PEQUEÑAS
	// =====================================================================
	quests: {},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b05_huerto_ohana: {
			name: 'El huerto del Rancho Ohana', icon: '🧺', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'huerto', hint: 'Sacude las ramas y recoge con la cesta. Las doradas valen por tres; las pochas, a los Tauros.' },
			ask: 'Árboles bajos cargados de bayas, un espantapájaros con sombrero de vaquero y un Miltank que mira cada baya que cae como si fuera suya.',
			text: 'Recoges lo que el huerto da hoy. El Miltank se come las que se caen al suelo. Le parece justo.',
			wait: 'El huerto está pelado. El Miltank te mira como si fuera culpa tuya. Lo es.',
			table: [
				{ id: 'oranberry', w: 18, n: [1, 3] }, { id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'pechaberry', w: 12, n: [1, 2] },
				{ id: 'tamatoberry', w: 10, n: [1, 2] }, { id: 'grepaberry', w: 8, n: [1, 1] }, { id: 'moomoomilk', w: 10, n: [1, 2] },
				{ id: 'lumberry', w: 4, n: [1, 1], rare: true }, { id: 'starfberry', w: 1, n: [1, 1], rare: true },
			],
		},
		b05_wela_veta: {
			name: 'La veta de roca roja', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 2, theme: 'cueva', hint: 'La roca del Wela está caliente. Los destellos rojos del principio marcan dónde hay algo.' },
			ask: 'Una pared de roca roja que suda calor. Entre las grietas, destellos que podrían ser cristal o podrían ser fuego.',
			text: 'La veta del Wela suelta lo suyo. Quema un poco al tocarlo.',
			wait: 'La veta todavía está demasiado caliente. Mejor dejarla enfriar un día.',
			table: [
				{ id: 'hardstone', w: 14, n: [1, 1] }, { id: 'stardust', w: 14, n: [1, 2] }, { id: 'charcoal', w: 10, n: [1, 1] },
				{ id: 'heatrock', w: 8, n: [1, 1] }, { id: 'firestone', w: 6, n: [1, 1] }, { id: 'starpiece', w: 4, n: [1, 1] },
				{ id: 'magmarizer', w: 2, n: [1, 1], rare: true }, { id: 'rarecandy', w: 1, n: [1, 1], rare: true },
			],
		},
		b05_r4_bayas: {
			name: 'Árbol de bayas junto a la valla', icon: '🌳', hours: 20, picks: [2, 3],
			text: 'Sacudes el árbol con cuidado. Caen bayas. El Mudsdale de la valla mira cuántas, y luego te mira a ti, por si se te ocurre llevártelas todas.',
			wait: 'El árbol ya está pelado. El Mudsdale de la valla parece satisfecho.',
			table: [
				{ id: 'oranberry', w: 18, n: [1, 3] }, { id: 'sitrusberry', w: 12, n: [1, 2] }, { id: 'rawstberry', w: 10, n: [1, 2] },
				{ id: 'pomegberry', w: 8, n: [1, 1] }, { id: 'tamatoberry', w: 6, n: [1, 1] }, { id: 'lumberry', w: 3, n: [1, 1] },
			],
		},
		b05_r5_helechos: {
			name: 'Charca entre los helechos', icon: '🍄', hours: 20, picks: [1, 3],
			text: 'Rebuscas en la orilla de la charca. Setas, bayas mojadas y, en el barro, algo que brilla.',
			wait: 'La charca está revuelta. Mejor esperar a que se asiente el barro.',
			table: [
				{ id: 'tinymushroom', w: 20, n: [1, 3] }, { id: 'bigmushroom', w: 10, n: [1, 1] }, { id: 'pechaberry', w: 12, n: [1, 2] },
				{ id: 'miracleseed', w: 4, n: [1, 1] }, { id: 'balmmushroom', w: 3, n: [1, 1] }, { id: 'shinystone', w: 1, n: [1, 1] },
			],
		},
		b05_r8_playa: {
			name: 'La orilla de arena negra', icon: '🐚', hours: 18, picks: [1, 3],
			text: 'Recorres la orilla de arena negra. La marea deja entre la lava conchas, perlas y, a veces, algo que brilla como una brasa apagada.',
			wait: 'La orilla está limpia. La marea todavía no ha traído nada nuevo.',
			table: [
				{ id: 'pearl', w: 18, n: [1, 2] }, { id: 'shoalsalt', w: 14, n: [1, 2] }, { id: 'shoalshell', w: 12, n: [1, 2] },
				{ id: 'bigpearl', w: 6, n: [1, 1] }, { id: 'starpiece', w: 4, n: [1, 1] }, { id: 'heatrock', w: 3, n: [1, 1] },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		prueba_nereida: {
			name: 'Prueba de la capitana Nereida', npc: 'nereida', type: 'Water', rec: 58,
			cond: 'visited("colina_saltagua")',
			info: [
				{ text: 'Capitana: **Nereida** (Agua). Tres salpicaduras en la Colina Saltagua. La tercera, dice, «muerde».' },
				{ cond: 'flag.b05_saltagua_2', text: 'En la poza grande espera un **Pokémon dominante**: más grande y más fuerte de lo normal. No se puede capturar ni huir. **Eléctrico** y **Roca** le sientan mal; el **Fuego** le hace poco.' },
				{ cond: 'flag.b05_nereida_hecha', text: '✔ Prueba superada. Hidrostal Z conseguido.' },
			],
		},
		prueba_kiawe: {
			name: 'Prueba del capitán Kiawe', npc: 'kiawe', trainer: 'kiawe_1', type: 'Fire', rec: 58,
			cond: 'visited("area_wela")',
			info: [
				{ text: 'Capitán: **Kiawe** (Fuego). Primero quiere verte combatir; luego, una danza en su escenario.' },
				{ cond: 'beat("kiawe_1")', text: 'La danza: repite los pasos en orden. Al final, sube algo de la grieta del escenario. Es grande, baila y quema. **Agua**, **Tierra** y **Roca** le vienen bien.' },
				{ cond: '!beat("kiawe_1")', text: '3 Pokémon, hasta el nivel 58. El **Agua** y la **Roca** apagan su fuego. Un Lucario sufre aquí: mejor que no salga el primero.' },
				{ cond: 'flag.b05_kiawe_hecha', text: '✔ Prueba superada. Pirostal Z conseguido.' },
			],
		},
		rancho_ohana_entreno: {
			name: 'Rancho Ohana (entrenamiento)', type: 'Normal', rec: 59,
			cond: 'visited("rancho_ohana")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **59**: vaqueros y Pokémon del rancho.' },
				{ text: 'La capataza da un premio a quien gane tres combates «sin caerse del caballo».' },
			],
		},
		rival_rhi_b5: {
			name: 'Rhi en el volcán', npc: 'rhi', trainer: 'rhi_6', type: 'Fire', rec: 58,
			cond: 'flag.b05_rhi_wela',
			info: [
				{ text: 'Rhi quiere aprender la danza de Kiawe. Es opcional. Te deja curar antes.' },
				{ text: '5 Pokémon, hasta el nivel 58. Su **Cinderace** sale el último, como siempre.' },
				{ cond: 'beat("rhi_6")', text: '✔ Ganado. Te invita a una malasada. Algún día.' },
			],
		},
	},
};
