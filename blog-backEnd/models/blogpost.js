const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/user');

const blogpostSchema = mongoose.Schema({
    _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    tags: [String],
    isPublic: Boolean,
    likes: Number,
    dislikes: Number

}, {
        timestamps: true
    });

// blogpostSchema.plugin(passportLocalMongoose, { //passport-local-mongoose leírásban benne vannak a beállítások
//     maxAttempts: 5,
//     hashField: 'passwordHash'
// }); //lehet különböző beállítsokat adni

module.exports = mongoose.model('Blogpost', blogpostSchema);