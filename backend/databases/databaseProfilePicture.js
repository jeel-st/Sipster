const database = require("./databaseMain")

async function uploadProfilePicture(req){
    try{
        
        const username = req.body.username

        const imagePath = `../profilePictures/Picture${username}`

        const result = await database.getDB().collection('personalInformation').updateOne(
            {username: username},
            { $set: { profilbild: imagePath } }
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

module.exports = {
    uploadProfilePicture
}