# Installation

Du möchtest die App testen, weißt aber noch nicht genau, was zu tun ist, um sie zum laufen zu bringen? Dann bist du auf dieser Seite richtig! Wir zeigen dir hier Schritt für Schritt, was du tun musst, um unsere App zu starten.

### Installation

Zuerst sollte das Repository geklont werden

```bash
git clone https://gitlab.mi.hdm-stuttgart.de/lg107/sipster.git
```

### App bauen

Um die App zu builden, haben wir in unserem Projekt Expo benutzt. Hier zeigen wir eine Schritt für Schritt Anleitung, was getan werden muss, um erfolgreich das Projekt starten zu können.

Zuerst muss in den frontend-Ordner im integrierten Terminal navigiert werden.

Hiermit werden alle notwendigen Abhängigkeiten installiert:

```bash
npm install
```

Hiermit  wird das Projekt gestartet:

```bash
npx expo start
```

Um die App auf dem Handy anzuzeigen, wird während der Entwicklungsphase die “Expo Go” App benötigt: [Expo-App](https://expo.dev/go)

Nun sollte der QR-Code mit dem Handy gescannt werden. &#x20;

### Optional:

Es gibt in React 18 eine Warnung, die eigentlich nicht schlimm ist, man kann sie allerdings trotzdem deaktivieren.

* Navigate to `node_modules/native-base/src/core/NativeBaseProvider.tsx`
* Delete the `<SSRProvider></SSRProvider>`, that wraps `{children}`. Take care not to delete `{children}`.
* Remove the `SSRProvider` import. That is, delete this line: `import { SSRProvider} from '@react-native-aria/utils';`.
* Run `npx patch-package native-base`. Select 'yes' in the prompt.
