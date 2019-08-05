import pigpio from "pigpio";
const Gpio = pigpio.Gpio;

export default class MotorController {
  left: Motor;
  right: Motor;
  constructor(
    leftFW: number,
    leftBW: number,
    rightFW: number,
    rightBW: number
  ) {
    this.left = new Motor(leftFW, leftBW);
    this.right = new Motor(rightFW, rightBW);
  }
}

interface IGpio {
  pwmWrite: (dutyCycle: number) => {};
}

class Motor {
  private _forwardGPIO: IGpio;
  private _reverseGPIO: IGpio;

  constructor(fwPin: number, private bwPin: number) {
    this._forwardGPIO = new Gpio(fwPin, { mode: Gpio.OUTPUT });
    this._reverseGPIO = new Gpio(bwPin, { mode: Gpio.OUTPUT });
  }

  public run(velocity: number) {
    const gpio = velocity > 0 ? this._forwardGPIO : this._reverseGPIO;
    const altGpio = velocity > 0 ? this._reverseGPIO : this._forwardGPIO;
    gpio.pwmWrite((255 / 10) * Math.abs(velocity));
    altGpio.pwmWrite(0); // ensure there is no conflict in direction
  }
}
