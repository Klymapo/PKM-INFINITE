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
