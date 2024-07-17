# Build management & Testing

* 0 - Kein Build Management / Testing vorhanden
* 1 - Build Management vorhanden
* 2 - Unit-Tests für Model und Controller nach F.I.R.S.T. Prinzip vorhanden
* 3 - Integrationstests für Hauptkomponenten vorhanden

Obwohl wir Java Unit Tests nicht direkt mit JavaScript verwenden konnten, haben wir stattdessen Tests  mit JEST oder als einfache HTTP-Tests durchgeführt. Dabei haben wir sowohl die Funktionalität einzelner Funktionen getestet als auch verschiedene wichtige REST-Endpunkte überprüft. Dabei wurden auch unsere Hauptkomponenten wie Login oder Homepage getestet.

Die Tests im backend sind unter `sipster/backend/tests` zu finden.

Im frontend sind die Tests unter `sipster/frontend/app/__tests__` zu finden.

Um die Tests auszuführen, sollte auf `sipster/backend` oder `sipster/frontend` navigiert werden und dort der Befehl `npm test` ausgeführt werden.
