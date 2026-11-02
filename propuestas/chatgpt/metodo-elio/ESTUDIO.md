# Método observable de Elio

## Fuentes y alcance

Instantánea: [aa2b0b0](https://github.com/Klymapo/PKM-INFINITE/commit/aa2b0b05dcf83cb73bac4fb26aeb22ee9d41a5d0), main al iniciar el estudio. El historial reciente declara autor Claude. Las conclusiones se basan en archivos y diffs, no en acceso al razonamiento privado de Elio. Verificar la fuente vigente antes del siguiente trabajo.

## Arquitectura que usa

| Capa | Fuente | Responsabilidad |
|---|---|---|
| Datos de contenido | [docs/CONTENIDO.md](../../../docs/CONTENIDO.md) | Objetos planos, ids estables, condiciones como cadenas y comandos del intérprete |
| Registro | [content.js](../../../app/js/content.js) | C agrega bloques y combina patches; no sustituye la partida |
| Estado | [state.js](../../../app/js/state.js) | G, carga/exportación/importación, migración y escenas atómicas |
| Comportamiento | [guion.js](../../../app/js/guion.js), [pc.js](../../../app/js/pc.js) | Ejecutar comandos o lógica sin depender del DOM |
| Presentación | [core.js](../../../app/js/ui/core.js), [screens.js](../../../app/js/ui/screens.js) | DOM con helper h(), hooks y promesas para acciones del usuario |
| Comprobaciones | [auditar.mjs](../../../herramientas/auditar.mjs), [pc-multi-test.mjs](../../../herramientas/test/pc-multi-test.mjs) | Validación, invariantes, recorridos y pruebas en móvil |
| Entrega | [build-sw.mjs](../../../herramientas/build-sw.mjs), [wrangler.jsonc](../../../wrangler.jsonc) | SW generado desde hash del contenido; solo app/ se sirve al móvil |

## Reglas explícitas y evidencia de aplicación

| Hallazgo | Evidencia | Aplicación para Argos |
|---|---|---|
| Confirmar versión, reproducir y cambiar hipótesis si el fallo persiste | [.claude/skills/bug-reportado](../../../.claude/skills/bug-reportado/SKILL.md) | Investigar el flujo real antes de seguir ajustando parámetros |
| Conservar partidas | migrate(), fixBoxes(), escenas atómicas en state.js | Añadir campos con defaults; conservar excedentes y estados válidos |
| Contratos de retorno explícitos | moveMany() devuelve moved/noRoom/kept/already | La UI puede explicar el resultado sin repetir reglas |
| Verificar invariantes | pc-multi-test: casi lleno, duplicados, equipo mínimo, conservación total | Probar que nadie desaparece ni se duplica, además del camino feliz |
| Escritura por paquetes | [.claude/skills/bloque-por-paquetes](../../../.claude/skills/bloque-por-paquetes/SKILL.md) | Contrato, archivo propietario, avance y traspaso antes de trabajo largo |
| Integrar y revisar por separado | [.claude/agents/integrador](../../../.claude/agents/integrador.md), [lector-independiente](../../../.claude/agents/lector-independiente.md) | Distinguir implementación, integración, revisión y publicación |
| Ahorrar relectura y cómputo | commits 3e7e07f y 0e417a3; ids.mjs, checkpoints, rápida y guardar.sh | Preferir herramientas existentes y leer contexto de manera gradual |
| Interfaz pensada para el dispositivo | bug-reportado y CLAUDE.md: 412×860, humo, capturas, controles táctiles | Un test de lógica no demuestra que el botón sea usable |

## Dos diffs que explican el método

[459e3b5](https://github.com/Klymapo/PKM-INFINITE/commit/459e3b5d447bc34eecc858d2fa88956c92903331) cambia la captura de fotografía de click a pointerdown y añade una tolerancia temporal; mantiene teclado. El comentario explica el problema percibido en móvil y por qué la interacción anterior llegaba tarde.

[0537ad8](https://github.com/Klymapo/PKM-INFINITE/commit/0537ad835df4f9a76ae6bf67a466eb71c32218c9) deja de llamar al minijuego y hace que el hook UI.photo resuelva con el mismo tipo de resultado, ahora exitoso. Actualiza documentación y mantiene el código anterior. La lección es respetar la petición real y conservar el contrato, no defender una mecánica a toda costa. No se deduce que toda simplificación deba eliminar código.

## Estilo concreto

- JavaScript vanilla, módulos ES e imports relativos con extensión. Sin introducir un framework para continuar esta base.
- Tabulaciones, comillas simples, punto y coma, const/let, retornos tempranos y helpers pequeños; seguir el archivo vecino cuando difiera.
- Nombres mixtos ya establecidos: G/C/D, moveMany, guardar, guion. No traducir interfaces publicadas por estética.
- Comentarios de cabecera: responsabilidad, consumidor, prueba o documento relacionado. Comentarios interiores: causa, compatibilidad y regla del usuario.
- Objetos planos y comandos declarativos donde ya hay contrato; lógica de dominio en su módulo y UI en su capa.
- Defaults con ||= y ??= para partidas antiguas. now como argumento en lógica temporal comprobable, como finishChapter().

## Lo que no puede concluirse

No se revisó toda la base ni la continuidad narrativa. Tener pruebas en el historial no demuestra que cada cambio se escribiera con TDD estricto. Los números de bloques, semillas y dimensiones son reglas de este proyecto, no mandamientos para otros lenguajes.

Hay diferencias entre reglas humanas y automatización: auditar.mjs registra ciertos graves de Tester/Designer/Superfan como advertencias, mientras CLAUDE.md exige corregir los graves correspondientes antes de publicar. Un código de salida 0 por sí solo no basta para afirmar cumplimiento de todas las reglas. La rápida tampoco ejecuta todas las pruebas del motor: TESTS_RAPIDA solo incluye cine y minijuegos, además de validar/tester/bots.

## Transferencia a otros proyectos

Conservar principios —contratos, continuidad, reproducción, pruebas del usuario y entrega verificable— y adaptar lenguaje, almacenamiento y herramientas. No copiar G/C, módulos de Pokémon, valores numéricos ni permisos de publicación a otra app. Para Python, por ejemplo, reutilizar los módulos y pruebas existentes del proyecto en lugar de introducir JavaScript.
