# Coralia — plataforma de inteligencia climática (en desarrollo)

Abrí la carpeta en VS Code y tocá **Go Live** sobre `index.html`.

La web presenta a Coralia como una plataforma de inteligencia climática: tres herramientas digitales
(Medir, Mitigar, Adaptar) con un equipo especializado detrás. Estilo claro tomado del deck institucional:
crema, verde bosque y verde hoja, con lima de acento.

## Tipografías (assets/fonts)
Títulos en **Fraunces** y textos en **Figtree** (licencia libre SIL OFL). Están instaladas dentro del proyecto,
así que no dependen de Google Fonts. Se declaran al principio de styles.css (@font-face).

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
   - Pantallas: assets/apps/card-*.webp (tarjetas) y <footprint|markets|risk>-1…6.webp (pasos), de los
     videos de demo del deck. Textos de los pasos: en index.html (bloques `.story`).
4. **Proyectos** (#proyectos): globo 3D con los 23 países y carrusel de casos publicados.
5. **Confían en Coralia** (#confianza): 34 logos en dos filas, premio Green Cross, ratings Sylvera y testimonios.
6. **Equipo** (#equipo): panal de hexágonos con las 17 personas (Kieffer Schroder e Ignacio Bilbao al final;
   sus fotos salen de las placas de LinkedIn) (en color al pasar el mouse). Cuando el panal
   entra en pantalla, cada hexágono aparece en un orden al azar, con un destello de color, y al encajar
   se le ilumina el borde en verde lima. Los filtros
   iluminan un grupo y apagan el resto. Al tocar a alguien, su hexágono crece hasta la ficha (cargo,
   especialidades, LinkedIn; cuando la persona tiene su linkedin cargado en data.js, tocar la foto abre su perfil), con flechas para pasar a la siguiente y "Volver al equipo" (o Escape).
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
de casos, columna al costado del panal del equipo y, en Niveles de acceso, el patrón de mariposas de fondo
(patron-mariposas.webp, desvanecido hacia el centro; se descarga recién cerca de esa sección). Se desplazan apenas
con el scroll (data-par en index.html: negativo sube más lento, positivo más rápido; lo aplica motion.js).
Posiciones y tamaños: bloque "Decoración" al final de styles.css. Ninguna se sale de su sección ni del borde
de la pantalla (revisado en celu, tablet y compu). En celu quedan solo tres, más chicas.
Los grupos salen de la imagen "Clústeres botánicos". A las piezas que venían con hojas partidas en el borde se
les borraron esas mariposas, así ninguna se ve cortada (los *-espejo.webp son las mismas, invertidas).

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
- Links reales: Iniciar sesión (plataforma), versión en inglés.
- Faltan páginas que existen en la web actual: Mitigación, Adaptación, Equipo completo,
  "What's Climate Change" y Política de privacidad.
- Revisar con el equipo técnico los rangos ilustrativos de las mini demos y simuladores
  (simuladores.js: F, M, RB, REF_RATE, P_STD, P_HQ).
- LinkedIn personal de cada integrante (data.js, TEAM).

## Wix
Cumple los límites de Wix Headless: sin videos, cada archivo pesa menos de 3 MB.
