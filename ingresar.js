// Coralia — pantalla "Iniciar sesión" (ingresar.html): elegir a qué app entrar.
// Cada tarjeta toma su link de APP_LINKS (nav.js). Sin link: queda como "Próximamente"
// y lleva al contacto para pedir acceso.
(() => {
  const LINKS = window.APP_LINKS || {};
  const tr = (s) => (window.I18N ? I18N.t(s) : s);
  const CONTACTO = 'mailto:contacto@coraliae.com';
  document.querySelectorAll('.pick__app').forEach((a) => {
    const url = LINKS[a.dataset.app];
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; return; }
    a.href = CONTACTO; a.removeAttribute('target'); a.classList.add('is-soon');
    a.querySelector('.pick__how').textContent = tr('Próximamente. Escribinos y te avisamos cuando esté disponible.');
    a.querySelector('.pick__go').innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="m4 7 8 6 8-6"/></svg>';
  });
})();
