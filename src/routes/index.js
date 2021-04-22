const express = require('express')
const router = express.Router()
const path = require('path')

const userRoutes = require('./user')
const hacksRoutes = require('./hacks')
const modulesRoutes = require('./modules')
const tecnoContactFormRoute = require('./tecnoContactForm')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/landing.html'))
    // res.render('landing')
})

router.use('/', tecnoContactFormRoute)
router.use('/user', userRoutes)
router.use('/hacks', hacksRoutes)
router.use('/modules', modulesRoutes)

module.exports = router
