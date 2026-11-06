# Dictamen editorial independiente — Johto T0–T7
**Estado:** lectura automatizada independiente concluida y contrastada; rama de propuesta aislada, sin publicar.
**Precaución:** el informe original contiene spoilers. No resumir acontecimientos narrativos al usuario.

## Evidencia del primer lector
[GitHub Actions 42138049660](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42138049660): ejecución exitosa de un modelo local Qwen2.5 de 3B, independiente del autor. Revisó 143 guiones en 16 lotes, desde T0 hasta T7. [Informe íntegro, artefacto temporal](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42138049660/artifacts/13466718903). Evaluó causalidad, personajes, voces, elecciones, pistas y ritmo. Una lectura automática no reemplaza una lectura humana.

## Segundo lector
[GitHub Actions 42138369559](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42138369559): el modelo independiente Qwen3 4B (Apache-2.0) llegó a procesar 16 de 16 lotes, pero la ejecución se canceló antes del dictamen global y de subir el archivo. **No es un segundo dictamen finalizado.** Sus registros solo permiten afirmar cobertura de los lotes, no aprobación editorial.

## Hallazgos cotejados con guiones reales
**Tres ajustes aceptados y realizados:**
1. `cg_carga_t0_huellas_escena`: distinguir un rastro físico de una conclusión que el rastro no demuestra. Commit `4e15ba9a`.
2. `cg_carga_t4_registro_carga`: unificar denominación de los folios de preparación y recepción. Commit `c7a42880`.
3. `cg_carga_t7_t_lectura`: mostrar el paso verificable entre interpretación de registros y autorización de un acuse. Commit `9c85b147`.

**Observaciones rechazadas después de verificarlas:**
- Algunos comentarios exigían que actividades opcionales alteraran el resultado principal; eso contradice el diseño de combates no obligatorios.
- Una propuesta sobre el recibo confundía documentación con mercancías; el texto del juego ya los distingue.
- Otras observaciones señalaban supuestas ausencias de justificación que estaban explicadas en las siguientes líneas o en otros guiones.
- Las muletillas de Rotom son parte de su voz, pero su rama purgada tiene tratamiento independiente y ya fue auditada.

**Riesgo editorial menor (no bloqueo):** la investigación vuelve en varios tramos sobre la interpretación de registros; conviene evaluar la cadencia cuando se juegue, pero no inventar una duración ni desmantelar las actividades variadas. El usuario aplazó la medición de horas.

## Verificaciones
- [Auditoría técnica integral previa 42138114996](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42138114996): aprobada, incluyendo Goodra, los ocho tramos, Playwright y pruebas móviles.
- [Auditoría de las voces 42138539400](https://github.com/Klymapo/PKM-INFINITE/actions/runs/42138539400): aprobada, con tres versiones de Diario en trece escenas.
- Tras estas correcciones de texto hay que confirmar el último CI; el resultado previo no acredita por sí solo un commit nuevo.

**Dictamen:** una lectura independiente completa, una segunda lectura parcial sin dictamen global, tres problemas de claridad corregidos y ningún defecto narrativo grave adicional corroborado. Sin cambios en `main`, sin publicación y sin evaluación de duración.
