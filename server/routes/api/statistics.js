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
  Promise.all([queryCount, queryData]).then(([totalCount, data]) => {
    res.json({
      result: data,
      totalCount,
    })
  })
})

// pv:访问次数
// uv:每天同一个用户被算作一次访问，这里基于ip的uv，不是很严格

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

router.get('/pv', (_, res) => {
  BaseInfo.aggregate()
    .group({ _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, count: { $sum: 1 }, ips: { $push: '$ip' } })
    .exec((err, result) => {
      if (err) {
        res.status(500).json({ err: err.message })
      } else {
        res.json(result)
      }
    })
})

module.exports = router
