const userController = require('../controllers/userController')

const express = require('express')
const userRoutes = express.Router()

userRoutes.get('/', userController.getAll)
userRoutes.get('/:id', userController.getUser)

userRoutes.post('/', userController.createUser)
userRoutes.post('/login', userController.login)

userRoutes.put('/:id', userController.update)

userRoutes.delete('/:id', userController.destroy)



module.exports = userRoutes;
