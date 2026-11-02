// Amistoso de Renata al llegar a Galar. Añadido sin sustituir la bienvenida ni sus ramas.
// Las partidas que ya pasaron la llegada lo encuentran como novedad en Par o en el andén 2.
import porcelana from '../b06/t0-porcelana.js';

const base = porcelana.trainers.renata_1;
const PENDIENTE = 'flag.b07_llegada && !flag.b07_renata_amistoso_hecho';
const RETO = {
	label: 'Renata: un amistoso antes del tren', sub: 'Equipo curado antes y después · 4 Pokémon, niveles 66–67', icon: '⚔️',
	cond: PENDIENTE, new: PENDIENTE, talk: [{ script: 'b07_renata_amistoso' }],
};

export default {
	trainers: {
		// Su mismo equipo de Porcelana, entrenado para la curva de entrada de Galar (tope 68).
		renata_2: {
			...base, reward: 3900, terrain: 'city',
			team: base.team.map((m, i) => ({ ...m, lv: i < 2 ? 66 : 67 })),
			intro: 'Sin micro. Cuatro Pokémon. Y nada de entrevistarme entre turnos: esa trampa es mía. Cool, cool, cool.',
			win: 'Vale. Esa era la parte en la que yo tenía una conclusión. Ahora tengo que revisarla. Me molesta. Es una buena señal.',
			lose: 'No te quedes con la primera explicación. —Recoge sus Poké Balls—. A mí me cuesta. Por eso practico.',
		},
	},
	extraSpots: { par: [RETO], puerta_galar: [RETO] },

	scripts: {
		b07_renata_amistoso: [
			{ if: '!(' + PENDIENTE + ')', then: [{ end: true }] },
			{ text: 'Bajo la marquesina, Renata guarda una libreta en el bolsillo de la gabardina. Al verte, deja la maleta junto al banco.' },
			{ say: 'renata', text: 'Tengo un tren que coger. Y tiempo para un combate. Las dos cosas caben si no nos ponemos a hablar de trenes.' },
			{ say: 'renata', text: '¿La revancha de Porcelana? Mis Pokémon también han estado entrenando. Esta vez no pienso sacar conclusiones antes de tiempo.', cond: 'beat("renata_1")' },
			{ say: 'renata', text: 'Porcelana se nos quedó atrás. Vamos a comprobar qué hemos aprendido desde entonces. Sin preguntas con trampa. Bueno, sin micrófono.', cond: '!beat("renata_1")' },
			{ say: 'renata', text: 'Amistoso. Te curo al equipo antes y después, que bastante cuesta llegar. Si quieres preparar algo, te espero aquí.' },
			{ choice: [
				{ text: 'Curar al equipo y combatir', then: [
					{ heal: 'Renata abre su botiquín sobre el banco y cura a tus Pokémon antes de empezar.' },
					{ battle: 'renata_2', lose: 'continue',
						onWin: [{ set: { 'flag.b07_renata_amistoso_vencida': true } }],
						onLose: [{ say: 'renata', text: 'Nada de perder el tren por una derrota. Ven, que falta la mitad del trato: el botiquín.' }],
					},
					{ heal: 'Renata recoge las vendas y repone lo que tus Pokémon han gastado. El equipo vuelve a estar listo para seguir.' },
					{ set: { 'flag.b07_renata_amistoso_hecho': true } },
					{ say: 'renata', text: 'Ya está. Eso se queda fuera del episodio. —Cierra el botiquín y levanta la maleta—. Nos vemos en Pistón. No llegues tarde. Lo digo por mí también.' },
				] },
				{ text: 'Primero preparo el equipo', then: [
					{ say: 'renata', text: 'Bien. Prepararse antes de sacar conclusiones. —Vuelve a sentarse junto a la maleta—. Me encuentras en la estación de Par cuando estés list{o|a|e}.' },
				] },
			] },
		],
	},
};
