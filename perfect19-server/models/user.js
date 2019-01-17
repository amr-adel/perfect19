const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatarSrc: {
        type: String
    }
})

userSchema.pre('save', async function (nxt) {
    try {
        if (!this.isModified('password')) {
            return nxt()
        }

        let hashedPassword = await bcrypt.hash('this.password', 10)
        this.password = hashedPassword
        return nxt()
    } catch (err) {
        return nxt(err)
    }
})

userSchema.method.comparePassword = async function (password, nxt) {
    try {
        let isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (err) {
        return nxt(err)
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User