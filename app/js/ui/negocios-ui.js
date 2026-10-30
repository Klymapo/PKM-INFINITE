// Pantallas de Negocios (administración de recursos). La lógica está en ../negocios.js.
import { D, toID, typeName, typeStyle, itemName } from '../data.js';
import { C, topLoc } from '../content.js';
import { G, saveGame } from '../state.js';
import { displayName } from '../pokemon.js';
import { runScript, tx } from '../guion.js';
import { monImg, itemImg } from '../art.js';
import { h, say, choose, confirm, toast, openSheet, portraitFor } from './core.js';
import { fmtMoney, fmtText } from '../util.js';
import {
	synergiesOf,
	ventureDef, ventureState, ventureList, owned, linesOf, joinVenture, upgradesOf, managersOf, slotsOf, storeDays, sharePct,
	workerBonus, rates, pending, collect, shiftEffort, buyUpgrade, setManager, managerBusyAt, managerConflicts, resolveManagerConflict, assignWorker, recallWorker, rollEvent, eventOptions, resolveEvent, tick, collectAll, fullIn, almostFull,
	typeGuide, freeSlots, moveWorker, suggestWorkers, applySuggestion, partyMovable, favsOf,
} from '../negocios.js';

let hooks = {}; // { travel(locId), summary(p, onChange) } — los pone screens.js
export function setVentureHooks(hk) { hooks = hk; }

const npcOf = id => (id && C.npcs[id] ? { id, ...C.npcs[id] } : null);
const perDay = n => n >= 1 ? (Math.round(n * 10) / 10).toLocaleString('es-MX') + ' al día' : n > 0 ? `1 cada ${Math.max(2, Math.round(1 / n))} días` : '—';
const pctTxt = m => (m >= 1 ? '+' : '−') + Math.abs(Math.round((m - 1) * 100)) + ' %';
const hoursTxt = hrs => hrs < 1 ? 'menos de una hora' : `${Math.round(hrs)} ${Math.round(hrs) === 1 ? 'hora' : 'horas'}`;
const section = t => h('div', { class: 'section-title' }, t);

const spName = id => D.species[id]?.name || id;
const happyTxt = p => { const v = p.happy || 0; return v >= 220 ? '❤️ Te adora' : v >= 150 ? '💛 Muy a gusto' : v >= 70 ? '🙂 A gusto' : '· Recién llegad@'; };
const chips = types => h('span', { class: 'typechip-row' }, ...types.map(t => h('span', { class: 'type', style: typeStyle(t) }, typeName(t))));
/** Guía de tipos de un negocio: tipos ideales, favoritos (⭐) y qué produce. */
export function guideBox(id) {
	const g = typeGuide(id);
	return h('div', { class: 'neg-guide' },
		g.types.length ? h('div', {}, h('span', { class: 'neg-gk' }, 'Tipos ideales '), chips(g.types)) : null,
		g.favs.length ? h('div', {}, h('span', { class: 'neg-gk' }, '⭐ Favoritos '), g.favs.map(spName).join(', '), h('span', { class: 'neg-gs' }, ' (y su línea evolutiva)')) : null,
		g.lines.length ? h('div', {}, h('span', { class: 'neg-gk' }, 'Produce '), g.lines.join(', ')) : null);
}

/** Plantilla: todos los Pokémon trabajando, encargados, puestos libres, mover y «Sugerir». */
export function openStaff(onChange) {
	const sheet = openSheet('Plantilla', null, { onClose: () => { saveGame(); onChange?.(); } });
	sheet.el.dataset.menu = 'negocios';
	let busy = false;
	const act = async fn => { if (busy) return; busy = true; try { await fn(); } finally { busy = false; if (sheet.el.isConnected) draw(); } };
	const workerRow = (vid, p) => {
		const b = workerBonus(vid, p);
		return h('button', { class: 'row neg-staff', onclick: () => act(async () => {
			const others = ventureList().filter(v => v.status === 'owned' && v.id !== vid && freeSlots(v.id) > 0);
			const opts = [...others.map(v => `Mover a ${v.def.name} (+${Math.round(workerBonus(v.id, p).v * 100)} %)`), 'Traerlo de vuelta', 'Ver sus datos', 'Cancelar'];
			const k = await choose(`${displayName(p)} · Nv. ${p.lv} · en ${ventureDef(vid).name}`, opts, { cancel: opts.length - 1 });
			const st = ventureState(vid), idx = st.workers.indexOf(p);
			if (k < others.length) { const r = moveWorker(vid, idx, others[k].id); toast(r.ok ? `${displayName(p)} se va a ${others[k].def.name}` : r.msg); }
			else if (k === others.length) { const back = recallWorker(vid, idx); if (back) toast(back.where === 'party' ? `${displayName(p)} vuelve a tu equipo` : `${displayName(p)} vuelve al PC (Caja ${back.box + 1})`); }
			else if (k === others.length + 1) hooks.summary?.(p, draw);
			await saveGame();
		}) },
			h('div', { class: 'ico tut-mon' }, monImg(p.sp, { anim: false, shiny: p.shiny })),
			h('div', { class: 'lbl' }, h('div', { class: 't' }, `${displayName(p)} · Nv. ${p.lv}`),
				h('div', { class: 's' }, `Aporta +${Math.round(b.v * 100)} %${b.fav ? ' · ⭐ favorito' : b.typed ? ' · ✔ tipo ideal' : ''} · ${happyTxt(p)}`)),
			h('span', { class: 'chev' }, '›'));
	};
	const draw = () => {
		const mine = ventureList().filter(v => v.status === 'owned');
		const body = [];
		if (!mine.length) { sheet.set(h('div', { class: 'empty' }, 'Todavía no eres socio de ningún negocio.')); return; }
		const totalFree = mine.reduce((a, v) => a + freeSlots(v.id), 0);
		const working = mine.reduce((a, v) => a + (v.st.workers || []).length, 0);
		body.push(h('div', { class: 'note' }, `${working} ${working === 1 ? 'Pokémon trabaja' : 'Pokémon trabajan'} en tus negocios · ${totalFree} ${totalFree === 1 ? 'puesto libre' : 'puestos libres'}. Los que trabajan ganan amistad y suben la producción. Toca uno para moverlo de negocio o traerlo de vuelta.`));
		body.push(h('div', { class: 'pad' }, h('button', { class: 'btn' + (totalFree ? ' primary' : ''), style: { width: '100%' }, disabled: !totalFree, onclick: () => act(suggestFlow) }, totalFree ? '✨ Sugerir quién cubre los puestos libres' : 'No hay puestos libres')));
		for (const v of mine) {
			const st = v.st, slots = slotsOf(v.id), ws = st.workers || [];
			const mgr = managersOf(v.id).find(m => m.id === st.manager);
			body.push(section(`${v.def.icon || '🏠'} ${v.def.name} · ${ws.length}/${slots}`));
			body.push(h('div', { class: 'note neg-staff-mgr' }, mgr ? `Al frente: ${mgr.name}` : 'Sin encargad@ ahora mismo'));
			body.push(guideBox(v.id));
			if (ws.length) body.push(h('div', { class: 'list' }, ...ws.map(p => workerRow(v.id, p))));
			const f = slots - ws.length;
			if (f > 0) body.push(h('button', { class: 'linkbtn', onclick: () => { sheet.close(); openVenture(v.id, onChange); } }, `${f} ${f === 1 ? 'puesto libre' : 'puestos libres'} · elegir a mano ›`));
			if (!slots) body.push(h('div', { class: 'note' }, 'Aquí no hay puestos para Pokémon todavía (alguna mejora los abre).'));
		}
		const y = sheet.body.scrollTop;
		sheet.set(body);
		sheet.body.scrollTop = y;
	};
	const suggestFlow = async () => {
		const list = suggestWorkers();
		if (!list.length) { toast('No hay candidatos disponibles en el PC ni en el equipo'); return; }
		const txt = list.map(s => `• **${displayName(s.p)}** (Nv. ${s.p.lv}, ${s.from === 'party' ? 'de tu equipo' : `Caja ${s.box + 1}`}) → ${ventureDef(s.id).name}: +${Math.round(s.v * 100)} %${s.fav ? ' ⭐' : s.typed ? ' ✔' : ''}`).join('\n');
		const fromParty = list.filter(s => s.from === 'party');
		const k = await choose(`Propuesta:\n${txt}` + (fromParty.length ? `\n\nOjo: ${fromParty.length === 1 ? 'uno sale' : fromParty.length + ' salen'} de tu equipo.` : ''), fromParty.length ? ['Aplicar todo', 'Solo los del PC', 'Cancelar'] : ['Aplicar', 'Cancelar'], { cancel: fromParty.length ? 2 : 1 });
		const onlyBox = fromParty.length && k === 1;
		if ((fromParty.length && k === 2) || (!fromParty.length && k === 1) || k < 0) return;
		if (!onlyBox && fromParty.length && !(await confirm(`¿Seguro? ${fromParty.map(s => displayName(s.p)).join(', ')} ${fromParty.length === 1 ? 'dejará' : 'dejarán'} tu equipo para trabajar. Puedes traerlos de vuelta cuando quieras.`, 'Sí, que trabajen', 'Mejor no'))) return;
		let n = 0;
		for (const s of list) { if (onlyBox && s.from === 'party') continue; if (applySuggestion(s).ok) n++; }
		toast(`👥 ${n} ${n === 1 ? 'Pokémon se pone' : 'Pokémon se ponen'} a trabajar`);
		await saveGame();
	};
	draw();
	return sheet;
}

/** Lista de negocios: los tuyos y las oportunidades. */
export function openVentures() {
	const sheet = openSheet('Negocios', null);
	sheet.el.dataset.menu = 'negocios';
	const draw = () => {
		const list = ventureList();
		const mine = list.filter(v => v.status === 'owned'), offers = list.filter(v => v.status === 'offer');
		const body = [h('div', { class: 'neg-wallet' }, h('span', {}, 'Tu dinero'), h('b', {}, fmtMoney(G.player.money)))];
		if (!list.length) body.push(h('div', { class: 'empty' }, 'Todavía no tienes negocios ni conoces a nadie que busque socio. Hay gente por el mundo con buenas ideas y poco dinero: cuando alguien te proponga algo, saldrá aquí.'));
		if (mine.length) {
			let total = 0;
			const rows = mine.map(v => {
				const p = pending(v.id), r = rates(v.id);
				total += r.money;
				const nItems = Object.values(p.items).reduce((a, b) => a + b, 0);
				const alert = v.st.pending ? '❗ Hay un imprevisto que decidir' : p.full ? '📦 Almacén lleno: pasa a recoger' : almostFull(v.id) ? `⏳ Se llena en ${hoursTxt(fullIn(v.id))}: recoge antes de perder producción` : null;
				return h('button', { class: 'row neg-row' + (alert ? ' hl' : ''), onclick: () => openVenture(v.id, draw) },
					h('div', { class: 'ico' }, v.def.icon || '🏠'),
					h('div', { class: 'lbl' },
						h('div', { class: 't' }, v.def.name),
						h('div', { class: 's' }, `Por recoger: ${fmtMoney(p.money)}${nItems ? ` y ${nItems} ${nItems === 1 ? 'objeto' : 'objetos'}` : ''}`),
						h('div', { class: 's' }, `Produce ${fmtMoney(r.money)} al día · tu parte ${r.pct} %`),
						alert ? h('div', { class: 's neg-alert' }, alert) : null),
					h('span', { class: 'chev' }, '›'));
			});
			const tot = mine.reduce((a, v) => { const p = pending(v.id); return a + p.money + Object.values(p.items).reduce((x, y) => x + y, 0); }, 0);
			body.push(h('div', { class: 'pad' }, h('button', { class: tot ? 'btn gold' : 'btn', style: { width: '100%' }, disabled: !tot, onclick: async () => {
				const got = collectAll();
				if (!got.n) return;
				const its = Object.entries(got.items);
				toast(`💰 ${fmtMoney(got.money)} de ${got.n} ${got.n === 1 ? 'negocio' : 'negocios'}${its.length ? ' y ' + its.map(([k, n]) => `${itemName(k)} ×${n}`).join(', ') : ''}`, 'quest');
				await saveGame();
				draw();
			} }, tot ? 'Recoger todo' : 'Nada que recoger por ahora')));
			body.push(h('div', { class: 'pad' }, h('button', { class: 'btn', style: { width: '100%' }, onclick: () => openStaff(draw) }, '👥 Plantilla: quién trabaja dónde')));
			body.push(section('Tus negocios'), h('div', { class: 'list' }, ...rows));
			body.push(h('div', { class: 'note' }, `Entre todos te dan unos ${fmtMoney(total)} al día, más lo que produzcan en objetos. Se acumula aunque no juegues, hasta que se llena el almacén de cada uno.`));
		}
		if (offers.length) {
			body.push(section('Oportunidades'), h('div', { class: 'list' }, ...offers.map(v => h('button', { class: 'row neg-row q-new', onclick: () => openVenture(v.id, draw) },
				h('div', { class: 'ico' }, v.def.icon || '🏠'),
				h('div', { class: 'lbl' }, h('div', { class: 't' }, v.def.name), h('div', { class: 's' }, tx(v.def.blurb || '')), h('div', { class: 's' }, `📍 ${placeName(v.def.loc)} · Entrada: ${v.def.buy?.cost ? fmtMoney(v.def.buy.cost) : 'sin costo'}`)),
				h('span', { class: 'mk new' }, '!')))));
		}
		sheet.set(body);
	};
	draw();
	askManagerConflicts(draw);
	return sheet;
}
/** Partidas viejas con un encargado al frente de varios negocios: que Mario elija dónde se queda. */
async function askManagerConflicts(redraw) {
	const list = managerConflicts();
	for (const c of list) {
		const names = c.ventures.map(v => ventureDef(v).name);
		const k = await choose(`**${c.name}** estaba al frente de ${names.slice(0, -1).join(', ')} y ${names.at(-1)} a la vez, y no le alcanza el día. ¿Dónde se queda? Los demás vuelven con su encargad@ de siempre.`, [...names, 'Decidir luego'], { cancel: names.length });
		if (k >= names.length || k < 0) continue;
		resolveManagerConflict(c.mid, c.ventures[k]);
		toast(`${c.name} se queda en ${names[k]}`);
	}
	if (list.length) { await saveGame(); redraw?.(); }
}
const placeName = id => { const t = topLoc(id); const l = C.locations[id]; return l ? (t && t.id !== id ? `${t.name} › ${l.name}` : l.name) : ''; };

/** Ficha de un negocio. */
export function openVenture(id, onChange) {
	const def = ventureDef(id);
	if (!def) return Promise.resolve();
	return new Promise(resolve => {
		const sheet = openSheet(def.name, null, { onClose: () => { clearInterval(timer); saveGame(); onChange?.(); resolve(); } });
		sheet.el.dataset.menu = 'negocios';
		let showWhy = false, busy = false;
		const partner = npcOf(def.partner);
		const act = async fn => { if (busy) return; busy = true; try { await fn(); } finally { busy = false; if (sheet.el.isConnected) draw(); } };

		const head = () => h('div', { class: 'neg-head' },
			partner ? h('div', { class: 'neg-pic' }, portraitFor(partner)) : h('div', { class: 'neg-pic ico' }, def.icon || '🏠'),
			h('div', { class: 'neg-headtxt' },
				h('div', { class: 'neg-blurb' }, tx(def.blurb || '')),
				h('div', { class: 'neg-meta' }, `📍 ${placeName(def.loc)}`, partner ? ` · Lo lleva ${partner.name}` : '')));

		const drawOffer = () => {
			const cost = def.buy?.cost || 0, pct = sharePct(id);
			const lines = Object.values(def.lines || {}).filter(l => !l.locked);
			sheet.set([head(),
				def.buy?.text ? h('div', { class: 'neg-quote', html: fmtText(tx(def.buy.text)) }) : null,
				h('div', { class: 'neg-facts' },
					h('div', {}, h('span', {}, 'Entrada'), h('b', {}, cost ? fmtMoney(cost) : 'Sin costo')),
					h('div', {}, h('span', {}, 'Tu parte'), h('b', {}, pct + ' %')),
					h('div', {}, h('span', {}, 'Almacén'), h('b', {}, `${storeDays(id)} días`))),
				section('Qué produce'),
				h('div', { class: 'list' }, ...lines.map(l => h('div', { class: 'row' }, h('div', { class: 'ico' }, l.icon || '•'), h('div', { class: 'lbl' }, h('div', { class: 't' }, l.name), h('div', { class: 's' }, tx(l.desc || '')))))),
				h('div', { class: 'note' }, 'Como socio decides a qué se dedica más esfuerzo, compras mejoras, mandas Pokémon del PC a echar una mano y pasas a recoger tu parte. Produce en tiempo real, juegues o no.'),
				h('div', { class: 'pad' }, h('button', { class: 'btn primary', style: { width: '100%' }, disabled: G.player.money < cost, onclick: () => act(async () => {
					const r = joinVenture(id);
					if (!r.ok) { toast(r.msg); return; }
					toast(`🤝 Ahora eres soci${G.player.pron === 'ella' ? 'a' : G.player.pron === 'elle' ? 'e' : 'o'} de ${def.name}`, 'quest');
					await saveGame();
					if (def.buy?.script && C.scripts[def.buy.script]) await runScript(def.buy.script);
				}) }, G.player.money < cost ? `Te faltan ${fmtMoney(cost - G.player.money)}` : cost ? `Entrar como socio · ${fmtMoney(cost)}` : 'Entrar como socio')),
			]);
		};

		const runEvent = ev => act(async () => {
			const who = npcOf(ev.npc) || partner;
			await say(who, tx(ev.text));
			const opts = eventOptions(ev);
			while (true) {
				const i = await choose(ev.name ? `**${ev.name}**` : null, opts.map(o => tx(o.text) + (o.cost ? ` · ${fmtMoney(o.cost)}` : '')));
				const o = opts[i];
				const r = resolveEvent(id, ev, o);
				if (!r.ok) { toast(r.msg); continue; }
				if (o.result) await say(null, tx(o.result));
				break;
			}
			await saveGame();
		});

		const pickWorker = () => {
			const ps = openSheet('¿Quién echa una mano?', null);
			ps.el.dataset.menu = 'negocios';
			const cands = [];
			G.party.forEach((p, idx) => cands.push({ p, src: { where: 'party', idx }, where: 'Equipo' }));
			G.boxes.forEach((b, bi) => b.forEach((p, idx) => cands.push({ p, src: { where: 'box', box: bi, idx }, where: `Caja ${bi + 1}` })));
			cands.forEach(c => { c.b = workerBonus(id, c.p); });
			cands.sort((a, b) => b.b.v - a.b.v);
			const jobs = def.jobs || {};
			ps.set([
				h('div', { class: 'note' }, tx(jobs.text || 'Los Pokémon que trabajan aquí suben la producción y te toman cariño. Puedes traerlos de vuelta cuando quieras.')),
				guideBox(id),
				h('div', { class: 'list' }, ...cands.map(c => {
					const s = D.species[c.p.sp];
					const no = c.p.uid === G.vars.riolu_uid ? 'Tu compañero no se separa de ti' : c.src.where === 'party' && G.party.length <= 1 ? 'No puedes quedarte sin equipo' : c.src.where === 'party' && c.src.idx === 0 ? 'Va en cabeza: cámbialo de sitio antes' : null;
					return h('button', { class: 'row' + (no ? ' done' : ''), disabled: !!no, onclick: () => {
						// los índices pueden haber cambiado: se vuelve a buscar por uid
						const list = c.src.where === 'party' ? G.party : G.boxes[c.src.box];
						const idx = list.findIndex(x => x.uid === c.p.uid);
						const r = assignWorker(id, { ...c.src, idx });
						if (!r.ok) { toast(r.msg); return; }
						toast(`${displayName(c.p)} se queda a trabajar en ${def.name}`);
						ps.close(); draw();
					} },
						h('div', { class: 'ico tut-mon' }, monImg(c.p.sp, { anim: false, shiny: c.p.shiny })),
						h('div', { class: 'lbl' },
							h('div', { class: 't' }, `${displayName(c.p)} · Nv. ${c.p.lv}`),
							h('div', { class: 's' }, no || `${c.where} · ${s.types.map(typeName).join(' / ')}${c.b.fav ? ' · ⭐ se le da de maravilla' : c.b.typed ? ' · ✔ tipo ideal' : ''}`)),
						h('b', { class: 'neg-plus' }, `+${Math.round(c.b.v * 100)} %`));
				})),
			]);
		};

		const drawOwned = () => {
			const st = ventureState(id), p = pending(id), r = rates(id), lines = linesOf(id);
			const keys = Object.keys(lines);
			const body = [head()];
			const ev = rollEvent(id);
			if (ev) body.push(h('button', { class: 'neg-event', onclick: () => runEvent(ev) }, h('b', {}, `❗ ${ev.name || 'Imprevisto'}`), h('span', {}, 'Te están esperando para decidir. Toca para verlo.')));

			// Caja
			const its = Object.entries(p.items);
			const fillPct = Math.min(100, p.fill / p.cap * 100);
			body.push(h('div', { class: 'neg-bank' + (p.full ? ' full' : '') },
				h('div', { class: 'neg-bank-top' }, h('span', {}, 'Por recoger'), h('b', {}, fmtMoney(p.money))),
				its.length ? h('div', { class: 'neg-items' }, ...its.map(([k, n]) => h('span', { class: 'neg-item' }, itemImg(k), `${itemName(k)} ×${n}`))) : null,
				h('div', { class: 'neg-store' }, h('i', { style: { width: fillPct + '%' } })),
				h('div', { class: 'neg-store-t' }, p.full ? '📦 Almacén lleno: lo que se produzca ahora se pierde' : almostFull(id) ? `⏳ Se llena en ${hoursTxt(fullIn(id))}: recoge pronto` : `Almacén: ${(Math.round(p.fill * 10) / 10).toLocaleString('es-MX')} de ${p.cap} días`),
				h('button', { class: 'btn gold', disabled: !p.money && !its.length, onclick: () => act(async () => {
					const got = collect(id);
					if (got) toast(`💰 ${fmtMoney(got.money)}${Object.keys(got.items).length ? ' y ' + Object.entries(got.items).map(([k, n]) => `${itemName(k)} ×${n}`).join(', ') : ''}`, 'quest');
					await saveGame();
				}) }, 'Recoger')));

			// Producción
			body.push(section('A qué se dedica'));
			if (keys.length > 1) body.push(h('div', { class: 'note' }, 'Reparte el esfuerzo. Lo que subes en una línea se lo quitas a las demás.'));
			body.push(h('div', { class: 'list' }, ...keys.map(k => {
				const ln = lines[k], pl = r.perLine[k];
				const out = [pl.money > 0 ? `${fmtMoney(pl.money * r.pct / 100)} al día` : null, ...pl.items.filter(i => i.perDay > 0).map(i => `${itemName(i.id)}: ${perDay(i.perDay)}`)].filter(Boolean);
				return h('div', { class: 'neg-line', 'data-noswipe': '' },
					h('div', { class: 'neg-line-top' }, h('span', { class: 'neg-ico' }, ln.icon || '•'), h('div', { class: 'lbl' }, h('div', { class: 't' }, ln.name), h('div', { class: 's' }, tx(ln.desc || ''))),
						keys.length > 1 ? h('div', { class: 'stepper neg-step' },
							h('button', { 'aria-label': 'Menos esfuerzo', disabled: pl.pct <= 0, onclick: () => { shiftEffort(id, k, -10); draw(); } }, '−'),
							h('b', {}, pl.pct + ' %'),
							h('button', { 'aria-label': 'Más esfuerzo', disabled: pl.pct >= 100, onclick: () => { shiftEffort(id, k, 10); draw(); } }, '+')) : null),
					h('div', { class: 'neg-bar' }, h('i', { style: { width: pl.pct + '%' } })),
					h('div', { class: 'neg-out' }, out.length ? out.join(' · ') : 'Sin esfuerzo, no produce'));
			})));
			body.push(h('div', { class: 'neg-sum' },
				h('div', {}, h('span', {}, 'Ingresos'), h('b', {}, fmtMoney(r.gross))),
				h('div', {}, h('span', {}, 'Gastos'), h('b', {}, '−' + fmtMoney(r.upkeep))),
				h('div', {}, h('span', {}, `Tu parte (${r.pct} %)`), h('b', { class: 'gold' }, fmtMoney(r.money) + '/día'))));
			if (r.red) body.push(h('div', { class: 'note warn' }, 'Ahora mismo los gastos se comen los ingresos. Sube el esfuerzo en una línea que dé dinero o compra una mejora.'));
			if (r.why.length) {
				body.push(h('button', { class: 'linkbtn neg-why-btn', onclick: () => { showWhy = !showWhy; draw(); } }, showWhy ? 'Ocultar el desglose' : 'Ver qué suma y qué resta'));
				if (showWhy) body.push(h('div', { class: 'neg-why' }, ...r.why.map(w => h('div', {}, h('span', {}, w.label), h('b', {}, Object.entries(w.m).map(([k, m]) => `${k === 'all' ? 'Todo' : (def.lines[k]?.name || k)} ${pctTxt(m)}`).join(' · '))))));
			}

			// Mejoras cruzadas con tus otros negocios (2026-10-28)
			const sys = synergiesOf(id);
			if (sys.length) {
				body.push(section('Con tus otros negocios'));
				body.push(h('div', { class: 'list' }, ...sys.map(sy => h('div', { class: 'row neg-syn' + (sy.active ? ' on' : '') },
					h('div', { class: 'ico' }, sy.active ? '🔗' : '⛓️‍💥'),
					h('div', { class: 'lbl' }, h('div', { class: 't' }, sy.label),
						h('div', { class: 's' }, (sy.desc ? tx(sy.desc) + ' ' : '') + (sy.active ? `Activa: ${Object.entries(sy.mult).map(([k, m]) => `${k === 'all' ? 'Todo' : (def.lines[k]?.name || k)} ${pctTxt(m)}`).join(' · ')}.` : `Necesita: ser socio de ${sy.fromName}${sy.line ? ` y dedicar al menos ${sy.min ?? 10} % a «${C.ventures[sy.from].lines?.[sy.line]?.name || sy.line}»` : ''}.`)))))));
			}

			// Pokémon trabajando
			const slots = slotsOf(id), ws = st.workers || [];
			if (slots > 0) {
				body.push(section(`Pokémon echando una mano · ${ws.length}/${slots}`));
				body.push(guideBox(id));
				const grid = h('div', { class: 'neg-workers' });
				for (let i = 0; i < slots; i++) {
					const w = ws[i];
					if (!w) { grid.append(h('button', { class: 'neg-worker empty', onclick: pickWorker }, h('span', { class: 'plus' }, '+'), h('span', {}, 'Mandar a uno'))); continue; }
					const b = workerBonus(id, w);
					grid.append(h('button', { class: 'neg-worker', onclick: () => act(async () => {
						const k = await choose(`${displayName(w)} · Nv. ${w.lv} · aporta +${Math.round(b.v * 100)} %`, ['Ver sus datos', 'Traerlo de vuelta', 'Cancelar'], { cancel: 2 });
						if (k === 0) hooks.summary?.(w, draw);
						if (k === 1) { const back = recallWorker(id, ws.indexOf(w)); if (back) toast(back.where === 'party' ? `${displayName(w)} vuelve a tu equipo` : `${displayName(w)} vuelve al PC (Caja ${back.box + 1})`); await saveGame(); }
					}) },
						h('div', { class: 'neg-wsp' }, monImg(w.sp, { anim: false, shiny: w.shiny })),
						h('span', { class: 'neg-wname' }, displayName(w)),
						h('span', { class: 'neg-plus' }, `+${Math.round(b.v * 100)} %${b.fav ? ' ⭐' : ''}`)));
				}
				body.push(grid);
			}

			// Encargado (cada encargado lleva un solo negocio: 2026-10-30)
			const mgrs = managersOf(id);
			if (mgrs.length > 1 || !st.manager) {
				body.push(section('Quién lo lleva'));
				if (!st.manager) body.push(h('div', { class: 'note warn' }, 'Ahora mismo nadie está al frente. Elige a alguien de la lista.'));
				body.push(h('div', { class: 'list' }, ...mgrs.map(m => {
					const on = st.manager === m.id, busy = on ? null : managerBusyAt(m.id, id);
					const busyName = busy ? ventureDef(busy)?.name : null;
					const pick = () => act(async () => {
						if (on) return;
						if (busy) {
							const k = await choose(`${m.name} está al frente de ${busyName}. Si lo traes aquí, ${busyName} vuelve a su encargad@ de siempre.`, ['Traerlo aquí', 'Mejor no'], { cancel: 1 });
							if (k !== 0) return;
						}
						const r = setManager(id, m.id);
						if (!r) return;
						toast(`${m.name} queda al frente` + (r.from ? ` · ${ventureDef(r.from).name} vuelve con ${managersOf(r.from).find(x => x.id === r.back)?.name || 'nadie por ahora'}` : ''));
						await saveGame();
					});
					return h('div', { class: 'row neg-mgr' + (on ? ' on' : '') + (busy ? ' busy' : '') },
						h('div', { class: 'neg-mpic' }, portraitFor(npcOf(m.npc) || { name: m.name })),
						h('div', { class: 'lbl' }, h('div', { class: 't' }, m.name, on ? h('span', { class: 'neg-tag' }, 'Al frente') : null), h('div', { class: 's' }, busy ? `Ocupad@ en ${busyName}` : tx(m.desc || '')),
							h('div', { class: 's neg-eff' }, [...Object.entries(m.mult || {}).map(([k, x]) => `${k === 'all' ? 'Todo' : (def.lines[k]?.name || k)} ${pctTxt(x)}`), m.wage ? `Sueldo ${fmtMoney(m.wage)}/día` : null].filter(Boolean).join(' · '))),
						on ? null : h('button', { class: 'btn' + (busy ? '' : ' primary'), 'aria-label': busy ? `Traer a ${m.name} aquí` : `Poner a ${m.name} al frente`, onclick: pick }, busy ? 'Traerlo aquí' : 'Elegir'));
				})));
			}

			// Mejoras
			const ups = upgradesOf(id);
			if (ups.length) {
				const todo = ups.filter(u => !u.bought), done = ups.filter(u => u.bought);
				body.push(section(`Mejoras · ${done.length}/${ups.length}`));
				const effTxt = u => [...Object.entries(u.mult || {}).map(([k, x]) => `${k === 'all' ? 'Todo' : (def.lines[k]?.name || k)} ${pctTxt(x)}`),
					u.unlock ? `Abre: ${def.lines[u.unlock]?.name || u.unlock}` : null, u.share ? `Tu parte +${u.share} puntos` : null, u.slots ? `+${u.slots} puesto para Pokémon` : null,
					u.store ? `+${u.store} ${u.store === 1 ? 'día' : 'días'} de almacén` : null, u.upkeep ? `Gastos ${u.upkeep < 0 ? '−' : '+'}${fmtMoney(Math.abs(u.upkeep))}/día` : null].filter(Boolean).join(' · ');
				body.push(h('div', { class: 'list' }, ...todo.map(u => {
					const lock = !u.available, poor = G.player.money < u.cost;
					return h('div', { class: 'neg-up' + (lock ? ' locked' : '') },
						h('div', { class: 'lbl' }, h('div', { class: 't' }, u.name), h('div', { class: 's' }, tx(u.desc || '')), h('div', { class: 's neg-eff' }, effTxt(u)),
							lock ? h('div', { class: 's' }, '🔒 ' + ((u.need || []).some(n => !st.ups[n]) ? 'Antes hace falta: ' + (u.need || []).filter(n => !st.ups[n]).map(n => def.upgrades.find(x => x.id === n)?.name || n).join(', ') : 'Todavía no se puede')) : null),
						h('button', { class: 'btn' + (lock || poor ? '' : ' primary'), disabled: lock || poor, onclick: () => act(async () => {
							const res = buyUpgrade(id, u.id);
							if (!res.ok) { toast(res.msg); return; }
							toast(`🔧 ${u.name}`, 'quest');
							await saveGame();
							if (u.script && C.scripts[u.script]) await runScript(u.script);
						}) }, fmtMoney(u.cost)));
				}), ...done.map(u => h('div', { class: 'neg-up bought' }, h('div', { class: 'lbl' }, h('div', { class: 't' }, '✔ ' + u.name), h('div', { class: 's neg-eff' }, effTxt(u)))))));
			}

			if (st.log?.length) {
				body.push(section('Cuaderno'));
				body.push(h('div', { class: 'neg-log' }, ...st.log.slice(0, 8).map(e => h('div', {}, h('span', {}, new Date(e.t).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })), ' ', tx(e.text)))));
			}
			body.push(h('div', { class: 'neg-foot' },
				h('div', { class: 'note' }, `Invertido: ${fmtMoney(st.spent || 0)} · Ganado hasta hoy: ${fmtMoney(st.earned || 0)}`),
				hooks.travel && def.loc && G.loc !== def.loc ? h('button', { class: 'btn', onclick: () => { sheet.close(); hooks.travel(def.loc); } }, `Ir a ${C.locations[def.loc]?.name || 'verlo'}`) : null));
			sheet.set(body);
		};

		const draw = () => {
			const y = sheet.body.scrollTop;
			if (owned(id)) drawOwned(); else drawOffer();
			sheet.body.scrollTop = y;
		};
		draw();
		const timer = setInterval(() => { if (!sheet.el.isConnected) { clearInterval(timer); return; } if (!busy && owned(id)) { tick(id); draw(); } }, 60e3);
	});
}
