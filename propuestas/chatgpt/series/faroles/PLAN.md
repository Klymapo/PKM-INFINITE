# Serie de misiones · 2026-11-12

## Objetivo y alcance
Crear cinco secundarias consecutivas y aditivas en Celeste, Casa de Bill y Azafrán. Un personaje nuevo recurrente y Misty, Bill y Sabrina. Acciones cortas, diez actividades, combates ligados a ensayos y decisiones con efectos posteriores. No se consulta secreto/ ni contenido posterior a lo conocido por Mario.

## Decisiones de implementación de Argos
Usar el generador en modo JSON y el compilador puro del laboratorio incorporado hoy en main ebad8ebf; desarrollar editorialmente su salida. El compilador por defecto solo narra la exploración y genera un combate sin curación: corregir ambos límites en el paquete nuevo, sin cambiar la herramienta. Alternativa descartada: producir cinco muestras iguales sin actividades reales. Alternativa reservada: generar con Ollama, que requiere modelo local disponible. Ink solo interpreta otro formato y no certifica guiones PKM.

## Pasos verificables
1. Escribir cinco fuentes narrativas y generar borradores y planes con las herramientas existentes.
2. Compilar y desarrollar un único módulo plano cg-faroles.js: cinco misiones independientes en el diario, una desbloquea la siguiente, dos actividades por misión y diez decisiones.
3. Añadir puzles, minijuegos, equipos, recuerdos legibles y dos epílogos seleccionables por la decisión final. Ningún cambio de medallas, topes o trama central.
4. Verificar catálogos, solución de puzles, estructura de minijuegos, todas las combinaciones de decisiones, pérdidas/salidas/reintentos, recarga de estado y recompensas únicas. Revisión independiente del contenido nuevo.
5. Subir únicamente propuestas/chatgpt/ en rama chatgpt/misiones-cadena-20261112, actualizar LEEME y registrar el movimiento sin spoilers en el reporte maestro de Gaston.

## Límites de la entrega
No activar en app/content/comunidad/lista.js, fusionar main ni desplegar. No medir duración a partir de los 44 minutos constantes del director; est será orientación de diseño sin certificar. Auditoría global, revisión de continuidad privada y pruebas visuales del runtime corresponden a la integración. No declarar que las misiones ya se pueden jugar en producción.
