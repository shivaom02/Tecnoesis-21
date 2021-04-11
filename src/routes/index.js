const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Tecnoesis-21')
})

module.exports = router
