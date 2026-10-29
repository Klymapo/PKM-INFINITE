// Radio Lavanda · «la voz del este» (AM 1220). Pedido de Mario, 2026-10-28.
// Piezas del programa diario (docs/CONTENIDO.md §14). Locutora: Maripaz, la de la Torre Radio de Lavanda (b04_locutora).
// Solo comentan lo que el jugador ya vivió (B1–B5 y comunidad/). Sin cond: clima general, consejos y música.
// Flags leídos: ver secreto/registro.md, «Radio Lavanda (2026-10-28)».

export default {
	radio: [
		// =================== CLIMA ===================
		{ id: 'rl_clima_dia', kind: 'clima',
			text: 'Buenos días, Kanto del este. Les habla Maripaz desde Radio Lavanda. Cielo despejado en la Ruta 8 y algo de niebla en el valle, que aquí es como decir que el pueblo amaneció despeinado. Si salen hacia Azafrán, lleven chamarra: el viento de la tarde no perdona.' },
		{ id: 'rl_clima_noche', kind: 'clima', cond: 'night',
			text: 'Ya es tarde y aquí sigue Maripaz. Fresco en Lavanda, luna a medias y ni un Zubat en la antena, cosa rara. A las doce empieza «Lo que se oye cuando no suena nada». Si oyen algo, llamen. Si les contesta alguien, cuelguen.' },
		{ id: 'rl_clima_muertos', kind: 'clima', cond: 'date("10-24","11-02")',
			text: 'Pronóstico de temporada: frío por las noches, olor a cempasúchil y velas en la Casa de Almas. Los vecinos de la vieja torre piden, como cada año, que bajemos la música. Este año les hacemos caso. Un poquito. Abríguense y visiten a los suyos.' },

		// =================== CONSEJOS ===================
		{ id: 'rl_consejo_centro', kind: 'consejo',
			text: 'Consejo de la casa: antes de retar a alguien con nombre y apellido, pasen por el Centro Pokémon. Nadie les da puntos por llegar con el equipo a medias. Bueno, mi tía sí, pero mi tía también aplaude cuando aterriza el avión.' },
		{ id: 'rl_consejo_tipos', kind: 'consejo',
			text: 'Un oyente de Celeste pregunta qué hacer contra el Agua. Planta o Eléctrico, corazón. Y Tierra contra Eléctrico, Fuego contra Planta y paciencia contra todo lo demás. La tabla de tipos no muerde. La de multiplicar, sí.' },
		{ id: 'rl_consejo_amistad', kind: 'consejo',
			text: 'Dicen los criadores que un Pokémon se encariña con lo que comparte: caminatas, comidas, sustos. No lo tengan siempre guardado; sáquenlo a pasear, aunque sea a la tienda. Les juro que el Chansey de mi vecina evolucionó de tanto ir por el pan.' },
		{ id: 'rl_consejo_pc', kind: 'consejo',
			text: 'Recordatorio de servicio: los Pokémon que dejan en el PC no se aburren, pero tampoco aprenden nada. Si tienen uno guardado desde hace meses, denle una vuelta. A veces el que estaba en la caja era justo el que les faltaba.' },
		{ id: 'rl_consejo_ocho', kind: 'consejo', cond: 'badges >= 8',
			text: 'Para los que ya traen las ocho medallas: felicidades, ya nadie les va a regalar un combate. Los rivales de ahora estudian. Revisen movimientos, prueben objetos equipados y no saquen siempre primero a su as: si lo conocen, lo esperan.' },

		// =================== MÚSICA ===================
		{ id: 'rl_musica_torretas', kind: 'musica',
			text: 'Y ahora, desde Azulona, Las Torretas con «Todavía viva». Una canción alegrísima de alguien a quien le salió todo mal y lo cuenta como si le hubieran prometido un pastel. Escúchenla dos veces: la segunda da otra cosa.' },
		{ id: 'rl_musica_mambo', kind: 'musica',
			text: 'Para despertar: «Mambo del Mudbray», de la Orquesta Tropical de Akala. Trompetas, tumbadoras y un señor que grita los nombres de sus Pokémon a mitad de la canción. Si tienen un Tauros cerca, súbanle con cuidado.' },
		{ id: 'rl_musica_balada', kind: 'musica',
			text: '«Lo que el viento esquila», de Celia y los Ponientes. Una balada de ranchero para los que extrañan el campo desde la ciudad. Dura seis minutos. Yo lloro en el minuto cuatro. Ustedes hagan lo que quieran.' },
		{ id: 'rl_musica_noche', kind: 'musica', cond: 'night',
			text: 'Para manejar de madrugada: «Ruta 8, kilómetro nada», de Los Insomnes de Azafrán. Bajo, batería y una guitarra que suena como un tren que no termina de llegar. Si van por la carretera, ojos abiertos. Si van a dormir, ya se tardaron.' },

		// =================== DEDICATORIAS ===================
		{ id: 'rl_ded_adela', kind: 'dedicatoria', from: 'Adela Prado', cond: 'flag.b03_rancho_sobrina || flag.b03_rancho_jugador',
			text: 'Postal de la Ruta 42, letra apretada: «Para {jugador}. Las Mareep, bien. El pienso, pagado. No pido canción, que no sé de canciones. Pongan algo que se pueda escuchar esquilando. —A.» Adela, le pongo la más larga que tengo.' },
		{ id: 'rl_ded_hector', kind: 'dedicatoria', from: 'Héctor Batista', cond: 'flag.p7_hector',
			text: 'Héctor, desde el Castillo Caduco: «Para {jugador}, que me dejó trabajar de lo que no es mi trabajo. El héroe no es el traje. Pero el traje ayuda». Y debajo, en mayúsculas: «¡TRANSFORMACIÓN!». Héctor, eso no se dedica. Pero va.' },
		{ id: 'rl_ded_simon', kind: 'dedicatoria', from: 'Simón', cond: 'flag.p7_simon',
			text: 'Simón, el escéptico, dedica la siguiente al Conde de Caduco «por la cena que no acepté. Otra vez». Y añade: «Que conste en antena que el frío del pasillo es una corriente de aire». Consta, Simón. Consta.' },
		{ id: 'rl_ded_conde', kind: 'dedicatoria', from: 'el Conde de Caduco', cond: 'flag.b01_conde_1',
			text: 'Sobre negro, lacre rojo: «Para quien cruzó mi puerta y dejó un poco de la felicidad que traía. La niebla sigue en su sitio y yo sigo sin dormir. Pongan algo de órgano. Con dignidad». No tenemos órgano, señor Conde. Va un acordeón.' },
		{ id: 'rl_ded_dolores', kind: 'dedicatoria', from: 'Dolores', cond: 'flag.p7_dolores_1',
			text: 'Dolores, la de los muñecos, aquí en Lavanda: «Para las tumbas que no tienen visita. Y para {jugador}, que le hizo el favor a Remiendo». Dolores, va con todo el cariño. Bajito, que hay quien descansa.' },
		{ id: 'rl_ded_lola', kind: 'dedicatoria', from: 'Lola', cond: 'flag.lola_3',
			text: 'Esta mañana un niño dejó en la cabina una bolsa de bollos al vapor y una nota: «Lola no manda dedicatorias. Los bollos son para el turno de noche. Fiado no». Gracias, Lola. No ponemos canción, que es lo que tú pedirías.' },
		{ id: 'rl_ded_gaspar', kind: 'dedicatoria', from: 'Gaspar Rocafort', cond: 'flag.b05_shoku_hecho',
			text: 'Desde Alola, Gaspar Rocafort, cocinero: «Para Lulú, capitana de Akala. La revancha sigue en pie, y la pimienta del Wela también. Comer bien es la mitad de la aventura». Gaspar, aquí comemos bollos y sale más barato. Pero va.' },

		// =================== NOTICIAS · Kalos (B1: Crómlech) ===================
		{ id: 'rl_cromlech_alexia', kind: 'noticia', cond: 'flag.b01_delatar',
			text: 'Titulares de Kalos: el *Diario de Luminalia* sigue con lo de Crómlech, máquinas entre las piedras y una empresa que no quiere fotos. Firma Alexia. La foto de portada sale movida: dicen que la persona retratada no se estaba quieta.' },
		{ id: 'rl_cromlech_imanes', kind: 'noticia', cond: 'flag.b01_handsome',
			text: 'Sección «noticias que no son noticia»: en Crómlech, Kalos, las piedras siguen en su sitio, la Policía Internacional no comenta y la tienda de recuerdos dice que un turista de gabardina se pasó una hora mirando el catálogo de imanes. No compró ninguno.' },
		{ id: 'rl_cromlech_silencio', kind: 'noticia', cond: 'flag.b01_trato_sera',
			text: 'De Kalos: ni una línea sobre Crómlech en ningún periódico. Ni una. Alexia, la del *Diario de Luminalia*, escribe en su columna que, en Kalos, el silencio también es una noticia. Nosotros solo leemos. Ustedes saquen sus cuentas.' },

		// =================== NOTICIAS · Johto (B2: la Torre Quemada) ===================
		{ id: 'rl_frag_handsome', kind: 'noticia', cond: 'flag.b02_frag_handsome',
			text: 'Llama un sabio de la Torre Quemada, en Iris: alguien les tomó prestada una túnica dos tallas pequeña y la devolvió estirada y oliendo a gabardina. El que la llevaba salió muy despacio, con algo en las dos manos, como quien carga un huevo.' },
		{ id: 'rl_frag_sera', kind: 'noticia', cond: 'flag.b02_frag_sera',
			text: 'Más de Iris: los vecinos de la Torre Quemada vieron salir del sótano a dos señores de traje azul con guantes y una caja pequeña. No saludaron. «Ni a los Rattata», dice la vecina, «y aquí a los Rattata se les saluda».' },
		{ id: 'rl_frag_melia', kind: 'noticia', cond: 'flag.b02_frag_melia',
			text: 'Lo raro de la semana, desde Iris: los sabios de la Torre Quemada juran que el sótano olió a metal fundido una noche entera. Revisaron los fogones, los cables y al sabio más viejo. Nada. «La torre tiene esas cosas», dicen. Tiene muchas.' },

		// =================== NOTICIAS · Johto (B3: el rancho y Caoba) ===================
		{ id: 'rl_rancho_adela', kind: 'noticia', cond: 'flag.b03_rancho_sobrina',
			text: 'Noticias del campo: en la Ruta 42, el Rancho Prado vuelve a vender leche y la veterinaria ahora atiende en el mismo establo. Adela Prado dice que sale justo, pero sale. Si pasan por Johto, cómprenle. Y no le pregunten por el tejado.' },
		{ id: 'rl_rancho_tuyo', kind: 'noticia', cond: 'flag.b03_rancho_jugador',
			text: 'Del campo de Johto: el Rancho Prado tiene dueñ{o|a|e} nuev{o|a|e} y, según los vecinos, nunca está. «Paga el pienso, eso sí», dice la encargada. «Y cuando viene, esquila. Mal, pero esquila». Ánimo, {jugador}. Así empezamos todos.' },
		{ id: 'rl_rancho_placa', kind: 'noticia', cond: 'flag.b03_rancho_lemnis',
			text: 'Del campo: la Fundación Raíces de Johto suma otro rancho familiar, el Rancho Prado de la Ruta 42. Placa azul en la cerca y deudas saldadas. La encargada, Adela Prado, solo pidió una cosa: que no toquen la casa, ni la mecedora, ni el cartel.' },
		{ id: 'rl_caoba_redada', kind: 'noticia', cond: 'flag.b03_rocket_policia',
			text: 'Hemeroteca de Johto: ¿se acuerdan de la redada bajo la tienda de recuerdos de Caoba? Catorce detenidos y un jefe de traje. Según el parte, el agente al mando repartió bocadillos. El parte no dice de qué. Aquí apostamos por jamón.' },
		{ id: 'rl_caoba_arroz', kind: 'noticia', cond: 'flag.b03_rocket_libres',
			text: 'Llamada de la Ruta 37, en Johto: una señora quiere que se sepa que su hijo volvió a casa, que ahora trabaja de día y que la gorra la tiene doblada en un cajón. «Yo siempre guardo arroz», dice. Señora, guárdenos un plato.' },
		{ id: 'rl_caoba_humo', kind: 'noticia', cond: 'flag.b03_rocket_quemar',
			text: 'En Pueblo Caoba, la tienda de recuerdos del lago reabre recién pintada. Los vecinos cuentan que una tarde olió a humo, a gasolina y, juran, a limón. La policía no encontró nada. Ni a nadie.' },
		{ id: 'rl_renata_episodio', kind: 'noticia', cond: 'flag.b03_renata_publica',
			text: 'Por petición de la audiencia, *Casos Fríos* repite «El despacho tapiado», el del ingeniero de Trigal que no firmó. Si no lo han oído, óiganlo. Si ya lo oyeron, revisen sus tazas. Ustedes me entienden.' },

		// =================== NOTICIAS · Kanto (B4) ===================
		{ id: 'rl_silph_presidente', kind: 'noticia', cond: 'flag.b04_presidente_habla',
			text: 'De Azafrán: el presidente de Silph habló por fin con la prensa. Contó que vendió una planta de su edificio y que se arrepiente. Setenta y un años y aprendiendo a decir «me equivoqué» en voz alta. Hay quien no aprende nunca.' },
		{ id: 'rl_lebrun_detenido', kind: 'noticia', cond: 'flag.b04_lebrun_detenido',
			text: 'De Kalos: la Policía Internacional confirma la detención de un inspector de su delegación en Luminalia. El mando provisional, para un agente famoso por sus disfraces malos. Dicen en el cuerpo que la oficina ya huele a macarons quemados.' },
		{ id: 'rl_lebrun_cebo', kind: 'noticia', cond: 'flag.b04_lebrun_cebo',
			text: 'Noticias que no son noticia, edición Kalos: en la delegación de la Policía Internacional, todo en orden. El inspector de siempre en su mesa, sus informes por triplicado, a su hora. Ni una novedad. Ninguna. Ahí lo dejamos.' },
		{ id: 'rl_lebrun_libre', kind: 'noticia', cond: 'flag.b04_lebrun_libre',
			text: 'De Kalos: un inspector veterano de la Policía Internacional deja su puesto «por motivos personales». Su mesa amaneció recogida y ordenada, como siempre. Solo faltaba él. Nadie del cuerpo quiso decir adónde se fue.' },
		{ id: 'rl_canal_00', kind: 'noticia', cond: 'flag.cg_red_encendido',
			text: 'Aviso para el vecindario: la radio de la Colina del Repetidor vuelve a tener guardia. Si oyen pulsos raros por el canal 00, no es interferencia: es la Red. Y si algún día necesitan ayuda y no tienen número, ese canal también es suyo.' },

		// =================== NOTICIAS · Alola (B5) ===================
		{ id: 'rl_luz_golpe', kind: 'noticia', cond: 'flag.b05_luz_necrozma',
			text: 'Nos escriben oyentes de vacaciones en Alola: el cielo, que llevaba semanas apagándose, volvió de golpe una tarde, «como cuando prenden la luz del cuarto». Dicen que los atardeceres de allá están de concierto. Nosotros, de envidia.' },
		{ id: 'rl_luz_gotas', kind: 'noticia', cond: 'flag.b05_luz_aether',
			text: 'Noticias de Alola: el cielo se aclara poco a poco. «Días», dice la Fundación Æther, que lleva el asunto y lo firma con nombre y apellido. En Hauoli cuentan los atardeceres: ayer, un gris menos gris. Hoy, casi naranja.' },
		{ id: 'rl_luz_pitidos', kind: 'noticia', cond: 'flag.b05_luz_leilani',
			text: 'Una oyente de Akala manda un mensaje cortito: tres pitidos cortos y uno largo. Sin firma. Pide que lo pongamos tal cual, que quien tenga que entenderlo lo va a entender. Ahí va: pi, pi, pi, piii. Que esté bien quien lo escuche.' },
		{ id: 'rl_bastien_solapa', kind: 'noticia', cond: 'flag.b05_bastien_rompe',
			text: 'Mundo Circuito: el novato kalosiano Bastien Lacroix ya compite sin la chaqueta de su patrocinador. En la solapa, solo una insignia de hojalata. Su Greninja, como siempre, más tranquilo que él. Los abogados de alguien, dicen, hacen horas extra.' },
		{ id: 'rl_bastien_chaqueta', kind: 'noticia', cond: 'flag.b05_bastien_sigue',
			text: 'Mundo Circuito: Bastien Lacroix, el novato de Kalos, sigue con la chaqueta azul de su patrocinador. En las fotos de esta semana sale serio, muy derecho y con los ojos bien abiertos. Como quien lo apunta todo.' },
		{ id: 'rl_gira_teselia', kind: 'noticia', cond: 'flag.b05_fin',
			text: 'Última hora de la Gira Interregional: el siguiente destino es Teselia. Rascacielos, puentes y una región que no duerme. Suerte a los aspirantes. Allá el invierno muerde, así que lleven bufanda. Y a quien vuelva por aquí: el pan de Lavanda los espera.' },
	],
};
