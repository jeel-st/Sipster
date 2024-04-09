const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000

const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const eventsRouter = require('./routes/events')

const { connectToDB } = require('./database')
connectToDB()

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/events', eventsRouter)

app.listen(PORT, () => console.log('Server is listening on PORT 3000...'))