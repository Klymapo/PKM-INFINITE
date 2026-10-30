// Carreras de monturas: pantalla. Lógica en ../carreras.js.
import { C } from '../content.js';
import { G, saveGame } from '../state.js';
import { itemName } from '../data.js';
import { tx } from '../guion.js';
import { monImg, sceneCanvas } from '../art.js';
import { h, fmtText } from './core.js';
import * as CR from '../carreras.js';

const npcName = id => C.npcs[id]?.name || id;
const ORD = ['1.º', '2.º', '3.º', '4.º'];
const speedTag = f => f >= 1.15 ? '⚡ muy rápido' : f >= 1.04 ? '↗ rápido' : f <= 0.8 ? '🐢 muy lento' : f <= 0.94 ? '↘ lento' : 'normal';

/** Salto: un marcador barre la barra; tocar cerca del centro = mejor salto. Resuelve con q (0–3). */
function jumpGame(box, label) {
	return new Promise(resolve => {
		const mark = h('i', { class: 'cr-mark' });
		const bar = h('div', { class: 'cr-bar', 'data-noswipe': '' }, h('b', { class: 'cr-z1' }), h('b', { class: 'cr-z2' }), h('b', { class: 'cr-z3' }), mark);
		const msg = h('div', { class: 'ft-msg' }, 'Toca «¡Salta!» cuando el marcador pase por el centro dorado.');
		let pos = 0, raf = 0, done = false; const t0 = performance.now(), speed = 1.15;
		const btn = h('button', { class: 'btn primary', onclick: () => {
			if (done) return; done = true; cancelAnimationFrame(raf);
			const d = Math.abs(pos - 0.5);
			const q = d <= 0.05 ? 3 : d <= 0.13 ? 2 : d <= 0.22 ? 1 : 0;
			msg.textContent = ['¡Tropiezo! Se pierde tiempo.', 'Salto justito.', '¡Buen salto!', '¡Salto perfecto!'][q];
			setTimeout(() => resolve(q), 650);
		} }, '¡Salta!');
		box.replaceChildren(h('div', { class: 'ft-title' }, '🦘 ' + label), bar, msg, h('div', { class: 'ft-btns' }, btn));
		const loop = now => { if (done) return; const x = ((now - t0) / 1000 * speed) % 2; pos = x < 1 ? x : 2 - x; mark.style.left = (pos * 100) + '%'; raf = requestAnimationFrame(loop); };
		raf = requestAnimationFrame(loop);
	});
}

/** Corre una carrera. Resuelve con el resultado de finishRace (o { quit: true }). */
export function playRace(id) {
	const def = CR.raceDef(id);
	return new Promise(resolve => {
		const st = CR.raceState(id);
		const loc = C.locations[def.loc];
		const bg = sceneCanvas({ ...(loc?.bg || {}), seed: loc?.bg?.seed || def.loc }, { phase: 'dia' });
		const pic = h('div', { class: 'cr-pic' }, bg);
		const box = h('div', { class: 'cr-body' });
		const ov = h('div', { class: 'overlay ft-ov', role: 'dialog', 'aria-label': def.name }, h('div', { class: 'ft-box cr-box' }, h('div', { class: 'ft-title' }, (def.icon || '🏁') + ' ' + def.name), pic, box));
		document.body.append(ov);
		const close = r => { ov.remove(); resolve(r); };
		const btn = (label, onclick, cls = 'btn') => h('button', { class: cls, onclick }, label);

		// 1) Elegir montura
		const pickMount = () => {
			const ms = CR.mountsFor(id);
			box.replaceChildren(
				h('div', { class: 'note' }, tx(def.blurb || '') + (st.best !== null ? `\n🏆 Tu récord: ${CR.fmtTime(st.best)}${st.bestMount ? ' (' + CR.MOUNTS[st.bestMount].name + ')' : ''} · ${st.wins} ${st.wins === 1 ? 'victoria' : 'victorias'}` : '')),
				h('div', { class: 'section-title' }, '¿Con qué montura corres?'),
				h('div', { class: 'list' }, ...ms.map(m => h('button', { class: 'row', onclick: () => start(m.id) },
					h('div', { class: 'ico tut-mon' }, monImg(m.sp, { anim: false })),
					h('div', { class: 'lbl' }, h('div', { class: 't' }, `${m.icon} ${m.name}${m.rent ? ' · alquiler' : ''}`),
						h('div', { class: 's' }, m.note + (m.skill ? ` Atajos: ${CR.TERRAINS[m.skill].name}.` : '')))))),
				h('div', { class: 'ft-btns' }, btn('Salir', () => close({ quit: true }))));
		};
		// 2) Tramos
		const start = mount => {
			const rivals = CR.rivalRun(id, Date.now().toString(36));
			const mine = [];
			const mon = h('div', { class: 'cr-mon' }, monImg(CR.MOUNTS[mount].sp, { anim: true }));
			pic.append(mon);
			const r0 = def.rivals[Math.floor(Math.random() * def.rivals.length)];
			let quip = r0.start ? `**${npcName(r0.npc)}:** «${tx(r0.start)}»` : '';
			const tramo = i => {
				const tr = def.tramos[i];
				mon.style.left = (12 + 76 * i / def.tramos.length) + '%';
				const s = mine.length ? CR.standing(rivals, mine) : null;
				const where = s ? `Vas **${ORD[s.pos - 1]}**` + (s.ahead ? `, a ${s.ahead.gap.toFixed(1).replace('.', ',')} s de ${s.ahead.name}` : s.behind ? `, ${s.behind.gap.toFixed(1).replace('.', ',')} s por delante de ${s.behind.name}` : '') + '.' : 'Salida.';
				box.replaceChildren(
					h('div', { class: 'cr-head' }, `Tramo ${i + 1}/${def.tramos.length} · ${tr.name}`),
					h('div', { class: 'cr-text', html: fmtText(tx(tr.text) + '\n' + where + (quip ? '\n' + quip : '')) }),
					h('div', { class: 'list' }, ...tr.paths.map(p => {
						const can = CR.canTake(mount, p);
						const f = (CR.MOUNTS[mount].spd[p.terrain] || 1);
						const tag = !can ? `🔒 Solo con ${CR.SKILL_TEXT[p.need]}` : `${CR.TERRAINS[p.terrain].icon} ${CR.TERRAINS[p.terrain].name} · ${speedTag(f)}${p.need ? ' · atajo' : ''}${p.jump ? ' · 🦘 salto' : ''}`;
						return h('button', { class: 'row' + (can ? '' : ' cr-locked'), disabled: !can, onclick: async () => {
							let q = 2;
							if (p.jump) q = await jumpGame(box, tx(p.label));
							const t = +CR.pathTime(mount, p, q).toFixed(2);
							mine.push(t);
							const s2 = CR.standing(rivals, mine);
							quip = `⏱️ ${tx(p.label)}: ${t.toFixed(1).replace('.', ',')} s.`;
							// un rival comenta de vez en cuando
							const nm = s2.ahead?.name || s2.behind?.name;
							const near = def.rivals.find(r => npcName(r.npc) === nm);
							if (near && (i === 1 || i === 3)) { const line = nm === s2.ahead?.name ? near.ahead : near.behind; if (line) quip += `\n**${nm}:** «${tx(line)}»`; }
							if (i + 1 < def.tramos.length) tramo(i + 1); else finish(mount, rivals, mine);
						} }, h('div', { class: 'lbl' }, h('div', { class: 't' }, tx(p.label)), h('div', { class: 's' }, tag)));
					})));
			};
			tramo(0);
		};
		// 3) Meta
		const finish = async (mount, rivals, mine) => {
			const res = CR.finishRace(id, mount, mine, rivals);
			await saveGame();
			const rows = rivals.map(r => ({ name: r.name, t: r.total })).concat([{ name: G.player.name, t: res.total, me: true }]).sort((a, b) => a.t - b.t);
			const winner = rows[0];
			const rv = winner.me ? null : def.rivals.find(r => npcName(r.npc) === winner.name);
			const lines = [];
			if (rv?.win) lines.push(`**${winner.name}:** «${tx(rv.win)}»`);
			if (winner.me) { const second = def.rivals.find(r => npcName(r.npc) === rows[1].name); if (second?.lose) lines.push(`**${rows[1].name}:** «${tx(second.lose)}»`); }
			if (res.record) lines.push(res.prevBest === null ? `🏆 Primer tiempo en la pizarra: **${CR.fmtTime(res.total)}**.` : `🏆 ¡Récord nuevo! **${CR.fmtTime(res.total)}** (antes ${CR.fmtTime(res.prevBest)}).`);
			if (res.prizes.length) lines.push('Te llevas: ' + res.prizes.map(p => `**${itemName(p.id)}**${(p.n || 1) > 1 ? ' ×' + p.n : ''}`).join(', ') + '.');
			else if (res.pos === 1) lines.push('Hoy ya te llevaste el premio de la victoria; vuelve mañana para otro.');
			box.replaceChildren(
				h('div', { class: 'cr-head' }, res.pos === 1 ? '🏁 ¡Primer puesto!' : `🏁 Llegas ${ORD[res.pos - 1]}`),
				h('div', { class: 'cr-table' }, ...rows.map((r, i) => h('div', { class: 'cr-rowt' + (r.me ? ' me' : '') }, h('span', {}, ORD[i]), h('span', {}, r.name), h('span', {}, CR.fmtTime(r.t))))),
				h('div', { class: 'cr-text', html: fmtText(lines.join('\n')) }),
				h('div', { class: 'ft-btns' }, btn('Seguir', () => close(res), 'btn primary')));
		};
		pickMount();
	});
}
