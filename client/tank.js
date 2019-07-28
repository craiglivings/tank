const socket = require('socket.io-client')('http://localhost:3000');;

socket.on('connect', function(){
    socket.on('REQUEST_TANK', function(msg){
        console.log(msg);
        });
    });
