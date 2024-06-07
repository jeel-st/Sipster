const database = require("../../databases/databaseMain")
const log = require("../../logging/logger")
const Form = require('multiparty').Form
const { uploadOptions } = require('../uploadLogic/config')
const fs = require('fs');
const path = require('path');


async function uploadBeforePicture(req) {
    try {
        const form = new Form(uploadOptions)
        let activityID

        form.on('field', (name, value) => {
            activityID = value
            console.log(`value: ${value}`)
        })
        console.log("Going into file")
        form.on('file', async (name, file) => {
            console.log("ActivityID: " + activityID)
            const originalFilename = file.originalFilename;
            const fileExtension = path.extname(originalFilename);
            console.log("FileExtension: " + fileExtension)
            const newFilename = `PictureBefore${activityID}${fileExtension}`;
            console.log("Neuer Filename: " + newFilename)
            const filePath = path.join(uploadOptions.uploadBeforePicture, newFilename);   //-> neuer Filename wird erstellt
            console.log("FilePath: " + filePath)
            console.log("Sent to database uploadBeforePicture")
            const uploadPicture = await database.uploadBeforePicture(activityID, fileExtension);

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
        form.on('error', () => {
            console.error('Fehler beim Parsen des Formulars:', err)
        })
        form.on('close', async () => {
            console.log("Success")
            return "Success"
        })
        form.parse(req)
    } catch (err) {
        return "Error"+err
    }
}

async function uploadAfterPicture(req) {
    const form = new Form(uploadOptions)
    let activityID

    form.on('field', (name, value) => {
        activityID = value
        console.log(`value: ${value}`)
    })

    form.on('file', async (name, file) => {
        console.log("ActivityID: "+ activityID)
        const originalFilename = file.originalFilename;
        const fileExtension = path.extname(originalFilename);
        console.log("FileExtension: "+ fileExtension)
        const newFilename = `PictureAfter${activityID}${fileExtension}`;
        console.log("Neuer Filename: "+ newFilename)
        const filePath = path.join(uploadOptions.uploadAfterPicture, newFilename);   //-> neuer Filename wird erstellt
        console.log("FilePath: "+ filePath)
        console.log("Sent to database uploadBeforePicture")
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
    uploadBeforePicture,
    uploadAfterPicture
}