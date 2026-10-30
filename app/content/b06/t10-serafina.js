// Bloque 6 · T10 · Serafina: la reconciliación (regla de Mario, 2026-10-30: «si la riego con cualquier candidata,
// siempre tengo que poder arreglarlo»).
//
// Hasta aquí, con Sera solo había dos formas de «regarla» y ninguna se podía arreglar:
//   · TRATO ROTO  (`b01_trato_sera` y luego, en Iris, la pieza a Handsome o a Melia): Sera cierra el Holomisor
//                 («Canal cerrado por el titular») y en B4–B6 manda a un directivo en su lugar.
//   · CRÓMLECH    (`b01_delatar`): la humilló en público (valor − de candidatas.md §3). «Lo recuerdo siempre».
//
// El arreglo (todo nuevo; no toca ningún id publicado):
//   1. Diario (aviso discreto, sin cómo ni cuándo): al volver a Porcelana con Sera enfadada, una entrada de Rotom.
//   2. Torre Lemnis de Teselia (vestíbulo): un spot nuevo, «el cuaderno de visitas». Se le deja una nota.
//        · La verdad o una disculpa formal → `sera_nota_enviada` (+ `sera_nota_verdad` / `sera_nota_formal`).
//        · Una nota sentimental (valor −) → el guardia la devuelve con su opinión; se puede volver a escribir.
//   3. Buzón (`visita`, 2 días reales después): Sera en persona, a la puerta del Centro Pokémon donde estés.
//        Pregunta «¿por qué?». Hay que decirle la verdad (mentir da una segunda oportunidad, no un portazo).
//        Propone una «norma de etiqueta» (avisarse a la cara antes de no cumplir) → `sera_promesa`.
//        → `sera_reconciliada`, afinidad +3 a +7 según lo que digas. Con trato roto y Holomisor:
//          `sera_canal_abierto` (el Holomisor vuelve a funcionar) y `sera_tu` (vuelve a tutearte).
//          Sin Holomisor (Crómlech): `sera_tarjeta` (tarjeta con número a mano, para leer).
//
// CONDICIONES REUTILIZABLES (importables desde otros archivos: `import { SERA_EN_PAZ } from '../b06/t10-serafina.js'`):
//   SERA_ENFADO   hubo ruptura (trato roto o Crómlech en la prensa), esté arreglada o no.
//   SERA_EN_PAZ   «reconciliada»: no hubo ruptura, o la hubo y ya se arregló. Úsala para todo lo que exija buena
//                 relación con Sera (su negocio en Paldea, escenas a solas…).
//   SERA_TU       Sera tutea al jugador (trato cumplido, reconciliación tras trato roto, o etapa Cercana).
export const SERA_ROTO = 'flag.b01_trato_sera && !flag.b02_frag_sera';
export const SERA_ENFADO = '((' + SERA_ROTO + ') || flag.b01_delatar)';
export const SERA_EN_PAZ = '(flag.sera_reconciliada || !' + SERA_ENFADO + ')';
export const SERA_TU = '((flag.b01_trato_sera && flag.b02_frag_sera) || flag.sera_tu || af.sera >= 45)';

const RECEP = 'flag.b06_recepcion';
const DIARIO = 'flag.b01_diario';
const PENDIENTE = SERA_ENFADO + ' && !flag.sera_reconciliada';
const NOTA_ABIERTA = RECEP + ' && ' + PENDIENTE + ' && !flag.sera_nota_enviada';
const HOLO = SERA_ROTO + ' && has("holomisorsera")';
const OMITIDO = '\n\n*(Omitido: nada.)*';
const AVISO_HOLO = 'Hoy, ordenando la mochila, he encontrado al fondo el aparato plateado que nos dio la señorita Serafina. Sigue en gris, con su «Canal cerrado por el titular». Lo he puesto encima de todo, junto a las Pociones, por si acaso.\n\nYo de personas sé poco. Pero he visto que hay puertas que solo se abren desde dentro. Y que, a veces, se abren antes si alguien llama. Sin hacer ruido. Con buena letra.';
const AVISO_CROMLECH = 'Hoy hemos vuelto a ver la Torre Lemnis, con su lemniscata dando vueltas en lo alto. La señorita Serafina no ha vuelto a saludar a {jugador} desde lo de Crómlech. Ni un centímetro de cabeza.\n\nYo de personas sé poco. Pero he visto que hay puertas que solo se abren desde dentro. Y que, a veces, se abren antes si alguien llama. Sin hacer ruido. Con buena letra.';

export default {
	items: {
		sera_tarjeta: { name: 'Tarjeta de Serafina', pocket: 'key', desc: 'Cartulina gruesa, azul medianoche, con una lemniscata en relieve. Detrás, un número escrito a mano. Huele un poco a papel caro.',
			read: '**SERAFINA LEMNIS**\n\n*(Por delante, impreso: solo el nombre. Ni cargo, ni empresa, ni dirección.)*\n\n*(Por detrás, a pluma, con letra perfecta:)*\n\nEste número no es el de Lemnis. Es el mío.\n\nNo lo use para tonterías. Ni para dar los buenos días. Si algún día no va a cumplir algo que me ha dicho, úselo para decírmelo antes.\n\nYo haré lo mismo.\n\n—S.' },
	},

	// Spot nuevo en la Torre Lemnis de Teselia (lugar de T0, de este mismo bloque)
	extraSpots: {
		torre_lemnis_tes: [
			{ label: 'El cuaderno de visitas', sub: 'En el mostrador, con una pluma atada a una cadenita', icon: '🖋️', cond: NOTA_ABIERTA, new: 'true', talk: [{ script: 'sera_nota' }] },
		],
	},

	// Aviso del Diario al volver a Porcelana (una vez)
	patches: {
		porcelana: { onEnter: [{ script: 'sera_aviso_diario', cond: NOTA_ABIERTA + ' && !flag.sera_aviso_diario', once: true }] },
	},

	mail: [
		{ id: 'sera_visita', kind: 'visita', from: 'Serafina Lemnis', npc: 'sera', title: 'Una visita sin cita', cond: 'flag.sera_nota_enviada', days: 2, script: 'sera_reconciliacion' },
	],

	scripts: {
		// =================== 1. EL AVISO DEL DIARIO ===================
		sera_aviso_diario: [
			{ set: { 'flag.sera_aviso_diario': true } },
			{ if: DIARIO, then: [
				// Rotom solo (Eco purgado): frases cortas, a trompicones
				{ diary: 'Hoy he ordenado la mochila. Yo solo. Al fondo estaba el aparato plateado de la señorita Serafina. Gris. Frío.\n\nLo he puesto arriba del todo. No sé por qué. Por si acaso.\n\nHay puertas que se cierran por dentro. Creo que esas se abren llamando. Bajito.', cond: 'flag.b06_eco_purgado && flag.b01_trato_sera' },
				{ diary: 'Hoy hemos pasado por delante de la Torre Lemnis. Yo solo, escribiendo. La lemniscata gira y gira.\n\nLa señorita Serafina ya no nos mira. Desde Crómlech. {jugador} hace como que no le importa.\n\nHay puertas que se cierran por dentro. Creo que esas se abren llamando. Bajito.', cond: 'flag.b06_eco_purgado && flag.b01_delatar' },
				// Antes de la revelación, o con el Eco de doble agente (el reformado firma con su última línea)
				{ diary: AVISO_HOLO, cond: '!flag.b06_eco_purgado && !flag.b06_eco_reformado && flag.b01_trato_sera' },
				{ diary: AVISO_CROMLECH, cond: '!flag.b06_eco_purgado && !flag.b06_eco_reformado && flag.b01_delatar' },
				{ diary: AVISO_HOLO + OMITIDO, cond: 'flag.b06_eco_reformado && flag.b01_trato_sera' },
				{ diary: AVISO_CROMLECH + OMITIDO, cond: 'flag.b06_eco_reformado && flag.b01_delatar' },
			] },
		],

		// =================== 2. LA NOTA (vestíbulo de la Torre Lemnis) ===================
		sera_nota: [
			{ text: 'En el mostrador del vestíbulo hay un cuaderno de tapas azules, abierto por una página en blanco. La pluma está atada a una cadenita, como en los bancos. Al lado, un montón de tarjetas con la lemniscata en relieve.' },
			{ text: 'El guardia te ve mirar el cuaderno. Por primera vez, te mira a ti y no a la pared.' },
			{ text: '«Las visitas firman aquí. Las notas para la Dirección, en tarjeta. Suben con el correo de la tarde». Una pausa. «La señorita Lemnis las lee todas. No le prometo nada más».' },
			{ if: HOLO, then: [{ text: 'En tu bolsillo, el Holomisor sigue frío. En la pantalla, en gris: «Canal cerrado por el titular».' }] },
			{ prompt: '¿Le escribes algo a Serafina?', choice: [
				{ text: 'La verdad: lo que hiciste y por qué. Sin adornos.', then: [
					{ set: { 'flag.sera_nota_enviada': true, 'flag.sera_nota_verdad': true } },
					{ af: { sera: 1 } },
					{ if: SERA_ROTO, then: [
						{ text: 'Escribes cuatro líneas. Que en Iris teníais un trato y no lo cumpliste. Que no fue un despiste: lo decidiste tú. Que no le pides que lo entienda; solo que lo sepa por ti y no por un informe.' },
					], else: [
						{ text: 'Escribes cuatro líneas. Que en Crómlech contaste lo que viste porque creías que había que contarlo. Que no te arrepientes de eso. Que sí te arrepientes de que se enterara por el periódico y no por ti, a la cara.' },
					] },
					{ text: 'Doblas la tarjeta por la mitad. El guardia la mete en un sobre sin leerla, lo cierra y lo deja en una bandeja de plata que pone «Dirección».' },
					{ text: '«Correo de la tarde», dice. Y vuelve a mirar la pared.' },
				] },
				{ text: 'Una disculpa breve y formal, con tu mejor letra.', then: [
					{ set: { 'flag.sera_nota_enviada': true, 'flag.sera_nota_formal': true } },
					{ af: { sera: 1 } },
					{ text: '«Estimada señorita Lemnis:». Tres líneas correctas, sin tachones, con la firma debajo. Hasta el guardia parece aprobar el margen.' },
					{ text: 'La mete en un sobre, lo cierra y lo deja en una bandeja de plata que pone «Dirección». «Correo de la tarde». Y vuelve a mirar la pared.' },
				] },
				{ text: 'Algo bonito. Que la echas de menos. Con un corazón al final.', then: [
					{ af: { sera: -1 } },
					{ text: 'Escribes. Te quedas bastante satisfech{o|a|e} con el corazón.' },
					{ text: 'El guardia la mira antes de meterla en el sobre (el protocolo, dice). La lee. Te la devuelve, doblada, con dos dedos.' },
					{ text: '«Con todo el respeto. Llevo once años subiendo notas a esa planta. Las que llevan corazones bajan solas, y más deprisa». Señala la pluma con la barbilla. «Si quiere, pruebe otra vez. El cuaderno no se acaba».' },
				] },
				{ text: 'Mejor no. Hoy no.', then: [
					{ text: 'Dejas la pluma donde estaba. El guardia hace como que no ha visto nada. Se le da muy bien.' },
				] },
			] },
		],

		// =================== 3. LA VISITA (llega por el buzón) ===================
		sera_reconciliacion: [
			{ if: 'flag.sera_reconciliada', then: [
				{ text: 'Te acuerdas de aquella mañana a la puerta del Centro Pokémon: el coche negro, los guantes blancos, tu nota doblada entre dos dedos.' },
				{ text: '«Si algún día no va a cumplir algo, dígamelo antes. A la cara». La norma sigue en pie.' },
				{ end: true },
			] },
			{ text: 'A primera hora, la enfermera del Centro Pokémon te para en la puerta. «Le esperan fuera. Una señorita. Lleva diez minutos de pie y no ha querido sentarse».' },
			{ text: 'Junto a la acera hay un coche negro con el motor apagado. Apoyada en él, abrigo azul medianoche, guantes blancos, la melena negra sin un pelo fuera de sitio: **Serafina Lemnis**. Sostiene tu nota entre dos dedos, como quien sostiene una factura.' },
			{ say: 'sera', text: 'Buenos días, {jugador}. Las visitas sin cita son de mala educación. Considere esta la excepción que confirma la regla.' },
			{ if: 'flag.sera_nota_verdad', then: [
				{ say: 'sera', text: 'Cuatro líneas. Ninguna excusa. Ni un solo «es que». —Dobla la nota otra vez, con cuidado, por el mismo pliegue—. Hace mucho que nadie me escribe así. Normalmente me escriben abogados.' },
			], else: [
				{ say: 'sera', text: 'Su nota es impecable. Buen papel, buen margen, ninguna falta. Es exactamente la que habría escrito yo si me hubiera equivocado. —Pausa—. Por eso no me dice nada. Así que se lo pregunto yo.' },
			] },
			{ if: 'flag.b01_trato_sera && flag.b02_frag_handsome', then: [
				{ say: 'sera', text: 'En Iris teníamos un trato. Usted lo aceptó en Crómlech, sin que nadie le obligara. Y le dio la pieza a la Policía Internacional. —No levanta la voz. No le hace falta—. ¿Por qué?' },
			] },
			{ if: 'flag.b01_trato_sera && flag.b02_frag_melia', then: [
				{ say: 'sera', text: 'En Iris teníamos un trato. Usted lo aceptó en Crómlech, sin que nadie le obligara. Y dejó que destruyeran la pieza delante de usted, con un lanzallamas, que es la forma menos elegante de destruir algo. —No levanta la voz. No le hace falta—. ¿Por qué?' },
			] },
			{ if: SERA_ROTO + ' && !flag.b02_frag_handsome && !flag.b02_frag_melia', then: [
				{ say: 'sera', text: 'En Iris teníamos un trato. No se cumplió. —No levanta la voz. No le hace falta—. ¿Por qué?' },
			] },
			{ if: 'flag.b01_delatar', then: [
				{ if: 'flag.b02_frag_sera', then: [{ say: 'sera', text: 'En Iris me devolvió la pieza. Eso consta, y consta bien. Lo de Crómlech también consta.' }] },
				{ say: 'sera', text: 'En Crómlech le ofrecí hablar. Usted prefirió que habláramos a través de tres páginas de periódico. Me enteré de su opinión con el desayuno, como todo Kalos. —Se ajusta un guante—. ¿Por qué?' },
			] },
			{ prompt: 'Serafina espera. No mira el reloj.', choice: [
				{ text: '«Porque creí que era lo correcto. Y lo volvería a hacer.»', then: [{ call: 'sera_recon_correcto' }] },
				{ text: '«Porque no me fiaba de Lemnis. De ti, sí.»', cond: SERA_ROTO, then: [{ call: 'sera_recon_lemnis' }] },
				{ text: '«Porque no me fiaba de Lemnis. De usted no lo sabía.»', cond: '!(' + SERA_ROTO + ')', then: [{ call: 'sera_recon_lemnis' }] },
				{ text: '«Me equivoqué en cómo lo hice. Tenía que habértelo dicho antes, a la cara.»', cond: SERA_ROTO, then: [{ call: 'sera_recon_cara' }] },
				{ text: '«Me equivoqué en cómo lo hice. Tenía que habérselo dicho antes, a la cara.»', cond: '!(' + SERA_ROTO + ')', then: [{ call: 'sera_recon_cara' }] },
				{ text: '«No tuve opción. Me obligaron.»', then: [
					{ af: { sera: -1 } },
					{ say: 'sera', text: 'No. —Sin levantar la voz, sin moverse del coche—. Nadie le obligó. Yo estaba al otro lado. Recuerdo su voz. Era la de alguien que había decidido.' },
					{ say: 'sera', text: 'Le daré otra oportunidad, porque ha venido usted con buena letra y yo con el motor apagado. La verdad, por favor. Me la puede decir. No muerdo. —Pausa—. Solo en los consejos de administración.' },
					{ prompt: 'Esta vez, la verdad.', choice: [
						{ text: '«Porque creí que era lo correcto. Y lo volvería a hacer.»', then: [{ call: 'sera_recon_correcto' }] },
						{ text: '«Porque no me fiaba de Lemnis.»', then: [{ call: 'sera_recon_lemnis' }] },
						{ text: '«Me equivoqué en cómo lo hice. Debí decirlo antes, a la cara.»', then: [{ call: 'sera_recon_cara' }] },
					] },
				] },
			] },
			// ----- La norma de etiqueta -----
			{ say: 'sera', text: 'Le propongo algo. No un trato: ya sabemos los dos cómo acaban mis tratos con usted. Una norma de etiqueta.' },
			{ say: 'sera', text: 'Si algún día no va a cumplir algo que me ha dicho, me lo dice antes. A la cara. Sin informes, sin periódicos, sin terceros. Y yo haré lo mismo con usted.' },
			{ choice: [
				{ text: '«De acuerdo. A la cara.»', then: [
					{ af: { sera: 1 } },
					{ say: 'sera', text: 'A la cara. —Te tiende la mano. Con el guante puesto, pero te la tiende—. Las normas de etiqueta, a diferencia de los contratos, no tienen letra pequeña. Por eso casi nadie las cumple.' },
				] },
				{ text: '«No prometo lo que no sé si podré cumplir. Pero lo intentaré.»', then: [
					{ af: { sera: 2 } },
					{ say: 'sera', text: '…Eso, curiosamente, es lo más parecido a una promesa que me han hecho en años. —Te tiende la mano. Con el guante puesto, pero te la tiende—. Lo acepto. Con su letra pequeña y todo.' },
				] },
			] },
			{ set: { 'flag.sera_promesa': true } },
			// ----- El canal (trato roto) o la tarjeta (Crómlech) -----
			{ if: HOLO, then: [
				{ text: 'Saca del abrigo un mando diminuto y lo pulsa sin mirarlo. En tu bolsillo, el Holomisor vibra una vez. La pantalla, gris desde Iris, se enciende: «**Canal abierto por el titular**».' },
				{ say: 'sera', text: 'No lo uses para tonterías. Ni para dar los buenos días. —Se da cuenta del «tú» medio segundo tarde. Esta vez no lo corrige—. Bueno. Los buenos días, quizá.' },
				{ set: { 'flag.sera_canal_abierto': true, 'flag.sera_tu': true } },
			], else: [
				{ if: SERA_ROTO, then: [
					{ say: 'sera', text: 'El Holomisor ya no lo llevas encima. —No es una pregunta. Saca una tarjeta azul medianoche y te la da con dos dedos—. Esto pesa menos y se pierde peor.' },
					{ text: 'Se da cuenta del «tú» medio segundo tarde. Esta vez no lo corrige.' },
					{ set: { 'flag.sera_tu': true } },
				], else: [
					{ text: 'Saca del abrigo una tarjeta azul medianoche y te la da con dos dedos, como quien entrega un documento importante.' },
					{ say: 'sera', text: 'Por detrás hay un número. No es el de Lemnis. No se lo enseñe a su amiga la periodista. —Una pausa mínima—. O sí. Que vea que también sé escribir a mano.' },
				] },
				{ give: 'sera_tarjeta' },
			] },
			{ say: 'sera', text: 'Tengo un avión dentro de cuarenta minutos y un consejo de administración que aún no sabe que voy a llegar tarde. Me hace ilusión decírselo.', cond: '!flag.sera_tu' },
			{ say: 'sera', text: 'Tengo un avión dentro de cuarenta minutos y un consejo de administración que aún no sabe que voy a llegar tarde. Me hace ilusión decírselo. —Abre la puerta del coche—. Cuídate, {jugador}.', cond: 'flag.sera_tu' },
			{ text: 'El coche negro arranca sin ruido y se pierde al final de la calle. En la acera, donde estaba apoyada, no ha quedado ni una arruga.' },
			{ set: { 'flag.sera_reconciliada': true } },
			{ intel: { npc: 'sera', text: 'Vino a verte en persona por tu nota. Le dijiste la verdad. Habéis quedado en una «norma de etiqueta»: si alguno no va a cumplir algo, se lo dice antes al otro, a la cara.' } },
			{ if: DIARIO, then: [
				{ diary: 'Hoy ha venido a vernos la señorita Serafina. Yo solo, escribiendo. Coche negro. Guantes.\n\nHablaron poco. Se dieron la mano. Con guante, pero se la dieron.\n\nEl aparato plateado ya no está gris. Lo he dejado arriba. Por si llama.', cond: 'flag.b06_eco_purgado && flag.sera_canal_abierto' },
				{ diary: 'Hoy ha venido a vernos la señorita Serafina. Yo solo, escribiendo. Coche negro. Guantes.\n\nHablaron poco. Se dieron la mano. Con guante, pero se la dieron. Le dio una tarjeta a {jugador}. Azul. Huele a caro.', cond: 'flag.b06_eco_purgado && !flag.sera_canal_abierto' },
				{ diary: 'Hoy, a primera hora, ha venido a vernos la señorita Serafina. ¡En persona! Con un coche negro que no hacía ruido y sin cita, que según ella es de mala educación.\n\nHablaron un rato en la acera. Yo no apunto lo que se dijeron: eso es de ellos. Solo apunto que, al final, se dieron la mano. Con guante. Pero se la dieron.\n\nY el aparato plateado de la mochila ya no está en gris.', cond: '!flag.b06_eco_purgado && flag.sera_canal_abierto' },
				{ diary: 'Hoy, a primera hora, ha venido a vernos la señorita Serafina. ¡En persona! Con un coche negro que no hacía ruido y sin cita, que según ella es de mala educación.\n\nHablaron un rato en la acera. Yo no apunto lo que se dijeron: eso es de ellos. Solo apunto que, al final, se dieron la mano. Con guante. Pero se la dieron. Y que le dio a {jugador} una tarjeta que huele a papel caro.', cond: '!flag.b06_eco_purgado && !flag.sera_canal_abierto' },
			] },
		],
		sera_recon_correcto: [
			{ af: { sera: 3 } },
			{ say: 'sera', text: '«Lo volvería a hacer». —Lo repite despacio, como quien prueba un vino que no ha pedido—. Es lo más incómodo que me han dicho este año. Y lo único que me creo.' },
			{ say: 'sera', text: 'La gente suele pedirme perdón para que se me olvide. Usted no me pide que se me olvide. Bien. No se me iba a olvidar.' },
		],
		sera_recon_lemnis: [
			{ af: { sera: 3 } },
			{ if: SERA_ROTO, then: [
				{ say: 'sera', text: 'Una distinción. —Algo se mueve en su cara, muy poco—. Yo la hago todos los días, en el ascensor, entre la planta veintinueve y la treinta. Me sorprende que la haga usted. No me sorprende que la haga bien.' },
			], else: [
				{ say: 'sera', text: '«De usted no lo sabía». —Casi sonríe—. Honesto. Yo tampoco lo sabía de usted. Ahora los dos sabemos un poco más. Es un comienzo poco elegante, pero es un comienzo.' },
			] },
		],
		sera_recon_cara: [
			{ af: { sera: 2 } },
			{ say: 'sera', text: 'A la cara. —Asiente una vez, exacta—. No me ofende que me lleven la contraria, {jugador}. Me ofende enterarme la última. Es una cuestión de modales, no de opiniones.' },
		],
	},
};
