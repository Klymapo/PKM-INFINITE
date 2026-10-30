"""Capturas de las pantallas nuevas (carreras, rival, historias, red de negocios) en un móvil de 412x860.

Crea una partida, avanza hasta el lugar inicial y abre cada pantalla desde la consola de la página.
Falla (código 1) si hay errores de JavaScript. Mira las capturas.

Uso: python3 herramientas/test/pantallas-nuevas.py [--salida carpeta] [--solo carreras,red]
"""
import argparse, functools, http.server, os, socketserver, sys, threading, time
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument('--salida', default=os.environ.get('TMPDIR', '/tmp') + '/pantallas')
ap.add_argument('--solo', default='')
args = ap.parse_args()
os.makedirs(args.salida, exist_ok=True)
solo = set(filter(None, args.solo.split(',')))

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'app')
class Silencioso(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(Silencioso, directory=APP))
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
errores = []

def avanzar(pg, n=400):
    for i in range(n):
        time.sleep(0.12)
        try:
            ov = pg.query_selector('.overlay')
            if ov:
                btns = pg.query_selector_all('.overlay .choices button')
                if btns: btns[0].click(timeout=2000)
                else: ov.click(timeout=2000)
                continue
            if pg.query_selector('.battle'):
                for sel in ('.battle button.movebtn:not([disabled])', '.battle button.btn.fight', '.battle .blog'):
                    el = pg.query_selector(sel)
                    if el: el.evaluate('e => e.click()'); break
                continue
        except Exception as e:
            continue
        if pg.query_selector('.nav'): return

def shot(pg, name):
    pg.screenshot(path=f'{args.salida}/{name}.png')

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 412, 'height': 860}, device_scale_factor=2, is_mobile=True, has_touch=True)
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: errores.append(f'pageerror: {e}'))
    pg.on('console', lambda m: errores.append(f'{m.type}: {m.text}') if m.type == 'error' and 'Failed to load resource' not in m.text else None)
    pg.goto(f'http://127.0.0.1:{port}/index.html')
    pg.wait_for_selector('text=Nueva partida', timeout=20000)
    pg.click('text=Nueva partida')
    pg.fill('input.field-input', 'Prueba')
    pg.click('text=Empezar la aventura')
    avanzar(pg)
    time.sleep(0.5)

    if not solo or 'carreras' in solo:
        pg.evaluate("""async () => {
            const S = await import('./js/state.js');
            Object.assign(S.G.flags, { mount_rhyhorn: true });
            const UI = await import('./js/ui/carreras-ui.js');
            window.__race = UI.playRace('kalos');
        }""")
        time.sleep(0.8); shot(pg, 'carrera-1-monturas')
        pg.click('.cr-box .list button.row >> nth=0'); time.sleep(0.8); shot(pg, 'carrera-2-tramo')
        for t in range(5):
            rows = pg.query_selector_all('.cr-box .list button.row:not([disabled])')
            jump = [r for r in rows if 'salto' in (r.inner_text() or '')]
            (jump[0] if jump else rows[0]).click(); time.sleep(0.5)
            if pg.query_selector('.cr-bar'):
                shot(pg, f'carrera-3-salto-{t}')
                time.sleep(0.4); pg.click('.cr-box .ft-btns button'); time.sleep(1.0)
        time.sleep(0.6); shot(pg, 'carrera-4-meta')
        pg.click('.cr-box .ft-btns button'); time.sleep(0.4)

    if not solo or 'rival' in solo:
        pg.evaluate("""async () => {
            const S = await import('./js/state.js');
            S.G.player.badges.push('x', 'y'); S.G.vars.hitos = 2;
            const Gu = await import('./js/guion.js');
            window.__rx = Gu.runScript('rx_primera');
        }""")
        for i in range(6):
            time.sleep(0.9)
            if i in (1, 3): shot(pg, f'rival-{i}')
            tb = pg.query_selector('.overlay .textbox')
            if tb: tb.evaluate('e => e.click()')
        time.sleep(0.5); shot(pg, 'rival-eleccion')

    if not solo or 'historias' in solo:
        pg.evaluate("""async () => {
            const S = await import('./js/state.js'); const P = await import('./js/pokemon.js');
            const c = P.createPokemon('flaaffy', { level: 30, nick: 'Candela', happy: 200 }); S.G.party.push(c); S.G.flags.b01_candela_unida = true;
            const Gu = await import('./js/guion.js');
            window.__hc = Gu.runScript('hc_candela_1');
        }""")
        for i in range(9):
            time.sleep(1.4)
            if i in (2, 4, 6): shot(pg, f'historia-{i}')
            el = pg.query_selector('.cs, .cine, .overlay')
            if el: el.evaluate('e => e.click()')

    b.close()
srv.shutdown()
print(f'Capturas en {args.salida}')
if errores:
    print('ERRORES:\n  ' + '\n  '.join(errores[:30])); sys.exit(1)
print('Pantallas nuevas OK')
