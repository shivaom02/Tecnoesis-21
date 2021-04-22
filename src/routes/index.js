const express = require('express')
const router = express.Router()
const path = require('path');

router.get('/', (req, res) => {
    res.send('Tecnoesis-21')
})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+ './../views/error404.html'));
})

module.exports = router
