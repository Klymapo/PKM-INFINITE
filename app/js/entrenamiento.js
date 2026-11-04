import { G } from './state.js';
export const LADDER=10;
export const ladderKey=t=>'escalera:'+(t.trainers||[]).join(',');
export const eliteWins=(t,g=G)=>(t.trainers||[]).reduce((n,id)=>n+(g.beaten?.[id+'__elite']||0),0);
export function trainingBoss(t,g=G) {
 if(!t.trainers?.length)return{state:'none',wins:0,need:LADDER};
 const key=ladderKey(t),wins=eliteWins(t,g);
 const defeated=!!g.flags?.[key] || (g.beaten?.[key.replace(/[:,]/g,'_')]||0)>0;
 return{state:defeated?'defeated':wins>=LADDER?'ready':'locked',wins,need:LADDER};
}
