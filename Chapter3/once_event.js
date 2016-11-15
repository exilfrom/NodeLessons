/**
 * Created by Odin on 15.11.2016.
 */
var net = require('net');

var server = net.createServer(function(socket){
    socket.once('data', function(data){
        socket.write(data+' it\'s work only one time');
    });
});

server.listen(8888);