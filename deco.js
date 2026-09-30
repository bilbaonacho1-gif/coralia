// Coralia — detalles de diseño: mariposas del logo en el fondo.
// v: 'linea' (contorno), 'menta' (silueta), 'color' (logo) · w: ancho px · x/y: posición · o: opacidad
// r: rotación · speed: movimiento con el scroll (parallax) · flap: aletea
(() => {
  // v: 'linea' | 'menta' | 'color' (mariposa sola) · 'bandada-costado' | 'bandada-arriba' | 'bandada-esquina'
  // pos: posición CSS (left/right/top) · w: ancho px · o: opacidad · r: rotación · flip: espejar
  const DECO = {
    '#herramientas': [
      { v: 'bandada-arriba', pos: 'right:-60px;top:-30px', w: 520, o: 0.32, r: 0, speed: 0.12 },
      { v: 'menta', pos: 'left:6%;top:150px', w: 44, o: 0.55, r: -20, speed: -0.25, flap: 1 },
    ],
    '#confianza': [
      { v: 'color', pos: 'left:92%;top:40px', w: 60, o: 0.5, r: 18, speed: -0.2, flap: 1 },
    ],
    '#mapa': [
      { v: 'bandada-costado', pos: 'right:-90px;top:12%', w: 300, o: 0.28, r: 0, speed: 0.1 },
    ],
    '#casos': [
      { v: 'color', pos: 'left:4%;top:70px', w: 52, o: 0.45, r: -16, speed: -0.25, flap: 1 },
    ],
    '#simuladores': [
      { v: 'bandada-esquina', pos: 'left:-80px;top:-40px', w: 560, o: 0.26, r: 0, speed: 0.1, flip: 1 },
      { v: 'menta', pos: 'left:90%;top:60%', w: 40, o: 0.45, r: 20, speed: -0.3, flap: 1 },
    ],
    '#planes': [
      { v: 'bandada-costado', pos: 'left:-90px;top:8%', w: 280, o: 0.26, r: 0, speed: 0.12, flip: 1 },
      { v: 'menta', pos: 'left:88%;top:80px', w: 30, o: 0.5, r: -10, speed: -0.3, flap: 1 },
    ],
  };
  const items = [];
  Object.entries(DECO).forEach(([sel, list]) => {
    const sec = document.querySelector(sel); if (!sec) return;
    sec.classList.add('has-deco');
    const box = document.createElement('div'); box.className = 'deco'; box.setAttribute('aria-hidden', 'true');
    list.forEach((d, i) => {
      const el = document.createElement('span');
      el.className = 'bf' + (d.flap ? ' bf--flap' : '');
      el.style.cssText = `${d.pos};width:${d.w}px;opacity:${d.o};--r:${d.r}deg;--sx:${d.flip ? -1 : 1};--delay:${(i * 0.7).toFixed(1)}s`;
      el.innerHTML = `<img src="assets/deco/${d.v.startsWith('bandada') ? d.v : 'mariposa-' + d.v}.webp" alt="">`;
      box.appendChild(el); items.push({ el, sec, speed: d.speed || 0 });
    });
    sec.prepend(box);
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  const update = () => {
    const vh = innerHeight;
    items.forEach(({ el, sec, speed }) => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      el.style.setProperty('--py', `${((r.top + r.height / 2) - vh / 2) * speed}px`);
    });
  };
  addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', update); update();
})();
