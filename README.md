# Pokémon Infinito · prototipo móvil

> **Empieza aquí:** [Guía fácil: qué es, dónde está y qué conservar](docs/GUIA_RAPIDA.md). No necesitas leer la documentación técnica para orientarte.


**Estado: experimento personal en desarrollo**, no juego oficial ni producto terminado. Este repositorio **público se mantiene separado**, por decisión del propietario, para conservar código, recursos y copias de trabajo.

## Abrir y usar

La aplicación web se encuentra en `app/`. Para publicarla como recursos estáticos, `wrangler.jsonc` apunta **exclusivamente** a `./app`. No cambiar esta ruta a la raíz del repositorio: `secreto/`, herramientas y documentos no son parte del sitio desplegado.

El sitio es una PWA con service worker; tras cargar los recursos necesarios, permite continuar sin conexión. Los recursos gráficos externos solo están disponibles offline si el navegador los ha almacenado previamente. **La existencia del código en GitHub no garantiza un despliegue activo**: revisa la URL en tu panel de Cloudflare.

## Guardados y privacidad

- Antes de limpiar datos del navegador, cambiar de dispositivo o probar una versión nueva, **exporta una copia de la partida desde la aplicación** y verifica que puedas importarla.
- Un archivo de guardado que permanezca en este repositorio público —incluidos ZIP— podrá ser leído por terceros. Mantenerlo público es una decisión consciente de almacenamiento: no añadir tokens, contraseñas ni información privada.
- No editar manualmente `app/sw.js`; el generador oficial es `herramientas/build-sw.mjs`. Regenerar y probar antes de publicar cambios a `app/`.
- `app/` es el runtime; `secreto/` guarda contenido narrativo y puede contener spoilers. Mantener cada cosa separada.

## Auditoría de mantenimiento

Consulta [el inventario técnico de octubre de 2026](docs/AUDITORIA_REPOS_2026-10-12.md). Este ciclo conserva el motor, las rutas, los personajes, los assets y el historial del repositorio; la limpieza es documental y no cambia el comportamiento del juego.
