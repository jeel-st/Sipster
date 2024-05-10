const { on } = require('nodemon')
const database = require('../databases/databaseMain')

async function getSips(req, res){
    try {
        const username = req.params.username
        const sips = await database.getSips(username)
        
        res.json(sips)
    } catch (error) {
        if(error.message === "No sips found for the specified username"){
            res.status(204).send("No sips found, maybe wrong username")
        }else{
            res.status(500).send('Internal Server Error')
        }
        
    }
}

async function changeSips(req, res){
    try {
        const username = req.params.username
        const sipsNew = req.body.sips

        const sips = await database.changeSips(username, sipsNew)
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

async function changeSipsForFriends(req, res){
    const usernameArray = req.body.friends
    const sips = req.body.sips
    
    let result = []
    let oneResult
    if (!usernameArray || usernameArray.length === 0) {
        return res.status(204).send("No friends there...");
    }
    try{
        for (let username of usernameArray) {
            if (username) {
                oneResult = await database.changeSips(username, sips);
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