// Flags y vars que pone el MOTOR (app/js/), no los guiones. Lo usan ids.mjs y validar.mjs para no
// avisar de «se lee pero nadie lo pone» cuando lo pone el código (p. ej. G.flags.regalo_cordon = true).
// Reconoce asignaciones `flags.x =`, `flags['x'] =`, `flags['pre_' + id + '_suf'] =` (y ||=, ??=, +=…)
// y cadenas 'flag.x': … en objetos `set` que el motor ejecuta. Las claves calculadas sin texto fijo
// (flags[key]) no se pueden saber y se ignoran.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const JS = path.join(ROOT, 'app/js');
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ASSIGN = String.raw`\s*(?:=(?![=>])|\|\|=|\?\?=|\+=|-=)`;

// Convierte la expresión de dentro de [...] en { name } (fija) o { re } (patrón); null si no tiene texto fijo.
function keyOf(expr) {
	expr = expr.trim();
	let m = expr.match(/^(['"])([^'"`]*)\1$/);
	if (m) return { name: m[2] };
	m = expr.match(/^`([^`]*)`$/);
	const parts = [];
	if (m) { for (const p of m[1].split(/(\$\{[^}]*\})/)) if (p) parts.push(p.startsWith('${') ? null : p); }
	else for (const p of expr.split('+')) { const q = p.trim().match(/^(['"])([^'"]*)\1$/); parts.push(q ? q[2] : null); }
	if (!parts.some(p => p)) return null;
	if (parts.every(p => p !== null)) return { name: parts.join('') };
	return { re: new RegExp('^' + parts.map(p => p === null ? '.+' : esc(p)).join('') + '$'), src: expr };
}

let cache;
export function motor() {
	if (cache) return cache;
	const out = { flag: { names: new Map(), pats: [] }, var: { names: new Map(), pats: [] } };
	const files = [];
	(function scan(dir) { for (const f of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, f.name); if (f.isDirectory()) scan(p); else if (f.name.endsWith('.js')) files.push(p); } })(JS);
	for (const p of files) {
		const rel = path.relative(ROOT, p), txt = fs.readFileSync(p, 'utf8');
		for (const [ns, word] of [['flag', 'flags'], ['var', 'vars']]) {
			const o = out[ns];
			const addName = n => { if (!o.names.has(n)) o.names.set(n, new Set()); o.names.get(n).add(rel); };
			for (const m of txt.matchAll(new RegExp(String.raw`\b${word}\.([A-Za-z_][A-Za-z0-9_]*)` + ASSIGN, 'g'))) addName(m[1]);
			for (const m of txt.matchAll(new RegExp(String.raw`\b${word}\[([^\]\n]{1,80})\]` + ASSIGN, 'g'))) {
				const k = keyOf(m[1]); if (!k) continue;
				if (k.name) addName(k.name); else o.pats.push({ re: k.re, src: k.src, file: rel });
			}
			// { 'flag.x': true } dentro de comandos set que ejecuta el motor
			for (const m of txt.matchAll(new RegExp(String.raw`\bset\s*:\s*\{([^}]{0,200})\}`, 'g')))
				for (const q of m[1].matchAll(new RegExp(String.raw`['"]${ns}s?\.([A-Za-z0-9_]+)['"]\s*:`, 'g'))) addName(q[1]);
		}
	}
	return (cache = out);
}

// ¿Lo pone el motor? Devuelve los archivos (texto corto) o null.
export function puestoPorMotor(name, ns = 'flag') {
	const o = motor()[ns];
	if (o.names.has(name)) return [...o.names.get(name)].join(', ');
	const p = o.pats.filter(x => x.re.test(name));
	return p.length ? [...new Set(p.map(x => x.file))].join(', ') : null;
}
