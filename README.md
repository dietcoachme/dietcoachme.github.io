# DietCoach.me – neue Website für Ella

Statische Website (HTML, CSS, etwas JavaScript), gestaltet nach dem Vorbild von julienhuber.photography: große Fotos, ruhige Typografie, viel Weißraum und klare Aufrufe zum Erstgespräch.

## Seiten
| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Angebote, Motto, Ablauf, Stimmen, Über mich, Galerie, Aufruf zum Erstgespräch |
| `angebote.html` | Angebote im Detail, Preise, Ablauf, Anfrageformular (`#anfrage`) |
| `ueber-mich.html` | Ellas Geschichte und Haltung |
| `impressum.html`, `datenschutz.html` | Vorlagen mit Platzhaltern |

## Vor dem Livegang ausfüllen
1. **Impressum & Datenschutz:** alle gelb markierten `[Platzhalter]` ersetzen (vollständiger Name, Anschrift, Hosting-Anbieter, Ausbildungsinstitut, Stand). Am besten rechtlich prüfen lassen.
2. **Kontaktformular:** kostenloses Konto bei https://formspree.io anlegen, Formular erstellen und die ID in `js/main.js` bei `FORMSPREE_ID` eintragen. Bis dahin öffnet „Anfrage senden“ das E-Mail-Programm mit vorausgefülltem Text.
3. **Online-Terminbuchung:** Calendly-Konto (oder ähnlich) anlegen, Ereignis „Kostenloses Erstgespräch“ erstellen und den Link in `js/main.js` bei `CALENDLY_URL` eintragen. Bis dahin führen alle „Erstgespräch“-Buttons zum Anfrageformular.
4. **Instagram (optional):** in `index.html` im Footer die auskommentierte Zeile aktivieren und `[INSTAGRAM-HANDLE]` ersetzen.
5. **Preis prüfen:** Die 5er-Karte (480 € = 96 €/Std.) ist pro Stunde teurer als die Einzelstunde (95 €). Wurde unverändert von der alten Seite übernommen – evtl. auf z. B. 450 € anpassen.

## Lokal ansehen
```bash
python3 -m http.server 8080
```
Dann http://localhost:8080 öffnen.

## Veröffentlichen (Beispiel Netlify)
1. Auf https://app.netlify.com/drop den ganzen Ordner hineinziehen.
2. Unter *Domain settings* die Domain `dietcoach.me` hinzufügen.
3. Beim Domain-Anbieter die DNS-Einträge so ändern, wie Netlify es anzeigt (danach die alte Soloist-Seite kündigen).
4. HTTPS wird automatisch aktiviert.

Andere Hoster (IONOS, Strato, GitHub Pages …) funktionieren genauso: einfach alle Dateien hochladen.

## Bilder austauschen
Bilder liegen in `img/`. Einfach eine Datei mit gleichem Namen ersetzen (Hochformat ca. 1500 × 2000 px, WebP oder JPG – bei JPG die Endung im HTML anpassen).
