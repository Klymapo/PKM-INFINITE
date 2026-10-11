# Encargo para escribir un tramo del Bloque 5

**Las reglas generales son las mismas que en el B2–B4:** lee `secreto/bloques/b02-encargo.md` entero (qué leer, qué entregar, reglas de calidad, validación, técnica y respuesta final) y aplícalas cambiando «B2» por «B5», el prefijo `b02_` por `b05_` y la carpeta `app/content/b02/` por `app/content/b05/`. Aquí cambian el plan, los contratos y algunas reglas nuevas.

## Lee además

1. `secreto/bloques/b05-plan.md` (tu tramo, y los demás para saber qué hacen).
2. `CLAUDE.md` §2.4 entero: **reglas nuevas del 2026-10-10** (hilos que se cierran al terminar su parte, cinemáticas con `docs/CINE.md`, minijuegos con `docs/MINIJUEGOS.md`, premio del instructor en toda zona de entrenamiento, `parts`, cartas con `read`, `new` en sitios nuevos de zonas viejas, nada de regalar especies o líneas que Mario ya tenga: compruébalo con `owns()`).
3. `docs/CONTENIDO.md`, `docs/CINE.md` y `docs/MINIJUEGOS.md` (formato exacto).
4. El **B4** publicado (`app/content/b04/`), sobre todo `t3-cueva.js` (el final, `b04_fin`) y `t0-azafran.js` (estilo, Puerta, Diario), y las secciones «Publicación 5» a «Revisión de lógica» de `secreto/registro.md` y «Estado tras el B4» y siguientes de `secreto/hilos.md`.
5. La biblia completa, sobre todo §3.2–3.5, §7 (el Diario: la revelación es en el Acto V, **no** en el B5) y §9.
6. Ya escritos para el B5 (no los edites; si falta algo, dilo): `app/content/b05/npcs.js`, `misiones.js`, `comun.js`, `index.js`.
7. Tablas canon: `secreto/ref/encuentros-alola.json` (claves en §Encuentros, abajo). **Sube los niveles** a la curva del plan.

## Lo que sabemos de la partida de Mario (escribe igualmente todas las ramas)

- Terminó el B4 (49 h, 8 medallas, tope 56). Equipo: Lucario 55, Golbat 55, Kingdra 54, **Pupitar 51**, Garganacl 50, Tyrantrum 51. En cajas: Typhlosion, Delphox, Gengar, Scizor, Feraligatr, Annihilape, Aegislash, Krookodile, Gyarados, Roserade, Garganacl, Haxorus, Luxray, Shelgon, Absol, Aerodactyl, 2 Ampharos…
- Flags suyos: `b01_trato_sera`, `b01_prensa_lemnis`, `b01_bastien_cubierto` (Bastien leal), `b02_frag_melia`, `b03_rancho_sobrina` (+ negocio del rancho), `b03_rocket_libres`, `b03_renata_espera`, `b03_vencejo_pluma`, `b03_sylveon`. La decisión de Lebrun (`b04_lebrun_*`) no la sabemos: escribe las tres.
- **El compañero es Lucario.** Usa `{riolu}` y la condición `inParty("riolu") || inParty("lucario")` cuando una escena dependa de que esté en el equipo. Riolu/Lucario tiene que **lucirse** (aura, su primer movimiento Z con el Lizastal Z).
- Tiene montura Rhyhorn (`flag.mount_rhyhorn`).
- **No le gusta** recibir dos Pokémon de la misma línea. **Le encantan** los giros con pistas, las facciones con rangos, decidir con matices y el patrón *personaje entrañable → objeto clave con cara → abre una zona*.

## Mecánicas

- **Mega:** la tiene. **Z:** se desbloquea en T0 con `{ give: 'zring' }` y `{ unlock: 'z' }` (después de eso, los kahunas y jefes pueden usar Z: `gimmick: 'z'` y el cristal en `item` del Pokémon que lo usa; una mecánica por combate). **Dinamax y Tera:** nunca en el jugador. Tera solo en salvajes de Fisura (`gimmick: 'tera'`).
- **Pokémon dominantes** de las pruebas: `{ wild: { sp: 'gumshoostotem', lv: 56, noCatch: true }, canRun: false, … }` (especies `gumshoostotem`, `raticatealolatotem`, `araquanidtotem`, `salazzletotem`, `marowakalolatotem`… comprueba en `app/data/species.json`). No hay combates SOS: el dominante va solo, a veces seguido de un segundo `wild` como «aliado que llama».

## Contratos compartidos (no los cambies)

### Región y mapa

`alola` ya está declarada en `index.js` (mapa 100 × 100, con las islas dibujadas). Coordenadas de primer nivel; las sub-áreas llevan `parent`.

| Tramo | Lugares nuevos |
|---|---|
| T0 | `hauoli` (20,38, city, «Ciudad Hauoli»), sub-áreas con `parent: 'hauoli'`: `puerta_alola` (la Puerta Lemnis de Alola, en el Paseo Marítimo), `lab_kukui` (Laboratorio del profesor Kukui, en la playa), `escuela_entrenadores` (zona de entrenamiento, tope 57, con premio) y las que quieras. `alola_ruta1` (16,26, ruta «Ruta 1», `from: 'hauoli'`, `to: 'lilii'`, ~7 tramos), `lilii` (14,14, town, «Pueblo Lilii»), `alola_ruta2` (30,30, ruta «Ruta 2», `from: 'hauoli'`, `to: 'cueva_sotobosque'`, ~7 tramos), `cueva_sotobosque` (36,20, kind `cave`, «Cueva Sotobosque»: la prueba de Liam; **no** es ruta, es un lugar con spots y `encounters`). |
| T1 | `kantai` (52,40, city, «Ciudad Kantai»), sub-áreas con `parent: 'kantai'`: `taller_kahale` (el taller de Leilani), `cid_kantai` (Centro de Investigaciones Dimensionales). `alola_ruta4` (56,50, ruta «Ruta 4», `from: 'kantai'`, `to: 'ohana'`), `ohana` (58,60, town, «Pueblo Ohana»), `rancho_ohana` (`parent: 'ohana'`, zona de entrenamiento tope 59 con premio, y huerto con minijuego), `alola_ruta5` (48,64, ruta «Ruta 5», `from: 'ohana'`, `to: 'colina_saltagua'`), `colina_saltagua` (50,72, kind `area`, «Colina Saltagua»: prueba de Nereida), `alola_ruta8` (64,50, ruta «Ruta 8», `from: 'kantai'`, `to: 'konikoni'`; en un tramo central, `branch` al Área Volcánica), `area_wela` (66,34, kind `area`, «Área Volcánica del Wela»: prueba de Kiawe; `links: ['alola_ruta8']`), `konikoni` (72,64, city, «Ciudad Konikoni»), `joyeria_mayla` (`parent: 'konikoni'`), `ruinas_vida` (78,72, kind `area`, «Ruinas de la Vida», `links: ['konikoni']`). |
| T2 | `paraiso_aether` (86,40, kind `area`, «Paraíso Æther»), sub-áreas con `parent: 'paraiso_aether'`: `aether_conservacion` (con `encounters`), `aether_lab`, `aether_clinica`, `aether_archivo`, `aether_pruebas` (zona de entrenamiento, tope 60, Zyra, premio). |
| T3 | `aldea_marina` (20,84, town, «Aldea Marina»), `canon_poni` (30,88, ruta de cueva «Cañón de Poni», `from: 'aldea_marina'`, `to: 'altar_sol_luna'`, ~8 tramos), `altar_sol_luna` (40,92, kind `area`, «Altar del Sol y de la Luna»). |

**Conexiones:** lilii–alola_ruta1–hauoli–alola_ruta2–cueva_sotobosque · kantai–alola_ruta4–ohana–alola_ruta5–colina_saltagua · kantai–alola_ruta8–konikoni–ruinas_vida · alola_ruta8–area_wela · aldea_marina–canon_poni–altar_sol_luna. Cada ruta declara `links` con sus dos extremos y `route.from`/`route.to` iguales.

**Entre islas no hay `links`: hay barcos (spots `go`).** Cada tramo pone los de los lugares que define:
- T0, en `hauoli`: «⛴️ Ferry a Akala (Kantai)» → `kantai`, `cond: 'flag.b05_ferry_akala'`.
- T1, en `kantai`: «⛴️ Ferry a Melemele (Hauoli)» → `hauoli` (siempre) y «🛥️ Barco de la Fundación Æther» → `paraiso_aether`, `cond: 'flag.b05_aether_invitacion'`.
- T2, en `paraiso_aether`: «Volver a Kantai» → `kantai` y «🛥️ Barco a Isla Poni» → `aldea_marina`, `cond: 'flag.b05_poni'`.
- T3, en `aldea_marina`: «🛥️ Barco a Akala (Kantai)» → `kantai`.

**Kanto, Kalos y Johto siguen accesibles:** `comun.js` ya pone en `puerta_azafran`, `luminalia_plaza` y `puerta_trigal` el spot «Cruzar a Alola (Hauoli)» → `puerta_alola` con `cond: 'flag.b05_puerta_alola'`. T0 pone en `puerta_alola` los de vuelta: «Cruzar a Kanto (Azafrán)» → `puerta_azafran`, «Cruzar a Kalos (Luminalia)» → `luminalia_plaza`, «Cruzar a Johto (Trigal)» → `puerta_trigal`, con la misma `cond`.

**Enganche del inicio:** `comun.js` pone el spot «🌺 La Gira: convocatoria para Alola» (`script: 'b05_inicio'`) en `azafran`, `estacion_azafran`, `puerta_azafran`, `celeste`, `lavanda`, `trigal`, `luminalia_plaza` y `puerta_trigal`. El jugador puede estar en cualquiera de ellos: `b05_inicio` (T0) lo lleva hasta la Puerta y la cruza (`{ go: 'puerta_alola' }` o directamente a `hauoli`).

### Encuentros (claves de `secreto/ref/encuentros-alola.json`)

| Lugar | Claves |
|---|---|
| `alola_ruta1` | `alola-route-1/east`, `/west`, `/south`, `/hauoli-outskirts` |
| `hauoli` (explorar) | `hauoli-city/beachfront`, `/main` |
| `alola_ruta2` | `alola-route-2/main`, `/north`, `/south` |
| `cueva_sotobosque` | `verdant-cavern/trial-site` (y `alola-route-2` de apoyo) |
| `alola_ruta4` | `alola-route-4` |
| `ohana` / `rancho_ohana` | `paniola-ranch`, `paniola-town` |
| `alola_ruta5` | `alola-route-5` |
| `colina_saltagua` | `brooklet-hill/main`, `/north`, `/south`, `/totems-den` |
| `alola_ruta8` | `alola-route-8/main`, `alola-route-9/main` |
| `area_wela` | `wela-volcano-park` |
| `konikoni`, `ruinas_vida` | `konikoni-city`, `memorial-hill`, `ruins-of-life` |
| `aether_conservacion` | `alola-route-15/aether-house`, `ultra-space-wilds/*` (desplazados raros, con cuidado), `memorial-hill` |
| `aldea_marina` | `seafolk-village/main`, `poni-wilds` |
| `canon_poni` | `vast-poni-canyon/inside`, `/outside`, `/northwest` |
| `altar_sol_luna` | `lake-of-the-sunne`, `lake-of-the-moone` |

Niveles: §1 del plan. Desplazados (`displaced: true`): de Kanto (lo último que tocó la Puerta) o Teselia (adelanto del Acto V). Un salvaje **Tera** de Fisura en T0 o T1.

### Entrenadores con id fijo

| Tramo | Ids |
|---|---|
| T0 | `liam_1` (npc `liam`, capitán: combate antes de su prueba, 3–4 Pokémon, ~55), `kaudan_gp` (npc `kaudan`, `cls: 'Kahuna'`, 5 Pokémon, as 57, 2 objetos, `gimmick: 'z'` con Lizastal Z en un Pokémon), entrenadores de la Escuela (`escuela_1`…), entrenadores de ruta (sin prefijo, que no choquen: mira `secreto/registro-auto.md`) |
| T1 | `kiawe_1` (npc `kiawe`, capitán, as ~58), `rhi_6` (npc `rhi`, opcional, as 58, cura antes), `mayla_gp` (npc `mayla`, `cls: 'Kahuna'`, 5 Pokémon, as 59, 2 objetos, `gimmick: 'z'` con Litostal Z), entrenadores del Rancho (`rancho_ohana_1`…), `lulu_1` (opcional, si haces el *shokugeki*) |
| T2 | `fabio_1` (npc `fabio`, jefe de trama, 5 Pokémon, as 60 Alakazam con `gimmick: 'mega'`, `ace: 'alakazam'`, 2 objetos), `francine_1` (npc `francine`, opcional), `bastien_6` (npc `bastien`, opcional), `aether_pruebas_1`… |
| T3 | `calder_1` (npc `calder`, jefe de trama, 5 Pokémon, as 61, 2 objetos, `gimmick: 'z'` con Psicostal Z; `lose: 'continue'` con revancha), `hela_gp` (npc `hela`, opcional, Gran Prueba de Poni: sello y Geostal Z) |

### Flags y objetos que otros leen

| Tramo | Debe activar / dar |
|---|---|
| T0 | `b05_inicio_hecho` (al principio de `b05_inicio`) · `b05_puerta_alola` (al cruzar: la vuelta ya se puede usar) · `b05_llegada` (onEnter de Hauoli) · `b05_m1` a `hauoli` y luego hecha · `b05_calder_charla` (la charla del cielo) · `b05_leilani_conocida` · `b05_litten` (si recibe Litten; `b05_s_iniciales` a `buscar`) · `b05_m2` a `lilii` → `prueba` → `gran` → hecha · `b05_liam_hecha` (`{ give: 'normaliumz' }`) · `b05_pulsera_z` (`{ give: 'zring' }`, `{ unlock: 'z' }`, con cinemática de Tapu Koko) · tras Kaudan: `{ badge: 'sello_melemele' }`, `{ cap: 58 }`, `{ give: 'fightiniumz' }`, `b05_kaudan_vencido` · `b05_ferry_akala` · `b05_m3` a `kantai` · `b05_t_leilani` a `taller` · `b05_t0_hecho` |
| T1 | `b05_kantai_llegada` · `b05_t_leilani` a `lapras` y luego hecha · `{ give: 'ridegear' }` (cinemática), `b05_ridegear`, `flag.mount_lapras` (no toques `vars.mount`) · `b05_t_malia` a `carta` (carta de Malia, `read`) y hecha en el CID · `b05_m3` a `pruebas` → `gran` → hecha · `b05_nereida_hecha` (`{ give: 'wateriumz' }`), `b05_popplio` · `b05_kiawe_hecha` (`{ give: 'firiumz' }`, `{ cap: 59 }`) · tras Mayla: `{ badge: 'sello_akala' }`, `{ cap: 60 }`, `{ give: 'rockiumz' }`, `b05_mayla_vencida` · `b05_tyranitarita` (misión `b05_s_tyranitarita`) · `b05_aether_invitacion` y `b05_m4` a `invitacion` (cuando Mayla esté vencida) · `b05_t1_hecho` |
| T2 | `b05_aether_llegada` · `b05_m4` a `dentro` → hecha · `b05_fabio_visto`, tras Fabio: `{ cap: 61 }`, `b05_fabio_vencido` · `b05_escaner` (la pista del Diario) · `b05_codigo_cero` · `b05_t_noa` (`notanoa04`, `read`), `b05_t_kaori`, `b05_t_bastien` (y `b05_bastien_rompe` / `b05_bastien_sigue`) · `b05_skull_taller` (opcional) · `b05_poni` y `b05_m5` a `poni` · reto `jefe_fabio` en su `challenges` · `b05_t2_hecho` |
| T3 | `b05_m_aviso` (onEnter de `aldea_marina`, primera vez) · `b05_m5` a `canon` → `altar` → hecha · `b05_rowlet` · `b05_calder_visto`, tras Calder: `b05_calder_vencido` · una de `b05_luz_necrozma` / `b05_luz_aether` / `b05_luz_leilani` · `{ cap: 62 }` · reto `jefe_calder` · `b05_fin` (último guion del bloque, con `{ save: true }`) |

### Otras piezas existentes

- **Sellos (`comun.js`):** `sello_melemele` (Lucha), `sello_akala` (Roca), `sello_poni` (Tierra). Las Grandes Pruebas cuentan como medallas del Circuito.
- **Objetos del B5 (`comun.js`):** `ridegear` (clave). Del juego: `zring`, cristales Z (`normaliumz` Normastal Z, `fightiniumz` Lizastal Z, `wateriumz` Hidrostal Z, `firiumz` Pirostal Z, `rockiumz` Litostal Z, `groundiumz` Geostal Z, `psychiumz` Psicostal Z), `tyranitarite`. Crea en tu archivo los objetos que necesites (cartas, notas, `art`).
- **Tiendas (`comun.js`):** `tienda_hauoli`, `tienda_kantai`, `tienda_konikoni`. Ponlas como spot en tus ciudades.
- **Retos (`comun.js`):** `gran_prueba_melemele`, `gran_prueba_akala`. Los demás (pruebas de capitán, `jefe_fabio`, `jefe_calder`), en tu archivo.
- **NPCs nuevos (`npcs.js` del B5):** canon `kukui`, `kaudan`, `liam`, `nereida`, `kiawe`, `mayla`, `hela`, `gladio`, `zyra`, `fabio`, `francine`, `pimpinela`, `lulu`; candidata `leilani`; OC `calder`, `camille`; genéricos `recluta_skull`, `empleado_aether`, `vecina_alola`, `surfista`, `ranchero_ohana`, `marinera_poni`. Siguen disponibles todos los anteriores (`rotom`, `handsome`, `sera`, `alexia`, `kiyo`, `becario_elm`, `elm`, `cipres`, `misty`, `bill`, `sobrina`, `philippe`, `rhi`, `gaspar`, `viajero`, `kaori`, `noa`, `bastien`, `ansel`, `xero`, `rouxel`, `magda`, `renata`, `ysolde`, `az`, `lebrun`…).
- **Misiones del B5:** `app/content/b05/misiones.js`. Avánzalas con sus etapas exactas. **Cada hilo se cierra al terminar su parte** (`{ quest: 'b05_t_x', stage: 'hecha', done: true }`).
- **Marcadores:** un spot solo lleva «!» (`new`) si su guion empieza o cambia algo de verdad en ese estado. Para hablar sin avanzar nada, una variante de `talk` con su `cond`, sin comandos `quest`.
- **Arte:** objeto clave nuevo o `art` nuevo → descríbelo en la respuesta (forma y colores en 2 líneas); el pixel art lo pinta la sesión de arte.

### Para validar sin publicar

El B5 **no** está en `BLOCKS`. Para cargarlo en las herramientas:

```
INFINITO_EXTRA=b05 node herramientas/validar.mjs
INFINITO_EXTRA=b05 node herramientas/recorrido.mjs --semilla 3 --hasta b05_t0_hecho
```

Errores esperados mientras se escriben los demás tramos: lugares, entrenadores y guiones de otros tramos que aún no existen (`aldea_marina` en las `parts` de los iniciales, etc.). Arregla **todos** los de tu archivo.
