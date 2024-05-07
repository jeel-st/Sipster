const { MongoClient } = require("mongodb")
const dbEvents = require("../databases/databaseEvents")
const dbLogin = require("../databases/databaseLogin")
const dbRegister = require("../databases/databaseRegister")
const dbFriendSystem = require("../databases/databaseFriendSystem")
const dbProfilePicture = require("../databases/databaseProfilePicture")
const dbUser = require("../databases/databaseUser")
const log = require("../logging/logger")

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

async function getInvitations(req){
    return await dbFriendSystem.getInvitations(req);
}

async function uploadProfilePicture(username, fileExtension, filePathOriginal){
    return await dbProfilePicture.uploadProfilePicture(username, fileExtension, filePathOriginal)
}

async function getUserData(req){
    return await dbUser.getUserData(req)
}

async function postNewUsername(req){
    return await dbUser.postNewUsername(req)
}

async function postNewPassword(req) {
    return await dbUser.postNewPassword(req)
}

async function postNewEmail(req) {
    return await dbUser.postNewEmail(req)
}

async function getProfilePictureURL(username, compressed){
    return await dbProfilePicture.getProfilePictureURL(username, compressed)
}

async function getProfilePictureURLCompressed(username){
    return await dbProfilePicture.getProfilePictureURLCompressed(username)
}
async function deleteProfilePictureURL(username){
    return await dbProfilePicture.deleteProfilePictureURL(username)
}

function getDB() {
    return db
}

async function getSipsterID(username) {
    const personalInformation = await getDB().collection("personalInformation")

    let sipsterID = await personalInformation.find({username: username}).project({_id: 1}).toArray()
    sipsterID = sipsterID.map(id => id._id)
    if (sipsterID == null) {
        throw new Error("This username was not found in the database")
    }
    console.log(sipsterID[0])
    return sipsterID[0]
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
exports.getInvitations = getInvitations
exports.uploadProfilePicture = uploadProfilePicture
exports.getUserData = getUserData
exports.postNewEmail = postNewEmail
exports.postNewPassword = postNewPassword
exports.postNewUsername = postNewUsername
exports.getProfilePictureURL = getProfilePictureURL
exports.getProfilePictureURLCompressed = getProfilePictureURLCompressed
exports.deleteProfilePictureURL = deleteProfilePictureURL
exports.getSipsterID = getSipsterID
