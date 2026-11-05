// Pokémon Infinite · entregable de Argos para revisión de Elio.
// Historia paralela de Johto, ocho tramos. NO conecta con main ni se publica.
// Mantiene los módulos separados para continuar/revisar sin perder avances.
import t01 from './cg-carga-johto.js';
import t23 from './cg-carga-johto-t2t3.js';
import t45 from './cg-carga-johto-t4t5.js';
import t67 from './cg-carga-johto-t6t7.js';
import anexoT1 from './cg-carga-johto-ampliacion-t1.js';
import gabineteT2 from './cg-carga-johto-ampliacion-t2.js';
import acequiaT3 from './cg-carga-johto-ampliacion-t3.js';
import simulacionT4 from './cg-carga-johto-ampliacion-t4.js';
import segundoTurnoT5 from './cg-carga-johto-ampliacion-t5.js';
import reciboT6 from './cg-carga-johto-ampliacion-t6.js';
import cierreT7 from './cg-carga-johto-ampliacion-t7.js';
import aperturaT0 from './cg-carga-johto-ampliacion-t0.js';

const PARTES = [t01, t23, t45, t67, anexoT1, gabineteT2, acequiaT3, simulacionT4, segundoTurnoT5, reciboT6, cierreT7, aperturaT0];
const out = {
  npcs: {}, items: {}, quests: {}, scripts: {}, trainers: {}, gather: {},
  shops: {}, locations: {}, patches: {}, events: [], milestones: []
};
for (const p of PARTES) {
  for (const k of ['npcs','items','quests','scripts','trainers','gather','shops','locations']) {
    for (const [id, value] of Object.entries(p[k] || {})) {
      if (Object.hasOwn(out[k], id)) throw new Error('ID duplicado: ' + k + '.' + id);
      out[k][id] = value;
    }
  }
  out.events.push(...(p.events || []));
  out.milestones.push(...(p.milestones || []));
  for (const [loc, patch] of Object.entries(p.patches || {})) {
    const acc = (out.patches[loc] ||= {});
    if (patch.spots) (acc.spots ||= []).push(...patch.spots);
    if (patch.onEnter) (acc.onEnter ||= []).push(...patch.onEnter);
    if (patch.route?.tramos) {
      const tramos = ((acc.route ||= {}).tramos ||= {});
      for (const [n, entries] of Object.entries(patch.route.tramos)) {
        (tramos[n] ||= []).push(...entries);
      }
    }
  }
}
export default out;
