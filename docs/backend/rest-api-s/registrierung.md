# Registrierung

* POST /register → hier sollte noch ein body mitgegeben werden mit: username, password, email, firstName, lastName
  * Rückgabetyp: Bei Erfolg: “Success” (String), ansonsten: 452 Duplicate username, 453 Duplicate Email, 454 Email format false, 455 Password format false oder 500 Internal Server Error
  * Beispiel:

```javascript
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

