'use strict';
const os = require('os');
const loop_delay_in_seconds = 30;

var Wehaus = require('lib_wehaus').Wehaus;
var w = new Wehaus({email: 'dev@patagoniclabs.com', token: 'BPw5FzUuVxXRCfPwdhi2'});

// w.get_token('dev@patagoniclabs.com','password');

w.get_devices();

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
    console.log(stdout);
  });
}

loop();

