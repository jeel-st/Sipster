const { MongoClient } = require("mongodb")
const dbEvents = require("../databases/databaseEvents")
const dbLogin = require("../databases/databaseLogin")
const dbRegister = require("../databases/databaseRegister")
const dbFriendSystem = require("../databases/databaseFriendSystem")
const dbProfilePicture = require("../databases/databaseProfilePicture")
const dbUser = require("../databases/databaseUser")

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
    return await dbEvents.postEvents(req)
}

async function deleteEvents(req){
    return await dbEvents.deleteEvents(req)
}

async function getEvents(){
    return await dbEvents.getEvents()
}

async function getLoginData(req){
    return await dbLogin.getLoginData(req)
}

async function postUser(req){
    return await dbRegister.postUser(req)
}

async function deleteUser(req){
    return await dbRegister.deleteUser(req)
}

async function postFriendRequest(req){
    return await dbFriendSystem.postFriendRequest(req)
}

async function acceptFriendRequest(req){
    return await dbFriendSystem.acceptFriendRequest(req)
}

async function declineFriendRequest(req){
    return await dbFriendSystem.declineFriendRequest(req)
}

async function removeFriend(req){
    return await dbFriendSystem.removeFriend(req)
}

async function getFriendList(req){
    return await dbFriendSystem.getFriendList(req)
}

async function getFriendRecommendations(req){
    return await dbFriendSystem.getFriendRecommendations(req);
}

async function uploadProfilePicture(username, fileExtension){
    return await dbProfilePicture.uploadProfilePicture(username, fileExtension)
}

async function getUserData(req){
    return await dbUser.getUserData(req)
}

async function postNewUsername(req){
    return await dbUser.postNewUsername(req)
}

async function getProfilePictureURL(username){
    return await dbProfilePicture.getProfilePictureURL(username)
}

async function deleteProfilePictureURL(username){
    return await dbProfilePicture.deleteProfilePictureURL(username)
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
exports.getFriendRecommendations = getFriendRecommendations
exports.uploadProfilePicture = uploadProfilePicture
exports.getUserData = getUserData
exports.postNewUsername = postNewUsername
exports.getProfilePictureURL = getProfilePictureURL
exports.deleteProfilePictureURL = deleteProfilePictureURL