# Architecture Decision Record - ADRs

Was ist ein ADR? Textuelle Beschreibung, die eine architektonische Entscheidung festhält.

### Grundstruktur:

* **Titel**: Nummerierung inkl. Kurzbeschreibung der architektonischen Entscheidung.
* **Status**: _Vorgeschlagen_, _Akzeptiert_, _Ersetzt durch_
* **Kontext**: Rahmenbedingungen, Situationen in denen die Entscheidungen zum Tragen kommt.
* **Entscheidung**: Entscheidung für ein Vorgehen inkl. Begründung.
* **Begründung:** Was sind die Vorteile, die die Entscheidung mit sich bringt
* **Alternative:** Welche Alternativen gibt es zu dieser Entscheidung
* **Konsequenzen**: Auswirkungen der Entscheidungen.

### ADRs von sipster:

* **Architecture Decision Record (ADR) Nr. 001: Verwendung von React Native für die App-Entwicklung**
  * **Status**: _Akzeptiert_
  * **Kontext**: Bei der Entwicklung unserer Anwendung standen wir vor der Entscheidung, welches Framework wir verwenden sollten um die Benutzeroberfläche im Frontend umzusetzen. Unser Ziel war ganz klar eine plattformübergreifende Lösung zu finden, welche die App sowohl für iOS als auch Android Nutzern zugänglich macht.
  * **Entscheidung**: Wir haben beschlossen, React Native als Framework für die Entwicklung unserer mobilen Anwendung zu verwenden.
  * **Begründung**:
    * **Plattformübergreifende Unterstützung**: React Native ermöglicht die Entwicklung von Anwendungen die sowohl auf iOS und Android lauffähig sind. Dies reduziert den Aufwand für die Entwicklung erheblich, da lediglich eine Codebasis geschrieben werden muss welche anschließend für die verschiedenen Betriebssysteme kompiliert werden.
    * **JavaScript Basis**: React Native basiert auf JavaScript, was uns ermöglicht auf die vorhandenen Kenntnisse aus Web Development Frontend zurückzugreifen und diese ebenfalls auch weiter auszubauen. Dies vereinfacht die Einarbeitung und Entwicklung der App erheblich.
    * **Performance**: React Native bietet schon im vorhinein eine gute Performance, da es eine native Benutzeroberfläche rendert und eine eigene rendering Pipeline verwendet.
    * **Community**: React Native profitiert durch seine aktive und über Jahre wachsende Community von Entwicklern. Dies Ermöglicht eine Vielzahl von Open-Source-Bibliotheken, beschleunigtes Bug Fixing und vereinfacht die Einarbeitung durch zahlreiche Forumsdiskussionen erheblich.
    * **Flexibilität**: React Native basiert auf Modularität von React Native Components, das bedeutet dass diese Komponenten einfach und mehrfach wiederverwendet werden können und bieten damit eine hohe Flexibilität und Anpassbarkeit. Dies beschleunigt den Entwicklungsprozess, die Lesbarkeit der Codebasis und verbessert die allgemeine Filestruktur.
  * **Alternative**:
    * **Native Entwicklung:** Anstatt ein plattformübergreifendes Framework zu verwenden, könnten wir uns entscheiden, die Anwendung für jede Plattform separat zu entwickeln. Dies würde es uns ermöglichen, die spezifischen Vorteile und Funktionen jeder Plattform voll auszuschöpfen, jedoch hätte dies zu einem erhöhtem Entwicklungsaufwand geführt.
    * **Flutter:** Flutter ist ein von Google entwickeltes plattformübergreifendes UI-Toolkit, das die Entwicklung von nativen Anwendungen für mobile, Web- und Desktop-Plattformen ermöglicht. Es verwendet die Programmiersprache Dart und bietet eine schnelle Entwicklung und eine hohe Leistung.
    * **NativeScript:** NativeScript ist ein weiteres plattformübergreifendes Framework, das die Entwicklung von nativen Anwendungen für iOS und Android mit JavaScript oder TypeScript ermöglicht. Es bietet eine tiefe Integration in die nativen Plattformen und eine große Auswahl an Plugins und Erweiterungen.
  * **Konsequenzen**:
    * Die Entscheidung für React Native bringt zahlreiche Vorteile mit sich, insbesondere in Bezug auf Entwicklungszeit, -kosten und plattformübergreifende Konsistenz. Es gibt jedoch auch einige potenzielle Nachteile, insbesondere in Bezug auf den Zugriff auf native Funktionen und Performance. Insgesamt bietet React Native eine starke Grundlage für die Entwicklung unserer mobilen Anwendung und ermöglicht es uns, unsere Ziele effizient und effektiv zu erreichen.
* **Architecture Decision Record (ADR) Nr. 002: Verwendung eines Schichtmodells in Kombination mit einer Microkernel-Struktur als Softwarearchitektur**
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
*   **Architecture Decision Record (ADR) Nr. 003: Erstellung des Guides zur Nutzung von Changelogs/Tags**

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
