// Coralia — animaciones con el scroll (solo la Home). Sin librerías: cada cuadro se calcula
// según la posición de la página y se aplica con transform, que no traba el scroll.
// Con "reducir movimiento" activado o en pantallas angostas, las secciones horizontales
// pasan a ser carruseles que se deslizan con el dedo.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const wide = () => innerWidth >= 900;

  /* 1) Portada: el paisaje se achica a tarjeta y las tarjetas de interfaz flotan a distinta velocidad */
  const hero = $('#hero'), cards = $$('.ui-card');

  /* 2) Propuesta: las palabras se "encienden" a medida que bajás */
  const phrase = $('[data-words]');
  let words = [];
  if (phrase) {
    const wrapWords = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) frag.appendChild(document.createTextNode(t));
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = t; frag.appendChild(s); }
        });
        n.replaceWith(frag);
      } else wrapWords(n);
    });
    wrapWords(phrase);
    words = $$('.w', phrase);
    if (calm) words.forEach((w) => w.classList.add('is-lit'));
  }

  /* 3) Tres herramientas: la sección queda fija y las tarjetas pasan de costado */
  const hz = $('#herramientas'), hzTrack = hz && $('.hz__track', hz), hzBar = hz && $('.hz__bar i', hz);
  const hzBtns = $$('[data-hz]'), panels = hz ? $$('.app-panel', hz) : [];
  let hzOn = false, hzDist = 0;

  /* 4) Trayectoria: la línea de tiempo corre de costado mientras la sección cruza la pantalla */
  const tl = $('#trayectoria'), tlTrack = tl && $('.timeline__track', tl);
  let tlOn = false, tlDist = 0;

  function layout() {
    if (hz) {
      hzOn = !calm && wide();
      hz.classList.toggle('hz--pinned', hzOn);
      hzTrack.style.transform = '';
      if (hzOn) {
        hzDist = Math.max(0, hzTrack.scrollWidth - innerWidth);
        hz.style.height = `${innerHeight + hzDist}px`;
      } else hz.style.height = '';
    }
    if (tl) {
      tlOn = !calm && wide();
      tl.classList.toggle('timeline--moving', tlOn);
      tlTrack.style.transform = '';
      tlDist = tlOn ? Math.max(0, tlTrack.scrollWidth - innerWidth) : 0;
    }
  }

  function setHzActive(i) { hzBtns.forEach((b, k) => b.classList.toggle('is-on', k === i)); }

  function frame() {
    ticking = false;
    const y = scrollY, H = innerHeight;
    if (hero && !calm) {
      const p = clamp(y / (H * 0.85));
      hero.style.setProperty('--p', p.toFixed(4));
      if (y < H * 1.2) cards.forEach((c) => { c.style.translate = `0 ${(-y * (+c.dataset.depth || 0)).toFixed(1)}px`; });
    }
    if (words.length && !calm) {
      const r = phrase.getBoundingClientRect();
      const p = clamp((H * 0.88 - r.top) / (r.height + H * 0.3));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < n));
    }
    if (hzOn) {
      const r = hz.getBoundingClientRect();
      const p = hzDist ? clamp(-r.top / hzDist) : 0;
      hzTrack.style.transform = `translate3d(${(-p * hzDist).toFixed(1)}px,0,0)`;
      hzBar.style.width = `${(p * 100).toFixed(1)}%`;
      setHzActive(Math.min(panels.length - 1, Math.round(p * (panels.length - 1))));
    }
    if (tlOn) {
      // arranca cuando la línea asoma abajo y termina cuando está por salir arriba
      const r = tlTrack.getBoundingClientRect();
      const p = clamp((H * 0.95 - r.top) / (H * 0.9 + r.height));
      tlTrack.style.transform = `translate3d(${(-p * tlDist).toFixed(1)}px,0,0)`;
    }
  }

  // Botones 01 / 02 / 03: llevan a cada herramienta
  hzBtns.forEach((b) => b.addEventListener('click', () => {
    const i = +b.dataset.hz;
    if (hzOn) {
      const top = hz.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + hzDist * (i / Math.max(1, panels.length - 1)) + 1, behavior: calm ? 'auto' : 'smooth' });
    } else {
      const vp = $('.hz__viewport', hz), p = panels[i];
      vp.scrollTo({ left: p.offsetLeft - (vp.clientWidth - p.clientWidth) / 2, behavior: calm ? 'auto' : 'smooth' });
      setHzActive(i);
    }
  }));
  // En modo carrusel, el botón activo sigue a la tarjeta que se ve
  if (hz) $('.hz__viewport', hz).addEventListener('scroll', (e) => {
    if (hzOn) return;
    const vp = e.currentTarget, mid = vp.scrollLeft + vp.clientWidth / 2;
    let best = 0; panels.forEach((p, k) => { if (Math.abs(p.offsetLeft + p.clientWidth / 2 - mid) < Math.abs(panels[best].offsetLeft + panels[best].clientWidth / 2 - mid)) best = k; });
    setHzActive(best);
  }, { passive: true });
  setHzActive(0);
  // Con teclado (Tab): al enfocar un botón de otra tarjeta, la página baja hasta que esa tarjeta quede a la vista
  if (hz) hz.addEventListener('focusin', (e) => {
    if (!hzOn) return;
    const i = panels.findIndex((p) => p.contains(e.target)); if (i < 0) return;
    const top = hz.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + hzDist * (i / Math.max(1, panels.length - 1)) + 1, behavior: 'auto' });
  });

  let ticking = false;
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', () => { layout(); request(); });
  // las imágenes cambian el ancho de las pistas al cargar
  addEventListener('load', () => { layout(); request(); });
  layout(); frame();
})();
