# 🇨🇴 Trivia Colombia – Juego de Preguntas

[![HTML5](https://img.shields.io/badge/HTML5-Semántico-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Moderno%20%2B%20Variables-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B%20Modular-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Despliegue-Vercel-000000?logo=vercel&logoColor=white)](https://trivia-colombia-nu.vercel.app/)
[![Licencia](https://img.shields.io/badge/Licencia-Educativa%20UDES-003893)](LICENSE)

Proyecto desarrollado para el **Segundo Parcial de la Asignatura Desarrollo Full Stack** en la **Universidad de Santander (UDES)**, bajo la tutoría del docente **Carlos Carrascal**.

---

## 📌 Tabla de Contenidos

1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Características y Reglas del Juego](#-características-y-reglas-del-juego)
3. [Sistema de Puntuación](#-sistema-de-puntuación)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Tecnologías y Buenas Prácticas](#-tecnologías-y-buenas-prácticas)
6. [Instrucciones de Ejecución Local](#-instrucciones-de-ejecución-local)
7. [Despliegue en Vercel](#-despliegue-en-vercel)
8. [Diseño y Prototipado UX/UI](#-diseño-y-prototipado-uxui)
9. [Estructura del Video Explicativo (5 Minutos)](#-estructura-del-video-explicativo-5-minutos)
10. [Tabla de Entregables](#-tabla-de-entregables)

---

## 📖 Descripción del Proyecto

**Trivia Colombia** es una aplicación web interactiva de preguntas y respuestas sobre Colombia construida con **HTML5, CSS3 y JavaScript ES6+ modular**. El juego opera enteramente del lado del cliente en el navegador, almacenando las clasificaciones y estadísticas del usuario mediante la API de `localStorage`, sin requerir servidor backend ni autenticación previa.

El objetivo es educar, entretener y fomentar el orgullo patrio mediante el aprendizaje de:
- **Geografía:** Capitales, cordilleras, hidrografía, páramos y parques naturales.
- **Historia:** Gesta independentista, próceres, sucesos históricos clave y constituciones.
- **Cultura y Tradiciones:** Carnavales, literatura, música folclórica y gastronomía típica.
- **Deportes:** Glorias del ciclismo, fútbol, patinaje, halterofilia y Juegos Olímpicos.
- **Ciencia y Naturaleza:** Biodiversidad récord, científicos insignes e inventos colombianos.

---

## 🎮 Características y Reglas del Juego

1. **Identificación Obligatoria (RF-01):** El jugador ingresa su nombre antes de iniciar; el sistema valida en tiempo real y rechaza campos vacíos.
2. **Selección Personalizada (RF-02):** Permite elegir entre las 5 categorías temáticas o «Todas las Categorías», junto con el nivel de dificultad: *Fácil*, *Medio* o *Difícil*.
3. **Selección y Barajado Aleatorio (RF-03, RF-04):** Cada partida selecciona al azar 10 preguntas sin repetición mediante el algoritmo de **Fisher-Yates**, y mezcla las 4 opciones de cada pregunta asegurando imprevisibilidad.
4. **Temporizador de 20 Segundos (RF-05):** Cada pregunta cuenta con un reloj de 20 segundos con animación SVG circular y alerta visual y sonora al llegar a los últimos 5 segundos.
5. **Retroalimentación Inmediata (RF-06, RF-07):** Tras responder o expirar el tiempo, las opciones se bloquean; la correcta se resalta en verde y la errónea en rojo, acompañadas de una explicación formativa.
6. **Comodines Estratégicos (RF-09):**
   - **50 / 50:** Elimina dos opciones incorrectas al azar (uso único por partida; costo: -30 puntos).
   - **+10 Segundos:** Suma diez segundos al reloj en curso (uso único por partida; costo: -30 puntos).
7. **Barra de Progreso Dinámica (RF-10):** Visualiza la posición de la pregunta actual (ej. 3 de 10) y el avance porcentual.
8. **Resumen y Revisión de Falladas (RF-11, RF-14):** Al concluir la partida, muestra el puntaje, efectividad, tiempo total, racha máxima, mensaje según rendimiento y una revisión detallada de preguntas falladas y acertadas.
9. **Ranking y Estadísticas en LocalStorage (RF-12, RF-13):** Salón de la fama con el Top 10 ordenado de mayor a menor y estadísticas globales acumuladas, con opción para reiniciar el ranking.
10. **Accesibilidad y Atajos de Teclado:**
    - Opciones `A`, `B`, `C`, `D` mediante teclas numéricas `1`, `2`, `3`, `4`.
    - Comodín 50/50 con tecla `C`.
    - Comodín de tiempo con tecla `T`.
    - Siguiente pregunta con `Enter` o `Espacio`.
    - Cerrar modal con tecla `Escape`.
11. **Modo Claro / Modo Oscuro:** Persistente en `localStorage` con transición fluida.
12. **Sonidos Sintetizados (Web Audio API):** Audio con cero latencia sin dependencias externas, con control de silencio (On/Off).

---

## 🏆 Sistema de Puntuación

| Concepto | Puntos Asignados |
| :--- | :--- |
| **Respuesta correcta base** | `+100 puntos` |
| **Bonificación por rapidez** | `+5 puntos` por cada segundo restante (hasta `+100` adicionales) |
| **Bono por Racha de 3 aciertos** | `+50 puntos` adicionales por cada 3 respuestas correctas consecutivas |
| **Respuesta incorrecta o tiempo agotado**| `0 puntos` (y se reinicia la racha a cero) |
| **Uso de un comodín** | `-30 puntos` |
| **Multiplicador por dificultad** | **Fácil:** `x1.0` \| **Medio:** `x1.5` \| **Difícil:** `x2.0` |

*Fórmula aplicada por pregunta acertada:*  
$$\text{Puntaje} = \Big(100 + (\text{Segundos Restantes} \times 5) + \text{Bono Racha}\Big) \times \text{Multiplicador Dificultad}$$

---

## 📂 Estructura del Proyecto

Organizado de acuerdo estricto con la **Sección 8** del documento:

```
trivia-colombia/
├── index.html                  # Estructura semántica de todas las pantallas
├── css/
│   ├── styles.css              # Estilos generales, tokens de diseño y temas
│   └── responsive.css          # Media queries (360px a 1440px+)
├── js/
│   ├── app.js                  # Punto de entrada, controladores y eventos
│   ├── juego.js                # Lógica del juego: preguntas, tiempo, comodines y puntaje
│   ├── preguntas.js            # Banco de 60 preguntas verificadas por categoría/dificultad
│   ├── ui.js                   # Renderizado y manipulación del DOM
│   ├── almacenamiento.js       # Persistencia de ranking y estadísticas en localStorage
│   └── sonidos.js              # Efectos de sonido sintetizados con Web Audio API
├── assets/
│   ├── img/                    # Logotipo oficial SVG, insignias y trofeos
│   └── sonidos/                # Documentación de efectos auditivos
├── docs/
│   └── diseno/                 # Guía de estilos, wireframes y prototipo navegable
└── README.md                   # Documentación integral del proyecto
```

---

## 🛠️ Tecnologías y Buenas Prácticas

- **HTML5:** Marcado semántico (`<header>`, `<main>`, `<section>`, `<dialog>`, `<footer>`), atributos ARIA (`aria-live`, `aria-checked`, `role="progressbar"`).
- **CSS3:** Variables nativas (`custom properties`), Flexbox, CSS Grid, Media Queries, diseño adaptativo fluido (*mobile-first*).
- **JavaScript Moderno (ES6+):** Programación modular sin dependencias externas, manipulación limpia del DOM, `localStorage`, `AudioContext` de la Web Audio API y algoritmo Fisher-Yates.
- **Rendimiento:** Carga ultrarrápida sin frameworks pesados, optimizado para métricas Core Web Vitals (LCP, INP, CLS).

---

## 💻 Instrucciones de Ejecución Local

### Opción 1: Visual Studio Code con Live Server (Recomendada)
1. Clona o descarga este repositorio en tu equipo:
   ```bash
   git clone https://github.com/JanerBus/trivia-colombia.git
   ```
2. Abre la carpeta del proyecto en **Visual Studio Code**.
3. Haz clic derecho sobre el archivo `index.html` y selecciona **«Open with Live Server»**.
4. La aplicación se abrirá automáticamente en tu navegador en `http://127.0.0.1:5500/`.

### Opción 2: Ejecución Directa en el Navegador
Dado que el proyecto utiliza JavaScript nativo y no requiere dependencias de Node.js en tiempo de ejecución:
1. Haz doble clic directamente sobre `index.html`.
2. Se abrirá en cualquier navegador moderno (Chrome, Edge, Firefox, Safari).

---

## 🚀 Despliegue en Vercel

El proyecto está listo para su despliegue en la nube con **Vercel**:
1. Conecta el repositorio de GitHub con tu cuenta en [Vercel](https://vercel.com).
2. Selecciona la carpeta raíz del repositorio.
3. El framework preset se detectará automáticamente como **Other** (HTML estático).
4. Haz clic en **Deploy**.
5. Tu URL pública estará activa inmediatamente: `https://trivia-colombia-nu.vercel.app/`

---

## 🎨 Diseño y Prototipado UX/UI

En cumplimiento de las **Secciones 7 y 17.1**:
- Consulta la **Guía de Estilos** completa en [`docs/diseno/guia-de-estilos.md`](docs/diseno/guia-de-estilos.md).
- Abre el **Prototipo y Wireframes Navegables** en [`docs/diseno/prototipo-navegable.html`](docs/diseno/prototipo-navegable.html).
- Enlace al tablero oficial de diseño en Figma: [Ver Proyecto en Figma](https://www.figma.com/design/KYYLyikCCjNkgyWIoomCrJ/Sin-t%C3%ADtulo?node-id=3-1521&t=qr1yn2kBIGjT7jMk-1)

---

## 🎥 Estructura del Video Explicativo (5 Minutos)

Para dar cumplimiento riguroso a la **Sección 17.4 del documento**:

> **Requisito obligatorio:** El estudiante debe aparecer mostrando su rostro con la cámara encendida durante todo el video (ejemplo: recuadro inferior mientras comparte pantalla) y explicar con su propia voz natural.

| Minutos | Segmento | Contenido a Explicar |
| :---: | :--- | :--- |
| **0:00 – 0:30** | **Presentación** | Rostro visible, saludo formal, nombre del estudiante, materia (Desarrollo Full Stack - UDES), docente (Carlos Carrascal) y propósito del proyecto. |
| **0:30 – 1:30** | **Recorrido por el Diseño** | Mostrar Figma ([enlace al tablero](https://www.figma.com/design/KYYLyikCCjNkgyWIoomCrJ/Sin-t%C3%ADtulo?node-id=3-1521&t=qr1yn2kBIGjT7jMk-1)) o `docs/diseno/prototipo-navegable.html`: guía de estilos, paleta de colores, tipografías, wireframes y mockups responsive. |
| **1:30 – 2:30** | **Demostración en Vercel** | Demostración en vivo de la aplicación desplegada: ingreso de nombre, selección de categoría y dificultad, juego de preguntas, uso de comodines y visualización de resultados. |
| **2:30 – 4:00** | **Explicación del Código** | Recorrido por el código fuente: estructura de `js/preguntas.js`, algoritmo Fisher-Yates en `js/juego.js`, temporizador con `setInterval`, sistema de puntuación y persistencia en `js/almacenamiento.js`. |
| **4:00 – 4:30** | **Repositorio GitHub** | Mostrar el repositorio público en GitHub, la estructura de carpetas y el historial de commits frecuentes y descriptivos. |
| **4:30 – 5:00** | **Dificultades y Conclusiones** | Dificultades encontradas durante el desarrollo (manejo del temporizador, mezcla de opciones manteniendo la correcta), cómo se resolvieron y conclusiones finales. |

---

## 📋 Tabla de Entregables (Sección 17.5)

| Entregable | Enlace / Ubicación |
| :--- | :--- |
| **Diseño (Figma / MockFlow)** | [Figma: Trivia Colombia](https://www.figma.com/design/KYYLyikCCjNkgyWIoomCrJ/Sin-t%C3%ADtulo?node-id=3-1521&t=qr1yn2kBIGjT7jMk-1) (o en `docs/diseno/`) |
| **Repositorio en GitHub** | `https://github.com/JanerBus/trivia-colombia` |
| **Despliegue en Vercel** | [https://trivia-colombia-nu.vercel.app/](https://trivia-colombia-nu.vercel.app/) |
| **Video Explicativo** | `https://youtu.be/...` *(o enlace a Google Drive con acceso público)* |

---

*Desarrollado con dedicación para el Segundo Parcial de Desarrollo Full Stack - UDES.*
