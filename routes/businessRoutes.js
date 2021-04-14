const express = require('express')
const businessController = require('../controllers/businessController')
const businessRoutes = express.Router()

businessRoutes.get('/', businessController.getAll)

module.exports = businessRoutes
