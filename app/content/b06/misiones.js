// Misiones del Bloque 6 (las grandes). Los tramos las avanzan con sus etapas exactas (b06-encargo.md).
// Regla (2026-10-10): cada parte de un hilo es su propia misión y se cierra al terminar su parte.
// Los textos se ven en el Diario: sin spoilers, ≤ 240 caracteres, con un lugar o personaje de ancla.
export default {
	// ⭐ Principales
	b06_m1: { name: 'Rumbo a Teselia', type: 'main', est: 60, stages: {
		puerta: 'La Gira sigue en **Teselia**. Se cruza por cualquier **Puerta Lemnis**: la de Alola, en **Ciudad Hauoli**, o las de Azafrán, Luminalia y Trigal.',
		porcelana: 'Ya estás en **Ciudad Porcelana**. La recepción de la Gira es junto al muelle, entre rascacielos.',
		hecha: 'Llegaste a Teselia. Porcelana no duerme, huele a café y a mar, y {riolu} sigue mirando la Pokédex de reojo.',
	} },
	b06_m2: { name: 'Luces de Mayólica', type: 'main', est: 110, stages: {
		mayolica: 'Cruza la **Ruta 4**, al borde del desierto, hasta **Ciudad Mayólica**.',
		gimnasio: 'La líder **Camila** te espera en el **Gimnasio de Mayólica**. Tipo Eléctrico.',
		hecha: 'Tienes la Medalla Voltio y el Pase de la Gira. El tren ya te lleva más lejos.',
	} },
	b06_m3: { name: 'Lo que late a destiempo', type: 'main', est: 160, stages: {
		esmalte: 'Desde **Mayólica**, cruza el **Bosque Azulejo** y el **Puente Saeta** hasta **Ciudad Esmalte**. Dicen que en su **Museo** hay un reloj que se para.',
		cabina: 'Algo ha aterrizado en el patio del **Museo de Esmalte**. **Ulises** y **Petra** te esperan.',
		valle: 'Al otro lado de la cabina hay un valle que no sale en ningún mapa. Algo pequeño se ha asustado allí.',
		hecha: 'El tictac vuelve a ir a compás. El valle sigue ahí, para cuando quieras volver.',
	} },
	b06_m4: { name: 'El frío de Fayenza', type: 'main', est: 130, stages: {
		fayenza: 'El puente ya está bajado. Sigue la **Ruta 5** y el **Puente de Fayenza** hasta **Ciudad Fayenza**: **Brock** dirige allí el gimnasio.',
		almacen: '**Handsome** quiere que mires los **Almacenes Frigoríficos**, al sur de **Fayenza**. Abrígate.',
		hecha: 'Saliste del frío con alguien que no esperabas encontrar. Y con un plan en papel.',
	} },
	b06_m5: { name: 'La voz del narrador', type: 'main', est: 170, stages: {
		tejados: 'De noche, en **Ciudad Porcelana**. **Ysolde** te espera arriba, en los **tejados**.',
		revelacion: '**Renata** te espera en el estudio de **Casos Fríos** al amanecer. Quiere exponer un caso. Lleva a {riolu}.',
		dragospiral: 'Sigue la **Ruta 6** (o vuela) hasta **Ciudad Teja** y sube a la **Torre Dragospiral** antes de que sea tarde.',
		hecha: 'La torre está en silencio. La Gira ya mira hacia otra región.',
	} },

	// 🧵 Hilos
	b06_t_renata: { name: 'Casos Fríos: el ingeniero', type: 'thread', est: 40, stages: {
		olmedo: 'El caso de toda la vida de **Renata**: un ingeniero de la primera Puerta que no volvió a casa. Sigue con la Gira por **Teselia**; ella te avisará.',
		hecha: 'Renata cerró su caso más viejo. No lo emitió esa semana.',
	} },
	b06_t_apuntador: { name: 'Desde la concha', type: 'thread', est: 40, stages: {
		noria: 'Una carta firmada «Desde la concha» te cita en la **noria de Ciudad Mayólica**. Sabe lo que dijiste en antena.',
		espera: 'El Apuntador volverá a escribir. Sigue con lo tuyo.',
		trampa: '**Renata** tiene un plan, escrito en papel. Se resuelve de noche, en **Ciudad Porcelana**.',
		segundo: 'El segundo acto, en otra región.',
	} },
	b06_t_ulises: { name: 'La cabina azul (V)', type: 'thread', stages: {
		cabina: '**Ulises** ha aterrizado en el patio del **Museo de Esmalte**. Busca algo pequeñito que late a destiempo.',
		hecha: 'Ulises volverá cuando el pequeño crezca. Dejó la llave puesta.',
	} },
	b06_t_petra: { name: 'El ámbar sin registro (V)', type: 'thread', stages: {
		museo: '**Petra** está en el **Museo de Esmalte**, siguiendo a un primo de su ámbar. Probablemente dentro de una vitrina.',
		hecha: 'El ámbar ya tiene registro. Petra lo apuntó con letra temblorosa.',
	} },
	b06_t_vencejos: { name: 'Plumas en el tejado (V)', type: 'thread', stages: {
		operacion: '**Ysolde** prepara una operación sobre los tejados de **Ciudad Porcelana**. De noche. Lleva tu Pluma gris.',
		hecha: 'Los Vencejos te cuentan entre los suyos un poco más arriba.',
	} },
	b06_t_camille: { name: 'El saque', type: 'thread', est: 20, stages: {
		estadio: '**Camille** juega el torneo juvenil de voleibol en el **estadio de Ciudad Mayólica**.',
		hecha: 'A Camille ya le sale el saque.',
	} },
	b06_t_bastien: { name: 'Letra pequeña (VI)', type: 'thread', est: 15, stages: {
		metro: '**Bastien** se gana la vida en el **Metro Batalla** de **Ciudad Mayólica**. Sin Lemnis.',
		almacen: '**Bastien** sigue con su contrato. Su nombre sale en los papeles de los **Almacenes Frigoríficos** de **Fayenza**.',
		hecha: 'Bastien decidió qué hacer con su firma. Esta vez, del todo.',
	} },
	b06_t_kaori: { name: 'Dulce veneno (V)', type: 'thread', est: 15, stages: {
		almacen: '**Kaori** está en los **Almacenes Frigoríficos** de **Fayenza**, siguiendo un lote de caramelos.',
		hecha: 'El antídoto da otro paso. Kaori lo apunta con frío en los dedos.',
	} },
	b06_t_noa: { name: 'Las jaulas (VI)', type: 'thread', stages: {
		buzon: 'Ha llegado un mensaje sin firma al buzón de **Casos Fríos**. **Renata** quiere que lo escuches.',
		hecha: 'Reconociste la voz. Renata no. Por ahora.',
	} },

	// 📜 Secundarias
	b06_s_iniciales: { name: 'Los tres de Teselia', type: 'side', est: 60, stages: {
		buscar: 'Hay tres Pokémon de Teselia que todavía no tienen con quién ir: en **Porcelana**, en **Mayólica** y en **Esmalte**.',
		hecha: 'Los tres de Teselia encontraron con quién ir.',
	},
	parts: { title: 'Los tres de Teselia', items: [
		{ label: 'Oshawott', where: 'muelle_porcelana', done: 'flag.b06_oshawott', hint: 'Uno ha perdido algo en el **muelle de Porcelana**. Algo que se lleva en la barriga.' },
		{ label: 'Tepig', where: 'musical_mayolica', done: 'flag.b06_tepig', hint: 'En el **Musical de Mayólica** alguien estornuda brasas sobre los trajes.' },
		{ label: 'Snivy', where: 'museo_esmalte', done: 'flag.b06_snivy', hint: 'La **Prof. Encina** tiene uno en el **Museo de Esmalte**. Mira a todos por encima del hombro.' },
	] } },
	b06_s_chamota: { name: 'La Noche Blanca', type: 'side', est: 150, stages: {
		testigos: 'En **Pueblo Chamota** cada vecino recuerda distinto la noche de hace treinta años. Escucha a los cinco.',
		decreto: 'Algo no cuadra con las horas. Busca en el archivo del **ayuntamiento de Chamota**.',
		campanario: 'Las horas ya cuadran. Falta subir al **campanario de Chamota**.',
		hipotesis: '**Renata** quiere tu hipótesis antes de saber la verdad. Llámala desde **Chamota**.',
		verdad: 'Alguien en **Chamota** sabe lo que pasó en la panadería. Habla con **Celia**.',
		hecha: 'Sabes lo que pasó la Noche Blanca. Y decidiste qué hacer con ello.',
	},
	parts: { title: 'Los testigos', items: [
		{ label: 'El campanero', where: 'campanario_chamota', done: 'flag.b06_testigo_campanero', hint: 'Vive al pie del **campanario**. Su padre lo oyó todo.' },
		{ label: 'Don Teodoro', where: 'chamota', done: 'flag.b06_testigo_teodoro', hint: 'El cronista del pueblo. Escribió lo que vio a la mañana siguiente.' },
		{ label: 'Celia', where: 'panaderia_chamota', done: 'flag.b06_testigo_celia', hint: 'La panadera. La panadería ardió aquella noche.' },
		{ label: 'Inés', where: 'chamota', done: 'flag.b06_testigo_ines', hint: 'La cartera. Tenía ocho años y pasó la noche fuera de casa.' },
		{ label: 'La alcaldesa', where: 'ayuntamiento_chamota', done: 'flag.b06_testigo_alcaldesa', hint: 'En el **ayuntamiento**. Nadie le hace caso.' },
	] } },
	b06_s_larvesta: { name: 'Arena caliente', type: 'side', est: 30, stages: {
		huevo: 'Hay un huevo en la arena caliente de las **Ruinas del desierto**, junto a la **Ruta 4**. Alguien lo incuba.',
		hecha: 'El huevo ya no es un huevo.',
	} },
};
