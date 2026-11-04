// Preparación del jugador automático: usar recursos que ganó durante el recorrido.
import { D } from '../app/js/data.js';
export function equipOwnedMegas(party, bag, unlocked) {
 if (!unlocked) return;
 for (const p of party) {
  if (p.item) continue;
  const id = Object.keys(bag).find(id => bag[id] > 0 && D.items[id]?.mega?.some(form => D.species[form]?.base === p.sp));
  if (id) { bag[id]--; p.item = id; }
 }
}
