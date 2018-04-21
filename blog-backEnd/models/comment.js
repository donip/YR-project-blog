const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const commentSchema = mongoose.Schema({
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        required: true
    },
    sentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Blogpost' }
}, {
        timestamps: true
    });

userSchema.plugin(passportLocalMongoose, { //passport-local-mongoose leírásban benne vannak a beállítások
    maxAttempts: 5,
    hashField: 'passwordHash'
}); //lehet különböző beállítsokat adni

module.exports = mongoose.model('Comment', commentSchema);