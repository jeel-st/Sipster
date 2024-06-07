const database = require("../../databases/databaseMain")
const log = require("../logging/logger")
const Form = require('multiparty').Form
const { uploadOptions } = require('../utils/uploadLogic/config')
const fs = require('fs');
const path = require('path');


async function uploadBeforePicture(req) {
    const form = new Form(uploadOptions)
    let activityID

    form.on('field', (name, value) => {
        activityID = value
        console.log(`value: ${value}`)
    })

    form.on('file', async (name, file) => {
        const originalFilename = file.originalFilename;
        const fileExtension = path.extname(originalFilename);
        const newFilename = `PictureBefore${activityID}${fileExtension}`;
        const filePath = path.join(uploadOptions.uploadDir, newFilename);   //-> neuer Filename wird erstellt

        const uploadPicture = await database.uploadProfilePicture(activityID, fileExtension);

        if (uploadPicture == "User not found") {
            throw new Error("User not found")
        }

        fs.rename(file.path, filePath, (err) => {       //-> Zuletzt wird das Bild noch umbenannt. Dies DARF KEINESFALLS vor "if (pictureURL != null)" aufgerufen werden, da es im Zweifel dass die if-Bedingung wahr ist, direkt wieder gelöscht wird
            if (err) {
                console.error('Fehler beim Umbenennen der Datei:', err);

                return;
            }
            console.log('Datei erfolgreich umbenannt');
        });
    })
    form.on('error', () => { console.error('Fehler beim Parsen des Formulars:', err)
})
    form.on('close', async () => {

        return "Success"
    })
    form.parse(req)

}

module.exports = {
    uploadBeforePicture
}