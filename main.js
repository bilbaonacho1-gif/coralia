// Coralia — versión interactiva
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = (n, d = 0) => n.toLocaleString(window.LOCALE || 'es-AR', { maximumFractionDigits: d, minimumFractionDigits: d });

/* ---------- Aparición al scrollear ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold: 0.15 }) : null;
$$('.reveal, .map').forEach((el) => io ? io.observe(el) : el.classList.add('is-visible'));
// el patrón de mariposas de fondo se descarga recién cuando su sección está cerca
$$('.deco-pattern').forEach((el) => {
  if (!('IntersectionObserver' in window)) return el.classList.add('is-in');
  const o = new IntersectionObserver((es) => { if (es[0].isIntersecting) { el.classList.add('is-in'); o.disconnect(); } }, { rootMargin: '600px 0px' });
  o.observe(el);
});

/* ---------- 1) Nuestras apps: tarjetas que abren el recorrido paso a paso ---------- */
const APP_NAMES = { footprint: 'Carbon Footprint', markets: 'Carbon Markets Hub', risk: 'Climate Risk App' };
const detail = $('#app-detail');
function openApp(k) {
  const card = $(`.appcard[data-app="${k}"]`), already = card.classList.contains('is-on') && !detail.hidden;
  if (already) return closeApp();
  if (window.setApp) setApp(k);
  $$('.appcard').forEach((c) => { const on = c === card; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on); });
  $$('.story', detail).forEach((st) => { st.hidden = st.dataset.story !== k; });
  $('#appDetailTitle').textContent = APP_NAMES[k];
  detail.hidden = false;
  showStep($(`.story[data-story="${k}"]`), 0);
  requestAnimationFrame(() => detail.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }));
}
function closeApp() {
  const on = $('.appcard.is-on');
  detail.hidden = true;
  $$('.appcard').forEach((c) => { c.classList.remove('is-on'); c.setAttribute('aria-selected', false); });
  if (on) { on.scrollIntoView({ block: 'center' }); on.focus({ preventScroll: true }); }
}
$$('.appcard').forEach((c) => c.addEventListener('click', () => openApp(c.dataset.app)));

/* Rueda de apps: porciones de anillo con bordes redondeados (SVG). Ángulos en grados, 0 = arriba. */
const APPS = [
  { k: 'footprint', a0: -60, a1: 60, lines: ['Carbon', 'Footprint'], bg: 'fondo-footprint', tag: 'Medir', dot: 'medir', desc: 'Huella de productos, empresas y eventos, de la fórmula al reporte verificable.' },
  { k: 'markets', a0: 60, a1: 180, lines: ['Carbon', 'Markets'], tag: 'Mitigar', dot: 'mitigar', desc: 'Tu tierra diagnosticada en cinco minutos: qué proyecto de carbono es posible y cuánto vale.' },
  { k: 'risk', a0: 180, a1: 300, lines: ['Climate', 'Risk App'], tag: 'Adaptar', dot: 'adaptar', desc: 'Riesgo climático físico y de transición, activo por activo, con planes de adaptación.' },
];
const R0 = 104, R1 = 228, RON = 250, RC = 22, GAP = 9, CORE = 92;
const wheel = $('#wheel');
let appOn = 'footprint';
if (wheel) {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (t, at = {}, p = wheel) => { const e = document.createElementNS(NS, t); for (const k in at) e.setAttribute(k, at[k]); p.appendChild(e); return e; };
  const P = (r, a) => { const t = a * Math.PI / 180; return [r * Math.sin(t), -r * Math.cos(t)]; };
  const toward = (p, q, d) => { const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy); return [p[0] + dx * d / L, p[1] + dy * d / L]; };
  const f = (p) => p[0].toFixed(2) + ' ' + p[1].toFixed(2);
  // porción de anillo entre r0 y r1, con un hueco constante entre porciones y las 4 esquinas redondeadas
  function sector(r0, r1, a0, a1) {
    const deg = (d, r) => (d / r) * 180 / Math.PI;
    const o0 = a0 + deg(GAP / 2, r1), o1 = a1 - deg(GAP / 2, r1), i0 = a0 + deg(GAP / 2, r0), i1 = a1 - deg(GAP / 2, r0);
    const co = deg(RC, r1), ci = deg(RC, r0);
    const A = P(r1, o0), B = P(r1, o1), C = P(r0, i1), D = P(r0, i0);
    const big = (o1 - o0 - 2 * co) > 180 ? 1 : 0, bigI = (i1 - i0 - 2 * ci) > 180 ? 1 : 0;
    return `M${f(P(r1, o0 + co))}A${r1} ${r1} 0 ${big} 1 ${f(P(r1, o1 - co))}Q${f(B)} ${f(toward(B, C, RC))}L${f(toward(C, B, RC))}Q${f(C)} ${f(P(r0, i1 - ci))}`
      + `A${r0} ${r0} 0 ${bigI} 0 ${f(P(r0, i0 + ci))}Q${f(D)} ${f(toward(D, A, RC))}L${f(toward(A, D, RC))}Q${f(A)} ${f(P(r1, o0 + co))}Z`;
  }
  const defs = el('defs');
  // las pantallas van en blanco y negro, oscurecidas, y cada porción se tiñe con el color de su app
  const gray = el('filter', { id: 'wgray', 'color-interpolation-filters': 'sRGB' }, defs);
  el('feColorMatrix', { type: 'saturate', values: 0 }, gray);
  const ct = el('feComponentTransfer', {}, gray); ['R', 'G', 'B'].forEach((c) => el(`feFunc${c}`, { type: 'linear', slope: 0.62 }, ct));
  const spin = el('g', { class: 'wheel__spin' }); // gira al aparecer
  el('circle', { class: 'wheel__ring', r: 262 }, spin);
  const segs = APPS.map((ap, i) => {
    const clip = el('clipPath', { id: `wclip-${ap.k}` }, defs), cp = el('path', {}, clip);
    const g = el('g', { class: 'wseg', tabindex: 0, role: 'button', 'aria-label': `${APP_NAMES[ap.k]}: ${ap.desc} Ver cómo funciona`, 'data-app': ap.k }, spin);
    // imagen que cubre la porción en su tamaño máximo
    const pts = []; for (let a = ap.a0; a <= ap.a1; a += 5) pts.push(P(RON, a), P(R0, a));
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const x = Math.min(...xs), y = Math.min(...ys), w = Math.max(...xs) - x, h = Math.max(...ys) - y;
    // fondo: la foto de la app si la tiene; si no, su pantalla en blanco y negro
    if (ap.bg) g.classList.add('wseg--foto');
    el('image', { href: `assets/apps/${ap.bg || 'card-' + ap.k}.webp`, x, y, width: w, height: h, preserveAspectRatio: 'xMidYMid slice', 'clip-path': `url(#wclip-${ap.k})`, ...(ap.bg ? {} : { filter: 'url(#wgray)' }) }, g);
    const shade = el('path', { class: 'wseg__shade' }, g);
    const edge = el('path', { class: 'wseg__edge' }, g);
    // ícono de la app y el nombre en dos líneas (la segunda, en el color de la app)
    const ico = el('image', { class: 'wseg__ico', href: `assets/apps/icon-${ap.k}-claro.png` }, g);
    const t1 = el('text', { class: 'wseg__name' }, g), t2 = el('text', { class: 'wseg__sub' }, g);
    t1.textContent = ap.lines[0].toUpperCase(); t2.textContent = ap.lines[1].toUpperCase();
    const s = { ap, cp, shade, edge, ico, t1, t2, g, r: ap.k === appOn ? RON : R1 };
    g.addEventListener('pointerenter', () => { stopAuto(); setApp(ap.k); });
    g.addEventListener('focus', () => { stopAuto(); setApp(ap.k); });
    g.addEventListener('click', () => { stopAuto(); setApp(ap.k); openApp(ap.k); });
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openApp(ap.k); } });
    return s;
  });
  // centro: logo de Coralia y acceso para probar las apps (TODO: cambiar por la URL de la plataforma cuando esté)
  const core = el('a', { class: 'wcore', href: 'simuladores.html', 'aria-label': 'Probá las apps de Coralia' });
  el('circle', { class: 'wcore__pulse', r: CORE }, core);
  el('circle', { class: 'wcore__bg', r: CORE }, core);
  el('image', { href: 'assets/logo.png', x: -62, y: -58, width: 124, height: 70.6 }, core);
  const cta = el('text', { class: 'wcore__cta', x: 0, y: 40 }, core); cta.textContent = 'Probá las apps →';
  el('circle', { class: 'wheel__core', r: CORE }, core);

  function draw(s) {
    const d = sector(R0, s.r, s.ap.a0, s.ap.a1);
    s.cp.setAttribute('d', d); s.shade.setAttribute('d', d); s.edge.setAttribute('d', d);
    // los nombres: pegados al borde exterior de cada porción, en un tamaño que entra
    // ícono arriba y las dos líneas abajo, centrados en la porción (en el celu, más grandes)
    const mid = (s.ap.a0 + s.ap.a1) / 2, big = innerWidth < 900 ? 1.3 : 1;
    let k = 1;
    const place = (rr, dx = 0) => {
      let [tx, ty] = P(rr, mid); tx -= Math.sign(tx) * dx;
      const I = 46 * k * big, f1 = 17 * k * big, f2 = 12 * k * big, H = I + 8 + f1 * 0.74 + 9 + f2 * 0.74, top = ty - H / 2;
      Object.entries({ x: tx - I / 2, y: top, width: I, height: I }).forEach(([a, v]) => s.ico.setAttribute(a, v.toFixed(1)));
      s.t1.setAttribute('font-size', f1.toFixed(1)); s.t1.setAttribute('x', tx); s.t1.setAttribute('y', (top + I + 8 + f1 * 0.74).toFixed(1));
      s.t2.setAttribute('font-size', f2.toFixed(1)); s.t2.setAttribute('x', tx); s.t2.setAttribute('y', (top + H).toFixed(1));
    };
    // si no entra en la porción, se corre hacia el centro hasta que entre
    const fits = () => [s.ico, s.t1, s.t2].every((t) => {
      if (t.getClientRects().length === 0) return true;
      const bb = t.getBBox(), pad = 6;
      return [[bb.x - pad, bb.y], [bb.x + bb.width + pad, bb.y], [bb.x - pad, bb.y + bb.height], [bb.x + bb.width + pad, bb.y + bb.height]]
        .every(([x, y]) => s.shade.isPointInFill(new DOMPoint(x, y)));
    });
    // busca una posición donde entre entero; si no hay, achica todo un poco y vuelve a probar
    const base = R0 + (s.r - R0) * 0.5;
    const tries = [];
    [0, 8, -8, 16].forEach((dr) => [0, 6, 12, 18, -6, -12].forEach((dx) => tries.push([base + dr, dx])));
    let ok = false;
    for (k of [1, 0.92, 0.84, 0.76]) {
      for (const [r, dx] of tries) { place(r, dx); if (fits()) { ok = true; break; } }
      if (ok) break;
    }
    if (!ok) { k = 0.76; place(base); }
    s.g.classList.toggle('is-on', s.ap.k === appOn);
  }
  segs.forEach(draw);
  let anim = 0;
  function tween() {
    let moving = false;
    segs.forEach((s) => {
      const goal = s.ap.k === appOn ? RON : R1;
      if (Math.abs(goal - s.r) > 0.3) { s.r += (goal - s.r) * 0.18; moving = true; } else s.r = goal;
      draw(s);
    });
    anim = moving ? requestAnimationFrame(tween) : 0;
  }
  const view = $('#appView');
  window.setApp = function (k) {
    if (k === appOn && view.dataset.app === k) return;
    appOn = k; view.dataset.app = k;
    const ap = APPS.find((a) => a.k === k);
    $$('.appview__shots img', view).forEach((im) => { const on = im.dataset.app === k; im.classList.toggle('is-on', on); if (on) im.loading = 'eager'; });
    $('#avTag').innerHTML = `<img src="assets/apps/icon-${k}-claro.png" alt="">${ap.tag}`;
    $('#avName').textContent = APP_NAMES[k]; $('#avDesc').textContent = ap.desc;
    $$('.apptab').forEach((t) => t.classList.toggle('is-hover', t.dataset.app === k));
    view.classList.remove('swap'); void view.offsetWidth; view.classList.add('swap');
    if (!anim) anim = requestAnimationFrame(tween);
  };
  view.dataset.app = appOn;
  $('#avOpen').addEventListener('click', () => { stopAuto(); openApp(appOn); });
  $$('.apptab').forEach((t) => t.addEventListener('pointerenter', () => { stopAuto(); setApp(t.dataset.app); }));
  // mientras nadie la toca, la rueda va mostrando una app por vez
  let auto = 0;
  const calmWheel = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function stopAuto() { clearInterval(auto); auto = -1; }
  if (!calmWheel && 'IntersectionObserver' in window) {
    new IntersectionObserver((es) => {
      if (auto === -1) return;
      clearInterval(auto); auto = 0;
      if (es[0].isIntersecting) auto = setInterval(() => {
        const i = APPS.findIndex((a) => a.k === appOn); setApp(APPS[(i + 1) % APPS.length].k);
      }, 4500);
    }, { threshold: 0.4 }).observe(wheel);
  }
}
$('#appDetailClose').addEventListener('click', closeApp);

function showStep(story, n) {
  $$('.step', story).forEach((s, i) => s.classList.toggle('is-on', i === n));
  $$('.device__view img', story).forEach((im, i) => { im.classList.toggle('is-on', i === n); if (Math.abs(i - n) <= 1) im.loading = 'eager'; });
  $$('.story__dots i', story).forEach((d, i) => d.classList.toggle('is-on', i === n));
}
// el paso activo es el que cruza la mitad de la pantalla
const stepIO = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) showStep(e.target.closest('.story'), +e.target.dataset.step);
}), { rootMargin: '-45% 0px -45% 0px' }) : null;
$$('.step').forEach((s) => {
  if (stepIO) stepIO.observe(s);
  s.addEventListener('click', () => showStep(s.closest('.story'), +s.dataset.step));
});

/* ---------- 2) Mapa interactivo (globo 3D en globe.js; países y trabajos en data.js) ---------- */
const SVCN = { mitigar: 'Mitigar', adaptar: 'Adaptar', medir: 'Medir', consultoria: 'Consultoría' };
let cur = 0;
const map = $('#map');
function showCountry(i, zoom = false) {
  cur = (i + COUNTRIES.length) % COUNTRIES.length;
  const [n, , , region, count] = COUNTRIES[cur];
  if (window.globeFocus) globeFocus(cur, zoom);
  const cs = CASES.filter((c) => c.country === n);
  $('#mcRegion').textContent = region; $('#mcName').textContent = n;
  $('#mcCountLabel').textContent = workLabel(count);
  $('#mcTags').innerHTML = [...new Set(cs.map((c) => c.svc))].map((t) => `<span class="tag tag--${t}">${SVCN[t]}</span>`).join('');
  $('#mcList').innerHTML = cs.map((c) => `<li class="mc-pub"><button type="button" class="mc-case" data-case="${c.id}"><span>Caso publicado</span><b>${c.client}</b> · ${c.title} →</button></li>`)
    .concat((WORK[n] || []).map(([y, who, what]) => `<li><span class="mc-yr">${y}</span><div><b>${who}</b>${what}</div></li>`)).join('');
  $('#mcCount').textContent = `${cur + 1} / ${COUNTRIES.length}`;
  countryArt(cur);
  const c = $('#mapCard'); c.classList.remove('swap'); void c.offsetWidth; c.classList.add('swap');
}
$('#mcPrev').addEventListener('click', () => showCountry(cur - 1, map.classList.contains('is-zoomed')));
$('#mcNext').addEventListener('click', () => showCountry(cur + 1, map.classList.contains('is-zoomed')));
showCountry(0);
$('#mcList').addEventListener('click', (e) => { const b = e.target.closest('[data-case]'); if (b) openCase(b.dataset.case); });

/* Ambientación del panel: silueta del país con relieve, coordenadas y curvas que cambian de orientación.
   La silueta sale del mismo mapa del globo (se dibuja cuando el globo terminó de cargar). */
var worldFeats = null; // var: se usa desde showCountry, que corre antes en el archivo
function countryArt(i) {
  const [n, lon, lat, , , en] = COUNTRIES[i];
  const card = $('#mapCard');
  card.style.setProperty('--rot', `${(i * 47) % 360 - 180}deg`);
  card.style.setProperty('--tx', `${(i * 29) % 100}%`); card.style.setProperty('--ty', `${(i * 61) % 100}%`);
  const ns = lat < 0 ? 'S' : 'N', ew = lon < 0 ? 'O' : 'E';
  $('#mcCoord').textContent = `${Math.abs(Math.round(lat))}°${ns} · ${Math.abs(Math.round(lon))}°${ew}`;
  const box = $('#mcSil');
  if (!window.d3 || !window.topojson || !window.WORLD) { box.innerHTML = ''; return; }
  if (!worldFeats) worldFeats = topojson.feature(WORLD, WORLD.objects.countries).features;
  const f = worldFeats.find((x) => x.properties.name === (en || n));
  if (!f) { box.innerHTML = ''; return; }
  // si el país tiene territorios lejanos (islas, ultramar), se queda con las partes cercanas a su centro
  let geom = f.geometry;
  if (geom.type === 'MultiPolygon') {
    const near = geom.coordinates.filter((poly) => d3.geoDistance(d3.geoCentroid({ type: 'Polygon', coordinates: poly }), [lon, lat]) < 0.35);
    const parts = near.length ? near : [geom.coordinates.reduce((a, b) => (d3.geoArea({ type: 'Polygon', coordinates: b }) > d3.geoArea({ type: 'Polygon', coordinates: a }) ? b : a))];
    geom = { type: 'MultiPolygon', coordinates: parts };
  }
  const proj = d3.geoMercator().fitExtent([[10, 10], [190, 230]], geom), d = d3.geoPath(proj)(geom);
  box.innerHTML = `<svg viewBox="0 0 200 240"><defs><clipPath id="silClip"><path d="${d}"/></clipPath></defs>
    <path class="sil__fill" d="${d}"/>
    <g class="sil__topo" clip-path="url(#silClip)"><image href="assets/deco/topografia.svg" x="${-260 - (i * 37) % 200}" y="${-120 - (i * 23) % 100}" width="760" height="333"/></g>
    <path class="sil__line" d="${d}" pathLength="1"/></svg><img class="mc-sil__leaf" src="assets/deco/hoja-chica-3.webp" alt="">`;
  box.classList.remove('draw'); void box.offsetWidth; box.classList.add('draw');
  placeSil();
}
// la silueta va en el espacio libre entre la lista y los botones; si no hay lugar, asoma desde la esquina
function placeSil() {
  const box = $('#mcSil'), card = $('#mapCard'), list = $('#mcList'), nav = $('.map-card__nav', card);
  if (!box || !list || !nav) return;
  const c = card.getBoundingClientRect(), lb = list.getBoundingClientRect().bottom, nt = nav.getBoundingClientRect().top;
  const free = nt - lb - 20;
  if (free >= 120) {
    box.classList.remove('is-corner');
    box.style.height = `${Math.min(free, 250)}px`;
    box.style.bottom = `${c.bottom - nt + 10}px`;
  } else {
    // sin lugar: asoma solo detrás de la fila de botones (nunca por encima de la lista)
    box.classList.add('is-corner');
    const H = 190, band = c.bottom - nt + 4;
    box.style.height = `${H}px`; box.style.bottom = `${band - H}px`;
  }
}
addEventListener('resize', () => placeSil());
document.addEventListener('globe:ready', () => countryArt(cur));

/* Hojas de los casos: a los costados del texto que está debajo del carrusel (nunca detrás de las tarjetas) */
function placeCasosDeco() {
  const anc = $('#casos') && $('#casos').previousElementSibling, info = $('#deckInfo');
  if (!anc || !anc.classList.contains('deco-anchor') || !info) return;
  anc.style.setProperty('--casos-y', `${Math.round(info.getBoundingClientRect().top - anc.getBoundingClientRect().top - 30)}px`);
}
addEventListener('load', placeCasosDeco); addEventListener('resize', placeCasosDeco);

/* ---------- Casos: carrusel 3D + filtros ---------- */
function mediaHTML(c, src, cls, logoCls) {
  const baked = src && bakedLogo(c, src);
  return `<div class="${cls}${baked ? ' is-baked' : ''}">${src ? `<img src="${src}" alt="" loading="lazy" onerror="this.parentNode.classList.remove('is-baked');this.remove()">` : ''}<span class="${logoCls}">${c.client}</span></div>`;
}
let deckList = CASES.slice(), deckI = 0, deckTimer = null;
const DECK_MS = 5500;
function deckCard(c, i) {
  return `<article class="dcard pcard--${c.svc}" data-i="${i}" data-case="${c.id}" aria-label="${c.client}: ${c.title}">
    ${mediaHTML(c, tallOf(c), 'dcard__media', 'dcard__logo')}
    <div class="dcard__body">
      <span class="dcard__top"><span class="tag tag--${c.svc}">${SVCN[c.svc]}</span><span>${c.country} · ${c.ind}</span></span>
      <h3>${c.title}</h3>
      <div class="dcard__kpi"><b>${c.kpi[0]}</b><small>${c.kpi[1]}</small></div>
    </div>
  </article>`;
}
function renderCases(f = 'all') {
  deckList = CASES.filter((c) => f === 'all' || c.svc === f);
  deckI = 0;
  $('#deckStage').innerHTML = deckList.map(deckCard).join('') +
    '<span class="float-chip float-chip--a" id="chipA"></span><span class="float-chip float-chip--b" id="chipB"></span>';
  layoutDeck();
  restartDeck();
}
function layoutDeck() {
  const n = deckList.length;
  $$('.dcard').forEach((el, i) => {
    let o = i - deckI;
    if (o > n / 2) o -= n; if (o < -n / 2) o += n;       // recorrido circular
    const a = Math.abs(o);
    el.style.setProperty('--o', o);
    el.style.setProperty('--a', a);
    el.style.zIndex = 20 - a;
    el.style.setProperty('--dd', `${(a * 0.16 + (o < 0 ? 0.08 : 0)).toFixed(2)}s`); // orden de caída: primero la del centro
    el.classList.toggle('is-active', o === 0);
    el.classList.toggle('is-hidden', a > 2);
    el.setAttribute('aria-hidden', o !== 0);
  });
  const c = deckList[deckI]; if (!c) return;
  $('#deckInfo').innerHTML = `<span class="eyebrow">${c.client.toUpperCase()}</span><p>${c.short}</p><a class="link" href="proyecto.html?p=${c.id}">Ver proyecto completo →</a>`;
  $('#deckInfo').classList.remove('swap'); void $('#deckInfo').offsetWidth; $('#deckInfo').classList.add('swap');
  $('#deckCount').textContent = `${String(deckI + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
  // chips flotantes alrededor de la tarjeta activa
  $('#chipA').innerHTML = `<i class="dot dot--mint"></i>${c.kpi[0]}`;
  $('#chipB').innerHTML = `📍 ${c.country}`;
  const bar = $('#deckBar'); bar.style.transition = 'none'; bar.style.width = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = `width ${DECK_MS}ms linear`; bar.style.width = '100%'; }));
}
const deckGo = (k) => { if (!deckList.length) return; deckI = (k + deckList.length) % deckList.length; layoutDeck(); restartDeck(); };
function restartDeck() {
  clearInterval(deckTimer);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  deckTimer = setInterval(() => { if (!document.hidden && !deckPaused) deckGo(deckI + 1); }, DECK_MS);
}
let deckPaused = false;
const deck = $('#deck');
deck.addEventListener('mouseenter', () => { deckPaused = true; const bar = $('#deckBar'); bar.style.width = getComputedStyle(bar).width; bar.style.transition = 'none'; });
deck.addEventListener('mouseleave', () => { deckPaused = false; restartDeck(); layoutDeck(); });
$('#deckPrev').addEventListener('click', () => deckGo(deckI - 1));
$('#deckNext').addEventListener('click', () => deckGo(deckI + 1));
$('#deckStage').addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') deckGo(deckI + 1); if (e.key === 'ArrowLeft') deckGo(deckI - 1); if (e.key === 'Enter') openCase(deckList[deckI].id); });
// tocar: la del medio abre la ficha; una de costado pasa al centro
$('#deckStage').addEventListener('click', (e) => {
  if (dragMoved) return;
  const card = e.target.closest('.dcard'); if (!card) return;
  e.stopPropagation();
  const i = +card.dataset.i;
  if (i === deckI) openCase(card.dataset.case); else deckGo(i);
}, true);
// arrastrar / deslizar
let dragX = null, dragMoved = false;
$('#deckStage').addEventListener('pointerdown', (e) => { dragX = e.clientX; dragMoved = false; });
window.addEventListener('pointermove', (e) => { if (dragX !== null && Math.abs(e.clientX - dragX) > 8) dragMoved = true; });
window.addEventListener('pointerup', (e) => {
  if (dragX === null) return;
  const dx = e.clientX - dragX; dragX = null;
  if (Math.abs(dx) > 50) deckGo(deckI + (dx < 0 ? 1 : -1));
  setTimeout(() => (dragMoved = false), 0);
});
$('#caseFilters').addEventListener('click', (e) => {
  const c = e.target.closest('.chip'); if (!c) return;
  $$('#caseFilters .chip').forEach((x) => x.classList.toggle('is-on', x === c));
  renderCases(c.dataset.f);
});
$('#deckInfo').addEventListener('click', (e) => { const b = e.target.closest('[data-case]'); if (b) openCase(b.dataset.case); });
const modal = $('#caseModal');
function openCase(id) {
  const c = CASES.find((x) => x.id === id); if (!c) return;
  $('#cmClient').textContent = `${c.client.toUpperCase()} · ${c.country.toUpperCase()}`;
  $('#cmTitle').textContent = c.title;
  $('#cmTags').innerHTML = `<span class="tag tag--${c.svc}">${SVCN[c.svc]}</span><span class="tag">${c.ind}</span>`;
  $('#cmKpi').innerHTML = `<b>${c.kpi[0]}</b><span>${c.kpi[1]}</span>`;
  $('#cmBody').innerHTML = c.body.map((p) => `<p>${p}</p>`).join('');
  $('#cmLink').href = 'proyecto.html?p=' + c.id;
  if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
}
$('#cmClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
renderCases();

/* ---------- Testimonios ---------- */
const quotes = $$('.quote'), qdots = $$('.dot-btn'); let qn = 0;
const showQuote = (k) => { qn = k; quotes.forEach((q, i) => q.classList.toggle('is-on', i === k)); qdots.forEach((d, i) => d.classList.toggle('is-on', i === k)); };
qdots.forEach((d) => d.addEventListener('click', () => showQuote(+d.dataset.q)));
setInterval(() => { if (!document.hidden) showQuote((qn + 1) % quotes.length); }, 8000);

/* ---------- Nuestro equipo: panal de hexágonos + ficha de cada persona ---------- */
(() => {
  const hive = $('#hive'), stage = $('#teamStage'), person = $('#person');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let group = 'all', sel = -1;
  const photo = (p) => `assets/equipo/${p.id}.jpg`, color = (p) => (p.noColor ? photo(p) : `assets/equipo/${p.id}-color.jpg`);

  $('#teamFilters').innerHTML = Object.entries(TEAM_GROUPS).map(([k, v], i) => `<button type="button" class="chip${i ? '' : ' is-on'}" data-g="${k}">${v}</button>`).join('');
  // orden de aparición al azar: cada persona entra en un momento distinto
  const order = TEAM.map((_, i) => i).sort(() => Math.random() - 0.5), when = [];
  order.forEach((i, k) => { when[i] = k * 0.11 + Math.random() * 0.06; });
  hive.innerHTML = TEAM.map((p, i) => `<button type="button" class="hex" data-i="${i}" style="--d:${when[i].toFixed(2)}s" aria-label="${p.name}, ${p.area}">
    <span class="hex__in"><img src="${photo(p)}" alt="" loading="lazy"><img class="hex__color" src="${color(p)}" alt="" loading="lazy" onerror="this.remove()"><span class="hex__glow"></span>
    <span class="hex__name">${p.name}</span></span></button>`).join('');
  const hexes = $$('.hex', hive);

  // Ubica los hexágonos como un panal: filas alternadas, cada una corrida media celda
  function layout() {
    const W = hive.clientWidth, small = W < 560;
    const w = small ? Math.min(118, (W - 16) / 3) : W < 900 ? 150 : 168, gap = small ? 6 : 10;
    const h = w * 1.1547, cols = Math.max(2, Math.floor((W + gap) / (w + gap)));
    let row = 0, col = 0;
    hexes.forEach((el) => {
      const n = row % 2 ? cols - 1 : cols;
      if (col >= n) { row++; col = 0; }
      const shift = row % 2 ? (w + gap) / 2 : 0;
      const x0 = (W - (cols * (w + gap) - gap)) / 2;
      el.style.width = `${w}px`; el.style.height = `${h}px`;
      el.style.left = `${x0 + shift + col * (w + gap)}px`; el.style.top = `${row * (h * 0.75 + gap * 0.87)}px`;
      col++;
    });
    hive.style.height = `${(row + 1) * (h * 0.75 + gap * 0.87) + h * 0.25}px`;
  }
  addEventListener('resize', layout); layout();
  if ('IntersectionObserver' in window && !calm) {
    const seen = new IntersectionObserver((es) => { if (es[0].isIntersecting) { hive.classList.add('is-visible'); seen.disconnect(); } }, { threshold: 0.25 });
    seen.observe(hive);
  } else hive.classList.add('is-visible');

  // Filtros: iluminan el grupo elegido y apagan el resto
  function applyFilter() { hexes.forEach((el) => el.classList.toggle('is-dim', group !== 'all' && TEAM[+el.dataset.i].group !== group)); }
  $('#teamFilters').addEventListener('click', (e) => {
    const c = e.target.closest('.chip'); if (!c) return;
    $$('#teamFilters .chip').forEach((x) => x.classList.toggle('is-on', x === c)); group = c.dataset.g; applyFilter();
  });
  const visible = () => TEAM.map((p, i) => i).filter((i) => group === 'all' || TEAM[i].group === group);

  // Entrar en una persona: el hexágono crece hasta la ficha (animación FLIP)
  function open(i, from) {
    sel = i; const p = TEAM[i], list = visible(), k = list.indexOf(i);
    const a = from && from.getBoundingClientRect();
    person.innerHTML = `
      <button type="button" class="person__back" data-back>← Volver al equipo</button>
      <div class="person__grid">
        ${p.linkedin ? `<a class="person__hex person__hex--link" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn de ${p.name}" title="Ver LinkedIn">` : '<div class="person__hex">'}<span class="hex__in"><img src="${photo(p)}" alt="${p.name}"><img class="hex__color is-on" src="${color(p)}" alt="" onerror="this.remove()"></span>${p.linkedin ? '<span class="person__in-badge" aria-hidden="true">in</span></a>' : '</div>'}
        <div class="person__info">
          <span class="eyebrow">${p.area}</span>
          <h3>${p.name}</h3>
          <p class="person__title">${p.title}</p>
          <div class="person__skills">${p.skills.map((s, n) => `<span style="--k:${n}">${s}</span>`).join('')}</div>
          <div class="person__nav">
            <button type="button" class="round" data-step="-1" aria-label="Persona anterior">←</button>
            <span>${String(k + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}</span>
            <button type="button" class="round round--mint" data-step="1" aria-label="Persona siguiente">→</button>
            <a class="btn btn--ghost-light btn--sm person__in" href="${p.linkedin || 'https://www.linkedin.com/company/coraliae/'}" target="_blank" rel="noopener">LinkedIn ↗</a>
          </div>
        </div>
      </div>`;
    stage.classList.add('is-person');
    const big = $('.person__hex', person);
    if (a && !calm) {
      const z = big.getBoundingClientRect();
      big.style.transition = 'none';
      big.style.transform = `translate(${a.left - z.left}px,${a.top - z.top}px) scale(${a.width / z.width})`;
      requestAnimationFrame(() => requestAnimationFrame(() => { big.style.transition = ''; big.style.transform = ''; }));
    }
    const top = stage.getBoundingClientRect().top;
    if (top < 60 || top > innerHeight * 0.4) stage.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    $('[data-back]', person).focus({ preventScroll: true });
  }
  function close() {
    stage.classList.remove('is-person');
    const el = hexes[sel]; if (el) el.focus({ preventScroll: true });
    sel = -1;
  }
  hive.addEventListener('click', (e) => { const h = e.target.closest('.hex'); if (h) open(+h.dataset.i, h); });
  person.addEventListener('click', (e) => {
    if (e.target.closest('[data-back]')) return close();
    const b = e.target.closest('[data-step]'); if (!b) return;
    const list = visible(), k = list.indexOf(sel);
    open(list[(k + +b.dataset.step + list.length) % list.length]);
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && stage.classList.contains('is-person')) close(); });
})();
