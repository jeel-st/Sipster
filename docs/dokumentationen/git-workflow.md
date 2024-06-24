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

### Issues

* to dos werden Issues
* bekommen Label mit Kategorie
* Issues kriegen Weight nach Wichtigkeit des Issues
  * Wichtigkeit:
  * niedrig = 10
  * mittel = 20
  * wichtig = 30

### Milestones

jeden Montag ein neuer Milestone
