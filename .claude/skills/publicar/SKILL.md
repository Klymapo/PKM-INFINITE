---
name: publicar
description: Publica en main de Pokémon Infinite un trabajo ya revisado (una rama revision/* o trabajo/bNN): fusión, versión, service worker, push y anotación en el reporte maestro de Drive. Úsala siempre que algo vaya a llegar al móvil de Mario.
---

# Publicar en Pokémon Infinite

Las reglas de CLAUDE.md §0 y §4 son las que mandan. Esto es el procedimiento corto.

## Antes de publicar
- [ ] Si es un bloque, el lector independiente dijo **apto**, y es un bloque nuevo, ya está en `BLOCKS` (`app/content/index.js`).
- [ ] `CONTENT_VERSION` subió (`AAAA-MM-DD.N`; mira la última versión de `main` y suma 1 si es del mismo día).
- [ ] Auditoría:
  - Un **bloque nuevo** lleva la completa: `node herramientas/auditar.mjs` (en segundo plano: tarda). Tiene que salir «Apto». Mira las capturas de humo y ux (`/tmp/ux-AAAA-MM-DD/`), por lo menos el mapa, un lugar y un combate.
  - Un **arreglo pequeño** basta con la rápida: `node herramientas/auditar.mjs --rapida`. Si tocó interfaz, añade `python3 herramientas/humo.py --salida /tmp/humo` y mira las capturas.
- [ ] Si la auditoría reescribió informes de `secreto/auditorias/` que no quieres publicar, restáuralos. Para un bloque nuevo, en cambio, sí se suben.

## Fusionar y subir
```bash
cd <repo>
git checkout main && git pull --ff-only origin main
git merge --squash <rama>          # una sola entrada limpia en main
node herramientas/build-sw.mjs     # SIEMPRE el último paso antes del commit
git add -A
git commit -m "<qué tipo de cambio, SIN spoilers>

<líneas de atribución de la sesión>"
git push origin main
git fetch origin main:refs/remotes/origin/main   # el clon es superficial; sin esto el aviso de «sin subir» salta en falso
```
- El mensaje describe **qué tipo** de cambio hay («Cartas: reglas más claras y salida sin trabas»), nunca qué pasa en la historia.
- Si el push falla por cambios remotos: `git pull --rebase origin main`, vuelve a ejecutar `build-sw` y empuja otra vez.
- Cloudflare despliega solo en uno o dos minutos.
- **No borres la rama de origen** sin que Mario lo diga. Si sobran ramas, pregúntale.

## Anotar
1. Añade una línea al final del reporte maestro de Drive con insertText y `endOfSegmentLocation`:
   - documento: Google Doc `1QJPo2Bq8Qgj7-EOEMO5LR99_PSDTd2Po5sDKaZWKfPE`, carpeta POKÉMON INFINITE de Gaston, sección «Registro de cambios»;
   - formato: `AAAA-MM-DD · GitHub Klymapo/PKM-INFINITE · main · <hash>: <qué cambió, sin spoilers> (versión …)`.
2. Si es un bloque: `secreto/registro.md` («Publicación N»), `hilos.md`, `referencias.md`, `balance.md` y las secciones de `secreto/resumen.md` que diga su pie. Normalmente ya lo hizo el integrador: compruébalo.

## Mensaje a Mario
De 2 a 4 líneas, sin spoilers:
- qué se publicó;
- si la auditoría pasó;
- «abre el juego con internet para que se actualice».
