const express = require('express')
const router = express.Router()
const { User } = require('../models')
const { userAuth } = require('../middlewares')

router.post('/register', async (req, res) => {
    try {
        let { name, email } = req.body

        let alreadyExistingUser = await User.findOne({ email })

        if (alreadyExistingUser) {
            return res.send('User already exists')
        }

        let newUser = new User({
            name,
            email,
        })

        await newUser.save()
    } catch (error) {
        console.log(error)
        res.send('Error', error)
    }
})

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findByCredentials(email, password)

        if (!user) {
            return res.send('No such user found')
        }

        let token = await user.generateAuthToken(email)
        res.cookie('authorization', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
        res.send('Logged in successfully')
    } catch (error) {
        console.log(eror)
        res.send('error')
    }
})

router.post('/logout', async (req, res) => {
    res.clearCookie('authorization')
    res.send('Logged out')
})

router.get('/profile', userAuth, async (req, res) => {
    res.send('User Data: ', req.user)
})

module.exports = router
