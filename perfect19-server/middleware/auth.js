require('dotenv').load()
const jwt = require('jsonwebtoken')

exports.isLoggedin = function (req, res, nxt) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded) {
                return nxt()
            } else {
                return nxt({
                    status: 401,
                    message: 'Please log in first'
                })
            }
        })
    } catch (err) {
        return nxt({
            status: 401,
            message: 'Please log in first'
        })
    }
}

exports.isAuthorized = function (req, res, nxt) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded && decoded.id === req.params.id) {
                return nxt()
            } else {
                return nxt({
                    status: 401,
                    message: 'UNAUTHORIZED!'
                })
            }
        })
    } catch (err) {
        return nxt({
            status: 401,
            message: 'UNAUTHORIZED!'
        })
    }
}