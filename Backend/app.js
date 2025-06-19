const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const cors = require('cors')
const connectToDb = require('./db/db')
const UserRoute = require('./routes/User.route')
const cookieParser = require('cookie-parser')
const CaptainRoute = require('./routes/Captain.route')

connectToDb()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/', (req,res) => {
    res.send('Hello world!')
})

app.use('/User', UserRoute)
app.use('/Captain', CaptainRoute)

module.exports = app;