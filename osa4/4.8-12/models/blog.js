const mongoose = require('mongoose')

const url = require('../utils/config')

mongoose.connect(url.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    id: String
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Blog', blogSchema)