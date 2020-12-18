const mongoose = require('mongoose')

const ErrorSchema = mongoose.Schema({
  message: { type: String, isRequired: true },
  filename: { type: String },
  line: { type: Number },
  col: { type: Number },
  error: { type: String },
  time: { type: Date, isRequired: true },
})

module.exports = mongoose.model('Error', ErrorSchema)
