# BLOQUE 5: "ACTO IV · LA LUZ ROBADA" (plan detallado)

> **Región:** Alola (nueva, `alola`, mapa 100 × 100). Tres islas: **Melemele** (Ciudad Hauoli, Ruta 1, Pueblo Lilii, Ruta 2, Cueva Sotobosque), **Akala** (Ciudad Kantai, Ruta 4, Pueblo Ohana y Rancho Ohana, Ruta 5, Colina Saltagua, Ruta 8 con el Área Volcánica del Wela, Ciudad Konikoni, Ruinas de la Vida) y **Poni** (Aldea Marina, Cañón de Poni, Altar del Sol y de la Luna). Más el **Paraíso Æther** (isla artificial, entre Akala y Poni). Ula-Ula **no** entra en este bloque (se ve en el mapa como «aún no»; queda para la vuelta a Alola).
> **Duración meta:** ~12 h.
> **Inicio:** tras `flag.b04_fin`. Mario terminó el B4 y está **en Azafrán** (el B4 acaba en Celeste; él volvió). `comun.js` pone el enganche «La Gira: convocatoria para Alola» en `azafran`, `estacion_azafran`, `puerta_azafran`, `celeste`, `lavanda`, `luminalia_plaza`, `puerta_trigal` y `trigal` → guion `b05_inicio` (lo escribe T0).
> **Flag final:** `b05_fin`. **Aviso de ritmo:** `b05_m_aviso`, al entrar por primera vez en `aldea_marina` (Poni; quedan ~3 h).
> **Prefijo de ids:** `b05_` en flags, misiones y guiones de historia. Lugares de Alola con nombre que choque: `alola_ruta1`, `alola_ruta2`, `alola_ruta4`, `alola_ruta5`, `alola_ruta8`.
> **Escrito:** 2026-10-11, madrugada (sesión de las 0:47, por indicación de Mario: «que las tareas de esta noche se centren en la historia»). Mario va **0 bloques por delante**: lo jugará en cuanto se publique.

## 0. Lo que pasa, en una frase por tramo

| Tramo | Archivo | Qué pasa | Duración |
|---|---|---|---|
| T0 | `t0-melemele.js` | **La Puerta de Alola.** Desde la Puerta de Kanto (Azafrán) la Gira cruza a **Ciudad Hauoli** (Puerta nueva en el Paseo Marítimo). Rotom: «bzzt… sincronizando…» (tercera vez, ya casi costumbre). Recepción de la Gira: el **Prof. Kukui** (anfitrión de Alola, fundador de su Liga), **Sera** (o un directivo, según el trato), **Alexia**, y un astrónomo de Lemnis que da la charla del cielo: **el Dr. Calder Wynn**. El laboratorio de Kukui en la playa: **Litten** escupe una brasa a Rotom y elige al jugador. **Leilani** se estrella con un prototipo de montura en el Paseo Marítimo (meet-cute; es de Akala; «te debo una»). Ruta 1 → **Pueblo Lilii**: el kahuna **Kaudan** (y **Kiyo** de visita: dos maestros de Lucha). El recorrido insular adaptado al Circuito: las pruebas cuentan como medallas de la Temporada. Ruta 2 → **Cueva Sotobosque**: prueba del capitán **Liam** (puzle de rejilla + Pokémon dominante). **Tapu Koko** deja caer una piedra brillante: **Pulsera Z** (cinemática). **Gran Prueba** con Kaudan → **Lizastal Z**: el primer movimiento Z de {riolu}. Ferry a Akala. | ~3 h |
| T1 | `t1-akala.js` | **Ciudad Kantai**: el taller de Leilani junto al **Centro de Investigaciones Dimensionales** (la Prof. **Pimpinela**: la madre de Leilani, **Malia Kahale**, desapareció hace 9 años en un ultraumbral; Leilani bromea para no hablar de ello). Ruta 4 → **Pueblo Ohana** y el **Rancho Ohana** (zona de entrenamiento). Ruta 5 → **Colina Saltagua**: prueba de la capitana **Nereida** (Agua; **Misty** está de visita: intercambio de capitanes). Un **Lapras** enredado en una red de Fisura; Leilani termina el **Ride Gear Universal** (objeto clave con cinemática) y Lapras se queda contigo como **montura** (abre el mar: caletas y atajos). Ruta 8 → **Área Volcánica del Wela**: prueba de **Kiawe** (Fuego); **Rhi** quiere el Pirostal Z para su Cinderace (rival opcional). **Ciudad Konikoni** y las **Ruinas de la Vida**: Gran Prueba con la kahuna **Mayla** (Roca). Misión con historia de la **Tyranitarita** en la joyería de Mayla. Al final, una invitación con membrete de **Æther**: «el Presidente en funciones solicita su presencia». | ~3 h 30 |
| T2 | `t2-aether.js` | **Paraíso Æther.** **Gladio**, presidente en funciones, y **Zyra**. Æther recibió donativos de Lemnis durante años; **Fabio** (canon) firmó la venta de los datos de ultraumbrales a Lemnis y presta la **zona de conservación** como «almacén de tránsito» de desplazados: **las jaulas** («Destino: emplazamiento 04»; una nota de **Noa** dentro de una jaula). **El escáner de seguridad de Æther reconoce la Pokédex como «dispositivo de Dirección (Lemnis)» y abre las puertas** (pista del Diario). **Ansel**, «de visita técnica», justo donde estás. **Camille** (15), la hija de Lebrun, en revisión en la clínica (según `b04_lebrun_*`). **Kaori** en los laboratorios (Caramelos Lazo en la farmacia de Æther). **Xero** de contratista. El remanente **Skull** (la jefa **Francine**) hace de seguridad pagada. **Bastien**: su contrato lo manda aquí «para estudios de vínculo»; decide. Jefe: **Fabio** (con Mega-Alakazam). Gladio te entrega a **Código Cero** («no es un arma; es un chaval al que nadie preguntó») y el barco a Poni. | ~3 h |
| T3 | `t3-poni.js` | **Isla Poni.** El cielo de Alola lleva días apagándose a media tarde («algo especial en el cielo» de la Gira era esto). **Aldea Marina**, la kahuna **Hela**. **Rowlet** (último inicial). **Cañón de Poni** (rastreo de aura con {riolu}) → **Altar del Sol y de la Luna**: el **Nodo 04** de Lemnis. **Necrozma**, atado y vaciado: le están quitando la luz. El jefe: **Calder Wynn** (con Psicostal Z). **Gran decisión: a quién devuelves la luz** (§5). **Leilani** ve, un segundo, el otro lado del ultraumbral. Final: **A.Z.** al atardecer en la playa de Poni; la Gira anuncia **Teselia** (Acto V). | ~2 h 30 |

T4 en adelante (lo escribe la sesión de las 2:53 si da tiempo, o noches siguientes): `t4-tiendas-premios.js` (tiendas de MT y piedras de Alola, Megas ajenas, Teras), `t5-negocio.js` (**Taller Kahale**, §10), `t6-minijuegos.js` (los puntos diarios que falten, §8).

## 1. Curva de niveles

Al empezar el B5 el tope es **56**. Pruebas en vez de gimnasios: cada **Gran Prueba** es un hito (sube el tope; los únicos vuelven tras ella).

| Tramo | Salvajes | Entrenadores | Jefe | Tope |
|---|---|---|---|---|
| T0 Hauoli, Ruta 1, Lilii, Ruta 2 | 50–55 | 52–55 | Pokémon dominante de Liam (Gumshoos o Raticate de Alola dominante, 56, con aliados) · **Kaudan** (`kaudan_gp`, Lucha, 5 Pokémon, as **57** Crabominable/Hariyama, 2 objetos, **usa Z**) | 56 → **58** con Kaudan |
| T0 Escuela de Entrenadores de Hauoli (zona de entrenamiento) | — | 54–57 | — | tope de zona **57** |
| T1 Kantai, Rutas 4-5-8, Ohana | 53–57 | 55–58 | Nereida (prueba, dominante Araquanid 58) · Kiawe (dominante Salazzle/Marowak de Alola 58) · Rhi opcional (`rhi_6`, as 58) | 58 → **59** tras Kiawe |
| T1 Rancho Ohana (zona de entrenamiento) | 56–58 | 56–58 | — | tope de zona **59** |
| T1 Ruinas de la Vida | — | — | **Mayla** (`mayla_gp`, Roca, 5 Pokémon, as **59** Lycanroc Nocturno o Probopass, 2 objetos, usa Z) | 59 → **60** |
| T2 Paraíso Æther | 55–59 (conservación) | 57–60 | Francine opcional (`francine_1`, Veneno, as 59) · Bastien opcional (`bastien_6`, as 60) · **Fabio** (`fabio_1`, jefe de trama, 5 Pokémon, as **60** Mega-Alakazam, 2 objetos) | 60 → **61** |
| T2 Zona de pruebas de Æther (entrenamiento, Zyra) | — | 58–60 | — | tope de zona **60** |
| T3 Poni, Cañón | 57–61 | 58–61 | **Calder Wynn** (`calder_1`, jefe de trama, 5 Pokémon, as **61**, 2 objetos, Psicostal Z; `lose: 'continue'` con revancha) | 61 → **62** al final |

**Respuestas claras:** Kaudan (Lucha) → Psíquico, Volador, Hada (Ruta 1-2: Pikipek/Trumbeak, Abra, Cutiefly/Ribombee); Lucario aguanta (Acero) y le pega con Psíquico si lo tiene. Mayla (Roca) → Agua, Planta, Lucha, Acero: **Lucario brilla**. Fabio (Psíquico) → Siniestro, Fantasma, Bicho: Zona de conservación con Sableye/Mimikyu salvajes. Calder (Psíquico/Roca/Hada, ver T3) → Acero (Lucario), Siniestro, Agua.

## 2. Decisiones de bloques anteriores que se recogen

| Decisión | Dónde |
|---|---|
| **Lebrun** `b04_lebrun_detenido` / `cebo` / `libre` | T2: **Camille** en la clínica de Æther. *detenido:* su padre «está de viaje por trabajo»; ella sabe que no, y te pide que, si lo ves, le digas que el saque ya le sale. *cebo:* Lebrun la llama todos los días a la misma hora; Handsome escucha las llamadas (le duele). *libre:* le llegó una postal sin sello desde Luminalia. Ninguna rama le cuenta nada a Camille: es una chica de 15 años, y la escena es tierna, no un interrogatorio. T0: Handsome menciona la decisión en una línea. |
| **Trato de Sera** `b01_trato_sera` y `b02_frag_*` | T0: Sera en la recepción (de «tú» con trato; si lo rompió, un directivo y Sera mirando desde lejos). Con `b02_frag_sera`, Sera pregunta si sabes «en uso de qué» está la pieza. |
| **Bastien** `b01_bastien_*` | T2: leal (cubierto) → te pide que leas con él la cláusula; resentido → te la tira encima y luego vuelve. Su decisión (`b05_bastien_rompe` / `b05_bastien_sigue`) depende de lo que le digas **y** de su rama. |
| **Rocket** `b03_rocket_*` | T2: Francine y los Skull; con `b03_rocket_libres`, el jugador ya soltó una vez a una «familia» que trabajaba para quien pagaba: Francine lo sabe («los de Kanto hablan») y eso abre la opción de ofrecer trabajo a los Skull (`b05_skull_taller`). |
| **Renata** `b03_renata_*` / `expedienteolmedo` | T3: llamada de Renata (Proyecto Arco II · Teselia; «el próximo episodio se graba en tu siguiente destino»). Y una frase: «oye, tu Rotom escribe un diario, ¿no? Algún día me lo tienes que leer». |
| **Vencejos** `b03_vencejo_pluma \|\| b04_vencejo_pluma` | T2 o T3: una pluma gris en el barco a Poni; nota de Ysolde (los Vencejos no tienen a nadie en Alola «aún»). |
| **Rancho** `b03_rancho_*`, `p7_rancho_*` | T1: postal o carta de Adela (3.ª aparición en bloque distinto): con negocio, cuentas del mes y una foto de Copito; con Lemnis, «los martes»; con jugador, guiño a la `llaverancho`. |
| **Magda** `b04_magda_perdio`, `notasmagda` | T2: un correo de Magda: «sus cuentas me salieron distintas» (duda; 2.º bloque de Magda). |
| **Prensa** `b01_prensa_*` | T0: Alexia lo recuerda en una línea. |
| **Copito** `b03_copito_contigo`, **Gyarados** | Guiños pequeños si encajan. |

## 3. Hilos que avanza (≥3) y el nuevo

| Hilo | Tramo | Qué pasa |
|---|---|---|
| **Tronco** | T0, T2, T3 | Puerta de Alola. Lemnis compró los datos de ultraumbrales de Æther para **localizar la luz de Necrozma**. **Nodo 04 = Altar del Sol y de la Luna**. El drenaje esta vez se ve en el cielo: Alola se apaga a media tarde. **Hipótesis del Lazo** (biblia §3.2): Kukui y Ciprés notan que Mega y Z «se parecen demasiado» (T0, llamada de Ciprés). |
| **Leilani** (candidata, hilo `b05_t_leilani`) | T0, T1, T2, T3 | Presentación, Ride Gear Universal, la oferta de Lemnis (Calder y Fabio le prometen buscar a su madre si les da los planos), el ultraumbral. Afinidad `af.leilani` (§7). |
| **NUEVO: La que cruzó** (`b05_t_malia`) | T1, T3 | Malia Kahale, la madre de Leilani, ingeniera del CID, cruzó un ultraumbral hace 9 años para cerrar una brecha y no volvió. Calder era su compañero y cerró la brecha **desde este lado** esa noche (para salvar la isla). Carta de Malia (`read`, T1). En el Altar, Leilani ve una señal del otro lado (§5). Se resuelve en un acto alto. |
| **Las jaulas (Noa)** | T2 | Etiquetas «Destino: emplazamiento 04» con la letra de Noa; una nota suya escondida en una jaula (`notanoa04`, `read`): cuenta los Pokémon que no volvieron. **Pista de su pérdida:** «Si un día no contesto, que alguien abra las jaulas. Esta vez lo digo en serio. Ya sé contar». |
| **Dulce veneno (Kaori)** | T2 | Caramelos Lazo en la farmacia de Æther (alguien los repartía «como vitaminas» entre los Pokémon de conservación). El antídoto da otro paso con el método de Æther para tratar el veneno de los ultraentes. Afinidad. |
| **Letra pequeña (Bastien)** | T2 | Su contrato lo manda a Æther «para estudios de vínculo» con su Greninja. Decide (§2). |
| **El topo (Lebrun) → Camille** | T2 | La clínica de Æther; Camille. Gancho: quién pagó la operación (sobre con Ω en el archivo de Æther, sin más). |
| **Casos Fríos (Renata)** | T3 | Llamada: Teselia. Primera semilla de que sospecha del Diario (una sola frase, en broma). |
| **El recetario (Gaspar)** | T1 (opcional) | *Shokugeki* con **Lulú** (capitana, cocinera) en Konikoni o en la Ruta 8: «cocinar con la tierra». Si no da tiempo en T1, queda como profundidad del B5. |
| **La flor eterna (A.Z.)** | T3 | Aparición del Acto IV: playa de Poni al atardecer, con el cielo apagado. |
| **Cabina (Ulises)** | T1 | Cameo: la cabina en una caleta a la que solo se llega con Lapras. El pequeñito «ha soñado con una luz que se apaga». Prepara su misión (B6). |
| **Lucario** | T1 | Segundo sueño de aura (de noche, en el Rancho Ohana): la isla de hierro, el hombre del sombrero dice una sola palabra: «vuelve». {riolu} se despierta mirando al norte. |
| **El remanente Skull** | T2 | Francine y los reclutas: trabajan de seguridad para Æther pagados por Lemnis («a nosotros nadie nos dio becas»). Opción de ofrecerles trabajo en el taller de Leilani (`b05_skull_taller`). |

## 4. Pistas

- **Diario (Eco de Ansel):** la revelación sigue en el **Acto V** (B6). En el B5, dos pistas:
  1. **T0:** Rotom se cuelga al cruzar la Puerta de Alola («bzzt… sincronizando…») y la entrada del Diario de la llegada describe la plaza de Hauoli «con el escenario de la Gira a la izquierda»… cuando el escenario está a la derecha: la describe **como se ve desde la Puerta del otro lado** (desde Azafrán, en la pantalla de control). Sutil.
  2. **T2:** el escáner de Æther identifica la Pokédex como **«Dispositivo de Dirección · Lemnis · acceso total»** y abre la puerta del archivo. El guardia Skull se cuadra. Rotom: «¡Será que soy famoso!». Gladio lo mira dos segundos de más y no dice nada (lo apunta).
  3. **T3 (opcional, si encaja):** en la entrada del Diario del Altar, Rotom empieza «Hoy el sujet…» y se corrige: «¡Hoy mi entrenador{|a|e}…!». **Una sola vez en todo el juego.**
  - **Omisiones:** el Diario no menciona a Calder, ni el archivo de Æther, ni la decisión del Altar («hicimos una cosa muy importante con una luz»).
- **Ansel:** una escena en el Paraíso Æther (T2), «de visita técnica», con caramelo de menta en papel azul. {riolu} no lo acepta (como en el B4). Le dice al jugador algo amable sobre Gladio («los hijos que heredan una casa con goteras»).
- **Pérdidas (biblia §9.2):** Noa (T2, la nota). **Lucario:** segundo sueño (T1). **A.Z.** (T3).
- **Hipótesis del Lazo:** Kukui (T0) y Ciprés (llamada, T0): «la Pulsera Z y la Piedra Llave hacen lo mismo con distinto acento». Calder (T3) lo dice como certeza: «es la misma luz».

## 5. La gran decisión (T3): a quién devuelves la luz

En el Altar, tras vencer a Calder, el condensador del Nodo 04 guarda la luz robada a Necrozma (una esfera que quema la vista). Si se rompe sin más, la luz se pierde y Necrozma se apaga. Hay tres manos tendidas:

- **A Necrozma** (`b05_luz_necrozma`): {riolu} y tú la guiáis de vuelta. Necrozma recupera su forma, ruge, el cielo de Alola vuelve de golpe… y se va por un ultraumbral sin mirar atrás. No está agradecido; está entero. Leilani pierde la única energía que habría abierto su ventana. (`rep.alola +10`, `af.leilani −3`: lo entiende, pero le duele.) Volverá en el Acto IX, contra el Lazo.
- **A Æther** (`b05_luz_aether`): Gladio propone custodiarla y devolvérsela a Necrozma poco a poco, con médicos de verdad. Necrozma queda dormido en el Altar, bajo vigilancia de Æther. El cielo vuelve despacio (días). Kaori recibe una muestra (el antídoto avanza más en el B6). Riesgo futuro: Æther ya guardó cosas que no debía (Samina). (`rep.alola +3`, `rep.lemnis −5`.)
- **A Leilani** (`b05_luz_leilani`): ella la usa con el Ride Gear para abrir el ultraumbral **un minuto**: al otro lado, en un desierto blanco, una baliza de mano parpadea con la cadencia que su madre le enseñó de niña. **Está viva.** La luz se gasta; Necrozma se queda débil, en el Altar, y Hela lo cuidará. El cielo vuelve en semanas. (`af.leilani +10`, `rep.alola −5`.)

Sin respuesta correcta. Las tres dejan a Necrozma vivo. Calder, en todas, se queda mirando el ultraumbral: él cerró el de Malia (la verdad sale en T3, con la carta de T1 como pista: «si alguien cierra la puerta, que sea Calder; él sabrá por qué»).

## 6. Referencias escondidas (como mucho una evidente por misión)

- **Leilani** (*Percy Jackson*, Leo Valdez): mecánica que bromea para no hablar de su madre, un cinturón de herramientas del que saca cosas que no caben, «el que sobra». Sutil (ya está en su diseño).
- **Kaudan y Kiyo** (T0): dos viejos maestros discutiendo quién come más malasadas. Sin referencia externa.
- **Liam** (T0): canon (la prueba de la Cueva Sotobosque).
- **Lulú vs. Gaspar** (T1, opcional): *Food Wars* (*shokugeki*; «¡Oh, ese sabor!» sin ropa que vuela). **Evidente** en esa misión.
- **Taller de Leilani:** *Portal* (un robot de soldar que habla en tono pasivo-agresivo: «Excelente trabajo. Para ser humana»). Sutil.
- **Æther** (T2): *BioShock* («¿quiere usted…?» en la megafonía de bienvenida). Sutil.
- **Calder** (T3): sin referencia externa. Su frase: «La luz es de quien la mira».
- **Rhi** (T1): jerga de fútbol (ya establecida).

## 7. Leilani: afinidad (`af.leilani`, 0–100)

- **+** confiar en un invento aunque pueda explotar (subirte al prototipo, +5), reírte de sus chistes malos (+1), elogiar algo que construyó (+2), defenderla cuando Lemnis la trata como proveedora (+5), escoger `b05_luz_leilani` (+10).
- **−** decirle que se ponga a salvo y deje el trabajo a otros (−3), burlarte de la tecnología (−3), tratarla como «la que sobra» (−5).
- Meta al final del B5: 20–35 (amiga) si el jugador la trata bien. **Momento:** ninguno de corazón aún (la lámpara rota es del final de su arco).

## 8. Colección, minijuegos y objetos

- **Iniciales de Alola** (`b05_s_iniciales`, con `parts`): **Litten** (T0, Kukui), **Popplio** (T1, Nereida: un Popplio que no se atreve a hacer burbujas grandes), **Rowlet** (T3, Hela: duerme en el tejado de su casa y no hay quien lo baje). Nivel bajo su evolución. Mario elige siempre fuego, pero quiere los tres. Comprobar `owns()` de cada línea antes de regalar.
- **Especial:** **Código Cero** (Type: Null), de Gladio (T2), con escena. Comprobar `owns("typenull") || owns("silvally")`.
- **Megapiedra con historia:** **Tyranitarita** (T1, misión `b05_s_tyranitarita` con Mayla, joyera además de kahuna: tallar la piedra con la presión del Pupitar/Tyranitar de Mario). Mario tiene un **Pupitar** (nv 51; evoluciona al 55). `cond` de la misión: `owns("larvitar") || owns("pupitar") || owns("tyranitar")`; si no, Mayla la guarda «para cuando tengas a quién dársela».
- **Montura:** **Lapras** (T1), con el **Ride Gear Universal** (`ridegear`, objeto clave con cinemática; `flag.mount_lapras`, sin tocar `vars.mount`). Abre agua: una caleta de la Ruta 8 (Ulises), un atajo de la Ruta 5 a Konikoni y, en el B6+, mares de otras regiones. Leilani dice que el Ride Gear también hace que tu Rhyhorn «responda en cualquier región».
- **Cristales Z** (de las pruebas): Normastal Z (Liam), Lizastal Z (Kaudan), Hidrostal Z (Nereida), Pirostal Z (Kiawe), Litostal Z (Mayla), Geostal Z (Hela, opcional en T3).
- **Megas ajenas a la vista (≥2):** Fabio (Mega-Alakazam, T2, jefe) y una opcional en T1 (una turista del Paseo o un entrenador de Kantai con **Mega-Altaria**). **Tera (≥1):** un salvaje de Fisura teracristalizado en la Ruta 2 o la Ruta 5. **Z enemigas:** kahunas y Calder, solo tras recibir la Pulsera Z.
- **Minijuegos (≥4 sitios nuevos):** T0 pesca diaria en el Paseo Marítimo de Hauoli (`fish`, tema `mar`) y puzle de rejilla en la prueba de Liam; T1 excavación en el Área Volcánica del Wela (`dig`, `cueva`) y cosecha en el huerto del Rancho Ohana (`catch`, `huerto`); T2 cerradura del archivo de Æther (`lock`, escena única con premio especial: el informe); T3 rastreo en el Cañón de Poni con {riolu} (`aura`, `ruina`, escena única con premio especial).
- **`gather`** en cada ruta y cueva; **`read`**: carta de Malia (T1), nota de Noa (T2), informe de Æther (T2), postal de Adela (T1), correo de Magda (T2), diario de Calder (T3). **`art`**: «Lapras al atardecer» (T1) y «El Altar con la luz» (T3).
- **Zonas de entrenamiento con premio:** Escuela de Entrenadores de Hauoli (tope 57, premio MT temática Normal/Lucha), Rancho Ohana (tope 59, premio **MT Fuerza Equina** (`highhorsepower`), temática de los Mudsdale del rancho; no repetir MT de `p7_mt_*`), Zona de pruebas de Æther (tope 60, premio **Scizorita** o **Gengarita**: Mario tiene Scizor y Gengar; comprobar que no exista ya con `grep -rn "ite'" app/content`).

## 9. Personajes

- **Canon nuevos:** Prof. Kukui (`kukui`), Kaudan (`kaudan`), Liam (`liam`), Nereida (`nereida`), Kiawe (`kiawe`), Mayla (`mayla`), Hela (`hela`), Gladio (`gladio`), Zyra (`zyra`), Fabio (`fabio`), Francine (`francine`), Prof. Pimpinela (`pimpinela`), Lulú (`lulu`, opcional). **Necrozma, Tapu Koko** (Pokémon, sin npc).
- **Candidata:** **Leilani Kahale** (`leilani`).
- **OC nuevos:** **Dr. Calder Wynn** (`calder`, 54), director del Programa Ultra de Lemnis, ex del CID, compañero de Malia. Astrónomo, voz suave, metáforas de luz y de distancia, un poco poeta, nunca cruel; cree que Necrozma «acapara» la luz que necesitan millones. Culpa: cerró el ultraumbral de Malia. Gafas de montura fina, barba corta canosa, chaqueta de lino clara con la insignia de Lemnis, un telescopio plegable al hombro. **Tres apariciones en el B5** (T0 charla del cielo, T2 laboratorio de Æther con Fabio, T3 jefe). **Camille Lebrun** (`camille`, 15; solo T2 en el B5; volverá).
- **Vuelven** (los que llevan tiempo): Sera, Alexia, Handsome, Kiyo (3.º bloque), Ramiro y Elm (3.º bloque: Ramiro le trae a Kukui un huevo de parte de Elm, T0), Ciprés (llamada, T0), Misty (2.º bloque, T1), Bill (llamada sobre el Ride Gear, T1), Adela (postal, T1), Philippe (vende «villas con vistas al volcán» en Kantai, T1, 3.º bloque), Rhi (T1), Gaspar (T1, opcional), Ulises (T1), Kaori (T2), Noa (T2, por la nota y quizá un mensaje), Bastien (T2), Ansel (T2), Xero (T2), Rouxel (T2: ahora hace relaciones públicas para Æther, caído y sin brillo; 3.º bloque), Magda (correo, T2), Renata (llamada, T3), Ysolde (nota, T2/T3), A.Z. (T3).

## 10. Negocio del bloque (T5, lo escribe la sesión que termine el bloque)

**Taller Kahale** (`b05_taller`, en `taller_kahale`, Kantai), socia **Leilani**. Aparece con `flag.b05_ridegear`. Líneas: reparaciones (dinero), piezas (Revestimiento Metálico, Mejora, Electrizador, Magmatizador… fracciones), monturas (objetos de viaje, Repelentes, Más PP) y una bloqueada «Inventos» (objeto raro al azar, 0,1/día). Encargados: Leilani; los **Skull** si `b05_skull_taller`; **Kiawe** (`cond: flag.b05_kiawe_hecha`, mejora la forja). Imprevistos con la voz de Leilani (cosas que explotan, Togedemaru que se come un cable, Lemnis que vuelve a ofrecer dinero). Economía según `docs/CONTENIDO.md` §13.

## 11. Contratos

Ver `b05-encargo.md`.
