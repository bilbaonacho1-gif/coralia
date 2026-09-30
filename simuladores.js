// Coralia — página de simuladores
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = (n, d = 0) => n.toLocaleString('es-AR', { maximumFractionDigits: d, minimumFractionDigits: d });
const val = (k) => +$(`[data-in="${k}"]`).value;

/* Aparición al scrollear */
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
}), { threshold: 0.12 }) : null;
$$('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-visible')));

/* Elegir simulador: tarjetas de arriba. Link directo: simuladores.html#trayectoria o #neutralidad */
const picks = $$('[data-sim]');
function pick(k, scroll) {
  const b = picks.find((x) => x.dataset.sim === k) || picks[0];
  picks.forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
  $$('[data-simpane]').forEach((p) => { p.hidden = p.dataset.simpane !== b.dataset.sim; });
  history.replaceState(null, '', '#' + b.dataset.hash);
  if (scroll && window.innerWidth < 1000) $(`[data-simpane="${b.dataset.sim}"]`).scrollIntoView({ behavior: 'smooth', block: 'start' });
}
picks.forEach((b) => b.addEventListener('click', () => pick(b.dataset.sim, true)));
const fromHash = () => { const b = picks.find((x) => '#' + x.dataset.hash === location.hash); if (b) pick(b.dataset.sim, false); };
addEventListener('hashchange', fromHash);

// Trayectoria de reducción
const BASE_YEAR = 2026, REF_RATE = 0.042;
function calcPath() {
  const base = val('pBase'), year = val('pYear'), pct = val('pPct') / 100;
  $('[data-out="pBase"]').textContent = fmt(base) + ' tCO₂e';
  $('[data-out="pYear"]').textContent = year;
  $('[data-out="pPct"]').textContent = Math.round(pct * 100) + ' %';
  const n = year - BASE_YEAR, end = base * (1 - pct), yearly = (base - end) / n, rate = pct / n;
  $('#pYearly').textContent = fmt(yearly); $('#pEnd').textContent = fmt(end); $('#pRate').textContent = fmt(rate * 100, 1) + ' %';
  const refEnd = Math.max(0, base * (1 - REF_RATE * n));
  $('#pInsight').textContent = rate >= REF_RATE
    ? `Tu meta reduce ${fmt(rate * 100, 1)} % por año: igual o más rápido que el ritmo de referencia 1,5 °C (${fmt(REF_RATE * 100, 1)} %).`
    : `Tu meta reduce ${fmt(rate * 100, 1)} % por año, por debajo del ritmo de referencia 1,5 °C. Para alinearla, en ${year} deberías llegar a ${fmt(refEnd)} tCO₂e.`;
  // gráfico
  const W = 520, H = 240, L = 46, R = 22, T = 14, B = 30, maxY = base * 1.05;
  const X = (y) => L + (y - BASE_YEAR) / (2050 - BASE_YEAR) * (W - L - R);
  const Y = (v) => T + (1 - v / maxY) * (H - T - B);
  const grid = [0, .25, .5, .75, 1].map((f) => `<line x1="${L}" x2="${W - R}" y1="${Y(maxY * f)}" y2="${Y(maxY * f)}" class="g"/><text x="${L - 6}" y="${Y(maxY * f) + 4}" class="ax" text-anchor="end">${fmt(maxY * f / 1000)}k</text>`).join('');
  const years = [2026, 2030, 2035, 2040, 2045, 2050].map((y) => `<text x="${X(y)}" y="${H - 8}" class="ax" text-anchor="middle">${y}</text>`).join('');
  const refY = Math.min(2050, BASE_YEAR + 1 / REF_RATE);
  const ref = `<polyline class="ref" points="${X(BASE_YEAR)},${Y(base)} ${X(refY)},${Y(Math.max(0, base * (1 - REF_RATE * (refY - BASE_YEAR))))}"/>`;
  const area = `<polygon class="area" points="${X(BASE_YEAR)},${Y(0)} ${X(BASE_YEAR)},${Y(base)} ${X(year)},${Y(end)} ${X(year)},${Y(0)}"/>`;
  const path = `<polyline class="plan" points="${X(BASE_YEAR)},${Y(base)} ${X(year)},${Y(end)}"/><circle cx="${X(year)}" cy="${Y(end)}" r="5" class="pt"/>`;
  const leg = `<g class="leg"><line x1="${W - 190}" x2="${W - 170}" y1="16" y2="16" class="plan"/><text x="${W - 165}" y="20">Tu meta</text><line x1="${W - 110}" x2="${W - 90}" y1="16" y2="16" class="ref"/><text x="${W - 85}" y="20">Ref. 1,5 °C</text></g>`;
  $('#pChart').innerHTML = grid + years + area + ref + path + leg;
}
$('[data-simpane="path"]').addEventListener('input', calcPath);
calcPath();

// Neutralidad y créditos (precios de referencia Sylvera, 1T 2026)
const P_STD = 5.7, P_HQ = 20;
function calcOffset() {
  const t = val('oTon'), hq = val('oHq') / 100;
  $('[data-out="oTon"]').textContent = fmt(t) + ' tCO₂e';
  $('[data-out="oHq"]').textContent = Math.round(hq * 100) + ' %';
  const cHq = t * hq * P_HQ, cStd = t * (1 - hq) * P_STD, tot = cHq + cStd;
  $('#oCost').textContent = fmt(tot); $('#oHqCost').textContent = fmt(cHq); $('#oStdCost').textContent = fmt(cStd);
  $('#oBarHq').style.width = (tot ? cHq / tot * 100 : 0) + '%'; $('#oBarStd').style.width = (tot ? cStd / tot * 100 : 0) + '%';
  $('#oInsight').textContent = `Con ${Math.round(hq * 100)} % de créditos de alta calidad, el costo es de USD ${fmt(tot / t, 1)} por tonelada. Solo con créditos promedio sería USD ${fmt(t * P_STD)}; todo en alta calidad, USD ${fmt(t * P_HQ)}.`;
}
$('[data-simpane="offset"]').addEventListener('input', calcOffset);
calcOffset();

fromHash();
