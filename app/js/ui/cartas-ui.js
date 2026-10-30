// Cuadrante (juego de cartas): partida, colección y mazo. Lógica en ../cartas.js.
import { C } from '../content.js';
import { G, saveGame } from '../state.js';
import { D, typeStyle, typeName, itemName } from '../data.js';
import { tx } from '../guion.js';
import { monImg } from '../art.js';
import { h, fmtText, openSheet, portraitFor, toast } from './core.js';
import * as K from '../cartas.js';

const npcName = id => C.npcs[id]?.name || id;
const sleep = ms => new Promise(r => setTimeout(r, ms));

/** Etiqueta de tipo: la izquierda (principal) es la que ataca; la derecha (secundario) solo cuenta al defender. */
const typeTag = (t, k) => { const ts = typeStyle(t); return h('span', { class: 'cq-type ' + k, style: `background:${ts.background};color:${ts.color}` }, typeName(t).slice(0, 3)); };

/** Carta dibujada: sprite, 4 valores y sus tipos (los dos, también en la mano: 2026-10-30). owner: 'me' | 'foe' | null. */
export function cardEl(c, { owner = null, small = false, onclick = null, sel = false, count = 0, dim = false, bonus = false } = {}) {
	const el = h(onclick ? 'button' : 'div', {
		class: 'cq-card' + (small ? ' sm' : '') + (owner ? ' ' + owner : '') + (sel ? ' sel' : '') + (dim ? ' dim' : '') + (bonus ? ' weak' : ''),
		'aria-label': `${c.name}: arriba ${c.up}, derecha ${c.right}, abajo ${c.down}, izquierda ${c.left}, tipo ${c.types.map(typeName).join(' y ')}` + (bonus ? '. Tu carta elegida le gana por tipo: +1' : ''),
		onclick,
	},
	typeTag(c.types[0], 't1'), c.types[1] ? typeTag(c.types[1], 't2') : null,
	bonus ? h('span', { class: 'cq-bonus' }, '+1') : null,
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
	'• **Mandan los números.** Al poner una carta, mira a sus vecinas del rival: si tu número de ese lado es **mayor** que el suyo del lado que se toca, esa carta **pasa a ser tuya**. Si empatan, no pasa nada.\n' +
	'• **El tipo solo suma +1, y solo al atacar.** Cuenta el tipo **principal** de tu carta (la etiqueta de la izquierda) contra **los dos** tipos de la rival, como en combate. Defender no da bonus.\n' +
	'• *Ejemplo:* tu carta de Fuego tiene 6 a la derecha y la rival de Planta tiene 6 a la izquierda. Empate… pero Fuego le gana a Planta, así que cuenta 7 y la giras.\n' +
	'• Al elegir una carta de tu mano, las casillas dicen cuántas cartas girarías ahí, y las rivales a las que les ganas por tipo llevan un **+1**.\n' +
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
		let selH = null, busy = false, gone = false; // gone: te levantaste (corta el turno del rival en curso)
		const box = h('div', { class: 'cq-body' });
		const ov = h('div', { class: 'overlay ft-ov', role: 'dialog', 'aria-label': 'Cuadrante' }, h('div', { class: 'ft-box cq-box' }, box));
		document.body.append(ov);
		const close = r => { ov.remove(); resolve(r); };
		// Confirmación propia, por encima de la mesa (la general quedaba tapada detrás del tablero: queja del 2026-10-30).
		const askQuit = () => {
			const ask = h('div', { class: 'overlay dim cq-ask', role: 'dialog', 'aria-label': 'Salir de la partida' },
				h('div', { class: 'ft-box' }, h('div', { class: 'cr-text' }, '¿Te levantas de la mesa? La partida no cuenta: ni ganas ni pierdes nada.'),
					h('div', { class: 'ft-btns' },
						h('button', { class: 'btn', onclick: () => ask.remove() }, 'Seguir jugando'),
						h('button', { class: 'btn primary', onclick: () => { ask.remove(); gone = true; close({ quit: true }); } }, 'Levantarme'))));
			document.body.append(ask);
		};
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
			const selC = selH !== null && m.turn === 'me' ? m.hand.me[selH] : null;
			const board = h('div', { class: 'cq-board', 'data-noswipe': '' }, ...m.board.map((b, i) => {
				if (b) { const e = cardEl(b.c, { owner: b.owner, bonus: !!(selC && b.owner === 'foe' && K.typeBonus(selC, b.c)) }); if (flash.includes(i)) e.classList.add('flip'); return e; }
				const n = selC ? K.wouldFlip(m, selC, i, 'me').length : 0;
				return h('button', { class: 'cq-cell' + (selC ? ' can' : '') + (n ? ' gain' : ''), 'aria-label': 'Casilla ' + (i + 1) + (n ? `: giras ${n}` : ''), disabled: busy || !selC, onclick: () => mine_(i) },
					n ? h('span', { class: 'cq-gain' }, n === 1 ? 'Gira 1' : `Gira ${n}`) : null);
			}));
			const myHand = h('div', { class: 'cq-hand me' }, ...m.hand.me.map((c, k) => c ? cardEl(c, { owner: 'me', small: true, sel: selH === k, onclick: busy || m.turn !== 'me' ? null : () => { selH = selH === k ? null : k; draw(); } }) : h('div', { class: 'cq-slot sm' })));
			box.replaceChildren(head, foeHand, board, myHand, msg,
				h('div', { class: 'ft-btns' }, h('button', { class: 'btn', onclick: () => { if (gone) return; askQuit(); } }, 'Salir'),
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
				if (gone) return;
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
			if (gone) return;
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
