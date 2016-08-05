'use strict';
const os = require('os');
const Wehaus = require('lib_wehaus').Wehaus, SensorDevice = require('lib_wehaus').SensorDevice;
const exec = require('child_process').exec;

if ( process.argv.length < 4 ) {
  throw Error('No email or password provided, run \n node script.js email password');
}

let w = new Wehaus();

w.get_token(process.argv[2] ,process.argv[3]);
w.get_mac_address();

w.on('ready',() => {
  console.log( "\n\n1) Add the following to your script\n\n  let w = new Wehaus({email: '"+w.config.email+"', token: '"+w.config.token+"', mac: '"+w.config.mac+"'});" );
  console.log( "\n2) Send us this text to hackers@patagoniclabs.com :\n\n  Please enable my device "+w.config.mac+" on account "+w.config.email+"\n" );
});

