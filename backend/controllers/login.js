const database = require('../database')

async function getLogin(req, res) {
    const username = req.params.username
    const password = req.params.password
    const tagline = req.params.tagline 

    const usernameFinder = await database.getDB().collection("personalInformation").findOne({ username, password, tagline })

    if (usernameFinder) {

        res.send(true)

    } else {
        res.status(400).send("Ungültige Anmeldedaten.")
    }
}

module.exports = {
    getLogin
}