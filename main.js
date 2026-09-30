// Coralia — versión interactiva
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = (n, d = 0) => n.toLocaleString('es-AR', { maximumFractionDigits: d, minimumFractionDigits: d });

/* ---------- Aparición al scrollear + contadores ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); onVisible(e.target); io.unobserve(e.target); } });
}, { threshold: 0.15 }) : null;
$$('.reveal, .map, .stats').forEach((el) => io ? io.observe(el) : el.classList.add('is-visible'));
function onVisible(el) {
  if (el.classList.contains('stats') || el.querySelector?.('[data-count]')) {
    $$('[data-count]', el).forEach((b) => {
      const to = +b.dataset.count, suf = b.dataset.suffix || '+'; const t0 = performance.now();
      const step = (t) => { const p = Math.min(1, (t - t0) / 1400); b.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
}

/* ---------- 1) Tres herramientas: tarjetas + laboratorio ---------- */
const tools = $$('.tool');
tools.forEach((t) => t.addEventListener('click', () => {
  tools.forEach((x) => { x.classList.toggle('is-active', x === t); x.setAttribute('aria-selected', x === t); });
  $$('.lab__pane').forEach((p) => { const on = p.dataset.pane === t.dataset.tool; p.hidden = !on; p.classList.toggle('is-active', on); });
  if (window.innerWidth < 1000) $('#lab').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

// chips (grupos de opción única)
$$('.chips').forEach((g) => g.addEventListener('click', (e) => {
  const c = e.target.closest('.chip'); if (!c) return;
  $$('.chip', g).forEach((x) => { x.classList.toggle('is-on', x === c); if (x.hasAttribute('role')) x.setAttribute('aria-checked', x === c); });
  g.dispatchEvent(new Event('change', { bubbles: true }));
}));
const chipVal = (group) => $(`[data-group="${group}"] .chip.is-on`).dataset.v;
const val = (k) => +$(`[data-in="${k}"]`).value;

// Footprint — factores genéricos ilustrativos
const F = { elec: 0.35, gas: 1.95, fleet: 0.00025, flights: 0.09, buy: 0.30 };
function calcFootprint() {
  const e = val('elec'), g = val('gas'), f = val('fleet'), fl = val('flights'), b = val('buy');
  $('[data-out="elec"]').textContent = fmt(e) + ' MWh';
  $('[data-out="gas"]').textContent = fmt(g) + ' mil m³';
  $('[data-out="fleet"]').textContent = fmt(f) + ' km';
  $('[data-out="flights"]').textContent = fmt(fl) + ' h';
  $('[data-out="buy"]').textContent = 'USD ' + fmt(b) + ' mil';
  const src = { 'la electricidad': e * F.elec, 'el gas natural': g * F.gas, 'la flota': f * F.fleet, 'los vuelos': fl * F.flights, 'las compras': b * F.buy };
  const s1 = src['el gas natural'] + src['la flota'], s2 = src['la electricidad'], s3 = src['los vuelos'] + src['las compras'];
  const tot = s1 + s2 + s3;
  $('#fpTotal').textContent = fmt(tot);
  const rows = $$('#fpScopes .scope');
  [s1, s2, s3].forEach((v, i) => { rows[i].querySelector('i').style.setProperty('--w', (tot ? v / tot * 100 : 0) + '%'); rows[i].querySelector('b').textContent = fmt(v); });
  const top = Object.entries(src).sort((a, b) => b[1] - a[1])[0];
  $('#fpInsight').textContent = tot ? `La mayor fuente es ${top[0]}: ${Math.round(top[1] / tot * 100)}% del total. Ahí suele estar la primera palanca de reducción.` : 'Mové los controles para ver tu huella.';
}
$$('[data-pane="footprint"] input').forEach((i) => i.addEventListener('input', calcFootprint));
calcFootprint();

// Markets — rangos ilustrativos por tipo de proyecto (tCO2e/ha/año)
const M = {
  redd: { t: 'REDD+', m: 'Deforestación evitada en bosque nativo. Metodología de referencia: VM0048 (Verra).', r: [1, 6] },
  arr: { t: 'ARR', m: 'Forestación, reforestación y revegetación. Metodología de referencia: VM0047 (Verra).', r: [4, 12] },
  alm: { t: 'ALM', m: 'Manejo agrícola y ganadero mejorado, con carbono en suelo. Metodología de referencia: VM0042 (Verra).', r: [0.3, 1.5] },
  blue: { t: 'Carbono azul', m: 'Conservación y restauración de humedales y manglares.', r: [2, 8] },
};
function calcMarkets() {
  const ha = val('ha'), k = M[chipVal('land')];
  $('[data-out="ha"]').textContent = fmt(ha) + ' ha';
  $('#mkType').textContent = k.t; $('#mkMethod').textContent = k.m;
  $('#mkRange').textContent = `${fmt(ha * k.r[0])} – ${fmt(ha * k.r[1])}`;
  $('#mkRev').textContent = `${fmt(ha * k.r[0] * 5.7)} – ${fmt(ha * k.r[1] * 20)}`;
  $('#mkChecks').innerHTML = ['Elegibilidad por metodología', 'Benchmark de desempeño', 'Pre-screening de biodiversidad y AVC', 'Análisis financiero y costo de oportunidad'].map((c) => `<span>${c}</span>`).join('');
}
$('[data-pane="markets"]').addEventListener('input', calcMarkets);
$('[data-pane="markets"]').addEventListener('change', calcMarkets);
calcMarkets();

// Risk — ejemplo ilustrativo
const RB = { drought: 46, heat: 52, flood: 40, fire: 36, wind: 28 };
const RT = {
  drought: 'Diversificar fuentes de agua y planificar reservas para los meses críticos.',
  heat: 'Revisar la refrigeración de equipos y las condiciones de trabajo en verano.',
  flood: 'Relevar cotas, drenajes y accesos de las instalaciones expuestas.',
  fire: 'Mantener cortafuegos y un plan de respuesta coordinado con la zona.',
  wind: 'Revisar estructuras, techos y líneas aéreas frente a ráfagas extremas.',
};
function calcRisk() {
  const h = chipVal('hazard'), s = chipVal('ssp'), y = chipVal('year');
  let v = RB[h] + (s === '585' ? 12 : 0) + ({ 2030: -8, 2050: 0, 2080: 14 })[y] + (s === '585' && y === '2080' ? 8 : 0);
  v = Math.max(5, Math.min(97, v));
  const lvl = v < 35 ? 'Bajo' : v < 60 ? 'Medio' : v < 80 ? 'Alto' : 'Muy alto';
  $('#rkArc').setAttribute('stroke-dasharray', `${v} 100`);
  $('#rkLevel').textContent = lvl; $('#rkScore').textContent = `${v}/100`;
  $('#rkInsight').textContent = `Medida de adaptación posible: ${RT[h]}`;
}
$('[data-pane="risk"]').addEventListener('change', calcRisk);
calcRisk();

/* ---------- 2) Mapa interactivo (globo 3D en globe.js) ---------- */
// [nombre, longitud, latitud, región, servicios, nombre en el mapa]. TODO: completar los proyectos de cada país.
const T = (n) => `[Completar proyectos en ${n}]`;
const COUNTRIES = [
  ['Argentina', -64, -35, 'América del Sur', ['mitigar', 'adaptar', 'medir']],
  ['Paraguay', -58, -23.4, 'América del Sur', ['mitigar']],
  ['Perú', -75, -9.5, 'América del Sur', ['medir', 'consultoria'], 'Peru'],
  ['Brasil', -51, -10, 'América del Sur', [], 'Brazil'], ['Uruguay', -56, -32.8, 'América del Sur'], ['Chile', -71, -32, 'América del Sur'],
  ['Colombia', -73.5, 4, 'América del Sur'], ['Ecuador', -78.5, -1.5, 'América del Sur'],
  ['Panamá', -80, 8.5, 'Centroamérica y Caribe', [], 'Panama'], ['Costa Rica', -84, 9.9, 'Centroamérica y Caribe'], ['República Dominicana', -70.3, 18.8, 'Centroamérica y Caribe', [], 'Dominican Rep.'],
  ['México', -102, 23.5, 'América del Norte', [], 'Mexico'], ['Estados Unidos', -98, 39, 'América del Norte', [], 'United States of America'],
  ['España', -3.7, 40.2, 'Europa', [], 'Spain'], ['Francia', 2.3, 46.6, 'Europa', [], 'France'], ['Bélgica', 4.6, 50.6, 'Europa', [], 'Belgium'], ['Italia', 12.5, 42.8, 'Europa', [], 'Italy'], ['Noruega', 9, 61, 'Europa', [], 'Norway'], ['Suecia', 16, 62.5, 'Europa', [], 'Sweden'],
  ['Arabia Saudita', 45, 24, 'Medio Oriente', [], 'Saudi Arabia'], ['India', 79, 22, 'Asia'], ['Corea del Sur', 127.8, 36.4, 'Asia', [], 'South Korea'], ['Sudáfrica', 24, -29, 'África', [], 'South Africa'],
];
const TAGN = { mitigar: 'Mitigar', adaptar: 'Adaptar', medir: 'Medir', consultoria: 'Consultoría' };

const SVCN = TAGN;
let cur = 0;
const map = $('#map');
function showCountry(i, zoom = false) {
  cur = (i + COUNTRIES.length) % COUNTRIES.length;
  const [n, , , region, tags = []] = COUNTRIES[cur];
  if (window.globeFocus) globeFocus(cur, zoom);
  $('#mcRegion').textContent = region.toUpperCase(); $('#mcName').textContent = n;
  $('#mcTags').innerHTML = tags.map((t) => `<span class="tag tag--${t}">${TAGN[t]}</span>`).join('');
  const cs = CASES.filter((c) => c.country === n);
  const list = cs.map((c) => `<li><button type="button" class="mc-case" data-case="${c.id}"><b>${c.client}</b> · ${c.title} →</button></li>`)
    .concat((EXTRA[n] || []).map((t) => `<li>${t}</li>`));
  $('#mcList').innerHTML = list.length ? list.join('') : `<li class="todo">${T(n)}</li>`;
  $('#mcCount').textContent = `${cur + 1} / ${COUNTRIES.length}`;
  const c = $('#mapCard'); c.classList.remove('swap'); void c.offsetWidth; c.classList.add('swap');
}
$('#mcPrev').addEventListener('click', () => showCountry(cur - 1, map.classList.contains('is-zoomed')));
$('#mcNext').addEventListener('click', () => showCountry(cur + 1, map.classList.contains('is-zoomed')));
showCountry(0);
$('#mcList').addEventListener('click', (e) => { const b = e.target.closest('[data-case]'); if (b) openCase(b.dataset.case); });

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

/* ---------- 3) Simuladores ---------- */
$$('.tab').forEach((t) => t.addEventListener('click', () => {
  $$('.tab').forEach((x) => { x.classList.toggle('is-active', x === t); x.setAttribute('aria-selected', x === t); });
  $$('[data-simpane]').forEach((p) => { p.hidden = p.dataset.simpane !== t.dataset.sim; p.classList.add('is-visible'); });
}));

// Trayectoria de reducción
const BASE_YEAR = 2026, REF_RATE = 0.042;
function calcPath() {
  const base = val('pBase'), year = val('pYear'), pct = val('pPct') / 100;
  $('[data-out="pBase"]').textContent = fmt(base) + ' tCO₂e';
  $('[data-out="pYear"]').textContent = year;
  $('[data-out="pPct"]').textContent = Math.round(pct * 100) + ' %';
  const n = year - BASE_YEAR, end = base * (1 - pct), yearly = (base - end) / n, rate = pct / n;
  $('#pYearly').textContent = fmt(yearly); $('#pEnd').textContent = fmt(end); $('#pRate').textContent = fmt(rate * 100, 1) + ' %';
  const refEnd = Math.max(0, base * (1 - REF_RATE * n));
  $('#pInsight').textContent = rate >= REF_RATE
    ? `Tu meta reduce ${fmt(rate * 100, 1)} % por año: igual o más rápido que el ritmo de referencia 1,5 °C (${fmt(REF_RATE * 100, 1)} %).`
    : `Tu meta reduce ${fmt(rate * 100, 1)} % por año, por debajo del ritmo de referencia 1,5 °C. Para alinearla, en ${year} deberías llegar a ${fmt(refEnd)} tCO₂e.`;
  // gráfico
  const W = 520, H = 240, L = 46, R = 22, T = 14, B = 30, maxY = base * 1.05;
  const X = (y) => L + (y - BASE_YEAR) / (2050 - BASE_YEAR) * (W - L - R);
  const Y = (v) => T + (1 - v / maxY) * (H - T - B);
  const grid = [0, .25, .5, .75, 1].map((f) => `<line x1="${L}" x2="${W - R}" y1="${Y(maxY * f)}" y2="${Y(maxY * f)}" class="g"/><text x="${L - 6}" y="${Y(maxY * f) + 4}" class="ax" text-anchor="end">${fmt(maxY * f / 1000)}k</text>`).join('');
  const years = [2026, 2030, 2035, 2040, 2045, 2050].map((y) => `<text x="${X(y)}" y="${H - 8}" class="ax" text-anchor="middle">${y}</text>`).join('');
  const refY = Math.min(2050, BASE_YEAR + 1 / REF_RATE);
  const ref = `<polyline class="ref" points="${X(BASE_YEAR)},${Y(base)} ${X(refY)},${Y(Math.max(0, base * (1 - REF_RATE * (refY - BASE_YEAR))))}"/>`;
  const area = `<polygon class="area" points="${X(BASE_YEAR)},${Y(0)} ${X(BASE_YEAR)},${Y(base)} ${X(year)},${Y(end)} ${X(year)},${Y(0)}"/>`;
  const path = `<polyline class="plan" points="${X(BASE_YEAR)},${Y(base)} ${X(year)},${Y(end)}"/><circle cx="${X(year)}" cy="${Y(end)}" r="5" class="pt"/>`;
  const leg = `<g class="leg"><line x1="${W - 190}" x2="${W - 170}" y1="16" y2="16" class="plan"/><text x="${W - 165}" y="20">Tu meta</text><line x1="${W - 110}" x2="${W - 90}" y1="16" y2="16" class="ref"/><text x="${W - 85}" y="20">Ref. 1,5 °C</text></g>`;
  $('#pChart').innerHTML = grid + years + area + ref + path + leg;
}
$('[data-simpane="path"]').addEventListener('input', calcPath);
calcPath();

// Neutralidad y créditos (precios de referencia Sylvera, 1T 2026)
const P_STD = 5.7, P_HQ = 20;
function calcOffset() {
  const t = val('oTon'), hq = val('oHq') / 100;
  $('[data-out="oTon"]').textContent = fmt(t) + ' tCO₂e';
  $('[data-out="oHq"]').textContent = Math.round(hq * 100) + ' %';
  const cHq = t * hq * P_HQ, cStd = t * (1 - hq) * P_STD, tot = cHq + cStd;
  $('#oCost').textContent = fmt(tot); $('#oHqCost').textContent = fmt(cHq); $('#oStdCost').textContent = fmt(cStd);
  $('#oBarHq').style.width = (tot ? cHq / tot * 100 : 0) + '%'; $('#oBarStd').style.width = (tot ? cStd / tot * 100 : 0) + '%';
  $('#oInsight').textContent = `Con ${Math.round(hq * 100)} % de créditos de alta calidad, el costo es de USD ${fmt(tot / t, 1)} por tonelada. Solo con créditos promedio sería USD ${fmt(t * P_STD)}; todo en alta calidad, USD ${fmt(t * P_HQ)}.`;
}
$('[data-simpane="offset"]').addEventListener('input', calcOffset);
calcOffset();

/* ---------- Nuestro equipo: cápsulas + ficha ---------- */
(() => {
  const OFF = [0, 64, 22, 92, 40, 8, 76, 30, 100, 16, 58, 4, 84, 36, 70];
  let group = 'all', sel = 0, list = TEAM;
  $('#teamFilters').innerHTML = Object.entries(TEAM_GROUPS).map(([k, v], i) => `<button type="button" class="chip${i ? '' : ' is-on'}" data-g="${k}">${v}</button>`).join('');
  function renderPills() {
    list = TEAM.filter((p) => group === 'all' || p.group === group);
    // muchas personas: nube compacta; pocas: zigzag con el cargo
    $('#pills').classList.toggle('pills--cloud', list.length > 6);
    $('#pills').innerHTML = list.map((p, i) => `<button type="button" class="pill" role="option" data-i="${i}" style="--off:${OFF[i % OFF.length]}px;--d:${i * 0.03}s;--y:${[0, 10, -6, 6, -10, 4][i % 6]}px" aria-selected="false">
      <span class="pill__name">${p.name}</span><span class="pill__role">${p.title}</span><span class="pill__arrow" aria-hidden="true">→</span></button>`).join('');
    select(0, false);
  }
  function select(i, scroll = true) {
    sel = i; const p = list[i]; if (!p) return;
    $$('.pill').forEach((el, k) => { el.classList.toggle('is-on', k === i); el.setAttribute('aria-selected', k === i); });
    const bw = `assets/equipo/${p.id}.jpg`, col = p.noColor ? bw : `assets/equipo/${p.id}-color.jpg`;
    $('#person').innerHTML = `
      <div class="person__photo"><img src="${bw}" alt="${p.name}"><img class="person__color" src="${col}" alt="" aria-hidden="true" onerror="this.remove()"></div>
      <span class="eyebrow">${p.area.toUpperCase()}</span>
      <h3>${p.name}</h3>
      <p class="person__title">${p.title}</p>
      <div class="person__skills">${p.skills.map((s, k) => `<span style="--k:${k}">${s}</span>`).join('')}</div>
      <div class="person__nav">
        <button type="button" class="round" data-step="-1" aria-label="Anterior">↑</button>
        <span>${String(i + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}</span>
        <button type="button" class="round round--mint" data-step="1" aria-label="Siguiente">↓</button>
        <a class="btn btn--ghost-light btn--sm person__in" href="${p.linkedin || 'https://www.linkedin.com/company/coraliae/'}" target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>`;
    const card = $('#person'); card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
    if (scroll && window.innerWidth < 1000) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  $('#pills').addEventListener('click', (e) => { const b = e.target.closest('.pill'); if (b) select(+b.dataset.i); });
  $('#pills').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const n = (sel + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length; select(n, false); $$('.pill')[n].focus(); }
  });
  $('#person').addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (b) select((sel + +b.dataset.step + list.length) % list.length, false); });
  $('#teamFilters').addEventListener('click', (e) => {
    const c = e.target.closest('.chip'); if (!c) return;
    $$('#teamFilters .chip').forEach((x) => x.classList.toggle('is-on', x === c)); group = c.dataset.g; renderPills();
  });
  renderPills();
})();

/* ---------- Hero: escenario 2050 con / sin acción ---------- */
(() => {
  const hero = $('#hero'); if (!hero) return;
  const sin = hero.querySelector('.hero__bg--sin');
  const loadSin = () => { if (sin.dataset.src) { sin.srcset = sin.dataset.srcset; sin.src = sin.dataset.src; delete sin.dataset.src; } };
  addEventListener('load', () => setTimeout(loadSin, 300)); // se baja después de abrir la página
  const TXT = {
    con: ['+1.5°C', 'Meta del Acuerdo de París', 'M0 34 L25 30 L50 27 L75 25 L100 24 L125 23 L150 23 L175 22 L200 22'],
    sin: ['+2.4°C', 'Aumento de temperatura proyectado al 2050', 'M0 34 L25 32 L50 33 L75 27 L100 24 L125 20 L150 15 L175 9 L200 4'],
  };
  $$('.scene__btn').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.scene; loadSin();
    hero.dataset.scene = k;
    $$('.scene__btn').forEach((x) => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
    $('#heroTemp').textContent = TXT[k][0]; $('#heroTempTxt').textContent = TXT[k][1];
    $('#heroCurve').setAttribute('d', TXT[k][2]);
  }));
})();
