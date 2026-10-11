// Añade aquí cada misión de ChatGPT ya revisada (una línea de import y su nombre en PARTES).
import aviso from './cg-aviso.js';
import puente from './cg-puente.js';
import indice from './cg-indice.js';
const PARTES = [aviso, puente, indice];

const out = { npcs: {}, items: {}, quests: {}, scripts: {}, trainers: {}, gather: {}, shops: {}, patches: {}, events: [], milestones: [] };
for (const p of PARTES) {
	for (const k of ['npcs', 'items', 'quests', 'scripts', 'trainers', 'gather', 'shops']) Object.assign(out[k], p[k] || {});
	out.events.push(...(p.events || []));
	for (const loc in p.patches || {}) {
		const src = p.patches[loc], acc = (out.patches[loc] ||= {});
		if (src.spots) acc.spots = (acc.spots || []).concat(src.spots);
		if (src.route?.tramos) { const t = ((acc.route ||= {}).tramos ||= {}); for (const n in src.route.tramos) t[n] = (t[n] || []).concat(src.route.tramos[n]); }
	}
}
export default out;
