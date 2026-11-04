import assert from 'node:assert/strict';
import { loadDataNode } from './node-env.mjs';
loadDataNode();
let equip;
try { ({ equipOwnedMegas: equip } = await import('../recorrido-preparacion.mjs')); } catch {}
assert.equal(typeof equip, 'function', 'el bot debe equipar las megapiedras que ya ganó');
const lucario={sp:'lucario',item:''}, gyarados={sp:'gyarados',item:''};
const bag={lucarionite:1,gyaradosite:1};
equip([lucario,gyarados],bag,false);assert.equal(lucario.item,'');assert.equal(bag.lucarionite,1);
equip([lucario,gyarados],bag,true);assert.equal(lucario.item,'lucarionite');assert.equal(gyarados.item,'gyaradosite');assert.equal(bag.lucarionite,0);
equip([lucario,gyarados],bag,true);assert.equal(bag.lucarionite,0);
const other={sp:'lucario',item:'soothebell'};equip([other],{lucarionite:1},true);assert.equal(other.item,'soothebell');
const none={sp:'lucario',item:''};equip([none],{},true);assert.equal(none.item,'');
console.log('Preparación: solo megapiedras ganadas, sin duplicarlas ni quitar objetos elegidos: OK');
// El Pokémon apto usa su Mega mientras aún hay compañeros, como permite la interfaz.
const S=await import('../../app/js/state.js');
const {createPokemon}=await import('../../app/js/pokemon.js');
const {BattleCtl}=await import('../../app/js/battle.js');
const {decide}=await import('../../app/js/ai.js');
S.newGame({name:'Prueba'});S.G.flags.mec_mega=true;S.G.bag.megaring=1;
S.G.party=[createPokemon('lucario',{level:50,item:'lucarionite',moves:['aurasphere']}),createPokemon('gyarados',{level:50})];
const ctl=new BattleCtl({kind:'wild',foes:[createPokemon('rattata',{level:5})],seed:'sodium,00000000000000000000000000000001'});ctl.start();
const me=ctl.battle.p1.active[0];
const decision=decide(ctl.battle,'p1',{level:4,wild:false,gimmick:'mega',gimmickUsed:false,ace:me.name});
assert.match(decision.choice,/ mega$/);
const result=ctl.turn({type:'move',i:0,gimmick:'mega'});assert.ok(!result.error);
assert.equal(ctl.battle.p1.pokemon[0].species.id,'lucariomega');
console.log('Mega antes del último Pokémon, con la misma IA y simulador del juego: OK');
