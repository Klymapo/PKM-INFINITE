// Fotografía (pedido de Mario, 2026-10-29). Motor en app/js/foto.js; enfoque y Álbum en app/js/ui/foto-ui.js.
//   · La cámara: Alexia te presta una vieja réflex en Luminalia (escena corta). Disponible desde flag.b04_fin.
//   · Momentos raros: un Pokémon salvaje haciendo algo inusual en una ruta ya visitada, a cierta hora o estación.
//     Se fotografía con un minijuego de enfoque (3 disparos, cada acierto una estrella). Se puede repetir para mejorar.
//   · La Gaceta compra las fotos (pago modesto; algún regalo la primera vez) y quedan en Diario › Rotom › 🎞️ Fotos.
// Sin sprites en el repo: la foto se compone en el móvil con el sprite de PokeAPI sobre el fondo del lugar.
// Sin spoilers: solo lugares ya visitados (cond con visited) y Pokémon que viven allí.

const CAM = 'has("camara")';
// Un momento: spot en un tramo de ruta (o en un lugar) que solo sale con cámara, a su hora, hasta tener 3 estrellas.
const momento = (id, label, sub, cond) => ({
	label, sub, icon: '📷',
	cond: `${CAM} && foto("${id}") < 3 && (${cond})`,
	new: `${CAM} && !foto("${id}") && (${cond})`,
	talk: [{ script: 'foto_' + id }],
});
// Guion de un momento: presentación y enfoque. Las estrellas las guarda el motor (cond: foto("id")).
const guion = (id, intro, win, level = 2) => [
	{ text: intro },
	{ photo: id, level,
		onWin: [{ text: win }],
		onLose: [{ text: 'Se ha movido justo en el último momento. Sigue a lo suyo: puedes intentarlo otra vez.' }] },
];

export default {
	items: {
		camara: { name: 'Cámara de la Gaceta', pocket: 'key', desc: 'Una réflex vieja y pesada que Alexia te prestó «hasta nuevo aviso». Tiene una pegatina de Helioptile en la tapa del objetivo. Sirve para fotografiar momentos raros de los Pokémon salvajes.',
			read: '**CÁMARA DE LA GACETA** · *instrucciones escritas a mano por Alexia, pegadas con celo debajo*\n\n1. Los momentos raros no avisan. Un Pokémon haciendo algo que no debería, a una hora en la que no debería. Si lo ves, no corras: respira.\n\n2. El recuadro se mueve; el Pokémon, no tanto. Dispara cuando lo tengas dentro. Tres disparos. Cada uno nítido, una estrella.\n\n3. Si la foto sale movida, no pasa nada. Ellos vuelven a hacer lo suyo otro rato.\n\n4. Las fotos nuevas, a la Gaceta. Pago lo que puedo. Si me traes una mejor de algo que ya tengo, pago la diferencia.\n\n5. No molestes al Pokémon por una foto. Nunca. Ninguna foto vale eso.\n\n— A.' },
	},

	photos: {
		snorlax_hojas: { sp: 'snorlax', loc: 'ruta7', title: 'Snorlax con manta de hojas', caption: 'Un Snorlax dormido en mitad del camino de la Ruta 7, tapado hasta la barbilla con hojas de otoño que le han ido echando los Pokémon pequeños.', pay: 1400 },
		noctowl_luna: { sp: 'noctowl', loc: 'ruta36', title: 'Noctowl contando estrellas', caption: 'Un Noctowl en la valla de la Ruta 36 girando la cabeza despacio, de estrella en estrella, como si las contara. No se equivocó ni una vez.', pay: 1200 },
		psyduck_dolor: { sp: 'psyduck', loc: 'ruta24', title: 'Psyduck en la orilla', caption: 'Un Psyduck sentado en la orilla de la Ruta 24, con las dos manos en la cabeza y los pies en el agua. Lleva así desde por la mañana. Parece contento. O no.', pay: 1000, gift: [{ id: 'mysticwater', n: 1 }] },
		wingull_sombrero: { sp: 'wingull', loc: 'alola_ruta1', title: 'Wingull con sombrero de paja', caption: 'Un Wingull de la Ruta 1 de Alola que ha aparecido con un sombrero de paja de turista en la cabeza. Nadie lo ha reclamado. Él tampoco lo devuelve.', pay: 1300 },
		ducklett_puente: { sp: 'ducklett', loc: 'puente_saeta', title: 'Ducklett en fila bajo el puente', caption: 'Siete Ducklett nadando en fila india bajo el Puente Saeta, al atardecer, siguiendo a uno que no sabía adónde iba.', pay: 1500 },
		zubat_cueva: { sp: 'zubat', loc: 'cueva_celeste', title: 'Zubat colgado al revés del revés', caption: 'En la Cueva Celeste, un Zubat dormido boca arriba sobre una roca, con las alas abiertas como una manta. Los demás, colgados del techo, lo miran con algo parecido a la envidia.', pay: 1300 },
		mareep_estatica: { sp: 'mareep', loc: 'ruta32', title: 'Mareep cargado de estática', caption: 'Una Mareep de la Ruta 32 con la lana tan cargada que se le han pegado tres hojas, una pluma de Pidgey y un caramelo envuelto. Brilla un poco en la oscuridad.', pay: 1200, gift: [{ id: 'cheriberry', n: 2 }] },
		sandile_gafas: { sp: 'sandile', loc: 'tes_ruta4', title: 'Sandile tomando el sol', caption: 'Un Sandile de la Ruta 4 de Teselia tumbado panza arriba al sol de mediodía, con las gafas de alguien puestas. No son suyas. Le quedan bien.', pay: 1400 },
		froakie_charco: { sp: 'froakie', loc: 'ruta3', title: 'Froakie y su reflejo', caption: 'Un Froakie en un charco de la Ruta 3 haciéndole muecas a su reflejo. El reflejo, por supuesto, se las devuelve. Llevan un buen rato.', pay: 1600, gift: [{ id: 'pechaberry', n: 2 }] },
	},

	patches: {
		// La cámara y la venta de fotos, en Luminalia
		luminalia: { spots: [
			{ label: 'Alexia, con una cámara de sobra', sub: 'Te la enseña desde lejos, como quien enseña un Pokémon', icon: '📷', cond: `flag.b04_fin && !${CAM}`, new: `flag.b04_fin && !${CAM}`, talk: [{ script: 'foto_camara' }] },
			{ label: 'Vender fotos a la Gaceta', sub: 'Alexia compra los momentos raros', icon: '🎞️', cond: CAM, talk: [{ script: 'foto_venta' }] },
		] },
		ruta7: { route: { tramos: { 4: [momento('snorlax_hojas', 'Un bulto enorme bajo un montón de hojas', 'Ronca', 'season == "otono" || season == "invierno"')] } } },
		ruta36: { route: { tramos: { 6: [momento('noctowl_luna', 'Un Noctowl muy quieto en la valla', 'Mira el cielo', 'night')] } } },
		ruta24: { route: { tramos: { 5: [momento('psyduck_dolor', 'Un Psyduck en la orilla', 'Con las manos en la cabeza', 'morning')] } } },
		alola_ruta1: { route: { tramos: { 3: [momento('wingull_sombrero', 'Un Wingull con algo en la cabeza', 'Algo de paja', 'day')] } } },
		puente_saeta: { route: { tramos: { 2: [momento('ducklett_puente', 'Una fila de Ducklett bajo el puente', 'Van muy en serio', 'evening')] } } },
		cueva_celeste: { route: { tramos: { 3: [momento('zubat_cueva', 'Un Zubat que no está colgado', 'Duerme sobre una roca', 'weekday == 0 || weekday == 6')] } } },
		ruta32: { route: { tramos: { 3: [momento('mareep_estatica', 'Una Mareep que brilla un poco', 'Lleva cosas pegadas a la lana', 'night')] } } },
		tes_ruta4: { route: { tramos: { 4: [momento('sandile_gafas', 'Un Sandile panza arriba', 'Con gafas de sol', 'day && !morning && !evening')] } } },
		ruta3: { route: { tramos: { 2: [momento('froakie_charco', 'Un Froakie en un charco', 'Haciendo muecas', 'morning || evening')] } } },
	},

	scripts: {
		foto_camara: [
			{ say: 'alexia', text: '¡{jugador}! Justo a ti te buscaba. Mira esto. —Te enseña una cámara réflex negra, pesada, con la correa remendada y una pegatina de Helioptile en la tapa—. Mi primera cámara. La de cuando cubría concursos de belleza y no me dejaban pasar de la tercera fila.' },
			{ say: 'alexia', text: 'Ahora uso otra, pero esta sigue funcionando. Y tú vas a sitios a los que yo no llego. Te propongo un trato: te la presto, y si ves algo raro por ahí, un Pokémon haciendo algo que no debería, me lo traes. Yo te pago la foto.' },
			{ choice: [
				{ text: '«¿Algo raro como qué?»', then: [
					{ say: 'alexia', text: 'Un Snorlax tapado con hojas. Un Noctowl que cuenta estrellas. Un Psyduck que lleva todo el día en la orilla con cara de examen. Esas cosas pasan a ciertas horas, en ciertos sitios. Hay que estar ahí.' },
				] },
				{ text: '«Trato hecho.»', then: [
					{ say: 'alexia', text: 'Así me gusta. Directo, como un buen titular.' },
				] },
			] },
			{ give: 'camara' },
			{ say: 'alexia', text: 'Debajo te dejé las instrucciones, con celo. Lo más importante es la regla cinco. —Golpea la pegatina con el dedo—. Y cuídala. Esa cámara ha visto más concursos que yo.' },
			{ text: 'Cuando veas un 📷 en una ruta, es que pasa algo que merece una foto. Las que tomes quedan en Diario › Rotom › 🎞️ Fotos.' },
		],
		foto_venta: [
			{ say: 'alexia', text: 'A ver qué me traes.' },
			{ photoSell: true,
				onSale: [{ say: 'alexia', text: '¡Esto va a la sección de fauna esta misma semana! Si encuentras más, ya sabes dónde estoy. Y si sale alguna mejor de lo que ya tengo, te pago la diferencia.' }],
				onNone: [{ say: 'alexia', text: 'Nada nuevo, ¿eh? No pasa nada. Los momentos raros son raros: lo pone en el nombre. Date una vuelta por las rutas que conoces, a otras horas.' }] },
		],
		foto_snorlax_hojas: guion('snorlax_hojas', 'Un Snorlax duerme en mitad del camino, tapado hasta la barbilla con hojas secas. Un par de Bunnelby le echan una más y salen corriendo.', 'Clic. El Snorlax suspira en sueños y se le cae una hoja de la nariz.'),
		foto_noctowl_luna: guion('noctowl_luna', 'Un Noctowl en la valla gira la cabeza despacio, de una estrella a otra. Se detiene. Sigue. Parece que las está contando.', 'Clic. El Noctowl te mira un segundo, ofendido por la interrupción, y vuelve a empezar desde el principio.'),
		foto_psyduck_dolor: guion('psyduck_dolor', 'Un Psyduck sentado en la orilla, con los pies en el agua y las dos manos en la cabeza. No parece que le duela nada. Parece que está pensando muy fuerte.', 'Clic. El Psyduck parpadea. Una vez. Y sigue pensando.', 1),
		foto_wingull_sombrero: guion('wingull_sombrero', 'Un Wingull planea bajo, muy digno, con un sombrero de paja de turista bien encajado en la cabeza.', 'Clic. El Wingull da una vuelta más para que le saques el perfil bueno.'),
		foto_ducklett_puente: guion('ducklett_puente', 'Bajo el puente nadan siete Ducklett en fila india. El primero no parece saber adónde va. Los otros seis lo siguen igual, con mucha fe.', 'Clic. El primero gira a la izquierda sin motivo. Los seis giran detrás.', 3),
		foto_zubat_cueva: guion('zubat_cueva', 'En una roca plana, un Zubat duerme boca arriba con las alas abiertas como una manta. Del techo, los demás lo miran colgados.', 'Clic. Ni se inmuta. Los del techo sí: uno se suelta de la sorpresa y tiene que volver a subir.'),
		foto_mareep_estatica: guion('mareep_estatica', 'Una Mareep pasta tan tranquila con la lana llena de estática: tres hojas, una pluma de Pidgey y un caramelo envuelto pegados. Brilla un poco en la oscuridad.', 'Clic. Con el flash, la lana chisporrotea y suelta el caramelo. La Mareep se lo come con envoltorio y todo.'),
		foto_sandile_gafas: guion('sandile_gafas', 'Un Sandile tumbado panza arriba en la arena, al sol de mediodía, con unas gafas de sol de persona puestas. No son suyas. Le quedan bien.', 'Clic. El Sandile se baja las gafas con una pata, te mira por encima y se las vuelve a subir.', 3),
		foto_froakie_charco: guion('froakie_charco', 'Un Froakie en un charco le hace muecas a su reflejo. El reflejo se las devuelve, claro. El Froakie se lo toma como algo personal.', 'Clic. El Froakie se gira hacia ti y te hace una mueca a ti también. Sale en la foto.'),
	},
};
