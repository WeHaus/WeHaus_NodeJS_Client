'use strict';
const os = require('os');
const Wehaus = require('lib_wehaus').Wehaus, SensorDevice = require('lib_wehaus').SensorDevice;
const exec = require('child_process').exec;
const wmi = require('node-wmi');

const loop_delay_in_seconds = 10;

// Inicializamos la librería
let w = new Wehaus({});


// Traémos los módulos y dispositivos de nuestra cuenta
w.get_devices_and_modules();

let sensor_load, sensor_temp;

// Cuando ya trajo todo
w.on('ready',() => {
  console.log('ready');
  //** Primera vez, creo los elementos en el API **//

  // Si no existe ya, creo el módulo
  if (!w.exist_module(w.config.mac)) {
    console.log('creating module');
    w.create_module(w.config.mac);
  }

  // Cuando no tenga tareas de creado de modulos pendiente
  w.on('module-ready', () => {
    console.log('module ready');

    // Si no existe un device en el endpoint 1 creo un sensor
    if (!w.exist_device(1)) {
      console.log('creating device 1');
      w.create_device('SensorDevice',1);
    }

    // Si no existe un device en el endpoint 2 creo un sensor
    if (!w.exist_device(2)) {
      console.log('creating device 2');
      w.create_device('SensorDevice',2);
    }

    // Cuando no tenga tareas de creado de dispositivos pendientes
    w.on('device-ready', () => {
      console.log('device ready');

      // Inicializo los sensores
      sensor_load = new SensorDevice(w, 1);
      sensor_temp = new SensorDevice(w, 2);
	  
	  // Ejecuto Open Hardware Monitor y espero 10 segundos que se inicie
	  exec('OpenHardwareMonitor\\OpenHardwareMonitor.exe');
	  setTimeout(loop, loop_delay_in_seconds * 1000);

    });

    w.check_device_status();
  });

  // Chequea si tiene tareas pendientes 
  w.check_module_status();
});


function loop() {
  read_values();
  setTimeout(loop, loop_delay_in_seconds * 1000);
}

function read_values() {
	// Traigo los datos de los sensores
	wmi.Query().namespace('root\\OpenHardwareMonitor').class('Sensor').exec(function(error, sensor) {
		if(error) {
			return console.log(error);
		}
		// Emito eventos de datos para los sensores
		sensor_load.emit('data', sensor[20].Value);
		console.log(sensor[20].Value);
		sensor_temp.emit('data', sensor[1].Value);
		console.log(sensor[1].Value);
	});
	
}
