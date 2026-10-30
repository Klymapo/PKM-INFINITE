// Decisiones con eco (pedido de Mario, 2026-10-29). Buzón: docs/CONTENIDO.md §15, motor en app/js/correo.js.
// Cartas, periódicos y visitas que llegan días reales después de una gran decisión ya vivida (B1–B6).
// Reglas: solo comentan lo vivido y cómo le va al mundo después; nunca adelantan trama. Variantes por rama con
// `cond` excluyentes sobre los flags de la decisión + el flag de fin del bloque (llega cuando ya se vivió).
// Una partida vieja que ya cumple muchas recibe una cada 20 h (cola por antigüedad), así que cada pieza está
// escrita para leerse bien aunque llegue tarde: nada que choque con lo que pasa en bloques posteriores.
// Sin Rotom ni Diario (biblia §3.5 y §7). Recompensas: ninguna, salvo las bayas de Brock (protegidas con flag).
//
// Piezas (20):
//   B1  Crómlech     eco_b01_cromlech_prensa (periódico) · eco_b01_cromlech_handsome (visita) · eco_b01_cromlech_trato (carta de Serafina)
//   B2  Lila         eco_b02_lila_protegida · eco_b02_lila_sola
//   B3  El rancho    eco_b03_rancho_sobrina · eco_b03_rancho_jugador · eco_b03_rancho_lemnis (cartas de Adela)
//       Los Rocket   eco_b03_rocket_libres (carta de Lance) · eco_b03_rocket_policia (periódico)
//   B4  Lebrun       eco_b04_lebrun_detenido (carta de Matière) · eco_b04_lebrun_cebo · eco_b04_lebrun_libre (cartas de Handsome)
//   B5  La luz       eco_b05_luz_necrozma (periódico) · eco_b05_luz_aether (carta de Gladio) · eco_b05_luz_leilani (carta de Leilani)
//   B6  Chamota      eco_b06_ines_zorua · eco_b06_ines_campanario (cartas de Inés) · eco_b06_chamota_cronica (periódico)
//       Final        eco_b06_brock (visita; regala bayas una vez: flag.eco_b06_brock_bayas)

// Gran decisión de Crómlech (B1): con trato, Sera rompe el trato si en el B2 el fragmento no fue para ella.
// La tarjeta es de usted y del «acuerdo en pie»: solo llega antes de la decisión del fragmento (con `b02_frag_sera`
// Sera ya tutea; el motor vuelve a mirar la cond al entregar, así que no llega tarde ni contradice el B2).
const TRATO_VIGENTE = 'flag.b01_trato_sera && !flag.b02_frag_handsome && !flag.b02_frag_melia && !flag.b02_frag_sera';

export default {
	items: {
		// ============================== B1 · CRÓMLECH ==============================
		ecob01diario: { name: 'Diario de Luminalia (Crómlech)', pocket: 'key', desc: 'Un ejemplar doblado en cuatro del *Diario de Luminalia*. La crónica de Alexia ya no va en portada, pero sigue ahí.',
			read: '**DIARIO DE LUMINALIA** · Sección de Kalos\n\n**CRÓMLECH, UNA SEMANA DESPUÉS**\n*por Alexia*\n\nLas furgonetas de televisión se fueron el jueves. Las vallas siguen.\n\nEn el pueblo de los menhires ya nadie se asoma a la ventana cada vez que pasa un coche, pero todo el mundo sabe cuántos coches pasan. Doce el lunes. Nueve el martes. Los vecinos los cuentan desde el banco de la plaza, como quien cuenta nubes.\n\nLa empresa que excavaba entre las piedras sigue diciendo lo mismo que el primer día: «labores de conservación». Lo ha dicho en catorce comunicados. Nadie ha explicado todavía qué se conserva con una máquina que zumba.\n\nEsta redacción no va a dejar de preguntarlo. Tampoco va a publicar nada que no haya comprobado. Las dos cosas a la vez, aunque cansen.\n\nA la fuente que nos llamó aquella noche, con las manos todavía temblando: gracias. Sabemos que no fue gratis.\n\n*(En la página siete, como siempre, la Gira. Suerte, novatos.)*' },
		ecob01sera: { name: 'Tarjeta de Serafina', pocket: 'key', desc: 'Una tarjeta de cartulina gruesa, color marfil, sin membrete. Letra inclinada, sin una sola tachadura. Huele vagamente a papel caro.',
			read: '{jugador}:\n\nLe escribo por cortesía, no por necesidad. Las personas razonables escasean, y conviene que sepan que se las tiene en cuenta.\n\nUna observación práctica: el Holomisor no es un adorno. Si lo lleva encima, llévelo cargado. Si no lo lleva, no se lo reprocharé. Solo lo apuntaré.\n\nUna norma de etiqueta que mi madre repite desde que tengo memoria: a una carta se responde en tres días; a un favor, cuando se pueda; a una promesa, siempre.\n\nEsta tarjeta no requiere respuesta. Nuestro acuerdo sigue en pie.\n\n—S.' },

		// ============================== B2 · LILA ==============================
		ecob02lilaprot: { name: 'Carta de Lila', pocket: 'key', desc: 'Un sobre verde menta con una flor blanca prensada dentro. La letra es redonda y aprieta mucho el boli.',
			read: 'Hola, {jugador}:\n\nTe escribo porque en persona me trabo, y esto quería decirlo entero.\n\nLo del gimnasio, con los de la R. No me enfadé contigo. Bueno, un poco. Ya se me ha pasado. Sé que lo hiciste porque te importo, y eso me pone las orejas rojas solo de escribirlo.\n\nPero escucha: no me quites las pocas que tengo, ¿sí? Las batallas, digo. Si me las quitas todas, nunca voy a saber si puedo. Y yo necesito saberlo. Aunque salga mal. Sobre todo si sale mal.\n\nLas líneas del campo ya están pintadas. Rectas. Bueno, casi. En la de la izquierda hay unas huellas de cuatro patas que no pienso borrar.\n\nLa próxima vez que haya algo feo, ponte a mi lado. No delante. A mi lado.\n\nUn abrazo fuerte (de los de verdad),\nLila\n\nP. D.: Le mandé a Corelia una foto de las huellas. Contestó «¡a tope!». No sé si para bien o para mal.' },
		ecob02lilasola: { name: 'Carta de Lila', pocket: 'key', desc: 'Un sobre verde menta con una flor blanca prensada dentro. La letra es redonda y en una esquina hay un dibujo pequeño de un círculo de tiza.',
			read: 'Hola, {jugador}:\n\nTe escribo porque en persona me trabo, y esto quería decirlo entero.\n\nLo hice yo. Lo del gimnasio, con los de la R. Lo hice yo, en el círculo de tiza, sin que nadie me lo quitara. Llevo días repitiéndolo en voz alta mientras pinto, y Cornelio dice por teléfono que parezco una radio rota.\n\nGracias por no ponerte delante. Ya sé que suena raro dar las gracias por eso. Pero es lo más bonito que ha hecho nadie por mí en mucho tiempo: dejarme.\n\nLas líneas del campo ya están pintadas. Rectas. Bueno, casi. En la de la izquierda hay unas huellas de cuatro patas que no pienso borrar.\n\nNo me tiembla la voz cuando lo cuento. Un poco al final. Pero solo al final.\n\nUn abrazo fuerte (de los de verdad),\nLila\n\nP. D.: Le mandé a Corelia una foto de las líneas. Me contestó con catorce signos de exclamación. Los he contado.' },

		// ============================== B3 · EL RANCHO ==============================
		ecob03adela: { name: 'Carta de Adela', pocket: 'key', desc: 'Un sobre arrugado, con una mancha redonda de café en una esquina y otra de algo que prefieres no preguntar. Huele a galletas viejas.',
			read: '{jugador}:\n\nTe dije que te escribiría cada mes. Esta es la primera que llega a correos. Las otras se quedaron en la lata de las galletas. No preguntes.\n\nTengo tres Miltank de clientas fijas, una que viene de la Ruta 39 aunque le queda lejos, y un Tauros que me odia. Yo a él también. Nos llevamos bien así.\n\nEl rancho sale. Justo, pero sale. Vendí el carro. El tejado, que espere. Las Mareep se van solas al establo cuando se pone el sol, en orden, como él les enseñó. No les he tenido que silbar ni una vez.\n\nLa leche la vendo en la cancela, los sábados. Si pasas por Johto, cómprame. Y no me preguntes por el tejado.\n\nLa mecedora sigue en el porche. Se mueve un poco cuando sopla el viento.\n\n—A.\n\nP. D.: Si un mes no te escribo, es que estoy esquilando. Ya te lo dije.' },
		ecob03adelatuyo: { name: 'Informe de Adela', pocket: 'key', desc: 'Una hoja de libreta arrancada, doblada en dos, con «PARA {EL|LA|LE} DUEÑ{O|A|E}» escrito por fuera y tachado dos veces hasta dejar solo tu nombre.',
			read: '**INFORME DEL RANCHO PRADO**\n*(propiedad de {jugador}, que nunca está)*\n\n**Pienso:** pagado hasta el mes que viene.\n**Tejado:** gotea. En el mismo sitio. Le he puesto un cubo. El cubo también gotea.\n**Rebaño:** bien. Comen, duermen, se van solas al establo al atardecer. En orden, como él les enseñó.\n**Huerto:** las zanahorias salen torcidas. Borla se comió una derecha. No sé de dónde la sacó.\n**Mecedora:** en su sitio. Por las tardes se sienta quien se sienta. No me mires así.\n**Visitas:** el coche azul pasó dos veces por la carretera. No paró. Lo apunto porque me dijiste que te lo apuntara todo.\n\n**Pendiente:** que vengas a esquilar. Esquilas mal, pero esquilas. Algo es algo.\n\n—A.' },
		ecob03adelafund: { name: 'Nota de Adela', pocket: 'key', desc: 'Media hoja de papel con el logo de la Fundación arrancado de la esquina. Lo que queda es la letra de Adela, apretada y sin adornos.',
			read: '{jugador}:\n\nTe dije que te escribiría. Te escribo.\n\nVienen los martes. Muy amables. Traen pienso del bueno, en bolsas azules, sin etiqueta. Se van antes de comer.\n\nLa casa no la han tocado. La mecedora tampoco. El cartel sigue en su sitio, con su «Rancho Prado» un poco torcido, como lo dejó él. Eso lo cumplieron. Lo pongo aquí porque es justo ponerlo.\n\nLas Mareep están bien. Tranquilas. Más que nunca. Al atardecer se van al establo en fila, sin un balido.\n\nMi tío decía que una Mareep tranquila es una Mareep que está pensando en algo.\n\nNo me escribas para preguntarme si estoy bien. Estoy.\n\n—A.' },

		// ============================== B3 · LOS ROCKET ==============================
		ecob03lance: { name: 'Carta de Lance', pocket: 'key', desc: 'Papel grueso, sin adornos, con un sello de cera roja en forma de ala. La letra es firme y no se sale nunca de la línea.',
			read: '{jugador}:\n\nAquella tarde la decisión fue tuya, no mía. Esto no es una opinión sobre ella: es un informe.\n\nHe vuelto tres veces al pueblo desde aquella tarde. He preguntado en la tienda de recuerdos, en el Centro Pokémon y en la parada del autobús. Nadie ha visto una gorra con la letra roja. Ni una.\n\nUno ha vuelto a casa de su madre, en la Ruta 37, y ayuda con el arroz; me lo contaron dos señoras en la cola. Otra trabaja en una cerrajería, abriendo cosas que son de quien paga. No les he dicho nada. No me ha hecho falta.\n\nAquel día te pregunté si estabas segur{o|a|e}: eran catorce y podían volver a ponerse una gorra. Hoy te contesto yo. No se la han puesto. Lo he visto.\n\nLos dragones del lago están tranquilos. El agua también.\n\n—Lance' },
		ecob03caoba: { name: 'La Hoja de Caoba', pocket: 'key', desc: 'Un periódico local de cuatro páginas, impreso en papel finito. En la portada, una foto movida de la tienda de recuerdos de Pueblo Caoba.',
			read: '**LA HOJA DE CAOBA** · *Lo que pasa junto al lago*\n\n**DETENIDOS QUINCE EN UN SÓTANO BAJO LA TIENDA DE RECUERDOS**\n\nLa Policía Internacional detuvo la semana pasada a quince personas en unas instalaciones que nadie en el pueblo sabía que existían: un sótano de varias plantas bajo la tienda de recuerdos de la calle principal. Sí, esa. La de los llaveros del Gyarados.\n\nSegún los vecinos, la operación empezó con una llamada del entrenador de dragones que vigila el lago desde hace días, y la dirigió un agente «muy simpático, con un bigote que no era suyo».\n\nLos detenidos salieron en fila, sin esposas. Un testigo asegura que el agente les prometió bocadillos. La Policía Internacional no ha confirmado los bocadillos.\n\nLa dueña de la tienda pide calma y recuerda que los llaveros siguen a la venta. «A mitad de precio», añade. «Por las molestias».\n\n**EL TIEMPO:** cielos despejados. El lago, en calma.' },

		// ============================== B4 · LEBRUN ==============================
		ecob04matiere: { name: 'Carta de Matière', pocket: 'key', desc: 'Un sobre con el membrete de la Agencia de Detectives de Luminalia. Dentro, dos hojas escritas a mano con prisa y una mancha de algo que fue un macaron.',
			read: '{jugador}:\n\nTe escribo yo porque él no va a hacerlo. Lo ha intentado cuatro veces. Las cuatro cartas están en la papelera, y las cuatro empiezan igual: «Handsome no sabe por dónde empezar».\n\nTe cuento cómo está, que es lo que querrías saber.\n\nNo se sienta en la silla. Le han dado el despacho, la mesa, el mando provisional y una placa nueva que todavía tiene el plástico puesto. Trabaja de pie, o en un taburete que se trajo de la Agencia. La silla está ahí, empujada contra la mesa, como si alguien fuera a volver a por ella.\n\nFue en persona a decírselo a la hija, como había prometido. No me ha contado cómo fue. Volvió tarde. Le hice la cena y se la comió entera, sin decir nada, lo cual ya te dice cómo estaba.\n\nEstá bien. Bueno: va a estar bien. Es más fuerte de lo que parece y bastante más tonto de lo que se cree, y las dos cosas ayudan.\n\nGracias por estar ahí abajo cuando hizo falta.\n\nMatière\n\nP. D.: Le hice macarons para animarlo. Se los comió todos. No le digas a nadie que se me quemaron.' },
		ecob04cebo: { name: 'Carta de un turista', pocket: 'key', desc: 'Una postal de Luminalia (la Torre Prisma, de noche) con un sello de Kalos puesto del revés. La firma un tal «Un turista». Tú sabes quién es.',
			read: 'Querid{o|a|e} sobrin{o|a|e}:\n\nTu tío el turista está muy bien. Luminalia, preciosa. Los macarons, regulares.\n\nTe cuento las novedades de la familia. El primo del traje gris llega a la oficina todos los días a las ocho en punto. Hace sus deberes por triplicado, como siempre. Antes de mandarlos por correo, tu tío los lee. Todos. Con lupa. Hay mucha letra pequeña.\n\nEl primo está más delgado. Duerme poco. Tu tío, también. Nos tomamos el café juntos a las ocho y cinco y hablamos del tiempo. Solo del tiempo. Somos muy buenos hablando del tiempo.\n\nLa familia de fuera cree que en casa todo sigue igual. Y en casa todo sigue igual. Eso es lo más difícil de todo, sobrin{o|a|e}: que todo siga igual.\n\nCome bien. Abrígate. No hables con desconocidos con corbata.\n\nUn abrazo de tu tío,\n*Un turista*\n\nP. D.: Esta postal se autodestruirá. Es broma. Pero quémala igual, que da más ambiente.' },
		ecob04libre: { name: 'Carta de Handsome', pocket: 'key', desc: 'Tres hojas de papel oficial de la Policía Internacional, escritas a mano por las dos caras. Al final, una firma enorme con una floritura que no le cabe.',
			read: '{jugador}:\n\nHandsome no estaba de acuerdo. Handsome sigue sin estarlo. Eso primero, para que conste.\n\nDicho eso: me he leído la carpeta. Entera. Seis años de informes por triplicado, que en realidad son dieciocho años de papel. He tardado once noches. Matière me ha traído café nueve de ellas; las otras dos se quedó dormida en el sofá de la Agencia con un archivador de almohada.\n\nEs una letra muy bonita, la suya. Muy clara. Sin una sola falta. Eso es lo que más me duele, creo. Que lo hacía todo tan bien.\n\nHay cosas en esa carpeta que Handsome no sabía. Ahora las sabe. No te las cuento por carta, que las cartas se pierden; te las contaré en persona cuando haga falta, y no antes.\n\nNo lo busco. Bueno. Lo busco un poco. Sobre todo en los sitios donde no está.\n\nTú decidiste estando ahí abajo cuando yo no estaba. Lo respeto. Hoy, un poco más que el primer día.\n\nHandsome\n*Policía Internacional · Colaborador de su Colaborador{|a|e} Especial*' },

		// ============================== B5 · LA LUZ ==============================
		ecob05heraldo: { name: 'El Heraldo de Hauoli', pocket: 'key', desc: 'Un periódico de Alola con la portada entera ocupada por una sola foto: un atardecer naranja sobre la bahía de Hauoli. Huele a sal.',
			read: '**EL HERALDO DE HAUOLI** · *Noticias de las cuatro islas*\n\n**VOLVIÓ EL ATARDECER**\n\nFue de golpe. Nadie en Melemele se pone de acuerdo en la hora exacta, pero todos coinciden en cómo: como cuando alguien enciende la luz de una habitación. Tres semanas de cielo gris y, en un parpadeo, azul. Luego naranja. Luego el atardecer entero, que llevaba todo ese tiempo sin poder ponerse.\n\nEn el Paseo de Hauoli, la gente salió a la calle sin zapatos. Un vendedor de malasadas regaló la bandeja entera. Los Wingull, que llevaban días posados en las farolas sin moverse, salieron todos a la vez hacia el mar.\n\n«Lo que se rompe en la isla, lo arregla quien lo rompió», dijo la kahuna de Poni, que bajó a la Aldea Marina con el sombrero en la mano y no quiso decir nada más.\n\nEl profesor Kukui, preguntado por la causa, se rió, se quitó la gorra y señaló hacia arriba: «Pregúntenle a quien la tenía. Yo solo sé que ya era hora. ¡Alola!».\n\n**EL TIEMPO:** sol. Por fin. Y mañana, también.' },
		ecob05gladio: { name: 'Carta de Gladio', pocket: 'key', desc: 'Un sobre blanco con el sello de la Fundación Æther tachado a mano y, debajo, un nombre escrito con letra pequeña y recta.',
			read: '{jugador}.\n\nTe dije que lo firmaba con mi nombre. Te escribo para que conste que lo sigo firmando.\n\nLa cápsula está en el Altar. No en el Paraíso: en el Altar, donde la isla la ve. Pita como un corazón dormido, siempre al mismo ritmo. Dos médicos se turnan día y noche. Le damos la luz gota a gota, como dijimos. Ni una gota más deprisa.\n\nNecrozma duerme. Respira mejor que el primer día. No sé si eso es lo que se dice de algo así, pero es lo que veo.\n\nLa kahuna sube cada mañana. No nos habla. Nos mira. Su Mudsdale también. Me parece bien: alguien tiene que mirar a Æther, y es mejor que sea alguien que no nos debe nada.\n\nLa muestra salió para Johto, para la farmacéutica. Lo que prometí, lo hice.\n\nEl cielo de Melemele está un tono más claro cada día. Poco. Pero cada día.\n\nNo hace falta que contestes. Solo quería que lo supieras por mí y no por otro.\n\n—Gladio' },
		ecob05leilani: { name: 'Carta de Leilani', pocket: 'key', desc: 'Una hoja de papel milimetrado con una huella de grasa en cada esquina, doblada en forma de avioncito. Alguien la desdobló y la volvió a doblar antes de mandarla.',
			read: '¡{jugador}!\n\nTe escribo a mano. A MANO. Soldi dice que es «un retroceso tecnológico de proporciones históricas». Le he dicho que se calle. No se ha callado.\n\nBueno. Te cuento.\n\nCada noche, antes de dormir, salgo al tejado del taller y apunto el Ride Gear al cielo. Corta, corta, corta, larga. «Estoy bien. Vuelve a dormir.» Ya sé que desde allí no se ve. O sí. No tengo ni idea. Pero se lo hago igual. Es lo que ella me hacía a mí desde el pasillo, así que ahora me toca.\n\nLos chicos del taller creen que estoy calibrando una antena. Les he dicho que sí. ¿Sí o qué? Un poco es verdad.\n\nNo te voy a dar las gracias en una carta, que queda cursi. Te las doy en persona y te pongo un chiste malo detrás para que no se note.\n\nAh, y Hela pasó por el taller. Se tomó un café, miró el Ride Gear un rato larguísimo y dijo «bien». Ya está. «Bien». Llevo dos días contenta.\n\nUn abrazo con grasa,\nLeilani\n\nP. D.: Soldi dice que te diga que «tu presencia en el taller se echa en falta en un porcentaje aceptable». Viniendo de él, es casi una declaración de amor.' },

		// ============================== B6 · CHAMOTA ==============================
		ecob06ineszorua: { name: 'Carta de Inés', pocket: 'key', desc: 'Un sobre de Correos de Teselia con matasellos de Pueblo Chamota, puesto con muchísimo cuidado. Lo ha franqueado la propia remitente.',
			read: '{jugador}:\n\nEs rarísimo escribir una carta en vez de repartirla. Llevo media hora con el sobre en la mano sin saber dónde ponerme.\n\nTe escribo por lo que te pedí: que me mandara postales. Ya sé que no puede escribir. Así que escríbeme tú por él. ¿Come? ¿Se porta bien? ¿Se ha convertido ya en algo que te haya dado un susto?\n\nSi un día ves a una niña de pelo azul que te hace señas desde una ventana, ya sabes lo que te dije: ve. No preguntes. Ve.\n\nAquí todo sigue igual, que en Chamota es la mejor noticia posible. Los dos trenes, el de la mañana y el de la tarde. Un catálogo de semillas, dos multas y una postal de alguien que está de vacaciones y quiere que se sepa.\n\nEn el andén hay un banco que da al norte. Me siento ahí a la hora del tren de la tarde. A él no le hace falta horario, pero por si acaso.\n\nInés Garza\n*Cartera de Pueblo Chamota*\n\nP. D.: Sigo llevando el cuaderno de cuando tenía ocho años. Ahora tiene una página más.' },
		ecob06inescampa: { name: 'Carta de Inés', pocket: 'key', desc: 'Un sobre de Correos de Teselia con matasellos de Pueblo Chamota. Dentro, además de la carta, un botón de nácar que no es de nadie.',
			read: '{jugador}:\n\nEs rarísimo escribir una carta en vez de repartirla. Llevo media hora con el sobre en la mano sin saber dónde ponerme.\n\nTe escribo para contarte cómo está el del campanario, que sé que lo preguntarías.\n\nSubo cada tarde, después del reparto. Le llevo bayas. El campanero le ha puesto un cuenco y un cojín, y ahora dice que el cojín es suyo, del campanero, y que se lo ha robado. Los dos saben que no es verdad.\n\nÉl me trae cosas. Una pinza. Un billete de tren de hace diez años. Una carta que no era para nadie. Esta semana, el botón que va dentro del sobre. Me ha parecido que era para ti. No me preguntes por qué. Bueno, sí: porque lo dejó encima de tu nombre, en mi libreta.\n\nDe la viga de arriba no baja nadie. Pero ya no se esconde.\n\nInés Garza\n*Cartera de Pueblo Chamota*\n\nP. D.: Es peor cartero que yo. Pero le pone más ganas.' },
		ecob06correo: { name: 'Correo de Porcelana', pocket: 'key', desc: 'Un ejemplar del *Correo de Porcelana*, abierto por la sección de Teselia interior. Alguien ha rodeado una columna con lápiz rojo.',
			read: '**CORREO DE PORCELANA** · Teselia interior\n\n**EL PUEBLO QUE CAMBIÓ DE HORA**\n\nEn Pueblo Chamota, al final de la línea de Mayólica, hay desde hace unos días una hoja pegada en tres puertas: la del ayuntamiento, la de la panadería y la de la estación. Es una crónica nueva del cronista de la villa, don Teodoro Albar, sobre la llamada Noche Blanca, hace treinta años.\n\nLa anterior, escrita por él mismo aquella madrugada, tenía un reloj. Esta tiene dos.\n\nNo vamos a contarla aquí: es del pueblo, y el pueblo ha decidido leerla en su sitio. Solo diremos que la panadería de la plaza ha tenido cola toda la semana, que los vecinos entran, compran pan y abrazan a la panadera por encima del mostrador, y que nadie en Chamota quiere decir por qué a un periodista de la capital.\n\nNos parece bien. Hay noticias que se cuentan mejor en voz baja.\n\n**CÓMO LLEGAR:** tren de Mayólica, dos al día. El de la tarde no espera.' },
	},

	scripts: {
		// B1 · Crómlech, rama «solo a Handsome»: pasa a verte disfrazado
		eco_b01_handsome_visita: [
			{ text: 'Alguien te ha dejado recado en el mostrador del Centro Pokémon. Cuando sales, hay un señor con gabardina, gafas de sol y un bigote rubio, mirando muy concentrado un expositor de imanes de nevera.' },
			{ say: 'handsome', as: 'Turista muy normal', text: 'No te gires. Soy un turista. Colecciono imanes. —Toma uno con forma de menhir y lo mira a contraluz—. Este no lo tenía.' },
			{ say: 'handsome', text: '…Soy Handsome. Ya lo sabías. —Se quita las gafas. Debajo tiene ojeras—. Venía a decirte una cosa, y Handsome las cosas importantes las dice en persona.' },
			{ say: 'handsome', text: 'Lo de Crómlech sigue entre tú y yo. Handsome tira del hilo despacito. Y el hilo sigue saliendo.' },
			{ say: 'handsome', text: 'Hay cosas que se saben mejor si nadie sabe que las sabes. Lo de Crómlech es una de ellas. Y es tuya: tú supiste callarte cuando era más fácil no hacerlo.' },
			{ choice: [
				{ text: '«¿Y el hilo adónde lleva?»', then: [
					{ say: 'handsome', text: 'Si lo supiera, ya no sería un hilo. Sería una cuerda. —Se rasca el bigote; se le despega por un lado—. Paciencia. Handsome tiene mucha. Bueno, tiene la justa.' },
				] },
				{ text: '«Ese bigote se te está cayendo.»', then: [
					{ say: 'handsome', text: 'Lo sé. Es parte del disfraz. Un turista de verdad no se pondría un bigote que se le cae. Por eso nadie sospecha. —Pausa—. Ese es el razonamiento de Matière. Yo no lo entiendo del todo.' },
				] },
			] },
			{ text: 'Paga el imán del menhir con monedas sueltas, se lo guarda en el bolsillo de la gabardina y se va calle abajo, despacio, mirando escaparates. A la tercera tienda ya no sabes cuál es.' },
		],
		// B6 · Final: Brock pasa a verte con la olla
		eco_b06_brock_visita: [
			{ text: 'Huele a guiso antes de que veas a nadie. Luego ves a Brock, con una olla envuelta en un trapo de cuadros y una mochila que no le cierra.' },
			{ say: 'brock', text: '¡{jugador}! Te he encontrado. Me lo dijo la enfermera Joy. Bueno, no me lo dijo: me miró de una manera que entendí que estabas aquí. —Carraspea—. Tiene una manera de mirar muy… informativa.' },
			{ say: 'brock', text: 'Te traigo el guiso de Porcelana. Ya tiene nombre oficial. Lo he apuntado en una servilleta, así que es oficial.' },
			{ say: 'brock', text: 'Y otra cosa. —Se pone serio, que en él dura poco pero se nota—. Me ganaste en Fayenza. Con todo lo que tenía. Hacía mucho que nadie me hacía sacar el último Pokémon del cinturón con ganas de verdad. Gracias por eso.' },
			{ if: 'flag.eco_b06_brock_bayas', then: [
				{ say: 'brock', text: 'Las bayas ya te las di la otra vez, ¿eh? Esta vez solo hay guiso. Y de postre no hay.' },
			], else: [
				{ say: 'brock', text: 'Para el equipo. —Te da una bolsita de tela—. Las de mi huerto de Fayenza. Bueno, del huerto de la vecina, que me deja una esquina.' },
				{ give: 'sitrusberry', n: 2 },
				{ set: { 'flag.eco_b06_brock_bayas': true } },
				{ say: 'brock', text: 'Y de postre no hay. —Sonríe—. Ya lo sabías.' },
			] },
			{ text: 'Se sientan en un escalón y comen directamente de la olla, con dos cucharas. Brock habla de recetas, de piedras y de una vecina que tiene una voz muy bonita. Luego se va, con la olla vacía y la mochila igual de abierta.' },
		],
	},

	mail: [
		// ---------- B1 · Crómlech ----------
		{ id: 'eco_b01_cromlech_prensa', kind: 'periodico', from: 'Diario de Luminalia', npc: 'alexia', title: 'Crómlech, una semana después',
			cond: 'flag.b01_fin && flag.b01_delatar', days: 2, item: 'ecob01diario' },
		{ id: 'eco_b01_cromlech_handsome', kind: 'visita', from: 'Un turista muy normal', npc: 'handsome', title: 'Alguien colecciona imanes',
			cond: 'flag.b01_fin && flag.b01_handsome', days: 3, script: 'eco_b01_handsome_visita' },
		{ id: 'eco_b01_cromlech_trato', kind: 'carta', from: 'S.', npc: 'sera', title: 'Una tarjeta sin membrete',
			cond: 'flag.b01_fin && ' + TRATO_VIGENTE, days: 3, item: 'ecob01sera' },

		// ---------- B2 · Lila en el gimnasio de Trigal ----------
		{ id: 'eco_b02_lila_protegida', kind: 'carta', from: 'Lila', npc: 'lila', title: 'A mi lado, no delante',
			cond: 'flag.b02_fin && flag.b02_lila_rocket_fin && flag.b02_lila_protegida', days: 2, item: 'ecob02lilaprot' },
		{ id: 'eco_b02_lila_sola', kind: 'carta', from: 'Lila', npc: 'lila', title: 'Lo hice yo',
			cond: 'flag.b02_fin && flag.b02_lila_rocket_fin && !flag.b02_lila_protegida', days: 2, item: 'ecob02lilasola' },

		// ---------- B3 · El rancho ----------
		{ id: 'eco_b03_rancho_sobrina', kind: 'carta', from: 'Adela Prado', npc: 'sobrina', title: 'La primera que llega',
			cond: 'flag.b03_fin && flag.b03_rancho_sobrina', days: 4, item: 'ecob03adela' },
		{ id: 'eco_b03_rancho_jugador', kind: 'carta', from: 'Adela Prado', npc: 'sobrina', title: 'Informe del rancho',
			cond: 'flag.b03_fin && flag.b03_rancho_jugador', days: 4, item: 'ecob03adelatuyo' },
		{ id: 'eco_b03_rancho_lemnis', kind: 'carta', from: 'Adela Prado', npc: 'sobrina', title: 'Los martes',
			cond: 'flag.b03_fin && flag.b03_rancho_lemnis', days: 4, item: 'ecob03adelafund' },
		// ---------- B3 · Los Rocket de Caoba ----------
		{ id: 'eco_b03_rocket_libres', kind: 'carta', from: 'Lance', npc: 'lance', title: 'Ninguna gorra',
			cond: 'flag.b03_fin && flag.b03_rocket_libres', days: 6, item: 'ecob03lance' },
		{ id: 'eco_b03_rocket_policia', kind: 'periodico', from: 'La Hoja de Caoba', title: 'Quince en un sótano',
			cond: 'flag.b03_fin && flag.b03_rocket_policia', days: 3, item: 'ecob03caoba' },

		// ---------- B4 · Lebrun ----------
		{ id: 'eco_b04_lebrun_detenido', kind: 'carta', from: 'Matière', npc: 'matiere', title: 'La silla vacía',
			cond: 'flag.b04_fin && flag.b04_lebrun_detenido', days: 3, item: 'ecob04matiere' },
		{ id: 'eco_b04_lebrun_cebo', kind: 'carta', from: 'Un turista', npc: 'handsome', title: 'Postal de Luminalia',
			cond: 'flag.b04_fin && flag.b04_lebrun_cebo', days: 3, item: 'ecob04cebo' },
		{ id: 'eco_b04_lebrun_libre', kind: 'carta', from: 'Handsome', npc: 'handsome', title: 'Once noches de papel',
			cond: 'flag.b04_fin && flag.b04_lebrun_libre', days: 5, item: 'ecob04libre' },

		// ---------- B5 · A quién devolviste la luz ----------
		{ id: 'eco_b05_luz_necrozma', kind: 'periodico', from: 'El Heraldo de Hauoli', npc: 'kukui', title: 'Volvió el atardecer',
			cond: 'flag.b05_fin && flag.b05_luz_necrozma', days: 2, item: 'ecob05heraldo' },
		{ id: 'eco_b05_luz_aether', kind: 'carta', from: 'Gladio', npc: 'gladio', title: 'Gota a gota',
			cond: 'flag.b05_fin && flag.b05_luz_aether', days: 4, item: 'ecob05gladio' },
		{ id: 'eco_b05_luz_leilani', kind: 'carta', from: 'Leilani', npc: 'leilani', title: 'Corta, corta, corta, larga',
			cond: 'flag.b05_fin && flag.b05_luz_leilani', days: 3, item: 'ecob05leilani' },

		// ---------- B6 · La Noche Blanca de Chamota ----------
		{ id: 'eco_b06_ines_zorua', kind: 'carta', from: 'Inés Garza', npc: 'ines', title: 'Postales para alguien con cola',
			cond: 'flag.b06_zorua', days: 5, item: 'ecob06ineszorua' },
		{ id: 'eco_b06_ines_campanario', kind: 'carta', from: 'Inés Garza', npc: 'ines', title: 'Noticias del campanario',
			cond: 'flag.b06_zorua_vive', days: 5, item: 'ecob06inescampa' },
		{ id: 'eco_b06_chamota_cronica', kind: 'periodico', from: 'Correo de Porcelana', npc: 'teodoro', title: 'El pueblo que cambió de hora',
			cond: 'flag.b06_chamota_cronica', days: 3, item: 'ecob06correo' },
		// ---------- B6 · Final del bloque ----------
		{ id: 'eco_b06_brock', kind: 'visita', from: 'Brock', npc: 'brock', title: 'Huele a guiso',
			cond: 'flag.b06_fin && badge("medalla_temblor")', days: 2, script: 'eco_b06_brock_visita' },
	],
};
