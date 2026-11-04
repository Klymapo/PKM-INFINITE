# DexNav contextual y Convivir · 2026-11-04

Implementación autorizada por Admin («Martillo»).

- DexNav disponible en ciudades con acciones locales de exploración; selector entre terrenos utilizables. Mantiene especies vistas, condiciones, hora y eventos. Sin heredar tablas del padre. Acceso permanente en Más y desde ciudades con encuentros.
- Guía de entrenamiento independiente: equipos de instructores no capturables, salvajes propios capturables desde la acción existente. No agrega capturas ni modifica los equipos de la historia.
- Equipo → ficha → Acciones → Convivir: Jugar, Cepillar o Descansar. Escena breve con el Pokémon, corazones antes/después y aviso de evolución. +15 exactos por individuo y día local; gratis y repetible sin más recompensas. El campo bondDay se conserva en el propio Pokémon al guardar, pasar por la PC y evolucionar. Límite 255; fecha futura ya registrada impide cobrar retrocediendo el reloj.

## Verificación

Pruebas de reglas aprobadas: encuentros locales, interior, instrucción sin salvajes, condiciones, evento, terreno actual de ruta, estado de ruta ajeno; límite diario, individuo nuevo, guardado, evolución, reloj hacia atrás, máximo y recompensa exacta con objetos equipados. Regresiones de guardería, historias y tutor aprobadas. Recorrido Playwright a 412×860 aprobado: ciudad con selector y especies separadas, interior vacío, guía de entrenamiento sin Pokémon de ruta, +15 al convivir y sin segunda recompensa. Captura de amistad revisada; cero errores JavaScript.

## Corrección del bloqueo de auditoría

El bot ganaba megapiedras pero nunca las equipaba; además su política de Mega esperaba al último Pokémon en pie. Se reprodujo la auditoría antes del arreglo (1/4 recorridos terminados) y se comprobó el inventario de una partida generada: Lucario llevaba su piedra en la mochila. Se añadió preparación que equipa únicamente piedras ganadas, sin crear objetos, duplicarlos ni retirar objetos elegidos; la IA puede activar Mega con el Pokémon equipado antes del último compañero. Los checkpoints incluyen la nueva dependencia en su huella.

Prueba de regresión de preparación: pasó tras fallar antes de implementar; se comprueba también Mega con dos Pokémon vivos usando la IA y simulador reales. La suite de 35 archivos de pruebas pasó. Auditoría rápida desde el principio: 4/4 recorridos alcanzan el final, cero errores y sin graves del Game Tester. Segunda rápida con checkpoints actualizados: 4/4 también. Los avisos de paso bloqueado corresponden a accesos cerrados que el bot encuentra y abandona; ninguno impide terminar.

No se cambian la historia, entrenadores, niveles ni los umbrales de auditoría. No se ejecutó la auditoría completa. Versión 2026-11-04.1; service worker generado oficialmente.

Prueba de humo oficial Python: aprobada, sin errores JavaScript; capturas de lugar, mapa, equipo, mochila, diario y Más revisadas. Los recursos externos no disponibles usan el respaldo existente.
