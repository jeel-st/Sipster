const express = require('express')
const fs = require('fs')
const app = express()
const path = require("path")

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


const PORT = 3000

const { uploadDir, uploadDirCom, uploadStaticDir, uploadBeforePicture } = require('./utils/uploadLogic/config')

try {
    fs.mkdirSync(uploadBeforePicture)
    fs.mkdirSync(uploadStaticDir)
    fs.mkdirSync(uploadDir)
    fs.mkdirSync(uploadDirCom)
  } catch (e) {

    if (e.code !== 'EEXIST') throw e
  }


const loginRouter = require('./routes/routerLogin')
const registerRouter = require('./routes/routerRegister')
const eventsRouter = require('./routes/routerEvents')
const friendsRouter = require('./routes/routerFriendSystem')
const profilePictureRouter = require("./routes/routerProfilePicture")
const userRouter = require("./routes/routerUser")
const sipsRouter = require("./routes/routerSips")
const activitiesRouter = require("./routes/routerActivities")

const { connectToDB } = require('./databases/databaseMain')
connectToDB()

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/events', eventsRouter)
app.use('/friends', friendsRouter)
app.use('/imageUpload', profilePictureRouter)
app.use('/user', userRouter)
app.use("/sips", sipsRouter)
app.use("/activities", activitiesRouter)

app.use("/static", express.static(__dirname + '/static'))

app.listen(PORT, () => console.log('Server is listening on PORT 3000...'))