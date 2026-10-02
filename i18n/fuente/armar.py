#!/usr/bin/env python3
"""Arma i18n/en.js, i18n/pt.js e i18n/de.js a partir de las tablas de esta carpeta.
Uso: python3 i18n/fuente/armar.py
Cada tabla (1-*.py, 2-*.py, ...) tiene filas (español, inglés, portugués, alemán).
Los textos con números que cambian (contadores, simuladores) están como patrones más abajo."""
import json, os, glob, runpy

AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.dirname(AQUI)
COL = {'en': 1, 'pt': 2, 'de': 3}

# Patrones: [expresión regular sobre el texto en español, función JS que arma la traducción]
PATRONES = {
'en': r'''
  [/^1 trabajo$/, () => '1 engagement'],
  [/^(\d+) trabajos$/, (m, n) => `${n} engagements`],
  [/^1 proyecto$/, () => '1 project'],
  [/^(\d+) proyectos$/, (m, n) => `${n} projects`],
  [/^(\d+)°([NS]) · (\d+)°([EO])$/, (m, a, b, c, d) => `${a}°${b} · ${c}°${d === 'O' ? 'W' : 'E'}`],
  [/^([\d.,]+) mil m³$/, (m, n) => `${n} thousand m³`],
  [/^USD ([\d.,]+) mil$/, (m, n) => `USD ${n} thousand`],
  [/^Ver imagen (\d+)$/, (m, n) => `View image ${n}`],
  [/^LinkedIn de (.+)$/, (m, n) => `${n}'s LinkedIn`],
  [/^La mayor fuente es (la electricidad|el gas natural|la flota|los vuelos|las compras): (\d+)% del total\. Ahí suele estar la primera palanca de reducción\.$/,
    (m, s, n) => `The largest source is ${{ 'la electricidad': 'electricity', 'el gas natural': 'natural gas', 'la flota': 'the fleet', 'los vuelos': 'flights', 'las compras': 'purchases' }[s]}: ${n}% of the total. That is usually the first lever for cutting emissions.`],
  [/^Medida de adaptación posible: (.+)$/, (m, x) => `Possible adaptation measure: ${I18N.t(x)}`],
  [/^Tu meta reduce ([\d.,]+) % por año: igual o más rápido que el ritmo de referencia 1,5 °C \(([\d.,]+) %\)\.$/,
    (m, a, b) => `Your target cuts ${a}% per year: as fast as or faster than the 1.5 °C benchmark pace (${b}%).`],
  [/^Tu meta reduce ([\d.,]+) % por año, por debajo del ritmo de referencia 1,5 °C\. Para alinearla, en (\d{4}) deberías llegar a ([\d.,]+) tCO₂e\.$/,
    (m, a, y, z) => `Your target cuts ${a}% per year, below the 1.5 °C benchmark pace. To align it, by ${y} you should reach ${z} tCO₂e.`],
  [/^Con (\d+) % de créditos de alta calidad, el costo es de USD ([\d.,]+) por tonelada\. Solo con créditos promedio sería USD ([\d.,]+); todo en alta calidad, USD ([\d.,]+)\.$/,
    (m, p, a, b, c) => `With ${p}% high-quality credits, the cost is USD ${a} per tonne. With average credits only it would be USD ${b}; all high quality, USD ${c}.`],
''',
'pt': r'''
  [/^1 trabajo$/, () => '1 trabalho'],
  [/^(\d+) trabajos$/, (m, n) => `${n} trabalhos`],
  [/^1 proyecto$/, () => '1 projeto'],
  [/^(\d+) proyectos$/, (m, n) => `${n} projetos`],
  [/^(\d+)°([NS]) · (\d+)°([EO])$/, (m, a, b, c, d) => `${a}°${b} · ${c}°${d === 'O' ? 'O' : 'L'}`],
  [/^([\d.,]+) mil m³$/, (m, n) => `${n} mil m³`],
  [/^USD ([\d.,]+) mil$/, (m, n) => `USD ${n} mil`],
  [/^Ver imagen (\d+)$/, (m, n) => `Ver imagem ${n}`],
  [/^LinkedIn de (.+)$/, (m, n) => `LinkedIn de ${n}`],
  [/^La mayor fuente es (la electricidad|el gas natural|la flota|los vuelos|las compras): (\d+)% del total\. Ahí suele estar la primera palanca de reducción\.$/,
    (m, s, n) => `A maior fonte é ${{ 'la electricidad': 'a eletricidade', 'el gas natural': 'o gás natural', 'la flota': 'a frota', 'los vuelos': 'os voos', 'las compras': 'as compras' }[s]}: ${n}% do total. Geralmente é aí que está a primeira alavanca de redução.`],
  [/^Medida de adaptación posible: (.+)$/, (m, x) => `Medida de adaptação possível: ${I18N.t(x)}`],
  [/^Tu meta reduce ([\d.,]+) % por año: igual o más rápido que el ritmo de referencia 1,5 °C \(([\d.,]+) %\)\.$/,
    (m, a, b) => `Sua meta reduz ${a}% ao ano: igual ou mais rápido que o ritmo de referência de 1,5 °C (${b}%).`],
  [/^Tu meta reduce ([\d.,]+) % por año, por debajo del ritmo de referencia 1,5 °C\. Para alinearla, en (\d{4}) deberías llegar a ([\d.,]+) tCO₂e\.$/,
    (m, a, y, z) => `Sua meta reduz ${a}% ao ano, abaixo do ritmo de referência de 1,5 °C. Para alinhá-la, em ${y} você deveria chegar a ${z} tCO₂e.`],
  [/^Con (\d+) % de créditos de alta calidad, el costo es de USD ([\d.,]+) por tonelada\. Solo con créditos promedio sería USD ([\d.,]+); todo en alta calidad, USD ([\d.,]+)\.$/,
    (m, p, a, b, c) => `Com ${p}% de créditos de alta qualidade, o custo é de USD ${a} por tonelada. Só com créditos médios seria USD ${b}; tudo em alta qualidade, USD ${c}.`],
''',
'de': r'''
  [/^1 trabajo$/, () => '1 Auftrag'],
  [/^(\d+) trabajos$/, (m, n) => `${n} Aufträge`],
  [/^1 proyecto$/, () => '1 Projekt'],
  [/^(\d+) proyectos$/, (m, n) => `${n} Projekte`],
  [/^(\d+)°([NS]) · (\d+)°([EO])$/, (m, a, b, c, d) => `${a}°${b} · ${c}°${d === 'O' ? 'W' : 'O'}`],
  [/^([\d.,]+) mil m³$/, (m, n) => `${n} Tsd. m³`],
  [/^USD ([\d.,]+) mil$/, (m, n) => `${n} Tsd. USD`],
  [/^Ver imagen (\d+)$/, (m, n) => `Bild ${n} ansehen`],
  [/^LinkedIn de (.+)$/, (m, n) => `LinkedIn von ${n}`],
  [/^La mayor fuente es (la electricidad|el gas natural|la flota|los vuelos|las compras): (\d+)% del total\. Ahí suele estar la primera palanca de reducción\.$/,
    (m, s, n) => `Die größte Quelle ist ${{ 'la electricidad': 'der Strom', 'el gas natural': 'das Erdgas', 'la flota': 'die Fahrzeugflotte', 'los vuelos': 'die Flüge', 'las compras': 'der Einkauf' }[s]}: ${n} % der Gesamtmenge. Dort liegt meist der erste Hebel zur Reduktion.`],
  [/^Medida de adaptación posible: (.+)$/, (m, x) => `Mögliche Anpassungsmaßnahme: ${I18N.t(x)}`],
  [/^Tu meta reduce ([\d.,]+) % por año: igual o más rápido que el ritmo de referencia 1,5 °C \(([\d.,]+) %\)\.$/,
    (m, a, b) => `Ihr Ziel reduziert ${a} % pro Jahr: gleich schnell oder schneller als das 1,5-°C-Referenztempo (${b} %).`],
  [/^Tu meta reduce ([\d.,]+) % por año, por debajo del ritmo de referencia 1,5 °C\. Para alinearla, en (\d{4}) deberías llegar a ([\d.,]+) tCO₂e\.$/,
    (m, a, y, z) => `Ihr Ziel reduziert ${a} % pro Jahr und liegt unter dem 1,5-°C-Referenztempo. Um es anzugleichen, sollten Sie ${y} bei ${z} tCO₂e liegen.`],
  [/^Con (\d+) % de créditos de alta calidad, el costo es de USD ([\d.,]+) por tonelada\. Solo con créditos promedio sería USD ([\d.,]+); todo en alta calidad, USD ([\d.,]+)\.$/,
    (m, p, a, b, c) => `Mit ${p} % hochwertigen Zertifikaten kostet es ${a} USD pro Tonne. Nur mit durchschnittlichen Zertifikaten wären es ${b} USD; alles hochwertig, ${c} USD.`],
''',
}

def normalizar(s):
    return ' '.join(s.split())

def main():
    filas = []
    for f in sorted(glob.glob(os.path.join(AQUI, '[0-9]-*.py'))):
        filas += runpy.run_path(f)['T']
    vistos = {}
    for fila in filas:
        assert len(fila) == 4, fila
        es = normalizar(fila[0])
        if es in vistos and vistos[es] != fila:
            print('aviso: texto repetido con traducción distinta:', es[:70])
        vistos[es] = fila
    for lang, col in COL.items():
        d = {normalizar(f[0]): f[col] for f in vistos.values() if normalizar(f[0]) != f[col]}
        js = ('// Generado por i18n/fuente/armar.py — no editar a mano: editá las tablas en i18n/fuente/\n'
              '(() => {\n  const I18N = window.I18N;\n'
              f'  Object.assign(I18N.dict, {json.dumps(d, ensure_ascii=False, indent=0)});\n'
              f'  I18N.patterns.push({PATRONES[lang]}  );\n'
              '})();\n')
        with open(os.path.join(SALIDA, f'{lang}.js'), 'w', encoding='utf-8') as fh:
            fh.write(js)
        print(lang, len(d), 'textos')

main()
