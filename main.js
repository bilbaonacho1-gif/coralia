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
/* ---------- Mariposas de fondo ----------
   En cada .deco-scatter se reparten mariposas sueltas (assets/deco/m-1…m-10) cerca de los bordes de la
   sección, siempre enteras (nunca quedan cortadas por el borde) y sin pisarse entre sí. Se arman
   recién cuando la sección está cerca y se rearman si cambia el ancho. data-n: cuántas (en compu). */
const scatterIO = 'IntersectionObserver' in window ? new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { scatter(e.target); scatterIO.unobserve(e.target); } });
}, { rootMargin: '600px 0px' }) : null;
function scatter(box) {
  const W = box.clientWidth, H = box.clientHeight; if (!W || !H) return;
  box.dataset.w = W; box.dataset.h = H; box.textContent = '';
  let seed = [...(box.parentElement.id || 'x')].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const sm = W < 700, n = Math.round((+box.dataset.n || 10) * (sm ? 0.5 : 1)), pad = 10, put = [];
  // lo que hay en la sección (textos, tarjetas, imágenes): las mariposas van solo en el espacio libre,
  // así ninguna queda tapada a medias por una tarjeta
  const o = box.getBoundingClientRect(), busy = [];
  const add = (r) => { if (r.width && r.height) busy.push([r.left - o.left - 14, r.top - o.top - 14, r.right - o.left + 14, r.bottom - o.top + 14]); };
  const solid = (el, cs) => /^(IMG|SVG|svg|CANVAS|BUTTON|INPUT|VIDEO|IFRAME)$/.test(el.tagName) || cs.backgroundImage !== 'none'
    || !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor) || parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) > 0;
  (function walk(el) {
    for (const c of el.children) {
      if (c === box || c.classList.contains('deco') || c.classList.contains('deco-anchor')) continue;
      const cs = getComputedStyle(c); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (solid(c, cs)) { add(c.getBoundingClientRect()); continue; }
      for (const t of c.childNodes) if (t.nodeType === 3 && t.data.trim()) { const rg = document.createRange(); rg.selectNodeContents(t); [...rg.getClientRects()].forEach(add); }
      walk(c);
    }
  })(box.parentElement);
  for (let k = 0, tries = 0; k < n && tries < 1500; tries++) {
    const s = sm ? 30 + rnd() * 40 : 44 + rnd() * 90;
    const m = pad + s * 0.22; // margen para el giro y el vaivén: así nunca tocan el borde
    const x = m + rnd() * (W - s - 2 * m), y = m + rnd() * (H - s - 2 * m);
    if (busy.some(([l, t, r, b2]) => x - s * 0.2 < r && x + s * 1.2 > l && y - s * 0.2 < b2 && y + s * 1.2 > t)) continue;
    if (put.some((q) => Math.hypot(q.x + q.s / 2 - x - s / 2, q.y + q.s / 2 - y - s / 2) < (q.s + s) * 0.62)) continue;
    put.push({ x, y, s }); k++;
  }
  put.forEach((q, i) => {
    const im = new Image(); im.alt = ''; im.className = 'bfly'; im.decoding = 'async';
    im.src = `assets/deco/m-${1 + Math.floor(rnd() * 10)}.webp`;
    im.style.cssText = `left:${q.x.toFixed(0)}px;top:${q.y.toFixed(0)}px;width:${q.s.toFixed(0)}px;rotate:${(rnd() * 70 - 35).toFixed(0)}deg;`
      + `opacity:${(0.35 + rnd() * 0.45).toFixed(2)};animation-delay:${(-rnd() * 16).toFixed(1)}s;animation-duration:${(13 + rnd() * 9).toFixed(1)}s`;
    if (rnd() < 0.5) im.style.scale = '-1 1';
    box.appendChild(im);
  });
}
$$('.deco-scatter').forEach((box) => scatterIO ? scatterIO.observe(box) : scatter(box));
// aletean solo mientras se ven
const flyIO = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-on', e.isIntersecting))) : null;
$$('.deco-scatter').forEach((box) => flyIO ? flyIO.observe(box) : box.classList.add('is-on'));
// si la sección cambia de tamaño (otro ancho de pantalla, se abre una ficha) se vuelven a repartir
if ('ResizeObserver' in window) {
  const ro = new ResizeObserver((es) => es.forEach((e) => {
    const b = e.target; if (!b.dataset.w) return;
    clearTimeout(b._t); b._t = setTimeout(() => {
      if (Math.abs(+b.dataset.w - b.clientWidth) > 20 || Math.abs(+b.dataset.h - b.clientHeight) > 40) scatter(b);
    }, 250);
  }));
  $$('.deco-scatter').forEach((b) => ro.observe(b));
}

/* ---------- Servicios (Home): uno en grande y los otros al costado ----------
   Al tocar una tarjeta de la derecha pasa a ser la grande. Mientras nadie la toca, va pasando sola. */
const svx = $('#svx');
if (svx) {
  let svOn = 'medir', svAuto = 0;
  const svSet = (k) => {
    svOn = k;
    $$('.svx__slide', svx).forEach((sl) => {
      const on = sl.dataset.svc === k; sl.classList.toggle('is-on', on);
      sl.setAttribute('aria-hidden', !on); $('a', sl).tabIndex = on ? 0 : -1;
    });
    $$('.svx__card', svx).forEach((c) => { const on = c.dataset.svc === k; c.classList.toggle('is-on', on); c.tabIndex = on ? -1 : 0; });
  };
  const svStop = () => { clearInterval(svAuto); svAuto = -1; };
  $$('.svx__card', svx).forEach((c) => c.addEventListener('click', () => { svStop(); svSet(c.dataset.svc); }));
  svx.addEventListener('focusin', svStop);
  const svKeys = $$('.svx__slide', svx).map((sl) => sl.dataset.svc);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    new IntersectionObserver((es) => {
      if (svAuto === -1) return;
      clearInterval(svAuto); svAuto = 0;
      if (es[0].isIntersecting) svAuto = setInterval(() => svSet(svKeys[(svKeys.indexOf(svOn) + 1) % svKeys.length]), 6000);
    }, { threshold: 0.5 }).observe(svx);
  }
  svSet('medir');
}

/* ---------- 1) Nuestros servicios (consultoría primero; cada uno con su app) ---------- */
const APP_NAMES = { footprint: 'Carbon Footprint', markets: 'Carbon Markets Hub', risk: 'Climate Risk App' };
const SVC_NAMES = { footprint: 'Huella de carbono', markets: 'Mercados de carbono', risk: 'Riesgo climático' };
// traduce un texto armado desde acá (si se eligió otro idioma)
const tr = (s) => (window.I18N && I18N.t ? I18N.t(s) : s);
// nombre del servicio en dos líneas para la rueda (en otros idiomas se parte la traducción por la mitad)
function twoLines(ap) {
  return ap.lines; // nombres de las apps (marcas): iguales en todos los idiomas
  if (!window.I18N || I18N.lang === 'es') return ap.lines;
  const w = tr(SVC_NAMES[ap.k]).split(' '), h = Math.ceil(w.length / 2);
  return w.length > 1 ? [w.slice(0, h).join(' '), w.slice(h).join(' ')] : [w[0], ''];
}
const detail = $('#app-detail');
function openApp(k) {
  const card = $(`.appcard[data-app="${k}"]`), already = card.classList.contains('is-on') && !detail.hidden;
  if (already) return closeApp();
  if (window.setApp) setApp(k);
  $$('.appcard').forEach((c) => { const on = c === card; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on); });
  $$(':scope > [data-story]', detail).forEach((st) => { st.hidden = st.dataset.story !== k; });
  // Mercados muestra qué hacemos; Huella y Riesgo, el recorrido de su app
  $('#appDetailTitle').textContent = `${APP_NAMES[k]} · ${tr(SVC_NAMES[k])}`;
  detail.hidden = false;
  const st = $(`.story[data-story="${k}"]`); if (st) showStep(st, 0);
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
  // svc: página del servicio al que pertenece la app (servicio.html?s=...)
  { k: 'footprint', a0: -60, a1: 60, lines: ['Carbon', 'Footprint'], bg: 'fondo-footprint', tag: 'Huella de carbono', svc: 'medir', svcName: 'Medir', dot: 'medir', desc: 'Huella de productos, empresas y eventos, de la fórmula al reporte verificable.' },
  { k: 'markets', a0: 60, a1: 180, lines: ['Carbon', 'Markets'], bg: 'fondo-markets', tag: 'Mercados de carbono', svc: 'mitigar', svcName: 'Mitigar', dot: 'mitigar', desc: 'Tu tierra diagnosticada en cinco minutos: qué proyecto de carbono es posible y cuánto vale.' },
  { k: 'risk', a0: 180, a1: 300, lines: ['Climate', 'Risk App'], bg: 'fondo-risk', tag: 'Riesgo climático', svc: 'adaptar', svcName: 'Adaptarse', dot: 'adaptar', desc: 'Riesgo climático físico y de transición, activo por activo, con planes de adaptación.' },
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
    const g = el('g', { class: 'wseg', tabindex: 0, role: 'button', 'aria-label': `${APP_NAMES[ap.k]}: ${ap.desc}`, 'data-app': ap.k }, spin);
    // imagen que cubre la porción en su tamaño máximo
    const pts = []; for (let a = ap.a0; a <= ap.a1; a += 5) pts.push(P(RON, a), P(R0, a));
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const x = Math.min(...xs), y = Math.min(...ys), w = Math.max(...xs) - x, h = Math.max(...ys) - y;
    // fondo: la foto de la app si la tiene; si no, su pantalla en blanco y negro
    if (ap.bg) g.classList.add('wseg--foto');
    el('image', { href: `assets/apps/${ap.bg || 'card-' + ap.k}.webp`, x, y, width: w, height: h, preserveAspectRatio: `${ap.pos || 'xMidYMid'} slice`, 'clip-path': `url(#wclip-${ap.k})`, ...(ap.bg ? {} : { filter: 'url(#wgray)' }) }, g);
    const shade = el('path', { class: 'wseg__shade' }, g);
    const edge = el('path', { class: 'wseg__edge' }, g);
    // ícono de la app y el nombre en dos líneas (la segunda, en el color de la app)
    const ico = el('image', { class: 'wseg__ico', href: `assets/apps/icon-${ap.k}-claro.png` }, g);
    const t1 = el('text', { class: 'wseg__name' }, g), t2 = el('text', { class: 'wseg__sub' }, g);
    const L = twoLines(ap); t1.textContent = L[0].toUpperCase(); t2.textContent = L[1].toUpperCase();
    const s = { ap, cp, shade, edge, ico, t1, t2, g, r: ap.k === appOn ? RON : R1 };
    g.addEventListener('pointerenter', () => { stopAuto(); setApp(ap.k); });
    g.addEventListener('focus', () => { stopAuto(); setApp(ap.k); });
    g.addEventListener('click', () => { stopAuto(); setApp(ap.k); openApp(ap.k); });
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openApp(ap.k); } });
    return s;
  });
  // centro: logo de Coralia y acceso a los simuladores
  const core = el('a', { class: 'wcore', href: 'simuladores.html', 'aria-label': 'Probá las apps de Coralia' });
  el('circle', { class: 'wcore__pulse', r: CORE }, core);
  el('circle', { class: 'wcore__bg', r: CORE }, core);
  el('image', { href: 'assets/logo.png', x: -62, y: -58, width: 124, height: 70.6 }, core);
  const cta = el('text', { class: 'wcore__cta', x: 0, y: 40 }, core); cta.textContent = 'Probá las apps →';
  el('circle', { class: 'wheel__core', r: CORE }, core);
  // "Probá las apps →" se achica si en otro idioma no entra en el círculo
  const fitCta = () => {
    cta.style.fontSize = ''; const w = cta.getBBox().width, max = 2 * Math.sqrt(CORE * CORE - 44 * 44) - 18;
    if (w > max) cta.style.fontSize = (parseFloat(getComputedStyle(cta).fontSize) * max / w).toFixed(1) + 'px';
  };
  addEventListener('load', fitCta); addEventListener('resize', fitCta);
  if (document.fonts) document.fonts.ready.then(fitCta);

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
    const sv = $('#avApp'); sv.href = `servicio.html?s=${ap.svc}`; sv.innerHTML = `Servicio: <b>${ap.svcName}</b> →`;
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

/* Mercados de carbono: antes y después de cada tipo de proyecto + paneles para clientes e inversores.
   TODO: fotos reales (las pasa Coralia). Mientras tanto se ven fondos de color con el texto de la foto que falta.
   Para sumar las fotos: guardarlas como assets/servicios/<k>-antes.webp y <k>-despues.webp y poner foto: true. */
const BA_TYPES = [
  { k: 'blue-carbon', foto: false, name: 'Blue Carbon', antes: 'Antes · manglar degradado', despues: 'Después · manglar restaurado' },
  { k: 'arr', foto: false, name: 'ARR', antes: 'Antes · bosque quemado', despues: 'Después · bosque restaurado' },
  { k: 'redd', foto: false, name: 'REDD+', antes: 'Sin proyecto · bosque amenazado', despues: 'Con proyecto · bosque conservado' },
];
(() => {
  const ba = $('#ba'); if (!ba) return;
  const range = $('#baRange'), tabs = $('#baTabs');
  let cur = 0, timer = 0, userTouched = false;
  tabs.innerHTML = BA_TYPES.map((t, i) => `<button type="button" role="tab" class="ba__tab" data-i="${i}" aria-selected="false">${t.name}</button>`).join('');
  const set = (x) => { ba.style.setProperty('--x', `${x}%`); range.value = x; };
  function show(i) {
    cur = (i + BA_TYPES.length) % BA_TYPES.length; const t = BA_TYPES[cur];
    ['antes', 'despues'].forEach((w) => {
      const L = $(`.ba__layer--${w}`, ba), src = `assets/servicios/${t.k}-${w}.webp`;
      L.dataset.ph = tr('foto a cargar'); L.classList.remove('has-img'); L.style.backgroundImage = '';
      if (!t.foto) return;
      const im = new Image(); im.onload = () => { L.style.backgroundImage = `url(${src})`; L.classList.add('has-img'); }; im.src = src;
    });
    $('#baAntes').textContent = t.antes; $('#baDespues').textContent = t.despues;
    $$('.ba__tab', tabs).forEach((b, k) => { b.classList.toggle('is-on', k === cur); b.setAttribute('aria-selected', k === cur); });
  }
  // pasa solo: barre de "antes" a "después" y sigue con el próximo tipo, hasta que alguien lo toca
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cycle() {
    if (userTouched || calm) return;
    let t0 = null;
    const sweep = (now) => {
      if (userTouched) return; t0 = t0 || now;
      const p = Math.min(1, (now - t0) / 2600); set(85 - 70 * (0.5 - Math.cos(p * Math.PI) / 2));
      if (p < 1) requestAnimationFrame(sweep); else timer = setTimeout(() => { show(cur + 1); set(85); timer = setTimeout(cycle, 900); }, 2200);
    };
    requestAnimationFrame(sweep);
  }
  const stop = () => { userTouched = true; clearTimeout(timer); };
  range.addEventListener('input', () => { stop(); set(+range.value); });
  tabs.addEventListener('click', (e) => { const b = e.target.closest('.ba__tab'); if (!b) return; stop(); show(+b.dataset.i); set(50); });
  show(0); set(calm ? 50 : 85);
  if ('IntersectionObserver' in window) {
    let started = false;
    new IntersectionObserver((es) => { if (es[0].isIntersecting && !started) { started = true; cycle(); } }, { threshold: 0.5 }).observe(ba);
  }
  // Para clientes / Para inversores: abre su panel debajo (el otro se cierra)
  $$('.svc__btn').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.panel, panel = $(k === 'clientes' ? '#svcClientes' : '#svcInversores'), open = panel.hidden;
    $$('.svc__panel').forEach((p) => { p.hidden = true; });
    $$('.svc__btn').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    if (open) {
      panel.hidden = false; b.setAttribute('aria-pressed', 'true');
      const st = $('.story', panel); if (st) showStep(st, 0);
      requestAnimationFrame(() => panel.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' }));
    }
  }));
  // pipeline de proyectos propios (tarjetitas que llevan a su ficha)
  const grid = $('#pipeGrid');
  if (grid && typeof PIPELINE !== 'undefined') grid.innerHTML = PIPELINE.map((p) => `<a class="pipe__card" href="pipeline.html?p=${p.id}">
    <span class="pipe__media">${p.img ? `<img src="${p.img}" alt="" loading="lazy">` : ''}<span class="pipe__type">${p.type}</span></span>
    <span class="pipe__body"><b>${p.name}</b><small>${p.place}</small><span class="pipe__stage">${p.stage}</span></span>
    <span class="pipe__go" aria-hidden="true">↗</span></a>`).join('');
})();

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
const SVCN = { mitigar: 'Mitigar', adaptar: 'Adaptarse', medir: 'Medir', consultoria: 'Consultoría' };
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
