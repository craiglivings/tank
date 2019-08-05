"use strict";
exports.__esModule = true;
var pigpio_1 = require("pigpio");
var Gpio = pigpio_1["default"].Gpio;
var MotorController = /** @class */ (function () {
    function MotorController(leftFW, leftBW, rightFW, rightBW) {
        this.left = new Motor(leftFW, leftBW);
        this.right = new Motor(rightFW, rightBW);
    }
    return MotorController;
}());
exports["default"] = MotorController;
var Motor = /** @class */ (function () {
    function Motor(fwPin, bwPin) {
        this.bwPin = bwPin;
        this._forwardGPIO = new Gpio(fwPin, { mode: Gpio.OUTPUT });
        this._reverseGPIO = new Gpio(bwPin, { mode: Gpio.OUTPUT });
    }
    Motor.prototype.run = function (velocity) {
        var gpio = velocity > 0 ? this._forwardGPIO : this._reverseGPIO;
        var altGpio = velocity > 0 ? this._reverseGPIO : this._forwardGPIO;
        gpio.pwmWrite((255 / 10) * Math.abs(velocity));
        altGpio.pwmWrite(0); // ensure there is no conflict in direction
    };
    return Motor;
}());
