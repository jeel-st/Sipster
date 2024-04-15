const database = require('../databases/databaseMain')

async function postRegister(req, res) {
    
    const pushingUser = await database.postUser(req)
    if(pushingUser == "Success!"){
        res.json(pushingUser)
    }else if(pushingUser == "Duplicate username") {
        res.status(400).json(pushingUser)
    }else if (pushingUser == "Duplicate Email"){
        res.status(401).json(pushingUser)
    }else if (pushingUser == "Email format false"){
        res.status(402).json(pushingUser)
    }else if (pushingUser == "Password format false"){
        res.status(403).json(pushingUser)
    }else {
        res.status(404).json(pushingUser)
    }
}

async function deleteRegister(req, res) {

         const deleteUser = await database.deleteUser(req)
        console.log(deleteUser)
        if(deleteUser == "Benutzer erfolgreich gelöscht"){
            res.json(deleteUser)
        }else{
            res.status(404).json(deleteUser)
        }
}

module.exports = {
    postRegister, deleteRegister
}