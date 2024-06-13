//Imports
const database = require('../databases/databaseMain')
const log = require("../logging/logger")

/**
 * Diese Methode dient dazu, alle Events aus der Datenbank abzurufen.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param getEvents: Function -> Funktion zum Abrufen der Events aus der Datenbank
 * @return: Array aus events -> Die Eventdaten oder eine entsprechende Statusmeldung
 * @throws Error -> Wenn ein interner Serverfehler auftritt
 */

async function getEvents(req, res) {
    try {
        const events = await database.getEvents()
        if(events == null){
            res.status(204).send("No events available")
        }
        res.json(events)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

/**
 * Diese Methode dient dazu, ein neues Event in der Datenbank zu speichern.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param postEvent: Function -> Funktion zum Speichern eines neuen Events in der Datenbank
 * @return: String -> "Success"
 * @throws Error -> Wenn ein interner Serverfehler auftritt
 */

async function postEvents(req, res) {
    try {
        const event = await database.postEvents(req)
        res.json(event)
    } catch (error) {
        res.status(500).send('Internal Server Error' + error)
    }
}

/**
 * Diese Methode dient dazu, ein Event aus der Datenbank zu löschen.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param deleteEvents: Function -> Funktion zum Löschen eines Events aus der Datenbank
 * @return: String -> "Event erfolgreich gelöscht"
 * @throws Error -> Wenn ein interner Serverfehler auftritt
 */

async function deleteEvents(req, res){
    try{
        const event = await database.deleteEvents(req)
        res.json(event)
    }catch{
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getEvents,
    postEvents,
    deleteEvents
}