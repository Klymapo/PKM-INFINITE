// Radio Lavanda (pedido de Mario; borrador en pausa/radio, terminado el 2026-10-28).
// Un canal que se escucha desde Más › Radio. Cada día real arma un «programa» de piezas (`radio: [...]` en un bloque,
// docs/CONTENIDO.md §14) que comentan lo que el jugador ya vivió: solo entran las piezas cuya `cond` se cumple.
// Lógica pura (sin DOM): se prueba en Node con herramientas/test/radio-test.mjs.
import { C } from './content.js';

export const RADIO = {
	unlock: 'lavanda',   // se sintoniza en cuanto has pisado Pueblo Lavanda
	perShow: 4,          // piezas por programa
	histLen: 24,         // las últimas N piezas oídas pierden prioridad
	order: ['clima', 'noticia', 'dedicatoria', 'noticia', 'consejo', 'musica'],
};

export function radioOn(g) { return !!g?.visited?.[RADIO.unlock]; }

/** Clave del día local (AAAA-MM-DD). */
export function dayKey(d = new Date()) {
	const p = n => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Generador pseudoaleatorio con semilla (mulberry32 sobre un hash de la cadena). */
export function seeded(str) {
	let h = 1779033703 ^ str.length;
	for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
	let a = h >>> 0;
	return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Piezas que pueden sonar ahora. */
export function available(cond = () => true, list = C.radio || []) {
	return list.filter(p => p && p.id && p.text && (!p.cond || cond(p.cond)));
}

/**
 * Programa del día: hasta `perShow` piezas, sin repetir, siguiendo `order` cuando hay de ese tipo.
 * Las que ya oíste hace poco (g.radio.hist) solo entran si no queda otra. Mismo día → mismo programa.
 */
export function programa(g, { day = dayKey(), cond = () => true, list } = {}) {
	const pool = available(cond, list);
	if (!pool.length) return [];
	const rnd = seeded(day + '|' + (g?.player?.name || ''));
	const recent = new Set(g?.radio?.hist || []);
	const out = [], used = new Set();
	const pick = kind => {
		const cand = pool.filter(p => !used.has(p.id) && (!kind || p.kind === kind));
		if (!cand.length) return null;
		const fresh = cand.filter(p => !recent.has(p.id));
		const from = fresh.length ? fresh : cand;
		// las piezas con cond (atadas a lo que hiciste) pesan el doble que las genéricas
		const w = from.map(p => (p.w ?? 1) * (p.cond ? 2 : 1));
		let r = rnd() * w.reduce((a, b) => a + b, 0);
		for (let i = 0; i < from.length; i++) { r -= w[i]; if (r < 0) return from[i]; }
		return from[from.length - 1];
	};
	for (const kind of RADIO.order) {
		if (out.length >= RADIO.perShow) break;
		const p = pick(kind);
		if (p) { out.push(p); used.add(p.id); }
	}
	while (out.length < Math.min(RADIO.perShow, pool.length)) { const p = pick(null); if (!p) break; out.push(p); used.add(p.id); }
	return out;
}

/** Apunta que escuchaste el programa (para no repetir las mismas piezas los días siguientes). */
export function markHeard(g, show, day = dayKey()) {
	const R = (g.radio ||= { hist: [], days: 0 });
	if (R.lastDay !== day) { R.days = (R.days || 0) + 1; R.lastDay = day; }
	R.hist = [...show.map(p => p.id), ...(R.hist || []).filter(id => !show.some(p => p.id === id))].slice(0, RADIO.histLen);
	R.heard = R.heard || {};
	for (const p of show) R.heard[p.id] = 1;
}

/** ¿Hay programa sin oír hoy? (para el punto de novedad en el menú) */
export const newToday = (g, day = dayKey()) => radioOn(g) && g?.radio?.lastDay !== day;
