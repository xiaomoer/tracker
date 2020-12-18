const express = require('express')
const ErrorModel = require('../../models/error')
const path = require('path')
let router = express.Router()

router.get('/page', (req, res) => {
  const { page = 1, size = 10 } = req.query
  const queryCount = ErrorModel.count()
  const queryData = ErrorModel.find()
    .sort({ time: -1 })
    .skip((Number(page) - 1) * Number(size))
    .limit(Number(size))
  Promise.all([queryCount, queryData]).then(([totalCount, data]) => {
    res.json({
      result: data,
      totalCount,
    })
  })
})

router.get('/count', (req, res) => {
  ErrorModel.count((err, count) => {
    if (err) {
      res.status(500).json({ status: 1, message: err })
    }
    res.json({
      result: count,
    })
  })
})

module.exports = router
