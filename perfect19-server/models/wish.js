const mongoose = require('mongoose')
const User = require('./user')

const wishSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
}
)

wishSchema.pre('remove', async function (nxt) {
    try {
        let user = await User.findById(this.user)
        user.wishes.remove(this.id)
        await user.save()
        return nxt()
    } catch (err) {
        return nxt(err)
    }
})

const Wish = mongoose.model('Wish', wishSchema)

module.exports = Wish