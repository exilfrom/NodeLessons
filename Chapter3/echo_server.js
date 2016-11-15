/**
 * Created by Odin on 15.11.2016.
 */
var net = require('net');

var server = net.createServer(function(socket){
    socket.on('data', function(data){
        socket.write(data);
    });
});

server.listen(8888);