// Sinergias dinámicas (pedido de Mario, 2026-10-30). Motor en app/js/negocios.js (suministro, cadenas, pedidos e
// imprevistos compartidos); mapa de la red en Más › Negocios › Plantilla.
//   · La Botica de Kaori entra en la red: recibe leche del Rancho Prado (ungüentos) y manda bayas medicinales al
//     botiquín del rancho y al fogón de la Fonda de Gaspar.
//   · Pedidos entre encargados: con la voz de quien pide; si lo sirves, un empujón de unos días. Si no, nada grave.
//   · Imprevistos compartidos entre encargados que tienen historia (Adela y Kaori, Héctor y Matière, Handsome y Matière,
//     Gaspar y Adela, Alexia y Renata). El efecto llega a los dos negocios.
// Nada imprime dinero: el suministro sale de la producción del proveedor y los empujones son temporales.

export default {
	ventures: {
		b06_botica: { synergy: [
			{ from: 'p7_rancho', line: 'leche', min: 10, mult: { rebotica: 1.15, mostrador: 1.05 }, label: 'Leche del Rancho Prado',
				desc: 'Kaori hace ungüentos con leche de Miltank. Dice que la de Adela «tiene carácter», y no lo dice como un cumplido ni como lo contrario.' },
		] },
		p7_rancho: { synergy: [
			{ from: 'b06_botica', line: 'huerto', min: 10, mult: { consulta: 1.15 }, label: 'Bayas de la Botica de Iris',
				desc: 'Adela cura los picores de los Mareep con bayas Meloc de la botica. Kaori le manda las que salen feas «para que no se desperdicien».' },
		] },
		p10_cafe: { synergy: [
			{ from: 'b06_botica', line: 'huerto', min: 10, mult: { fogon: 1.15 }, label: 'Bayas medicinales para el fogón',
				desc: 'Gaspar descubrió que una baya Zreza en el caldo «despierta al muerto». Kaori dice que no es para eso. Gaspar sigue haciéndolo.' },
		] },
	},

	pedidos: [
		{ id: 'ped_gaspar_leche', to: 'p10_cafe', from: 'p7_rancho', npc: 'gaspar', item: 'moomoomilk', n: 3, boost: { mult: { mostrador: 1.25 }, days: 2 },
			text: 'Gaspar: «Me he quedado sin leche para la masa. Tres botellas del rancho y te hago malasadas que te hacen llorar. Comer bien es la mitad de la aventura; la otra mitad es tener leche.»',
			thanks: 'Gaspar: «¡Eso es leche! Huele a pasto y a madrugón. Hoy las malasadas suben solas.»' },
		{ id: 'ped_kaori_leche', to: 'b06_botica', from: 'p7_rancho', npc: 'kaori', item: 'moomoomilk', n: 2, boost: { mult: { rebotica: 1.25 }, days: 2 },
			text: 'Kaori: «Dos botellas de leche del rancho de Adela, por favor. Para un ungüento. No preguntes cuál. Si te lo digo, querrás probarlo, y no es para probarlo.»',
			thanks: 'Kaori: «Gracias. Huele a establo. Bien. El ungüento también olerá a establo. Funcionará igual.»' },
		{ id: 'ped_adela_bayas', to: 'p7_rancho', from: 'b06_botica', npc: 'sobrina', item: 'pechaberry', n: 3, boost: { mult: { consulta: 1.25 }, days: 2 },
			text: 'Adela: «Tres bayas Meloc de la botica. Los Mareep se rascan contra la valla y la están tirando. Si no las tienes, no pasa nada: la valla ya estaba torcida.»',
			thanks: 'Adela: «Gracias. Se las doy machacadas con el pienso. Dejan de rascarse en dos días. La valla sigue torcida.»' },
		{ id: 'ped_gaspar_bayas', to: 'p10_cafe', from: 'b06_botica', npc: 'gaspar', item: 'cheriberry', n: 3, boost: { mult: { fogon: 1.25 }, days: 2 },
			text: 'Gaspar: «Tres bayas Zreza. Tengo una receta de Johto que pica tanto que se oye. La boticaria dice que esas bayas son para la parálisis. Yo digo que también para el caldo.»',
			thanks: 'Gaspar: «¡Ja! Ya pica. Ya se oye. Kaori va a decir que no es para eso. Que lo diga con la boca llena.»' },
		{ id: 'ped_leilani_malasadas', to: 'b05_taller', from: 'p10_cafe', npc: 'leilani', item: 'bigmalasada', n: 2, boost: { mult: { monturas: 1.2, inventos: 1.15 }, days: 2 },
			text: 'Leilani: «Dos malasadas grandes de la fonda. Es combustible de taller. Soldi dice que no necesito azúcar para pensar. Soldi no piensa con azúcar. ¿Sí o qué?»',
			thanks: 'Leilani: «¡Combustible! Ya veo el plano entero. Bueno, medio. El otro medio es la segunda malasada.»' },
		{ id: 'ped_philippe_hueso', to: 'b05_atico', from: 'p7_excavacion', npc: 'philippe', item: 'rarebone', n: 1, boost: { mult: { visitas: 1.25 }, days: 3 },
			text: 'Philippe: «Un Hueso Raro de la cantera para la vitrina del vestíbulo. Con una etiqueta que diga «muy raro». La gente paga más por lo muy raro. Es Phil-osofía básica.»',
			thanks: 'Philippe: «Etiqueta puesta: MUY RARO. Lucien ha añadido «de verdad». Las visitas han subido un cuarenta por ciento. Bueno, tres personas. Pero tres personas muy interesadas.»' },
		{ id: 'ped_alexia_polvo', to: 'p10_periodico', from: 'p10_observatorio', npc: 'alexia', item: 'stardust', n: 2, boost: { mult: { fauna: 1.2, cronica: 1.1 }, days: 2 },
			text: 'Alexia: «Dos saquitos de Polvo Estelar del observatorio. Para la foto de portada: lo esparces delante del flash y parece que nieva luz. Un truco viejo. Funciona siempre.»',
			thanks: 'Alexia: «¡Mira esta portada! Nieva luz. Mi hermana dirá que es efectista. Mi hermana tiene razón y la portada se va a vender igual.»' },
		{ id: 'ped_renata_zumo', to: 'b06_estudio', from: 'p7_castillo', npc: 'renata', item: 'berryjuice', n: 2, boost: { mult: { episodios: 1.2 }, days: 2 },
			text: 'Renata: «Dos zumos de baya de la bodega del castillo, por favor. Para la voz. Grabamos un episodio largo y Nico dice que a la tercera hora sueno como una puerta.»',
			thanks: 'Renata: «Gracias. Ya no sueno como una puerta. Sueno como una puerta bien engrasada. Es una mejora.»' },
		{ id: 'ped_conde_hierbas', to: 'p7_castillo', from: 'b06_botica', npc: 'conde', item: 'energypowder', n: 2, boost: { mult: { terror: 1.25 }, days: 2 },
			text: 'El Conde: «Dos sobres de Polvo Energía de esa botica de Johto. Para el ponche de la noche de terror. Amargo. Muy amargo. Como debe saber el miedo.»',
			thanks: 'El Conde: «Exquisito. Los visitantes hacen muecas. Una mueca es un grito que no se atreve. Me encanta.»' },
	],

	sharedEvents: [
		{ id: 'sh_adela_kaori', ventures: ['p7_rancho', 'b06_botica'], managers: { p7_rancho: 'sobrina', b06_botica: 'kaori' }, npc: 'sobrina', name: 'Un Miltank con cólico', w: 2,
			text: 'Adela: «Tengo un Miltank con cólico y he llamado a la botica. La boticaria me ha dicho por teléfono tres cosas que yo ya sabía y una que no. Quiere venir a verlo. Dice que «se aprende más de un establo que de un libro». Ya me cae bien.»',
			options: [
				{ text: 'Pagarle el tren a Kaori', cost: 1500, result: 'Kaori llega al rancho con un maletín y sin paraguas. Pasa la noche en el establo. Por la mañana el Miltank come y Adela le ofrece café, que en Adela es casi un abrazo.', effect: { boost: { mult: { leche: 1.2, rebotica: 1.2 }, days: 3, label: 'Saber de establo' } } },
				{ text: '«Que se lo expliquen por teléfono.»', result: 'Una hora de llamada. Adela apunta, Kaori dicta. El Miltank mejora. Ninguna de las dos lo admitirá, pero han quedado en llamarse el mes que viene.', effect: { happy: 6 } },
			] },
		{ id: 'sh_hector_matiere', ventures: ['p7_castillo', 'p10_periodico'], managers: { p7_castillo: 'hector', p10_periodico: 'matiere' }, npc: 'hector', name: 'Héroe en portada', w: 2,
			text: 'Héctor: «¡La Gaceta quiere hacer un reportaje del castillo! ¡Y lo firma Matière! ¡LA Matière! ¿Me pongo el traje? Me pongo el traje. No me pongo el traje. ¿Qué hago con las manos?»',
			options: [
				{ text: '«Ponte el traje.»', result: 'Sale en la foto con el traje, delante de la verja. Matière titula «Un héroe en la taquilla». Héctor compra cuarenta ejemplares. El castillo se llena de curiosos.', effect: { boost: { mult: { visitas: 1.2, cronica: 1.15 }, days: 3, label: 'Héroe en portada' } } },
				{ text: '«Sé tú mismo.»', result: 'Sale sin traje, sonriendo, con un Gastly asomado detrás. Matière dice que es la mejor foto del número. Héctor no sabe si eso es bueno. Lo es.', effect: { happy: 8 } },
			] },
		{ id: 'sh_handsome_matiere', ventures: ['p10_observatorio', 'p10_periodico'], managers: { p10_observatorio: 'handsome', p10_periodico: 'matiere' }, npc: 'handsome', name: 'Un pastel en la redacción', w: 2,
			text: 'Handsome: «Handsome ha cocinado. Un pastel. Para Matière, por su primera portada. Handsome lo ha probado y… —Pausa larga—. Handsome cree que el pastel no estaba listo. O que Handsome no estaba listo para el pastel.»',
			options: [
				{ text: 'Comprar uno en Luminalia y cambiarlos', cost: 900, result: 'Matière recibe un pastel perfecto. Sabe que no lo hizo él. Se lo come entero delante de Handsome y le da las gracias igual. Las dos cosas son verdad.', effect: { boost: { mult: { all: 1.1 }, days: 2, label: 'Pastel de verdad' } } },
				{ text: 'Que se lo lleve tal cual', result: 'Matière prueba un trozo con mucha valentía. Lo guarda en la nevera «para luego». Sigue ahí. Lo enseña a las visitas como prueba de cariño.', effect: { happy: 8 } },
			] },
		{ id: 'sh_gaspar_adela', ventures: ['p10_cafe', 'p7_rancho'], managers: { p10_cafe: 'gaspar', p7_rancho: 'sobrina' }, npc: 'gaspar', name: 'Visita al rancho', w: 2,
			text: 'Gaspar: «¡Quiero conocer a la vaca! Bueno, al Miltank. Al que da la leche de mis malasadas. La sobrina dice que no es una visita turística. Yo digo que comer bien empieza por saber de dónde viene.»',
			options: [
				{ text: 'Pagarle el viaje a Johto', cost: 2000, result: 'Gaspar llega con un delantal y una tarta de agradecimiento. Adela dice que no hacía falta. Se come dos trozos. Gaspar se va con una receta de la abuela de Adela que no ha enseñado nunca a nadie.', effect: { boost: { mult: { mostrador: 1.25, leche: 1.15 }, days: 3, label: 'De dónde viene la leche' } } },
				{ text: '«Escríbele una carta.»', result: 'Gaspar escribe tres páginas sobre la leche. Adela contesta con tres líneas. Gaspar las enmarca.', effect: { happy: 6 } },
			] },
		{ id: 'sh_alexia_renata', ventures: ['p10_periodico', 'b06_estudio'], managers: { p10_periodico: 'alexia', b06_estudio: 'renata' }, npc: 'alexia', name: 'Una exclusiva a medias', w: 2,
			text: 'Alexia: «Renata y yo tenemos la misma historia. La misma. Ella la quiere para el pódcast y yo para la Gaceta. Hemos quedado a tomar un café para decidir quién la da primero. Llevamos tres cafés.»',
			options: [
				{ text: '«Sacadla las dos el mismo día.»', result: 'Sale el mismo día en papel y en audio. Cada una cita a la otra. Los lectores van del periódico al pódcast y del pódcast al periódico. Nadie pierde.', effect: { boost: { mult: { cronica: 1.15, episodios: 1.15 }, days: 3, label: 'Exclusiva compartida' } } },
				{ text: '«Que decida una moneda.»', result: 'Sale cara. Gana Renata. Alexia escribe la segunda parte y es mejor que la primera. Renata lo reconoce en antena.', effect: { happy: 5 } },
			] },
	],
};
