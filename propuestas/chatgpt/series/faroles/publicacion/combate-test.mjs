// Combates Showdown reales de los nuevos entrenadores y regresión de ensayo sin multa.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {loadDataNode} from '../../../../../herramientas/test/node-env.mjs';
import {C,registerBlock} from '../../../../../app/js/content.js';
import {G,newGame} from '../../../../../app/js/state.js';
import {createPokemon} from '../../../../../app/js/pokemon.js';
import {BattleCtl,buildTrainerTeam} from '../../../../../app/js/battle.js';
import {UI,runScript} from '../../../../../app/js/guion.js';
import * as AI from '../../../../../app/js/ai.js';
import {BLOCKS} from '../../../../../app/content/index.js';
loadDataNode();for(const b of BLOCKS)registerBlock(b);
const team=['lucario','skeledirge','noivern','alakazam','delphox','gyarados'];
const results=[];
for(const id of Object.keys(C.trainers).filter(x=>x.startsWith('cg_faroles_'))){
  for(let seed=1;seed<=4;seed++){
    newGame({name:'QA',money:10000});
    G.loc='celeste';G.vars.cap=57;
    G.party=team.map(sp=>createPokemon(sp,{level:57}));
    const trainer=C.trainers[id];
    const ctl=new BattleCtl({kind:'trainer',foes:buildTrainerTeam(trainer,createPokemon),
      trainer,terrain:'city',loc:'celeste',seed:[seed,2,3,4],noLoss:true});
    ctl.start();
    let ended=false,turns=0;
    while(!ended&&turns++<300){
      const opts=ctl.options();
      let action;
      if(opts.forceSwitch){
        const best=AI.bestSwitch(ctl.battle,ctl.battle.p1,ctl.battle.p2.active[0]);
        action={type:'switch',idx:best?best.idx:opts.switches.findIndex(s=>!s.fainted&&!s.active)};
      }else{
        const d=AI.decide(ctl.battle,'p1',{level:4,wild:false,gimmick:null,gimmickUsed:false});
        if(!d)action={type:'move',i:0};
        else if(d.choice.startsWith('switch'))action={type:'switch',idx:+d.choice.split(' ')[1]-1};
        else action={type:'move',i:+d.choice.split(' ')[1]-1};
      }
      const r=ctl.turn(action);assert.ok(!r.error,r.error);ended=!!r.ended;
    }
    assert.ok(ended,'Combate no concluye '+id);
    const summary=ctl.finish();
    assert.ok(['win','lose'].includes(summary.result));
    assert.equal(summary.money,0,'Ensayo con multa o premio extra');
    assert.equal(G.player.money,10000);
    results.push({trainer:id,seed,turns,result:summary.result});
  }
}
// Derrota real: verificar tanto la opción nueva como que la regla previa conserva su multa.
for(const noLoss of [true,false]){
  newGame({name:'QA',money:10000});
  G.loc='celeste';G.player.badges=['a','b','c','d','e','f','g','h'];
  G.party=[createPokemon('magikarp',{level:1,moves:['splash']})];
  const trainer=C.trainers.cg_faroles_5_trainer;
  const ctl=new BattleCtl({kind:'trainer',foes:buildTrainerTeam(trainer,createPokemon),
    trainer,terrain:'city',seed:[1,2,3,4],noLoss});
  ctl.start();let r={};
  for(let n=0;n<30&&!r.ended;n++)r=ctl.turn({type:'move',i:0});
  assert.ok(r.ended);
  const summary=ctl.finish();assert.equal(summary.result,'lose');
  assert.equal(G.player.money,noLoss?10000:9880);
}
// El comando declarativo debe transmitir noLoss; omitirlo conserva el valor false.
UI.say=async()=>{};UI.refresh=()=>{};
for(const noLoss of [true,false]){
  let received;
  UI.battle=async cfg=>{received=cfg;return {result:'lose'};};
  await runScript([{battle:'cg_faroles_5_trainer',lose:'continue',...(noLoss?{noLoss:true}:{}),onLose:[]}]);
  assert.equal(received?.noLoss,noLoss);
}
await fs.mkdir('qa-faroles',{recursive:true});
await fs.writeFile('qa-faroles/combates.json',JSON.stringify(results,null,2));
console.log('SHOWDOWN: veinte combates finalizados; derrota sin multa y multa previa comprobadas.');
