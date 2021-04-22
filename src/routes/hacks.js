const express = require('express')
const router = express.Router()
const { ContactForm } = require('../models')

router.get('/', (req, res) => {
    res.render('hacks')
})

router.post('/contactForm', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body

        const newMessage = new ContactForm({
            name,
            email,
            subject,
            message,
        })

        await newMessage.save()

        req.flash('success_msg', 'Message Sent')

        return res.redirect('/hacks')
    } catch (error) {
        req.flash('error_msg', 'Some Error Occurred.Please Sent Again')

        return res.redirect('/hacks')
    }
})

module.exports = router
