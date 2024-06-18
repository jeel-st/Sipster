//Imports
const database = require("./databaseMain")
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');
const { checkForFriendsInRecommendations } = require("../utils/friendSystemLogic/FriendsRecommendationLogic");
const { deleteFriendRequest } = require("../controllers/controllerFriendSystem");
const SipsterID = "663bd3b7969fc6302facf1ee";

/**
 * Hier wird eine Freundesanfrage, mithilfe der SenderID, der EmpfängerID und eines Zeitstempels, erstellt
 * 
 * @param req:  Request- Objekt -> in denen die ID des Senders und Empfängers mitgegeben werden muss
 * @return:     InsertOneResult- Objekt (Bei Erfolg)
 * @throws:     Error (Bei Fehler) -> "Database disconnected + err"
 */
async function postFriendRequest(req){
    const invitations = (await database.initializeCollections()).invitations
    const {fromUserID, toUserID} = req.body
    console.log(fromUserID + " : " + toUserID)
    const fromUserIDObj = new ObjectId(fromUserID)
    const toUserIDObj = new ObjectId(toUserID)
    const timestamp = Date.now(); 
    const sendAt = new Date(timestamp);


    const userData = {"fromUserID": fromUserIDObj, "toUserID": toUserIDObj, "timestamp": sendAt}
    if (await checkIfOtherUserAlreadySentFriendRequest(userData, invitations)) {
        log.info("Request rerouted to acceptFriendRequest!")
        await acceptFriendRequest(toUserID, fromUserID)
        await deleteFriendRequest(toUserID, fromUserID)
        return "Request rerouted!"
    }

    try{
        let result = await invitations.insertOne(userData)
        log.info("Following invitation got stored: ")
        log.info(userData)
        return result
    }catch(err){
        log.error("an error occured: " + err)
        throw new Error("Database disconnected" + err)
    }
}

/**
 * 
 * @param userData from userData we need fromUserID and toUserID to check if an invitation was already sent by the other user
 * @param invitations so that the invitations collection doesn't need to be initialized again
 * @returns true if the other user already sent an friend request and returns false otherwise
 */
async function checkIfOtherUserAlreadySentFriendRequest(userData, invitations) {
    const foundFriendRequest = await invitations.findOne( {$and: [
        { fromUserID: userData.toUserID },
        { toUserID: userData.fromUserID }
      ]} )
    

    if (foundFriendRequest === null) {
        return false;
    }else {
        log.info("The other user of the friend request (fq) already sent an fq: rerouting now ")
        return true;
    }
}

/**
 * Hier wird die Freundesanfrage angenommen. Dazu wird die Freundesanfrage gelöscht und die UserID's werden in der gegenseitigen Freundesliste eingetragen.
 * 
 * @param req:  Request- Objekt -> hier muss die ID des Senders und Empfängers mitgegeben werden (bis jetzt noch usernames)
 * @return:     String (Bei Erfolg) -> "Anfrage erfolgreich gelöscht"
 * @throws:     Error (Bei Fehler) -> "Benutzername nicht gefunden" oder "Anfrage nicht gefunden"
 */

async function acceptFriendRequest(fromUserID, toUserID){
    const { personalInformation, invitations } = await database.initializeCollections();

    const fromUserIDObj = new ObjectId(fromUserID)
    const toUserIDObj = new ObjectId(toUserID)

    const fromUser = await personalInformation.findOne({ _id: fromUserIDObj });
    const toUser = await personalInformation.findOne({ _id: toUserIDObj });
    if (!fromUser || !toUser) {
        log.error("User was not found!")
        throw new Error("Benutzer nicht gefunden")
    }

    const updateFromUser = await personalInformation.updateOne(
        { _id: fromUserIDObj },
        { $addToSet: { friends: toUserIDObj } }
    );
    
    const updateToUser = await personalInformation.updateOne(
        { _id: toUserIDObj },
        { $addToSet: { friends: fromUserIDObj } }
    );

    if (updateFromUser.modifiedCount == 1){
        log.info(`to User: ${fromUser.username} was added to friends ${toUser.username} `)
        if (updateToUser.modifiedCount == 1){
            log.info(`to User: ${toUser.username} was added to friends ${fromUser.username} `)
            log.info("Operation was succesfull")
        }else {
            log.error("update ToUser failed!")
        }
    }else {
        log.error("update fromUser failed!")
    }


    if (toUserID != SipsterID){
        let result = await invitations.deleteOne({fromUserID: fromUserIDObj, toUserID: toUserIDObj})

        if (result.deletedCount === 0) {
            log.error("The deletion was unsuccussfull")
            throw new Error("Anfrage nicht gefunden")
        } else {
            log.info("Invitation was deleted succesfully")
            return("Anfrage erfolgreich gelöscht")
        }
    }
}

/**
 * 
 * Bei dieser Funktion wird die Freundesanfrage abgelehnt, die Freundesanfrage wird also gelöscht.
 * 
 * @param req:  Request- Objekt -> hier muss die ID des Senders und Empfängers mitgegeben werden (bis jetzt noch usernames)
 * @return      String (Bei Erfolg) -> "Anfrage erfolgreich gelöscht"
 * @throws:     Error (Bei Fehler) -> "Benutzer nicht gefunden" oder "Anfrage nicht gefunden"
 */

async function declineFriendRequest(fromUserID, toUserID){
    const { personalInformation, invitations } = await database.initializeCollections();



    const fromUserIDObj = new ObjectId(fromUserID)
    const toUserIDObj = new ObjectId(toUserID)

    const fromUser = await personalInformation.findOne({ _id: fromUserIDObj });
    const toUser = await personalInformation.findOne({ _id: toUserIDObj });
    
    if (!fromUser || !toUser) {
        throw new Error("Benutzer nicht gefunden");
    }

    let result = await invitations.deleteOne({fromUserID: fromUserIDObj, toUserID: toUserIDObj})

    if (result.deletedCount === 0) {
        log.error("invitation couldn't be deleted or doesn't exist")
        throw new Error("Anfrage nicht gefunden")
    } else {
        log.info("Invitation deleted successfully")
        return("Anfrage erfolgreich gelöscht")
    }
}

/**
 * Bei dieser Methode wird ein Freund entfernt, somit werden die ID's beider User aus ihren Freundeslisten gelöscht
 * 
 * @param req:  Request- Objekt -> hier muss die ID des Senders und Empfängers mitgegeben werden (bis jetzt noch usernames)
 * @return      Boolean(Bei Erfolg) -> Wenn alles geklappt hat, wird "true" übergeben
 * @throws:     Error(bei Fehler) -> "An error ocurred while removing friend"
 */

async function removeFriend(req){
    
    const { personalInformation }= await database.initializeCollections()

    try {
        const fromUserID = req.params.fromUserID
        const toUserID = req.params.toUserID

        if (toUserID == SipsterID || fromUserID == SipsterID){
            return false
        }

        const fromUserIDObj = new ObjectId(fromUserID)
        const toUserIDObj = new ObjectId(toUserID)
        
        const deleteToUser =  await personalInformation.updateOne(
            { _id: fromUserIDObj },
            { $pull: { friends: toUserIDObj } }
        )

        const deleteFromUser = await personalInformation.updateOne(
            { _id: toUserIDObj },
            { $pull: { friends: fromUserIDObj } }
        )

        if(deleteToUser.modifiedCount == 1){
            log.info(`The UserID ${toUserID} was pulled from the Friends of the UserID ${fromUserID}`)
            if(deleteFromUser.modifiedCount == 1){
                log.info(`The UserID ${fromUserID} was pulled from the Friends of the UserID ${toUserID}`)
                log.info("Operation was successfull")
            }else {
                log.error("Operation unseccussful because of deleteFromUser")
            }
        }else {
            log.error("Operation unseccussful because of deleteToUser")
        }

        return true
    } catch (error) {
        
        console.error(error);
        throw new Error("An error occurred while removing friend")
    }
}

/**
 * Die Methode hat die Funktion, alle ID's der Freunde eines Users zurück zu geben.
 * 
 * @param req:  Request- Objekt -> hier muss die ID des Users mitgegeben werden (bis jetzt noch usernames)
 * @return      Array aus personalInformations -> hier werden die Daten der Freunde in einem Array zurückgeliefert
 * @throws:     Error (Bei Fehler)-> "Something went wrong while getting friend list"
 */

async function getFriendList(req){
    const { personalInformation } = await database.initializeCollections()
    const userID = req.params.userID;
    const userIDObj = new ObjectId(userID)
    let friendList = new Array();

    try {

        const user = await personalInformation.findOne({ _id: userIDObj });

        if (!user) {
            throw new Error("Benutzer nicht gefunden");
        }

        const friendIDs = user.friends

        if (!friendIDs || friendIDs.length === 0) {
            return friendList; // Wenn die Freundesliste leer ist, geben wir ein leeres Array zurück
        }else {
            
            for (const friendID of friendIDs){
                const friend = await personalInformation.findOne({ _id: friendID });
                if (friend == null) {
                    continue;
                }

                friendList.push(friend)
                
            }

        }
        return friendList

    }catch (error) {
        throw new Error("Something went wrong while getting friend list");
    }

}

/**
 * Diese Methode ist dazu da, Freundesvorschläge angezeigt zu bekommen.
 * 
 * @param req: Request-Objekt -> hier muss ein UserID und ein input übergeben werden (im Moment noch ein username)
 * @param checkForFriendsInRecommendations: Funktion, welche in utils/friendsystemlogic enthalten ist. Dort wird sie ausführlicher erklärt
 * @return: Array mit Freundesvorschlägen, die den Suchbegriff im Benutzernamen enthalten
 */
async function getFriendRecommendations(req) {
    let friendRecommendations = [];
    try {
    const { personalInformation } = await database.initializeCollections()
    const input = req.params.input;
    const userID = req.params.userID;
    const userIDObj = new ObjectId(userID)

    const regex = new RegExp(input, "i"); // "i" für Case-Insensitive-Suche
    friendRecommendations = await personalInformation.find({ username: { $regex: regex } }).limit(20).toArray();
    friendRecommendations = await checkForFriendsInRecommendations(friendRecommendations, username)
    } catch (err) {
        console.error("Something went wrong in the Method getFriendReccommendations() " + err)
    }
    //console.log(friendRecommendations)
    return friendRecommendations;
}


/**
 * Diese Methode dient dazu, Einladungen (Freundesanfragen) eines Benutzers abzurufen.
 * 
 * @param req: Request-Objekt -> hier muss der Benutzername übergeben werden
 * @param getReceivedInvitations: Funktion, die unten weiter beschrieben wird
 * 
 * @return: Array mit zwei Arrays -> [receivedFromUsers, sentToUsers] 
 *          receivedFromUsers: Benutzer, die Einladungen gesendet haben
 *          sentToUsers: Benutzer, die Einladungen erhalten haben
 */

async function getInvitations(req) {
    try {
        const userID = req.params.userID;
        const {invitations} = await database.initializeCollections()

        const userIDObj = new ObjectId(userID)

        const receivedInvitations = await invitations.find({ toUserID: userIDObj }).toArray();
        const sentInvitations = await invitations.find({ fromUserID: userIDObj }).toArray();
        const receivedFromUsers = await getReceivedInvitations(receivedInvitations);
        const sentToUsers = await getSentInvitations(sentInvitations);
        return [receivedFromUsers, sentToUsers];

    }catch (err) {
        log.error(`Something went wrong here: ${err}`)
    }
}

/**
 * Diese Methode dient dazu, Benutzerdaten für erhaltene Einladungen abzurufen.
 * 
 * @param invitations: Array -> erhaltenen Einladungen (Objekte, die fromID enthalten)
 * @return: Array -> Benutzerdaten der Benutzer, die Einladungen gesendet haben
 */

async function getReceivedInvitations(invitations) {
    const { personalInformation } = await database.initializeCollections();
    const userIds = invitations.map(invitation => invitation.fromUserID)

    const users = await personalInformation.find({ _id: { $in: userIds } }).toArray()
    return users
}

/**
 * Diese Methode dient dazu, Benutzerdaten für gesendete Einladungen abzurufen.
 * 
 * @param invitations: Array -> gesendete Einladungen (Objekte, die toID enthalten)
 * @return: Array -> Benutzerdaten der Benutzer, die Einladungen erhalten haben
 */

async function getSentInvitations(invitations) {
    const { personalInformation }  = await database.initializeCollections()
    const userIds = invitations.map(invitation => invitation.toUserID)

    const users = await personalInformation.find({ _id: { $in: userIds } }).toArray()
    return users
}

module.exports = {
    postFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    getFriendList,
    getFriendRecommendations,
    getInvitations
}
