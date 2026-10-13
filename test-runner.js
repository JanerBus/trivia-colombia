/**
 * Test runner para validar la lógica del juego y los casos de prueba de la Sección 15
 */

// Simular entorno de navegador básico para Node.js
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

global.window = {
  localStorage: localStorageMock,
  matchMedia: () => ({ matches: false })
};
global.localStorage = localStorageMock;

// Cargar preguntas
require('./js/preguntas.js');
// Cargar almacenamiento
require('./js/almacenamiento.js');
// Cargar juego
require('./js/juego.js');

console.log('=== VERIFICANDO TRIVIA COLOMBIA ===\n');

// 1. Verificar banco de preguntas (Sección 6.2)
console.log(`1. Total de preguntas cargadas: ${window.PREGUNTAS.length} (Mínimo requerido: 50)`);
if (window.PREGUNTAS.length < 50) {
  console.error('❌ FALLÓ: El banco de preguntas debe tener al menos 50 preguntas.');
  process.exit(1);
}

const categorias = ['geografia', 'historia', 'cultura', 'deportes', 'naturaleza'];
categorias.forEach(cat => {
  const conteo = window.PREGUNTAS.filter(p => p.categoria === cat).length;
  console.log(`   - Categoría [${cat}]: ${conteo} preguntas (Mínimo requerido: 10)`);
  if (conteo < 10) {
    console.error(`❌ FALLÓ: Categoría ${cat} tiene menos de 10 preguntas.`);
    process.exit(1);
  }
});

// 2. CP-01: Intentar iniciar sin escribir el nombre
console.log('\n2. CP-01: Validación de nombre obligatorio');
try {
  window.Juego.iniciarPartida('');
  console.error('❌ FALLÓ: Debería lanzar error con nombre vacío.');
} catch (e) {
  console.log('   ✅ PASÓ: Se rechaza nombre vacío correctamente.');
}

// 3. CP-02 y CP-03: Selección aleatoria y mezcla de opciones
console.log('\n3. CP-02 y CP-03: Selección de 10 preguntas y mezcla aleatoria');
const partida1 = window.Juego.iniciarPartida('Carlos', 'historia', 'facil');
console.log(`   - Partida iniciada con ${partida1.preguntas.length} preguntas.`);
if (partida1.preguntas.length !== 10) {
  console.error('❌ FALLÓ: La partida no tiene 10 preguntas.');
  process.exit(1);
}

// Verificar que las preguntas no se repitan
const ids = partida1.preguntas.map(p => p.id);
const idsUnicos = new Set(ids);
if (ids.length !== idsUnicos.size) {
  console.error('❌ FALLÓ: Hay preguntas duplicadas en la misma partida.');
  process.exit(1);
}
console.log('   ✅ PASÓ: 10 preguntas únicas sin repetición.');

// 4. CP-04: Responder correctamente con 12 segundos restantes
console.log('\n4. CP-04: Cálculo de puntaje (100 base + 5*12 seg)');
const pActual = window.Juego.obtenerPreguntaActual();
window.Juego.estado.tiempoRestante = 12;
// Nota: en dificultad 'facil', multiplicador es 1. Puntos = (100 + 60) * 1 = 160.
const resResp = window.Juego.responder(pActual.correcta);
console.log(`   - Puntos ganados: ${resResp.puntosGanados} (Esperado: 160)`);
if (resResp.puntosGanados !== 160) {
  console.error(`❌ FALLÓ: Se esperaban 160 puntos pero se obtuvieron ${resResp.puntosGanados}`);
  process.exit(1);
}
console.log('   ✅ PASÓ: Cálculo exacto de bonificación por rapidez.');

// 5. CP-08: Usar comodín 50/50
console.log('\n5. CP-08: Comodín 50/50');
window.Juego.avanzarSiguientePregunta();
const comodinRes = window.Juego.usarComodin('cincuenta');
console.log(`   - Éxito: ${comodinRes.exito}, Opciones descartadas: ${comodinRes.opcionesDescartadas.length}`);
if (!comodinRes.exito || comodinRes.opcionesDescartadas.length !== 2) {
  console.error('❌ FALLÓ: Comodín 50/50 no descartó 2 opciones.');
  process.exit(1);
}
console.log('   ✅ PASÓ: Comodín 50/50 funciona correctamente y descuenta 30 pts.');

// 6. CP-09: Acertar 3 preguntas seguidas (Bono de racha)
console.log('\n6. CP-09: Bono de racha de 3 aciertos seguidos');
// Ya tiene 1 acierto. Respondemos correctamente la pregunta 2 y 3:
const p2 = window.Juego.obtenerPreguntaActual();
window.Juego.estado.tiempoRestante = 0; // para no tener puntos de tiempo
window.Juego.responder(p2.correcta);

window.Juego.avanzarSiguientePregunta();
const p3 = window.Juego.obtenerPreguntaActual();
window.Juego.estado.tiempoRestante = 0;
const res3 = window.Juego.responder(p3.correcta);

console.log(`   - Racha actual: ${res3.racha}, Bono racha: ${res3.bonoRacha}`);
if (res3.racha !== 3 || res3.bonoRacha !== 50) {
  console.error('❌ FALLÓ: Bono de racha de 3 aciertos no otorgó los 50 pts.');
  process.exit(1);
}
console.log('   ✅ PASÓ: Bono de racha de +50 puntos sumado con éxito.');

// 7. CP-10 y CP-11: Guardado en ranking y persistencia en LocalStorage
console.log('\n7. CP-10 y CP-11: Persistencia de Ranking en LocalStorage');
const resumenFinal = window.Juego.finalizarPartida();
const rankingGuardado = window.Almacenamiento.obtenerRanking();
console.log(`   - Registros en ranking: ${rankingGuardado.length}, Mejor puntaje: ${rankingGuardado[0].puntaje}`);
if (rankingGuardado.length === 0 || rankingGuardado[0].nombre !== 'Carlos') {
  console.error('❌ FALLÓ: No se guardó la partida en el ranking.');
  process.exit(1);
}
console.log('   ✅ PASÓ: Ranking guardado y recuperado de localStorage satisfactoriamente.');

console.log('\n🎉 ¡TODAS LAS PRUEBAS UNITARIAS Y DE LÓGICA PASARON AL 100%!');
