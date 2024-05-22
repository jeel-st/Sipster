const database = require('../databases/databaseMain')
const log = require("../logging/logger")

async function postActivity(req, res) {
    try {
        const activity = await database.postActivity(req)

        console.log(activity)
        
        if (activity){
            res.json("Activity was added to database")
        }else {
            res.status(404).send("Something went wrong here!")
        }
        
        //res.json(activity)

    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

async function getActivities(req, res) {
    try {
        const activities = await database.getActivities(req)

        console.log(activities)
        
        if (activities != null){
            res.send(activities)
        }else {
            res.status(404).send("Something went wrong here!")
        }
        
        //res.json(activity)

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

async function deleteEvents(req, res){
    try{
        const event = await database.deleteEvents(req)
        res.json(event)
    }catch{
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    postActivity,
    getActivities,
    deleteEvents
}