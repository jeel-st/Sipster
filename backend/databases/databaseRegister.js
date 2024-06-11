//Imports
const database = require("./databaseMain")
const { isValidPassword, isValidEmail, encryptPassword, encryptPasswordWithSalt } = require('../utils/registerLogic/registerPatterns')
const log = require("../logging/logger")
const databaseFriend = require("./databaseFriendSystem")

/**
 * Diese Methode dient dazu, einen neuen Benutzer zu registrieren.
 * 
 * @param req: Request-Objekt -> Enthält die Benutzerdaten im Body (username, password, email, firstName, lastName)
 * @return: String -> "Success!" bei erfolgreicher Registrierung, oder ein Fehlerstring bei Problemen
 */

async function postUser(req){
    const { username, password, email, firstName, lastName} = req.body
    const friends = []
    const timestamp = Date.now()
    const registerDate = new Date(timestamp).toISOString();
    const profilePicture = null
    const profilePictureCom200 = null
    const profilePictureCom1080 = null
    const sips = 0

    encryptedPasswordAndSalt = await encryptPassword(password)
    encryptedPassword = encryptedPasswordAndSalt[0]
    salt = encryptedPasswordAndSalt[1]
    
    const personalData = { username, profilePicture, profilePictureCom200, profilePictureCom1080, encryptedPassword, salt, email, firstName, lastName, registerDate, friends, sips }
    
    const usernameFinder = await database.getDB().collection("personalInformation").findOne({ username: username})
    const emailFinder = await database.getDB().collection("personalInformation").findOne({ email: email })

    if (isValidPassword(password)) {
        
        if (isValidEmail(email)) {

            if (usernameFinder) {
                return "Duplicate username"
            } else if (emailFinder) {
                
                return "Duplicate Email"
            } else {
                await database.getDB().collection('personalInformation').insertOne(personalData)
                await databaseFriend.acceptFriendRequest({
                    params: {
                    fromUsername: username,
                    toUsername: "Sipster"
                    }
                })

                return "Success!"
            }
        } else {
            return "Email format false"
        }
    } else {
        return "Password format false"
    }

}

/**
 * Diese Methode dient dazu, einen Benutzer zu löschen.
 * 
 * @param req: Request-Objekt -> Enthält den Benutzernamen und das Passwort in den Parametern (username, password)
 * @return: String -> "Benutzer erfolgreich gelöscht" bei erfolgreicher Löschung, oder ein Fehlerstring bei Problemen
 * @throws Error -> Bei Fehlern während des Löschvorgangs
 */

async function deleteUser(req){
    const username = req.params.username
    const password = req.params.password
    const personalInformation = await database.getDB().collection("personalInformation")
    try {
        const user = await personalInformation.findOne({username: username})
        
        if (user == null) {
            return "Benutzer nicht gefunden"
        } else {
            const salt = user.salt;
            const encryptedPassword = await encryptPasswordWithSalt(salt, password)
            const result = await personalInformation.deleteOne({ username: username, encryptedPassword: encryptedPassword })
            if (result === 0) {
                return "Passwort für " + username + " ist inkorrekt"
            }
            await deleteUserFromFriends(username)
            return "Benutzer erfolgreich gelöscht"
        }
    } catch (error) {
        log.error("Fehler beim Löschen des Benutzers:", error)
        return "Interner Serverfehler"
    }
}

/**
 * Diese Methode dient dazu, einen Benutzer aus den Freundeslisten anderer Benutzer zu entfernen.
 * 
 * @param usernameToRemove: String -> Der Benutzername des zu entfernenden Benutzers
 * @return: void
 */

async function deleteUserFromFriends(usernameToRemove) {
    const result = await database.getDB().collection("personalInformation").updateMany(
        { friends: usernameToRemove },
        { $pull: { friends: usernameToRemove } }
    );
}

module.exports = {
    postUser,
    deleteUser
}