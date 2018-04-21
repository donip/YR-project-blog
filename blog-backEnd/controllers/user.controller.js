const User = require('../models/user');

module.exports = {
    getUser: (req, res) => {
        res.json({
            user: req.user
        })
    },

    register: (req, res, next) => {
        User.register(new User({
            username: req.body.username,
            email: req.body.email,
        }), req.body.password, (err) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                success: 'Sikeres regisztráció'
            })
        });
    },

    login: (req, res) => {
    res.json({
        success: 'Belépve',
        userName: req.user.username,
        id: req.user._id
    });  //itt lehet az Angular-nak visszaküldeni adatokat
    },

    logout: (req, res) => {
        req.logout();       //meg itt stb.
        res.json({
            success: 'Kilépve'
        })
    }
}