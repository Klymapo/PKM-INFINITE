// Pruebas de los casos de detective (app/js/casos.js) con los casos publicados: misterios justos, acusaciones y premios.
// Uso: node herramientas/test/casos-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G } from '../../app/js/state.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const K = await import('../../app/js/casos.js');

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
const fresh = () => setG(newGame({ name: 'Prueba' }));
const ids = Object.keys(C.cases);
ok(ids.length >= 3, `${ids.length} casos publicados`);
ok(new Set(ids.map(i => C.locations[C.cases[i].loc]?.region)).size >= 3, 'en regiones distintas');

for (const id of ids) {
	const d = C.cases[id];
	// Forma
	ok(C.locations[d.loc] && C.npcs[d.partner || 'quintana'], `${id}: lugar y compañero existen`);
	ok(d.suspects[d.culprit], `${id}: el culpable es uno de los sospechosos`);
	ok(Object.keys(d.suspects).length >= 3 && Object.values(d.suspects).every(s => C.npcs[s.npc]), `${id}: 3+ sospechosos con NPC`);
	const refs = [...(d.places || []).flatMap(p => [...(p.gives || []), ...(p.needs || [])]), ...Object.values(d.suspects).flatMap(s => [...(s.questions || []).flatMap(q => [...(q.gives || []), ...(q.needs || [])]), ...Object.entries(s.present || {}).flatMap(([k, r]) => [k, ...(r.gives || [])])]), ...d.proof];
	ok(refs.every(k => d.clues[k]), `${id}: toda pista mencionada existe`);
	// Justo: todo lo que hace falta se alcanza desde cero, antes de acusar
	const R = K.reachable(d);
	ok(d.proof.length && d.proof.every(k => R.has(k)), `${id}: las pruebas (${d.proof.join(', ')}) se consiguen antes de acusar`);
	ok(Object.keys(d.clues).every(k => R.has(k)), `${id}: todas las pistas (${Object.keys(d.clues).length}) son alcanzables`);
	// la prueba no sale nada más empezar: hay que investigar
	const R0 = new Set((d.places || []).filter(p => !(p.needs || []).length).flatMap(p => p.gives || []));
	ok(!d.proof.some(k => R0.has(k)), `${id}: la prueba no está a la vista en el primer registro`);
	// al menos una contradicción al enseñar pistas
	ok(Object.values(d.suspects).some(s => Object.values(s.present || {}).some(r => (r.gives || []).length)), `${id}: enseñar una pista a alguien destapa algo`);
	ok((d.objection?.culpable || []).length && (d.objection?.prueba || []).length && (d.solution || []).length && (d.escape || []).length, `${id}: reclamos, solución y huida escritos`);
	// Resolver bien
	fresh();
	const r = K.autoSolve(id);
	ok(r.result === 'resuelto' && G.flags[id + '_resuelto'] && K.casesState().rep === (d.rep ?? 10), `${id}: se resuelve y da reputación`);
	ok((d.prize || []).every(p => G.bag[p.id] >= (p.n || 1)), `${id}: da su premio`);
	// Acusar mal: primero reclama, luego se escapa
	fresh();
	K.open(id);
	for (const p of K.places(id)) K.search(id, p.id);
	const inocente = Object.keys(d.suspects).find(s => s !== d.culprit);
	const anyClue = Object.keys(K.caseState(id).clues)[0];
	const e1 = K.accuse(id, inocente, anyClue);
	ok(e1.result === 'error' && e1.reason === 'culpable' && K.caseState(id).status === 'abierto', `${id}: acusar a un inocente → Quintana reclama y sigues`);
	const noProof = Object.keys(d.clues).find(k => !d.proof.includes(k));
	K.caseState(id).clues[noProof] = 1;
	const e2 = K.accuse(id, d.culprit, noProof);
	ok(e2.result === 'fallido' && e2.reason === 'prueba' && G.flags[id + '_fallido'] && !G.flags[id + '_resuelto'], `${id}: segundo error → se escapa y queda registrado`);
	ok(K.accuse(id, d.culprit, d.proof[0]).result === 'fallido', `${id}: un caso cerrado no se reabre`);
	ok(K.casesState().rep === 0 && !(d.prize || []).some(p => G.bag[p.id]), `${id}: si se escapa no hay premio`);
	// Acusar sin tener la pista no vale
	fresh(); K.open(id);
	ok(K.accuse(id, d.culprit, d.proof[0]).result === 'error', `${id}: no puedes acusar con una pista que no tienes`);
}
// El Buzón los trae escalonados
const mails = (C.mail || []).filter(m => /^det_c/.test(m.id));
ok(mails.length === ids.length && mails.slice(1).every(m => (m.days || 1) >= 2 && /det_c\d_carta/.test(m.cond)), 'llegan por el Buzón, uno tras otro, con días de por medio');
console.log(fails ? `\n✖ ${fails} fallos` : '\n✔ Casos: todo bien');
process.exit(fails ? 1 : 0);
