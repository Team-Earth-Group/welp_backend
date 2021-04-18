const express = require('express')
const userController = require('../controllers/userController')
const userRoutes = express.Router()

userRoutes.get('/profile', userController.userProfile)
userRoutes.get('/', userController.getAll)
userRoutes.get('/:id', userController.getUser)
userRoutes.post('/', userController.createUser)
userRoutes.post('/login', userController.login)
userRoutes.put('/:id', userController.update)
userRoutes.delete('/:id', userController.destroy)


userRoutes.get('/:id/businesses', userController.allbusinesses)
userRoutes.get('/:id/businesses/:businessId', userController.getBusiness)
userRoutes.post('/:id/businesses', userController.createBusiness)
userRoutes.put('/:id/businesses/:businessId', userController.updateBusiness)
userRoutes.delete('/:id/businesses/:businessId', userController.deleteBusiness)


module.exports = userRoutes;
