// Radio de emergencias de la Red de Auxilio (pedido de Mario, 2026-10-24).
// Lógica pura: decide si al llegar a un lugar suena un aviso, cuál, y prepara su guion. La interfaz (screens.js)
// solo pregunta «¿vas?» y corre el guion. Se prueba en Node: herramientas/test/radio-test.mjs.
// Formato del contenido (`radio: [...]` en un bloque): docs/CONTENIDO.md §14.
import { C, topLoc } from './content.js';

export const RADIO = {
	item: 'cg_radio',          // objeto clave que la activa
	chance: 0.15,              // probabilidad por viaje que cumple las condiciones
	cooldownMs: 20 * 60e3,     // tiempo mínimo entre dos avisos (reloj real)
	maxSession: 2,             // avisos como mucho por sesión de juego (se reinicia al abrir el juego)
	histLen: 8,                // las últimas N emergencias no se repiten
};

let session = 0;
/** Solo para pruebas: empieza una sesión nueva. */
export function resetSession() { session = 0; }
export const sessionCount = () => session;

/** ¿Tiene la radio y la tiene encendida? (Ajustes › Radio de emergencias) */
export function radioOn(g) { return (g?.bag?.[RADIO.item] || 0) > 0 && g?.settings?.radio !== false; }

const regionOf = id => topLoc(id)?.region || '';

/** Emergencias que pueden sonar al llegar a `dest`: las de su región cuyo sitio (`where`) ya visitaste. */
export function candidates(g, dest, cond = () => true) {
	const region = regionOf(dest);
	if (!region) return [];
	const recent = g?.radio?.hist || [];
	return (C.radio || []).filter(e => {
		if (recent.includes(e.id)) return false;
		if (e.region !== region) return false;
		if (e.where && !g?.visited?.[e.where]) return false;
		if (e.cond && !cond(e.cond)) return false;
		return !!C.scripts[e.script];
	});
}

/**
 * ¿Suena la radio al llegar a `dest`? Devuelve la emergencia o null.
 * opts: { rand, now, cond (evalCond), blocked (hay escena, misión principal aquí o algo pendiente al llegar) }
 */
export function rollRadio(g, dest, { rand = Math.random, now = Date.now(), cond = () => true, blocked = false } = {}) {
	if (blocked || !radioOn(g)) return null;
	if (session >= RADIO.maxSession) return null;
	if (g.radio?.last && now - g.radio.last < RADIO.cooldownMs) return null;
	if (rand() >= RADIO.chance) return null;
	const list = candidates(g, dest, cond);
	if (!list.length) return null;
	let r = rand() * list.reduce((a, e) => a + (e.w ?? 1), 0);
	for (const e of list) { r -= e.w ?? 1; if (r < 0) return e; }
	return list[list.length - 1];
}

/** Apunta que sonó (aceptada o no): cuenta para la sesión, el tiempo de espera y la lista de recientes. */
export function markRadio(g, e, accepted, now = Date.now()) {
	session++;
	const R = (g.radio ||= { hist: [], n: 0, ok: 0 });
	R.last = now;
	R.n = (R.n || 0) + 1;
	if (accepted) R.ok = (R.ok || 0) + 1;
	R.hist = [e.id, ...(R.hist || []).filter(x => x !== e.id)].slice(0, RADIO.histLen);
}

export const callText = e => e.call || '';

/** Nivel para un Pokémon de la radio (`lvRel` en `wild` o `pokemon`): unos niveles por debajo de tu mejor Pokémon. */
export function nivelRadio(g, rel = 0) {
	const top = Math.max(5, ...(g?.party || []).map(p => p.lv || 0));
	return Math.max(5, Math.min(100, Math.round(top - 3 + rel)));
}

/** Copia del guion de la emergencia con los niveles relativos (`lvRel`) ya calculados para esta partida. */
export function prepareRadio(e, g) {
	const fix = v => {
		if (Array.isArray(v)) return v.map(fix);
		if (!v || typeof v !== 'object') return v;
		const o = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fix(x)]));
		if (o.lvRel !== undefined) { o.lv = nivelRadio(g, o.lvRel); delete o.lvRel; }
		return o;
	};
	return fix(C.scripts[e.script] || []);
}
