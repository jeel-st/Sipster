const { MongoClient } = require("mongodb")

let db = null;
const url = `mongodb://localhost:27017/`;

async function connectToDB() {
    MongoClient.connect(url
    ).then((connection) => {
        db = connection.db('sipster');
        console.log('connected to database sipster ...')
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err)
    });
}

async function getEvents() {
    const events = db.collection("events").find().toArray() 
    if(!events) throw new Error('Can´t find any Events');
    return events
}

async function postEvents(req) {
    const {date, name, time, header, desc, tags} = req.body
    const eventsData = {date, name, time, header, desc, tags}
    
    let result = await db.collection("events").insertOne(eventsData)
    if(result){
        return "Success"
    }else{
        throw new Error('Can´t add Event');
    }
}

function getDB() {
    return db
}

module.exports = {
    connectToDB, getEvents, postEvents, getDB
}