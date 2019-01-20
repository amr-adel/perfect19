const db = require('../models')
const jwt = require('jsonwebtoken')

exports.signin = async function (req, res, nxt) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        })

        let {
            id,
            userName,
            avatar,
            wishes
        } = user

        let isMatch = await user.comparePassword(req.body.password)

        if (isMatch) {
            let token = jwt.sign({
                id,
                userName,
                avatar
            }, process.env.SECRET_KEY)

            return res.status(200).json({
                id,
                userName,
                avatar,
                wishes,
                token
            })
        } else {
            return nxt({
                status: 400,
                message: 'Invalid E-mail/password1'
            })
        }

    } catch (err) {
        return nxt({
            status: 400,
            message: 'Invalid E-mail/password2'
        })
    }
}


exports.signup = async function (req, res, nxt) {
    try {
        let user = await db.User.create(req.body)

        let {
            id,
            userName,
            avatar
        } = user

        let token = jwt.sign({
            id,
            userName,
            avatar
        }, process.env.SECRET_KEY)

        return res.status(200).json({
            id,
            userName,
            avatar,
            token
        })

    } catch (err) {
        if (err.code === 11000) {
            err.message = 'User name and/or email is already taken.'
        }

        return nxt({
            status: 400,
            message: err.message
        })
    }
}