# Pokémon Infinito · auditoría de repositorio (2026-10-12)

**Dictamen:** CONSERVAR público e independiente. No fusionar con otras aplicaciones, ni eliminar recursos, save files o narrativas sin consentimiento específico.

**Inventario Git inspeccionado:** 247 archivos rastreados, entre ellos `app/lib/ps-sim.js` (~2.33 MB), `app/data/learnsets.json` (~1.41 MB), `app/lib/battle-text.js` (~995 KB) y `app/data/species.json` (~704 KB). Son dependencias/datos del runtime, **no basura**.

**Observaciones verificadas:**
- `wrangler.jsonc` publica solamente `./app`; nunca ampliar el directorio a la raíz por comodidad.
- `app/sw.js` está generado y mantiene una lista de recursos offline, además de una caché de sprites externos. Puede ser necesario abrir ciertos recursos online al menos una vez.
- El repositorio contiene material `secreto/`, archivos de respaldo y herramientas de prueba. GitHub público significa **contenido del repositorio público**, aunque el desplegado web solo sirva `app`.
- No se observaron workflows GitHub Actions en `main`; esto **no certifica** tests, compilaciones ni despliegue a Cloudflare. No declarar pruebas superadas sin ejecutarlas.

**Mejora realizada:** README técnico y advertencias explícitas de privacidad/offline, sin modificar JavaScript, CSS, partidas, binarios, rutas, narrativa ni configuración de despliegue. **Pendiente para desarrollo separado:** automatizar comprobación de PWA/exports y revisar licencias/procedencia de recursos si se pretende distribuir fuera del uso personal.

**No son candidatos a borrado automático:** motores, imágenes, sprite cache, JSON de especies o partidas incluidas deliberadamente como almacenamiento.
