const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Info = require('./models/info')
// const multer = require('multer')
// const upload = multer()
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

mongoose.connect('mongodb://localhost/mongodata', { useNewUrlParser: true })

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.all('/upload', function(req, res) {
  const data = JSON.parse(req.body)
  if (data && data.length > 0) {
    for (let item of data) {
      let result = new Info({
        path: item.path,
        type: item.type,
        nodeName: item.nodeName,
        position: item.position
      })
      result.save(function(err) {
        if(err) {
          res.status(500).json({ err: err.message })
        }
      })
    }
    res.status(200).json({ status: 'ok' })
  }
})

app.listen(3000, () => console.log('server at localhost:3000'))