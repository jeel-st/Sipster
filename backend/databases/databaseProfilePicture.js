const database = require("./databaseMain")

async function uploadProfilePicture(username, fileExtension){
    try{

        const imagePath = `/home/sipster/sipster/backend/profilePictures/Picture${username}${fileExtension}`
        console.log(imagePath)
        const result = await database.getDB().collection('personalInformation').updateOne(
            {username: username},
            { $set: { profilePicture: imagePath } }
        )

        if (result.modifiedCount === 1) {
            return 'Profilbild erfolgreich aktualisiert'
        } else {
            throw new Error('Benutzer nicht gefunden');
        }

    }catch(err){
        console.error('Fehler beim Hochladen des Profilbildes:', err);
        throw new Error('Es ist ein Fehler aufgetreten');
    }
}

async function getProfilePictureURL(username){
    const result = await database.getDB().collection('personalInformation').findOne({username})
    return result.profilePicture
}

async function deleteProfilePictureURL(username){
    try {
        const result = await database.getDB().collection('personalInformation').updateOne(
            { username: username }, 
            { $set: { profilePicture: null } }
        )
        
        if (result.modifiedCount === 1) {
            console.log(`Profilbild für Benutzer ${username} erfolgreich gelöscht.`)
            return "Success"
        } else {
            console.log(`Profilbild für Benutzer ${username} nicht gefunden.`)
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