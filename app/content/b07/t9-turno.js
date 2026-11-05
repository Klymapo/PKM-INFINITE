// Encargo independiente de Pistón. Sus etapas y premios pertenecen solo a esta misión.
const DISPONIBLE = 'flag.b07_t1_hecho';
const REVISION = 'quest.cg_turno == "revision"';
const ENSAYO = 'quest.cg_turno == "ensayo"';
const PRUEBA = 'quest.cg_turno == "prueba"';
const REGRESO = 'quest.cg_turno == "regreso"';
const LISTO = 'flag.cg_turno_placa && flag.cg_turno_libro && flag.cg_turno_caja';
const ACTIVA = '(quest.cg_turno && !done.cg_turno)';

export default {
	quests: {
		cg_turno: { name: 'El turno de los tres golpes', type: 'side', est: 60,
			stages: {
				revision: 'Revisa la placa de la calle de los talleres, el libro en la estación y la caja de la galería de las calderas. Después, compara los tres apuntes con Naboru.',
				ensayo: 'Vuelve a la galería de las calderas. Acomoda los contrapesos y ensaya con Naboru.',
				prueba: 'Haz la prueba de carga en el patio de las calderas, con la herrera.',
				regreso: 'Cuéntale a Naboru en la pasarela cómo salió la prueba.',
				hecha: 'Los tres golpes vuelven a oírse en Pistón.',
			},
			parts: { title: 'Los tres apuntes', items: [
				{ label: 'Placa del taller', where: 'piston_talleres', done: 'flag.cg_turno_placa', hint: 'Busca la placa pequeña, junto a la herrería.' },
				{ label: 'Libro de relevo', where: 'estacion_piston', done: 'flag.cg_turno_libro', hint: 'Agnes tiene el registro de los golpes.' },
				{ label: 'Caja de resonancia', where: 'cg_turno_galeria', done: 'flag.cg_turno_caja', hint: 'Entra por la pasarela de las calderas.' },
			] },
		},
	},
	extraSpots: {
		calderas_piston: [
			{ label: 'Un encargo de Naboru', sub: 'Escucha la pared, con el té en la mano', icon: '🔔',
				cond: DISPONIBLE + ' && !quest.cg_turno', new: 'true', talk: [{ script: 'cg_turno_inicio' }] },
			{ label: 'Galería de mantenimiento', sub: 'La puerta baja de la pasarela', icon: '🔧',
				cond: ACTIVA, new: '(' + REVISION + ' && !flag.cg_turno_caja) || ' + ENSAYO, action: { go: 'cg_turno_galeria' } },
			{ label: 'Comparar los apuntes con Naboru', sub: 'La placa, el libro y la caja', icon: '📋',
				cond: REVISION + ' && ' + LISTO, new: 'true', talk: [{ script: 'cg_turno_deducir' }] },
			{ label: 'Patio de pruebas', sub: 'Espacio abierto para el ensayo de carga', icon: '⚙️',
				cond: PRUEBA, new: 'true', action: { go: 'cg_turno_patio' } },
			{ label: 'Dar el parte del turno', sub: 'Naboru espera en la pasarela', icon: '📋',
				cond: REGRESO, new: 'true', talk: [{ script: 'cg_turno_cierre' }] },
			{ label: 'Escuchar el relevo', sub: 'Un ruido que Pistón ya extrañaba', icon: '🔔',
				cond: 'done.cg_turno', talk: [{ script: 'cg_turno_despues' }] },
		],
		piston_talleres: [
			{ label: 'La placa pequeña de la herrería', sub: 'Tres marcas hechas a punzón', icon: '🔨',
				cond: REVISION + ' && !flag.cg_turno_placa', new: 'true', talk: [{ script: 'cg_turno_placa' }] },
		],
		estacion_piston: [
			{ label: 'Agnes y el libro de relevo', sub: 'Tres columnas y una raya de lápiz', icon: '📓',
				cond: REVISION + ' && !flag.cg_turno_libro', new: 'true', talk: [{ script: 'cg_turno_libro' }] },
		],
	},
	locations: {
		cg_turno_galeria: { name: 'Galería de mantenimiento', parent: 'calderas_piston', kind: 'building', region: 'galar',
			bg: { type: 'indoor', wall: '#51403b', floor: '#675341' },
			desc: 'Aquí abajo no hace más calor. Solo se oye mejor el de arriba. Hay una mesa baja, una caja con cerrojos y dos tazas que alguien puso boca abajo para que no junten polvo.',
			spots: [
				{ label: 'Abrir la caja de resonancia', sub: 'Cerrojo de memoria del taller', icon: '🗝️',
					cond: REVISION + ' && !flag.cg_turno_caja', new: 'true', talk: [{ script: 'cg_turno_caja' }] },
				{ label: 'Acomodar los contrapesos', sub: 'Dos placas y un carro que no se deja empujar de frente', icon: '⚙️',
					cond: ENSAYO + ' && !flag.cg_turno_banco', new: 'true', talk: [{ script: 'cg_turno_banco' }] },
				{ label: 'Ensayar con Naboru', sub: 'Prueba en seco, con el equipo curado', icon: '🔥',
					cond: ENSAYO + ' && flag.cg_turno_banco', new: 'true', talk: [{ script: 'cg_turno_ensayo' }] },
			],
		},
		cg_turno_patio: { name: 'Patio de pruebas', parent: 'calderas_piston', kind: 'area', region: 'galar',
			bg: { type: 'town', roofs: ['#8a3a2a', '#5a3a4a'], ground: '#6a5a4a' },
			desc: 'El cielo cabe justo entre dos chimeneas. Hay un cuadrado de tiza, un banco lleno de abolladuras y una pesa de hierro que dice «NO SENTARSE». Alguien se sentó.',
			spots: [
				{ label: 'Hacer la prueba con la herrera', sub: 'Combate de carga con curación previa', icon: '⚒️',
					cond: PRUEBA, new: 'true', talk: [{ script: 'cg_turno_prueba' }] },
			],
		},
	},
	trainers: {
		cg_turno_entreno: { name: 'Naboru', npc: 'naboru', cls: 'Entrenador', ai: 3, reward: 500,
			team: [
				{ sp: 'torkoal', lv: 65, moves: ['flamethrower', 'yawn', 'protect', 'bodypress'] },
				{ sp: 'centiskorch', lv: 65, moves: ['firelash', 'leechlife', 'coil', 'crunch'] },
				{ sp: 'coalossal', lv: 66, moves: ['heatcrash', 'rockblast', 'willowisp', 'rapidspin'] },
			],
		},
		cg_turno_carga: { name: 'La herrera', npc: 'of_herrera', cls: 'Artesana', ai: 3, reward: 800,
			team: [
				{ sp: 'perrserker', lv: 66, moves: ['ironhead', 'crunch', 'uturn', 'swordsdance'] },
				{ sp: 'mudsdale', lv: 67, moves: ['highhorsepower', 'rockslide', 'heavyslam', 'irondefense'] },
				{ sp: 'carkol', lv: 66, moves: ['rockblast', 'flamecharge', 'rapidspin', 'willowisp'] },
				{ sp: 'duraludon', lv: 67, moves: ['dragonpulse', 'flashcannon', 'thunderwave', 'protect'] },
				{ sp: 'corviknight', lv: 68, moves: ['bravebird', 'steelwing', 'taunt', 'bulkup'] },
			],
		},
	},
	scripts: {
		cg_turno_inicio: [
			{ if: DISPONIBLE + ' && !quest.cg_turno', then: [
				{ say: 'naboru', text: 'Escucha. Uno. Dos. …Nada. Otra vez.' },
				'El primer golpe baja por la pared. El segundo te vibra en los zapatos. Naboru deja un dedo levantado hasta que te das cuenta de que el tercero no va a llegar.',
				{ say: 'rotom', text: 'Bzzt. Grabé los dos. El tercero se me hace difícil.' },
				{ say: 'naboru', text: 'Es el relevo. Quien está en la estación oye el tercero y sabe que ya puede mandar a casa a la gente de la galería. Ayer nadie se atrevió a irse. Hoy no quiero que vuelva a pasar.' },
				{ say: 'naboru', text: 'La red de las casas está bien. Esta línea solo lleva sonido. Quiero saber dónde se queda el golpe antes de que la herrera me cambie media pared.' },
				{ prompt: 'Naboru te acerca una libreta. Tiene un círculo dibujado a medias.', choice: [
					{ text: 'Revisar el relevo', then: [
						{ quest: 'cg_turno', stage: 'revision' },
						{ say: 'naboru', text: 'La placa está en los talleres. Agnes tiene las horas en la estación. Y la caja se abre en la galería, por esa puerta baja. Empieza donde quieras.' },
						{ say: 'rotom', text: 'Ya apunté los tres. A mí sí me salió el tercero.' },
					] },
					{ text: 'Volver en otro momento', then: [{ say: 'naboru', text: 'Aquí estaré. No se me ha enfriado el té.' }] },
				] },
			] },
		],
		cg_turno_placa: [
			{ say: 'of_herrera', text: 'Esa es la vieja. El letrero bonito está del otro lado y no sirve para nada. Mira las marcas de abajo.' },
			'Las dos primeras marcas dicen «pasarela» y «galería». La tercera dice «estación». Debajo hay una línea que se parte en dos antes de llegar al tercer punto.',
			{ say: 'of_herrera', text: 'Esa rama corta va al banco de pruebas. Si estás en la estación, ni la oyes. Si estás junto al banco, te tiembla la cuchara.' },
			{ say: 'jugador', text: '¿La rama corta estaba siempre abierta?' },
			{ say: 'of_herrera', text: 'Cuando trabajamos con el banco, sí. Ya acabamos el martes. El banco se quedó con el cartel, por si alguien pregunta qué día vivimos.' },
			{ set: { 'flag.cg_turno_placa': true } },
		],
		cg_turno_libro: [
			{ say: 'agnes', text: 'A ver. Horario de trenes, en azul. Golpes, en negro. Que las cosas suenen parecido no las vuelve la misma cosa.' },
			{ read: { title: 'Libro de relevo · última página', text: '**Lunes.** Tres golpes.\n\n**Martes.** Dos en la estación. Uno en el patio. La herrera pidió que dejáramos abierto el banco hasta que secara la pintura.\n\n**Miércoles.** Dos en la estación. Uno en el patio. La pintura ya secó.\n\n*En el margen:* El turno no se firma hasta que se oiga el tercero. Firmado: nadie.' } },
			{ say: 'agnes', text: 'Ayer me quedé yo. Si apunté dos, fueron dos. La tercera casilla la dejé en blanco para que alguien la llene, no para que la adivine.' },
			{ set: { 'flag.cg_turno_libro': true } },
		],
		cg_turno_caja: [
			{ text: 'Un papel en la tapa: «Mire las marcas y tóquelas en el mismo orden. Si se pierde, vuelva a mirar. A la caja le sobra el tiempo».' },
			{ minigame: { type: 'lock', id: 'cg_turno_cerrojo', title: 'Caja de resonancia', theme: 'caja', level: 3, guaranteed: ['fullheal'], picks: 0, consolation: false },
				onWin: [
					'La tapa levanta un dedo de polvo. El indicador de la estación no se ha roto: se queda quieto mientras el del banco da un salto.',
					{ say: 'rotom', text: 'El golpe sí sale. Encontré dónde aterriza: donde dejaron el banco.' },
					{ set: { 'flag.cg_turno_caja': true } },
				],
				onLose: [{ text: 'El mecanismo vuelve al inicio. Puedes mirar la secuencia otra vez.' }],
				onQuit: [{ text: 'Dejas la caja en su sitio. Puedes volver cuando quieras.' }],
			},
		],
		cg_turno_deducir: [
			{ say: 'naboru', text: 'La placa dice adónde puede ir. Agnes dice adónde llegó. La caja nos dice qué rama está vibrando. Dime qué corregirías primero.' },
			{ prompt: '¿Qué haría que el tercer golpe vuelva a la estación?', choice: [
				{ text: 'Cerrar el desvío del banco de pruebas', then: [
					{ say: 'naboru', text: 'Eso. El martes abrieron la rama para probar el banco. El miércoles todos esperaron el golpe y nadie se acordó de cerrarla. Yo tampoco.' },
					{ say: 'naboru', text: 'La cierro yo. Tú baja a la galería cuando puedas. Quiero ver que el equipo y el golpe aguanten el turno completo.' },
					{ quest: 'cg_turno', stage: 'ensayo' },
				] },
				{ text: 'Cambiar el indicador de la estación', then: [{ say: 'naboru', text: 'Mira dónde sí vibró el indicador. Si cambiamos el de la estación, el golpe va a seguir tomando el mismo camino.' }] },
				{ text: 'Revisar los apuntes otra vez', then: [{ say: 'rotom', text: 'Bzzt. Los tres siguen en el Diario.' }] },
			] },
		],
		cg_turno_banco: [
			{ say: 'naboru', text: 'El golpe ya tiene camino. Falta que la caja deje de bailar cuando vibra el piso. Pon un contrapeso en cada marca y luego mira la aguja desde el otro lado de la reja.' },
			{ puzzle: { id: 'cg_turno_contrapesos', title: 'El banco de la galería', theme: 'lab',
				hint: 'Empuja un contrapeso sobre cada placa para abrir la reja.',
				grid: [
					'########',
					'#P.....#',
					'#.R....#',
					'#...#..#',
					'#.R....#',
					'#S.S..##',
					'#####DG#',
					'########',
				],
			}, onSolve: [
				'La segunda placa baja. Del otro lado, la aguja tiembla una vez y vuelve al centro.',
				{ say: 'naboru', text: 'Bien. Ya no se mueve la mesa. Ahora sí podemos hacer ruido con ganas.' },
				{ set: { 'flag.cg_turno_banco': true } },
			], onQuit: [{ say: 'naboru', text: 'Ahí deja los pesos. Los acomodamos cuando vuelvas.' }] },
		],
		cg_turno_ensayo: [
			{ say: 'naboru', text: 'En seco primero. Tres Pokémon, poco espacio. Torkoal se toma su tiempo. Si se te cierran las salidas, cambia el paso.' },
			{ choice: [
				{ text: 'Ensayar (con curación previa)', then: [
					{ heal: true },
					{ battle: 'cg_turno_entreno', lose: 'continue',
						onWin: [
							'Al último golpe, el vaso boca abajo se mueve un dedo sobre la mesa. Naboru lo vuelve a poner en su marca.',
							{ say: 'naboru', text: 'El ensayo en seco pasó. La herrera está en el patio con su equipo de carga. Que te avise cuándo está lista antes de dar el primer golpe.' },
							{ quest: 'cg_turno', stage: 'prueba' },
						],
						onLose: [{ say: 'naboru', text: 'Bebe agua. Mira con qué se quedó Torkoal el tiempo que tú necesitabas. Ensayamos de nuevo cuando quieras.' }],
					},
				] },
				{ text: 'Preparar al equipo primero', then: [{ say: 'naboru', text: 'Bien. Avísame.' }] },
			] },
		],
		cg_turno_prueba: [
			{ say: 'of_herrera', text: 'El cuadrado de tiza es el campo. El peso es para la prueba. El banco es para mí y para nadie más. ¿Todo claro?' },
			{ say: 'of_herrera', text: 'Mi equipo está acostumbrado al ruido. Perrserker te va a cambiar el ritmo y Mudsdale aguanta más de lo que parece. Si el banco se mueve, yo me encargo.' },
			{ choice: [
				{ text: 'Hacer la prueba (con curación previa)', then: [
					{ heal: true },
					{ battle: 'cg_turno_carga', lose: 'continue',
						onWin: [
							'Corviknight se posa en la baranda. Debajo de sus garras suenan dos golpes. El tercero se va por la tubería. El banco no se mueve.',
							{ say: 'of_herrera', text: 'Déjalo. Ya tomó su camino.' },
							'Desde la estación llega un silbido breve. La herrera levanta su lápiz como quien saluda desde lejos.',
							{ say: 'of_herrera', text: 'Agnes. Si silba una vez, recibió el golpe. Si silba dos, quiere que deje de sonreír en horas de trabajo.' },
							{ quest: 'cg_turno', stage: 'regreso' },
						],
						onLose: [{ say: 'of_herrera', text: 'Anoto ensayo. Cuando estés list{o|a|e}, hacemos otra. La tiza aguanta.' }],
					},
				] },
				{ text: 'Volver luego', then: [{ say: 'of_herrera', text: 'Te guardo el cuadrado.' }] },
			] },
		],
		cg_turno_cierre: [
			{ if: REGRESO, then: [
				{ say: 'naboru', text: 'Agnes llenó la tercera casilla. La firmó con nombre completo. En la galería ya se oyen los pasos de la gente que se va a casa.' },
				{ say: 'jugador', text: '¿Y tú ya te vas?' },
				{ say: 'naboru', text: 'Cuando me acabe el té.' },
				'Inclina la taza. Está vacía desde hace rato.',
				{ give: 'rarecandy' },
				{ quest: 'cg_turno', stage: 'hecha', done: true },
				{ save: true },
			] },
		],
		cg_turno_despues: [
			'Uno junto a ti. Dos debajo de tus pies. Tres en dirección a la estación. Hoy nadie se queda contando.',
		],
	},
};
