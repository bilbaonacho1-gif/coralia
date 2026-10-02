// Coralia — menú del encabezado en celular y tablet (debajo de 1000 px)
(() => {
  const btn = document.querySelector('.nav-toggle'), nav = document.getElementById('nav');
  if (!btn || !nav) return;
  const set = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  btn.addEventListener('click', () => set(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('click', (e) => { if (!nav.contains(e.target) && !btn.contains(e.target)) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { set(false); btn.focus(); } });
})();

// Encabezado: transparente sobre la foto de portada, claro con fondo al bajar
(() => {
  const header = document.querySelector('.header'); if (!header) return;
  // En la Home el fondo claro aparece recién después de que se abre la mariposa (.opening__run)
  const run = document.querySelector('.opening__run');
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > (run ? run.offsetHeight : 0) + 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
