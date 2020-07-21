const express = require('express')
const Info = require('../models/info')
const BaseInfo = require('../models/baseInfo')
const path = require('path')
let router = express.Router()

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.sendFile(path.resolve(__dirname, '../index.html'))
})

function isEmptyObject(obj) {
  return !obj || Object.keys(obj) === 0
}

router.all('/upload', (req, res) => {
  const data = isEmptyObject(req.body) ? [req.query] : JSON.parse(req.body)
  if (data && data.length > 0) {
    for (let item of data) {
      let result = new Info({
        path: item.path,
        type: item.type,
        nodeName: item.nodeName,
        position: item.position,
      })
      result.save(function (err) {
        if (err) {
          res.status(500).json({ err: err.message })
        }
      })
    }
    res.status(200).json({ status: 'ok' })
  }
})

router.all('/info', (req, res) => {
  const data = JSON.parse(req.body)
  if (!data) res.status(400).json({ err: `错误的参数：${data}` })
  new BaseInfo({
    ...data,
  }).save((err) => {
    if (err) {
      res.json(500).json({ err: err.message })
    }
    res.status(200).json({ status: 'ok' })
  })
})

module.exports = router
