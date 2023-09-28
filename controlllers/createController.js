const { create } = require('../services/cubeService.js')
const  { body, validationResult } = require('express-validator')
const createErrorObject = require('../utils/createErrorObject.js')

const router = require('express').Router()


router.get('/', (req,res)=>{
    res.render('create',{
        title :  'Create a Cube'
    })
})

router.post('/',
body('name')
.notEmpty().withMessage('Name is required').bail()
.isLength({min : 5}).withMessage('Name should be at least 5 characters long')
.matches(/[a-z A-Z0-9]+/).withMessage('Name may only contain english letters and numbers'),
body('description')
.notEmpty().withMessage('Description is required').bail()
.isLength({min : 20}).withMessage('Description should be at least 20 characters long')
.matches(/[a-z A-Z0-9]+/).withMessage('The Description may only contain english letters and numbers'),
body('imageUrl')
.matches(/^https?:\/\/.*/).withMessage('Invalid URL')
,async (req,res)=>{
try{
    
    const { errors } = validationResult(req)

    if(errors.length > 0){
        createErrorObject(errors)
    }

    const result =  await create(req.body)
    res.redirect('/details/' + result._id)
}catch(err){
    res.render('create',{
        title : 'Create error',
        err,
        body : {
            name : req.body.name
        }
    }); 
}


})


module.exports = router
