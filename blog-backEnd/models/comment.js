const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const commentSchema = mongoose.Schema({
    sentBy: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Blogpost' }
}, {
        timestamps: true
    });


module.exports = mongoose.model('Comment', commentSchema);