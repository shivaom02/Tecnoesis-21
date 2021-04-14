const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Tecnoesis-21')
});
router.get('/hacks', (req, res) => res.render('../views/hacks.html'))

module.exports = router
