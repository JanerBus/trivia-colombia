/**
 * Trivia Colombia - Módulo de Interfaz de Usuario (UI)
 * Gestiona el renderizado de pantallas, animaciones, accesibilidad (teclado, ARIA),
 * estados de botones, modales y actualización reactiva del DOM.
 * 
 * Cumple con RF-01 a RF-14, RNF-01 a RNF-07 y Secciones 7, 8, 9 y 14.
 */

const UI = {
  // Elementos cacheados del DOM
  elementos: {},

  /**
   * Inicializa las referencias a los elementos del DOM y listeners principales
   */
  inicializar() {
    this.cachearElementos();
    this.aplicarConfiguracionInicial();
  },

  cachearElementos() {
    this.elementos = {
      // Contenedores de pantallas
      pantallas: document.querySelectorAll('.pantalla'),
      pantallaInicio: document.getElementById('pantalla-inicio'),
      pantallaInstrucciones: document.getElementById('pantalla-instrucciones'),
      pantallaConfiguracion: document.getElementById('pantalla-configuracion'),
      pantallaJuego: document.getElementById('pantalla-juego'),
      pantallaResultado: document.getElementById('pantalla-resultado'),

      // Modales y diálogos
      modalRanking: document.getElementById('modal-ranking'),
      btnCerrarModal: document.getElementById('btn-cerrar-modal'),

      // Cabecera global
      btnToggleTema: document.getElementById('btn-toggle-tema'),
      btnToggleSonido: document.getElementById('btn-toggle-sonido'),
      iconoTema: document.getElementById('icono-tema'),
      iconoSonido: document.getElementById('icono-sonido'),

      // Pantalla Inicio
      inputNombre: document.getElementById('input-nombre-jugador'),
      errorNombre: document.getElementById('error-nombre-jugador'),
      btnIrConfiguracion: document.getElementById('btn-ir-configuracion'),
      btnVerInstrucciones: document.getElementById('btn-ver-instrucciones'),
      btnVerRanking: document.getElementById('btn-ver-ranking'),

      // Pantalla Instrucciones
      btnVolverDeInstrucciones: document.getElementById('btn-volver-instrucciones'),
      btnJugarDesdeInstrucciones: document.getElementById('btn-jugar-desde-instrucciones'),

      // Pantalla Configuración
      nombreJugadorConfig: document.getElementById('nombre-jugador-config'),
      contenedorCategorias: document.getElementById('contenedor-categorias'),
      grupoDificultad: document.querySelectorAll('input[name="dificultad"]'),
      recordCategoriaTexto: document.getElementById('record-categoria-texto'),
      btnComenzarPartida: document.getElementById('btn-comenzar-partida'),
      btnVolverConfiguracion: document.getElementById('btn-volver-configuracion'),

      // Pantalla Juego
      barraProgresoFill: document.getElementById('barra-progreso-fill'),
      textoProgreso: document.getElementById('texto-progreso'),
      puntajeActualTexto: document.getElementById('puntaje-actual-texto'),
      badgeRacha: document.getElementById('badge-racha'),
      textoRacha: document.getElementById('texto-racha'),
      tiempoRestanteNumero: document.getElementById('tiempo-restante-numero'),
      timerSvgCircle: document.getElementById('timer-svg-circle'),
      tagCategoriaJuego: document.getElementById('tag-categoria-juego'),
      tagDificultadJuego: document.getElementById('tag-dificultad-juego'),
      enunciadoPregunta: document.getElementById('enunciado-pregunta'),
      contenedorOpciones: document.getElementById('contenedor-opciones'),

      // Comodines
      btnComodinCincuenta: document.getElementById('btn-comodin-5050'),
      btnComodinTiempo: document.getElementById('btn-comodin-tiempo'),

      // Retroalimentación
      cajaFeedback: document.getElementById('caja-feedback'),
      iconoFeedback: document.getElementById('icono-feedback'),
      tituloFeedback: document.getElementById('titulo-feedback'),
      puntosGanadosFeedback: document.getElementById('puntos-ganados-feedback'),
      explicacionFeedback: document.getElementById('explicacion-feedback'),
      btnSiguientePregunta: document.getElementById('btn-siguiente-pregunta'),

      // Pantalla Resultado
      resultadoEmoji: document.getElementById('resultado-emoji'),
      resultadoJugador: document.getElementById('resultado-jugador'),
      resultadoMensaje: document.getElementById('resultado-mensaje'),
      resultadoPuntaje: document.getElementById('resultado-puntaje'),
      resultadoAciertos: document.getElementById('resultado-aciertos'),
      resultadoPorcentaje: document.getElementById('resultado-porcentaje'),
      resultadoTiempo: document.getElementById('resultado-tiempo'),
      resultadoMejorRacha: document.getElementById('resultado-mejor-racha'),
      resultadoComodines: document.getElementById('resultado-comodines'),
      resultadoBadgeRanking: document.getElementById('resultado-badge-ranking'),
      btnVerRevisionFalladas: document.getElementById('btn-ver-revision-falladas'),
      contenedorRevisionFalladas: document.getElementById('contenedor-revision-falladas'),
      listaRevisionPreguntas: document.getElementById('lista-revision-preguntas'),
      btnJugarDeNuevo: document.getElementById('btn-jugar-de-nuevo'),
      btnResultadoVerRanking: document.getElementById('btn-resultado-ver-ranking'),
      btnVolverInicio: document.getElementById('btn-volver-inicio'),

      // Pestañas Ranking & Stats
      tabRanking: document.getElementById('tab-btn-ranking'),
      tabStats: document.getElementById('tab-btn-stats'),
      panelRanking: document.getElementById('panel-ranking'),
      panelStats: document.getElementById('panel-stats'),
      tbodyRanking: document.getElementById('tbody-ranking'),
      btnLimpiarRanking: document.getElementById('btn-limpiar-ranking'),
      statsContenedor: document.getElementById('stats-contenedor')
    };
  },

  /**
   * Cambia la pantalla visible ocultando las demás
   * @param {string} idPantalla
   */
  cambiarPantalla(idPantalla) {
    this.elementos.pantallas.forEach(pantalla => {
      if (pantalla.id === idPantalla) {
        pantalla.classList.remove('oculto');
        pantalla.setAttribute('aria-hidden', 'false');
        // Enfocar el primer encabezado o elemento interactivo para accesibilidad
        const foco = pantalla.querySelector('h1, h2, input, button');
        if (foco) foco.focus();
      } else {
        pantalla.classList.add('oculto');
        pantalla.setAttribute('aria-hidden', 'true');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Carga configuración guardada (tema y sonido)
   */
  aplicarConfiguracionInicial() {
    const config = window.Almacenamiento ? window.Almacenamiento.obtenerConfiguracion() : { tema: 'claro', sonido: true };
    this.aplicarTema(config.tema);
    this.aplicarSonido(config.sonido);

    // Cargar último jugador
    if (window.Almacenamiento && this.elementos.inputNombre) {
      const ultimo = window.Almacenamiento.obtenerUltimoJugador();
      if (ultimo) {
        this.elementos.inputNombre.value = ultimo;
      }
    }
  },

  aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    if (this.elementos.iconoTema) {
      this.elementos.iconoTema.textContent = tema === 'oscuro' ? '☀️' : '🌙';
      this.elementos.btnToggleTema.setAttribute('aria-label', tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
  },

  aplicarSonido(activo) {
    if (window.Sonidos) {
      window.Sonidos.setHabilitado(activo);
    }
    if (this.elementos.iconoSonido) {
      this.elementos.iconoSonido.textContent = activo ? '🔊' : '🔇';
      this.elementos.btnToggleSonido.setAttribute('aria-label', activo ? 'Silenciar sonidos' : 'Activar sonidos');
    }
  },

  /**
   * Renderiza las tarjetas de selección de categoría en la pantalla de configuración
   * @param {string} categoriaSeleccionada
   */
  renderizarSelectorCategorias(categoriaSeleccionada = 'todas') {
    if (!this.elementos.contenedorCategorias || !window.CATEGORIAS_INFO) return;

    this.elementos.contenedorCategorias.innerHTML = '';
    const categorias = Object.keys(window.CATEGORIAS_INFO);

    categorias.forEach(catKey => {
      const cat = window.CATEGORIAS_INFO[catKey];
      const tarjeta = document.createElement('button');
      tarjeta.type = 'button';
      tarjeta.className = `tarjeta-categoria ${catKey === categoriaSeleccionada ? 'seleccionada' : ''}`;
      tarjeta.dataset.categoria = catKey;
      tarjeta.setAttribute('role', 'radio');
      tarjeta.setAttribute('aria-checked', catKey === categoriaSeleccionada ? 'true' : 'false');

      tarjeta.innerHTML = `
        <span class="icono-cat" aria-hidden="true">${cat.icono}</span>
        <div class="info-cat">
          <strong class="nombre-cat">${cat.nombre}</strong>
          <span class="desc-cat">${cat.descripcion}</span>
        </div>
      `;

      tarjeta.addEventListener('click', () => {
        if (window.Sonidos) window.Sonidos.reproducirClick();
        document.querySelectorAll('.tarjeta-categoria').forEach(t => {
          t.classList.remove('seleccionada');
          t.setAttribute('aria-checked', 'false');
        });
        tarjeta.classList.add('seleccionada');
        tarjeta.setAttribute('aria-checked', 'true');
        this.actualizarRecordPreview(catKey);
      });

      this.elementos.contenedorCategorias.appendChild(tarjeta);
    });

    this.actualizarRecordPreview(categoriaSeleccionada);
  },

  /**
   * Muestra el récord personal para la categoría seleccionada
   */
  actualizarRecordPreview(categoria) {
    if (!this.elementos.recordCategoriaTexto || !window.Almacenamiento) return;
    const ranking = window.Almacenamiento.obtenerRanking();
    const partidasCat = ranking.filter(r => r.categoria === categoria);
    if (partidasCat.length > 0) {
      const mejor = partidasCat[0];
      this.elementos.recordCategoriaTexto.innerHTML = `🏆 Récord en esta categoría: <strong>${mejor.puntaje} pts</strong> por <em>${mejor.nombre}</em>`;
    } else {
      this.elementos.recordCategoriaTexto.innerHTML = `🌟 Sé el primero en fijar un récord en esta categoría.`;
    }
  },

  /**
   * Renderiza la pregunta actual en la pantalla de juego
   * @param {Object} pregunta Pregunta actual
   * @param {Object} estado Estado actual del juego
   */
  renderizarPregunta(pregunta, estado) {
    if (!pregunta) return;

    // Actualizar barra de progreso (RF-10)
    const numeroActual = estado.indiceActual + 1;
    const totalPreguntas = estado.preguntas.length;
    const porcentajeProgreso = (numeroActual / totalPreguntas) * 100;

    this.elementos.barraProgresoFill.style.width = `${porcentajeProgreso}%`;
    this.elementos.textoProgreso.textContent = `Pregunta ${numeroActual} de ${totalPreguntas}`;

    // Actualizar badges
    const catInfo = window.CATEGORIAS_INFO[pregunta.categoria] || { nombre: pregunta.categoria, icono: '🇨🇴' };
    this.elementos.tagCategoriaJuego.innerHTML = `${catInfo.icono} ${catInfo.nombre}`;
    this.elementos.tagDificultadJuego.textContent = estado.dificultad.toUpperCase();
    this.elementos.tagDificultadJuego.className = `badge-dificultad dificultad-${estado.dificultad}`;

    // Actualizar marcador
    this.elementos.puntajeActualTexto.textContent = estado.puntaje;

    // Actualizar racha
    if (estado.racha > 1) {
      this.elementos.badgeRacha.classList.remove('oculto');
      this.elementos.textoRacha.textContent = `${estado.racha}x Racha 🔥`;
    } else {
      this.elementos.badgeRacha.classList.add('oculto');
    }

    // Actualizar comodines estado
    this.actualizarBotonesComodines(estado.comodines);

    // Ocultar caja de feedback previo
    this.elementos.cajaFeedback.classList.add('oculto');
    this.elementos.cajaFeedback.classList.remove('feedback-correcto', 'feedback-incorrecto');

    // Renderizar enunciado
    this.elementos.enunciadoPregunta.textContent = pregunta.enunciado;

    // Renderizar 4 opciones mezcladas (RF-04)
    this.elementos.contenedorOpciones.innerHTML = '';
    const letras = ['A', 'B', 'C', 'D'];

    pregunta.opciones.forEach((opcionTexto, indice) => {
      const btnOpcion = document.createElement('button');
      btnOpcion.type = 'button';
      btnOpcion.className = 'btn-opcion';
      btnOpcion.dataset.indice = indice;
      btnOpcion.setAttribute('aria-label', `Opción ${letras[indice]}: ${opcionTexto}`);

      // Si fue descartada previamente por 50/50
      if (pregunta.opcionesDescartadas && pregunta.opcionesDescartadas.includes(indice)) {
        btnOpcion.classList.add('opcion-descartada');
        btnOpcion.disabled = true;
      }

      btnOpcion.innerHTML = `
        <span class="letra-opcion" aria-hidden="true">${letras[indice]}</span>
        <span class="texto-opcion">${opcionTexto}</span>
        <span class="atajo-teclado" aria-hidden="true">${indice + 1}</span>
      `;

      btnOpcion.addEventListener('click', () => {
        if (!window.Juego.estado.esperandoSiguiente) {
          window.appControlador.procesarRespuesta(indice);
        }
      });

      this.elementos.contenedorOpciones.appendChild(btnOpcion);
    });
  },

  /**
   * Actualiza el contador visual y animación del temporizador
   * @param {number} tiempoRestante
   */
  actualizarTemporizador(tiempoRestante) {
    if (!this.elementos.tiempoRestanteNumero) return;

    this.elementos.tiempoRestanteNumero.textContent = tiempoRestante;

    const timerBox = document.querySelector('.temporizador-caja');
    if (!timerBox) return;

    // Calcular circunferencia SVG
    const maxTiempo = 20;
    const radio = 36;
    const circunferencia = 2 * Math.PI * radio; // ~226.2
    const offset = circunferencia - (Math.max(0, tiempoRestante) / maxTiempo) * circunferencia;

    if (this.elementos.timerSvgCircle) {
      this.elementos.timerSvgCircle.style.strokeDashoffset = offset;
    }

    if (tiempoRestante <= 5 && tiempoRestante > 0) {
      timerBox.classList.add('tiempo-critico');
      if (window.Sonidos) {
        window.Sonidos.reproducirTicTac(true);
      }
    } else {
      timerBox.classList.remove('tiempo-critico');
    }
  },

  /**
   * Actualiza los botones de comodines (habilitados/usados)
   */
  actualizarBotonesComodines(comodines) {
    if (this.elementos.btnComodinCincuenta) {
      this.elementos.btnComodinCincuenta.disabled = !comodines.cincuenta;
      this.elementos.btnComodinCincuenta.classList.toggle('comodin-usado', !comodines.cincuenta);
    }
    if (this.elementos.btnComodinTiempo) {
      this.elementos.btnComodinTiempo.disabled = !comodines.tiempo;
      this.elementos.btnComodinTiempo.classList.toggle('comodin-usado', !comodines.tiempo);
    }
  },

  /**
   * Muestra la retroalimentación tras responder o tras agotarse el tiempo (RF-06, RF-07)
   */
  mostrarRetroalimentacion(resultado) {
    const opcionesBotones = this.elementos.contenedorOpciones.querySelectorAll('.btn-opcion');

    // Bloquear todas las opciones (RF-07)
    opcionesBotones.forEach(btn => {
      btn.disabled = true;
      const indice = parseInt(btn.dataset.indice, 10);

      // Resaltar la opción correcta siempre en verde
      if (indice === resultado.indiceCorrecto) {
        btn.classList.add('opcion-correcta');
      }

      // Si el usuario eligió una incorrecta, marcarla en rojo
      if (!resultado.esCorrecta && indice === resultado.indiceSeleccionado) {
        btn.classList.add('opcion-incorrecta');
      }
    });

    // Configurar caja de retroalimentación
    const caja = this.elementos.cajaFeedback;
    caja.classList.remove('oculto');

    if (resultado.esCorrecta) {
      caja.classList.remove('feedback-incorrecto');
      caja.classList.add('feedback-correcto');
      this.elementos.iconoFeedback.textContent = '🎉';
      this.elementos.tituloFeedback.textContent = '¡Respuesta Correcta!';

      let desglose = `+${resultado.puntosGanados} pts`;
      if (resultado.bonoRapidez > 0) {
        desglose += ` (⚡ +${resultado.bonoRapidez} rapidez)`;
      }
      if (resultado.bonoRacha > 0) {
        desglose += ` (🔥 +${resultado.bonoRacha} bono racha)`;
      }
      this.elementos.puntosGanadosFeedback.textContent = desglose;
      if (window.Sonidos) window.Sonidos.reproducirAcierto();
    } else {
      caja.classList.remove('feedback-correcto');
      caja.classList.add('feedback-incorrecto');
      this.elementos.iconoFeedback.textContent = resultado.fuePorTiempo ? '⏰' : '❌';
      this.elementos.tituloFeedback.textContent = resultado.fuePorTiempo ? '¡Tiempo Agotado!' : '¡Respuesta Incorrecta!';
      this.elementos.puntosGanadosFeedback.textContent = '+0 pts';
      if (window.Sonidos) window.Sonidos.reproducirError();
    }

    this.elementos.explicacionFeedback.textContent = resultado.explicacion;
    this.elementos.puntajeActualTexto.textContent = resultado.puntajeTotal;

    if (resultado.esUltimaPregunta) {
      this.elementos.btnSiguientePregunta.textContent = 'Ver Resultados Finales 🏆';
    } else {
      this.elementos.btnSiguientePregunta.textContent = 'Siguiente Pregunta ➡️';
    }

    // Enfocar botón siguiente para comodidad en teclado
    this.elementos.btnSiguientePregunta.focus();
  },

  /**
   * Renderiza la pantalla final de resultados (RF-11, RF-14)
   */
  mostrarResultado(resumen) {
    this.elementos.resultadoEmoji.textContent = resumen.emojiDesempeno;
    this.elementos.resultadoJugador.textContent = resumen.jugador;
    this.elementos.resultadoMensaje.textContent = resumen.mensajeDesempeno;
    this.elementos.resultadoPuntaje.textContent = `${resumen.puntaje} pts`;
    this.elementos.resultadoAciertos.textContent = `${resumen.aciertos} / ${resumen.totalPreguntas}`;
    this.elementos.resultadoPorcentaje.textContent = `${resumen.porcentajeAciertos}%`;
    this.elementos.resultadoTiempo.textContent = `${resumen.tiempoTotalEmpleado} seg`;
    this.elementos.resultadoMejorRacha.textContent = `${resumen.mejorRacha} seguidas`;
    this.elementos.resultadoComodines.textContent = `${resumen.comodinesUsados} usados`;

    // Insignia de Ranking
    if (resumen.rankingInfo && resumen.rankingInfo.esTop10) {
      this.elementos.resultadoBadgeRanking.classList.remove('oculto');
      this.elementos.resultadoBadgeRanking.innerHTML = `🎖️ ¡Felicitaciones! Entraste al <strong>Top 10</strong> en la posición <strong>#${resumen.rankingInfo.posicion}</strong>.`;
    } else {
      this.elementos.resultadoBadgeRanking.classList.add('oculto');
    }

    // Renderizar revisión de preguntas
    this.renderizarRevision(resumen.respuestasDetalle);

    if (window.Sonidos) {
      window.Sonidos.reproducirVictoria();
    }
  },

  /**
   * Renderiza el desglose detallado de preguntas en la pantalla de resultado
   */
  renderizarRevision(respuestas) {
    if (!this.elementos.listaRevisionPreguntas) return;

    this.elementos.listaRevisionPreguntas.innerHTML = '';

    respuestas.forEach((resp, idx) => {
      const item = document.createElement('div');
      item.className = `item-revision ${resp.esCorrecta ? 'revision-acierto' : 'revision-fallo'}`;

      item.innerHTML = `
        <div class="header-revision">
          <span class="badge-numero-rev">#${idx + 1}</span>
          <span class="badge-estado-rev">${resp.esCorrecta ? '✅ Correcta' : (resp.fuePorTiempo ? '⏰ Tiempo Agotado' : '❌ Incorrecta')}</span>
          <span class="pts-rev">${resp.esCorrecta ? `+${resp.puntosGanados} pts` : '0 pts'}</span>
        </div>
        <p class="enunciado-rev">${resp.enunciado}</p>
        <div class="detalle-respuestas-rev">
          <p><strong>Tu respuesta:</strong> <span class="${resp.esCorrecta ? 'texto-acierto' : 'texto-fallo'}">${resp.textoSeleccionado}</span></p>
          ${!resp.esCorrecta ? `<p><strong>Respuesta correcta:</strong> <span class="texto-acierto">${resp.textoCorrecto}</span></p>` : ''}
        </div>
        <div class="explicacion-rev">
          <small>💡 <em>${resp.explicacion}</em></small>
        </div>
      `;

      this.elementos.listaRevisionPreguntas.appendChild(item);
    });
  },

  /**
   * Renderiza la tabla del Top 10 del ranking en el modal (RF-13)
   */
  renderizarRankingModal() {
    if (!this.elementos.tbodyRanking || !window.Almacenamiento) return;

    const ranking = window.Almacenamiento.obtenerRanking();
    this.elementos.tbodyRanking.innerHTML = '';

    if (ranking.length === 0) {
      this.elementos.tbodyRanking.innerHTML = `
        <tr>
          <td colspan="5" class="td-vacio">No hay partidas registradas aún. ¡Sé el primero en jugar!</td>
        </tr>
      `;
      return;
    }

    const medallas = ['🥇', '🥈', '🥉'];

    ranking.forEach((r, idx) => {
      const fila = document.createElement('tr');
      const medalla = idx < 3 ? medallas[idx] : `#${idx + 1}`;
      const catInfo = window.CATEGORIAS_INFO[r.categoria] || { nombre: r.categoria, icono: '🇨🇴' };

      fila.innerHTML = `
        <td class="col-posicion"><strong>${medalla}</strong></td>
        <td class="col-jugador"><strong>${r.nombre}</strong></td>
        <td class="col-puntaje"><span class="badge-puntaje">${r.puntaje} pts</span></td>
        <td class="col-cat">${catInfo.icono} ${catInfo.nombre} (${r.dificultad})</td>
        <td class="col-fecha"><small>${r.fecha}</small></td>
      `;

      this.elementos.tbodyRanking.appendChild(fila);
    });
  },

  /**
   * Renderiza las estadísticas acumuladas en el modal
   */
  renderizarEstadisticasModal() {
    if (!this.elementos.statsContenedor || !window.Almacenamiento) return;

    const stats = window.Almacenamiento.obtenerEstadisticas();
    const porcentajeGlobal = stats.preguntasTotales > 0
      ? Math.round((stats.aciertosTotales / stats.preguntasTotales) * 100)
      : 0;

    let htmlCategorias = '';
    if (stats.categoriasAciertos && window.CATEGORIAS_INFO) {
      Object.keys(stats.categoriasAciertos).forEach(catKey => {
        const catData = stats.categoriasAciertos[catKey];
        const info = window.CATEGORIAS_INFO[catKey];
        const pct = catData.total > 0 ? Math.round((catData.aciertos / catData.total) * 100) : 0;

        htmlCategorias += `
          <div class="stat-barra-cat">
            <div class="label-cat">
              <span>${info ? info.icono : '🇨🇴'} ${info ? info.nombre : catKey}</span>
              <span>${catData.aciertos}/${catData.total} (${pct}%)</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      });
    }

    this.elementos.statsContenedor.innerHTML = `
      <div class="grid-stats-cards">
        <div class="card-stat">
          <span class="num-stat">${stats.partidasJugadas}</span>
          <span class="label-stat">Partidas Jugadas</span>
        </div>
        <div class="card-stat">
          <span class="num-stat">${stats.mejorPuntaje}</span>
          <span class="label-stat">Récord Máximo</span>
        </div>
        <div class="card-stat">
          <span class="num-stat">${porcentajeGlobal}%</span>
          <span class="label-stat">Efectividad General</span>
        </div>
        <div class="card-stat">
          <span class="num-stat">${stats.mejorRacha}</span>
          <span class="label-stat">Mejor Racha de Aciertos</span>
        </div>
      </div>
      <h4 class="subtitulo-stats">Efectividad por Categoría</h4>
      <div class="contenedor-barras-cat">
        ${htmlCategorias || '<p>Juega más partidas para ver estadísticas detalladas por categoría.</p>'}
      </div>
    `;
  },

  /**
   * Abre el modal de Ranking y Estadísticas
   */
  abrirModalRanking() {
    this.renderizarRankingModal();
    this.renderizarEstadisticasModal();
    this.activarTabRanking('ranking');
    this.elementos.modalRanking.classList.remove('oculto');
    this.elementos.modalRanking.setAttribute('aria-hidden', 'false');
    if (this.elementos.btnCerrarModal) this.elementos.btnCerrarModal.focus();
  },

  cerrarModalRanking() {
    this.elementos.modalRanking.classList.add('oculto');
    this.elementos.modalRanking.setAttribute('aria-hidden', 'true');
  },

  activarTabRanking(tab) {
    if (tab === 'ranking') {
      this.elementos.tabRanking.classList.add('activo');
      this.elementos.tabStats.classList.remove('activo');
      this.elementos.panelRanking.classList.remove('oculto');
      this.elementos.panelStats.classList.add('oculto');
    } else {
      this.elementos.tabStats.classList.add('activo');
      this.elementos.tabRanking.classList.remove('activo');
      this.elementos.panelStats.classList.remove('oculto');
      this.elementos.panelRanking.classList.add('oculto');
    }
  }
};

// Exportar globalmente
if (typeof window !== 'undefined') {
  window.UI = UI;
}
