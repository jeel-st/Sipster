const database = require("./databaseMain")
const { isValidPassword, isValidEmail, encryptPassword } = require('../utils/registerLogic/registerPatterns')
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
    try {
        const result = await database.getDB().collection("personalInformation").deleteOne({ username: username, password: password })
        if (result.deletedCount === 0) {
            return "Benutzer nicht gefunden"
        } else {
            return "Benutzer erfolgreich gelöscht"
        }
    } catch (error) {
        console.error("Fehler beim Löschen des Benutzers:", error)
        return "Interner Serverfehler"
    }
}

module.exports = {
    postUser,
    deleteUser
}