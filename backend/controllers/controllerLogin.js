//Imports
const database = require('../databases/databaseMain')
const log = require("../logging/logger")

/**
 * Diese Methode dient dazu, die Anmeldeinformationen eines Benutzers zu überprüfen.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param getLoginData: Function -> Funktion zum Abrufen der Anmeldeinformationen aus der Datenbank
 * @return: Boolean -> true, wenn der Benutzer gefunden wurde, andernfalls eine entsprechende Statusmeldung
 */

async function getLogin(req, res) {
    try {
        const usernameFinder = await database.getLoginData(req)
        console.log("DatabaseResponse:"+ usernameFinder)
        if(usernameFinder == true){
            res.send(true)
        }
    } catch {
        res.status(401).send("User not found")
    }

}

module.exports = {
    getLogin
}