// Entrada B7: amistoso añadido sin cambiar la llegada, el progreso ni las partidas anteriores.
// Uso: node herramientas/test/renata-inicio-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G, evalCond, migrate } from '../../app/js/state.js';
import { createPokemon, maxHp } from '../../app/js/pokemon.js';
import { UI, runScript } from '../../app/js/guion.js';
loadDataNode();
const { BLOCKS } = await import('../../app/content/index.js');
for (const b of BLOCKS) registerBlock(b);
let fails = 0, battles = 0, prepare = false, result = 'win';
const ok = (c, m) => { console.log((c ? '✔ ' : '✖ ') + m); if (!c) fails++; };
ok(!!C.trainers.renata_2 && !!C.scripts.b07_renata_amistoso, 'existen entrenador y guion independientes');
if (!C.trainers.renata_2 || !C.scripts.b07_renata_amistoso) process.exit(1);
UI.say = async () => {}; UI.toast = () => {}; UI.refresh = () => {};
UI.choose = async (_, opts) => prepare && opts.some(s => s.includes('Curar al equipo')) ? 1 : 0;
UI.battle = async cfg => {
 battles++;
 ok(cfg.trainer === 'renata_2' && cfg.canLose, 'amistoso propio que permite perder y continuar');
 ok(G.party.every(p => p.hp === maxHp(p) && !p.status && p.moves.every(m => m.pp > 0)), 'el equipo entra curado');
 G.party[0].hp = 0; G.party[0].status = 'fnt'; G.party[0].moves[0].pp = 0;
 return { result };
};
const fresh = () => {
 setG(newGame({ name: 'Prueba' }));
 G.loc = 'puerta_galar'; G.flags.b06_fin = G.flags.b07_inicio_hecho = G.flags.b07_puerta_galar = true;
 G.party.push(createPokemon('lucario', { level: 68 })); G.party[0].hp = 1;
};
const spots = loc => C.locations[loc].spots.filter(s => s.talk?.some(t => t.script === 'b07_renata_amistoso') && evalCond(s.cond));
for (const outcome of ['win', 'lose']) {
 fresh(); result = outcome; prepare = false; battles = 0;
 await runScript('b07_llegada');
 ok(battles === 1 && G.flags.b07_renata_amistoso_hecho, `${outcome}: se ofrece al terminar la bienvenida una sola vez`);
 ok(G.flags.b07_llegada && G.quests.b07_m1.stage === 'par' && !G.flags.b07_recepcion, 'la bienvenida y la siguiente etapa originales se conservan');
 ok(G.party[0].hp === maxHp(G.party[0]) && !G.party[0].status && G.party[0].moves[0].pp > 0, 'el equipo queda curado para seguir');
 await runScript('b07_renata_amistoso');
 ok(battles === 1 && !spots('par').length && !spots('puerta_galar').length, 'no repite combate ni recompensa');
}
fresh(); prepare = true; battles = 0;
await runScript('b07_llegada');
ok(battles === 0 && !G.flags.b07_renata_amistoso_hecho && G.quests.b07_m1.stage === 'par', 'prepararse aplaza el duelo sin bloquear la historia');
ok(spots('par').length === 1 && spots('puerta_galar').length === 1, 'hay una vía para retomarlo en el pueblo y en el andén');
prepare = false; await runScript('b07_renata_amistoso');
ok(battles === 1 && G.flags.b07_renata_amistoso_hecho, 'se puede aceptar después de preparar el equipo');
// Partida que ya había pasado la llegada: no repetir la bienvenida ni moverla de lugar.
fresh(); G.flags.b07_llegada = G.flags.b07_recepcion = G.flags.b07_t0_hecho = true;
G.loc = 'piston'; G.quests.b07_m1 = { stage: 'hecha', done: true }; setG(migrate(JSON.parse(JSON.stringify(G))));
ok(spots('par').length === 1 && evalCond(spots('par')[0].new), 'una partida anterior encuentra el encuentro como novedad al volver a Par');
battles = 0; await runScript('b07_renata_amistoso');
ok(G.loc === 'piston' && G.flags.b07_recepcion && G.flags.b07_t0_hecho && G.quests.b07_m1.done, 'el amistoso no rebobina ni altera progreso anterior');
ok(C.trainers.renata_1.team[0].lv === 59 && C.trainers.renata_1.team.at(-1).lv === 61, 'el primer combate de Renata no cambia');
ok(C.trainers.renata_2.team.every(m => m.lv >= 66 && m.lv <= 67) && !C.trainers.renata_2.gimmick, 'equipo dentro de la curva de entrada, sin adelantar mecánicas');
console.log(fails ? `FALLAN ${fails}` : 'Todo bien');
process.exit(fails ? 1 : 0);
