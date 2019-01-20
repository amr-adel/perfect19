const express = require('express')
const router = express.Router({
    mergeParams: true
})
const {
    createWish,
    getWish,
    removeWish
} = require('../handlers/wishes')

router.route('/').post(createWish)
router.route('/:wish_id').get(getWish).delete(removeWish)

module.exports = router