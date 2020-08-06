const mongoose = require('mongoose')

const url = require('../utils/config')

mongoose.connect(url.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  module.exports = mongoose.model('Blog', blogSchema)