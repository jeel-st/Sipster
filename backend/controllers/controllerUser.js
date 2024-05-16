const database = require('../databases/databaseMain')
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');

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
        log.info("in controller")
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

async function changeFirstName(req, res) {
    try {
        const userID = req.body.userID
        const newName = req.body.newName

        if (!userID || !newName) {
            res.status(400).send("UserID and new first Name are required.")
        } else {
            const objectId = new ObjectId(userID);
            const result = await database.changeFirstName(objectId, newName)
            if (result == true) {
                res.send("First Name changed successfully!")
            } else {
                res.status(404).send("User not found")
            }
        }
    } catch (error) {
        log.error(error)
        res.status(500).send("Something went wrong.")
    }
}

async function changeLastName(req, res) {
    try {
        const userID = req.body.userID
        const newName = req.body.newName


        if (!userID || !newName) {
            res.status(400).send("UserID and new last Name are required.")
        } else {
            const objectId = new ObjectId(userID);
            const result = await database.changeLastName(objectId, newName)
            if (result == true) {
                res.send("Last Name changed successfully!")
            } else {
                res.status(404).send("User not found")
            }
        }
    } catch (error) {
        log.error(error)
        res.status(500).send("Something went wrong.")
    }
}
module.exports = {
    getUserData,
    postNewUsername,
    postNewPassword,
    postNewEmail,
    addEvent,
    getEvents,
    changeFirstName,
    changeLastName
}