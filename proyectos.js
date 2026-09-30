// Coralia — página de proyectos
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const SVC = { mitigar: 'Mitigar', adaptar: 'Adaptar', medir: 'Medir', consultoria: 'Consultoría' };

/* Aparición al scrollear */
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
}), { threshold: 0.12 }) : null;
const watch = (el) => (io ? io.observe(el) : el.classList.add('is-visible'));
$$('.reveal').forEach(watch);

/* Imagen de la tarjeta: si falta el archivo, queda el fondo de color con el nombre del cliente */
function media(c, cls, src = c.img) {
  const baked = src && bakedLogo(c, src);
  return `<span class="${cls}${baked ? ' is-baked' : ''}">
    ${src ? `<img src="${src}" alt="" loading="lazy" onerror="this.parentNode.classList.remove('is-baked');this.remove()">` : ''}
    <span class="pcard__logo">${c.client}</span>
  </span>`;
}
function card(c, big) {
  return `<button type="button" class="pcard pcard--${c.svc}${big ? ' pcard--tall' : ''} reveal" data-case="${c.id}" aria-label="${c.client}: ${c.title}">
    ${media(c, 'pcard__media', big ? tallOf(c) : c.img)}
    <span class="pcard__tag"><span class="tag tag--${c.svc}">${SVC[c.svc]}</span><span>${c.country}</span></span>
    <span class="pcard__panel">
      <span class="pcard__title">${c.title}</span>
      <span class="pcard__text">${c.short}</span>
      <span class="pcard__kpi"><b>${c.kpi[0]}</b> ${c.kpi[1]}</span>
      <span class="pcard__go" aria-hidden="true">↗</span>
    </span>
  </button>`;
}

/* Números de arriba */
const countries = [...new Set(CASES.map((c) => c.country))];
$('#pStats').innerHTML = `<div><b>${CASES.length}</b><span>casos publicados</span></div>
  <div><b>${countries.length}</b><span>países en esta selección</span></div>
  <div><b>23</b><span>países en total</span></div>`;

/* Destacados */
const featured = CASES.filter((c) => c.featured);
$('#featured').innerHTML = featured.map((c) => card(c, true)).join('');

/* Grilla + filtros */
const grid = GRID_ORDER.map((id) => CASES.find((c) => c.id === id)).filter(Boolean);
const all = [...featured, ...grid];
const fill = (sel, vals) => { $(sel).insertAdjacentHTML('beforeend', vals.map((v) => `<option>${v}</option>`).join('')); };
fill('#fInd', [...new Set(all.map((c) => c.ind))].sort());
fill('#fCountry', countries.sort());
const F = { svc: 'all', ind: 'all', country: 'all' };
function renderGrid() {
  const list = all.filter((c) => (F.svc === 'all' || c.svc === F.svc) && (F.ind === 'all' || c.ind === F.ind) && (F.country === 'all' || c.country === F.country));
  const filtered = F.svc !== 'all' || F.ind !== 'all' || F.country !== 'all';
  // Sin filtros: los 7 restantes en el mosaico de la web (2 anchas, 3, 2 anchas). Con filtros: todos los que coinciden.
  const show = filtered ? list : grid;
  $('#mosaic').className = 'mosaic' + (filtered ? ' mosaic--flat' : '');
  $('#mosaic').innerHTML = show.map((c) => card(c)).join('');
  $$('#mosaic .reveal').forEach((el) => el.classList.add('is-visible'));
  $('#empty').hidden = show.length > 0;
  $('#fCount').textContent = filtered ? `${list.length} ${list.length === 1 ? 'proyecto' : 'proyectos'}` : '';
}
$('#fSvc').addEventListener('click', (e) => {
  const b = e.target.closest('.chip'); if (!b) return;
  $$('#fSvc .chip').forEach((x) => x.classList.toggle('is-on', x === b)); F.svc = b.dataset.v; renderGrid();
});
$('#fInd').addEventListener('change', (e) => { F.ind = e.target.value === 'Todas' ? 'all' : e.target.value; renderGrid(); });
$('#fCountry').addEventListener('change', (e) => { F.country = e.target.value === 'Todos' ? 'all' : e.target.value; renderGrid(); });
$('#fReset').addEventListener('click', () => {
  F.svc = F.ind = F.country = 'all'; $('#fInd').value = 'all'; $('#fCountry').value = 'all';
  $$('#fSvc .chip').forEach((x, i) => x.classList.toggle('is-on', i === 0)); renderGrid();
});
renderGrid();
$$('#featured .reveal').forEach(watch);

/* Ficha del proyecto */
const modal = $('#caseModal'); let cur = 0;
function openCase(id) {
  cur = all.findIndex((c) => c.id === id); const c = all[cur]; if (!c) return;
  $('#cmMedia').innerHTML = media(c, 'pcard__media pcard__media--modal', c.hero || c.img);
  $('#cmFull').href = 'proyecto.html?p=' + c.id;
  $('#cmMedia').className = `case-modal__media pcard--${c.svc}`;
  $('#cmClient').textContent = c.client.toUpperCase();
  $('#cmTitle').textContent = c.title;
  $('#cmTags').innerHTML = `<span class="tag tag--${c.svc}">${SVC[c.svc]}</span>`;
  $('#cmFacts').innerHTML = `<div><span>Resultado</span><b>${c.kpi[0]}</b><small>${c.kpi[1]}</small></div>
    <div><span>Industria</span><b>${c.ind}</b></div><div><span>Ubicación</span><b>${c.country}</b></div>`;
  $('#cmBody').innerHTML = c.body.map((p) => `<p>${p}</p>`).join('');
  if (!modal.open) (modal.showModal ? modal.showModal() : modal.setAttribute('open', ''));
  modal.scrollTop = 0;
  history.replaceState(null, '', '#' + c.id);
}
document.addEventListener('click', (e) => { const b = e.target.closest('[data-case]'); if (b) openCase(b.dataset.case); });
$('#cmClose').addEventListener('click', () => modal.close());
$('#cmPrev').addEventListener('click', () => openCase(all[(cur - 1 + all.length) % all.length].id));
$('#cmNext').addEventListener('click', () => openCase(all[(cur + 1) % all.length].id));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
modal.addEventListener('close', () => history.replaceState(null, '', location.pathname));
modal.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') $('#cmNext').click(); if (e.key === 'ArrowLeft') $('#cmPrev').click(); });
// Link directo a un caso: proyectos.html#ypf
if (location.hash && all.some((c) => '#' + c.id === location.hash)) openCase(location.hash.slice(1));

/* Testimonios */
const quotes = $$('.quote'), qdots = $$('.dot-btn'); let qn = 0;
const showQuote = (k) => { qn = k; quotes.forEach((q, i) => q.classList.toggle('is-on', i === k)); qdots.forEach((d, i) => d.classList.toggle('is-on', i === k)); };
qdots.forEach((d) => d.addEventListener('click', () => showQuote(+d.dataset.q)));
setInterval(() => { if (!document.hidden && !modal.open) showQuote((qn + 1) % quotes.length); }, 8000);
