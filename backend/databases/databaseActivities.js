const database = require("./databaseMain")
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');
const sharp = require('sharp');


async function postActivity(req) {
    const {caption, userID, gameID} = req.body

    const userIDObj = new ObjectId(userID)
    const gameIDObj = new ObjectId(gameID)


    const reactions = database.reactionsTemplate
    const beforeImage = null;
    const afterImage = null;
    const beforeImageCom200 = null
    const beforeImageCom1080 = null
    const afterImageCom200 = null
    const afterImageCom1080 = null

    const activityData = {beforeImage, beforeImageCom200, beforeImageCom1080, afterImage, afterImageCom200, afterImageCom1080, reactions, caption, 'userID': userIDObj, 'gameID': gameIDObj}
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
            const user = await personalInformation.find({_id: activity.userID})
                .project({_id: 1, username: 1, profilePicture: 1, email: 1, firstName: 1, lastName: 1, friends: 1, sips: 1, events: 1, profilePictureC: 1})
                .toArray()
            const game = await games.findOne({_id: activity.gameID})
            delete activity.userID
            delete activity.gameID
            activity.user = user[0]
            activity.game = game
        }catch (err) {
            return "Something went wrong with getting the user and the game!"
        }

    }

   if (activitiesData != null){
        return activitiesData
   }
}

async function getActivitiesFromUser(req) {
    const userID = req.params.userID
    const userIDObj = new ObjectId(userID)
    try {
    const activities = (await database.initializeCollections()).activities
    const activitiesFromUser = activities.find(
        {userID: userIDObj}
    ).toArray()

    console.log(activitiesFromUser.length)
    if (activitiesFromUser.length === undefined){

        return ("no activity was found by that user!")
    }else {
        return activitiesFromUser
    }


    }catch (err){
        return ("Something went wrong" + err)
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

async function uploadBeforePicture(activityID, fileExtension, filePathOriginal) {
    try {
        const imagePath = `/home/sipster/sipster/backend/static/beforePicture/PictureBefore${activityID}${fileExtension}`
        const compressedImagePath200 = `/home/sipster/sipster/backend/static/beforePicture/compressed200/PictureBefore${activityID}${fileExtension}`
        const compressedImagePath1080 = `/home/sipster/sipster/backend/static/beforePicture/compressed1080/PictureBefore${activityID}${fileExtension}`
        try {
            await sharp(filePathOriginal)
                .resize({ width: 200 }) // Ändere die Größe des Bildes auf eine Breite von 800px
                .toFormat('webp', { quality: 80 }) // Komprimiere das Bild mit 80% Qualität
                .toFile(compressedImagePath200);
            await sharp(filePathOriginal)
                .resize({ width: 1080 }) // Ändere die Größe des Bildes auf eine Breite von 800px
                .toFormat('webp', { quality: 80 }) // Komprimiere das Bild mit 80% Qualität
                .toFile(compressedImagePath1080);
        } catch (err) {
            console.log("Error, couldn't compress the picture: " + err)
        }
        const activityObjectId = new ObjectId(activityID);
        const result = await database.getDB().collection('activities').updateOne(  //-> Datenbank- Update mit neuem Pfad
            { _id: activityObjectId },
            { $set: { beforeImage: imagePath } }
        )
        const resultCompressed200 = await database.getDB().collection('personalInformation').updateOne(
            {_id: activityObjectId},
            { $set: { beforeImageCom200: compressedImagePath200 } }
        )
        const resultCompressed1080 = await database.getDB().collection('personalInformation').updateOne(
            {_id: activityObjectId},
            { $set: { beforeImageCom1080: compressedImagePath1080 } }
        )   
        console.log("Result der Datenbank: " + result)
        if (result.modifiedCount === 1 && resultCompressed200.modifiedCount === 1 && resultCompressed1080.modifiedCount ===1) {
            console.log(`Profilbild für Benutzer ${activityID} erfolgreich gespeichert.`);
            return "Success";
        } else {
            console.log(`Profilbild für Benutzer ${activityID} nicht gefunden.`);
            return "User not found";
        }

    } catch (err) {
        throw new Error("Fehler in der Datenbank"+ err)
    }
}

async function uploadAfterPicture(activityID, fileExtension, filePathOriginal) {
    try {
        const imagePath = `/home/sipster/sipster/backend/static/afterPicture/PictureAfter${activityID}${fileExtension}`
        const compressedImagePath200 = `/home/sipster/sipster/backend/static/afterPicture/compressed200/PictureAfter${activityID}${fileExtension}`
        const compressedImagePath1080 = `/home/sipster/sipster/backend/static/afterPicture/compressed1080/PictureAfter${activityID}${fileExtension}`
        try {
            await sharp(filePathOriginal)
                .resize({ width: 200 }) // Ändere die Größe des Bildes auf eine Breite von 800px
                .toFormat('webp', { quality: 80 }) // Komprimiere das Bild mit 80% Qualität
                .toFile(compressedImagePath200);
            await sharp(filePathOriginal)
                .resize({ width: 1080 }) // Ändere die Größe des Bildes auf eine Breite von 800px
                .toFormat('webp', { quality: 80 }) // Komprimiere das Bild mit 80% Qualität
                .toFile(compressedImagePath1080);
        } catch (err) {
            console.log("Error, couldn't compress the picture: " + err)
        }
        const activityObjectId = new ObjectId(activityID);
        const result = await database.getDB().collection('activities').updateOne(  //-> Datenbank- Update mit neuem Pfad
            { _id: activityObjectId },
            { $set: { afterImage: imagePath } }
        )
        const resultCompressed200 = await database.getDB().collection('personalInformation').updateOne(
            {_id: activityObjectId},
            { $set: { afterImageCom200: compressedImagePath200 } }
        )
        const resultCompressed1080 = await database.getDB().collection('personalInformation').updateOne(
            {_id: activityObjectId},
            { $set: { afterImageCom1080: compressedImagePath1080 } }
        )  
        console.log("Result der Datenbank: "+result)

        if (result.modifiedCount === 1 && resultCompressed200.modifiedCount === 1 && resultCompressed1080.modifiedCount ===1) {
            console.log(`Profilbild für Benutzer ${activityID} erfolgreich gespeichert.`);
            return "Success";
        } else {
            console.log(`Profilbild für Benutzer ${activityID} nicht gefunden.`);
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
    postActivity, getActivities, getActivitiesFromUser, deleteEvents, uploadBeforePicture, uploadAfterPicture, addReaction
}