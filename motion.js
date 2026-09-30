// Coralia — animaciones con el scroll (solo la Home). Sin librerías: cada cuadro se calcula
// según la posición de la página y se aplica con transform, que no traba el scroll.
// Con "reducir movimiento" activado no se mueve nada.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

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

  function frame() {
    ticking = false;
    const y = scrollY, H = innerHeight;
    if (hero) {
      const p = clamp(y / (H * 0.85));
      hero.style.setProperty('--p', p.toFixed(4));
      if (y < H * 1.2) cards.forEach((c) => { c.style.translate = `0 ${(-y * (+c.dataset.depth || 0)).toFixed(1)}px`; });
    }
    if (words.length) {
      const r = phrase.getBoundingClientRect();
      const p = clamp((H * 0.88 - r.top) / (r.height + H * 0.3));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < n));
    }
  }

  if (calm) return;
  let ticking = false;
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  frame();
})();
