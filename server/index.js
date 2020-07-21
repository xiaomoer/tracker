const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./routes/index')
const jwt = require('jsonwebtoken')
// const multer = require('multer')
// const upload = multer()

const KEY = 'JSONWEBTOKENKEY'

mongoose.connect('mongodb://localhost/mongodata', { useNewUrlParser: true })

const allowCrossDomain = function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'POST,GET')
  res.set('Access-Control-Headers', 'Content-Type, authorization')
  res.set('Access-Control-Allow-Credentials', 'true')
  next()
}

app.use(allowCrossDomain)

// app.use(function (req, res, next) {
//   const { headers, path } = req;
//   console.log("path", path);
//   if (path === "/" || path === "/tracker.min.js") {
//     next();
//     return;
//   }
//   if (headers.authorization) {
//     const token = headers.authorization.split(" ")[1];
//     req.token = token;
//     jwt.verify(token, key, function (err, decoded) {
//       if (err) {
//         res.status(401).json({ msg: "无访问权限" });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ msg: "无访问权限" });
//   }
// });

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/', index)

app.listen(3001, () => console.log('server at localhost:3001'))
