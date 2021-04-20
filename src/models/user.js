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
        password: {
            type: String,
        },
        registeredEvents: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.methods.generateAuthToken = async function (email) {
    const user = this
    const token = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        }
    )
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    let user = await User.findOne({ email })

    if (!user) {
        return null
    }

    let isMatch = await bcrypt.compare(password, user.password)

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
