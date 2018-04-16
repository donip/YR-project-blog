const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema({
 /* id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },*/

  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true,
    default: "default.jpg"
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
