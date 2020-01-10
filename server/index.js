const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.all('/upload', function(req, res) {
  console.log(req)
})

app.listen(3000, () => console.log('server at localhost:3000'))