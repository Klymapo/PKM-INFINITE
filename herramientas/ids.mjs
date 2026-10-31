// Buscador de ids del contenido: para no chocar con ids publicados y saber dónde vive cada cosa.
// Carga el contenido como el validador (respeta INFINITO_EXTRA=bNN para bloques en obras).
// Uso:
//   node herramientas/ids.mjs existe <id> [<id>…]   ¿existe? ¿como qué?, con bloque y archivo
//   node herramientas/ids.mjs buscar <texto|/regex/> ids que coinciden, agrupados por tipo
//   node herramientas/ids.mjs bloque bNN [--todo]   resumen: lugares, entrenadores, misiones y flags que pone y lee
//   node herramientas/ids.mjs libre <prefijo>        ¿el prefijo ya se usa? y uno libre
// La salida nombra ids internos (puede tener spoilers): no la pegues en commits ni en el chat con Mario.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadDataNode } from './test/node-env.mjs';
import { D, toID } from '../app/js/data.js';
import { C, registerBlock } from '../app/js/content.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'app/content');
const TODO = process.argv.includes('--todo');
const [cmd, ...rest] = process.argv.slice(2).filter(a => a !== '--todo');
const AYUDA = 'Uso: node herramientas/ids.mjs existe <id>… | buscar <texto|/regex/> | bloque bNN | libre <prefijo>';
if (!cmd || !['existe', 'buscar', 'bloque', 'libre'].includes(cmd) || (!rest.length)) { console.log(AYUDA); process.exit(cmd ? 2 : 0); }

loadDataNode();
const customItems = new Set();
const mod = await import('../app/content/index.js');
for (const b of mod.BLOCKS) { for (const id in b.items || {}) customItems.add(toID(id)); registerBlock(b); }

// ---------------- Índice: tipo → id → { blocks:Set, ctx:Set } ----------------
const TIPOS = {
	lugar: 'lugar', entrenador: 'entrenador', guion: 'guion', mision: 'misión', objeto: 'objeto propio', npc: 'NPC',
	flagSet: 'flag (se pone)', flagRead: 'flag (se lee)', var: 'var', spot: 'spot', minijuego: 'minijuego', puzle: 'puzle',
	cine: 'cinemática (en guion)', negocio: 'negocio', tienda: 'tienda', recoleccion: 'recolección', reto: 'reto',
	medalla: 'medalla', evento: 'evento', carrera: 'carrera', foto: 'foto', cuadrante: 'rival de Cuadrante', caso: 'caso',
	serial: 'serial', radio: 'radio', buzon: 'buzón', pedido: 'pedido', region: 'región',
};
const IDX = {};
for (const t in TIPOS) IDX[t] = new Map();
const add = (tipo, id, blk, ctx) => {
	if (!id || typeof id !== 'string') return;
	let e = IDX[tipo].get(id); if (!e) IDX[tipo].set(id, e = { blocks: new Set(), ctx: new Set() });
	if (blk) e.blocks.add(blk); if (ctx) e.ctx.add(ctx);
};
const FLAG_RE = /\bflags?\.([A-Za-z0-9_]+)/g, VAR_RE = /\bvars?\.([A-Za-z0-9_]+)/g;
function readStr(s, blk, ctx) {
	for (const m of s.matchAll(FLAG_RE)) add('flagRead', m[1], blk, ctx);
	for (const m of s.matchAll(VAR_RE)) add('var', m[1], blk, ctx);
}
// Recorre todo el objeto de un bloque: claves de `set` = se pone; cadenas con flag.x = se lee
function deep(o, blk, ctx, seen = new Set()) {
	if (!o || typeof o !== 'object' || seen.has(o)) return; seen.add(o);
	if (Array.isArray(o)) { for (const x of o) typeof x === 'string' ? readStr(x, blk, ctx) : deep(x, blk, ctx, seen); return; }
	if (o.set && typeof o.set === 'object' && !Array.isArray(o.set)) for (const k in o.set) {
		const [ns, name] = k.split('.');
		if (ns.startsWith('flag')) add('flagSet', name, blk, ctx); else if (ns.startsWith('var')) add('var', name, blk, ctx);
	}
	if (typeof o.unlock === 'string') add('flagSet', 'mec_' + o.unlock, blk, ctx + ' (motor)');
	if (typeof o.mapUnlock === 'string') add('flagSet', 'map_' + o.mapUnlock, blk, ctx + ' (motor)');
	if (typeof o.label === 'string' && typeof o.id === 'string') add('spot', o.id, blk, ctx);
	if (o.minigame && typeof o.minigame === 'object' && o.minigame.id) add('minijuego', o.minigame.id, blk, ctx);
	if (o.puzzle && typeof o.puzzle === 'object' && o.puzzle.id) add('puzle', o.puzzle.id, blk, ctx);
	if (o.cutscene && typeof o.cutscene === 'object') add('cine', o.cutscene.id || ctx.replace(/^guion /, ''), blk, ctx);
	for (const k in o) { const v = o[k]; if (typeof v === 'string') readStr(v, blk, ctx); else deep(v, blk, ctx, seen); }
}
const MAPS = { locations: 'lugar', trainers: 'entrenador', scripts: 'guion', quests: 'mision', npcs: 'npc', ventures: 'negocio', shops: 'tienda', gather: 'recoleccion', challenges: 'reto', badges: 'medalla', races: 'carrera', photos: 'foto', cardPlayers: 'cuadrante', cases: 'caso', serials: 'serial', regions: 'region' };
const LISTS = { events: 'evento', radio: 'radio', mail: 'buzon', pedidos: 'pedido' };
for (const b of mod.BLOCKS) {
	for (const [k, t] of Object.entries(MAPS)) for (const id in b[k] || {}) { add(t, id, b.id); deep(b[k][id], b.id, `${TIPOS[t]} ${id}`); }
	for (const [k, t] of Object.entries(LISTS)) for (const e of b[k] || []) { add(t, e.id, b.id); deep(e, b.id, `${TIPOS[t]} ${e.id}`); }
	for (const id in b.items || {}) { add('objeto', toID(id), b.id); deep(b.items[id], b.id, 'objeto ' + id); }
	for (const id in b.patches || {}) deep(b.patches[id], b.id, `parche de ${id}`);
	for (const m of b.milestones || []) add('flagRead', m.flag, b.id, 'hito');
	for (const id in b.gather || {}) { add('flagSet', 'rec_' + id, b.id, `recolección ${id} (motor)`); if (b.gather[id].game) add('minijuego', 'g:' + id, b.id, 'recolección ' + id); }
	for (const id in b.races || {}) add('flagSet', `carrera_${id}_ganada`, b.id, `carrera ${id} (motor)`);
	if (b.ends) add('flagRead', b.ends, b.id, 'final del bloque (ends)');
}
const ALL_IDS = () => Object.entries(IDX).flatMap(([t, m]) => [...m.keys()].map(id => [t, id]));

// ---------------- Texto de los archivos (para decir en qué archivo está) ----------------
const files = [];
(function scan(dir) { for (const f of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, f.name); if (f.isDirectory()) scan(p); else if (f.name.endsWith('.js')) files.push({ rel: path.relative(CONTENT, p), txt: fs.readFileSync(p, 'utf8') }); } })(CONTENT);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function filesOf(id, tipo) {
	const word = new RegExp(`(?<![A-Za-z0-9_])${esc(id)}(?![A-Za-z0-9_])`);
	const def = new RegExp(`(?<![A-Za-z0-9_.])['"]?${esc(id)}['"]?\\s*:`);
	const all = files.filter(f => word.test(f.txt));
	const defs = tipo && !/^flag|^var/.test(tipo) ? all.filter(f => def.test(f.txt) || new RegExp(`id:\\s*['"]${esc(id)}['"]`).test(f.txt)) : [];
	return { defs: defs.map(f => f.rel), all: all.map(f => f.rel) };
}
const lista = (xs, n = 6) => xs.length > n ? xs.slice(0, n).join(', ') + ` … (+${xs.length - n})` : xs.join(', ');
const blks = e => [...e.blocks].sort().join(',') || '—';
function wrap(title, xs, ancho = 110, max = TODO ? Infinity : 60) {
	if (!xs.length) return `${title}: —`;
	const n = xs.length; if (n > max) xs = [...xs.slice(0, max), `… (+${n - max}; --todo para verlos todos)`];
	const out = []; let line = `${title} (${n}): `;
	for (const [i, x] of xs.entries()) { const s = x + (i < xs.length - 1 ? ', ' : ''); if (line.length + s.length > ancho) { out.push(line.trimEnd()); line = '    '; } line += s; }
	out.push(line); return out.join('\n');
}

// ---------------- Comandos ----------------
if (cmd === 'existe') {
	let faltan = 0;
	for (const id of rest) {
		const hits = Object.keys(TIPOS).filter(t => IDX[t].has(id));
		const canon = [D.species[toID(id)] && !customItems.has(toID(id)) && 'especie canon', D.items[toID(id)] && !customItems.has(toID(id)) && 'objeto canon', D.moves[toID(id)] && 'movimiento canon'].filter(Boolean);
		if (!hits.length && !canon.length) {
			faltan++;
			const near = ALL_IDS().filter(([, x]) => x.startsWith(id.replace(/_?\d+$/, '')) && x !== id).map(([, x]) => x);
			console.log(`✖ ${id}: no existe${near.length ? ` · parecidos: ${lista([...new Set(near)], 8)}` : ''}`);
			continue;
		}
		console.log(`✔ ${id}${canon.length ? ' · ' + canon.join(', ') : ''}`);
		for (const t of hits) {
			const e = IDX[t].get(id), f = filesOf(id, t);
			const extra = t === 'lugar' ? ` · ${C.locations[id].name}${C.locations[id].parent ? ' (dentro de ' + C.locations[id].parent + ')' : ''}`
				: t === 'entrenador' ? ` · ${C.trainers[id].cls || ''} ${C.trainers[id].name || ''}`.replace(/ +/g, ' ').trimEnd()
				: t === 'mision' ? ` · «${C.quests[id].name}» (${C.quests[id].type}): ${Object.keys(C.quests[id].stages || {}).join(' → ')}`
				: t === 'npc' ? ` · ${C.npcs[id].name || ''}` : '';
			const donde = /^flag|^var|spot|minijuego|puzle|cine/.test(t) && e.ctx.size ? ` · en ${lista([...e.ctx], 4)}` : '';
			const arch = (f.defs.length ? f.defs : f.all);
			console.log(`  ${TIPOS[t]} · ${blks(e)}${extra}${donde}${arch.length ? ' · ' + lista(arch, 3) : ''}`);
		}
		if (IDX.flagRead.has(id) && !IDX.flagSet.has(id) && !/^(mec|mount|map|carrera)_/.test(id)) console.log('  ⚠ se lee pero ningún guion lo pone (todavía)');
		if (IDX.flagSet.has(id) && !IDX.flagRead.has(id)) console.log('  · se pone pero nadie lo lee');
	}
	process.exit(faltan === rest.length ? 1 : 0);
}

if (cmd === 'buscar') {
	const q = rest.join(' ');
	const re = /^\/.+\/[a-z]*$/.test(q) ? new RegExp(q.slice(1, q.lastIndexOf('/')), q.slice(q.lastIndexOf('/') + 1)) : new RegExp(esc(q), 'i');
	let n = 0;
	for (const t of Object.keys(TIPOS)) {
		const xs = [...IDX[t].entries()].filter(([id]) => re.test(id)).sort(([a], [b]) => a.localeCompare(b));
		if (!xs.length) continue; n += xs.length;
		console.log(wrap(TIPOS[t], xs.map(([id, e]) => `${id} [${blks(e)}]`)));
	}
	if (!n) console.log(`Nada coincide con ${re}.`);
	process.exit(n ? 0 : 1);
}

if (cmd === 'bloque') {
	const id = rest[0], b = mod.BLOCKS.find(x => x.id === id);
	if (!b) { console.log(`✖ El bloque ${id} no está cargado (BLOCKS: ${mod.BLOCKS.map(x => x.id).join(', ')}). Si está en obras: INFINITO_EXTRA=${id} node herramientas/ids.mjs bloque ${id}`); process.exit(1); }
	const of = t => [...IDX[t].entries()].filter(([, e]) => e.blocks.has(id)).map(([k]) => k).sort();
	const sets = new Set(of('flagSet')), reads = of('flagRead');
	const huerfanos = reads.filter(f => !IDX.flagSet.has(f) && !/^(mec|mount|map|carrera)_/.test(f));
	const ajenos = reads.filter(f => IDX.flagSet.has(f) && !sets.has(f));
	console.log(`${b.id} · ${b.title} · ${b.hours} h · inicio ${b.start || '—'} · final ${b.ends || '—'}${b.ends && !IDX.flagSet.has(b.ends) ? ' (⚠ nadie lo pone)' : ''}`);
	const locs = of('lugar');
	console.log(wrap('Lugares', locs.filter(l => !C.locations[l].parent)));
	console.log(wrap('Sub-lugares', locs.filter(l => C.locations[l].parent)));
	console.log(wrap('Entrenadores', of('entrenador')));
	console.log(wrap('Misiones', of('mision').map(q => `${q} (${C.quests[q].type})`)));
	console.log(`Guiones: ${of('guion').length} · NPCs: ${of('npc').length} · negocios: ${lista(of('negocio'))} · minijuegos: ${of('minijuego').length} · cinemáticas: ${of('cine').length} · eventos: ${lista(of('evento'))}`);
	console.log(wrap('Flags que pone', [...sets]));
	console.log(wrap('Flags que lee de otros bloques', ajenos));
	if (huerfanos.length) console.log(wrap('⚠ Flags que lee y nadie pone', huerfanos));
	const hechos = [...sets].filter(f => new RegExp(`^${id}_t\\d+_hecho$`).test(f)).sort((a, c) => +a.match(/_t(\d+)_/)[1] - +c.match(/_t(\d+)_/)[1]);
	if (hechos.length) console.log(`Cierres de tramo: ${hechos.join(', ')}`);
	process.exit(0);
}

if (cmd === 'libre') {
	const p = rest[0];
	const usados = pref => ALL_IDS().filter(([, x]) => x.startsWith(pref));
	const u = usados(p);
	if (!u.length) { console.log(`✔ «${p}» está libre: ningún id empieza así.`); process.exit(0); }
	const byT = {}; for (const [t, x] of u) (byT[TIPOS[t]] ||= new Set()).add(x);
	console.log(`✖ «${p}» ya se usa en ${new Set(u.map(([, x]) => x)).size} ids:`);
	for (const [t, xs] of Object.entries(byT)) console.log(`  ${t}: ${lista([...xs].sort(), 8)}`);
	const last = mod.BLOCKS.map(b => b.id).filter(x => /^b\d+$/.test(x)).sort().pop() || 'b00';
	const next = 'b' + String(+last.slice(1) + 1).padStart(2, '0');
	const base = p.replace(/_+$/, ''), sep = p.endsWith('_') ? '_' : '';
	const cands = [`${next}_${base}${sep}`, `${last}_${base}${sep}`, ...[2, 3, 4, 5].map(n => `${base}${n}${sep}`)];
	const libre = cands.filter(c => !usados(c).length);
	console.log(`→ Libres: ${libre.slice(0, 3).join(', ') || '—'} (los ids de bloque nuevo deberían empezar por ${next}_)`);
	process.exit(1);
}
