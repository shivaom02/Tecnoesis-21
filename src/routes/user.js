const express = require('express')
const router = express.Router()
const { User } = require('../models')
const { userAuth } = require('../middlewares')
const jwt = require('jsonwebtoken')
const utils = require('../utils')
const crypto = require('crypto')

//post requests
router.post('/register', async (req, res) => {
    try {
        let { name, email, password, phoneNo } = req.body

        let alreadyExistingUser = await User.findOne({ email })

        if (alreadyExistingUser) {
            req.flash('error_msg', 'User already exists')

            return res.redirect('/user/login')
        }

        let newUser = new User({
            name,
            email,
            password,
            phoneNo,
        })

        let token = await newUser.generateAuthToken(email)

        res.cookie('authorization', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })

        await newUser.save()

        // console.log('new User', newUser)

        res.redirect('/user/profile')
    } catch (error) {
        req.flash('error_msg', 'Internal Server Error')

        return res.redirect('/user/register')
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findByCredentials(email, password)

        console.log('user', user)

        if (!user) {
            req.flash('error_msg', 'No User Found')

            return res.redirect('/user/login')
        }

        let token = await user.generateAuthToken(email)

        res.cookie('authorization', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })

        res.redirect('/user/profile')
    } catch (error) {
        req.flash('error_msg', 'Internal Server Error')

        return res.redirect('/user/login')
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('authorization')

    res.redirect('/user/login')
})

//get requests
router.get('/profile', userAuth, async (req, res) => {
    res.render('user', {
        user: req.user,
    })
})

router.get('/login', async (req, res) => {
    res.render('login',{
        type : 1
    })
})

router.get('/register', async (req, res) => {
    res.render(`login`,{
        type : 2
    })
})

router.get('/edit', userAuth, async (req, res) => {
    res.render('edit', {
        user: req.user,
    })
})

//update responses
router.put('/edit', userAuth, async (req, res) => {
    console.log(req.body)
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'phoneNo', 'email']
        const isValid = updates.every((update) =>
            allowedUpdates.includes(update)
        )

        if (!isValid) {
            req.flash('error_msg', 'Invalid Updates')

            return res.redirect('/user/profile')
        }

        const user = req.user

        updates.forEach((update) => (user[update] = req.body[update]))

        await user.save()

        return res.redirect('/user/profile')
    } catch (error) {
        req.flash('error_msg', 'Internal Server Error')

        return res.redirect('/user/profile')
    }
})

router.get('/forgotpassword', async (req, res) => {
    let token = req.cookies.authorization
    if (token) {
        let user = await utils.isAlreadyLoggedIn(token)
        if (user) {
            return res.redirect('/user/profile')
        } else {
            return res.render('forgotpassword')
        }
    } else {
        return res.render('forgotpassword')
    }
})

router.post('/forgotpassword', async (req, res) => {
    let { email } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        res.render('forgotpassword')
    }
    let resetToken = await user.createPasswordResetToken()

    await user.save()

    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/user/resetpassword/${resetToken}`

    utils.sendEmail(email, resetURL, 'Reset Password')

    res.send('Password reset link sent successfully')
})

router.get('/resetpassword/:resetToken', async (req, res) => {
    let resetToken = req.params.resetToken
    let hashedToken = await crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    let user = await User.findOne({
        passwordResetToken: hashedToken,
        resetTokenExpire: { $gt: Date.now() },
    })
    if (!user) return res.send('Invalid Password reset link')

    user.passwordResetToken = undefined
    user.resetTokenExpire = undefined
    await user.save()
    res.redirect(`/updatepassword/${user._id}`)
})

router.post('updatepassword/:userId', async (req, res) => {
    let { password } = req.body
    let userId = req.params.userId
    let user = await User.findById(userId)
    if (!user) {
        return res.send('Invalid User')
    }
    user.password = password
    await user.save()
    res.send('Password Reset Successfull')
})
module.exports = router
