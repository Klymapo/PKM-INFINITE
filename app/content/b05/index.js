// Bloque 5 · Acto IV: La luz robada. Une las partes del bloque.
// Al añadir un tramo nuevo, impórtalo aquí y añádelo a `parts`.
import npcs from './npcs.js';
import comun from './comun.js';
import misiones from './misiones.js';
import t0 from './t0-melemele.js';
import t1 from './t1-akala.js';
import t2 from './t2-aether.js';
import t3 from './t3-poni.js';
import t5 from './t5-taller.js';
import t8 from './t8-temporada.js';
import t6 from './t6-evolucion.js';
import t7 from './t7-museo.js';
import t9 from './t9-atico.js';
import t10 from './t10-p9-megas.js';
import t11 from './t11-p9-kalos.js';
import t12 from './t12-p9-hilos.js';
import t13 from './t13-p9-sistemas.js';
import t14 from './t14-p9-terror.js';
import t15 from './t15-radio.js';
import t16 from './t16-p9-copa.js';
import t17 from './t17-negocio-cafe.js';
import t18 from './t18-negocio-periodico.js';
import t19 from './t19-negocio-observatorio.js';

const block = {
	id: 'b05', title: 'Acto IV · La luz robada', hours: 12, ends: 'b05_fin',
	regions: { alola: { name: 'Alola', h: 100, land: 'M6,22 L14,8 L30,6 L42,14 L44,30 L36,44 L22,48 L8,42 Z M44,34 L56,28 L70,30 L78,44 L84,62 L82,78 L70,82 L56,76 L46,66 L42,50 Z M80,34 L90,34 L92,44 L82,46 Z M60,8 L80,4 L94,10 L92,22 L76,26 L62,20 Z M14,76 L28,72 L44,78 L48,90 L38,97 L20,96 L10,88 Z' } },
	npcs, quests: misiones,
	locations: {}, trainers: {}, scripts: {}, challenges: {}, badges: {}, shops: {}, items: {}, events: [], milestones: [], radio: [],
	gather: {}, patches: {}, ventures: {},
};
const parts = [comun, t0, t1, t2, t3, t5, t8, t6, t7, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19];
const extraSpots = {};
for (const part of parts) {
	for (const k of ['locations', 'trainers', 'scripts', 'challenges', 'badges', 'shops', 'items', 'quests', 'npcs', 'gather', 'ventures']) {
		for (const id in part[k] || {}) {
			if (k === 'ventures' && block[k][id]) { // ampliar un negocio del mismo bloque: se acumulan las listas
				const cur = block[k][id], v = part[k][id];
				for (const kk in v) cur[kk] = Array.isArray(v[kk]) && Array.isArray(cur[kk]) ? cur[kk].concat(v[kk]) : (Array.isArray(v[kk]) && !cur[kk] ? v[kk] : (cur[kk] ?? v[kk]));
				continue;
			}
			if (block[k][id] && k !== 'npcs') console.warn(`[b05] ${k} duplicado: ${id}`);
			block[k][id] = part[k][id];
		}
	}
	block.events.push(...(part.events || []));
	block.milestones.push(...(part.milestones || []));
	block.radio.push(...(part.radio || []));
	for (const loc in part.extraSpots || {}) (extraSpots[loc] ||= []).push(...part.extraSpots[loc]);
	// Parches a lugares del B1: se acumulan (varios tramos pueden tocar el mismo lugar)
	for (const loc in part.patches || {}) {
		const p = part.patches[loc], acc = (block.patches[loc] ||= {});
		for (const k in p) {
			if (k === 'route') {
				const r = (acc.route ||= {});
				for (const kk in p.route) {
					if (kk === 'tramos') { r.tramos ||= {}; for (const n in p.route.tramos) r.tramos[n] = (r.tramos[n] || []).concat(p.route.tramos[n]); }
					else if (kk === 'encounters') { r.encounters ||= {}; for (const t in p.route.encounters) r.encounters[t] = (r.encounters[t] || []).concat(p.route.encounters[t]); }
					else r[kk] = p.route[kk];
				}
			} else if (Array.isArray(p[k])) acc[k] = (acc[k] || []).concat(p[k]);
			else acc[k] = p[k];
		}
	}
}
for (const loc in extraSpots) {
	if (block.locations[loc]) block.locations[loc].spots = (block.locations[loc].spots || []).concat(extraSpots[loc]);
	else console.warn('[b05] extraSpots para lugar inexistente: ' + loc);
}
export default block;
