// Bloque 7 · T3 · «La delantera» (~2 h 15): Ruta 3, Mina de Galar, Ruta 4, Pueblo Hoyuelo.
// Ruta 3 (bloqueada hasta b07_t1_hecho) → Mina de Galar: Petra y los fósiles que no encajan (b07_s_fosiles, con una
// primera excavación de escena y la excavación diaria con las cuatro mitades como `rare`) → Ruta 4 → Pueblo Hoyuelo:
// Rhi te intercepta y te lleva a casa → la cena con Gareth (el estadio vendido, el Campo alquilado: b07_campo) y Nate
// en el sofá «desde el martes» → Scorbunny en la pared de la escuela de fútbol, con Rhi delante → Terrazas de Hoyuelo
// (entrenamiento, tope 70, premio Meganiumita de Percy, con la historia de su abuela) → de noche, en el estadio vacío,
// Rhi te reta (cinemática 2: Cinderace Gigamax; rhi_7 con curación antes; gane o pierda, b07_rhi_combate; dejarla ganar
// es una opción explícita que la hiere y se repara en el Campo) → Percy (Planta, Dinamax) → Medalla Planta, tope 70 →
// llamada de Handsome (Crampón) → b07_t3_hecho.
// Contratos: secreto/bloques/b07-encargo.md (sección «T3» y «Contratos compartidos»).
// Ids: la zona de entrenamiento usa terraza_hoy_1…3 (terraza_1…3 ya existen en b06/t5-dragospiral.js).

// ---------- Condiciones reutilizadas ----------
const LUC = '(inParty("riolu") || inParty("lucario"))';
const PURG = 'flag.b06_eco_purgado';
const DIARIO = 'flag.b01_diario';
const D_PURGADO = DIARIO + ' && flag.b06_eco_purgado';     // Rotom de verdad: frases cortas, alguna falta, sin «¡Bzzt!»
const D_REFORMADO = DIARIO + ' && flag.b06_eco_reformado'; // voz de siempre, completa, y al final: *(Omitido: nada.)*
const D_DOBLE = DIARIO + ' && flag.b06_eco_doble';          // alegre e incompleta (la lee Lemnis)
const DOBLE = 'flag.b06_eco_doble';
const T1 = 'flag.b07_t1_hecho';
const LLEGADA = 'flag.b07_hoyuelo_llegada';
const CENA = 'flag.b07_casa_rhi';
const COMBATE = 'flag.b07_rhi_combate';
const PERCY = 'flag.b07_percy_vencido';
const SCORB_OK = '(flag.b07_scorbunny || flag.b07_scorbunny_vive)';
const TIENE_SCORB = '(owns("scorbunny") || owns("raboot") || owns("cinderace"))';
const TRES = '(flag.b07_sobble || flag.b07_sobble_vive) && (flag.b07_grookey || flag.b07_grookey_vive) && (flag.b07_scorbunny || flag.b07_scorbunny_vive)';
const DOLIDA = 'flag.b07_rhi_dolida && !flag.b07_rhi_reparada';
// Revancha en el Campo: una vez por día real (mismo mecanismo que la carrera y el terror del B5: día de la semana + 1)
const RHI_HOY = 'vars.b07_rhi_revancha_wd == weekday + 1';
const RHI_MARCA = { set: { 'vars.b07_rhi_revancha_wd': '=weekday + 1' } };

// ----- Fósiles: mitades de arriba (pájaro / pez) y de abajo (dragón / plesio) -----
const AVE = 'has("fossilizedbird")', PEZ = 'has("fossilizedfish")', DRA = 'has("fossilizeddrake")', DIN = 'has("fossilizeddino")';
const P_DRACOZOLT = AVE + ' && ' + DRA + ' && !flag.b07_fosil_dracozolt';
const P_ARCTOZOLT = AVE + ' && ' + DIN + ' && !flag.b07_fosil_arctozolt';
const P_DRACOVISH = PEZ + ' && ' + DRA + ' && !flag.b07_fosil_dracovish';
const P_ARCTOVISH = PEZ + ' && ' + DIN + ' && !flag.b07_fosil_arctovish';
const PAR_OK = '((' + P_DRACOZOLT + ') || (' + P_ARCTOZOLT + ') || (' + P_DRACOVISH + ') || (' + P_ARCTOVISH + '))';
const CUATRO = 'flag.b07_fosil_dracozolt && flag.b07_fosil_arctozolt && flag.b07_fosil_dracovish && flag.b07_fosil_arctovish';

// Une dos mitades: si ya tienes esa especie, Petra la registra y se queda las mitades (nunca dos de la misma especie).
const unir = (sp, nombre, arriba, abajo, flag, frase) => ({
	text: nombre, cond: arriba + ' && ' + abajo + ' && !flag.' + flag, then: [
		{ take: arriba.match(/"(.+)"/)[1], n: 1, silent: true },
		{ take: abajo.match(/"(.+)"/)[1], n: 1, silent: true },
		{ set: { ['flag.' + flag]: true } },
		{ say: 'petra', text: frase },
		{ if: 'owns("' + sp + '")', then: [
			{ say: 'petra', text: 'Espera. Ya tienes uno igual. —Mira la ficha, mira tu Pokédex—. Va. Entonces este no lo despierto: lo dejo dormido, registrado y precioso, para el museo de la Mina. Dos iguales no te hacen falta. A mí sí: me encanta tener pruebas.' },
		], else: [
			{ text: 'La máquina de Petra traquetea, pita, echa un humo que huele a goma quemada y se abre con un *clonc*. Dentro, despierto y muy confundido, algo que no debería poder sostenerse en pie. Se sostiene.' },
			{ pokemon: { sp, lv: 45, happy: 90 } },
		] },
	],
});

export default {
	// =====================================================================
	// LUGARES
	// =====================================================================
	locations: {
		// =================== RUTA 3 ===================
		gal_ruta3: {
			name: 'Ruta 3', short: 'Ruta 3', region: 'galar', kind: 'route', map: { x: 58, y: 86 },
			bg: { type: 'route', ground: '#6a7a4a', hill: '#5a6a42', far: '#8a8a8a', flowers: '#c9a66b' },
			desc: 'Al oeste de Pistón, la ciudad se deshace en naves de ladrillo, vías muertas y montones de escoria cubiertos de hierba. Luego, campo: un camino de tierra entre vallas, una fábrica vieja con la chimenea apagada y, al fondo, la boca negra de la **Mina de Galar**, con dos raíles que se meten dentro.\n\nEl viento trae olor a carbón mojado y a heno.',
			descNight: 'De noche, la Ruta 3 es una línea de farolas amarillas que se acaba de golpe en la boca de la mina. La fábrica vieja tiene una ventana encendida que nadie sabe quién enciende. Los Vulpix de la zona se acercan a mirar las farolas como si fueran fuego.',
			links: ['piston', 'mina_galar'],
			enterCond: T1, blockedMsg: 'Un operario con chaleco naranja cierra la verja con un candado. «Hoy no, que es la Apertura y han cortado el paso para que no se cuele nadie al estadio por la vía vieja. Mañana. Bueno, cuando acabe lo del estadio».',
			mapNote: 'Naves viejas y escoria · árbol de bayas · boca de la Mina de Galar al final',
			rumors: [
				{ text: 'La fábrica vieja de la Ruta 3 hacía calderas para medio Galar. Cerró cuando Macrocosmos compró la competencia y luego la cerró también. La chimenea no humea desde hace años, pero los Rolycoly se meten dentro a dormir porque todavía guarda calor.' },
				{ text: 'Por la Ruta 3 pasaba antes un tren de mercancías que bajaba carbón de la mina. Ahora pasan Mudsdale tirando de carretas. Los carreteros dicen que es más rápido. Los Mudsdale dicen otra cosa.' },
				{ cond: 'flag.b07_petra_mina', text: 'Dicen que en la mina trabaja una chica pelirroja con un Diggersby que «canta» a las piedras antes de picarlas. Los mineros viejos le han tomado cariño. Le guardan el bocadillo.' },
			],
			route: {
				from: 'piston', to: 'mina_galar', length: 5, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Dejas atrás los últimos ladrillos de Pistón. Una verja abierta, un cartel oxidado («RUTA 3 · A LA MINA») y una vía muerta que se mete entre la hierba alta como un dedo que señala.' }],
					1: [
						{ trainer: 'galr3_ewan' },
						{ item: 'maxpotion' },
						{ text: 'Junto a una nave de ladrillo sin tejado, un rebaño de Mudsdale espera atado a una carreta llena de sacos. El carretero duerme debajo, a la sombra. Nadie tiene prisa.' },
					],
					2: [
						{ text: 'Un árbol de bayas crece justo al lado de la vía, torcido hacia los raíles como si esperara el tren. Alrededor, cáscaras. Un Greedent duerme en una rama con la tripa al aire.' },
						{ spot: { action: { gather: 'b07_r3_arbol' } }, label: 'El árbol de la vía', icon: '🌳', sub: 'Torcido hacia los raíles' },
						{ trainer: 'galr3_tilly', optional: true, label: 'Una criadora cepilla a un Arcanine junto a la valla' },
						{ item: 'fossilizedfish', hidden: true },
					],
					3: [
						{ text: 'La fábrica vieja. Puertas de hierro cerradas con cadena, cristales rotos, la chimenea alta y negra. En la pared, un letrero medio borrado: «CALDERAS ASHFORD · DESDE 1882». Y debajo, pintado con espray más reciente, el logo redondo de Macrocosmos tachado con una equis.' },
						{ trainer: 'galr3_ross' },
						{ item: 'ultraball', hidden: true },
					],
					4: [
						{ text: 'El camino sube hacia una ladera de roca gris. Los raíles se meten en un túnel con una visera de madera. Encima de la entrada, una placa de hierro: «MINA DE GALAR». Huele a polvo y a lámpara de aceite.' },
						{ trainer: 'galr3_moss', optional: true, label: 'Un señor mayor con casco limpia una lámpara de minero' },
					],
					5: [{ text: 'La boca de la mina: un túnel ancho apuntalado con vigas, una cinta transportadora parada y una fila de lámparas que se pierde hacia abajo. Del fondo sube un aire frío que suena como una respiración.' }],
				},
				encounters: {
					grass: [
						{ sp: 'obstagoon', lv: [66, 68], w: 16 },
						{ sp: 'eldegoss', lv: [66, 68], w: 14, time: 'day' },
						{ sp: 'corviknight', lv: [67, 68], w: 10 },
						{ sp: 'machamp', lv: [67, 68], w: 8 },
						{ sp: 'pangoro', lv: [66, 68], w: 10 },
						{ sp: 'mudsdale', lv: [66, 68], w: 10 },
						{ sp: 'skuntank', lv: [66, 68], w: 10, time: 'night' },
						{ sp: 'ninetales', lv: [66, 68], w: 6 },
						{ sp: 'arcanine', lv: [67, 68], w: 4 },
						{ sp: 'garbodor', lv: [66, 68], w: 6 },
						{ sp: 'klinklang', lv: [66, 68], w: 6 },
						{ sp: 'coalossal', lv: [67, 68], w: 6 },
						{ sp: 'hitmontop', lv: [67, 68], w: 3 },
						{ sp: 'centiskorch', lv: [67, 69], w: 3, time: 'night' },
						{ sp: 'krookodile', lv: [67, 68], w: 2, displaced: true },
					],
				},
			},
		},

		// =================== MINA DE GALAR ===================
		mina_galar: {
			name: 'Mina de Galar', short: 'Mina', region: 'galar', kind: 'cave', map: { x: 48, y: 82 },
			bg: { type: 'cave', crystals: '#e9a43a', far: '#3a2a22', ground: '#5a4a3a' },
			desc: 'Galerías anchas apuntaladas con vigas negras, cintas transportadoras que ya no transportan nada, vagonetas oxidadas y una fila de lámparas eléctricas que zumban. En las paredes, vetas de colores: ocre, gris azulado y, de vez en cuando, algo que brilla como el ámbar.\n\nEl suelo baja y sube. En algún sitio, siempre, gotea agua.',
			descNight: 'De noche las lámparas de la mina se quedan a media luz, para ahorrar. Las vetas de ámbar brillan más que de día. Los Woobat cuelgan del techo en racimos y, cuando pasas, se despiertan todos a la vez con un ruido de paraguas.',
			descs: [{ cond: 'flag.b07_petra_mina', text: 'Las galerías de la Mina de Galar, con sus vigas negras y sus cintas paradas. En el ensanche del medio, entre dos vagonetas, el campamento de **Petra**: una lona, una mesa plegable, una máquina que traquetea y un cartel escrito a mano: «LABORATORIO DE CAMPO · NO PISAR LOS HUESOS».' }],
			links: ['gal_ruta3', 'gal_ruta4'],
			mapNote: 'Galerías y vetas · Petra y los fósiles · excavación diaria',
			rumors: [
				{ text: 'En la Mina de Galar salen fósiles partidos por la mitad. Los mineros los tiraban a la vagoneta del cascote porque «no encajan con nada». Uno los guardó en una caja de galletas durante treinta años. Se la ha regalado a una chica de Kalos.' },
				{ text: 'Los Rolycoly de la mina se comen el carbón que se cae de las vagonetas. Por eso, dicen los viejos, la mina dejó de dar dinero: no por la competencia, sino porque los Rolycoly tenían hambre.' },
				{ text: 'En la galería del fondo hay una veta de ámbar que «late» en las noches de tormenta. Los mineros jóvenes dicen que es la humedad. Los viejos no dicen nada y no bajan esas noches.' },
			],
			route: {
				from: 'gal_ruta3', to: 'gal_ruta4', length: 6, terrain: 'cave', rate: 0.22,
				tramos: {
					0: [{ text: 'Entras por la boca de la mina. La luz de fuera se queda atrás en tres pasos. Las lámparas del techo zumban y parpadean. La cinta transportadora, parada, sigue hacia abajo como una escalera muy larga.' }],
					1: [
						{ text: 'Una galería ancha con vagonetas en fila. Una de ellas está llena de piedras con marcas de pico y una etiqueta: «CASCOTE · NO VALE». Alguien ha tachado el «NO» con tiza.' },
						{ item: 'hardstone' },
					],
					2: [
						{ trainer: 'mina_galar_t1' },
						{ text: 'La pared de la izquierda tiene vetas de colores en capas, como un pastel cortado. Hay marcas de pico recientes y un cubo con un cepillo. Alguien ha estado excavando con cuidado.' },
						{ spot: { action: { gather: 'b07_mina_veta' } }, label: 'La pared de las vetas', icon: '⛏️', sub: 'Capas de colores y marcas de pico recientes' },
					],
					3: [
						{ text: 'Un ensanche entre dos vagonetas volcadas. Una lona colgada de las vigas, una mesa plegable llena de cepillos y de fichas, y una máquina con manivela que traquetea sola. Un cartel: «LABORATORIO DE CAMPO · NO PISAR LOS HUESOS».' },
						{ talk: [
							{ cond: '!flag.b07_petra_mina', script: 'b07_petra' },
							{ cond: PAR_OK, script: 'b07_petra_unir' },
							{ script: 'b07_petra_charla' },
						], label: 'Petra, en su laboratorio de campo', icon: '🦴', sub: 'Una coleta naranja y un Diggersby con casco', new: '!flag.b07_petra_mina || ' + PAR_OK },
						{ trainer: 'mina_galar_t2', optional: true, label: 'Un minero joven practica con sus Pokémon en la galería lateral' },
					],
					4: [
						{ text: 'El techo baja. Hay que agacharse. Del fondo llega un aire más frío y un ruido de agua. Los Woobat del techo te siguen con la cabeza, todos a la vez.' },
						{ item: 'fossilizeddino', hidden: true },
						{ item: 'maxrevive', hidden: true },
					],
					5: [
						{ trainer: 'mina_galar_t3' },
						{ text: 'Una galería inundada a medias: el agua oscura cubre los raíles y refleja las lámparas. Al otro lado, una pasarela de tablones. Sobre el agua, en la pared, una veta de ámbar brilla con una luz naranja y quieta.' },
					],
					6: [{ text: 'Una rampa de tablones sube hacia la luz. Huele a hierba otra vez. La salida de la mina da a una ladera verde, a unos bancales escalonados y, abajo, a un pueblo con un estadio de césped. **Ruta 4**.' }],
				},
				encounters: {
					cave: [
						{ sp: 'coalossal', lv: [66, 68], w: 18 },
						{ sp: 'conkeldurr', lv: [66, 68], w: 10 },
						{ sp: 'swoobat', lv: [66, 68], w: 12 },
						{ sp: 'dugtrio', lv: [66, 68], w: 10 },
						{ sp: 'excadrill', lv: [67, 68], w: 8 },
						{ sp: 'gigalith', lv: [67, 68], w: 10 },
						{ sp: 'stunfiskgalar', lv: [66, 68], w: 6 },
						{ sp: 'gastrodon', lv: [66, 68], w: 6 },
						{ sp: 'golisopod', lv: [67, 68], w: 4 },
						{ sp: 'toxicroak', lv: [66, 68], w: 4 },
						{ sp: 'shuckle', lv: [66, 68], w: 3 },
						{ sp: 'durant', lv: [67, 68], w: 2, displaced: true },
					],
				},
			},
		},

		// =================== RUTA 4 ===================
		gal_ruta4: {
			name: 'Ruta 4', short: 'Ruta 4', region: 'galar', kind: 'route', map: { x: 38, y: 80 },
			bg: { type: 'route', ground: '#6aa35a', hill: '#4f8a4a', far: '#a8b8a0', flowers: '#f2e6a0' },
			desc: 'Al salir de la mina, la tierra se vuelve verde de golpe. Un camino estrecho baja por una ladera de bancales escalonados, con muros de piedra seca, huertos, un molino viejo y un arroyo que borbotea entre los juncos.\n\nAl fondo, en el valle, los tejados de **Pueblo Hoyuelo** y un estadio con el techo verde. En la colina de enfrente, dibujada en la hierba con piedras blancas, una figura enorme que no se sabe bien qué es.',
			descNight: 'De noche, la Ruta 4 huele a heno y a tierra mojada. Los Pumpkaboo se encienden entre los huertos como farolillos. Abajo, el estadio de Hoyuelo está a oscuras, y la figura blanca de la colina se ve mejor que de día, como si la luna la mirara.',
			links: ['mina_galar', 'hoyuelo'],
			mapNote: 'Bancales y huertos · arroyo (pesca diaria) · Pueblo Hoyuelo al final',
			rumors: [
				{ text: 'La figura blanca de la colina de Hoyuelo es más antigua que el pueblo. Nadie sabe qué representa. Los niños dicen que es un Wooloo gigante. La investigadora de Par dice que no es un Wooloo. No dice qué es.' },
				{ text: 'En el arroyo de la Ruta 4 se ven burbujas que suben solas. Ahí siempre pica algo. Lo que pica no siempre es pequeño.' },
			],
			route: {
				from: 'mina_galar', to: 'hoyuelo', length: 4, terrain: 'grass', rate: 0.2,
				tramos: {
					0: [{ text: 'Sales de la mina parpadeando. Sol, de repente. Hierba, mucha. Un rebaño de Wooloo te mira desde un bancal con la boca llena, como si hubieras salido de debajo de la tierra. Que es lo que has hecho.' }],
					1: [
						{ trainer: 'galr4_daisy' },
						{ text: 'Un molino de piedra con las aspas quietas. En la puerta, un saco de harina y un Milcery dormido encima, con la nata un poco hundida.' },
						{ item: 'fullrestore', hidden: true },
					],
					2: [
						{ text: 'El arroyo cruza el camino por debajo de un puentecito de piedra. En un remanso, entre los juncos, suben burbujas del fondo, una detrás de otra, como si algo respirara ahí abajo.' },
						{ spot: { action: { gather: 'b07_r4_arroyo' } }, label: 'El remanso de las burbujas', icon: '🎣', sub: 'Algo respira en el fondo' },
						{ trainer: 'galr4_cosmo', optional: true, label: 'Un chico con una calabaza en la cabeza practica sustos con sus Pokémon' },
					],
					3: [
						{ text: 'Desde aquí se ve la colina de enfrente y la figura blanca entera: un cuerpo enorme, alargado, con algo que podrían ser alas o podrían ser brazos, dibujado con piedras encaladas sobre la hierba. Mirándola mucho rato, da un poco de frío.' },
						{ item: 'leafstone', hidden: true },
					],
					4: [{ text: 'Una cancela de madera con un cartel pintado a mano: «PUEBLO HOYUELO · CUIDADO CON LOS BALONES». Debajo, alguien ha añadido con tiza: «Y CON RHI».' }],
				},
				encounters: {
					grass: [
						{ sp: 'manectric', lv: [66, 68], w: 14 },
						{ sp: 'perrserker', lv: [66, 68], w: 12 },
						{ sp: 'boltund', lv: [66, 68], w: 12, time: 'day' },
						{ sp: 'dubwool', lv: [66, 68], w: 14 },
						{ sp: 'alcremie', lv: [66, 68], w: 8 },
						{ sp: 'gourgeist', lv: [66, 68], w: 10, time: 'night' },
						{ sp: 'galvantula', lv: [66, 68], w: 6 },
						{ sp: 'ribombee', lv: [66, 68], w: 8, time: 'day' },
						{ sp: 'roserade', lv: [66, 68], w: 6, time: 'day' },
						{ sp: 'ferrothorn', lv: [67, 68], w: 4 },
						{ sp: 'raichu', lv: [67, 68], w: 3 },
						{ sp: 'dugtrio', lv: [66, 68], w: 4 },
						{ sp: 'leavanny', lv: [66, 68], w: 3, displaced: true },
					],
				},
			},
		},

		// =================== PUEBLO HOYUELO ===================
		hoyuelo: {
			name: 'Pueblo Hoyuelo', short: 'Hoyuelo', region: 'galar', kind: 'town', map: { x: 28, y: 78 },
			bg: { type: 'town', roofs: ['#6a4a3a', '#5a6a3a', '#8a5a3a', '#4a5a4a'], far: '#a8b8a0', ground: '#6aa35a' },
			desc: 'Un pueblo pequeño en el fondo de un valle, rodeado de **bancales** de hierba que suben por las laderas como escalones de gigante. Casas de piedra con tejados de musgo, gallineros, Wooloo por todas partes y, en el centro, un **estadio** con el techo cubierto de hierba que parece una colina más.\n\nEn la colina de enfrente, dibujada con piedras blancas, la figura enorme del **geoglifo**. Junto al estadio, la **escuela de fútbol**: una pared de ladrillo con dos porterías pintadas, gastadas de tanto balonazo.',
			descNight: 'De noche, Hoyuelo huele a leña y a hierba mojada. Las casas apagan pronto. El estadio, a oscuras, parece una colina dormida. En la colina de enfrente, el geoglifo blanco se ve bajo la luna, enorme, y los perros del pueblo no le ladran.',
			descs: [{ cond: PERCY, text: 'Hoyuelo, con sus bancales de hierba, sus casas de piedra y sus Wooloo sueltos. En la puerta del estadio han colgado una pizarra: «MEDALLA PLANTA · ESTA TEMPORADA: 1». Debajo, con la letra redonda de Percy: «Enhorabuena. Pásate por las terrazas, que hay té».' }],
			links: ['gal_ruta4'],
			mapNote: 'Estadio de Hoyuelo (Percy, Planta) · casa de los Hargreave · Terrazas (entrenamiento) · El Campo',
			onEnter: [{ script: 'b07_hoyuelo_llegada', cond: '!' + LLEGADA, once: true }],
			spots: [
				{ label: 'Centro Pokémon', action: { center: true } },
				{ label: 'PC de almacenamiento', action: { pc: true } },
				{ label: 'Tienda de Hoyuelo', action: { shop: 'tienda_hoyuelo' } },
				{ label: 'Casa de los Hargreave', sub: 'Piedra gris, una portería pintada en la puerta del garaje', icon: '🏠', action: { go: 'casa_rhi' } },
				{ label: 'Estadio de Hoyuelo', sub: 'Un techo de hierba que parece una colina', icon: '🏟️', new: CENA + ' && !' + PERCY + ' && !visited("estadio_hoyuelo")', action: { go: 'estadio_hoyuelo' } },
				{ label: 'Terrazas de Hoyuelo', sub: 'Los bancales que suben por la ladera', icon: '🌾', new: CENA + ' && !visited("terrazas_hoyuelo")', action: { go: 'terrazas_hoyuelo' } },
				{ label: 'El Campo de los Hargreave', sub: 'Dos porterías torcidas a las afueras', icon: '⚽', cond: 'flag.b07_campo', new: '!visited("campo_hargreave")', action: { go: 'campo_hargreave' } },
				{ label: 'La pared de la escuela de fútbol', sub: 'Alguien chuta piedras. Siempre a la misma esquina', icon: '🧱', cond: CENA + ' && !' + SCORB_OK, new: 'true', talk: [{ script: 'b07_scorbunny' }] },
				{ label: 'El Scorbunny de la escuela', sub: 'Chuta piedras contra la pared. Ya no falla', icon: '🐰', cond: 'flag.b07_scorbunny_vive', talk: [{ script: 'b07_scorbunny_visita' }] },
				{ label: 'El geoglifo de la colina', sub: 'Una figura enorme de piedras blancas', icon: '🗿', talk: [{ script: 'b07_geoglifo' }] },
				{ label: 'Rotom: ¿qué me queda en Hoyuelo?', sub: 'Repasa lo pendiente', icon: '📱', cond: LLEGADA, talk: [{ script: 'b07_hoyuelo_pendiente' }] },
				{ label: 'Las afueras del pueblo', sub: 'Hierba alta entre los muros de piedra', icon: '🌿', action: { explore: 'grass' } },
			],
			encounters: {
				grass: [
					{ sp: 'dubwool', lv: [66, 68], w: 20 },
					{ sp: 'eldegoss', lv: [66, 68], w: 14, time: 'day' },
					{ sp: 'manectric', lv: [66, 68], w: 10 },
					{ sp: 'perrserker', lv: [66, 68], w: 10 },
					{ sp: 'gourgeist', lv: [66, 68], w: 10, time: 'night' },
					{ sp: 'crawdaunt', lv: [67, 68], w: 4 },
					{ sp: 'alcremie', lv: [66, 68], w: 6 },
				],
			},
			rumors: [
				{ text: 'En Hoyuelo hay más Wooloo que personas. Algunos tienen dueño. La mayoría, no. Se pasean por el pueblo, comen de los jardines y se tumban en medio de la calle. Si uno se tumba en tu puerta, da buena suerte. Si se tumban tres, no sales de casa.' },
				{ text: 'El Estadio de Hoyuelo tenía el mejor césped de Galar. Lo decían los jugadores de fuera, los árbitros y hasta los Wooloo, que entraban a comérselo. Hace un par de años lo cambiaron por uno de plástico. Los Wooloo ya no entran.' },
				{ text: 'Percy, el líder, sube cada mañana a las terrazas con un termo de té. Dice que los bancales los hizo su abuela, piedra a piedra, y que hay que hablarles para que no se caigan.' },
				{ cond: CENA, text: 'Gareth Hargreave cuidó el césped del estadio durante veinte años. Dicen en el pueblo que lo conocía hoja por hoja, y que el día que pusieron el plástico se fue a casa sin decir nada y no volvió a pasar por esa calle.' },
			],
		},

		// ---------- Casa de los Hargreave ----------
		casa_rhi: {
			name: 'Casa de los Hargreave', short: 'Casa de Rhi', parent: 'hoyuelo', kind: 'building',
			bg: { type: 'indoor', wall: '#8a6a4a', floor: '#6a4a3a' },
			desc: 'Una casa de piedra pequeña y caliente. Una cocina con una mesa demasiado grande, una chimenea, un sofá hundido con una manta de cuadros y estanterías llenas de trofeos de fútbol infantil, fotos de equipos y una sola maceta de césped en la ventana, cortado a tijera, perfecto.\n\nPor la puerta de atrás se ve el jardín: un huerto, una caseta de herramientas y, pintada en la pared de la caseta, una portería con la pintura gastada de tanto balón.',
			descNight: 'De noche, la casa de los Hargreave huele a guiso y a leña. La chimenea crepita. En la ventana, la maceta de césped tiene una lamparita al lado, «para que no se aburra», dice Gareth. Desde el sofá, alguien ronca suave.',
			mapNote: 'Gareth, Rhi y Nate · el jardín de atrás',
			onEnter: [{ script: 'b07_cena', cond: LLEGADA + ' && !' + CENA, once: true }],
			spots: [
				{ label: 'Gareth, en la cocina', sub: 'Chaleco verde y un trapo al hombro', icon: '🍲', cond: CENA, talk: [
					{ cond: PERCY, script: 'b07_gareth_medalla' },
					{ script: 'b07_gareth_charla' },
				] },
				{ label: 'Nate, en el sofá', sub: 'Lleva ahí desde el martes', icon: '🛋️', cond: CENA, new: '!flag.b07_nate_charla', talk: [
					{ cond: '!flag.b07_nate_charla', script: 'b07_nate_sofa' },
					{ cond: '!flag.b07_nate_vencido', script: 'b07_nate_reto' },
					{ script: 'b07_nate_despues' },
				] },
				{ label: 'Rhi', sub: 'Hace toques con un balón en el pasillo', icon: '⚽', cond: CENA, talk: [
					{ cond: 'quest.b07_t_rhi == "estadio"', script: 'b07_rhi_espera' },
					{ cond: DOLIDA, script: 'b07_rhi_fria' },
					{ script: 'b07_rhi_casa' },
				] },
				{ label: 'El jardín de atrás', sub: 'Una portería pintada en la pared de la caseta', icon: '🥅', cond: COMBATE + ' && af.rhi >= 45 && !flag.b07_rhi_momento && !(' + DOLIDA + ')', new: 'true', talk: [{ script: 'b07_rhi_momento' }] },
				{ label: 'El jardín de atrás', sub: 'Rhi está sentada en el punto de penalti', icon: '🥅', cond: 'flag.b07_rhi_momento && af.rhi >= 70 && !flag.b07_rhi_peticion', new: 'true', talk: [{ script: 'b07_rhi_peticion' }] },
				{ label: 'La maceta de la ventana', sub: 'Césped cortado a tijera, con una lamparita', icon: '🌱', talk: [{ script: 'b07_maceta' }] },
			],
		},

		// ---------- Estadio de Hoyuelo ----------
		estadio_hoyuelo: {
			name: 'Estadio de Hoyuelo', short: 'Estadio', parent: 'hoyuelo', kind: 'gym',
			bg: { type: 'gym', wall: '#3a5a3a', floor: '#4a8a4a' },
			desc: 'Un estadio pequeño y antiguo, medio enterrado en la ladera, con el techo cubierto de hierba de verdad y las gradas de piedra. El campo, en cambio, es de **césped artificial**: verde chillón, perfecto, sin una sola calva, con un brillo de plástico bajo los focos.\n\nEn la entrada, un cartel de Macrocosmos con letras pequeñas: «Instalaciones renovadas por cortesía de un socio de la Liga». Al fondo, el pasillo de los **vestuarios**.',
			descNight: 'De noche, el estadio vacío suena a viento entre las gradas. Los focos están apagados. Solo la luna ilumina el campo, y con esa luz el plástico parece casi hierba. Casi.',
			descs: [{ cond: PERCY, text: 'El Estadio de Hoyuelo, medio enterrado en la ladera, con su techo de hierba y su campo de plástico. En el punto de penalti alguien ha dejado una maceta pequeña con césped de verdad. Nadie la quita. Percy dice que no sabe quién la pone. Lo dice mirando hacia otro lado.' }],
			mapNote: 'Gimnasio de Percy (Planta) · el césped, de noche',
			onEnter: [{ script: 'b07_estadio_entrada', cond: '!flag.b07_gym_hoyuelo_visto', once: true }],
			spots: [
				{ label: 'Retar a Percy', sub: 'Líder de Hoyuelo · tipo Planta', icon: '🌿', cond: CENA + ' && !' + PERCY, new: 'true', talk: [{ script: 'b07_percy_reto' }] },
				{ label: 'Percy', sub: 'Riega la maceta del punto de penalti', icon: '🌿', cond: PERCY, talk: [{ script: 'b07_percy_despues' }] },
				{ label: 'El césped, de noche', sub: 'Rhi te espera en el centro del campo', icon: '🌙', cond: 'quest.b07_t_rhi == "estadio"', new: 'true', talk: [{ script: 'b07_rhi_estadio' }] },
				{ label: 'Entrenador del estadio', sub: 'Un ayudante de Percy calienta en la banda', icon: '🥾', action: { trainer: 'gym_hoyuelo_ayudante' } },
				{ label: 'El vestuario', sub: 'Taquillas, bancos y un cartel torcido', icon: '🚪', talk: [{ script: 'b07_vestuario' }] },
			],
		},

		// ---------- El Campo de los Hargreave ----------
		campo_hargreave: {
			name: 'El Campo de los Hargreave', short: 'El Campo', parent: 'hoyuelo', kind: 'area',
			bg: { type: 'ranch', ground: '#5a9a4a', far: '#a8b8a0' },
			desc: 'Un prado de alquiler a las afueras de Hoyuelo, convertido en campo de fútbol a fuerza de cal y de paciencia: dos porterías torcidas, una banda pintada a mano, una caseta de herramientas con la puerta que no cierra y un césped de verdad, joven, que todavía tiene calvas.\n\nEn la caseta, una pizarra: «HORARIO DE LA ESCUELA · MARTES Y JUEVES · TRAER BOTAS (Y A SU POKÉMON)».',
			descNight: 'De noche, el Campo es hierba oscura y dos porterías blancas que se ven desde lejos. Los Wooloo del vecino se cuelan por la valla y duermen en el área. En la caseta, Gareth ha dejado una lámpara encendida, por si alguien viene a entrenar tarde.',
			mapNote: 'Negocio: El Campo de los Hargreave · revancha con Rhi',
			spots: [
				{ label: 'El Campo (negocio)', sub: 'Socio: Gareth Hargreave', icon: '⚽', cond: 'flag.b07_campo', action: { venture: 'b07_campo' } },
				{ label: 'Gareth, pintando la banda', sub: 'Con un carrito de cal y mucha calma', icon: '🧑‍🌾', talk: [{ script: 'b07_gareth_campo' }] },
				{ label: 'Hablarlo con Rhi', sub: 'Te esquiva desde lo del estadio', icon: '💬', cond: DOLIDA + ' && ' + COMBATE, new: 'true', talk: [{ script: 'b07_rhi_reparar' }] },
				{ label: 'Revancha con Rhi', sub: 'Una al día, con focos de obra y con todo', icon: '🔥', cond: COMBATE + ' && !(' + DOLIDA + ')', talk: [{ script: 'b07_rhi_revancha' }] },
			],
		},

		// ---------- Terrazas de Hoyuelo (entrenamiento) ----------
		terrazas_hoyuelo: {
			name: 'Terrazas de Hoyuelo', short: 'Terrazas', parent: 'hoyuelo', kind: 'area',
			bg: { type: 'ranch', ground: '#6aa35a', far: '#b8c8a8' },
			desc: 'Los bancales de la ladera: escalones de hierba sujetos con muros de piedra seca, uno encima de otro, con huertos, frutales y Wooloo pastando en cada nivel. Desde arriba se ve todo el valle, el estadio y la figura blanca de la colina de enfrente.\n\nEn el bancal del medio, los granjeros del pueblo entrenan a sus Pokémon entre faena y faena. En el más alto, junto a un banco de piedra, siempre hay un termo de té.',
			descNight: 'De noche, las terrazas son una escalera de sombras. En el bancal más alto, el banco de piedra brilla un poco con la luna. Los Wooloo duermen en fila contra los muros, como si alguien los hubiera colocado.',
			mapNote: 'Entrenamiento (tope 70) · premio de Percy · cosecha diaria de los bancales',
			spots: [
				{ label: 'El bancal del medio', sub: 'Zona de entrenamiento (nivel recomendado 70)', icon: '🌾', action: { training: {
					cap: 70, trainers: ['terraza_hoy_1', 'terraza_hoy_2', 'terraza_hoy_3'], npc: 'percy', coach: 'Percy',
					prize: { wins: 3, script: 'b07_premio_terrazas' },
					closed: 'Percy te mira el equipo y se rasca la nuca. «Uy. Con esos, los granjeros no te van a enseñar nada que no sepas. Pero si quieres echar unos combates de exhibición, ellos encantados: les gusta perder con gente que sabe».',
				} } },
				{ label: 'Percy, en el bancal más alto', sub: 'Un banco de piedra y un termo de té', icon: '🫖', talk: [
					{ cond: '!flag.b07_percy_terrazas', script: 'b07_percy_terrazas' },
					{ script: 'b07_percy_te' },
				], new: '!flag.b07_percy_terrazas' },
				{ label: 'Los huertos de los bancales', sub: 'Manzanos, bayas y un Wooloo que vigila', icon: '🍎', new: '!flag.rec_b07_bancales', action: { gather: 'b07_bancales' } },
			],
		},
	},

	// =====================================================================
	// ENTRENADORES
	// =====================================================================
	trainers: {
		// ----- Ruta 3 -----
		galr3_ewan: { name: 'Ewan', cls: 'Carretero', ai: 3, reward: 2720,
			team: [
				{ sp: 'mudsdale', lv: 67, moves: ['highhorsepower', 'heavyslam', 'rockslide', 'bodypress'], ability: 'stamina' },
				{ sp: 'coalossal', lv: 68, moves: ['heatcrash', 'stoneedge', 'flamethrower', 'stealthrock'], ability: 'steamengine' },
			],
			intro: 'Llevo treinta años bajando carbón por esta ruta. Ahora bajo papas. Los Mudsdale no notan la diferencia. Yo sí: las papas no queman. ¡Combate, que se me enfrían!',
			win: 'Bueno. Me vuelvo a dormir debajo de la carreta. Si ves a mi Mudsdale comiéndose las papas, no le digas nada. Se lo ha ganado.',
			look: { hair: 'cap', hairColor: '#6b4a2b', outfit: '#5a4a3a', outfit2: '#c9a66b', skin: 1, eyesStyle: 'sleepy', mouth: 'smile', acc: 'beard', collar: 'vest' } },
		galr3_tilly: { name: 'Tilly', cls: 'Criadora', ai: 3, reward: 2720,
			team: [
				{ sp: 'ninetales', lv: 67, moves: ['flamethrower', 'extrasensory', 'nastyplot', 'solarbeam'], ability: 'flashfire' },
				{ sp: 'arcanine', lv: 68, moves: ['flareblitz', 'extremespeed', 'wildcharge', 'crunch'], ability: 'intimidate' },
			],
			intro: 'Cepillo a mis Pokémon de fuego aquí porque la fábrica vieja todavía guarda calor y no se les enfría el pelo. Si me ganas, te cuento el truco del cepillo. Si no, también. Me encanta contarlo.',
			win: 'El truco: a contrapelo, nunca. Ni con un Arcanine ni con una persona. Apúntatelo.',
			look: { hair: 'braids', hairColor: '#c4743a', outfit: '#8a3a2a', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'freckles', collar: 'apron' } },
		galr3_ross: { name: 'Ross', cls: 'Exoperario', ai: 3, reward: 2720,
			team: [
				{ sp: 'skuntank', lv: 67, moves: ['crunch', 'poisonjab', 'suckerpunch', 'flamethrower'], ability: 'aftermath' },
				{ sp: 'klinklang', lv: 67, moves: ['geargrind', 'wildcharge', 'shiftgear', 'thunderwave'], ability: 'clearbody' },
				{ sp: 'obstagoon', lv: 68, moves: ['obstruct', 'nightslash', 'crosschop', 'facade'], ability: 'guts' },
			],
			intro: 'Trabajé en esa fábrica dieciocho años. Calderas Ashford. Un día llegaron unos señores con el logo redondo, compraron, cerraron y se fueron. Ni se quitaron el abrigo. Vengo a mirarla de vez en cuando. Y a combatir con quien pase.',
			win: 'Buen combate. —Mira la chimenea—. Esa equis del logo la pinté yo. No se lo digas a nadie. Bueno, dilo. Ya da igual.',
			look: { hair: 'short', hairColor: '#4a3a2a', outfit: '#3a4a5a', outfit2: '#e98a3a', skin: 2, eyesStyle: 'tired', mouth: 'flat', acc: 'stubble', collar: 'jacket', build: 'broad' } },
		galr3_moss: { name: 'Moss', cls: 'Minero retirado', npc: 'minero_galar', ai: 3, reward: 2760,
			team: [
				{ sp: 'gigalith', lv: 68, moves: ['stoneedge', 'earthquake', 'heavyslam', 'stealthrock'], ability: 'sturdy' },
				{ sp: 'machamp', lv: 68, moves: ['dynamicpunch', 'knockoff', 'stoneedge', 'icepunch'], ability: 'noguard' },
				{ sp: 'conkeldurr', lv: 69, moves: ['hammerarm', 'knockoff', 'stoneedge', 'icepunch'], ability: 'guts' },
			],
			intro: 'Cuarenta años ahí abajo. Ya no bajo, pero limpio la lámpara todos los días, por si acaso. Antes de entrar en la mina se combate. Es tradición. Bueno, me la acabo de inventar. Pero suena a tradición.',
			win: 'Bien. Puedes bajar. Si ves a una chica pelirroja con un Diggersby, dile que Moss le ha dejado el bocadillo en la vagoneta tres. El de queso.' },

		// ----- Mina de Galar -----
		mina_galar_t1: { name: 'Agatha', cls: 'Minera', npc: 'minero_galar', ai: 3, reward: 2720,
			team: [
				{ sp: 'excadrill', lv: 67, moves: ['earthquake', 'ironhead', 'rockslide', 'swordsdance'], ability: 'moldbreaker' },
				{ sp: 'gigalith', lv: 68, moves: ['stoneedge', 'earthquake', 'heavyslam', 'stealthrock'], ability: 'sturdy' },
			],
			intro: '¿Turista? ¿De la Gira? Pues aquí abajo no hay fotos bonitas. Hay polvo, vetas y Pokémon que no saben que existes hasta que les pisas. Como yo. ¡Combate!',
			win: 'Va. Sabes pisar. Sigue la cinta hacia abajo. Y no toques la pared de las vetas si no sabes picar: se viene encima.',
			look: { hair: 'cap', hairColor: '#2a2420', outfit: '#8a6448', outfit2: '#f2c84a', skin: 3, eyesStyle: 'sharp', mouth: 'flat', acc: 'goggles', collar: 'vest' } },
		mina_galar_t2: { name: 'Bram', cls: 'Minero', npc: 'minero_galar', ai: 3, reward: 2720,
			team: [
				{ sp: 'conkeldurr', lv: 67, moves: ['hammerarm', 'knockoff', 'stoneedge', 'icepunch'], ability: 'guts' },
				{ sp: 'coalossal', lv: 68, moves: ['heatcrash', 'stoneedge', 'flamethrower', 'stealthrock'], ability: 'flashfire' },
			],
			intro: 'La chica de los huesos me ha dicho que practique en la galería lateral, que hago mucho ruido cerca de su máquina. ¡Pues practico contigo! ¡Con mucho ruido!',
			win: '¡Mucho ruido y poco carbón! Eso decía mi abuelo. Nunca supe qué quería decir. Ahora lo sé.' },
		mina_galar_t3: { name: 'Hana', cls: 'Espeleóloga', ai: 3, reward: 2760,
			team: [
				{ sp: 'swoobat', lv: 67, moves: ['airslash', 'psychic', 'calmmind', 'heatwave'], ability: 'simple' },
				{ sp: 'stunfiskgalar', lv: 68, moves: ['earthpower', 'flashcannon', 'snaptrap', 'muddywater'], ability: 'mimicry' },
				{ sp: 'dugtrio', lv: 68, moves: ['earthquake', 'stoneedge', 'suckerpunch', 'slash'], ability: 'arenatrap' },
			],
			intro: 'Chist. Estoy contando gotas. En esta galería caen cuarenta y una por minuto. Si combatimos muy fuerte, caen más. Vamos a comprobarlo.',
			win: 'Cincuenta y tres. Ha sido un combate de cincuenta y tres gotas. Lo apunto. Es un buen número.',
			look: { hair: 'bob', hairColor: '#3a2a2a', outfit: '#3a5a4a', outfit2: '#e9c46a', skin: 2, eyesStyle: 'narrow', mouth: 'smile', acc: 'headphones', collar: 'jacket' } },

		// ----- Ruta 4 -----
		galr4_daisy: { name: 'Daisy', cls: 'Repostera', ai: 3, reward: 2720,
			team: [
				{ sp: 'alcremie', lv: 67, moves: ['dazzlinggleam', 'mysticalfire', 'calmmind', 'recover'], ability: 'sweetveil' },
				{ sp: 'dubwool', lv: 68, moves: ['cottonguard', 'doubleedge', 'bodypress', 'wildcharge'], ability: 'fluffy' },
			],
			intro: 'Bajo al molino a por harina para la tarta de la final infantil. Mi Alcremie le pone la nata. Mi Dubwool se come la mitad. Si me ganas, te guardo un trozo. Si pierdes, también, que hay mucha.',
			win: 'Un trozo para ti, entonces. El del medio, que tiene más nata. Dile a Rhi que el sábado hay tarta. Ya lo sabe. Díselo igual.',
			look: { hair: 'bun', hairColor: '#e9d27a', outfit: '#e98aa8', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'happy', mouth: 'smile', acc: 'flower', collar: 'apron' } },
		galr4_cosmo: { name: 'Cosmo', cls: 'Chico calabaza', ai: 3, reward: 2760,
			team: [
				{ sp: 'gourgeist', lv: 67, moves: ['phantomforce', 'seedbomb', 'painsplit', 'leechseed'], ability: 'frisk' },
				{ sp: 'manectric', lv: 67, moves: ['thunderbolt', 'flamethrower', 'voltswitch', 'overheat'], ability: 'lightningrod' },
				{ sp: 'perrserker', lv: 68, moves: ['ironhead', 'closecombat', 'crunch', 'metalburst'], ability: 'toughclaws' },
			],
			intro: '¡BU! —Te mira—. ¿No te has asustado? Va. Llevo practicando desde agosto. ¡Combate! A lo mejor así te asustas.',
			win: 'Tampoco te has asustado. Mi Gourgeist dice que tienes cara de haber visto cosas peores. ¿Has visto cosas peores?',
			look: { hair: 'spiky', hairColor: '#e98a3a', outfit: '#2a2420', outfit2: '#e98a3a', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'mask', collar: 'hoodie' } },

		// ----- Terrazas de Hoyuelo (zona de entrenamiento) -----
		terraza_hoy_1: { name: 'Bess', cls: 'Granjera', ai: 2,
			team: [
				{ sp: 'whimsicott', lv: 67, moves: ['moonblast', 'energyball', 'leechseed', 'tailwind'] },
				{ sp: 'sawsbuck', lv: 68, moves: ['hornleech', 'doubleedge', 'megahorn', 'swordsdance'] },
			],
			intro: 'Entre riego y riego, un combate. Percy dice que si un Pokémon solo trabaja, se le pone la cara mustia. ¡Como a las lechugas!',
			win: 'Ni mustia ni nada. Me has dejado la cara como una lechuga de invierno. Bien regada.',
			look: { hair: 'braids', hairColor: '#e9d27a', outfit: '#5a7a3a', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'happy', mouth: 'grin', acc: 'hat freckles', collar: 'apron' } },
		terraza_hoy_2: { name: 'Owen', cls: 'Granjero', ai: 2,
			team: [
				{ sp: 'roserade', lv: 68, moves: ['sludgebomb', 'energyball', 'shadowball', 'toxicspikes'] },
				{ sp: 'ferrothorn', lv: 68, moves: ['powerwhip', 'gyroball', 'knockoff', 'stealthrock'] },
			],
			intro: 'Las rosas, abajo; las papas, arriba; los Ferrothorn, donde no estorben. Aquí todo tiene su bancal. El tuyo es este. ¡A ver si lo aguantas!',
			win: 'Aguantas. Y sin pincharte. Eso con un Ferrothorn tiene mérito.',
			look: { hair: 'cap', hairColor: '#3a2a1e', outfit: '#6a5a3a', outfit2: '#c9a66b', skin: 2, eyesStyle: 'normal', mouth: 'smile', acc: 'mustache', collar: 'vest', capColor: '#5a7a3a' } },
		terraza_hoy_3: { name: 'Gwen', cls: 'Granjera', ai: 3,
			team: [
				{ sp: 'lilligant', lv: 68, moves: ['quiverdance', 'petaldance', 'sleeppowder', 'gigadrain'] },
				{ sp: 'gourgeist', lv: 68, moves: ['phantomforce', 'seedbomb', 'painsplit', 'leechseed'] },
				{ sp: 'ludicolo', lv: 69, moves: ['surf', 'gigadrain', 'icebeam', 'raindance'] },
			],
			intro: 'Yo entreno con la abuela de Percy desde niña. Bueno, entrenaba. Ahora entreno con su banco. Se sienta él, se sienta el termo y me miran los dos. ¡Combate!',
			win: 'Ella habría dicho «muy bien, cielo, y ahora a recoger». Así que muy bien. Y ahora a recoger. Yo, no tú.',
			look: { hair: 'long', hairColor: '#9aa0a8', outfit: '#3a6a4a', outfit2: '#e9c46a', skin: 1, eyesStyle: 'sleepy', mouth: 'smile', acc: 'bandana', collar: 'cardigan', age: 'old' } },

		// ----- Estadio de Hoyuelo -----
		gym_hoyuelo_ayudante: { name: 'Fergus', cls: 'Ayudante del estadio', ai: 3, reward: 2800, bg: 'gym',
			team: [
				{ sp: 'eldegoss', lv: 67, moves: ['energyball', 'cottonguard', 'pollenpuff', 'hypervoice'], ability: 'regenerator' },
				{ sp: 'appletun', lv: 68, moves: ['appleacid', 'dragonpulse', 'recover', 'bodypress'], ability: 'thickfat' },
			],
			intro: 'Antes de Percy, la banda. Bueno, no es obligatorio. Pero Percy dice que a la gente le sienta bien calentar. Y a mí me sienta bien que alguien me hable.',
			win: 'Calentad{o|a|e} estás. Percy está en el centro del campo. Te va a ofrecer té antes de combatir. Acéptalo. Si no, se queda triste toda la tarde.',
			look: { hair: 'short', hairColor: '#c4743a', outfit: '#5aa36b', outfit2: '#e9e3d0', skin: 1, eyesStyle: 'normal', mouth: 'smile', acc: 'freckles', collar: 'tshirt' } },

		// ----- Nate (amistoso opcional) -----
		nate_1: { name: 'Nate', cls: 'Compañero de Rhi', npc: 'nate', ai: 4, iv: 27, reward: 4000, bg: 'indoor',
			team: [
				{ sp: 'miltank', lv: 67, moves: ['rollout', 'bodyslam', 'milkdrink', 'zenheadbutt'], ability: 'thickfat', nature: 'impish' },
				{ sp: 'polteageist', lv: 67, moves: ['shellsmash', 'shadowball', 'gigadrain', 'strengthsap'], ability: 'weakarmor', nature: 'modest' },
				{ sp: 'snorlax', lv: 68, moves: ['bodyslam', 'crunch', 'rest', 'highhorsepower'], ability: 'thickfat', nature: 'adamant' },
				{ sp: 'slaking', lv: 69, moves: ['gigaimpact', 'slackoff', 'shadowclaw', 'hammerarm'], ability: 'truant', item: 'sitrusberry', nature: 'adamant', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 1 }],
			intro: 'Qué flojera. Va. Pero desde el sofá. —No se levanta. Sus Pokémon sí—.',
			win: 'Bien. Ya me puedo dormir sin remordimientos. —Se tapa con la manta—. Tampoco tenía.',
			lose: 'Qué flojera, ganar. Ahora Rhi va a querer que entrene. —Bosteza—. Vuelve cuando quieras. Estaré aquí. Siempre estoy aquí.' },

		// ----- Rhi (hilo «La delantera»): de noche en el estadio y revancha en el Campo -----
		rhi_7: { name: 'Rhi', cls: 'Rival', npc: 'rhi', ai: 4, iv: 28, reward: 5600, bg: 'gym',
			gimmick: 'dynamax', ace: 'cinderace',
			team: [
				{ sp: 'falinks', lv: 67, moves: ['closecombat', 'megahorn', 'rockslide', 'ironhead'], ability: 'defiant', nature: 'adamant', iv: 26 },
				{ sp: 'grimmsnarl', lv: 68, moves: ['spiritbreak', 'falsesurrender', 'suckerpunch', 'thunderwave'], ability: 'prankster', nature: 'adamant', iv: 26 },
				{ sp: 'sirfetchd', lv: 68, moves: ['leafblade', 'brutalswing', 'closecombat', 'knockoff'], ability: 'steadfast', item: 'leek', nature: 'adamant', iv: 27 },
				{ sp: 'toxtricity', lv: 68, moves: ['overdrive', 'sludgebomb', 'boomburst', 'voltswitch'], ability: 'punkrock', nature: 'modest', iv: 27 },
				{ sp: 'corviknight', lv: 69, moves: ['bravebird', 'ironhead', 'bodypress', 'uturn'], ability: 'mirrorarmor', nature: 'impish', iv: 27 },
				{ sp: 'cinderace', lv: 69, gmax: true, moves: ['pyroball', 'bounce', 'uturn', 'zenheadbutt'], ability: 'blaze', item: 'sitrusberry', nature: 'jolly', iv: 30 },
			],
			items: [{ id: 'hyperpotion', n: 1 }], // balance (paso 5): opcional y repetible; 2,8 derrotas de media del bot con as 70 y dos Hiperpociones
			intro: 'En casa. En mi césped. Bueno, en su plástico. Me da igual. ¡Saque de centro!',
			win: '…Gol. Tuyo. En mi campo. —Se ríe, y no le sale del todo—. Bueno. Bueno. Ha sido limpio. Eso es lo único que importa.',
			lose: '¡GOOOOL! ¡EN CASA! ¡POR LA ESCUADRA! —Corre media cancha con los brazos abiertos y vuelve—. Ha sido limpio, ¿eh? Dime que ha sido limpio.' },

		// ----- Percy (líder de Hoyuelo, Planta) -----
		percy_g: { name: 'Percy', cls: 'Líder', npc: 'percy', ai: 4, iv: 28, reward: 7590, bg: 'gym', terrain: 'gym',
			gimmick: 'dynamax', ace: 'eldegoss',
			team: [
				{ sp: 'abomasnow', lv: 66, moves: ['blizzard', 'woodhammer', 'iceshard', 'earthquake'], ability: 'snowwarning', nature: 'brave', iv: 27 },
				{ sp: 'shiftry', lv: 67, moves: ['leafblade', 'suckerpunch', 'knockoff', 'fakeout'], ability: 'pickpocket', nature: 'jolly', iv: 27 },
				{ sp: 'flapple', lv: 67, moves: ['gravapple', 'acrobatics', 'dragondance', 'uturn'], ability: 'hustle', nature: 'adamant', iv: 28 },
				{ sp: 'appletun', lv: 68, moves: ['appleacid', 'dragonpulse', 'recover', 'bodypress'], ability: 'thickfat', item: 'leftovers', nature: 'bold', iv: 28 },
				{ sp: 'eldegoss', lv: 69, moves: ['energyball', 'pollenpuff', 'hypervoice', 'synthesis'], ability: 'cottondown', item: 'sitrusberry', nature: 'modest', iv: 31 },
			],
			items: [{ id: 'hyperpotion', n: 1 }, { id: 'fullheal', n: 1 }],
			intro: 'Ya está. Té tomado, manos limpias. —Se arremanga—. Vamos a ver cómo crece lo tuyo.',
			win: 'Bien. Muy bien. Has cosechado antes de que madurara lo mío. Eso no lo hace cualquiera.',
			lose: 'Uy. Lo siento. —Lo dice de verdad—. Vuelve cuando quieras. Las plantas no guardan rencor. Yo tampoco.' },
	},

	// =====================================================================
	// GUIONES
	// =====================================================================
	scripts: {
		// =================== MINA: PETRA Y LOS FÓSILES ===================
		b07_petra: [
			{ if: 'flag.b07_petra_mina', then: [{ end: true }] },
			{ set: { 'flag.b07_petra_mina': true } },
			{ text: 'Debajo de la lona, inclinada sobre la mesa plegable con una lupa en un ojo y un cepillo en la boca, una chica con coleta naranja y gafas de protección en la frente. A su lado, un Diggersby con un casco de minero que le baila en la cabeza clasifica piedras en tres cubos.' },
			{ text: 'Te oye llegar, se gira, se le cae el cepillo de la boca y lo atrapa al vuelo el Diggersby sin mirar.' },
			{ say: 'petra', text: '¡{jugador}! ¡¿Tú aquí?! ¡En una mina! ¡En Galar! —Se quita la lupa y se queda con la marca redonda alrededor del ojo—. Bueno, yo también estoy en una mina en Galar. Somos dos. Estadísticamente, es muchísimo.' },
			{ say: 'petra', text: 'Te cuento, te cuento. Después de lo del valle, en Teselia, la Prof. Encina me pasó una revista de Galar. Un artículo de dos párrafos: «En la Mina de Galar salen fósiles que no encajan con nada». Dos párrafos. Crucé la Puerta al día siguiente. Pala vino con la maleta en la cabeza.' },
			{ text: 'El Diggersby levanta una oreja al oír su nombre. Con la otra sigue clasificando.' },
			{ say: 'petra', text: 'Y es verdad. ¡Es verdad! Mira. —Te enseña dos piedras partidas por la mitad—. Esta es la parte de arriba de algo con plumas. **Ornitofósil**. Y esta, la de abajo de algo con una cola enorme. **Dracofósil**. No son del mismo bicho. No pueden serlo. No encajan.' },
			{ say: 'petra', text: '…Pero si las pones juntas en la máquina, la máquina dice que sí. Que sirve. Que se puede. —Se le pone una sonrisa enorme—. Esto no es paleontología. Es un sándwich. **Me encanta**.' },
			{ say: 'petra', text: 'Hay cuatro mitades: dos de arriba, **pájaro** o **pez**, y dos de abajo, **dragón** o **plesio**, que es un bicho de agua fría con cuello largo. Una de arriba y una de abajo, y sale algo. Cuatro mezclas posibles. Yo quiero ver las cuatro. Las cuatro.' },
			{ say: 'petra', text: 'Primera regla de la excavación: no se pica con prisa. Segunda: si se cae el techo, se corre. Me he caído en esta mina dos veces, siempre en la misma galería. Ya es un dato. Ándale, pica conmigo. Elige qué veta.' },
			{ quest: 'b07_s_fosiles', stage: 'mitades' },
			{ prompt: 'En la pared, dos vetas: una de arriba, con marcas de algo que podría ser…', choice: [
				{ text: 'La veta de las plumas', then: [{ set: { 'flag.b07_petra_arriba_ave': true } }] },
				{ text: 'La veta de las aletas', then: [{ set: { 'flag.b07_petra_arriba_pez': true } }] },
			] },
			{ prompt: '…y otra de abajo, más oscura, con algo que podría ser…', choice: [
				{ text: 'Una cola de dragón', then: [{ set: { 'flag.b07_petra_abajo_dra': true } }] },
				{ text: 'Un cuello largo, de agua fría', then: [{ set: { 'flag.b07_petra_abajo_din': true } }] },
			] },
			{ call: 'b07_petra_excavar' },
		],
		b07_petra_excavar: [
			{ text: 'Petra te da un pico fino y un martillo pequeño, se pone las gafas y se aparta medio paso. Pala se pone delante de ella, por si acaso.' },
			{ if: 'flag.b07_petra_arriba_ave && flag.b07_petra_abajo_dra', then: [{ minigame: { type: 'dig', id: 'b07_petra_veta_ad', title: 'La veta de Petra', theme: 'cueva', level: 2, hint: 'Petra marca con tiza dónde están las dos mitades. Destápalas enteras, sin prisa.', guaranteed: ['fossilizedbird', 'fossilizeddrake'], loot: [{ id: 'hardstone', w: 6 }, { id: 'stardust', w: 6 }], picks: 1, lootTitle: 'En la veta de Petra' }, onWin: [{ call: 'b07_petra_excavar_ok' }], onLose: [{ call: 'b07_petra_excavar_mal' }], onQuit: [{ call: 'b07_petra_excavar_mal' }] }] },
			{ if: 'flag.b07_petra_arriba_ave && flag.b07_petra_abajo_din', then: [{ minigame: { type: 'dig', id: 'b07_petra_veta_ai', title: 'La veta de Petra', theme: 'cueva', level: 2, hint: 'Petra marca con tiza dónde están las dos mitades. Destápalas enteras, sin prisa.', guaranteed: ['fossilizedbird', 'fossilizeddino'], loot: [{ id: 'hardstone', w: 6 }, { id: 'stardust', w: 6 }], picks: 1, lootTitle: 'En la veta de Petra' }, onWin: [{ call: 'b07_petra_excavar_ok' }], onLose: [{ call: 'b07_petra_excavar_mal' }], onQuit: [{ call: 'b07_petra_excavar_mal' }] }] },
			{ if: 'flag.b07_petra_arriba_pez && flag.b07_petra_abajo_dra', then: [{ minigame: { type: 'dig', id: 'b07_petra_veta_pd', title: 'La veta de Petra', theme: 'cueva', level: 2, hint: 'Petra marca con tiza dónde están las dos mitades. Destápalas enteras, sin prisa.', guaranteed: ['fossilizedfish', 'fossilizeddrake'], loot: [{ id: 'hardstone', w: 6 }, { id: 'stardust', w: 6 }], picks: 1, lootTitle: 'En la veta de Petra' }, onWin: [{ call: 'b07_petra_excavar_ok' }], onLose: [{ call: 'b07_petra_excavar_mal' }], onQuit: [{ call: 'b07_petra_excavar_mal' }] }] },
			{ if: 'flag.b07_petra_arriba_pez && flag.b07_petra_abajo_din', then: [{ minigame: { type: 'dig', id: 'b07_petra_veta_pi', title: 'La veta de Petra', theme: 'cueva', level: 2, hint: 'Petra marca con tiza dónde están las dos mitades. Destápalas enteras, sin prisa.', guaranteed: ['fossilizedfish', 'fossilizeddino'], loot: [{ id: 'hardstone', w: 6 }, { id: 'stardust', w: 6 }], picks: 1, lootTitle: 'En la veta de Petra' }, onWin: [{ call: 'b07_petra_excavar_ok' }], onLose: [{ call: 'b07_petra_excavar_mal' }], onQuit: [{ call: 'b07_petra_excavar_mal' }] }] },
		],
		b07_petra_excavar_ok: [
			{ set: { 'flag.b07_petra_excavado': true } },
			{ say: 'petra', text: '¡Enteras! ¡Las dos! ¡Sin una muesca! —Las agarra con las dos manos como si fueran huevos—. Pala, mira. Mira qué limpias. Pala está emocionado. Se le nota en la oreja izquierda.' },
			{ call: 'b07_petra_unir' },
		],
		b07_petra_excavar_mal: [
			{ say: 'petra', text: 'Nada, nada, no pasa nada. Se ha venido un poco de pared. A mí se me ha venido entera dos veces. —Se sacude el polvo del pelo—. Las vetas no se van. Cuando quieras, lo intentamos otra vez. Aquí estoy. Bueno, aquí y en el suelo.' },
		],
		b07_petra_otra_vez: [
			{ say: 'petra', text: '¿Otra vez a la veta? ¡Va! Primera regla: sin prisa.' },
			{ call: 'b07_petra_excavar' },
		],
		b07_petra_unir: [
			{ if: '!' + PAR_OK, then: [
				{ say: 'petra', text: 'Ahora mismo no tienes una de arriba y una de abajo que no hayamos juntado ya. Pica en la pared de las vetas, la de la galería de antes. Salen poco, pero salen. Y yo aquí, esperando con la máquina caliente.' },
				{ end: true },
			] },
			{ say: 'petra', text: 'Va, va, va. Pon las mitades en la bandeja. Una de arriba y una de abajo. ¿Cuál hacemos?' },
			{ prompt: 'La máquina de Petra traquetea, esperando.', choice: [
				unir('dracozolt', 'Plumas + cola de dragón', AVE, DRA, 'b07_fosil_dracozolt', 'Pájaro y dragón. Pájaro y dragón. —Gira la manivela con las dos manos—. Si sale con alas, me desmayo. Si sale sin alas, me desmayo también.'),
				unir('arctozolt', 'Plumas + cuello de agua fría', AVE, DIN, 'b07_fosil_arctozolt', 'Pájaro y plesio. Uno vuela y el otro bucea en agua helada. Esto va a salir muy raro. Muy raro. Muy bonito.'),
				unir('dracovish', 'Aletas + cola de dragón', PEZ, DRA, 'b07_fosil_dracovish', 'Pez y dragón. Fíjate: la cabeza va abajo. O sea, va donde van las patas. No. No pienso en ello. Manivela.'),
				unir('arctovish', 'Aletas + cuello de agua fría', PEZ, DIN, 'b07_fosil_arctovish', 'Pez y plesio. Los dos de agua. Esto debería encajar. —Gira—. No va a encajar. Me encanta.'),
				{ text: 'Mejor otro día', then: [{ say: 'petra', text: 'Va. Guárdalas bien, que se desconchan. En papel de periódico, como los huevos.' }, { end: true }] },
			] },
			{ say: 'petra', text: '—Apunta en una ficha, con la lengua fuera—. «Mitad de arriba: de un sitio. Mitad de abajo: de otro sitio. Resultado: imposible. Y sin embargo». Subrayado dos veces.', cond: '!(' + CUATRO + ')' },
			{ intel: { npc: 'petra', text: 'En la Mina de Galar, con un laboratorio de campo y una máquina que traquetea: junta mitades de fósiles que «no encajan con nada» (Ornitofósil o Ictiofósil arriba, Dracofósil o Plesiofósil abajo). Le encanta que no encajen.' } },
			{ if: CUATRO, then: [
				{ say: 'petra', text: 'Las cuatro. Las CUATRO. —Se sienta en una vagoneta. Se le empañan las gafas. Se calla un momento—. Cuatro criaturas que no deberían existir y existen. Gracias. De verdad. Esto lo voy a contar en un congreso y nadie me va a creer, y me da igual.' },
				{ quest: 'b07_s_fosiles', stage: 'hecha', done: true },
				{ give: 'rarebone', n: 2 },
			] },
		],
		b07_petra_charla: [
			{ if: '!flag.b07_petra_excavado', then: [
				{ say: 'petra', text: '¿Probamos otra vez con mi veta? La de tiza. Las mitades siguen ahí, esperando a que alguien las saque sin prisa.' },
				{ choice: [
					{ text: 'Picar en la veta de Petra', then: [{ call: 'b07_petra_otra_vez' }] },
					{ text: 'Ahora no', then: [{ say: 'petra', text: 'Va. La veta no se va. Yo tampoco. Bueno, a veces me voy al suelo.' }] },
				] },
				{ end: true },
			] },
			{ text: 'Petra está de rodillas junto a la máquina, apretando un tornillo con la lengua fuera. Pala sujeta la linterna. Al verte, los dos levantan la cabeza a la vez.' },
			{ say: 'petra', text: 'Sin mitades nuevas, de momento. Salen en la pared de las vetas, la de la galería de antes. Poco. Muy poco. Cuando salga una, tráemela. Me la como a besos. A la piedra, no a ti.', cond: '!(' + CUATRO + ')' },
			{ say: 'petra', text: 'Ya están las cuatro. Me quedo unos días más, a dibujarlas. Si salen más mitades, aquí estoy, pero ya no te pido nada: ya me lo has dado todo. Bueno, todo no. Pero las cuatro sí.', cond: CUATRO },
			{ if: 'quest.b07_s_fosiles == "mitades"', then: [
				{ choice: [
					{ text: '«Sigue tú. Yo tengo que seguir hacia Hoyuelo.»', then: [
						{ say: 'petra', text: 'Claro. Claro, claro. —Se limpia las manos en el chaleco, que está más sucio que las manos—. No te preocupes por mí: me quedo con la máquina. Si te salen mitades por ahí, me las traes. Y si no, me escribes. Lo de hoy ya es más de lo que traía.' },
						{ say: 'petra', text: '—Te da un abrazo de lado, con polvo—. Primera regla: no se pica con prisa. Segunda: se vuelve a por los amigos. La segunda me la acabo de inventar.' },
						{ quest: 'b07_s_fosiles', stage: 'hecha', done: true },
					] },
					{ text: '«Seguiré buscando.»', then: [{ say: 'petra', text: '¡Así me gusta! La pared de las vetas, ya sabes. Pica despacio.' }] },
				] },
			] },
		],

		// =================== HOYUELO: LLEGADA ===================
		b07_hoyuelo_llegada: [
			{ if: LLEGADA, then: [{ end: true }] },
			{ set: { 'flag.b07_hoyuelo_llegada': true } },
			{ text: 'Cruzas la cancela de «CUIDADO CON LOS BALONES». Casas de piedra, tejados de musgo, un gallinero, tres Wooloo dormidos en mitad de la calle y, al fondo, un estadio con el techo de hierba que parece una colina más.' },
			{ text: 'Un balón pasa rozándote la oreja, rebota en una farola, en un Wooloo, en una pared, y vuelve exactamente a los pies de quien lo ha chutado.' },
			{ say: 'rhi', text: '¡{jugador}! ¡HAS LLEGADO! ¡A MI PUEBLO! —Te agarra del brazo con una mano y del balón con la otra—. ¿Has visto el rebote? ¿Lo has visto? Lo he ensayado toda la mañana. Me ha salido a la primera. Bueno, a la undécima. ¡Pero ha salido!' },
			{ text: '{riolu} mira el balón, mira a Rhi, mira el Wooloo del rebote. El Wooloo sigue dormido.', cond: LUC },
			{ say: 'rhi', text: '¿Medalla? ¿Tienes ya la de aquí? —Te mira la chaqueta—. No. Da igual. ¡Da igual! Mi padre ha hecho cena para un equipo entero y si no vienes se la va a tener que comer él. Y no puede. Y lo va a intentar.' },
			{ say: 'rhi', text: '¡Vamos! Es aquí al lado. La de la portería pintada en el garaje. No te asustes del sofá. Hay alguien en el sofá. Es Nate. Lleva ahí desde el martes.' },
			{ quest: 'b07_t_rhi', stage: 'casa' },
			{ say: 'rotom', text: '¡Bzzt! **Pueblo Hoyuelo**. Aquí está el gimnasio de **Percy**, el líder de tipo Planta. Y la casa de Rhi. Rhi nos lleva del brazo. No creo que podamos negarnos. No creo que queramos.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Hoyuelo. Gimnasio de Percy, tipo Planta. Y la casa de Rhi. Vamos. No nos suelta.', cond: PURG },
			{ go: 'casa_rhi' },
		],

		// =================== LA CENA EN CASA DE RHI ===================
		b07_cena: [
			{ if: CENA, then: [{ end: true }] },
			{ set: { 'flag.b07_casa_rhi': true } },
			{ text: 'La casa huele a guiso desde la puerta. En la cocina, un hombre ancho con un chaleco verde acolchado, bigote rojo y las manos más grandes que has visto nunca remueve una olla del tamaño de un barril. Se da la vuelta con el cucharón en alto.' },
			{ say: 'padre_rhi', text: '¡Ah! ¡Aquí está! —Se limpia la mano en el trapo antes de dártela. La mano es áspera y cálida, como la tierra al sol—. Gareth. Gareth Hargreave. El padre. Siéntate, siéntate. No en esa silla, que cojea. En esa tampoco. En el banco.' },
			{ say: 'rhi', text: 'Papá, le dije que vendría con medalla.' },
			{ say: 'padre_rhi', text: 'Ya. Y yo te dije que me daba igual. —Le guiña un ojo a la olla, no a ti—. La medalla se gana mañana. La cena se enfría hoy.' },
			{ set: { 'flag.b07_padre_rhi': true } },
			// ----- Nate en el sofá -----
			{ text: 'En el salón, en un sofá hundido con una manta de cuadros, un chico muy largo con el pelo lila revuelto está tumbado con un pie fuera y el otro en el respaldo. Abre un ojo.' },
			{ say: 'nate', text: 'Ah. Hola. —Cierra el ojo—. Qué flojera levantarse. Me alegro de verte. Lo digo tumbado, pero cuenta.' },
			{ say: 'rhi', text: 'Lleva ahí desde el martes. ¡Desde el MARTES! Vino a «pasar una tarde».' },
			{ say: 'nate', text: 'Es un sofá muy bueno.' },
			{ say: 'padre_rhi', text: 'Es un sofá muy bueno. Lo eligió la… —Se para. Remueve—. Es un sofá muy bueno.' },
			{ set: { 'flag.b07_nate': true } },
			{ intel: { npc: 'nate', text: 'En Hoyuelo, en el sofá de los Hargreave «desde el martes». Vino a pasar una tarde. Habla tumbado y dice que cuenta.' } },
			// ----- La cena -----
			{ text: 'La cena es guiso, pan, papas asadas, más guiso y una tarta de manzana que Gareth llama «el postre de los martes» aunque es domingo. Gareth sirve a todo el mundo dos veces. A Nate le lleva el plato al sofá. Nate se lo come tumbado sin derramar nada. Es casi un talento.' },
			{ text: '{riolu} recibe su propio cuenco, con un trozo de pan encima «para que haga cuchara». Lo hace cuchara.', cond: LUC },
			{ say: 'padre_rhi', text: 'Así que tú eres {el|la|le} que le gana. —Te mira por encima del pan—. Rhi me lo cuenta todo. Bueno. Me cuenta cuando gana. Cuando pierde me cuenta el tiempo que hace. Y últimamente me cuenta mucho el tiempo.' },
			{ say: 'rhi', text: '¡PAPÁ!' },
			{ say: 'padre_rhi', text: 'Es bueno que te ganen. El césped también se pisa, y por eso crece. Si nadie lo pisa, se pone vago, se le llena de musgo y se olvida de para qué está.' },
			{ text: 'Habla del césped como si fuera alguien de la familia. Del que se enfada si lo riegas a mediodía. Del que se pone triste en noviembre. Del que «juega solo» cuando está bien cuidado. Rhi pone los ojos en blanco cada vez, y cada vez se le escapa una sonrisa.' },
			{ say: 'padre_rhi', text: 'Veinte años cuidé el del estadio. Hoja por hoja. Conocía cada calva, cada sitio donde se encharcaba, el rincón del córner donde los Wooloo se colaban a comer. Era el mejor césped de Galar. No lo digo yo. Lo decía el árbitro.' },
			{ say: 'padre_rhi', text: 'Y luego lo vendieron. El estadio. —Deja el cucharón—. A un socio. Un socio que no sale en ningún sitio. Ni en el periódico, ni en el contrato, ni en la placa de la entrada. Y lo primero que hizo fue arrancar la hierba y poner…' },
			{ text: 'Se le quiebra la voz. Una sola vez, en mitad de la frase. Carraspea. Se sirve más guiso aunque tiene el plato lleno.' },
			{ say: 'padre_rhi', text: '…plástico. Bueno. No es culpa de nadie. La gente que firma esas cosas no conoce la hierba. No se le puede pedir a nadie que quiera lo que no conoce.' },
			{ text: 'Rhi mira el plato. Nate, desde el sofá, ha abierto los dos ojos.' },
			{ say: 'rhi', text: '—Sin levantar la vista—. {jugador}. Tú has visto cosas. En la Gira. Gente que compra cosas sin firmar. —Te mira—. ¿Tú sabes quién es ese socio?' },
			{ prompt: 'Rhi te mira de frente. Gareth hace como que no escucha.', choice: [
				{ text: '«No sé su nombre. Pero sé de gente que compra así, sin firmar. Y no es buena gente.»', then: [
					{ af: { rhi: 3 } },
					{ say: 'rhi', text: '…Va. —Asiente despacio—. Va. Gracias por no decirme «seguro que no es nada». Todo el mundo me dice «seguro que no es nada». —Aprieta el tenedor—. Lo apunto. En la cabeza. Con rotulador.' },
					{ say: 'padre_rhi', text: 'Rhi.' },
					{ say: 'rhi', text: 'Ya, papá. Ya. No voy a hacer nada. —Pausa—. Hoy.' },
				] },
				{ text: '«No lo sé. Seguro que tu padre tiene razón: no es culpa de nadie.»', then: [
					{ say: 'rhi', text: 'Ya. —Pincha una papa—. Eso dice todo el mundo. —No lo dice enfadada. Lo dice cansada—.' },
				] },
				{ text: '«Pobre tu padre. Debe de ser horrible.»', then: [
					{ af: { rhi: -3 } },
					{ set: { 'flag.b07_rhi_dolida': true, 'vars.b07_af_rhi_perdida': '+3' } },
					{ say: 'rhi', text: '—Se le endurece la cara—. No es pobre. Es mi padre. —Deja el tenedor—. No le mires así. Odia que le miren así. Yo también.' },
					{ say: 'padre_rhi', text: 'Ya, ya. Que se enfría la tarta.' },
				] },
			] },
			// ----- El Campo -----
			{ say: 'padre_rhi', text: 'Bueno. Pero que no todo son penas, eh. —Se le ilumina la cara entera, de golpe, como un niño—. He alquilado un prado. A las afueras. Un prado normal, con vacas al lado y una caseta que no cierra.' },
			{ say: 'padre_rhi', text: 'Lo estoy convirtiendo en un campo. De verdad. Con hierba de verdad. Para los críos del pueblo, que ahora entrenan en plástico y se raspan las rodillas. Martes y jueves. Ya vienen ocho. Y sus Pokémon. Y los Wooloo del vecino, que no están invitados.' },
			{ say: 'padre_rhi', text: 'Si algún día te apetece meter la mano, eres bienvenid{o|a|e}. Ahí sí que no manda nadie más que la hierba. Y yo. Bueno. La hierba.' },
			{ set: { 'flag.b07_campo': true } },
			{ say: 'rotom', text: '¡Bzzt! Apunto: **El Campo de los Hargreave**, a las afueras de Hoyuelo. Se puede entrar de socio. ¡Mi primer negocio de fútbol! Bueno, el tuyo. Yo hago las cuentas.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. El Campo de los Hargreave. A las afueras. Se puede entrar de socio. Lo apunto.', cond: PURG },
			// ----- El reto -----
			{ text: 'Después de la tarta, mientras Gareth friega y Nate se duerme con el plato en la tripa, Rhi te lleva a la puerta de atrás. Fuera ya es de noche. Al fondo del pueblo, el estadio es una colina negra.' },
			{ say: 'rhi', text: 'Oye. Esta noche. —Mira hacia el estadio—. Tú y yo. En el campo de mi padre. Bueno, en lo que queda. Tengo la llave de la puerta de servicio. No me preguntes de dónde. De mi padre. No se la devolvió nunca.' },
			{ say: 'rhi', text: 'Un partido de verdad. Sin público, sin Gira, sin medallas. Solo tú y yo y la luna. —Sonríe de lado—. Y Cinderace. Que tiene una cosa nueva que enseñarte.' },
			{ say: 'rhi', text: 'Ah, y mañana Percy. El líder. Es el chico más buena onda de Galar. No te fíes. Los buena onda son los que más fuerte chutan.' },
			{ quest: 'b07_t_rhi', stage: 'estadio' },
			{ quest: 'b07_m3', stage: 'gimnasio' },
			{ give: 'hojacesped' },
			{ text: 'Antes de cerrar la puerta, Rhi te mete en el bolsillo una hoja doblada, arrancada de una libreta vieja. «Es de mi padre. Léela luego. No le digas que te la he dado».' },
			{ intel: { npc: 'padre_rhi', text: 'Gareth Hargreave cuidó veinte años el césped del Estadio de Hoyuelo. Lo vendieron «a un socio que no sale en ningún sitio», que puso césped de plástico. Nunca culpa a nadie. Ha alquilado un prado a las afueras para hacer un campo de verdad para los críos del pueblo.' } },
			{ intel: { npc: 'rhi', text: 'En casa, en Hoyuelo, con su padre Gareth y con Nate en el sofá. Te ha retado de noche en el estadio vacío, «en el campo de mi padre». Tiene la llave de la puerta de servicio.' } },
			// ----- El Diario de la cena, según la rama -----
			{ diary: 'Hoy cenamos en casa de Rhi. Su padre se llama Gareth. Hace guiso. Mucho.\n\nHabló del césped como de una persona. Del estadio no pudo terminar una frase. La terminó luego. Le costó.\n\nNate estaba en el sofá. Sigue ahí. Creo que es parte del sofá.', cond: D_PURGADO },
			{ diary: 'Hoy mi entrenador{|a|e} y yo llegamos a Pueblo Hoyuelo, el pueblo de Rhi. Cenamos en su casa: guiso, papas y tarta de manzana. Su padre, Gareth, cuidó veinte años el césped del estadio del pueblo. Lo vendieron a un socio que no sale en ningún sitio, y el socio puso césped de plástico. Gareth no culpa a nadie.\n\nAhora está haciendo un campo de verdad para los niños. Rhi nos ha retado esta noche, en el estadio vacío.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
			{ diary: '¡Hoy cenamos en casa de Rhi, en Pueblo Hoyuelo! Su padre hace el mejor guiso de Galar y lo sirve dos veces. ¡Y tienen un amigo que vive en el sofá! Se llama Nate y come tumbado sin mancharse.\n\nEl pueblo está lleno de Wooloo y de balones. Mañana, ¡el gimnasio!', cond: D_DOBLE },
			{ say: 'rotom', text: 'Bzzt. —Bajito—. Lo del socio del estadio no lo he puesto. Ni lo del plástico. ¿Bien? He puesto lo del guiso. El guiso no le importa a nadie. Bueno, a Gareth.', cond: DOBLE },
		],

		// ----- Conversaciones en casa -----
		b07_gareth_charla: [
			{ text: 'Gareth seca platos con un trapo que tiene un Wooloo bordado. Al verte, te da un plato para que lo seques tú. Es su forma de decir «quédate».' },
			{ say: 'padre_rhi', text: 'El césped de verdad no es verde. Es de muchos verdes. El de plástico es de uno. Se nota desde la grada, aunque la gente no sepa qué nota. Nota que falta algo.' },
			{ say: 'padre_rhi', text: 'Pásate por el Campo cuando quieras. Ya tiene calvas, como debe ser. Las calvas son donde se juega. Un campo sin calvas es un campo donde no pasa nada.', cond: 'flag.b07_campo' },
			{ say: 'padre_rhi', text: 'Rhi está rara. Bueno, rara no. Callada. Que en ella es rarísimo. —Seca el mismo plato otra vez—. No sé qué ha pasado. No me lo cuentes. Que me lo cuente ella cuando quiera.', cond: DOLIDA },
		],
		b07_gareth_medalla: [
			{ text: 'Gareth ve la Medalla Planta en tu chaqueta antes de que digas nada. Deja el trapo. Se le ponen los ojos brillantes.' },
			{ say: 'padre_rhi', text: '¡La de Percy! Ese chico. Le conozco desde que era así de alto. Bueno, nunca fue así de alto. Siempre fue alto. —Se ríe—. Ahora sí que me lo creo, eh. Rhi tenía razón. Siempre tiene razón cuando habla de ti. Es lo que más rabia le da.' },
			{ say: 'padre_rhi', text: 'Pásate por el Campo. Te debo una vuelta por el césped nuevo. Ya tiene calvas.', cond: 'flag.b07_campo' },
		],
		b07_nate_sofa: [
			{ set: { 'flag.b07_nate_charla': true } },
			{ text: 'Nate sigue tumbado en el sofá, con la manta hasta la barbilla y un pie fuera. En la mesita, un vaso de leche, un cómic abierto boca abajo y una Poké Ball que se mueve sola de vez en cuando.' },
			{ say: 'nate', text: 'Hola otra vez. —No abre los ojos—. Ya sé. «¿Por qué llevas aquí desde el martes?».' },
			{ say: 'nate', text: 'Porque Rhi está nerviosa. Desde que se anunció que la Gira venía a Galar. No duerme. Entrena de noche. Chuta contra la caseta del jardín hasta las dos. —Abre un ojo—. Si me voy, no tiene a quién gritarle. Y si no grita, se le queda dentro.' },
			{ say: 'nate', text: 'Qué flojera, ser buen amigo. Pero es lo que hay. —Cierra el ojo—. No le digas que te lo he dicho.' },
			{ say: 'nate', text: 'Ah. Y si quieres combatir, combato. Desde aquí. Sin levantarme. Es mi única condición.' },
			{ intel: { npc: 'nate', text: 'Lleva en el sofá desde el martes porque Rhi «está nerviosa» desde que la Gira viene a Galar: entrena de noche contra la caseta del jardín. «Si me voy, no tiene a quién gritarle».' } },
		],
		b07_nate_reto: [
			{ text: 'Nate sigue en el sofá. No ha cambiado de postura. Puede que haya cambiado de pie.' },
			{ say: 'nate', text: '¿Combate? —Bosteza—. Va. Desde el sofá. Si quieres curar antes, la cocina está ahí. Gareth tiene pociones en el cajón de los cubiertos. No preguntes por qué.' },
			{ prompt: '¿Combatir con Nate?', choice: [
				{ text: 'Curar al equipo y combatir', then: [
					{ heal: 'Abres el cajón de los cubiertos: tenedores, cucharas y seis Hiperpociones. Gareth asoma la cabeza y asiente, como si fuera lo más normal del mundo. Tu equipo se recupera del todo.' },
					{ battle: 'nate_1', lose: 'continue', onWin: [
						{ say: 'nate', text: 'Has ganado. Qué bien. Ahora me puedo dormir con la conciencia tranquila. —Se da la vuelta hacia el respaldo—. Lo de Slaking, por cierto, es a propósito. Golpea un turno y descansa el siguiente. Como debe ser.' },
						{ set: { 'flag.b07_nate_vencido': true } },
					], onLose: [
						{ say: 'nate', text: 'Uy. He ganado. Sin levantarme. —Abre un ojo—. Rhi va a estar insoportable. Le encanta cuando gano porque así puede decir que el equipo es bueno.' },
						{ heal: 'Gareth trae el cajón entero de los cubiertos, Hiperpociones incluidas, y cura a tu equipo sin decir nada. Le guiña un ojo a Nate. Nate no se entera.' },
					] },
				] },
				{ text: 'Combatir así', then: [
					{ battle: 'nate_1', lose: 'continue', onWin: [
						{ say: 'nate', text: 'Has ganado. Sin curarte. Eso es tener ganas. Yo no tengo. Por eso pierdo. —Se tapa—. Buenas noches. Son las cinco de la tarde. Buenas noches igual.' },
						{ set: { 'flag.b07_nate_vencido': true } },
					], onLose: [
						{ say: 'nate', text: 'Uy. He ganado. Sin levantarme. Qué flojera ganar así. —Bosteza—. La cocina está ahí. Las pociones, en el cajón de los cubiertos.' },
						{ heal: 'Gareth asoma con una Hiperpoción en cada mano y cura a tu equipo. «El cajón de los cubiertos», dice. «No preguntes».' },
					] },
				] },
				{ text: 'Mejor no', then: [{ say: 'nate', text: 'Gracias. Ha sido la mejor respuesta que me han dado en toda la semana.' }] },
			] },
		],
		b07_nate_despues: [
			{ text: 'Nate sigue en el sofá. Se ha tapado hasta la nariz. En la mesita, el vaso de leche está lleno otra vez: alguien se lo rellena. Seguramente Gareth.' },
			{ say: 'nate', text: 'Ya me ganaste. Una vez basta. Dos sería entrenar. —Abre un ojo—. Rhi está mejor desde que llegaste. Grita más. Eso es bueno.', cond: '!(' + DOLIDA + ')' },
			{ say: 'nate', text: 'Ya me ganaste. Una vez basta. —Abre un ojo—. Rhi chuta contra la caseta otra vez hasta las dos. Algo ha pasado. No me lo cuentes. Arréglalo, que yo quiero dormir.', cond: DOLIDA },
		],
		b07_rhi_casa: [
			{ text: 'Rhi hace toques con un balón en el pasillo, entre los trofeos. El balón no toca el suelo. Los trofeos tiemblan, pero ninguno se cae.' },
			{ say: 'rhi', text: '¿Qué? Entreno. En casa también se entrena. Sobre todo en casa. —El balón sube, baja, sube—. Cuarenta y tres. Cuarenta y cuatro. ¡No me hables que pierdo la cuenta!', cond: '!' + COMBATE },
			{ say: 'rhi', text: 'Lo del estadio… —El balón sube, baja—. Me ha venido bien. Mucho. No sé explicarlo. Es como cuando metes un gol en el último minuto y te das cuenta de que llevabas todo el partido con miedo y ya no. Eso. —Se le cae el balón—. ¡Ves! ¡Me haces hablar y se me cae!', cond: COMBATE },
			{ say: 'rhi', text: '¡Y la Medalla Planta! ¡La de Percy! Lo he sabido antes de que entraras: mi padre lleva una hora silbando. Mi padre no silba nunca.', cond: PERCY },
		],
		b07_rhi_espera: [
			{ text: 'Rhi está sentada en el escalón de la puerta de atrás, atándose las botas por tercera vez. Tiene la llave de la puerta de servicio del estadio colgada del cuello con un cordón.' },
			{ say: 'rhi', text: 'Esta noche, en el estadio. Te espero en el centro del campo. —Se levanta—. Si quieres ir antes a lo de Percy, ve. Pero a mí no me hagas esperar mucho. Llevo años esperando este partido. Bueno, desde Kalos. Que son años en tiempo de delantera.' },
		],
		b07_rhi_fria: [
			{ text: 'Rhi está en el pasillo con el balón bajo el brazo. Al verte, mira hacia otro lado. Luego hacia la puerta. Luego otra vez a ti, de reojo.' },
			{ say: 'rhi', text: 'Ah. Hola. —Bota el balón una vez—. Estoy en el Campo casi todas las tardes. Por si… nada. Por si nada.' },
		],
		b07_maceta: [
			{ text: 'Una maceta de barro en la ventana de la cocina, con un cuadrado de césped cortado a tijera, perfecto, sin una sola hoja más alta que otra. Al lado, una lamparita encendida y una etiqueta escrita a mano: «Estadio de Hoyuelo · córner norte · el último trozo».' },
			{ text: 'Debajo, más pequeño, con otra letra, la de Rhi de niña, con faltas: «NO TOCAR. ES DE PAPÁ».' },
		],

		// =================== SCORBUNNY ===================
		b07_scorbunny: [
			{ text: 'Junto al estadio, en la pared de ladrillo de la escuela de fútbol, hay dos porterías pintadas en blanco, gastadas de tanto balonazo. Contra la de la izquierda, un Pokémon pequeño, blanco, con las orejas largas y las patas rojas, chuta piedrecitas. *Toc. Toc. Toc.* Siempre a la misma esquina: arriba, a la izquierda.' },
			{ text: 'Rhi viene detrás de ti con el balón bajo el brazo. Se para en seco.' },
			{ say: 'rhi', text: '…No. No puede ser. —Se acerca despacio—. Es de la camada del club. De la de la caseta de los balones. De ahí salió el mío, hace diez años. Cinderace era así de pequeño y chutaba así de mal. Bueno, así de bien. Mira la esquina. Siempre la misma.' },
			{ say: 'rhi', text: 'Nadie le hace caso porque es un enano. Pero mírale el pie. Tiene un pie que no se enseña. —Te da el balón—. Ponte de portero. Si le paras una, te elige. Los Scorbunny solo se van con quien les para un tiro. Es la ley del barrio.' },
			{ if: LUC, then: [
				{ text: '{riolu} se sienta en la banda, al lado de Rhi, con las orejas de punta. El Scorbunny lo mira un segundo y se le hinchan los mofletes. Se ha venido arriba.' },
			] },
			{ set: { 'vars.b07_scorb_paradas': 0 } },
			{ text: 'Te pones debajo de la portería pintada. El Scorbunny coloca una piedra, retrocede tres pasos, te mira a los ojos.' },
			{ prompt: 'Primer tiro. ¿Hacia dónde te tiras?', choice: [
				{ text: 'Abajo a la derecha', then: [{ text: '*¡Toc!* Arriba a la izquierda. La piedra rebota en la pared justo donde la pintura está más gastada.' }] },
				{ text: 'Al centro', then: [{ text: '*¡Toc!* Arriba a la izquierda. Ni te has movido a tiempo.' }] },
				{ text: 'Arriba a la izquierda', then: [{ set: { 'vars.b07_scorb_paradas': '+1' } }, { text: '¡La paras! La piedra te da en la palma y cae a tus pies. El Scorbunny se queda con la boca abierta.' }] },
			] },
			{ say: 'rhi', text: '¡Mírale los pies, no la cara! ¡La cara te engaña! ¡Los pies no!', cond: 'vars.b07_scorb_paradas == 0' },
			{ say: 'rhi', text: '¡ESO! ¡Ha sido un paradón! ¡Otra!', cond: 'vars.b07_scorb_paradas >= 1' },
			{ prompt: 'Segundo tiro. El Scorbunny hace como que mira a la derecha…', choice: [
				{ text: 'A la derecha, donde mira', then: [{ text: '*¡Toc!* Arriba a la izquierda. Te ha engañado con la mirada.' }] },
				{ text: 'Arriba a la izquierda', then: [{ set: { 'vars.b07_scorb_paradas': '+1' } }, { text: '¡Otra! Te tiras sin pensar y la piedra te rebota en el antebrazo. El Scorbunny pisa el suelo, enfadado. Y contento.' }] },
				{ text: 'Abajo, por si la raspa', then: [{ text: '*¡Toc!* Arriba a la izquierda. Ni ha bajado de altura.' }] },
			] },
			{ prompt: 'Último tiro. El Scorbunny toma impulso. Rhi contiene la respiración.', choice: [
				{ text: 'Arriba a la izquierda', then: [{ set: { 'vars.b07_scorb_paradas': '+1' } }, { text: 'La paras otra vez. Las dos manos. El ruido de la piedra contra tus palmas suena como un aplauso.' }] },
				{ text: 'Quedarte en el centro y abrir los brazos', then: [{ text: '*¡Toc!* La piedra te pasa por encima del hombro izquierdo y da en la esquina gastada. Gol.' }] },
			] },
			{ if: 'vars.b07_scorb_paradas >= 1', then: [
				{ say: 'rhi', text: '¡LE HAS PARADO! —Te da un empujón en el hombro que casi te tira—. ¡En su esquina! ¡Eso no lo consigue nadie! ¡Yo tardé una semana con el mío!' },
				{ text: 'El Scorbunny se acerca, te mira las manos, te las huele. Luego agarra una piedra, te la deja en los pies y se pone a tu lado. Mira la portería. Te mira a ti. Quiere otra.' },
			], else: [
				{ say: 'rhi', text: 'Tres goles. Tres de tres. —Se ríe—. No pasa nada. Mira.' },
				{ text: 'El Scorbunny corre hacia ti dando saltos, con los brazos arriba, celebrando. Da una vuelta a tu alrededor. Otra. Luego se para delante de tus zapatillas y espera, botando, a que le pongas otra piedra. No se va.' },
				{ say: 'rhi', text: 'Ha encontrado portero. Uno que no se rinde y que le deja marcar. A los delanteros eso nos encanta, aunque no lo digamos nunca. —Te da una palmada en la espalda—. Va. Me he inventado la ley del barrio. Pero ha funcionado.' },
			] },
			{ if: TIENE_SCORB, then: [
				{ text: 'El Scorbunny te huele la mochila. Huele a uno de los suyos. Se queda pensando, con una oreja doblada, y luego mira la pared de la escuela, sus porterías gastadas, su esquina.' },
				{ say: 'rhi', text: 'Ya tienes uno, ¿verdad? Lo huele. —Asiente—. Pues este se queda aquí, en su pared. Los críos de mi padre le van a poner de portero los jueves. Ven a verlo cuando quieras. Ya sabes dónde chuta.' },
				{ set: { 'flag.b07_scorbunny_vive': true } },
			], else: [
				{ say: 'rhi', text: 'Llévatelo. En serio. Es de aquí, de mi pueblo, de mi pared. —Se pone seria un segundo—. Cuídamelo. Que algún día me lo encuentro en un campo y quiero que me meta un gol por la escuadra.' },
				{ pokemon: { sp: 'scorbunny', lv: 15, gender: 'M', nature: 'jolly', ability: 'blaze', happy: 170, moves: ['tackle', 'ember', 'quickattack', 'doublekick'], ivs: { hp: 26, atk: 31, def: 24, spa: 18, spd: 24, spe: 31 } } },
				{ set: { 'flag.b07_scorbunny': true } },
			] },
			{ af: { rhi: 2 } },
			{ quest: 'b07_s_iniciales', stage: 'buscar' },
			{ quest: 'b07_s_iniciales', stage: 'hecha', done: true, cond: TRES },
			{ say: 'rotom', text: '¡Bzzt! Apunto: «Scorbunny, de la pared de la escuela de Hoyuelo, con portero». ¡Ya son tres los que he visto de Galar! O sea, Sobble, Grookey y este. Si hemos encontrado a los otros, claro.', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Scorbunny. De la pared. Lo apunto.', cond: PURG },
		],
		b07_scorbunny_visita: [
			{ text: 'El Scorbunny sigue en la pared de la escuela de fútbol. Ahora le ponen los críos de portero y él chuta de vuelta todo lo que le tiran. Siempre a la misma esquina. Al verte, te deja una piedra en los pies y se pone en posición.' },
			{ text: 'Le paras una. O no. Da igual: lo celebra igual.' },
		],

		// =================== HOYUELO: VARIOS ===================
		b07_geoglifo: [
			{ text: 'En la colina de enfrente, dibujada sobre la hierba con piedras encaladas, una figura enorme: un cuerpo alargado, algo que podrían ser alas o brazos abiertos, y una cabeza que no se parece a la de ningún Pokémon que conozcas. Mide más que el estadio.' },
			{ text: 'Un cartel de madera al pie del camino: «Geoglifo de Hoyuelo. Antigüedad: desconocida. Representa: desconocido. Se ruega no mover las piedras».' },
			{ text: 'Te acuerdas de los apuntes de Sonia: el tapiz, «la Oscuridad Inmensa», el cielo negro. La figura de la colina tiene la misma forma que la mancha del tapiz. O eso te parece.', cond: 'has("apuntessonia")' },
			{ text: '{riolu} se queda mirando el geoglifo mucho rato, muy quieto. Cuando te vas, tarda en seguirte.', cond: LUC },
		],
		b07_hoyuelo_pendiente: [
			{ say: 'rotom', text: '¡Bzzt! Cosas de Hoyuelo:', cond: '!' + PURG },
			{ say: 'rotom', text: 'Bzzt. Lista:', cond: PURG },
			{ say: 'rotom', text: '• Rhi nos espera de noche en el **estadio**, en el centro del campo.', cond: 'quest.b07_t_rhi == "estadio"' },
			{ say: 'rotom', text: '• El gimnasio de **Percy** (Planta), en el **estadio**. Dicen que su as se hace enorme.', cond: '!' + PERCY },
			{ say: 'rotom', text: '• En las **Terrazas**, los granjeros entrenan. Percy da algo a quien gane tres combates.', cond: '!flag.b07_meganiumita' },
			{ say: 'rotom', text: '• En la **pared de la escuela de fútbol**, algo chuta piedras. Siempre a la misma esquina.', cond: CENA + ' && !' + SCORB_OK },
			{ say: 'rotom', text: '• **El Campo** de Gareth, a las afueras. Se puede entrar de socio.', cond: 'flag.b07_campo && !partner("b07_campo")' },
			{ say: 'rotom', text: '• Rhi está rara. Está casi siempre en **el Campo**. Igual hay que hablar con ella.', cond: DOLIDA + ' && ' + COMBATE },
			{ say: 'rotom', text: '• Nate, en el sofá. Combate si quieres. Desde el sofá.', cond: CENA + ' && !flag.b07_nate_vencido' },
			{ say: 'rotom', text: '• Ya tenemos la Medalla Planta. Siguiente: **Pueblo Crampón**, en tren desde **Pistón**. Handsome nos espera.', cond: PERCY },
		],
		b07_vestuario: [
			{ text: 'El vestuario del estadio: bancos de madera, taquillas de chapa verde con números pintados a mano, un espejo con una esquina rota y olor a linimento. Todo es viejo menos el suelo, que es de goma nueva y negra.' },
			{ text: 'En la pared del fondo, torcido, sujeto con una sola chincheta y con las esquinas comidas por la humedad, un cartel amarillo escrito a mano con letras enormes: **CREE**. Nadie sabe quién lo puso. Nadie lo ha quitado nunca.' },
			{ text: 'En la taquilla 12 todavía se lee, rayado en la chapa con una llave: «G. H. · CÉSPED». Debajo, más reciente, con rotulador: «R. H. · 9».', cond: CENA },
		],

		// =================== EL ESTADIO ===================
		b07_estadio_entrada: [
			{ set: { 'flag.b07_gym_hoyuelo_visto': true } },
			{ text: 'Entras por el túnel de los jugadores. Las gradas de piedra suben por la ladera, cubiertas de musgo. El techo es de hierba. Y el campo, abajo, es de un verde chillón, perfecto, sin una sola calva. Al pisarlo, cruje.' },
			{ text: 'En el centro del campo, un muchacho enorme, rubio, con una camiseta verde remangada y unos brazos de mover sacos, riega con una regadera una maceta pequeña que alguien ha dejado en el punto de penalti. Te ve. Te saluda con la regadera.' },
			{ say: 'percy', text: '¡Hola! Tú debes de ser {el|la|le} de la Gira. Percy. Encantado. —Te da la mano. Es como dársela a un tronco amable—. Perdona la regadera. Es que esto es de plástico y no hay que regarlo, pero la maceta sí. No sé quién la pone. Alguien la pone.' },
			{ say: 'percy', text: 'Cuando quieras combatimos. Sin prisa, eh. Las cosas que crecen no se apuran. —Mira el plástico del suelo y se le borra la sonrisa un segundo—. Bueno. Las que crecen.' },
			{ quest: 'b07_m3', stage: 'gimnasio', cond: 'quest.b07_m3 == "hoyuelo"' },
		],
		b07_percy_reto: [
			{ if: PERCY, then: [{ end: true }] },
			{ text: 'Percy deja la regadera junto a la maceta del punto de penalti, se seca las manos en el pantalón y saca un termo de la mochila. Sirve dos tazas. Te da una.' },
			{ say: 'percy', text: 'Primero, té. Mi abuela decía que no se combate con el estómago frío. —Sorbe—. Y segundo: aquí debajo hay un punto de energía. Mis Pokémon se pueden hacer enormes. Los tuyos también. Así que ojo.' },
			{ if: LUC, then: [
				{ say: 'percy', text: 'Ese Lucario tuyo no está tomando té. —Le mira—. Está mirando mis Poké Balls. ¿Siempre mira así?', cond: 'inParty("lucario")' },
				{ say: 'percy', text: 'Ese Riolu tuyo no está tomando té. —Le mira—. Está mirando mis Poké Balls. ¿Siempre mira así?', cond: 'inParty("riolu") && !inParty("lucario")' },
			] },
			{ prompt: '¿Curar al equipo antes de retar a Percy?', choice: [
				{ text: 'Sí, por favor.', then: [{ heal: 'Percy saca de la mochila una bolsa de bayas, una lata de galletas y tres Pociones Máximas «por si acaso». Las reparte entre tus Pokémon con mucho cuidado, uno a uno. Se recuperan del todo.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'percy', text: 'Va. Tú sabrás. Yo, por si acaso, me termino el té.' }] },
			] },
			{ battle: 'percy_g', onWin: [
				{ text: 'El Eldegoss de Percy se deshincha en una nube de pelusa roja y blanca que cae sobre el campo como nieve. Percy lo recoge en brazos, despacio. Le quita una pelusa de la cara.' },
				{ say: 'percy', text: 'Ha sido muy bonito. De verdad. Has esperado a que lo mío creciera y luego lo has segado limpio. Sin rabia. Eso me gusta. —Se rasca la nuca—. Me gusta mucho, la verdad.' },
				{ if: LUC, then: [
					{ say: 'percy', text: 'Y tu {riolu}. Le pegaba a la planta como quien poda: justo donde tocaba, ni un poco más. Mi abuela habría querido conocerlo.' },
					{ happy: { who: 'riolu', n: 10 } },
				] },
				{ say: 'percy', text: 'La **Medalla Planta**. Huele a césped recién cortado. No me preguntes cómo, que es de metal. Yo creo que es porque la guardo en el cobertizo.' },
				{ badge: 'medalla_planta' },
				{ cap: 70 },
				{ set: { 'flag.b07_percy_vencido': true } },
				{ say: 'percy', text: 'Y esto. **MT Fitoimpulso**. En hierba alta, sale antes que nadie. Como yo por las mañanas.' },
				{ give: 'b07_mt_fitoimpulso' },
				{ heal: 'Percy reparte otra ronda de bayas y galletas entre tus Pokémon. Uno de ellos se queda con dos. Percy hace como que no lo ve. Tu equipo se recupera del todo.' },
				{ intel: { npc: 'percy', text: 'Líder de Hoyuelo (Planta), granjero, enorme y amable. Te dio la Medalla Planta y la MT Fitoimpulso. Su Eldegoss dinamaxiza. Riega una maceta que alguien pone en el punto de penalti del campo de plástico.' } },
				{ quest: 'b07_m3', stage: 'hecha', done: true },
				// ----- La llamada de Handsome -----
				{ text: 'Al salir del túnel, te vibra la Pokédex. Número oculto. Una voz que habla bajito, como si estuviera escondida detrás de una cortina.' },
				{ say: 'handsome', as: 'Handsome (llamada)', text: '¡Colaborador! Soy yo. Handsome. No digas mi nombre en voz alta. Bueno, ya lo he dicho yo. No pasa nada.' },
				{ say: 'handsome', as: 'Handsome (llamada)', text: 'Escucha. Hay algo en **Pueblo Crampón**. Algo de noche, que no sale en ningún cartel. Handsome no puede decir más por teléfono. Handsome casi nunca puede decir más por teléfono.' },
				{ say: 'handsome', as: 'Handsome (llamada)', text: 'Hay tren desde la **estación de Pistón**. La guardagujas te dirá el andén. Ven cuando puedas. Trae a {riolu}. Y no te fíes de los turistas. Sobre todo de uno con gafas de sol y camisa de flores. Ese soy yo. De ese sí te fías.' },
				{ quest: 'b07_m4', stage: 'crampon' },
				{ set: { 'flag.b07_t3_hecho': true } },
				// ----- El Diario de la medalla, según la rama -----
				{ diary: 'Hoy ganamos a Percy. Es grande. Da té. Su Eldegoss se hizo enorme y luego se deshizo en pelusa. Mucha pelusa.\n\nYa tenemos la Medalla Planta. Huele a hierba. No sé cómo. Es de metal.\n\nHandsome llamó. Crampón. De noche. No dijo más. Nunca dice más.', cond: D_PURGADO },
				{ diary: 'Hoy mi entrenador{|a|e} y yo ganamos a Percy, el líder de Pueblo Hoyuelo, en un estadio con el techo de hierba y el campo de plástico. Nos sirvió té antes de combatir. Su Eldegoss se hizo enorme con el Dinamax y acabó en una nevada de pelusa.\n\nYa tenemos la Medalla Planta y la MT Fitoimpulso. Al salir, llamó Handsome: hay algo de noche en Pueblo Crampón. Hay tren desde Pistón.\n\n*(Omitido: nada.)*', cond: D_REFORMADO },
				{ diary: '¡Hoy ganamos la Medalla Planta! Percy, el líder, es enorme y supersimpático: ¡nos invitó a té antes de combatir! Su Eldegoss se hizo gigante y luego llovió pelusa por todo el estadio. Parecía nieve. ¡Qué bonito!\n\nAhora toca seguir viajando por Galar. ¡Hay trenes a todas partes!', cond: D_DOBLE },
				{ say: 'rotom', text: 'Bzzt. —Bajito—. Lo de Handsome no lo he puesto. Ni lo de Crampón. He puesto lo de los trenes. Los trenes no le importan a nadie. Bueno, a Agnes.', cond: DOBLE },
				{ say: 'rotom', text: '¡Bzzt! Siguiente: **Pueblo Crampón**, en tren desde la estación de **Pistón**. Volando con Aerodactyl también se llega a Pistón. ¡Y Handsome ha dicho «de noche»! Me encanta cuando Handsome dice «de noche».', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. Crampón. Tren desde Pistón. De noche. Va.', cond: PURG },
			] },
		],
		b07_percy_despues: [
			{ text: 'Percy riega la maceta del punto de penalti con una regadera pequeña. El campo de plástico brilla alrededor, verde chillón. La maceta, en el centro, es de muchos verdes.' },
			{ say: 'percy', text: '¿Sabes? Creo que la pone Gareth. De noche. Con la llave que no devolvió. —Sonríe—. Yo la riego de día. Así entre los dos la tenemos viva. No se lo digas, que le da vergüenza.' },
			{ say: 'percy', text: 'Si pasas por las terrazas, sube al bancal de arriba. Siempre hay té. Siempre.', cond: '!flag.b07_meganiumita' },
		],

		// =================== RHI: DE NOCHE EN EL ESTADIO ===================
		b07_rhi_estadio: [
			{ if: COMBATE, then: [{ end: true }] },
			{ text: 'Esa noche. Entras por la puerta de servicio, que Rhi ha dejado abierta con una piedra. El túnel de los jugadores huele a linimento y a humedad. Al fondo, la luz azul de la luna.' },
			// ----- Cinemática 2: el estadio vacío y el Cinderace Gigamax -----
			{ cutscene: { bg: { type: 'gym', wall: '#1e2a2e', floor: '#3a6a3a' }, time: 'noche', start: 'dark', cam: 'still', frames: [
				{ big: true, text: 'Estadio de Hoyuelo', sub: 'Medianoche', hold: 2400, cam: 'still' },
				{ actors: [{ id: 'rhi', at: 'right', enter: 'right' }], fx: 'light', cam: 'pull', text: 'Los focos están apagados. Solo la luna, enorme, por encima del techo de hierba. En el centro del campo de plástico, de espaldas, Rhi bota un balón. El ruido rebota en las gradas vacías.' },
				{ actors: [{ key: 'rhi', do: 'turn' }], say: 'rhi', cam: 'push', text: 'Aquí aprendí a chutar. Bueno, aquí no: en la hierba que había aquí. Mi padre me dejaba entrar los lunes, cuando no había nadie. Me decía: «Chuta, que el césped lo aguanta todo». —Mira el suelo—. Esto no aguanta nada. Esto solo brilla.' },
				{ actors: [{ key: 'rhi', dim: true }, { mon: 'cinderace', key: 'cin', at: 'center', enter: 'pop' }], on: 'cin', fx: 'glow', color: '#e98a3a', cam: 'still', text: 'Lanza una Poké Ball al aire sin mirarla. Sale **Cinderace**, se coloca el balón en el empeine y lo levanta con un toque. El balón se enciende: una bola de fuego pequeña, que gira.' },
				{ actors: [{ key: 'rhi', remove: true, exit: 'fade' }, { key: 'cin', size: 'l', do: 'float' }], on: 'cin', fx: ['beam', 'shake'], shake: 2, tint: '#c4473a', cam: 'pan-up', text: 'Debajo del campo, algo rojo despierta. La luz sube por el plástico, se le mete a Cinderace por los pies y Cinderace **crece** hasta tapar la luna, con una bola de fuego del tamaño del estadio girando sobre su cabeza.' },
				{ cond: LUC, actors: [{ mon: '{riolu}', key: 'rio', at: 'left', enter: 'left' }], on: 'rio', fx: 'glow', tint: 'none', text: 'A tu lado, {riolu} levanta la vista hacia el gigante de fuego. No retrocede. El aura le sale sola por las palmas, azul contra todo ese rojo, y se pone en posición.' },
				{ cond: '!(' + LUC + ')', on: false, tint: 'none', fx: 'ripple', text: 'El campo entero tiembla. Las gradas vacías se tiñen de naranja. Tu Pokédex se calienta en el bolsillo.' },
				{ cam: 'still', fx: 'heartbeat', color: '#e98a3a', say: 'rhi', text: '¿Te gusta? Lo ha aprendido aquí. En casa. Como yo. —Se oye que sonríe—. Va. Saque de centro. Y no me dejes ganar. Como me dejes ganar, no te lo perdono en la vida.' },
			] } },
			{ say: 'rhi', text: 'Antes de nada: si necesitas curar, cúrate. No pienso ganarte con ventaja. Eso no es ganar. Eso es robar.' },
			{ prompt: '¿Curar al equipo antes del partido?', choice: [
				{ text: 'Sí, curarse.', then: [{ heal: 'Rhi te tira la bolsa de deporte. Dentro: dos toallas, una botella de agua y un montón de Pociones Máximas con etiquetas de «PAPÁ: NO TOCAR». Las usas todas. Tu equipo se recupera del todo.' }] },
				{ text: 'Así estoy bien.', then: [{ say: 'rhi', text: 'Muy segur{o|a|e} de ti, ¿eh? Me gusta. Luego no llores.' }] },
			] },
			{ prompt: 'Rhi se coloca en el centro del campo. Cinderace bota el balón de fuego. Lo que hagas ahora, Rhi lo va a recordar.', choice: [
				{ text: 'Jugar en serio. Con todo.', then: [
					{ battle: 'rhi_7', lose: 'continue',
						onWin: [
							{ set: { 'flag.b07_rhi_vencida_7': true } },
							{ af: { rhi: 8 } },
							{ text: 'El Cinderace gigante se deshace en chispas. Se encoge, vuelve a su tamaño y se queda de pie en el centro del campo, jadeando, con el balón apagado bajo el pie. Rhi lo mira. Te mira a ti. Se sienta en el plástico. Se tumba.' },
							{ say: 'rhi', text: 'Me has ganado. En casa. En mi campo. Con mi mejor Cinderace. —Mira la luna—. Y no me duele. O sea, sí. Pero no como antes. Antes me dolía aquí. —Se toca el pecho—. Ahora me duele en las piernas. Eso es bueno. Eso es de haber corrido.' },
						],
						onLose: [
							{ text: 'Tu último Pokémon cae sobre el plástico. El Cinderace gigante levanta los brazos hacia la luna, se encoge, vuelve a su tamaño y se queda mirándote con el balón bajo el pie. Rhi grita. Grita mucho. Luego se para en seco y vuelve corriendo hacia ti.' },
							{ say: 'rhi', text: '¡HE GANADO! ¡En casa! —Te agarra de los hombros—. Pero no me has dejado, ¿verdad? Dime que no me has dejado. ¡Te he visto la cara! No me has dejado. —Respira—. Bueno. Entonces sí. Entonces cuenta.' },
							{ af: { rhi: 3 } },
							{ heal: 'Rhi vacía en tu equipo lo que quedaba de la bolsa de su padre. Tus Pokémon se recuperan del todo.' },
						] },
				] },
				{ text: 'Dejarla ganar. Que tenga su gol en casa.', then: [
					{ text: 'Sacas a tu Pokémon más flojo. Le pides los movimientos que menos daño hacen. A los tres turnos, Rhi ya lo ha visto. A los cinco, ya no ataca: se queda quieta en el centro del campo, con Cinderace enorme detrás, mirándote.' },
					{ say: 'rhi', text: '¿Qué haces? —No lo grita. Eso es peor—. ¿Qué estás haciendo?' },
					{ text: 'Cinderace se deshincha solo. Rhi lo devuelve a la Poké Ball sin mirarlo. Hay un silencio enorme en el estadio vacío.' },
					{ say: 'rhi', text: 'Me has dejado ganar. En casa. En el campo de mi padre. —Se le quiebra la voz y la endereza, como su padre—. Eso es lo que hacen con los del montón. Les dejan ganar para que no lloren. Yo no soy del montón. ¿Te enteras? **No soy del montón**.' },
					{ af: { rhi: -5 } },
					{ set: { 'flag.b07_rhi_dolida': true, 'flag.b07_rhi_dejada': true, 'vars.b07_af_rhi_perdida': '+5' } },
					{ text: 'Se va por el túnel sin despedirse. Oyes la puerta de servicio cerrarse de un golpe. La piedra que la sujetaba rueda hasta tus pies.' },
				] },
			] },
			{ set: { 'flag.b07_rhi_combate': true } },
			// ----- Después: el miedo a ser «del montón», a su manera -----
			{ if: '!flag.b07_rhi_dejada', then: [
				{ text: 'Se sientan en el punto de penalti, al lado de la maceta de césped de verdad que alguien ha dejado ahí. Rhi le arranca una hoja, la mira a la luz de la luna y la deja otra vez en su sitio, con cuidado.' },
				{ say: 'rhi', text: '¿Sabes lo que me dijeron cuando me echaron del Desafío? A los quince. «Falta de disciplina». Y luego, más bajito, el entrenador: «Tienes talento, pero hay muchos con talento. Eres del montón con suerte».' },
				{ say: 'rhi', text: 'Del montón. —Se ríe sin ganas—. Llevo siete años chutando contra esa frase. En Kalos, en Johto, en todas partes. Cada vez que gano, pienso: «Ya está, ya no soy del montón». Y al día siguiente vuelve.' },
				{ say: 'rhi', text: 'Un delantero sin ego es un defensa con suerte. Eso me lo digo antes de cada partido. Pero esta noche… —Mira el campo vacío—. Esta noche no me lo he dicho. Y he jugado igual. Mejor.' },
				{ prompt: 'Rhi te mira de lado, esperando algo.', choice: [
					{ text: '«No eres del montón. Me has hecho sudar en tu casa.»', then: [
						{ af: { rhi: 2 } },
						{ say: 'rhi', text: '«Me has hecho sudar». —Lo repite despacio—. Eso lo voy a pintar en una pancarta. Con todas las letras bien.' },
					] },
					{ text: '«Pobrecita. Siete años con eso…»', then: [
						{ af: { rhi: -3 } },
						{ set: { 'flag.b07_rhi_dolida': true, 'vars.b07_af_rhi_perdida': '+3' } },
						{ say: 'rhi', text: '—Se levanta de golpe—. No. Eso no. Pobrecita no. —Se sacude el plástico de las rodillas—. No te lo he contado para que me tengas pena. Te lo he contado porque eres de los pocos que me ganan de verdad. Pensaba que lo entendías.' },
						{ text: 'Se aleja hacia el túnel. Se para. No se da la vuelta.' },
						{ say: 'rhi', text: 'Mañana estaré en el Campo. Como siempre. —Y se va.' },
					] },
					{ text: 'Darle un balonazo suave en el hombro, sin decir nada.', then: [
						{ af: { rhi: 3 } },
						{ text: 'Le das un toque con el balón en el hombro. Rhi se queda quieta. Luego agarra el balón, te lo devuelve con un taconazo y se le escapa una carcajada que suena por todo el estadio vacío.' },
						{ say: 'rhi', text: 'Eso. Eso es. —Se seca un ojo con el puño del guante—. Es la luna. Me da en la cara.' },
					] },
				] },
			] },
			// ----- La foto de Nate -----
			{ if: '!flag.b07_rhi_dejada', then: [
				{ text: 'Desde la grada más alta, una voz conocida, muy cansada.' },
				{ say: 'nate', text: 'Qué flojera subir hasta aquí. Pero he hecho una foto. Salen pequeñitos. Y la luna, enorme. —Baja las escaleras de una en una—. Se la paso. Es la mejor foto que he hecho nunca. También es la única.' },
				{ give: 'fotoestadiohoyuelo' },
			] },
			{ quest: 'b07_t_rhi', stage: 'hecha', done: true },
			{ intel: { npc: 'rhi', text: 'Te retó de noche en el Estadio de Hoyuelo, «en el campo de mi padre», con su Cinderace Gigamax. La echaron del Desafío a los quince con un «eres del montón con suerte»; lleva siete años chutando contra esa frase.' } },
			// ----- El Diario de la noche del estadio, según la rama -----
			{ diary: 'Hoy de noche fuimos al estadio de Hoyuelo. Vacío. Solo la luna. Rhi tenía un Cinderace. Se hizo enorme. Tenía una bola de fuego encima. Como un sol.\n\nRhi dijo una cosa. «Del montón». Le duele desde los quince años. No lo apunto entero. Es suyo.', cond: D_PURGADO + ' && !flag.b07_rhi_dejada' },
			{ diary: 'Hoy de noche fuimos al estadio de Hoyuelo. Vacío. Solo la luna. Rhi tenía un Cinderace. Se hizo enorme.\n\n{jugador} no jugó en serio. Rhi lo vio. Se fue sin despedirse. La puerta sonó muy fuerte.\n\nNo sé arreglar esto. {jugador} sí. Creo.', cond: D_PURGADO + ' && flag.b07_rhi_dejada' },
			{ diary: 'Hoy, de noche, Rhi nos retó en el Estadio de Hoyuelo vacío, con los focos apagados y solo la luna. Es el campo donde aprendió a chutar, cuando todavía era de hierba. Su Cinderace se hizo enorme con el Gigamax: una bola de fuego encima de la cabeza, del tamaño del estadio.\n\nDespués nos sentamos en el punto de penalti. A Rhi la echaron del Desafío a los quince años con una frase que todavía le pesa.\n\n*(Omitido: nada.)*', cond: D_REFORMADO + ' && !flag.b07_rhi_dejada' },
			{ diary: 'Hoy, de noche, Rhi nos retó en el Estadio de Hoyuelo vacío, con solo la luna. Su Cinderace se hizo enorme con el Gigamax. Mi entrenador{|a|e} la dejó ganar, o algo parecido, y Rhi se dio cuenta. Se fue por el túnel sin despedirse.\n\nCreo que hay que hablarlo con ella. Suele estar en el Campo de su padre.\n\n*(Omitido: nada.)*', cond: D_REFORMADO + ' && flag.b07_rhi_dejada' },
			{ diary: '¡Hoy fuimos de noche al estadio de Hoyuelo con Rhi! Estaba vacío y había una luna enorme. ¡Su Cinderace se hizo gigantesco y tenía una bola de fuego encima de la cabeza! Fue el partido más bonito que he visto. Bueno, el único que he visto de noche.', cond: D_DOBLE },
		],

		// ----- Momentos por afinidad -----
		b07_rhi_momento: [
			{ set: { 'flag.b07_rhi_momento': true } },
			{ text: 'En el jardín de atrás, detrás de la caseta de las herramientas, Rhi está sentada en la hierba, delante de la portería pintada en la pared. Hay una marca en el suelo, un círculo de tierra pelada en mitad del césped. Te hace sitio a su lado sin mirarte.' },
			{ say: 'rhi', text: 'Aquí aprendí. No en el estadio: aquí. Con cuatro años. Mi padre pintó la portería un domingo y me dijo: «El punto de penalti lo pones tú». Y yo chuté desde aquí hasta que se me quedó la hierba pelada. —Toca el círculo—. Nunca volvió a crecer. Él dice que es a propósito.' },
			{ say: 'rhi', text: 'No traigo a nadie aquí. A Nate sí, pero Nate no cuenta: se duerme en la caseta. —Se abraza las rodillas—. A ti te traigo. No sé por qué. Bueno, sí sé. No te lo digo.' },
			{ prompt: 'Rhi mira la portería pintada.', choice: [
				{ text: 'Chutar desde su punto de penalti', then: [
					{ text: 'Agarras el balón y chutas desde el círculo de tierra. Da en el larguero pintado, rebota y vuelve a tus pies. Rhi se ríe tan fuerte que se tumba en la hierba.' },
					{ say: 'rhi', text: '¡LARGUERO! ¡En mi punto! —Se seca las lágrimas—. Va. Ahora es un poco tuyo también. Pero solo un poco. El trozo de la izquierda.' },
				] },
				{ text: 'Sentarte a su lado sin decir nada', then: [
					{ text: 'Te sientas. No dices nada. Ella tampoco. Desde la cocina llega el ruido de Gareth fregando y, muy bajito, cantando algo de fútbol. Rhi apoya la cabeza en tu hombro un segundo. Uno solo. Luego se levanta como si nada.' },
					{ say: 'rhi', text: '¡Bueno! ¡A entrenar! Que esto no se entrena solo.' },
				] },
			] },
			{ af: { rhi: 2 } },
			{ intel: { npc: 'rhi', text: 'Te llevó al punto de penalti del jardín de atrás de su casa, el círculo de tierra pelada desde donde aprendió a chutar con cuatro años. «No traigo a nadie aquí».' } },
			{ if: 'af.rhi >= 70 && !flag.b07_rhi_peticion', then: [{ call: 'b07_rhi_peticion' }] },
		],
		b07_rhi_peticion: [
			{ set: { 'flag.b07_rhi_peticion': true } },
			{ text: 'Rhi está de pie en su punto de penalti, con el balón bajo el pie. Lo pisa, lo suelta, lo vuelve a pisar. Tarda en hablar, y Rhi nunca tarda en hablar.' },
			{ say: 'rhi', text: 'Oye. Una cosa. Seria. —Te mira—. Cuando acabe la Gira, voy a volver a presentarme al Desafío. Al de Galar. El que me echó. Lo tengo decidido desde Kalos. No se lo he dicho a nadie. Ni a mi padre.' },
			{ say: 'rhi', text: 'Y el día que vuelva… quiero que estés. No en la grada. En el campo. De portero. —Se pone roja hasta las orejas—. O sea, de portero no, que esto no es fútbol de verdad. Pero tú me entiendes. Quiero que el primer tiro de mi vuelta te lo tire a ti.' },
			{ prompt: 'Rhi espera. Por una vez, no grita.', choice: [
				{ text: '«Allí estaré. Y te lo paro.»', then: [{ say: 'rhi', text: '¡JA! ¡Eso ya lo veremos! —Te da un empujón—. Te lo meto por la escuadra. Por la izquierda. Ya lo sabes y te lo meto igual.' }] },
				{ text: '«Allí estaré.»', then: [{ say: 'rhi', text: '…Va. —Asiente muy deprisa, varias veces—. Va. Ya está. Lo he dicho. Ahora no se lo digas a nadie. Ni a Nate. Sobre todo a Nate.' }] },
			] },
			{ af: { rhi: 2 } },
			{ intel: { npc: 'rhi', text: 'Te pidió que estés «en el campo, de portero» el día que vuelva a presentarse al Desafío de Galar, el que la echó. No se lo ha dicho a nadie más.' } },
		],

		// ----- El Campo: Gareth, revancha y reparación -----
		b07_gareth_campo: [
			{ text: 'Gareth empuja un carrito de cal por la banda, muy despacio, con la lengua entre los dientes. La línea le sale recta como una regla. Al verte, para y se apoya en el carrito.' },
			{ say: 'padre_rhi', text: 'Mira, mira. —Señala una calva junto al área—. Ahí se ha caído un crío esta mañana. Ahí ya no crece. Pues mejor: así sabemos dónde se juega.' },
			{ say: 'padre_rhi', text: 'Si quieres entrar de socio, la caseta está abierta. Siempre está abierta: no cierra. Lo de las cuentas lo llevo en una libreta. Rhi dice que es de la prehistoria. Es de 2004.', cond: '!partner("b07_campo")' },
			{ say: 'padre_rhi', text: 'Socio. —Te da una palmada en el hombro que te hunde un poco en el césped—. Mi socio. Qué bien suena. Mucho mejor que «un socio que no sale en ningún sitio». Tú sales. Aquí sales.', cond: 'partner("b07_campo")' },
		],
		b07_rhi_reparar: [
			{ if: '!(' + DOLIDA + ')', then: [{ end: true }] },
			{ text: 'Rhi está sola en el Campo, ya de noche, tirando penaltis contra una portería vacía. Ha encendido una lámpara de obra en la caseta. Cada tiro va a la escuadra. Al verte, falla el siguiente. Da en el poste.' },
			{ say: 'rhi', text: '¿Qué quieres? —No se da la vuelta—. Si vienes a decirme que lo sientes, no. No quiero frases. Las frases no cuentan.' },
			{ prompt: 'Rhi coloca otro balón. No te mira.', choice: [
				{ text: '«No vengo a hablar. Vengo a jugar. En serio. Con todo.»', then: [
					{ say: 'rhi', text: '…—Se gira despacio—. ¿Con todo? ¿Sin dejarme nada?' },
					{ say: 'rhi', text: 'Va. Revancha. Aquí. En el campo de mi padre, el de verdad. Si me dejas ganar otra vez, no me vuelves a ver en la vida. Y si me ganas, también, porque me voy a encerrar a llorar. —Casi sonríe—. Cúrate. Que no quiero excusas.' },
					{ heal: 'Rhi te tira la bolsa de deporte de su padre. Más Pociones Máximas con la etiqueta de «PAPÁ: NO TOCAR». Tu equipo se recupera del todo.' },
					RHI_MARCA,
					{ battle: 'rhi_7', lose: 'continue',
						onWin: [{ say: 'rhi', text: 'Con todo. Me has ganado con todo. —Se tumba en la hierba de verdad, con los brazos abiertos—. Esto sí. Esto sí cuenta.' }, { set: { 'flag.b07_rhi_revancha': true } }],
						onLose: [{ say: 'rhi', text: '¡GOL! ¡Y esta vez me lo has puesto difícil de verdad! —Se le escapa una carcajada—. Esto sí. Esto sí cuenta.' }, { heal: 'Rhi vacía lo que queda de la bolsa en tu equipo. Se recupera del todo.' }] },
					{ if: 'vars.b07_af_rhi_perdida >= 8', then: [{ af: { rhi: 8 } }], else: [
						{ if: 'vars.b07_af_rhi_perdida >= 5', then: [{ af: { rhi: 5 } }], else: [{ af: { rhi: 3 } }] },
					] },
					{ set: { 'flag.b07_rhi_reparada': true } },
					{ say: 'rhi', text: 'Lo de la otra noche… —Se sienta, se abraza las rodillas—. Ya está. No lo hablemos más. Has vuelto y has jugado de verdad. Eso es lo que cuenta. Lo demás son frases.' },
					{ say: 'rhi', text: 'Y oye. No soy del montón. —Te mira de reojo—. Ya lo sé. Pero me gusta que me lo demuestres a balonazos.' },
					{ intel: { npc: 'rhi', text: 'Lo arreglaron en el Campo de su padre, de noche, con una revancha «con todo». «Las frases no cuentan».' } },
				] },
				{ text: 'Quedarte un rato a recogerle los balones, sin decir nada', then: [
					{ text: 'Le recoges los balones. Uno. Dos. Cinco. Ella sigue tirando sin mirarte. Al décimo, para.' },
					{ say: 'rhi', text: 'Eso no es jugar. Eso es hacer de recogepelotas. —Pero lo dice más suave—. Vuelve cuando quieras jugar de verdad. Aquí estoy.' },
				] },
			] },
		],
		b07_rhi_revancha: [
			{ if: RHI_HOY, then: [
				{ text: 'Rhi está tumbada en el área, con un balón de almohada y Cinderace dormido a su lado. Te saluda con la mano sin levantarse.' },
				{ say: 'rhi', text: 'Hoy ya jugamos. Cinderace está frito y yo también. —Bosteza—. Mañana, otra. A la misma hora. No me falles.' },
				{ end: true },
			] },
			{ text: 'Rhi entrena sola en el Campo bajo la lámpara de obra de la caseta. Te ve llegar y sonríe con toda la cara.' },
			{ say: 'rhi', text: '¿Revancha? ¡Siempre! En el campo de mi padre, con hierba de verdad. Aquí Cinderace se hace grande igual: debajo del prado también hay un punto de esos. Mi padre dice que por eso crece tan bien la hierba.' },
			{ prompt: '¿Revancha con Rhi?', choice: [
				{ text: 'Curar al equipo y jugar', then: [
					{ heal: 'Rhi te tira la bolsa de deporte de su padre. Tu equipo se recupera del todo.' },
					RHI_MARCA,
					{ battle: 'rhi_7', lose: 'continue',
						onWin: [{ say: 'rhi', text: '¡Otra vez! ¡Me has ganado otra vez! —Lo grita feliz, que es como grita Rhi—. Mañana, otra. Y pasado. Hasta que me salga.' }, { set: { 'flag.b07_rhi_revancha': true } }],
						onLose: [{ say: 'rhi', text: '¡GOOOL! ¡En el Campo! ¡Mi padre lo ha visto desde la caseta! ¿Lo has visto, papá? —Desde la caseta, Gareth levanta un pulgar—.' }, { heal: 'Gareth sale de la caseta con dos Pociones Máximas y un termo de té. Tu equipo se recupera del todo.' }] },
				] },
				{ text: 'Otro día', then: [{ say: 'rhi', text: 'Cobarde. —Te guiña un ojo—. Mañana a la misma hora.' }] },
			] },
		],

		// =================== TERRAZAS: PERCY Y LA MEGANIUMITA ===================
		b07_percy_terrazas: [
			{ set: { 'flag.b07_percy_terrazas': true } },
			{ text: 'En el bancal más alto, junto a un banco de piedra gastado, Percy está sentado con un termo de té entre las rodillas, mirando el valle. A su lado, en el banco, hay otra taza. Vacía. Bien colocada, como si alguien fuera a sentarse.' },
			{ say: 'percy', text: '¡Hola! Siéntate, siéntate. No en ese lado. —Se aparta hacia el otro extremo—. En el medio. Ese lado es de mi abuela. Bueno, era.' },
			{ say: 'percy', text: 'Hizo estos bancales ella. Piedra a piedra, con su Meganium. Cuarenta años. Decía que la ladera quería ser escalera y que solo había que hacerle caso. —Sirve té en la taza vacía y luego te la da a ti—. Toma. Hoy te la presto.' },
			{ say: 'percy', text: 'Abajo, en el bancal del medio, entrenan los granjeros. Si ganas tres combates, te doy una cosa de ella. Hace tiempo que busco a quién dársela. —Sorbe—. No te lo digo para que ganes. Te lo digo para que bajes. A los granjeros les hace ilusión.' },
			{ intel: { npc: 'percy', text: 'Sube cada mañana al bancal más alto de las Terrazas de Hoyuelo, con un termo de té y una taza de más, al banco de su abuela, que hizo los bancales con su Meganium.' } },
		],
		b07_percy_te: [
			{ text: 'Percy sigue en el banco de piedra, con el termo. Te sirve sin preguntar. El té huele a hierba y a algo dulce.' },
			{ say: 'percy', text: 'Desde aquí se ve todo el valle. El estadio, el pueblo, el prado de Gareth. Y la figura de la colina. Mi abuela decía que no hay que mirarla mucho rato seguido. Que se enfada. —Se ríe—. Yo la miro un poco cada día. Así nos vamos conociendo.', cond: '!flag.b07_meganiumita' },
			{ say: 'percy', text: '¿Le has puesto la piedra a tu Meganium? A ver si huele a té. El de mi abuela olía a té. A lo mejor era el Pokémon y no el té. Nunca lo supimos.', cond: 'flag.b07_meganiumita' },
		],
		b07_premio_terrazas: [
			{ set: { 'flag.b07_meganiumita': true } },
			{ text: 'Percy baja del bancal de arriba con el termo bajo el brazo y algo envuelto en un trapo de cocina. Los granjeros se apartan. Gwen, la mayor, se quita el pañuelo de la cabeza.' },
			{ say: 'percy', text: 'Tres. Muy bien. —Se sienta en el muro—. Mi abuela tenía un Meganium que olía a té. Siempre. Aunque no hubiera té. Cuidaba los bancales con ella, y cuando ella se cansaba, se sentaban en el banco de arriba y se quedaban mirando el valle hasta que se hacía de noche.' },
			{ say: 'percy', text: 'Cuando ya no estaban, encontré esto enterrado bajo el banco. En el sitio donde ella ponía los pies. —Desenvuelve el trapo: una piedra verde, redonda, con una espiral rosa dentro que parece moverse—. **Meganiumita**. Hace que un Meganium se haga… más. No sé explicarlo. Más Meganium.' },
			{ say: 'percy', text: 'Yo no tengo Meganium. Y aquí, enterrada, no sirve para nada. Mi abuela odiaba las cosas que no sirven para nada. —Te la pone en la mano, con el trapo y todo—. Toma. Y una cosa: si tu Meganium se pone a oler a té, escríbeme.' },
			{ give: 'meganiumite' },
			{ give: 'notaabuelapercy' },
			{ text: 'Dentro del trapo, doblada en cuatro, hay también una nota escrita a lápiz con una letra antigua. Percy no la ha visto. O hace como que no.' },
			{ if: 'owns("meganium")', then: [
				{ say: 'rotom', text: '¡Bzzt! ¡Nuestro Meganium! El del ático, el que vino de Johto. Le va a encantar. Bueno, no sé si le va a encantar. ¡Pero le va a quedar enorme!', cond: '!' + PURG },
				{ say: 'rotom', text: 'Bzzt. Meganiumita. Tenemos un Meganium. Le servirá.', cond: PURG },
			] },
			{ intel: { npc: 'percy', text: 'Te dio la Meganiumita que encontró enterrada bajo el banco de su abuela, en las Terrazas de Hoyuelo. El Meganium de su abuela «olía a té».' } },
		],
	},

	// =====================================================================
	// OBJETOS
	// =====================================================================
	items: {
		b07_mt_fitoimpulso: { name: 'MT Fitoimpulso', pocket: 'machines', tm: 'grassyglide', desc: 'Un golpe de planta que, sobre hierba alta (Campo de Hierba), sale antes que nadie. Te la dio Percy, el líder de Hoyuelo, con la Medalla Planta.' },
		hojacesped: { name: 'Hoja de la libreta de Gareth', pocket: 'key', desc: 'Una hoja arrancada de una libreta de tapas verdes, con manchas de tierra y la letra grande y redonda de Gareth Hargreave. Rhi te la metió en el bolsillo después de la cena. «No le digas que te la he dado».',
			read: '*(Hoja de libreta de tapas verdes, con manchas de tierra. Letra grande y redonda, a lápiz.)*\n\n**ESTADIO DE HOYUELO · LIBRETA DEL CÉSPED · AÑO 3**\n\n---\n\n**Lunes.** Llovido toda la noche. El córner norte, encharcado como siempre. Los Wooloo se han colado otra vez. Se han comido la banda. Les he dejado: tenían hambre.\n\n**Martes.** Segado a 25 mm. El área de la portería sur está cansada. La dejo descansar hasta el sábado.\n\n**Miércoles.** Ha nacido la niña.\n\n**Jueves.** No he venido.\n\n**Viernes.** No he venido.\n\n**Sábado.** He venido un rato con ella. Pesa como un saco de semillas pequeño. Ha abierto los ojos en el centro del campo. Le he dicho al césped: «Esta es Rhiannon. Pórtate bien con ella». El césped no ha dicho nada. El césped nunca dice nada, pero escucha.\n\n**Domingo.** Partido. Ganamos 2-1. Ni me he enterado. He estado todo el partido mirando el punto de penalti y pensando que algún día va a chutar desde ahí.\n\n---\n\n*(En el margen, con otra letra, mucho más reciente, la de Rhi, con rotulador:)* «Chuté, papá. Desde ahí. Y desde muchos sitios más».' },
		fotoestadiohoyuelo: { name: 'Foto «Medianoche en Hoyuelo»', pocket: 'key', art: 'estadio_noche', desc: 'Una foto hecha con el móvil desde la grada más alta del Estadio de Hoyuelo, de noche: el campo vacío, dos figuras pequeñitas en el centro y una luna enorme por encima del techo de hierba. La hizo Nate. Dice que es la mejor foto que ha hecho nunca. También es la única.' },
		notaabuelapercy: { name: 'Nota de la abuela de Percy', pocket: 'key', desc: 'Una nota doblada en cuatro, escrita a lápiz con letra antigua, que venía dentro del trapo de la Meganiumita. Percy no la ha leído. O dice que no.',
			read: '*(Papel de envolver, doblado en cuatro. Lápiz. Letra antigua, inclinada, de quien escribía con calma.)*\n\nPara quien encuentre esto:\n\nSi la has encontrado, es que has cavado bajo mi banco, y si has cavado bajo mi banco, eres Percy. Hola, cielo.\n\nSi no eres Percy, es que Percy te la ha dado, y si Percy te la ha dado, es que eres buena gente, porque Percy no se equivoca con la gente. Se equivoca con todo lo demás, pero con la gente no.\n\nEsta piedra la encontró mi Meganium el día que terminamos el último bancal. La desenterró con la pata, me la dio y se sentó a mi lado. Olía a té. Siempre olía a té. Nunca supe por qué.\n\nCon la piedra, se hacía más grande, más fuerte, más todo. No la usamos casi nunca. No nos hacía falta pelear. Nos hacía falta mirar el valle.\n\nÚsala tú cuando haga falta. Y cuando no, siéntate en algún sitio alto con tu Meganium y miren algo bonito un rato. Es lo mismo. O casi.\n\nLa ladera quería ser escalera. Solo hubo que hacerle caso.\n\n**Edith**' },
	},

	// =====================================================================
	// RECOLECCIÓN
	// =====================================================================
	gather: {
		b07_r3_arbol: {
			name: 'El árbol de la vía', icon: '🌳', hours: 18, picks: [2, 3],
			text: 'El árbol de la vía suelta lo que tiene. El Greedent de la rama ni se despierta. Bueno, abre un ojo.',
			wait: 'El árbol de la vía está pelado. En la rama, el Greedent tiene la tripa más redonda que antes. No ha sido nadie. Nadie.',
			table: [
				{ id: 'oranberry', w: 18, n: [1, 3] }, { id: 'sitrusberry', w: 12, n: [1, 2] }, { id: 'rawstberry', w: 10, n: [1, 2] },
				{ id: 'aspearberry', w: 10, n: [1, 2] }, { id: 'leppaberry', w: 6, n: [1, 1] }, { id: 'lumberry', w: 3, n: [1, 1] },
				{ id: 'occaberry', w: 3, n: [1, 1] },
			],
		},
		b07_mina_veta: {
			name: 'La pared de las vetas', icon: '⛏️', hours: 20, picks: [1, 2],
			game: { type: 'dig', level: 3, theme: 'cueva', hint: 'Las capas de colores son blandas por fuera y duras por dentro. Las mitades de fósil van hondas: pica fino.' },
			ask: 'La pared de la galería, con vetas de colores en capas como un pastel cortado. Hay marcas de pico recientes, un cubo con un cepillo y una nota de Petra clavada en una grieta: «Sin prisa. Lo bueno va hondo».',
			text: 'La pared de las vetas suelta lo suyo. El polvo se te mete hasta en las cejas.',
			wait: 'La pared de las vetas está recién picada. Hasta que no se asiente el polvo, mejor no tocarla. Lo dice la nota de Petra. Con tres signos de exclamación.',
			table: [
				{ id: 'hardstone', w: 18 }, { id: 'stardust', w: 16, n: [1, 2] }, { id: 'everstone', w: 10 }, { id: 'rarebone', w: 8 },
				{ id: 'smoothrock', w: 6 }, { id: 'heatrock', w: 6 }, { id: 'ironball', w: 6 }, { id: 'nugget', w: 3 },
				{ id: 'fossilizedbird', w: 2, rare: true }, { id: 'fossilizedfish', w: 2, rare: true },
				{ id: 'fossilizeddrake', w: 2, rare: true }, { id: 'fossilizeddino', w: 2, rare: true },
			],
		},
		b07_r4_arroyo: {
			name: 'El remanso de las burbujas', icon: '🎣', hours: 18, picks: [1, 2],
			game: { type: 'fish', level: 2, theme: 'rio', hint: 'Las burbujas te dicen dónde está. No te dicen qué es. Espera al «!».',
				wild: [{ sp: 'seaking', lv: [66, 68], w: 6 }, { sp: 'drednaw', lv: [66, 68], w: 5 }, { sp: 'gyarados', lv: [67, 68], w: 2 }, { sp: 'crawdaunt', lv: [66, 68], w: 3 }], wildChance: 0.3 },
			ask: 'Un remanso del arroyo, bajo un puentecito de piedra. Del fondo suben burbujas, una detrás de otra. Alguien ha dejado una caña apoyada en el pretil con un cartel: «Para el que pase. Devolver mojada».',
			text: 'El remanso de la Ruta 4 devuelve lo que se le cae a la gente del puente.',
			wait: 'Hoy no suben burbujas. Lo que vive ahí abajo se ha ido a dormir. O te ha visto venir.',
			table: [
				{ id: 'freshwater', w: 16, n: [1, 2] }, { id: 'pearl', w: 12, n: [1, 1] }, { id: 'mysticwater', w: 6, n: [1, 1] },
				{ id: 'netball', w: 10, n: [1, 2] }, { id: 'heartscale', w: 8, n: [1, 1] }, { id: 'damprock', w: 4, n: [1, 1] },
				{ id: 'bigpearl', w: 3, n: [1, 1], rare: true }, { id: 'waterstone', w: 2, n: [1, 1], rare: true },
			],
		},
		b07_bancales: {
			name: 'Los huertos de los bancales', icon: '🍎', hours: 20, picks: [2, 3],
			game: { type: 'catch', level: 2, theme: 'huerto', hint: 'Sacude los manzanos con cuidado: las manzanas doradas valen por tres. Lo pocho, para los Wooloo.' },
			ask: 'Un huerto en un bancal de las terrazas: manzanos bajos, arbustos de bayas y un Wooloo tumbado a la sombra que vigila las manzanas caídas. Un cartel de Percy: «Tomen lo que quieran. Dejen algo para el Wooloo».',
			text: 'El huerto de los bancales da lo que tiene. El Wooloo se queda con lo que rueda.',
			wait: 'El huerto está recogido. El Wooloo duerme sobre un montón de manzanas caídas. Son suyas. Ha quedado claro.',
			table: [
				{ id: 'sitrusberry', w: 14, n: [1, 2] }, { id: 'oranberry', w: 14, n: [1, 3] }, { id: 'tamatoberry', w: 8, n: [1, 1] },
				{ id: 'leppaberry', w: 8, n: [1, 1] }, { id: 'miracleseed', w: 4, n: [1, 1] }, { id: 'galaricatwig', w: 4, n: [1, 1] },
				{ id: 'tinymushroom', w: 8, n: [1, 2] },
				{ id: 'sweetapple', w: 2, n: [1, 1], rare: true }, { id: 'tartapple', w: 2, n: [1, 1], rare: true }, { id: 'leftovers', w: 1, n: [1, 1], rare: true },
			],
		},
	},

	// =====================================================================
	// FICHAS DE RETO
	// =====================================================================
	challenges: {
		terrazas_hoyuelo_entreno: {
			name: 'Terrazas de Hoyuelo (entrenamiento)', npc: 'percy', type: 'Grass', rec: 70,
			cond: 'visited("terrazas_hoyuelo")',
			info: [
				{ text: 'Zona de entrenamiento con tope en el nivel **70**: los granjeros de Hoyuelo entrenan en el bancal del medio entre faena y faena. Mucha planta, algo de agua y un poco de fantasma.' },
				{ text: '**Percy** da una cosa de su abuela a quien gane **tres** combates. Está en el bancal de arriba, con el té.' },
				{ cond: 'flag.b07_meganiumita', text: '✔ Premio conseguido: Meganiumita.' },
			],
		},
		rhi_hoyuelo: {
			name: 'Rhi, en el estadio vacío', npc: 'rhi', trainer: 'rhi_7', type: 'Fire', rec: 70,
			cond: 'flag.b07_casa_rhi',
			info: [
				{ text: 'De noche, en el **Estadio de Hoyuelo**, Rhi te reta «en el campo de su padre». No da medalla. Te deja curar antes. Gane quien gane, la historia sigue.' },
				{ text: '6 Pokémon, hasta el nivel 69. Su as sale el último y **se hace enorme** de una forma que no has visto, con una bola de fuego encima.' },
				{ text: '**Agua**, **Tierra** y **Roca** contra su as. Su pájaro de acero aguanta mucho: ahí, **Eléctrico** o **Fuego**. Ojo con un Pokémon que se mueve antes que nadie cuando no ataca.' },
				{ cond: 'flag.b07_rhi_vencida_7', text: '✔ Ganado en el estadio. «Ha sido limpio».' },
				{ cond: COMBATE, text: 'Revancha en **el Campo** de los Hargreave, cuando quieras.' },
			],
		},
		nate_sofa: {
			name: 'Nate, desde el sofá', npc: 'nate', trainer: 'nate_1', type: 'Normal', rec: 69,
			cond: 'flag.b07_nate_charla',
			info: [
				{ text: 'En casa de los Hargreave. Amistoso y opcional: Nate no se levanta. Te deja curar antes (pociones en el cajón de los cubiertos).' },
				{ text: '4 Pokémon, hasta el nivel 69. Su as golpea muy fuerte un turno y descansa el siguiente. Aprovecha los turnos de descanso.' },
				{ cond: 'flag.b07_nate_vencido', text: '✔ Ganado. Nate se ha vuelto a dormir.' },
			],
		},
		gym_hoyuelo: {
			info: [
				{ text: 'Líder: **Percy**, tipo **Planta**. Granjero, grandullón y el más amable de Galar. Dicen que nunca ha levantado la voz. Ni para pedir el balón.' },
				{ cond: 'flag.b07_gym_hoyuelo_visto', text: '5 Pokémon, hasta el nivel 69. En su estadio, su as **dinamaxiza**: se hace enorme durante tres turnos. Te ofrece curar antes (y té).' },
				{ cond: 'flag.b07_gym_hoyuelo_visto', text: '**Fuego**, **Volador**, **Hielo** y **Bicho** contra la planta. Cuidado con lo que crece: algunos se curan solos si les das tiempo, y dos de sus Pokémon son también **Dragón**: ahí, **Hielo** y **Hada**.' },
				{ cond: 'flag.b07_percy_vencido', text: '✔ Medalla Planta conseguida.' },
			],
		},
	},

	// =====================================================================
	// RADIO LAVANDA (comentan lo que el jugador ya vivió)
	// =====================================================================
	radio: [
		{ id: 'rl_b07_percy', kind: 'noticia', cond: 'flag.b07_percy_vencido', text: 'Desde Galar nos cuentan que en Pueblo Hoyuelo el líder Percy ha entregado la primera Medalla Planta de la temporada a alguien de la Gira. Dicen que antes del combate sirvió té. Dicen que después, también. Aquí en Lavanda no tenemos estadio, pero té sí: pasen por la emisora, que siempre hay.' },
		{ id: 'rl_b07_gareth', kind: 'dedicatoria', from: 'Gareth', cond: 'flag.b07_rhi_combate && !flag.b07_rhi_dolida', text: 'Una dedicatoria que llega desde muy lejos, desde un pueblo de Galar. Dice: «Para mi hija, que jugó en casa. Y para {el|la|le} que le ganó o le perdió, que me da igual: lo importante es que jugaron de verdad. La hierba se acuerda». No sabemos qué hierba. Nos ha parecido precioso.' },
	],
};
