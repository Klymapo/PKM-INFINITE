// Bloque 5 · Tramo 3: «Isla Poni» (final del bloque).
// Barco desde Æther → Aldea Marina (aviso de ritmo; el cielo se apaga a media tarde; Leilani llega por su cuenta)
// → la kahuna Hela (Tapu Koko y los nueve años) → Rowlet en el tejado → Cañón de Poni (Lemnis, rastreo de aura con {riolu},
// la prueba sin capitán: Kommo-o dominante) → Altar del Sol y de la Luna: el Nodo 04 y Necrozma atado (cinemática)
// → Calder Wynn (jefe, Psicostal Z; revancha si pierdes) → la verdad de Calder (la carta de Malia)
// → LA DECISIÓN: a quién devuelves la luz (b05_luz_necrozma / aether / leilani, con cinemática) → Diario («Hoy el sujet…»)
// → la playa al atardecer: Leilani, A.Z., llamada de Renata, la Gira anuncia Teselia → b05_fin.
// Opcional: Gran Prueba de Hela (sello_poni, Geostal Z) tras el Altar; casas-barco (entrenamiento, tope 61).

// ---------- Condiciones reutilizadas ----------
const LUC = 'inParty("riolu") || inParty("lucario")';
const ROWLET_LINEA = 'owns("rowlet") || owns("dartrix") || owns("decidueye")';
const DECIDIDO = '(flag.b05_luz_necrozma || flag.b05_luz_aether || flag.b05_luz_leilani)';
const CARTA = 'has("cartamalia")';
const HELA = 'flag.b05_hela_conocida';

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== ALDEA MARINA ===================
		aldea_marina: {
			name: 'Aldea Marina', short: 'Aldea Marina', region: 'alola', kind: 'town', map: { x: 20, y: 84 },
			bg: { type: 'coast', roofs: ['#3a6a8a', '#c4743a', '#e9c46a'], far: '#5a8aa8', ground: '#c9a66b' },
			desc: 'Un pueblo que no está en tierra: está **en el agua**. Casas-barco de madera amarradas unas a otras con cuerdas gordas, pasarelas que se mueven al andar, ropa tendida de mástil a mástil. El Centro Pokémon es un barco. La tienda es un barco. El restaurante es un barco con un Wailord pintado en el casco.\n\nEn la orilla, la única casa con los pies en la arena: la de la kahuna **Hela**, con su Mudsdale atado a la puerta. Al este, un camino de piedra sube entre acantilados rojos: el **Cañón de Poni**.',
			descNight: 'De noche, las casas-barco crujen al compás de la marea y se encienden farolillos de papel en las proas. Los Wingull duermen en las cuerdas. Desde la orilla, la Aldea parece una ciudad pequeña que flota sin querer ir a ningún sitio.',
			descs: [
				{ cond: 'flag.b05_luz_necrozma', text: 'Las casas-barco de la Aldea Marina se mecen al sol. El cielo de Poni está **entero**: azul de punta a punta, sin apagones, con un brillo que la gente del pueblo mira de reojo, como si temiera gastarlo.\n\nEn la orilla, la casa de la kahuna Hela y su Mudsdale. Al este, el camino del Cañón.' },
				{ cond: 'flag.b05_luz_aether', text: 'Las casas-barco de la Aldea Marina se mecen al sol. El cielo vuelve poco a poco: a media tarde todavía se queda un rato gris, como una lámpara que tarda en calentarse, pero cada día un poco menos.\n\nEn el muelle grande hay amarrada una lancha blanca de la Fundación Æther. En la orilla, la casa de la kahuna Hela. Al este, el camino del Cañón.' },
				{ cond: 'flag.b05_luz_leilani', text: 'Las casas-barco de la Aldea Marina se mecen al sol. El cielo de Poni sigue cansado: a media tarde se apaga un rato, más corto que antes, y la gente sigue parándose a mirarlo. Hela dice que tardará semanas. Lo dice como quien habla de una herida que cierra bien.\n\nEn la orilla, la casa de la kahuna. Al este, el camino del Cañón.' },
			],
			mapNote: 'Kahuna Hela (Tierra) · casas-barco (entrenamiento, tope 61) · pesca · barco a Akala',
			onEnter: [{ script: 'b05_marina_llegada', cond: '!flag.b05_m_aviso', once: true }],
			spots: [
				{ label: 'Centro Pokémon', sub: 'Es un barco. La enfermera se marea un poco', action: { center: true } },
				{ label: 'PC de almacenamiento', sub: 'En la cabina del barco-Centro', action: { pc: true } },
				{ label: 'Barco-tienda', sub: 'Un pesquero reconvertido en tienda', action: { shop: 'tienda_marina' } },
				{ label: 'Hela', sub: 'Cepilla a su Mudsdale delante de su casa', icon: '🐴', new: '!' + HELA + ' || (' + DECIDIDO + ' && !beat("hela_gp"))', talk: [
					{ cond: '!' + HELA, script: 'b05_hela_intro' },
					{ cond: DECIDIDO + ' && !beat("hela_gp")', script: 'b05_hela_gp' },
					{ cond: 'beat("hela_gp")', script: 'b05_hela_despues' },
					{ script: 'b05_hela_espera' },
				] },
				{ label: 'El tejado de la casa de Hela', sub: 'Algo redondo y verde duerme en el borde', icon: '🦉', cond: HELA + ' && !flag.b05_rowlet', new: 'true', talk: [{ script: 'b05_rowlet' }] },
				{ label: 'Rowlet', sub: 'Duerme en el tejado de Hela, como siempre', icon: '🦉', cond: 'flag.b05_rowlet_vive', talk: [{ script: 'b05_rowlet_visita' }] },
				{ label: 'Leilani', sub: 'Revisa una caja de herramientas sentada en una pasarela', icon: '🔧', cond: 'flag.b05_m_aviso && !flag.b05_calder_visto', talk: [{ script: 'b05_leilani_marina' }] },
				{ label: '🌅 La playa, al atardecer', sub: 'Te esperan en la orilla', icon: '🌅', cond: DECIDIDO + ' && !flag.b05_fin', new: 'true', talk: [{ script: 'b05_final' }] },
				{ label: 'Calder Wynn', sub: 'Sentado en el muelle, con el telescopio plegado en las rodillas', icon: '🔭', cond: 'flag.b05_fin', new: '!flag.b05_calder_muelle', talk: [{ cond: '!flag.b05_calder_muelle', script: 'b05_calder_muelle' }, { script: 'b05_calder_muelle_2' }] },
				{ label: 'Las casas-barco', sub: 'Entrenamiento (nivel recomendado 61)', icon: '⛵', action: { training: {
					cap: 61, prize: { wins: 3, script: 'b05_premio_marina' }, trainers: ['marina_1', 'marina_2', 'marina_3'], coach: 'La capitana de la casa-barco grande',
					wild: [{ sp: 'wailord', lv: [58, 60] }, { sp: 'dhelmise', lv: [58, 60] }, { sp: 'gyarados', lv: [58, 60] }, { sp: 'pelipper', lv: [58, 60] }],
					closed: 'La capitana de la casa-barco grande escupe al agua, que es como aplaude ella. «Aquí ya no te queda nadie a quien tirar al mar. Ve a molestar al Cañón, que tiene más sitio».',
				} } },
				{ label: 'Pescar desde la pasarela', sub: 'Las cañas del pueblo se prestan', icon: '🎣', new: '!flag.rec_b05_marina_pesca', action: { gather: 'b05_marina_pesca' } },
				{ label: 'Surcar la bahía con Lapras', sub: 'Montura', icon: '🌊', cond: 'flag.mount_lapras', action: { explore: 'water' } },
				{ label: 'El restaurante del Wailord', sub: 'Huele a pescado y a coco', icon: '🍲', talk: [{ script: 'b05_marina_restaurante' }] },
				{ label: '🛥️ Barco a Akala (Kantai)', sub: 'Una barcaza de la Aldea que hace el viaje dos veces al día', icon: '🛥️', action: { go: 'kantai' } },
			],
			rumors: [
				{ text: 'En la Aldea Marina nadie tiene dirección: tienen barco. Si preguntas por alguien, te dicen el nombre del barco y hacia dónde apunta la proa. Hoy, casi todas apuntan al sur.' },
				{ text: 'La kahuna Hela no vive en un barco. Dice que alguien tiene que quedarse en tierra para saber cuándo se mueve. La gente del pueblo dice que es porque su Mudsdale se marea.' },
				{ cond: '!' + DECIDIDO, text: 'Desde hace unas semanas, a media tarde, el cielo de Poni se apaga. No es una nube: es como si alguien bajara la luz del mundo con un botón. Dura un rato y vuelve. Los Wingull se callan mientras dura.' },
				{ cond: '!' + DECIDIDO, text: 'En el Cañón hay gente de traje y casco desde hace tres semanas. Suben cajas, bajan cajas y no compran pescado. En la Aldea Marina, que no compres pescado está muy mal visto.' },
				{ cond: DECIDIDO, text: 'Dicen que el de las gafas, el del telescopio, se ha quedado en el pueblo por orden de la kahuna. Arregla redes y mira el cielo. No habla casi. Las redes, eso sí, le quedan perfectas.' },
			],
			encounters: {
				water: [
					{ sp: 'wailord', lv: [57, 59], w: 22 },
					{ sp: 'pelipper', lv: [57, 59], w: 20 },
					{ sp: 'gyarados', lv: [57, 59], w: 14 },
					{ sp: 'dhelmise', lv: [57, 59], w: 12 },
					{ sp: 'clawitzer', lv: [57, 59], w: 10 },
					{ sp: 'dragalge', lv: [57, 59], w: 10 },
					{ sp: 'lanturn', lv: [57, 59], w: 8, time: 'night' },
					{ sp: 'relicanth', lv: [58, 60], w: 3 },
					{ sp: 'jellicent', lv: [57, 59], w: 4, displaced: true },
				],
			},
		},

		// =================== CAÑÓN DE PONI ===================
		canon_poni: {
			name: 'Cañón de Poni', short: 'Cañón de Poni', region: 'alola', kind: 'route', map: { x: 30, y: 88 },
			bg: { type: 'mountain', far: '#c4743a', ground: '#8a4a2f', hill: '#a85a3a' },
			desc: 'Un tajo enorme en la roca roja de Poni, tan hondo que el río del fondo se oye pero no se ve. El camino sube por terrazas, cruza grutas y puentes de cuerda, y vuelve a salir al sol entre paredes llenas de capas, como un pastel cortado.\n\nArriba del todo, donde el cañón se acaba en el cielo, está el **Altar del Sol y de la Luna**.',
			descNight: 'De noche, el Cañón de Poni es un pozo de estrellas. Las paredes se vuelven negras, los Carbink brillan en las grietas como luciérnagas de piedra y, desde las cuevas, se oyen los Lycanroc aullándole a una luna que esta noche parece más pequeña.',
			descs: [
				{ cond: 'flag.b05_calder_vencido', text: 'El Cañón de Poni, con su roca roja y sus terrazas. Los cables de Lemnis siguen grapados a las paredes, pero ya no zumban: alguien de la Aldea Marina ha empezado a quitarlos y a usarlos para tender la ropa.\n\nArriba, el Altar del Sol y de la Luna.' },
			],
			links: ['aldea_marina', 'altar_sol_luna'],
			enterCond: HELA,
			blockedMsg: 'Una pescadora de la Aldea con un cubo de calamares te para al pie del camino. «¿Al Cañón? ¿Sin pasar por la kahuna? Ni lo pienses. Hela no manda en el Cañón, pero el Cañón le hace caso. Está en la casa de la orilla, la del Mudsdale».',
			mapNote: 'Camino al Altar · gente de Lemnis · la prueba sin capitán · rastreo de aura',
			rumors: [
				{ text: 'El Cañón de Poni tuvo capitana hace años. Se fue a Kalos a estudiar dragones y no volvió. La prueba se quedó sin nadie, y el dominante sigue esperando a que alguien vaya a verlo. Los de la Aldea dicen que se aburre.' },
				{ text: 'En las paredes del Cañón hay marcas antiguas, de cuando los de la Aldea subían al Altar a pedir buen tiempo. Dicen que las hacían con las manos, y que algunas todavía están calientes.' },
				{ cond: '!flag.b05_calder_vencido', text: 'Los de Lemnis han puesto cables por todo el Cañón, grapados a la roca, que suben hasta el Altar. Zumban a media tarde, justo cuando se apaga el cielo. Una niña de la Aldea dice que suenan como una pajita al final del refresco.' },
			],
			route: {
				from: 'aldea_marina', to: 'altar_sol_luna', length: 8, terrain: 'rocks', rate: 0.2,
				tramos: {
					0: [
						{ text: 'El camino sale de la playa y se mete entre dos paredes de roca roja. A los pocos pasos, el ruido del mar desaparece. Solo queda el viento y, muy abajo, el río.' },
						{ text: 'Grapados a la pared, a la altura de la rodilla, corren dos cables gruesos, negros, con una etiqueta cada diez metros: una lemniscata azul y plata y las letras **N-04**.', cond: '!flag.b05_calder_vencido' },
					],
					1: [
						{ trainer: 'canon_ultra_1' },
						{ item: 'ultraball', n: 3 },
					],
					2: [
						{ text: 'Una terraza ancha, con la pared llena de capas: rojas, ocres, una negra finísima y otra vez rojas. Alguien ha clavado en la roca una placa vieja de metal: «Estación de medición · CID · no tocar». Debajo, rayado con un destornillador, alguien ha añadido: «tocar con cuidado».' },
						{ spot: { action: { gather: 'b05_canon_veta' } }, label: 'La pared de capas', sub: 'Brilla algo entre la roca negra', icon: '⛏️', new: '!flag.rec_b05_canon_veta' },
					],
					3: [
						{ trainer: 'canon_peregrina', optional: true, label: 'Una anciana de la Aldea que sube despacio, con un ramo de flores atado a la espalda' },
						{ item: 'fullrestore', hidden: true },
					],
					4: [
						{ text: 'Una gruta corta que atraviesa la roca. Las paredes están llenas de **marcas de manos**: cientos, de todos los tamaños, en pintura roja que el tiempo ha vuelto marrón. Todas apuntan hacia arriba.' },
						{ talk: [{ cond: '!flag.b05_canon_aura', script: 'b05_canon_aura' }, { script: 'b05_canon_aura_despues' }], label: 'Las marcas de manos de la gruta', sub: '{riolu} no deja de mirarlas', icon: '🔷', cond: LUC, new: '!flag.b05_canon_aura' },
						{ talk: [{ script: 'b05_canon_sin_aura' }], label: 'Las marcas de manos de la gruta', sub: 'Cientos de manos que apuntan hacia arriba', icon: '✋', cond: '!(' + LUC + ')' },
					],
					5: [
						{ trainer: 'canon_ultra_2' },
						{ text: 'El cañón se abre. Desde aquí se ve el mar entero, al sur, y la Aldea Marina como un puñado de cáscaras de nuez. El cielo, a esta hora, tiene un color raro: azul, pero como si le hubieran bajado el brillo.', cond: '!' + DECIDIDO },
						{ text: 'El cañón se abre. Desde aquí se ve el mar entero, al sur, y la Aldea Marina como un puñado de cáscaras de nuez.', cond: DECIDIDO },
						{ item: 'maxrevive', hidden: true },
					],
					6: [
						{ text: 'Un puente de cuerda cruza el cañón de lado a lado. Al otro extremo, una cueva con la entrada marcada por dos colmillos de piedra. Del fondo sale un ruido metálico, rítmico: algo que golpea escamas contra escamas, como quien se aburre.' },
						{ talk: [{ cond: '!flag.b05_kommo_hecha', script: 'b05_kommo_dominante' }, { script: 'b05_kommo_despues' }], label: 'La cueva de los colmillos', sub: 'La prueba sin capitán', icon: '🐉', new: '!flag.b05_kommo_visto' },
					],
					7: [
						{ trainer: 'canon_ultra_3' },
						{ text: 'Una escalinata tallada en la roca sube hacia el cielo. Los cables de Lemnis suben con ella, por el lado, y arriba se pierden en un resplandor blanco que no es del sol.', cond: '!flag.b05_calder_vencido' },
						{ text: 'Una escalinata tallada en la roca sube hacia el cielo. Arriba, el Altar.', cond: 'flag.b05_calder_vencido' },
						{ item: 'psychicgem', hidden: true },
					],
					8: [
						{ text: 'El último escalón. El viento se para. Delante de ti, la cima de Poni: una explanada de piedra blanca con dos lagos pequeños, uno a cada lado, y en medio, el **Altar**.' },
					],
				},
				encounters: {
					rocks: [
						{ sp: 'boldore', lv: [57, 59], w: 18 },
						{ sp: 'carbink', lv: [57, 59], w: 16 },
						{ sp: 'dugtrioalola', lv: [57, 59], w: 14 },
						{ sp: 'mienshao', lv: [58, 60], w: 12 },
						{ sp: 'golbat', lv: [57, 59], w: 12, time: 'night' },
						{ sp: 'lycanroc', lv: [58, 60], w: 10, time: 'day' },
						{ sp: 'lycanrocmidnight', lv: [58, 60], w: 10, time: 'night' },
						{ sp: 'sableye', lv: [57, 59], w: 8, time: 'night' },
						{ sp: 'skarmory', lv: [58, 60], w: 8 },
						{ sp: 'machoke', lv: [57, 59], w: 8 },
						{ sp: 'kommoo', lv: [59, 61], w: 2 },
						{ sp: 'sigilyph', lv: [58, 60], w: 4, displaced: true },
						{ sp: 'gurdurr', lv: [57, 59], w: 3, displaced: true },
					],
				},
			},
		},

		// =================== ALTAR DEL SOL Y DE LA LUNA ===================
		altar_sol_luna: {
			name: 'Altar del Sol y de la Luna', short: 'Altar', region: 'alola', kind: 'area', map: { x: 40, y: 92 },
			bg: { type: 'ruins', far: '#3a3a5a', ground: '#d8d0c0', fissure: true },
			desc: 'La cima de Poni: una explanada de piedra blanca, lisa como un plato, con un lago pequeño a cada lado. Uno refleja el sol aunque sea de noche; el otro, la luna aunque sea de día. En medio, dos columnas talladas y un círculo en el suelo: el **Altar**.\n\nAlrededor del círculo, Lemnis ha montado un **anillo de metal** del tamaño de una casa, con cables que bajan por el cañón. Encima del anillo, en el aire, hay **un agujero**. Y dentro del anillo hay algo que no debería estar atado.',
			descs: [
				{ cond: 'flag.b05_luz_necrozma', text: 'La cima de Poni, al viento. El anillo de Lemnis está partido y torcido, con los cables colgando como pelo mojado. El círculo del Altar está vacío.\n\nEl aire de encima ya no tiene agujero. Los dos lagos brillan, cada uno con lo suyo. En la piedra del círculo quedan unas marcas finas, rectas, como si algo de cristal hubiera estado mucho tiempo apoyado ahí.' },
				{ cond: 'flag.b05_luz_aether', text: 'La cima de Poni. El anillo de Lemnis está apagado y lo rodea una valla blanca de la Fundación Æther, con dos empleados de guardia que se turnan para no aburrirse.\n\nEn el círculo del Altar duerme **Necrozma**, enroscado sobre sí mismo. Una máquina blanca, a su lado, le devuelve la luz gota a gota con un pitido suave. Cada día brilla un poco más.' },
				{ cond: 'flag.b05_luz_leilani', text: 'La cima de Poni. El anillo de Lemnis está partido y la kahuna Hela ha atado su Mudsdale a uno de los trozos, como quien ata un caballo a una farola.\n\nEn el círculo del Altar descansa **Necrozma**, quieto, con los prismas casi apagados. Alguien le ha puesto alrededor un círculo de conchas y una manta de la Aldea que no le sirve de nada y que a lo mejor le sirve de algo.' },
				{ cond: 'flag.b05_calder_vencido && !' + DECIDIDO, text: 'El Altar. El anillo de Lemnis chirría. El agujero del aire tiembla.' },
			],
			links: ['canon_poni'],
			mapNote: 'El Altar · los lagos del Sol y de la Luna',
			onEnter: [{ script: 'b05_altar_llegada', cond: '!flag.b05_calder_visto', once: true }],
			spots: [
				{ label: 'Enfrentarte a Calder', sub: 'Te espera junto al anillo, con el telescopio a la espalda', icon: '🔭', cond: 'flag.b05_calder_visto && !beat("calder_1")', new: 'true', talk: [{ cond: 'flag.b05_calder_perdio', script: 'b05_calder_revancha' }, { script: 'b05_calder_reto' }] },
				{ label: 'El manantial entre las columnas', sub: 'Agua fría que baja de la piedra', icon: '💧', cond: '!' + DECIDIDO, talk: [{ script: 'b05_altar_manantial' }] },
				{ label: 'El manantial entre las columnas', sub: 'Agua fría que baja de la piedra', icon: '💧', cond: DECIDIDO, action: { center: true } },
				{ label: 'El Altar', sub: 'El círculo de piedra', icon: '☀️', cond: DECIDIDO, talk: [{ script: 'b05_altar_despues' }] },
				{ label: 'Necrozma', sub: 'Duerme en el círculo', icon: '💎', cond: 'flag.b05_luz_aether || flag.b05_luz_leilani', talk: [{ script: 'b05_necrozma_dormido' }] },
				{ label: 'El escritorio de campaña de Calder', sub: 'Una mesa plegable con papeles sujetos por piedras', icon: '📓', cond: DECIDIDO + ' && !has("b05_diario_calder")', new: 'true', talk: [{ script: 'b05_escritorio_calder' }] },
				{ label: 'El lago de la Luna', sub: 'Refleja la luna aunque sea de día', icon: '🌙', cond: 'flag.b05_calder_vencido', new: '!flag.rec_b05_altar_lago', action: { gather: 'b05_altar_lago' } },
			],
			rumors: [
				{ text: 'La gente de la Aldea Marina sube al Altar una vez al año, en la noche más corta, a dar las gracias por la luz. Este año no han podido: había gente de traje y un anillo de metal.' },
				{ text: 'Dicen que en el Altar, hace muchísimo, alguien se comió la luz del sol, y que dos guardianes, uno de sol y otro de luna, se la hicieron devolver. Los de la Aldea creen que la historia está a medias.' },
			],
		},
	},

	// Barco de vuelta a Poni desde Kantai (lugar de T1), una vez conocida la Aldea Marina
	extraSpots: {
		kantai: [{ label: '🛥️ Barca a Isla Poni (Aldea Marina)', sub: 'La barcaza de la Aldea Marina, dos veces al día', icon: '🛥️', cond: 'visited("aldea_marina")', action: { go: 'aldea_marina' } }],
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Jefe de trama: el Dr. Calder Wynn -----
		calder_1: { name: 'Calder Wynn', cls: 'Director del Programa Ultra', npc: 'calder', ai: 5, iv: 29, reward: 7930, terrain: 'rocks', bg: 'ruins',
			gimmick: 'z', ace: 'starmie',
			team: [
				{ sp: 'lunatone', lv: 58, moves: ['psychic', 'moonblast', 'earthpower', 'icebeam'], ability: 'levitate', item: 'sitrusberry', nature: 'modest', iv: 28 },
				{ sp: 'solrock', lv: 58, moves: ['flareblitz', 'rockslide', 'zenheadbutt', 'morningsun'], ability: 'levitate', item: 'lifeorb', nature: 'adamant', iv: 28 },
				{ sp: 'clefable', lv: 59, moves: ['moonblast', 'moonlight', 'flamethrower', 'thunderwave'], ability: 'magicguard', item: 'leftovers', nature: 'calm', iv: 28 },
				{ sp: 'bronzong', lv: 60, moves: ['gyroball', 'psychic', 'earthquake', 'lightscreen'], ability: 'levitate', item: 'mentalherb', nature: 'relaxed', iv: 29 },
				{ sp: 'starmie', lv: 61, moves: ['psychic', 'hydropump', 'thunderbolt', 'icebeam'], ability: 'naturalcure', item: 'psychiumz', nature: 'timid', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: 'La luz que ve esta tarde salió de su estrella hace mucho. La que está en ese anillo salió de él hace tres semanas. Las dos son igual de bonitas. Solo una tiene dueño. Veamos si le dejo a usted decidir cuál.',
			win: 'Ah. —Mira a su Starmie, que parpadea en el suelo—. Una estrella apagada sigue brillando un tiempo. Lo justo para que alguien se dé cuenta.',
			lose: 'No he venido a ganarle a usted. He venido a terminar algo. Descanse. El cielo no se va a ninguna parte. Por desgracia.' },

		// ----- Kahuna Hela (Gran Prueba de Poni, opcional) -----
		hela_gp: { name: 'Hela', cls: 'Kahuna', npc: 'hela', ai: 4, iv: 29, reward: 7320, terrain: 'sand', bg: 'coast',
			gimmick: 'z', ace: 'mudsdale',
			team: [
				{ sp: 'dugtrioalola', lv: 58, moves: ['earthquake', 'ironhead', 'suckerpunch', 'stoneedge'], ability: 'tanglinghair', item: 'softsand', nature: 'jolly', iv: 28 },
				{ sp: 'gastrodon', lv: 59, moves: ['earthpower', 'scald', 'recover', 'icebeam'], ability: 'stormdrain', item: 'sitrusberry', nature: 'calm', iv: 28 },
				{ sp: 'flygon', lv: 59, moves: ['earthquake', 'dragonclaw', 'uturn', 'firepunch'], ability: 'levitate', item: 'yacheberry', nature: 'jolly', iv: 28 },
				{ sp: 'golurk', lv: 60, moves: ['earthquake', 'shadowpunch', 'icepunch', 'hammerarm'], ability: 'ironfist', item: 'expertbelt', nature: 'adamant', iv: 29 },
				{ sp: 'mudsdale', lv: 61, moves: ['highhorsepower', 'heavyslam', 'closecombat', 'rocksmash'], ability: 'stamina', item: 'groundiumz', nature: 'adamant', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 2 }],
			intro: 'Pues ya está. La isla ha descansado, yo también. Ahora me toca ver qué pisada dejas tú. La Gran Prueba de Poni. La tierra no tiene prisa, pero pega fuerte.',
			win: '…Pues sí. Eso es una pisada. Mi Mudsdale lo sabe: no te ha mirado mal. Y eso que mira mal a todo el mundo.',
			lose: 'La tierra gana casi siempre. No es mérito: es que estaba aquí antes. Vuelve cuando quieras.' },

		// ----- Cañón de Poni (gente de Lemnis y de la Aldea) -----
		canon_ultra_1: { name: 'Odile', cls: 'Técnica del Programa Ultra', ai: 3, reward: 2360,
			team: [
				{ sp: 'magnezone', lv: 58, moves: ['flashcannon', 'thunderbolt', 'triattack', 'mirrorcoat'] },
				{ sp: 'bronzong', lv: 59, moves: ['gyroball', 'psychic', 'payback', 'irondefense'] },
			],
			intro: 'Zona restringida. Bueno, no es restringida: la isla no es nuestra. Pero mi contrato dice que diga «zona restringida». ¡Zona restringida!',
			win: 'Mi turno acababa hace diez minutos. Esto no me lo pagan.',
			look: { hair: 'bun', hairColor: '#3a2a1e', outfit: '#e9e8e0', outfit2: '#3a5a9a', skin: 1, eyesStyle: 'sharp', mouth: 'flat', acc: 'glasses lemnis' } },
		canon_peregrina: { name: 'Mahina', cls: 'Peregrina de la Aldea', ai: 3, reward: 2360,
			team: [
				{ sp: 'lycanrocdusk', lv: 58, moves: ['accelerock', 'crunch', 'stoneedge', 'psychicfangs'] },
				{ sp: 'carbink', lv: 59, moves: ['moonblast', 'powergem', 'reflect', 'lightscreen'] },
			],
			intro: 'Cada año subo al Altar con flores. Este año los de traje no me dejan. Pues subo igual. Y si me quieres parar tú también, a ver.',
			win: 'Bien. Sube tú, que vas más rápido. Y si llegas, deja esto en el círculo. —Te enseña el ramo—. No, mejor lo llevo yo. Tardo, pero llego.',
			look: { hair: 'braids', hairColor: '#d8d8d8', outfit: '#3a6a8a', outfit2: '#e9c46a', skin: 4, eyesStyle: 'happy', mouth: 'smile', acc: 'flower' } },
		canon_ultra_2: { name: 'Bastide', cls: 'Guardia del Programa Ultra', ai: 3, reward: 2400,
			team: [
				{ sp: 'skarmory', lv: 59, moves: ['bravebird', 'steelwing', 'spikes', 'nightslash'] },
				{ sp: 'mienshao', lv: 59, moves: ['drainpunch', 'uturn', 'stoneedge', 'fakeout'] },
				{ sp: 'houndoom', lv: 59, moves: ['flamethrower', 'darkpulse', 'sludgebomb', 'nastyplot'] },
			],
			intro: 'Dicen que cuando se apague del todo, Kalos tendrá luz gratis diez años. Diez años. Mi abuela pagaba la luz con monedas. Aparta.',
			win: '…Mi abuela tampoco habría querido que la pagara otro. Eso lo sé. No me hace gracia saberlo.',
			look: { hair: 'cap', hairColor: '#2b2b38', outfit: '#3a5a9a', outfit2: '#c9ced8', skin: 2, eyesStyle: 'sharp', mouth: 'flat', capColor: '#e9e8e0', acc: 'lemnis' } },
		canon_ultra_3: { name: 'Pérrine', cls: 'Investigadora del Programa Ultra', ai: 3, reward: 2400,
			team: [
				{ sp: 'claydol', lv: 59, moves: ['earthpower', 'psychic', 'icebeam', 'rapidspin'] },
				{ sp: 'reuniclus', lv: 60, moves: ['psychic', 'focusblast', 'shadowball', 'recover'] },
			],
			intro: 'El doctor Wynn dice que mirar la luz es lo único que le debemos. Yo llevo tres semanas mirándola salir de esa cosa. Ya no sé si se la debemos o se la estamos quitando. ¡Pero el doctor no quiere visitas!',
			win: 'Sube. Díselo tú, que a mí no me sale. Que ya no lo mira igual. Que hace días que no lo mira.',
			look: { hair: 'long', hairColor: '#c4743a', outfit: '#e9e8e0', outfit2: '#3a5a9a', skin: 1, eyesStyle: 'sleepy', mouth: 'flat', acc: 'glasses lemnis' } },

		// ----- Casas-barco de la Aldea Marina (zona de entrenamiento, tope 61) -----
		marina_1: { name: 'Keala', cls: 'Pescadora', ai: 3, reward: 2360,
			team: [
				{ sp: 'wailord', lv: 58, moves: ['waterspout', 'bounce', 'heavyslam', 'rest'] },
				{ sp: 'dhelmise', lv: 59, moves: ['anchorshot', 'powerwhip', 'shadowball', 'rapidspin'] },
			],
			intro: 'Aquí, al que pierde lo tiramos al agua. Bueno, se tira solo. Es tradición. ¿Sabes nadar?',
			win: 'Pues al agua. —Se tira al agua—. ¡Está buenísima!',
			look: { hair: 'ponytail', hairColor: '#2a2420', outfit: '#3a6a8a', outfit2: '#e9e3d0', skin: 4, eyesStyle: 'happy', mouth: 'grin', acc: 'bandana' } },
		marina_2: { name: 'Pono', cls: 'Marinero', ai: 3, reward: 2380,
			team: [
				{ sp: 'clawitzer', lv: 59, moves: ['waterpulse', 'aurasphere', 'darkpulse', 'dragonpulse'] },
				{ sp: 'gyarados', lv: 59, moves: ['waterfall', 'crunch', 'icefang', 'dragondance'] },
			],
			intro: 'Mi barco se llama «Ya Voy». Lo llamé así para que mi madre dejara de gritarme. No funcionó. ¡En guardia!',
			win: '¡YA VOY! —grita alguien desde otro barco. No es a ti.',
			look: { hair: 'short', hairColor: '#1a1a1a', outfit: '#e9e3d0', outfit2: '#3a6a8a', skin: 5, eyesStyle: 'normal', mouth: 'grin', acc: 'cap', capColor: '#3a6a8a' } },
		marina_3: { name: 'Lokelani', cls: 'Capitana de casa-barco', ai: 3, reward: 2400,
			team: [
				{ sp: 'relicanth', lv: 59, moves: ['headsmash', 'aquatail', 'earthquake', 'yawn'] },
				{ sp: 'dragalge', lv: 60, moves: ['sludgebomb', 'dragonpulse', 'scald', 'toxicspikes'] },
			],
			intro: 'Mi casa lleva cuarenta años flotando. Tú llevas cinco minutos en ella. Demuéstrame que no te vas a hundir.',
			win: 'No te has hundido. Ni la casa tampoco. Buen día.',
			look: { hair: 'braids', hairColor: '#6a6a6a', outfit: '#8a5a2f', outfit2: '#e9c46a', skin: 4, eyesStyle: 'sharp', mouth: 'flat', acc: 'bandana' } },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== LLEGADA A LA ALDEA MARINA ===================
		b05_marina_llegada: [
			{ set: { 'flag.b05_m_aviso': true } },
			{ text: 'La barcaza te deja en una pasarela que se mueve. Luego otra. Luego otra. La Aldea Marina no tiene suelo: tiene tablas, cuerdas y gente que camina por ellas como si nada mientras tú buscas dónde agarrarte.' },
			{ text: 'Huele a sal, a pescado seco y a coco. Un niño pasa corriendo con un Wingull en la cabeza. Una señora tiende ropa entre dos mástiles. Todo es normal. Todo es tranquilo.' },
			{ text: 'Y entonces el cielo se **apaga**.' },
			{ text: 'No es una nube. No hay nubes. Es como si alguien hubiera girado un botón: el azul se vuelve gris, el mar se vuelve de plomo, las sombras se borran. Los Wingull de las cuerdas se callan todos a la vez. La señora de la ropa deja de tender, mira hacia arriba y suspira, como quien ve llover otra vez.' },
			{ say: 'marinera_poni', text: 'Media tarde. Siempre a media tarde. Ahora dura un rato y vuelve. —No te mira; mira al este, hacia los acantilados rojos—. Hace tres semanas duraba un minuto. Ayer, siete.' },
			{ say: 'rotom', text: '¡Bzzt! Luminosidad ambiente: cuarenta y uno por ciento. Eso no es normal. Eso no es de día. ¡Eso no es de ninguna hora!' },
			{ if: LUC, then: [
				{ text: '{riolu} se ha quedado muy quieto en la pasarela, con la cabeza girada hacia el este. El aura le tiembla en las manos, débil, como una vela cuando se abre una puerta. No te mira. Gruñe muy bajito, sin enseñar los dientes.' },
			] },
			{ text: 'Al cabo de unos minutos, el cielo vuelve. Despacio. Los Wingull vuelven a gritar, como si no hubiera pasado nada. Para ellos, ya no ha pasado.' },
			{ text: 'En la pasarela de enfrente, sentada encima de una caja de herramientas que pesa más que ella, alguien te saluda con una llave inglesa.' },
			{ say: 'leilani', text: '¡{jugador}! ¡Aquí! ¡Soy yo! ¡La del pelo chamuscado! ¡Bueno, eso ya lo sabías! —Se levanta, tropieza con la caja, la caja no se mueve—. ¡Llegué antes que tú! Me trajo un primo de Kiawe en lancha. No quiero hablar de cómo conduce. He vomitado en tres idiomas.' },
			{ say: 'leilani', text: 'La profe Pimpinela me llamó. El punto violeta de su pantalla, el que no parpadea. Está aquí. En el Cañón. Arriba del todo. —Por una vez no hace ningún chiste—. Es un ultraumbral. Uno grande. Abierto. Y alguien lo está alimentando con algo.' },
			{ choice: [
				{ text: '«Es peligroso. Quédate en la Aldea.»', then: [
					{ af: { leilani: -3 } },
					{ say: 'leilani', text: '…—Se le apaga algo en la cara. Lo vuelve a encender, como un mechero que falla—. Ya. Claro. Gracias. Ya me lo dijeron hace nueve años, ¿sabes? «Quédate en casa, Lani». Me quedé. No sirvió de mucho.' },
					{ say: 'leilani', text: 'Voy a subir. Contigo o detrás de ti. Detrás de ti es peor, porque me caigo más. ¿Sí o qué?' },
				] },
				{ text: '«Subimos juntos.»', then: [
					{ af: { leilani: 2 } },
					{ say: 'leilani', text: '¡Eso! —Te choca la mano. Fuerte. Demasiado fuerte. Se sacude la mano—. Au. Llevo guantes de soldar y me he hecho daño yo. Eso dice mucho de mí.' },
				] },
				{ text: '«¿Has traído el soplete?»', then: [
					{ af: { leilani: 1 } },
					{ say: 'leilani', text: '¿Que si he traído el…? —Abre la caja. Dentro hay un soplete, dos llaves inglesas, un Togedemaru dormido y un sándwich—. Siempre. Y al Togedemaru, que se ha colado. Y el sándwich, que es suyo.' },
				] },
			] },
			{ if: 'flag.b05_skull_taller', then: [
				{ say: 'leilani', text: 'Por cierto: los chicos de la calavera que me mandaste ya están en el taller. Me han ordenado las llaves por colores. ¡Por colores! No encuentro nada. Es precioso. No se lo digas.' },
			] },
			{ if: 'flag.b05_codigo_cero', then: [
				{ say: 'leilani', text: 'Y me han dicho que Gladio te dio a su… al… —hace un gesto con las manos, como un casco— …al niño del casco. Si un día quieres que le haga una montura, me lo dices. Aunque creo que él prefiere que no le pongan más cosas encima.' },
			] },
			{ say: 'leilani', text: 'Primero, la kahuna. Aquí nadie sube al Cañón sin pasar por **Hela**. Está en la única casa con los pies en la arena, la del Mudsdale. Yo te espero aquí, peleándome con una tuerca.' },
			{ if: 'flag.b05_bastien_rompe', then: [
				{ text: 'La Pokédex vibra. Un mensaje corto, sin foto.' },
				{ say: 'bastien', as: 'Bastien (mensaje)', text: '«Ya está. Lo hice. Me siento ligero y sin un céntimo. Greninja dice que le da igual. Gracias por leerlo conmigo. —B.»' },
			] },
			{ if: 'flag.b05_bastien_sigue', then: [
				{ text: 'La Pokédex vibra. Un mensaje corto, sin foto.' },
				{ say: 'bastien', as: 'Bastien (mensaje)', text: '«Sigo. Ya sé lo que piensas. Yo también lo pienso. Pero todavía no. Cuando sea, te aviso el primero. —B.»' },
			] },
			{ quest: 'b05_m5', stage: 'poni', cond: '!quest.b05_m5' },
		],

		b05_leilani_marina: [
			{ if: '!flag.b05_hela_conocida', then: [
				{ say: 'leilani', text: 'Hela. La casa del Mudsdale. Ve. Yo estoy aquí con esta tuerca, que es de rosca al revés. ¿Quién hace una tuerca de rosca al revés? Yo. Yo la hice. Hace años.' },
			], else: [
				{ say: 'leilani', text: '¿Ya hablaste con Hela? ¡Pues arriba! Yo subo detrás. Despacio. Muy despacio. Con la caja. —Mira el camino del Cañón, que sube y sube entre paredes rojas—. Muy, muy despacio.' },
				{ text: 'En la tapa de la caja de herramientas hay una pegatina vieja, medio despegada: una llave inglesa con una corona. Debajo, con rotulador, en letra de niña: «PROPIEDAD DE LANI. Y DE MAMÁ LOS MARTES».' },
			] },
		],

		// =================== LA KAHUNA HELA ===================
		b05_hela_intro: [
			{ set: { 'flag.b05_hela_conocida': true } },
			{ text: 'Delante de la única casa de tierra de la Aldea, una chica bajita, con trenzas y un sombrero de paja que le tapa media cara, cepilla a un **Mudsdale** enorme. Cepilla despacio, siempre en el mismo sentido, como si tuviera todo el día. Lo tiene.' },
			{ say: 'hela', text: '¿Eres de la Gira? —No deja de cepillar—. Pues hola. Soy Hela. La kahuna de Poni, dicen. Yo digo que soy la que se queda en tierra.' },
			{ say: 'hela', text: 'Has visto el cielo, ¿no? Lo de media tarde. —Para de cepillar. El Mudsdale gira la cabeza, molesto—. Tres semanas. Los de traje subieron por el Cañón con cajas. Desde entonces, a media tarde, Poni se queda sin luz un rato. Cada día un rato más.' },
			{ say: 'hela', text: 'Yo no he subido. La isla no me ha dejado. Cuando voy a subir, Tapu Fini echa niebla en el camino y no veo ni a mi Mudsdale. Y mi Mudsdale es muy grande.' },
			{ if: 'flag.b05_pulsera_z', then: [
				{ say: 'hela', text: 'En Melemele, me han contado, bajó Tapu Koko. Te dio la piedra de esa pulsera. —Te mira la muñeca un momento—. Hacía nueve años que no bajaba. La última vez fue la noche del agujero de la bahía de Kantai. La noche que se perdió la ingeniera.' },
				{ say: 'hela', text: 'Los tapus no bajan por cualquier cosa. Bajan cuando algo en el cielo está mal. O cuando alguien va a arreglarlo. —Vuelve a cepillar—. Tú sabrás cuál de las dos eres.' },
			] },
			{ if: LUC, then: [
				{ text: 'El Mudsdale da un paso hacia {riolu} y le huele la cabeza, largo rato, resoplando. {riolu} aguanta sin moverse. Al final el Mudsdale le suelta un resoplido en la cara y vuelve a lo suyo.' },
				{ say: 'hela', text: 'Le caes bien. No lo parece, pero le caes bien. Si no, ya te habría pisado.' },
			] },
			{ say: 'hela', text: 'Sube tú. Por el **Cañón de Poni**, hasta arriba. Al **Altar del Sol y de la Luna**. A ti la niebla no te va a parar: no tienes cara de que te pare nada.' },
			{ choice: [
				{ text: '«¿Y tu Gran Prueba?»', then: [
					{ say: 'hela', text: 'Después. Primero la isla, luego la prueba. Una prueba con el cielo apagado es como comer con la boca cerrada: se puede, pero no sabe a nada.' },
				] },
				{ text: '«¿Qué hay en el Altar?»', then: [
					{ say: 'hela', text: 'Mi abuela decía que ahí arriba vive algo que se come la luz y la devuelve. Que siempre la devuelve. —Se encoge de hombros—. Si ahora no la devuelve, es que alguien no le deja.' },
				] },
			] },
			{ say: 'hela', text: 'Ah. Y si ves algo redondo y verde en mi tejado, no lo despiertes de golpe. Lleva un mes ahí. No es mío. No es de nadie. Come mis bayas.' },
			{ quest: 'b05_m5', stage: 'canon' },
			{ intel: { npc: 'hela', text: 'Kahuna de Poni (Tierra). La isla lleva tres semanas apagándose a media tarde, desde que Lemnis subió cajas al Altar. Tapu Fini no la deja subir. Tapu Koko bajó en Melemele por primera vez desde la noche del agujero de la bahía de Kantai, hace nueve años.' } },
		],
		b05_hela_espera: [
			{ if: '!flag.b05_calder_vencido', then: [
				{ say: 'hela', text: 'El Cañón está ahí. No se mueve. Tú, sí. —Sigue cepillando—. Sube.' },
				{ say: 'hela', text: 'Y cura a tu equipo antes. El barco-Centro está ahí. La enfermera se marea, pero cura igual.' },
			], else: [
				{ say: 'hela', text: 'Algo has hecho arriba. La isla respira distinto. —Te mira desde debajo del sombrero—. Vuelve a hablar conmigo cuando lo termines.' },
			] },
		],
		b05_hela_gp: [
			{ if: '!flag.b05_hela_gp_dicho', then: [
				{ set: { 'flag.b05_hela_gp_dicho': true } },
				{ say: 'hela', text: 'Bajaste. —No es una pregunta. Ha dejado el cepillo. Tiene las manos llenas de tierra, como si acabara de plantar algo—. He subido detrás de ti hasta la mitad del Cañón. Hoy no había niebla. Tapu Fini me ha dejado pasar.' },
				{ say: 'hela', text: 'Lo que has hecho arriba, lo has hecho. No te voy a decir si está bien o mal. La tierra no dice eso. La tierra dice: «aquí ha pasado algo». Y luego crece lo que crece.' },
			] },
			{ say: 'hela', text: 'Ahora sí. La **Gran Prueba de Poni**. Cinco Pokémon. Un movimiento Z. En la arena, delante de mi casa, que es donde se hacen las cosas serias.' },
			{ choice: [
				{ text: 'Pedir que curen al equipo primero', then: [
					{ heal: 'Hela silba. La enfermera del barco-Centro baja por la pasarela, verde de mareo, y te cura al equipo en un minuto. «En tierra… se cura… mejor», dice, y se sienta en la arena.' },
					{ call: 'b05_hela_gp_combate' },
				] },
				{ text: '«Vamos.»', then: [{ call: 'b05_hela_gp_combate' }] },
				{ text: 'Todavía no', then: [{ say: 'hela', text: 'Bien. La arena espera. Yo también. Mi Mudsdale no tanto, pero se aguanta.' }] },
			] },
		],
		b05_hela_gp_combate: [
			{ battle: 'hela_gp',
				onWin: [{ call: 'b05_hela_vencida' }],
				onLose: [
					{ say: 'hela', text: 'La tierra gana casi siempre. Vuelve cuando quieras. La arena no se va, y yo tampoco.' },
					{ heal: 'La enfermera del barco-Centro, que ya no está tan mareada, cura a tu equipo en la arena.' },
				] },
		],
		b05_hela_vencida: [
			{ if: 'flag.b05_hela_vencida', then: [{ end: true }] },
			{ set: { 'flag.b05_hela_vencida': true } },
			{ text: 'El Mudsdale de Hela se tumba en la arena, despacio, con un resoplido que levanta polvo. No está mal herido: está cansado y digno. Hela le pone la mano en el cuello.' },
			{ say: 'hela', text: 'Pues ya está. Pisada buena. —Saca del bolsillo algo envuelto en un pañuelo: un cristal marrón, como un trozo de tierra que se hubiera vuelto piedra preciosa—. El **Geostal Z**. Para que tus Pokémon pisen como pisa la isla.' },
			{ give: 'groundiumz' },
			{ badge: 'sello_poni' },
			{ say: 'hela', text: 'Y el **Sello de Poni**. Para la Gira cuenta como medalla. Para mí cuenta como que la isla te conoce. Las dos cosas, a la vez. Como todo aquí.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Tres sellos! ¡Melemele, Akala y Poni! ¡Hemos hecho el recorrido insular entero! ¡Bueno, casi entero! ¡Ula-Ula no cuenta porque no hemos ido! ¡Pero los tres que sí, sí!' },
			{ if: LUC, then: [
				{ text: '{riolu} se acerca al Mudsdale tumbado y le pone la palma en el hocico. El Mudsdale resopla. Esta vez no es un resoplido molesto.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
		],
		b05_hela_despues: [
			{ say: 'hela', text: 'Mi Mudsdale ya no te mira mal. A mí todavía, a veces. Es buena señal para ti.' },
			{ if: 'flag.b05_luz_leilani', then: [
				{ say: 'hela', text: 'Subo al Altar cada mañana con agua y bayas. La criatura de cristal no come. Pero se queda mirando las bayas. Algo es algo.' },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ say: 'hela', text: 'Los de blanco de Æther suben y bajan. Saludan. Compran pescado. Eso aquí cuenta mucho. —Pausa—. No me fío. Pero compran pescado.' },
			] },
			{ if: 'flag.b05_luz_necrozma', then: [
				{ say: 'hela', text: 'El Altar está vacío. Así debe estar. Lo que vive ahí arriba no vive ahí arriba: vive en todas partes donde hay luz. Ahora vuelve a estar en todas partes.' },
			] },
		],

		// =================== ROWLET EN EL TEJADO ===================
		b05_rowlet: [
			{ if: '!flag.b05_rowlet_visto', then: [
				{ set: { 'flag.b05_rowlet_visto': true } },
				{ text: 'En el borde del tejado de la casa de Hela, entre dos tejas sueltas, hay una bola de plumas verde y marrón, perfectamente redonda, con una pajarita de hojas en el cuello. Es un **Rowlet**. Duerme. Duerme con una intensidad que no habías visto nunca en nada.' },
				{ say: 'hela', text: 'Ese. Llegó hace un mes, con una tormenta. No baja. Duerme de día, come mis bayas de noche y vuelve a dormir. —Pausa—. Igual que mi primo.' },
			], else: [
				{ text: 'El Rowlet del tejado sigue ahí, redondo y dormido, entre dos tejas sueltas.' },
			] },
			{ if: 'night', then: [
				{ text: 'Es de noche, y el Rowlet tiene los ojos abiertos: dos lunas naranjas que te miran sin parpadear. Gira la cabeza del todo, de un lado al otro, como si comprobara que eres tú y no otro. Luego salta del tejado, planea en silencio y aterriza en tu cabeza.' },
				{ call: 'b05_rowlet_eleccion' },
			], else: [
				{ prompt: 'El Rowlet duerme en el borde del tejado. ¿Cómo lo bajas?', choice: [
					{ cond: LUC, text: 'Pedirle a {riolu} que suba.', then: [
						{ text: '{riolu} trepa por la pared de madera en tres saltos, se agacha junto al Rowlet y le pone la palma en la espalda, muy suave. El aura le brilla apenas. El Rowlet abre un ojo. Luego el otro. Mira a {riolu}. Se le acurruca en los brazos y se vuelve a dormir.' },
						{ text: '{riolu} baja del tejado con el Rowlet en brazos, muy serio, como quien lleva una tarta.' },
						{ happy: { who: 'riolu', n: 3 } },
						{ call: 'b05_rowlet_eleccion' },
					] },
					{ text: 'Subir tú por la escalera de Hela.', then: [
						{ text: 'Subes. La escalera cruje. El tejado cruje más. Llegas al borde, alargas la mano… y el Rowlet, sin abrir los ojos, se gira sobre sí mismo y te da la espalda. Le tocas la espalda. Se gira otra vez. Te da la espalda otra vez.' },
						{ say: 'hela', text: 'Así lleva un mes conmigo. —Desde abajo—. Prueba a no querer bajarlo.' },
						{ text: 'Te sientas en el tejado. No intentas nada. Miras el mar. Al rato, notas algo redondo y tibio que se apoya contra tu pierna. El Rowlet se ha acercado solo, dormido, y se ha quedado pegado a ti.' },
						{ call: 'b05_rowlet_eleccion' },
					] },
					{ text: 'Esperar a que anochezca.', then: [
						{ text: 'Te sientas en la arena, debajo del tejado, con la espalda contra la pared de la casa. Hela te trae un coco con una pajita. El sol baja. El mar cambia de color tres veces.' },
						{ text: 'Cuando sale la primera estrella, se oye un aleteo sin ruido. El Rowlet aterriza en tu cabeza, se acomoda y te mira desde arriba, al revés, con dos ojos como lunas naranjas.' },
						{ call: 'b05_rowlet_eleccion' },
					] },
				] },
			] },
		],
		b05_rowlet_eleccion: [
			{ if: ROWLET_LINEA, then: [
				{ set: { 'flag.b05_rowlet': true, 'flag.b05_rowlet_vive': true } },
				{ say: 'hela', text: '¿Ya tienes uno de estos? —Mira a tu equipo y luego al Rowlet—. Pues que se quede. Le he agarrado cariño. Bueno, le he agarrado las bayas que me deja. Que se quede en el tejado. Me avisa cuando llueve: se mete por la chimenea.' },
				{ text: 'El Rowlet se te baja de la cabeza, vuelve a su hueco entre las tejas y se duerme en dos segundos. Antes de cerrar los ojos del todo, te mira. Vuelve cuando quieras, parece decir. O a lo mejor solo está bostezando.' },
			], else: [
				{ say: 'hela', text: 'Mira. A mí no me ha hecho eso en un mes. —Se cruza de brazos—. Te ha elegido. No es mío, así que no te lo doy. Te lo llevas tú o se queda en mi tejado.' },
				{ choice: [
					{ text: '«Me lo llevo.»', then: [
						{ set: { 'flag.b05_rowlet': true } },
						{ text: 'El Rowlet ulula una vez, bajito, y se mete él solo en la Poké Ball que le acercas. La Poké Ball se queda quieta enseguida. Seguramente se ha dormido.' },
						{ pokemon: { sp: 'rowlet', lv: 16, gender: 'F', nature: 'adamant', ability: 'overgrow', happy: 160, moves: ['leafage', 'peck', 'shadowsneak', 'razorleaf'], ivs: { hp: 26, atk: 31, def: 24, spa: 20, spd: 26, spe: 28 } } },
						{ say: 'hela', text: 'Dale de comer de noche. Y no la despiertes de golpe. Si la despiertas de golpe, te mira como si le debieras dinero.' },
					] },
					{ text: '«Que se quede contigo, por ahora.»', then: [
						{ say: 'hela', text: 'Bueno. El tejado es suyo hasta que vuelvas. Y mis bayas, también. —Suspira—. Sobre todo mis bayas.' },
						{ text: 'El Rowlet vuelve al tejado de un salto y se duerme en su hueco, entre las tejas.' },
					] },
				] },
			] },
			{ quest: 'b05_s_iniciales', stage: 'buscar', cond: 'flag.b05_rowlet && !quest.b05_s_iniciales' },
			{ quest: 'b05_s_iniciales', stage: 'hecha', done: true, cond: 'flag.b05_litten && flag.b05_popplio && flag.b05_rowlet' },
		],
		b05_rowlet_visita: [
			{ if: 'night', then: [
				{ text: 'El Rowlet del tejado está despierto. Te ve, gira la cabeza del todo y ulula bajito. Baja planeando, se sienta un rato en tu hombro, sin peso, y vuelve a subir con una baya de Hela en el pico.' },
			], else: [
				{ text: 'El Rowlet duerme en su hueco del tejado, redondo y perfecto. Cuando te acercas, abre un ojo. Te reconoce. Lo cierra. Eso, en un Rowlet, es un abrazo.' },
			] },
		],

		// =================== ALDEA MARINA: AMBIENTE ===================
		b05_marina_restaurante: [
			{ text: 'El restaurante es un barco viejo con un Wailord pintado en el casco y mesas de madera en la cubierta. Un señor con delantal remueve una olla tan grande que podría bañarse en ella.' },
			{ say: 'marinera_poni', as: 'El cocinero', text: 'Sopa de pescado de la Aldea. Lleva lo que haya picado hoy y lo que no haya querido picar ayer. ¿Una? Invita la casa a los de la Gira. Los de traje, que paguen.' },
			{ if: '!' + DECIDIDO, then: [
				{ say: 'marinera_poni', as: 'El cocinero', text: 'Cuando se apaga el cielo, la olla tarda más en hervir. Te lo juro. Mi mujer dice que son cosas mías. Mi olla dice que no.' },
			], else: [
				{ say: 'marinera_poni', as: 'El cocinero', text: 'Desde que bajaste del Altar, la olla hierve a su hora. No pregunto qué hiciste. La sopa no pregunta.' },
			] },
			{ heal: 'Te comes la sopa sentado en la cubierta, con los pies colgando sobre el agua. Tu equipo se reparte las espinas. Todos quedan como nuevos.' },
		],

		// =================== EL CAÑÓN: RASTREO DE AURA ===================
		b05_canon_aura: [
			{ if: '!flag.b05_canon_aura_visto', then: [
				{ set: { 'flag.b05_canon_aura_visto': true } },
				{ text: '{riolu} se para delante de la pared de las manos. No se mueve. Luego levanta la suya, despacio, y la pone encima de una de las marcas, una de tamaño de niño. Encaja.' },
				{ text: 'El aura se le enciende sola, azul, y se le va por el brazo hacia la pared. Las marcas de alrededor, por un segundo, parece que respiran. {riolu} aparta la mano, te mira y señala el suelo de la gruta. Hay algo debajo. Algo que los de la Aldea dejaron aquí hace mucho, para quien subiera con luz propia.' },
			], else: [
				{ text: '{riolu} vuelve a poner la palma en la marca de las manos y te mira. Quiere intentarlo otra vez.' },
			] },
			{ minigame: { type: 'aura', id: 'b05_canon_aura', title: 'Lo que guardan las manos', hint: '{riolu} nota algo enterrado bajo la gruta. Pulsa y escucha: cuanto más cerca, más caliente.', theme: 'ruina', level: 3,
				guaranteed: ['b05_mt_rayo_meteorico'], loot: [{ id: 'stardust', w: 8, n: [1, 2] }, { id: 'starpiece', w: 5 }, { id: 'moonstone', w: 3 }, { id: 'sunstone', w: 3 }, { id: 'cometshard', w: 1, rare: true }], picks: 2, consolation: 'stardust', lootTitle: 'Bajo la gruta de las manos' },
				onWin: [
					{ set: { 'flag.b05_canon_aura': true } },
					{ text: 'Entre la tierra roja, envuelto en una tela que se deshace al tocarla, hay un disco de piedra negra y brillante, pesado como si fuera de hierro: un trozo de **estrella caída**, tallado a mano con las mismas manos de la pared.' },
					{ text: 'Cuando lo levantas, la Pokédex lo lee sola y le encuentra un movimiento dentro, como quien encuentra una canción en una concha: **Rayo Meteórico**. La luz que cae.' },
					{ say: 'rotom', text: '¡Bzzt! ¡Una MT! ¡Hecha por gente de hace muchísimo! ¡Sin enchufe! ¿Cómo hicieron una MT sin enchufe? ¡Con las manos! —Pausa—. Me da un poco de envidia tener manos.' },
					{ text: '{riolu} se mira la palma. Luego la vuelve a poner en la pared, en la marca pequeña, un momento. Como quien da las gracias.' },
					{ happy: { who: 'riolu', n: 5 } },
				],
				onLose: [
					{ text: 'El aura de {riolu} se apaga antes de encontrarlo. Se sienta en el suelo de la gruta, frustrado, con las orejas gachas. Sabe que está ahí. Lo intentará otra vez.' },
				],
				onQuit: [{ text: '{riolu} aparta la mano de la pared. Lo dejan para luego. Las manos de la pared llevan siglos esperando; pueden esperar un poco más.' }] },
		],
		b05_canon_aura_despues: [
			{ text: 'La gruta de las manos. {riolu} pasa por delante y, sin pararse, roza con la punta de los dedos la marca pequeña, la que encaja con la suya.' },
		],
		b05_canon_sin_aura: [
			'Cientos de manos rojas en la pared, todas apuntando hacia arriba. Pones la tuya encima de una. La roca está tibia, como si alguien acabara de apoyarse ahí.',
			{ text: 'Tienes la sensación de que debajo del suelo de la gruta hay algo, como cuando sabes que alguien te mira. Tus ojos no bastan para esto. **{riolu}** lo encontraría: vuelve con él en el equipo.' },
		],

		// =================== EL CAÑÓN: LA PRUEBA SIN CAPITÁN ===================
		b05_kommo_dominante: [
			{ set: { 'flag.b05_kommo_visto': true } },
			{ text: 'La cueva de los colmillos es corta y alta, con el techo abierto al cielo. En el suelo, un círculo de piedras planas, como un ring. Y alrededor, en las paredes, viejas banderitas de colores, descoloridas: «Prueba del Cañón · Capitana: —». El nombre está tachado.' },
			{ text: 'En el centro del ring, de espaldas, hay un **Kommo-o** enorme, mucho más grande de lo normal, rodeado de un aura que vibra. Choca las escamas de los brazos entre sí, despacio, clac, clac, clac, como quien tamborilea con los dedos en una mesa.' },
			{ say: 'rotom', text: '¡Bzzt! ¡Un Pokémon dominante! ¡Pero aquí no hay capitán! ¡Lleva años esperando a que alguien venga a hacer su prueba! ¡Mírale la cara! ¡Es cara de aburrimiento! ¡Mucho aburrimiento!' },
			{ text: 'El Kommo-o te oye. Se gira. Te ve. Deja de chocar las escamas. Y por primera vez en muchísimo tiempo, se le ilumina la cara. Levanta los brazos y los choca **una vez**, fuerte, como un gong.' },
			{ prompt: 'El dominante del Cañón te reta. No hace falta aceptar: la prueba no tiene capitán.', choice: [
				{ text: 'Curar al equipo y aceptar el reto.', then: [
					{ heal: 'En la entrada de la cueva hay un barril de agua de manantial con una taza de madera y un cartel: «Para los aspirantes. Gratis. Era la norma». Beben todos. Está fría y sabe a piedra.' },
					{ call: 'b05_kommo_combate' },
				] },
				{ text: 'Aceptar el reto.', then: [{ call: 'b05_kommo_combate' }] },
				{ text: 'Ahora no.', then: [
					{ text: 'Te das la vuelta. A tu espalda, el Kommo-o suspira, se sienta en el ring y vuelve a chocar las escamas. Clac. Clac. Clac.' },
				] },
			] },
		],
		b05_kommo_combate: [
			{ wild: { sp: 'kommoototem', lv: 60, noCatch: true }, canRun: false,
				onWin: [
					{ set: { 'flag.b05_kommo_hecha': true } },
					{ text: 'El Kommo-o dominante cae sentado en el ring, con un estruendo de escamas. Se queda ahí, jadeando. Luego se ríe. No sabías que los Kommo-o se reían. Suena como una caja de herramientas que se cae por una escalera.' },
					{ text: 'Se levanta, va hasta el fondo de la cueva y vuelve con algo entre las garras: un cristal amarillo con forma de rombo, polvoriento, que lleva años esperando a alguien. Te lo pone en la mano. Choca las escamas una vez. Prueba superada.' },
					{ give: 'dragoniumz' },
					{ say: 'rotom', text: '¡Bzzt! ¡El **Dracostal Z**! ¡El cristal de la prueba que no tenía capitán! ¡Ahora tiene… bueno, sigue sin tener capitán! ¡Pero tiene a alguien que la ha superado!' },
				],
				onLose: [
					{ text: 'El Kommo-o dominante te mira desde el ring, sin moverse. No parece contento de haber ganado. Parece contento de que hayas venido. Choca las escamas una vez: vuelve cuando quieras.' },
					{ heal: 'Beben del barril de agua de manantial de la entrada. Fría. Sabe a piedra. Les sienta bien a todos.' },
				] },
		],
		b05_kommo_despues: [
			{ text: 'La cueva de los colmillos. El Kommo-o ya no está en el ring: está sentado en la entrada, al sol, mirando pasar a la gente del Cañón. Cuando te ve, choca las escamas una vez. Clac. Hola.' },
		],

		// =================== EL ALTAR: LLEGADA (cinemática) ===================
		b05_altar_llegada: [
			{ set: { 'flag.b05_calder_visto': true } },
			{ quest: 'b05_m5', stage: 'altar' },
			{ text: 'Detrás de ti, jadeando, con la caja de herramientas a cuestas, llega Leilani. Deja la caja en el suelo. Levanta la vista. Y se queda quieta.' },
			{ cutscene: { bg: { type: 'ruins', far: '#3a3a5a', ground: '#d8d0c0', fissure: true }, time: 'tarde', start: 'fade', cam: 'still', frames: [
				{ big: true, text: 'Altar del Sol y de la Luna', sub: 'Isla Poni', hold: 2400, cam: 'still' },
				{ cam: 'pull', fx: 'light', text: 'La cima de Poni: piedra blanca, dos lagos, dos columnas. Y en medio, un anillo de metal del tamaño de una casa, zumbando, con cables que bajan por el cañón como raíces.' },
				{ cam: 'pan-up', fx: 'rays', color: '#c4a0ff', text: 'Encima del anillo, en el aire, hay un **agujero**. Un ultraumbral. Tiene los bordes de luz y dentro no se ve nada: blanco, como una hoja sin escribir.' },
				{ actors: [{ mon: 'necrozma', key: 'nz', at: 'center', size: 'l', enter: 'fade', dim: true }], cam: 'push', fx: 'heartbeat', color: '#3a2a5a', text: 'Dentro del anillo, atado al suelo del Altar con cuatro cables gruesos, hay algo de **cristal negro**. Enroscado. Con los prismas del cuerpo casi apagados. De cada prisma sale un hilo de luz que sube hacia el agujero.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.22, enter: 'left' }], on: 'rio', fx: 'glow', cam: 'still', text: '{riolu} da un paso. Se le enciende el aura, entera, sin que nadie se lo pida. No es rabia. Es dolor. Lo nota él como si fuera suyo.' },
				{ cond: LUC, actors: [{ key: 'nz', do: 'turn' }], on: 'nz', fx: 'ripple', cam: 'push', text: 'Y la criatura de cristal levanta la cabeza. Muy poco. Lo justo para mirar a {riolu}. Un prisma de su frente parpadea, una vez, como quien no tiene fuerzas para más.' },
				{ cond: '!(' + LUC + ')', actors: [{ key: 'nz', do: 'turn' }], on: 'nz', fx: 'ripple', cam: 'push', text: 'La criatura de cristal levanta la cabeza. Muy poco. Te mira. Un prisma de su frente parpadea, una vez, como quien no tiene fuerzas para más.' },
				{ actors: [{ id: 'calder', at: 'right', enter: 'right' }], cam: 'pan-right', text: 'Junto al anillo, de espaldas, con un telescopio plegable al hombro, un hombre de chaqueta clara mira el agujero. Se gira despacio. Sonríe con educación, como en Hauoli.' },
				{ say: 'calder', actors: [{ key: 'calder', speak: true }], cam: 'still', text: 'Buenas tardes, {jugador}. Llega justo para el atardecer. Aunque hoy, me temo, no va a haber atardecer.' },
			] } },
			{ say: 'rotom', text: '¡Bzzt! ¡Pokémon no registrado! Tipo Psíquico. Nombre… «Necrozma». ¡Los datos dicen que es muy fuerte! —Pausa—. Los datos están mal. Ahora mismo no es fuerte. Ahora mismo está… vacío.' },
			{ say: 'leilani', text: 'Usted. —No es un saludo. Lo dice como quien encuentra por fin el tornillo que le faltaba a algo que se ha caído—. «Mañana salgo hacia Poni». Claro. Claro que sí.' },
			{ say: 'calder', text: 'Señorita Kahale. —Se le borra la sonrisa, un momento. Vuelve, más pequeña—. La vi una vez, ¿sabe? Hace nueve años, en la puerta del Centro, esperando a su madre con dos malasadas. Una se le enfrió. Eso es lo que hace la luz con el tiempo: lo deja pasar.' },
			{ say: 'calder', text: 'Le debo una explicación, {jugador}. En Hauoli les pedí que miraran el cielo cuando pasara algo especial. Esto es. Necrozma. Lo que los de Poni llaman «el que se come la luz».' },
			{ say: 'calder', text: 'Durante milenios ha acaparado la luz de esta región. La toma y la suelta cuando quiere. Mientras, en Kalos hay barrios sin electricidad. En Kanto, hospitales que racionan las lámparas. —Señala el anillo—. Lemnis solo le pide que comparta. Que devuelva un poco de lo que nunca fue suyo.' },
			{ say: 'calder', text: 'Y una cosa más, ya que está aquí. Su Pulsera Z. —Te mira la muñeca—. ¿Sabe de dónde sale esa luz? De él. Los cristales Z son luz de Necrozma que se quedó en la tierra hace muchísimo. Y su Piedra Llave, la de Kalos… es la misma luz. Con distinto acento.' },
			{ if: 'has("megaring")', then: [
				{ text: 'Tu muñeca. La Pulsera Z y la Megapulsera, juntas. Las dos piedras tienen, por dentro, el mismo brillo raro, como una gota de luz atrapada. Te acuerdas de Kukui poniéndolas a contraluz.' },
			] },
			{ say: 'calder', text: 'Ciprés y Kukui creen que es una hipótesis. No lo es. Es la misma luz. La de su pulsera, la de ese anillo y la que necesitan millones de casas. La luz es de quien la mira.' },
			{ say: 'calder', text: 'Para estabilizar el umbral hace falta el anclaje de la señorita Kahale: el de tres pinzas. Por eso le ofrecí buscar a su madre, en Æther. No fue un truco. Fue lo único sincero que se dijo en aquel laboratorio.' },
			{ prompt: 'Leilani se ha quedado callada. Aprieta los planos contra el pecho.', choice: [
				{ text: '«No le vuelvas a ofrecer nada. A ella no.»', then: [
					{ af: { leilani: 2 } },
					{ say: 'calder', text: '…—Te mira. Luego a ella. Se quita las gafas—. Tiene razón. Ofrecerle eso a ella es como ofrecerle agua a quien se ahoga. Lo siento, señorita Kahale.' },
					{ text: 'Leilani no dice nada. Pero se pone a tu lado. Exactamente a tu lado, hombro con hombro.' },
				] },
				{ text: 'No interrumpir. Escuchar hasta el final.', then: [
					{ say: 'leilani', text: '«Sincero». —Se ríe por la nariz, sin gracia—. Usted me dijo que algún día me lo contaría. Apúntese esto: hoy es algún día.' },
				] },
			] },
			{ say: 'calder', text: 'Hagamos esto bien, {jugador}. Usted quiere soltarlo. Yo necesito que no lo suelte. Ninguno de los dos va a convencer al otro con palabras. —Desdobla el telescopio y lo apoya contra una columna, con cuidado—. Le espero junto al anillo. Cure a su equipo. Al lado de las columnas hay un manantial.' },
			{ text: 'Calder vuelve junto al anillo. Se queda mirando el agujero del aire, de espaldas, con las manos en los bolsillos. Como en Hauoli. Como si estuviera mirando una estrella.' },
			{ intel: { npc: 'calder', text: 'En el Altar del Sol y de la Luna, el Nodo 04 de Lemnis drena la luz de Necrozma hacia un ultraumbral abierto. Calder: «Es la misma luz» (cristales Z, Piedra Llave y la del anillo). Firmó el informe del umbral de Malia Kahale.' } },
		],
		b05_altar_manantial: [
			{ text: 'Entre las dos columnas talladas, el agua baja de la piedra en un hilo fino y forma una pila natural. Está tan fría que duele, y luego deja de doler.' },
			{ heal: 'Tus Pokémon beben del manantial del Altar. Se levantan con fuerzas renovadas.' },
		],

		// =================== EL ALTAR: CALDER ===================
		b05_calder_reto: [
			{ say: 'calder', text: '¿List{o|a|e}? No, no me conteste. Nadie está listo para esto. Yo llevo nueve años sin estarlo.' },
			{ prompt: 'Calder espera junto al anillo.', choice: [
				{ text: 'Curar al equipo en el manantial y empezar.', then: [
					{ heal: 'Tus Pokémon beben del manantial del Altar, entre las columnas. El agua está tan fría que duele. Luego deja de doler.' },
					{ call: 'b05_calder_combate' },
				] },
				{ text: '«Empecemos.»', then: [{ call: 'b05_calder_combate' }] },
				{ text: 'Todavía no', then: [{ say: 'calder', text: 'Tómese su tiempo. Él no tiene el suyo, pero usted sí. Es una de las cosas injustas del universo. Hay muchas.' }] },
			] },
		],
		b05_calder_revancha: [
			{ say: 'calder', text: 'Ha vuelto. —No se gira—. Claro que ha vuelto. Las cosas que importan siempre vuelven. Como los cometas. Como yo, a este sitio, cada noche, durante tres semanas.' },
			{ if: 'flag.b05_calder_perdio_2', then: [
				{ say: 'calder', text: 'Mi Starmie le tiene ya cariño. Eso no le ayuda a usted, pero quería decírselo.' },
			] },
			{ prompt: 'Calder espera junto al anillo.', choice: [
				{ text: 'Curar al equipo en el manantial y empezar.', then: [
					{ heal: 'Tus Pokémon beben del manantial del Altar. Se levantan con fuerzas renovadas.' },
					{ call: 'b05_calder_combate' },
				] },
				{ text: '«Otra vez.»', then: [{ call: 'b05_calder_combate' }] },
				{ text: 'Todavía no', then: [{ say: 'calder', text: 'Aquí estaré. Mirando. Es lo que mejor se me da. Lo peor también.' }] },
			] },
		],
		b05_calder_combate: [
			{ battle: 'calder_1', lose: 'continue',
				onWin: [{ call: 'b05_calder_vencido' }],
				onLose: [{ call: 'b05_calder_perder' }] },
		],
		b05_calder_perder: [
			{ set: { 'flag.b05_calder_perdio_2': true }, cond: 'flag.b05_calder_perdio' },
			{ set: { 'flag.b05_calder_perdio': true } },
			{ text: 'Tu último Pokémon cae. Calder no sonríe. Recoge a su Starmie, le limpia una punta con la manga de la chaqueta y lo devuelve a su Poké Ball.' },
			{ say: 'calder', text: 'No he venido a ganarle a usted. He venido a terminar algo. —Mira el agujero del aire—. Señorita Kahale, ¿podría…?' },
			{ say: 'leilani', text: 'No me hable. —Pero abre la caja de herramientas y saca un puñado de pociones, de las buenas, con la etiqueta pintada a mano—. Estas son para {jugador}. No para usted.' },
			{ heal: 'Leilani reparte pociones entre tu equipo, una a una, sin mirar a Calder. Le tiemblan un poco las manos. A las pociones, no.' },
			{ say: 'leilani', text: 'Otra vez. Y esta vez no te dejes. ¿Sí o qué?' },
		],
		b05_calder_vencido: [
			{ if: 'flag.b05_calder_vencido', then: [{ end: true }] },
			{ set: { 'flag.b05_calder_vencido': true } },
			{ text: 'El Starmie de Calder se apaga en el suelo, con un parpadeo. Calder se queda quieto un momento. Luego se arrodilla junto a él y le pone la mano encima de la gema, como quien comprueba si una estufa sigue caliente.' },
			{ text: 'Detrás, el anillo de Lemnis chirría. Algo se ha roto en él durante el combate. Los cables que sujetan a Necrozma se aflojan uno a uno, con un chasquido, y caen al suelo. Pero la luz robada no vuelve: está atrapada en el centro del anillo, en una **esfera** de cristal y metal, del tamaño de una cabeza, que quema la vista.' },
			{ text: 'La esfera se raja. Una grieta finísima, de arriba abajo. Por la grieta se escapa un hilo de luz blanca que silba.' },
			{ say: 'leilani', text: '¡El condensador! ¡Si se rompe así, de golpe, la luz se va a cualquier sitio! ¡Al cielo, al mar, a ninguna parte! ¡Y la criatura se queda vacía para siempre!' },
			{ if: LUC, then: [
				{ text: '{riolu} no espera a que se lo digas. Corre hasta el anillo, pone las dos palmas sobre la esfera rajada y **aprieta**. El aura le sale de golpe, azul, y envuelve el cristal como unas manos que sujetan un vaso roto.' },
				{ text: 'La grieta deja de crecer. El silbido baja. {riolu} tiembla entero, con los pies clavados en la piedra, pero no suelta. No va a soltar.' },
				{ say: 'leilani', text: '¡Lo está sujetando! ¡Lo está sujetando con el aura! —Se arrodilla junto a él, con un destornillador en la boca—. ¡Aguanta, grandullón! ¡Aguanta un minuto y te hago una estatua!' },
				{ happy: { who: 'riolu', n: 10 } },
			], else: [
				{ text: 'Leilani suelta una Poké Ball. Su **Magnezone** sale zumbando, se pega a la esfera rajada con los imanes y la sujeta con un campo que hace temblar el aire. La grieta deja de crecer.' },
				{ say: 'leilani', text: '¡Aguanta, Magnezone! ¡Un minuto! ¡Un minuto y te pulo los tornillos!' },
			] },
			{ text: 'Calder se levanta. Mira la esfera. Mira a Leilani. Y entonces dice algo que no le has oído decir nunca: nada. Se queda callado mucho rato.' },
			{ say: 'leilani', text: 'Usted estaba con ella. Esa noche. —No es una pregunta—. Firmó el informe. «Colapso espontáneo». Me dijo que algún día me lo contaría. La profe Pimpinela nunca se lo creyó.' },
			{ if: CARTA, then: [
				{ prompt: 'Tienes la carta de Malia en la mochila.', choice: [
					{ text: 'Leer en voz alta la última línea de la carta.', then: [
						{ set: { 'flag.b05_carta_calder': true } },
						{ text: 'Sacas el sobre amarillo. Leilani lo reconoce y se le corta la respiración. Lees solo una línea, despacio.' },
						{ text: '«Si alguien cierra la puerta, que sea Calder; él sabrá por qué».' },
						{ say: 'calder', text: '…—Cierra los ojos. Mucho rato—. Me lo dijo. Me lo dijo esa noche, por la radio. No sabía que lo había dejado escrito. Claro que lo dejó escrito. Lo dejaba todo escrito.' },
					] },
					{ text: 'Esperar a que hable él.', then: [
						{ text: 'No sacas la carta. Esperas. Calder te mira la mochila, como si supiera lo que hay dentro.' },
					] },
				] },
			] },
			{ say: 'calder', text: 'No fue espontáneo. —Se sienta en el borde del anillo, con las manos colgando entre las rodillas—. Malia entró con el anclaje, el suyo, señorita Kahale, el de tres pinzas. Empezó a coser el umbral desde dentro. Iba bien. Iba muy bien.' },
			{ say: 'calder', text: 'Y entonces el umbral se aceleró. Crecía más deprisa de lo que ella cosía. Se iba a tragar el puerto, el taller, su colegio. Por la radio me dijo: «Ciérralo tú, Calder. Desde ahí. Ahora». Yo le dije que no. Que esperara. Que la sacaba.' },
			{ say: 'calder', text: 'Me dijo: «Tú sabes por qué». Y lo sabía. Si no lo cerraba, se perdía la bahía entera. Si lo cerraba, se perdía ella.' },
			{ say: 'calder', text: 'Lo cerré yo, Lani. —Se le escapa el nombre; no lo corrige—. Con esta mano. —Se la mira—. Escribí «espontáneo» porque no quería que usted creciera sabiendo que fue una mano. Y porque no quería que fuera la mía.' },
			{ set: { 'flag.b05_calder_verdad': true } },
			{ text: 'Leilani no se mueve. No llora. Tiene el destornillador en la mano y lo aprieta tanto que se le ponen blancos los nudillos.' },
			{ say: 'calder', text: 'Llevo nueve años mirando el cielo por si se abre otra vez. Lemnis me ofreció luz suficiente para abrir una ventana estable. Un minuto. Para mirar. —Señala la esfera—. Hay millones de casas que necesitan esta luz. Y hay una persona que la necesito yo. No sé cuál de las dos cosas me trajo aquí. Las dos son verdad.' },
			{ text: 'Por el camino del Cañón llegan pasos. Muchos. Un chico rubio con la sudadera negra y la capucha bajada, sin aliento, seguido de tres empleados de blanco con maletines. **Gladio**.' },
			{ say: 'gladio', text: 'Dije que me quedaba. Me he pasado la noche leyendo lo que firmó Fabio. No he podido. —Recupera el aire—. Æther vendió los datos. Æther responde por lo que se hizo con ellos. —Mira la esfera rajada, a Necrozma, a Calder. Aprieta la mandíbula—. Llego tarde. Como siempre.' },
			{ if: 'flag.b05_codigo_cero', then: [
				{ text: 'Gladio te mira el cinturón, donde llevas la Poké Ball de Código Cero. Un segundo. Asiente, muy poco. No dice nada.' },
			] },
			{ text: 'Y ahí está. La luz robada, en una esfera rajada que alguien sujeta con todas sus fuerzas. Necrozma, suelto, sin fuerzas para levantarse. El agujero del aire, temblando. Y tres manos tendidas.' },
			{ say: 'calder', text: 'Désela a ella. A la señorita Kahale. Con el Ride Gear y esa luz, la ventana se abre un minuto. Lo que hay al otro lado… —no termina—. Necrozma vivirá. Débil, pero vivirá. Se lo prometo. Es lo único que todavía puedo prometer.' },
			{ say: 'gladio', text: 'Dánosla a nosotros. Æther tiene médicos de verdad. Se la devolveremos poco a poco, sin romperle nada. —Se le quiebra algo en la voz—. Sé lo que estoy pidiendo. Sé lo que guardó mi familia en ese edificio. Por eso lo pido yo, y no otro.' },
			{ if: LUC, then: [
				{ text: '{riolu} no habla. No puede: tiene las dos manos en la esfera. Pero gira la cabeza hacia Necrozma, que está tirado en el suelo del Altar, y luego hacia ti. Y su aura, sin soltar el cristal, se estira un poco hacia la criatura. Como un brazo.' },
			], else: [
				{ text: 'Necrozma, en el suelo del Altar, abre los ojos. Te mira. No pide nada. No le quedan fuerzas para pedir.' },
			] },
			{ say: 'leilani', text: 'Yo no te voy a pedir nada. —Te mira. Tiene los ojos secos y rojos—. No me hagas pedírtelo. Decide tú. Por favor. Yo no puedo.' },
			{ prompt: 'La esfera silba. ¿A quién devuelves la luz?', choice: [
				{ text: 'A Necrozma. Es suya.', then: [{ call: 'b05_luz_necrozma_esc' }] },
				{ text: 'A Æther, para que se la devuelvan poco a poco.', then: [{ call: 'b05_luz_aether_esc' }] },
				{ text: 'A Leilani. Que abra la ventana.', then: [{ call: 'b05_luz_leilani_esc' }] },
			] },
			{ call: 'b05_altar_cierre' },
		],

		// =================== LA DECISIÓN: A NECROZMA ===================
		b05_luz_necrozma_esc: [
			{ set: { 'flag.b05_luz_necrozma': true } },
			{ rep: { alola: 10 } },
			{ af: { leilani: -3 } },
			{ cutscene: { bg: { type: 'ruins', far: '#3a3a5a', ground: '#d8d0c0', fissure: true }, time: 'tarde', start: 'light', cam: 'still', frames: [
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.3 }, { mon: 'necrozma', key: 'nz', at: 0.72, size: 'l', dim: true }], on: 'rio', fx: 'glow', cam: 'push', text: 'Asientes. {riolu} entiende antes de que termines. Gira la esfera entre las palmas, despacio, y apunta la grieta hacia Necrozma. Como quien apunta una manguera.' },
				{ cond: '!(' + LUC + ')', actors: [{ mon: 'magnezone', key: 'mz', at: 0.3 }, { mon: 'necrozma', key: 'nz', at: 0.72, size: 'l', dim: true }], on: 'mz', fx: 'glow', cam: 'push', text: 'Asientes. Leilani traga saliva y le dice algo a su Magnezone. El Magnezone gira la esfera, despacio, y apunta la grieta hacia Necrozma.' },
				{ fx: ['beam', 'ripple'], color: '#ffffff', on: 'nz', cam: 'still', text: 'La luz sale por la grieta en un chorro blanco, recto, y entra en Necrozma por todos los prismas a la vez. El cristal negro se vuelve gris. Luego, transparente. Luego, de todos los colores.' },
				{ actors: [{ key: 'nz', dim: false, do: 'float' }], on: 'nz', fx: ['rays', 'sparkle'], shake: 2, cam: 'pan-up', text: '**Necrozma** se levanta. Entero. Despliega los brazos como dos alas de cristal y **ruge**: un sonido que no es un sonido, que se te mete en los dientes y en los huesos.' },
				{ on: false, fx: 'flash', weather: 'none', cam: 'pull', text: 'Y el cielo de Alola vuelve. De golpe. No despacio, como los otros días: de golpe, como cuando se enciende la luz de una habitación. Azul. Naranja. El atardecer entero, que llevaba tres semanas sin poder ponerse.' },
				{ actors: [{ key: 'nz', remove: true, exit: 'up' }], fx: 'flash', cam: 'pan-up', text: 'Necrozma no mira a nadie. No da las gracias. Sube hacia el agujero del aire y lo cruza sin volverse, como quien vuelve a su casa después de un mal día. No está agradecido. Está entero.' },
				{ actors: [{ id: 'leilani', at: 'right', enter: 'fade', dim: false }], cam: 'push', fx: 'heartbeat', color: '#e9e8e0', text: 'Al pasar Necrozma, el ultraumbral se abre del todo, un segundo. Al otro lado: un desierto blanco, sin sombras, bajo un cielo sin sol. Nada más. Leilani lo mira con la boca abierta.' },
				{ cam: 'still', fx: 'iris-out', on: 'leilani', text: 'El agujero se cierra. Sin ruido. Como un ojo.' },
			] } },
			{ say: 'leilani', text: '…Había un desierto. —Lo dice muy bajito—. Blanco. Un segundo. —Se sienta en el suelo—. Está bien. Está bien. Era suya. Lo sé. Lo sé, ¿eh? No digo nada. Solo… un segundo.' },
			{ say: 'calder', text: 'La luz es de quien la mira. —Mira el sitio donde estaba el agujero—. Y él la ha mirado más tiempo que nadie.' },
		],

		// =================== LA DECISIÓN: A ÆTHER ===================
		b05_luz_aether_esc: [
			{ set: { 'flag.b05_luz_aether': true, 'flag.b05_kaori_muestra': true } },
			{ rep: { alola: 3, lemnis: -5 } },
			{ cutscene: { bg: { type: 'ruins', far: '#3a3a5a', ground: '#d8d0c0', fissure: true }, time: 'tarde', start: 'light', cam: 'still', frames: [
				{ actors: [{ id: 'gladio', at: 'left', enter: 'left' }, { mon: 'necrozma', key: 'nz', at: 0.72, size: 'l', dim: true }], cam: 'push', text: 'Asientes hacia Gladio. Él no sonríe. Da una orden corta. Los empleados de blanco abren los maletines: dentro hay una cápsula de metal y cristal con un panel de lucecitas.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.4 }], on: 'rio', fx: 'glow', cam: 'still', text: '{riolu} acerca la esfera rajada a la cápsula sin soltarla, muy despacio, hasta que los dos cristales se tocan. Su aura hace de puente.' },
				{ cond: '!(' + LUC + ')', actors: [{ mon: 'magnezone', key: 'mz', at: 0.4 }], on: 'mz', fx: 'glow', cam: 'still', text: 'El Magnezone de Leilani acerca la esfera rajada a la cápsula, muy despacio, hasta que los dos cristales se tocan.' },
				{ fx: ['beam', 'sparkle'], color: '#e9f4ff', cam: 'still', text: 'La luz pasa de la esfera a la cápsula como agua de un vaso a otro. Sin derramarse. La cápsula se enciende entera, blanca, y empieza a pitar con un ritmo suave, como un corazón dormido.' },
				{ actors: [{ key: 'nz', do: 'faint' }], on: 'nz', fx: 'ripple', cam: 'push', text: 'Uno de los médicos conecta un tubo fino de la cápsula a un prisma de Necrozma. Una gota de luz. Otra. Necrozma cierra los ojos. Se enrosca sobre sí mismo. Se duerme.' },
				{ weather: 'none', cam: 'pan-up', text: 'El cielo no vuelve de golpe. Se aclara un poco. Un gris menos gris. Como una lámpara vieja que tarda en calentarse. Gladio lo mira y dice: «Días. Tardará días».' },
				{ actors: [{ id: 'leilani', at: 'right', enter: 'fade' }], fx: 'heartbeat', color: '#e9e8e0', cam: 'push', on: 'leilani', text: 'Sin la luz que lo alimentaba, el ultraumbral se encoge despacio. Antes de cerrarse, un segundo, deja ver el otro lado: un desierto blanco, sin sombras. Leilani da un paso hacia él. Luego se para.' },
				{ cam: 'still', fx: 'iris-out', on: 'leilani', text: 'El agujero se cierra. Sin ruido.' },
			] } },
			{ say: 'gladio', text: 'La devolveremos entera. Gota a gota. Lo firmo yo, con mi nombre. —Te mira—. Sé lo que vale mi nombre en esta isla. Por eso lo firmo.' },
			{ say: 'gladio', text: 'Mandaré una muestra a esa farmacéutica de Johto que estuvo en el Paraíso. La de los caramelos. Si esta luz cura algo, que lo cure.' },
			{ say: 'leilani', text: 'Días. —Mira el sitio donde estaba el agujero—. Bueno. Días. Yo llevo nueve años. Puedo con unos días más. —Se ríe, raro—. Puedo con lo que sea. Soy muy buena esperando. Es lo único que me sale a la primera.' },
			{ say: 'calder', text: 'Æther guardando luz ajena. —Lo dice sin maldad, casi con cariño—. Espero que esta vez la devuelvan, Gladio. Su madre también lo prometía.' },
			{ say: 'gladio', text: 'Por eso lo prometo yo. —No lo mira—. Y por eso lo voy a cumplir.' },
		],

		// =================== LA DECISIÓN: A LEILANI ===================
		b05_luz_leilani_esc: [
			{ set: { 'flag.b05_luz_leilani': true, 'flag.b05_malia_viva': true } },
			{ af: { leilani: 10 } },
			{ rep: { alola: -5 } },
			{ say: 'leilani', text: '¿A… mí? —Te mira como si le hubieras dado algo que pesa demasiado. Luego aprieta los dientes—. Ok. Ok. Un minuto. No me sobra ni un segundo. ¡Que nadie me hable!' },
			{ cutscene: { bg: { type: 'ruins', far: '#3a3a5a', ground: '#d8d0c0', fissure: true }, time: 'tarde', start: 'light', cam: 'still', frames: [
				{ actors: [{ id: 'leilani', at: 'left', enter: 'none' }], item: 'ridegear', on: '_c', fx: 'glow', cam: 'push', text: 'Leilani se quita el Ride Gear de la muñeca, le arranca la tapa con los dientes y conecta dos cables a la esfera rajada. Le tiemblan las manos. A los cables, no.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 0.75 }], on: 'rio', fx: 'aura', cam: 'still', text: '{riolu} sujeta la esfera. Leilani gira un botón. La luz sale por el cable, entra en el Ride Gear, y el Ride Gear la escupe hacia arriba, hacia el agujero del aire.' },
				{ cond: '!(' + LUC + ')', actors: [{ mon: 'magnezone', key: 'mz', at: 0.75 }], on: 'mz', fx: 'glow', cam: 'still', text: 'Magnezone sujeta la esfera. Leilani gira un botón. La luz sale por el cable, entra en el Ride Gear, y el Ride Gear la escupe hacia arriba, hacia el agujero del aire.' },
				{ on: false, fx: ['beam', 'quake'], shake: 2, cam: 'pan-up', text: 'El ultraumbral se abre. Del todo. Grande como una puerta de catedral. Al otro lado: un **desierto blanco**, sin sombras, bajo un cielo sin sol. Silencio. Arena que no se mueve.' },
				{ cam: 'push', fx: 'zoom', text: 'Y en el desierto, muy lejos, en lo alto de una duna, una lucecita. Pequeña. Una linterna de mano. Se enciende y se apaga.' },
				{ fx: 'heartbeat', color: '#f2c84a', cam: 'still', text: 'Corta. Corta. Corta. **Larga**.' },
				{ actors: [{ key: 'leilani', do: 'step', emote: '!' }], cam: 'push', on: 'leilani', fx: 'flash', text: 'Leilani deja de respirar. Levanta el Ride Gear hacia el agujero y aprieta la pantallita tres veces, rápido, y una vez larga. La pantalla se enciende. Se apaga. Tres cortas. Una larga.' },
				{ fx: 'heartbeat', color: '#f2c84a', cam: 'still', text: 'Al otro lado, la lucecita se queda quieta. Encendida. Muchísimo rato. Como alguien que se queda con la mano levantada. Y luego: corta, corta, corta, larga. Otra vez. Más deprisa.' },
				{ actors: [{ key: 'leilani', do: 'shake' }], fx: ['dark', 'iris-out'], on: 'leilani', cam: 'pull', text: 'La esfera se apaga. La luz se ha gastado. El agujero se cierra despacio, como un ojo que no quiere dormirse. La última lucecita que se ve, antes del final, es la de la linterna.' },
			] } },
			{ text: 'Leilani está de rodillas en la piedra del Altar, con el Ride Gear apretado contra el pecho. No hace ningún chiste. Tarda mucho en poder decir algo.' },
			{ say: 'leilani', text: '«Estoy bien. Vuelve a dormir». —Lo dice con la voz rota—. Eso significa. Tres cortas y una larga. Me lo hacía con la linterna desde el pasillo cuando yo tenía pesadillas. «Estoy bien. Vuelve a dormir».' },
			{ say: 'leilani', text: 'Está viva. Mi mamá está viva. Está ahí. —Se ríe y llora a la vez, que es algo que no sabías que se pudiera hacer tan fuerte—. Y está bien. Me lo ha dicho. Me lo ha dicho ella.' },
			{ text: 'Calder se ha sentado en el suelo. Se tapa la cara con las dos manos. Los hombros le tiemblan. No hace ruido.' },
			{ if: LUC, then: [
				{ text: '{riolu} suelta por fin la esfera apagada, que cae al suelo y se queda ahí, gris, vacía. Se acerca a Leilani y le pone una mano en el hombro. Ella se agarra a su brazo con las dos manos.' },
			] },
			{ text: 'En el círculo del Altar, Necrozma respira. Débil. Con los prismas casi apagados. Pero respira. Abre un ojo, mira el sitio donde estaba el agujero y lo vuelve a cerrar.' },
			{ say: 'leilani', text: 'Perdón. Perdón, perdón. —A Necrozma, muy bajito—. Te la devuelvo. Te lo juro. No sé cómo, pero te la devuelvo. Algún día te hago algo que te devuelva hasta la última gota.' },
		],

		// =================== EL ALTAR: CIERRE (común a las tres) ===================
		b05_altar_cierre: [
			{ text: 'Calder se queda mirando el sitio donde estaba el ultraumbral. Igual que miró el de la bahía, seguramente, hace nueve años. Con las manos en los bolsillos. Sin decir nada.' },
			{ text: 'Por la escalinata sube alguien más: la kahuna **Hela**, con el sombrero en la mano y su Mudsdale detrás. Hoy no había niebla en el Cañón.' },
			{ say: 'hela', text: 'Pues ya está. —Mira el anillo roto, a Calder, a ti—. Lo que se rompe en la isla lo arregla quien lo rompió. Tú —a Calder—, te quedas en Poni. En mi aldea. Hasta que vengan los de la policía internacional, o hasta que la isla diga. Lo que llegue antes.' },
			{ say: 'calder', text: 'Me parece justo. —Recoge su telescopio, lo pliega con cuidado y se lo pone al hombro—. Más que justo. Hace tiempo que nadie me dice dónde quedarme.' },
			{ set: { 'flag.b05_calder_poni': true } },
			{ if: 'flag.b05_luz_leilani', then: [
				{ say: 'hela', text: 'Y a esa criatura la cuido yo. Que aquí arriba se está bien. Le subiré agua. No la beberá. Da igual: se la subo.' },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ say: 'hela', text: 'Y ustedes, los de blanco. Se quedan con él, pero la isla mira. —Al Mudsdale—. Y tú también.' },
			] },
			// ----- Diario (omite a Calder y la decisión; pista: «Hoy el sujet…») -----
			{ diary: 'Hoy el sujet… ¡Hoy mi entrenador{|a|e}…! Perdón. Empiezo otra vez.\n\n¡Hoy mi entrenador{|a|e} y yo subimos a lo más alto de Isla Poni! Hay un cañón rojo enorme, con puentes de cuerda y una cueva con marcas de manos. {riolu} encontró algo que alguien dejó ahí hace muchísimo, ¡con su aura!\n\nArriba del todo está el Altar del Sol y de la Luna. Hicimos una cosa muy importante con una luz. {riolu} estuvo valientísimo. Yo, un poco asustado, pero lo disimulé.\n\nY luego el cielo cambió de color. Fue muy bonito. ¡Tengo una foto!', cond: 'flag.b01_diario && flag.b05_canon_aura && (' + LUC + ')' },
			{ diary: 'Hoy el sujet… ¡Hoy mi entrenador{|a|e}…! Perdón. Empiezo otra vez.\n\n¡Hoy mi entrenador{|a|e} y yo subimos a lo más alto de Isla Poni! Hay un cañón rojo enorme, con puentes de cuerda y una cueva con marcas de manos. {riolu} se quedó mirándolas muchísimo rato.\n\nArriba del todo está el Altar del Sol y de la Luna. Hicimos una cosa muy importante con una luz. {riolu} estuvo valientísimo. Yo, un poco asustado, pero lo disimulé.\n\nY luego el cielo cambió de color. Fue muy bonito. ¡Tengo una foto!', cond: 'flag.b01_diario && !flag.b05_canon_aura && (' + LUC + ')' },
			{ diary: 'Hoy el sujet… ¡Hoy mi entrenador{|a|e}…! Perdón. Empiezo otra vez.\n\n¡Hoy mi entrenador{|a|e} y yo subimos a lo más alto de Isla Poni! Hay un cañón rojo enorme, con puentes de cuerda y una cueva con marcas de manos.\n\nArriba del todo está el Altar del Sol y de la Luna. Hicimos una cosa muy importante con una luz. Leilani estuvo valientísima. Yo, un poco asustado, pero lo disimulé.\n\nY luego el cielo cambió de color. Fue muy bonito. ¡Tengo una foto!', cond: 'flag.b01_diario && !(' + LUC + ')' },
			{ say: 'rotom', text: '¡Bzzt! He hecho una foto. En el momento justo. ¡Mira! —La pantalla se enciende sola—. No me preguntes cómo. Me salió así.' },
			{ cutscene: { bg: { type: 'ruins', far: '#3a3a5a', ground: '#d8d0c0' }, time: 'tarde', start: 'light', frames: [
				{ cam: 'push', item: 'fotoaltar', fx: 'light', text: 'En la pantalla: el Altar del Sol y de la Luna, en el instante exacto en que la luz salió de la esfera. Una columna blanca, recta, que sube hasta el cielo y lo parte en dos colores.' },
				{ actors: [{ key: '_c', size: 'l' }], fx: ['rays', 'sparkle'], cam: 'still', text: 'Rotom le ha puesto de título «El Altar con la luz». Por una vez, la foto está tomada desde donde llevabas la Pokédex. Ni más arriba, ni más abajo.' },
			] } },
			{ give: 'fotoaltar' },
			{ quest: 'b05_m5', stage: 'hecha', done: true },
			{ text: 'Bajan por el Cañón despacio, sin hablar mucho. Leilani va delante, con la caja de herramientas. Calder, detrás, con el telescopio. Hela, al final, con su Mudsdale, como quien cierra la puerta de casa.' },
			{ go: 'aldea_marina' },
			{ text: 'Cuando llegas a la Aldea Marina, el sol está bajando. En la orilla te esperan.' },
		],

		// =================== EL ALTAR: DESPUÉS ===================
		b05_altar_despues: [
			{ if: 'flag.b05_luz_necrozma', then: [
				{ text: 'El círculo del Altar, vacío. En la piedra quedan las marcas de los cables de Lemnis, cuatro rayas negras, y las de algo de cristal que estuvo mucho tiempo apoyado ahí.' },
				{ text: 'El cielo de encima está entero. No hay agujero. Si miras mucho rato, notas que el sol de Poni brilla un poco más que el de otras islas. A lo mejor son imaginaciones. A lo mejor no.' },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ text: 'El círculo del Altar, con su valla blanca de Æther. Un empleado de guardia te saluda con la mano y sigue leyendo un libro de bolsillo. La máquina blanca pita, suave, gota a gota.' },
			] },
			{ if: 'flag.b05_luz_leilani', then: [
				{ text: 'El círculo del Altar. La esfera de Lemnis sigue ahí, en el suelo, gris y vacía, con su grieta de arriba abajo. Nadie la ha recogido. Hela dice que se queda como recuerdo. «Los recuerdos no se tiran: se pisan con cuidado».' },
			] },
			{ text: '{riolu} se queda en el borde del círculo. No entra. Mira el cielo un momento, y luego te mira a ti, como para comprobar que sigues aquí.', cond: LUC },
		],
		b05_necrozma_dormido: [
			{ if: 'flag.b05_luz_aether', then: [
				{ text: 'Necrozma duerme enroscado en el círculo, con un tubo fino conectado a un prisma de la frente. La máquina blanca le pasa luz gota a gota. Cada gota se ve entrar: un destello pequeño que se va apagando dentro del cristal.' },
				{ text: 'Hoy brilla un poco más que ayer. El empleado de guardia lo apunta en una libreta, con la hora.' },
			], else: [
				{ text: 'Necrozma descansa en el círculo, con los prismas casi apagados. A su lado hay un cuenco de agua, tres bayas y una concha. Nadie sabe quién dejó la concha. Hela dice que no fue ella.' },
				{ text: 'Cuando te acercas, abre un ojo. Te mira. No hay rencor. No hay nada. Solo cansancio, el de alguien que ha dado más de lo que tenía.' },
			] },
			{ if: LUC, then: [
				{ text: '{riolu} se sienta junto a Necrozma, sin tocarlo. El aura le brilla, muy poco, como una vela al lado de otra. Se quedan así un rato.' },
			] },
			{ say: 'rotom', text: '¡Bzzt! Necrozma no se puede capturar ahora. Bueno, se puede intentar. Pero no está bien. —Pausa—. Hay cosas que se pueden hacer y no están bien. Lo he aprendido hoy.' },
		],
		b05_escritorio_calder: [
			{ text: 'Detrás de las columnas, una mesa plegable de campaña con papeles sujetos por piedras, un termo de café frío y un cuaderno de tapas de tela gastadas. En la portada, con letra pequeña e inclinada: «Observaciones. C. W.».' },
			{ give: 'b05_diario_calder' },
			{ read: 'b05_diario_calder' },
		],

		// =================== EL FINAL: LA PLAYA AL ATARDECER ===================
		b05_final: [
			{ if: 'flag.b05_fin', then: [{ end: true }] },
			{ text: 'La playa de la Aldea Marina, al atardecer. Las casas-barco encienden sus farolillos una a una, como si se pasaran la llama de proa en proa.' },
			{ text: 'El cielo se ha encendido **entero**: rosa, naranja, violeta, todos los colores que llevaba tres semanas sin poder poner. La gente de la Aldea ha salido a las cubiertas a mirarlo. Nadie habla. Un niño aplaude. Luego aplauden todos.', cond: 'flag.b05_luz_necrozma' },
			{ text: 'El cielo está a medias: un atardecer pálido, como visto a través de un cristal sucio. Pero se pone. Hoy se pone. La gente de la Aldea lo mira desde las cubiertas y dice que mañana será un poco más bonito. Y pasado, más.', cond: 'flag.b05_luz_aether' },
			{ text: 'El cielo sigue cansado: hoy también se ha apagado un rato a media tarde, más corto que otros días. El sol baja gris, con prisa. La gente de la Aldea lo mira desde las cubiertas, encogida de hombros. «Semanas», dice Hela. «La tierra no tiene prisa».', cond: 'flag.b05_luz_leilani' },
			// ----- Leilani -----
			{ text: 'Leilani está sentada en la arena, con la caja de herramientas al lado y los pies en el agua. Cuando te sientas a su lado, no se gira.' },
			{ if: 'flag.b05_luz_leilani', then: [
				{ say: 'leilani', text: 'Me vuelvo a Kantai en la barcaza de mañana. Tengo que hacer una cosa. —Se mira las manos—. Tengo una lámpara debajo de la cama. A medio terminar. Desde niña. Mi mamá lo sabía. Claro que lo sabía.' },
				{ say: 'leilani', text: 'No la voy a terminar todavía. Pero la voy a sacar de debajo de la cama. Eso ya es algo, ¿no? ¿Sí o qué?' },
				{ say: 'leilani', text: 'Gracias. —Muy bajito—. No lo digo bien. Nunca digo bien las cosas importantes. Te hago algo. Algún día. Algo que no explote. Bueno, que explote poco.' },
			] },
			{ if: 'flag.b05_luz_necrozma', then: [
				{ say: 'leilani', text: 'Lo entiendo, ¿eh? Lo entiendo. Era suya. Si a mí me hubieran quitado la luz tres semanas, también querría que me la devolvieran entera. —Se le quiebra la voz, solo un poco—. Pero había un desierto. Y yo lo he visto. Un segundo.' },
				{ say: 'leilani', text: 'Si hay un desierto, hay un sitio. Y si hay un sitio, se puede ir. Eso me lo enseñó ella. —Se seca la cara con la manga del overol, que está llena de grasa, y se mancha entera—. Voy a construir una puerta. Una buena. Mía. Tardaré lo que tarde.' },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ say: 'leilani', text: 'Gladio me ha dicho que me deja ver los datos. Los de la cápsula. Todos. —Se ríe por la nariz—. Un Gladio que comparte. Lo apunto en el calendario.' },
				{ say: 'leilani', text: 'Había un desierto. Lo vi. Un segundo. —Mira el mar—. Y ahora sé cuánto tarda en cerrarse una puerta así. Eso es un dato. Con datos se hacen planos. Con planos se hacen cosas.' },
			] },
			{ if: 'flag.b05_calder_verdad', then: [
				{ say: 'leilani', text: 'Y lo de Calder… —Pausa larga—. No sé. No lo sé todavía. Cerró la puerta. Y ella se lo pidió. Y me vio esperándola con dos malasadas y no me dijo nada en nueve años. Las tres cosas. —Hunde los pies en la arena—. Pregúntamelo en otro momento. En otro año, a lo mejor.' },
			] },
			{ text: 'Se levanta, se sacude la arena, agarra la caja de herramientas. La caja no se mueve. Tira otra vez. Se mueve.' },
			{ say: 'leilani', text: 'Nos vemos en Kantai. Pásate por el taller. Tengo ideas. Muchas. Malísimas. Te van a encantar.' },
			{ text: 'Y se va por la pasarela, tambaleándose, hablando sola o con la caja. Antes de doblar la esquina del barco-Centro, se gira y te saluda con la llave inglesa.' },
			// ----- A.Z. -----
			{ text: 'Cuando vuelves la vista al mar, no estás sol{o|a|e} en la orilla.' },
			{ text: 'Un hombre enorme, tan alto que las casas-barco parecen de juguete a su lado, mira el horizonte con los pies en el agua. El pelo blanco, larguísimo, le baja por la espalda. En su hombro, una Floette con una flor roja, con los ojos entornados por la luz.' },
			{ text: 'No sabes cómo ha llegado a Alola. Tampoco esta vez te lo va a decir.' },
			{ if: LUC, then: [
				{ text: '{riolu} se le acerca y se queda a su lado, mirando el mar con él, sin decir nada. La Floette baja del hombro del hombre y se sienta en la cabeza de {riolu}, como en Celeste. {riolu} cierra los ojos.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
			{ if: 'flag.b05_luz_necrozma', then: [
				{ say: 'az', text: 'Alguien ha devuelto algo. —Mira el cielo encendido—. Eso pasa poco. Muy poco. Lo he visto tres veces en tres mil años. Hoy, cuatro.' },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ say: 'az', text: 'Guardar algo para devolverlo después. —Mira el cielo pálido—. Yo también lo prometí una vez. Hace mucho. Lo cumplí. Tardé tres mil años.' },
			] },
			{ if: 'flag.b05_luz_leilani', then: [
				{ say: 'az', text: 'Has gastado una luz entera en una sola persona. —Mira el cielo cansado. No suena a reproche—. A veces una sola persona es todo lo que hay. Yo gasté una máquina entera en una flor.' },
			] },
			{ say: 'az', text: 'El cielo se apaga cuando alguien se come la luz. Lo vi apagarse así una vez, sobre un reino. —Acaricia la flor de la Floette con un dedo enorme—. No era este cielo. Era el mío.' },
			{ choice: [
				{ text: '«¿Se ha acabado?»', then: [
					{ say: 'az', text: 'Aquí, hoy. —Te mira por primera vez—. Pero la cuenta sigue abierta. La luz que no se acaba siempre la paga alguien. Hoy no la ha pagado él. Buscarán quién.' },
				] },
				{ text: '«¿Quién eres?»', then: [
					{ say: 'az', text: 'Alguien que llegó tarde a todo. —Pausa—. Menos a esto. A esto he llegado a tiempo de verlo.' },
				] },
				{ text: 'Mirar el mar con él, sin decir nada.', then: [
					{ text: 'El sol toca el agua. Ninguno de los dos dice nada en mucho rato. Las olas suben y bajan, les mojan los pies y se van.' },
					{ say: 'az', text: 'La cuenta sigue abierta. —Lo dice al final, sin mirarte—. Siempre la paga alguien.' },
				] },
			] },
			{ text: 'La Floette vuelve a su hombro. El hombre se mete en el mar hasta las rodillas y camina por la orilla, despacio, hacia el oeste. Cuando una ola te salpica la cara y parpadeas, ya no está. En la arena, donde estaba, una flor roja. No se marchita.' },
			{ set: { 'flag.b05_az_poni': true } },
			{ say: 'rotom', text: '¡Bzzt! Nada. Ni foto, ni ficha, ni huella. Cinco veces ya. —Pausa—. Le voy a poner una ficha a mano: «Hombre muy alto. Flor roja. Siempre llega cuando ya ha pasado lo importante».' },
			// ----- Renata -----
			{ text: 'La Pokédex vibra. Llamada entrante. Un número de Teselia con un emoji de micrófono.' },
			{ say: 'renata', as: 'Renata (llamada)', text: '¡Testigo! ¿Estás en una playa? Oigo olas. Odio que la gente esté en playas cuando yo estoy en un sótano. Cool, cool, cool. Muy cool para ti.' },
			{ if: 'flag.b03_renata_publica', then: [
				{ say: 'renata', as: 'Renata (llamada)', text: 'El episodio del prototipo de Trigal tiene ya un millón de escuchas. Y tres cartas de abogados. Las tengo enmarcadas. Pero me han vaciado la carpeta de Olmedo, y donde no hay papeles, hay que buscar personas.' },
			] },
			{ if: '!flag.b03_renata_publica', then: [
				{ say: 'renata', as: 'Renata (llamada)', text: 'Me esperé, como dijiste. Y esperar dio fruto: «Proyecto Arco II · Teselia». El expediente de Olmedo me trajo a casa. Literalmente. Está aquí. En Teselia. A dos paradas de metro.' },
			] },
			{ say: 'renata', as: 'Renata (llamada)', text: 'Nota para el episodio: el próximo se graba en tu siguiente destino. Y tu siguiente destino, según una fuente que no voy a revelar, es mi región. Prepárate. Te voy a entrevistar. Mucho. Con micrófono.' },
			{ say: 'renata', as: 'Renata (llamada)', text: 'Ah, y oye: tu Rotom escribe un diario, ¿no? Algún día me lo tienes que leer. —Se ríe—. ¡Bueno, cuelgo! ¡Me llaman los del sótano!' },
			{ text: 'La llamada se corta. La pantalla de la Pokédex se queda en blanco un segundo. Solo un segundo. Luego vuelve el menú, como siempre.' },
			{ set: { 'flag.b05_renata_llamada': true } },
			{ intel: { npc: 'renata', text: 'Desde Teselia: el próximo episodio de Casos Fríos «se graba en tu siguiente destino». El rastro de Matías Olmedo lleva al Proyecto Arco II. Quiere que algún día le leas el diario de tu Rotom.' } },
			// ----- La Gira: Teselia -----
			{ text: 'Y otra vez la Pokédex. Una notificación de la Gira, para todos los inscritos.' },
			{ say: 'rotom', text: '¡Bzzt! «La Gira Interregional agradece a Alola su hospitalidad. Próximo destino: **Teselia**. Rascacielos, puentes, una región entera que no duerme… y una Puerta Lemnis nueva en **Ciudad Porcelana**. Detalles muy pronto».' },
			{ say: 'rotom', text: '¡Teselia! ¡La región de Renata! ¡Y de los puentes! Me han dicho que hay un puente que canta cuando sopla el viento. Yo también canto cuando sopla el viento. Bueno, pito. Es casi lo mismo.' },
			{ if: LUC, then: [
				{ text: '{riolu} se sienta en la orilla, a tu lado, con los pies en el agua tibia. Mira el sol, que ya casi no está. Te apoya la cabeza en el hombro. Esta vez no hace como si no hubiera pasado. Se queda.' },
				{ happy: { who: 'riolu', n: 5 } },
			] },
			{ cap: 62 },
			{ set: { 'flag.b05_fin': true } },
			{ save: true },
			{ text: '**Fin del Acto IV.**' },
			{ text: '*La historia continúa…*' },
		],

		// =================== DESPUÉS DEL FINAL: CALDER EN EL MUELLE ===================
		b05_calder_muelle: [
			{ set: { 'flag.b05_calder_muelle': true } },
			{ text: 'Calder está sentado en el borde del muelle, con los pies colgando sobre el agua y una red de pesca enredada en el regazo. La está arreglando. Nudo a nudo. A su lado, a dos metros exactos, el Mudsdale de Hela lo vigila sin parpadear.' },
			{ say: 'calder', text: 'Buenas tardes, {jugador}. La kahuna me ha dado trabajo. Dice que quien rompe algo en la isla tiene que arreglar algo de la isla. Empecé por las redes. —Levanta un nudo perfecto—. Se me dan bien. Quién lo iba a decir.' },
			{ if: 'flag.b05_luz_leilani', then: [
				{ say: 'calder', text: 'Está viva. —Lo dice mirando la red—. Nueve años. Y está viva, y está bien, y le ha dicho a su hija que vuelva a dormir. —Se le quiebra la voz, un instante—. No sé qué hacer con esto. Llevo nueve años sabiendo qué hacer con la culpa. Con esto no sé.' },
			] },
			{ if: 'flag.b05_luz_necrozma', then: [
				{ say: 'calder', text: 'Hoy el cielo está más bonito que nunca. Lo he mirado entero, de punta a punta. —Sonríe, cansado—. Tenía usted razón. Era suya. Yo lo sabía. Lo sabía y le puse un anillo igual.' },
			] },
			{ if: 'flag.b05_luz_aether', then: [
				{ say: 'calder', text: 'Los de Æther suben cada mañana. Me saludan. Gladio no. Hace bien. —Tira de un hilo—. Espero que la devuelvan. Espero que, por una vez, alguien devuelva lo que guarda.' },
			] },
			{ say: 'calder', text: 'Tenga. —Te tiende un cristal violeta con forma de rombo—. El **Psicostal Z**. Era de mi Starmie. Ya no lo necesitamos: no vamos a pelear más. Y a usted le gusta que la luz vaya donde tiene que ir.' },
			{ give: 'psychiumz' },
			{ say: 'calder', text: 'Una cosa más, ya que no me preguntará. Yo no inventé el Programa Ultra. Me lo ofrecieron. Me encontraron, más bien: sabían exactamente qué ofrecerme. —Mira el mar—. Eso no me excusa. Pero alguien en Lemnis sabe mucho de lo que le falta a cada uno. Tenga cuidado con lo que le falta a usted.' },
			{ intel: { npc: 'calder', text: 'Calder se queda en la Aldea Marina bajo la custodia de Hela. Cerró el ultraumbral de Malia Kahale hace nueve años, a petición de ella, y firmó «colapso espontáneo». Del Programa Ultra: «Me encontraron. Sabían exactamente qué ofrecerme».' } },
		],
		b05_calder_muelle_2: [
			{ say: 'calder', text: 'Buenas noches. Hoy he arreglado cuatro redes y he contado once estrellas antes de que oscureciera del todo. —Sigue con los nudos—. Es más de lo que contaba en Kalos. Allí hay demasiada luz para ver la luz.' },
		],

		// =================== PREMIO DE LAS CASAS-BARCO ===================
		b05_premio_marina: [
			{ say: 'marinera_poni', as: 'La capitana de la casa-barco grande', text: 'Tres. Y no te has caído al agua ni una vez. Eso aquí no lo hace nadie. Ni yo. —Escupe al agua, que es como aplaude ella—. Ven, que te doy lo de la Aldea.' },
			{ text: 'De un cofre de madera con olor a salitre saca un disco envuelto en una tela con conchas cosidas.' },
			{ say: 'marinera_poni', as: 'La capitana de la casa-barco grande', text: 'Los Gastrodon de la bahía, cuando se enfadan, levantan el fondo del mar y lo tiran encima del que tengan delante. Agua y tierra juntas. Como Poni. Como nosotros: vivimos en el agua y enterramos a los nuestros en la arena.' },
			{ give: 'b05_mt_agua_lodosa' },
			{ say: 'marinera_poni', as: 'La capitana de la casa-barco grande', text: '**Agua Lodosa**. Mancha, pero limpia. Ya me entenderás.' },
		],
	},

	// =====================================================================
	// TIENDAS
	// =====================================================================
	shops: {
		tienda_marina: { name: 'Barco-tienda de la Aldea Marina', items: ['pokeball', 'greatball', 'ultraball', 'diveball', 'netball', 'duskball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'fullheal', 'maxrepel', 'maxether'] },
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		b05_diario_calder: { name: 'Cuaderno de Calder Wynn', pocket: 'key', desc: 'Un cuaderno de tapas de tela gastadas, con «Observaciones. C. W.» en la portada. Huele a café frío. Lo encontraste en la mesa de campaña del Altar.',
			read: '*(Letra pequeña, inclinada, muy ordenada. Casi todo son cifras: horas, ángulos, magnitudes. Entre las cifras, de vez en cuando, frases.)*\n\n---\n\n**Hace nueve años. Bahía de Kantai. 23:41.**\n\nCerrado. El umbral está cerrado.\n\nNo puedo escribir nada más esta noche. Mañana escribo el informe. Mañana.\n\n---\n\n**Hace nueve años. Dos días después.**\n\n«Colapso espontáneo». Lo he escrito tres veces. Las tres me temblaba la mano. Pimpinela me ha mirado la mano. No ha dicho nada. Pimpinela nunca dice nada cuando lo sabe todo.\n\nPimpinela riega la planta de la mesa de M. todos los días. Dice que se lo prometió. No le pregunto a quién.\n\n---\n\n**Hace ocho años.**\n\nDejo el CID. No puedo pasar por delante de su mesa.\n\n---\n\n**Hace dos años.**\n\nMe han ofrecido un puesto en Lemnis. «Programa Ultra». Dicen que tienen los datos de Æther: nueve años de umbrales de Alola, todos. Dicen que con la luz adecuada se puede abrir una ventana estable. Mirar al otro lado. Un minuto.\n\nNo me han preguntado qué quiero mirar. Ya lo sabían.\n\nEl hombre que me hizo la oferta dejó un caramelo de menta en la mesa al irse, envuelto en papel azul. Muy amable. No recuerdo su cara. Recuerdo el caramelo.\n\n---\n\n**Hace tres semanas. Altar del Sol y de la Luna.**\n\nNodo 04 operativo. La luz sale de la criatura como agua de una presa rota. Es preciosa. No debería escribir que es preciosa.\n\nEl cielo de Poni se apaga a media tarde. La gente de la Aldea mira hacia arriba y suspira. Cada día un poco más.\n\nMillones de casas. Me lo repito. Millones de casas.\n\n---\n\n**Hace una semana.**\n\nHe dado una charla en Hauoli. He visto a un{|a|e} entrenador{|a|e} de la Gira con un Pokémon que veía una luz que yo no veo. Le he dicho que mirara el cielo cuando pasara lo especial.\n\nOjalá no mire. Ojalá mire. Las dos cosas.\n\n---\n\n**Ayer.**\n\nLani está en la isla. La he visto desde arriba, con el telescopio, en una pasarela de la Aldea, peleándose con una tuerca.\n\nSe ríe igual que ella. Como un motor que no arranca.\n\nNo voy a poder hacerlo mirándola.\n\n*(La página siguiente está en blanco.)*' },
		fotoaltar: { name: 'Foto «El Altar con la luz»', pocket: 'key', art: 'altar_luz', desc: 'La foto que hizo Rotom en el Altar del Sol y de la Luna: una columna de luz blanca que sube desde el círculo de piedra y parte el cielo en dos colores. Rotom dice que es la única foto que ha hecho «desde el sitio correcto».' },
		b05_mt_rayo_meteorico: { name: 'MT Rayo Meteórico', pocket: 'machines', tm: 'meteorbeam', desc: 'El usuario concentra energía cósmica y la descarga en el segundo turno; sube su Ataque Especial. Un disco de estrella caída tallado a mano, de la gruta de las manos del Cañón de Poni.' },
		b05_mt_agua_lodosa: { name: 'MT Agua Lodosa', pocket: 'machines', tm: 'muddywater', desc: 'El usuario ataca con agua fangosa a los rivales. Puede bajarles la precisión. Premio de las casas-barco de la Aldea Marina.' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b05_marina_pesca: {
			name: 'La pasarela de pesca de la Aldea', icon: '🎣', hours: 18, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'mar', hint: 'Lo que pica en la bahía de Poni tira hacia el fondo. Espera el «!» y aguanta.', wild: [{ sp: 'dhelmise', lv: [57, 59], w: 5 }, { sp: 'wailmer', lv: [56, 58], w: 4 }, { sp: 'relicanth', lv: [58, 59], w: 1 }], wildChance: 0.3 },
			ask: 'Una pasarela de tablas entre dos casas-barco, con cañas de bambú apoyadas contra la barandilla y un cartel: «Se prestan. Se devuelven. Si no se devuelven, se sabe».',
			text: 'Recoges lo que la bahía suelta hoy. Una vecina te mira desde la cubierta de al lado y asiente: has devuelto la caña.',
			wait: 'Hoy la bahía ya ha dado lo suyo. Las cañas están secándose al sol.',
			table: [
				{ id: 'pearl', w: 16, n: [1, 2] }, { id: 'shoalsalt', w: 14, n: [1, 2] }, { id: 'shoalshell', w: 12, n: [1, 2] },
				{ id: 'bigpearl', w: 8, n: [1, 1] }, { id: 'heartscale', w: 6, n: [1, 1] }, { id: 'starpiece', w: 4, n: [1, 1] },
				{ id: 'pearlstring', w: 2, n: [1, 1], rare: true }, { id: 'waterstone', w: 2, n: [1, 1], rare: true },
			],
		},
		b05_canon_veta: {
			name: 'La pared de capas del Cañón', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 2, theme: 'cantera', hint: 'La roca del Cañón tiene capas. Lo bueno suele estar en la negra, la fina.' },
			ask: 'Una pared de roca roja, ocre y negra, a capas, junto a la placa vieja del CID. En la capa negra, algo brilla.',
			text: 'La pared de capas suelta lo suyo. La placa del CID sigue diciendo «tocar con cuidado».',
			wait: 'La pared de capas está quieta. Mejor dejarla un día; las capas no tienen prisa.',
			table: [
				{ id: 'hardstone', w: 14, n: [1, 1] }, { id: 'stardust', w: 14, n: [1, 2] }, { id: 'everstone', w: 8, n: [1, 1] },
				{ id: 'starpiece', w: 6, n: [1, 1] }, { id: 'moonstone', w: 4, n: [1, 1] }, { id: 'rarebone', w: 4, n: [1, 1] },
				{ id: 'dawnstone', w: 2, n: [1, 1], rare: true }, { id: 'cometshard', w: 1, n: [1, 1], rare: true },
			],
		},
		b05_altar_lago: {
			name: 'El lago de la Luna', icon: '🌙', hours: 20, picks: [1, 2],
			game: { type: 'fish', level: 3, theme: 'lago', hint: 'El agua del lago de la Luna está quieta como un espejo. Lo que pica, pica de golpe.', wild: [{ sp: 'whiscash', lv: [57, 59], w: 4 }, { sp: 'crawdaunt', lv: [57, 59], w: 4 }, { sp: 'gyarados', lv: [58, 60], w: 2 }], wildChance: 0.3 },
			ask: 'El lago pequeño de la cima de Poni, el de la Luna. Refleja la luna aunque sea de día. En el fondo, entre la piedra blanca, brillan cosas.',
			text: 'Del lago de la Luna sale lo que sale. El reflejo de la luna tiembla un momento y se vuelve a quedar quieto.',
			wait: 'El lago está demasiado quieto. Mejor no molestarlo hasta mañana.',
			table: [
				{ id: 'stardust', w: 16, n: [1, 2] }, { id: 'pearl', w: 12, n: [1, 2] }, { id: 'bigpearl', w: 8, n: [1, 1] },
				{ id: 'starpiece', w: 6, n: [1, 1] }, { id: 'moonstone', w: 4, n: [1, 1] }, { id: 'sunstone', w: 3, n: [1, 1] },
				{ id: 'cometshard', w: 1, n: [1, 1], rare: true }, { id: 'shinystone', w: 2, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		jefe_calder: {
			name: 'El Altar del Sol y de la Luna', npc: 'calder', trainer: 'calder_1', type: 'Psychic', rec: 61,
			cond: 'flag.b05_calder_visto',
			info: [
				{ text: '**Calder Wynn**, astrónomo de Lemnis. Te espera junto al anillo del Altar.' },
				{ text: '5 Pokémon, hasta el nivel 61. Usa un **movimiento Z** una vez por combate. Sus Pokémon son de **Psíquico**, **Roca** y **Hada**: le vienen mal el **Acero**, el **Siniestro** y el **Agua**.' },
				{ text: 'En el Altar hay un manantial para curar al equipo. Si pierdes, puedes volver a intentarlo.' },
				{ cond: 'beat("calder_1")', text: '✔ Vencido.' },
			],
		},
		gran_prueba_poni: {
			name: 'Gran Prueba de Poni', npc: 'hela', trainer: 'hela_gp', type: 'Ground', rec: 61,
			cond: 'flag.b05_hela_conocida',
			info: [
				{ text: 'Kahuna: **Hela**, tipo **Tierra**. Habla poco, cepilla mucho a su Mudsdale.' },
				{ cond: '!' + DECIDIDO, text: 'Hela dice que primero la isla y luego la prueba. Ahora no acepta retos.' },
				{ cond: DECIDIDO, text: '5 Pokémon, hasta el nivel 61. Usa un **movimiento Z** una vez por combate. **Agua**, **Planta** y **Hielo** le hacen daño; ojo con los Pokémon de **Acero** y **Fuego**.' },
				{ cond: 'beat("hela_gp")', text: '✔ Sello de Poni y Geostal Z conseguidos.' },
			],
		},
		dominante_canon: {
			name: 'La prueba sin capitán', type: 'Dragon', rec: 60,
			cond: 'visited("canon_poni")',
			info: [
				{ text: 'En una cueva del **Cañón de Poni** espera un **Pokémon dominante** desde que la prueba se quedó sin capitán. Es opcional.' },
				{ cond: 'flag.b05_kommo_visto', text: 'Es un **Kommo-o** dominante, nivel 60. **Hada**, **Volador**, **Psíquico** y **Hielo** le vienen bien. No se puede capturar ni huir.' },
				{ cond: 'flag.b05_kommo_hecha', text: '✔ Prueba superada. Dracostal Z conseguido.' },
			],
		},
		marina_entreno: {
			name: 'Las casas-barco (entrenamiento)', type: 'Water', rec: 61,
			cond: 'visited("aldea_marina")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **61**: pescadores y marineros de la Aldea Marina.' },
				{ text: 'La capitana de la casa-barco grande regala algo a quien gane tres combates «sin caerse al agua».' },
			],
		},
	},
};
