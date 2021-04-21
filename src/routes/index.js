const express = require('express')
const router = express.Router()
const path = require('path')
const userRoutes = require('./user')

router.get('/', (req, res) => {
    res.render('welcome')
})

router.use('/user', userRoutes)

module.exports = router
