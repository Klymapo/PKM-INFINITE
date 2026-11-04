# Disponibilidad de captura y Pokédex con color · 2026-11-04

Pedido de Admin: identificar los Pokémon capturables frente a los que solo combaten y dar otra pasada más dinámica y colorida a la Pokédex.

## Cambios

- Guía de entrenamiento separada en Capturables aquí (verde), Solo combate (coral) y No disponibles ahora (ámbar). Cada grupo muestra cantidad, motivo, sprites, tipos y niveles. Una misma especie puede aparecer como salvaje y en un equipo ajeno; la clasificación corresponde al encuentro, no a una prohibición permanente sobre la especie.
- La disponibilidad respeta el tope de nivel y las condiciones de práctica. El selector de salvajes usa las mismas condiciones. Los encuentros que declaren noCatch pasan esa restricción al combate (incluidos rastreo y exploración); el bot conserva el mismo indicador.
- Pokédex con etiquetas y filtros de captura local, separados del estado histórico de visto/atrapado. Se consideran los encuentros de los terrenos utilizables y los sitios visibles del lugar/tramo actual, sin heredar tablas de una ruta vecina ni abrir narrativa.
- «Sin captura local confirmada» no significa que una especie sea imposible de obtener: los encuentros de misión, regalos y otras fuentes mantienen sus reglas.
- Colores por tipo de Pokémon y región de origen, emblemas regionales y cabecera más compacta. Accesos «Me faltan aquí», «Mis evoluciones» y alternancia tarjetas/lista. Transiciones breves y retroalimentación táctil visual; con reducir movimiento no se animan.
- Conserva todos los filtros, búsqueda, paginación y registro de especies de la versión anterior. Las regiones siguen significando origen, no listas regionales oficiales.

## Verificación

Regresión escrita y observada fallar antes de implementar. Pruebas aprobadas de instructores/salvajes, especie en dos fuentes, condición de entrada, práctica cerrada por nivel y exclusión noCatch. Filtros locales comprobados junto con filtros de catálogo. Suite de 37 archivos Node aprobada.

Recorridos Playwright de Pokédex y captura local aprobados: grupos, filtros de capturables/solo combate, acceso Me faltan aquí, cambio de lista, colores regionales, movimiento reducido, evolución y tamaños de 412 y 320 px. Cero errores JavaScript. Capturas revisadas; sprites externos conservan su respaldo si no hay acceso a la red. Durante la revisión se corrigió un conflicto con la clase reservada battle y se verificaron las pulsaciones reales después del arreglo.

Versión 2026-11-04.3; service worker generado oficialmente. No se ejecutó auditoría completa.

Verificación final: auditoría rápida aprobada con 4/4 recorridos completos, validador sin errores y Game Tester sin graves. Se conservan avisos de accesos cerrados que no impiden terminar. Humo oficial Python aprobado sin errores JavaScript. El recorrido anterior de DexNav, guía de entrenamiento y Convivir también se repitió y pasó. Capturas revisadas de Pokédex a color y grupos de entrenamiento.
