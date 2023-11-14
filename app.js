const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const route = require('./routes/auth')
const privateRoute = require('./routes/privateRoute')

const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()

app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect(process.env.DB_CONNECTION_STRING)

app.use('/api/user', route)
app.use(privateRoute)

app.listen(PORT, (req, res) => {
    console.log(`server started at port: ${PORT}`)
})