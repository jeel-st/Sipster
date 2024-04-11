const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000

const loginRouter = require('./routes/routerLogin')
const registerRouter = require('./routes/routerRegister')
const eventsRouter = require('./routes/routerEvents')
const friendsRouter = require('./routes/routerFriendSystem')

const { connectToDB } = require('./databases/databaseMain')
connectToDB()

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/events', eventsRouter)
app.use('/friends', friendsRouter)


app.listen(PORT, () => console.log('Server is listening on PORT 3000...'))