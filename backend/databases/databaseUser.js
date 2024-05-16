const database = require("./databaseMain")
const log = require("../logging/logger")

const { isValidPassword, isValidEmail, encryptPassword } = require("../utils/registerLogic/registerPatterns")

async function getUserData(req) {
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const username = req.params.username
    const sipsterID = await database.getSipsterID(username)
    const userData = await personalInformation.findOne({_id: sipsterID})

    log.info(userData)
    return userData;
}

async function getEventsData(req) {
    const username = req.params.username
    const sipsterID = await database.getSipsterID(username)
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const userData = await personalInformation.findOne({_id: sipsterID})

    log.info(userData.events)
    return userData.events;
    
}

async function postNewUsername(req){
    const {username, newUsername} = req.body
    log.info(username + " + " + newUsername)
    const sipsterID = await database.getSipsterID(username);
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const filter = {_id: sipsterID}
    const update = {$set: {username: newUsername}}

    const result = await personalInformation.updateOne(filter, update)
    console.log(result)
    if (result.modifiedCount == 0){
        throw new Error("There was no User found with that id!")
    }else {
        return true;
    }

}

async function postNewPassword(req){
    const {username, newPassword} = req.body
    const sipsterID = await database.getSipsterID(username)
    const encryptedPasswordAndSalt = await encryptPassword(newPassword);
    const encryptedPassword = encryptedPasswordAndSalt[0]
    const salt = encryptedPasswordAndSalt[1]
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const filter = {_id: sipsterID}
    const update = {$set: {encryptedPassword: encryptedPassword, salt: salt}}

    if (!isValidPassword(newPassword)) return false;

    let result = await personalInformation.updateOne(filter, update)
    if (result.modifiedCount != 0){
        log.info(`Password changed to: ${encryptedPassword}`)
        log.info("You thought you would get the real Password Muhahahahaha!")
        return true;
    }else {
        throw new Error("The update couldn't be completed!")
    }

}

async function postNewEmail(req){
    const {username, newEmail} = req.body
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const sipsterID = await database.getSipsterID(username);
    const filter = {_id: sipsterID}
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

async function addEvent(req){
    const {username, eventID} = req.body
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const sipsterID = await database.getSipsterID(username)
    const filter = {_id: sipsterID}
    const update =  {$addToSet: { events: eventID }}

    const addingData = await personalInformation.updateOne(filter, update)

    if (addingData != 0){
        log.info(`Event with ${eventID} added to User ${username}`)
        return true;
    }else {
        return false;
    }

}
async function changeFirstName(userID, newName){
    const personalInformation = (await database.initializeCollections()).personalInformation
    const filter = {_id: ObjectId(userID)}
    const update = {$set: {"firstName": newName}}

    const postName = await personalInformation.updateOne(filter, update)
    if(postName.modifiedCount === 1){
        return true
    }else{
        return false
    }
}
async function changeLastName(userID, newName){
    const personalInformation = (await database.initializeCollections()).personalInformation
    const filter = {_id: { "$toObjectId": userID}}
    const update = {$set: {"lastName": newName}}

    const postName = await personalInformation.updateOne(filter, update)
    if(postName.modifiedCount === 1){
        return true
    }else{
        return false
    }
}

module.exports = {
    getUserData,
    postNewUsername,
    postNewPassword,
    postNewPassword,
    postNewEmail,
    addEvent,
    getEventsData,
    changeFirstName,
    changeLastName
}