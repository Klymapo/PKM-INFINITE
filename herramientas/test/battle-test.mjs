import { loadDataNode } from './node-env.mjs';
import { newGame, G, addItem } from '../../app/js/state.js';
import { createPokemon } from '../../app/js/pokemon.js';
import { BattleCtl, buildTrainerTeam } from '../../app/js/battle.js';
loadDataNode();
newGame({ name: 'Mario' });
G.party.push(createPokemon('riolu', { level: 12, moves: ['quickattack', 'metalclaw', 'counter', 'forcepalm'] }));
G.party.push(createPokemon('fennekin', { level: 11 }));
addItem('potion', 3); addItem('pokeball', 5);
const print = r => { for (const e of r.events) if (e.t === 'text') console.log('  ' + e.s); else if (e.t !== 'hp') console.log('   [' + e.t + ' ' + (e.side || '') + (e.info ? ' ' + e.info.name + ' ' + e.info.hp + '/' + e.info.maxhp : '') + ']'); };
// Combate contra entrenador
const brock = { id: 'brock', name: 'Brock', cls: 'Líder', ai: 4, items: [{ id: 'superpotion', n: 1 }], team: [
	{ sp: 'geodude', lv: 12, moves: ['rocktomb', 'defensecurl', 'rollout', 'rockpolish'] },
	{ sp: 'onix', lv: 14, moves: ['rocktomb', 'bind', 'sandstorm', 'smackdown'], ability: 'sturdy' }] };
const { createPokemon: cp } = await import('../../app/js/pokemon.js');
const ctl = new BattleCtl({ kind: 'trainer', foes: buildTrainerTeam(brock, cp), trainer: brock, terrain: 'gym' });
print({ events: ctl.start() });
let r;
for (let i = 0; i < 30; i++) {
	const o = ctl.options();
	let a;
	if (o.forceSwitch) a = { type: 'switch', idx: o.switches.findIndex(s => !s.fainted && !s.active) };
	else if (i === 2) a = { type: 'item', item: 'potion', uid: G.party[0].uid };
	else a = { type: 'move', i: Math.max(0, o.moves.findIndex(m => m.id === 'forcepalm')) };
	console.log('> ' + JSON.stringify(a));
	r = ctl.turn(a);
	print(r);
	if (r.error) console.log('ERROR', r.error);
	if (r.ended) break;
}
const sum = ctl.finish();
console.log('RESULT', sum.result, 'money', sum.money, 'party', G.party.map(p => p.sp + ' L' + p.lv + ' ' + p.hp + 'hp exp' + p.exp));
// Salvaje + captura
for (const p of G.party) { p.hp = 40; p.status=''; }
const wild = createPokemon('fletchling', { level: 6 });
const w = new BattleCtl({ kind: 'wild', foes: [wild], terrain: 'grass' });
print({ events: w.start() });
for (let i = 0; i < 10; i++) {
	const rr = w.turn(i < 1 ? { type: 'move', i: 0 } : { type: 'ball', ball: 'pokeball' });
	print(rr); if (rr.error) console.log('ERR', rr.error);
	if (rr.ended) { console.log('END', rr.result); break; }
}
console.log(w.finish().result, w.caught && w.caught.sp);

// ---------- Dinamax y Gigamax (B7, paso 5) ----------
// 1) Los rivales con gimmick 'dynamax' dinamaxizan de verdad, y los que llevan gmax: true gigamaxizan.
// 2) El Dinamax del jugador solo se ofrece en Galar o en un encuentro de Fisura (biblia §3.3.1).
// 3) El comando { gmax } (Sopa Maxi) pone el factor Gigamax y gasta las Maxisetas.
{
	const { C, registerBlock } = await import('../../app/js/content.js');
	const { dynamaxAllowed } = await import('../../app/js/battle.js');
	const { runScript, UI } = await import('../../app/js/guion.js');
	const { count } = await import('../../app/js/state.js');
	const mod = await import('../../app/content/index.js');
	for (const b of mod.BLOCKS) registerBlock(b);
	if (!C.blocks.some(b => b.id === 'b07')) registerBlock((await import('../../app/content/b07/index.js')).default);
	let fails = 0;
	const ok = (c, m) => { console.log((c ? '  ✔ ' : '  ✖ ') + m); if (!c) fails++; };
	// Rival: as delante, el jugador solo se protege. ¿Dinamaxiza el as y con qué forma?
	const probar = (def, { gmaxEsperado }) => {
		const team = [...def.team].sort((a, b) => (b.sp === def.ace) - (a.sp === def.ace));
		const t = { ...def, team };
		G.party.length = 0;
		G.party.push(createPokemon('blissey', { level: 100, moves: ['protect', 'softboiled', 'splash', 'growl'] }));
		G.loc = 'artejo';
		const c = new BattleCtl({ kind: 'trainer', foes: buildTrainerTeam(t, cp), trainer: t, terrain: 'gym', loc: 'artejo', seed: [1, 2, 3, 4] });
		const evs = [...c.start()];
		for (let i = 0; i < 4; i++) { const r = c.turn({ type: 'move', i: i % 2 ? 2 : 0 }); evs.push(...r.events); if (r.ended) break; }
		const d = evs.find(e => e.t === 'dyn' && e.side === 'p2' && e.on);
		ok(!!d, `${def.id}: su as (${def.ace}) dinamaxiza`);
		if (gmaxEsperado) ok(!!d?.gmax, `${def.id}: gigamaxiza (forma Gigamax)`);
		else ok(d && !d.gmax, `${def.id}: Dinamax sin forma Gigamax`);
	};
	for (const id of ['rhi_7', 'percy_g', 'roy_g', 'olivia_1', 'torneo_r3']) {
		const def = C.trainers[id];
		if (!def) { ok(false, `${id}: no existe`); continue; }
		probar(def, { gmaxEsperado: !!def.team.find(m => m.sp === def.ace)?.gmax });
	}
	// El Drednaw de prueba de la Maximuñequera (T0): salvaje con Dinamax
	{
		G.party.length = 0;
		G.party.push(createPokemon('blissey', { level: 100, moves: ['protect', 'softboiled', 'splash', 'growl'] }));
		const wd = createPokemon('drednaw', { level: 66, moves: ['liquidation', 'rockslide', 'jawlock', 'bodyslam'] });
		const c = new BattleCtl({ kind: 'wild', foes: [wd], terrain: 'water', loc: 'casa_magnolia', wildGimmick: 'dynamax', noCatch: true, seed: [5, 6, 7, 8] });
		const evs = [...c.start()];
		for (let i = 0; i < 3; i++) { const r = c.turn({ type: 'move', i: 0 }); evs.push(...r.events); if (r.ended) break; }
		ok(evs.some(e => e.t === 'dyn' && e.side === 'p2' && e.on), 'Drednaw de prueba (T0): dinamaxiza');
	}
	// Dinamax del jugador según el lugar
	G.flags.mec_dynamax = true; addItem('dynamaxband', 1);
	const opcionDyn = (loc, wildGimmick) => {
		G.party.length = 0; G.party.push(createPokemon('lucario', { level: 70 }));
		const c = new BattleCtl({ kind: 'wild', foes: [createPokemon('wooloo', { level: 5 })], terrain: 'grass', loc, wildGimmick, seed: [9, 9, 9, 9] });
		c.start();
		return !!c.options().gimmicks.dynamax;
	};
	ok(dynamaxAllowed('par') && opcionDyn('par'), 'Dinamax del jugador en Pueblo Par (Galar): sí');
	ok(opcionDyn('estadio_hoyuelo'), 'Dinamax del jugador en una sub-área de Galar: sí');
	ok(!opcionDyn('luminalia_plaza'), 'Dinamax del jugador en Luminalia (Kalos): no');
	ok(!opcionDyn('porcelana'), 'Dinamax del jugador en Porcelana (Teselia): no');
	ok(opcionDyn('porcelana', 'tera'), 'Dinamax del jugador contra un salvaje de Fisura fuera de Galar: sí');
	{
		G.party.length = 0; G.party.push(createPokemon('lucario', { level: 70 }));
		const c = new BattleCtl({ kind: 'wild', foes: [createPokemon('wooloo', { level: 5 })], terrain: 'grass', loc: 'luminalia_plaza', seed: [9, 9, 9, 8] });
		c.start();
		const r = c.turn({ type: 'move', i: 0, gimmick: 'dynamax' });
		ok(!r.events.some(e => e.t === 'dyn') && !c.gimmickUsed, 'Pedir Dinamax a la fuerza fuera de Galar no hace nada');
	}
	// Comando { gmax } (Sopa Maxi)
	G.party.length = 0;
	G.party.push(createPokemon('lucario', { level: 70 }), createPokemon('gastly', { level: 20 }), createPokemon('snorlax', { level: 60 }));
	UI.say = async () => {}; UI.toast = () => {}; UI.cutscene = async () => {};
	let opciones = null;
	UI.choose = async (p, opts) => { opciones = opts; return 0; };
	addItem('maxmushrooms', 1);
	const antes = count('maxmushrooms');
	await runScript([{ gmax: 'maxmushrooms', n: 1, onWin: [{ set: { 'flag.t_gmax_ok': true } }], onNone: [{ set: { 'flag.t_gmax_none': true } }] }]);
	ok(opciones && opciones.length === 3, 'Sopa Maxi: ofrece a Gastly (línea con Gigamax) y a Snorlax, no a Lucario');
	ok(G.party[1].gmax === true && G.flags.t_gmax_ok, 'Sopa Maxi: el elegido recibe el factor Gigamax');
	ok(count('maxmushrooms') === antes - 1, 'Sopa Maxi: gasta una Maxiseta');
	await runScript([{ gmax: 'maxmushrooms', n: 1, onWin: [], onNone: [{ set: { 'flag.t_gmax_none': true } }] }]);
	ok(G.flags.t_gmax_none, 'Sopa Maxi sin Maxisetas: onNone');
	const { toSimSet } = await import('../../app/js/pokemon.js');
	ok(toSimSet(G.party[1]).gigantamax === true, 'El factor pasa al simulador (gigantamax)');
	console.log(fails ? `✖ Dinamax/Gigamax: ${fails} fallos` : '✔ Dinamax/Gigamax: todo bien');
	if (fails) process.exitCode = 1;
}
