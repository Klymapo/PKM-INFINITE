// Bloque 7 · Museo de la Ficha Número Uno: sala de Galar (3 piezas) y una pieza nueva en la sala de Alola.
// Depende de app/content/b05/t7-museo.js (lugar `museo_ficha`, sala `museo_sala_alola`, NPC `philippe`, flags `museo_v_*`).
// Mismo formato que b06/t6-museo.js: una sala hija de `museo_ficha`, su puerta en el ático (patch) y una pieza por
// decisión o hito, que solo existe si existe su flag. Cada pieza: remitente, cartela (hoja de papel) y comentario de Philippe.
// La pieza de Noa va sin chistes de Philippe (biblia §9.1: ni humor en la escena ni alrededor).

const SALA_G = 'flag.b07_puerta_galar';
const Q = 'quest.b05_s_museo';
const OCTAVIA = 'flag.b07_octavia_dentro || flag.b07_octavia_publica || flag.b07_octavia_testigo';
const CASA = 'flag.b07_casa_devuelve || flag.b07_casa_lectura || flag.b07_casa_quintana || flag.b07_casa_fallido';
const pieza = (id, label, sub, icon, cond) => ({ label, sub, icon, cond, new: '!flag.museo_v_' + id, talk: [{ script: 'museo_' + id }] });

export default {
	locations: {
		museo_sala_galar: {
			name: 'Sala de Galar', parent: 'museo_ficha', kind: 'building',
			bg: { type: 'indoor', wall: '#c8cfc4', floor: '#6a5a4a' },
			desc: 'El rincón de la buhardilla donde gotea cuando llueve. Philippe ha puesto debajo de la gotera una tetera de porcelana «para que gotee con clase» y ha forrado la pared con un mapa de trenes de Galar, con chinchetas de colores en las estaciones.\n\nLas vitrinas son cajas de té vacías, puestas de pie, con un cristal delante.',
			descNight: 'De noche, la gotera hace *plic* en la tetera cada once segundos. Philippe dice que es el reloj más fiable de la casa.',
			mapNote: 'Piezas de Galar',
			onEnter: [{ script: 'museo_sala_galar', cond: '!flag.museo_sala_galar_vista', once: true }],
			spots: [
				pieza('etiqueta', 'Una etiqueta de envío enmarcada', 'Con una palabra tachada', '🏷️', 'flag.b07_noa_adios'),
				pieza('broche', 'Un broche en una caja de terciopelo', 'Plateado, con el cierre roto', '💠', OCTAVIA),
				pieza('llave_casa', 'Una llave de latón, grande', 'Colgada de un clavo, como en un cuento', '🗝️', CASA),
				{ label: 'Las cajas de té vacías', sub: 'Con matasellos de Galar', icon: '📦', cond: '!(flag.b07_noa_adios || ' + OCTAVIA + ' || ' + CASA + ')', talk: [{ script: 'museo_galar_vacia' }] },
			],
		},
	},

	patches: {
		// La puerta de la sala nueva, en el ático
		museo_ficha: { spots: [
			{ label: 'Sala de Galar', sub: 'Una tetera recoge la gotera de la puerta', icon: '🫖', cond: '!!' + Q + ' && !(' + Q + ' == "atico") && ' + SALA_G, new: '!flag.museo_sala_galar_vista', action: { go: 'museo_sala_galar' } },
		] },
		// Alola: el estribo, junto a la herradura de Terrón (la pieza `museo_terron` no se toca)
		museo_sala_alola: { spots: [
			pieza('estribo', 'Un estribo de madera, en miniatura', 'Al lado de la herradura pequeña', '🪵', 'flag.b07_terron_mudsdale'),
		] },
	},

	scripts: {
		museo_sala_galar: [
			{ set: { 'flag.museo_sala_galar_vista': true } },
			{ say: 'philippe', text: '¡Galar! Le he dado el rincón de la gotera. No es un desprecio: allí llueve siempre y aquí también. Me pareció lo más respetuoso. Phil-osofía: a cada región, su clima.' },
		],
		museo_galar_vacia: [
			{ text: 'Tres cajas de té de lata, de pie, con un cristal delante y nada dentro. Una huele a bergamota. Las otras dos, a nada.' },
			{ say: 'philippe', text: 'Las tengo preparadas. En Galar todo llega tarde por el tren, pero llega. Yo espero con el té hecho.' },
		],

		// =================== PIEZAS · GALAR (B7) ===================
		museo_etiqueta: [
			{ set: { 'flag.museo_v_etiqueta': true } },
			{ text: 'Una etiqueta de envío de cartón marrón, de las que se atan con un hilo, en un marco sencillo de madera clara. Pone «Destino: por asignar». La palabra de en medio está tachada con lápiz, con cuidado, una sola raya. Encima, con letra redonda y pequeña: «casa».' },
			{ if: 'flag.b07_bastien_llega', then: [
				{ read: { title: 'Cartela · Destino: casa', text: '**UNA ETIQUETA DE ENVÍO**\nEnviada por Bastien Lacroix, desde Artejo.\n\nEn una sala sin ventanas había jaulas con etiquetas como esta. Alguien las contó todas, una por una, durante años. Una noche las abrió desde dentro.\n\nEn la tarjeta, con la letra de Bastien, muy apretada: «Llegué. Me dio tiempo a oírla. Esta es de las suyas: se la guardé del suelo. No la quiero en un cajón. La quiero donde la vea gente. —B.»' } },
			], else: [
				{ if: 'flag.b07_bastien_tarde', then: [
					{ read: { title: 'Cartela · Destino: casa', text: '**UNA ETIQUETA DE ENVÍO**\nEnviada por Bastien Lacroix, desde Artejo.\n\nEn una sala sin ventanas había jaulas con etiquetas como esta. Alguien las contó todas, una por una, durante años. Una noche las abrió desde dentro.\n\nEn la tarjeta, con la letra de Bastien, que se tuerce al final de cada renglón: «No llegué. Corrí y no llegué. Esta estaba en la puerta. Guárdala tú, que yo no sé dónde ponerla sin que me mire. —B.»' } },
				], else: [
					{ read: { title: 'Cartela · Destino: casa', text: '**UNA ETIQUETA DE ENVÍO**\nEnviada por Lucien, desde Artejo. Con un dibujo de un Chespin en la esquina, borrado y vuelto a hacer.\n\nEn una sala sin ventanas había jaulas con etiquetas como esta. Alguien las contó todas, una por una, durante años. Una noche las abrió desde dentro.\n\nEn la tarjeta, con letra de colegio: «Era la mía. Ella me la cambió. Me dijo que las etiquetas se pueden corregir. —L.»' } },
				] },
			] },
			{ say: 'philippe', text: 'La colgué a la altura de los ojos. De los míos y de los de Lucien, que es más bajito. —Se queda callado un momento—. Es la única pieza que limpio todos los días.' },
		],
		museo_broche: [
			{ set: { 'flag.museo_v_broche': true } },
			{ text: 'Un broche plateado con forma de lazo de ocho, de los que se llevan en la solapa, sobre un cojín de terciopelo azul oscuro. El cierre está roto: alguien tiró de él con fuerza para quitárselo.' },
			{ if: 'flag.b07_octavia_dentro', then: [
				{ read: { title: 'Cartela · El broche', text: '**UN BROCHE CON EL CIERRE ROTO**\nSin remite. Llegó en un sobre de papel caro, sin sello, entregado a mano.\n\nAl amanecer, en una muralla, alguien decidió seguir dentro de un sitio del que ya no se fiaba, para poder contar lo que pasa allí. Para hacerlo tiene que seguir llevando el broche en público. Este es otro, el de repuesto, el que se rompió aquella noche.\n\nSin tarjeta. Solo una línea a máquina en el fondo del sobre: «Que conste en algún sitio».' } },
			] },
			{ if: 'flag.b07_octavia_publica', then: [
				{ read: { title: 'Cartela · El broche', text: '**UN BROCHE CON EL CIERRE ROTO**\nEnviado por Alexia, desde la redacción de la *Gaceta de Luminalia*.\n\nAl amanecer, en una muralla, alguien decidió contarlo todo en voz alta, delante de las cámaras, y dimitir. Se quitó el broche en mitad de la rueda de prensa y lo dejó en el atril. Nadie lo recogió.\n\nNota de Alexia: «Lo recogí yo. Una periodista no se queda con pruebas, así que te lo mando a ti. Tú sabrás qué es un museo. Yo no tengo ni sofá. —A.»' } },
			] },
			{ if: 'flag.b07_octavia_testigo', then: [
				{ read: { title: 'Cartela · El broche', text: '**UN BROCHE CON EL CIERRE ROTO**\nEnviado por Handsome, de la Policía Internacional. Con un sello de «PRUEBA DEVUELTA» un poco torcido.\n\nAl amanecer, en una muralla, alguien decidió entregarse como testigo y empezar de cero lejos de su despacho. Lo primero que dejó en la mesa de la policía fue esto.\n\nNota de Handsome: «La testigo dice que no lo quiere. Handsome no sabe qué hacer con las cosas que la gente no quiere. Colaborador, tú siempre sabes. —H.»' } },
			] },
			{ say: 'philippe', text: 'Es bonito, ¿eh? Plata de la buena. —Lo mira de lado—. Lo que pasa es que un lazo de ocho, si lo miras mucho rato, no se sabe dónde empieza. Lo he puesto mirando a la pared. Por si acaso.' },
		],
		museo_llave_casa: [
			{ set: { 'flag.museo_v_llave_casa': true } },
			{ text: 'Una llave de latón grande como una mano, con la cabeza en forma de puerta. Está colgada de un clavo, a la altura de la cintura, como si alguien la fuera a tomar para abrir algo. Es una réplica: pesa menos de lo que parece.' },
			{ if: 'flag.b07_casa_devuelve', then: [
				{ read: { title: 'Cartela · La Séptima', text: '**RÉPLICA DE LA LLAVE DE LA SÉPTIMA PUERTA**\nEnviada por Ottilie Brack, desde la Casa de las Siete Puertas (Pueblo Plié).\n\nEn una casa-cuento con siete puertas entraron ocho personas y se contaron siete. La llave del final desapareció a oscuras. Volvió a su sitio de las manos de quien se la llevó, que se quedó con lo que era suyo.\n\nNota de Ottilie: «La Casa ha vuelto a abrir. Le he puesto un cartel a la Puerta Sexta: "Esta también se usa". Gracias por contar bien. —O. B.»' } },
			] },
			{ if: 'flag.b07_casa_lectura', then: [
				{ read: { title: 'Cartela · La Séptima', text: '**RÉPLICA DE LA LLAVE DE LA SÉPTIMA PUERTA**\nEnviada por Maren, desde Pueblo Plié. El sobre huele a musgo.\n\nEn una casa-cuento con siete puertas entraron ocho personas y se contaron siete. La llave del final desapareció a oscuras. Ahora abre la Séptima una vez al mes, la Noche del Final, y alguien lee en voz alta un cuento que no estaba en ningún libro.\n\nNota de Maren, muy corta: «El escalón sigue crujiendo. Lo salto. Ven un día a escuchar. —M.»' } },
			] },
			{ if: 'flag.b07_casa_quintana', then: [
				{ read: { title: 'Cartela · La Séptima', text: '**RÉPLICA DE LA LLAVE DE LA SÉPTIMA PUERTA**\nEnviada por Ottilie Brack, desde la Casa de las Siete Puertas (Pueblo Plié).\n\nEn una casa-cuento con siete puertas entraron ocho personas y se contaron siete. La llave del final desapareció a oscuras. El caso se cerró por escrito, con firma y sello. La Casa volvió a abrir, sin final.\n\nNota de Ottilie: «La aseguradora pagó. La Casa funciona. Al llegar a la Séptima la gente se queda un rato quieta, esperando algo. Les digo que el final es salir. Nadie se lo cree. —O. B.»' } },
			] },
			{ if: 'flag.b07_casa_fallido', then: [
				{ read: { title: 'Cartela · La Séptima', text: '**RÉPLICA DE LA LLAVE DE LA SÉPTIMA PUERTA**\nEnviada por Ottilie Brack, desde la Casa de las Siete Puertas (Pueblo Plié).\n\nEn una casa-cuento con siete puertas entraron ocho personas y se contaron siete. Nadie supo decir quién era la octava. Una mañana la llave apareció en un buzón, con una nota sin firma: «Perdón por las tres semanas».\n\nNota de Ottilie: «Le hice una copia a la nota también. Está en el cajón de la recepción. No sé quién fue, pero escribe bonito. —O. B.»' } },
			] },
			{ say: 'philippe', text: 'Una llave para una puerta que no está aquí. —La descuelga, la mira, la vuelve a colgar—. Es la pieza más honesta de la sala: no abre nada y no lo disimula.' },
		],

		// =================== PIEZA NUEVA · ALOLA (B7) ===================
		museo_estribo: [
			{ set: { 'flag.museo_v_estribo': true } },
			{ text: 'Un estribo de madera de koa del tamaño de una taza, tallado a mano, con una tira de cuero de verdad. Philippe lo ha colgado al lado de la herradura pequeña, a la misma altura, para que se vean las dos a la vez.' },
			{ read: { title: 'Cartela · Lo que crece', text: '**UN ESTRIBO DE KOA, EN MINIATURA**\nEnviado por Kalena, capataza del Rancho Ohana (Akala).\n\nEn un rancho de Mudsdale, un Mudbray llevaba años sin crecer porque cada mañana se agachaba para que alguien muy mayor pudiera subirse. Un martes, antes del sol, el señor se puso el estribo él solo. Esa tarde, el Mudbray ya no cabía en la foto.\n\nNota de Kalena: «Lo talló mi padre con lo que sobró del grande. Tardó una semana. Dice que no es para tanto. Ya sabes cómo es. —Ka.»' } },
			{ say: 'philippe', text: 'La herradura y el estribo. Antes y después. —Se cruza de brazos, contento—. Las dos piezas más pequeñas de Alola. Ya ni me sorprende: en este museo, lo pequeño es lo que más pesa.' },
		],
	},
};
