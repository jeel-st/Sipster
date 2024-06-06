//Imports
const database = require("./databaseMain")
const log = require("../logging/logger")

const { isValidPassword, isValidEmail, encryptPassword } = require("../utils/registerLogic/registerPatterns")

/**
 * Diese Methode dient dazu, Benutzerdaten basierend auf dem Benutzernamen abzurufen.
 * 
 * @param req: Object -> Die Anfrage, die den Benutzernamen im Parameter enthält
 * @return: Object -> Die Benutzerdaten aus der Datenbank
 */

async function getUserData(req) {
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const username = req.params.username
    const sipsterID = await database.getSipsterID(username)
    const userData = await personalInformation.findOne({_id: sipsterID})

    log.info(userData)
    return userData;
}

/**
 * Diese Methode dient dazu, Eventdaten eines Benutzers basierend auf dem Benutzernamen abzurufen.
 * 
 * @param req: Object -> Die Anfrage, die den Benutzernamen im Parameter enthält
 * @return: Array -> Die Eventdaten des Benutzers
 */

async function getEventsData(req) {
    const username = req.params.username
    const sipsterID = await database.getSipsterID(username)
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const userData = await personalInformation.findOne({_id: sipsterID})

    log.info(userData.events)
    return userData.events;
    
}

/**
 * Diese Methode dient dazu, den Benutzernamen eines Benutzers zu ändern.
 * 
 * @param req: Object -> Die Anfrage, die den aktuellen und neuen Benutzernamen im Body enthält
 * @return: Boolean -> True, wenn die Aktualisierung erfolgreich war, sonst False
 * @throws Error -> Wenn der Benutzer nicht gefunden wird
 */

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

/**
 * Diese Methode dient dazu, das Passwort eines Benutzers zu ändern.
 * 
 * @param req: Object -> Die Anfrage, die den Benutzernamen und das neue Passwort im Body enthält
 * @return: Boolean -> True, wenn die Aktualisierung erfolgreich war, sonst False
 * @throws Error -> Wenn die Passwortaktualisierung nicht abgeschlossen werden konnte
 */

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

/**
 * Diese Methode dient dazu, die E-Mail-Adresse eines Benutzers zu ändern.
 * 
 * @param req: Object -> Die Anfrage, die den Benutzernamen und die neue E-Mail-Adresse im Body enthält
 * @return: Boolean -> True, wenn die Aktualisierung erfolgreich war, sonst False
 * @throws Error -> Wenn die E-Mail-Aktualisierung nicht abgeschlossen werden konnte
 */

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

/**
 * Diese Methode dient dazu, ein Event zu einem Benutzer hinzuzufügen.
 * 
 * @param req: Object -> Die Anfrage, die den Benutzernamen und die Event-ID im Body enthält
 * @return: Boolean -> True, wenn das Event erfolgreich hinzugefügt wurde, sonst False
 */

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

/**
 * Diese Methode dient dazu, den Vornamen eines Benutzers zu ändern.
 * 
 * @param userID: ObjectID -> Die ID des Benutzers
 * @param newName: String -> Der neue Vorname
 * @return: Boolean -> True, wenn die Aktualisierung erfolgreich war, sonst False
 */

async function changeFirstName(userID, newName){
    const personalInformation = (await database.initializeCollections()).personalInformation
    const filter = {_id: userID}
    const update = {$set: {"firstName": newName}}

    const postName = await personalInformation.updateOne(filter, update)
    if(postName.modifiedCount === 1){
        return true
    }else{
        return false
    }
}

/**
 * Diese Methode dient dazu, den Nachnamen eines Benutzers zu ändern.
 * 
 * @param userID: ObjectID -> Die ID des Benutzers
 * @param newName: String -> Der neue Nachname
 * @return: Boolean -> True, wenn die Aktualisierung erfolgreich war, sonst False
 */

async function changeLastName(userID, newName){
    const personalInformation = (await database.initializeCollections()).personalInformation
    const filter = {_id: userID}
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