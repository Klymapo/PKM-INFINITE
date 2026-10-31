// Checkpoints del bot de recorrido: el estado de una partida del bot al llegar al final de un bloque (`bNN_fin`),
// para que la auditoría rápida de un bloque no tenga que jugar todos los anteriores cada vez.
//
// Dónde: herramientas/test/checkpoints/ (en .gitignore; NO se suben). Son derivados (se regeneran solos en ~1 min),
// cambian con cualquier retoque del motor o del contenido viejo y pesan ~250 KB cada uno: subirlos solo engordaría
// el historial, y la sesión de cada noche parte de un clon nuevo en el que la primera rápida (o la completa) los genera.
//
// Uno por semilla, hora, fecha simulada (MM-DD: los eventos por fecha cambian lo que juega el bot), modo de elecciones
// y flag. Así la rápida sigue jugando 4 partidas distintas (semillas 1–4, día y noche alternos), cada una desde
// SU estado al final del bloque anterior: el valor de la prueba es el mismo que jugando desde B1, solo que no se repite.
//
// Validez: huella SHA-1 de todo lo que puede cambiar el camino del bot hasta ese flag:
//   - app/content/ entero salvo las carpetas de los bloques posteriores (bNN/ que vengan después en BLOCKS, o que no
//     estén cargados) y salvo app/content/index.js (su CONTENT_VERSION cambia en cada publicación); en su lugar entra
//     la lista ordenada de bloques hasta ese;
//   - el motor: app/js/, app/lib/, app/data/;
//   - el bot: herramientas/recorrido.mjs, herramientas/test/node-env.mjs y este archivo.
// Si la huella no coincide, el checkpoint no vale y el bot juega desde el principio (y, con --guardar-checkpoints,
// lo rehace). Retocar el bloque en obras (el posterior) NO invalida los checkpoints de los anteriores: es la idea.
//
// Formato: JSON { v, key, hash, flag, creado, bot: { …estado interno del bot… }, G }.
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
export const CK_DIR = process.env.CHECKPOINTS_DIR || path.join(ROOT, 'herramientas/test/checkpoints');
const VERSION = 1;

function files(dir, skip = () => false) {
	const out = [];
	const walk = d => {
		for (const f of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
			const p = path.join(d, f.name);
			if (skip(p, f)) continue;
			if (f.isDirectory()) walk(p); else if (f.isFile()) out.push(p);
		}
	};
	if (fs.existsSync(dir)) walk(dir);
	return out;
}
function hashFiles(h, list) { for (const p of list) { h.update(path.relative(ROOT, p) + '\0'); h.update(fs.readFileSync(p)); h.update('\0'); } }

let ENGINE = null;
function engineHash() {
	if (ENGINE) return ENGINE;
	const h = crypto.createHash('sha1');
	for (const d of ['app/js', 'app/lib', 'app/data']) hashFiles(h, files(path.join(ROOT, d)));
	hashFiles(h, ['herramientas/recorrido.mjs', 'herramientas/test/node-env.mjs', 'herramientas/checkpoints.mjs'].map(f => path.join(ROOT, f)));
	return (ENGINE = h.digest('hex'));
}

/** Huella del contenido y el motor que llevan hasta el final del bloque `ids[i]` (ids = BLOCKS en orden). */
export function hashHasta(ids, i) {
	const keep = new Set(ids.slice(0, i + 1));
	const content = path.join(ROOT, 'app/content');
	const h = crypto.createHash('sha1');
	h.update('v' + VERSION + '|' + engineHash() + '|' + [...keep].join(',') + '|');
	hashFiles(h, files(content, (p, f) => {
		const rel = path.relative(content, p);
		if (rel === 'index.js') return true;
		return f.isDirectory() && !rel.includes(path.sep) && /^b\d+$/.test(f.name) && !keep.has(f.name);
	}));
	return h.digest('hex');
}

/** Índice del bloque que termina con `flag` (su `ends` o `bNN_fin`), o -1. */
export function blockOfFlag(blocks, flag) { return blocks.findIndex(b => (b.ends || b.id + '_fin') === flag); }

export function ckKey({ seed, hora, fecha, elecciones = 'azar', flag }) { return `s${seed}-h${hora}-f${fecha}-${elecciones}-${flag}`; }
export function ckFile(o) { return path.join(CK_DIR, ckKey(o) + '.json'); }

/** ¿Hay un checkpoint válido? → { ok, file, why, data? } (data solo si `leer`). */
export function ckCheck(blocks, o, leer = false) {
	const i = blockOfFlag(blocks, o.flag);
	const file = ckFile(o);
	if (i < 0) return { ok: false, file, why: `${o.flag} no es el final de ningún bloque cargado` };
	if (!fs.existsSync(file)) return { ok: false, file, why: 'no existe' };
	let data;
	try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return { ok: false, file, why: 'ilegible: ' + e.message }; }
	if (data.v !== VERSION) return { ok: false, file, why: 'formato viejo' };
	if (data.hash !== hashHasta(blocks.map(b => b.id), i)) return { ok: false, file, why: 'el contenido o el motor cambiaron desde que se guardó' };
	return { ok: true, file, data: leer ? data : undefined };
}

export function ckSave(blocks, o, bot, G) {
	const i = blockOfFlag(blocks, o.flag);
	if (i < 0) return null;
	fs.mkdirSync(CK_DIR, { recursive: true });
	const file = ckFile(o);
	const tmp = file + '.' + process.pid + '.tmp';
	fs.writeFileSync(tmp, JSON.stringify({ v: VERSION, key: ckKey(o), hash: hashHasta(blocks.map(b => b.id), i), flag: o.flag, creado: new Date().toISOString(), bot, G }));
	fs.renameSync(tmp, file); // atómico: dos bots con la misma clave no dejan un archivo a medias
	return file;
}
