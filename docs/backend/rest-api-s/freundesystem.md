# Freundesystem

* POST /friends → Hier kann man eine Freundschaftsanfrage an jemanden senden. Der body sollte aus “fromSipsterID” und “toSipsterID” bestehen.
  * Rückgabetyp: "Friend request was send successfully!” (String), ansonsten 500 Internal Server Error
  * Beispiel:

```javascript
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

* DELETE /friends/delete/:fromUserID/:toUserID → hier gibt es zwei unterschiedliche Funktionen, die ausgeführt werden können. Ablehnen einer Freundschaftsanfrage und löschen eines Freundes.
  1.  DELETE /friends/delete/:fromUserID/:toUserID?remove=false → Ablehnen einer Freundschaftsanfrage

      * Rückgabewert: Bei Erfolg: ("User was declined") (String), ansonsten: 404 "Remove is null” oder 500 Internal Server Error
      * Beispiel:

      <pre class="language-javascript"><code class="lang-javascript"><strong>axios.delete(http://85.215.71.124/friends/delete/${gamsaID}/${jeelID}?remove=false)
      </strong></code></pre>
  2.  DELETE /friends/delete/:fromUserID/:toUserID?remove=true

      * Rückgabewert: Bei Erfolg: ("Friend was removed") (String), ansonsten: 400 "Sipster can't be removed as a friend”, 404 "Remove is null” oder 500 Internal Server Error
      * Beispiel:

      <pre class="language-javascript"><code class="lang-javascript"><strong>axios.delete(http://85.215.71.124/friends/delete/${gamsaID}/${jeelID}?remove=true)
      </strong></code></pre>


* PUT /friends/accept/:fromUserID/:toUserID
  * Rückgabewert: Bei Erfolg: ("User was accepted!”) (String), ansonsten: 500 “Internal Server Error”
  * Beispiel:

```javascript
axios.put(http://85.215.71.124/friends/accept/${gamsaID}/${jeelID})
```

* GET friends/invitations/:userID —> Hier bekommst du alle friend Invitations von deinem User
  * Rückgabe bei Erfolg (personalInformation- Object-Array), 204  ("There are no invitations for that username...") oder 500 ("Something went wrong"+ err), Beispiel für Rückgabewert:

```javascript
[
  [
    {
  "_id": {
    "$oid": "661d07706671060e01a4fd3d"
  },
  "username": "gamsa",
  "profilePicture": "/home/sipster/sipster/backend/static/profilePictures/Picture661d07706671060e01a4fd3d.jpeg",
  "encryptedPassword": "$2b$10$wPO5rIRz7K/SnxVLiRODyu2FB2AaSFsEmDAv2U88ecvhXp/kFDxzG",
  "salt": "$2b$10$wPO5rIRz7K/SnxVLiRODyu",
  "email": "lg107@hdm-stuttgart.de",
  "firstName": "Lars",
  "lastName": "Gerigk",
  "registerDate": "2024-04-15T10:54:39.933Z",
  "friends": [
    {
      "$oid": "661d67b17e280ddfbcf6ec93"
    }
  ],
  "sips": 5,
  "events": [
    "666b482f2a8cb9c8529d119c",
    "666b48332a8cb9c8529d119d"
  ],
  "profilePictureCom200": "/home/sipster/sipster/backend/static/profilePictures/compressed200/Picture661d07706671060e01a4fd3d.webp",
  "profilePictureCom1080": "/home/sipster/sipster/backend/static/profilePictures/compressed1080/Picture661d07706671060e01a4fd3d.webp"
}
  ],
  []
]
```

* Beispiel:

```javascript
axios.get(http://85.215.71.124/friends/invitations/${gamsaID})
```

* GET friends/:userID —> Hier kriegst du eine Freundesliste von dem angegebene User
  * Rückgabe bei Erfolg:

```javascript
[
  {
    "_id": "663bd3b7969fc6302facf1ee",
    "username": "Sipster",
    "profilePicture": null,
    "profilPictureC": null,
    "encryptedPassword": "$2b$10$EOMmcB67leRRsUymDidLyO/erQ9dvrGc9IOvSvmupebYlKNe5fWdC",
    "salt": "$2b$10$EOMmcB67leRRsUymDidLyO",
    "email": "sipster@gmail.com",
    "firstName": "Team",
    "lastName": "Sipster",
    "registerDate": "2024-05-08T19:34:15.089Z",
    "friends": [
      "663bd3b7969fc6302facf1ee",
      "661d07706671060e01a4fd3d",
      "663bd3b7969fc6302facf1ee",
      "6640e5bc8700968c3d88c6a0"
    ],
    "events": []
  },
  ...
]
```

* Rückgabe wenn der user keine friends hat 204 und bei einem Backend error 500
* Beispiel:

```javascript
axios.get('http://85.215.71.124/friends/${username}')
```

* GET /friends/:userID/:input —> Hier kriegst du Vorschläge für neue Freunde suchen also wenn input zum beispiel “ga” ist dann kriegst du alle user die “ga” im username oder im vollen Namen haben.
  * Rückgabe bei Erfolg:

```javascript
[
  {
    "_id": "6640e5f38700968c3d88c6a1",
    "username": "theeee JOeell",
    "profilePicture": null,
    "profilPictureC": null,
    "encryptedPassword": "$2b$10$ALjcvYo2vhFOtEu6s.VILeX/d8fS1b/whPnTWQqahmHUQtBPz5gx2",
    "salt": "$2b$10$ALjcvYo2vhFOtEu6s.VILe",
    "email": "ft486@hdm-stuttgart.de",
    "firstName": "friend",
    "lastName": "test",
    "registerDate": "2024-05-12T15:53:23.664Z",
    "friends": [
      "663bd3b7969fc6302facf1ee"
    ],
    "events": []
  }
]
```

* Rückgabe bei bei zu wenig input oder wenn keine reccommendations gefunden wurden 204 oder wenn der user falsch ist 400 oder bei Backend Fehlern 500
* Beispiel:

```javascript
axios.get('http://85.215.71.124/friends/${username}/&{input}')
```
