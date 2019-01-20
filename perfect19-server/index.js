require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const messagesRoutes = require('./routes/messages')
const {
    isLoggedin,
    isAuthorized
} = require('./middleware/auth')

const PORT = 8081

app.use(cors())
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)
app.use('/api/user/:id/messages', isLoggedin, isAuthorized, messagesRoutes)

app.use('/api/messages', isLoggedin, async function (req, res, nxt) {
    try {
        let messages = await db.Message.find()
            .sort({
                createdAt: 'desc'
            })
            .populate('user', {
                userName: true,
                avataSrc: true
            })

        return res.status(200).json(messages)
    } catch (err) {
        return nxt(err)
    }
})

app.use(function (req, res, nxt) {
    let err = new Error('Not found')
    err.status = 404
    nxt(err)
})

app.use(errorHandler)

app.listen(PORT, function () {
    console.log(`Server is starting on port: ${PORT}`)
})