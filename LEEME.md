# Coralia — plataforma de inteligencia climática (en desarrollo)

Abrí la carpeta en VS Code y tocá **Go Live** sobre `index.html`.

La web presenta a Coralia como una plataforma de inteligencia climática: tres herramientas digitales
(Medir, Mitigar, Adaptar) con un equipo especializado detrás. Estilo claro tomado del deck institucional:
crema, verde bosque y verde hoja, con lima de acento.

## Tipografías (assets/fonts)
Títulos en **Fraunces** y textos en **Figtree** (licencia libre SIL OFL). Están instaladas dentro del proyecto,
así que no dependen de Google Fonts. Se declaran al principio de styles.css (@font-face).

## Recorrido de la Home (de arriba a abajo)
1. **Portada**: paisaje con tres tarjetas de interfaz flotando (una por app). Al bajar, la foto se achica
   hasta quedar como una tarjeta con bordes redondeados.
2. **Qué es Coralia**: la frase principal se "enciende" palabra por palabra con el scroll y tres pilares
   (tecnología, datos, conocimiento).
3. **Conocé nuestras apps** (#apps): tres tarjetas con una pantalla real de cada app. Al tocar una ("Tocá para
   conocer la app") se abre abajo su recorrido de 6 pasos: al bajar por los pasos cambia la pantalla.
   Tocar la misma tarjeta o "Cerrar" lo cierra. Link a los simuladores.
   - Pantallas: assets/apps/card-*.webp (tarjetas) y <footprint|markets|risk>-1…6.webp (pasos), de los
     videos de demo del deck. Textos de los pasos: en index.html (bloques `.story`).
4. **Proyectos** (#proyectos): globo 3D con los 23 países y carrusel de casos publicados.
5. **Confían en Coralia** (#confianza): 34 logos en dos filas, premio Green Cross, ratings Sylvera y testimonios.
6. **Equipo** (#equipo): panal de hexágonos con las 15 personas (en color al pasar el mouse). Los filtros
   iluminan un grupo y apagan el resto. Al tocar a alguien, su hexágono crece hasta la ficha (cargo,
   especialidades, LinkedIn), con flechas para pasar a la siguiente y "Volver al equipo" (o Escape).
7. **Niveles de acceso** (#accesos): Demo, Análisis, Profesional y Consultoría.
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
