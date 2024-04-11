const database = require("./databaseMain")
const { isValidPassword, isValidEmail } = require('../utils/registerLogic/registerPatterns')


async function postUser(req){
    const { username, tagline, password, email, firstName, lastName, registerDate } = req.body
    const friends = null
    const personalData = { username, tagline, password, email, firstName, lastName, registerDate, friends }
    
    const usernameFinder = await database.getDB().collection("personalInformation").findOne({ username: username, tagline: tagline })
    const emailFinder = await database.getDB().collection("personalInformation").findOne({ email: email })

    if (isValidPassword(password)) {

        if (isValidEmail(email)) {

            if (usernameFinder) {
                return "Duplicate username + tagline"
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
    const tagline = req.params.tagline
    try {
        const result = await database.getDB().collection("personalInformation").deleteOne({ username: username, tagline: tagline })
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