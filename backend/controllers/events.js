const database = require('../database')

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
        const events = await database.postEvents(req)
        res.json()
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getEvents,
    postEvents
}