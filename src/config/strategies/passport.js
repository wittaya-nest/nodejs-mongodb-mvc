const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const validator = require("email-validator")
const User = require('../../app/models/User')

passport.use(new LocalStrategy({
    usernameField: 'id',
    passReqToCallback: true
}, function(req, id, password, done){
    if(validator.validate(id)){
        User.findOne({email: id.toLowerCase()}, compare(req, password, done))
    }else{
        User.findOne({name: id.toLowerCase()}, compare(req, password, done))
    }
}))

function compare(req, password, done){
    return function (err, user){
        if (err) throw (err)
        if(!user) return done(null, false, req.flash('error', 'Not User found'))
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw (err)
            if(isMatch) {
                return done(null, user, req.flash('success_msg', 'Welcome  ' + user.name))
            } else{
                return done(null, false, req.flash('error', 'Incorrect Password'))
            }
        })
    }
}

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        done(err, user)
    })
})
