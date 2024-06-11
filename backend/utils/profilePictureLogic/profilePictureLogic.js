//Imports
const database = require("../../databases/databaseMain")
const Form = require('multiparty').Form
const { uploadOptions } = require("../uploadLogic/config")
const fs = require('fs');
const path = require('path');
const log = require("../../logging/logger")

/**
 * Diese Methode dient zum Hochladen eines Profilbildes.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param Form: Object -> Das Formular für den Dateiupload
 * @param uploadOptions: Object -> Die Konfiguration für den Dateiupload
 * @param fs: Object -> Das Modul "fs" für Dateioperationen
 * @param path: Object -> Das Modul "path" für Dateipfade
 * @return: String -> "Success!"
 * @throws: Error-> bei Fehlern
 */

async function uploadProfilePicture(req, res) {

    try {

        const form = new Form(uploadOptions)
        let username
        let fileExtensionParam

        /*Aus dem Feld 'field' wird sich der Username geholt*/

        form.on('field', (name, value) => {
            username = value
            console.log(`value: ${value}`)
        })

        /*Aus dem Feld 'file' wird sich das File geholt*/

        form.on('file', async (name, file) => {
            const userIDObj = await database.getSipsterID(username)

            const userID = userIDObj.toString()

            const originalFilename = file.originalFilename;

            const fileExtension = path.extname(originalFilename);   //-> hier wird sich die Endung des Bildes geholt, welches die Komprimisation beschreibt (z.B .png, .jpg...)

            fileExtensionParam = fileExtension;

            const newFilename = `Picture${userID}${fileExtension}`;

            const filePath = path.join(uploadOptions.uploadDir, newFilename);   //-> neuer Filename wird erstellt

            const pictureURL = await database.getProfilePictureURL(userIDObj, "0");

            
            if (pictureURL != null) {
                fs.unlink(pictureURL, (err) => {        //-> Falls ein Bildpfad bereits in der Datenbank existiert, wird das ursprüngliche Bild aus dem Server gelöscht
                    if (err) {
                        console.error(`Fehler beim Löschen des Bildes ${pictureURL} aus dem Dateisystem:`, err);
                        return;
                    }
                    console.log(`Bild ${pictureURL} erfolgreich gelöscht`);

                });

                const pictureURLCompressed200 = await database.getProfilePictureURL(userIDObj, "200")
                if (pictureURLCompressed200 != null) {         //-> Falls ein Bildpfad bereits in der Datenbank existiert, wird das ursprüngliche Bild aus dem Server gelöscht
                    fs.unlink(pictureURLCompressed200, (err) => {
                        if (err) {
                            console.error(`Fehler beim Löschen des Bildes ${pictureURLCompressed200} aus dem Dateisystem:`, err);
                            return;
                        }
                        console.log(`Bild ${pictureURLCompressed200} erfolgreich gelöscht`);
                    })
                    const pictureURLCompressed1080 = await database.getProfilePictureURL(userIDObj, "800")
                    if (pictureURLCompressed1080 != null) {         //-> Falls ein Bildpfad bereits in der Datenbank existiert, wird das ursprüngliche Bild aus dem Server gelöscht
                        fs.unlink(pictureURLCompressed1080, (err) => {
                            if (err) {
                                console.error(`Fehler beim Löschen des Bildes ${pictureURLCompressed1080} aus dem Dateisystem:`, err);
                                return;
                            }
                            console.log(`Bild ${pictureURLCompressed1080} erfolgreich gelöscht`);
                        })
                }
            }
                const deleteURL = await database.deleteProfilePictureURL(userIDObj);
                const uploadPicture = await database.uploadProfilePicture(userIDObj, fileExtensionParam, file.path);

            } else {
                const uploadPicture = await database.uploadProfilePicture(userIDObj, fileExtensionParam, file.path);    //-> Falls kein Pfad vorhanden ist, wird alles direkt an die Datenbank geschickt
                console.log("PictureUpload:" + uploadPicture)
            }

            fs.rename(file.path, filePath, (err) => {       //-> Zuletzt wird das Bild noch umbenannt. Dies DARF KEINESFALLS vor "if (pictureURL != null)" aufgerufen werden, da es im Zweifel dass die if-Bedingung wahr ist, direkt wieder gelöscht wird
                if (err) {
                    console.error('Fehler beim Umbenennen der Datei:', err);
                    return;
                }
                console.log('Datei erfolgreich umbenannt');
            });

            
        })
        form.on('error', () => { })
        form.on('close', async () => {

            res.send("Success!")
        })
        form.parse(req)



    } catch (err) {
        console.log("Fehler beim Hochladen:" + err)
        res.status(500).send("Es ist ein Fehler aufgetreten" + err)
    }
}

module.exports = {
    uploadProfilePicture
}