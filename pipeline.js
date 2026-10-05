// Coralia — pipeline de proyectos propios para inversores (pipeline.html y pipeline.html?p=proyecto-1)
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const card = (p) => `<a class="pipe__card" href="pipeline.html?p=${p.id}">
  <span class="pipe__media">${p.img ? `<img src="${p.img}" alt="" loading="lazy">` : ''}<span class="pipe__type">${p.type}</span></span>
  <span class="pipe__body"><b>${p.name}</b><small>${p.place}</small><span class="pipe__stage">${p.stage}</span></span>
  <span class="pipe__go" aria-hidden="true">↗</span></a>`;

const id = new URLSearchParams(location.search).get('p');
const p = PIPELINE.find((x) => x.id === id);
if (!p) {
  // Lista de todos los proyectos
  $('#pGrid').innerHTML = PIPELINE.map(card).join('');
} else {
  document.title = `${p.name} · Pipeline | Coralia Environmental`;
  $('#pList').hidden = true;
  $('#pDetail').hidden = false; $('#pMore').hidden = false;
  if (p.img) $('#pHeroImg').src = p.img;
  $('#pCrumbSep').hidden = false; $('#pCrumb').textContent = p.name;
  $('#pTags').innerHTML = `<span class="tag tag--mitigar">${p.type}</span><span class="tag">${p.stage}</span>`;
  $('#pTitle').textContent = p.name;
  $('#pShort').textContent = p.place;
  $('#pFacts').innerHTML = [['Tipo', p.type], ['Ubicación', p.place], ['Superficie', p.ha], ['Etapa', p.stage]]
    .map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('');
  $('#pBody').innerHTML = p.desc.map((t) => `<p>${t}</p>`).join('');
  $('#pKpi').textContent = p.kpi[0]; $('#pKpiLabel').textContent = p.kpi[1];
  $('#pContact').href = `mailto:contacto@coraliae.com?subject=${encodeURIComponent('Inversión en ' + p.name)}`;
  if (p.gallery && p.gallery.length) {
    $('#pGalleryWrap').hidden = false;
    $('#pGallery').innerHTML = p.gallery.map((src, k) => `<button type="button" class="d-gallery__item" data-src="${src}" aria-label="Ver imagen ${k + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join('');
    const lb = $('#lightbox');
    $('#pGallery').addEventListener('click', (e) => { const b = e.target.closest('[data-src]'); if (!b) return; $('#lbImg').src = b.dataset.src; lb.showModal(); });
    $('#lbClose').addEventListener('click', () => lb.close());
  }
  $('#pOthers').innerHTML = PIPELINE.filter((x) => x.id !== p.id).slice(0, 3).map(card).join('');
}

// Aparición al scrollear
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
}), { threshold: 0.12 }) : null;
$$('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-visible')));
