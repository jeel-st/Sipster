const database = require('../databases/databaseMain')


async function getUserData(req, res) {
    try {
        const userDataFinder = await database.getUserData(req)
        res.send(true)
    }catch (err){
        console.error(err)
        res.status(404).send("User not found");
    }
}

async function postNewUsername(req, res) {
    try{
        const postNewUsername = await database.postNewUsername(req)
        res.send("Username was succesfully posted!")
    }catch(err){
        console.log(err)
        res.status(404).send("Something went wrong")
    }
}

module.exports = {
    getUserData,
    postNewUsername
}