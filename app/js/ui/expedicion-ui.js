// Expediciones (Más › Expediciones). Lógica en ../expedicion.js.
import { C } from '../content.js';
import { G, saveGame } from '../state.js';
import { D, typeName, itemName } from '../data.js';
import { displayName } from '../pokemon.js';
import { monImg, itemImg } from '../art.js';
import { h, choose, toast, openSheet } from './core.js';
import { MAX, DURATIONS, expState, destinations, candidates, sendExpedition, remaining, isBack, collectExpedition, readyCount } from '../expedicion.js';

const hm = ms => { const m = Math.ceil(ms / 60e3); return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60 ? (m % 60) + ' min' : ''}`.trim() : `${m} min`; };
const section = t => h('div', { class: 'section-title' }, t);
const regionName = r => C.regions[r]?.name || r || '';

export function openExpeditions() {
	const sheet = openSheet('Expediciones', null, { onClose: () => { clearInterval(timer); saveGame(); } });
	sheet.el.dataset.menu = 'expediciones';
	let busy = false;
	const act = async fn => { if (busy) return; busy = true; try { await fn(); } finally { busy = false; if (sheet.el.isConnected) draw(); } };
	const showResult = async r => {
		const its = Object.entries(r.items);
		await choose(`**${displayName(r.mon)}** vuelve de ${C.locations[r.loc]?.name || 'la ruta'}.\n\n${r.log.map(x => '· ' + x).join('\n')}\n\n` +
			(its.length ? 'Trae: ' + its.map(([k, n]) => `**${itemName(k)}**${n > 1 ? ' ×' + n : ''}`).join(', ') + '.' : 'No trae nada esta vez.') +
			(r.special ? `\n✨ ¡Y algo especial: **${itemName(r.special)}**!` : '') +
			`\n${r.lvUp ? `Ha subido al Nv. ${r.mon.lv}. ` : ''}Vuelve al PC (Caja ${r.box + 1}).`, ['¡Bien hecho!']);
	};
	const draw = () => {
		const st = expState(), dests = destinations();
		const body = [h('div', { class: 'note' }, `Manda Pokémon del PC a explorar rutas que ya conoces. Vuelven en 4, 8 o 12 horas reales con objetos de los puntos de recolección de esa ruta, una bitácora y algo de amistad y experiencia. Hasta ${MAX} a la vez. No traen dinero.`)];
		if (!dests.length) { body.push(h('div', { class: 'empty' }, 'Aún no conoces rutas con puntos de recolección. Explora un poco y vuelve.')); sheet.set(body); return; }
		body.push(section(`De expedición · ${st.active.length}/${MAX}`));
		if (!st.active.length) body.push(h('div', { class: 'empty' }, 'Nadie está fuera ahora mismo.'));
		else body.push(h('div', { class: 'list' }, ...st.active.map((e, i) => {
			const back = isBack(e), L = C.locations[e.loc];
			const pct = Math.min(100, (1 - remaining(e) / (e.hours * 3600e3)) * 100);
			return h('div', { class: 'row exp-row' + (back ? ' hl' : '') },
				h('div', { class: 'ico tut-mon' }, monImg(e.mon.sp, { anim: false, shiny: e.mon.shiny })),
				h('div', { class: 'lbl' },
					h('div', { class: 't' }, `${displayName(e.mon)} · Nv. ${e.mon.lv}`),
					h('div', { class: 's' }, `${L?.name || e.loc} · ${regionName(L?.region)} · ${e.hours} h`),
					h('div', { class: 'neg-store' }, h('i', { style: { width: pct + '%' } })),
					h('div', { class: 's' }, back ? '✨ ¡Ya volvió!' : `Vuelve en ${hm(remaining(e))}`)),
				back ? h('button', { class: 'btn gold', onclick: () => act(async () => { const r = collectExpedition(i); if (r) { await saveGame(); await showResult(r); } }) }, 'Recibir') : null);
		})));
		if (st.active.length < MAX) body.push(h('div', { class: 'pad' }, h('button', { class: 'btn primary', style: { width: '100%' }, onclick: () => act(sendFlow) }, '🧭 Mandar a alguien')));
		if (st.log.length) {
			body.push(section('Últimas bitácoras'));
			body.push(h('div', { class: 'neg-log' }, ...st.log.slice(0, 6).map(l => h('div', {}, h('span', {}, new Date(l.t).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })), ' ', `${l.name} · ${C.locations[l.loc]?.name || ''}: ${l.log[0]}`))));
		}
		const y = sheet.body.scrollTop; sheet.set(body); sheet.body.scrollTop = y;
	};
	const sendFlow = async () => {
		const cands = candidates();
		if (!cands.length) { toast('No tienes Pokémon en el PC. Solo pueden ir los del PC.'); return; }
		const dests = destinations();
		const regs = [...new Set(dests.map(d => d.region))];
		let list = dests;
		if (regs.length > 1) {
			const r = await choose('¿En qué región?', [...regs.map(regionName), 'Cancelar'], { cancel: regs.length });
			if (r < 0 || r >= regs.length) return;
			list = dests.filter(d => d.region === regs[r]);
		}
		const di = await choose('¿Adónde?', [...list.map(d => `${d.name} · ${d.gathers.map(g => C.gather[g]?.icon || '•').join('')}`), 'Cancelar'], { cancel: list.length });
		if (di < 0 || di >= list.length) return;
		const dest = list[di];
		const p = await pickMon(cands);
		if (!p) return;
		const hi = await choose(`¿Cuánto tiempo? Cuanto más, más trae (y más probable algo especial).`, [...DURATIONS.map(x => `${x} horas`), 'Cancelar'], { cancel: DURATIONS.length });
		if (hi < 0 || hi >= DURATIONS.length) return;
		const r = sendExpedition(p.uid, dest.id, DURATIONS[hi]);
		if (!r.ok) { toast(r.msg); return; }
		toast(`🧭 ${displayName(p)} sale hacia ${dest.name}`);
		await saveGame();
	};
	const pickMon = cands => new Promise(resolve => {
		let done = false;
		const ps = openSheet('¿Quién va?', null, { onClose: () => { if (!done) resolve(null); } });
		ps.el.dataset.menu = 'expediciones';
		ps.set([h('div', { class: 'note' }, 'Solo Pokémon del PC. Mientras estén fuera, no estarán en su caja.'),
			h('div', { class: 'list' }, ...cands.sort((a, b) => b.p.lv - a.p.lv).map(c => h('button', { class: 'row', onclick: () => { done = true; ps.close(); resolve(c.p); } },
				h('div', { class: 'ico tut-mon' }, monImg(c.p.sp, { anim: false, shiny: c.p.shiny })),
				h('div', { class: 'lbl' }, h('div', { class: 't' }, `${displayName(c.p)} · Nv. ${c.p.lv}`), h('div', { class: 's' }, `Caja ${c.box + 1} · ${(D.species[c.p.sp]?.types || []).map(typeName).join(' / ')}`)))))]);
	});
	draw();
	const timer = setInterval(() => { if (!sheet.el.isConnected) { clearInterval(timer); return; } if (!busy) draw(); }, 30e3);
	return sheet;
}
export { readyCount };
