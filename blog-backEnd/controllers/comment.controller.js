const BlogComment = require('../models/comment');

module.exports = {
    getAllcomments: (req, res) => {
        BlogComment.find({}, (err, comment) => {
            if (err) {
                res.send(err)
            }
            res.json(comment)
        })
    },

    createComment: (req, res, next) => {
        BlogComment.create(req.body, (err, comment) => {
            if (err) {
                res.json({error: err})
            }
            res.json({
                success: 'sucessfully created'
            });
        })
    },

    deleteComment: (req, res) => {
        BlogComment.findByIdAndRemove(req.params.id, (err, blogpost) => {
            if (err) {
              res.send(err)
            }
            res.json({
                success: 'successfully removed'
            })
          })
        }
}
