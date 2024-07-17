---
description: >-
  Verwendung eines Schichtmodells in Kombination mit einer Microkernel-Struktur
  als Softwarearchitektur
---

# Nr. 002: Auswahl der Softwarearchitektur



* **Status**: _Akzeptiert_
* **Kontext**: Um das Projekt ganzheitlich zu planen und zu organisieren, standen wir vor der Entscheidung, eine Grundstruktur auszuwählen. Unser Ziel war es, eine klar wartbare und gut strukturierte Architektur zu wählen, die es dennoch ermöglicht, die App in Zukunft durch neue Spiele zu erweitern.
* **Entscheidung**: Wir haben beschlossen, die Grundstruktur der App als Schichtenmodell aufzubauen. In Kombination mit der Microkernel-Struktur lassen wir die Erweiterbarkeit von Spielen zu.
* **Begründung:** Ein Mix aus beiden Architekturmodellen kombiniert die Stärken beider Ansätze und kann die spezifischen Anforderungen verschiedener Teile des Projekts optimal erfüllen. Das Schichtenmodell sorgt für eine klare, wartbare und skalierbare Struktur der App, während das Microkernel-Modell die Flexibilität und Erweiterbarkeit der Spiele unterstützt. Dieser Ansatz stellt sicher, dass jede Komponente des Systems nach den Prinzipien entwickelt wird, die am besten zu ihren Anforderungen und Herausforderungen passen, was die Gesamteffizienz, Wartbarkeit und Zukunftssicherheit des Projekts maximiert.
  * **Schichtenmodell:**
    * **Klar definierte Struktur**: Die App kann in Schichten organisiert werden (z.B. Präsentation, Geschäftslogik, Datenzugriff), was die Entwicklung, Wartung und Erweiterung erleichtert.
    * **Trennung der Verantwortlichkeiten**: Durch die Aufteilung der Software in verschiedene Schichten können Verantwortlichkeiten klar getrennt werden. Jede Schicht hat eine spezifische Aufgabe, was die Wartung und das Verständnis des Systems erleichtert.
    * **Erleichterte Wartung und Erweiterbarkeit**: Änderungen in einer Schicht haben minimalen Einfluss auf andere Schichten. Dies macht es einfacher, neue Features hinzuzufügen oder bestehende Funktionen zu ändern.
    * **Standardisierung**: Da viele mobile Apps ähnliche Anforderungen haben (UI, API-Interaktion, Datenmanagement), ermöglicht ein Schichtenmodell eine standardisierte und bewährte Struktur, die die Effizienz und Qualität der Entwicklung verbessert.
    * **Testbarkeit**: Da jede Schicht klar definiert ist, können sie isoliert getestet werden, was die Identifikation und Behebung von Fehlern erleichtert.
  * **Microkernel-Modell:**
    * **Modularität und Erweiterbarkeit**: Spiele können häufig erweitert werden, indem neue Level, Features oder Spielmechaniken hinzugefügt werden. Ein Microkernel-Modell erlaubt es, diese Erweiterungen als separate Module zu entwickeln, die einfach in das bestehende System integriert werden können.
    * **Isolation und Stabilität**: Fehler in einem Spielmodul beeinträchtigen nicht die Stabilität des gesamten Spiels. Dies erhöht die Zuverlässigkeit und vereinfacht das Testen und Debuggen neuer Erweiterungen.
    * **Anpassungsfähigkeit**: Unterschiedliche Spiele oder Spielmodule können leicht an verschiedene Bedürfnisse angepasst oder sogar komplett ausgetauscht werden, ohne dass der Kern des Spiels verändert werden muss.
    * **Fehlertoleranz und Zuverlässigkeit**: Fehler in Erweiterungsmodulen beeinträchtigen nicht den Kern des Systems, was die Zuverlässigkeit erhöht.
* **Alternativen:**
  * **Event-Driven Architektur:** Bei der Event-Driven Architektur reagiert die App auf Ereignisse und verarbeitet sie, sobald sie auftreten. Häufig verwendet in Echtzeitsystemen. Somit bietet diese eine hohe Reaktionsfähigkeit und Flexibilität, gut geeignet für dynamische und skalierbare Systeme. Sie bringt aber auch eine Komplexität bei der Fehlerbehandlung und Nachverfolgbarkeit der Ereignisse mit sich.
  * **Microservice-basierte Architektur:** Bei der Microservice-basierten Architektur besteht die App aus einer Sammlung kleiner, unabhängiger Dienste, die jeweils eine spezifische Funktion erfüllen. Dieser Architektur bietet eine hohe Skalierbarkeit, einfacher Wartung und die Möglichkeit, verschiedene Technologien zu verwenden. Die Komplexität ist hier jedoch sehr hoch und daher erfüllt diese Alternative nicht unserem Ziel.
* **Konsequenzen**:
  * **Klarere Entwicklungsprozesse**: Durch die Verwendung eines Schichtenmodells wird die Entwicklung strukturierter und organisierter, da die Verantwortlichkeiten klar definiert sind. Dies führt zu einer besseren Zusammenarbeit im Team und erleichtert das Onboarding neuer Entwickler.
  * **Komplexität im Design und in der Implementierung**: Die Implementierung einer kombinierten Schichten- und Microkernel-Architektur kann komplexer sein und erfordert sorgfältige Planung und Design. Dies kann zu einem höheren initialen Entwicklungsaufwand führen.
  * **Notwendigkeit spezialisierter Kenntnisse**: Entwickler müssen sich mit den Prinzipien sowohl des Schichtenmodells als auch der Microkernel-Architektur vertraut machen. Dies könnte zusätzlichen Schulungsbedarf und eine Lernkurve für das Team mit sich bringen.
