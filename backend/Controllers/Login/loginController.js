const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


let db = null;
const url = `mongodb://localhost:27017/`;


MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    }
).then((connection) => {
    db = connection.db('sipster');
    console.log('connected to database sipster ...');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.get('/login/:username/:password/:tagline', async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const tagline = req.params.tagline;
  
    const usernameFinder = await db.collection("personalInformations").findOne({ username, password,tagline })

    if (usernameFinder) {
        
        res.send(true)
        
    }else{
        res.status(400).send("Ungültige Anmeldedaten.")
    }
})


app.use((req, res, next) =>{
    res.send("Hello")
    console.log("Hello")
}
)



app.listen(3000)
console.log('static server running on port 3000...')