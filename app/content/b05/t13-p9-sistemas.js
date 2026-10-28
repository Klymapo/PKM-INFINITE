// Pasada 9 (2026-10-28, pedido de Mario) · sistemas: la Guardería de la Ruta 34 por fin tiene sitio.
// El motor vive en app/js/guarderia.js (niveles por tiempo real, huevos por grupo huevo, eclosión por combates).
export default {
	patches: {
		ruta34: {
			route: {
				tramos: {
					// mismo tramo que la casita del B2 (ver b02/t2-trigal.js, «Guardería Pokémon»)
					3: [
						{ talk: [{ script: 'p9_guarderia_abre' }], label: 'Dejar o recoger Pokémon', sub: 'El corral de la Guardería', icon: '🥚', cond: 'flag.b02_guarderia', new: '!flag.p9_guarderia_vista' },
					],
				},
			},
		},
	},
	scripts: {
		p9_guarderia_abre: [
			{ if: '!flag.p9_guarderia_vista', then: [
				{ set: { 'flag.p9_guarderia_vista': true } },
				{ say: 'guarderia_abuelo', text: '¡Anda, {jugador}! Por fin tenemos sitio: los Pokémon raros ya volvieron con sus dueños, casi todos. Mi mujer ha dicho que si quieres dejar a alguien, que sea hoy, antes de que se arrepienta.' },
				{ say: 'guarderia_abuelo', text: 'Aquí se cuidan bien: comen, corren, aprenden solos. Cobro cien por nivel que suban, que el pienso no es gratis. Y si dos se hacen amigos… bueno. Ya sabes cómo acaba eso. Con un huevo.' },
			] },
			{ daycare: true },
		],
	},
};
