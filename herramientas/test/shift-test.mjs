// Prueba del estilo «Cambio»: al caer un Pokémon rival, el jugador puede cambiar gratis o no.
// Uso: node herramientas/test/shift-test.mjs  (sale con código 1 si falla)
import { loadDataNode } from './node-env.mjs';
import { newGame, G } from '../../app/js/state.js';
import { createPokemon } from '../../app/js/pokemon.js';
import { BattleCtl, buildTrainerTeam } from '../../app/js/battle.js';
loadDataNode();
let fails = 0;
const check = (ok, msg) => { console.log((ok ? '  ✔ ' : '  ✘ ') + msg); if (!ok) fails++; };
function setup() {
	newGame({ name: 'Mario' });
	G.party.push(createPokemon('lucario', { level: 50, moves: ['aurasphere', 'flashcannon', 'extremespeed', 'swordsdance'] }));
	G.party.push(createPokemon('braixen', { level: 40 }));
	const t = { id: 'test', name: 'Prueba', cls: 'Entrenador', ai: 2, team: [{ sp: 'rattata', lv: 5, ability: 'runaway' }, { sp: 'zigzagoon', lv: 5, ability: 'pickup' }, { sp: 'bidoof', lv: 5, ability: 'simple' }] };
	return new BattleCtl({ kind: 'trainer', foes: buildTrainerTeam(t, createPokemon), trainer: t, terrain: 'gym', shift: true, seed: 'sodium,00000000000000000000000000000001' });
}
const atk = ctl => ({ type: 'move', i: ctl.options().moves.findIndex(m => m.id === 'extremespeed') });
for (const mode of ['rechaza', 'acepta']) {
	console.log('Modo:', mode);
	const ctl = setup();
	ctl.start();
	let r = ctl.turn(atk(ctl));
	check(!!r.shiftOffer, 'tras debilitar al primero, ofrece cambiar (' + (r.shiftOffer?.foe || '—') + ')');
	if (mode === 'rechaza') {
		r = ctl.turn({ type: 'noshift' });
		check(!r.error && !r.shiftOffer, 'rechazar no da error');
		check(ctl.active('p1').species.id === 'lucario', 'sigue Lucario en el campo');
		check(!ctl.active('p2').fainted, 'el rival sacó a su siguiente Pokémon');
		check(ctl.options().moves.length > 0 && !ctl.options().forceSwitch, 'el siguiente turno es normal');
	} else {
		const o = ctl.options();
		check(o.forceSwitch && o.shift, 'el menú de cambio está abierto con opción de no cambiar');
		r = ctl.turn({ type: 'switch', idx: o.switches.findIndex(s => s.sp === 'braixen') });
		check(!r.error, 'cambiar no da error ' + (r.error || ''));
		check(ctl.active('p1').species.id === 'braixen', 'sale Braixen');
		check(!ctl.active('p2').fainted && ctl.active('p2').hp === ctl.active('p2').maxhp, 'el rival sacó a su siguiente Pokémon sin recibir daño');
		check(ctl.options().moves.length > 0, 'el siguiente turno es normal');
	}
	// terminar el combate
	for (let i = 0; i < 20 && !r.ended; i++) {
		if (r.shiftOffer) { r = ctl.turn({ type: 'noshift' }); continue; }
		const o = ctl.options();
		r = ctl.turn(o.forceSwitch ? { type: 'switch', idx: o.switches.findIndex(s => !s.fainted && !s.active) } : { type: 'move', i: 0 });
		if (r.error) { check(false, 'error: ' + r.error); break; }
	}
	check(r.ended && r.result === 'win', 'el combate termina con victoria');
}
// Sin la opción, no ofrece nada
{
	const ctl = setup(); ctl.cfg.shift = false; ctl.start();
	const r = ctl.turn(atk(ctl));
	check(!r.shiftOffer && ctl.active('p2') && !ctl.active('p2').fainted, 'con estilo Fijo no pregunta');
}
// Si el rival se retira con Ida y Vuelta (sin caer), no se pregunta (bug de Mario, 2026-10-30)
{
	newGame({ name: 'Mario' });
	G.party.push(createPokemon('snorlax', { level: 60, moves: ['splash'] }));
	G.party.push(createPokemon('lucario', { level: 60, moves: ['aurasphere'] }));
	const t = { id: 'uturn', name: 'Prueba', cls: 'Entrenador', ai: 1, team: [{ sp: 'scizor', lv: 60, moves: ['uturn'] }, { sp: 'magikarp', lv: 5, moves: ['splash'] }] };
	const ctl = new BattleCtl({ kind: 'trainer', foes: buildTrainerTeam(t, createPokemon), trainer: t, terrain: 'gym', shift: true, seed: 'sodium,00000000000000000000000000000001' });
	ctl.start();
	const r = ctl.turn({ type: 'move', i: 0 });
	check(!r.error && !r.shiftOffer && !ctl.options().shift, 'tras Ida y Vuelta del rival no ofrece cambiar');
}
// Ilusión no debe revelar al relevo en el aviso ni en la ficha. Equipo sintético, sin guiones de historia.
for (const mode of ['rechaza', 'acepta']) {
	newGame({ name: 'Prueba' });
	G.party.push(createPokemon('snorlax', { level: 70, moves: ['tackle', 'splash'] }));
	G.party.push(createPokemon('blissey', { level: 70, moves: ['tackle', 'splash'] }));
	const t = { name: 'Prueba', ai: 1, team: [
		{ sp: 'rattata', lv: 1, moves: ['splash'] },
		{ sp: 'zoroark', lv: 70, ability: 'illusion', moves: ['splash'] },
		{ sp: 'magikarp', lv: 70, moves: ['splash'], gender: 'F' },
	] };
	const ctl = new BattleCtl({ kind: 'trainer', foes: buildTrainerTeam(t, createPokemon), trainer: t, shift: true, noExp: true, seed: [1, 2, 3, 4] });
	ctl.start();
	const r = ctl.turn({ type: 'move', i: 0 });
	check(r.shiftOffer?.foe === 'Magikarp' && r.shiftOffer.sp === 'magikarp', `${mode}: el aviso anuncia el disfraz`);
	check(!ctl.battle.p2.pokemon.find(p => p.species.id === 'zoroark').illusion, 'prever el disfraz no modifica el simulador');
	const out = ctl.turn(mode === 'acepta' ? { type: 'switch', idx: 1 } : { type: 'noshift' });
	check(ctl.active('p2').species.id === 'zoroark' && ctl.active('p2').illusion?.species.id === 'magikarp', 'sale realmente Zoroark con Ilusión');
	const shown = out.events.find(e => e.t === 'switch' && e.side === 'p2')?.info;
	check(shown?.sp === 'magikarp' && shown.name === 'Magikarp' && shown.gender === 'F', 'la ficha usa especie, nombre y género aparentes');
	const harmless = ctl.turn({ type: 'move', i: 1 });
	check(!!ctl.active('p2').illusion && !harmless.events.some(e => e.t === 'switch' && e.side === 'p2'), 'Salpicadura no rompe Ilusión');
	const hit = ctl.turn({ type: 'move', i: 0 });
	const reveal = hit.events.find(e => e.t === 'switch' && e.side === 'p2')?.info;
	check(!ctl.active('p2').illusion && reveal?.sp === 'zoroark' && reveal.name === 'Zoroark', 'el golpe revela a Zoroark');
	check(reveal?.hp === ctl.active('p2').hp && reveal.hp > 0, 'la revelación conserva los PS restantes, no los pone a cero');
}
// El anuncio debe coincidir con la salida real también con apodos, forma regional y sin compañero disponible.
for (const variant of ['apodo', 'hisui', 'ultimo', 'cola-debilitada']) {
	newGame({ name: 'Prueba' });
	G.party.push(createPokemon('snorlax', { level: 70, moves: ['tackle'] }));
	G.party.push(createPokemon('blissey', { level: 70 }));
	const species = variant === 'hisui' ? 'zoroarkhisui' : 'zoroark';
	const t = { name: 'Prueba', ai: 1, team: [{ sp: 'rattata', lv: 1, moves: ['splash'] }, { sp: species, lv: 70, ability: 'illusion', moves: ['splash'] }] };
	if (variant !== 'ultimo') t.team.push({ sp: 'magikarp', lv: 70, moves: ['splash'], nick: variant === 'apodo' ? 'Burbuja' : undefined });
	if (variant === 'cola-debilitada') t.team.push({ sp: 'bidoof', lv: 1 });
	const ctl = new BattleCtl({ kind: 'trainer', foes: buildTrainerTeam(t, createPokemon), trainer: t, shift: true, noExp: true, seed: [1, 2, 3, 4] });
	ctl.start();
	if (variant === 'cola-debilitada') { const tail = ctl.battle.p2.pokemon.at(-1); tail.hp = 0; tail.fainted = true; ctl.battle.p2.pokemonLeft--; }
	const r = ctl.turn({ type: 'move', i: 0 });
	const out = ctl.turn({ type: 'noshift' });
	const shown = out.events.find(e => e.t === 'switch' && e.side === 'p2')?.info;
	check(ctl.active('p2').species.id === species, `${variant}: el relevo real es la especie de prueba`);
	check(!!shown && r.shiftOffer?.foe === shown.name && r.shiftOffer.sp === shown.sp, `${variant}: aviso y salida real coinciden`);
	check((variant === 'ultimo') ? shown?.sp === species : shown?.sp === 'magikarp', `${variant}: solo se anuncia disfraz cuando corresponde`);
}
// El jugador decide su cambio DESPUÉS del aviso: Gas Reactivo puede entrar o salir antes del relevo rival.
for (const gas of ['permanece', 'sale', 'entra', 'escudo']) {
	newGame({ name: 'Prueba' });
	const weezing = createPokemon('weezing', { level: 70, moves: ['tackle'], ability: 'neutralizinggas' });
	const blissey = createPokemon('blissey', { level: 70, moves: ['tackle'] });
	G.party.push(...(gas === 'entra' ? [blissey, weezing] : [weezing, blissey]));
	const t = { name: 'Prueba', ai: 1, team: [{ sp: 'rattata', lv: 1, moves: ['splash'] }, { sp: 'zoroark', lv: 70, ability: 'illusion', moves: ['splash'] }, { sp: 'magikarp', lv: 70, moves: ['splash'] }] };
	if (gas === 'escudo') t.team[1].item = 'abilityshield';
	const ctl = new BattleCtl({ kind: 'trainer', foes: buildTrainerTeam(t, createPokemon), trainer: t, shift: true, noExp: true, seed: [1, 2, 3, 4] });
	ctl.start();
	const r = ctl.turn({ type: 'move', i: 0 });
	check(gas === 'escudo' ? r.shiftOffer?.foe === 'Magikarp' && r.shiftOffer.sp === 'magikarp' : r.shiftOffer?.foe === 'otro Pokémon' && r.shiftOffer.sp === null, `gas ${gas}: aviso sin revelar información oculta`);
	const out = ctl.turn((gas === 'permanece' || gas === 'escudo') ? { type: 'noshift' } : { type: 'switch', idx: 1 });
	const shown = out.events.find(e => e.t === 'switch' && e.side === 'p2')?.info;
	check(shown?.sp === (gas === 'sale' || gas === 'escudo' ? 'magikarp' : 'zoroark'), `gas ${gas}: la entrada real respeta la habilidad activa`);
}
console.log(fails ? `FALLAN ${fails}` : 'Todo bien');
process.exit(fails ? 1 : 0);
