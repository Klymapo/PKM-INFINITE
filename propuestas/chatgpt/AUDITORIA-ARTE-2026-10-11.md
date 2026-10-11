# Auditoría de arte · 2026-10-11

**Rama:** `chatgpt/misiones-2026-10-11` · **Estado:** COMPLETO: 8/8 retratos aprobados y verificados en GitHub.

## Resultado de esta noche

Se prepararon ocho retratos de personajes originales ya documentados, en dos tandas de cuatro. Los diseños son pixel art de cuadrícula 64×64, ampliados sin interpolación a PNG indexados de **256×256 px**, fondo opaco, luz superior izquierda y marco compartido. La paleta se centra en azul marino, crema, dorado y acentos de aura. No se incorporaron Pokémon ni personajes canónicos.

| Lote | Archivo | Resultado | Rasgo distintivo |
|---|---|---|---|
| 1 | `img/retrato-kaori.png` | **APROBADO Y SUBIDO** | moño oscuro, palillo, túnica crema y verde, mirada reposada |
| 1 | `img/retrato-rhi.png` | **APROBADO Y SUBIDO** | coleta alta roja, chaqueta deportiva azul, dorsal 9 y ceja marcada |
| 1 | `img/retrato-lila.png` | **APROBADO Y SUBIDO** | pelo plata corto con mechón menta, mejillas sonrojadas |
| 1 | `img/retrato-sera.png` | **APROBADO Y SUBIDO** | bob negro, traje azul oscuro, expresión reservada |
| 2 | `img/retrato-renata.png` | **APROBADO Y SUBIDO** | rizos, gafas redondas, auriculares y micro, gabardina mostaza |
| 2 | `img/retrato-irene.png` | **APROBADO Y SUBIDO** | sombrero ancho, trenzas azules, gafas y libreta |
| 2 | `img/retrato-petra.png` | **APROBADO Y SUBIDO** | coleta naranja, gafas de protección y chaleco de campo |
| 2 | `img/retrato-ysolde.png` | **APROBADO Y SUBIDO** | capucha gris, ojos miel, pequeña cicatriz en barbilla |

**Verificación final:** los ocho PNG fueron publicados en la rama y leídos de vuelta desde GitHub; se verificaron sus SHA. Ninguno permanece bloqueado.

## Auditoría visual: dos rondas

- **Ronda 1:** inspección de hoja de contactos, siluetas, escala de móvil y grises. Se corrigieron la visibilidad del moño de Kaori, la forma del dorsal de Rhi, el contraste de solapas de Sera, el tamaño de las gafas de Irene, los goggles de Petra y la cicatriz de Ysolde.
- **Ronda 2:** nueva inspección de la hoja de contactos, siluetas y grises. Ocho siluetas diferenciables; caras, cejas y bocas legibles a 256 px. El solapamiento máximo de siluetas de cabeza/cuello fue **IoU 0,916 (Rhi/Petra)**, inferior al umbral práctico 0,93 indicado en `docs/ARTE.md`.
- **Control técnico:** todos los candidatos tienen 256×256 px, PNG indexado, 13–18 colores, bordes nítidos sin suavizado y peso entre **1.044 y 1.265 bytes**, muy por debajo de 300 KB. No hay manos ni dedos visibles, así que no hay problemas anatómicos de manos.
- **Limitación artística:** son bustos pixelados simplificados, no ilustraciones detalladas; antes de integrarlos conviene comprobar la afinidad estética con los retratos procedurales del juego en móvil.

## Incidencia de subida resuelta

La herramienta rechazó temporalmente algunas subidas binarias. Se resolvió reserializando los PNG sin modificar sus píxeles y repitiendo las operaciones autorizadas. Los ocho archivos están ahora publicados, comprobados por SHA y listos para revisión de Claude.

**Siguiente paso:** Claude puede revisar los ocho retratos. No sobrescribir versiones aprobadas sin nueva auditoría. No se modificó `main`, `app/`, `herramientas/` ni `secreto/`.

## Pendientes futuros

Quedan personajes originales del listado de tareas (Ulises, Gaspar y Don Aurelio), postales, icono y pantalla de título. El pipeline visual **todavía no está completo**.
