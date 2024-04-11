const database = require('../databases/databaseMain')

async function getEvents(req, res) {
    try {
        const events = await database.getEvents()
        res.json(events)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

async function postEvents(req, res) {
    try {
        const event = await database.postEvents(req)
        res.json(event)
    } catch (error) {
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
    getEvents,
    postEvents,
    deleteEvents
}