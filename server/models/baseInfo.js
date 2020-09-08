const mongoose = require('mongoose')

const BaseInfoSchema = mongoose.Schema({
  version: String,
  platform: String,
  language: String,
  ip: String,
  address: {
    status: String,
    info: String,
    infocode: String,
    province: String,
    city: String | Array,
    adcode: String | Array,
    rectangle: String | Array,
  },
  battery: {
    charging: Boolean,
    chargingTime: Number,
    dischargingTime: { type: Number, default: 0 },
    level: Number,
  },
  connection: { effectiveType: String, rtt: Number, downlink: Number },
  online: { type: Boolean, default: true },
  position: { long: Number, lat: Number },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('BaseInfo', BaseInfoSchema)
