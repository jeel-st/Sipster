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
        const friendRequestDel = await database.deleteFriendRequest(req)
        res.send("Success!")
    }catch(err){
        console.log(err)
        res.status(404).send("Something went wrong")
    }
}

module.exports = {
    postFriendRequest,
    deleteFriendRequest
}