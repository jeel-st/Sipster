---
description: >-
  Hier sieht man eine kurze Beschreibung, wie unsere Datenbank aufgebaut ist.
  Dabei sieht man die Namen der collections mit jeweiligen Beispielen unten
  aufgelistet
---

# Datenbank

*   sipster (Name der Datenbank)

    collections:

    *   activities

        Beispielfile:

        ```json
        {
          "_id": {
            "$oid": "666b427d862f539d60f295a7"
          },
          "beforeImage": "/home/sipster/sipster/backend/static/beforePicture/PictureBefore666b427d862f539d60f295a7.webp",
          "beforeImageCom80": "/home/sipster/sipster/backend/static/beforePicture/compressed80/PictureBefore666b427d862f539d60f295a7.webp",
          "beforeImageCom1080": "/home/sipster/sipster/backend/static/beforePicture/compressed1080/PictureBefore666b427d862f539d60f295a7.webp",
          "afterImage": "/home/sipster/sipster/backend/static/afterPicture/PictureAfter666b427d862f539d60f295a7.webp",
          "afterImageCom80": "/home/sipster/sipster/backend/static/afterPicture/compressed80/PictureAfter666b427d862f539d60f295a7.webp",
          "afterImageCom1080": "/home/sipster/sipster/backend/static/afterPicture/compressed1080/PictureAfter666b427d862f539d60f295a7.webp",
          "reactions": {
            "beer": [
              {
                "$oid": "661d67b17e280ddfbcf6ec93"
              },
            ],
            "love": [
              {
                "$oid": "661d5aeb7caebb258991f758"
              }
            ],
            "barf": [],
            "party": []
          },
          "caption": "About last Night #fun #party",
          "userID": {
            "$oid": "661d07706671060e01a4fd3d"
          },
          "gameID": {
            "$oid": "6671f7f1e377d21fdd9e296c"
          },
          "timestamp": {
            "$date": "2024-06-13T19:03:25.206Z"
          }
        }
        ```
    *   events

        Beispielfile:

        ```json
        {
          "_id": {
            "$oid": "666b48ee2a8cb9c8529d11a0"
          },
          "name": "Semester Closing x HS ES",
          "time": "23:00",
          "header": "Schräglage • 26. Juli 2024",
          "desc": "Feiert mit I Love College und der Campus Leben der HS Esslingen die Semester Closing Party in der Schräglage!",
          "tags": [
            "community",
            "priced"
          ],
          "date": {
            "$date": "2024-07-26T23:00:54.823Z"
          }
        }
        ```
    *   games

        Beispielfile:

        ```json
        {
          "_id": {
            "$oid": "6671f7f1e377d21fdd9e297c"
          },
          "name": "Strip Poker",
          "thumbnail": "<http://85.215.71.124/static/gamePictures/StripPoker.jpg>",
          "playtime": "ca. 35 min",
          "description": "An exciting card game for adults in which items of clothing are used as inserts.",
          "category": "18+ Game",
          "sips": 250,
          "status": "unavailable",
          "timestamp": {
            "$date": "2024-04-07T20:00:43.338Z"
          }
        }
        ```
    *   invitations

        Beispielfile:

        ```json
        {
          "_id": {
            "$oid": "667895d541a91f6fbbf1004c"
          },
          "fromUserID": {
            "$oid": "661d07706671060e01a4fd3d"
          },
          "toUserID": {
            "$oid": "6670270d948955d97897c30a"
          },
          "timestamp": {
            "$date": "2024-06-23T21:38:29.636Z"
          }
        }
        ```
    *   personalInformation

        Beispielfile:

        ```json
        {
          "_id": {
            "$oid": "661d5aeb7caebb258991f758"
          },
          "username": "gingerbread_joe",
          "profilePicture": "/home/sipster/sipster/backend/static/profilePictures/Picture661d5aeb7caebb258991f758.jpg",
          "encryptedPassword": "$2b$10$5qER3Z7Q4FYpk18pHkk7huB0/Q9J3Vc2S1SX/3zxB/1LOCW10R0nC",
          "salt": "$2b$10$5qER3Z7Q4FYpk18pHkk7hu",
          "email": "joel.starkov@gmail.com",
          "firstName": "Joel",
          "lastName": "Starkov",
          "registerDate": "2024-04-15T16:50:51.482Z",
          "friends": [
            {
              "$oid": "663bd3b7969fc6302facf1ee"
            },
            {
              "$oid": "661d07706671060e01a4fd3d"
            }
          ],
          "sips": "0",
          "events": [],
          "profilePictureCom200": "/home/sipster/sipster/backend/static/profilePictures/compressed200/Picture661d5aeb7caebb258991f758.webp",
          "profilePictureCom1080": "/home/sipster/sipster/backend/static/profilePictures/compressed1080/Picture661d5aeb7caebb258991f758.webp"
        }
        ```

&#x20; &#x20;

