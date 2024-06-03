
const log = require("../logging/logger")
const database = require("./databaseMain")

async function getEvents() {
    const events = database.getDB().collection("events").find().toArray() 
    if(!events) throw new Error('Can´t find any Events');
    return events
}

async function postEvents(req) {
    const {date, name, time, header, desc, tags} = req.body
    const eventsData = {date, name, time, header, desc, tags}
    console.log("DB:"+database.getDB())
    let result = await database.getDB().collection("events").insertOne(eventsData)
    if(result){
        return "Success"
    }else{
        throw new Error('Can´t add Event');
    }
}

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