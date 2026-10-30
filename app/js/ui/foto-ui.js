// Fotografía: minijuego de enfoque y tarjetas del Álbum. Lógica en ../foto.js.
import { C } from '../content.js';
import { D } from '../data.js';
import { tx } from '../guion.js';
import { monImg, sceneCanvas } from '../art.js';
import { h } from './core.js';
import { focusParams, focusHit } from '../foto.js';

const locOf = id => C.locations[id];
const stars = q => '★'.repeat(q) + '☆'.repeat(3 - q);

/** Juega el enfoque. Resuelve con { ok, q }. */
export function playFocus({ def, level = 2 }) {
	return new Promise(resolve => {
		const P = focusParams(level);
		const loc = locOf(def.loc);
		const center = 0.3 + Math.random() * 0.4;
		const bg = sceneCanvas({ ...(loc?.bg || {}), seed: loc?.bg?.seed || def.loc || 'x' }, { phase: 'dia' });
		const mon = h('div', { class: 'ft-mon', style: { left: (center * 100) + '%' } }, monImg(def.sp, { anim: true }));
		const finder = h('div', { class: 'ft-finder', style: { width: (P.zone * 100) + '%' } });
		const shotsEl = h('div', { class: 'ft-shots' }, stars(0));
		const msg = h('div', { class: 'ft-msg' }, tx(def.hint || 'Dispara cuando el recuadro se ponga verde.'));
		let shots = 0, hits = 0, t0 = performance.now(), raf = 0, pos = 0, done = false;
		const btn = h('button', { class: 'btn primary ft-shoot', onclick: () => {
			if (done) return;
			shots++;
			const ok = focusHit(pos, center, P.zone, P.grace);
			if (ok) hits++;
			flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on');
			msg.textContent = ok ? '¡Clic! Esa sale nítida.' : 'Clic… movida. Otra vez.';
			shotsEl.textContent = stars(hits) + `  ·  ${P.shots - shots} ${P.shots - shots === 1 ? 'disparo' : 'disparos'}`;
			if (shots >= P.shots) finish();
		} }, '📸 Disparar');
		const flash = h('div', { class: 'ft-flash' });
		const quit = h('button', { class: 'btn ft-quit', onclick: () => { done = true; cancelAnimationFrame(raf); ov.remove(); resolve({ ok: false, q: 0, quit: true }); } }, 'Salir');
		const ov = h('div', { class: 'overlay ft-ov', role: 'dialog', 'aria-label': 'Foto' },
			h('div', { class: 'ft-box' },
				h('div', { class: 'ft-title' }, '📷 ' + tx(def.title)),
				h('div', { class: 'ft-pic', 'data-noswipe': '' }, bg, mon, finder, flash),
				shotsEl, msg,
				h('div', { class: 'ft-btns' }, quit, btn)));
		document.body.append(ov);
		const loop = now => {
			if (done) return;
			const x = ((now - t0) / 1000 * P.speed) % 2;
			pos = x < 1 ? x : 2 - x; // de lado a lado
			finder.style.left = `calc(${pos * 100}% - ${P.zone * 50}%)`;
			finder.classList.toggle('in', focusHit(pos, center, P.zone));
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		function finish() {
			done = true; cancelAnimationFrame(raf);
			const q = hits;
			msg.textContent = q ? `Te llevas la foto: ${stars(q)}` : 'Ninguna salió bien. Se ha ido… pero volverá a hacer lo suyo otro rato.';
			btn.remove(); quit.textContent = 'Seguir';
			quit.onclick = () => { ov.remove(); resolve({ ok: q > 0, q }); };
		}
	});
}

/** Tarjeta de una foto para el Álbum. */
export function photoCard(f, onclick) {
	const loc = locOf(f.loc), d = new Date(f.t);
	const cv = sceneCanvas({ ...(loc?.bg || {}), seed: loc?.bg?.seed || f.loc || 'x' }, { phase: 'dia' });
	return h('button', { class: 'dphoto ftcard', onclick },
		h('div', { class: 'dph-pic' }, cv, h('div', { class: 'dph-lead ft-lead' }, monImg(f.sp, { anim: false }))),
		h('div', { class: 'dph-cap' }, h('b', {}, `${stars(f.q)} · ${loc?.name || ''}`), h('span', {}, tx(f.title)),
			h('span', { class: 'ft-date' }, d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) + (f.sold ? ' · publicada en la Gaceta' : ''))));
}
export { stars };
