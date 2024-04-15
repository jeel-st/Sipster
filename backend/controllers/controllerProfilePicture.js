const database = require('../databases/databaseMain')
const Form = require('multiparty').Form
const { uploadOptions } = require('../utils/uploadLogic/config')
const fs = require('fs');
const path = require('path');



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
            
            const originalFilename = file.originalFilename;
            const fileExtension = path.extname(originalFilename);
            fileExtensionParam = fileExtension
            const newFilename = `Picture${username}${fileExtension}`;
            
            const filePath = path.join(uploadOptions.uploadDir, newFilename);
            const pictureURL = await database.getProfilePictureURL(username)
            console.log(filePath)
            if (pictureURL != null){
                await database.deleteProfilePictureURL(username)
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
            const uploadPicture = await database.uploadProfilePicture(username, fileExtensionParam);
            res.send("Success!")
        })
        form.parse(req)
        
        //const uploadPicture = await database.uploadProfilePicture(req)

        
    } catch (err) {
        console.log("Fehler beim Hochladen:" + err)
        res.status(500).send("Es ist ein Fehler aufgetreten" + err)
    }
}

module.exports = {
    uploadProfilePicture
}

