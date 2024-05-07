const database = require('../databases/databaseMain')
const log = require("../logging/logger")


async function getUserData(req, res) {
    try {
        const userData = await database.getUserData(req)
        res.send(userData)
    }catch (err){
        console.error(err)
        res.status(404).send("User not found");
    }
}

async function postNewUsername(req, res) {
    try{
        log.info("In Controller User!")
        const postNewUsername = await database.postNewUsername(req)
        res.send("Username was succesfully posted!")
    }catch(err){
        console.log(err)
        res.status(404).send("Something went wrong")
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
        console.log(err)
        res.status(404).send("Something went wrong")
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
        console.log(err)
        res.status(404).send("Something went wrong")
    }
}

module.exports = {
    getUserData,
    postNewUsername,
    postNewPassword,
    postNewEmail
}