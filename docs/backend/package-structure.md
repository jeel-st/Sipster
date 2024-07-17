# Package Structure

*   backend

    > Dies ist der höchste Ordner. Die app.js ist dabei die wichtigste Datei, da sie die Datei ist, durch die der Server gestartet wird. Die API-Requests kommen in der app.js an und werden mithilfe von Middlewares in den Router-Ordner weitergeleitet. Parallel findet man die anderen Ordner, in denen sich der Rest des Codes befindet.

    * app.js
    *   routes

        > Hier befinden sich Router, die die jeweiligen Requests, anhand ihrer Parameter, an den geeigneten Controller (bzw. die jeweilige Methode) weiterleiten.
    *   controllers

        > Hier befinden sich die jeweiligen Controller, in denen sich teilweise auch einfache Logik befindet. Diese leiten ihre Datenbankanfrage an die Schnittstelle “DatabaseMain” weiter, die im Package “databases” liegt. Somit sind die Controller direkt von der Datenbank getrennt.
    *   databases

        > Hier befindet sich alles, was mit der Datenbank zutun hat.
    *   logging

        > Hier befindet sich unser Logger
    *   static

        > Hier befinden sich alle öffentliche Bilder, auf die vom Frontend aus zugegriffen werden sollen.  Die Ordnerstruktur kann man unterhalb sehen. Die Zahlen stehen dabei für die Pixelanzahl, auf die die Bilder komprimiert wurden

        * gamePicture
        * beforePicture
          * compressed80
          * compressed1080
        * afterPicture
          * compressed80
          * compressed1080
        * profilePictures
          * compressed200
          * compressed1080
    *   tests

        > Hier befinden sich einfache HTTP- Requests und unsere JEST-Tests.
    *   utils

        > Hier befindet sich die komplizierte Logik. Der Ordner ist dabei, je nach Anwendungsfall, unter mehrere Unterordner unterteilt
