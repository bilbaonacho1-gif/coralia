"""Vista previa al compartir (WhatsApp, LinkedIn, etc.) y mapa del sitio para Google.

Correr desde la carpeta de la web:   python3 herramientas/compartir.py

Hace cuatro cosas:
1. En el <head> de cada página fija escribe las etiquetas og:/twitter: entre <!-- compartir:inicio --> y
   <!-- compartir:fin --> (si ya estaban, las reemplaza).
2. Arma las imágenes de 1200 × 630 en assets/compartir/ (foto + logo de Coralia).
3. Para cada caso y cada proyecto del pipeline escribe compartir/<página>-<id>.html: una hoja mínima con sus
   etiquetas. vercel.json se la muestra solo a los robots que arman la vista previa (por su user-agent); la gente
   ve siempre proyecto.html / pipeline.html normal.
4. Escribe sitemap.xml, robots.txt y vercel.json entero. Va con "routes" y no con "rewrites": en Vercel un archivo
   que existe (proyecto.html) gana sobre los rewrites, y las routes se miran antes. Por eso el noindex de la web de
   prueba también está acá (una route con headers y continue).

Volver a correrlo cuando cambie data.js (casos o pipeline) o cuando la web pase a su dominio definitivo:
alcanza con cambiar SITIO acá abajo.
"""
import html, json, os, re, subprocess
from PIL import Image, ImageDraw

SITIO = 'https://coralia-sooty.vercel.app'   # al conectar el dominio: 'https://www.coraliae.com'
WEB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(WEB)
NOMBRE = 'Coralia Environmental'
IDIOMAS = ['es', 'en', 'pt', 'de']

# Páginas fijas: archivo → (título, descripción, foto de base, imagen que se genera)
PAGINAS = {
    'index.html': ('Coralia Environmental — Consultoría ambiental y climática',
                   'Consultoría ambiental desde 2012: huella de carbono, mercados de carbono y riesgo climático, con plataformas propias para cada servicio.',
                   'assets/hero-portada.webp', 'inicio'),
    'proyectos.html': ('Proyectos | Coralia Environmental',
                       'Proyectos de Coralia Environmental en riesgo climático, huella de carbono y mercados de carbono.',
                       'assets/explora.jpg', 'proyectos'),
    'proyecto.html': ('Proyecto | Coralia Environmental',     # sin ?p= o con un id viejo (los casos tienen su hoja)
                      'Caso de Coralia Environmental.', 'assets/explora.jpg', 'proyectos'),
    'pipeline.html': ('Pipeline de proyectos | Coralia Environmental',
                      'Pipeline de proyectos de carbono propios de Coralia Environmental.',
                      'assets/pipeline/remonte-3.webp', 'pipeline'),
    'discover.html': ('Descubrí | Coralia Environmental',
                      'Descubrí tu camino climático con cinco evaluaciones rápidas de Coralia Environmental.',
                      'assets/hero-con.webp', 'descubri'),
    'ingresar.html': ('Iniciar sesión | Coralia Environmental',
                      'Ingresá a la plataforma de Coralia Environmental: Carbon Footprint, Carbon Markets Hub y Climate Risk.',
                      'assets/apps/fondo-footprint.webp', 'ingresar'),
    'privacidad.html': ('Política de privacidad | Coralia Environmental',
                        'Qué datos recolecta el sitio de Coralia Environmental, para qué y cómo ejercer tus derechos.',
                        None, 'inicio'),
    'terminos.html': ('Términos de uso | Coralia Environmental',
                      'Las condiciones para usar el sitio de Coralia Environmental, sus contenidos y sus evaluaciones rápidas.',
                      None, 'inicio'),
}
# En el mapa del sitio (las demás páginas fijas no: 404, servicio y simuladores son redirecciones o errores)
MAPA = ['index.html', 'proyectos.html', 'pipeline.html', 'discover.html', 'privacidad.html', 'terminos.html']

# Robots que arman la vista previa de un link (no los buscadores: esos ven la página normal)
ROBOTS = ['facebookexternalhit', 'Facebot', 'WhatsApp', 'LinkedInBot', 'Twitterbot', 'Slackbot', 'TelegramBot',
          'Discordbot', 'SkypeUriPreview', 'Pinterestbot', 'redditbot', 'Embedly', 'vkShare', 'Iframely']


def datos():
    """CASES y PIPELINE de data.js (lo corre node, igual que el navegador)."""
    js = ("const vm=require('vm'),fs=require('fs');const c={window:{},document:{}};vm.createContext(c);"
          "vm.runInContext(fs.readFileSync('data.js','utf8')+';this.__={casos:CASES,pipeline:PIPELINE}',c);"
          "process.stdout.write(JSON.stringify(c.__))")
    return json.loads(subprocess.check_output(['node', '-e', js], cwd=WEB))


def imagen(src, nombre):
    """Foto recortada a 1200 × 630 con el logo de Coralia en una pastilla blanca abajo a la izquierda."""
    os.makedirs('assets/compartir', exist_ok=True)
    out = f'assets/compartir/{nombre}.jpg'
    W, H = 1200, 630
    im = Image.open(src).convert('RGB')
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    im = im.crop((x, y, x + W, y + H)).convert('RGBA')
    logo = Image.open('assets/logo-oscuro.webp').convert('RGBA')   # letras oscuras, sobre la pastilla blanca
    lh = 72; logo = logo.resize((round(logo.width * lh / logo.height), lh), Image.LANCZOS)
    pad = 18; bw, bh = logo.width + 2 * pad, lh + 2 * pad
    capa = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(capa).rounded_rectangle((40, H - 40 - bh, 40 + bw, H - 40), radius=16, fill=(255, 255, 255, 240))
    capa.alpha_composite(logo, (40 + pad, H - 40 - bh + pad))
    im.alpha_composite(capa)
    # WhatsApp no muestra imágenes de más de ~300 KB: se baja la calidad hasta que entre
    for q in (82, 78, 74, 70):
        im.convert('RGB').save(out, 'JPEG', quality=q, optimize=True, progressive=True)
        if os.path.getsize(out) < 280_000: break
    return out


def etiquetas(titulo, desc, url, img, alt):
    e = lambda s: html.escape(s, quote=True)
    return '\n'.join([
        '<!-- compartir:inicio (lo escribe herramientas/compartir.py: no editar a mano) -->',
        f'<meta property="og:type" content="website">',
        f'<meta property="og:site_name" content="{NOMBRE}">',
        f'<meta property="og:locale" content="es_AR">',
        f'<meta property="og:title" content="{e(titulo)}">',
        f'<meta property="og:description" content="{e(desc)}">',
        f'<meta property="og:url" content="{e(url)}">',
        f'<meta property="og:image" content="{SITIO}/{img}">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        f'<meta property="og:image:alt" content="{e(alt)}">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<!-- compartir:fin -->'])


def poner_en_head(archivo, bloque):
    s = open(archivo, encoding='utf-8').read()
    viejo = re.compile(r'<!-- compartir:inicio.*?<!-- compartir:fin -->', re.S)
    if viejo.search(s):
        s = viejo.sub(lambda m: bloque, s)
    else:
        m = re.search(r'<meta name="description"[^>]*>\n', s) or re.search(r'<link rel="apple-touch-icon"[^>]*>\n', s)
        s = s[:m.end()] + bloque + '\n' + s[m.end():]
    open(archivo, 'w', encoding='utf-8').write(s)


def hoja(titulo, desc, url, img, alt, destino):
    """Página mínima que solo leen los robots de vista previa (si una persona llega, la manda a la de verdad)."""
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>{html.escape(titulo)}</title>
<meta name="description" content="{html.escape(desc, quote=True)}">
<meta name="robots" content="noindex">
{etiquetas(titulo, desc, url, img, alt)}
<meta http-equiv="refresh" content="0; url={destino}">
</head>
<body><a href="{destino}">{html.escape(titulo)}</a></body>
</html>
'''


def main():
    D = datos()
    hechas = {}
    def img_de(src, nombre):
        if nombre not in hechas: hechas[nombre] = imagen(src, nombre)
        return hechas[nombre]

    # 1 y 2: páginas fijas
    for f, (t, d, src, nombre) in PAGINAS.items():
        img = img_de(src, nombre) if src else hechas.get(nombre) or img_de(PAGINAS['index.html'][2], nombre)
        url = f'{SITIO}/' if f == 'index.html' else f'{SITIO}/{f}'
        poner_en_head(f, etiquetas(t, d, url, img, t.split(' | ')[0]))

    # 3: una hoja por caso y por proyecto del pipeline
    os.makedirs('compartir', exist_ok=True)
    for viejo in os.listdir('compartir'): os.remove(os.path.join('compartir', viejo))
    ids = {'proyecto': [], 'pipeline': []}
    for c in D['casos']:
        t = f"{c['client']} · {c['title']} | {NOMBRE}"
        # primera foto de la galería: algunas fotos de portada traen el logo del cliente encima
        img = img_de((c.get('gallery') or [None])[0] or c.get('hero') or c['img'], f"caso-{c['id']}")
        dest = f"/proyecto.html?p={c['id']}"
        open(f"compartir/proyecto-{c['id']}.html", 'w', encoding='utf-8').write(
            hoja(t, c['short'], SITIO + dest, img, f"{c['client']}: {c['title']}", dest))
        ids['proyecto'].append(c['id'])
    for p in D['pipeline']:
        t = f"{p['name']} · Pipeline | {NOMBRE}"
        desc = (p.get('card') or {}).get('desc') or ''
        if 'a confirmar' in desc.lower(): desc = f"{p['type']} · {p['place']}. Proyecto de carbono de {NOMBRE}."
        src = p.get('img') or (p.get('gallery') or [None])[0]
        img = img_de(src, f"pipeline-{p['id']}") if src else img_de(PAGINAS['pipeline.html'][2], 'pipeline')
        dest = f"/pipeline.html?p={p['id']}"
        open(f"compartir/pipeline-{p['id']}.html", 'w', encoding='utf-8').write(
            hoja(t, desc, SITIO + dest, img, f"{p['name']} ({p['place']})", dest))
        ids['pipeline'].append(p['id'])

    # 4: vercel.json (rewrites para robots), sitemap.xml y robots.txt
    ua = '.*(' + '|'.join(ROBOTS) + ').*'
    v = {'$schema': 'https://openapi.vercel.sh/vercel.json', 'routes': [
        # web de prueba (*.vercel.app) fuera de los buscadores; con el dominio propio no aplica
        {'src': '/(.*)', 'has': [{'type': 'host', 'value': '.*\\.vercel\\.app'}],
         'headers': {'X-Robots-Tag': 'noindex, nofollow'}, 'continue': True},
    ] + [{
        'src': f'/{pag}\\.html',
        'has': [{'type': 'query', 'key': 'p', 'value': '(?<id>' + '|'.join(lista) + ')'},
                {'type': 'header', 'key': 'user-agent', 'value': ua}],
        'dest': f'/compartir/{pag}-$id.html'} for pag, lista in ids.items()]}
    open('vercel.json', 'w', encoding='utf-8').write(json.dumps(v, ensure_ascii=False, indent=2) + '\n')

    urls = [f'{SITIO}/' if f == 'index.html' else f'{SITIO}/{f}' for f in MAPA]
    urls += [f'{SITIO}/proyecto.html?p={i}' for i in ids['proyecto']] + [f'{SITIO}/pipeline.html?p={i}' for i in ids['pipeline']]
    def alt(u):
        sep = '&amp;' if '?' in u else '?'
        return ''.join(f'\n    <xhtml:link rel="alternate" hreflang="{l}" href="{html.escape(u)}{sep}lang={l}"/>' for l in IDIOMAS)
    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<!-- Lo escribe herramientas/compartir.py. Cada página está en los 4 idiomas con ?lang= -->',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    xml += [f'  <url>\n    <loc>{html.escape(u)}</loc>{alt(u)}\n  </url>' for u in urls]
    xml.append('</urlset>')
    open('sitemap.xml', 'w', encoding='utf-8').write('\n'.join(xml) + '\n')
    open('robots.txt', 'w', encoding='utf-8').write(f'User-agent: *\nAllow: /\n\nSitemap: {SITIO}/sitemap.xml\n')

    print(len(PAGINAS), 'páginas fijas,', len(ids['proyecto']), 'casos,', len(ids['pipeline']), 'del pipeline,',
          len(hechas), 'imágenes, sitio:', SITIO)


main()
