"""Capturas de la serie integrada, pantalla móvil 412×860. No accede a servicios de usuario."""
import functools,http.server,json,pathlib,socketserver,threading
from playwright.sync_api import sync_playwright
ROOT=pathlib.Path(__file__).resolve().parents[5]
OUT=ROOT/'qa-faroles'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
srv=socketserver.TCPServer(('127.0.0.1',0),functools.partial(Quiet,directory=str(ROOT/'app')))
threading.Thread(target=srv.serve_forever,daemon=True).start()
base='http://127.0.0.1:'+str(srv.server_address[1])
with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True)
    page=browser.new_page(viewport={'width':412,'height':860},device_scale_factor=1,service_workers='block')
    errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.goto(base,wait_until='networkidle')
    page.wait_for_function("async()=>!!(await import('./js/content.js')).C.locations.celeste",timeout=30000)
    def load(name):
        save=json.loads((OUT/name).read_text())
        page.evaluate("""async save=>{
          const state=await import('./js/state.js');
          const screens=await import('./js/ui/screens.js');
          state.setG(save);state.G.settings.textSpeed=2;
          screens.installHooks();screens.render();
        }""",save)
        page.wait_for_timeout(400)
    def shot(name):
        page.screenshot(path=str(OUT/name),full_page=True)
    load('inicio.json');shot('01-lugar.png')
    page.get_by_role('button',name='Mapa',exact=False).first.click()
    page.wait_for_timeout(300);shot('02-mapa.png')
    load('inicio.json')
    page.evaluate("""async()=>{
      const {runScript}=await import('./js/guion.js');
      window.qaScene=runScript('cg_faroles_1_intro');
    }""")
    page.wait_for_timeout(700);shot('03-dialogo.png')
    # Salir de esta prueba aislada recargando la página, no datos del usuario.
    page.reload(wait_until='networkidle');load('inicio.json')
    page.evaluate("""async()=>{
      const {G}=await import('./js/state.js');
      const {render}=await import('./js/ui/screens.js');
      G.flags.cg_faroles_1_started=true;G.flags.cg_faroles_1_decision1_1=true;
      G.quests.cg_faroles_1_quest={stage:'investigar',started:Date.now()};
      render();
      window.qaScene=(await import('./js/guion.js')).runScript('cg_faroles_1_explore');
    }""")
    page.wait_for_timeout(500);shot('04-puzle.png')
    page.reload(wait_until='networkidle');load('inicio.json')
    page.evaluate("""async()=>{
      const {G}=await import('./js/state.js');
      G.flags.cg_faroles_1_started=true;G.flags.cg_faroles_1_decision1_0=true;
      window.qaScene=(await import('./js/guion.js')).runScript('cg_faroles_1_explore');
    }""")
    page.wait_for_timeout(600);shot('05-minijuego.png')
    page.reload(wait_until='networkidle');load('inicio.json')
    page.evaluate("""async()=>{
      const {G}=await import('./js/state.js');
      G.flags.cg_faroles_5_started=true;G.flags.cg_faroles_5_explored=true;
      G.quests.cg_faroles_5_quest={stage:'reto',started:Date.now()};
      window.qaBattle=(await import('./js/ui/screens.js')).battle({trainer:'cg_faroles_5_trainer',canLose:true});
    }""")
    for _ in range(20):
        if page.locator('.battle').count():
            break
        if page.locator('.overlay').count():
            page.locator('.overlay').last.click(force=True)
        page.wait_for_timeout(200)
    page.wait_for_selector('.battle',timeout=15000)
    page.wait_for_timeout(800);shot('06-combate.png')
    page.reload(wait_until='networkidle');load('final.json');shot('07-epilogo.png')
    (OUT/'movil.json').write_text(json.dumps({'pageErrors':errors,'viewport':[412,860]},ensure_ascii=False,indent=2))
    assert not errors,errors
    browser.close()
srv.shutdown()
