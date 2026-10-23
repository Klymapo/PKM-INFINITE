# REGISTRO DE CONTINUIDAD (manual)

> Qué está publicado, qué decisiones puede haber tomado el jugador y qué debe recoger lo siguiente.
> El registro automático (apariciones, flags, nombres de entrenadores) está en `registro-auto.md`: regenéralo con `node herramientas/registro.mjs`.
> **Añade una sección por cada publicación.**

---

## Publicación 1 · 2026-10-05 · Bloque 1 "Acto I · Fisuras" (Kalos: Luminalia → Yantra)

### Estado del mundo al terminar el B1 (`flag.b01_fin`)

- **El jugador:**
  - Tiene 3 medallas: `medalla_roca`, `medalla_encanto` y `medalla_lucha`.
  - Tiene Megaevolución: `mec_mega`, objetos `megaring` y `lucarionite`.
  - Lucario seguro (`forceEvolve` en la Torre si no había evolucionado).
  - Montura Rhyhorn (`flag.mount_rhyhorn`).
- **Diario de Rotom:** instalado tras la medalla 1 (`flag.b01_diario`).
- **La Puerta Lemnis de Luminalia** se encendió sola. Sera anunció la **Primera Gira Interregional**: los novatos con 3 medallas viajan a **Johto**. El jugador está en la lista. El B2 empieza ahí.
- **Tope suave** al final: `vars.cap = 35`.

### Decisiones del jugador que el B2 DEBE leer

| Decisión | Flags | Qué cambia |
|---|---|---|
| Prensa en el prólogo | `b01_prensa_verdad` / `b01_prensa_neutral` / `b01_prensa_lemnis` | Tono de Alexia, Rouxel y Sera |
| Lechonk en la Ruta 4 | `b01_lechonk_lemnis` (se lo llevaron) / `b01_agente_vencido` (te plantaste) | Handsome sabe que el Lechonk no llegó a Paldea |
| Fennekin | `b01_fennekin_unido` / `b01_fennekin_libre` / `b01_fennekin_rhi` | — |
| Rhi | `b01_rhi_vencida_1`, `b01_rhi_2_hecho`, `af.rhi` | — |
| Mareep de la jaula | `b01_mareep_lemnis` (se quedó con Lemnis) / `b01_mareep_jaula`, `b01_mareep_forzado`, `b01_mareep_noche` | Aurelio con 5 o 6 Mareep |
| **Bastien** (Cueva Brillante) | `b01_bastien_cubierto` / `b01_bastien_rompe` / `b01_bastien_silencio` | **El B2 debe mostrar la consecuencia** (ver `biblia.md`) |
| **Crómlech** | `b01_delatar` / `b01_handsome` / `b01_trato_sera` | Gran decisión. Si `b01_trato_sera`: el jugador tiene `holomisorsera` y Sera le llamará con un "encargo" |
| Lila | `b01_lila_llama` (encendió la llama), `af.lila` | — |
| Afinidades | `af.lila`, `af.rhi`, `af.sera`, `af.renata`, `af.irene` | — |
| Reputaciones | `rep.lemnis`, `rep.policia`, `rep.kalos` | — |

### Pistas del Eco de Ansel ya plantadas (no repetirlas; escalar)

1. **Primera entrada del Diario** (Lemnis): describe la corbata azul "de siempre" y la frase de Ansel, aunque Rotom estaba en recepción.
2. **Ruta 5:** el Diario omite la marca de ganadero y la jaula. Presenta el enfado de Riolu como "tenía hambre".
3. **Cueva Brillante:** omite el logo de Lemnis, a Melia y la decisión.
4. **Crómlech:** omite la máquina, a Xero, el combate y el trato ("vimos a la señorita Lemnis, muy educada").
5. **Final:** "El doctor Moreau **dice** que es el futuro", en presente.
6. **Pista de mundo:** Lemnis siempre aparece donde el jugador acaba de estar (técnicos en la boca de la Gruta Tierraunida; Lazare: "preguntaron por un entrenador con un Riolu").

**Siguiente según el calendario (B2):** una entrada que **omite por completo** un encuentro importante con Handsome (el día "sin novedades").

### Otras pistas plantadas (arco largo)

- La pantalla de la excavación dice **"NODO 01 · KALOS"**: es la red de nodos.
- "Coeficiente de transferencia 12 %", "energía negativa, tira hacia dentro" y el aura de Riolu que parpadea junto a la máquina: el **drenaje vital**.
- Petroglifos de un rey gigante con una flor y una máquina-flor: A.Z. (Galería Honda, Ruta 6, retrato del Conde).
- La tela de Lila: "hilo azul y plata, un lazo que nunca se acaba". Lleva al Acto VI.
- Xero: "Dale recuerdos a… a nadie" (Matière). Rotom: el traje de Xero, "datos restringidos" (Esprit).
- Rotom: la orden contra Melia está "archivada". Pista del topo (Lebrun, Acto III).
- Brock comenta que le ofrecieron un gimnasio en Teselia (Acto V).
- Cornelio: "El vínculo es enorme, pero no es infinito".

### Personajes pendientes de aparecer

- **Lebrun:** no apareció en el B1. Debe salir al inicio del B2 (cameo con Handsome) para empezar su arco de topo.
- Por la regla de las 3 apariciones, todos los NPCs con nombre del B1 deben volver en bloques futuros. Ver `registro-auto.md`.

### Notas de balance de la publicación 1

- Auditoría final (12 semillas de día + 12 de noche): 24/24 llegan al final. Antes de los ajustes, 11 de 14.
  - Los muros son Brock (con un equipo flojo), Blanca (Miltank) y Corelia (Hawlucha).
  - Ajustes ya aplicados: Ruta 4 más suave al principio; tope tras la medalla 1 de 22 a 24; Miltank de 24 a 23 con una sola Superpoción; Hawlucha de Corelia sin Danza Espada y con una Superpoción.
- **Si Mario se queja de dificultad,** el primer sitio a revisar es Corelia.

## Publicación 2 · 2026-10-05 (sesión de día, a petición de Mario)

- **Corrección:** `b01_rhi_2` ofrece pasar por el Centro o te cura antes del combate (Mario se quejó de que lo retó con el equipo dañado). Prueba nueva en la auditoría: `combates-encadenados.mjs`.
- **Encuentros (`t4-encuentros.js`):** 31 escenas de reencuentro (flags `b01_enc_*`). Lebrun, Rouxel, Ansel, Noa, Renata, Melia, Gadd e Irene llegan a 3+ apariciones; un reencuentro para Lucien, Aurelio, Héctor, Philippe, Gaspar, Tobías y Nate.
- **Personajes nuevos:** Petra (`petra`, hilo `b01_t_ambar`), Ulises (`viajero`, hilo `b01_t_cabina`), Ysolde (`ysolde`, hilo `b01_t_vencejos`, combate opcional en Crómlech). Fichas en `personajes.md`, siguiente paso en `hilos.md`.
- **Motor e interfaz:** cinemáticas (`cutscene`), pixel art de objetos clave (`PX_ITEMS`, empieza con el Farol de Lana), entrenador visible en combate, tienda nueva, Poké Ball pixelada y animación de captura, tope de nivel visible en Equipo.

## Publicación 3 · 2026-10-05 (sesión de día, a petición de Mario) · Bloque 2 "Acto II · Ecos del pasado" (Kalos → Johto: Encinar → Iris)

Mario iba por `b01_m7:cromlech` con el aviso de 3 h. **Aún no ha tomado la decisión de Crómlech:** el B2 cubre las tres ramas y la de «ninguna».

### Estado del mundo al terminar el B2 (`flag.b02_fin`)

- 5 medallas (`medalla_colmena` de Antón, `medalla_niebla` de Morti). Tope final `vars.cap = 42` (37 al empezar el B2, 40 con la medalla 4).
- El jugador está en **Ciudad Iris** (Johto). Kalos sigue accesible por la **Puerta de Trigal** (`b02_puerta_trigal`, spots en `puerta_trigal` y `luminalia_plaza`).
- Gimnasio de Trigal en obras: **Corelia** será su líder de intercambio en el B3; **Lila** ya está allí.
- Rouxel cayó (`b02_rouxel_caido`), tiene tarjeta personal (`tarjetarouxel`): informante posible.
- Kaori presentada (candidata, hilo nuevo `b02_t_kaori` en `abierto`: antídoto).

### Decisiones del B2 que el B3 DEBE leer

| Decisión | Flags | Qué cambia |
|---|---|---|
| **El fragmento** (gran decisión) | `b02_frag_handsome` / `b02_frag_sera` / `b02_frag_melia` | Handsome → lo custodia **Lebrun** (topo). Sera → Lemnis recupera la pieza; con trato, Sera pasa al tú; **si había trato y no se lo diste, Sera rompe el trato** (el Holomisor deja de ser canal). Melia → `fragmentoroto` (lleva grabado N-02) y tarjeta negra de un uso: informante en el Acto III |
| Cetoddle (despedida elegida, Paldea, nodo del Acto VIII) | `b02_cetoddle` / `b02_cetoddle_noa` | Si no lo aceptó ni en Kalos ni en Trigal, sigue con Noa |
| Aurelio | `b02_ampharos` (Faro, nv 38) / `b02_mareep_rosa` (si `b01_mareep_lemnis`) | Pérdida del B3 |
| Furgoneta de Azalea | `b02_furgoneta_presentado` / `b02_furgoneta_escondido` | Lemnis sabe o no que llegaste a Azalea |
| Lila | `b02_lila_protegida` (le quitaste el combate, `af.lila` −5) | Su Eevee evoluciona en el B3 |
| Kaori | `b02_kaori_caramelo_trigal`, `b02_kaori_caramelo`, `b02_kaori_muestra` | Antídoto |
| Lucien | `b02_lucien_madre` / `b02_lucien_cipres` / `b02_lucien_publico` | — |
| Afinidades nuevas | `af.kaori`; rep nueva `rep.johto`, `rep.flare` | — |

### Pistas plantadas (no repetirlas; escalar)

- **Diario (calendario B2):** la entrada **«Hoy, sin novedades. Paseamos por Trigal y comimos algo dulce. ¡Bzzt!»** es la única del día de la noche con Handsome (`b02_handsome_noche`). Otras omisiones: tres días perdidos («dormimos en un bosque precioso»), N-02, Melia y el sótano, la tos de Aurelio («el polvo del heno»).
- **El desvío:** registro de la Puerta: salto 23 con corrección manual de +0,4 s, autorización **Ω-0-0-0**, campo de operador vacío. Handsome no se lo ha dicho a Lebrun. Cámaras de Lemnis puestas la mañana del desvío (Ysolde).
- **N-02** (sale 7 veces): etiquetas «Destino: por asignar», carta de Noa, albarán de la Fundación Raíces, tarjeta de la Guardería, furgonetas de madrugada a la Puerta «apagada» de Luminalia, fragmento roto. **Es el Nodo 02 (Johto, Ruinas Alfa)** — fijado en la biblia.
- **Drenaje:** desplazados apagados en el Encinar (Fidough recuperado; Pachirisu dormido al cuidado de Petra; Morelull), Eevee del Teatro de Danza, Furret y Dunsparce aletargados con Caramelos Lazo, polvo de cristal de la Cueva Brillante «que es cansancio de otros».
- **Topo (Lebrun):** sabe tu hora de llegada a Luminalia (6:42) y la del Encinar; archiva el robo de la Central; otro caramelo de menta en papel azul; Melia: «las órdenes se archivan solas, inspector».
- **Ulises/Dialga:** huellas de tres dedos junto a la niebla; «el ámbar es un recuerdo de algo que todavía no ha pasado».
- **Prototipo de Puerta** de hace 12 años en el sótano tapiado de la estación del Tren Magnético de Trigal (Silph «y patrocinadores»); el ingeniero desaparecido se llama **Matías Olmedo** (testigo: **Dámaso Ferrán**).
- **Legendarios:** huellas fundidas y viento del norte (bestias), luz de Ho-Oh en la Torre Campana que saluda a Lucario; runa de «tomar» quemada.
- **Pérdidas:** Aurelio (tos, «ya no estoy para estos trotes», «¿quién cuida de un rancho…?», Faro «por si acaso», cuaderno «¿Quién?»); Remedios cansada + receta; Noa regala a Bastien una insignia de Froakie sin logo.

### Personajes nuevos y pendientes de apariciones

- Solo en el B2 (necesitan aparecer en B3+): **Kaori** (urgente, candidata), Antón, Morti, Kurt, Protón, Atenea, **Dámaso Ferrán** (1 escena).
- Con nombre menor: la Tercera y la Mayor (reclutas Rocket), Toni, Hebra (Spinarak de Antón), Faro (Ampharos), la sobrina de Aurelio (mencionada).
- Nombres de entrenadores nuevos: ver `registro-auto.md`.

### Pendiente de motor

- El Diario fecha las entradas con la hora real; si Mario juega Trigal de un tirón, la entrada «sin novedades» comparte fecha con otras. Valorar un contador de «día de historia» en `diary`.

## Publicación 4 · 2026-10-06 (sesión de día, a petición de Mario) · Bloque 3 "Acto II · Lo que el tiempo se llevó" (Johto: Malva → Ruinas Alfa → Trigal → Olivo → rancho → Caoba → Lago de la Furia)

Mario aún no ha jugado el B2: el B3 cubre todas las ramas del B2 y del B1.

### Estado del mundo al terminar el B3 (`flag.b03_fin`)

- 7 medallas (`medalla_planicie` de Corelia en Trigal, `medalla_mineral` de Yasmina). Tope final `vars.cap = 50` (46 tras Corelia, 48 tras Yasmina).
- El jugador está en el **Lago de la Furia** (Johto). Siguiente destino: **Kanto** (Azafrán) por el Tren Magnético de Trigal, adonde iban los datos de la señal.
- **Don Aurelio ha muerto** (`b03_aurelio_muerto`). Adela Prado, su sobrina, en el rancho.
- Lila tiene **Sylveon** (`b03_sylveon`). Amphy del Faro de Olivo, reanimado a medias por el antídoto de Kaori.

### Decisiones del B3 que el B4 DEBE leer

| Decisión | Flags | Qué cambia |
|---|---|---|
| **El rancho** | `b03_rancho_sobrina` / `b03_rancho_jugador` (+ `b03_copito_contigo`, `llaverancho`) / `b03_rancho_lemnis` | Con Lemnis, el rebaño «demasiado tranquilo» y pienso en bolsas azules (drenaje); con jugador, semilla del sistema de base |
| **Los Rocket** | `b03_rocket_policia` / `b03_rocket_libres` / `b03_rocket_quemar` | Con quemar, Atlas libre y te debe una; Lemnis no sabe que lo descubriste |
| Renata | `b03_renata_publica` / `b03_renata_espera` | Si publica, Lemnis sabe del prototipo de Trigal |
| Vencejos | `b03_vencejo_pluma` | El jugador es **Pluma** |
| Gyarados rojo | `b03_gyarados_atrapado` / `calmado` / `huido` | — |
| Peaje | `b03_peaje_*` | — |
| Lila | `b03_lila_sola` | — |
| Otros | `b03_tyrogue`, `b03_atlas_visto`, `b03_muumuu_aurelio`, `b03_irene_leccion`, `vars.b03_unown_ok` | — |

### Pistas plantadas

- **Diario (calendario B3):** «nos encontramos con **la doctora Lambert**» (día de Noa en Olivo, `b03_noa_doctora`). Única vez.
- **Nodo 02 = Ruinas Alfa** (`b03_nodo02`): caja «N-02 · Ruinas Alfa», atada a «NODO 01 · KALOS». Mural **DAR / TOMAR** (balanza; A.Z. sin nombrar, una figura tumbada con forma de Lucario).
- **Matías Olmedo:** plano del Proyecto Arco (Silph, sello de ∞ a mano, «El arco no genera la energía. La TOMA»); calendario «Mañana NO firmar. Hablar con D.» (D. = Dámaso).
- **Las ondas** (hilo nuevo `b03_t_ondas`): emisor Caoba-1, «frecuencia de arranque del nodo», firmado **«M.»** (no es Matías; Rotom duda a propósito). Los datos van por el tendido del Tren Magnético hacia **Azafrán**.
- **Drenaje:** Miltank Canela (pienso de la Fundación), Amphy (suplemento), Magikarp «el gasto es de una sola vez», Chispas deja de chispear cerca de la carpa, la carta de Aurelio («como si me hubieran quitado unos años»).
- **Topo:** con `b02_frag_handsome`, la pieza «se extravió» en la custodia de Lebrun (caramelo de menta).
- **Rhi:** su padre perdió el trabajo (césped de un estadio de Macro Cosmos) tras entrar «dinero de un socio que no sale en ningún sitio» (Acto VI).
- **Vencejos:** la pluma más alta lleva una flor de cinco pétalos (A.Z.).
- **Marea Quieta**, muelle 3 de Olivo, martes y viernes (envíos N-02).

### Personajes con pocas apariciones

- Una sola vez (B3): Atlas, Lance, Yasmina, Sabio Li, Kiyo, Lupe, **Adela Prado** (urgente: llamada + rancho).
- Dos: Toni, Dámaso, Mauro, la Tercera, la Mayor.

## Publicación 5 · 2026-10-06 (sesión nocturna) · Bloque 4 "Acto III · La señal" (Kanto: tren → Azafrán → Ruta 5 → Celeste → Rutas 24-25 → Azafrán/Silph → Ruta 8 y Lavanda → Cueva Celeste)

Mario iba por el final del B1 (sin jugar B2 ni B3): el B4 cubre todas las ramas de B1–B3, incluido «ninguna».

### Estado del mundo al terminar el B4 (`flag.b04_fin`)

- **8 medallas** (`medalla_cascada`, Misty): el jugador está **clasificad{o|a|e} para la Copa Infinita** de la temporada (`b04_clasificado`). Tope final `vars.cap = 56` (52 tras el Puente Pepita, 54 con Misty, 55 tras Atenea).
- Región nueva **`kanto`** (mapa 100×100). Viajes: Tren Magnético Trigal⇄Azafrán (`estacion_magnetica`⇄`estacion_azafran`) y **Puerta de Kanto** (`puerta_azafran`, flag `b04_puerta_azafran`) ⇄ Luminalia y Trigal.
- **Nodo 03 = Cueva Celeste**, dañado al 4 % («se puede reparar en meses»; «ahora no tenemos fuente»). Su fuente era **Mewtwo** (F-03), que se fue de la cueva (`b04_mewtwo`, hilo nuevo `b04_t_cueva`).
- El jugador termina en **Ciudad Celeste**. Siguiente destino anunciado: **Alola** (Acto IV).

### Decisiones del B4 que el B5 DEBE leer

| Decisión | Flags | Qué cambia |
|---|---|---|
| **Lebrun, el topo** (gran decisión) | `b04_lebrun_detenido` (rep.lemnis −10, policía +10; Handsome al mando provisional en Kalos; Lemnis sabe que lo sabes) / `b04_lebrun_cebo` (sigue en su puesto pasando lo que diga Handsome; doble juego) / `b04_lebrun_libre` (desaparece; dio el buzón: **Bulevar Sur 14, Luminalia, «Ómicron Envíos», martes y jueves**) | Lebrun no sabe quién es el Arquitecto: sobres con **Ω** y caramelo de menta. Su hija **Camille** (15) fue operada en una clínica de la **Fundación Æther (Alola)** pagada por «un amigo»: gancho para el Acto IV |
| Vencejos | `b04_vencejo_pluma` (si no era Pluma, saltó en Celeste o en la azotea) | Pluma = `b03_vencejo_pluma \|\| b04_vencejo_pluma` |
| Silph (según Rocket B3) | `b04_atlas_pagado` (quemar: Tarjeta Llave) / `b04_atlas_declaracion` (policía) / `b04_toni_plano` (libres) | `b04_handsome_calla`: Handsome no le contó a Lebrun lo de la declaración |
| Renata / Olmedo | `expedienteolmedo` (espera o ninguna: «Trasladado a Proyecto Arco II · Teselia», sello ∞) / `fotoexpediente` (publica: carpeta vaciada «por patrimonio») | Acto V (Teselia) |
| Atenea | `b04_atenea_aviso` (le advertiste que Lemnis los dejará tirados), `b04_atenea_perdio` | — |
| Magda | `b04_magda_perdio`, `notasmagda`; pidió que le escribas si «tus cuentas salen distintas» | Posible aliada tardía |
| Melia | `b04_melia_tarjeta` (la tarjeta negra de un uso ya se gastó) | — |
| Otros | `b04_presidente_habla` (rep.policia +2), `b04_kaori_paso`, `b04_fuji_hecho`, `b04_gastly_casa`, `b04_kadabra`, `b04_xero_matiere`, `b04_kiyo_cinturon`, `b04_adela_lana` | — |

### Pistas plantadas

- **Diario (calendario B4):** (1) entrada del túnel junto a la subestación PL-K cortada por «…bzzt… sincronizando… …conexión restablecida. ¡Perdón! ¿Dónde estaba?»; (2) Rotom se queda en blanco 2 s en la Puerta de Kanto y no lo recuerda («¿Por qué me miras así?»). Omisiones: archivos de Silph («muchos papeles aburridos»), Magda («una señora muy ordenada que bebía té»), Lebrun y Mewtwo; «Rotom se quedó dormido un poquito».
- **Eco de Ansel (mundo):** Sabrina: «Tu máquina tiene eco. Como una habitación con alguien más dentro» / «¡Es el altavoz!»; la Pokédex «se apaga por ahorro de energía» justo cuando Lebrun se delata; la foto `fotocueva` que Rotom no recuerda haber hecho, tomada «desde más arriba»; Magda midió +3 % de consumo de la Pokédex 40 s en el túnel; el técnico de la Puerta: «ya registrad{o|a|e}».
- **Ansel** (1 escena, recepción de la Gira en la Torre Lemnis Kanto): «visita técnica»; caramelo de menta en papel azul = el de Lebrun; {riolu} no lo acepta.
- **Ω:** el `informefuentel` va «copia a Dirección (Ω)»; Lebrun recibe sobres con Ω. Enlaza con Ω-0-0-0 (B2).
- **Drenaje:** Mewtwo como fuente (Fuji: «le quitaron todo y le dieron demasiado»; «no es rabia, es cansancio»), Ponyta sin llama, Kadabra apagado, guardias que sueñan «un sitio blanco lleno de tubos», cláusula 14.3 de Bastien («estudios de vínculo, emplazamiento 03»).
- **Pérdidas:** Noa («si un día no contesto, que alguien abra las jaulas»; «ascenso lateral» a inventario); **sueño de aura de Lucario** (isla de hierro, hombre con sombrero, un Lucario que se gira); Ulises a {riolu}: no «dar hasta que no le quede»; A.Z.: «la cuenta no se cierra: solo le cambia el nombre».

### Personajes

- **Nuevos (solo B4, necesitan 2+ bloques más):** Misty, Sabrina, Bill, Señor Fuji, Presidente de Silph (canon); **Magda Ivers** (OC, 3 escenas en el B4); Casimiro (cazatalentos de Lemnis del Puente Pepita); Camille (hija de Lebrun, mencionada).
- **Vuelven:** Ansel (B1→B4), Lebrun (revelado), Sera, Xero (B1→B4), Alexia, Gadd (B1→B4), Kiyo, Atenea, Atlas (si quemar), Toni (carta), Adela (2.ª/3.ª aparición según rama), Rhi, Bastien, Noa, Kaori, Renata (llamada), Ysolde, Tobías y Duquesa, Ulises, Petra (mensaje), A.Z., Lila y Corelia (llamada), Melia/Sera (mensajes según rama), Simón (rumor).
- **Pendientes de aparecer** (llevan tiempo): Cornelio, Ciprés, Brock (solo mencionado), Blanca, Matière, Lucien, Philippe, Rouxel, Héctor, Nate, Conde, Remedios, Lazare, Morti, Antón, Kurt, Protón, Lance, Yasmina, Li.

## Publicación 6 · 2026-10-07 (madrugada de historia) · Profundidad en Johto y Kanto (sin bloque nuevo)

Mario va por el B2 (`b02_m2`); B3 y B4 ya publicados: no se escribe el B5. Plan en `bloques/p6-profundidad-plan.md`. Partes nuevas registradas en los `index.js`: `b02/t5-iniciales.js`, `b02/t6-lola.js`, `b03/t5-iniciales.js`, `b03/t6-ampharosita.js`, `b03/t7-paneles.js`, `b03/t8-lola.js`, `b04/t4-lola.js`.

### Qué hay

| Pieza | Dónde y cuándo | Ids clave |
|---|---|---|
| **Los tres de Primavera** (`b02_s_iniciales`, 3 partes, cualquier orden) | Chikorita en Azalea (tras `b02_pozo_hecho`; se cree Slowpoke), Cyndaquil en Iris/Torre Quemada (tras `b02_torre_hecha`; puzle `b02_ini_vigas`), Totodile en el Puerto de Olivo (tras `b03_faro_hecho`). Cierre con llamada a Elm: carta (`b03_ini_cartaelm`), Huevo Suerte, rep.johto +2. Amistoso opcional con Ramiro (`b03_ini_ramiro`) | `b02_ini_*`, `b03_ini_*`; NPCs `elm` (canon, holomisor) y `becario_elm` (Ramiro Alcalde, OC) |
| **Una luz que enciende otra** (`b03_s_ampharosita`) | Faro de Olivo tras `beat("yasmina_g7")`: sub-área `faro_maquinas`, puzles `b03_amphita_contrapesos` (11) y `b03_amphita_engranajes` (22); el Pokémon de lana del jugador junta la cola con Amphy → **Ampharosita** con cinemática. Amphy **no** se cura (la lente gira entera, la luz llega más lejos). Amistoso opcional con Yasmina | `b03_amphita_*` (`_candela` / `_faro` según quién enciende), `paginafaro` (read), recolección `b03_amphita_cajon` |
| **Las cámaras de la ladera** (`b03_s_paneles`, 3 partes) | Ruinas Alfa tras `b03_ruinas_hecho`: sub-área `b03_panel_ladera`, puzles domo (10), espiral (17), ala (28) → Fósil Domo, Fósil Hélix, Ámbar Viejo. Se reviven en el Lab. de Fósiles de Petroglifo (Lazare, `patches` del B1), nv 25. **Segunda vía del fósil de Kalos** (`b03_panel_kalos`): Mario tiene Tyrunt → Lazare le da el Fósil Aleta (Amaura) | `b03_panel_*`, `b03_panel_cuaderno` (read), recolección `b03_panel_escombros` |
| **«Fiado no»** (`b02_t_lola`, hilo nuevo **La arrepentida**) | Trigal (tras `b02_pabellon`): pedido a la Torre Radio, donde ella no entra. Caoba (`flag.lola_1`; dos versiones, antes y después de la guarida). Lavanda (`flag.lola_2 && b04_lavanda_llegada`): flores en la lápida sin nombre, Fuji. Etapa final `espera` | `lola_conocida`, `lola_entrega`, `lola_1/2/3`, `lola_caoba_despues`; objetos `lola_bollo` (cura al equipo), `lola_receta`, `lola_servilleta`, `lola_postal` (read), `lola_mt_triturar` |

### Pistas plantadas (Lola; nunca confiesa)

- Trigal: carrito de espaldas a la Torre Radio; conoce la escalera «detrás del cuarto de los fusibles» y el «estudio de las puertas dobles» (desaparecidos hace 20+ años, «antes de lo del asalto»); su Raticate **Tacho** se aterra con la señal horaria.
- Caoba: Tacho tiembla «tres y pausa» como la máquina de la guarida; sabe la escalera detrás del mostrador; **R** descosida y raspada en el forro; «la fam…»; gorras nuevas de costura doble y billetes nuevos: «alguien con mucha lana les estaba pagando» (**Lemnis financia, sin nombrarla**).
- Lavanda: Fuji «¿Otra vez este año?» / «Todos los años»; pregunta por «el del hueso» (Marowak); postal sin enviar («Es de uniforme, imagínese… Somos como una ~~familia~~»); con `b04_atenea_vencida`: la pelirroja «de joven ya daba miedo… en las fotos, digo».
- **Giro propuesto (Acto V o vuelta a Johto/Kanto antes del VI):** Lola fue recluta de Giovanni con ~18 años; estuvo en la toma de la Torre Pokémon (la madre Marowak) y en la de la Torre Radio, donde se fue y tapió la escalera de los fusibles. Cumplió condena. Atlas o Atenea le piden «un último favor»; ella elige al jugador y le da los planos de los túneles Rocket por donde pasan los envíos N-02. Giro dentro del giro: la «fundación generosa» que pagó fianzas hace 20 años es la misma firma de las transferencias de hoy (Lemnis ya compraba gente en su primer año). Cierre posible: abre las jaulas de Noa por un túnel. Frase: «Fiado no. Esto lo pago yo».

### Otras pistas y semillas

- Ámbar de Petra en la máquina de Lazare: «ANTIGÜEDAD ESTIMADA: −3 AÑOS» (`b03_panel_ambar_menos3`; Petra se va a Canela, encaja con su mensaje del B4).
- 4.ª cámara sin losas con un hueco con forma de pluma (Ho-Oh, sin plan).
- La noche del desvío: los relojes de Ramiro y de Rotom se quedaron en blanco; los huevos de Elm se giraron hacia el Encinar; la nidada nació antes de tiempo.
- Diario: 1 entrada por pieza, sin pistas de calendario (omiten las de Lola).

### Personajes

- **Nuevos:** Ramiro Alcalde (`becario_elm`) y Prof. Elm (`elm`): B2+B3, **necesitan una aparición en el B5+**. Lola Arriaga (`lola`): B2, B3, B4 (cumple). 
- **Vuelven:** Yasmina (4 escenas en el Faro), Dr. Lazare (pendiente desde el B1), Petra (laboratorio, solo entre el fin de las Ruinas y el inicio del B4), Fuji (Lavanda), arqueólogo de la Ruta 32.
- **Nombres visibles cambiados (ids intactos):** `encinar_ramiro` → «Leandro»; `r32_casimiro` → «Macario».

### Otros cambios

- Pasada de español para CDMX en todo lo publicado (~214 textos: coger, vosotros, vale, chaval, mola, guay, ordenador…). El Superfan avisa si vuelven.
- Colección: Iniciales 4 → 7/29; Fósiles 2 → 6/15 (Kabuto, Omanyte, Aerodactyl, Amaura); Megapiedras: + Ampharosita.

---

## Publicación 7 (2026-10-10, sesión de día con Mario): profundidad a partir de sus notas

Sin bloque nuevo. Plan en `secreto/bloques/p7-plan.md`. Mario iba por **Azafrán (B4), 7 medallas, tope 50, ₽213 000**, rama `b03_rancho_sobrina` y `b03_rocket_libres`.

### Motor e interfaz

- **Negocios** (`app/js/negocios.js`, `ui/negocios-ui.js`, CONTENIDO §13): estado en `G.neg`. Condiciones nuevas `partner()` y `works()` (toda la línea evolutiva).
- **Novedades** (Diario › Novedades, globo en la barra y señales en el mapa): Rotom lista misiones que se ofrecen, gente con «!», escenas al llegar a sitios ya visitados, premios listos y negocios. Estado en `G.news`.
- **Premio del instructor** (`training.prize`; flag `premio:<guion>`), **hoja de papel** para cartas (`{ read }` y «Leer»), **mapa** con símbolos por tipo de lugar, señales y pestañas por región, **fondos por contexto** (`data-ctx`), **resumen del equipo en combate**, **PC** con selección múltiple, mover y nombrar cajas (`G.boxNames`), **dar objeto** en hoja con pestañas, **evolución** en la pestaña Datos, **montura** que frena donde hay algo, galopa a tramos conocidos y saca más de las vetas.
- Bugs: PS reales al usar objetos en combate (antes salían los de antes del combate), PS en rojo, la barra de experiencia ya no se adelanta al golpe.

### Tiendas, premios, Megas y Teras (`b04/t5-tiendas-premios.js`)

- **Trigal** (`cc_trigal`): 4.ª planta `p7_piedras_trigal` (las 10 piedras, Piedra Oval, Mineral Negro, Garra Afilada, Cordón Unión) y 5.ª planta `p7_mt_trigal` (24 MT). **Azafrán**: `p7_almacenes_azafran` con `p7_piedras_azafran` y `p7_mt_azafran` (20 MT; las de preparación y potencia ≥ 110, con 8 medallas). 51 MT nuevas `p7_mt_*`.
- **Premios** (3 victorias): Novarte Roca Afilada · Relieve **Aerodactylita** · Yantra Esfera Aural · Azalea Chupavidas · Azotea de Trigal Vozarrón · Torre Quemada **Delphoxita** · Torre Bellsprout Paz Mental · Muelle de Olivo **Gyaradosita** · Caoba Rayo Hielo · Dojo **Galladita** · El Cabo Surf · campamento de la Cueva Celeste Golpe Bajo.
- **Megas ajenas (opcionales, curan antes):** Casilda (Trigal, Mega-Sableye 48), Evaristo (Lago de la Furia, Mega-Gyarados 50), Ciro (Azafrán, Mega-Pidgeot 50), Dolores (Lavanda, Mega-Banette 53).
- **Teras salvajes (peso 3–4):** Trevenant (Encinar), Quagsire (Ruta 32), Girafarig (Ruta 43), Primeape Tera Fantasma (Ruta 5 de Kanto), Golduck (Cueva Celeste).
- **Misión `p7_s_recado` «Peso neto»** (Casilda y Jade Peña): sobre y nota con `read`; premio a elegir entre Piedra Día, Noche o Alba.
- **Semillas:** Evaristo dice que la Megapiedra de su Gyarados «se calentaba sola» mientras la boya estaba encendida (eco de biblia §3.3.5). **Dolores promete un muñeco de Riolu/Lucario «cuando le ponga el brazo»: hay que cumplirlo.** Casilda subirá al tren «en primavera».

### Negocios (`b04/t6-negocios.js`)

| Id | Lugar | Socio | Aparece con | Entrada | Parte |
|---|---|---|---|---|---|
| `p7_rancho` | `rancho_aurelio` | Adela | `flag.b03_rancho_jugador \|\| flag.p7_rancho_trato` | 0 (jugador) / ₽20 000 dentro de `p7_rancho_trato` (sobrina) | 60→85 % / 45→70 % |
| `p7_castillo` | Vánitas | el Conde | `flag.b01_fin && visited("castillo_caduco")` | ₽20 000 | 30→50 % |
| `p7_excavacion` | Petroglifo | Dr. Lazare | `flag.b01_fin && visited("petroglifo")` | ₽12 000 | 40→60 % |

- **Rama sobrina (la de Mario):** Adela admite que aceptó el rancho «porque me lo pedías tú» y que le viene grande; pide ella el socio («a un socio no se le dan las gracias: se le rinden cuentas») y le da `p7_cartalata`, la primera carta que nunca mandó.
- **Rama Lemnis:** no hay negocio. Adela firmó; «los martes miran las cuentas»; «los contratos se acaban; ese día sí te voy a llamar» (`p7_rancho_lemnis`). Para abrirlo en un bloque futuro basta ampliar el `cond`.
- **Encargados que se ganan con escena:** Rosaura (`p7_rosaura`, la vecina de la Ruta 42, tras la esquiladora) y **la Mayor** (`p7_mayor`, recluta suelta, solo con `b03_rocket_libres`): vive encima del establo y «guarda su nombre para cuando se lo gane otra vez». Castillo: Héctor (de excedencia en la aseguradora) y Simón (plazo de seis meses para decirlo en antena). Cantera: Tobías y Duquesa retransmiten; Petra dirige a distancia por croquis.
- **Los dos Ampharos:** `p7_rancho_casa` (Ampharos alumbrando el establo de noche o en el prado; Mareep/Flaaffy en la mecedora). La primera vez Adela da el cencerro viejo (Cascabel Alivio).
- **Hechos nuevos:** Aurelio pagó el último curso de veterinaria de Adela con un préstamo de la cooperativa de Iris y le dijo que era una beca (mejora `deudas`, rama jugador). La Tercera está «donde le pagan por abrir cosas que sí son suyas» y Lupe «donde no tiene que hablar con nadie». Una tejedora de Vánitas le compraba lana a Aurelio. La galería honda de la cantera es una «madriguera fósil» de algo grande (semilla sin plan).
- Economía medida: todo comprado ≈ ₽420 000; con todo, ₽14 000–27 000/día entre los tres más objetos (vitaminas, Más PP, piedras, Restaurar Todo). Caramelo Raro ≤ 0,08/día.

### Pendientes que dejó el lector independiente (Publicación 7)

- `p7_cartalata` solo se entrega en el trato si `flag.b04_adela_msg`; si no, spot «Adela y la lata de las galletas» (`p7_adela_lata`, flag `p7_cartalata_dada`).
- **Rama jugador:** la foto del B4 dice «tejado arreglado» y el negocio lo da por roto (mejora «tejado», imprevisto «gotera»). Condicionar o retocar cuando se toque esa zona.
- **La mecedora:** con una Mareep viviendo en el rancho, los textos del B3 siguen diciendo «Vacía. Nadie se sienta». Parche de `descs` en un bloque posterior.
- `p7_rancho_casa` trata a cualquier Mareep/Flaaffy/Ampharos como del rancho (vale para Candela y Faro).
- La salida de Simón hacia el Acto V debe leer `flag.p7_simon`.

---

## Publicación 8 (2026-10-10, tarde, sesión de día con Mario): cinemáticas, combate, minijuegos y arreglos

Sin bloque nuevo. Pedido de Mario: «las animaciones me preocupan más las de cinemáticas, después las de combate» y «las diferentes mecánicas para obtener objetos: incluye más; me gustó lo de deslizar la piedra para los fósiles».

- **Cinemáticas** (`app/js/ui/cine.js`, `cine-spec.js`, `docs/CINE.md`): fondo por capas con paralaje y ambiente, cámara, actores, clima, efectos y texto que se escribe. Las 79 publicadas usan ya el vocabulario nuevo (56 a fondo). Solo cambió la puesta en escena. `mon: '{riolu}'` = el compañero tal como esté.
- **Combate** (`app/js/ui/fx.js`): efecto propio por tipo × clase (contacto, proyectil, estado), entradas, debilitarse, estados, clima, Mega/Tera, números de daño. La barra de PS baja en el golpe y la de EXP después del «se debilitó». Ajustes › Animaciones apaga combate y cinemáticas.
- **Minijuegos** (`app/js/minijuegos.js`, `ui/mj-*.js`, `docs/MINIJUEGOS.md`): excavación, pesca, cosecha, rastreo (con Riolu/Lucario) y cerradura. Comando `{ minigame }` y `gather.game` (jugar o recoger rápido). Contenido en `b04/t7-minijuegos.js`: 13 puntos diarios en Kalos, Johto y Kanto y 5 escenas únicas:
  - `p8_lazare_bloque` (Lab. de Fósiles): Fósil Cráneo → Cranidos nv 28 (o 2 Caramelos Raros si ya lo tiene) + `p8_nota_petra`.
  - `p8_roble_heracross` (Parque Nacional): **Heracrossita**. El muchacho del Heracross «dejó de venir» (semilla sin plan).
  - `p8_absol_reflejos` (Cueva Reflejos, con Riolu/Lucario): **Absolita**.
  - `p8_cornelio_arcon` (Torre Maestra): MT A Bocajarro + `p8_nota_cornelio`; Cornelio deja un papel «para el siguiente».
  - `p8_evaristo_botella` (Lago de la Furia): `p8_carta_botella` + MT Hidroariete. **Evaristo compró el boleto a Olivo para ver a su hermano y aún no lo usa.**
  - Flags: `p8_bloque_hecho`, `p8_heracronita`, `p8_absolita`, `p8_arcon_cornelio`, `p8_botella`, `p8_taquillero`, y `rec_<id>` (la pone el motor la primera vez que se recoge en un punto).
- **Arreglo grave:** «Ir» desde Novedades (Publicación 7) dejaba entrar en sub-lugares cuya entrada la historia aún no había abierto (las Azoteas de Azafrán, el Tren Magnético ya terminado). Mario entró en las Azoteas antes de tiempo. Ahora Novedades, Diario y viajes solo cuentan lugares con una entrada visible hoy (`reachable()` en `screens.js`), y `app/js/reparaciones.js` deshace ese estado al cargar (`p7_entrada_adelantada`: solo si no llegó a saltar a Silph). **Si Mario pasó de las Azoteas (flag `b04_salto`), no se repara solo: pedirle la partida.**
- **Diario:** «Por hacer» solo lista lo que necesita que él actúe; las historias de personajes que esperan van en «En espera» (antes «Registro»). Novedades avisa también cuando una misión suya pasa a poder avanzarse.

---

## Revisión de lógica de misiones, 2026-10-10

Sin bloque nuevo. Pedido de Mario: «revisa todo ese tipo de errores… cualquier bug así de lógica» (avisos de algo nuevo donde no hay nada, entradas que la historia aún no abre, misiones abiertas sin nada que hacer). Se revisaron las 97 misiones y sus sitios con scripts propios (índice de quién toca cada misión, ramas de `choice`/`if`/combate que no cierran, `new` que no se apaga, «!»/«?» que no hacen nada, sub-lugares y sus entradas, objetos pedidos que se pueden vender) y con ~140 partidas del bot volcadas en distintos puntos de B1–B4, más la de Mario. Ningún id publicado se renombró ni se borró.

| Qué pasaba | Dónde | Arreglo |
|---|---|---|
| **«Casos de la Agencia (II)» no se cerraba nunca** (etapa `resuelto` sin `done`) | `b02_agencia_resuelto` (`b02/t2-trigal.js`) | Se cierra al resolver el caso |
| **Hilos que ya habían terminado su parte se quedaban abiertos** hasta la escena de llegada del bloque siguiente (p. ej. «Dulce veneno (II)» hasta Lavanda) o para siempre (las partes del B4) | 19 hilos: `b01_t_agencia/az/ambar/cabina/vencejos`, `b02_t_noa/ambar/cabina/vencejos/kaori/az`, `b03_t_noa/ambar/vencejos/kaori`, `b04_t_noa/kaori/renata` | Cada parte se cierra en la escena que la termina (`stage: '…', done: true`). Los cierres en cascada antiguos (`quest.X && !done.X`) quedan sin efecto. Regla nueva en `hilos.md` |
| Si perdías contra Rhi en Relieve, «La delantera» se quedaba abierta para siempre (`revancha`) | `b01_rhi_2` (`b01/t3-yantra.js`) | Se cierra también al perder |
| Partidas ya paradas en esas etapas | — | Guion `logica_cierre_hilos` (cierra en silencio) como `onEnter` sin `once` en las 18 ciudades y pueblos (`b04/comun.js`, `HILOS_PARADOS`). Con la partida de Mario: le quedan abiertas solo `b02_t_lola` (Lavanda), `b03_t_ondas` y `b04_m1` |
| En Azafrán, antes de la recepción, **Sabrina y el Registro de viajeros salían en Novedades como «misión nueva: Primer día en Azafrán»** y no empezaban nada (la misión empieza en la recepción) | `gym_azafran`, `puerta_azafran` (`b04/t0-azafran.js`) | La comprobación del tramo va en variantes nuevas que solo existen tras la recepción: `b04_sabrina_check`, `b04_puerta_registro_check` |
| **Jade (Almacenes de Azafrán) salía como «misión nueva: Peso neto»** sin llevar el sobre; Doña Casilda, igual antes del fin del B3 | `p7_almacenes_azafran`, `cc_trigal` (`b04/t5-tiendas-premios.js`) | Variantes nuevas `p7_jade_intro_sobre` y `p7_casilda_intro_recado`; las presentaciones ya no tocan la misión |
| «Princesa en el laberinto» quedaba «En espera» mientras había que buscarla (el laberinto no tocaba la misión) | `b01_s_cenit` (`b01/t2-costa.js`) | Etapa nueva `volver` al encontrarla; la entrega acepta `buscar` o `volver` |
| «Casos Fríos: el sótano» quedaba «En espera» con el sótano ya abierto | `b03_t_renata` | Etapa nueva `bajar` («Busca pistas allí abajo y cuéntale a Renata tu teoría») |
| Las floristas de Trigal tenían «!» antes del pabellón, cuando solo dicen «primero preséntate» | `floristeria_trigal` | `new` exige la Gira (`GIRA`) |
| Etapas que no decían dónde | `b01_t_rhi.relieve`, `b02_t_rhi.carta`, `b02_t_bastien.trigal`, `b03_t_rhi.llamada` | Añadido el lugar |

**Afectaban a la partida de Mario:** los 5 hilos parados (`b02_t_agencia`, `b03_t_ambar`, `b03_t_noa`, `b03_t_kaori`, `b03_t_vencejos`: se cierran solos al salir del Dojo a Azafrán) y los «misión nueva» falsos de Sabrina, el Registro de viajeros y Jade.

**Revisado y sin cambios (a propósito o correcto):** `b02_t_lola` (`espera`), `b03_t_ondas` y `b04_t_cueva` siguen abiertos (ver `hilos.md`). Etapa `b01_t_bastien.conocido` nunca se usa (inofensiva). Los fósiles de las cámaras se pueden vender, pero la misión se cierra por los flags de las cámaras, no por los objetos. Los objetos de misión que no son clave (miel, Leche Mu-mu, setas) se recogen otra vez en puntos de recolección. Ninguna decisión deja una rama sin camino en las misiones; ningún regalo va antes de un combate que corte el guion.

**Para el motor (no tocado aquí):** (1) el «!» sale para cualquier misión sin empezar que aparezca en el guion del sitio, aunque solo se toque con una condición que exige que ya esté empezada (cierres en cascada, guiones de comprobación con `call`) o aunque otra misión del mismo guion esté en curso (Registro → «Rumbo al norte»); conviene contar solo los comandos alcanzables con el estado actual. (2) El «?» sale aunque el guion no cambie la etapa (Gaspar en la Ruta 7 sin ingredientes, puntos de observación). (3) Un `{ quest, stage }` igual a la etapa actual enseña «actualizada». (4) El cierre de partidas viejas estaría mejor en `app/js/reparaciones.js` que como `onEnter` repetido.

## Publicación 9 · 2026-10-11 (madrugada de historia) · Bloque 5 «Acto IV · La luz robada» (Alola: Melemele → Akala → Paraíso Æther → Poni)

Escrito entre las dos sesiones de la madrugada (0:47: plan, encargo, T0 y T1; 2:53: T2, T3, T5, lector y publicación). Mario había terminado el B4 en Azafrán: el enganche `b05_inicio` está en Azafrán, Celeste, Lavanda, Trigal, Luminalia y las Puertas.

### Estado del mundo al terminar el B5 (`flag.b05_fin`)

- Región nueva **`alola`** (mapa 100×100; Ula-Ula dibujada pero sin lugares: queda para la vuelta). Viajes: **Puerta de Alola** (`puerta_alola`, en Hauoli; `b05_puerta_alola`) ⇄ Azafrán, Luminalia y Trigal. Entre islas, barcos (spots `go`).
- Sellos del Circuito: `sello_melemele` (Kaudan) y `sello_akala` (Mayla); `sello_poni` (Hela) es **opcional y posterior al final** (`hela_gp`). Tope final **62** (58 Kaudan, 59 Kiawe, 60 Mayla, 61 Fabio, 62 al final).
- **Pulsera Z** desbloqueada (`zring`, `{ unlock: 'z' }`, Tapu Koko). Cristales: Normastal, Lizastal, Hidrostal, Pirostal, Litostal (pruebas); Dracostal (Kommo-o dominante opcional del Cañón), Psicostal (Calder, en el muelle tras el final), Geostal (Hela).
- **Montura Lapras** (`flag.mount_lapras`) con el **Ride Gear Universal** (`ridegear`) de Leilani.
- **Nodo 04 = Altar del Sol y de la Luna**: desmontado tras vencer a Calder. Necrozma vive (no capturable; vuelve en el Acto IX).
- **Negocio nuevo:** Taller Kahale (`b05_taller`, Kantai), socia Leilani; encargados Skull (`b05_skull_taller`) y Kiawe.
- Tiendas: piedras (`b05_piedras_kantai`), 26 MT en Konikoni (`b05_mt_konikoni`), `tienda_marina` (Poni).
- La Gira anuncia **Teselia** (Acto V), con Puerta en **Ciudad Porcelana**.

### Decisiones del B5 que el B6 DEBE leer

| Decisión | Flags | Qué cambia |
|---|---|---|
| **A quién devuelves la luz** (gran decisión, Altar) | `b05_luz_necrozma` (cielo vuelve de golpe; Necrozma se va por un ultraumbral; rep.alola +10, af.leilani −3) / `b05_luz_aether` (Æther la custodia; Necrozma duerme en el Altar; `b05_kaori_muestra`: el antídoto avanza en el B6; rep.lemnis −5) / `b05_luz_leilani` (ultraumbral un minuto; baliza «tres cortas y una larga»: `b05_malia_viva`; Necrozma débil, lo cuida Hela; af.leilani +10, rep.alola −5) | Hilo Malia; Necrozma en el Acto IX; Æther con algo que no debería guardar |
| Calder | `b05_calder_vencido`, `b05_calder_verdad` (cerró el umbral de Malia), `b05_carta_calder`, `b05_calder_poni` (custodiado por Hela hasta la Policía Internacional), `b05_calder_muelle` | Puede volver como testigo contra Lemnis |
| Bastien | `b05_bastien_rompe` / `b05_bastien_sigue` | Letra pequeña VI |
| Skull | `b05_skull_taller` (solo con `b03_rocket_libres`) | Encargados del taller |
| Leilani | `af.leilani`, `b05_leilani_confia`, `b05_leilani_defendida` | Candidata nueva; la lámpara rota sigue sin arreglar |
| Colección | `b05_litten(_tuyo)`, `b05_popplio`, `b05_rowlet` / `b05_rowlet_vive`, `b05_codigo_cero` / `b05_codigo_cero_discos`, `b05_tyranitarita`, `b05_scizorita` / `b05_gengarita` (la otra se da tras el final, `b05_zyra_segunda`) | — |
| Otros | `b05_shoku_*` (Gaspar vs Lulú), `b05_rhi_wela` / `rhi_6`, `b05_ulises_caleta`, `b05_sueno_aura`, `b05_informe`, `b05_magda_correo`, `b05_camille_vista`, `b05_ansel_aether`, `b05_az_poni`, `b05_renata_llamada`, `b05_hela_vencida`, `b05_kommo_hecha`, `b05_canon_aura` | — |

### Pistas plantadas

- **Diario:** (1) T0, la llegada describe el escenario «a la izquierda» (visto desde la Puerta del otro lado); (2) T2, el escáner de Æther lee la Pokédex como «Dispositivo de Dirección · Lemnis · acceso total» (`b05_escaner`); Gladio lo apunta; (3) T3, «Hoy el sujet…» → «¡Hoy mi entrenador…!» (**única vez en todo el juego**; no repetir). Omisiones: Calder, el archivo de Æther y la decisión («una cosa muy importante con una luz»).
- **Ansel:** en Æther, «de visita técnica», menta en papel azul; {riolu} no la acepta. El cuaderno de Calder: el hombre de la oferta dejó un caramelo de menta en papel azul (se quitó el envoltorio de la mesa para no subrayarlo).
- **Ω:** el informe de Æther va «Copia a Dirección (Ω)»; sobre con Ω en el archivo (pago de la operación de Camille).
- **Pérdidas:** Noa (nota en la jaula: «Ya sé contar»; 31 → 24 → 19; se va «con el envío del jueves»); segundo sueño de aura de Lucario («vuelve», mirando al norte); A.Z.: «la cuenta sigue abierta».
- **Hipótesis del Lazo:** Kukui y Ciprés («la Pulsera y la Piedra Llave hacen lo mismo con distinto acento»); Calder: «es la misma luz».
- **Renata:** «tu Rotom escribe un diario, ¿no?» (una frase; la pantalla se queda en blanco un segundo).

### Personajes

- **Nuevos:** Kukui, Kaudan, Liam, Nereida, Kiawe, Mayla, Hela, Gladio, Zyra, Fabio, Francine, Pimpinela, Lulú (canon); **Leilani Kahale** (candidata); **Calder Wynn** (OC, 4 escenas, todas en el B5); **Camille Lebrun** (OC, 1 escena); **Soldi** (robot del taller, varias escenas en T1 y el negocio).
- **Pendientes de 2+ apariciones en otro bloque:** Camille (la más urgente: con Handsome o Lebrun en el B6), Calder, Liam, Lulú, Zyra, Fabio, Francine, Hela, Kaudan, Mayla, Nereida, Pimpinela.
- **Vuelven:** Sera, Alexia, Handsome, Kiyo, Ramiro y Elm, Ciprés (llamada), Misty, Bill (llamada), Adela (postal), Philippe, Rhi, Gaspar, Ulises, Kaori, Noa (nota), Bastien, Ansel, Xero, Rouxel, Magda (correo), Renata (llamada), Ysolde (nota), A.Z. (5.ª aparición sin poder fotografiarlo: chiste de Rotom).

---

## Eventos de temporada 2026 · 2026-10-23 (`b05/t8-temporada.js`)

Sin bloque nuevo. Mario está al final del B4 (Castillo Caduco, 8 medallas, equipo nv 49–53) y juega Halloween y Día de Muertos por primera vez. Lo de `b01/eventos.js` (Gran Atraco y ofrenda de Remedios) sigue igual; esto se suma. Condiciones solo de B1–B4.

| Evento | Fechas · cond | Qué hay | Premio |
|---|---|---|---|
| **La vigilia del retrato** (`halloween_retrato`) | 24–31 oct · `flag.b01_conde_1` | Castillo Caduco: Simón (con línea extra si `p7_simon`), Tobías y Duquesa, Gadd y el Conde vigilan la galería. Cinemática de medianoche: la taza de té del Conde es un Sinistea; un Smeargle pinta el retrato nuevo (moda según `year % 3`); en la foto de Gadd el sillón del Conde sale vacío. Punto diario `ev_hw_arcon` (cerradura nv 2, solo en Halloween) | 1.er año: **Sinistea (Antigua)** (nv 16/32/44 según medallas) + **Tetera Rota**; si ya tiene la línea, Hechizo. Objeto `foto_vigilia` (read). Años siguientes (`ev_hwr_otra`): otro método de Simón y Hechizo o Tela Terrible |
| **Ofrenda en Lavanda** (`muertos_lavanda`, misión `ev_muertos_lavanda` con `parts`) | 28 oct – 3 nov · `flag.b04_lavanda_llegada` | Dolores (3.ª–4.ª aparición) quiere poner la mesa a las tumbas sin visita: flores (árbol de la calle, **cosecha** nv 2), pan (Lola si `lola_3`, si no el horno de Fuji; usa `recetapanmuerto` si la tiene), velas y copal (Fuji; copal del incensario si `b04_sotano_hondo`). El jugador elige el papel picado (`vars.ml_picado`) y a quién recuerda (`vars.ml_quien`: 1 Don Aurelio, solo con `b03_aurelio_muerto`; 2 los que nadie visita; 3 «alguien mío»). Cinemática de la noche de ofrenda | 1.er año: **Greavard** nv 29 (perro que guía a los muertos; si ya tiene la línea, Hierba Revivir). **Pan de muerto** ×2 (cura y +amistad). **Calaverita de Lola** (read, calaverita literaria). Años siguientes: Hierba Revivir |

- **Repetición anual:** nada usa flags permanentes salvo `ev_hwr_sinistea` (regalo único). Estado por año en `vars.hw_retrato_year/_n`, `vars.ml_ini/ml_flores/ml_pan/ml_velas`, `vars.ofrenda_lavanda_year/_n`; `doneCond` con `== year`. La misión `ev_muertos_lavanda` solo se usa el primer año.
- **Pérdidas:** Aurelio aparece en la ofrenda solo si Mario eligió recordarlo (leche, lana; con Ampharos en el equipo, enciende la cola). Nada de Remedios (su pérdida es en 2027, biblia §9.2: no tocar). La foto boca abajo de Fuji y la lápida de Lola salen sin revelar nada.
- **Diario:** 2 entradas (vigilia; ofrenda, según `ml_quien`). Sin pistas del calendario.
- **Apariciones:** Dolores +1, Fuji +1–2, Lola +1 (si `lola_3`), Simón +1, Tobías +1, Gadd +1, Conde +1.
- **Pendiente para 2027:** la ofrenda de Remedios (`ev_muertos_2`) puede leer `vars.ofrenda_lavanda_n` y `has("calaverita_lola")`; Dolores puede coser el muñeco de Remedios.

---

## Arco de la red de auxilio (2026-10-23)

Encargo aprobado por Mario: las tres misiones de ChatGPT de `app/content/comunidad/` se unen en un arco, «La red de auxilio de Kanto». Ningún id publicado se renombra ni se borra; solo se cambian textos y se añaden etapas, flags, guiones, objetos y un lugar.

- **Capítulos (en cualquier orden), cada uno con un ángulo:** `cg_aviso` (Lavanda, **el origen**: doña Amparo, vigía «canal 00» de la Red primitiva, y el aviso que Olga no emitió), `cg_puente` (Celeste/Ruta 24, **el presente**: la caseta del Puente Pepita vuelve a tener guardia; Misty y Damián al cierre), `cg_indice` (Celeste/Cabo/Lavanda/Ruta 8, **el sistema**: el programa «Índice» de la Red descarta los avisos sin ficha; el Audino de Fuji dio el primer aviso por el canal 00 que **Bill inventó a los 11 años** con el repetidor de la colina).
- **Paraguas `cg_red`** (side, `parts` con los tres capítulos; etapas `piezas` → `bill` → `colina` → `hecha`). `cg_red_toque` la arranca si ya empezó algún capítulo y la pasa a `bill` con los tres hechos; se llama desde los capítulos y por `onEnter` (sin `once`) en Azafrán, Celeste y Lavanda, así la partida de Mario (cg_indice en `pruebas`, cg_puente en `regreso`) entra sola en el arco.
- **Piezas:** `cg_red_galena` (Olga, cierre de aviso), `cg_red_bobina` (Pilar, cierre de puente), `cg_red_dial` (Fuji, cierre de índice, en las dos ramas). Bill las monta en `cg_red_receptor` (objeto clave con pixel art `cgredreceptor` en `PX_ITEMS`; cinemática al recibirlo en `cg_red_bill` y al usarlo en `cg_red_colina`).
- **Zona nueva:** `cg_red_colina` (Colina del Repetidor, sub-lugar de Lavanda; entrada «Sendero de la Colina» con `has("cg_red_receptor") || done.cg_red`). Radio del canal 00 (variantes día/noche), Nico y punto diario `cg_red_caja` (cerradura, nivel 2: imán, pila, revestimiento, piedra trueno; mejora y electrizador raros).
- **Premio del cierre:** MT Plancha Voltaica (`cg_red_mt_plancha`, Ampharos la aprende), 2 Elixires y la hoja `cg_red_hoja_turnos`. Flag `cg_red_encendido` (lo leen los «después» de Olga/Isandro y del tablón del puente).
- **La misión que fracasa bien (`cg_indice`):** en la deducción, si eliges patrulla o reloj y confirmas («Sí, mándalo así»), etapa nueva `fallo`, flag `cg_indice_fallo`: la Red cierra el caso, retira los collares de prueba, y Noemí empieza un libro a mano «Canal 00» (`cg_indice_libro00`). Desenlace propio con Fuji (`cg_indice_epilogo_fallo`), mismo premio (el dial), y el cierre del arco lo recuerda (Noemí, Nico, la hoja de Misty, Fuji). Se puede dudar («Espera») sin consecuencias. La verificación ya no se puede «fallar»: el pulso largo explica y deja repetir.
- **Personajes (todos con origen y motivo):** Olga, Pilar, Gonzalo, Damián (3+ escenas cada uno, vuelven en el cierre por radio). **Noemí** (archivera, estación de Azafrán: aviso, decisión o fallo del índice, cierre), **Vera** (técnica de señales: radio de Bill, poste de la Ruta 8, cierre), **Isandro** (vecino que le subía el pan a doña Amparo: cierre del aviso, después, cierre), **Nico** (recadero: archivo, colina, Nico en la colina). Quitados los cuatro avisos de NPCs sin aparecer. Bill con más peso (creador del canal 00 y del repetidor; monta el receptor). Misty en el índice y en el cierre del puente.
- **Diario:** una entrada por capítulo y una del cierre, con voz de Rotom; sin pistas del calendario (biblia §7) ni omisiones nuevas.
- **Duración:** ~2 h 10 min el arco entero (aviso 25, puente 25, índice 60, cierre 20). Partida de prueba: `herramientas/test/partidas/mario-2026-10-23.json`.
- **Semilla para el futuro:** doña Amparo y el canal 00 pueden reaparecer (Rotom «sin número»); Noemí, Vera e Isandro tienen hueco para una cuarta escena.

---

## Secundarias grandes del B5 (2026-10-23) · `b05/t6-evolucion.js` y `b05/t7-museo.js`

Sin bloque nuevo. Mario está al final del B4 (aún no ha empezado el B5). Dos encargos aprobados por él (ideas de ChatGPT), cada uno de ~1,5–2 h.

### A) «Lo que no crece» (`b05_s_terron`, side, est 110) · Rancho Ohana (Akala)

- **Abre:** `flag.b05_ridegear && visited("rancho_ohana")` (spot en `rancho_ohana`). Se cierra al tocar la caracola en la Ruta 4.
- **Personajes:** **Kalena** (`kalena`) = la capataza del Rancho Ohana de T1 (mismo aspecto que `capataza_ohana`; ahora con nombre). **Don Kekoa** (`kekoa`) = el «señor del abrevadero» de T1 (`b05_ohana_abuelo`: «setenta años bebiendo de aquí»), padre de Kalena. **Terrón**: el Mudbray de Kekoa (no es del jugador).
- **Por qué no evoluciona:** Kekoa tiene mal la rodilla y ya no llega al lomo de un Mudsdale. Terrón lo lleva cada amanecer al abrevadero (23 min) y se agacha junto a la piedra de montar. Sacude la luz cada vez que empieza a evolucionar. Kalena creía que era la silla con sensores de Leilani (K-07). Nadie lo explica en voz alta: se ve (registro de la silla, el alba, la libreta).
- **Etapas:** `rancho` → `taller` (cerradura `b05_terron_panel`, nivel 2 → `registrosilla`, read) → `alba` (cinemática, `fotoalba` con `art: 'alba_abrevadero'`) → `montadero` (puzle `b05_terron_montadero`, 16 pasos → `libretakekoa`, read; choice de 3 frases) → `estribo` (cinemática; `estribokoa`, af.leilani +3) → `kekoa` (cinemática; `take estribokoa`, `give caracolakekoa`) → `hondonada` (primer uso de la caracola en la Ruta 4, tramo 3, cinemática) → `hecha`.
- **Objeto clave → zona:** `caracolakekoa` abre la **Hondonada de los Mudbray** (`hondonada_mudbray`, área de Alola, `map 62,55`, `links: ['alola_ruta4']`, `hidden`/`enterCond` con `flag.b05_hondonada_abierta`, `branch` en el tramo 3 de la Ruta 4). Dentro: encuentros 55–58 (Mudbray, Mudsdale, Lycanroc día/noche, Whiscash desplazado), dos puntos diarios (`b05_hondonada_bayas` catch, `b05_hondonada_barro` dig), la «cuna» de Terrón y tocar la caracola.
- **Flags:** `b05_terron_montadero_visto`, `b05_hondonada_abierta`, **`b05_terron_estribo`** (= el estribo cuelga del abrevadero y Terrón lo ha visto: **gancho para que evolucione en B6/B7**, ver `hilos.md`). Amistoso opcional `kekoa_terron` (Tauros 57, Mudbray 58 con Mineral Evol; cura antes; premio `eviolite`).
- **Afinidad:** Leilani +2 (panel) +3 (estribo). Rep: alola +2.
- **Apariciones:** Kalena 2 (T1 como capataza, aquí) y Kekoa 2 (T1, aquí) → **la 3.ª, en el B6/B7 con la evolución**. Leilani y Soldi +1.
- **Diario:** 2 entradas (alba; Hondonada). Sin pistas del calendario.

### B) «La ficha número uno» (`b05_s_museo`, side, est 60, `parts` con las salas) · Ático del Bulevar Norte (Luminalia)

- **Sitio:** el ático «con vistas a la Puerta» que Philippe intentaba alquilar en el B2. Philippe recibe paquetes «para la ficha número uno» de gente que conoce al jugador y monta un museo. Su voz: «Phil-osofía», trucos fallidos (11 pañuelos al cortar la cinta).
- **Abre:** `flag.b01_fin` (spot en `luminalia`). **Mario puede ir ya** (está en Kalos/Kanto). Entrada permanente «El ático del Bulevar Norte» en `luminalia`.
- **Etapas:** `atico` (cerradura `museo_vitrina`, nivel 3 → `entradamuseo`, read) → `salas` (ver Kalos y, si existen, Johto/Kanto) → inauguración (cinemática con Alexia, Matière y, si existe la rama, Lucien; `llaveatico`) → `hecha`. El libro de visitas (`museo_libro`) añade firmas según flags.
- **Salas y piezas** (cada pieza: spot `pieza(id…)` con `new: '!flag.museo_v_<id>'`, guion `museo_<id>`, cartela `read` por rama):

| Sala (entrada) | Pieza | Lee | Remitente |
|---|---|---|---|
| Vestíbulo | `baraja` | `done.b01_s_philippe`; `b05_philippe` + Lucario | Philippe |
| Kalos | `titular` | `b01_prensa_*` | Alexia |
| Kalos | `cueva` | `b01_bastien_*` | Bastien |
| Kalos | `cromlech` | `b01_delatar` / `b01_handsome` / `b01_trato_sera` | Alexia / «un turista» / sin remitente |
| Kalos | `torre` | `b01_torre_hecha` (+ `b01_lila_llama`) | Cornelio (+ Lila) |
| Johto (`b02_puerta_cruzada`) | `fragmento` | `b02_frag_*` | Handsome / sin remitente (Sera) / sin remitente (Melia) |
| Johto | `lucien` | `b02_lucien_*` | madre / Ciprés / Lucien |
| Johto | `rancho` | `b03_rancho_*` | Adela |
| Johto | `familia` | `b03_rocket_*` | Handsome / Toni / sin remitente (Atlas) |
| Johto | `lago` | `b03_gyarados_*` | anónimo / pescador / anónimo |
| Kanto (`b04_inicio_hecho`) | `inspector` | `b04_lebrun_*` | Matière |
| Kanto | `octava` | `b04_clasificado` | Misty |
| Alola (`visited("hauoli")`) | `luz` | `b05_luz_*` | Azucena / Zyra / Leilani |
| Alola | `contrato` | `b05_bastien_rompe` / `sigue` | Bastien |
| Alola | `terron` | `b05_terron_estribo` | Kalena |

- **Sin spoilers:** cada pieza solo existe con su flag; las salas solo con su región pisada; la de Alola, mientras no haya decisión del Altar, enseña «vitrinas vacías» sin decir qué vendrá. Las cartelas cuentan lo que el jugador ya vivió, sin nombrar a Ansel, el Eco ni nada no revelado (la tarjeta de Sera y las gafas de Melia van «sin remitente»).
- **Flags:** `museo_vitrina_vista`, `museo_sala_<kalos|johto|kanto|alola>_vista`, `museo_v_<pieza>`. Rep kalos +2. Diario: 1 entrada (inauguración).
- **Apariciones:** Philippe (B1, B2, B5 Konikoni, **museo**: 4 bloques), Alexia, Matière (vuelve tras B2), Lucien (vuelve tras B2; 3.ª en bloque distinto), Kekoa por carta.
- **Regla nueva en `CLAUDE.md` §2.4:** cada bloque añade 2–4 piezas al museo (sala de su región, `pieza(...)`, cartela por rama).
