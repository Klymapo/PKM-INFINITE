// El cuarto del jugador en el ático de Luminalia (B5, pasada extra): vitrina de medallas y muro de encuentros.
// Lógica pura: lee la partida (g) y el contenido (C, D) y devuelve texto para una hoja de papel
// ({ read: { title, gen: 'medallas' | 'muro' } }, ver docs/CONTENIDO.md §7). Se prueba en Node:
// herramientas/test/atico-test.mjs.
// Regla: nada se inventa. Cada cuadro sale de algo que ya está en la partida (Pokémon, flags o registros del motor).
import { C } from './content.js';
import { D } from './data.js';

const GEN = { medallas: medallasTexto, muro: muroTexto };
export const GENS = Object.keys(GEN);
export function genText(id, g) {
	try { return GEN[id] ? GEN[id](g) : ''; } catch (e) { console.error(e); return '…'; }
}

// ---------------- Registro de primeras veces (lo llama el motor) ----------------
/** Apunta la primera vez de algo (mega, tera, z, dyn) con el Pokémon que lo hizo. No sobrescribe. */
export function notaPrimera(g, kind, p, loc) {
	if (!g || !kind) return;
	const m = (g.muro ||= {});
	if (m[kind]) return;
	m[kind] = { sp: p?.sp || '', nick: p?.nick || '', uid: p?.uid || '', at: loc || g.loc || '', t: Date.now() };
}

// ---------------- Vitrina de medallas ----------------
/** Medallas de la partida agrupadas por región, en el orden de las regiones y, dentro, en el orden en que se ganaron. */
export function vitrina(g) {
	const groups = new Map();
	for (const id of g?.player?.badges || []) {
		const b = C.badges[id];
		const r = b?.region || '_';
		if (!groups.has(r)) groups.set(r, []);
		groups.get(r).push({ id, name: b?.name || id, desc: b?.desc || '', type: b?.type || '' });
	}
	const order = Object.keys(C.regions);
	const pos = r => { const i = order.indexOf(r); return i < 0 ? 999 : i; };
	return [...groups.entries()].sort((a, b) => pos(a[0]) - pos(b[0]))
		.map(([r, badges]) => ({ region: r, name: C.regions[r]?.name || 'Otras', badges }));
}

export function medallasTexto(g) {
	const v = vitrina(g);
	if (!v.length) return '*(Terciopelo azul, huecos de sobra en cada estante y ninguna medalla todavía. El cristal está limpio. Espera.)*';
	const out = ['*(Una vitrina de madera con un estante por región. Cada medalla tiene su ficha, escrita a mano.)*'];
	for (const r of v) {
		out.push('', `**${r.name}** · ${r.badges.length === 1 ? 'una medalla' : r.badges.length + ' medallas'}`);
		for (const b of r.badges) out.push(`· **${b.name}** — ${b.desc.replace(/^Circuito Infinito · /, '') || 'Sin ficha.'}`);
	}
	const n = v.reduce((a, r) => a + r.badges.length, 0);
	out.push('', `*Total: ${n}. El estante de abajo sigue vacío, por si acaso.*`);
	return out.join('\n');
}

// ---------------- Muro de encuentros ----------------
const sp = id => D.species[id];
const spName = id => sp(id)?.name || id;
const locName = id => (id && C.locations[id]?.name) || '';
const nameOf = p => p.nick || spName(p.sp);
const aNivel = lv => lv ? `, a nivel ${lv}` : '';
const enLugar = id => locName(id) ? ` en ${locName(id)}` : '';

/** Todos los Pokémon de la partida: equipo, cajas y los que trabajan en negocios. */
export function allMons(g) {
	const out = [...(g?.party || [])];
	for (const b of g?.boxes || []) for (const p of b || []) if (p) out.push(p);
	for (const v of Object.values(g?.neg || {})) for (const p of v?.workers || []) if (p) out.push(p);
	return out.filter(p => p && p.sp && sp(p.sp));
}

const isLine = (from, to) => { for (let i = 0, id = to; i < 4 && id; i++, id = sp(id)?.prevo) if (id === from) return true; return false; };

/** ¿De qué especie llegó? Solo afirma lo que se puede saber: registro del motor, regalos conocidos o evolución por nivel
 *  que no pudo pasar antes de llegar (llegó por debajo del nivel de esa etapa). Si no se sabe, devuelve la especie actual. */
export function origen(p, g) {
	const rec = p.flags?.evo;
	if (Array.isArray(rec) && rec.length && rec[0].from && isLine(rec[0].from, p.sp)) return rec[0].from;
	if (p.uid && p.uid === g?.vars?.riolu_uid && isLine('riolu', p.sp)) return 'riolu';
	if (g?.flags?.b01_candela_unida && p.nick === 'Candela' && isLine('mareep', p.sp)) return 'mareep';
	let cur = p.sp;
	for (let i = 0; i < 3; i++) {
		const s = sp(cur);
		if (!s?.prevo || s.evoType || s.evoCondition || s.evoRegion || !s.evoLevel) break;
		if (s.evoLevel > (p.metLv || 0)) cur = s.prevo; else break;
	}
	return cur;
}

/** ¿Pudo evolucionar por nivel y se quedó como está? (registrado por el motor o deducible sin dudas) */
export function noEvo(p) {
	if (p.flags?.noevo) return p.flags.noevo;
	if (p.item === 'everstone') return null;
	for (const e of sp(p.sp)?.evos || []) {
		const s = sp(e);
		if (!s || s.evoType || s.evoCondition || s.evoRegion || !s.evoLevel) continue;
		// creció contigo por encima de su nivel de evolución (y no llegó ya pasado de él)
		if (p.lv > s.evoLevel && (p.metLv || 0) <= s.evoLevel && p.lv > (p.metLv || 0)) return { sp: e, lv: s.evoLevel };
	}
	return null;
}

const animo = p => p.happy >= 250 ? 'Te seguiría a cualquier Puerta.' : p.happy >= 160 ? 'Se le nota a gusto contigo.' : p.happy < 100 ? 'Todavía te mira un poco de lado. Ya llegará.' : '';
const legend = s => (s?.tags || []).some(t => /Legendary|Mythical|Ultra Beast|Paradox/.test(t));

/** Cuadros del muro, en orden. Cada uno: { id, title, text }. */
export function muro(g) {
	const mons = allMons(g), out = [];
	const add = (id, title, text) => out.push({ id, title, text: text.replace(/\s+/g, ' ').trim() });
	const byUid = uid => mons.find(p => p.uid === uid);
	const riolu = g?.vars?.riolu_uid ? byUid(g.vars.riolu_uid) : null;
	const used = new Set();

	// 1. El primero
	if (riolu) {
		used.add(riolu.uid);
		const o = origen(riolu, g);
		add('primero', `${nameOf(riolu)}, el primero`, `Se unió al equipo${enLugar(riolu.metAt)}${aNivel(riolu.metLv)}${o !== riolu.sp ? `, cuando todavía era un ${spName(o)}` : ''}. Hoy es nivel ${riolu.lv}. ${animo(riolu)}`);
	}
	// 2. El segundo (el siguiente que llegó, sea como sea)
	const resto = mons.filter(p => p !== riolu && p.metDate).sort((a, b) => a.metDate - b.metDate);
	if (riolu && resto[0]) {
		const p = resto[0];
		used.add(p.uid);
		add('segundo', `${nameOf(p)}, el segundo`, `${p.nick ? spName(p.sp) + '. ' : ''}Se unió${enLugar(p.metAt)}${aNivel(p.metLv)}, cuando en el equipo todavía cabían todos en un banco. Hoy es nivel ${p.lv}.`);
	}
	// 3. Candela
	const candela = g?.flags?.b01_candela_unida ? mons.find(p => p.nick === 'Candela' && isLine('mareep', p.sp)) : null;
	if (candela) {
		used.add(candela.uid);
		add('candela', 'Candela', `La Mareep de la Ruta 5 que brillaba de miedo dentro de una jaula. ${candela.sp !== 'mareep' ? `Ahora es ${spName(candela.sp)}, nivel ${candela.lv}, y brilla por otras razones.` : `Sigue siendo Mareep, nivel ${candela.lv}. Brilla por otras razones.`}`);
	}
	// 4. Primer Pokémon de otro color
	const shiny = mons.filter(p => p.shiny).sort((a, b) => (a.metDate || 0) - (b.metDate || 0))[0];
	if (shiny) add('shiny', 'Un color que no tocaba', `${shiny.nick ? shiny.nick + ', un ' : 'Un '}${spName(shiny.sp)} de un color que casi nadie ve. Fue${enLugar(shiny.metAt)}${aNivel(shiny.metLv)}. ${animo(shiny)}`);
	// 5. Mecánicas: la primera vez que se usaron (registro del motor) o, para la Mega, la piedra que ya lleva
	const M = g?.muro || {};
	const quien = r => { const p = r.uid && byUid(r.uid); return p ? nameOf(p) : (r.nick || spName(r.sp)); };
	if (M.mega) add('mega', 'La primera Megaevolución', `${quien(M.mega)}${enLugar(M.mega.at)}. Un destello, la piedra caliente en la mano y, después, un silencio raro.`);
	else if (g?.flags?.mec_mega) {
		const p = mons.find(x => { const st = D.items[x.item]; return st?.mega && st.mega.some(m => sp(m)?.base === x.sp); });
		if (p) add('mega', `La ${D.items[p.item].name}`, `${nameOf(p)} la lleva encima. Cuando los dos lo sienten a la vez, cambia.`);
	}
	if (M.z) add('z', 'El primer movimiento Z', `${quien(M.z)}${enLugar(M.z.at)}. Todo el cuerpo a la vez, como un baile que no sabías que sabías.`);
	if (M.dyn) add('dyn', 'La primera vez que creció', `${quien(M.dyn)}${enLugar(M.dyn.at)}. Tan grande que no cabía en la foto. La foto es de un pie.`);
	if (M.tera) add('tera', 'El primer cristal', `${quien(M.tera)}${enLugar(M.tera.at)}, teracristalizado. La foto tiene reflejos por todas partes.`);
	// 6. Los que crecieron contigo
	const evos = mons.map(p => ({ p, o: origen(p, g) })).filter(x => x.o !== x.p.sp);
	const stages = x => { let n = 0; for (let id = x.p.sp; id && id !== x.o && n < 4; id = sp(id)?.prevo) n++; return n; };
	evos.sort((a, b) => (b.p === riolu) - (a.p === riolu) || (!!b.p.nick - !!a.p.nick) || stages(b) - stages(a) || b.p.lv - a.p.lv);
	const top = evos.filter(x => !used.has(x.p.uid)).slice(0, 4);
	for (const x of top) add('evo_' + x.p.uid, `${nameOf(x.p)}: de ${spName(x.o)} a ${spName(x.p.sp)}`, `Dos fotos pegadas con cinta, una al lado de la otra. En la primera${x.p.nick ? ` ${x.p.nick}` : ''} cabe en una mano. En la segunda, no.`);
	const mas = evos.filter(x => !used.has(x.p.uid) && !top.includes(x));
	if (mas.length) add('evo_mas', 'Y los demás que crecieron contigo', `Una tira de fotos de cabina: ${mas.slice(0, 8).map(x => nameOf(x.p)).join(', ')}${mas.length > 8 ? ` y ${mas.length - 8} más` : ''}. Todos empezaron más pequeños.`);
	// 7. El que no quiso evolucionar
	for (const p of mons) {
		const n = noEvo(p);
		if (n) { add('noevo_' + p.uid, `${nameOf(p)}, que no quiso`, `Pudo ser ${spName(n.sp)}. Se quedó como ${spName(p.sp)}, nivel ${p.lv}. Tendrá sus razones; el muro no pregunta.`); break; }
	}
	if (g?.flags?.b05_terron_estribo) add('terron', 'Un amigo del Rancho Ohana', 'Terrón, el Mudbray de Don Kekoa, con su estribo nuevo. No es tuyo, pero se coló en el muro. Nadie lo ha quitado.');
	// 8. Encuentros que no se repiten
	for (const p of mons.filter(x => legend(sp(x.sp))).slice(0, 3)) add('leyenda_' + p.uid, nameOf(p), `${spName(p.sp)}. Llegó${enLugar(p.metAt)}. La foto está un poco movida: te temblaba el pulso.`);
	// 9. Amistad al máximo
	const llenos = mons.filter(p => p.happy >= 255);
	if (llenos.length) add('amistad', 'Con el corazón lleno', `${llenos.slice(0, 6).map(nameOf).join(', ')}${llenos.length > 6 ? ` y ${llenos.length - 6} más` : ''}. Una foto de grupo en la que nadie mira a la cámara: te miran a ti.`);
	return out;
}

export function muroTexto(g) {
	const m = muro(g);
	if (!m.length) return '*(Una pared de corcho con tachuelas de colores. Todavía no hay fotos. Las primeras siempre tardan.)*';
	return ['*(Fotos de la Pokédex impresas en papel brillante, cada una con una nota a lápiz debajo. Algunas están torcidas.)*']
		.concat(m.map(c => `\n**${c.title}**\n${c.text}`)).join('\n');
}
