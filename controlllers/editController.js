const { getById, update } = require('../services/cubeService.js')

const router = require('express').Router()


router.get('/:cubeId',async (req,res) =>{
     const cube = await getById(req.params.cubeId)
    res.render('editCubePage',{
        cube,
        title : 'Edit'
    })

})


router.post('/:cubeId',async (req,res) =>{
    await update(req.params.cubeId,req.body)
    res.redirect('/details/' + req.params.cubeId)
})

module.exports = router