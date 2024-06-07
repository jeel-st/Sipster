const database = require("./databaseMain")
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');
const { uploadAfterPicture } = require("../utils/activitiesLogic/activitiesLogic");

async function postActivity(req) {
    const {beforeImagePath,  afterImagePath, reactions, comment, username, gameName} = req.body
    const activityData = {beforeImagePath,  afterImagePath, reactions, comment, username, gameName}
    const activites = (await database.initializeCollections()).activites
    log.info("Data to be inserted:" + activityData)
    
    let result = await activites.insertOne(activityData)
    console.log("Result- Objekt: " + result)
    if(result.insertedId){
        console.log("Activity ID: " + result.insertedId)
        return result.insertedId.toString()
    }else{
        throw new Error("Post new Activity failed")
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
        console.log("Neuer ImagePath: "+ imagePath)
        const activityObjectId = new ObjectId(activityID);
        const result = await database.getDB().collection('activities').updateOne(  //-> Datenbank- Update mit neuem Pfad
            { _id: activityObjectId },
            { $set: { beforeImagePath: imagePath } }
        )
        console.log("Result der Datenbank: "+result)
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

async function uploadBeforePicture(activityID, fileExtension) {
    try {
        const imagePath = `/home/sipster/sipster/backend/static/beforePicture/PictureAfter${activityID}${fileExtension}`
        console.log("Neuer ImagePath: "+ imagePath)
        const activityObjectId = new ObjectId(activityID);
        const result = await database.getDB().collection('activities').updateOne(  //-> Datenbank- Update mit neuem Pfad
            { _id: activityObjectId },
            { $set: { afterImagePath: imagePath } }
        )
        console.log("Result der Datenbank: "+result)

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
    postActivity, getActivities, deleteEvents, uploadBeforePicture, uploadAfterPicture
}