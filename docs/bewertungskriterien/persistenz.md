# Persistenz

* 0 - keine Persistenz vorhanden
* 2 - CRUD-Operationen für (No)SQL-DB teilweise implementiert
* 4 - CRUD-Operationen für (No)SQL-DB implementiert & genutzt
* 6 - DB-Operationen in Tests aufgenommen, Bereitstellung von Demo-Daten

Die CRUD- Operationen wurden bei uns im Projekt vollständig implementiert. Zudem können unsere Demo-Daten unter `sipster/documentation/demoData` gefunden werden. Falls es Probleme mit den Demodaten geben sollte, haben wir Ihnen noch den Zugang zu unserer Datenbank gegeben, den man unter [Dokumentationen/Einloggen in unsere Datenbank](../dokumentationen/einloggen-in-unsere-datenbank.md), finden kann. Außerdem werden Datenbank-Operationen ebenfalls von JEST-Tests getestet. Diese sind unter `sipster/backend/tests` auffindbar.

Alle Operationen für die Datenbank sind unter `sipster/backend/databases` zu finden. Es wurden alle Operationen umgesetzt.

Einige Beispiele sind hier als Screenshots dargestellt:

<figure><img src="../.gitbook/assets/sipster_light_changeSips.png" alt=""><figcaption><p>Methode ist unter sipster/backend/databases/databaseSips zu finden</p></figcaption></figure>

<figure><img src="../.gitbook/assets/sipster_light_getEvents.png" alt=""><figcaption><p>Methode ist unter sipster/backend/databases/databaseEvents zu finden</p></figcaption></figure>

<figure><img src="../.gitbook/assets/sipster_light_postUser.png" alt=""><figcaption><p>Methode ist unter sipster/backend/databases/databaseRegister zu finden</p></figcaption></figure>

<figure><img src="../.gitbook/assets/sipster_light_testSisp.png" alt=""><figcaption><p>Methoden sind unter /sipster/backend/tests/sips.test.js zu finden</p></figcaption></figure>
