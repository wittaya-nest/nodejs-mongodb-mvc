var noteCon = require('../controller/notes.controller')
const {isAuthenticated} = require('../../helpers/auth')

module.exports = function(app){
    app.route('/notes').get(isAuthenticated, noteCon.allnotes)
    app.route('/notes/add').get(isAuthenticated, noteCon.addnote)
        .post(isAuthenticated, noteCon.save)
    app.route('/notes/edit/:id').get(isAuthenticated, noteCon.editnote)
        .put(isAuthenticated, noteCon.update)
    app.route('/notes/delete/:id').delete(isAuthenticated, noteCon.delete)
}