// Auditoría automática completa (la parte que no necesita ojos humanos).
// Uso: node herramientas/auditar.mjs [--semillas 12] [--rapido] [--hilos N]
//      node herramientas/auditar.mjs --rapida [--bloque bNN] [--semillas 4] [--hilos N]
//
// Completa: ejecuta todo esto (el informe sale en este orden):
//   1. Validador de contenido (bloquea si hay ERRORES) y los bots Superfan (canon), Game Tester (lógica) y Game Designer (diseño); estos tres solo avisan.
//   2. Bot de recorrido con N semillas de día (13 h) y N de noche (3 h).
//   2b. Hub de misiones (herramientas/hub.mjs): lo que anuncian Novedades, Diario, 📌 y las marcas existe de verdad (bloquea si hay graves).
//   3. Bot en la fecha de inicio de cada evento por fechas.
//   4. Registro automático de continuidad.
//   5. Prueba de humo en un navegador con pantalla de móvil.
//   6. Designer de Canvas: UX/UI de todas las pantallas (solo avisa).
// Escribe el informe en secreto/auditorias/AAAA-MM-DD.md y sale con código 1 si algo bloquea la publicación.
//
// Todas las piezas son procesos independientes y corren en paralelo (`--hilos N`, por defecto os.availableParallelism()).
// El informe y los criterios de bloqueo no dependen del orden en que terminen. El Designer de Canvas reutiliza la
// partida del recorrido de día de la semilla 2 (la misma que generaba él solo) en vez de jugarla otra vez.
//
// Rápida (`--rapida`), para usar mientras se trabaja: validador, Game Tester, pruebas de cinemáticas y minijuegos y
// 4 recorridos (semillas 1–4, día y noche alternos) hasta el final del bloque (`bNN_fin` o, si aún no existe, el último
// `bNN_tN_hecho`). Sin hub, humo, UX, Superfan, Designer ni registro. `--bloque` por defecto: el último cargado; si el
// bloque no está en BLOCKS lo carga con INFINITO_EXTRA. No toca secreto/: el informe va a una carpeta temporal.
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i >= 0 ? process.argv[i + 1] : d; };
const RAPIDA = process.argv.includes('--rapida');
const N = +arg('--semillas', RAPIDA ? 4 : process.argv.includes('--rapido') ? 4 : 12);
const HILOS = Math.max(1, +arg('--hilos', 0) || (os.availableParallelism?.() ?? os.cpus().length));
const T0 = Date.now();
const tiempos = [];

function run(cmd, args, timeoutMs = 15 * 60e3, env = process.env) {
	return new Promise(res => {
		const t0 = Date.now();
		const p = spawn(cmd, args, { cwd: ROOT, env });
		let out = '';
		p.stdout.on('data', d => out += d); p.stderr.on('data', d => out += d);
		const t = setTimeout(() => { p.kill('SIGKILL'); out += '\n[TIEMPO AGOTADO]'; }, timeoutMs);
		p.on('close', code => { clearTimeout(t); tiempos.push([[cmd === 'node' ? '' : cmd, ...args].join(' ').trim(), Date.now() - t0]); res({ code, out }); });
	});
}
// Cola con HILOS huecos. Cada tarea ocupa `slots` huecos (el hub lanza sus propios hijos) y se elige la de más
// peso que quepa (primero lo largo, para que no se quede una tarea larga sola al final).
const cola = [];
let libres = HILOS;
function tarea(fn, { slots = 1, peso = 1 } = {}) {
	return new Promise((res, rej) => { cola.push({ fn, slots: Math.min(slots, HILOS), peso, res, rej }); cola.sort((a, b) => b.peso - a.peso); bombea(); });
}
function bombea() {
	for (let i = 0; i < cola.length;) {
		const t = cola[i];
		if (t.slots > libres) { if (t.peso >= 1000) break; i++; continue; } // el hub (el más largo) no se deja adelantar: si no, en máquinas grandes arrancaría el último
		cola.splice(i, 1); libres -= t.slots;
		Promise.resolve().then(t.fn).then(t.res, t.rej).finally(() => { libres += t.slots; bombea(); });
	}
}
const node = (args, o = {}) => tarea(() => run('node', args, o.timeout, o.env), o);

const fecha = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Mexico_City' });
const TESTS = ['herramientas/test/shift-test.mjs', 'herramientas/test/combates-encadenados.mjs', 'herramientas/test/rejilla-test.mjs', 'herramientas/test/unicos-tutor-test.mjs', 'herramientas/test/pc-multi-test.mjs', 'herramientas/test/negocios-test.mjs', 'herramientas/test/minijuegos-test.mjs', 'herramientas/test/cine-test.mjs', 'herramientas/test/fx-eventos-test.mjs', 'herramientas/test/hub-test.mjs', 'herramientas/test/atico-test.mjs', 'herramientas/test/galeria-test.mjs', 'herramientas/test/radio-test.mjs', 'herramientas/test/torneo-test.mjs', 'herramientas/test/encargados-test.mjs', 'herramientas/test/correo-test.mjs', 'herramientas/test/plantilla-test.mjs', 'herramientas/test/foto-test.mjs', 'herramientas/test/expediciones-test.mjs', 'herramientas/test/carreras-test.mjs', 'herramientas/test/rival-test.mjs', 'herramientas/test/historias-test.mjs', 'herramientas/test/sinergias-test.mjs', 'herramientas/test/cartas-test.mjs', 'herramientas/test/casos-test.mjs', 'herramientas/test/capitulos-test.mjs'];
const TESTS_RAPIDA = ['herramientas/test/cine-test.mjs', 'herramientas/test/minijuegos-test.mjs'];

// Bloque y flag final de la auditoría rápida
let HASTA = null, BLOQUE = null;
if (RAPIDA) {
	const m0 = await import(path.join(ROOT, 'app/content/index.js'));
	BLOQUE = arg('--bloque', m0.BLOCKS[m0.BLOCKS.length - 1].id);
	let b = m0.BLOCKS.find(x => x.id === BLOQUE);
	if (!b) {
		if (!fs.existsSync(path.join(ROOT, 'app/content', BLOQUE, 'index.js'))) { console.log(`No existe app/content/${BLOQUE}/index.js`); process.exit(2); }
		process.env.INFINITO_EXTRA = [...(process.env.INFINITO_EXTRA || '').split(',').filter(Boolean), BLOQUE].join(',');
		b = (await import(path.join(ROOT, 'app/content', BLOQUE, 'index.js'))).default;
	}
	const sets = new Set(), seen = new Set();
	const scan = o => { if (!o || typeof o !== 'object' || seen.has(o)) return; seen.add(o); if (o.set && typeof o.set === 'object') for (const k in o.set) if (k.startsWith('flag')) sets.add(k.split('.')[1]); for (const k in o) scan(o[k]); };
	scan(b);
	const hechos = [...sets].map(f => [f, f.match(new RegExp(`^${BLOQUE}_t(\\d+)_hecho$`))?.[1]]).filter(x => x[1] !== undefined).sort((x, y) => x[1] - y[1]);
	HASTA = arg('--hasta', sets.has(b.ends || BLOQUE + '_fin') ? (b.ends || BLOQUE + '_fin') : hechos.pop()?.[0]);
	if (!HASTA) { console.log(`El bloque ${BLOQUE} no pone ni ${BLOQUE}_fin ni ningún ${BLOQUE}_tN_hecho: pasa --hasta <flag>.`); process.exit(2); }
}
const TMP = path.join(os.tmpdir(), 'auditoria-rapida-' + fecha);
const informe = (nombre) => RAPIDA ? ['--informe', path.join(TMP, nombre + '.md')] : [];
if (RAPIDA) fs.mkdirSync(TMP, { recursive: true });

// ---------- Lanzar todo (cada pieza es un proceso aparte; las promesas se leen después, en el orden del informe) ----------
const P = {};
P.val = node(['herramientas/validar.mjs'], { peso: 30 });
if (!RAPIDA) P.fan = node(['herramientas/superfan.mjs'], { peso: 30 });
P.tester = node(['herramientas/tester.mjs', ...informe('tester')], { peso: 30 });
if (!RAPIDA) P.dis = node(['herramientas/disenador.mjs'], { peso: 30 });
P.tests = (RAPIDA ? TESTS_RAPIDA : TESTS).map(t => [t, node([t], { peso: 10 })]);
const botArgs = (s, hora) => ['herramientas/recorrido.mjs', '--semilla', String(s), '--hora', String(hora), ...(HASTA ? ['--hasta', HASTA] : [])];
const uxDir = path.join(os.tmpdir(), 'ux-' + fecha);
const uxSave = path.join(uxDir, 'partida.json');
const botJobs = [];
if (RAPIDA) for (let s = 1; s <= N; s++) botJobs.push({ s, hora: s % 2 ? 13 : 3 });
else for (let s = 1; s <= N; s++) for (const hora of [13, 3]) botJobs.push({ s, hora });
P.bots = botJobs.map(j => {
	// la partida de la semilla 2 de día es la que usa el Designer de Canvas (ux.py la generaba con el mismo bot y los mismos argumentos)
	const dump = !RAPIDA && j.s === 2 && j.hora === 13;
	if (dump) fs.mkdirSync(uxDir, { recursive: true });
	return node(botArgs(j.s, j.hora), { peso: dump ? 400 : 200, env: dump ? { ...process.env, DUMP: uxSave } : process.env });
});
let events = [];
if (!RAPIDA) {
	const HUB_HIJOS = 5; // 3 partidas de Mario + 2 semillas (ver herramientas/hub.mjs)
	const hubSlots = Math.min(HILOS, HUB_HIJOS);
	P.hub = tarea(() => run('node', ['herramientas/hub.mjs', '--hilos', String(hubSlots)], 20 * 60e3), { slots: hubSlots, peso: 1000 });
	const mod = await import(path.join(ROOT, 'app/content/index.js'));
	events = mod.BLOCKS.flatMap(b => b.events || []);
	P.ev = events.map(e => node(['herramientas/recorrido.mjs', '--semilla', '1', '--fecha', e.from, '--hora', '20'], { peso: 200 }));
	P.reg = node(['herramientas/registro.mjs'], { peso: 5 });
	P.humo = tarea(() => run('python3', ['herramientas/humo.py', '--salida', path.join(os.tmpdir(), 'humo-' + fecha)], 10 * 60e3), { peso: 300 });
	const iUx = botJobs.findIndex(j => j.s === 2 && j.hora === 13);
	const uxArgs = ['herramientas/ux.py', '--salida', uxDir];
	P.ux = (iUx >= 0 ? P.bots[iUx] : Promise.resolve()).then(() => tarea(() => run('python3', [...uxArgs, ...(fs.existsSync(uxSave) ? ['--partida', uxSave] : [])], 20 * 60e3), { peso: 900 }));
}

// ---------- Informe ----------
const report = [];
const blockers = [];
const warns = [];
report.push(RAPIDA ? `# Auditoría rápida · ${fecha} · ${BLOQUE} hasta \`${HASTA}\`` : `# Auditoría automática · ${fecha}`, '');

// 1. Validador
const val = await P.val;
report.push('## 1. Validador', '', '```', val.out.trim().slice(-3000), '```', '');
if (val.code !== 0) blockers.push('El validador encontró ERRORES');

// 1a. Superfan: detalles de canon que notaría un fan (no bloquea; los graves salen como aviso)
if (P.fan) {
	const fan = await P.fan;
	report.push('### Superfan (detalles de canon)', '', '```', fan.out.trim().slice(-1500), '```', '', 'Detalle completo en `secreto/auditorias/superfan-' + fecha + '.md`. Corrige los ✖ y revisa los ⚠; las · son opinables.', '');
	const fanGraves = +(fan.out.match(/Superfan: (\d+) graves/)?.[1] || 0);
	if (fan.code !== 0) warns.push('El Superfan no pudo terminar su revisión');
	else if (fanGraves) warns.push(`El Superfan encontró ${fanGraves} detalles graves de canon (ver su informe)`);
}

// 1a-bis. Game Tester (lógica: combates sin curar, escenas que se atascan…) y Game Designer (hub de misiones, reglas de bloque, colección)
for (const [nombre, prom, fich] of [['Game Tester', P.tester, 'tester'], ['Game Designer', P.dis, 'disenador']]) {
	if (!prom) continue;
	const r = await prom;
	report.push(`### ${nombre}`, '', '```', r.out.trim().slice(-1500), '```', '', RAPIDA ? `Detalle completo en \`${path.join(TMP, fich + '.md')}\`.` : `Detalle completo en \`secreto/auditorias/${fich}-${fecha}.md\`.`, '');
	const g = +(r.out.match(/: (\d+) graves/)?.[1] || 0);
	if (r.code !== 0) warns.push(`El ${nombre} no pudo terminar su revisión`);
	else if (g) warns.push(`El ${nombre} encontró ${g} problemas graves (ver su informe)`);
}

// 1b. Pruebas del motor
for (const [t, prom] of P.tests) {
	const r = await prom;
	report.push(`Prueba \`${t}\`: ${r.code === 0 ? 'OK' : '**FALLA**'}`, '');
	if (r.code !== 0) { blockers.push(`Falla la prueba ${t}`); report.push('```', r.out.slice(-2000), '```', ''); }
}

// 2. Bot de recorrido
const parse = out => ({
	fin: /Final alcanzado: SÍ/.test(out),
	lost: +(out.match(/perdidos (\d+)/)?.[1] || 0),
	errores: /^ERRORES/m.test(out),
	atascos: /^ATASCOS/m.test(out),
	regalos: (out.split(/^REGALOS REPETIDOS:\n/m)[1] || '').split('\n').filter(l => l.startsWith('  ')).map(l => l.trim()),
	derrotas: [...(out.split(/^Derrotas:\n/m)[1] || '').split(/\n(?! {2})/)[0].matchAll(/^ {2}(\S+) en (\S+)/gm)].map(m => m[1]),
	nunca: (out.match(/Guiones nunca ejecutados \(\d+\): (.*)/)?.[1] || '').split(', '),
	out,
});
const runs = [];
for (const [i, j] of botJobs.entries()) runs.push({ s: j.s, hora: j.hora, ...parse((await P.bots[i]).out) });
const okRuns = runs.filter(r => r.fin && !r.errores);
report.push('## 2. Bot de recorrido', '', `${okRuns.length} de ${runs.length} recorridos llegan al final sin errores (${RAPIDA ? `hasta \`${HASTA}\`; ` : ''}día 13 h y noche 3 h).`, '');
report.push('| Semilla | Hora | Final | Derrotas | Atascos | Errores |', '|---|---|---|---|---|---|');
for (const r of runs) report.push(`| ${r.s} | ${r.hora} h | ${r.fin ? 'sí' : '**NO**'} | ${r.lost} | ${r.atascos ? 'sí' : '—'} | ${r.errores ? '**SÍ**' : '—'} |`);
const losses = {};
for (const r of runs) for (const d of r.derrotas) if (d !== 'undefined') losses[d] = (losses[d] || 0) + 1;
report.push('', '**Derrotas por rival** (total en todos los recorridos; media por recorrido):', '');
for (const [k, v] of Object.entries(losses).sort((a, b) => b[1] - a[1])) report.push(`- \`${k}\`: ${v} (${(v / runs.length).toFixed(2)})`);
const perfect = runs.filter(r => r.fin && r.lost === 0).length;
report.push('', `Recorridos sin ninguna derrota: ${perfect} de ${runs.length}.`, '');
// criterios (ver secreto/balance.md §5)
if (runs.some(r => r.errores)) blockers.push('El bot encontró ERRORES de ejecución');
const regalos = [...new Set(runs.flatMap(r => r.regalos))];
if (regalos.length) { blockers.push(`Regalos que se repiten al volver a hablar (${regalos.length})`); report.push('**Regalos repetidos** (un NPC da lo mismo cada vez que le hablas):', '', ...regalos.map(x => '- ' + x), ''); }
if (okRuns.length < Math.ceil(runs.length * 0.75)) blockers.push(`Solo ${okRuns.length}/${runs.length} recorridos llegan al final (mínimo 75 %)`);
for (const [k, v] of Object.entries(losses)) if (v / runs.length > 2) warns.push(`Muro de balance: \`${k}\` con ${(v / runs.length).toFixed(2)} derrotas de media`);
if (perfect > runs.length * 2 / 3) warns.push(`Demasiado fácil: ${perfect}/${runs.length} recorridos sin perder nunca`);
const atascos = [...new Set(runs.filter(r => r.atascos).flatMap(r => (r.out.split(/^ATASCOS:\n/m)[1] || '').split('\n').filter(l => l.startsWith('  ')).map(l => l.trim().slice(0, 160))))];
if (atascos.length) { warns.push(`${atascos.length} atascos distintos del bot (revisa si son de contenido o del bot)`); report.push('**Atascos:**', '', ...atascos.slice(0, 15).map(a => '- ' + a), ''); }
const errs = [...new Set(runs.filter(r => r.errores).flatMap(r => (r.out.split(/^ERRORES[^\n]*\n/m)[1] || '').split('\n').filter(l => l.startsWith('  ')).map(l => l.trim().slice(0, 200))))];
if (errs.length) report.push('**Errores del bot:**', '', ...errs.slice(0, 30).map(a => '- ' + a), '');
// guiones que ningún recorrido ejecutó (posible contenido inalcanzable); en la rápida no tiene sentido (se para antes)
if (!RAPIDA) {
	const neverAll = runs.length ? runs.map(r => new Set(r.nunca)).reduce((a, b) => new Set([...a].filter(x => b.has(x)))) : new Set();
	const neverList = [...neverAll].filter(x => x && !x.startsWith('ev_') && x !== 'usar_menu_kalos');
	report.push(`**Guiones que ningún recorrido ejecutó** (${neverList.length}; muchos son ramas de decisión o textos de "recordar", pero revisa los raros):`, '', neverList.join(', ') || '—', '');
}

if (!RAPIDA) {
	// 2b. Hub de misiones: juega con el bot y con las partidas de herramientas/test/partidas/ y comprueba en muchos puntos
	// que cada Novedad, marca «!»/«?»/«•», «Lo que necesitas», Por hacer / En espera y cada «Ir» corresponden a algo real
	const hub = await P.hub;
	report.push('## 2b. Hub de misiones', '', '```', hub.out.trim().split('\n').slice(-30).join('\n'), '```', '', `Detalle en \`secreto/auditorias/hub-${fecha}.md\`.`, '');
	{
		const g = +(hub.out.match(/Hub: (\d+) graves/)?.[1] || 0);
		if (hub.code !== 0) blockers.push(g ? `El hub de misiones anuncia o pide cosas que no existen (${g} graves; ver su informe)` : 'La auditoría del hub de misiones no pudo terminar');
	}

	// 3. Eventos por fechas
	report.push('## 3. Eventos por fechas', '');
	const evRuns = [];
	for (const [i, e] of events.entries()) {
		const r = parse((await P.ev[i]).out);
		const scripts = [...new Set([...JSON.stringify(e).matchAll(/"script":"(\w+)"/g)].map(m => m[1]))];
		const ran = scripts.filter(s => !r.nunca.includes(s));
		evRuns.push({ e, r, scripts, ran });
	}
	for (const { e, r, scripts, ran } of evRuns) {
		report.push(`- **${e.name}** (${e.from} → ${e.to}): final ${r.fin ? 'sí' : 'NO'}, guiones del evento ejecutados ${ran.length}/${scripts.length}${r.errores ? ' · **ERRORES**' : ''}`);
		if (r.errores) blockers.push(`Errores del bot durante el evento ${e.id}`);
		if (scripts.length && !ran.length) blockers.push(`El evento ${e.id} no ejecuta ninguno de sus guiones en su fecha`);
	}
	// próximas fechas sin evento (aviso para la sesión)
	const hoy = new Date();
	const proximos = events.filter(e => { const [m, d] = e.from.split('-').map(Number); let t = new Date(hoy.getFullYear(), m - 1, d); if (t < hoy) t = new Date(hoy.getFullYear() + 1, m - 1, d); return (t - hoy) / 864e5 <= 60; });
	report.push('', `Eventos que empiezan en los próximos 60 días: ${proximos.map(e => e.name + ' (' + e.from + ')').join(', ') || 'ninguno'}`, '');

	// 4. Registro automático
	const reg = await P.reg;
	report.push('## 4. Registro automático', '', reg.code === 0 ? 'secreto/registro-auto.md regenerado.' : '```\n' + reg.out + '\n```', '');
	if (reg.code !== 0) blockers.push('No se pudo generar el registro automático');

	// 5. Humo en navegador
	const shotDir = path.join(os.tmpdir(), 'humo-' + fecha);
	const humo = await P.humo;
	report.push('## 5. Prueba de humo (móvil 412×860)', '', '```', humo.out.trim().split('\n').filter(l => !/404/.test(l)).slice(-15).join('\n'), '```', '', `Capturas en \`${shotDir}\`: míralas con la herramienta de lectura de imágenes.`, '');
	if (humo.code !== 0) blockers.push('La prueba de humo encontró errores de JavaScript');

	// 6. Designer de Canvas: UX/UI de todas las pantallas con una partida avanzada (no bloquea; los graves salen como aviso)
	const ux = await P.ux;
	report.push('## 6. Designer de Canvas (UX/UI)', '', '```', ux.out.trim().split('\n').slice(-12).join('\n'), '```', '', `Detalle en \`secreto/auditorias/ux-${fecha}.md\`; capturas de cada pantalla en \`${uxDir}\`. **Míralas**: textos, recuadros, iconos y menús.`, '');
	const uxG = +(ux.out.match(/: (\d+) graves/)?.[1] || 0);
	if (ux.code !== 0) warns.push('El Designer de Canvas no pudo terminar su revisión');
	else if (uxG) warns.push(`El Designer de Canvas encontró ${uxG} problemas graves de interfaz (ver su informe)`);
}

// Resumen
report.splice(2, 0, '## Veredicto', '', blockers.length ? '**NO PUBLICAR.** Bloqueos:\n\n' + blockers.map(b => '- ' + b).join('\n') : RAPIDA ? '**La rápida pasa.** Antes de publicar, la completa: `node herramientas/auditar.mjs`.' : '**Apto para publicar** (falta la revisión humana: lector independiente y capturas).', '', warns.length ? 'Avisos:\n\n' + warns.map(w => '- ' + w).join('\n') : 'Sin avisos.', '');
const dir = RAPIDA ? TMP : path.join(ROOT, 'secreto/auditorias');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, RAPIDA ? 'auditoria.md' : fecha + '.md');
fs.writeFileSync(file, report.join('\n') + '\n');
console.log(report.slice(0, 12).join('\n'));
console.log(`\nInforme completo: ${RAPIDA ? file : path.relative(ROOT, file)}`);
const seg = ms => (ms / 1000).toFixed(0) + ' s';
console.log(`Tiempo: ${seg(Date.now() - T0)} con ${HILOS} hilos · lo más largo: ${tiempos.sort((a, b) => b[1] - a[1]).slice(0, 4).map(([c, ms]) => `${c.replace(/^herramientas\//, '').split(' --salida')[0]} ${seg(ms)}`).join(' · ')}`);
process.exit(blockers.length ? 1 : 0);
