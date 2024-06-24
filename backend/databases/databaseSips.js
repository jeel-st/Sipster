//Imports
const database = require("./databaseMain");
const { ObjectId, MongoClient } = require("mongodb")
const log = require("../logging/logger")

/**
 * Diese Methode dient dazu, die Anzahl der Sips für einen bestimmten Benutzer abzurufen.
 * 
 * @param username: String -> Der Benutzername des Benutzers, dessen Sips abgerufen werden sollen
 * @return: Number -> Die Anzahl der Sips des Benutzers
 * @throws Error -> Wenn der Benutzer nicht gefunden wird oder keine Sips vorhanden sind
 */

async function getSips(userID){
    const userIDObj = new ObjectId(userID)
    log.info("userID: "+ userID)
    let result = await database.getDB().collection("personalInformation").findOne({ _id: userIDObj})
    if (!result) {
        throw new Error("No sips found for the specified username")
    }
    console.log("Sips, die in der Datenbank waren:"+ result.sips)
    return result.sips
}

/**
 * Diese Methode dient dazu, die Anzahl der Sips für einen bestimmten Benutzer zu ändern.
 * 
 * @param username: String -> Der Benutzername des Benutzers, dessen Sips geändert werden sollen
 * @param sipsNew: Number -> Die Anzahl der neuen Sips, die zum aktuellen Sips-Wert hinzugefügt werden sollen
 * @return: Object -> Das Ergebnis des Update-Vorgangs
 * @throws Error -> Wenn der Benutzer keine Sips hat oder nicht gefunden wird
 */

async function changeSips(userID, sipsNew){
    log.info("Went into database, with userID: "+ userID)
    const userIDObj = new ObjectId(userID)

    const coll = database.getDB().collection("personalInformation")
    let sipsOld = await getSips(userID)
    if(sipsOld == null){
        throw new Error("No sips found for this user")
    }
    
    let sips = sipsOld + sipsNew
    log.info("new Sips: "+ sips)
    let updateSips = await coll.updateOne({"_id": userIDObj}, {$set: {"sips": sips}})
    
    return updateSips
}
module.exports = {
    getSips,
    changeSips
}