// Bloque 5 — elementos comunes: sellos de Gran Prueba, objetos compartidos, tiendas, retos de jefe,
// enganche de inicio desde Kanto, viajes por Puerta y aviso de ritmo.
const INICIO = 'flag.b04_fin && !flag.b05_inicio_hecho';
const ENGANCHE = { label: '🌺 La Gira: convocatoria para Alola', sub: 'Un aviso nuevo en la Pokédex', icon: '🌺', cond: INICIO, new: INICIO, script: 'b05_inicio' };
const A_ALOLA = { label: 'Cruzar a Alola (Hauoli)', sub: 'Puerta Lemnis', icon: '🌀', cond: 'flag.b05_puerta_alola', action: { go: 'puerta_alola' } };
export default {
	badges: {
		// Las Grandes Pruebas de Alola cuentan como medallas del Circuito Infinito.
		sello_melemele: { name: 'Sello de Melemele', type: 'Fighting', desc: 'Circuito Infinito · Gran Prueba de Melemele (kahuna Kaudan). Cuenta como medalla en la Temporada.' },
		sello_akala: { name: 'Sello de Akala', type: 'Rock', desc: 'Circuito Infinito · Gran Prueba de Akala (kahuna Mayla). Cuenta como medalla en la Temporada.' },
		sello_poni: { name: 'Sello de Poni', type: 'Ground', desc: 'Circuito Infinito · Gran Prueba de Poni (kahuna Hela). Cuenta como medalla en la Temporada.' },
	},
	items: {
		ridegear: { name: 'Ride Gear Universal', pocket: 'key', desc: 'Un brazalete de cuero y metal con una pantallita rajada y tres botones, uno de ellos pegado con cinta aislante. Lo hizo Leilani Kahale. Llama a tus monturas en cualquier región. Casi siempre.' },
	},
	shops: {
		tienda_hauoli: { name: 'Tienda de Hauoli', items: ['pokeball', 'greatball', 'ultraball', 'nestball', 'diveball', 'quickball', 'hyperpotion', 'maxpotion', 'revive', 'fullheal', 'maxrepel', 'ether', 'honey', { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_kantai: { name: 'Tienda de Kantai', items: ['pokeball', 'greatball', 'ultraball', 'timerball', 'repeatball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'fullheal', 'maxrepel', 'maxether', { id: 'linkingcord', cond: 'flag.regalo_cordon' }] },
		tienda_konikoni: { name: 'Mercado de Konikoni', items: ['ultraball', 'luxuryball', 'duskball', 'healball', 'hyperpotion', 'maxpotion', 'fullrestore', 'revive', 'maxrevive', 'fullheal', 'maxrepel', { id: 'icestone', price: 3000 }, { id: 'ovalstone', price: 3000 }, { id: 'bigmalasada', price: 350 }] },
	},
	challenges: {
		gran_prueba_melemele: {
			name: 'Gran Prueba de Melemele', npc: 'kaudan', trainer: 'kaudan_gp', type: 'Fighting', rec: 57,
			cond: 'visited("lilii")',
			info: [
				{ text: 'Kahuna: **Kaudan**, tipo **Lucha**. Ríe mucho. Pega más.' },
				{ cond: 'flag.b05_pulsera_z', text: '5 Pokémon, hasta el nivel 57. Usa un **movimiento Z** una vez por combate.' },
				{ cond: 'flag.b05_pulsera_z', text: 'Los tipos **Psíquico**, **Volador** y **Hada** le hacen daño. En las Rutas 1 y 2 hay Toucannon, Kadabra y Ribombee.' },
				{ cond: 'beat("kaudan_gp")', text: '✔ Sello de Melemele conseguido.' },
			],
		},
		gran_prueba_akala: {
			name: 'Gran Prueba de Akala', npc: 'mayla', trainer: 'mayla_gp', type: 'Rock', rec: 59,
			cond: 'visited("konikoni")',
			info: [
				{ text: 'Kahuna: **Mayla**, tipo **Roca**. Tiene una joyería en Konikoni y no soporta perder el tiempo.' },
				{ cond: 'visited("ruinas_vida")', text: '5 Pokémon, hasta el nivel 59. Usa un **movimiento Z** una vez por combate.' },
				{ cond: 'visited("ruinas_vida")', text: '**Agua**, **Planta**, **Lucha** y **Acero** le vienen mal a la roca. Un Lucario lo sabe bien.' },
				{ cond: 'beat("mayla_gp")', text: '✔ Sello de Akala conseguido.' },
			],
		},
	},
	patches: {
		// Enganche del inicio: Mario terminó el B4 (Celeste) y anda por Azafrán.
		azafran: { spots: [ENGANCHE] },
		estacion_azafran: { spots: [ENGANCHE] },
		puerta_azafran: { spots: [ENGANCHE, A_ALOLA] },
		celeste: { spots: [ENGANCHE] },
		lavanda: { spots: [ENGANCHE] },
		trigal: { spots: [ENGANCHE] },
		// Viajes por Puerta a Alola (se abren cuando T0 activa b05_puerta_alola)
		luminalia_plaza: { spots: [ENGANCHE, A_ALOLA] },
		puerta_trigal: { spots: [ENGANCHE, A_ALOLA] },
	},
	milestones: [{ flag: 'b05_m_aviso', hoursLeft: 3 }],
};
