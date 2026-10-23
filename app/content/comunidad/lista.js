// Añade aquí cada misión de ChatGPT ya revisada (una línea de import y su nombre en PARTES).
// aviso, puente e índice son los tres capítulos del arco «La red de auxilio de Kanto»; red es la misión paraguas y el cierre.
import aviso from './cg-aviso.js';
import puente from './cg-puente.js';
import indice from './cg-indice.js';
import red from './cg-red.js';
const PARTES = [aviso, puente, indice, red];

const out = { npcs: {}, items: {}, quests: {}, scripts: {}, trainers: {}, gather: {}, shops: {}, locations: {}, patches: {}, events: [], milestones: [] };
for (const p of PARTES) {
	for (const k of ['npcs', 'items', 'quests', 'scripts', 'trainers', 'gather', 'shops', 'locations']) Object.assign(out[k], p[k] || {});
	out.events.push(...(p.events || []));
	for (const loc in p.patches || {}) {
		const src = p.patches[loc], acc = (out.patches[loc] ||= {});
		if (src.spots) acc.spots = (acc.spots || []).concat(src.spots);
		if (src.onEnter) acc.onEnter = (acc.onEnter || []).concat(src.onEnter);
		if (src.route?.tramos) { const t = ((acc.route ||= {}).tramos ||= {}); for (const n in src.route.tramos) t[n] = (t[n] || []).concat(src.route.tramos[n]); }
	}
}
export default out;
