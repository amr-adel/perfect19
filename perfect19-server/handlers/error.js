function errorHandler(err, req, res, nxt) {
    return res.status(err.status || 500).json({
        err: {
            message: err.message || 'Ooops, something went wrong!'
        }
    })
}

module.exports = errorHandler