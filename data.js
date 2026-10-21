// Coralia — datos de proyectos (fuente: coraliae.com y deck institucional)
// Compartido por index.html y proyectos.html. Para sumar un caso, agregá un objeto a CASES.
/* ---------- Casos publicados (fuente: coraliae.com y deck institucional) ---------- */
const CASES = [
  // img: tarjeta con el logo del cliente ya incluido (de la web actual).
  // tallImg: foto para tarjetas verticales cuando la tarjeta original es muy ancha ('' = fondo de color con el nombre).
  // tallBaked: true si esa foto vertical ya trae el logo del cliente (no se le escribe el nombre encima).
  // hero / gallery: fotos de la página de detalle. quote: índice en QUOTES.
  { id: 'misiones', hero: 'assets/proyectos/misiones.jpg', gallery: ['assets/proyectos/misiones-selva.webp', 'assets/proyectos/misiones-niebla.webp', 'assets/proyectos/misiones-mono.webp', 'assets/proyectos/misiones-atardecer.webp', 'assets/proyectos/misiones-coati.webp', 'assets/proyectos/misiones-aerea.webp', 'assets/proyectos/misiones-comunidades.webp', 'assets/proyectos/misiones-rio.webp', 'assets/proyectos/misiones-puma.webp',
    'assets/proyectos/misiones-dosel-niebla.webp', 'assets/proyectos/misiones-interior.webp', 'assets/proyectos/misiones-acantilado.webp', 'assets/proyectos/misiones-dosel.webp',
    'assets/proyectos/misiones-cielo.webp', 'assets/proyectos/misiones-extraccion.webp', 'assets/proyectos/misiones-provincia.webp'], role: ['Redacción del documento de programa (PD).', 'Datos de actividad del nivel de referencia de emisiones forestales (FREL).', 'Aplicación de la metodología y sistema MRV.', 'Datos de actividad del período de monitoreo.', 'Marco legal de titularidad de los VCUs.', 'Análisis de incertidumbre, fugas y no permanencia.', 'Respuestas a hallazgos de AENOR, Verra y Sylvera.'], period: '2017–2022', featured: true, img: 'assets/proyectos/misiones.jpg', client: 'Provincia de Misiones', country: 'Argentina', svc: 'mitigar', ind: 'Mercados de carbono',
    title: 'Programa Jurisdiccional REDD+ ECO2', kpi: ['10.175.209', 'VCUs emitidos · 2017–2022'],
    short: 'El primer programa JNR del mundo en emitir créditos de carbono, liderado por un gobierno subnacional.',
    body: ['Verra aprobó la emisión de los primeros 10.175.209 VCUs del Programa JNR de la Provincia de Misiones, una de las mayores emisiones para un solo período de verificación. Detrás hay más de 3 millones de hectáreas de Selva Paranaense protegidas por décadas de política pública.',
      'Coralia acompañó el proceso de punta a punta: redacción del documento de programa (PD), datos de actividad del nivel de referencia (FREL), sistema MRV, datos del período de monitoreo, marco legal de titularidad de los VCUs, análisis de incertidumbre, fugas y no permanencia, y respuestas a AENOR, Verra y Sylvera.'],
    // Nota con el formato nuevo (Revisión 02, punto 24): solo datos ya publicados (Company deck 2026, Verra, Sylvera).
    // TODO: fechas de cada etapa (las pasa Nico); las del boceto eran ilustrativas
    note: {
      logo: 'assets/logos/gobierno-misiones.webp', place: 'Provincia de Misiones, Argentina',
      metrics: [['10.175.209', 'VCUs emitidos'], ['1,5M ha', 'de bosque nativo, verificado por AENOR'], ['A–AA', 'rating de Sylvera antes de la emisión'], ['2,8M', 'VCUs elegibles para CORSIA']],
      facts: [['Estándar', 'Verra JNR · VCS 4648'], ['Período', '2017–2022']],
      challenge: ['Detrás del programa hay más de 3 millones de hectáreas de Selva Paranaense protegidas por décadas de política pública.',
        'El desafío: convertir esa conservación en créditos de carbono verificables a escala de toda una provincia, con un gobierno subnacional al frente, algo que nadie había logrado antes.'],
      did: 'Coralia acompañó el proceso de punta a punta, del documento de programa a las respuestas a los auditores.',
      steps: [['2017–2022', 'Período de monitoreo'], ['', 'Documento de programa (PD) y nivel de referencia (FREL)'], ['', 'Validación y verificación · AENOR y Verra'], ['Enero 2026', 'Rating Sylvera A–AA previo a la emisión'], ['', 'Emisión de 10.175.209 VCUs']],
      result: ['Verra aprobó la emisión de los primeros 10.175.209 VCUs del programa: una de las mayores emisiones para un solo período de verificación, y la primera de un programa jurisdiccional liderado por un gobierno subnacional.',
        'Los beneficios se reparten entre el fondo provincial (40%), los propietarios (30%) y las comunidades (30%), con consentimiento libre, previo e informado.'],
    },
    url: 'https://www.coraliae.com/projects-jnrmisiones' },
  { id: 'ypf', hero: 'assets/proyectos/ypf.jpg', gallery: [], period: '2020 · 2024 · 2025', featured: true, img: 'assets/proyectos/ypf.jpg', client: 'YPF', country: 'Argentina', svc: 'adaptar', ind: 'Oil & Gas',
    title: 'Riesgo climático en operaciones estratégicas', kpi: ['100 años', 'de horizonte en los mapas de riesgo'],
    short: 'Metodología propia de riesgo climático para 8 operaciones de la principal energética del país.',
    body: ['En 2020 diseñamos una metodología de riesgo climático a medida, con mapas de riesgo futuro de hasta 100 años para lluvias torrenciales, olas de calor y sequías, aplicada a complejos industriales, yacimientos convencionales y no convencionales y centrales térmicas.',
      'A partir de los resultados armamos un plan de adaptación integral. YPF volvió a contratar a Coralia en 2024 y 2025 para actualizar el análisis y mejorar sus metodologías internas.'],
    note: {
      logo: 'assets/logos/ypf.webp', place: 'Argentina · 8 operaciones',
      metrics: [['100 años', 'de horizonte en los mapas de riesgo futuro'], ['8', 'operaciones analizadas en todo el país'], ['3', 'amenazas: lluvias torrenciales, olas de calor y sequías']],
      facts: [['Industria', 'Oil & Gas'], ['Período', '2020 · 2024 · 2025']],
      challenge: ['YPF, la principal energética del país, necesitaba entender cómo el cambio climático puede afectar sus operaciones estratégicas: complejos industriales, yacimientos convencionales y no convencionales y centrales térmicas.',
        'Hacía falta una metodología que diera resultados aplicables directamente en sus sistemas de gestión interna.'],
      did: 'En 2020 diseñamos e implementamos una metodología de riesgo climático a medida, con mapas de riesgo futuro de hasta 100 años para lluvias torrenciales, olas de calor y sequías.',
      steps: [['2020', 'Metodología y mapas de riesgo a medida'], ['', 'Plan de adaptación integral'], ['2024', 'Nueva contratación'], ['2025', 'Actualización del análisis y de las metodologías internas']],
      result: ['A partir de los resultados armamos un plan de adaptación integral, con medidas clasificadas y acciones concretas para mitigar los impactos del cambio climático en la actividad de YPF.',
        'El trabajo consolidó la confianza entre las dos organizaciones: YPF volvió a contratar a Coralia en 2024 y 2025 para actualizar el análisis de riesgo y mejorar sus metodologías internas.'],
    },
    url: 'https://www.coraliae.com/projects-ypf' },
  { id: 'genneia', hero: 'assets/proyectos/genneia-1.jpg', gallery: ['assets/proyectos/genneia-1.jpg'], quote: 1, period: '2023–2030', featured: false, img: 'assets/proyectos/genneia.jpg', client: 'Genneia', country: 'Argentina', svc: 'mitigar', ind: 'Energía solar',
    title: 'Parques solares en la región de Cuyo', kpi: ['123.470', 'tCO₂e reducidas en la primera verificación'],
    short: 'Documento de proyecto para un grupo de parques solares en San Juan y Mendoza, bajo el estándar BioCarbon.',
    body: ['La primera etapa, en San Juan, fue validada bajo el estándar BioCarbon y superó su primera verificación. Para el período 2023–2030 se proyecta una reducción acumulada de más de 900.000 tCO₂e.',
      'El enfoque agrupado permite sumar nuevos parques en San Juan y Mendoza y vincular la generación renovable con el mercado voluntario de carbono.'],
    note: {
      logo: 'assets/logos/genneia.webp', place: 'San Juan y Mendoza, Argentina',
      metrics: [['123.470', 'tCO₂e reducidas en la primera verificación'], ['+900.000', 'tCO₂e de reducción proyectada 2023–2030'], ['ODS 7', 'energía asequible y no contaminante']],
      facts: [['Estándar', 'BioCarbon'], ['Período', '2023–2030']],
      challenge: ['Genneia desarrolla un grupo de parques solares en la región de Cuyo que generan energía fotovoltaica para el Sistema Argentino de Interconexión.',
        'Para que proyectos así sean viables en países con desafíos estructurales para la energía limpia, es clave vincularlos con mecanismos de financiamiento climático como el mercado voluntario de carbono.'],
      did: 'Coralia elaboró el documento de proyecto para el grupo de parques solares, con un enfoque agrupado que permite sumar nuevos parques en San Juan y Mendoza.',
      steps: [['', 'Documento de proyecto para el grupo de parques'], ['', 'Validación de la primera etapa, en San Juan · BioCarbon'], ['', 'Primera verificación: 123.470 tCO₂e'], ['2023–2030', 'Reducción proyectada de más de 900.000 tCO₂e']],
      result: ['La primera etapa, en San Juan, fue validada bajo el estándar BioCarbon y superó su primera verificación, con una reducción de 123.470 tCO₂e.',
        'Para el período 2023–2030 se proyecta una reducción acumulada de más de 900.000 tCO₂e: una iniciativa clave para la mitigación del cambio climático en la región.'],
    },
    url: 'https://www.coraliae.com/projects-genneia' },
  { id: 'mercuria', hero: 'assets/proyectos/mercuria-1.jpg', gallery: ['assets/proyectos/mercuria-1.jpg'], featured: false, img: 'assets/proyectos/mercuria.jpg', client: 'Mercuria', country: 'Argentina', svc: 'mitigar', ind: 'Energía eólica',
    title: 'Monitoreo de los parques eólicos PER1 y PER2', kpi: ['209.719', 'tCO₂e certificadas bajo VCS'],
    short: 'Informe de monitoreo de 77,4 MW eólicos en Puerto Madryn, con metodología ACM0002.',
    body: ['Los parques suman 43 aerogeneradores y 77,4 MW. En el período monitoreado entregaron 293.014 MWh al Sistema Argentino de Interconexión.',
      'Recolectamos, analizamos y validamos datos horarios de generación contra facturación. La reducción certificada superó la estimación inicial del PDD (189.109 tCO₂e).'],
    note: {
      place: 'Puerto Madryn, Argentina',
      metrics: [['77,4 MW', 'en 43 aerogeneradores'], ['293.014 MWh', 'entregados al Sistema Argentino de Interconexión'], ['209.719', 'tCO₂e certificadas']],
      facts: [['Estándar', 'Verified Carbon Standard (VCS)'], ['Metodología', 'ACM0002'], ['Período', '2014']],
      challenge: ['Los parques eólicos PER1 (27 aerogeneradores, 48,6 MW) y PER2 (16 aerogeneradores, 28,8 MW) necesitaban su informe de monitoreo bajo el Verified Carbon Standard.',
        'En el segundo período de monitoreo, del 1 de enero al 31 de diciembre de 2014, generaron 181.621 MWh y 111.392 MWh: en total, 293.014 MWh entregados al Sistema Argentino de Interconexión.'],
      did: 'Coralia lideró el informe de monitoreo: recolectamos, analizamos y validamos los datos horarios de generación, controlamos la información contra la facturación y documentamos cada procedimiento.',
      steps: [['2014', 'Segundo período de monitoreo'], ['', 'Validación de datos horarios contra facturación'], ['', 'Cálculo con la metodología ACM0002'], ['', 'Reducción certificada bajo VCS']],
      result: ['La metodología ACM0002 permitió calcular con precisión las emisiones evitadas, considerando el desempeño real de los equipos de medición verificado por CAMMESA y el factor de emisión de la red argentina.',
        'La reducción certificada superó la estimación inicial del PDD (189.109 tCO₂e), con créditos de carbono de alta calidad que apoyan la transición energética.'],
    },
    url: 'https://www.coraliae.com/projects-mercuria' },
  { id: 'pluspetrol', hero: 'assets/proyectos/pluspetrol-1.jpg', gallery: ['assets/proyectos/pluspetrol-1.jpg', 'assets/proyectos/pluspetrol-2.jpg'], period: '2021–2023', featured: false, img: 'assets/proyectos/pluspetrol.jpg', client: 'Pluspetrol Perú Corporation', country: 'Perú', svc: 'medir', ind: 'Oil & Gas',
    title: 'Inventario corporativo de GEI 2021–2023', kpi: ['ISO 14064-1', 'certificado con aseguramiento razonable'],
    short: 'Primer inventario de la compañía certificado por ICONTEC bajo ISO 14064-1:2018.',
    body: ['Relevamos las categorías 1 a 5 de la norma en los pozos del Consorcio Camisea, las líneas de transporte, la planta de Malvinas, la planta de fraccionamiento y el terminal marino de Pisco.',
      'Revisamos las calculadoras existentes y desarrollamos calculadoras propias de emisiones fugitivas. Acompañamos la auditoría hasta resolver cada observación.'],
    note: {
      logo: 'assets/logos/pluspetrol.webp', place: 'Cusco e Ica, Perú',
      metrics: [['ISO 14064-1', 'certificado por ICONTEC con aseguramiento razonable'], ['3 años', 'de inventario: 2021, 2022 y 2023'], ['Categorías 1 a 5', 'de la norma, en toda la operación']],
      facts: [['Norma', 'ISO 14064-1:2018'], ['Período', '2021–2023']],
      challenge: ['Pluspetrol Perú Corporation produce gas natural y líquidos de gas natural que abastecen a la industria y a los hogares de todo Perú.',
        'Su inventario corporativo de gases de efecto invernadero tenía que pasar una auditoría externa y certificarse por primera vez bajo ISO 14064-1:2018.'],
      did: 'Relevamos las categorías 1 a 5 de la norma en toda la operación: la producción del Consorcio Camisea, las líneas de transporte de gas, la planta de Malvinas (Cusco) y la planta de fraccionamiento y el terminal marino de Pisco (Ica).',
      steps: [['2021–2023', 'Inventario corporativo de GEI'], ['', 'Calculadoras propias de emisiones fugitivas'], ['', 'Auditoría externa'], ['', 'Certificación de ICONTEC con aseguramiento razonable']],
      result: ['El inventario logró por primera vez la certificación de ICONTEC con aseguramiento razonable. Acompañamos toda la auditoría, respondiendo cada observación hasta su resolución.',
        'Además, revisamos las calculadoras que usaba la compañía y desarrollamos calculadoras propias para las emisiones fugitivas, lo que mejoró la precisión y la trazabilidad de los resultados.'],
    },
    url: 'https://www.coraliae.com/projects-pluspetrol' },
  { id: 'phoenix', hero: 'assets/proyectos/phoenix-1.jpg', gallery: ['assets/proyectos/phoenix-1.jpg'], period: '2022–2024', featured: false, img: 'assets/proyectos/phoenix.jpg', client: 'Phoenix Global Resources', country: 'Argentina', svc: 'medir', ind: 'Oil & Gas',
    title: 'Inventario de GEI 2024 y ajuste 2022–2023', kpi: ['ISO 14064-1', 'inventarios listos para auditoría'],
    short: 'Inventario de activos convencionales y no convencionales en Neuquén y Mendoza.',
    body: ['Hicimos visitas técnicas a las plantas de Vaca Muerta, cuantificamos las categorías 1, 2 y 3 y diseñamos calculadoras de GEI específicas para cada activo.',
      'Capacitamos al equipo de la compañía para integrar esas calculadoras a su reporte interno y sostener registros actualizados.'],
    note: {
      logo: 'assets/logos/phoenix.webp', place: 'Neuquén y Mendoza, Argentina',
      metrics: [['3 años', 'de inventario: 2024 y el ajuste de 2022 y 2023'], ['Categorías 1, 2 y 3', 'según ISO 14064-1:2018'], ['2 provincias', 'Neuquén y Mendoza']],
      facts: [['Norma', 'ISO 14064-1:2018'], ['Período', '2022–2024']],
      challenge: ['Phoenix Global Resources necesitaba su inventario corporativo de gases de efecto invernadero de 2024 y un ajuste completo de los inventarios de 2022 y 2023.',
        'El inventario abarca producción no convencional de petróleo y gas en Neuquén y producción convencional en Mendoza.'],
      did: 'Hicimos visitas técnicas a las plantas de producción en Vaca Muerta para relevar en detalle las fuentes de emisión, y cuantificamos las categorías 1, 2 y 3 de la norma.',
      steps: [['2022–2023', 'Ajuste de los inventarios anteriores'], ['2024', 'Inventario corporativo de GEI'], ['', 'Calculadoras de GEI para cada activo'], ['', 'Capacitación del equipo de la compañía']],
      result: ['Diseñamos calculadoras de GEI específicas para cada activo y capacitamos al personal para usarlas en su reporte interno y su gestión ambiental.',
        'Los inventarios quedaron listos para una futura auditoría y certificación, y la compañía fortaleció su capacidad técnica para mantener registros de emisiones actualizados y consistentes.'],
    },
    url: 'https://www.coraliae.com/projects-phoenixglobalresources' },
  { id: 'andromaco', hero: 'assets/proyectos/andromaco-1.jpg', gallery: ['assets/proyectos/andromaco-1.jpg'], quote: 0, featured: true, img: 'assets/proyectos/andromaco.jpg', client: 'Laboratorios Andrómaco', country: 'Argentina', svc: 'medir', ind: 'Farmacéutica',
    title: 'Huella de carbono de la línea Dermaglós', kpi: ['Huella de producto', 'con datos de origen real de cada insumo'],
    short: 'Metodología propia para estimar las emisiones de materias primas con información representativa.',
    body: ['En lugar de promedios internacionales, trabajamos con información de cada insumo según su método de producción y país de origen, reduciendo la incertidumbre del cálculo.',
      'El trabajo alimenta una base de datos propia de huellas de materias primas del sector cosmético y continúa una colaboración que empezó con la línea Aveno.'],
    note: {
      logo: 'assets/logos/andromaco.webp', place: 'Argentina',
      metrics: [['Dermaglós', 'línea terapéutica medida'], ['Insumo por insumo', 'con su método de producción y país de origen reales'], ['50 años', 'de Dermaglós, la marca insignia de la compañía']],
      facts: [['Industria', 'Farmacéutica'], ['Servicio', 'Huella de carbono de producto']],
      challenge: ['Laboratorios Andrómaco, una compañía argentina con casi 100 años de trayectoria, quería conocer la huella de carbono de Dermaglós Terapéutico, la línea de su marca insignia en cuidado de la piel.',
        'El problema: los enfoques tradicionales usan promedios de bases de datos internacionales, y así la huella de las materias primas queda con mucha incertidumbre.'],
      did: 'Diseñamos una metodología específica para estimar las emisiones indirectas de las materias primas, trabajando con información representativa de cada insumo según su método de producción y su país de origen real.',
      result: ['El cálculo redujo la incertidumbre y fortaleció la calidad técnica del análisis.',
        'Además, Coralia sigue ampliando su propia base de datos de huellas de carbono de materias primas del sector cosmético, una herramienta para futuras mediciones. El trabajo continúa una colaboración que empezó con la línea Aveno.'],
    },
    url: 'https://www.coraliae.com/projects-laboratoriosandromaco' },
  { id: 'sesuai', hero: 'assets/proyectos/sesuai.jpg', gallery: [], tallImg: 'assets/proyectos/sesuai-tarjeta.webp', tallBaked: true, featured: false, img: 'assets/proyectos/sesuai.jpg', client: 'sesu.ai', country: 'Argentina', svc: 'consultoria', ind: 'Energía solar',
    title: 'Prefactibilidad de los parques solares El Pongo I y II', kpi: ['200 MW', 'proyectados en Jujuy'],
    short: 'Estudio técnico, legal, ambiental y comercial para un consorcio coreano.',
    body: ['Analizamos la participación en el MATER, el marco regulatorio y los incentivos como el RIGI y beneficios provinciales, además de las condiciones para la evaluación de impacto ambiental.',
      'Estudiamos compradores potenciales vía contratos PPA y actuamos como enlace entre el gobierno provincial, el consorcio y las autoridades nacionales.'],
    note: {
      logo: 'assets/logos/sesuai.webp', place: 'Jujuy, Argentina',
      metrics: [['200 MW', 'proyectados entre los dos parques'], ['2 parques', 'El Pongo I y El Pongo II'], ['4 frentes', 'técnico, legal, ambiental y comercial']],
      facts: [['Industria', 'Energía solar'], ['Financiamiento', 'Ministerio de Ambiente de Corea']],
      challenge: ['Un consorcio coreano, con financiamiento del Ministerio de Ambiente de Corea, quiere desarrollar los parques solares El Pongo I y II en Jujuy, con una capacidad proyectada de 200 MW.',
        'Para avanzar con una inversión estratégica en la transición energética argentina, necesitaba bases técnicas, legales y comerciales sólidas.'],
      did: 'Coralia participa en el estudio de prefactibilidad con un enfoque integral y multidisciplinario.',
      steps: [['', 'Técnico y regulatorio: participación en el MATER'], ['', 'Legal: contratos e incentivos como el RIGI'], ['', 'Ambiental: condiciones para la evaluación de impacto'], ['', 'Comercial: compradores vía contratos PPA']],
      result: ['Analizamos la participación en el Mercado a Término de Energías Renovables (MATER), el marco regulatorio, las estrategias contractuales y los incentivos como el RIGI y los beneficios provinciales de Jujuy.',
        'También estudiamos los compradores potenciales mediante contratos PPA de largo plazo y actuamos como enlace entre el gobierno provincial, el consorcio y las autoridades nacionales.'],
    },
    url: 'https://www.coraliae.com/projects-sesuai' },
  { id: 'ruuts', hero: 'assets/proyectos/ruuts-1.jpg', gallery: ['assets/proyectos/ruuts-1.jpg'], tallImg: 'assets/proyectos/ruuts-1.jpg', featured: false, img: 'assets/proyectos/ruuts.jpg', client: 'Ruuts', country: 'Paraguay', svc: 'mitigar', ind: 'Ganadería',
    title: 'Ganadería regenerativa y conservación de bosque', kpi: ['ALM + ARR', 'en fase de implementación'],
    short: 'Proyecto de carbono con sistemas silvopastoriles bajo cubierta forestal.',
    body: ['Combina manejo agrícola mejorado (ALM) y forestación, reforestación y revegetación (ARR) para reducir la presión de desmonte en zonas históricamente deforestadas.',
      'Los equipos de campo ya están capacitados y monitorean el trabajo en terreno.'],
    note: {
      place: 'Paraguay',
      metrics: [['ALM + ARR', 'manejo agrícola mejorado y forestación'], ['Verra', 'estándares internacionales de certificación'], ['En marcha', 'fase de implementación, con equipos de campo capacitados']],
      facts: [['Industria', 'Ganadería'], ['Estándar', 'Verra']],
      challenge: ['En zonas de Paraguay históricamente deforestadas, la ganadería presiona sobre el bosque.',
        'El desafío es producir y conservar al mismo tiempo: que la actividad ganadera conviva con la conservación y la restauración del bosque y del suelo.'],
      did: 'Junto a Ruuts desarrollamos un proyecto de carbono que combina manejo agrícola mejorado (ALM) y forestación, reforestación y revegetación (ARR), con sistemas silvopastoriles bajo cubierta forestal.',
      steps: [['', 'Diseño del proyecto: ALM + ARR'], ['', 'Capacitación de los equipos de campo'], ['', 'Reestructuración de las áreas de pastoreo'], ['', 'Implementación y monitoreo en terreno']],
      result: ['El proyecto ya está en fase de implementación. Las primeras acciones reestructuran las áreas de pastoreo y reducen el impacto ambiental de la ganadería en zonas degradadas.',
        'Todo el proceso sigue los estándares de Verra, para asegurar una cuantificación, una verificación y una certificación rigurosas de los resultados.'],
    },
    url: 'https://www.coraliae.com/projects-ruuts' },
  { id: 'wipo', hero: 'assets/proyectos/wipo-1.jpg', gallery: ['assets/proyectos/wipo-1.jpg'], featured: false, img: 'assets/proyectos/wipo.jpg', client: 'WIPO GREEN (OMPI)', country: 'Argentina', svc: 'consultoria', ind: 'Agro',
    title: 'Fase IV del Proyecto de Aceleración WIPO GREEN', kpi: ['ONU', 'iniciativa de la Organización Mundial de la Propiedad Intelectual'],
    short: 'Conectamos productores con proveedores de tecnología sostenible.',
    body: ['Coralia fue seleccionada para liderar la implementación en Argentina: identificamos productores de peras, manzanas, uvas y berries con desafíos de sustentabilidad.',
      'Los conectamos con proveedores de soluciones tecnológicas a través de la plataforma global de WIPO GREEN, con asesoramiento en propiedad intelectual del INPI.'],
    note: {
      place: 'Argentina',
      metrics: [['Fase IV', 'del Proyecto de Aceleración WIPO GREEN'], ['4 cultivos', 'peras, manzanas, uvas y berries'], ['ONU', 'iniciativa de la Organización Mundial de la Propiedad Intelectual']],
      facts: [['Industria', 'Agro'], ['Rol', 'Implementación en Argentina']],
      challenge: ['WIPO GREEN, impulsada por la Organización Mundial de la Propiedad Intelectual (OMPI), una agencia de Naciones Unidas, busca facilitar la innovación y la difusión de tecnologías sostenibles en todo el mundo.',
        'En Argentina, el desafío era encontrar productores de peras, manzanas, uvas y berries con problemas de sustentabilidad, y conectarlos con tecnologías que mejoren sus procesos.'],
      did: 'Coralia fue seleccionada para liderar la implementación en Argentina. Como facilitadores, conectamos a los productores que tienen una necesidad con los proveedores de soluciones tecnológicas.',
      steps: [['', 'Selección de Coralia para liderar la Fase IV en Argentina'], ['', 'Relevamiento de productores y sus desafíos'], ['', 'Conexión con proveedores en la plataforma WIPO GREEN']],
      result: ['Los productores acceden a soluciones de punta adaptadas a lo que necesitan, a través de la plataforma global y de acceso abierto de WIPO GREEN.',
        'Los proveedores se posicionan como referentes en sustentabilidad, reciben asesoramiento especializado en propiedad intelectual y participan sin costo en una iniciativa respaldada por la ONU.'],
    },
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
const bakedLogo = (c, src) => src === c.img || (c.tallBaked && src === c.tallImg);   // la foto ya trae el logo
// tarjeta sin foto pero con logo del cliente (note.logo): el logo en una pastilla blanca, en vez del nombre escrito
const clientMark = (c, src) => (!src && c.note && c.note.logo ? `<span class="logo-chip"><img src="${c.note.logo}" alt="${c.client}"></span>` : c.client);

// Equipo (fuente: coraliae.com). group: direccion · tecnico · relaciones · gestion
// photo: assets/equipo/<id>.jpg (blanco y negro) · color: <id>-color.jpg (si existe)
// linkedin: perfil de cada persona (al tocar su foto en la ficha se abre).
// Con el link cargado, la foto de su ficha y el botón LinkedIn llevan a su perfil.
const TEAM = [
  { id: 'fabian-gaioli', name: 'Fabián Gaioli', linkedin: 'https://www.linkedin.com/in/fabi%C3%A1n-gaioli-46a09418/', group: 'direccion', area: 'Director Ejecutivo (CEO)', title: 'Estrategia global de la compañía',
    skills: ['Doctor en Física', 'Más de 30 años en cambio climático', 'Autor principal de metodologías de carbono (MDL, Verra)', 'Más de 50 proyectos de carbono en AFOLU, energía y residuos', 'Estrategias nacionales (NDC, BUR)', 'Finanzas climáticas (GCF, PNUD)', 'Experto del IPCC', 'Más de 50 publicaciones y 100 charlas'] },
  { id: 'nicolas-gaioli', name: 'Nicolás Gaioli', linkedin: 'https://www.linkedin.com/in/nicol%C3%A1s-gaioli-9a0560221/', group: 'direccion', area: 'Director de Operaciones (COO)', title: 'Supervisión del desempeño de proyectos',
    skills: ['Liderazgo estratégico y operativo', 'Desarrollo de proyectos de carbono (Verra, BCR)', 'Inventarios de GEI', 'Experiencia en AFOLU', 'Agricultura regenerativa y proyectos forestales'] },
  { id: 'claudia-bernardou', name: 'Claudia Bernardou', linkedin: 'https://www.linkedin.com/in/claudia-bernardou-21b925175/', group: 'gestion', area: 'Asistente Ejecutiva', title: 'Eficiencia y coherencia organizacional',
    skills: ['Soporte administrativo', 'Coordinación de RR. HH. y del equipo', 'Gestión de agenda y flujos de trabajo', 'Seguimiento de tareas estratégicas', 'Procesos internos y de oficina'] },
  { id: 'augusto-fumagalli', name: 'Augusto Fumagalli', linkedin: 'https://www.linkedin.com/in/augusto-fumagalli-0b9459213/', group: 'tecnico', area: 'Equipo técnico · Riesgo climático', title: 'Analista técnico y líder científico',
    skills: ['Modelos climáticos CMIP6', 'QGIS para proyección de amenazas', 'Encuestas de sensibilidad', 'Matrices causa-efecto', 'Vulnerabilidad e impacto', 'Proyectos de carbono AFOLU'] },
  { id: 'filippo-berdes', name: 'Filippo Berdes', linkedin: 'https://www.linkedin.com/in/filippoberdes/', group: 'tecnico', area: 'Equipo técnico · Riesgo climático', title: 'Especialista en modelado climático',
    skills: ['Modelos climáticos CMIP6', 'QGIS para proyección de amenazas', 'Matrices causa-efecto', 'Vulnerabilidad e impacto', 'Diseño de metodologías de riesgo climático'] },
  { id: 'marisa-zaragozi', name: 'Marisa Zaragozi', linkedin: 'https://www.linkedin.com/in/marisa-zaragozi-238bb723/', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Líder técnica de proyectos de energía y residuos',
    skills: ['Diseño y monitoreo de proyectos', 'Factibilidad y evaluaciones metodológicas', 'Estrategias de descarbonización', 'Estándares de carbono (MDL, Verra)', 'Asesoramiento público y privado'] },
  { id: 'lourdes-manrique', name: 'Lourdes Manrique', linkedin: 'https://www.linkedin.com/in/lourdesmanrique/', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Líder técnica de proyectos J-REDD',
    skills: ['Proyecciones de emisiones y MRV', 'Herramientas de huella de carbono', 'Evaluación de proyectos forestales', 'Negociaciones climáticas nacionales y CMNUCC', 'Coordinación multisectorial'] },
  { id: 'marina-pinkasz', name: 'Marina Pinkasz', linkedin: 'https://www.linkedin.com/in/marina-pinkasz/', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Líder técnica de proyectos ARR',
    skills: ['Liderazgo de proyectos NbS', 'Vínculo con productores', 'I+D en tecnologías verdes', 'Prácticas sostenibles', 'Herramientas SIG'] },
  { id: 'laureano-bragado', name: 'Laureano Bragado', linkedin: 'https://www.linkedin.com/in/laureano-bragado-34917a365/', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Analista técnico Jr. de proyectos ARR',
    skills: ['Asistencia en proyectos NbS', 'Vínculo con productores', 'I+D en tecnologías verdes', 'AFOLU: REDD, ALM, ARR', 'Uso sostenible del suelo'] },
  { id: 'agustina-blazquez', name: 'Agustina Blázquez', linkedin: 'https://www.linkedin.com/in/agustina-bl%C3%A1zquez-0b179b26b/', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Analista técnica Jr. de proyectos de carbono azul',
    skills: ['Desarrollo de proyectos NbS', 'Monitoreo de carbono azul', 'Herramientas SIG', 'Degradación y deforestación', 'Documentos de proyecto (PD)', 'Modelado de riesgo climático'] },
  // habilidades según el cargo (Media and Communications Officer); a confirmar con Lucas
  { id: 'lucas-gaioli', name: 'Lucas Gaioli', linkedin: 'https://www.linkedin.com/in/lucas-gaioli/', group: 'gestion', area: 'Medios y comunicación', title: 'Responsable de medios y comunicación',
    skills: ['Comunicación institucional', 'Redes sociales y LinkedIn', 'Prensa y relación con medios', 'Contenido audiovisual', 'Comunicación de proyectos de carbono'] },
  { id: 'hernan-lopez', name: 'Hernán Lopez', linkedin: 'https://www.linkedin.com/in/hernan-lopez-4367036/', group: 'relaciones', area: 'Relaciones internacionales', title: 'Gerente de proyectos de carbono Norteamérica',
    skills: ['Búsqueda de proyectos en Norteamérica', 'Vinculación con actores', 'Desarrollo de alianzas', 'Documentos de proyecto', 'Mercado de carbono', 'Financiamiento'] },
  { id: 'rosario-lombardi', name: 'Rosario Lombardi', linkedin: 'https://www.linkedin.com/in/mar%C3%ADa-del-rosario-lombardi-22bbb218b/', group: 'gestion', area: 'Finanzas y contabilidad', title: 'Asistente financiera',
    skills: ['Flujo de caja', 'Conciliación de gastos', 'Presupuestos', 'Reportes financieros', 'Pagos y cobranzas'] },
  { id: 'kieffer-schroder', name: 'Kieffer Schroder', linkedin: 'https://www.linkedin.com/in/kieffer-kersten-schroder-308a322bb/', group: 'tecnico', area: 'Equipo técnico · Mercados de carbono', title: 'Pasante de Sostenibilidad y Mercados de Carbono',
    skills: ['Ingeniero ambiental', 'Sostenibilidad', 'Mercados de carbono'] },
  { id: 'ignacio-bilbao', name: 'Ignacio Bilbao', linkedin: 'https://www.linkedin.com/in/ignacio-bautista-bilbao-244519333/', group: 'gestion', area: 'IT y plataformas digitales', title: 'Pasante de IT y Plataformas Digitales',
    skills: ['Desarrollo web', 'Plataformas digitales', 'Soporte IT'] },
];
const TEAM_GROUPS = { all: 'Todos', direccion: 'Dirección', tecnico: 'Equipo técnico', relaciones: 'Relaciones internacionales', gestion: 'Gestión' };

// Pipeline de proyectos propios (para inversores). TODO: completar con la info que pasa Coralia.
// Cada uno: id (para el link), nombre, tipo, ubicación, etapa, hectáreas, créditos estimados, descripción y fotos.
// Pipeline de proyectos propios (para inversores). Datos de los kits de comunicación de cada proyecto.
// kpi: el número grande de la ficha. TODO Coralia: créditos estimados de cada proyecto y los que faltan del pipeline (son 6–7).
const PIPELINE = [
  { id: 'remonte', name: 'ReMonte', type: 'ARR', place: 'Gran Chaco · Santiago del Estero, Argentina', stage: 'Rating Sylvera AA–A previo a la emisión',
    // card (Revisión 02): datos del PD ReMonte v4.4 (ago-2026). 156.000 ha = meta del proyecto agrupado; 8,3 M VCUs = estimado a 40 años
    // TODO: foto de la card con las vacas en El Tumé (la pasa Nico); por ahora va la foto del monte
    country: 'Argentina', flag: 'ar', color: '#8a6a32',
    card: { desc: 'Regeneración del bosque nativo y ganadería regenerativa en campos degradados del Chaco Seco.',
      a: ['Hectáreas', '156.000'], b: ['Créditos (40 años)', '8,3 millones'], std: ['vcs', 'ccb'], meth: ['Metodología', 'VM0047 v1.1'] },
    ha: '156.000 ha', kpi: ['156.000 ha', 'de Chaco Seco donde el bosque nativo vuelve con la hacienda adentro'],
    desc: ['El monte chaqueño no se planta: se deja volver. ReMonte es un programa de regeneración natural asistida del bosque nativo del Chaco Seco, con la ganadería adentro.',
      'El renoval no es una maleza: es el bosque volviendo. En el campo medimos cuánto monte queda y cuánto puede volver: cobertura leñosa nativa, renoval, suelo y forraje en El Tumé, La Colonia y Tres Flores.',
      'Sylvera le otorgó un rating AA–A previo a la emisión (junio de 2026).'],
    img: 'assets/pipeline/remonte-3.webp', gallery: ['assets/pipeline/remonte-6.webp', 'assets/pipeline/remonte-7.webp', 'assets/pipeline/remonte-1.webp', 'assets/pipeline/remonte-8.webp', 'assets/pipeline/remonte-2.webp',
      'assets/pipeline/remonte-9.webp', 'assets/pipeline/remonte-10.webp', 'assets/pipeline/remonte-4.webp', 'assets/pipeline/remonte-11.webp', 'assets/pipeline/remonte-12.webp', 'assets/pipeline/remonte-5.webp',
      'assets/pipeline/remonte-13.webp', 'assets/pipeline/remonte-14.webp', 'assets/pipeline/remonte-15.webp', 'assets/pipeline/remonte-16.webp',
      'assets/pipeline/remonte-17.webp', 'assets/pipeline/remonte-18.webp', 'assets/pipeline/remonte-19.webp', 'assets/pipeline/remonte-20.webp'] },
  { id: 'chubut', name: 'Chubut ARR', type: 'ARR', place: 'Cholila · Chubut, Argentina', stage: 'Primera instancia de restauración',
    // card: Coralia Q&A 2 - Chubut ARR v2.0. 33.170 ha elegibles (3 PAIs); 5.211.444 VCUs a 40 años
    country: 'Argentina', flag: 'ar', color: '#2f5f4c',
    card: { desc: 'Restauración del bosque nativo andino-patagónico quemado en los incendios de 2014–2015.',
      a: ['Hectáreas', '33.170'], b: ['Créditos (40 años)', '5,2 millones'], std: ['vcs', 'ccb'], meth: ['Metodología', 'VM0047 v1.1'] },
    ha: '33.170 ha', kpi: ['33.170 ha', 'elegibles para restaurar, en tres áreas del bosque andino-patagónico'],
    desc: ['El fuego se midió en hectáreas. La recuperación también. Proyecto ARR sobre el paisaje del bosque andino-patagónico afectado por los incendios de 2014-2015, junto al Gobierno del Chubut.',
      'Cada hectárea se verifica en el terreno: muestreo de suelo y parcelas de monitoreo en el área afectada por los incendios.'],
    img: 'assets/pipeline/chubut-1.webp', gallery: ['assets/pipeline/chubut-4.webp', 'assets/pipeline/chubut-5.webp', 'assets/pipeline/chubut-2.webp', 'assets/pipeline/chubut-6.webp', 'assets/pipeline/chubut-3.webp',
      'assets/pipeline/chubut-7.webp', 'assets/pipeline/chubut-8.webp', 'assets/pipeline/chubut-9.webp', 'assets/pipeline/chubut-10.webp', 'assets/pipeline/chubut-11.webp',
      'assets/pipeline/chubut-12.webp', 'assets/pipeline/chubut-13.webp', 'assets/pipeline/chubut-14.webp', 'assets/pipeline/chubut-mapa.webp'] },
  { id: 'dbcx', name: 'Dominican Blue Carbon', type: 'Blue Carbon', place: 'Montecristi y Puerto Plata, República Dominicana', stage: 'Medición en campo · octubre 2025',
    // card: PD "Datos degradados (13.10.26)". 4.011,9 ha (conservación + restauración). Créditos: cifra de la card de referencia de Nico
    // (2,8 M); Nico avisa que hay que actualizarla cuando se cierre la cuantificación (leakage, incertidumbre, buffer y restauración)
    country: 'República Dominicana', flag: 'do', color: '#1f5a72',
    card: { desc: 'Restauración y conservación de manglares en Estero Balsa y Estero Hondo.',
      a: ['Hectáreas', '4.012'], b: ['Créditos (40 años)', '2,8 millones'], std: ['vcs'], meth: ['Metodologías', 'VM0033 v2.1 · VM0007 v1.8'] },
    ha: '2.784 ha', kpi: ['2.784 ha', 'de manglar bajo un proyecto de conservación y restauración a 40 años'],
    desc: ['De mercados climáticos de alto riesgo a soluciones climáticas de bajo riesgo: desarrollo de un proyecto de carbono en manglar, con el Dominican Blue Carbon Exchange Fund Trust.',
      'La degradación se mide; la recuperación también. Cada hectárea se verifica en el terreno: inventario de parcelas y muestreo de suelo en Montecristi y Puerto Plata (relevamiento de octubre de 2025).'],
    img: 'assets/pipeline/dbcx-1.webp', gallery: ['assets/pipeline/dbcx-4.webp', 'assets/pipeline/dbcx-2.webp', 'assets/pipeline/dbcx-5.webp', 'assets/pipeline/dbcx-3.webp', 'assets/pipeline/dbcx-6.webp',
      'assets/pipeline/dbcx-7.webp', 'assets/pipeline/dbcx-8.webp', 'assets/pipeline/dbcx-9.webp',
      'assets/servicios/blue-carbon-antes.webp', 'assets/servicios/blue-carbon-despues.webp'] },
  // Resilient Iberá, Argentina Biochar Initiative y ChaCo-ReForest salieron de la web a pedido de Nacho
  // (21/10/2026): les faltaban fotos y datos. Sus fichas quedaron en el historial de git (data.js antes de este cambio).
];

// Card de un proyecto del pipeline (Revisión 02, punto 20): foto con el tipo, bandera y país, título en su color,
// descripción, hectáreas | créditos, estándar (logos) | metodología, y la etapa con la flecha.
const FLAGS = {
  ar: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#74acdf"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><circle cx="15" cy="10" r="2.2" fill="#f6b40e"/></svg>',
  do: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#fff"/><rect width="13" height="8" fill="#002d62"/><rect x="17" width="13" height="8" fill="#ce1126"/><rect y="12" width="13" height="8" fill="#ce1126"/><rect x="17" y="12" width="13" height="8" fill="#002d62"/></svg>',
};
const STD_LOGOS = { vcs: ['assets/estandares/vcs.png', 'Verified Carbon Standard'], ccb: ['assets/estandares/ccb.png', 'Climate, Community & Biodiversity Standards'],
  biocarbon: ['assets/estandares/biocarbon.png', 'BioCarbon Standard'], puro: ['assets/estandares/puro.png', 'Puro.earth'] };
const STD_ICONS = { vcs: 'assets/estandares/vcs-icono.png', ccb: 'assets/estandares/ccb-icono.png' };
const TBC = 'A confirmar';
function pipeCard(p) {
  const c = p.card || {}, val = (v) => `<b class="pipc__v${v === TBC ? ' is-tbc' : ''}">${v}</b>`;
  // un solo estándar: logo completo (ícono + nombre); dos o más: solo los íconos, para que entren al lado de la metodología
  const solo = (c.std || []).length < 2;
  const std = (c.std || []).map((k) => STD_LOGOS[k] ? `<img src="${!solo && STD_ICONS[k] ? STD_ICONS[k] : STD_LOGOS[k][0]}" alt="${STD_LOGOS[k][1]}" title="${STD_LOGOS[k][1]}" loading="lazy" decoding="async">` : `<span class="pipc__stdtxt" translate="no">${k}</span>`).join('<i></i>');
  return `<a class="pipc" href="pipeline.html?p=${p.id}" style="--tc:${p.color || 'var(--forest)'}">
  <span class="pipc__media">${p.img ? `<img src="${p.img}" alt="" loading="lazy" decoding="async">` : '<span class="pipc__ph">Foto a cargar</span>'}<span class="pipc__type">${p.type}</span></span>
  <span class="pipc__body">
    <span class="pipc__country">${FLAGS[p.flag] || ''}<span>${p.country || ''}</span></span>
    <b class="pipc__title">${p.name}</b>
    <span class="pipc__desc${c.desc === 'Descripción a confirmar.' ? ' is-tbc' : ''}">${c.desc || ''}</span>
    <span class="pipc__row"><span><small>${c.a ? c.a[0] : ''}</small>${c.a ? val(c.a[1]) : ''}</span><span class="pipc__r"><small>${c.b ? c.b[0] : ''}</small>${c.b ? val(c.b[1]) : ''}</span></span>
    <span class="pipc__row pipc__row--std"><span><small>Estándar</small><span class="pipc__stds${solo ? '' : ' is-icons'}">${std}</span></span><span class="pipc__r"><small>${c.meth ? c.meth[0] : ''}</small><b class="pipc__meth${c.meth && c.meth[1] === TBC ? ' is-tbc' : ''}">${c.meth ? c.meth[1] : ''}</b></span></span>
    <span class="pipc__foot"><span class="pipc__stage">${p.stage}</span><span class="pipc__go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg></span></span>
  </span></a>`;
}

