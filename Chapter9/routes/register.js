/**
 * Created by Odin on 05.12.2016.
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');

router.get('/', function(req, res, next){
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res, next){
    var data = req.body;
    UserModel.find({'email': data.email}, function(err, user){
        if(err) return next(err);
        if(user.length != 0){
            res.error("User with this email already exist!");
            res.redirect('back');
        }else{
            var userForSave= {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.pass
            };
            UserModel.create(userForSave, function(err, savedUser){
                if (err) return next(err);
                req.session.uid = savedUser._id;
                res.redirect('/');
            });
        }
    });
});

module.exports = router;