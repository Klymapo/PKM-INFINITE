# Pokédex visual y sprites de entrenamiento · 2026-11-04

Pedido de Admin: sprites en las listas de Pokémon y navegación de Pokédex por región con más filtros visuales.

## Resultado

- Guía de entrenamiento: sprite, nombre, tipos y nivel, con etiqueta de instructor no capturable o salvaje capturable. Los no descubiertos conservan silueta y nombre oculto. Se usa monImg, el mismo cargador del juego con caché y respaldo sin conexión; no se incorporan imágenes canon al repositorio.
- Pokédex: tarjetas con sprite, número, tipos, etapa y estado. Cabecera con progreso de captura y especies vistas; selector horizontal por región de origen.
- Filtros combinables: tipo, vistos, atrapados, vistos sin atrapar, me faltan, sin descubrir, equipo y PC; evolución inicial/intermedia/final, sin evolución, puede evolucionar, amistad y objeto.
- Búsqueda por nombre o número, sin distinguir acentos. Orden por número, nombre o total de stats. Paginación de 48 tarjetas, navegación anterior/siguiente y restablecer filtros. Se elimina el corte silencioso de unas 400 entradas.
- Detalle con sprites navegables de la etapa anterior y siguientes conocidas. No revela nombres de especies desconocidas.

«Región de origen» clasifica generaciones y formas regionales, incluyendo Hisui; se distingue explícitamente de las listas de Pokédex regionales oficiales. Vistos/capturados conservan el registro existente por número de especie; las formas regionales no inventan un historial separado. La procedencia de una especie es distinta de los lugares donde aparece en este juego.

## Verificación

Prueba de catálogo reproducida antes de implementar y aprobada después: Nacional completa, formas y región, Hisui separado de Galar, estados, combinación de filtros, evolución, acentos, número, orden y búsqueda sin resultados. Suite de 36 archivos de pruebas Node aprobada.

Recorrido Playwright móvil aprobado a 412×860 y a 320 px: regiones, filtros combinados, búsqueda sin perder el foco, paginación, detalle evolutivo y sprites de entrenamiento; cero errores JavaScript. Capturas de cuadrícula, filtros y entrenamiento revisadas. En el entorno sin acceso a sprites externos se comprobó el respaldo existente.

Auditoría rápida: 4/4 recorridos completos, validador sin errores y Game Tester sin graves. No se ejecutó auditoría completa. Versión 2026-11-04.2; service worker generado oficialmente.

Prueba de humo oficial Python aprobada: inicio, conversación, combate y cinco menús; cero errores JavaScript.
