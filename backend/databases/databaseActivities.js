const database = require("./databaseMain")
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');


async function postActivity(req) {
    const {caption, userID, gameID} = req.body

    const userIDObj = new ObjectId(userID)
    const gameIDObj = new ObjectId(gameID)


    const reactions = database.reactionsTemplate
    const beforeImagePath = "";
    const afterImagePath = "";

    const activityData = {beforeImagePath,  afterImagePath, reactions, caption, 'userID': userIDObj, 'gameID': gameIDObj}
    const activities = (await database.initializeCollections()).activities
    log.info("Data to be inserted:")
    console.log(activities)
    
    let result = await activities.insertOne(activityData)
    log.info("Result- Objekt: " + result)
    if(result.insertedId){
        console.log("Activity ID: " + result.insertedId)
        return result.insertedId.toString()
    }else{
        throw new Error("Post new Activity failed")
    }
}

async function getActivities(req) {
    const userID = req.params.userID
    const userIDObj = new ObjectId(userID)
    const activities = (await database.initializeCollections()).activities
    const personalInformation = (await database.initializeCollections()).personalInformation
    const user = await personalInformation.findOne({_id: userIDObj})
    let friends = [];
    if (user == null){
        return 'no activity was found by that user!';
    }else {
        friends = user.friends
    }
    const activitiesData = await activities.find({ userID: { $in: friends } }).toArray()

    const games = (await database.initializeCollections()).games
    for (const activity of activitiesData) {

        try {
            const user = await personalInformation.findOne({_id: activity.userID})
            const game = await games.findOne({_id: activity.gameID})
            delete activity.userID
            delete activity.gameID
            activity.user = user
            activity.game = game
        }catch (err) {
            return "Something went wrong with getting the user and the game!"
        }

    }

   if (activitiesData != null){
        return activitiesData
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

async function uploadAfterPicture(activityID, fileExtension) {
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

async function addReaction(req) {
    try {
        const {userID, activityID, reactionType} = req.body

        const activities = (await database.initializeCollections()).activities
        const activityIDObj = new ObjectId(activityID)
        const userIDObj = new ObjectId(userID)
        const update = {
            $addToSet: {
              [`reactions.${reactionType}`]: userIDObj
            }
          };
        
        const result = await activities.updateOne(
            {_id: activityIDObj},
            update
        )
        if (result != null) {
        return ("Reaction added succesfully")
        }else {
            return "error"
        }
    }catch (err) {
        return ("Error")
    }
}

module.exports = {
    postActivity, getActivities, deleteEvents, uploadBeforePicture, uploadAfterPicture, addReaction
}