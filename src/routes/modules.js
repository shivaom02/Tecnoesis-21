const express = require('express')
const router = express.Router()
const {Modules} = require('../utils/modules.js');


// Get - Modules Page
router.get('/',(req,res)=>{
    res.render('modules');
})

// Get Specific Modules
router.get('/:id',(req,res)=>{
    const module = req.params.id;
    res.render(`${Modules[module]}`);
})

module.exports = router;