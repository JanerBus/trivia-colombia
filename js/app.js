/**
 * Trivia Colombia - Controlador Principal de la Aplicación
 * Orquesta la navegación, el ciclo de vida del juego, los eventos del DOM,
 * atajos de teclado y la integración entre módulos.
 * 
 * Cumple con RF-01 a RF-14, RNF-01 a RNF-07 y Sección 8 y 14.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Interfaz
  UI.inicializar();

  // Objeto controlador accesible globalmente
  const appControlador = {
    categoriaSeleccionada: 'todas',
    dificultadSeleccionada: 'medio',

    /**
     * Valida el nombre y avanza a la configuración de la partida (RF-01)
     */
    validarYAvanzarConfiguracion() {
      const nombreInput = UI.elementos.inputNombre.value.trim();

      if (!nombreInput) {
        UI.elementos.errorNombre.textContent = '⚠️ Por favor escribe tu nombre para comenzar.';
        UI.elementos.errorNombre.classList.remove('oculto');
        UI.elementos.inputNombre.focus();
        if (window.Sonidos) window.Sonidos.reproducirError();
        return;
      }

      UI.elementos.errorNombre.classList.add('oculto');
      UI.elementos.nombreJugadorConfig.textContent = nombreInput;

      // Renderizar categorías disponibles
      UI.renderizarSelectorCategorias(this.categoriaSeleccionada);

      // Cargar dificultad previa si fue seleccionada
      const radioDificultad = document.querySelector(`input[name="dificultad"][value="${this.dificultadSeleccionada}"]`);
      if (radioDificultad) radioDificultad.checked = true;

      if (window.Sonidos) window.Sonidos.reproducirClick();
      UI.cambiarPantalla('pantalla-configuracion');
    },

    /**
     * Inicia una nueva partida con los filtros elegidos (RF-02, RF-03)
     */
    comenzarPartida() {
      const nombre = UI.elementos.inputNombre.value.trim();
      const tarjetaSeleccionada = document.querySelector('.tarjeta-categoria.seleccionada');
      this.categoriaSeleccionada = tarjetaSeleccionada ? tarjetaSeleccionada.dataset.categoria : 'todas';

      const radioDificultad = document.querySelector('input[name="dificultad"]:checked');
      this.dificultadSeleccionada = radioDificultad ? radioDificultad.value : 'medio';

      try {
        const estadoInicial = Juego.iniciarPartida(nombre, this.categoriaSeleccionada, this.dificultadSeleccionada);
        UI.cambiarPantalla('pantalla-juego');
        this.cargarPreguntaActual();
      } catch (err) {
        alert(err.message);
      }
    },

    /**
     * Carga y muestra la pregunta actual e inicia el reloj
     */
    cargarPreguntaActual() {
      const pregunta = Juego.obtenerPreguntaActual();
      if (!pregunta) {
        this.finalizarPartida();
        return;
      }

      UI.renderizarPregunta(pregunta, Juego.estado);

      // Iniciar el temporizador de 20 segundos (RF-05)
      Juego.iniciarTemporizador(
        (segundosRestantes) => {
          UI.actualizarTemporizador(segundosRestantes);
        },
        () => {
          // Timeout: se agota el tiempo (RF-05, RF-06)
          this.procesarRespuesta(null);
        }
      );
    },

    /**
     * Procesa la respuesta enviada por clic o teclado
     * @param {number|null} indiceOpcion
     */
    procesarRespuesta(indiceOpcion) {
      if (Juego.estado.esperandoSiguiente) return;

      const resultado = Juego.responder(indiceOpcion);
      if (resultado) {
        UI.mostrarRetroalimentacion(resultado);
      }
    },

    /**
     * Avanza a la siguiente pregunta o finaliza la partida si era la décima
     */
    siguientePregunta() {
      if (window.Sonidos) window.Sonidos.reproducirClick();

      if (Juego.avanzarSiguientePregunta()) {
        this.cargarPreguntaActual();
      } else {
        this.finalizarPartida();
      }
    },

    /**
     * Aplica comodín solicitado (RF-09)
     */
    aplicarComodin(tipo) {
      const res = Juego.usarComodin(tipo);
      if (res.exito) {
        if (window.Sonidos) window.Sonidos.reproducirComodin();
        UI.actualizarBotonesComodines(Juego.estado.comodines);
        UI.elementos.puntajeActualTexto.textContent = res.nuevoPuntaje;

        if (tipo === 'cincuenta') {
          // Deshabilitar visualmente las 2 opciones descartadas
          res.opcionesDescartadas.forEach(idx => {
            const btn = UI.elementos.contenedorOpciones.querySelector(`.btn-opcion[data-indice="${idx}"]`);
            if (btn) {
              btn.classList.add('opcion-descartada');
              btn.disabled = true;
            }
          });
        } else if (tipo === 'tiempo') {
          UI.actualizarTemporizador(res.nuevoTiempo);
        }
      } else {
        alert(res.mensaje);
      }
    },

    /**
     * Finaliza la partida, computa puntajes y guarda en ranking local (RF-11, RF-12)
     */
    finalizarPartida() {
      const resumen = Juego.finalizarPartida();
      UI.mostrarResultado(resumen);
      UI.cambiarPantalla('pantalla-resultado');
    },

    /**
     * Reinicia para jugar una nueva partida
     */
    jugarDeNuevo() {
      if (window.Sonidos) window.Sonidos.reproducirClick();
      this.comenzarPartida();
    },

    /**
     * Regresa a la pantalla de configuración o inicio
     */
    irAInicio() {
      if (window.Sonidos) window.Sonidos.reproducirClick();
      Juego.detenerTemporizador();
      UI.cambiarPantalla('pantalla-inicio');
    }
  };

  window.appControlador = appControlador;

  // ========================================================
  // ASIGNACIÓN DE EVENTOS EN EL DOM
  // ========================================================

  // 1. Cabecera (Tema y Sonido)
  UI.elementos.btnToggleTema.addEventListener('click', () => {
    const temaActual = document.documentElement.getAttribute('data-theme') || 'claro';
    const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
    UI.aplicarTema(nuevoTema);
    Almacenamiento.guardarConfiguracion({ tema: nuevoTema });
    if (window.Sonidos) window.Sonidos.reproducirClick();
  });

  UI.elementos.btnToggleSonido.addEventListener('click', () => {
    const config = Almacenamiento.obtenerConfiguracion();
    const nuevoSonido = !config.sonido;
    UI.aplicarSonido(nuevoSonido);
    Almacenamiento.guardarConfiguracion({ sonido: nuevoSonido });
    if (nuevoSonido && window.Sonidos) {
      window.Sonidos.reproducirClick();
    }
  });

  // 2. Pantalla de Inicio
  UI.elementos.btnIrConfiguracion.addEventListener('click', () => {
    appControlador.validarYAvanzarConfiguracion();
  });

  UI.elementos.inputNombre.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      appControlador.validarYAvanzarConfiguracion();
    }
  });

  UI.elementos.btnVerInstrucciones.addEventListener('click', () => {
    if (window.Sonidos) window.Sonidos.reproducirClick();
    UI.cambiarPantalla('pantalla-instrucciones');
  });

  UI.elementos.btnVerRanking.addEventListener('click', () => {
    if (window.Sonidos) window.Sonidos.reproducirClick();
    UI.abrirModalRanking();
  });

  // 3. Pantalla de Instrucciones
  UI.elementos.btnVolverDeInstrucciones.addEventListener('click', () => {
    if (window.Sonidos) window.Sonidos.reproducirClick();
    UI.cambiarPantalla('pantalla-inicio');
  });

  UI.elementos.btnJugarDesdeInstrucciones.addEventListener('click', () => {
    appControlador.validarYAvanzarConfiguracion();
  });

  // 4. Pantalla de Configuración
  UI.elementos.btnComenzarPartida.addEventListener('click', () => {
    appControlador.comenzarPartida();
  });

  UI.elementos.btnVolverConfiguracion.addEventListener('click', () => {
    if (window.Sonidos) window.Sonidos.reproducirClick();
    UI.cambiarPantalla('pantalla-inicio');
  });

  // Cambio de dificultad
  document.querySelectorAll('input[name="dificultad"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      appControlador.dificultadSeleccionada = e.target.value;
      if (window.Sonidos) window.Sonidos.reproducirClick();
    });
  });

  // 5. Pantalla de Juego
  UI.elementos.btnComodinCincuenta.addEventListener('click', () => {
    appControlador.aplicarComodin('cincuenta');
  });

  UI.elementos.btnComodinTiempo.addEventListener('click', () => {
    appControlador.aplicarComodin('tiempo');
  });

  UI.elementos.btnSiguientePregunta.addEventListener('click', () => {
    appControlador.siguientePregunta();
  });

  // 6. Pantalla de Resultados
  UI.elementos.btnJugarDeNuevo.addEventListener('click', () => {
    appControlador.jugarDeNuevo();
  });

  UI.elementos.btnResultadoVerRanking.addEventListener('click', () => {
    if (window.Sonidos) window.Sonidos.reproducirClick();
    UI.abrirModalRanking();
  });

  UI.elementos.btnVolverInicio.addEventListener('click', () => {
    appControlador.irAInicio();
  });

  UI.elementos.btnVerRevisionFalladas.addEventListener('click', () => {
    const contenedor = UI.elementos.contenedorRevisionFalladas;
    const estaOculto = contenedor.classList.contains('oculto');
    if (estaOculto) {
      contenedor.classList.remove('oculto');
      UI.elementos.btnVerRevisionFalladas.textContent = 'Ocultar Revisión de Preguntas ▲';
    } else {
      contenedor.classList.add('oculto');
      UI.elementos.btnVerRevisionFalladas.textContent = 'Ver Revisión de Preguntas ▼';
    }
  });

  // 7. Modal de Ranking & Estadísticas
  UI.elementos.btnCerrarModal.addEventListener('click', () => {
    UI.cerrarModalRanking();
  });

  UI.elementos.tabRanking.addEventListener('click', () => {
    UI.activarTabRanking('ranking');
  });

  UI.elementos.tabStats.addEventListener('click', () => {
    UI.activarTabRanking('stats');
  });

  UI.elementos.btnLimpiarRanking.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas borrar todos los registros del ranking local? Esta acción no se puede deshacer.')) {
      Almacenamiento.limpiarRanking();
      UI.renderizarRankingModal();
      UI.renderizarEstadisticasModal();
    }
  });

  // Cerrar modal al hacer clic en el backdrop
  UI.elementos.modalRanking.addEventListener('click', (e) => {
    if (e.target === UI.elementos.modalRanking) {
      UI.cerrarModalRanking();
    }
  });

  // 8. Atajos de Teclado Globales (Accesibilidad)
  document.addEventListener('keydown', (e) => {
    // Si modal está abierto, cerrar con Escape
    if (!UI.elementos.modalRanking.classList.contains('oculto')) {
      if (e.key === 'Escape') {
        UI.cerrarModalRanking();
      }
      return;
    }

    // Si estamos en la pantalla de juego
    if (!UI.elementos.pantallaJuego.classList.contains('oculto')) {
      // Si la pregunta ya fue respondida y se muestra el botón siguiente
      if (Juego.estado.esperandoSiguiente) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          appControlador.siguientePregunta();
        }
        return;
      }

      // Si la pregunta está activa y no se ha respondido
      // Opciones 1, 2, 3, 4
      if (['1', '2', '3', '4'].includes(e.key)) {
        const indice = parseInt(e.key, 10) - 1;
        const btn = UI.elementos.contenedorOpciones.querySelector(`.btn-opcion[data-indice="${indice}"]`);
        if (btn && !btn.disabled) {
          appControlador.procesarRespuesta(indice);
        }
      }

      // Atajo comodín 50/50: tecla 'C' o '5'
      if (e.key.toLowerCase() === 'c' || e.key === '5') {
        if (Juego.estado.comodines.cincuenta) {
          appControlador.aplicarComodin('cincuenta');
        }
      }

      // Atajo comodín tiempo: tecla 'T'
      if (e.key.toLowerCase() === 't') {
        if (Juego.estado.comodines.tiempo) {
          appControlador.aplicarComodin('tiempo');
        }
      }
    }
  });
});
