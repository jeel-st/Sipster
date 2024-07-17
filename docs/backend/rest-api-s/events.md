# Events

* GET /events → hier muss nichts weiteres mitgegeben werden, alle Events werden returned
  * Rückgabetyp: Bei Erfolg: json.Object mit allen Events, ansonsten 204 No events available oder 500 Internal Server Error
  * Beispiel:

```javascript
axios.get(http://85.215.71.124/events)
```

* POST /events → hier muss noch ein body mit den folgenden Werten übergeben werden: date, name, header, desc, tags\[Array]
  * Rückgabetyp: Bei Erfolg: “Success” (String), ansonsten 500 Internal Server Error
  * Beispiel: (Nur eine Möglichkeit, hat noch keine Anwendung im Projekt)

```javascript
const axios = require('axios');

const newEvent = {
  date: "02.04.2024/20:30",
  name: "Event Name",
  header: "Event Header",
  desc: "Event Description",
  tags: ["tag1", "tag2", "tag3"]
};

axios.post('http://localhost:3000/', newEvent)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });
```

* DELETE /:date/:name/:time/:header → Hier kann ein Event gelöscht werden, in dem man die Parameter der URL übergibt
  * Rückgabetyp: Bei Erfolg: “Event erfolgreich gelöscht” (String), ansonsten 500 Internal Server Error
  * Beispiel: (Wird bis jetzt nur zu Testzwecken benutzt)

```javascript
axios.delete(http://85.215.71.124/events/:date/:name/:time/:header)
```
