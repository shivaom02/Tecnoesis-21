const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const hacksRoutes = require('./hacks')

const modulesRoutes = require('./modules')

router.get('/', (req, res) => {
    res.render('welcome')
})


router.use('/user', userRoutes)
router.use('/hacks', hacksRoutes)
router.use('/modules', modulesRoutes)


module.exports = router
