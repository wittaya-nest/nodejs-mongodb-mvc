const User = require('../models/User')

exports.signin = function(req, res){
    res.render('users/signin')
}
exports.signup = function(req, res){
    res.render('users/signup')
}

exports.register = async function(req, res){
    var {name, email, password, confirm_password} = req.body
    name = name.toLowerCase()
    email = email.toLowerCase()
    const errors = []
    if(name.length == 0) errors.push({text: 'Please Inpsert Username '})
    if(email.length == 0) errors.push({text: 'Please Insert Email '})
    if(password != confirm_password) errors.push({text: 'Password do not match'})
    if(password.length < 4) errors.push({text: 'Password must be at least 4 characters'})
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email})
    } else{ 
            const nameUser = await User.findOne({name: name})
            const emailUser = await User.findOne({email: email})
            if(nameUser && !emailUser){
                errors.push({text: 'The Username is already in use'})
                res.render('users/signup', {errors, email})
            }
            if(!nameUser && emailUser){
                errors.push({text: 'The Email is already in use'})
                res.render('users/signup', {errors, name})
            }
            if(nameUser && emailUser) {
                errors.push({text: 'The Username is already in use'}, {text: 'The Email is already in use'})
                res.render('users/signup', {errors})
            }
            if(!nameUser && !emailUser){
                const newUser = new User({name, email, password})
                newUser.password = await newUser.encryptPassword(password)
                await newUser.save()
                req.flash('success_msg', 'You are registered')
                res.redirect('/users/signin')
            }
        }
    }

exports.logout = function(req, res){
        req.logout()
        res.redirect('/')
}