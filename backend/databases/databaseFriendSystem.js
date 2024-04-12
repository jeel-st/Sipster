const database = require("./databaseMain")

async function postFriendRequest(req){
    const {fromSipsterID, toSipsterID} = req.body
    const timestamp = Date.now(); 
    const sendAt = new Date(timestamp).toISOString();


    const userData = {fromSipsterID, toSipsterID, sendAt}

    try{
        await database.getDB().collection("invitations").insertOne(userData)
    }catch(err){
        console.log(err)
        throw new Error("Database disconnected")
    }
}

async function acceptFriendRequest(req){
    const fromSipsterID = req.params.fromSipsterID
    const toSipsterID = req.params.toSipsterID

    const fromUser = await database.getDB().collection("personalInformation").findOne({ username: fromSipsterID });
    const toUser = await database.getDB().collection("personalInformation").findOne({ username: toSipsterID });
    
    if (!fromUser || !toUser) {
        throw new Error("Benutzer nicht gefunden");
    }

    await database.getDB().collection("personalInformation").updateOne(
        { username: fromSipsterID },
        { $addToSet: { friends: toUser.username } }
    );
    
    await database.getDB().collection("personalInformation").updateOne(
        { username: toSipsterID },
        { $addToSet: { friends: fromUser.username } }
    );
    let result = await database.getDB().collection("invitations").deleteOne({fromSipsterID: fromSipsterID, toSipsterID: toSipsterID})

    if (result.deletedCount === 0) {
        throw new Error("Anfrage nicht gefunden")
    } else {

        return("Anfrage erfolgreich gelöscht")
    }
}

async function declineFriendRequest(req){
    const fromSipsterID = req.params.fromSipsterID
    const toSipsterID = req.params.toSipsterID

    const fromUser = await database.getDB().collection("personalInformation").findOne({ username: fromSipsterID });
    const toUser = await database.getDB().collection("personalInformation").findOne({ username: toSipsterID });
    
    if (!fromUser || !toUser) {
        throw new Error("Benutzer nicht gefunden");
    }

    let result = await database.getDB().collection("invitations").deleteOne({fromSipsterID: fromSipsterID, toSipsterID: toSipsterID})

    if (result.deletedCount === 0) {
        throw new Error("Anfrage nicht gefunden")
    } else {

        return("Anfrage erfolgreich gelöscht")
    }
}

async function removeFriend(req){
    try {
        const { fromSipsterID, toSipsterID } = req.params;

        await database.getDB().collection("personalInformation").updateOne(
            { username: fromSipsterID },
            { $pull: { friends: toSipsterID } }
        )

        await database.getDB().collection("personalInformation").updateOne(
            { username: toSipsterID },
            { $pull: { friends: fromSipsterID } }
        )

        return "Friend removed successfully"
    } catch (error) {
        
        console.error(error);
        throw new Error("An error occurred while removing friend")
    }
}

async function getFriendList(req){
    const username = req.params.username

    try {
        
        const user = await database.getDB().collection("personalInformation").findOne({ username });


        if (!user) {
            throw new Error("Benutzer nicht gefunden");
        }

        const friendList = user.friends || [];

        return friendList;
    } catch (error) {
        
        console.error(error);
        throw new Error("Something went wrong while getting friend list");
    }
}

module.exports = {
    postFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    getFriendList
}
