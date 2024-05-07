const database = require("./databaseMain")
const log = require("../logging/logger")
const sharp = require('sharp');


async function uploadProfilePicture(userIDObj, fileExtension){
    try{
        userID = userIDObj.toString()
        const imagePath = `/home/sipster/sipster/backend/profilePictures/Picture${userID}${fileExtension}`
        console.log(imagePath)
        const compressedImagePath = `/home/sipster/sipster/backend/profilePictures/compressed/Picture${userID}${fileExtension}`;
        console.log('Komprimiertes Bild Pfad:', compressedImagePath);
        const result = await database.getDB().collection('personalInformation').updateOne(
            {_id: userIDObj},
            { $set: { profilePicture: imagePath } }
        )
        await sharp(imagePath).resize(200).toFile(compressedImagePath);
        if (result.modifiedCount === 1) {
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

async function getProfilePictureURL(userIDObj){
    console.log("ID, die in die Datenbank gegeben wird:"+userIDObj)
    const result = await database.getDB().collection('personalInformation').findOne({_id: userIDObj})
    console.log(result)
    return result.profilePicture
}

async function deleteProfilePictureURL(userIDObj){
    try {
        const result = await database.getDB().collection('personalInformation').updateOne(
            { _id: userIDObj }, 
            { $set: { profilePicture: null } }
        )
        const result2 = await database.getDB().collection('personalInformation').updateOne(
            { _id: userIDObj }, 
            { $set: { profilePicture: null } }
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
    deleteProfilePictureURL
}