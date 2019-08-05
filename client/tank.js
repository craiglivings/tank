"use strict";
exports.__esModule = true;
var io = require("socket.io-client");
var serverURL = "https://cl-tank.herokuapp.com";
var socket = io(serverURL);
var motorController_1 = require("./motorController");
var drive = new motorController_1["default"](17, 18, 22, 23);
var velocity = { left: 0, right: 0 };
console.log("Connecting to " + serverURL);
socket.on("connect", function () {
    var interval = setInterval(function () {
        drive.left.run(velocity.left);
        drive.right.run(velocity.right);
        console.log("Moving: " + JSON.stringify(velocity));
    }, 50);
    console.log("Connected");
    socket.on("REQUEST_TANK", function (newVelocity) {
        velocity = newVelocity;
    });
    socket.on("disconnect", function () {
        velocity = { left: 0, right: 0 };
        console.log("Disconnected");
    });
});
