// Rival que aprende (pedido de Mario, 2026-10-30). Motor en app/js/rival.js (sitio dinámico, equipo y memoria).
// Bruna Ledesma: analista del Circuito, voz en secreto/personajes.md. Aparece cada 2 hitos en una ciudad o pueblo visitado
// de la región donde estés; arma su equipo contra tus 3 Pokémon más usados; sube de reto si le ganas 3 veces seguidas
// con el mismo equipo. Siempre cura antes. Ids con prefijo rx_. Nada de trama: es una rival deportiva.

const npcs = {
	bruna: { name: 'Bruna', title: 'Analista del Circuito', look: { hair: 'pixie', hairColor: '#3d2b5c', streak: '#62d0c4', eyes: '#2f7a64', eyesStyle: 'narrow', brows: 'skeptic', mouth: 'smirk', nose: 'dot', head: 'long', build: 'narrow', collar: 'vest', outfit: '#2e5f7a', outfit2: '#f0e2c0', skin: 2, acc: 'squareglasses hairpin mole' } },
};

export default {
	npcs,
	items: {
		rxlibreta: { name: 'Página de la libreta de Bruna', pocket: 'key', desc: 'Una hoja cuadriculada arrancada con cuidado, llena de flechas, porcentajes y un dibujo bastante malo de tu equipo.',
			read: '**HOJA 14 · Gira · novatos de esta temporada**\n*Libreta de Bruna Ledesma, analista del Circuito (temporada en curso)*\n\nSale con el mismo Pokémon en cabeza un 70 % de las veces. Cambia poco. Cuando cambia, gana.\n\nNo usa objetos en los primeros turnos. Los usa tarde. Demasiado tarde, o justo a tiempo: aún no lo sé.\n\nSus Pokémon le miran antes de atacar. Eso no sale en ninguna estadística.\n\n*Al margen, con otro bolígrafo:* «Te la regalo. Tengo copia. Tengo copia de todo.»' },
	},
	trainers: {
		// El equipo de verdad lo arma app/js/rival.js antes de cada combate (`{ rival: 'prep' }`); este es solo de reserva.
		rx_bruna: { name: 'Bruna', cls: 'Analista', npc: 'bruna', ai: 3, base: 60,
			team: [{ sp: 'alakazam', lv: 30, moves: ['psychic', 'shadowball', 'dazzlinggleam', 'energyball'] }],
			intro: 'Hipótesis: hoy gano yo. Vamos a comprobarla.', win: 'Interesante. Muy interesante.', lose: 'Dato confirmado.' },
	},
	mail: [
		{ id: 'rx_carta_libreta', kind: 'carta', from: 'Bruna', npc: 'bruna', title: 'Una hoja arrancada', cond: 'flag.rx_conocida', days: 1, item: 'rxlibreta' },
	],
	radio: [
		{ id: 'rl_ded_bruna', kind: 'dedicatoria', from: 'Bruna', cond: 'flag.rx_conocida', text: 'Una dedicatoria que nos llega con una gráfica pegada: «Para {jugador}, que me obliga a rehacer las cuentas cada dos medallas. Sigue así. O no. Ya me adapto.» Firmado: Bruna, analista. Y con ella, algo con mucho ritmo y pocos datos.' },
	],
	scripts: {
		rx_primera: [
			{ text: 'Una chica con el pelo muy corto y unas gafas cuadradas te mira por encima de una libreta. Apunta algo. Te vuelve a mirar. Apunta otra cosa.' },
			{ say: 'bruna', text: '{jugador}, ¿verdad? De la Gira. Bruna Ledesma. Corrí la clasificación del Circuito el año pasado y me eliminaron en la segunda ronda. Desde entonces, en vez de entrenar más, apunto.' },
			{ say: 'bruna', text: 'Veo todos los combates de la temporada. Todos. Los de la tele y los que me cuentan. Y tus números son los más raros de los novatos. No en el mal sentido. En el sentido de que no me cuadran.' },
			{ rival: 'saludo' },
			{ set: { 'flag.rx_conocida': true } },
			{ say: 'bruna', text: 'Te propongo una cosa: cada dos medallas, o cada gran combate, te busco. Tú me enseñas lo que has cambiado y yo te enseño lo que he aprendido. Sin apuestas. Solo datos.' },
			{ call: 'rx_reto' },
		],
		rx_encuentro: [
			{ text: 'Bruna está sentada en un banco con la libreta en las rodillas. Al verte, cierra el bolígrafo con un clic.' },
			{ rival: 'saludo' },
			{ call: 'rx_reto' },
		],
		rx_reto: [
			{ choice: [
				{ text: 'Aceptar el combate.', then: [
					{ say: 'bruna', text: 'Primero cura a los tuyos. Un combate con el equipo a medias me ensucia la muestra. Toma, tengo pociones de sobra: las compro al por mayor.' },
					{ heal: true },
					{ rival: 'prep' },
					{ battle: 'rx_bruna', onWin: [{ rival: 'gana' }], onLose: [{ rival: 'pierde' }, { heal: 'Bruna te pasa dos pociones sin mirarte, sin dejar de escribir. Tu equipo se recupera.' }] },
				] },
				{ text: 'Ahora no.', then: [
					{ say: 'bruna', text: 'Entendido. No es un no; es un «todavía no». Me quedo por aquí. Tengo que pasar a limpio cuarenta páginas.' },
				] },
			] },
		],
	},
};
