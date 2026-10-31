# Bloque 7 · avance por paquetes

Rama: `trabajo/b07` (se fusiona en `main` solo en el paso 6). Cada sesión hace el siguiente paso pendiente, lo marca aquí con fecha y tokens, hace commit y push.

| Paso | Qué | Estado |
|---|---|---|
| 1 | Plan, encargo y estructura (`b07-plan.md`, `b07-encargo.md`, comunes de `app/content/b07/`, stubs t0–t5) | **hecho** (2026-10-30, sesión de día) |
| 2 | Tramos T0 y T1 | pendiente |
| 3 | Tramos T2 y T3 | pendiente |
| 4 | Tramos T4 y T5 | pendiente |
| 5 | Integración, arte, museo, balance y 24 recorridos hasta `b07_fin` | pendiente |
| 6 | Revisión ligera, auditoría y publicación | pendiente |

## Notas por paso

### Paso 1 · 2026-10-30 · hecho

**Resumen sin spoilers (lo puede leer Mario):** el Bloque 7 ya tiene plan, encargo y estructura. Será una región nueva, unas 15 horas en seis tramos, con dos medallas, una mecánica nueva, tres iniciales, un negocio nuevo y las tres ideas de ChatGPT aprobadas (dos como secundarias grandes y opcionales y una dentro de la historia principal). Ya están escritos los personajes nuevos, las misiones, las tiendas, las medallas, el negocio y tres cartas del Buzón para personajes que tocaba volver a ver. El bloque carga y valida sin errores, pero todavía no se puede jugar.

**Para el paso 2 (T0 y T1):**
- Lee `b07-plan.md` y `b07-encargo.md` enteros; las secciones «T0» y «T1» del encargo son tu guion. La Liga de los Siete Oficios va **dentro** de `t1-piston.js` (no tiene archivo propio).
- Validar: `INFINITO_EXTRA=b07 node herramientas/validar.mjs`. Los avisos `[b07] … pendiente` que imprime `index.js` (vuelos, `parts.where`, `challenges.trainer`, `venture.loc`) son normales hasta que existan los lugares y entrenadores de los tramos; los de T0 y T1 deben desaparecer al terminar el paso 2.
- El enganche `b07_inicio` ya está en `comun.js`; T0 escribe el cruce (`b07_cruce`) y los `patches` de las Puertas viejas.
- **Cada `diary` va tres veces** (rama del Eco): constantes en el encargo.
- Ids de objetos que vayan al Buzón, sin guiones bajos (`mail.item` se busca tal cual).
- Pendiente para el paso 5 (motor): Dinamax solo en Galar o en Fisura, comando para dar el factor Gigamax (Sopa Maxi), comprobar que los rivales usan `gmax`. Decisiones tomadas sin Mario: plan §14.
