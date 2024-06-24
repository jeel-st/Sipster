# Homepage

* PUT /homepage

In dieser Methode erhalten Sie die vollständig zusammengestellte Homepage und können diese direkt auf der Homepage laden, indem Sie zwischen den Typen des angegebenen Objekts unterscheiden. Die Typen sind:

`homepage.type = ["game" || "activity" || "event"]`

Wir wissen, dass es sich um eine GET-Anfrage handeln sollte. Allerdings kann man bei einer GET-Anfrage keinen Body senden. Wir müssen jedoch einen Body erhalten, da das Frontend uns die IDs der Typen senden muss, die der Benutzer bereits gesehen hat. So kann das Backend zustandslos bleiben und dennoch nur neue Typen senden.

Die Methode gibt ein Array von Objekten zurück, das alle geladenen Aktivitäten, Events und Spiele enthält.

* Rückgabewert Beispiel:

```javascript
[
  {
    "_id": "666b427d862f539d60f295a7",
    "beforeImage": "/home/sipster/sipster/backend/static/beforePicture/PictureBefore666b427d862f539d60f295a7.webp",
    "afterImage": "/home/sipster/sipster/backend/static/afterPicture/PictureAfter666b427d862f539d60f295a7.webp",
    "reactions": {
      "beer": [
        "661d67b17e280ddfbcf6ec93"
      ],
      "love": [
        "661d5aeb7caebb258991f758"
      ],
      "barf": [
        "661d67b17e280ddfbcf6ec93"
      ],
      "party": [
        "661d67b17e280ddfbcf6ec93"
      ]
    },
    "caption": "About last Night #fun #party",
    "timestamp": "2024-06-13T19:03:25.206Z",
    "user": {
      "_id": "661d07706671060e01a4fd3d",
      "username": "gamsa",
      "profilePicture": "/home/sipster/sipster/backend/static/profilePictures/Picture661d07706671060e01a4fd3d.jpeg",
      "email": "lg107@hdm-stuttgart.de",
      "firstName": "Lars",
      "lastName": "Gerigk",
      "friends": [
        "663bd3b7969fc6302facf1ee",
        "661d5aeb7caebb258991f758",
        "66376ebfd943e5c4c46d11d0",
        "661d5bdb670a3c30735043e8",
        "661cff86211a8acc9c714af1",
        "661d67b17e280ddfbcf6ec93",
        "661d09ba6671060e01a4fd3e"
      ],
      "sips": "0",
      "events": []
    },
    "game": {
      "_id": "66426b45d764161a9c336ee6",
      "name": "Bomb Party",
      "timestamp": "2024-06-13T18:00:01.695Z"
    },
    "type": "activity"
  },
  {
    "_id": "66426b81d764161a9c336ee7",
    "name": "Wahrheit oder Pflicht",
    "timestamp": "2024-02-13T18:00:01.695Z",
    "type": "game"
  },
  {
    "_id": "666b48382a8cb9c8529d119f",
    "Date": "2024-07-27T20:00:52.701Z",
    "name": "Jazz Festival",
    "time": "20:00",
    "header": "jazzopen stuttgart 2024",
    "desc": "Freue dich! Die Jazzopen werden das Event dieses Jahres! Sichere dir Tickets jetzt!",
    "tags": [
      "community",
      "priced"
    ],
    "type": "event"
  },
  {
    "_id": "666b48362a8cb9c8529d119e",
    "Date": "2024-07-19T16:00:50.411Z",
    "name": "Campus-Beach-Bar",
    "time": "16:00",
    "header": "Vaihingen • 19 07 2024",
    "desc": "Ihr seit Student*innen und habt kein Geld für Urlaub? Gar kein Problem wir bringen den Strand zu euch bei unserer Beach Party zwischen Palmen und Pinã Coladãs!",
    "tags": [
      "community",
      "150 sips"
    ],
    "type": "event"
  },
  {
    "_id": "666b48332a8cb9c8529d119d",
    "Date": "2024-06-18T19:00:47.059Z",
    "name": "Straussi-3",
    "time": "19:00",
    "header": "Vaihingen • 18 06 2024",
    "desc": "The legendary Straussi 3 Sommerfest returns! This time on whole new Level!!! Don't miss out",
    "tags": [
      "community",
      "100 sips"
    ],
    "type": "event"
  },
  {
    "_id": "66426b45d764161a9c336ee6",
    "name": "Bomb Party",
    "timestamp": "2024-06-13T18:00:01.695Z",
    "type": "game"
  },
  {
    "_id": "666b482f2a8cb9c8529d119c",
    "Date": "2024-04-07T20:00:43.338Z",
    "name": "Unithekle",
    "time": "20:00",
    "header": "Vaihingen • 7 Apr 2024",
    "desc": "Imagine a drinking night with Jordine...",
    "tags": [
      "community",
      "120 sips"
    ],
    "type": "event"
  },
  {
    "_id": "666b48ee2a8cb9c8529d11a0",
    "Date": "2024-07-26T23:00:54.823Z",
    "name": "Semester Closing x HS Esslingen",
    "time": "23:00",
    "header": "Schräglage • 26. Juli 2024",
    "desc": "Feiert mit I Love College und der Campus Leben der HS Esslingen die Semester Closing Party in der Schräglage!",
    "tags": [
      "community",
      "priced"
    ],
    "type": "event"
  }
]
```

* Beispiel:

```javascript
axios.put(`http://85.215.71.124/homepage`,
{
		"userID": "661d5aeb7caebb258991f758",
		"usedIDs": [
		{
		"type": "activity",
		"id": "666b427d862f539d60f295a7"
		},
		{
		"type": "event",
		"id": "666ab2f5fdddd3a93373a2a2"
		},
		{
		"type": "game",
		"id": "6671f7f1e377d21fdd9e296c"
		}
		]
            },
            {
	          headers: {
	                 'Content-Type': 'application/json'
            }
            })
```

