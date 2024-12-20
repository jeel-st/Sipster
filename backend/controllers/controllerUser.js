//Imports
const database = require('../databases/databaseMain')
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');

/**
 * Diese Methode ruft die Benutzerdaten für einen bestimmten Benutzernamen ab.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: User- Object -> Die Benutzerdaten oder eine entsprechende Fehlermeldung mit Statuscode
 */

async function getUserData(req, res) {
    try {
        const userData = await database.getUserData(req)
        res.send(userData)
    }catch (err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(500).send("Something went horribly wrong!" + err)
        }
    }
}

/**
 * Diese Methode ruft die Ereignisdaten für einen bestimmten Benutzernamen ab.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: Array aus Events -> Die Ereignisdaten oder eine entsprechende Fehlermeldung mit Statuscode
 */

async function getEvents(req, res) {
    try {
        const eventData = await database.getEventsData(req)
        res.send(eventData)
    }catch (err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(500).send("Something went horribly wrong!" + err)
        }
    }

}

/**
 * Diese Methode ruft alle Eventdaten ab die noch nicht von einem User gespeichert wurden
 * @param {*} req 
 * @param {*} res 
 */
async function getNotStoredEvents(req, res) {
    try {
        const userID = req.params.userID
        const events = await database.getNotStoredEvents(userID)
        res.send(events)
    }catch (err) {
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(500).send("Something went horribly wrong!" + err)
        }
    }
}

/**
 * Diese Methode aktualisiert den Benutzernamen eines Benutzers.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> "Username was succesfully posted!", bei einer Erfolgsmeldung
 * @throws: Error -> bei Fehlern
 */

async function postNewUsername(req, res) {
    try{
        const postNewUsername = await database.postNewUsername(req)
        if(postNewUsername == "This username is already used!"){
            res.status(400).json("This username is already used!")
        }else {
            res.send("Username was succesfully posted!")
        }
        
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(500).send("Something went horribly wrong!" + err)
        }
    }
}

/**
 * Diese Methode aktualisiert das Passwort eines Benutzers.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> "Password was succesfully posted!", bei einer Erfolgsmeldung
 * @throws: Error -> bei Fehlern
 */

async function postNewPassword(req, res) {
    try{
        const isValidPassword = await database.postNewPassword(req)
        if(!isValidPassword) {
            res.status(400).json("The given password is invalid!")
        }else {
            res.send("Password was succesfully posted!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(500).send("Something went horribly wrong!" + err)
        }
    }
}

/**
 * Diese Methode aktualisiert die E-Mail-Adresse eines Benutzers.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> "Email was succesfully posted!", bei einer Erfolgsmeldung
 * @throws: Error -> bei Fehlern
 */

async function postNewEmail(req, res) {
    try{
        const isValidEmail = await database.postNewEmail(req)
        if (!isValidEmail){
            res.status(400).json("The given email is invalid!")
        }else {
            res.send("Email was succesfully posted!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(500).send("Something went horribly wrong!" + err)
        }
    }
}

/**
 * Diese Methode fügt einem Benutzer ein Ereignis hinzu.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> "Added Event succesfully to User!" bei einer Erfolgsmeldung
 * @throws: Error -> bei Fehlern
 */

async function addEvent(req, res) {
    try {
        const addingData = await database.addEvent(req)
        if (addingData){
            res.send("Added Event succesfully to User!")
        }else {
            res.status(500).send("Something went wrong!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(500).send("Something went horribly wrong!" + err)
        }
    }
}

/**
 * Diese Methode ändert den Vornamen eines Benutzers.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> "First Name changed successfully!" bei einer Erfolgsmeldung
 * @throws: Error -> bei Fehlern
 */

async function changeFirstName(req, res) {
    try {
        const userID = req.body.userID
        const newName = req.body.newName

        if (!userID || !newName) {
            res.status(400).send("UserID and new first Name are required.")
        } else {
            const objectId = new ObjectId(userID);
            const result = await database.changeFirstName(objectId, newName)
            if (result == true) {
                res.send("First Name changed successfully!")
            } else {
                res.status(400).send("User not found")
            }
        }
    } catch (error) {
        log.error(error)
        res.status(500).send("Something went wrong." + error)
    }
}

/**
 * Diese Methode ändert den Vornamen eines Benutzers.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> "Last Name changed successfully!" bei einer Erfolgsmeldung
 * @throws: Error -> bei Fehlern
 */

async function changeLastName(req, res) {
    try {
        const userID = req.body.userID
        const newName = req.body.newName


        if (!userID || !newName) {
            res.status(400).send("UserID and new last Name are required.")
        } else {
            const objectId = new ObjectId(userID);
            const result = await database.changeLastName(objectId, newName)
            if (result == true) {
                res.send("Last Name changed successfully!")
            } else {
                res.status(400).send("User not found")
            }
        }
    } catch (error) {
        log.error(error)
        res.status(500).send("Something went wrong." + error)
    }
}
module.exports = {
    getUserData,
    postNewUsername,
    postNewPassword,
    postNewEmail,
    addEvent,
    getNotStoredEvents,
    getEvents,
    changeFirstName,
    changeLastName
}