# Profilfotos

* POST /imageUpload → Das hier ist ein spezieller Upload für Profilbilder. Hier muss im body keine Datei im json oder url Format mitgegeben werden, sondern ein multipart/form-data, da wir hier eine User-ID und ein Bild hochladen müssen. Hier muss data zusätzlich als new FormData() Objekt deklariert werden, da wir mit dem npm- Paket multiparty arbeiten. (siehe Bespiel)
  * Rückgabetyp: Bei Erfolg: “Success!” (String), ansonsten 500 Internal Server Error
  * Beispiel:

```javascript
let data = new FormData()
    data.append('userID', '_id')
    data.append('file', { uri: file.uri, name: filename, type: file.mimeType })

    try {
        const response = await axios.post("http://85.215.71.124/imageUpload", data, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
```

* GET /imageUpload/:userID→ hier muss eine userID als Parameter mitgegeben werden um das Profilbild eines bestimmten Benutzers zu bekommen. Zudem muss ein query mitgegeben werden (”original”), welcher “0”, “200” oder “800” heißen muss, je nachdem welche Qualität man haben möchte. Wählt man “original=”0”” aus, bekommt man das Foto in Originalqualität zurück, ansonsten in komprimierter Form.
  * Rückgabetyp: pictureURL (String) → Achtung! Hier handelt es sich um den absoluten Pfad aus dem Serverdirectory! Ansonsten 404, Profilbild nicht gefunden
  * Beispiel:

```javascript
axios.get(http://85.215.71.124/imageUpload/${userID}?original="0")
```
