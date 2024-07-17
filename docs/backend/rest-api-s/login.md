# Login

*   POST /login/ → hier sollte der passende username + password in den body eingesetzt werden, hier wird geschaut, ob die Anmeldedaten übereinstimmen

    * Rückgabetyp: Bei Erfolg: true (Boolean), ansonsten 400 mit entsprechender Fehlermeldung, “Benutzer nicht gefunden!” oder “Falsches Passwort!”. Ansonsten 500
    * Beispiel:



    ```javascript
    axios.post('http://85.215.71.124/login/',
                {
                    "username": username,
                    "password": password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

    ```

