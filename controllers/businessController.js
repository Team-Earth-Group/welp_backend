const models = require('../models')
const { Op } = require("sequelize");
const businessController = {}


businessController.getAll = async (req, res) => {
    try {
        const keyword = req.query.keyword
        const location = req.query.location
        const businesses = await models.business.findAll({
            where: {
                type: {
                    [Op.substring]: keyword ? keyword : ''
                },
                location: {
                    [Op.substring]: location ? location : ''
                },
            },
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



businessController.getComments = async (req, res) => {
    try {
        const business = await models.business.findOne({
            where: {
                id: req.params.id
            },
            include: models.user,
            attributes: { exclude: ['userId'] },
            order: [
                ['createdAt', 'DESC']
            ],
        })

        const comments = await business.getComments({
            include: models.user,
            attributes: { exclude: ['userId'] }
        })
        res.json({
            business,
            comments
        })
    } catch (error) {
        res.status(400)
        res.json({
            message: 'Comments can not be found.'
        })
    }
}

businessController.createComment = async (req, res) => {
    try {
        const business = await models.business.findOne({
            where: {
                id: req.params.id,
            },
            include: models.user,
            attributes: { exclude: ['userId'] }
        })

        const comment = await models.comment.create({
            text: req.body.text,
            userId: req.body.userId,
            rating: req.body.rating
        })

        const user = await models.user.findOne({
            where: {
                id: req.body.userId
            }
        })

        await business.addComment(comment)

        res.json({
            comment,
            business,
            user
        })
    } catch (error) {
        res.status(400)
        res.json({
            message: 'Comment can not be created.'
        })
    }
}

businessController.updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId
        const businessId = req.params.id
        await models.comment.update(req.body, {
            where: {
                id: commentId,
                businessId: businessId,
                userId: req.body.userId
            }
        })

        const comment = await models.comment.findOne({
            where: {
                id: commentId
            }
        })

        const business = await models.business.findOne({
            where: {
                id: businessId
            }
        })
        res.json({
            business,
            comment
        })
    } catch (error) {
        res.status(400)
        res.json({
            message: 'Can not updated the comment.'
        })
    }
}

businessController.deleteComment = async (req, res) => {
    try {
        const comment = await models.comment.findOne({
            where: {
                id: req.params.commentId,
                businessId: req.params.id
            }
        })

        await comment.destroy()
        res.json({ message: 'Your comment has been deleted.', comment })
    } catch (error) {
        res.status(400)
        res.json({ message: 'Could not delete your comment' })
    }
}


module.exports = businessController