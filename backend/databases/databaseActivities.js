const database = require("./databaseMain")
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');

async function postActivity(req) {
    const {beforeImagePath,  afterImagePath, reactions, comment, username, gameName} = req.body
    const activityData = {beforeImagePath,  afterImagePath, reactions, comment, username, gameName}
    const activites = (await database.initializeCollections()).activites
    log.info("Data to be inserted:" + activityData)
    
    let result = await activites.insertOne(activityData)
    if(result){
        return true
    }else{
        return false;
    }
}

async function getActivities(req) {
    const username = req.params.username
    console.log(username)
    const activites = (await database.initializeCollections()).activites
    const personalInformation = (await database.initializeCollections()).personalInformation
    const sipsterID = await database.getSipsterID(username)
    console.log(sipsterID)

    const friends = (await personalInformation.findOne({_id: sipsterID})).friends
    console.log(friends)
    const activitesData = await activites.find({ sipsterID: { $in: friends } }).toArray()
   if (activitesData != null){
        return activitesData
   }else {
        return null;
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

async function uploadBeforePicture(activityID, fileExtension) {
    try {
        const imagePath = `/home/sipster/sipster/backend/static/beforePicture/PictureBefore${activityID}${fileExtension}`
        const activityObjectId = new ObjectId(activityID);
        const result = await database.getDB().collection('activities').updateOne(  //-> Datenbank- Update mit neuem Pfad
            { _id: activityObjectId },
            { $set: { beforeImagePath: imagePath } }
        )
        if (result.modifiedCount === 1) {
            console.log(`BeforePicture für ${activityID} gespeichert.`);
            return "Success";
        } else {
            console.log(`Profilbild für Benutzer ${userIDObj} nicht gefunden.`);
            return "User not found";
        }
    } catch (err) {
        throw new Error("Fehler in der Datenbank")
    }
}

module.exports = {
    postActivity, getActivities, deleteEvents, uploadBeforePicture
}