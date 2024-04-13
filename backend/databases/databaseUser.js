const database = require("./databaseMain")

async function getUserData(req) {
    const username = req.params.username
    const personalInformation = await database.getDB().collection("personalInformation")

    const userData = await personalInformation.findOne({username})

    if (!userData){
        console.log("An error occured" )
        throw new Error("There was no User found with that username!")
    }
    return userData;
}
async function postNewUsername(req){
    const {username, newUsername} = req.body

}

module.exports = {
    getUserData,
    postNewUsername
}