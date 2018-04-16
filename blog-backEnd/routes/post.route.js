const postController = require('../controllers/post.controller')
const express = require('express')
const postRouter = express.Router()

postRouter.route('/')
  .get(postController.list)
  .post(postController.create);

postRouter.route('/:id')
  .get(postController.find)
  .put(postController.update)
  .delete(postController.remove);

module.exports = postRouter