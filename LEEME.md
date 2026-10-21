# Coralia — plataforma de inteligencia climática (en desarrollo)

Abrí la carpeta en VS Code y tocá **Go Live** sobre `index.html`.

La web presenta a Coralia como una plataforma de inteligencia climática: tres herramientas digitales
(Medir, Mitigar, Adaptar) con un equipo especializado detrás. Estilo claro tomado del deck institucional:
crema, verde bosque y verde hoja, con lima de acento.

## Tipografías (assets/fonts)
Títulos en **Fraunces** y textos en **Figtree** (licencia libre SIL OFL). Están instaladas dentro del proyecto,
así que no dependen de Google Fonts. Se declaran al principio de styles.css (@font-face).

## Revisión 01 (comentarios del 05/10/2026): la consultoría primero
- Sin la intro de la mariposa: la página arranca en la portada (la frase sigue apareciendo con el brillo).
- Portada: foto del río (assets/hero-portada.webp). Frase PROVISORIA "Soluciones ambientales / con impacto real /
  para cada organización." (TODO en index.html: la definitiva la pasa Coralia; la línea del medio va en lima).
  Botón "Conocé nuestros servicios". Tarjetas enfocadas en servicio: Huella de carbono, Mercados de carbono
  (350k toneladas removidas: NÚMERO A CONFIRMAR) y Riesgo climático.
- Menú: "Apps" pasó a "Servicios" (#servicios; #apps sigue funcionando). "Proyectos" lleva a proyectos.html.
- Qué es Coralia: debajo de la frase, "Nuestros servicios" (#servicios, el menú lleva acá): Medir, Mitigar y Adaptarse
  (como en el deck), cada uno despliega su panel abajo (Revisión 02, punto 19; ver más abajo). Son tres tarjetas con
  forma de carpeta (foto, nombre y la flecha en el hueco de la esquina; la forma es el clipPath #folder en
  index.html, proporción 5:4) con su texto abajo. La
  consultoría no es un servicio aparte: es cómo trabajamos en los tres (portada, "Trabajemos juntos").
  Cada servicio tiene su plataforma: Medir → Carbon Footprint, Mitigar → Carbon Markets Hub, Adaptar → Climate Risk.
- Paneles de servicio (servicio.js, contenido en SERVICIOS; antes eran páginas aparte): el texto de la web actual,
  Medición con la Huella de carbono (producto y corporativa, 6 pasos cada una);
  Mitigación con Mercados de carbono (+13,2M tCO₂e; Company deck 2026: ECO2 Misiones 10M+ más los proyectos
  anteriores por sector, 3,2M; proyecto destacado ECO2 Misiones con sus datos, reparto de beneficios y ratings; y los 14 pasos); Adaptación con el análisis de riesgo,
  sus 3 pilares y los 5 pasos. Cada panel termina con su plataforma y sus casos.
  Diseño de cada página (bloques "Páginas de servicio" en styles.css): cada servicio tiene el color de su app
  (Medir verde, Mitigar ámbar, Adaptarse azul). Arriba, a la derecha, los otros dos servicios para pasar directo. Cortes en diagonal: el encabezado, la franja de destacados (highlights en SERVICIOS,
  sobre la foto de la app) y la franja de la app. "Cómo lo hacemos": los pasos en una línea de tiempo en zigzag que se llena y enciende cada paso al
  bajar (en el celu, la línea va a la izquierda); en Medición, pestañas para elegir huella de producto o corporativa;
  en Mitigación, las dos etapas seguidas. En Adaptación, los 3 pilares como recorrido con íconos. Después, la app
  del servicio en grande (pantalla y "Conocé la app →") y los casos.
  Traducciones: i18n/fuente/6-servicios.py.
- La rueda es "Herramientas propias · Nuestras apps" (#apps; el menú tiene "Apps"): cada porción es una app, con
  el servicio al que pertenece en el panel ("Servicio: Medir →" lleva a su página). Fotos reales con el mismo
  tono por app (assets/apps/fondo-*.webp). El centro dice "Probá las apps →" (simuladores).
- Huella y Riesgo, al tocarlos: muestran el recorrido de su app como antes.
- Mercados de carbono, al tocarlo: "Restauramos ecosistemas naturales." + antes y después (Blue Carbon, ARR, REDD+;
  pasa solo y también se arrastra) + "Para clientes" (prediagnóstico con los pasos del Carbon Markets Hub y
  "Acceder a la demo", TODO link) y "Para inversores" (tarjetas del pipeline).
  - Fotos del antes y después (assets/servicios/<blue-carbon|arr|redd>-antes|despues.webp), sacadas de los kits de
    comunicación de cada proyecto: Blue Carbon = manglar muerto en pie / manglar sano (DBCX, República Dominicana);
    ARR = bosque quemado / bosque nativo no afectado (Chubut); REDD+ = extracción de madera / selva en pie (Misiones).
    Textos en BA_TYPES (main.js).
- Pipeline (pipeline.html): lista de proyectos propios y ficha de cada uno (pipeline.html?p=remonte | chubut | dbcx).
  Datos en data.js (PIPELINE), tomados de los kits de comunicación: ReMonte (ARR, Chaco, 24.024 ha, rating Sylvera A),
  Chubut ARR (7.240 ha en restauración de 42.000 ha quemadas) y Dominican Blue Carbon (2.784 ha de manglar).
  Fotos en assets/pipeline/. TODO Coralia: créditos estimados de cada uno y los demás proyectos (son 6–7).
  En "Para inversores" (Carbon Markets) aparecen los mismos proyectos.
- El botón del panel de la rueda dice "Conocé la app" (abre su recorrido).
- "Niveles de acceso" pasó a "Cómo trabajamos" (también en el menú): Consultoría primera y destacada
  ("Con nuestro equipo") y después Profesional, Análisis y Demo ("Solo apps").
- Equipo: "El equipo detrás de cada proyecto". Contacto: "Te respondemos con una propuesta a medida".
- Equipo: salieron Ignacio Duhourq y Sebastián Kamin.
- Traducciones de todo lo nuevo: i18n/fuente/5-revision-01.py.

## Revisión 02 (Nico, 15/10/2026): tanda 1, textos y datos
- Portada: "Donde la naturaleza / crea valor." (la segunda línea en lima) y la bajada nueva (opción A).
  Botón "Hablemos" (EN Talk to us), también en las otras páginas.
- Tarjetas de la portada con el mismo formato: número + qué es + aclaración chica. +13,2M t (mercados),
  +[X]M t medidas (huella, provisorio) y +100 activos (riesgo, provisorio). Los dos provisorios tienen TODO.
  El número que sube al aparecer es el de la tarjeta con data-count (motion.js).
- "Qué es Coralia": equipo con base científica (opción A). Frase nueva debajo de Mitigar (insetting / offsetting).
- Apps → plataformas en toda la web y en los 4 idiomas. "Climate Risk App" → "Climate Risk".
- Sylvera: bloque "Alta integridad". ECO2 Misiones va con A–AA y ReMonte con AA–A, igual que su sello (bloque,
  página de Mitigar, etapa y descripción del pipeline y alt de la imagen).
- Hectáreas nuevas en las páginas de los proyectos: ReMonte 156.000 ha y Chubut 33.170 ha (data.js, PIPELINE).
  El sello assets/marca/sylvera-remonte.webp ya es el nuevo ("Pre-Issuance Rating: AA–A"), sacado de la presentación de Climate Week NYC 2026.
- Mitigar: cifra unificada en +13,2M y decimales con punto en inglés (10.1M, 2.8M, 1.5M).
- "Cómo trabajamos" → "Trabajemos juntos" (EN Work with us): cuatro tarjetas (servicios, plataformas, socios, inversores).
  Los tres planes (Profesional, Análisis, Demo): "Ver los planes", en la tarjeta de plataformas, abre debajo otra fila
  de tarjetas iguales (#plansRow en index.html).
  Abajo: "¿No sabés por dónde empezar? Descubrí tu camino climático →" (lleva a discover.html).
- Teléfono nuevo: +54 9 11 5056 0687. "Nosotros" lleva a los logos (#trusted-by). "Confían en nosotros" (EN Trusted by).
- Pipeline: "Invertí en nuestro pipeline de proyectos" con su bajada (opción A), en la home y en pipeline.html.
- Traducciones nuevas en i18n/fuente/8-revision-02.py.
- Tanda 2 · Simuladores → Descubrí (punto 1): la página ahora es discover.html (EN Discover, PT Descubra, DE Entdecken).
  simuladores.html quedó solo como redirección a discover.html (conserva ?lang= y el #simulador), para no romper links viejos.
  Cada tarjeta lleva arriba el nombre de la herramienta y como título la pregunta. El código sigue en simuladores.js.
- Tanda 3 · puntitos (punto 25): Medir #86C95B, Mitigar #C8F04A, Adaptarse #4FD1B0, con variables propias
  (--svc-medir, --svc-mitigar, --svc-adaptar). --medir, --mitigar y --adaptar no cambian (tags de casos y mapa).
- Tanda 5 · servicios desplegables (punto 19, opción A): las carpetas Medir, Mitigar y Adaptarse abren su panel abajo
  (#svcDetail en index.html). El contenido sale de servicio.js (SERVICIOS): texto, datos destacados, cifras, caso
  destacado, cómo lo hacemos, plataforma y casos. Mitigar lleva "Restauramos ecosistemas naturales.", el antes y
  después, y abajo tres botones: Para clientes (rueda del ciclo completo: 7 etapas con los 14 pasos, ETAPAS en
  servicio.js), Para inversores (pipeline) y Trayectoria (el +13,2M con su gráfico, ECO2 Misiones y los proyectos). Carbon Markets Hub volvió al paso a paso del diagnóstico.
  Links directos: index.html#servicio-medir | #servicio-mitigar | #servicio-adaptar. servicio.html?s=... redirige ahí.
- Tanda 4 · cards del pipeline (puntos 20 y 23): una sola card para la home y pipeline.html (pipeCard, en data.js),
  con el formato de la referencia de Nico: foto con el tipo, bandera y país, título en Bricolage Grotesque 800 con
  el color de cada proyecto, descripción, hectáreas | créditos (en Spectral), estándar (logos) | metodología y etapa.
  Las cards de una misma fila quedan alineadas franja por franja (subgrid), aunque una descripción sea más larga.
  Estándar: con un solo estándar va el logo completo (ícono + nombre); con dos, solo los íconos
  (assets/estandares/vcs-icono.png y ccb-icono.png, STD_ICONS en data.js), así entran al lado de la metodología.
  Fuentes nuevas en assets/fonts (bricolage-800, spectral-500). Logos de VCS y CCB en assets/estandares (recortados
  de la referencia; conviene reemplazarlos por los oficiales en SVG). Seis proyectos: ReMonte, Chubut ARR,
  Dominican Blue Carbon, Resilient Iberá, Argentina Biochar Initiative y ChaCo-ReForest. Lo que falta va como
  "A confirmar" (TODO en data.js): datos de Iberá, hectáreas/créditos/descripción de ChaCo, fotos de Iberá,
  Biochar y ChaCo y foto de ReMonte con las vacas. Logos de BioCarbon, Puro.earth y VCS (en alta): de la presentación
  de Climate Week NYC 2026, igual que las fotos nuevas de Fabián y Nico y el sello de Green Cross en 600 px.
- Equipo (punto 15): al pasar el mouse, borde con degradé de verdes que gira (estilo .hex::before). Fotos nuevas de
  Fabián, Nico, Kieffer, Ignacio y Lucas. Las fichas siguen a 400 px: para 1000 px hacen falta los originales.
- Imágenes (punto 23): portada, fondos de plataformas y paisaje ya estaban en alta (las medidas de Nico eran de una
  versión vieja). Carga diferida para todo lo que está más abajo. Siguen chicas las imágenes de casos hechas en Canva
  (900 px), los banners de sesu.ai y Ruuts y las fotos del antes y después (952 px): necesitan los originales.
- Nota de caso nueva (punto 24): si un caso en data.js tiene "note", proyecto.html lo arma con El desafío → Qué hicimos
  (con línea de tiempo) → Resultado y una columna fija con logo, ubicación y métricas grandes. Los 10 casos tienen nota
  (los textos de los 9 nuevos salen de las páginas de la web vieja; traducciones en i18n/fuente/9-notas.py). Las etapas
  sin fecha esperan las fechas de Nico. Sin logo cargado (Mercuria, sesu.ai, Ruuts, WIPO) va el nombre del cliente.
- Quedan para las próximas tandas: logos faltantes (13; coraliae.com no se puede abrir desde la sesión), cards del pipeline (20, 23),
  servicios desplegables (19), equipo (15) y notas de casos (11, 12, 24).

## Recorrido de la Home (de arriba a abajo)
0. **Apertura (mariposa)**: lo primero que se ve es la mariposa mitad datos, mitad naturaleza, con
   CORALIA ENVIRONMENTAL (sin textos a los costados). Al bajar, las dos mitades se abren como puertas haciendo zoom y aparece la
   portada, que también se acerca. Mientras tanto el encabezado está oculto.
   - Imagen: assets/portada-mariposa.webp (+ -1100 para celu), con el texto borrado: el título es texto
     real (.doors__title en index.html), así se ve nítido y no se corta en el celu.
   - Cuánto hay que bajar para abrirla: .opening__run en styles.css (110vh en compu, 85vh en celu).
   - Animación: motion.js (--q va de 0 cerrada a 1 abierta). Con "reducir movimiento" no aparece.
   - Cuando se abre, la portada se arma de a poco: la foto hace foco (de borrosa y oscura a nítida) con
     un destello de luz, el título sube línea por línea, después el texto y los botones, y por último las
     tarjetas (las barras crecen, el medidor se llena y 0,4644 cuenta desde cero). Si se vuelve a cerrar,
     se rearma. Tiempos: bloque "La portada se arma de a poco" al final de styles.css.
1. **Portada**: paisaje con tres tarjetas de interfaz flotando (una por app). Al bajar, la foto se achica
   hasta quedar como una tarjeta con bordes redondeados.
2. **Qué es Coralia** (#plataforma): la frase que se "enciende" palabra por palabra y tres tarjetas con forma
   de carpeta (Tecnología → #apps, Datos → simuladores, Conocimiento → #equipo), con la flecha en el hueco de la
   esquina. La forma es el clipPath #folder en index.html (proporción 5:4).
3. **Conocé nuestras apps** (#apps): rueda con las tres apps como porciones redondeadas (con su pantalla
   adentro). Entra girando media vuelta, las porciones se abren en abanico y al final aparece el centro: logo
   de Coralia y "Probá las plataformas →", que lleva a discover.html (TODO: URL de la plataforma, en main.js, 'wcore') y un panel grande a la izquierda recortado por la curva de la rueda.
   Al pasar por una porción, crece hacia afuera y el panel muestra esa app; sola va rotando cada 4,5 s hasta
   que alguien la toca. Al tocar una porción, una pestaña o "Ver cómo funciona" se abre abajo su recorrido de 6 pasos: al bajar por los pasos cambia la pantalla.
   Tocar la misma tarjeta o "Cerrar" lo cierra. Link a los simuladores.
   - Cada porción lleva el ícono de su app y el nombre en dos líneas (la segunda en su color) y va teñida con un
     color por app: verde (Carbon Footprint), ámbar (Carbon Markets) y azul (Climate Risk App). Las pantallas de
     adentro van en blanco y negro para que mande el color; si la app tiene foto propia de fondo
     (assets/apps/fondo-<app>.webp, se activa con bg: en APPS de main.js), se usa la foto en su lugar, y también en el panel grande de la izquierda (index.html, .appview__shots). Las tres tienen foto. Colores: bloque "un color por app" en styles.css.
   - Íconos: assets/apps/icon-*-claro.png (sacados de los logos de cada app, con las hojas aclaradas para que se lean
     sobre fondo oscuro). También están en las pestañas de abajo y en el panel.
   - Pantallas: assets/apps/card-*.webp (tarjetas) y <footprint|markets|risk>-1…6.webp (pasos), de los
     videos de demo del deck. Textos de los pasos: en index.html (bloques `.story`).
4. **Proyectos** (#proyectos): globo 3D con los 23 países y carrusel de casos publicados.
5. **Confían en Coralia** (#confianza): 34 logos en dos filas, premio Green Cross, ratings Sylvera y testimonios.
6. **Equipo** (#equipo): panal de hexágonos con las 17 personas (Kieffer Schroder e Ignacio Bilbao al final;
   sus fotos salen de las placas de LinkedIn) (en color al pasar el mouse). Cuando el panal
   entra en pantalla, cada hexágono aparece en un orden al azar, con un destello de color, y al encajar
   se le ilumina el borde en verde lima. Los filtros
   iluminan un grupo y apagan el resto. Al tocar a alguien, su hexágono crece hasta la ficha (cargo,
   especialidades y LinkedIn; tocar la foto o "LinkedIn ↗" abre su perfil, cargado en data.js, TEAM), con flechas para pasar a la siguiente y "Volver al equipo" (o Escape).
7. **Niveles de acceso** (#accesos): Demo, Análisis, Profesional y Consultoría.
8. **Contacto** (#contacto): email, pedido de demo, teléfono y oficina.

## Globo (globe.js + data.js)
- Países, coordenadas y cantidad de trabajos: COUNTRIES en data.js. Lo que se hizo en cada país: WORK en
  data.js (año, cliente, trabajo), traducido del mapa del deck 2026. Los casos publicados (CASES) aparecen
  arriba de la lista del país.
- Respecto de la versión anterior salieron Uruguay y Corea del Sur y entraron Bolivia y Alemania, como en el deck.
- Entrada: cuando el mapa aparece en pantalla, el globo llega desde el fondo (chico y desenfocado), gira más de
  una vuelta y frena en Sudamérica; al final se levantan las columnas. El panel entra desde el costado. Si alguien
  toca el globo o las flechas durante la entrada, termina enseguida. Con "reducir movimiento" no se anima.
- Las columnas son más altas donde hay más trabajos. Se arrastra; al tocar un país gira, hace zoom y abre la ficha.
- Panel de cada país: degradado crema a verde claro, curvas topográficas suaves en los bordes (cambian de
  orientación según el país), coordenadas arriba a la derecha y la silueta del país con relieve adentro,
  que se dibuja como un trazo al cambiar de país. La silueta sale del mismo mapa del globo y se ubica sola
  en el espacio libre debajo de la lista; si no hay lugar, asoma detrás de los botones. Nunca queda texto
  encima. Dos hojas asoman por detrás del panel. Código: countryArt() y placeSil() en main.js.
- Liviano: assets/globo/ (~60 KB comprimido). Se descarga recién cerca del mapa y no dibuja fuera de pantalla.
- Para agregar un país: una fila en COUNTRIES (si el nombre en inglés es distinto, va como 6º dato, ej. 'Spain')
  y su lista en WORK.

## Decoración (assets/deco)
Mariposas de hojas de la marca en los espacios en blanco. En "Qué es Coralia": las hojas grandes juntas arriba a
la derecha, cuatro hojitas flotando entre la frase y las tarjetas, curvas topográficas muy suaves detrás de las
tarjetas (topografia.svg) Además: dos hojitas
aleteando en Apps, tira ancha junto al título de Proyectos, un grupo a cada lado del carrusel
de casos y columna al costado del panal del equipo. Se desplazan apenas
con el scroll (data-par en index.html: negativo sube más lento, positivo más rápido; lo aplica motion.js).
Posiciones y tamaños: bloque "Decoración" al final de styles.css.

Mariposas sueltas de fondo (assets/deco/m-1 … m-10, sacadas de la imagen de mariposas de la marca): en Apps,
Confían en Coralia, Equipo, Niveles de acceso y Contacto hay un `<div class="deco-scatter" data-n="…">` (data-n =
cuántas en compu; en el celu, la mitad). main.js (scatter) las reparte solo en el espacio libre: mira dónde hay
textos, tarjetas e imágenes y no las pone encima ni debajo, así ninguna queda tapada a medias, y deja margen con el
borde para que nunca se corten. Cada una tiene su tamaño, giro y transparencia, y flota despacio mientras se ve. Se
vuelven a repartir si cambia el tamaño de la sección. Con "reducir movimiento" quedan quietas.

## Carrusel de casos
Al llegar a "Casos publicados", las tarjetas caen desde arriba de a una (primero la del centro) con un rebote;
se repite al cambiar de filtro. Bloque "Carrusel de casos" al final de styles.css.

## Animaciones (motion.js)
Portada que se achica y frase que se enciende. Sin librerías. Con "reducir movimiento" activado no se mueve nada.

## Otras páginas
- **proyectos.html**: 3 destacados, texto institucional, grilla con filtros por servicio, industria y país, ficha
  de cada proyecto. Link directo: proyectos.html#ypf, #misiones, etc.
- **proyecto.html?p=ypf**: página de cada proyecto (portada, datos, resumen, galería, testimonio, relacionados).
- **discover.html** (Descubrí): cinco evaluaciones rápidas: Camino de descarbonización, Estrategia de créditos de carbono,
  Chequeo de huella de carbono, Potencial de carbono de tu tierra y Chequeo de riesgo climático. Links directos:
  discover.html#trayectoria, #neutralidad, #huella, #tierra y #riesgo. Código: simuladores.js.
  simuladores.html solo redirige a discover.html.
- Los datos de los proyectos están en data.js (los usan todas las páginas).

## Encabezado y menú (nav.js)
Transparente sobre la foto de portada y claro al bajar (el logo cambia a la versión oscura).
Debajo de 1000 px el menú se abre con el botón ☰; se cierra al tocar un link, afuera o con Escape.

## Imágenes
- Ícono de la pestaña: favicon.ico y apple-touch-icon.png en la raíz y assets/icono/icon-192|512.png. Es la mariposa del logo
  original (assets/deco/mariposa.svg, sin el texto «Coralia Environmental»), sobre fondo transparente; en el celular
  (apple-touch-icon) va sobre blanco. Está en el <head> de cada página, debajo del <title>.
- assets/apps/: pantallas de las tres plataformas (de los videos de demo del deck).
- assets/marca/: sello Green Cross, ratings Sylvera y paisaje del río (del deck institucional).
- assets/logos/: 34 logos de clientes y socios (del deck).
- assets/proyectos/: tarjetas y galerías de cada caso. Faltan fotos sin logo de Misiones, YPF y sesu.ai.
- Foto de portada: Remigiusz Dettlaff en Unsplash (uso libre).

## Qué se sacó en el rediseño (está en el historial de git si se quiere volver)
- El botón "Con acción / Sin acción" de la portada y sus fotos (hero-sin.webp, generada con IA).
- Las mariposas de fondo (deco.js y assets/deco/).
- La tira de logos en una sola imagen (clientes.webp), el fondo de hojas del equipo y el sello viejo del premio.
- Segunda vuelta: la fila de números, la sección horizontal de herramientas con ilustraciones 3D, la sección
  separada "Cómo funcionan", las mini demos de la Home (ahora en discover.html) y la línea de tiempo.

## Pendientes (buscá TODO)
- Link de Carbon Markets Hub: completarlo en APP_LINKS (nav.js). Hoy dice "Próximamente". Climate Risk ya lleva a
  https://climaterisk.coraliae.com/login (19/10/2026), y el «Probá las plataformas →» del centro de la rueda lleva a Iniciar sesión.
- Páginas: Nacho confirmó (20/10/2026) que no hacen falta más. Mitigación y Adaptación están en las carpetas de
  servicios de la portada y el equipo completo en el panal (#equipo).
- Revisar con el equipo técnico los rangos ilustrativos de las mini demos y simuladores
  (simuladores.js: F, M, RB, REF_RATE, P_STD, P_HQ).

## Privacidad y términos (privacidad.html, terminos.html — octubre 2026)
- Páginas legales del sitio, linkeadas desde el pie de todas las páginas. Dicen solo lo que el sitio hace hoy: no tiene
  formularios, cookies ni analítica; guarda idioma y tema en el navegador; los simuladores calculan en el navegador y no
  mandan nada; el contacto es por email. Si se suma un formulario o analítica, hay que actualizarlas.
- Los textos están en el HTML (castellano) y en i18n/fuente/10-legales.py (EN, PT, DE): se cambian juntos y después
  python3 i18n/fuente/armar.py. Las tablas de traducción ahora pueden tener número de dos cifras (10-…).
- Datos pendientes, resaltados en amarillo (clase .pend) hasta completarlos: CUIT, fecha de publicación, proveedor
  de correo y su ubicación, plazo de conservación de los mensajes (24 meses) y tribunales. La razón social y el
  domicilio (Coraliae SRL, Asunción 2444) son los de las plataformas; el pie dice Nogoyá 4169 (oficina): confirmar.
- Las páginas sin foto arriba llevan <body class="page-plain">: el encabezado va siempre con fondo claro (nav.js).

## Premio y ratings (Confían en nosotros, ancla #trusted-by)
Cuando las tarjetas aparecen en pantalla: el sello de Green Cross cae como un sello de goma, deja una onda verde
lima y lo cruza un brillo dorado (vuelve a brillar al pasar el mouse). Las dos calificaciones de Sylvera llegan
apiladas, se abren en abanico y aparece una tilde de verificado. Bloque "Premio y ratings" al final de styles.css.
Con "reducir movimiento" se muestran quietas.
La tarjeta del premio tiene "Conocé más del premio →", que abre la publicación de Coralia en LinkedIn.

## Idiomas: español, inglés, portugués y alemán (i18n.js + carpeta i18n)
- Arriba a la derecha está el selector (ES · EN · PT · DE) y abajo, en el pie, los mismos links. El idioma elegido
  queda guardado al pasar de página. Link directo a un idioma: agregá ?lang=en (o pt, de, es), ej. index.html?lang=pt.
- El español es el texto base de las páginas. Las traducciones están en i18n/en.js, pt.js y de.js, y se cargan
  solo cuando se elige ese idioma. Traducen también lo que aparece al tocar cosas (países, casos, equipo,
  simuladores) y los números salen con el formato de cada idioma (10,175,209 en inglés).
- Para cambiar o agregar una traducción: editá las tablas de i18n/fuente/ (cada fila: español, inglés, portugués,
  alemán; el español tiene que ser igual al texto de la página) y después corré  python3 i18n/fuente/armar.py
  para regenerar los tres archivos. Si cambiás un texto en español en la página, cambialo también en la tabla.
- Los textos con números que cambian (contadores, resultados de los simuladores) están como patrones en armar.py.
- Lo que no está en las tablas queda como está (por ejemplo nombres de clientes y personas).

## Wix
Cumple los límites de Wix Headless: sin videos, cada archivo pesa menos de 3 MB y el total menos de 20 MB.
Revisado el 19/10/2026: 228 archivos, 13,5 MB en total (contando LEEME y i18n/fuente), el más pesado 0,48 MB
(assets/cta.webp). Si se agregan fotos, conviene pasarlas a .webp y que no superen ~500 KB.

## Vercel (prueba, octubre 2026)
- Proyecto "coralia" en Vercel, conectado al repo de GitHub: https://coralia-sooty.vercel.app
- Es una página estática: preset "Other", directorio raíz ./, sin comando de compilación ni variables.
- Rama de producción: revision-5 (Ajustes → Entornos → Production → Seguimiento de sucursales). Cada vez que se
  sube algo a esa rama, Vercel actualiza la web sola. Las otras ramas arman una vista previa con su propio link.
- No toca la web de Wix: queda en el link de vercel.app hasta que se conecte un dominio.
- Buscadores: vercel.json (lo escribe herramientas/compartir.py) manda «X-Robots-Tag: noindex, nofollow» solo cuando se entra por un link *.vercel.app,
  así Google no muestra la web de prueba. Cuando se conecte coraliae.com, ese dominio se indexa normal (no hace
  falta tocar nada). No agregar un robots.txt que bloquee: valdría también para el dominio real.

## Fotos de los proyectos (kits de comunicación, octubre 2026)
- Misiones (REDD+): fotos del kit en la galería del caso (proyecto.html?p=misiones) y en el proyecto destacado de
  Mitigación. Dato actualizado: 10,1M VCUs verificados por Verra para 2017–2022 (antes decía 10M+).
- Medir: la foto de la carpeta y de la página es la de Ruuts, el ganado entre los árboles (assets/proyectos/ruuts-1.jpg).

### Tanda de fotos de Nico (19/10/2026)
- Antes y después de Mitigar (assets/servicios/<tipo>-antes|despues.webp, recortadas a 16:10, 1280 px). Rótulos en BA_TYPES (main.js):
  - REDD+: aérea con desmonte / monte entero → «Escenario sin proyecto» / «Con proyecto: deforestación evitada».
  - Blue Carbon: par «Original» de la Fundación CI Atabey → «Manglar degradado» / «Manglar sano». OJO: en los pares de Atabey
    las dos fotos son de sitios distintos y el cielo está igualado; nunca presentarlas como el mismo lugar antes y después.
    Los otros tres pares (Laguna, Canal, Bosque) y los fundidos quedan para redes; los videos de barrido no se usan (pesan mucho).
  - ARR: bosque quemado / bosque con helechos → «Bosque degradado» / «Bosque restaurado».
- Galerías del pipeline (pipeline.html?p=...): ReMonte suma remonte-6 a 12 (campo, muestreo, pastizal y el par de suelo pelado /
  pastizal con el marco de muestreo; se cortó la marca del teléfono de abajo), Chubut suma chubut-4 a 6 (fotos crudas del kit) y
  Dominican Blue Carbon suma dbcx-4 a 6 (Atabey).
- Misiones (proyecto.html?p=misiones): seis fotos crudas del kit (niebla, atardecer, río, mono, coatí y puma).
- Segunda pasada (19/10/2026), con todo lo que mandó Nico sin repetir: ReMonte suma remonte-13 a 20 (paisaje nublado, equipo,
  monte, pastizal, recorrida y corrales), Chubut suma chubut-7 a 14 y chubut-mapa (fotos crudas del kit; varias son chicas, de
  ~600 px, y se guardaron sin agrandar), DBCX suma dbcx-7 a 9 (Atabey: laguna degradada, tocones y canal sano, sueltas, sin los
  fundidos) y Misiones suma siete (aéreas, interior de la selva, extracción de madera y el trabajo con la Provincia).
- Los kits de comunicación (manifiesto, contraste, cifra y equipo, en ES y EN) son piezas para redes y no van a la web.
  El de Chubut dice «7.240 ha en restauración, dentro de 42.000 ha afectadas», distinto de las 33.170 ha elegibles de la card.

## Celu: peso y botones (octubre 2026)
- Fotos del inicio con versión chica para el celu (mismo nombre con -900 o -800 al final, .webp): las de las
  carpetas de servicios, los fondos de las apps y el paisaje del contacto. En index.html van con srcset, así el
  celu baja la chica y la compu la grande. La rueda de apps usa siempre la de 900 px (main.js).
- Se recomprimieron algunas fotos grandes (portada, pipeline) sin cambiarles el tamaño.
- Al abrir el inicio en el celu baja ~1,4 MB (antes ~2,2 MB).
- Zona táctil más grande en los puntitos de los carruseles, links subrayados, migas de pan, links del contacto y
  del pie, y las barras de los simuladores. No cambia cómo se ven (bloque "Celu: zona táctil" al final de styles.css).
- Si se agrega una foto nueva a esos lugares, conviene hacerle también su versión chica.

## Iniciar sesión (ingresar.html + ingresar.js)
- Todos los botones "Iniciar sesión" del sitio (encabezado de cada página y "¿Ya tenés acceso?" en Cómo trabajamos)
  tienen data-login y toman la dirección de un solo lugar: LOGIN_URL, al principio de nav.js. Hoy es ingresar.html.
  Si se decide usar la pantalla de login de Wix en vez de la propia, se cambia solo esa línea.
- ingresar.html: pantalla para elegir a qué app entrar. Con la foto de la portada y "Tus apps y proyectos, en un solo
  lugar"; la tarjeta "Iniciá sesión" muestra las tres apps, cada una con qué es y cómo se entra, y lleva a la página
  de inicio de sesión de esa app (se abre en otra pestaña). Cada app tiene su propio acceso: no hay un login
  único de Coralia.
- Los links de las apps están en un solo lugar: APP_LINKS, al principio de nav.js. Los usa esta pantalla y el botón
  "Ir a la app" del panel de la rueda en la Home. Hoy solo Carbon Footprint tiene link
  (carbonfootprint.coraliae.com/login); las otras dos muestran "Próximamente" y llevan a
  contacto@coraliae.com. Cuando tengan página, se pone su link ahí y listo.
  Estilos: bloque "Iniciar sesión" (.login, .pick) en styles.css. Traducciones: i18n/fuente/7-ingresar.py y,
  para "Ir a la app" / "Próximamente", i18n/fuente/6-servicios.py.
- La tarjeta con las tres plataformas es más ancha (580 px) y entra siempre entera en una pantalla: los espacios y
  los tamaños se achican con el alto de la ventana. En celu y tablet la tarjeta va primero y el texto de bienvenida
  abajo; en celus bajitos (667 px de alto o menos) se oculta la línea "Entrás con el email…". Probado de 360×640
  a 1920×1080 en los cuatro idiomas.

## Celu fluido (octubre 2026)
Medido con un celu simulado (390 px, procesador 4 veces más lento). Qué se cambió y por qué:
- Carrusel de casos (main.js): avanza solo mientras está en pantalla y ya no fuerza a recalcular toda la página
  en cada cambio. Era lo que más gastaba con el celu quieto.
- Decoración que acompaña el scroll (motion.js): primero se leen todas las posiciones y después se mueve
  (antes recalculaba la página una vez por cada pieza, en cada movimiento del dedo).
- Encabezado (nav.js): mide la portada una vez y no en cada scroll.
- Animaciones que se repiten: se pausan en las secciones que no están en pantalla (clase .anim-off que pone nav.js).
- Globo (globe.js): quieto mientras espera; en celu gira a 30 cuadros por segundo, con menos resolución y
  menos detalle en las costas, y el resplandor solo en la columna del país activo. La letra y el ancho de la
  etiqueta se calculan una vez (antes recalculaban la página en cada cuadro).
- Mariposas (main.js): se ubican cuando el celu está libre y con menos cálculo en pantallas chicas; ya no se
  rearman cada vez que termina de cargar una foto.
- En pantallas táctiles chicas no hay desenfoque detrás del encabezado, las tarjetas de la portada, los botones
  de vidrio ni la pantalla de iniciar sesión: el fondo es casi sólido y se ve prácticamente igual.
- Todas las fotos se decodifican sin frenar la página (decoding="async").
Resultado: quieto, la página recalcula ~15 veces menos; al bajar, pasa de recalcular la página en cada cuadro
a una vez cada 7. Bloque "Celu fluido" al final de styles.css.

## Modo claro / oscuro (octubre 2026)
- Botón sol/luna en el encabezado, a la izquierda del idioma (lo agrega nav.js en todas las páginas). Al tocarlo,
  el cambio se abre como un círculo desde el botón (si el navegador no lo soporta, es un fundido).
- La web abre siempre en claro, aunque el sistema esté en oscuro (pedido de Nacho, 20/10/2026). Si se pasa a
  oscuro, se mantiene mientras dure la visita en esa pestaña (sessionStorage "coralia-theme"): al cerrar el
  navegador vuelve a abrir en claro. Se aplica al principio de i18n.js, antes de pintar, para que no parpadee.
- Estilos: bloque "Modo oscuro" al final de styles.css. Cambia los colores base (variables de :root) y arregla lo que
  estaba fijo en claro: tarjetas destacadas y activas, botones, títulos del pipeline, colores de los servicios,
  mapa, logos (pasan a blanco; los íconos de colores de los estándares quedan como están).
- En oscuro la portada no se achica a tarjeta al bajar ni tiene el brillo que la cruza: se funde con la sección
  de abajo. En claro sigue igual que antes.
- Traducciones del botón ("Pasar a modo oscuro / claro") en i18n/fuente/8-revision-02.py.

## Repaso general (20/10/2026)
- Sin links rotos, archivos faltantes ni errores de consola en las 4 lenguas, a 390 y 1366 px.
- Galerías de proyectos y pipeline: la grilla usa miniaturas <foto>-t.webp (600 px, en la misma carpeta); la foto
  completa se baja solo al abrir el visor. Si se suma una foto a una galería en data.js, hay que crear su -t.webp.
- El comparador antes/después baja sus fotos recién cuando está por aparecer (panel de Mitigar abierto).
- logo.png (160 px de alto), íconos de las apps (96 px) y deco/hojas-fondo.webp (600 px) achicados a lo que se ve.
- 404.html: página de error propia (Vercel la muestra sola). Lleva <base href="/"> y rutas con / porque puede
  aparecer en cualquier carpeta. Textos en i18n/fuente/11-error.py.

## Vista previa al compartir y mapa del sitio (20/10/2026)
- herramientas/compartir.py escribe todo: etiquetas og:/twitter: en el <head> de las páginas fijas (entre
  <!-- compartir:inicio --> y <!-- compartir:fin -->), las imágenes de 1200 × 630 en assets/compartir/ (foto + logo),
  una hoja por caso y por proyecto del pipeline en compartir/, sitemap.xml, robots.txt y vercel.json.
- Cada caso y proyecto del pipeline sale con su foto y su título al compartir el link: vercel.json manda a los robots
  de vista previa (WhatsApp, LinkedIn, Facebook, X, Slack, Telegram…) a compartir/<página>-<id>.html. Las personas y
  Google ven la página normal.
- Volver a correrlo (python3 herramientas/compartir.py) cuando cambien los casos o el pipeline en data.js, y al pasar
  al dominio propio: cambiar SITIO arriba del script. Hoy apunta a https://coralia-sooty.vercel.app.
- vercel.json no se edita a mano: va con "routes" (no "rewrites") porque un archivo que existe gana sobre un rewrite.

## Accesibilidad (20/10/2026)
- Revisión automática (axe, WCAG 2.1 AA) en todas las páginas, claro y oscuro, 390 y 1366 px: sin errores salvo la
  frase de la portada que se enciende palabra por palabra (las palabras todavía apagadas son claras a propósito).
- Para llegar al contraste mínimo en el tema claro: --leaf pasó de #4f7f2a a #477326 y --dim de #7c8a80 a #5c6a61.
- Zona táctil más grande en el celu: puntitos de los testimonios, idiomas del pie y el índice de las páginas legales.
- Teclado: todo se recorre con Tab y se ve dónde está el foco; las ventanas (casos, equipo, fotos) se cierran con Escape
  y el foco vuelve a donde estaba.

## Pipeline: salen Iberá, Biochar y ChaCo-ReForest (21/10/2026)
- A pedido de Nacho se sacaron de la web Resilient Iberá, Argentina Biochar Initiative y ChaCo-ReForest (les faltaban
  fotos y datos). Quedan ReMonte, Chubut ARR y Dominican Blue Carbon. Las fichas viejas están en el historial de git
  (data.js, PIPELINE); para volver a sumarlas, copiarlas ahí y correr python3 herramientas/compartir.py.
- Los links viejos (pipeline.html?p=ibera, etc.) muestran la lista de proyectos.

## Peso para Wix (21/10/2026)
- Wix Headless acepta hasta 20 MB en total (dev.wix.com → What You Can Upload). python3 herramientas/exportar-wix.py
  arma la carpeta lista para subir (por defecto ../coralia-wix) y dice cuánto pesa: hoy 19,1 MB (contado en decimal,
  el caso más estricto). Deja afuera notas, herramientas y lo que sólo sirve en Vercel (vercel.json, compartir/, las
  imágenes para compartir de cada caso y proyecto, sitemap y robots, que se rehacen con el dominio propio).
- Para llegar: fotos de galerías a 1100 px de lado mayor, portadas de casos y pipeline a 1400 px, miniaturas (-t.webp)
  a 440 px, antes/después a 1100 px y recompresión de fondos, marca, equipo y portadas de páginas.
- Salieron 8 fotos parecidas de las galerías del pipeline: remonte-2, 4, 8, 16 y 19, chubut-3 y 7, dbcx-4.
  Quedan ReMonte 14, Chubut 12 y Dominican Blue Carbon 9.
- Si se suman fotos, que no pasen de ~1100 px (galerías) o ~1400 px (portadas) y volver a correr exportar-wix.py.

## ChaCo-ReForest vuelve al pipeline (21/10/2026)
- Nico mandó la foto (assets/pipeline/chaco-reforest-1.webp) y pidió dejar "a completar" lo que falta mientras pasa
  la info: hectáreas, créditos y descripción siguen como "A confirmar". Iberá y Biochar siguen afuera.
- Con 4 proyectos la grilla va 2 × 2 (en celu, una columna).
