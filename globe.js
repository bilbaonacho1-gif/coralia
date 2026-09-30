/* Globo 3D liviano (canvas + d3-geo, ~60 KB comprimido en total).
   - Las librerías y el mapa se cargan recién cuando el mapa está cerca de la pantalla.
   - Dibuja solo mientras el globo se ve; fuera de pantalla no consume nada.
   - Países, coordenadas y cantidad de trabajos: COUNTRIES en data.js. */
(() => {
  const box = document.getElementById('map'), cv = document.getElementById('globe');
  if (!box || !cv) return;
  const reset = document.getElementById('mapReset');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const load = (src) => new Promise((ok, no) => {
    const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s);
  });
  const start = () => load('assets/globo/libs.min.js').then(() => load('assets/globo/mundo.js')).then(init)
    .catch(() => box.classList.add('no-globe'));
  if ('IntersectionObserver' in window) {
    const near = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { near.disconnect(); start(); }
    }, { rootMargin: '700px 0px' });
    near.observe(box);
  } else start();

  function init() {
    const ctx = cv.getContext('2d');
    const feats = topojson.feature(WORLD, WORLD.objects.countries).features;
    const land = { type: 'FeatureCollection', features: feats };
    const borders = topojson.mesh(WORLD, WORLD.objects.countries, (a, b) => a !== b);
    const byName = new Map(feats.map((f) => [f.properties.name, f]));
    const shape = COUNTRIES.map((c) => byName.get(c[5] || c[0]) || null);
    const worked = { type: 'FeatureCollection', features: shape.filter(Boolean) };
    const nWork = COUNTRIES.map((c) => c[4] || 0);
    const proj = d3.geoOrthographic().clipAngle(90).precision(0.7);
    const path = d3.geoPath(proj, ctx);
    const grat = d3.geoGraticule10(), sphere = { type: 'Sphere' };

    // Estado: rotación [λ, φ], zoom, altura animada de cada columna
    const LEAN = 30; // el país queda un poco arriba del centro para que su columna se vea "parada"
    let rot = [64, 18], goal = null, zoom = 0.86, zoomGoal = 1, vel = 0;
    let W = 0, H = 0, R = 0, active = cur, hover = -1, lastTouch = 0, t0 = performance.now();
    const hNow = COUNTRIES.map(() => 0);
    const heads = [];

    const small = () => W < 640;
    function size() {
      const dpr = Math.min(devicePixelRatio || 1, small() ? 1.75 : 2);
      W = box.clientWidth; H = box.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    const wrap = (a) => ((a + 540) % 360) - 180;
    function aim(i) {
      const [, lon, lat] = COUNTRIES[i];
      return [-lon, -Math.max(-55, Math.min(55, lat - LEAN))];
    }

    window.globeFocus = (i, z) => {
      active = i; goal = aim(i); vel = 0; lastTouch = performance.now();
      if (z) { zoomGoal = small() ? 1.5 : 1.6; box.classList.add('is-zoomed'); reset.hidden = false; }
    };
    reset.addEventListener('click', () => {
      zoomGoal = 1; goal = [rot[0], 18]; box.classList.remove('is-zoomed'); reset.hidden = true;
    });

    function draw() {
      if (!W) return;
      const t = (performance.now() - t0) / 1000;
      R = Math.min(W, H) * (small() ? 0.44 : 0.42) * zoom;
            const zf = Math.max(0, Math.min(1, (zoom - 1) / 0.6));
      proj.scale(R).translate([W / 2, H / 2 + R * Math.sin(LEAN * Math.PI / 180) * 0.85 * zf]).rotate([rot[0], rot[1], 0]);
      const [cx, cy] = proj.translate();
      ctx.clearRect(0, 0, W, H);

      // Halo
      let g = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.28);
      g.addColorStop(0, 'rgba(120,170,70,.22)'); g.addColorStop(1, 'rgba(120,170,70,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // Océano
      g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      g.addColorStop(0, '#e6eee8'); g.addColorStop(1, '#b9cdc3');
      ctx.beginPath(); path(sphere); ctx.fillStyle = g; ctx.fill();

      ctx.beginPath(); path(grat); ctx.strokeStyle = 'rgba(18,38,30,.07)'; ctx.lineWidth = 0.6; ctx.stroke();

      // Tierra, países trabajados y el activo
      ctx.beginPath(); path(land); ctx.fillStyle = '#fbfbf6'; ctx.fill();
      ctx.beginPath(); path(worked); ctx.fillStyle = '#b9d88a'; ctx.fill();
      if (hover > -1 && hover !== active && shape[hover]) { ctx.beginPath(); path(shape[hover]); ctx.fillStyle = '#9cc56a'; ctx.fill(); }
      if (shape[active]) {
        ctx.beginPath(); path(shape[active]); ctx.fillStyle = '#4f7f2a';
        ctx.shadowColor = 'rgba(79,127,42,.6)'; ctx.shadowBlur = 14; ctx.fill(); ctx.shadowBlur = 0;
      }
      ctx.beginPath(); path(borders); ctx.strokeStyle = 'rgba(18,38,30,.22)'; ctx.lineWidth = 0.6; ctx.stroke();

      // Luz y sombra para dar volumen
      g = ctx.createRadialGradient(cx - R * 0.45, cy - R * 0.5, R * 0.2, cx, cy, R * 1.02);
      g.addColorStop(0, 'rgba(255,255,255,.45)'); g.addColorStop(0.55, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(18,38,30,.22)');
      ctx.beginPath(); path(sphere); ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = 'rgba(18,38,30,.22)'; ctx.lineWidth = 1; ctx.stroke();

      // Columnas de luz
      const c = proj.invert([cx, cy]);
      COUNTRIES.forEach(([, lon, lat], i) => {
        const d = d3.geoDistance([lon, lat], c);
        heads[i] = null;
        if (d > 1.5) { hNow[i] = 0; return; }
        const n = nWork[i], want = Math.min(0.08 + 0.035 * Math.log2(n + 1), 0.26) + (i === active ? 0.05 : 0);
        hNow[i] += (want - hNow[i]) * 0.12;
        const [px, py] = proj([lon, lat]), k = 1 + hNow[i];
        // radial + un empuje hacia arriba: así las del centro también se ven "paradas"
        const tx = cx + (px - cx) * k, ty = cy + (py - cy) * k - hNow[i] * R * 0.55 * Math.cos(d);
        const a = Math.min(1, Math.cos(d) * 1.6), on = i === active;
        const beam = ctx.createLinearGradient(px, py, tx, ty);
        beam.addColorStop(0, 'rgba(79,127,42,0)'); beam.addColorStop(1, on ? `rgba(18,38,30,${a})` : `rgba(79,127,42,${a})`);
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(tx, ty);
        ctx.strokeStyle = beam; ctx.lineWidth = n > 1 ? 3 : 2; ctx.lineCap = 'round'; ctx.stroke();
        if (on && !calm) { // anillo que late en la base
          const p = (t % 2) / 2;
          ctx.beginPath(); ctx.arc(px, py, 4 + p * 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(79,127,42,${(1 - p) * 0.8 * a})`; ctx.lineWidth = 1.5; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(tx, ty, on ? 6 : n > 1 ? 4.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = on ? `rgba(18,38,30,${a})` : `rgba(79,127,42,${a})`;
        ctx.shadowColor = on ? 'rgba(200,240,74,.9)' : 'rgba(79,127,42,.5)'; ctx.shadowBlur = on ? 18 : 10; ctx.fill(); ctx.shadowBlur = 0;
        heads[i] = { x: tx, y: ty, bx: px, by: py };
      });
      let label = null;
      if (hover > -1 && heads[hover]) label = { i: hover, x: heads[hover].x, y: heads[hover].y };
      else if (heads[active]) label = { i: active, x: heads[active].x, y: heads[active].y };
      if (label) tag(label);
    }

    function tag({ i, x, y }) {
      const n = nWork[i], txt = `${COUNTRIES[i][0]} · ${n >= 70 ? '70+ trabajos' : `${n} ${n === 1 ? 'trabajo' : 'trabajos'}`}`;
      ctx.font = '600 12px Figtree, system-ui, sans-serif';
      const w = ctx.measureText(txt).width + 18, h = 24;
      let lx = Math.max(8, Math.min(W - w - 8, x - w / 2)), ly = y - h - 12;
      if (ly < 8) ly = y + 14;
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(lx, ly, w, h, 7) : ctx.rect(lx, ly, w, h);
      ctx.fillStyle = '#12261e'; ctx.fill();
      ctx.strokeStyle = 'rgba(200,240,74,.5)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#f3f4ec'; ctx.textBaseline = 'middle'; ctx.fillText(txt, lx + 9, ly + h / 2 + 0.5);
    }

    // Animación: solo corre mientras el globo está en pantalla
    let raf = 0, visible = false;
    function tick() {
      raf = 0;
      if (!visible || document.hidden) return;
      const idle = performance.now() - lastTouch > 5000;
      if (goal) {
        const dl = wrap(goal[0] - rot[0]), dp = goal[1] - rot[1];
        rot[0] += dl * 0.08; rot[1] += dp * 0.08;
        if (Math.abs(dl) < 0.05 && Math.abs(dp) < 0.05) goal = null;
      } else if (Math.abs(vel) > 0.01) { rot[0] += vel; vel *= 0.94; }
      else if (idle && !calm && zoomGoal === 1) rot[0] += 0.05;
      zoom += (zoomGoal - zoom) * 0.08;
      draw();
      raf = requestAnimationFrame(tick);
    }
    const run = () => { if (!raf) raf = requestAnimationFrame(tick); };
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) run(); }).observe(box);
    document.addEventListener('visibilitychange', run);
    new ResizeObserver(size).observe(box);

    // Toque, arrastre y mouse
    const at = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    function pick(x, y, coarse) {
      let best = -1, bd = coarse ? 28 : 18;
      heads.forEach((h, i) => {
        if (!h) return;
        const d = Math.min(Math.hypot(h.x - x, h.y - y), Math.hypot(h.bx - x, h.by - y));
        if (d < bd) { bd = d; best = i; }
      });
      if (best > -1) return best;
      const ll = proj.invert([x, y]);
      if (!ll || d3.geoDistance(ll, proj.invert(proj.translate())) > 1.55) return -1;
      return shape.findIndex((f) => f && d3.geoContains(f, ll));
    }
    let drag = null;
    cv.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, y: e.clientY, r: rot.slice(), moved: false, last: e.clientX, id: e.pointerId };
      goal = null; vel = 0; lastTouch = performance.now();
    });
    cv.addEventListener('pointermove', (e) => {
      if (drag && drag.id === e.pointerId) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) > 5) { drag.moved = true; cv.setPointerCapture(e.pointerId); cv.classList.add('is-dragging'); }
        if (drag.moved) {
          const k = 70 / R;
          rot[0] = drag.r[0] + dx * k;
          if (e.pointerType === 'mouse') rot[1] = Math.max(-55, Math.min(55, drag.r[1] - dy * k));
          vel = (e.clientX - drag.last) * k * 0.6; drag.last = e.clientX; lastTouch = performance.now();
          run();
        }
      } else if (e.pointerType === 'mouse') {
        const [x, y] = at(e), h = pick(x, y, false);
        if (h !== hover) { hover = h; cv.style.cursor = h > -1 ? 'pointer' : ''; if (calm) draw(); }
      }
    });
    const end = (e) => {
      if (!drag || drag.id !== e.pointerId) return;
      cv.classList.remove('is-dragging');
      if (!drag.moved && e.type === 'pointerup') {
        const [x, y] = at(e), i = pick(x, y, e.pointerType !== 'mouse');
        if (i > -1) showCountry(i, true);
      }
      drag = null;
    };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    cv.addEventListener('pointerleave', () => { if (hover > -1) { hover = -1; cv.style.cursor = ''; } });

    size();
    goal = aim(active); goal[1] = 18; // arranca mirando América del Sur, sin zoom
    box.classList.add('globe-ready');
    run();
  }
})();
