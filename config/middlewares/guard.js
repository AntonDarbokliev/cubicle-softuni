function hasUser (req,res,next){
    const hasUser = req.user != undefined
    if(!hasUser){
        res.redirect('/auth/login')
        console.log('User is required for this action!');
        return
    }

    next()
}

module.exports = {
    hasUser
}