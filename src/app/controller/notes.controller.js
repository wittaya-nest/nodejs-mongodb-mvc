const Note = require('../models/Note')


exports.allnotes =  async function(req, res){
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'})
    res.render('notes/all-notes', {notes})
}

exports.addnote = function(req, res) {
    res.render('notes/add-note')
}

exports.save = async function(req, res) {
    const { title, description } = req.body
    const errors = []
    if(!title) {
        errors.push({text: 'Please Write a Title'})
    }
    if(!description) {
        errors.push({text: 'Please Write a Description'})
    }
    if(errors.length > 0) {
        res.render('notes/add-note', {
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({ title, description})
        newNote.user = req.user.id
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfully')
        res.redirect('/notes')
    }
}

exports.editnote =  async function(req, res){
    console.log('editnote')
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', {note})
}
exports.update = async function(req, res){
    console.log('save edit')
    const {title, description} = req.body
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Note Updated Successfully')
    res.redirect('/notes')
}

exports.delete =  async function(req, res){
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note Deleted Successfully')
    res.redirect('/notes')
}