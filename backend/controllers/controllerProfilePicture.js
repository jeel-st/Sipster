const database = require('../databases/databaseMain')
const Form = require('multiparty').Form
const { uploadOptions } = require('../utils/uploadLogic/config')
const fs = require('fs');
const path = require('path');



async function uploadProfilePicture(req, res) {
    try {
        const form = new Form(uploadOptions)
        let uploadedFilename; 
        form.on('file', (name, file) => {
            const originalFilename = file.originalFilename;
            const fileExtension = path.extname(originalFilename);
            const username = req.body.username || req.fields.username
            const newFilename = `Picture${username}`;
         
            const filePath = path.join(uploadOptions.uploadDir, newFilename);
            if (fs.existsSync(filePath)) {
                
                fs.unlinkSync(filePath);
                console.log(`Die vorhandene Datei "${filePath}" wurde gelöscht.`);
            }
            fs.rename(file.path, filePath, (err) => {
              if (err) {
                console.error('Fehler beim Umbenennen der Datei:', err);
                return;
              }
              console.log('Datei erfolgreich umbenannt');
            });
         
            uploadedFilename = newFilename;
        })
        form.on('error', () => { })
        form.on('close',async () => {
            //const uploadPicture = await database.uploadProfilePicture(req);
            
        })
        form.parse(req)

        const uploadPicture = await database.uploadProfilePicture(req)

        res.send("Success!")
    } catch (err) {
        console.log("Fehler beim Hochladen:" + err)
        res.status(500).send("Es ist ein Fehler aufgetreten" + err)
    }
}

module.exports = {
    uploadProfilePicture
}

