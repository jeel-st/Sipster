//Imports
const database = require("./databaseMain");


/**
 * Diese Methode dient dazu, die Anzahl der Sips für einen bestimmten Benutzer abzurufen.
 * 
 * @param username: String -> Der Benutzername des Benutzers, dessen Sips abgerufen werden sollen
 * @return: Number -> Die Anzahl der Sips des Benutzers
 * @throws Error -> Wenn der Benutzer nicht gefunden wird oder keine Sips vorhanden sind
 */

async function getSips(username){
    
    let result = await database.getDB().collection("personalInformation").findOne({ username: username})
    if (!result) {
        throw new Error("No sips found for the specified username")
    }
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