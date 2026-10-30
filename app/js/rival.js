// Rival que aprende (pedido de Mario, 2026-10-30). Lógica pura: se prueba en Node (herramientas/test/rival-test.mjs).
// Bruna Ledesma, una entrenadora del Circuito que apunta todo, aparece cada 2 hitos (medallas o grandes combates) en una
// ciudad o pueblo ya visitado de la región donde estés. Mira los 3 Pokémon que más usas en combate (G.uso) y arma su
// equipo con coberturas contra ellos, dentro de la curva (tope suave). Si le ganas 3 veces seguidas con el mismo equipo,
// sube su nivel de reto. Combates opcionales; siempre te deja curar antes (lo hace el guion, app/content/b06/t13-rival.js).
import { G, hitos } from './state.js';
import { C, topLoc } from './content.js';
import { D, toID } from './data.js';
import { learnsetOf } from './pokemon.js';

export const RX = { npc: 'bruna', trainer: 'rx_bruna', step: 2, first: 2, maxTier: 3 };
const TYPES = () => Object.keys(D.types || {}).filter(t => D.types[t]?.name && t !== 'Stellar' && t !== '???');

export function rxState() { return (G.rx ||= { n: 0, next: RX.first, tier: 0, streak: 0, sig: '', loc: null, team: null, hist: [], wins: 0, losses: 0 }); }

// ---------------- Uso en combate ----------------
/** Lo llama el combate al terminar: +1 a cada Pokémon tuyo que salió a luchar (+2 contra entrenadores). */
export function countUse(mons, trainer = false) {
	const u = (G.uso ||= {});
	for (const p of mons) { if (!p?.uid) continue; const e = (u[p.uid] ||= { n: 0, sp: p.sp }); e.n += trainer ? 2 : 1; e.sp = p.sp; }
}
/** Todos tus Pokémon (equipo, cajas, negocios y expediciones). */
function allMine() {
	const out = [...G.party, ...G.boxes.flat()].filter(p => p && !p.egg);
	for (const v of Object.values(G.neg || {})) out.push(...(v.workers || []));
	for (const e of G.exp?.active || []) if (e.mon) out.push(e.mon);
	return out;
}
/** Los `n` Pokémon que más has usado y que sigues teniendo (si no hay datos, los de más nivel del equipo). */
export function topUsed(n = 3) {
	const u = G.uso || {};
	const mine = allMine().filter(p => D.species[p.sp]);
	const used = mine.filter(p => u[p.uid]?.n).sort((a, b) => u[b.uid].n - u[a.uid].n);
	const rest = G.party.filter(p => p && !p.egg && D.species[p.sp] && !used.includes(p)).sort((a, b) => b.lv - a.lv);
	return used.concat(rest).slice(0, n);
}

// ---------------- Tabla de tipos ----------------
/** Multiplicador de un ataque de tipo `atk` contra un Pokémon de tipos `defTypes`. */
export function eff(atk, defTypes) {
	let m = 1;
	for (const t of defTypes) { const d = D.types[t]?.dmg?.[atk]; m *= d === 1 ? 2 : d === 2 ? 0.5 : d === 3 ? 0 : 1; }
	return m;
}
const typesOf = sp => D.species[toID(sp)]?.types || [];

/** Tipos de ataque que más daño hacen a tus 3 más usados (de más a menos). */
export function threatTypes(tops) {
	return TYPES().map(t => {
		let s = 0;
		for (const p of tops) { const e = eff(t, typesOf(p.sp)); s += e >= 4 ? 2.2 : e >= 2 ? 1 : e === 0 ? -1.5 : e <= 0.5 ? -0.6 : 0; }
		return { t, s };
	}).filter(x => x.s > 0).sort((a, b) => b.s - a.s || a.t.localeCompare(b.t)).map(x => x.t);
}

// ---------------- Generador con semilla ----------------
function rng(seed) {
	let a = 0; for (const ch of String(seed)) a = (Math.imul(a ^ ch.charCodeAt(0), 2654435761) + 1) | 0;
	return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const bst = s => (s.bs || []).reduce((a, b) => a + b, 0);

/** Especies que puede llevar: evolución final, sin legendarios, singulares, formas raras ni Pokémon de un solo combate. */
function pool(lo, hi) {
	return Object.keys(D.species).filter(id => {
		const s = D.species[id];
		if (!s || !s.num || s.num > 1025 || s.forme || s.base || s.battleOnly || s.nonstd || (s.tags || []).length) return false;
		if ((s.evos || []).length || !learnsetOf(id)) return false;
		const b = bst(s);
		return b >= lo && b <= hi;
	});
}

/** Movimientos que puede saber a ese nivel (por nivel, MT o tutor; sin huevo). */
function learnable(sp, lv) {
	const ls = learnsetOf(sp);
	if (!ls) return [];
	const set = new Set([...ls.lv.filter(([l]) => l <= lv).map(x => x[1]), ...(ls.tm || []), ...(ls.tutor || [])]);
	return [...set].filter(m => D.moves[m]);
}
const BAD = /^(focuspunch|dreameater|belch|lastresort|synchronoise|steelbeam|mindblown|selfdestruct|explosion|hyperbeam|gigaimpact|blastburn|frenzyplant|hydrocannon|rockwrecker|roaroftime|prismaticlaser|eternabeam|meteorassault|solarbeam|solarblade|skyattack|futuresight|doomdesire|fly|dig|dive|bounce|phantomforce|shadowforce|skullbash|razorwind|freezeshock|iceburn|geomancy|electroshot|bide|counter|mirrorcoat|metalburst|endeavor|finalgambit|naturalgift|fling|present|magnitude|spitup|storedpower|powertrip|punishment|beatup|round|echoedvoice|trumpcard|wringout|crushgrip|frustration|return|hiddenpower|snore|dreameater|uproar|outrage|thrash|petaldance|ragingfury)$/;

/** Cuatro movimientos: STAB fuerte, cobertura contra tus más usados y uno más. */
function pickMoves(sp, lv, threats, tops, rnd) {
	const s = D.species[sp], phys = s.bs[1] >= s.bs[3];
	const cands = learnable(sp, lv).map(id => ({ id, m: D.moves[id] })).filter(({ id, m }) => m.bp >= 55 && m.bp <= 130 && (m.acc === true || m.acc >= 85) && !BAD.test(id) && m.cat === (phys ? 'Physical' : 'Special'));
	const score = ({ m }) => {
		const stab = s.types.includes(m.type) ? 1.5 : 1;
		const se = tops.reduce((a, p) => a + (eff(m.type, typesOf(p.sp)) >= 2 ? 1 : 0), 0);
		return m.bp * (m.acc === true ? 1 : m.acc / 100) * stab * (1 + 0.6 * se + (threats.includes(m.type) ? 0.3 : 0));
	};
	cands.sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id));
	const out = [], types = new Set();
	for (const c of cands) { if (out.length >= 4) break; if (types.has(c.m.type)) continue; out.push(c.id); types.add(c.m.type); }
	// relleno: un movimiento de apoyo útil si lo aprende, o el siguiente mejor ataque
	const SUPPORT = ['protect', 'thunderwave', 'willowisp', 'roost', 'recover', 'leechseed', 'toxic', 'substitute'];
	if (out.length < 4) { const sup = learnable(sp, lv).find(m => SUPPORT.includes(m)); if (sup) out.push(sup); }
	for (const c of cands) { if (out.length >= 4) break; if (!out.includes(c.id)) out.push(c.id); }
	return out.slice(0, 4);
}

/** Tamaño del equipo según hitos (balance.md §4.2) y nivel de reto. */
export function teamSize(tier = rxState().tier, h = hitos()) {
	const base = h <= 2 ? 3 : h <= 5 ? 4 : 5;
	return Math.min(6, base + (tier >= 2 ? 1 : 0));
}
/** Nivel del as: tope − 2 + reto (como mucho tope + 1). */
export function aceLevel(tier = rxState().tier) {
	const cap = G.vars.cap || Math.max(5, ...G.party.map(p => p.lv));
	return Math.max(5, Math.min(cap + 1, cap - 2 + tier));
}

/**
 * Arma el equipo de Bruna contra tus más usados. Devuelve la definición de entrenador (team, ai, items…).
 * Misma semilla, mismo equipo.
 */
export function buildRival(seed = 'x') {
	const st = rxState(), tier = st.tier;
	const tops = topUsed(3);
	const threats = threatTypes(tops).slice(0, 4);
	const rnd = rng('bruna|' + seed + '|' + tier);
	const lo = 440 + tier * 25, hi = Math.min(600, 520 + tier * 30);
	const size = teamSize(tier);
	const ace = aceLevel(tier);
	const topTypes = [...new Set(tops.flatMap(p => typesOf(p.sp)))];
	const scored = pool(lo, hi).map(id => {
		const ts = typesOf(id);
		let sc = 0;
		for (const t of threats) if (ts.includes(t)) sc += 2;            // trae el tipo que te hace daño (STAB)
		for (const t of topTypes) { const e = eff(t, ts); sc += e === 0 ? 1.5 : e <= 0.5 ? 0.8 : e >= 2 ? -1.2 : 0; } // aguanta lo tuyo
		return { id, sc: sc + rnd() * 1.2 };
	}).filter(x => x.sc > 0).sort((a, b) => b.sc - a.sc);
	const team = [], usedTypes = new Set();
	for (const x of scored) {
		if (team.length >= size) break;
		const key = typesOf(x.id).join('/');
		if (usedTypes.has(key)) continue;
		usedTypes.add(key);
		team.push(x.id);
	}
	// si no hay suficientes candidatos (equipo muy raro), rellena con lo más fuerte del rango
	for (const id of pool(lo, hi).sort((a, b) => bst(D.species[b]) - bst(D.species[a]))) { if (team.length >= size) break; if (!team.includes(id)) team.push(id); }
	const mons = team.map((sp, i) => {
		const last = i === team.length - 1;
		const lv = last ? ace : Math.max(5, ace - 2 + Math.floor(rnd() * 2));
		return { sp, lv, moves: pickMoves(sp, lv, threats, tops, rnd), iv: Math.min(31, 20 + tier * 3 + (last ? 3 : 0)), ...(last ? { item: 'sitrusberry' } : {}) };
	});
	return {
		team: mons, ai: [3, 4, 4, 5][tier], ace: team[team.length - 1],
		items: [{ id: tier >= 2 ? 'hyperpotion' : 'superpotion', n: tier >= 1 ? 2 : 1 }],
		threats, tops: tops.map(p => ({ uid: p.uid, sp: p.sp, name: p.nick || D.species[p.sp]?.name })),
	};
}

// ---------------- Cuándo y dónde aparece ----------------
/** ¿Toca encuentro? (2 hitos desde el último ganado; el primero, al llegar a 2) */
export const due = () => !!G && hitos() >= (G.rx?.next ?? RX.first);
/** Ciudades y pueblos visitados de una región. */
function placesIn(region) {
	return Object.keys(G.visited || {}).filter(id => { const L = C.locations[id]; return L && !L.parent && ['city', 'town'].includes(L.kind) && L.region === region; }).sort();
}
/** Dónde está ahora: una ciudad o pueblo visitado de la región donde estás (fijo para cada encuentro). Sin efectos. */
export function placeNow() {
	if (!due()) return null;
	const region = topLoc(G.loc)?.region;
	const list = placesIn(region);
	if (!list.length) return null;
	return list[Math.floor(rng('lugar|' + (G.rx?.n || 0) + '|' + region)() * list.length)];
}
/** Spot dinámico (como los Pokémon únicos): sale en Novedades y con «!». */
export function rivalSpotsAt(locId) {
	if (!G || !C.npcs[RX.npc] || !C.scripts?.rx_primera) return [];
	if (placeNow() !== locId) return [];
	const st = G.rx || { n: 0, hist: [] };
	const first = !st.n && !st.hist.length;
	return [{ label: first ? 'Una entrenadora con una libreta' : 'Bruna, con su libreta', sub: first ? 'Te mira, mira la libreta, te vuelve a mirar' : st.hist.at(-1)?.res === 'lose' ? 'Te espera para la revancha' : 'Ha vuelto a apuntar cosas sobre ti', icon: '📓', new: st.hist.at(-1)?.res === 'lose' && st.hist.at(-1)?.n === st.n ? 'false' : 'true', talk: [{ script: first ? 'rx_primera' : 'rx_encuentro' }], rival: true }];
}

// ---------------- Antes y después del combate ----------------
/** Prepara el combate: arma el equipo (o reutiliza el de la revancha) y lo pone en el entrenador `rx_bruna`. */
export function prepare() {
	const st = rxState();
	if (!st.team) { const r = buildRival(st.n + '|' + (st.losses || 0)); st.team = r; }
	const T = C.trainers[RX.trainer];
	if (T) { T.team = st.team.team; T.ai = st.team.ai; T.items = st.team.items; T.ace = st.team.ace; }
	return st.team;
}
const sigOf = party => party.filter(p => p && !p.egg).map(p => p.sp).sort().join(',');
/** Lo que pasó: 'win' (ganaste tú) o 'lose'. Devuelve { tierUp }. */
export function record(res) {
	const st = rxState();
	const sig = sigOf(G.party);
	const tops = (st.team?.tops || []).map(t => t.sp);
	st.hist.push({ t: Date.now(), n: st.n, res, tops, team: (st.team?.team || []).map(m => m.sp), tier: st.tier, sig });
	if (st.hist.length > 12) st.hist.shift();
	let tierUp = false;
	if (res === 'win') {
		st.wins++;
		st.streak = st.sig === sig ? st.streak + 1 : 1;
		st.sig = sig;
		if (st.streak >= 3 && st.tier < RX.maxTier) { st.tier++; st.streak = 0; tierUp = true; G.flags.rx_subio = true; }
		st.n++; st.next = hitos() + RX.step; st.team = null;
	} else {
		st.losses++; st.streak = 0; st.sig = '';
	}
	G.flags.rx_conocida = true;
	return { tierUp };
}

// ---------------- Lo que dice (con su voz: datos, porcentajes y apodos) ----------------
const name = p => p?.name || D.species[p?.sp]?.name || '¿?';
const list = a => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' y ' + a.at(-1);
/** Frases dinámicas que recuerdan los combates anteriores y dicen qué ha estudiado. */
export function greetLines() {
	const st = rxState();
	const prev = st.hist.at(-1);
	const r = prepare();
	const tops = r.tops.map(name);
	const tipos = list(r.threats.slice(0, 2).map(t => D.types[t]?.name?.toLowerCase() || t));
	const out = [];
	if (!prev) out.push(`Llevo semanas viendo tus combates. Datos: ${list(tops)} salen más que nadie. Ya sé lo que haces. Ahora falta saber si sé lo que vas a hacer.`);
	else if (prev.res === 'lose') out.push(`La revancha es tuya, no mía. —Pasa una página—. Sigues con ${list(tops)}. Yo no he cambiado nada: la otra vez funcionó. Si hoy me ganas, la que cambia soy yo.`);
	else {
		const before = prev.tops.map(sp => D.species[sp]?.name || sp);
		const same = prev.tops.join() === r.tops.map(t => t.sp).join();
		out.push(same
			? `Encuentro número ${st.n + 1}. Me ganaste con ${list(before)}. Y vuelves con lo mismo. O es confianza o es costumbre. Yo apuesto por costumbre: un ochenta por ciento.`
			: `Encuentro número ${st.n + 1}. La otra vez me ganaste con ${list(before)}. Ahora tus números dicen ${list(tops)}. Has cambiado. Me gusta. Me fastidia, pero me gusta.`);
	}
	if (G.flags.rx_subio) { out.push('Tres veces seguidas con el mismo equipo. Eso ya no es suerte: es un patrón. Y a los patrones se les contesta. He subido el listón.'); G.flags.rx_subio = false; }
	out.push(`Hoy traigo ${tipos || 'un poco de todo'}. No es un secreto: lo que no sabes es en qué orden.`);
	return out;
}
/** Frase tras el combate. */
export function afterLine(res, tierUp) {
	const st = rxState();
	if (res === 'win') return tierUp ? 'Tercera vez con lo mismo. Vale. Lo apunto en rojo. La próxima no va a ser igual.' : st.wins === 1 ? 'Me has ganado. Lo apunto. Todo se apunta. Nos vemos dentro de dos medallas o dos combates gordos: ya sabré algo más.' : 'Otra página para la libreta. Dentro de dos medallas te busco. Tú sigue igual, por favor. Me lo pones fácil. O no.';
	return 'Te he ganado. —Mira la libreta como si no se lo creyera—. Ahora cúrate. Me quedo aquí hasta la revancha: un dato suelto no es una tendencia.';
}
