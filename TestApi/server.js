/**
 * Created by Odin on 18.11.2016.
 */
testData = {
    users : [
        {
            id: 1,
            name: 'Ken',
            email: 'some@mail.tt'
        },
        {
            id: 2,
            name: 'Jon',
            email: 'jonMail@mail.tt'
        },
        {
            id: 3,
            name: 'Bob',
            email: 'bob@mail.tt'
        },
        {
            id: 4,
            name: 'someName',
            email: 'someName@mail.tt'
        }
    ]
}

var rootPath = '/api/users';

var http = require('http'),
    url = require('url');

var server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;

    if(!path.startsWith(rootPath))
        return notFound(res);

    switch (req.method){
        case 'GET':
            if( path == rootPath)
                return sendJsonResponse(res, testData.users);

            var id = parseInt(path.replace(rootPath + '/', ''), 10);

            if(isNaN(id))
                return badRequest(res, 'Invalid item id');

            var item = testData.users.filter(function(el){ return el.id === id})[0];

            return item ? sendJsonResponse(res, item) : notFound(res, 'Item with this id not found');

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

server.listen(3000);