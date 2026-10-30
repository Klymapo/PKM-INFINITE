// Carreras de monturas (pedido de Mario, 2026-10-30). Lógica pura: se prueba en Node (herramientas/test/carreras-test.mjs).
// Un circuito por región con monturas, contra 3 rivales con nombre. Se corre por tramos: en cada uno eliges camino.
// Cada montura va más rápida o más lenta según el terreno, y solo algunas abren ciertos atajos
// (Rhyhorn parte roca, Lapras nada, Aerodactyl vuela…). Los caminos con salto se juegan con un toque a tiempo.
// Premios modestos (objetos, nunca dinero grande) y un récord por circuito. Formato en docs/CONTENIDO.md §18.
import { G, evalCond, addItem } from './state.js';
import { C } from './content.js';
import { toID } from './data.js';

export const TERRAINS = {
	llano: { name: 'Llano', icon: '🟫' }, roca: { name: 'Roca', icon: '🪨' }, agua: { name: 'Agua', icon: '🌊' },
	cielo: { name: 'Cielo', icon: '☁️' }, barro: { name: 'Barro', icon: '🟤' }, bosque: { name: 'Bosque', icon: '🌲' },
	monte: { name: 'Ladera', icon: '⛰️' }, arena: { name: 'Arena', icon: '🏖️' },
};
/** Qué hace falta para cada atajo (texto para el botón bloqueado). */
export const SKILL_TEXT = {
	roca: 'una montura que parta roca', agua: 'una montura que nade', cielo: 'una montura que vuele',
	monte: 'una montura que trepe laderas', barro: 'una montura que no se hunda en el barro', bosque: 'una montura que salte entre los árboles',
};

// Velocidad relativa por terreno (1 = normal). `skill`: el tipo de atajo que abre. `own`: condición para tenerla.
// Las de alquiler (`rent`) solo están en el circuito que las ofrece.
export const MOUNTS = {
	rhyhorn: { name: 'Rhyhorn', sp: 'rhyhorn', icon: '🦏', own: 'flag.mount_rhyhorn', skill: 'roca', note: 'Embiste la roca. Lento en el agua.',
		spd: { llano: 1.0, roca: 1.2, barro: 1.05, agua: 0.6, bosque: 0.9, monte: 0.85, arena: 1.0, cielo: 1 } },
	lapras: { name: 'Lapras', sp: 'lapras', icon: '🌊', own: 'flag.mount_lapras', skill: 'agua', note: 'Vuela en el agua. En tierra, se arrastra.',
		spd: { llano: 0.8, roca: 0.65, barro: 0.85, agua: 1.4, bosque: 0.75, monte: 0.6, arena: 0.85, cielo: 1 } },
	aerodactyl: { name: 'Aerodactyl', sp: 'aerodactyl', icon: '🦅', own: 'flag.mount_aerodactyl', skill: 'cielo', note: 'Corta por el aire. Entre árboles, se enreda.',
		spd: { llano: 1.0, roca: 1.0, barro: 1.0, agua: 1.05, bosque: 0.8, monte: 1.05, arena: 1.0, cielo: 1.3 } },
	gogoat: { name: 'Gogoat', sp: 'gogoat', icon: '🐐', rent: true, skill: 'monte', note: 'De alquiler. Trepa laderas como si nada.',
		spd: { llano: 1.0, roca: 0.95, barro: 0.95, agua: 0.7, bosque: 1.1, monte: 1.2, arena: 0.95, cielo: 1 } },
	tauros: { name: 'Tauros', sp: 'tauros', icon: '🐂', rent: true, skill: null, note: 'De alquiler. El más rápido en llano; sin atajos.',
		spd: { llano: 1.15, roca: 0.95, barro: 0.9, agua: 0.7, bosque: 0.95, monte: 0.85, arena: 1.0, cielo: 1 } },
	mudsdale: { name: 'Mudsdale', sp: 'mudsdale', icon: '🐴', rent: true, skill: 'barro', note: 'De alquiler. El barro no lo frena.',
		spd: { llano: 0.95, roca: 1.05, barro: 1.25, agua: 0.75, bosque: 0.9, monte: 0.95, arena: 1.0, cielo: 1 } },
	stoutland: { name: 'Stoutland', sp: 'stoutland', icon: '🐕', rent: true, skill: 'bosque', note: 'De alquiler. Rastrea atajos entre los árboles.',
		spd: { llano: 1.05, roca: 0.9, barro: 0.95, agua: 0.75, bosque: 1.15, monte: 0.9, arena: 0.95, cielo: 1 } },
	zebstrika: { name: 'Zebstrika', sp: 'zebstrika', icon: '⚡', rent: true, skill: null, note: 'De alquiler. Un rayo en llano; sin atajos.',
		spd: { llano: 1.18, roca: 0.9, barro: 0.85, agua: 0.7, bosque: 0.95, monte: 0.85, arena: 1.0, cielo: 1 } },
	sawsbuck: { name: 'Sawsbuck', sp: 'sawsbuck', icon: '🦌', rent: true, skill: 'bosque', note: 'De alquiler. Salta entre los árboles.',
		spd: { llano: 1.05, roca: 0.9, barro: 0.9, agua: 0.75, bosque: 1.2, monte: 1.0, arena: 0.95, cielo: 1 } },
	bouffalant: { name: 'Bouffalant', sp: 'bouffalant', icon: '🦬', rent: true, skill: 'roca', note: 'De alquiler. Embiste lo que le pongan delante.',
		spd: { llano: 0.95, roca: 1.15, barro: 1.0, agua: 0.65, bosque: 0.9, monte: 0.85, arena: 0.95, cielo: 1 } },
};

/** Multiplicador de tiempo de un salto según la calidad del toque (0 fallo … 3 perfecto). */
export const JUMP = [1.3, 1.05, 0.92, 0.82];
/** Horas reales entre premios de victoria (el récord siempre cuenta). */
export const PRIZE_H = 20;

const ok = c => { try { return c === undefined || evalCond(c); } catch (e) { return false; } };
export const raceDef = id => C.races?.[id];
export const raceState = id => ((G.races ||= {})[id] ||= { runs: 0, wins: 0, best: null, lastWin: 0, firstWin: 0, bestMount: null });

/** Circuitos visibles ahora. */
export function racesOpen() { return Object.keys(C.races || {}).filter(id => ok(C.races[id].cond)); }

/** Monturas con las que puedes correr en este circuito: las tuyas y las de alquiler del circuito. */
export function mountsFor(id) {
	const def = raceDef(id);
	const out = [];
	for (const k in MOUNTS) { const m = MOUNTS[k]; if (!m.rent && ok(m.own)) out.push({ id: k, ...m }); }
	for (const k of def?.rent || []) if (MOUNTS[k]) out.push({ id: k, ...MOUNTS[k] });
	return out;
}
const spd = (m, t) => (MOUNTS[m]?.spd?.[t] ?? 1);
/** ¿Puede esta montura ir por este camino? */
export const canTake = (mount, path) => !path.need || MOUNTS[mount]?.skill === path.need;
/** Segundos de un camino con una montura (q = calidad del salto si lo hay). */
export function pathTime(mount, path, q = 2) {
	let t = (path.len || 10) / spd(mount, path.terrain || 'llano');
	if (path.jump) t *= JUMP[Math.max(0, Math.min(3, q))];
	return t;
}
/** El camino que tomaría alguien con esa montura (el más rápido de los que puede, con un salto normal). */
export function bestPath(mount, tramo, q = 2) {
	let best = null;
	tramo.paths.forEach((p, i) => { if (!canTake(mount, p)) return; const t = pathTime(mount, p, q); if (!best || t < best.t) best = { i, t, path: p }; });
	return best;
}

/** Generador con semilla. */
export function rng(seed) {
	let a = 0; for (const ch of String(seed)) a = (Math.imul(a ^ ch.charCodeAt(0), 2654435761) + 1) | 0;
	return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/**
 * Tiempos de los rivales tramo a tramo: cada uno va por su mejor camino con su montura, a su ritmo (`pace`, <1 = más rápido),
 * con un ±5 % de variación por tramo. Devuelve [{ npc, name, mount, splits: [s…], total }].
 */
export function rivalRun(id, seed = 'x') {
	const def = raceDef(id), rnd = rng(id + '|' + seed);
	return (def.rivals || []).map(r => {
		const splits = def.tramos.map(tr => {
			const x = rnd(), q = x < 0.15 ? 1 : x < 0.85 ? 2 : 3;
			const b = bestPath(r.mount, tr, q) || { t: 12 };
			return +(b.t * (r.pace || 1) * (0.95 + rnd() * 0.1)).toFixed(2);
		});
		return { npc: r.npc, name: r.name || C.npcs[r.npc]?.name || r.npc, mount: r.mount, splits, total: +splits.reduce((a, b) => a + b, 0).toFixed(2) };
	});
}

/** Posición (1 = primero) tras `n` tramos con tus parciales `mine`. Devuelve { pos, ahead: {name, gap} | null, behind }. */
export function standing(rivals, mine, n = mine.length) {
	const me = mine.slice(0, n).reduce((a, b) => a + b, 0);
	const rows = rivals.map(r => ({ name: r.name, t: r.splits.slice(0, n).reduce((a, b) => a + b, 0) })).concat([{ me: true, t: me }]).sort((a, b) => a.t - b.t);
	const pos = rows.findIndex(x => x.me) + 1;
	const ahead = pos > 1 ? { name: rows[pos - 2].name, gap: +(me - rows[pos - 2].t).toFixed(2) } : null;
	const behind = pos < rows.length ? { name: rows[pos].name, gap: +(rows[pos].t - me).toFixed(2) } : null;
	return { pos, ahead, behind, me: +me.toFixed(2) };
}

/** Formato de tiempo: 1:04,3 */
export function fmtTime(s) {
	if (s === null || s === undefined) return '—';
	const m = Math.floor(s / 60), r = s - m * 60;
	return (m ? m + ':' + (r < 10 ? '0' : '') : '') + r.toFixed(1).replace('.', ',') + (m ? '' : ' s');
}

/**
 * Cierra una carrera: guarda récord y victorias, y decide los premios.
 * Devuelve { pos, total, record, prevBest, prizes: [{ id, n, why }], first }.
 * El premio de victoria se da como mucho una vez cada PRIZE_H horas reales; el primero y el récord, siempre.
 */
export function finishRace(id, mount, mineSplits, rivals, now = Date.now()) {
	const def = raceDef(id), st = raceState(id);
	const total = +mineSplits.reduce((a, b) => a + b, 0).toFixed(2);
	const pos = standing(rivals, mineSplits).pos;
	st.runs++;
	const prevBest = st.best;
	const record = prevBest === null || total < prevBest - 1e-9;
	if (record) { st.best = total; st.bestMount = mount; }
	const prizes = [];
	let first = false;
	if (pos === 1) {
		st.wins++;
		if (!st.firstWin) { first = true; st.firstWin = now; for (const p of def.prize?.first || []) prizes.push({ ...p, why: 'first' }); }
		else if (now - (st.lastWin || 0) >= PRIZE_H * 3600e3) {
			const pool = def.prize?.win || [];
			if (pool.length) prizes.push({ ...pool[(st.wins - 2 + pool.length) % pool.length], why: 'win' });
		}
		if (first || now - (st.lastWin || 0) >= PRIZE_H * 3600e3) st.lastWin = now;
	} else if (pos <= 3 && now - (st.lastPodium || 0) >= PRIZE_H * 3600e3 && def.prize?.podium) {
		st.lastPodium = now;
		prizes.push({ ...def.prize.podium, why: 'podium' });
	}
	if (record && prevBest !== null && def.prize?.record) prizes.push({ ...def.prize.record, why: 'record' });
	for (const p of prizes) addItem(toID(p.id), p.n || 1);
	if (pos === 1) G.flags['carrera_' + id + '_ganada'] = true;
	st.last = { t: now, total, pos, mount };
	return { pos, total, record, prevBest, prizes, first };
}

/** Carrera sin interfaz (bot, pruebas): elige el mejor camino con saltos de calidad `q`. */
export function autoRun(id, mount, q = 2, seed = 'bot') {
	const def = raceDef(id);
	const rivals = rivalRun(id, seed);
	const mine = def.tramos.map(tr => +(bestPath(mount, tr, q)?.t || 12).toFixed(2));
	return { rivals, mine };
}
