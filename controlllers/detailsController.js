const { getById } = require('../services/cubeService.js')

const router = require('express').Router()

router.get('/',(req,res)=>{
    const id = req.params.id
    console.log(req.params);
    const cube = getById(id)
    if(cube){
        res.render('details',{
            cube
        })
    }else{
        res.render('404')
    }
})



module.exports = router
