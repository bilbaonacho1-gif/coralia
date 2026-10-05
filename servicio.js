// Coralia — página de un servicio (servicio.html?s=medir | mitigar | adaptar)
// Contenido tomado de la web actual de Coralia (páginas de Mitigación y Adaptación). Para editar textos: SERVICIOS abajo.
// Si cambiás un texto, cambialo también en i18n/fuente/6-servicios.py (traducciones).
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const INTRO = 'El cambio climático ya no es una amenaza futura, es una realidad presente. En Coralia desarrollamos estrategias concretas para reducir las emisiones, compensar los impactos y construir un futuro resiliente. Acompañamos a las organizaciones que deciden transformar su huella en acciones concretas.';

const SERVICIOS = {
  medir: {
    title: 'Medición', sub: 'de la huella de carbono', img: 'assets/proyectos/andromaco-1.jpg', intro: INTRO, cases: ['medir'],
    blocks: [
      {
        id: 'huella', eyebrow: 'Medir', name: 'Huella de carbono', app: 'footprint',
        text: 'Realizamos cálculos de huella de carbono y estrategias de reducción para empresas, productos, eventos y territorios, promoviendo la sostenibilidad y la mitigación del cambio climático.',
        groups: [
          { title: 'Huella de carbono de productos', steps: [
            ['Definición del alcance', 'Establecemos los límites del análisis, desde la extracción de materias primas hasta la disposición final del producto, abarcando todo su ciclo de vida.'],
            ['Recolección de datos', 'Relevamos datos detallados de cada fase del ciclo de vida con una metodología robusta y una base de datos de insumos propia.'],
            ['Cálculo de emisiones', 'Calculamos las emisiones de GEI en cada etapa del proceso productivo, según estándares internacionales como ISO 14067 y el GHG Protocol.'],
            ['Análisis de puntos críticos', 'Identificamos las fases del ciclo de vida con más emisiones, como la producción de materiales o el transporte, para enfocar la reducción.'],
            ['Estrategias de reducción', 'Proponemos acciones concretas, como el uso de energía renovable, la optimización de procesos o el cambio de insumos.'],
            ['Informe y comunicación', 'Preparamos un informe detallado con los resultados y las oportunidades de mejora, y lo presentamos de forma clara a los grupos de interés.'],
          ] },
          { title: 'Huella de carbono corporativa', steps: [
            ['Definición del alcance', 'Definimos los límites del estudio, incluyendo los alcances operativos y organizacionales.'],
            ['Recolección de datos', 'Reunimos información de consumo de energía, transporte, residuos y otras fuentes para identificar las fuentes de emisión.'],
            ['Cálculo de emisiones', 'Cuantificamos las emisiones según estándares internacionales, como ISO 14064 y el GHG Protocol.'],
            ['Análisis de fuentes clave', 'Identificamos las actividades de la empresa con mayor impacto en la huella total.'],
            ['Desarrollo de estrategias', 'Proponemos medidas de reducción, como mejoras de eficiencia energética y el uso de energía renovable.'],
            ['Informe y comunicación', 'Presentamos los resultados en un informe claro, que facilita la comunicación interna y externa de la huella.'],
          ] },
        ],
      },
    ],
  },
  mitigar: {
    title: 'Mitigación', sub: 'del cambio climático', img: 'assets/proyectos/mercuria-1.jpg', intro: INTRO, cases: ['mitigar'],
    blocks: [
      {
        id: 'mercados', eyebrow: 'Mitigar', name: 'Mercados de carbono', app: 'markets',
        text: 'Ofrecemos apoyo integral en el desarrollo de proyectos de mercado de carbono, desde la planificación hasta la implementación, facilitando la participación tanto en mercados voluntarios como regulados.',
        // Fuente: Company deck 2026 (13M+ tCO₂e) = proyectos anteriores por sector (web actual, 3,2M) + ECO2 Misiones (10M+ VCUs)
        stat: {
          n: '13M+', label: 'toneladas de CO₂e reducidas o removidas de la atmósfera en proyectos desarrollados por Coralia.',
          parts: [['Bosque nativo · ECO2 Misiones', 10000000, '10M+'], ['Generación eléctrica', 1949660], ['Energías renovables', 675403], ['Agroindustria', 581347], ['Oil & Gas', 31496]],
        },
        // Proyecto destacado (datos del Company deck 2026)
        feature: {
          eyebrow: 'Proyecto destacado · Verra JNR · VCS 4648', name: 'ECO2 Misiones', case: 'misiones', img: 'assets/proyectos/misiones.jpg',
          text: 'Programa jurisdiccional REDD+ de la provincia de Misiones: el primero del mundo liderado por un gobierno subnacional en emitir créditos de carbono.',
          stats: [
            ['10M+', 'VCUs', 'en el primer período de monitoreo: la mayor emisión de un solo período en la historia de Verra'],
            ['2,8M', 'VCUs elegibles para CORSIA', ''],
            ['A–AA', 'rating de Sylvera', 'antes de la emisión: el 0,03% superior entre más de 24.000 proyectos'],
            ['1,5M', 'hectáreas de bosque nativo', 'verificado por AENOR'],
          ],
          share: [['40%', 'fondo provincial'], ['30%', 'propietarios'], ['30%', 'comunidades (CLPI)']],
          ratings: [['assets/marca/sylvera-misiones.webp', 'ECO2 Misiones', 'A–AA'], ['assets/marca/sylvera-remonte.webp', 'ReMonte Chaco Seco', 'A'], ['assets/marca/premio-green-cross.webp', 'Best Global NbS Developer', 'Green Cross UK · 2025']],
        },
        groups: [
          { title: 'Desarrollo del proyecto', steps: [
            ['Estudio de factibilidad', 'Evaluación inicial para determinar la viabilidad técnica, económica y legal del proyecto.'],
            ['Línea de base', 'Determinación de las emisiones de GEI sin el proyecto, para compararlas con las emisiones futuras.'],
            ['Consulta a actores', 'Identificación de los actores relevantes y consulta para incorporar sus perspectivas al proyecto.'],
            ['Salvaguardas', 'Evaluación de medidas para proteger a las comunidades y al ambiente de los efectos adversos del proyecto.'],
            ['No permanencia', 'Evaluación del riesgo de que el carbono almacenado se libere antes de tiempo por eventos imprevistos.'],
            ['Análisis de fugas', 'Análisis de las actividades del proyecto que podrían aumentar las emisiones fuera de sus límites.'],
            ['Plan de monitoreo', 'Desarrollo de un plan detallado para medir y reportar las reducciones de emisiones.'],
            ['Preparación del PD', 'Recopilación y organización de los datos del proyecto en un documento formal para su validación.'],
            ['Validación', 'Revisión del documento de proyecto por una entidad independiente, para su aprobación bajo el estándar de carbono.'],
            ['Registro del proyecto', 'Registro oficial del proyecto ante un estándar de carbono como Verra.'],
          ] },
          { title: 'Monitoreo y verificación', steps: [
            ['Monitoreo', 'Seguimiento de los indicadores clave según el plan de monitoreo del proyecto.'],
            ['Informe de monitoreo', 'Redacción de los informes con los resultados del monitoreo, para verificar las reducciones.'],
            ['Verificación', 'Certificación oficial de las reducciones logradas por el proyecto.'],
            ['Emisión de créditos', 'Emisión de los créditos de carbono tras la verificación, listos para comercializar.'],
          ] },
        ],
      },
    ],
  },
  adaptar: {
    title: 'Adaptación', sub: 'al cambio climático', img: 'assets/proyectos/pluspetrol-2.jpg', intro: INTRO, cases: ['adaptar'],
    blocks: [
      {
        id: 'riesgo', eyebrow: 'Adaptar', name: 'Análisis de riesgo climático', app: 'risk',
        text: 'Un análisis de riesgo climático identifica y evalúa los impactos potenciales del cambio climático sobre los sistemas productivos, naturales y humanos. Nuestra metodología combina el estudio de la vulnerabilidad con la probabilidad de eventos extremos, construyendo escenarios de amenazas climáticas representados en el territorio. Así se arma una matriz de riesgo climático, a partir de la cual se diseña un plan de adaptación.',
        pillars: [
          ['Evaluación de vulnerabilidad', 'Identificamos las sensibilidades ambientales e intrínsecas, junto con los factores que determinan la resiliencia.'],
          ['Matriz de riesgo', 'Combinamos la vulnerabilidad con la probabilidad de las amenazas climáticas a lo largo de la cadena de valor.'],
          ['Medidas de adaptación', 'Sistemas de alerta temprana y planes de respuesta ante eventos climáticos extremos.'],
        ],
        groups: [
          { title: 'Pasos del proceso', steps: [
            ['Evaluación de riesgos', 'Evaluamos los riesgos físicos (fenómenos meteorológicos extremos) y los de transición (regulaciones, cambios de mercado) que afectan a las empresas, con soluciones para minimizar los impactos y garantizar la resiliencia climática.'],
            ['Evaluación de la vulnerabilidad', 'Evaluamos la exposición de la empresa a los riesgos relacionados con el clima y su capacidad de adaptación, identificando vulnerabilidades y oportunidades para fortalecer la resiliencia.'],
            ['Análisis de impacto', 'Cuantificamos los posibles impactos de los riesgos climáticos en las áreas financieras y operativas, para orientar decisiones informadas y fortalecer la resiliencia de la organización.'],
            ['Desarrollo de estrategias', 'Diseñamos planes para mitigar los riesgos y facilitar la adaptación a condiciones regulatorias y ambientales en evolución, garantizando el cumplimiento y aprovechando las oportunidades emergentes.'],
            ['Seguimiento y revisión', 'Implementamos un seguimiento continuo para adaptar las estrategias a los riesgos emergentes, para que las organizaciones sigan siendo resilientes, proactivas y estén preparadas.'],
          ] },
        ],
      },
    ],
  },
};

const APP = {
  footprint: ['Carbon Footprint', 'Calculá y gestioná la huella con la misma herramienta que usan nuestros consultores.'],
  markets: ['Carbon Markets Hub', 'Diagnosticá tu tierra en cinco minutos: qué proyecto de carbono es posible y cuánto vale.'],
  risk: ['Climate Risk App', 'Riesgo climático físico y de transición, activo por activo, con planes de adaptación.'],
};

const key = new URLSearchParams(location.search).get('s');
const S = SERVICIOS[key];
if (!S) { location.replace('index.html#servicios'); throw new Error('Servicio no encontrado'); }
document.title = `${S.title} | Coralia Environmental`;
$('#servicio').className = `sv sv--${key}`;
$('#sHeroImg').src = S.img;
$('#sCrumb').textContent = S.title;
$('#sTitle').textContent = S.title; $('#sSub').textContent = S.sub;
$('#sIntro').textContent = S.intro;
// accesos directos a cada bloque de la página
if (S.blocks.length > 1) $('#sJump').innerHTML = S.blocks.map((b) => `<a class="btn btn--glass btn--sm" href="#${b.id}">${b.name}</a>`).join('');

const fmt = (n) => n.toLocaleString(window.LOCALE || 'es-AR');
// gráfico de anillo con el reparto de toneladas por sector
function donut(parts) {
  const total = parts.reduce((a, p) => a + p[1], 0), R = 70, C = 2 * Math.PI * R;
  const cols = ['#c8f04a', '#8fbf5a', '#5e9a46', '#2f6b3a', '#e6eedb'];
  let off = 0;
  const arcs = parts.map((p, i) => {
    const len = (p[1] / total) * C, a = `<circle r="${R}" cx="90" cy="90" fill="none" stroke="${cols[i]}" stroke-width="30" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-off}" transform="rotate(-90 90 90)"/>`;
    off += len; return a;
  }).join('');
  const legend = parts.map((p, i) => `<li><i style="background:${cols[i]}"></i><span>${p[0]}</span><b>${p[2] || fmt(p[1])}</b></li>`).join('');
  return `<div class="sv-donut"><svg viewBox="0 0 180 180" aria-hidden="true">${arcs}</svg><ul>${legend}</ul></div>`;
}
// proyecto destacado: datos clave, reparto de beneficios y ratings
function feature(f) {
  return `<article class="sv-feat reveal">
    <div class="sv-feat__media"><img src="${f.img}" alt="" loading="lazy"></div>
    <div class="sv-feat__body">
      <span class="eyebrow">${f.eyebrow}</span>
      <h3>${f.name}</h3>
      <p>${f.text}</p>
      <dl class="sv-feat__stats">${f.stats.map((s) => `<div><dt>${s[0]}</dt><dd><b>${s[1]}</b>${s[2] ? `<span>${s[2]}</span>` : ''}</dd></div>`).join('')}</dl>
      <div class="sv-feat__share"><span>Reparto de beneficios</span>${f.share.map((s) => `<b>${s[0]}</b> ${s[1]}`).join(' · ')}</div>
      <a class="link" href="proyecto.html?p=${f.case}">Ver el caso completo →</a>
    </div>
    <div class="sv-feat__ratings"><span class="sv-feat__rtitle">Calificados antes de la emisión</span>${f.ratings.map((r) => `<figure><img src="${r[0]}" alt="" loading="lazy"><figcaption><b>${r[2]}</b>${r[1]}</figcaption></figure>`).join('')}</div>
  </article>`;
}
let n = 0;
$('#sBlocks').innerHTML = S.blocks.map((b, bi) => `
  <section class="section sv-block${bi % 2 ? ' section--band' : ''}" id="${b.id}">
    <div class="wrap">
      <div class="sv-intro reveal">
        <div><span class="eyebrow">${b.eyebrow}</span><h2>${b.name}</h2></div>
        <p>${b.text}</p>
      </div>
      ${b.stat ? `<div class="sv-stat reveal"><div><b class="sv-stat__n">${b.stat.n}</b><p>${b.stat.label}</p></div>${donut(b.stat.parts)}</div>` : ''}
      ${b.feature ? feature(b.feature) : ''}
      ${b.pillars ? `<div class="sv-pillars">${b.pillars.map((p) => `<article class="sv-pillar reveal"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div>` : ''}
      ${(b.groups || []).map((g) => { const start = n; n += g.steps.length; return `
        <h3 class="sv-group reveal">${g.title}</h3>
        <ol class="sv-steps" start="${start + 1}">${g.steps.map((st, i) => `<li class="sv-step reveal" style="--d:${(i % 3) * 0.08}s"><span class="sv-step__n">${String(start + i + 1).padStart(2, '0')}</span><h4>${st[0]}</h4><p>${st[1]}</p></li>`).join('')}</ol>`; }).join('')}
      ${b.app ? `<a class="sv-app reveal" href="index.html#apps"><img src="assets/apps/icon-${b.app}-claro.png" alt=""><span><small>Con nuestra app</small><b>${APP[b.app][0]}</b><em>${APP[b.app][1]}</em></span><i aria-hidden="true">→</i></a>` : ''}
    </div>
  </section>`).join('');
// cada bloque reinicia la numeración de sus pasos
$$('.sv-block').forEach((sec) => { let k = 0; $$('.sv-step__n', sec).forEach((el) => { el.textContent = String(++k).padStart(2, '0'); }); });

// casos publicados de este servicio
const cs = (typeof CASES !== 'undefined' ? CASES : []).filter((c) => S.cases.includes(c.svc)).slice(0, 6);
if (cs.length) {
  $('#sCasesWrap').hidden = false;
  $('#sCases').innerHTML = cs.map((c) => { const src = typeof tallOf === 'function' ? tallOf(c) : (c.hero || c.img); return `<a class="sv-case" href="proyecto.html?p=${c.id}"><span class="sv-case__img">${src ? `<img src="${src}" alt="" loading="lazy">` : ''}</span><span class="sv-case__body"><small>${c.client}</small><b>${c.title}</b></span></a>`; }).join('');
}
$('#sCta').href = `mailto:contacto@coraliae.com?subject=${encodeURIComponent('Consulta por ' + S.title)}`;

// Aparición al scrollear
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
}), { threshold: 0.12 }) : null;
$$('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-visible')));
