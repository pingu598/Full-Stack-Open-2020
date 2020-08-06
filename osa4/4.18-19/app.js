const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('connecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app