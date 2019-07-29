const socket = io();
socket.emit('REQUEST_MOVE', { left: 10, right: 10 });
socket.on('REQUEST_TANK', data => {
    const leftTarget = 'left-track-' + (data.left > 0 ? 'top' : 'bottom');
    const rightTarget = 'right-track-' + (data.right > 0 ? 'top' : 'bottom');
    //console.log(data);
    resetBars();
    document.getElementById(leftTarget).style.height = Math.abs(data.left * 10) + '%';
    document.getElementById(rightTarget).style.height = Math.abs(data.right * 10) + '%';
});

const resetBars = () => {
    const allBars = document.getElementsByClassName('powerbar');
    for (var i = 0, len = allBars.length | 0; i < len; i = (i + 1) | 0) {
        allBars[i].style.height = '0';
    }
};

const update = movement => {
    socket.emit('REQUEST_MOVE', movement);
};

const reset = () => {
    movement = { speed: 0, direction: 0 };
    update(movement);
};

const updateSpeed = value => {
    movement.speed = value;
    update(movement);
};

const updateDirection = value => {
    movement.direction = value;
    update(movement);
};

let movement = { speed: 0, direction: 0 };
reset();

update(movement);

console.log('touchscreen is', VirtualJoystick.touchScreenAvailable() ? 'available' : 'not available');

const joystick = new VirtualJoystick({
    container: document.getElementById('joystick'),
    mouseSupport: true,
    limitStickTravel: true,
    stickRadius: 50,
});
joystick.addEventListener('touchStart', function() {
    console.log('down');
});
joystick.addEventListener('touchEnd', function() {
    console.log('up');
});

const translateJoystickVelocity = (size, parts, input, invert = false) => {
    const velocity = Math.floor((parts / size) * input);
    return invert ? -velocity : velocity;
};

setInterval(() => {
    const speed = translateJoystickVelocity(50, 10, joystick.deltaY(), true);
    const direction = translateJoystickVelocity(50, 10, joystick.deltaX());
    // if (movement.speed !== speed && movement.direction !== direction) {
    updateSpeed(speed);
    updateDirection(direction);
    // }
    //    console.log('Move: speed:' + speed + ' direction:' + direction);
}, 50);
