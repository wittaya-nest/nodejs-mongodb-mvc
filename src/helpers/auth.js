const helpers = {}

helpers.isAuthenticated = function(req, res ,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error', 'Not Authorized Please Signin')
    res.redirect('/users/signin')
}

module.exports = helpers