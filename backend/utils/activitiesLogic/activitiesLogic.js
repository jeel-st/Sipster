const database = require("../../databases/databaseMain")
const sharp = require('sharp');
const log = require("../../logging/logger")
const Form = require('multiparty').Form
const { uploadOptions } = require('../uploadLogic/config')
const fs = require('fs');
const path = require('path');

/**
 * This method handles the upload of the "before" picture for an activity.
 * It processes the form data to extract the activity ID and file,
 * compresses the picture, updates the database, and renames the file.
 * @param  req: Object -> The request object, containing the form data.
 * @param  res: Object ->The response object, used to send back the success (String)
 * @throws error: Error -> Error, if something went wrong
 */

async function uploadBeforePicture(req, res) {
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
            const uploadPicture = await database.uploadBeforePicture(activityID, ".webp", file.path);

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
            res.send("Success")
        })
        form.parse(req)
    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
}
/**
 * This method handles the upload of the "after" picture for an activity.
 * It processes the form data to extract the activity ID and file,
 * compresses the picture, updates the database, and renames the file.
 * @param  req: Object -> The request object, containing the form data.
 * @param  res: Object -> The response object, used to send back the success(String)
 * @throws error: Error -> If something went wrong
 */
async function uploadAfterPicture(req, res) {
    try{
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
        const uploadPicture = await database.uploadAfterPicture(activityID, ".webp", file.path);

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

        res.send("Success")
    })
    form.parse(req)
    }catch(err){
        res.status(500).send("Internal Server Error"+err)
    }
}

module.exports = {
    uploadBeforePicture,
    uploadAfterPicture
}