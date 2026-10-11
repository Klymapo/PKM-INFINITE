// Misiones del Bloque 5 (las grandes). Los tramos las avanzan con sus etapas exactas.
// Regla (2026-10-10): cada parte de un hilo es su propia misión y se cierra al terminar su parte.
export default {
	// ⭐ Principales
	b05_m1: { name: 'Rumbo a Alola', type: 'main', est: 40, stages: {
		puerta: 'La Gira cruza a Alola por la **Puerta Lemnis de Kanto**, en **Ciudad Azafrán**.',
		hauoli: 'Ya estás en **Ciudad Hauoli**. La recepción de la Gira es en el **Paseo Marítimo**.',
		hecha: 'Llegaste a Alola. Hace calor, huele a sal y Rotom quiere probar una malasada.',
	} },
	b05_m2: { name: 'El recorrido de Melemele', type: 'main', est: 140, stages: {
		lilii: 'Sube por la **Ruta 1** hasta **Pueblo Lilii** y preséntate al kahuna **Kaudan**.',
		prueba: 'Supera la prueba del capitán **Liam** en la **Cueva Sotobosque**, al final de la **Ruta 2**.',
		gran: 'Vuelve a **Pueblo Lilii**: te espera la **Gran Prueba** de Kaudan.',
		hecha: 'Superaste el recorrido de Melemele. Tu Pulsera Z ya tiene trabajo.',
	} },
	b05_m3: { name: 'El recorrido de Akala', type: 'main', est: 210, stages: {
		kantai: 'Toma el ferry del puerto de **Ciudad Hauoli** a **Ciudad Kantai**, en Akala. Leilani te dijo que la buscaras.',
		pruebas: 'Supera las pruebas de **Nereida** (Colina Saltagua, pasada la **Ruta 5**) y de **Kiawe** (Área Volcánica del Wela, desde la **Ruta 8**).',
		gran: 'Ve a **Ciudad Konikoni** y a las **Ruinas de la Vida**: la Gran Prueba de la kahuna **Mayla**.',
		hecha: 'Superaste el recorrido de Akala.',
	} },
	b05_m4: { name: 'Paraíso Æther', type: 'main', est: 180, stages: {
		invitacion: 'La Fundación Æther te invita. El barco sale del puerto de **Ciudad Kantai**.',
		dentro: 'Averigua qué guarda Lemnis en el **Paraíso Æther**.',
		hecha: 'Saliste del Paraíso Æther con más preguntas que respuestas. Y con un barco a Poni.',
	} },
	b05_m5: { name: 'La luz robada', type: 'main', est: 150, stages: {
		poni: 'Toma el barco a **Isla Poni**. La kahuna **Hela** vive en la **Aldea Marina**.',
		canon: 'Cruza el **Cañón de Poni** hasta el **Altar del Sol y de la Luna**.',
		altar: 'Alguien te espera en el Altar. Y algo que no debería estar atado.',
		hecha: 'El cielo de Alola ya no se apaga a media tarde.',
	} },

	// 🧵 Hilos
	b05_t_leilani: { name: 'Lo que se construye', type: 'thread', stages: {
		taller: 'Leilani te dijo que la buscaras en su taller de **Ciudad Kantai**.',
		lapras: 'Leilani necesita probar su invento con un Pokémon de verdad. Algo pasa en la **Colina Saltagua**.',
		hecha: 'El Ride Gear Universal funciona. Más o menos. Bastante. Funciona.',
	} },
	b05_t_malia: { name: 'La que cruzó', type: 'thread', stages: {
		carta: 'Leilani te enseñó algo de su madre. Pregunta en el **Centro de Investigaciones Dimensionales** de **Ciudad Kantai**.',
		hecha: 'Sabes un poco más de Malia Kahale. Lo demás está al otro lado.',
	} },
	b05_t_noa: { name: 'Las jaulas (V)', type: 'thread', stages: {
		jaulas: 'En la **zona de conservación** del **Paraíso Æther** hay jaulas con etiquetas que conoces.',
		hecha: 'Encontraste lo que Noa dejó escrito. Esta vez lo dijo en serio.',
	} },
	b05_t_kaori: { name: 'Dulce veneno (IV)', type: 'thread', stages: {
		aether: 'Kaori está en los laboratorios del **Paraíso Æther**.',
		hecha: 'El antídoto da otro paso. Todavía no cura.',
	} },
	b05_t_bastien: { name: 'Letra pequeña (V)', type: 'thread', stages: {
		aether: 'Bastien está en el **Paraíso Æther**, por contrato. Quiere que leas algo con él.',
		hecha: 'Bastien decidió qué hacer con su contrato.',
	} },

	// 📜 Secundarias
	b05_s_iniciales: { name: 'Los tres de Alola', type: 'side', est: 60, stages: {
		buscar: 'Hay tres Pokémon de Alola que todavía no tienen con quién ir.',
		hecha: 'Los tres de Alola encontraron con quién ir.',
	},
	parts: { title: 'Los tres de Alola', items: [
		{ label: 'Litten', where: 'lab_kukui', done: 'flag.b05_litten', hint: 'En el laboratorio del Prof. Kukui, en **Ciudad Hauoli**.' },
		{ label: 'Popplio', where: 'colina_saltagua', done: 'flag.b05_popplio', hint: 'La capitana **Nereida** cuida de uno en la **Colina Saltagua**.' },
		{ label: 'Rowlet', where: 'aldea_marina', done: 'flag.b05_rowlet', hint: 'Dicen que en **Isla Poni** hay uno que no baja de un tejado.' },
	] } },
	b05_s_tyranitarita: { name: 'Presión y paciencia', type: 'side', est: 40, stages: {
		joyeria: 'La kahuna **Mayla** tiene una joyería en **Ciudad Konikoni**. Quiere ver a tu Pupitar.',
		hecha: 'Tienes la Tyranitarita. La talló la paciencia de tu Pokémon.',
	} },
};
