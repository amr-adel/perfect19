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
    avatar: {
        type: String
    },
    wishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wish'
    }]
})

userSchema.pre('save', async function (nxt) {
    try {
        if (!this.isModified('password')) {
            return nxt()
        }

        let hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        return nxt()
    } catch (err) {
        return nxt(err)
    }
})

userSchema.methods.comparePassword = async function (signinPassword, nxt) {
    try {
        let isMatch = await bcrypt.compare(signinPassword, this.password)
        return isMatch;
    } catch (err) {
        return nxt(err);
    }
};

const User = mongoose.model('User', userSchema)

module.exports = User