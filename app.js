const debug = require('debug')('app:startup')
const config = require('config')
const express = require('express')
const router = require('./routes')
const bodyParser = require('body-parser')

const app = express()

// app.use(express.json())
app.use(bodyParser.json())
app.use(router)

// Configuration
debug(`App is started in ${process.env.NODE_ENV} mode.`)
debug('Application name: ' + config.get('name'))

const port = process.env.PORT || 16732
app.listen(port, () => {
  debug(`Listening on port ${port}...`)
})