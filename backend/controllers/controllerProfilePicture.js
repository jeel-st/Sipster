//Imports
const database = require('../databases/databaseMain')
const { uploadOptions } = require('../utils/uploadLogic/config')
const log = require("../logging/logger")
const logicFile = require("../utils/profilePictureLogic/profilePictureLogic")
const { ObjectId } = require('mongodb');

/**
 * Diese Methode ist der Controller zum Hochladen der Profilbilder und leitet an die Logik weiter.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: In der Logikmethode wird erst etwas returned
 * @throws: Error -> Fehler, falls etwas nicht richtig funktioniert
 */

async function uploadProfilePicture(req, res){
    try{
        console.log("Went into logic uploadProfilePicture")
        const result = await logicFile.uploadProfilePicture(req, res)
        console.log("Result"+result)
        
    }catch(error){
        console.error('Fehler beim Hochladen des Bildes:', error);
    }
}


/**
 * Diese Methode dient zum Abrufen des Profilbildes eines Benutzers.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> Die URL des Profilbildes oder eine entsprechende Fehlermeldung mit Statuscode
 * @throws: Error -> Fehler, falls etwas nicht richtig funktioniert
 */

async function getProfilePicture(req, res){
        const userID = req.params.userID

        const original = req.query.original
        const userIDObj = new ObjectId(userID)

        const pictureURL = await database.getProfilePictureURL(userIDObj, original)
        console.log("url: "+ pictureURL)
        if (!pictureURL) {
            res.status(400).send('Profilbild nicht gefunden');
        } else {
            res.send(pictureURL)
            console.log(pictureURL)
        }
}

module.exports = {
    uploadProfilePicture,
    getProfilePicture
}