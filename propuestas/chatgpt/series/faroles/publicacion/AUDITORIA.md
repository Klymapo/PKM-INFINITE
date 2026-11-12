# Validación de publicación · 2026-11-12

Versión: 2026-11-12.1. PR de adopción: #16. Revisión del runtime: 2d33e6a9ef25d09f44767f771fe1190693df497e. Después solo se incorporó el SW oficial generado, sin volver a cambiar el contenido o el motor.

## Resultados comprobados

- CI final https://github.com/Klymapo/PKM-INFINITE/actions/runs/43307528725: integración y auditoría completa concluyeron con éxito.
- Auditoría completa: doce semillas de día y doce de noche; 24/24 recorridos llegaron al final sin errores. Validador sin errores. Game Tester, Superfan y Designer sin graves de contenido. Hub sin bloqueos, novedades fantasma ni regalos repetibles. Las suites del motor pasaron, incluidas PC, escenas, minijuegos y sistemas existentes.
- Autoría: 2 048 recorridos de decisiones con estado/UI controlados. Integración adicional: 1 024 combinaciones sobre registro, estado e intérprete reales; 10 240 reintentos y 15 360 comprobaciones de repetición. Estos recorridos llaman a los guiones directamente; el hub global se certifica por separado.
- Veinte combates Showdown reales (cinco equipos por cuatro semillas), todos concluidos. Regresión de derrota real: noLoss conserva dinero; omitirlo mantiene la multa anterior. La transmisión del campo se comprueba fuera del catch del intérprete.
- Seis puzles distintos con solución de 8–12 pasos y placas obligatorias. Nueve variantes de minijuego con 32 semillas por variante.
- Playwright móvil 412×860 sin errores de página. Revisadas capturas de lugar, mapa, diálogo, puzle, pesca, presentación de combate y epílogo; además pantallas generales de humo/UX.
- Revisión independiente de registro b04→comunidad, compatibilidad, referencias, puzles, progresión y extensión noLoss: sin bloqueadores tras las correcciones.
- SW generado mediante herramientas/build-sw.mjs en CI, versión 518d6263a8ee, 268 entradas de precaché (incluye raíz y nueva misión). No editado a mano; app/img/indice.json generado sin cambios.

## Avisos existentes conservados

La auditoría detectó tres caminos temporalmente bloqueados del bot en contenido anterior, pero los 24 recorridos terminaron. UX mantuvo once graves concentrados en la Pokédex (letras de 8–9 px y control de filtros de 26 px), más detalles de contraste y tamaño. Se verificaron esas reglas en app/css/app.css de main antes de esta entrega; esta publicación no modifica CSS ni Pokédex. No son fallos de los nuevos puzles o diálogos. La prueba visual no demuestra que todas las pantallas del juego carezcan de defectos.

## Integridad

Sin renombrar ni eliminar ids anteriores, sin cambiar orden de BLOCKS, topes, medallas, guardados o assets.directory=./app. El único cambio al intérprete transmite una opción opcional a una función existente; false conserva el comportamiento previo.

SHA-256 de los archivos semánticos auditados:

| Archivo | SHA-256 |
|---|---|
| app/content/comunidad/cg-faroles.js | 108897caaa51c532a9e954fac6a44555c16f551168c64ba4d7b54f5c25557b2a |
| app/content/comunidad/lista.js | aa5506245153b2d797bf6c7ce6f67c69d2b0e32f4a105ef2de83d188812993e0 |
| app/content/index.js | e2d78788abe3b9f68bccef27d6dd0237ba3950ca8e43647f589b9a27bbc2c0fa |
| app/js/guion.js | 670ae9cc6b9c4751ed81635d877136386293aac3fa1207920e0c86b0df43338a |

La fusión y el despliegue de producción son pasos posteriores a este dictamen. Su resultado se registra en el reporte maestro con el SHA definitivo. La duración de las misiones no se midió.
