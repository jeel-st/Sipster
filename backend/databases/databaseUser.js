const database = require("./databaseMain")
const log = require("../logging/logger")
const { encryptPassword } = require("../utils/registerLogic/registerPatterns")

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

async function postNewPassword(req){
    const {username, newPassword} = req.params
    const encryptedPasswordAndSalt = await encryptPassword(newPassword);
    const encryptedPassword = encryptedPasswordAndSalt[0]
    const salt = encryptedPasswordAndSalt[1]
    const personalInformation = await database.getDB().collection("personalInformation")
    const filter = {username: username}
    const update = {$set: {encryptedPassword: encryptedPassword, salt: salt}}

    let result = await personalInformation.updateOne(filter, update)
    console.log(result)

}

async function postNewEmail(req){
    const {username, newEmail} = req.params
    const personalInformation = await database.getDB().collection("personalInformation")
    const filter = {username: username}
    const update = {$set: {username: newEmail}}

    await personalInformation.updateOne(filter, update)

}


module.exports = {
    getUserData,
    postNewUsername,
    postNewPassword,
    postNewPassword
}