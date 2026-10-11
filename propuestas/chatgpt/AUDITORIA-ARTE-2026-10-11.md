# Auditoría de arte · 2026-10-11

**Rama:** `chatgpt/misiones-2026-10-11` · **Estado:** ENTREGA PARCIAL / BLOQUEO DE SUBIDA BINARIA.

## Resultado de esta noche

Se prepararon ocho retratos de personajes originales ya documentados, en dos tandas de cuatro. Los diseños son pixel art de cuadrícula 64×64, ampliados sin interpolación a PNG indexados de **256×256 px**, fondo opaco, luz superior izquierda y marco compartido. La paleta se centra en azul marino, crema, dorado y acentos de aura. No se incorporaron Pokémon ni personajes canónicos.

| Lote | Archivo | Resultado | Rasgo distintivo |
|---|---|---|---|
| 1 | `img/retrato-kaori.png` | **APROBADO Y SUBIDO** | moño oscuro, palillo, túnica crema y verde, mirada reposada |
| 1 | `img/retrato-rhi.png` | **APROBADO Y SUBIDO** | coleta alta roja, chaqueta deportiva azul, dorsal 9 y ceja marcada |
| 1 | `img/retrato-lila.png` | **BLOQUEADO (SUBIDA)** | pelo plata corto con mechón menta, mejillas sonrojadas |
| 1 | `img/retrato-sera.png` | **BLOQUEADO (SUBIDA)** | bob negro, traje azul oscuro, expresión reservada |
| 2 | `img/retrato-renata.png` | **BLOQUEADO (SUBIDA)** | rizos, gafas redondas, auriculares y micro, gabardina mostaza |
| 2 | `img/retrato-irene.png` | **BLOQUEADO (SUBIDA)** | sombrero ancho, trenzas azules, gafas y libreta |
| 2 | `img/retrato-petra.png` | **BLOQUEADO (SUBIDA)** | coleta naranja, gafas de protección y chaleco de campo |
| 2 | `img/retrato-ysolde.png` | **BLOQUEADO (SUBIDA)** | capucha gris, ojos miel, pequeña cicatriz en barbilla |

**Importante:** BLOQUEADO no significa aprobado en el repositorio. Los seis archivos están generados y revisados localmente, pero NO se encuentran en la rama; no deben darse por entregados a Claude. Solo Kaori y Rhi tienen PNG verificados por SHA de GitHub.

## Auditoría visual: dos rondas

- **Ronda 1:** inspección de hoja de contactos, siluetas, escala de móvil y grises. Se corrigieron la visibilidad del moño de Kaori, la forma del dorsal de Rhi, el contraste de solapas de Sera, el tamaño de las gafas de Irene, los goggles de Petra y la cicatriz de Ysolde.
- **Ronda 2:** nueva inspección de la hoja de contactos, siluetas y grises. Ocho siluetas diferenciables; caras, cejas y bocas legibles a 256 px. El solapamiento máximo de siluetas de cabeza/cuello fue **IoU 0,916 (Rhi/Petra)**, inferior al umbral práctico 0,93 indicado en `docs/ARTE.md`.
- **Control técnico:** todos los candidatos tienen 256×256 px, PNG indexado, 13–18 colores, bordes nítidos sin suavizado y peso entre **1.044 y 1.265 bytes**, muy por debajo de 300 KB. No hay manos ni dedos visibles, así que no hay problemas anatómicos de manos.
- **Limitación artística:** son bustos pixelados simplificados, no ilustraciones detalladas; antes de integrarlos conviene comprobar la afinidad estética con los retratos procedurales del juego en móvil.

## Bloqueo real

La conexión de GitHub permitió crear y publicar correctamente los blobs binarios de Kaori y Rhi; al continuar, la herramienta rechazó repetidamente las siguientes operaciones de creación de blobs mediante comprobaciones de seguridad. No se intentó sustituir los PNG por texto ni se marcó como subido ningún archivo no persistido.

**Siguiente paso:** reintentar subir los seis PNG restantes cuando la operación binaria esté disponible, o incorporarlos desde el paquete ZIP de respaldo entregado en la conversación. No sobrescribir Kaori ni Rhi sin nueva auditoría. No se modificó `main`, `app/`, `herramientas/` ni `secreto/`.

## Pendientes futuros

Además de seis retratos bloqueados por subida, quedan personajes originales del listado de tareas (Ulises, Gaspar y Don Aurelio), postales, icono y pantalla de título. El pipeline visual **todavía no está completo**.
