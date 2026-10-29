// Copa Luminalia (pedido de Mario, 2026-10-28): torneo de 4 combates seguidos con reglas.
//   · Monotipo: eliges un tipo y llevas 3 Pokémon de ese tipo (del equipo o del PC).
//   · Todos a Nv. 50 (los tuyos y los rivales) y sin objetos equipados ni Mochila.
//   · No se gana experiencia; entre ronda y ronda se cura todo. Tus Pokémon de verdad no cambian.
// Premio: puntos por ronda ganada (más un extra por ganar la copa), que se canjean en el mostrador.
// Lógica pura: se prueba en Node con herramientas/test/torneo-test.mjs.
import { D, toID } from './data.js';

export const TORNEO = {
	level: 50, size: 3, rounds: 4, fee: 2000,
	pts: [2, 3, 4, 6],     // puntos por ganar cada ronda
	champBonus: 5,         // extra por ganar la copa entera
	bst: [[430, 500], [470, 530], [500, 560], [530, 600]], // fuerza de los rivales por ronda
};

const ALL_TYPES = () => Object.keys(D.types || {}).filter(t => t !== 'Stellar' && D.types[t]?.name);
export const typesOf = sp => D.species[toID(sp)]?.types || [];
const bstOf = s => (s.bs || []).reduce((a, b) => a + b, 0);

/** Tipos con los que puedes inscribirte: los que tienen al menos `size` Pokémon tuyos (no huevos). */
export function eligibleTypes(mons, size = TORNEO.size) {
	const n = {};
	for (const p of mons) for (const t of typesOf(p.sp)) n[t] = (n[t] || 0) + 1;
	return ALL_TYPES().filter(t => (n[t] || 0) >= size).sort((a, b) => n[b] - n[a] || a.localeCompare(b));
}

/** ¿Es válida la inscripción? Devuelve null si sí, o el motivo. */
export function checkEntry(type, picked, size = TORNEO.size) {
	if (!type) return 'Elige un tipo.';
	if (picked.length !== size) return `Hacen falta ${size} Pokémon.`;
	if (new Set(picked.map(p => p.uid ?? p)).size !== picked.length) return 'No puedes repetir Pokémon.';
	const bad = picked.find(p => !typesOf(p.sp).includes(type));
	if (bad) return `${D.species[bad.sp]?.name || bad.sp} no es de tipo ${D.types[type]?.name || type}.`;
	return null;
}

/** Copia para el torneo: Nv. 50, sin objeto, sanita. El original no se toca. */
export function entrant(p, level = TORNEO.level) {
	const c = JSON.parse(JSON.stringify(p));
	c.lv = level; c.item = ''; c.status = ''; c.sleepTurns = 0;
	c.giraOf = p.uid;
	return c;
}

/** Generador con semilla (para que la misma inscripción dé los mismos rivales). */
export function rng(seed) {
	let a = 0; for (const ch of String(seed)) a = (Math.imul(a ^ ch.charCodeAt(0), 2654435761) + 1) | 0;
	return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Especies que pueden salir de rival: evolución final, sin formas raras, sin legendarios ni singulares, BST en el rango. */
export function rivalPool([lo, hi]) {
	return Object.keys(D.species).filter(id => {
		const s = D.species[id];
		if (!s || s.forme || s.base || s.nonstd || s.legend || (s.tags || []).length || !s.num || s.num > 1025) return false;
		if ((s.evos || []).length) return false;
		const b = bstOf(s);
		return b >= lo && b <= hi;
	});
}

const CLASES = ['Entrenadora Guay', 'Entrenador Guay', 'As del Combate', 'Experta', 'Veterano', 'Campeona Regional', 'Dama', 'Caballero'];
const NOMBRES = ['Aitana', 'Bruno', 'Celia', 'Darío', 'Elena', 'Fabián', 'Gala', 'Hugo', 'Inés', 'Joel', 'Lucía', 'Marco', 'Noa', 'Óscar', 'Paula', 'Quique', 'Rocío', 'Saúl', 'Tania', 'Unai', 'Vera', 'Yago', 'Zoe'];

/** Rival de la ronda `r` (0..3): definición de entrenador lista para `trainerObj`. */
export function rival(r, seed) {
	const rnd = rng(seed + '|' + r);
	const pool = rivalPool(TORNEO.bst[r]);
	const team = [];
	while (team.length < TORNEO.size && pool.length) team.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);
	const name = NOMBRES[Math.floor(rnd() * NOMBRES.length)], cls = CLASES[Math.floor(rnd() * CLASES.length)];
	const last = r === TORNEO.rounds - 1;
	return {
		id: 'copa_luminalia_' + r, name, cls, look: { seed: name + seed + r },
		intro: last ? 'La final. Aquí no hay segundas vueltas.' : ['A ver qué tal se te da a Nv. 50.', 'Mismo nivel, mismas reglas. Que gane quien piense mejor.', 'Llevo toda la semana preparando esto.'][r % 3],
		win: last ? 'Bien jugado. La copa es tuya.' : 'Tú sigues. Yo me voy a repasar mis apuntes.',
		lose: null, reward: 0,
		team: team.map(sp => ({ sp, lv: TORNEO.level, iv: 20 + r * 3 })),
	};
}

/** Puntos que se ganan habiendo ganado `wins` rondas. */
export function pointsFor(wins) {
	let p = 0;
	for (let i = 0; i < Math.min(wins, TORNEO.rounds); i++) p += TORNEO.pts[i];
	if (wins >= TORNEO.rounds) p += TORNEO.champBonus;
	return p;
}
