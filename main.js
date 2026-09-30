// Coralia — versión interactiva
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = (n, d = 0) => n.toLocaleString('es-AR', { maximumFractionDigits: d, minimumFractionDigits: d });

/* ---------- Aparición al scrollear ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold: 0.15 }) : null;
$$('.reveal, .map').forEach((el) => io ? io.observe(el) : el.classList.add('is-visible'));

/* ---------- 1) Nuestras apps: tarjetas que abren el recorrido paso a paso ---------- */
const APP_NAMES = { footprint: 'Carbon Footprint', markets: 'Carbon Markets Hub', risk: 'Climate Risk App' };
const detail = $('#app-detail');
function openApp(k) {
  const card = $(`.appcard[data-app="${k}"]`), already = card.classList.contains('is-on') && !detail.hidden;
  if (already) return closeApp();
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

/* ---------- Nuestro equipo: panal de hexágonos + ficha de cada persona ---------- */
(() => {
  const hive = $('#hive'), stage = $('#teamStage'), person = $('#person');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let group = 'all', sel = -1;
  const photo = (p) => `assets/equipo/${p.id}.jpg`, color = (p) => (p.noColor ? photo(p) : `assets/equipo/${p.id}-color.jpg`);

  $('#teamFilters').innerHTML = Object.entries(TEAM_GROUPS).map(([k, v], i) => `<button type="button" class="chip${i ? '' : ' is-on'}" data-g="${k}">${v}</button>`).join('');
  hive.innerHTML = TEAM.map((p, i) => `<button type="button" class="hex" data-i="${i}" style="--d:${(i * 0.04).toFixed(2)}s" aria-label="${p.name}, ${p.area}">
    <span class="hex__in"><img src="${photo(p)}" alt="" loading="lazy"><img class="hex__color" src="${color(p)}" alt="" loading="lazy" onerror="this.remove()">
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
        <div class="person__hex"><span class="hex__in"><img src="${photo(p)}" alt="${p.name}"><img class="hex__color is-on" src="${color(p)}" alt="" onerror="this.remove()"></span></div>
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
