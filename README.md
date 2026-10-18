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

## Veröffentlichen mit GitHub Pages
Die Seite ist fertig für GitHub Pages: alle Pfade sind relativ, `index.html` liegt im Hauptordner, und `.nojekyll` sorgt dafür, dass GitHub die Dateien unverändert ausliefert.

1. **Repository anlegen:** Auf https://github.com/new ein neues Repository erstellen, `dietcoachme.github.io`. Sichtbarkeit **Public** (GitHub Pages ist im kostenlosen Tarif nur für öffentliche Repositories verfügbar). *Kein* README, keine .gitignore, keine Lizenz hinzufügen.
2. **Hochladen** (im Terminal in diesem Ordner):
   ```bash
   git remote add origin https://github.com/dietcoachme/dietcoachme.github.io.git
   git push -u origin main
   ```
   Beim ersten Push fragt Git nach Benutzername und Passwort. Als Passwort ein *Personal Access Token* verwenden (GitHub → Settings → Developer settings → Personal access tokens). Alternativ geht alles auch mit der App *GitHub Desktop*.
3. **Pages einschalten:** Im Repository *Settings → Pages → Build and deployment*: Source **Deploy from a branch**, Branch **main**, Ordner **/ (root)** → *Save*. Nach 1–2 Minuten ist die Seite unter `https://dietcoachme.github.io/` erreichbar.
4. **Eigene Domain dietcoach.me** (erst, wenn alles passt):
   - In *Settings → Pages → Custom domain* `dietcoach.me` eintragen und speichern (GitHub legt dabei eine Datei `CNAME` an – danach einmal `git pull` ausführen).
   - Beim Domain-Anbieter die DNS-Einträge setzen:
     | Typ | Name | Wert |
     |---|---|---|
     | A | @ | 185.199.108.153 |
     | A | @ | 185.199.109.153 |
     | A | @ | 185.199.110.153 |
     | A | @ | 185.199.111.153 |
     | CNAME | www | `dietcoachme.github.io` |
   - Alte Einträge, die auf Soloist zeigen, entfernen. Sobald die Domain geprüft ist, **Enforce HTTPS** anhaken. Danach kann das Soloist-Abo gekündigt werden.
5. **Datenschutz:** In `datenschutz.html` als Hosting-Anbieter GitHub eintragen.

**Hinweis:** Bei einem öffentlichen Repository ist der gesamte Code einsehbar. Bitte keine privaten Daten committen, die nicht ohnehin auf der Website stehen.

Änderungen später veröffentlichen: Dateien bearbeiten, dann `git add -A`, `git commit -m "…"` und `git push` – GitHub aktualisiert die Seite automatisch.

## Bilder austauschen
Bilder liegen in `img/`. Einfach eine Datei mit gleichem Namen ersetzen (Hochformat ca. 1500 × 2000 px, WebP oder JPG – bei JPG die Endung im HTML anpassen).
