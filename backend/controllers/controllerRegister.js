//Imports
const database = require('../databases/databaseMain')
const log = require("../logging/logger")

/**
 * Diese Methode verarbeitet die Registrierung eines neuen Benutzers.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> Erfolgsmeldung oder entsprechende Fehlermeldungen mit Statuscode
 * @throws: Error -> schwerwiegender Fehler
 */

async function postRegister(req, res) {
    
    const pushingUser = await database.postUser(req)
    if(pushingUser == "Success!"){
        res.json(pushingUser)
    }else if(pushingUser == "Duplicate username") {
        res.status(452).json(pushingUser)
    }else if (pushingUser == "Duplicate Email"){
        res.status(453).json(pushingUser)
    }else if (pushingUser == "Email format false"){
        res.status(454).json(pushingUser)
    }else if (pushingUser == "Password format false"){
        res.status(455).json(pushingUser)
    }else {
        res.status(500).json(pushingUser)
    }
}

/**
 * Diese Methode verarbeitet das Löschen eines Benutzerkontos.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: JSON -> Erfolgsmeldung oder entsprechende Fehlermeldung mit Statuscode
 */

async function deleteRegister(req, res) {

         const deleteUser = await database.deleteUser(req)
        console.log(deleteUser)
        if(deleteUser == "Benutzer erfolgreich gelöscht"){
            res.json(deleteUser)
        }else{
            res.status(404).json(deleteUser)
        }
}

module.exports = {
    postRegister, deleteRegister
}