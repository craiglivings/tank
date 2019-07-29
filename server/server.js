var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('web'));

io.on('connection', function(socket) {
    console.log('A client connected');
    socket.on('disconnect', function() {
        console.log('A client disconnected');
    });

    socket.on('REQUEST_MOVE', function(movement) {
        console.log('Sending: ' + movement.speed + ':' + movement.direction);
        io.emit('REQUEST_TANK', transform(movement.direction, movement.speed));
    });

    socket.on('disconnect', function() {
        io.emit('REQUEST_TANK', { left: 0, right: 0 });
    });
});

http.listen(port, function() {
    console.log('listening on *:3000');
});

const transform = (direction, speed) => {
    const slowSpeed = Math.round((1 - Math.abs(direction) / 10) * Math.abs(speed));
    if (direction === 0) {
        return { left: speed, right: speed };
    }
    if (speed === 0) {
        return { left: direction, right: -direction };
    }
    if (direction > 0) {
        return { left: speed, right: speed < 0 && slowSpeed !== 0 ? -slowSpeed : slowSpeed };
    } else {
        return { left: speed < 0 ? -slowSpeed : slowSpeed, right: speed };
    }
};
