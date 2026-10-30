// Cuadrante: juego de cartas propio del mundo (pedido de Mario, 2026-10-30). Lógica pura: se prueba en Node
// (herramientas/test/cartas-test.mjs). Pantalla en ui/cartas-ui.js; rivales en el contenido (`cardPlayers`, CONTENIDO §20).
//
// Reglas: tablero de 3×3, cada jugador con un mazo de 5 cartas. Cada carta es un Pokémon con 4 valores (1–10) que salen
// de sus stats base: arriba = PS, derecha = el mayor de Ataque y At. Esp., abajo = el mayor de Defensa y Def. Esp.,
// izquierda = Velocidad. Por turnos se coloca una carta en una casilla libre; cada carta rival que quede al lado se gira
// (pasa a ser tuya) si el valor de tu lado supera al de su lado enfrentado. Si el tipo principal de tu carta es eficaz
// contra la rival, tu valor cuenta +1. Al llenarse el tablero, gana quien tenga más cartas (en el tablero + la que le
// quede en la mano). Las capturas no encadenan.
import { G, evalCond, addItem } from './state.js';
import { C } from './content.js';
import { D, toID, effectiveness } from './data.js';

export const SIDES = ['up', 'right', 'down', 'left'];
const OPP = { up: 'down', right: 'left', down: 'up', left: 'right' };
const DELTA = { up: -3, right: 1, down: 3, left: -1 };
/** Vecino de la casilla i (0–8) por un lado, o -1. */
export function neighbor(i, side) {
	const r = Math.floor(i / 3), c = i % 3;
	if (side === 'up' && r === 0) return -1;
	if (side === 'down' && r === 2) return -1;
	if (side === 'left' && c === 0) return -1;
	if (side === 'right' && c === 2) return -1;
	return i + DELTA[side];
}

const v10 = x => Math.max(1, Math.min(10, Math.round(x / 13)));
/** Carta de una especie: { sp, name, types, up, right, down, left, sum, rank }. */
export function card(spId) {
	const s = D.species[toID(spId)];
	if (!s) return null;
	const [hp, atk, def, spa, spd, spe] = s.bs;
	const c = { sp: toID(spId), name: s.name, types: s.types, up: v10(hp), right: v10(Math.max(atk, spa)), down: v10(Math.max(def, spd)), left: v10(spe) };
	c.sum = c.up + c.right + c.down + c.left;
	c.rank = c.sum >= 32 ? 4 : c.sum >= 27 ? 3 : c.sum >= 21 ? 2 : 1;
	return c;
}
export const RANKS = ['', 'Común', 'Poco común', 'Rara', 'Estelar'];
export const fmtV = v => (v >= 10 ? 'A' : String(v));

/** Bono de tipo: +1 si el tipo principal del atacante es eficaz contra los tipos del defensor. */
export function typeBonus(att, def) { return effectiveness(att.types[0], def.types) > 1 ? 1 : 0; }

// ---------------- Partida ----------------
/** Partida nueva. hands: { me: [sp×5], foe: [sp×5] }, first: 'me' | 'foe'. */
export function newMatch(mine, theirs, first = 'me') {
	return {
		board: Array(9).fill(null), // { c, owner }
		hand: { me: mine.map(card), foe: theirs.map(card) },
		turn: first, first, log: [],
	};
}
/** Jugadas válidas: [{ h (índice de la mano), i (casilla) }]. */
export function legalMoves(m, who = m.turn) {
	const out = [];
	if (isOver(m)) return out;
	m.hand[who].forEach((c, h) => { if (c) m.board.forEach((b, i) => { if (!b) out.push({ h, i }); }); });
	return out;
}
export const isOver = m => m.board.every(Boolean);
/** ¿Qué casillas giraría poner la carta c en i? (sin aplicar) */
export function wouldFlip(m, c, i, who) {
	const out = [];
	for (const side of SIDES) {
		const j = neighbor(i, side);
		if (j < 0) continue;
		const b = m.board[j];
		if (!b || b.owner === who) continue;
		if (c[side] + typeBonus(c, b.c) > b.c[OPP[side]]) out.push(j);
	}
	return out;
}
/** Aplica una jugada (lanza si no es válida). Devuelve las casillas giradas. */
export function play(m, mv) {
	const who = m.turn;
	const c = m.hand[who][mv.h];
	if (!c) throw new Error('carta inexistente en la mano');
	if (!(mv.i >= 0 && mv.i < 9) || m.board[mv.i]) throw new Error('casilla ocupada o fuera del tablero');
	const flips = wouldFlip(m, c, mv.i, who);
	m.board[mv.i] = { c, owner: who };
	for (const j of flips) m.board[j].owner = who;
	m.hand[who] = m.hand[who].map((x, k) => (k === mv.h ? null : x));
	m.log.push({ who, sp: c.sp, i: mv.i, flips });
	m.turn = who === 'me' ? 'foe' : 'me';
	return flips;
}
/** Marcador: cartas en el tablero + las que quedan en la mano. */
export function score(m) {
	const s = { me: 0, foe: 0 };
	for (const b of m.board) if (b) s[b.owner]++;
	for (const w of ['me', 'foe']) s[w] += m.hand[w].filter(Boolean).length;
	return s;
}
export function result(m) { const s = score(m); return s.me > s.foe ? 'win' : s.me < s.foe ? 'lose' : 'draw'; }

function cloneM(m) { return { board: m.board.map(b => (b ? { c: b.c, owner: b.owner } : null)), hand: { me: m.hand.me.slice(), foe: m.hand.foe.slice() }, turn: m.turn, first: m.first, log: [] }; }

// ---------------- IA ----------------
// Nivel 1: al azar. 2: la que más gira. 3: la que más gira, cuidando no dejar lados flojos expuestos.
// 4: mira una jugada por delante (tu mejor respuesta) y elige la que deja mejor marcador.
/** Riesgo: cuántos puntos podría girarle el rival a la carta en i con lo que tiene en la mano. */
function exposure(m, i, who) {
	const foe = who === 'me' ? 'foe' : 'me';
	const b = m.board[i];
	let risk = 0;
	for (const side of SIDES) {
		const j = neighbor(i, side);
		if (j < 0 || m.board[j]) continue;
		const mine = b.c[side];
		if (m.hand[foe].some(x => x && x[OPP[side]] + typeBonus(x, b.c) > mine)) risk++;
	}
	return risk;
}
const diff = (m, who) => { const s = score(m); return who === 'me' ? s.me - s.foe : s.foe - s.me; };

/** Valor de la posición para quien tiene el turno, mirando `depth` jugadas más. */
function negamax(m, depth, alpha, beta) {
	const who = m.turn;
	const moves = legalMoves(m, who);
	if (!moves.length || depth === 0) return diff(m, who);
	let best = -Infinity;
	for (const mv of moves) {
		const t = cloneM(m); play(t, mv);
		const v = -negamax(t, depth - 1, -beta, -alpha);
		if (v > best) best = v;
		if (best > alpha) alpha = best;
		if (alpha >= beta) break;
	}
	return best;
}

export function aiMove(m, level = 2, rnd = Math.random) {
	const who = m.turn;
	const moves = legalMoves(m, who);
	if (!moves.length) return null;
	if (level <= 1) return moves[Math.floor(rnd() * moves.length)];
	let best = [], bestV = -Infinity;
	for (const mv of moves) {
		const t = cloneM(m);
		const flips = play(t, mv);
		let v;
		if (level === 2) v = flips.length;
		else if (level === 3) {
			v = flips.length * 2 - exposure(t, mv.i, who) - flips.reduce((a, j) => a + exposure(t, j, who) * 0.5, 0);
			// guardar las cartas fuertes para el final si no gira nada
			if (!flips.length) v -= t.hand[who].length ? (m.hand[who][mv.h].sum / 40) : 0;
		} else {
			// mira hasta 3 jugadas por delante (la tuya y su respuesta), con poda alfa-beta
			v = -negamax(t, 2, -Infinity, Infinity) * 3 + flips.length * 0.1;
		}
		if (v > bestV + 1e-9) { bestV = v; best = [mv]; } else if (Math.abs(v - bestV) < 1e-9) best.push(mv);
	}
	return best[Math.floor(rnd() * best.length)];
}

/** Generador con semilla (pruebas). */
export function rng(seed) {
	let a = 0; for (const ch of String(seed)) a = (Math.imul(a ^ ch.charCodeAt(0), 2654435761) + 1) | 0;
	return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
/** Partida entera sin interfaz: tú juegas con `meLevel` y el rival con `foeLevel`. Devuelve el resultado y la partida. */
export function autoMatch(mine, theirs, meLevel = 2, foeLevel = 2, seed = 'x', first) {
	const r = rng(seed);
	const m = newMatch(mine, theirs, first || (r() < 0.5 ? 'me' : 'foe'));
	while (!isOver(m)) { const mv = aiMove(m, m.turn === 'me' ? meLevel : foeLevel, r); play(m, mv); }
	return { res: result(m), m };
}

// ---------------- Colección y rivales ----------------
export const DECK = 5;
export const cardState = (g = G) => (g.cards ||= { owned: {}, deck: [], wins: {}, games: 0, won: 0 });
export const ownedCount = () => Object.keys(cardState().owned).filter(k => cardState().owned[k] > 0).length;
export const hasCards = () => ownedCount() > 0;
export const playerDef = id => C.cardPlayers?.[id];
const ok = c => { try { return c === undefined || evalCond(c); } catch (e) { return false; } };
export const playersOpen = () => Object.keys(C.cardPlayers || {}).filter(id => ok(C.cardPlayers[id].cond));

export function addCard(sp, n = 1) { const st = cardState(); sp = toID(sp); st.owned[sp] = (st.owned[sp] || 0) + n; return st.owned[sp]; }
/** Tu mazo: el elegido (si sigues teniendo esas cartas) o, si no, las 5 más fuertes. */
export function myDeck() {
	const st = cardState();
	const all = Object.keys(st.owned).filter(k => st.owned[k] > 0);
	const deck = (st.deck || []).filter(sp => st.owned[sp] > 0);
	// una carta repetida solo puede ir tantas veces como la tengas
	const used = {};
	const ok2 = deck.filter(sp => (used[sp] = (used[sp] || 0) + 1) <= st.owned[sp]);
	if (ok2.length === DECK) return ok2;
	const rest = all.flatMap(sp => Array(st.owned[sp]).fill(sp)).map(card).filter(Boolean).sort((a, b) => b.sum - a.sum).map(c => c.sp);
	const out = ok2.slice();
	for (const sp of rest) { if (out.length >= DECK) break; const n = out.filter(x => x === sp).length; if (n < st.owned[sp]) out.push(sp); }
	return out;
}
export function setDeck(list) {
	const st = cardState();
	const need = {};
	for (const sp of list) need[sp] = (need[sp] || 0) + 1;
	if (list.length !== DECK || Object.keys(need).some(sp => (st.owned[sp] || 0) < need[sp])) return false;
	st.deck = list.slice();
	return true;
}
/** Sobre de inicio: las especies de tu equipo (sin repetir, hasta 5) y comunes hasta llegar a 8. */
export const STARTER_FILL = ['bidoof', 'pidgey', 'rattata', 'caterpie', 'zigzagoon', 'patrat', 'lillipup', 'sentret'];
export function starterPack(party = G.party) {
	const out = [];
	for (const p of party || []) { const base = toID(p.sp); if (D.species[base] && !out.includes(base) && out.length < 5) out.push(base); }
	for (const sp of STARTER_FILL) { if (out.length >= 8) break; if (!out.includes(sp)) out.push(sp); }
	return out;
}
export function giveStarter() {
	const st = cardState();
	if (st.starter) return [];
	const pack = starterPack();
	for (const sp of pack) addCard(sp);
	st.starter = Date.now();
	return pack;
}
/** Nivel de la IA de un rival: sube con cada victoria tuya contra él (hasta `max`). */
export function aiLevelFor(id) {
	const d = playerDef(id); if (!d) return 1;
	const w = cardState().wins[id] || 0;
	const max = d.max || d.level || 1;
	return Math.min(max, (d.level || 1) + Math.floor(w / (d.every || 1)));
}
/**
 * Cierra una partida contra un rival: guarda el resultado y, si ganas, te llevas la carta que elijas de su mazo
 * (`pick`, una de las suyas) y, la primera vez, sus premios. Devuelve { res, card, prizes, first }.
 */
export function finishMatch(id, res, pick = null, now = Date.now()) {
	const st = cardState(), d = playerDef(id);
	st.games++;
	const out = { res, card: null, prizes: [], first: false };
	if (res !== 'win') return out;
	st.won++;
	const w = st.wins[id] = (st.wins[id] || 0) + 1;
	const deck = d?.deck || [];
	const sp = pick && deck.includes(pick) ? pick : deck[0];
	if (sp) { addCard(sp); out.card = sp; }
	if (w === 1) { out.first = true; out.prizes = (d?.prize || []).slice(); for (const p of out.prizes) addItem(toID(p.id), p.n || 1); G.flags['cartas_' + id + '_ganada'] = true; }
	return out;
}
