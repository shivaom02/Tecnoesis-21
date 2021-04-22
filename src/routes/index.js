const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile('../../src/views/landing.html');
})

module.exports = router
