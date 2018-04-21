const Blogpost = require('../models/blogpost');

module.exports = {
    getAllBlogposts: (req, res) => {
        Blogpost.find({}, (err, blogpost) => {
            if (err) {
                res.send(err)
            }
            res.json(blogpost)
        })
    },

    getBlogpost: (req, res) => {
        Blogpost.findById(req.params.id, (err, blogpost) => {
            if (err) {
                res.send(err)
            }
            res.json(blogpost)
        })
    },

    createBlogpost: (req, res, next) => {
        Blogpost.create(req.body, (err, blogpost) => {
            if (err) {
                res.json({error: err})
            }
            res.json({
                success: 'sucessfully created'
            });
          //  res.json({
          //      success: 'Blogbejegyzés mentve',
          //      blogpost: blogpost
          //  })
        })
    },

    updateBlogpost: (req, res) => {
        Blogpost.findByIdAndUpdate(req.params.id, req.body, (err, blogpost) => {
          if (err) {
            res.send(err)
          }
          res.json(blogpost)
        })
      },

      deleteBlogpost: (req, res) => {
          Blogpost.findByIdAndRemove(req.params.id, (err, blogpost) => {
            if (err) {
              res.send(err)
            }
            res.json({
                success: 'successfully removed'
            })
          })
        }
}
