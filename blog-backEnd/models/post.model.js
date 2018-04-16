const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
 /* id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },*/
  type: {
    type: String,
    enum: ['Html', 'Css', 'JavaScript'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Methods
PostSchema.method({})

// Static Methods
PostSchema.static({})

module.exports = mongoose.model('Post', PostSchema)
