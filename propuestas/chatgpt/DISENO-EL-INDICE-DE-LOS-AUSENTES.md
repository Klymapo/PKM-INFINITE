# El índice de los ausentes — ficha para Claude

**Archivo:** `propuestas/chatgpt/misiones/cg-indice.js`
**Duración objetivo:** 60–90 minutos (estimación según desplazamientos y lectura, sin cronometraje).
**Estado:** propuesta escrita, pendiente de auditoría independiente y validación del motor.

## Premisa
Una red de auxilio exhibe una clasificación de doce patrullas, pero hay trece renglones. La entrada 00 fue tachada. La explicación se construye con cuatro pruebas: hoja de clasificación (Azafrán), testimonio de Damián (Celeste), esquema de antena de Vera (casa_bill) y ficha de un collar de Audino (Lavanda). La deducción revela que el primer aviso fue válido pero no puntuó porque el emisor no tenía identificador de entrenador. El giro está respaldado por pistas disponibles antes de responder.

## Recorrido y mecánica
1. Noemí abre el caso en Azafrán.
2. Cuatro pruebas en orden libre, con `parts` y `vars.cg_indice_pistas`.
3. Deducción de tres hipótesis; dos respuestas erróneas explican qué pista revisar y permiten reintentar.
4. Verificación en `k_ruta8` mediante tres pulsos breves. El pulso largo falla sin bloquear.
5. Decisión en Azafrán: corregir públicamente sin datos personales o consultar primero a Isandro. Ambas ramas cambian textos y placas posteriores.
6. Epílogo en Lavanda, con cierre de misión y un posible hilo futuro no activado.

Combate opcional contra Damián: Porygon2 54 y Altaria 55, curación previa, derrota no bloqueante. Premio: 1200 monedas y una Máxima Poción. La misión no concede Pokémon, MT ni mecánicas especiales.

## Integración
Módulo ES de datos: `{ npcs, items, quests, trainers, patches, scripts }`. La misión se llama `cg_indice`; todas las demás claves nuevas comienzan por `cg_indice_`. Parches exclusivamente aditivos en `azafran`, `celeste`, `casa_bill`, `lavanda` y `k_ruta8`. No requiere cambios de trama principal ni altera Kaori, Rhi o Lila.

**Revisión pendiente:** comprobar IDs reales de lugares, objetos y movimientos; fusión de `patches` en rutas; ejecución de `parts`; continuidad de `battle` con `lose: 'continue'`; cierres `{ quest, stage: 'hecha', done: true }`. Probar ambas ramas, derrota, salidas y reintentos. Esta etapa no ha ejecutado el validador ni pruebas del juego.

## Intención narrativa
El ranking invita a deducir, no a coleccionar trofeos. Los detalles materiales sostienen las voces: papel, tinta, antena y cinta crema. El misterio trata de escuchar lo que un sistema dejó fuera, sin convertirlo en una conspiración ni anticipar acontecimientos de la historia principal.
