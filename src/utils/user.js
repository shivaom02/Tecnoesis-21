const { User } = require('../models')
const jwt = require('jsonwebtoken')

const isAlreadyLoggedIn = async (token) => {
    let data = jwt.verify(token, process.env.JWT_SECRET)

    if (!data) return null

    let user = await User.findById(data.userId)

    if (!user) return null

    return user
}

module.exports = {
    isAlreadyLoggedIn,
}
