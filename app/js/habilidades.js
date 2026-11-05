// Las excepciones personales nunca alteran la tabla de especies.
import { D, toID } from './data.js';
export function abilityOptions(p, method) {
 const slots = D.species[p.sp]?.abil || {};
 let options = [];
 if (method === 'custom' && p.sp === 'golisopod') {
  options = ['emergencyexit', 'shellarmor', 'swarm', 'hypercutter'].map(id => ({ id, slot: '0' }));
 } else if (method === 'abilitycapsule' && p.abilSlot !== 'H' && !p.abilityCustom) {
  options = ['0', '1'].filter(slot => slots[slot]).map(slot => ({ id: toID(slots[slot]), slot }));
  if (!options.some(o => o.id === p.abil)) return [];
 } else if (method === 'abilitypatch' && slots.H && !p.abilityCustom) {
  options = [{ id: toID(slots.H), slot: 'H' }];
 }
 return options.filter(o => o.id !== p.abil && D.abilities[o.id]);
}
export function changeAbility(p, method, id) {
 const option = abilityOptions(p, method).find(o => o.id === id);
 if (!option) return false;
 p.abil = option.id;
 p.abilSlot = option.slot;
 p.abilityCustom = method === 'custom' && id !== 'emergencyexit';
 return true;
}
