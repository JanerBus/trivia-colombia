# Guía de Estilos de Diseño - Trivia Colombia

> **Asignatura:** Desarrollo Full Stack  
> **Institución:** Universidad de Santander (UDES)  
> **Docente:** Carlos Carrascal  
> **Proyecto:** Trivia Colombia – Juego de Preguntas  
> **Diseño Oficial en Figma:** [Abrir Tablero de Figma](https://www.figma.com/design/KYYLyikCCjNkgyWIoomCrJ/Sin-t%C3%ADtulo?node-id=3-1521&t=qr1yn2kBIGjT7jMk-1)  
> **Fecha:** Octubre de 2026  

---

## 1. Fundamentos Visuales y Concepto de Marca

El diseño de **Trivia Colombia** está concebido bajo una estética moderna, lúdica, accesible y patriótica. Rinde homenaje a la identidad y riqueza geográfica, histórica y cultural de Colombia a través de un tratamiento refinado de los colores patrios, acompañado de superficies limpias, sombras con elevación natural y tipografías con alta legibilidad.

---

## 2. Paleta de Colores Oficial

### 2.1 Colores Principales (Inspiración Tricolor y Acentos)

| Color | Nombre Token | Hexadecimal | RGB | Uso Principal |
| :--- | :--- | :--- | :--- | :--- |
| ![#FCD116](https://via.placeholder.com/15/FCD116/000000?text=+) | Amarillo Colombia | `#FCD116` | `rgb(252, 209, 22)` | Botones de acción primaria, medallas, acentos destacados. |
| ![#003893](https://via.placeholder.com/15/003893/000000?text=+) | Azul Nacional | `#003893` | `rgb(0, 56, 147)` | Encabezados, tarjetas activas, bordes de selección. |
| ![#CE1126](https://via.placeholder.com/15/CE1126/000000?text=+) | Rojo Alerta | `#CE1126` | `rgb(206, 17, 38)` | Errores, respuestas incorrectas, tiempo crítico (<5s). |
| ![#2E9E5B](https://via.placeholder.com/15/2E9E5B/000000?text=+) | Verde Acierto | `#2E9E5B` | `rgb(46, 158, 91)` | Respuestas correctas, éxito, bonificaciones y aciertos. |

### 2.2 Tema Claro (Modo Light)

| Token | Hexadecimal | Propósito |
| :--- | :--- | :--- |
| `--bg-cuerpo` | `#F8FAFC` | Fondo de la aplicación |
| `--bg-tarjeta` | `#FFFFFF` | Superficie de pantallas y tarjetas |
| `--bg-tarjeta-alt` | `#F1F5F9` | Superficie secundaria, inputs y opciones |
| `--texto-principal`| `#0F172A` | Títulos y enunciados (Contraste 13.8:1) |
| `--texto-secundario`| `#475569` | Descripciones y apoyos (Contraste 7.2:1) |
| `--borde-suave` | `#E2E8F0` | Líneas divisorias y marcos |

### 2.3 Tema Oscuro (Modo Dark)

| Token | Hexadecimal | Propósito |
| :--- | :--- | :--- |
| `--bg-cuerpo` | `#0B132B` | Fondo de la aplicación oscuro |
| `--bg-tarjeta` | `#1C2541` | Superficie de pantallas oscuras |
| `--bg-tarjeta-alt` | `#232F55` | Superficie de controles y opciones |
| `--texto-principal`| `#F8FAFC` | Títulos y texto claro (Contraste 14.5:1) |
| `--texto-secundario`| `#CBD5E1` | Descripciones secundarias |
| `--borde-suave` | `#334155` | Bordes en modo nocturno |

---

## 3. Tipografía

### 3.1 Familias Tipográficas
1. **Familia para Títulos y Números:**  
   `font-family: 'Montserrat', sans-serif;`  
   *Pesos:* 700 (Bold), 800 (ExtraBold), 900 (Black).  
   *Uso:* Logotipo, títulos de pantalla, enunciados de preguntas, temporizador y puntajes.

2. **Familia para Textos y UI:**  
   `font-family: 'Poppins', sans-serif;`  
   *Pesos:* 400 (Regular), 500 (Medium), 600 (SemiBold).  
   *Uso:* Párrafos, opciones de respuesta, botones, tablas y etiquetas de formulario.

### 3.2 Escala Tipográfica (Escritorio vs Móvil)

| Elemento | Tamaño Escritorio | Tamaño Móvil | Peso | Line-Height |
| :--- | :--- | :--- | :--- | :--- |
| H1 (Título Inicio) | `2.25rem` (36px) | `1.5rem` (24px) | 800 | 1.2 |
| H2 (Enunciado / Subtítulo) | `1.45rem` (23px) | `1.15rem` (18px)| 700 | 1.35 |
| H3 (Títulos de Bloque) | `1.15rem` (18px) | `1.0rem` (16px) | 700 | 1.4 |
| Texto Opciones | `1.0rem` (16px) | `0.95rem` (15px)| 500 | 1.4 |
| Marcadores / Puntajes | `1.35rem` (22px) | `1.15rem` (18px)| 800 | 1.0 |
| Temporizador Número | `1.5rem` (24px) | `1.25rem` (20px)| 800 | 1.0 |
| Texto Auxiliar / Badges | `0.85rem` (13px) | `0.75rem` (12px)| 600 | 1.2 |

---

## 4. Componentes y Estados de Botones

Para asegurar cumplimiento de los requerimientos de la Sección 7.1 y normas WCAG 2.1 AA:

### 4.1 Estados del Botón de Opción (`.btn-opcion`)

1. **Normal:**
   - Fondo: `#F1F5F9` (Claro) / `#232F55` (Oscuro).
   - Borde: 2px `#E2E8F0`.
   - Altura mínima: 60px (48px en móvil) para target táctil óptimo.
   - Letra con círculo identificador (A, B, C, D) y atajo numérico visible.

2. **Hover:**
   - Borde: 2px `#003893`.
   - Fondo: `rgba(0, 56, 147, 0.1)`.
   - Transformación: `translateY(-2px)`.

3. **Focus-Visible (Navegación por Teclado):**
   - Outline: 3px sólido `#003893` con offset de 2px.

4. **Respuesta Correcta:**
   - Fondo: `#2E9E5B` (Verde).
   - Borde: 2px `#2E9E5B`.
   - Color de texto: `#FFFFFF`.
   - Sombra: `0 4px 14px rgba(46, 158, 91, 0.4)`.

5. **Respuesta Incorrecta (Seleccionada):**
   - Fondo: `#CE1126` (Rojo).
   - Borde: 2px `#CE1126`.
   - Color de texto: `#FFFFFF`.
   - Animación: `shake` horizontal de 0.4s.

6. **Deshabilitada / Descartada por Comodín 50/50:**
   - Opacidad: 0.25.
   - Borde punteado (dashed).
   - Texto tachado (`text-decoration: line-through`).
   - Cursor: `not-allowed`.

---

## 5. Cuadrículas y Breakpoints Responsive

- **Móvil Pequeño:** 360px a 480px (1 columna, tarjetas apiladas, touch targets amplios).
- **Móvil / Tablet:** 481px a 860px (2 columnas en categorías, navegación compacta).
- **Escritorio Estándar:** 861px a 1200px (Contenedor centrado max-width: 960px).
- **Escritorio Amplio (Figma 1440px):** 1440px+ (Contenedor amplio max-width: 1120px, fuentes y espaciado proporcional).
