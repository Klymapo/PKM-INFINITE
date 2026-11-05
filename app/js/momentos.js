// Ilustraciones de escenas ya vividas. Las partidas anteriores usan las mismas marcas de progreso.
import { evalCond } from './state.js';
import { hasImage } from './imagenes.js';

const MOMENTS = [
	['01', 'El zorrito perdido', 'flag.b01_fennekin_unido || flag.b01_fennekin_libre'],
	['02', 'Lana perdida', 'vars.mareep > 0'],
	['03', 'Chispita en la jaula', 'flag.b01_mareep_jaula'],
	['04', 'Candela se queda', 'flag.b01_candela_unida'],
	['05', 'Carrera de Rhyhorn', 'done.b01_s_rhyhorn'],
	['06', 'Snorlax despierta', 'flag.b01_snorlax'],
	['07', 'Noche de Crómlech', 'flag.b01_cromlech_hecha'],
	['08', 'La Torre Maestra', 'flag.b01_torre_hecha'],
	['09', 'La Puerta', 'flag.b02_puerta_cruzada'],
	['10', 'El Encinar', 'flag.b02_llegada'],
	['11', 'El Pozo Slowpoke', 'flag.b02_pozo_hecho'],
	['12', 'La carta de Rhi', 'flag.b02_rhi_carta'],
	['13', 'Faro y Don Aurelio', 'flag.b02_ampharos'],
	['14', 'Lila y Sylveon', 'flag.b03_sylveon'],
	['15', 'El faro de Olivo', 'flag.b03_faro_hecho && flag.b02_ampharos'],
	['16', 'La mecedora vacía', 'flag.b03_dibujo_rancho'],
	['17', 'El Lago de la Furia', 'flag.b03_gyarados_rojo'],
	['18', 'Las jaulas de Caoba', 'flag.b03_jaulas_vistas'],
	['19a', 'Un encuentro con Chikorita', 'flag.b02_ini_chikorita'],
	['19b', 'Un encuentro con Cyndaquil', 'flag.b02_ini_cyndaquil'],
	['19c', 'Un encuentro con Totodile', 'flag.b03_ini_totodile'],
	['20', 'El Tren Magnético', 'flag.b04_rhi_tren'],
	['21', 'Tobías y Duquesa en Lavanda', 'flag.b04_tobias_1'],
	['22', 'El salto', 'flag.b04_salto'],
	['23', 'El núcleo', 'flag.b04_mewtwo'],
	['24', 'La ofrenda en Lavanda', 'vars.ofrenda_lavanda_n > 0'],
	['25', 'Un encuentro con Litten', 'flag.b05_litten'],
	['26', 'La galería del Conde', 'flag.b02_conde'],
].map(([id, title, condition]) => ({ image: 'momentos/' + id + '.png', title, condition }));

export function unlockedMoments() {
	return MOMENTS.filter(moment => hasImage(moment.image) && evalCond(moment.condition));
}
