const database = require("./databaseMain")
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');
/**
 * In this Method you get the fully assembled Homepage
 *  and can load that directly in the hompage by differentiate between the types of
 * the given Object the types are homepage.type = ["game" || "activity" || "event"] 
 * @param req includes the userID is given as a param in the Get request from frontend 
 * @returns an array of Objects which contains all the loaded activities events and games
 */
async function getHomepage(req) {
    const userID = req.body.userID
    const alreadySeenIDs = req.body.usedIDs
    const userIDObj = new ObjectId(userID)
    const limit = 3; //The Limit of how many results should be returned per thing

    try {
        const startTime = new Date().getTime();
        const {games, events} = await database.initializeCollections()
        //find activities from users friends und filter nach Timestamp
        const friendsActivities = await getTheFriendActivities(req, alreadySeenIDs, limit)
        log.info("Friends Activities loaded")

        //search for new games
        const newGames = await getTheGames(games, alreadySeenIDs, limit)
        log.info("New Games loaded")

        //search for new Events
        const comingEvents = await getTheEvents(events, alreadySeenIDs, limit)
        log.info("Coming Events loaded")
        
        let combinedArray = [...friendsActivities, ...comingEvents, ...newGames]
        combinedArray = shuffleArray(combinedArray)
        const endTime = new Date().getTime()
        log.info(`Homapage assembled in ${endTime - startTime}ms ${combinedArray.length} items returned`)
        return combinedArray

    }catch (err) {
        log.error(err)
        throw new Error("Something went wrong! " + err)
    }
}

function sortAlreadySeenIDs(alreadySeenIDs, type) {
    if (alreadySeenIDs === null){
        return [];
    }
    const usedIDs = new Array();
    for (const alreadySeenID of alreadySeenIDs) {
        if (alreadySeenID.type == type){
            usedIDs.push(new ObjectId(alreadySeenID.id))
        }
    }
    return usedIDs
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function getTheFriendActivities(req, alreadySeenIDs, limit){
    const alreadySeenIDsObj = sortAlreadySeenIDs(alreadySeenIDs, "activity")
    let reqModified = req
    reqModified.alreadySeenIDsObj = alreadySeenIDsObj
    reqModified.limit = limit
    let friendsActivities = await database.getActivities(reqModified, true); //bedingter call = true
    friendsActivities.sort((a, b) => b.timestamp - a.timestamp);
    friendsActivities.forEach(activity => activity.type = "activity")
    return friendsActivities
}

async function getTheGames(games, alreadySeenIDs, limit) {
    const alreadySeenIDsObj = sortAlreadySeenIDs(alreadySeenIDs, "game")
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(new Date().getMonth()-6)
    const newGames = await games.find({
        timestamp: { $gte: sixMonthsAgo}, 
        _id: { $nin: alreadySeenIDsObj }
        }).limit(limit).toArray();
    
    if (newGames.Count == 0) {
        log.info("No new games found")
        return
    }else {
        newGames.sort((a, b) => b.timestamp - a.timestamp);
        newGames.forEach(game => game.type = "game")
        return newGames
    }
}

async function getTheEvents(events, alreadySeenIDs, limit) {
    const alreadySeenIDsObj = sortAlreadySeenIDs(alreadySeenIDs, "event")
    const inSixMonths = new Date()
        inSixMonths.setMonth(new Date().getMonth()+6)
        const comingEvents = await events.find({
            Date: { $lte: inSixMonths },
            _id: { $nin: alreadySeenIDsObj }
            }).limit(limit).toArray();
        
        comingEvents.sort((a, b) => a.date - b.date);
        comingEvents.forEach(event => event.type = "event");
        return comingEvents
}

module.exports = {
    getHomepage
}