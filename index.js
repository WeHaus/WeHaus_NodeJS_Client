'use strict';
const os = require('os');
const Wehaus = require('lib_wehaus').Wehaus, SensorDevice = require('lib_wehaus').SensorDevice;
const exec = require('child_process').exec;

const loop_delay_in_seconds = 30;

let w = new Wehaus({email: 'dev@patagoniclabs.com', token: '-aAX6m16dP8gqZmjwDd9', mac: '0022681fe7e5', host: 'http://localhost:3000'});

w.get_devices();

let sensor;

w.on('ready',() => {
  sensor = new SensorDevice(w, 4);
  loop();
});


function loop() {
  read_values();
  setTimeout(loop, loop_delay_in_seconds * 1000);
}

function read_values() {
  sensor.emit('data', '23.2');
  return;
  exec('python output_sensor_data.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    if (typeof sensor != 'undefined') {
      sensor.emit('data', stdout.split(',')[0]);
    }
    
  });
}