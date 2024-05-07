
const database = require("./databaseMain");

async function getSips(username){
    
    let result = await database.getDB().collection("personalInformation").findOne({ username: username})
    if (!result) {
        throw new Error("No sips found for the specified username")
    }
    return result.sips
}

async function changeSips(username, sipsNew){
    
    
    const coll = database.getDB().collection("personalInformation")
    let sipsOld = await getSips(username)
    if(sipsOld == null){
        throw new Error("No sips found for this user")
    }
    
    let sips = sipsOld + sipsNew
   
    let updateSips = await coll.updateOne({"username": username}, {$set: {"sips": sips}})

    return updateSips
}
module.exports = {
    getSips,
    changeSips
}