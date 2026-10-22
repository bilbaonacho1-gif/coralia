# Traspaso: web de Coralia Environmental

Todo lo que necesita saber quien siga con este proyecto.

## 1. Dónde está todo

- **Repositorio:** https://github.com/bilbaonacho1-gif/coralia
- **Rama de trabajo actual: `revision-5`.** Es la versión que quiere Nico (el jefe). Todos los cambios nuevos van acá.
  - Descarga: https://github.com/bilbaonacho1-gif/coralia/archive/refs/heads/revision-5.zip
- `claude/keen-lamport-0fh7x8`: versión vieja, con la intro de la mariposa. **No tocarla**, queda como respaldo.
- `main`: quedó en el 30 de septiembre (PR #1). No se usa.
- Versión publicada que revisa Nico: tourmaline-squirrel-f04d75.netlify.app. La sube el usuario a mano, no está conectada al repo.
- **Documentación completa del sitio: `LEEME.md`** (en esta misma rama). Explica cada sección, dónde está cada cosa en el código y cómo se cambia. Leerlo antes de tocar nada.

## 2. Qué es el sitio

- HTML, CSS y JavaScript sin frameworks ni librerías (salvo d3-geo para el globo, ya incluido en `assets/globo`).
- Páginas: `index.html` (inicio), `servicio.html?s=medir|mitigar|adaptar`, `proyectos.html`, `proyecto.html?p=<id>`, `pipeline.html` y `pipeline.html?p=remonte|chubut|dbcx`, `simuladores.html`.
- Datos: `data.js` (casos, países del globo, equipo, pipeline). Contenido de los servicios: `servicio.js` (SERVICIOS).
- Scripts: `main.js` (inicio), `motion.js` (animaciones de scroll), `nav.js` (menú e idioma), `globe.js` (globo 3D), `servicio.js`, `proyectos.js`, `proyecto.js`, `pipeline.js`, `simuladores.js`.
- Estilos: todo en `styles.css`. Colores en variables al principio (`--forest`, `--lime`, `--leaf`, etc.). Tipografías locales: Fraunces (títulos) y Figtree (texto), en `assets/fonts`.
- Para verlo: abrir la carpeta en VS Code y usar **Go Live** sobre `index.html`, o `python3 -m http.server` en la carpeta.

## 3. Reglas que no se pueden romper

- **Va a Wix Headless:** nada de videos y **cada archivo debe pesar menos de 3 MB**.
- **Cuatro idiomas** (español, inglés, portugués, alemán). El español es el texto de las páginas. Las traducciones se cargan desde tablas:
  1. Agregar la fila `("español", "inglés", "portugués", "alemán")` en `i18n/fuente/*.py` (lo nuevo de servicios y pipeline va en `6-servicios.py`). El español tiene que ser **idéntico** al texto de la página.
  2. Correr `python3 i18n/fuente/armar.py`, que regenera `i18n/en.js`, `pt.js` y `de.js`.
  3. Probar con `?lang=en` (o pt, de) en la dirección.
  - Si se cambia un texto en español en la página, hay que cambiarlo también en la tabla.
- Revisar siempre **en compu y en celu** (por ejemplo 1440 px y 390 px de ancho), que no haya errores en la consola ni nada que se salga de la pantalla.
- La flecha diagonal se dibuja con SVG (`<svg class="ico-ne">`), no con el carácter ↗, porque en algunos equipos se ve como emoji.

## 4. Cómo trabaja el usuario

- Habla en español rioplatense, informal. Responderle igual, corto y claro, sin tecnicismos.
- Suele mandar capturas de pantalla con un comentario corto ("esto está raro", "sacá esto").
- A veces va mandando varias cosas y dice **"avanzá"**: hasta ahí, solo anotar ("Anotado") y no hacer nada; cuando dice "avanzá", hacer todo junto.
- Cuando pide que no se toque algo, no tocarlo. Cuando dice que algo no le gusta, volver exactamente a lo anterior.
- Después de cada cambio: probar, hacer commit, **subirlo a `revision-5`** y pasarle el link de descarga del zip y una captura de cómo quedó.
- Prueba en su compu con una copia local (carpetas tipo `coralia-revision-13`), así que tiene que bajar el zip de nuevo para ver los cambios.

## 5. Estado actual (5 de octubre de 2026)

El documento de comentarios de Nico (revisión 01) está cumplido. Además se hizo:

- **Servicios: Medir, Mitigar y Adaptarse** (como en el deck; Nico pidió "Adaptarse" y no "Adaptar"). Cada uno con su app: Carbon Footprint, Carbon Markets Hub y Climate Risk App. En el inicio se muestran como tres tarjetas con forma de carpeta (el usuario probó otros diseños y volvió a este).
- **Páginas de servicio rediseñadas:** color propio por servicio (verde, ámbar y azul), los otros dos servicios a la derecha arriba, cortes en diagonal, pasos en una línea de tiempo que se enciende al bajar, la app en grande. Sin números 01/02/03 (el usuario los sacó).
- **Foto de Medir:** `assets/proyectos/ruuts-1.jpg` (el ganado entre los árboles; la eligió el usuario).
- **Antes y después en Carbon Markets** con fotos reales: Blue Carbon (DBCX, República Dominicana), ARR (Chubut) y REDD+ (Misiones).
- **Pipeline e inversores** con tres proyectos reales: ReMonte (ARR, 24.024 ha, rating Sylvera A), Chubut ARR (7.240 ha) y Dominican Blue Carbon (2.784 ha de manglar). Datos y fotos de los kits de comunicación de cada proyecto.
- **Misiones:** 10,1M VCUs verificados por Verra para 2017–2022 (antes decía 10M+).
- "Proyectos" en el menú lleva a `proyectos.html`. Se sacó el link "Ver documento" del premio (llevaba a una página que ya no existe).
- Galerías de proyectos con fotos del mismo tamaño. Tarjetas de proyectos: sin pasar el mouse muestran solo el título.

## 6. Pendientes que tiene que pasar Coralia

1. La **frase definitiva de la portada** (hoy es provisoria: "Soluciones ambientales con impacto real para cada organización").
2. Confirmar el **número de la tarjeta de Mercados** en la portada: dice "350k toneladas removidas", pero en el resto del sitio se usa 13M+ tCO₂e.
3. El **link de la demo** del Carbon Markets Hub ("Acceder a la demo") y el de **"Iniciar sesión"**.
4. Los **créditos estimados** de cada proyecto del pipeline y los **otros 3 o 4 proyectos** (son 6 o 7 en total).
5. Que Nico confirme los tres servicios (Medir, Mitigar y Adaptarse).
6. Si se prueba otra intro animada (por ejemplo, el río mitad mapa técnico y mitad foto real).

## 7. Detalles sueltos a tener en cuenta

- En "Casos publicados" sigue el filtro "Consultoría" con dos casos (sesu.ai y WIPO GREEN). No se decidió a qué servicio pasan.
- En los proyectos con una sola foto, la galería muestra la versión de la foto con el logo del cliente encima.
- Pexels y Unsplash no se pueden descargar desde el entorno de Claude; si hacen falta fotos nuevas, el usuario las tiene que mandar.
- Los kits de comunicación originales (Chubut, Misiones, ReMonte y DBCX) no están en el repo; solo los recortes que se usaron, en `assets/pipeline`, `assets/servicios` y `assets/proyectos/misiones-*.webp`.
