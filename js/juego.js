/**
 * Trivia Colombia - Lógica Principal del Juego
 * Gestiona el ciclo de vida de la partida, temporizador,
 * selección aleatoria de preguntas (Fisher-Yates), comodines y cálculo de puntajes.
 * 
 * Cumple con RF-01 a RF-11, RF-14 y Sección 6, 13 y 14.
 */

const Juego = {
  // Constantes de configuración de reglas
  TIEMPO_POR_PREGUNTA: 20,
  PREGUNTAS_POR_PARTIDA: 10,
  PUNTOS_RESPUESTA_CORRECTA: 100,
  PUNTOS_POR_SEGUNDO: 5,
  PUNTOS_BONUS_RACHA: 50,
  COSTO_COMODIN: 30,

  MULTIPLICADORES_DIFICULTAD: {
    facil: 1,
    medio: 1.5,
    dificil: 2
  },

  // Estado reactivo de la partida en curso
  estado: {
    jugador: '',
    categoria: 'todas',
    dificultad: 'medio',
    preguntas: [],
    indiceActual: 0,
    aciertos: 0,
    racha: 0,
    mejorRacha: 0,
    puntaje: 0,
    tiempoRestante: 20,
    comodines: {
      cincuenta: true, // disponible
      tiempo: true     // disponible
    },
    comodinesUsadosCount: 0,
    tiempoTotalEmpleado: 0,
    respuestasDetalle: [],
    temporizadorId: null,
    esperandoSiguiente: false
  },

  /**
   * Implementación del algoritmo de barajado Fisher-Yates
   * @param {Array} arreglo
   * @returns {Array} copia mezclada
   */
  mezclar(arreglo) {
    const copia = [...arreglo];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  },

  /**
   * Filtra el banco de preguntas por categoría y dificultad,
   * mezcla aleatoriamente y extrae exactamente 10 preguntas.
   * Si no hay suficientes en un nivel estricto, completa con preguntas de la misma categoría o generales.
   * @param {string} categoria
   * @param {string} dificultad
   * @returns {Array} 10 preguntas procesadas
   */
  obtenerPreguntas(categoria, dificultad) {
    if (!window.PREGUNTAS || !Array.isArray(window.PREGUNTAS)) {
      console.error('El banco de preguntas no está cargado.');
      return [];
    }

    let banco = [...window.PREGUNTAS];

    // Filtrar por categoría si no es 'todas'
    if (categoria && categoria !== 'todas') {
      banco = banco.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    // Intentar filtrar por dificultad
    let filtradasPorDificultad = [];
    if (dificultad) {
      filtradasPorDificultad = banco.filter(p => p.dificultad.toLowerCase() === dificultad.toLowerCase());
    }

    let seleccion = [];
    if (filtradasPorDificultad.length >= this.PREGUNTAS_POR_PARTIDA) {
      seleccion = this.mezclar(filtradasPorDificultad).slice(0, this.PREGUNTAS_POR_PARTIDA);
    } else {
      // Tomar las que haya de esa dificultad y rellenar con las demás de la misma categoría
      const restantes = banco.filter(p => !filtradasPorDificultad.includes(p));
      const combinadas = [...this.mezclar(filtradasPorDificultad), ...this.mezclar(restantes)];
      seleccion = combinadas.slice(0, this.PREGUNTAS_POR_PARTIDA);
    }

    // Si aún faltan para 10 (ej. filtro muy estrecho), tomar de otras categorías
    if (seleccion.length < this.PREGUNTAS_POR_PARTIDA) {
      const otras = window.PREGUNTAS.filter(p => !seleccion.some(s => s.id === p.id));
      seleccion = [...seleccion, ...this.mezclar(otras)].slice(0, this.PREGUNTAS_POR_PARTIDA);
    }

    // Mezclar el orden de las preguntas
    seleccion = this.mezclar(seleccion);

    // Preparar cada pregunta mezclando sus 4 opciones y rastreando el nuevo índice de la respuesta correcta (RF-04)
    return seleccion.map(preguntaOriginal => {
      const textoCorrecto = preguntaOriginal.opciones[preguntaOriginal.correcta];
      const opcionesMezcladas = this.mezclar(preguntaOriginal.opciones);
      const nuevoIndiceCorrecto = opcionesMezcladas.indexOf(textoCorrecto);

      return {
        id: preguntaOriginal.id,
        categoria: preguntaOriginal.categoria,
        dificultad: preguntaOriginal.dificultad,
        enunciado: preguntaOriginal.enunciado,
        opciones: opcionesMezcladas,
        correcta: nuevoIndiceCorrecto,
        explicacion: preguntaOriginal.explicacion,
        opcionesDescartadas: [] // para comodín 50/50
      };
    });
  },

  /**
   * Inicializa el estado para una nueva partida
   * @param {string} jugador Nombre del jugador
   * @param {string} categoria Categoría elegida
   * @param {string} dificultad Nivel de dificultad ('facil'|'medio'|'dificil')
   */
  iniciarPartida(jugador, categoria = 'todas', dificultad = 'medio') {
    const nombreLimpio = (jugador || '').trim();
    if (!nombreLimpio) {
      throw new Error('El nombre del jugador es obligatorio.');
    }

    const preguntasPartida = this.obtenerPreguntas(categoria, dificultad);
    if (preguntasPartida.length === 0) {
      throw new Error('No se pudieron cargar preguntas para esta combinación.');
    }

    this.detenerTemporizador();

    this.estado = {
      jugador: nombreLimpio,
      categoria,
      dificultad,
      preguntas: preguntasPartida,
      indiceActual: 0,
      aciertos: 0,
      racha: 0,
      mejorRacha: 0,
      puntaje: 0,
      tiempoRestante: this.TIEMPO_POR_PREGUNTA,
      comodines: {
        cincuenta: true,
        tiempo: true
      },
      comodinesUsadosCount: 0,
      tiempoTotalEmpleado: 0,
      respuestasDetalle: [],
      temporizadorId: null,
      esperandoSiguiente: false
    };

    return this.estado;
  },

  /**
   * Obtiene la pregunta actual
   * @returns {Object|null}
   */
  obtenerPreguntaActual() {
    if (this.estado.indiceActual < this.estado.preguntas.length) {
      return this.estado.preguntas[this.estado.indiceActual];
    }
    return null;
  },

  /**
   * Inicia el temporizador de 20 segundos por pregunta (RF-05)
   * @param {Function} onTick Callback ejecutado cada segundo: (tiempoRestante) => void
   * @param {Function} onTimeout Callback ejecutado si se agota el tiempo: () => void
   */
  iniciarTemporizador(onTick, onTimeout) {
    this.detenerTemporizador();
    this.estado.tiempoRestante = this.TIEMPO_POR_PREGUNTA;

    if (typeof onTick === 'function') {
      onTick(this.estado.tiempoRestante);
    }

    this.estado.temporizadorId = setInterval(() => {
      this.estado.tiempoRestante -= 1;
      this.estado.tiempoTotalEmpleado += 1;

      if (typeof onTick === 'function') {
        onTick(this.estado.tiempoRestante);
      }

      if (this.estado.tiempoRestante <= 0) {
        this.detenerTemporizador();
        if (typeof onTimeout === 'function') {
          onTimeout();
        }
      }
    }, 1000);
  },

  /**
   * Detiene el temporizador activo
   */
  detenerTemporizador() {
    if (this.estado.temporizadorId) {
      clearInterval(this.estado.temporizadorId);
      this.estado.temporizadorId = null;
    }
  },

  /**
   * Procesa la respuesta del jugador o timeout (RF-06, RF-08)
   * @param {number|null} indiceOpcion Índice seleccionado (0 a 3) o null si fue por tiempo
   * @returns {Object} Resultado de la validación
   */
  responder(indiceOpcion) {
    this.detenerTemporizador();
    this.estado.esperandoSiguiente = true;

    const pregunta = this.obtenerPreguntaActual();
    if (!pregunta) {
      return null;
    }

    const fuePorTiempo = (indiceOpcion === null || indiceOpcion === undefined);
    const esCorrecta = !fuePorTiempo && (indiceOpcion === pregunta.correcta);

    let puntosGanados = 0;
    let bonoRapidez = 0;
    let bonoRacha = 0;
    const multDificultad = this.MULTIPLICADORES_DIFICULTAD[this.estado.dificultad] || 1;

    if (esCorrecta) {
      this.estado.aciertos += 1;
      this.estado.racha += 1;
      if (this.estado.racha > this.estado.mejorRacha) {
        this.estado.mejorRacha = this.estado.racha;
      }

      // 1. Puntos base: +100
      let puntosBase = this.PUNTOS_RESPUESTA_CORRECTA;

      // 2. Bonificación por rapidez: +5 por cada segundo restante (máx 100)
      const segundosRestantes = Math.max(0, this.estado.tiempoRestante);
      bonoRapidez = Math.min(100, segundosRestantes * this.PUNTOS_POR_SEGUNDO);

      // Subtotal de la respuesta antes de bonos adicionales y multiplicador
      let subtotal = puntosBase + bonoRapidez;

      // 3. Racha de 3 respuestas correctas seguidas: +50 adicionales
      if (this.estado.racha > 0 && this.estado.racha % 3 === 0) {
        bonoRacha = this.PUNTOS_BONUS_RACHA;
      }

      // Aplicar multiplicador por dificultad
      puntosGanados = Math.round((subtotal + bonoRacha) * multDificultad);
      this.estado.puntaje += puntosGanados;
    } else {
      // Respuesta incorrecta o sin responder: 0 puntos, se reinicia la racha
      this.estado.racha = 0;
      puntosGanados = 0;
    }

    // Registrar en detalle para revisión final
    const detalleRespuesta = {
      numero: this.estado.indiceActual + 1,
      idPregunta: pregunta.id,
      categoria: pregunta.categoria,
      enunciado: pregunta.enunciado,
      opciones: pregunta.opciones,
      opcionSeleccionada: fuePorTiempo ? null : indiceOpcion,
      textoSeleccionado: fuePorTiempo ? 'No respondió a tiempo' : pregunta.opciones[indiceOpcion],
      correcta: pregunta.correcta,
      textoCorrecto: pregunta.opciones[pregunta.correcta],
      esCorrecta,
      fuePorTiempo,
      explicacion: pregunta.explicacion,
      tiempoRestante: this.estado.tiempoRestante,
      puntosGanados,
      rachaActual: this.estado.racha,
      bonoRacha: bonoRacha > 0
    };

    this.estado.respuestasDetalle.push(detalleRespuesta);

    return {
      esCorrecta,
      fuePorTiempo,
      indiceSeleccionado: indiceOpcion,
      indiceCorrecto: pregunta.correcta,
      explicacion: pregunta.explicacion,
      puntosGanados,
      bonoRapidez,
      bonoRacha,
      puntajeTotal: this.estado.puntaje,
      racha: this.estado.racha,
      esUltimaPregunta: this.estado.indiceActual === this.estado.preguntas.length - 1
    };
  },

  /**
   * Aplica un comodín (50/50 o tiempo extra) (RF-09)
   * Resta 30 puntos por uso.
   * @param {'cincuenta'|'tiempo'} tipo
   * @returns {Object} Resultado del comodín aplicado
   */
  usarComodin(tipo) {
    if (this.estado.esperandoSiguiente) {
      return { exito: false, mensaje: 'No puedes usar comodines después de responder.' };
    }

    if (!this.estado.comodines[tipo]) {
      return { exito: false, mensaje: 'Este comodín ya fue utilizado en esta partida.' };
    }

    const pregunta = this.obtenerPreguntaActual();
    if (!pregunta) {
      return { exito: false, mensaje: 'No hay una pregunta activa.' };
    }

    // Marcar como usado y restar puntos
    this.estado.comodines[tipo] = false;
    this.estado.comodinesUsadosCount += 1;
    this.estado.puntaje = Math.max(0, this.estado.puntaje - this.COSTO_COMODIN);

    if (tipo === 'cincuenta') {
      // Identificar las 3 opciones incorrectas
      const indicesIncorrectos = [0, 1, 2, 3].filter(idx => idx !== pregunta.correcta);
      // Mezclar y tomar 2 para descartar
      const aDescartar = this.mezclar(indicesIncorrectos).slice(0, 2);
      pregunta.opcionesDescartadas = aDescartar;

      return {
        exito: true,
        tipo: 'cincuenta',
        opcionesDescartadas: aDescartar,
        nuevoPuntaje: this.estado.puntaje,
        mensaje: 'Se descartaron dos opciones incorrectas (-30 pts).'
      };
    } else if (tipo === 'tiempo') {
      // Sumar 10 segundos al temporizador
      this.estado.tiempoRestante += 10;
      return {
        exito: true,
        tipo: 'tiempo',
        segundosExtra: 10,
        nuevoTiempo: this.estado.tiempoRestante,
        nuevoPuntaje: this.estado.puntaje,
        mensaje: '¡Sumaste 10 segundos a tu reloj! (-30 pts).'
      };
    }

    return { exito: false, mensaje: 'Tipo de comodín no válido.' };
  },

  /**
   * Avanza al índice de la siguiente pregunta
   * @returns {boolean} true si hay siguiente pregunta, false si ya terminó la partida
   */
  avanzarSiguientePregunta() {
    this.estado.esperandoSiguiente = false;
    this.estado.indiceActual += 1;
    return this.estado.indiceActual < this.estado.preguntas.length;
  },

  /**
   * Genera el resumen final y guarda en ranking y estadísticas (RF-11, RF-12)
   * @returns {Object} Resumen completo de la partida
   */
  finalizarPartida() {
    this.detenerTemporizador();

    const totalPreguntas = this.estado.preguntas.length;
    const aciertos = this.estado.aciertos;
    const porcentajeAciertos = totalPreguntas > 0 ? Math.round((aciertos / totalPreguntas) * 100) : 0;

    // Mensaje personalizado según desempeño
    let mensajeDesempeno = '';
    let emojiDesempeno = '🇨🇴';

    if (porcentajeAciertos === 100) {
      mensajeDesempeno = '¡Excelente patriota! Tienes un conocimiento impecable sobre Colombia.';
      emojiDesempeno = '🏆';
    } else if (porcentajeAciertos >= 80) {
      mensajeDesempeno = '¡Gran trabajo! Conoces a profundidad la historia, cultura y geografía de Colombia.';
      emojiDesempeno = '🥇';
    } else if (porcentajeAciertos >= 60) {
      mensajeDesempeno = '¡Buen desempeño! Estás bien informado, aunque aún hay detalles por descubrir.';
      emojiDesempeno = '🥈';
    } else if (porcentajeAciertos >= 40) {
      mensajeDesempeno = 'Desempeño regular. ¡Sigue explorando y aprendiendo más de nuestro hermoso país!';
      emojiDesempeno = '🥉';
    } else {
      mensajeDesempeno = '¡No te desanimes! Este juego es una gran oportunidad para aprender sobre Colombia.';
      emojiDesempeno = '📚';
    }

    const resumen = {
      jugador: this.estado.jugador,
      categoria: this.estado.categoria,
      dificultad: this.estado.dificultad,
      puntaje: this.estado.puntaje,
      aciertos,
      totalPreguntas,
      porcentajeAciertos,
      mejorRacha: this.estado.mejorRacha,
      tiempoTotalEmpleado: this.estado.tiempoTotalEmpleado,
      comodinesUsados: this.estado.comodinesUsadosCount,
      mensajeDesempeno,
      emojiDesempeno,
      respuestasDetalle: this.estado.respuestasDetalle,
      preguntasFalladas: this.estado.respuestasDetalle.filter(r => !r.esCorrecta)
    };

    // Guardar en Ranking y Estadísticas vía Almacenamiento
    if (window.Almacenamiento) {
      const resultadoRanking = window.Almacenamiento.guardarEnRanking({
        nombre: resumen.jugador,
        puntaje: resumen.puntaje,
        categoria: resumen.categoria,
        dificultad: resumen.dificultad,
        aciertos: resumen.aciertos
      });
      resumen.rankingInfo = resultadoRanking;

      window.Almacenamiento.actualizarEstadisticas({
        preguntasTotales: resumen.totalPreguntas,
        aciertos: resumen.aciertos,
        puntaje: resumen.puntaje,
        mejorRacha: resumen.mejorRacha,
        tiempoEmpleado: resumen.tiempoTotalEmpleado,
        comodinesUsados: resumen.comodinesUsados,
        respuestasDetalle: resumen.respuestasDetalle
      });

      window.Almacenamiento.guardarUltimoJugador(resumen.jugador);
    }

    return resumen;
  }
};

// Exportar globalmente
if (typeof window !== 'undefined') {
  window.Juego = Juego;
}
