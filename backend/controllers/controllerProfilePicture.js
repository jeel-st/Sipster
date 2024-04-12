const database = require('../databases/databaseMain')

async function uploadProfilePicture(req, res){
    try{
        const uploadPicture = await database.uploadProfilePicture(req)
        res.send("Success!")
    }catch(err){
        console.log("Fehler beim Hochladen:" + err)
        res.status(500).send("Es ist ein Fehler aufgetreten" + err)
    }
}

module.exports = {
    uploadProfilePicture
}