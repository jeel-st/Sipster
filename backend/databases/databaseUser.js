//Imports
const database = require("./databaseMain")
const log = require("../logging/logger")

const { isValidPassword, isValidEmail, encryptPassword } = require("../utils/registerLogic/registerPatterns");
const { ObjectId } = require("mongodb");

/**
 * Diese Methode dient dazu, Benutzerdaten basierend auf dem Benutzernamen abzurufen.
 * 
 * @param req: Object -> Die Anfrage, die den Benutzernamen im Parameter enthält
 * @return: Object -> Die Benutzerdaten aus der Datenbank
 */

async function getUserData(req) {
    const personalInformation = (await database.initializeCollections()).personalInformation;
    const username = req.params.username
    const userID = await database.getSipsterID(username)
    const userData = await personalInformation.find({_id: userID}).project({_id: 1, username: 1, profilePicture: 1, email: 1, firstName: 1, lastName: 1, friends: 1, sips: 1, events: 1, profilePictureC: 1}).toArray()

    log.info(userData[0])
    return userData[0];
}

/**
 * Diese Methode dient dazu, Eventdaten eines Benutzers basierend auf dem Benutzernamen abzurufen.
 * 
 * @param req: Object -> Die Anfrage, die den Benutzernamen im Parameter enthält
 * @return: Array -> Die Eventdaten des Benutzers
 */

async function getEventsData(req) {
    const userID = req.params.userID
    const userIDObj = new ObjectId(userID)
    const { personalInformation } = (await database.initializeCollections());
    const userData = await personalInformation.findOne({_id: userIDObj})

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
    const {userID, newUsername} = req.body
    log.info(`given Userid: ${userID} tries to change username to ${newUsername}`);
    const userIDObj = new ObjectId(userID)
    const {personalInformation} = await database.initializeCollections();
    const user = await personalInformation.findOne({_id: userIDObj})
    if (user == null) {
        log.error("There was no user found with that id")
        return "There was no User found with that id!"
    }
    const checkForUsername = await personalInformation.findOne({ username: newUsername });
    if (checkForUsername !== null){
        return "This username is already used!"
    }
    const filter = {_id: userIDObj}
    const update = {$set: {username: newUsername}}
    log.info(`changing ${user.username} to ${newUsername}`)

    const result = await personalInformation.updateOne(filter, update)
    if (result.modifiedCount == 0){
        log.error("The update couldn't be completed")
        return("The update couldn't be completed")
    }else {
        log.info("Update to new Username complete!")
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
    const {userID, newPassword} = req.body
    const userIDObj = new ObjectId(userID)
    const encryptedPasswordAndSalt = await encryptPassword(newPassword);
    const encryptedPassword = encryptedPasswordAndSalt[0]
    const salt = encryptedPasswordAndSalt[1]
    const {personalInformation} = (await database.initializeCollections());
    const filter = {_id: userIDObj}
    const update = {$set: {encryptedPassword: encryptedPassword, salt: salt}}

    if (!isValidPassword(newPassword)){
        log.error("Password is not valid!")
        return false;
    }

    let result = await personalInformation.updateOne(filter, update)
    if (result.modifiedCount !== 0){
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
    const {userID, newEmail} = req.body
    const {personalInformation} = (await database.initializeCollections());
    const userIDObj = new ObjectId(userID)
    const filter = {_id: userIDObj}
    const update = {$set: {email: newEmail}}

    if (!isValidEmail(newEmail)) return false

    let result = await personalInformation.updateOne(filter, update)
    if (result.modifiedCount != 0){
        log.info(`Email changed to: ${newEmail}`)
        return true;
    }else {
        log.error("The update couldn't be completed!")
        return "The update couldn't be completed!"
    }
}

/**
 * Diese Methode dient dazu, ein Event zu einem Benutzer hinzuzufügen.
 * 
 * @param req: Object -> Die Anfrage, die den Benutzernamen und die Event-ID im Body enthält
 * @return: Boolean -> True, wenn das Event erfolgreich hinzugefügt wurde, sonst False
 */

async function addEvent(req){
    const {userID, eventID} = req.body
    const { personalInformation } = (await database.initializeCollections());
    const userIDObj = new ObjectId(userID)
    const filter = {_id: userIDObj}
    const update =  {$addToSet: { events: eventID }}

    const addingData = await personalInformation.updateOne(filter, update)

    if (addingData.modifiedCount !== 0){
        log.info(`Event with ${eventID} added to User ${userID}`)
        return true;
    }else {
        log.error("Something went wrong! the update was not completed")
        log.error(addingData)
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
    const {personalInformation} = await database.initializeCollections()
    const filter = {_id: userID}
    const update = {$set: {"firstName": newName}}

    const postName = await personalInformation.updateOne(filter, update)
    if(postName.modifiedCount === 1){
        log.info(`First Name changed succesfully to: ${newName}`)
        return true
    }else{
        log.error("First Name change failed!")
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
    const {personalInformation} = (await database.initializeCollections())
    const filter = {_id: userID}
    const update = {$set: {"lastName": newName}}

    const postName = await personalInformation.updateOne(filter, update)
    if(postName.modifiedCount === 1){
        log.info(`Last Name changed succesfully to: ${newName}`)
        return true
    }else{
        log.info("change lastName failed!")
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