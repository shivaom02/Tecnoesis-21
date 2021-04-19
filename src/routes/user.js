const express = require('express')
const router = express.Router()
const { User } = require('../models')

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
    let { email, password } = req.body
    let user = await User.findByCredentials(email, password)

    if (!user) {
        return res.send('No such user found')
    }

    let token = await user.generateAuthToken()

    res.send('Logged in successfully')
})

router.post('/logout', async (req, res) => {
    //remove token
    res.send('Logged out')
})
module.exports = router
