// Guardería Pokémon (pedido de Mario, 2026-10-28): dejas hasta dos Pokémon, suben de nivel con el tiempo real
// (hasta el tope de nivel) y, si son compatibles, aparece un huevo. El huevo se incuba combatiendo y sale al
// nivel 1 con posibilidad de habilidad oculta. Todo con datos canon: grupos huevo (`eggs`) y cadenas de evolución.
// Puro (sin DOM) para probarlo en Node: herramientas/test/guarderia-test.mjs.
import { D, toID, expForLevel } from './data.js';
import { G, boxInsert } from './state.js';
import { createPokemon, addExp, displayName } from './pokemon.js';

export const HOUR = 3600e3;
export const LEVEL_EVERY_H = 3;      // una subida de nivel cada 3 h reales
export const EGG_CHANCE_PER_H = 0.18; // probabilidad por hora de que aparezca un huevo (pareja compatible)
export const EGG_BATTLES = 12;        // combates para que eclosione
export const MAX_MONS = 2;

export function state(g = G) { return (g.dc ||= { mons: [], since: {}, egg: null, last: Date.now(), eggs: 0 }); }

/** Especie base de una línea (la primera que evoluciona hasta `sp`). */
export function baseOf(sp) {
	sp = toID(sp);
	let cur = sp, guard = 0;
	while (guard++ < 6) {
		const prev = Object.keys(D.species).find(id => (D.species[id].evos || []).includes(cur) && !D.species[id].forme);
		if (!prev) break;
		cur = prev;
	}
	return cur;
}

export function eggGroups(sp) { return D.species[toID(sp)]?.eggs || []; }

/** ¿Pueden tener huevo? Mismo grupo huevo (no Undiscovered) y sexos distintos, o uno es Ditto (y el otro no). */
export function compatible(a, b) {
	if (!a || !b) return { ok: false, why: 'Hacen falta dos.' };
	const ga = eggGroups(a.sp), gb = eggGroups(b.sp);
	const dittoA = a.sp === 'ditto', dittoB = b.sp === 'ditto';
	if (dittoA && dittoB) return { ok: false, why: 'Dos Ditto no se llevan bien.' };
	if (ga.includes('Undiscovered') && !dittoB) return { ok: false, why: `${displayName(a)} no puede tener huevos.` };
	if (gb.includes('Undiscovered') && !dittoA) return { ok: false, why: `${displayName(b)} no puede tener huevos.` };
	if (dittoA || dittoB) return { ok: true, parent: dittoA ? b : a };
	if (!ga.some(x => gb.includes(x))) return { ok: false, why: 'No son del mismo grupo huevo.' };
	if (!a.gender || !b.gender || a.gender === b.gender) return { ok: false, why: 'Hace falta un macho y una hembra (o un Ditto).' };
	return { ok: true, parent: a.gender === 'F' ? a : b };
}

/** Avanza el tiempo: niveles ganados y huevo. Devuelve { leveled: [{ p, from, to }], egg: bool }. */
export function tick(now = Date.now(), g = G, rnd = Math.random) {
	const st = state(g);
	const out = { leveled: [], egg: false };
	const hours = Math.max(0, (now - (st.last || now)) / HOUR);
	st.last = now;
	if (!hours) return out;
	const cap = g.vars?.cap || 100;
	for (const p of st.mons) {
		const h = (st.acc ||= {})[p.uid] = ((st.acc || {})[p.uid] || 0) + hours;
		let n = Math.floor(h / LEVEL_EVERY_H);
		if (n <= 0) continue;
		st.acc[p.uid] = h - n * LEVEL_EVERY_H;
		const from = p.lv;
		while (n-- > 0 && p.lv < cap) addExp(p, expForLevel(D.species[p.sp].growth, p.lv + 1) - p.exp);
		if (p.lv > from) out.leveled.push({ p, from, to: p.lv });
	}
	if (st.mons.length === 2 && !st.egg) {
		const c = compatible(st.mons[0], st.mons[1]);
		if (c.ok) {
			const pNo = 1 - Math.pow(1 - EGG_CHANCE_PER_H, Math.min(hours, 48));
			if (rnd() < pNo) {
				const sp = baseOf(c.parent.sp);
				st.egg = { sp, battles: 0, at: now, hidden: rnd() < 0.12, shinyRoll: rnd() };
				st.eggs = (st.eggs || 0) + 1;
				out.egg = true;
			}
		}
	}
	return out;
}

/** Un combate más para el huevo (lo llama el motor tras cada combate). Devuelve true si ya puede eclosionar. */
export function battleTick(g = G) {
	const st = state(g);
	if (!st.egg) return false;
	st.egg.battles++;
	return st.egg.battles >= EGG_BATTLES;
}
export const eggReady = (g = G) => !!state(g).egg && state(g).egg.battles >= EGG_BATTLES;

export function deposit(p, g = G) {
	const st = state(g);
	if (st.mons.length >= MAX_MONS) return 'La guardería solo cuida dos a la vez.';
	if (g.party.length <= 1) return 'Necesitas al menos un Pokémon en el equipo.';
	const i = g.party.indexOf(p);
	if (i < 0) return 'Ese Pokémon no está en tu equipo.';
	g.party.splice(i, 1);
	st.mons.push(p);
	st.since[p.uid] = Date.now();
	(st.from ||= {})[p.uid] = p.lv;
	return null;
}

/** Recoge: cuesta ₽100 por nivel ganado (mínimo ₽100). Devuelve { cost } o un texto de error. */
export function withdrawCost(p, g = G) { const st = state(g); const from = st.from?.[p.uid] ?? p.lv; return Math.max(100, 100 * Math.max(0, p.lv - from)); }
export function withdraw(p, g = G) {
	const st = state(g);
	const i = st.mons.indexOf(p);
	if (i < 0) return 'Ese Pokémon no está aquí.';
	const cost = withdrawCost(p, g);
	if (g.player.money < cost) return `Cuesta ${cost} y no te alcanza.`;
	g.player.money -= cost;
	st.mons.splice(i, 1);
	delete st.since[p.uid]; if (st.from) delete st.from[p.uid]; if (st.acc) delete st.acc[p.uid];
	if (g.party.length < 6) g.party.push(p); else boxInsert(g, p);
	return null;
}

/** Eclosiona el huevo: crea el Pokémon y lo mete en el equipo o en la PC. Devuelve el Pokémon. */
export function hatch(g = G, metAt = g.loc) {
	const st = state(g);
	if (!st.egg) return null;
	const e = st.egg;
	const mon = createPokemon(e.sp, { level: 1, hidden: e.hidden, ball: 'pokeball', metAt, happy: 120, minIVs: 2 });
	mon.metLv = 1; mon.egg = true;
	st.egg = null;
	if (g.party.length < 6) g.party.push(mon); else boxInsert(g, mon);
	return mon;
}
