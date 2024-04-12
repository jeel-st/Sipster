const database = require("./databaseMain")

async function getUserData(req) {
    const username = req.body
    const personalInformation = await database.getDB().collection("personalInformation")

    const userData = await personalInformation.findOne({username})

    if (!username){
        console.log("An error occured" )
        throw new Error("There was no User found with that username!")
    }
    return userData;
}
async function postNewUsername(username, newUsername){
    return username;
}

module.exports = {
    getUserData,
    postNewUsername
}