// Bloque 5 · Pieza T5: el negocio del bloque y tiendas de Alola.
//   b05_taller          Taller Kahale (Kantai), socia Leilani. Aparece con flag.b05_ridegear.
//                       Líneas: reparaciones (dinero), piezas (objetos de evolución, por fracciones),
//                       monturas (Repelentes, PP) y «la mesa del fondo» (inventos: objetos equipables raros, bloqueada).
//                       Encargados: Leilani · los Skull (flag.b05_skull_taller, T2) · Kiawe (flag.b05_kiawe_hecha, T1).
//   b05_piedras_kantai  Puesto de piedras evolutivas en el muelle de Kantai.
//   b05_mt_konikoni     Planta alta del Mercado de Konikoni: MT que no se venden en otras regiones.
// Formato de negocios: docs/CONTENIDO.md §13. Economía: entrada ₽15 000 + mejoras ₽150 000 (total ₽165 000).
// Escenas de ambiente (no bloquean nada): oferta, entrada (buy.script), dos mejoras, llegada de Kiawe y de los Skull.

const V = 'b05_taller';
const SOCIO = 'partner("' + V + '")';

export default {
	// =====================================================================
	// OBJETOS: MT nuevas (Konikoni)
	// =====================================================================
	items: {
		b05_mt_trampa_rocas: { name: 'MT Trampa Rocas', pocket: 'machines', tm: 'stealthrock', desc: 'Siembra el campo rival de piedras flotantes que hieren a cada Pokémon que entra en combate.' },
		b05_mt_mofa: { name: 'MT Mofa', pocket: 'machines', tm: 'taunt', desc: 'Provoca al objetivo para que durante unos turnos solo pueda usar movimientos que hagan daño.' },
		b05_mt_agilidad: { name: 'MT Agilidad', pocket: 'machines', tm: 'agility', desc: 'El usuario relaja el cuerpo y aligera sus movimientos. Sube mucho su Velocidad.' },
		b05_mt_descanso: { name: 'MT Descanso', pocket: 'machines', tm: 'rest', desc: 'El usuario se duerme dos turnos. Recupera todos sus PS y se cura de cualquier problema de estado.' },
		b05_mt_sonambulo: { name: 'MT Sonámbulo', pocket: 'machines', tm: 'sleeptalk', desc: 'Mientras duerme, el usuario usa al azar uno de sus otros movimientos.' },
		b05_mt_defensa_ferrea: { name: 'MT Defensa Férrea', pocket: 'machines', tm: 'irondefense', desc: 'Endurece la superficie del cuerpo como si fuera de hierro. Sube mucho la Defensa.' },
		b05_mt_viento_hielo: { name: 'MT Viento Hielo', pocket: 'machines', tm: 'icywind', desc: 'Ataca con un viento helado que baja la Velocidad del objetivo.' },
		b05_mt_colmillo_igneo: { name: 'MT Colmillo Ígneo', pocket: 'machines', tm: 'firefang', desc: 'Muerde con colmillos en llamas. Puede quemar al objetivo o hacerlo retroceder.' },
		b05_mt_colmillo_rayo: { name: 'MT Colmillo Rayo', pocket: 'machines', tm: 'thunderfang', desc: 'Muerde con colmillos electrificados. Puede paralizar al objetivo o hacerlo retroceder.' },
		b05_mt_colmillo_hielo: { name: 'MT Colmillo Hielo', pocket: 'machines', tm: 'icefang', desc: 'Muerde con colmillos helados. Puede congelar al objetivo o hacerlo retroceder.' },
		b05_mt_hierba_lazo: { name: 'MT Hierba Lazo', pocket: 'machines', tm: 'grassknot', desc: 'Enreda las patas del objetivo con hierba. Cuanto más pesa el objetivo, más daño le hace.' },
		b05_mt_respiro: { name: 'MT Respiro', pocket: 'machines', tm: 'roost', desc: 'El usuario aterriza y descansa. Recupera la mitad de sus PS máximos.' },
		b05_mt_pataleta: { name: 'MT Pataleta', pocket: 'machines', tm: 'stompingtantrum', desc: 'El usuario descarga su rabia a patadas. Si su último movimiento falló, el golpe es el doble de fuerte.' },
		b05_mt_desarme: { name: 'MT Desarme', pocket: 'machines', tm: 'knockoff', desc: 'Golpea al objetivo y le hace soltar el objeto que lleva. Pega más si lleva uno.' },
		b05_mt_plancha_corporal: { name: 'MT Plancha Corporal', pocket: 'machines', tm: 'bodypress', desc: 'Embiste con todo el cuerpo. El daño se calcula con la Defensa del usuario en lugar de con su Ataque.' },
		b05_mt_onda_ignea: { name: 'MT Onda Ígnea', pocket: 'machines', tm: 'heatwave', desc: 'Lanza una ráfaga de aire abrasador que alcanza a todos los rivales. Puede quemarlos.' },
		b05_mt_voltio_cruel: { name: 'MT Voltio Cruel', pocket: 'machines', tm: 'wildcharge', desc: 'El usuario se envuelve en electricidad y embiste. También se hace algo de daño.' },
		b05_mt_zumbido: { name: 'MT Zumbido', pocket: 'machines', tm: 'bugbuzz', desc: 'Una onda sonora dañina. Puede bajar la Defensa Especial del objetivo.' },
		b05_mt_espacio_raro: { name: 'MT Espacio Raro', pocket: 'machines', tm: 'trickroom', desc: 'Crea un espacio extraño durante cinco turnos en el que los Pokémon más lentos se mueven primero.' },
		b05_mt_psicocolmillo: { name: 'MT Psicocolmillo', pocket: 'machines', tm: 'psychicfangs', desc: 'Muerde con poder psíquico. También destruye barreras como Reflejo y Pantalla de Luz.' },
		b05_mt_fuerza_bruta: { name: 'MT Fuerza Bruta', pocket: 'machines', tm: 'superpower', desc: 'Ataca con una fuerza descomunal, pero baja el Ataque y la Defensa del usuario.' },
		b05_mt_enfado: { name: 'MT Enfado', pocket: 'machines', tm: 'outrage', desc: 'El usuario arrasa durante dos o tres turnos y luego se queda confuso.' },
		b05_mt_vendaval: { name: 'MT Vendaval', pocket: 'machines', tm: 'hurricane', desc: 'Envuelve al objetivo en un viento furioso. Puede confundirlo. Con lluvia no falla.' },
		b05_mt_pajaro_osado: { name: 'MT Pájaro Osado', pocket: 'machines', tm: 'bravebird', desc: 'El usuario se lanza en picado contra el objetivo. También se hace bastante daño.' },
		b05_mt_lanzamugre: { name: 'MT Lanzamugre', pocket: 'machines', tm: 'gunkshot', desc: 'Lanza basura inmunda contra el objetivo. Puede envenenarlo.' },
		b05_mt_lluevehojas: { name: 'MT Lluevehojas', pocket: 'machines', tm: 'leafstorm', desc: 'Una tormenta de hojas afiladas. Baja mucho el Ataque Especial del usuario.' },
	},

	// =====================================================================
	// TIENDAS
	// =====================================================================
	shops: {
		// Kantai · muelle: todas las piedras evolutivas (Konikoni ya vende la Piedra Hielo y la Oval)
		b05_piedras_kantai: { name: 'Piedras del muelle (Kantai)', items: [
			'firestone', 'waterstone', 'thunderstone', 'leafstone', 'moonstone', 'sunstone', 'shinystone', 'duskstone', 'dawnstone', 'everstone',
		] },
		// Konikoni · planta alta del mercado
		b05_mt_konikoni: { name: 'MT de Konikoni (planta alta)', items: [
			{ id: 'b05_mt_mofa', price: 6000 }, { id: 'b05_mt_agilidad', price: 6000 }, { id: 'b05_mt_descanso', price: 6000 }, { id: 'b05_mt_sonambulo', price: 6000 },
			{ id: 'b05_mt_defensa_ferrea', price: 6000 }, { id: 'b05_mt_viento_hielo', price: 8000 }, { id: 'b05_mt_colmillo_igneo', price: 8000 }, { id: 'b05_mt_colmillo_rayo', price: 8000 },
			{ id: 'b05_mt_colmillo_hielo', price: 8000 }, { id: 'b05_mt_trampa_rocas', price: 10000 }, { id: 'b05_mt_hierba_lazo', price: 10000 }, { id: 'b05_mt_respiro', price: 10000 },
			{ id: 'b05_mt_pataleta', price: 10000 }, { id: 'b05_mt_desarme', price: 15000 }, { id: 'b05_mt_plancha_corporal', price: 15000 }, { id: 'b05_mt_onda_ignea', price: 15000 },
			{ id: 'b05_mt_voltio_cruel', price: 15000 }, { id: 'b05_mt_zumbido', price: 15000 }, { id: 'b05_mt_espacio_raro', price: 15000 }, { id: 'b05_mt_psicocolmillo', price: 15000 },
			{ id: 'b05_mt_fuerza_bruta', price: 20000 }, { id: 'b05_mt_enfado', price: 20000 }, { id: 'b05_mt_vendaval', price: 20000 }, { id: 'b05_mt_pajaro_osado', price: 20000 },
			{ id: 'b05_mt_lanzamugre', price: 20000 }, { id: 'b05_mt_lluevehojas', price: 20000 },
		] },
	},

	// =====================================================================
	// SITIOS EN LUGARES DEL B5
	// =====================================================================
	extraSpots: {
		taller_kahale: [
			{ label: 'Leilani y un sobre con media lemniscata', sub: 'Lo sujeta con unos alicates, lejos de la cara', icon: '✉️', cond: 'flag.b05_ridegear && !flag.b05_taller_oferta && !' + SOCIO, new: 'true', talk: [{ script: 'b05_taller_oferta' }] },
			{ label: 'Las cuentas del taller', sub: 'Una libreta grasienta colgada de un clavo', icon: '📒', cond: 'flag.b05_taller_oferta || ' + SOCIO, action: { venture: V } },
			{ label: 'Kiawe, junto a la fragua', sub: 'Marca el compás con el pie. El Turtonator lo mira', icon: '🔥', cond: SOCIO + ' && flag.b05_kiawe_hecha && !flag.b05_taller_kiawe', new: 'true', talk: [{ script: 'b05_taller_kiawe' }] },
			{ label: 'Dos chicos con capucha en la puerta', sub: 'Traen un sobre y no se atreven a entrar', icon: '🧢', cond: SOCIO + ' && flag.b05_skull_taller && !flag.b05_taller_skull', new: 'true', talk: [{ script: 'b05_taller_skull' }] },
		],
		kantai: [
			{ label: 'Piedras del muelle', sub: 'Un puesto entre dos contenedores, con una balanza de latón', icon: '🪨', action: { shop: 'b05_piedras_kantai' } },
		],
		konikoni: [
			{ label: 'Planta alta del mercado', sub: 'MT en estanterías de bambú', icon: '💿', action: { shop: 'b05_mt_konikoni' } },
		],
	},

	// =====================================================================
	// NEGOCIO
	// =====================================================================
	ventures: {
		b05_taller: {
			name: 'Taller Kahale', icon: '🔧', loc: 'taller_kahale', partner: 'leilani',
			cond: 'flag.b05_ridegear',
			blurb: 'Un hangar de chapa en el muelle de Kantai, una mecánica con demasiados encargos y un brazo robótico con opiniones.',
			buy: { cost: 15000, text: '«No es un préstamo, ¿eh? Ni una limosna. Es… ¿cómo se dice cuando alguien se sube a tu invento sabiendo que puede explotar? Eso. Socios.»', script: 'b05_taller_entrada' },
			share: [{ pct: 40 }],
			upkeep: 700, store: 3,
			lines: {
				reparaciones: { name: 'Reparaciones', icon: '🛠️', desc: 'Sillas de Tauros, arneses de Mudsdale, motores fuera borda y, los martes, el ferry de Hauoli. Es lo que paga la luz.', money: 3200 },
				piezas: { name: 'Piezas', icon: '⚙️', desc: 'Lo que sale de la fragua de Turtonator cuando Leilani tiene un rato: piezas que algunos Pokémon necesitan para evolucionar. Salen de vez en cuando.', money: 300,
					items: [{ id: 'metalcoat', perDay: 0.12 }, { id: 'upgrade', perDay: 0.06 }, { id: 'electirizer', perDay: 0.06 }, { id: 'magmarizer', perDay: 0.06 }, { id: 'protector', perDay: 0.06 }, { id: 'dubiousdisc', perDay: 0.04 }] },
				monturas: { name: 'Equipo de viaje', icon: '🧭', desc: 'Lo que se lleva quien viaja montado: repelente para que no se acerque nadie y algo para que a los movimientos no se les acabe la cuerda.', money: 500,
					items: [{ id: 'maxrepel', perDay: 1 }, { id: 'maxether', perDay: 0.3 }, { id: 'ppup', perDay: 0.06 }] },
				inventos: { name: 'La mesa del fondo', icon: '💡', desc: 'Inventos. Casi ninguno funciona. Los que funcionan son objetos que un Pokémon puede llevar en combate, y no salen dos iguales seguidos.', locked: true,
					items: [{ id: 'choicescarf', perDay: 0.015 }, { id: 'lifeorb', perDay: 0.015 }, { id: 'airballoon', perDay: 0.02 }, { id: 'assaultvest', perDay: 0.015 }, { id: 'ejectbutton', perDay: 0.015 }, { id: 'heavydutyboots', perDay: 0.015 }, { id: 'weaknesspolicy', perDay: 0.01 }, { id: 'cellbattery', perDay: 0.015 }] },
			},
			upgrades: [
				{ id: 'extintor', name: 'Un extintor. De verdad', cost: 3000, mult: { all: 1.1 },
					desc: 'El que hay es un cubo con la palabra «EXTINTOR» escrita a rotulador. Uno rojo, con manguera y fecha de revisión. Se trabaja más tranquilo.' },
				{ id: 'banco', name: 'Banco de trabajo nuevo', cost: 9000, mult: { reparaciones: 1.4 }, slots: 1,
					desc: 'El de ahora es una puerta sobre dos bidones. Uno de acero, con tornillo de banco y luz. Muchas más reparaciones y sitio para un Pokémon más trabajando.' },
				{ id: 'cartel', name: 'Cartel luminoso en el muelle', cost: 8000, mult: { reparaciones: 1.25 },
					desc: '«TALLER KAHALE · SE ARREGLA TODO», en neón naranja. La K parpadea. Leilani dice que es a propósito. Más clientes.' },
				{ id: 'polipasto', name: 'Polipasto para monturas grandes', cost: 14000, mult: { monturas: 1.4 }, store: 1,
					desc: 'Una grúa pequeña colgada del techo para subir sillas de Mudsdale y arneses de Lapras sin dejarse la espalda. Más equipo de viaje y un día más de almacén.' },
				{ id: 'fragua', name: 'Ampliar la fragua de Turtonator', cost: 18000, mult: { piezas: 1.5 },
					desc: 'Una campana de chapa, un fuelle y una cama más grande para Turtonator, que trabaja dormido. Las piezas salen el doble de rápido. Bueno, la mitad más.' },
				{ id: 'soldi2', name: 'Actualizar a Soldi', cost: 12000, mult: { all: 1.1 }, upkeep: -150, script: 'b05_taller_up_soldi',
					desc: 'Un procesador nuevo, un altavoz que no esté pegado con cinta y un módulo de ahorro de energía. Gasta menos y ayuda más. Las opiniones no se pueden desinstalar.' },
				{ id: 'mesa', name: 'Despejar la mesa del fondo', cost: 36000, unlock: 'inventos', script: 'b05_taller_up_mesa',
					desc: 'Debajo de nueve años de cajas, planos y cocos hay una mesa. Herramientas de precisión, una lupa con luz y una tarde entera de Leilani para ella sola. Abre una línea nueva: inventos.' },
				{ id: 'deuda', name: 'Pagar la deuda del local', cost: 20000, share: 10,
					desc: 'El hangar es del puerto, y el puerto lleva meses mandando cartas. Con el alquiler al día, Leilani te apunta 10 puntos más en la libreta.' },
				{ id: 'socia', name: 'Comprar el hangar', cost: 30000, share: 10, need: ['deuda'],
					desc: 'Que el taller deje de ser de alquiler y sea de quien lo trabaja. Leilani te apunta 10 puntos más. «Y una placa con tu nombre. Pequeña. Torcida».' },
			],
			jobs: { slots: 2, types: ['Electric', 'Steel', 'Fire'], favs: { togedemaru: 0.06, turtonator: 0.06, magnemite: 0.05, grubbin: 0.05, klink: 0.04, mudbray: 0.04 },
				text: 'Dar corriente a las herramientas, calentar la fragua, sujetar piezas con imanes o con los dientes. Togedemaru ya trabaja aquí: se come los cables.' },
			managers: [
				{ npc: 'leilani', desc: 'Lo lleva ella, entre encargo y encargo y entre explosión y explosión. Cuando está contenta, la fragua rinde más.', mult: { piezas: 1.15 } },
				{ npc: 'recluta_skull', name: 'Los chicos de Francine', cond: 'flag.b05_skull_taller', wage: 300, mult: { reparaciones: 1.3, monturas: 1.2 },
					desc: 'Saben desmontar cualquier cosa con ruedas en cuatro minutos. Ahora también saben montarla. Leilani vuelve a sus inventos.' },
				{ npc: 'kiawe', cond: 'flag.b05_kiawe_hecha', wage: 400, mult: { piezas: 1.3, inventos: 1.2 },
					desc: 'Viene las tardes que no hay prueba. Le marca el ritmo a la fragua y Turtonator, por fin, sopla a compás. Mejores piezas.' },
			],
			eventRate: 0.7,
			events: [
				{ id: 'boom', name: 'Algo ha explotado', w: 3, npc: 'leilani',
					text: '¡Todo bien! ¡Todo bien-bien! Solo que el prototipo de silla con propulsión ha… propulsado. Atravesó la ventana del fondo. Está en el mar. Bueno, una parte. La otra la tiene Togedemaru y no la suelta.',
					options: [
						{ text: '«¿Estás entera?»', result: '«¡Entera! Con las cejas un poco más cortas. Me quedan bien, ¿sí o qué?». Se ríe tanto que se le olvida recoger. El hollín se queda un par de días.', effect: { boost: { mult: { piezas: 0.85 }, days: 2, label: 'Hollín' } } },
						{ text: 'Pagar un cristal nuevo', cost: 2500, result: 'Cristal nuevo, con una pegatina de un Togedemaru en el centro «para que no lo atraviese nadie más». El taller, ventilado y recogido, va como un tiro.', effect: { boost: { mult: { all: 1.15 }, days: 3, label: 'Taller recogido' } } },
						{ text: '«Que lo intente otra vez.»', result: 'Lo intenta otra vez. Esta vez la silla avanza tres metros, se para y no explota. Leilani llora un poco. Soldi dice que es por el humo.', effect: { boost: { mult: { inventos: 1.3, piezas: 0.9 }, days: 3, label: 'Racha de inventora' } } },
					] },
				{ id: 'cable', name: 'Togedemaru se ha comido un cable', w: 3, npc: 'leilani',
					text: 'Informe técnico: Togedemaru se ha comido el cable del compresor. Entero. Ahora está cargado como una batería y se pega a las llaves inglesas. Está feliz. El compresor, no.',
					options: [
						{ text: 'Esperar a que se descargue', result: 'Tarda dos días. Mientras, Togedemaru hace de imán de herramientas y el taller va a medio gas.', effect: { boost: { mult: { reparaciones: 0.85 }, days: 2, label: 'Sin compresor' } } },
						{ text: 'Comprar un cable blindado', cost: 1200, result: 'Cable nuevo, con funda de acero. Togedemaru lo muerde, lo piensa y se va a buscar otra cosa. Mientras tanto, se pasa el día dando corriente al soldador.', effect: { boost: { mult: { all: 1.1 }, days: 3, label: 'Togedemaru enchufado' }, happy: 5 } },
					] },
				{ id: 'lemnis', name: 'Otra carta de Lemnis', w: 2, npc: 'leilani',
					text: 'Ha llegado otra. «Programa Ultra · Lemnis». La cifra tiene un cero más que la anterior. Y ya no dice «proveedora». Dice «colaboradora». —Pausa—. Es peor. No sé por qué, pero es peor.',
					options: [
						{ text: '«Ni la abras.»', result: 'Leilani se la da a Togedemaru. Togedemaru la clava en sus púas y se va rodando muy digno. Nadie vuelve a ver la carta.' },
						{ text: 'Contestar tú: «No está en venta.»', result: 'Lo escribes en el reverso, con el rotulador de los carteles. Leilani lo lee tres veces y lo manda. Esa tarde trabaja cantando. Mal, pero cantando.', effect: { boost: { mult: { all: 1.1 }, days: 2, label: 'No está en venta' } } },
						{ text: 'Pagar un anuncio en la radio de Kantai', cost: 3000, result: '«Taller Kahale: arreglamos lo que otros quieren comprar». Lo escribió Leilani. Suena por todo el puerto. Si Lemnis escucha la radio, que la escuche.', effect: { boost: { mult: { reparaciones: 1.35 }, days: 4, label: 'Anuncio en la radio' } } },
					] },
				{ id: 'huelga', name: 'Comunicado de Soldi', w: 2, npc: 'soldabot',
					text: 'Comunicado oficial. El Asistente de Soldadura y Motivación inicia una huelga indefinida. Motivo: nadie le ha dicho «buen trabajo» en ciento doce días. Excelente gestión de personal.',
					options: [
						{ text: 'Decirle «buen trabajo»', result: 'Silencio. Luego: «Mensaje recibido. Sospechoso. Pero recibido». Vuelve al soplete. Suelda mejor que nunca y no lo reconoce.', effect: { boost: { mult: { all: 1.05 }, days: 2, label: 'Soldi motivado' } } },
						{ text: 'Comprarle aceite de primera', cost: 800, result: '«Aceite sintético. Excelente. Lo que gasta la creadora en sí misma: nada. En mí: esto». Las articulaciones ya no le chirrían. A Leilani se le saltan las lágrimas de la risa.', effect: { boost: { mult: { all: 1.15 }, days: 3, label: 'Soldi aceitado' } } },
					] },
				{ id: 'tarta', name: 'Aviso al personal', w: 1, npc: 'soldabot',
					text: 'Aviso al personal: al final de la jornada habrá tarta para quien termine sus tareas. Excelente incentivo. —Ruido de altavoz—. Nota interna: no consta en el inventario ninguna tarta.',
					options: [
						{ text: 'Preguntar por la tarta', result: '«¿Qué tarta?». Leilani, Togedemaru y tú se quedan mirando al brazo robótico. El brazo robótico sigue soldando.' },
						{ text: 'Comprar una tarta de verdad', cost: 900, result: 'Tarta de coco de la panadería del puerto. Soldi la observa toda la merienda. «Inesperado. Registrando». Esa semana el taller va de maravilla.', effect: { boost: { mult: { all: 1.1 }, days: 2, label: 'Hubo tarta' }, happy: 10 } },
					] },
				{ id: 'ferry', name: 'El ferry de Hauoli', w: 2, npc: 'leilani',
					text: 'Llamó la naviera. Al ferry de las nueve se le ha roto la hélice y tienen a cuarenta turistas en el muelle con collares de flores y cara de no entender nada. Pagan bien. Pero necesito comprar las piezas antes, y eso no lo pagan.',
					options: [
						{ text: '«Que esperen a mañana.»', result: 'Esperan. Los turistas se van a la playa y nadie se queja demasiado. La naviera paga lo de siempre, tarde.' },
						{ text: 'Adelantar las piezas', cost: 2000, result: 'Leilani baja al muelle con la caja de herramientas y un coco. Hélice nueva en hora y media. La naviera paga el arreglo, la urgencia y una propina.', effect: { money: 7500 } },
					] },
				{ id: 'ohana', name: 'Encargo del Rancho Ohana', w: 2, npc: 'leilani',
					text: 'Los rancheros de Ohana han bajado doce sillas de Mudsdale. Doce. Las quieren para el sábado. Dicen que pagan en dinero o en leche, «lo que la chica prefiera». La chica prefiere las dos cosas, pero me hacen elegir.',
					options: [
						{ text: 'Cobrar en leche', result: 'Llega una caja de botellas frías y un Mudsdale que se niega a irse. Lo de la leche era verdad; lo del Mudsdale, nadie lo explica.', effect: { items: [{ id: 'moomoomilk', n: 4 }] } },
						{ text: 'Cobrar en dinero', result: 'Doce sillas, doce pagos. El ranchero cuenta los billetes dos veces y deja uno de propina «para el robot». Soldi lo acepta con frialdad.', effect: { money: 3500 } },
					] },
				{ id: 'grafiti', name: 'Una calavera en la persiana', w: 2, npc: 'recluta_skull', cond: 'flag.b05_skull_taller',
					text: 'Oye, que no fue de mala fe. Pintamos la calavera en la persiana porque así nadie se mete. En el puerto todos saben qué significa. Aunque ya no significa lo mismo. Ahora significa «aquí se arreglan cosas».',
					options: [
						{ text: '«Déjenla.»', result: 'La calavera se queda. Le ponen debajo una llave inglesa cruzada. Nadie vuelve a robar ni una tuerca del muelle.', effect: { boost: { mult: { reparaciones: 1.15 }, days: 3, label: 'Muelle tranquilo' } } },
						{ text: 'Comprar pintura para tapar la calavera', cost: 600, result: 'La tapan. Encima pintan un Togedemaru enorme con gafas de soldar. Es mucho mejor. Leilani le hace una foto y la pone junto a la otra.', effect: { happy: 8 } },
					] },
				{ id: 'compas', name: 'La fragua a compás', w: 2, npc: 'kiawe', cond: 'flag.b05_kiawe_hecha',
					text: 'La fragua sopla mal. Turtonator respira a destiempo. —Golpe de talón en el suelo—. Si me dejas la tarde, le enseño el compás. Si no, también está bien. El fuego espera. A veces.',
					options: [
						{ text: '«Toda tuya.»', result: 'Kiawe baila delante de la fragua toda la tarde. Turtonator, medio dormido, sopla en cada golpe de talón. Las piezas salen limpias, sin una burbuja.', effect: { boost: { mult: { piezas: 1.3 }, days: 2, label: 'Fragua a compás' } } },
						{ text: '«Hoy no, Kiawe.»', result: 'Asiente. Se va bailando igual, sin prisa, hasta el muelle.' },
					] },
			],
		},
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// Oferta: Leilani tiene más encargos que manos y Lemnis vuelve a escribir.
		b05_taller_oferta: [
			{ set: { 'flag.b05_taller_oferta': true } },
			{ text: 'Leilani está sentada en una caja de herramientas, rodeada de papeles. Encargos, facturas, avisos del puerto. En la mano lleva unos alicates, y con los alicates sujeta un sobre blanco con media lemniscata en el remite.' },
			{ say: 'leilani', text: '¡{jugador}! Justo a quien… no. A quien no quería ver así. Pero sí quería verte. ¿Me explico? No me explico.' },
			{ say: 'leilani', text: 'Desde lo del Lapras, el teléfono no para. Los rancheros de Ohana, la naviera, un señor de Konikoni con un Tauros que quiere turbo. ¡Turbo! Tengo más encargos que manos. Y las manos que tengo están ocupadas sujetando esto.' },
			{ say: 'soldabot', text: 'Sobre analizado. Programa Ultra. Cifra con muchos ceros. Suficiente para comprar un taller. Este, por ejemplo.' },
			{ say: 'leilani', text: 'Ese es el problema. No quieren el Ride Gear. Quieren el taller entero. Y a mí dentro, con bata blanca y una plaquita con mi nombre. Bien escrito, eso sí. Nunca nadie lo había escrito bien.' },
			{ choice: [
				{ text: '«¿Y si el dinero lo pongo yo?»', then: [
					{ af: { leilani: 2 } },
					{ say: 'leilani', text: '¿Tú? —Se le caen los alicates. El sobre, también. Togedemaru se lo lleva rodando—. Espera. Espera-espera. No me digas eso así, que me lo creo.' },
				] },
				{ text: '«Ni se te ocurra venderles nada.»', then: [
					{ af: { leilani: 1 } },
					{ say: 'leilani', text: 'No se me ocurre. Se me ocurre todo el rato, que es distinto. Sobre todo cuando llega la factura de la luz.' },
				] },
				{ text: '«Es mucho dinero. Igual te conviene.»', then: [
					{ af: { leilani: -3 } },
					{ say: 'leilani', text: 'Ya. —Se rasca la nuca con los alicates—. Ya, ya sé. Es mucho. Todo el mundo me dice eso. Que es mucho para alguien como yo.' },
					{ say: 'soldabot', text: 'Comentario registrado. Junto al otro.' },
				] },
			] },
			{ say: 'leilani', text: 'Mira. Mi mamá decía que un taller no es un sitio: es la gente que se mancha en él. Si quieres mancharte, aquí está la libreta. Las cuentas son… creativas. Pero todo está apuntado. Casi todo.' },
			{ venture: V },
		],

		// Al entrar como socio (buy.script)
		b05_taller_entrada: [
			{ text: 'Leilani cuenta los billetes una vez. Dos. A la tercera se le olvida por qué número iba y los deja en la mesa, encima de un coco.' },
			{ say: 'leilani', text: 'Bueno. Bueno. Esto es real. Soldi, ¿esto es real?' },
			{ say: 'soldabot', text: 'Afirmativo. Nuevo socio registrado. Excelente. Ahora son dos los que no limpian.' },
			{ text: 'Leilani toma el rotulador de los carteles, sale a la puerta y, debajo de «TALLER KAHALE», escribe algo muy pequeño. Vuelve sin decir qué.' },
			{ say: 'leilani', text: 'El trato es este: tú pones, yo arreglo, y lo que sobre se reparte. Lo que sale de la fragua es tuyo antes que de nadie. Y si algo explota, la culpa es del diseño. El diseño es mío. Pero la culpa es del diseño.' },
			{ choice: [
				{ text: '«Socios. No proveedora.»', then: [
					{ af: { leilani: 2 } },
					{ say: 'leilani', text: '… —Te mira un segundo de más. Luego se pone las gafas de soldar, aunque no va a soldar nada—. Me lo voy a apuntar. En la pared. Grande.' },
				] },
				{ text: '«¿Y el botón con cinta aislante?»', then: [
					{ af: { leilani: 1 } },
					{ say: 'leilani', text: '¡Es un rasgo de diseño! —Se ríe por la nariz—. Bueno, no. Pero ahora que hay presupuesto, igual le pongo cinta de la buena.' },
				] },
			] },
			{ say: 'soldabot', text: 'Previsión: la creadora dormirá esta noche. Primera vez en este trimestre. Excelente. Para ser humana.' },
			{ say: 'rotom', text: '¡Bzzt! Te guardo el taller en **Negocios**. Ahí puedes repartir el trabajo, comprar mejoras y pasar a recoger. ¡Lo de la fragua sale despacito, pero sale!' },
			{ intel: { npc: 'leilani', text: 'Eres soci{o|a|e} del Taller Kahale: pusiste el dinero que Lemnis quería poner. Leilani lleva el taller; Soldi lleva la cuenta de quién no limpia.' } },
		],

		// Mejoras con escena
		b05_taller_up_soldi: [
			{ text: 'Leilani desatornilla la «cabeza» de Soldi con mucho cuidado y una linterna en la boca. Durante media hora, el taller está en silencio. Es raro. Togedemaru va y viene, preocupado.' },
			{ say: 'soldabot', text: 'Reinicio completado. Procesador nuevo. Altavoz nuevo. Hola. —Pausa—. Detecto la misma creadora. Detecto el mismo desorden. Excelente. Ninguna actualización ha podido con esto.' },
			{ say: 'leilani', text: '¡Le funciona todo! ¡Hasta la mala leche! —Lo abraza. Es un brazo robótico. Se deja—. No le digas a nadie que lo he abrazado.' },
		],
		b05_taller_up_mesa: [
			{ text: 'Se tarda una tarde entera. Salen cajas, planos enrollados, tres cocos fosilizados, un Rotom de juguete y, por fin, una mesa de madera con las esquinas quemadas.' },
			{ say: 'leilani', text: 'Mira, mira: aquí hacía los deberes. Esta quemadura es de cuando tenía doce años y quise hacer un tostador con un Magnemite. El Magnemite está bien. El tostador, no.' },
			{ text: 'Debajo del último plano hay algo envuelto en un trapo. Leilani lo toca, lo deja donde está y pone una caja encima. No dice nada. Tú tampoco.' },
			{ say: 'leilani', text: '¡Bueno! ¡A inventar! Soldi, apunta: la mesa del fondo vuelve a estar abierta.' },
			{ say: 'soldabot', text: 'Apuntado. Probabilidad de que algo funcione: baja. Probabilidad de que algo explote: excelente.' },
		],

		// Llegada de Kiawe (encargado, con b05_kiawe_hecha)
		b05_taller_kiawe: [
			{ set: { 'flag.b05_taller_kiawe': true } },
			{ text: 'Kiawe está de pie delante de la fragua, con los brazos cruzados y su Marowak al lado. Da un golpe de talón. Turtonator, dormido, suelta una bocanada de fuego. Otro golpe. Otra bocanada.' },
			{ say: 'kiawe', text: 'Leilani me arregló la silla de mi Charizard. Explotó dos veces. Le debo tres explosiones. —Golpe de talón—. Y tu fragua sopla a destiempo.' },
			{ say: 'leilani', text: '¡Mi fragua sopla como le da la gana, que para eso es un Turtonator! —Pausa—. Bueno. Sí. Sopla a destiempo.' },
			{ say: 'kiawe', text: 'Las tardes que no haya prueba, vengo. El fuego no se manda. Se acompaña. Yo lo acompaño; tú haces las piezas.' },
			{ say: 'soldabot', text: 'Bailarín detectado en zona de soldadura. Excelente. Lo que faltaba.' },
			{ say: 'kiawe', text: '—Mira el brazo robótico. El brazo robótico lo mira a él—. Me cae bien.' },
			{ toast: 'Kiawe puede llevar el Taller Kahale (Negocios › Encargado).' },
		],

		// Llegada de los Skull (encargados, con b05_skull_taller)
		b05_taller_skull: [
			{ set: { 'flag.b05_taller_skull': true } },
			{ text: 'En la puerta del taller hay dos chicos con capucha y bandana. Uno sujeta un sobre arrugado. El otro sujeta al primero, para que no se vaya.' },
			{ say: 'recluta_skull', text: 'Oye… ¿aquí es lo de la chamba? La jefa dijo que viniéramos. Que aquí no se roba y que se paga en tiempo. Así dijo. «En tiempo».' },
			{ say: 'leilani', text: '¿Saben desmontar un motor fuera borda?' },
			{ say: 'recluta_skull', text: 'En cuatro minutos. —El otro le da un codazo—. Bueno. Montarlo no tanto.' },
			{ say: 'leilani', text: 'Montarlo se aprende. Desmontarlo en cuatro minutos es un don. ¡Pasen! Cuidado con el Turtonator, que muerde. Y con el brazo, que opina.' },
			{ say: 'soldabot', text: 'Dos nuevos empleados. Excelente. Ya somos tres los que no limpian. Cuatro, contando al socio.' },
			{ toast: 'Los chicos de Francine pueden llevar el Taller Kahale (Negocios › Encargado).' },
		],
	},
};
