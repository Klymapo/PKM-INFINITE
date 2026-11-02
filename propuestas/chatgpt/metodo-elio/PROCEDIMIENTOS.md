# Procedimientos para Argos

## Entrada común

1. Consultar fuente actual e instrucciones del repositorio. Leer este estudio como orientación histórica, nunca como inventario vigente de pendientes.
2. Identificar tipo de encargo y alcance. «Lápiz» permite solo diseño. Para PKM-INFINITE rige docs/COLABORACION.md: rama chatgpt/* y entregables bajo propuestas/chatgpt/. La autorización para estudiar no equivale a publicar en main.
3. Elegir 2–4 archivos análogos y rastrear entrada → UI → lógica → estado → persistencia. Consultar contratos públicos antes de abrir guiones; proteger spoilers.
4. Anotar resultado esperado y condiciones de aceptación. Conservar contratos e ids publicados.

## Bug o queja repetida

- Comprobar versión observada contra la actual. No atribuir todo a caché sin evidencia.
- Reproducir con el estado disponible y en la plataforma del usuario. Si dice «sigue fallando», revisar la hipótesis anterior.
- Preparar una regresión que falle por ese comportamiento, no por un error de preparación. Verificar éxito, repetición, cancelación y conservación cuando apliquen.
- Proponer el cambio mínimo con compatibilidad y recuperación de estados ya afectados.
- En el alcance actual de Argos: entregar diagnóstico, diff propuesto o instrucciones y pruebas en propuestas/chatgpt/. Elio integra. No editar app/ ni herramientas/ bajo esta autorización.
- Si en una tarea posterior Mario autoriza expresamente editar el runtime, aplicar ese alcance y las reglas de validación del proyecto. La skill de publicación de Claude no otorga por sí misma permiso a Argos.

## Mecánica o contenido nuevo

- Leer el formato en docs/CONTENIDO.md y seguir un ejemplo autorizado. Distinguir módulo del motor de contenido declarativo.
- Definir ids, flags de entrada/salida y contrato de comandos antes de escribir.
- Conservar la lógica comprobable sin DOM; UI con helpers existentes. Para contenido de comunidad, usar cg_<slug>_ y el formato de docs/COLABORACION.md.
- Probar entradas, salidas, repetición y estado antiguo. En propuestas, dejar instrucciones de integración y resultados disponibles, sin afirmar publicación.
- No abrir secreto/ ni contenido no jugado para completar este estudio.

## Trabajo largo

Usar una hoja breve con paquete, archivo, depende de, estado, validación y próximo paso. Registrar decisiones autónomas y dudas que realmente bloquean. Guardar avances con rutas específicas; no incorporar cambios ajenos ni atribuciones inventadas. Los agentes solo se usan cuando estén autorizados por el usuario o instrucciones aplicables; conservar una revisión independiente cuando el procedimiento del proyecto la exija.

## Comandos de referencia para el integrador

| Caso | Comando | Condición |
|---|---|---|
| Subsistema | node herramientas/test/<prueba>.mjs | Elegir la prueba real del módulo; no inventar npm test |
| Iteración | node herramientas/auditar.mjs --rapida --bloque bNN | Recorre contenido y genera temporales/checkpoints; no es toda la suite |
| Publicación de bloque | node herramientas/auditar.mjs | Puede escribir secreto/; solo con alcance correspondiente |
| UI | python3 herramientas/humo.py --salida /tmp/humo | Además, mirar capturas; lógica sola no certifica móvil |
| UX | python3 herramientas/ux.py --salida /tmp/ux | Revisar capturas y hallazgos, no solo el proceso |
| Cache de runtime | node herramientas/build-sw.mjs | Solo si hay cambio autorizado en app/; no editar sw.js a mano |
| Consulta de ids | node herramientas/ids.mjs existe <id> | Puede revelar spoilers; no volcar resultados al chat |

No ejecutar comandos que escriben fuera del alcance solo para completar un checklist. Los comandos de publicación son referencia, no una orden de desplegar.

## Cerrar una entrega documental

- Verificar fuentes, enlaces y ausencia de cambios en runtime.
- Actualizar propuestas/chatgpt/LEEME.md y registro de cambios de la entrega.
- Guardar la rama autorizada y confirmar su contenido remoto.
- Registrar fecha, rama, revisión y qué cambió en «Registro de cambios» del reporte maestro del proyecto en Gaston, sin spoilers.
- Responder con resultado y límites reales. No decir «abre el juego para actualizar» por una entrega que solo contiene documentos.
