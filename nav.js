// Coralia — "Iniciar sesión": a dónde llevan todos los botones del sitio (los que tienen data-login).
// Hoy van a la pantalla propia (ingresar.html). Si se usa la pantalla de login de Wix, se cambia solo acá.
const LOGIN_URL = 'ingresar.html';
document.querySelectorAll('[data-login]').forEach((a) => { a.href = LOGIN_URL; });

// A dónde lleva "Ir a la app" de cada una (sección Apps del inicio y pantalla Iniciar sesión).
// null = todavía no tiene página: se muestra "Próximamente". Cambiar un link se hace solo acá.
window.APP_LINKS = {
  footprint: 'https://carbonfootprint.coraliae.com/login',
  markets: null,
  risk: 'https://climaterisk.coraliae.com/login',
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
  // el alto se mide una vez (y de nuevo si cambia el tamaño), no en cada movimiento del scroll
  let edge = 0;
  const measure = () => { edge = (run ? run.offsetHeight : 0) + 40; onScroll(); };
  let was = null;
  const onScroll = () => { const on = scrollY > edge; if (on !== was) { was = on; header.classList.toggle('is-scrolled', on); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', measure);
  addEventListener('load', measure);
  measure();
})();

// Animaciones que se repiten: se pausan en las secciones que no están en pantalla (no gastan batería ni traban el scroll)
(() => {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('anim-off', !e.isIntersecting)), { rootMargin: '200px 0px' });
  document.querySelectorAll('main > section, body > section, footer').forEach((s) => io.observe(s));
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

// Modo claro / oscuro: botón sol/luna en el encabezado. El cambio se abre como un círculo desde el botón.
(() => {
  const right = document.querySelector('.header__right'); if (!right) return;
  const root = document.documentElement;
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'theme-btn';
  btn.innerHTML = '<svg class="theme-btn__sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>'
    + '<svg class="theme-btn__moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  const label = () => { const dark = root.dataset.theme === 'dark'; const t = (s) => (window.I18N && I18N.t ? I18N.t(s) : s);
    btn.setAttribute('aria-label', t(dark ? 'Pasar a modo claro' : 'Pasar a modo oscuro')); btn.setAttribute('aria-pressed', dark); };
  label();
  right.insertBefore(btn, right.firstChild);
  btn.addEventListener('click', (e) => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => { root.dataset.theme = next; label(); try { localStorage.setItem('coralia-theme', next); } catch (er) { /* solo por esta visita */ } };
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || calm) {
      // sin transición de vista: fundido suave de colores
      root.classList.add('theme-fade'); apply(); setTimeout(() => root.classList.remove('theme-fade'), 700); return;
    }
    const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' });
    });
  });
})();
