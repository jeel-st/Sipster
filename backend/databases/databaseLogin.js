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
    const username = req.params.username;
    const password = req.params.password;
    const collectionData = await database.getDB().collection("personalInformation");

    const user = await collectionData.findOne({ username });
    collectionData.updateMany({}, {$set: {events: []}})
    if (!user) {
        throw new Error("Benutzer nicht gefunden!");
    }

    try {
        let salt = user.salt;
        let encryptedPassword = await encryptPasswordWithSalt(salt, password);

        const result = await collectionData.findOne({ username, encryptedPassword });

        if (result) {

            return true;

        } else {
            throw new Error("Ungültige Anmeldedaten.");
        }
    } catch (error) {
        console.error(error);
        throw new Error("Ein Fehler ist aufgetreten.");
    }
}

module.exports = {
    getLoginData
};
