// NPCs nuevos del Bloque 7 (Galar). Los de bloques anteriores siguen disponibles con sus ids
// (rhi, nate, renata, nico_ferrer, tia_rosa, tadeo, lola, bastien, kaori, xero, noa, lucien, handsome, magda,
// quintana, gaspar, philippe, mireille, odile, camille, az, ansel, sera, lila, leilani, petra…).
// Nombres canon comprobados en WikiDex (2026-10-30): Percy, Roy, Nerio, Naboru, Sally, Lionel, Olivia, Sonia.
// Magnolia: comprobar antes de publicar (se usa el nombre inglés, que es el de España salvo error).
export default {
	// ---------- Canon ----------
	sonia: { name: 'Sonia', title: 'Investigadora de Galar', sprite: 'sonia', look: { hair: 'ponytail', hairColor: '#c4743a', outfit: '#3aa3a0', outfit2: '#e9e8e0', skin: 1, eyes: '#3a8a6a', eyesStyle: 'happy', mouth: 'grin', brows: 'soft', nose: 'dot', head: 'oval', build: 'narrow', collar: 'coat', acc: 'earrings' } },
	magnolia: { name: 'Prof. Magnolia', title: 'Profesora de Galar', sprite: 'magnolia', look: { hair: 'bun', hairColor: '#e9e8e0', outfit: '#5a3a5a', outfit2: '#e9e3d0', skin: 1, eyes: '#5a6a7a', eyesStyle: 'sleepy', mouth: 'smile', brows: 'thin', nose: 'hook', head: 'oval', build: 'narrow', age: 'old', collar: 'cardigan', acc: 'glasses earrings' } },
	percy: { name: 'Percy', title: 'Líder de Pueblo Hoyuelo (Planta)', sprite: 'milo', look: { hair: 'short', hairColor: '#e9d27a', outfit: '#5aa36b', outfit2: '#e9e3d0', skin: 1, eyes: '#5a8a3a', eyesStyle: 'happy', mouth: 'grin', brows: 'soft', nose: 'button', head: 'round', build: 'broad', collar: 'tshirt', acc: 'blush' } },
	roy: { name: 'Roy', title: 'Líder de Ciudad Artejo (Dragón)', sprite: 'raihan', look: { hair: 'cap', hairColor: '#2a2420', outfit: '#3a3a4a', outfit2: '#e98a3a', skin: 4, eyes: '#3a8ac4', eyesStyle: 'sharp', mouth: 'smirk', brows: 'straight', nose: 'l', head: 'long', build: 'normal', collar: 'hoodie', acc: 'headband' } },
	nerio: { name: 'Nerio', title: 'Líder de Pueblo Crampón (Siniestro)', sprite: 'piers', look: { hair: 'long', hairColor: '#e9e8e0', streak: '#2a2420', outfit: '#2a2420', outfit2: '#c43a7a', skin: 1, eyes: '#5a6a7a', eyesStyle: 'tired', mouth: 'flat', brows: 'sad', nose: 'l', head: 'long', build: 'narrow', collar: 'jacket' } },
	naboru: { name: 'Naboru', title: 'Líder de Ciudad Pistón (Fuego)', sprite: 'kabu', look: { hair: 'short', hairColor: '#9aa0a8', outfit: '#e9e8e0', outfit2: '#c43a3a', skin: 2, eyes: '#4a3a2a', eyesStyle: 'narrow', mouth: 'flat', brows: 'straight', nose: 'dot', head: 'square', build: 'narrow', age: 'old', collar: 'shirt', acc: 'headband' } },
	sally: { name: 'Sally', title: 'Líder de Pueblo Plié (Hada)', sprite: 'opal', look: { hair: 'bun', hairColor: '#cfcac0', outfit: '#8a3a8a', outfit2: '#f2c84a', skin: 1, eyes: '#8a5aa8', eyesStyle: 'sleepy', mouth: 'smirk', brows: 'thin', nose: 'hook', head: 'oval', build: 'narrow', age: 'old', collar: 'cape', acc: 'hat lipstick', hatColor: '#8a3a8a' } },
	lionel: { name: 'Lionel', title: 'Campeón de Galar', sprite: 'leon', look: { hair: 'long', hairColor: '#4a2a5a', outfit: '#c43a3a', outfit2: '#f2c84a', skin: 3, eyes: '#c4a43a', eyesStyle: 'big', mouth: 'grin', brows: 'thick', nose: 'button', head: 'oval', build: 'broad', collar: 'cape', acc: 'cap', capColor: '#2a2420' } },
	// Olivia (canon): ex secretaria del presidente Rose; dirige el remanente de Macrocosmos (biblia §3.4: «ex-Macro Cosmos»).
	olivia_mc: { name: 'Olivia', title: 'Ex directiva de Macrocosmos', sprite: 'oleana', look: { hair: 'long', hairColor: '#e9e8e0', outfit: '#2b2b38', outfit2: '#3aa3a0', skin: 1, eyes: '#3a5a6a', eyesStyle: 'narrow', mouth: 'lips', brows: 'thin', nose: 'dot', head: 'heart', build: 'narrow', collar: 'jacket', acc: 'lipstick earrings' } },

	// ---------- Originales ----------
	// Octavia Lemnis (52), presidenta de Lemnis. Primera aparición en persona. Brief: melena corta plateada, cortada a cuchillo ·
	// traje blanco roto con el broche de la lemniscata en la solapa · mirada recta, ojeras que no tapa.
	octavia: { name: 'Octavia Lemnis', title: 'Presidenta de Lemnis', look: { hair: 'bob', hairColor: '#cfd4dc', outfit: '#e9e8e0', outfit2: '#3b5bb5', skin: 1, eyes: '#5a6a7a', eyesStyle: 'tired', mouth: 'flat', brows: 'straight', nose: 'l', head: 'heart', build: 'narrow', age: 'adult', collar: 'jacket', acc: 'earrings' } },
	// Gareth Hargreave (~55), padre de Rhi: ex entrenador, veinte años cuidando el césped del Estadio de Hoyuelo; despedido (B3).
	// Brief: pelo rojo apagado con entradas · bigote ancho y manos de jardinero · chaleco acolchado verde sobre camisa de cuadros.
	padre_rhi: { name: 'Gareth Hargreave', title: 'Padre de Rhi', look: { hair: 'balding', hairColor: '#a4543a', outfit: '#3a6a4a', outfit2: '#c9a66b', skin: 1, eyes: '#3f8a4f', eyesStyle: 'droopy', mouth: 'smile', brows: 'thick', nose: 'button', head: 'square', build: 'broad', age: 'adult', collar: 'vest', acc: 'mustache' } },
	// Priya Lal (~40), maestra del curri de Pistón (Liga de los Siete Oficios) y rival de cocina de Gaspar en Galar.
	// Brief: moño alto con un lápiz clavado · delantal naranja con manchas de cúrcuma · sonrisa de quien ya sabe que ganará.
	priya: { name: 'Priya Lal', title: 'Maestra del curri de Pistón', look: { hair: 'bun', hairColor: '#2a2420', outfit: '#e98a3a', outfit2: '#f2c84a', skin: 3, eyes: '#4a3a2a', eyesStyle: 'almond', mouth: 'grin', brows: 'thick', nose: 'button', head: 'oval', build: 'normal', collar: 'apron', acc: 'earrings blush' } },
	// Agnes Tull (~60), guardagujas mayor de la estación de Pistón (Siete Oficios). Lleva los horarios de todo Galar en la cabeza.
	// Brief: gorra de ferroviaria sobre pelo gris corto · gafas de cerca colgadas de una cadena · chaqueta azul con silbato al cuello.
	agnes: { name: 'Agnes Tull', title: 'Guardagujas de Pistón', look: { hair: 'short', hairColor: '#9aa0a8', outfit: '#2b3f84', outfit2: '#f2c84a', skin: 2, eyes: '#4a3a2a', eyesStyle: 'narrow', mouth: 'flat', brows: 'skeptic', nose: 'hook', head: 'square', build: 'normal', age: 'old', collar: 'jacket', acc: 'cap glasses', capColor: '#2b3f84' } },
	// Ottilie Brack (~50), dueña y anfitriona de la Casa de las Siete Puertas (Plié). La compró hace diez años con todo lo que tenía.
	// Brief: rizos negros con canas en un pañuelo morado · farolillo siempre en la mano · capa gris de la casa, demasiado larga.
	ottilie: { name: 'Ottilie Brack', title: 'Anfitriona de la Casa de las Siete Puertas', look: { hair: 'curly', hairColor: '#3a2a2a', outfit: '#6a6a7a', outfit2: '#8a3a8a', skin: 2, eyes: '#5a3a26', eyesStyle: 'wide', mouth: 'open', brows: 'sad', nose: 'hook', head: 'round', build: 'normal', collar: 'cape', acc: 'bandana earrings' } },
	// Maren Vane (~30), recolectora de setas del Bosque Lumirinto. Brief: trenza castaña bajo un gorro de lana con setas bordadas ·
	// pecas y uñas negras de tierra · botas claveteadas de recolectora y cesta a la espalda.
	maren: { name: 'Maren', title: 'Recolectora de setas', look: { hair: 'braids', hairColor: '#6b4a2b', outfit: '#5a6a3a', outfit2: '#c9a66b', skin: 1, eyes: '#5a6a3a', eyesStyle: 'almond', mouth: 'flat', brows: 'straight', nose: 'dot', head: 'heart', build: 'narrow', collar: 'cardigan', acc: 'beanie freckles', capColor: '#8a3a3a' } },

	// ---------- Genéricos ----------
	vecino_galar: { name: 'Vecino', generic: true, look: { hair: 'short', hairColor: '#6b4a2b', outfit: '#5a6a7a', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'normal', mouth: 'smile', collar: 'jacket', acc: 'beanie', capColor: '#3a6a4a' } },
	hincha_yell: { name: 'Hincha del Team Yell', generic: true, look: { hair: 'wild', hairColor: '#2a2420', outfit: '#2a2420', outfit2: '#c43a7a', skin: 1, eyesStyle: 'sharp', mouth: 'grin', collar: 'jacket', acc: 'scar' } },
	seguridad_macro: { name: 'Seguridad de Macrocosmos', generic: true, look: { hair: 'buzz', hairColor: '#2a2420', outfit: '#2b2b38', outfit2: '#3aa3a0', skin: 2, eyesStyle: 'narrow', mouth: 'flat', build: 'broad', collar: 'jacket', acc: 'squareglasses' } },
	minero_galar: { name: 'Minero', generic: true, look: { hair: 'cap', hairColor: '#3a2a1e', outfit: '#8a6448', outfit2: '#f2c84a', skin: 2, eyesStyle: 'tired', mouth: 'flat', build: 'broad', collar: 'vest', acc: 'stubble' } },
	maestro_oficio: { name: 'Maestro', generic: true, look: { hair: 'short', hairColor: '#4a3a2a', outfit: '#8a5a2f', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'narrow', mouth: 'flat', brows: 'thick', collar: 'apron' } },
	exvillano: { name: 'Exrecluta', generic: true, look: { hair: 'slick', hairColor: '#2a2420', outfit: '#3a3a4a', outfit2: '#8a2f3a', skin: 2, eyesStyle: 'tired', mouth: 'smirk', collar: 'jacket', acc: 'scar stubble' } },
	viajero_casa: { name: 'Visitante', generic: true, look: { hair: 'curly', hairColor: '#6b4a2b', outfit: '#6a6a7a', outfit2: '#e9e3d0', skin: 2, eyesStyle: 'wide', mouth: 'open', collar: 'cape', acc: 'hood' } },
};
