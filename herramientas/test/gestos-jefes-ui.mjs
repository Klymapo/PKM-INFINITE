import{createRequire}from'node:module';import assert from'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright');
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
const p=await b.newPage({viewport:{width:412,height:860},isMobile:true,hasTouch:true,serviceWorkers:'block'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
try{
 await p.goto(process.env.APP_URL);await p.getByText('Nueva partida',{exact:true}).waitFor();
 await p.evaluate(async()=>{const S=await import('./js/state.js');S.newGame({name:'Prueba'});(await import('./js/ui/screens.js')).openDex();});
 for(const selector of ['.dex-regions button','.dex-statuses button','.quick-go']){
  const transform=await p.locator(selector).first().evaluate(el=>{const body=el.closest('.sheet').querySelector('.sheet-body');const touch=x=>new Touch({identifier:1,target:el,clientX:x,clientY:300});el.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[touch(250)]}));el.dispatchEvent(new TouchEvent('touchmove',{bubbles:true,cancelable:true,touches:[touch(80)]}));const value=body.style.transform;el.dispatchEvent(new TouchEvent('touchend',{bubbles:true,touches:[],changedTouches:[touch(80)]}));return value;});
  assert.equal(transform,'',selector+': el filtro no debe mover la pantalla');
 }
 const regionBox=await p.locator('.dex-regions').boundingBox();
 const cdp=await p.context().newCDPSession(p), y=regionBox.y+regionBox.height/2;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:340,y}]});
 for(let x=310;x>=90;x-=25){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y}]});await p.waitForTimeout(15);}
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(150);
 assert.ok(await p.locator('.dex-regions').evaluate(e=>e.scrollLeft>0),'el carrusel debe desplazarse con un gesto táctil real');
 assert.equal(await p.locator('.sheet-body').evaluate(e=>e.style.transform),'');
 await p.evaluate(async()=>{(await import('./js/ui/core.js')).closeAllSheets();const S=await import('./js/state.js'),{C}=await import('./js/content.js'),{createPokemon}=await import('./js/pokemon.js');S.G.party=[createPokemon('riolu',{level:10})];S.G.loc='boss_test';S.G.visited.boss_test=true;S.G.visited.boss_other=true;C.trainers.bt={name:'Instructor',team:[{sp:'rattata',lv:5}]};C.trainers.bo={name:'Otro',team:[{sp:'rattata',lv:5}]};C.locations.boss_test={id:'boss_test',name:'Zona de prueba',spots:[{label:'Entrenar aquí',action:{training:{cap:20,trainers:['bt']}}}]};C.locations.boss_other={id:'boss_other',name:'Otra zona',spots:[{label:'Otra práctica',action:{training:{cap:20,trainers:['bo']}}}]};S.G.beaten.bt__elite=10;S.G.flags['escalera:bo']=true;(await import('./js/ui/screens.js')).render();});
 await p.getByRole('button').filter({hasText:'Entrenar aquí'}).click();
 await p.locator('.training-boss.boss-ready').waitFor();
 assert.equal(await p.locator('.tz-dir [data-boss-state=defeated]').count(),1);
 await p.screenshot({path:'/tmp/jefes-mobile.png'});
 await p.getByRole('button',{name:'Cerrar',exact:true}).click();
 await p.evaluate(async()=>{const{G}=await import('./js/state.js');G.flags['escalera:bt']=true;});
 await p.getByRole('button').filter({hasText:'Entrenar aquí'}).click();await p.locator('.training-boss.boss-defeated').waitFor();
 await p.getByRole('button').filter({hasText:'Revancha con el instructor'}).waitFor();
 console.log('Jefes visibles: pendiente, vencido y directorio de zonas: OK');
 console.log('Gestos de los filtros: no desplazan el panel de Pokédex');
 assert.deepEqual(errors,[]);
}finally{await b.close();}
