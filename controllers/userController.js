const models = require('../models')
const userController = {}

userController.allbusinesss = async (req, res) => {
    try {
        const user = await models.user.findOne(
            {
                where: {
                    id: req.params.id
                }
            }
        )

        const businesses = await user.getbusinesss({
            include: models.user,
            attributes: { exclude: ['userId'] }
        })
        res.json({
            businesses
        })

    } catch (error) {
        res.status(400)
        res.json({
            message: 'something went wrong.'
        })
    }
}

userController.getBusiness = async (req, res) => {
    try {
        const userId = req.params.id
        const businessId = req.params.businessId

        const business = await models.business.findOne(
            {
                where: {
                    id: businessId,
                    userId: userId
                }
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

        user.addBusiness(business)

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

userController.updatebusiness = async (req, res) => {
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
        console.log(error);
        res.status(400)
        res.json({
            message: 'something went wrong.'
        })
    }
}

module.exports = userController


