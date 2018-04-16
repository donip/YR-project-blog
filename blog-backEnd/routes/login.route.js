const express = require('express');
const router = express.Router();
const user = require('../models/user.model')

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

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
        let newUser = new user({
            name: name,
            email: email,
            username: username,
            password: password
        });

        User.createUser(newUser, (err, user) => {
            if(err) throw err;
            console.log(user);
        });
        res.redirect('/users/login');
    }

});

module.exports = 