# Sipster

## Projektbeschreibung

Bei unserem Projekt handelt es sich um eine Trinkspiel- App, die verschiedene Trinkspiele in einer App vereint. Zudem soll man aber nicht nur Spiele spielen können, sondern auch Events in der Nähe angezeigt bekommen, Freunde adden können und Bilder von Feiern oder Spieleabende teilen können. Zudem soll man auf andere Beiträge reagieren können. Unser Ziel ist es dabei, eine lebendige und unterstützende Community zu schaffen, in der sich jeder willkommen und wohl fühlt.

## Projektstatus

Bei unserem Projekt handelt es sich bis jetzt nur um eine Alphaversion, weswegen man noch nicht mit allen Funktionen rechnen sollte.

## Installation

Zuerst sollte das Repository geklont werden
```bash
git clone https://gitlab.mi.hdm-stuttgart.de/lg107/sipster.git
```

## App bauen

Um die App zu builden, haben wir in unserem Projekt Expo benutzt. Hier zeigen wir eine Schritt für Schritt Anleitung, was getan werden muss, um erfolgreich das Projekt starten zu können.
[Was ist überhaupt Expo?](https://www.youtube.com/watch?v=vFW_TxKLyrE)

[Expo-Router Docs](https://docs.expo.dev/router/installation/#quick-start)

Zuerst muss der frontend-Ordner im integrierten Terminal geöffnet werden.

Hiermit wird ein Minimalprojekt erstellt, in dem die Expo Router-Bibliothek bereits installiert ist:
```bash
npx create-expo-app@latest --template tabs@50
```

Hiermit werden weitere wichtige Abhängigkeiten installiert:
```bash
npm install expo-font axios react-native-dotenv
```

Außerdem sollten die restlichen Packages ebenfalls installiert werden:
```bash
npm install
```

Dadurch wird das Projekt gestartet:
```bash
npx expo start
```

Um die App auf dem Handy anzuzeigen, wird während der Entwicklungsphase die “Expo Go” App benötigt:
[Expo-App](https://expo.dev/go)

Nun sollte der QR-Code mit dem Handy gescannt werden. Es gibt bei Expo zusätzlich weitere Features, wie bespielsweise die App im Browser zu öffnen. Dazu kann man einfach den Anweisungen im Terminal folgen.



### Optional:
Es gibt in React 18 eine Warnung, die eigentlich nicht schlimm ist, man kann sie allerdings trotzdem deaktivieren.

- Navigate to `node_modules/native-base/src/core/NativeBaseProvider.tsx`
- Delete the `<SSRProvider></SSRProvider>`, that wraps `{children}`. Take care not to delete `{children}`.
- Remove the `SSRProvider` import. That is, delete this line: `import { SSRProvider} from '@react-native-aria/utils';`.
- Run `npx patch-package native-base`. Select 'yes' in the prompt.


## Mitwirkende

An diesem Projekt haben insgesamt fünf Studierende mitgearbeitet:
- Joel Starkov (js486)
- Lars Gerigk (lg107)
- Maike König (mk414)
- Julia Ebert (je073)
- Lorenz Bauscher (lb225)