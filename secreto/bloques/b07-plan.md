# BLOQUE 7: "ACTO VI · EGO" (plan detallado)

> **Región:** Galar (nueva, `galar`, mapa 100 × 140). Lugares: **Pueblo Par** (Puerta Lemnis de Galar en la **estación**, laboratorio de **Sonia**) · **Ruta 2** y la casa de la **Prof. Magnolia** · **Área Silvestre (sur)**: Pradera Radiante, Lago Axew, nidos → **Ciudad Pistón** (Estadio de Pistón, estación, la calle de los talleres, la taberna de curri, las calderas) · tren a **Pueblo Plié** y el **Bosque Lumirinto** (la **Casa de las Siete Puertas**, opcional) · **Ruta 3** → **Mina de Galar** → **Ruta 4** → **Pueblo Hoyuelo** (casa de Rhi, **Estadio de Hoyuelo**: Percy) · tren a **Pueblo Crampón** (el **Torneo de los Villanos**) · **Área Silvestre (norte)**: Valle Entrepuentes, Cuenca Polvorienta → **Ciudad Artejo** (Estadio de Artejo: Roy; Cornisa de Artejo; **Planta Eléctrica** = Nodo 06).
> **Comprobado (2026-10-30, WikiDex):** Pueblo Par, Ciudad Pistón, Pueblo Hoyuelo, Pueblo Plié, Pueblo Crampón, Ciudad Artejo, Ciudad Puntera, Pueblo Yarda, Pueblo Amura, Pueblo Ladera, Pueblo Auriga · Área Silvestre (Pradera Radiante, Arboleda Claroscuro, Lago Axew, Ojo de Axew, Lago Milotic, Silla del Gigante, Antigua Atalaya, Ribera de Pistón, Valle Entrepuentes, Llanura Pétrea, Espejo del Gigante, Cuenca Polvorienta, Gorro del Gigante, Lago del Enfado, Cornisa de Artejo) · Bosque Lumirinto, Bosque Oniria · Torre Rose (en Puntera) · Planta Eléctrica (Artejo) · «Incursión Dinamax», «nido Pokémon» · Líderes: **Percy** (Planta), **Naboru** (Fuego), **Sally** (Hada), **Nerio** (Siniestro), **Roy** (Dragón) · campeón **Lionel** · **Olivia** · **Macrocosmos** (una palabra; el B3 dice «Macro Cosmos» en dos textos: corregir con un parche cuando se toque esa zona) · Team Yell. **Sin comprobar:** «Prof. Magnolia» (se usa así) y «Mina de Galar».
> **Duración meta:** **~15 h** (pedido de Mario) en seis tramos. `hours: 15` en `index.js`.
> **Inicio:** tras `flag.b06_fin`. Mario terminó el B6 en el Centro Pokémon de **Ciudad Teja** o anda por Teselia, Alola, Kanto, Kalos o Johto. `comun.js` pone el enganche «🏟️ La Gira: convocatoria para Galar» (guion `b07_inicio`, ya escrito) en `teja`, `porcelana`, `mayolica`, `esmalte`, `fayenza`, `puerta_teselia`, `hauoli`, `puerta_alola`, `azafran`, `puerta_azafran`, `luminalia_plaza` y `puerta_trigal`.
> **Flag final:** `b07_fin`. **Aviso de ritmo:** `b07_m_aviso`, al entrar por primera vez en `artejo` (inicio de T5; quedan ~3 h).
> **Prefijo de ids:** `b07_` en flags, misiones y guiones de historia. Rutas con nombre que choca: `gal_ruta2`, `gal_ruta3`, `gal_ruta4`.
> **Escrito:** 2026-10-30 (paso 1 del B7, sin Mario: las decisiones abiertas están en §14).

## 0. Lo que pasa, en una frase por tramo

| Tramo | Archivo | Qué pasa | Duración |
|---|---|---|---|
| T0 | `t0-par.js` | **La estación.** Se cruza por cualquier Puerta y se sale a un andén mojado de **Pueblo Par**. El Diario escribe la llegada según la rama del Eco (§4). Recepción de la Gira en la estación: **Sonia** (anfitriona de Galar), **Odile** (la de la Copa Luminalia, ahora inscribe a los novatos de la Gira: 3.ª aparición) y **Rhi**, que lleva una hora en el andén con una pancarta. Mensaje de **Philippe**: **Lucien** no está en la portería desde la noche en que la Puerta «zumbó a las 2:18» (`vars.lucien_viaje = 1`; Philippe se queda la garita). **Ruta 2** → la casa de la **Prof. Magnolia**: la **Maximuñequera** tras una prueba en un punto de energía del lago (cinemática 1: el primer Dinamax de {riolu} o del Pokémon que elija Mario). **Sobble** llora en el lago cuando llueve (pesca). Con `b06_eco_doble`, Ansel escribe: le presenta a «una vieja colega» que lleva una central en Artejo. | ~2 h |
| T1 | `t1-piston.js` | **El marcador.** **Área Silvestre (sur)**: el tiempo cambia cada media hora, nidos con Dinamax salvaje, un **Dubwool Tera Fantasma** de Fisura, zona de entrenamiento en un nido (premio **MT Ala Bis**) → **Ciudad Pistón**. **Apertura de la Temporada** en el Estadio de Pistón con **Lionel**: Renata emite en directo con **Nico** y la **Tía Rosa**; **Mireille** calienta a los novatos; el Musical de Mayólica, de gira, hace el espectáculo del descanso (**Tadeo**). **Segundo acto del Apuntador**: el marcador del estadio responde a Renata en mitad del directo (§5). **Grookey** en la calle de los talleres. Se abre la **Liga de los Siete Oficios** (opcional, §5d) con **Priya**, **Agnes**, **Naboru** y **Gaspar**. Trenes de la estación a Plié (T2) y, más tarde, a Crampón (T4). | ~2 h 15 (+1 h 30 de Oficios, opcional) |
| T2 | `t2-casa.js` | **La Casa de las Siete Puertas** (opcional, desde el final de T1). **Quintana** escribe: en **Pueblo Plié**, al fondo del **Bosque Lumirinto**, siete visitantes juran que entraron ocho a la Casa; el registro dice siete; esa noche desapareció la llave de la Séptima Puerta. Testigos con `parts`, la Casa por dentro puerta a puerta, **Sally** de testigo, sospecha de Ditto/Zoroark que se descarta con pruebas, y acusación con el motor de casos. Misterio cerrado y justo (§5b). | ~1 h 45 |
| T3 | `t3-hoyuelo.js` | **La delantera.** **Ruta 3** → **Mina de Galar** (**Petra** y los fósiles que no encajan) → **Ruta 4** → **Pueblo Hoyuelo**. Casa de Rhi: su padre **Gareth**, la cena, el estadio donde cuidó el césped veinte años y que vendieron «a un socio que no sale en ningún sitio». **Nate**. Negocio nuevo: **El Campo de los Hargreave** (§10). Zona de entrenamiento en las terrazas (premio **Meganiumita**). **Scorbunny**. De noche, **Rhi te reta en el césped del estadio vacío** (cinemática 2: Cinderace Gigamax). **Percy** (Planta, Dinamax) → Medalla Planta. | ~2 h 15 |
| T4 | `t4-crampon.js` | **Los que pagan.** Tren a **Pueblo Crampón**. **Handsome** y **Nerio**: en un sótano del pueblo se juega un **torneo clandestino de exmiembros de organizaciones criminales** (§5c). Tres vías para averiguar quién lo paga (combate, personal, dinero; dos bastan, y fallar abre otra). **Lola** (confesión), **Kaori** (caramelos), **Bastien** (rama `rompe`), **Xero** de anfitrión con careta. El **libro de cuentas** (decisión pequeña). El último mensaje de **Noa**: «emplazamiento 06». | ~2 h 15 |
| T5 | `t5-artejo.js` | **Ego.** **Área Silvestre (norte)** → **Ciudad Artejo** (aviso de ritmo). **Roy** (Dragón, Gigamax) → Medalla Dragón. La **Planta Eléctrica**: **Magda**, **Lucien** encontrado, **Noa abre las jaulas desde dentro** (pérdida del Acto VI, cinemática 3), **Olivia** (jefa), **Eternatus** despierta (cinemática 4; capturable y único), **Octavia Lemnis** en persona descubre el drenaje: **gran decisión** (§6). **A.Z.** en la muralla al amanecer. Llamadas de **Sera** y **Lila**. La Gira anuncia **Sinnoh** (Acto VII). | ~2 h 30 |

**Orden:** T0 → T1 → T3 → T4 → T5 es el camino principal. T2 (Casa) se abre con `b07_t1_hecho` y es opcional; la Liga de los Siete Oficios (dentro de T1) también. T3 se abre con `b07_t1_hecho` (la Ruta 3 sale de Pistón). El tren a Crampón (T4) se abre con `b07_t3_hecho`. El Área Silvestre (norte) se abre con `b07_t4_hecho`.

**Suma:** 2 + 2:15 + 1:30 + 1:45 + 2:15 + 2:15 + 2:30 = **14 h 30** (las dos secundarias grandes suman 3 h 15 y se pueden dejar para después).

## 1. Curva de niveles

Al empezar el B7 el tope es **68**. El B7 da **dos medallas** del Circuito (Planta y Dragón) y sube el tope hasta **74** (`balance.md` §3: +6 por bloque). Mismo patrón que el B6: el as de cada jefe va 1 por encima del tope del tramo y su victoria sube el tope.

| Tramo | Salvajes | Entrenadores | Jefe | Tope |
|---|---|---|---|---|
| T0 Par, Ruta 2 | 64–67 | 65–68 | — (la prueba de la Maximuñequera es un `wild` de práctica `noCatch`, nv 66, Dinamax) | 68 |
| T1 Área Silvestre (sur), Pistón | 65–68 | 66–69 | — (Naboru opcional, `naboru_oficio`, amistoso, as 69, cura antes) | 68 |
| T1 Nido de la Pradera (entrenamiento) | — | 66–68 | — | tope de zona **69** |
| T2 Bosque Lumirinto, Plié, la Casa | 66–68 | — (Sally opcional, `sally_quiz`, as 69, amistoso) | — | 69 |
| T3 Ruta 3, Mina, Ruta 4, Hoyuelo | 66–69 | 67–69 | **Rhi** (`rhi_7`, opcional pero de hilo, 6 Pokémon, as **70** Cinderace con `gimmick: 'dynamax'` y `gmax: true`, 2 objetos, cura antes) · Nate opcional (`nate_1`, as 69) · **Percy** (`percy_g`, Planta, 5 Pokémon, as **69** Eldegoss con `gimmick: 'dynamax'`, 2 objetos) | 68 → **70** |
| T3 Terrazas de Hoyuelo (entrenamiento) | — | 67–69 | — | tope de zona **70** |
| T4 Crampón, Ruta 9 (afueras) | 67–70 | 68–70 | Torneo: rondas `torneo_r1`…`r3` (69–70), opcionales con Mega `torneo_flare` (Mega-Pyroar 70) y `torneo_aqua` (Mega-Sharpedo 70), `lola_torneo` (as 70), `bastien_8` (rama `rompe`, Mega-Greninja 70) · **final** `torneo_final` (jefe de trama, 5 Pokémon, as **71**, 2 objetos, sin mecánica) | 70 → **72** |
| T4 Callejón de Crampón (entrenamiento) | — | 68–70 | — | tope de zona **71** |
| T5 Área Silvestre (norte), Artejo | 68–71 | 69–72 | **Roy** (`roy_g`, Dragón, 5 Pokémon, as **72** Duraludon con `gimmick: 'dynamax'` y `gmax: true`, 2 objetos) · **Olivia** (`olivia_1`, jefa de trama, **6** Pokémon, as **73** Garbodor Gigamax como «demostración», 2 objetos; `lose: 'continue'` con revancha) · **Eternatus** (`wild`, 72, capturable, único) | 72 → **73** (Roy) → **74** al final |
| T5 Cornisa de Artejo (entrenamiento) | — | 69–71 | — | tope de zona **72** |

**Respuestas claras:** Percy (Planta: Eldegoss, Flapple, Appletun, Shiftry, Abomasnow…) → **Fuego, Volador, Hielo, Bicho**: el Aerodactyl, el Aurorus y el Typhlosion/Delphox de Mario; Scorbunny del propio tramo. Rhi (Cinderace, Corviknight, Sirfetch'd, Toxtricity, Falinks, Grimmsnarl) → **Lucario** contra Corviknight no; **Eléctrico** (Candela) contra Corviknight y Cinderace no-Agua; **Psíquico/Volador** contra Sirfetch'd y Falinks. Torneo (Siniestro/Veneno/Fuego/Agua mezclados) → variedad; Lucario aguanta lo Siniestro. Roy (Duraludon Acero/Dragón, Flygon, Goodra, Turtonator, Sandaconda) → **Lucha y Tierra** contra Duraludon (**Lucario brilla**), **Hielo** (Aurorus) y **Hada** contra los dragones. Olivia (Froslass, Milotic, Salazzle, Tsareena, Copperajah, Garbodor) → **Tierra, Fuego, Eléctrico**; Lucario es inmune al Veneno de Garbodor. Ningún muro Fantasma + Volador + Psíquico sin respuesta.

**Mecánicas en el enemigo:** el jugador recibe el Dinamax en T0, antes de cualquier jefe con Dinamax (balance §4.8). Una mecánica por combate. Gigamax de enemigos con `gmax: true` en el miembro del equipo (comprobar en el paso 5 que `toSimSet` lo pasa a los rivales; si no, motor).

## 2. Decisiones de bloques anteriores que se recogen (cada una se tiene que notar)

| Decisión | Dónde | Cómo se nota |
|---|---|---|
| **Qué hiciste con el Eco** `b06_eco_purgado` / `reformado` / `doble` | Todo el bloque (Diario), T0, T5 | §4. *purgado:* Rotom habla corto, sin exclamaciones; Lemnis está ciega: en T0 un agente de Lemnis te sigue en persona por el andén (le ve Rhi, que «marca» a los defensas), y en T5 Olivia llega a la Planta antes que tú porque no sabe por dónde vienes. *reformado:* cada entrada termina en «*(Omitido: nada.)*»; el Eco ayuda una vez en la Planta (se sabe los planos de Lemnis: atajo a las jaulas). *doble:* Ansel escribe en T0 (presenta a Olivia, «una vieja colega») y en T5 tras la pérdida («Qué pena lo de la señora Lambert»); en T5 eliges si el Diario cuenta dónde está Noa o no (cambia por dónde entra la seguridad de Olivia; **no** cambia que Noa muera, §6). |
| **El Apuntador** `b06_apuntador_vencido_1`, `b06_noria_antes`, `b06_cinta_ep3`, `b06_chamota_emitido` | T1 | La carta 4 abre citando el primer acto («Ganaron ustedes. Lo reconozco porque me gusta perder bien»). Con `b06_cinta_ep3`, Renata ha traído la cinta del episodio 3 en la mochila y no explica por qué. Con `b06_noria_antes`, Nico dice que esta vez «viene con el horario aprendido». |
| **Renata** `af.renata`, `b06_renata_grabadora`, `b06_renata_diario` | T1 | Directo desde Pistón. Con `af.renata >= 70` (Confidente), su petición importante (§7). |
| **Bastien** `b06_bastien_metro` + `bastien_7` (rama `rompe`) / `b06_bastien_sujeto` + `b06_bastien_sale` / `b06_bastien_firma` (rama `sigue`); `b01_bastien_cubierto` (leal) | T4 (rompe), T5 (sigue y las dos) | *rompe:* luchador de alquiler en el torneo, sin saber quién paga; al saberlo, se rompe. *sigue + firma:* trabaja en la Planta por contrato (14.6); te escribe «Ven». *sigue + sale:* llega a Artejo por su cuenta, siguiendo a Noa. **Leal:** llega a tiempo de las últimas palabras de Noa. **Resentido:** sin querer, le dijo a la seguridad de la Planta dónde estaba Noa («buscaba a una tal Lambert»); corre a salvarla y no llega (biblia §9.2). |
| **Kaori** `b06_kaori_frio`, `b06_kaori_momento`, `af.kaori`, `b06_bot_*` (botica) | T4 | Sigue el lote de Caramelos Lazo hasta el torneo: a los Pokémon de los luchadores se los dan antes de la final. Antídoto, siguiente paso. Momentos por afinidad (§7). |
| **Lola** `lola_3` (Lavanda), `b02_t_lola` en `espera` | T4 | Su confesión (giro propuesto en `registro.md`, Publicación 6). Cierra `b02_t_lola` y abre y cierra `b07_t_lola`. Si `!flag.lola_3` (no la conoció en Lavanda), es una exrecluta más del torneo que te reconoce del carrito de Trigal o de Caoba; si no la conoce de nada, una recluta veterana sin pasado contigo (la confesión se queda para quien la conozca). |
| **El topo → Camille** `b06_camille_estadio`, `b06_lebrun_*` | comun (Buzón) | Postal desde Pistón (`b07_eco_camille`, ya escrita). |
| **Chamota** `b06_testigo_ines`, `b06_chamota_*` | comun (Buzón) | Carta de Inés con líneas de Celia y Teodoro (`b07_eco_ines`, ya escrita). |
| **Terrón** `b05_terron_estribo` | comun (Buzón) | Carta de Kalena: Kekoa usa el estribo y Terrón evoluciona (`b07_eco_terron`, ya escrita; 3.ª aparición de Kalena y Kekoa). |
| **Zorua** `b06_zorua` | T2 | Si llevas a Zorua, medio Plié sospecha de **tu** Zorua: se descarta con fechas (llegaste a Galar después). |
| **Reshiram** `b06_reshiram_tuyo` | T5 | Si va en el equipo, se gira hacia Eternatus antes que nadie. Una línea. |
| **Lucien** `vars.lucien_viaje`, `flag.b05_atico_lucien`, `b01_lucien_chespin` | T0, T5 | Contrato de `hilos.md`: T0 pone `vars.lucien_viaje = 1` (se va de la portería y de los encargados del ático; Philippe lo retoma). T5 lo encuentra en las jaulas y pone `vars.lucien_viaje = 0`. Con Chespin (`b01_lucien_chespin`), Chespin está con él y es lo que le ha protegido. |
| **Serafina** `sera_reconciliada`, `sera_canal_abierto`, `SERA_ENFADO` (`b06/t10-serafina.js`) | T5 | Llama tras la decisión de Octavia (es su madre). Con `sera_canal_abierto` o `sera_reconciliada`, por el Holomisor y de «tú» si `sera_tu`; regada, no llama: Octavia la menciona («mi hija no me coge el teléfono; tampoco a usted, imagino»). Primer uso de `sera_canal_abierto` (pendiente del lector del 2026-10-30). |
| **Magda** `b04_magda_*` | T5 | La han traído a «cuadrar» las cifras del Nodo 06. Sus cuentas no le salen; con la libreta que te dio en el B4, te las enseña. Abre una puerta. Segundo bloque de Magda. |
| **Olmedo** `b06_olmedo`, `b06_damaso_olmedo` | T5 | Llamada: el panel de las jaulas «es primo del Arco II»; él explica cómo se abre y por qué desde dentro. Segundo bloque de Olmedo. |
| **Leilani** `af.leilani`, `b05_leilani_*` | T1 | Llamada corta: el Ride Gear y los Corviknight taxi de Galar («¿un pájaro de acero que lleva una caja? ¿Sí o qué?»). Opcional. |
| **Colección** `b05_*`, `b06_*` iniciales y fósiles | — | No repetir líneas ni Megapiedras (`owns()`, `grep -rn "ite'" app/content`). |

## 3. Hilos que avanza (≥3) y el nuevo

| Hilo | Tramo | Qué pasa |
|---|---|---|
| **Tronco: el Nodo 06 y la presidenta** | T4, T5 | El dinero del torneo sale de una **fundación fantasma** («Fundación Horizonte») con transferencias firmadas «Dirección (Ω)» y una casilla «Presidencia: no». Lleva a la **Planta Eléctrica de Artejo**: Nodo 06, el que drena a **Eternatus** (que duerme debajo, canon). Olivia lo dirige para Lemnis «para terminar lo que empezó el presidente Rose: energía para mil años». **Octavia descubre el drenaje** (biblia §3.5 y §9.2) y se pasa de lado. |
| **Las jaulas (Noa)** | T4, T5 | Su último mensaje (T4) y **su pérdida** (T5, §6). Pistas ya plantadas: B1 (etiquetas «Destino: por asignar»), B5 («Ya sé contar»), B6 («¿Cómo se abre una jaula desde dentro?», «emplazamiento 06»). Se cierra el hilo. |
| **Desde la concha (Apuntador)** | T1 | Segundo acto en un estadio (§5). Tercer acto «en casa» (teatro, B8). |
| **La delantera (Rhi)** | T0, T3 | Su casa, su padre, su miedo a ser «del montón», Macrocosmos (el estadio vendido). Cinderace Gigamax (candidatas: «Gigamax en el Acto VI»). |
| **La arrepentida (Lola)** | T4 | La confesión que prometía `b02_t_lola` («algún día te dará la receta de verdad»). La «fundación generosa» que pagó fianzas hace 20 años es la misma de hoy. |
| **Letra pequeña (Bastien)** | T4/T5 | §2. |
| **Dulce veneno (Kaori)** | T4 | §2. Siguiente paso del antídoto. |
| **El novato perdido (Lucien)** | T0, T5 | Desplazado por una Fisura (Acto VI, `hilos.md`); se le encuentra. Nunca muere un niño (biblia §9.1.6). |
| **El recetario (Gaspar)** | T1 | Rival de cocina en Galar: **Priya** y su curri. Gaspar descubre la **Sopa Maxi** (Gigamax, §8). |
| **Lo que no crece (Terrón)** | comun | Cierre por carta (§2). Pieza nueva en la sala de Alola del museo (§11). |
| **La flor eterna (A.Z.)** | T5 | Aparición del Acto VI. |
| **Lucario** | T5 | No hay sueño de aura en este bloque (los sueños eran B4–B6). Durante Eternatus se oye un aullido desde el Bosque Oniria; el aura de {riolu} contesta como si conociera la voz (semilla de Zacian/Zamazenta y de los «guardianes», sin nombrarlos). |
| **NUEVO: La presidenta** (`b07_t_octavia`) | T5 | Octavia Lemnis, de cara pública de Lemnis a aliada. La gran decisión del bloque decide desde dónde ayuda (§6). Sigue en el Acto VIII (Sera, «La heredera») y en el IX. |

## 4. El Diario en el B7 (biblia §3.5 y §7)

Ya no quedan pistas del Eco por plantar (`registro.md`, B6). **El motor no adapta solo las entradas nuevas a la rama** (pendiente del lector del 2026-10-30): **cada `diary` del B7 se escribe tres veces**, con sus `cond`:

```js
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';     // Rotom de verdad: frases cortas, alguna falta, sin «¡Bzzt!»
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado'; // la voz de siempre, completa, y al final: *(Omitido: nada.)*
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';          // alegre e incompleta, como antes: lo lee Lemnis
```

- **Con `doble`**, en dos momentos (T0 llegada y T5 la Planta), un `choice` de Rotom: «¿Esto se lo contamos?». Contarlo o no cambia una línea posterior (T0: el agente que te espera en el andén; T5: por dónde entra la seguridad). Flags `b07_doble_cuenta_t0` / `b07_doble_calla_t0`, `b07_doble_cuenta_t5` / `b07_doble_calla_t5`.
- **La pérdida de Noa en el Diario:** *purgado:* «Hoy se ha ido Noa. No sé escribirlo. Lo intento mañana.» (y al día siguiente, una entrada de tres líneas). *reformado:* la entrada completa y verdadera, y debajo «*(Omitido: nada.)*» … y una segunda línea, la única vez en el juego: «*(Omitido: que me habría gustado conocerla mejor.)*». *doble:* la entrada amable que leerá Lemnis, y Rotom: «Esta… ¿esta también se la contamos?».
- **Omisiones del Diario (todas las ramas):** no menciona la cara de Xero bajo la careta ni el nombre de la fundación hasta que Octavia lo dice en voz alta.

## 5. Desde la concha (II): el segundo acto, en el Estadio de Pistón (T1)

Contrato del B6 (`b06-encargo.md`): el Apuntador **solo sabe lo que se dijo en antena**, lee **horarios públicos**, usa un **Chatot que repite retales** y paga **mensajeros de una sola vez**. Nada de omnisciencia.

- **El montaje:** en la Apertura de la Temporada, Renata hace un directo especial desde la grada de prensa. A mitad del directo, el **marcador gigante** del estadio, en la franja de «mensajes de la afición», empieza a contestarle: «¿SEGURA, SEÑORITA CASTELLANOS?», «ESO NO LO DIJO EL MARTES», y una frase que parece responder a algo que Renata acaba de decir hace un minuto.
- **El mecanismo (comprobable):** los mensajes de la afición se compran **días antes** en la ventanilla del estadio y se programan **al minuto**. El orden de la Apertura (la **escaleta**) está **colgado en el tablón público** del estadio: «18:05 · Casos Fríos (directo) · el Circuito y sus misterios». El Apuntador escribió sus mensajes con lo que Renata dijo en los últimos directos de los martes y los programó para el minuto exacto de su intervención. La frase «de hace un minuto» es una que Renata repite en todos los directos («Nota para el episodio: aquí hay gato encerrado»): **no la adivinó, se la sabe**.
- **Pistas justas:** (1) la escaleta del tablón (`read`), (2) el recibo de la ventanilla: «12 mensajes · pagado en efectivo · hace cinco días · ventanilla 3», con la firma «Desde la concha» y la «e» borrada, (3) Nico reconoce que la frase «de hace un minuto» sale en 31 episodios, (4) el último mensaje programado (18:40) aún no ha salido.
- **Cómo gana Mario el segundo acto** (opcional, fallar no bloquea): si reúne (1)+(2) antes de las 18:40, compra en la ventanilla el **último hueco libre** (18:39) y escribe la respuesta (un `choice` con tres frases; las tres valen) → `b07_apuntador_vencido_2`, af.renata +5. Si no, sale el mensaje de las 18:40: «SEGUNDO ACTO PARA MÍ. EL TERCERO, EN CASA.» → `b07_apuntador_gana_2`. En las dos, carta 4 (`cartaapuntador4`, `read`) dejada en la cabina de prensa por un mensajero pagado (un chaval del Team Yell con una gorra, que solo sabe que le pagaron en efectivo).
- **Tadeo Lis** (2.º bloque): el Musical de Mayólica está de gira por Galar y hace el espectáculo del descanso. Tadeo saluda a Renata con cariño, sabe el nombre de Nico y pregunta por la tos de la Tía Rosa. **Coartada de horario otra vez**: estaba en el foso del escenario durante los mensajes. Pero los mensajes estaban programados: **la coartada no sirve de nada**, y Mario puede apuntarlo (`b07_coartada_rota`, una línea en la libreta del Expediente: `intel`). Nadie le señala. No se revela quién es.
- **Chatot** (pista suave): en el vestíbulo del estadio, un Chatot del Musical «se sabe la escaleta» y la recita.
- **Tercer acto** (B8, no aquí): «en casa» = el teatro del Musical de Mayólica. La cinta del episodio 3 (`b06_cinta_ep3`) y la madre de Tadeo.

## 5b. La Casa de las Siete Puertas (T2): el misterio, con la solución

> Idea de ChatGPT aprobada por Mario: ocho viajeros recuerdan haber entrado juntos; el registro dice siete. **Misterio cerrado y justo; Ditto y Zoroark solo como sospecha, nunca como solución.** Aplicada además la idea «la misión que fracasa bien».

**La Casa:** al fondo del Bosque Lumirinto, a media hora de Plié. La construyó un cuentacuentos, **Edmund Vane** (fallecido hace diez años), como un cuento: **siete puertas por fuera**, cada una con un color y un nombre (Primera, de la Entrada; … Sexta, del Jardín; Séptima, del Final), y **siete salas** por dentro que se recorren en orden, una prueba por sala. **Ottilie Brack** la compró hace diez años y la convirtió en «mazmorra para visitantes»: se entra por la Primera, se **firma en el registro**, cada visitante se pone una **capa gris de la casa** (hay siete), y al final Ottilie abre la Séptima con la **Llave de la Séptima** (latón, grande) y lee «el final» sentada en el sillón de Edmund.

**Lo que pasó** (hace tres semanas, noche de niebla): en la **Sala Sexta** («la Oscuridad») los faroles se apagan sesenta segundos, como siempre. Al volver la luz, la llave ya no estaba en el gancho del cinturón de Ottilie. La Séptima no se abrió. La Casa está cerrada desde entonces y Ottilie, arruinada. La aseguradora de Relieve tiene la llave asegurada como pieza histórica: **Quintana** (el perito de los casos de detective) va a Plié y pide ayuda al jugador por el Buzón (`mail` con `cond: 'flag.b07_t1_hecho'`, `days: 1`).

**Los siete visitantes** (genéricos con `as`, de un solo caso, como los sospechosos de `t17-casos.js`): Lark y Robin Abbot (recién casados), Pip (un niño con un **Ditto**) y su abuela Hester, Fen (excursionista), Clive (fotógrafo) y Dee (hincha del Team Yell). **Todos dicen «éramos ocho».**

**La verdad:** la octava persona era **Maren**, la recolectora de setas, **nieta de Edmund** (lleva el apellido de su madre; en el pueblo nadie lo relaciona). No entró por la Primera: entró por la **Puerta Sexta (del Jardín)**, «la que nadie usa», cuyo pestillo de fuera conoce desde niña, y **esperó sentada en el banco del vestíbulo**, a oscuras, con su capa de lana gris tejida a mano. Cuando el grupo entró, se levantó con ellos: todos recuerdan «entrar juntos» porque empezaron a andar juntos. En el apagón de la Sexta cogió la llave, abrió con ella el **doble fondo del sillón** de la Séptima (su abuelo le dijo de niña: «el final de verdad es para ti; la llave abre las dos cosas») y sacó el **cuento que Edmund escribió solo para ella**. Salió por la Sexta con la llave en el bolsillo, por pánico. No ha vendido nada.
**Motivo (triste, y no absuelve):** Ottilie iba a vender el sillón «con su contenido» a un coleccionista de Artejo para salvar la Casa (carta del coleccionista, `read`). Maren no quería que el cuento de su abuelo acabara en una vitrina. Lo que hizo dejó a Ottilie en la ruina tres semanas y a siete personas con miedo; Maren lo sabe y lo dice.

**Pistas (todas alcanzables; la decisiva no está a la vista en el primer registro):**

| Pista (`clues` del caso) | Dónde | Qué prueba |
|---|---|---|
| `banco` | Hester (la abuela): «Ya estaba sentada en el banco cuando entramos. Pensé que era de la casa» | Nadie la vio entrar por la Primera |
| `escalon` | Dee y Robin: en la Sala Tercera dijo «cuidado con el escalón» **antes** de que avisara Ottilie | Conocía la Casa |
| `capas` | Ottilie: siete capas en el perchero a la mañana siguiente, secas; la octava capucha de la foto es de lana, no de la casa | La octava capa no era de la Casa |
| `foto` | Clive: la foto de grupo de la Sala Primera (`art`): siete capuchas de frente y una octava de espaldas, junto al banco | Había ocho, y la octava ya estaba dentro |
| `pestillo` | La Casa, Puerta Sexta: pestillo de fuera recién engrasado; barro con **huellas de bota claveteada** (rastreo `aura` con {riolu} en el jardín) | Entró y salió por el Jardín, con botas de verdad |
| `esporas` | Sala Sexta: polvo luminoso de Shiinotic en el banco y en la capa de lana de la foto | Viene del Bosque Lumirinto (despista hacia Fen, que acampa allí) |
| `botas` | Plié: solo los **recolectores de setas** llevan botas claveteadas (para el musgo); son tres. Fen lleva botas lisas | Descarta a Fen; deja a los recolectores |
| `dedicatoria` | Sally (y el libro de cuentos de Edmund en su estantería): «Para M., que siempre se salta el escalón que cruje» | Une «escalón» con una nieta |
| `doble_fondo` | La Séptima (puzle de rejilla para abrirla sin llave, con Quintana y Ottilie): el sillón tiene un doble fondo vacío | Qué se llevó y por qué la llave |

**Sospechas que se descartan (con pruebas, nunca por arte de magia):**
- **El Ditto de Pip:** estuvo toda la visita en brazos de Pip con forma de peluche de Wooloo (la abuela lo sujetaba por la «pata»; sale así en la foto), y la octava persona **habló**: un Ditto no imita voces.
- **Un Zoroark del bosque:** una ilusión no deja **huellas de bota claveteada** de una talla concreta en el barro, ni engrasa un pestillo, ni teje una capa de lana que deja pelusa en el banco.
- **Tu Zorua** (si `b06_zorua` y va en el equipo): llegaste a Galar después de esa noche (lo dice el sello de la Gira en tu pase).
- **Ottilie** (fraude al seguro: lo que cree Quintana al principio): la venta del sillón con su contenido le daba más que el seguro de la llave; robarse a sí misma no le salía a cuenta (la carta del coleccionista).

**Acusación** con el motor de casos (`cases.b07_casa`, partner `quintana`, CONTENIDO §21): culpable `maren`, `proof: ['pestillo', 'dedicatoria']` (o `botas` + `dedicatoria`). **Primer error:** Quintana reclama. **Segundo error:** «se escapa»: `flag.b07_casa_fallido` → a la mañana siguiente la llave aparece en el buzón de Ottilie con una nota sin firma («Perdón por las tres semanas»). La Casa reabre, pero el final verdadero se va con quien lo escribió: rama propia, con su escena y su pieza de museo (fallar abre un camino, no lo cierra).

**Qué haces con la verdad** (si aciertas; ninguna correcta):
- `b07_casa_devuelve`: Maren devuelve la llave a Ottilie y se queda con su cuento. La Casa reabre como antes.
- `b07_casa_lectura`: convences a las dos: la Séptima reabre con el final verdadero, y Maren lo lee una vez al mes («la Noche del Final»); la Casa sale de la ruina por la novedad. Pide haber reunido `dedicatoria` y `doble_fondo` (si no, la opción sale apagada con su porqué).
- `b07_casa_quintana`: se lo entregas todo a Quintana: la aseguradora paga, a Maren la denuncian, la Casa reabre sin final.

Premio: `prize` del caso (moderado) + `rep.policia +1` del motor + objeto `cuentovane` (`read`: el cuento de Edmund; en `lectura` y `devuelve` te lo deja leer Maren; en `quintana`, una copia del expediente) y `fotogrupocasa` (`art: 'casa_ocho'`).

## 5c. El Torneo de los Villanos (T4): quién lo paga

> Idea de ChatGPT aprobada por Mario: exmiembros de organizaciones criminales en un torneo clandestino; el jugador investiga quién lo financia; **una motivación triste no es absolución**.

- **Por qué vas:** Handsome tiene un aviso de la Policía Internacional: lotes de Caramelos Lazo (el lote 05 que siguió Kaori en el B6) acaban en Crampón. **Nerio** (canon: protector, melancólico, canta) no quiere a Lemnis en su pueblo. Crampón es el único pueblo de Galar sin punto de energía (canon): el torneo usa un **generador portátil** de Macrocosmos para que los Pokémon dinamaxicen en un sótano. La energía sale del Nodo 06.
- **El torneo:** en el sótano del antiguo mercado cubierto, «la Cripta». Lo presenta **el Anfitrión**, con careta y chistera, que se ríe «¡Bwahaha!» (**Xero**, que cree que nadie le reconoce). Luchadores: **Lola** (ex Team Rocket), un ex Team Flare con **Mega-Pyroar**, una ex Team Aqua con **Mega-Sharpedo**, un ex Equipo Galaxia, un ex Equipo Plasma, un ex Team Skull (si `!b05_skull_taller`), **Bastien** (rama `rompe`, «entrenador de alquiler») y el **Campeón sin nombre** (ex seguridad de Macrocosmos, la final). El premio: «un contrato con el Programa de Reinserción Horizonte». A los Pokémon finalistas les dan Caramelos Lazo «para que rindan».
- **Tres vías** (`parts` de `b07_m4` en la etapa `torneo`; **dos bastan**):
  1. **Combate** (`b07_pista_combate`): Nerio te consigue plaza. Tres rondas con curación entre una y otra + la final. **Si pierdes una ronda**, Lola (o Bastien) te saca por la puerta de atrás y te da **su** contrato: la pista llega igual, por otro sitio.
  2. **Personal** (`b07_pista_personal`): con Handsome, disfrazados de camareros del bar de la Cripta (disfraces malísimos). Escuchas a Xero al teléfono: «Sí, Dirección. No, la Presidencia no sabe nada. Como siempre». **Si te pillan**, Nerio canta desde el escenario y nadie mira a otro sitio: sales con media pista y una segunda oportunidad.
  3. **Dinero** (`b07_pista_dinero`): la caja de caudales de la trastienda (cerradura `lock`, tema `caja`). Dentro, **el libro de cuentas** (`librotorneo`, `read`): pagos de la «Fundación Horizonte», todos firmados «Dirección (Ω)», con una casilla «Visto bueno de Presidencia: no»; una línea de «Logística: N. L. · emplazamiento 06». Si no lo abres, tras vencer al Anfitrión Xero te da **una copia** «para que conste que yo solo soy el contratista» (el libro llega siempre).
- **Xero** (desenmascarado al final): no es el que paga; es «el que pone la carpa». No se le perdona ni se le castiga aquí: Handsome se lo lleva o se escapa según `b07_pista_personal`.
- **El libro de cuentas** (decisión pequeña, ninguna correcta): a **Handsome** (`b07_libro_policia`: en T5 hay agentes en Artejo), a **Alexia** con Renata (`b07_libro_prensa`: titular en T5, Lemnis en alerta) o **guardártelo para la presidenta** (`b07_libro_octavia`: Octavia llega a la Planta habiéndolo leído; cambia su primera frase).
- **Lola** (confesión, `b07_t_lola`): fue recluta de Giovanni con 18 años; estuvo en la Torre Pokémon de Lavanda la noche de la madre Marowak y en la toma de la Torre Radio, donde se fue y tapió la escalera de los fusibles. Cumplió condena. Una «fundación generosa» le pagó la fianza hace 20 años: la Fundación Horizonte, la misma del libro (Lemnis ya compraba gente en su primer año: la fianza es de antes de que Lemnis existiera con ese nombre; la fundación sí existía). Ahora le han dicho que esa deuda «se cobra». **«No me compadezcas. Lo que hice no se borra por tener motivos. Fiado no: esto lo pago yo.»** Decisión (ninguna absuelve): `b07_lola_testigo` (declara con Handsome), `b07_lola_crampon` (se queda con Nerio a limpiar la Cripta y devolver los caramelos), `b07_lola_vuelve` (vuelve a su carrito; deja la **receta de verdad**, `lolarecetaverdad`, `read`). Cierra `b02_t_lola` (`done`) y `b07_t_lola`.
- **Kaori:** examina a los Pokémon de los finalistas; el antídoto avanza (paso pequeño; con `b06_kaori_frio` y muestra, mediano). Momentos según afinidad (§7).
- **El mensaje de Noa** (final de T4): un sobre de logística con su letra: «Emplazamiento 06. Artejo. Sé contar. Si no llego, abre tú». Abre `b07_t_noa` en `mensaje`.

## 5d. La Liga de los Siete Oficios (T1, opcional)

> Idea de ChatGPT aprobada por Mario: reto opcional de una ciudad: siete maestros de oficios, convences a cuatro, ganar un combate es solo una vía. **No sustituye al gimnasio**: el Estadio de Pistón está en obras de temporada y su líder, **Naboru**, cuida las calderas mientras tanto (su gimnasio queda para la siguiente visita a Galar).

Tradición de Pistón (ciudad de calderas y trenes): quien convence a cuatro de los siete maestros recibe el **Sello de los Siete Oficios** (`sellooficios`, ya en `comun.js`) y puede comprar en los talleres «como uno de casa» (tienda `taller_oficios`, ya en `comun.js`: objetos de evolución de Galar). Cada maestro tiene **al menos dos vías**, y **los oficios hablan entre ellos**: si un maestro te rechaza (pierdes su prueba), puedes repetirla otro día, probar su otra vía, o —cuando ya has convencido a otros dos— él mismo «escucha cosas buenas de ti» y te da otra oportunidad. Nada se cierra para siempre.

| Maestro | Dónde | Vías (ejemplos; el tramo puede afinarlas) | Flag |
|---|---|---|---|
| La herrera (genérica) | `piston_talleres` | Combate con su Copperajah (as 68) · traerle **hierro de veta** de la Mina de Galar (excavación, se puede hacer más tarde) · ayudarla a enfriar una pieza (cosecha de hielo del Área Silvestre) | `b07_oficio_herreria` |
| El relojero (genérico) | `piston_talleres` | Cerradura (`lock`): la secuencia del reloj de la estación · deducción con los horarios de Agnes | `b07_oficio_relojeria` |
| La tintorera (genérica) | `piston_talleres` | Recolectar tres tintes en el Área Silvestre (bayas) · combate de exhibición con Pokémon de tres colores | `b07_oficio_tintoreria` |
| El carpintero (genérico) | `piston_talleres` | Ayudar a su aprendiz Grookey a coger el ritmo (cosecha `catch`) · combate · la escena de Grookey de `b07_s_iniciales` | `b07_oficio_carpinteria` |
| **Agnes Tull**, guardagujas | `estacion_piston` | **Nunca combate** («aquí no se pelea, se llega a la hora»): puzle de horarios (deducción con `choice`) · llevar un paquete en el tren de las 17:12 sin perderlo | `b07_oficio_aguja` |
| **Priya Lal**, curri | `curri_piston` | **Duelo de curri** contra **Gaspar** (los dos cocinan; tú eliges los ingredientes; *shokugeki*, sin combate obligatorio) · traerle Maxisetas del Área Silvestre | `b07_oficio_curri` |
| **Naboru**, calderas | `calderas_piston` | Combate amistoso (`naboru_oficio`, Fuego, as 69, cura antes) · mantener la presión de la caldera (puzle de rejilla, tema `lab`) | `b07_oficio_calderas` |

Con cuatro: `b07_oficios_hecho`, `{ give: 'sellooficios' }` en la taberna de Priya, con los siete (o los que convenciste) brindando con té. **Gaspar** se queda en Pistón aprendiendo de Priya y descubre la **Sopa Maxi** (§8). Si convences a los siete, `b07_oficios_siete` (una línea extra de Naboru y un objeto pequeño).

## 6. La pérdida (Noa) y la gran decisión (Octavia) (T5)

### 6.1 Noa abre las jaulas (biblia §9.1 y §9.2)

**Inevitable.** Las decisiones cambian **quién está, qué se dice y qué se salva**, nunca el qué. **Sin violencia gráfica:** fuera de plano, en silencio. **Humor:** ninguno en la escena; vuelve poco a poco (A.Z. no bromea; Lucien sí, al día siguiente, una vez).

1. **El emplazamiento 06:** bajo la Planta, una sala con jaulas de desplazados («Destino: por asignar») conectadas al nodo: la energía que se les saca alimenta el drenaje de Eternatus (biblia §3.2: «drenan la energía vital de los Pokémon cercanos a los nodos y de los legendarios»). Entre los Pokémon, **Lucien** (12): la Fisura de Luminalia de las 2:18 lo trajo aquí; Noa lo encontró y lo escondió en la oficina de logística, con su Chespin (si lo tiene). Entre las jaulas, **Merengue**, el Wooloo del pañuelo (envío KAL-0031 del B1).
2. **Noa** explica (con voz de inventario, contando): el panel de las jaulas solo se abre **desde dentro** de la sala del nodo, porque está pensado para que nadie lo abra. Al abrirlas, toda la energía guardada vuelve a la vez a quien se la quitaron, y dentro de la sala no queda aire que respirar durante unos segundos. Ella lo sabe. Ha contado. Olmedo, por llamada, confirma cómo funciona («es primo del Arco II») y que no hay otra manera desde fuera; nadie la convence de lo contrario porque nadie tiene tiempo. Aviso claro antes: Mario no puede impedirlo; puede elegir qué hace él mientras tanto (llevarse a Lucien / sujetar la puerta / quedarse con ella hasta que cierre la compuerta) y qué le dice (tres frases).
3. **Bastien:** *leal* (`b01_bastien_cubierto`): llega por el pasillo de servicio a tiempo; Noa le devuelve la insignia de Froakie sin logo («ahora tiene dueño») y sus últimas palabras son para los dos. *Resentido:* dos horas antes, sin saberlo, le preguntó a la seguridad «dónde trabaja una tal Lambert»: por eso Olivia la estaba buscando. Llega corriendo cuando ya se ha cerrado la compuerta. Flags `b07_bastien_llega` / `b07_bastien_tarde`. Si Bastien no aparece en esta partida (ninguna rama lo trae), Noa le deja la insignia a Mario «para que se la des».
4. **Las jaulas se abren** (cinemática 3, receta de pérdida de `docs/CINE.md`): luz blanca, los desplazados salen corriendo hacia las salidas, Merengue se queda quieto delante de la compuerta. Silencio. Después, nada.
5. **Recuerdo:** la **nota de Noa** (`notanoa`, `read`): su lista con todos los desplazados que contó, uno por línea, y encima de cada «Destino: por asignar», tachado, «Destino: casa». La última línea: «Lucien P. · 12 años · Destino: su madre». Flags: `b07_noa_jaulas`, `b07_noa_adios`.
6. **Merengue** (despedida elegida, no se regala: Mario ya tiene un Wooloo): se va a vivir al **Campo de los Hargreave** (trabaja allí: `b07_merengue_campo`, `works("wooloo")` no hace falta) o vuelve a Kalos con Lucien (`b07_merengue_lucien`). Elige Mario.
7. **Duelo que dura:** su mesa vacía de logística (T5, spot), Lucien la nombra en el ático (B8), Bastien lleva la insignia, un evento anual futuro (`registro.md`).

### 6.2 Octavia (gran decisión)

Octavia llega a la Planta con la alarma (con `b07_libro_octavia`, ya ha leído el libro; con `b07_libro_prensa`, viene de una rueda de prensa que no ha dado; con `b07_libro_policia`, Handsome la deja pasar). Ve las jaulas abiertas, la nota de Noa, la consola: «Presidencia: sin acceso a Módulo Diario · sin acceso a Emplazamiento 06». Entiende que **Dirección (Ω)** le ha escondido el drenaje desde el primer día. **Olivia**, leal a la visión de Rose y al dinero de Dirección, se niega a apagar el nodo: **combate** (`olivia_1`). Al caer el nodo, **Eternatus** despierta (cinemática 4) — `wild` 72, capturable y único (`onCatch`: `b07_eternatus_tuyo`; si no se captura, vuelve tras el siguiente hito como todos los únicos). Durante la escena, un aullido desde el Bosque Oniria (§3, Lucario).

Después, al amanecer, en la muralla de Artejo. Octavia no se disculpa con palabras bonitas: dice lo que firmó, lo que no miró, y que su marido murió por una máquina que alguien llamó «para el bien». **Aviso claro:** «Lo que decidamos ahora no tiene vuelta atrás». Mario decide **desde dónde ayuda**:

- **Dentro** (`b07_octavia_dentro`): sigue de presidenta y te pasa información desde Lemnis, en secreto. Ansel no sabe que ella sabe… salvo que el Diario (rama `doble`) se lo cuente: un `choice` más («¿Esto se lo contamos?»; contarlo es un error terrible que Mario puede cometer, `b07_doble_delata_octavia`). `rep.lemnis +5`.
- **Pública** (`b07_octavia_publica`): rueda de prensa en Artejo con Alexia y Renata: cuenta el drenaje y dimite. Lemnis en crisis; el consejo nombra «presidente en funciones» al director de Investigación, **Ansel Moreau** (giro oscuro: el Arquitecto con el poder a la vista). `rep.lemnis −10`, `rep.galar +5`, af.renata +3.
- **Testigo** (`b07_octavia_testigo`): se entrega a Handsome como testigo protegida, junto a Olmedo. Lemnis se queda sin cabeza visible y **Sera** hereda la presidencia en funciones (semilla del Acto VIII, «La heredera»). `rep.policia +5`.

En las tres, Octavia cierra `b07_t_octavia` y queda como aliada. **Sera** llama después (§2). Con `b07_octavia_dentro` y `sera_canal_abierto`, Sera dice algo que solo se dice a quien ya sabe.

**Lila (semilla, sin revelar):** en el archivo de la Planta, el **expediente de una investigadora**, «E. Dufresne · Proyecto Lemniscata · baja voluntaria hace 21 años · motivo: "las mediciones vitales no cuadran"», con una foto: una mujer con un bebé envuelto en una tela bordada con una lemniscata (`expedientedufresne`, `read`). Octavia reconoce el nombre y se calla. Mario elige: mandárselo a Lila (`b07_lila_expediente_enviado`: Lila contesta con tres palabras, «G-gracias. Ya. Ya.», y nada más) o guardarlo (`b07_lila_expediente_guardado`). La revelación de su madre (candidatas, «Acto VI») **se paga en el B8** con Lila en persona (decisión §14).

**A.Z.** (aparición del Acto VI): en la muralla, antes de Octavia. Floette deja una flor roja en la piedra. «Toda energía infinita se cobra en vidas. Hoy ha cobrado una. No dejes que se acostumbre a cobrar». Se va.

**Fin del bloque** (`b07_fin`, `{ save: true }`): Lucien vuelve a Luminalia (`vars.lucien_viaje = 0`; llamada de Philippe y de la señora Perrot); la Gira anuncia **Sinnoh** («montañas, lagos y un idioma muy viejo»); Lionel anuncia que la **Copa de la Temporada** se jugará al cerrar la temporada de Galar (no en el B7, §14).

## 7. Afinidad y reparación

**Regla del B7 (pedido de Mario: cada romance debe poder repararse si se daña):** toda opción que baje la afinidad de una candidata pone `b07_<x>_dolida` y suma lo perdido en `vars.b07_af_<x>_perdida`. Más adelante en el bloque (el mismo tramo o el siguiente) aparece un spot «Hablarlo con X» (`cond: 'flag.b07_<x>_dolida && !flag.b07_<x>_reparada'`, con `new`) con una **acción** (no una frase mágica) que devuelve lo perdido (`af.<x>` += `vars.b07_af_<x>_perdida`, como mucho lo perdido) y pone `b07_<x>_reparada`:

| Candidata | Qué la sube en el B7 | Qué la daña | Cómo se repara | Momento por etapa |
|---|---|---|---|---|
| **Rhi** (`af.rhi`, ~33 en el B4) | Ganarle limpio en el estadio (+8), decirle la verdad sobre el estadio vendido aunque duela (+3), ir a la final infantil (imprevisto) | Dejarla ganar (−5), compadecerla (−3) | Revancha en el Campo, de noche, con todo (`rhi_7` repetible, `b07_rhi_revancha`) | **45:** el punto de penalti donde aprendió a chutar, detrás de la caseta (`b07_rhi_momento`). **70:** te pide que juegues de portero el día que vuelva al Desafío (`b07_rhi_peticion`). Corazón: **no** se usa (es el final de la Copa). |
| **Renata** (`af.renata`) | Ganar el segundo acto (+5), darle el mérito en antena (+3), humor en antena (+1) | Robarle el crédito (−5), solemnidad (−2) | Darle el mérito en el episodio de Galar: llamada desde el estudio y una frase en antena | **70:** te pide que guardes la cinta del episodio 3, «por si un día tengo que pedir perdón en antena, que estés» (`b07_renata_peticion`). Corazón: no. |
| **Kaori** (`af.kaori`) | Traerle muestras de los finalistas (+3), no interrumpir (+2), ingrediente raro (Maxiseta) (+3) | Interrumpir el experimento (−2), superstición (−2) | Traerle una seta luminosa del Bosque Lumirinto (o la Maxiseta si la tienes) | **45:** te deja sujetar el vial mientras escribe, y escribe tu nombre en el margen (`b07_kaori_momento`). **70:** «Si un día no contesto, este cuaderno lo lleva usted a la botica de Iris» (`b07_kaori_peticion`, objeto `cuadernokaori`). Corazón (el té): no. |
| **Sera** (`af.sera`) | Contarle la verdad sobre su madre sin adornos (+5), cumplir lo que le prometiste (`sera_promesa`) (+3) | Mentirle sobre Octavia (−5) | Mandarle la nota de Noa (copia) por el Holomisor | Ninguno nuevo (su arco es el VIII). |
| **Lila** (`af.lila`) | Mandarle el expediente con delicadeza (+2) o guardarlo para dárselo en persona (+0, momento en el B8) | — | — | — |
| Leilani, Irene | Llamada opcional (Leilani +1) | — | — | — |

## 8. Colección, minijuegos, mecánicas y objetos

- **Iniciales de Galar** (`b07_s_iniciales`, con `parts`, ya en `misiones.js`): **Sobble** (T0, lago de la Ruta 2: llora cuando llueve y se esconde; la pescas con cuidado), **Grookey** (T1, calle de los talleres: el aprendiz del carpintero que no coge el ritmo), **Scorbunny** (T3, Hoyuelo: chuta piedras contra la pared de la escuela de fútbol; Rhi lo reconoce: es de la camada del club donde ella encontró el suyo). Cada uno con escena; **`owns()` de cada línea** (Rhi tiene Cinderace, Mario quizá Scorbunny de otro sitio): si ya la tiene, se queda a vivir allí y se le visita (`b07_<x>_vive`). Nivel bajo su evolución (14–16).
- **Fósiles de Galar** (`b07_s_fosiles`, con `parts`): mitades `fossilizedbird`, `fossilizedfish`, `fossilizeddrake`, `fossilizeddino` raras en la excavación de la **Mina de Galar** (`gather` con `game: 'dig'`, entradas `rare`); **Petra** (2.º bloque seguido, 3.ª región) las une en su laboratorio de campo: Dracozolt, Arctozolt, Dracovish, Arctovish (nv bajo su nivel; los cuatro son conseguibles una vez cada uno). Petra: «Esto no es paleontología. Es un sándwich. Me encanta».
- **Pseudolegendario:** **Dreepy** raro (≤ 3 %) en el **Lago del Enfado** (sub-área del Área Silvestre norte, T5; canon) y en las afueras de la Cornisa.
- **Legendario con historia:** **Eternatus** (T5, clímax, `wild` 72, capturable, único). **Zacian/Zamazenta**: solo el aullido (semilla). Las aves de Galar: ni se nombran.
- **Mecánica de la región: Dinamax** (biblia §3.3). T0: Magnolia da la **Maximuñequera** (`{ give: 'dynamaxband' }` y `{ unlock: 'dynamax' }`) tras una prueba en un punto de energía (cinemática 1). **Motor (paso 5):** el Dinamax del jugador solo funciona en Galar o en zonas de Fisura (biblia §3.3.1); hoy `battle.js` no mira el lugar. Si el paso 5 no llega, se publica sin la restricción y se anota.
- **Gigamax (mecánica especial asegurada, CLAUDE.md §2.4):** **Gaspar** aprende de Priya la **Sopa Maxi** (con Maxisetas, `maxmushrooms`, raras en la cosecha de la Pradera Radiante): da el **factor Gigamax** a un Pokémon de tu equipo cuya especie lo tenga (Gengar, Machamp, Snorlax, Lapras, Garbodor, Toxtricity…). **Motor (paso 5):** hace falta un comando para poner `gmax` a un Pokémon elegido (como `nickname`); hasta entonces el tramo deja el guion escrito con un comentario `// MOTOR: gmax` y sin dar nada.
- **Megapiedra con historia:** **Meganiumita** (`meganiumite`, nunca dada): premio de las **Terrazas de Hoyuelo** (T3). Mario tiene Meganium (nv 41 en el B4). Historia: la abuela de Percy tenía un Meganium que «olía a té» y cuidaba los bancales; la piedra estaba enterrada en el bancal más alto, donde ella se sentaba. La entrega Percy, sin solemnidad, con una taza de té.
- **Megas ajenas a la vista (≥2):** Mega-Pyroar y Mega-Sharpedo (torneo, opcionales), Mega-Greninja de Bastien (rama `rompe`, opcional). **Dinamax/Gigamax enemigo:** Percy, Rhi, Roy, Olivia. **Tera (≥1):** Dubwool **Tera Fantasma** de Fisura en la Pradera Radiante (opcional, peso 3).
- **Monturas:** ninguna nueva (los vuelos con Aerodactyl ya cubren Galar desde `comun.js`). Una línea de Leilani sobre los Corviknight taxi.
- **Minijuegos (≥4 sitios nuevos; aquí ~10):** T0 **pesca** de Sobble (escena única, `fish`, `lago`) y cosecha diaria en la Ruta 2 (`catch`, `huerto`); T1 cosecha de la Pradera Radiante (`catch`, `bosque`, con Maxisetas raras) y pesca diaria en el Lago Axew (`fish`, `lago`); Oficios: **cerradura** del relojero (`lock`, `cofre`) y **rejilla** de las calderas (`lab`); T2 **rastreo** del jardín de la Casa con {riolu} (`aura`, `campo`, escena única) y **rejilla** de la Séptima Puerta; T3 **excavación** de la Mina (`dig`, `cueva`, diaria, con mitades de fósil raras) y cosecha de los bancales de Hoyuelo (`catch`, `huerto`); T4 **cerradura** de la caja de caudales (`lock`, `caja`, escena única); T5 excavación de la Cuenca Polvorienta (`dig`, `cantera`) y **rejilla** del panel de la Planta.
- **`read` (≥3; aquí muchos):** `cartaapuntador4` (T1), la escaleta y el recibo del marcador (T1), la carta del coleccionista y `cuentovane` (T2), `librotorneo` y `lolarecetaverdad` (T4), `notanoa`, `expedientedufresne`, `informeoctavia` (T5), y los tres del Buzón (`comun.js`). **`art` (≥1):** `fotomudsdale` (comun), `fotogrupocasa` (`casa_ocho`, T2), `fotoestadiohoyuelo` (`estadio_noche`, T3, opcional).
- **Zonas de entrenamiento con premio:** Nido de la Pradera (T1, tope 69, **MT Ala Bis** `b07_mt_ala_bis`: Aerodactyl, Salamence), Terrazas de Hoyuelo (T3, tope 70, **Meganiumita**), Callejón de Crampón (T4, tope 71, **MT Desahogo** `b07_mt_desahogo`: Tyrantrum, Tyranitar, Feraligatr, Krookodile, Annihilape), Cornisa de Artejo (T5, tope 72, **MT Vasto Impacto** `b07_mt_vasto_impacto`: Ampharos, Tyrantrum, Tyranitar, Haxorus, Salamence). Las tres MT están en `comun.js` y no se han dado nunca (comprobado con `grep -rhoE "tm: '[a-z]+'" app/content`).
- **Cinemáticas (4):** T0 la Maximuñequera y el primer Dinamax; T3 Rhi en el estadio vacío (Cinderace Gigamax bajo los focos apagados); T5 las jaulas; T5 Eternatus. Formato y recetas en `docs/CINE.md`.
- **Gather en cada ruta y cueva** (lo deciden los tramos; al menos uno por lugar recorrible).

## 9. Personajes

- **Canon nuevos:** **Sonia** (`sonia`: anfitriona; T0, T1 llamada, T5 mensaje), **Prof. Magnolia** (`magnolia`: T0, mensaje en T5), **Percy** (`percy`: T3 líder; T3 terrazas), **Roy** (`roy`: T5 líder; mensaje en el final), **Nerio** (`nerio`: T4, aliado), **Naboru** (`naboru`: T1, maestro de las calderas; su gimnasio, más adelante), **Sally** (`sally`: T2 testigo; su gimnasio, más adelante), **Lionel** (`lionel`: T1 Apertura; T5 anuncio de la Copa), **Olivia** (`olivia_mc`: mencionada en T0 con `doble`; T4 por teléfono con Xero sin nombre; T5 jefa). Todos con la regla de las 3 apariciones repartidas: los que solo salen en el B7 tienen al menos 2 escenas aquí y una vuelta pensada (Galar se completa en otra visita).
- **OC nuevos:** **Octavia Lemnis** (`octavia`, por fin en persona: T5; hilo nuevo; B8+), **Gareth Hargreave** (`padre_rhi`: T3 y negocio; imprevistos), **Priya Lal** (`priya`: T1; rival de Gaspar; imprevistos de la Fonda en el B8), **Agnes Tull** (`agnes`: T1; anuncia los trenes en T2 y T4: tres escenas), **Ottilie Brack** y **Maren** (`ottilie`, `maren`: T2; tres escenas cada una en T2 + carta en el Buzón tras el caso + vuelta a Plié con el gimnasio de Sally).
- **Pendientes del validador:** **Mireille** (1 escena: T1 calentando a los novatos en la Apertura + encargada del Campo `b07_mireille_galar` + un imprevisto = 3+) y **Odile** (2: T0 en la recepción = 3).
- **Terceras apariciones pendientes en `hilos.md`:** **Kalena**, **Kekoa** y **Terrón** (Buzón, `comun.js`), **Inés, Celia y Teodoro** (Buzón, `comun.js`), **Tadeo** (T1), **Olmedo** (T5), **Magda** (T5), **Nate** (T3, 3.er bloque), **Lucien** (T0–T5), **Camille** (Buzón).
- **Vuelven:** Rhi (gran papel), Renata, Nico, Tía Rosa, Handsome, Bastien, Kaori, Lola, Xero, Noa (última), Gaspar, Petra, Quintana, Philippe, Alexia (rama prensa), Sera (llamada), Lila (mensaje), Leilani (llamada), A.Z., Ansel (rama doble, por escrito).
- **Para bloques futuros (no en el B7):** Irene y Quinoa (Acto VII), Ulises (Acto VII), Ysolde (rango Vencejo, acto alto), Lila en persona (B8), el Apuntador en el teatro (B8), Brock, Misty, Corelia (Copa).

## 10. Negocio del bloque: El Campo de los Hargreave (T3) · ya escrito en `comun.js`

**`b07_campo`**, en `campo_hargreave` (sub-área de `hoyuelo` que crea T3), socio **Gareth**. Aparece con `flag.b07_campo` (T3 lo activa en la cena en casa de Rhi, cuando Gareth cuenta que ha alquilado un terreno para «un campo de verdad, para los críos»). Entrada ₽30 000, 8 mejoras por ₽157 000. Líneas: tepes de césped (dinero), escuela de novatos (dinero + caramelos de experiencia), semillero (bayas, Ramas de Galanuez, Manzanas Dulce y Ácida raras), partidos de noche (bloqueada: Chapa Plateada, Cápsula Habilidad, Caramelo Exp. XL, Trozo Deseo). Encargados: Gareth (siempre), **Rhi** (`b07_rhi_combate`), **Nate** (`b07_nate`), **Mireille** (`b07_mireille_galar`). 7 imprevistos con voz propia (Wooloo en la banda, la lluvia, la oferta de Macrocosmos por el terreno, el ojeador, Nate en la portería, el plan de Mireille, la final infantil). **Merengue** puede quedarse a vivir aquí (§6.1): T5 añade un imprevisto con él (`once`, `cond: 'flag.b07_merengue_campo'`) ampliando `b07_campo` desde su tramo.

Además, `comun.js` **amplía el Estudio Casos Fríos** (B6) con dos imprevistos de Galar: «Directo desde Galar» (`b07_marcador`) y «La cuarta carta» (`b07_apuntador_4`).

## 11. Museo de tu partida (2–4 piezas; lo escribe el paso 5 en `app/content/b07/t6-museo.js`)

Formato de `app/content/b06/t6-museo.js`: sala nueva `museo_sala_galar` (hija de `museo_ficha`) con su puerta en el ático (patch, `cond` con `flag.b07_puerta_galar`), y `pieza(...)` con remitente, cartela `read` según la rama y comentario de Philippe.

1. **Una etiqueta de envío tachada** («Destino: por asignar» → «Destino: casa»), `cond: 'flag.b07_noa_adios'`. Remitente: Bastien (`b07_bastien_llega` / `b07_bastien_tarde`: cambia la nota) o Lucien si Bastien no estaba. Philippe no hace chistes en esta pieza. Ninguno.
2. **Un broche de lemniscata con el cierre roto**, `cond` una de `b07_octavia_dentro` / `_publica` / `_testigo`. Remitente: sin remite (dentro), Alexia (pública), Handsome (testigo).
3. (Opcional) **Una llave de latón, réplica**, `cond` una de `b07_casa_devuelve` / `_lectura` / `_quintana` / `flag.b07_casa_fallido`. Remitente: Ottilie o Maren según la rama.
4. **Sala de Alola, pieza nueva:** **un estribo de koa en miniatura**, `cond: 'flag.b07_terron_mudsdale'`, remitente Kalena, al lado de la herradura pequeña de `museo_terron` (que no se toca).

## 12. Referencias escondidas (como mucho una evidente por misión)

- **La Casa:** «Cuando quitas lo imposible, lo que queda es una bota con clavos» (Quintana, eco de Holmes) — **evidente**, una vez. La casa-cuento con salas-prueba: sutil (Mario como narrador de D&D).
- **El Torneo:** el Anfitrión con careta que se ríe «¡Bwahaha!» y cree que nadie lo reconoce (la propia gracia de Xero; sin referencia externa). Nerio cantando para tapar a Mario: sutil.
- **Rhi:** «Un delantero sin ego es un defensa con suerte» (*Blue Lock*, el título del acto) — **evidente**, una vez. En el vestuario del estadio de Hoyuelo, un cartel viejo, torcido, que pone **CREE** (*Ted Lasso*) — sutil.
- **Siete Oficios:** el duelo de curri (*Food Wars*, ya establecida con Gaspar).
- **El Apuntador:** ya establecida (cartas a la prensa). Sin nuevas.
- **Noa, Octavia, A.Z.:** ninguna. Son escenas serias.
- **Prohibidos:** *Portal*, *Dr. Stone*.

## 13. Contratos

Ver `b07-encargo.md`.

## 14. Decisiones tomadas en el paso 1 sin Mario (para que el paso 2 y Mario las conozcan)

1. **El Acto VI entero cabe en el B7**, salvo la revelación completa de la madre de Lila, que solo se **siembra** (expediente) y se paga en el B8 con Lila en persona: con la pérdida de Noa, Octavia, Rhi y Eternatus, una quinta revelación grande en el mismo bloque se comería a las demás.
2. **Medallas:** Percy y Roy (Planta y Dragón): Hoyuelo es la casa de Rhi y Artejo la ciudad del nodo. Naboru, Sally y Nerio salen como personajes, no como gimnasios: sus gimnasios se completan en la siguiente visita a Galar (regla de regiones completas). Anotar en `progreso.md` («Regiones por completar · Galar»): Pueblo Yarda, Pueblo Amura (Cathy), Pueblo Ladera, Pueblo Auriga, Ciudad Puntera (Torre Rose), los gimnasios de Naboru, Cathy, Sally, Nerio, Ladera y Auriga, Rutas 1 y 5–10, el resto del Área Silvestre, el Bosque Oniria, la Corona de la Torre de Artejo.
3. **Copa de la Temporada:** no se juega en el B7. Lionel la anuncia para «el cierre de la temporada de Galar» (B8).
4. **La Liga de los Siete Oficios va dentro de T1** (no tiene tramo propio): seis tramos, como pidió Mario.
5. **Octavia** es la gran decisión; la pérdida de Noa no es decisión (biblia §9.1.4).
6. **El Dinamax regional y el factor Gigamax** necesitan motor (paso 5). Si no da tiempo, se publica sin restricción regional y la Sopa Maxi se queda en escena sin efecto, anotado.
7. **Mecánica especial asegurada (lista para `progreso.md`):** B7 da Meganiumita y el Gigamax (Sopa Maxi). Siguen faltando, de Pokémon que Mario tiene: **Victreebelita** (Victreebel 41) y **Golurkita** (Golett 42) → B8; y todos los cristales Z de Alola listados en «Regiones por completar».
