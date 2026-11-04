import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
const page=await browser.newPage({viewport:{width:412,height:860},serviceWorkers:'block'}), errors=[];
page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto(process.env.APP_URL); await page.getByText('Nueva partida',{exact:true}).waitFor();
 await page.evaluate(async()=>{
 const S=await import('./js/state.js'),P=await import('./js/pokemon.js'),{C}=await import('./js/content.js');
 S.newGame({name:'Test'});S.G.loc='test_city'; S.G.party.push(P.createPokemon('riolu',{level:10})); S.G.party[0].happy=210;
 C.locations.test_city={id:'test_city',name:'Ciudad de prueba',encounters:{grass:[{sp:'rattata',lv:5}],water:[{sp:'magikarp',lv:5}]},spots:[{label:'Hierba',action:{explore:true}},{label:'Agua',action:{explore:'water'}}]};
 S.G.dex.seen[19]=true;S.G.dex.seen[129]=true;(await import('./js/ui/screens.js')).render();
 });
 await page.getByText('🔎 DexNav · rastrear un Pokémon',{exact:true}).click();
 await page.getByText('DexNav · elegir zona',{exact:true}).waitFor();
 await page.evaluate(async()=>{const U=await import('./js/ui/core.js');U.closeAllSheets();(await import('./js/ui/screens.js')).openDexNav('grass');});
 await page.getByText('Rattata',{exact:true}).waitFor(); assert.equal(await page.getByText('Magikarp',{exact:true}).count(),0);
 await page.evaluate(async()=>{const U=await import('./js/ui/core.js');U.closeAllSheets();const {G}=await import('./js/state.js');G.loc='test_interior';const {C}=await import('./js/content.js');C.locations.test_interior={id:'test_interior',name:'Interior',parent:'test_city',spots:[]};(await import('./js/ui/screens.js')).openDexNav();});
 await page.getByText('Aquí no hay Pokémon salvajes que rastrear ahora mismo.',{exact:true}).waitFor();
 await page.evaluate(async()=>{(await import('./js/ui/core.js')).closeAllSheets();(await import('./js/ui/screens.js')).openZoneGuide({trainers:[],wild:[{sp:'magikarp',lv:5}]});});
 await page.getByText(/Salvaje · capturable desde Buscar salvajes/).waitFor();assert.equal(await page.getByText('Rattata',{exact:true}).count(),0);
 await page.evaluate(async()=>{(await import('./js/ui/core.js')).closeAllSheets();const{G}=await import('./js/state.js');(await import('./js/ui/screens.js')).openConvivir(G.party[0]);});
 await page.getByRole('button',{name:'Jugar',exact:true}).click();await page.getByText(/\+15 de amistad\./).waitFor();
 assert.equal(await page.evaluate(async()=>(await import('./js/state.js')).G.party[0].happy),225);
 await page.getByRole('button',{name:'Descansar',exact:true}).click();await page.getByText(/Ya recibió el aumento de hoy/).waitFor();
 assert.equal(await page.evaluate(async()=>(await import('./js/state.js')).G.party[0].happy),225);
 await page.screenshot({path:'/tmp/convivir-mobile.png'});
 assert.deepEqual(errors,[]);console.log('UI móvil: DexNav ciudad e interior, guía de entrenamiento y Convivir: OK');
}finally{await browser.close();}
