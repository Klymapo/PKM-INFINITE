// Revisión de voz del episodio Johto. Reglas tomadas del contenido publicado B7.
// Variante purgada: Rotom real, voz corta y no exclamativa.
// Variante reformada: texto completo, cierre visible «Omitido: nada.».
// Variante doble: relato alegre, selectivo y legible por terceros.
// El contenido no se inserta en main; se aplica solo a los guiones de la propuesta.
const DIARIOS = {
  cg_carga_t0_sintesis: {
    purgado: 'Miramos el muelle de Olivo. Había dos caminos. Uno para la caja, otro para el papel. Hice un mapa. No sabemos aun quién firmó. No voy a poner un nombre.',
    doble: 'Hoy conocimos la dársena de Olivo. Dalia nos enseñó los carros y una ventanilla que recibe sobres. Hicimos un ejercicio con una caja vacía. El mar olía a sal y el croquis quedó precioso.'
  },
  cg_carga_cierre_olivo: {
    purgado: 'Tres pruebas en Olivo. Una fecha, un peso y un libro. No cuentan lo mismo. {jugador} quiso mirar otra vez antes de decidir. Seguimos a Trigal.',
    doble: 'Hoy ordenamos una carpeta en Olivo y nos vamos a Trigal. Yasmina nos enseñó a revisar una etiqueta y una báscula. Hasta una caja puede tener mucho que contar.'
  },
  cg_carga_t1_anexo_cotejo: {
    purgado: 'En Trigal vi un vagón cambiar de sitio. La caja no se duplicó. Mara recordó la maniobra. Guardamos la copia. La pregunta sigue abierta.',
    doble: 'Hoy jugamos a seguir un vagón por el patio de Trigal. Mara nos ayudó con la pizarra. Las ruedas dejaron marcas muy curiosas y al fin encontramos el registro correcto.'
  },
  cg_carga_cierre_trigal: {
    purgado: 'En Trigal hubo preparación, maniobra y salida. No son una sola cosa. Anoté el orden. En Iris hay otras copias. Seguimos.',
    doble: 'Terminamos el trabajo de Trigal. Aprendimos a leer sus horarios y ya tenemos otra hoja para la carpeta. Ahora toca visitar Iris y escuchar a sus guías.'
  },
  cg_carga_t2_acta: {
    purgado: 'Alda mostró las marcas y los relatos por separado. Probamos la humedad. Quedaron dudas. Las dejé escritas como dudas, no como hechos.',
    doble: 'Hoy Alda nos dejó usar el gabinete de Iris. Vimos fibras, tinta y una prueba con papel limpio. Hasta las manchas tienen algo que enseñarnos.'
  },
  cg_carga_cotejo_iris: {
    purgado: 'Tres testigos. Tres lugares desde donde mirar. Ninguno vio toda la carga. La carpeta sí pasó por unas manos. No es lo mismo.',
    doble: 'En Iris nos contaron tres recuerdos del camino. Había piedras, luz y un papel protegido de la lluvia. Guardamos sus testimonios sin mezclarlos. Próxima parada: Caoba.'
  },
  cg_carga_t3_informe: {
    purgado: 'Medimos dos corrientes en Caoba. Una anilla era del canal. La señal tenía un registro propio. Wooper sigue junto al agua. Aun falta comprobar que esté bien.',
    doble: 'En Caoba trabajamos con estacas y recipientes para entender el agua. Ina conoce el canal muy bien. También vimos a un Wooper junto a los juncos.'
  },
  cg_carga_wooper_cierre: {
    purgado: 'El agua vuelve a correr. Wooper ya no evita ese sitio. No lo capturamos. Una etiqueta era de mantenimiento, no de carga. Seguimos con la prueba.',
    doble: 'Hoy cuidamos un pequeño tramo del canal de Caoba. Wooper volvió a su refugio y el agua corre mucho mejor. Después haremos una demostración con un envío de práctica.'
  },
  cg_carga_t4_contraste: {
    purgado: 'Hicimos un envío de ensayo. Una caja. Dos recibos distintos. Uno para papeles, otro para la caja. El mapa y las horas encajan. No sabemos quién hizo el asiento antiguo.',
    doble: 'En Caoba Nelo nos prestó un carrito y ensayamos una entrega. Elegimos un camino, protegimos la caja y llenamos dos formularios. Quedó todo limpio y ordenado.'
  },
  cg_carga_t5_cotejo: {
    purgado: 'Volvimos al almacén de Olivo. Un carro giró dentro. El reloj marcó un relevo. Las hojas pasaron de mano. Ninguna de esas cosas prueba una salida.',
    doble: 'En el segundo turno de Olivo vimos huellas de ruedas y un reloj de trabajo. Isela nos enseñó la entreplanta y nos dejó consultar una copia del registro.'
  },
  cg_carga_turno_cierre: {
    purgado: 'Dos firmas en Olivo. No para lo mismo. Antes de corregirlas hay que saber qué recibió cada persona. Guardamos las dos versiones.',
    doble: 'Hoy revisamos el cambio de turno de Olivo. Había varias hojas de servicio y un empleado nos contó cómo funcionaban. La carpeta sigue creciendo.'
  },
  cg_carga_t6_borrador_final: {
    purgado: 'El recibo nuevo conserva el anterior. Pusimos una nota con fecha y motivo. Alguien que no sabía el caso pudo leerlo. Así debería funcionar.',
    doble: 'Celia nos enseñó a escribir una rectificación clara. El documento viejo se queda guardado y ahora hay una copia de consulta que cualquier empleado puede entender.'
  },
  cg_carga_fin: {
    purgado: 'Se cerró el expediente. Visitamos tres ciudades para revisar los acuses. Cada una confirmó una tarea distinta. No hace falta poner una culpa donde no hay prueba. Guardé el mapa.',
    doble: 'Hoy terminamos nuestra vuelta por Johto con una carpeta más ordenada. Pasamos por Trigal, Iris y Caoba; en Olivo dejamos los acuses listos para los siguientes turnos. Fue una aventura de mapas, gente y trabajo en equipo.'
  }
};

function purgarIntervencion(texto) {
  return String(texto)
    .replace(/¡?\s*Bzzt[!.:,;]?\s*/gi, '')
    .replace(/¡/g, '')
    .replace(/!/g, '.')
    .replace(/\.{2,}/g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
function and(a,b) { return a ? '('+a+') && ('+b+')' : b; }

let totalDiarios = 0, totalRotom = 0;
function convertirArreglo(arr, scriptId) {
  return arr.flatMap(x => {
    if (x === null || typeof x !== 'object') return [x];
    if (Array.isArray(x)) return [convertirArreglo(x,scriptId)];
    const obj = {};
    for (const [k, v] of Object.entries(x)) {
      obj[k] = Array.isArray(v) ? convertirArreglo(v, scriptId) :
        v && typeof v === 'object' ? convertirObjeto(v,scriptId) : v;
    }
    if (typeof obj.diary === 'string') {
      const d=DIARIOS[scriptId];
      if (!d) throw new Error('Falta una variante de Diario para '+scriptId);
      totalDiarios++;
      const originalCond = obj.cond || 'flag.b01_diario';
      return [
        {...obj,diary:d.purgado,cond:and(originalCond,'flag.b06_eco_purgado')},
        {...obj,diary:obj.diary.endsWith('*(Omitido: nada.)*')?obj.diary:obj.diary+'\n\n*(Omitido: nada.)*',cond:and(originalCond,'flag.b06_eco_reformado')},
        {...obj,diary:d.doble,cond:and(originalCond,'flag.b06_eco_doble')}
      ];
    }
    if (obj.say === 'rotom' && typeof obj.text === 'string') {
      // Las conversaciones de la variante purgada son cortas y sin el «¡Bzzt!» habitual.
      totalRotom++;
      return [
        {...obj,text:purgarIntervencion(obj.text),cond:and(obj.cond,'flag.b06_eco_purgado')},
        {...obj,cond:and(obj.cond,'!flag.b06_eco_purgado')}
      ];
    }
    return [obj];
  });
}
function convertirObjeto(obj, scriptId) {
  return Object.fromEntries(Object.entries(obj).map(([k,v])=>[
    k, Array.isArray(v) ? convertirArreglo(v,scriptId) :
      v && typeof v==='object' ? convertirObjeto(v,scriptId) : v
  ]));
}

export function revisarVoces(scripts) {
  const transformed={};
  for (const [id,steps] of Object.entries(scripts)) transformed[id]=convertirArreglo(steps,id);
  if (totalDiarios !== Object.keys(DIARIOS).length) throw new Error('Desajuste de Diarios: '+totalDiarios+' frente a '+Object.keys(DIARIOS).length);
  return {scripts:transformed,revision:{diarios:totalDiarios,intervenciones:totalRotom}};
}
