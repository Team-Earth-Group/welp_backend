const express = require('express')
const businessRouter = express.Router()
const { getAll } = require('../controllers/businessController')

businessRouter.get('/', getAll)

module.exports = businessRouter
