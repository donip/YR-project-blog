const passport = require('passport');
const userRouter = require('express').Router();
const User = require('../controllers/user.controller');
const Blogpost = require('../controllers/blogpost.controller');
const BlogComment = require('../controllers/comment.controller')

userRouter.get('/', User.getUser);
userRouter.post('/register', User.register);
userRouter.post('/login', passport.authenticate('local'), User.login);
userRouter.get('/logout', User.logout);

userRouter.get('/blog/all', Blogpost.getAllBlogposts);
userRouter.post('/blog/createpost', Blogpost.createBlogpost);
userRouter.get('/blog/findpost/:id', Blogpost.getBlogpost);
userRouter.put('/blog/editpost/:id', Blogpost.updateBlogpost);
userRouter.delete('/blog/deletepost/:id', Blogpost.deleteBlogpost);
userRouter.get('/comment/all', BlogComment.getAllcomments);
userRouter.post('/comment/create', BlogComment.createComment);
userRouter.delete('/comment/delete/:id', BlogComment.deleteComment);

module.exports = userRouter;
