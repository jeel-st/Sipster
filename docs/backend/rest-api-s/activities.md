# Activities

* POST /activities/ → neue Activity erstellen eines users
  * Rückgabe: bei Erfolg: (”Activity was added to the database”), ansonsten 500
  * Beispiel:

```javascript
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

* GET /activities/userID → dadurch bekommt man alle Activities von allen Freunden welche der userID hat. Bei Erfolg werden die Activities in einem Array zurückgeschickt welcher dieselbe Form hat wie beim Post, außer das username und gameName durch userID und gameID ausgetauscht sind. Bei Fehlern im Backend gibt es ein 500. Bei falschem Input ein 400er
  * Rückgabe:

```javascript
[
  {
    "_id": "666b427d862f539d60f295a7",
    "beforeImage": "/home/sipster/sipster/backend/static/beforePicture/PictureBefore666b427d862f539d60f295a7.webp",
    "afterImage": "/home/sipster/sipster/backend/static/afterPicture/PictureAfter666b427d862f539d60f295a7.webp",
    "reactions": {
      "beer": [
        "661d09ba6671060e01a4fd3e",
        "661d07706671060e01a4fd3d"
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
      "username": "TheLars",
      "profilePicture": "/home/sipster/sipster/backend/static/profilePictures/Picture661d07706671060e01a4fd3d.jpeg",
      "email": "l.bauscher@gmx.de",
      "firstName": "Larssiiii",
      "lastName": "Gerigkiiiii",
      "friends": [
        "663bd3b7969fc6302facf1ee",
        "661d5aeb7caebb258991f758",
        "661d67b17e280ddfbcf6ec93",
        "66376ebfd943e5c4c46d11d0",
        "661d5bdb670a3c30735043e8"
      ],
      "sips": "0",
      "events": [
        "666ab2f5fdddd3a93373a2a2"
      ]
    },
    "game": {
      "_id": "6671f7f1e377d21fdd9e296c",
      "name": "Bomb Party",
      "thumbnail": "http://85.215.71.124/static/gamePictures/BombParty.jpg",
      "playtime": "ca. 2min",
      "description": "A player receives a bomb and must pass it on as quickly as possible before it explodes",
      "category": "Q&A",
      "sips": 100,
      "status": "available",
      "timestamp": "2024-04-07T20:00:43.338Z"
    }
  },
  ...
]
```

* Beispiel

```javascript
axios.get('http://85.215.71.124/activities/661d09ba6671060e01a4fd3e')
```

* GET /activities/getActivitiesFromUser/userID → dadurch bekommt man alle Activities von einer bestimmten userID. Bei Erfolg werden die Activities in einem Array zurückgeschickt welcher die selbe form hat wie beim Post außer das username und gameName durch userID und gameID ausgetauscht sind. Bei Misserfolg gibt es ein 500, Bei falschem input den 400
  * Rückgabe bei Erfolg:

```javascript
[
  {
    "_id": "666754e698172b6ff4c27abe",
    "beforeImagePath": "/home/sipster/sipster/backend/static/beforePicture/PictureBefore666754e698172b6ff4c27abe.jpg",
    "afterImagePath": "/home/sipster/sipster/backend/static/beforePicture/PictureAfter666754e698172b6ff4c27abe.jpg",
    "reactions": {
      "beer": [
        "661d09ba6671060e01a4fd3e"
      ],
      "love": [
        "661d09ba6671060e01a4fd3e"
      ],
      "barf": [],
      "party": []
    },
    "caption": "About last Night #fun #party",
    "user": {
      "_id": "661d07706671060e01a4fd3d",
      "username": "gamsa",
      "profilePicture": "/home/sipster/sipster/backend/static/profilePictures/Picture661d07706671060e01a4fd3d.jpeg",
      "email": "lg107@hdm-stuttgart.de",
      "firstName": "Lars",
      "lastName": "Gerigk",
      "friends": [
        "663bd3b7969fc6302facf1ee",
        "661d09ba6671060e01a4fd3e",
        "661d5aeb7caebb258991f758",
        "661d67b17e280ddfbcf6ec93",
        "66376ebfd943e5c4c46d11d0",
        "661d5bdb670a3c30735043e8"
      ],
      "sips": "0",
      "events": []
    },
    "game": {
      "_id": "66426b45d764161a9c336ee6",
      "name": "Bomb Party",
      "timestamp": "2024-06-13T18:00:01.695Z"
    }
  },
  {
    "_id": "666b427d862f539d60f295a7",
    "beforeImage": "/home/sipster/sipster/backend/static/beforePicture/PictureBefore666b427d862f539d60f295a7.webp",
    "beforeImageCom80": "/home/sipster/sipster/backend/static/beforePicture/compressed80/PictureBefore666b427d862f539d60f295a7.webp",
    "beforeImageCom1080": "/home/sipster/sipster/backend/static/beforePicture/compressed1080/PictureBefore666b427d862f539d60f295a7.webp",
    "afterImage": "/home/sipster/sipster/backend/static/afterPicture/PictureAfter666b427d862f539d60f295a7.webp",
    "afterImageCom80": "/home/sipster/sipster/backend/static/afterPicture/compressed80/PictureAfter666b427d862f539d60f295a7.webp",
    "afterImageCom1080": "/home/sipster/sipster/backend/static/afterPicture/compressed1080/PictureAfter666b427d862f539d60f295a7.webp",
    "reactions": {
      "beer": [
        "661d67b17e280ddfbcf6ec93"
      ],
      "love": [],
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
        "661d09ba6671060e01a4fd3e",
        "661d5aeb7caebb258991f758",
        "661d67b17e280ddfbcf6ec93",
        "66376ebfd943e5c4c46d11d0",
        "661d5bdb670a3c30735043e8"
      ],
      "sips": "0",
      "events": []
    },
    "game": {
      "_id": "66426b45d764161a9c336ee6",
      "name": "Bomb Party",
      "timestamp": "2024-06-13T18:00:01.695Z"
    }
  }
]
```

* Beispiel:

```javascript
axios.get('http://85.215.71.124/activities/getActivitiesFromUser/661d09ba6671060e01a4fd3e'
```

* PUT /activities/addReaction fügt eine neue Reaction des users zu einer activity hinzu
  * Rückgabe: bei Erfolg (”reaction added succesfully”), ansonsten code 404
  * Beispiel:

```javascript
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
