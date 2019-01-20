const mongoose = require('mongoose')
const User = require('./user')

const messageSchema = new mongoose.Schema({
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

messageSchema.pre('remove', async function (nxt) {
    try {
        let user = await User.findById(this.user)
        console.log(user)
        user.messages.remove(this.id)
        await user.save()
        return nxt()
    } catch (err) {
        return nxt(err)
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message