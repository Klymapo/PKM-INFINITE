// Galería privada (pedido de Mario, 2026-10-28): imágenes que Mario mete desde su teléfono (postales y momentos
// dibujados por Argos, que llevan Pokémon y por eso NO viven en el repo ni se publican). Se guardan solo en este
// teléfono, en IndexedDB, con su nombre de archivo como clave. Nunca se suben a ningún sitio.
//   postal-<idLugar>.png   → sustituye a la postal del Álbum (Colección) de ese lugar
//   momento-NN-<slug>.png  → se ve en la galería con su título
// La parte pura (nombres y títulos) se prueba en Node: herramientas/test/galeria-test.mjs.

const DB = 'pokemon-infinite-galeria', STORE = 'imgs';

// ---------------- Nombres (puro) ----------------
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
/** Normaliza el nombre de archivo a la clave: minúsculas, sin ruta ni espacios raros. */
export function keyOf(fileName) {
	return String(fileName || '').split(/[\\/]/).pop().trim().toLowerCase().replace(/\s+/g, '-');
}
/** Qué es cada imagen: { kind: 'postal'|'momento'|'otra', id?, n?, title } */
export function describe(key) {
	const k = keyOf(key).replace(/\.(png|jpe?g|webp|gif)$/, '');
	let m = /^postal-(.+)$/.exec(k);
	if (m) return { kind: 'postal', id: m[1], title: 'Postal · ' + m[1] };
	m = /^momento-(\d+[a-z]?)-(.+)$/.exec(k);
	if (m) return { kind: 'momento', n: m[1], title: cap(m[2].replace(/-/g, ' ')) };
	return { kind: 'otra', title: cap(k.replace(/[-_]/g, ' ')) };
}
/** Orden de la galería: momentos por número, luego postales, luego el resto. */
export function sortKeys(keys) {
	const rank = k => { const d = describe(k); return d.kind === 'momento' ? 0 : d.kind === 'postal' ? 1 : 2; };
	const num = k => parseInt(describe(k).n || '0', 10);
	return keys.slice().sort((a, b) => rank(a) - rank(b) || num(a) - num(b) || a.localeCompare(b));
}
export const isImageName = n => /\.(png|jpe?g|webp|gif)$/i.test(String(n || ''));

// ---------------- Almacén (IndexedDB) ----------------
function open() {
	return new Promise((res, rej) => {
		if (!('indexedDB' in self)) return rej(new Error('Este navegador no permite guardar imágenes'));
		const r = indexedDB.open(DB, 1);
		r.onupgradeneeded = () => r.result.createObjectStore(STORE);
		r.onsuccess = () => res(r.result);
		r.onerror = () => rej(r.error);
	});
}
async function run(mode, fn) {
	const db = await open();
	return new Promise((res, rej) => {
		const tx = db.transaction(STORE, mode);
		const out = fn(tx.objectStore(STORE));
		tx.oncomplete = () => res(out?.result ?? out);
		tx.onerror = () => rej(tx.error);
	});
}
export async function listKeys() { try { return sortKeys(await run('readonly', s => s.getAllKeys())); } catch (e) { return []; } }
export async function getBlob(key) { try { return await run('readonly', s => s.get(keyOf(key))); } catch (e) { return null; } }
export async function putFile(file) { const k = keyOf(file.name); await run('readwrite', s => s.put(file, k)); URLS.delete(k); return k; }
export async function remove(key) { const k = keyOf(key); await run('readwrite', s => s.delete(k)); const u = URLS.get(k); if (u) URL.revokeObjectURL(u); URLS.delete(k); }

const URLS = new Map();
/** URL local (blob:) de una imagen guardada, o null. */
export async function urlOf(key) {
	const k = keyOf(key);
	if (URLS.has(k)) return URLS.get(k);
	const b = await getBlob(k);
	if (!b) return null;
	const u = URL.createObjectURL(b);
	URLS.set(k, u);
	return u;
}
/** Si hay imagen privada `key`, sustituye a `el` (lo que ya se mostraba) por ella cuando cargue. Devuelve `el`. */
export function swapIfPrivate(el, key, cls = '') {
	urlOf(key).then(u => {
		if (!u || !el.parentNode) return;
		const img = document.createElement('img');
		img.className = 'illus priv ' + cls; img.alt = ''; img.src = u; img.draggable = false;
		el.replaceWith(img);
	}).catch(() => {});
	return el;
}
