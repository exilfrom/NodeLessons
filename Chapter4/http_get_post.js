var http = require('http');
var url = require('url');

var items = [];

var server  = http.createServer(function(req, res){
    switch (req.method){
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function(chunk){
                item += chunk;
            });
            req.on('end', function(){
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            items.forEach(function(item, i){
                res.write( i + ') ' + item + '\n');
            });
            res.end();
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);
            if(isNaN(i)){
                res.satusCode = 400;
                res.end('Invalid item id');
            } else if(!items[i]){
                res.statusCode = 404;
                res.end('Item not found');
            } else{
              items.splice(i, 1);
                res.end('OK\n');
            }
            break;
        case 'PUT':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);
            if(isNaN(i)){
                res.satusCode = 400;
                res.end('Invalid item id');
            } else if(!items[i]){
                res.statusCode = 404;
                res.end('Item not found');
            } else{
                var item = '';
                req.setEncoding('utf8');
                req.on('data', function(chunk){
                    item += chunk;
                });
                req.on('end', function(){
                    if(item == '') item = 'Empy';
                    items[i] = item;
                    res.end('OK\n');
                });
            }
            break;
        default :
            res.statusCode = 400;
            res.end('Bad request');
            break;
    }
});

server.listen(3000);