const { createAccessory } = require('../services/accessoryService.js')

const router = require('express').Router()

router.get('/:id',(req,res)=>{
    res.render('attachAccessory',{
        title : 'Attach an Accessory'
    })
})

router.post('/:id', async (req,res)=>{
    console.log(req.body);
    
    })


module.exports = router