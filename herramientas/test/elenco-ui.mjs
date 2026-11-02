// Recorrido visual del elenco aprobado: diálogos, fichas sin id, actores de cine y entrenador rival.
// Usa Playwright ya instalado; admite CHROMIUM_PATH para entornos sin el navegador predeterminado.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright' : 'playwright');
const args = ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'];
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args });
const context = await browser.newContext({ viewport: { width: 412, height: 860 }, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
const pg = await context.newPage(), errors = [];
pg.on('pageerror', e => errors.push(e.message));
const out = process.env.SPRITE_SHOTS || '/tmp/pkm-sprites-ui'; fs.mkdirSync(out, { recursive: true });
const url = process.env.APP_URL || 'http://127.0.0.1:8190/';
async function start() {
 await pg.goto(url); await pg.getByText('Nueva partida', { exact: true }).waitFor();
 await pg.evaluate(async () => {
  const S = await import('./js/state.js'), P = await import('./js/pokemon.js');
  S.newGame({ name: 'Prueba' }); S.G.loc = 'luminalia_plaza'; S.G.party.push(P.createPokemon('lucario', { level: 80 }));
  S.G.settings.textSpeed = 3; S.G.settings.anim = false;
  const U = await import('./js/ui/screens.js'); U.render();
 });
}
try {
 await start();
 const ids = await pg.evaluate(async () => {
  const S = await import('./js/state.js'); const { portraitFor } = await import('./js/ui/core.js');
  if (portraitFor({id:'jugador'}).dataset.characterId !== 'jugador') throw new Error('Falta protagonista');
  S.G.player.look.spriteMode = 'procedural';
  if (portraitFor({id:'jugador'}).dataset.characterId) throw new Error('Se perdió la personalización explícita');
  delete S.G.player.look.spriteMode;
  const { CAST } = await import('./js/elenco.js'); const { C } = await import('./js/content.js'); const U = await import('./js/ui/core.js');
  const gallery = document.createElement('div'); gallery.id = 'cast-gallery'; gallery.style = 'position:fixed;inset:0;z-index:100;background:#f5e9ce;overflow:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:12px';
  for (const id of Object.keys(CAST)) { const d = document.createElement('div'); d.style = 'height:145px;text-align:center;color:#17223b;font-size:10px'; const c = U.portraitFor(id === 'jugador' ? {id,name:'Prueba'} : C.npcs[id]); c.style = 'width:100%;height:120px;object-fit:contain'; d.append(c, CAST[id].name); gallery.append(d); }
  document.body.append(gallery); return Object.keys(CAST);
 });
 await pg.waitForFunction(() => document.querySelectorAll('#cast-gallery canvas[data-loaded=true]').length === 28);
 assert.equal((await pg.locator('#cast-gallery [data-character-id]').count()),28);
 await pg.screenshot({path:out+'/01-elenco.png'});
 await pg.evaluate(() => document.getElementById('cast-gallery').remove());
 await pg.evaluate(async () => { const U = await import('./js/ui/core.js'); U.setTextSpeed(3); const {C}=await import('./js/content.js'); window.dialogue = U.say(C.npcs.renata,'Esta conversación usa el mismo sprite que las demás escenas.'); });
 await pg.locator('.conversation [data-character-id=renata][data-loaded=true]').waitFor();
 assert.equal(await pg.locator('.conversation').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(10, 15, 30, 0.3)');
 await pg.screenshot({path:out+'/02-dialogo.png'});
 await pg.waitForTimeout(320); await pg.locator('.conversation').click({position:{x:200,y:700}}); await pg.waitForFunction(()=>!document.querySelector('.conversation'));
 await pg.evaluate(async () => { const {previewCutscene}=await import('./js/ui/cine.js'); window.scene=previewCutscene({bg:{type:'city'},frames:[{actors:[{id:'renata',at:'left',enter:'none'},{id:'kaori',at:'right',enter:'none'}],say:'renata',text:'Prueba de conversación en una escena compartida.',auto:6000},{text:'La escena vuelve a su luz normal.',auto:4000}]}); });
 await pg.locator('.cutscene.is-conversation .cs-spr[data-loaded=true]').first().waitFor();
 assert.equal(await pg.locator('.cs-actor .cast-sprite').count(),2);
 await pg.waitForTimeout(500); assert.equal(await pg.locator('.cs-dialog-shade').evaluate(e=>getComputedStyle(e).opacity),'1');
 await pg.screenshot({path:out+'/03-cinematica.png'});
 await pg.waitForFunction(()=>document.querySelector('.cutscene')&&!document.querySelector('.cutscene.is-conversation'),{},{timeout:15000});
 await pg.waitForFunction(() => getComputedStyle(document.querySelector('.cs-dialog-shade')).opacity === '0');
 await start();
 await pg.evaluate(async () => { const {runBattle}=await import('./js/ui/battle-ui.js'); const{C}=await import('./js/content.js'); window.battle=runBattle({trainerObj:{id:'prueba_elenco',name:'Renata',npc:'renata',ai:1,team:[{sp:'rattata',lv:1,moves:['splash']}]},terrain:'city'},{currentLoc:()=>C.locations.luminalia_plaza,terrainHere:()=> 'city'}); });
 await pg.locator('.battle .tchip [data-character-id=renata][data-loaded=true]').waitFor();
 await pg.screenshot({path:out+'/04-combate.png'});
 await start();
 await pg.evaluate(async () => { const{previewCutscene}=await import('./js/ui/cine.js');window.changing=previewCutscene({bg:{type:'city'},frames:[{actors:[{key:'changing',id:'renata',at:'center',enter:'none'}],say:'renata',text:'Primera imagen.',auto:1800},{actors:[{key:'changing',id:'lila'}],say:'lila',text:'Segunda imagen.',auto:1800},{actors:[{key:'changing',id:'agente_lemnis'}],text:'Tercera imagen.',auto:5000}]}); });
 await pg.locator('.cs-actor.k-spr [data-character-id=lila][data-loaded=true]').waitFor();
 await pg.locator('.cs-actor.k-npc .cs-bust').waitFor();
 // Fallo de recurso: el juego conserva su retrato anterior y no deja un actor invisible.
 await pg.route('**/img/elenco-a.png',route=>route.abort());
 await start();
 await pg.evaluate(async()=>{const U=await import('./js/ui/core.js');const{C}=await import('./js/content.js');U.setTextSpeed(3);window.fallback=U.say(C.npcs.renata,'Recurso no disponible.');});
 await pg.locator('.conversation .portrait canvas:not(.cast-sprite)').waitFor();
 await start();
 await pg.evaluate(async()=>{const{previewCutscene}=await import('./js/ui/cine.js');window.failedScene=previewCutscene({frames:[{actors:[{id:'renata',at:'center',enter:'none'}],say:'renata',text:'Retrato de respaldo.',auto:6000}]});});
 await pg.locator('.cs-actor.k-npc .cs-bust').waitFor();
 await pg.unroute('**/img/elenco-a.png');
 await start();
 for(const name of ['Mapa','Equipo','Mochila','Diario','Más']){
  await pg.locator('.nav button').filter({hasText:name}).click();
  await pg.screenshot({path:out+'/menu-'+name+'.png'});
  await pg.evaluate(async()=>{const U=await import('./js/ui/core.js');U.closeAllSheets();});
 }
 assert.deepEqual(errors,[]);
 console.log('28 retratos, diálogo atenuado, cine con dos actores, recuperación de luz y combate: bien');
} finally { await browser.close(); }
