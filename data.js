// Coralia — datos de proyectos (fuente: coraliae.com y deck institucional)
// Compartido por index.html y proyectos.html. Para sumar un caso, agregá un objeto a CASES.
/* ---------- Casos publicados (fuente: coraliae.com y deck institucional) ---------- */
const CASES = [
  // img: tarjeta con el logo del cliente ya incluido (de la web actual).
  // tallImg: foto para tarjetas verticales cuando la tarjeta original es muy ancha ('' = fondo de color con el nombre).
  // hero / gallery: fotos de la página de detalle. quote: índice en QUOTES.
  { id: 'misiones', hero: 'assets/proyectos/misiones.jpg', gallery: [], role: ['Redacción del documento de programa (PD).', 'Datos de actividad del nivel de referencia de emisiones forestales (FREL).', 'Aplicación de la metodología y sistema MRV.', 'Datos de actividad del período de monitoreo.', 'Marco legal de titularidad de los VCUs.', 'Análisis de incertidumbre, fugas y no permanencia.', 'Respuestas a hallazgos de AENOR, Verra y Sylvera.'], period: '2017–2022', featured: true, img: 'assets/proyectos/misiones.jpg', client: 'Provincia de Misiones', country: 'Argentina', svc: 'mitigar', ind: 'Mercados de carbono',
    title: 'Programa Jurisdiccional REDD+ ECO2', kpi: ['10.175.209', 'VCUs emitidos · 2017–2022'],
    short: 'El primer programa JNR del mundo en emitir créditos de carbono, liderado por un gobierno subnacional.',
    body: ['Verra aprobó la emisión de los primeros 10.175.209 VCUs del Programa JNR de la Provincia de Misiones, una de las mayores emisiones para un solo período de verificación. Detrás hay más de 3 millones de hectáreas de Selva Paranaense protegidas por décadas de política pública.',
      'Coralia acompañó el proceso de punta a punta: redacción del documento de programa (PD), datos de actividad del nivel de referencia (FREL), sistema MRV, datos del período de monitoreo, marco legal de titularidad de los VCUs, análisis de incertidumbre, fugas y no permanencia, y respuestas a AENOR, Verra y Sylvera.'],
    url: 'https://www.coraliae.com/projects-jnrmisiones' },
  { id: 'ypf', hero: 'assets/proyectos/ypf.jpg', gallery: [], period: '2020 · 2024 · 2025', featured: true, img: 'assets/proyectos/ypf.jpg', client: 'YPF', country: 'Argentina', svc: 'adaptar', ind: 'Oil & Gas',
    title: 'Riesgo climático en operaciones estratégicas', kpi: ['100 años', 'de horizonte en los mapas de riesgo'],
    short: 'Metodología propia de riesgo climático para 8 operaciones de la principal energética del país.',
    body: ['En 2020 diseñamos una metodología de riesgo climático a medida, con mapas de riesgo futuro de hasta 100 años para lluvias torrenciales, olas de calor y sequías, aplicada a complejos industriales, yacimientos convencionales y no convencionales y centrales térmicas.',
      'A partir de los resultados armamos un plan de adaptación integral. YPF volvió a contratar a Coralia en 2024 y 2025 para actualizar el análisis y mejorar sus metodologías internas.'],
    url: 'https://www.coraliae.com/projects-ypf' },
  { id: 'genneia', hero: 'assets/proyectos/genneia-1.jpg', gallery: ['assets/proyectos/genneia-1.jpg'], quote: 1, period: '2023–2030', featured: false, img: 'assets/proyectos/genneia.jpg', client: 'Genneia', country: 'Argentina', svc: 'mitigar', ind: 'Energía solar',
    title: 'Parques solares en la región de Cuyo', kpi: ['123.470', 'tCO₂e reducidas en la primera verificación'],
    short: 'Documento de proyecto para un grupo de parques solares en San Juan y Mendoza, bajo el estándar BioCarbon.',
    body: ['La primera etapa, en San Juan, fue validada bajo el estándar BioCarbon y superó su primera verificación. Para el período 2023–2030 se proyecta una reducción acumulada de más de 900.000 tCO₂e.',
      'El enfoque agrupado permite sumar nuevos parques en San Juan y Mendoza y vincular la generación renovable con el mercado voluntario de carbono.'],
    url: 'https://www.coraliae.com/projects-genneia' },
  { id: 'mercuria', hero: 'assets/proyectos/mercuria-1.jpg', gallery: ['assets/proyectos/mercuria-1.jpg'], featured: false, img: 'assets/proyectos/mercuria.jpg', client: 'Mercuria', country: 'Argentina', svc: 'mitigar', ind: 'Energía eólica',
    title: 'Monitoreo de los parques eólicos PER1 y PER2', kpi: ['209.719', 'tCO₂e certificadas bajo VCS'],
    short: 'Informe de monitoreo de 77,4 MW eólicos en Puerto Madryn, con metodología ACM0002.',
    body: ['Los parques suman 43 aerogeneradores y 77,4 MW. En el período monitoreado entregaron 293.014 MWh al Sistema Argentino de Interconexión.',
      'Recolectamos, analizamos y validamos datos horarios de generación contra facturación. La reducción certificada superó la estimación inicial del PDD (189.109 tCO₂e).'],
    url: 'https://www.coraliae.com/projects-mercuria' },
  { id: 'pluspetrol', hero: 'assets/proyectos/pluspetrol-1.jpg', gallery: ['assets/proyectos/pluspetrol-1.jpg', 'assets/proyectos/pluspetrol-2.jpg'], period: '2021–2023', featured: false, img: 'assets/proyectos/pluspetrol.jpg', client: 'Pluspetrol Perú Corporation', country: 'Perú', svc: 'medir', ind: 'Oil & Gas',
    title: 'Inventario corporativo de GEI 2021–2023', kpi: ['ISO 14064-1', 'certificado con aseguramiento razonable'],
    short: 'Primer inventario de la compañía certificado por ICONTEC bajo ISO 14064-1:2018.',
    body: ['Relevamos las categorías 1 a 5 de la norma en los pozos del Consorcio Camisea, las líneas de transporte, la planta de Malvinas, la planta de fraccionamiento y el terminal marino de Pisco.',
      'Revisamos las calculadoras existentes y desarrollamos calculadoras propias de emisiones fugitivas. Acompañamos la auditoría hasta resolver cada observación.'],
    url: 'https://www.coraliae.com/projects-pluspetrol' },
  { id: 'phoenix', hero: 'assets/proyectos/phoenix-1.jpg', gallery: ['assets/proyectos/phoenix-1.jpg'], period: '2022–2024', featured: false, img: 'assets/proyectos/phoenix.jpg', client: 'Phoenix Global Resources', country: 'Argentina', svc: 'medir', ind: 'Oil & Gas',
    title: 'Inventario de GEI 2024 y ajuste 2022–2023', kpi: ['ISO 14064-1', 'inventarios listos para auditoría'],
    short: 'Inventario de activos convencionales y no convencionales en Neuquén y Mendoza.',
    body: ['Hicimos visitas técnicas a las plantas de Vaca Muerta, cuantificamos las categorías 1, 2 y 3 y diseñamos calculadoras de GEI específicas para cada activo.',
      'Capacitamos al equipo de la compañía para integrar esas calculadoras a su reporte interno y sostener registros actualizados.'],
    url: 'https://www.coraliae.com/projects-phoenixglobalresources' },
  { id: 'andromaco', hero: 'assets/proyectos/andromaco-1.jpg', gallery: ['assets/proyectos/andromaco-1.jpg'], quote: 0, featured: true, img: 'assets/proyectos/andromaco.jpg', client: 'Laboratorios Andrómaco', country: 'Argentina', svc: 'medir', ind: 'Farmacéutica',
    title: 'Huella de carbono de la línea Dermaglós', kpi: ['Huella de producto', 'con datos de origen real de cada insumo'],
    short: 'Metodología propia para estimar las emisiones de materias primas con información representativa.',
    body: ['En lugar de promedios internacionales, trabajamos con información de cada insumo según su método de producción y país de origen, reduciendo la incertidumbre del cálculo.',
      'El trabajo alimenta una base de datos propia de huellas de materias primas del sector cosmético y continúa una colaboración que empezó con la línea Aveno.'],
    url: 'https://www.coraliae.com/projects-laboratoriosandromaco' },
  { id: 'sesuai', hero: 'assets/proyectos/sesuai.jpg', gallery: [], tallImg: '', featured: false, img: 'assets/proyectos/sesuai.jpg', client: 'sesu.ai', country: 'Argentina', svc: 'consultoria', ind: 'Energía solar',
    title: 'Prefactibilidad de los parques solares El Pongo I y II', kpi: ['200 MW', 'proyectados en Jujuy'],
    short: 'Estudio técnico, legal, ambiental y comercial para un consorcio coreano.',
    body: ['Analizamos la participación en el MATER, el marco regulatorio y los incentivos como el RIGI y beneficios provinciales, además de las condiciones para la evaluación de impacto ambiental.',
      'Estudiamos compradores potenciales vía contratos PPA y actuamos como enlace entre el gobierno provincial, el consorcio y las autoridades nacionales.'],
    url: 'https://www.coraliae.com/projects-sesuai' },
  { id: 'ruuts', hero: 'assets/proyectos/ruuts-1.jpg', gallery: ['assets/proyectos/ruuts-1.jpg'], tallImg: 'assets/proyectos/ruuts-1.jpg', featured: false, img: 'assets/proyectos/ruuts.jpg', client: 'Ruuts', country: 'Paraguay', svc: 'mitigar', ind: 'Ganadería',
    title: 'Ganadería regenerativa y conservación de bosque', kpi: ['ALM + ARR', 'en fase de implementación'],
    short: 'Proyecto de carbono con sistemas silvopastoriles bajo cubierta forestal.',
    body: ['Combina manejo agrícola mejorado (ALM) y forestación, reforestación y revegetación (ARR) para reducir la presión de desmonte en zonas históricamente deforestadas.',
      'Los equipos de campo ya están capacitados y monitorean el trabajo en terreno.'],
    url: 'https://www.coraliae.com/projects-ruuts' },
  { id: 'wipo', hero: 'assets/proyectos/wipo-1.jpg', gallery: ['assets/proyectos/wipo-1.jpg'], featured: false, img: 'assets/proyectos/wipo.jpg', client: 'WIPO GREEN (OMPI)', country: 'Argentina', svc: 'consultoria', ind: 'Agro',
    title: 'Fase IV del Proyecto de Aceleración WIPO GREEN', kpi: ['ONU', 'iniciativa de la Organización Mundial de la Propiedad Intelectual'],
    short: 'Conectamos productores con proveedores de tecnología sostenible.',
    body: ['Coralia fue seleccionada para liderar la implementación en Argentina: identificamos productores de peras, manzanas, uvas y berries con desafíos de sustentabilidad.',
      'Los conectamos con proveedores de soluciones tecnológicas a través de la plataforma global de WIPO GREEN, con asesoramiento en propiedad intelectual del INPI.'],
    url: 'https://www.coraliae.com/projects-wipo' },
];
// Países donde trabajó Coralia (fuente: deck institucional 2026). Se usan en el globo de la Home.
// [nombre, longitud, latitud, región, cantidad de trabajos, nombre en el mapa si es distinto]
const COUNTRIES = [
  ['Argentina', -64, -35, 'América del Sur', 70],
  ['Paraguay', -58, -23.4, 'América del Sur', 1],
  ['Bolivia', -64.7, -16.7, 'América del Sur', 1],
  ['Perú', -75, -9.5, 'América del Sur', 8, 'Peru'],
  ['Brasil', -51, -10, 'América del Sur', 1, 'Brazil'],
  ['Chile', -71, -32, 'América del Sur', 2],
  ['Ecuador', -78.5, -1.5, 'América del Sur', 2],
  ['Colombia', -73.5, 4, 'América del Sur', 3],
  ['Panamá', -80, 8.5, 'Centroamérica y Caribe', 2, 'Panama'],
  ['Costa Rica', -84, 9.9, 'Centroamérica y Caribe', 1],
  ['República Dominicana', -70.3, 18.8, 'Centroamérica y Caribe', 1, 'Dominican Rep.'],
  ['México', -102, 23.5, 'América del Norte', 5, 'Mexico'],
  ['Estados Unidos', -98, 39, 'América del Norte', 1, 'United States of America'],
  ['España', -3.7, 40.2, 'Europa', 2, 'Spain'],
  ['Francia', 2.3, 46.6, 'Europa', 1, 'France'],
  ['Bélgica', 4.6, 50.6, 'Europa', 1, 'Belgium'],
  ['Alemania', 10.4, 51.1, 'Europa', 1, 'Germany'],
  ['Italia', 12.5, 42.8, 'Europa', 1, 'Italy'],
  ['Suecia', 16, 62.5, 'Europa', 1, 'Sweden'],
  ['Noruega', 9, 61, 'Europa', 1, 'Norway'],
  ['Arabia Saudita', 45, 24, 'Medio Oriente', 1, 'Saudi Arabia'],
  ['India', 79, 22, 'Asia', 1],
  ['Sudáfrica', 24, -29, 'África', 1, 'South Africa'],
];

// Qué hizo Coralia en cada país: [año, cliente, trabajo]. Los casos publicados (CASES) se suman arriba de la lista.
const WORK = {
  Argentina: [
    ['2022–', 'Gobierno de Misiones', 'Programa jurisdiccional REDD+ (ECO2 Misiones, Verra JNR)'],
    ['2019 · 2023', 'YPF', 'Mapas de amenaza, vulnerabilidad y riesgo · valoración económica del riesgo climático'],
    ['2023', 'Pan American Energy', 'Riesgo climático físico y de transición en todas sus instalaciones'],
    ['2024', 'Mars Petcare · Aconcagua · Cartocor · Phoenix', 'Huellas de carbono corporativas'],
    ['2020–23', 'Laboratorios Andrómaco', 'Huellas de producto (Aveno, Dermaglós) y estrategia de bajas emisiones'],
    ['2013 · 2015', 'Coca-Cola Argentina', 'Huella y compensación del concierto de Metallica en la Antártida'],
    ['2014', 'Secretaría de Ambiente', 'Capítulo de energía de la Tercera Comunicación Nacional de Argentina (CMNUCC)'],
    ['2024', 'Mercuria Energy Trading', 'Gestión del programa de Misiones · monitoreo de proyectos eólicos de Genneia'],
    ['2025–26', 'Ruuts · GIZ', 'ReMonte Chaco Seco (ARR + ALM) · Regenerando Chubut (ARR)'],
  ],
  'México': [
    ['2012', 'FIDE – Greening', 'Calentamiento solar para la agroindustria (Mexisco II)'],
    ['2013', 'GIZ – FIDE', 'Diseño de un sistema MRV para medidas de eficiencia energética'],
    ['2016', 'IMPECO', 'Proyecto de abatimiento de N₂O en la planta de Fertinal'],
    ['2024', 'Casa Centinela', 'Huellas de producto de tequila y agave'],
    ['2025–26', 'Sinaloa Blue Carbon', 'Proyecto de restauración de manglares (VM0033)'],
  ],
  'Perú': [
    ['2012–24', 'Pluspetrol Perú', 'Estudio WHRU de Malvinas · monitoreo y verificación MDL · inventario de emisiones fugitivas · huella corporativa'],
    ['2020', 'Pluspetrol – BP', 'Informe de monitoreo y venta de reducciones de emisiones en el Reino Unido'],
    ['2018–19', 'Metro de Lima Línea 2', 'Informe pericial socioambiental para un arbitraje en el CIADI (Washington)'],
    ['2024', 'Pluspetrol', 'Servicio corporativo integral: huella, riesgo climático, mitigación y estrategia de carbono'],
  ],
  Colombia: [
    ['2015', 'Cesviter – ONU-Hábitat', 'Indicadores de cambio climático para la Secretaría Distrital de Ambiente de Bogotá'],
    ['2020', 'ICONTEC', 'Validación y verificación de proyectos de reducción de emisiones (Fedepalma, Providencia III, Las Vacas)'],
    ['2024', 'APLA', 'Huella y compensación del 44.º Encuentro Anual Latinoamericano de Petroquímica'],
  ],
  Chile: [
    ['2022', 'Allianz Zero Emissions', 'Desarrollo de un proyecto REDD+'],
    ['2024', 'Propietarios privados', 'Factibilidad REDD en la región del Maule'],
  ],
  Ecuador: [
    ['2022', 'Pluspetrol', 'Desarrollo de un proyecto hidroeléctrico'],
    ['2024', 'Pluspetrol', 'Servicio climático corporativo integral'],
  ],
  Paraguay: [['2024', 'Verra – MADES', 'Datos de actividad jurisdiccionales para proyectos REDD+ (VM0048)']],
  Bolivia: [['2026', 'Fundares · ReForest LATAM', 'Carbon Connect Bolivia: hoja de ruta REDD+ jurisdiccional para Santa Cruz']],
  Brasil: [['2023', 'APLA', 'Huella y compensación del 43.º Encuentro Anual Latinoamericano de Petroquímica']],
  'República Dominicana': [['2024–', 'Fundación CI Atabey', 'Dominican Blue Carbon Exchange: restauración y conservación de manglares (VM0033 / VM0007)']],
  'Costa Rica': [['2019', 'GeoAdaptive – Gobierno de Costa Rica', 'Análisis territorial de emisiones de GEI y captura de carbono']],
  'Panamá': [
    ['2015', 'Panama Forest Services', 'Factibilidad de los proyectos de energía de la Autoridad del Canal de Panamá'],
    ['2017', 'Ciudad del Saber – Sinergia', 'Revisión de la gestión ambiental, de emisiones y de energía'],
  ],
  'Estados Unidos': [['2016', 'Global Footprint Network', 'Huella ecológica de Argentina']],
  'España': [
    ['2012', 'COMSA EMTE', 'Estaciones meteorológicas para proyectos de energía renovable'],
    ['2024', 'Munbaus – OCASA', 'Huella corporativa multipaís'],
  ],
  Francia: [['2022', 'TotalEnergies', 'Estrategia de carbono y proyectos de mitigación']],
  Alemania: [['2022', 'Prolignis Energie', 'Factibilidad de tratamiento de residuos mixtos']],
  Italia: [['2012', 'Greening – Municipio de Bolonia', 'Plataforma de monitoreo y reporte de emisiones territoriales']],
  Suecia: [['2012', 'Jegrelius – Eco2Win', 'Análisis de ciclo de vida de bolsas para transfusión de sangre']],
  Noruega: [['2022', 'Norfund', 'Capacitación en mercados de carbono']],
  'Bélgica': [['2024', 'Munbaus – OCASA', 'Huella corporativa de las operaciones en Bélgica']],
  India: [['2024', 'Munbaus – OCASA', 'Huella corporativa de las operaciones en India']],
  'Sudáfrica': [['2014', 'National Pride Ltd', 'Sistema de gestión de la energía ISO 50001']],
  'Arabia Saudita': [['2013', 'Tetra Tech', 'Estudio comparativo de reformas del sector eléctrico (Argentina, México y Arabia Saudita)']],
};
const workLabel = (n) => (n >= 70 ? 'Más de 70 trabajos desde 2012' : `${n} ${n === 1 ? 'trabajo' : 'trabajos'}`);

// Orden de la grilla en la página de proyectos (igual que en la web actual)
const GRID_ORDER = ['wipo', 'genneia', 'phoenix', 'mercuria', 'pluspetrol', 'sesuai', 'ruuts'];

// Testimonios
const QUOTES = [
  { name: 'Javier Jafella', role: 'Jefe de Sustentabilidad, Laboratorios Andrómaco', img: 'assets/test-jafella.webp',
    text: 'Poder obtener la huella de carbono total de un producto es muy complejo. Junto a Coralia desarrollamos una metodología que nos permitió acceder a información clave y dar mayor precisión a los datos, incluso en contextos de alta incertidumbre.' },
  { name: 'Antonella Martinenghi', role: 'Sr. Carbon Commercial Executive, Genneia', img: 'assets/test-martinenghi.webp',
    text: 'Agradecemos a Coralia Environmental por todo su apoyo durante el proceso de certificación del proyecto y destacamos su rigor técnico, su atención al detalle y su perseverancia para completarlo con éxito.' },
];
// Imagen para tarjetas verticales (carrusel, destacados)
const tallOf = (c) => (c.tallImg !== undefined ? c.tallImg : c.img);
const bakedLogo = (c, src) => src === c.img;   // la tarjeta original ya trae el logo

// Equipo (fuente: coraliae.com). group: direccion · tecnico · relaciones · gestion
// photo: assets/equipo/<id>.jpg (blanco y negro) · color: <id>-color.jpg (si existe)
// TODO: completar linkedin de cada persona: agregar  linkedin: 'https://www.linkedin.com/in/...'  en su fila.
// Con el link cargado, la foto de su ficha y el botón LinkedIn llevan a su perfil.
const TEAM = [
  { id: 'fabian-gaioli', name: 'Fabián Gaioli', group: 'direccion', area: 'Director Ejecutivo (CEO)', title: 'Estrategia global de la compañía',
    skills: ['Doctor en Física', 'Más de 30 años en cambio climático', 'Autor principal de metodologías de carbono (MDL, Verra)', 'Más de 50 proyectos de carbono en AFOLU, energía y residuos', 'Estrategias nacionales (NDC, BUR)', 'Finanzas climáticas (GCF, PNUD)', 'Experto del IPCC', 'Más de 50 publicaciones y 100 charlas'] },
  { id: 'nicolas-gaioli', name: 'Nicolás Gaioli', group: 'direccion', area: 'Director de Operaciones (COO)', title: 'Supervisión del desempeño de proyectos',
    skills: ['Liderazgo estratégico y operativo', 'Desarrollo de proyectos de carbono (Verra, BCR)', 'Inventarios de GEI', 'Experiencia en AFOLU', 'Agricultura regenerativa y proyectos forestales'] },
  { id: 'claudia-bernardou', name: 'Claudia Bernardou', group: 'gestion', area: 'Asistente Ejecutiva', title: 'Eficiencia y coherencia organizacional',
    skills: ['Soporte administrativo', 'Coordinación de RR. HH. y del equipo', 'Gestión de agenda y flujos de trabajo', 'Seguimiento de tareas estratégicas', 'Procesos internos y de oficina'] },
  { id: 'ignacio-duhourq', name: 'Ignacio Duhourq', group: 'tecnico', area: 'Equipo técnico · Huella de carbono', title: 'Líder técnico de inventarios de GEI',
    skills: ['Cálculo de huella de carbono', 'Calidad de datos', 'Oportunidades de mitigación', 'Normas ISO', 'Gestión de datos de inventarios'] },
  { id: 'augusto-fumagalli', name: 'Augusto Fumagalli', group: 'tecnico', area: 'Equipo técnico · Riesgo climático', title: 'Analista técnico y líder científico',
    skills: ['Modelos climáticos CMIP6', 'QGIS para proyección de amenazas', 'Encuestas de sensibilidad', 'Matrices causa-efecto', 'Vulnerabilidad e impacto', 'Proyectos de carbono AFOLU'] },
  { id: 'filippo-berdes', name: 'Filippo Berdes', group: 'tecnico', area: 'Equipo técnico · Riesgo climático', title: 'Especialista en modelado climático',
    skills: ['Modelos climáticos CMIP6', 'QGIS para proyección de amenazas', 'Matrices causa-efecto', 'Vulnerabilidad e impacto', 'Diseño de metodologías de riesgo climático'] },
  { id: 'marisa-zaragozi', name: 'Marisa Zaragozi', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Líder técnica de proyectos de energía y residuos',
    skills: ['Diseño y monitoreo de proyectos', 'Factibilidad y evaluaciones metodológicas', 'Estrategias de descarbonización', 'Estándares de carbono (MDL, Verra)', 'Asesoramiento público y privado'] },
  { id: 'lourdes-manrique', name: 'Lourdes Manrique', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Líder técnica de proyectos J-REDD',
    skills: ['Proyecciones de emisiones y MRV', 'Herramientas de huella de carbono', 'Evaluación de proyectos forestales', 'Negociaciones climáticas nacionales y CMNUCC', 'Coordinación multisectorial'] },
  { id: 'marina-pinkasz', name: 'Marina Pinkasz', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Líder técnica de proyectos ARR',
    skills: ['Liderazgo de proyectos NbS', 'Vínculo con productores', 'I+D en tecnologías verdes', 'Prácticas sostenibles', 'Herramientas SIG'] },
  { id: 'laureano-bragado', name: 'Laureano Bragado', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Analista técnico Jr. de proyectos ARR',
    skills: ['Asistencia en proyectos NbS', 'Vínculo con productores', 'I+D en tecnologías verdes', 'AFOLU: REDD, ALM, ARR', 'Uso sostenible del suelo'] },
  { id: 'agustina-blazquez', name: 'Agustina Blázquez', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Analista técnica Jr. de proyectos de carbono azul',
    skills: ['Desarrollo de proyectos NbS', 'Monitoreo de carbono azul', 'Herramientas SIG', 'Degradación y deforestación', 'Documentos de proyecto (PD)', 'Modelado de riesgo climático'] },
  { id: 'fernando-amar', name: 'Fernando Amar', group: 'relaciones', area: 'Relaciones internacionales', title: 'Gerente de proyectos de carbono LatAm',
    skills: ['Búsqueda de proyectos en LatAm', 'Vinculación con actores', 'Desarrollo de alianzas', 'Documentos de proyecto', 'Mercado de carbono', 'Financiamiento'] },
  { id: 'hernan-lopez', name: 'Hernán Lopez', group: 'relaciones', area: 'Relaciones internacionales', title: 'Gerente de proyectos de carbono Norteamérica',
    skills: ['Búsqueda de proyectos en Norteamérica', 'Vinculación con actores', 'Desarrollo de alianzas', 'Documentos de proyecto', 'Mercado de carbono', 'Financiamiento'] },
  { id: 'sebastian-kamin', name: 'Sebastián Kamin', group: 'gestion', area: 'Comunicación', title: 'Director de Marketing',
    skills: ['Redes sociales corporativas', 'Vinculación con clientes', 'Generación de oportunidades comerciales', 'Posicionamiento de la empresa'] },
  { id: 'rosario-lombardi', name: 'Rosario Lombardi', group: 'gestion', area: 'Finanzas y contabilidad', title: 'Asistente financiera',
    skills: ['Flujo de caja', 'Conciliación de gastos', 'Presupuestos', 'Reportes financieros', 'Pagos y cobranzas'] },
  { id: 'kieffer-schroder', name: 'Kieffer Schroder', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Pasante de Sostenibilidad y Mercados de Carbono',
    skills: ['Ingeniero ambiental', 'Sostenibilidad', 'Mercados de carbono'] },
  { id: 'ignacio-bilbao', name: 'Ignacio Bilbao', group: 'gestion', area: 'IT y plataformas digitales', title: 'Pasante de IT y Plataformas Digitales',
    skills: ['Desarrollo web', 'Plataformas digitales', 'Soporte IT'] },
];
const TEAM_GROUPS = { all: 'Todos', direccion: 'Dirección', tecnico: 'Equipo técnico', relaciones: 'Relaciones internacionales', gestion: 'Gestión' };
