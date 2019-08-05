import * as io from "socket.io-client";
const serverURL = "https://cl-tank.herokuapp.com";
const socket = io(serverURL);

import MotorController from "./motorController";
const drive = new MotorController(17, 18, 22, 23);

let velocity = { left: 0, right: 0 };

console.log("Connecting to " + serverURL);

socket.on("connect", () => {
  let interval = setInterval(() => {
    drive.left.run(velocity.left);
    drive.right.run(velocity.right);
    console.log("Moving: " + JSON.stringify(velocity));
  }, 50);

  console.log("Connected");
  socket.on("REQUEST_TANK", newVelocity => {
    velocity = newVelocity;
  });

  socket.on("disconnect", () => {
    velocity = { left: 0, right: 0 };
    console.log("Disconnected");
  });
});
