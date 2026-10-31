# Encargo para escribir un tramo del Bloque 7

**Las reglas generales son las mismas que en el B2–B6:** lee `secreto/bloques/b02-encargo.md` entero (qué leer, qué entregar, reglas de calidad, validación, técnica y respuesta final) y `secreto/bloques/b06-encargo.md`, y aplícalas cambiando «B6» por «B7», el prefijo `b06_` por `b07_` y la carpeta `app/content/b06/` por `app/content/b07/`. Aquí cambian el plan, los contratos y algunas reglas nuevas.

**Rama:** `trabajo/b07`. El B7 **no** está en `BLOCKS` y no se publica hasta el paso 6 (`secreto/bloques/b07-avance.md`).

## Lee además

1. `secreto/bloques/b07-plan.md` **entero** (tu tramo y los demás, para saber qué hacen). La pérdida de Noa (§6.1) y la gran decisión (§6.2) se leen aunque no sean tu tramo: nadie las adelanta.
2. `CLAUDE.md` §2.4 entero (hilos que se cierran al terminar su parte, cinemáticas con `docs/CINE.md`, minijuegos con `docs/MINIJUEGOS.md`, premio del instructor, `parts`, cartas con `read`, `new` en sitios nuevos de zonas viejas, `owns()` antes de regalar, marcadores solo si el guion cambia algo). Y la nota de `secreto/progreso.md` del 2026-10-11: **ningún personaje aparece porque sí** (origen y motivo para dirigirse al jugador).
3. `docs/CONTENIDO.md` (formato; §13 negocios, §15 Buzón, §21 casos), `docs/CINE.md` y `docs/MINIJUEGOS.md`.
4. El **B6** (`app/content/b06/`): sobre todo `t5-dragospiral.js` (el final, `b06_fin`, el Diario por rama, el mensaje de Ansel), `t1-mayolica.js` (Tadeo, Camille, la noria: estilo del Apuntador), `t17-casos.js` (motor de casos: T2) y `t10-serafina.js` (condiciones `SERA_*`: T5). Y las secciones del B6 de `secreto/registro.md` y «Estado tras el B6» de `secreto/hilos.md`.
5. La biblia: §3 (sobre todo §3.2–3.5), §5 (Acto VI), §9 (pérdidas: la del Acto VI es Noa).
6. `secreto/personajes.md` y `secreto/candidatas.md` (voces). Rhi: jerga de fútbol, apodos, grita cuando está feliz. Renata: «Cool, cool, cool», «Nota para el episodio». Kaori: seca, monótona, se emociona con venenos. Lola: brusca y cálida, de cuentas claras, «Fiado no». Nate: «Qué flojera». Noa: amable, asustada, cuenta cosas. Xero: «¡Bwahaha!», ego científico. Quintana: libretas, no cree en héroes. Philippe: «Phil-osofía».
7. Ya escritos para el B7 (no los edites; si falta algo, dilo en tu respuesta): `app/content/b07/npcs.js`, `misiones.js`, `comun.js`, `index.js`.
8. Tablas canon: `secreto/ref/encuentros-galar.json` (claves abajo). **Sube los niveles** a la curva del plan (§1).
9. **Nombres oficiales (comprobados en WikiDex, 2026-10-30):** plan, cabecera. **Macrocosmos** en una palabra. «Incursión Dinamax», «nido». Pokémon y movimientos: siempre el `name` de `app/data/`.

## Lo que sabemos de la partida de Mario (escribe igualmente todas las ramas)

- Último dato (2026-10-23): final del B4. Desde entonces se publicaron el B5 y el B6. Equipo que hay que priorizar: Ampharos «Candela», Aurorus, Tyrantrum, Garganacl, Pupitar (o Tyranitar), Aerodactyl, y **Lucario** (central: tiene que lucirse). En cajas: Typhlosion, Delphox, Gengar, Scizor, Feraligatr, Annihilape, Aegislash, Krookodile, Gyarados, Roserade, Haxorus, Luxray, Shelgon, Absol, **Meganium**, Victreebel, Golett, Machamp, Snorlax, Wooloo…
- Flags suyos conocidos: `b01_trato_sera`, `b01_prensa_lemnis`, `b01_bastien_cubierto` (Bastien **leal**), `b02_frag_melia`, `b03_rancho_sobrina`, `b03_rocket_libres`, `b03_renata_espera`, `b03_vencejo_pluma`. **No sabemos** las del B4 (Lebrun), B5 (luz, Bastien, Skull), B6 (Eco, Chamota, Zorua): escribe todas.
- Afinidades en el B4: Kaori 43, Rhi 33, Lila 27, Renata 21, Irene 20, Sera 13 (+ Leilani del B5; Kaori puede ir por encima de 60 por la botica).
- El compañero es Lucario. Usa `{riolu}` y la condición `inParty("riolu") || inParty("lucario")` (constante `LUC`) cuando una escena dependa de que esté en el equipo.
- Monturas: Rhyhorn, Lapras y **Aerodactyl** (vuelos). `comun.js` ya pone los vuelos por Galar.
- **Le encantan:** misterios noir con pistas justas, NPCs que vuelven 3+ veces, secundarias grandes (1,5–2 h), que **fallar abra un camino** en vez de bloquear, facciones con rangos, decidir con matices y el patrón *personaje entrañable → objeto clave con cara → abre una zona*. **No le gusta:** dos Pokémon de la misma línea; misiones abiertas sin nada que hacer; personajes que aparecen sin motivo.

## Mecánicas

- **Mega:** la tiene. **Z:** la tiene (no es región Z: no la uses salvo guiño). **Dinamax:** se la da **T0** (`{ give: 'dynamaxband' }` + `{ unlock: 'dynamax' }`). **Tera:** nunca en el jugador; solo salvajes de Fisura (`gimmick: 'tera'`). **Una mecánica por combate.**
- **Dinamax/Gigamax enemigo:** en un miembro del equipo, `gimmick: 'dynamax'` en el entrenador con `ace` y, para Gigamax, `gmax: true` en ese miembro (Percy, Rhi, Roy, Olivia). Si el validador o la prueba de combate dicen que el rival no lo usa, avísalo: lo arregla el paso 5 (motor).
- **Pokémon únicos:** todo `wild` capturable de un guion es único. Eternatus: `onCatch` con `{ set: { 'flag.b07_eternatus_tuyo': true } }`. Los `wild` de práctica (prueba de la Maximuñequera, nidos): `noCatch: true` o `unique: false`.
- **Regalos:** `owns()` de **toda la línea** antes de dar un Pokémon. Si ya la tiene, el Pokémon se queda en el sitio (flag `_vive`) y se le puede visitar.

## Contratos compartidos (no los cambies)

### Región y mapa

`galar` ya está declarada en `index.js` (mapa 100 × 140). Coordenadas de primer nivel; las sub-áreas llevan `parent` (no salen en el mapa).

| Tramo | Lugares nuevos |
|---|---|
| T0 | `par` (52,124, town, «Pueblo Par»), sub-áreas con `parent: 'par'`: `puerta_galar` («Puerta Lemnis de Galar», en el andén 2 de la estación), `estacion_par` («Estación de Par»), `recepcion_gira_gal` (se cierra con `cond` tras la escena), `lab_sonia` («Laboratorio de Sonia»). `gal_ruta2` (60,116, ruta «Ruta 2», `from: 'par'`, `to: 'casa_magnolia'`, ~5 tramos, hierba; `branch` en un tramo a `lago_ruta2`), `lago_ruta2` (`parent: 'gal_ruta2'`, kind `area`, «Lago de la Ruta 2»: Sobble y pesca diaria), `casa_magnolia` (66,110, kind `area`, «Casa de la Prof. Magnolia», `links: ['gal_ruta2']`: la Maximuñequera). |
| T1 | `area_silvestre` (50,104, ruta «Área Silvestre», `from: 'par'`, `to: 'piston'`, ~8 tramos, hierba; `branch` a `pradera_radiante`, `lago_axew` y `nido_pradera`), sub-áreas con `parent: 'area_silvestre'`: `pradera_radiante` («Pradera Radiante»: cosecha diaria con Maxisetas raras, Tera de Fisura), `lago_axew` («Lago Axew»: pesca diaria), `nido_pradera` («Nido de la Pradera»: **zona de entrenamiento**, tope 69, premio `b07_mt_ala_bis`). `piston` (62,92, city, «Ciudad Pistón»), sub-áreas con `parent: 'piston'`: `estadio_piston` (Apertura y marcador; el gimnasio está «en obras de temporada»), `estacion_piston` (Agnes; spots de tren a Plié y a Crampón), `piston_talleres` («Calle de los talleres»: herrera, relojero, tintorera, carpintero y Grookey; tienda `taller_oficios`), `curri_piston` («La taberna de curri»: Priya y Gaspar), `calderas_piston` («Las calderas»: Naboru). |
| T2 | `plie` (10,50, town, «Pueblo Plié»; se llega en tren desde `estacion_piston`, `links: ['bosque_lumirinto']`), sub-áreas con `parent: 'plie'`: `posada_plie` (visitantes, el sótano del fotógrafo), `estadio_plie` (Sally: su gimnasio, cerrado por la temporada; ella está). `bosque_lumirinto` (14,56, ruta de bosque «Bosque Lumirinto», `from: 'plie'`, `to: 'casa_siete'`, ~5 tramos, oscuro, setas luminosas), `casa_siete` (18,62, kind `area`, «La Casa de las Siete Puertas», `links: ['bosque_lumirinto']`), sub-áreas con `parent: 'casa_siete'`: `casa_vestibulo` (Sala Primera y el banco), `casa_salas` (Salas Segunda a Sexta), `casa_septima` (Séptima: el sillón; puzle), `casa_jardin` (Puerta Sexta; rastreo). Todas las entradas del interior con `cond` sobre la etapa de `b07_s_casa`. |
| T3 | `gal_ruta3` (58,86, ruta «Ruta 3», `from: 'piston'`, `to: 'mina_galar'`, ~5 tramos), `mina_galar` (48,82, ruta de cueva «Mina de Galar», `from: 'gal_ruta3'`, `to: 'gal_ruta4'`, ~6 tramos; Petra en un tramo; excavación diaria), `gal_ruta4` (38,80, ruta «Ruta 4», `from: 'mina_galar'`, `to: 'hoyuelo'`, ~4 tramos), `hoyuelo` (28,78, town, «Pueblo Hoyuelo»), sub-áreas con `parent: 'hoyuelo'`: `casa_rhi` («Casa de los Hargreave»), `estadio_hoyuelo` («Estadio de Hoyuelo»: gimnasio de Percy y el combate de noche con Rhi), `campo_hargreave` («El Campo»: negocio `b07_campo`), `terrazas_hoyuelo` («Terrazas de Hoyuelo»: **zona de entrenamiento**, tope 70, premio Meganiumita; cosecha diaria). Bloqueo de la Ruta 3 hasta `flag.b07_t1_hecho`. |
| T4 | `crampon` (90,46, town, «Pueblo Crampón»; se llega en tren desde `estacion_piston` con `cond: 'flag.b07_t3_hecho'`, sin `links`), sub-áreas con `parent: 'crampon'`: `callejon_crampon` («El callejón del gimnasio»: **zona de entrenamiento**, tope 71, premio `b07_mt_desahogo`; Kaori), `cripta_crampon` («La Cripta»: el torneo, de noche), `trastienda_cripta` (Xero al teléfono; la caja de caudales). Encuentros de las afueras con un spot `explore`. |
| T5 | `area_norte` (54,76, ruta «Área Silvestre (norte)», `from: 'piston'`, `to: 'artejo'`, ~6 tramos; `block` en el tramo 1 hasta `flag.b07_t4_hecho`; `branch` a `lago_enfado`), `lago_enfado` (`parent: 'area_norte'`, kind `area`, «Lago del Enfado»: Dreepy raro, excavación de la Cuenca Polvorienta o pesca), `artejo` (50,62, city, «Ciudad Artejo»; **onEnter primera vez → `b07_m_aviso`**), sub-áreas con `parent: 'artejo'`: `estadio_artejo` (Roy), `cornisa_artejo` («Cornisa de Artejo»: **zona de entrenamiento**, tope 72, premio `b07_mt_vasto_impacto`), `muralla_artejo` (A.Z. y Octavia al amanecer), `planta_artejo` (kind `building`, «Planta Eléctrica»; abre con `quest.b07_m5 == "planta"`), y con `parent: 'planta_artejo'`: `planta_jaulas` («Emplazamiento 06»: jaulas, Lucien, Noa; se cierra con `cond` tras la escena), `planta_archivo` (expediente de Dufresne; informe de Octavia), `planta_cima` (Olivia y Eternatus; kind `area`). |

**Conexiones (`links`):** par–gal_ruta2–casa_magnolia · par–area_silvestre–piston–gal_ruta3–mina_galar–gal_ruta4–hoyuelo · piston–area_norte–artejo · plie–bosque_lumirinto–casa_siete. Cada ruta declara `links` con sus dos extremos y `route.from`/`route.to` iguales.

**Viajes que no son `links` (spots `go`):**
- **T0**, con `patches` en `puerta_teselia`, `puerta_alola`, `puerta_azafran`, `luminalia_plaza` y `puerta_trigal`: «Cruzar con la Gira a Galar» (`cond: 'flag.b07_inicio_hecho && !flag.b07_puerta_galar'`, guion `b07_cruce`, que activa `b07_puerta_galar` y lleva a `puerta_galar`) y, para volver después, «Cruzar a Galar (Par)» (`cond: 'flag.b07_puerta_galar'`, `action: { go: 'puerta_galar' }`). En `puerta_galar`: «Cruzar a Teselia (Porcelana)», «… a Alola (Hauoli)», «… a Kanto (Azafrán)», «… a Kalos (Luminalia)», «… a Johto (Trigal)», todas con `cond: 'flag.b07_puerta_galar'`. (El enganche `b07_inicio` ya está escrito en `comun.js`: activa `b07_inicio_hecho` y `b07_m1` a `puerta`.)
- **T1**, en `estacion_piston`: «🚆 Tren a Pueblo Plié» → `plie` (`cond: 'flag.b07_t1_hecho'`) y «🚆 Tren a Pueblo Crampón» → `crampon` (`cond: 'flag.b07_t3_hecho'`, `new: 'quest.b07_m4 == "crampon"'`). **T2** pone en `plie` «🚆 Tren a Pistón»; **T4** pone en `crampon` «🚆 Tren a Pistón».
- **Vuelos** (`comun.js`, con `flag.mount_aerodactyl && visited(destino)`): «🦅 Volar a…» en `par`, `piston`, `hoyuelo`, `plie`, `crampon` y `artejo`. **No los dupliques.** Esos seis lugares **tienen que existir** con esos ids o `index.js` avisa.

### Encuentros (claves de `secreto/ref/encuentros-galar.json`)

| Lugar | Claves |
|---|---|
| `par`, `gal_ruta2`, `lago_ruta2` | `wedgehurst`, `galar-route-2/main`, `galar-route-2/lake`, `galar-route-2/lakeside` |
| `area_silvestre`, `pradera_radiante`, `lago_axew`, `nido_pradera` | `rolling-fields/main`, `dappled-grove`, `west-lake-axewell`, `east-lake-axewell`, `axews-eye`, `south-lake-miloch/main`, `giants-seat`, `watchtower-ruins` |
| `piston` (afueras) | `motostoke-riverbank`, `motostoke/main` |
| `bosque_lumirinto`, `casa_jardin` | `glimwood-tangle` |
| `gal_ruta3` | `galar-route-3/east`, `galar-route-3/west` |
| `mina_galar` | `galar-mine` (y `galar-mine-no-2` de apoyo) |
| `gal_ruta4`, `hoyuelo`, `terrazas_hoyuelo` | `galar-route-4`, `turffield` |
| `crampon` (afueras) | `galar-route-9/outer-spikemuth`, `spikemuth` |
| `area_norte`, `lago_enfado` | `bridge-field`, `stony-wilderness/main`, `dusty-bowl`, `giants-cap/main`, `hammerlocke-hills`, `lake-of-outrage` (Dreepy ≤ 3 %, nv 66) |
| `artejo`, `cornisa_artejo` | `hammerlocke`, `hammerlocke-hills` |

Niveles: §1 del plan. **Desplazados** (`displaced: true`): de Teselia (la última Puerta) o de Sinnoh (adelanto del Acto VII), pocos y con sentido. Las tablas de nidos (`*/max-den-*`) sirven de inspiración para los `wild` con Dinamax de los nidos de T1.

### Entrenadores con id fijo

| Tramo | Ids |
|---|---|
| T0 | entrenadores de la Ruta 2 (sin prefijo, que no choquen: mira `secreto/registro-auto.md`). La prueba de la Maximuñequera es un `wild` (`noCatch`, nv 66, `gimmick: 'dynamax'`). |
| T1 | `nido_1`…`nido_3` (zona de entrenamiento), entrenadores del Área Silvestre, `naboru_oficio` (npc `naboru`, opcional, amistoso, Fuego, as 69, cura antes), `herrera_oficio` (npc genérico `maestro_oficio` con `as: 'La herrera'`, opcional, Copperajah 68), `carpintero_oficio` (ídem), `tintorera_oficio` (ídem) |
| T2 | `sally_quiz` (npc `sally`, opcional, amistoso con preguntas, as 69, cura antes). Sin combates obligatorios. |
| T3 | `rhi_7` (npc `rhi`, 6 Pokémon, as **70** Cinderace con `gmax: true`, `gimmick: 'dynamax'`, `ace: 'cinderace'`, 2 objetos; cura antes; repetible como revancha con `b07_rhi_revancha`), `nate_1` (npc `nate`, opcional, as 69), `percy_g` (npc `percy`, `cls: 'Líder'`, Planta, 5 Pokémon, as **69** Eldegoss con `gimmick: 'dynamax'`, `ace: 'eldegoss'`, 2 objetos), `terraza_1`…`3`, entrenadores de las Rutas 3 y 4 y de la Mina |
| T4 | `torneo_r1`…`torneo_r3` (genéricos `exvillano` con `as`, 69–70), `torneo_flare` (opcional, Mega-Pyroar 70, `item: 'pyroarite'`), `torneo_aqua` (opcional, Mega-Sharpedo 70, `item: 'sharpedonite'`), `lola_torneo` (npc `lola`, as 70, cura antes), `bastien_8` (npc `bastien`, solo rama `rompe`, Mega-Greninja 70, cura antes), `torneo_final` (npc `seguridad_macro` con `as: 'El Campeón sin nombre'`, jefe de trama, 5 Pokémon, as **71**, 2 objetos, sin mecánica, `heal: true` antes), `callejon_1`…`3` |
| T5 | `roy_g` (npc `roy`, `cls: 'Líder'`, Dragón, 5 Pokémon, as **72** Duraludon con `gmax: true`, `gimmick: 'dynamax'`, `ace: 'duraludon'`, 2 objetos), `cornisa_1`…`3`, seguridad de Macrocosmos de la Planta (`macro_1`…), `olivia_1` (npc `olivia_mc`, jefa de trama, **6** Pokémon, as **73** Garbodor con `gmax: true` y `gimmick: 'dynamax'` como demostración, 2 objetos; `lose: 'continue'` con revancha y `heal: true`), sin id: el `wild` de Eternatus (nv 72) |

**Regla:** todo combate contra un personaje con nombre ofrece curar antes (pociones del NPC o el Centro). Los jefes de trama, además, con `heal: true` si no hay Centro a mano. Torneo: curación entre rondas.

### Flags y objetos que otros leen

| Tramo | Debe activar / dar |
|---|---|
| T0 | `b07_puerta_galar` (en `b07_cruce`) · `b07_llegada` (onEnter de `par`) · `b07_m1` a `par` y luego `hecha` · `b07_recepcion` · `b07_odile` · `b07_rhi_anden` · `b07_lucien_aviso` + `{ set: { 'vars.lucien_viaje': 1 } }` (mensaje de Philippe) · `b07_maximunequera` (`{ give: 'dynamaxband' }`, `{ unlock: 'dynamax' }`, cinemática 1) · `b07_sobble` o `b07_sobble_vive` (`b07_s_iniciales` a `buscar` la primera vez) · con `b06_eco_doble`: `b07_ansel_colega` (mensaje `cartaanselgalar`, `read`) y `b07_doble_cuenta_t0` / `b07_doble_calla_t0` · `b07_m2` a `area` · `b07_t0_hecho` |
| T1 | `b07_area_silvestre` · `b07_tera_visto` (opcional) · `b07_piston_llegada` · `b07_m2` a `apertura` · `b07_apertura` · `b07_mireille_galar` · `b07_renata_galar` · `b07_tadeo_galar` · `b07_t_apuntador` a `estadio` y luego `hecha` · `b07_marcador` · una de `b07_apuntador_vencido_2` / `b07_apuntador_gana_2` · `b07_apuntador_4` (`cartaapuntador4`) · `b07_coartada_rota` (opcional) · `b07_grookey` o `b07_grookey_vive` · `b07_s_oficios` a `maestros` (al hablar con el primer maestro) · `b07_oficio_herreria`, `_relojeria`, `_tintoreria`, `_carpinteria`, `_aguja`, `_curri`, `_calderas` · `b07_oficios_hecho` (`{ give: 'sellooficios' }`) · `b07_oficios_siete` · `b07_gaspar_curri` · `b07_sopa_maxi` (la receta; efecto en el paso 5) · `b07_m2` a `hecha`, `b07_m3` a `hoyuelo` · `b07_t1_hecho` |
| T2 | `b07_casa_carta` (mail de Quintana) · `b07_plie_llegada` · `b07_s_casa` por sus etapas · `b07_viajero_novia`, `_novio`, `_nino`, `_abuela`, `_excursionista`, `_fotografo`, `_hincha` · `b07_sally` · `b07_casa_dentro` · motor: `b07_casa_resuelto` / `b07_casa_fallido` · una de `b07_casa_devuelve` / `b07_casa_lectura` / `b07_casa_quintana` (si se resuelve) · objetos `cuentovane`, `fotogrupocasa` · `b07_t2_hecho`. **T2 es opcional:** nada del camino principal puede leer sus flags salvo para variantes. |
| T3 | `b07_petra_mina` · `b07_fosil_dracozolt`, `_arctozolt`, `_dracovish`, `_arctovish` · `b07_hoyuelo_llegada` · `b07_t_rhi` a `casa` → `estadio` → `hecha` · `b07_casa_rhi` · `b07_padre_rhi` · `b07_campo` (abre el negocio) · `b07_nate` · `b07_scorbunny` o `b07_scorbunny_vive` · `b07_rhi_combate` (tras `rhi_7`, gane o pierda) · `b07_rhi_vencida_7` (si ganas) · `b07_rhi_momento` (af ≥ 45) · `b07_rhi_peticion` (af ≥ 70) · `b07_rhi_dolida` / `b07_rhi_reparada` · `b07_meganiumita` (premio de las terrazas) · `b07_gym_hoyuelo_visto` · tras Percy: `{ badge: 'medalla_planta' }`, `{ cap: 70 }`, `b07_percy_vencido` · `b07_m3` a `gimnasio` y luego `hecha`, `b07_m4` a `crampon` · `b07_t3_hecho` |
| T4 | `b07_crampon_llegada` · `b07_nerio` · `b07_m4` a `torneo` · `b07_pista_combate`, `b07_pista_personal`, `b07_pista_dinero` (dos bastan) · `b07_lola_torneo` · `b07_lola_confiesa` + una de `b07_lola_testigo` / `b07_lola_crampon` / `b07_lola_vuelve` · `b02_t_lola` con `done` · `b07_t_lola` a `torneo` → `hecha` · `b07_t_kaori` a `torneo` → `hecha`, `b07_kaori_torneo`, `b07_kaori_momento` (af ≥ 45), `b07_kaori_peticion` (af ≥ 70, objeto `cuadernokaori`) · `b07_t_bastien` a `torneo` → `hecha` (solo rama `rompe`), `b07_bastien_torneo` · `b07_xero_anfitrion` · `b07_torneo_ganado` (si ganas la final) · `b07_libro` (`librotorneo`) + una de `b07_libro_policia` / `b07_libro_prensa` / `b07_libro_octavia` · `b07_noa_mensaje` (`b07_t_noa` a `mensaje`) · tras la final: `{ cap: 72 }` · `b07_m4` a `hecha`, `b07_m5` a `artejo` · `b07_t4_hecho` |
| T5 | `b07_m_aviso` (onEnter de `artejo`, primera vez) · `b07_artejo_llegada` · `b07_gym_artejo_visto` · tras Roy: `{ badge: 'medalla_dragon' }`, `{ cap: 73 }`, `b07_roy_vencido` · `b07_m5` a `gimnasio` → `planta` → `hecha` · `b07_t_bastien` a `planta` → `hecha` (rama `sigue`) · `b07_magda` · `b07_t_lucien` a `buscar` → `hecha`, `b07_lucien_encontrado`, `{ set: { 'vars.lucien_viaje': 0 } }` · `b07_noa_jaulas`, `b07_noa_adios` (`notanoa`), `b07_t_noa` a `hecha` · `b07_bastien_llega` / `b07_bastien_tarde` · `b07_merengue_campo` / `b07_merengue_lucien` · `b07_olivia_vencida` · `b07_eternatus_visto` (+ `b07_eternatus_tuyo` en `onCatch`) · `b07_octavia` · `b07_t_octavia` a `cita` → `hecha` · una de `b07_octavia_dentro` / `b07_octavia_publica` / `b07_octavia_testigo` (+ `b07_doble_delata_octavia` si aplica) · `b07_lila_expediente_enviado` / `_guardado` (`expedientedufresne`) · `b07_sera_llamada` · `b07_az_artejo` · `{ cap: 74 }` · retos `jefe_torneo` (T4) y `jefe_olivia` (T5) en sus `challenges` · `b07_fin` (último guion del bloque, con `{ save: true }`; anuncio de **Sinnoh** y de la Copa) |

### Contrato del Diario (todos los tramos)

El motor **no** adapta las entradas nuevas a la rama del Eco. **Cada `diary` del B7 va tres veces** (plan §4):

```js
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';     // Rotom de verdad: frases cortas, alguna falta, sin «¡Bzzt!»
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado'; // voz de siempre, completa, y al final: *(Omitido: nada.)*
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';          // alegre e incompleta (la lee Lemnis)
```

Las líneas de Rotom fuera del Diario también cambian con `b06_eco_purgado` (más simple, sin exclamaciones), como en `comun.js` (`b07_inicio`). Modelo: el final de `b06/t5-dragospiral.js`.

### Contrato del Apuntador (T1; plan §5)

- Firma «Desde la concha»; máquina de escribir con la «e» medio borrada; papel color crema de programa de teatro.
- **Solo sabe lo que se dijo en antena.** Marca con `// EN ANTENA` las frases de Renata que el Apuntador puede usar y `// FUERA DE MICRO` las que no.
- Ventajas con mecanismo: directo de los martes · horarios públicos (aquí: la **escaleta** colgada en el tablón y la ventanilla de mensajes del marcador, que se programan al minuto) · Chatot del atrezo · mensajero pagado una vez.
- **No se revela quién es.** Tadeo sale amable y con coartada de horario; la coartada no sirve porque los mensajes estaban programados (pista para el B8, nadie lo dice en voz alta).
- Objetos: `cartaapuntador4` (`pocket: 'key'`, `read`), `escaletaapertura` y `recibomarcador` (`read`).

### Contrato de la pérdida y de la gran decisión (T5; T4 solo planta el mensaje)

- Nadie antes de T5 dice que Noa va a morir ni lo insinúa más de lo que ya está plantado. T4 solo entrega su mensaje.
- Reglas de la biblia §9.1: inevitable, fuera de plano, en silencio, sin humor en la escena, duelo que dura. Las decisiones cambian **quién está y qué se dice**.
- La gran decisión es la de Octavia (plan §6.2), con aviso claro de que no tiene vuelta atrás. Sin respuesta correcta.

### Otras piezas existentes

- **Medallas (`comun.js`):** `medalla_planta` (Percy, Planta) y `medalla_dragon` (Roy, Dragón).
- **Objetos (`comun.js`):** `sellooficios` (clave), `b07_mt_ala_bis`, `b07_mt_desahogo`, `b07_mt_vasto_impacto` (premios de entrenamiento), y los del Buzón. Del juego: `dynamaxband`, `meganiumite`, `pyroarite`, `sharpedonite`, `greninjite`, `maxmushrooms`, `fossilizedbird`, `fossilizedfish`, `fossilizeddrake`, `fossilizeddino`. Crea en tu archivo los objetos que necesites (cartas, notas, `art`, documentos). **Ids de objeto sin guiones bajos** si van al Buzón (`mail.item` se busca tal cual: `cartaanselgalar`, no `carta_ansel_galar`).
- **Tiendas (`comun.js`):** `tienda_par`, `tienda_piston`, `tienda_hoyuelo`, `tienda_crampon`, `tienda_artejo` y `taller_oficios` (T1 la pone como spot en `piston_talleres`). Ponlas como spot en tus ciudades.
- **Retos (`comun.js`):** `gym_hoyuelo` (Percy) y `gym_artejo` (Roy), con `trainer: 'percy_g'` / `'roy_g'` (index.js los quita con aviso mientras no existan). Si quieres añadir `info`, repite el id del reto en tu archivo: index.js mezcla los campos. Los demás (`jefe_torneo`, `jefe_olivia`, fichas de las zonas de entrenamiento, `caso_casa`), en tu archivo.
- **Negocio (`comun.js`):** `b07_campo` (El Campo de los Hargreave), con `loc: 'campo_hargreave'`. T3 pone el spot `{ venture: 'b07_campo' }` y activa `flag.b07_campo`; T5 puede añadir un imprevisto de Merengue repitiendo el id en `ventures` (se suman las listas). Encargados: Gareth, Rhi (`b07_rhi_combate`), Nate (`b07_nate`), Mireille (`b07_mireille_galar`).
- **Buzón (`comun.js`):** `b07_eco_terron` (Kalena), `b07_eco_ines`, `b07_eco_camille`. T2 añade el de Quintana (`b07_casa_carta`).
- **Aviso de ritmo:** ya está en `comun.js`. T5 solo activa `b07_m_aviso`.
- **NPCs nuevos (`npcs.js`):** canon `sonia`, `magnolia`, `percy`, `roy`, `nerio`, `naboru`, `sally`, `lionel`, `olivia_mc`; OC `octavia`, `padre_rhi`, `priya`, `agnes`, `ottilie`, `maren`; genéricos `vecino_galar`, `hincha_yell`, `seguridad_macro`, `minero_galar`, `maestro_oficio`, `exvillano`, `viajero_casa`. Siguen disponibles todos los anteriores (`rhi`, `nate`, `renata`, `nico_ferrer`, `tia_rosa`, `tadeo`, `lola`, `bastien`, `kaori`, `xero`, `noa`, `lucien`, `madre_lucien`, `handsome`, `magda`, `olmedo`, `quintana`, `gaspar`, `philippe`, `mireille`, `odile`, `petra`, `alexia`, `sera`, `lila`, `leilani`, `az`, `ansel`, `rotom`…).
- **Misiones del B7:** `app/content/b07/misiones.js`. Avánzalas con sus etapas exactas. **Cada hilo se cierra al terminar su parte.** Hilos que quedan abiertos a propósito al final del B7: ninguno.
- **Museo:** no lo escribas. Pon los flags de las piezas (plan §11) con esos nombres exactos; el paso 5 escribe `t6-museo.js`.
- **Marcadores:** un spot solo lleva «!» (`new`) si su guion empieza o cambia algo de verdad en ese estado. Para hablar sin avanzar nada, una variante de `talk` con su `cond`, sin comandos `quest`.
- **Arte:** objeto clave nuevo o `art` nuevo → descríbelo en tu respuesta (forma y colores en 2 líneas). Pendientes ya: `sellooficios` (chapa de latón con siete muescas y una cinta roja) y `fotomudsdale` (`art: 'mudsdale_abrevadero'`).

### Etapas de las misiones (los tramos las usan tal cual)

- `b07_m1` «Andén de Par»: `puerta` (comun) → `par` → `hecha` (T0).
- `b07_m2` «El marcador»: `area` (T0) → `apertura` → `hecha` (T1).
- `b07_m3` «La delantera»: `hoyuelo` (T1) → `gimnasio` → `hecha` (T3).
- `b07_m4` «Los que pagan»: `crampon` (T3) → `torneo` → `hecha` (T4).
- `b07_m5` «Ego»: `artejo` (T4) → `gimnasio` → `planta` → `hecha` (T5).
- `b07_t_apuntador` «Desde la concha (II)»: `estadio` → `hecha` (T1).
- `b07_t_rhi` «La delantera (VI)»: `casa` → `estadio` → `hecha` (T3).
- `b07_t_lola` «La arrepentida (IV)»: `torneo` → `hecha` (T4). Al abrirla, cierra `b02_t_lola` (`{ quest: 'b02_t_lola', done: true }`).
- `b07_t_kaori` «Dulce veneno (VI)»: `torneo` → `hecha` (T4).
- `b07_t_bastien` «Letra pequeña (VII)»: `torneo` (T4, rama `rompe`) o `planta` (T5, rama `sigue`) → `hecha`.
- `b07_t_noa` «Las jaulas (VII)»: `mensaje` (T4) → `hecha` (T5).
- `b07_t_lucien` «El novato perdido»: `buscar` → `hecha` (T5; se abre **en T5**, no en T0: hasta entonces no hay nada que hacer).
- `b07_t_octavia` «La presidenta»: `cita` → `hecha` (T5).
- `b07_s_iniciales` «Los tres de Galar»: `buscar` → `hecha` (`parts`: Sobble `gal_ruta2`, Grookey `piston_talleres`, Scorbunny `hoyuelo`). Se cierra con la misma regla en los tres tramos: `stage: 'hecha'` cuando estén los tres (`flag.b07_<x> || flag.b07_<x>_vive`).
- `b07_s_oficios` «La Liga de los Siete Oficios»: `maestros` → `sello` (al cuarto) → `hecha` (T1).
- `b07_s_casa` «La Casa de las Siete Puertas»: `carta` → `testigos` → `casa` → `acusar` → `hecha` (T2).
- `b07_s_fosiles` «Fósiles que no encajan»: `mitades` → `hecha` (T3, cuando estén las cuatro mezclas o cuando Mario se despida de Petra con las que tenga: no se queda abierta).

## Qué va en cada tramo (lo bastante concreto para escribirlo solo con esto y el plan)

### T0 · `t0-par.js` · La estación (~2 h)

1. **`b07_cruce`** (desde las Puertas viejas): cinemática corta no (esa es la de la Maximuñequera); `text` del paso por la Puerta: el zumbido, olor a hierba mojada, un andén. Activa `b07_puerta_galar`, `{ go: 'puerta_galar' }`.
2. **Llegada** (onEnter de `par`, `b07_llegada`): Diario en tres ramas. Con `purgado`, un hombre con gabardina y maletín que «lee el periódico al revés» te sigue por el andén: Rhi lo ve y le hace un placaje de broma («¡fuera de juego!»): se va (Lemnis, ciega, manda gente en persona). Con `doble`, el `choice` de Rotom «¿Esto se lo contamos?» (`b07_doble_cuenta_t0` / `_calla_t0`): si se cuenta, en T5 Olivia sabe que llegaste por Par (una línea).
3. **Rhi en el andén** (`b07_rhi_anden`): pancarta con tu nombre mal escrito (una letra). Grita. Te presenta Galar como si fuera suyo. Te invita a Hoyuelo «cuando tengas la primera medalla de aquí, que si no mi padre no se lo cree». Se va a entrenar. Línea según `af.rhi`.
4. **Recepción de la Gira** (`recepcion_gira_gal`, `b07_recepcion`): **Sonia** (anfitriona, investigadora: la «Leyenda de los Héroes» de Galar le interesa más que la Gira), **Odile** inscribe a los novatos (`b07_odile`: «¡Hola, hola! Odile, la de la Copa. Me han ascendido. Ahora inscribo a gente que no conozco en regiones que no conozco»). Pase de la Gira para los trenes de Galar (texto; no hace falta objeto).
5. **Mensaje de Philippe** (`b07_lucien_aviso`, `vars.lucien_viaje = 1`): la noche en que la Puerta de Luminalia zumbó a las 2:18, Lucien no volvió a la garita. La señora Perrot ha llamado a la policía. Philippe se queda la garita «hasta que vuelva». Sin dramatismo excesivo: Philippe intenta un truco con el teléfono y no le sale. **No** se abre misión todavía.
6. **Ruta 2** → **Casa de la Prof. Magnolia**: Magnolia y Sonia explican el Dinamax con ciencia de Galar (partículas, puntos de energía; nada de la teoría del Lazo de la biblia, que es de los científicos de Lemnis). Prueba en el punto de energía del lago: un `wild` de práctica con Dinamax (nv 66, `noCatch`). **Cinemática 1** (`docs/CINE.md`, receta de objeto clave + mecánica): la Maximuñequera, el primer Dinamax de {riolu} (o del Pokémon que elija Mario si {riolu} no va en el equipo). `b07_maximunequera`.
7. **Sobble** en el `lago_ruta2`: llora cuando llueve y se esconde bajo el agua; pesca de escena única (`fish`, `lago`, nivel 2) para sacarlo sin asustarlo. `owns("sobble"|"drizzile"|"inteleon")` → `b07_sobble_vive`. `b07_s_iniciales` a `buscar` la primera vez.
8. **Rama `doble`:** mensaje de Ansel (`cartaanselgalar`, `read`): amable, abuelo, «Galar en otoño», «una vieja colega, la señora Olivia, dirige una central en Artejo; si pasa por allí, dígale que va de mi parte». `b07_ansel_colega`.
9. Puntos diarios en la Ruta 2 (`catch`, `huerto`) y el lago (`fish`). Tienda `tienda_par`, Centro, PC. Fichas `mapNote`, `descNight`, `rumors` (el Bosque Oniria «donde se pierde la gente»: semilla). `b07_m1` a `hecha`, `b07_m2` a `area`, `b07_t0_hecho`.

### T1 · `t1-piston.js` · El marcador (~2 h 15) + La Liga de los Siete Oficios (~1 h 30, opcional)

1. **Área Silvestre (sur)**: ruta larga con el tiempo cambiante (descripción por tramos), nidos con Dinamax salvaje (`wild` con `gimmick: 'dynamax'`, `unique: false`, de las tablas `max-den`), el **Dubwool Tera Fantasma** en la Pradera Radiante (peso 3, opcional), **Nido de la Pradera** (entrenamiento, tope 69, `nido_1`…`3`, premio `b07_mt_ala_bis` con un guía de Corviknight taxi que «sabe de alas»). Cosecha diaria con **Maxisetas** raras. Llamada opcional de Leilani (Corviknight taxi).
2. **Ciudad Pistón** (`b07_piston_llegada`): calderas, trenes, ladrillo. **Apertura de la Temporada** en el estadio (`b07_apertura`, `b07_m2` a `apertura` → al final `hecha`): **Lionel** abre la temporada (canon: carismático, se pierde por las ciudades; una broma sobre eso). **Mireille** calienta a los novatos (`b07_mireille_galar`; con Mario: «te lo explico una vez bien y ya»). **Renata, Nico y la Tía Rosa** emiten desde la grada de prensa (`b07_renata_galar`). El Musical de Mayólica hace el espectáculo del descanso: **Tadeo** (`b07_tadeo_galar`).
3. **El segundo acto** (`b07_t_apuntador` a `estadio`; plan §5): el marcador contesta; Mario investiga en el estadio (el tablón con la escaleta, la ventanilla de mensajes, el Chatot del vestíbulo, Nico y los 31 episodios). Reloj del directo: dos o tres acciones antes de las 18:40 (contador en `vars.b07_marcador_min`); si llega a tiempo, compra el hueco de las 18:39 → `b07_apuntador_vencido_2`; si no, `b07_apuntador_gana_2`. Las dos: `cartaapuntador4`, `b07_apuntador_4`, `b07_marcador`, `b07_t_apuntador` a `hecha` con `done`. Con `af.renata >= 70`, su petición (plan §7, `b07_renata_peticion`). Reparación de Renata si `b07_renata_dolida`.
4. **Grookey** (`piston_talleres`): el aprendiz del carpintero; escena con ritmo (cosecha o elección). `owns` de la línea.
5. **La Liga de los Siete Oficios** (plan §5d, `b07_s_oficios` con `parts`): siete maestros, dos vías cada uno como mínimo, «los oficios hablan entre ellos» (segunda oportunidad cuando ya has convencido a otros dos). Con cuatro: el Sello en la taberna de Priya (`b07_oficios_hecho`), tienda `taller_oficios`. **Duelo de curri** Priya contra Gaspar (`b07_gaspar_curri`), sin combate obligatorio; Gaspar aprende la **Sopa Maxi** (`b07_sopa_maxi`; guion con comentario `// MOTOR: gmax` y sin efecto hasta el paso 5). Agnes no combate nunca.
6. Trenes en `estacion_piston` (contrato de viajes). Tienda `tienda_piston`. `b07_m3` a `hoyuelo`, `b07_t1_hecho`.
7. **Camille** (opcional, si `b06_camille_estadio`): un spot en el pabellón el viernes (`weekday`), dos líneas, sin pancarta.

### T2 · `t2-casa.js` · La Casa de las Siete Puertas (~1 h 45, opcional)

Todo está en el plan §5b (solución, pistas, descartes, acusación y ramas). Además:
1. Buzón: `mail` de Quintana (`id: 'b07_casa_carta'`, `kind: 'encargo'`, `cond: 'flag.b07_t1_hecho'`, `days: 1`, objeto `cartaquintanacasa` con `read`, guion que pone `b07_s_casa` en `carta` y `b07_casa_carta`).
2. Plié: Sally (`b07_sally`: excéntrica, de usted, preguntas raras; amistoso opcional `sally_quiz`; tiene el libro de cuentos de Edmund), Ottilie (tres escenas: el encargo, la Casa por dentro, el final), Maren (tres escenas: la recolectora que te vende setas y habla poco; el bosque; el final). Ottilie y Maren se rigen por la regla de las 3 apariciones (aquí 3 escenas cada una + carta tras el caso: `mail` `b07_eco_casa` con la rama).
3. Los siete visitantes con `parts` (`b07_viajero_*`), cada uno con su versión y una pista; dos con contradicción entre ellos que se resuelve con la foto.
4. La Casa por dentro (`b07_s_casa` a `casa`): Sala Primera (el banco), Tercera (el escalón que cruje), Sexta (oscuridad: las esporas), Jardín (rastreo `aura` con {riolu}; sin {riolu}, un spot que dice que hace falta), Séptima (rejilla para abrir sin llave; el doble fondo vacío).
5. Acusación con `{ case: 'b07_casa', onSolve: […], onFail: […] }` (CONTENIDO §21), `partner: 'quintana'`; prueba de que todas las pistas se alcanzan. Ramas y premios del plan.
6. Referencia evidente única: la frase de Quintana sobre lo imposible y la bota con clavos.
7. `b07_t2_hecho` al cerrar (en cualquier rama, también `fallido`).

### T3 · `t3-hoyuelo.js` · La delantera (~2 h 15)

1. **Ruta 3** (bloqueada hasta `b07_t1_hecho`), **Mina de Galar** (cueva; excavación diaria `dig`, `cueva`, con las cuatro mitades de fósil como `rare`), **Petra** (`b07_petra_mina`, `b07_s_fosiles` con `parts`): une mitades cuando tienes una de pájaro/pez y otra de dragón/plesio; `owns` por especie; se cierra al despedirte. **Ruta 4**.
2. **Pueblo Hoyuelo** (`b07_hoyuelo_llegada`, `b07_m3` a `gimnasio` tras la cena o al llegar al estadio): el geoglifo, los bancales, el estadio de césped. **Casa de Rhi** (`b07_t_rhi` a `casa`, `b07_casa_rhi`, `b07_padre_rhi`): la cena con **Gareth** (habla del césped como de una persona; nunca culpa a nadie; se le quiebra la voz una sola vez, con el estadio vendido «a un socio que no sale en ningún sitio»), la madre ausente no se explica (no inventes), Rhi incómoda y feliz. Gareth cuenta que ha alquilado un terreno para un campo: `b07_campo` (negocio). **Nate** aparece tumbado en el sofá «desde el martes» (`b07_nate`; amistoso `nate_1` opcional).
3. **Scorbunny** (plan §8) con Rhi delante.
4. **Terrazas de Hoyuelo** (entrenamiento, tope 70, `terraza_1`…`3`, premio **Meganiumita** con la historia de la abuela de Percy: `b07_meganiumita`).
5. **De noche, el estadio vacío** (`b07_t_rhi` a `estadio`): Rhi te reta en el césped que cuidaba su padre. **Cinemática 2** (focos apagados, solo la luna; el Cinderace Gigamax). `rhi_7` con curación antes. Gane o pierda, `b07_rhi_combate`; si ganas limpio, `b07_rhi_vencida_7` y af +8; si eliges dejarla ganar (opción explícita), af −5 y `b07_rhi_dolida` (reparación: revancha en el Campo, plan §7). Su miedo a ser «del montón» dicho a su manera, con jerga de fútbol, sin discurso. Referencia evidente: «Un delantero sin ego es un defensa con suerte». Momentos por afinidad (45 y 70). `b07_t_rhi` a `hecha`.
6. **Percy** (`percy_g`, `b07_gym_hoyuelo_visto` al entrar, medalla, `cap: 70`). `b07_m3` a `hecha`, `b07_m4` a `crampon` (Handsome llama: «hay algo en Crampón»), `b07_t3_hecho`.

### T4 · `t4-crampon.js` · Los que pagan (~2 h 15)

Todo el torneo está en el plan §5c. Además:
1. **Llegada** con **Handsome** (disfraz malo de turista) y **Nerio** (`b07_nerio`): Crampón, persianas bajadas, carteles del Team Yell, el gimnasio en la calle. Nerio no quiere a Lemnis en su pueblo y te ayuda «por el pueblo, no por ti».
2. **Callejón de Crampón** (entrenamiento, tope 71, premio `b07_mt_desahogo`). **Kaori** te espera allí (`b07_t_kaori`).
3. **El torneo** (`b07_m4` a `torneo`): las tres vías ya son `parts` de `b07_m4` en `misiones.js` (combate en `cripta_crampon`, personal y dinero en `trastienda_cripta`; `done` con `b07_pista_*`). Dos bastan; fallar abre otra vía (plan §5c). Mega-Pyroar y Mega-Sharpedo opcionales. Bastien (rama `rompe`): luchador de alquiler; al ver el libro, se rompe; `b07_t_bastien` `torneo` → `hecha`.
4. **Lola** (plan §5c): la confesión, sin absolución, «Fiado no: esto lo pago yo». Combate opcional `lola_torneo` antes o en vez de la ronda 2.
5. **Xero desenmascarado** (`b07_xero_anfitrion`), el libro y su decisión (`b07_libro_*`).
6. **La final** (`torneo_final`, `cap: 72`) y los Caramelos Lazo a los finalistas: Kaori los analiza.
7. **El mensaje de Noa** (`b07_noa_mensaje`, `b07_t_noa` a `mensaje`): un sobre de logística en la caja del torneo o entregado por un mensajero: «Emplazamiento 06. Artejo. Sé contar. Si no llego, abre tú». Sin más.
8. `b07_m4` a `hecha`, `b07_m5` a `artejo`, `b07_t4_hecho`.

### T5 · `t5-artejo.js` · Ego (~2 h 30)

1. **Área Silvestre (norte)** (bloqueada hasta `b07_t4_hecho`): Valle Entrepuentes, Cuenca Polvorienta (excavación), **Lago del Enfado** (Dreepy raro). → **Ciudad Artejo** (onEnter: `b07_m_aviso`, `b07_artejo_llegada`; `b07_m5` a `gimnasio`): la muralla, el castillo con el estadio dentro, la torre de la Planta Eléctrica.
2. **Cornisa de Artejo** (entrenamiento, tope 72, premio `b07_mt_vasto_impacto`). **Roy** (`roy_g`, `b07_gym_artejo_visto`, medalla, `cap: 73`; Lucario brilla contra Duraludon). Roy, al ganar: «Algo raro pasa en la Planta. Mis dragones no quieren volar por encima». `b07_m5` a `planta`.
3. **La Planta Eléctrica** (`planta_artejo`): **Magda** (`b07_magda`, abre una puerta con su libreta) · rama `sigue` de Bastien (`b07_t_bastien` `planta`) · **Lucien** (`b07_t_lucien` a `buscar` al entrar; encontrado en la oficina de logística, `b07_lucien_encontrado`, `vars.lucien_viaje = 0`) · **Noa** y las jaulas (plan §6.1, **cinemática 3**, rejilla del panel antes si quieres que Mario haga algo con las manos mientras ella habla; Olmedo por llamada) · `notanoa`, Merengue · rama `doble`: el `choice` de T5 y el mensaje de Ansel después («Qué pena lo de la señora Lambert. Era muy buena contando»), frío y amable a la vez.
4. **Octavia** llega (`b07_octavia`, `b07_t_octavia` a `cita`): según `b07_libro_*`. Consola «Presidencia: sin acceso». **Olivia** (`olivia_1`, `b07_olivia_vencida`), su motivo (Rose, «energía para mil años»; el dinero de Dirección), sin caricatura. **Eternatus** (**cinemática 4**, `wild` 72, capturable y único; aullido del Bosque Oniria; el aura de {riolu} contesta; si `inParty("reshiram")`, una línea).
5. **El archivo** (`planta_archivo`): `expedientedufresne` y la elección de Lila (plan §6.2); `informeoctavia` (`read`, el informe que Octavia nunca vio).
6. **La muralla al amanecer**: **A.Z.** (`b07_az_artejo`), luego **la gran decisión** de Octavia (plan §6.2, aviso claro), `b07_t_octavia` a `hecha`. Llamada de **Sera** (`b07_sera_llamada`, según `SERA_*` de `b06/t10-serafina.js`).
7. **`b07_fin`** (`{ cap: 74 }`, `{ save: true }`): Lucien vuelve a Luminalia (llamadas de Philippe y de la señora Perrot), Diario del final en tres ramas, Lionel anuncia la Copa de la Temporada «al cierre de Galar», la Gira anuncia **Sinnoh** («montañas, lagos y un idioma muy viejo»), `**Fin del Acto VI.**` / `*La historia continúa…*`. `b07_m5` a `hecha` con `done`.
8. Retos `jefe_olivia` (y las fichas de la Cornisa).

### Piezas del Museo de tu partida (flags; el paso 5 escribe `t6-museo.js`)

| Pieza | Flags que la activan / cambian | Tramo |
|---|---|---|
| Etiqueta tachada (Noa) | `b07_noa_adios`; nota según `b07_bastien_llega` / `b07_bastien_tarde` | T5 |
| Broche de lemniscata roto (Octavia) | una de `b07_octavia_dentro` / `_publica` / `_testigo` | T5 |
| (Opcional) Llave de latón (la Casa) | una de `b07_casa_devuelve` / `_lectura` / `_quintana` / `b07_casa_fallido` | T2 |
| Estribo en miniatura (sala de Alola) | `b07_terron_mudsdale` | comun |

## Qué va en cada archivo

| Archivo | Quién | Qué |
|---|---|---|
| `index.js` | paso 1 (hecho) | Región `galar` (con `land`), `hours: 15`, `ends: 'b07_fin'`, mismo bucle de partes que el B6 + mezcla de retos y filtro de referencias pendientes |
| `npcs.js` | paso 1 (hecho) | NPCs de arriba con `look` |
| `misiones.js` | paso 1 (hecho) | Principales, hilos y secundarias con sus etapas y `parts` |
| `comun.js` | paso 1 (hecho) | Medallas, objetos compartidos, tiendas, retos de gimnasio, enganche `b07_inicio`, vuelos, negocio `b07_campo`, ampliación de `b06_estudio`, Buzón (Terrón, Inés, Camille), aviso de ritmo |
| `t0-par.js` … `t5-artejo.js` | pasos 2–4 (un tramo cada vez) | Lugares, guiones, entrenadores, retos, `gather`, objetos propios, `patches` y casos de su tramo |
| `t6-museo.js` | paso 5 | Sala de Galar y pieza nueva de Alola |

## Para validar sin publicar

El B7 **no** está en `BLOCKS`. `app/content/index.js` ya tiene la variable `INFINITO_EXTRA` (solo Node):

```
INFINITO_EXTRA=b07 node herramientas/validar.mjs
INFINITO_EXTRA=b07 node herramientas/recorrido.mjs --semilla 3 --hasta b07_t0_hecho
```

`index.js` del B7 imprime avisos `[b07] … pendiente` por cada lugar o entrenador que comun.js o misiones.js nombran y que aún no existe (vuelos, `parts.where`, `challenges.trainer`, `venture.loc`). **No son errores:** desaparecen cuando el tramo que los crea existe. En el paso 5 no debe quedar ninguno. Arregla **todos** los errores de tu archivo; los avisos de «flag que se consulta pero ningún guion activa» de otros tramos son normales mientras no estén escritos.

## Duraciones meta por tramo (suman ~14 h 30)

T0 2 h · T1 2 h 15 (+ Oficios 1 h 30, opcional) · T2 1 h 45 (opcional) · T3 2 h 15 · T4 2 h 15 · T5 2 h 30. Pon `est` en minutos en las misiones propias de tu tramo para que el Game Designer lo cuente.
