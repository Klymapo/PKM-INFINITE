# Elenco A · 2026-11-02

Pedido de Admin: integrar el elenco aprobado hasta el bloque 7 en las apariciones antiguas, actuales y futuras, sin cambiar historia ni partidas. Atenuar el fondo de las conversaciones.

## Resultado

28 identidades en un registro compartido, con atlas transparente y posturas aprobadas. Resolución por id y nombres heredados; variantes de Joy y nombre libre del protagonista. Reutilizado en diálogos, fichas, negocios, cartas, casos, combate y cinemáticas. Los nuevos guiones que usen estas identidades adoptan el diseño automáticamente. Los personajes nuevos requieren una entrada y su arte correspondiente. Lucario y Candela conservan su presentación.

Se conserva la personalización explícita del protagonista y se ofrece volver al sprite aprobado. La carga fallida conserva el retrato de respaldo. Fondo de diálogo al 30 % y cine al 24 %, con recuperación al volver a narración.

## Verificación

- 33 archivos de pruebas Node: aprobados.
- Registro: 28 identidades y censo de referencias de todos los bloques; variantes y claves heredadas de Object comprobadas.
- Prueba Playwright a 412 × 860: carga de los 28 sprites, diálogo, dos actores de cine, recuperación de iluminación, entrenador rival, cambio de actor, personalización, fallback de recurso y los cinco menús; cero errores JavaScript.
- Capturas revisadas: elenco, diálogo, cine y combate. Los Pokémon externos sin red usan el fallback previo.
- Auditoría rápida: pasa; avisos generales de balance y tres atascos del bot. No se ejecutó auditoría completa.
- El humo Python oficial no arrancó: falta su paquete Playwright. La comprobación visual se realizó con el recorrido Playwright Node descrito arriba.
- Corregidos resolución de claves heredadas y cambio de clase visual al cambiar el personaje de un actor.
- Service worker generado con la herramienta oficial. Versión 2026-11-02.3.
