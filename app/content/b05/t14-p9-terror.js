// Pasada 9 (2026-10-28, pedido de Mario) · Noches de terror en el Castillo Caduco.
// Amplía el negocio p7_castillo (mismo id; ver docs/CONTENIDO.md §13): una línea nueva que abre una mejora
// y, de noche, un recorrido de sustos que el jugador dirige una vez al día (vars.p9_terror_wd = día de la semana + 1).
// En Halloween (24–31 oct) el recorrido tiene su variante y un imprevisto propio.

const SOCIO_C = 'partner("p7_castillo")';
const TERROR = SOCIO_C + ' && flag.p9_c_terror';
const HOY = 'vars.p9_terror_wd == weekday + 1';
const HALLOWEEN = 'date("10-24", "10-31")';
const pts = n => ({ set: { 'vars.p9_terror_s': '+' + n } });

export default {
	patches: {
		castillo_caduco: { spots: [
			{ label: 'La noche de terror', sub: 'Empieza cuando se apaga la última vela', icon: '🕯️', cond: TERROR + ' && night', new: '!flag.p9_terror_1',
				talk: [{ cond: HOY, script: 'p9_terror_hecha' }, { script: 'p9_terror' }] },
			{ label: 'El cartel de las noches de terror', sub: 'Letras góticas. Una gotea', icon: '📜', cond: TERROR + ' && !night', talk: [{ script: 'p9_terror_cartel' }] },
		] },
	},

	ventures: {
		p7_castillo: {
			lines: {
				terror: { name: 'Noches de terror', icon: '👻', locked: true,
					desc: 'Recorridos a oscuras por el ala norte. La gente paga por gritar y luego compra la foto en la que sale gritando.',
					money: 2600, items: [{ id: 'spelltag', perDay: 0.1 }, { id: 'cleansetag', perDay: 0.15 }, { id: 'reapercloth', perDay: 0.04 }] },
			},
			upgrades: [
				{ id: 'terror', name: 'Noches de terror', cost: 28000, need: ['alanorte'], unlock: 'terror', set: { 'flag.p9_c_terror': true }, script: 'p9_c_up_terror',
					desc: 'El ala norte, a oscuras y con guion. Hacen falta linternas que fallen a propósito, un órgano afinado mal y un pasillo que cruje en el sitio justo. Abre una línea nueva.' },
				{ id: 'niebla', name: 'Niebla de teatro', cost: 16000, need: ['terror'], mult: { terror: 1.4 },
					desc: 'La niebla de la casa no se deja dirigir. Una máquina de niebla de Ciudad Luminalia, sí. El Conde la llama «la prima del pueblo».' },
			],
			events: [
				{ id: 'p9_grito', name: 'Un grito de verdad', w: 2, npc: 'simon', cond: 'flag.p9_c_terror && flag.p7_simon',
					text: 'Nota para el episodio: anoche, en el recorrido de terror, alguien gritó en el pasillo del órgano. No era un visitante. No era el Conde. He grabado el grito. Lo he puesto al revés. Dice «tarta».',
					options: [
						{ text: 'Ponerlo en el recorrido', result: 'Ahora el pasillo del órgano grita «tarta» al revés cada media hora. Simón no lo puede explicar. Lo explica igual, en antena, dos horas.', effect: { boost: { mult: { terror: 1.3 }, days: 3, label: 'El grito del órgano' } } },
						{ text: '«Analízalo con calma.»', result: 'Lo analiza. Concluye que es una tubería. La tubería, esa noche, no suena. Simón duerme con la luz encendida y no lo apunta.' },
					] },
				{ id: 'p9_halloween', name: 'La semana grande', w: 6, npc: 'conde', cond: 'flag.p9_c_terror && ' + HALLOWEEN,
					text: 'Llega la única semana del año en la que la gente se disfraza de mí. Hay cola hasta el pozo. Un niño lleva mi capa mejor que yo. Le he pedido el nombre de su sastre. Es su abuela.',
					options: [
						{ text: 'Abrir también de madrugada', cost: 3000, result: 'Tres pases más por noche. El Conde atiende la última puerta en persona y nadie pide que le devuelvan el dinero. Nadie pide nada. Salen muy callados.', effect: { boost: { mult: { terror: 1.6, recuerdos: 1.3 }, days: 4, label: 'Semana grande' } } },
						{ text: '«Con lo de siempre basta.»', result: 'Lo de siempre basta. La cola llega al pozo igual. El Conde reparte caramelos envueltos en papel de periódico de una fecha que nadie lee.', effect: { boost: { mult: { terror: 1.25 }, days: 3, label: 'Cola hasta el pozo' } } },
					] },
			],
		},
	},

	scripts: {
		p9_c_up_terror: [
			{ text: 'El Conde te espera en la puerta del ala norte con un candelabro de tres brazos. Solo uno está encendido.' },
			{ say: 'conde', text: 'He estado pensando. Lo hago mucho; tengo tiempo. La gente viene aquí a pasar miedo y sale encantada porque yo soy encantador. Es un fallo de diseño.' },
			{ say: 'conde', text: 'Propongo arreglarlo. De noche. A oscuras. Con un recorrido por el ala norte que no termine donde empieza. Usted dirige. Yo… aparezco. Se me da muy bien aparecer.' },
			{ say: 'simon', text: 'Que conste en acta: me opongo. Un recorrido de terror es un experimento sin grupo de control. —Pausa—. ¿Puedo poner yo las luces? Sé dónde hace falta una sombra para que algo parezca otra cosa.', cond: 'flag.p7_simon' },
			{ say: 'hector', text: '¡He ampliado la póliza! Cubre desmayos, sustos de grado tres y «visitantes que entran con un nombre y salen con otro». Eso último me lo ha dictado el Conde. No sé por qué.', cond: 'flag.p7_hector' },
			{ say: 'conde', text: 'Venga cualquier noche, cuando se apague la última vela. Le enseñaré cómo se asusta con educación. Y luego usted me enseñará cómo se cobra, que eso sigue sin entenderlo.' },
			{ intel: { npc: 'conde', text: 'Ha abierto el ala norte para «noches de terror»: un recorrido a oscuras que diriges tú con él. Dice que asustar con educación es un arte. Lo de cobrar sigue sin entenderlo.' } },
		],

		p9_terror_cartel: [
			{ text: 'Un cartel en la puerta del ala norte, letras góticas pintadas a mano. La «R» de «TERROR» gotea pintura roja todavía; alguien la retocó esta mañana.' },
			{ read: { title: 'Noches de terror', text: '**NOCHES DE TERROR EN EL CASTILLO CADUCO**\n\nCuando se apague la última vela.\nUn pase por noche. Se ruega no tocar a los fantasmas: están trabajando.\n\n*No se devuelve el importe de la entrada a quien se desmaye. Sí a quien no se asuste, previa demostración.*\n\n*(Debajo, a bolígrafo rojo:)* «Ningún fenómeno de este recorrido es real. — S.»\n*(Debajo, con tinta que no se ha secado:)* «Ninguno que él haya visto. — V.»' } },
		],

		p9_terror_hecha: [
			{ say: 'conde', text: 'Esta noche ya ha habido función. Repetir un susto lo convierte en costumbre, y las costumbres no asustan a nadie. Lo digo con conocimiento de causa.' },
			{ text: 'Por el pasillo del ala norte pasa una corriente fría que huele a cera. Alguien está recogiendo las sábanas.' },
		],

		p9_terror: [
			{ set: { 'vars.p9_terror_wd': '=weekday + 1', 'vars.p9_terror_s': 0, 'vars.p9_terror_n': '+1' } },
			{ if: '!flag.p9_terror_1', then: [
				{ set: { 'flag.p9_terror_1': true } },
				{ cutscene: { bg: { type: 'castle', fog: true }, start: 'dark', time: 'noche', frames: [
					{ text: 'Se apaga la última vela del vestíbulo. Nadie la ha soplado.', fx: 'dark' },
					{ text: 'En la escalera del ala norte esperan doce visitantes con la entrada en la mano, muy juntos, como si el frío fuera menos frío entre varios.', cam: 'pan-right' },
					{ text: 'A tu lado, en la oscuridad, el Conde se arregla la capa.', npc: 'conde' },
				] } },
				{ say: 'conde', text: 'Primera regla: el miedo no se pone, se deja sitio para que venga solo. Segunda regla: nunca lo asuste dos veces con lo mismo. Tercera… la tercera la verá usted.' },
			] },
			{ text: 'Doce visitantes esta noche, a la luz de una sola linterna.', cond: '!' + HALLOWEEN },
			{ text: 'Es la semana grande: hay más disfraces que visitantes y alguien ha venido vestido de Conde. El Conde lo mira con aprobación profesional.', cond: HALLOWEEN },
			{ choice: [
				{ text: 'Empezar por el pasillo de los retratos', then: [{ text: 'Los retratos siguen al grupo con la mirada. Es la perspectiva, o eso explica Simón al fondo, en voz baja. El de la gorguera guiña. Un visitante se agarra a otro que no conocía.' }, pts(2)] },
				{ text: 'Empezar por el órgano', then: [{ text: 'El órgano toca tres notas. Nadie está sentado delante. Una de las tres está desafinada a propósito, y es la que hace que todos den un paso atrás.' }, pts(1)] },
				{ text: 'Apagar la linterna nada más entrar', then: [{ text: 'Oscuridad total. Doce respiraciones. Luego, catorce. Cuando vuelves a encenderla, son doce visitantes otra vez. Nadie pregunta.' }, pts(3)] },
			], prompt: '¿Cómo empiezas?' },
			{ choice: [
				{ text: 'Que los Gastly hagan lo de las sábanas', then: [{ text: 'Las sábanas nuevas flotan por el techo y bajan despacio sobre el grupo. Un señor grita. Su Pokémon, desde la Poké Ball, también.' }, pts(2)] },
				{ text: 'Silencio largo. Muy largo', then: [{ text: 'Paras al grupo en mitad del pasillo y no dices nada. Un minuto. Dos. Al tercero, una niña pregunta si ya ha empezado. Nadie le contesta.' }, pts(3)] },
				{ text: 'Un susto de Héctor', cond: 'flag.p7_hector', then: [{ text: 'Héctor salta desde detrás de una armadura con la máscara puesta y grita «¡TRANSFORMACIÓN!». Asusta más de lo previsto. Pide perdón a cada visitante. Eso asusta todavía más.' }, pts(2)] },
				{ text: 'Las velas de Litwick', cond: 'owns("litwick") || owns("lampent") || owns("chandelure")', then: [{ text: 'Las velas del pasillo se encienden una a una detrás del grupo, nunca delante. Cuando se dan la vuelta, se apagan. Tu Pokémon lo hace con un gusto que da un poco de miedo.' }, pts(3)] },
			], prompt: 'A mitad del ala norte…' },
			{ choice: [
				{ text: 'Dejar que aparezca el Conde', then: [{ text: 'El grupo llega al final del pasillo. Ahí está el Conde, de espaldas, mirando por la ventana. Se gira muy despacio. Sonríe. Les da las buenas noches. Es lo peor de todo el recorrido.' }, pts(3)] },
				{ text: 'Una salida que no lleva a la salida', then: [{ text: 'La puerta del final da otra vez al principio del pasillo. El grupo lo recorre de nuevo, ahora en silencio total. Al salir de verdad, alguien aplaude. Solo una vez.' }, pts(2)] },
				{ text: 'Terminar con tarta', then: [{ text: 'Al final del recorrido hay tarta. De moras, muy roja. Después de lo que han visto, nadie se atreve a probarla. Simón se come tres trozos y se queda con el plato.' }, pts(1)] },
			], prompt: '¿Y el final?' },
			{ if: 'vars.p9_terror_s >= 8', then: [
				{ text: 'Cuatro desmayos, dos pedidas de mano y un señor que pide trabajo de fantasma. El libro de quejas se llena de agradecimientos.' },
				{ say: 'conde', text: 'Magnífico. Hacía siglos que no oía gritar así a nadie que no fuera un inspector. Tome: su parte de la taquilla de esta noche.' },
				{ money: 3000 },
				{ if: '!flag.p9_terror_premio', then: [
					{ set: { 'flag.p9_terror_premio': true } },
					{ say: 'conde', text: 'Y esto. Es un amuleto que mi abuelo, que era yo, cosió para la primera función del castillo. Los fantasmas lo respetan. A usted, desde esta noche, también.' },
					{ give: 'spelltag' },
				] },
			], else: [
				{ if: 'vars.p9_terror_s >= 6', then: [
					{ text: 'Gritos en los sitios justos y una cola en la tienda de recuerdos para comprar la foto del susto. Buena noche.' },
					{ say: 'conde', text: 'Correcto. Elegante, incluso. Le falta crueldad, pero eso se aprende con los años. Con muchos.' },
					{ money: 1800 },
				], else: [
					{ text: 'Algún grito, muchas risas nerviosas y un visitante que pregunta si el recorrido es «para todos los públicos». Lo es, por desgracia.' },
					{ say: 'conde', text: 'Un susto a medias es una sorpresa. Mañana, sin miedo. Al miedo, me refiero.' },
					{ money: 800 },
				] },
			] },
		],
	},
};
