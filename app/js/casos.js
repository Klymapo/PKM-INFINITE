// Casos de detective (pedido de Mario, 2026-10-30). Lógica pura: se prueba en Node (herramientas/test/casos-test.mjs).
// Pantalla en ui/casos-ui.js; casos en el contenido (`cases`, docs/CONTENIDO.md §21).
//
// Un caso tiene sitios que registrar, sospechosos a los que preguntar y a los que enseñar pistas, y una acusación
// final: a quién acusas y QUÉ PISTA lo prueba. El compañero (Quintana) comenta las pistas y reclama si acusas mal:
// el primer error te devuelve a investigar; el segundo cierra el caso y el culpable se escapa (queda registrado,
// no bloquea nada). Misterios justos: toda pista necesaria se puede conseguir antes de acusar (lo comprueba la prueba).
import { G, evalCond, addItem } from './state.js';
import { C } from './content.js';
import { toID } from './data.js';

export const STRIKES = 2;
export const caseDef = id => C.cases?.[id];
export const casesState = (g = G) => (g.casos ||= { rep: 0, c: {} });
export const caseState = id => (casesState().c[id] ||= { status: 'nuevo', clues: {}, asked: {}, shown: {}, searched: {}, strikes: 0 });
const ok = c => { try { return c === undefined || evalCond(c); } catch (e) { return false; } };

/** ¿Tienes todas estas pistas? */
export const haveAll = (st, list) => (list || []).every(k => st.clues[k]);
/** Pistas en la libreta, en el orden en que se encontraron. */
export function notebook(id) {
	const def = caseDef(id), st = caseState(id);
	return Object.keys(st.clues).sort((a, b) => st.clues[a] - st.clues[b]).map(k => ({ id: k, ...def.clues[k] })).filter(c => c.name);
}
function gain(id, list, t) {
	const st = caseState(id), got = [];
	for (const k of list || []) if (!st.clues[k]) { st.clues[k] = t || Date.now(); got.push(k); }
	return got;
}
export function open(id) { const st = caseState(id); if (st.status === 'nuevo') st.status = 'abierto'; return st; }

/** Sitios que se pueden registrar ahora. */
export function places(id) {
	const def = caseDef(id), st = caseState(id);
	return (def.places || []).filter(p => haveAll(st, p.needs) && ok(p.cond)).map(p => ({ ...p, done: !!st.searched[p.id] }));
}
export function search(id, pid) {
	const def = caseDef(id), st = caseState(id);
	const p = (def.places || []).find(x => x.id === pid);
	if (!p || !haveAll(st, p.needs)) return null;
	st.searched[pid] = true;
	return { place: p, got: gain(id, p.gives) };
}
/** Preguntas disponibles para un sospechoso (las que piden pistas solo salen al tenerlas). */
export function questions(id, sid) {
	const s = caseDef(id).suspects[sid], st = caseState(id);
	return (s.questions || []).filter(q => haveAll(st, q.needs)).map(q => ({ ...q, done: !!st.asked[sid + ':' + q.id] }));
}
export function ask(id, sid, qid) {
	const s = caseDef(id).suspects[sid], st = caseState(id);
	const q = (s.questions || []).find(x => x.id === qid);
	if (!q || !haveAll(st, q.needs)) return null;
	st.asked[sid + ':' + qid] = true;
	return { q, got: gain(id, q.gives) };
}
/** Enseñar una pista a un sospechoso: respuesta propia si la tiene, o la genérica. */
export function present(id, sid, clue) {
	const s = caseDef(id).suspects[sid], st = caseState(id);
	if (!st.clues[clue]) return null;
	const r = s.present?.[clue];
	st.shown[sid + ':' + clue] = true;
	if (!r) return { generic: true, a: s.presentDefault || ['No sé qué quieres que vea ahí.'], got: [] };
	return { a: r.a, got: gain(id, r.gives) };
}
/** ¿Queda algo por hacer? (para el aviso de Quintana antes de acusar) */
export function pending(id) {
	const def = caseDef(id), st = caseState(id);
	const pl = places(id).filter(p => !p.done).length;
	let qs = 0;
	for (const sid in def.suspects) qs += questions(id, sid).filter(q => !q.done).length;
	return { places: pl, questions: qs, total: pl + qs };
}

/**
 * Acusación: `sid` sospechoso y `clue` la pista que lo prueba.
 * Devuelve { result: 'resuelto' | 'error' | 'fallido', reason: 'culpable' | 'prueba' | null, strikes }.
 */
export function accuse(id, sid, clue, now = Date.now()) {
	const def = caseDef(id), st = caseState(id);
	if (st.status === 'resuelto' || st.status === 'fallido') return { result: st.status, reason: null, strikes: st.strikes };
	const rightWho = sid === def.culprit;
	const rightProof = rightWho && st.clues[clue] && (def.proof || []).includes(clue);
	if (rightWho && rightProof) {
		st.status = 'resuelto'; st.at = now; st.proof = clue;
		casesState().rep += def.rep ?? 10;
		for (const p of def.prize || []) addItem(toID(p.id), p.n || 1);
		G.flags[id + '_resuelto'] = true;
		return { result: 'resuelto', reason: null, strikes: st.strikes };
	}
	st.strikes++;
	const reason = rightWho ? 'prueba' : 'culpable';
	(st.wrong ||= []).push({ sid, clue, reason });
	if (st.strikes >= STRIKES) {
		st.status = 'fallido'; st.at = now;
		G.flags[id + '_fallido'] = true;
		return { result: 'fallido', reason, strikes: st.strikes };
	}
	return { result: 'error', reason, strikes: st.strikes };
}

/**
 * Pistas que se pueden conseguir desde cero (búsqueda por cierre): sitios, preguntas y pistas enseñadas que
 * dan otras pistas. Sirve para comprobar que el misterio es justo.
 */
export function reachable(def) {
	const have = new Set();
	let grew = true;
	const can = needs => (needs || []).every(k => have.has(k));
	while (grew) {
		grew = false;
		const add = list => { for (const k of list || []) if (!have.has(k)) { have.add(k); grew = true; } };
		for (const p of def.places || []) if (can(p.needs)) add(p.gives);
		for (const s of Object.values(def.suspects || {})) {
			for (const q of s.questions || []) if (can(q.needs)) add(q.gives);
			for (const [k, r] of Object.entries(s.present || {})) if (have.has(k)) add(r.gives);
		}
	}
	return have;
}

/** Resolución sin interfaz (bot): consigue todo y acusa bien. */
export function autoSolve(id) {
	const def = caseDef(id);
	open(id);
	for (let round = 0; round < 8; round++) {
		for (const p of places(id)) search(id, p.id);
		for (const sid in def.suspects) {
			for (const q of questions(id, sid)) ask(id, sid, q.id);
			for (const k of Object.keys(caseState(id).clues)) present(id, sid, k);
		}
	}
	const proof = (def.proof || []).find(k => caseState(id).clues[k]);
	return accuse(id, def.culprit, proof);
}
export const caseList = () => Object.keys(C.cases || {}).filter(id => casesState().c[id] && casesState().c[id].status !== 'nuevo');
