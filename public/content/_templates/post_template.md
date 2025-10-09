## <!-- public/content/_templates/post_template.md -->

title: "TITEL DES BEITRAGS"
date: 2025-01-01
updated: 2025-01-01
tags:

- Kategorie
- Stichwort
- Technologie
  draft: false
  cover: ./cover.webp
  excerpt: "Kurzer, prägnanter Teaser in 1–2 Sätzen. Max. ~160 Zeichen."
  canonicalUrl:

---

<!--
ANLEITUNG
1) Ordnerstruktur:
   public/content/<category>/<YYYYMMDD_slug>/
   Beispiel:
   public/content/meta/20250101_hallo_welt/
     ├─ index.md        ← diese Datei
     ├─ cover.webp      ← Titelbild (wird im Header/OG genutzt)
     ├─ screenshot-1.webp
     └─ weitere Assets…

2) Frontmatter:
   - title: Klarer, suchbarer Titel.
   - date/updated: ISO-Datum (YYYY-MM-DD).
   - tags: Liste aus 1–6 Schlagwörtern.
   - draft: true/false. Drafts werden nicht gelistet.
   - cover: Relativer Pfad zum Titelbild im selben Ordner (./cover.webp).
   - excerpt: Kurzer Teaser (auch für SEO/OG Description).
   - canonicalUrl: Optional – absolut oder relativ (wird automatisch absolut gemacht).

3) Bilder im Text:
   Einfach als Markdown einfügen, die Pfade relativ zum Ordner halten:
   ![Alt-Text](./screenshot-1.webp "Optionale Bildunterschrift")

   Die Build-Pipeline hängt automatisch den Repo-Prefix an und öffnet eine Lightbox.

4) Formatierung:
   - Zwischenüberschriften mit ##, ### …
   - Codeblöcke mit ```lang
   - Zitate mit >
   - Callouts:
     :::note Titel
     Inhalt
     :::

Los geht’s:
-->

# Hauptüberschrift

Einführung in das Thema. Kurzer Kontext und Nutzenversprechen.

## Abschnitt 1

Fließtext mit klaren Aussagen. Optionales Bild:

![Beschreibung](./screenshot-1.webp 'Kurze Caption zum Bild')

## Abschnitt 2

Weitere Details, Beispiele, Bullet-Points:

- Punkt 1
- Punkt 2
- Punkt 3

> Kurzes Zitat oder Merksatz.

## Fazit

Kernbotschaft und evtl. Ausblick.
