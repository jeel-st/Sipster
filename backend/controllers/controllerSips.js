//Imports
const { on } = require('nodemon')
const database = require('../databases/databaseMain')

/**
 * Diese Methode ruft die Sipswerte für einen bestimmten Benutzer ab.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: Number -> Die Sipswerte des Benutzers 
 * @throws: Error -> falscher username oder Error
 */

async function getSips(req, res){
    try {
        const userID = req.params.userID
        const sips = await database.getSips(userID)
        
        res.json(sips)
    } catch (error) {
        if(error.message === "No sips found for the specified username"){
            res.status(204).send("No sips found, maybe wrong username")
        }else{
            res.status(500).send('Internal Server Error')
        }
        
    }
}

/**
 * Diese Methode aktualisiert die Sipswerte für einen bestimmten Benutzer.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: Object -> Ergebnis des Updatevorgangs
 */

async function changeSips(req, res){
    try {
        const userID = req.params.userID
        const sipsNew = req.body.sips

        const sips = await database.changeSips(userID, sipsNew)
        res.json(sips)
    } catch (error) {
        if(error.message === "No sips found for the specified username"){
            res.status(204).send("No sips found, maybe wrong username"+ error.message)
        }else if(error.message === "No sips found for this user"){
            res.status(204).send("No sips found for this user"+ error.message)
        }else{
            res.status(500).send('Internal Server Error'+ error)
        }
        
    }
}

/**
 * Diese Methode aktualisiert die Sipswerte für eine Liste von Freunden.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @return: Array aus Objects -> Die aktualisierten Sipswerte der Freunde oder eine entsprechende Fehlermeldung mit Statuscode
 */

async function changeSipsForFriends(req, res){
    const userIDArray = req.body.friends
    const sips = req.body.sips
    
    let result = []
    let oneResult
    if (!userIDArray || userIDArray.length === 0) {
        return res.status(204).send("No friends there...");
    }
    try{
        for (let userID of userIDArray) {
            if (userID) {
                oneResult = await database.changeSips(userID, sips);
                result.push(oneResult);
            }
        }
        res.send(result);
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    getSips,
    changeSips,
    changeSipsForFriends
}