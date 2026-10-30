// Negocios: administración de recursos (pedido de Mario, 2026-10-10).
// Lógica pura, sin interfaz, para poder probarla en Node. La pantalla está en ui/negocios-ui.js.
//
// Un negocio (rancho, taller, puesto…) lo define el contenido en `ventures` (docs/CONTENIDO.md §13).
// El jugador entra como socio, reparte el esfuerzo entre sus líneas de producción, compra mejoras,
// pone a trabajar a Pokémon del PC, elige encargado y pasa a recoger lo que se acumula en tiempo real.
// Lo que no se recoge se pierde cuando el almacén se llena: hay que pasar a verlo.
import { G, evalCond, addItem, removeItem, setPath, boxInsert } from './state.js';
import { C } from './content.js';
import { D, toID } from './data.js';
import { addHappy } from './pokemon.js';

export const DAY = 86400e3;
const ok = c => { try { return c === undefined || evalCond(c); } catch (e) { return false; } };
const first = (list, fallback = null) => (list || []).find(x => ok(x.cond)) || fallback;

export const ventureDef = id => C.ventures?.[id];
export function ventureState(id) { return (G.neg ||= {})[id] || null; }
export const owned = id => !!ventureState(id)?.owned;

/** Negocios visibles: los tuyos y las oportunidades cuya condición ya se cumple. */
export function ventureList() {
	const out = [];
	for (const id in C.ventures || {}) {
		const def = C.ventures[id];
		if (owned(id)) out.push({ id, def, st: ventureState(id), status: 'owned' });
		else if (ok(def.cond)) out.push({ id, def, st: null, status: 'offer' });
	}
	return out;
}

/** Líneas de producción disponibles ahora (las que no están bloqueadas por condición o por una mejora). */
export function linesOf(id) {
	const def = ventureDef(id), st = ventureState(id) || {};
	const out = {};
	for (const k in def.lines || {}) {
		const ln = def.lines[k];
		if (!ok(ln.cond)) continue;
		if (ln.locked && !(def.upgrades || []).some(u => u.unlock === k && st.ups?.[u.id])) continue;
		out[k] = ln;
	}
	return out;
}

function normEffort(id) {
	const st = ventureState(id), keys = Object.keys(linesOf(id));
	st.effort ||= {};
	for (const k in st.effort) if (!keys.includes(k)) delete st.effort[k];
	let sum = keys.reduce((a, k) => a + (st.effort[k] || 0), 0);
	if (!keys.length) return;
	if (sum <= 0) { const each = Math.floor(10 / keys.length) * 10; keys.forEach(k => { st.effort[k] = each; }); sum = each * keys.length; }
	// lo que falte o sobre hasta 100 va a la primera línea
	if (sum !== 100) st.effort[keys[0]] = Math.max(0, (st.effort[keys[0]] || 0) + 100 - sum);
}

/** Entra en el negocio (paga la entrada). Devuelve { ok, msg }. */
export function joinVenture(id) {
	const def = ventureDef(id);
	if (!def || owned(id)) return { ok: false, msg: 'No disponible.' };
	const cost = def.buy?.cost || 0;
	if (G.player.money < cost) return { ok: false, msg: 'No te alcanza.' };
	G.player.money -= cost;
	(G.neg ||= {})[id] = { owned: true, since: Date.now(), last: Date.now(), fill: 0, bank: { money: 0, items: {} }, frac: {}, effort: {}, ups: {}, workers: [], manager: null, boosts: [], lastEvent: Date.now(), pending: null, earned: 0, spent: cost, log: [], supply: {}, feed: {}, chain: {}, synStr: {} };
	normEffort(id);
	G.neg[id].manager = homeManager(id);
	for (const k in def.buy?.set || {}) setPath(k, def.buy.set[k]);
	return { ok: true };
}

export function upgradesOf(id) {
	const def = ventureDef(id), st = ventureState(id) || { ups: {} };
	return (def.upgrades || []).map(u => ({
		...u, bought: !!st.ups?.[u.id],
		available: ok(u.cond) && (u.need || []).every(n => st.ups?.[n]),
		hidden: u.hidden !== undefined && ok(u.hidden),
	})).filter(u => !u.hidden);
}
export function managersOf(id) {
	const def = ventureDef(id);
	return (def.managers || []).filter(m => ok(m.cond)).map(m => ({ ...m, id: m.id || m.npc, name: m.name || C.npcs[m.npc]?.name || m.npc }));
}
export function slotsOf(id) {
	const def = ventureDef(id), st = ventureState(id) || { ups: {} };
	return (def.jobs?.slots || 0) + (def.upgrades || []).reduce((a, u) => a + (st.ups?.[u.id] ? (u.slots || 0) : 0), 0);
}
export function storeDays(id) {
	const def = ventureDef(id), st = ventureState(id) || { ups: {} };
	return (def.store || 3) + (def.upgrades || []).reduce((a, u) => a + (st.ups?.[u.id] ? (u.store || 0) : 0), 0);
}
export function sharePct(id) {
	const def = ventureDef(id), st = ventureState(id) || { ups: {} };
	const base = first(def.share, { pct: 100 }).pct;
	return Math.min(100, base + (def.upgrades || []).reduce((a, u) => a + (st.ups?.[u.id] ? (u.share || 0) : 0), 0));
}

/** Cuánto aporta un Pokémon que trabaja aquí (0.06–0.30) y por qué. */
export function workerBonus(id, p) {
	const def = ventureDef(id), jobs = def.jobs || {};
	const types = D.species[p.sp]?.types || [];
	const typed = (jobs.types || []).some(t => types.includes(t));
	// favs vale para toda la línea: { mareep: 0.1 } también cuenta para Flaaffy y Ampharos (gana la entrada más cercana)
	let fav = 0;
	for (let i = 0, id = p.sp; i < 4 && id; i++, id = D.species[id]?.prevo) if (jobs.favs?.[id] !== undefined) { fav = jobs.favs[id]; break; }
	const v = 0.06 + 0.06 * Math.min(100, p.lv) / 100 + (typed ? 0.08 : 0) + fav;
	return { v, typed, fav: fav > 0 };
}

/** Producción por día con la configuración actual, con el desglose para enseñarlo. */
export function rates(id) {
	const def = ventureDef(id), st = ventureState(id);
	const lines = linesOf(id);
	const mult = { all: 1 }, why = [];
	const addMult = (m, label) => { if (!m) return; for (const k in m) mult[k] = (mult[k] || 1) * m[k]; why.push({ label, m }); };
	for (const u of def.upgrades || []) if (st.ups?.[u.id]) addMult(u.mult, u.name);
	const mgr = managersOf(id).find(m => m.id === st.manager);
	if (mgr) addMult(mgr.mult, 'Encargad@: ' + mgr.name);
	let wb = 0;
	for (const p of st.workers || []) wb += workerBonus(id, p).v;
	if (wb) addMult({ all: 1 + wb }, `Pokémon trabajando (+${Math.round(wb * 100)} %)`);
	const t = Date.now();
	for (const b of st.boosts || []) if (b.until > t) addMult(b.mult, b.label || 'Racha');
	for (const sy of synergiesOf(id)) {
		if (sy.strength > 0) { const m = {}; for (const k in sy.mult) m[k] = 1 + (sy.mult[k] - 1) * sy.strength; addMult(m, `🔗 ${sy.label}${sy.strength < 0.99 ? ` (suministro al ${Math.round(sy.strength * 100)} %)` : ''}`); }
		if (sy.chain) addMult({ all: 1 + CHAIN[sy.chain] }, `⛓️ Cadena con ${sy.fromName} (nivel ${sy.chain})`);
	}
	// Lo que este negocio manda a otros (suministro) no lo produce para ti
	const sent = suppliedFrom(id);
	let gross = 0;
	const items = {}, perLine = {};
	for (const k in lines) {
		const ln = lines[k], eff = (st.effort?.[k] || 0) / 100, m = mult.all * (mult[k] || 1) * (1 - Math.min(0.9, (sent[k] || 0) + (sent._all || 0)));
		const money = (ln.money || 0) * eff * m;
		gross += money;
		const its = (ln.items || []).filter(i => ok(i.cond)).map(i => ({ id: toID(i.id), perDay: i.perDay * eff * m }));
		for (const i of its) items[i.id] = (items[i.id] || 0) + i.perDay;
		perLine[k] = { money, items: its, pct: st.effort?.[k] || 0, sent: Math.min(0.9, (sent[k] || 0) + (sent._all || 0)) };
	}
	for (const k in sent) if (sent[k] > 0) why.push({ label: `📦 Suministro a otros negocios`, m: { [k === '_all' ? 'all' : k]: 1 - Math.min(0.9, sent[k]) } });
	const upkeep = Math.max(0, (def.upkeep || 0) + (def.upgrades || []).reduce((a, u) => a + (st.ups?.[u.id] ? (u.upkeep || 0) : 0), 0) + (mgr?.wage || 0));
	const pct = sharePct(id);
	const profit = Math.max(0, gross - upkeep);
	return { perLine, gross, upkeep, profit, pct, money: profit * pct / 100, items, why, red: gross < upkeep };
}

/**
 * Mejoras cruzadas (pedido de Mario, 2026-10-28) y sinergias dinámicas (2026-10-30).
 * En el contenido: `synergy: [{ from: '<idNegocio>', line?: '<línea del otro>', min?: <% de esfuerzo>, need?: <% de suministro>, mult: {...}, label, desc }]`.
 * (a) Suministro real: el jugador elige qué % de la producción del proveedor (de esa línea, o de todo) se manda aquí
 *     (`st.supply[from]`, 0–100 de 10 en 10). Lo que se manda no lo produce el proveedor para ti. Llega a un pequeño
 *     depósito (`st.feed[from]`, como mucho 2 días) y aquí se consume: con `need` % (30 por defecto) la mejora rinde entera;
 *     con menos, a medias. Si el proveedor tiene el almacén lleno (no se recoge a tiempo) o su línea parada, no manda nada.
 * (c) Cadena: días seguidos con la mejora activa (≥ 50 %) → nivel 1/2/3 a los 3/7/14 días: +5/+10/+15 % a todo.
 *     Si se descuida, baja a la mitad de ritmo.
 */
export const CHAIN = [0, 0.05, 0.10, 0.15];
export const CHAIN_DAYS = [0, 3, 7, 14];
export const FEED_DAYS = 2;
const NEED = 30;
const linkKey = sy => sy.from + (sy.line ? ':' + sy.line : '');
export const chainLevel = days => days >= CHAIN_DAYS[3] ? 3 : days >= CHAIN_DAYS[2] ? 2 : days >= CHAIN_DAYS[1] ? 1 : 0;

/** Partidas de antes del 2026-10-30: las mejoras que ya rendían siguen rindiendo (suministro al 30 %), y se avisa. */
function migrateSupply(id) {
	const st = ventureState(id), def = ventureDef(id);
	if (!st?.owned || st.supply) return;
	st.supply = {}; st.feed = {}; st.chain = {}; st.synStr = {};
	for (const sy of def?.synergy || []) {
		const k = linkKey(sy), other = ventureState(sy.from);
		const was = !!other?.owned && (!sy.line || (other.effort?.[sy.line] || 0) >= (sy.min ?? 10));
		st.supply[k] = was ? NEED : 0;
		if (was) { st.feed[k] = 1; st.synStr[k] = 1; logVenture(id, `Suministro de ${C.ventures[sy.from]?.name}: ${NEED} % (cámbialo en la red de negocios)`); }
	}
}
export function synergiesOf(id) {
	const def = ventureDef(id), st = ventureState(id);
	if (st?.owned) migrateSupply(id);
	return (def?.synergy || []).filter(sy => C.ventures?.[sy.from]).map(sy => {
		const k = linkKey(sy), other = ventureState(sy.from);
		const pct = st?.supply?.[k] || 0;
		const lineOk = !sy.line || (other?.effort?.[sy.line] || 0) >= (sy.min ?? 10);
		const full = !!other?.owned && (other.fill || 0) >= storeDays(sy.from) - 1e-6;
		const strength = st?.owned ? (st.synStr?.[k] || 0) : 0;
		const chainDays = st?.chain?.[k] || 0;
		const missing = !other?.owned ? 'socio' : !lineOk ? 'linea' : !pct ? 'suministro' : full ? 'lleno' : pct < (sy.need ?? NEED) ? 'poco' : null;
		return { ...sy, key: k, pct, need: sy.need ?? NEED, lineOk, full, strength, active: strength >= 0.5, chainDays, chain: chainLevel(chainDays), missing, fromName: C.ventures[sy.from].name };
	});
}
/** Cuánto manda este negocio a otros, por línea (fracción 0–0.9; `_all` si el enlace no dice línea). */
export function suppliedFrom(id) {
	const out = {};
	for (const vid in C.ventures || {}) {
		const st = ventureState(vid);
		if (!st?.owned || !st.supply) continue;
		for (const sy of C.ventures[vid].synergy || []) {
			if (sy.from !== id) continue;
			const p = (st.supply[linkKey(sy)] || 0) / 100;
			if (p > 0) out[sy.line || '_all'] = (out[sy.line || '_all'] || 0) + p;
		}
	}
	return out;
}
/** Cambia el % de suministro de un enlace (pasos de 10). */
export function setSupply(id, key, pct) {
	tick(id);
	const st = ventureState(id);
	migrateSupply(id);
	const v = Math.max(0, Math.min(100, Math.round(pct / 10) * 10));
	st.supply[key] = v;
	const sy = (ventureDef(id).synergy || []).find(x => linkKey(x) === key);
	if (sy) { tick(sy.from); logVenture(id, `Suministro de ${C.ventures[sy.from]?.name}: ${v} %`); }
	return v;
}
/** El proveedor manda su parte durante `use` días produciendo. */
function pushSupply(fromId, use) {
	if (use <= 0) return;
	const fst = ventureState(fromId);
	for (const vid in C.ventures || {}) {
		const st = ventureState(vid);
		if (!st?.owned || !st.supply) continue;
		for (const sy of C.ventures[vid].synergy || []) {
			if (sy.from !== fromId) continue;
			const k = linkKey(sy), p = (st.supply[k] || 0);
			if (!p) continue;
			if (sy.line && (fst.effort?.[sy.line] || 0) < (sy.min ?? 10)) continue;
			const cap = FEED_DAYS * (sy.need ?? NEED);
			(st.feed ||= {})[k] = Math.min(cap, (st.feed[k] || 0) + use * p);
		}
	}
}
/** Este negocio gasta lo que le ha llegado durante `use` días: decide cuánto rinde cada mejora y sube o baja la cadena. */
function drawSupply(id, use) {
	const st = ventureState(id), def = ventureDef(id);
	if (!st?.supply || use <= 0) return;
	for (const sy of def.synergy || []) {
		const k = linkKey(sy), need = (sy.need ?? NEED) * use;
		const other = ventureState(sy.from);
		if (!other?.owned) { st.synStr[k] = 0; } else {
			const got = Math.min(st.feed?.[k] || 0, need);
			st.feed[k] = (st.feed[k] || 0) - got;
			st.synStr[k] = need > 0 ? got / need : 0;
		}
		const days = st.chain[k] || 0;
		st.chain[k] = st.synStr[k] >= 0.5 ? Math.min(30, days + use) : Math.max(0, days - use * 0.5);
	}
}

/** Acumula lo producido desde la última vez (hasta llenar el almacén). */
const TICKING = new Set();
export function tick(id, t = Date.now()) {
	const st = ventureState(id);
	if (!st?.owned) return;
	if (TICKING.has(id)) return;
	TICKING.add(id);
	try {
		migrateSupply(id);
		// primero, que los proveedores manden lo suyo hasta ahora
		for (const sy of ventureDef(id)?.synergy || []) if (ventureState(sy.from)?.owned) tick(sy.from, t);
		tickSelf(id, st, t);
	} finally { TICKING.delete(id); }
}
function tickSelf(id, st, t) {
	const cap = storeDays(id);
	const dt = Math.max(0, (t - (st.last || t)) / DAY);
	const use = Math.max(0, Math.min(dt, cap - (st.fill || 0)));
	st.last = t;
	if (use <= 0) return;
	drawSupply(id, use);
	pushSupply(id, use);
	const r = rates(id);
	st.fill = (st.fill || 0) + use;
	st.bank.money += r.money * use;
	for (const k in r.items) {
		const v = (st.frac[k] || 0) + r.items[k] * use;
		const whole = Math.floor(v + 1e-9);
		st.frac[k] = v - whole;
		if (whole > 0) st.bank.items[k] = (st.bank.items[k] || 0) + whole;
	}
	// Los Pokémon que trabajan aquí se encariñan con el sitio (y contigo): hasta 20 puntos de amistad por día
	st.hfrac = (st.hfrac || 0) + use * 20;
	const hearts = Math.floor(st.hfrac);
	if (hearts > 0) { st.hfrac -= hearts; for (const p of st.workers || []) addHappy(p, Math.min(60, hearts)); }
	st.boosts = (st.boosts || []).filter(b => b.until > t);
}

/** Lo que hay para recoger ahora mismo. */
export function pending(id) {
	tick(id);
	const st = ventureState(id);
	return { money: Math.floor(st.bank.money), items: { ...st.bank.items }, full: (st.fill || 0) >= storeDays(id) - 1e-6, fill: st.fill || 0, cap: storeDays(id) };
}
export function collect(id) {
	const p = pending(id), st = ventureState(id);
	if (!p.money && !Object.keys(p.items).length) return null;
	G.player.money += p.money;
	st.earned = (st.earned || 0) + p.money;
	for (const k in p.items) addItem(k, p.items[k]);
	st.bank = { money: st.bank.money - p.money, items: {} };
	st.fill = 0;
	logVenture(id, `Recogiste ₽${p.money.toLocaleString('es-MX')}` + (Object.keys(p.items).length ? ' y ' + Object.entries(p.items).map(([k, n]) => `${D.items[k]?.name || k} ×${n}`).join(', ') : ''));
	return p;
}
/** Horas reales que faltan para que se llene el almacén (0 si ya está lleno). */
export function fullIn(id) {
	const p = pending(id);
	return Math.max(0, (p.cap - p.fill) * 24);
}
/** Aviso antes de perder producción: el almacén se llena en menos de `h` horas. */
export const ALMOST_H = 12;
export const almostFull = id => { const hrs = fullIn(id); return hrs > 0 && hrs <= ALMOST_H; };
/** Recoge todos tus negocios de un toque. Devuelve { money, items, n } (n = negocios recogidos). */
export function collectAll() {
	const out = { money: 0, items: {}, n: 0 };
	for (const v of ventureList()) {
		if (v.status !== 'owned') continue;
		const got = collect(v.id);
		if (!got) continue;
		out.n++; out.money += got.money;
		for (const k in got.items) out.items[k] = (out.items[k] || 0) + got.items[k];
	}
	return out;
}
export function logVenture(id, text) {
	const st = ventureState(id);
	(st.log ||= []).unshift({ t: Date.now(), text });
	st.log.length = Math.min(st.log.length, 12);
}

/** Cambia el esfuerzo de una línea en pasos de 10 quitándoselo a (o dándoselo a) las demás. */
export function shiftEffort(id, line, delta) {
	tick(id);
	const st = ventureState(id), keys = Object.keys(linesOf(id));
	if (keys.length < 2 || !keys.includes(line)) return false;
	normEffort(id);
	let d = Math.max(-st.effort[line], Math.min(100 - st.effort[line], delta));
	if (!d) return false;
	st.effort[line] += d;
	// reparte la diferencia entre las otras, empezando por la que más (o menos) tiene
	const others = keys.filter(k => k !== line).sort((a, b) => d > 0 ? st.effort[b] - st.effort[a] : st.effort[a] - st.effort[b]);
	let left = -d, guard = 0;
	while (left !== 0 && guard++ < 100) {
		for (const k of others) {
			if (left === 0) break;
			const step = left > 0 ? 10 : -10;
			if (st.effort[k] + step < 0 || st.effort[k] + step > 100) continue;
			st.effort[k] += step; left -= step;
		}
	}
	normEffort(id);
	return true;
}

export function buyUpgrade(id, upId) {
	tick(id);
	const st = ventureState(id), u = upgradesOf(id).find(x => x.id === upId);
	if (!u || u.bought || !u.available) return { ok: false, msg: 'No disponible todavía.' };
	if (G.player.money < u.cost) return { ok: false, msg: 'No te alcanza.' };
	G.player.money -= u.cost;
	st.spent = (st.spent || 0) + u.cost;
	st.ups[u.id] = Date.now();
	for (const k in u.set || {}) setPath(k, u.set[k]);
	normEffort(id);
	logVenture(id, `Mejora: ${u.name}`);
	return { ok: true, upgrade: u };
}

// ---------- Encargados: cada uno lleva un solo negocio (bug de Mario, 2026-10-29) ----------
/** Negocio tuyo (distinto de `except`) donde `mid` está al frente, o null. */
export function managerBusyAt(mid, except = null) {
	if (!mid) return null;
	for (const vid in G.neg || {}) if (vid !== except && G.neg[vid]?.owned && G.neg[vid].manager === mid) return vid;
	return null;
}
/** El encargado «de siempre» que puede llevar este negocio: el primero de la lista que no esté ocupado en otro. */
export function homeManager(id, exclude = null) {
	const m = managersOf(id).find(m => m.id !== exclude && !managerBusyAt(m.id, id));
	return m ? m.id : null;
}
/** Encargados repetidos en partidas viejas: [{ mid, name, ventures: [id…] }]. */
export function managerConflicts() {
	const by = {};
	for (const vid in G.neg || {}) { const st = G.neg[vid]; if (st?.owned && st.manager && C.ventures?.[vid]) (by[st.manager] ||= []).push(vid); }
	return Object.entries(by).filter(([, l]) => l.length > 1).map(([mid, ventures]) => {
		const m = managersOf(ventures[0]).find(x => x.id === mid);
		return { mid, name: m?.name || C.npcs[mid]?.name || mid, ventures };
	});
}
/** Resuelve un conflicto: `mid` se queda en `keep` y los demás negocios vuelven a su encargado de siempre. */
export function resolveManagerConflict(mid, keep) {
	for (const vid in G.neg || {}) {
		const st = G.neg[vid];
		if (vid === keep || !st?.owned || st.manager !== mid) continue;
		tick(vid);
		st.manager = null;
		st.manager = homeManager(vid, mid);
		const nm = managersOf(vid).find(m => m.id === st.manager)?.name;
		logVenture(vid, nm ? `Encargad@: ${nm} (vuelve a llevarlo)` : 'Sin encargad@ por ahora');
	}
}
/**
 * Pone a `mid` al frente. Si estaba al frente de otro negocio, se lo trae: el otro vuelve a su encargado de siempre.
 * Devuelve { ok, from?, back? } (from = negocio que dejó; back = quién vuelve a llevarlo, o null).
 */
export function setManager(id, mid) {
	tick(id);
	const st = ventureState(id);
	if (!managersOf(id).some(m => m.id === mid)) return false;
	const from = managerBusyAt(mid, id);
	let back = null;
	if (from) {
		tick(from);
		const ost = G.neg[from];
		ost.manager = null;
		// el que deja este negocio (si había uno) puede irse a llevar el otro si allí también vale
		ost.manager = homeManager(from, mid);
		back = ost.manager;
		const nm = managersOf(from).find(m => m.id === back)?.name;
		logVenture(from, `${managersOf(id).find(m => m.id === mid).name} se va a ${ventureDef(id).name}` + (nm ? `; vuelve ${nm}` : '; sin encargad@ por ahora'));
	}
	st.manager = mid;
	logVenture(id, `Encargad@: ${managersOf(id).find(m => m.id === mid).name}`);
	return { ok: true, from, back };
}

/** Manda a trabajar a un Pokémon del equipo o de una caja. src: { where: 'party'|'box', box, idx } */
export function assignWorker(id, src) {
	tick(id);
	const st = ventureState(id);
	if ((st.workers || []).length >= slotsOf(id)) return { ok: false, msg: 'No hay más puestos.' };
	const list = src.where === 'party' ? G.party : G.boxes[src.box];
	const p = list?.[src.idx];
	if (!p) return { ok: false, msg: 'No encontrado.' };
	if (src.where === 'party' && G.party.length <= 1) return { ok: false, msg: 'Necesitas al menos un Pokémon en el equipo.' };
	if (p.uid === G.vars.riolu_uid) return { ok: false, msg: 'Tu compañero no se separa de ti.' };
	list.splice(src.idx, 1);
	p.hp = Math.max(p.hp, 1);
	(st.workers ||= []).push(p);
	return { ok: true, mon: p };
}
/** Trae de vuelta a un Pokémon: al equipo si hay sitio, o al PC. Devuelve dónde quedó. */
export function recallWorker(id, idx) {
	tick(id);
	const st = ventureState(id);
	const [p] = (st.workers || []).splice(idx, 1);
	if (!p) return null;
	if (G.party.length < 6) { G.party.push(p); return { mon: p, where: 'party' }; }
	return { mon: p, where: 'box', box: boxInsert(G, p) };
}
/** Todos los Pokémon que están trabajando (para que «owns» y la Pokédex los cuenten). */
export function allWorkers(g = G) {
	const out = [];
	for (const id in g?.neg || {}) for (const p of g.neg[id].workers || []) out.push({ p, venture: id });
	return out;
}

// ---------- Imprevistos ----------
/** Un imprevisto como mucho por día real y por negocio; se queda pendiente hasta que decidas. */
export function rollEvent(id, rnd = Math.random) {
	const def = ventureDef(id), st = ventureState(id);
	if (!st?.owned) return null;
	if (st.pending) return eventsOf(id).find(e => e.id === st.pending) || (st.pending = null);
	const t = Date.now();
	if (t - (st.lastEvent || st.since) < 20 * 3600e3) return null;
	const pool = eventsOf(id).filter(e => ok(e.cond) && !(e.once && st.seen?.[e.id]));
	if (!pool.length) return null;
	st.lastEvent = t;
	if (rnd() > (def.eventRate ?? 0.7)) return null;
	const tot = pool.reduce((a, e) => a + (e.w || 1), 0);
	let r = rnd() * tot;
	const ev = pool.find(e => (r -= (e.w || 1)) < 0) || pool[0];
	st.pending = ev.id;
	(st.seen ||= {})[ev.id] = (st.seen[ev.id] || 0) + 1;
	return ev;
}
export function eventOptions(ev) { return (ev.options || []).filter(o => ok(o.cond)); }
/** Aplica la opción elegida. Devuelve { ok, msg } (msg = no te alcanza). */
export function resolveEvent(id, ev, opt) {
	const st = ventureState(id);
	const cost = opt.cost || 0;
	if (G.player.money < cost) return { ok: false, msg: 'No te alcanza.' };
	G.player.money -= cost;
	st.spent = (st.spent || 0) + cost;
	const e = opt.effect || {};
	if (e.money) st.bank.money = Math.max(0, st.bank.money + e.money);
	for (const it of e.items || []) st.bank.items[toID(it.id)] = (st.bank.items[toID(it.id)] || 0) + (it.n || 1);
	if (e.boost) (st.boosts ||= []).push({ mult: e.boost.mult, until: Date.now() + (e.boost.days || 1) * DAY, label: e.boost.label || ev.name || 'Racha' });
	// Imprevisto compartido: el efecto llega también al otro negocio (y se le quita si lo tenía pendiente)
	if (ev.shared) {
		const ost = ventureState(ev.shared);
		if (ost?.owned) {
			tick(ev.shared);
			if (e.boost) (ost.boosts ||= []).push({ mult: e.boost.mult, until: Date.now() + (e.boost.days || 1) * DAY, label: e.boost.label || ev.name || 'Racha' });
			if (e.happy) for (const p of ost.workers || []) addHappy(p, e.happy);
			if (ost.pending === ev.id) ost.pending = null;
			logVenture(ev.shared, (ev.name ? ev.name + ': ' : '') + (opt.log || opt.text));
		}
	}
	for (const k in e.set || {}) setPath(k, e.set[k]);
	if (e.happy) for (const p of st.workers || []) addHappy(p, e.happy);
	st.pending = null;
	logVenture(id, (ev.name ? ev.name + ': ' : '') + (opt.log || opt.text));
	return { ok: true };
}

/** Resumen para el menú: cuántos negocios tienes y si alguno tiene algo que recoger o decidir. */
export function venturesSummary() {
	const list = ventureList();
	const mine = list.filter(v => v.status === 'owned');
	let ready = 0, money = 0, almost = 0;
	for (const v of mine) { const p = pending(v.id); money += p.money; if (p.full || v.st.pending) ready++; else if (almostFull(v.id)) almost++; }
	let pedido = null; try { pedido = currentPedido(); } catch (e) { /* */ }
	return { mine: mine.length, offers: list.length - mine.length, ready, money, almost, pedido };
}

// ---------- Plantilla de trabajadores (pedido de Mario, 2026-10-29) ----------
/** Especies favoritas de un negocio (las claves de jobs.favs), para enseñarlas con ⭐. */
export function favsOf(id) { return Object.keys(ventureDef(id)?.jobs?.favs || {}); }
/** Guía de un negocio: tipos ideales, favoritos y qué produce. */
export function typeGuide(id) {
	const def = ventureDef(id);
	return { types: def.jobs?.types || [], favs: favsOf(id), lines: Object.values(linesOf(id)).map(l => l.name), text: def.jobs?.text || '' };
}
/** Puestos libres de un negocio tuyo. */
export function freeSlots(id) { const st = ventureState(id); return st?.owned ? Math.max(0, slotsOf(id) - (st.workers || []).length) : 0; }
/** Los 3 negocios tuyos (con puestos) donde más rendiría un Pokémon, con su aporte estimado. */
export function bestVenturesFor(p, n = 3) {
	return ventureList().filter(v => v.status === 'owned' && slotsOf(v.id) > 0)
		.map(v => ({ id: v.id, name: v.def.name, ...workerBonus(v.id, p) }))
		.sort((a, b) => b.v - a.v).slice(0, n);
}
/** Mueve a un trabajador de un negocio a otro sin pasar por el PC. */
export function moveWorker(fromId, idx, toId) {
	if (fromId === toId) return { ok: false, msg: 'Ya trabaja ahí.' };
	tick(fromId); tick(toId);
	const a = ventureState(fromId), b = ventureState(toId);
	if (!a?.owned || !b?.owned) return { ok: false, msg: 'No disponible.' };
	if (!freeSlots(toId)) return { ok: false, msg: 'No hay puestos libres allí.' };
	const [p] = (a.workers || []).splice(idx, 1);
	if (!p) return { ok: false, msg: 'No encontrado.' };
	(b.workers ||= []).push(p);
	logVenture(toId, `${p.nick || D.species[p.sp]?.name || p.sp} llega desde ${ventureDef(fromId).name}`);
	return { ok: true, mon: p };
}
/** ¿Se puede sacar a este Pokémon del equipo para trabajar? (ni el de cabeza, ni el compañero, ni el último) */
export function partyMovable(p) {
	const i = G.party.indexOf(p);
	return i > 0 && p.uid !== G.vars.riolu_uid && G.party.length > 1;
}
/**
 * Sugerencias para los puestos libres: el mejor candidato por puesto (tipo ideal, favorito, nivel),
 * del PC y del equipo. Nunca el que va en cabeza ni el compañero, y siempre deja al menos uno en el equipo.
 * Devuelve [{ id, p, from: 'box'|'party', box?, v, typed, fav }].
 */
export function suggestWorkers() {
	const free = {};
	for (const v of ventureList()) if (v.status === 'owned') { const f = freeSlots(v.id); if (f) free[v.id] = f; }
	const cands = [];
	G.boxes.forEach((b, bi) => b.forEach(p => { if (p && !p.egg && p.uid !== G.vars.riolu_uid) cands.push({ p, from: 'box', box: bi }); }));
	G.party.forEach(p => { if (!p.egg && partyMovable(p)) cands.push({ p, from: 'party' }); });
	const pairs = [];
	for (const id in free) for (const c of cands) { const b = workerBonus(id, c.p); pairs.push({ id, ...c, ...b }); }
	pairs.sort((a, b) => b.v - a.v || b.p.lv - a.p.lv);
	const used = new Set(), out = [];
	let partyLeft = G.party.length;
	for (const x of pairs) {
		if (!free[x.id] || used.has(x.p.uid)) continue;
		if (x.from === 'party') { if (partyLeft <= 1) continue; partyLeft--; }
		used.add(x.p.uid); free[x.id]--; out.push(x);
	}
	return out;
}
/** Aplica una sugerencia (busca al Pokémon por uid, por si algo se movió). */
export function applySuggestion(s) {
	if (s.from === 'party') {
		const idx = G.party.findIndex(p => p.uid === s.p.uid);
		if (idx < 0 || !partyMovable(G.party[idx])) return { ok: false, msg: 'Ya no está disponible.' };
		return assignWorker(s.id, { where: 'party', idx });
	}
	for (let bi = 0; bi < G.boxes.length; bi++) {
		const idx = G.boxes[bi].findIndex(p => p && p.uid === s.p.uid);
		if (idx >= 0) return assignWorker(s.id, { where: 'box', box: bi, idx });
	}
	return { ok: false, msg: 'Ya no está disponible.' };
}

// ---------- Imprevistos compartidos (2026-10-30) ----------
// `sharedEvents: [{ id, ventures: [a, b], managers?: { a: 'npc', b: 'npc' }, npc, name, text, w, cond, options }]` (content.js los junta).
// Salen en cualquiera de los dos negocios si eres socio de ambos y los encargados que se conocen están al frente.
export function sharedFor(id) {
	const out = [];
	for (const ev of C.sharedEvents || []) {
		if (!ev.ventures?.includes(id)) continue;
		const other = ev.ventures.find(v => v !== id);
		if (!owned(id) || !owned(other)) continue;
		if (ev.managers && !Object.entries(ev.managers).every(([v, m]) => ventureState(v)?.manager === m)) continue;
		out.push({ ...ev, shared: other });
	}
	return out;
}
/** Imprevistos posibles de un negocio: los suyos y los compartidos que tocan ahora. */
export function eventsOf(id) {
	const def = ventureDef(id), st = ventureState(id);
	const list = (def?.events || []).slice().concat(sharedFor(id));
	// uno compartido que quedó pendiente aunque ya no cumpla (cambió el encargado): se puede resolver igual
	if (st?.pending && !list.some(e => e.id === st.pending)) { const ev = (C.sharedEvents || []).find(e => e.id === st.pending); if (ev) list.push({ ...ev, shared: ev.ventures.find(v => v !== id) }); }
	return list;
}

// ---------- Pedidos entre encargados (2026-10-30) ----------
// `pedidos: [{ id, to, from, npc?, cond?, item, n, text, thanks, boost?: { mult, days } }]`: el encargado de `to`
// (si `npc`, solo cuando está al frente) le pide al de `from` algo que allí se produce. Cada pocos días sale uno; tienes
// unos días para servirlo con lo que llevas en la mochila. Si lo sirves: un empujón temporal. Si no, no pasa nada grave.
export const PEDIDO_EVERY = 3 * DAY, PEDIDO_TTL = 3 * DAY;
const pedState = () => (G.negPed ||= { cur: null, last: 0, n: 0, done: {} });
export const pedidoDef = id => (C.pedidos || []).find(p => p.id === id);
export function pedidoOk(p) { return owned(p.to) && owned(p.from) && (!p.npc || ventureState(p.to)?.manager === p.npc) && ok(p.cond); }
/** El pedido de ahora (o null). Saca uno nuevo si toca; caduca el viejo sin castigo. */
export function currentPedido(now = Date.now(), rnd = Math.random) {
	if (!G) return null;
	const ps = pedState();
	if (ps.cur && now > ps.cur.until) { const d = pedidoDef(ps.cur.id); if (d && owned(d.to)) logVenture(d.to, `Pedido sin servir: ${D.items[toID(d.item)]?.name || d.item} ×${d.n || 1}. No pasa nada; otra vez será.`); ps.cur = null; ps.last = now; }
	if (ps.cur) { const d = pedidoDef(ps.cur.id); if (d) return { ...d, until: ps.cur.until, since: ps.cur.t }; ps.cur = null; }
	if (now - (ps.last || 0) < PEDIDO_EVERY) return null;
	const pool = (C.pedidos || []).filter(p => pedidoOk(p) && p.id !== ps.lastId);
	if (!pool.length) return null;
	const d = pool[Math.floor(rnd() * pool.length)];
	ps.cur = { id: d.id, t: now, until: now + PEDIDO_TTL };
	ps.last = now; ps.lastId = d.id; ps.n++;
	return { ...d, until: ps.cur.until, since: now };
}
/** El pedido vigente, sin sacar uno nuevo ni caducar nada (para el Diario y Novedades). */
export function peekPedido(now = Date.now()) {
	const cur = G?.negPed?.cur;
	if (!cur || now > cur.until) return null;
	const d = pedidoDef(cur.id);
	return d && owned(d.to) ? { ...d, until: cur.until, since: cur.t } : null;
}
/** Servir el pedido con lo que llevas. Devuelve { ok, msg }. */
export function fulfillPedido(now = Date.now()) {
	const ps = pedState(), cur = ps.cur && pedidoDef(ps.cur.id);
	if (!cur) return { ok: false, msg: 'No hay ningún pedido ahora.' };
	const id = toID(cur.item), n = cur.n || 1;
	if ((G.bag[id] || 0) < n) return { ok: false, msg: `Te falta: ${D.items[id]?.name || cur.item} ×${n}.` };
	removeItem(id, n);
	tick(cur.to);
	const st = ventureState(cur.to);
	const b = cur.boost || { mult: { all: 1.1 }, days: 2 };
	(st.boosts ||= []).push({ mult: b.mult, until: now + (b.days || 2) * DAY, label: 'Pedido servido' });
	logVenture(cur.to, `Pedido servido desde ${ventureDef(cur.from)?.name}: ${D.items[id]?.name || id} ×${n}`);
	ps.done[cur.id] = (ps.done[cur.id] || 0) + 1;
	ps.cur = null;
	return { ok: true, def: cur };
}
