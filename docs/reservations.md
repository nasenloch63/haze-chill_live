# Tischreservierungsanfragen

Die Hero-Aktion führt zu `/#reservation`. Die Formularsektion steht direkt über der Speisekarte. Name, E-Mail, Abenddatum, Ankunft und Personenzahl sind erforderlich; Telefon und Nachricht optional. Es werden Anfragen verschickt, keine automatischen Tischzusagen. Uhrzeiten von 00:00 bis 01:30 beziehen sich auf die Nacht nach dem ausgewählten Abenddatum, Zeitzone Europe/Berlin.

`POST /api/reservations` validiert Angaben serverseitig und sendet über Nodemailer an `RESERVATION_RECIPIENT_EMAIL` (Standard: info@naser-solutions.de). Jede Anfrage wird zusätzlich in CC an habibhayati85@icloud.com gesendet. Dafür ist keine zusätzliche Umgebungsvariable erforderlich; die CC-Adresse wird serverseitig festgelegt und kann nicht durch Formulareingaben geändert werden. Der Absender kommt aus `SMTP_FROM` oder `SMTP_USER`; die E-Mail des Gastes wird nur als Reply-To verwendet. SMTP akzeptiert die Nachricht, bevor die Route Erfolg meldet. Eine SMTP-Annahme ist keine Garantie für den späteren Posteingang und keine Reservierungsbestätigung.

Die bestehenden Vercel-Variablen `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER` und `SMTP_PASS` werden genutzt. `.env.example` enthält die benötigten Schlüssel ohne Zugangsdaten. Niemals SMTP-Zugangsdaten mit `NEXT_PUBLIC_` veröffentlichen. Port 465 nutzt direkte TLS-Verschlüsselung; andere Ports verlangen STARTTLS. Zertifikatsprüfung bleibt aktiv.

Der bisherige statische Export wurde entfernt, damit Next.js die POST-Route als Node.js-Function betreiben kann. Die öffentlichen Seiten bleiben statisch vorgerendert. HTML-SEO-Prüfungen lesen jetzt `.next/server/app` statt veralteter `out`-Dateien.

Abwehr einfacher Spam-Anfragen: Honeypot, Prüfung des Ursprungs, maximal 8 KB Request-Body, begrenzte Feldlängen, feste Empfängeradresse und bis zu drei Anfragen pro IP in 15 Minuten je Function-Instanz. Der flüchtige IP-Zähler ist kein globales verteiltes Rate-Limit; bei tatsächlichem Missbrauch Vercel-WAF oder einen gemeinsamen Rate-Limit-Speicher ergänzen. Es werden keine Kontaktdaten oder SMTP-Passwörter geloggt und keine automatischen Nachrichten an frei eingegebene Gastadressen gesendet.

Tests: `node --conditions=react-server --import tsx --test tests/reservations.test.mjs`, TypeScript, ESLint, `next build`, `node scripts/check-seo.mjs` und Browserprüfung auf Desktop/Mobil. Automatisierte Tests ersetzen den SMTP-Transport durch einen kontrollierten Testadapter; sie verschicken keine externen E-Mails.
