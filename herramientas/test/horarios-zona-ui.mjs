import{createRequire}from'node:module';import assert from'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright');
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
const p=await b.newPage({viewport:{width:412,height:860},serviceWorkers:'block'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
try{
 await p.addInitScript(()=>{const RealDate=Date;window.__hour=13;window.Date=class extends RealDate{constructor(...args){super(...(args.length?args:[2026,10,4,window.__hour,0,0]));}};});
 await p.goto(process.env.APP_URL);await p.getByText('Nueva partida',{exact:true}).waitFor();
 await p.evaluate(async()=>{const S=await import('./js/state.js'),{C}=await import('./js/content.js'),{createPokemon}=await import('./js/pokemon.js');S.newGame({name:'Test'});S.G.party=[createPokemon('lucario',{level:20})];S.G.loc='test_schedule';S.G.dex.seen={19:true,41:true,16:true,170:true};C.events=[];C.locations.test_schedule={id:'test_schedule',name:'Zona de horarios',spots:[{action:{explore:true}},{action:{explore:'water'}}],encounters:{grass:[{sp:'rattata',lv:5,time:'day'},{sp:'zubat',lv:5,time:'night'},{sp:'pidgey',lv:5,time:'morning'}],water:[{sp:'chinchou',lv:5,time:'night'}]}};(await import('./js/ui/screens.js')).openZoneGuide();});
 await p.locator('.name').filter({hasText:'Zubat'}).waitFor();await p.locator('.name').filter({hasText:'Chinchou'}).waitFor();
 assert.equal(await p.getByText('Ahora no: solo de noche',{exact:false}).count(),2);await p.getByText(/Ahora no: solo de mañana/).waitFor();
 assert.ok((await p.locator('.oddsplit').allTextContents()).some(t=>t.includes('Noche: 100 %')));
 await p.screenshot({path:'/tmp/horarios-dia.png'});
 await p.evaluate(async()=>{(await import('./js/ui/core.js')).closeAllSheets();(await import('./js/ui/screens.js')).openDexNav('grass');});
 await p.getByText('Rattata',{exact:true}).waitFor();assert.equal(await p.getByText('Zubat',{exact:true}).count(),0);
 await p.evaluate(async()=>{(await import('./js/ui/core.js')).closeAllSheets();window.__hour=22;(await import('./js/ui/screens.js')).openZoneGuide();});
 await p.getByText(/Ahora no: solo de día/).waitFor();assert.equal(await p.locator('.name').filter({hasText:'Rattata'}).count(),1);
 await p.screenshot({path:'/tmp/horarios-noche.png'});
 await p.evaluate(async()=>{(await import('./js/ui/core.js')).closeAllSheets();(await import('./js/ui/screens.js')).openDexNav('water');});
 await p.getByText('Chinchou',{exact:true}).waitFor();assert.equal(await p.getByText('Rattata',{exact:true}).count(),0);
 await p.evaluate(async()=>{(await import('./js/ui/core.js')).closeAllSheets();window.__hour=13;const{C}=await import('./js/content.js');C.locations.test_schedule.encounters.grass[0].noCatch=true;C.locations.test_schedule.encounters.grass.push({sp:'rattata',lv:5,time:'night'});(await import('./js/ui/screens.js')).openZoneGuide();});
 assert.equal(await p.locator('.mon').filter({hasText:'Rattata'}).locator('.capture-chip').textContent(),'Capturable en su horario');
 assert.deepEqual(errors,[]);console.log('Guía día/noche/mañana visible y DexNav restringido al horario actual: OK');
}finally{await b.close();}
