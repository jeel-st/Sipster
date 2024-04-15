const database = require("./databaseMain")
const log = require("../logging/logger")

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
    const fromSipsterID = req.params.fromSipsterID
    const toSipsterID = req.params.toSipsterID

    const fromUser = await personalInformation.findOne({ username: fromSipsterID });
    const toUser = await personalInformation.findOne({ username: toSipsterID });
    
    if (!fromUser || !toUser) {
        throw new Error("Benutzer nicht gefunden");
    }

    await personalInformation.updateOne(
        { username: fromSipsterID },
        { $addToSet: { friends: toUser.username } }
    );
    
    await personalInformation.updateOne(
        { username: toSipsterID },
        { $addToSet: { friends: fromUser.username } }
    );
    let result = await invitations.deleteOne({fromSipsterID: fromSipsterID, toSipsterID: toSipsterID})

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
    try {
    const personalInformation = await database.getDB().collection("personalInformation");
    const input = req.params.input;
    let friendRecommendations = [];

        const regex = new RegExp(input, "i"); // "i" für Case-Insensitive-Suche
        friendRecommendations = await personalInformation.find({ username: { $regex: regex } }).limit(15).toArray();

    } catch (err) {
        console.error("Something went wrong in the Method getFriendReccommendations() " + err)
    }

    return friendRecommendations;
}

async function getInvitations(req) {
    try {
        const username = req.params.username;
        const personalInformation = await database.getDB().collection("personalInformation");
        const invitations = await database.getDB().collection("invitations");
        const from = invitations.find({fromUsername: username}, {username: 1}).toArray();
        let fromUsers = [];
        for (let username in from){
            user = await personalInformation.findOne({username: username})

            if (user == null){
                log.info(username + " was not found in the database!")
                continue;
            }

            fromUsers.push(user)
        }
    }
}

module.exports = {
    postFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    //getFriendNameList,
    getFriendList,
    getFriendRecommendations
}
