// Pruebas de las carreras de monturas (app/js/carreras.js) con los circuitos publicados.
// Uso: node herramientas/test/carreras-test.mjs
import { loadDataNode } from './node-env.mjs';
import { C, registerBlock } from '../../app/js/content.js';
import { newGame, setG, G } from '../../app/js/state.js';
loadDataNode();
const mod = await import('../../app/content/index.js');
for (const b of mod.BLOCKS) registerBlock(b);
const CR = await import('../../app/js/carreras.js');

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('✖', m); } else console.log('✔', m); };
const fresh = flags => { setG(newGame({ name: 'Prueba' })); Object.assign(G.flags, flags || {}); };

ok(Object.keys(C.races).length >= 3, `hay ${Object.keys(C.races).length} circuitos`);
const OWN = { kalos: 'rhyhorn', alola: 'lapras', teselia: 'aerodactyl' };
const win = (id, mount, q, n = 60) => {
	let w = 0;
	for (let s = 0; s < n; s++) { const r = CR.autoRun(id, mount, q, 'p' + s); if (CR.standing(r.rivals, r.mine).pos === 1) w++; }
	return w / n;
};
for (const id of Object.keys(C.races)) {
	const def = C.races[id];
	fresh({ mount_rhyhorn: true, mount_lapras: true, mount_aerodactyl: true });
	const ms = CR.mountsFor(id).map(m => m.id);
	ok(ms.includes(OWN[id]) && def.rent.every(r => ms.includes(r)), `${id}: monturas propias y de alquiler (${ms.join(', ')})`);
	fresh();
	ok(CR.mountsFor(id).every(m => m.rent), `${id}: sin monturas propias solo salen las de alquiler`);
	ok(def.tramos.every(t => t.paths.some(p => !p.need)), `${id}: todo tramo tiene un camino para cualquiera`);
	// Equilibrio: con la montura buena y buenos saltos se gana casi siempre; con saltos malos, no; con alquiler y buenos saltos, a veces
	const good = win(id, OWN[id], 3), mid = win(id, OWN[id], 2), bad = win(id, OWN[id], 0);
	const rents = def.rent.map(r => win(id, r, 3));
	console.log(`   ${id}: propia q3 ${Math.round(good * 100)} % · q2 ${Math.round(mid * 100)} % · q0 ${Math.round(bad * 100)} % · alquiler q3 ${rents.map(x => Math.round(x * 100) + ' %').join(' / ')}`);
	ok(good >= 0.75, `${id}: con su montura y saltos perfectos se gana casi siempre`);
	ok(bad <= 0.5, `${id}: con saltos fallidos no se gana siempre`);
	ok(Math.max(...rents) >= 0.15 && Math.max(...rents) <= good, `${id}: de alquiler se puede ganar, pero cuesta más`);
	// Cada montura propia tiene ventaja en algún sitio: hay al menos un atajo para ella en el circuito
	ok(def.tramos.some(t => t.paths.some(p => p.need === CR.MOUNTS[OWN[id]].skill)), `${id}: la montura de la región abre algún atajo`);
	// Premios y récord
	fresh();
	const t0 = Date.now();
	const r = CR.autoRun(id, OWN[id], 3, 'fijo');
	const a = CR.finishRace(id, OWN[id], r.mine, r.rivals, t0);
	ok(a.pos === 1 && a.first && a.prizes.length === def.prize.first.length && G.bag[def.prize.first[0].id] === 1, `${id}: la primera victoria da el premio de estreno`);
	ok(G.flags['carrera_' + id + '_ganada'], `${id}: marca la carrera como ganada`);
	const b = CR.finishRace(id, OWN[id], r.mine, r.rivals, t0 + 3600e3);
	ok(b.pos === 1 && !b.prizes.length, `${id}: ganar otra vez el mismo día no da premio`);
	const faster = r.mine.map(x => x - 0.3);
	const c = CR.finishRace(id, OWN[id], faster, r.rivals, t0 + 2 * 3600e3);
	ok(c.record && c.prizes.some(p => p.why === 'record'), `${id}: batir el récord da su premio`);
	const d = CR.finishRace(id, OWN[id], r.mine, r.rivals, t0 + 25 * 3600e3);
	ok(d.prizes.some(p => p.why === 'win'), `${id}: al día siguiente, ganar vuelve a dar premio`);
	ok(CR.raceState(id).best === c.total && CR.raceState(id).runs === 4, `${id}: guarda el mejor tiempo y las carreras`);
	const slow = r.mine.map(x => x + 30);
	const e = CR.finishRace(id, OWN[id], slow, r.rivals, t0 + 30 * 3600e3);
	ok(e.pos === 4 && !e.record && !e.prizes.some(p => p.why !== 'podium'), `${id}: llegar último no da nada ni cambia el récord`);
	// Nada de dinero
	ok(G.player.money === newGame({ name: 'x' }).player.money, `${id}: las carreras no dan dinero`);
}
ok(CR.fmtTime(64.3) === '1:04,3' && CR.fmtTime(9.25).startsWith('9,'), 'formato de tiempo');
console.log(fails ? `\n✖ ${fails} fallos` : '\n✔ Carreras: todo bien');
process.exit(fails ? 1 : 0);
