# Bloque 7 · avance por paquetes

Rama: `trabajo/b07` (se fusiona en `main` solo en el paso 6). Cada sesión hace el siguiente paso pendiente, lo marca aquí con fecha y tokens, hace commit y push.

| Paso | Qué | Estado |
|---|---|---|
| 1 | Plan, encargo y estructura (`b07-plan.md`, `b07-encargo.md`, comunes de `app/content/b07/`, stubs t0–t5) | **hecho** (2026-10-30, sesión de día) |
| 2 | Tramos T0 y T1 | **hecho** (2026-10-30, sesión de día) |
| 3 | Tramos T2 y T3 | **hecho** (2026-10-30, sesión de día) |
| 4 | Tramos T4 y T5 | **hecho** (2026-10-30, sesión de día) |
| 5 | Integración, arte, museo, balance y 24 recorridos hasta `b07_fin` | **hecho** (2026-10-30, sesión de noche) |
| 6 | Revisión ligera, auditoría y publicación | pendiente |

## Notas por paso

### Paso 1 · 2026-10-30 · hecho

Tokens: subagente de plan ≈ 499 k (134 herramientas, 2 h 17 min).

**Resumen sin spoilers (lo puede leer Mario):** el Bloque 7 ya tiene plan, encargo y estructura. Será una región nueva, unas 15 horas en seis tramos, con dos medallas, una mecánica nueva, tres iniciales, un negocio nuevo y las tres ideas de ChatGPT aprobadas (dos como secundarias grandes y opcionales y una dentro de la historia principal). Ya están escritos los personajes nuevos, las misiones, las tiendas, las medallas, el negocio y tres cartas del Buzón para personajes que tocaba volver a ver. El bloque carga y valida sin errores, pero todavía no se puede jugar.

**Para el paso 2 (T0 y T1):**
- Lee `b07-plan.md` y `b07-encargo.md` enteros; las secciones «T0» y «T1» del encargo son tu guion. La Liga de los Siete Oficios va **dentro** de `t1-piston.js` (no tiene archivo propio).
- Validar: `INFINITO_EXTRA=b07 node herramientas/validar.mjs`. Los avisos `[b07] … pendiente` que imprime `index.js` (vuelos, `parts.where`, `challenges.trainer`, `venture.loc`) son normales hasta que existan los lugares y entrenadores de los tramos; los de T0 y T1 deben desaparecer al terminar el paso 2.
- El enganche `b07_inicio` ya está en `comun.js`; T0 escribe el cruce (`b07_cruce`) y los `patches` de las Puertas viejas.
- **Cada `diary` va tres veces** (rama del Eco): constantes en el encargo.
- Ids de objetos que vayan al Buzón, sin guiones bajos (`mail.item` se busca tal cual).
- Pendiente para el paso 5 (motor): Dinamax solo en Galar o en Fisura, comando para dar el factor Gigamax (Sopa Maxi), comprobar que los rivales usan `gmax`. Decisiones tomadas sin Mario: plan §14.

### Paso 2 · 2026-10-30 · hecho

Tokens: T0 ≈ 394 k, T1 ≈ 489 k (total ≈ 883 k).

- T0 (~2 h) y T1 (~2 h 15 + Oficios ~1 h 30) escritos; bot llega a `b07_t1_hecho` sin errores.
- Errores de validador restantes: vuelos de `comun.js` y trenes de T1 hacia lugares de T2–T5 (se van solos).
- Ids: la zona de entrenamiento de T1 es `nido_galar_1…3` (los `nido_1…3` ya existían en el B6); encargo corregido.
- Misión nueva de T0: `b07_m_maxi`. T1 no creó `pabellon_piston` (Camille es spot de `piston`).
- Para el paso 5 (arte): `paraguassobble`, `hieloaxew`, `cintaep3`. Gigamax: `b07_sopa_pedir` (enganche con el fogón de Naboru). Dinamax del jugador aún funciona fuera de Galar.

### Paso 3 · 2026-10-30 · hecho

Tokens: T2 ≈ 454 k, T3 ≈ 433 k (total ≈ 887 k).

- T2 (Casa de las Siete Puertas, opcional) y T3 escritos; el bot llega a `b07_t2_hecho` y `b07_t3_hecho` en las semillas que alcanzan Galar (la 5 se atasca en el B6, Esmalte, no en el B7).
- Ids: zona de entrenamiento de T3 es `terraza_hoy_1…3` (las `terraza_1…3` ya existían); encargo corregido.
- Para el paso 5:
  - `herramientas/test/casos-test.mjs`: la comprobación «llegan por el Buzón» debe limitarse a los casos `det_c*` (`b07_casa` no es de esa serie).
  - `misiones.js`: añadir `tramo: 2` a la parte «La excursionista».
  - Español de España que chirría en comunes y T0: «Vale» en `b07_inicio`, «chaval» en `gal_ruta2`, «ordenador» en `lab_sonia`, «Cogió» en `cartakalenab07`.
  - Motor: comprobar Dinamax/Gigamax de `rhi_7` (Cinderace) y `percy_g` (Eldegoss).
  - Arte: `fotoestadiohoyuelo` (art `estadio_noche`), `fotogrupocasa` (art `casa_ocho`), `clavobota`, `cuentovane`, `setaluminosa`.
  - Museo: flags de la Casa `b07_casa_devuelve` / `_lectura` / `_quintana` / `_fallido`.
- Para T4: el objeto `setaluminosa` ya existe (T2) para la reparación de Kaori.

### Paso 4 · 2026-10-30 · hecho

Tokens: T4 ≈ 466 k, T5 ≈ 589 k (total ≈ 1 055 k).

- T4 y T5 escritos; el bot llega a `b07_t4_hecho` (6/6) y a `b07_fin` (5/5 en la última ronda). 0 errores de validador, sin avisos `pendiente`.
- Para el paso 5:
  - **Balance:** Roy (`roy_g`) y Olivia (`olivia_1`) son muro en algunas semillas (hasta ×18 y ×14 derrotas con equipos flojos del bot). Ya suavizados (Roy 67–68 as 72; Olivia 67–69 as 73). Revisar con los 24 recorridos y que el bot use Dinamax.
  - `hub.mjs` se colgó (>10 min) en T1, T4 y T5: hacerlo funcionar.
  - `misiones.js`: `b07_m4` parte «Escuchar desde dentro» con `got: 'flag.b07_personal_media'`; etapa `planta` de `b07_t_bastien` con texto neutro (no «por contrato»).
  - Superfan: Sandaconda en gimnasio Dragón (a propósito, equipo canon de Roy).
  - Arte T4: `librotorneo`, `contratohorizonte`, `sobrenoa`, `cuadernokaori`, `frascokaori`/`muestralazo`, `lolarecetaverdad`. Arte T5: `insignianoa`, `expedientedufresne`, `notanoa`, `informeoctavia`.
  - Museo T4: libro (`b07_libro_policia`/`_prensa`/`_octavia`), Lola (`b07_lola_testigo`/`_crampon`/`_vuelve`), `b07_torneo_ganado`, `b07_xero_detenido`/`_escapa`. Museo T5: Noa (`b07_noa_adios`, `b07_bastien_llega`/`_tarde`), Octavia (`b07_octavia_dentro`/`_publica`/`_testigo`, `b07_doble_delata_octavia`).

### Paso 5 · 2026-10-30 · hecho

Tokens: no medidos en esta sesión (una sola sesión, sin subagentes).

**Resumen sin spoilers (lo puede leer Mario):** el Bloque 7 ya está integrado: los seis tramos encajan entre sí, el Dinamax funciona solo donde debe, hay una receta nueva para el factor Gigamax, arte para los objetos clave nuevos y tres fotos, una sala nueva en el museo del ático y la curva de dificultad ajustada. El bot llega al final del bloque en 22 de 24 partidas sin errores (las dos que no llegan se atascan antes, en el bloque anterior). Todavía no se puede jugar en el móvil: falta la revisión final y la publicación.

**Hecho:**
- Coherencia: flags y etapas entre tramos (sin flags leídos que nadie active), trenes y vuelos, `tramo: 2` en «La excursionista», `got` en «Escuchar desde dentro», etapa `planta` de Bastien neutra; formas de España en comunes, T0 y museo (Vale, tío, chaval, ordenador, Cogió, coger).
- Motor: `dynamaxAllowed` (Galar, `fisura: true` o salvaje de Fisura), comando `{ gmax }` con `canTakeGmax`, enganchado en `b07_sopa_pedir` (fogón de Naboru: `b07_oficio_calderas` o `b07_percy_vencido`; 1 Maxiseta). Prueba en `battle-test.mjs`: Rhi, Percy, Roy, Olivia, `torneo_r3` y el Drednaw de T0 dinamaxizan; los `gmax: true` gigamaxizan. Documentado en `docs/CONTENIDO.md`.
- Herramientas: `casos-test.mjs` (Buzón solo para `det_c*`); hub: el «cuelgue» era lentitud (cada condición reconstruía su ámbito entero y las copias del hub llevaban las cajas completas). `scope()` de `state.js` ahora se construye una vez por partida y lee en vivo; el hub copia las cajas en ligero. `hub.mjs` con el B7: **10 min, 0 graves, 0 avisos, 707 puntos** (las dos semillas llegan a Galar). Bot: usa el Dinamax contra el as de los jefes (con cabeza); `DERROTAS_TODAS=1` y `LOG_TRAINER=id` para depurar.
- Arte: 20 objetos clave en `PX_ITEMS` (+ alias `muestralazo`) y fotos `estadio_noche`, `casa_ocho`, `mudsdale_abrevadero` en `acuarela.js` (revisadas en Chromium; los dos módulos se importan sin error).
- Museo: `app/content/b07/t6-museo.js` (patrón del B6, no `b05/t7-museo.js`, para que el B7 vaya entero en su carpeta): sala de Galar (etiqueta, broche, llave) y el estribo en la sala de Alola.
- Apariciones: Celia y don Teodoro escriben en la carta de Inés (su aparición del B7). El validador no lista NPCs con menos de 3 escenas.
- Balance (24 recorridos, `balance.md`): 22/24 a `b07_fin`, 0 errores. Roy 0,92 · Olivia 1,38 · final del torneo 0,92 · Rhi 2,83 (revancha opcional que el bot repite).
- Pruebas con el B7 cargado: validar (0 errores), superfan (0 graves), tester (0), cine, minijuegos, carreras, casos, negocios, battle, hub, ático, historias, correo, cartas: todo bien. Informes de `secreto/auditorias/` restaurados.
- Documentos: `registro.md` (sección del B7), `hilos.md` (estado tras el B7), `referencias.md`, `balance.md`.

**Para el paso 6 (revisión ligera y publicación):**
- Añadir `b07` a `BLOCKS` (quitar `INFINITO_EXTRA` de los comandos), subir `CONTENT_VERSION`, `build-sw.mjs`, auditoría completa (`auditar.mjs`), prueba de humo y `ux.py` con el B7 en `BLOCKS` (mirar las capturas de las fotos y los iconos nuevos).
- Lector independiente (CLAUDE.md §3.2) sobre todo el B7. Revisar en especial: la insignia de hojalata (en la rama `b05_bastien_sigue` Bastien ya mandó una al museo en el B5: ¿es otra?, que se diga); las voces de Octavia y Olivia; las tres ramas del Diario.
- Rhi 2,83 de media (revancha infinita): decidir si la revancha queda en una por día o se deja.
- Las semillas 5 (día) y 7 (noche) se atascan en el B6 (Dragospiral/Esmalte y Fayenza): conocidas, no son del B7.
- `progreso.md`: tachar Meganiumita y el Gigamax (Sopa Maxi) en «Mecánica especial asegurada»; añadir «Regiones por completar · Galar» (plan §14.2).
