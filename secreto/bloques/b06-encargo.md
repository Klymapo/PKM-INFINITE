# Encargo para escribir un tramo del Bloque 6

**Las reglas generales son las mismas que en el B2–B5:** lee `secreto/bloques/b02-encargo.md` entero (qué leer, qué entregar, reglas de calidad, validación, técnica y respuesta final) y `secreto/bloques/b05-encargo.md`, y aplícalas cambiando «B5» por «B6», el prefijo `b05_` por `b06_` y la carpeta `app/content/b05/` por `app/content/b06/`. Aquí cambian el plan, los contratos y algunas reglas nuevas.

## Lee además

1. `secreto/bloques/b06-plan.md` entero (tu tramo, y los demás para saber qué hacen). **Este bloque es la revelación del Diario:** lee §4 y §6 aunque no sean tu tramo; ninguna pista se adelanta ni se repite.
2. `CLAUDE.md` §2.4 entero (reglas de contenido; sobre todo: hilos que se cierran al terminar su parte, cinemáticas con `docs/CINE.md`, minijuegos con `docs/MINIJUEGOS.md`, premio del instructor, `parts`, cartas con `read`, `new` en sitios nuevos de zonas viejas, nada de regalar especies o líneas que Mario ya tenga: `owns()`), y la nota de `secreto/progreso.md` del 2026-10-11: **ningún personaje aparece porque sí** (origen y motivo para dirigirse al jugador).
3. `docs/CONTENIDO.md`, `docs/CINE.md` y `docs/MINIJUEGOS.md` (formato exacto).
4. El **B5** publicado (`app/content/b05/`), sobre todo `t3-poni.js` (el final, `b05_fin`: la playa, A.Z., la llamada de Renata y el anuncio de Teselia con Puerta en Ciudad Porcelana) y `t2-aether.js` (estilo, Diario, Ysolde). Y las secciones «Publicación 9» de `secreto/registro.md` y «Estado tras el B5» de `secreto/hilos.md`.
5. La biblia completa, sobre todo §3.5 (el Arquitecto), §7 (calendario del Diario), §9 (pérdidas: la del Acto V es el Eco si se purga).
6. Ya escritos para el B6 (no los edites; si falta algo, dilo): `app/content/b06/npcs.js`, `misiones.js`, `comun.js`, `index.js`.
7. Tablas canon: `secreto/ref/encuentros-unova.json` (claves abajo). **Sube los niveles** a la curva del plan (§1).
8. **Nombres oficiales (comprobados en WikiDex, 2026-10-23):** usa los de España en todos los textos: **Boquete Gigante** (no «Gran Grieta»; «Cuenca Gigante» es el de Hispanoamérica), **Puente de Fayenza** (no «Puente Levadizo»; se puede describir como «el puente levadizo», en minúscula) y **Almacenes Frigoríficos** (plural). La Megapiedra de Feraligatr es la **Feraligatrita** (`feraligite`). **Los ids no cambian** (`boca_gran_grieta`, `puente_levadizo`, `almacen_frio`, `almacen_camaras`, `almacen_lab`).

## Lo que sabemos de la partida de Mario (escribe igualmente todas las ramas)

- Terminó o está terminando el B5 (Alola, tope 62). En el B4 tenía: Lucario 55, Golbat 55, Kingdra 54, Pupitar 51, Garganacl 50, Tyrantrum 51. **Equipo que hay que priorizar ahora:** Ampharos «Candela», Aurorus, Tyrantrum, Garganacl, Pupitar (o Tyranitar), Aerodactyl, y **Lucario** (central: tiene que lucirse). En cajas: Typhlosion, Delphox, Gengar, Scizor, Feraligatr, Annihilape, Aegislash, Krookodile, Gyarados, Roserade, Haxorus, Luxray, **Shelgon**, Absol, 2 Ampharos…
- Flags suyos conocidos: `b01_trato_sera`, `b01_prensa_lemnis`, `b01_bastien_cubierto` (Bastien leal), `b02_frag_melia`, `b03_rancho_sobrina` (+ negocio del rancho), `b03_rocket_libres`, `b03_renata_espera`, `b03_vencejo_pluma` (es **Pluma**), `b03_sylveon`. Las decisiones de Lebrun (`b04_lebrun_*`), de la luz (`b05_luz_*`), de Bastien (`b05_bastien_*`) y de los Skull (`b05_skull_taller`) **no las sabemos**: escribe todas.
- Afinidades en el B4: Kaori 43, Rhi 33, Lila 27, **Renata 21**, Irene 20, Sera 13 (+ Leilani del B5).
- El compañero es Lucario. Usa `{riolu}` y la condición `inParty("riolu") || inParty("lucario")` (constante `LUC` en tu archivo) cuando una escena dependa de que esté en el equipo.
- Monturas: Rhyhorn (`flag.mount_rhyhorn`) y Lapras (`flag.mount_lapras`, con `ridegear`). Lleva en la mochila **Ámbar sin registro** (`ambarsinregistro`, puede no tenerlo en otras partidas), **Tarjeta del viajero** (`tarjetaviajero`) y **Pluma gris** (`plumagris`).
- **Le encantan:** los giros con pistas justas, las facciones con rangos, decidir con matices, la deducción y el patrón *personaje entrañable → objeto clave con cara → abre una zona*. **No le gusta:** dos Pokémon de la misma línea; misiones abiertas sin nada que hacer; personajes que aparecen sin motivo.

## Mecánicas

- **Mega:** la tiene. **Z:** la tiene (`zring`); úsala solo si encaja (Teselia no es región Z; jefes Mega o nada). **Dinamax y Tera:** nunca en el jugador. Tera solo en salvajes de Fisura (`gimmick: 'tera'`). **Una mecánica por combate.**
- Megas enemigas: Camila (Eelektross), Brock (Steelix), Azucena (Altaria, opcional). Xero y Acromo **sin** mecánica (o Xero con una Mega de Flare si el plan lo permite: no, déjalo sin).
- **Pokémon únicos:** todo `wild` capturable de un guion es único. Reshiram: `onCatch` con `{ set: { 'flag.b06_reshiram_tuyo': true } }`. Dialga joven y el alfa de la bandada: `noCatch: true`.

## Contratos compartidos (no los cambies)

### Región y mapa

`teselia` ya está declarada en `index.js` (mapa 100 × 100). Coordenadas de primer nivel; las sub-áreas llevan `parent`. El **Valle de Antaño** no está en el mapa de Teselia: es un lugar con `parent: 'cabina_ulises'` (no sale en el mapa; se entra por la cabina).

| Tramo | Lugares nuevos |
|---|---|
| T0 | `porcelana` (52,62, city, «Ciudad Porcelana»), sub-áreas con `parent: 'porcelana'`: `puerta_teselia` (la Puerta Lemnis de Teselia, en el muelle), `muelle_porcelana` (pesca de la concha y punto diario), `estudio_casos` (el estudio del pódcast en el sótano de un rascacielos; negocio `b06_estudio`), `recepcion_gira_tes` (la recepción, se cierra tras la escena), `torre_lemnis_tes` (vestíbulo de la Torre Lemnis de Teselia; **cerrada** hasta T5, solo una puerta de cristal y un guardia). |
| T1 | `tes_ruta4` (44,52, ruta «Ruta 4», `from: 'porcelana'`, `to: 'mayolica'`, ~8 tramos; terreno arena; `branch` en un tramo a `ruinas_desierto`), `ruinas_desierto` (36,48, kind `area`, «Ruinas del desierto», `links: ['tes_ruta4']`: excavación diaria y huevo de Larvesta), `mayolica` (40,36, city, «Ciudad Mayólica»), sub-áreas con `parent: 'mayolica'`: `gym_mayolica` (gimnasio de Camila), `metro_batalla` (zona de entrenamiento, tope 63), `musical_mayolica` (el Musical: Tepig, Liam, Tadeo), `estadio_mayolica` (torneo juvenil: Camille), `noria_mayolica` (caso 2 del Apuntador), `estacion_mayolica` (el tren: spots «Tren a Chamota» y la salida al Bosque Azulejo). |
| T2 | `chamota` (82,40, town, «Pueblo Chamota»; se llega por tren desde `estacion_mayolica`, sin `links`), sub-áreas con `parent: 'chamota'`: `campanario_chamota`, `panaderia_chamota`, `ayuntamiento_chamota` (archivo: el decreto), `muralla_norte` (rastreo; **zona de entrenamiento** tope 64), `huertos_chamota` (cosecha diaria), `boca_gran_grieta` (kind `area`, `encounters`; el paso hacia dentro está **bloqueado por el hielo**: `block` permanente con texto). |
| T3 | `bosque_azulejo` (36,62, ruta de bosque «Bosque Azulejo», `from: 'mayolica'`, `to: 'puente_saeta'`, ~7 tramos), `puente_saeta` (28,72, ruta «Puente Saeta», `from: 'bosque_azulejo'`, `to: 'esmalte'`, ~4 tramos, terreno `path`), `esmalte` (20,78, city, «Ciudad Esmalte»), sub-áreas con `parent: 'esmalte'`: `museo_esmalte` (Encina, Petra, el reloj), `patio_museo` (donde aterriza la cabina; spot «Abrir la cabina» tras el final), `cabina_ulises` (kind `building`, «La cabina», `parent: 'patio_museo'`: más grande por dentro; puzle), `valle_antano` (kind `area`, «Valle de Antaño», `parent: 'cabina_ulises'`, con `encounters`), sub-áreas con `parent: 'valle_antano'`: `lago_antano` (pesca diaria), `pared_ambar` (excavación única), `nido_antano` (zona de entrenamiento, tope 65; el alfa). Con la montura: `isla_libertad` (12,90, kind `area`, «Isla Libertad», sin `links`; spot «Volar» o Lapras; rumor de Victini, `gather`). |
| T4 | `tes_ruta5` (16,62, ruta «Ruta 5», `from: 'esmalte'`, `to: 'puente_levadizo'`, ~6 tramos), `puente_levadizo` (12,50, ruta «Puente de Fayenza», `from: 'tes_ruta5'`, `to: 'fayenza'`, ~3 tramos; con `block` hasta `flag.b06_t3_hecho`), `fayenza` (10,38, city, «Ciudad Fayenza»), sub-áreas con `parent: 'fayenza'`: `gym_fayenza` (Brock), `muelle_fayenza` (zona de entrenamiento, tope 65, **Feraligatrita**; pesca diaria), `almacen_frio` (kind `building`, «Almacenes Frigoríficos», nombre oficial: el **Proyecto Arco II**; sub-zonas con `parent: 'almacen_frio'`: `almacen_camaras` con `encounters` y puzle de hielo, `almacen_lab` (Olmedo)). |
| T5 | `tejados_porcelana` (`parent: 'porcelana'`, kind `area`, «Tejados de Porcelana»: se abre con `has("plumagris")` y `flag.b06_t4_hecho`; **onEnter primera vez → `b06_m_aviso`**; cosecha diaria en nidos; tras el final queda como zona de paseo), `torre_lemnis_cima` (`parent: 'tejados_porcelana'`, la sala de servidores y la azotea; se cierra con `cond` tras la operación), `tes_ruta6` (22,26, ruta «Ruta 6», `from: 'fayenza'`, `to: 'teja'`, ~7 tramos; se puede saltar volando), `teja` (32,14, city, «Ciudad Teja»), sub-área `terraza_teja` (`parent: 'teja'`, zona de entrenamiento, tope 67, **Salamencita**), `torre_dragospiral` (44,8, ruta de torre «Torre Dragospiral», `from: 'teja'`, `to: 'cima_dragospiral'`, ~8 tramos, terreno `rocks`), `cima_dragospiral` (`parent: 'torre_dragospiral'`, kind `area`: Acromo, el Nodo 05, Reshiram). |

**Conexiones (`links`):** porcelana–tes_ruta4–mayolica · tes_ruta4–ruinas_desierto · mayolica–bosque_azulejo–puente_saeta–esmalte–tes_ruta5–puente_levadizo–fayenza–tes_ruta6–teja–torre_dragospiral. Cada ruta declara `links` con sus dos extremos y `route.from`/`route.to` iguales.

**Viajes que no son `links` (spots `go`):**
- T0, en `puerta_teselia`: «Cruzar a Alola (Hauoli)» → `puerta_alola`, «Cruzar a Kanto (Azafrán)» → `puerta_azafran`, «Cruzar a Kalos (Luminalia)» → `luminalia_plaza`, «Cruzar a Johto (Trigal)» → `puerta_trigal`, todos con `cond: 'flag.b06_puerta_teselia'`. `comun.js` ya pone «Cruzar a Teselia (Porcelana)» → `puerta_teselia` en esas cuatro Puertas.
- T1, en `estacion_mayolica`: «🚆 Tren a Pueblo Chamota» → `chamota`, `cond: 'flag.b06_pase_tren'`. T2, en `chamota`: «🚆 Tren a Mayólica» → `mayolica`.
- T3, en `patio_museo`: «Entrar en la cabina» → `cabina_ulises` (`cond: 'flag.b06_pendulo'`); en `cabina_ulises`: «Salir al valle» → `valle_antano` y «Volver al museo» → `patio_museo`; en `valle_antano`: «Volver a la cabina» → `cabina_ulises`.
- **Vuelos** (los pone `comun.js` cuando exista `flag.mount_aerodactyl`): «🦅 Volar a…» en `porcelana`, `mayolica`, `esmalte`, `fayenza`, `teja` e `isla_libertad`. **No los dupliques en tu tramo.**

### Encuentros (claves de `secreto/ref/encuentros-unova.json`)

| Lugar | Claves |
|---|---|
| `porcelana`, `muelle_porcelana` | `castelia-city` |
| `tes_ruta4`, `ruinas_desierto` | `unova-route-4`, `desert-resort`, `desert-resort/entrance`, `relic-castle/a` (ruinas) |
| `mayolica` | (ciudad, sin hierba: `unova-route-5` de apoyo para el punto de las afueras) |
| `chamota`, `muralla_norte`, `huertos_chamota` | `unova-route-12`, `unova-route-13` |
| `boca_gran_grieta` | `giant-chasm/outside`, `giant-chasm/forest` |
| `bosque_azulejo` | `pinwheel-forest/outside`, `pinwheel-forest/inside` |
| `puente_saeta` | `unova-route-3` (agua) |
| `esmalte` | `nacrene-city/west-gate` |
| `valle_antano`, `lago_antano`, `nido_antano` | **Tabla propia** (no hay clave canon): formas evolucionadas de fósiles 61–65 (Archeops, Carracosta, Cradily, Armaldo, Bastiodon, Rampardos, Kabutops, Omastar, Aerodactyl) y raros ≤ 8 % de Lileep, Anorith, Shieldon, Tirtouga, Archen a nivel bajo su evolución. Más Yanmega, Tangrowth y Dunsparce de apoyo (comprueba especies en `app/data/species.json`). Ningún `displaced`: son de otra época, no de otra región (marca `rumors` en vez de eso). |
| `isla_libertad` | `unova-route-17`, `unova-route-18` |
| `tes_ruta5` | `unova-route-5` |
| `puente_levadizo` | `driftveil-drawbridge` |
| `fayenza`, `muelle_fayenza` | `driftveil-city` |
| `almacen_camaras` | `twist-mountain/b1f-3f` (hielo; Cryogonal, Beartic), con cuidado |
| `tes_ruta6` | `unova-route-6`, `mistralton-cave` |
| `teja` | `icirrus-city`, `moor-of-icirrus` |
| `torre_dragospiral` | `dragonspiral-tower/entrance`, `/1f`, `/2f`, `/outside`; **Zweilous** raro ≤ 5 % (nv 63) |

Niveles: §1 del plan. Desplazados (`displaced: true`): de Alola (lo último que tocó la Puerta) o Galar (adelanto del Acto VI). Un salvaje **Tera** de Fisura en T1 (Krookodile Tera Agua en la Ruta 4, peso 3–4).

### Entrenadores con id fijo

| Tramo | Ids |
|---|---|
| T0 | `renata_1` (npc `renata`, opcional, amistoso tras el caso de prueba, 4 Pokémon, as 61 Zoroark; Liepard, Gothitelle, Inteleon no aún; cura antes), entrenadores del muelle y la ciudad (sin prefijo, que no choquen: mira `secreto/registro-auto.md`) |
| T1 | `camila_g` (npc `camila`, `cls: 'Líder'`, Eléctrico, 5 Pokémon, as **63** Eelektross con `gimmick: 'mega'`, `ace: 'eelektross'`, `item: 'eelektrossite'`, 2 objetos), `metro_1`…`metro_4` (zona de entrenamiento), `azucena_2` (npc genérico con `as: 'Azucena'` como en el B5 —el entrenador del B5 es `kantai_iolana`, npc `kantai_turista`—, opcional, Mega-Altaria 62, cura antes), `bastien_7` (npc `bastien`, opcional, solo con `b05_bastien_rompe`, as 63 Greninja, cura antes) |
| T2 | `muralla_1`…`muralla_3` (zona de entrenamiento), `celia_cocina` **no** es combate (el *shokugeki* es un guion) |
| T3 | `nido_1`…`nido_3` (entrenadores de zona: paleontólogos de la expedición de Encina, que llegan con la segunda visita; si no encaja, `wild` de práctica con `unique: false`), entrenadores del Bosque Azulejo y del Puente Saeta |
| T4 | `brock_tes` (npc `brock`, `cls: 'Líder'`, Roca, 5 Pokémon, as **65** Steelix con `gimmick: 'mega'`, `ace: 'steelix'`, `item: 'steelixite'`, 2 objetos), `muelle_fay_1`…`3`, `fabio_2` (npc `fabio`, opcional, as 64), `xero_1` (npc `xero`, jefe de trama, 5 Pokémon, as **66**, 2 objetos, sin mecánica), reclutas Plasma (`plasma_alm_1`…) |
| T5 | `francine_2` (npc `francine`, opcional, solo si `!flag.b05_skull_taller`, as 66), `terraza_1`…`3`, reclutas Plasma de la torre (`plasma_dr_1`…), `acromo_1` (npc `acromo`, jefe de trama, **6** Pokémon, as **67**, 2 objetos, sin mecánica; `lose: 'continue'` con revancha), sin id: el `wild` de Reshiram (nv 66) |

**Regla:** todo combate contra un personaje con nombre ofrece curar antes (pociones del NPC o el Centro). Los combates de Xero y Acromo, además, con `heal: true` si no hay Centro a mano.

### Flags y objetos que otros leen

| Tramo | Debe activar / dar |
|---|---|
| T0 | `b06_inicio_hecho` (al principio de `b06_inicio`) · `b06_puerta_teselia` (al cruzar) · `b06_llegada` (onEnter de Porcelana; aquí el gruñido de {riolu}) · `b06_m1` a `porcelana` y luego hecha · `b06_recepcion` · `b06_brock_comida` · `b06_handsome_calder` (Handsome presenta a Calder custodiado) · `b06_oshawott` (si recibe Oshawott; `b06_s_iniciales` a `buscar`) · `b06_renata_estudio` · `b06_caso_prueba` (la deducción en directo; abre el negocio) · `b06_renata_diario` (Renata lee el Diario) · `b06_apuntador_1` (carta 1 leída; `b06_t_apuntador` a `noria`) · `b06_t_renata` a `olmedo` · `b06_m2` a `mayolica` · `b06_t0_hecho` |
| T1 | `b06_mayolica_llegada` · `b06_larvesta` (huevo) · `b06_tepig` · `b06_camille_estadio` (+ `b06_lebrun_avisado` / `b06_lebrun_callado` según rama) · `b06_noria_hecha` (+ `b06_noria_antes` si se adelantó con el horario) · `b06_apuntador_2` (`b06_t_apuntador` a `espera`, etapa con texto «El Apuntador volverá a escribir. Sigue con lo tuyo») · `b06_tadeo_conocido` · `b06_acromo_visto` · `b06_bastien_metro` (solo rama `rompe`) · tras Camila: `{ badge: 'medalla_voltio' }`, `{ cap: 64 }`, `b06_camila_vencida` · `b06_pase_tren` (abre Chamota y el Bosque Azulejo; `b06_m2` a `hecha`, `b06_m3` a `esmalte`) · `b06_t1_hecho` |
| T2 | `b06_chamota_llegada` · `b06_s_chamota` (misión con `parts` de testigos) por sus etapas · `b06_testigo_campanero`, `_teodoro`, `_celia`, `_ines`, `_alcaldesa` · `b06_decreto` · `b06_escarcha` (rastreo) · `b06_campanario` · `b06_hipotesis` (+ `vars.b06_aciertos` 0–3) · una de `b06_chamota_cronica` / `b06_chamota_privado` / `b06_chamota_calla` · `b06_zorua` o `b06_zorua_vive` · `b06_shoku_celia` · `b06_matiere_llamada` · `b06_t2_hecho`. **T2 es opcional**: nada del camino principal puede leer sus flags salvo para variantes |
| T3 | `b06_esmalte_llegada` · `b06_snivy` · `b06_petra_museo` · `b06_cabina_patio` · `{ give: 'penduloambar' }` (cinemática), `b06_pendulo` · `b06_cabina_dentro` (la pista de Rotom) · `b06_sueno_aura3` · `b06_valle` · `b06_archen` · `b06_alfa_vencido`, `flag.mount_aerodactyl` (no toques `vars.mount`; con `b06_aerodactyl_regalo` si se le dio una cría) · `b06_dialga_calmado` · `b06_m3` a `cabina` → `valle` → hecha · `b06_t_ulises` y `b06_t_petra` cerradas · `b06_t3_hecho` (abre el Puente de Fayenza; `b06_m4` a `fayenza`) |
| T4 | `b06_fayenza_llegada` · tras Brock: `{ badge: 'medalla_temblor' }`, `{ cap: 66 }`, `b06_brock_vencido` · `b06_feraligita` (premio del muelle) · `b06_almacen` · `b06_olmedo` (Olmedo encontrado; `b06_t_renata` hecha) · `b06_kaori_frio` (+ `b06_kaori_momento` si `af.kaori >= 45`) · `b06_bastien_sujeto` + `b06_bastien_sale` / `b06_bastien_firma` (solo rama `sigue`) · `b06_noa_buzon` · `b06_magda_condensadores` · tras Xero: `{ cap: 67 }`, `b06_xero_vencido` · `b06_acromo_huye` · `b06_trampa` (la propuesta de Renata; `b06_t_apuntador` a `trampa`) · `b06_m4` a hecha, `b06_m5` a `tejados` · `b06_t4_hecho` |
| T5 | `b06_m_aviso` (onEnter de `tejados_porcelana`, primera vez) · `b06_trampa_hecha` · `b06_apuntador_3` (`b06_apuntador_vencido_1`; `b06_t_apuntador` a `segundo`, texto «El segundo acto, en otra región», **y se cierra**: la parte II será `b07_t_apuntador`) · `b06_t_vencejos` · `b06_servidor` · `b06_ala` (`{ give: 'alavencejo' }`, cinemática) · `b06_francine_aparta` (opcional) · `b06_revelacion` · una de `b06_eco_purgado` / `b06_eco_reformado` / `b06_eco_doble` · `b06_teja_llegada` · `b06_salamencita` · `b06_acromo_vencido` · `b06_nodo05` · `b06_reshiram_visto` (+ `b06_reshiram_tuyo` en `onCatch`) · `b06_az_dragospiral` · `{ cap: 68 }` · retos `jefe_xero` (T4) y `jefe_acromo` (T5) en sus `challenges` · `b06_fin` (último guion del bloque, con `{ save: true }`; anuncio de **Galar**) |

### Contrato del Apuntador (T0, T1, T2, T4, T5 lo comparten)

- **Firma:** «Desde la concha». Letra de máquina de escribir con la «e» que se come la tinta (se nota en todas sus cartas: «e» medio borrada). Papel color crema de programa de teatro.
- **Solo sabe lo que se dijo en antena** (los directos de los martes de *Casos Fríos*). Cuando escribas su carta, cita **solo** frases que en tu tramo se digan **con el micro encendido**. Marca en los guiones con un comentario `// EN ANTENA` las frases que el Apuntador puede usar y `// FUERA DE MICRO` las que no.
- **Ventajas con mecanismo** (plan §5): directo de los martes · horarios públicos · un Chatot que repite retales de episodios · mensajero pagado. No inventes otras sin mecanismo comprobable.
- **No se revela quién es.** Tadeo Lis sale en T1 (y una línea en T5) como amable apuntador del Musical; ninguna escena del B6 lo señala de frente. Pistas permitidas: «concha» = el hueco del apuntador (T1, de pasada), el Chatot del atrezo (T1), coartadas de horario (T1, T5), la cinta del episodio 3 (imprevisto del negocio, T0).
- **Objetos:** `cartaapuntador1` (T0), `cartaapuntador2` (T1), `cartaapuntador2b` (T2, solo si emitiste lo de Chamota), `cartaapuntador3` (T5). Todos `pocket: 'key'` con `read`.
- **La trampa** (T4 la propone, T5 la resuelve): tres detalles falsos sobre dónde estará Olmedo (está protegido por Handsome): (a) **en antena**, «el viejo invernadero del muelle»; (b) **delante de la Pokédex**, sin micro, «el Bosque Azulejo»; (c) **por la radio de la Policía**, «el puerto de Fayenza». T5: en el invernadero, carta 3 del Apuntador; en el Bosque Azulejo, agentes de Lemnis (Ysolde los ve desde arriba); en Fayenza, nadie.

### Contrato de la revelación (T5; los demás no la adelantan)

- Ningún tramo antes de T5 dice «Eco», «Ansel dentro del Rotom», «Módulo Diario» ni «A. M.». T4 (Olmedo) puede decir «módulos de acompañamiento» y «copiar una voz dentro de un Rotom».
- Las entradas del Diario de T0–T4 llevan `cond: 'flag.b01_diario'` y siguen la voz de Rotom (biblia §7, entradas del B5 como modelo); omiten lo que dice el plan §4. **T3 no tiene entrada de Diario de los días de la cabina** (a propósito).
- Desde T5, tras la decisión, el Diario cambia: con `b06_eco_purgado`, frases cortas de Rotom de verdad; con `b06_eco_reformado`, cada entrada termina en «*(Omitido: nada.)*»; con `b06_eco_doble`, igual que antes, pero el jugador ve un aviso de Rotom «esto se lo contamos» / «esto no». T5 deja escritas las entradas del final según rama; los bloques siguientes leerán estos flags.

### Otras piezas existentes

- **Medallas (`comun.js`):** `medalla_voltio` (Camila, Eléctrico) y `medalla_temblor` (Brock en Fayenza, Roca; «Temblor» porque el gimnasio es de intercambio). Cuentan en el Circuito.
- **Objetos del B6 (`comun.js`):** `penduloambar` (clave), `alavencejo` (clave), `pasetrentes` (Pase de la Gira para el tren, clave). Del juego: `eelektrossite`, `steelixite`, `feraligite`, `salamencite`, `lightstone`, `darkstone`. Crea en tu archivo los objetos que necesites (cartas, notas, `art`, documentos de Chamota).
- **Tiendas (`comun.js`):** `tienda_porcelana`, `tienda_mayolica`, `tienda_fayenza`, `tienda_teja`. Ponlas como spot en tus ciudades. Las piedras y MT de Teselia, en `t4-fayenza.js` (`b06_mt_fayenza`, Mercado de Fayenza) para que haya una tienda de MT en la región.
- **Retos (`comun.js`):** `gym_mayolica` (Camila), `gym_fayenza` (Brock). Los demás (`jefe_xero`, `jefe_acromo`, fichas de las zonas de entrenamiento, `caso_chamota`), en tu archivo.
- **Negocio (`comun.js`):** `b06_estudio` (Estudio Casos Fríos, plan §10). T0 pone el spot `{ venture: 'b06_estudio' }` en `estudio_casos` y la escena de entrada. Los imprevistos los escribe `comun.js`; si tu tramo tiene un buen imprevisto, propónlo en tu respuesta.
- **Montura:** T3 la da (`flag.mount_aerodactyl`); `comun.js` pone los vuelos.
- **NPCs nuevos (`npcs.js` del B6):** canon `encina`, `camila`, `acromo`; OC `nico_ferrer`, `tia_rosa`, `tadeo`, `olmedo`, `ines`, `celia`, `teodoro`; genéricos `recluta_plasma`, `vecino_teselia`, `campanero`, `alcaldesa`, `paleontologa`, `estibador`, `actriz_musical`, `oyente`. Siguen disponibles todos los anteriores (`rotom`, `handsome`, `sera`, `alexia`, `brock`, `renata`, `simon`, `hector`, `matiere`, `petra`, `viajero`, `ysolde`, `bastien`, `kaori`, `xero`, `damaso`, `gaspar`, `lulu`, `liam`, `leilani`, `calder`, `camille`, `lebrun`, `zyra`, `pimpinela`, `fabio`, `francine`, `hela`, `mayla`, `sobrina`, `az`, `ansel`, `noa`, `kantai_turista` (Azucena)…).
- **Misiones del B6:** `app/content/b06/misiones.js`. Avánzalas con sus etapas exactas. **Cada hilo se cierra al terminar su parte** (`{ quest: 'b06_t_x', stage: 'hecha', done: true }`). Hilos que **sí** quedan abiertos a propósito: ninguno al final del B6 (el Apuntador abre su parte II en el B7).
- **Museo de tu partida:** pon los flags de las piezas del plan §11 (`b06_caso_prueba`, `b06_dialga_calmado`, `b06_ala`, `b06_eco_*`, `b06_chamota_*`). **No escribas el museo**; la sesión que conecte el bloque añade las piezas con el formato que exista entonces.
- **Marcadores:** un spot solo lleva «!» (`new`) si su guion empieza o cambia algo de verdad en ese estado. Para hablar sin avanzar nada, una variante de `talk` con su `cond`, sin comandos `quest`.
- **Arte:** objeto clave nuevo o `art` nuevo → descríbelo en la respuesta (forma y colores en 2 líneas); el pixel art lo pinta la sesión de arte. `penduloambar`, `alavencejo` y `pasetrentes` **ya tienen** su pixel art en `PX_ITEMS` (`app/js/art.js`).

### Lo que ya hace `comun.js` (escrito el 2026-10-23; precisiones para los tramos)

- **Enganche:** spot «🏙️ La Gira: convocatoria para Teselia» (`script: 'b06_inicio'`, `cond`/`new`: `flag.b05_fin && !flag.b06_inicio_hecho`) en `aldea_marina`, `kantai`, `hauoli`, `konikoni`, `azafran`, `puerta_alola`, `puerta_azafran`, `luminalia_plaza` y `puerta_trigal`. **T0** escribe `b06_inicio` (activa `b06_inicio_hecho` y `b06_m1` a `puerta`, y ofrece cruzar ya o más tarde) y el cruce: como en el B5 (`b05_cruce_aviso`), T0 pone con `patches` en las cuatro Puertas (`puerta_alola`, `puerta_azafran`, `luminalia_plaza`, `puerta_trigal`) un spot «Cruzar con la Gira a Teselia» con `cond: 'flag.b06_inicio_hecho && !flag.b06_puerta_teselia'`, que lleva a `puerta_teselia` y activa `b06_puerta_teselia`. Después, el «Cruzar a Teselia (Porcelana)» de `comun.js` sirve de vuelta.
- **Vuelos** (`extraSpots` de `comun.js`): en `porcelana`, `mayolica`, `esmalte`, `fayenza`, `teja` e `isla_libertad`, un «🦅 Volar a…» por cada destino, con `cond: 'flag.mount_aerodactyl && visited(destino)'`. Excepciones: **Isla Libertad** siempre (se descubre volando; T3 pone allí también la vuelta en Lapras si quiere) y **Teja** también con `quest.b06_m5 == "dragospiral"` (plan T5: «Ruta 6 o vuelo»). Esos seis lugares **tienen que existir** con esos ids o `index.js` avisa.
- **Pase del tren:** T1 da `{ give: 'pasetrentes' }` junto con `b06_pase_tren`.
- **MT de los premios de entrenamiento** (ya creadas en `comun.js`; ninguna se ha dado antes en el juego; dalas con `{ give }` en el guion del `prize`):
  - T1, Metro Batalla: `b06_mt_bola_voltio` (MT Bola Voltio, `electroball`; la aprende Ampharos).
  - T2, muralla norte de Chamota: `b06_mt_alud` (MT Alud, `avalanche`; Aurorus, Garganacl, Tyranitar, Feraligatr).
  - T3, el nido del valle: `b06_mt_pedrada` (MT Pedrada, `rockblast`; Aerodactyl, Archeops, Tyrantrum, Tyranitar).
  - T4 y T5: Megapiedras del juego, `feraligite` (Feraligatrita) y `salamencite` (Salamencita).
  - La tienda de MT de T4 (`b06_mt_fayenza`) **no** puede repetir estas tres ni ninguna MT ya dada (`grep -rhoE "tm: '[a-z]+'" app/content | sort -u`).
- **Negocio `b06_estudio`:** socia Renata; encargados Renata (siempre), `tia_rosa`, `nico_ferrer` y `simon` (`cond: 'flag.p7_simon || flag.b06_simon_antena'`). **T0 activa `b06_simon_antena`** cuando Simón sale por fin en antena (si la escena existe; si no, que lo diga en su respuesta). Imprevistos ya escritos: abogados (dos variantes según `b03_renata_publica`), un Zorua en los cables, una oyente sin nombre (gancho a Noa, desde `b06_t0_hecho`), **la cinta del episodio 3** (desde `b06_apuntador_1`; activa `flag.b06_cinta_ep3`, que T1/T5 pueden leer para una línea extra), «Buena audiencia» (carta del Apuntador, desde `b06_apuntador_1`) y Simón y la palabra «Leyendas». La entrada cuesta ₽25 000 y **no tiene guion** (`buy.script`): la escena de entrada la pone T0 en el spot si quiere.
- **Partes de `b06_s_chamota`:** el campanero en `campanario_chamota`, Celia en `panaderia_chamota`, la alcaldesa en `ayuntamiento_chamota`, **don Teodoro e Inés en `chamota`** (el pueblo). T2 pone sus spots ahí; si los quiere en otra sub-área, que lo diga para cambiar el `where`.
- **Aviso de ritmo:** `milestones: [{ flag: 'b06_m_aviso', hoursLeft: 3 }]` ya está en `comun.js`. T5 solo activa el flag.

### Piezas del Museo de tu partida (flags; el museo se engancha después)

Otro agente está haciendo el museo. **Ningún tramo escribe piezas**: basta con que existan estos flags, con estos nombres exactos.

| Pieza | Flags que la activan / cambian | Tramo |
|---|---|---|
| Recorte enmarcado «Nuevo colaborador en *Casos Fríos*» | `b06_caso_prueba`; segunda línea «Primer acto para nosotros» con `b06_apuntador_vencido_1` | T0 / T5 |
| Réplica del Péndulo de ámbar con huella de Archen | `b06_dialga_calmado` (la huella solo si `b06_archen`) | T3 |
| Ala de vencejo en vitrina | `b06_ala` | T5 |
| La primera página del Diario | una de `b06_eco_purgado` / `b06_eco_reformado` / `b06_eco_doble` | T5 |
| (Opcional) Crónica de la Noche Blanca | una de `b06_chamota_cronica` / `b06_chamota_privado` / `b06_chamota_calla` | T2 |

## Qué va en cada archivo

| Archivo | Quién | Qué |
|---|---|---|
| `index.js` | sesión que coordina | Región `teselia` (con `land`), `hours: 16`, `ends: 'b06_fin'`, mismo bucle de partes que el B5 (`comun`, `t0`…`t5`), `extraSpots` y `patches` acumulados |
| `npcs.js` | sesión que coordina | Los NPCs de arriba con `look` (brief de 3 rasgos cada OC) |
| `misiones.js` | sesión que coordina | `b06_m1`…`b06_m5` (principales), hilos `b06_t_renata`, `b06_t_apuntador`, `b06_t_ulises`, `b06_t_petra`, `b06_t_vencejos`, `b06_t_camille`, `b06_t_bastien`, `b06_t_kaori`, `b06_t_noa`; secundarias `b06_s_iniciales` (con `parts`), `b06_s_chamota` (con `parts`: los 5 testigos), `b06_s_larvesta`. Etapas exactas abajo |
| `comun.js` | sesión que coordina | Medallas, objetos compartidos, tiendas, retos de gimnasio, enganche de inicio (`b06_inicio` en Alola, Kanto, Kalos y Johto), cruces de Puerta a Teselia, vuelos con Aerodactyl, negocio `b06_estudio`, aviso de ritmo `b06_m_aviso` |
| `t0-porcelana.js` … `t5-dragospiral.js` | un subagente por tramo | Lugares, guiones, entrenadores, retos, `gather`, objetos propios y `patches` de su tramo |

### Etapas de las misiones (los tramos las usan tal cual)

- `b06_m1` «Rumbo a Teselia»: `puerta` → `porcelana` → `hecha` (T0).
- `b06_m2` «Luces de Mayólica»: `mayolica` → `gimnasio` → `hecha` (T1).
- `b06_m3` «Lo que late a destiempo»: `esmalte` → `cabina` → `valle` → `hecha` (T3).
- `b06_m4` «El frío de Fayenza»: `fayenza` → `almacen` → `hecha` (T4).
- `b06_m5` «La voz del narrador»: `tejados` → `revelacion` → `dragospiral` → `hecha` (T5).
- `b06_t_renata` «Casos Fríos: el ingeniero»: `olmedo` (T0) → `hecha` (T4).
- `b06_t_apuntador` «Desde la concha»: `noria` (T0) → `espera` (T1) → `trampa` (T4) → `segundo` + `done` (T5).
- `b06_t_ulises` «La cabina azul (V)»: `cabina` → `hecha` (T3). `b06_t_petra` «El ámbar sin registro (V)»: `museo` → `hecha` (T3).
- `b06_t_vencejos` «Plumas en el tejado (V)»: `operacion` → `hecha` (T5).
- `b06_t_camille` «El saque»: `estadio` → `hecha` (T1).
- `b06_t_bastien` «Letra pequeña (VI)»: `metro` (T1, rama `rompe`) o `almacen` (T4, rama `sigue`) → `hecha`.
- `b06_t_kaori` «Dulce veneno (V)»: `almacen` → `hecha` (T4). `b06_t_noa` «Las jaulas (VI)»: `buzon` → `hecha` (T4).
- `b06_s_iniciales` «Los tres de Teselia»: `buscar` → `hecha` (`parts`: Oshawott `muelle_porcelana`, Tepig `musical_mayolica`, Snivy `museo_esmalte`; done `flag.b06_oshawott` / `b06_tepig` / `b06_snivy`).
- `b06_s_chamota` «La Noche Blanca»: `testigos` → `decreto` → `campanario` → `hipotesis` → `verdad` → `hecha` (`parts`: los 5 testigos).
- `b06_s_larvesta` «Arena caliente»: `huevo` → `hecha` (T1; el huevo eclosiona al avanzar, o se da a nivel bajo su evolución con escena).

## Para validar sin publicar

El B6 **no** está en `BLOCKS`. Para cargarlo en las herramientas:

```
INFINITO_EXTRA=b06 node herramientas/validar.mjs
INFINITO_EXTRA=b06 node herramientas/recorrido.mjs --semilla 3 --hasta b06_t0_hecho
```

Errores esperados mientras se escriben los demás tramos: lugares, entrenadores y guiones de otros tramos que aún no existen (`museo_esmalte` en las `parts` de los iniciales, etc.). Arregla **todos** los de tu archivo.

## Duraciones meta por tramo (suman ~16 h)

T0 2 h 30 · T1 2 h 30 · T2 2 h 30 (opcional) · T3 3 h · T4 2 h 45 · T5 3 h 15. Pon `est` en minutos en las misiones de tu tramo para que el Game Designer lo cuente.
