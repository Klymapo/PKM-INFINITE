// Buzón: cartas, periódicos, visitas y encargos que llegan días reales después de algo que viviste
// (pedido de Mario, 2026-10-29: «decisiones con eco» y «encargos de conocidos").
// Lógica pura, sin interfaz (la pantalla está en ui/correo-ui.js). Formato en docs/CONTENIDO.md §15.
//
// En el contenido:  mail: [{ id, kind: 'carta'|'periodico'|'visita'|'encargo', cond, days: 2, from, npc?, title,
//                            item?: '<objeto con read>', script?: '<guion al abrirla>', w? }]
// Una pieza «se entera» la primera vez que su `cond` se cumple y llega `days` días reales después.
// Como mucho llega una pieza cada 20 h, para que una partida vieja con muchas decisiones no reciba diez cartas juntas.
import { G, evalCond, addItem } from './state.js';
import { C } from './content.js';

export const DAY = 86400e3;
export const GAP = 20 * 3600e3;
const ok = c => { try { return c === undefined || evalCond(c); } catch (e) { return false; } };
export const mailState = (g = G) => (g.mail ||= { seen: {}, got: {}, read: {}, lastAt: 0 });
export const mailDef = id => (C.mail || []).find(m => m.id === id);

/** Revisa el buzón: apunta las que ya se cumplen y entrega (una como mucho) las que ya tocan. Devuelve las nuevas. */
export function mailTick(t = Date.now()) {
	const st = mailState(), out = [];
	const due = [];
	for (const m of C.mail || []) {
		if (st.got[m.id]) continue;
		if (!ok(m.cond)) continue;
		st.seen[m.id] ||= t;
		if (t - st.seen[m.id] >= (m.days ?? 1) * DAY) due.push(m);
	}
	if (!due.length || t - (st.lastAt || 0) < GAP) return out;
	// la que lleva más tiempo esperando; a igualdad, la del bloque más antiguo (orden de registro)
	due.sort((a, b) => st.seen[a.id] - st.seen[b.id]);
	const m = due[0];
	st.got[m.id] = t;
	st.lastAt = t;
	if (m.item) addItem(m.item, 1);
	out.push(m);
	return out;
}
/** Entregadas, de la más nueva a la más vieja. */
export function mailbox() {
	const st = mailState();
	return (C.mail || []).filter(m => st.got[m.id]).sort((a, b) => st.got[b.id] - st.got[a.id]).map(m => ({ ...m, at: st.got[m.id], read: !!st.read[m.id] }));
}
export const unreadMail = () => mailbox().filter(m => !m.read).length;
export function markRead(id) { mailState().read[id] = Date.now(); }
/** Para las herramientas: cuántas esperan y cuándo llegaría la siguiente. */
export function mailQueue(t = Date.now()) {
	const st = mailState();
	return (C.mail || []).filter(m => !st.got[m.id] && st.seen[m.id]).map(m => ({ id: m.id, at: Math.max(st.seen[m.id] + (m.days ?? 1) * DAY, (st.lastAt || 0) + GAP) }));
}
