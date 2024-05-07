const database = require("./databaseMain")
const log = require("../logging/logger")
const sharp = require('sharp');

async function uploadProfilePicture(userIDObj, fileExtension, filePathOriginal){
    try{
        userID = userIDObj.toString()
      //  const originalPath = `/home/sipster/sipster/backend/profilePictures/${filePathOriginal}${fileExtension}`
        const imagePath = `/home/sipster/sipster/backend/profilePictures/Picture${userID}${fileExtension}`
        console.log("imagePath "+imagePath)
        const compressedImagePath = `/home/sipster/sipster/backend/profilePictures/compressed/Picture${userID}${fileExtension}`;
        console.log("compressedImagePath" + compressedImagePath)
        const result = await database.getDB().collection('personalInformation').updateOne(
            {_id: userIDObj},
            { $set: { profilePicture: imagePath } }
        )
        const resultC = await database.getDB().collection('personalInformation').updateOne(
            {_id: userIDObj},
            { $set: { profilePictureC: compressedImagePath } }
        )
        console.log("result "+ result.modifiedCount === 1)
        console.log("resultC "+ resultC.modifiedCount === 1)

        await sharp(filePathOriginal).resize(200).toFile(compressedImagePath);

        if (result.modifiedCount === 1 && resultC.modifiedCount === 1) {
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

async function getProfilePictureURLCompressed(userIDObj){
    console.log("ID, die in die Datenbank gegeben wird:"+userIDObj)
    const result = await database.getDB().collection('personalInformation').findOne({_id: userIDObj})
    console.log(result)
    return result.profilePictureC
}

async function deleteProfilePictureURL(userIDObj){
    try {
        const result = await database.getDB().collection('personalInformation').updateOne(
            { _id: userIDObj }, 
            { $set: { profilePicture: null, profilePictureK: null  } }
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
    getProfilePictureURLCompressed,
}