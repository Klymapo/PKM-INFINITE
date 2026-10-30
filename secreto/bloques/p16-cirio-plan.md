# P16 · Pueblo Cirio: historia por capítulos (2026-10-30)

> Pedido de Mario (2026-10-30): «pueblo maldito por capítulos». Un capítulo por semana real (`gap: 7`).
> Archivo: `app/content/b06/t18-cirio.js` (parte del bloque 6). Motor: `app/js/capitulos.js`, formato en `docs/CONTENIDO.md` §22.
> **Nada de la trama principal:** ni Lemnis, ni Fisuras, ni Puertas, ni Rotom/Diario, ni legendarios. Ningún Pokémon regalado.
> Tono: inquietante y tierno, nunca gore. Humor solo de personaje (Consuelo, Abril). Johto, al este de Ciudad Malva.

---

## 1. La verdad (solo aquí; se revela en los capítulos 3–5)

**Elías Arnau**, el cerero (76 años ahora), **no está muerto**. Vive desde hace diez años en el **islote de la Garza**, en mitad del lago, en la vieja caseta del guardapesca.

- **Hace once años** le diagnosticaron una enfermedad de la memoria. Empezó a olvidar recetas, nombres, el camino a casa. Le daba más miedo que el pueblo le viera olvidar que olvidar.
- **La noche de la última Velada** (hace diez años) le pidió a **Don Hilario**, el barquero, que lo llevara al islote con la vela grande y lo dejara allí. «Que crean que el lago me llevó. Así me recordarán entero». Hilario volvió solo, dijo «volví solo» y lo ha repetido diez años. **Es verdad, y no es toda la verdad.**
- Desde entonces, **Hilario rema cada madrugada al islote** con pan, pescado y noticias del pueblo (los «remos de madrugada»). Le cuenta todo a Elías aunque Elías lo olvide al día siguiente. Por eso la cesta tapada de su barca siempre huele a pan.
- **Pabilo**, el **Misdreavus** de Elías (con él desde niño, de la Torre Quemada de Iris: Elías hacía las velas de la torre y del gimnasio; por eso Morti escribe «lo que hay allí me conoce»), se quedó con él. Pabilo canta la **nana** que Elías cantaba al meter los pabilos en la cera.
- **Por qué empezó ahora:** el faro llevaba seis años apagado (desde que murió Ginés Lucero). En la Velada, **el faro girando despacio era la señal** para encender las velas. Hace un mes **Abril lo reencendió**. Elías, cuya memoria ya está muy gastada, ve la luz barrer el lago y su cabeza vuelve cada noche a **«la noche de la Velada»**: graba velas para las casas tal como las recuerda **hace diez años** (de ahí «Faro · Ginés»), y Pabilo hace lo que hacía en las Veladas: va a cada casa a buscar «algo de los suyos» para atarlo a la vela, cantando, y deja las velas en el muelle. Las gotas de cera van al agua porque Pabilo vuela sobre el lago.
- **La parte tierna del giro:** Elías enciende velas por los vivos porque es **él** quien los ha perdido. El pueblo cree que él es el muerto; él cree que el pueblo lo es.
- **Por qué a Hilario nunca le falta nada:** es el único al que Elías ve cada día; el único que no «ya no está». Pabilo lo conoce y no entra en su casa.
- **La vela del jugador** («{jugador}, de parte de Morti»): Hilario lee cada tarde la pizarra de Consuelo cuando trae el pescado para la cena («2 truchas. H.») y esa misma madrugada se lo cuenta a Elías. Es la **única vela al día**: prueba justa de que alguien del pueblo pasa noticias.
- **Benigna** (68) es la hermana pequeña de Elías. Llevaba las cuentas de la cerería; nunca aprendió el **nudo de Arnau** (trenza de tres con nudito en la punta), que solo sabía Elías. Las velas lo llevan.

Nada sobrenatural salvo lo que hace un Misdreavus de verdad (cantar de noche, asustar sin querer, mover cosas con su poder psíquico, flotar). Ninguna muerte nueva: Ginés murió hace seis años, de viejo, fuera de plano.

### Pistas plantadas en el capítulo 1 (justas)

| Pista | Dónde | Apunta a |
|---|---|---|
| A Hilario nunca le falta nada; «no tengo nada que valga» | `cirio_hilario_1` | Hilario está fuera del ritual |
| Cesta tapada con pan en la barca de Hilario; «hoy no hay a quién» | `cirio_hilario_1`, `cirio_hilario_gen`, `cirio_espera_guardia` | Lleva comida a alguien |
| «Lo llevé al islote. Volví solo. Diez años diciéndolo.» | `cirio_hilario_1` (opción) | Frase ensayada |
| Pizarra de La Mecha: «{jugador}, de parte de Morti» y «2 truchas. H.» | `cirio_pizarra` | Hilario lee la pizarra cada tarde |
| La vela del jugador lleva exactamente la frase de la pizarra | `cirio_velas` | El que graba sabe lo de ayer (Abril lo dice en voz alta en `cirio_decision`) |
| «Faro · Ginés»: el nombre de hace seis años; nadie graba «Abril» | `hojafaro`, `cirio_abril_1` | Quien graba recuerda el pueblo antiguo |
| Cuaderno del faro: faro encendido el día 1, primera vela el día 7 | `hojafaro` | El faro lo desencadenó |
| Cartel de la Velada: «cuando el faro empiece a girar despacio… El lago se las llevará hasta el islote» | `cartelvelada` | Faro = señal; islote |
| Gotas de cera que siguen **sobre** el agua; forma pequeña con collar de cuentas rojas | `cirio_aparicion` | Un Misdreavus (cualquier fan lo reconoce) |
| Luz en mitad del lago que se apaga | `cirio_aparicion`, `cirio_guardia` | Alguien en el islote |
| Remos de madrugada | `cirio_guardia` (solo rama guardia), rumor del muelle | Hilario |
| Pabilo trenzado con nudo | `pabilocirio`, `velacirio` | Mano de Elías (cap. 2) |
| Benigna: «Por fuera, cualquiera la imita. Por dentro, no. Las he partido. Son suyas.» | `cirio_benigna_1` | Es Elías, no un imitador |
| Morti: «Lo que hay allí me conoce» | `cartacirio` | Un Pokémon fantasma de Iris |

---

## 2. Lugares, NPCs y flags (publicados en el capítulo 1)

**Lugares** (todos con `mapNote`, `descNight` y `rumors`):
- `senda_cirio` · Senda de Cirio (ruta, Johto, 6 tramos, niebla). `links: ['malva', 'pueblo_cirio']`, `hidden`/`enterCond: flag.b04_fin`. Entrada en Malva: spot «El camino del lago» (`patches.malva`, `new: !visited("senda_cirio")`) y la salida simétrica.
- `pueblo_cirio` · Pueblo Cirio (town, `map: {84, 60}`). `descs` según la decisión del cap. 1.
- Sub-lugares (`parent: 'pueblo_cirio'`, con spot `go`): `posada_cirio` (Posada La Mecha), `muelle_cirio` (muelle, campana, velas, pesca), `faro_cirio` (faro), `cereria_cirio` (cerería de los Arnau, cerrada).
- **Pendiente para capítulos siguientes:** `islote_cirio` (islote de la Garza, sub-lugar; se entra en barca) y, en el cap. 2, el interior de la cerería (ya existe el lugar; se añaden spots con `cond`).

**NPCs nuevos** (voces):
| id | Quién | Voz |
|---|---|---|
| `consuelo` | Consuelo Ibarra, ~55, posadera de La Mecha | Habla mucho y deprisa; «mi vida», «¡ay, no!», «¡ándale!»; da de comer para todo; su Furret le roba la silla |
| `hilario` | Don Hilario, ~78, barquero | Frases de tres palabras; habla del tiempo («va a levantar a las once») para no hablar de otra cosa; nunca «no sé»: «el lago sabrá» |
| `abril` | Abril Lucero, ~31, farera (antes ingeniera en Trigal), nieta de Ginés | Escéptica, irónica, contesta con preguntas; apunta todo; «las pruebas no se rezan»; ternura escondida con el abuelo. Pokémon: Lanturn |
| `benigna` | Benigna Arnau, ~68, hermana del cerero | Usted, frases exactas, vocabulario de cera («la cera se enfría como la gente: de fuera hacia dentro»); barre un escalón limpio; certeza: «es él» |
| (canon) `morti` | Carta del Buzón | Frases cortas, intuiciones honestas |
| (sin retrato aún) Elías Arnau, ~76 | El cerero | Amable, despistado, muy educado; canta; confunde épocas. Retrato procedural en el cap. 4 (`elias`) |

Entrenadores genéricos de la senda: `cirio_herminia` (Médium, obligatoria, 52–53), `cirio_damaso` (Pescador, opcional, 53), `cirio_celedonio` (Sabio, opcional, 53–54). Tope a esa altura: 56 (`b04_fin`).

**Flags del capítulo 1:**
- `cirio_carta` (carta de Morti leída), `cirio_llegada`, `cirio_t_consuelo`, `cirio_t_hilario`, `cirio_t_abril`, `cirio_t_benigna` (`vars.cirio_testigos` 0–4), `cirio_noche`, `cirio_velas`, `cirio_rastro_visto`, `cirio_rastro`, `cirio_c1_fin`.
- **Decisión (excluyentes):** `cirio_c1_costumbre` (encendió su vela y la dejó en el muelle; la vela ya no está en la mochila) · `cirio_c1_prueba` (se la guardó: objeto `velacirio` en la mochila) · `cirio_c1_guardia` (se la dio a Abril, guardia en el faro: vio la luz del islote y oyó remos; Hilario lo sabe).
- Objetos: `cartacirio` (read), `cintaposada`, `velacirio`, `pabilocirio`, `hojafaro` (read), `cartelvelada` (read). Premio: Hechizo + Piedra Noche.
- Minijuegos: `cirio_senda_bayas` (cosecha, diaria), `cirio_muelle` (pesca, diaria), `cirio_rastro_cera` (rastreo con Riolu/Lucario, guion; sin él, a pie y sin botín extra).

---

## 3. Capítulo 1 · «La nana» (publicado, ~1 h)

1. **Buzón:** carta de Morti (`cirio_carta`, cond `flag.b04_fin && visited("iris")`, 1 día) → misión `cirio_c1` en `ir`. Se puede llegar sin carta (Consuelo dice que escribió a Morti y que «no contesta ni a su madre»).
2. **Senda de Cirio** (6 tramos): médium obligatoria, pescador y sabio opcionales, bayas con cosecha, vela encendida en un mojón «Por los de la senda» (`cirio_mojon`, marca dorada).
3. **Llegada** con cinemática (niebla, velas en todas las ventanas, campana que suena sola, Consuelo con farol y cucharón; {riolu} escucha si va en el equipo). Misión → `vecinos`.
4. **Cuatro testimonios** (`parts`): Consuelo (dedal de su madre; ata la **cinta** al jugador; lo apunta en la pizarra), Hilario (a él no le falta nada; lo llevó al islote y volvió solo), Abril (encendió el faro; a la semana, velas; «Faro · Ginés»; da la hoja del cuaderno), Benigna (tijeras de pabilo; receta de la casa; da el cartel de la última Velada). Misión → `noche`.
5. **La primera noche** en la posada (cinemática): la nana, {riolu} en la ventana con el aura, por la mañana falta la cinta. Cura al equipo. Misión → `muelle`.
6. **El muelle:** fila de velas; la del jugador con la frase de la pizarra y la cinta atada. Benigna pasa lista; Hilario: «Esa es nueva». Gotas de cera → `rastro`.
7. **Rastreo** con {riolu} (aura, nivel 2, garantiza el pabilo) o a pie. **Aparición** (cinemática): las gotas siguen sobre el agua, la nana, una forma pequeña en silueta con collar de cuentas rojas, {riolu} la saluda con el aura, huye hacia una luz en mitad del lago que se apaga. → `vela`.
8. **Decisión** en el muelle con los cuatro presentes (cada uno defiende una cosa). Cierre: Hechizo (Benigna), Piedra Noche (Abril), desayuno (Consuelo). Misión hecha. `{ chapter: { id: 'cirio', done: 1 } }`.
9. **Entre capítulos:** spot «La plaza, al caer la niebla» (`capituloHecho('cirio', 1) && !capitulo('cirio', 2)`), con Benigna (costumbre), Abril (prueba) o Hilario (guardia), y `{ chapter: { id: 'cirio', wait: true } }`. Cada vecino tiene además su `_despues` según la rama.

Cinemáticas: 3 (llegada, noche, aparición). Riolu/Lucario: llegada, noche, rastreo y aparición.

---

## 4. Capítulos siguientes (plan)

Cada capítulo: misión propia `cirio_cN` (`type: 'side'`, `est`, etapas ≤ 240 caracteres con lugar en negrita, `parts` si se reúne algo), que se **cierra** al terminar; `{ chapter: { id: 'cirio', done: N } }` al final; spot de espera `capituloHecho('cirio', N) && !capitulo('cirio', N+1)`; subir `written` en `serials.cirio`. Duración meta: 45–75 min cada uno.

### Cómo arranca el capítulo 2 (NO está en el código)

```js
// En pueblo_cirio.spots (vía extraSpots o editando t18-cirio.js; los ids publicados no se tocan):
{ label: 'Benigna, en la puerta de la cerería', sub: 'La persiana está subida', icon: '🕯️',
  cond: "capitulo('cirio', 2) && !" + "done.cirio_c2", new: '!flag.cirio_c2_inicio', talk: [
	{ cond: '!flag.cirio_c2_inicio && flag.cirio_c1_costumbre', script: 'cirio_c2_inicio_costumbre' },
	{ cond: '!flag.cirio_c2_inicio && flag.cirio_c1_prueba', script: 'cirio_c2_inicio_prueba' },
	{ cond: '!flag.cirio_c2_inicio', script: 'cirio_c2_inicio_guardia' },
	{ script: 'cirio_c2_benigna_gen' },
] },
// + mail opcional (sin días de espera extra): { id: 'cirio_c2_aviso', kind: 'carta', from: 'Consuelo Ibarra', npc: 'consuelo',
//   title: 'Ha vuelto a cantar', cond: "capitulo('cirio', 2)", days: 0, item: 'cartaconsuelo1' }
// En serials.cirio: written: 2. El spot de espera del cap. 1 deja de verse solo (capitulo('cirio', 2) ya es true).
```

### Capítulo 2 · «Cera trenzada» (~50 min)

**Qué pasa.** Una semana después. La nana sigue cada noche, pero **ya no falta nada en el cuarto del jugador** si encendió su vela (Hilario se lo contó a Elías: «ya tiene su vela»). Benigna, por primera vez en diez años, **abre la cerería de verdad**: quiere comparar las velas del muelle con las que dejó su hermano.

**Lee del cap. 1:**
- `cirio_c1_costumbre`: al llegar, en la almohada del cuarto del fondo, la **cinta** vuelve con una vela diminuta nueva grabada «Gracias» (Elías responde a la vela encendida, como en la Velada). Benigna te recibe con la persiana subida: «Usted hizo lo que se hacía. Le debo enseñarle lo que no se enseña». Abril, picada, va por su cuenta.
- `cirio_c1_prueba`: Benigna te pide la vela (`velacirio`) «para partirla». Si se la das, ve el **nudo de Arnau** por dentro y se le cae el alma: «Esta la ha hecho una mano viva. Los muertos no tiemblan así». Si no se la das, la comparación la hace Abril con su lupa y Benigna se entera de segunda mano (escena más fría). Variable `vars.cirio_benigna` (−1/+1).
- `cirio_c1_guardia`: arranca en el **faro**: Abril tiene dos noches de luz en el islote y una tercera; quiere ir. Hilario se niega a prestar la barca («El islote no es sitio. Hay garzas.»). Benigna no quiere saber nada del islote («allí lo perdimos»).

**Desarrollo:**
1. **Interior de la cerería** (spots nuevos en `cereria_cirio` con `cond` del cap. 2): velas tapadas con sábanas, moldes de latón, el caldero. **Minijuego `lock`** (nivel 3, tema `caja`): el arcón de moldes de Elías, con la combinación de la nana (las runas se encienden al ritmo de la nana; Benigna tararea). Dentro: el **libro de recetas** (`read`: recetas de cera, el nudo de Arnau dibujado, y en las últimas páginas la letra empeora: listas de nombres repetidas, «no olvidar: Benigna, Hilario, Ginés, Consuelo…», «hoy no encontré la tienda»). **Pista fuerte** de la enfermedad, sin decirlo.
2. Faltan del arcón los **moldes de letras** (los que se usan para grabar nombres): se los llevaron hace diez años.
3. **Segunda noche:** el jugador hace guardia en la posada (o en el faro con Abril, si `cirio_c1_guardia`). La nana entra. **Encuentro con Pabilo**: `wild: { sp: 'misdreavus', lv: 54, noCatch: true }, canRun: true`, combate breve en el que **no se puede capturar** (es de alguien) y que acaba con `onRun`/`onWin` igual: Pabilo huye llevándose un **botón de la chaqueta del jugador** (o nada si `cirio_c1_costumbre`: Pabilo solo deja una gota de cera en la almohada y canta más bajo). Riolu/Lucario: escena de aura en la que siente **pena, no maldad** y una segunda presencia lejos, **humana, cansada**.
4. **Decisión del capítulo 2** (a Benigna, en la cerería, de noche, encendiendo la lámpara de su hermano — **cinemática**):
   - «La mano que hizo esta cera estaba viva» → `cirio_c2_vivo` (Benigna llora; quiere ir al islote ya; pide guardar el secreto a Consuelo).
   - «Puede que sea él, de la forma que sea; no lo sé» → `cirio_c2_duda` (Benigna se lo agradece; sigue esperando).
   - No decir nada del nudo y dejar que crea en el fantasma → `cirio_c2_calla` (Benigna enciende por primera vez una vela en la ventana de la cerería: lo da por muerto. **Esto pesa en el cap. 5.**)
- Cierre: `cirio_c2_fin`, premio (Tela Terrible o MT de tipo Fantasma de las que ya existan en tiendas: comprobar), `chapter done: 2`.
- **Minijuegos:** `lock` (arcón), recolección nueva: «Las colmenas del pinar» (`catch`, tema `bosque`, miel y cera; Combee silvestres de Johto en árboles de golpe). **NPCs:** Benigna (eje), Consuelo (café y nervios), Abril (análisis), Hilario (evita la cerería; cruza la plaza dando un rodeo).
- **Cinemática:** Benigna enciende la lámpara de su hermano en la cerería (time noche, actores Benigna + Pokémon del jugador, `push` sobre la llama, `heartbeat` en la frase que duele).

### Capítulo 3 · «Luz en el agua» (~60 min)

**Qué pasa.** El jugador va al **islote de la Garza** (nuevo sub-lugar `islote_cirio`).

**Lee:**
- Cómo cruzar: si `cirio_c1_guardia` → Abril ya tiene un plan (la barca vieja de Ginés, que lleva arreglando una semana: **puzle de rejilla** corto de calafatear tablas o minijuego `dig` de quitar el barro del casco); si `cirio_c2_vivo` → Benigna paga a Hilario para que os lleve, Hilario acepta con cara de piedra y **rema despacio a propósito** (no quiere llegar); si no → el jugador puede ir con una **montura de agua** si la tiene (comprobar `flag.mount_*` del juego) o con la barca de Ginés.
- `cirio_c1_prueba` + vela entregada en el cap. 2: Benigna viene con vosotros.
- Si `cirio_c2_calla`: Benigna no viene; se queda «velando».

**Desarrollo:**
1. **Cruce en la niebla:** minijuego `fish` de guion (tema `lago`, nivel 3) como «remar sin perder el rumbo» o pesca real con un Gyarados que puede picar (combate opcional). Riolu orienta con el aura si va en el equipo.
2. **El islote:** garzas (Noctowl y Murkrow posados), colmenas de Combee, una caseta con chimenea. Dentro: **cientos de velas** grabadas con los nombres de las casas de Cirio, todas de hace diez años en adelante; un catre; una **foto de Benigna joven** clavada en la pared. Moldes de letras. **Nadie.** Pabilo vigila desde la viga y canta.
3. **Hallazgo humano:** en la orilla del islote, amarrada con el nudo de Hilario (el mismo que en el muelle, pista del cap. 1), una **cesta con pan de hoy**. Abril lo ve en voz alta si está («Esto es pan de Consuelo. Y ese nudo lo hace una sola persona en este lago»).
4. **Pabilo** se deja ver entero: no ataca; se pone delante de una cortina. Riolu/Lucario se sienta y espera (escena de aura). Detrás, un cuaderno de Elías (`read`: frases cortas, días que se repiten, «hoy H. dice que hay alguien nuevo de parte de M. Grabarle vela»). La letra es la misma que la de las velas.
5. **Decisión:** volver y enfrentarse a Hilario ya (`cirio_c3_hilario`) · esperar en el islote al alba para ver quién viene (`cirio_c3_esperar`) · dejar las velas como estaban y no tocar nada (`cirio_c3_respeto`: Pabilo se lo agradece; a la mañana siguiente, el jugador tiene en la mochila una vela pequeña con «gracias por no tocar»).
- Cierre: `cirio_c3_fin`, premio modesto (Miel ×3, Perla Grande), `chapter done: 3`.
- **Minijuegos:** cruce (`fish` o `dig` del casco) y la cosecha de las colmenas del islote (`catch`, diaria desde aquí).
- **Cinemática:** llegada al islote (niebla que se abre, `pan-up` a la caseta con humo, Pabilo en silueta en la viga; si es de noche, las velas encendidas todas a la vez).

### Capítulo 4 · «Lo que calla el lago» (~60 min)

**Qué pasa.** Al amanecer llega Hilario con la cesta. Se revela todo.

**Lee:**
- `cirio_c3_esperar`: el jugador está en el islote cuando Hilario atraca. Hilario se queda quieto, deja la cesta y dice «Va a levantar a las once». Luego habla. Confesión en el islote.
- `cirio_c3_hilario`: la confesión es en el muelle, de noche, con la campana; Hilario está enfadado y asustado («Diez años. Diez. Y viene alguien de Iris con una cinta azul»).
- `cirio_c3_respeto`: Hilario lo sabe (Elías le contó que «alguien no tocó nada») y es **él quien te busca** en la posada: «Usted no tocó nada. Entonces puede verlo».
- `cirio_c1_guardia`: Abril estuvo apuntando los remos; la confesión la escucha ella también, y le pide perdón a Hilario por haber encendido el faro (Hilario: «Hiciste bien. La luz es para eso»).

**Desarrollo:**
1. **La confesión de Hilario** (diálogo, no cinemática): la enfermedad, la promesa, los diez años de remos. Por qué no se lo dijo a Benigna: «Me lo pidió con las dos manos».
2. **Elías:** aparece de la caseta. Muy amable, despistado. Confunde al jugador con «el de las velas de la Torre de Iris» (Morti joven) y luego con «el nieto de Ginés». Riolu/Lucario: **escena de aura** (cinemática): el aura enseña al jugador lo que Elías siente: no miedo, una calma rota a trozos; Elías dice «Este pequeño ve como Pabilo». Elías **canta la nana entera** (la letra completa, nueva estrofa).
3. **Minijuego `aura`** (nivel 2–3, tema `ruina`): ayudar a Elías a encontrar «la caja de los nombres» que perdió en el islote (dentro: las tijeras de Benigna, el dedal de Consuelo, la llave de Ginés, el botón…: todo lo que Pabilo cogió; se devuelve en el cap. 5). Sin Riolu: la busca Pabilo y el jugador lo sigue (variante a pie).
4. **Decisión grande** (anunciada con claridad: cambia el cap. 5):
   - **Contárselo a Benigna** aunque Hilario lo prometió (`cirio_c4_contar`): Hilario no te lo impide; se queda en la barca, solo.
   - **Que lo decida Hilario** (`cirio_c4_hilario`): le das tiempo; Hilario te pide un día «para buscar las palabras».
   - **Traer a Benigna sin decirle a qué** (`cirio_c4_sorpresa`): arriesgado (Elías puede no reconocerla); Consuelo te ayuda a convencerla.
- Cierre: `cirio_c4_fin`, `chapter done: 4`. Premio: MT de tipo Fantasma o Hechizo extra (comprobar que la MT tenga forma de conseguirse ya; no regalar Pokémon).
- **NPC nuevo:** `elias` (Elías Arnau, retrato procedural: pelo blanco largo, delantal de cera, gafas de culo de botella, manos manchadas). Mínimo 3 escenas en caps. 4–5 y epílogo.
- **Cinemática:** el alba en el islote, Elías y Pabilo en la orilla, la nana, `iris-out` sobre Pabilo.

### Capítulo 5 · «La Velada» (~75 min, cierre)

**Qué pasa.** El pueblo celebra la **Velada** por primera vez en diez años. Clímax tierno.

**Lee:**
- `cirio_c4_contar` / `cirio_c4_sorpresa` / `cirio_c4_hilario`: cómo se entera Benigna y en qué estado llega (rabia y alivio / conmoción / Hilario se lo dice él, la escena más dura y más bonita: los dos viejos en el muelle).
- `cirio_c2_calla`: Benigna había encendido la vela de su hermano «por muerto»; ahora tiene que **apagarla** delante de todos (escena propia; Consuelo le coge la mano).
- `cirio_c1_costumbre`: tu vela del muelle se usa para encender la primera de la Velada. `cirio_c1_prueba`: devuelves tu vela y la enciendes tú. `cirio_c1_guardia`: Abril hace girar el faro despacio, como la señal de antes (frase: «Ahora sí sé para qué sirve»).
- `b03_aurelio_muerto` (B3): el jugador puede poner una vela por **Don Aurelio** (y, si lleva a Candela en el equipo, `bond('candela') > 0`, ella se queda mirándola). Opcional, sin texto que lo fuerce.

**Desarrollo:**
1. **Preparativos** (con `parts`): devolver lo que se llevó Pabilo (dedal, tijeras, llave, botón, cinta…) a cada casa; ayudar a Benigna y Elías a hacer las velas en la cerería (**puzle de rejilla**: colocar los moldes en el orden de la nana, o `catch` de cera en el caldero); Consuelo hace chocolate (humor).
2. **Morti llega** (canon, `morti`): «Ya no se esconde. Lo noto». Pabilo lo reconoce; Morti y Elías se saludan como viejos amigos («Te hice velas cuando eras así de alto»). Morti da al jugador algo pequeño (no Pokémon).
3. **La Velada** (**cinemática** grande, 6–8 frames): faro girando despacio, todo el pueblo en el muelle, velas en el agua, Pabilo canta y Elías canta con él; Benigna canta la segunda voz. Elías no la reconoce del todo, pero sabe la letra con ella. Riolu/Lucario con aura sobre el agua (`ripple`).
4. **Decisión final** (sobre Elías, con él presente; todas válidas):
   - Que vuelva a la cerería con Benigna y Pabilo (`cirio_c5_casa`): la cerería reabre; vela en la ventana encendida «por los vivos».
   - Que se quede en el islote y el pueblo lo visite (`cirio_c5_islote`): Hilario ya no rema solo; turno de visitas.
   - Que lo decida Benigna (`cirio_c5_benigna`).
- Cierre: `cirio_c5_fin`, `chapter done: 5`. **Pieza del museo** de Philippe (sala de Johto ya existe: `museo_sala_johto`): «Una vela con el nudo de Arnau», cartela según `cirio_c5_*`. Carta de Morti en el Buzón días después (eco). Si se quiere repetir: evento anual «Velada del Lago» (por ejemplo, el **primer sábado de noviembre**, fuera del rango de Día de Muertos) con variaciones por año y por `cirio_c5_*`.
- Al acabar el 5, `waitText` dice que Pueblo Cirio descansa (no hay capítulo 6 escrito).

### Capítulo 6 (opcional) · «Lo que se queda» (epílogo, ~30 min)

Solo si a Mario le gustó. Meses después (o al cumplirse un año de la partida): Elías empeora un poco; Benigna lleva la cerería con Abril de socia; se abre un **negocio** (`ventures`: Cerería Arnau; líneas: velas → dinero, miel → Miel, cera → objetos de Fantasma raros a 0,1/día; encargados: Benigna, Consuelo, Abril; imprevistos con la voz de cada uno; Pabilo puede trabajar allí si el jugador tiene un Misdreavus/Mismagius: `works('misdreavus')`). Ninguna muerte en escena. Si se escribe, añadir `{ n: 6, title: 'Lo que se queda' }` a `chapters`.

---

## 5. Reglas para quien escriba los capítulos siguientes

- **No renombrar ni borrar** nada de lo publicado en `t18-cirio.js` (ids, flags, objetos, guiones). Solo añadir.
- Cada capítulo sube `written` y añade su spot de arranque con `capitulo('cirio', N)`. El spot de espera del capítulo anterior se apaga solo.
- Los Pokémon de Elías/Pabilo **no se capturan** (`noCatch: true`) ni se regalan.
- Mantener la regla de las 3 apariciones: Elías (caps. 4, 5 y epílogo o eco), Morti (carta, cap. 5, carta final).
- Sin nada de la trama principal. Sin Rotom: las reacciones de compañero son de {riolu} (aura) y, si va en el equipo, de Candela.
- Cada capítulo: 1 cinemática, 1–2 minijuegos, 1 objeto para leer como mínimo, una decisión con flags excluyentes, premio modesto.
