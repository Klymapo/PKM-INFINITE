---
name: bloque-por-paquetes
description: Escribe un bloque nuevo de Pokémon Infinite en seis paquetes con agentes (plan, tramos de dos en dos, integración, revisión y publicación), con una hoja de avance y tareas programadas de respaldo por si la sesión se corta. Úsala cuando Mario pida escribir un bloque.
---

# Bloque por paquetes

Escribir un bloque cuesta unas 6 horas y unos 4 M de tokens (el B7 fue la referencia). Se divide en pasos para que, si la sesión se corta, otra sesión retome justo donde se quedó.

## 0. Preparar
1. `git checkout main && git pull --ff-only`. Crea la rama `trabajo/bNN` y haz push. Después, `git fetch origin trabajo/bNN:refs/remotes/origin/trabajo/bNN`: el clon es superficial y, sin esto, el aviso de «commits sin subir» salta en falso.
2. Crea `secreto/bloques/bNN-avance.md` con esta tabla:

   | Paso | Qué | Estado |
   |---|---|---|
   | 1 | Plan, encargo y estructura | pendiente |
   | 2 | Tramos T0 y T1 | pendiente |
   | 3 | Tramos T2 y T3 | pendiente |
   | 4 | Tramos T4 y T5 | pendiente |
   | 5 | Integración | pendiente |
   | 6 | Revisión ligera, auditoría y publicación | pendiente |

   Debajo, una sección «Notas por paso».
3. **Respaldos**: si Mario los pide, crea tareas programadas en la sesión remota con `create_trigger` y `run_once_at`, en modo automático y con aviso al celular. El prompt de cada una debe:
   - (a) conseguir el repo con `add_repo` (Klymapo/PKM-INFINITE, push);
   - (b) no hacer nada si `bNN` ya está en `BLOCKS` de `main`;
   - (c) no hacer nada si el avance marca un paso «en curso» y el último commit de `trabajo/bNN` tiene menos de 40 minutos;
   - (d) si no, seguir con los pasos pendientes, en el orden de esta skill.

   Anota los respaldos en el reporte maestro.

## Paso 1 · Plan y estructura (un agente)
- Encargo: «Plan, encargo y estructura del bloque NN», siguiendo CLAUDE.md §2.4.
- Debe leer `secreto/resumen.md` primero, y los originales solo donde haga falta: el plan del bloque anterior, las ideas aprobadas y `progreso.md` para los pendientes.
- Entrega:
  - `bNN-plan.md`;
  - `bNN-encargo.md`, con una sección por tramo que se pueda escribir solo con el encargo, «Contratos compartidos» y «Para validar sin publicar»;
  - los comunes (index, npcs, misiones, comun);
  - stubs `t0`…`t5`.
- Que `index.js` filtre las referencias pendientes, para que el bloque valide con los tramos vacíos.
- Las decisiones que tome sin Mario van en el plan («Decidido sin Mario»).

## Pasos 2 a 4 · Tramos (dos agentes `escritor-tramo` en paralelo)
- Prompt mínimo: «Bloque NN, tramo T2» (el agente ya sabe qué leer y qué no tocar). Trabajan en el mismo clon, sin worktree, cada uno solo en su archivo.
- Cuando termine cada agente:
  - haz commit de **solo su archivo** (`git add app/content/bNN/tN-*.js`): el otro sigue escribiendo;
  - si el aviso de cambios sin subir te obliga a guardar el archivo del otro, haz commit como «guardado parcial».
- Corrige en el encargo lo que digan los informes, por ejemplo choques de ids, y pasa sus pendientes a las notas del avance bajo «Para el paso 5».

## Paso 5 · Integración (un agente `integrador`)
- Prompt: «Bloque NN». Hace commit cada 30 min.

## Paso 6 · Revisión y publicación
1. Lanza el agente `lector-independiente` con «Bloque NN» y los encargos concretos que hayan salido del paso 5.
2. Si dice **apto**:
   - añade `bNN` a `BLOCKS` y sube `CONTENT_VERSION`;
   - haz commit;
   - lanza la auditoría completa en segundo plano y mira las capturas;
   - usa la skill **`publicar`**.
3. Si la auditoría no pasa y no se puede arreglar: no se publica. Anótalo en el avance; la siguiente sesión lo retoma.

## En cada paso
- **Al empezar:** marca «en curso» con la hora, haz commit y push.
- **Al terminar:** marca «hecho» con la fecha, anota los tokens de cada agente (`subagent_tokens` del aviso de fin) y las notas para el siguiente paso, y haz commit y push.
- Añade una línea en el reporte maestro de Drive (ver la skill `publicar`).
- A Mario, 2–3 líneas sin spoilers: qué paso terminó, los tokens y qué sigue.
