# Comment Style Guide

### Warum brauchen wir einen Comment-Style-Guide?

Ein Comment-Style-Guide ist ein nützliches Werkzeug, um sicherzustellen, dass der Code konsistent kommentiert wird und wichtige Informationen klar und verständlich für Entwickler und Leser sind. Er hilft dabei, die Wartbarkeit und Lesbarkeit des Codes zu verbessern, was besonders in größeren Projekten von Vorteil ist.

### Kommentar-Richtlinien für sipster

#### Was und wie soll kommentiert werden?

1. **Imports**
2. **Beschreibung der Komponente**
   1. Eine ausführliche Beschreibung der Komponente, einschließlich ihres Zwecks und ihrer Funktion.
   2. Angabe des Typs der Komponente und zu welchem Modul oder Bereich sie gehört, z.B. "Component from events".
   3. **Parameter:** Jeder Parameter sollte wie folgt dokumentiert werden:
      * `@param {name} {type} → {description}`
   4. **Return:** Die Rückgabewerte der Funktion oder Methode sollten ebenfalls dokumentiert werden:
      * `@return {type} → {description}`
   5. **Throws**: Zusätzlich gibt es dies im Backend, um Errors zu dokumentieren:
      * `@throws {type} → {description}`
3. **Innerhalb der GUI**
   1.  Einzelne Abschnitte oder Komponenten sollten kommentiert werden, um ihre Funktion oder ihren Zweck zu erklären.

       → {/\* input fields \*/}
4. **Wichtig!**
   1. Alles, was später möglicherweise nicht verstanden werden könnte, sollte kommentiert werden, um zukünftigen Entwicklern die Arbeit zu erleichtern.
