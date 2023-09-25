const { create } = require('../services/cubeService.js')


const router = require('express').Router()


router.get('/', (req,res)=>{
    res.render('create',{
        title :  'Create a Cube'
    })
})

router.post('/', async (req,res)=>{
try{
    const result =  await create(req.body)
    res.redirect('/details/' + result._id)
}catch(err){
    res.render('create',{
        title : 'Request error'
    }); 
}


})


module.exports = router
