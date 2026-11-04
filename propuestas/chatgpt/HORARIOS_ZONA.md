# Recuperar horarios de la guía · 2026-11-04

Se corrigió la regresión introducida al usar la tabla de encuentros de la hora actual como catálogo completo de la guía. La guía vuelve a incluir las especies de día, noche y mañana del terreno local, con disponibilidad actual y probabilidades por horario. Los terrenos con encuentros exclusivamente nocturnos también aparecen de día; los accesos urbanos a la guía no desaparecen por ese motivo.

Se mantienen las condiciones de historia, los eventos activos y la separación entre lugares: no se heredan tablas de una ruta vecina. DexNav, encuentros aleatorios e indicadores de captura local siguen filtrando por la hora actual. La guía distingue Capturable ahora de Capturable en su horario. Se aclaran los intervalos de mañana (06:00–11:59), día (12:00–19:59) y noche (20:00–05:59).

Verificación: regresión reproducida antes de implementar (faltaban nocturnos en la guía de día); prueba aprobada después para noche/mañana, terreno nocturno, condiciones, evento activo, probabilidades y tramo local. Recorrido Playwright móvil aprobado con reloj simulado de día y de noche, capturas revisadas y cero errores JavaScript. Se comprueba que el DexNav no ofrezca encuentros fuera de horario.

Versión 2026-11-04.6; service worker generado oficialmente. No se ejecutó auditoría completa.

Verificación final: 39 archivos de pruebas Node aprobados. Auditoría rápida aprobada con 4/4 recorridos completos, validador sin errores y Game Tester sin graves; se conservan avisos generales de accesos cerrados del bot. Humo oficial Python aprobado sin errores JavaScript. Caso adicional de interfaz: si una especie admite captura solo en otro horario, no se marca como capturable ahora.
