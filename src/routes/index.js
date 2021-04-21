const express = require('express')
const router = express.Router()
const path = require('path')
const userRoutes = require('./user')

router.get('/', (req, res) => {
    res.render('welcome')
})

router.get('/hacks',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../','views','hacks.html'));
})

router.use('/user', userRoutes)

module.exports = router
