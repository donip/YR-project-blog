const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model')
// register
router.get('/register', (req, res) => {
    res.render('register');
});
// login
router.get('/login', (req, res) => {
    res.render('login');
});
// register
router.post('/register', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;
// validation
    req.checkBody('name', 'Név kötelező').notEmpty();
    req.checkBody('email', 'Email kötelező').notEmpty();
    req.checkBody('email', 'Email érvénytelen').isEmail();
    req.checkBody('username', 'Felhasználónév kötelező').notEmpty();
    req.checkBody('password', 'Jelszó kötelező').notEmpty();
    req.checkBody('password2', 'Jelszó nem egyezik').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register', {errors:errors});
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        User.createUser(newUser, (err, user) => {
            if(err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'Sikeres regisztráció');

        res.redirect('/users/login');
    }

});

// passport
passport.use(new LocalStrategy(
    (username, password, done) => {
     User.getUserByUsername(username, (err, user) => {
         if(err) throw err;
         if(!user){
             return done(null, false, {message: 'Nincs ilyen felhasználó'});
         }

         User.comparePassword(password, user.password, (err, isMatch) => {
             if(err) throw err;
             if(isMatch){
                 return done(null, user);
             } else {
                 return done(null, false, {message: 'Helytelen jelszó'});
             }
         });
     });
    }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
      done(err, user);
    });
  });

  router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
    (req, res) => {
      res.redirect('/');
    });

  router.get('/logout', (req, res) => {
      req.logout();

      //req.flash('success_msg', 'Sikeres kijelenetkezés');
    console.log('Sikeres kijelentkezes')
      res.redirect('/users/login');
  });

module.exports = router;