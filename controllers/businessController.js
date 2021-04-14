const models = require('../models')
const businessController = {}


businessController.getAll = async (req, res) => {
    try {
        const businesses = await models.business.findAll({
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


module.exports = businessController