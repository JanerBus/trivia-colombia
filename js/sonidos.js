/**
 * Trivia Colombia - Módulo de Sonidos con Web Audio API
 * Genera efectos de sonido armónicos y sintetizados nativamente en el navegador.
 * No depende de descargas de archivos externos, funcionando con latencia cero
 * y sin errores de red en local o Vercel.
 */

const Sonidos = {
  audioCtx: null,
  habilitado: true,

  /**
   * Inicializa o reanuda el AudioContext en el primer gesto del usuario
   */
  iniciarContexto() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  setHabilitado(valor) {
    this.habilitado = Boolean(valor);
  },

  /**
   * Efecto de acierto: acorde alegre y brillante (Do - Mi - Sol - Do agudo)
   */
  reproducirAcierto() {
    if (!this.habilitado) return;
    this.iniciarContexto();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const notas = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notas.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.36);
    });
  },

  /**
   * Efecto de error o tiempo agotado: tono suave descendente
   */
  reproducirError() {
    if (!this.habilitado) return;
    this.iniciarContexto();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.32);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  },

  /**
   * Efecto de tic-tac para el temporizador en los últimos 5 segundos
   */
  reproducirTicTac(urgente = false) {
    if (!this.habilitado) return;
    this.iniciarContexto();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(urgente ? 880 : 660, now);

    gain.gain.setValueAtTime(urgente ? 0.12 : 0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  },

  /**
   * Efecto al activar un comodín: arpegio mágico rápido
   */
  reproducirComodin() {
    if (!this.habilitado) return;
    this.iniciarContexto();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const notas = [440, 554.37, 659.25, 880, 1108.73];

    notas.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.12, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.23);
    });
  },

  /**
   * Fanfarria de victoria o fin de partida
   */
  reproducirVictoria() {
    if (!this.habilitado) return;
    this.iniciarContexto();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const notas = [523.25, 659.25, 783.99, 1046.50, 1318.51];

    notas.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.18, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.46);
    });
  },

  /**
   * Clic sutil para botones
   */
  reproducirClick() {
    if (!this.habilitado) return;
    this.iniciarContexto();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }
};

// Exportar globalmente
if (typeof window !== 'undefined') {
  window.Sonidos = Sonidos;
}
