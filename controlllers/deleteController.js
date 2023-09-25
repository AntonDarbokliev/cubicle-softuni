const { delCube, getById } = require('../services/cubeService.js')

const router = require('express').Router()

router.get('/:cubeId',async (req,res) =>{
     const cube = await getById(req.params.cubeId)
    res.render('deleteCubePage',{
        cube,
        title : 'Delete Cube'
    })

})


router.post('/:cubeId',async (req,res) =>{
   const cube = await delCube(req.params.cubeId)
    res.redirect('/')
})


module.exports = router