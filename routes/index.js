const express = require('express')
const morgan = require('morgan')
const api = require('./api')
const router = express.Router()

const url = '/'

router.use(morgan('combined'))

router.use(url, api)

module.exports = router
