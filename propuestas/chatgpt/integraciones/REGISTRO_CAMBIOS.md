# Registro de cambios · Pokémon Infinite

## 2026-11-12 · Propuesta de sistemas narrativos y lúdicos (ChatGPT)

- **Repositorio:** Klymapo/PKM-INFINITE.
- **Rama de trabajo:** chatgpt/sistemas-narrativa-juego-20261112.
- **Añadido (sin cambiar nada preexistente):** generador de historias con Ollama local + borradores en formato guion propio, director de ritmo y mecánicas, simulador de recorridos Ink con inkjs optativo, catálogo de fuentes/licencias, muestra no canónica, documentación y prueba local.
- **Alcance:** solo propuestas/chatgpt/integraciones/.
- **No tocado:** main, app/, motor de combates, bloques, archivos de partidas, secretos, assets ni publicaciones Cloudflare.
- **Pendiente:** comprobación por Node 20 y revisión editorial/técnica por Elio antes de integrar borradores al juego.
- **Precaución de licencias:** no se han incluido ni copiado archivos de Tuxemon (GPL-3.0), PokéRogue (AGPL-3.0) u otros juegos. inkjs se declara como dependencia opcional para herramientas fuera del runtime.
- **Registro maestro:** trasladar este movimiento al registro maestro del proyecto cuando Elio acepte la propuesta; no modificar documentos de continuidad privados desde esta rama.

## 2026-11-12 · Implementación validada en la rama

- Añadido compilador `compilar-aventura.mjs`: traduce un borrador a cinco puntos de interacción, combate con un entrenador válido, NPC, misión, decisiones y cuatro etapas de progreso con flags nuevos. Verifica especies, lugares e identificadores en el propio repositorio antes de escribir la propuesta.
- Añadida fábrica de un solo comando `crear-aventura.mjs`: usa un borrador JSON de prueba sin red, o Ollama local con modelo gratuito para proponer un texto nuevo, y después genera el paquete jugable más su plan. El contenido no se activa sin revisión.
- Añadidos `test-compilador.mjs` y `test-fabrica.mjs`, junto al workflow `.github/workflows/fabrica-historias.yml` (Node 22, sin claves ni servicios de pago).
- **Pruebas:** los últimos workflows de GitHub Actions para la rama terminaron con éxito: `43303024664` y `43303011766`. Incluyen flujo de generación completo, detección de colisiones y especies/lugares inexistentes, sintaxis y ausencia de modificaciones del checkout.
- **Cambios a la aplicación:** ninguno. Los cambios son exclusivamente nuevos archivos de autoría bajo `propuestas/chatgpt/integraciones/` y un nuevo workflow de CI; la carpeta `app/`, los datos de usuario y los capítulos existentes no se tocaron.
- **Alcance:** herramientas disponibles en el repositorio, pero las aventuras siguen requiriendo revisión editorial y su registro explícito en el juego antes de publicarse. Ollama se ejecuta en PC y no en Cloudflare ni en Android.
