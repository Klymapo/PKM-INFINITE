// Casos de detective: pantalla del caso (registrar, interrogar, libreta y acusar) y Más › Casos. Lógica en ../casos.js.
import { C } from '../content.js';
import { G, saveGame } from '../state.js';
import { itemName } from '../data.js';
import { tx } from '../guion.js';
import { h, fmtText, openSheet, portraitFor, confirm } from './core.js';
import * as K from '../casos.js';

const npc = id => (id === 'jugador' ? { id: 'jugador', name: G.player.name } : C.npcs[id] ? { ...C.npcs[id], id } : { name: id });
const STATUS = { abierto: '🔎 Abierto', resuelto: '✔ Resuelto', fallido: '💨 Se escapó', nuevo: '' };

/** Una línea del caso: texto suelto (de `who`) o { who, t }. who = null → narración. */
function lineEl(l, who) {
	const w = typeof l === 'string' ? who : l.who;
	const t = typeof l === 'string' ? l : l.t;
	if (!w) return h('div', { class: 'cs-line narr', html: fmtText(tx(t)) });
	const n = npc(w);
	return h('div', { class: 'cs-line' }, h('div', { class: 'cs-por' }, portraitFor(n)), h('div', {}, h('b', {}, n.name), h('div', { html: fmtText(tx(t)) })));
}

/** Abre el caso. Resuelve con { result } ('resuelto' | 'fallido') o { quit: true } si lo dejas para luego. */
export function playCase(id) {
	const def = K.caseDef(id);
	const partner = def.partner || 'quintana';
	return new Promise(resolve => {
		K.open(id);
		let tab = 'sitios', log = [];
		const box = h('div', { class: 'cs-body' });
		const ov = h('div', { class: 'overlay ft-ov', role: 'dialog', 'aria-label': tx(def.name) }, h('div', { class: 'ft-box cs-box' }, box));
		document.body.append(ov);
		const close = r => { ov.remove(); resolve(r); };
		const gotLines = got => got.flatMap(k => { const c = def.clues[k]; return [{ who: null, t: `📒 **Pista nueva:** ${c.name}` }].concat(c.partner ? [{ who: partner, t: c.partner }] : []); });
		const draw = () => {
			const st = K.caseState(id);
			const tabs = h('div', { class: 'tabs cs-tabs' }, ...[['sitios', '🔎 Registrar'], ['gente', '🗣️ Preguntar'], ['libreta', `📒 Libreta ${Object.keys(st.clues).length}`], ['acusar', '⚖️ Acusar']].map(([k, n]) => h('button', { class: tab === k ? 'on' : '', onclick: () => { tab = k; log = []; draw(); } }, n)));
			const out = [h('div', { class: 'ft-title' }, '🕵️ ' + tx(def.name)), tabs];
			if (log.length) out.push(h('div', { class: 'cs-log' }, ...log.map(x => lineEl(x.l, x.who))));
			if (tab === 'sitios') {
				if (!log.length) out.push(h('div', { class: 'note', html: fmtText(tx(def.brief)) }));
				out.push(h('div', { class: 'list' }, ...K.places(id).map(p => h('button', { class: 'row' + (p.done ? ' cs-done' : ''), onclick: () => {
					const r = K.search(id, p.id);
					log = [].concat(p.text || []).map(l => ({ l, who: null }));
					if (!r.got.length && p.done) log.push({ l: { who: partner, t: def.again || 'Aquí ya lo hemos mirado todo. Si seguimos, lo vamos a gastar.' } });
					log.push(...gotLines(r.got).map(l => ({ l })));
					saveGame(); draw();
				} }, h('div', { class: 'ico' }, p.icon || '🔎'), h('div', { class: 'lbl' }, h('div', { class: 't' }, tx(p.label)), h('div', { class: 's' }, p.done ? 'Ya registrado' : tx(p.sub || '')))))));
			} else if (tab === 'gente') {
				for (const [sid, s] of Object.entries(def.suspects)) {
					const n = npc(s.npc);
					const qs = K.questions(id, sid);
					out.push(h('div', { class: 'cs-sus' },
						h('div', { class: 'cs-por big' }, portraitFor(n)),
						h('div', {}, h('b', {}, s.name || n.name), h('div', { class: 's' }, tx(s.role || '')))));
					out.push(h('div', { class: 'list' },
						...qs.map(q => h('button', { class: 'row' + (q.done ? ' cs-done' : ''), onclick: () => {
							const r = K.ask(id, sid, q.id);
							log = [{ l: { who: 'jugador', t: q.q } }, ...[].concat(q.a).map(l => ({ l, who: s.npc })), ...gotLines(r.got).map(l => ({ l }))];
							saveGame(); draw(); box.scrollTop = 0;
						} }, h('div', { class: 'ico' }, q.done ? '✔' : '❓'), h('div', { class: 'lbl' }, h('div', { class: 't' }, tx(q.q))))),
						Object.keys(st.clues).length ? h('button', { class: 'row', onclick: () => presentPick(sid) }, h('div', { class: 'ico' }, '📒'), h('div', { class: 'lbl' }, h('div', { class: 't' }, 'Enseñarle una pista'))) : null));
				}
			} else if (tab === 'libreta') {
				const nb = K.notebook(id);
				out.push(h('div', { class: 'note', html: fmtText(tx(def.brief)) }));
				if (!nb.length) out.push(h('div', { class: 'empty' }, 'La libreta está en blanco. Registra sitios y pregunta.'));
				out.push(h('div', { class: 'list' }, ...nb.map(c => h('div', { class: 'row' }, h('div', { class: 'ico' }, c.icon || '📌'), h('div', { class: 'lbl' }, h('div', { class: 't' }, tx(c.name)), h('div', { class: 's', html: fmtText(tx(c.text)) }))))));
			} else {
				out.push(h('div', { class: 'note' }, 'Elige a quién acusas y qué pista de la libreta lo demuestra. Si te equivocas, Quintana te lo dirá; si te equivocas dos veces, el culpable se escapa.'));
				out.push(h('div', { class: 'list' }, ...Object.entries(def.suspects).map(([sid, s]) => h('button', { class: 'row', onclick: () => accusePick(sid) },
					h('div', { class: 'ico cs-por' }, portraitFor(npc(s.npc))), h('div', { class: 'lbl' }, h('div', { class: 't' }, 'Acusar a ' + (s.name || npc(s.npc).name)), h('div', { class: 's' }, tx(s.role || '')))))));
				if (st.strikes) out.push(h('div', { class: 'note neg-alert' }, `Te has equivocado ${st.strikes === 1 ? 'una vez' : st.strikes + ' veces'}. Un error más y se escapa.`));
			}
			out.push(h('div', { class: 'ft-btns' }, h('button', { class: 'btn', onclick: async () => { await saveGame(); close({ quit: true }); } }, 'Dejarlo para luego')));
			box.replaceChildren(...out);
		};
		// Elegir una pista (para enseñar o para acusar)
		const pickClue = (title, onPick) => {
			const nb = K.notebook(id);
			const p = h('div', { class: 'overlay ft-ov dim' }, h('div', { class: 'ft-box cs-box' }, h('div', { class: 'ft-title' }, title),
				h('div', { class: 'list' }, ...nb.map(c => h('button', { class: 'row', onclick: () => { p.remove(); onPick(c.id); } }, h('div', { class: 'ico' }, c.icon || '📌'), h('div', { class: 'lbl' }, h('div', { class: 't' }, tx(c.name)), h('div', { class: 's', html: fmtText(tx(c.text)) }))))),
				h('div', { class: 'ft-btns' }, h('button', { class: 'btn', onclick: () => p.remove() }, 'Cancelar'))));
			document.body.append(p);
		};
		const presentPick = sid => pickClue('¿Qué pista le enseñas?', k => {
			const s = def.suspects[sid];
			const r = K.present(id, sid, k);
			log = [{ l: { who: 'jugador', t: `*(Le enseñas: ${tx(def.clues[k].name)})*` } }, ...[].concat(r.a).map(l => ({ l, who: s.npc })), ...gotLines(r.got).map(l => ({ l }))];
			saveGame(); draw(); box.scrollTop = 0;
		});
		const accusePick = async sid => {
			const pend = K.pending(id);
			if (pend.total && !(await confirm(tx(def.hurry || 'Aún nos quedan cosas por mirar y preguntas sin hacer. ¿Seguro que ya lo tienes?'), 'Sí, acuso', 'Seguir investigando'))) return;
			if (!K.notebook(id).length) return;
			pickClue('¿Qué pista lo demuestra?', async k => {
				const r = K.accuse(id, sid, k);
				await saveGame();
				const s = def.suspects[sid];
				if (r.result === 'error') {
					tab = 'libreta';
					log = [{ l: { who: 'jugador', t: `¡Fue ${s.name || npc(s.npc).name}! Y esto lo prueba: ${tx(def.clues[k].name)}.` } }, ...[].concat(def.objection?.[r.reason] || []).map(l => ({ l, who: partner }))];
					draw(); box.scrollTop = 0;
					return;
				}
				finish(r, sid, k);
			});
		};
		const finish = (r, sid, k) => {
			const s = def.suspects[sid];
			const lines = [{ who: 'jugador', t: `¡Fue ${s.name || npc(s.npc).name}! Y esto lo prueba: ${tx(def.clues[k].name)}.` }];
			if (r.result === 'resuelto') lines.push(...[].concat(def.solution || []));
			else lines.push(...[].concat(def.objection?.[r.reason] || []).map(t => typeof t === 'string' ? { who: partner, t } : t), ...[].concat(def.escape || []));
			const prize = r.result === 'resuelto' && def.prize?.length ? `Recompensa: ${def.prize.map(p => `**${itemName(p.id)}**${(p.n || 1) > 1 ? ' ×' + p.n : ''}`).join(', ')} · reputación de detective +${def.rep ?? 10}.` : '';
			box.replaceChildren(
				h('div', { class: 'ft-title' }, r.result === 'resuelto' ? '✔ Caso resuelto' : '💨 Se escapó'),
				h('div', { class: 'cs-log' }, ...lines.map(l => lineEl(l, partner))),
				prize ? h('div', { class: 'note', html: fmtText(prize) }) : h('div', { class: 'note' }, 'Queda en el expediente de Quintana. El mundo sigue: habrá otros casos.'),
				h('div', { class: 'ft-btns' }, h('button', { class: 'btn primary', onclick: () => close(r) }, 'Cerrar el expediente')));
		};
		const st = K.caseState(id);
		if (st.status === 'resuelto' || st.status === 'fallido') { tab = 'libreta'; }
		draw();
	});
}

/** Más › Casos: expediente de casos abiertos y cerrados. */
export function openCases() {
	const sheet = openSheet('Casos', null);
	sheet.el.dataset.menu = 'casos';
	const cs = K.casesState();
	const ids = K.caseList();
	const body = [h('div', { class: 'note' }, `Reputación de detective: ${cs.rep}. Resueltos: ${ids.filter(i => cs.c[i].status === 'resuelto').length} · se escaparon: ${ids.filter(i => cs.c[i].status === 'fallido').length}.`)];
	if (!ids.length) body.push(h('div', { class: 'empty' }, 'Aún no tienes casos.'));
	body.push(h('div', { class: 'list' }, ...ids.map(id => {
		const d = K.caseDef(id), st = cs.c[id];
		return h('div', { class: 'row' }, h('div', { class: 'ico' }, st.status === 'resuelto' ? '✔' : st.status === 'fallido' ? '💨' : '🔎'),
			h('div', { class: 'lbl' }, h('div', { class: 't' }, tx(d.name)), h('div', { class: 's' }, `${STATUS[st.status]} · ${C.locations[d.loc]?.name || ''} · ${Object.keys(st.clues).length} pistas` + (st.status === 'abierto' ? ' · sigue en el lugar del caso' : ''))));
	})));
	sheet.set(body);
	return sheet;
}
