# DexNav contextual y Convivir · 2026-11-04

Implementación autorizada por Admin («Martillo»).

- DexNav disponible en ciudades con acciones locales de exploración; selector entre terrenos utilizables. Mantiene especies vistas, condiciones, hora y eventos. Sin heredar tablas del padre. Acceso permanente en Más y desde ciudades con encuentros.
- Guía de entrenamiento independiente: equipos de instructores no capturables, salvajes propios capturables desde la acción existente. No agrega capturas ni modifica los equipos de la historia.
- Equipo → ficha → Acciones → Convivir: Jugar, Cepillar o Descansar. Escena breve con el Pokémon, corazones antes/después y aviso de evolución. +15 exactos por individuo y día local; gratis y repetible sin más recompensas. El campo bondDay se conserva en el propio Pokémon al guardar, pasar por la PC y evolucionar. Límite 255; fecha futura ya registrada impide cobrar retrocediendo el reloj.

## Verificación

Pruebas de reglas aprobadas: encuentros locales, interior, instrucción sin salvajes, condiciones, evento, terreno actual de ruta, estado de ruta ajeno; límite diario, individuo nuevo, guardado, evolución, reloj hacia atrás, máximo y recompensa exacta con objetos equipados. Regresiones de guardería, historias y tutor aprobadas. Recorrido Playwright a 412×860 aprobado: ciudad con selector y especies separadas, interior vacío, guía de entrenamiento sin Pokémon de ruta, +15 al convivir y sin segunda recompensa. Captura de amistad revisada; cero errores JavaScript.

Auditoría rápida general: NO PUBLICAR, solo 1/4 recorridos terminan, 5 atascos; validador sin errores y Game Tester sin graves. Reproducido también en el árbol anterior a estos cambios (012728a, idéntico al main remoto 028c365). Bloqueo previo, no corregido en este encargo para no modificar historia. Se entrega en rama de revisión y no en main. Versión preparada 2026-11-04.1; service worker generado oficialmente.
