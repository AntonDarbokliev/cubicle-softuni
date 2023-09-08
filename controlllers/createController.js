const { create } = require('../services/cubeService.js')


const router = require('express').Router()


router.get('/', (req,res)=>{
    res.render('create')
})

router.post('/', async (req,res)=>{
try{
    await create(req.body)
    res.redirect('/')
}catch(err){
    res.render('create',{
        title : 'Request error'
    }); 
    console.log(err);
}


})


module.exports = router
