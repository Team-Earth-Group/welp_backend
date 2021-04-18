const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require("../models")
const userController = {}

//signup
userController.createUser = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
        console.log(encryptedId);
        res.json({ message: 'New user has been created', userId: encryptedId })

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
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
            res.json({ message: 'login successful', userId: encryptedId })
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
        const users = await models.user.findAll()
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

userController.userProfile = async (req, res) => {
    try {
        // we used to look up user in here
        // but now it's looked up before all routes and attached to req
        // so there's no need to look it up in here
        // furthermore, we could access req.user in any route
        // this is useful because irl, we have many many routes that want to access the currently logged in user, not just 1
        res.json({ user: req.user })
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: 'user profile not found' })
    }
}

// get all user businesses
userController.allbusinesses = async (req, res) => {
    try {
        const user = await models.user.findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        )

        const businesses = await user.getBusinesses({
            include: models.user,
            attributes: { exclude: ['userId'] }
        })
        res.json({
            businesses
        })

    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({
            message: 'something went wrong.'
        })
    }
}

// get a specific user business
userController.getBusiness = async (req, res) => {
    try {
        const userId = req.params.id
        const businessId = req.params.businessId

        const business = await models.business.findOne(
            {
                where: {
                    id: businessId,
                    userId: userId
                },
                include: models.user,
                attributes: { exclude: ['userId'] }
            }
        )

        res.json({
            business
        })

    } catch (error) {
        res.status(400)
        res.json({
            message: 'something went wrong.'
        })
    }
}

// create a new business
userController.createBusiness = async (req, res) => {
    try {
        const { name, location, type, imageUrl, description } = req.body
        const user = await models.user.findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        )

        const business = await models.business.create({
            name: name,
            location: location,
            type: type,
            imageUrl: imageUrl,
            description: description
        })

        await user.addBusiness(business)

        res.json({
            message: 'ok',
            user,
            business
        })

    } catch (error) {
        res.status(400)
        res.json({
            message: 'something went wrong.'
        })
    }
}

// update user business
userController.updateBusiness = async (req, res) => {
    try {
        const userId = req.params.id
        const businessId = req.params.businessId
        await models.business.update(
            req.body,
            {
                where: {
                    id: businessId,
                    userId: userId
                }
            })

        const business = await models.business.findOne({
            where: {
                id: businessId
            }
        })
        res.json({
            business
        })
    } catch (error) {
        res.status(400)
        res.json({
            message: 'something went wrong.'
        })
    }
}

// delete a user business 

userController.deleteBusiness = async (req, res) => {
    try {
        const business = await models.business.findOne(
            {
                where: {
                    id: req.params.businessId,
                    userId: req.params.id
                }
            })
        await business.destroy()
        res.json({ message: 'ok', business })
    } catch (error) {
        res.status(400)
        res.json({ message: 'somethinng went wrong.' })
    }
}

module.exports = userController

