//Imports
const database = require("../databases/databaseMain")
const log = require("../logging/logger")

/**
 * Diese Methode dient dazu, eine Freundesanfrage zu senden.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param postFriendRequest: Function -> Funktion zum Senden einer Freundesanfrage an die Datenbank
 * @return: String -> Eine Bestätigungsmeldung "Friend request was send successfully!" 
 * @throws Error -> Wenn ein interner Serverfehler auftritt
 */

async function postFriendRequest(req, res){
    try{
        const friendRequestPost = await database.postFriendRequest(req)
        if (friendRequestPost == "Request rerouted!"){
            res.status(204).send("The user you trying to invite has already invited you. So the users invite was accepted and the invitation was deleted")
        }else {
            res.send("Friend request was send successfully!")
        }
    }catch(err){
        log.error("Database request failed! " + err)
        res.status(500).send("Something went wrong")
    }
}

/**
 * Diese Methode dient dazu, eine Freundesanfrage zu löschen, zu akzeptieren oder abzulehnen.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param acceptFriendRequest: Function -> Funktion zum Akzeptieren einer Freundesanfrage in der Datenbank
 * @param declineFriendRequest: Function -> Funktion zum Ablehnen einer Freundesanfrage in der Datenbank
 * @param removeFriend: Function -> Funktion zum Entfernen eines Freundes aus der Liste in der Datenbank
 * @return: JSON -> Eine Bestätigungsmeldung oder eine entsprechende Fehlermeldung
 * @throws Error -> Wenn ein interner Serverfehler auftritt oder die Anfrage nicht korrekt ist
 */

async function deleteFriendRequest(req, res){
    try{
        if(req.query.status == null && (req.query.remove == null || req.query.remove !== "true")){
            res.status(404).send("Status and remove are null or wrong")
            return;
        }

        if(req.query.status == "true"){
            const fromUserID = req.params.fromUserID
            const toUserID = req.params.toUserID

            const friendRequestDel = await database.acceptFriendRequest(fromUserID, toUserID)
            res.send("User was accepted!")

        }else if(req.query.status == "false"){
            const friendRequestDel = await database.declineFriendRequest(fromUserID, toUserID)
            res.send("User was declined")

        }

        if(req.query.remove == "true"){
            const friendRequestDel = await database.removeFriend(req)
            if (friendRequestDel == false) {
                res.status(400).send("Sipster can't be removed as a friend")
            }else {
                res.send("Friend was removed")
            }
        }

    }catch(err){
        console.error(err)
        res.status(500).send("Something went wrong " + err)
    }
}

/**
 * Diese Methode dient dazu, die Liste der Freunde nach Benutzernamen abzurufen.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param getFriendNameList: Function -> Funktion zum Abrufen der Liste der Freunde aus der Datenbank
 * @return: Array -> Die Liste der Freundesnamen
 * @throws Error -> Wenn ein interner Serverfehler auftritt oder die Liste leer ist
 */
/*
async function getFriendNameList(req, res) {
    try {
        const friendList = await database.getFriendNameList(req)

        if (friendList.length == 0) {
            res.status(204).send("You have no friends yet...")
        } else {
            res.send(friendList)
        }
    } catch (err) {
        res.status(404).send("Something went wrong " + err)
    }
}
*/

/**
 * Diese Methode dient dazu, die Liste der Freunde abzurufen.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param getFriendList: Function -> Funktion zum Abrufen der Liste der Freunde aus der Datenbank
 * @return: Array mit Users -> Ein Array der Daten der Freunde oder eine entsprechende Statusmeldung
 * @throws Error -> Wenn ein interner Serverfehler auftritt oder die Liste leer ist
 */

async function getFriendList(req, res) {
    try {
        const friendList = await database.getFriendList(req)

        if (friendList.length == 0) {
            res.status(204).send("You have no Friends yet...")
        } else {
            res.send(friendList)
        }
    } catch (err) {
        res.status(404).send("Something went wrong " + err)
    }
}

/**
 * Diese Methode dient dazu, Freundesempfehlungen abzurufen.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param getFriendRecommendations: Function -> Funktion zum Abrufen von Freundesempfehlungen aus der Datenbank
 * @return: User- Array -> Die Freundesempfehlungen oder eine entsprechende Statusmeldung
 * @throws Error -> Wenn ein interner Serverfehler auftritt oder keine Empfehlungen gefunden werden
 */

async function getFriendRecommendations(req, res) {
    log.info("Getting Friend Reccommendations")
    try {
        if (req.params.input.length < 1){
            res.status(204).send("There is not enough input to follow the request")
        }
        const friendReccommendations = await database.getFriendRecommendations(req)
        if (friendReccommendations == 0) {
            res.status(204).send("There are no friend Reccommendations with that input...")
        }else {
            res.send(friendReccommendations)
        }
    }catch (err) {
        console.log("Something went wrong in this file")
        res.status(404).send("Something went wrong " + err) 
    }
}

/**
 * Diese Methode dient dazu, Einladungen für einen bestimmten Benutzer abzurufen.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param getInvitations: Function -> Funktion zum Abrufen von Einladungen aus der Datenbank
 * @return: Array mit zwei Arrays -> [receivedFromUsers, sentToUsers] 
 *          receivedFromUsers: Benutzer, die Einladungen gesendet haben
 *          sentToUsers: Benutzer, die Einladungen erhalten haben
 * @throws Error -> Wenn ein interner Serverfehler auftritt oder keine Einladungen gefunden werden
 */

async function getInvitations(req, res) {
    try {
        log.info("Getting invitations...")
        const invitations = await database.getInvitations(req)
        if (invitations == null) {
            res.status(204).send("There are no invitations for that username...")
        }else {
            res.send(invitations);
        }
    }catch (err) {
        res.status(404).send("Something went wrong " + err) 
    }
}

module.exports = {
    postFriendRequest,
    deleteFriendRequest,
    //getFriendNameList,
    getFriendList,
    getFriendRecommendations,
    getInvitations
}