# Comment Style Guide

### Warum brauchen wir einen Comment-Style-Guide?

Ein Comment-Style-Guide ist ein nützliches Werkzeug, um sicherzustellen, dass der Code konsistent kommentiert wird und wichtige Informationen klar und verständlich für Entwickler und Leser sind. Er hilft dabei, die Wartbarkeit und Lesbarkeit des Codes zu verbessern, was besonders in größeren Projekten von Vorteil ist.

### Kommentar-Richtlinien für sipster

#### Was und wie soll kommentiert werden?

1. **Imports**
2. **Beschreibung der Komponente**

* Eine ausführliche Beschreibung der Komponente, einschließlich ihres Zwecks und ihrer Funktion.
* Angabe des Typs der Komponente und zu welchem Modul oder Bereich sie gehört, z.B. "Component from events".
* **Parameter:** Jeder Parameter sollte wie folgt dokumentiert werden:
  * `@param {name} {type} → {description}`
* **Return:** Die Rückgabewerte der Funktion oder Methode sollten ebenfalls dokumentiert werden:
  * `@return {type} → {description}`
* **Throws**: Zusätzlich gibt es dies im Backend, um Errors zu dokumentieren:
  * `@throws {type} → {description}`

1. **Innerhalb der GUI**

*   Einzelne Abschnitte oder Komponenten sollten kommentiert werden, um ihre Funktion oder ihren Zweck zu erklären.

    → {/\* input fields \*/}

1. **Wichtig!**

* Alles, was später möglicherweise nicht verstanden werden könnte, sollte kommentiert werden, um zukünftigen Entwicklern die Arbeit zu erleichtern.
