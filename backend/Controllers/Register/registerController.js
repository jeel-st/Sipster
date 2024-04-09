const isValidEmail = require("../../Logic/registrationChecks").isValidEmail;
const isValidPassword = require("../../Logic/registrationChecks").isValidPassword;
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


app.post('/register', async (req, res) => {
    const { username, tagline, password, email, firstName, lastName, registerDate } = req.body
    const personalData = { username, tagline, password, email, firstName, lastName, registerDate }
    const usernameFinder = await db.collection("personalInformations").findOne({ username: username, tagline: tagline });
    const emailFinder = await db.collection("personalInformations").findOne({ email: email });

    if (isValidPassword(password)) {

        if (isValidEmail(email)) {

            if (usernameFinder) {
                res.send("Duplicate username + tagline")
            } else if (emailFinder) {
                res.send("Duplicate Email")
            } else {
                await db.collection('personalInformations').insertOne(personalData)
                res.send("Success!")
            }
        } else {
            res.send("Email format false")
        }
    } else {
        res.send("Password format false")
    }
})

app.delete('/register/:username/:tagline', async (req, res) => {
    const username = req.params.username
    const tagline = req.params.tagline
    try {
        const result = await db.collection("personalInformations").deleteOne({ username: username, tagline: tagline })
        if (result.deletedCount === 0) {
            res.status(404).send("Benutzer nicht gefunden");
        } else {
            res.send("Benutzer erfolgreich gelöscht");
        }
    } catch (error) {
        console.error("Fehler beim Löschen des Benutzers:", error);
        res.status(500).send("Interner Serverfehler");
    }
}
)

app.listen(3100)
console.log('static server running on port 3100...')

