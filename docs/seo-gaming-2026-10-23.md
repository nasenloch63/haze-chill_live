# Gaming, Wording und Auffindbarkeit

Stand: 23. Oktober 2026. Ziel: https://www.haze-chill.com
Repository: nasenloch63/haze-chill_live. Vercel-Projekt: Naser Solutions / haze-chill.

## Positionierung

Café & Gaming Lounge in Kassels Innenstadt. Gemeinsamer Abend an der PlayStation, Drinks, Snacks, Street Art und Terrasse. Gaming steht jetzt im Hero, in der Navigation und früh auf der Startseite. Eine eigene Seite /gaming-kassel verbindet das Angebot mit der Tischanfrage und der Speisekarte.

Keine unbelegten Versprechen über kostenlose Konsolen, fest verfügbare Spiele, Gaming-PCs, Turniere oder garantierte Fußballübertragungen. Eine Tischanfrage ersetzt keine bestätigte Konsolennutzung. Das Team stimmt Verfügbarkeit und Konditionen ab. Die bisherigen Angaben zu Xbox und Switch wurden auf das belegte PlayStation-Angebot begrenzt. Originalmedien, Logo, Farben und Schriftarten bleiben erhalten.

## Qualitative Recherche und Suchabsichten

| Suchabsicht | Formulierungen | Ziel |
| --- | --- | --- |
| Marke und Café | Haze & Chill Kassel, Haze and Chill, Café Kassel Innenstadt | Startseite |
| Konsole und Treffen | Gaming Lounge Kassel, Gaming Café Kassel, PlayStation spielen Kassel | Gaming-Seite |
| Besuch planen | Abend mit Freunden in Kassel, Drinks und Gaming | Gaming-Seite, Tischanfrage |
| Preise und Angebot | hausgemachter Eistee, Cocktails, Snacks, Speisekarte | Speisekarte |
| Besuchsinfos | Kölnische Straße, Öffnungszeiten, Terrasse | Standort und FAQ |

Untersuchte Primärquellen:
- https://malame-lounge.de/ueber-uns/ – Lounge mit mehreren Freizeitangeboten.
- https://www.arcadia-entertainment.de/playzone/standorte/kassel-city-point – Arcade und Attraktionen.
- https://www.gamer.now/kassel – aktive Gameshow für Gruppen.

Die Positionierung ist eine qualitative Ableitung aus den Angeboten und Suchergebnissen. Keine Suchvolumina oder Ranking-Prognosen wurden gemessen. Haze & Chill betont den gemeinsamen Konsolenabend im Café mit eigenen Räumen und Abendöffnungszeiten.

## Technische Umsetzung

- Eindeutige Canonicals, Titel, Beschreibungen, Open Graph und index/follow-Vorgaben.
- Lokale CafeOrCoffeeShop-Daten, PlayStation/Terrasse und vorhandene Tischanfrage; keine erfundenen Bewertungssterne.
- Gaming-Inhalt als statisches HTML mit Breadcrumbs und sinnvollen internen Links.
- JSON-LD-Escaping korrigiert und auf Skriptgrenzen sowie unveränderten Dateninhalt getestet.
- robots.txt erlaubt weiterhin alle User-Agents; keine Blockade von Such- oder KI-Crawlern.
- Sitemap enthält die Gaming-Seite und wahrheitsgemäße Änderungsdaten.
- /llms.txt und /llms-full.txt werden aus den aktuellen FAQ- und Menüdaten erzeugt, statt eine zweite Preisliste separat zu pflegen. Ein describedby-Link macht die Übersicht auffindbar.
- IndexNow-Verifikationsdatei und Einreichungsskript prüfen den Produktionshost, HTTP 200, Canonical und noindex vor dem Absenden.
- Next.js und ESLint-Config auf 16.4.3; gezielte Parser-Korrektur ohne Tailwind-4-Designmigration.
- DE/EN-Hero- und Lounge-Texte aktualisiert. Die neue Gaming-Seite ist wie bisherige statische Inhaltsbereiche ausdrücklich deutsch markiert. Keine erfundenen hreflang-URLs.

## Wiederholbare QA

- npm ci
- npm run qa – Lint, TypeScript, Reservierungs-/SEO-Tests, Build und initiales HTML.
- npx playwright install --with-deps chromium; npm run check:browser – sieben Seiten, vier Viewports (320/390/768/1440), Gaming-Navigation, simulierte Reservierung, No-JS und Crawler-Dateien.
- Auf Ubuntu 26 bei der vorhandenen Playwright-Version für Installation und Test PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 verwenden.
- npm audit
- npm run indexnow:dry, nach Veröffentlichung npm run indexnow:submit.

Browsertests fangen die Reservierungs-API ab. Dabei werden keine echten E-Mails verschickt; die bestehenden HTTP-/SMTP-Tests arbeiten mit Mocks.

## Betrieb und Grenzen

Google Search Console und Bing Webmaster Tools benötigen Zugriff auf die jeweilige Property. Dort Sitemap und Gaming-Seite prüfen. Google-Unternehmensprofil, Bing Places und Drittverzeichnisse sollten dieselben bestätigten Zeiten und dieselbe Adresse führen. Externe Verzeichnisse enthielten teils abweichende Öffnungszeiten; diese Profile wurden ohne bestätigte Eigentümer-Zugriffe nicht geändert.

Erfolg über reale Impressionen, Klicks, Indexstatus, Anfragen und Core Web Vitals beobachten. llms.txt ist eine zusätzliche Orientierung und ersetzt weder Sitemap noch crawlbares HTML. Google verlangt keine besondere KI-Datei. Veröffentlichung und IndexNow-Empfang garantieren weder Indexierung noch Rankings oder Erwähnungen in KI-Antworten.

Quellen:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- https://www.indexnow.org/documentation
- https://llmstxt.org/

Zusätzliche QA-Korrekturen: Der Hero respektiert reduzierte Bewegung mit einer ruhigen Farbfläche. Lange Überschriften auf Rechtsseiten können auf schmalen Displays umbrechen.
