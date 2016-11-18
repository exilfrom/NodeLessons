/**
 * Created by Odin on 18.11.2016.
 */
testData = [
    {
        id: 1,
        name: 'Ken',
        email: 'some@mail.tt'
    },
    {
        id:2,
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

var http = require('http'),
    url = require('url');

var server = http.createServer(function(req, res){
    switch (req.method){
        case 'GET':
            res.end('OK\n');
            break;
        default :
            res.statusCode = 400;
            res.end('Bad request');
            break;
    }
});

server.listen(3000);