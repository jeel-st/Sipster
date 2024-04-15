const database = require("./databaseMain")
const log = require("../logging/logger")

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
    const {username, newUsername} = req.params
    const personalInformation = await database.getDB().collection("personalInformation")
    const filter = {username: username}
    const update = {$set: {username: newUsername}}

    await personalInformation.updateOne(filter, update)

}

module.exports = {
    getUserData,
    postNewUsername
}