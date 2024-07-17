const database = require('../databases/databaseMain')
const log = require("../logging/logger")
const logicFile = require("../utils/activitiesLogic/activitiesLogic")

/**
 * This methods manages the incoming request and forwards it to the database methods
 * here it forwards to database.postActivity(req) which posts a new Activity in the database
 * 
 * @param req: Object --> The request
 * @param res: Object --> The answer
 */
async function postActivity(req, res) {
    try {
        console.log("Went to database postActitity")
        const activityId = await database.postActivity(req)

        console.log(activityId)
        
        if (activityId){
            res.json({ _id: activityId });
        }else {
            res.status(500).json("Internal Server Error!")
        }
        
        //res.json(activity)

    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
}

/**
 * This methods manages the incoming request and forwards it to the database methods
 * here it forwards to database.getActivities(req, false) which 
 * gets all activities from the friends of the given user
 * 
 * @param req: Object --> The request
 * @param res: Object --> The answer
 */
async function getActivities(req, res) {
    try {
        const activities = await database.getActivities(req, false) //bedingter call = false : siehe databaseHomepage.getHomepage()

        if (activities == 'The User does not exist in the database!'){
            res.status(400).json("The User does not exist in the database!")
        }else if (activities != null){
            res.send(activities)
        }else {
            res.status(500).json("Something went wrong here!")
        }
        
        //res.json(activity)

    } catch (error) {
        console.error(error)
        res.status(500).json('Internal Server Error')
    }
}

/**
 * This methods manages the incoming request and forwards it to the database methods
 * here it forwards to database.getActivitiesFromUser(req) which 
 * gets all activities from the given user
 * 
 * @param req: Object --> The request
 * @param res: Object --> The answer
 */
async function getActivitiesFromUser(req, res) {
    try {
        const activities = await database.getActivitiesFromUser(req)

        if (activities == 'no activity was found by that user!'){
            res.status(400).json("no activity was found by that user!")
        }else if (activities != null){
            res.send(activities)
        }else {
            res.status(500).json("Something went wrong here!")
        }
        
        //res.json(activity)

    } catch (error) {
        console.error(error)
        res.status(500).json('Internal Server Error')
    }
}

/**
 * This methods manages the incoming request and forwards it to the logic method
 * here it forwards to database.uploadBeforePicture(req, res) which 
 * does all the necessary logic to post the Before Picture of an activity
 * 
 * @param req: Object --> The request
 * @param res: Object --> The answer
 */
async function postBeforePicture(req, res){
    try{
        const result = await logicFile.uploadBeforePicture(req, res)
    }catch(error){
        console.error('Fehler beim Hochladen des Bildes:', error);
    }
}

/**
 * This methods manages the incoming request and forwards it to the logic method
 * here it forwards to database.uploadAfterPicture(req, res) which 
 * does all the necessary logic to post the after Picture of an activity
 * 
 * @param req: Object --> The request
 * @param res: Object --> The answer
 */
async function postAfterPicture(req, res){
    try{
        const result = await logicFile.uploadAfterPicture(req, res)
    }catch(error){
        console.error('Fehler beim Hochladen des Bildes:', error);

    }
}

/**
 * This methods manages the incoming request and forwards it to the database methods
 * here it forwards to database.getActivities(req, false) which 
 * gets all activities from the friends of the given user
 * 
 * @param req: Object --> The request
 * @param res: Object --> The answer
 */
async function addReaction(req, res) {
    try{
        const result = await database.addReaction(req)

        if (result == "Reaction added succesfully") {
            res.json("Reaction added successfully")
        }else if (result == "Couldn't delete old Reaction please try again!") {
            res.status(400).json("Couldn't delete old Reaction please try again!")
        }else if (result == "The reaction couldn't be added.") {
            res.status(400).json("The reaction couldn't be added.")
        }
    }catch (err) {
        res.status(500).json('Something went wrong!: ' + err);
    }
}

/**
 * This methods manages the incoming request and forwards it to the database methods
 * here it forwards to database.deleteReaction(req) which 
 * deletes all reactions from the given activity
 * 
 * @param req: Object --> The request
 * @param res: Object --> The answer
 */
async function deleteReaction(req, res) {
    try {
        const result = await database.deleteReaction(req);

        if (result == "reaction deleted!"){
            res.json("reaction deleted!")
        }else {
            res.status(400).json("Bad request!")
        }
    }catch (err) {
        res.status(500).json("Something went wrong here: " + err)
    }
}


module.exports = {
    postActivity,
    getActivities,
    postBeforePicture,
    postAfterPicture,
    addReaction,
    getActivitiesFromUser,
    deleteReaction
}