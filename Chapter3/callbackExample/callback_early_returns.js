/**
 * Created by Odin on 15.11.2016.
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    getTitles(res);
}).listen(3000);

function getTitles(res){
    fs.readFile('./titles.json', function(err, data){
        if(err) return hadError(err, res);
        getTemplate(JSON.parse(data.toString()), res);
    });
};

function getTemplate(titles, res){
      fs.readFile('./template.html', function(err, data){
          if(err) return hadError(err, res);
          formatHtml(titles, data.toString(), res);
      });
};

function formatHtml(titles, template, res){
    var html = template.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(html);
};

function hadError(err, res){
    console.log(err);
    res.end('Server Error');
}