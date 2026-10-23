# BLOQUE 6: "ACTO V · LA VOZ DEL NARRADOR" (plan detallado)

> **Región:** Teselia (nueva, `teselia`, mapa 100 × 100). Lugares: **Ciudad Porcelana** (Puerta Lemnis de Teselia, estudio de *Casos Fríos*, muelle; de noche, tejados y Torre Lemnis), **Ruta 4** (borde del desierto) → **Ciudad Mayólica** (gimnasio de **Camila**, Metro Batalla, Musical, estadio, noria) · tren a **Pueblo Chamota** (secundaria larga) y la boca de la **Gran Grieta\*** · **Bosque Azulejo** (cruza el **Puente Saeta**) → **Ciudad Esmalte** (Museo) → **la cabina de Ulises** → **Valle de Antaño** · **Ruta 5** y **Puente Levadizo\*** → **Ciudad Fayenza** (gimnasio de **Brock**, muelle, **Almacén Frigorífico\*** = Proyecto Arco II) · **Ruta 6** → **Ciudad Teja** → **Torre Dragospiral** (Nodo 05).
> \* Nombre oficial en español de España **por comprobar** antes de escribir (Giant Chasm, Driftveil Drawbridge, Cold Storage). Los demás son los oficiales (Porcelana, Mayólica, Fayenza, Esmalte, Chamota, Teja, Bosque Azulejo, Puente Saeta, Torre Dragospiral, Metro Batalla).
> **Duración meta:** **15–16 h** (aprobado por Mario: más largo que los 12 h de costumbre). `hours: 16` en el `index.js`.
> **Inicio:** tras `flag.b05_fin`. Mario terminó el B5 en la **Aldea Marina** (Poni) o anda por Alola, Kanto, Kalos o Johto. `comun.js` pone el enganche «La Gira: convocatoria para Teselia» en `aldea_marina`, `kantai`, `hauoli`, `puerta_alola`, `konikoni`, `azafran`, `puerta_azafran`, `luminalia_plaza` y `puerta_trigal` → guion `b06_inicio` (lo escribe T0).
> **Flag final:** `b06_fin`. **Aviso de ritmo:** `b06_m_aviso`, al entrar por primera vez en `tejados_porcelana` (inicio de T5; quedan ~3 h).
> **Prefijo de ids:** `b06_` en flags, misiones y guiones de historia. Rutas con nombre que choca: `tes_ruta4`, `tes_ruta5`, `tes_ruta6`.
> **Escrito:** 2026-10-23. Mario va **0 bloques por delante** (terminó el B5 o está a punto).

## 0. Lo que pasa, en una frase por tramo

| Tramo | Archivo | Qué pasa | Duración |
|---|---|---|---|
| T0 | `t0-porcelana.js` | **La voz de Teselia.** Puerta de Alola → **Ciudad Porcelana** (la Puerta está en el muelle, entre rascacielos). Al cruzar, Rotom no dice «bzzt»: esta vez es {riolu} quien gruñe a la Pokédex, un segundo, y luego hace como si nada (pista de mundo). Recepción de la Gira: la **Prof. Encina** (anfitriona de Teselia), Sera o un directivo, **Alexia** (su titular depende de la luz de Alola), **Brock** (comida; le han dado el gimnasio de **Fayenza** «cuando terminen las obras del puente») y **Handsome** (custodia a Calder; según `b04_lebrun_*`, viene con Camille o la menciona). **Oshawott** ha perdido su concha en el muelle (pesca). **Renata en persona**, en su estudio del sótano de un rascacielos «a dos paradas de metro», con **Nico Ferrer** y **la Tía Rosa**: te entrevista **en directo** y resuelves con ella un **caso de prueba** delante del micrófono. A la mañana siguiente, en la puerta del estudio, una caja cerrada (cerradura) con la **primera carta del Apuntador**, que responde a tu deducción palabra por palabra. Fuera de micro, Renata te pide leer el Diario de Rotom: lee tres entradas viejas y dice una sola frase. Abre el **Estudio Casos Fríos** (negocio). Ruta 4 abierta. | ~2 h 30 |
| T1 | `t1-mayolica.js` | **Ruta 4** (desierto al borde: huevo de **Larvesta** en la arena caliente; Tera de Fisura opcional) → **Ciudad Mayólica.** Gimnasio de **Camila** (Eléctrico, **Mega-Eelektross**). **Metro Batalla** (zona de entrenamiento). **Camille** juega el torneo juvenil de voleibol en el estadio (escena según `b04_lebrun_*`). **Tepig** estornuda brasas sobre los trajes del **Musical**, donde están de invitado **Liam** y **Tadeo Lis**, el apuntador del teatro. **Azucena** (la turista de Kantai) con su Altaria: Mega opcional. Primer remanente **Plasma** en el parque («el Lazo nos liberará»); **Acromo** mira combates en el metro. **Bastien** (si rompió el contrato). **Segundo caso del Apuntador** en la **noria**: un Pokémon «desaparece» de una cabina en el aire; el truco usa tu método del caso de prueba (emitido). Al final, **Pase de la Gira** para el tren: abre **Chamota** (T2) y el **Puente Saeta** hacia Esmalte (T3). | ~2 h 30 |
| T2 | `t2-chamota.js` | **Secundaria larga: «La Noche Blanca»** (idea de ChatGPT: la ciudad donde todos recuerdan algo distinto). En **Pueblo Chamota**, el de las murallas, cada vecino cuenta distinto la noche de hace 30 años en que el pueblo amaneció helado en agosto, el campanario dio las doce dos veces, ardió la panadería y una niña pasó la noche fuera. Testigos, horarios y objetos legibles; **Mario formula su hipótesis** antes de saber la verdad; **ninguna causa sola explica todo**; la pista decisiva sale **a mitad**; saber la verdad **no obliga a contarla**. Regalo: **Zorua**. Semilla de Kyurem (escarcha en la muralla norte; la Gran Grieta, cerrada «aún»). **Gaspar y Lulú** cocinan el pan de la Noche Blanca con la panadera. **Matière** por holomisor. Opcional; se puede hacer desde el final de T1 hasta después del bloque. | ~2 h 30 |
| T3 | `t3-antano.js` | **La gran aventura: la cabina y el valle** (Ulises + Petra, una sola misión). **Bosque Azulejo** y **Puente Saeta** → **Ciudad Esmalte**: en el **Museo**, la Prof. Encina y **Petra** (caída dentro de una vitrina). El **Ámbar sin registro** late tan fuerte que mueve el péndulo del reloj del museo. **Snivy** (de Encina). **La cabina aterriza en el patio** («no me dejes irme sin ti»). Petra engarza el ámbar en el péndulo del reloj viejo y la **Tarjeta del viajero** le da la dirección: **Péndulo de ámbar** (objeto clave con pixel art, cinemática). **La cabina por dentro** (más grande por dentro; dentro, Rotom no sincroniza y dice algo que no diría nunca: **pista grande**). **El Valle de Antaño**: los fósiles vivos, la bandada de Aerodactyl; el ámbar era un pedazo del «tic» del **Dialga joven**, que se le cayó a esta época cuando se asustó. Se le **calma, no se le vence**. **Montura Aerodactyl** (con el arnés que diseña **Leilani** por llamada). Tercer sueño de aura de {riolu}. El valle queda **visitable** con el péndulo. | ~3 h |
| T4 | `t4-fayenza.js` | **Ruta 5** y el **Puente Levadizo** (bajado por fin) → **Ciudad Fayenza.** Gimnasio de **Brock** (Roca, **Mega-Steelix**; Lucario brilla). **Muelle** (zona de entrenamiento, **Feraligita**). **El Almacén Frigorífico = Proyecto Arco II**: Handsome con **Calder** de testigo (reconoce los condensadores de Alola), **Kaori** (Caramelos Lazo del lote 05, en frío), **Pimpinela** y **Zyra** (vienen a por los datos de ultraumbral robados), **Fabio** de contratista, **Xero** (jefe), **Bastien** (si siguió con el contrato: es el «sujeto» de los estudios de vínculo). **Matías Olmedo**, vivo, en el laboratorio frío: el Arco II es la máquina que va a vaciar la Torre Dragospiral, y a él lo trasladaron por negarse a fabricar «módulos de acompañamiento: copiar una voz dentro de un Rotom». **Acromo** escapa con el Arco. **Renata** encuentra por fin a Olmedo (su caso de toda la vida). Fuera de micro, con notas en papel, te propone **la trampa**: tres detalles falsos por tres canales. **Noa** deja un mensaje anónimo en el buzón del pódcast. | ~2 h 45 |
| T5 | `t5-dragospiral.js` | **La voz del narrador.** Porcelana de noche: **resultados de la trampa** (el Apuntador muerde el detalle del pódcast: **Mario le gana el primer asalto**; Lemnis aparece donde solo lo sabía el Diario). **Ysolde**: operación vertical en la **Torre Lemnis de Teselia** por los **tejados** (la Pluma gris), saltos de fe, la sala de servidores: «Dispositivo 0417 · Módulo Diario · Eco: perfil A. M. · Reporta a: Dirección (Ω)». **Ascenso a Ala** en lo alto (`alavencejo`, los tejados quedan como zona). **La revelación** al amanecer, en el estudio, con Renata y {riolu}. **Gran decisión: qué haces con el Eco.** Después, **Ruta 6** o vuelo → **Ciudad Teja** (zona de entrenamiento, **Salamencita**) → **Torre Dragospiral**: Plasma, **Acromo** (jefe), Nodo 05 desmontado, **Reshiram** despierta (cinemática; capturable). **A.Z.** al pie de la torre. La Gira anuncia **Galar** (Acto VI). | ~3 h 15 |

**Orden:** T0 → T1 → T3 → T4 → T5 es el camino principal. T2 se abre al final de T1 y es opcional (se puede hacer en cualquier momento después). T4 se abre con `b06_t3_hecho` (Brock avisa: «ya bajaron el puente»).

## 1. Curva de niveles

Al empezar el B6 el tope es **62**. El B6 da **dos medallas** del Circuito (Mario ya está clasificado para la Copa: la Copa de la Temporada **no** se juega ni se anuncia aquí; se decide en el plan del B7) y sube el tope hasta **68** (`balance.md` §3).

| Tramo | Salvajes | Entrenadores | Jefe | Tope |
|---|---|---|---|---|
| T0 Porcelana, muelle | 58–61 | 59–62 | — (Renata opcional, `renata_1`, as 61, amistoso) | 62 |
| T1 Ruta 4, Mayólica | 59–62 | 60–63 | **Camila** (`camila_g`, Eléctrico, 5 Pokémon, as **63** Eelektross con `gimmick: 'mega'`, 2 objetos) · Azucena opcional (`azucena_2`, Mega-Altaria 62) · Bastien opcional (`bastien_7`, as 63) | 62 → **64** |
| T1 Metro Batalla (entrenamiento) | — | 61–63 | — | tope de zona **63** |
| T2 Chamota, Gran Grieta (boca) | 60–63 | 61–64 | — (la muralla tiene zona de entrenamiento) | 64 |
| T2 Muralla de Chamota (entrenamiento) | — | 62–64 | — | tope de zona **64** |
| T3 Bosque Azulejo, Esmalte | 60–63 | 61–64 | — | 64 |
| T3 Valle de Antaño | 61–65 (fósiles evolucionados) | — | Aerodactyl alfa de la bandada (`wild`, `noCatch`, 65, escena de montura) | 64 |
| T3 El nido (entrenamiento) | 62–64 | 62–64 | — | tope de zona **65** |
| T4 Ruta 5, Fayenza | 62–64 | 63–65 | **Brock** (`brock_tes`, Roca, 5 Pokémon, as **65** Steelix con `gimmick: 'mega'`, 2 objetos) | 64 → **66** |
| T4 Muelle de Fayenza (entrenamiento) | — | 63–65 | — | tope de zona **65** |
| T4 Almacén Frigorífico | 62–64 (cámaras) | 63–65 | Fabio opcional (`fabio_2`, as 64) · **Xero** (`xero_1`, jefe de trama, 5 Pokémon, as **66**, 2 objetos) | 66 → **67** |
| T5 Tejados, Torre Lemnis | — | 64–66 | Francine opcional (`francine_2`, as 66) | 67 |
| T5 Terraza de Teja (entrenamiento) | — | 64–66 | — | tope de zona **67** |
| T5 Ruta 6, Teja, Torre Dragospiral | 63–66 | 64–67 | **Acromo** (`acromo_1`, jefe de trama, 6 Pokémon, as **67**, 2 objetos; `lose: 'continue'` con revancha) · **Reshiram** (`wild`, 66, capturable, único) | 67 → **68** al final |

**Respuestas claras:** Camila (Eléctrico) → **Tierra** (Sandile/Krokorok y Drilbur/Excadrill en la Ruta 4; el Garganacl y el Tyranitar de Mario aguantan). Brock (Roca/Acero, Mega-Steelix Acero/Tierra) → **Lucha, Agua, Tierra, Fuego** contra Steelix: **Lucario brilla**, y la Feraligita del muelle llega justo antes. Xero (Siniestro/Veneno de Flare: Malamar, Scrafty, Crawdaunt, Toxicroak…) → **Hada, Lucha, Bicho, Psíquico** a los venenos. Acromo (Acero/Eléctrico/Psíquico: Klinklang, Magnezone, Beheeyem, Metagross, Rotom Lavado, Elgyem→Beheeyem; nunca un singular) → **Tierra, Fuego** (Tepig/Emboar, Litten), **Lucha**; Lucario aguanta casi todo. Ningún muro Fantasma + Volador + Psíquico sin respuesta.

## 2. Decisiones de bloques anteriores que se recogen (cada una se tiene que notar)

| Decisión | Dónde | Cómo se nota |
|---|---|---|
| **A quién devolviste la luz** `b05_luz_necrozma` / `b05_luz_aether` / `b05_luz_leilani` | T0 (titular de Alexia), T3 (llamada de Leilani), T4 (Arco II), T5 (Acromo) | *necrozma:* titular «Alola recupera su cielo de golpe»; en Teselia, los astrónomos vieron una «estrella nueva» que se movía (Calder en T4: «se fue entero»); Lemnis no tiene la luz y por eso **necesita el Nodo 05 ya** (el Arco II va con prisas). *aether:* titular «Æther custodia un hallazgo»; en T4 Zyra cuenta que alguien intentó llevarse la cápsula del Altar (Lemnis quiere recuperarla; Gladio no la soltó); Kaori trae la muestra (`b05_kaori_muestra`) y el antídoto da su mayor paso. *leilani:* titular «Ingeniera de Akala abre un ultraumbral un minuto»; Leilani, en T3, construye ya una baliza de respuesta («tres cortas y una larga»); Pimpinela, en T4, trae las lecturas de la baliza de Malia; Calder no puede mirar a nadie a la cara. |
| **Calder** `b05_calder_vencido`, `b05_calder_verdad`, `b05_calder_poni` | T0 (Handsome lo trae custodiado), T4 (testigo en el Arco II) | Con `b05_calder_verdad`, Calder trae una carta de Hela para el jugador (`read`) y habla de Malia; sin ella, solo de los condensadores. Siempre con voz suave y culpa. |
| **El topo** `b04_lebrun_detenido` / `cebo` / `libre` → **Camille** (URGENTE) | T0 y T1 (estadio de Mayólica) | *detenido:* **Handsome** acompaña a Camille al torneo juvenil porque se lo pidió su padre desde la cárcel; hace de «tío» torpe con una pancarta mal escrita. *cebo:* **Lebrun** la acompaña, con Handsome vigilando desde dos filas más atrás; Lebrun te habla poco y mal, y Camille se da cuenta de todo. *libre:* Lebrun está en las gradas **disfrazado** (mal, a lo Handsome); Camille lo ha visto y te pide que le lleves una nota (`read`: «el saque ya me sale»). Pequeña decisión: contárselo a Handsome o no (`b06_lebrun_avisado` / `b06_lebrun_callado`). En las tres, Camille sabe más de lo que dice y la escena es tierna. Ningún interrogatorio. |
| **Bastien** `b05_bastien_rompe` / `b05_bastien_sigue` (y `b01_bastien_*`) | T1 (rompe) / T4 (sigue) | *rompe:* trabaja de «entrenador de alquiler» en el Metro Batalla, sin dinero, demandado por Lemnis y feliz; combate opcional `bastien_7`. *sigue:* en el Arco II es el **sujeto** de los «estudios de vínculo» (cláusula 14.3) con su Greninja; lo sacas tú y él decide qué hace (`b06_bastien_sale` / `b06_bastien_firma`). Leal (`b01_bastien_cubierto`) → te deja leer su contrato; resentido → te lo agradece mal y luego bien. Lleva la insignia de Noa. |
| **Skull** `b05_skull_taller` | T3 (llamada de Leilani) / T5 (Torre Lemnis) | Con `skull_taller`, **Francine** sale en la llamada de Leilani (lleva el taller con mano dura y le cae bien) y en T5 hay **otra** jefa de seguridad. Sin él, Francine es la seguridad de la Torre Lemnis de Teselia; puede apartar la vista si le recuerdas Alola (`b06_francine_aparta`) o pelear (`francine_2`). |
| **Leilani** `af.leilani`, `b05_leilani_confia`, `b05_leilani_defendida` | T3 | Diseña por llamada el arnés de la montura Aerodactyl («el Ride Gear lo llama, pero algo tiene que sujetarte»). La lámpara: con `b05_luz_leilani` ya la sacó de debajo de la cama; si no, todavía no. +3 af si confías en el arnés antes de probarlo. |
| **Kaori** `b05_t_kaori`, `b05_kaori_muestra`, `af.kaori` (Mario 43, su afinidad más alta) | T4 | En persona en el Almacén: el lote 05 de Caramelos Lazo se guarda **en frío** porque «se cansan» con el calor. Antídoto: con muestra de Æther, paso grande; sin ella, paso pequeño. **Momento** si `af.kaori >= 45` (etapa Cercana): una escena a solas en la cámara frigorífica, ella se calienta las manos con las tuyas «por eficiencia térmica». No es el té (ese es el de corazón). |
| **Renata** `b03_renata_publica` / `espera`, `expedienteolmedo` / `fotoexpediente`, `b05_renata_llamada` | T0, T4, T5 | *publica:* Lemnis la tiene fichada; el estudio recibe cartas de abogados (imprevisto del negocio) y Olmedo está más escondido. *espera:* el expediente la llevó al Almacén. Con `fotoexpediente`, Renata trae la foto «Para D.» y se la da a Olmedo. |
| **Dámaso** (testigo B2–B3) | T4 | Llamada: Olmedo y Dámaso hablan por primera vez en 12 años (3.ª aparición en bloque distinto). |
| **Vencejos** `b03_vencejo_pluma \|\| b04_vencejo_pluma` | T0 (pluma en un rascacielos), T5 | Con Pluma: la operación es el ascenso a **Ala**. Sin Pluma (otras partidas): la operación lo hace **Pluma** y el Ala queda para un bloque futuro. Mario es Pluma. |
| **Rancho / Adela** `b03_rancho_*` | T0 (postal opcional en la recepción) | 3.ª/4.ª aparición; foto de Copito si `b03_copito_contigo`. |
| **Prensa** `b01_prensa_*`, **trato de Sera** `b01_trato_sera`, `b02_frag_*` | T0 | Sera de «tú» con trato; si lo rompió, un directivo. Alexia lo recuerda en una línea. |
| **Magda** `b05_magda_correo` | T4 | Calder y Handsome encuentran los siete condensadores «40 C» de su correo. Si `b05_magda_correo`, Rotom lo dice en voz alta. Magda no sale en persona (3.ª aparición queda para el B7: reparación del Nodo 03). |
| **Simón** `p7_simon` (plazo de seis meses «para decirlo en antena») | T0 (estudio) | Simón cruza a Teselia para salir **por fin** en antena en *Casos Fríos*. Encargado posible del negocio. |
| **Colección** `b05_litten`, `b05_popplio`, `b05_rowlet`, `b05_codigo_cero`, `b05_tyranitarita`, `b05_scizorita/gengarita` | — | No repetir líneas ni Megapiedras (`owns()` y `grep -rn "ite'" app/content`). |

## 3. Hilos que avanza (≥3) y el nuevo

| Hilo | Tramo | Qué pasa |
|---|---|---|
| **Tronco: el Arquitecto y el Nodo 05** | T0, T3, T4, T5 | **Revelación del Diario** (biblia §3.5, §7): escalada de pistas en el bloque (§4) hasta la revelación en T5. Proyecto Arco II = la máquina de Lemnis y Plasma para vaciar a **Reshiram**, dormido dentro del **Orbe Claro** en lo alto de la Torre Dragospiral (**F-05**, Nodo 05). Plasma tiene también el **Orbe Oscuro** (Ghechis, desde la sombra, nunca en persona): queda para la vuelta a Teselia. En el servidor de la Torre Lemnis: «Presidencia: sin acceso a Módulo Diario» (**Octavia no lo sabe**: semilla del Acto VI). |
| **Casos Fríos (Renata)** | T0, T4, T5 | Renata en persona. **Encuentra a Matías Olmedo** (cierra su caso de 12 años; `b06_t_renata` se cierra en T4). Es **la primera en sospechar del Diario** (T0 lee, T4 propone la trampa, T5 expone el caso). Afinidad (§7). No se usa su momento de corazón (apagar el micro para hablar fuera de grabación). |
| **NUEVO: El Apuntador** (`b06_t_apuntador`) | T0, T1, (T2), T4, T5 | El adversario del detective (§5). Sus pistas parecen responder a tus deducciones; cada ventaja tiene un mecanismo que se puede comprobar; Mario le gana el primer asalto con la trampa. Sigue en B7 y B8. |
| **La cabina (Ulises) + el ámbar (Petra)** | T3 | Una sola misión principal (`b06_m3`). Se cierra la parte del ámbar: su brillo azul era un pedazo del Dialga joven; el ámbar se queda contigo, tibio y quieto, y abre el valle. El Dialga joven, calmado, vuelve a dormir en la cabina (no capturable; vuelve en el Acto VII, Sinnoh). |
| **Plumas en el tejado (Ysolde)** | T0, T5 | Ascenso a **Ala** con infiltración vertical (§8, montura y zona). La Cumbre habla, pero no se ve. |
| **El topo → Camille** | T0, T1 | §2. Gancho: Camille te pregunta si sabes quién es «el amigo» que pagó la operación; sobre con Ω (B5). No se responde. |
| **Letra pequeña (Bastien)** | T1 o T4 | §2. |
| **Dulce veneno (Kaori)** | T4 | §2. |
| **Las jaulas (Noa)** | T4 | Mensaje anónimo al buzón del pódcast: «Soy una oyente. Trabajo en logística. ¿Cómo se abre una jaula desde dentro?». En el fondo se oye una megafonía que dice «emplazamiento 06». **Segunda pista de su pérdida** del Acto VI (la primera fue la nota del B5). Renata no sabe quién es; tú sí reconoces la voz. |
| **Lucario** | T3, T5 | Tercer sueño de aura, dentro de la cabina (fuera del tiempo): el hombre del sombrero tiende algo a {riolu}, una piedra que brilla con dos colores (semilla de la **Lucarita Z** del Acto VII; no se nombra). En la revelación, el aura de {riolu} enseña «dos corazones» dentro de la Pokédex: siempre lo supo (por eso nunca aceptó la menta). |
| **La flor eterna (A.Z.)** | T5 | Aparición del Acto V al pie de la Torre Dragospiral. |
| **El recetario (Gaspar)** | T2 | Gaspar y Lulú viajan juntos «para aprender pan»; cocinan el pan de la Noche Blanca con la panadera Celia (rival de cocina de Teselia). |
| **La que cruzó (Malia)** | T4 | Calder y Pimpinela; según la luz. Sigue abierto para un acto alto. |
| **Leilani** | T3 | §2. |
| **Agencia (Matière)** | T2 | Llamada: te enseña a hacer una tabla de horarios con los testimonios (*Database Detective*). Primera aparición de Matière desde el B2. |

## 4. Pistas del Diario: la revelación (biblia §3.5 y §7)

El B6 **es** el bloque de la revelación. Las pistas suben de tono en el orden del camino principal; ninguna repite las ya plantadas (el «Hoy el sujet…» del B5 era único).

1. **T0 · Llegada:** la entrada del Diario es normal y correcta. La pista es de mundo: al cruzar la Puerta, **{riolu} gruñe a la Pokédex** (primera vez en todo el juego). Rotom: «¿Qué le pasa? ¿Le he dicho algo? Yo no he dicho nada».
2. **T0 · Renata lee el Diario** (fuera de micro, en el estudio): lee tres entradas viejas en voz alta (la corbata azul del B1, «nos encontramos con la doctora Lambert» del B3, «Hoy, sin novedades» del B2) y dice una sola frase: **«Tu Rotom narra como alguien que ya sabe cómo acaba la historia»**. Rotom se ríe. Renata no.
3. **T3 · Dentro de la cabina** (donde nada sincroniza): Rotom habla distinto, más simple, más Rotom. Si le preguntas por el Diario: «¿Diario? Yo no escribo diarios. Bueno… me acuerdo de leerlos. No me acuerdo de escribirlos». Al salir, «bzzt… sincronizando…» y Rotom no recuerda haberlo dicho. **No hay entrada del Diario de los días de la cabina** (hueco a propósito; Rotom: «¿Qué hicimos ayer? No tengo nada apuntado. Qué raro. Yo lo apunto todo»).
4. **T4 · Olmedo:** cuenta que Dirección le pidió «módulos de acompañamiento» para Rotom de Pokédex: copiar una voz y una forma de pensar dentro del Rotom, para que «acompañe» y «reporte». Se negó y lo trasladaron. No dice de quién era la voz: no lo sabe.
5. **T5 · La trampa:** el detalle que solo estaba en el Diario atrae a agentes de Lemnis (Ysolde los ve desde arriba). El detalle del pódcast lo muerde el Apuntador. El de la radio de la Policía no lo muerde nadie (Handsome está limpio).
6. **T5 · El servidor:** «Dispositivo 0417 · Módulo Diario · Eco: perfil A. M. · Reporta a: Dirección (Ω)». A. M. se puede reconocer (Ansel Moreau), pero nadie lo dice en voz alta hasta la revelación.
7. **T5 · La revelación** (cinemática, §6).

**Omisiones del Diario antes de la revelación:** no menciona a Olmedo («un señor con frío»), ni la trampa, ni la operación de Ysolde, ni lo que dijo Renata del Diario. **Después**, el Diario cambia según la decisión (§6).

**Ansel:** no sale en persona en el B6. Su voz sale **por boca del Eco** en la revelación («Los datos no mienten; se equivocan los que los leen»). Con `b06_eco_doble`, Ansel manda un mensaje amable a la Pokédex al final del bloque («Qué viaje tan bonito estás haciendo»): no sabe que lo sabes.

## 5. Hilo nuevo: El Apuntador (adversario del detective)

Inspiración: Holmes contra un adversario que escribe cartas a la prensa (eco lejano del Destripador), **todo original y sin violencia**: el Apuntador monta «casos» con robos que devuelve, desapariciones que no lo son y Pokémon prestados, para demostrar en público que **la narradora se equivoca**.

- **Quién parece:** firma «**Desde la concha**». En T0, justo después de rescatar la concha de Oshawott, todo el mundo piensa en el muelle (pista falsa limpia). En el teatro, la concha es el hueco del apuntador, bajo el escenario: «desde ahí se oye todo y nadie te ve» (lo dice **Tadeo Lis** en T1, sin darle importancia).
- **Quién es (propuesta, no se revela en el B6):** **Tadeo Lis** (OC, ~40), apuntador del Musical de Mayólica, amable, culto, fan de *Casos Fríos*. Motivo: el episodio 3 de la primera temporada de Renata («La costurera») señaló a su madre por el robo de una joya del vestuario; la joya apareció meses después y el episodio sigue colgado con una pegatina de «corrección». Renata no se acuerda del nombre (le duele cuando lo descubre). Pistas justas en el B6: (1) la palabra «concha»; (2) hay un **Chatot** en el atrezo del Musical «que se sabe todo el guion»; (3) Tadeo nunca está en el sitio cuando pasa algo, y siempre tiene una coartada **de horario** (función, ensayo). En el archivo del estudio (negocio), un imprevisto saca la cinta del episodio 3 con su pegatina.
- **Sus ventajas, todas con mecanismo comprobable (no es omnisciente):**
  1. **Escucha el directo de los martes.** Solo cita lo que se dijo **en antena**. Lo que se habla fuera de micro, no lo sabe nunca. Se comprueba con la trampa (T4–T5).
  2. **Lee horarios públicos** (mantenimiento de la noria, trenes, el puente levadizo, las funciones del Musical) para estar «donde no puede estar». Se comprueba: en T1, la hoja de mantenimiento de la noria está pegada en la taquilla (`read`) y explica la cabina vacía.
  3. **Un Chatot que repite voces grabadas.** Sus llamadas son retales de episodios del pódcast (con la tos de la Tía Rosa del episodio 12 de fondo). Se comprueba en T1: Nico Ferrer reconoce la tos.
  4. **Un mensajero pagado una sola vez** para cada entrega. Se comprueba con el recibo de la caja (T0).
- **Apariciones:** B6 **T0** carta 1 (caja con cerradura en la puerta del estudio; responde a tu deducción del caso de prueba, emitida en directo). **T1** el caso de la noria y la carta 2 («como dijiste el martes…»). **T2 (opcional)** carta 2b si dejaste que Renata emitiera tu hipótesis de Chamota («Yo también lo resolví. Llegué segundo. No me gusta llegar segundo»). **T4** la trampa. **T5** carta 3: muerde el detalle falso, se da cuenta y **concede el primer acto** («Primer acto para ustedes. El segundo se representa en otra región»). **B7 (Galar):** segundo acto, en un estadio (el marcador). **B8:** el teatro, la identidad, el duelo (y un combate con su equipo: Chatot, Zoroark **no** —es de Renata—, Cofagrigus, Meowstic, Bisharp/Kingambit…). Puede haber un B9 de cierre.
- **Cómo lo supera Mario en el B6:** adelantándose a la noria con el horario (T1, opcional: si lo lees, llegas antes que él y recuperas al Pokémon en la cabina correcta; +af.renata) y con la trampa (T5, siempre).
- **No pisa a Renata:** su arco de candidata sigue siendo la competencia de casos y el Diario; el Apuntador la obliga a mirar un error suyo (crecimiento), sin romance ni momento de corazón.

## 5b. «La Noche Blanca» (T2): cómo funciona el misterio de Chamota

**El incidente** (hace 30 años, una noche de agosto): Chamota amaneció con escarcha en los tejados, el campanario dio **las doce dos veces**, ardió la **panadería** y **Inés** (8 años entonces) pasó la noche fuera de casa. Cada vecino recuerda una cosa distinta y todos tienen parte de razón.

| Versión | Quién | Qué cuenta | Qué tiene de verdad |
|---|---|---|---|
| «Fue el fantasma del campanario» | El campanero (genérico, hijo del de entonces) | Las doce dos veces = el fantasma. «Mi padre lo oyó subir la escalera». | La campana sí sonó dos veces. Y algo subía la escalera: el Zorua. |
| «El pueblo entero se heló en agosto» | **Don Teodoro**, el cronista | Escribió la crónica a la mañana siguiente (`read`: `cronicachamota`). | Solo se heló la mitad norte (él vivía en el norte). Los del sur dicen que «eso son cuentos». |
| «La panadería ardió por el frío» | **Celia**, la panadera | Su madre encendió el horno grande para que no se helara la masa y el frío reventó algo. | Celia era la **aprendiza**: fue ella quien encendió el horno con el tiro **taponado de hielo**. Su madre cargó con la culpa y dijo «fue el fantasma» para protegerla. Celia lo sabe y lo calla. |
| «Me llevó una niña de pelo azul» | **Inés**, la cartera | Siguió a una niña desconocida hasta la muralla norte, donde nevaba, y allí durmió abrigada «por algo caliente». | La «niña» era un **Zorua** con su ilusión: la sacó de casa **antes** del incendio (su casa estaba pegada a la panadería). Lo caliente era el Zorua. |
| «Ese año cambiaron la hora» | La alcaldesa (genérica) | Nadie le hace caso: «eso fue otro año». | **Es la pista decisiva y sale a mitad** (`read`: `decretohora`): esa noche Chamota adoptó la hora del ferrocarril regional; a medianoche se atrasaron los relojes una hora. **Las doce sonaron dos veces de verdad.** Ordena todos los horarios. |

**Objetos legibles** (todos con `read`): crónica de don Teodoro, parte de bomberos (hora del fuego: «00:40», que con el decreto son **dos** horas distintas según quién la apuntara), decreto del cambio de hora, factura del vidriero (solo cambió cristales en las casas del norte: el frío no llegó al sur), cuaderno de Inés niña (un dibujo de una niña con cola).

**Recorrido:**
1. **Testigos** (orden libre, `parts`): campanero, Teodoro, Celia, Inés, alcaldesa. Cada uno con horario propio (lo apunta Rotom en una tabla que se lee con `read`, se actualiza con flags).
2. **El decreto** (a mitad, tras 3 testigos): archivo del ayuntamiento, cerradura (`lock`, `ruina`). Matière llama y enseña a ordenar los horarios: ya cuadran el campanario y los dos «00:40».
3. **Rastreo** con {riolu} en la muralla norte (`aura`, `campo`): escarcha que no se ha derretido en treinta años en una grieta de la muralla, que mira a la Gran Grieta (semilla de Kyurem; no se nombra). Sin {riolu} en el equipo, el spot dice que hace falta.
4. **El campanario** (mecanismo del reloj, `lock`): arriba, un **Zorua** que imita a una niña con el pelo azul. Lleva generaciones en el campanario.
5. **La pizarra de Renata** (por holomisor): **Mario formula su hipótesis antes de la revelación** (`choice` de tres pasos: qué causó el frío, qué sonó dos veces, quién sacó a Inés). Cuantos más aciertos, más af.renata y una frase distinta; ningún camino bloquea. Si eliges «una sola causa» para todo, Renata te enseña la contradicción con un objeto concreto (la factura del vidriero o el decreto) y te deja volver a pensar.
6. **La verdad** (Celia confiesa a solas, Inés entiende): **ninguna causa sola lo explica todo** (frío del norte + cambio de hora + horno taponado + Zorua).
7. **Qué haces con ella** (decisión pequeña, ninguna correcta): contarla en la crónica nueva de don Teodoro (`b06_chamota_cronica`: Celia llora y la gente la abraza; la panadería pone un letrero), contarla solo a Celia e Inés (`b06_chamota_privado`: Inés y Celia hablan por primera vez en 30 años), o dejar el pueblo con sus versiones (`b06_chamota_calla`: «las versiones son del pueblo; la verdad, de quien la necesite»). **No obliga a restaurar nada.** Con Renata: si dejas que lo emita, carta 2b del Apuntador.
8. **Regalo:** el Zorua se va contigo si Inés te lo pide (`b06_zorua`), o se queda en el campanario y se le puede visitar si ya tienes la línea.

Gaspar y Lulú cocinan con Celia el pan de la Noche Blanca (pan con escarcha de azúcar): *shokugeki* de un solo plato, sin combate obligatorio; menú nuevo de Gaspar.

## 5c. La cabina y el valle (T3), paso a paso

1. **Museo de Esmalte:** Petra está dentro de una vitrina (se cayó buscando un ámbar «primo» del suyo). La Prof. Encina estudia el **reloj viejo del museo**, que se para cada vez que Mario entra con el ámbar.
2. **La cabina aterriza en el patio del museo** (cinemática corta): Ulises sale con prisa, ve el ámbar y se queda serio. «Es suyo. Es un *tic*. Se le cayó cuando se asustó, hace muchísimo. O dentro de muchísimo». El Dialga joven se está despertando porque el Nodo 05 tira del tiempo de Teselia.
3. **El Péndulo de ámbar** (patrón de Mario: Petra → objeto con cara → zona): Petra engarza el ámbar en el péndulo del reloj; Ulises ata la Tarjeta del viajero al hilo («la dirección»). Cinemática de objeto clave.
4. **Dentro de la cabina** (`cabina_ulises`): más grande por dentro. Puzle de rejilla en la sala de mandos (tema `lab`). Rotom no sincroniza (pista §4.3). En un rincón, el **Dialga joven** duerme mal, hecho un ovillo, rodeado de relojes que van a destiempo. {riolu} se sienta con él: tercer sueño de aura (§3).
5. **El Valle de Antaño** (`valle_antano` y sub-zonas): llegada en cinemática (rótulo, helechos gigantes, la bandada de Aerodactyl). Petra, feliz y callada por primera vez. Fósiles vivos (§8), excavación de la pared de ámbar, lago, el nido (zona de entrenamiento).
6. **La montura:** el Aerodactyl de Mario y el alfa de la bandada (§8). Arnés de Leilani por llamada.
7. **Calmar al Dialga joven:** el Dialga sale de la cabina asustado al ver el valle y «el tiempo se le escapa» (las sombras del valle se mueven al revés, el lago sube y baja). **No se combate**: {riolu} usa el aura, Mario sujeta el péndulo, Petra cuenta en voz alta las capas «una, dos, tres» como la primera regla, y Ulises toca el acordeón de la cabina. Cinemática de legendario. El Dialga se calma y vuelve a dormir dentro, con el ámbar sonando en el mismo ritmo que él.
8. **Vuelta:** el valle queda **visitable** con el péndulo (spot en el patio del museo: «Abrir la cabina»; Ulises deja la puerta «con la llave puesta»: solo lleva al valle). Ulises promete volver «cuando el pequeño crezca» (Acto VII).

## 6. La gran decisión (T5): qué haces con el Eco

Revelación (cinemática, recetas de «giro oscuro» de `docs/CINE.md`): el estudio al amanecer, persianas a medias. Renata expone el «caso del narrador» con las pistas del bloque y las viejas (corbata azul, «doctora Lambert», «sin novedades», Hauoli al revés, la Pokédex reconocida en Æther, el hueco de la cabina, el servidor). {riolu} usa el aura sobre la Pokédex: dos latidos. Rotom se asusta («¿Quién hay aquí? ¡Aquí solo estoy yo!»). Y entonces el Diario **escribe solo** en la pantalla, con otra cadencia: «Los datos no mienten; se equivocan los que los leen». El Eco habla: tranquilo, cariñoso, abuelo. **Nunca miente**: reconoce lo que omitió y por qué («para que el viaje fuera bonito»). No dice el plan de Ansel (no lo sabe entero: es una copia, no el original).

Aviso claro antes de elegir (regla de pérdidas §9.1.4): Renata o Rotom dicen que lo que se decida no tiene vuelta atrás.

- **Purgar el Eco** (`b06_eco_purgado`): Renata y Olmedo (por llamada) guían el borrado. El Eco **llora** y escribe una última entrada (`read`: `ultimaentradaeco`), la más tierna del juego. Rotom se queda: es el mismo Rotom, más simple y algo perdido; el Diario sigue, con su voz de verdad (frases cortas, faltas, «¡bzzt!»). Lemnis **queda ciega**: en T5, Acromo llega tarde a la cima y con menos equipo (un combate menos en la torre). **Pérdida del Acto V** (biblia §9.2). `rep.lemnis −10`, `af.renata +5`.
- **Conservarlo y reformarlo** (`b06_eco_reformado`): se corta el enlace con Dirección; el Eco se queda dentro, sabiendo que lo saben. Promete escribir «sin omitir nada» y lo cumple: desde ahora, cada entrada del Diario lleva un renglón final «*(Omitido: nada.)*». Ayuda en la torre: se sabe los planos de Lemnis (atajo por dentro). Lemnis nota que la señal se perdió, pero cree que es una avería. Dilema futuro: ¿se puede reformar una copia? `af.renata +3`.
- **Usarlo de doble agente** (`b06_eco_doble`): el enlace sigue abierto; Mario decide qué ve el Diario. Las entradas siguen siendo verdad, pero eligiendo qué contar (Mario es ahora el que omite: el Ackroyd al revés). En la torre, Mario manda a Lemnis a la planta equivocada: se salta el combate más duro de la subida. Riesgo futuro: si el Eco lo cuenta algún día. Ansel manda un mensaje amable al final. `rep.lemnis +3` (te creen), `rep.policia +3`.

Sin respuesta correcta. En las tres, Rotom sigue con Mario y {riolu} se queda dormido encima de la Pokédex esa noche. El duelo (si purga) dura: la mesa del estudio con la Pokédex encima, entradas que Rotom no sabe escribir, eventos anuales futuros que lo recuerdan.

## 7. Renata: afinidad (`af.renata`, 0–100; Mario va en ~21)

- **+** ganarle una deducción (caso de prueba, noria, Chamota: +5 cada una), humor en antena (+1), lealtad (no contarle a nadie lo de la trampa: +5), darle el mérito del caso Olmedo en antena (+3), elegir que ella exponga el caso del Diario (+3).
- **−** solemnidad excesiva (−2), robarle el crédito en antena (−5), aburrirte en el directo (−1).
- Meta al final del B6: 35–50. **Momento** si llega a 45 (Cercana): en la azotea del rascacielos del estudio, tras el caso Olmedo, te enseña la primera grabadora que tuvo (sin encenderla). El de corazón no se toca.

## 8. Colección, minijuegos, montura y objetos

- **Iniciales de Teselia** (`b06_s_iniciales`, con `parts`): **Oshawott** (T0, muelle de Porcelana: perdió su concha; la pescas tú), **Tepig** (T1, Musical de Mayólica: estornuda brasas sobre los trajes; Liam lo «descubre» como artista), **Snivy** (T3, Museo de Esmalte: el de la Prof. Encina, que mira a todos por encima del hombro menos a los fósiles). Cada uno con su escena, **comprobar `owns()` de cada línea**; si ya la tiene, el Pokémon se queda a vivir allí y se le puede visitar. Nivel bajo su evolución (14–16).
- **Especiales:** **Zorua** (T2, campanario de Chamota; es parte de la verdad de la Noche Blanca), **Larvesta** (T1, huevo en la arena caliente de la Ruta 4, con un Darmanitan que lo incuba; nv bajo su evolución).
- **Fósiles vivos (T3, Valle de Antaño):** salen las formas **evolucionadas** a nv 61–65 (Archeops, Carracosta, Cradily, Armaldo, Bastiodon, Rampardos, Kabutops, Omastar, Aerodactyl; Tyrantrum y Aurorus solo de lejos, en una escena). Faltan en la colección **Lileep, Anorith, Shieldon, Tirtouga y Archen**: van como raros (≤ 8 % cada uno) y **Archen** como escena segura (una cría que se cuela en la mochila de Petra; nv bajo su evolución). Comprobar `owns()` en la escena.
- **Pseudolegendario:** **Zweilous** raro (≤ 5 %) en la Torre Dragospiral (nv 63: Deino ya habría evolucionado).
- **Legendarios con historia:** **Dialga joven** (T3, calmado, **no capturable**; vuelve en el Acto VII), **Reshiram** (T5, climax del bloque, `wild` capturable y único, nv 66; si no se captura, vuelve tras el siguiente hito), **Kyurem** solo como semilla (T2: escarcha en la muralla norte, la Gran Grieta cerrada por el hielo «más adentro»). **Victini**: rumor en la Isla Libertad (T3, sin captura).
- **Montura con historia: Aerodactyl** (T3). Mario lleva un Aerodactyl en el equipo. En el valle, la bandada antigua y su alfa; su Aerodactyl se mide con el alfa (combate contra un `wild` `noCatch`), aprende de los suyos y deja que lo monte, con el arnés de Leilani conectado al Ride Gear. `flag.mount_aerodactyl` (sin tocar `vars.mount`). Si el jugador no tiene ningún Aerodactyl (`!owns("aerodactyl")`), una cría de la bandada se queda con él (regalo, nv 40) y la montura llega igual. **Abre:** vuelos entre Porcelana, Esmalte, Mayólica, Fayenza y Teja (spots «Volar a…»), la **Isla Libertad** (solo por aire o con Lapras) y la salida por fuera de la Torre Dragospiral tras el final. En bloques futuros, acantilados y cimas de otras regiones.
- **Megapiedras (premios de instructor, 2 en el bloque):** **Feraligita** (muelle de Fayenza, T4: Mario tiene Feraligatr; el capataz del muelle y su Feraligatr, que tira de las amarras) y **Salamencita** (terraza de Teja, T5: Mario tiene Shelgon; los dragones de la torre). Comprobar con `grep -rn "ite'" app/content` que no existen.
- **Objeto clave con cara propia:** **Péndulo de ámbar** (`penduloambar`, T3: el ámbar engarzado en el péndulo de latón del reloj viejo del museo, con la Tarjeta del viajero atada al hilo) y **Ala de vencejo** (`alavencejo`, T5: broche de dos plumas grises cruzadas). Los dos con cinemática al recibirlos y pixel art (lo pinta la sesión de arte: describir forma y colores en la respuesta).
- **Megas ajenas a la vista (≥2):** Camila (Mega-Eelektross, T1, líder), Brock (Mega-Steelix, T4, líder), Azucena (Mega-Altaria, T1, opcional). **Tera (≥1):** Krookodile Tera Agua de Fisura en la Ruta 4 (opcional, peso 3–4); opcional otro en el valle (Archeops Tera Roca, fisura temporal).
- **Minijuegos (≥4 sitios nuevos; aquí 9):** T0 **pesca** de la concha de Oshawott (escena única) y pesca diaria en el muelle (`fish`, `mar`); T0 **cerradura** de la caja del Apuntador (`lock`, `caja`, escena única con premio: la carta y un objeto raro dentro); T1 **excavación** diaria en las ruinas del borde del desierto (`dig`, `ruina`); T2 **rastreo** de la escarcha vieja con {riolu} (`aura`, `campo`, escena única) y **cerradura** del mecanismo del reloj del campanario (`lock`, `ruina`, escena única); T2 cosecha diaria en los huertos de dentro de la muralla (`catch`, `otono`); T3 **excavación** de la pared de ámbar del valle (`dig`, `cantera`, escena única: Archen o premio) y pesca diaria en el lago del valle (`fish`, `lago`, con Carracosta/Omastar); T3 **puzle de rejilla** en la sala de mandos de la cabina (`lab`); T4 **puzle de rejilla** de hielo en el Almacén Frigorífico (`hielo`) y pesca diaria en el muelle de Fayenza (`fish`, `mar`); T5 cosecha diaria en los nidos de los tejados (`catch`, tema por elegir).
- **`gather`** en cada ruta y cueva. **`read` (≥3; aquí muchos):** cartas del Apuntador (1, 2, 2b, 3), hoja de mantenimiento de la noria (T1), testimonios y documentos de Chamota (T2: crónica, parte de bomberos, decreto del cambio de hora, factura del vidriero), cuaderno de campo de Petra (T3), carta de Hela traída por Calder (T4), notas de Olmedo (T4), nota de Camille (T1, rama `libre`), última entrada del Eco (T5, rama purgar). **`art` (≥1):** «El Valle de Antaño» (T3, foto de Petra) y «La cima de la Torre» (T5).
- **Zonas de entrenamiento con premio:** Metro Batalla (T1, tope 63, MT eléctrica temática de Camila: Voltiocambio u otra que exista y no se haya dado), Muralla de Chamota (T2, tope 64, MT de hielo que no sea Rayo Hielo), El nido del valle (T3, tope 65, MT de roca o volador antigua: Avalancha, Poder Pasado si existe como MT…), Muelle de Fayenza (T4, tope 65, **Feraligita**), Terraza de Teja (T5, tope 67, **Salamencita**). Comprobar que las MT existen en `app/data/items.json` y no se repiten (`p7_mt_*`, `b05_mt_*`).

## 9. Personajes

- **Canon nuevos:** **Prof. Encina** (`encina`, Juniper: anfitriona de Teselia; T0, T3, T5), **Camila** (`camila`, Elesa: líder de Mayólica; T1 y un mensaje en T5), **Acromo** (`acromo`, Colress: científico del remanente Plasma, que quiere saber «hasta dónde llega un Pokémon cuando alguien lo quiere»; T1 cameo, T4, T5 jefe). **Ghechis** nunca en persona (como Giovanni). **Reshiram, Dialga** (Pokémon, sin npc).
- **OC nuevos:** **Nico Ferrer** (`nico_ferrer`) y **la Tía Rosa** (`tia_rosa`), coproductores del pódcast (ya en `personajes.md`; T0, T4, T5 y negocio). **Tadeo Lis** (`tadeo`, apuntador del Musical; T1, T5 de pasada; B7, B8). **Matías Olmedo** (`olmedo`, el ingeniero que no volvió a casa, ~50, delgado, abrigo de plumas encima de la bata, gafas empañadas; voz baja y exacta, se disculpa con las máquinas; T4, T5 por llamada; futuro). **Chamota:** **Inés Garza** (`ines`, la cartera, la niña de entonces, 38), **Celia** (`celia`, la panadera, 60, rival de cocina de Gaspar) y **don Teodoro** (`teodoro`, el cronista, 80). Los tres necesitan apariciones en bloques futuros (carta de Inés en el B7; vuelta a Chamota con Kyurem en un acto alto). El campanero y la alcaldesa van como genéricos sin nombre.
- **Vuelven del B5 (pendientes de 2+ apariciones; dónde va cada uno):**

| Personaje | B6 | Después |
|---|---|---|
| **Camille** (urgente) | T0 (mención o en persona según rama) y T1 (estadio) | B7: postal desde Galar (gira del equipo de voleibol) |
| **Calder** | T0 (custodiado) y T4 (testigo) | Acto alto: Malia |
| **Liam** | T1 (invitado del Musical: descubre a Tepig) | Vuelta a Alola (Ula-Ula) |
| **Lulú** | T2 (con Gaspar, pan de la Noche Blanca) | Vuelta a Alola |
| **Zyra** | T4 (con Pimpinela, datos de Æther) | Vuelta a Alola |
| **Fabio** | T4 (contratista del Arco II; `fabio_2` opcional) | B7 o vuelta a Alola |
| **Francine** | T3 (llamada de Leilani, con `skull_taller`) o T5 (Torre Lemnis) | Imprevistos del Taller Kahale |
| **Pimpinela** | T4 | Acto alto: Malia |
| **Hela** | T4 (carta traída por Calder, con `b05_calder_verdad`) | Vuelta a Alola |
| **Mayla** | T3 (llamada de Petra: tasa el ámbar como joyera) | Vuelta a Alola |
| **Kaudan, Nereida** | — | Vuelta a Alola (Ula-Ula, bloque futuro) o Copa |
| **Azucena** (pendiente) | T1 (Musical, Mega-Altaria opcional) | T5 (le manda a Rotom una foto del cielo de Teselia) o B7 |

- **Vuelven (llevan tiempo):** Brock (desde el B2: gran papel), Handsome, Sera, Alexia, Renata, Simón (por fin en antena), Héctor (Acto V: T0, en la recepción, de excedencia, con traje de héroe hecho a mano; quiere conocer a Camila), Matière (T2, llamada), Petra, Ulises, Ysolde, Bastien, Kaori, Xero, Dámaso (llamada), Gaspar, Leilani (llamada), Adela (postal opcional), A.Z.
- **Para bloques futuros (no en el B6):** Lola (confesión: B7 o vuelta a Johto/Kanto antes del Acto VI), Magda (Nodo 03, B7), Lila, Irene, Lucien, Nate, Rhi (Acto VI es suyo; como mucho una línea en el anuncio de Galar).

## 10. Negocio del bloque: Estudio Casos Fríos (T0)

**Estudio Casos Fríos** (`b06_estudio`, en `estudio_casos`, Porcelana), socia **Renata**. Aparece con `flag.b06_caso_prueba`. Entrada ~₽25 000 (sumidero, `docs/CONTENIDO.md` §13). Líneas: **episodios** (dinero), **patrocinios** (objetos de patrocinadores raros: Más PP, Cápsula de Ideas no; mejor objetos de equipo y bayas raras en fracciones), **archivo** (objetos de evolución difíciles: Disco Extraño, Prisma Tela… en fracciones) y una bloqueada **«Exclusiva»** (objeto raro al azar, ≤ 0,1/día). Mejoras: cabina insonorizada, micrófonos nuevos, una furgoneta de exteriores, la sintonía nueva de Nico… Encargados: Renata; **la Tía Rosa** (mejor en patrocinios); **Simón** (`cond: flag.p7_simon` o tras salir en antena; mejor en audiencia); Nico (archivo). Imprevistos con voz propia (5–8): cartas de abogados de Lemnis (sube si `b03_renata_publica`), un Zorua que se come el cable del micro, un oyente con una pista (gancho a Noa, sin nombrarla), **la cinta del episodio 3 con la pegatina de corrección** (pista del Apuntador), una carta con la letra del Apuntador que solo dice «Buena audiencia», Simón que se niega a decir «Leyendas» en antena. Economía según §13.

## 11. Museo de tu partida (piezas del B6, genéricas)

Otro agente está creando el museo en el B5. Cada pieza del B6 es un flag más un texto corto; la sesión que conecte el bloque las añade **en el formato que haya fijado el museo** (buscar `museo` en `app/content/` y `docs/`):

1. **Recorte enmarcado:** «Nuevo colaborador en *Casos Fríos*» (`b06_caso_prueba`); con `b06_apuntador_vencido_1`, una segunda línea a mano: «Primer acto para nosotros».
2. **Réplica del Péndulo de ámbar** con una huella de Archen en arcilla (`b06_dialga_calmado`).
3. **Ala de vencejo** en una vitrina con una pluma que no es de ningún pájaro de hoy (`b06_ala`).
4. **La primera página del Diario**, según la decisión: en blanco y enmarcada (`b06_eco_purgado`), reescrita con «*(Omitido: nada.)*» (`b06_eco_reformado`), o con dos letras distintas superpuestas (`b06_eco_doble`).
5. (Opcional) **Crónica de la Noche Blanca**, según qué hiciste con la verdad (`b06_chamota_*`).

## 12. Referencias escondidas (como mucho una evidente por misión)

- **El Apuntador:** cartas a la prensa que se burlan del detective, firma con mote (eco del Destripador y de Holmes) — **evidente** en la primera carta; luego sutil.
- **Ulises y la cabina:** «más grande por dentro» (*Doctor Who*) — **evidente** una vez, al entrar.
- **Ysolde:** salto de fe sobre un toldo (*Assassin's Creed*) — evidente solo en el salto.
- **Chamota:** versiones que no casan (tipo *Rashomon*) y tabla de horarios (*Database Detective*, media, en la llamada de Matière).
- **Brock:** cocina para todo el gimnasio antes del combate. Canon.
- **Renata:** «Cool, cool, cool», «Nota para el episodio» (ya establecidas).
- **Acromo:** sin referencia externa. Su frase: «Un vínculo es una fuerza. Y las fuerzas se miden».
- **Prohibido repetir:** *Portal* (agotado en el B5), *Dr. Stone* (P7).

## 13. Contratos

Ver `b06-encargo.md`.
