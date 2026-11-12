// Integración con registro, estado e intérprete reales; UI controlada para explorar todas las decisiones.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { loadDataNode } from '../../../../../herramientas/test/node-env.mjs';
import { C, registerBlock } from '../../../../../app/js/content.js';
import { G, newGame, setG, evalCond, count } from '../../../../../app/js/state.js';
import { UI, runScript } from '../../../../../app/js/guion.js';
import { createPokemon, maxHp } from '../../../../../app/js/pokemon.js';
import { BLOCKS } from '../../../../../app/content/index.js';
import published from '../../../../../app/content/comunidad/cg-faroles.js';
import source from '../../../misiones/cg-faroles.js';
import * as MJ from '../../../../../app/js/minijuegos.js';
import * as PZ from '../../../../../app/js/puzle.js';
loadDataNode();
assert.deepEqual(published,source,'La integración debe conservar el módulo revisado');
const ids=new Set();
for(const b of BLOCKS){
  for(const table of ['npcs','quests','scripts','trainers','gather','items']){
    for(const id of Object.keys(b[table]||{})){
      if(id.startsWith('cg_faroles_')){
        assert.ok(!ids.has(table+':'+id),'Id repetido '+id);ids.add(table+':'+id);
      }
    }
  }
  registerBlock(b);
}
assert.equal(Object.keys(C.quests).filter(id=>id.startsWith('cg_faroles_')).length,5);
const errors=[],result={routes:0,retries:0,checks:0};
let choices=[],outcome='win',activity='win',manual=false;
UI.say=async()=>{};
UI.toast=text=>{if(String(text).startsWith('Error en guion'))errors.push(text);};
UI.refresh=()=>{};
UI.choose=async(_p,labels)=>{const n=choices.shift();assert.ok(n!==undefined&&n<labels.length);return n;};
UI.battle=async()=>{assert.ok(G.party.every(p=>p.hp===maxHp(p)));return {result:outcome};};
UI.puzzle=async def=>activity==='win'?{result:'solved',moves:PZ.solve(PZ.parsePuzzle(def)).length}:{result:'quit',moves:0};
UI.minigame=async P=>activity==='win'?MJ.skipResult(P):{result:activity,score:0,won:[]};
const run=async(id,opts=[])=>{choices=[...opts];await runScript(id);assert.deepEqual(errors,[]);assert.deepEqual(choices,[]);};
const saveReload=()=>setG(JSON.parse(JSON.stringify(G)));
const visible=()=>Object.values(C.locations).flatMap(l=>l.spots||[]).filter(s=>s.cond===undefined||evalCond(s.cond));
const initial=()=>{
  newGame({name:'QA',pron:'elle',money:100});
  G.loc='celeste';G.vars.cap=57;
  G.player.badges=['k1','k2','k3','k4','k5','k6','k7','k8'];
  for(const loc of ['celeste','casa_bill','azafran'])G.visited[loc]=Date.now();
  G.party=[createPokemon('pikachu',{level:57})];
};
await fs.mkdir('qa-faroles',{recursive:true});
for(let bits=0;bits<1024;bits++){
  initial();manual=!!(bits&1);
  if(bits===0)await fs.writeFile('qa-faroles/inicio.json',JSON.stringify(G));
  for(let n=1;n<=5;n++){
    const p='cg_faroles_'+n+'_',a=(bits>>((n-1)*2))&1,b=(bits>>((n-1)*2+1))&1;
    assert.equal(visible().filter(s=>s.talk?.[0]?.script===p+'intro').length,1);
    const before=JSON.stringify(G);await run(p+'finish');assert.equal(JSON.stringify(G),before);
    await run(p+'intro',[a]);saveReload();
    const tasks=bits&2?[p+'segunda',p+'explore']:[p+'explore',p+'segunda'];
    for(const task of tasks){
      const before=JSON.stringify(G);
      activity='quit';await run(task);assert.equal(JSON.stringify(G),before);
      activity='lose';await run(task);assert.ok(!G.flags[p+(task.endsWith('segunda')?'task_b':'task_a')]);
      activity='win';await run(task);saveReload();
      const after=JSON.stringify(G);await run(task);assert.equal(JSON.stringify(G),after);
      result.retries++;result.checks++;
    }
    assert.ok(G.flags[p+'explored']);
    if(manual&&n<5)await run(p+'battle',[1]);
    else{
      outcome='lose';await run(p+'battle',[0]);assert.ok(!G.flags[p+'won']);
      await run(p+'battle',[n<5?2:1]);assert.ok(!G.flags[p+'won']);
      outcome='win';await run(p+'battle',[0]);assert.ok(G.party.every(p=>p.hp===maxHp(p)));
    }
    await run(p+'finish',[b]);saveReload();
    assert.ok(G.quests[p+'quest'].done);
    assert.equal(+!!G.flags[p+'decision1_0']+ +!!G.flags[p+'decision1_1'],1);
    assert.equal(+!!G.flags[p+'decision2_0']+ +!!G.flags[p+'decision2_1'],1);
    const after=JSON.stringify(G);await run(p+'finish');await run(p+'battle');await run(p+'intro');
    assert.equal(JSON.stringify(G),after);result.checks++;
  }
  assert.equal(G.player.money,2400);assert.equal(count('hyperpotion'),6);
  assert.equal(visible().filter(s=>s.action?.gather?.startsWith('cg_faroles_')).length,1);
  result.routes++;
  if(bits===0)await fs.writeFile('qa-faroles/final.json',JSON.stringify(G));
}
initial();
delete G.visited.azafran;await run('cg_faroles_1_intro');assert.ok(!G.flags.cg_faroles_1_started);
console.log('INTEGRACIÓN REAL: '+JSON.stringify(result));
await fs.writeFile('qa-faroles/runtime.json',JSON.stringify(result,null,2));
