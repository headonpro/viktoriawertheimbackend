Anweisungsdatei: Relaunch der Vereins-Webseite (Mobile-First)
Dies ist ein Schritt-für-Schritt-Plan zur Entwicklung der neuen Vereins-Webseite basierend auf dem Product Requirement Document (PRD) Version 1.1.

## Wichtiger Hinweis zu Tool-Installationen
**Bei allen Installationen von Dependencies und Tools sollte immer die neueste Version verwendet werden, um sicherzustellen, dass alle Komponenten auf dem aktuellsten Stand sind.** Dies gilt für alle npm-Pakete, CLI-Tools und andere Abhängigkeiten, die in diesem Leitfaden installiert werden. Verwende stets die `@latest` Flags oder überprüfe die neuesten Versionen in der jeweiligen Dokumentation.

Phase 1: Projekt-Setup & Backend-Konfiguration (Woche 1-2)

Schritt 1.1: Next.js Projekt initialisieren
Erstelle ein neues Next.js-Projekt.
Integriere Tailwind CSS während des Setups.
Installiere framer-motion für Animationen und axios (oder verwende fetch) für API-Anfragen.

npx create-next-app@latest viktoria-wertheim-website --typescript --tailwind --eslint
cd viktoria-wertheim-website
npm install framer-motion axios

Schritt 1.2: Ordnerstruktur anlegen
Erstelle im src-Ordner (oder im Root) folgende Verzeichnisse:
components: Für wiederverwendbare React-Komponenten (z.B. Button.tsx, Header.tsx).
app: Next.js App Router Verzeichnis.
lib: Für Hilfsfunktionen (z.B. API-Anfragen an Strapi).
types: Für TypeScript-Typdefinitionen (z.B. strapi.ts).

Schritt 1.3: Strapi Backend aufsetzen
Erstelle ein neues Strapi-Projekt in einem separaten Ordner.
Starte den Strapi-Server mit PostgreSQL für Production-Readiness.

npx create-strapi-app@latest viktoria-wertheim-backend --dbclient=postgres --dbhost=localhost --dbport=5432 --dbname=strapi --dbusername=postgres --dbpassword=yourpassword

Hinweis: Erstelle eine .env-Datei im Backend-Ordner für sichere Konfiguration:
STRAPI_ADMIN_JWT_SECRET=your-secret-key
STRAPI_JWT_SECRET=your-jwt-secret
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword

Schritt 1.4: Content-Typen in Strapi anlegen (gemäß PRD 6.0)
Navigiere zum "Content-Type Builder" im Strapi Admin-Panel.
Erstelle folgende "Collection Types":

News-Artikel:
Titel: Text (Short text)
Inhalt: Rich Text (Markdown)
Titelbild: Media (Single media)
Datum: Date
Kategorie: Relation (hat eine Beziehung zu "Kategorie")

Kategorie: (Für News)
Name: Text (Short text)

Mannschaft:
Name: Text (Short text)
Teamfoto: Media (Single media)
Trainer: Text (Short text)
Ligazugehörigkeit: Text (Short text)

Spieler:
Vorname: Text (Short text)
Nachname: Text (Short text)
Position: Enumeration (Torwart, Abwehr, Mittelfeld, Sturm)
Foto: Media (Single media)
Mannschaft: Relation (hat eine Beziehung zu "Mannschaft")

Spiel:
Datum: DateTime
Heimmannschaft: Text (Short text)
Auswärtsmannschaft: Text (Short text)
ToreHeim: Integer
ToreAuswärts: Integer
Mannschaft: Relation (hat eine Beziehung zu "Mannschaft")

Schritt 1.5: API-Berechtigungen in Strapi setzen
Gehe zu Settings > Roles > Public.
Gib Lesezugriff (find, findOne) für alle erstellten Content-Typen frei, damit das Frontend die Daten abrufen kann.

Erstelle einen API-Token für sichere Frontend-Anfragen:
Gehe zu Settings > API Tokens.
Erstelle einen neuen Token mit "Full access" für Development oder "Custom" mit nur Leseberechtigungen für Production.

Konfiguriere CORS für Frontend-Zugriff:
Gehe zu Settings > Global Settings > Security Headers.
Füge deine Frontend-Domain zur CORS-Liste hinzu (z.B. http://localhost:3000 für Development).

Phase 2: Mobile Frontend-Entwicklung (MVP) (Woche 3-6)
Fokus: Alle Komponenten und Seiten werden ausschließlich für die mobile Ansicht entwickelt.

Schritt 2.1: Layout und Mobile Navigation
Erstelle in app/layout.tsx das Hauptlayout.
Implementiere eine fixierte untere Navigationsleiste (components/MobileNav.tsx) mit 3-4 Icons für die wichtigsten Seiten (Home, News, Spiele, Teams).
Erstelle eine Header-Komponente (components/Header.tsx) mit dem Vereinslogo und einem Burger-Menü-Icon.
Das Burger-Menü öffnet ein seitliches Overlay (components/SideMenu.tsx) für sekundäre Links.

Schritt 2.2: Homepage (app/page.tsx)
Baue die Homepage mit einem vertikalen Layout.
Hero-Bereich: Animiertes Vereinslogo oder Slogan.
Nächstes Spiel: Eine prominente Kachel, die die Daten des nächsten Spiels der 1. Mannschaft anzeigt.
Neueste Nachrichten: Eine Liste von 2-3 touch-freundlichen Kacheln, die zu den Artikeln verlinken.
Letzte Ergebnisse: Eine kompakte Liste der letzten 2-3 Spielergebnisse.
Sponsoren-Slider: Ein einfacher, touch-fähiger Slider am unteren Rand.
Animation: Implementiere "on-scroll" fade-in/slide-in Animationen für jede Sektion mit framer-motion.

Schritt 2.3: News-System (app/news/page.tsx & app/news/[slug]/page.tsx)
Übersichtsseite:
Einspaltiges Layout.
Liste aller News-Artikel (Titelbild, Titel, Datum).
Filter-Buttons für Kategorien.

Detailseite:
Große, gut lesbare Schrift.
Titelbild oben, gefolgt von Titel, Datum und Rich-Text-Inhalt.
Bilder im Artikelinhalt sollen als touch-fähiger Slider angezeigt werden.
Animation: Sanfte Seitentransfers zwischen Übersichts- und Detailseite.

Schritt 2.4: Mannschaften (app/teams/page.tsx & app/teams/[slug]/page.tsx)
Übersichtsseite:
Kompakte, untereinander angeordnete Team-Kacheln (Teamfoto, Name).

Detailseite:
Teamfoto, Name, Trainer, Liga.
Kaderliste: Vertikal scrollbare Liste der Spieler (Foto, Name, Position). Kein Grid!
Animation: "Tap"-Animation auf Spielerbild, die eventuell mehr Details anzeigt.

Schritt 2.5: Spielplan & Ergebnisse (app/fixtures/page.tsx)
Erstelle eine Seite, die über zwei Buttons/Tabs zwischen "Spielplan" und "Ergebnisse" umschaltet.
Darstellung: Kompakte Listenansicht. Jedes Spiel ist eine Karte mit:
Datum | Liga
Vereinslogo HEIM vs. Vereinslogo GAST
Ergebnis (falls vorhanden)
Wichtig: Kein horizontales Scrollen. Alle wichtigen Infos sind direkt sichtbar.

Schritt 2.6: Tabelle (app/table/page.tsx)
Erstelle eine Seite, die über ein Dropdown die Auswahl der Mannschaft erlaubt.
Darstellung: Reduzierte Tabellenansicht für Mobilgeräte:
Platz | Vereinswappen (klein) | Teamname (kurz) | Sp. | Pkt.
Animation: Hebe die Zeile der eigenen Mannschaft farblich hervor.

Phase 3: Animationen, Feinschliff & Desktop-Anpassung (Woche 7-8)

Schritt 3.1: Framer Motion Integration
Überprüfe alle bisherigen Animationen und verfeinere sie.
Füge Mikrointeraktionen hinzu: Hover/Tap-Effekte auf allen klickbaren Elementen (Buttons, Kacheln, Links) mit whileHover und whileTap.
Implementiere AnimatePresence für sanfte Ein-/Ausblend-Animationen von Elementen (z.B. beim Filtern).

Barrierefreiheit für Animationen:
Implementiere `prefers-reduced-motion` Media Query für Nutzer mit Vestibularstörungen.
Stelle sicher, dass alle Animationen pausierbar sind und nicht die Navigation behindern.

Schritt 3.2: Desktop-Anpassung mit Tailwind CSS
Gehe durch jede Seite und Komponente.
Nutze die responsiven Breakpoints von Tailwind (md:, lg:) um die Layouts für größere Bildschirme anzupassen.
Homepage: Wechsle zu einem mehrspaltigen Grid-Layout.
News: Kann zweispaltig werden (Liste links, Inhalt rechts).
Mannschaften: Kader kann als Grid dargestellt werden.
Tabellen: Zeige auf dem Desktop mehr Spalten an (Tordifferenz, etc.).
Die untere mobile Navigation wird auf dem Desktop durch eine klassische Header-Navigation ersetzt.

Phase 4: Testing, Finalisierung & Launch (Woche 9)

Schritt 4.1: API-Verbindung und Typisierung
Erstelle in lib/strapi.ts Funktionen für alle API-Aufrufe.
Definiere in types/strapi.ts die TypeScript-Interfaces für alle Content-Typen, um Typsicherheit im gesamten Projekt zu gewährleisten.
Implementiere revalidate (Incremental Static Regeneration) in den fetch-Aufrufen, damit die Daten aktuell bleiben, ohne die Seite bei jeder Anfrage neu bauen zu müssen.

Konfiguriere CORS und API-Token:
Stelle sicher, dass alle API-Aufrufe den erstellten Token verwenden.
Teste die API-Verbindung in verschiedenen Umgebungen (Development, Staging, Production).

Schritt 4.2: SEO und Metadaten
Nutze die generateMetadata Funktion von Next.js in jeder Seite, um dynamisch Titel und Beschreibungen aus den Strapi-Daten zu generieren.
Stelle sicher, dass für alle Bilder alt-Tags vorhanden sind.
Generiere eine sitemap.xml für bessere Suchmaschinenindexierung.
Implementiere strukturierte Daten (JSON-LD) für bessere SEO-Performance.

Schritt 4.3: Umfassendes Testing
Teste alle Funktionalitäten auf echten mobilen Geräten (iOS/Android) und in verschiedenen Browsern (Chrome, Safari, Firefox).
Überprüfe die Ladezeiten mit Google PageSpeed Insights (Ziel: Mobile Score > 90).
Teste die Bedienbarkeit (Daumen-Regel).

Performance-Optimierung:
Implementiere aggressive Bildoptimierung (WebP, responsive Größen).
Aktiviere Lazy Loading für alle Bilder.
Optimiere Bundle-Größe und Code-Splitting.

Accessibility-Testing:
Führe Accessibility-Audits mit WAVE oder Lighthouse durch.
Teste mit Screenreadern (VoiceOver, TalkBack).
Stelle sicher, dass alle interaktiven Elemente per Tastatur erreichbar sind.
Überprüfe Farbkontraste und Schriftgrößen.

Quantitative Ziele (basierend auf PRD):
Mobile Ladezeiten unter 2 Sekunden
Absprungrate auf Mobilgeräten unter 50%
Durchschnittliche mobile Sitzungsdauer über 2 Minuten

Schritt 4.4: Deployment
Frontend: Verbinde das GitHub-Repository mit Vercel für automatische Deployments.
Backend: Deploye die Strapi-Anwendung auf DigitalOcean, Heroku oder einem ähnlichen Dienst und verbinde sie mit einer Produktiv-Datenbank (z.B. PostgreSQL).
Konfiguriere die Environment-Variablen in Vercel (STRAPI_API_URL, STRAPI_API_TOKEN).

Sicherheitskonfiguration:
Aktiviere HTTPS für alle Domains.
Konfiguriere Content Security Policy (CSP) Headers.
Implementiere Rate Limiting für API-Endpoints.

Post-MVP-Erweiterungen (Phase 2 - Optional)
Basierend auf PRD 3.2 können folgende Features nach dem Launch implementiert werden:

Sponsoren-Bereich:
Dedizierte Seite für alle Sponsoren mit Logo, Beschreibung und Links.
Integration in die Homepage als Slider.

Bilder-/Videogalerie:
Galerien für Spieltags-Fotos und Videos.
Einfache Verwaltung über das CMS.

Liveticker (Optional):
Text-basierter Liveticker für ausgewählte Spiele.
Echtzeit-Updates über das CMS.

Online-Shop (Optional):
Anbindung eines einfachen Shops (z.B. über Shopify Lite) für Fanartikel.
Integration in die bestehende Navigation.

Vollständigkeitsprüfung des Plans:

✅ **Technischer Stack**: Next.js, Strapi, Tailwind CSS, Framer Motion - vollständig abgedeckt
✅ **Mobile-First-Ansatz**: Alle Phasen berücksichtigen mobile Optimierung
✅ **Core-Features**: Homepage, News, Mannschaften, Spielplan, Tabelle - alle implementiert
✅ **Content-Modelle**: Strapi-Setup entspricht exakt der PRD
✅ **Animationen**: Framer Motion Integration mit Accessibility-Berücksichtigung
✅ **Performance**: Ladezeiten, Bildoptimierung, SEO - alle Aspekte abgedeckt
✅ **Testing**: Umfassende Teststrategie für mobile Geräte und Accessibility
✅ **Deployment**: Frontend (Vercel) und Backend (DigitalOcean/Heroku) - vollständig
✅ **Security**: HTTPS, CORS, API-Tokens, Rate Limiting - alle Sicherheitsaspekte
✅ **SEO**: Meta-Tags, Sitemap, strukturierte Daten - vollständig
✅ **Accessibility**: WCAG-Konformität, Screenreader-Tests, reduzierte Animationen
✅ **Post-MVP**: Erweiterungsmöglichkeiten dokumentiert

Der Plan ist vollständig und deckt alle Anforderungen der PRD ab. Er berücksichtigt moderne Best Practices für Webentwicklung und stellt sicher, dass die Vereins-Webseite professionell, performant und benutzerfreundlich wird.
