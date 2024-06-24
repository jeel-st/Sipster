# Nr. 003: Erstellung des Guides zur Nutzung von Changelogs/Tags

* **Status**: _Akzeptiert_
* **Kontext**: In dem Projekt werden Changelogs und Tags genutzt um eine Übersicht über die Fortschritte in unserem Projekt zuhaben und die wichtigsten Aktualisierungen sowie Visionen aufzulisten. Dazu soll es eine einheitliche Richtlinie geben.
* **Entscheidung**: Versionen werden nach folgendem erstellt. 1.0.0 → auf Main, 0.1.0 → neue version auf develop, 0.1.1 → neue versionen in frontend und backend. Changelog wird nach folgendem Format erstellt.

```
## [Unreleased]

### Added

- ...

### Changed

- ...

### Removed

- ...

## [1.1.1] - 2023-03-05

### Added

- ...

### Fixed

- ...

### Changed

- ...

### Removed

- ...

```

* **Begründung:** Um den Aufwand so klein wie möglich zu halten gibt es immer einen Unreleased abschnitt ganz oben. Dieser Hilft zu sehen was im nächsten Releas zu erwarten ist. Bei Releas kann dann ganz einfach die Versions Nummer eingefügt werden. Sie werden in umgekehrt chronologischer Reihenfolge festgehalten um die neueste Version ganz oben zu haben.
* **Alternative:** Welche Alternativen gibt es zu dieser Entscheidung ???
* **Konsequenzen**: Auswirkungen der Entscheidungen. ???
