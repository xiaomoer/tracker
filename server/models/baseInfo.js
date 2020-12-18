const mongoose = require('mongoose')
const moment = require('moment')
const BaseInfoSchema = mongoose.Schema({
  version: String, // 浏览器版本，需要后续处理
  platform: String, // 操作系统
  language: String, // 语言环境
  ip: String, // ip地址
  address: {
    status: String,
    info: String,
    infocode: mongoose.Schema.Types.Mixed,
    province: mongoose.Schema.Types.Mixed,
    city: mongoose.Schema.Types.Mixed,
    adcode: mongoose.Schema.Types.Mixed,
    rectangle: mongoose.Schema.Types.Mixed,
  }, // 通过ip接口查询的地址
  battery: {
    charging: Boolean,
    chargingTime: Number,
    dischargingTime: { type: Number, default: 0 },
    level: Number,
  }, // 电池电量信息，不准确
  connection: { effectiveType: String, rtt: Number, downlink: Number }, // 网络及连接信息，不准确
  online: { type: Boolean, default: true }, // 是否在线
  position: { long: Number, lat: Number }, // 经纬度
  date: { type: Date, default: Date.now }, // 记录日期
  timing: {
    redirect: Number,
    appCache: Number,
    dns: Number,
    tcp: Number,
    ttfb: Number,
    downloaded: Number,
    http: Number,
    domloaded: Number,
    loaded: Number,
  }, // 基准性能相关
})

module.exports = mongoose.model('BaseInfo', BaseInfoSchema)
