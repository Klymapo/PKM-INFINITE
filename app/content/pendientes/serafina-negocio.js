// PENDIENTE (2026-10-30) · NO LO IMPORTA NADIE TODAVÍA. Negocio de Serafina en Paldea (pedido de Mario).
//
// Paldea aún no existe en el contenido publicado (es el Acto VIII, biblia §5). No se pueden inventar ahora su región
// ni sus lugares, así que el negocio está completo aquí y se conecta cuando se escriba el bloque de Paldea:
//   1. BASE: sustituir por el id real del lugar de la base de Serafina en Paldea (su despacho / la torre de Lemnis en
//      Paldea, candidatas.md §3). Debe ser un lugar visitable con entrada visible (CLAUDE.md, «Sub-lugares»).
//   2. LLEGADA_PALDEA: sustituir por el flag real de llegada a Paldea (el que ponga el guion de llegada del bloque).
//   3. Importar este archivo en el index.js del bloque de Paldea y añadirlo a `parts`. Las `patches` ponen los dos
//      spots en BASE (si BASE es un lugar del MISMO bloque, pásalos a `extraSpots`).
//   4. Pasar validar.mjs, negocios-test.mjs y tester.mjs. Revisar que el texto de las mejoras no adelante nada del Acto
//      VIII (están escritos sin nombrar la Academia, Zona Cero ni nada de la trama).
//
// Solo aparece si el jugador está «en paz» con Sera (SERA_EN_PAZ, definida en b06/t10-serafina.js: nunca hubo
// ruptura, o la hubo y se reconcilió) y ya ha llegado a Paldea.
//   sera_despacho   «Despacho S.» · socia: Serafina. Entrada ₽45 000 + mejoras ₽445 000 (más caro que la media a
//                   propósito: «así solo entra quien va en serio»). Parte 30 % (+15 con «Socio de pleno derecho»).
//   Líneas:         comisiones (dinero) · objetos de valor (Pepitas, Perlas, Polvo Estelar…) · favores (bloqueada:
//                   objetos difíciles a fracción baja: Caramelo Raro, PP Máximos, Huevo Suerte, Piedra Alba…).
//   Encargados:     Serafina (siempre) · el asistente de la Gira (`agente_lemnis`, si la conociste en Trigal) ·
//                   el directivo de Lemnis (`directivo_lemnis`, solo lo conoce quien rompió el trato).
//   Voz:            de usted; pasa al tú con SERA_TU (trato cumplido, reconciliación tras trato roto o af ≥ 45).
import { SERA_EN_PAZ, SERA_TU } from '../b06/t10-serafina.js';

const BASE = 'base_sera_paldea';            // PENDIENTE: id real del lugar
const LLEGADA_PALDEA = 'flag.paldea_llegada'; // PENDIENTE: flag real de llegada a Paldea
const V = 'sera_despacho';
const SOCIO = 'partner("' + V + '")';
const USTED = '!' + SERA_TU;
const OFERTA = SERA_EN_PAZ + ' && ' + LLEGADA_PALDEA + ' && !flag.sera_neg_oferta && !' + SOCIO;
const ROTO_CONOCIDO = 'flag.b01_trato_sera && !flag.b02_frag_sera'; // quien vio al directivo en B4–B6

export default {
	patches: {
		[BASE]: { spots: [
			{ label: 'Serafina, en su despacho', sub: 'Escribe a pluma. No levanta la vista hasta acabar la frase', icon: '🖋️', cond: OFERTA, new: 'true', talk: [{ script: 'sera_neg_oferta' }] },
			{ label: 'Despacho S.', sub: 'Una puerta sin cartel. Solo una inicial', icon: '🖋️', cond: '(flag.sera_neg_oferta && ' + SERA_EN_PAZ + ') || ' + SOCIO, action: { venture: V } },
		] },
	},

	scripts: {
		// ---------- La oferta ----------
		sera_neg_oferta: [
			{ set: { 'flag.sera_neg_oferta': true } },
			{ text: 'Un despacho blanco, una mesa sin un solo papel fuera de sitio y una ventana enorme. Serafina termina la frase que estaba escribiendo, pone el punto, tapa la pluma y solo entonces te mira.' },
			{ if: SERA_TU, then: [
				{ say: 'sera', text: 'Has venido. Bien. Siéntate; esa silla es la buena. La otra es para los que vienen a pedirme algo.' },
				{ say: 'sera', text: 'Tengo un despacho propio. No de Lemnis: mío. Abro puertas, tasamos lo que la gente no sabe lo que vale y cobro favores que me deben desde hace años. Me falta un socio que no trabaje para nadie que yo conozca.' },
				{ say: 'sera', text: 'La entrada es cara. Es a propósito: así solo entra quien va en serio. Piénsatelo. Pero no tardes; detesto esperar casi tanto como detesto que me hagan esperar.' },
			], else: [
				{ say: 'sera', text: 'Buenas tardes, {jugador}. Siéntese; esa silla es la buena. La otra es para los que vienen a pedirme algo.' },
				{ say: 'sera', text: 'Tengo un despacho propio. No de Lemnis: mío. Abro puertas, tasamos lo que la gente no sabe lo que vale y cobro favores que me deben desde hace años. Me falta un socio que no trabaje para nadie que yo conozca.' },
				{ say: 'sera', text: 'La entrada es cara. Es a propósito: así solo entra quien va en serio. Piénseselo. Sin prisa, pero sin pausa: es la única expresión vulgar que me permito.' },
			] },
			{ toast: 'Nuevo negocio disponible: Despacho S.' },
		],
		sera_neg_compra: [
			{ if: SERA_TU, then: [
				{ say: 'sera', text: 'Firmado. —Revisa tu firma con una lupa de joyero, por costumbre—. Buena letra. Bienvenid{o|a|e} al despacho, soci{o|a|e}. No se lo cuentes a nadie. Bueno: cuéntaselo a quien te convenga.' },
			], else: [
				{ say: 'sera', text: 'Firmado. —Revisa su firma con una lupa de joyero, por costumbre—. Buena letra. Bienvenid{o|a|e} al despacho. No se lo cuente a nadie. Bueno: cuénteselo a quien le convenga.' },
			] },
		],
		sera_neg_up_agenda: [
			{ text: 'Serafina abre un cajón con llave y saca una agenda de piel negra, gastada en las esquinas. Es lo único viejo de todo el despacho.' },
			{ say: 'sera', text: 'Aquí está todo el que me debe algo. Desde los quince años. —La deja sobre la mesa, entre los dos—. No la abras delante de nadie. Y si la abres, no te rías de las fechas.', cond: SERA_TU },
			{ say: 'sera', text: 'Aquí está todo el que me debe algo. Desde los quince años. —La deja sobre la mesa, entre los dos—. No la abra delante de nadie. Y si la abre, no se ría de las fechas.', cond: USTED },
		],
		sera_neg_up_pleno: [
			{ say: 'sera', text: 'Socio de pleno derecho. Con voto. —Te da una pluma igual que la suya—. Úsala para firmar. Para tomar notas tienes las otras.', cond: SERA_TU },
			{ say: 'sera', text: 'Socio de pleno derecho. Con voto. —Le da una pluma igual que la suya—. Úsela para firmar. Para tomar notas tiene usted las otras.', cond: USTED },
		],
	},

	ventures: {
		sera_despacho: {
			name: 'Despacho S.', icon: '🖋️', loc: BASE, partner: 'sera',
			cond: 'flag.sera_neg_oferta && ' + SERA_EN_PAZ + ' && ' + LLEGADA_PALDEA,
			blurb: 'El despacho privado de Serafina: comisiones, tasaciones y favores que alguien le debe. Caro de entrar. Muy discreto.',
			buy: { cost: 45000, text: '«La entrada es cara. Es a propósito: así solo entra quien va en serio.»', script: 'sera_neg_compra' },
			share: [{ pct: 30 }],
			upkeep: 1800, store: 3,
			lines: {
				comisiones: { name: 'Comisiones', icon: '📑', money: 3200,
					desc: 'Una presentación, una firma, una cena en la que alguien se sienta al lado de quien le conviene. Serafina cobra por abrir puertas. Su nombre no sale en las facturas; su inicial, sí.' },
				valores: { name: 'Objetos de valor', icon: '💎', money: 600,
					desc: 'Hay clientes que pagan en especie, y gente que trae cosas para que se las tasen sin preguntas. Lo que no vale lo devuelve con una nota educadísima. Lo que vale se queda.',
					items: [{ id: 'pearl', perDay: 1 }, { id: 'stardust', perDay: 1 }, { id: 'nugget', perDay: 0.5 }, { id: 'bigpearl', perDay: 0.3 }, { id: 'starpiece', perDay: 0.25 }, { id: 'pearlstring', perDay: 0.08 }, { id: 'bignugget', perDay: 0.06 }, { id: 'cometshard', perDay: 0.04 }] },
				favores: { name: 'Favores', icon: '🤝', locked: true, money: 200,
					desc: 'Gente importante le debe cosas a Serafina desde hace años. De vez en cuando, alguien salda la deuda con algo que no se compra en ninguna tienda. Pasa poco. Siempre llega envuelto.',
					items: [{ id: 'maxrevive', perDay: 0.15 }, { id: 'rarecandy', perDay: 0.06 }, { id: 'ppmax', perDay: 0.06 }, { id: 'dawnstone', perDay: 0.03 }, { id: 'luckyegg', perDay: 0.02 }] },
			},
			upgrades: [
				{ id: 'membrete', name: 'Papel con membrete', cost: 30000, mult: { comisiones: 1.3 }, store: 1,
					desc: 'Papel de algodón con una «S.» en relieve, sin logo de Lemnis. Las cartas se contestan antes cuando pesan más. Más comisiones y un día más de archivo.' },
				{ id: 'vistas', name: 'Un despacho con vistas', cost: 45000, mult: { all: 1.15 },
					desc: 'Una planta más arriba, con ventanal. Serafina dice que las vistas no sirven para nada. Los clientes firman antes cuando miran por la ventana. Todo rinde más.' },
				{ id: 'etiqueta', name: 'Protocolo de la casa', cost: 40000, mult: { comisiones: 1.15 }, upkeep: -400,
					desc: 'Un manual de veinte páginas: cómo se contesta el teléfono, cómo se sirve el té y a quién no se le sirve. Menos errores, menos gastos.' },
				{ id: 'tasador', name: 'Tasador de la casa', cost: 55000, mult: { valores: 1.4 }, need: ['vistas'],
					desc: 'Un tasador de los serios, con lupa de joyero y cero sentido del humor. Distingue una Perla Grande de una canica a diez metros. Más objetos de valor.' },
				{ id: 'camara', name: 'Cámara acorazada', cost: 60000, mult: { valores: 1.15 }, store: 2,
					desc: 'Una puerta de acero de cuarenta centímetros detrás de un cuadro aburrido. Cabe más y nadie se atreve a preguntar qué hay. Dos días más de almacén.' },
				{ id: 'personal', name: 'Personal de confianza', cost: 50000, slots: 1,
					desc: 'Un puesto más para un Pokémon. Serafina solo contrata a quien sabe estarse quieto en una reunión. Los Acero, los Psíquico y los Siniestro lo hacen de maravilla.' },
				{ id: 'agenda', name: 'La agenda negra', cost: 70000, unlock: 'favores', script: 'sera_neg_up_agenda',
					desc: 'Serafina abre la agenda donde apunta lo que le deben, y a quién. Abre una línea nueva: favores. Llegan pocos, pero no se consiguen de otra manera.' },
				{ id: 'pleno', name: 'Socio de pleno derecho', cost: 95000, share: 15, need: ['agenda'], script: 'sera_neg_up_pleno',
					desc: 'Voto en las decisiones, firma en las cuentas y una pluma igual que la suya. Serafina te apunta 15 puntos más: «Lo que es suyo se pone por escrito, y se firma con buena letra».' },
			],
			jobs: { slots: 2, types: ['Steel', 'Psychic', 'Dark'], favs: { pawniard: 0.12, ralts: 0.12, gimmighoul: 0.12 },
				text: 'Los Acero custodian la cámara, los Psíquico leen la sala en las reuniones y los Siniestro notan cuándo alguien miente. Serafina los llama «personal de confianza». A los suyos (Pawniard, Ralts, Gimmighoul y sus evoluciones) se les da mejor que a nadie.' },
			managers: [
				{ npc: 'sera', mult: { comisiones: 1.2, favores: 1.15 },
					desc: 'Lo lleva ella, entre dos aviones. Contesta el correo en el ascensor y no deja una sola carta sin respuesta. Ni las de los abogados.' },
				{ npc: 'agente_lemnis', cond: 'flag.b02_sera_trigal', wage: 400, mult: { valores: 1.25 },
					desc: 'El asistente de la Gira que te buscaba en Johto, ascendido. Lleva un archivador por cliente y sabe de memoria cómo le gusta el té a cada uno. Tasa con mucho cuidado.' },
				{ npc: 'directivo_lemnis', cond: ROTO_CONOCIDO, wage: 450, mult: { comisiones: 1.25 },
					desc: 'El directivo de las tarjetas de notas, «trasladado» al despacho. Sonríe a todo el mundo, sin pausa. Los clientes firman antes para que deje de sonreír.' },
			],
			eventRate: 0.7,
			events: [
				{ id: 'cena_u', name: 'Una cena incómoda', w: 3, npc: 'sera', cond: USTED,
					text: 'Un cliente insiste en cenar con «el socio misterioso». Ha reservado en el restaurante más caro de la ciudad. Le advierto que habla de su yate durante los tres platos. Y del postre.',
					options: [
						{ text: '«Iré. Con buenos modales.»', result: 'Tres platos de yate. Escuchas sin bostezar ni una vez. Al día siguiente, el cliente firma y manda flores al despacho. Serafina las pone en recepción, lejos de su mesa.', effect: { boost: { mult: { comisiones: 1.25 }, days: 3, label: 'Cliente encantado' } } },
						{ text: 'Mandar un regalo y una excusa', cost: 1500, result: 'Una caja de bombones y una tarjeta impecable. El cliente lo entiende. Firma igual, pero menos.', effect: { boost: { mult: { comisiones: 1.1 }, days: 2, label: 'Excusa elegante' } } },
					] },
				{ id: 'cena_t', name: 'Una cena incómoda', w: 3, npc: 'sera', cond: SERA_TU,
					text: 'Un cliente quiere cenar con «el socio misterioso». O sea, contigo. Habla de su yate durante los tres platos. Te lo digo para que no pidas postre. El postre es cuando saca las fotos.',
					options: [
						{ text: '«Iré. Con buenos modales.»', result: 'Tres platos de yate y un álbum de fotos. Aguantas. Al día siguiente, Serafina te deja en la mesa una taza de café y una nota: «Heroico. —S.».', effect: { boost: { mult: { comisiones: 1.25 }, days: 3, label: 'Cliente encantado' } } },
						{ text: 'Mandar un regalo y una excusa', cost: 1500, result: '«Cobarde», dice Serafina. Lo dice con media sonrisa. El cliente firma igual, pero menos.', effect: { boost: { mult: { comisiones: 1.1 }, days: 2, label: 'Excusa elegante' } } },
					] },
				{ id: 'jarron_u', name: 'Un jarrón «antiquísimo»', w: 2, npc: 'sera', cond: USTED,
					text: 'Un caballero muy distinguido quiere saldar su deuda con un jarrón «de hace tres mil años». Tiene una etiqueta de precio pegada por debajo. De una tienda de recuerdos. Del año pasado.',
					options: [
						{ text: '«Se lo decimos a la cara.»', result: 'Serafina se lo dice con tanta educación que el caballero le da las gracias. Paga en efectivo, al día siguiente, con intereses.', effect: { money: 3000, boost: { mult: { valores: 1.1 }, days: 2, label: 'Deuda saldada' } } },
						{ text: 'Aceptarlo por cortesía', cost: 2000, result: 'El jarrón acaba en la entrada, con una flor. Al caballero le encanta verlo ahí. Desde entonces trae clientes nuevos cada semana.', effect: { boost: { mult: { comisiones: 1.2 }, days: 3, label: 'Cliente agradecido' } } },
					] },
				{ id: 'jarron_t', name: 'Un jarrón «antiquísimo»', w: 2, npc: 'sera', cond: SERA_TU,
					text: 'Me quieren pagar una deuda con un jarrón «de hace tres mil años». Lleva una pegatina de precio por debajo. Tú decides. Yo ya he decidido, pero quiero ver si piensas lo mismo.',
					options: [
						{ text: '«Se lo decimos a la cara.»', result: '«Lo mismo que yo», dice Serafina, y se nota que le gusta. El caballero paga en efectivo al día siguiente, con intereses.', effect: { money: 3000, boost: { mult: { valores: 1.1 }, days: 2, label: 'Deuda saldada' } } },
						{ text: 'Aceptarlo por cortesía', cost: 2000, result: '«Sentimental», dice Serafina. Pone el jarrón en la entrada, con una flor. El caballero trae clientes nuevos cada semana.', effect: { boost: { mult: { comisiones: 1.2 }, days: 3, label: 'Cliente agradecido' } } },
					] },
				{ id: 'periodista', name: 'Una periodista en el vestíbulo', w: 2, npc: 'sera',
					text: 'Hay una periodista en el vestíbulo que pregunta por el despacho «sin logo» de la heredera de Lemnis. Lleva dos horas. Le han servido tres tés. Se los ha bebido todos, lo cual demuestra determinación.',
					options: [
						{ text: '«Que pase. Sin secretos.»', result: 'Diez minutos de entrevista. Serafina contesta a todo sin decir nada que no quiera decir. Sale un artículo amable que nadie esperaba.', effect: { boost: { mult: { comisiones: 1.15 }, days: 3, label: 'Buena prensa' } } },
						{ text: 'Invitarla a comer y explicárselo todo', cost: 1200, result: 'La periodista se va con un cuaderno lleno y un buen recuerdo. El artículo sale en portada. Llaman tres clientes nuevos.', effect: { boost: { mult: { comisiones: 1.3 }, days: 3, label: 'En portada' } } },
					] },
				{ id: 'pawniard', name: 'El vestíbulo tiene dueño', w: 2, npc: 'sera', cond: 'works("pawniard") || works("bisharp") || works("kingambit")',
					text: 'Uno de los Pokémon de la casa ha decidido que el vestíbulo es suyo. Se planta en medio, con los brazos cruzados, y no deja pasar a nadie sin hacerle una reverencia. Hay clientes haciendo cola para hacérsela.',
					options: [
						{ text: '«Que siga. Es parte de la casa.»', result: 'La reverencia se pone de moda. Hay quien viene solo a hacerla. Algunos se quedan a firmar.', effect: { boost: { mult: { comisiones: 1.15 }, days: 3, label: 'La reverencia' }, happy: 5 } },
						{ text: 'Comprarle una alfombra roja', cost: 1800, result: 'Una alfombra roja de tres metros. El Pokémon la recorre de punta a punta cada hora, muy despacio. Serafina finge que no le hace gracia. Le hace.', effect: { boost: { mult: { all: 1.15 }, days: 3, label: 'Alfombra roja' }, happy: 10 } },
					] },
				{ id: 'agenda_doble', name: 'Dos citas a la vez', w: 2, npc: 'agente_lemnis', cond: 'flag.b02_sera_trigal',
					text: 'Ha habido un error en la agenda. Mío, me temo. Dos presidentes de empresa a las cinco en punto, en la misma sala. No se pueden ni ver. Están los dos sentados, mirando cada uno a una pared.',
					options: [
						{ text: '«Que esperen juntos. Con té.»', result: 'Media hora de silencio y té. Al final, uno le pide el azúcar al otro. Firman algo juntos. Nadie sabe muy bien qué.', effect: { boost: { mult: { comisiones: 1.2 }, days: 2, label: 'Paz con té' } } },
						{ text: 'Reservar una segunda sala', cost: 1000, result: 'Cada uno en su sala, cada uno con su té. Ninguno se entera de que el otro estaba. Los dos firman.', effect: { boost: { mult: { comisiones: 1.15 }, days: 2, label: 'Agenda salvada' } } },
					] },
				{ id: 'tarjetas', name: 'Mil tarjetas de visita', w: 2, npc: 'directivo_lemnis', cond: ROTO_CONOCIDO,
					text: '¡Socio! He mandado imprimir mil tarjetas de visita del despacho. Muy bonitas. Muy elegantes. Pone «Despacho Ese». Con letras. «E-S-E». La señorita Lemnis las ha visto. No ha dicho nada. Eso es peor que si hubiera dicho algo, ¿verdad?',
					options: [
						{ text: '«Repártelas igual. Con una sonrisa.»', result: 'Las reparte todas. Con la sonrisa. La gente se las queda por la errata. Tres llaman para preguntar si es una broma. Uno se queda de cliente.', effect: { boost: { mult: { comisiones: 1.1 }, days: 2, label: 'La errata famosa' } } },
						{ text: 'Pagar una reimpresión', cost: 900, result: 'Mil tarjetas nuevas, con la «S.» en su sitio. El directivo guarda una de las viejas en la cartera. «De recuerdo», dice. Sonriendo.', effect: { boost: { mult: { all: 1.1 }, days: 2, label: 'Tarjetas nuevas' } } },
					] },
				{ id: 'guante', name: 'Un guante roto', w: 1, npc: 'sera', cond: SERA_TU, once: true,
					text: 'Se me ha descosido un guante. El derecho, por el pulgar. Tengo una reunión en veinte minutos. —Lo mira como quien mira una traición—. No es grave. Es exactamente igual de grave que si lo fuera.',
					options: [
						{ text: '«Nadie mira los pulgares.»', result: 'Serafina entra en la reunión con el guante descosido y la mano cerrada, muy elegante, sobre la carpeta. Nadie mira los pulgares. Sale veinte minutos después con un contrato firmado. «Tenías razón. Que no se repita».', effect: { boost: { mult: { all: 1.15 }, days: 3, label: 'El guante descosido' } } },
						{ text: 'Comprarle unos nuevos, a la carrera', cost: 2500, result: 'Llegas con unos guantes blancos de la mejor tienda de la calle, a tiempo. Serafina se los pone sin decir nada. Al día siguiente encuentras una nota en tu mesa: «Talla exacta. ¿Cómo lo sabías? —S.».', effect: { boost: { mult: { comisiones: 1.25 }, days: 3, label: 'Guantes nuevos' } } },
					] },
			],
		},
	},
};
