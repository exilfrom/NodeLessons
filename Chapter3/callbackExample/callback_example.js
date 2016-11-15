/**
 * Created by Odin on 15.11.2016.
 */
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    if(req.url == '/'){
        fs.readFile('./titles.json', function(err, data){
            if(err){
                console.log(err);
                res.end('Server Error');
            }else{
                var titles = JSON.parse(data.toString());
                fs.readFile('./template.html', function(err, data){
                    if(err) {
                        console.log(err);
                        res.end('Server Error');
                    }else{
                        var tmpl = data.toString();
                        var html = tmpl.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'content-type': 'text/html'});
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(3000);