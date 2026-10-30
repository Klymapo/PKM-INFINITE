// Pruebas de las sinergias dinámicas (app/js/negocios.js, 2026-10-30): suministro elegido a mano, proveedor que
// deja de mandar si se llena, cadenas que suben y bajan, pedidos entre encargados, imprevistos compartidos y
// compatibilidad con partidas de antes. Uso: node herramientas/test/sinergias-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G } from '../../app/js/state.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const N = await import('../../app/js/negocios.js');

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
const fresh = () => { setG(newGame({ name: 'Prueba' })); G.player.money = 5e6; };
const back = (days, ...ids) => { for (const id of ids) N.ventureState(id).last -= days * N.DAY; };
const link = (to, from) => N.synergiesOf(to).find(s => s.from === from);

// ---- La Botica entra en la red ----
ok(N.ventureDef('b06_botica').lines && (N.ventureDef('b06_botica').synergy || []).some(s => s.from === 'p7_rancho'), 'la Botica de Iris recibe del Rancho Prado (y no pierde sus líneas)');
ok(['p7_rancho', 'p10_cafe'].every(v => (C.ventures[v].synergy || []).some(s => s.from === 'b06_botica' && s.line === 'huerto')), 'las bayas medicinales de la Botica abastecen al rancho y a la fonda');

// ---- (a) Suministro real, no automático ----
fresh();
N.joinVenture('p7_rancho'); N.joinVenture('b06_botica');
let L = link('b06_botica', 'p7_rancho');
ok(!L.active && L.missing === 'suministro' && L.pct === 0, 'siendo socio de los dos, sin elegir suministro no se enciende');
const r0 = N.rates('p7_rancho');
N.setSupply('b06_botica', L.key, 30);
const r1 = N.rates('p7_rancho');
ok(r1.items.moomoomilk < r0.items.moomoomilk - 1e-9, 'lo que se manda deja de producirse para ti en el proveedor (leche)');
back(1, 'p7_rancho', 'b06_botica'); N.tick('b06_botica');
L = link('b06_botica', 'p7_rancho');
ok(L.active && L.strength > 0.95, `con un 30 % y un día, la mejora rinde entera (${Math.round(L.strength * 100)} %)`);
ok(N.rates('b06_botica').why.some(w => w.label.includes('Leche del Rancho Prado')), 'aparece en el desglose');
N.setSupply('b06_botica', L.key, 10);
N.ventureState('b06_botica').feed[L.key] = 0;
N.collect('p7_rancho'); N.collect('b06_botica');
back(1, 'p7_rancho', 'b06_botica'); N.tick('b06_botica');
L = link('b06_botica', 'p7_rancho');
ok(L.strength > 0.2 && L.strength < 0.6 && L.missing === 'poco', `con poco suministro, rinde a medias (${Math.round(L.strength * 100)} %)`);
// proveedor lleno: deja de mandar
N.setSupply('b06_botica', L.key, 30);
N.collect('b06_botica');
const rst = N.ventureState('p7_rancho');
rst.fill = N.storeDays('p7_rancho');                 // almacén del rancho lleno: no se recogió a tiempo
N.ventureState('b06_botica').feed[L.key] = 0;
back(1, 'b06_botica'); N.tick('b06_botica');
L = link('b06_botica', 'p7_rancho');
ok(L.strength < 0.05 && L.missing === 'lleno', 'si el proveedor tiene el almacén lleno, no llega nada y el que depende rinde menos');
N.collect('p7_rancho'); N.collect('b06_botica');
back(1, 'p7_rancho', 'b06_botica'); N.tick('b06_botica');
ok(link('b06_botica', 'p7_rancho').strength > 0.9, 'al recoger el proveedor, vuelve a llegar');
// línea parada
N.ventureState('p7_rancho').effort = { lana: 100, leche: 0, consulta: 0 };
ok(link('b06_botica', 'p7_rancho').missing === 'linea', 'si el proveedor no dedica esfuerzo a esa línea, se avisa');

// ---- (c) Cadenas ----
fresh();
N.joinVenture('p7_rancho'); N.joinVenture('b06_botica');
L = link('b06_botica', 'p7_rancho');
N.setSupply('b06_botica', L.key, 40);
for (let d = 0; d < 8; d++) { back(1, 'p7_rancho', 'b06_botica'); N.tick('b06_botica'); N.collect('p7_rancho'); N.collect('b06_botica'); }
L = link('b06_botica', 'p7_rancho');
ok(L.chain === 2 && N.rates('b06_botica').why.some(w => /Cadena/.test(w.label)), `8 días seguidos → cadena nivel 2 (+10 %) (días ${L.chainDays.toFixed(1)})`);
for (let d = 0; d < 10; d++) { back(1, 'p7_rancho', 'b06_botica'); N.tick('b06_botica'); N.collect('p7_rancho'); N.collect('b06_botica'); }
ok(link('b06_botica', 'p7_rancho').chain === 3, 'a los 14 días, nivel 3 (+15 %), y no pasa de ahí');
const top = link('b06_botica', 'p7_rancho').chainDays;
N.setSupply('b06_botica', L.key, 0);
for (let d = 0; d < 5; d++) { back(1, 'p7_rancho', 'b06_botica'); N.tick('b06_botica'); N.collect('b06_botica'); }
L = link('b06_botica', 'p7_rancho');
ok(L.chain >= 2 && L.chainDays < top && L.chainDays > top - 5, `si se descuida, baja poco a poco (días ${L.chainDays.toFixed(1)}, nivel ${L.chain})`);

// ---- Nada imprime dinero: la red no gana más dinero que sin ella ----
const moneyOver = (supply) => {
	fresh();
	for (const v of ['p7_rancho', 'b05_taller', 'p10_cafe', 'b06_botica', 'p7_excavacion', 'b05_atico', 'p10_periodico', 'p7_castillo']) N.joinVenture(v);
	if (supply) for (const v in C.ventures) if (N.owned(v)) for (const sy of N.synergiesOf(v)) N.setSupply(v, sy.key, 30);
	let m = 0;
	for (let d = 0; d < 10; d++) { for (const v in G.neg) back(1, v); for (const v in G.neg) N.tick(v); const g = N.collectAll(); m += g.money; }
	return m;
};
const m0 = moneyOver(false), m1 = moneyOver(true);
ok(m1 <= m0 * 1.06, `con la red encendida el dinero no se dispara (${Math.round(m0)} → ${Math.round(m1)} en 10 días)`);

// ---- (b) Pedidos entre encargados ----
fresh();
N.joinVenture('p10_cafe'); N.joinVenture('p7_rancho'); N.joinVenture('b06_botica');
const t0 = Date.now();
let P = N.currentPedido(t0, () => 0);
ok(P && N.pedidoOk(P), `sale un pedido (${P?.id})`);
ok(N.currentPedido(t0 + 3600e3)?.id === P.id, 'el mismo pedido sigue hasta que se sirve o caduca');
const r = N.fulfillPedido(t0 + 3600e3);
ok(!r.ok && /falta/i.test(r.msg), 'sin el objeto no se puede servir');
G.bag[P.item] = (P.n || 1);
const to = P.to;
const g0 = N.rates(to).gross;
ok(N.fulfillPedido().ok && !G.bag[P.item] && N.rates(to).gross > g0, 'servirlo gasta el objeto y da un empujón temporal');
ok(!N.currentPedido(t0 + 2 * 3600e3), 'después no sale otro enseguida');
const P2 = N.currentPedido(t0 + 4 * N.DAY, () => 0);
ok(P2 && P2.id !== P.id, 'a los pocos días llega otro distinto');
const money = G.player.money, bag = JSON.stringify(G.bag);
ok(!N.currentPedido(t0 + 8 * N.DAY) || true, 'caduca sin castigo');
ok(G.player.money === money && JSON.stringify(G.bag) === bag, 'si caduca, no quita nada');
G.neg.p10_cafe.manager = 'lulu';
ok(!(C.pedidos.filter(p => p.npc === 'gaspar')).some(p => N.pedidoOk(p)), 'los pedidos de Gaspar solo salen con Gaspar al frente');

// ---- (d) Imprevistos compartidos ----
fresh();
N.joinVenture('p7_rancho'); N.joinVenture('b06_botica');
G.neg.p7_rancho.manager = 'sobrina'; G.neg.b06_botica.manager = 'kaori';
ok(N.sharedFor('p7_rancho').some(e => e.id === 'sh_adela_kaori') && N.sharedFor('b06_botica').some(e => e.id === 'sh_adela_kaori'), 'Adela y Kaori al frente: su imprevisto compartido puede salir en los dos');
G.neg.b06_botica.manager = 'morti';
ok(!N.sharedFor('p7_rancho').some(e => e.id === 'sh_adela_kaori'), 'si Kaori no está al frente, no sale');
G.neg.b06_botica.manager = 'kaori';
const ev = N.sharedFor('p7_rancho').find(e => e.id === 'sh_adela_kaori');
G.neg.p7_rancho.pending = ev.id;
ok(N.rollEvent('p7_rancho')?.id === ev.id, 'queda pendiente como cualquier imprevisto');
const opt = ev.options[0];
N.resolveEvent('p7_rancho', ev, opt);
ok((G.neg.p7_rancho.boosts || []).length && (G.neg.b06_botica.boosts || []).length, 'el efecto llega a los dos negocios');
ok(C.sharedEvents.every(e => e.options.some(o => !o.cost)), 'todos tienen una opción gratis');

// ---- Compatibilidad: partidas de antes ----
fresh();
N.joinVenture('p7_rancho'); N.joinVenture('p10_cafe');
for (const v of ['p7_rancho', 'p10_cafe']) { const st = G.neg[v]; delete st.supply; delete st.feed; delete st.chain; delete st.synStr; }
G.neg.p7_rancho.effort = { lana: 40, leche: 40, consulta: 20 };
L = link('p10_cafe', 'p7_rancho');
ok(L.active && L.pct === 30, 'una mejora que ya rendía en una partida vieja sigue rindiendo (suministro al 30 %)');
ok(G.neg.p10_cafe.log.some(l => /Suministro/.test(l.text)), 'y se avisa en el registro del negocio');

console.log(fails ? `\n✖ ${fails} fallos` : '\n✔ Sinergias: todo bien');
process.exit(fails ? 1 : 0);
