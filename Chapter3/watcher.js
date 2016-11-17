function Watcher(watchDir, processedDir){
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

var events = require('events');
var util = require('util');

util.inherits(Watcher, events.EventEmitter);
// same as
//Watcher.prototype = new events.EventEmitter();

var fs = require('fs'),
    watchDir = './watch',
    processDir = './done';

Watcher.prototype.watch = function(){
    var watcher = this;
    console.log('watch');
    fs.readdir(this.watchDir, function(err, files){
        if(err) {
            console.log(err);
            throw err
        };
        for(var index in files){
            watcher.emit('process', files[index]);
        }
    });
}

Watcher.prototype.start = function(){
    console.log('started');
    var watcher = this;
    fs.watchFile(watchDir, function(){
        watcher.watch();
    });
}

var watcher = new Watcher(watchDir, processDir);

watcher.on('process', function process(file){
    console.log('process ' + file);
    var watchFile = this.watchDir + '/' + file;
    var processFile = this.processedDir + '/' + file.toLowerCase();
    fs.rename(watchFile, processFile, function(err){
        if(err) throw err;
    });
});

watcher.start();