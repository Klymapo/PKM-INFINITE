// Pruebas sobre el intérprete REAL actual con estado, UI y batalla controlados.
// No lee secreto/, no registra bloques ajenos y no escribe fuera del directorio de salida elegido.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pack from '../../misiones/cg-faroles.js';
import * as MJ from '../../../../app/js/minijuegos.js';
import * as PZ from '../../../../app/js/puzle.js';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../../../..');
const toID=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
const data=async name=>JSON.parse(await fs.readFile(path.join(root,'app/data/'+name+'.json'),'utf8'));
const items=await data('items'),species=await data('species');
for(const [id,it] of Object.entries(pack.items))items[toID(id)]=it;
const report={interpreter:'app/js/guion.js sin alterar su cuerpo; imports sustituidos por dobles de prueba',
  limits:['Batallas simuladas: no certifica dificultad de Showdown.','UI simulada: no certifica presentación móvil.','Recarga JSON entre escenas; no certifica migración ni transacciones del guardado real.','Sin auditoría global ni lectura de continuidad privada.'],
  puzzles:[],minigames:[],routes:0,retries:0,replayChecks:0};
const allowed=new Set(['if','then','else','end','quest','stage','done','say','text','set','choice','prompt','battle','lose','noLoss','onWin','onLose','onQuit','heal','puzzle','onSolve','minigame','give','n','money']);
const activityDefs=[];
function walk(list){
  for(const c of list){
    if(typeof c==='string')continue;
    assert.ok(Object.keys(c).every(k=>allowed.has(k)),'Comando fuera del contrato: '+Object.keys(c));
    if(c.say)assert.ok(pack.npcs[c.say]||['misty','bill','sabrina'].includes(c.say));
    if(c.battle)assert.ok(pack.trainers[c.battle]);
    if(c.quest)assert.ok(pack.quests[c.quest]);
    if(c.give)assert.ok(items[toID(c.give)],c.give);
    if(c.puzzle){
      const P=PZ.parsePuzzle(c.puzzle);
      assert.deepEqual(P.errors,[]);
      const steps=PZ.solve(P);assert.ok(steps,'Puzle sin solución: '+c.puzzle.id);
      let S=PZ.initState(P),pushes=0;
      for(const d of steps){
        const previous=[...S.rocks].sort().join(';');
        S=PZ.step(P,S,d).state;
        if([...S.rocks].sort().join(';')!==previous)pushes++;
      }
      assert.ok(S.solved);
      assert.ok(pushes>0,'La meta permite omitir las placas: '+c.puzzle.id);
      assert.ok(PZ.doorsOpen(P,S),'No se abrió la puerta: '+c.puzzle.id);
      report.puzzles.push({id:c.puzzle.id,moves:steps.length,restartMayBeNeeded:PZ.canSoftlock(P)});
    }
    if(c.minigame){
      assert.deepEqual(MJ.checkDef(c.minigame,{has:id=>!!items[id],hasSp:id=>!!species[id]}),[]);
      activityDefs.push(c.minigame);
    }
    for(const k of ['then','else','onWin','onLose','onQuit','onSolve'])if(c[k])walk(c[k]);
    for(const o of c.choice||[])walk(o.then||[]);
  }
}
for(const [table,entries] of Object.entries(pack)){
  if(table==='patches')continue;
  for(const id of Object.keys(entries))assert.ok(id.startsWith('cg_faroles_'),id);
}
for(const q of Object.values(pack.quests)){
  assert.equal(q.type,'side');assert.equal(q.parts.items.length,2);
  for(const stage of Object.values(q.stages))assert.ok(stage.length<=240);
}
for(const t of Object.values(pack.trainers))for(const mon of t.team){
  assert.ok(species[mon.sp]&&!species[mon.sp].battleOnly,mon.sp);
  assert.ok(mon.lv>=53&&mon.lv<=57);
}
for(const scripts of Object.values(pack.scripts))walk(scripts);
for(const [id,g] of Object.entries(pack.gather)){
  assert.deepEqual(MJ.checkGatherGame(id,g,{has:id=>!!items[id],hasSp:id=>!!species[id]}),[]);
  assert.equal(g.hours,20);
}
for(const def of activityDefs){
  const rate=MJ.winRate(def,{n:32});
  assert.ok(rate.win>=0.75,'Minijuego excesivamente difícil: '+def.id+' '+rate.win);
  report.minigames.push({id:def.id,seeds:32,normalSkillWinRate:rate.win});
}
// Se ejecuta la implementación actual del intérprete, sin reimplementar runCmd.
const original=await fs.readFile(path.join(root,'app/js/guion.js'),'utf8');
const source=original.replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');
const noop=()=>{};
function harness(bits,manual=false){
  const G={player:{name:'Prueba',pron:'elle',money:100,badges:Array(8).fill('prueba')},party:[{sp:'lucario',hp:1}],flags:{},
    vars:{cap:57},quests:{},inventory:{},minis:{},puzzles:{},found:{},diary:[]};
  const seen=new Set(['celeste','azafran','casa_bill']);
  const scope=()=>({flag:new Proxy(G.flags,{get:(t,k)=>t[k]??false}),badges:G.player.badges.length,visited:id=>seen.has(id)});
  const evalCond=expr=>expr===undefined?true:typeof expr==='boolean'?expr:!!new Function('s','with(s){return ('+expr+')}')(scope());
  const setPath=(key,value)=>{const [kind,id]=key.split('.');assert.equal(kind,'flag');G.flags[id]=value;};
  const addItem=(id,n)=>{id=toID(id);G.inventory[id]=(G.inventory[id]||0)+n;};
  let outcome='win',activity='win',choices=[],heals=0;
  const messages=[],errors=[];
  const env={D:{items,species},toID,C:pack,npc:id=>pack.npcs[id]||{name:id},G,evalCond,setPath,addItem,
    removeItem:()=>assert.fail('No debería gastar inventario'),count:id=>G.inventory[toID(id)]||0,
    markCaught:noop,saveGame:noop,beginScene:noop,endScene:noop,commitScene:noop,addHito:noop,
    createPokemon:noop,displayName:mon=>mon.sp,healFull:mon=>{mon.hp=100;heals++;},addHappy:noop,maxHp:()=>100,
    canTakeGmax:()=>false,uniqueKeyOf:()=>null,uniqueResult:noop,MJ,questHangs:()=>false};
  const api=new Function(...Object.keys(env),source+'\nreturn {runScript,UI};')(...Object.values(env));
  api.UI.say=async(_npc,text)=>{messages.push(text);};
  api.UI.choose=async(_prompt,labels)=>{
    assert.ok(labels.length);const choice=choices.shift();assert.ok(choice!==undefined&&choice<labels.length,'Elección inválida '+choice);return choice;
  };
  api.UI.toast=text=>{if(text.startsWith('Error en guion'))errors.push(text);};
  api.UI.battle=async cfg=>{assert.ok(cfg.noLoss,'Ensayo sin multa');assert.equal(G.party[0].hp,100,'Curación previa');G.party[0].hp=1;return {result:outcome};};
  api.UI.puzzle=async def=>{
    if(activity!=='win')return {result:'quit',moves:0};
    return {result:'solved',moves:PZ.solve(PZ.parsePuzzle(def)).length};
  };
  api.UI.minigame=async prepared=>activity==='win'?MJ.skipResult(prepared):{result:activity,score:0,won:[]};
  const run=async(id,options=[])=>{choices=[...options];await api.runScript(id);assert.deepEqual(errors,[]);assert.deepEqual(choices,[]);};
  const roundTrip=()=>{const snapshot=JSON.parse(JSON.stringify(G));for(const k of Object.keys(G))delete G[k];Object.assign(G,snapshot);};
  const visible=()=>Object.values(pack.patches).flatMap(p=>p.spots).filter(s=>evalCond(s.cond));
  return {G,run,roundTrip,visible,evalCond,messages,seen,setOutcome:x=>{outcome=x;},setActivity:x=>{activity=x;},getHeals:()=>heals};
}
for(let bits=0;bits<1024;bits++)for(const manual of [false,true]){
  const H=harness(bits,manual);
  for(let n=1;n<=5;n++){
    const p='cg_faroles_'+n+'_',first=(bits>>((n-1)*2))&1,second=(bits>>((n-1)*2+1))&1;
    assert.equal(H.visible().filter(s=>s.talk?.[0]?.script===p+'intro').length,1);
    const before=JSON.stringify(H.G);
    await H.run(p+'finish');assert.equal(JSON.stringify(H.G),before,'Cierre prematuro');
    await H.run(p+'intro',[first]);
    const afterIntro=JSON.stringify(H.G);
    await H.run(p+'intro');assert.equal(JSON.stringify(H.G),afterIntro,'Introducción repetida');
    // Ambas órdenes de las tareas, usando bits para variar el recorrido.
    const tasks=(bits&1)?[p+'segunda',p+'explore']:[p+'explore',p+'segunda'];
    for(const task of tasks){
      const snapshot=JSON.stringify(H.G);
      H.setActivity('quit');await H.run(task);assert.equal(JSON.stringify(H.G),snapshot,'Salir altera progreso');
      report.retries++;
      H.setActivity('lose');await H.run(task);assert.ok(!H.G.flags[p+(task.endsWith('segunda')?'task_b':'task_a')]);
      H.setActivity('win');
      await H.run(task);
      H.roundTrip();
      const completed=JSON.stringify(H.G);await H.run(task);
      assert.equal(JSON.stringify(H.G),completed,'Tarea repetida entrega botín');
      report.replayChecks++;
    }
    assert.ok(H.G.flags[p+'explored']);
    if(manual&&n<5)await H.run(p+'battle',[1]);
    else{
      H.setOutcome('lose');await H.run(p+'battle',[0]);
      assert.ok(!H.G.flags[p+'won'],'Derrota permite cobrar');
      H.roundTrip();
      await H.run(p+'battle',[n<5?2:1]);
      assert.ok(!H.G.flags[p+'won'],'Posponer permite cobrar');
      H.setOutcome('win');await H.run(p+'battle',[0]);assert.equal(H.G.party[0].hp,100);
    }
    await H.run(p+'finish',[second]);H.roundTrip();
    assert.ok(H.G.quests[p+'quest'].done);assert.ok(H.G.flags[p+'completed']);
    assert.equal(!!H.G.flags[p+'decision1_0']+!!H.G.flags[p+'decision1_1'],1);
    assert.equal(!!H.G.flags[p+'decision2_0']+!!H.G.flags[p+'decision2_1'],1);
    const completed=JSON.stringify(H.G);
    await H.run(p+'finish');await H.run(p+'battle');await H.run(p+'intro');
    assert.equal(JSON.stringify(H.G),completed,'Premios repetibles');
    report.replayChecks++;
  }
  assert.equal(H.G.player.money,2400);
  assert.equal(H.G.inventory.hyperpotion,6);
  assert.equal(H.visible().filter(s=>s.action?.gather).length,1,'Epílogos no exclusivos');
  report.routes++;
}
// Una partida previa y un jugador sin Lucario pueden completar el arco: no depende de miembros concretos.
const old=harness(0);old.G.party=[{sp:'pikachu',hp:1}];old.seen.delete('azafran');
await old.run('cg_faroles_1_intro');assert.deepEqual(old.G.flags,{});
old.seen.add('azafran');
for(let n=1;n<=5;n++){
  const p='cg_faroles_'+n+'_';
  await old.run(p+'intro',[0]);await old.run(p+'explore');await old.run(p+'segunda');
  await old.run(p+'battle',[0]);await old.run(p+'finish',[0]);old.roundTrip();
}
assert.ok(old.G.flags.cg_faroles_5_completed);
assert.equal(old.G.party[0].sp,'pikachu');
report.partyRequirement='Serie completa con Pikachu, sin Riolu/Lucario ni coste de inventario.';
console.log(JSON.stringify(report,null,2));
