# Git Workflow

### Branch-Workflow

Verwendet wird der Feature-Bugfix-Branch-Workflow in unserer Git Architektur. Wir verwenden diesen um Änderungen an der Codebasis schnell und einfach sehen und verwalten zu können.

1. **Main-Branch**: Der Master-Branch repräsentiert die stabile Version des Projekts. Alle Änderungen, welche in die Produktionsumgebung einfließen sollen, müssen vorerst in den Master-Branch gemerged werden.
2. **Feature-Branches**: Für jedes neue Feature wird ein seperater Branch erstellt.
3. **Bugfix-Branches**: Für jeden gefundenen Fehler in der Codebasis wird ein seperater Branch erstellt.

Wenn die Entwicklung eines Features abgeschlossen ist, muss ein Merge Request erstellt werden, um den Branch in die Main-Branch zu mergen. Es liegt in der Aufgabe jedes Teammitglieds diesen Request auf eventuelle Konflikte und Fehler zu überprüfen und Feedback zu geben bevor die Änderungen in die Main-Branch übernommen werden.

### Branch-Namenskonventionen

Wir verwenden eine konsistente Namenskonvention für alle Branches, um damit die Branch Architektur nachvollziehbar zu machen

* **Feature-Branches**: werden nach dem folgenden Schema benannt:

> feature/\<beschreibender-name>

* **Bugfix-Branches**: werden nach dem folgenden Schema benannt:

> bugfix/\<beschreibender-name>

### Commit-Workflow

* **Regelmäßiges Committen**: Commits werden regelmäßg durchgeführt, um Änderungen besser nachverfolgen zu können
* **Aussagekräftige Commit-Messages**: Commits enthalten aussagekräftige Commit-Nachrichten, die kurz beschreiben welche Änderungen vorgenommen wurden.

### Issues-Workflow

* Bei den Issues achten wir darauf möglichst präzise zu formulieren was die Aufgabe ist. Wer die Aufgabe zu erledigen hat. welchem Milestone diese Aufgabe zugehört und wie wichtig die Aufgabe ist
* To-Dos werden zu Issues umgewandelt und erhalten ein Label mit der entsprechenden Kategorie.&#x20;
* Die Wichtigkeit der Issues wird durch ein Weight-Label ausgedrückt:&#x20;
  * Niedrige Wichtigkeit: Weight 10
  * Mittlere Wichtigkeit: Weight 20
  * Hohe Wichtigkeit: Weight 30

### Milestones-Workflow

* Wöchentliche Ziele gesetzt und dafür eigene Milestones erstellt
  * Aufgabe KW16 - KW23 und der letzte Datumsspezifische Milestone ProjektAbgabe
* Spezielle Ziele gesetzt bei dem spezielle Issues zugeteilt wurden
  * [**Implementierung des Friendssystem**](https://gitlab.mi.hdm-stuttgart.de/lg107/sipster/-/milestones/3)
    * Dieses Große FriendSystem system bedarf eines eigenen Milestones
  * [**Starting with frontend and backend**](https://gitlab.mi.hdm-stuttgart.de/lg107/sipster/-/milestones/1)
    * Unser 1. Milestone um uns mit allem vertraut zu machen
  * [**UI Animated Features**](https://gitlab.mi.hdm-stuttgart.de/lg107/sipster/-/milestones/4)
    * Alles UI bedingte findet in diesem Milestone seinen Platz
  * [**quality assurance**](https://gitlab.mi.hdm-stuttgart.de/lg107/sipster/-/milestones/11)
    * CleanCoding testing und alles was die Qualität und wartbarkeit des Codes verbessern
  * [**non important**](https://gitlab.mi.hdm-stuttgart.de/lg107/sipster/-/milestones/10)
    * Alle Ideen die uns in den Kopf gekommen sind aber jetzt erstmal noch keine Priorität zur Umsetzung haben

### Labels-Workflow

* Backend
* Bug
* Frontend
* Feature
* Abgebrochen

und auch für die Anforderungen haben wir uns für labels entschieden:

* Funktionale Anforderung
* Nicht Funktionale Anforderung
* Technische Anforderung
* fachliche Anforderung
