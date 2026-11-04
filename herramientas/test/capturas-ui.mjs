import{createRequire}from'node:module';import assert from'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright');
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
const p=await b.newPage({viewport:{width:412,height:860},serviceWorkers:'block'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
try{
 await p.goto(process.env.APP_URL);await p.getByText('Nueva partida',{exact:true}).waitFor();
 await p.evaluate(async()=>{const{C}=await import('./js/content.js'),S=await import('./js/state.js'),{createPokemon}=await import('./js/pokemon.js');S.newGame({name:'Test'});S.G.party=[createPokemon('bulbasaur',{level:10})];S.G.dex.seen={1:true,4:true,7:true,25:true,129:true};S.G.dex.caught={1:true};S.G.loc='color_test';C.trainers.color_tr={team:[{sp:'charmander',lv:12},{sp:'bulbasaur',lv:12}]};C.locations.color_test={id:'color_test',name:'Zona de prueba',spots:[{action:{explore:true}},{action:{training:{cap:20,trainers:['color_tr'],wild:[{sp:'magikarp',lv:5}]}}}],encounters:{grass:[{sp:'bulbasaur',lv:5},{sp:'pikachu',lv:5,noCatch:true}]}};(await import('./js/ui/screens.js')).openDex();});
 await p.getByRole('button',{name:'Capturables aquí',exact:true}).click();assert.equal(await p.locator('.dexcard').count(),2);
 await p.getByRole('button',{name:'Solo combate aquí',exact:true}).click();assert.equal(await p.locator('.dexcard').count(),2);
 assert.ok((await p.locator('.dexcard .capture-chip').allTextContents()).every(x=>x==='Solo combate aquí'));
 await p.getByRole('button',{name:'◓ Me faltan aquí',exact:true}).click();assert.equal(await p.locator('.dexcard').count(),1);
 await p.getByRole('button',{name:'☷ Vista lista',exact:true}).click();assert.equal(await p.locator('.dex-list').count(),1);
 await p.getByRole('button',{name:'▦ Vista tarjetas',exact:true}).click();assert.equal(await p.locator('.dex-list').count(),0);
 await p.getByRole('button',{name:'Restablecer filtros',exact:true}).click();
 await p.screenshot({path:'/tmp/color-pokedex.png'});
 await p.getByRole('button',{name:'Johto',exact:true}).click();assert.equal(await p.locator('.dex-overview').evaluate(e=>e.style.getPropertyValue('--region-color')),'#c99b36');
 await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('.dex-results').evaluate(e=>getComputedStyle(e).animationName),'none');
 await p.setViewportSize({width:320,height:700});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await p.evaluate(async()=>{(await import('./js/ui/core.js')).closeAllSheets();(await import('./js/ui/screens.js')).openZoneGuide({cap:20,trainers:['color_tr'],wild:[{sp:'bulbasaur',lv:5},{sp:'squirtle',lv:5,cond:false}]});});
 assert.equal(await p.locator('.capture-section.cap-catch .training-mon').count(),1);assert.equal(await p.locator('.capture-section.cap-battle .training-mon').count(),2);assert.equal(await p.locator('.capture-section.cap-unavailable .training-mon').count(),1);
 await p.setViewportSize({width:412,height:860});await p.screenshot({path:'/tmp/color-training.png'});
 assert.deepEqual(errors,[]);console.log('Captura local, grupos, accesos rápidos, lista, color regional y movimiento reducido: OK');
}finally{await b.close();}
