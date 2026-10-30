// Intérprete de guiones (diálogos, decisiones, combates, recompensas...).
// Formato de comandos: ver docs/CONTENIDO.md
import { D, toID } from './data.js';
import { C, npc } from './content.js';
import { G, evalCond, setPath, addItem, removeItem, count, markCaught, saveGame, beginScene, endScene, commitScene, addHito } from './state.js';
import { createPokemon, displayName, healFull, addHappy, maxHp } from './pokemon.js';
import { uniqueKeyOf, uniqueResult } from './unicos.js';
import * as MJ from './minijuegos.js';
import { questHangs } from './hub.js';

/**
 * Al terminar un bloque, las historias de personaje de ese bloque que ningún guion publicado puede avanzar
 * se cierran solas (pedido de Mario, 2026-10-28: «historias abiertas que me confunden»). Quedan marcadas
 * para reabrirse si un bloque futuro las retoma.
 */
export function closeHangingThreads(block) {
	let n = 0;
	for (const id in G.quests) {
		const q = G.quests[id], def = C.quests[id];
		if (!def || !id.startsWith(block + '_') || def.type !== 'thread' || q.done) continue;
		let hangs = false;
		try { hangs = questHangs(id); } catch (e) { hangs = false; }
		if (!hangs) continue;
		q.done = true; q.autoClosed = true; q.finished = Date.now(); q.stage = q.stage || 'hecha';
		n++;
	}
	if (n) UI.toast?.(`📔 Rotom archivó ${n} ${n === 1 ? 'historia que ya no seguía' : 'historias que ya no seguían'}`, 'quest');
	return n;
}

export const UI = {}; // lo rellena la interfaz: say, choose, battle, toast, prompt, refresh, goto, receivePokemon, learnMove, nickname

class Abort extends Error {}

/** Sustituye marcadores en textos: {jugador}, {riolu}, {o|a|e} según pronombres, {dinero}, {vars.x}, {item:id}. */
export function tx(s) {
	if (!s) return '';
	const pron = G?.player?.pron || 'el';
	const pi = pron === 'ella' ? 1 : pron === 'elle' ? 2 : 0;
	return String(s)
		.replace(/\{jugador\}/g, G?.player?.name || '')
		.replace(/\{riolu\}/g, () => {
			const p = findRiolu();
			return p ? displayName(p) : 'Riolu';
		})
		.replace(/\{dinero\}/g, () => '₽' + (G?.player?.money || 0))
		.replace(/\{vars\.(\w+)\}/g, (m, k) => String(G?.vars?.[k] || 0))
		.replace(/\{item:(\w+)\}/g, (m, k) => D.items[k]?.name || k)
		.replace(/\{([^{}|]*)\|([^{}|]*)\|([^{}|]*)\}/g, (m, a, b, c) => [a, b, c][pi]);
}

export function findRiolu() {
	const uid = G?.vars?.riolu_uid;
	if (!uid) return null;
	return G.party.find(p => p.uid === uid) || G.boxes.flat().find(p => p.uid === uid) || null;
}

/** Candela, la Mareep de Don Aurelio (o lo que sea ahora), si va en el equipo. */
export function findCandela() {
	if (!G?.flags?.b01_candela_unida) return null;
	return G.party.find(p => p.nick === 'Candela' && ['mareep', 'flaaffy', 'ampharos'].includes(D.species[p.sp]?.base ? toID(D.species[p.sp].base) : p.sp)) || null;
}

function findMon(who) {
	if (!who) return G.party[0];
	if (who === 'riolu') return findRiolu();
	if (who === 'candela') return findCandela();
	if (/^party\d$/.test(who)) return G.party[+who.slice(5)];
	const id = toID(who);
	return G.party.find(p => p.sp === id || D.species[p.sp]?.base === id) || G.party.find(p => p.uid === who);
}

export async function runScript(idOrCmds, ctx = {}) {
	const cmds = typeof idOrCmds === 'string' ? C.scripts[idOrCmds] : idOrCmds;
	if (typeof idOrCmds === 'string') UI.onScript?.(idOrCmds);
	if (!cmds) { console.warn('Guion inexistente', idOrCmds); return; }
	beginScene();
	try {
		await runList(cmds, ctx);
	} catch (e) {
		if (!(e instanceof Abort)) { console.error(e); UI.toast?.('Error en guion: ' + e.message); }
	} finally {
		endScene();
		UI.refresh?.();
	}
}

async function runList(list, ctx) {
	for (const c of list) {
		if (ctx.ended) return;
		await runCmd(c, ctx);
	}
}

async function runCmd(c, ctx) {
	if (typeof c === 'string') { await UI.say(null, tx(c)); return; }
	if (c.cond !== undefined && !evalCond(c.cond)) return;

	if (c.say !== undefined) {
		const n = c.say === 'jugador' ? { name: G.player.name, portrait: 'jugador' } : c.say ? npc(c.say) : null;
		await UI.say(n ? { id: c.say, ...n, name: tx(c.as || n.name) } : null, tx(c.text), c);
		return;
	}
	if (c.text !== undefined) { await UI.say(null, tx(c.text), c); return; }
	if (c.choice) {
		const opts = c.choice.filter(o => o.cond === undefined || evalCond(o.cond));
		const i = await UI.choose(c.prompt ? tx(c.prompt) : null, opts.map(o => tx(o.text)), c);
		const o = opts[i];
		if (o?.then) await runList(o.then, ctx);
		return;
	}
	if (c.if !== undefined) {
		if (evalCond(c.if)) { if (c.then) await runList(c.then, ctx); } else if (c.else) await runList(c.else, ctx);
		return;
	}
	if (c.daycare) { await UI.daycare?.(); return; }
	if (c.torneo) { await UI.torneo?.(); return; }
	if (c.set) {
		for (const k in c.set) setPath(k, c.set[k]);
		for (const k in c.set) { const m = /^flag\.(b\d\d)_fin$/.exec(k); if (m && c.set[k]) closeHangingThreads(m[1]); }
		return;
	}
	if (c.rep) { for (const k in c.rep) setPath('rep.' + k, (c.rep[k] >= 0 ? '+' : '') + c.rep[k]); return; }
	if (c.af) {
		for (const k in c.af) setPath('af.' + k, (c.af[k] >= 0 ? '+' : '') + c.af[k]);
		return;
	}
	if (c.give) {
		const n = c.n || 1;
		addItem(c.give, n);
		const it = D.items[toID(c.give)];
		if (!c.silent) await UI.say(null, `¡${G.player.name} ha obtenido **${it?.name || c.give}**${n > 1 ? ' ×' + n : ''}!`, { jingle: 'item' });
		return;
	}
	if (c.take) { removeItem(c.take, c.n || 1); return; }
	if (c.money !== undefined) {
		G.player.money = Math.max(0, G.player.money + c.money);
		if (!c.silent) await UI.say(null, c.money >= 0 ? `¡Has recibido ₽${c.money}!` : `Has pagado ₽${-c.money}.`);
		return;
	}
	if (c.pokemon) {
		const o = c.pokemon;
		const p = createPokemon(o.sp, { ot: G.player.name, metAt: G.loc, ...o, level: o.level ?? o.lv });
		if (o.uidVar) G.vars[o.uidVar] = p.uid;
		markCaught(p.sp);
		await UI.receivePokemon(p, { silent: c.silent, nickname: c.nickname !== false });
		return;
	}
	if (c.battle) {
		const res = await UI.battle({ trainer: c.battle, canLose: c.lose === 'continue' || !!c.onLose });
		ctx.lastBattle = res;
		if (res.result === 'win') { if (c.onWin) await runList(c.onWin, ctx); }
		else if (c.onLose) await runList(c.onLose, ctx);
		else if (res.result === 'lose' && c.lose !== 'continue') throw new Abort();
		return;
	}
	if (c.wild) {
		const res = await UI.battle({ wild: c.wild, canRun: c.canRun !== false, canLose: !!c.onLose || c.lose === 'continue' });
		ctx.lastBattle = res;
		{ const uk = uniqueKeyOf(c.wild); if (uk) uniqueResult(uk, res.result); }
		if (res.result === 'caught' && c.onCatch) await runList(c.onCatch, ctx);
		else if ((res.result === 'win' || res.result === 'caught') && c.onWin) await runList(c.onWin, ctx);
		else if (res.result === 'run' && c.onRun) await runList(c.onRun, ctx);
		else if (res.result === 'lose') { if (c.onLose) await runList(c.onLose, ctx); else if (c.lose !== 'continue') throw new Abort(); }
		return;
	}
	if (c.heal) {
		for (const p of G.party) healFull(p);
		if (!c.silent) await UI.say(null, c.heal === true ? 'Tu equipo ha recuperado todas sus fuerzas.' : tx(c.heal));
		return;
	}
	if (c.go) { await UI.goto(c.go, { silent: c.silent }); return; }
	if (c.quest) {
		const q = (G.quests[c.quest] ||= { stage: '', started: Date.now() });
		if (q.done && q.autoClosed && c.stage && !c.done) { q.done = false; delete q.autoClosed; } // la cerró Rotom al acabar el bloque; la historia sí sigue
		if (q.done) return; // una misión terminada no se reabre ni se vuelve a completar
		const def = C.quests[c.quest];
		const isNew = !q.stage && !q.done;
		const changed = !!c.done || isNew || (c.stage && c.stage !== q.stage);
		if (c.stage && c.stage !== q.stage) { q.stage = c.stage; (q.hist ||= []).push({ s: c.stage, t: Date.now() }); }
		if (c.done) { q.done = true; q.stage = c.stage || q.stage || 'hecha'; q.finished = Date.now(); }
		if (!c.silent && def) {
			if (c.done) UI.toast?.(`✔ Misión completada: ${def.name}`, 'quest');
			else if (isNew) UI.toast?.(`📜 Nueva misión: ${def.name}`, 'quest');
			else if (changed) UI.toast?.(`📜 ${def.name}: actualizada`, 'quest');
		}
		return;
	}
	if (c.diary) {
		// Cada entrada guarda su «foto»: el lugar, quién iba delante y si era shiny (álbum del Diario, 2026-10-28)
		G.diary.push({ t: Date.now(), text: tx(c.diary), loc: G.loc, lead: G.party?.[0]?.sp, shiny: !!G.party?.[0]?.shiny });
		if (!c.silent) UI.toast?.('📔 Nueva entrada en el Diario', 'diary');
		return;
	}
	if (c.intel) {
		const k = c.intel.npc;
		(G.intel[k] ||= { notes: [], teams: {} }).notes.push({ t: Date.now(), text: tx(c.intel.text) });
		if (!c.silent) UI.toast?.(`📁 Expediente actualizado: ${npc(k).name}`, 'intel');
		return;
	}
	if (c.badge) {
		if (!G.player.badges.includes(c.badge)) { G.player.badges.push(c.badge); addHito(); }
		const b = C.badges[c.badge];
		await UI.say(null, `¡${G.player.name} ha recibido la **${b?.name || c.badge}**!`, { jingle: 'badge', badge: c.badge });
		return;
	}
	if (c.cap !== undefined) { if (c.cap > (G.vars.cap ?? 0)) addHito(); G.vars.cap = c.cap; return; }
	if (c.call) { UI.onScript?.(c.call); await runList(C.scripts[c.call] || [], ctx); return; }
	if (c.end) { ctx.ended = true; return; }
	if (c.notice) { UI.toast?.(tx(c.notice)); return; }
	if (c.toast) { UI.toast?.(tx(c.toast)); return; }
	if (c.scene !== undefined) { UI.scene?.(c.scene); return; }
	if (c.wait) { await new Promise(r => setTimeout(r, c.wait)); return; }
	if (c.happy) {
		const p = findMon(c.happy.who);
		if (p) addHappy(p, c.happy.n || 10);
		return;
	}
	if (c.learn) {
		const p = findMon(c.learn.who);
		if (p) await UI.learnMove(p, toID(c.learn.move), { force: c.learn.force });
		return;
	}
	if (c.forceEvolve) {
		const p = findMon(c.forceEvolve.who);
		if (p && p.sp !== toID(c.forceEvolve.to)) await UI.forceEvolve(p, toID(c.forceEvolve.to));
		return;
	}
	if (c.unlock) { G.flags['mec_' + c.unlock] = true; return; }
	if (c.shop) { await UI.shop(c.shop); return; }
	if (c.save) { commitScene(); await saveGame(); return; }
	if (c.evolveCheck) { await UI.evolveCheck?.(); return; }
	if (c.nickname) { const p = c.nickname === 'last' ? G.party[G.party.length - 1] : findMon(c.nickname); if (p) await UI.nickname(p); return; }
	if (c.center) { await UI.center?.(); return; }
	if (c.pc) { await UI.pc?.(); return; }
	if (c.mapUnlock) { G.flags['map_' + c.mapUnlock] = true; return; }
	if (c.clearRoute) { G.cleared[c.clearRoute] = true; return; }
	if (c.cutscene) { await UI.cutscene?.(c.cutscene); return; }
	// Carta o nota en papel a pantalla completa: { read: 'idObjeto' } o { read: { title, text } }
	if (c.read) {
		const it = typeof c.read === 'string' ? D.items[toID(c.read)] : null;
		// { read: { title, gen: 'muro' } }: el texto lo genera el motor con la partida (app/js/atico.js)
		const gen = c.read?.gen ? (await import('./atico.js')).genText(c.read.gen, G) : '';
		const title = tx(it?.name || c.read.title || 'Nota'), text = tx(it?.read || c.read.text || gen || '');
		if (UI.read) await UI.read(title, text, typeof c.read === 'string' ? toID(c.read) : null); else await UI.say(null, text);
		return;
	}
	// Negocios: { venture: 'id' } abre su ficha; { venture: 'id', join: true } te hace socio sin pagar la entrada
	if (c.venture) {
		if (c.join && !G.neg?.[c.venture]?.owned) { const { joinVenture, ventureDef } = await import('./negocios.js'); const d = ventureDef(c.venture); if (d) { const cost = d.buy?.cost || 0; G.player.money += cost; joinVenture(c.venture); } }
		if (!c.join || c.open) await UI.venture?.(c.venture);
		return;
	}
	if (c.puzzle) {
		// Puzle de rejilla (ver app/js/puzle.js y docs/CONTENIDO.md). Sin interfaz que lo juegue, cuenta como resuelto.
		const res = UI.puzzle ? await UI.puzzle(c.puzzle) : { result: 'solved', moves: 0 };
		ctx.lastPuzzle = res;
		if (res.result === 'solved') {
			if (c.puzzle.id) { const pz = ((G.puzzles ||= {})[c.puzzle.id] ||= { best: null, n: 0 }); pz.n++; pz.t = Date.now(); if (pz.best === null || res.moves < pz.best) pz.best = res.moves; }
			if (c.onSolve) await runList(c.onSolve, ctx);
		} else if (c.onQuit) await runList(c.onQuit, ctx);
		return;
	}
	if (c.photo) {
		// Fotografía (app/js/foto.js): minijuego de enfoque; sin interfaz cuenta como ganado con 2 estrellas
		const FT = await import('./foto.js');
		const def = FT.photoDef(c.photo);
		if (!def) return;
		const res = UI.photo ? await UI.photo({ id: c.photo, def, level: c.level || 2 }) : FT.skipFocus();
		ctx.lastPhoto = res;
		if (res.ok) FT.takePhoto(c.photo, res.q);
		const next = res.ok ? c.onWin : c.onLose;
		if (next) await runList(next, ctx);
		return;
	}
	if (c.rival) {
		// Rival que aprende (app/js/rival.js): saludo con memoria, preparar el equipo y apuntar el resultado
		const RX = await import('./rival.js');
		const who = { id: RX.RX.npc, ...npc(RX.RX.npc) };
		if (c.rival === 'saludo') { for (const t of RX.greetLines()) await UI.say(who, tx(t)); return; }
		if (c.rival === 'prep') { RX.prepare(); return; }
		if (c.rival === 'gana' || c.rival === 'pierde') {
			const res = c.rival === 'gana' ? 'win' : 'lose';
			const r = RX.record(res);
			await UI.say(who, tx(RX.afterLine(res, r.tierUp)));
			return;
		}
		return;
	}
	if (c.race) {
		// Carreras de monturas (app/js/carreras.js): sin interfaz, la corre sola con la mejor montura y saltos normales
		const CR = await import('./carreras.js');
		if (!CR.raceDef(c.race)) return;
		let res;
		if (UI.race) res = await UI.race(c.race);
		else {
			const m = CR.mountsFor(c.race)[0];
			const run = CR.autoRun(c.race, m.id, 2, 'auto' + (CR.raceState(c.race).runs || 0));
			res = CR.finishRace(c.race, m.id, run.mine, run.rivals);
		}
		ctx.lastRace = res;
		const next = res && !res.quit ? (res.pos === 1 ? c.onWin : c.onLose) : null;
		if (next) await runList(next, ctx);
		return;
	}
	if (c.photoSell) {
		const FT = await import('./foto.js');
		const r = FT.sellPhotos();
		ctx.lastSale = r;
		const next = r.n ? c.onSale : c.onNone;
		if (r.n) await UI.say(null, `La Gaceta compra ${r.n} ${r.n === 1 ? 'foto' : 'fotos'}: **₽${r.money.toLocaleString('es-MX')}**` + (Object.keys(r.items).length ? ' y ' + Object.entries(r.items).map(([k, n]) => `**${D.items[k]?.name || k}**${n > 1 ? ' ×' + n : ''}`).join(', ') : '') + '.');
		if (next) await runList(next, ctx);
		return;
	}
	if (c.minigame) {
		// Minijuego para conseguir objetos (ver app/js/minijuegos.js y docs/MINIJUEGOS.md). Sin interfaz que lo juegue, cuenta como ganado.
		const P = MJ.prepare({ def: { ...c.minigame, title: tx(c.minigame.title), hint: tx(c.minigame.hint) }, G, cond: evalCond });
		const res = UI.minigame ? await UI.minigame(P) : MJ.skipResult(P);
		ctx.lastMinigame = res;
		const { items, consol } = MJ.settle(G, P, res);
		const list = Object.entries(items).map(([id, n]) => ({ id, n, fresh: !G.found?.[id] }));
		for (const it of list) addItem(it.id, it.n);
		if (res.result !== 'quit' && (list.length || !res.wild)) {
			const title = res.result === 'win' ? (c.minigame.lootTitle || '¡Botín!') : 'Otra vez será';
			const text = res.result === 'win' ? '' : consol ? 'No ha salido, pero no te vas con las manos vacías.' : 'Esta vez no ha salido nada.';
			if (list.length || res.result === 'lose') {
				if (UI.minigameLoot) await UI.minigameLoot({ title, text, items: list });
				else await UI.say(null, (text ? text + '\n' : '') + list.map(it => `**${D.items[it.id]?.name || it.id}**${it.n > 1 ? ' ×' + it.n : ''}`).join(' · '));
			}
		}
		// Pesca: lo que ha picado era un Pokémon salvaje
		if (res.result === 'win' && res.wild) {
			const b = await UI.battle({ wild: { sp: res.wild.sp, lv: res.wild.lv, unique: false }, canRun: true, canLose: true });
			ctx.lastBattle = b;
		}
		const next = res.result === 'win' ? c.onWin : res.result === 'lose' ? c.onLose : c.onQuit;
		if (next) await runList(next, ctx);
		return;
	}
	if (c.input) {
		const v = await UI.prompt(tx(c.input.text), c.input.default || '');
		if (c.input.var) G.vars[c.input.var] = v;
		return;
	}
	console.warn('Comando desconocido', c);
}

/** Ejecuta el primer guion cuya condición se cumpla (para NPCs con varias conversaciones). */
export async function runFirst(variants, ctx) {
	for (const v of variants) {
		if (v.cond === undefined || evalCond(v.cond)) {
			await runScript(v.script || v.do, ctx);
			return true;
		}
	}
	return false;
}
