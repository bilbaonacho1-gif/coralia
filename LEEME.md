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
- Menú: "Apps" pasó a "Servicios" (#servicios; #apps sigue funcionando).
- Qué es Coralia: debajo de la frase, "Nuestros servicios" (#servicios, el menú lleva acá): tres carpetas, Medir,
  Mitigar y Adaptar (como en el deck), cada una abre su página (servicio.html?s=medir | mitigar | adaptar). La
  consultoría no es un servicio aparte: es cómo trabajamos en los tres (portada, "Cómo trabajamos").
  Cada servicio tiene su app: Medir → Carbon Footprint, Mitigar → Carbon Markets Hub, Adaptar → Climate Risk App.
- Páginas de servicio (servicio.html + servicio.js, contenido en SERVICIOS): el texto de la web actual,
  Medición con la Huella de carbono (producto y corporativa, 6 pasos cada una);
  Mitigación con Mercados de carbono (13M+ tCO₂e del Company deck 2026: ECO2 Misiones 10M+ más los proyectos
  anteriores por sector, 3,2M; proyecto destacado ECO2 Misiones con sus datos, reparto de beneficios y ratings; y los 14 pasos); Adaptación con el análisis de riesgo,
  sus 3 pilares y los 5 pasos. Cada bloque termina con su app y la página con sus casos.
  Traducciones: i18n/fuente/6-servicios.py.
- La rueda es "Herramientas propias · Nuestras apps" (#apps; el menú tiene "Apps"): cada porción es una app, con
  el servicio al que pertenece en el panel ("Servicio: Medir →" lleva a su página). Fotos reales con el mismo
  tono por app (assets/apps/fondo-*.webp). El centro dice "Probá las apps →" (simuladores).
- Huella y Riesgo, al tocarlos: muestran el recorrido de su app como antes.
- Mercados de carbono, al tocarlo: "Restauramos ecosistemas naturales." + antes y después (Blue Carbon, ARR, REDD+;
  pasa solo y también se arrastra) + "Para clientes" (prediagnóstico con los pasos del Carbon Markets Hub y
  "Acceder a la demo", TODO link) y "Para inversores" (tarjetas del pipeline).
  - Fotos del antes y después: TODO. Guardarlas como assets/servicios/<blue-carbon|arr|redd>-antes.webp y
    -despues.webp y poner foto: true en BA_TYPES (main.js). Mientras tanto se ven fondos de color.
- Pipeline (pipeline.html): lista de proyectos propios y ficha de cada uno (pipeline.html?p=proyecto-1).
  Datos PROVISORIOS en data.js (PIPELINE): nombre, tipo, ubicación, etapa, hectáreas, créditos, descripción, fotos.
- El botón del panel de la rueda dice "Conocé la app" (abre su recorrido).
- "Niveles de acceso" pasó a "Cómo trabajamos" (también en el menú): Consultoría primera y destacada
  ("Con nuestro equipo") y después Profesional, Análisis y Demo ("Solo apps").
- Equipo: "El equipo detrás de cada proyecto". Contacto: "Te respondemos con una propuesta a medida".
- Equipo: salieron Ignacio Duhourq y Sebastián Kamin.
- Traducciones de todo lo nuevo: i18n/fuente/5-revision-01.py.

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
   de Coralia y "Probá las apps →", que lleva a simuladores.html (TODO: URL de la plataforma, en main.js, 'wcore') y un panel grande a la izquierda recortado por la curva de la rueda.
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
- **simuladores.html**: cinco simuladores: Trayectoria de reducción, Neutralidad y créditos, Huella rápida,
  ¿Tu tierra puede ser un proyecto de carbono? y Riesgo climático. Links directos: simuladores.html#trayectoria,
  #neutralidad, #huella, #tierra y #riesgo. Código: simuladores.js.
- Los datos de los proyectos están en data.js (los usan todas las páginas).

## Encabezado y menú (nav.js)
Transparente sobre la foto de portada y claro al bajar (el logo cambia a la versión oscura).
Debajo de 1000 px el menú se abre con el botón ☰; se cierra al tocar un link, afuera o con Escape.

## Imágenes
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
  separada "Cómo funcionan", las mini demos de la Home (ahora en simuladores.html) y la línea de tiempo.

## Pendientes (buscá TODO)
- Link real de Iniciar sesión (plataforma).
- Faltan páginas que existen en la web actual: Mitigación, Adaptación, Equipo completo,
  "What's Climate Change" y Política de privacidad.
- Revisar con el equipo técnico los rangos ilustrativos de las mini demos y simuladores
  (simuladores.js: F, M, RB, REF_RATE, P_STD, P_HQ).

## Premio y ratings (Confían en Coralia)
Cuando las tarjetas aparecen en pantalla: el sello de Green Cross cae como un sello de goma, deja una onda verde
lima y lo cruza un brillo dorado (vuelve a brillar al pasar el mouse). Las dos calificaciones de Sylvera llegan
apiladas, se abren en abanico y aparece una tilde de verificado. Bloque "Premio y ratings" al final de styles.css.
Con "reducir movimiento" se muestran quietas.
La tarjeta del premio tiene "Conocé más del premio →", que abre la publicación de Coralia en LinkedIn, y "Ver documento →".

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
Cumple los límites de Wix Headless: sin videos, cada archivo pesa menos de 3 MB.
