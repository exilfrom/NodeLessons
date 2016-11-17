/**
 * Created by Odin on 17.11.2016.
 */
var http = require('http'),
    parse = require('url').parse,
    join = require('path').join,
    fs = require('fs'),
    root = __dirname;

var server = http.createServer(function(req,res){
    var url = parse(req.url);
    var path = join(root, url.pathname);
    //var stream = fs.createReadStream(path);

    /*stream.on('data', function(chunk){
        res.write(chunk);
    });
    stream.on('end', function(){
        res.end();
    });*/
    fs.stat(path, function(err, stat){
        if(err){
            if(err.code == 'ENOENT'){
                res.statusCode = 404;
                res.end('Not Found');
            } else{
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            res.setHeader('Content-Length', stat.size);
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function(err){
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    });
});

server.listen(3000);