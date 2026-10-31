// Bloque 7 · Acto VI: Ego (Galar). Une las partes del bloque.
// Al añadir un tramo nuevo, impórtalo aquí y añádelo a `parts`.
// Arranca tras flag.b06_fin (enganche `b07_inicio` en comun.js) y termina con flag.b07_fin.
// Aviso de ritmo: b07_m_aviso (primera entrada en Ciudad Artejo, T5).
// NO está en BLOCKS (app/content/index.js). Para validarlo: INFINITO_EXTRA=b07 node herramientas/validar.mjs
import npcs from './npcs.js';
import comun from './comun.js';
import misiones from './misiones.js';
import t0 from './t0-par.js';
import t1 from './t1-piston.js';
import t2 from './t2-casa.js';
import t3 from './t3-hoyuelo.js';
import t4 from './t4-crampon.js';
import t5 from './t5-artejo.js';
import museo from './t6-museo.js';

const block = {
	id: 'b07', title: 'Acto VI · Ego', hours: 15, ends: 'b07_fin',
	regions: { galar: { name: 'Galar', h: 140, land: 'M40,136 L56,136 L64,128 L70,116 L76,104 L72,94 L80,86 L88,76 L94,62 L96,46 L90,34 L82,22 L70,12 L58,6 L48,8 L40,16 L30,26 L20,36 L8,46 L4,58 L10,66 L22,72 L18,82 L28,90 L34,100 L36,112 L34,124 Z' } },
	npcs, quests: misiones,
	locations: {}, trainers: {}, scripts: {}, challenges: {}, badges: {}, shops: {}, items: {}, events: [], milestones: [], mail: [], radio: [],
	gather: {}, patches: {}, ventures: {},
};
const parts = [comun, t0, t1, t2, t3, t4, t5, museo];
const extraSpots = {};
for (const part of parts) {
	for (const k of ['locations', 'trainers', 'scripts', 'challenges', 'badges', 'shops', 'items', 'quests', 'npcs', 'gather', 'ventures']) {
		for (const id in part[k] || {}) {
			// un negocio de este mismo bloque se puede ampliar desde otra parte (p. ej. T3 pone el `loc` o más imprevistos): se suman las listas
			if (k === 'ventures' && block[k][id]) { const cur = block[k][id] = { ...block[k][id] }; for (const kk in part[k][id]) cur[kk] = Array.isArray(cur[kk]) && Array.isArray(part[k][id][kk]) ? cur[kk].concat(part[k][id][kk]) : part[k][id][kk]; continue; }
			// un reto de comun.js se puede completar desde su tramo (p. ej. `info` extra): se mezclan los campos
			if (k === 'challenges' && block[k][id]) { block[k][id] = { ...block[k][id], ...part[k][id] }; continue; }
			if (block[k][id] && k !== 'npcs') console.warn(`[b07] ${k} duplicado: ${id}`);
			block[k][id] = part[k][id];
		}
	}
	block.events.push(...(part.events || []));
	block.milestones.push(...(part.milestones || []));
	block.mail.push(...(part.mail || []));
	block.radio.push(...(part.radio || []));
	Object.assign((block.photos ||= {}), part.photos || {});
	Object.assign((block.races ||= {}), part.races || {});
	Object.assign((block.cardPlayers ||= {}), part.cardPlayers || {});
	Object.assign((block.cases ||= {}), part.cases || {});
	Object.assign((block.serials ||= {}), part.serials || {});
	(block.pedidos ||= []).push(...(part.pedidos || []));
	(block.sharedEvents ||= []).push(...(part.sharedEvents || []));
	for (const loc in part.extraSpots || {}) (extraSpots[loc] ||= []).push(...part.extraSpots[loc]);
	// Parches a lugares de bloques anteriores: se acumulan (varios tramos pueden tocar el mismo lugar)
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
// extraSpots: spots que una parte añade a lugares de OTRA parte de este mismo bloque (p. ej., los vuelos de comun.js)
for (const loc in extraSpots) {
	if (block.locations[loc]) block.locations[loc].spots = (block.locations[loc].spots || []).concat(extraSpots[loc]);
	else console.warn('[b07] extraSpots para lugar inexistente (¿tramo sin escribir?): ' + loc);
}
// Referencias de comun.js y misiones.js a lugares y entrenadores que crean los tramos. Mientras el tramo no existe,
// se quitan con un aviso para que el bloque valide; en cuanto existe, se quedan. Solo mira lugares y entrenadores
// del propio B7: nada de este bloque apunta a lugares de bloques anteriores desde aquí.
for (const q of Object.values(block.quests)) for (const it of q.parts?.items || []) {
	if (it.where && !block.locations[it.where]) { console.warn(`[b07] parts.where pendiente (${q.name} · ${it.label}): ${it.where}`); delete it.where; delete it.tramo; }
}
for (const [id, c] of Object.entries(block.challenges)) if (c.trainer && !block.trainers[c.trainer]) { console.warn(`[b07] reto ${id}: entrenador pendiente ${c.trainer}`); block.challenges[id] = { ...c }; delete block.challenges[id].trainer; }
for (const [id, v] of Object.entries(block.ventures)) if (id.startsWith('b07_') && v.loc && !block.locations[v.loc]) { console.warn(`[b07] negocio ${id}: lugar pendiente ${v.loc}`); block.ventures[id] = { ...v }; delete block.ventures[id].loc; }
export default block;
