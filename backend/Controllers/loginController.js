const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let db = null;
const url = `mongodb://localhost:27017`;
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((connection) => {
    db = connection.db('sipster');
    console.log('connected to database sipster ...');
});

app.get('/login/:username/:tagline/:password', async (req, res) => {
    const username = req.params.username;
    const tagline = req.params.tagline;
    const password = req.params.password;

    const usernameFinder = await db.collection("personalInfomations").findOne({ username, tagline, password })

    if (usernameFinder) {
        
        res.send(true)
        
    }else{
        res.status(400).send("Ungültige Anmeldedaten.")
    }
})




app.listen(3000)
console.log('static server running on port 3000...')