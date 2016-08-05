'use strict';
const os = require('os');
const Wehaus = require('lib_wehaus').Wehaus, SensorDevice = require('lib_wehaus').SensorDevice;
const exec = require('child_process').exec;

let w = new Wehaus({email: 'dev@patagoniclabs.com', token: '-aAX6m16dP8gqZmjwDd9', mac: '0022681fe7e5'});

w.get_devices();

w.on('ready',() => {
  // nada
});

