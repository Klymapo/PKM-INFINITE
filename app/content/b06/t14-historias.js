// Historias de tus Pokémon (pedido de Mario, 2026-10-30): mini arcos de 3 escenas contados desde los ojos
// de Pokémon de Mario que ya tienen historia en el juego, en lugares ya visitados. Se desbloquean por amistad
// (`bond('riolu')`, `bond('candela')`, 0–255, solo si va en el equipo) y por hitos de la historia.
//   Candela (la Mareep de Don Aurelio, B1): la grieta de la Gruta Tierraunida → el corral del rancho → el Faro de Olivo.
//   {riolu} (Riolu/Lucario, el compañero): la plaza de la Torre Prisma → la Torre Maestra → el puerto de Olivo.
// Cada escena deja un «cuento» para leer (Colección › Recuerdos) y sube la amistad. Flags hc_<quién>_<n>.
// Biblia: nada sobre el origen de Riolu más allá de lo permitido (§9.2: «sueños de aura» en B4–B6; ver registro).
// Candela no se cura de nada ni cura a Amphy (hilo de Kaori). Aurelio murió de viejo en el B3: sin dramatizar más.

const C = n => `bond("candela") >= ${n}`;
const R = n => `bond("riolu") >= ${n}`;
const cuento = (title, text) => ({ pocket: 'key', name: title, desc: 'Una hoja escrita a mano por Rotom, que jura que solo ha puesto en palabras lo que vio. Se puede leer.', read: text });

export default {
	items: {
		hccandela1: cuento('Cuento de Candela I · La grieta', '**LA GRIETA**\n*Contado como lo vio Candela*\n\nAntes, la oscuridad era una cosa que se te metía en la lana.\n\nMe escondí en una grieta porque las grietas tienen paredes, y las paredes no se mueven. Brillaba sin querer. Cuanto más miedo, más luz. Y cuanto más luz, más se veía lo oscuro de alrededor.\n\nLuego vino una luz azul que no tenía miedo. Se acercó despacio. Olía a fuera, a hierba y a lluvia.\n\nMe callé. La lana se me calmó sola.\n\nHoy he vuelto a la grieta. La he alumbrado a propósito. Es pequeña. Nunca fue tan grande.'),
		hccandela2: cuento('Cuento de Candela II · El corral', '**EL CORRAL**\n*Contado como lo vio Candela*\n\nEl árbol está. La valla está. El abrevadero está, con su musgo de siempre.\n\nEl hombre del sombrero no está.\n\nOlía a tabaco de pipa y a lana mojada. Cantaba mal. Me rascaba detrás de la oreja izquierda, nunca de la derecha, porque decía que la derecha era de Copito.\n\nMe he tumbado donde se sentaba él. La tierra ahí es un poco más blanda, como si hubiera aprendido su forma.\n\nNo he brillado. No hacía falta. A veces la luz es quedarse quieta en un sitio para que alguien sepa que lo recuerdas.'),
		hccandela3: cuento('Cuento de Candela III · La luz que no tiene miedo', '**LA LUZ QUE NO TIENE MIEDO**\n*Contado como lo vio Candela*\n\nArriba del todo hay otra como yo, pero vieja. Se llama Amphy. Cuida un faro entero ella sola, aunque le cuesta.\n\nYo antes brillaba porque tenía miedo. Ella brilla porque hay barcos.\n\nHoy hemos encendido la lente juntas. Yo un poco más fuerte, para que ella pudiera descansar un rato sin que nadie lo notara.\n\nAhora entiendo para qué sirve la luz: no es para que no te dé miedo a ti. Es para que no le dé miedo a otro.'),
		hclucario1: cuento('Cuento del compañero I · El color', '**EL COLOR**\n*Contado como lo sintió tu compañero*\n\nAquella noche todo tenía el mismo color: el del miedo. Rojo sucio. Gente corriendo, un Pokémon que no era de aquí gritando, la grieta violeta en el aire.\n\nY en medio, alguien que no corría.\n\nTenía un color que no conocía. No era valiente, no era tranquilo. Era otra cosa: era *quedarse*. Me puse delante. No sé por qué. El cuerpo lo hizo antes que yo.\n\nDesde entonces sé cómo se llama ese color. Se llama como tú.'),
		hclucario2: cuento('Cuento del compañero II · La piedra que habla', '**LA PIEDRA QUE HABLA**\n*Contado como lo sintió tu compañero*\n\nEn la torre de la marea hay un Lucario viejo, de piedra. No se mueve. Pero tiene aura, como si alguien la hubiera dejado ahí guardada.\n\nCuando la piedra de la Mega me habló por primera vez, no dijo nada con palabras. Dijo: *más*. Más fuerza, más rápido, más todo.\n\nAprendí que *más* no es lo importante. Lo importante es hacia dónde.\n\nHacia dónde siempre es hacia ti.'),
		hclucario3: cuento('Cuento del compañero III · El que vigila', '**EL QUE VIGILA**\n*Contado como lo sintió tu compañero*\n\nA veces sueño con un sitio que no he visto nunca. Huele a metal frío y a mar. Hay una luz azul que no es la mía, muy lejos, que me llama sin prisa.\n\nMe despierto y estás dormid{o|a|e}. Tu color, de noche, es más suave.\n\nNo sé de dónde vengo. Sé dónde estoy.\n\nSi algún día tengo que ir a ver esa luz, volveré. Los que vigilan siempre vuelven a su puesto.'),
	},

	patches: {
		gruta_tierraunida: { route: { tramos: {
			3: [{ talk: [{ script: 'hc_candela_1' }], label: 'Candela se para ante una grieta', sub: 'La lana le chisporrotea', icon: '🐑', cond: '!flag.hc_candela_1 && ' + C(150), new: 'true' }],
		} } },
		rancho_aurelio: { spots: [
			{ label: 'Candela, junto al árbol del corral', sub: 'No quiere moverse de ahí', icon: '🐑', cond: 'flag.hc_candela_1 && !flag.hc_candela_2 && flag.b03_fin && ' + C(190), new: 'true', talk: [{ script: 'hc_candela_2' }] },
		] },
		faro_olivo: { spots: [
			{ label: 'Candela mira hacia la linterna', sub: 'Arriba, Amphy enciende la lente', icon: '💡', cond: 'flag.hc_candela_2 && !flag.hc_candela_3 && ' + C(220), new: 'true', talk: [{ script: 'hc_candela_3' }] },
		] },
		luminalia_plaza: { spots: [
			{ label: '{riolu} se queda quieto mirando la Puerta', sub: 'Las orejas, tiesas', icon: '🔵', cond: 'flag.b01_fin && !flag.hc_lucario_1 && ' + R(150), new: 'true', talk: [{ script: 'hc_lucario_1' }] },
		] },
		torre_maestra: { spots: [
			{ label: 'Lucario, ante la estatua de piedra', sub: 'Con los ojos cerrados', icon: '🗿', cond: 'flag.hc_lucario_1 && !flag.hc_lucario_2 && flag.b01_torre_hecha && inParty("lucario") && ' + R(200), new: 'true', talk: [{ script: 'hc_lucario_2' }] },
		] },
		puerto_olivo: { spots: [
			{ label: 'Lucario no puede dormir', sub: 'Mira el mar desde el muelle', icon: '🌊', cond: 'flag.hc_lucario_2 && !flag.hc_lucario_3 && hitos >= 10 && ' + R(230), new: 'true', talk: [{ script: 'hc_lucario_3' }] },
		] },
	},

	scripts: {
		// ===================== CANDELA =====================
		hc_candela_1: [
			{ text: 'En el tercer recodo de la gruta, Candela se para en seco. Delante hay una grieta estrecha, a la altura de una oveja. La lana se le eriza y suelta chispas pequeñitas.' },
			{ cutscene: { time: 'noche', bg: { type: 'cave', dark: true, crystals: '#f2d36b' }, start: 'dark', tint: '#4a3a6a', frames: [
				{ actors: [{ mon: '{candela}', key: 'can', at: 'center', size: 's', enter: 'fade' }], fx: 'glow', cam: 'still', text: '*Antes, la oscuridad era una cosa que se te metía en la lana.*' },
				{ actors: [{ key: 'can', do: 'shake', emote: 'sweat' }], fx: 'heartbeat', color: '#f2d36b', text: '*Me escondí en la grieta porque las grietas tienen paredes. Brillaba sin querer. Cuanto más miedo, más luz. Y cuanto más luz, más se veía lo oscuro.*' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 'left', enter: 'left', dim: true }], fx: 'aura', on: 'rio', cam: 'push', text: '*Luego vino una luz azul que no tenía miedo. Se acercó despacio. Olía a fuera, a hierba y a lluvia.*' },
				{ actors: [{ key: 'can', do: 'nod' }], fx: 'light', on: 'can', tint: 'none', cam: 'pull', text: 'Candela da un paso hacia la grieta. Esta vez brilla a propósito: un brillo amarillo, quieto, que llena el recodo entero. La grieta es pequeñísima. Nunca fue tan grande.' },
				{ actors: [{ key: 'can', do: 'hop', emote: 'note' }], fx: 'sparkle', on: 'can', text: 'Al fondo, entre el polvo, algo tintinea: un cencerro viejo y abollado, sin nombre. Candela lo empuja hacia ti con el hocico.' },
			] } },
			{ say: 'rotom', text: '¡Bzzt! Lo he apuntado tal cual lo he visto. Bueno, tal cual lo he *sentido*. Es raro: Candela cuenta las cosas muy bajito, pero se entienden.', cond: 'flag.b01_diario' },
			{ give: 'hccandela1' },
			{ read: 'hccandela1' },
			{ happy: { who: 'candela', n: 15 } },
			{ set: { 'flag.hc_candela_1': true } },
		],
		hc_candela_2: [
			{ text: 'Candela cruza el rancho sin mirar a nadie y se tumba bajo el árbol del corral, junto al tocón donde Don Aurelio se sentaba a contar ovejas.' },
			{ cutscene: { time: 'tarde', weather: 'leaves', bg: { type: 'ranch' }, start: 'fade', frames: [
				{ actors: [{ mon: '{candela}', key: 'can', at: 'center', size: 's', enter: 'none' }], cam: 'still', text: '*El árbol está. La valla está. El abrevadero está, con su musgo de siempre. El hombre del sombrero no está.*' },
				{ fx: 'letter', cam: 'still', text: '*Olía a tabaco de pipa y a lana mojada. Cantaba mal. Me rascaba detrás de la oreja izquierda, nunca de la derecha: decía que la derecha era de Copito.*' },
				{ actors: [{ mon: 'mareep', key: 'cop', at: 0.72, size: 's', enter: 'right' }], cam: 'push', text: 'Una Mareep se acerca trotando desde el rebaño. Se para al lado de Candela. No balan. Se apoyan la una en la otra, lana con lana.' },
				{ actors: [{ key: 'can', do: 'idle' }, { key: 'cop', do: 'nod' }], cam: 'pull', text: '*No he brillado. No hacía falta. A veces la luz es quedarse quieta en un sitio para que alguien sepa que lo recuerdas.*' },
				{ fx: 'iris-out', on: 'can', text: 'Se quedan así hasta que el sol baja. Luego Candela se levanta, se sacude el polvo y vuelve contigo.' },
			] } },
			{ give: 'hccandela2' },
			{ read: 'hccandela2' },
			{ happy: { who: 'candela', n: 20 } },
			{ set: { 'flag.hc_candela_2': true } },
		],
		hc_candela_3: [
			{ text: 'Al pie de la escalera del Faro, Candela levanta la cabeza. Arriba, la lente gira despacio. Amphy, el Ampharos del faro, enciende la luz como cada tarde, con las patas un poco temblonas.' },
			{ if: 'flag.b03_amphita_candela', then: [{ text: 'Candela ya estuvo ahí arriba una vez, el día que la lente volvió a girar. Sube la escalera sin esperar a que la sigas.' }], else: [{ text: 'Candela nunca ha subido. Sube la escalera sin esperar a que la sigas.' }] },
			{ cutscene: { time: 'noche', bg: { type: 'tower' }, start: 'light', frames: [
				{ actors: [{ mon: 'ampharos', key: 'amphy', at: 'right', size: 'm', enter: 'none', dim: true }], fx: 'glow', on: 'amphy', cam: 'pan-up', text: '*Arriba del todo hay otra como yo, pero vieja. Cuida un faro entero ella sola, aunque le cuesta.*' },
				{ actors: [{ mon: '{candela}', key: 'can', at: 'left', size: 'm', enter: 'left' }], cam: 'push', text: '*Yo antes brillaba porque tenía miedo. Ella brilla porque hay barcos.*' },
				{ actors: [{ key: 'can', do: 'step' }, { key: 'amphy', dim: false }], fx: ['beam', 'sparkle'], on: 'can', text: 'Candela se pone al lado de Amphy y brilla con ella. Un poco más fuerte, solo un poco. Lo justo para que la vieja pueda bajar las patas un rato sin que el faro lo note.' },
				{ cam: 'pull', fx: 'rays', on: false, text: 'La luz sale por la ventana y se va mar adentro, más lejos que nunca. Allí abajo, un barquito pesquero hace sonar la sirena dos veces. Es lo que hacen los barcos para decir gracias.' },
				{ actors: [{ key: 'amphy', do: 'nod' }], fx: 'iris-out', on: 'can', text: '*Ahora entiendo para qué sirve la luz. No es para que no te dé miedo a ti. Es para que no le dé miedo a otro.*' },
			] } },
			{ say: 'yasmina', text: '…¿Lo has visto? Amphy se ha sentado. Hacía meses que no se sentaba mientras la lente giraba. —Se le quiebra un poco la voz—. Gracias. A las dos.', cond: 'beat("yasmina_g7")' },
			{ give: 'hccandela3' },
			{ read: 'hccandela3' },
			{ happy: { who: 'candela', n: 25 } },
			{ set: { 'flag.hc_candela_3': true } },
		],

		// ===================== {riolu} =====================
		hc_lucario_1: [
			{ text: 'En medio de la plaza, {riolu} se queda quieto, mirando el arco de la Puerta. Las orejas, tiesas. Las patas, clavadas en el sitio exacto donde se plantó aquella primera noche.' },
			{ cutscene: { time: 'noche', bg: { type: 'plaza', landmark: 'gate', fissure: true }, start: 'dark', tint: '#6a2a3a', frames: [
				{ fx: ['heartbeat', 'shake'], color: '#c4473a', cam: 'still', text: '*Aquella noche todo tenía el mismo color: el del miedo. Rojo sucio. Gente corriendo, un Pokémon que no era de aquí gritando, una grieta violeta en el aire.*' },
				{ actors: [{ id: 'jugador', at: 'right', enter: 'fade', dim: true }], cam: 'push', text: '*Y en medio, alguien que no corría.*' },
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 'left', enter: 'left' }, { key: 'jugador', dim: false }], fx: 'aura', on: 'jugador', tint: 'none', text: '*Tenía un color que no conocía. No era valiente, no era tranquilo. Era otra cosa: era quedarse. Me puse delante. El cuerpo lo hizo antes que yo.*' },
				{ actors: [{ key: 'rio', do: 'turn' }], fx: 'glow', on: 'rio', cam: 'pull', text: 'Hoy la plaza está tranquila. {riolu} se da la vuelta, te busca con la mirada y, cuando te encuentra, las orejas se le relajan de golpe.' },
				{ fx: 'iris-out', on: 'rio', text: '*Desde entonces sé cómo se llama ese color. Se llama como tú.*' },
			] } },
			{ give: 'hclucario1' },
			{ read: 'hclucario1' },
			{ happy: { who: 'riolu', n: 15 } },
			{ set: { 'flag.hc_lucario_1': true } },
		],
		hc_lucario_2: [
			{ text: 'En la sala de la Torre Maestra, Lucario se sienta ante la estatua del Lucario de piedra. Cierra los ojos. Tú te quedas en la puerta, sin hacer ruido.' },
			{ cutscene: { time: 'tarde', bg: { type: 'tower' }, start: 'fade', frames: [
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 0.35, enter: 'none' }], cam: 'still', text: '*La estatua no se mueve. Pero tiene aura, como si alguien la hubiera dejado ahí guardada hace mucho.*' },
				{ actors: [{ item: 'lucarionite', key: 'piedra', at: 0.7, enter: 'pop' }], fx: ['glow', 'sparkle'], on: 'piedra', text: '*Cuando la piedra me habló por primera vez, no dijo nada con palabras. Dijo: más. Más fuerza, más rápido, más todo.*' },
				{ actors: [{ key: 'rio', do: 'step' }], fx: 'aura', on: 'rio', cam: 'push', text: 'Lucario levanta una pata. El aura le sube por el brazo, azul y limpia, y se queda quieta en la palma, como una llama sin viento.' },
				{ actors: [{ key: 'piedra', remove: true, exit: 'fade' }, { key: 'rio', do: 'turn' }], cam: 'pull', text: '*Aprendí que más no es lo importante. Lo importante es hacia dónde.*' },
				{ fx: 'iris-out', on: 'rio', text: 'Abre los ojos. Te ve en la puerta. No se sorprende: llevaba todo el rato sabiendo que estabas ahí.' },
			] } },
			{ if: 'flag.b01_torre_hecha', then: [{ say: 'corelia', text: '—Asomada a la escalera, en voz bajísima para ser ella—. Eso que ha hecho con el aura… el abuelo tardó años en enseñárselo al mío. Al tuyo no se lo ha enseñado nadie. ¡A TOPE! Perdón. A tope, pero bajito.' }] },
			{ give: 'hclucario2' },
			{ read: 'hclucario2' },
			{ happy: { who: 'riolu', n: 20 } },
			{ set: { 'flag.hc_lucario_2': true } },
		],
		hc_lucario_3: [
			{ text: 'Es tarde. En el muelle de Olivo solo se oyen las cuerdas de los barcos. Lucario está sentado en el borde, de espaldas, mirando el mar hacia el norte.' },
			{ cutscene: { time: 'noche', bg: { type: 'coast' }, start: 'fade', tint: '#2a3a6a', frames: [
				{ actors: [{ mon: '{riolu}', key: 'rio', at: 'center', enter: 'none' }], cam: 'still', text: '*A veces sueño con un sitio que no he visto nunca. Huele a metal frío y a mar.*' },
				{ fx: ['glow', 'ripple'], on: 'rio', color: '#7fb6ff', text: '*Hay una luz azul que no es la mía, muy lejos, que me llama sin prisa.*' },
				{ actors: [{ id: 'jugador', at: 'left', enter: 'left' }], tint: 'none', cam: 'push', text: 'Te sientas a su lado. Lucario no te mira. Pone la pata encima de tu mano, sin apretar, como quien comprueba que algo sigue ahí.' },
				{ actors: [{ key: 'rio', do: 'nod' }], fx: 'aura', on: 'rio', text: '*No sé de dónde vengo. Sé dónde estoy.*' },
				{ cam: 'pull', fx: 'iris-out', on: 'rio', text: '*Si algún día tengo que ir a ver esa luz, volveré. Los que vigilan siempre vuelven a su puesto.*' },
			] } },
			{ say: 'rotom', text: '…Bzzt. No digo nada. Solo lo apunto. Esta vez, bajito.', cond: 'flag.b01_diario' },
			{ give: 'hclucario3' },
			{ read: 'hclucario3' },
			{ happy: { who: 'riolu', n: 25 } },
			{ set: { 'flag.hc_lucario_3': true } },
		],
	},
};
