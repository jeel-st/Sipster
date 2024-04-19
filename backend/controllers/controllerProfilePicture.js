const database = require('../databases/databaseMain')
const Form = require('multiparty').Form
const { uploadOptions } = require('../utils/uploadLogic/config')
const fs = require('fs');
const path = require('path');
const log = require("../logging/logger")



async function uploadProfilePicture(req, res) {
    

    try {
        
        const form = new Form(uploadOptions)
        let username
        let fileExtensionParam
        form.on('field', (name, value)=>{
            username = value
            console.log(`value: ${value}`)
        })
       
        form.on('file', async (name, file) => {
            const userIDObj = await database.getSipsterID(username)
            const userID = userIDObj.toString()
            const originalFilename = file.originalFilename;
            const fileExtension = path.extname(originalFilename);
            fileExtensionParam = fileExtension;
            const newFilename = `Picture${userID}${fileExtension}`;

            const filePath = path.join(uploadOptions.uploadDir, newFilename);
            const pictureURL = await database.getProfilePictureURL(userIDObj);
            console.log(filePath);

            if (pictureURL != null) {
                fs.unlink(pictureURL, (err) => {
                    if (err) {
                        console.error('Fehler beim Löschen des Bildes aus dem Dateisystem:', err);
                        return;
                    }
                    console.log(`Bild ${pictureURL} erfolgreich gelöscht`);

                });
                const deleteURL = await database.deleteProfilePictureURL(userIDObj);
                const uploadPicture = await database.uploadProfilePicture(userIDObj, fileExtensionParam);
                console.log("deleteURL:" + deleteURL);
                console.log("PictureUploadWithDelete:"+uploadPicture)
            }else{
                const uploadPicture = await database.uploadProfilePicture(userIDObj, fileExtensionParam);
                console.log("PictureUpload:"+uploadPicture)
            }

            fs.rename(file.path, filePath, (err) => {
                if (err) {
                    console.error('Fehler beim Umbenennen der Datei:', err);
                    return;
                }
                console.log('Datei erfolgreich umbenannt');
            });

            //uploadedFilename = newFilename;
        })
        form.on('error', () => { })
        form.on('close',async () => {

            res.send("Success!")
        })
        form.parse(req)
        
        //const uploadPicture = await database.uploadProfilePicture(req)

        
    } catch (err) {
        console.log("Fehler beim Hochladen:" + err)
        res.status(500).send("Es ist ein Fehler aufgetreten" + err)
    }
}

async function getProfilePicture(req, res){
        const username = req.params.username
        const userIDObj = await database.getSipsterID(username)
        console.log("Name, der für das Profilbild genommen wird" + username)
        const pictureURL = await database.getProfilePictureURL(userIDObj)
        console.log("url:"+ pictureURL)
        if (!pictureURL) {
            return res.status(404).send('Profilbild nicht gefunden');
        } else {
            res.send(pictureURL)
            console.log(pictureURL)
        }
}

module.exports = {
    uploadProfilePicture,
    getProfilePicture
}

