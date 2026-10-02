// Coralia — idiomas. El español es el texto base de las páginas; las traducciones están en
// i18n/en.js, i18n/pt.js e i18n/de.js y se cargan solo si se eligió ese idioma.
// Va en el <head>: traduce el contenido a medida que el navegador arma la página y también
// lo que los scripts agregan después (fichas de países, casos, equipo, simuladores).
// Elegir idioma: ?lang=en en la dirección, o el selector del encabezado (queda guardado).
(() => {
  const LANGS = {
    es: { short: 'ES', name: 'Español', locale: 'es-AR' },
    en: { short: 'EN', name: 'English', locale: 'en-US' },
    pt: { short: 'PT', name: 'Português', locale: 'pt-BR' },
    de: { short: 'DE', name: 'Deutsch', locale: 'de-DE' },
  };
  const KEY = 'coralia-lang';
  const qs = new URLSearchParams(location.search).get('lang');
  let lang = qs;
  if (!LANGS[lang]) { try { lang = localStorage.getItem(KEY); } catch (e) { lang = null; } }
  if (!LANGS[lang] && qs !== 'collect') lang = 'es';
  if (qs === 'collect') lang = 'collect'; // solo para armar la lista de textos a traducir
  else { try { localStorage.setItem(KEY, lang); } catch (e) { /* sin almacenamiento: queda por esta visita */ } }

  const I18N = (window.I18N = { lang, langs: LANGS, locale: (LANGS[lang] || LANGS.es).locale, dict: {}, patterns: [], missing: new Set() });
  window.LOCALE = I18N.locale;
  document.documentElement.lang = lang === 'collect' ? 'es' : lang;

  // Cambiar de idioma: se recarga la misma página en el mismo lugar
  I18N.set = (l) => {
    if (!LANGS[l]) return;
    try { localStorage.setItem(KEY, l); sessionStorage.setItem('coralia-scroll', String(scrollY)); } catch (e) { /* nada */ }
    const u = new URL(location.href); u.searchParams.set('lang', l); location.href = u.href;
  };
  try {
    const y = sessionStorage.getItem('coralia-scroll');
    if (y) { sessionStorage.removeItem('coralia-scroll'); addEventListener('load', () => scrollTo({ top: +y, behavior: 'instant' })); }
  } catch (e) { /* nada */ }

  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const collect = lang === 'collect';
  // Traduce un texto suelto (también lo usan los scripts, por ejemplo el globo que dibuja en canvas)
  const T = (I18N.t = (s) => {
    if (lang === 'es' || s == null) return s;
    const k = norm(String(s)); if (!k || !/\p{L}/u.test(k)) return s;
    if (collect) { I18N.missing.add(k); return s; }
    if (Object.prototype.hasOwnProperty.call(I18N.dict, k)) return I18N.dict[k];
    for (const [re, rep] of I18N.patterns) { if (re.test(k)) return k.replace(re, rep); }
    // textos en mayúsculas armados por los scripts ("PROVINCIA DE MISIONES")
    if (k === k.toUpperCase() && k !== k.toLowerCase()) {
      if (!I18N.upper) { I18N.upper = {}; for (const [a, b] of Object.entries(I18N.dict)) I18N.upper[a.toUpperCase()] = b.toUpperCase(); }
      if (Object.prototype.hasOwnProperty.call(I18N.upper, k)) return I18N.upper[k];
    }
    // flechas o puntos alrededor ("· Texto →"): se traduce el texto del medio
    const m = k.match(/^([·→←↓↗×“”"📍\s]*)(.*?)([\s·→←↓↗×“”"]*)$/u);
    if (m && (m[1] || m[3]) && m[2]) { const c = T(m[2]); if (c !== m[2]) return m[1] + c + m[3]; }
    // textos compuestos ("Cliente · Proyecto", "Título | Coralia", "App: paso"): se traduce cada parte
    for (const sep of [' | ', ' · ', ' — ', ': ', ', ']) {
      const i = k.indexOf(sep); if (i < 0) continue;
      const first = T(k.slice(0, i)) + sep + T(k.slice(i + sep.length)); if (first !== k) return first; // "App: descripción: con dos puntos"
      const out = k.split(sep).map((x) => T(x)).join(sep); if (out !== k) return out;
    }
    I18N.missing.add(k);
    return s;
  });
  if (lang === 'es') return;
  if (!collect) document.write(`<script src="i18n/${lang}.js"><\/script>`);

  const INLINE = new Set(['B', 'STRONG', 'EM', 'I', 'SPAN', 'A', 'BR', 'SMALL', 'SUB', 'SUP', 'U', 'ABBR', 'CODE']);
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE']);
  const ATTRS = ['alt', 'aria-label', 'title', 'placeholder'];
  const done = new WeakMap(); // elemento → HTML que le pusimos (para no traducir dos veces)
  const hasOwnText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && /\p{L}/u.test(n.data));
  const isBlock = (el) => hasOwnText(el) && [...el.querySelectorAll('*')].every((c) => INLINE.has(c.tagName));
  const skip = (el) => !el || SKIP.has(el.tagName) || (el.closest && el.closest('[translate="no"], .notranslate'));

  function attrs(el) {
    ATTRS.forEach((a) => {
      const v = el.getAttribute && el.getAttribute(a); if (!v) return;
      const t = T(v); if (t !== v) el.setAttribute(a, t);
    });
  }
  function textNode(n) {
    const raw = n.data, k = norm(raw);
    // números con punto de miles escritos en la página (10.175.209): en inglés van con coma
    if (lang === 'en' && /^\d{1,3}(\.\d{3})+$/.test(k)) { n.data = raw.replace(k, k.replace(/\./g, ',')); return; }
    if (lang === 'en' && /^0,\d+$/.test(k)) { n.data = raw.replace(k, k.replace(',', '.')); return; }
    if (!k || !/\p{L}/u.test(k)) return;
    const t = T(k); if (t !== k) n.data = raw.replace(k, t);
  }
  function walk(root) {
    if (root.nodeType === 3) { if (!skip(root.parentElement)) textNode(root); return; }
    if (root.nodeType !== 1 || skip(root)) return;
    attrs(root);
    if (done.get(root) === root.innerHTML) return;
    if (isBlock(root)) {
      const k = norm(root.innerHTML);
      if (collect) { I18N.missing.add(k); return; }
      const t = T(k);
      if (t !== k) { root.innerHTML = t; done.set(root, root.innerHTML); [...root.querySelectorAll('*')].forEach(attrs); return; }
    }
    [...root.childNodes].forEach(walk);
  }
  I18N.run = walk;
  const ready = () => I18N.patterns = (I18N.patterns || []).map(([re, rep]) => [re instanceof RegExp ? re : new RegExp(re), rep]);

  // El título de la pestaña y la descripción
  const head = () => {
    const t = T(document.title); if (t !== document.title) document.title = t;
    const m = document.querySelector('meta[name="description"]'); if (m) { const d = T(m.content); if (d !== m.content) m.content = d; }
  };
  const mo = new MutationObserver((ms) => {
    ms.forEach((m) => {
      if (m.type === 'childList') {
        if (m.target.nodeName === 'TITLE') { head(); return; }
        const el = m.target.nodeType === 1 ? m.target : m.target.parentElement;
        // si el padre es un bloque de texto, se traduce entero; si no, solo lo agregado
        if (el && el !== document.body && isBlock(el)) walk(el); else m.addedNodes.forEach(walk);
      } else if (m.type === 'characterData') { const p = m.target.parentElement; if (p && !skip(p)) (isBlock(p) ? walk(p) : textNode(m.target)); }
      else if (m.type === 'attributes') attrs(m.target);
    });
  });
  mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  addEventListener('DOMContentLoaded', () => { ready(); head(); walk(document.body); });
  I18N.ready = ready;
})();
