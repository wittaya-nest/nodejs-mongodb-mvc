const passport = require('passport')
const UserCon = require('../controller/user.controller')


module.exports = function(app){
    app.route('/users/signin').get(UserCon.signin).post(passport.authenticate('local', {
        successRedirect: '/notes',
        failureRedirect: '/users/signin',
        failureFlash: true
    }))
    app.route('/users/signup').get(UserCon.signup).post(UserCon.register)
    app.route('/users/logout').get(UserCon.logout)
}