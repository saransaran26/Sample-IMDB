const mongoose = require('mongoose')

const moviesitem = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    runtime:{
        type:String,
        required:true
    },
    writer:{
        type:String,
        required:true
    },
    actor:{
        type:String,
        required:true
    },
})

const Movies = mongoose.model('movie',moviesitem)

module.exports = Movies