#!/usr/bin/env python3
"""Importa de golpe las imágenes que haga ChatGPT.

Uso: python3 herramientas/importar-imagenes.py <carpeta-o-zip> [--seco]

Nombres que entiende (el resto se ignora con aviso):
  icono.png              -> app/icons/icon-192.png e icon-512.png
  titulo.png             -> app/img/titulo.png           (pantalla de título, vertical)
  retrato-<idNPC>.png    -> app/img/retratos/<id>.png    (busto cuadrado)
  postal-<idLugar>.png   -> app/img/postales/<id>.png    (16:10)

Reescala con vecino más cercano (pixel art), limita el tamaño y comprueba que el id
del NPC o del lugar existe. Al final regenera el service worker (y el índice de imágenes).
"""
import os, re, sys, subprocess, zipfile, tempfile, json
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(RAIZ, 'app')

def ids_contenido():
	"""Ids de NPCs y lugares, sacados del contenido con node."""
	js = """
	import { loadContent, C } from './app/js/content.js';
	await loadContent();
	console.log(JSON.stringify({ npcs: Object.keys(C.npcs), locs: Object.keys(C.locations) }));
	"""
	try:
		out = subprocess.run(['node', '--input-type=module', '-e', js], cwd=RAIZ, capture_output=True, text=True, timeout=60)
		return json.loads(out.stdout.strip().splitlines()[-1])
	except Exception as e:
		print('  (no pude leer los ids del contenido: %s; no los compruebo)' % e)
		return None

def ajustar(im, w, h, recorte=True):
	im = im.convert('RGBA')
	if recorte:  # recorta al centro con la proporción pedida
		r = w / h; iw, ih = im.size
		if iw / ih > r: nw = int(ih * r); im = im.crop(((iw - nw) // 2, 0, (iw - nw) // 2 + nw, ih))
		else: nh = int(iw / r); im = im.crop((0, (ih - nh) // 2, iw, (ih - nh) // 2 + nh))
	return im.resize((w, h), Image.NEAREST)

def main():
	args = [a for a in sys.argv[1:] if not a.startswith('--')]
	seco = '--seco' in sys.argv
	if not args: print(__doc__); sys.exit(1)
	src = args[0]
	if src.endswith('.zip'):
		tmp = tempfile.mkdtemp(); zipfile.ZipFile(src).extractall(tmp); src = tmp
	ids = ids_contenido()
	hechos, avisos = [], []
	for dirpath, _, files in os.walk(src):
		for f in sorted(files):
			nombre = f.lower()
			if not nombre.endswith(('.png', '.webp', '.jpg', '.jpeg')): continue
			base = re.sub(r'\.(png|webp|jpe?g)$', '', nombre)
			try: im = Image.open(os.path.join(dirpath, f)); im.load()
			except Exception as e: avisos.append(f'{f}: no se puede abrir ({e})'); continue
			destinos = []
			if base == 'icono':
				destinos = [(ajustar(im, 512, 512), 'icons/icon-512.png'), (ajustar(im, 192, 192), 'icons/icon-192.png')]
			elif base == 'titulo':
				destinos = [(ajustar(im, 432, 768), 'img/titulo.png')]
			elif base.startswith('retrato-'):
				i = base[8:]
				if ids and i not in ids['npcs']: avisos.append(f'{f}: no hay NPC «{i}»'); continue
				destinos = [(ajustar(im, 256, 256), f'img/retratos/{i}.png')]
			elif base.startswith('postal-'):
				i = base[7:]
				if ids and i not in ids['locs']: avisos.append(f'{f}: no hay lugar «{i}»'); continue
				destinos = [(ajustar(im, 480, 300), f'img/postales/{i}.png')]
			else:
				avisos.append(f'{f}: nombre no reconocido'); continue
			for out, rel in destinos:
				p = os.path.join(APP, rel)
				if not seco:
					os.makedirs(os.path.dirname(p), exist_ok=True)
					out.save(p, optimize=True)
				kb = os.path.getsize(p) // 1024 if os.path.exists(p) else 0
				hechos.append(f'{f} -> app/{rel} ({kb} KB)')
				if kb > 400: avisos.append(f'{rel}: pesa {kb} KB, demasiado para el móvil')
	print('Importadas:'); [print('  ' + h) for h in hechos] or print('  (ninguna)')
	if avisos: print('Avisos:'); [print('  ' + a) for a in avisos]
	if hechos and not seco:
		subprocess.run(['node', 'herramientas/build-sw.mjs'], cwd=RAIZ)
	print('\nAntes del commit: mira cada imagen (originales, sin Pokémon ni personajes canon).')

if __name__ == '__main__': main()
