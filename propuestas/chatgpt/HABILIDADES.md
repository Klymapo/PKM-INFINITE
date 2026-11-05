# Cambio de habilidades

- Ficha → Acciones → Cambiar habilidad: muestra habilidad actual y objetos disponibles.
- Cápsula: cambia entre las dos habilidades normales; no cambia una habilidad oculta.
- Parche: pasa a la habilidad oculta cuando existe.
- Mochila → Medicinas → objeto → Usar ofrece el mismo cambio con confirmación.
- Cancelar, no tener alternativa o no tener objeto no consume nada. Un cambio confirmado consume una unidad y guarda la partida.
- Golisopod tiene un menú personal gratuito y reversible: Retirada, Caparazón, Enjambre y Corte Fuerte. Está marcado como personalización, no como habilidad oficial. No modifica los datos de la especie ni otros ejemplares. El jugador elige; no se cambia automáticamente su Pokémon.
- Sin nueva versión de formato de guardado: se usan `abil` y `abilSlot`; un booleano opcional identifica la personalización.

Validación: prueba de opciones, slots, rechazo de habilidades no autorizadas y paso de la habilidad al simulador; suite y auditoría rápida; flujo móvil de confirmar/cancelar/restaurar.
