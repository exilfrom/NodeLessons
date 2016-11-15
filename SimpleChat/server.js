/**
 * Created by ievgen.garlinskyi on 15.11.2016.
 */
const http  = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
var cache = {};

function send404(response){
    response.writeHead(404, {'Contetn-type': 'text/plain'});
    response.write('Error 404: resourse not found');
    response.end();
}

function sendFile(response, filePath, fileContents){
    response.writeHead(200, {'content-type': mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

function serveStatic(response, cache, absPath){
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
    }else{
        fs.exists(absPath, function(exists){
            if(exists){
                fs.readFile(absPath, function(err, data){
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            }else{
                send404(response)
            }
        });
    }
}

var server = http.createServer(function(req, res){
    var filePath = req.url == '/' ? 'public/index.html' : 'public' + req.url;
    var absPath = './' + filePath;
    serveStatic(res, cache, absPath);
});

server.listen(3000, function(){
    console.log('server listening on port 3000.');
});

var chatServer = require('./lib/chat_server.js');
chatServer.listen(server);