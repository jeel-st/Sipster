const database = require("./databaseMain")
const log = require("../logging/logger")

async function uploadProfilePicture(userIDObj, fileExtension){
    try{
        userID = userIDObj.toString()
        const imagePath = `/home/sipster/sipster/backend/profilePictures/Picture${userID}${fileExtension}`
        console.log(imagePath)
        const result = await database.getDB().collection('personalInformation').updateOne(
            {_id: userIDObj},
            { $set: { profilePicture: imagePath } }
        )


    }catch(err){
        console.error('Fehler beim Hochladen des Profilbildes:', err);
        throw new Error('Es ist ein Fehler aufgetreten');
    }
}

async function getProfilePictureURL(userIDObj){
    log.info("ID, die in die Datenbank gegeben wird:"+userIDObj)
    const result = await database.getDB().collection('personalInformation').findOne({_id: userIDObj})
    log.info(result)
    return result.profilePicture
}

async function deleteProfilePictureURL(userIDObj){
    try {
        const result = await database.getDB().collection('personalInformation').updateOne(
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