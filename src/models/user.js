const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        return null
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return null
    }

    return user
}

//To hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

module.exports = User = mongoose.model('User', userSchema)
