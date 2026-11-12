// Autoría reproducible: usa las herramientas existentes sin modificar app/ ni herramientas/.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { buildPlayablePack } from '../../integraciones/compilar-aventura.mjs';
import { validate, evaluateRhythm } from '../../integraciones/generar-historia.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(process.argv[2] || '/tmp/pkm-faroles');
const npc = 'cg_faroles_nerea';
const prefix = n => 'cg_faroles_' + n + '_';
const say = (who, text) => ({ say: who, text });
const decision = (question, a, ar, b, br) => ({
  question, options: [{ text: a, response: ar }, { text: b, response: br }]
});
const stories = [
  {
    title: 'La caja que navegó sola', premise: 'Ayuda a Nerea y a Misty a recuperar una caja de faroles junto al agua de Ciudad Celeste.',
    npc: { name: 'Nerea', personality: 'Construye faroles, presume de sus nudos y se pone nerviosa cuando alguien los revisa.' },
    scenes: [
      { mode: 'dialogo', text: 'Misty sostiene una cuerda. Nerea sostiene el extremo equivocado. Su caja de faroles acaba de zarpar sin ellas.' },
      { mode: 'exploracion', text: 'Recupera el flotador desde la orilla. No hace falta entrar al agua ni dejar a tu equipo fuera de la Poké Ball.' },
      { mode: 'combate', text: 'Con la orilla despejada, Nerea propone ensayar cómo proteger el embarcadero durante un combate amistoso.' },
      { mode: 'convivencia', text: 'La caja llega chorreando. Nerea agradece que nadie haya aplaudido su regreso. Misty aplaude una sola vez.' }
    ],
    decision1: decision('¿Cómo probamos el rescate?', 'Recoger el flotador con la caña', 'Sin tirones: la caja también lleva cristal.', 'Ordenar una pasarela desde tierra', 'Mi especialidad: nudos. La tuya: comprobarlos.'),
    decision2: decision('¿Qué debe tener prioridad en los próximos faroles?', 'Señales que se vean desde lejos', 'Así vendrá gente que todavía no conoce la orilla.', 'Una luz tenue cerca de los refugios', 'Así los Pokémon podrán quedarse sin sentirse observados.'),
    callbacks: ['Tu pulso ha dejado secos los papeles del fondo.', 'La pasarela aguanta incluso el salto triunfal de Nerea.'],
    ending: 'Bill pidió ver el farol que sigue encendido bajo el agua. Nerea insiste en que no lo diseñó para eso.'
  },
  {
    title: 'Una luz que escucha', premise: 'Lleva el prototipo a la Casa de Bill y consigue bayas en Celeste para probar su cobertura.',
    npc: { name: 'Nerea', personality: 'Prefiere remendar una cosa útil a fabricar otra que solo se vea impecable.' },
    scenes: [
      { mode: 'dialogo', text: 'Bill pone una bandeja debajo del farol. Sigue goteando. «Primero resolveré la bandeja; después, el invento». Nerea parece aliviada.' },
      { mode: 'exploracion', text: 'Despeja el banco de trabajo y prepara una cubierta con cera vegetal. Las bayas se recogen en Celeste, sin gastar las tuyas.' },
      { mode: 'combate', text: 'Nerea quiere comprobar si la cubierta soporta una exhibición cerca del farol. Bill aparta primero el material delicado.' },
      { mode: 'descubrimiento', text: 'Cuando Nerea baja la voz, el farol deja de parpadear. Bill escucha el tintineo de una pieza suelta; no hay ningún poder nuevo.' }
    ],
    decision1: decision('¿Qué pieza probamos primero?', 'Reordenar el banco de trabajo', 'Si algo se cae, que esta vez no sea el farol.', 'Abrir la caja de conexiones', 'Está cerrada por mi propio candado. También guardé la combinación. Creo.'),
    decision2: decision('La luz ya funciona. ¿Cómo debería cambiar?', 'Un pulso reconocible y espaciado', 'Servirá de referencia sin encandilar todo el tiempo.', 'Brillo estable y muy suave', 'Se verá menos lejos, pero no despertará al que ya descansa.'),
    callbacks: ['El banco despejado permite sujetar el farol sin prisas.', 'Recuperas la pieza correcta sin forzar el candado. Nerea recupera su orgullo con ella.'],
    ending: 'Sabrina ofreció un patio tranquilo para una prueba. Bill etiqueta el farol: «No sumergir por segunda vez».'
  },
  {
    title: 'El patio sin aplausos', premise: 'Prueba con Sabrina el ritmo de los faroles en Azafrán y recoge un soporte en la Casa de Bill.',
    npc: { name: 'Nerea', personality: 'Quiere que todos disfruten su trabajo, pero aprende a aceptar que algunos prefieren no acercarse.' },
    scenes: [
      { mode: 'dialogo', text: 'Sabrina ha dejado sitio entre las macetas. «No leeré a nadie para saber si está cómodo. Dejaremos una salida». Nerea afloja el cartel de entrada.' },
      { mode: 'exploracion', text: 'Abre el estuche de filtros en Azafrán. Después ve por el soporte que Bill dejó entre las cajas de su casa.' },
      { mode: 'combate', text: 'Nerea propone una exhibición breve desde el borde del patio. Quien prefiera silencio podrá quedarse al otro lado.' },
      { mode: 'convivencia', text: 'Un Pokémon se acerca al círculo de luz y luego se retira. Sabrina impide que Nerea lo siga: «También ha elegido». Nerea deja el paso libre.' }
    ],
    decision1: decision('¿Cómo preparamos los filtros?', 'Recordar el orden del estuche', 'Tienen colores distintos. No hace falta adivinar lo que siente nadie.', 'Mover los soportes del patio', 'Dejaremos más sitio para entrar y salir.'),
    decision2: decision('¿Cómo invitamos a quien aún no se acerca?', 'Una invitación visible, sin insistir', 'Podrá encontrar el patio aunque nadie se lo explique.', 'Esperar junto a una entrada tranquila', 'Será más lento. Me quedaré para recibir a quien llegue.'),
    callbacks: ['Los filtros que ordenaste dejan una luz uniforme.', 'La separación de los soportes permite retirarse sin cruzar entre los demás.'],
    ending: 'Misty avisa que falta probar el recorrido junto al agua. Nerea guarda el cartel: la salida se quedará sin letreros.'
  },
  {
    title: 'Lo que el agua devuelve', premise: 'Busca un soporte caído en Celeste y recupera la cuerda de prueba junto a la Casa de Bill.',
    npc: { name: 'Nerea', personality: 'Sabe fabricar señales para otros; todavía le cuesta pedir que alguien la espere.' },
    scenes: [
      { mode: 'dialogo', text: 'Misty encuentra a Nerea mirando el agua. Se cayó el soporte que llevaba la marca de su primer taller. «Este no sé hacerlo otra vez», admite.' },
      { mode: 'exploracion', text: 'Puedes buscar el soporte con el Buscaobjetos o revisar el acceso entre los cajones. Luego recoge la cuerda de la prueba en Casa de Bill.' },
      { mode: 'combate', text: 'Con el soporte recuperado, Nerea pide una última práctica. Misty elige una zona seca y detiene el paso de los curiosos.' },
      { mode: 'descubrimiento', text: 'El soporte está doblado, pero sirve. Nerea deja la abolladura hacia fuera para reconocerlo entre todos los nuevos.' }
    ],
    decision1: decision('¿Cómo buscamos el soporte?', 'Rastrearlo con el Buscaobjetos de Bill', 'Bill lo prestó para la prueba. Lo devolveremos al terminar.', 'Abrir paso entre los cajones', 'Nada de meterse al agua. Misty vigilará desde aquí.'),
    decision2: decision('El soporte aún sostiene un farol. ¿Dónde lo ponemos?', 'En el punto donde empieza el recorrido', 'Podré verlo cuando llegue cada visitante.', 'En el pequeño descanso de la orilla', 'Quien se siente tendrá una luz que ya conoce el camino.'),
    callbacks: ['El Buscaobjetos encuentra el metal sin remover toda la orilla.', 'El paso entre cajones queda abierto para quien vuelva mañana.'],
    ending: 'Queda una prueba con todo montado. Nerea pide que la hagas tú: esta vez quiere mirar desde el público.'
  },
  {
    title: 'Un sitio bajo los faroles', premise: 'Completa el montaje en Celeste, recoge la cubierta en Azafrán y prueba el recorrido con Nerea.',
    npc: { name: 'Nerea', personality: 'Ya puede mostrar una pieza imperfecta sin inventar una excusa antes de que alguien la vea.' },
    scenes: [
      { mode: 'dialogo', text: 'Misty sujeta la primera cuerda. Bill lleva una bandeja que ya no hace falta. Sabrina ocupa el banco con mejor vista de la salida. Nerea te guarda un sitio.' },
      { mode: 'exploracion', text: 'Despeja el último paso de Celeste y recoge con Sabrina las bayas para terminar la cubierta. No se gastan objetos de tu mochila.' },
      { mode: 'combate', text: 'Nerea hará una prueba de resistencia con su equipo. Habrá curación antes, se detendrá si pierdes y podrás volver sin repetir el montaje.' },
      { mode: 'convivencia', text: 'La prueba termina sin un solo farol en el agua. Bill mira su bandeja y parece, por un momento, un poco decepcionado.' }
    ],
    decision1: decision('¿Cómo hacemos la última revisión?', 'Probar primero el paso entre soportes', 'Misty comprobará la cuerda mientras avanzas.', 'Comprobar el estuche de recambios', 'Bill se encargará de que cada pieza vuelva a su caja.'),
    decision2: decision('¿Qué espacio dejamos preparado para volver?', 'Un embarcadero para encuentros y pesca', 'Misty abrirá una zona de pesca con materiales comunes.', 'Un mirador tranquilo para buscar junto al agua', 'Sabrina reservará un banco y Bill prestará el Buscaobjetos.'),
    callbacks: ['La distribución que probaste deja caminar sin rozar las cuerdas.', 'Los recambios están al alcance. Nadie tiene que desmontar un farol para buscar otro.'],
    ending: 'Nerea deja encendido un farol de prueba. Tiene un soporte abollado y un nudo demasiado grande. Por fin no cambia ninguno de los dos.'
  }
];

const locs = ['celeste', 'casa_bill', 'azafran', 'celeste', 'celeste'];
const others = ['casa_bill', 'celeste', 'casa_bill', 'casa_bill', 'azafran'];
const hosts = ['misty', 'bill', 'sabrina', 'misty', 'bill'];
const estimates = [18, 20, 18, 22, 25];
const grids = [
  ['#######','#P....#','#..R..#','#..S..#','####D##','#....G#','#######'],
  ['#######','#P.RS.#','#.....#','#.....#','##D####','#....G#','#######'],
  ['#######','#P....#','#.R.S.#','#.....#','####D##','#....G#','#######'],
  ['#######','#P....#','#..R..#','#..S..#','#D#####','#....G#','#######'],
  ['#######','#P....#','#.R.R.#','#.S.S.#','###D###','#....G#','#######'],
  ['#######','#P....#','#.R...#','#...S.#','###D###','#....G#','#######']
];
const common = { npcs: {}, items: {}, quests: {}, scripts: {}, trainers: {}, gather: {}, patches: {} };
const metadata = [];
const addSpots = (loc, spots) => (common.patches[loc] ||= { spots: [] }).spots.push(...spots);
const guard = (condition, steps) => [{ if: condition, then: [{ end: true }] }, ...steps];
const has = key => 'flag.' + key;
const puzzle = (p, title, then) => ({ puzzle: { id: p+'puzzle', title, theme: 'lab',
  hint: 'Coloca una caja sobre cada placa y llega a la salida. Puedes deshacer o reiniciar.',
  grid: grids[p.includes('segunda_')?5:Number(p.match(/_(\d)_/)[1])-1] }, onSolve: then, onQuit: [{ text: 'El montaje se queda como estaba. Puedes volver a intentarlo.' }] });
const mini = (p, type, title, reward, then) => ({ minigame: {
  id: p+type, type, title, level: 2, theme: ({fish:'rio',lock:'caja',catch:'huerto',aura:'buscaobjetos'})[type],
  hint: ({fish:'Recoge el flotador sin dar tirones.',lock:'Repite la secuencia. Puedes verla otra vez.',catch:'Recoge las bayas para la cubierta.',aura:'Busca el soporte con el detector prestado por Bill.'})[type],
  guaranteed: [reward], picks: 0, consolation: false
}, onWin: then, onLose: [{ text: 'No se perdió nada. Puedes repetir la prueba.' }], onQuit: [{ text: 'Puedes volver cuando quieras; nadie continuará sin ti.' }] });

await fs.mkdir(out, { recursive: true });
for (let i=0; i<stories.length; i++) {
  const n=i+1, slug='faroles_'+n, p=prefix(n), f=k=>has(p+k);
  const story=stories[i];
  if (validate(story).length || evaluateRhythm(story).length) throw Error('Borrador inválido '+n);
  const source=path.join(out, 'cg-'+slug+'-fuente.json');
  await fs.writeFile(source, JSON.stringify(story,null,2)+'\n', {flag:'wx'});
  const generated=spawnSync(process.execPath,[path.resolve(here,'../../integraciones/generar-historia.mjs'),
    '--desde-json',source,'--slug',slug,'--salida',path.join(out,'borradores')],{encoding:'utf8'});
  if(generated.status!==0) throw Error(generated.stderr);
  const built=buildPlayablePack(story,{slug,location:locs[i],species:'noctowl',level:53+i});
  const pack=built.pack, ids=built.ids;
  const old=ids.npc;
  const replace = x => Array.isArray(x)?x.map(replace):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,replace(v)])):x===old?npc:x;
  pack.scripts=replace(pack.scripts);
  pack.npcs={};
  const prerequisite=i===0?'visited("celeste") && visited("azafran") && visited("casa_bill") && badges >= 8':has(prefix(n-1)+'completed');
  const active=f('started')+' && !'+f('completed');
  const itemA=p+'material_a',itemB=p+'material_b';
  common.items[itemA]={name:['Flotador del farol','Cierre de recambio','Filtro del patio','Soporte abollado','Cierre del recorrido'][i],pocket:'key',desc:'Material de la prueba de Nerea; no se vende ni se entrega a otro personaje.'};
  common.items[itemB]={name:['Medida del nivel del agua','Cera vegetal preparada','Soporte del patio','Cuerda recuperada','Cubierta terminada'][i],pocket:'key',desc:'Recuerdo del montaje; la misión progresa por tareas realizadas, no por gastar este objeto.'};
  const progress = letter => [
    {set:{[f('task_'+letter)]:true}},
    {if: f('task_a')+' && '+f('task_b'), then:[{set:{[f('explored')]:true}},{quest:ids.quest,stage:'reto'}]}
  ];
  const doneA=progress('a'),doneB=progress('b');
  // Dos aproximaciones reales por misión; la elección inicial decide el minijuego disponible.
  const typeA=['fish','lock','lock','aura','lock'][i];
  pack.scripts[ids.explore]=guard('!('+active+') || '+f('task_a'),[
    {if:f('decision1_0'),then:[i===1||i===4?puzzle(p,'Preparar el paso',doneA):mini(p,typeA,'La prueba de Nerea',itemA,doneA)]},
    {if:f('decision1_1'),then:[i===1?mini(p,'lock','Caja de conexiones',itemA,doneA):i===4?mini(p,'lock','Estuche de recambios',itemA,doneA):puzzle(p,'Abrir un paso seguro',doneA)]}
  ]);
  pack.scripts[p+'segunda']=guard('!('+active+') || '+f('task_b'),[
    say(hosts[i],[
      'Recupera la boya de medida con la caña. Su marca nos dirá a qué altura poner la señal sin que vuelva a mojarse.',
      'Estas bayas son del lote del ensayo. Recógelas aquí; no hace falta sacar las tuyas de la mochila.',
      'El soporte quedó detrás de las cajas. Despeja el paso sin empujarlo contra la pared.',
      'La cuerda se enganchó junto al embarcadero. Vamos a traerla sin arrastrar el soporte.',
      'Recoge las bayas de este lote. La cubierta se terminará aquí y Nerea la llevará a Celeste.'
    ][i]),
    i===0?mini(p+'segunda_','fish','Boya de medida',itemB,doneB):
    i===2?puzzle(p+'segunda_','Recoger el soporte',doneB):
    mini(p+'segunda_',i===3?'fish':'catch',i===3?'La cuerda junto al agua':'Bayas para la cubierta',itemB,doneB)
  ]);
  const team=[
    [{sp:'pelipper',lv:53},{sp:'lanturn',lv:54}],
    [{sp:'noctowl',lv:54},{sp:'ampharos',lv:54}],
    [{sp:'mr mime'.replace(' ',''),lv:54},{sp:'noctowl',lv:55}],
    [{sp:'lanturn',lv:55},{sp:'pelipper',lv:55}],
    [{sp:'pelipper',lv:55},{sp:'ampharos',lv:56},{sp:'noctowl',lv:57}]
  ][i];
  pack.trainers[ids.trainer]={name:'Nerea',npc,cls:'Artesana',ai:i===4?3:2,reward:0,team,
    intro:'Ensayo de seguridad: despejamos el paso antes de empezar.',
    win:'Buen ensayo. Las cuerdas siguen donde las dejamos.',
    lose:'Paramos aquí. Curo a tu equipo; el montaje puede esperar.'};
  const ready=[{set:{[f('won')]:true}},{quest:ids.quest,stage:'regreso'}];
  pack.scripts[ids.battle]=guard('!('+active+') || !'+f('explored')+' || '+f('won'),[
    say(npc,story.scenes[2].text),
    {choice:[
      {text:'Hacer el ensayo (curación antes y después)',then:[
        {heal:true},{battle:ids.trainer,lose:'continue',noLoss:true,
          onWin:[{heal:true},...ready,{set:{[f('combat_won')]:true}}],
          onLose:[{heal:true},say(npc,'Lo dejamos aquí. El ensayo sigue disponible; las tareas anteriores están guardadas.')]}
      ]},
      ...(i<4?[{text:'Revisar las sujeciones sin combatir',then:[{text:'Misty comprueba el perímetro libre y Bill revisa el cierre. La alternativa no da premios de combate.'},{set:{[f('ensayo_manual')]:true}},...ready]}]:[]),
      {text:'Volver después',then:[{text:'Nerea te guarda el sitio. Puedes ir al Centro, cambiar de equipo o seguir más tarde.'}]}
    ]}
  ]);
  const q=pack.quests[ids.quest];
  q.est=estimates[i];
  q.stages={
    inicio:story.premise,
    investigar:'Completa las dos pruebas señaladas: '+({celeste:'Ciudad Celeste',casa_bill:'Casa de Bill',azafran:'Ciudad Azafrán'})[locs[i]]+' y '+({celeste:'Ciudad Celeste',casa_bill:'Casa de Bill',azafran:'Ciudad Azafrán'})[others[i]]+'.',
    reto:'Vuelve con Nerea en '+({celeste:'Ciudad Celeste',casa_bill:'Casa de Bill',azafran:'Ciudad Azafrán'})[locs[i]]+' para el ensayo. Puedes curarte y posponerlo.',
    regreso:'Cierra el ensayo con Nerea en '+({celeste:'Ciudad Celeste',casa_bill:'Casa de Bill',azafran:'Ciudad Azafrán'})[locs[i]]+'. Recompensa: '+[300,400,400,500,700][i]+' monedas y un recuerdo de la serie.',
    hecha:'Ensayo concluido. Puedes saludar a Nerea y continuar la siguiente parte desde el lugar indicado.'
  };
  q.parts={title:'Las dos pruebas',items:[
    {label:'Prueba del montaje',where:locs[i],done:f('task_a'),hint:'Usa el punto «Prueba del montaje». Salir o fallar permite reintentar.'},
    {label:'Preparación complementaria',where:others[i],done:f('task_b'),hint:'Usa «Preparación complementaria» en este lugar.'}
  ]};
  const echo=i?[{if:has(prefix(n-1)+'decision2_0'),then:[say(hosts[i],['','Trajiste la idea de una señal lejana. Empezaremos probando un pulso que se vea sin dejar de escuchar el patio.','Bill me habló del pulso espaciado. Vamos a dejar un intervalo suficiente para que el patio se acostumbre.','La invitación quedó visible. Misty ha reservado un paso por el que pueda entrar quien no venga acompañado.','El soporte viejo marcará el inicio. Lo pondremos donde puedan verlo sin formar una fila alrededor.'][i])]},
    {if:has(prefix(n-1)+'decision2_1'),then:[say(hosts[i],['','Trajiste la idea de proteger el descanso. Vamos a probar el farol a poca altura.','Bill preparó un brillo suave. Separaremos las luces del banco de descanso.','La entrada tranquila funcionó. Misty ha dejado un banco lejos del paso de los curiosos.','El soporte viejo iluminará el descanso. El paso principal tendrá piezas nuevas.'][i])]}]:[];
  pack.scripts[ids.intro]=guard('!('+prerequisite+') || '+f('started'),[
    ...echo,...pack.scripts[ids.intro]
  ]);
  const memory=p+'recuerdo';
  common.items[memory]={name:['Nudo de la primera orilla','Nota de la bandeja','Tarjeta del patio','Lazada reparada','Farol de ensayo'][i],pocket:'key',
    desc:'Recuerdo legible de un ensayo compartido.',read:[
      'Nerea dejó una cuerda corta con dos lazadas. Una para sujetar la caja. La otra, dice Misty, para sujetar el orgullo.',
      'Bill dibujó una bandeja debajo del farol. Nerea añadió: «Primero lo útil. Después lo bonito». Ninguno tachó la frase del otro.',
      'La tarjeta de Sabrina solo dice: «La salida también forma parte de una invitación». Nerea dejó margen a ambos lados.',
      'La lazada conserva una hebra gastada del primer taller de Nerea. No sostiene peso: acompaña al soporte reparado.',
      'Una etiqueta con cuatro caligrafías: Nerea, Misty, Bill y Sabrina. El último espacio queda para ti.'
    ][i]};
  const close=pack.scripts[ids.finish];
  close.splice(close.findIndex(x=>x.quest&&x.done),0,
    {give:memory},{money:[300,400,400,500,700][i]},
    {give:'hyperpotion',n:i===4?2:1},
    say(hosts[i],i<4?'El próximo ensayo empieza en '+({celeste:'Ciudad Celeste',casa_bill:'Casa de Bill',azafran:'Ciudad Azafrán'})[locs[i+1]]+'. Puedes dejarlo para cuando vuelvas.':'El espacio queda abierto para que vuelvas cuando quieras.'));
  pack.scripts[ids.finish]=guard('!('+active+') || !'+f('won'),close);
  pack.scripts[ids.after]=[{if:'!'+f('completed'),then:[{end:true}]},
    {if:f('decision2_0'),then:[say(npc,story.decision2.options[0].response)]},
    {if:f('decision2_1'),then:[say(npc,story.decision2.options[1].response)]}];
  pack.patches={};
  addSpots(locs[i],[
    {label:'Nerea · '+story.title,icon:'💬',cond:prerequisite+' && !'+f('started'),new:'!'+f('started'),talk:[{script:ids.intro}]},
    {label:'Prueba del montaje',sub:story.title,icon:'🔧',cond:active+' && !'+f('task_a'),new:'!'+f('task_a'),talk:[{script:ids.explore}]},
    {label:'Ensayo con Nerea',icon:'⚔️',cond:active+' && '+f('explored')+' && !'+f('won'),new:'!'+f('won'),talk:[{script:ids.battle}]},
    {label:'Cerrar el ensayo con Nerea',icon:'💬',cond:active+' && '+f('won'),new:'!'+f('completed'),talk:[{script:ids.finish}]},
    {label:'Saludar a Nerea · ensayo '+n,icon:'💬',cond:f('completed')+(i<4?' && !'+has(prefix(n+1)+'started'):''),talk:[{script:ids.after}]}
  ]);
  addSpots(others[i],[{label:'Preparación complementaria',sub:story.title,icon:'🔎',cond:active+' && !'+f('task_b'),new:'!'+f('task_b'),talk:[{script:p+'segunda'}]}]);
  for(const k of ['quests','scripts','trainers'])Object.assign(common[k],pack[k]);
  metadata.push({episode:n,source:path.basename(source),generatedPlan:built.plan,
    estimatedMinutes:estimates[i],measured:false,location:locs[i],other:others[i],
    edits:['exploración interactiva','segunda tarea y parts','curación y reintento','guardas de repetición','eco interepisodio','recompensa única']});
}
common.npcs[npc]={name:'Nerea',title:'Artesana de faroles',look:{hair:'braids',hairColor:'#65402f',eyes:'#51807a',outfit:'#b88046',outfit2:'#ead8ab',skin:2,acc:'freckles'}};
for (const [key,type,theme,label] of [
  ['embarcadero','fish','rio','Embarcadero de los ensayos'],
  ['mirador','aura','buscaobjetos','Mirador de los ensayos']
]) {
  const id='cg_faroles_'+key;
  common.gather[id]={name:label,icon:'🧺',hours:20,picks:[1,2],game:{type,theme,level:2},
    text:'Nerea ha dejado este rincón preparado para tu próxima visita.',wait:'Dejemos que la orilla descanse hasta la próxima recolección.',
    table:[{id:'pearl',w:2,n:[1,1]},{id:'oranberry',w:8,n:[1,2]}]};
  addSpots('celeste',[{label,icon:'🧺',cond:'flag.cg_faroles_5_completed && flag.cg_faroles_5_decision2_'+(key==='embarcadero'?0:1),
    new:'!flag.rec_'+id,action:{gather:id}}]);
}
await fs.writeFile(path.join(out,'cg-faroles.js'),'// Serie candidata aditiva. Revisar antes de integrar.\nexport default '+JSON.stringify(common,null,2)+';\n',{flag:'wx'});
await fs.writeFile(path.join(out,'cg-faroles.plan.json'),JSON.stringify({schema:1,base:'ebad8ebff1843de962d1ee7f79c08db0192c1577',
  status:'revision_obligatoria',episodes:metadata,totalEstimatedMinutes:103,measured:false,
  toolsUsed:['generar-historia: --desde-json','validate','evaluateRhythm','buildPlayablePack','planGameplay','reviewGameplay'],
  toolsExcluded:{ollama:'No se requiere un modelo descargado: autoría original y modo JSON gratuito.',ink:'Formato externo; no valida guiones PKM.',auditoriaGlobal:'Requiere registro runtime y acceso a contenidos fuera del alcance.',buildSw:'No se publica ni modifica app/.'}},null,2)+'\n',{flag:'wx'});
console.log('Serie creada: 5 misiones, 10 tareas, 10 decisiones, 5 ensayos y 2 epílogos excluyentes. Duración no medida.');
