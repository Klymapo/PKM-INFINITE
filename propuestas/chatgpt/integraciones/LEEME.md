# Laboratorio de historias + mecánicas · Pokémon Infinite

**Estado:** prototipo de autoría aislado. NO instalado en el juego, NO publicado, NO alteró capítulos, salvados, motor de Showdown, app/, herramientas/ ni main. Disponible en rama chatgpt/ para que Elio revise qué adoptar.

## Qué se integró de verdad
- **Generación narrativa local:** generar-historia.mjs consulta por HTTP *solo* a Ollama local, usando Qwen3 4B Instruct (gratuito, Apache-2.0). Crea un borrador JSON y un módulo JS con estructura nativa de guion: NPC, misión, dos decisiones, flags exclusivos y callbacks posteriores. NO introduce elementos en el juego.
- **Director de juego propio:** director-juego.mjs produce un plan reproducible de ocho momentos que alterna convivencia, exploración, decisiones, combate y consecuencias. No inventa Pokémon, entrenadores, recompensas ni niveles.
- **Ink real, optativo:** simular-ink.mjs usa la dependencia MIT inkjs 2.4.0 para explorar rutas en archivos Ink previamente compilados a JSON. Solo funciona como prueba externa; no reemplaza guion.js.
- **Referencias externas:** FUENTES.json documenta bibliotecas, repositorios, licencias y límites; no copia código ni assets ajenos. PokéRogue/Tuxemon: solo inspiración, por copyleft. Los repositorios Godot pertenecen a una evaluación futura de LABEY, no a esta PWA.
- **Pruebas:** test-integraciones.mjs valida estructura, decisiones, flags y ritmo sin red ni modelos.

## Uso en una computadora (Node >=20)
1. En esta carpeta, ejecutar: npm install
2. Prueba local sin IA: node test-integraciones.mjs
3. Prueba de generación sin IA (para verificar el flujo y la salida):
   node generar-historia.mjs --desde-json ejemplo.json --slug ejemplo --salida /tmp/pkm-borradores
4. Para generación auténtica: instalar Ollama gratuitamente en PC, descargar el modelo con:
   ollama pull qwen3:4b-instruct
   y, con Ollama local encendido, ejecutar:
   node generar-historia.mjs --idea "una misión con personajes y consecuencias" --slug mi_historia --salida /tmp/pkm-historias
5. Para planificar mecánicas:
   node director-juego.mjs --semilla "una promesa" --salida /tmp/plan-pkm.json
6. Para probar historias Ink creadas en Inky y exportadas a JSON:
   node simular-ink.mjs --archivo historia-compilada.json --salida /tmp/rutas-ink.json

No se requiere instalar Ink para ejecutar el generador: el paquete inkjs solamente se utiliza en la simulación de historias Ink. Los comandos de ejemplo usan /tmp, ajusta las rutas en Windows. Ollama y el modelo pueden requerir varios GB de almacenamiento y memoria; NO se ejecutan dentro del teléfono ni en Cloudflare.

## Contrato de publicación (responsabilidad de Elio)
- Leer docs/CONTENIDO.md y docs/COLABORACION.md; mantener protegida la carpeta secreto/.
- Un archivo cg-*.js generado es una **PROPUESTA**, no una misión lista para publicar: todavía no se conectó a un lugar ni a un combate real.
- Validar y añadir a propuestas/chatgpt/misiones/, y solo cuando se decida adoptarlo, conectar mediante los mecanismos oficiales con ids nuevos cg_ y patches. Nunca reemplazar definiciones existentes.
- Ejecutar las pruebas actuales: herramientas/validar.mjs, herramientas/recorrido.mjs, herramientas/disenador.mjs y pruebas de humo, además del test de estas integraciones.
- Auditoría editorial obligatoria: personajes con voz y presencia, tensión significativa, coherencia Pokémon, decisiones que no sean obvias y consecuencias a mediano plazo. Nada que parezca otra jornada de auditoría.
- El flujo automático NO crea una trama final de 6-8 horas: crea un borrador breve para desarrollo y revisión. Las escenas de exploración/combate son marcadores narrativos; Elio debe construir los encuentros jugables.
- No publicar contenido con errores, spoilers fuera de secreto/ o que altere una partida existente.

## Estructura
- generar-historia.mjs: modelo IA local -> narrativa validada -> estructura JS nativa.
- director-juego.mjs: planificación lúdica con semilla.
- simular-ink.mjs: pruebas de rutas con inkjs, si se desea.
- test-integraciones.mjs + ejemplo.json: revisión inicial offline.
- FUENTES.json: procedencia y compatibilidad.
- REGISTRO_CAMBIOS.md: bitácora de incorporación.

## Límite claro
No se clonó un videojuego completo ni se agregó un motor diferente. Se adoptaron interfaces/patrones compatibles y una biblioteca opcional sin afectar el juego. La integración en el runtime requiere aprobación y pruebas separadas de Elio.

## Integración funcional · 12 de noviembre de 2026

Se añadió un **compilador jugable** que transforma un borrador JSON en un paquete comunitario con cinco puntos de interacción dentro de un lugar ya existente, un combate Pokémon genuino (simulador actual del juego), dos decisiones guardadas como flags exclusivos, objetivos en el hub y un cierre que no puede repetirse. Se verifica la especie con `app/data/species.json`, y el lugar y las colisiones de ids mediante el registro actual. No se ejecuta ni publica nada en el juego al generar el paquete.

### Ruta rápida: un comando

Dentro de `propuestas/chatgpt/integraciones/`:

```sh
# Primer ensayo sin modelo de IA ni internet
node crear-aventura.mjs --desde-json ejemplo.json --slug ejemplo_1 --lugar luminalia --especie pidgeot --nivel 50

# Generación de historia local con Ollama (requiere un ordenador y el modelo descargado)
ollama pull qwen3:4b-instruct
node crear-aventura.mjs --idea "Un personaje cercano hace una promesa difícil de cumplir" --slug promesa --lugar luminalia --especie pidgeot --nivel 50

# Pruebas reproducibles (Node >=20; no necesitan npm install ni Ollama)
npm test
```

El valor de `--lugar` debe ser un id **real de ciudad o subárea con spots**, no una ruta. El de `--especie` debe ser un id real en `app/data/species.json`; `--nivel` entero 1-100 y adecuado a la aventura. Los ejemplos son pruebas técnicas, no propuestas para el balance final. `--salida` es opcional; por defecto genera bajo `propuestas/chatgpt/misiones/`, nunca en `app/`.

Se producen tres archivos `cg-<slug>.js` (paquete con forma nativa), `cg-<slug>-borrador.json` (fuente) y `cg-<slug>.plan.json` (plan y advertencias). **No se sobrescriben archivos**. Los nombres e ids se comprueban para evitar colisiones y permitir que Elio revise todo sin spoilers para el jugador. Antes de adoptar un paquete, Elio comprueba los diálogos, la continuidad, el nivel del combate, el personaje y las condiciones, e importa explícitamente el módulo a `app/content/comunidad/lista.js` como parte de una publicación supervisada.

### Pruebas automáticas

El workflow `.github/workflows/fabrica-historias.yml` ejecuta en GitHub Actions la comprobación sintáctica y `npm test` ante cambios del laboratorio. La prueba incluye un flujo completo offline en un directorio temporal, conflictos de nombre, rechazo de especies y lugares inexistentes, compatibilidad con los comandos del motor y comprobación de que no se modificaron archivos del checkout.

**Importante:** Ink/inkjs permanece como opción de simulación de historias externas. El juego no necesita Ink, npm ni Ollama para jugarse offline. No se instalaron bibliotecas externas dentro de `app/`. La generación automática se ejecuta en una computadora local, no en el celular ni Cloudflare Workers.
