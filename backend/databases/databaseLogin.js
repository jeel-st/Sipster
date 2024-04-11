const database = require("./databaseMain")

async function getLoginData(req){
    const username = req.params.username
    const password = req.params.password

    const result = await database.getDB().collection("personalInformation").findOne({username, password})
    if (result) {

        return(true)

    } else {
        throw new Error("Ungültige Anmeldedaten.")
    }
}

module.exports = {
    getLoginData
}