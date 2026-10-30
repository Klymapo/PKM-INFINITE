# P15 · Casos de detective con Mauro Quintana (2026-10-30)

Archivo: `app/content/b06/t17-casos.js` (parte del bloque 6). Motor `app/js/casos.js`, pantalla `app/js/ui/casos-ui.js`.

**Flujo:** carta del Buzón (`det_cN`, objeto `detcartaN`) → guion `det_cN_carta` (pone `flag.det_cN_carta`, misión `det_cN` en `ir`) → spot 🕵️ en la ciudad (`cond: flag.det_cN_carta && !done.det_cN`, `new` hasta `flag.det_cN_visto`) → `det_cN_intro` (misión a `investigar`) → `det_cN_seguir` (`{ case }`). Resuelto: `rep.policia +1`, `flag.det_cN_ok`, misión `hecha` y cerrada. Fallido (dos acusaciones mal): `flag.det_cN_escapo`, misión `escapado` y cerrada. Salir a medias no rompe nada: el spot sigue ahí.

| Caso | Ciudad | Carta llega | Rep | Premio |
|---|---|---|---|---|
| det_c1 Pâtisserie Mirabelle | Luminalia | `b04_fin` + visitó Luminalia, 1 día | 10 | Cápsula Habilidad + Chapa Plateada |
| det_c2 Cuenco Luna de Invierno | Iris | `det_c1_carta` + `b03_fin` + Iris, 3 días | 12 | Chapa Dorada |
| det_c3 Reloj parado | Azafrán | `det_c2_carta` + `b04_fin` + Azafrán, 3 días | 15 | Parche Habilidad |

Las cartas 2 y 3 comentan en una línea (guion, no objeto) si el caso anterior se resolvió (`det_cN_ok`) o se escapó (`det_cN_escapo`); si aún no lo ha hecho, no dicen nada.

Cinemática: solo en `det_c1_intro` (llegada de Quintana y Lupa, 5 frames).

---

## Caso 1 · El caso de la Pâtisserie Mirabelle (sencillo, ~25 min)

**Siniestro:** la lata con la recaudación del fin de semana desaparece del despacho entre el domingo 21:00 y el lunes 6:00. Ventana del despacho rota.

**Culpable: Florián Ducasse (repostero).**
- **Medios:** tiene llave; estaba dentro desde las 3:12.
- **Motivo:** cuatro plazos sin pagar de la moto; Solène le negó un adelanto. Quería ganar el concurso y «devolverlo».
- **Oportunidad:** llegó a las 3 (no a las 5 como dijo), cogió la lata y rompió la ventana **desde dentro** a las 4:50 para simular un robo. La lata, en el baúl de la moto.

**Camino de pistas:**
- Acera → `cristales` (rota desde dentro). Desbloquea el puesto de flores.
- Despacho → `alquiler` (falsa: Solène), `pendiente` (falsa: Amandine).
- Obrador → `horno` (encendido 3:12). Taquillas → `moto` (motivo de Florián).
- Puesto de flores (necesita `cristales`) → `florista`: acera limpia a las 4:30, golpe a las 4:50, solo luz en el obrador.
- Florián, pregunta «hora» → `hora` (dice 5:00).
- **Contradicción:** enseñar `horno` a Florián → `tres` (admite 3:00 pero insiste en que la ventana «ya estaba rota»).
- Enseñar `cristales` a Florián → `cerrojo` (la puerta de atrás tenía el cerrojo por dentro: nadie entró por ahí).
- Enseñar `alquiler` a Solène → `recibo` (lo pagó el sábado: aclara la pista falsa).
- Enseñar `pendiente` a Amandine → `arqueo` (se le cayó el sábado contando la caja con Solène: aclara).

**Prueba:** `florista`. La ventana se rompió a las 4:50 con la acera limpia hasta las 4:30, con luz solo en el obrador, donde Florián estaba desde las 3:12 (horno, y su propia admisión). Él dice que a las 3 ya estaba rota: mentira demostrada. Se rompió desde dentro (`cristales`) y nadie entró por la puerta (`cerrojo`).

**Pistas falsas:** aviso del casero (Solène) → recibo; pendiente de fresa (Amandine) → hoja de arqueo.

---

## Caso 2 · El caso del cuenco Luna de Invierno (medio, ~35 min)

**Siniestro:** el cuenco antiguo aparece roto dentro de su caja atada el lunes a las 6:00. El domingo hubo ceremonia con Don Haruki de invitado. Sumire dobló el seguro hace dos semanas. Quintana iba a revisarlo el jueves.

**Culpable: Don Haruki (tasador).**
- **Medios:** encargó hace tres semanas a un alfarero de Trigal una copia exacta (barro blanco, esmalte negro). Se llevó el cuenco dos días «para tasarlo» y devolvió la copia.
- **Motivo:** vendió el original a un coleccionista de fuera; su tienda va floja.
- **Oportunidad:** recomendó doblar el seguro (más dinero en juego, y la culpa a la dueña). Al saber que venía un perito a mirar de cerca, se ofreció a guardar el cuenco el domingo y partió la copia al envolverla. Ren solo ató el cordón.

**Camino de pistas:**
- Sala de té → `pedazos` (interior blanco y liso). Desbloquea la cocina.
- Cocina (necesita `pedazos`) → `peso` (290 g).
- Archivo → `ficha` (certificado: barro negro, interior rugoso, 380 g), `poliza` (falsa: Sumire).
- Ventana → `aipom` (falsa: Ren y su Aipom).
- **Cruce de dos pistas:** `pedazos`+`peso` contra `ficha` → lo roto no es el cuenco auténtico.
- Ren «anoche» → `guardo` (lo guardó Haruki). Sumire «perito» → `revision` (Haruki sabía que venía el perito).
- Enseñar `poliza` a Sumire → `consejo` (la subida la aconsejó Haruki tras tenerlo dos días en su tienda).
- Enseñar `aipom` a Ren → `aipom_hora` (el Aipom entró a las 20:00; el cuenco se guardó a las 21:30: aclara).
- **Contradicción:** enseñar `ficha` a Haruki → `descripcion` (él describe el que tasó como blanco y liso, igual que los pedazos). Desbloquea el recibidor.
- Recibidor (necesita `descripcion`) → `encargo`.

**Prueba:** `encargo`. El recibo de la copia exacta, a su nombre y fechado una semana antes de llevarse el cuenco, demuestra que el cambio fue premeditado y suyo (el cuenco solo salió de la casa esos dos días, con él).

**Pistas falsas:** póliza doblada (Sumire) → consejo de Haruki; huellas de Aipom (Ren) → hora del Aipom.

---

## Caso 3 · El caso del reloj parado (difícil, ~45 min)

**Siniestro:** de madrugada, la caja fuerte de la Relojería El Segundero (Azafrán) aparece abierta con su combinación y sin el reloj de bolsillo de Don Anselmo. Un reloj de pared está parado a las 23:47. Puerta lateral abierta.

**Culpable: Octavio Lerma (coleccionista).**
- **Medios:** la combinación la oía cada mañana a las 10 (Don Anselmo la dice en voz alta porque ve mal). Al cerrar, salió el último por la lateral («ya cierro yo») y dejó el pestillo trabado con un horario del Magnetotrén doblado.
- **Motivo:** ofreció tres veces comprarlo; tres veces le dijeron que no.
- **Oportunidad:** tomó el Magnetotrén de las 22:05 a Trigal, entró en un hotel a las 22:40 (coartada), volvió en el de las 23:30 (llega 23:58) con su abono 0417, entró entre la 1:00 y las 2:00, abrió la caja, **paró el reloj de pared a mano en 23:47** para que el robo pareciera ocurrido mientras él estaba en Trigal, y se le cayó el billete de vuelta bajo la caja fuerte.

**Camino de pistas:**
- Tienda → `reloj` (23:47). Mesa de Don Anselmo → `codigo`. Garita → `rondas` (0:00 y 1:00 cerrado; 2:00 abierto). Puerta lateral → `pestillo` (horario con las 23:30 de Trigal subrayado).
- Nerea «cierre» → `salida` (Octavio salió el último y «cerraba él»).
- Nerea «reloj» (necesita `reloj`) → `cuerda` (cuerda para ocho días: lo pararon a mano). Desbloquea «La caja fuerte, de cerca».
- Caja fuerte (necesita `cuerda`) → `resguardo` (billete Trigal→Azafrán 23:30 de anoche, abono 0417).
- Octavio «viaje» → `ida` (su billete de ida, abono 0417).
- Enseñar `reloj` a Octavio → `hotel` (saca la coartada para justo esa hora, sin que nadie se la pida).
- Fermín «noche» → `vista` (falsa: Nerea a las 23:00). Enseñar `vista` a Nerea → `karaoke` (de 23:30 a 3:00, con fotos y ticket: aclara).
- **Contradicción:** enseñar `resguardo` a Octavio → `abono`.

**Las dos pistas que se combinan:** `cuerda` + `rondas` → el reloj parado es una hora falsa; el robo fue entre la 1 y las 2. Eso desmonta la coartada del hotel (que solo cubre las 23:47). Después, `resguardo` + `ida` (mismo abono) → Octavio volvió a Azafrán; enseñar el resguardo lo confirma (`abono`).

**Prueba:** `abono`. El billete de vuelta de anoche, picado con su abono, estaba debajo de la caja fuerte: lo pone dentro de la tienda, junto a la caja, después de su supuesta coartada.

**Pistas falsas:** el reloj parado (hora falsa que apunta a quien no tenga coartada a las 23:47, sobre todo a Nerea); Nerea vista a las 23:00 → karaoke. Fermín tiene motivo (deudas) y la noche entera, pero no sabe la combinación (trabaja de 21:00 a 7:00) ni viaja en Magnetotrén; su Growlithe estaba en el Centro Pokémon (por eso no ladró).

---

## NPCs nuevos

| Id | Nombre | Papel | Apariciones |
|---|---|---|---|
| `quintana` | Mauro Quintana | Perito de siniestros (fijo; Pokémon: Lupa, Noctowl) | 3 cartas + 3 casos |
| `det_solene` | Solène Morel | Dueña de la pastelería (c1) | generic |
| `det_florian` | Florián Ducasse | Repostero (c1, **culpable**) | generic |
| `det_amandine` | Amandine Garnier | Camarera (c1) | generic |
| `det_sumire` | Doña Sumire | Dueña de la casa de té (c2) | generic |
| `det_ren` | Ren | Aprendiz, dueño del Aipom Momo (c2) | generic |
| `det_haruki` | Don Haruki | Tasador (c2, **culpable**) | generic |
| `det_nerea` | Nerea Prieto | Sobrina y aprendiz de relojera (c3) | generic |
| `det_fermin` | Fermín Salcedo | Vigilante nocturno (c3) | generic |
| `det_octavio` | Octavio Lerma | Coleccionista (c3, **culpable**) | generic |

Don Anselmo Prieto (dueño de la relojería) solo sale narrado. «Una cosita nada más» de Quintana: una vez por caso, en la solución.

Flags nuevos: `det_c1_carta`…`det_c3_carta`, `det_cN_visto`, `det_cN_ok`, `det_cN_escapo` (+ `det_cN_resuelto` / `det_cN_fallido` del motor). Objetos: `detcarta1..3`.
