// Gestor de movimientos (pedido de Mario, 2026-10-28).
// · Arriba, los 4 movimientos como tarjetas de su tipo. Tocas uno para elegirlo; tocas otro y se intercambian.
// · Con uno elegido: olvidarlo. Con un candidato elegido: tocas el movimiento que reemplaza.
// · Candidatos: recordar (por nivel, también de preevoluciones), MT que tienes y próximos por nivel.
// · Cobertura: contra qué tipos pega súper eficaz el set, y qué ganas o pierdes con cada cambio.
// Recordar y las MT siguen siendo gratis e ilimitados (las MT no se gastan).
import { D, typeStyle, typeName, effectiveness } from '../data.js';
import { G, saveGame } from '../state.js';
import { displayName, canLearn, maxPP } from '../pokemon.js';
import { recallable, upcoming, ownedTMs } from '../movimientos.js';
import { h, choose, openSheet, toast } from './core.js';

const catName = c => c === 'Physical' ? 'Físico' : c === 'Special' ? 'Especial' : 'Estado';
const mvName = id => D.moves[id]?.name || id;
const lvText = lv => lv === 0 ? 'Al evolucionar' : lv <= 1 ? 'Desde el principio' : `Nv. ${lv}`;

/** Tipos defensivos reales (sin Astral ni comodines). */
const ALL_TYPES = () => Object.keys(D.types).filter(t => t !== 'Stellar' && D.types[t]?.name);

/** Tipos contra los que una lista de movimientos pega súper eficaz (solo movimientos de daño). */
export function coverage(ids) {
	const out = new Set();
	for (const id of ids) {
		const md = D.moves[id];
		if (!md || md.cat === 'Status' || !md.bp) continue;
		for (const t of ALL_TYPES()) if (effectiveness(md.type, [t]) > 1) out.add(t);
	}
	return out;
}

const chips = (types, cls = '') => types.map(t => h('span', { class: 'type ' + cls, style: typeStyle(t) }, typeName(t)));

export function openMoveManager(p, onChange = null) {
	const sheet = openSheet('Movimientos · ' + displayName(p), null, { onClose: () => onChange?.() });
	let sel = null;      // índice del movimiento elegido arriba
	let pick = null;     // id del candidato elegido abajo
	let tab = 'rec';
	const myTypes = D.species[p.sp]?.types || [];
	const stab = id => { const md = D.moves[id]; return md && md.cat !== 'Status' && md.bp && myTypes.includes(md.type); };

	const commit = async msg => { if (msg) toast(msg); sel = null; pick = null; await saveGame(); onChange?.(); draw(); };

	const tapSlot = async i => {
		if (pick) {
			const old = mvName(p.moves[i].id), md = D.moves[pick];
			p.moves[i] = { id: pick, pp: md.pp, ppUps: 0 };
			return commit(`Olvidó ${old} y aprendió ${md.name}`);
		}
		if (sel === null) { sel = i; return draw(); }
		if (sel === i) { sel = null; return draw(); }
		const a = p.moves[sel]; p.moves[sel] = p.moves[i]; p.moves[i] = a;
		return commit(`${mvName(p.moves[i].id)} ⇄ ${mvName(p.moves[sel].id)}`);
	};

	const forget = async () => {
		if (sel === null || p.moves.length <= 1) return;
		const m = p.moves[sel];
		const k = await choose(`¿${displayName(p)} olvida **${mvName(m.id)}**? Si lo aprendió por nivel o con una MT que tienes, podrás recuperarlo aquí.`, ['Sí, olvidarlo', 'No']);
		if (k !== 0) return;
		p.moves.splice(sel, 1);
		return commit(`${displayName(p)} olvidó ${mvName(m.id)}`);
	};

	const learnFree = () => {
		const md = D.moves[pick];
		p.moves.push({ id: pick, pp: md.pp, ppUps: 0 });
		return commit(`${displayName(p)} aprendió ${md.name}`);
	};

	/** Aviso de cobertura si el candidato reemplaza el movimiento i: tipos que gana y que pierde. */
	const delta = i => {
		const now = coverage(p.moves.map(m => m.id));
		const after = coverage(p.moves.map((m, j) => j === i ? pick : m.id));
		const gain = [...after].filter(t => !now.has(t)), lose = [...now].filter(t => !after.has(t));
		if (!gain.length && !lose.length) return h('span', { class: 'gm-delta same' }, 'Cobertura igual');
		return h('span', { class: 'gm-delta' },
			gain.length ? h('span', { class: 'gain' }, '+ ' + gain.map(typeName).join(', ')) : null,
			lose.length ? h('span', { class: 'lose' }, '− ' + lose.map(typeName).join(', ')) : null);
	};

	const tile = (id, { sub, onclick, cls = '', extra } = {}) => {
		const md = D.moves[id] || {};
		return h(onclick ? 'button' : 'div', { class: 'qm-move gm-move ' + cls, style: typeStyle(md.type), onclick },
			h('span', { class: 'qm-n' }, stab(id) ? '★ ' : '', md.name || id),
			h('span', { class: 'qm-m' }, h('span', {}, `${typeName(md.type)} · ${catName(md.cat)}${md.bp ? ' · ' + md.bp : ''}`), sub ? h('span', {}, sub) : null),
			extra || null);
	};

	const draw = () => {
		const cov = coverage(p.moves.map(m => m.id));
		const total = ALL_TYPES().length;
		const slots = p.moves.map((m, i) => tile(m.id, {
			sub: `PP ${m.pp}/${maxPP(m)}`,
			cls: (sel === i ? 'gm-sel' : '') + (m.pp <= 0 ? ' empty' : ''),
			onclick: () => tapSlot(i),
			extra: pick ? delta(i) : null,
		}));

		let bar = null;
		if (pick) {
			bar = h('div', { class: 'gm-bar' },
				h('div', { class: 'gm-hint' }, `Toca el movimiento que **${mvName(pick)}** va a reemplazar.`.replace(/\*\*/g, '')),
				h('div', { class: 'gm-btns' },
					p.moves.length < 4 ? h('button', { class: 'btn primary', onclick: learnFree }, 'Aprenderlo en el hueco libre') : null,
					h('button', { class: 'btn', onclick: () => { pick = null; draw(); } }, 'Cancelar')));
		} else if (sel !== null) {
			bar = h('div', { class: 'gm-bar' },
				h('div', { class: 'gm-hint' }, `Toca otro movimiento para intercambiarlo con ${mvName(p.moves[sel].id)}.`),
				h('div', { class: 'gm-btns' },
					p.moves.length > 1 ? h('button', { class: 'btn', onclick: forget }, 'Olvidar') : null,
					h('button', { class: 'btn', onclick: () => { sel = null; draw(); } }, 'Cancelar')));
		} else {
			bar = h('div', { class: 'gm-hint' }, 'Toca un movimiento para elegirlo. Toca dos para intercambiarlos.');
		}

		const tms = ownedTMs();
		const rec = recallable(p);
		const tmMoves = Object.keys(tms).filter(m => D.moves[m] && !p.moves.some(x => x.id === m) && canLearn(p.sp, m)).sort((a, b) => mvName(a).localeCompare(mvName(b)));
		const next = upcoming(p);
		const tabs = h('div', { class: 'tabs' }, ...[['rec', 'Recordar', rec.length], ['mt', 'MT', tmMoves.length], ['next', 'Próximos', next.length]].map(([k, n, c]) =>
			h('button', { class: tab === k ? 'on' : '', onclick: () => { tab = k; draw(); } }, n, h('span', { class: 'tabcount' }, String(c)))));
		const candTile = (id, sub) => tile(id, { sub, cls: pick === id ? 'gm-sel' : '', onclick: () => { pick = pick === id ? null : id; sel = null; draw(); sheet.body.scrollTop = 0; } });
		let list;
		if (tab === 'rec') list = rec.length ? rec.map(r => candTile(r.id, lvText(r.lv) + (r.from ? ` · como ${D.species[r.from]?.name || r.from}` : ''))) : null;
		else if (tab === 'mt') list = tmMoves.length ? tmMoves.map(m => candTile(m, D.items[tms[m]]?.name || 'MT')) : null;
		else list = next.length ? next.map(n => tile(n.id, { sub: `Nv. ${n.lv}`, cls: 'gm-later' })) : null;
		const empty = { rec: 'No hay movimientos que recordar ahora mismo.', mt: 'Ninguna de tus MT le sirve ahora mismo.', next: 'Ya no aprende nada más por nivel.' }[tab];

		sheet.set([
			h('div', { class: 'gm-head' }, h('b', {}, `${displayName(p)} · Nv. ${p.lv}`), h('span', { class: 'typechip-row' }, ...chips(myTypes))),
			h('div', { class: 'qm-grid gm-slots' }, ...slots),
			bar,
			h('div', { class: 'gm-cov' },
				h('div', { class: 'gm-covt' }, `Súper eficaz contra ${cov.size} de ${total} tipos`),
				cov.size ? h('div', { class: 'typechip-row gm-covl' }, ...chips(ALL_TYPES().filter(t => cov.has(t)), 'gm-chip')) : h('div', { class: 'gm-hint' }, 'Ningún ataque de daño pega súper eficaz todavía.')),
			h('div', { class: 'section-title' }, 'Candidatos'),
			tabs,
			list ? h('div', { class: 'qm-grid gm-cands' }, ...list) : h('div', { class: 'empty' }, empty),
			h('div', { class: 'note' }, '★ = de su mismo tipo (pega más fuerte). Recordar y usar tus MT es gratis y no tiene límite.'),
		]);
	};
	draw();
	return sheet;
}
