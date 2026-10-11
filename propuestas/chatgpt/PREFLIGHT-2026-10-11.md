# Preflight · propuestas ChatGPT · 11-10-2026

**Estado: LISTO PARA PROPUESTAS.** Rama de trabajo: `chatgpt/misiones-2026-10-11` (creada desde `main`). Acceso de lectura comprobado; escritura comprobada mediante el commit de este informe. `main` no se modifica.

## Fuentes examinadas (solo las autorizadas)

- `docs/COLABORACION.md`: política de colaboración, exclusiones y rutas de entrega.
- `docs/CONTENIDO.md`: esquema de módulos ES de datos, NPC, spots, quests, scripts, condiciones, objetos legibles y validación.
- `app/content/b04/t7-minijuegos.js`: ejemplo real de guiones, objetos `read`, minijuegos, recompensas y parches.

No se ha abierto `secreto/`, ni otros archivos de `app/content/`.

## Reglas operativas para los siguientes encargos

- Escribir únicamente bajo `propuestas/chatgpt/` en una rama `chatgpt/*`. No modificar `main`, `app/`, `herramientas/` ni contenido publicado.
- Misiones: `misiones/cg-<slug>.js` como módulos ES de datos; `npcs`, `items`, `quests`, `scripts`, `patches` y, si procede, `trainers`/`gather`. Usar exclusivamente nuevos identificadores `cg_<slug>_...`; para la clave de misión usar `cg_<slug>` según la especificación expresa del encargo.
- Parches aditivos: nuevos `spots` en lugares ya visitados, sin sobrescribir entradas anteriores. Cartas/notas como objetos con `read`; leerlas con `{ read: 'id' }`.
- Para decisiones: `choice` con `then`, condiciones `flag.*` y consecuencias persistentes. Cerrar cada misión con etapa `hecha` y `done: true` (el motor lee `quest.x` como `'hecha'` una vez terminada).
- Si hay combates, entrenadores y movimientos coherentes con nivel 50–56, opción de curar antes; sin Mega, Z ni Tera. Recompensas modestas. Diálogos naturales, nombres oficiales de España y marcadores de pronombres `{o|a|e}`.
- Los retratos/postales deben ser arte original: sin Pokémon ni personajes canon, pixel art cálido azul marino/crema/dorado/aura azul, cuadrícula limpia sin antialiasing, tamaños múltiplos de 16; PNG de máximo 512 px por lado y menos de 300 KB, con nombres exactos `retrato-<id>.png`, `postal-<idLugar>.png`, `icono.png`, `titulo.png`.
- `LEEME.md` deberá inventariar las entregas. Claude revisará la rama y decidirá la integración.

## Compatibilidad y límites detectados

- **Sin bloqueo de formato conocido.** El ejemplo de `t7-minijuegos.js` declara constantes auxiliares fuera del objeto exportado; para cumplir el encargo actual de *solo datos* se deben evitar tales constantes y escribir condiciones directamente como cadenas.
- `docs/CONTENIDO.md` menciona `docs/ARTE.md`, `docs/MINIJUEGOS.md` y `docs/CINE.md`. No se han leído por la restricción de esta etapa; evitar funciones que dependan de detalles no verificados o dejar explícita cualquier necesidad de revisión adicional.
- El documento de contenido indica `node herramientas/validar.mjs` y `node herramientas/build-sw.mjs` como validación previa a publicar. **No se ejecutan aquí**: esta rama contiene propuestas, no una publicación; Claude validará al integrar.
- Los personajes Kaori, Rhi y Lila pueden aparecer incidentalmente, sin alterar sus arcos. Los NPC nuevos de las misiones deben ser originales.

## Resultado

Rama preparada para escritura y auditoría posterior. **Todavía no hay misiones ni imágenes creadas en esta etapa.** Ningún merge ni cambio en `main`.
