// Elenco A: una identidad y un único sprite para todos los contextos (incluido contenido futuro).
// El atlas mantiene el arte aprobado; los marcos solo seleccionan su región al dibujar.
import { hasImage } from './imagenes.js';
export const ATLAS = 'elenco-a.png';
export const CAST = {
	"jugador": {
		"name": "jugador",
		"frame": [
			36,
			73,
			156,
			251
		]
	},
	"rhi": {
		"name": "Rhi",
		"frame": [
			216,
			70,
			142,
			255
		]
	},
	"lila": {
		"name": "Lila",
		"frame": [
			394,
			80,
			118,
			245
		]
	},
	"irene": {
		"name": "Dra. Irene Solberg",
		"frame": [
			550,
			70,
			157,
			255
		]
	},
	"leilani": {
		"name": "Leilani",
		"frame": [
			734,
			76,
			152,
			249
		]
	},
	"kaori": {
		"name": "Kaori",
		"frame": [
			928,
			70,
			120,
			255
		]
	},
	"renata": {
		"name": "Renata",
		"frame": [
			1077,
			76,
			161,
			249
		]
	},
	"alexia": {
		"name": "Alexia",
		"frame": [
			36,
			374,
			149,
			240
		]
	},
	"bastien": {
		"name": "Bastien",
		"frame": [
			217,
			374,
			146,
			240
		]
	},
	"tobias": {
		"name": "Tobías",
		"frame": [
			383,
			376,
			167,
			239
		]
	},
	"handsome": {
		"name": "Handsome",
		"frame": [
			569,
			378,
			127,
			237
		]
	},
	"sera": {
		"name": "Serafina Lemnis",
		"frame": [
			741,
			382,
			122,
			233
		]
	},
	"petra": {
		"name": "Petra",
		"frame": [
			894,
			380,
			164,
			235
		]
	},
	"noa": {
		"name": "Noa Lambert",
		"frame": [
			1085,
			380,
			162,
			235
		]
	},
	"gaspar": {
		"name": "Gaspar",
		"frame": [
			15,
			668,
			177,
			224
		]
	},
	"lola": {
		"name": "Lola Arriaga",
		"frame": [
			214,
			667,
			149,
			225
		]
	},
	"ysolde": {
		"name": "Ysolde",
		"frame": [
			380,
			665,
			140,
			227
		]
	},
	"xero": {
		"name": "Xero",
		"frame": [
			554,
			668,
			157,
			224
		]
	},
	"hector": {
		"name": "Héctor",
		"frame": [
			723,
			665,
			154,
			227
		]
	},
	"simon": {
		"name": "Simón",
		"frame": [
			920,
			668,
			114,
			224
		]
	},
	"joy": {
		"name": "Enfermera Joy",
		"frame": [
			1088,
			663,
			134,
			229
		]
	},
	"viajero": {
		"name": "Ulises",
		"frame": [
			21,
			943,
			149,
			240
		]
	},
	"sobrina": {
		"name": "Adela",
		"frame": [
			194,
			949,
			160,
			234
		]
	},
	"conde": {
		"name": "Conde Vladimiro",
		"frame": [
			356,
			946,
			172,
			237
		]
	},
	"cientifico_fosiles": {
		"name": "Dr. Lazare",
		"frame": [
			547,
			946,
			136,
			237
		]
	},
	"philippe": {
		"name": "Philippe",
		"frame": [
			707,
			937,
			165,
			246
		]
	},
	"padre_rhi": {
		"name": "Gareth Hargreave",
		"frame": [
			880,
			959,
			177,
			224
		]
	},
	"rotom": {
		"name": "Rotom",
		"frame": [
			1072,
			971,
			169,
			151
		]
	}
};
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\([^)]*\)/g, '').trim().toLowerCase();
const names = new Map(Object.entries(CAST).map(([id, c]) => [norm(c.name), id]));
names.set('viajero', 'viajero'); names.set('el viajero de la cabina azul', 'viajero');
names.set('irene', 'irene'); names.set('sera', 'sera'); names.set('bastian', 'bastien');
/** Aceptar ids, variantes de Joy y objetos antiguos sin id; no revelar identidades ocultas. */
export function characterId(n) {
	if (!n) return null;
	if (n.portrait === 'jugador') return 'jugador';
	if (Object.hasOwn(CAST, n.id)) return n.id;
	if (/^joy(?:_|$)/.test(n.id || '')) return 'joy';
	return names.get(norm(n.name)) || null;
}
let loading;
function atlasImage() {
	if (!loading) loading = new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => { loading = null; reject(new Error('No se pudo cargar el elenco')); };
		img.src = './img/' + ATLAS;
	});
	return loading;
}
/** Dibujar el mismo sprite completo en fichas y escenas. Conservar fallback si falta el recurso. */
export function characterSprite(n, fallback) {
	const id = characterId(n);
	if (!id || (id === 'jugador' && n.look?.spriteMode === 'procedural') || !hasImage(ATLAS)) return null;
	const [x, y, w, h] = CAST[id].frame;
	const cv = document.createElement('canvas');
	cv.width = w; cv.height = h; cv.className = 'px cast-sprite';
	cv.dataset.characterId = id;
	cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', n.name || CAST[id].name);
	atlasImage().then(img => {
		const ctx = cv.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
		cv.dataset.loaded = 'true';
	}).catch(() => { const old = fallback?.(); if (old) cv.replaceWith(old); });
	return cv;
}
