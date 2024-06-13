const database = require("./databaseMain")
const log = require("../logging/logger")
const { ObjectId, Timestamp } = require('mongodb');
const sharp = require('sharp')


async function postActivity(req) {
    const {caption, userID, gameID} = req.body

    const userIDObj = new ObjectId(userID)
    const gameIDObj = new ObjectId(gameID)


    const reactions = database.reactionsTemplate
    const beforeImage = null;
    const afterImage = null;
    const beforeImageCom80 = null
    const beforeImageCom1080 = null
    const afterImageCom80 = null
    const afterImageCom1080 = null
    const timestamp = new Date();

    const activityData = {beforeImage, beforeImageCom80, beforeImageCom1080, afterImage, afterImageCom80, afterImageCom1080, reactions, caption, 'userID': userIDObj, 'gameID': gameIDObj, timestamp}
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
        return 'The User does not exist in the database!';
    }else {
        friends = user.friends
    }
    const activitiesData = await activities.find({ userID: { $in: friends } })
    .project({_id: 1, beforeImage: 1, afterImage: 1, reactions: 1, caption: 1, userID: 1, gameID: 1, timestamp: 1})
    .toArray()

    const games = (await database.initializeCollections()).games
    for (const activity of activitiesData) {

        try {
            const user = await personalInformation.find({_id: activity.userID})
                .project({_id: 1, username: 1, profilePicture: 1, email: 1, firstName: 1, lastName: 1, friends: 1, sips: 1, events: 1})
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
    const activitiesFromUser = await activities.find(
        {userID: userIDObj}
    ).toArray()


    if (activitiesFromUser.length === undefined){

        return ("no activity was found by that user!")
    }else {
        return activitiesFromUser
    }


    }catch (err){
        return ("Something went wrong" + err)
    } 

}

async function uploadBeforePicture(activityID, fileExtension, filePathOriginal) {
    try {
        const imagePath = `/home/sipster/sipster/backend/static/beforePicture/PictureBefore${activityID}${fileExtension}`
        const compressedImagePath80 = `/home/sipster/sipster/backend/static/beforePicture/compressed80/PictureBefore${activityID}${fileExtension}`
        const compressedImagePath1080 = `/home/sipster/sipster/backend/static/beforePicture/compressed1080/PictureBefore${activityID}${fileExtension}`
        try {
            await sharp(filePathOriginal)
                .resize({ width: 80 }) // Ändere die Größe des Bildes auf eine Breite von 800px
                .toFormat('webp', { quality: 80 }) // Komprimiere das Bild mit 80% Qualität
                .toFile(compressedImagePath80);
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
        const resultCompressed80 = await database.getDB().collection('activities').updateOne(
            {_id: activityObjectId},
            { $set: { beforeImageCom80: compressedImagePath80 } }
        )
        const resultCompressed1080 = await database.getDB().collection('activities').updateOne(
            {_id: activityObjectId},
            { $set: { beforeImageCom1080: compressedImagePath1080 } }
        )   
        console.log("Result der Datenbank: " + result)
        if (result.modifiedCount === 1 && resultCompressed80.modifiedCount === 1 && resultCompressed1080.modifiedCount ===1) {
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
        const compressedImagePath80 = `/home/sipster/sipster/backend/static/afterPicture/compressed80/PictureAfter${activityID}${fileExtension}`
        const compressedImagePath1080 = `/home/sipster/sipster/backend/static/afterPicture/compressed1080/PictureAfter${activityID}${fileExtension}`
        try {
            await sharp(filePathOriginal)
                .resize({ width: 80 }) // Ändere die Größe des Bildes auf eine Breite von 800px
                .toFormat('webp', { quality: 80 }) // Komprimiere das Bild mit 80% Qualität
                .toFile(compressedImagePath80);
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
        const resultCompressed80 = await database.getDB().collection('activities').updateOne(
            {_id: activityObjectId},
            { $set: { afterImageCom80: compressedImagePath80 } }
        )
        const resultCompressed1080 = await database.getDB().collection('activities').updateOne(
            {_id: activityObjectId},
            { $set: { afterImageCom1080: compressedImagePath1080 } }
        )  
        console.log("Result der Datenbank: "+result)

        if (result.modifiedCount === 1 && resultCompressed80.modifiedCount === 1 && resultCompressed1080.modifiedCount ===1) {
            console.log(`Bild für Benutzer ${activityID} erfolgreich gespeichert.`);
            return "Success";
        } else {
            console.log(`Bild für Benutzer ${activityID} nicht gefunden.`);
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

        const reactionsTemplate = database.reactionsTemplate
        const queryConditions = reactionsTemplate.map(reaction => {
            return { [`reactions.${reaction}`]: userIDObj };
        });

        const alreadyReacted = await activities.findOne( {$AND:{ _id: activityIDObj, $OR:queryConditions }} )
        if (alreadyReacted) {
            const deleteResult = await activities.updateOne( {_id: activityIDObj }, {$pull: queryConditions})
            if (deleteResult == null) {
                return "Couldn't delete old Reaction please try again!"
            }
        }

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

async function deleteReaction(req) {
    try {
        const userID = req.params.userID
        const activityID = req.params.activityID
        const reactionType = req.params.reactionType
        const userIDObj = new ObjectId(userID)
        const activityIDObj = new ObjectId(activityID)

        const activities = (await database.initializeCollections()).activities
        const result = await activities.updateOne( {_id: activityIDObj }, {$pull: {[`reactions.${reactionType}`]: userIDObj}} )
        console.log(result)
        if (result.modifiedCount == 0){
            return "reaction couldn't be deleted!"
        }else {
            return "reaction deleted!"
        }

    }catch (err) {
        return err
    }
}

module.exports = {
    postActivity, getActivities, getActivitiesFromUser, uploadBeforePicture, uploadAfterPicture, addReaction, deleteReaction
}