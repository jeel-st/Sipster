# User

* GET /user/:username, hier kriegst du alle notwendigen userInformationen
  * Rückgabewert bei Erfolg -> JSON-Object mit den Userdaten, beispielsweise:

```javascript
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
```

* Rückgabewert bei Misserfolg ist entweder der Code 400 falls der User Input falsch war und 500 falls etwas im Backend falsch gelaufen ist
* Beispiel:

```javascript
axios.get('http://85.215.71.124/user/${username}')
```

* GET /user/events/:userID, hier kriegst du alle Events die sich der User gespeichert hat.
* Rückgabewert ist ein Array von Events in Json format

```javascript
[
  {
    "_id": "666ab3736f83d26412cbe494",
    "Date": "2024-10-01T18:00:07.205Z",
    "name": "Unithekle",
    "time": "20:00",
    "header": "Vaihingen • 7 Apr 2024",
    "desc": "Imagine a drinking night with Jordine...",
    "tags": [
      "community",
      "120 sips"
    ]
  },
  {
    "_id": "666ab38f311ffe7f942fae4e",
    "Date": "2024-10-01T18:00:35.483Z",
    "name": "Unithekle",
    "time": "20:00",
    "header": "Vaihingen • 7 Apr 2024",
    "desc": "Imagine a drinking night with Jordine...",
    "tags": [
      "community",
      "120 sips"
    ]
  }
 ]
```

* Beispiel:

```javascript
axios.get('http://85.215.71.124/user/events/${userID}')
```

* GET /user/events/notStored/:userID, hier kriegst du alle Events die sich der User noch nicht gespeichert hat.
  * Rückgabewert ist ein Array an events in JSON format

```javascript
[
  {
    "_id": "666ab3736f83d26412cbe494",
    "Date": "2024-10-01T18:00:07.205Z",
    "name": "Unithekle",
    "time": "20:00",
    "header": "Vaihingen • 7 Apr 2024",
    "desc": "Imagine a drinking night with Jordine...",
    "tags": [
      "community",
      "120 sips"
    ]
  },
  {
    "_id": "666ab38f311ffe7f942fae4e",
    "Date": "2024-10-01T18:00:35.483Z",
    "name": "Unithekle",
    "time": "20:00",
    "header": "Vaihingen • 7 Apr 2024",
    "desc": "Imagine a drinking night with Jordine...",
    "tags": [
      "community",
      "120 sips"
    ]
  }
 ]
```

* Beispiel

```javascript
axios.get('http://85.215.71.124/user/events/notStored/${userID}')
```

* PUT /user/changeUsername, hier kann man den username ändern indem man einen Body mit username und newUsername mitgibt.
  * Rückgabewert: Bei Erfolg (”Username was succesfully posted!”) (String), ansonsten: 500 wenn etwas im Backend nicht stimmt
  * Beispiel:

```javascript
axios.put('http://85.215.71.124/user/changeUsername',
						{
						"userID": `${youre id}`,
						"newUsername": "Lars"
						},
						{
	headers: {
                    'Content-Type': 'application/json'
                }
           })
```

* PUT /user/changePassword → Passwort ändern selbe regeln wie oben nur das Passwort den Kriterien wie Länge, Zahl und Sonderzeichen entsprechen muss.
  * Rückgabe: bei Erfolg: (”Password was succesfully posted”), ansonsten status code 400 falls das Passwort nicht den Anforderungen entspricht oder falls der Username falsch ist, oder 500 falls etwas im Backend schiefgelaufen ist.
  * Beispiel:

```javascript
axios.put('http://85.215.71.124/user/changePassword',
						{
								"userID": "${youre id}",
								"newPassword": "JoelStinkt*100"
						}
						{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

* PUT /user/changeEmail → Email ändern selbe regeln wie bei changePassword.
  * Rückgabe: bei Erfolg: (”Email was succesfully posted”), ansonsten status code 400 falls die Email nicht den Anforderungen entspricht, oder 500 falls etwas im Backend schiefgelaufen ist.
  * Beispiel:

```javascript
axios.put('http://85.215.71.124/user/changeEmail',
						{
								"userID": "${youre id}",
								"newEmail": "l.bauscher@gmx.de"
						}
						{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

* PUT /user/changeFirstName ändert den FirstName des Users.
  * Rückgabe bei Erfolg Status Code 200 ansonsten Code 500 wenn etwas im Backend schiefgelaufen ist
  * Beispiel

```javascript
axios.put('http://85.215.71.124/user/changeFirstName',
						{
								"userID": "${youre id}",
								"newName": "Larsiii"
						}
						{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

* PUT /user/changeLastName ändert den Last Name des Users.
  * Rückgabe bei Erfolg 200 ansonsten 404
  * Beispiel

```javascript
axios.put('http://85.215.71.124/user/changeLastName',
						{
								"userID": "${youre id}",
								"newName": "Gerigk"
						}
						{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

* PUT /user/addEvent fügt einem User ein ausgewähltes Event hinzu.
  * Rückgabe: bei Erfolg (”Added Event succesfully to User!”), ansonsten code 400 wenn der input falsch war
  * Beispiel:

```javascript
axios.put('http://85.215.71.124/user/addEvent',
					{
							"userID": "${youre id}",
					    "eventID": "6615c7d7b30f73c8ba10bead"
					}
					{
							headers: {
                    'Content-Type': 'application/json'
                }
           })
```

* DELETE /:userID/:password löscht einen User und alle seine Vorkommnisse in anderen Datenbank files
  * Rückgabe: bei Erfolg (”Benutzer erfolgreich gelöscht”), ansonsten code 500 oder wenn username oder passwort falsch ist 400
  * Beispiel:

```javascript
axios.delete('http://85.215.71.124/user/661d09ba6671060e01a4fd3e/Alladin!101'
```
