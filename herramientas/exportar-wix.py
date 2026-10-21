"""Arma la carpeta de la web lista para subir a Wix (Wix Headless, «subir un sitio estático»).

Correr desde la carpeta de la web:   python3 herramientas/exportar-wix.py [carpeta de salida] [--final]
(sin carpeta, la arma en ../coralia-wix; además deja al lado un .zip para arrastrar en la página de Wix)

Sin --final, cada página lleva <meta name="robots" content="noindex">: es una copia de prueba y Google no
tiene que mostrarla. El día que la web pase a coraliae.com, exportar con --final.

Wix acepta hasta 20 MB en total y hasta 20 MB por archivo (dev.wix.com → What You Can Upload).
Copia los archivos de la web que están en git, menos lo que no va en Wix:
  - las notas y herramientas (LEEME, README, TRASPASO, herramientas/, i18n/fuente/);
  - lo que sólo sirve en Vercel: vercel.json, compartir/ y las imágenes para compartir de cada
    caso y proyecto (assets/compartir/caso-*, pipeline-*). En Wix queda la imagen general
    de cada página;
  - sitemap.xml y robots.txt, que apuntan a la web de prueba: se rehacen con el dominio
    propio (SITIO en herramientas/compartir.py) el día de la mudanza.
Al final dice cuánto pesa y si entra en el límite.
"""
import os, shutil, subprocess, sys

WEB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
args = [a for a in sys.argv[1:] if not a.startswith('--')]
FINAL = '--final' in sys.argv
SALIDA = os.path.abspath(args[0]) if args else os.path.join(os.path.dirname(WEB), 'coralia-wix')
LIMITE = 20_000_000   # 20 MB contados en decimal, el caso más estricto

FUERA_EXACTO = {'LEEME.md', 'README.md', 'TRASPASO.md', 'vercel.json', 'sitemap.xml', 'robots.txt', '.gitignore'}
FUERA_CARPETA = ('herramientas/', 'i18n/fuente/', 'compartir/', '.github/')


def va_en_wix(f):
    if f in FUERA_EXACTO or f.startswith(FUERA_CARPETA):
        return False
    if f.startswith('assets/compartir/') and os.path.basename(f).startswith(('caso-', 'pipeline-')):
        return False
    return True


archivos = subprocess.check_output(['git', 'ls-files'], cwd=WEB, text=True).split('\n')
archivos = [f for f in archivos if f and va_en_wix(f)]
if os.path.exists(SALIDA):
    shutil.rmtree(SALIDA)
total, mayor = 0, ('', 0)
for f in archivos:
    dst = os.path.join(SALIDA, f)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(os.path.join(WEB, f), dst)
    if not FINAL and f.endswith('.html'):
        html = open(dst, encoding='utf-8').read()
        if 'name="robots"' not in html:
            html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">', 1)
            open(dst, 'w', encoding='utf-8').write(html)
    t = os.path.getsize(dst)
    total += t
    if t > mayor[1]:
        mayor = (f, t)

mb = lambda b: f'{b / 1e6:.1f} MB'
print(f'{len(archivos)} archivos en {SALIDA}')
print(f'Total: {mb(total)} (límite de Wix: {mb(LIMITE)}) · el más pesado: {mayor[0]} ({mb(mayor[1])})')
print('Entra en Wix.' if total <= LIMITE else f'NO entra: sobran {mb(total - LIMITE)}.')
zip_ = shutil.make_archive(SALIDA, 'zip', SALIDA)
print(f'Zip para arrastrar en Wix: {zip_} ({mb(os.path.getsize(zip_))})' + ('' if FINAL else ' · copia de prueba, con noindex'))
