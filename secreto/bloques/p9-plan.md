# Pasada 9 · Secundarias en zonas ya jugadas (2026-10-28, «adelante con todo» de Mario)

Mario va por el B5 (Alola, `b05_m2` en Lilii). Equipo: Gyarados, Polteageist, Electivire, Delphox, Krookodile, Chandelure. En cajas: Lucario, Alakazam, Gallade, Heracross, Tyrantrum, Gigalith, Ampharos (Faro), Snorlax, Litten… 117 capturados.
Reglas de siempre: `docs/CONTENIDO.md` (formato), `secreto/personajes.md` (voces), `secreto/candidatas.md` (afinidad), `secreto/registro.md` (decisiones), CLAUDE.md §2.4. **Cero spoilers** en textos visibles. Ids con prefijo `p9_`. Todo con `new` en los spots (son zonas ya visitadas). Nada se renombra ni se borra. Cada misión `type: 'side'` con `est`, textos ≤ 240 caracteres con lugar/personaje de ancla, final y premio. Megas con historia, nunca tiradas.

## Reparto de archivos

| Archivo | Misiones |
|---|---|
| `app/content/b05/t10-p9-megas.js` | `p9_s_alakazamita`, `p9_s_chandelurita`, `p9_s_snorlium`, `p9_s_incinium` |
| `app/content/b05/t11-p9-kalos.js` | `p9_s_carreras` (Rhyhorn), `p9_s_magia` (Philippe), `p9_s_fosiles` (cantera) |
| `app/content/b05/t12-p9-hilos.js` | `p9_s_mareep` (rancho), `p9_s_bastien` (definitivo), `p9_s_buzon` (cartas) |

## Contratos

### t10 · Megas y cristales Z
- **Alakazamita** (`alakazite`) · Ciudad Azafrán (`azafran`, gimnasio `gym_azafran` o plaza). `cond: owns("alakazam") || owns("kadabra")` y `flag.b04_fin`. Sabrina (npc `sabrina`, canon, voz seca y amable) propone una «prueba de los tres espejos»: tres acertijos/elecciones de percepción + combate opcional con un Alakazam suyo (nv = `vars.cap`). Premio: Alakazamita + escena donde tu Alakazam «ve» la piedra antes que tú. Flags: `p9_alakazamita`.
- **Chandelurita** (`chandelurite`) · Pueblo Lavanda (`lavanda`), de noche. `cond: owns("chandelure") || owns("lampent") || owns("litwick")`. Dolores (npc `p7_dolores`) y el Señor Fuji (`fuji`): una vela que no se apaga en la Torre, tu Chandelure la «adopta». Sin spoilers de la ofrenda del B5 (`b05/t8-temporada.js`). Premio: Chandelurita. Flags: `p9_chandelurita`.
- **Snorlium Z** (`snorliumz`) · Hauoli (`paseo_hauoli` o `hauoli`). `cond: flag.mec_z && owns("snorlax")`. Festival de malasadas: concurso de comer con tu Snorlax (elecciones + un combate de exhibición contra un Snorlax local nv `vars.cap - 2`). Premio: Snorlium Z. Flags: `p9_snorlium`.
- **Incinium Z** (`inciniumz`) · Akala/Lilii (`lilii` o `area_wela`). `cond: flag.mec_z && (owns("incineroar") || owns("torracat") || owns("litten"))`. Kiawe (npc `kiawe` si existe en b05/npcs.js; si no, un bailarín del fuego original) enseña la danza; si tu Litten aún no es Incineroar, la escena lo celebra igual y el cristal se entrega al tenerlo en el equipo (comprobar `inParty`). Premio: Incinium Z. Flags: `p9_incinium`.

### t11 · Kalos
- **Carreras de Rhyhorn** · Pueblo Boceto (`boceto`). `cond: flag.mount_rhyhorn`. Pista repetible (una vez al día: `vars.p9_carrera_dia`) con la campeona retirada (reutiliza su npc del B1, ver `b01/t1-novarte.js` ~l.890 y `b01_s_rhyhorn`). Elecciones de pilotaje → tiempo; tabla de mejores tiempos en `vars.p9_carrera_mejor`. Premio por batirla: MT (una de Roca o Tierra que no exista aún en tiendas) + ₽ por carrera. Flags: `p9_carrera_1`.
- **El truco de Philippe** · Luminalia, Café Soleil (`cafe_soleil`). `cond: flag.b01_fin`. Concurso de magia; ayudas a Philippe (npc `philippe`) a que un truco le salga por fin: 3 pasos (buscar una baraja nueva en Novarte o la del museo, ensayar, actuar). Gancho con su baraja robada del B1 (`done.b01_s_philippe`). Premio: Pepita grande + una pieza para el museo (spot `pieza(...)` en `museo_sala_kalos`, ver `b05/t7-museo.js`). Flags: `p9_magia`.
- **Fósiles en la cantera** · Petroglifo (`excavacion` / negocio `p7_excavacion`). `cond: partner("p7_excavacion")`. Amplía el negocio (`ventures: { p7_excavacion: { ... } }`, mismo id, ver `docs/CONTENIDO.md` §13 y `b04/t6-negocios.js`): nueva mejora «Zanja profunda» (₽30 000) que produce 1 fósil al azar cada 5 días (entre `helixfossil`, `domefossil`, `oldamber`, `rootfossil`, `clawfossil`, `skullfossil`, `armorfossil`, `coverfossil`, `plumefossil`, `jawfossil`, `sailfossil` que existan en `app/data/items.json`) con escena del Dr. Lazare (`cientifico_fosiles`). Flags: `p9_zanja`.

### t12 · Hilos
- **Las cinco Mareep** · Rancho Prado (`rancho_aurelio`). `cond: flag.b03_rancho_sobrina || flag.b03_rancho_jugador` (Adela lleva el rancho; si `flag.b03_rancho_lemnis`, variante corta sin misión: una Mareep perdida). Adela (npc `sobrina`) tiene un lío por oveja: Copito se escapa al Monte Mortero, Borla no da lana (necesita `moomoomilk`), Nube se pelea con el Wooloo Bizcocho de la Ruta 5 (viaje a Kalos: `ruta5` tramo 6), Algodón quiere ser montura (no puede) y Chispita sigue asustadiza (una noche con ella). `parts` en la misión. Premio: **Lana Eléctrica** (objeto `p9_lanaelectrica`, equipable: +Velocidad el primer turno, o un `read` de recuerdo si el motor no permite objetos nuevos de combate) y una Mareep shiny opcional que se queda en el rancho trabajando. Flags: `p9_mareep_*`.
- **Bastien, la definitiva** · Alola, Aether (`aether_clinica`) o Hauoli. `cond: flag.b05_bastien_rompe || flag.b05_bastien_sigue`. Revancha con su equipo completo evolucionado (Greninja, Talonflame, lo que tenga en `b05`; nv `vars.cap`, 6 Pokémon, ofrece curar antes). Si ganas: te da la **Greninjita** (`greninjite`) «porque ya no la necesita» (variante de diálogo según rompe/sigue). Flags: `p9_bastien_final`, entrenador `p9_bastien_6` con `npc: 'bastien'`.
- **El buzón del ático** · Tu cuarto (`atico_cuarto`, requiere `partner("b05_atico")`). Spot «El buzón de la puerta» con cartas (`items` con `read`, pocket `key`) que aparecen según flags: Noa (`flag.b04_noa_celeste`), Rhi (`flag.b04_rhi_tren` o `b05_rhi_wela`), Lila (`flag.b03_lila_fin || flag.b03_sylveon`), Kaori (`flag.b04_kaori_paso`), Adela (`flag.b03_rancho_sobrina`), Lucien (`vars.lucien_viaje`). Cada carta: 1 vez, voz del personaje, referencias a decisiones reales de `registro.md`, sin spoilers de bloques futuros. Rotom avisa con `new` cuando hay carta nueva. Sin misión; solo spots y objetos. Flags: `p9_carta_<quien>`.

## Lo que no
- Nada de Pokémon dibujados ni assets. Nada que cambie `BLOCKS`, ids publicados ni `index.js` de b05 (ya están importados los tres archivos). No toques otros archivos.
