# UI

* 0 - kein GUI vorhanden
* 2 - GUI vorhanden über die die Programmfunktionen ausführbar sind
* 4 - GUI austauschbar gehalten: keine Logik im GUI-Code
* 6 - (Potentiell) langlaufende Abfragen asynchron. Eine GUI-Operation (z.B. Speichern) ist ausreichend.

Alle Punkte hier wurden umgesetzt. Dabei wurde in der Package Structure auch darauf geachtet, dass die Logik getrennt von der GUI ist. Wie genau hier alles aufgebaut wurde, kann unter [Frontend/Package Structure](../frontend/package-structure.md) nachgelesen werden.

&#x20;Zudem gibt es einige GUI- Operationen, die sich beim Starten der App zeigen. Unter anderem können Bilder hochgeladen werden, Buttons gedrückt werden, auf Bilder reagiert werden und vieles mehr!
