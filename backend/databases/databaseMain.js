const { MongoClient } = require("mongodb")
const dbe = require("../databases/databaseEvents")
const dbl = require("../databases/databaseLogin")
const dbr = require("../databases/databaseRegister")

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

async function postEvents(req){
    return await dbe.postEvents(req)
}

async function deleteEvents(req){
    return await dbe.deleteEvents(req)
}

async function getEvents(){
    return await dbe.getEvents()
}

async function getLoginData(req){
    return await dbl.getLoginData(req)
}

async function postUser(req){
    return await dbr.postUser(req)
}

async function deleteUser(req){
    return await dbr.deleteUser(req)
}
function getDB() {
    return db
}




exports.connectToDB = connectToDB
exports.getDB = getDB
exports.postEvents = postEvents
exports.deleteEvents = deleteEvents
exports.getEvents = getEvents
exports.getLoginData = getLoginData
exports.postUser = postUser
exports.deleteUser = deleteUser
