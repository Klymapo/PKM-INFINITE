// Bloque 6 · Acto V: La voz del narrador. Une las partes del bloque.
// Al añadir un tramo nuevo, impórtalo aquí y añádelo a `parts`.
// Arranca tras flag.b05_fin (enganche `b06_inicio` en comun.js) y termina con flag.b06_fin.
// Aviso de ritmo: b06_m_aviso (primera entrada a tejados_porcelana, T5).
import npcs from './npcs.js';
import comun from './comun.js';
import misiones from './misiones.js';
import t0 from './t0-porcelana.js';
import t1 from './t1-mayolica.js';
import t2 from './t2-chamota.js';
import t3 from './t3-antano.js';
import t4 from './t4-fayenza.js';
import t5 from './t5-dragospiral.js';
import museo from './t6-museo.js';
import ecos from './t7-ecos.js';
import encargos from './t8-encargos.js';
import botica from './t9-botica.js';
import serafina from './t10-serafina.js';
import fotos from './t11-fotos.js';
import carreras from './t12-carreras.js';
import rival from './t13-rival.js';
import historias from './t14-historias.js';
import red from './t15-red.js';
import cartas from './t16-cartas.js';
import casos from './t17-casos.js';

const block = {
	id: 'b06', title: 'Acto V · La voz del narrador', hours: 16, ends: 'b06_fin',
	regions: { teselia: { name: 'Teselia', h: 100, land: 'M4,30 L14,18 L30,4 L50,2 L62,10 L74,24 L90,30 L96,44 L88,54 L72,60 L64,72 L50,74 L36,84 L24,84 L12,80 L4,68 L2,50 Z M5,87 L19,86 L21,96 L7,97 Z' } },
	npcs, quests: misiones,
	locations: {}, trainers: {}, scripts: {}, challenges: {}, badges: {}, shops: {}, items: {}, events: [], milestones: [], mail: [], radio: [],
	gather: {}, patches: {}, ventures: {},
};
const parts = [comun, t0, t1, t2, t3, t4, t5, museo, ecos, encargos, botica, serafina, fotos, carreras, rival, historias, red, cartas, casos];
const extraSpots = {};
for (const part of parts) {
	for (const k of ['locations', 'trainers', 'scripts', 'challenges', 'badges', 'shops', 'items', 'quests', 'npcs', 'gather', 'ventures']) {
		for (const id in part[k] || {}) {
			// un negocio de este mismo bloque se puede ampliar desde otra parte (p. ej. sinergias): se suman las listas
			if (k === 'ventures' && block[k][id]) { const cur = block[k][id] = { ...block[k][id] }; for (const kk in part[k][id]) cur[kk] = Array.isArray(cur[kk]) && Array.isArray(part[k][id][kk]) ? cur[kk].concat(part[k][id][kk]) : part[k][id][kk]; continue; }
			if (block[k][id] && k !== 'npcs') console.warn(`[b06] ${k} duplicado: ${id}`);
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
	else console.warn('[b06] extraSpots para lugar inexistente: ' + loc);
}
export default block;
