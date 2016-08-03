'use strict';
const os = require('os');
const loop_delay_in_seconds = 30;

const Wehaus = require('lib_wehaus').Wehaus;

let w = new Wehaus({email: 'dev@patagoniclabs.com', token: 'BPw5FzUuVxXRCfPwdhi2', mac: 'b827eb10295b'});

// w.get_token('dev@patagoniclabs.com','password');
// w.get_mac_address();
w.get_devices();

let sensor = new SensorDevice(w, 1);

function loop() {
  console.log("in loop");
  read_values();
  setTimeout(loop, loop_delay_in_seconds * 1000);
}

function read_values() {
  const exec = require('child_process').exec;
  exec('python output_sensor_data.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    
    sensor.emit('data', stdout.split(',')[0]);
    console.log(stdout);
  });
}

loop();

