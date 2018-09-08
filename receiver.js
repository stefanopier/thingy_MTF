/*
  Copyright (c) 2010 - 2017, Nordic Semiconductor ASA
  All rights reserved.
  Redistribution and use in source and binary forms, with or without modification,
  are permitted provided that the following conditions are met:
  1. Redistributions of source code must retain the above copyright notice, this
     list of conditions and the following disclaimer.
  2. Redistributions in binary form, except as embedded into a Nordic
     Semiconductor ASA integrated circuit in a product or a software update for
     such product, must reproduce the above copyright notice, this list of
     conditions and the following disclaimer in the documentation and/or other
     materials provided with the distribution.
  3. Neither the name of Nordic Semiconductor ASA nor the names of its
     contributors may be used to endorse or promote products derived from this
     software without specific prior written permission.
  4. This software, with or without modification, must only be used with a
     Nordic Semiconductor ASA integrated circuit.
  5. Any software provided in binary form under this license must not be reverse
     engineered, decompiled, modified and/or disassembled.
  THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS
  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
  OF MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE
  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
  OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 
// motion sensor variables
var _roll, _pitch, _yaw, _heading, _x, _y, _z;
var _roll_last, _pitch_last, _yaw_last, _heading_last, _x_last, _y_last, _z_last;

// environmental variables
var _temperature, _pressure, _humidity, _tvoc, _eco2;
var _temperature_last, _pressure_last, _humidity_last, _tvoc_last, _eco2_last;

/************************* OSC */

var osc = require("osc");

var udp = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 5000, // not receiving, but here's a port anyway
    remoteAddress: "127.0.0.1", // the other laptop

//    remoteAddress: "10.37.101.108", // tom

//    remoteAddress: "10.37.101.119", // the other laptop

    remotePort: 8000 // the port to send to
});

udp.open();

udp.on("ready", function () {
    console.log("UDP ready");
});

setInterval(function () {
    sendOSC();
}, 200); // milliseconds

function sendOSC() {

    if (_roll_last !== _roll) {
        udp.send({ address: "/thingy/roll", args: [_roll] });
        _roll_last = _roll;
    }

    if (_pitch_last !== _pitch) {              
        udp.send({ address: "/thingy/pitch", args: [_pitch] });
        _pitch_last = _pitch;
    }

    if (_yaw_last !== _yaw) {    
        udp.send({ address: "/thingy/yaw", args: [_yaw] });
        _yaw_last = _yaw;
    }

    if (_heading_last !== _heading) {
        udp.send({ address: "/thingy/heading", args: [_heading] });
        _heading_last = _heading;
    }

    if (_x_last !== _x) {
        udp.send({ address: "/thingy/x", args: [_x] });
        _x_last = _x;
    }

    if (_y_last !== _y) {
        udp.send({ address: "/thingy/y", args: [_y] });
        _y_last = _y;
    }

    if (_z_last !== _z) {
        udp.send({ address: "/thingy/z", args: [_z] });
        _z_last = _z;
    }



    if (_temperature_last !== _temperature) {
        udp.send({ address: "/thingy/temperature", args: [_temperature] });
        _temperature_last = _temperature;
    }

    if (_pressure_last !== _pressure) {
        udp.send({ address: "/thingy/pressure", args: [_pressure] });
        _pressure_last = _pressure;
    }

    if (_humidity_last !== _humidity) {
        udp.send({ address: "/thingy/humidity", args: [_humidity] });
        _humidity_last = _humidity;
    }

    if (_tvoc_last !== _tvoc) {
        udp.send({ address: "/thingy/tvoc", args: [_tvoc] });
        _tvoc_last = _tvoc;
    }

    if (_eco2_last !== _eco2) {
        udp.send({ address: "/thingy/eco2", args: [_eco2] });
        _eco2_last = _eco2;
    }

    //console.log("SENT")
}

/************************* THINGY */

var Thingy = require('./index');
var enabled;

//console.log('Reading Thingy Motion sensors!');

var Direction = Object.freeze([
    'UNDEFINED',
    'TAP_X_UP', 'TAP_X_DOWN',
    'TAP_Y_UP', 'TAP_Y_DOWN',
    'TAP_Z_UP', 'TAP_Z_DOWN'
]);

var Orientation = Object.freeze([
    'Portrait', 'Landscape', 'Reverse portrait', 'Reverse landscape'
]);

function onTapData(tap) {
    //console.log('Tap data: Dir: %s (%d), Count: %d', 
    //                    Direction[tap.direction], tap.direction, tap.count);
}

function onOrientationData(orientation) {
    //console.log('Orientation data: %s (%d)', Orientation[orientation], orientation);
}

function onQuaternionData(quaternion) {
    //console.log('Quaternion data: w: %d, x: %d, y: %d, z: %d', 
     //   quaternion.w, quaternion.x, quaternion.y, quaternion.z);
}

function onStepCounterData(stepCounter) {
    //console.log('Step Counter data: Steps: %d, Time[ms]: %d', 
    //    stepCounter.steps, stepCounter.time);
}

function onRawData(raw_data) {
    //console.log('Raw data: Accelerometer: x %d, y %d, z %d', 
    //    raw_data.accelerometer.x, raw_data.accelerometer.y, raw_data.accelerometer.z);
    //console.log('Raw data: Gyroscope: x %d, y %d, z %d', 
     //   raw_data.gyroscope.x, raw_data.gyroscope.y, raw_data.gyroscope.z);
    //console.log('Raw data: Compass: x %d, y %d, z %d', 
   //     raw_data.compass.x, raw_data.compass.y, raw_data.compass.z);
}

function onEulerData(euler) {
    //console.log('Euler angles: roll %d, pitch %d, yaw %d', 
    //    euler.roll, euler.pitch, euler.yaw);
        _roll = euler.roll;
        _pitch = euler.pitch;
        _yaw = euler.yaw;
}

function onRotationData(rotation) {
    //console.log('Rotation: matrix:');

//    console.table(rotation);
    //console.log(rotation);
}

function onHeadingData(heading) {
    //console.log('Heading: %d', heading);
    _heading = heading;
}

function onGravityData(gravity) {
    //console.log('Gravity: x: %d, y %d, z %d', gravity.x, gravity.y, gravity.z);
    _x = gravity.x;
    _y = gravity.y;
    _z = gravity.z;
}

function onTemperatureData(temperature) {
    console.log('Temperature sensor: ' + temperature);
    _temperature = temperature;
}

function onPressureData(pressure) {
    console.log('Pressure sensor: ' + pressure);
    _pressure = pressure;
}

function onHumidityData(humidity) {
    console.log('Humidity sensor: ' + humidity);
    _humidity = humidity;
}

function onGasData(gas) {
    // CO2
    if(typeof gas.eco2 !== 'undefined')
        _eco2 = gas.eco2;

    // Total Volatile Organic Compounds
    if(typeof gas.tvoc !== 'undefined') 
        _tvoc = gas.tvoc;

    console.log('Gas sensor: eCO2 ' + gas.eco2 + ' - TVOC ' + gas.tvoc );
}

function onButtonChange(state) {
    if (state == 'Pressed') {
        if (enabled) {
            enabled = false;
            this.tap_disable(function(error) {
                //console.log('Tap sensor stopped! ' + ((error) ? error : ''));
            });
            this.orientation_disable(function(error) {
                //console.log('Orientation sensor stopped! ' + ((error) ? error : ''));
            });
            this.quaternion_disable(function(error) {
                //console.log('Quaternion sensor stopped! ' + ((error) ? error : ''));
            });
            this.stepCounter_disable(function(error) {
                //console.log('Step Counter sensor stopped! ' + ((error) ? error : ''));
            });
            this.raw_disable(function(error) {
                //console.log('Raw sensor stopped! ' + ((error) ? error : ''));
            });
            this.euler_disable(function(error) {
                console.log('Euler sensor stopped! ' + ((error) ? error : ''));
            });
            this.rotation_disable(function(error) {
                //console.log('Rotation sensor stopped! ' + ((error) ? error : ''));
            });
            this.heading_disable(function(error) {
                console.log('Heading sensor stopped! ' + ((error) ? error : ''));
            });
            this.gravity_disable(function(error) {
                console.log('Gravity sensor stopped! ' + ((error) ? error : ''));
            });
        }
        else {
            enabled = true;
            this.tap_enable(function(error) {
                //console.log('Tap sensor started! ' + ((error) ? error : ''));
            });
            this.orientation_enable(function(error) {
                //console.log('Orientation sensor started! ' + ((error) ? error : ''));
            });
            this.quaternion_enable(function(error) {
                //console.log('Quaternion sensor started! ' + ((error) ? error : ''));
            });
            this.stepCounter_enable(function(error) {
                //console.log('Step Counter sensor started! ' + ((error) ? error : ''));
            });
            this.raw_enable(function(error) {
                //console.log('Raw sensor started! ' + ((error) ? error : ''));
            });
            this.euler_enable(function(error) {
                console.log('Euler sensor started! ' + ((error) ? error : ''));
            });
            this.rotation_enable(function(error) {
                //console.log('Rotation sensor started! ' + ((error) ? error : ''));
            });
            this.heading_enable(function(error) {
                console.log('Heading sensor started! ' + ((error) ? error : ''));
            });
            this.gravity_enable(function(error) {
                console.log('Gravity sensor started! ' + ((error) ? error : ''));
            });
        }
    }
}

function onDiscover(thingy) {
  console.log('Discovered: ' + thingy);

  thingy.on('disconnect', function() {
    console.log('Disconnected!');
  });

  thingy.connectAndSetUp(function(error) {
    console.log('Connected! ' + error ? error : '');

    thingy.on('tapNotif', onTapData);
    thingy.on('orientationNotif', onOrientationData);
    thingy.on('quaternionNotif', onQuaternionData);
    thingy.on('stepCounterNotif', onStepCounterData);
    thingy.on('rawNotif', onRawData);
    thingy.on('eulerNotif', onEulerData);
    thingy.on('rotationNotif', onRotationData);
    thingy.on('headingNotif', onHeadingData);
    thingy.on('gravityNotif', onGravityData);
    thingy.on('buttonNotif', onButtonChange);

    thingy.motion_processing_freq_set(5, function(error) {
        if (error) {
            console.log('Motion freq set configure failed! ' + error);
        }
    });    

    enabled = true;
    thingy.orientation_enable(function(error) {
        console.log('Orientation sensor started! ' + ((error) ? error : ''));
    });
    thingy.rotation_enable(function(error) {
        console.log('Rotation sensor started! ' + ((error) ? error : ''));
    });
    thingy.button_enable(function(error) {
        console.log('Button started! ' + ((error) ? error : ''));
    });
  });
}

Thingy.discover(onDiscover);


