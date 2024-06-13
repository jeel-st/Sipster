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
    const userID = req.params.userID
    const userIDObj = new ObjectId(userID)

    try {
        const startTime = new Date().getTime();
        const activities = (await database.initializeCollections()).activities
        const personalInformation = (await database.initializeCollections()).personalInformation
        //find activities from users friends und filter nach Timestamp
        let friendsActivities = await database.getActivities(req);
        friendsActivities.sort((a, b) => b.timestamp - a.timestamp);
        friendsActivities.forEach(activity => activity.type = "activity")
        log.info("Friends Activities loaded")

        //search for new games
        const newGames = await getTheGames()
        log.info("New Games loaded")

        //search for new Events
        const comingEvents = await getTheEvents()
        log.info("Coming Events loaded")
        
        let combinedArray = [...friendsActivities, ...newGames, ...comingEvents]
        combinedArray = shuffleArray(combinedArray)
        const endTime = new Date().getTime()
        log.info(`Homapage assembled in ${endTime - startTime}ms`)
        return combinedArray

    }catch (err) {
        log.error(err)
        return ("Something went wrong " + err)
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function getTheGames() {
    const games = (await database.initializeCollections()).games

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(new Date().getMonth()-6)
    const newGames = await games.find({ timestamp: { $gte: sixMonthsAgo } }).toArray();
    if (newGames.Count == 0) {
        log.info("No new games found")
        return
    }else {
        newGames.sort((a, b) => b.timestamp - a.timestamp);
        newGames.forEach(game => game.type = "game")
        return newGames
    }
}

async function getTheEvents() {
    const events = (await database.initializeCollections()).events
    
    const inSixMonths = new Date()
        inSixMonths.setMonth(new Date().getMonth()+6)
        const comingEvents = await events.find({ Date: { $lte: inSixMonths } }).toArray();
        comingEvents.sort((a, b) => a.date - b.date);
        comingEvents.forEach(event => event.type = "event");
        return comingEvents
}

module.exports = {
    getHomepage
}