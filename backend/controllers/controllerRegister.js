const database = require('../databases//databaseMain')

async function postRegister(req, res) {
    
    const pushingUser = await database.postUser(req)
    if(pushingUser == "Success!"){
        res.json(pushingUser)
    }else{
        res.status(404).json(pushingUser)
    }
}

async function deleteRegister(req, res) {

         const deleteUser = await database.deleteUser(req)

        if(deleteUser == "Benutzer erfolgreich gelöscht"){
            res.json(deleteUser)
        }else{
            res.status(404).json(deleteUser)
        }
}

module.exports = {
    postRegister, deleteRegister
}