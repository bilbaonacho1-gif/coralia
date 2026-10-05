// Coralia — página de un servicio (servicio.html?s=medir | mitigar | adaptar)
// Contenido tomado de la web actual de Coralia (páginas de Mitigación y Adaptación). Para editar textos: SERVICIOS abajo.
// Si cambiás un texto, cambialo también en i18n/fuente/6-servicios.py (traducciones).
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const INTRO = 'El cambio climático ya no es una amenaza futura, es una realidad presente. En Coralia desarrollamos estrategias concretas para reducir las emisiones, compensar los impactos y construir un futuro resiliente. Acompañamos a las organizaciones que deciden transformar su huella en acciones concretas.';

const SERVICIOS = {
  medir: {
    title: 'Medición', sub: 'de la huella de carbono', img: 'assets/marca/pilar-tecnologia.webp', intro: INTRO, cases: ['medir'],
    card: 'Huella de carbono de empresas, productos y eventos, con estándares internacionales (GHG Protocol, ISO 14064 e ISO 14067).',
    highlights: [['+40', 'inventarios de GEI realizados'], ['Alcances 1, 2 y 3', 'de la operación a la cadena de valor'], ['GHG Protocol', 'e ISO 14064 e ISO 14067']],
    blocks: [
      {
        id: 'huella', eyebrow: 'Medir', name: 'Huella de carbono', app: 'footprint', tabs: true, // producto o corporativa: se elige con pestañas
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
    card: 'Mercados de carbono: desarrollamos proyectos de punta a punta, de la factibilidad a la emisión de los créditos.',
    highlights: [['De punta a punta', 'de la factibilidad a la emisión de los créditos'], ['Voluntarios y regulados', 'los dos mercados de carbono'], ['Alta integridad', 'con foco en soluciones basadas en la naturaleza']],
    blocks: [
      {
        id: 'mercados', eyebrow: 'Mitigar', name: 'Mercados de carbono', app: 'markets',
        text: 'Ofrecemos apoyo integral en el desarrollo de proyectos de mercado de carbono, desde la planificación hasta la implementación, facilitando la participación tanto en mercados voluntarios como regulados.',
        // Fuente: Company deck 2026 (13M+ tCO₂e) = proyectos anteriores por sector (web actual, 3,2M) + ECO2 Misiones (10,1M VCUs, período 2017–2022)
        stat: {
          n: '13M+', label: 'toneladas de CO₂e reducidas o removidas de la atmósfera en proyectos desarrollados por Coralia.',
          parts: [['Bosque nativo · ECO2 Misiones', 10100000, '10,1M'], ['Generación eléctrica', 1949660], ['Energías renovables', 675403], ['Agroindustria', 581347], ['Oil & Gas', 31496]],
        },
        // Proyecto destacado (datos del Company deck 2026)
        feature: {
          eyebrow: 'Proyecto destacado · Verra JNR · VCS 4648', name: 'ECO2 Misiones', case: 'misiones', img: 'assets/proyectos/misiones-aerea.webp',
          text: 'Programa jurisdiccional REDD+ de la provincia de Misiones: el primero del mundo liderado por un gobierno subnacional en emitir créditos de carbono.',
          stats: [
            ['10,1M', 'VCUs', 'verificados por Verra para 2017–2022: la mayor emisión de un solo período en su historia'],
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
    card: 'Análisis de riesgo climático y planes de adaptación para cada activo y organización.',
    highlights: [['Físico y de transición', 'los dos tipos de riesgo climático'], ['Activo por activo', 'con escenarios en el territorio'], ['Plan de adaptación', 'alerta temprana y respuesta']],
    blocks: [
      {
        id: 'riesgo', eyebrow: 'Adaptarse', name: 'Análisis de riesgo climático', app: 'risk',
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
// número del servicio (01 Medir, 02 Mitigar, 03 Adaptarse) y los otros dos al costado, con su número asomando
const KEYS = Object.keys(SERVICIOS), num = (k) => String(KEYS.indexOf(k) + 1).padStart(2, '0');
$('#sNum').textContent = num(key);
$('#sSide').innerHTML = KEYS.filter((k) => k !== key).map((k) => `<a class="sv-side sv--${k}" href="servicio.html?s=${k}"><img src="${SERVICIOS[k].img}" alt="" loading="lazy"><span class="sv-side__n" aria-hidden="true">${num(k)}</span><span class="sv-side__t"><b>${SERVICIOS[k].title}</b><em>${SERVICIOS[k].sub}</em></span></a>`).join('');
// franja de datos destacados, en diagonal sobre la foto de la app del servicio
const facts = (b) => S.highlights && b.app ? `<section class="sv-facts">
  <img class="sv-facts__bg" src="assets/apps/fondo-${b.app}.webp" alt="" loading="lazy">
  <div class="wrap sv-facts__in">${S.highlights.map((h, i) => `<div class="sv-fact reveal" style="--d:${i * 0.12}s"><b>${h[0]}</b><span>${h[1]}</span></div>`).join('')}</div>
</section>` : '';

// Pasos: línea de tiempo que se va encendiendo al bajar. Si el bloque tiene "tabs", cada grupo es una opción
// (pestañas); si no, los grupos son etapas seguidas de un mismo recorrido.
// cada paso y cada etapa va en su propia fila de la grilla (--r): el punto al medio y la tarjeta a un costado
let row = 0;
const stepItems = (steps, from = 0) => steps.map((st, i) => `<li class="tl__item" style="--r:${++row}"><span class="tl__dot">${String(from + i + 1).padStart(2, '0')}</span><div class="tl__card"><h4>${st[0]}</h4><p>${st[1]}</p></div></li>`).join('');
function timeline(b) {
  const gs = b.groups || []; if (!gs.length) return '';
  if (b.tabs) return `
    <div class="sv-how reveal"><span class="eyebrow">Cómo lo hacemos</span>
      <div class="sv-tabs" role="tablist">${gs.map((g, i) => `<button type="button" role="tab" class="sv-tab${i ? '' : ' is-on'}" aria-selected="${!i}" data-tab="${i}">${g.title}</button>`).join('')}</div></div>
    ${gs.map((g, i) => { row = 0; return `<ol class="tl"${i ? ' hidden' : ''} data-pane="${i}"><li class="tl__rail" aria-hidden="true"><i></i></li>${stepItems(g.steps)}</ol>`; }).join('')}`;
  let k = 0; row = 0;
  return `<div class="sv-how reveal"><span class="eyebrow">Cómo lo hacemos</span></div>
    <ol class="tl"><li class="tl__rail" aria-hidden="true"><i></i></li>${gs.map((g) => { const html = (gs.length > 1 ? `<li class="tl__phase" style="--r:${++row}"><span>${g.title}</span></li>` : '') + stepItems(g.steps, k); k += g.steps.length; return html; }).join('')}</ol>`;
}
// los pilares (adaptación) se muestran como un recorrido: uno lleva al otro
const ICONS = [
  '<path d="M12 3 5 6v5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6z"/><path d="M9 12l2 2 4-4"/>',
  '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M4 15h16M10 4v16M15 4v16"/>',
  '<path d="M4 15c3-6 13-6 16 0"/><path d="M12 15v5M9 20h6M12 4v3M5.6 7.6l2 2M18.4 7.6l-2 2"/>',
];
const flow = (ps) => `<div class="sv-flow">${ps.map((p, i) => `${i ? '<span class="sv-flow__arrow" aria-hidden="true">→</span>' : ''}<article class="sv-flow__it reveal" style="--d:${i * 0.12}s"><span class="sv-flow__ic"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[i % ICONS.length]}</svg></span><small>${String(i + 1).padStart(2, '0')}</small><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div>`;
// la app de este servicio, en grande: foto de fondo en su color, pantalla de la app y acceso
const showcase = (k) => `<section class="sv-appband"><div class="wrap"><a class="sv-show reveal" href="index.html#apps">
  <div class="sv-show__txt"><small>Con nuestra app</small><span class="sv-show__name"><img src="assets/apps/icon-${k}-claro.png" alt="">${APP[k][0]}</span><p>${APP[k][1]}</p><span class="btn btn--lime btn--sm">Conocé la app →</span></div>
  <div class="sv-show__shot"><img src="assets/apps/card-${k}.webp" alt="" loading="lazy"></div>
</a></div></section>`;

$('#sBlocks').innerHTML = S.blocks.map((b, bi) => `
  <section class="section sv-block${bi % 2 ? ' section--band' : ''}" id="${b.id}">
    <div class="wrap">
      <div class="sv-intro reveal">
        <div><span class="eyebrow">${b.eyebrow}</span><h2>${b.name}</h2></div>
        <p>${b.text}</p>
      </div>
      ${b.stat ? `<div class="sv-stat reveal"><div><b class="sv-stat__n">${b.stat.n}</b><p>${b.stat.label}</p></div>${donut(b.stat.parts)}</div>` : ''}
      ${b.feature ? feature(b.feature) : ''}
      ${b.pillars ? flow(b.pillars) : ''}
    </div>
  </section>
  ${facts(b)}
  <section class="section sv-block sv-block--steps">
    <div class="wrap">${timeline(b)}</div>
  </section>
  ${b.app ? showcase(b.app) : ''}`).join('');

// pestañas (producto / corporativa)
$$('.sv-tabs').forEach((tabs) => tabs.addEventListener('click', (e) => {
  const t = e.target.closest('.sv-tab'); if (!t) return;
  const sec = tabs.closest('.sv-block');
  $$('.sv-tab', tabs).forEach((x) => { const on = x === t; x.classList.toggle('is-on', on); x.setAttribute('aria-selected', on); });
  $$('.tl[data-pane]', sec).forEach((tl) => { tl.hidden = tl.dataset.pane !== t.dataset.tab; tl.classList.remove('is-built'); });
  railTick();
}));
// la línea se llena y cada paso se enciende cuando llega a la altura de la vista
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
function railTick() {
  const H = innerHeight, mark = H * 0.62;
  $$('.tl:not([hidden])').forEach((tl) => {
    const r = tl.getBoundingClientRect(); if (r.bottom < -200 || r.top > H + 200) return;
    tl.classList.add('is-built');
    const p = calm ? 1 : Math.min(1, Math.max(0, (mark - r.top) / r.height));
    tl.style.setProperty('--p', p.toFixed(3));
    $$('.tl__item', tl).forEach((it) => it.classList.toggle('is-on', calm || it.getBoundingClientRect().top + 20 < mark));
  });
}
let railT = false;
addEventListener('scroll', () => { if (!railT) { railT = true; requestAnimationFrame(() => { railT = false; railTick(); }); } }, { passive: true });
addEventListener('resize', railTick); railTick();

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
