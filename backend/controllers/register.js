const { isValidPassword, isValidEmail } = require('../utils/registerLogic/registerPatterns')
const database = require('../database')

async function postRegister(req, res) {
    const { username, tagline, password, email, firstName, lastName, registerDate } = req.body
    const personalData = { username, tagline, password, email, firstName, lastName, registerDate }
    const usernameFinder = await database.getDB().collection("personalInformation").findOne({ username: username, tagline: tagline })
    const emailFinder = await database.getDB().collection("personalInformation").findOne({ email: email })
    if (isValidPassword(password)) {

        if (isValidEmail(email)) {

            if (usernameFinder) {
                res.send("Duplicate username + tagline")
            } else if (emailFinder) {
                res.send("Duplicate Email")
            } else {
                await database.getDB().collection('personalInformation').insertOne(personalData)
                res.send("Success!")
            }
        } else {
            res.send("Email format false")
        }
    } else {
        res.send("Password format false")
    }
}

async function deleteRegister(req, res) {
    const username = req.params.username
    const tagline = req.params.tagline
    try {
        const result = await database.getDB().collection("personalInformation").deleteOne({ username: username, tagline: tagline })
        if (result.deletedCount === 0) {
            res.status(404).send("Benutzer nicht gefunden")
        } else {
            res.send("Benutzer erfolgreich gelöscht")
        }
    } catch (error) {
        console.error("Fehler beim Löschen des Benutzers:", error)
        res.status(500).send("Interner Serverfehler")
    }
}

module.exports = {
    postRegister, deleteRegister
}