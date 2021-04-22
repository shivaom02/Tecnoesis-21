const express = require('express')
const router = express.Router()

router.post('/contactForm', async (req, res) => {
    try {
        let { email, message } = req.body

        let newMessage = new ContactForm({
            email,
            message,
        })

        await newMessage.save()

        return res.redirect('/')
    } catch (error) {
        return res.redirect('/')
    }
})

module.exports = router
