const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./routes/index')
const statistics = require('./routes/api/statistics')
const Record = require('./routes/api/record')
const ErrorRecord = require('./routes/api/error')

mongoose.connect('mongodb://localhost/mongodata', { useNewUrlParser: true })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const allowCrossDomain = function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'POST,GET')
  res.set('Access-Control-Headers', 'Content-Type, authorization')
  res.set('Access-Control-Allow-Credentials', 'true')
  next()
}

app.use(allowCrossDomain)
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/', index)
app.use('/api/s', statistics)
app.use('/api/r', Record)
app.use('/api/e', ErrorRecord)

app.listen(3001, '0.0.0.0', () => console.log('server at localhost:3001'))
