//Imports
const { MongoClient } = require("mongodb")
const dbEvents = require("../databases/databaseEvents")
const dbLogin = require("../databases/databaseLogin")
const dbRegister = require("../databases/databaseRegister")
const dbFriendSystem = require("../databases/databaseFriendSystem")
const dbProfilePicture = require("../databases/databaseProfilePicture")
const dbUser = require("../databases/databaseUser")
const dbSips = require("../databases/databaseSips")
const dbActivities = require("../databases/databaseActivities")
const log = require("../logging/logger")

const reactionsTemplate = {
    beer: [],
    love: [],
    barf: [],
    party: []
  };

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

async function getEventsData(req){
    return await dbUser.getEventsData(req)
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

async function getProfilePictureURL(username, original){
    return await dbProfilePicture.getProfilePictureURL(username, original)
}

async function deleteProfilePictureURL(username){
    return await dbProfilePicture.deleteProfilePictureURL(username)
}


async function postActivity(req) {
    return await dbActivities.postActivity(req)
}

async function getActivities(req) {
    return await dbActivities.getActivities(req)
}

async function getActivitiesFromUser(req) {
    return await dbActivities.getActivitiesFromUser(req)
}

async function addReaction(req) {
    return await dbActivities.addReaction(req)
}

async function uploadBeforePicture(activityID, fileExtension){
    return await dbActivities.uploadBeforePicture(activityID, fileExtension)
}

async function uploadAfterPicture(activityID, fileExtension){
    return await dbActivities.uploadAfterPicture(activityID, fileExtension)
}

async function getSips(username){
    return await dbSips.getSips(username)
}

async function changeSips(username, sipsNew){
    return await dbSips.changeSips(username, sipsNew)
}

async function changeFirstName(userID, newName){
    return await dbUser.changeFirstName(userID, newName)
}

async function changeLastName(userID, newName){
    return await dbUser.changeLastName(userID, newName)
}
 function getDB(){
    return  db
}

/**
 * Diese Methode dient dazu, die Sipster-ID eines Benutzers anhand des Benutzernamens abzurufen.
 * 
 * @param username: String -> Der Benutzername, für den die Sipster-ID abgerufen werden soll
 * @return: ObjectId -> Die Sipster-ID des Benutzers, 
 * @throws: UsernameNotFoundError -> Wenn der Benutzername nicht in der Datenbank gefunden wird
 */

async function getSipsterID(username) {
    const personalInformation = (await initializeCollections()).personalInformation
    let sipsterID = await personalInformation.find({username: username}).project({_id: 1}).toArray()
    sipsterID = sipsterID.map(id => id._id)
    if (!sipsterID) {
        throw new UsernameNotFoundError("This username was not found in the database")
    }
    return sipsterID[0]
}

/**
 * Diese Methode dient dazu, die erforderlichen Datenbank-Collections zu initialisieren.
 * 
 * @return: Object -> Ein Objekt, das die initialisierten Collections `personalInformation`, `invitations` und `events` enthält
 */

async function initializeCollections() {
    const personalInformation = db.collection("personalInformation");
    const invitations = db.collection("invitations");
    const events = db.collection("events");
    const activities = db.collection("activities");
    const games = db.collection("games");

    return {
        personalInformation: personalInformation,
        invitations: invitations,
        events: events,
        activities: activities,
        games: games
    };
}

class UsernameNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

Object.assign(exports, {
    connectToDB,
    getDB,
    postEvents,
    deleteEvents,
    getEvents,
    getLoginData,
    postUser,
    deleteUser,
    postFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    getFriendList,
    getFriendRecommendations,
    getInvitations,
    uploadProfilePicture,
    getUserData,
    getEventsData,
    postNewEmail,
    postNewPassword,
    postNewUsername,
    getProfilePictureURL,
    deleteProfilePictureURL,
    getSipsterID,
    initializeCollections,
    getSips,
    changeSips,
    changeFirstName,
    changeLastName,
    postActivity,
    getActivities,
    getActivitiesFromUser,
    addReaction,
    uploadAfterPicture,
    uploadBeforePicture,
    UsernameNotFoundError,
    reactionsTemplate
})

/*
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
exports.getEventsData = getEventsData
exports.postNewEmail = postNewEmail
exports.postNewPassword = postNewPassword
exports.postNewUsername = postNewUsername
exports.getProfilePictureURL = getProfilePictureURL
exports.deleteProfilePictureURL = deleteProfilePictureURL
exports.postActivity = postActivity;
exports.getActivities = getActivities;
exports.getSipsterID = getSipsterID
exports.initializeCollections = initializeCollections;
<<<<<<< backend/databases/databaseMain.js
exports.uploadAfterPicture = uploadAfterPicture
exports.uploadBeforePicture = uploadBeforePicture
exports.UsernameNotFoundError = UsernameNotFoundError;
=======
exports.getSips = getSips
exports.changeSips = changeSips
exports.changeFirstName = changeFirstName
exports.changeLastName = changeLastName
exports.UsernameNotFoundError = UsernameNotFoundError;
*/
// backend/databases/databaseMain.js
