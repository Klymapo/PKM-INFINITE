# Gestos de Pokédex y jefes verdaderos · 2026-11-04

Pedido de Admin: que deslizar los botones de Pokédex no arrastre la pantalla y que cada zona indique si su verdadero jefe está vencido.

## Cambios

Las filas de regiones, controles y familiares evolutivos se excluyen del gesto de navegación de la hoja mediante el mecanismo existente data-noswipe. Los carruseles mantienen desplazamiento táctil nativo y contienen el rebote horizontal. No se cambia el gesto global de otros menús.

El estado del verdadero jefe reutiliza las claves históricas escalera:<entrenadores> y los contadores élite. Verde: verdadero equipo vencido; dorado: desbloqueado, sin vencer; gris: por desbloquear con progreso de 10 victorias élite. Las victorias de práctica no cuentan como victoria sobre el jefe. Los registros de victorias del id generado también reconocen partidas anteriores sin escribir flags nuevos. No se alteran los premios.

Se muestra dentro de la zona, en sus tarjetas de lugar y en el directorio de zonas visitadas. El directorio incluye las zonas sin tope que antes se omitían. Los lugares sin equipo de instructor no reciben un jefe ficticio. Una zona vencida permite acceder a su revancha aunque falte un contador élite antiguo.

## Verificación

Reproducción previa del gesto: un arrastre de filtro movía todo el panel 34 px. Después del arreglo, los filtros de regiones, estado y accesos no modifican la transformación del panel. Prueba táctil nativa de Chromium: el carrusel regional sí se desplaza y la hoja permanece fija. Se conserva la navegación y el clic de filtros.

Prueba de reglas escrita y observada fallar antes de implementar; aprobada después: jefe bloqueado, pendiente, vencido, conteo correcto de élite, compatibilidad de victorias antiguas, ausencia de jefe y lectura sin mutación. Suite de 38 archivos Node aprobada.

Recorrido móvil 412×860 aprobado: gestos, jefe pendiente, jefe vencido, revancha y estados en el directorio; cero errores JavaScript. Captura revisada. Auditoría rápida aprobada: 4/4 recorridos terminan, validador sin errores y Game Tester sin graves; conserva avisos de accesos cerrados del bot. No se ejecutó auditoría completa.

Versión 2026-11-04.4; service worker generado oficialmente.

Humo oficial Python aprobado sin errores JavaScript: inicio, conversación, combate y los cinco menús. Se conserva el respaldo para recursos externos no disponibles en el entorno de pruebas.
