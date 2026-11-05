# Pokémon Infinite · Auditoría de «La carga que nadie firmó»
**Fecha:** 2026-11-05  
**Rama:** `chatgpt/carga-johto-2026-11-05`  
**Estado editorial:** NO PUBLICAR hasta cerrar auditoría integral, revisión de duración y aprobación independiente.

## Método real utilizado
Se aplicaron herramientas existentes del repositorio de Elio, sin editar `main` ni publicar `app/`:
- `herramientas/validar.mjs` (contenido, IDs, objetos, comandos, condiciones).
- `herramientas/tester.mjs` (interrupciones de escenas y combates).
- `herramientas/superfan.mjs` (datos canónicos).
- `herramientas/disenador.mjs` (Diario y misión).
- `herramientas/auditar.mjs --rapida` (regresión del recorrido principal con propuesta cargada).
- Prueba guiada adicional `propuestas/chatgpt/auditar-carga-johto.mjs` basada en `app/js/guion.js` y `app/js/state.js` originales (no es un sustituto de la prueba humana).
- Auditoría integral separada por GitHub Actions con `humo.py` y `ux.py`, sobre un montaje temporal de los archivos.

## Resultados confirmados
- **Validador:** cero errores. Cuatro advertencias preexistentes de movimientos de un Pokémon de otro bloque; ninguna corresponde a esta misión.
- **Game Tester:** 0 graves, 0 detalles, 0 curiosidades.
- **Superfan:** 0 graves, 3 detalles, 9 curiosidades.
- **Game Designer:** primero 0 graves, 5 detalles, 6 curiosidades; tras correcciones 0 graves, 3 detalles y 6 curiosidades. Se corrigieron: etapa «orden» sin marcar en Diario y falta de `parts` para las primeras pruebas. Los tres avisos restantes corresponden al módulo temporal de prueba presentado como bloque principal (sin milestone, arte de colección ni recolección de rutas nuevas). No suponer por eso que todos los problemas editoriales quedaron resueltos.
- **Prueba guiada:** los ocho tramos se atraviesan en 39 acciones verificadas; misión termina, premios se dan una vez, victoria/derrota del combate opcional continúan la misión; tope 62 permanece en 62 y 74 pasa a 76 cuando corresponde.
- **Regresión de la historia publicada:** auditoría rápida con cuatro semillas hasta `b07_fin` pasó con el paquete cargado. Reportó tres atascos del bot por revisar; no se certifica que sean nuevos ni se alteró el balance principal.

## Por qué la primera auditoría rápida marcaba 0/2
El ensayo inicial pidió al bot general terminar en `cg_carga_t7_fin`, el final de una **misión opcional**. Ese bot no la inicia por sí mismo durante el recorrido de la trama principal. Su veredicto «0/2, NO PUBLICAR» era un **bloqueo de la prueba mal configurada**, no evidencia de que los guiones opcionales fueran intransitables. Se separaron dos comprobaciones: recorrido publicado de B7 + una partida guiada específica del episodio. Ambas pruebas técnicas finalizaron satisfactoriamente.

## Bloqueadores editoriales que siguen
1. **Duración 6–8 h sin verificar y probablemente insuficiente:** hay aproximadamente **6,228 palabras entre diálogos y opciones, incluyendo ramas alternativas**. No equivale a seis horas; un lector no consume todas las alternativas. El episodio necesita ampliación con actividades reales, no rellenar el campo `est`.
2. No se ha hecho una **partida humana cronometrada** de 6–8 horas.
3. La estructura actual concentra muchos tramos en «examinar tres pistas → elegir deducción». Hace falta variar con retos jugables, desplazamientos con decisiones, minijuegos/rompecabezas y combates opcionales bien equilibrados, sin sacrificar el misterio.
4. **Lector independiente/editorial de Elio** no ejecutado aquí. Las pruebas técnicas no sustituyen el control de voz, giros, continuidad y ramas.
5. La **auditoría integral con navegación móvil** se ejecuta de forma separada; su estado y veredicto tienen que consultarse en la ejecución registrada abajo antes de publicarlo.

## Ejecuciones verificables
- [Ensayo inicial con bot opcional (bloqueo de cobertura)](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42112757514)
- [Prueba guiada aprobada + diagnóstico de ruta opcional](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42113270786)
- [Prueba guiada + rápida del B7 aprobadas](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42113567647)
- [Pasada tras arreglo de etapas y pistas](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42113882607)
- [Auditoría integral de Elio, con humo y UX](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42114097886)

## Política de integración
Mantener esta historia fuera de `app/content/comunidad/lista.js` y fuera de `main`. Los módulos de `propuestas/chatgpt/misiones/` son propuestas a revisar por Elio. Solo integrar tras los bloqueadores resueltos y actualización del reporte maestro de Gaston.


## Incremento 1 · Anexo de Trigal (2026-11-05)
**Estado:** implementación en propuesta y auditoría rápida **aprobada**, sin publicar.
- Nuevo archivo: `misiones/cg-carga-johto-ampliacion-t1.js`.
- Se agregó al paquete combinado como módulo aditivo. Contiene **1 subárea explorable**, **1 NPC propio**, **1 entrenador de práctica**, **8 guiones** y **1 puzle táctil de 8 pasos mínimos**. La inspección del desvío ahora es necesaria antes de completar la cronología de Trigal.
- Se ampliaron las pruebas de integración de 39 a **46 acciones**, con verificaciones explícitas del reintento del puzle, de la derrota y recuperación en el entrenamiento y de las recompensas del episodio.
- **GitHub Actions:** [auditoría rápida exitosa del incremento](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42116652477). Validador sin errores, Game Tester 0 graves, Superfan 0 graves, Game Designer 0 graves, auditoría rápida de B7 aprobada. El validador resuelve el puzle nuevo en 8 pasos.
- Se detectó y corrigió una coma faltante durante la primera ejecución: se atendió el fallo antes de considerar aprobada la ampliación.
- Corpus contabilizado (todas las alternativas, NO lectura real): **~7571 palabras** frente a **~6228** antes del incremento.
- **Pendiente:** ampliar los siguientes tramos, comprobar duración real de 6–8 horas y repetir auditoría integral con todos los incrementos. La [auditoría integral anterior](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42114097886) aprobó la versión previa, **no incluye esta ampliación**.


## Incremento 2 · Gabinete de copias de Iris (2026-11-05)
**Estado:** implementado y validado en auditoría rápida, pero NO PUBLICADO.
- Nuevo módulo `misiones/cg-carga-johto-ampliacion-t2.js` integrado de forma aditiva en `cg-carga-johto-completo.js`. Contiene **1 subárea explorable**, **1 NPC (Alda)**, **2 objetos de lectura**, **9 guiones** y **1 minijuego de cerradura/memoria** de nivel 2 sin consumo de recursos de pago.
- El jugador compara el papel a contraluz, distingue las tintas, realiza un ensayo de humedad en una hoja de prueba, contrasta las fuentes y redacta un acta que identifica tanto lo sabido como lo no demostrable.
- El minijuego no bloquea: se puede abandonar, perder y reintentar, o pedir la apertura supervisada del cajón. El calco solo puede obtenerse una vez y releerlo no duplica objetos.
- El cotejo final de Iris exige haber terminado el gabinete. La misión principal, las medallas, las regiones y los flags narrativos previos no se modificaron.
- **Auditoría real:** [GitHub Actions · ejecución 42118247947](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42118247947) **EXITOSA**: `validar.mjs` sin errores; Game Tester, Superfan y Game Designer con **0 graves**; prueba guiada T0–T7 en **54 acciones**; ruta con cajón ganado, salida, derrota + reintento y apertura supervisada; auditoría rápida B7 aprobada. El validador reconoce **103 minijuegos**, uno más que antes.
- Corpus de la propuesta ahora aproximadamente **8,964 palabras contando todas las alternativas**, un aumento desde ~7,571. No representa tiempo jugado.
- Un primer intento con el nuevo gabinete falló porque la prueba guiada antigua todavía no hacía el cotejo. Otro reveló que el test buscaba un objeto sin normalizar su id con `toID`. Ambos problemas **se corrigieron**, y la nueva corrida aprobada es la que cuenta.
- **Sigue pendiente:** ampliar los demás tramos, revisar voces/continuidad con lector independiente, comprobar 6–8 horas de juego real y repetir auditoría integral sobre el estado final. No confundir la aprobación técnica rápida con aprobación editorial.


## Incremento 3 · Pasarela y caseta de Caoba (2026-11-05)
**Estado:** implementado en rama aislada; pruebas de Elio y auditoría rápida **APROBADAS**. **NO PUBLICAR**.
- Módulo aditivo nuevo: `misiones/cg-carga-johto-ampliacion-t3.js`. Agrega **2 subáreas** (pasarela de estacas, caseta de aforo), **1 NPC original** (Ina), **2 objetos de lectura**, **1 entrenador de práctica Pokémon opcional**, **1 minijuego de pesca de recuperación** y **11 guiones**. Integrado al paquete compuesto; ninguna región nueva, medallas, o estado de personajes principales modificado.
- Investigación jugable: medir dos niveles de agua, cotejar sedimentos y cordeles, rescatar una anilla desde tierra firme, leer las tareas de mantenimiento, reproducir el caudal en un ensayo seguro y redactar un informe ambiental antes de auxiliar a Wooper. La anilla está identificada como pieza de aforo, no prueba de una caja robada.
- El rescate ofrece pesca táctil con salida/derrota/reintentos y **pértiga asistida** que no exige minijuego. La entrega del objeto está protegida contra duplicaciones. El combate amistoso permite victoria, derrota y omisión con curación antes de combatir. El final de Wooper se bloquea hasta completar el informe; nunca se fuerza captura ni se abre una nueva zona del mapa.
- **GitHub Actions:** [auditoría rápida y prueba guiada aprobadas, 42120001145](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42120001145). Validador **sin errores**; Tester **0 graves/0 detalles**; Superfan **0 graves**; Designer **0 graves**; **65 acciones** de T0–T7 verificadas; auditoría rápida de la historia publicada aprobada. A raíz de un error de sintaxis detectado en un intento intermedio, se corrigió una coma de la etapa «Caoba» y se repitió la prueba íntegra hasta éxito.
- Corpus acumulado de diálogos y opciones: **aproximadamente 10,789 palabras con ramas mutuamente excluyentes** (anterior ~8,964). No prueba una duración concreta.
- **Pendientes:** ampliar T4–T7 sin repetir mecánicas, cronometraje humano para 6–8 h, revisión narrativa independiente y auditoría integral completa de la versión final (la ejecución integral anterior precede a T1–T3). Los avisos históricos del validador, Superfan y Designer no certifican la corrección editorial por sí solos.


## Incremento 4 · Ensayo logístico con dos rutas, Caoba (2026-11-05)
**Estado:** versión de propuesta validada en auditoría rápida; **NO PUBLICAR**.
- Módulo aditivo nuevo `misiones/cg-carga-johto-ampliacion-t4.js` conectado en `cg-carga-johto-completo.js`. Añade **2 subáreas de Caoba**, **1 NPC local, Nelo**, **1 acta de lectura** y **9 guiones** sin crear regiones, medallas, combates obligatorios ni efectos sobre los bloques publicados.
- Mecánica distintiva: ruta **pasarela húmeda** (requiere funda) frente a **bordo de grava** (requiere correas). Se decide la ruta, la protección, el asiento de carga, el control del recorrido, la entrega documental y la recepción física. Los errores dejan incidencias en la bitácora y permiten rehacer la operación sin castigar la misión. El contraste final requiere distinguir el acuse de papeles del recibo de una caja. No se simula un transporte real entre ciudades ni se inventan tiempos de espera.
- Los guiones originales T4 ahora exigen completar el recorrido de ensayo antes de cerrar el tramo. El objeto `cg_carga_t4_acta_ensayo` se entrega **una sola vez**; releerlo no da recompensas.
- **Auditoría aprobada**: [GitHub Actions 42123540729](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42123540729). Validador sin errores; Game Tester **0 graves, 0 detalles**; Superfan **0 graves**; Designer **0 graves**; prueba guiada de T0–T7 ampliada a **73 acciones**, incluyendo ambas rutas, protección equivocada con corrección, registro anticipado corregido, no-duplicación del acta y tope 74→76 condicionado; auditoría rápida de B7 aprobada.
- Los primeros intentos detectaron una coma ausente en la etapa del Diario y una elección cuyas tres opciones tenían la misma condición. Se corrigieron y se repitieron las herramientas de Elio; la ejecución **aprobada y pertinente** es 42123540729.
- Corpus total aproximado **12,586 palabras con ramas excluyentes** (antes ~10,789). No es una medición de horas jugadas, y la meta de **6–8 h continúa sin demostrarse**.
- **Pendiente**: ampliar T0 y T5–T7, evaluación independiente de voces/continuidad, prueba humana cronometrada y auditoría integral sobre la versión final. La auditoría integral anterior no incluye los incrementos T1–T4.


## Incremento 5 · El segundo turno de Olivo (2026-11-05)
**Estado:** ampliación implementada en rama de propuesta y auditoría rápida **APROBADA**; **NO PUBLICAR**.
- Archivo nuevo: `misiones/cg-carga-johto-ampliacion-t5.js`, integrado de forma aditiva en `cg-carga-johto-completo.js`. Añade **2 subáreas** dentro de Olivo (muelle y entreplanta), **1 NPC** (Isela), **2 documentos/objetos clave** (llave de consulta, pliego de turno), **1 puzle de rejilla** y **11 guiones**.
- Mecánica de juego: permiso de custodia, huellas de giro del carrito, cotejo de señales de relevo y pizarra, maniobra táctil de palés, obtención controlada de una llave de consulta y un pliego, falsa pista («SALIDA 18», que se explica por una señal de emergencia), reconstrucción de hechos y dos estrategias de entrevista con el encargado.
- El segundo turno es una **reconstrucción ficticia de las 23:10** accesible a cualquier hora real. La llave solo permite consultar copias, no mercancías privadas. Se conserva la opción de dialogar sin combatir; derrotar al encargado no determina la verdad ni bloquea la historia.
- El guion original del encargado ahora exige el informe del muelle y la elección de una forma de presentación; la conversación y su cierre reconocen la elección («primero documento» o «primero testimonio») sin tocar personajes de la gira ni la recompensa del episodio.
- **Evidencia de auditoría:** [GitHub Actions 42126640002](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42126640002) **EXITOSA**: validador sin errores, Game Tester **0 graves/0 detalles**, Superfan **0 graves**, Game Designer **0 graves**, regresión rápida B7 aprobada, prueba guiada T0–T7 ahora **84 acciones**. El nuevo puzle `cg_carga_t5_corredor_pales` tiene solución de **10 pasos** comprobada por el validador.
- Pruebas específicas T5: no es posible cerrar la entrevista sin investigación; se puede salir del puzle y retomarlo; llave y pliego no se duplican; la falsa pista se puede refutar; las dos formas de presentar evidencia preservan las decisiones; no cambian las medallas ni el tope condicionado 74→76.
- Corpus de texto y opciones del paquete: **~14,240 palabras contando ramas alternativas** (antes ~12,586). Esto NO demuestra 6–8 horas de partida.
- **Pendiente:** ampliar T6 y T7, reforzar T0, revisión narrativa independiente, cronometraje de juego y auditoría integral final actualizada. La auditoría integral anterior precede a estas ampliaciones.
