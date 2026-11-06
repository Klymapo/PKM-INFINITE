// Prueba editorial automática del episodio Johto, sin publicar.
import { strict as assert } from 'node:assert';
import paquete from '../../app/content/johto/cg-carga-johto-completo.js';
import { newGame, G, evalCond } from '../../app/js/state.js';

const scripts=paquete.scripts;
const DIARIOS_ESPERADOS=13;
const RESULTADOS=[];
for(const [script,steps] of Object.entries(scripts)){
  const diarios=[];
  const rotom=[];
  function visit(node){
    if(Array.isArray(node)){node.forEach(visit);return;}
    if(!node||typeof node!=='object')return;
    if(typeof node.diary==='string')diarios.push(node);
    if(node.say==='rotom'&&typeof node.text==='string')rotom.push(node);
    for(const [k,v] of Object.entries(node)){
      if(k==='diary'||k==='text')continue;
      if(typeof v==='object'&&v!==null)visit(v);
    }
  }
  visit(steps);
  if(diarios.length){
    assert.equal(diarios.length,3,script+': exige tres variantes y ninguna voz genérica');
    const out={id:script};
    for(const mode of ['purgado','reformado','doble']){
      newGame();
      G.flags.b01_diario=true;
      G.flags['b06_eco_'+mode]=true;
      const active=diarios.filter(s=>evalCond(s.cond));
      assert.equal(active.length,1,script+': no hay una única entrada en rama '+mode);
      out[mode]=active[0].diary.length;
      if(mode==='reformado')assert(active[0].diary.includes('*(Omitido: nada.)*'),script+': falta marca del Diario reformado');
      if(mode==='purgado')assert(!/[¡!]|bzzt/i.test(active[0].diary),script+': Rotom purgado no puede exclamar ni decir Bzzt');
      if(mode==='doble')assert(!active[0].diary.includes('*(Omitido: nada.)*'),script+': Rotom doble no revela omisiones');
    }
    RESULTADOS.push(out);
  }
  for(const mode of ['purgado','reformado','doble']){
    newGame();
    G.flags['b06_eco_'+mode]=true;
    for(const step of rotom.filter(s=>evalCond(s.cond))){
      if(mode==='purgado')assert(!/[¡!]|bzzt/i.test(step.text),script+': intervención purgada incompatible');
    }
  }
}
assert.equal(RESULTADOS.length,DIARIOS_ESPERADOS,'Se esperaban '+DIARIOS_ESPERADOS+' escenas con Diario, hay '+RESULTADOS.length);
const all=Object.values(scripts).flatMap(x=>x).length;
console.log('✔ Lector estructural: '+RESULTADOS.length+' escenas con tres Diarios exclusivos (purgado/reformado/doble).');
console.log('✔ Todas las intervenciones de Rotom en rama purgada, sin Bzzt ni exclamaciones.');
console.log('✔ Escrituras condicionadas por decisiones, ninguna voz genérica de Diario.');
console.log(JSON.stringify({diarios:RESULTADOS.length, scripts:Object.keys(scripts).length, pasosIniciales:all, detalle:RESULTADOS}));
