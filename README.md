# Connect your Sensor to WeHaus

## Dependencies

Install node.js and git

    sudo apt-get install git nodejs

## Clone the project

    https://github.com/gastonfariasb/WeHaus_NodeJS_Client.git

## Sign Up on WeHaus

[Sign up](https://app.wehaus.com/users/create_new_account)

## Get the token

    node get_config_data.js email password

## Paste the config you get into your script

The index.js file has an example with 2 sensors, you can start by modifying it.

<b>Follow us on the web:</b>

Twitter: https://twitter.com/wehaus  <br>
Facebook: https://www.facebook.com/Wehaus-480130975380582



# Basic Usage of the Library

## Initialize

    let w = new Wehaus({email: 'dev@example.com', token: '12341234', mac: '002200220022'});

## Get My Modules and Devices from API

    w.get_devices_and_modules();

## Create Module 

With mac address 12341234.

    w.create_module('12341234');

## Create Device

Of type SensorDevice with endpoint number 1.

    w.create_device('SensorDevice',1);

## Instantiate Device

With an instance of WeHaus and the endpoint number. It has to be created on the API before. You need to create it only once.

    let sensor_temp = new SensorDevice(w, 1);

# Device types

## SensorDevice

Any device that sends floating point data.

## AlarmDevice (WIP)

Any device that sends logical status data. 

## GeoSensorDevice (WIP)

Device that sends geo referecial data.

## ActionDevice (WIP)

Device that receives actions.

## ToggableDevice (WIP)

Device that receives actions and has an ON action and OFF action. Extends ActionDevice.

## LevelDevice (WIP)

Device that receives actions with a level from 0 to 255. Extends ToggableDevice, OFF = 0, ON = 255.

## ComposietDevice (WIP)

Device that receives actions with an object as parameter. Extends ActionDevice.


# WeHaus REST API Methods

If you need something not available contact us at dev@patagoniclabs.com

## get api/v2/check_token

Check if a token is valid.


## get api/v2/faye_subscription

Get token for events subscriptions.


## get api/v2/modules

Get a list of your registered modules.


## post api/v2/create_module

Register a module.


## post api/v2/module/:id/create_device

Register a device for a module.


## get api/v2/devices

Get a list of your registered devices

## put api/v2/device/:id

Send an action to a device. Only works with actuable devices and not with sensors.


## put api/v2/device/:id/data

Send data from a device.

