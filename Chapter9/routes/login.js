/**
 * Created by Odin on 05.12.2016.
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next){
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next){
    var data = req.body;
    UserModel.findOne({'email': data.email}, function(err, user){
        if(err) return next(err);
        if(!user){
            res.error("User with this email not found!");
            res.redirect('back');
        }else{
            console.log(data.pass, user);
            bcrypt.compare(data.pass, user.password, function(err, result){
                if(err) return next(err);
                if(!result){
                    res.error("Wrong Pass!");
                    res.redirect('back');
                }else{
                    req.session.uid = user._id;
                    res.redirect('/');
                }
            });
        }
    });
});

module.exports = router;