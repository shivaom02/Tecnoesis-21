const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/views/landing.html'))
    res.render('landing')
})

const userRoutes = require('./user')
const hacksRoutes = require('./hacks')
const modulesRoutes = require('./modules')

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './../views/error404.html'))
})

router.use('/user', userRoutes)
router.use('/hacks', hacksRoutes)
router.use('/modules', modulesRoutes)

module.exports = router
