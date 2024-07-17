# Sips

### API’s für Sips

* PUT /sips/friends → Hier ändert man die sips für eine Anzahl von Freunden, dabei muss ein Array aus ID’s mitgegeben werden und die Anzahl von Sips als Number.
  * Rückgabewert: Array aus result Objects der Datenbank bei Erfolg, ansonsten 204 (”no friends here”) oder Error 500 (”Internal Server Error”)
  * Beispiel:

```javascript
const baseUrl = 'http://85.215.71.124';
const sips = 200
    const userIDArray = ["66730b1aac38b8e571f69859", "663bd3b7969fc6302facf1ee"]
    const response = await axios.put(`${baseUrl}/sips/friends`,{
        "sips": sips,
        "friends": userIDArray
        },{
        headers: {
            'Content-Type': 'application/json'
        }
    });
```

* GET /:userID → Hier wird die Anzahl an Sips für einen bestimmten User mitgegeben. Dabei muss als Parameter die UserID mitgegeben werden.
  * Rückgabewert: Number (bei Erfolg), ansonsten 204 (”no sips found, maybe wrong username”) oder Error 500 (”Internal Server Error”)
  * Beispiel:

```javascript
    const baseUrl = 'http://85.215.71.124';
    const response = await axios.get(`${baseUrl}/sips/${userID}`)
```

* PUT /:userID → Hier wird eine ID mitgegeben und eine Anzahl von Sips, um von einer bestimmten Person die Sips zu ändern. Die Sips werden dabei als Number übergeben.
  * Rückgabewert: DatenbankObject (bei Erfolg), ansonsten 204 ("No sips found, maybe wrong username”) oder Error 500 (”Internal Server Error” + err)
  * Beispiel:

```javascript
const sips = 200
    const response = await axios.put(`${baseUrl}/sips/${userID}`,{
        "sips": sips
        },{
        headers: {
            'Content-Type': 'application/json'
        }
    })
```
