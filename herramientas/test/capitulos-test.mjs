// Historias por capítulos (app/js/capitulos.js): motor (un capítulo por semana real, solo si está escrito) y
// simulación sin interfaz del capítulo 1 de Pueblo Cirio por sus tres ramas. Uso: node herramientas/test/capitulos-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G, evalCond, addItem } from '../../app/js/state.js';
import { runScript, runFirst, UI } from '../../app/js/guion.js';
import { createPokemon } from '../../app/js/pokemon.js';
import * as MJ from '../../app/js/minijuegos.js';
import { spotsOf, L } from '../../app/js/world.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);

let pick = 0, texts = [], errs = [];
const origErr = console.error; console.error = (...a) => { errs.push(a.join(' ')); };
Object.assign(UI, {
	say: async (n, t) => { texts.push(t); if (/undefined|\{[a-z]+\}|\[object/.test(t)) errs.push('marcador roto: ' + t.slice(0, 80)); },
	choose: async (p, opts) => Math.min(pick, opts.length - 1),
	prompt: async () => 'Bot', toast: () => {}, refresh: () => {}, goto: async id => { G.loc = id; G.visited[id] = true; },
	battle: async () => ({ result: 'win' }), receivePokemon: async () => {}, learnMove: async () => {}, nickname: async () => {},
	shop: async () => {}, center: async () => {}, pc: async () => {}, evolveCheck: async () => {},
	minigame: async P => MJ.autoPlay(P, { skill: MJ.NORMAL_SKILL, seed: 7 }),
});

const ok = (c, m) => { console.log((c ? '✔ ' : '✖ ') + m); if (!c) process.exitCode = 1; };
async function talkSpot(loc, labelRe) {
	G.loc = loc; G.visited[loc] = true;
	const s = spotsOf(L(loc)).find(x => labelRe.test(x.label) && (x.cond === undefined || evalCond(x.cond)));
	if (!s) { ok(false, `spot ${labelRe} visible en ${loc} (etapa ${G.quests.cirio_c1?.stage})`); return; }
	if (s.talk) { const v = s.talk.find(t => t.cond === undefined || evalCond(t.cond)); await runScript(v.script); }
	else if (s.script) await runScript(s.script);
	return s;
}
const isNew = (loc, re) => { const s = spotsOf(L(loc)).find(x => re.test(x.label) && (x.cond === undefined || evalCond(x.cond))); return s && s.new !== undefined && evalCond(s.new); };

for (const [riolu, choice] of [[true, 0], [false, 1], [true, 2]]) {
	console.log(`\n=== riolu ${riolu} · decisión ${choice} ===`);
	setG(newGame({ name: 'Prueba' }));
	G.flags.b04_fin = true; G.visited.iris = true; G.visited.malva = true;
	G.party = [createPokemon(riolu ? 'lucario' : 'feraligatr', { level: 55 })];
	if (riolu) G.vars.riolu_uid = G.party[0].uid;
	pick = 0;
	ok(evalCond(C.mail.find(m => m.id === 'cirio_carta').cond), 'la carta de Morti se puede recibir');
	await runScript('cirio_carta');
	ok(G.quests.cirio_c1?.stage === 'ir', 'carta → misión en «ir»');
	ok(isNew('malva', /camino del lago/), 'Malva: el camino del lago sale como nuevo');
	G.visited.senda_cirio = true;
	ok(!isNew('malva', /camino del lago/), 'Malva: deja de ser nuevo al pisar la senda');
	await runScript('cirio_mojon');
	await runScript('cirio_llegada'); G.visited.pueblo_cirio = true;
	ok(G.quests.cirio_c1.stage === 'vecinos' && G.flags.cirio_llegada, 'llegada → vecinos');
	ok(isNew('pueblo_cirio', /Posada/) && isNew('pueblo_cirio', /muelle/) && isNew('pueblo_cirio', /faro/) && isNew('pueblo_cirio', /cerería/), 'los 4 sitios salen como nuevos');
	await talkSpot('posada_cirio', /^Consuelo/);
	ok(G.bag.cintaposada > 0, 'cinta recibida');
	await talkSpot('muelle_cirio', /^Don Hilario/);
	await talkSpot('faro_cirio', /^Abril/);
	ok(G.quests.cirio_c1.stage === 'vecinos', 'con 3 testigos sigue en vecinos');
	await talkSpot('cereria_cirio', /^Benigna/);
	ok(G.quests.cirio_c1.stage === 'noche' && G.vars.cirio_testigos === 4, '4 testigos → noche');
	ok(isNew('pueblo_cirio', /Posada/) && !isNew('pueblo_cirio', /faro/), 'posada nueva, faro ya no');
	await talkSpot('posada_cirio', /dormir/);
	ok(G.quests.cirio_c1.stage === 'muelle' && !G.bag.cintaposada, 'noche → muelle, sin cinta');
	ok(isNew('muelle_cirio', /fila de velas/), 'la fila de velas sale como nueva');
	await talkSpot('muelle_cirio', /fila de velas/);
	ok(G.quests.cirio_c1.stage === 'rastro' && G.bag.velacirio && G.bag.cintaposada, 'velas → rastro, vela y cinta en la mochila');
	await talkSpot('muelle_cirio', /gotas de cera/);
	ok(G.quests.cirio_c1.stage === 'vela' && G.bag.pabilocirio, 'rastro → vela, pabilo');
	pick = choice;
	await talkSpot('muelle_cirio', /Tu vela/);
	const fl = ['cirio_c1_costumbre', 'cirio_c1_prueba', 'cirio_c1_guardia'];
	ok(G.flags[fl[choice]] && fl.filter(f => G.flags[f]).length === 1, 'decisión guardada: ' + fl[choice]);
	ok(!!G.bag.velacirio === (choice === 1), 'la vela solo se queda en la mochila si es prueba');
	ok(G.quests.cirio_c1.done && G.flags.cirio_c1_fin && G.bag.duskstone && G.bag.spelltag, 'misión hecha y premio');
	ok(evalCond("capituloHecho('cirio', 1)") && !evalCond("capitulo('cirio', 2)"), 'capítulo 1 hecho, 2 cerrado');
	ok(!spotsOf(L('muelle_cirio')).some(s => !s.gather && !s.action?.gather && s.new !== undefined && (s.cond === undefined || evalCond(s.cond)) && evalCond(s.new)), 'muelle sin novedades de historia al acabar');
	const t0 = texts.length;
	await talkSpot('pueblo_cirio', /plaza/);
	ok(texts.slice(t0).some(t => /capítulo 2/i.test(t)), 'la plaza dice cuándo llega el capítulo 2: ' + texts.slice(-1)[0]);
	for (const [loc, re] of [['posada_cirio', /^Consuelo/], ['muelle_cirio', /^Don Hilario/], ['faro_cirio', /^Abril/], ['cereria_cirio', /^Benigna/]]) {
		const n = texts.length; await talkSpot(loc, re); ok(texts.length > n, `${loc}: después del capítulo dice algo`);
	}
}
ok(!errs.length, 'sin errores: ' + errs.slice(0, 3).join(' | '));

// --- Motor: liberación semanal ---
{
	const CP = await import('../../app/js/capitulos.js');
	const S = await import('../../app/js/state.js');
	setG(newGame({ name: 'Motor' }));
	const def = C.serials.cirio, DAY = 864e5, t = Date.UTC(2026, 10, 1);
	ok(def && def.written >= 1 && def.chapters.length >= 5, `serial con ${def.chapters.length} capítulos planeados y ${def.written} escrito`);
	ok(S.serialOpen('cirio', 1, t) && !S.serialOpen('cirio', 2, t), 'el capítulo 1 está abierto; el 2 no');
	ok(CP.finishChapter('cirio', 1, t) && !CP.finishChapter('cirio', 1, t + DAY), 'terminar un capítulo cuenta una vez');
	const old = def.written; def.written = 2;
	ok(!S.serialOpen('cirio', 2, t + 6 * DAY), 'a los 6 días el capítulo 2 aún no llega');
	ok(S.serialOpen('cirio', 2, t + 7 * DAY), 'a los 7 días llega (si está escrito)');
	def.written = old;
	ok(!S.serialOpen('cirio', 2, t + 30 * DAY), 'sin escribir no se abre aunque pase el tiempo');
	ok(/actualización/.test(CP.waitText('cirio', t + 30 * DAY)), 'pasado el plazo sin escribir, avisa de que llegará con una actualización');
	ok(/llegará el/.test(CP.waitText('cirio', t + DAY)), 'antes del plazo, dice la fecha');
	ok(CP.nextChapter('cirio', t).n === 2 && CP.lastDone('cirio') === 1, 'siguiente capítulo: el 2');
}
console.log(process.exitCode ? '\n✖ Capítulos: hay fallos' : '\n✔ Capítulos: todo bien');
