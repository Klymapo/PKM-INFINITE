# Pokémon Infinite · publicación del episodio lateral de Johto
Fecha: 2026-11-05 (CDMX). Integración preparada desde la rama auditada `chatgpt/carga-johto-2026-11-05`.

El contenido `app/content/johto/` implementa la historia secundaria «La carga que nadie firmó» con ocho tramos T0–T7, sin regiones ni medallas nuevas ni continuación de la Gira. Arranca en Olivo; las actividades son compatibles con los bloques anteriores y el progreso se guarda en `cg_carga_*`. Se añaden encuentros capturables de Goomy, Sliggoo y Sliggoo de Hisui en Caoba.

Integración: `app/content/index.js`, como registro lateral antes del último bloque B7 para que la condición de avisos de B7 no cambie. Se actualiza `CONTENT_VERSION` para revisión y reparación de partida. Generar `app/sw.js` mediante `node herramientas/build-sw.mjs` antes de fusionar. El Service Worker se regenera, no se edita a mano. Auditar `node herramientas/johto/auditar-carga-johto.mjs` y `node herramientas/johto/auditar-carga-johto-voces.mjs` junto a las herramientas de Elio.

El objetivo de duración de 6–8 horas queda pendiente de cronometraje real, a petición del usuario. Nunca documentar el objetivo como tiempo medido. Despliegue público Cloudflare por confirmar; fusionar código en main no prueba que el sitio remoto lo esté sirviendo.

## Comprobación antes de fusionar
Rama de prepublicación creada desde main en commit `843b8a90ac33035655da7f66a792afe2539b72df`, contenido integrado mediante `021f1a12965436133a2b8c5425f09961cec8f96b`. El siguiente push inicia las herramientas de Elio sobre la integración real, genera el Service Worker como artefacto y no modifica el juego publicado hasta fusionar.
