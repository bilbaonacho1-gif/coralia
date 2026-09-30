# Coralia — plataforma de inteligencia climática (en desarrollo)

Abrí la carpeta en VS Code y tocá **Go Live** sobre `index.html`.

La web presenta a Coralia como una plataforma de inteligencia climática: tres herramientas digitales
(Medir, Mitigar, Adaptar) con un equipo especializado detrás. Estilo claro tomado del deck institucional:
crema, verde bosque y verde hoja, con lima de acento. Títulos en Bricolage Grotesque y texto en Inter.

## Recorrido de la Home (de arriba a abajo)
1. **Portada**: paisaje con tres tarjetas de interfaz flotando (una por herramienta). Al bajar, la foto se
   achica hasta quedar como una tarjeta con bordes redondeados.
2. **Qué es Coralia**: la frase principal se "enciende" palabra por palabra con el scroll. Tres pilares
   (tecnología, datos, conocimiento) y números que cuentan al aparecer (100+ proyectos, 23 países,
   13M+ tCO₂e, 14 años).
3. **Tres herramientas** (#herramientas): en compu la sección queda fija y las tarjetas de Carbon Footprint,
   Carbon Markets Hub y Climate Risk App pasan de costado mientras bajás. Los botones 01 / 02 / 03 llevan
   a cada una. En celular, tablet o con "reducir movimiento" activado es un carrusel que se desliza con el dedo.
4. **Cómo funcionan las plataformas** (#como-funciona): pestañas por herramienta. Cada una es un recorrido de
   6 pasos con pantallas reales de la demo: al bajar por los pasos cambia la pantalla. Abajo, "Probalo acá":
   la mini demo de esa herramienta (calculadora de huella, diagnóstico de tierra o medidor de riesgo).
   - Pantallas: assets/apps/<footprint|markets|risk>-1…6.webp, sacadas de los videos de demo del deck.
   - Textos de los pasos: en index.html (bloques `.story`).
   - Los números de las mini demos son ILUSTRATIVOS (factores genéricos) y así lo aclara cada panel.
5. **Niveles de acceso** (#accesos): Demo, Analyze, Professional y Consulting como escalera, más links a
   "Iniciar sesión" y a los simuladores.
6. **Proyectos reales** (#proyectos): globo 3D con los 23 países, carrusel de casos publicados, línea de tiempo
   2012 → 2026 que corre de costado con el scroll, 34 logos de clientes en dos filas, premio Green Cross,
   ratings Sylvera y testimonios.
7. **Equipo** (#equipo): los 15 integrantes; al tocar uno aparece su ficha. Datos en data.js (TEAM).
8. **Contacto** (#contacto): email, pedido de demo, teléfono y oficina.

## Globo (globe.js + data.js)
- Países, coordenadas y cantidad de trabajos: COUNTRIES en data.js. Lo que se hizo en cada país: WORK en
  data.js (año, cliente, trabajo), traducido del mapa del deck 2026. Los casos publicados (CASES) aparecen
  arriba de la lista del país.
- Respecto de la versión anterior salieron Uruguay y Corea del Sur y entraron Bolivia y Alemania, como en el deck.
- Las columnas son más altas donde hay más trabajos. Se arrastra; al tocar un país gira, hace zoom y abre la ficha.
- Liviano: assets/globo/ (~60 KB comprimido). Se descarga recién cerca del mapa y no dibuja fuera de pantalla.
- Para agregar un país: una fila en COUNTRIES (si el nombre en inglés es distinto, va como 6º dato, ej. 'Spain')
  y su lista en WORK.

## Animaciones (motion.js)
Portada que se achica, frase que se enciende, herramientas horizontales y línea de tiempo horizontal.
Sin librerías: se calculan con la posición de la página. Con "reducir movimiento" activado no se mueve nada y
las secciones horizontales pasan a carrusel.

## Otras páginas
- **proyectos.html**: 3 destacados, texto institucional, grilla con filtros por servicio, industria y país, ficha
  de cada proyecto. Link directo: proyectos.html#ypf, #misiones, etc.
- **proyecto.html?p=ypf**: página de cada proyecto (portada, datos, resumen, galería, testimonio, relacionados).
- **simuladores.html**: Trayectoria de reducción y Neutralidad y créditos. Links directos:
  simuladores.html#trayectoria y #neutralidad. Código: simuladores.js.
- Los datos de los proyectos están en data.js (los usan todas las páginas).

## Encabezado y menú (nav.js)
Transparente sobre la foto de portada y claro al bajar (el logo cambia a la versión oscura).
Debajo de 1000 px el menú se abre con el botón ☰; se cierra al tocar un link, afuera o con Escape.

## Imágenes
- assets/apps/: pantallas de las tres plataformas (de los videos de demo del deck).
- assets/marca/: ilustraciones 3D de las herramientas, sello Green Cross, ratings Sylvera, paisaje del río y
  curvas de nivel (fondo de las tarjetas). Todo del deck institucional.
- assets/logos/: 34 logos de clientes y socios + Verified Carbon Standard (del deck).
- assets/proyectos/: tarjetas y galerías de cada caso. Faltan fotos sin logo de Misiones, YPF y sesu.ai.
- Foto de portada: Remigiusz Dettlaff en Unsplash (uso libre).

## Qué se sacó en el rediseño (está en el historial de git si se quiere volver)
- El botón "Con acción / Sin acción" de la portada y sus fotos (hero-sin.webp, generada con IA).
- Las mariposas de fondo (deco.js y assets/deco/).
- La tira de logos en una sola imagen (clientes.webp), el fondo de hojas del equipo y el sello viejo del premio.

## Pendientes (buscá TODO)
- Links reales: Iniciar sesión (plataforma), versión en inglés.
- Faltan páginas que existen en la web actual: Mitigación, Adaptación, Equipo completo,
  "What's Climate Change" y Política de privacidad.
- Revisar con el equipo técnico los rangos ilustrativos de las mini demos y simuladores
  (main.js: F, M, RB · simuladores.js: REF_RATE, P_STD, P_HQ).
- LinkedIn personal de cada integrante (data.js, TEAM).

## Wix
Cumple los límites de Wix Headless: sin videos, cada archivo pesa menos de 3 MB.
