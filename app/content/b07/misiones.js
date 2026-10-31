// Misiones del Bloque 7 (Galar · Acto VI). Los tramos las avanzan con sus etapas exactas (b07-encargo.md).
// Regla (2026-10-10): cada parte de un hilo es su propia misión y se cierra al terminar su parte.
// Los textos se ven en el Diario: sin spoilers, ≤ 240 caracteres, con un lugar o personaje de ancla.
// Los `where` de las `parts` apuntan a lugares que crean los tramos: index.js quita (con aviso) los que aún no existen.
export default {
	// ⭐ Principales
	b07_m1: { name: 'Andén de Par', type: 'main', est: 50, stages: {
		puerta: 'La Gira sigue en **Galar**. Se cruza por cualquier **Puerta Lemnis**: Porcelana, Hauoli, Azafrán, Luminalia o Trigal. La de Galar está en una estación de tren.',
		par: 'Ya estás en **Pueblo Par**. La recepción de la Gira es en la **estación**, junto a las vías.',
		hecha: 'Llegaste a Galar. Llueve un poco, huele a hierba cortada y Rhi no ha parado de hablar desde el andén.',
	} },
	b07_m2: { name: 'El marcador', type: 'main', est: 110, stages: {
		area: 'Cruza el **Área Silvestre** hacia el norte hasta **Ciudad Pistón**. Es enorme y el tiempo cambia cada media hora. Lleva paraguas.',
		apertura: 'La **Apertura de la Temporada** es en el **Estadio de Pistón**. **Renata** ha venido a grabarla en directo.',
		hecha: 'La Temporada de Galar ya está abierta. El marcador del estadio vuelve a decir solo los resultados.',
	} },
	b07_m3: { name: 'La delantera', type: 'main', est: 140, stages: {
		hoyuelo: 'Sigue la **Ruta 3**, la **Mina de Galar** y la **Ruta 4** hasta **Pueblo Hoyuelo**. **Rhi** te espera allí.',
		gimnasio: 'El líder **Percy** te espera en el **Estadio de Hoyuelo**. Tipo Planta. Dicen que su as se hace enorme.',
		hecha: 'Tienes la Medalla Planta. Hoyuelo huele a tierra mojada, y en casa de Rhi sobra comida.',
	} },
	b07_m4: { name: 'Los que pagan', type: 'main', est: 140, stages: {
		crampon: 'Toma el tren en la **estación de Pistón** hasta **Pueblo Crampón**. **Handsome** quiere enseñarte algo que pasa allí de noche.',
		torneo: 'En **Crampón** se juega un torneo que no sale en ningún cartel. Averigua quién lo paga. Hay más de una forma.',
		hecha: 'Ya sabes quién paga. Y sabes adónde va el dinero: al norte, a **Ciudad Artejo**.',
	},
	// Las tres vías del torneo: dos bastan (T4 cierra la etapa `torneo` con dos de las tres).
	parts: { title: 'Quién paga el torneo (bastan dos)', items: [
		{ label: 'Combatir en el torneo', where: 'cripta_crampon', done: 'flag.b07_pista_combate', hint: '**Nerio** puede conseguirte plaza en **la Cripta**. Si pierdes una ronda, alguien te saca por detrás.' },
		{ label: 'Escuchar desde dentro', where: 'trastienda_cripta', done: 'flag.b07_pista_personal', got: 'flag.b07_personal_media', gotHint: 'Te pillaron a medias. Lo que oíste cuenta, pero falta la otra mitad: vuelve a intentarlo con **Handsome**.', hint: '**Handsome** tiene dos uniformes de camarero. Le quedan fatal. Al anfitrión le gusta hablar por teléfono.' },
		{ label: 'Seguir el dinero', where: 'trastienda_cripta', done: 'flag.b07_pista_dinero', hint: 'En la trastienda de **la Cripta** hay una caja de caudales. Los torneos de verdad llevan las cuentas al día.' },
	] } },
	b07_m5: { name: 'Ego', type: 'main', est: 160, stages: {
		artejo: 'Cruza el **Área Silvestre** por el norte hasta **Ciudad Artejo**, la de la muralla.',
		gimnasio: 'El líder **Roy** te espera en el **Estadio de Artejo**. Tipo Dragón. Lleva un rato mirando el cielo.',
		planta: 'Entra en la **Planta Eléctrica** de **Artejo**. Lleva a {riolu} y a tu mejor equipo.',
		hecha: 'La torre de Artejo está en silencio. La Gira ya mira hacia otra región.',
	} },

	// 🧵 Hilos
	b07_t_apuntador: { name: 'Desde la concha (II)', type: 'thread', est: 50, stages: {
		estadio: 'El **Apuntador** prometió un segundo acto «en otra región». En el **Estadio de Pistón**, el marcador lleva días diciendo cosas raras.',
		hecha: 'El segundo acto ya se ha representado. Habrá un tercero, y no será en un estadio.',
	} },
	b07_t_rhi: { name: 'La delantera (VI)', type: 'thread', est: 60, stages: {
		casa: '**Rhi** te ha invitado a su casa, en **Pueblo Hoyuelo**. Su padre cocina. Ella dice que no es para tanto.',
		estadio: '**Rhi** te espera en el césped del **Estadio de Hoyuelo**, de noche. Quiere un partido. Uno de verdad.',
		hecha: 'Rhi jugó en casa. Y por primera vez en años no miró a la grada antes de chutar.',
	} },
	b07_t_lola: { name: 'La arrepentida (IV)', type: 'thread', est: 40, stages: {
		torneo: '**Lola** está en **Pueblo Crampón**, muy lejos de su carrito. Dice que ha venido a pagar una deuda. No dice a quién.',
		hecha: 'Lola pagó lo que debía. No todo se paga con dinero, y ella lo sabe.',
	} },
	b07_t_kaori: { name: 'Dulce veneno (VI)', type: 'thread', est: 20, stages: {
		torneo: '**Kaori** ha seguido un lote de caramelos hasta **Pueblo Crampón**. Te espera en el callejón del gimnasio, con guantes.',
		hecha: 'El antídoto da otro paso. Kaori lo apunta con letra pequeñísima.',
	} },
	b07_t_bastien: { name: 'Letra pequeña (VII)', type: 'thread', est: 20, stages: {
		torneo: '**Bastien** se gana la vida combatiendo en **Pueblo Crampón**. Dice que pagan bien. Lo dice mirando al suelo.',
		planta: '**Bastien** está en **Ciudad Artejo**. Te ha escrito una sola palabra: «Ven».',
		hecha: 'Bastien llegó a donde tenía que llegar. Lo que encontró allí, lo lleva puesto.',
	} },
	b07_t_noa: { name: 'Las jaulas (VII)', type: 'thread', est: 30, stages: {
		mensaje: 'Un mensaje sin firma te cita en **Ciudad Artejo**, «emplazamiento 06». Reconoces la forma de escribir.',
		hecha: 'Alguien abrió las jaulas desde dentro.',
	} },
	b07_t_lucien: { name: 'El novato perdido', type: 'thread', est: 20, stages: {
		buscar: '**Lucien** no está en la portería del ático de **Philippe**. Alguien ha visto a un niño con un Chespin en **Ciudad Artejo**.',
		hecha: 'Lucien vuelve a casa. Con una historia que no va a contar en el colegio.',
	} },
	// Hilo NUEVO del B7
	b07_t_octavia: { name: 'La presidenta', type: 'thread', est: 30, stages: {
		cita: 'La presidenta de Lemnis quiere hablar contigo en la **Planta Eléctrica** de **Artejo**. Sin cámaras. Sin su gente.',
		hecha: 'Octavia Lemnis eligió. Ahora te toca a ti cumplir tu parte.',
	} },

	// 📜 Secundarias
	b07_s_iniciales: { name: 'Los tres de Galar', type: 'side', est: 60, stages: {
		buscar: 'Hay tres Pokémon de Galar que todavía no tienen con quién ir: cerca de **Pueblo Par**, en **Ciudad Pistón** y en **Pueblo Hoyuelo**.',
		hecha: 'Los tres de Galar encontraron con quién ir.',
	},
	parts: { title: 'Los tres de Galar', items: [
		{ label: 'Sobble', where: 'gal_ruta2', done: 'flag.b07_sobble || flag.b07_sobble_vive', hint: 'En el lago de la **Ruta 2** algo llora cada vez que llueve. Y en Galar llueve mucho.' },
		{ label: 'Grookey', where: 'piston_talleres', done: 'flag.b07_grookey || flag.b07_grookey_vive', hint: 'En la **calle de los talleres** de **Pistón** alguien toca el tambor con un palito. Fatal. Pero con muchas ganas.' },
		{ label: 'Scorbunny', where: 'hoyuelo', done: 'flag.b07_scorbunny || flag.b07_scorbunny_vive', hint: 'En **Hoyuelo**, un Pokémon pequeño chuta piedras contra la pared de la escuela de fútbol. Siempre a la misma esquina.' },
	] } },
	b07_s_oficios: { name: 'La Liga de los Siete Oficios', type: 'side', est: 100, stages: {
		maestros: 'En **Ciudad Pistón**, siete maestros de oficio guardan una tradición vieja. Convence a cuatro. No todos se convencen combatiendo.',
		sello: 'Ya tienes a cuatro. Los maestros se reúnen en la **taberna de curri** de **Priya**, en Pistón. Ve.',
		hecha: 'Tienes el Sello de los Siete Oficios. En Pistón te saludan con la gorra.',
	},
	parts: { title: 'Los siete maestros', items: [
		{ label: 'La herrera', where: 'piston_talleres', done: 'flag.b07_oficio_herreria', hint: 'Forja piezas para los trenes. Dice que el mejor hierro de Galar está en la **Mina**, y que nadie baja ya a por él.' },
		{ label: 'El relojero', where: 'piston_talleres', done: 'flag.b07_oficio_relojeria', hint: 'Arregla el reloj de la torre de la estación. Lleva una semana sin dar la hora buena.' },
		{ label: 'La tintorera', where: 'piston_talleres', done: 'flag.b07_oficio_tintoreria', hint: 'Tiñe las bufandas de los hinchas. Busca un color que ya no recuerda cómo se hacía.' },
		{ label: 'El carpintero', where: 'piston_talleres', done: 'flag.b07_oficio_carpinteria', hint: 'Hace los banquillos de los estadios. Tiene un aprendiz que no deja de hacer ruido.' },
		{ label: 'Agnes, la guardagujas', where: 'estacion_piston', done: 'flag.b07_oficio_aguja', hint: 'Lleva todos los horarios de Galar en la cabeza. Dicen que nunca ha perdido un tren. Ni una discusión.' },
		{ label: 'Priya, la del curri', where: 'curri_piston', done: 'flag.b07_oficio_curri', hint: 'Su curri tiene fama en toda la región. Dicen que **Gaspar** anda por Pistón con hambre de reto.' },
		{ label: 'Naboru, el de las calderas', where: 'calderas_piston', done: 'flag.b07_oficio_calderas', hint: 'El líder de Pistón cuida las calderas bajo su estadio mientras dura la obra. Respeta la disciplina, no la prisa.' },
	] } },
	b07_s_casa: { name: 'La Casa de las Siete Puertas', type: 'side', est: 110, stages: {
		carta: '**Quintana** te escribe desde **Pueblo Plié**: una casa, un grupo de visitantes y una cuenta que no sale. Hay tren desde **Pistón**.',
		testigos: 'En **Plié**, todos los visitantes de la Casa cuentan lo mismo: entraron ocho. El registro dice siete. Escúchalos a todos.',
		casa: 'Ya sabes lo que contaron. Falta recorrer la **Casa de las Siete Puertas** por dentro, puerta a puerta, con **Quintana**.',
		acusar: '**Quintana** quiere saber a quién señalas, y con qué prueba. Puedes pensarlo con calma.',
		hecha: 'La cuenta de la Casa ya sale. Lo que hiciste con la llave, lo sabe medio Plié.',
	},
	parts: { title: 'Los visitantes', items: [
		{ label: 'La recién casada', where: 'plie', done: 'flag.b07_viajero_novia', hint: 'Se aloja en la posada de **Plié**. Su marido y ella firmaron «a la vez». Eso dice.' },
		{ label: 'El recién casado', where: 'plie', done: 'flag.b07_viajero_novio', hint: 'Pasea por la plaza de **Plié** contando farolas. Está nervioso desde aquella noche.' },
		{ label: 'El niño del Ditto', where: 'plie', done: 'flag.b07_viajero_nino', hint: 'Juega en la plaza de **Plié** con un Ditto que se convierte en lo que tiene delante. Medio pueblo lo mira mal.' },
		{ label: 'La abuela', where: 'plie', done: 'flag.b07_viajero_abuela', hint: 'Vigila al niño desde un banco de **Plié**, haciendo punto. No se le escapa nada. Ni un punto.' },
		{ label: 'La excursionista', where: 'bosque_lumirinto', tramo: 2, done: 'flag.b07_viajero_excursionista', hint: 'Acampa en el **Bosque Lumirinto**. No ha querido volver al pueblo desde entonces.' },
		{ label: 'El fotógrafo', where: 'plie', done: 'flag.b07_viajero_fotografo', hint: 'Revela fotos en el sótano de la posada de **Plié**. Tiene la del grupo. Dice que no la enseña gratis.' },
		{ label: 'La hincha', where: 'plie', done: 'flag.b07_viajero_hincha', hint: 'Una chica del Team Yell que llegó a **Plié** por equivocación y se quedó. Tiene muy buena memoria para las caras.' },
	] } },
	b07_s_fosiles: { name: 'Fósiles que no encajan', type: 'side', est: 30, stages: {
		mitades: '**Petra** ha venido a la **Mina de Galar**: dice que aquí salen fósiles «que no encajan con nada». Excava mitades y llévaselas.',
		hecha: 'Petra apuntó cuatro criaturas que no deberían existir. Las apuntó con mucho cariño.',
	},
	parts: { title: 'Las cuatro mezclas', items: [
		{ label: 'Pájaro + dragón', where: 'mina_galar', done: 'flag.b07_fosil_dracozolt', hint: 'Una mitad con plumas y otra con cola. Petra dice que no le cabe en la cabeza. Le cabe en la mochila.' },
		{ label: 'Pájaro + plesio', where: 'mina_galar', done: 'flag.b07_fosil_arctozolt', hint: 'Una mitad con plumas y otra de un animal de agua fría.' },
		{ label: 'Pez + dragón', where: 'mina_galar', done: 'flag.b07_fosil_dracovish', hint: 'Una mitad con aletas y otra con cola. «Esto no es ciencia, es un sándwich», dice Petra.' },
		{ label: 'Pez + plesio', where: 'mina_galar', done: 'flag.b07_fosil_arctovish', hint: 'Una mitad con aletas y otra de un animal de agua fría.' },
	] } },
};
