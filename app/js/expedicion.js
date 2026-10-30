// Expediciones (pedido de Mario, 2026-10-29): mandar Pokémon del PC a rutas ya visitadas.
// Lógica pura (sin interfaz); la pantalla está en ui/expedicion-ui.js (Más › Expediciones).
//   · Solo del PC: ni del equipo ni de los que trabajan en negocios. Mientras está fuera, no está en el PC
//     (un Pokémon no puede estar en dos sitios; `owns()` lo sigue contando).
//   · Hasta 3 a la vez, de 4, 8 o 12 horas reales, a rutas visitadas que tengan puntos de recolección.
//   · Vuelven con objetos de los `gather` de esa ruta (lo común; rara vez una entrada `rare`), una bitácora
//     de 2–3 líneas y algo de amistad y experiencia (como mucho un nivel). Nunca dinero.
import { G, evalCond, addItem, boxInsert } from './state.js';
import { C } from './content.js';
import { D, toID, expForLevel } from './data.js';
import { addHappy, addExp, expGain } from './pokemon.js';
import { gatherCargo, sumCargo } from './minijuegos.js';

export const MAX = 3;
export const DURATIONS = [4, 8, 12];
const H = 3600e3;
const ok = c => { try { return c === undefined || evalCond(c); } catch (e) { return false; } };
export const expState = (g = G) => (g.exp ||= { active: [], log: [] });

/** Puntos de recolección de una ruta (sus tramos y sus spots). */
export function gathersOf(locId) {
	const L = C.locations[locId], out = new Set();
	if (!L) return [];
	for (const s of [...Object.values(L.route?.tramos || {}).flat(), ...(L.spots || [])]) {
		const a = s?.spot?.action || s?.action;
		if (a?.gather && C.gather[a.gather]) out.add(a.gather);
	}
	return [...out];
}
/** Rutas a las que se puede mandar una expedición: visitadas, con recolección. */
export function destinations() {
	return Object.values(C.locations).filter(l => l.route && G.visited?.[l.id] && gathersOf(l.id).length).map(l => ({ id: l.id, name: l.name, region: l.region, gathers: gathersOf(l.id) }));
}
/** Nivel medio de los salvajes de una ruta (para la experiencia). */
function routeLevel(locId) {
	const enc = Object.values(C.locations[locId]?.route?.encounters || {}).flat();
	if (!enc.length) return 10;
	return Math.round(enc.reduce((a, e) => a + (Array.isArray(e.lv) ? (e.lv[0] + e.lv[1]) / 2 : e.lv || 10), 0) / enc.length);
}
/** Candidatos: Pokémon del PC (no huevos). */
export function candidates() {
	const out = [];
	G.boxes.forEach((b, bi) => b.forEach((p, idx) => { if (p && !p.egg) out.push({ p, box: bi, idx }); }));
	return out;
}
export const busyCount = () => expState().active.length;

/** Manda a un Pokémon del PC (por uid) a una ruta durante `hours` horas. */
export function sendExpedition(uid, locId, hours, t = Date.now()) {
	const st = expState();
	if (st.active.length >= MAX) return { ok: false, msg: `Como mucho ${MAX} expediciones a la vez.` };
	if (!DURATIONS.includes(hours)) return { ok: false, msg: 'Duración no válida.' };
	if (!destinations().some(d => d.id === locId)) return { ok: false, msg: 'No conoces esa ruta.' };
	if (G.party.some(p => p.uid === uid)) return { ok: false, msg: 'Solo pueden ir Pokémon del PC.' };
	for (let bi = 0; bi < G.boxes.length; bi++) {
		const idx = G.boxes[bi].findIndex(p => p && p.uid === uid);
		if (idx < 0) continue;
		const [p] = G.boxes[bi].splice(idx, 1);
		st.active.push({ mon: p, loc: locId, start: t, hours });
		return { ok: true, mon: p };
	}
	return { ok: false, msg: 'Ese Pokémon no está en el PC.' };
}
export const remaining = (e, t = Date.now()) => Math.max(0, e.start + e.hours * H - t);
export const isBack = (e, t = Date.now()) => remaining(e, t) <= 0;

const pick = (rnd, xs) => xs[Math.floor(rnd() * xs.length)];
const name = p => p.nick || D.species[p.sp]?.name || p.sp;
/** Bitácora procedural: 2–3 líneas con la ruta, la hora y lo que encontró. */
export function logbook(e, items, rnd = Math.random) {
	const p = e.mon, n = name(p), L = C.locations[e.loc]?.name || 'la ruta';
	const its = Object.keys(items).map(k => D.items[k]?.name || k);
	const a = pick(rnd, [
		`${n} salió hacia ${L} con paso decidido y sin mirar atrás.`,
		`${n} llegó a ${L} cuando el sol todavía no calentaba.`,
		`${n} recorrió ${L} de punta a punta, dos veces, por si acaso.`,
		`En ${L}, ${n} encontró un sitio a la sombra y lo convirtió en su campamento.`,
	]);
	const b = its.length ? pick(rnd, [
		`Volvió con ${its.slice(0, 2).join(' y ')}${its.length > 2 ? ' y alguna cosa más' : ''}, muy orgullos@ de su botín.`,
		`Lo primero que encontró fue ${its[0]}; lo demás, dice su cara, costó más.`,
		`Trae ${its.slice(0, 2).join(' y ')} con cuidado, como quien trae un tesoro.`,
	]) : `Esta vez no encontró gran cosa, pero vuelve contento de haber salido.`;
	const c = pick(rnd, [
		`Se cruzó con unos Pokémon salvajes y, según parece, hicieron las paces.`,
		`Viene con barro encima y una hoja enganchada que no se quiere quitar.`,
		`Se nota que ha dormido al raso: bosteza y te busca con la mirada.`,
		null, null,
	]);
	return [a, b, c].filter(Boolean).map(x => x.replace('orgullos@', ['ella', 'F'].includes(p.gender) ? 'orgullosa' : 'orgulloso'));
}

/** Recoge una expedición terminada: objetos, bitácora, amistad y algo de experiencia. El Pokémon vuelve al PC. */
export function collectExpedition(i, { rnd = Math.random, t = Date.now() } = {}) {
	const st = expState(), e = st.active[i];
	if (!e || !isBack(e, t)) return null;
	const tandas = e.hours / 4; // 1–3
	const cargo = [];
	for (const gid of gathersOf(e.loc)) {
		const g = C.gather[gid];
		for (let k = 0; k < tandas; k++) cargo.push(...gatherCargo(g, { rnd, cond: ok, withExtra: false }).slice(0, 1));
	}
	// como mucho 2 × tandas cosas comunes, y rara vez una entrada `rare` (más probable cuanto más larga)
	let items = sumCargo(cargo.sort(() => rnd() - 0.5).slice(0, 2 * tandas));
	let special = null;
	if (rnd() < 0.04 * tandas) {
		const rares = gathersOf(e.loc).flatMap(gid => (C.gather[gid].table || []).filter(x => x.rare && ok(x.cond)));
		if (rares.length) { special = toID(pick(rnd, rares).id); items[special] = (items[special] || 0) + 1; }
	}
	for (const k in items) addItem(k, items[k]);
	const p = e.mon;
	addHappy(p, 10 * tandas);
	// experiencia moderada: como un par de combates por tanda contra lo de la ruta, y nunca más de un nivel
	const foe = { sp: (Object.values(C.locations[e.loc]?.route?.encounters || {}).flat()[0]?.sp) || 'rattata', lv: routeLevel(e.loc) };
	let xp = 0;
	try { xp = Math.floor(expGain(p, foe, { cap: G.vars.cap || 100 }) * 2 * tandas * 0.5); } catch (err) { xp = 0; }
	const lv0 = p.lv;
	if (xp > 0 && p.lv < 99) xp = Math.max(0, Math.min(xp, expForLevel(D.species[p.sp].growth, lv0 + 2) - 1 - p.exp));
	if (xp > 0 && p.lv < 100) addExp(p, xp);
	const log = logbook(e, items, rnd);
	st.active.splice(i, 1);
	const box = boxInsert(G, p);
	const res = { mon: p, loc: e.loc, hours: e.hours, items, special, xp, lvUp: p.lv > lv0, log, box, t };
	st.log.unshift({ t, sp: p.sp, name: name(p), loc: e.loc, items, log });
	st.log.length = Math.min(st.log.length, 10);
	return res;
}
/** Recoge todas las que ya volvieron. */
export function collectAllExpeditions(opts) {
	const out = [];
	for (let i = expState().active.length - 1; i >= 0; i--) { const r = collectExpedition(i, opts); if (r) out.push(r); }
	return out;
}
export const readyCount = (t = Date.now()) => expState().active.filter(e => isBack(e, t)).length;
/** Para owns()/Pokédex: Pokémon que están de expedición. */
export const awayMons = (g = G) => (g?.exp?.active || []).map(e => e.mon);
