//Imports
const log = require("../logging/logger")
const database = require("./databaseMain")

/**
 * Diese Methode ist dazu da, alle in der Datenbank gespeicherte Events an den Client zu schicken.
 * 
 * @return: Objekt- Array -> mit allen Events
 * @throws: Error (bei Fehler)-> "Can't finde any Events"
 */

async function getEvents() {
    const events = database.getDB().collection("events").find().toArray() 
    if(!events) throw new Error('Can´t find any Events');
    return events
}

/**
 * Mit dieser Methode wird ein neues Event in der Datenbank erstellt.
 * 
 * @param req:      Request- Objekt -> hier müssen Name, Datum, Überschrift, Beschreibung und Tags mitgeschickt werden
 * @return:         String (Bei Erfolg) -> "Success", 
 * @throws:         Error (Bei Fehler) -> "Can't add Event"
 */

async function postEvents(req) {
    const {date, name, header, desc, tags} = req.body
    const [dayMonth, time] = date.split('/') // Format of date = "02.04.2024/20:30"
    const [hours, minutes] = time.split(':').map(Number)
    const [day, month, year] = dayMonth.split('.').map(Number)
    
    const realDate = new Date() // new Date(year, month - 1, day, hours, minutes) fand ich schlecht lesbar
    realDate.setMonth(month - 1) //because january is 0: have to add 1 if accessing by getMonth() method
    realDate.setDate(day)
    realDate.setHours(hours)
    realDate.setMinutes(minutes)
    realDate.setFullYear(year)
    const eventsData = {Date: realDate, name, time, header, desc, tags}
    let result = await database.getDB().collection("events").insertOne(eventsData)
    if(result){
        return "Success"
    }else{
        throw new Error('Can´t add Event');
    }
}

/**
 * 
 * Mit dieser Methode wird ein Event aus der Datenbank gelöscht.
 *
 * @param req: Request- Objekt -> hier wird das das Datum, der Name, die Zeit und die Überschrift des zu löschenden Events als Parameter mitgeschickt 
 *
 * @return: String (Bei Erfolg) -> "Event erfolgreich gelöscht"
 * @throws: Error (Bei Fehler) -> "Event nicht gefunden"
 */

async function deleteEvents(req){

    const date = req.params.date
    const name = req.params.name
    const time = req.params.time
    const header = req.params.header

    let result = await database.getDB().collection("events").deleteOne({date: date, name: name, time: time, header: header})

    if (result.deletedCount === 0) {
        throw new Error("Event nicht gefunden")
    } else {
        return("Event erfolgreich gelöscht")
    }
}

module.exports = {
    getEvents, postEvents, deleteEvents
}