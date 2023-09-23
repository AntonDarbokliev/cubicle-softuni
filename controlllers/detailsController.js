const { getById } = require('../services/cubeService.js')

const router = require('express').Router()

router.get('/',(req,res)=>{
    const id = req.params.id
    const cube = getById(id)
    const cubeAccessories = getById(id).populate('accessories', ).lean()
    if(cube){
        res.render('details',{
            cube,
            cubeAccessories
        })
    }else{
        res.render('404')
    }
})



module.exports = router
