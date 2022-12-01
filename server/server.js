require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const Word = require('./Word')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB database connected'))
    .catch((err) => console.log(err))

app.get('/api/word/:length', async (req, res) => {
    try {
        const length = parseInt(req.params.length) || 5
        const words = await Word.find({ $expr: { $eq: [{ $strLenCP: '$entry' }, length] } })
        const index = Math.floor(Math.random() * words.length)

        if (words.length == 0) throw 'invalid length value'

        res.status(200).json({ words: words.map(x => x.entry), index })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

app.use(express.static(__dirname + '/public'))

app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))