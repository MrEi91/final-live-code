'user strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../config/db')

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }]
}, {
  timestamps: true
})

let User = mongoose.model('User', userSchema)

module.exports = User
