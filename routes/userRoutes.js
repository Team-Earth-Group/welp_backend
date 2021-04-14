const express = require('express')
const userRouter = express.Router()
const { create, login, getAll, findOne, update, destroy, allCampgrounds, getCampground, createCampground, updateCampground } = require('../controllers/userController')

userRouter.post('/', create)
userRouter.post('/login', login)
userRouter.get('/', getAll)
userRouter.get('/:id', findOne)
userRouter.put('/:id', update)
userRouter.delete('/:id', destroy)
userRouter.get('/:id/campgrounds', allCampgrounds)
userRouter.get('/:id/campgrounds/:campgroundId', getCampground)
userRouter.post('/:id/campgrounds', createCampground)
userRouter.put('/:id/campgrounds/:campgroundId', updateCampground)

module.exports = userRouter
