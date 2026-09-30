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
      const to = +b.dataset.count, suf = b.dataset.suffix ?? '+'; const t0 = performance.now();
      const step = (t) => { const p = Math.min(1, (t - t0) / 1400); b.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
}

/* ---------- 1) Plataformas: pestañas, recorrido paso a paso y mini demo ---------- */
const APP_PANE = { footprint: 'footprint', markets: 'markets', risk: 'risk' };
function setApp(k) {
  $$('.apptab').forEach((t) => { const on = t.dataset.app === k; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on); });
  $$('.story').forEach((st) => { st.hidden = st.dataset.story !== k; });
  $$('.lab__pane').forEach((p) => { const on = p.dataset.pane === APP_PANE[k]; p.hidden = !on; p.classList.toggle('is-active', on); });
  const st = $(`.story[data-story="${k}"]`); if (st) showStep(st, 0);
}
$$('.apptab').forEach((t) => t.addEventListener('click', () => setApp(t.dataset.app)));
// botones de las tarjetas de herramientas: eligen la plataforma y el navegador baja al ancla
$$('[data-open-app]').forEach((a) => a.addEventListener('click', () => setApp(a.dataset.openApp)));

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
