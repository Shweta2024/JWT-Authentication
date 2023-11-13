const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_STRING)

app.listen(PORT, (req, res) => {
    console.log(`server started at port: ${PORT}`)
})