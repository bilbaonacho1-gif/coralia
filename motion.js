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
  const run = $('.opening__run'), header = $('.header');
  const decos = $$('.deco[data-par]'); decos.forEach((d) => { d._k = +d.dataset.par || 0; });
  // Apertura: q va de 0 (mariposa cerrada) a 1 (abierta) durante el recorrido de .opening__run
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
      const T = run ? run.offsetHeight : 0;
      const q = T ? ease(clamp((y - T * 0.04) / (T * 0.9))) : 1;
      hero.style.setProperty('--q', q.toFixed(4));
      hero.classList.toggle('is-open', q > 0.999);
      if (!revealed && q > 0.5) { revealed = true; hero.classList.add('is-revealed'); countUp(); }
      else if (revealed && q < 0.1) { revealed = false; hero.classList.remove('is-revealed'); }
      if (header) header.classList.toggle('is-intro', q < 0.9);
      const yy = Math.max(0, y - T);
      const p = clamp(yy / (H * 0.85));
      hero.style.setProperty('--p', p.toFixed(4));
      if (yy < H * 1.2) cards.forEach((c) => { c.style.translate = `0 ${(-yy * (+c.dataset.depth || 0)).toFixed(1)}px`; });
    }
    // decoración: cada pieza se desplaza un poco más lento o más rápido que la página
    decos.forEach((d) => {
      const p = d.offsetParent; if (!p) return; // (posición sin el desplazamiento, para que no tiemble)
      const top = p.getBoundingClientRect().top + d.offsetTop, h = d.offsetHeight;
      if (top + h < -300 || top > H + 300) return;
      const off = (top + h / 2 - H / 2) * d._k;
      d.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
    });
    if (words.length) {
      const r = phrase.getBoundingClientRect();
      const p = clamp((H * 0.88 - r.top) / (r.height + H * 0.3));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < n));
    }
  }

  if (calm) { if (hero) hero.style.setProperty('--q', '1'); return; }
  // Portada que se arma de a poco: se oculta hasta que la mariposa se abre (y se rearma si se vuelve a cerrar)
  const num = $('.ui-card--a .ui-card__num');
  let revealed = false;
  function countUp() {
    if (!num) return;
    const end = 0.4644, t0 = performance.now() + 1100, dur = 1300;
    const step = (now) => {
      const t = clamp((now - t0) / dur), v = end * (1 - Math.pow(1 - t, 3));
      num.textContent = v.toFixed(4).replace('.', ',');
      if (t < 1 && revealed) requestAnimationFrame(step);
    };
    num.textContent = '0,0000'; requestAnimationFrame(step);
  }
  if (hero && run) hero.classList.add('rv-on');
  let ticking = false;
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  frame();
})();
