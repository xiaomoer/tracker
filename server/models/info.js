const mongoose = require('mongoose')

const InfoSchema = mongoose.Schema({
  path: { type: String, isRequired: true },
  type: { type: String, isRequired: true, enum: ['click', 'dbclick', 'keydown'] },
  nodeName: { type: String, isRequired: false },
  position: { type: [Number] },
  time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Info', InfoSchema)
