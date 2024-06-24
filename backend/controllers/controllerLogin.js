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
        }else if (usernameFinder == "Benutzer nicht gefunden!") {
            res.status(400).json("Benutzer nicht gefunden!")
        }else if (usernameFinder == "Ungültige Anmeldedaten."){
            res.status(400).json("Falsches Passwort!")
        }else {
            res.status(500).json("Something unexpected happen")
        }
    } catch (err){
        res.status(500).send("Something went wrong!" + err)
    }

}

module.exports = {
    getLogin
}