# Serie candidata · instrucciones para integrar

Fecha: 2026-11-12, CDMX. Base verificada: main ebad8ebff1843de962d1ee7f79c08db0192c1577. Rama: chatgpt/misiones-cadena-20261112.

## Entrega

Un módulo aditivo en ../../misiones/cg-faroles.js, cinco fuentes JSON originales, el plan de ritmo que genera el director de hoy, un generador reproducible y una prueba de recorridos sobre el intérprete vigente. El módulo contiene cinco misiones, diez tareas, diez decisiones, cinco ensayos de combate (cuatro con alternativa sin combate), seis rejillas diferentes y dos puntos finales de recolección mutuamente excluyentes.

Personajes existentes: Misty, Bill, Sabrina. Única incorporación: Nerea. Lugares: celeste, casa_bill, azafran. Inicio: las tres ubicaciones visitadas y al menos ocho medallas. No requiere acabar ni modificar un bloque central. Cada misión se cierra, y solo entonces se ofrece la siguiente. No hay plazos reales, dependencia de horario ni castigo por salir. No se entregan medallas, niveles, desbloqueos globales, legendarios ni formas nuevas.

Recompensa total de la cadena: 2 300 monedas, seis Hiperpociones y cinco recuerdos legibles; los materiales de prueba son objetos clave propios. Los ensayos no dan dinero de entrenador. Los puntos de epílogo dan materiales comunes cada veinte horas. El rastreo usa el tema Buscaobjetos, sin exigir Riolu/Lucario.

La cifra de 103 minutos es una estimación editorial de los campos est, no tiempo medido ni promesa. El director devuelve 44 minutos constantes por borrador: esos 220 minutos NO se presentan como duración real.

## Herramientas empleadas y límites

| Herramienta | Uso comprobado |
|---|---|
| generar-historia.mjs | Modo --desde-json ejecutado cinco veces; fuentes originales redactadas para esta entrega. No se usó un LLM local. |
| validate / evaluateRhythm | Validación de los cinco borradores sin avisos. |
| compilar-aventura.mjs | buildPlayablePack genera la base nativa de cada misión; después se amplía editorialmente. |
| director-juego.mjs | Plan reproducible, alternancia de actividades y revisión del ritmo por cada borrador. |
| test-integraciones.mjs | Ejecutado y aprobado. |
| app/js/guion.js | Se ejecuta el intérprete actual, sustituyendo imports por estado, UI y batallas de prueba. Su cuerpo no se reimplementa. |
| app/js/puzle.js | Parseo, solución y ejecución de las seis rejillas con puertas abiertas y empujones obligatorios. |
| app/js/minijuegos.js | Validación de definiciones, preparación y premios; nueve variantes probadas con 32 semillas por variante. |
| app/data/species.json e items.json | Equipos y premios cotejados con datos actuales. |
| Ollama / Ink / simular-ink | No ejecutados: modelo local opcional y formato externo, respectivamente. No se necesitan para jugar estas misiones. |
| crear-aventura CLI / test-compilador / test-fabrica | No se ejecutan aquí: su verificador importa todos los bloques. Se usan sus funciones puras sin abrir narrativa posterior a lo jugado. |
| validar / superfan / tester / diseñador / recorrido / hub / humo / ux | Deben ejecutarse sobre una integración temporal autorizada. Esta rama de propuestas no registra el paquete en el runtime; correrlos ahora no certificaría las misiones nuevas. |
| build-sw / publicar / importar imágenes / herramientas de otros sistemas | No aplican a una entrega narrativa aislada; no se activan cambios de producción ni se crea arte innecesario. |

## Comprobar y reproducir

Desde la raíz del repositorio, con Node >=20 y sin npm install:

    node propuestas/chatgpt/integraciones/test-integraciones.mjs
    node propuestas/chatgpt/series/faroles/probar-serie.mjs
    node propuestas/chatgpt/series/faroles/crear-serie.mjs /tmp/faroles-otra-salida

El generador rechaza sobrescribir salidas existentes. La salida contiene también los borradores intermedios originales del generador; no se importan, ya que el paquete final sustituye sus exploraciones narradas por tareas reales y añade curación, progresión y guardas.

Pruebas: PRUEBAS.json. Se cubren las 1 024 combinaciones de diez decisiones en dos modalidades de ensayo (2 048 recorridos), tareas en ambos órdenes, salir, perder y repetir, posponer combate, curar antes y después, reiniciar mediante JSON entre escenas, exclusión de epílogos y recompensas no repetibles. No certifica transacciones del guardado, migraciones ni dificultad del combate de Showdown; UI y batalla usan dobles de prueba. Una partida adicional completa la serie con Pikachu sin miembros especiales.

## Revisión editorial independiente

Un revisor distinto del autor detectó puertas prescindibles, una actividad resuelta con un toque y una rejilla duplicada. Las tres correcciones se aplicaron. Segunda revisión: seis puzles distintos con empujones y apertura de puerta obligatorios; pesca real con reintento; sin hallazgos graves adicionales en el contenido revisado. Dictamen favorable limitado a esta propuesta. No leyó la continuidad privada ni aprobó publicar.

## Integración por Elio

1. Revisar continuidad privada y la disponibilidad física de los personajes; cotejar las condiciones de inicio con el estado actual de Mario.
2. Comprobar ausencia de colisiones del prefijo cg_faroles_ contra el registro vigente. Copiar el módulo y añadirlo a app/content/comunidad/lista.js en una rama de integración; no importar los cinco borradores intermedios ni el plan.
3. Ejecutar auditoría completa y revisión independiente conforme a CLAUDE.md; comprobar los marcadores del hub, entradas de diario, premios y ambos epílogos con una partida real. Los guiones nuevos no escriben Diario de Rotom para no imitar su voz sin consultar la biblia.
4. Inspeccionar móvil 412×860: fichas parts, diálogos, rutas de puzle, resultados de minijuego, ensayo y nuevas recolecciones. La propuesta no incluye capturas de pantallas que aún no están activas.
5. Al adoptar, subir CONTENT_VERSION y regenerar SW con el procedimiento oficial. Registrar integración/publicación como movimiento distinto en el reporte maestro. No eliminar ramas ni material de propuesta.

## Registro de cambios

- 2026-11-12 · Argos · Creados módulo de cinco secundarias y fuentes, planes, generador, pruebas y documentación en propuestas/chatgpt/. Actualizado LEEME. Revisadas herramientas nuevas incorporadas hoy y conservados sus archivos sin cambios. Sin cambios en main, app/, herramientas/, secreto/, partidas o Cloudflare.
- 2026-11-12 · Argos · Corregidos tres hallazgos independientes y repetidas pruebas; entrega de autoría aislada, no una publicación jugable.
