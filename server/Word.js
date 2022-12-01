const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    'entry': {
        type: String,
        lowercase: true
    }
})

module.exports = mongoose.model('Word', wordSchema)