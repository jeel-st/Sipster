const database = require("./databaseMain")
const log = require("../logging/logger")
const { checkForFriendsInRecommendations } = require("../utils/friendSystemLogic/FriendsRecommendationLogic")
const logMiddleware = require("../routes/logMiddleware")

async function postFriendRequest(req){
    const invitations = await database.getDB().collection("invitations")
    const {fromSipsterID, toSipsterID} = req.body
    const timestamp = Date.now(); 
    const sendAt = new Date(timestamp).toISOString();


    const userData = {fromSipsterID, toSipsterID, sendAt}

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

    const fromUser = await personalInformation.findOne({ username: fromUsername });
    const toUser = await personalInformation.findOne({ username: toUsername });
    
    if (!fromUser || !toUser) {
        throw new Error("Benutzer nicht gefunden");
    }

    await personalInformation.updateOne(
        { username: fromUsername },
        { $addToSet: { friends: toUser.username } }
    );
    
    await personalInformation.updateOne(
        { username: toUsername },
        { $addToSet: { friends: fromUser.username } }
    );
    let result = await invitations.deleteOne({fromUsername: fromUsername, toUsername: toUsername})

    if (result.deletedCount === 0) {
        throw new Error("Anfrage nicht gefunden")
    } else {

        return("Anfrage erfolgreich gelöscht")
    }
}

async function declineFriendRequest(req){
    const invitations = await database.getDB().collection("invitations")
    const personalInformation = await database.getDB().collection("personalInformation")

    const fromSipsterID = req.params.fromSipsterID
    const toSipsterID = req.params.toSipsterID

    const fromUser = await personalInformation.findOne({ username: fromSipsterID });
    const toUser = await personalInformation.findOne({ username: toSipsterID });
    
    if (!fromUser || !toUser) {
        throw new Error("Benutzer nicht gefunden");
    }

    let result = await invitations.deleteOne({fromSipsterID: fromSipsterID, toSipsterID: toSipsterID})

    if (result.deletedCount === 0) {
        throw new Error("Anfrage nicht gefunden")
    } else {

        return("Anfrage erfolgreich gelöscht")
    }
}

async function removeFriend(req){
    const personalInformation = await database.getDB().collection("personalInformation")
    try {
        const { fromSipsterID, toSipsterID } = req.params;

        await personalInformation.updateOne(
            { username: fromSipsterID },
            { $pull: { friends: toSipsterID } }
        )

        await personalInformation.updateOne(
            { username: toSipsterID },
            { $pull: { friends: fromSipsterID } }
        )

        return "Friend removed successfully"
    } catch (error) {
        
        console.error(error);
        throw new Error("An error occurred while removing friend")
    }
}

/*async function getFriendNameList(req){
    const personalInformation = await database.getDB().collection("personalInformation")
    const username = req.params.username

    try {
        
        const user = await personalInformation.findOne({ username });

        if (!user) {
            throw new Error("Benutzer nicht gefunden");
        }

        const friendList = user.friends || [];

        return friendList;
    } catch (error) {
        
        console.error(error);
        throw new Error("Something went wrong while getting friend list");
    }
}*/

async function getFriendList(req){
    const personalInformation = await database.getDB().collection("personalInformation")
    const username = req.params.username;
    let friendList = new Array();

    try {

        const user = await personalInformation.findOne({ username });

        if (!user) {
            throw new Error("Benutzer nicht gefunden");
        }

        const friendNameList = user.friends;

        if (!friendNameList){
            return [];
        }else {
            let i = 0
            for (const friend of friendNameList){
                let currentFriend = await personalInformation.findOne({username: friend})
                if (currentFriend == null) {
                    continue;
                }
                friendList.push(currentFriend)
                console.log(friendList[i].username)
                i++;
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

        const from = await invitations.find(
            {toUsername: username})
            .project({fromUsername: 1})
            .toArray();
        let mappedFrom = from.map(user => user.fromUsername)
        let fromUsers = await getUsers(mappedFrom)
        
        const to = await invitations.find(
            {fromUsername: username})
            .project({toUsername: 1})
            .toArray();
        let mappedTo = to.map(user => user.toUsername)
        let toUsers = await getUsers(mappedTo)

        return [fromUsers, toUsers]
        
    }catch (err) {
        log.error(`Something went wrong here: ${err}`)
    }
}

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
