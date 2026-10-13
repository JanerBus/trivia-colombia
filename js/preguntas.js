/**
 * Trivia Colombia - Banco de Preguntas
 * Contiene 60 preguntas divididas en 5 categorías y 3 niveles de dificultad.
 * Cumple con los requerimientos de la Sección 6.2 y 13 del proyecto.
 */

const PREGUNTAS = [
  // ========================================================
  // CATEGORÍA: GEOGRAFÍA (12 preguntas)
  // ========================================================
  {
    id: 1,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Santander?',
    opciones: ['Floridablanca', 'Bucaramanga', 'Girón', 'Barrancabermeja'],
    correcta: 1,
    explicacion: 'Bucaramanga es la capital de Santander y es conocida como la "Ciudad Bonita".'
  },
  {
    id: 2,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuántos océanos bañan las costas de Colombia?',
    opciones: ['Uno (solo Atlántico)', 'Dos (Atlántico y Pacífico)', 'Tres', 'Ninguno'],
    correcta: 1,
    explicacion: 'Colombia es el único país de América del Sur con costas en el océano Atlántico (mar Caribe) y en el océano Pacífico.'
  },
  {
    id: 3,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital de Colombia?',
    opciones: ['Medellín', 'Cali', 'Bogotá D.C.', 'Cartagena'],
    correcta: 2,
    explicacion: 'Bogotá D.C. es la capital y la ciudad más grande de la República de Colombia.'
  },
  {
    id: 4,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿En cuántas cordilleras se dividen los Andes al ingresar a Colombia?',
    opciones: ['En dos', 'En tres (Occidental, Central y Oriental)', 'En cuatro', 'En una sola'],
    correcta: 1,
    explicacion: 'La cordillera de los Andes se bifurca en el Nudo de los Pastos y el Macizo Colombiano en tres ramales: Occidental, Central y Oriental.'
  },
  {
    id: 5,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el principal río de Colombia, que recorre el país de sur a norte?',
    opciones: ['Río Cauca', 'Río Magdalena', 'Río Amazonas', 'Río Sinú'],
    correcta: 1,
    explicacion: 'El río Magdalena es la principal arteria fluvial del país y nace en el Macizo Colombiano.'
  },
  {
    id: 6,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el páramo más grande del mundo, ubicado en Colombia?',
    opciones: ['Páramo de Santurbán', 'Páramo de Chingaza', 'Páramo de Sumapaz', 'Páramo de Ocetá'],
    correcta: 2,
    explicacion: 'El Páramo de Sumapaz, ubicado entre Cundinamarca, Meta y Huila, es considerado el páramo más grande del planeta.'
  },
  {
    id: 7,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el punto continental más septentrional (al norte) de Colombia y Suramérica?',
    opciones: ['Punta Gallinas', 'Cabo de la Vela', 'San Andrés', 'Punta Espada'],
    correcta: 0,
    explicacion: 'Punta Gallinas, ubicada en la península de La Guajira, es el extremo norte continental de América del Sur.'
  },
  {
    id: 8,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Con cuántos países comparte frontera terrestre Colombia?',
    opciones: ['3 países', '4 países', '5 países', '6 países'],
    correcta: 2,
    explicacion: 'Colombia limita por tierra con cinco naciones: Venezuela, Brasil, Perú, Ecuador y Panamá.'
  },
  {
    id: 9,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el pico o montaña más alta de Colombia?',
    opciones: ['Nevado del Ruiz', 'Pico Cristóbal Colón', 'Nevado del Huila', 'Ritacuba Blanco'],
    correcta: 1,
    explicacion: 'El Pico Cristóbal Colón (y su gemelo Pico Simón Bolívar), en la Sierra Nevada de Santa Marta, se elevan a 5.775 m.s.n.m.'
  },
  {
    id: 10,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el departamento más extenso territorialmente de Colombia?',
    opciones: ['Antioquia', 'Amazonas', 'Vichada', 'Caquetá'],
    correcta: 1,
    explicacion: 'El departamento del Amazonas es el más grande del país con aproximadamente 109.665 km².'
  },
  {
    id: 11,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Qué isla colombiana del océano Pacífico fue históricamente una prisión de máxima seguridad y hoy es Parque Nacional Natural?',
    opciones: ['Isla Malpelo', 'Isla Gorgona', 'Isla Fuerte', 'Isla de la Corota'],
    correcta: 1,
    explicacion: 'Gorgona funcionó como prisión entre 1960 y 1984, y actualmente es un santuario biológico reconocido por las ballenas jorobadas.'
  },
  {
    id: 12,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el departamento menos poblado de Colombia?',
    opciones: ['Vaupés', 'Guainía', 'Amazonas', 'Vichada'],
    correcta: 0,
    explicacion: 'Vaupés cuenta con la menor densidad poblacional y cantidad absoluta de habitantes según las estadísticas oficiales del DANE.'
  },

  // ========================================================
  // CATEGORÍA: HISTORIA (12 preguntas)
  // ========================================================
  {
    id: 13,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué fecha se conmemora el Grito de Independencia de Colombia?',
    opciones: ['20 de julio de 1810', '7 de agosto de 1819', '12 de octubre de 1492', '11 de noviembre de 1811'],
    correcta: 0,
    explicacion: 'El 20 de julio de 1810 ocurrió el famoso suceso del Florero de Llorente que dio inicio a la gesta independentista.'
  },
  {
    id: 14,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué batalla se selló definitivamente la independencia de la Nueva Granada el 7 de agosto de 1819?',
    opciones: ['Batalla de Boyacá', 'Batalla del Pantano de Vargas', 'Batalla de Cúcuta', 'Batalla de Carabobo'],
    correcta: 0,
    explicacion: 'La Batalla de Boyacá en el Puente de Boyacá aseguró el triunfo de las tropas patriotas lideradas por Bolívar y Santander.'
  },
  {
    id: 15,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Quién es conocido en la historia colombiana como el "Hombre de las Leyes"?',
    opciones: ['Simón Bolívar', 'Francisco de Paula Santander', 'Camilo Torres', 'Antonio Nariño'],
    correcta: 1,
    explicacion: 'Francisco de Paula Santander recibió este título por su consagración a la institucionalidad y al orden legal de la República.'
  },
  {
    id: 16,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué año fue proclamada la actual Constitución Política de Colombia?',
    opciones: ['1886', '1991', '1985', '2000'],
    correcta: 1,
    explicacion: 'La Constitución de 1991 consagró a Colombia como un Estado Social de Derecho e introdujo la Acción de Tutela.'
  },
  {
    id: 17,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Quién tradujo del francés al español e imprimió los Derechos del Hombre y del Ciudadano en 1793?',
    opciones: ['Antonio Nariño', 'José Celestino Mutis', 'Policarpa Salavarrieta', 'Francisco José de Caldas'],
    correcta: 0,
    explicacion: 'Antonio Nariño fue encarcelado y exiliado por traducir y difundir clandestinamente la Declaración de los Derechos del Hombre.'
  },
  {
    id: 18,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué heroína patriota fue fusilada en 1817 en Bogotá por espiar a favor del ejército libertador?',
    opciones: ['Manuela Sáenz', 'Policarpa Salavarrieta ("La Pola")', 'Antonia Santos', 'Mercedes Ábrego'],
    correcta: 1,
    explicacion: '"La Pola" es una de las mayores próceres de la independencia por su valentía e inteligencia en el espionaje patriota.'
  },
  {
    id: 19,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué sangriento conflicto civil entre liberales y conservadores duró de 1899 a 1902?',
    opciones: ['La Guerra de los Supremos', 'La Guerra de los Mil Días', 'La Violencia', 'La Guerra de 1885'],
    correcta: 1,
    explicacion: 'La Guerra de los Mil Días devastó la economía colombiana y antecedió directamente la separación de Panamá en 1903.'
  },
  {
    id: 20,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué líder político fue asesinado el 9 de abril de 1948, desatando la revuelta conocida como "El Bogotazo"?',
    opciones: ['Luis Carlos Galán', 'Jorge Eliécer Gaitán', 'Alfonso López Pumarejo', 'Gustavo Rojas Pinilla'],
    correcta: 1,
    explicacion: 'El asesinato de Jorge Eliécer Gaitán desató una ola de violencia urbana que transformó la historia política del siglo XX.'
  },
  {
    id: 21,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué año se separó el departamento del Istmo de Panamá de Colombia?',
    opciones: ['1898', '1903', '1910', '1921'],
    correcta: 1,
    explicacion: 'Panamá proclamó su separación el 3 de noviembre de 1903, motivada por la construcción del canal y tras la Guerra de los Mil Días.'
  },
  {
    id: 22,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Qué célebre expedición científica colonial fue liderada por José Celestino Mutis a partir de 1783?',
    opciones: ['La Misión Geodésica', 'La Expedición Botánica', 'La Comisión Corográfica', 'La Expedición Humboldt'],
    correcta: 1,
    explicacion: 'La Real Expedición Botánica del Nuevo Reino de Granada catalogó miles de especies vegetales e impulsó la ciencia criolla.'
  },
  {
    id: 23,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Quién lideró la Comisión Corográfica en la década de 1850 para cartografiar y describir a Colombia?',
    opciones: ['Agustín Codazzi', 'José Jerónimo Triana', 'Manuel Ancízar', 'Rufino José Cuervo'],
    correcta: 0,
    explicacion: 'El geógrafo italiano Agustín Codazzi recorrió el país levantando los primeros mapas y censos sistemáticos de la nación.'
  },
  {
    id: 24,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Qué pacto político acordado en Sitges y Benidorm (España) permitió la alternancia del poder entre liberales y conservadores (1958-1974)?',
    opciones: ['El Pacto de Chicoral', 'El Frente Nacional', 'La Regeneración', 'El Frente Democrático'],
    correcta: 1,
    explicacion: 'El Frente Nacional se creó tras la dictadura de Gustavo Rojas Pinilla para alternar la presidencia por 16 años.'
  },

  // ========================================================
  // CATEGORÍA: CULTURA Y TRADICIONES (12 preguntas)
  // ========================================================
  {
    id: 25,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿En qué ciudad caribeña se celebra el célebre Carnaval declarado Patrimonio de la Humanidad por la UNESCO?',
    opciones: ['Santa Marta', 'Barranquilla', 'Cartagena', 'Valledupar'],
    correcta: 1,
    explicacion: 'El Carnaval de Barranquilla es la fiesta folclórica más importante de Colombia, famosa por la frase: "Quien lo vive es quien lo goza".'
  },
  {
    id: 26,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué escritor colombiano ganó el Premio Nobel de Literatura en 1982 con obras como "Cien años de soledad"?',
    opciones: ['Álvaro Mutis', 'Gabriel García Márquez', 'Rafael Pombo', 'Jorge Isaacs'],
    correcta: 1,
    explicacion: 'Gabriel García Márquez, nacido en Aracataca, es el máximo exponente del realismo mágico y Nobel colombiano.'
  },
  {
    id: 27,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿En qué festival anual en Medellín desfilan los campesinos con monumentales silletas de flores a sus espaldas?',
    opciones: ['Feria de Cali', 'Feria de las Flores', 'Carnaval de Negros y Blancos', 'Festival del Viento'],
    correcta: 1,
    explicacion: 'La Feria de las Flores de Medellín celebra el desfile de silleteros del corregimiento de Santa Elena.'
  },
  {
    id: 28,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Cuál es el sombrero artesanal de caña flecha, símbolo cultural e identidad de Colombia ante el mundo?',
    opciones: ['Sombrero Aguadeño', 'Sombrero Vueltiao', 'Sombrero Suaza', 'Sombrero Barbacoano'],
    correcta: 1,
    explicacion: 'El sombrero vueltiao, creado por la etnia Zenú en Córdoba y Sucre, es símbolo cultural oficial de la nación.'
  },
  {
    id: 29,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad se celebra anualmente el Festival de la Leyenda Vallenata, coronando al Rey Vallenato?',
    opciones: ['Riohacha', 'Valledupar', 'Sincelejo', 'Montería'],
    correcta: 1,
    explicacion: 'Valledupar es la cuna del vallenato y sede del festival que premia los 4 aires: paseo, merengue, son y puya.'
  },
  {
    id: 30,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué pueblo del departamento de Boyacá es célebre por su arquitectura colonial y su gigantesca plaza empedrada de 14.000 m²?',
    opciones: ['Barichara', 'Villa de Leyva', 'Mompox', 'Salento'],
    correcta: 1,
    explicacion: 'Villa de Leyva posee una de las plazas principales empedradas más grandes de toda América.'
  },
  {
    id: 31,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué instrumento musical autóctono, hecho de guadua y con semillas en su interior, es fundamental en la música andina colombiana?',
    opciones: ['El Tiple', 'La Guacharaca', 'El Chucho', 'El Capador'],
    correcta: 2,
    explicacion: 'El chucho es un idiófono de sacudimiento tradicional de la región andina y el Huila.'
  },
  {
    id: 32,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué sopa tradicional bogotana se prepara con tres variedades de papa (criolla, pastusa y sabanera) y guascas?',
    opciones: ['Sancocho', 'Ajiaco', 'Mute', 'Mondongo'],
    correcta: 1,
    explicacion: 'El ajiaco santafereño es el plato insignia de Bogotá, servido con pollo, alcaparras y crema de leche.'
  },
  {
    id: 33,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el primer pueblo libre de América, fundado por cimarrones liderados por Benkos Biohó en el siglo XVII cerca de Cartagena?',
    opciones: ['San Basilio de Palenque', 'Lorica', 'San Onofre', 'Ciénaga de Oro'],
    correcta: 0,
    explicacion: 'San Basilio de Palenque fue proclamado por la Corona como pueblo libre en 1691 y su cultura es patrimonio inmaterial.'
  },
  {
    id: 34,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué famoso pintor y escultor colombiano de Medellín revolucionó el arte mundial con su característico estilo de figuras voluminosas?',
    opciones: ['Alejandro Obregón', 'Fernando Botero', 'David Manzur', 'Enrique Grau'],
    correcta: 1,
    explicacion: 'El maestro Fernando Botero donó inmensas colecciones a Medellín y a Bogotá (Museo Botero).'
  },
  {
    id: 35,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué fiesta celebrada a comienzos de enero en el sur del país (Nariño) rinde tributo a la convivencia y diversidad étnica?',
    opciones: ['Carnaval del Diablo de Riosucio', 'Carnaval de Negros y Blancos', 'Fiestas de San Pacho', 'Festival Folclórico de Ibagué'],
    correcta: 1,
    explicacion: 'El Carnaval de Negros y Blancos de Pasto es Patrimonio Cultural Inmaterial de la Humanidad.'
  },
  {
    id: 36,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué cordófono de 12 cuerdas de acero agrupadas en cuatro órdenes triples es considerado el instrumento nacional de Colombia?',
    opciones: ['Bandola', 'El Tiple', 'Requinto', 'Cuatro llanero'],
    correcta: 1,
    explicacion: 'El tiple colombiano es un instrumento musical derivado de la vihuela española, insustituible en bambucos y pasillos.'
  },

  // ========================================================
  // CATEGORÍA: DEPORTES (12 preguntas)
  // ========================================================
  {
    id: 37,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué ciclista colombiano ganó el histórico Tour de Francia en el año 2019?',
    opciones: ['Nairo Quintana', 'Egan Bernal', 'Rigoberto Urán', 'Lucho Herrera'],
    correcta: 1,
    explicacion: 'Egan Bernal, nacido en Zipaquirá, se convirtió en 2019 en el primer latinoamericano en ganar el prestigioso Tour de Francia.'
  },
  {
    id: 38,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Quién es la bicicrosista antioqueña que ha ganado múltiples medallas olímpicas (incluyendo oros en Londres 2012 y Río 2016)?',
    opciones: ['Caterine Ibargüen', 'Mariana Pajón', 'Yuri Alvear', 'Ingrit Valencia'],
    correcta: 1,
    explicacion: 'Mariana Pajón es apodada la "Reina del BMX" y es una de las atletas más laureadas en la historia del país.'
  },
  {
    id: 39,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué futbolista colombiano fue el máximo goleador de la Copa del Mundo Brasil 2014 con 6 anotaciones?',
    opciones: ['Radamel Falcao García', 'James Rodríguez', 'Teófilo Gutiérrez', 'Juan Guillermo Cuadrado'],
    correcta: 1,
    explicacion: 'James Rodríguez ganó la Bota de Oro del Mundial de 2014 y el Premio Puskás al mejor gol del año ante Uruguay.'
  },
  {
    id: 40,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Cuál es el único deporte nacional autóctono de Colombia, reconocido por ley, en el que se lanzan discos de metal a mechas de pólvora?',
    opciones: ['Chaza', 'Tejo (o Turmequé)', 'Bolo criollo', 'Coleo'],
    correcta: 1,
    explicacion: 'El tejo fue declarado deporte nacional de Colombia mediante la Ley 613 del año 2000, con origen en la cultura Muisca.'
  },
  {
    id: 41,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Quién fue la primera deportista en ganar una medalla de oro olímpica para Colombia en halterofilia (Sydney 2000)?',
    opciones: ['Ubaldina Valoyes', 'María Isabel Urrutia', 'Mabel Mosquera', 'Leidy Solís'],
    correcta: 1,
    explicacion: 'María Isabel Urrutia levantó 245 kg en total en los Juegos Olímpicos de Sydney 2000, logrando el primer oro de la historia para Colombia.'
  },
  {
    id: 42,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué atleta colombiana de Urabá ganó la medalla de oro en salto triple en los Juegos Olímpicos de Río 2016 y fue elegida Atleta Mundial del Año en 2018?',
    opciones: ['Ximena Restrepo', 'Caterine Ibargüen', 'Flor Denis Ruiz', 'Geiner Moreno'],
    correcta: 1,
    explicacion: 'Caterine Ibargüen dominó la Liga de Diamante y los Juegos Olímpicos con marcas históricas en salto triple.'
  },
  {
    id: 43,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿En qué deporte a motor triunfó Juan Pablo Montoya ganando las 500 Millas de Indianápolis y 7 Grandes Premios de Fórmula 1?',
    opciones: ['Motociclismo', 'Automovilismo', 'Karting', 'Rally'],
    correcta: 1,
    explicacion: 'Juan Pablo Montoya compitió con Williams y McLaren en F1 y ganó las 500 Millas de Indianápolis en 2000 y 2015.'
  },
  {
    id: 44,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué club de fútbol colombiano ganó la Copa Libertadores de América en 1989 y repitió el título en 2016?',
    opciones: ['América de Cali', 'Atlético Nacional', 'Millonarios', 'Once Caldas'],
    correcta: 1,
    explicacion: 'Atlético Nacional de Medellín se coronó campeón de América en 1989 (ante Olimpia) y en 2016 (ante Independiente del Valle).'
  },
  {
    id: 45,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Quién fue el primer ciclista colombiano en ganar una de las tres Grandes Vueltas (la Vuelta a España de 1987)?',
    opciones: ['Fabio Parra', 'Luis "Lucho" Herrera', 'Oliverio Rincón', 'Martín Emilio "Cochise" Rodríguez'],
    correcta: 1,
    explicacion: 'El "Jardinerito de Fusagasugá", Lucho Herrera, ganó la Vuelta a España en 1987 con el equipo Café de Colombia.'
  },
  {
    id: 46,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué disciplina sobre ruedas es la que más títulos mundiales le ha otorgado a Colombia en toda su historia deportiva?',
    opciones: ['Ciclismo en pista', 'Patinaje de carreras (velocidad)', 'BMX', 'Ciclomontañismo'],
    correcta: 1,
    explicacion: 'Colombia es la máxima potencia global de patinaje de velocidad con más de 20 títulos mundiales generales por naciones.'
  },
  {
    id: 47,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿En qué año ganó la Selección Colombia masculina de fútbol su primer y único título de la Copa América?',
    opciones: ['1975', '1993', '2001', '2014'],
    correcta: 2,
    explicacion: 'Colombia fue sede y campeona invicta de la Copa América 2001 sin recibir ningún gol en contra durante el torneo.'
  },
  {
    id: 48,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué boxeador cordobés se convirtió en el primer campeón mundial de boxeo de Colombia en 1972 (peso gallo)?',
    opciones: ['Rodrigo Valdez', 'Antonio Cervantes "Kid Pambelé"', 'Miguel "Happy" Lora', 'Bernardo Caraballo'],
    correcta: 1,
    explicacion: 'Kid Pambelé noqueó a Peppermint Frazer en Panamá el 28 de octubre de 1972, otorgando el primer fajín ecuménico al país.'
  },

  // ========================================================
  // CATEGORÍA: CIENCIA Y NATURALEZA (12 preguntas)
  // ========================================================
  {
    id: 49,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es el ave nacional de Colombia que adorna el escudo de la República?',
    opciones: ['Guacamaya bandera', 'Cóndor de los Andes', 'Colibrí ermitaño', 'Tucán caribeño'],
    correcta: 1,
    explicacion: 'El Cóndor de los Andes representa la soberanía, libertad y la cordillera andina en el escudo nacional.'
  },
  {
    id: 50,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es la flor nacional de Colombia?',
    opciones: ['Rosa silvestre', 'Orquídea (Cattleya trianae)', 'Girasol criollo', 'Heliconia'],
    correcta: 1,
    explicacion: 'La Cattleya trianae fue escogida en 1936 como flor nacional por sus pétalos con los colores patrios.'
  },
  {
    id: 51,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es el árbol nacional de Colombia, que se encuentra principalmente en el Valle de Cocora (Quindío)?',
    opciones: ['Guayacán amarillo', 'Palma de cera del Quindío', 'Ceiba bonga', 'Roble andino'],
    correcta: 1,
    explicacion: 'La palma de cera (Ceroxylon quindiuense) es la palmera más alta del mundo, alcanzando hasta 60 metros de altura.'
  },
  {
    id: 52,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿En qué grupo de vertebrados ocupa Colombia el primer lugar mundial absoluto en diversidad de especies?',
    opciones: ['Mamíferos', 'Aves (con casi 2.000 especies)', 'Reptiles', 'Peces marinos'],
    correcta: 1,
    explicacion: 'Colombia es el país número 1 del planeta en diversidad de aves y de orquídeas.'
  },
  {
    id: 53,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Qué famoso río de la Serranía de la Macarena es conocido como el "río de los siete colores" o "el río más hermoso del mundo"?',
    opciones: ['Río Guaviare', 'Caño Cristales', 'Río Inírida', 'Río Pauto'],
    correcta: 1,
    explicacion: 'La planta acuática endémica Macarenia clavigera le otorga sus vibrantes tonalidades rojas, fucsias, verdes y amarillas.'
  },
  {
    id: 54,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Qué científico colombiano desarrolló en 1987 la primera vacuna sintética contra la malaria (SPf66)?',
    opciones: ['Rodolfo Llinás', 'Manuel Elkin Patarroyo', 'Jorge Reynolds Pombo', 'Emilio Yunis'],
    correcta: 1,
    explicacion: 'Manuel Elkin Patarroyo donó la patente de su vacuna contra la malaria a la Organización Mundial de la Salud (OMS).'
  },
  {
    id: 55,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Qué neurofisiólogo colombiano es una eminencia mundial por sus investigaciones sobre el cerebro humano y la conciencia?',
    opciones: ['Rodolfo Llinás', 'Salomón Hakim', 'Álvaro Gómez Hurtado', 'Focion Febres Cordero'],
    correcta: 0,
    explicacion: 'Rodolfo Llinás es profesor emérito en NYU y ha liderado proyectos cruciales para la NASA y la neurociencia moderna.'
  },
  {
    id: 56,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Qué planta emblemática de los páramos colombianos retiene el agua de la niebla y la libera lentamente a los ríos?',
    opciones: ['Frailejón (Espeletia)', 'Helecho arbóreo', 'Puyas', 'Encenillo'],
    correcta: 0,
    explicacion: 'Los frailejones son los grandes guardianes del agua en los ecosistemas de alta montaña colombianos.'
  },
  {
    id: 57,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Qué médico colombiano inventó en 1958 el primer marcapasos cardíaco artificial intravenoso externo?',
    opciones: ['Salomón Hakim', 'Jorge Reynolds Pombo', 'César Vallejo', 'Alberto Gómez'],
    correcta: 1,
    explicacion: 'Jorge Reynolds Pombo construyó en Bogotá un marcapasos que pesaba 45 kg conectado a una batería de automóvil.'
  },
  {
    id: 58,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Qué anfibio endémico de la costa pacífica colombiana posee una toxina tan potente que es considerado el animal vertebrado más venenoso del mundo?',
    opciones: ['Rana dardo dorada (Phyllobates terribilis)', 'Rana de cristal', 'Sapo gigante de caña', 'Salamandra de Chingaza'],
    correcta: 0,
    explicacion: 'La rana dardo dorada contiene batracotoxina suficiente en su piel para acabar con 10 personas adultas.'
  },
  {
    id: 59,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Qué neurocirujano colombiano descubrió la hidrocefalia normotensiva y diseñó la válvula derivativa de Hakim para drenar líquido cefalorraquídeo?',
    opciones: ['Salomón Hakim', 'Carlos Ardila', 'Rodolfo Llinás', 'Fernando Rincón'],
    correcta: 0,
    explicacion: 'El Dr. Salomón Hakim revolucionó la neurocirugía con la invención de la válvula de Hakim en la década de 1960.'
  },
  {
    id: 60,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Qué inmenso Parque Nacional Natural en la Amazonía colombiana es Patrimonio de la Humanidad y alberga formaciones rocosas milenarias llamadas Tepuyes con arte rupestre?',
    opciones: ['PNN Tayrona', 'PNN Serranía de Chiribiquete', 'PNN Amacayacu', 'PNN El Tuparro'],
    correcta: 1,
    explicacion: 'Chiribiquete es el área protegida más grande del país y la "Capilla Sixtina" de la arqueología amazónica con miles de pinturas rupestres.'
  }
];

// Nombres descriptivos y metadatos de las categorías para la interfaz
const CATEGORIAS_INFO = {
  todas: {
    nombre: 'Todas las Categorías',
    icono: '🌟',
    descripcion: 'Preguntas variadas de todas las temáticas colombianas.',
    color: '#003893'
  },
  geografia: {
    nombre: 'Geografía',
    icono: '🗺️',
    descripcion: 'Ríos, cordilleras, páramos, costas y departamentos.',
    color: '#0284C7'
  },
  historia: {
    nombre: 'Historia',
    icono: '📜',
    descripcion: 'Independencia, próceres, sucesos clave y constituciones.',
    color: '#D97706'
  },
  cultura: {
    nombre: 'Cultura y Tradiciones',
    icono: '🎭',
    descripcion: 'Carnavales, literatura, música folclórica y gastronomía.',
    color: '#9333EA'
  },
  deportes: {
    nombre: 'Deportes',
    icono: '🚴',
    descripcion: 'Ciclismo, fútbol, patinaje, Juegos Olímpicos y atletas.',
    color: '#DC2626'
  },
  naturaleza: {
    nombre: 'Ciencia y Naturaleza',
    icono: '🌿',
    descripcion: 'Biodiversidad única, científicos, páramos e inventos.',
    color: '#16A34A'
  }
};

// Exportar globalmente para entornos de navegador o modulares
if (typeof window !== 'undefined') {
  window.PREGUNTAS = PREGUNTAS;
  window.CATEGORIAS_INFO = CATEGORIAS_INFO;
}
