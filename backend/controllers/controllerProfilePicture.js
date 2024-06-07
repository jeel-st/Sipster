//Imports
const database = require('../databases/databaseMain')
const Form = require('multiparty').Form
const { uploadOptions } = require('../utils/uploadLogic/config')
const fs = require('fs');
const path = require('path');
const log = require("../logging/logger")

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

            const pictureURL = await database.getProfilePictureURL(userIDObj, true);

            
            if (pictureURL != null) {
                fs.unlink(pictureURL, (err) => {        //-> Falls ein Bildpfad bereits in der Datenbank existiert, wird das ursprüngliche Bild aus dem Server gelöscht
                    if (err) {
                        console.error('Fehler beim Löschen des Bildes aus dem Dateisystem:', err);
                        return;
                    }
                    console.log(`Bild ${pictureURL} erfolgreich gelöscht`);

                });

                const pictureURLCompressed = await database.getProfilePictureURL(userIDObj, false)
                if (pictureURLCompressed != null) {         //-> Falls ein Bildpfad bereits in der Datenbank existiert, wird das ursprüngliche Bild aus dem Server gelöscht
                    fs.unlink(pictureURLCompressed, (err) => {
                        if (err) {
                            console.error('Fehler beim Löschen des Bildes aus dem Dateisystem:', err);
                            return;
                        }
                        console.log(`Bild ${pictureURL} erfolgreich gelöscht`);
                    })
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

/**
 * Diese Methode dient zum Abrufen des Profilbildes eines Benutzers.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: String -> Die URL des Profilbildes oder eine entsprechende Fehlermeldung mit Statuscode
 * @throws: Error -> Fehler, falls etwas nicht richtig funktioniert
 */

async function getProfilePicture(req, res){
        const username = req.params.username

        const original = req.query.original

        const userIDObj = await database.getSipsterID(username)

        console.log("Name, der für das Profilbild genommen wird" + username)
        const pictureURL = await database.getProfilePictureURL(userIDObj, original)
        console.log("url: "+ pictureURL)
        if (!pictureURL) {
            res.status(404).send('Profilbild nicht gefunden');
        } else {
            res.send(pictureURL)
            console.log(pictureURL)
        }
}

module.exports = {
    uploadProfilePicture,
    getProfilePicture
}