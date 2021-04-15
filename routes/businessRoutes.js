const express = require('express')
const businessController = require('../controllers/businessController')
const businessRoutes = express.Router()

businessRoutes.get('/', businessController.getAll)
businessRoutes.get('/:id/comments', businessController.getComments)
businessRoutes.post('/:id/comments', businessController.createComment)
businessRoutes.put('/:id/comments/:commentId', businessController.updateComment)
businessRoutes.delete('/:id/comments/:commentId', businessController.deleteComment)
module.exports = businessRoutes
