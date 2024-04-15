const database = require('../databases/databaseMain')

async function postRegister(req, res) {
    
    const pushingUser = await database.postUser(req)
    if(pushingUser == "Success!"){
        res.json(pushingUser)
    }else if(pushingUser == "Duplicate username" || pushingUser == "Duplicate Email" || pushingUser == "Email format false" || pushingUser == "Password format false"){
        res.status(400).json(pushingUser)
    }else{
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