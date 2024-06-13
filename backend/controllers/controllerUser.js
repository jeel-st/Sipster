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
            res.status(404).send("Something went horribly wrong!")
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
        log.info("in Controller")
        const eventData = await database.getEventsData(req)
        res.send(eventData)
    }catch (err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
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
        }
        res.send("Username was succesfully posted!")
        
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
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
            res.status(1001).json("The given password is invalid!")
        }else {
            res.send("Password was succesfully posted!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
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
            res.status(1001).json("The given email is invalid!")
        }else {
            res.send("Email was succesfully posted!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
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
            res.status(404).send("Something went wrong!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
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
                res.status(404).send("User not found")
            }
        }
    } catch (error) {
        log.error(error)
        res.status(500).send("Something went wrong.")
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
                res.status(404).send("User not found")
            }
        }
    } catch (error) {
        log.error(error)
        res.status(500).send("Something went wrong.")
    }
}
module.exports = {
    getUserData,
    postNewUsername,
    postNewPassword,
    postNewEmail,
    addEvent,
    getEvents,
    changeFirstName,
    changeLastName
}