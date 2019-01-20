const db = require('../models')

exports.createMessage = async function (req, res, nxt) {
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        })

        let foundUser = await db.User.findById(req.params.id)
        foundUser.messages.push(message.id)
        await foundUser.save()

        let foundMessage = await db.Message.findById(message.id).populate('user', {
            userName: true,
            avatarSrc: true
        })

        return res.status(200).json(foundMessage)

    } catch (err) {
        return nxt(err)
    }
}

exports.getMessage = async function (req, res, nxt) {
    try {
        let message = await db.Message.findById(req.params.message_id).populate('user', {
            userName: true,
            avatarSrc: true
        })

        return res.status(200).json(message)
    } catch (err) {
        return nxt(err)
    }
}

exports.removeMessage = async function (req, res, nxt) {
    try {
        let message = await db.Message.findById(req.params.message_id)
        await message.remove()

        return res.status(200).json(message)
    } catch (err) {
        return nxt(err)
    }
}