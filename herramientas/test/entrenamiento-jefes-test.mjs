import assert from'node:assert/strict';
let M;try{M=await import('../../app/js/entrenamiento.js');}catch{}
assert.equal(typeof M?.trainingBoss,'function','falta estado persistente del verdadero jefe');
const t={trainers:['a','b']},g={flags:{},beaten:{}};
assert.equal(M.trainingBoss(t,g).state,'locked');
g.beaten.a=30;assert.equal(M.trainingBoss(t,g).wins,0,'las prácticas no desbloquean al jefe');
g.beaten.a__elite=6;g.beaten.b__elite=4;assert.equal(M.trainingBoss(t,g).state,'ready');
g.flags['escalera:a,b']=true;assert.equal(M.trainingBoss(t,g).state,'defeated');
const legacy={flags:{},beaten:{escalera_a_b:1}};assert.equal(M.trainingBoss(t,legacy).state,'defeated','conservar victorias guardadas antes de anotar el premio');
assert.equal(M.trainingBoss({wild:[{sp:'rattata'}]},g).state,'none');
assert.deepEqual(g.flags,{'escalera:a,b':true},'consultar no altera la partida');
console.log('Jefes reales: bloqueado, pendiente, vencido y partidas antiguas: OK');
