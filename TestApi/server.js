/**
 * Created by Odin on 18.11.2016.
 */
testData = {
    users : [
        {
            name: 'Ken',
            email: 'some@mail.tt'
        },
        {
            name: 'Jon',
            email: 'jonMail@mail.tt'
        },
        {
            name: 'Bob',
            email: 'bob@mail.tt'
        },
        {
            name: 'someName',
            email: 'someName@mail.tt'
        }
    ]
}

var rootPath = '/api/users';
var dbName = 'TestDb';
var dbAddress = 'mongodb://localhost:27017/';

var http = require('http'),
    url = require('url'),
    mongo = require('mongodb');

var client = mongo.MongoClient;
var urlDb = dbAddress + dbName;

client.connect(urlDb, function(err, db){
    if(err){
        console.log('Error: ' + err );
    } else {
        var collection = db.collection('users');
        collection.find({}).toArray(function(err, result){
            if(err){
                console.log('Error: ' + err);
                db.close();
                return;
            } else if(result.length){
                console.log('Collection exist');
                db.close();
                return;
            }else{
                collection.insert(testData.users, {safe: true}, function(err, result){
                    if(err){
                        console.log('Error: ' + err);
                    }else{
                        console.log('Default users was added');
                    }
                    db.close();
                });
            }
        });
    }
});

var server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;

    if(!path.startsWith(rootPath))
        return notFound(res);

    switch (req.method){
        case 'GET':
            if( path == rootPath){
                return getItemList(res);
            } else {
                var id = path.replace(rootPath + '/', '');
                if(!isValidObjectID(id)) {
                    return badRequest(res, 'No valid Id');
                }
                return getItem(res, id);
            }
        default :
            return badRequest(res);
    }
});

function sendJsonResponse(res, data){
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(data));
}

function notFound(res, message){
    res.statusCode = 404;
    res.end(message ? message : 'Not Found');
}

function badRequest(res, message){
    res.statusCode = 400;
    res.end(message ? message :'Bad Request');
}

function isValidObjectID(str) {
    return (/^[0-9a-fA-F]{24}$/).test(str);
}

function getItem(res, id){
    client.connect(urlDb, function(err, db){
        if(err){
            console.log('Error: ' + err );
            res.statusCode = 500;
            res.end('Error connection to db');
        }else{
             var o_id = new mongo.ObjectID(id);
             var collection = db.collection('users');
             collection.findOne({_id: o_id}, function(err, result){
                 if (err) {
                     console.log('Error: ' + err );
                     res.statusCode = 500;
                     res.end('Error db');
                     db.close();
                 } else {
                     db.close();
                     return result ? sendJsonResponse(res, result) : notFound(res, 'Item with this id not found');
                 }
             });
        }
    })
}

function getItemList(res){
    client.connect(urlDb, function(err, db){
        if(err){
            console.log('Error: ' + err );
            res.statusCode = 500;
            res.end('Error connection to db');
        }else{
            var collection = db.collection('users');
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log('Error: ' + err );
                    res.statusCode = 500;
                    res.end('Error db');
                } else if (result.length) {
                    db.close();
                    return sendJsonResponse(res, result);
                } else {
                    res.end('Users List is empty');
                }
                db.close();
            });
        }
    })
}

server.listen(3000);