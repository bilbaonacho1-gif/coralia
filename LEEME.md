# Coralia — versión interactiva (en desarrollo)

Carpeta aparte de la réplica. Abrila en VS Code y tocá **Go Live** sobre `index.html`.

## Qué tiene de interactivo
0. **Hero "Escenario 2050"**: botones "Con acción climática / Sin acción" que funden la foto verde con
   su versión en sequía y cambian la tarjeta (+1,5 °C meta de París / +2,4 °C proyectado).
   - Fotos: assets/hero-con.webp y hero-sin.webp (+ versiones -960 para celu). La "sin" se descarga
     después de abrir la página. Foto original: Remigiusz Dettlaff en Unsplash (uso libre).
   - hero-sin: versión generada con IA (ChatGPT) sobre la misma foto, con el color suavizado un 28 %
     hacia el original para que no quede exagerada. Para cambiarla: mismos nombres, 1920 y 960 px.
1. **Tres herramientas**: tocá una tarjeta y abajo se abre su "laboratorio":
   - Carbon Footprint: calculadora con controles deslizantes, total y reparto por alcance.
   - Carbon Markets: elegís el tipo de terreno y las hectáreas y ves el tipo de proyecto posible.
   - Climate Risk: elegís amenaza, escenario y horizonte y se mueve el medidor de riesgo.
   Los números son ILUSTRATIVOS (factores genéricos) y así lo aclara cada panel.
2. **Mapa (globo 3D)**: globo que gira solo, con los 23 países en menta y columnas de luz
   (más altas donde hay casos). Se arrastra con el dedo o el mouse; al tocar un país gira hasta él,
   hace zoom y abre la ficha. "← Ver el mundo" vuelve. También se recorre con las flechas de la ficha.
   - Código: globe.js. Países y coordenadas (longitud, latitud): COUNTRIES en main.js.
   - Liviano: assets/globo/ (libs.min.js + mundo.js, ~60 KB comprimido). Se descarga recién cuando
     bajás cerca del mapa y deja de dibujar cuando no está en pantalla.
   - Para agregar un país: sumá una fila en COUNTRIES con su longitud/latitud y, si el nombre en
     inglés es distinto, ponelo como 6º dato (ej. 'Spain').
3. **Simuladores** para empresas: ya no están en la Home, tienen su página (simuladores.html), a la que se
   llega desde "Simuladores" en el menú y en el pie. Arriba se elige uno con dos tarjetas.
   Link directo: simuladores.html#trayectoria o simuladores.html#neutralidad. Código: simuladores.js.
   - Trayectoria de reducción: emisiones actuales, año y % de la meta → gráfico, reducción por año y
     comparación con el ritmo de referencia 1,5 °C (4,2 % anual, SBTi).
   - Neutralidad y créditos: toneladas a compensar y % de alta calidad → costo anual con precios de
     referencia Sylvera 1T 2026 (USD 5,7 promedio / USD 20 investment grade).
4. **Nuestros proyectos (Home)**: carrusel 3D en abanico con los 10 proyectos. Avanza solo, se desliza con el dedo o
   el mouse, flechas del teclado, filtro por servicio; tocar la del medio abre la ficha.
   Desde el mapa también se abren (los países con casos tienen un anillo).
   Testimonios de Javier Jafella (Andrómaco) y Antonella Martinenghi (Genneia).
5. **Nuestro equipo**: los 15 integrantes como cápsulas de vidrio desfasadas sobre fondo de hojas.
   Al tocar una, se corre al costado y aparece la ficha (foto que pasa a color, cargo y especialidades).
   Filtros por área y flechas para recorrer. Datos en data.js (TEAM). LinkedIn personal: pendiente.
6. Premio Green Cross con link al documento, y links reales a LinkedIn y YouTube.
6. Números de confianza que cuentan al aparecer, logos en movimiento, aparición al scrollear.

## Página de proyectos (proyectos.html)
- Arriba, los 3 destacados (Misiones, YPF, Andrómaco); al pasar el mouse sube el panel con el detalle.
- Bloque "Proyectos innovadores para un futuro bajo en carbono" (texto de la web actual).
- Grilla con los otros 7 en el mismo orden que en Wix (2 anchas, 3, 2 anchas).
- Filtros por servicio, industria y país; ficha de cada proyecto con anterior/siguiente.
- Link directo a un caso: proyectos.html#ypf, proyectos.html#misiones, etc.
- Los datos de los proyectos están en data.js (los usa también la Home).

### Página de cada proyecto (proyecto.html?p=ypf)
Portada con foto, datos clave, resumen, rol de Coralia (Misiones), galería con visor,
testimonio (Andrómaco y Genneia), otros proyectos relacionados, anterior/siguiente y contacto.
Se llega desde el carrusel de la Home, las tarjetas de proyectos.html y el mapa.

### Fotos (assets/proyectos/)
Tarjetas: misiones, ypf, andromaco, wipo, genneia, phoenix, mercuria, pluspetrol, sesuai, ruuts (.jpg).
Galerías: <id>-1.jpg, <id>-2.jpg. Faltan fotos sin logo de Misiones, YPF y sesu.ai para portada y galería.

## Menú en celular y tablet (nav.js)
Debajo de 1000 px el menú de arriba se esconde y aparece un botón ☰ que lo abre como panel.
Se cierra al tocar un link, afuera o con Escape. Está en las tres páginas (index, proyectos y proyecto).

## Mariposas de fondo (deco.js)
Detalles de diseño con la mariposa del logo: contornos grandes y muy suaves (marca de agua) y mariposas
chicas que aletean y se mueven con el scroll. Se configuran por sección al principio de deco.js
(tipo, tamaño, posición, opacidad, rotación). Para sacarlas: quitá <script src="deco.js"> de index.html.

## Pendientes (buscá TODO)
- Proyectos de cada país: Argentina, Paraguay y Perú tienen casos. Los otros 20 países dicen
  "[Completar proyectos en…]". Se editan en main.js (CASES y EXTRA).
- "Ver el caso completo" hoy lleva a la página del caso en la web actual de Wix.
- Faltan páginas que existen en la web actual: Mitigación, Adaptación, Equipo completo,
  "What's Climate Change" y Política de privacidad.
- Links reales: Iniciar sesión, versión en inglés, contacto.
- Revisar con el equipo técnico los rangos ilustrativos de las calculadoras (main.js: F, M, RB, P_STD, P_HQ, REF_RATE).

## Wix
Cumple los límites de Wix Headless: sin videos, cada archivo pesa menos de 3 MB.
