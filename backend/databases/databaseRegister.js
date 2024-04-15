const database = require("./databaseMain")
const { isValidPassword, isValidEmail, encryptPassword, comparePassword, encryptPasswordWithSalt } = require('../utils/registerLogic/registerPatterns')
const log = require("../logging/logger")


async function postUser(req){
    const { username, password, email, firstName, lastName} = req.body
    const friends = null
    const timestamp = Date.now()
    const registerDate = new Date(timestamp).toISOString();
    const profilePicture = null

    encryptedPasswordAndSalt = await encryptPassword(password)
    encryptedPassword = encryptedPasswordAndSalt[0]
    salt = encryptedPasswordAndSalt[1]
    
    const personalData = { username, profilePicture, encryptedPassword, salt, email, firstName, lastName, registerDate, friends }
    
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
                return "Success!"
            }
        } else {
            return "Email format false"
        }
    } else {
        return "Password format false"
    }

}

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