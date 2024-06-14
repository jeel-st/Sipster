const database = require('../databases/databaseMain')
const log = require("../logging/logger")
const logicFile = require("../utils/activitiesLogic/activitiesLogic")

async function postActivity(req, res) {
    try {
        console.log("Went to database postActitity")
        const activityId = await database.postActivity(req)

        console.log(activityId)
        
        if (activityId){
            res.json({ _id: activityId });
        }else {
            res.status(404).json("Something went wrong here!")
        }
        
        //res.json(activity)

    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
}

async function getActivities(req, res) {
    try {
        const activities = await database.getActivities(req)

        if (activities == 'The User does not exist in the database!'){
            res.status(400).json("The User does not exist in the database!")
        }else if (activities != null){
            res.send(activities)
        }else {
            res.status(404).json("Something went wrong here!")
        }
        
        //res.json(activity)

    } catch (error) {
        console.error(error)
        res.status(500).json('Internal Server Error')
    }
}

async function getActivitiesFromUser(req, res) {
    try {
        const activities = await database.getActivitiesFromUser(req)

        if (activities == 'no activity was found by that user!'){
            res.status(400).json("no activity was found by that user!")
        }else if (activities != null){
            res.send(activities)
        }else {
            res.status(404).json("Something went wrong here!")
        }
        
        //res.json(activity)

    } catch (error) {
        console.error(error)
        res.status(500).json('Internal Server Error')
    }
}

async function deleteEvents(req, res){
    try{
        const event = await database.deleteEvents(req)
        res.json(event)
    }catch{
        res.status(500).json('Internal Server Error')
    }
}

async function postBeforePicture(req, res){
    try{
        const result = await logicFile.uploadBeforePicture(req, res)
    }catch(error){
        console.error('Fehler beim Hochladen des Bildes:', error);
    }
}

async function postAfterPicture(req, res){
    try{
        const result = await logicFile.uploadAfterPicture(req, res)
    }catch(error){
        console.error('Fehler beim Hochladen des Bildes:', error);

    }
}

async function addReaction(req, res) {
    try{
        const result = await database.addReaction(req)

        if (result !== null) {
            res.json("Reaction added successfully")
        }else if (result == "Couldn't delete old Reaction please try again!") {
            res.status(400).json("Couldn't delete old Reaction please try again!")
        }
    }catch (err) {
        res.status(404).json('Something went wrong!: ', error);
    }
}

async function deleteReaction(req, res) {
    try {
        const result = await database.deleteReaction(req);

        if (result == "reaction deleted!"){
            res.json("reaction deleted!")
        }else {
            res.status(400).json("Bad request!")
        }
    }catch (err) {
        res.status(404).json("Something went wrong here: ") + err
    }
}


module.exports = {
    postActivity,
    getActivities,
    deleteEvents,
    postBeforePicture,
    postAfterPicture,
    addReaction,
    getActivitiesFromUser,
    deleteReaction
}