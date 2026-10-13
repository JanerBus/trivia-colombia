/**
 * Trivia Colombia - Módulo de Almacenamiento
 * Gestiona la persistencia en localStorage para:
 * - Ranking local (Top 10)
 * - Estadísticas acumuladas del jugador
 * - Preferencias de configuración (tema, sonido)
 * 
 * Cumple con RF-12, RF-13 y Secciones 8, 13 y 14.
 */

const STORAGE_KEYS = {
  RANKING: 'trivia_ranking',
  STATS: 'trivia_stats',
  CONFIG: 'trivia_config',
  ULTIMO_JUGADOR: 'trivia_ultimo_jugador'
};

const Almacenamiento = {
  /**
   * Obtiene la lista ordenada del Top 10 del ranking
   * @returns {Array<Object>} Lista de partidas en el ranking
   */
  obtenerRanking() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RANKING);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error al leer el ranking de localStorage:', e);
      return [];
    }
  },

  /**
   * Guarda una nueva partida en el ranking, mantiene el Top 10 ordenado de mayor a menor.
   * @param {Object} partida Datos de la partida: { nombre, puntaje, categoria, dificultad, fecha, aciertos }
   * @returns {Object} { posicion: number, esTop10: boolean }
   */
  guardarEnRanking(partida) {
    try {
      const rankingActual = this.obtenerRanking();
      
      const registro = {
        nombre: (partida.nombre || 'Jugador Anónimo').trim(),
        puntaje: Math.max(0, Math.round(partida.puntaje || 0)),
        categoria: partida.categoria || 'todas',
        dificultad: partida.dificultad || 'medio',
        aciertos: partida.aciertos || 0,
        fecha: partida.fecha || new Date().toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      rankingActual.push(registro);
      
      // Ordenar descendente por puntaje; en empate, por mayor número de aciertos
      rankingActual.sort((a, b) => {
        if (b.puntaje !== a.puntaje) {
          return b.puntaje - a.puntaje;
        }
        return b.aciertos - a.aciertos;
      });

      // Conservar solo los 10 mejores
      const top10 = rankingActual.slice(0, 10);
      localStorage.setItem(STORAGE_KEYS.RANKING, JSON.stringify(top10));

      const posicion = top10.findIndex(item => item === registro) + 1;
      return {
        posicion: posicion > 0 ? posicion : null,
        esTop10: posicion > 0
      };
    } catch (e) {
      console.error('Error al guardar en el ranking:', e);
      return { posicion: null, esTop10: false };
    }
  },

  /**
   * Elimina todos los registros del ranking
   */
  limpiarRanking() {
    try {
      localStorage.removeItem(STORAGE_KEYS.RANKING);
      return true;
    } catch (e) {
      console.error('Error al limpiar el ranking:', e);
      return false;
    }
  },

  /**
   * Obtiene las estadísticas globales acumuladas
   * @returns {Object} Objeto con estadísticas
   */
  obtenerEstadisticas() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      const statsDefault = {
        partidasJugadas: 0,
        preguntasTotales: 0,
        aciertosTotales: 0,
        mejorPuntaje: 0,
        mejorRacha: 0,
        tiempoTotalSegundos: 0,
        comodinesUsados: 0,
        categoriasAciertos: {
          geografia: { aciertos: 0, total: 0 },
          historia: { aciertos: 0, total: 0 },
          cultura: { aciertos: 0, total: 0 },
          deportes: { aciertos: 0, total: 0 },
          naturaleza: { aciertos: 0, total: 0 }
        }
      };

      if (!data) return statsDefault;
      return { ...statsDefault, ...JSON.parse(data) };
    } catch (e) {
      console.error('Error al leer las estadísticas:', e);
      return {};
    }
  },

  /**
   * Actualiza las estadísticas acumuladas con el resultado de una nueva partida
   * @param {Object} partida Datos del resultado de la partida
   */
  actualizarEstadisticas(partida) {
    try {
      const stats = this.obtenerEstadisticas();

      stats.partidasJugadas += 1;
      stats.preguntasTotales += (partida.preguntasTotales || 10);
      stats.aciertosTotales += (partida.aciertos || 0);
      stats.mejorPuntaje = Math.max(stats.mejorPuntaje, partida.puntaje || 0);
      stats.mejorRacha = Math.max(stats.mejorRacha, partida.mejorRacha || 0);
      stats.tiempoTotalSegundos += (partida.tiempoEmpleado || 0);
      stats.comodinesUsados += (partida.comodinesUsados || 0);

      // Desglose por categoría si viene el detalle de respuestas
      if (Array.isArray(partida.respuestasDetalle)) {
        partida.respuestasDetalle.forEach(resp => {
          const cat = resp.categoria;
          if (cat && stats.categoriasAciertos[cat]) {
            stats.categoriasAciertos[cat].total += 1;
            if (resp.esCorrecta) {
              stats.categoriasAciertos[cat].aciertos += 1;
            }
          }
        });
      }

      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
      return stats;
    } catch (e) {
      console.error('Error al actualizar las estadísticas:', e);
      return null;
    }
  },

  /**
   * Obtiene la configuración de la aplicación (tema y sonido)
   * @returns {Object} { tema: 'claro'|'oscuro', sonido: boolean }
   */
  obtenerConfiguracion() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
      const configDefault = {
        tema: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro',
        sonido: true
      };
      return data ? { ...configDefault, ...JSON.parse(data) } : configDefault;
    } catch (e) {
      return { tema: 'claro', sonido: true };
    }
  },

  /**
   * Guarda la configuración de la aplicación
   * @param {Object} config Configuración parcial o completa
   */
  guardarConfiguracion(config) {
    try {
      const configActual = this.obtenerConfiguracion();
      const nuevaConfig = { ...configActual, ...config };
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(nuevaConfig));
      return nuevaConfig;
    } catch (e) {
      console.error('Error al guardar configuración:', e);
      return null;
    }
  },

  /**
   * Guarda el último nombre usado por el jugador para conveniencia
   * @param {string} nombre
   */
  guardarUltimoJugador(nombre) {
    if (nombre && typeof nombre === 'string') {
      try {
        localStorage.setItem(STORAGE_KEYS.ULTIMO_JUGADOR, nombre.trim());
      } catch (e) {
        // Ignorar
      }
    }
  },

  /**
   * Obtiene el último nombre usado
   * @returns {string}
   */
  obtenerUltimoJugador() {
    try {
      return localStorage.getItem(STORAGE_KEYS.ULTIMO_JUGADOR) || '';
    } catch (e) {
      return '';
    }
  }
};

// Exportar globalmente
if (typeof window !== 'undefined') {
  window.Almacenamiento = Almacenamiento;
}
