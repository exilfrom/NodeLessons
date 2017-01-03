testData = {
    users : [
        {
            firstName: 'Ken',
            lastName: 'Kenoby',
            email: 'some@mail.tt'
        },
        {
            firstName: 'Jon',
            lastName: 'Snow',
            email: 'jonMail@mail.tt'
        },
        {
            firstName: 'Bob',
            lastName: 'Marly',
            email: 'bob@mail.tt'
        },
        {
            firstName: 'Anon',
            lastName: 'V',
            email: 'someName@mail.tt'
        }
    ]
}

var express = require('express');
var router = express.Router();
var UserModel = require('../models/user-model');

UserModel.find({}, function(err, users){
    if(err) {
        console.log('Fail find collection Users: ' + err);
        return;
    }
    if(users.length){
        console.log('Collection exist');
        return;
    }else{
        UserModel.create(testData.users, function(err){
            if(err){
                console.log('Fail create Test Users: ' + err);
            } else{
                console.log('Test Users were added');
            }
            return;
        });
    }
});

router.get('/users/', function(req, res, next){
    UserModel.find({}, function(err, users){
        if(err) return next(err);
        res.json(users);
    });
});

router.get('/users/:id', function(req, res, next){
    var id = req.params.id;
    if(!isValidObjectID(id)){
        var err = new Error('ID is not valid');
        err.status = 400;
        return next(err);
    }
    UserModel.findById(id, function(err, user){
        if(err) return next(err);
        res.json(user);
    });
});

module.exports = router;

function isValidObjectID(str) {
    return (/^[0-9a-fA-F]{24}$/).test(str);
}
