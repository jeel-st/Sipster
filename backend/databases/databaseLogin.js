//Imports
const database = require("./databaseMain");
const { encryptPasswordWithSalt } = require('../utils/registerLogic/registerPatterns');
const log = require("../logging/logger")

/**
 * Diese Methode dient dazu, die Anmeldedaten eines Benutzers zu überprüfen.
 * 
 * @param req: Request-Objekt -> hier müssen der Benutzername und das Passwort übergeben werden
 * @return: Boolean (Bei Erfolg) -> `true` wenn die Anmeldedaten korrekt sind
 * @throws: Error (Bei Fehler) -> "Benutzer nicht gefunden!" oder "Ungültige Anmeldedaten." oder allgemeiner Fehler
 */
async function getLoginData(req) {
    const {username, password} = req.body
    log.info("username: "+ username)
    log.info("password: "+ password)
    const {personalInformation} = await database.initializeCollections();

    const user = await personalInformation.findOne({ username });
    log.info("User, der gefunden wurde: "+ user)
    if (!user) {
        log.error("Benutzer nicht gefunden!")
        return("Benutzer nicht gefunden!");
    }else {
        log.info("user: "+ user)
    }

    try {
        const salt = user.salt;
        const encryptedPassword = await encryptPasswordWithSalt(salt, password);

        const result = await personalInformation.findOne({ username, encryptedPassword });
        log.info("Ergebnis, dass in der Datenbank gefunden wurde(username + passwort): "+ result)
        if (result.username == username && result.encryptedPassword == encryptedPassword) {
            return true;
        } else {
            log.error("Ungültige Anmeldedaten")
            return ("Ungültige Anmeldedaten.");
        }
    } catch (error) {
        log.error(error);
        return ("Ein Fehler ist aufgetreten.");
    }
}

module.exports = {
    getLoginData
};
