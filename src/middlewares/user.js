const jwt = require('jsonwebtoken')
const { User } = require('../models')

const auth = async (req, res, next) => {
    try {
        let token = req.cookies.authorization
        if (!token) {
            throw new Error('No authorization token')
        }
        let data = jwt.verify(token, process.env.JWT_SECRET)
        if (!data) throw new Error('Invalid Token')

        let user = await User.findById(data.userId)

        req.user = user
        next()
    } catch (error) {
        res.redirect('/user/login')
    }
}


module.exports = auth