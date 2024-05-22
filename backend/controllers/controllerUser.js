const database = require('../databases/databaseMain')
const log = require("../logging/logger")


async function getUserData(req, res) {
    try {
        const userData = await database.getUserData(req)
        res.send(userData)
    }catch (err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
        }
    }
}

async function getEvents(req, res) {
    try {
        log.info("in Controller")
        const eventData = await database.getEventsData(req)
        res.send(eventData)
    }catch (err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
        }
    }

}

async function postNewUsername(req, res) {
    try{
        const postNewUsername = await database.postNewUsername(req)
        res.send("Username was succesfully posted!")
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
        }
    }
}
async function postNewPassword(req, res) {
    try{
        const isValidPassword = await database.postNewPassword(req)
        if(!isValidPassword) {
            res.status(1001).json("The given password is invalid!")
        }else {
            res.send("Password was succesfully posted!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
        }
    }
}
async function postNewEmail(req, res) {
    try{
        const isValidEmail = await database.postNewEmail(req)
        if (!isValidEmail){
            res.status(1001).json("The given email is invalid!")
        }else {
            res.send("Email was succesfully posted!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
        }
    }
}

async function addEvent(req, res) {
    try {
        const addingData = await database.addEvent(req)
        if (addingData){
            res.send("Added Event succesfully to User!")
        }else {
            res.status(404).send("Something went wrong!")
        }
    }catch(err){
        if (err instanceof database.UsernameNotFoundError) {
            res.status(400).send(err.message)
        }else {
            res.status(404).send("Something went horribly wrong!")
        }
    }
}

module.exports = {
    getUserData,
    postNewUsername,
    postNewPassword,
    postNewEmail,
    addEvent,
    getEvents
}