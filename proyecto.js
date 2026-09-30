// Coralia — página de detalle de un proyecto (proyecto.html?p=ypf)
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const SVC = { mitigar: 'Mitigar', adaptar: 'Adaptar', medir: 'Medir', consultoria: 'Consultoría' };

const id = new URLSearchParams(location.search).get('p') || location.hash.slice(1);
const i = CASES.findIndex((c) => c.id === id);
if (i < 0) { location.replace('proyectos.html'); throw new Error('Proyecto no encontrado'); }
const c = CASES[i];

document.title = `${c.client} · ${c.title} | Coralia Environmental`;
document.querySelector('meta[name="description"]').content = c.short;
$('#proyecto').className = `pcard--${c.svc}`;

// Portada
const hero = $('#dHeroImg');
hero.src = c.hero || c.img; hero.onerror = () => hero.remove();
$('#dCrumb').textContent = c.client;
$('#dTags').innerHTML = `<span class="tag tag--${c.svc}">${SVC[c.svc]}</span><span class="tag">${c.ind}</span>`;
$('#dTitle').textContent = c.title;
$('#dShort').textContent = c.short;
const facts = [['Cliente', c.client], ['Industria', c.ind], ['Ubicación', c.country]];
if (c.period) facts.push(['Período', c.period]);
$('#dFacts').innerHTML = facts.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('');

// Cuerpo
$('#dBody').innerHTML = c.body.map((p) => `<p>${p}</p>`).join('');
if (c.role) $('#dRole').innerHTML = `<h3>El rol de Coralia</h3><ul class="d-role">${c.role.map((r) => `<li>${r}</li>`).join('')}</ul>`;
$('#dSideClient').textContent = 'RESULTADO';
$('#dKpi').textContent = c.kpi[0];
$('#dKpiLabel').textContent = c.kpi[1];
const mail = `mailto:contacto@coraliae.com?subject=${encodeURIComponent('Consulta por un proyecto como ' + c.client)}`;
$('#dContact').href = mail; $('#dCta').href = mail;
$('#dShare').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(location.href); $('#dShareMsg').textContent = 'Link copiado.'; }
  catch { $('#dShareMsg').textContent = location.href; }
});

// Galería + visor
const pics = (c.gallery || []).filter((g) => g !== c.hero).concat(c.img && c.img !== c.hero ? [c.img] : []);
if (pics.length) {
  $('#dGalleryWrap').hidden = false;
  $('#dGallery').innerHTML = pics.map((src, k) => `<button type="button" class="d-gallery__item" data-src="${src}" aria-label="Ver imagen ${k + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join('');
  const lb = $('#lightbox');
  $('#dGallery').addEventListener('click', (e) => { const b = e.target.closest('[data-src]'); if (!b) return; $('#lbImg').src = b.dataset.src; lb.showModal(); });
  $('#lbClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
}

// Testimonio
if (c.quote !== undefined && QUOTES[c.quote]) {
  const q = QUOTES[c.quote];
  $('#dQuoteWrap').hidden = false;
  $('#dQuote').innerHTML = `<img src="${q.img}" alt="${q.name}" width="72" height="72"><blockquote>“${q.text}”</blockquote><figcaption><b>${q.name}</b> · ${q.role}</figcaption>`;
}

// Otros proyectos: primero los del mismo servicio
const rel = CASES.filter((x) => x.id !== c.id).sort((a, b) => (b.svc === c.svc) - (a.svc === c.svc)).slice(0, 3);
$('#dRelated').innerHTML = rel.map((x) => {
  const src = tallOf(x), baked = src && bakedLogo(x, src);
  return `<a class="pcard pcard--${x.svc}" href="proyecto.html?p=${x.id}">
    <span class="pcard__media${baked ? ' is-baked' : ''}">${src ? `<img src="${src}" alt="" loading="lazy" onerror="this.parentNode.classList.remove('is-baked');this.remove()">` : ''}<span class="pcard__logo">${x.client}</span></span>
    <span class="pcard__tag"><span class="tag tag--${x.svc}">${SVC[x.svc]}</span><span>${x.country}</span></span>
    <span class="pcard__panel"><span class="pcard__title">${x.title}</span><span class="pcard__kpi"><b>${x.kpi[0]}</b> ${x.kpi[1]}</span><span class="pcard__go" aria-hidden="true">↗</span></span>
  </a>`;
}).join('');
const prev = CASES[(i - 1 + CASES.length) % CASES.length], next = CASES[(i + 1) % CASES.length];
$('#dPrev').href = `proyecto.html?p=${prev.id}`; $('#dPrev b').textContent = prev.client;
$('#dNext').href = `proyecto.html?p=${next.id}`; $('#dNext b').textContent = next.client;
document.addEventListener('keydown', (e) => {
  if (document.querySelector('dialog[open]')) return;
  if (e.key === 'ArrowRight') location.href = $('#dNext').href;
  if (e.key === 'ArrowLeft') location.href = $('#dPrev').href;
});

// Aparición al scrollear
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
}), { threshold: 0.12 }) : null;
$$('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-visible')));
