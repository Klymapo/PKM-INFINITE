// Recompensa diaria por individuo, conservada al evolucionar y al pasar por la PC.
import { now } from './time.js';
export function friendshipDay(d = now()) {
 return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
export function convivir(p, d = now()) {
 const day = friendshipDay(d), before = p.happy || 0;
 const rewarded = !p.bondDay || p.bondDay < day;
 if (rewarded) { p.bondDay = day; p.happy = Math.min(255, before + 15); }
 return { before, after: p.happy || 0, gained: (p.happy || 0) - before, rewarded };
}
