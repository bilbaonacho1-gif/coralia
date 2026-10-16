// Coralia — "Iniciar sesión": a dónde llevan todos los botones del sitio (los que tienen data-login).
// Hoy van a la pantalla propia (ingresar.html). Si se usa la pantalla de login de Wix, se cambia solo acá.
const LOGIN_URL = 'ingresar.html';
document.querySelectorAll('[data-login]').forEach((a) => { a.href = LOGIN_URL; });

// A dónde lleva "Ir a la app" de cada una (sección Apps del inicio y pantalla Iniciar sesión).
// null = todavía no tiene página: se muestra "Próximamente". Cambiar un link se hace solo acá.
window.APP_LINKS = {
  footprint: 'https://carbonfootprint.coraliae.com/login',
  markets: null,
  risk: null,
};

// Coralia — menú del encabezado en celular y tablet (debajo de 1000 px)
(() => {
  const btn = document.querySelector('.nav-toggle'), nav = document.getElementById('nav');
  if (!btn || !nav) return;
  const set = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); // i18n.js traduce la etiqueta
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

// Selector de idioma (los cambios de texto los hace i18n.js)
(() => {
  const box = document.querySelector('.langsel'), I = window.I18N; if (!box || !I) return;
  const btn = box.querySelector('.langsel__btn'), menu = box.querySelector('.langsel__menu');
  const cur = I.langs[I.lang] || I.langs.es;
  box.querySelector('.langsel__cur').textContent = cur.short;
  btn.setAttribute('aria-label', `Idioma: ${cur.name}`);
  document.querySelectorAll('[data-lang]').forEach((a) => a.classList.toggle('is-on', a.dataset.lang === I.lang));
  const set = (open) => { menu.hidden = !open; btn.setAttribute('aria-expanded', open); };
  btn.addEventListener('click', (e) => { e.stopPropagation(); set(menu.hidden); });
  document.addEventListener('click', (e) => { if (!box.contains(e.target)) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus(); } });
  document.querySelectorAll('[data-lang]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); I.set(a.dataset.lang); }));
})();

// Al tocar un botón: un destello de luz verde clarita (anillo que sale y se desvanece). Estilo en styles.css (.is-tapped).
// En las carpetas y las cards del pipeline el destello va en su flecha.
(() => {
  const SEL = '.btn, .chip, .svc__btn, .plans-toggle, .cycle__arrow, .cycle__node, .cycle__head, .apptab, .ba__tab, .sv-tab, .simpick, .langsel__btn, .nav-toggle, .app-detail__close, .dot-btn, .folder, .pipc, .sv-case, .pick__app';
  const ARROW = { folder: '.folder__go', pipc: '.pipc__go' };
  document.addEventListener('pointerdown', (e) => {
    let el = e.target.closest && e.target.closest(SEL); if (!el) return;
    for (const [cls, inner] of Object.entries(ARROW)) if (el.classList.contains(cls)) el = el.querySelector(inner) || el;
    el.classList.remove('is-tapped'); void el.offsetWidth; el.classList.add('is-tapped');
    el.addEventListener('animationend', () => el.classList.remove('is-tapped'), { once: true });
  }, { passive: true });
})();
