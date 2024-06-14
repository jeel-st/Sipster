//Imports
const database = require("./databaseMain")
const log = require("../logging/logger")
const { ObjectId } = require('mongodb');
const { checkForFriendsInRecommendations } = require("../utils/friendSystemLogic/FriendsRecommendationLogic")

/**
 * Hier wird eine Freundesanfrage, mithilfe der SenderID, der EmpfängerID und eines Zeitstempels, erstellt
 * 
 * @param req:  Request- Objekt -> in denen die ID des Senders und Empfängers mitgegeben werden muss
 * @return:     InsertOneResult- Objekt (Bei Erfolg)
 * @throws:     Error (Bei Fehler) -> "Database disconnected + err"
 */
async function postFriendRequest(req){
    const invitations = (await database.initializeCollections()).invitations
    const {fromSipsterID, toSipsterID} = req.body
    const fromID = await database.getSipsterID(fromSipsterID)
    const toID = await database.getSipsterID(toSipsterID)
    const timestamp = Date.now(); 
    const sendAt = new Date(timestamp).toISOString();


    const userData = {fromID, toID, sendAt}
    if (checkIfOtherUserAlreadySentFriendRequest(userData, invitations)) {
        acceptFriendRequest(toSipsterID, fromSipsterID)
        return "Request rerouted!"
    }

    try{
        let result = await invitations.insertOne(userData)
        return result
    }catch(err){
        throw new Error("Database disconnected" + err)
    }
}

async function checkIfOtherUserAlreadySentFriendRequest(userData, invitations) {
    const foundFriendRequest = await invitations.findOne( {$and: [
        { fromID: userData.toID },
        { toID: userData.fromID }
      ]} )
    console.log(foundFriendRequest)

    if (foundFriendRequest == null) {
        return false;
    }else {
        console.log("why tf es ist doch null du penner")
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

async function acceptFriendRequest(fromUsername, toUsername){
    const personalInformation = (await database.initializeCollections()).personalInformation
    const invitations = (await database.initializeCollections()).invitations

    const fromSipsterID = await database.getSipsterID(fromUsername)
    const toSipsterID = await database.getSipsterID(toUsername)

    const fromUser = await personalInformation.findOne({ _id: fromSipsterID });
    const toUser = await personalInformation.findOne({ _id: toSipsterID });
    if (!fromUser || !toUser) {
        throw new Error("Benutzer nicht gefunden");
    }

    await personalInformation.updateOne(
        { _id: fromUser._id },
        { $addToSet: { friends: toUser._id } }
    );
    
    await personalInformation.updateOne(
        { _id: toUser._id },
        { $addToSet: { friends: fromUser._id } }
    );
    if (toUsername != "Sipster"){
        let result = await invitations.deleteOne({fromID: fromSipsterID, toID: toSipsterID})

        if (result.deletedCount === 0) {
            throw new Error("Anfrage nicht gefunden")
        } else {

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

async function declineFriendRequest(req){
    const invitations = await database.getDB().collection("invitations")
    const personalInformation = await database.getDB().collection("personalInformation")

    const fromUsername = req.params.fromUsername
    const toUsername = req.params.toUsername

    const fromSipsterID = await database.getSipsterID(fromUsername)
    const toSipsterID = await database.getSipsterID(toUsername)

    const fromUser = await personalInformation.findOne({ _id: fromSipsterID });
    const toUser = await personalInformation.findOne({ _id: toSipsterID });
    
    if (!fromUser || !toUser) {
        throw new Error("Benutzer nicht gefunden");
    }

    let result = await invitations.deleteOne({fromID: fromSipsterID, toID: toSipsterID})

    if (result.deletedCount === 0) {
        throw new Error("Anfrage nicht gefunden")
    } else {

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
    
    const personalInformation = await database.getDB().collection("personalInformation")

    try {
        const fromUsername = req.params.fromUsername
        const toUsername = req.params.toUsername

        if (toUsername == "Sipster" || fromUsername == "Sipster"){
            return false
        }

        const fromSipsterID = await database.getSipsterID(fromUsername)
        const toSipsterID = await database.getSipsterID(toUsername)
        
        await personalInformation.updateOne(
            { _id: fromSipsterID },
            { $pull: { friends: toSipsterID } }
        )

        await personalInformation.updateOne(
            { _id: toSipsterID },
            { $pull: { friends: fromSipsterID } }
        )

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
    const personalInformation = await database.getDB().collection("personalInformation")
    const username = req.params.username;
    let friendList = new Array();

    try {

        const user = await personalInformation.findOne({ username });

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
    const personalInformation = await database.getDB().collection("personalInformation");
    const input = req.params.input;
    const username = req.params.username;

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
 * @return: Array mit zwei Arrays -> [receivedFromUsers, sentToUsers] 
 *          receivedFromUsers: Benutzer, die Einladungen gesendet haben
 *          sentToUsers: Benutzer, die Einladungen erhalten haben
 */

async function getInvitations(req) {
    try {
        const username = req.params.username;
        const invitations = await database.getDB().collection("invitations");

        const userID = await database.getSipsterID(username)

        const receivedInvitations = await invitations.find({ toID: userID }).toArray();

        const sentInvitations = await invitations.find({ fromID: userID }).toArray();
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
    const personalInformation = await database.getDB().collection("personalInformation")
    const userIds = invitations.map(invitation => invitation.fromID)

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
    const personalInformation = await database.getDB().collection("personalInformation")
    const userIds = invitations.map(invitation => invitation.toID)

    const users = await personalInformation.find({ _id: { $in: userIds } }).toArray()
    return users
}

/*
async function getUsers(usernames) {
    const personalInformation = await database.getDB().collection("personalInformation");
    let users = [];
        for (let usernamee of usernames){
            let user = await personalInformation.find({username: usernamee}).project({_id: 0, encryptedPassword: 0, salt: 0}).toArray()
            if (user == null){
                log.warn(`${username} was not found in the database!`)
                continue;
            }
            users.push(user[0])
            //log.info(`pushed User: ${user}`)
        }

    return users;
}
*/

module.exports = {
    postFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    //getFriendNameList,
    getFriendList,
    getFriendRecommendations,
    getInvitations
}
