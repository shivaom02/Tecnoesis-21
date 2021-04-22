const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile('landing.html');
})

module.exports = router
