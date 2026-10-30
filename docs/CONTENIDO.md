# Formato de contenido (para escribir bloques)

El contenido vive en `app/content/`. Cada bloque es una carpeta `bNN/` con un `index.js` que exporta un objeto. `app/content/index.js` lista los bloques en orden:

```js
import b01 from './b01/index.js';
import b02 from './b02/index.js';
export const CONTENT_VERSION = '2026-10-06.1'; // súbelo en cada publicación
export const BLOCKS = [b01, b02];
```

**Importante:** todos los archivos son **módulos ES con datos planos**. No se usan funciones salvo los imports. Las condiciones son **cadenas** que el motor evalúa (sección 9).

---

> **Misiones terminadas:** en las condiciones, `quest.x` de una misión ya terminada se lee siempre como `'hecha'`, aunque su última etapa fuera otra. Un `{ quest }` sobre una misión terminada no hace nada.

## 1. Objeto de bloque

```js
export default {
  id: 'b01',
  title: 'Acto I · Fisuras',
  hours: 12,                 // estimación de duración
  start: 'b01_inicio',       // guion inicial (solo el primer bloque)
  ends: 'b01_fin',           // flag que marca el final del bloque
  regions: { kalos: { name: 'Kalos', h: 140 } },  // h = alto del mapa (el ancho siempre es 100)
  npcs: { ... },             // §2
  locations: { ... },        // §3
  patches: { locId: { spots: [...], route: { tramos: {...}, encounters: {...} } } }, // añade cosas a lugares de bloques anteriores
  trainers: { ... },         // §5
  quests: { ... },           // §6
  scripts: { ... },          // §7
  challenges: { ... },       // §8 fichas de reto
  badges: { medalla_roca: { name: 'Medalla Roca', type: 'Rock', desc: '...' } },
  shops: { tienda_luminalia: { name: 'Tienda de Luminalia', items: ['pokeball', 'potion', { id: 'superpotion', cond: 'badges >= 1' }] } },
  items: { farollana: { name: 'Farol de Lana', pocket: 'key', desc: '...' } }, // objetos propios (los ids van sin guiones ni espacios)
  // art: 'acuarela_riolu' → el objeto clave se puede «Mirar» en la mochila (cuadros pintados por código en app/js/ui/acuarela.js)
  // read: 'texto' → el objeto se puede «Leer» (cartas, notas, diarios). Sale en Colección → Recuerdos.
  gather: {  // puntos de recolección, uno por id; se recogen una vez cada `hours` horas reales
    orilla: { name: 'Orilla de la playa', icon: '🐚', hours: 18, picks: [1, 3], text: 'La marea ha dejado cosas…', wait: '…',
      table: [ { id: 'pearl', w: 14, n: [1, 1] }, { id: 'heartscale', w: 10, n: [1, 1], cond: 'badges >= 2' } ] },
  },
  // Se colocan como spot en lugares ({ label, icon, action: { gather: 'orilla' } })
  // o en tramos de ruta ({ spot: { action: { gather: 'orilla' } }, label, icon }), por ejemplo con `patches`.
  // Con minijuego: `game: 'dig'|'fish'|'catch'|'aura'|'lock'` o `game: { type, level, theme, hint, wild, wildChance }`.
  //   Al recoger se elige «Jugar» (sale más, y solo así salen las entradas `rare: true` de la tabla) o «Recoger rápido»
  //   (lo de siempre). `ask` es el texto de esa pregunta. Formato y reglas de economía: docs/MINIJUEGOS.md §4.
  // El motor activa `flag.rec_<id>` la primera vez que se recoge en un punto: en puntos añadidos a zonas ya
  //   visitadas, pon `new: '!flag.rec_<id>'` en el spot para que salga en Diario › Novedades hasta que se pruebe.
  // Las ciudades y pueblos (kind city/town) dan una postal automática al visitarlos (Colección → Postales).
  events: [ ... ],           // §10 eventos por fecha
  milestones: [ { flag: 'b01_m_relieve', hoursLeft: 3 } ],  // §11 aviso de ritmo
};
```

---

## 2. NPCs

```js
npcs: {
  handsome: { name: 'Handsome', title: 'Policía Internacional', sprite: 'looker', look: {...} },
  lila: { name: 'Lila', title: 'Aprendiz de la Torre Maestra', look: { hair: 'bob', hairColor: '#e9e8e0', streak: '#7fd6b0', eyes: '#3f8a4f', outfit: '#e9dcb6', outfit2: '#5aa36b', skin: 0, acc: '' } },
}
```

- **`sprite`:** nombre de un sprite de entrenador de Showdown. Úsalo solo para personajes **canon**. Si no carga, se usa `look`.
- **`look`:** retrato pixel chibi procedural:

| Campo | Valores |
|---|---|
| `hair` | short, long, bob, ponytail, braids, spiky, curly, bun, tied, bald, cap |
| `hairColor`, `eyes`, `outfit`, `outfit2`, `streak` | colores hex |
| `skin` | 0–5 o un hex |
| `eyesStyle` | normal, sleepy, sharp, happy |
| `mouth` | smile, flat, grin, open |
| `acc` | lista separada por espacios: glasses, goggles, hat, scar, freckles, headphones, beard, mustache, bandana, flower, bow, mask, lemnis, tie |
| `bg` | color de fondo del retrato |

---

## 3. Lugares

```js
locations: {
  luminalia: {
    name: 'Ciudad Luminalia', short: 'Luminalia', region: 'kalos', kind: 'city', // city | town | route | cave | forest | area | building | gym
    map: { x: 52, y: 58 },          // posición en el mapa (0–100 ancho, 0–h alto). Solo lugares de primer nivel.
    bg: { type: 'city', landmark: 'prism' }, // escena (§4)
    desc: 'Texto con **negritas**.\n\nPárrafos separados por línea en blanco.',
    descNight: '...',                // opcional
    descs: [ { cond: 'flag.x', text: '...' } ],  // la primera que cumpla gana
    links: ['ruta4', 'ruta5'],       // conexiones del mapa (se hacen simétricas solas)
    enterCond: 'badges >= 1', blockedMsg: 'Un guardia te detiene…',
    hidden: '!flag.x',               // oculta la salida en la lista "Caminos" mientras se cumpla
    onEnter: [ { script: 'b01_llegada_novarte', cond: '!flag.x', once: true } ],
    spots: [ /* §3.1 */ ],
    rumors: [ { cond: 'true', text: 'Dicen que de noche…' } ],  // salen en la Guía de zona
    encounters: { grass: [...] },    // para lugares que no son ruta, usados con spots { action: { explore: 'grass' } }
    parent: 'luminalia',             // SOLO sub-áreas (edificios, gimnasio, zonas): no salen en el mapa; tienen botón "Salir"
    route: { /* §3.2, solo rutas, cuevas y bosques recorribles */ },
    mapNote: 'Gimnasio: Brock (Roca)',
  },
}
```

### 3.1 Spots (botones dentro de un lugar)

```js
{ label: 'Centro Pokémon', action: { center: true } },
{ label: 'PC', action: { pc: true } },
{ label: 'Tienda', action: { shop: 'tienda_luminalia' } },
{ label: 'Laboratorio de Ciprés', icon: '🔬', action: { go: 'lab_cipres' } },   // entra a una sub-área
{ label: 'Hablar con Lila', sub: 'Parece preocupada', icon: '💬', cond: 'flag.lila_en_yantra',
  new: '!flag.lila_hablado_1',       // muestra el punto "!" mientras se cumpla
  doneIf: 'flag.x',                  // atenuado
  talk: [ { cond: '!flag.a', script: 'lila_1' }, { script: 'lila_generico' } ] },  // la primera variante que cumpla
{ label: 'Retar a Brock', script: 'gym_brock' },                                   // guion directo
{ label: 'Entrenador: Excursionista Tomás', action: { trainer: 'exc_tomas' } },    // combate único
{ label: 'Dojo', action: { training: { cap: 14, trainers: ['dojo_1', 'dojo_2'], wild: [{ sp: 'machop', lv: [10, 12] }], npc: 'maestro_dojo', closed: 'Texto si ya tienes el nivel' } } },
{ label: 'Explorar el jardín', action: { explore: 'grass' } },  // encuentro salvaje con la tabla `encounters` del lugar
{ label: 'El rancho', icon: '🐑', action: { venture: 'rancho_prado' } },         // abre la ficha de un negocio (§13)
```

**Premio del instructor (`prize`), obligatorio en toda zona de entrenamiento** (pedido de Mario, 2026-10-10: «solo son combates; si me dieran una Megapiedra o una MT temática del lugar o del gimnasio estaría bien»):

```js
action: { training: { cap: 45, trainers: ['muelle_1', 'muelle_2', 'muelle_3'], coach: 'Contramaestre', /* … */
  prize: { wins: 3, script: 'b03_premio_muelle' } } }
```

- Al ganar `wins` combates de práctica (por defecto 3; cuentan los ganados antes de que existiera el premio), el encargado corre `script` **una sola vez**: una escena corta con su voz (2–5 líneas, por qué te lo da, qué tiene que ver con el lugar o con el líder) y un `{ give }`.
- El premio es **temático**: una MT del tipo del gimnasio o del lugar, o una Megapiedra de un Pokémon que tenga sentido allí. Megapiedras, con medida (una cada 3 o 4 zonas) y nunca de un legendario.
- Con el equipo por encima del tope, la zona sigue cerrada para subir de nivel, pero deja hacer «combates de exhibición» hasta ganarse el premio. El primer combate siempre es contra alguien a quien aún no has vencido.
- El mosaico del lugar enseña «🎁 Premio: 1/3 combates» y avisa cuando está listo.

### 3.2 Rutas

```js
route: {
  from: 'luminalia', to: 'novarte',   // extremo 0 y extremo final
  length: 8,                          // tramos 0..length
  terrain: 'grass',                   // por defecto: grass | cave | water | forest | flowers | sand | path | snow | rocks
  rate: 0.22,                         // probabilidad de encuentro por paso
  tramos: {
    2: [ { trainer: 'chica_ana' } ],                                    // combate obligatorio al llegar (si no está vencido)
    3: [ { trainer: 'joven_luis', optional: true, label: 'Te mira desde la fuente' } ], // botón opcional
    4: [ { item: 'potion' } ],                                           // objeto visible (botón)
    5: [ { item: 'rarecandy', hidden: true } ],                          // oculto: se encuentra con "Buscar"
    6: [ { text: 'Una fuente rodeada de flores amarillas.' }, { terrain: 'water' } ],
    7: [ { script: 'b01_r4_fisura', once: true, mark: true } ],          // guion al llegar (una vez); mark = segmento dorado en la barra
    8: [ { block: { cond: 'has("pokeflute")', msg: 'Un Snorlax enorme bloquea el camino.', dir: 1 } } ], // impide avanzar hasta cumplir
    9: [ { branch: { label: 'Entrar al Bosque de Novarte', go: 'bosque_novarte', cond: 'true' } } ],    // desvío a otro lugar
    10: [ { talk: [ { script: 'npc_x' } ], label: 'Una anciana con un cesto', icon: '👵', new: '!flag.x' } ],
    11: [ { wildFixed: { sp: 'snorlax', lv: 18 } } ],                    // encuentro fijo (una vez)
  },
  encounters: {
    grass: [ { sp: 'flabebe', lv: [6, 8], w: 40 }, { sp: 'ralts', lv: 8, w: 4, time: 'night' },
             { sp: 'shinx', lv: [6, 8], w: 6, displaced: true, cond: 'flag.fisura_abierta' } ],
    water: [ ... ], cave: [ ... ],
  },
},
```

- `w` es el peso relativo, y la Guía de zona lo traduce a común, poco común o raro (≥30, ≥10, <10).
- `time` puede ser `day`, `night` o `morning`.
- `displaced: true` marca a los Pokémon de Fisura.
- `gimmick: 'tera'` con `tera: 'Fire'` crea un salvaje que se teracristaliza.

---

## 4. Escenas (`bg`)

| Campo | Valores |
|---|---|
| `type` | city, plaza, town, ranch, route, forest, cave, coast, mountain, ruins, castle, palace, tower, gym, lab, indoor, center |
| `landmark` | `prism` (Torre Prisma), `gate` (Puerta Lemnis) |
| `flowers` | hex para flores en rutas |
| `crystals` | hex en cuevas |
| `dark` | cueva oscura |
| `fog` | niebla |
| `fissure` | grieta violeta |
| `roofs` | lista de hex para pueblos |
| `ground`, `hill`, `far` | hex |
| `wall`, `floor` | hex para interiores |

---

## 5. Entrenadores

```js
trainers: {
  brock_g1: {
    name: 'Brock', cls: 'Líder', npc: 'brock',      // npc → usa su retrato; registra el equipo en el Expediente
    ai: 4,                                          // 1 novato, 2 normal, 3 entrenador de gimnasio, 4 líder, 5 jefe
    team: [ { sp: 'geodude', lv: 12, moves: ['rocktomb', 'defensecurl', 'rollout', 'rockpolish'], ability: 'sturdy', item: 'oranberry', nature: 'impish', iv: 20 } ],
    items: [ { id: 'superpotion', n: 1 } ],          // objetos curativos que usa la IA
    gimmick: 'mega', ace: 'lucario',                // mecánica y Pokémon que la usa
    reward: 1500,                                   // si no, base (40) × nivel máximo
    base: 60,
    intro: 'Frase antes del combate', win: 'Frase cuando el jugador gana', lose: 'Frase si el jugador pierde',
    terrain: 'gym', bg: 'gym', look: { ... }, sprite: 'hiker',
  },
}
```

- **Movimientos:** si no se indican, se usan los 4 últimos que aprende por nivel.
- **Líderes y jefes:** **siempre** con movimientos, habilidad y objeto elegidos a mano.
- **IVs:** por defecto 20. Para líderes, 25–31.

---

## 6. Misiones

```js
quests: {
  b01_m1: { name: 'La Puerta', type: 'main', est: 30,
    stages: { inicio: 'Asiste a la inauguración en la Torre Prisma.', huida: 'Encuentra a Riolu…' } },
  // type: main ⭐ | thread 🧵 (hilo de NPC, varios bloques) | side 📜 | event 🎉
}
```

Se controlan desde los guiones con `{ quest: 'b01_m1', stage: 'huida' }` y `{ quest: 'b01_m1', done: true }`.

**Lista de partes (`parts`), obligatoria en misiones de reunir varias cosas** (rescatar N Pokémon, encontrar N piezas, hablar con N personas). La ficha muestra cada parte con ✔ (hecha), ◐ (a medias) u ○, su lugar y tramo, y una pista. Sustituye al contador `vars.X` de «Lo que necesitas».

```js
parts: { title: 'Los 6 Mareep', var: 'mareep', items: [
  { label: 'Copito', where: 'ruta5', tramo: 4,
    done: 'flag.b01_mareep_copito',       // ya está
    got: 'has("lanamareep1")',            // opcional: a medias (encontraste la pista)
    hint: 'Pista corta de cómo encontrarlo.', gotHint: 'Qué hacer cuando está a medias.' },
  { label: 'Chispita', where: 'ruta5', tramo: 5, done: 'flag.b01_mareep_jaula',
    hint: [ { cond: 'flag.b01_mareep_lemnis', text: 'Pista si…' }, { text: 'Pista por defecto' } ] },
] }
```

Los objetos que piden los diálogos (`has`, `count`) no necesitan `parts`: la ficha ya dice en qué tramo están tirados o escondidos y cuántos recogiste.

---

## 7. Guiones

Un guion es una lista de comandos. Una cadena suelta equivale a `{ text }`. Cualquier comando acepta `cond`: si no se cumple, se salta.

| Comando | Efecto |
|---|---|
| `{ say: 'lila', text: '…' }` | diálogo con retrato. `'jugador'` = el protagonista. `as: 'Nombre'` cambia el nombre mostrado |
| `{ text: '…' }` | narración |
| `{ choice: [ { text: '…', cond, then: [...] } ], prompt: '…' }` | decisión |
| `{ if: 'cond', then: [...], else: [...] }` | |
| `{ set: { 'flag.x': true, 'vars.y': '+1', 'vars.z': 5 } }` | |
| `{ rep: { lemnis: -5, policia: 3 } }` | reputación −100..100 |
| `{ af: { lila: 5 } }` | afinidad con candidata 0..100 |
| `{ give: 'potion', n: 2 }` / `{ take: 'x', n: 1 }` / `{ money: 500 }` | `silent: true` para no mostrar mensaje |
| `{ pokemon: { sp: 'riolu', lv: 5, nature: 'jolly', ivs: {...}, uidVar: 'riolu_uid', ... } }` | entrega un Pokémon (con pregunta de mote) |
| `{ battle: 'trainerId', onWin: [...], onLose: [...], lose: 'continue' }` | sin `onLose` ni `lose:'continue'`, perder manda al Centro y corta el guion |
| `{ wild: { sp, lv, gimmick, tera, noCatch }, canRun: false, onWin, onCatch, onRun, onLose }` | Encuentro único. Si se puede capturar y no se captura, **vuelve tras la siguiente medalla** (`app/js/unicos.js`): Rotom avisa y aparece como sitio en el pueblo o ciudad donde estés. Las `set` a `true` de `onCatch` se aplican al capturarlo en esa segunda oportunidad. Para que un `wild` capturable no cuente como único (concursos, combates repetibles), ponle `unique: false` dentro de `wild`. |
| `{ heal: true }` | |
| `{ go: 'locId' }` | mueve al jugador |
| `{ quest: 'id', stage: 'x' }` / `{ quest: 'id', done: true }` | |
| `{ diary: 'Entrada en primera persona de Rotom…' }` | Diario de Rotom. Ver la voz en `secreto/biblia.md` §7 |
| `{ intel: { npc: 'bastien', text: '…' } }` | nota en el Expediente |
| `{ badge: 'medalla_roca' }`, `{ cap: 22 }` | `cap` = nivel del tope suave |
| `{ call: 'otroGuion' }`, `{ end: true }` | |
| `{ toast: '…' }` | aviso breve |
| `{ happy: { who: 'riolu', n: 20 } }` | amistad |
| `{ learn: { who: 'riolu', move: 'forcepalm' } }` | `who`: 'riolu', especie, 'party0' |
| `{ unlock: 'mega' }` | habilita la mecánica (además hace falta el objeto clave: `megaring`, `zring`, `dynamaxband`, `teraorb`) |
| `{ shop: 'id' }`, `{ center: true }`, `{ pc: true }`, `{ save: true }`, `{ evolveCheck: true }` | |
| `{ nickname: 'last' }`, `{ clearRoute: 'ruta4' }`, `{ wait: 500 }` | |
| `{ cutscene: { bg: { type: 'cave' }, start: 'dark', frames: [ { text, item, npc, mon, actors, fx, cam, … } ] } }` | cinemática a pantalla completa: fondo vivo con paralaje, cámara, actores que entran y reaccionan, clima, efectos y texto que se escribe. Se avanza tocando (mantener pulsado ofrece saltarla). **Formato completo, recetas y reglas en `docs/CINE.md`**; léelo antes de escribir una. Úsala en momentos clave (objeto clave, llegada, giro, pérdida, legendario, clímax): de 2 a 4 por bloque |
| `{ puzzle: { id, title, hint, theme, grid: [...] }, onSolve: [...], onQuit: [...] }` | puzle de rejilla táctil (ver §7.1). `onSolve` corre al resolverlo y `onQuit` si el jugador sale |
| `{ minigame: { type, id, title, hint, theme, level, loot: [...], guaranteed: [...], … }, onWin: [...], onLose: [...], onQuit: [...] }` | minijuego para conseguir objetos: `dig` excavar, `fish` pescar, `catch` cosechar, `aura` rastrear, `lock` cerradura (ver **`docs/MINIJUEGOS.md`**). Entrega el botín él solo; perder da una consolación y salir no da nada, y los dos dejan reintentar |
| `{ read: 'idObjeto' }` / `{ read: { title, text } }` | abre una **hoja de papel** a pantalla completa que se desplaza (cartas, notas, diarios). Con un id usa el `name` y el `read` del objeto. Úsalo cuando el jugador recibe una carta y debe leerla en ese momento; nunca metas una carta larga en un `text` (el cuadro de diálogo es para frases) |
| `{ read: { title, gen: 'medallas' \| 'muro' \| 'esfuerzo' } }` | hoja de papel cuyo texto genera el motor con la partida (`app/js/atico.js`): la vitrina de medallas por región o el muro de encuentros con tus Pokémon. No inventa nada: solo lee lo que ya pasó |
| `{ venture: 'id' }` / `{ venture: 'id', join: true }` | abre la ficha de un negocio (§13); con `join: true` lo hace socio sin cobrarle la entrada (regalos de la historia). `join: true, open: true` hace las dos cosas |

**Marcadores en textos:**

- `{jugador}`: nombre del jugador.
- `{riolu}`: mote de Riolu.
- `{o|a|e}`: según los pronombres (él/ella/elle). Ejemplos: `Bienvenid{o|a|e}`, `{el|la|le} novat{o|a|e}`.

**Formato:** `**negrita**`, `*cursiva*`, `\n` para salto de línea.


### 7.1 Puzles de rejilla (`puzzle`)

Un componente, muchos puzles: rocas que se empujan (como con Fuerza), hielo que resbala, interruptores, puertas y hoyos. Se juega con la cruceta, deslizando el dedo o tocando una casilla en línea con el jugador; tiene **Deshacer**, **Reiniciar**, **Salir** y una ayuda «?» que explica solo lo que sale en ese puzle. Lógica pura en `app/js/puzle.js`; interfaz en `app/js/ui/rejilla.js`.

```js
{ puzzle: {
    id: 'b03_ruinas_sala1',      // opcional: guarda veces resuelto y mejor marca en G.puzzles[id]
    title: 'Sala de las rocas',  // arriba de la rejilla
    hint: 'Una roca sobre la placa abre la reja.', // ≤ 140 caracteres; se ve debajo de la rejilla
    theme: 'ruina',              // cueva (por defecto) | ruina | hielo | lab
    grid: [
      '########',
      '#P.....#',
      '#.R.RH.#',
      '#.##...#',
      '#S#IIII#',
      '#..I##D#',
      '#....#G#',
      '########',
    ],
    rocks: [[3, 4]],             // opcional: rocas encima de hielo, interruptores o meta
  },
  onSolve: [{ set: { 'flag.b03_sala1': true } }, 'La reja del fondo se abre con un chirrido.'],
  onQuit: ['Mejor vuelvo cuando lo tenga más claro.'] }
```

| Carácter | Casilla |
|---|---|
| `#` | pared |
| `.` | suelo |
| `P` | inicio del jugador (uno) |
| `G` | meta: llegar aquí resuelve el puzle (al menos una) |
| `R` | roca empujable (sobre suelo). Se empuja caminando contra ella; nunca dos a la vez |
| `I` | hielo: el jugador y las rocas resbalan hasta chocar o salir del hielo. Resbalando no se empujan rocas |
| `S` | interruptor: pulsado mientras tiene una roca encima |
| `D` | puerta: abierta solo con **todos** los interruptores pulsados (sin interruptores, siempre abierta) |
| `H` | hoyo: no se pisa; una roca empujada dentro lo tapa y desaparece |
| `~` | agua (decorado, no se pisa) |
| `*` | roca fija (decorado, no se mueve) |

**Reglas:**

- Máximo **9×9**. En móvil, 7×7 u 8×8 es lo más cómodo.
- El validador comprueba que el puzle se lee bien y que **tiene solución** (búsqueda en anchura); imprime cuántos pasos mide la más corta. Un puzle sin solución es error.
- El bot lo resuelve solo. Si sale, se corre `onQuit`; el guion puede ofrecer reintentar (pon el puzle en un spot que se pueda repetir con `cond`).
- Dificultad orientativa (solución más corta): 6–12 pasos fácil, 13–25 medio, 26+ difícil. Empieza fácil en cada zona y sube.
- Si el puzle necesita Fuerza u otro movimiento para tener sentido en la historia, ponlo en el `cond` del spot, no en el puzle.

---

## 8. Fichas de reto

```js
challenges: {
  gym_novarte: {
    name: 'Gimnasio de Ciudad Novarte', npc: 'brock', trainer: 'brock_g1', type: 'Rock', rec: 14,
    cond: 'visited("novarte")',              // cuándo aparece en la lista
    info: [
      { text: 'Líder de intercambio: **Brock** (tipo Roca).' },
      { cond: 'flag.guia_novarte', text: '3 Pokémon, nivel 12–14.' },
      { cond: 'beat("gym_novarte_t1")', text: 'Su **Onix** aguanta un golpe que lo debilitaría (Robustez).' },
    ],
  },
}
```

---

## 9. Condiciones

Son expresiones JavaScript sobre este ámbito:

| Expresión | Significado |
|---|---|
| `flag.nombre` | booleano (falso si no existe) |
| `vars.nombre` | número (0 si no existe) |
| `rep.lemnis`, `af.lila` | reputación y afinidad |
| `quest.b01_m1 == 'huida'`, `done.b01_m1` | etapa y si está terminada |
| `has('pokeflute')`, `count('potion') > 2` | objetos |
| `badges >= 1`, `badge('medalla_roca')` | medallas |
| `money`, `maxLv`, `partySize`, `dex` | dinero, nivel máximo, tamaño del equipo, especies capturadas |
| `inParty('riolu')`, `owns('fennekin')`, `seen('x')`, `caught('x')` | Pokémon |
| `visited('id')`, `cleared('id')`, `beat('trainerId')` | progreso |
| `partner('rancho_prado')`, `works('ampharos')` | eres socio de ese negocio · tienes un Pokémon de esa especie trabajando en algún negocio (§13) |
| `night`, `day`, `morning`, `evening`, `time` | `time` es 'manana', 'dia', 'tarde' o 'noche' |
| `season` | 'primavera', 'verano', 'otono', 'invierno' |
| `date('10-31','11-02')` | rango de fechas |
| `pron` | 'el', 'ella' o 'elle' |
| `hitos` | medallas y grandes combates que subieron el tope (`app/js/state.js`) |
| `bond('riolu')`, `bond('candela')` | amistad (0–255) de ese Pokémon con nombre propio si va en el equipo; 0 si no |

---

## 10. Eventos por fecha

```js
events: [ {
  id: 'muertos2026', name: 'Día de Muertos', from: '10-31', to: '11-02', cond: 'flag.b01_inicio_hecho',
  spots: { luminalia: [ { label: 'Ofrenda de la familia Ortega', icon: '🕯️', talk: [ { script: 'ev_muertos' } ] } ] },
  encounters: { ruta5: { grass: [ { sp: 'litwick', lv: [10, 14], w: 15, time: 'night' } ] } },
  tramos: { ruta4: { 3: [ { item: 'cempasuchil', hidden: true } ] } },
  onEnter: { luminalia: [ { script: 'ev_muertos_aviso', once: true } ] },
  // para los avisos (obligatorios; el validador avisa si faltan):
  icon: '🕯️',
  blurb: 'Una frase SIN spoilers: qué tipo de cosas hay, nunca qué pasa.',
  doneCond: 'done.ev_muertos',   // cuándo el jugador ya lo completó (este año, si se repite)
  surprise: false,               // true = no se anuncia antes de empezar (p. ej., el cumpleaños)
} ]
```

**Avisos de eventos (automáticos):**
- Cada lugar muestra arriba un recuadro con los eventos activos sin completar y los que empiezan en los próximos 7 días (si no son `surprise`). El último día se resalta.
- Rotom avisa una vez al año, la primera vez que abres el juego con el evento activo.
- El Diario (pestaña «Por hacer») lista todos, con su ficha: fechas, descripción y «Dónde» (lugares de `spots`, `tramos`, `encounters` y `onEnter`; los no visitados salen como «un lugar que aún no conoces»).
- Si `cond` no se cumple, el aviso dice que se desbloquea al avanzar en la historia.

---

## 11. Aviso de ritmo

`milestones: [{ flag, hoursLeft }]`. Cuando el jugador activa ese flag, si **no** hay un bloque publicado después de este y `hoursLeft <= 3`, el juego le avisa que pida el siguiente bloque. Pon uno a ~3 h del final de cada bloque.

---

## 12. Validación

Antes de publicar: `node herramientas/validar.mjs` revisa referencias, especies, movimientos, condiciones y conteo de apariciones de NPCs. Después: `node herramientas/build-sw.mjs`.

---

## 13. Negocios (administración de recursos)

> Pedido de Mario, 2026-10-10: tiene muchísimo dinero y nada en que gastarlo; quiso financiar el rancho y «ser dueño colaborador para tener más ganancias». Motor en `app/js/negocios.js`, pantalla en `app/js/ui/negocios-ui.js` (Más › Negocios y spots con `action: { venture }`).

Un negocio produce **en tiempo real** (como la recolección). El jugador entra como socio, **reparte el esfuerzo** entre líneas de producción, compra **mejoras**, pone a **trabajar a Pokémon** del PC, elige **encargado** y **pasa a recoger**: lo que no cabe en el almacén se pierde. De vez en cuando sale un **imprevisto** con una decisión.

```js
ventures: {
  rancho_prado: {
    name: 'Rancho Prado', icon: '🐑', loc: 'rancho_aurelio',  // lugar (para «Ir allí»)
    partner: 'sobrina',                       // NPC que sale en la ficha
    cond: 'flag.b03_rancho_jugador || flag.b03_rancho_sobrina', // cuándo aparece como oportunidad
    blurb: 'Una frase SIN spoilers de qué es.',
    buy: { cost: 0, text: 'Lo que te dice al entrar', script: 'guion_opcional', set: { 'flag.x': true } },
    share: [ { cond: 'flag.b03_rancho_jugador', pct: 70 }, { pct: 30 } ],  // tu parte de la ganancia (la primera que cumpla)
    upkeep: 900,                              // gasto diario (pienso, sueldos): se descuenta antes de repartir
    store: 3,                                 // días que caben en el almacén
    lines: {                                  // producción POR DÍA con el 100 % del esfuerzo, sin mejoras
      lana:  { name: 'Lana', icon: '🧶', desc: 'Se vende sola.', money: 2400 },
      leche: { name: 'Leche', icon: '🥛', desc: '…', items: [ { id: 'moomoomilk', perDay: 2 } ] },
      cria:  { name: 'Cría', icon: '🥚', desc: '…', items: [ { id: 'rarecandy', perDay: 0.15 } ], locked: true }, // la abre una mejora con unlock
    },
    upgrades: [                               // compras de una sola vez
      { id: 'tejado', name: 'Tejado del establo', cost: 30000, desc: 'Qué es y qué cambia.', mult: { all: 1.15 } },
      { id: 'esquiladora', name: 'Esquiladora', cost: 45000, desc: '…', mult: { lana: 1.5 }, need: ['tejado'] },
      { id: 'paridera', name: 'Paridera', cost: 60000, desc: '…', unlock: 'cria', cond: 'badges >= 7' },
      { id: 'socio2', name: 'Ampliar tu parte', cost: 80000, desc: '…', share: 20 },   // +20 puntos de participación
      // otros campos: slots: 1 (un puesto más de trabajo), store: 2 (días de almacén), upkeep: -200, set: { 'flag.x': true }, script: 'escena_al_comprar', hidden: 'cond'
    ],
    jobs: { slots: 2, types: ['Electric', 'Normal', 'Grass'], text: 'Qué hacen aquí los Pokémon.', favs: { mareep: 0.1, miltank: 0.12 } },
    managers: [                               // quién lo lleva; el primero sin cond es el de siempre
      { npc: 'sobrina', desc: 'Lo cuida entre consulta y consulta.', mult: { leche: 1.2 } },
      { npc: 'otro_npc', cond: 'flag.y', desc: '…', mult: { lana: 1.25 }, wage: 300 },   // wage = sueldo diario
    ],
    eventRate: 0.7,
    events: [                                 // imprevistos: como mucho uno por día real
      { id: 'gotera', name: 'Gotera', w: 3, npc: 'sobrina', cond: '…', once: false,
        text: 'Lo que te cuenta quien lo lleva.',
        options: [
          { text: 'Pagar el arreglo', cost: 4000, result: 'Lo que pasa.', effect: { boost: { mult: { all: 1.2 }, days: 3, label: 'Establo seco' } } },
          { text: 'Que espere', result: '…', effect: { boost: { mult: { all: 0.85 }, days: 2, label: 'Gotera' } } },   // siempre una opción gratis y sin cond
        ] },
      // effect: money (a la caja), items: [{ id, n }], boost, set: { 'flag.x': true }, happy: 10 (a los Pokémon que trabajan)
    ],
  },
}
```

**Reglas de economía (el validador avisa de lo gordo):**

- El dinero del jugador es un **sumidero** antes que una fuente: entrar y mejorarlo todo cuesta de 150 000 a 400 000 ₽; una mejora se amortiza en 8–20 días reales. Lo valioso son los **objetos** que produce (cosas difíciles de conseguir de otra forma) y las **escenas**.
- Producción de objetos: enteros por día para lo común (leche, bayas), fracciones para lo raro (0,1–0,3/día).
- Nada que rompa la curva: Caramelos Raros como mucho 0,15/día por negocio.
- Cada negocio tiene 2–4 líneas, 5–8 mejoras, 2–3 encargados posibles (con voz propia: son personajes que ya conoce el jugador) y 5–8 imprevistos escritos con la voz del encargado. Los imprevistos son el sitio para el humor y para que el mundo se mueva.
- Un bloque posterior puede **ampliar** un negocio repitiendo su id en `ventures`: las listas (mejoras, imprevistos, encargados) se suman y los objetos (líneas, jobs) se mezclan.
- Los Pokémon que trabajan salen del PC o del equipo y vuelven cuando el jugador quiera; ganan amistad. `owns()` los cuenta; `inParty()` no.

**Mejoras cruzadas (2026-10-28):** un negocio puede rendir más si el jugador es socio de otro que lo abastece: `synergy: [{ from: '<idNegocio>', line?: '<línea del otro>', min?: 10, mult: { <línea|all>: 1.15 }, label, desc }]`. Activa si es socio de `from` y (con `line`) le dedica al menos `min` % de esfuerzo. Para ampliar un negocio de otro bloque, repite su id en `ventures` con solo `synergy`. Se ve en la pantalla del negocio («Con tus otros negocios») y en el desglose.

**Sinergias dinámicas (2026-10-30, motor en `app/js/negocios.js`, prueba `herramientas/test/sinergias-test.mjs`):**

- **Suministro real (no automático):** cada enlace `synergy` tiene un deslizador (0–100 %, de 10 en 10) que elige el jugador en la ficha del negocio o en Plantilla › Red de negocios. Ese % de la línea `line` del proveedor (o de todo, si no hay `line`) deja de producirse para el jugador y llega a un depósito del negocio que depende (como mucho 2 días). Con `need` % (30 por defecto) la mejora rinde entera; con menos, a medias. **Si el proveedor tiene el almacén lleno** (no se recoge a tiempo) o no dedica `min` % a esa línea, no manda nada y el otro rinde menos. Partidas de antes: los enlaces que ya rendían arrancan al 30 % (se avisa en el registro del negocio).
- **Cadenas:** días seguidos con la mejora rindiendo ≥ 50 % → nivel 1/2/3 a los 3/7/14 días (+5/+10/+15 % a todo el negocio que depende). Si se descuida, baja a la mitad de ritmo.
- **Pedidos entre encargados** (`pedidos: [{ id, to, from, npc?, cond?, item, n, text, thanks, boost? }]`): cada 3 días reales sale uno (si eres socio de los dos y, con `npc`, si esa persona está al frente de `to`), con la voz de quien pide. Se sirve con objetos de la mochila (que se producen en `from`) durante 3 días; servirlo da un empujón temporal (`boost`, como mucho +30 %). Si caduca, no pasa nada.
- **Imprevistos compartidos** (`sharedEvents: [{ id, ventures: [a, b], managers?: { a: npc, b: npc }, npc, name, text, w, options }]`): salen en cualquiera de los dos negocios cuando están al frente los encargados que tienen historia; el efecto (`boost`, `happy`) llega a los dos. Siempre una opción gratis.
- **Mapa de la red** en Plantilla: nodos (dorado = tuyo) y flechas verdes (activa) o grises (apagada); al tocar un enlace, qué le falta y su deslizador.
- Nada imprime dinero: lo que se manda sale de la producción del proveedor y los empujones son temporales (la prueba compara 10 días con y sin red).

## 14. Radio Lavanda

> Pedido de Mario, 2026-10-28. Motor en `app/js/radio.js`, pantalla en Más › Radio Lavanda (sale en cuanto el jugador ha pisado Pueblo Lavanda).

Cada día real el juego arma un programa de 4 piezas entre las que cumplen su `cond` (orden: clima, noticia, dedicatoria, noticia, consejo, música). Mismo día, mismo programa; lo oído hace poco pierde prioridad, y las piezas con `cond` pesan el doble que las genéricas.

```js
radio: [
  { id: 'rl_rancho_adela', kind: 'noticia', cond: 'flag.b03_rancho_sobrina', text: 'Lo que dice la locutora ({jugador}, {o|a|e} valen).' },
  { id: 'rl_ded_hector', kind: 'dedicatoria', from: 'Héctor', cond: 'flag.p7_hector', text: '…' },
  // kind: 'noticia' | 'dedicatoria' | 'consejo' | 'musica' | 'clima'; w: peso opcional
],
```

- Las piezas **solo comentan lo que el jugador ya vivió**: nada de spoilers ni de secretos que aún no sabe.
- Cada bloque nuevo añade 4–8 piezas sobre sus grandes decisiones (con una variante por rama).
- Mantén siempre al menos 6 piezas sin `cond`, para que el programa nunca salga vacío.

## 15. Buzón: ecos de decisiones y encargos

> Pedido de Mario, 2026-10-29. Motor en `app/js/correo.js`, pantalla en `app/js/ui/correo-ui.js` (Más › Buzón).

Cartas, periódicos, visitas y encargos que **llegan días reales después** de algo que el jugador vivió. Una pieza «se entera» la primera vez que su `cond` se cumple y llega `days` días después. Como mucho llega **una pieza cada 20 h** (las que esperan hacen cola por antigüedad), con un aviso y la marca «sin abrir» en Más › Buzón.

```js
mail: [
  { id: 'eco_b03_rancho_jugador', kind: 'carta', from: 'Adela', npc: 'sobrina', title: 'Noticias del rancho',
    cond: 'flag.b03_fin && flag.b03_rancho_jugador', days: 2, item: 'cartaecorancho' },        // objeto con `read`
  { id: 'enc_x', kind: 'encargo', from: '…', title: '…', cond: '…', days: 3, item: 'cartaencx', script: 'enc_x_carta' },
  // kind: 'carta' | 'periodico' | 'visita' | 'encargo'. Al abrirla: se lee el objeto (si hay) y luego se juega el guion (si hay).
]
```

- **Ecos:** solo comentan lo que el jugador ya vivió; variantes por rama con `cond` excluyentes. Nunca adelantan trama.
- **Encargos:** el guion de la carta empieza la misión (`{ quest, stage }`) y los spots que la cumplen van en zonas ya visitadas con `new` y `cond` sobre la etapa. La misión lleva `type`, `est` (y `parts` si se reúnen cosas) y se cierra al terminar (`done: true`). Recompensa modesta.
- El guion de una carta puede abrirse más de una vez: protégelo con su flag (`cond` en las ramas) para que no regale dos veces.

**Plantilla (2026-10-30):** Más › Negocios › Plantilla enseña a todos los Pokémon trabajando (aporte, amistad), el encargado y los puestos libres de cada negocio, con su **guía** (tipos ideales de `jobs.types`, favoritos ⭐ de `jobs.favs` y qué produce). «Sugerir» propone el mejor candidato por puesto libre del PC y del equipo (nunca el de cabeza ni el compañero; siempre deja uno en el equipo). La ficha de cada Pokémon dice «Dónde rendiría». **Cada encargado lleva un solo negocio**: si eliges a uno que está al frente de otro, ese otro vuelve a su encargado de siempre (el primero libre de su lista `managers`).

## 16. Fotografía

> Pedido de Mario, 2026-10-29. Motor en `app/js/foto.js`, enfoque y Álbum en `app/js/ui/foto-ui.js`, contenido en `app/content/b06/t11-fotos.js`.

La **Cámara de la Gaceta** (`camara`, se la da Alexia en Luminalia desde `flag.b04_fin`) permite fotografiar **momentos raros**: un Pokémon salvaje haciendo algo inusual en una ruta ya visitada, a cierta hora, día o estación.

```js
photos: { snorlax_hojas: { sp: 'snorlax', loc: 'ruta7', title: '…', caption: '…', pay: 1400, gift: [{ id: 'mysticwater', n: 1 }] } },
// spot (en un tramo de ruta): cond: 'has("camara") && foto("snorlax_hojas") < 3 && (night)', new: '… && !foto("snorlax_hojas") && …'
// guion: [{ text: '…' }, { photo: 'snorlax_hojas', level: 1-3, onWin: [ … ], onLose: [ … ] }]
// venta:  { photoSell: true, onSale: [ … ], onNone: [ … ] }
```

- Sin minijuego (Mario lo pidió quitar, 2026-10-30): la interfaz devuelve siempre 3 estrellas. El enfoque sigue en `ui/foto-ui.js` por si se recupera, pero no se usa. Sin estrellas no hay foto (se puede repetir). Una foto con más estrellas sustituye a la anterior.
- La Gaceta paga 60 / 80 / 100 % de `pay` según las estrellas (y la diferencia si mejoras una ya vendida). `gift` solo la primera vez. Pagos modestos: 1 000–1 600.
- `foto("id")` en condiciones = estrellas de esa foto (0 si no la tienes). Quedan en Diario › Rotom › 🎞️ Fotos.
- Sin sprites en el repo: la foto se compone con el sprite que el móvil ya descarga.

## 17. Expediciones

> Pedido de Mario, 2026-10-29. Motor en `app/js/expedicion.js`, pantalla en `app/js/ui/expedicion-ui.js` (Más › Expediciones). No necesita contenido propio.

Se manda un Pokémon **del PC** (no del equipo ni de los negocios) a una **ruta visitada con puntos de recolección**; hasta 3 a la vez, de 4, 8 u 12 h reales. Vuelve con 2 objetos por cada 4 h sacados de los `gather` de esa ruta (lo común; rara vez una entrada `rare`), una bitácora procedural de 2–3 líneas, amistad (+10 por cada 4 h) y algo de experiencia (como mucho un nivel). Nunca dinero. Mientras está fuera no está en su caja (`owns()` lo cuenta). **Cada `gather` nuevo en una ruta amplía lo que traen las expediciones**: revisa que sus tablas no regalen nada que rompa la curva.

## 18. Carreras de monturas

> Pedido de Mario, 2026-10-30. Motor en `app/js/carreras.js`, pantalla en `app/js/ui/carreras-ui.js`, circuitos en `app/content/b06/t12-carreras.js`. Prueba: `herramientas/test/carreras-test.mjs`.

Un circuito por región con monturas, contra **3 rivales con nombre** (personajes que el jugador ya conoce). Se corre por tramos: en cada uno el jugador elige camino. Cada montura va más rápida o más lenta según el terreno (`MOUNTS[x].spd`) y solo algunas abren ciertos **atajos** (`need`: Rhyhorn `roca`, Lapras `agua`, Aerodactyl `cielo`; las de alquiler `monte`, `barro`, `bosque` o ninguno). Los caminos con `jump` se juegan con un toque a tiempo (calidad 0–3).

```js
races: {
  kalos: { name, region, loc: 'boceto', host: 'jinete_boceto', icon, cond, blurb,
    rent: ['gogoat'],                              // monturas de alquiler del circuito (siempre hay alguna)
    rivals: [ { npc: 'rhi', mount: 'gogoat', pace: 1.01, start, ahead, behind, win, lose } ], // pace < 1 = más rápido
    tramos: [ { name, text, paths: [ { label, terrain: 'llano', len: 10 }, { label, terrain: 'roca', len: 8, need: 'roca' }, { label, terrain: 'llano', len: 9, jump: true } ] } ],
    prize: { first: [{ id, n }], win: [{ id, n }…], podium: { id, n }, record: { id, n } } },
}
// guion: { race: 'kalos', onWin: [...], onLose: [...] }  (sin interfaz la corre sola)
```

- Todo tramo tiene un camino sin `need`. Premios **modestos y en objetos**: el de estreno, uno de victoria como mucho cada 20 h, uno de podio cada 20 h y otro al batir el récord. Nunca dinero.
- Récord y victorias en `G.races[id]`; el motor pone `flag.carrera_<id>_ganada` al ganar.
- Equilibrio (lo comprueba la prueba): con la montura de la región y saltos perfectos se gana casi siempre; sin saltar, nunca; de alquiler, a veces.

## 19. Rival que aprende

> Pedido de Mario, 2026-10-30. Motor en `app/js/rival.js`, guiones en `app/content/b06/t13-rival.js`. Prueba: `herramientas/test/rival-test.mjs`.

- **Uso en combate:** al acabar cada combate (salvo torneos), cada Pokémon tuyo que salió a luchar suma +1 en `G.uso[uid]` (+2 contra entrenadores). `topUsed(3)` da los tres más usados que sigues teniendo.
- **Bruna** aparece como sitio dinámico (como los Pokémon únicos) en una ciudad o pueblo visitado de la región donde estás, cuando `hitos() >= G.rx.next` (2 al principio; +2 tras cada victoria tuya). Si pierdes, se queda con el mismo equipo para la revancha.
- **Equipo:** `buildRival()` elige especies evolucionadas y no legendarias que llevan los tipos que más daño hacen a tus tres más usados y aguantan los suyos; movimientos legales de su aprendizaje (nivel, MT, tutor). As = tope − 2 + reto (máximo tope + 1); tamaño según hitos (balance §4.2), +1 desde el reto 2.
- **Reto:** si le ganas 3 veces seguidas con el mismo equipo, sube (`G.rx.tier`, 0–3): mejor IA, más nivel, más IV y más pociones.
- **Comandos de guion:** `{ rival: 'saludo' }` (frases que recuerdan los combates anteriores), `{ rival: 'prep' }` (pone el equipo en `rx_bruna`), `{ rival: 'gana' | 'pierde' }` (apunta el resultado y comenta). Antes del combate el guion cura siempre (`{ heal: true }`).

## 20. Cuadrante (juego de cartas)

> Pedido de Mario, 2026-10-30. Motor en `app/js/cartas.js`, pantalla en `app/js/ui/cartas-ui.js` (partida y Más › Cuadrante), rivales en `app/content/b06/t16-cartas.js`. Prueba: `herramientas/test/cartas-test.mjs`.

Juego propio del mundo (nada de nombres ni reglas de juegos registrados). Tablero de 3×3; cada jugador, 5 cartas. Cada carta es un Pokémon con 4 valores de 1 a 10 sacados de sus stats base (`round(stat / 13)`): **arriba PS, derecha el mayor ataque, abajo la mayor defensa, izquierda velocidad**. Al poner una carta, cada vecina del rival se gira si tu valor de ese lado es **mayor** que el suyo enfrentado; si el tipo principal de tu carta es eficaz contra la otra, tu valor cuenta +1. Sin capturas en cadena. Gana quien tenga más cartas al llenarse el tablero (tablero + la que quede en la mano). Ganar da **una carta del mazo del rival, a elegir**, y la primera vez sus premios; perder no quita nada. Nunca dinero.

```js
cardPlayers: {
  lum_philippe: { npc: 'philippe', loc: 'luminalia', champion: true, cond: '…',
    level: 3, max: 4, every: 1,            // IA 1 azar · 2 la que más gira · 3 cuida lo expuesto · 4 mira 3 jugadas; sube 1 cada `every` derrotas tuyas hasta `max`
    deck: ['mrmime', 'meowstic', 'klefki', 'furfrou', 'delphox'],   // exactamente 5
    prize: [{ id: 'bottlecap', n: 1 }],    // solo la primera victoria
    win: '…', lose: '…', draw: '…' },      // lo que dice al acabar (win = gana el rival)
}
// guion: { cards: 'lum_philippe', onWin: [...], onLose: [...], onDraw: [...], onQuit: [...] }   (onQuit: si te levantas a mitad; sin interfaz juega sola)
// guion: { cardStarter: true }   sobre de inicio, una vez: las especies de tu equipo (hasta 5) + comunes hasta 8
```

- Un **campeón por ciudad grande** ya visitada, con nombre y voz que el jugador ya conoce; los aficionados pueden ser genéricos. El que te enseña primero da el sobre (`flag.cq_sobre`).
- El motor pone `flag.cartas_<id>_ganada` la primera vez que le ganas. Colección y mazo en `G.cards`.
- El validador comprueba mazos de 5 especies reales, niveles 1–4, NPC, lugar y premios.

## 21. Casos de detective

> Pedido de Mario, 2026-10-30. Motor en `app/js/casos.js`, pantalla en `app/js/ui/casos-ui.js` (caso y Más › Casos), casos en `app/content/b06/t17-casos.js` (soluciones en `secreto/bloques/p15-casos.md`). Prueba: `herramientas/test/casos-test.mjs`.

Un compañero fijo (Mauro Quintana, `quintana`) comenta cada pista y **reclama** si acusas mal. Pantalla del caso con cuatro pestañas: **Registrar** (sitios), **Preguntar** (preguntas y «Enseñarle una pista»), **Libreta** y **Acusar** (a quién y **qué pista lo prueba**). Primer error: Quintana reclama y sigues; segundo: el culpable **se escapa** (queda en Más › Casos; no bloquea nada). Se puede dejar a medias y volver.

```js
cases: { det_c1: { name, loc, partner: 'quintana', rep: 10, brief,
  clues: { k: { name, icon, text, partner } },
  places: [ { id, label, sub, icon, text: [...], gives: ['k'], needs: ['k0'] } ],
  suspects: { s1: { npc, role, questions: [ { id, q, a: [...], gives, needs } ], present: { k: { a: [...], gives } }, presentDefault: [...] } },
  culprit: 's2', proof: ['k5'], objection: { culpable: [...], prueba: [...] }, hurry, again,
  solution: [ { who, t } ], escape: [ { who, t } ], prize: [ { id, n } ] } }
// guion: { case: 'det_c1', onSolve: [...], onFail: [...] }   (sin interfaz lo resuelve solo)
```

- **Justos:** la prueba comprueba que todas las pistas (y las de `proof`) se alcanzan desde cero, que la prueba no está a la vista en el primer registro y que enseñar una pista a alguien destapa algo. Nada sobrenatural como solución; nada de la trama principal.
- El motor pone `flag.<id>_resuelto` o `flag.<id>_fallido`, guarda la reputación de detective en `G.casos.rep` y da `prize` al resolver.
- Llegan escalonados por el Buzón (`mail` con `cond` sobre la carta anterior y `days ≥ 2`).

## 22. Historias por capítulos (seriales)

> Pedido de Mario, 2026-10-30 («pueblo maldito por capítulos»). Motor en `app/js/capitulos.js` (y `serialOpen` en `state.js`); primer serial: **Pueblo Cirio** (`app/content/b06/t18-cirio.js`, plan de los capítulos siguientes en `secreto/bloques/p16-cirio-plan.md`). Prueba: `herramientas/test/capitulos-test.mjs`.

Un capítulo por **semana real**: el capítulo *n* se abre `gap` días (7) después de que el jugador termine el *n−1*, y solo si ya está escrito (`written`). Lo que hizo el jugador se guarda en flags normales y el capítulo siguiente los lee.

```js
serials: { cirio: { name: 'Pueblo Cirio', loc: 'pueblo_cirio', gap: 7, written: 1,
  chapters: [ { n: 1, title: 'La nana' }, { n: 2, title: '…' }, … ] } }
// guion: { chapter: { id: 'cirio', done: 1 } }    termina el capítulo (una vez) y dice cuándo llega el siguiente
// guion: { chapter: { id: 'cirio', wait: true } }  solo dice cuándo llega
// cond:  capitulo('cirio', 2)  ·  capituloHecho('cirio', 1)
```

- **Para escribir el capítulo n+1:** añade su contenido con `cond: "capitulo('cirio', n+1)"` (spots, `onEnter`), sube `written` y cierra con `{ chapter: { id, done: n+1 } }`. Lee el plan y los flags del capítulo anterior; no reescribas lo publicado.
- Entre capítulos, un spot con `capituloHecho(id, n) && !capitulo(id, n+1)` deja hablar a un vecino y corre `{ chapter: { id, wait: true } }`.
- El validador avisa si un capítulo escrito no tiene quién lo termine.
