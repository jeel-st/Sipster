# Rest API´s

Für alle API’s sollte man die Server-IP benutzen, also [http://85.215.71.124/…](http://85.215.71.124/%E2%80%A6)

### **API’s für Login:**

* GET /login/:username/:password → hier sollte der passende username + password eingesetzt werden, hier wird geschaut, ob die Anmeldedaten übereinstimmen
  * Rückgabetyp: Bei Erfolg: true (Boolean), ansonsten 404 “User not found”
  * Beispiel:

```jsx
axios.get(http://85.215.71.124/login/${username}/${password})
```

### **API’s für Registrierung:**

* POST /register → hier sollte noch ein body mitgegeben werden mit: username, password, email, firstName, lastName
  * Rückgabetyp: Bei Erfolg: “Success” (String), ansonsten: 452 Duplicate username, 453 Duplicate Email, 454 Email format false, 455 Password format false oder 500 Internal Server Error
  * Beispiel:

```jsx
axios.post('http://85.215.71.124/register',
            {
                "username": username,
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
```

### **API’s für Events:**

* GET /events → hier muss nichts weiteres mitgegeben werden, alle Events werden returned
  * Rückgabetyp: Bei Erfolg: json.Object mit allen Events, ansonsten 204 No events available oder 500 Internal Server Error
  * Beispiel:

```jsx
axios.get(http://85.215.71.124/events)
```

* POST /events → hier muss noch ein body mit den folgenden Werten übergeben werden: date, name, time, header, desc, tags\[Array]
  * Rückgabetyp: Bei Erfolg: “Success” (String), ansonsten 500 Internal Server Error
  * Beispiel: (Nur eine Möglichkeit, hat noch keine Anwendung im Projekt)

```jsx
axios.post('http://85.215.71.124/events',
            {
                "username": username,
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
```

* DELETE /:date/:name/:time/:header → Hier kann ein Event gelöscht werden, in dem man die Parameter der URL übergibt
  * Rückgabetyp: Bei Erfolg: “Event erfolgreich gelöscht” (String), ansonsten 500 Internal Server Error
  * Beispiel: (Wird bis jetzt nur zu Testzwecken benutzt)

```jsx
DELETE {{host}}/events/06.07/MediaNight/ab 17 Uhr/Vaihingen • 7 Apr 2024 HTTP/1.1
```

### **API’s für Profilfotos:**

* POST /imageUpload → Das hier ist ein spezieller Upload für Profilbilder. Hier muss im body keine Datei im json oder url Format mitgegeben werden, sondern ein multipart/form-data, da wir hier ein Benutzername und ein Bild hochladen müssen. Hier muss data zusätzlich als new FormData() Objekt deklariert werden, da wir mit dem npm- Paket multiparty arbeiten. (siehe Bespiel)
  * Rückgabetyp: Bei Erfolg: “Success!” (String), ansonsten 500 Internal Server Error
  * Beispiel:

```jsx
let data = new FormData()
    data.append('username', 'gamsa')
    data.append('file', { uri: file.uri, name: filename, type: file.mimeType })

    try {
        const response = await axios.post("http://85.215.71.124/imageUpload", data, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
```

* GET /imageUpload/:username → hier muss ein username als Parameter mitgegeben werden um das Profilbild eines bestimmten Benutzers zu bekommen. Zudem muss ein query mitgegeben werden (”original”), welcher true oder false heißen muss, sonst kommt automatisch die komprimierte From zurück. Wählt man “original=true” aus, bekommt man das Foto in Originalqualität zurück, ansonsten in komprimierter Form.
  * Rückgabetyp: pictureURL (String) → Achtung! Hier handelt es sich um den absoluten Pfad aus dem Serverdirectory! Ansonsten 404, Profilbild nicht gefunden
  * Beispiel:

```jsx
axios.get(http://85.215.71.124/imageUpload/${username}?original=true)
```

### **API’s für Freundesystem:**

* POST /friends → Hier kann man eine Freundschaftsanfrage an jemanden senden. Der body sollte aus “fromSipsterID” und “toSipsterID” bestehen.
  * Rückgabetyp: "Friend request was send successfully!” (String), ansonsten 500 Internal Server Error
  * Beispiel:

```jsx
axios.post('http://85.215.71.124/friends',
            {
                "fromSipsterID": fromSipsterID,
                "toSipsterID": toSipsterID
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
```

* DELETE /friends/:fromSipsterID/:toSipsterID → hier gibt es drei unterschiedliche Funktionen, die ausgeführt werden können. Annehmen einer Freundschaftsanfrage, Ablehnen einer Freundschaftsanfrage und löschen eines Freundes.

1. DELETE /friends/:fromSipsterID/:toSipsterID?status=true → Annehmen einer Freundschaftsanfrage
   * Rückgabewert: Bei Erfolg: "User was accepted!” (String), ansonsten: 404 "Status and remove are null or wrong” oder 500 Internal Server Error
     * Beispiel:

```jsx
axios.delete(http://85.215.71.124/friends/gamsa/jeel?status=true)
```

2. DELETE /friends/:fromSipsterID/:toSipsterID?status=false → Ablehnen einer Freundschaftsanfrage
   * Rückgabewert: Bei Erfolg: ("User was declined") (String), ansonsten: 404 "Status and remove are null or wrong” oder 500 Internal Server Error
   * Beispiel:

```jsx
axios.delete(http://85.215.71.124/friends/gamsa/jeel?status=false)
```

3. DELETE /friends/:fromSipsterID/:toSipsterID?remove=true
   * Rückgabewert: Bei Erfolg: ("Friend was removed") (String), ansonsten: 404 "Status and remove are null or wrong” oder 500 Internal Server Error
   * Beispiel:

```jsx
axios.delete(http://85.215.71.124/friends/gamsa/jeel?remove=true)
```

### API’s für User

1. GET /user/:username, hier kriegst du alle notwendigen userInformationen
   * Rückgabewert bei Erfolg sind die user daten mit code 200 bei fehlschlag 404
   * Beispiel:

```jsx
axios.get('http://85.215.71.124/user/${username}')
```

2. POST /user/changeUsername, hier kann man den username ändern indem man einen Body mit username und newUsername mitgibt.
   * Rückgabewert: Bei Erfolg (”Username was succesfully posted!”) (String), ansonsten: 404
   * Beispiel:

```jsx
axios.post('http://85.215.71.124/user/changeUsername',
						{
								"username": "gamsa",
								"newUsername": "Lars"
						}
						{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

3. POST /user/changePassword → Passwort ändern selbe regeln wie oben nur das Passwort den Kriterien wie Länge, Zahl und Sonderzeichen entsprechen muss.
   * Rückgabe: bei Erfolg: (”Password was succesfully posted”), ansonsten status code 1001 falls das Passwort nicht den Anforderungen entspricht, oder 404 falls etwas komplett schiefgelaufen ist.
   * Beispiel:

```jsx
axios.post('http://85.215.71.124/user/changePassword',
						{
								"username": "Cryptocryxx",
								"newPassword": "JoelStinkt*100"
						}
						{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

4. POST /user/changeEmail → Email ändern selbe regeln wie bei changePasswort.
   * Rückgabe: bei Erfolg: (”Email was succesfully posted”), ansonsten status code 1001 falls die Email nicht den Anforderungen entspricht, oder 404 falls etwas komplett schiefgelaufen ist.
   * Beispiel:

```jsx
axios.post('http://85.215.71.124/user/changeEmail',
						{
								"username": "lb225@hdm-stuttgart.de",
								"newPassword": "l.bauscher@gmx.de "
						}
						{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

5. POST /user/addEvent fügt einem User ein ausgewähltes Event hinzu.

* Rückgabe: bei Erfolg (”Added Event succesfully to User!”), ansonsten code 404 oder wenn username falsch ist 400
* Beispiel:

```jsx
axios.post('http://85.215.71.124/user/addEvent',
					{
							"username": "Cryptoooo",
					    "eventID": "6615c7d7b30f73c8ba10bead"
					}
					{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

6. DELETE /:userID/:password löscht einen User und alle seine vorkommnisse in anderen Datenbank files

* Rückgabe: bei Erfolg (”Benutzer erfolgreich gelöscht”), ansonsten code 404 oder wenn username oder passwort falsch ist 400
* Beispiel:

```jsx
axios.delete('http://85.215.71.124/user/661d09ba6671060e01a4fd3e/Alladin!101'
```

### API’s für Activities

1. POST /activities/ → neue Activity erstellen eines users
   * Rückgabe: bei Erfolg: (”Activity was added to the database”), ansonsten 404
   * Beispiel:

```jsx
axios.post('http://85.215.71.124/activities/postActivity',
            {
			"comment": "BeispielKommentar",
			"username": "EineID203820492",
			"gameName": "EineGameID12938922"
            },
            {
	          headers: {
	                 'Content-Type': 'application/json'
            }
            })
```

2. GET /activities/username → dadurch bekommt man alle Activities von allen Freunden welche der username hat. Bei Erfolg werden die Activities in einem Array zurückgeschickt welcher die selbe form hat wie beim Post ausser das username und gameName durch userID und gameID ausgetauscht sind. Bei Misserfolg gibt es ein 404

* Beispiel:

```jsx
axios.get('http://85.215.71.124/activities/661d09ba6671060e01a4fd3e')
```

3. GET /activities/getActivitiesFromUser/userID → dadurch bekommt man alle Activities von einem Freund oder dem user selbst Bei Erfolg werden die Activities in einem Array zurückgeschickt welcher die selbe form hat wie beim Post ausser das username und gameName durch userID und gameID ausgetauscht sind. Bei Misserfolg gibt es ein 404

* Beispiel:

```jsx
axios.get('http://85.215.71.124/activities/getActivitiesFromUser/661d09ba6671060e01a4fd3e')
```

4. PUT /activities/addReaction fügt eine neue Reaction des users zu einer activity hinzu

* Rückgabe: bei Erfolg (”reaction added succesfully”), ansonsten code 404
* Beispiel:

```jsx
axios.put('http://85.215.71.124/activities/addReaction',
            {
				"userID": "661d09ba6671060e01a4fd3e",
				"activityID": "6666311b8663e5335a54e9b4",
				"reactionType": "beer"
            },
            {
	          headers: {
	                 'Content-Type': 'application/json'
            }
            })
```

### API’s für die Homepage

1. GET /homepage/:userID

In this Method you get the fully assembled Homepage and can load that directly in the hompage by differentiate between the types of the given Object the types are

_homepage.type = \["game" || "activity" || "event"]_

* returns an array of Objects which contains all the loaded activities events and games
* Beispiel:

```jsx
axios.get(`http://85.215.71.124/homepage/${userID}`)
```
