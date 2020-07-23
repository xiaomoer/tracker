const express = require('express')
const BaseInfo = require('../../models/baseInfo')
const path = require('path')
let router = express.Router()

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.sendFile(path.resolve(__dirname, '../index.html'))
})

// 单条使用get/sendBeacon使用的是post的方式

router.get('/page', (req, res) => {
  const { page = 1, size = 10 } = req.query
  const queryCount = BaseInfo.count()
  const queryData = BaseInfo.find()
    .sort({ date: -1 })
    .skip((Number(page) - 1) * Number(size))
    .limit(Number(size))
  Promise.all([queryCount, queryData]).then((totalCount, data) => {
    res.json({
      result: data,
      totalCount,
    })
  })
})

router.get('/count', (req, res) => {
  BaseInfo.count((err, count) => {
    if (err) {
      res.status(500).json({ status: 1, message: err })
    }
    res.json({
      result: count,
    })
  })
})

module.exports = router
