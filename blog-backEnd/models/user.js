const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    _id:    {type: mongoose.Schema.Types.ObjectId, default: () => { return new mongoose.Types.ObjectId()} },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    // posts: [{                     //lehet, ezt külön objektumba kell átrakni one to many/ many to many kapcsolások
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Blogpost'
    // }]
}, {
        timestamps: true
    });

userSchema.plugin(passportLocalMongoose, { //passport-local-mongoose leírásban benne vannak a beállítások
    maxAttempts: 5,
    hashField: 'passwordHash'
}); //lehet különböző beállítsokat adni

module.exports = mongoose.model('User', userSchema);