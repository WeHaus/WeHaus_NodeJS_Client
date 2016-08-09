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

