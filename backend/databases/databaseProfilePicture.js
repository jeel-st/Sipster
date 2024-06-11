//Imports
const database = require("./databaseMain")
const log = require("../logging/logger")
const sharp = require('sharp');

/**
 * Diese Methode dient dazu, ein Profilbild für einen Benutzer hochzuladen, das Bild zu komprimieren und die Pfade in der Datenbank zu speichern.
 * 
 * @param userIDObj: ObjectId -> Die ID des Benutzers
 * @param fileExtension: String -> Die Dateierweiterung des Bildes
 * @param filePathOriginal: String -> Der ursprüngliche Pfad des hochgeladenen Bildes
 * @return: String -> "Success" bei Erfolg, Error -> "User not found" wenn der Benutzer nicht gefunden wird
 * @throws Error -> Bei Fehlern während des Uploads oder der Komprimierung
 */

async function uploadProfilePicture(userIDObj, fileExtension, filePathOriginal){
    try{
        userID = userIDObj.toString()

        const imagePath = `/home/sipster/sipster/backend/static/profilePictures/Picture${userID}${fileExtension}`
        const compressedImagePath200 = `/home/sipster/sipster/backend/static/profilePictures/compressed200/Picture${userID}${fileExtension}`;
        const compressedImagePath800 = `/home/sipster/sipster/backend/static/profilePictures/compressed800/Picture${userID}${fileExtension}`

        try{
            await sharp(filePathOriginal).resize(200).toFile(compressedImagePath200);      //-> Komprimieren des Bild+ speichern in einem zweiten Ordner

        }catch(err){
            throw new Error("Compressing pictures went wrong")
        }
        const result = await database.getDB().collection('personalInformation').updateOne(  //-> Datenbank- Update mit neuem Pfad
            {_id: userIDObj},
            { $set: { profilePicture: imagePath } }
        )

        const resultCompressed200 = await database.getDB().collection('personalInformation').updateOne(
            {_id: userIDObj},
            { $set: { profilePictureCom200: compressedImagePath200 } }
        )
        const resultCompressed800 = await database.getDB().collection('personalInformation').updateOne(
            {_id: userIDObj},
            { $set: { profilePictureCom800: compressedImagePath800 } }
        )      
        if (result.modifiedCount === 1 && resultCompressed200.modifiedCount === 1 && resultCompressed800.modifiedCount ===1) {
            console.log(`Profilbild für Benutzer ${userIDObj} erfolgreich gespeichert.`);
            return "Success";
        } else {
            console.log(`Profilbild für Benutzer ${userIDObj} nicht gefunden.`);
            return "User not found";
        }

    }catch(err){
        console.error('Fehler beim Hochladen des Profilbildes:', err);
        throw new Error('Es ist ein Fehler aufgetreten');
    }
}

/**
 * Diese Methode dient dazu, die URL des Profilbildes eines Benutzers abzurufen.
 * 
 * @param userIDObj: ObjectId -> Die ID des Benutzers
 * @param original: String -> Ein String ("true" oder "false"), der angibt, ob das originale oder das komprimierte Bild zurückgegeben werden soll
 * @return: String -> Die URL des Profilbildes (original oder komprimiert)
 */

async function getProfilePictureURL(userIDObj, original){
    console.log("ID, die in die Datenbank gegeben wird:"+userIDObj)
    const result = await database.getDB().collection('personalInformation').findOne({_id: userIDObj})
    console.log("original "+ original)
    console.log("originaltyp "+ typeof original)

    console.log(result)
    if(original == "0"){
        return result.profilePicture
    }else if(original == "200"){
        return result.profilePictureCom200
    }else{
        return result.profilePictureCom800
    }
}

/**
 * Diese Methode dient dazu, das Profilbild eines Benutzers aus der Datenbank zu löschen.
 * 
 * @param userIDObj: ObjectId -> Die ID des Benutzers
 * @return: String -> "Success" bei Erfolg,  wenn der Benutzer nicht gefunden wird
 * @throws Error -> "User not found" oder "Fehler beim Löschen des Profilbilds:"
 */

async function deleteProfilePictureURL(userIDObj){
    try {
        const result = await database.getDB().collection('personalInformation').updateOne(
            { _id: userIDObj }, 
            { $set: { profilePicture: null, profilePictureCom200: null, profilePictureCom800:null  } }
        )
        
        if (result.modifiedCount === 1) {
            console.log(`Profilbild für Benutzer ${userIDObj} erfolgreich gelöscht.`)
            return "Success"
        } else {
            console.log(`Profilbild für Benutzer ${userIDObj} nicht gefunden.`)
            return "User not found"
        }
    } catch (error) {
        console.error("Fehler beim Löschen des Profilbilds:", error)
        return "Error"
    }

}


module.exports = {
    uploadProfilePicture,
    getProfilePictureURL,
    deleteProfilePictureURL,
}