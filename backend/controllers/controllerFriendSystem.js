const database = require("../databases/databaseMain")

async function postFriendRequest(req, res){
    try{
        const friendRequestPost = await database.postFriendRequest(req)
        res.send("Friend request was send successfully!")
    }catch(err){
        console.log(err)
        res.status(404).send("Something went wrong")
    }
}

async function deleteFriendRequest(req, res){
    try{
        if(req.query.status == null && (req.query.remove == null || req.query.remove !== "true")){
            res.status(404).send("Status and remove are null or wrong")
            return;
        }

        if(req.query.status == "true"){
            const friendRequestDel = await database.acceptFriendRequest(req)
            res.send("User was accepted!")

        }else if(req.query.status == "false"){
            const friendRequestDel = await database.declineFriendRequest(req)
            res.send("User was declined")

        }

        if(req.query.remove == "true"){
            const friendRequestDel = await database.removeFriend(req)
            res.send("Friend was removed")
        }

    }catch(err){
        console.log(err)
        res.status(404).send("Something went wrong " + err)
    }
}

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

module.exports = {
    postFriendRequest,
    deleteFriendRequest,
    getFriendNameList,
    getFriendList
}