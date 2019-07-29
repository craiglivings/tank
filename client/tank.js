const serverURL = 'https://cl-tank.herokuapp.com';

const socket = require('socket.io-client')(serverURL);

let velocity = {left:0, right:0};

console.log("Connecting to " + serverURL);
socket.on('connect', () => {
    console.log("Connected");
    socket.on('REQUEST_TANK', function(newVelocity){
        if(velocity.left !== newVelocity.left && velocity.right !== newVelocity.right) {
            velocity = newVelocity;
            move(velocity);
        }
    });

    socket.on('disconnect', () => {
        console.log("Disconnected");
        velocity = {left:0, right:0};
        move(velocity);
    });

});

const move = velocity => {
    console.log(velocity);
}
