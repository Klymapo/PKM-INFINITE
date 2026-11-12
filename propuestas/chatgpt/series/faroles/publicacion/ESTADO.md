# Publicación de cinco secundarias

Autorización de Mario: «Súbelo», 2026-11-12. Rama de integración: chatgpt/publicar-misiones-20261112, desde main ebad8ebf.

## Registro de cambios

- 2026-11-12 · Preparada integración mediante app/content/comunidad/lista.js, versión 2026-11-12.1; sin cambiar orden de bloques ni ids existentes. Pruebas reales de registro/estado/intérprete, capturas 412×860 y auditoría completa en CI 43306591947. Integración y capturas aprobadas en esa primera revisión; auditoría completa aún en curso.
- 2026-11-12 · Detectado y corregido antes de publicar: lose:continue permite seguir la escena pero no evitaba la multa monetaria del motor. Añadido campo opcional noLoss a comandos battle y transmisión a la opción ya existente del controlador. Solo los cinco ensayos nuevos lo activan. Documentado el contrato y añadidas regresiones con combates Showdown reales, incluida derrota que conserva la multa cuando se omite noLoss.

El estado definitivo se añadirá después de comprobar la última auditoría, capturas y despliegue. La primera corrida no certifica por sí sola la revisión con noLoss.
