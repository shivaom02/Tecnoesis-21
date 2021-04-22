const express = require('express')
const router = express.Router()
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/landing.html'));
})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+ './../views/error404.html'));
})

module.exports = router
