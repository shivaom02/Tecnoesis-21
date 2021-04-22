const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const hacksRoutes = require('./hacks')
const modulesRoutes = require('./modules')
const tecnoContactFormRoute = require('./tecnoContactForm')

router.get('/', (req, res) => {
    res.render('welcome')
})

router.use('/', tecnoContactFormRoute)
router.use('/user', userRoutes)
router.use('/hacks', hacksRoutes)
router.use('/modules', modulesRoutes)


module.exports = router
