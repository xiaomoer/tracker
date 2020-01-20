const mongoose = require('mongoose')

const BaseInfoSchema = mongoose.Schema({
  version: String,
  platform: String,
  language: String,
  battery: {
    charging: Boolean,
    chargingTime: Number,
    dischargingTime: { type: Number, default: 0 },
    level: Number
  },
  connection: { effectiveType: String, rtt: Number, downlink:Number },
  online: { type: Boolean, default: true },
  position: { long: Number, lat: Number }
})

module.exports = mongoose.model('BaseInfo', BaseInfoSchema)