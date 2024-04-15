const database = require('../databases/databaseMain')

async function getLogin(req, res) {
    try {
        const usernameFinder = await database.getLoginData(req)
        res.send(true)
    } catch {
        res.status(404).send("User not found")
    }

}

module.exports = {
    getLogin
}