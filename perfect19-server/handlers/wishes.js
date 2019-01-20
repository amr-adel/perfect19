const db = require('../models')

exports.createWish = async function (req, res, nxt) {
    try {
        let wish = await db.Wish.create({
            text: req.body.text,
            user: req.params.id
        })

        let foundUser = await db.User.findById(req.params.id)
        foundUser.wishes.push(wish.id)
        await foundUser.save()

        let foundWish = await db.Wish.findById(wish.id).populate('user', {
            userName: true,
            avatar: true
        })

        return res.status(200).json(foundWish)

    } catch (err) {
        return nxt(err)
    }
}

exports.getWish = async function (req, res, nxt) {
    try {
        let wish = await db.Wish.findById(req.params.wish_id).populate('user', {
            userName: true,
            avatar: true
        })

        return res.status(200).json(wish)
    } catch (err) {
        return nxt(err)
    }
}

exports.removeWish = async function (req, res, nxt) {
    try {
        let wish = await db.Wish.findById(req.params.wish_id)
        await wish.remove()

        return res.status(200).json(wish)
    } catch (err) {
        return nxt(err)
    }
}