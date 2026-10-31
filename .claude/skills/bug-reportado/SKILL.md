---
name: bug-reportado
description: Procedimiento para cuando Mario reporta un bug o una queja de Pokémon Infinite (algo que no funciona, que no entiende o que le molesta): entender, reproducir, arreglar, probar y publicar. Úsala antes de tocar código por un reporte suyo.
---

# Bug o queja de Mario

## 1. Entender qué le pasa (sin gastar de más)
- **Antes de tocar nada, confirma qué versión tiene:**
  - Si tiene una versión vieja, lo más probable es que solo deba abrir el juego con internet.
  - Compara con `CONTENT_VERSION` de `main`.
- **Si es una duda** («¿qué premio dan las carreras?», «¿cuántos huevos tengo?»):
  - Busca la respuesta en el contenido (`node herramientas/ids.mjs buscar …`) o en su respaldo.
  - Contesta corto y sin spoilers de lo que aún no ha vivido.
  - No es un bug, salvo que la respuesta muestre que el juego no le explicó algo: entonces es una queja de diseño (paso 3).
- **Respaldo:** si mandó uno (exportación de partida), cópialo a `herramientas/test/partidas/` con un nombre descriptivo. El hub lo usará en adelante.

## 2. Reproducir
- **Interfaz:**
  - `python3 -m http.server -d app <puerto>` y Playwright a 412×860. Carga su partida si hace falta (mira cómo lo hace `herramientas/humo.py`).
  - Haz la acción, captura y mira la imagen.
  - Los sprites no cargan en este entorno; es normal.
- **Guion, misión o marcador:**
  - El bot llega a ese punto con `node herramientas/recorrido.mjs --hasta <flag> --verbose`.
  - Para marcadores y novedades usa `node herramientas/hub.mjs`.
- **Combate o minijuego:** un test en `herramientas/test/`. Mira los que ya hay (`battle-test`, `minijuegos-test`, `cartas`, `carreras-test`…).

## 3. Arreglar
- Busca la **causa**. Si Mario repite «sigue sin funcionar», tu hipótesis era falsa: descártala, no la refuerces.
  - Caso real: la foto fallaba por el momento del toque, y luego por algo más. Al final Mario pidió quitar la mecánica, y eso también es una solución válida.
- Si pide **quitar** algo, quítalo de forma que las partidas viejas sigan funcionando:
  - el comando sigue existiendo y da el resultado bueno;
  - los textos de instrucciones se ajustan;
  - `docs/CONTENIDO.md` lo dice.
- **Nunca** renombres ni borres ids publicados. Corrige con `patches` del bloque o con lógica que lea el estado viejo.
- Si el arreglo afecta a escenas que el jugador ya pasó, añade una vía retroactiva: un spot con `new` y `cond` que la ofrezca. Ejemplo: las ceremonias de trofeo para quien ya había ganado.
- Si es diseño confuso (reglas que no se entienden, botones que no se ven), explica en el juego, no solo en el chat: reglas en pantalla, pistas visuales, vista previa.

## 4. Probar
- Añade o amplía un test en `herramientas/test/` que falle sin el arreglo.
- Corre `node herramientas/auditar.mjs --rapida`. Si tocaste la interfaz, añade el humo y mira las capturas.
- Si tocaste textos, revisa la voz del personaje en `secreto/resumen.md`. Si son muchas líneas, pide una revisión rápida al agente `lector-independiente`.

## 5. Publicar
- Trabaja en una rama `revision/<tema>` con push (así se ve en GitHub). Después usa la skill **`publicar`**.
- Respóndele a Mario en 2–3 líneas:
  - qué estaba mal;
  - qué cambió;
  - que abra el juego con internet.
- Si el arreglo cambia algo que él ya jugó, dile cómo verlo.
