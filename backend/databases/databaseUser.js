const database = require("./databaseMain")
const log = require("../logging/logger")
const { isValidPassword, isValidEmail, encryptPassword } = require("../utils/registerLogic/registerPatterns")

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
    const sipsterID = getSipsterID(username);
    const personalInformation = await database.getDB().collection("personalInformation")
    const filter = {_id: sipsterID}
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

    if (!isValidPassword(newPassword)) return false;

    let result = await personalInformation.updateOne(filter, update)
    if (result.modifiedCount != 0){
        log.info(`Email changed to: ${encryptedPassword}`)
        log.info("You thought you would get the real Password Muhahahahaha!")
        return true;
    }else {
        throw new Error("The update couldn't be completed!")
    }

}

async function postNewEmail(req){
    const {username, newEmail} = req.params
    const personalInformation = await database.getDB().collection("personalInformation")
    const filter = {username: username}
    const update = {$set: {email: newEmail}}

    if (!isValidEmail(newEmail)) return false

    let result = await personalInformation.updateOne(filter, update)
    if (result.modifiedCount != 0){
        log.info(`Email changed to: ${newEmail}`)
        return true;
    }else {
        throw new Error("The update couldn't be completed!")
    }
}

async function getSipsterID(username) {
    const personalInformation = await database.getDB().collection("personalInformation")

    let sipsterID = await personalInformation.find({username: username}).project({_id: 1}).toArray()
    sipsterID = sipsterID.map(id => id._id)
    if (sipsterID == null) {
        throw new Error("This username was not found in the database")
    }
    console.log(sipsterID[0].toString())
    return sipsterID[0].toString()
}


module.exports = {
    getUserData,
    postNewUsername,
    postNewPassword,
    postNewPassword,
    postNewEmail,
    getSipsterID
}