/**
 * Created by ievgen.garlinskyi on 22.11.2016.
 */
/*var photos = [];
photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});*/

var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.list = function(req, res, next){
    Photo.find({}, function(err, photos){
        if(err) return next(err);
        res.render('photos',{
            title: 'Photos',
            photos: photos
        });
    });
};

exports.form = function(req, res){
    res.render('photos/upload',{
        title: 'Photo Upload'
    });
};

exports.download = function(dir){
    return function(req, res, next){
        var id = req.params.id;
        Photo.findById(id, function(err, photo){
            if(err) return next(err);
            var path = join(dir, photo.path);
            res.download(path);
        });
    }
};

exports.submit = function(dir){
    return function(req, res, next){
        console.log(req.file, req.body);
        var img = req.file;
        var name = req.body.name || img.originalname;
        var path = join(dir, img.originalname);
        fs.rename(img.path, path , function(err){
            Photo.create({
                name: name,
                path: img.originalname
            }, function(err){
                if(err) return next(err);
                res.redirect('/');
            });
        });
    }
}