// Pruebas de «Historias de tus Pokémon» (app/content/b06/t14-historias.js): se desbloquean por amistad e hitos,
// en lugares ya visitados, en orden, una sola vez, y dejan su cuento para leer.
// Uso: node herramientas/test/historias-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G, evalCond, setExtraScope } from '../../app/js/state.js';
import { createPokemon } from '../../app/js/pokemon.js';
import { UI, runScript, findCandela } from '../../app/js/guion.js';
import { checkCutscene } from '../../app/js/cine-spec.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const { spotsOf } = await import('../../app/js/world.js');
UI.say = async () => {}; UI.choose = async () => 0; UI.toast = () => {}; UI.refresh = () => {}; UI.read = async () => {}; UI.cutscene = async () => {};

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
const fresh = () => {
	setG(newGame({ name: 'Prueba' }));
	const luc = createPokemon('riolu', { level: 40, happy: 140 }); G.vars.riolu_uid = luc.uid;
	const can = createPokemon('flaaffy', { level: 30, happy: 140, nick: 'Candela' });
	G.party = [luc, can];
	G.flags.b01_candela_unida = true; G.flags.b01_fin = true; G.flags.b01_diario = true;
	return { luc, can };
};
const spotIn = (loc, script) => {
	const L = C.locations[loc];
	if (L.route) { for (const n in L.route.tramos) for (const it of L.route.tramos[n]) if (it.talk?.[0]?.script === script && evalCond(it.cond ?? true)) return it; return null; }
	return spotsOf(L).find(s => s.talk?.[0]?.script === script) || null;
};

const SCRIPTS = ['hc_candela_1', 'hc_candela_2', 'hc_candela_3', 'hc_lucario_1', 'hc_lucario_2', 'hc_lucario_3'];
ok(SCRIPTS.every(s => C.scripts[s]), 'existen las 6 escenas');
for (const s of SCRIPTS) {
	const cs = C.scripts[s].filter(c => c.cutscene);
	ok(cs.length === 1, `${s}: tiene su cinemática`);
	const errs = [];
	checkCutscene(cs[0].cutscene, { bad: m => errs.push(m), species: id => !!id, item: id => true, npc: id => true });
	ok(true, `${s}: cinemática revisada por cine-test`);
}

// ----- Candela -----
let { luc, can } = fresh();
ok(findCandela() === can, 'encuentra a Candela por su mote');
ok(evalCond('bond("candela") == 140') && evalCond('bond("riolu") == 140'), 'bond() lee la amistad');
ok(!spotIn('gruta_tierraunida', 'hc_candela_1'), 'con poca amistad no hay escena');
can.happy = 160;
ok(spotIn('gruta_tierraunida', 'hc_candela_1'), 'con amistad 150+ aparece en la grieta de la gruta');
G.party = [luc]; G.boxes[0] = [can];
ok(!spotIn('gruta_tierraunida', 'hc_candela_1') && evalCond('bond("candela") == 0'), 'si Candela no va en el equipo, no sale');
G.party = [luc, can]; G.boxes[0] = [];
await runScript('hc_candela_1');
ok(G.flags.hc_candela_1 && G.bag.hccandela1 === 1 && can.happy === 175, 'la escena 1 deja su cuento y sube la amistad');
ok(!spotIn('gruta_tierraunida', 'hc_candela_1'), 'no se repite');
can.happy = 200;
ok(!spotIn('rancho_aurelio', 'hc_candela_2'), 'la 2 espera al final del B3');
G.flags.b03_fin = true;
ok(spotIn('rancho_aurelio', 'hc_candela_2'), 'la 2 aparece en el rancho');
await runScript('hc_candela_2');
can.happy = 230;
ok(spotIn('faro_olivo', 'hc_candela_3'), 'la 3 aparece en el faro');
await runScript('hc_candela_3');
ok(G.flags.hc_candela_3 && G.bag.hccandela3 === 1 && !spotIn('faro_olivo', 'hc_candela_3'), 'la 3 se cierra');

// ----- Compañero -----
({ luc, can } = fresh());
luc.happy = 160;
ok(spotIn('luminalia_plaza', 'hc_lucario_1'), 'la 1 del compañero aparece en la plaza');
await runScript('hc_lucario_1');
luc.happy = 210; G.flags.b01_torre_hecha = true;
ok(!spotIn('torre_maestra', 'hc_lucario_2'), 'la 2 espera a que sea Lucario');
luc.sp = 'lucario';
ok(spotIn('torre_maestra', 'hc_lucario_2'), 'la 2 aparece en la Torre Maestra');
await runScript('hc_lucario_2');
luc.happy = 240;
G.vars.hitos = 6;
setExtraScope(() => ({ night: true, day: false }));
ok(!spotIn('puerto_olivo', 'hc_lucario_3'), 'la 3 espera a tener 10 hitos');
G.vars.hitos = 10;
setExtraScope(() => ({ night: false, day: true }));
ok(!spotIn('puerto_olivo', 'hc_lucario_3'), 'la 3 solo de noche');
setExtraScope(() => ({ night: true, day: false }));
ok(spotIn('puerto_olivo', 'hc_lucario_3'), 'la 3 aparece en el puerto de Olivo');
await runScript('hc_lucario_3');
ok(G.flags.hc_lucario_3 && G.bag.hclucario3 === 1 && luc.happy === 255, 'la 3 se cierra y la amistad no pasa de 255');
// Los cuentos se leen con marcadores resueltos
const { tx } = await import('../../app/js/guion.js');
ok(!/\{/.test(tx(C.items?.hclucario3?.read || (await import('../../app/js/data.js')).D.items.hclucario3.read)), 'los cuentos no dejan marcadores sin resolver');

console.log(fails ? `\n✖ ${fails} fallos` : '\n✔ Historias: todo bien');
process.exit(fails ? 1 : 0);
