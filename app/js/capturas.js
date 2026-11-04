// Disponibilidad local: no confundir los equipos ajenos con encuentros capturables.
import { C } from './content.js';
import { G, evalCond } from './state.js';
import { spotsOf, tramoItems, dexnavTerrains, encounterTable, trainingOpen } from './world.js';
export const trainingWild = t => (t.wild || []).filter(e=>e.cond===undefined || evalCond(e.cond));
export function trainingRoster(t) {
 const open=trainingOpen(t.cap || G.vars.cap || 15), rows=[];
 for(const id of t.trainers || []) for(const m of C.trainers[id]?.team || []) rows.push({...m,source:'trainer',state:'battle',reason:'Pertenece a un instructor'});
 for(const m of t.wild || []) {
  const available=open && (m.cond===undefined || evalCond(m.cond));
  rows.push({...m,source:'wild',state:!available?'unavailable':m.noCatch?'battle':'catch',reason:!open?'La práctica está cerrada por el nivel del equipo':!available?'Requiere otra condición del lugar':m.noCatch?'Este encuentro no permite capturas':'Buscar salvajes'});
 }
 return rows;
}
export function localCaptureIndex(loc=C.locations[G.loc]) {
 const out={catch:new Set(),battle:new Set(),unavailable:new Set()};
 if(!loc) return out;
 for(const terrain of dexnavTerrains(loc)) for(const e of encounterTable(loc,terrain)) out[e.noCatch?'battle':'catch'].add(e.sp);
 const spots=spotsOf(loc).slice();
 if(loc.route) {
  const pos=G.route?.id===loc.id?G.route.pos:0;
  for(const e of tramoItems(loc,pos)) { if(e.spot && (e.spot.cond===undefined || evalCond(e.spot.cond))) spots.push(e.spot); if(e.trainer) spots.push({action:{trainer:e.trainer}}); }
 }
 for(const spot of spots) {
  const a=spot.action || {};
  if(a.training) for(const e of trainingRoster(a.training)) out[e.state].add(e.sp);
  if(a.trainer) for(const e of C.trainers[a.trainer]?.team || []) out.battle.add(e.sp);
 }
 return out;
}
export function captureLabel(id,index) {
 if(index.catch.has(id)) return {state:'catch',text:'Capturable aquí'};
 if(index.battle.has(id)) return {state:'battle',text:'Solo combate aquí'};
 if(index.unavailable.has(id)) return {state:'unavailable',text:'No disponible ahora'};
 return {state:'unknown',text:'Sin captura local confirmada'};
}
