// Imágenes ilustradas opcionales (de ChatGPT u otros), que sustituyen a lo procedural cuando existen.
// Las pone en su sitio herramientas/importar-imagenes.py; build-sw.mjs genera app/img/indice.json con la lista.
//   app/img/titulo.png               fondo de la pantalla de título
//   app/img/retratos/<idNPC>.png     retrato de un personaje (diálogos, expediente, negocios…)
//   app/img/postales/<idLugar>.png   postal de una ciudad o pueblo (Colección)
let INDEX = null;
export async function loadImageIndex() {
	try { const r = await fetch('./img/indice.json', { cache: 'no-cache' }); INDEX = r.ok ? new Set(await r.json()) : new Set(); } catch (e) { INDEX = new Set(); }
}
export const hasImage = rel => !!INDEX?.has(rel);
/** <img> pixelado si existe la imagen; si no, null. */
export function illus(rel, cls = '') {
	if (!hasImage(rel)) return null;
	const img = document.createElement('img');
	img.className = 'px illus ' + cls; img.draggable = false; img.alt = ''; img.src = './img/' + rel;
	return img;
}
