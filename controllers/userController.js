const models = require("../models")
const userController = {}


//signup
userController.createUser = async (req, res) => {
    try {
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ message: 'New user has been created', user })

    } catch (error) {
        res.status(400)
        res.json({ error: 'User already exists with this email' })
    }
}


//login
userController.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })
        if (user.password === req.body.password) {
            res.json({ message: 'login successful', user: user })
        } else {
            res.status(401)
            res.json({ error: 'incorrect password' })
        }
    } catch (error) {
        res.status(400)
        res.json({ error: 'login failed' })
    }
}

//get all users
userController.getAll = async (req, res) => {
    try {
        console.log("hi")
        const users = await models.user.findAll()
        console.log(users);
        res.json({ users })
    } catch (error) {
        res.status(400)
        res.json({ error: 'users info not found' })
    }
}

//user info
userController.getUser = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({ user })
    } catch (error) {
        res.status(400)
        res.json({ error: 'user info not found' })
    }
}

//update user
userController.update = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.params.id
            }
        })
        const updatedUser = await user.update(req.body)


        res.json({ updatedUser })
    } catch (error) {
        res.status(400)
        res.json({ error: 'user could not be updated' })
    }
}

//delete user
userController.destroy = async (req, res) => {
    try {
        const user = await models.user.findOne(
            {
                where: {
                    id: req.params.id
                }
            })
        await user.destroy()
        res.json({ user, message: 'Your account has been deleted' })
    } catch (error) {
        res.status(400)
        res.json({ error: 'could not delete user' })
    }
}
module.exports = userController

