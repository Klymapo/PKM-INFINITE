# Propuestas ChatGPT · lote 2026-10-11

Rama: `chatgpt/misiones-2026-10-11`. Solo propuestas; Claude revisa y decide la integración.

- `misiones/cg-aviso.js`: **El aviso que nadie oyó** (20–25 min). Lavanda y Azafrán; mensaje cancelado, decisión sobre cómo comunicar la verdad; recompensa: 2 Superpociones.
- `misiones/cg-puente.js`: **El puente no puntúa** (20–25 min). Celeste y Ruta 24; observar antes de juzgar, combate opcional niveles 53–54; recompensa: 1 Hiperpoción y 600 monedas.
- `misiones/cg-indice.js`: **El índice de los ausentes** (objetivo 60–90 min). Investigación en Azafrán, Celeste, casa_bill, Lavanda y k_ruta8; cuatro pruebas, deducción, verificación, decisión persistente y epílogo. Combate opcional niveles 54–55; recompensa: 1 Máxima Poción y 1200 monedas.
- `DISENO-EL-INDICE-DE-LOS-AUSENTES.md`: estructura, pistas, decisiones, dependencias y revisión técnica para Claude.
- `PREFLIGHT-2026-10-11.md`: comprobaciones de acceso y límites de trabajo.

**Estado:** escritura terminada, auditoría narrativa aprobada; pendientes las pruebas del motor al integrar. No se ha modificado `main`, `app/` ni `herramientas/`. Las imágenes corresponden a otra etapa.

## Arte 2026-10-11
- `img/retrato-kaori.png`: aprobado y subido.
- `img/retrato-rhi.png`: aprobado y subido.
- `AUDITORIA-ARTE-2026-10-11.md`: auditoría visual de 8 candidatos; los ocho PNG están subidos y aprobados. Continúan pendientes los demás retratos, postales, icono y título.

**Archivos de arte adicionales verificados:** `retrato-lila.png`, `retrato-sera.png`, `retrato-renata.png`, `retrato-irene.png`, `retrato-petra.png`, `retrato-ysolde.png` (todos en `img/`).

## Elenco A · 2026-11-02
Integración solicitada por Admin de los 28 sprites aprobados y atenuación de conversaciones. Ver `sprites-elenco/VERIFICACION.md` para alcance y pruebas.

- [HABILIDADES.md](HABILIDADES.md): Cápsula/Parche funcionales y personalización voluntaria de Golisopod.

## Serie de secundarias · 2026-11-12

Rama: chatgpt/misiones-cadena-20261112, desde main ebad8ebf. Autoría con el laboratorio integrado hoy.

- misiones/cg-faroles.js: cinco misiones enlazadas, diez tareas interactivas, diez decisiones, ensayos con curación y reintento, recuerdos y dos epílogos de recolección.
- series/faroles/INTEGRACION.md: alcance, herramientas realmente utilizadas, revisión editorial, resultados y pasos de integración por Elio.
- series/faroles/fuentes/: cinco borradores originales en JSON.
- series/faroles/crear-serie.mjs y cg-faroles.plan.json: construcción reproducible y planes generados con el director existente.
- series/faroles/probar-serie.mjs y PRUEBAS.json: 2 048 rutas sobre el intérprete real con dobles de UI/estado/batalla, seis puzles resueltos y minijuegos con 32 semillas por variante.

Estado: entrega candidata con revisión independiente y pruebas específicas aprobadas. No está registrada en app/content/comunidad/lista.js, no se fusionó main ni se publicó en el móvil. La auditoría global, continuidad privada y comprobación visual se hacen al integrar.
