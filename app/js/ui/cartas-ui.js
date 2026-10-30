// Cuadrante (juego de cartas): partida, colección y mazo. Lógica en ../cartas.js.
import { C } from '../content.js';
import { G, saveGame } from '../state.js';
import { D, typeStyle, typeName, itemName } from '../data.js';
import { tx } from '../guion.js';
import { monImg } from '../art.js';
import { h, fmtText, openSheet, portraitFor, toast, confirm } from './core.js';
import * as K from '../cartas.js';

const npcName = id => C.npcs[id]?.name || id;
const sleep = ms => new Promise(r => setTimeout(r, ms));

/** Carta dibujada: sprite, 4 valores y franja del tipo. owner: 'me' | 'foe' | null. */
export function cardEl(c, { owner = null, small = false, onclick = null, sel = false, count = 0, dim = false } = {}) {
	const ts = typeStyle(c.types[0]);
	const el = h(onclick ? 'button' : 'div', {
		class: 'cq-card' + (small ? ' sm' : '') + (owner ? ' ' + owner : '') + (sel ? ' sel' : '') + (dim ? ' dim' : ''),
		'aria-label': `${c.name}: arriba ${c.up}, derecha ${c.right}, abajo ${c.down}, izquierda ${c.left}, tipo ${typeName(c.types[0])}`,
		onclick,
	},
	h('span', { class: 'cq-type', style: `background:${ts.background};color:${ts.color}` }, typeName(c.types[0]).slice(0, 3)),
	h('div', { class: 'cq-pic' }, monImg(c.sp, { anim: false })),
	h('span', { class: 'cq-v up' }, K.fmtV(c.up)), h('span', { class: 'cq-v right' }, K.fmtV(c.right)),
	h('span', { class: 'cq-v down' }, K.fmtV(c.down)), h('span', { class: 'cq-v left' }, K.fmtV(c.left)),
	count > 1 ? h('span', { class: 'cq-n' }, '×' + count) : null);
	return el;
}

/** Explicación de las reglas (también se ve desde Más › Cuadrante). */
export const RULES = '**Cómo se juega al Cuadrante**\n\n' +
	'• Cada quien lleva **5 cartas**. Por turnos se pone una en una casilla libre del tablero de 3×3.\n' +
	'• Cada carta tiene 4 números (de 1 a 10; la **A** vale 10): arriba **PS**, derecha **ataque**, abajo **defensa** e izquierda **velocidad** del Pokémon.\n' +
	'• Al poner una carta, mira a sus vecinas del rival: si tu número de ese lado es **mayor** que el suyo del lado que se toca, esa carta **pasa a ser tuya**.\n' +
	'• Si el tipo de tu carta es **eficaz** contra la otra, tu número cuenta **+1**.\n' +
	'• Al llenarse el tablero gana quien tenga más cartas (en el tablero y la que le quede en la mano).\n' +
	'• Si ganas, te llevas **una carta** del mazo del rival (la eliges tú). Perder no cuesta nada.';

/** Partida contra un rival. Resuelve con { res, card, prizes, first } o { quit: true }. */
export function playCards(id) {
	const def = K.playerDef(id);
	return new Promise(resolve => {
		const st = K.cardState();
		const mine = K.myDeck();
		if (mine.length < K.DECK) { toast('Necesitas 5 cartas para jugar.'); resolve({ quit: true }); return; }
		const level = K.aiLevelFor(id);
		const first = (st.games % 2 === 0) ? 'me' : 'foe';
		const m = K.newMatch(mine, def.deck, first);
		let selH = null, busy = false;
		const box = h('div', { class: 'cq-body' });
		const ov = h('div', { class: 'overlay ft-ov', role: 'dialog', 'aria-label': 'Cuadrante' }, h('div', { class: 'ft-box cq-box' }, box));
		document.body.append(ov);
		const close = r => { ov.remove(); resolve(r); };
		const foeN = C.npcs[def.npc];
		const msg = h('div', { class: 'cq-msg' });
		const say = t => { msg.innerHTML = fmtText(t); };
		const draw = (flash = []) => {
			const s = K.score(m);
			const head = h('div', { class: 'cq-head' },
				h('div', { class: 'cq-por' }, portraitFor(foeN ? { ...foeN, id: def.npc } : { name: def.name })),
				h('div', { class: 'cq-who' }, h('b', {}, def.name || npcName(def.npc)), h('span', {}, def.champion ? `Campeón de Cuadrante · nivel ${level}` : `Nivel ${level}`)),
				h('div', { class: 'cq-score' }, h('span', { class: 'me' }, String(s.me)), '–', h('span', { class: 'foe' }, String(s.foe))));
			const foeHand = h('div', { class: 'cq-hand foe' }, ...m.hand.foe.map(c => c ? cardEl(c, { owner: 'foe', small: true }) : h('div', { class: 'cq-slot sm' })));
			const board = h('div', { class: 'cq-board', 'data-noswipe': '' }, ...m.board.map((b, i) => {
				if (b) { const e = cardEl(b.c, { owner: b.owner }); if (flash.includes(i)) e.classList.add('flip'); return e; }
				return h('button', { class: 'cq-cell' + (selH !== null ? ' can' : ''), 'aria-label': 'Casilla ' + (i + 1), disabled: busy || selH === null || m.turn !== 'me', onclick: () => mine_(i) });
			}));
			const myHand = h('div', { class: 'cq-hand me' }, ...m.hand.me.map((c, k) => c ? cardEl(c, { owner: 'me', small: true, sel: selH === k, onclick: busy || m.turn !== 'me' ? null : () => { selH = selH === k ? null : k; draw(); } }) : h('div', { class: 'cq-slot sm' })));
			box.replaceChildren(head, foeHand, board, myHand, msg,
				h('div', { class: 'ft-btns' }, h('button', { class: 'btn', onclick: async () => { if (busy) return; if (await confirm('¿Te levantas de la mesa? La partida no cuenta.', 'Levantarme', 'Seguir')) close({ quit: true }); } }, 'Salir'),
					h('button', { class: 'btn', onclick: () => { const p = h('div', { class: 'overlay ft-ov dim', onclick: () => p.remove() }, h('div', { class: 'ft-box cq-rules', html: fmtText(RULES + '\n\n*Toca para cerrar.*') })); document.body.append(p); } }, '¿Cómo se juega?')));
		};
		const mine_ = async i => {
			if (busy || selH === null || m.turn !== 'me') return;
			const flips = K.play(m, { h: selH, i });
			selH = null;
			say(flips.length ? `¡Giras ${flips.length === 1 ? 'una carta' : flips.length + ' cartas'}!` : 'Tu carta queda en la mesa.');
			draw(flips);
			await next();
		};
		const next = async () => {
			if (K.isOver(m)) return end();
			if (m.turn === 'foe') {
				busy = true; draw();
				await sleep(650);
				const mv = K.aiMove(m, level);
				const c = m.hand.foe[mv.h];
				const flips = K.play(m, mv);
				busy = false;
				say(`${def.name || npcName(def.npc)} pone **${c.name}**` + (flips.length ? ` y te gira ${flips.length === 1 ? 'una' : flips.length}.` : '.'));
				draw(flips);
				if (K.isOver(m)) return end();
			}
			if (!K.legalMoves(m, 'me').length) return end();
			if (!msg.textContent) say('Toca una carta de tu mano y luego una casilla.');
		};
		const end = async () => {
			await sleep(500);
			const res = K.result(m), s = K.score(m);
			const line = res === 'win' ? def.lose : res === 'lose' ? def.win : def.draw;
			const title = res === 'win' ? '🃏 ¡Ganaste!' : res === 'lose' ? '🃏 Perdiste' : '🃏 Empate';
			const rows = [h('div', { class: 'cr-head' }, `${title} · ${s.me}–${s.foe}`)];
			if (line) rows.push(h('div', { class: 'cr-text', html: fmtText(`**${def.name || npcName(def.npc)}:** «${tx(line)}»`) }));
			if (res !== 'win') {
				const out = K.finishMatch(id, res);
				await saveGame();
				rows.push(h('div', { class: 'note' }, res === 'lose' ? 'No pierdes ninguna carta. Cambia tu mazo en Más › Cuadrante y vuelve.' : 'Nadie se lleva nada.'),
					h('div', { class: 'ft-btns' }, h('button', { class: 'btn primary', onclick: () => close(out) }, 'Seguir')));
				box.replaceChildren(...rows);
				return;
			}
			// Elegir carta del rival
			const owned = K.cardState().owned;
			rows.push(h('div', { class: 'section-title' }, 'Elige una carta de su mazo'));
			rows.push(h('div', { class: 'cq-pick' }, ...def.deck.map(sp => {
				const c = K.card(sp);
				return h('div', { class: 'cq-pickc' }, cardEl(c, { onclick: async () => {
					const out = K.finishMatch(id, 'win', sp);
					await saveGame();
					const extra = [h('div', { class: 'cr-head' }, `Te llevas: ${c.name}`)];
					if (out.prizes.length) extra.push(h('div', { class: 'cr-text', html: fmtText('Y por ser la primera vez: ' + out.prizes.map(p => `**${itemName(p.id)}**${(p.n || 1) > 1 ? ' ×' + p.n : ''}`).join(', ') + '.') }));
					box.replaceChildren(cardEl(c), ...extra, h('div', { class: 'ft-btns' }, h('button', { class: 'btn primary', onclick: () => close(out) }, 'Seguir')));
				} }), h('span', { class: 's' }, owned[sp] ? `Tienes ${owned[sp]}` : '✨ Nueva'));
			})));
			box.replaceChildren(...rows);
		};
		say(first === 'me' ? 'Empiezas tú. Toca una carta de tu mano y luego una casilla.' : `Empieza ${def.name || npcName(def.npc)}.`);
		draw();
		next();
	});
}

/** Más › Cuadrante: colección, mazo y rivales. */
export function openCards() {
	const sheet = openSheet('Cuadrante', null);
	sheet.el.dataset.menu = 'cartas';
	let tab = 'mazo', deck = K.myDeck();
	const draw = () => {
		const st = K.cardState();
		const all = Object.keys(st.owned).filter(sp => st.owned[sp] > 0).map(K.card).filter(Boolean).sort((a, b) => b.sum - a.sum || a.name.localeCompare(b.name));
		const tabs = h('div', { class: 'tabs' }, ...[['mazo', '🂠 Mazo'], ['col', `🗂️ Colección ${all.length}`], ['rivales', '🎴 Rivales']].map(([k, n]) => h('button', { class: tab === k ? 'on' : '', onclick: () => { tab = k; draw(); } }, n)));
		const body = [tabs];
		if (!all.length) body.push(h('div', { class: 'empty' }, 'Aún no tienes cartas. En algunas ciudades grandes hay gente que juega al Cuadrante: el primero que te enseñe te dará un sobre.'));
		else if (tab === 'mazo') {
			body.push(h('div', { class: 'note' }, `Elige ${K.DECK} cartas. Toca una de tu mazo para quitarla y una de abajo para meterla.`));
			body.push(h('div', { class: 'cq-deck' }, ...Array.from({ length: K.DECK }, (_, i) => deck[i] ? cardEl(K.card(deck[i]), { small: true, owner: 'me', onclick: () => { deck.splice(i, 1); draw(); } }) : h('div', { class: 'cq-slot sm' }))));
			const used = {}; for (const sp of deck) used[sp] = (used[sp] || 0) + 1;
			body.push(h('div', { class: 'cq-grid' }, ...all.map(c => {
				const left = st.owned[c.sp] - (used[c.sp] || 0);
				return cardEl(c, { small: true, count: left, dim: left <= 0, onclick: left > 0 && deck.length < K.DECK ? () => { deck.push(c.sp); draw(); } : null });
			})));
			const okD = deck.length === K.DECK;
			body.push(h('div', { class: 'ft-btns cq-btns' },
				h('button', { class: 'btn', onclick: () => { st.deck = []; deck = K.myDeck(); draw(); } }, 'Las más fuertes'),
				h('button', { class: 'btn primary', disabled: !okD, onclick: async () => { if (K.setDeck(deck)) { await saveGame(); toast('Mazo guardado'); } } }, okD ? 'Guardar mazo' : `Faltan ${K.DECK - deck.length}`)));
		} else if (tab === 'col') {
			body.push(h('div', { class: 'note' }, `${all.length} cartas distintas · ${st.won} ${st.won === 1 ? 'partida ganada' : 'partidas ganadas'} de ${st.games}.`));
			for (const r of [4, 3, 2, 1]) {
				const list = all.filter(c => c.rank === r);
				if (!list.length) continue;
				body.push(h('div', { class: 'section-title' }, K.RANKS[r]), h('div', { class: 'cq-grid' }, ...list.map(c => cardEl(c, { small: true, count: st.owned[c.sp] }))));
			}
		} else {
			const open = K.playersOpen();
			body.push(h('div', { class: 'note', html: fmtText(RULES) }));
			if (!open.length) body.push(h('div', { class: 'empty' }, 'Aún no conoces a nadie que juegue.'));
			else body.push(h('div', { class: 'list' }, ...open.map(id => {
				const d = K.playerDef(id), w = st.wins[id] || 0, loc = C.locations[d.loc];
				const got = d.deck.filter(sp => st.owned[sp] > 0).length;
				return h('div', { class: 'row' }, h('div', { class: 'ico' }, d.champion ? '🏆' : '🎴'),
					h('div', { class: 'lbl' }, h('div', { class: 't' }, d.name || npcName(d.npc)),
						h('div', { class: 's' }, `${loc?.name || ''} · nivel ${K.aiLevelFor(id)} · ${w ? `le has ganado ${w} ${w === 1 ? 'vez' : 'veces'}` : 'aún no le has ganado'} · tienes ${got}/${d.deck.length} de sus cartas`)));
			})));
		}
		sheet.set(body);
	};
	draw();
	return sheet;
}
