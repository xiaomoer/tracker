const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./routes/index')
// const multer = require('multer')
// const upload = multer()

mongoose.connect('mongodb://localhost/mongodata', { useNewUrlParser: true })

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/', index)

app.listen(3001, () => console.log('server at localhost:3000'))