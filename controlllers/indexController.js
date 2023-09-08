const { getAll, getById } = require('../services/cubeService.js');


const router = require('express').Router();

router.get('/',(req,res)=>{
    const cubes = getAll()
    res.render('index',{
        title: "Browse",
        cubes
    })
})


router.get('/details/:id',(req,res)=>{
    const id = req.params.id
    const cube = getById(id)
    console.log(id);
    console.log(cube);
    if(cube){
        res.render('details',{
            cube
        })
    }else{
        res.render('404')
    }
})
module.exports = router