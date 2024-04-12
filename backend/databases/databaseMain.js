const { MongoClient } = require("mongodb")
const dbe = require("../databases/databaseEvents")
const dbl = require("../databases/databaseLogin")
const dbr = require("../databases/databaseRegister")
const dbf = require("../databases/databaseFriendSystem")
const dbp = require("../databases/databaseProfilePicture")

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

async function postFriendRequest(req){
    return await dbf.postFriendRequest(req)
}

async function acceptFriendRequest(req){
    return await dbf.acceptFriendRequest(req)
}

async function declineFriendRequest(req){
    return await dbf.declineFriendRequest(req)
}

async function removeFriend(req){
    return await dbf.removeFriend(req)
}

async function getFriendList(req){
    return await dbf.getFriendList(req)
}

async function uploadProfilePicture(req){
    return await dbp.uploadProfilePicture(req)
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
exports.postFriendRequest = postFriendRequest
exports.acceptFriendRequest = acceptFriendRequest
exports.declineFriendRequest = declineFriendRequest
exports.removeFriend = removeFriend
exports.getFriendList = getFriendList
exports.uploadProfilePicture = uploadProfilePicture