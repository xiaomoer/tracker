const express = require('express')
const Info = require('../models/info')
const BaseInfo = require('../models/baseInfo')
const path = require('path')
const fetch = require('node-fetch')
let router = express.Router()

router.get('/', (req, res) => {
  const visitCount = BaseInfo.count()
  const behaviorCount = Info.count()
  Promise.all([visitCount, behaviorCount]).then((vc, bc) => {
    res.render('index', { visitCount: vc, behaviorCount: bc })
  })
})

router.get('/demo', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.sendFile(path.resolve(__dirname, '../demo.html'))
})

function isEmptyObject(obj) {
  return !obj || Object.keys(obj) === 0
}

// 单条使用get/sendBeacon使用的是post的方式

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

router.all('/info', async (req, res) => {
  const data = JSON.parse(req.body)
  if (!data) {
    res.status(400).json({ err: `错误的参数：${data}` })
    return
  }
  // 收集用户ip并通过ip定位获取位置信息
  const ip = req.ip
  const address = await fetch(
    `https://restapi.amap.com/v3/ip?ip=${ip}&output=json&key=d638cc23ceab51dbcdb9e8b51323842f`
  ).then((res) => res.json())
  new BaseInfo({
    ...data,
    ip,
    address,
  }).save((err) => {
    if (err) {
      res.json(500).json({ err: err.message })
    }
    res.status(200).json({ status: 'ok' })
  })
})

module.exports = router
