// Bloque 5 · Lugar recurrente (2026-10-23): «La ficha número uno» (~1 h la primera visita; crece en cada bloque).
// Idea de ChatGPT: el museo de tu propia partida. Philippe Dumont (B1 Café Soleil, B2 el ático «con vistas a la Puerta»,
// B5 Konikoni) no consigue alquilar el ático que zumba. Empiezan a llegarle paquetes «para la ficha número uno»:
// recortes de Alexia, una caja de Adela, una gorra doblada, un pañuelo de cuadros… y monta con ellos un museo.
// Es narrativo, no un checklist: cada pieza tiene remitente, cartela (hoja de papel) y comentario de Philippe, y cambia
// según la rama que vivió el jugador. Las piezas solo existen si existe su flag: nada de lo que no ha pasado.
// Entrada: Ciudad Luminalia (desde el fin del B1). Salas por región: Kalos (B1), Johto (B2–B3), Kanto (B4), Alola (B5).
// REGLA (CLAUDE.md §2.4): cada bloque añade 2–4 piezas en la sala de su región (o una sala nueva), como en este archivo.

const PH_ALOLA = 'flag.b05_philippe';
const Q = 'quest.b05_s_museo';
const SALA_J = 'flag.b02_puerta_cruzada';
const SALA_K = 'flag.b04_inicio_hecho';
const SALA_A = 'visited("hauoli")';
const TODAS = 'flag.museo_sala_kalos_vista && (!' + SALA_J + ' || flag.museo_sala_johto_vista) && (!' + SALA_K + ' || flag.museo_sala_kanto_vista)';
const pieza = (id, label, sub, icon, cond) => ({ label, sub, icon, cond, new: '!flag.museo_v_' + id, talk: [{ script: 'museo_' + id }] });

export default {
	// =====================================================================
	// LUGARES: el ático de Philippe y sus salas
	// =====================================================================
	locations: {
		museo_ficha: {
			name: 'Ático del Bulevar Norte', short: 'El ático de Philippe', parent: 'luminalia', kind: 'building',
			bg: { type: 'indoor', wall: '#e9dcc0', floor: '#8a6448' },
			desc: 'Un ático con el techo inclinado, vigas de madera y un ventanal enorme que da a la **Puerta Lemnis**. El ventanal vibra un poco: la Puerta zumba. En el anuncio de la agencia ponía «ambiente sonoro».\n\nNo hay muebles. Hay cajas de cartón con tu nombre, una vitrina antigua en el centro y, junto a la escalera, un caballete con un cartel escrito a mano: «Museo de la Ficha Número Uno · Próxima inauguración».',
			descs: [{ cond: 'done.b05_s_museo', text: 'El ático del Bulevar Norte, con su ventanal a la Puerta y su zumbido de siempre. Ya no hay cajas: hay vitrinas, cartelas escritas a mano, un libro de visitas en un atril y Philippe, que limpia el cristal de todo aunque esté limpio.\n\nEn el caballete de la escalera, el cartel ha cambiado: «Museo de la Ficha Número Uno · Abierto. Entrada: haber estado ahí».' }],
			descNight: 'De noche, la Puerta tiñe el ático de azul y plata. Las vitrinas lo reflejan. Philippe dice que es «iluminación de autor». La factura de la luz dice que no ha encendido ni una bombilla.',
			mapNote: 'Museo de la Ficha Número Uno · Philippe',
			spots: [
				{ label: 'Philippe, con un manojo de llaves', sub: 'Ninguna abre la vitrina del centro', icon: '🎩', cond: Q + ' == "atico"', new: 'true', talk: [{ script: 'museo_vitrina' }] },
				{ label: 'Philippe', sub: 'Repasa las cartelas en voz baja', icon: '🎩', cond: Q + ' == "salas"', new: TODAS, talk: [
					{ cond: TODAS, script: 'museo_inaugura' },
					{ script: 'museo_espera' },
				] },
				{ label: 'Philippe, el conservador', sub: 'Limpia un cristal que ya está limpio', icon: '🎩', cond: 'done.b05_s_museo', talk: [{ script: 'museo_philippe' }] },
				pieza('baraja', 'La vitrina del centro', 'Una baraja de cartas, sola, sobre terciopelo', '🃏', '!!' + Q + ' && !(' + Q + ' == "atico")'),
				{ label: 'El libro de visitas', sub: 'En un atril, junto al ventanal', icon: '📖', cond: 'done.b05_s_museo', talk: [{ script: 'museo_libro' }] },
				{ label: 'Sala de Kalos', sub: 'La primera puerta del pasillo', icon: '🗼', cond: '!!' + Q + ' && !(' + Q + ' == "atico")', new: '!flag.museo_sala_kalos_vista', action: { go: 'museo_sala_kalos' } },
				{ label: 'Sala de Johto', sub: 'Huele a pino y a lana', icon: '🍂', cond: '!!' + Q + ' && !(' + Q + ' == "atico") && ' + SALA_J, new: '!flag.museo_sala_johto_vista', action: { go: 'museo_sala_johto' } },
				{ label: 'Sala de Kanto', sub: 'Con una ventana que da a la nada', icon: '🚄', cond: '!!' + Q + ' && !(' + Q + ' == "atico") && ' + SALA_K, new: '!flag.museo_sala_kanto_vista', action: { go: 'museo_sala_kanto' } },
				{ label: 'Sala de Alola', sub: 'Todavía huele a pintura fresca', icon: '🌺', cond: '!!' + Q + ' && !(' + Q + ' == "atico") && ' + SALA_A, new: '!flag.museo_sala_alola_vista', action: { go: 'museo_sala_alola' } },
			],
			rumors: [
				{ text: 'En el Bulevar Norte dicen que el ático de la Puerta por fin tiene inquilino: un señor con chistera que no vive allí, solo va a quitar el polvo. Los vecinos no saben si es un museo o una mudanza muy lenta.' },
			],
		},
		museo_sala_kalos: {
			name: 'Sala de Kalos', parent: 'museo_ficha', kind: 'building',
			bg: { type: 'indoor', wall: '#c9d4e8', floor: '#8a6448' },
			desc: 'La sala más grande del ático, con la ventana que da a la Torre Prisma. En la pared, un mapa de Kalos con chinchetas de colores y un hilo rojo que va de Luminalia a Yantra dando muchas vueltas.\n\nPhilippe ha escrito en una tira de papel, encima de la puerta: «Aquí empezó todo. Más o menos».',
			mapNote: 'Piezas de Kalos',
			onEnter: [{ script: 'museo_sala_kalos', cond: '!flag.museo_sala_kalos_vista', once: true }],
			spots: [
				pieza('titular', 'Un recorte de periódico enmarcado', 'Del *Diario de Luminalia*', '📰', 'flag.b01_prensa_verdad || flag.b01_prensa_neutral || flag.b01_prensa_lemnis'),
				pieza('cueva', 'Un cristal de la Cueva Brillante', 'Con una postal apoyada', '💎', 'flag.b01_bastien_cubierto || flag.b01_bastien_rompe || flag.b01_bastien_silencio'),
				pieza('cromlech', 'Una vitrina con la etiqueta «Crómlech»', 'Algo pequeño, en medio de mucho terciopelo', '🗿', 'flag.b01_delatar || flag.b01_handsome || flag.b01_trato_sera'),
				pieza('torre', 'Una canica de escayola, un poco torcida', 'Sobre un cojín azul', '🔵', 'flag.b01_torre_hecha'),
			],
		},
		museo_sala_johto: {
			name: 'Sala de Johto', parent: 'museo_ficha', kind: 'building',
			bg: { type: 'indoor', wall: '#e0c49a', floor: '#6a4a30' },
			desc: 'Una sala estrecha y cálida, con una alfombra de rayas que Philippe dice que es «de Johto». Es de unos grandes almacenes de Luminalia. Las vitrinas son cajas de fruta pintadas de blanco.\n\nEn la pared, un calendario de Ciudad Trigal y un mapa con más chinchetas que el de Kalos.',
			mapNote: 'Piezas de Johto',
			onEnter: [{ script: 'museo_sala_johto', cond: '!flag.museo_sala_johto_vista', once: true }],
			spots: [
				pieza('fragmento', 'Una caja de fruta con algo dentro', 'La etiqueta dice «Iris»', '🧩', 'flag.b02_frag_handsome || flag.b02_frag_sera || flag.b02_frag_melia'),
				pieza('lucien', 'Algo de un niño, colgado con pinzas', 'A la altura de los ojos de un niño', '🧢', 'flag.b02_lucien_madre || flag.b02_lucien_cipres || flag.b02_lucien_publico'),
				pieza('rancho', 'Una mecedora de juguete', 'Se mueve sola cuando pasas', '🪑', 'flag.b03_rancho_sobrina || flag.b03_rancho_jugador || flag.b03_rancho_lemnis'),
				pieza('familia', 'Una bolsa de papel cerrada con grapas', 'Pone «Caoba»', '🧥', 'flag.b03_rocket_policia || flag.b03_rocket_libres || flag.b03_rocket_quemar'),
				pieza('lago', 'Algo rojo, junto a una foto', 'La etiqueta dice «Lago de la Furia»', '🔴', 'flag.b03_gyarados_atrapado || flag.b03_gyarados_calmado || flag.b03_gyarados_huido'),
			],
		},
		museo_sala_kanto: {
			name: 'Sala de Kanto', parent: 'museo_ficha', kind: 'building',
			bg: { type: 'indoor', wall: '#c8ccd4', floor: '#5a5a66' },
			desc: 'Una sala pequeña, gris y ordenada, con una ventana tapiada que Philippe ha pintado por dentro: un tren magnético que no se acaba nunca. Lo pintó él. Se nota.\n\nLas vitrinas son archivadores metálicos con el cajón de arriba abierto.',
			mapNote: 'Piezas de Kanto',
			onEnter: [{ script: 'museo_sala_kanto', cond: '!flag.museo_sala_kanto_vista', once: true }],
			spots: [
				pieza('inspector', 'Un cajón de archivador abierto', 'Dentro, algo de la Agencia', '🗄️', 'flag.b04_lebrun_detenido || flag.b04_lebrun_cebo || flag.b04_lebrun_libre'),
				pieza('octava', 'Una foto con marco de conchas', 'Una piscina y un pulgar', '🏅', 'flag.b04_clasificado'),
			],
		},
		museo_sala_alola: {
			name: 'Sala de Alola', parent: 'museo_ficha', kind: 'building',
			bg: { type: 'indoor', wall: '#f2d8a8', floor: '#c4a06a' },
			desc: 'La sala más nueva. Huele a pintura fresca y a coco: Philippe trajo de Konikoni un ambientador «para la atmósfera». Las paredes son amarillo atardecer y en una esquina hay una palmera de plástico con una guirnalda de flores.\n\nTodavía hay huecos vacíos en las vitrinas, con cartelas en blanco esperando.',
			mapNote: 'Piezas de Alola',
			onEnter: [{ script: 'museo_sala_alola', cond: '!flag.museo_sala_alola_vista', once: true }],
			spots: [
				pieza('luz', 'Una vitrina con la luz apagada', 'Lo de dentro brilla solo', '✨', 'flag.b05_luz_necrozma || flag.b05_luz_aether || flag.b05_luz_leilani'),
				pieza('contrato', 'Un sobre con matasellos de Æther', 'Grueso, de papel bueno', '📄', 'flag.b05_bastien_rompe || flag.b05_bastien_sigue'),
				pieza('terron', 'Una herradura muy pequeña', 'Con barro rojo seco', '🐴', 'flag.b05_terron_estribo'),
				{ label: 'Las vitrinas vacías', sub: 'Cartelas en blanco', icon: '🪟', cond: '!(flag.b05_luz_necrozma || flag.b05_luz_aether || flag.b05_luz_leilani)', talk: [{ script: 'museo_alola_vacia' }] },
			],
		},
	},

	// Entrada en Ciudad Luminalia (B1)
	patches: {
		luminalia: { spots: [
			{ label: 'Philippe, con una llave enorme', sub: 'Te hace señas desde un portal del Bulevar Norte', icon: '🗝️', cond: 'flag.b01_fin && !' + Q, new: 'true', talk: [{ script: 'museo_invita' }] },
			{ label: 'El ático del Bulevar Norte', sub: 'El de las vistas a la Puerta', icon: '🏛️', cond: '!!' + Q, new: Q + ' == "atico"', action: { go: 'museo_ficha' } },
		] },
	},

	// =====================================================================
	// MISIÓN
	// =====================================================================
	quests: {
		b05_s_museo: { name: 'La ficha número uno', type: 'side', est: 60, stages: {
			atico: 'Philippe te espera en su ático del **Bulevar Norte**, en **Ciudad Luminalia**. Dice que es «tuyo, en cierto modo».',
			salas: 'Recorre las salas del **ático de Philippe** (Luminalia) y vuelve con él al vestíbulo para la inauguración.',
			hecha: 'El museo del ático de Philippe, en **Luminalia**, ya está abierto. Cuando pase algo que se recuerde, puede que llegue una pieza nueva.',
		},
		parts: { title: 'Las salas', items: [
			{ label: 'Sala de Kalos', where: 'museo_ficha', done: 'flag.museo_sala_kalos_vista', hint: 'La primera puerta del pasillo del ático.' },
			{ label: 'Sala de Johto', where: 'museo_ficha', done: '!' + SALA_J + ' || flag.museo_sala_johto_vista', hint: 'Huele a pino y a lana.' },
			{ label: 'Sala de Kanto', where: 'museo_ficha', done: '!' + SALA_K + ' || flag.museo_sala_kanto_vista', hint: 'La de la ventana pintada.' },
		] } },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		entradamuseo: { name: 'Entrada número uno', pocket: 'key', desc: 'Una entrada de cartulina color crema, cortada a tijera, con un sello de tinta en forma de chistera. Número 0001. La hizo Philippe a mano para su museo.',
			read: '*(Cartulina color crema. Letra redonda, con florituras que se tuercen al final.)*\n\n**MUSEO DE LA FICHA NÚMERO UNO**\nÁtico del Bulevar Norte · Luminalia\n\nEntrada n.º 0001\nVálida para: toda la vida.\nPrecio: haber estado ahí.\n\nNormas de la casa:\n1. No se tocan las piezas. Salvo la mecedora, que se toca sola.\n2. No se fotografía con flash. Las piezas tienen sentimientos.\n3. Si una pieza no te gusta, no es culpa del museo: es culpa de lo que pasó.\n\n*Phil-osofía del conservador:* un museo no guarda cosas. Guarda los momentos en que alguien decidió algo. Las cosas son solo la excusa.\n\n—P. D., conservador, guía y único empleado' },
		llaveatico: { name: 'Llave del ático', pocket: 'key', desc: 'Una llave de hierro enorme, más grande que la palma de la mano, con un llavero de plástico en forma de casita. Abre el ático del Bulevar Norte de Luminalia. Philippe dice que «una llave es el primer paso de una casa». Antes decía lo mismo de los folletos.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// ---------- La invitación ----------
		museo_invita: [
			{ say: 'philippe', text: '¡Ficha número uno! ¡Por fin! ¡Te he buscado por tres barrios! Bueno, por dos. El tercero era el mismo, pero de noche.', cond: '!' + PH_ALOLA },
			{ say: 'philippe', text: '¡Ficha número uno! ¡Aquí, en casa! Acabo de volver de Alola: allí no vendí ni una villa, pero me traje un ambientador de coco. —Te enseña una llave enorme—. Ven, ven. Esto es mejor que una villa.', cond: PH_ALOLA },
			{ say: 'philippe', text: '¿Te acuerdas del ático? ¿El de las vistas a la Puerta? Nadie lo alquila. Zumba. Lo he puesto como «ambiente sonoro», como «tranquilidad vibrante», como «ideal para gente con acúfenos». Nada.' },
			{ say: 'philippe', text: 'Pero hace unas semanas empezaron a llegarme paquetes. A la agencia. Con una etiqueta: «Para la ficha número uno. Philippe sabrá». —Se le escapa la risa—. ¡Philippe sabrá! ¿Te das cuenta? ¡Alguien cree que Philippe sabe algo!' },
			{ say: 'philippe', text: 'Recortes de periódico, una caja de Johto que huele a lana, una gorra doblada, un pañuelo de cuadros… Cosas tuyas. Bueno, cosas de lo que hiciste. Gente que te conoce y que pensó que alguien tenía que guardarlas.' },
			{ prompt: 'Philippe hace girar la llave entre los dedos. Se le cae. La recoge.', choice: [
				{ text: '«¿Y qué has hecho con todo eso?»', then: [
					{ say: 'philippe', text: 'Lo que haría cualquier agente inmobiliario con un ático vacío y un montón de recuerdos ajenos: un museo. Phil-osofía: si una casa no se vende, se le cambia el uso.' },
				] },
				{ text: '«¿Quién te los manda?»', then: [
					{ say: 'philippe', text: 'Las cartas vienen firmadas. Más o menos. Una con una «A», otra con una «M», otra con una huella de casco. —Baja la voz—. Hay una que no firma nadie. Esa es la que más me gusta.' },
				] },
				{ text: '«No pienso pagarte nada.»', then: [
					{ say: 'philippe', text: '¡Es gratis! ¡Para ti, todo gratis! —Pausa—. Para los demás, la voluntad. Pero la voluntad de verdad, no esa voluntad de cinco céntimos.' },
				] },
			] },
			{ say: 'philippe', text: 'Ven a verlo antes de la inauguración. Bulevar Norte, el portal de la Puerta. El ático. Y trae paciencia: la vitrina del centro tiene cerradura de mago, y el mago soy yo.' },
			{ quest: 'b05_s_museo', stage: 'atico' },
		],

		// ---------- La vitrina del centro (cerradura) ----------
		museo_vitrina: [
			{ if: '!flag.museo_vitrina_vista', then: [
				{ set: { 'flag.museo_vitrina_vista': true } },
				{ text: 'Philippe abre los brazos en medio del ático, entre las cajas, como un presentador de televisión sin televisión.' },
				{ say: 'philippe', text: '¡Bienvenid{o|a|e} al Museo de la Ficha Número Uno! Todavía no está terminado. Le faltan una inauguración, unas cuantas cartelas y abrir esa vitrina.' },
				{ text: 'La vitrina del centro es antigua, de madera oscura y cristal biselado. Dentro, sobre terciopelo granate, hay algo pequeño. La cerradura tiene seis botones con símbolos de baraja.' },
				{ say: 'philippe', text: 'La compré en un rastro. El vendedor me dijo que tenía «cerradura de prestidigitador». Le pregunté la combinación y se rio. Llevo un mes riéndome yo también. Por dentro.' },
				{ if: '(inParty("riolu") || inParty("lucario"))', then: [{ text: '{riolu} pone la palma en el cristal. Dentro, los símbolos de la cerradura se encienden un instante, uno detrás de otro, en un orden. Como si recordaran.' }] },
			] },
			{ minigame: {
				type: 'lock', id: 'museo_vitrina', title: 'La vitrina del prestidigitador', level: 3, theme: 'cofre',
				hint: 'Picas, corazones, tréboles, diamantes… Los botones se encienden en orden. Repítelo sin que Philippe te distraiga.',
				guaranteed: ['entradamuseo'], loot: [{ id: 'starpiece', w: 3 }, { id: 'pearl', w: 4 }, { id: 'nugget', w: 1, rare: true }], picks: 1, lootTitle: 'Dentro de la vitrina',
			}, onWin: [
				{ text: 'La cerradura hace clic. El cristal se abre solo, despacio, con un suspiro de bisagras viejas. Dentro, sobre el terciopelo, hay una baraja de cartas. Y, debajo, una entrada de cartulina con el número 0001.' },
				{ say: 'philippe', text: '¡Lo has abierto! ¡Sin trucos! —Pausa—. ¿Ha sido sin trucos? Da igual. Los trucos también valen. Es lo único que he aprendido en treinta años de magia.' },
				{ read: 'entradamuseo' },
				{ say: 'philippe', text: 'La baraja se queda en la vitrina. Es la pieza cero. Las demás piezas están en las salas: una por región, de momento. Ve a verlas. Lee las cartelas. Las he escrito yo. Con faltas, pero con cariño.' },
				{ quest: 'b05_s_museo', stage: 'salas' },
			], onLose: [
				{ say: 'philippe', text: 'Se ha trabado. Me pasa siempre. Prueba otra vez: la cerradura se ablanda con la insistencia, como los compradores.' },
			], onQuit: [
				{ say: 'philippe', text: 'Descansa. La vitrina no se va a ningún sitio. Es lo bueno de los muebles: son muy de quedarse.' },
			] },
		],

		// ---------- Entradas a las salas (una vez) ----------
		museo_sala_kalos: [
			{ set: { 'flag.museo_sala_kalos_vista': true } },
			{ say: 'philippe', text: 'Kalos. La sala de cuando eras novat{o|a|e}. Bueno, sigues siéndolo, pero ahora con muchas más cajas. —Señala el hilo rojo del mapa—. Ese hilo es tu camino. Lo puse de memoria. La memoria se equivoca en las curvas.' },
		],
		museo_sala_johto: [
			{ set: { 'flag.museo_sala_johto_vista': true } },
			{ say: 'philippe', text: 'Johto. Esta sala me costó más. Las cajas venían de lejos, y algunas… —Se arregla la chistera—. Algunas pesaban más de lo que pesaban. Ya me entiendes. O no. Mejor mira.' },
		],
		museo_sala_kanto: [
			{ set: { 'flag.museo_sala_kanto_vista': true } },
			{ say: 'philippe', text: 'Kanto. Aquí todo me llegó en sobres grises, con letra de oficina. Kanto es así: hasta los recuerdos vienen con número de expediente.' },
		],
		museo_sala_alola: [
			{ set: { 'flag.museo_sala_alola_vista': true } },
			{ say: 'philippe', text: '¡Alola! La sala nueva. Todavía la estoy montando: las piezas llegan cuando pasan cosas, y allí todavía están pasando. —Rocía ambientador de coco—. Atmósfera.' },
		],

		museo_espera: [
			{ say: 'philippe', text: 'Primero las salas. Una inauguración sin haber visto el museo es como una mudanza sin cajas: queda muy limpia, pero no tiene sentido.' },
			{ text: 'En la ficha de la misión está qué salas te faltan.' },
		],

		// ---------- La inauguración ----------
		museo_inaugura: [
			{ say: 'philippe', text: '¿Lo has visto todo? ¿De verdad? —Se pone la chistera recta. Se le vuelve a torcer—. Entonces ya está. Ya se puede inaugurar. He invitado a gente. Bueno, a la gente que mandó cosas. Han venido dos. Y medio.' },
			{ cutscene: { time: 'tarde', bg: { type: 'indoor', wall: '#e9dcc0', floor: '#8a6448' }, start: 'fade', cam: 'still', frames: [
				{ actors: [{ id: 'philippe', at: 'left', enter: 'left' }], text: 'El ventanal del ático se pone naranja. Al fondo, la Puerta zumba. Philippe ha atado una cinta roja de lado a lado de la escalera, con un lazo en medio.' },
				{ actors: [{ id: 'alexia', at: 'right', enter: 'right' }], cam: 'pan-right', text: 'Alexia sube la escalera con la cámara al hombro. Dice que viene «por trabajo». Hace una foto de la cinta. Luego otra de ti, sin avisar.' },
				{ actors: [{ id: 'matiere', key: 'mati', at: 0.72, enter: 'fade', dim: true }], text: 'Detrás de ella, Matière, de la Agencia, con un táper de macarons. Deja el táper en la vitrina de Crómlech como quien deja un pisapapeles.' },
				{ cond: 'flag.b02_lucien_madre || flag.b02_lucien_cipres || flag.b02_lucien_publico', actors: [{ id: 'lucien', at: 0.5, enter: 'down', emote: '!' }], text: 'Y el medio: Lucien, con la gorra puesta del revés, que no estaba invitado y que ha llegado el primero. Lleva una libreta. Va a apuntarlo todo. Con horas.' },
				{ actors: [{ key: 'philippe', do: 'bow' }], on: false, fx: ['sparkle', 'flash'], color: '#ffd8a8', cam: 'push', text: 'Philippe saca unas tijeras del bolsillo de la chistera. Las tijeras se enganchan con un pañuelo, el pañuelo con otro, y otro… Cuando por fin corta la cinta, ha sacado once pañuelos.' },
				{ actors: [{ key: 'philippe', emote: 'heart' }], cam: 'pull', fx: 'glow', on: 'philippe', text: '«Queda inaugurado el Museo de la Ficha Número Uno». Nadie aplaude un segundo. Luego aplauden todos a la vez, y la Puerta, al fondo, zumba más fuerte. Como si también.' },
			] } },
			{ say: 'alexia', text: 'Mira que he cubierto inauguraciones. Torres, puentes, una Puerta que explotó. Esta es la primera en la que la noticia eres tú y no lo sabes. —Guarda la cámara—. No la voy a publicar. Algunas cosas no se publican: se guardan.' },
			{ say: 'matiere', text: 'Handsome quería venir. Le dije que con ese bigote falso iba a parecer una pieza más. Se ofendió. Te manda saludos. Y este papel, que no sé qué es. —Te lo da—. Pone «para el libro de visitas». Lo he leído, claro. Soy detective.' },
			{ if: 'flag.b02_lucien_madre || flag.b02_lucien_cipres || flag.b02_lucien_publico', then: [
				{ say: 'lucien', text: '¡He visto mi dorsal! ¡O mi dibujo! ¡O la foto! ¡Estoy en un MUSEO! —Se para—. ¿Estar en un museo es estar muerto? Mi madre dice que en los museos solo hay cosas muertas.' },
				{ say: 'philippe', text: 'En este no. En este solo hay cosas que pasaron. Que es distinto: lo muerto ya no cambia y lo que pasó cambia cada vez que lo miras. —Pausa—. Eso me ha quedado muy bien. Apúntalo.' },
			] },
			{ say: 'philippe', text: 'Toma. —Te da una llave de hierro enorme, con un llavero en forma de casita—. La del ático. No te lo vendo: te lo presto. Es tu casa en cierto modo. La única casa donde todo lo que hay es tuyo y no tienes que limpiar nada.' },
			{ give: 'llaveatico' },
			{ say: 'philippe', text: 'Las piezas seguirán llegando. Cuando hagas algo que se recuerde, alguien me lo mandará. Lo sé. Lo noto. Es mi Phil-osofía más reciente: los recuerdos encuentran sola la dirección de su museo.' },
			{ quest: 'b05_s_museo', stage: 'hecha', done: true },
			{ rep: { kalos: 2 } },
			{ diary: 'Hoy mi entrenador{|a|e} inauguró un museo. ¡Un museo entero sobre nosotros! Philippe cortó una cinta y le salieron once pañuelos del bolsillo. Yo los conté. Once. Había cosas de Kalos, de Johto y de Kanto, y una baraja de cartas en el centro. Me gusta que alguien guarde lo que hacemos. Así no se pierde. ¡Bzzt!', cond: 'flag.b01_diario' },
		],

		// ---------- El conservador (después) ----------
		museo_philippe: [
			{ if: 'flag.b05_luz_necrozma || flag.b05_luz_aether || flag.b05_luz_leilani', then: [
				{ say: 'philippe', text: 'Ha llegado otra caja de Alola. La he puesto en su sala, con su cartela. ¿Has visto? Ya casi no quedan vitrinas vacías. Voy a tener que pedirle al casero el trastero. El casero soy yo. Me lo voy a conceder.' },
				{ end: true },
			] },
			{ say: 'philippe', text: '¡Ficha número uno! Sin novedades en el museo. Bueno, una: he quitado el polvo de la mecedora y se ha movido sola. Otra vez. Ya no grito. Casi.' },
			{ say: 'philippe', text: 'Phil-osofía de conservador: no hay que esperar a que pase algo grande para guardarlo. Pero ayuda.' },
		],
		museo_libro: [
			{ text: 'Un libro de tapas de cuero en un atril, junto al ventanal. Las páginas vibran un poco con el zumbido de la Puerta. Hay pocas firmas, pero cada una ocupa media página.' },
			{ read: { title: 'Libro de visitas', text: '*(Letras distintas. Una página cada una.)*\n\n«Inaugurado hoy. Once pañuelos. Lo apunto porque nadie me va a creer. —P. Dumont, conservador»\n\n«Hay noticias que no se publican. Esta es una. —Alexia»\n\n«Los macarons de la vitrina de Crómlech son para los visitantes. Si no hay visitantes, son para mí. —Matière»\n\n«Me dijo Matière que pusiera algo. Handsome no sabe qué poner. Handsome pone: bien hecho. —H.» *(con la tinta corrida, como si hubiera escrito con guantes)*' } },
			{ if: 'flag.b02_lucien_madre || flag.b02_lucien_cipres || flag.b02_lucien_publico', then: [{ read: { title: 'Libro de visitas (cont.)', text: '*(Letra de niño, muy apretada, con la hora al margen.)*\n\n«18:42. He visto el museo. 18:43. Lo he vuelto a ver. 18:51. El señor de la chistera dice que tengo que firmar y no escribir todo el rato. Firmo: Lucien Perrot, futuro viajero de todas las Puertas.»' } }] },
			{ if: 'flag.b05_terron_estribo', then: [{ read: { title: 'Libro de visitas (cont.)', text: '*(Letra grande y temblona, en lápiz de carpintero. Llegó por correo, pegada con celo.)*\n\n«No he venido porque Luminalia está lejos y la rodilla, cerca. Pero mi hija dice que hay una herradura nuestra en su museo. Que la cuiden. Era de cuando cabía en el sombrero. —Kekoa, de Ohana»' } }] },
			{ if: 'flag.b05_luz_leilani', then: [{ read: { title: 'Libro de visitas (cont.)', text: '*(Bolígrafo, letra rapidísima, con una mancha de grasa en la esquina.)*\n\n«¡Hola, museo! No he ido. Pero te mandé la baliza. Si deja de parpadear, no la abras: se abre sola y luego no cierra. Tres cortas y una larga, ¿sí o qué? —L. K.»' } }] },
		],
		museo_alola_vacia: [
			{ text: 'Tres vitrinas vacías, con el cristal recién limpio y una cartela en blanco cada una. En la primera, a lápiz, muy flojito, Philippe ha escrito: «Aquí irá algo de luz. No sé por qué lo sé».' },
			{ say: 'philippe', text: 'No me mires así. Los agentes inmobiliarios tenemos olfato para los huecos. Es lo que vendemos: huecos con paredes.' },
		],

		// =================== PIEZAS · KALOS (B1) ===================
		museo_baraja: [
			{ set: { 'flag.museo_v_baraja': true } },
			{ text: 'Una baraja de cartas francesas, con el dorso azul y una chistera dorada. Está gastada por los bordes. Le falta el tres de tréboles: en su sitio hay un papelito doblado.' },
			{ if: 'done.b01_s_philippe', then: [
				{ read: { title: 'Cartela · La pieza cero', text: '**LA BARAJA DE LA SUERTE**\nPrestada por el conservador.\n\nSe perdió una tarde en la Ruta 5 y volvió en el bolsillo de alguien que no tenía ninguna obligación de traerla. Ahí empezó la ficha número uno.\n\nLe falta el tres de tréboles. Se quedó al otro lado de una valla, en Luminalia, el día de la Gira. El conservador dice que no la echa de menos. El conservador miente: es mago.' } },
			], else: [
				{ read: { title: 'Cartela · La pieza cero', text: '**LA BARAJA DE LA SUERTE**\nPrestada por el conservador.\n\nCon ella el conservador ha fallado todos los trucos que sabe, y algunos que no sabe. La primera vez que la usó contigo, también. Ahí empezó la ficha número uno.\n\nLe falta el tres de tréboles. El conservador dice que no la echa de menos. El conservador miente: es mago.' } },
			] },
			{ if: PH_ALOLA, then: [{ say: 'philippe', text: 'En Alola tu Pokémon me devolvió el tres de tréboles. Lo tengo en la cartera. No lo pongo en la vitrina. —Se toca el pecho—. Hay piezas que el conservador se queda.', cond: '(inParty("riolu") || inParty("lucario"))' }] },
		],
		museo_titular: [
			{ set: { 'flag.museo_v_titular': true } },
			{ text: 'Un recorte del *Diario de Luminalia*, amarillento ya, en un marco dorado demasiado grande para él. En la esquina, un clip con una tarjeta de periodista.' },
			{ if: 'flag.b01_prensa_verdad', then: [
				{ read: { title: 'Cartela · El titular', text: '**«SE ABRIÓ UNA GRIETA»: UN NOVATO CONTRADICE A LEMNIS**\n*Diario de Luminalia*, edición de la mañana. Cedido por Alexia.\n\nEl día de la inauguración, alguien que estaba delante de la Puerta dijo en voz alta lo que vio. Lemnis lo llamó «desajuste de calibración». Tú lo llamaste grieta.\n\nNota de Alexia en el clip: «A los guardias no les gustó. A mí sí. Lo enmarco porque fue la primera vez que alguien me contestó sin mirar a quién tenía detrás».' } },
			] },
			{ if: 'flag.b01_prensa_neutral', then: [
				{ read: { title: 'Cartela · El titular', text: '**LA PUERTA FALLA EN SU ESTRENO; LOS TESTIGOS, SIN PALABRAS**\n*Diario de Luminalia*, edición de la mañana. Cedido por Alexia.\n\nEl día de la inauguración, a la pregunta de qué había pasado, hubo quien no quiso adivinar. El titular lo sacó Alexia de ahí: del silencio.\n\nNota de Alexia en el clip: «Callarse también es una respuesta. Las respuestas que no salen en el periódico son las que más me interesan».' } },
			] },
			{ if: 'flag.b01_prensa_lemnis', then: [
				{ read: { title: 'Cartela · El titular', text: '**«LEMNIS LO TIENE CONTROLADO», DICE UN NOVATO DE LA GIRA**\n*Diario de Luminalia*, edición de la mañana. Cedido por Alexia.\n\nEl día de la inauguración, entre gritos y Pokémon de otras regiones, alguien pidió calma. Lemnis puso la frase en sus carteles durante una semana.\n\nNota de Alexia en el clip: «No lo enmarco para juzgarte. Lo enmarco porque me acuerdo de tu cara al decirlo. Parecía que querías creértelo».' } },
			] },
			{ say: 'philippe', text: 'Alexia me lo trajo en persona. Me dijo: «enmárcalo torcido, que así fue». Lo enmarqué recto. Luego lo torcí un poco. Para respetar la voluntad de la donante.' },
		],
		museo_cueva: [
			{ set: { 'flag.museo_v_cueva': true } },
			{ text: 'Un cristal de la Cueva Brillante del tamaño de un puño, que brilla un poco aunque la sala esté a oscuras. Apoyada en él, una postal con un Froakie dibujado a bolígrafo.' },
			{ if: 'flag.b01_bastien_cubierto', then: [
				{ read: { title: 'Cartela · La cueva', text: '**UN CRISTAL DE LA CUEVA BRILLANTE**\nEnviado por Bastien Lacroix.\n\nEn el fondo de la cueva había cajas con un logo que nadie quería ver. Bastien lo vio. Alguien dio la cara por él.\n\nEn la postal: «No sé si se le puede dar las gracias a alguien con un pedrusco. Lo intento. Me cubriste. Te debo una. Dos, ya. —B.»' } },
			] },
			{ if: 'flag.b01_bastien_rompe', then: [
				{ read: { title: 'Cartela · La cueva', text: '**UN CRISTAL DE LA CUEVA BRILLANTE**\nEnviado por Bastien Lacroix.\n\nEn el fondo de la cueva había cajas con un logo que nadie quería ver. Bastien lo vio. Le dijeron que lo contara él, y lo contó.\n\nEn la postal: «Me costó un contrato y tres cartas de abogados. Las tengo en una caja de zapatos. Este pedrusco, en la mesilla. Ya sabes cuál de las dos cosas miro más. —B.»' } },
			] },
			{ if: 'flag.b01_bastien_silencio', then: [
				{ read: { title: 'Cartela · La cueva', text: '**UN CRISTAL DE LA CUEVA BRILLANTE**\nEnviado por Bastien Lacroix.\n\nEn el fondo de la cueva había cajas con un logo que nadie quería ver. «No vimos nada», dijo alguien. Bastien asintió.\n\nEn la postal, con letra muy pequeña: «No vimos nada. A veces todavía lo veo. Te lo mando para no tenerlo yo. —B.»' } },
			] },
			{ say: 'philippe', text: 'El chico de la postal es muy educado. Pidió perdón por el tamaño del pedrusco. Le dije que en un museo nada es demasiado grande. Luego intenté subirlo por la escalera y retiré lo dicho.' },
		],
		museo_cromlech: [
			{ set: { 'flag.museo_v_cromlech': true } },
			{ if: 'flag.b01_delatar', then: [
				{ text: 'Una portada entera del *Diario de Luminalia*, doblada en cuatro y vuelta a desdoblar muchas veces. La letra del titular ocupa media página.' },
				{ read: { title: 'Cartela · Crómlech', text: '**«LEMNIS EXCAVA EN SECRETO BAJO LOS MENHIRES»**\nPortada del *Diario de Luminalia*. Cedida por Alexia.\n\nEn Pueblo Crómlech había una excavación que no salía en ningún permiso. Alguien decidió que al día siguiente lo supiera todo Kalos. Lo supo.\n\nNota de Alexia: «Ese día vendimos el triple. Ese día también me llamaron tres abogados. No te lo cuento para que te sientas mal: te lo cuento para que sepas que funcionó».' } },
			] },
			{ if: 'flag.b01_handsome', then: [
				{ text: 'Un imán de nevera con forma de menhir, de los de las tiendas de recuerdos. Pone «CRÓMLECH» en letras doradas. Está en el centro de una vitrina enorme, sobre un cojín. Solo.' },
				{ read: { title: 'Cartela · Crómlech', text: '**UN IMÁN DE NEVERA**\nEnviado por un turista de bigote sospechoso.\n\nEn Pueblo Crómlech había una excavación que no salía en ningún permiso. Alguien decidió contárselo solo a quien tenía que contárselo. Nadie más lo supo. Por eso esta pieza es tan pequeña.\n\nEn el reverso del imán, con rotulador: «Discreto. Como tú. —Un turista»' } },
			] },
			{ if: 'flag.b01_trato_sera', then: [
				{ text: 'Una tarjeta de cartulina gris perla, sin texto, con una lemniscata en relieve en la esquina. Está sola en una vitrina enorme. Philippe le ha puesto terciopelo negro debajo, por si acaso.' },
				{ read: { title: 'Cartela · Crómlech', text: '**UNA TARJETA SIN NOMBRE**\nRemitente: no consta. Llegó en un sobre lacrado, sin sello.\n\nEn Pueblo Crómlech había una excavación que no salía en ningún permiso. Alguien aceptó un trato, «pero quiero ver lo que hacen». Desde entonces, alguien lo ve hacer cosas a él.\n\nEl conservador no sabe quién la mandó. El conservador tiene una sospecha muy educada.' } },
			] },
			{ say: 'philippe', text: 'Esta vitrina la pongo siempre en el centro. No sé por qué. Hay piezas que piden estar en el medio, como hay invitados que piden la cabecera.' },
		],
		museo_torre: [
			{ set: { 'flag.museo_v_torre': true } },
			{ text: 'Una canica de escayola, blanca, pintada a mano con una espiral azul y negra. Está un poco torcida. Sobre un cojín azul, con una tarjetita escrita con pincel.' },
			{ read: { title: 'Cartela · La Torre', text: '**UNA RÉPLICA DE ESCAYOLA DE LA LUCARITA**\nEnviada por Cornelio, de la Torre Maestra de Yantra.\n\nEn lo alto de la Torre Maestra, un Lucario y su entrenador{|a|e} subieron juntos el último tramo. El vínculo es enorme, pero no es infinito: por eso se cuida.\n\nEn la tarjetita, con pincel: «La de verdad la tienes tú. Esta la hizo mi nieta con cinco años; le salió torcida. Las cosas torcidas guardan mejor los recuerdos. —C.»' } },
			{ if: 'flag.b01_lila_llama', then: [{ text: 'Debajo del cojín asoma otra tarjeta, más pequeña, con otra letra, redonda y apretada: «Gracias por quedarte cerca aquella noche. Ya no se me olvida respirar. —L.»' }] },
			{ if: '(inParty("riolu") || inParty("lucario"))', then: [{ text: '{riolu} se acerca a la vitrina, mira la canica torcida y luego te mira a ti. Resopla por la nariz, como cuando algo le hace gracia. Philippe se aparta un paso, por respeto.' }] },
			{ say: 'philippe', text: 'El señor de la Torre me escribió con pincel. Con pincel. Yo le contesté con bolígrafo y me sentí un salvaje.' },
		],

		// =================== PIEZAS · JOHTO (B2–B3) ===================
		museo_fragmento: [
			{ set: { 'flag.museo_v_fragmento': true } },
			{ if: 'flag.b02_frag_handsome', then: [
				{ text: 'Un pañuelo de cuadros, doblado con mucho cuidado, como si todavía envolviera algo. No envuelve nada.' },
				{ read: { title: 'Cartela · El fragmento', text: '**UN PAÑUELO DE CUADROS**\nEnviado por un turista de bigote sospechoso.\n\nEn la Torre Quemada de Iris había una pieza que tres personas querían. Alguien se la dio a quien la iba a guardar como prueba.\n\nEn una nota grapada al pañuelo: «Con esto la envolví. Lo que envolvía ya no lo tengo yo. El pañuelo, sí. Te lo presto. Es lo único que sé guardar bien. —H.»' } },
			] },
			{ if: 'flag.b02_frag_sera', then: [
				{ text: 'Un guante blanco. Uno solo, de piel finísima, doblado sobre sí mismo. En la caja de fruta parece todavía más blanco.' },
				{ read: { title: 'Cartela · El fragmento', text: '**UN GUANTE BLANCO**\nRemitente: no consta. Venía en papel de seda, con una tarjeta gris perla.\n\nEn la Torre Quemada de Iris había una pieza que tres personas querían. Alguien se la devolvió a su dueña.\n\nEn la tarjeta, con letra muy recta: «Una dama devuelve lo que le prestan. Le debía una prenda». El conservador no sabe qué significa. El conservador lo ha buscado en un libro de etiqueta y ha aprendido mucho sobre cubiertos.' } },
			] },
			{ if: 'flag.b02_frag_melia', then: [
				{ text: 'Unas gafas de sol rojas, de diseño, con una patilla rota y pegada con cinta adhesiva. En la caja de fruta parecen un insecto raro.' },
				{ read: { title: 'Cartela · El fragmento', text: '**UNAS GAFAS DE SOL ROJAS**\nRemitente: no consta. Llegaron en una caja de bombones vacía.\n\nEn la Torre Quemada de Iris había una pieza que tres personas querían. Alguien dejó que se rompiera.\n\nEn la tapa de la caja, con pintalabios: «Para el museo de los que eligen». Sin firma. El conservador sospecha que la remitente no come bombones.' } },
			] },
			{ say: 'philippe', text: 'Esa caja de fruta me la dio un frutero de la plaza. Le conté para qué era y me regaló otras tres. Luminalia es así: si dices «museo» la gente se pone generosa.' },
		],
		museo_lucien: [
			{ set: { 'flag.museo_v_lucien': true } },
			{ if: 'flag.b02_lucien_madre', then: [
				{ text: 'Un dibujo hecho con ceras, colgado con pinzas de tender: una Puerta con forma de ocho tumbado, muchas personas pequeñas y una muy grande con una gorra. Firmado: «Lucien, 12 años y medio».' },
				{ read: { title: 'Cartela · La primera fila', text: '**UN DIBUJO CON CERAS**\nEnviado por la señora Perrot, de Luminalia.\n\nEl día de la Gira, un niño con una gorra enorme quería cruzar la Puerta. Alguien lo llevó con su madre.\n\nNota de la señora Perrot, con letra de enfado ya pasado: «Me lo trajo usted entero. Él dice que usted es la persona más aburrida del mundo. Para él eso es lo más alto. Gracias».' } },
			] },
			{ if: 'flag.b02_lucien_cipres', then: [
				{ text: 'Una foto pegada con celo a una cartulina: un telescopio enorme, el profesor Ciprés señalando el cielo y un niño con una gorra, mirando por el ocular del revés.' },
				{ read: { title: 'Cartela · La primera fila', text: '**UNA FOTO DEL TELESCOPIO**\nEnviada desde el laboratorio del Prof. Ciprés.\n\nEl día de la Gira, un niño con una gorra enorme quería cruzar la Puerta. Alguien lo llevó con el profesor.\n\nEn el reverso, con letra de científico contento: «Algunas puertas hay que mirarlas mucho antes de abrirlas. Lucien ya mira. Por el lado bueno del telescopio, casi siempre».' } },
			] },
			{ if: 'flag.b02_lucien_publico', then: [
				{ text: 'Un dorsal de la Gira, doblado en cuatro y planchado. Tiene un número escrito a mano y, debajo, con otra letra: «para la próxima temporada».' },
				{ read: { title: 'Cartela · La primera fila', text: '**UN DORSAL DOBLADO**\nEnviado por Lucien Perrot, en un sobre lleno de dibujos.\n\nEl día de la Gira, un niño con una gorra enorme quería cruzar la Puerta. Alguien le consiguió la primera fila. La vio abrirse desde dos metros.\n\nEn la carta (siete páginas): «Lo apunté todo. Con horas. La Puerta se abrió a las 10:14. Usted cruzó a las 10:17. Yo cruzaré en la próxima temporada. Le dejo mi dorsal para que me lo guarde».' } },
			] },
			{ say: 'philippe', text: 'Lo he colgado bajito, a la altura de un niño. Phil-osofía: hay piezas que hay que mirar agachándose. Te recuerdan quién eras.' },
		],
		museo_rancho: [
			{ set: { 'flag.museo_v_rancho': true } },
			{ text: 'Una mecedora de juguete, de madera, del tamaño de un libro. Cuando pasas cerca, se mece sola un poco, por el aire que mueves. Debajo hay una caja que huele a lana y a heno.' },
			{ if: 'flag.b03_rancho_sobrina', then: [
				{ read: { title: 'Cartela · El rancho', text: '**UNA MECEDORA DE JUGUETE**\nEnviada por Adela Prado, del Rancho Prado (Ruta 42).\n\nUn ranchero viejo cruzó una Fisura con su rebaño, volvió a casa y se quedó en su porche hasta el final. Su rancho lo lleva ahora quien él quería, porque alguien se lo pidió.\n\nNota de Adela, letra apretada: «La tallaba mi tío por las noches. Era para ti; nunca la terminó. Le he puesto yo la última pata. Ha quedado coja. Como el rancho sin él. Las Mareep, bien. —A.»' } },
			] },
			{ if: 'flag.b03_rancho_jugador', then: [
				{ read: { title: 'Cartela · El rancho', text: '**UNA MECEDORA DE JUGUETE**\nEnviada desde tu rancho, el Rancho Prado (Ruta 42). Remite: Adela.\n\nUn ranchero viejo cruzó una Fisura con su rebaño, volvió a casa y se quedó en su porche hasta el final. Su rancho es tuyo ahora. Todavía suena raro decirlo.\n\nNota de Adela: «La tallaba mi tío por las noches. Era para ti. Si la quieres en el porche, es tu porche. Si la quieres en un museo, también es tu museo. Tú decides. Ya estás acostumbrad{o|a|e}. —A.»' } },
			] },
			{ if: 'flag.b03_rancho_lemnis', then: [
				{ text: 'Junto a la mecedora, Philippe ha puesto un folleto de la «Fundación Raíces de Johto», azul y plata, muy limpio. Lo ha puesto boca abajo.' },
				{ read: { title: 'Cartela · El rancho', text: '**UNA MECEDORA DE JUGUETE**\nEnviada por Adela Prado, del Rancho Prado (Ruta 42).\n\nUn ranchero viejo cruzó una Fisura con su rebaño, volvió a casa y se quedó en su porche hasta el final. Ahora el rancho tiene una cerca blanca y una placa azul.\n\nNota de Adela: «La tallaba mi tío. Era para ti. Aquí ya no tiene sitio: los martes vienen a mirar las cuentas y la mecedora les estorba. Guárdamela. Los contratos se acaban. —A.»' } },
			] },
			{ say: 'philippe', text: 'Esta me costó escribirla. Taché mucho. Al final dejé lo justo. —Se quita la chistera un momento—. Los de mi oficio sabemos que las casas no se venden por las paredes. Se venden por quien se sentaba en el porche.' },
		],
		museo_familia: [
			{ set: { 'flag.museo_v_familia': true } },
			{ if: 'flag.b03_rocket_policia', then: [
				{ text: 'Una gorra negra metida en una bolsa de pruebas transparente, con una etiqueta de la policía de Caoba. Le han descosido una letra del frente: solo quedan los agujeritos.' },
				{ read: { title: 'Cartela · La familia', text: '**UNA GORRA EN UNA BOLSA DE PRUEBAS**\nEnviada por un turista de bigote sospechoso.\n\nBajo una tienda de recuerdos de Caoba vivían los últimos de «la familia». Alguien llamó a la policía para todos. Lo justo, lo limpio, lo que queda bien en un informe.\n\nEn la etiqueta, a bolígrafo: «Les llevé bocadillos. A todos. Se los comieron. Eso también va en el informe. —H.»' } },
			] },
			{ if: 'flag.b03_rocket_libres', then: [
				{ text: 'Una gorra negra doblada en cuatro, muy bien doblada. Debajo, un saquito de tela con un puñado de arroz.' },
				{ read: { title: 'Cartela · La familia', text: '**UNA GORRA DOBLADA EN CUATRO**\nEnviada desde la Ruta 37. Remite: T.\n\nBajo una tienda de recuerdos de Caoba vivían los últimos de «la familia». Alguien encerró al jefe y dejó ir a los demás.\n\nEn un papel de estraza, con letra que se esfuerza: «Mi madre guardó arroz. Siempre guarda. Le mando un poco porque dice que a quien te deja volver a casa se le manda comida. No me pongo la gorra. La doblo. —T.»' } },
			] },
			{ if: 'flag.b03_rocket_quemar', then: [
				{ text: 'Un trozo de disco duro ennegrecido, con los bordes derretidos, sobre una servilleta. Huele, muy flojito, a gasolina y a limón.' },
				{ read: { title: 'Cartela · La familia', text: '**UN DISCO QUEMADO**\nRemitente: no consta. Llegó en una caja de herramientas sin herramientas.\n\nBajo una tienda de recuerdos de Caoba vivían los últimos de «la familia». Alguien dijo «quémalo» en voz baja.\n\nDentro de la caja, una tarjeta: «Te debo una. Y yo pago lo que debo». El conservador ha puesto esta pieza en la esquina. No le gusta su olor. Le gusta mucho su historia.' } },
			] },
			{ say: 'philippe', text: 'Esta sala tiene piezas de gente que no sé si debería conocer. Por eso las cartelas son tan cortas. Phil-osofía: en la duda, se describe el objeto y se calla el resto.' },
		],
		museo_lago: [
			{ set: { 'flag.museo_v_lago': true } },
			{ if: 'flag.b03_gyarados_atrapado', then: [
				{ text: 'Una escama roja enorme, del tamaño de un plato, que brilla como el cobre mojado. Junto a ella, una foto de un lago con una boya en medio.' },
				{ read: { title: 'Cartela · El rojo del lago', text: '**UNA ESCAMA ROJA**\nEncontrada por el conservador dentro de su propio buzón, sin sobre.\n\nEn el Lago de la Furia rugía un Gyarados rojo que no sabía por qué rugía. Ahora viaja contigo, dentro de una Poké Ball, donde ya no oye lo que le hacía rugir.\n\nNota (a máquina): «Un Gyarados así no se ve dos veces en una vida. Ya lo has visto una. Cuídalo». Sin firma. El conservador sospecha de alguien con capa.' } },
			] },
			{ if: 'flag.b03_gyarados_calmado', then: [
				{ text: 'Una foto movida de un lago al atardecer. Al fondo, muy lejos, una sombra roja que se aleja nadando despacio. En primer plano, alguien de espaldas.' },
				{ read: { title: 'Cartela · El rojo del lago', text: '**UNA FOTO MOVIDA**\nEnviada desde el Lago de la Furia. Remite: un pescador.\n\nEn el Lago de la Furia rugía un Gyarados rojo que no sabía por qué rugía. Alguien lo cansó tanto que no le quedaron fuerzas para la rabia, y lo dejó irse.\n\nEn el reverso: «Desde aquel día nada ruge en el lago. Los peces han vuelto. Mi mujer dice que los peces no tenían que volver de ningún sitio. Yo digo que sí».' } },
			] },
			{ if: 'flag.b03_gyarados_huido', then: [
				{ text: 'Una boya de juguete, roja y blanca, del tamaño de un puño. Flota en una pecera sin peces.' },
				{ read: { title: 'Cartela · El rojo del lago', text: '**UNA BOYA DE JUGUETE**\nRemitente: no consta. Llegó en una caja con olor a lago.\n\nEn el Lago de la Furia rugía un Gyarados rojo que no sabía por qué rugía. Ese día no hubo manera. Alguien se apartó a tiempo.\n\nDentro de la caja, una tarjeta: «Hay días en los que lo más valiente es apartarse. Lo arreglaremos desde la raíz». El conservador no sabe qué raíz. Ha regado la pecera por si acaso.' } },
			] },
			{ say: 'philippe', text: 'Esa pieza la miro de noche. La Puerta le da un brillo azul y parece que se mueve. Seguramente no se mueve. Seguramente.' },
		],

		// =================== PIEZAS · KANTO (B4) ===================
		museo_inspector: [
			{ set: { 'flag.museo_v_inspector': true } },
			{ text: 'Un cajón de archivador gris, abierto. Dentro, una carpeta de la Agencia de Detectives con una etiqueta escrita por Matière.' },
			{ if: 'flag.b04_lebrun_detenido', then: [
				{ read: { title: 'Cartela · El inspector', text: '**UNAS ESPOSAS**\nCedidas por la Agencia de Detectives de Luminalia.\n\nEn una cueva de Kanto, alguien de la Policía Internacional resultó ser quien no debía. Lo detuvieron. Las esposas tardaron dos intentos en abrirse.\n\nNota de Matière: «Handsome no quiere verlas. Las mando aquí porque en la Agencia nadie las mira y en un museo alguien las mirará bien. Está al mando ahora. Lo lleva como lleva todo: con el bigote tieso. —M.»' } },
			] },
			{ if: 'flag.b04_lebrun_cebo', then: [
				{ read: { title: 'Cartela · El inspector', text: '**UNA TAZA DE OFICINA**\nCedida por la Agencia de Detectives de Luminalia.\n\nEn una cueva de Kanto, alguien de la Policía Internacional resultó ser quien no debía. Siguió en su mesa al día siguiente, con su carpeta y su traje gris.\n\nNota de Matière: «Es su taza. La cambié por otra igual y nadie se ha dado cuenta. No preguntes. Está en su mesa, y así tiene que estar. —M.»' } },
			] },
			{ if: 'flag.b04_lebrun_libre', then: [
				{ read: { title: 'Cartela · El inspector', text: '**UNA HOJA CON LETRA DE FUNCIONARIO**\nCedida por la Agencia de Detectives de Luminalia.\n\nEn una cueva de Kanto, alguien de la Policía Internacional resultó ser quien no debía. Le dejaron ir a cambio de saber cómo le llegaban las órdenes.\n\nNota de Matière: «La copia buena la tiene Handsome. Esta es la que se quedó en la carpeta, por triplicado. Una persona que escribe por triplicado hasta cuando se va… me da pena. Un poco. —M.»' } },
			] },
			{ say: 'philippe', text: 'La de la Agencia me pidió que no hiciera preguntas. Yo no hago preguntas. Yo hago cartelas. Que es como hacer preguntas, pero en bonito.' },
		],
		museo_octava: [
			{ set: { 'flag.museo_v_octava': true } },
			{ text: 'Una foto con un marco de conchas pegadas con cola: una piscina azul, plataformas flotantes y, delante, una líder de gimnasio pelirroja con el pulgar hacia arriba. Detrás, en el agua, un Starmie salpicando.' },
			{ read: { title: 'Cartela · La octava', text: '**UNA FOTO CON MARCO DE CONCHAS**\nEnviada desde el Gimnasio de Ciudad Celeste.\n\nOcho medallas del Circuito Infinito. La última, en una piscina, contra alguien que no pierde casi nunca. Con ella, la clasificación para la Copa Infinita de la temporada.\n\nEn el reverso, con rotulador azul: «El marco lo hizo mi hermana. Es horrible. Por eso te lo mando. Nos vemos en la Copa. Esta vez te lo pongo más difícil. —Misty»' } },
			{ say: 'philippe', text: '¡Ocho medallas! Cuando te conocí tenías una y me dejaste hacerte un truco. Ahora tienes ocho y sigues dejándome. Eso es humildad. O lástima. Me quedo con humildad.' },
		],

		// =================== PIEZAS · ALOLA (B5) ===================
		museo_luz: [
			{ set: { 'flag.museo_v_luz': true } },
			{ if: 'flag.b05_luz_necrozma', then: [
				{ text: 'Una foto del cielo de Alola a media tarde. No pasa nada en ella: un cielo azul, una nube, una gaviota. Philippe la ha puesto en la vitrina con la luz apagada, y aun así se ve clarísima.' },
				{ read: { title: 'Cartela · La luz', text: '**UNA FOTO DE UN CIELO NORMAL**\nEnviada desde Kantai. Remite: una turista con un Altaria.\n\nDurante días, el cielo de Alola se apagó a media tarde. En un altar de Isla Poni, alguien devolvió la luz a quien era su dueño. El cielo volvió de golpe.\n\nEn el reverso: «Por fin una foto que sale clara. Llevaba tres días esperando un cielo aburrido. Se la mando a quien me lo devolvió. Lo apunté todo».' } },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ text: 'Un frasco de cristal de la Fundación Æther, vacío, con una etiqueta de custodia y un número de serie. En la vitrina a oscuras, el fondo del frasco tiene un brillo pálido que no viene de ninguna parte.' },
				{ read: { title: 'Cartela · La luz', text: '**UN FRASCO DE CUSTODIA VACÍO**\nEnviado desde el Paraíso Æther. Remite: la subdirección.\n\nDurante días, el cielo de Alola se apagó a media tarde. En un altar de Isla Poni, alguien confió la luz a quien prometió devolverla poco a poco, con médicos de verdad.\n\nNota: «El primero que vaciamos. Lo devolvimos entero, gota a gota. Faltan muchos. Pero este ya. Gracias por confiar. —Z.»' } },
			] },
			{ if: 'flag.b05_luz_leilani', then: [
				{ text: 'Una baliza de juguete, hecha con una linterna, cinta aislante y una pila. Parpadea sola dentro de la vitrina a oscuras: tres destellos cortos y uno largo. Y otra vez.' },
				{ read: { title: 'Cartela · La luz', text: '**UNA BALIZA DE JUGUETE**\nEnviada desde el taller Kahale, Kantai. Remite: L. K.\n\nDurante días, el cielo de Alola se apagó a media tarde. En un altar de Isla Poni, alguien le dio la luz a quien más la necesitaba: un minuto, para mirar al otro lado.\n\nEn la caja, con letra rapidísima: «Tres cortas y una larga: estoy bien, vuelve a dormir. Te la mando para que la tengas tú. Yo ya me la sé. Me la sé de memoria. ¿Sí o qué?»' } },
			] },
			{ say: 'philippe', text: 'Esta pieza llegó con un sobre que olía a sal. Lo abrí junto al ventanal y la Puerta zumbó más fuerte. Seguramente fue casualidad. En este museo pasan muchas casualidades.' },
		],
		museo_contrato: [
			{ set: { 'flag.museo_v_contrato': true } },
			{ if: 'flag.b05_bastien_rompe', then: [
				{ text: 'Una fotocopia de una página de contrato. En el centro, donde debería estar la página treinta y uno, hay un hueco: la fotocopia es de un contrato con una página arrancada por la línea de puntos.' },
				{ read: { title: 'Cartela · El contrato', text: '**LA FOTOCOPIA DE UN HUECO**\nEnviada por Bastien Lacroix, desde Alola.\n\nEn una sala blanca llena de cables, un entrenador y su Greninja leyeron juntos la letra pequeña. Alguien le dijo «rómpelo». Lo rompió, por la línea de puntos.\n\nEn la postal: «La página la guardo yo. El hueco te lo mando a ti. Si un día dicen que no existió, enséñales el hueco. Greninja te manda recuerdos. Bueno, te mira mal. Es su forma. —B.»' } },
			] },
			{ if: 'flag.b05_bastien_sigue', then: [
				{ text: 'Una insignia de hojalata con forma de Froakie, sin logo, en una cajita de anillos. Está un poco abollada, como si la hubieran apretado mucho en un puño.' },
				{ read: { title: 'Cartela · El contrato', text: '**UNA INSIGNIA DE HOJALATA**\nEnviada por Bastien Lacroix, desde Alola.\n\nEn una sala blanca llena de cables, un entrenador y su Greninja leyeron juntos la letra pequeña. Él decidió seguir. Por ahora.\n\nEn la postal: «Me la regaló alguien que ya no contesta. Guárdamela tú. Si la llevo, me acuerdo de lo que firmé. Si la llevas tú, me acuerdo de lo que no. —B.»' } },
			] },
			{ say: 'philippe', text: 'El chico del pedrusco otra vez. Ha mejorado mucho la letra. Se nota que ha leído contratos: escribe como quien no se fía de los márgenes.' },
		],
		museo_terron: [
			{ set: { 'flag.museo_v_terron': true } },
			{ text: 'Una herradura de Mudbray, pequeñísima, de cuando el Mudbray cabía en un sombrero. Tiene barro rojo seco entre los clavos. Al lado, una cinta de sombrero sin flores.' },
			{ read: { title: 'Cartela · Lo que no crece', text: '**UNA HERRADURA PEQUEÑA**\nEnviada por Kalena, capataza del Rancho Ohana (Akala).\n\nEn un rancho de Mudsdale, un Mudbray llevaba años sin crecer. No estaba roto: tenía trabajo. Cada mañana, antes del sol, se agachaba para que alguien muy mayor pudiera subirse.\n\nNota de Kalena: «Mi padre dice que una herradura de esas trae suerte. No la necesitamos: ya nos la trajiste. En el abrevadero hay un estribo esperando. No hay prisa. Aquí todo va despacio y se ve mejor. —K.»' } },
			{ say: 'philippe', text: 'Esta es la pieza más pequeña de la sala y la que más pesa. Ya me pasó con la mecedora. Debe de ser cosa de las sillas y de los que las usan.' },
		],
	},
};
