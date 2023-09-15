const { createAccessory } = require('../services/accessoryService.js')

const router = require('express').Router()

router.get('/',(req,res)=>{
    res.render('createAccessory',{
        title : 'Create an Accessory'
    })
})

router.post('/', async (req,res)=>{
    try{
        await createAccessory(req.body)
        res.redirect('/')
    }catch(err){
        res.render('createAccessory',{
            title : 'Request error'
        }); 
        console.log(err);  
    }
    
    
    })


module.exports = router