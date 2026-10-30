// Historias por capítulos (pedido de Mario, 2026-10-30: «pueblo maldito por capítulos»). Lógica pura.
// Un serial libera un capítulo por semana real: el capítulo n se abre `gap` días (7 por defecto) después de
// terminar el n−1, y solo si ya está escrito (`written`). Lo que hizo el jugador en un capítulo se guarda en flags
// normales y el siguiente los lee. Formato en docs/CONTENIDO.md §22. Prueba: herramientas/test/capitulos-test.mjs.
//   serials: { cirio: { name, loc, gap: 7, written: 1, chapters: [ { n: 1, title }, … ] } }
//   guion: { chapter: { id: 'cirio', done: 1 } }   marca el capítulo como terminado (una vez)
//   guion: { chapter: { id: 'cirio', wait: true } } dice cuándo llega el siguiente
//   condiciones: capitulo('cirio', 2) (abierto) · capituloHecho('cirio', 1)
import { G, serialOpen } from './state.js';
import { C } from './content.js';

export const DAY = 864e5;
export const serialDef = id => C.serials?.[id];
export const serialState = id => ((G.serial ||= {})[id] ||= { done: {} });
export { serialOpen };

/** Marca el capítulo n como terminado. Devuelve true si es la primera vez. */
export function finishChapter(id, n, now = Date.now()) {
	const st = serialState(id);
	if (st.done[n]) return false;
	st.done[n] = now;
	return true;
}
/** Último capítulo terminado (0 si ninguno). */
export function lastDone(id) { const d = serialState(id).done; return Math.max(0, ...Object.keys(d).map(Number)); }
/**
 * Siguiente capítulo: { n, title, at (cuándo se abre), open, written }.
 * `written: false` = aún no está escrito (llegará con una actualización).
 */
export function nextChapter(id, now = Date.now()) {
	const def = serialDef(id);
	const n = lastDone(id) + 1;
	const prev = serialState(id).done[n - 1];
	const at = n === 1 ? 0 : prev + (def.gap ?? 7) * DAY;
	const ch = (def.chapters || []).find(c => c.n === n);
	return { n, title: ch?.title || '', at, open: serialOpen(id, n, now), written: n <= (def.written || 0) };
}
/** Texto para el jugador: cuándo llega el siguiente capítulo. */
export function waitText(id, now = Date.now()) {
	const def = serialDef(id), nx = nextChapter(id, now);
	if (nx.n > (def.chapters || []).length && !nx.written) return `Por ahora, ${def.name} descansa. Lo que viviste allí queda apuntado.`;
	if (nx.open) return `**Capítulo ${nx.n}${nx.title ? ': ' + nx.title : ''}** ya está aquí.`;
	const fecha = new Date(nx.at).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
	if (nx.at > now) return `El **capítulo ${nx.n}** de ${def.name} llegará el **${fecha}**. Hasta entonces, el pueblo espera.`;
	return `El **capítulo ${nx.n}** de ${def.name} llegará con una próxima actualización del juego. Lo que hiciste se recordará.`;
}
