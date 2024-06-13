//Imports
const { on } = require('nodemon')
const database = require('../databases/databaseMain')

/**
 * Diese Methode ruft die Sipswerte für einen bestimmten Benutzer ab.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: Number -> Die Sipswerte des Benutzers 
 * @throws: Error -> falscher username oder Error
 */
async function getHomepage(req, res) {
    try {
        const homepage = await database.getHomepage(req);
        if (homepage !== null) {
            res.json(homepage)
        }else {
            res.status(400).json("Wrong input!")
        }
    }catch (err) {
        res.status(404).json("Something went wrong here!")
    }
}

module.exports = {
    getHomepage
}