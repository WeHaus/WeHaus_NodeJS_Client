'use strict';
const os = require('os');
const Wehaus = require('lib_wehaus').Wehaus, SensorDevice = require('lib_wehaus').SensorDevice;
const exec = require('child_process').exec;

let w = new Wehaus({email: '', token: '', mac: ''});

w.get_devices();

w.on('ready',() => {
  // nada
});

