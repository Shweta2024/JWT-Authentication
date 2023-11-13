const mongoose = require('mongoose')

//create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },
    email: {
        type: String,
        required: true,
        min: 4
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    date: {
        type: date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema)