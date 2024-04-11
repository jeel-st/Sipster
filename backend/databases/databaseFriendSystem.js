const database = require("./databaseMain")

async function postFriendRequest(req){
    const {fromSipsterID, toSipsterID} = req.body
    const timestamp = Date.now(); 
    const sendAt = new Date(timestamp).toISOString();


    const userData = {fromSipsterID, toSipsterID, sendAt}

    try{
        await database.getDB().collection("invitations").insertOne(userData)
    }catch(err){
        console.log(err)
        throw new Error("Database disconnected")
    }
}

async function deleteFriendRequest(req){
    const fromSipsterID = req.params.fromSipsterID
    const toSipsterID = req.params.toSipsterID

    let result = await database.getDB().collection("invitations").deleteOne({fromSipsterID: fromSipsterID, toSipsterID: toSipsterID})
    if (result.deletedCount === 0) {
        throw new Error("Anfrage nicht gefunden")
    } else {
        return("Anfrage erfolgreich gelöscht")
    }
}

module.exports = {
    postFriendRequest,
    deleteFriendRequest
}
