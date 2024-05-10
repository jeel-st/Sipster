const database = require("./databaseMain")
const log = require("../logging/logger")
const { checkForFriendsInRecommendations } = require("../utils/friendSystemLogic/FriendsRecommendationLogic")
const logMiddleware = require("../routes/logMiddleware")

async function postFriendRequest(req){
    const invitations = await database.getDB().collection("invitations")
    const {fromSipsterID, toSipsterID} = req.body
    const fromID = await database.getSipsterID(fromSipsterID)
    const toID = await database.getSipsterID(toSipsterID)
    const timestamp = Date.now(); 
    const sendAt = new Date(timestamp).toISOString();


    const userData = {fromID, toID, sendAt}

    try{
        await invitations.insertOne(userData)
    }catch(err){
        throw new Error("Database disconnected" + err)
    }
}

async function acceptFriendRequest(req){
    const personalInformation = await database.getDB().collection("personalInformation")
    const invitations = await database.getDB().collection("invitations")
    const fromUsername = req.params.fromSipsterID
    const toUsername = req.params.toSipsterID

    const fromSipsterID = await database.getSipsterID(fromUsername)
    const toSipsterID = await database.getSipsterID(toUsername)

    const fromUser = await personalInformation.findOne({ _id: fromSipsterID });
    const toUser = await personalInformation.findOne({ _id: toSipsterID });
    console.log("FromUserString: "+fromUser.toString())
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
    let result = await invitations.deleteOne({fromID: fromSipsterID, toID: toSipsterID})

    if (result.deletedCount === 0) {
        throw new Error("Anfrage nicht gefunden")
    } else {

        return("Anfrage erfolgreich gelöscht")
    }
}

async function declineFriendRequest(req){
    const invitations = await database.getDB().collection("invitations")
    const personalInformation = await database.getDB().collection("personalInformation")

    const fromUsername = req.params.fromSipsterID
    const toUsername = req.params.toSipsterID

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

async function removeFriend(req){
    

    const personalInformation = await database.getDB().collection("personalInformation")
    try {
        const fromUsername = req.params.fromSipsterID
        const toUsername = req.params.toSipsterID

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

        return "Friend removed successfully"
    } catch (error) {
        
        console.error(error);
        throw new Error("An error occurred while removing friend")
    }
}

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

async function getReceivedInvitations(invitations) {
    const personalInformation = await database.getDB().collection("personalInformation")
    const userIds = invitations.map(invitation => invitation.fromID)

    const users = await personalInformation.find({ _id: { $in: userIds } }).toArray()
    return users
}

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
