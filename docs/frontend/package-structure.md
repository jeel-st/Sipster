# Package structure

*   App Folder

    > Dieser Ordner ist der Hauptcontainer für den gesamten Code innerhalb der Anwendung.

    * index.js
    * \_layout.js
    *   Assets Folder

        > Dieser Ordner enthält die Assets unseres Projekts. Er besteht aus allen statischen Assets, wie z. B. Schriftarten und Bilder.

        *   Fonts Folder

            > Dieser Ordner enthält alle Schriftarten
        *   Icons Folder

            > Dieser Ordner enthält alle Icons
        *   Images Folder

            > Dieser Ordner enthält alle Images
    *   Components Folder

        * index.js

        > Dieser Ordner enthält alle React-Komponenten aus dem Projekt unterteilt in Anwendungsordnern

        * Home
        * Common
        * …
    *   Constants Folder

        * index.js

        > Dieser Ordner enthält alle Arten von Konstanten, die wir haben. Also z.B. Vorgaben zu FONT, SIZE, COLOR, STYLE, …
    *   Routes Folder

        * index.js

        > Dieser Ordner enthält den gesamten navigationsbezogenen Code. Dieser Ordner besteht aus allen Routen der Anwendung.
    *   Utils Folder

        * index.js

        > Dieser Ordner enthält alle allgemeinen Funktionen und Module des Programms

        * database Folder
        * hooks Folder
        * logger Folder

