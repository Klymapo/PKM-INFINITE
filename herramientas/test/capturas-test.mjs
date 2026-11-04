import assert from 'node:assert/strict';
import{loadDataNode}from'./node-env.mjs';import{newGame,G}from'../../app/js/state.js';import{C}from'../../app/js/content.js';loadDataNode();
let M;try{M=await import('../../app/js/capturas.js');}catch{}
assert.equal(typeof M?.trainingRoster,'function','falta separar capturables e instructores');
newGame({name:'Test'});G.party=[{lv:10}];G.vars.cap=20;C.events=[];C.trainers.test={team:[{sp:'rattata',lv:10}]};
let rows=M.trainingRoster({cap:20,trainers:['test'],wild:[{sp:'rattata',lv:5},{sp:'magikarp',lv:7,noCatch:true}]});
assert.equal(rows.find(x=>x.sp==='rattata'&&x.source==='trainer').state,'battle');
assert.equal(rows.find(x=>x.sp==='rattata'&&x.source==='wild').state,'catch');
assert.equal(rows.find(x=>x.sp==='magikarp').state,'battle');
G.party[0].lv=20;assert.equal(M.trainingRoster({cap:20,wild:[{sp:'rattata',lv:5}]})[0].state,'unavailable');
G.party[0].lv=10;assert.equal(M.trainingRoster({cap:20,wild:[{sp:'rattata',lv:5,cond:false}]})[0].state,'unavailable');
G.loc='local';C.locations.local={id:'local',spots:[{action:{explore:true}},{action:{training:{cap:20,trainers:['test'],wild:[{sp:'magikarp',lv:5}]}}}],encounters:{grass:[{sp:'bulbasaur',lv:5},{sp:'pikachu',lv:5,noCatch:true}]}};
const map=M.localCaptureIndex();assert.ok(map.catch.has('bulbasaur'));assert.ok(map.catch.has('magikarp'));assert.ok(!map.catch.has('rattata'));assert.ok(map.battle.has('rattata'));assert.ok(map.battle.has('pikachu'));
C.locations.local.spots[0].cond=false;assert.ok(!M.localCaptureIndex().catch.has('bulbasaur'));
console.log('Capturables: instructores, salvajes, mismo Pokémon en dos fuentes, tope y condiciones: OK');
