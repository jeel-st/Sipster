const database = require("./databaseMain")

async function getLoginData(req){
    const username = req.params.username
    const password = req.params.password
    const tagline = req.params.tagline 

    const result = await database.getDB().collection("personalInformation").findOne({username, password, tagline})
    if (result) {

        return(true)

    } else {
        throw new Error("Ungültige Anmeldedaten.")
    }
}

module.exports = {
    getLoginData
}