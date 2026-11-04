// Catálogo de especies: región de origen, no listas regionales oficiales.
import { D } from './data.js';
export const DEX_ORIGINS = [['all','Todas'],['kanto','Kanto'],['johto','Johto'],['hoenn','Hoenn'],['sinnoh','Sinnoh'],['teselia','Teselia'],['kalos','Kalos'],['alola','Alola'],['galar','Galar'],['hisui','Hisui'],['paldea','Paldea']];
const GENERATIONS = ['','kanto','johto','hoenn','sinnoh','teselia','kalos','alola','galar','paldea'];
export const normalizeDex = v => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
export function dexOrigin(s) {
 const form = normalizeDex(s.forme);
 if (form.includes('alola')) return 'alola';
 if (form.includes('galar')) return 'galar';
 if (form.includes('hisui')) return 'hisui';
 if (form.includes('paldea')) return 'paldea';
 if (s.num >= 899 && s.num <= 905) return 'hisui';
 return GENERATIONS[s.gen] || 'all';
}
export function dexCatalog() {
 const nums = new Set(Object.values(D.byNum));
 return Object.entries(D.species).filter(([id,s]) => nums.has(id) || (s.base && !s.battleOnly && /alola|galar|hisui|paldea/i.test(s.forme || ''))).map(([id,s]) => ({id,...s}));
}
export function evolutionMatch(s, mode) {
 const next = (s.evos || []).map(id=>D.species[id]).filter(Boolean);
 if (mode === 'can') return next.length > 0;
 if (mode === 'first') return !s.prevo && next.length > 0;
 if (mode === 'middle') return !!s.prevo && next.length > 0;
 if (mode === 'final') return !!s.prevo && !next.length;
 if (mode === 'single') return !s.prevo && !next.length;
 if (mode === 'friendship') return next.some(e=>e.evoType==='levelFriendship');
 if (mode === 'item') return next.some(e=>['useItem','levelHold','trade'].includes(e.evoType));
 return true;
}
export function queryDex({dex,owned=new Set(),origin='all',type='all',status='seen',evolution='all',search='',sort='number'}={}) {
 const term = normalizeDex(search).replace(/^#/, '');
 const list = dexCatalog().filter(s => {
  const caught=!!dex?.caught?.[s.num], seen=!!dex?.seen?.[s.num] || caught;
  if (origin!=='all' && dexOrigin(s)!==origin) return false;
  if (type!=='all' && !s.types.includes(type)) return false;
  if (status==='seen'&&!seen || status==='caught'&&!caught || status==='uncaught'&&(!seen||caught) || status==='missing'&&caught || status==='unknown'&&seen || status==='owned'&&!owned.has(s.id)) return false;
  if (!evolutionMatch(s,evolution)) return false;
  return !term || (seen && normalizeDex(s.name).includes(term)) || String(s.num)===String(Number(term)) || String(s.num).padStart(4,'0')===term;
 });
 return list.sort((a,b)=> sort==='name' ? (normalizeDex(a.name).localeCompare(normalizeDex(b.name),'es') || a.num-b.num) : sort==='strength' ? b.bs.reduce((s,n)=>s+n,0)-a.bs.reduce((s,n)=>s+n,0) || a.num-b.num : a.num-b.num || a.id.localeCompare(b.id));
}
