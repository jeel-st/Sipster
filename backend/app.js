const express = require('express')
const fs = require('fs')
const app = express()
const path = require("path")

// Middleware zum Parsen von JSON und URL-kodierten Daten mit einer Größenbeschränkung von 50 MB

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


const PORT = 3000

const { uploadDir, uploadDirCom200,uploadDirCom1080, uploadStaticDir, uploadBeforePicture, uploadAfterPicture } = require('./utils/uploadLogic/config')

// Versuche die Upload-Verzeichnisse zu erstellen, falls sie noch nicht existieren

try {
    fs.mkdirSync(uploadStaticDir, { recursive: true })
    fs.mkdirSync(uploadDir, { recursive: true })
    fs.mkdirSync(uploadDirCom200, { recursive: true })
    fs.mkdirSync(uploadDirCom1080, { recursive: true })
    fs.mkdirSync(uploadBeforePicture, { recursive: true })
    fs.mkdirSync(uploadAfterPicture, { recursive: true })
  } catch (e) {
    console.log("Error beim Erstellen der Ornder: "+ e)
    if (e.code !== 'EEXIST') throw e
  }

// Import der Router für die verschiedenen Endpunkte

const loginRouter = require('./routes/routerLogin')
const registerRouter = require('./routes/routerRegister')
const eventsRouter = require('./routes/routerEvents')
const friendsRouter = require('./routes/routerFriendSystem')
const profilePictureRouter = require("./routes/routerProfilePicture")
const userRouter = require("./routes/routerUser")
const sipsRouter = require("./routes/routerSips")
const activitiesRouter = require("./routes/routerActivities")

// Datenbankverbindung herstellen

const { connectToDB } = require('./databases/databaseMain')
connectToDB()

// Verwendung der Router für die jeweiligen Endpunkte

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/events', eventsRouter)
app.use('/friends', friendsRouter)
app.use('/imageUpload', profilePictureRouter)
app.use('/user', userRouter)
app.use("/sips", sipsRouter)
app.use("/activities", activitiesRouter)

// Bereitstellung statischer Dateien im "static"-Verzeichnis

app.use("/static", express.static(__dirname + '/static'))

// Starten des Servers und Lauschen auf dem definierten PORT

app.listen(PORT, () => console.log('Server is listening on PORT 3000...'))