// Fotografía (pedido de Mario, 2026-10-29): una cámara de la Gaceta Viajera y «momentos raros» en rutas ya visitadas.
// Lógica pura (sin interfaz). El minijuego de enfoque está en ui/foto-ui.js; el Álbum, en el Diario (pestaña Rotom › 📷 Fotos).
// Contenido: `photos: { <id>: { sp, loc, title, caption, pay: 1200, gift?: [{ id, n }] } }` + un spot con guion
//   `{ photo: '<id>', level: 1-3, onWin: […], onLose: […] }`. Formato en docs/CONTENIDO.md §16.
// Sin sprites en el repo: la foto se compone en el móvil con el sprite de PokeAPI (o el retrato de reserva) sobre el fondo del lugar.
import { G, addItem } from './state.js';
import { C } from './content.js';

export const fotos = (g = G) => (g.fotos ||= {});
export const photoDef = id => C.photos?.[id];
export const hasCamera = (g = G) => (g.bag?.camara || 0) > 0;

/** Guarda una foto (si ya existía, se queda la de más estrellas). q = 1–3 estrellas. */
export function takePhoto(id, q = 2, t = Date.now()) {
	const def = photoDef(id);
	if (!def) return null;
	const f = fotos(), old = f[id];
	q = Math.max(1, Math.min(3, Math.round(q)));
	if (old && old.q >= q) return old;
	f[id] = { t, q, loc: def.loc, sp: def.sp, sold: old?.sold || false, soldQ: old?.soldQ || 0 };
	return f[id];
}
/** Lo que pagaría la Gaceta por una foto: el precio base por estrellas (60 % · 80 % · 100 %). Si ya vendiste una peor, paga la diferencia. */
export function photoPrice(id) {
	const def = photoDef(id), f = fotos()[id];
	if (!def || !f) return 0;
	const val = q => Math.round((def.pay || 1000) * [0, 0.6, 0.8, 1][q] / 10) * 10;
	return Math.max(0, val(f.q) - (f.soldQ ? val(f.soldQ) : 0));
}
export function unsoldPhotos() { return Object.keys(fotos()).filter(id => photoDef(id) && photoPrice(id) > 0); }
/** La Gaceta compra todas las fotos nuevas (o mejores). Devuelve { n, money, items }. Los regalos (`gift`) solo la primera vez. */
export function sellPhotos() {
	const out = { n: 0, money: 0, items: {} };
	for (const id of unsoldPhotos()) {
		const f = fotos()[id], def = photoDef(id);
		out.money += photoPrice(id);
		if (!f.sold) for (const it of def.gift || []) out.items[it.id] = (out.items[it.id] || 0) + (it.n || 1);
		f.sold = true; f.soldQ = f.q; out.n++;
	}
	G.player.money += out.money;
	for (const k in out.items) addItem(k, out.items[k]);
	return out;
}
/** Álbum: fotos hechas, de la más nueva a la más vieja. */
export function album() {
	return Object.entries(fotos()).filter(([id]) => photoDef(id)).map(([id, f]) => ({ id, ...photoDef(id), ...f })).sort((a, b) => b.t - a.t);
}
export const photoCount = () => ({ have: album().length, total: Object.keys(C.photos || {}).length });

/** Minijuego de enfoque sin interfaz (herramientas): cuenta como ganado con 2 estrellas. */
export const skipFocus = () => ({ ok: true, q: 2 });
/**
 * Enfoque: el visor barre de lado a lado y hay que disparar cuando el Pokémon está dentro del recuadro.
 * 3 disparos; cada acierto es una estrella. Nivel 1–3: recuadro más estrecho y visor más rápido.
 */
export function focusParams(level = 2) {
	const L = Math.max(1, Math.min(3, level));
	return { shots: 3, zone: [0.30, 0.24, 0.18][L - 1], speed: [0.55, 0.75, 0.95][L - 1] }; // zona = ancho del recuadro (0–1); speed = recorridos por segundo
}
export function focusHit(pos, center, zone) { return Math.abs(pos - center) <= zone / 2; }
