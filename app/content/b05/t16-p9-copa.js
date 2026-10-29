// Pasada 9 (2026-10-28, pedido de Mario) · Copa Luminalia: torneo con reglas en Ciudad Luminalia.
// Motor en app/js/torneo.js; el comando `{ torneo: true }` abre la inscripción y juega las 4 rondas.
// Puntos en vars.copa_pts; mejor resultado en vars.copa_mejor; copas ganadas en vars.copa_titulos.
// Mostrador: Megapiedras de Pokémon que el jugador tiene (o la línea), sin repetir las que ya se dan por historia.

const ABRE = 'flag.b01_fin';
const PTS = n => 'vars.copa_pts >= ' + n;
const PAGA = n => ({ set: { 'vars.copa_pts': '-' + n } });

// [objeto, líneas que lo usan, coste]
const MEGAS = [
	['charizarditex', ['charmander', 'charmeleon', 'charizard'], 25],
	['charizarditey', ['charmander', 'charmeleon', 'charizard'], 25],
	['venusaurite', ['bulbasaur', 'ivysaur', 'venusaur'], 25],
	['blastoisinite', ['squirtle', 'wartortle', 'blastoise'], 25],
	['garchompite', ['gible', 'gabite', 'garchomp'], 30],
	['aggronite', ['aron', 'lairon', 'aggron'], 25],
	['manectite', ['electrike', 'manectric'], 20],
	['houndoominite', ['houndour', 'houndoom'], 20],
	['medichamite', ['meditite', 'medicham'], 20],
];
const ownsLine = l => '(' + l.map(s => `owns("${s}")`).join(' || ') + ')';

export default {
	patches: {
		luminalia: { spots: [
			{ label: 'Recepción de la Copa Luminalia', sub: 'Un mostrador con trofeos y una pizarra de reglas', icon: '🏆', cond: ABRE, new: '!flag.p9_copa_vista',
				talk: [{ script: 'p9_copa' }] },
		] },
	},
	scripts: {
		p9_copa: [
			{ if: '!flag.p9_copa_vista', then: [
				{ set: { 'flag.p9_copa_vista': true } },
				{ text: 'Bajo los arcos de la avenida, alguien ha montado un mostrador con mantel azul, tres trofeos de distinto tamaño y una pizarra con las reglas escritas a tiza. La recepcionista lleva gafas de pasta y un silbato al cuello.' },
				{ text: '«¡Copa Luminalia! Cuatro combates seguidos y todos en igualdad: los tuyos y los de los rivales, a nivel 50. Nada de objetos. Y un solo tipo por equipo, que aquí se viene a pensar, no a llevar lo más fuerte que tengas en la caja.»' },
				{ text: '«Cada ronda que ganas da puntos. Con los puntos, en este mismo mostrador, te llevas Megapiedras. Solo las de Pokémon que tengas, eh. Aquí no se colecciona por coleccionar.»' },
			] },
			{ choice: [
				{ text: 'Inscribirme en la Copa', then: [{ torneo: true }] },
				{ text: 'Canjear puntos', then: [{ call: 'p9_copa_mostrador' }] },
				{ text: 'Leer la pizarra', then: [{ read: { title: 'Copa Luminalia', text: '**COPA LUMINALIA · REGLAS**\n\n1. Un solo tipo. Tres Pokémon de ese tipo, del equipo o del PC.\n2. Todos a **nivel 50**. Los tuyos vuelven a casa con su nivel de siempre.\n3. **Sin objetos** equipados y sin Mochila.\n4. Cuatro rondas. Se cura todo entre una y otra.\n5. No se gana experiencia. Se gana respeto. Y puntos.\n\n*Puntos por ronda:* 2 · 3 · 4 · 6, y **5 más** por ganar la copa.\n\n*(Abajo, con otra letra:)* «Prohibido llevar tres Ditto. Ya sabemos quién fuiste.»' } }] },
				{ text: 'Nada, gracias', then: [] },
			], prompt: 'Puntos: {vars.copa_pts}' },
		],
		p9_copa_mostrador: [
			{ text: '«A ver esa cartilla… Tienes {vars.copa_pts} puntos.»' },
			{ choice: [
				...MEGAS.map(([id, line, cost]) => ({
					text: `${cost} pts · {item:${id}}`,
					cond: ownsLine(line) + ' && !has("' + id + '") && !flag.p9_copa_' + id,
					then: [{ if: PTS(cost), then: [
						PAGA(cost), { set: { ['flag.p9_copa_' + id]: true } },
						{ text: '«Esta es de las buenas. Cuídala, que se raya con mirarla.»' },
						{ give: id },
					], else: [{ text: '«Te faltan puntos. Una copa más y vuelves.»' }] }],
				})),
				{ text: '10 pts · {item:abilitycapsule}', then: [{ if: PTS(10), then: [PAGA(10), { give: 'abilitycapsule' }], else: [{ text: '«Te faltan puntos.»' }] }] },
				{ text: '3 pts · {item:ppup}', then: [{ if: PTS(3), then: [PAGA(3), { give: 'ppup' }], else: [{ text: '«Te faltan puntos.»' }] }] },
				{ text: 'Volver', then: [] },
			], prompt: 'Mostrador de la Copa' },
		],
	},
};
