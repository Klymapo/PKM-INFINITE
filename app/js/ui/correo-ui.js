// Buzón (Más › Buzón): cartas, periódicos, visitas y encargos. Lógica en ../correo.js.
import { C } from '../content.js';
import { G, saveGame } from '../state.js';
import { D } from '../data.js';
import { tx, runScript } from '../guion.js';
import { itemImg } from '../art.js';
import { h, openSheet, readPaper, toast } from './core.js';
import { mailbox, markRead, mailTick, unreadMail } from '../correo.js';

const KIND = { carta: ['✉️', 'Carta'], periodico: ['📰', 'Periódico'], visita: ['🚪', 'Visita'], encargo: ['📦', 'Encargo'] };
const kindOf = m => KIND[m.kind] || KIND.carta;

/** Abre una pieza del buzón: la lee (objeto con `read`) y, si trae guion (visita o encargo), lo juega. */
export async function openMail(m) {
	const it = m.item ? D.items[m.item] : null;
	if (it?.read) await readPaper(tx(it.name), tx(it.read), { icon: itemImg(m.item) });
	if (m.script && C.scripts[m.script]) await runScript(m.script);
	markRead(m.id);
	await saveGame();
}

export function openMailbox() {
	const sheet = openSheet('Buzón', null);
	sheet.el.dataset.menu = 'buzon';
	const draw = () => {
		const list = mailbox();
		const body = [h('div', { class: 'note' }, 'Lo que te mandan la gente que conoces y los periódicos de las regiones que visitaste. Llega con los días: no hace falta que hagas nada para recibirlo.')];
		if (!list.length) body.push(h('div', { class: 'empty' }, 'El buzón está vacío. Con el tiempo, la gente que conociste te escribirá.'));
		else body.push(h('div', { class: 'list' }, ...list.map(m => {
			const [ico, kname] = kindOf(m);
			return h('button', { class: 'row' + (m.read ? '' : ' hl'), onclick: async () => { await openMail(m); if (sheet.el.isConnected) draw(); } },
				h('div', { class: 'ico' }, m.item ? itemImg(m.item) : ico),
				h('div', { class: 'lbl' },
					h('div', { class: 't' }, tx(m.title || kname)),
					h('div', { class: 's' }, `${kname} · ${tx(m.from || '')} · ${new Date(m.at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}`),
					m.read ? null : h('div', { class: 's neg-alert' }, '✨ Sin abrir')),
				h('span', { class: 'chev' }, '›'));
		})));
		sheet.set(body);
	};
	draw();
	return sheet;
}

/** Revisa el buzón y avisa con un toast si llegó algo. */
export function checkMail() {
	try {
		const got = mailTick();
		for (const m of got) toast(`${kindOf(m)[0]} ${m.kind === 'visita' ? 'Alguien pasó a verte' : m.kind === 'periodico' ? 'Llegó el periódico' : 'Tienes correo'}: ${tx(m.from || '')} · Más › Buzón`, 'quest');
		if (got.length) saveGame();
		return got;
	} catch (e) { console.error(e); return []; }
}
export { unreadMail };
