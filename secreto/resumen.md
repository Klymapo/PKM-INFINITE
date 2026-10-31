# RESUMEN DEL MUNDO (SECRETO, CON SPOILERS)

> Sustituye leer enteros `biblia.md`, `registro.md`, `personajes.md`, `hilos.md`, `candidatas.md`, `referencias.md`, `progreso.md` y `balance.md` al empezar un trabajo. Abre el original solo para un detalle: cada dato apunta a su sección (→ archivo §). Estado al **2026-10-31**, contenido `2026-10-30.19`.
> **(?)** = no está claro en los originales: confírmalo antes de escribir sobre eso.

---

## 1. Estado

### 1.1 Bloques publicados (todos en `BLOCKS`, `app/content/index.js`, `CONTENT_VERSION = '2026-10-30.19'`)

| Bloque | Acto · título | Región / tramo | Arranque (enganche → flag) | Fin | Tope final | Medallas / sellos |
|---|---|---|---|---|---|---|
| B1 | I · Fisuras | Kalos: Luminalia → Yantra | `start: 'b01_inicio'` | `b01_fin` | 35 | Roca (Brock), Encanto (Blanca), Lucha (Corelia) |
| B2 | II · Ecos del pasado | Kalos → Johto (Encinar → Iris) | `b02_inicio` con `flag.b01_fin` → `b02_inicio_hecho` | `b02_fin` | 42 | Colmena (Antón), Niebla (Morti) |
| B3 | II · Lo que el tiempo se llevó | Johto (Malva → Ruinas Alfa → Trigal → Olivo → rancho → Caoba → Lago de la Furia) | `b03_inicio` con `flag.b02_fin` → `b03_inicio_hecho` | `b03_fin` | 50 | Planicie (Corelia), Mineral (Yasmina) |
| B4 | III · La señal | Kanto (Azafrán, Celeste, Lavanda, Cueva Celeste) | `b04_inicio`, `flag.b03_fin && !flag.b04_inicio_hecho` | `b04_fin` | 56 | Cascada (Misty) = 8, clasificad{o\|a\|e} para la Copa (`b04_clasificado`) |
| B5 | IV · La luz robada | Alola (Melemele, Akala, Paraíso Æther, Poni) | `b05_inicio`, `flag.b04_fin && !flag.b05_inicio_hecho` | `b05_fin` | 62 | Sellos `sello_melemele`, `sello_akala` (`sello_poni` opcional) |
| B6 | V · La voz del narrador | Teselia (Porcelana → Dragospiral) | `b06_inicio`, `flag.b05_fin && !flag.b06_inicio_hecho` | `b06_fin` | 68 | Voltio (Camila), Temblor (Brock) |
| B7 | VI · Ego | Galar (Par → Artejo), `hours: 15` | `b07_inicio`, `flag.b06_fin && !flag.b07_inicio_hecho` | `b07_fin` | 74 | Planta (Percy), Dragón (Roy) |

Además, **pasadas de profundidad** (P6–P10, red de auxilio, eventos 2026, Buzón, negocios, Cuadrante, casos, Pueblo Cirio) dentro de las carpetas `b02`–`b06` (→ registro, una sección por publicación).

### 1.2 Mario (→ progreso, tabla inicial)

- **Último dato exacto (2026-10-23):** final del B4, sin empezar el B5, en el Castillo Caduco. 51 h 19 min, 8 medallas, tope 56, ₽8 486 («el dinero está bien así»). Equipo: Ampharos «Candela» 50, Aurorus 50, Tyrantrum 53, Garganacl 52, Pupitar 53, Aerodactyl 49. Respaldo: `herramientas/test/partidas/mario-2026-10-23.json`.
- **Después:** el 2026-10-28 ya estaba **en el B5** (registro, «Corrección de NPCs viajeros») con 117 en la Pokédex (registro, «Tanda 1»); el 2026-10-30 ya tenía la Alakazamita. **Punto exacto dentro del B5: (?)**. Vamos unos **2 bloques por delante** (B6 y B7 sin jugar).
- **Cajas** (lista → b07-encargo, «Lo que sabemos»): Lucario (central), Typhlosion, Delphox, Gengar, Scizor, Feraligatr, Gyarados variocolor, Meganium, Victreebel, Golett… y **Faro** (Ampharos de Aurelio) y la Mareep del rancho.
- **Afinidades (última medida, 2026-10-10, fin del B4):** Kaori 43, Rhi 33, Lila 27, Renata 21, Irene 20, Sera 13. Leilani: (?). Kaori puede ir por encima de 60 por la botica.
- **Rep (2026-10-10):** Johto 38, policía 13, Flare 13, Kalos 11, Lemnis −6.
- **Ritmo:** ~7 h de juego el primer día (→ progreso). Los bloques nuevos se escriben por paquetes (skill `bloque-por-paquetes`; modelo `b07-avance.md`).

---

## 2. Tronco de la historia (→ biblia §2–§5)

**Premisa pública:** la Liga y **Lemnis** lanzan el **Circuito Infinito** (temporadas; 8 medallas de cualquier región → Copa Infinita) y las **Puertas Lemnis** («Un mundo. Una liga.»). La inauguración abre la primera **Fisura** (desplazados, Teras y Dinamax salvajes). Líderes de **Intercambio** entre regiones.

**Verdad (→ biblia §3):** las Puertas usan la máquina de A.Z. (fragmentos de Crómlech). **Proyecto Lemniscata**: un nodo por región → **Lazo Infinito** (energía ilimitada, 4 mecánicas en todas partes); las Fisuras drenan la energía vital de Pokémon y legendarios. Lemnis financia a los remanentes (vía **Xero** y fundaciones fantasma). **Arquitecto = Dr. Ansel Moreau**: su **Eco** narra el Diario del Rotom y reporta la ubicación del jugador. Octavia no supo del drenaje hasta el Acto VI. A.Z.: «Toda energía infinita se cobra en vidas. Siempre.»

**Nodos** (→ biblia §3.2): 01 Crómlech (B1) · 02 Ruinas Alfa (B3) · 03 Cueva Celeste (B4, dañado al 4 %, fuente Mewtwo, que se fue) · 04 Altar del Sol/Luna (B5, desmontado) · 05 Torre Dragospiral (B6, apagado, Reshiram libre) · 06 Planta Eléctrica de Artejo (B7, apagado, Eternatus libre). Faltan: **Sinnoh Columnas Lanza**, **Paldea Zona Cero**, **Hoenn Pilar Celeste**. (La biblia pone Galar en «Central Energética / Torre Rose»; se usó la Planta de Artejo.)

**Remanentes** (→ biblia §3.4): Flare (Melia) · Rocket (Atlas, Atenea) · Magma/Aqua · Galaxia (Saturno) · Plasma (Ghechis en la sombra; tiene el Orbe Oscuro) · Skull · ex-Macrocosmos (Olivia) · Paldea sin remanente. **Ninguno «malo porque sí».**

### 2.1 Actos (→ biblia §5)

| Acto | Región | Una línea | Estado |
|---|---|---|---|
| I · Fisuras | Kalos | Inauguración, Riolu, Handsome, Crómlech, Torre Maestra; **Mega** | B1 ✔ |
| II · Ecos del pasado | Kalos II + Johto | Desvío de la Puerta a Johto, Kaori, Rocket, Celebi y el tiempo; muere Aurelio | B2–B3 ✔ |
| III · La señal (biblia: «Lo que el tiempo se llevó», título que usó el B3) | Kanto | Misty, Silph, Cueva Celeste, topo Lebrun | B4 ✔ |
| IV · La luz robada | Alola | Leilani, Ride Gear, Æther, Skull, Necrozma; **Z** | B5 ✔ |
| V · La voz del narrador | Teselia | Renata, Brock, Plasma, **revelación del Diario** | B6 ✔ |
| VI · Ego | Galar | Rhi y su casa, Macrocosmos, Eternatus, muere Noa, Octavia se pasa; **Dinamax** | B7 ✔ |
| **VII · El idioma del aura** | **Sinnoh (+ Hisui por fisura temporal)** | **Irene, origen de Riolu, Isla Hierro y Quinoa, Columnas Lanza** | **siguiente** |
| VIII · La heredera | Paldea | Sera, Zona Cero, Terapagos; **Tera** | — |
| IX · El lazo | Hoenn | Pilar Celeste, Rayquaza, Copa final, elección de pareja, final del Lazo | — |
| ∞ | todas | Posjuego: temporadas, Frente de Batalla, Hisui, eventos | — |

**Finales del Lazo** (IX): destruir, reformar (requiere aliados de todos los hilos) o controlar; dependen de decisiones acumuladas.

**Qué toca en el B8 (Acto VII)** (→ hilos «Estado tras el B7»; b07-plan §14): Sinnoh según la rama de Octavia (`dentro` / `publica` → Ansel en funciones / `testigo` → Sera en funciones); Lucario se separa 1–3 h hacia Isla Hierro y vuelve con un movimiento de aura nuevo; Lucarita Z (sin nombrarla antes); cabina de Ulises «cuando el pequeño crezca»; Irene sale de Crómlech hacia Sinnoh. Pendientes del VI que el plan reparte en el B8: **Lila en persona y la revelación de su madre**, **tercer acto del Apuntador** (teatro de Mayólica, Teselia), **Copa de la Temporada al cierre de Galar**. Cómo cabe todo eso en un bloque de Sinnoh: (?), lo decide el plan del B8.

### 2.2 Mecánicas por región (→ biblia §3.3; balance §4.8)

- Cada mecánica solo con su objeto; desbloqueo: **Mega** fin B1 (Torre Maestra) · **Z** Alola (B5, Pulsera Z) · **Dinamax** Galar (B7, Maximuñequera) · **Tera** Paldea (nunca antes en el jugador; solo salvajes de Fisura).
- **Dinamax del jugador:** solo en Galar, en lugares `fisura: true` y contra salvajes de Fisura (motor `dynamaxAllowed`). Factor Gigamax: comando `{ gmax }` (Sopa Maxi).
- **Una mecánica por combate.** Enemigo con mecánica solo cuando el jugador ya la tiene, salvo **una demostración** de un jefe en un combate que se puede perder sin consecuencias.
- Hipótesis del Lazo: **teoría de científicos**, nunca hecho; usar mecánicas fuera de su región «tira» de la red (dilema final).

### 2.3 Pérdidas y giros (→ biblia §9)

- **Reglas:** sirven a la frase de A.Z.; máx. una grande por acto; **≥ 2 pistas 1–2 bloques antes**; las decisiones cambian el **cómo**, no el **qué** (solo una pérdida en toda la historia puede depender de una decisión); **ningún Pokémon del equipo muere ni se pierde sin que Mario lo elija**; nunca un niño, un humano canon (salvo A.Z.) ni un Pokémon de canon; fuera de plano; duelo que dura (sitio vacío, NPCs que lo nombran, evento anual, recuerdo, Diario); sin humor en la escena.
- **Hechas:** Aurelio (B3) · Rotom-Eco si `b06_eco_purgado` (B6) · Noa (B7).
- **Pendientes:** **Remedios** (Día de Muertos 2027, `ev_muertos_2`; no tocarla en eventos de 2026) · **Lucario se va** a Isla Hierro (VII, temporal; pistas: sueños B4/B5/B6, aullido B7, `hc_lucario_3`) · **A.Z. y Floette** cierran el último nodo (IX; si las decisiones no lo permiten, paga Octavia o Ansel: siempre paga alguien) · despedida elegida del desplazado de las jaulas (**Cetoddle**, Paldea) al cerrar su nodo.

---

## 3. Decisiones del jugador

✔ = rama de Mario confirmada; ≈ = deducida de sus datos; — = desconocida (escribe todas).

| Bloque | Decisión | Flags | Mario |
|---|---|---|---|
| B1 | Prensa | `b01_prensa_verdad` / `_neutral` / `_lemnis` | ✔ `lemnis` |
| B1 | Lechonk | `b01_lechonk_lemnis` / `b01_agente_vencido` | ✔ `agente_vencido` |
| B1 | Fennekin | `b01_fennekin_unido` / `_libre` / `_rhi` | ✔ `unido` |
| B1 | Mareep de la jaula | `b01_mareep_lemnis` / `_jaula` (+`_forzado`, `_noche`) | ✔ `jaula` (6 Mareep) |
| B1 | **Bastien** | `b01_bastien_cubierto` (leal) / `_rompe` / `_silencio` | ✔ `cubierto` → **leal** |
| B1 | **Crómlech** | `b01_delatar` / `b01_handsome` / `b01_trato_sera` | ✔ `trato_sera` |
| B2 | **Fragmento** | `b02_frag_handsome` / `_sera` / `_melia` | ✔ `melia` ⇒ ≈ trato con Sera **roto** (Holomisor calla; `SERA_ENFADO`) |
| B2 | Cetoddle | `b02_cetoddle` / `_noa` | ≈ `b02_cetoddle` (lo tenía en el equipo) |
| B2 | Aurelio | `b02_ampharos` (Faro) / `b02_mareep_rosa` | ✔ Faro |
| B3 | **Rancho** | `b03_rancho_sobrina` / `_jugador` / `_lemnis` | ✔ `sobrina` (+ socio en `p7_rancho`) |
| B3 | **Rocket** | `b03_rocket_policia` / `_libres` / `_quemar` | ✔ `libres` (Atlas encerrado, el resto libres) |
| B3 | Renata | `b03_renata_publica` / `_espera` | ✔ `espera` |
| B3 | Vencejos | `b03_vencejo_pluma` | ✔ Pluma |
| B3 | Gyarados rojo | `b03_gyarados_atrapado` / `_calmado` / `_huido` | ≈ `atrapado` (Gyarados variocolor en cajas) |
| B3 | Fósil | Tyrunt; Amaura por Lazare (`b03_panel_kalos`) | ✔ los dos |
| B4 | **Lebrun** | `b04_lebrun_detenido` / `_cebo` / `_libre` | — |
| B4 | Silph | `b04_toni_plano` (rama `libres`) / `_atlas_pagado` / `_atlas_declaracion` | ≈ `toni_plano` |
| B4 | Olmedo | `expedienteolmedo` (espera) / `fotoexpediente` (publica) | ≈ `expedienteolmedo` |
| B5 | **A quién devuelves la luz** | `b05_luz_necrozma` / `_aether` / `_leilani` (+ `b05_malia_viva`) | — |
| B5 | Bastien | `b05_bastien_rompe` / `_sigue` | — |
| B5 | Skull | `b05_skull_taller` (solo con `b03_rocket_libres`) | — (posible) |
| B6 | **El Eco** | `b06_eco_purgado` / `_reformado` / `_doble` | — |
| B6 | Bastien | `b06_bastien_metro`+`bastien_7` / `_sujeto`+`_sale` o `_firma` | — |
| B6 | Zorua | `b06_zorua` / `_vive` | — |
| B7 | **Octavia** | `b07_octavia_dentro` / `_publica` / `_testigo` (+ `b07_doble_delata_octavia`) | — |
| B7 | Libro del torneo | `b07_libro_policia` / `_prensa` / `_octavia` | — |
| B7 | Lola | `b07_lola_testigo` / `_crampon` / `_vuelve` | — |
| B7 | Noa / Bastien | `b07_bastien_llega` (leal) / `_tarde` (resentido) | ≈ `llega` (es leal) |
| B7 | Merengue, Lila, Casa, Apuntador, Rhi | `b07_merengue_*`; `b07_lila_expediente_enviado` / `_guardado`; `b07_casa_*`; `b07_apuntador_vencido_2` / `_gana_2`; `b07_rhi_*` | — |

Tablas completas con efectos: → registro, «Decisiones … que el BN DEBE leer» de cada publicación. Las «grandes» llevan la etiqueta en negrita.

---

## 4. Personajes

Apariciones = escenas por bloque de `registro-auto.md` (las carpetas `b05`/`b06` incluyen las pasadas de profundidad). ⚠ = menos de 3 bloques distintos. Fichas → personajes.md; voces de candidatas → candidatas.md.

### 4.1 Principales y recurrentes

| Nombre (id) | Rol | Voz (≤ 15 palabras) | Bloques | Esc. | Estado |
|---|---|---|---|---|---|
| Riolu/Lucario | Compañero; de Isla Hierro, linaje de Quinoa | Aura; `{riolu}` en textos | todos | — | Lucarita; sueños de aura; se irá (VII) |
| Rotom | Pokédex con Módulo Diario (Eco de Ansel) | «Hoy mi entrenador…»; «¡Bzzt!» | todos | — | Según `b06_eco_*` |
| Handsome (`handsome`) | Policía Internacional; te recluta | Torpe, noble, disfraces malos; a veces en tercera persona | 1–7 | 59 | Aliado |
| Matière (`matiere`) | Agencia de Detectives; fue Esprit | Práctica, cariñosa con Handsome | 1,2,5,6 | 13 | Aliada |
| Ansel Moreau (`ansel`) | **El Arquitecto** | Abuelo científico, menta en papel azul, «Los datos no mienten…» | 1,4,5,7 | 6 | Activo; con `doble` cree que nadie lo sabe |
| Octavia Lemnis (`octavia`) | Presidenta; viuda de Julien | Carismática, idealista, inflexible | 7 | 9 ⚠ | Aliada desde el B7 (rama) |
| Xero (`xero`) | Contratista de Lemnis, ex Flare | «¡Bwahaha!», ego científico, ambiguo | 1,4,5,6,7 | 22 | `b07_xero_detenido` / `_escapa` |
| Lebrun (`lebrun`) | Inspector, **topo** (revelado B4) | Escéptico, burocrático | 1,2,4,6 | 12 | Rama del B4 |
| Camille (`camille`) | Hija de Lebrun, 15 | Lista, irónica, protege a su padre | 5,6,7 | 5 | Postal de Galar; sobre Ω sin responder |
| Noa Lambert (`noa`) | Cazatalentos de Lemnis | Amable, asustada, cuenta cosas | 1–4,6,7 | 11 | **Muerta (B7)** |
| Bastien (`bastien`) | Rival amistoso, contrato abusivo | Genuino, competitivo, educado | 1–7 | 51 | Lleva la insignia de Noa |
| Magda Ivers (`magda`) | Infraestructura de Lemnis, «M.» | Calmada, cifras y unidades, nunca insulta | 4,7 | 10 ⚠ | Puede dudar |
| A.Z. (`az`) | Rey eterno con Floette | Pausado, triste, solemne | 1–7 | 7 | **Una aparición por acto** |
| Alexia (`alexia`) | Periodista; socia de La Gaceta | Profesional, curiosa | 1,2,4–7 | 26 | Socia |
| Petra (`petra`) | Paleontóloga, Diggersby Pala | Entusiasta, se ríe de sus caídas | 1–7 | 42 | Ámbar cerrado; con Encina |
| Ulises (`viajero`) | Viajero de la cabina azul | Rapidísimo, mezcla tiempos, cree que es martes | 1–6 | 21 | Dialga joven dormido en la cabina |
| Ysolde (`ysolde`) | Vencejos (rango Ala) | Seca, metáforas de altura | 1–4,6 | 34 | Mario es Ala |
| Gaspar (`gaspar`) | Chef ambulante | «Comer bien es la mitad de la aventura» | 1–3,5–7 | 34 | Socio de la Fonda |
| Philippe (`philippe`) | Inmobiliario, mago malo; museo | «Phil-osofía», trucos fallidos | 1,2,5–7 | 63 | Conservador del museo |
| Lucien (`lucien`) | Niño, 12; Chespin; portero del ático | Inocente, apunta horas | 1,2,5,7 | 19 | Encontrado (`vars.lucien_viaje = 0`) |
| Aurelio (`aurelio`) | Ranchero de Mareep | — | 1,2 | 9 | **Muerto (B3)** |
| Adela (`sobrina`) | Sobrina, veterinaria | Corta, sin adornos; se quiebra al nombrar al tío | 3–5 | 30 | Rancho (rama) |
| Lola Arriaga (`lola`) | Bollos; ex recluta Rocket | Brusca y cálida, «Fiado no» | 2–7 | 18 | Confesó (B7), sin absolución |
| Renata (`renata`) | Candidata; pódcast | Ver §4.3 | 1–7 | 57 | Caso Olmedo cerrado |
| Tadeo Lis (`tadeo`) | **El Apuntador** (no revelado) | Amable, con coartada | 6,7 | 4 ⚠ | Identidad en el B8 |
| Matías Olmedo (`olmedo`) | Ingeniero de la primera Puerta | — | 6,7 | 4 ⚠ | Testigo protegido |
| Calder Wynn (`calder`) | Programa Ultra; cerró el umbral de Malia | Suave, metáforas de luz | 5,6 | 19 ⚠ | Testigo posible |
| Leilani, Soldi | Candidata; brazo robótico | Soldi: elogios envenenados | 5–7 | 32 | Taller Kahale |
| Kalena, Kekoa | Rancho Ohana; Terrón | Kekoa: frase seca | 5–7 / 5,7 | 8 / 5 ⚠ | Terrón = Mudsdale (cerrado) |
| Nate (`nate`) | Compañero de Rhi | «Qué flojera…» | 1,2,7 | 14 | Encargado de El Campo |
| Gareth (`padre_rhi`) | Padre de Rhi | Habla del césped como de una persona | 7 | 5 ⚠ | Socio de El Campo |
| Bruna Ledesma (`bruna`) | Rival que aprende (sin trama) | Datos y porcentajes, «lo apunto», clic del bolígrafo | 6 | 3 ⚠ | Motor `rival.js` (cada 2 hitos) |
| Mauro Quintana (`quintana`) | Perito de siniestros | «Una cosita nada más» (máx. 1 por caso), «eso no cuadra» | 6,7 | 32 ⚠ | Casos justos, sin trama |
| Dolores (`p7_dolores`) | Arregla muñecos (Lavanda) | — | 4–6 | 10 | Falta el `art` del muñeco |
| Remedios (`remedios`) | Abuela Ortega | «Acuérdate de lo que le gustaba…» | 1,2 | 5 ⚠ | Ya no estará en 2027 (ofrenda) |
| Irene, Kaori, Lila, Rhi, Sera | Candidatas | §4.3 | — | 20/36/17/53/26 | §4.3 |

**Otros recurrentes:** Brock (1,2,6; hermano mayor, cocina), Corelia (1–4,6; «¡A tope!») y Cornelio (1,4 ⚠), Misty (4–6; orgullosa, competitiva; la «revancha» de Mario), Héctor (1,2,4–6; «¡Transformación!», encargado del castillo), Conde Vladimiro (1,2,4,5; vampiro teatral, socio del castillo), Ciprés (1,2,5), Melia (1–4; rama `b02_frag_*`), Rouxel (1,2,5; caído, informante), Gadd (1,4,5), Tobías y Duquesa (1,3–5; reality en mazmorras), Simón (1,4–6; plazo `p7_simon`), Olivia (7, vencida), Kiyo, Fuji, Bill y Sabrina (Kanto; Sabrina nota el eco del Rotom), Nico y Tía Rosa (6–7, Estudio), Dámaso (2,3,6), Ramiro y Elm (2,3,5).

**Canon por región (casi todos ⚠ 1–2 bloques):** Johto: Antón, Morti, Kurt, Protón, Atenea, Atlas, Lance, Yasmina, Li · Alola: Kukui, Kaudan, Kiawe, Mayla, Hela, Gladio, Zyra, Fabio, Francine, Pimpinela, Lulú, Nereida, Liam · Teselia: Encina, Camila, Acromo · Galar: Sonia, Magnolia, Percy, Roy, Nerio, Naboru, Sally, Lionel. **OC de un bloque:** Ottilie, Maren, Agnes, Priya (B7) · Consuelo, Hilario, Abril, Benigna (Cirio) · Inés, Celia, Teodoro (B6, +1 en B7) · Casilda, Jade, Ciro, Evaristo, Rosaura, La Mayor (P7) · red de auxilio: Olga, Pilar, Gonzalo, Damián, Noemí, Vera, Isandro, Nico (recadero) · Mireille, Odile (2 bloques).

**Necesitan volver** (→ hilos «Personajes del B7 que necesitan volver»; registro «Pendientes»): Naboru, Sally, Nerio (con sus gimnasios), Percy, Roy (revanchas), Sonia, Magnolia, Lionel (Copa), Gareth, Priya (imprevistos), Agnes, Ottilie, Maren, Octavia (B8); Tutu Moana, Puka, Margaux (P9, 1 escena); Kaudan, Nereida (vuelta a Alola); Cornelio, Remedios, Antón, Protón, Lance.

### 4.2 Reglas de personajes

- Regla de las **3 apariciones en bloques distintos** (→ biblia §0, §8.2).
- **Nadie aparece porque sí:** origen y motivo para dirigirse al jugador; si encaja uno conocido de la zona, úsalo (→ progreso, nota 2026-10-11).
- **NPC que viaja con la historia:** `cond` de salida de región (`!flag.b02_puerta_cruzada` Kalos, `!flag.b02_fin`/`!flag.b03_fin` Johto, `!flag.b04_fin` Kanto…), con `|| (quest.X && !done.X)` si su misión sigue abierta (→ registro, 2026-10-28).
- Protagonistas canon nunca por nombre («el campeón de X») (→ biblia §1).
- Ulises nunca dice «Dialga» ni nombres de *Doctor Who*; Ysolde nunca hiere (cae sobre algo blando); rangos de los Vencejos: Pluma, Ala, Vencejo, Cumbre.

### 4.3 Las 7 candidatas (→ candidatas)

Etapas de `af.X`: Conocida 0–19 · Amiga 20–44 · **Cercana 45–69** (momentos a solas) · **Confidente 70–89** (te pide algo) · **Corazón 90–100** (elegible en el IX). Diálogos ±1–2; **acciones ±5–15**. Sin «frase correcta». Todas adultas (21–27). **Si Mario la riega con cualquiera, siempre debe poder arreglarlo** (pedido de Mario, oct 2026; aplicado a Sera en `t10-serafina.js`).

| Candidata (`af.`) | Mario | Sube | Baja | Estado / pendiente |
|---|---|---|---|---|
| Lila Dufresne, Kalos, 21 (`lila`) | 27 | Amabilidad con débiles, lealtad, paciencia, tratarla como igual | Crueldad, mentirle, sobreprotegerla (quitarle combates) | Sylveon. Madre = E. Dufresne (huyó de Lemnis). **B8: en persona**. Corazón: enciende sola la llama y te da la primera llave |
| Rhi Hargreave, Galar, 22 (`rhi`) | 33 | Vencerla limpio, valentía, honestidad brutal, no compadecerla | Rendirte, falsa modestia, **dejarla ganar**, cobardía | Petición: portero cuando vuelva al Desafío. Corazón: tras perder contigo una final |
| Sera Lemnis, Paldea, 24 (`sera`) | 13 | Competencia, discreción, cumplir tu palabra, verdad incómoda, modales | Sentimentalismo, impulsividad, humillarla en público | Reconciliación publicada; `sera_canal_abierto` sin leer; negocio en `pendientes/`. Corazón: se quita los guantes en la torre de Paldea |
| Renata Castellanos, Teselia, 25 (`renata`) | 21 | Ingenio, ganarle una deducción, lealtad, humor | Aburrimiento, solemnidad, robarle el crédito | Momento de corazón sin usar (apaga el micro) |
| Irene Solberg, Sinnoh, 27 (`irene`) | 20 | Curiosidad, paciencia, estudiar, respeto por la historia | Destruir ruinas, prisa, bromas de estatura | Observatorio en Crómlech; **Acto VII**. Corazón: tu nombre en Unown |
| Kaori Yakushiji, Johto, 23 (`kaori`) | 43 (+botica) | Honestidad, curiosidad científica, ingredientes raros, no juzgarla | Vanidad, superstición, interrumpir experimentos | Momentos a 45 y 70 (B7); el «té sin veneno» **sin usar** |
| Leilani Kahale, Alola, 24 (`leilani`) | (?) | Creatividad, humor, confiar en sus inventos, lealtad | Hacerla sentir que sobra, condescendencia | Lámpara rota = final de su arco |

Voces: Lila «e-esto…», frases cortas · Rhi jerga de fútbol, apodos, grita feliz · Sera de usted, ironía seca, pasa al tú sin avisar · Renata «Cool, cool, cool», «Nota para el episodio» · Irene académica, se corta al avergonzarse · Kaori seca, monótona, solo se emociona con venenos · Leilani rapidísima, chistes malos, «¿sí o qué?».

---

## 5. Hilos abiertos (→ hilos, «Estado tras el B7» y anteriores)

**Regla:** cada parte de un hilo es su propia misión y **se cierra al terminar su parte**; el único gancho abierto a propósito es `b04_t_cueva` (Mewtwo). Al activarse `bNN_fin`, el motor archiva los hilos colgados del bloque (`closeHangingThreads`). Avanza ≥ 3 por bloque y abre 1.

- **Tronco / La presidenta** → Acto VII en Sinnoh según `b07_octavia_*` (información, crisis o testigos); Fundación Horizonte y «Dirección (Ω)» a la vista; Acto VIII «La heredera».
- **El Apuntador** → B8: tercer acto en el teatro de Mayólica, identidad (Tadeo), cinta del episodio 3 (→ b07-plan §5).
- **Duelo de Noa** → mesa vacía, Lucien la nombra en el ático (y vuelve a la garita), **evento anual** (fecha a proponer en el plan del B8). Bastien lleva su insignia; su arco sigue en el VII.
- **Lola** → aparición corta según rama. **Kaori** → siguiente paso del antídoto. **Rhi** → su petición al volver al Desafío; corazón en la final de la Copa.
- **Lucario** → VII: separación, Quinoa, Lucarita Z; semilla de guardianes (Bosque Oniria). **A.Z.** → aparición del VII. **Ulises** → VII, «cuando el pequeño crezca». **Irene** → de Crómlech a Sinnoh (el observatorio sigue con Handsome o Simón).
- **Lila** → B8 en persona, su madre (`expedientedufresne`). **Gaspar** → Fonda de Priya (imprevistos). **Casa de las Siete Puertas** → vuelta a Plié con el gimnasio de Sally.
- **Ysolde** → siguiente rango (Vencejo) en un acto alto; la Cumbre habla sin verse. **Camille** → sobre con Ω sin responder. **Malia** → acto alto; Calder y Pimpinela testigos. **Olmedo** → testigo; reencuentro con su hija. **Magda** → reparar el Nodo 03; puede dudar.
- **Mewtwo** (`b04_t_cueva`, abierto) → acto alto, contra el Lazo; no capturable antes del IX. **Necrozma** → IX. **Kyurem** (escarcha de Chamota) y **Victini** (rumor) → vuelta a Teselia o evento. **Ho-Oh** (hueco de pluma) → sin plan.
- **Serafina** → llamadas (`sera_canal_abierto`), negocio en Paldea. **Remedios** → ofrenda de 2027 (`ev_muertos_2`; puede leer `vars.ofrenda_lavanda_n`, `has("calaverita_lola")`). **Leilani** → la lámpara. **Renata** → corazón; el episodio 3 le dolerá.
- **Pueblo Cirio** → capítulos 2–5 + epílogo (`bloques/p16-cirio-plan.md`, CONTENIDO §22).
- **Menores:** muñeco de Dolores (`art`) · Casilda al tren en primavera (20–22 mar) · Evaristo y su hermano en Olivo · La Mayor dice su nombre · rancho rama Lemnis («los contratos se acaban») · Simón (`p7_simon`) · doña Amparo y el canal 00 · sin plan: el muchacho del Heracross, la madriguera fósil.

---

## 6. Diario de Rotom (→ biblia §3.5, §7; registro «Pistas plantadas»)

**Reglas clave:**
- Lo narra el **Eco de Ansel**: **nunca miente, omite** y elige qué contar (*Ackroyd*). Reporta la ubicación a Lemnis.
- Entradas con `cond: 'flag.b01_diario'` (Diario instalado tras la medalla 1).
- **Tres variantes de cada `diary`** (el motor no adapta solo): `purgado` = Rotom de verdad, frases cortas, alguna falta, sin «¡Bzzt!» · `reformado` = voz de siempre y al final *(Omitido: nada.)* · `doble` = alegre e incompleta (la lee Lemnis; Ansel sabe lo que Mario deja contar, `b07_doble_*`). Rotom fuera del Diario también más simple con `purgado`.
- Tras la revelación, releer duele el doble; cada pérdida lleva su entrada.
- Contenido de profundidad (eventos, negocios): entradas con voz de Rotom **sin pistas del calendario**.

**Pistas ya plantadas (no repetir):**
- **B1:** corbata azul «de siempre» y la frase de Ansel; omisiones (jaula de la Ruta 5, logo y Melia, máquina y trato); «El doctor Moreau **dice**…».
- **B2:** «Hoy, sin novedades…» el día de Handsome; tres días perdidos; omite N-02, Melia, el sótano y la tos de Aurelio.
- **B3:** «la doctora Lambert» (única vez).
- **B4:** «…bzzt… sincronizando…»; 2 s en blanco en la Puerta de Kanto; la foto que Rotom no recuerda; el eco que nota Sabrina.
- **B5:** Hauoli «desde el otro lado» de la Puerta; el escáner de Æther: «Dispositivo de Dirección»; «Hoy el sujet…» → «¡Hoy mi entrenador…!» (**única vez en todo el juego**).
- **B6:** la revelación (Riolu gruñe a la Pokédex, sin entrada de los días de la cabina, servidor «Eco: perfil A. M. · Reporta a: Dirección (Ω)», «Presidencia: sin acceso»).
- **B7:** Rama `doble`: Rotom pregunta «¿Esto se lo contamos?» (T0 y T5); mensajes de Ansel (`cartaanselgalar`; «Era muy buena contando»).

**Lo que toca:** ninguna pista más del Eco; cuidar las tres ramas, el duelo por Noa y, con `purgado`, el del Rotom en los eventos anuales. **Pendiente de motor:** que el Diario se adapte solo a la rama (→ registro, 2026-10-30, pendiente 1).

**Otros hilos de pistas en marcha:** Ω (sobres, «Copia a Dirección (Ω)», Ω-0-0-0 del desvío del B2) · menta en papel azul (Ansel, Lebrun, Calder) · N-02 y «Destino: por asignar» · los sueños de aura de Lucario.

---

## 7. Balance (→ balance)

| Bloque | Jefes de la curva (as) | Tope |
|---|---|---|
| B1 | Brock 12–14; Blanca 21–23; Corelia 29–32; Mega-Lucario de la Torre 34 | 24 (medalla 1) → 33 (medalla 2) → 35 |
| B2 | Antón 36, Rhi 37, Bastien 38, Morti 39, Atenea 41 | 37 → 40 → 42 |
| B3 | Li 42, Corelia 43 (Mega), Yasmina 45, Atlas 49 | 46 → 48 → 50 |
| B4 | Rhi 49 (opc.), Misty 53 (a propósito sobre el tope), Atenea 53, Magda 53 | 52 → 54 → 55 → 56 |
| B5 | Kaudan 57, Mayla 59, Fabio 60 (Mega-Alakazam), Calder 61 (Z) | 58 → 59 → 60 → 61 → 62 |
| B6 | Camila (Mega-Eelektross), Brock (Mega-Steelix), Xero, Acromo 67 | 64 → 66 → 67 → 68 |
| B7 | Percy 69 (Dinamax), torneo 71, Roy 72 (Gigamax), Olivia 73 (demostración) | 70 → 72 → 73 → 74 |
| B8+ | **+6 por bloque** (≈ 80 en el B8 por la regla; sin fijar), más despacio desde 60, **100 en el Acto IX** | — |

**Reglas de combate (→ balance §4):** jefe = tope − 1 en su as, resto −3/−1 · equipos de 3 (medallas 1–2), 4 (3–5), 5 (6+), 6 (actos finales) · curaciones: líderes 1 hasta la medalla 4 y luego 2, jefes 2, nada total antes del Acto IV · preparación máx. 1 por equipo hasta el B3, nunca en un as ya más rápido · Robustez/Banda Focus una vez por combate · cada jefe con una respuesta capturable en las 2–3 zonas anteriores (la ficha lo insinúa) · rival con ≥ 2 Pokémon: Centro antes o `heal: true` · dinero = as × 20 × clase (×1 genérico, ×1,5 gimnasio, ×3 líder/rival, ×4 jefe) · salvajes canon reajustados, 1 rara ≤ 5 %, `desplazado: true` · IA 1–2 genéricos, 3 rivales, 4 líderes, 5 jefes.

**Zonas viejas (§4b, «fijo con revanchas»):** sin escalado; nueva temporada en rutas viejas a curva actual − 3; una revancha opcional de líder por bloque; salvajes de vuelta a curva − 8/− 4; **nunca** subir combates obligatorios publicados.

**Tope suave** `vars.cap` (×0,1 de EXP), Repartir Experiencia, zonas de entrenamiento `training: { cap }`.

**Decidido por Mario:** la curva se queda como está; equipo libre entre regiones, sin igualar niveles; las evoluciones por intercambio solo piden el **Cordón Unión** (no lo «corrijas» al canon).

**Auditoría del bot:** ≥ 75 % llegan al final (bloquea); ≤ 2 derrotas de media por rival y ≤ 2/3 de partidas sin derrotas (avisos).

**Muros conocidos:** `rhi_4`/`rhi_5` (opcionales, suavizados dos veces) · Misty (bajar a 52 si se queja) · Acromo y Brock del B6 (primero Metagross 66 y Rhyperior sin Puño Hielo) · Bruna 1,6 (opcional) · `rhi_7` una revancha al día · semillas 5 y 7 del bot se atascan en el B6.

**Megas, Z, Dinamax y Tera a la vista:** cada bloque enseña ≥ 2 Megas ajenas y 1 Tera (salvaje de Fisura o de entrenador); los combates con mecánica que no sean de jefe, **opcionales**.

---

## 8. Gustos de Mario y referencias (→ referencias)

**Le encanta:** historia primero; giros con pistas plantadas (*Ackroyd*); noir con pistas justas; facciones con rangos; decidir con matices («encerrar al jefe y soltar a los demás»); que fallar abra camino; NPCs que vuelven; secundarias grandes (1,5–2 h); zonas de entrenamiento; la muerte de Aurelio («me encantó, aunque dolió») y el suspenso de Noa; gestionar dinero y negocios; **avisos** en vez de buscar; Lucario, inicial de fuego, no repetir tipos. **Patrón favorito:** *personaje entrañable → objeto clave con pixel art → abre una zona* (Aurelio → Farol de Lana → Galería Honda).
**No le gusta:** dos Pokémon de la misma línea; misiones abiertas sin nada que hacer; personajes sin motivo; que lo reten sin curar.

**Fuentes** (tabla por categorías → referencias, «Gustos del jugador»): sobre todo Shangri-La Frontier, Mushoku Tensei, Blue Lock, Apothecary Diaries, Sherlock/Poirot, Doctor Who, Knives Out, Kingsman, Babel, Ackroyd, Dungeon Crawler Carl, Zelda, Jedi: Fallen Order, Curse of Strahd, Leyendas Legendarias.

**Regla:** sutiles, **máx. una evidente por misión**, sin nombres reales. **Prohibidas: *Portal* y *Dr. Stone*** (ya usadas).

**Ya usadas (no repetir):** *Doctor Who* (Ulises: cabina, bufanda, «más grande por dentro») · *Assassin's Creed* (Ysolde: saltos de fe, hoja oculta) · *Knives Out*/Poirot (macaron, B1) · *B99*/*OMITB* (Renata) · *Modern Family* (Philippe) · *Dungeon Meshi* y *Food Wars* (Gaspar vs Lulú B5, vs Priya B7) · *Tokyo Revengers* (Encinar) · *Yozakura* (reclutas Rocket) · *Kumo* (Hebra) · *Database Detective* (Miltank del tren, Silph, Chamota) · *Bullet Train* (Tren Magnético B2/B4) · *Now You See Me* (Rouxel) · *Critical Role* (Valentín) · revancha de Misty (B4) · *Ghosts* (Torre Radio) · *Ted Lasso* (galletas de Lola, «CREE» en rancho y Hoyuelo) · Zelda (acorde, P6) · *Percy Jackson* (Leilani) · *BioShock* (megafonía de Æther) · Destripador/Holmes (Apuntador) · *Rashomon* (Chamota) · *Blue Lock* («Un delantero sin ego es un defensa con suerte») · Holmes («una bota con clavos») · Strahd (Conde) · *Luigi's Mansion* (Gadd) · constelaciones del druida (observatorio).

**Ideas de ChatGPT** usadas: el Pokémon que no quiere evolucionar (Terrón), el museo, la misión que fracasa bien (`cg_indice`, la Casa), la Casa de las Siete Puertas, el Torneo de los Villanos, la Liga de los Siete Oficios. Sin usar: el Juego de los Doce, El Último Campeón (posjuego o Copa).

---

## 9. Pedidos permanentes de Mario (→ CLAUDE.md §2.4; progreso)

1. **Colección completa** (iniciales, pseudos, fósiles, legendarios, singulares, ultraentes, paradojas, especiales); legendarios siempre con historia.
2. **Mecánica especial asegurada:** toda Mega, Z exclusivo, Gigamax o forma con objeto se consigue en algún momento (respetando actos).
3. **Regiones completas** en visitas siguientes, sin reescribir lo publicado.
4. **Una Megapiedra o montura por bloque**, con historia, mejor de Pokémon que usa.
5. **Únicos:** `wild` capturable vuelve tras el siguiente hito; `unique: false` en repetibles.
6. **Toda piedra, objeto de evolución o MT nueva** con una fuente (Tutor, «Dónde conseguir»).
7. **Los tres iniciales de cada región**, cada uno con escena.
8. **Nunca una especie o línea repetida** (`owns()`); si la tiene, se queda a vivir en el sitio.
9. **Premio del instructor** (`prize`) en toda zona de entrenamiento (Megapiedra 1 de cada 3–4).
10. **Un negocio nuevo o ampliado por bloque**, con socio querido.
11. **≥ 2 Megas ajenas y 1 Tera por bloque**; mecánica fuera de jefes, opcional.
12. **Cinemáticas** con CINE.md, 2–4 por bloque.
13. **≥ 4 sitios con minijuego por bloque**, variando el tipo.
14. **Hilos que se cierran** al terminar su parte.
15. **Museo:** 2–4 piezas por bloque.
16. **Colección:** `gather`, 2–3 `read` y ≥ 1 `art` por bloque.
17. **Lucario se luce** en cada bloque.
18. **Despedidas sí, muertes no** en su equipo.
19. Nada importante se pierde para siempre.
20. El Diario «Por hacer» solo lista lo que pide actuar.
21. Curar antes de todo combate con nombre.
22. Siempre se puede arreglar la relación con una candidata.
23. Curva sin tocar; dinero bajo «está bien así».

### 9.1 Pendientes (→ progreso, «Pedidos de Mario pendientes»; disenador-2026-10-31)

**Colección soñada (2026-10-31):**

| Grupo | Conseguibles | Faltan |
|---|---|---|
| Iniciales | 16/29 | Bulbasaur, Charmander, Squirtle, Treecko, Torchic, Mudkip, Turtwig, Chimchar, Piplup, Chespin, Froakie, Sprigatito, Quaxly |
| Pseudolegendarios | 3/10 | Dratini, Beldum, Gible, Deino, Goomy, Jangmo-o, Frigibax |
| Fósiles | 15/15 | — |
| Evoluciones de Eevee | 8/8 | — |
| Especiales | 12/16 | Porygon, Rotom, Spiritomb, Chansey |
| Legendarios menores | 2/44 | — |
| Legendarios | 2/27 (Reshiram, Eternatus) | — |
| Singulares | 0/23 | — |
| Ultraentes | 0/11 | — |
| Paradojas | 0/16 | — |

Lista completa de los que faltan → `secreto/auditorias/disenador-*.md`.

**Megapiedras ya conseguibles:** Lucarita, Ampharosita, Aerodactylita, Delphoxita, Gyaradosita, Galladita, Heracrossita, Absolita, Tyranitarita, Scizorita, Gengarita, Alakazamita, Chandelurita, Salamencita, Feraligatrita, Greninjanita y Meganiumita. (La Greninjanita existe, pero la línea Greninja aún no se puede conseguir.)

**Cristales Z ya conseguibles:** Normastal, Lizastal, Hidrostal, Pirostal, Litostal, Dracostal, Psicostal, Geostal, `snorliumz` e `inciniumz` (Z de especie).

**Gigamax:** Sopa Maxi (B7).

**Monturas:** Rhyhorn, Lapras (con el Ride Gear) y Aerodactyl.

**Falta (mecánicas):**
- **Victreebelita** y **Golurkita** (Mario tiene Victreebel y Golett) → B8.
- **Cristales Z sin fuente:** Eléctrico, Fantasma, Siniestro, Hada, Hielo, Volador, Bicho, Veneno, Acero y Planta, más los exclusivos de especie que use Mario.
- La lista general de Megas que faltan está «por hacer» (→ progreso).

**Regiones por completar:**
- **Alola:** la prueba de Lulú (Planta, con Planastal Z, aparte de su restaurante); Ula'ula entera (Chris, Zarala, el kahuna Denio); Mina en Poni.
- **Kalos, Johto y Kanto:** gimnasios, pueblos y rutas canon que faltan. El líder canon de cada ciudad tiene que acabar existiendo.
- **Galar** (→ b07-plan §14.2; **aún no está copiado en progreso.md**):
  - Pueblos: Yarda, Amura (Cathy), Ladera y Auriga; Ciudad Puntera (Torre Rose).
  - Gimnasios: Naboru, Cathy, Sally, Nerio, Ladera y Auriga.
  - Rutas 1 y 5–10, el resto del Área Silvestre, el Bosque Oniria y la Corona de la Torre de Artejo.

**Negocio pendiente:** el de Serafina (`app/content/pendientes/serafina-negocio.js`), que se conecta en Paldea.

**Arte y motor pendientes** (→ progreso): iconos pixelados en vez de emojis · dobles y hordas · sonido · fondos animados · `art` de Cirio y del muñeco de Dolores · historias de tus Pokémon siguientes (Tyrantrum, Faro, Delphox).

---

## 10. Reglas técnicas que se repiten en cada encargo (→ b07-encargo; b07-avance; CLAUDE.md §2.4)

- **Diario en tres variantes**, con las constantes de b07-encargo, «Contrato del Diario»:
  `DIARIO = 'flag.b01_diario'`
  `D_PURGADO = DIARIO + ' && flag.b06_eco_purgado'`
  `D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado'`
  `D_DOBLE = DIARIO + ' && flag.b06_eco_doble'`
  Modelo: el final de `b06/t5-dragospiral.js`.
- **Compañero:** `{riolu}` en los textos y `LUC = 'inParty("riolu") || inParty("lucario")'` cuando una escena dependa de que esté en el equipo. Pronombres del jugador: `{o|a|e}`.
- **Buzón:** los ids de objeto que van al Buzón, **sin guiones bajos** (`mail.item` se busca tal cual: `cartaanselgalar`). El Buzón entrega como mucho una pieza cada 20 h (CONTENIDO §15).
- **Curar antes** de todo combate contra un personaje con nombre (pociones del NPC o el Centro). Los jefes de trama, con `heal: true` si no hay Centro; en los torneos, curación entre rondas. Si el combate se puede perder, `lose: 'continue'` con revancha.
- **`owns()` de toda la línea** antes de regalar un Pokémon. Si ya la tiene, flag `_vive` y el Pokémon se queda en el sitio para visitarlo. Para Megapiedras repetidas: `grep -rn "ite'" app/content`.
- **Español:** diálogos neutro-latinos para CDMX y **nombres oficiales de España** (`name` de `app/data/`; WikiDex). **Fuera:** vale, tío, chaval, ordenador, coger (vulgar en México), mola, guay, vosotros, «Cogió». El Superfan avisa.
- **Spots en zonas viejas:** `new` siempre; si no, Mario no se entera.
- **Sub-lugares:** solo existen si hay un spot `go` o un `branch` visible que lleve a ellos. Cierra con `cond` las entradas de escenas ya terminadas.
- **Marcadores:** «!», «?» y «•» solo si el guion cambia algo en ese estado. Para hablar sin avanzar, una variante de `talk` con su `cond`, sin comandos `quest`.
- **Misiones de hilo:** se cierran con `{ quest, stage, done: true }`. Las de reunir cosas llevan `parts`. Ficha ≤ 240 caracteres, con un lugar o un personaje de ancla y `est` en minutos.
- **Condiciones de diálogo:** `!done.x` o `quest.x == 'hecha'`; una misión terminada no se reabre.
- **Cartas y notas:** siempre objeto con `read` (y `{ read: 'id' }` si se leen en el momento). Nunca una carta larga en `text`.
- **Únicos:** los `wild` de práctica llevan `noCatch: true` o `unique: false`; los legendarios, `onCatch` con su flag `_tuyo`.
- **Regalo antes de combate:** nunca, si el combate puede cortar el guion.
- **Bloque fuera de `BLOCKS`:** `INFINITO_EXTRA=bNN node herramientas/<x>.mjs` (p. ej. `validar.mjs`; `recorrido.mjs --semilla 3 --hasta bNN_t0_hecho`). Los avisos `[bNN] … pendiente` no son errores mientras falten tramos.
- **Tras ejecutar las herramientas para probar:** restaura `secreto/auditorias/` (validador, superfan, tester, diseñador y hub reescriben los informes) para no subir informes a medias (→ b07-avance, paso 5).
- **Ids que ya chocaron:** `nido_1…3` y `terraza_1…3` eran del B6 (el B7 usó `nido_galar_*`, `terraza_hoy_*`). Pon región o lugar en el id y búscalo antes (`registro-auto.md`, `grep -rn`). Nunca renombres ni borres ids publicados: `patches` o lógica nueva.
- **Arte:** objeto clave nuevo = pixel art en `PX_ITEMS` + cinemática al recibirlo y al usarlo; nada de Pokémon ni canon dibujados. Un `art.js` roto solo lo ve la prueba de humo (en el B6 se metieron iconos dentro de otro objeto).
- **Viajes:** `patches` en las Puertas viejas (cruce `bNN_cruce` + «Cruzar a…»); vuelos `flag.mount_aerodactyl && visited(destino)`, sin duplicar. Aviso de ritmo `milestone` con `hoursLeft: 3` ~3 h antes del final (B6/B7: primera entrada a la última ciudad).
- **Al publicar:** `bNN` en `BLOCKS`, `CONTENT_VERSION` `AAAA-MM-DD.N`, `build-sw.mjs` lo último, commit sin spoilers.

---

## Cómo mantener este resumen

Al publicar cada bloque (o una pasada grande), quien publique actualiza:

| Sección | Qué cambiar | Fuente |
|---|---|---|
| Cabecera | Fecha y `CONTENT_VERSION` | `app/content/index.js` |
| §1.1 | Fila nueva: acto, región, enganche, fin, tope y medallas | Sección nueva de `registro.md` |
| §1.2 | Dónde va Mario, equipo, afinidades y rep, si mandó un respaldo | `progreso.md` |
| §2.1 | Marcar el acto como hecho y reescribir «Qué toca en el BNN» | `biblia.md` §5, `hilos.md` |
| §2 | Nodos, remanentes y pérdidas hechas o pendientes | `biblia.md` §3, §9 |
| §3 | Filas de las decisiones nuevas; ✔ o ≈ cuando se conozca la rama de Mario | Tabla «DEBE leer» del registro |
| §4 | Personajes nuevos, recuento de escenas (regenera `node herramientas/registro.mjs`), estado (muerto, ido…), lista «Necesitan volver» y afinidades | `registro-auto.md`, `personajes.md`, `candidatas.md` |
| §5 | Reescribir la lista con el «Estado tras el BNN» y quitar los hilos cerrados | `hilos.md` |
| §6 | Pistas del Diario plantadas en el bloque; reglas nuevas del Diario | `registro.md`, «Pistas plantadas» |
| §7 | Fila del bloque en la curva, muros nuevos y decisiones de balance | `balance.md` §3, §6 |
| §8 | Referencias usadas y gustos confirmados | `referencias.md` |
| §9 | Pedidos nuevos; colección, Megapiedras y cristales; monturas; regiones tachadas | `CLAUDE.md` §2.4, `progreso.md`, último `disenador-*.md` |
| §10 | Reglas técnicas nuevas del encargo o del avance (ids que chocaron, contratos nuevos) | `bNN-encargo.md`, `bNN-avance.md` |

Mantén el resumen entre 4 000 y 5 500 palabras: resume más fuerte lo cerrado y deja el detalle en los originales.
