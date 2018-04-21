const passport = require('passport');
const userRouter = require('express').Router();
const User = require('../controllers/user.controller');
const Blogpost = require('../controllers/blogpost.controller');

userRouter.get('/', User.getUser);
userRouter.post('/register', User.register);
userRouter.post('/login', passport.authenticate('local'), User.login);
userRouter.get('/logout', User.logout);

userRouter.get('/blog/all', Blogpost.getAllBlogposts);
userRouter.post('/blog/createpost', Blogpost.createBlogpost);
userRouter.get('/blog/findpost', Blogpost.getBlogpost);

module.exports = userRouter;
